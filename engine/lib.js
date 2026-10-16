// Drawing library + scene types for the 2D clay-character reels (the demo-01 look).
// Every scene is a pure function of time, so any frame can be drawn on its own.
const fs = require('fs');
const path = require('path');
const { GlobalFonts } = require('@napi-rs/canvas');

const W = 1080, H = 1920;
// Fonts ship with npm (works on Windows, Mac and the Linux cloud runner). Noto Sans covers ₹, Noto Symbols 2 covers ★.
const FONTS = path.dirname(path.dirname(require.resolve('@fontsource/inter/package.json')));
const reg = (file, name) => { const f = path.join(FONTS, file); if (fs.existsSync(f)) GlobalFonts.registerFromPath(f, name); };
reg('archivo-black/files/archivo-black-latin-400-normal.woff', 'Archivo');
reg('inter/files/inter-latin-800-normal.woff', 'InterXB');
reg('inter/files/inter-latin-700-normal.woff', 'InterB');
reg('inter/files/inter-latin-600-normal.woff', 'InterSB');
// one family per file: a family only falls back to the next family, never to its own other files
reg('noto-sans/files/noto-sans-devanagari-700-normal.woff', 'NotoRupee'); // has ₹
reg('noto-sans/files/noto-sans-latin-ext-700-normal.woff', 'NotoExt');
reg('noto-sans-symbols-2/files/noto-sans-symbols-2-symbols-400-normal.woff', 'NotoSym'); // has ★
const FB = 'NotoRupee, NotoExt, NotoSym';
const AR = (s) => `400 ${s}px Archivo, ${FB}`;
const XB = (s) => `800 ${s}px InterXB, ${FB}`;
const B = (s) => `700 ${s}px InterB, ${FB}`;
const SB = (s) => `600 ${s}px InterSB, ${FB}`;

const C = {
  ink: '#0F1218', ink2: '#171C26', ink3: '#222937', line: '#2E3646',
  paper: '#F5F0E6', paperDim: '#E6DFD2', text: '#14161C', mute: '#7C8494',
  yellow: '#FFD23F', green: '#2FD38A', red: '#FF5A5F', white: '#FFFFFF',
};

// ---------- easing ----------
const clamp = (x, a = 0, b = 1) => Math.max(a, Math.min(b, x));
const lerp = (a, b, x) => a + (b - a) * x;
const prog = (t, a, b) => clamp((t - a) / (b - a));
const eOut = (x) => 1 - Math.pow(1 - x, 3);
const eBack = (x, s = 1.7) => (x <= 0 ? 0 : 1 + (s + 1) * Math.pow(x - 1, 3) + s * Math.pow(x - 1, 2));
const spring = (x) => (x <= 0 ? 0 : 1 - Math.exp(-6.5 * x) * Math.cos(10 * x));

function hex(c) { const n = parseInt(c.slice(1), 16); return [(n >> 16) & 255, (n >> 8) & 255, n & 255]; }
function mix(c, d, k) { const a = hex(c), b = hex(d); return `rgb(${a.map((v, i) => Math.round(lerp(v, b[i], k))).join(',')})`; }
const light = (c, k) => mix(c, '#FFFFFF', k);
const dark = (c, k) => mix(c, '#000000', k);
const rgba = (c, a) => { const [r, g, b] = hex(c); return `rgba(${r},${g},${b},${a})`; };

function rrect(ctx, x, y, w, h, r) {
  r = Math.min(r, w / 2, h / 2);
  ctx.beginPath(); ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r); ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r); ctx.arcTo(x, y, x + w, y, r); ctx.closePath();
}
function textFit(ctx, str, font, size, maxW) {
  let s = size; ctx.font = font(s);
  while (ctx.measureText(str).width > maxW && s > 20) { s -= 2; ctx.font = font(s); }
  return s;
}
function wrap(ctx, str, maxW) {
  const words = str.split(' '); const lines = []; let cur = '';
  for (const w of words) { const t = cur ? cur + ' ' + w : w; if (ctx.measureText(t).width > maxW && cur) { lines.push(cur); cur = w; } else cur = t; }
  if (cur) lines.push(cur);
  return lines;
}

// ---------- characters ----------
// cast entry: { name, col, prop }  props: question tag gift glass phone heart shades gavel cart none
function character(ctx, x, y, s, ch, o = {}) {
  const style = o.style || WORLD.char;
  if (style !== 'box' && CHARS[style]) return CHARS[style](ctx, x, y, s, ch, o);
  const col = ch.col, mood = o.mood || 'neutral', sq = o.squash || 0;
  const w = 118 * s * (1 + sq * 0.12), h = 140 * s * (1 - sq * 0.12), d = 20 * s;
  const left = x - w / 2 - d / 2, top = y - h - 14 * s;
  ctx.save();
  if (o.alpha !== undefined) ctx.globalAlpha *= o.alpha;
  ctx.fillStyle = 'rgba(0,0,0,0.35)';
  ctx.beginPath(); ctx.ellipse(x + d / 3, y + 2 * s, w * 0.62, 14 * s, 0, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = dark(col, 0.45);
  rrect(ctx, x - w * 0.32 - d / 2, y - 18 * s, 30 * s, 20 * s, 7 * s); ctx.fill();
  rrect(ctx, x + w * 0.06 - d / 2, y - 18 * s, 30 * s, 20 * s, 7 * s); ctx.fill();
  ctx.fillStyle = dark(col, 0.28);
  ctx.beginPath(); ctx.moveTo(left + w, top + 8 * s); ctx.lineTo(left + w + d, top - d + 8 * s);
  ctx.lineTo(left + w + d, top - d + h); ctx.lineTo(left + w, top + h); ctx.closePath(); ctx.fill();
  ctx.fillStyle = light(col, 0.3);
  ctx.beginPath(); ctx.moveTo(left + 8 * s, top); ctx.lineTo(left + w, top); ctx.lineTo(left + w + d, top - d);
  ctx.lineTo(left + d + 8 * s, top - d); ctx.closePath(); ctx.fill();
  const g = ctx.createLinearGradient(left, top, left + w * 0.3, top + h);
  g.addColorStop(0, light(col, 0.16)); g.addColorStop(0.55, col); g.addColorStop(1, dark(col, 0.14));
  ctx.fillStyle = g; rrect(ctx, left, top, w, h, 14 * s); ctx.fill();
  ctx.strokeStyle = rgba('#FFFFFF', 0.18); ctx.lineWidth = 3 * s;
  rrect(ctx, left + 4 * s, top + 4 * s, w - 8 * s, h - 8 * s, 11 * s); ctx.stroke();
  const fx = left + w / 2 + (o.look || 0) * 10 * s, fy = top + h * 0.42;
  const blink = o.blink ? 0.12 : 1;
  ctx.fillStyle = '#1A1C22';
  if (ch.prop === 'shades') {
    ctx.fillStyle = '#0B0C0F';
    rrect(ctx, fx - 44 * s, fy - 16 * s, 40 * s, 26 * s, 8 * s); ctx.fill();
    rrect(ctx, fx + 4 * s, fy - 16 * s, 40 * s, 26 * s, 8 * s); ctx.fill();
    ctx.fillRect(fx - 6 * s, fy - 10 * s, 12 * s, 5 * s);
  } else {
    const eh = 24 * s * blink;
    rrect(ctx, fx - 28 * s, fy - eh / 2, 15 * s, eh, 6 * s); ctx.fill();
    rrect(ctx, fx + 13 * s, fy - eh / 2, 15 * s, eh, 6 * s); ctx.fill();
  }
  if (mood === 'frown' || mood === 'angry') {
    ctx.strokeStyle = '#1A1C22'; ctx.lineWidth = 5 * s; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(fx - 32 * s, fy - 24 * s); ctx.lineTo(fx - 12 * s, fy - 18 * s); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(fx + 32 * s, fy - 24 * s); ctx.lineTo(fx + 12 * s, fy - 18 * s); ctx.stroke();
  }
  ctx.fillStyle = rgba('#FF6B8A', 0.28);
  ctx.beginPath(); ctx.ellipse(fx - 38 * s, fy + 20 * s, 10 * s, 6 * s, 0, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath(); ctx.ellipse(fx + 38 * s, fy + 20 * s, 10 * s, 6 * s, 0, 0, Math.PI * 2); ctx.fill();
  ctx.strokeStyle = '#1A1C22'; ctx.lineWidth = 5 * s; ctx.lineCap = 'round';
  ctx.beginPath();
  const my = fy + 32 * s;
  if (mood === 'happy') ctx.arc(fx, my - 10 * s, 13 * s, 0.15 * Math.PI, 0.85 * Math.PI);
  else if (mood === 'frown' || mood === 'angry') ctx.arc(fx, my + 10 * s, 12 * s, 1.18 * Math.PI, 1.82 * Math.PI);
  else { ctx.moveTo(fx - 9 * s, my); ctx.lineTo(fx + 9 * s, my); }
  ctx.stroke();
  prop(ctx, ch.prop, left + w + d * 0.6, top + h * 0.55, s, o.t || 0);
  ctx.restore();
}
function prop(ctx, p, x, y, s, t) {
  if (!p || p === 'none' || p === 'shades') return;
  ctx.save(); ctx.translate(x, y + Math.sin(t * 4) * 3 * s);
  ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  if (p === 'question') {
    ctx.fillStyle = C.white; rrect(ctx, 4 * s, -92 * s, 46 * s, 50 * s, 14 * s); ctx.fill();
    ctx.fillStyle = C.text; ctx.font = XB(36 * s); ctx.fillText('?', 27 * s, -66 * s);
  } else if (p === 'tag') {
    ctx.rotate(-0.25); ctx.fillStyle = C.red;
    ctx.beginPath(); ctx.moveTo(0, -20 * s); ctx.lineTo(46 * s, -20 * s); ctx.lineTo(60 * s, 0); ctx.lineTo(46 * s, 20 * s); ctx.lineTo(0, 20 * s); ctx.closePath(); ctx.fill();
    ctx.fillStyle = C.white; ctx.font = XB(22 * s); ctx.fillText('%', 24 * s, 1 * s);
  } else if (p === 'gift') {
    ctx.fillStyle = '#E8475F'; rrect(ctx, -2 * s, -10 * s, 50 * s, 44 * s, 6 * s); ctx.fill();
    ctx.fillStyle = C.yellow; ctx.fillRect(19 * s, -10 * s, 8 * s, 44 * s); ctx.fillRect(-2 * s, 6 * s, 50 * s, 8 * s);
  } else if (p === 'glass') {
    ctx.strokeStyle = '#2A2E38'; ctx.lineWidth = 7 * s;
    ctx.beginPath(); ctx.arc(22 * s, -16 * s, 20 * s, 0, Math.PI * 2); ctx.stroke();
    ctx.fillStyle = rgba('#CFE8FF', 0.55); ctx.fill();
    ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(8 * s, 0); ctx.lineTo(-6 * s, 18 * s); ctx.stroke();
  } else if (p === 'phone') {
    ctx.fillStyle = '#1B1E26'; rrect(ctx, 0, -36 * s, 34 * s, 58 * s, 7 * s); ctx.fill();
    ctx.fillStyle = '#9CC2FF'; rrect(ctx, 4 * s, -31 * s, 26 * s, 46 * s, 4 * s); ctx.fill();
  } else if (p === 'heart') {
    ctx.fillStyle = '#FF4F79'; ctx.beginPath(); ctx.moveTo(22 * s, 10 * s);
    ctx.bezierCurveTo(-8 * s, -10 * s, 2 * s, -38 * s, 22 * s, -22 * s);
    ctx.bezierCurveTo(42 * s, -38 * s, 52 * s, -10 * s, 22 * s, 10 * s); ctx.fill();
  } else if (p === 'gavel') {
    ctx.rotate(-0.5 + Math.sin(t * 6) * 0.05);
    ctx.fillStyle = '#8A5A3B'; rrect(ctx, 8 * s, -6 * s, 10 * s, 56 * s, 4 * s); ctx.fill();
    ctx.fillStyle = '#6B4128'; rrect(ctx, -12 * s, -26 * s, 50 * s, 24 * s, 8 * s); ctx.fill();
  } else if (p === 'cart') {
    ctx.strokeStyle = '#2A2E38'; ctx.lineWidth = 5 * s; ctx.lineJoin = 'round';
    ctx.beginPath(); ctx.moveTo(-6 * s, -30 * s); ctx.lineTo(4 * s, -30 * s); ctx.lineTo(12 * s, 0); ctx.lineTo(48 * s, 0); ctx.lineTo(54 * s, -22 * s); ctx.lineTo(8 * s, -22 * s); ctx.stroke();
    ctx.fillStyle = '#2A2E38'; ctx.beginPath(); ctx.arc(18 * s, 10 * s, 5 * s, 0, 7); ctx.arc(44 * s, 10 * s, 5 * s, 0, 7); ctx.fill();
  }
  ctx.restore();
}
function chip(ctx, x, y, str, o = {}) {
  const fs = o.size || 30, a = o.alpha === undefined ? 1 : o.alpha;
  if (a <= 0) return;
  ctx.save(); ctx.globalAlpha *= a;
  ctx.font = (o.font || B)(fs);
  const w = ctx.measureText(str).width + fs * 1.2, hh = fs * 1.6;
  const sc = o.scale === undefined ? 1 : o.scale;
  ctx.translate(x, y + hh / 2); ctx.scale(sc, sc); ctx.rotate(o.rot || 0);
  ctx.fillStyle = o.bg || C.paper; rrect(ctx, -w / 2, -hh / 2, w, hh, hh / 2); ctx.fill();
  ctx.fillStyle = o.fg || C.text; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  ctx.fillText(str, 0, 1);
  ctx.restore();
}
function bubble(ctx, x, y, lines, a, o = {}) {
  if (a <= 0.01) return;
  ctx.save(); ctx.translate(x, y); ctx.scale(a, a);
  ctx.font = XB(o.size || 34);
  const w = Math.max(...lines.map((l) => ctx.measureText(l).width)) + 68, h = lines.length * (o.size || 34) * 1.3 + 46;
  ctx.fillStyle = o.bg || C.white; rrect(ctx, 0, -h, w, h, 30); ctx.fill();
  ctx.beginPath(); ctx.moveTo(30, -6); ctx.lineTo(o.tail === 'right' ? w - 20 : -20, 44); ctx.lineTo(90, -6); ctx.fill();
  ctx.fillStyle = o.fg || C.text; ctx.textAlign = 'left'; ctx.textBaseline = 'middle';
  lines.forEach((l, i) => ctx.fillText(l, 34, -h + 23 + (o.size || 34) * 0.65 + i * (o.size || 34) * 1.3));
  ctx.restore();
}

// ---------- the product page card ----------
function productPage(ctx, x, y, w, o = {}) {
  const k = w / 740;
  ctx.save(); ctx.translate(x, y); ctx.scale(k, k);
  ctx.fillStyle = 'rgba(0,0,0,0.4)'; rrect(ctx, 14, 22, 740, 820, 40); ctx.fill();
  ctx.fillStyle = C.paper; rrect(ctx, 0, 0, 740, 820, 40); ctx.fill();
  ctx.fillStyle = C.paperDim; rrect(ctx, 0, 0, 740, 70, 40); ctx.fill(); ctx.fillRect(0, 40, 740, 30);
  ['#FF6B6B', '#FFC857', '#2FD38A'].forEach((c, i) => { ctx.fillStyle = c; ctx.beginPath(); ctx.arc(40 + i * 30, 35, 9, 0, Math.PI * 2); ctx.fill(); });
  ctx.fillStyle = C.paper; rrect(ctx, 150, 18, 520, 34, 17); ctx.fill();
  ctx.fillStyle = C.mute; ctx.font = SB(20); ctx.textBaseline = 'middle'; ctx.textAlign = 'left';
  ctx.fillText(o.url || 'yourstore.com/products/bestseller', 172, 36);
  const ig = ctx.createLinearGradient(40, 100, 40, 420); ig.addColorStop(0, '#FFE7A8'); ig.addColorStop(1, '#FFC857');
  ctx.fillStyle = ig; rrect(ctx, 40, 100, 300, 320, 28); ctx.fill();
  ctx.fillStyle = '#2C3442'; rrect(ctx, 160, 135, 60, 40, 10); ctx.fill();
  const bg = ctx.createLinearGradient(120, 0, 260, 0); bg.addColorStop(0, '#F3F6FA'); bg.addColorStop(0.5, '#FFFFFF'); bg.addColorStop(1, '#D4DAE3');
  ctx.fillStyle = bg; rrect(ctx, 125, 170, 130, 220, 34); ctx.fill();
  ctx.fillStyle = C.green; rrect(ctx, 125, 245, 130, 70, 6); ctx.fill();
  ctx.fillStyle = C.white; ctx.font = XB(26); ctx.textAlign = 'center'; ctx.fillText(o.label || 'GLOW', 190, 281);
  ctx.textAlign = 'left'; ctx.fillStyle = C.text; ctx.font = XB(o.title && o.title.length > 16 ? 34 : 40); ctx.fillText(o.title || 'Daily Glow Serum', 370, 132);
  ctx.font = XB(46); ctx.fillText(o.price || '₹1,499', 370, 200);
  ctx.fillStyle = '#F5A623'; ctx.font = B(32); ctx.fillText('★★★★☆', 370, 262);
  ctx.fillStyle = C.mute; ctx.font = SB(24); ctx.fillText('(12 reviews)', 520, 263);
  ctx.fillStyle = C.text; rrect(ctx, 370, 310, 330, 74, 37); ctx.fill();
  ctx.fillStyle = C.white; ctx.font = XB(28); ctx.textAlign = 'center'; ctx.fillText(o.button || 'ADD TO CART', 535, 348);
  ctx.textAlign = 'left'; ctx.fillStyle = C.text; ctx.font = B(28); ctx.fillText('About this product', 40, 480);
  ctx.fillStyle = '#C9C1B2'; [520, 556, 592].forEach((yy, i) => { rrect(ctx, 40, yy, [640, 600, 480][i], 18, 9); ctx.fill(); });
  const fixed = !!o.fixed;
  ctx.fillStyle = fixed ? '#E2F8EE' : '#EFE8DB'; rrect(ctx, 40, 650, 660, 70, 18); ctx.fill();
  ctx.fillStyle = fixed ? '#0E7A4C' : C.mute; ctx.font = SB(26);
  ctx.fillText(fixed ? (o.fixedLine || 'Free delivery over ₹999 · arrives in 3 days') : (o.line || 'Shipping: calculated at checkout'), 66, 686);
  ctx.fillStyle = '#C9C1B2'; rrect(ctx, 40, 750, 420, 18, 9); ctx.fill();
  ctx.restore();
  return (px, py) => [x + px * k, y + py * k];
}
function pin(ctx, x, y, a, good, label) {
  if (a <= 0) return;
  ctx.save(); ctx.translate(x, y); const sc = eBack(clamp(a)); ctx.scale(sc, sc);
  ctx.fillStyle = 'rgba(0,0,0,0.35)'; ctx.beginPath(); ctx.arc(3, 5, 29, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = good ? C.green : C.red; ctx.beginPath(); ctx.arc(0, 0, 29, 0, Math.PI * 2); ctx.fill();
  ctx.strokeStyle = C.white; ctx.lineWidth = 5; ctx.stroke();
  ctx.fillStyle = C.white; ctx.font = XB(34); ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  if (good) { ctx.lineWidth = 7; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.beginPath(); ctx.moveTo(-12, 1); ctx.lineTo(-3, 10); ctx.lineTo(13, -9); ctx.stroke(); }
  else ctx.fillText('!', 0, 2);
  if (label) {
    ctx.font = XB(24); const lw = ctx.measureText(label).width + 28;
    const lx = x + 40 + lw > 1050 ? -40 - lw : 40; // flip left when it would leave the frame
    ctx.fillStyle = good ? C.green : C.red; rrect(ctx, lx, -22, lw, 44, 22); ctx.fill();
    ctx.fillStyle = C.white; ctx.textAlign = 'left'; ctx.fillText(label, lx + 14, 1);
  }
  ctx.restore();
}

// ---------- worlds (see themes.js) ----------
reg('permanent-marker/files/permanent-marker-latin-400-normal.woff', 'Marker');
reg('press-start-2p/files/press-start-2p-latin-400-normal.woff', 'Pixel');
reg('bebas-neue/files/bebas-neue-latin-400-normal.woff', 'Bebas');
reg('playfair-display/files/playfair-display-latin-900-normal.woff', 'Playfair');
const MK = (s) => `400 ${s}px Marker, ${FB}`;
const PX = (s) => `400 ${s}px Pixel, ${FB}`;
const BB = (s) => `400 ${s}px Bebas, ${FB}`;
const PF = (s) => `900 ${s}px Playfair, ${FB}`;
const THEMES = require('./themes');
THEMES.setBebas(BB);
const BASE = { ...C, fg: '#FFFFFF', fgMute: C.mute, accent: C.yellow, accentInk: C.text, capBg: 'rgba(8,10,14,0.72)', capFg: '#FFFFFF', capHot: C.yellow, capStroke: '#000000', capBorder: null };
Object.assign(C, BASE);
let WORLD = THEMES.WORLDS.stage;
function useWorld(name) {
  WORLD = THEMES.WORLDS[name] || THEMES.WORLDS.stage;
  for (const k of Object.keys(C)) delete C[k];
  Object.assign(C, BASE, WORLD.pal);
  return WORLD;
}

// ---------- frame furniture ----------
function defaultBackground(ctx, t) {
  const g = ctx.createLinearGradient(0, 0, 0, H);
  g.addColorStop(0, C.ink); g.addColorStop(0.6, C.ink2); g.addColorStop(1, '#0B0D12');
  ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
  const sp = ctx.createRadialGradient(W / 2, 780, 40, W / 2, 780, 760);
  sp.addColorStop(0, rgba('#FFD23F', 0.10)); sp.addColorStop(1, rgba('#FFD23F', 0));
  ctx.fillStyle = sp; ctx.fillRect(0, 0, W, H);
  ctx.save(); ctx.strokeStyle = rgba('#8FA0C0', 0.08); ctx.lineWidth = 2;
  const hz = 1180, vx = W / 2;
  for (let i = -12; i <= 12; i++) { ctx.beginPath(); ctx.moveTo(vx + i * 26, hz); ctx.lineTo(vx + i * 260, H); ctx.stroke(); }
  const off = (t * 0.35) % 1;
  for (let j = 0; j < 9; j++) { const p = (j + off) / 9, yy = hz + Math.pow(p, 2.2) * (H - hz); ctx.beginPath(); ctx.moveTo(0, yy); ctx.lineTo(W, yy); ctx.stroke(); }
  ctx.restore();
  ctx.fillStyle = rgba('#FFFFFF', 0.06);
  for (let i = 0; i < 26; i++) {
    const sx = (i * 397 + t * (8 + (i % 5) * 4)) % W, sy = (i * 691 + t * 12) % 1100 + 80;
    ctx.beginPath(); ctx.arc(sx, sy, 2 + (i % 3), 0, Math.PI * 2); ctx.fill();
  }
}
function background(ctx, t) { WORLD.bg(ctx, t, { defaultBackground }); }

// title card in the world's style; (0,0) is the card centre
const CARDS = {
  sticker(ctx, str) {
    const size = textFit(ctx, str, AR, 74, 860), tw = ctx.measureText(str).width, pw = tw + 70, ph = size + 62;
    ctx.fillStyle = 'rgba(0,0,0,0.45)'; rrect(ctx, -pw / 2 + 8, -ph / 2 + 12, pw, ph, 16); ctx.fill();
    ctx.fillStyle = C.paper; rrect(ctx, -pw / 2, -ph / 2, pw, ph, 16); ctx.fill();
    ctx.fillStyle = rgba('#FFD23F', 0.85); ctx.save(); ctx.rotate(0.05); ctx.fillRect(-60, -ph / 2 - 16, 120, 30); ctx.restore();
    ctx.fillStyle = C.text; ctx.fillText(str, 0, 4);
  },
  plaque(ctx, str) {
    const size = textFit(ctx, str, PF, 70, 820), tw = ctx.measureText(str).width, pw = tw + 110, ph = size + 70;
    ctx.fillStyle = 'rgba(0,0,0,0.5)'; rrect(ctx, -pw / 2 + 6, -ph / 2 + 12, pw, ph, 10); ctx.fill();
    const g = ctx.createLinearGradient(0, -ph / 2, 0, ph / 2); g.addColorStop(0, '#F3D27E'); g.addColorStop(0.5, '#D9A93F'); g.addColorStop(1, '#A87A22');
    ctx.fillStyle = g; rrect(ctx, -pw / 2, -ph / 2, pw, ph, 10); ctx.fill();
    ctx.strokeStyle = 'rgba(60,35,10,0.6)'; ctx.lineWidth = 3; rrect(ctx, -pw / 2 + 12, -ph / 2 + 12, pw - 24, ph - 24, 6); ctx.stroke();
    ctx.fillStyle = '#7A5418'; for (const [sx, sy] of [[-1, -1], [1, -1], [-1, 1], [1, 1]]) { ctx.beginPath(); ctx.arc(sx * (pw / 2 - 26), sy * (ph / 2 - 24), 6, 0, 7); ctx.fill(); }
    ctx.fillStyle = '#3B2208'; ctx.fillText(str, 0, 6);
  },
  tag(ctx, str) {
    const size = textFit(ctx, str, MK, 70, 780), tw = ctx.measureText(str).width, pw = tw + 120, ph = size + 60;
    ctx.save(); ctx.rotate(0.02);
    ctx.fillStyle = 'rgba(0,0,0,0.35)'; ctx.beginPath(); ctx.moveTo(-pw / 2 + 58, -ph / 2 + 10); ctx.lineTo(pw / 2 + 8, -ph / 2 + 10); ctx.lineTo(pw / 2 + 8, ph / 2 + 10); ctx.lineTo(-pw / 2 + 58, ph / 2 + 10); ctx.lineTo(-pw / 2 + 8, 10); ctx.closePath(); ctx.fill();
    ctx.fillStyle = '#DDBA86'; ctx.beginPath(); ctx.moveTo(-pw / 2 + 50, -ph / 2); ctx.lineTo(pw / 2, -ph / 2); ctx.lineTo(pw / 2, ph / 2); ctx.lineTo(-pw / 2 + 50, ph / 2); ctx.lineTo(-pw / 2, 0); ctx.closePath(); ctx.fill();
    ctx.fillStyle = '#5B2A86'; ctx.beginPath(); ctx.arc(-pw / 2 + 40, 0, 10, 0, 7); ctx.fill();
    ctx.strokeStyle = '#F7E7C9'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(-pw / 2 + 40, 0); ctx.quadraticCurveTo(-pw / 2 - 40, -60, -pw / 2 - 90, -30); ctx.stroke();
    ctx.fillStyle = '#3A1B0E'; ctx.fillText(str, 22, 6); ctx.restore();
  },
  sticky(ctx, str) {
    const size = textFit(ctx, str, MK, 70, 800), tw = ctx.measureText(str).width, pw = tw + 90, ph = size + 80;
    ctx.save(); ctx.rotate(-0.03); ctx.shadowColor = 'rgba(60,40,20,0.35)'; ctx.shadowBlur = 20; ctx.shadowOffsetY = 10;
    ctx.fillStyle = '#FFE36E'; ctx.fillRect(-pw / 2, -ph / 2, pw, ph); ctx.restore();
    ctx.save(); ctx.rotate(-0.03); ctx.save(); ctx.rotate(-0.06); ctx.fillStyle = 'rgba(255,255,255,0.55)'; ctx.fillRect(-80, -ph / 2 - 18, 160, 36); ctx.restore();
    ctx.fillStyle = '#2B2118'; ctx.fillText(str, 0, 8); ctx.restore();
  },
  pixel(ctx, str) {
    const size = textFit(ctx, str, PX, 44, 820), tw = ctx.measureText(str).width, pw = tw + 70, ph = size + 60, s = 8;
    ctx.fillStyle = '#12002B'; ctx.fillRect(-pw / 2, -ph / 2, pw, ph);
    ctx.fillStyle = '#FF3D9A'; ctx.fillRect(-pw / 2 - s, -ph / 2 + s, s, ph - 2 * s); ctx.fillRect(pw / 2, -ph / 2 + s, s, ph - 2 * s); ctx.fillRect(-pw / 2 + s, -ph / 2 - s, pw - 2 * s, s); ctx.fillRect(-pw / 2 + s, ph / 2, pw - 2 * s, s);
    ctx.fillStyle = '#FF3D9A'; ctx.fillText(str, 4, 8); ctx.fillStyle = '#00F0FF'; ctx.fillText(str, 0, 4);
  },
  tv(ctx, str) {
    const size = textFit(ctx, str, BB, 92, 740), tw = ctx.measureText(str).width, pw = tw + 80, ph = size + 26;
    const left = -(pw + 150) / 2;
    ctx.fillStyle = '#D62839'; ctx.fillRect(left, -ph / 2, 150, ph);
    ctx.fillStyle = '#FFFFFF'; ctx.font = BB(52); ctx.fillText('LIVE', left + 75, 4);
    ctx.fillStyle = 'rgba(255,255,255,0.95)'; ctx.fillRect(left + 150, -ph / 2, pw, ph);
    ctx.fillStyle = '#FFD23F'; ctx.fillRect(left + 150, ph / 2 - 8, pw, 8);
    ctx.fillStyle = '#061A40'; ctx.font = BB(size); ctx.fillText(str, left + 150 + pw / 2, 6);
  },
  hand(ctx, str) {
    const size = textFit(ctx, str, MK, 78, 840), tw = ctx.measureText(str).width;
    ctx.save(); ctx.rotate(-0.03); ctx.fillStyle = 'rgba(255,226,60,0.75)'; ctx.fillRect(-tw / 2 - 30, -size * 0.1, tw + 60, size * 0.62);
    ctx.fillStyle = '#1E2A5A'; ctx.fillText(str, 0, 0); ctx.restore();
  },
  neon(ctx, str) {
    const size = textFit(ctx, str, BB, 104, 800), tw = ctx.measureText(str).width, pw = tw + 90, ph = size + 40;
    ctx.save(); ctx.shadowColor = '#7DF9FF'; ctx.shadowBlur = 30; ctx.strokeStyle = '#7DF9FF'; ctx.lineWidth = 5; rrect(ctx, -pw / 2, -ph / 2, pw, ph, ph / 2); ctx.stroke();
    ctx.fillStyle = '#E8FEFF'; ctx.fillText(str, 0, 6); ctx.shadowBlur = 50; ctx.fillText(str, 0, 6); ctx.restore();
  },
  marquee(ctx, str, t) {
    const size = textFit(ctx, str, AR, 66, 780), tw = ctx.measureText(str).width, pw = tw + 110, ph = size + 90;
    ctx.fillStyle = 'rgba(0,0,0,0.5)'; rrect(ctx, -pw / 2 + 8, -ph / 2 + 12, pw, ph, 26); ctx.fill();
    const g = ctx.createLinearGradient(0, -ph / 2, 0, ph / 2); g.addColorStop(0, '#FFE27A'); g.addColorStop(1, '#E3A520'); ctx.fillStyle = g; rrect(ctx, -pw / 2, -ph / 2, pw, ph, 26); ctx.fill();
    ctx.fillStyle = '#5A1020'; rrect(ctx, -pw / 2 + 22, -ph / 2 + 22, pw - 44, ph - 44, 14); ctx.fill();
    const per = 2 * (pw + ph), n = Math.floor(per / 34);
    for (let i = 0; i < n; i++) { const d = (i / n) * per; let x, y;
      if (d < pw) { x = -pw / 2 + d; y = -ph / 2 + 11; } else if (d < pw + ph) { x = pw / 2 - 11; y = -ph / 2 + (d - pw); } else if (d < 2 * pw + ph) { x = pw / 2 - (d - pw - ph); y = ph / 2 - 11; } else { x = -pw / 2 + 11; y = ph / 2 - (d - 2 * pw - ph); }
      ctx.fillStyle = (i + Math.floor((t || 0) * 6)) % 2 ? '#FFF6C8' : '#B07A10'; ctx.beginPath(); ctx.arc(x, y, 6, 0, 7); ctx.fill(); }
    ctx.fillStyle = '#FFE27A'; ctx.font = AR(size); ctx.fillText(str, 0, 6);
  },
};
function titleCard(ctx, t, a, str) {
  const p = spring(prog(t, a, a + 0.45));
  ctx.save(); ctx.translate(W / 2, 330); ctx.rotate(WORLD.card === 'sticker' ? -0.025 : 0);
  ctx.scale(lerp(0.6, 1, p), lerp(0.6, 1, p)); ctx.globalAlpha = clamp(p * 2);
  ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  (CARDS[WORLD.card] || CARDS.sticker)(ctx, str, t);
  ctx.restore();
}

// captions in the world's style
function caption(ctx, t, a, str, hot) {
  const p = eOut(prog(t, a, a + 0.18));
  const style = WORLD.caption;
  ctx.save(); ctx.font = XB(46); ctx.globalAlpha = p; ctx.textBaseline = 'middle';
  const lines = wrap(ctx, str, style === 'bar' ? 860 : 700), lh = 58, bh = lines.length * lh + 36;
  const cx = style === 'bar' ? 540 : 470, top = 1330 - bh / 2 + (1 - p) * 20;
  const drawWords = (l, yy, col, hotCol) => { let x0 = cx - ctx.measureText(l).width / 2; ctx.textAlign = 'left';
    for (const wd of l.split(' ')) { ctx.fillStyle = hot.test(wd) ? hotCol : col; ctx.fillText(wd, x0, yy); x0 += ctx.measureText(wd + ' ').width; } };
  if (style === 'bar') {
    ctx.fillStyle = C.capBg; ctx.fillRect(0, top, W, bh); ctx.fillStyle = C.accent; ctx.fillRect(0, top, 14, bh);
    lines.forEach((l, i) => drawWords(l, top + 18 + lh / 2 + i * lh, C.capFg, C.capHot));
  } else if (style === 'tiles') {
    const gap = 14;
    lines.forEach((l, i) => {
      const ws = l.split(' '), widths = ws.map((wd) => ctx.measureText(wd).width), total = widths.reduce((s, v) => s + v + 20, 0) + gap * (ws.length - 1);
      const yy = top + 18 + lh / 2 + i * (lh + 14); let x0 = cx - total / 2;
      ws.forEach((wd, k) => { const w = widths[k] + 20, isHot = hot.test(wd);
        ctx.fillStyle = 'rgba(0,0,0,0.35)'; rrect(ctx, x0 + 4, yy - 32 + 6, w, 64, 12); ctx.fill();
        ctx.fillStyle = isHot ? C.accent : C.capBg; rrect(ctx, x0, yy - 32, w, 64, 12); ctx.fill();
        ctx.fillStyle = isHot ? C.accentInk : C.capFg; ctx.textAlign = 'left'; ctx.fillText(wd, x0 + 10, yy + 2); x0 += w + gap; });
    });
  } else if (style === 'outline') {
    ctx.font = XB(54); const ls = wrap(ctx, str, 760);
    ls.forEach((l, i) => { const yy = top + 24 + i * 68; ctx.lineJoin = 'round'; ctx.strokeStyle = C.capStroke; ctx.lineWidth = 14; ctx.textAlign = 'center'; ctx.strokeText(l, cx, yy); drawWords(l, yy, C.capFg, C.capHot); });
  } else {
    const bw = Math.max(...lines.map((l) => ctx.measureText(l).width)) + 56;
    ctx.fillStyle = C.capBg; rrect(ctx, cx - bw / 2, top, bw, bh, 26); ctx.fill();
    if (C.capBorder) { ctx.strokeStyle = C.capBorder; ctx.lineWidth = 4; rrect(ctx, cx - bw / 2, top, bw, bh, 26); ctx.stroke(); }
    lines.forEach((l, i) => drawWords(l, top + 18 + lh / 2 + i * lh, C.capFg, C.capHot));
  }
  ctx.restore();
}

// ---------- character styles (box is the original, drawn in character()) ----------
function face(ctx, fx, fy, s, ch, o, col = '#1A1C22') {
  const mood = o.mood || 'neutral', blink = o.blink ? 0.12 : 1;
  ctx.fillStyle = col;
  if (ch.prop === 'shades') { ctx.fillStyle = '#0B0C0F'; rrect(ctx, fx - 44 * s, fy - 16 * s, 40 * s, 26 * s, 8 * s); ctx.fill(); rrect(ctx, fx + 4 * s, fy - 16 * s, 40 * s, 26 * s, 8 * s); ctx.fill(); ctx.fillRect(fx - 6 * s, fy - 10 * s, 12 * s, 5 * s); }
  else { const eh = 24 * s * blink; rrect(ctx, fx - 28 * s, fy - eh / 2, 15 * s, eh, 6 * s); ctx.fill(); rrect(ctx, fx + 13 * s, fy - eh / 2, 15 * s, eh, 6 * s); ctx.fill(); }
  ctx.strokeStyle = col; ctx.lineWidth = 5 * s; ctx.lineCap = 'round';
  if (mood === 'frown' || mood === 'angry') { ctx.beginPath(); ctx.moveTo(fx - 32 * s, fy - 24 * s); ctx.lineTo(fx - 12 * s, fy - 18 * s); ctx.stroke(); ctx.beginPath(); ctx.moveTo(fx + 32 * s, fy - 24 * s); ctx.lineTo(fx + 12 * s, fy - 18 * s); ctx.stroke(); }
  ctx.beginPath(); const my = fy + 32 * s;
  if (mood === 'happy') ctx.arc(fx, my - 10 * s, 13 * s, 0.15 * Math.PI, 0.85 * Math.PI);
  else if (mood === 'frown' || mood === 'angry') ctx.arc(fx, my + 10 * s, 12 * s, 1.18 * Math.PI, 1.82 * Math.PI);
  else { ctx.moveTo(fx - 9 * s, my); ctx.lineTo(fx + 9 * s, my); }
  ctx.stroke();
}
const CHARS = {
  blob(ctx, x, y, s, ch, o) {
    const sq = o.squash || 0, w = 128 * s * (1 + sq * 0.14), h = 150 * s * (1 - sq * 0.14);
    ctx.save(); if (o.alpha !== undefined) ctx.globalAlpha *= o.alpha;
    ctx.fillStyle = 'rgba(0,0,0,0.3)'; ctx.beginPath(); ctx.ellipse(x, y + 2 * s, w * 0.55, 13 * s, 0, 0, 7); ctx.fill();
    ctx.fillStyle = dark(ch.col, 0.4); ctx.beginPath(); ctx.ellipse(x - 26 * s, y - 8 * s, 18 * s, 12 * s, 0, 0, 7); ctx.ellipse(x + 26 * s, y - 8 * s, 18 * s, 12 * s, 0, 0, 7); ctx.fill();
    const g = ctx.createRadialGradient(x - w * 0.2, y - h * 0.75, 4, x, y - h * 0.5, w * 0.8); g.addColorStop(0, light(ch.col, 0.35)); g.addColorStop(1, dark(ch.col, 0.12));
    ctx.fillStyle = g; ctx.beginPath(); ctx.ellipse(x, y - h * 0.5 - 6 * s, w / 2, h / 2, 0, 0, 7); ctx.fill();
    ctx.fillStyle = rgba('#FFFFFF', 0.35); ctx.beginPath(); ctx.ellipse(x - w * 0.18, y - h * 0.82, w * 0.12, h * 0.07, -0.5, 0, 7); ctx.fill();
    face(ctx, x + (o.look || 0) * 10 * s, y - h * 0.56, s, ch, o);
    prop(ctx, ch.prop, x + w * 0.42, y - h * 0.45, s, o.t || 0); ctx.restore();
  },
  robot(ctx, x, y, s, ch, o) {
    const sq = o.squash || 0, w = 118 * s * (1 + sq * 0.1), h = 132 * s * (1 - sq * 0.1), top = y - h - 18 * s, left = x - w / 2;
    ctx.save(); if (o.alpha !== undefined) ctx.globalAlpha *= o.alpha;
    ctx.fillStyle = 'rgba(0,0,0,0.35)'; ctx.beginPath(); ctx.ellipse(x, y + 2 * s, w * 0.6, 13 * s, 0, 0, 7); ctx.fill();
    ctx.fillStyle = '#3A4152'; rrect(ctx, x - 34 * s, y - 20 * s, 22 * s, 20 * s, 4 * s); ctx.fill(); rrect(ctx, x + 12 * s, y - 20 * s, 22 * s, 20 * s, 4 * s); ctx.fill();
    ctx.strokeStyle = '#8A93A6'; ctx.lineWidth = 5 * s; ctx.beginPath(); ctx.moveTo(x, top); ctx.lineTo(x, top - 26 * s); ctx.stroke();
    ctx.fillStyle = ch.col; ctx.shadowColor = ch.col; ctx.shadowBlur = 16 * s; ctx.beginPath(); ctx.arc(x, top - 30 * s, 9 * s, 0, 7); ctx.fill(); ctx.shadowBlur = 0;
    const g = ctx.createLinearGradient(left, top, left + w, top + h); g.addColorStop(0, '#E4E9F1'); g.addColorStop(1, '#9AA4B5');
    ctx.fillStyle = g; rrect(ctx, left, top, w, h, 18 * s); ctx.fill();
    ctx.fillStyle = ch.col; rrect(ctx, left, top + h - 22 * s, w, 22 * s, 8 * s); ctx.fill();
    ctx.fillStyle = '#141A26'; rrect(ctx, left + 12 * s, top + 16 * s, w - 24 * s, h * 0.5, 12 * s); ctx.fill();
    ctx.save(); ctx.shadowColor = ch.col; ctx.shadowBlur = 12 * s; face(ctx, x + (o.look || 0) * 8 * s, top + 16 * s + h * 0.2, s * 0.8, ch, o, light(ch.col, 0.3)); ctx.restore();
    prop(ctx, ch.prop, left + w + 6 * s, top + h * 0.55, s, o.t || 0); ctx.restore();
  },
  paper(ctx, x, y, s, ch, o) {
    const sq = o.squash || 0, w = 116 * s * (1 + sq * 0.12), h = 140 * s * (1 - sq * 0.12), top = y - h - 12 * s, left = x - w / 2, rot = Math.sin((o.t || 0) * 2 + x) * 0.03;
    ctx.save(); if (o.alpha !== undefined) ctx.globalAlpha *= o.alpha; ctx.translate(x, y); ctx.rotate(rot); ctx.translate(-x, -y);
    ctx.fillStyle = 'rgba(40,30,20,0.25)'; rrect(ctx, left + 8 * s, top + 10 * s, w, h + 12 * s, 22 * s); ctx.fill();
    ctx.fillStyle = '#FFFFFF'; rrect(ctx, left - 8 * s, top - 8 * s, w + 16 * s, h + 26 * s, 26 * s); ctx.fill();
    ctx.fillStyle = ch.col; rrect(ctx, left, top, w, h, 20 * s); ctx.fill();
    ctx.fillStyle = dark(ch.col, 0.25); rrect(ctx, x - 30 * s, y - 2 * s, 22 * s, 12 * s, 4 * s); ctx.fill(); rrect(ctx, x + 8 * s, y - 2 * s, 22 * s, 12 * s, 4 * s); ctx.fill();
    face(ctx, x + (o.look || 0) * 10 * s, top + h * 0.42, s, ch, o);
    prop(ctx, ch.prop, left + w + 4 * s, top + h * 0.55, s, o.t || 0); ctx.restore();
  },
};
const row = (n, y, gap, cx = 540) => Array.from({ length: n }, (_, i) => [cx + (i - (n - 1) / 2) * gap, y]);

// ---------- scene types ----------
// signature: (ctx, lt, dur, p, t, post) ; lt = seconds since this scene began
const SCENES = {
  // product page, optional grey visitors walking out, pins, a complaining character, rewrite + stamp
  page(ctx, lt, dur, p, t, post) {
    const fixedAt = p.fixAt === undefined ? Infinity : p.fixAt;
    const k = eOut(prog(lt, 0, 0.5));
    const pw = p.w || 680, px = p.x === undefined ? (W - pw) / 2 : p.x;
    const map = productPage(ctx, px, lerp(500, 470, k), pw, { ...post.page, fixed: lt > fixedAt + 1.1 || p.fixed });
    if (p.ghosts) for (let i = 0; i < 6; i++) {
      const st = 0.15 + i * 0.38, q = prog(lt, st, st + 1.3); if (q <= 0) continue;
      const dir = i % 2 ? 1 : -1, x = 540 + dir * eOut(q) * 520 + dir * 60, y = 1180 - i * 4;
      ctx.save(); ctx.globalAlpha = (1 - q) * 0.9; ctx.fillStyle = '#5B6475';
      rrect(ctx, x - 34, y - 110 - Math.abs(Math.sin(q * 18)) * 8, 68, 96, 14); ctx.fill(); ctx.restore();
    }
    (p.pins || []).forEach((pn, i) => {
      const [x, y] = map(pn.x, pn.y);
      const good = lt > fixedAt + 0.3 + i * 0.5;
      const a = good ? spring(prog(lt, fixedAt + 0.3 + i * 0.5, fixedAt + 0.75 + i * 0.5)) : prog(lt, pn.at || 0.3 + i * 0.5, (pn.at || 0.3 + i * 0.5) + 0.35);
      pin(ctx, x, y, a, good, good ? 'FIXED' : pn.label);
    });
    if (p.who !== undefined) {
      const q = eOut(prog(lt, (p.whoAt || 0) - 0.4, p.whoAt || 0));
      character(ctx, lerp(-120, 150, q), 1170, 0.9, post.cast[p.who], { mood: 'frown', t });
      if (p.say) bubble(ctx, 250, 960, p.say, spring(prog(lt, p.whoAt || 0, (p.whoAt || 0) + 0.4)));
    }
    if (fixedAt < Infinity && lt > fixedAt) {
      const n = Math.min(p.fixes || 7, Math.floor(prog(lt, fixedAt + 0.2, fixedAt + 2) * (p.fixes || 7)) + 1);
      const q = spring(prog(lt, fixedAt, fixedAt + 0.4));
      ctx.save(); ctx.translate(460, 1000); ctx.rotate(-0.06); ctx.scale(q, q);
      ctx.fillStyle = C.green; rrect(ctx, -170, -46, 340, 92, 46); ctx.fill();
      ctx.fillStyle = C.text; ctx.font = AR(46); ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.fillText(`${n}/${p.fixes || 7} FIXED`, 0, 4); ctx.restore();
    }
  },
  // characters drop in a row, optional big label above
  drop(ctx, lt, dur, p, t, post) {
    const ids = p.ids || post.cast.map((_, i) => i);
    const two = ids.length > 6, per = two ? Math.ceil(ids.length / 2) : ids.length;
    const gap = Math.min(150, 900 / per), s = Math.min(0.86, gap / 150);
    const spots = two ? [...row(per, 880, gap), ...row(ids.length - per, 1120, gap)] : row(ids.length, p.y || 1010, gap);
    spots.forEach(([x, y], i) => {
      const st = 0.05 + i * (p.step || 0.1), q = prog(lt, st, st + 0.5); if (q <= 0) return;
      const yy = lerp(y - 700, y, eOut(Math.min(1, q * 1.6)));
      const land = prog(lt, st + 0.32, st + 0.6);
      character(ctx, x, yy, s, post.cast[ids[i]], { mood: p.mood, squash: land > 0 && land < 1 ? Math.sin(land * Math.PI) * 0.9 : 0, t, blink: Math.floor(t * 10 + i) % 23 === 0 });
    });
    if (p.big) {
      const g = spring(prog(lt, 0.6, 1.1));
      ctx.save(); ctx.globalAlpha = clamp(g); ctx.fillStyle = C.accent; ctx.font = AR(p.bigSize || 150); ctx.textAlign = 'center';
      ctx.translate(540, two ? 610 : 700); ctx.scale(lerp(0.7, 1, g), lerp(0.7, 1, g)); ctx.fillText(p.big, 0, 0); ctx.restore();
    }
  },
  // 10x10 dots: `leave` walk out, the rest turn green
  grid(ctx, lt, dur, p) {
    const cols = 10, sz = 52, gap = 14, gx = 540 - (cols * sz + (cols - 1) * gap) / 2, gy = 470;
    const stayN = 100 - (p.leave || 97); const stay = new Set(Array.from({ length: stayN }, (_, i) => (23 + i * 35) % 100));
    let left = 0;
    for (let i = 0; i < 100; i++) {
      const r = Math.floor(i / cols), c = i % cols, x = gx + c * (sz + gap), y = gy + r * (sz + gap);
      let a = eOut(prog(lt, r * 0.03, r * 0.03 + 0.3)), dx = 0, col = '#8F9AB0';
      if (stay.has(i)) {
        const k = prog(lt, 2.3, 2.6); if (k > 0) { col = C.green; ctx.save(); ctx.fillStyle = rgba(C.green, 0.35 * k); ctx.beginPath(); ctx.arc(x + sz / 2, y + sz / 2, sz * 0.95, 0, Math.PI * 2); ctx.fill(); ctx.restore(); }
      } else {
        const st = 0.7 + ((i * 37) % 97) * 0.016, q = prog(lt, st, st + 0.45);
        if (q > 0) left++; a *= 1 - q; dx = eOut(q) * 90;
      }
      ctx.save(); ctx.globalAlpha = a; ctx.fillStyle = col; rrect(ctx, x + dx, y, sz, sz, 14); ctx.fill();
      ctx.fillStyle = 'rgba(15,18,24,0.75)'; ctx.fillRect(x + dx + 15, y + 18, 6, 11); ctx.fillRect(x + dx + 31, y + 18, 6, 11); ctx.restore();
    }
    ctx.save(); ctx.textAlign = 'center';
    ctx.fillStyle = C.fg; ctx.font = AR(130); ctx.fillText(String(Math.min(p.leave || 97, left)), 400, 1150);
    ctx.fillStyle = C.fgMute; ctx.font = XB(34); ctx.fillText(p.leftLabel || 'LEFT', 400, 1198);
    ctx.fillStyle = C.green; ctx.font = AR(130); ctx.fillText(prog(lt, 2.3, 2.6) > 0 ? String(stayN) : '–', 700, 1150);
    ctx.fillStyle = C.fgMute; ctx.font = XB(34); ctx.fillText(p.stayLabel || 'BOUGHT', 700, 1198);
    ctx.restore();
  },
  // chat box with typed text; characters pop out of it
  chat(ctx, lt, dur, p, t, post) {
    const bx = 110, by = 560, bw = 860, bh = 330, k = eOut(prog(lt, 0, 0.35));
    ctx.save(); ctx.globalAlpha = k; ctx.translate(0, (1 - k) * 40);
    ctx.fillStyle = 'rgba(0,0,0,0.45)'; rrect(ctx, bx + 10, by + 16, bw, bh, 36); ctx.fill();
    ctx.fillStyle = C.ink3; rrect(ctx, bx, by, bw, bh, 36); ctx.fill();
    ctx.strokeStyle = C.line; ctx.lineWidth = 3; rrect(ctx, bx, by, bw, bh, 36); ctx.stroke();
    ctx.fillStyle = C.yellow; ctx.beginPath(); ctx.arc(bx + 56, by + 54, 18, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = C.white; ctx.font = B(30); ctx.textAlign = 'left'; ctx.textBaseline = 'middle'; ctx.fillText('Claude', bx + 88, by + 55);
    const msg = p.text, n = Math.floor(clamp(prog(lt, 0.4, 1.9)) * msg.length);
    ctx.font = SB(36); ctx.fillStyle = '#E8ECF4';
    wrap(ctx, msg.slice(0, n) + (Math.floor(lt * 3) % 2 && n < msg.length ? '|' : ''), bw - 100).forEach((l, i) => ctx.fillText(l, bx + 48, by + 140 + i * 50));
    const sc = 1 + Math.sin(prog(lt, 1.9, 2.2) * Math.PI) * 0.25;
    ctx.save(); ctx.translate(bx + bw - 70, by + bh - 66); ctx.scale(sc, sc);
    ctx.fillStyle = n >= msg.length ? C.yellow : '#3A4152'; ctx.beginPath(); ctx.arc(0, 0, 36, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = C.text; ctx.beginPath(); ctx.moveTo(-10, -14); ctx.lineTo(14, 0); ctx.lineTo(-10, 14); ctx.closePath(); ctx.fill();
    ctx.restore(); ctx.restore();
    const ids = p.ids || post.cast.map((_, i) => i);
    const gap = Math.min(136, 900 / ids.length), s = Math.min(0.86, gap / 150);
    row(ids.length, 1170, gap).forEach(([x, y], i) => {
      const st = 2.2 + i * Math.min(0.16, 1.4 / ids.length), q = prog(lt, st, st + 0.55); if (q <= 0) return;
      const arc = Math.sin(q * Math.PI) * 160;
      character(ctx, lerp(bx + bw - 70, x, eOut(q)), lerp(by + bh - 60, y, eOut(q)) - arc * (1 - q), lerp(0.3, s, eBack(q)), post.cast[ids[i]], { t });
    });
  },
  // characters in booths with name chips; `shown` are already there, `reveal` pop in across the scene
  lineup(ctx, lt, dur, p, t, post) {
    const rows = p.rows || [[0, 1, 2], [3, 4, 5, 6]], rowY = p.rowY || [720, 1060];
    const reveal = p.reveal || [], shown = p.shown || [];
    rows.forEach((r, ri) => {
      const maxLen = Math.max(...rows.map((x) => x.length));
      const gap = r.length <= 3 ? 300 : r.length === 4 ? 236 : 190, sc = maxLen <= 2 ? 1.05 : maxLen === 3 ? (ri === 0 ? 1.05 : 0.95) : r.length > 4 ? 0.7 : 0.86;
      r.forEach((idx, j) => {
        const x = 540 + (j - (r.length - 1) / 2) * gap, y = rowY[ri];
        const ri2 = reveal.indexOf(idx);
        const st = ri2 >= 0 ? 0.05 + ri2 * Math.min(0.62, (dur - 0.4) / Math.max(1, reveal.length)) : -1;
        const q = shown.includes(idx) ? 1 : ri2 >= 0 ? prog(lt, st, st + 0.4) : 0;
        ctx.save(); ctx.globalAlpha = 0.6 * clamp(q * 2 + 0.3);
        ctx.fillStyle = rgba('#8FA0C0', 0.1); rrect(ctx, x - gap / 2 + 12, y - 260 * sc, gap - 24, 290 * sc, 26); ctx.fill(); ctx.restore();
        if (q <= 0) { character(ctx, x, y, sc, post.cast[idx], { alpha: 0.18, t }); return; }
        const bounce = shown.includes(idx) ? 1 : 1 + Math.sin(clamp(q) * Math.PI) * 0.1;
        ctx.save(); ctx.translate(x, y); ctx.scale(bounce, bounce); ctx.translate(-x, -y);
        character(ctx, x, y, sc, post.cast[idx], { t, mood: p.mood, look: Math.sin(t * 1.3 + idx) * 0.6, blink: Math.floor(t * 9 + idx * 3) % 29 === 0 });
        ctx.restore();
        chip(ctx, x, y + 18, post.cast[idx].name, { alpha: eOut(q), size: r.length > 4 ? 20 : maxLen <= 3 ? 28 : 23, bg: post.cast[idx].prop === 'shades' ? '#C9CFDB' : C.paper });
      });
    });
  },
  // two characters argue: left vs right, each with a bubble and a verdict chip
  versus(ctx, lt, dur, p, t, post) {
    const sides = [[300, p.left], [780, p.right]];
    sides.forEach(([x, s], i) => {
      const st = i * (p.gap || 1.2), q = prog(lt, st, st + 0.45);
      const hop = Math.max(0, Math.sin((lt - st) * 9)) * 14 * (lt > st && lt < st + 1 ? 1 : 0);
      character(ctx, x, 1100 - hop, 1.3, post.cast[s.who], { mood: s.mood, t, alpha: clamp(q * 2), squash: q > 0 && q < 1 ? Math.sin(q * Math.PI) * 0.4 : 0 });
      chip(ctx, x, 1130, s.tag, { alpha: eOut(q), size: 34, font: XB, bg: s.col || (i ? C.green : C.red), fg: C.white });
      bubble(ctx, i ? 560 : 90, 820, s.say, spring(prog(lt, st + 0.25, st + 0.65)), { size: 34, tail: i ? 'right' : 'left' });
    });
    ctx.save(); ctx.globalAlpha = spring(prog(lt, 0.4, 0.8)); ctx.fillStyle = C.accent; ctx.font = AR(90); ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillText('VS', 540, 980); ctx.restore();
  },
  // a jury: grid of characters, each gets a hidden vote that flips to BUY/SKIP
  jury(ctx, lt, dur, p, t, post) {
    const ids = p.ids, cols = p.cols || 4, rws = Math.ceil(ids.length / cols);
    const gx = 230, gy = 200;
    ids.forEach((idx, i) => {
      const r = Math.floor(i / cols), c = i % cols;
      const x = 540 + (c - (cols - 1) / 2) * gx, y = 660 + r * 225;
      const q = prog(lt, (p.inAt || 0) + i * 0.06, (p.inAt || 0) + i * 0.06 + 0.4);
      if (p.walls) { ctx.save(); ctx.globalAlpha = 0.5 * q; ctx.fillStyle = rgba('#8FA0C0', 0.12); rrect(ctx, x - gx / 2 + 10, y - 200, gx - 20, 225, 20); ctx.fill(); ctx.restore(); }
      const vote = (p.votes || [])[i];
      const vAt = p.voteAt === undefined ? Infinity : p.voteAt + i * (p.voteStep || 0.12);
      const shown = lt > vAt;
      character(ctx, x, y, 0.72, post.cast[idx], { t, alpha: q, mood: shown ? (vote === 'BUY' ? 'happy' : 'frown') : 'neutral', blink: Math.floor(t * 9 + i * 3) % 29 === 0 });
      if (p.voteAt !== undefined) {
        const vq = spring(prog(lt, vAt - 0.25, vAt + 0.15));
        chip(ctx, x - 8, y - 196, shown ? vote : '?', { size: 28, font: XB, scale: vq, bg: shown ? (vote === 'BUY' ? C.green : C.red) : C.paper, fg: shown ? C.white : C.text });
      }
    });
    if (p.tally && lt > p.tally) {
      const buy = (p.votes || []).filter((v) => v === 'BUY').length, skip = ids.length - buy;
      chip(ctx, 340, 1135, `${buy} BUY`, { size: 44, font: AR, bg: C.green, fg: C.text, scale: spring(prog(lt, p.tally, p.tally + 0.4)) });
      chip(ctx, 640, 1135, `${skip} ${p.noLabel || 'SKIP'}`, { size: 44, font: AR, bg: C.red, fg: C.white, scale: spring(prog(lt, p.tally + 0.2, p.tally + 0.6)) });
    }
  },
  // checklist card: items tick in across the scene; optional character beside it
  list(ctx, lt, dur, p, t, post) {
    const x = 120, y = 470, w = 840, ih = 96, h = 110 + p.items.length * ih;
    const k = eOut(prog(lt, 0, 0.35));
    ctx.save(); ctx.globalAlpha = k; ctx.translate(0, (1 - k) * 40);
    ctx.fillStyle = 'rgba(0,0,0,0.45)'; rrect(ctx, x + 10, y + 16, w, h, 36); ctx.fill();
    ctx.fillStyle = C.paper; rrect(ctx, x, y, w, h, 36); ctx.fill();
    ctx.fillStyle = C.text; ctx.font = AR(44); ctx.textAlign = 'left'; ctx.textBaseline = 'middle'; ctx.fillText(p.title, x + 44, y + 62);
    const step = Math.min(0.55, (dur - 0.5) / p.items.length);
    p.items.forEach((it, i) => {
      const yy = y + 130 + i * ih, q = prog(lt, 0.35 + i * step, 0.35 + i * step + 0.3);
      ctx.fillStyle = q > 0 ? C.green : '#D8D0C0'; ctx.beginPath(); ctx.arc(x + 70, yy + 16, 26, 0, 7); ctx.fill();
      if (q > 0) { ctx.strokeStyle = C.white; ctx.lineWidth = 6; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x + 58, yy + 16); ctx.lineTo(x + 67, yy + 26); ctx.lineTo(x + 83, yy + 7); ctx.stroke(); }
      ctx.globalAlpha = k * lerp(0.35, 1, eOut(q)); ctx.fillStyle = C.text; ctx.font = B(36);
      ctx.fillText(it, x + 116 + (1 - eOut(q)) * 20, yy + 17); ctx.globalAlpha = k;
    });
    ctx.restore();
    if (p.who !== undefined) character(ctx, 900, 1210, 0.8, post.cast[p.who], { t, mood: p.mood || 'happy' });
  },
  // a judge character with a gavel and a verdict stamp
  verdict(ctx, lt, dur, p, t, post) {
    const bang = prog(lt, 0.5, 0.65), up = Math.sin(clamp(prog(lt, 0.2, 0.5)) * Math.PI);
    ctx.save(); ctx.fillStyle = '#5B3A26'; rrect(ctx, 190, 930, 700, 140, 24); ctx.fill(); ctx.fillStyle = '#7A4E33'; rrect(ctx, 190, 930, 700, 34, 16); ctx.fill(); ctx.restore();
    character(ctx, 540, 940 - up * 10, 1.35, post.cast[p.who], { t, mood: 'neutral', squash: bang > 0 && bang < 1 ? 0.3 : 0 });
    const q = spring(prog(lt, 0.6, 1.0));
    ctx.save(); ctx.translate(540, 510); ctx.rotate(-0.08); ctx.scale(lerp(1.6, 1, clamp(q)), lerp(1.6, 1, clamp(q))); ctx.globalAlpha = clamp(q * 3);
    ctx.strokeStyle = p.col || C.accent; ctx.lineWidth = 12; ctx.font = AR(p.size || 84); const w = ctx.measureText(p.stamp).width + 80;
    rrect(ctx, -w / 2, -70, w, 140, 24); ctx.stroke(); ctx.fillStyle = p.col || C.accent; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(p.stamp, 0, 6);
    ctx.restore();
    if (p.sub) chip(ctx, 540, 610, p.sub, { size: 34, font: XB, alpha: prog(lt, 0.9, 1.2) });
  },
  // giant number with a label
  stat(ctx, lt, dur, p) {
    const q = spring(prog(lt, 0.05, 0.5));
    ctx.save(); ctx.translate(540, 820); ctx.scale(q, q); ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillStyle = p.col || C.accent; ctx.font = AR(p.size || 260); ctx.fillText(p.big, 0, 0);
    ctx.restore();
    if (p.label) chip(ctx, 540, 990, p.label, { size: 38, font: XB, alpha: prog(lt, 0.3, 0.6) });
  },
  // call to action with keyword
  cta(ctx, lt, dur, p, t, post) {
    const q = spring(prog(lt, 0, 0.5));
    ctx.save(); ctx.translate(540, 700); ctx.scale(q, q);
    ctx.fillStyle = C.fg; ctx.font = XB(56); ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('Comment', 0, -150);
    ctx.rotate(Math.sin(lt * 6) * 0.03);
    const kw = post.keyword; const fsz = textFit(ctx, kw, AR, 128, 520); const kwW = Math.max(600, ctx.measureText(kw).width + 100);
    ctx.fillStyle = 'rgba(0,0,0,0.45)'; rrect(ctx, -kwW / 2 + 10, -76, kwW, 180, 34); ctx.fill();
    ctx.fillStyle = C.accent; rrect(ctx, -kwW / 2, -90, kwW, 180, 34); ctx.fill();
    ctx.fillStyle = C.accentInk; ctx.font = AR(fsz); ctx.fillText(kw, 0, 6);
    ctx.restore();
    ctx.save(); ctx.globalAlpha = clamp(prog(lt, 0.4, 0.8)); ctx.fillStyle = C.fgMute; ctx.font = B(36); ctx.textAlign = 'center';
    ctx.fillText(p.sub || 'Free in your DMs', 540, 880); ctx.restore();
    const ids = (p.ids || post.cast.map((_, i) => i)).slice(0, 7);
    row(ids.length, 1180, 128).forEach(([x, y], i) => {
      const hop = Math.max(0, Math.sin(lt * 7 - i * 0.7)) * 34;
      character(ctx, x, y - hop, 0.8, post.cast[ids[i]], { mood: 'happy', t, alpha: prog(lt, 0.1 + i * 0.06, 0.4 + i * 0.06) });
    });
    const ap = prog(lt, 0.9, 1.3);
    if (ap > 0) {
      const n = Math.sin(lt * 8) * 8; ctx.save(); ctx.globalAlpha = ap; ctx.strokeStyle = C.accent; ctx.lineWidth = 10; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
      ctx.beginPath(); ctx.moveTo(800, 900); ctx.quadraticCurveTo(930 + n, 960, 960 + n, 1120 + n); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(925 + n, 1095 + n); ctx.lineTo(962 + n, 1128 + n); ctx.lineTo(990 + n, 1088 + n); ctx.stroke(); ctx.restore();
    }
  },
};

// sound cues each scene type asks for (seconds relative to scene start)
function cues(type, p, dur, post) {
  const ev = [];
  const n = (p.ids || post.cast).length;
  if (type === 'drop') for (let i = 0; i < n; i++) ev.push(['pop', 0.35 + i * (p.step || 0.1), 1 + i * 0.1], ['thud', 0.4 + i * (p.step || 0.1)]);
  if (type === 'grid') { for (let i = 0; i < 40; i++) ev.push(['click', 0.7 + i * 0.04]); [0, 0.08, 0.16].forEach((d, i) => ev.push(['ding', 2.3 + d, 88 + i * 3])); }
  if (type === 'chat') { for (let i = 0; i < 26; i++) ev.push(['click', 0.4 + i * 0.058]); ev.push(['bloop', 1.95]); for (let i = 0; i < n; i++) ev.push(['pop', 2.2 + i * Math.min(0.16, 1.4 / n), 1.1 + i * 0.08]); }
  if (type === 'lineup') (p.reveal || []).forEach((_, i) => ev.push(['pop', 0.05 + i * Math.min(0.62, (dur - 0.4) / Math.max(1, p.reveal.length)), 0.9 + i * 0.12]));
  if (type === 'page') {
    (p.pins || []).forEach((pn, i) => ev.push(['buzz', pn.at || 0.3 + i * 0.5]));
    if (p.who !== undefined) ev.push(['pop', p.whoAt || 0, 1.6]);
    if (p.fixAt !== undefined) (p.pins || []).forEach((_, i) => ev.push(['ding', p.fixAt + 0.3 + i * 0.5, 84 + i * 4]));
  }
  if (type === 'versus') ev.push(['pop', 0.1, 0.8], ['pop', (p.gap || 1.2) + 0.1, 1.2], ['thud', 0.45]);
  if (type === 'jury') { p.ids.forEach((_, i) => ev.push(['pop', (p.inAt || 0) + i * 0.06, 1 + (i % 6) * 0.1])); if (p.voteAt !== undefined) p.ids.forEach((_, i) => ev.push(['click', p.voteAt + i * (p.voteStep || 0.12)])); if (p.tally) ev.push(['ding', p.tally, 84], ['ding', p.tally + 0.2, 88]); }
  if (type === 'list') p.items.forEach((_, i) => ev.push(['ding', 0.35 + i * Math.min(0.55, (dur - 0.5) / p.items.length), 82 + i * 2]));
  if (type === 'verdict') ev.push(['thud', 0.5], ['thud', 0.52], ['pop', 0.6, 0.5]);
  if (type === 'stat') ev.push(['thud', 0.1], ['ding', 0.15, 86]);
  if (type === 'cta') [0, 0.12, 0.24].forEach((d, i) => ev.push(['ding', d, 79 + [0, 4, 7][i]]));
  return ev;
}

module.exports = { useWorld, WORLDS: THEMES.WORLDS, WORLD_NOTES: THEMES.WORLD_NOTES, W, H, C, AR, XB, B, SB, clamp, lerp, prog, eOut, spring, rrect, textFit, character, chip, bubble, productPage, pin, background, titleCard, caption, row, SCENES, cues };
