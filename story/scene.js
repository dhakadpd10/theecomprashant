// Story reels in 3D: Bunty (the founder with the problem) and Prashant (the AI guy with the fix) in Bunty's
// stockroom office. Stateless: window.renderAt(t) sets everything from time t, so any frame renders on its own.
import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { BokehPass } from 'three/addons/postprocessing/BokehPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { ShaderPass } from 'three/addons/postprocessing/ShaderPass.js';
import { makePerson } from './people.js';
import { drawScreen, SW, SH } from './screens.js';

const W = 1080, H = 1920, FPS = 30;
const TL = window.TL, BEATS = TL.beats;

// ---------- helpers ----------
const clamp = (x, a = 0, b = 1) => Math.max(a, Math.min(b, x));
const lerp = (a, b, x) => a + (b - a) * x;
const prog = (t, a, b) => clamp((t - a) / (b - a));
const eOut = (x) => 1 - Math.pow(1 - x, 3);
const eInOut = (x) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);
const eBack = (x) => { const c = 1.9; return 1 + (c + 1) * Math.pow(x - 1, 3) + c * Math.pow(x - 1, 2); };
const v3 = (x, y, z) => new THREE.Vector3(x, y, z);
const noise = (t, s) => Math.sin(t * 1.3 + s) * 0.5 + Math.sin(t * 2.1 + s * 1.7) * 0.3 + Math.sin(t * 0.7 + s * 3.1) * 0.2;
const mat = (color, o = {}) => new THREE.MeshStandardMaterial({ color, roughness: 0.75, ...o });
function mesh(geo, m, parent, x = 0, y = 0, z = 0) { const o = new THREE.Mesh(geo, m); o.position.set(x, y, z); o.castShadow = true; o.receiveShadow = true; if (parent) parent.add(o); return o; }
function canvasTex(w, h, draw) {
  const c = document.createElement('canvas'); c.width = w; c.height = h; const x = c.getContext('2d'); draw(x, w, h);
  const tex = new THREE.CanvasTexture(c); tex.colorSpace = THREE.SRGBColorSpace; tex.anisotropy = 8; tex.userData.ctx = x; return tex;
}
function rr(ctx, x, y, w, h, r) { r = Math.min(r, w / 2, h / 2); ctx.beginPath(); ctx.moveTo(x + r, y); ctx.arcTo(x + w, y, x + w, y + h, r); ctx.arcTo(x + w, y + h, x, y + h, r); ctx.arcTo(x, y + h, x, y, r); ctx.arcTo(x, y, x + w, y, r); ctx.closePath(); }
let seed = 7; const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);

// ---------- renderer ----------
const renderer = new THREE.WebGLRenderer({ antialias: true, preserveDrawingBuffer: true });
renderer.setPixelRatio(1); renderer.setSize(W, H);
renderer.shadowMap.enabled = true; renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.toneMapping = THREE.ACESFilmicToneMapping; renderer.toneMappingExposure = 1.08;
renderer.outputColorSpace = THREE.SRGBColorSpace;
document.getElementById('gl').appendChild(renderer.domElement);
const scene = new THREE.Scene(); scene.background = new THREE.Color('#E8D2B0');
const camera = new THREE.PerspectiveCamera(40, W / H, 0.03, 60);
const rt = new THREE.WebGLRenderTarget(W, H, { samples: 4, type: THREE.HalfFloatType });
const composer = new EffectComposer(renderer, rt);
composer.addPass(new RenderPass(scene, camera));
const bokeh = new BokehPass(scene, camera, { focus: 3, aperture: 0.004, maxblur: 0.008 }); composer.addPass(bokeh);
const bloom = new UnrealBloomPass(new THREE.Vector2(W / 2, H / 2), 0.22, 0.5, 0.92); composer.addPass(bloom);
composer.addPass(new OutputPass());
const film = new ShaderPass({
  uniforms: { tDiffuse: { value: null }, time: { value: 0 } },
  vertexShader: 'varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }',
  fragmentShader: `uniform sampler2D tDiffuse; uniform float time; varying vec2 vUv;
    float h(vec2 p){ return fract(sin(dot(p, vec2(12.9898, 78.233)) + time) * 43758.5453); }
    void main(){
      vec3 c = texture2D(tDiffuse, vUv).rgb;
      c = mix(c, c * vec3(1.04, 1.0, 0.95), 0.5);
      c = mix(vec3(dot(c, vec3(0.299, 0.587, 0.114))), c, 1.12);
      vec2 d = vUv - 0.5; d.x *= 0.62; c *= 1.0 - smoothstep(0.36, 0.8, length(d)) * 0.3;
      c += (h(vUv * 1000.0) - 0.5) * 0.016;
      gl_FragColor = vec4(c, 1.0);
    }`,
});
composer.addPass(film);

// ---------- lights: a bright, warm daytime stockroom ----------
const hemi = new THREE.HemisphereLight('#FFF1DC', '#7A5A44', 1.0); scene.add(hemi);
const key = new THREE.DirectionalLight('#FFD6A6', 2.4); key.position.set(-2.6, 4.6, 3.6); key.target.position.set(0, 1.3, 0);
key.castShadow = true; key.shadow.mapSize.set(2048, 2048); Object.assign(key.shadow.camera, { left: -4, right: 4, top: 4, bottom: -1.5, near: 0.5, far: 14 });
key.shadow.bias = -0.0005; key.shadow.radius = 6; scene.add(key); scene.add(key.target);
const fill = new THREE.DirectionalLight('#BFD4FF', 0.8); fill.position.set(3.2, 2.4, 3.0); scene.add(fill);
const rimL = new THREE.SpotLight('#FFE3B8', 9, 7, 0.6, 0.7, 1.4); rimL.position.set(-1.6, 3.6, -1.6); rimL.target.position.set(-0.4, 2.0, 0); scene.add(rimL); scene.add(rimL.target);
const rimR = new THREE.SpotLight('#B9CCFF', 8, 7, 0.6, 0.7, 1.4); rimR.position.set(1.8, 3.6, -1.6); rimR.target.position.set(0.5, 2.0, 0); scene.add(rimR); scene.add(rimR.target);
const faceFill = new THREE.PointLight('#FFE2C6', 1.2, 5, 2); faceFill.position.set(0, 2.2, 2.2); scene.add(faceFill);

// ---------- the stockroom ----------
const room = new THREE.Group(); scene.add(room);
const floor = mesh(new THREE.PlaneGeometry(16, 12), new THREE.MeshStandardMaterial({ roughness: 0.8, map: canvasTex(512, 512, (x, w, h) => {
  x.fillStyle = '#B9875A'; x.fillRect(0, 0, w, h);
  for (let i = 0; i < 8; i++) { x.fillStyle = i % 2 ? '#B07E52' : '#C18F62'; x.fillRect(0, i * 64, w, 62); x.fillStyle = 'rgba(80,50,30,0.35)'; x.fillRect(0, i * 64 + 62, w, 2); }
}) }), room, 0, 0, 0);
floor.rotation.x = -Math.PI / 2; floor.material.map.wrapS = floor.material.map.wrapT = THREE.RepeatWrapping; floor.material.map.repeat.set(4, 4);
// two-tone back wall: warm cream above, teal below
const wallZ = -2.3;
mesh(new THREE.PlaneGeometry(16, 6), mat('#F1DDBC', { roughness: 0.95 }), room, 0, 4.0, wallZ);
mesh(new THREE.PlaneGeometry(16, 1.4), mat('#2E7470', { roughness: 0.9 }), room, 0, 0.7, wallZ + 0.01);
mesh(new THREE.BoxGeometry(16, 0.06, 0.05), mat('#F6EBD6'), room, 0, 1.42, wallZ + 0.03);
const sideM = mat('#EBD4AE', { roughness: 0.95 });
const sL = mesh(new THREE.PlaneGeometry(12, 7), sideM, room, -3.6, 3.5, 2); sL.rotation.y = Math.PI / 2;
const sR = mesh(new THREE.PlaneGeometry(12, 7), sideM, room, 3.6, 3.5, 2); sR.rotation.y = -Math.PI / 2;

// the brand banner above their heads (text from post.json "brand")
const BRAND = { name: TL.brand.name || "BUNTY'S", line: TL.brand.line || 'Handmade kurtas · Jaipur' };
const banner = mesh(new RoundedBoxGeometry(2.7, 0.66, 0.05, 3, 0.02), new THREE.MeshStandardMaterial({ roughness: 0.6, map: canvasTex(1000, 248, (x, w, h) => {
  const g = x.createLinearGradient(0, 0, w, 0); g.addColorStop(0, '#E9641F'); g.addColorStop(1, '#F29A2E'); x.fillStyle = g; x.fillRect(0, 0, w, h);
  x.strokeStyle = '#FFE08A'; x.lineWidth = 8; x.setLineDash([18, 12]); x.strokeRect(14, 14, w - 28, h - 28); x.setLineDash([]);
  x.fillStyle = '#FFF6E2'; x.textAlign = 'center'; x.font = '120px "Archivo Black"'; x.fillText(BRAND.name, w / 2, 140);
  x.font = '700 42px InterB'; x.fillText(BRAND.line, w / 2, 205);
}) }), room, 0.02, 3.62, wallZ + 0.08);
banner.rotation.z = -0.015;
// fairy lights along the banner
const bulbMat = new THREE.MeshBasicMaterial({ color: '#FFE0A0', toneMapped: false });
for (let i = 0; i <= 30; i++) { const u = i / 30, x = lerp(-3.3, 3.3, u), y = 4.25 - Math.sin(u * Math.PI * 4) ** 2 * 0.28; const b = new THREE.Mesh(new THREE.SphereGeometry(0.035, 8, 6), bulbMat); b.position.set(x, y, wallZ + 0.1); room.add(b); }
// window with sunlight on the left
const winG = new THREE.Group(); winG.position.set(-2.45, 2.55, wallZ + 0.02); room.add(winG);
mesh(new THREE.PlaneGeometry(1.25, 1.6), new THREE.MeshBasicMaterial({ toneMapped: false, map: canvasTex(256, 330, (x, w, h) => {
  const g = x.createLinearGradient(0, 0, 0, h); g.addColorStop(0, '#9FD3FF'); g.addColorStop(0.7, '#DDF0FF'); g.addColorStop(1, '#FFE9C7'); x.fillStyle = g; x.fillRect(0, 0, w, h);
  x.fillStyle = 'rgba(255,255,255,0.9)'; [[60, 80, 40], [100, 70, 30], [180, 120, 34]].forEach(([cx, cy, r]) => { x.beginPath(); x.arc(cx, cy, r, 0, 7); x.fill(); });
  x.fillStyle = '#E9B98A'; for (let i = 0; i < 6; i++) { const bw = 30 + rnd() * 40, bh = 60 + rnd() * 90; x.fillRect(rnd() * w, h - bh, bw, bh); }
}) }), winG);
const wf = mat('#FFFFFF'); [[0, 0.82, 1.37, 0.07], [0, -0.82, 1.37, 0.07], [-0.66, 0, 0.07, 1.7], [0.66, 0, 0.07, 1.7], [0, 0, 0.04, 1.6], [0, 0.1, 1.25, 0.04]].forEach(([x, y, w, h]) => mesh(new THREE.BoxGeometry(w, h, 0.07), wf, winG, x, y, 0.03));
const pot = mesh(new THREE.CylinderGeometry(0.16, 0.12, 0.26, 12), mat('#C8693E'), winG, 0.35, -0.73, 0.15);
for (let i = 0; i < 9; i++) { const l = mesh(new THREE.SphereGeometry(0.11, 12, 8), mat('#4E9A57'), winG, 0.35 + (rnd() - 0.5) * 0.26, -0.5 + rnd() * 0.3, 0.15 + (rnd() - 0.5) * 0.15); l.scale.set(0.55, 1.4, 0.55); l.rotation.z = (rnd() - 0.5) * 1.3; }
// shelves full of stock on the right, and a pinboard of orders
const shelfG = new THREE.Group(); shelfG.position.set(2.25, 0, wallZ + 0.35); room.add(shelfG);
const plank = mat('#9C6B42');
[-0.85, 0.85].forEach((x) => mesh(new THREE.BoxGeometry(0.06, 3.2, 0.5), plank, shelfG, x, 1.6, 0));
const clothCols = ['#E8577E', '#F2A33A', '#2E8A8A', '#7C5CC4', '#E9C46A', '#D6453D', '#3D7DD8', '#F28BA0'];
[0.55, 1.35, 2.15, 2.95].forEach((y, s) => {
  mesh(new THREE.BoxGeometry(1.76, 0.05, 0.5), plank, shelfG, 0, y, 0);
  let x = -0.8;
  while (x < 0.72) {
    if (s % 2 === 0) { // folded kurtas in stacks
      const n = 3 + Math.floor(rnd() * 3); for (let j = 0; j < n; j++) { const c = mesh(new RoundedBoxGeometry(0.3, 0.07, 0.34, 2, 0.02), mat(clothCols[Math.floor(rnd() * clothCols.length)], { roughness: 0.95 }), shelfG, x + 0.16, y + 0.06 + j * 0.072, 0.02); c.rotation.y = (rnd() - 0.5) * 0.12; }
      x += 0.36;
    } else { // parcels
      const bw = 0.24 + rnd() * 0.18, bh = 0.2 + rnd() * 0.2; const b = mesh(new THREE.BoxGeometry(bw, bh, 0.36), mat('#C69A62'), shelfG, x + bw / 2, y + 0.025 + bh / 2, 0.02);
      mesh(new THREE.BoxGeometry(bw + 0.004, 0.006, 0.08), mat('#E3CFA2'), b, 0, bh / 2, 0); x += bw + 0.05;
    }
  }
});
const board = mesh(new THREE.BoxGeometry(1.15, 0.85, 0.04), mat('#C9A27A', { roughness: 1 }), room, -1.55, 2.0, wallZ + 0.04);
[[-0.3, 0.15, '#FFE36E', 'COD??'], [0.15, 0.2, '#9EE6C2', '42 orders'], [0.28, -0.18, '#FFB3C7', 'RTO :('], [-0.25, -0.2, '#BDE0FF', 'ship by 5']].forEach(([x, y, c, txt], i) => {
  const n = new THREE.Mesh(new THREE.PlaneGeometry(0.34, 0.3), new THREE.MeshStandardMaterial({ roughness: 0.9, map: canvasTex(160, 140, (cx) => { cx.fillStyle = c; cx.fillRect(0, 0, 160, 140); cx.fillStyle = '#2A2420'; cx.font = '34px "Permanent Marker"'; cx.textAlign = 'center'; cx.fillText(txt, 80, 82); }) }));
  n.position.set(x, y, 0.025); n.rotation.z = (i % 2 ? 1 : -1) * 0.08; board.add(n);
});
// wall clock
const clockG = new THREE.Group(); clockG.position.set(-1.55, 3.05, wallZ + 0.06); room.add(clockG);
mesh(new THREE.CylinderGeometry(0.26, 0.26, 0.05, 32), mat('#FFFFFF'), clockG).rotation.x = Math.PI / 2;
const hand1 = mesh(new THREE.BoxGeometry(0.02, 0.16, 0.01), mat('#222'), clockG, 0, 0.06, 0.03); const hand2 = mesh(new THREE.BoxGeometry(0.015, 0.21, 0.01), mat('#D6453D'), clockG, 0, 0.08, 0.035);

// ---------- the packing table in front of them ----------
const table = new THREE.Group(); room.add(table);
const TOP = 1.08, TZ = 0.78;
mesh(new RoundedBoxGeometry(3.2, 0.09, 0.78, 2, 0.02), mat('#B9834F', { roughness: 0.6 }), table, 0, TOP - 0.045, TZ);
mesh(new THREE.BoxGeometry(3.1, 0.9, 0.04), mat('#8E5E36'), table, 0, 0.55, TZ + 0.36);
[[-1.5, 0.45], [1.5, 0.45]].forEach(([x]) => mesh(new THREE.BoxGeometry(0.08, 1.0, 0.7), mat('#8E5E36'), table, x, 0.5, TZ));
// stuff on the table: parcels, folded kurtas, a tape gun, cutting chai, a phone stand
[[-1.25, 0.32, 0.36, 0.26, 0.3, 0.12], [-1.0, 0.4, 0.3, 0.2, 0.26, -0.2], [-1.2, 0.36, 0.26, 0.18, 0.22, 0.3]].forEach(([x, , w, h, d, r], i) => {
  const b = mesh(new THREE.BoxGeometry(w, h, d), mat('#C69A62'), table, x, TOP + h / 2 + (i === 2 ? 0.26 : 0), TZ + 0.02); b.rotation.y = r;
  mesh(new THREE.BoxGeometry(w + 0.004, 0.006, 0.07), mat('#E3CFA2'), b, 0, h / 2, 0);
  const lab = new THREE.Mesh(new THREE.PlaneGeometry(w * 0.6, h * 0.45), mat('#FFFFFF')); lab.position.set(0, 0, d / 2 + 0.002); b.add(lab);
});
for (let j = 0; j < 4; j++) mesh(new RoundedBoxGeometry(0.36, 0.06, 0.3, 2, 0.02), mat(clothCols[j * 2 % clothCols.length], { roughness: 0.95 }), table, 1.12, TOP + 0.03 + j * 0.062, TZ + 0.05).rotation.y = (j % 2 ? 0.06 : -0.05);
const chai = new THREE.Group(); chai.position.set(0.82, TOP, TZ + 0.18); table.add(chai);
mesh(new THREE.CylinderGeometry(0.045, 0.036, 0.11, 12), new THREE.MeshPhysicalMaterial({ color: '#FFFFFF', transmission: 0.6, roughness: 0.1, thickness: 0.02, transparent: true, opacity: 0.6 }), chai, 0, 0.055, 0);
mesh(new THREE.CylinderGeometry(0.04, 0.034, 0.08, 12), mat('#B9783F'), chai, 0, 0.042, 0);
const tape = new THREE.Group(); tape.position.set(-0.62, TOP, TZ + 0.2); table.add(tape);
mesh(new THREE.TorusGeometry(0.07, 0.03, 8, 20), mat('#E3CFA2', { roughness: 0.4 }), tape, 0, 0.1, 0);
mesh(new THREE.BoxGeometry(0.04, 0.12, 0.2), mat('#D6453D'), tape, 0, 0.06, 0.03);

// ---------- the people ----------
const bunty = makePerson('bunty', canvasTex), prashant = makePerson('prashant', canvasTex);
bunty.root.position.set(-0.64, 0, 0.0); bunty.root.rotation.y = 0.22; scene.add(bunty.root);
prashant.root.position.set(0.64, 0, -0.08); prashant.root.rotation.y = -0.24; scene.add(prashant.root);
const PEOPLE = { bunty, prashant };

// a small phone in Prashant's hand
const smallPhone = new THREE.Group(); prashant.grip.add(smallPhone);
mesh(new RoundedBoxGeometry(0.09, 0.18, 0.012, 2, 0.008), mat('#16181D'), smallPhone, 0, 0.06, 0.05);
const smallScr = new THREE.Mesh(new THREE.PlaneGeometry(0.08, 0.165), new THREE.MeshBasicMaterial({ color: '#CFE3FF', toneMapped: false })); smallScr.position.set(0, 0.06, 0.057); smallPhone.add(smallScr);
smallPhone.rotation.x = -0.4;

// the cardboard sign Bunty holds up (post.json "sign")
const signTex = canvasTex(900, 640, (x, w, h) => {
  x.fillStyle = '#D6A867'; x.fillRect(0, 0, w, h);
  for (let i = 0; i < 2600; i++) { x.fillStyle = `rgba(${rnd() < 0.5 ? '120,80,40' : '245,215,165'},${0.05 + rnd() * 0.08})`; x.fillRect(rnd() * w, rnd() * h, 1 + rnd() * 4, 1); }
  x.strokeStyle = 'rgba(90,60,30,0.35)'; x.lineWidth = 6; x.strokeRect(10, 10, w - 20, h - 20);
  const ls = String(TL.sign || TL.hook || '').split('\n').slice(0, 4); const fs = ls.length > 3 ? 104 : ls.length > 2 ? 120 : 140;
  x.fillStyle = '#1C1A2E'; x.textAlign = 'center'; x.textBaseline = 'middle'; x.font = `${fs}px "Permanent Marker"`;
  ls.forEach((l, i) => { let f = fs; x.font = `${f}px "Permanent Marker"`; while (x.measureText(l).width > w - 70 && f > 50) { f -= 6; x.font = `${f}px "Permanent Marker"`; } x.fillText(l, w / 2, h / 2 + (i - (ls.length - 1) / 2) * fs * 1.05); });
});
const sign = mesh(new RoundedBoxGeometry(1.12, 0.78, 0.02, 2, 0.01), [mat('#B98A50'), mat('#B98A50'), mat('#B98A50'), mat('#B98A50'), new THREE.MeshStandardMaterial({ map: signTex, roughness: 0.95 }), mat('#B98A50')], scene);

// the big phone for close-ups (held up to the camera)
const hero = new THREE.Group(); scene.add(hero);
const HERO = v3(0.04, 1.72, 1.55);
hero.position.copy(HERO);
mesh(new RoundedBoxGeometry(0.17, 0.345, 0.018, 4, 0.022), new THREE.MeshPhysicalMaterial({ color: '#1A1C22', roughness: 0.3, metalness: 0.5, clearcoat: 1 }), hero, 0, 0, 0);
const heroTex = canvasTex(SW, SH, () => {});
const heroScr = new THREE.Mesh(new THREE.PlaneGeometry(0.156, 0.312), new THREE.MeshBasicMaterial({ map: heroTex, toneMapped: false })); heroScr.position.z = 0.0095; hero.add(heroScr);
const notch = new THREE.Mesh(new RoundedBoxGeometry(0.04, 0.008, 0.002, 2, 0.003), new THREE.MeshBasicMaterial({ color: '#000' })); notch.position.set(0, 0.148, 0.011); hero.add(notch);
const heroHand = new THREE.Group(); hero.add(heroHand);
const hs = new THREE.MeshPhysicalMaterial({ color: '#C48858', roughness: 0.55, sheen: 0.4, sheenColor: new THREE.Color('#FFB89A') });
mesh(new THREE.SphereGeometry(0.06, 32, 24), hs, heroHand, 0.095, -0.165, -0.03).scale.set(0.8, 1.3, 0.7);
mesh(new THREE.SphereGeometry(0.02, 16, 12), hs, heroHand, 0.088, -0.1, 0.012).scale.set(0.7, 1.4, 0.6);
mesh(new THREE.CylinderGeometry(0.075, 0.07, 0.25, 24, 1, true), new THREE.MeshPhysicalMaterial({ color: '#2A3A5C', roughness: 0.85, sheen: 1 }), heroHand, 0.12, -0.3, -0.06).rotation.z = 0.5;
let heroKey = '';
function drawHero(s, u, t) {
  const k = JSON.stringify(s) + Math.round(u * 60) + (s.type === 'chat' ? Math.floor(t * 4) % 2 : '');
  if (k === heroKey) return; heroKey = k;
  const x = heroTex.userData.ctx; x.clearRect(0, 0, SW, SH); drawScreen(x, s, u, t); heroTex.needsUpdate = true;
}

// ---------- HUD: hook title, word-pop captions, speaker tag, the comment sticker ----------
const hud = document.getElementById('hud').getContext('2d');
const HOT = (TL.hot || []).map((w) => String(w).toLowerCase());
const isHot = (w) => { const c = w.toLowerCase().replace(/[^a-z0-9₹%]/g, ''); return /\d/.test(c) || HOT.some((h) => h.toLowerCase().replace(/[^a-z0-9₹%]/g, '') === c) || c === String(TL.keyword || '').toLowerCase(); };
function wrapWords(words, maxW) { const ls = []; let cur = []; for (const w of words) { const t = [...cur, w].join(' '); if (hud.measureText(t).width > maxW && cur.length) { ls.push(cur); cur = [w]; } else cur.push(w); } if (cur.length) ls.push(cur); return ls; }
function boldLine(words, cx, y, size, hotCol = '#FFD400') {
  const full = words.join(' '), wFull = hud.measureText(full).width; let x = cx - wFull / 2;
  for (const w of words) {
    const ww = hud.measureText(w + ' ').width;
    hud.lineJoin = 'round'; hud.lineWidth = size * 0.2; hud.strokeStyle = '#111111'; hud.strokeText(w, x, y);
    hud.fillStyle = isHot(w) ? hotCol : '#FFFFFF'; hud.fillText(w, x, y); x += ww;
  }
}
const TAG = { bunty: ['BUNTY', '#EE8A2A'], prashant: ['PRASHANT', '#4C74D9'] };
function caption(b, t) {
  const c = b.caps.find((x) => t >= x.at - 0.05 && t < x.end + 0.08) || (t >= b.vo && b.caps.length && t < b.end ? b.caps[b.caps.length - 1] : null);
  if (!c) return;
  const pop = eBack(prog(t, c.at - 0.05, c.at + 0.12));
  const Y = b.shot === 'phone' ? 235 : 1330;
  hud.save(); hud.translate(W / 2, Y); hud.scale(0.85 + pop * 0.15, 0.85 + pop * 0.15); hud.translate(-W / 2, -Y);
  hud.font = '82px "Archivo Black"'; hud.textAlign = 'left'; hud.textBaseline = 'middle';
  const ls = wrapWords(c.text.split(' '), 900).slice(0, 2);
  ls.forEach((l, i) => boldLine(l, W / 2, Y + (i - (ls.length - 1) / 2) * 98, 82));
  hud.restore();
  // who is talking
  const tg = TAG[b.who]; if (tg && b.shot !== 'phone') {
    hud.save(); hud.font = '800 34px InterXB'; hud.textAlign = 'center'; hud.textBaseline = 'middle';
    const tw = hud.measureText(tg[0]).width + 44, ty = Y - (ls.length > 1 ? 150 : 104);
    rr(hud, W / 2 - tw / 2, ty - 26, tw, 52, 26); hud.fillStyle = tg[1]; hud.fill(); hud.fillStyle = '#FFFFFF'; hud.fillText(tg[0], W / 2, ty + 1); hud.restore();
  }
}
function hookTitle(t) {
  if (!TL.hook) return;
  const b0 = BEATS[0], until = b0.end + (BEATS[1] ? 0.6 : 0);
  if (t > until + 0.3) return;
  const a = Math.min(eBack(prog(t, 0.05, 0.35)), 1 - prog(t, until, until + 0.3));
  hud.save(); hud.globalAlpha = clamp(a); hud.translate(W / 2, 330); hud.rotate(-0.025); hud.scale(0.7 + 0.3 * a, 0.7 + 0.3 * a); hud.translate(-W / 2, -330);
  hud.font = '96px "Archivo Black"'; hud.textBaseline = 'middle';
  const ls = wrapWords(String(TL.hook).split(' '), 960).slice(0, 3);
  ls.forEach((l, i) => boldLine(l, W / 2, 330 + (i - (ls.length - 1) / 2) * 112, 96));
  hud.restore();
}
function ctaSticker(b, t) {
  const a = eBack(prog(t, b.start + 0.1, b.start + 0.45));
  const close = b.shot && b.shot !== 'two' && b.shot !== 'wide', y = (close ? 215 : 360) + Math.sin(t * 4) * 6;
  hud.save(); hud.translate(W / 2, y); hud.rotate(-0.04 + Math.sin(t * 3) * 0.01); hud.scale(a * (close ? 0.72 : 1), a * (close ? 0.72 : 1));
  hud.font = '58px "Archivo Black"'; hud.textAlign = 'center'; hud.textBaseline = 'middle';
  const top = 'COMMENT', kw = String(TL.keyword || '').toUpperCase();
  hud.font = '130px "Archivo Black"'; const kwW = hud.measureText(kw).width;
  const w = Math.max(kwW + 120, 560), h = 270;
  rr(hud, -w / 2 + 10, -h / 2 + 14, w, h, 40); hud.fillStyle = 'rgba(0,0,0,0.35)'; hud.fill();
  rr(hud, -w / 2, -h / 2, w, h, 40); hud.fillStyle = '#FFD400'; hud.fill(); hud.lineWidth = 8; hud.strokeStyle = '#111'; hud.stroke();
  hud.fillStyle = '#111'; hud.font = '56px "Archivo Black"'; hud.fillText(top, 0, -72);
  hud.font = '130px "Archivo Black"'; hud.fillText(kw, 0, 36);
  hud.restore();
}

// ---------- the director ----------
const beatAt = (t) => BEATS.find((b) => t >= b.start && t < b.end) || BEATS[BEATS.length - 1];
function talk(who, t) { for (const b of BEATS) if (b.who === who && b.vo !== null && t >= b.vo && t < b.vo + b.len) { const f = Math.floor((t - b.vo) * FPS); return clamp((b.env[f] || 0) * 1.3); } return 0; }
function blinkAt(t, s) { const period = 3.0 + (s % 3) * 0.8, ph = ((t + s) % period) / period; return ph > 0.955 ? Math.sin(((ph - 0.955) / 0.045) * Math.PI) : 0; }
// what each person is doing in a beat: the speaker uses the beat's act/mood, the listener its "other" or their last state
function stateIn(name, b) {
  if (!b) return { act: 'idle', mood: 'normal' };
  if (b.who === name) return { act: b.act || 'explain', mood: b.mood || 'normal' };
  const o = (b.other && b.other.who === name) || (b.other && !b.other.who) ? b.other : null;
  if (o) return { act: o.act || 'idle', mood: o.mood || 'normal' };
  let mood = 'normal'; for (const x of BEATS) { if (x.i > b.i) break; if (x.who === name && x.mood) mood = x.mood; }
  return { act: name === 'prashant' && b.shot === 'phone' ? 'phone' : 'idle', mood: mood === 'shock' ? 'worried' : mood };
}
function poseAll(t, b, over) {
  for (const name of ['bunty', 'prashant']) {
    const p = PEOPLE[name], other = name === 'bunty' ? prashant : bunty;
    const cur = over?.[name] || stateIn(name, b), prev = over?.[name] || stateIn(name, BEATS[b.i - 1]);
    const tk = talk(name, t), toward = name === 'bunty' ? 1 : -1;
    const blend = over ? 1 : eInOut(prog(t, b.start - 0.05, b.start + 0.32));
    const h1 = p.handsFor(cur.act, t, tk, toward), h0 = p.handsFor(prev.act, t, tk, toward);
    const hands = [h0[0].lerp(h1[0], blend), h0[1].lerp(h1[1], blend)];
    // look at the other person, at the camera on "look": "camera", or down at the phone
    const toCam = (b.look === 'camera' && b.who === name) || over?.[name]?.look === 'camera';
    const yawOther = name === 'bunty' ? 0.42 : -0.4, yawCam = -p.root.rotation.y;
    const yaw = cur.act === 'phone' ? 0.15 : toCam ? yawCam : (b.who === name || b.who === (name === 'bunty' ? 'prashant' : 'bunty')) ? yawOther : yawCam * 0.5;
    const shock = cur.mood === 'shock' && b.who === name ? eOut(prog(t, b.vo - 0.1, b.vo + 0.25)) : 0;
    p.pose({ hands, mood: cur.mood, talk: tk, blink: blinkAt(t, name.length), yaw, pitch: cur.act === 'phone' ? 0.18 : 0, lean: cur.act === 'celebrate' ? -0.05 : 0, shock }, t);
    void other;
  }
  smallPhone.visible = (over?.prashant?.act || stateIn('prashant', b).act) === 'phone';
  const signUp = (over?.bunty?.act || stateIn('bunty', b).act) === 'sign';
  sign.visible = signUp;
  if (signUp) { const a = v3(-0.55, 1.4, 0.55), c = v3(0.55, 1.4, 0.55); bunty.root.localToWorld(a); bunty.root.localToWorld(c); sign.position.copy(a.add(c).multiplyScalar(0.5)).add(v3(0, 0.12, 0.09)); sign.rotation.set(-0.05, bunty.root.rotation.y * 0.4, Math.sin(t * 2) * 0.015); }
}

// camera shots
function shotCam(b, t) {
  const u = prog(t, b.start, b.end), d = noise(t * 0.6, b.i) * 0.01, d2 = noise(t * 0.5, b.i + 4) * 0.008;
  const bh = bunty.headWorld(), ph = prashant.headWorld();
  const punch = b.punch ? 1 + 0.08 * eOut(prog(t, b.vo, b.vo + 0.2)) : 1;
  switch (b.shot) {
    case 'bunty': return { p: bh.clone().add(v3(0.85 + d, -0.25 + d2, lerp(3.75, 3.55, u) / punch)), l: bh.clone().add(v3(0.14, -0.5, 0)), fov: 36, focus: bh };
    case 'bunty-push': return { p: bh.clone().add(v3(lerp(0.75, 0.45, eInOut(u)) + d, -0.18, lerp(4.3, 3.0, eInOut(u)))), l: bh.clone().add(v3(0.08, lerp(-0.45, -0.3, eInOut(u)), 0)), fov: 36, focus: bh };
    case 'prashant': return { p: ph.clone().add(v3(-0.85 + d, -0.25 + d2, lerp(3.75, 3.55, u) / punch)), l: ph.clone().add(v3(-0.14, -0.5, 0)), fov: 36, focus: ph };
    case 'prashant-push': return { p: ph.clone().add(v3(lerp(-0.75, -0.45, eInOut(u)) + d, -0.18, lerp(4.3, 3.0, eInOut(u)))), l: ph.clone().add(v3(-0.08, lerp(-0.45, -0.3, eInOut(u)), 0)), fov: 36, focus: ph };
    case 'phone': return { p: HERO.clone().add(v3(0.012 + d * 0.4, 0.035 + d2 * 0.4, lerp(0.66, 0.6, eOut(u)))), l: HERO.clone().add(v3(0, 0.035, 0)), fov: 40, focus: HERO, phone: true };
    case 'wide': return { p: v3(d, 2.3, lerp(6.6, 6.2, u)), l: v3(0, 1.8, 0), fov: 40, focus: null };
    case 'sign': return { p: v3(bunty.root.position.x + 0.15 + d, 1.95, lerp(3.4, 3.15, eInOut(u))), l: v3(bunty.root.position.x + 0.05, 1.85, 0), fov: 40, focus: bh };
    default: return { p: v3(0.02 + d, 2.0 + d2, lerp(5.0, 4.75, u) / punch), l: v3(0.02, 1.95, 0), fov: 40, focus: null }; // "two"
  }
}

function frame(t, b, over) {
  hand1.rotation.z = -t * 0.02; hand2.rotation.z = -t * 0.3;
  poseAll(t, b, over);
  // the big phone
  const c = over?.cam ? { ...over.cam, focus: over.cam.focus === 'sign' ? sign.position.clone() : over.cam.focus } : shotCam(b, t);
  hero.visible = !!c.phone;
  if (c.phone) {
    const s = b.screen || { type: 'chat', ask: '', answer: '' };
    drawHero(s, prog(t, b.vo ?? b.start, (b.vo ?? b.start) + Math.max(0.8, b.len * 0.92)), t);
    hero.rotation.set(-0.03 + noise(t, 3) * 0.01, 0.05 + noise(t * 0.7, 5) * 0.02, -0.02 + noise(t * 0.5, 1) * 0.01);
  }
  camera.position.copy(c.p); camera.lookAt(c.l); camera.fov = c.fov; camera.updateProjectionMatrix();
  if (c.focus) { bokeh.uniforms.focus.value = camera.position.distanceTo(c.focus); bokeh.uniforms.aperture.value = c.phone ? 0.05 : 0.02; bokeh.uniforms.maxblur.value = c.phone ? 0.022 : 0.012; }
  else { bokeh.uniforms.focus.value = camera.position.distanceTo(v3(0, 1.8, 0)); bokeh.uniforms.aperture.value = 0.004; bokeh.uniforms.maxblur.value = 0.005; }
  bloom.strength = c.phone ? 0.0 : 0.22;
  film.uniforms.time.value = (t * 30) % 97;
  composer.render();
}

function renderAt(t) {
  const b = beatAt(t);
  frame(t, b);
  hud.clearRect(0, 0, W, H);
  hookTitle(t);
  if (b.cta) ctaSticker(b, t);
  if (b.vo !== null) caption(b, t);
  const fade = Math.max(1 - prog(t, 0, 0.12), prog(t, TL.DUR - 0.4, TL.DUR));
  if (fade > 0) { hud.fillStyle = `rgba(0,0,0,${fade})`; hud.fillRect(0, 0, W, H); }
}
window.renderAt = renderAt;
// cover: Bunty holds up the sign, Prashant points at it
window.renderCover = () => {
  const b = { ...BEATS[0], i: 0, start: 0, end: 1, vo: null, shot: 'sign', look: 'camera' };
  const mood = TL.cover.mood || 'worried';
  frame(1.0, b, { bunty: { act: 'sign', mood, look: 'camera' }, prashant: { act: 'point', mood: 'smug' }, cam: { p: v3(-0.3, 1.95, 4.75), l: v3(-0.3, 1.88, 0), fov: 40, focus: 'sign' } });
  hud.clearRect(0, 0, W, H);
};
renderAt(0.5);
window.ready = true;
