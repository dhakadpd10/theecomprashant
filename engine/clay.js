// The clay theme (post.json "theme": "clay", docs/CLAY.md): plasticine cards and type made with SVG filters, the
// 3D clay host drawn as image layers (character/clay/png, made by character/clay/build.js), and stop-motion timing.
const fs = require('fs');
const path = require('path');

const PNG = path.join(__dirname, '..', 'character', 'clay', 'png');
const FPS = 12; // drawn at 12 fps like stop-motion, delivered at 30 (each drawing held for 2 to 3 frames)
const POSES = ['idle', 'point', 'explain', 'thumbs', 'shrug', 'think', 'phone', 'wave', 'cooker'];
const MOODS = ['normal', 'happy', 'smug', 'shock', 'worried', 'think'];
const MOUTHS = ['closed', 'talk', 'open', 'blink'];

// one plasticine filter: lumpy edges, a puffed height map from the blurred alpha with faint thumbprints, a warm key
// light and a waxy highlight. puff = how domed the piece looks, wob = how lumpy its outline is.
const filter = (id, puff, wob, seed) => `<filter id="${id}" x="-12%" y="-12%" width="124%" height="124%" color-interpolation-filters="sRGB">
<feTurbulence class="boil" type="fractalNoise" baseFrequency="0.02" numOctaves="2" seed="${seed}" result="lump"/>
<feDisplacementMap in="SourceGraphic" in2="lump" scale="${wob}" xChannelSelector="R" yChannelSelector="G" result="shape"/>
<feGaussianBlur in="shape" stdDeviation="${puff}" result="soft"/>
<feColorMatrix in="soft" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0" result="alphaSoft"/>
<feTurbulence class="boil" type="fractalNoise" baseFrequency="0.07" numOctaves="2" seed="${seed + 7}" result="prints"/>
<feComposite in="alphaSoft" in2="prints" operator="arithmetic" k1="0" k2="1" k3="0.07" k4="0" result="height"/>
<feDiffuseLighting in="height" surfaceScale="8" diffuseConstant="1.16" lighting-color="#FFFFFF" result="diff"><feDistantLight azimuth="235" elevation="50"/></feDiffuseLighting>
<feSpecularLighting in="height" surfaceScale="8" specularConstant="0.36" specularExponent="18" lighting-color="#FFF6EA" result="spec"><feDistantLight azimuth="235" elevation="56"/></feSpecularLighting>
<feBlend in="shape" in2="diff" mode="multiply" result="lit"/>
<feComposite in="lit" in2="shape" operator="in" result="litIn"/>
<feComposite in="spec" in2="shape" operator="in" result="specIn"/>
<feComposite in="litIn" in2="specIn" operator="arithmetic" k1="0" k2="1" k3="0.5" k4="0"/>
</filter>`;

const defs = () => `<svg id="clay-defs" width="0" height="0" style="position:absolute" aria-hidden="true"><defs>
${filter('clay-slab', 13, 3, 3)}
${filter('clay-pill', 6, 3, 11)}
${filter('clay-type', 2.4, 1.5, 19)}
${filter('clay-blob', 28, 7, 29)}
</defs></svg>`;

// the board, the shared classes, and readable captions on a clay strip
const css = () => `/* clay theme (docs/CLAY.md) */
#root{background:radial-gradient(130% 90% at 45% 30%,#F3E6D2 0%,var(--bg) 58%,#D9C3A2 100%)}
.card,.clay{filter:url(#clay-slab)}
.clay-s{filter:url(#clay-pill)}
.clay-blob{filter:url(#clay-blob)}
.title,.clay-type{filter:url(#clay-type)}
.cap{color:var(--ink);text-shadow:none;font-weight:800;font-size:56px}
#endfade{background:var(--bg)}
#host img{position:absolute;left:0;top:0;width:520px;height:760px;opacity:0}
#h-steam{position:absolute;left:330px;top:300px;width:200px;height:200px;opacity:0}
#h-steam i{position:absolute;border-radius:50%;background:#FBF6EE}`;

function copyPngs(proj) {
  fs.mkdirSync(path.join(proj, 'clay'), { recursive: true });
  for (const f of fs.readdirSync(PNG)) if (/^(body|head)-.*\.png$/.test(f)) fs.copyFileSync(path.join(PNG, f), path.join(proj, 'clay', f));
}

const hostMarkup = () => `<div id="host" data-layout-allow-overlap data-layout-allow-overflow style="position:absolute;left:0;top:0;width:520px;height:760px"><div id="h-j" style="position:absolute;inset:0">
${POSES.map((p) => `<img id="h-body-${p}" src="clay/body-${p}.png" alt="">`).join('')}
<div id="h-head" style="position:absolute;inset:0">${MOODS.flatMap((m) => MOUTHS.map((k) => `<img id="h-hd-${m}-${k}" src="clay/head-${m}-${k}.png" alt="">`)).join('')}</div>
<div id="h-steam" class="clay-blob"><i style="left:60px;top:110px;width:80px;height:80px"></i><i style="left:20px;top:40px;width:110px;height:110px"></i><i style="left:90px;top:0;width:90px;height:90px"></i></div>
</div></div>`;

/** GSAP calls for the clay host: position, pose and mood per line, mouth shapes while speaking, blinks, the whistle puff, and stop-motion boil. */
function hostScript(states, T, HOST_AT) {
  const out = [];
  let seed = 23; const rnd = () => ((seed = (seed * 1664525 + 1013904223) >>> 0) / 4294967296);
  const bodies = POSES.map((p) => `body-${p}`), heads = MOODS.flatMap((m) => MOUTHS.map((k) => `hd-${m}-${k}`));
  const set = (all, on, t) => all.forEach((k) => out.push(`tl.set('#h-${k}', { opacity: ${k === on ? 1 : 0} }, ${t.toFixed(3)});`));
  const p0 = HOST_AT[states[0].at] || HOST_AT.center;
  out.push(`tl.set('#host', { x: ${p0.x}, y: ${p0.y}, scale: ${p0.scale}, transformOrigin: '0 0' }, 0);`);
  states.forEach((s, i) => {
    const l = T.lines[i], t = i === 0 ? 0 : l.a, p = HOST_AT[s.at] || HOST_AT.corner, mood = MOODS.includes(s.mood) ? s.mood : 'normal';
    if (i > 0) out.push(`tl.to('#host', { x: ${p.x}, y: ${p.y}, scale: ${p.scale}, duration: 0.5, ease: 'power3.inOut' }, ${t.toFixed(3)});`);
    set(bodies, `body-${POSES.includes(s.pose) ? s.pose : 'idle'}`, t);
    set(heads, `hd-${mood}-closed`, t);
    // mouth shapes across the spoken span, held for at least 2 drawings like hand-made replacement mouths
    let k = l.voice; const end = l.end - 0.05;
    while (k < end) { set(heads, `hd-${mood}-${rnd() < 0.55 ? 'talk' : rnd() < 0.5 ? 'open' : 'closed'}`, k); k += 2 / FPS + rnd() * (1 / FPS); }
    set(heads, `hd-${mood}-closed`, Math.max(l.voice, end));
    for (let b = l.a + 0.9 + rnd(); b < l.b - 0.4; b += 2.8 + rnd()) { set(heads, `hd-${mood}-blink`, b); set(heads, `hd-${mood}-closed`, b + 2 / FPS); }
    if (s.whistle) {
      const w = l.voice + 0.3;
      out.push(`tl.fromTo('#h-steam', { opacity: 0, y: 40, scale: 0.4 }, { opacity: 1, y: 0, scale: 1, duration: 0.33, ease: 'back.out(2)' }, ${w.toFixed(3)});`);
      out.push(`tl.fromTo('#h-j', { y: 0 }, { y: -18, duration: 0.17, repeat: 3, yoyo: true, ease: 'power2.out' }, ${w.toFixed(3)});`);
      out.push(`tl.to('#h-steam', { opacity: 0, y: -60, duration: 0.5, ease: 'power2.in' }, ${(w + 1.5).toFixed(3)});`);
    }
  });
  // boil: the puppet is re-touched between drawings, so it never sits perfectly still
  for (let t = 0; t < T.dur; t += 2 / FPS) out.push(`tl.set('#h-j', { x: ${(rnd() * 3 - 1.5).toFixed(2)}, y: ${(rnd() * 3 - 1.5).toFixed(2)}, rotation: ${(rnd() * 0.8 - 0.4).toFixed(2)} }, ${t.toFixed(3)});`);
  return out.join('\n');
}

// the clay texture is re-pressed every other drawing too (filter noise seeds step through the reel)
const boilScript = (T) => { const n = Math.max(1, Math.round(T.dur * FPS / 2)); return `tl.fromTo('#clay-defs .boil', { attr: { seed: 1 } }, { attr: { seed: ${n} }, duration: ${T.dur}, ease: 'steps(${n})' }, 0);`; };

module.exports = { FPS, defs, css, copyPngs, hostMarkup, hostScript, boilScript, POSES, MOODS };
