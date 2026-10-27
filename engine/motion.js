// Motion reels: the picture is a HyperFrames composition (HTML + GSAP) written per reel, following docs/MOTION.md.
// The voice, the music bed, the sound effects and the captions are the same house pieces every reel uses.
//   node engine/motion.js <post dir> --prep           record the voiceover, write timing.json (the scene is written against it)
//   node engine/motion.js <post dir> --lint           build the composition and run the HyperFrames checks; prints MOTION FINDINGS
//   node engine/motion.js <post dir> [--stills 1,5] [--cover]   build, check, render reel.mp4 + cover.png/jpg (or just stills / cover)
// Files in the post folder: post.json (style "motion"), scene.html (markup + <style>), scene.js (timeline code).
const fs = require('fs');
const os = require('os');
const path = require('path');
const { spawnSync } = require('child_process');
const { createCanvas, loadImage } = require('@napi-rs/canvas');
const ffmpeg = require('ffmpeg-static');
const L = require('./lib');
const buildAudio = require('./audio');
const voice = require('./voice');
const host = require('../character/prashant');

// ---- the host: Prashant as a 2D character on top of the scene (post.json "host"; docs/MOTION.md "The host") ----
// Each line may set host: { at: "center"|"corner"|"right"|"hidden", pose, mood, whistle: true }.
const HOST_AT = { center: { x: 280, y: 570, scale: 1 }, corner: { x: -40, y: 790, scale: 0.7 }, right: { x: 640, y: 790, scale: 0.7 }, hidden: { x: -40, y: 1960, scale: 0.7 } };
function hostStates(post) {
  const n = post.lines.length;
  return post.lines.map((l, i) => ({ at: i === 0 ? 'center' : 'corner', pose: i === 0 ? 'explain' : i === n - 1 ? 'point' : ['explain', 'idle', 'phone', 'thumbs'][i % 4], mood: i === 0 ? 'shock' : 'normal', ...(l.host || {}) }));
}
function hostMarkup(post) {
  const s0 = hostStates(post)[0];
  return `<div id="host" data-layout-allow-overlap style="position:absolute;left:0;top:0;width:520px;height:760px">${host.layered({ mood: s0.mood, pose: s0.pose, prop: 'cooker', idp: 'h' })}</div>`;
}
/** GSAP calls for the host: position, pose and mood per line, lip-flap while the voice speaks, blinks, the whistle. */
function hostScript(post, T) {
  const S = hostStates(post), out = [];
  let seed = 11; const rnd = () => ((seed = (seed * 1664525 + 1013904223) >>> 0) / 4294967296);
  const set = (kind, names, on, t) => names.forEach((k) => out.push(`tl.set('#h-${kind}-${k}', { opacity: ${k === on ? 1 : 0} }, ${t.toFixed(3)});`));
  const p0 = HOST_AT[S[0].at] || HOST_AT.center;
  out.push(`tl.set('#host', { x: ${p0.x}, y: ${p0.y}, scale: ${p0.scale}, transformOrigin: '0 0' }, 0);`);
  out.push(`tl.fromTo('#h-head', { y: 0 }, { y: -5, duration: 1.3, ease: 'sine.inOut', yoyo: true, repeat: ${Math.max(1, Math.floor(T.dur / 1.3))} }, 0);`);
  S.forEach((s, i) => {
    const l = T.lines[i], t = i === 0 ? 0 : l.a, p = HOST_AT[s.at] || HOST_AT.corner, [eyes, brows] = host.MOODS[s.mood] || host.MOODS.normal;
    if (i > 0) out.push(`tl.to('#host', { x: ${p.x}, y: ${p.y}, scale: ${p.scale}, duration: 0.45, ease: 'power3.inOut' }, ${t.toFixed(3)});`);
    set('arms', Object.keys(host.POSES), s.pose, t); set('eyes', host.EYES, eyes, t); set('brows', host.BROWS, brows, t);
    // lip-flap across the spoken span, closed (or smiling) after
    let k = l.voice; const end = l.end - 0.05;
    while (k < end) { const shape = rnd() < 0.55 ? 'talk' : rnd() < 0.5 ? 'open' : 'closed'; set('mouth', host.MOUTHS, shape, k); k += 0.1 + rnd() * 0.08; }
    set('mouth', host.MOUTHS, /happy|smug/.test(s.mood) ? 'smile' : 'closed', Math.max(l.voice, end));
    // a blink every ~3 s while the eyes are normal
    if (eyes === 'normal') for (let b = l.a + 0.8 + rnd(); b < l.b - 0.3; b += 2.6 + rnd()) { set('eyes', host.EYES, 'blink', b); set('eyes', host.EYES, 'normal', b + 0.12); }
    if (s.whistle) {
      const w = l.voice + 0.3;
      out.push(`tl.fromTo('#h-steam', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' }, ${w.toFixed(3)});`);
      out.push(`tl.fromTo('#h-cooker', { x: 0 }, { x: 5, duration: 0.05, repeat: 9, yoyo: true, ease: 'none' }, ${w.toFixed(3)});`);
      out.push(`tl.to('#h-steam', { opacity: 0, y: -30, duration: 0.5, ease: 'power2.in' }, ${(w + 1.4).toFixed(3)});`);
    }
  });
  return out.join('\n');
}
const hostWhistles = (post, T) => (post.host ? hostStates(post).map((s, i) => (s.whistle ? ['whistle', T.lines[i].voice + 0.3] : null)).filter(Boolean) : []);

const ROOT = path.resolve(__dirname, '..');
const NM = path.join(ROOT, 'node_modules');
const FPS = 30, BEAT = 0.6; // the music bed is 100 BPM from t=0

// HyperFrames needs FFmpeg + FFprobe; use the bundled ones so a PC and the GitHub runner behave the same
const HF_ENV = {
  ...process.env,
  HYPERFRAMES_FFMPEG_PATH: ffmpeg,
  HYPERFRAMES_FFPROBE_PATH: require('ffprobe-static').path,
  HYPERFRAMES_NO_TELEMETRY: '1',
};
const HF_BIN = path.join(NM, 'hyperframes', require(path.join(NM, 'hyperframes', 'package.json')).bin.hyperframes || 'dist/cli.js');

function hf(args, { cwd } = {}) {
  const r = spawnSync(process.execPath, [HF_BIN, ...args], { cwd, env: HF_ENV, encoding: 'utf8', maxBuffer: 1 << 28 });
  return { code: r.status, out: (r.stdout || '') + (r.stderr || '') };
}

// ---------- house fonts (shipped files, so renders never fetch anything) ----------
const FONTS = [
  ['Archivo Black', '@fontsource/archivo-black/files/archivo-black-latin-400-normal.woff2', 400],
  ['Bebas Neue', '@fontsource/bebas-neue/files/bebas-neue-latin-400-normal.woff2', 400],
  ['Inter', '@fontsource/inter/files/inter-latin-400-normal.woff2', 400],
  ['Inter', '@fontsource/inter/files/inter-latin-700-normal.woff2', 700],
  ['Inter', '@fontsource/inter/files/inter-latin-900-normal.woff2', 900],
  ['Permanent Marker', '@fontsource/permanent-marker/files/permanent-marker-latin-400-normal.woff2', 400],
  ['Playfair Display', '@fontsource/playfair-display/files/playfair-display-latin-700-normal.woff2', 700],
  ['Playfair Italic', '@fontsource/playfair-display/files/playfair-display-latin-700-italic.woff2', 700],
  ['Press Start 2P', '@fontsource/press-start-2p/files/press-start-2p-latin-400-normal.woff2', 400],
  ['Noto Deva', '@fontsource/noto-sans/files/noto-sans-devanagari-400-normal.woff2', 400], // has the ₹ sign
];

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** "@line3+0.4" -> seconds (from the line's visual start); numbers pass through; "end" = reel end. */
function at(v, T) {
  if (typeof v === 'number') return v;
  if (v === 'end') return T.dur;
  const m = String(v).match(/^@line(\d+)(?:\.(voice|end))?([+-][\d.]+)?$/);
  if (!m || !T.lines[+m[1]]) throw new Error(`bad time "${v}" (use seconds, "end" or "@lineN+0.3")`);
  const l = T.lines[+m[1]]; return +((m[2] === 'voice' ? l.voice : m[2] === 'end' ? l.end : l.a) + Number(m[3] || 0)).toFixed(3);
}

/** data-from="@line2" data-to="@line5" (or "end") -> HyperFrames clip timing. */
function timeClips(html, T) {
  return html.replace(/<([a-z][\w-]*)([^>]*?)\sdata-from="([^"]+)"([^>]*?)>/gi, (all, tag, pre, from, post) => {
    const toM = (pre + post).match(/\sdata-to="([^"]+)"/);
    const a = at(from, T), b = toM ? at(toM[1], T) : T.dur;
    let rest = (pre + post).replace(/\sdata-to="[^"]+"/, '');
    rest = /\sclass="/.test(rest) ? rest.replace(/\sclass="([^"]*)"/, (m, c) => ` class="${c} clip"`) : `${rest} class="clip"`; // HyperFrames' clip convention
    return `<${tag}${rest} data-start="${a}" data-duration="${+(Math.max(0.05, b - a)).toFixed(3)}">`;
  });
}

function captionsHTML(post, T) {
  const hot = new RegExp(post.hot || '^$', 'i');
  return T.lines.map((l, i) => `<div class="cap" id="cap${i}">${(l.show).split(/\s+/).filter(Boolean).map((w) => `<span class="w${hot.test(w.replace(/[^\w₹%×]/g, '')) ? ' hot' : ''}">${esc(w)}</span>`).join(' ')}</div>`).join('\n');
}

function buildProject(dir, post, T) {
  const proj = fs.mkdtempSync(path.join(os.tmpdir(), 'motion-'));
  fs.mkdirSync(path.join(proj, 'fonts'));
  const faces = FONTS.map(([fam, file, wt]) => { const base = path.basename(file); fs.copyFileSync(path.join(NM, file), path.join(proj, 'fonts', base)); return `@font-face{font-family:'${fam}';src:url(fonts/${base}) format('woff2');font-weight:${wt};font-display:block}`; }).join('\n');
  fs.copyFileSync(path.join(NM, 'gsap/dist/gsap.min.js'), path.join(proj, 'gsap.min.js'));
  const sceneHTML = timeClips(fs.readFileSync(path.join(dir, 'scene.html'), 'utf8'), T);
  const sceneJS = fs.readFileSync(path.join(dir, 'scene.js'), 'utf8');
  const pal = { bg: '#0F1218', ink: '#F6F1E7', accent: '#FFC857', ...(post.palette || {}) };
  const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=1080, height=1920" />
<title>${esc(post.id)}</title>
<script src="gsap.min.js"></script>
<style>
${faces}
:root{--bg:${pal.bg};--ink:${pal.ink};--accent:${pal.accent};--display:'Archivo Black','Noto Deva',sans-serif;--body:'Inter','Noto Deva',sans-serif}
html,body{margin:0;background:var(--bg)}
#root{position:relative;width:100%;height:100%;overflow:hidden;background:var(--bg);color:var(--ink);font-family:var(--body)}
#stage{position:absolute;inset:0}
#caps{position:absolute;left:90px;right:90px;top:1330px;height:260px}
.cap{position:absolute;left:0;right:0;top:0;opacity:0;text-align:center;font-family:'Inter','Noto Deva',sans-serif;font-weight:900;font-size:64px;line-height:1.12;letter-spacing:-0.01em;color:#fff;text-shadow:0 4px 0 rgba(0,0,0,.55),0 0 24px rgba(0,0,0,.45)}
.cap .w{display:inline-block;opacity:0}
.cap .hot{color:var(--accent)}
#endfade{position:absolute;inset:0;background:#0F1218;opacity:0;pointer-events:none}
${post.theme === 'editorial' ? '/* editorial theme (docs/MOTION.md): light paper, ink captions without the heavy shadow */\n.cap{color:var(--ink);text-shadow:none;font-weight:700;font-size:56px}\n#endfade{background:var(--bg)}' : ''}
</style>
</head>
<body>
<div id="root" data-composition-id="reel" data-start="0" data-width="1080" data-height="1920" data-duration="${T.dur}">
<div id="stage">
${sceneHTML}
${post.host ? hostMarkup(post) : ''}
</div>
<div id="caps" aria-hidden="true">
${captionsHTML(post, T)}
</div>
<div id="endfade"></div>
</div>
<script>
const T = ${JSON.stringify(T)};
T.at = (n, off = 0) => T.lines[n].a + off;
T.voice = (n, off = 0) => T.lines[n].voice + off;
T.end = (n, off = 0) => T.lines[n].end + off;
T.rand = (seed) => () => ((seed = (seed * 1664525 + 1013904223) >>> 0) / 4294967296);
const tl = gsap.timeline({ paused: true });
// ---- scene (written for this reel) ----
(function (tl, T) {
${sceneJS}
})(tl, T);
${post.host ? `// ---- the host (character/prashant.js) ----\n${hostScript(post, T)}` : ''}
// ---- house captions: each line's words pop in as they are spoken ----
T.lines.forEach((l, i) => {
  const cap = document.getElementById('cap' + i), words = cap.querySelectorAll('.w');
  tl.set(cap, { opacity: 1 }, l.a); tl.set(cap, { opacity: 0 }, l.b);
  const span = Math.max(0.2, (l.end - l.voice) * 0.85), step = span / Math.max(1, words.length);
  words.forEach((w, k) => tl.fromTo(w, { opacity: 0, y: 18, scale: 0.86 }, { opacity: 1, y: 0, scale: 1, duration: 0.16, ease: 'back.out(2)' }, Math.max(l.a, l.voice + k * step - 0.05)));
});
tl.to('#endfade', { opacity: 1, duration: 0.35, ease: 'none' }, T.dur - 0.35);
window.__timelines["reel"] = tl;
</script>
</body>
</html>
`;
  fs.writeFileSync(path.join(proj, 'index.html'), html);
  return proj;
}

/** HyperFrames lint + browser check. Returns { errors: [...], warnings: [...] } in plain words. */
function check(proj) {
  const errors = [], warnings = [];
  // the JSON report is followed by log lines, so cut from the first "{" to the last line that is just "}"
  const pick = (out) => { const i = out.indexOf('{'), j = out.lastIndexOf('\n}'); try { return JSON.parse(out.slice(i, j + 2)); } catch { return null; } };
  const lint = hf(['lint', proj, '--json']);
  const lj = pick(lint.out);
  const seen = new Set();
  const list = (j) => (j ? [...(j.findings || []), ...['lint', 'runtime', 'layout', 'motion', 'contrast'].flatMap((k) => (j[k] && j[k].findings) || [])] : []);
  const say = (f) => `${f.code || ''}: ${f.message || ''}${f.selector ? ` [${f.selector}]` : ''}${f.text ? ` "${String(f.text).slice(0, 40)}"` : ''}${f.time !== undefined ? ` @${f.time}s` : ''}${f.fixHint || f.fix ? ` (fix: ${f.fixHint || f.fix})` : ''}`;
  const add = (f) => { if (f.severity !== 'error' && f.severity !== 'warning') return; const t = say(f), key = `${f.code}|${f.message}|${f.time}`; if (seen.has(key)) return; seen.add(key); (f.severity === 'error' ? errors : warnings).push(t); };
  list(lj).forEach(add);
  if (!lj && lint.code) errors.push(`lint failed: ${lint.out.slice(-800)}`);
  if (errors.length) return { errors, warnings };
  const chk = hf(['check', proj, '--json']);
  const cj = pick(chk.out);
  list(cj).forEach(add);
  if (!cj && chk.code) errors.push(`check failed: ${chk.out.slice(-800)}`);
  return { errors, warnings };
}

function snapshot(proj, times, outDir) {
  fs.mkdirSync(outDir, { recursive: true });
  const r = hf(['snapshot', proj, '--at', times.map((t) => t.toFixed(2)).join(','), '--no-end', '--keep', '--output', outDir]);
  if (r.code) throw new Error(`snapshot failed: ${r.out.slice(-800)}`);
  return times.map((t) => path.join(outDir, `at-${+t.toFixed(2)}s.png`));
}

async function cover(post, T, proj, dir) {
  const t = at(post.cover.at, T);
  const [png] = snapshot(proj, [t], path.join(proj, 'cover-shot'));
  const canvas = createCanvas(L.W, L.H), ctx = canvas.getContext('2d');
  // titles on top, the scene below as a framed shot (captions band cropped off so nothing collides)
  const shot = await loadImage(png), sw = 900, sh = Math.round(sw * 1300 / L.W), sx = (L.W - sw) / 2, sy = 600;
  ctx.fillStyle = (post.palette && post.palette.bg) || '#0F1218'; ctx.fillRect(0, 0, L.W, L.H);
  ctx.save(); ctx.globalAlpha = 0.5; ctx.filter = 'blur(40px)'; ctx.drawImage(shot, 0, 0, L.W, 1300, -200, -300, L.W + 400, 1700 + 300); ctx.restore();
  ctx.fillStyle = 'rgba(0,0,0,0.45)'; ctx.fillRect(0, 0, L.W, L.H);
  ctx.save(); ctx.shadowColor = 'rgba(0,0,0,0.6)'; ctx.shadowBlur = 60; ctx.shadowOffsetY = 20; L.rrect(ctx, sx, sy, sw, sh, 40); ctx.fillStyle = '#000'; ctx.fill(); ctx.restore();
  ctx.save(); L.rrect(ctx, sx, sy, sw, sh, 40); ctx.clip(); ctx.drawImage(shot, 0, 0, L.W, 1300, sx, sy, sw, sh); ctx.restore();
  post.cover.title.forEach((str, i) => {
    ctx.save(); ctx.translate(540, 250 + i * 140); ctx.rotate(i ? 0.02 : -0.03);
    const size = L.textFit(ctx, str, L.AR, 92, 900), tw = ctx.measureText(str).width, pw = tw + 70, ph = size + 50;
    ctx.fillStyle = 'rgba(0,0,0,0.45)'; L.rrect(ctx, -pw / 2 + 8, -ph / 2 + 12, pw, ph, 16); ctx.fill();
    ctx.fillStyle = i ? L.C.yellow : L.C.paper; L.rrect(ctx, -pw / 2, -ph / 2, pw, ph, 16); ctx.fill();
    ctx.fillStyle = L.C.text; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(str, 0, 5); ctx.restore();
  });
  fs.writeFileSync(path.join(dir, 'cover.png'), canvas.toBuffer('image/png'));
  fs.writeFileSync(path.join(dir, 'cover.jpg'), canvas.toBuffer('image/jpeg', 92)); // Instagram wants JPEG
}

function timingFor(dir, post) {
  const { lens, starts, cut, DUR } = voice.timing(dir);
  return {
    dur: DUR, fps: FPS, beat: BEAT, w: L.W, h: L.H,
    lines: post.lines.map((l, i) => ({ a: +cut[i].toFixed(3), voice: +starts[i].toFixed(3), end: +(starts[i] + lens[i]).toFixed(3), b: +(i + 1 < cut.length ? cut[i + 1] : DUR).toFixed(3), say: l.say, show: l.show || l.say })),
  };
}

async function main() {
  const dir = path.resolve(process.argv[2]);
  const args = process.argv.slice(3);
  const post = JSON.parse(fs.readFileSync(path.join(dir, 'post.json'), 'utf8'));
  if (!args.includes('--skip-vo')) voice.record(dir, post);
  const T = timingFor(dir, post);
  if (args.includes('--prep')) { fs.writeFileSync(path.join(dir, 'timing.json'), JSON.stringify(T, null, 2) + '\n'); console.log(`timing.json written (${T.dur}s)`); return; }
  fs.writeFileSync(path.join(dir, 'timing.json'), JSON.stringify(T, null, 2) + '\n');

  const proj = buildProject(dir, post, T);
  try {
    const found = check(proj);
    console.log(`MOTION FINDINGS: ${JSON.stringify(found)}`);
    if (args.includes('--lint')) { process.exitCode = found.errors.length ? 2 : 0; return; }
    if (found.errors.length) throw new Error(`composition has ${found.errors.length} errors:\n- ${found.errors.join('\n- ')}`);

    if (args.includes('--cover')) { await cover(post, T, proj, dir); console.log('wrote cover.png'); return; }
    const si = args.indexOf('--stills');
    if (si > -1) {
      const times = args[si + 1].split(',').map(Number);
      const out = path.join(dir, 'stills'); const shots = snapshot(proj, times, out);
      console.log('stills:', shots.map((s) => path.relative(ROOT, s)).join(' ')); return;
    }

    // sound: whoosh on every line marked "cut", plus any sound effects the spec asks for
    const cuts = T.lines.filter((l, i) => i > 0 && post.lines[i].cut).map((l) => l.a);
    const cues = [...(post.sfx || []).map((s) => [s.fx, at(s.at, T)]), ...hostWhistles(post, T)];
    buildAudio({ DUR: T.dur, starts: T.lines.map((l) => l.voice), cuts, cues, voDir: path.join(dir, 'vo'), out: path.join(dir, 'audio.wav') });

    const silent = path.join(proj, 'video.mp4');
    const workers = process.env.MOTION_WORKERS || 'auto';
    const r = hf(['render', proj, '--output', silent, '--quality', 'delivery', '--fps', String(FPS), '--workers', workers, '--frames-cache-dir', path.join(proj, '.frames'), '--quiet']);
    if (r.code || !fs.existsSync(silent)) throw new Error(`render failed:\n${r.out.slice(-1500)}`);
    const out = path.join(dir, 'reel.mp4');
    const mux = spawnSync(ffmpeg, ['-v', 'error', '-y', '-i', silent, '-i', path.join(dir, 'audio.wav'), '-map', '0:v', '-map', '1:a',
      '-c:v', 'libx264', '-preset', 'medium', '-crf', '18', '-profile:v', 'high', '-pix_fmt', 'yuv420p', '-r', String(FPS),
      '-c:a', 'aac', '-b:a', '192k', '-ar', '48000', '-t', String(T.dur), '-movflags', '+faststart', out], { encoding: 'utf8' });
    if (mux.status) throw new Error(`could not add the sound: ${mux.stderr.slice(-800)}`);
    await cover(post, T, proj, dir);
    console.log(`wrote ${out} (${T.dur}s) and cover.png`);
  } finally {
    if (!process.env.MOTION_KEEP) fs.rmSync(proj, { recursive: true, force: true }); else console.log('project kept at', proj);
  }
}

if (require.main === module) main().catch((e) => { console.error(e.message); process.exit(1); });
module.exports = { at, timeClips };
