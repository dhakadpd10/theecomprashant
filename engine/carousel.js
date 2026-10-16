// Carousel renderer: node carousel.js ../posts/<id>   (reads carousel.json, writes slide-01.png ... + sheet.png)
// 1080x1350 slides in the reel look: ink stage, paper + yellow sticker titles, clay characters, slide count, handle.
const fs = require('fs');
const path = require('path');
const { createCanvas } = require('@napi-rs/canvas');
const L = require('./lib');

const dir = path.resolve(process.argv[2]);
const spec = JSON.parse(fs.readFileSync(path.join(dir, 'carousel.json'), 'utf8'));
const cfg = JSON.parse(fs.readFileSync(path.join(__dirname, '../config/agent.json'), 'utf8'));
const W = 1080, H = 1350, M = 120; // keep text inside the 120px safe margin
const { C, AR, XB, B, SB, rrect, textFit, character, chip, productPage, pin } = L;

function wrapLines(ctx, str, maxW) {
  const out = []; let cur = '';
  for (const w of str.split(' ')) { const t = cur ? cur + ' ' + w : w; if (ctx.measureText(t).width > maxW && cur) { out.push(cur); cur = w; } else cur = t; }
  if (cur) out.push(cur); return out;
}
function stage(ctx) {
  const g = ctx.createLinearGradient(0, 0, 0, H); g.addColorStop(0, C.ink); g.addColorStop(1, C.ink2);
  ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
  const sp = ctx.createRadialGradient(W / 2, 560, 40, W / 2, 560, 700);
  sp.addColorStop(0, 'rgba(255,210,63,0.09)'); sp.addColorStop(1, 'rgba(255,210,63,0)'); ctx.fillStyle = sp; ctx.fillRect(0, 0, W, H);
  ctx.save(); ctx.strokeStyle = 'rgba(143,160,192,0.07)'; ctx.lineWidth = 2;
  for (let i = -10; i <= 10; i++) { ctx.beginPath(); ctx.moveTo(W / 2 + i * 26, 1000); ctx.lineTo(W / 2 + i * 220, H); ctx.stroke(); }
  for (let j = 1; j < 7; j++) { const y = 1000 + Math.pow(j / 7, 2) * 350; ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); }
  ctx.restore();
}
function sticker(ctx, str, y, o = {}) {
  ctx.save(); ctx.translate(W / 2, y); ctx.rotate(o.rot || -0.02);
  const size = textFit(ctx, str, AR, o.size || 78, W - 2 * M - 40);
  const tw = ctx.measureText(str).width, pw = tw + 64, ph = size + 46;
  ctx.fillStyle = 'rgba(0,0,0,0.45)'; rrect(ctx, -pw / 2 + 8, -ph / 2 + 11, pw, ph, 14); ctx.fill();
  ctx.fillStyle = o.bg || C.paper; rrect(ctx, -pw / 2, -ph / 2, pw, ph, 14); ctx.fill();
  ctx.fillStyle = C.text; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(str, 0, 4);
  ctx.restore();
  return ph;
}
function body(ctx, str, x, y, maxW, size = 40, col = '#E8ECF4', align = 'left') {
  ctx.save(); ctx.font = SB(size); ctx.fillStyle = col; ctx.textAlign = align; ctx.textBaseline = 'top';
  const lines = wrapLines(ctx, str, maxW); lines.forEach((l, i) => ctx.fillText(l, x, y + i * size * 1.35)); ctx.restore();
  return lines.length * size * 1.35;
}
function frame(ctx, n, total) {
  ctx.save();
  ctx.font = B(28); ctx.fillStyle = 'rgba(232,236,244,0.55)'; ctx.textBaseline = 'middle';
  ctx.textAlign = 'left'; ctx.fillText(cfg.handle, 64, H - 60);
  ctx.textAlign = 'right'; ctx.fillText(`${n}/${total}`, W - 64, 64);
  ctx.restore();
}
function art(ctx, a, t = 2) {
  if (!a) return;
  if (a.page) {
    const pw = a.w || 560, px = a.x === undefined ? (W - pw) / 2 : a.x;
    const map = productPage(ctx, px, a.y || 700, pw, { ...(spec.page || {}), fixed: a.fixed });
    (a.pins || []).forEach((p) => { const [x, y] = map(p.x, p.y); pin(ctx, x, y, 1, !!p.good, p.label); });
  }
  (a.cast || []).forEach((c, i, arr) => {
    const gap = Math.min(150, 760 / arr.length), x = (c.x !== undefined ? c.x : W / 2 + (i - (arr.length - 1) / 2) * gap);
    character(ctx, x, c.y || 1180, c.s || Math.min(0.9, gap / 150), spec.cast[c.who], { mood: c.mood, t: t + i });
  });
  if (a.say) L.bubble(ctx, a.sayX || 150, a.sayY || 1000, a.say, 1, { size: 36 });
}

const SLIDES = {
  cover(ctx, s) {
    sticker(ctx, s.title[0], 300, { size: 92, rot: -0.03 });
    if (s.title[1]) sticker(ctx, s.title[1], 430, { size: 92, rot: 0.02, bg: C.yellow });
    if (s.sub) { ctx.save(); ctx.font = XB(40); ctx.fillStyle = C.white; ctx.textAlign = 'center'; ctx.fillText(s.sub, W / 2, 560); ctx.restore(); }
    art(ctx, s.art);
  },
  stake(ctx, s) {
    ctx.save(); ctx.font = AR(s.size || 72); ctx.fillStyle = C.white; ctx.textAlign = 'left'; ctx.textBaseline = 'top';
    const lines = wrapLines(ctx, s.title, W - 2 * M); lines.forEach((l, i) => {
      let x = M; for (const w of l.split(' ')) { ctx.fillStyle = (s.hot || []).some((h) => w.replace(/[.,]/g, '') === h) ? C.yellow : C.white; ctx.fillText(w, x, 220 + i * (s.size || 72) * 1.15); x += ctx.measureText(w + ' ').width; }
    });
    const hh = lines.length * (s.size || 72) * 1.15;
    if (s.body) body(ctx, s.body, M, 260 + hh, W - 2 * M, 40, '#AEB6C6');
    ctx.restore(); art(ctx, s.art);
  },
  idea(ctx, s) {
    // big number, headline sticker, short body, a small illustration
    ctx.save(); ctx.fillStyle = C.yellow; ctx.font = AR(150); ctx.textBaseline = 'top'; ctx.textAlign = 'left'; ctx.fillText(String(s.num), M - 10, 150); ctx.restore();
    ctx.save(); ctx.font = AR(64); ctx.fillStyle = C.white; ctx.textBaseline = 'top';
    const lines = wrapLines(ctx, s.title, W - 2 * M); lines.forEach((l, i) => ctx.fillText(l, M, 340 + i * 74)); ctx.restore();
    const hh = lines.length * 74;
    body(ctx, s.body, M, 360 + hh + 20, W - 2 * M, 40, '#C9D0DC');
    art(ctx, s.art);
  },
  recap(ctx, s) {
    sticker(ctx, s.title, 210, { size: 64 });
    const x = M - 20, y = 320, w = W - 2 * M + 40, ih = Math.min(118, 760 / s.items.length), h = 50 + s.items.length * ih;
    ctx.fillStyle = 'rgba(0,0,0,0.45)'; rrect(ctx, x + 10, y + 14, w, h, 30); ctx.fill();
    ctx.fillStyle = C.paper; rrect(ctx, x, y, w, h, 30); ctx.fill();
    s.items.forEach((it, i) => {
      const yy = y + 30 + i * ih + ih / 2;
      ctx.fillStyle = C.green; ctx.beginPath(); ctx.arc(x + 62, yy, 26, 0, 7); ctx.fill();
      ctx.strokeStyle = C.white; ctx.lineWidth = 6; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x + 50, yy); ctx.lineTo(x + 59, yy + 10); ctx.lineTo(x + 75, yy - 9); ctx.stroke();
      ctx.fillStyle = C.text; ctx.font = B(textFit(ctx, it, B, 38, w - 150)); ctx.textBaseline = 'middle'; ctx.textAlign = 'left'; ctx.fillText(it, x + 110, yy + 2);
    });
    if (s.foot) body(ctx, s.foot, W / 2, y + h + 40, W - 2 * M, 34, '#AEB6C6', 'center');
  },
  cta(ctx, s) {
    ctx.save(); ctx.font = XB(56); ctx.fillStyle = C.white; ctx.textAlign = 'center'; ctx.fillText('Comment', W / 2, 300); ctx.restore();
    ctx.save(); ctx.translate(W / 2, 420); ctx.rotate(-0.02);
    const fsz = textFit(ctx, spec.keyword, AR, 140, 640), kwW = Math.max(560, ctx.measureText(spec.keyword).width + 110);
    ctx.fillStyle = 'rgba(0,0,0,0.45)'; rrect(ctx, -kwW / 2 + 10, -86, kwW, 190, 34); ctx.fill();
    ctx.fillStyle = C.yellow; rrect(ctx, -kwW / 2, -100, kwW, 190, 34); ctx.fill();
    ctx.fillStyle = C.text; ctx.font = AR(fsz); ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(spec.keyword, 0, -2);
    ctx.restore();
    body(ctx, s.body, W / 2, 570, W - 2 * M, 42, C.white, 'center');
    art(ctx, s.art);
  },
};

const total = spec.slides.length;
const files = [];
spec.slides.forEach((s, i) => {
  const c = createCanvas(W, H), ctx = c.getContext('2d');
  stage(ctx); SLIDES[s.type](ctx, s); frame(ctx, i + 1, total);
  const f = path.join(dir, `slide-${String(i + 1).padStart(2, '0')}.png`);
  fs.writeFileSync(f, c.toBuffer('image/png')); files.push(f);
  fs.writeFileSync(f.replace(/.png$/, '.jpg'), c.toBuffer('image/jpeg', 92)); // Instagram's API only takes JPEG
});
// contact sheet for review
(async () => {
  const { loadImage } = require('@napi-rs/canvas');
  const cols = 5, w = 216, h = 270, rows = Math.ceil(files.length / cols), c = createCanvas(cols * w, rows * h), x = c.getContext('2d');
  for (let i = 0; i < files.length; i++) x.drawImage(await loadImage(fs.readFileSync(files[i])), (i % cols) * w, Math.floor(i / cols) * h, w, h);
  fs.writeFileSync(path.join(dir, 'sheet.png'), c.toBuffer('image/png'));
  console.log(`wrote ${files.length} slides + sheet.png`);
})();
