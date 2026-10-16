// One command per post:  node make.js ../posts/02-launch-trial  [--stills 1,5,9] [--cover] [--skip-vo]
// Reads post.json, records the voiceover (Kokoro, local), checks every word with Whisper (local),
// times the scenes to the voice, builds music + sound effects, renders reel.mp4 and cover.png.
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { spawnSync, spawn } = require('child_process');
const { createCanvas } = require('@napi-rs/canvas');
const ffmpeg = require('ffmpeg-static');
const L = require('./lib');
const buildAudio = require('./audio');

const dir = path.resolve(process.argv[2]);
const post = JSON.parse(fs.readFileSync(path.join(dir, 'post.json'), 'utf8'));
L.useWorld(post.world || 'stage'); // background, titles, captions and characters for this reel
const TTS = path.resolve(__dirname, '../tts');
const voDir = path.join(dir, 'vo');
const args = process.argv.slice(3);
const FPS = 30;

// ---------- 1. voiceover ----------
const sayLines = post.lines.map((l) => l.say);
const hash = crypto.createHash('md5').update(JSON.stringify([post.voice, post.speed, sayLines])).digest('hex');
const hashFile = path.join(voDir, 'hash.txt');
if (!args.includes('--skip-vo') && (!fs.existsSync(hashFile) || fs.readFileSync(hashFile, 'utf8') !== hash)) {
  console.log('recording voiceover:', post.voice);
  fs.rmSync(voDir, { recursive: true, force: true });
  const linesFile = path.join(dir, 'vo-lines.txt');
  fs.writeFileSync(linesFile, sayLines.join('\n') + '\n');
  const env = { ...process.env, SPEED: String(post.speed || 1.08) };
  spawnSync('node', ['say.mjs', post.voice, voDir, linesFile], { cwd: TTS, env, stdio: 'ignore' });
  spawnSync('node', ['trim.js', voDir], { cwd: TTS, stdio: 'inherit' });
  // word check: speak it back through Whisper with no music under it
  const lens0 = JSON.parse(fs.readFileSync(path.join(voDir, 'trimmed.json')));
  const parts = lens0.map((_, i) => { const b = fs.readFileSync(path.join(voDir, `line${String(i + 1).padStart(2, '0')}.f32`)); return new Float32Array(b.buffer, b.byteOffset, b.length / 4); });
  const n = parts.reduce((s, p) => s + p.length + 9600, 0), d = Buffer.alloc(n * 4); let k = 0;
  for (const p of parts) { for (const v of [...p, ...new Float32Array(9600)]) { const s = Math.round(Math.max(-1, Math.min(1, v)) * 32767); d.writeInt16LE(s, k * 4); d.writeInt16LE(s, k * 4 + 2); k++; } }
  const h = Buffer.alloc(44); h.write('RIFF', 0); h.writeUInt32LE(36 + d.length, 4); h.write('WAVE', 8); h.write('fmt ', 12); h.writeUInt32LE(16, 16); h.writeUInt16LE(1, 20); h.writeUInt16LE(2, 22); h.writeUInt32LE(48000, 24); h.writeUInt32LE(192000, 28); h.writeUInt16LE(4, 32); h.writeUInt16LE(16, 34); h.write('data', 36); h.writeUInt32LE(d.length, 40);
  fs.writeFileSync(path.join(voDir, 'vo-only.wav'), Buffer.concat([h, d]));
  const heard = spawnSync('node', ['hear.mjs', path.join(voDir, 'vo-only.wav')], { cwd: TTS, encoding: 'utf8' }).stdout.split('\n').filter((l) => l.startsWith('[')).map((l) => l.replace(/^\[[^\]]*\]\s*/, '')).join(' ');
  const norm = (s) => s.toLowerCase().replace(/[^a-z0-9 ]+/g, ' ').split(/\s+/).filter(Boolean);
  const said = new Set(norm(heard)); const missing = [...new Set(norm(sayLines.join(' ').replace(/^@\w\|/gm, '')))].filter((w) => !said.has(w) && w.length > 2);
  fs.writeFileSync(path.join(voDir, 'heard.txt'), heard + '\n\nnot heard: ' + missing.join(', ') + '\n');
  console.log('WHISPER HEARD:', heard);
  console.log(missing.length ? `CHECK THESE WORDS: ${missing.join(', ')}` : 'every word heard');
  fs.writeFileSync(hashFile, hash);
}

// ---------- 2. timing ----------
const lens = JSON.parse(fs.readFileSync(path.join(voDir, 'trimmed.json')));
const GAP = 0.2, LEAD = 0.1, TAIL = 1.4;
const starts = []; { let t = 0.08; for (const l of lens) { starts.push(t); t += l + GAP; } }
const cut = starts.map((s, i) => (i === 0 ? 0 : s - LEAD));
const DUR = +(starts[starts.length - 1] + lens[lens.length - 1] + TAIL).toFixed(2);
// scenes: a line without "scene" continues the previous one; a line without "card" keeps the previous card
const scenes = [], cards = [];
post.lines.forEach((l, i) => {
  if (l.scene) scenes.push({ ...l.scene, a: cut[i], b: i + 1 < cut.length ? cut[i + 1] : DUR, line: i });
  else scenes[scenes.length - 1].b = i + 1 < cut.length ? cut[i + 1] : DUR;
  if (l.card) cards.push({ a: cut[i], str: l.card });
});
// a scene param written as "@lineN+0.3" means: seconds after line N starts, measured from the scene start
const resolve = (sc) => JSON.parse(JSON.stringify(sc), (k, v) => (typeof v === 'string' && /^@line\d+/.test(v) ? (() => { const [, n, off] = v.match(/^@line(\d+)([+-][\d.]+)?/); return starts[+n] - sc.a + Number(off || 0); })() : v));
const SC = scenes.map(resolve);
const hot = new RegExp(post.hot || '^(STORE)', 'i');
const captions = post.lines.map((l, i) => ({ a: cut[i], b: i + 1 < cut.length ? cut[i + 1] : DUR, str: l.show || l.say }));

// ---------- 3. audio ----------
const cues = [];
SC.forEach((s) => L.cues(s.type, s, s.b - s.a, post).forEach(([name, at, arg]) => cues.push([name, s.a + at, arg])));
buildAudio({ DUR, starts, cuts: SC.map((s) => s.a), cues, voDir, out: path.join(dir, 'audio.wav') });
if (args.includes('--audio-only')) { // swap the new soundtrack into the existing reel, video untouched
  const tmp = path.join(dir, 'reel.tmp.mp4');
  spawnSync(ffmpeg, ['-v', 'error', '-y', '-i', path.join(dir, 'reel.mp4'), '-i', path.join(dir, 'audio.wav'), '-map', '0:v', '-map', '1:a', '-c:v', 'copy', '-c:a', 'aac', '-b:a', '192k', '-ar', '48000', '-t', String(DUR), '-movflags', '+faststart', tmp]);
  fs.renameSync(tmp, path.join(dir, 'reel.mp4')); console.log('audio swapped'); process.exit(0);
}

// ---------- 4. frames ----------
function frame(ctx, t) {
  ctx.save(); L.background(ctx, t);
  const s = SC.find((x) => t >= x.a && t < x.b) || SC[SC.length - 1];
  const punch = 1 + (1 - L.eOut(L.prog(t, s.a, s.a + 0.3))) * 0.035;
  ctx.translate(L.W / 2, 900); ctx.scale(punch, punch); ctx.translate(-L.W / 2, -900);
  L.SCENES[s.type](ctx, t - s.a, s.b - s.a, s, t, post);
  ctx.restore();
  const c = [...cards].reverse().find((x) => t >= x.a); if (c) L.titleCard(ctx, t, c.a, c.str);
  const cap = captions.find((x) => t >= x.a && t < x.b); if (cap) L.caption(ctx, t, cap.a, cap.str, hot);
  const v = ctx.createRadialGradient(L.W / 2, L.H / 2, L.H * 0.3, L.W / 2, L.H / 2, L.H * 0.75);
  v.addColorStop(0, 'rgba(0,0,0,0)'); v.addColorStop(1, 'rgba(0,0,0,0.35)'); ctx.fillStyle = v; ctx.fillRect(0, 0, L.W, L.H);
  const f = L.prog(t, DUR - 0.35, DUR); if (f > 0) { ctx.fillStyle = `rgba(15,18,24,${f})`; ctx.fillRect(0, 0, L.W, L.H); }
}
function cover(ctx) {
  L.background(ctx, 1.2);
  const cv = post.cover, s = SC.find((x) => x.line === cv.line) || SC[0];
  ctx.save(); ctx.translate(0, cv.shift || 80); L.SCENES[s.type](ctx, cv.lt || 3, s.b - s.a, { ...s, ...(cv.params || {}) }, cv.lt || 3, post); ctx.restore();
  cv.title.forEach((str, i) => {
    ctx.save(); ctx.translate(540, 360 + i * 130); ctx.rotate(i ? 0.02 : -0.03);
    const size = L.textFit(ctx, str, L.AR, 92, 900), tw = ctx.measureText(str).width, pw = tw + 70, ph = size + 50;
    ctx.fillStyle = 'rgba(0,0,0,0.45)'; L.rrect(ctx, -pw / 2 + 8, -ph / 2 + 12, pw, ph, 16); ctx.fill();
    ctx.fillStyle = i ? L.C.yellow : L.C.paper; L.rrect(ctx, -pw / 2, -ph / 2, pw, ph, 16); ctx.fill();
    ctx.fillStyle = L.C.text; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(str, 0, 5); ctx.restore();
  });
}

(async () => {
  const canvas = createCanvas(L.W, L.H), ctx = canvas.getContext('2d');
  const si = args.indexOf('--stills');
  if (si > -1) {
    fs.mkdirSync(path.join(dir, 'stills'), { recursive: true });
    for (const s of args[si + 1].split(',').map(Number)) { frame(ctx, s); fs.writeFileSync(path.join(dir, `stills/t${s.toFixed(2)}.png`), canvas.toBuffer('image/png')); }
    console.log('stills done · scene starts', SC.map((s) => `${s.type}@${s.a.toFixed(1)}`).join(' '));
    return;
  }
  cover(ctx); fs.writeFileSync(path.join(dir, 'cover.png'), canvas.toBuffer('image/png'));
  fs.writeFileSync(path.join(dir, 'cover.jpg'), canvas.toBuffer('image/jpeg', 92)); // Instagram wants JPEG
  if (args.includes('--cover')) return console.log('wrote cover.png');
  const out = path.join(dir, 'reel.mp4');
  const ff = spawn(ffmpeg, ['-y', '-f', 'rawvideo', '-pix_fmt', 'rgba', '-s', `${L.W}x${L.H}`, '-r', String(FPS), '-i', '-', '-i', path.join(dir, 'audio.wav'),
    '-map', '0:v', '-map', '1:a', '-c:v', 'libx264', '-preset', 'medium', '-crf', '18', '-profile:v', 'high', '-pix_fmt', 'yuv420p',
    '-c:a', 'aac', '-b:a', '192k', '-ar', '48000', '-t', String(DUR), '-movflags', '+faststart', out], { stdio: ['pipe', 'ignore', 'pipe'] });
  let err = ''; ff.stderr.on('data', (d) => (err += d));
  const total = Math.round(FPS * DUR);
  for (let i = 0; i < total; i++) {
    frame(ctx, i / FPS);
    if (!ff.stdin.write(Buffer.from(ctx.getImageData(0, 0, L.W, L.H).data.buffer))) await new Promise((r) => ff.stdin.once('drain', r));
  }
  ff.stdin.end();
  await new Promise((r) => ff.on('close', (c) => { if (c) console.error(err.slice(-1500)); r(); }));
  console.log(`wrote ${out} (${DUR}s) and cover.png`);
})();
