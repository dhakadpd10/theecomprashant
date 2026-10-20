// What the big phone shows in "phone" shots. Drawn on a 900x1800 canvas; u (0..1) is how far into the beat we are,
// so lists fill in, answers type out and numbers count while the line is spoken.
// Screen types (post.json beat "screen"):
//   chat      { ask, answer }                                    a prompt to the AI and its answer typing out
//   page      { product, name, price, lines:[{text, mark}] }     a product page; mark "bad" (red) or "good" (green)
//   whatsapp  { name, msgs:[{from:"brand"|"buyer", text, buttons:[]}] }
//   stats     { label, from, to, prefix, suffix, note }          one big number counting up or down
//   list      { title, items:[] }                                a checklist ticking itself
//   ad        { brand, headline, product, notes:[] }             an Instagram ad with sticky-note comments
//   notify    { items:[{app, text}] }                            lock-screen notifications piling up
export const SW = 900, SH = 1800;
const clamp = (x, a = 0, b = 1) => Math.max(a, Math.min(b, x));

function rr(x, X, Y, w, h, r) { r = Math.min(r, w / 2, h / 2); x.beginPath(); x.moveTo(X + r, Y); x.arcTo(X + w, Y, X + w, Y + h, r); x.arcTo(X + w, Y + h, X, Y + h, r); x.arcTo(X, Y + h, X, Y, r); x.arcTo(X, Y, X + w, Y, r); x.closePath(); }
function lines(x, text, maxW) {
  const out = [];
  for (const para of String(text || '').split('\n')) { let cur = ''; for (const w of para.split(' ')) { const t = cur ? cur + ' ' + w : w; if (x.measureText(t).width > maxW && cur) { out.push(cur); cur = w; } else cur = t; } out.push(cur); }
  return out;
}
function status(x, dark) {
  x.fillStyle = dark ? '#FFFFFF' : '#111111'; x.font = '700 40px InterB'; x.textBaseline = 'middle'; x.textAlign = 'left'; x.fillText('9:41', 70, 62);
  x.textAlign = 'right'; x.fillText('5G  ▮▮▮', SW - 70, 62); x.textAlign = 'left';
}

/** A small drawing of the product so a kurta looks like a kurta. */
export function drawProduct(x, kind, cx, cy, s) {
  x.save(); x.translate(cx, cy); x.scale(s, s); x.lineJoin = 'round';
  const k = String(kind || 'box').toLowerCase();
  if (/kurta|shirt|tee|dress|cloth|saree|top/.test(k)) {
    x.fillStyle = '#F2A33A'; x.beginPath();
    x.moveTo(-60, -150); x.lineTo(-150, -110); x.lineTo(-185, -10); x.lineTo(-135, 10); x.lineTo(-110, -50); x.lineTo(-105, 170); x.lineTo(105, 170); x.lineTo(110, -50); x.lineTo(135, 10); x.lineTo(185, -10); x.lineTo(150, -110); x.lineTo(60, -150); x.quadraticCurveTo(0, -95, -60, -150); x.fill();
    x.strokeStyle = '#B5651D'; x.lineWidth = 6; x.stroke();
    x.fillStyle = '#7A2E12'; for (let i = 0; i < 4; i++) { x.beginPath(); x.arc(0, -95 + i * 32, 7, 0, 7); x.fill(); }
    x.strokeStyle = '#FFF0C8'; x.lineWidth = 5; x.setLineDash([10, 10]); x.beginPath(); x.moveTo(-105, 140); x.lineTo(105, 140); x.stroke(); x.setLineDash([]);
  } else if (/serum|bottle|oil|skin|cream|perfume/.test(k)) {
    x.fillStyle = '#F6D7C3'; rr(x, -70, -60, 140, 220, 30); x.fill(); x.strokeStyle = '#C98E6F'; x.lineWidth = 6; x.stroke();
    x.fillStyle = '#3A2A24'; rr(x, -32, -140, 64, 85, 12); x.fill();
    x.fillStyle = '#FFFFFF'; rr(x, -50, 10, 100, 80, 10); x.fill(); x.fillStyle = '#C98E6F'; x.font = '800 30px InterXB'; x.textAlign = 'center'; x.fillText('GLOW', 0, 60);
  } else if (/candle/.test(k)) {
    x.fillStyle = '#E7C9B5'; rr(x, -100, -40, 200, 210, 24); x.fill(); x.fillStyle = '#C4552D'; rr(x, -100, 40, 200, 70, 6); x.fill();
    x.fillStyle = '#FFB347'; x.beginPath(); x.ellipse(0, -90, 22, 42, 0, 0, 7); x.fill(); x.fillStyle = '#3A2A20'; x.fillRect(-3, -55, 6, 18);
  } else if (/shoe|sneaker/.test(k)) {
    x.fillStyle = '#FFFFFF'; x.beginPath(); x.moveTo(-180, 60); x.lineTo(-170, -40); x.quadraticCurveTo(-120, -60, -60, -10); x.quadraticCurveTo(60, 10, 170, 30); x.quadraticCurveTo(190, 60, 170, 80); x.lineTo(-180, 80); x.closePath(); x.fill();
    x.strokeStyle = '#333'; x.lineWidth = 6; x.stroke(); x.fillStyle = '#E8577E'; x.fillRect(-180, 70, 360, 22);
  } else if (/tea|chai|coffee|ghee|pickle|jar|food|snack|masala/.test(k)) {
    x.fillStyle = '#E9B64A'; rr(x, -95, -70, 190, 230, 26); x.fill(); x.fillStyle = '#7A3E12'; rr(x, -105, -120, 210, 60, 14); x.fill();
    x.fillStyle = '#FFF6E2'; rr(x, -70, -10, 140, 100, 12); x.fill(); x.fillStyle = '#7A3E12'; x.font = '800 30px InterXB'; x.textAlign = 'center'; x.fillText('DESI', 0, 52);
  } else if (/jewel|ring|earring|necklace/.test(k)) {
    x.strokeStyle = '#E2B23C'; x.lineWidth = 16; x.beginPath(); x.arc(0, 10, 110, 0.2, Math.PI - 0.2); x.stroke();
    x.fillStyle = '#D6453D'; x.beginPath(); x.moveTo(0, 120); x.lineTo(-30, 160); x.lineTo(0, 200); x.lineTo(30, 160); x.closePath(); x.fill();
  } else {
    x.fillStyle = '#D19A5C'; x.fillRect(-140, -100, 280, 230); x.fillStyle = '#B98345'; x.fillRect(-140, -100, 280, 40); x.fillStyle = '#E9D2A8'; x.fillRect(-25, -100, 50, 230);
  }
  x.restore();
}

export function drawScreen(x, s, u, t) {
  const type = s.type;
  x.save(); x.textBaseline = 'alphabetic'; x.textAlign = 'left';
  if (type === 'chat') {
    x.fillStyle = '#F7F5F2'; x.fillRect(0, 0, SW, SH); status(x);
    x.fillStyle = '#FFFFFF'; x.fillRect(0, 100, SW, 120); x.fillStyle = '#E8E3DC'; x.fillRect(0, 218, SW, 3);
    x.fillStyle = '#D97757'; x.beginPath(); x.arc(110, 160, 34, 0, 7); x.fill(); x.fillStyle = '#FFFFFF'; x.font = '800 34px InterXB'; x.textAlign = 'center'; x.fillText('AI', 110, 172);
    x.textAlign = 'left'; x.fillStyle = '#1F1A17'; x.font = '800 44px InterXB'; x.fillText('AI assistant', 165, 176);
    // the ask, as a right-hand bubble
    x.font = '600 40px InterSB'; const ask = lines(x, s.ask, 600); const ah = ask.length * 54 + 50;
    const ax = SW - 60 - Math.min(680, Math.max(...ask.map((l) => x.measureText(l).width)) + 60);
    rr(x, ax, 270, SW - 60 - ax, ah, 34); x.fillStyle = '#2A3A5C'; x.fill(); x.fillStyle = '#FFFFFF';
    ask.forEach((l, i) => x.fillText(l, ax + 30, 270 + 62 + i * 54));
    // the answer types out
    const full = String(s.answer || ''); const n = Math.floor(full.length * clamp((u - 0.12) / 0.7));
    x.font = '600 42px InterSB'; const ans = lines(x, full.slice(0, n), 760);
    let y = 270 + ah + 90;
    if (u > 0.08) { x.fillStyle = '#D97757'; x.beginPath(); x.arc(85, y - 14, 16, 0, 7); x.fill(); }
    x.fillStyle = '#1F1A17'; ans.forEach((l) => { x.fillText(l, 70, y + 50); y += 58; });
    if (n < full.length && u > 0.08 && Math.floor(t * 4) % 2) { x.fillStyle = '#1F1A17'; x.fillRect(70 + x.measureText(ans[ans.length - 1] || '').width + 6, y - 46, 22, 46); }
  } else if (type === 'page') {
    x.fillStyle = '#FFFFFF'; x.fillRect(0, 0, SW, SH); status(x);
    x.fillStyle = '#F1ECE4'; rr(x, 60, 130, SW - 120, 70, 35); x.fill(); x.fillStyle = '#8A8178'; x.font = '600 32px InterSB'; x.fillText('🔒 ' + (s.url || 'yourstore.in/products'), 95, 177);
    x.fillStyle = '#FBF3E6'; x.fillRect(0, 230, SW, 620); drawProduct(x, s.product, SW / 2, 540, 1.35);
    x.fillStyle = '#1F1A17'; x.font = '800 58px InterXB'; x.fillText(s.name || 'Your product', 60, 940);
    x.fillStyle = '#1F1A17'; x.font = '800 54px InterXB'; x.fillText(s.price || '₹999', 60, 1015);
    x.fillStyle = '#F2A33A'; x.font = '700 36px InterB'; x.fillText('★★★★☆', 330, 1010); x.fillStyle = '#8A8178'; x.font = '600 30px InterSB'; x.fillText(s.reviews || '(48 reviews)', 480, 1008);
    let y = 1100; const items = s.lines || [];
    items.forEach((it, i) => {
      const text = typeof it === 'string' ? it : it.text, mark = typeof it === 'string' ? null : it.mark;
      const on = u > 0.15 + (i / Math.max(1, items.length)) * 0.6;
      x.font = '600 38px InterSB'; const ls = lines(x, text, 720); const h = ls.length * 50 + 26;
      if (mark && on) { rr(x, 44, y - 44, SW - 88, h, 16); x.fillStyle = mark === 'bad' ? '#FDE2E0' : '#DDF5E6'; x.fill(); rr(x, 44, y - 44, 12, h, 6); x.fillStyle = mark === 'bad' ? '#E0453A' : '#22A35A'; x.fill(); }
      x.fillStyle = mark && on ? (mark === 'bad' ? '#9E2A22' : '#16703F') : '#4A423C';
      ls.forEach((l, j) => x.fillText(l, 76, y + j * 50)); y += h + 18;
    });
    rr(x, 60, SH - 190, SW - 120, 120, 60); x.fillStyle = '#1F1A17'; x.fill(); x.fillStyle = '#FFFFFF'; x.font = '800 44px InterXB'; x.textAlign = 'center'; x.fillText('ADD TO CART', SW / 2, SH - 115);
  } else if (type === 'whatsapp') {
    x.fillStyle = '#ECE5DD'; x.fillRect(0, 0, SW, SH); x.fillStyle = '#075E54'; x.fillRect(0, 0, SW, 230); status(x, true);
    x.fillStyle = '#FFFFFF'; x.beginPath(); x.arc(110, 165, 42, 0, 7); x.fill(); x.fillStyle = '#075E54'; x.font = '800 40px InterXB'; x.textAlign = 'center'; x.fillText((s.name || 'B')[0], 110, 180);
    x.textAlign = 'left'; x.fillStyle = '#FFFFFF'; x.font = '800 44px InterXB'; x.fillText(s.name || 'Your Brand', 175, 162); x.font = '600 30px InterSB'; x.fillText('online', 175, 202);
    let y = 300; const msgs = s.msgs || [];
    msgs.forEach((m, i) => {
      if (u < 0.08 + (i / Math.max(1, msgs.length)) * 0.75) return;
      const me = m.from === 'brand'; x.font = '600 40px InterSB'; const ls = lines(x, m.text, 600);
      const w = Math.min(700, Math.max(...ls.map((l) => x.measureText(l).width)) + 60), h = ls.length * 54 + 40 + (m.buttons ? m.buttons.length * 90 : 0);
      const bx = me ? SW - 50 - w : 50; rr(x, bx, y, w, h, 26); x.fillStyle = me ? '#DCF8C6' : '#FFFFFF'; x.fill();
      x.fillStyle = '#1F1A17'; ls.forEach((l, j) => x.fillText(l, bx + 30, y + 58 + j * 54));
      (m.buttons || []).forEach((b, j) => { const by = y + ls.length * 54 + 40 + j * 90; x.fillStyle = 'rgba(0,0,0,0.08)'; x.fillRect(bx + 10, by, w - 20, 3); x.fillStyle = '#128C7E'; x.font = '800 40px InterXB'; x.textAlign = 'center'; x.fillText(b, bx + w / 2, by + 60); x.textAlign = 'left'; });
      y += h + 30;
    });
  } else if (type === 'stats') {
    const g = x.createLinearGradient(0, 0, 0, SH); g.addColorStop(0, '#13213F'); g.addColorStop(1, '#0B1428'); x.fillStyle = g; x.fillRect(0, 0, SW, SH); status(x, true);
    x.fillStyle = '#9FB3D9'; x.font = '700 50px InterB'; x.textAlign = 'center'; lines(x, s.label || '', 760).forEach((l, i) => x.fillText(l, SW / 2, 520 + i * 64));
    const v = Number(s.from || 0) + (Number(s.to || 0) - Number(s.from || 0)) * clamp((u - 0.1) / 0.6) ** 0.7;
    const num = (s.prefix || '') + Math.round(v).toLocaleString('en-IN') + (s.suffix || '');
    x.fillStyle = Number(s.to) >= Number(s.from) ? '#5BE38A' : '#FF6B5E'; x.font = `800 ${num.length > 6 ? 170 : 230}px InterXB`; x.fillText(num, SW / 2, 900);
    x.fillStyle = '#FFFFFF'; x.font = '600 40px InterSB'; lines(x, s.note || '', 720).forEach((l, i) => x.fillText(l, SW / 2, 1080 + i * 56));
    // a small bar chart that grows
    for (let i = 0; i < 7; i++) { const hgt = (60 + i * 38 * (Number(s.to) >= Number(s.from) ? 1 : -0.3) + 120) * clamp(u * 1.6 - i * 0.08); rr(x, 150 + i * 90, 1560 - hgt, 60, hgt, 12); x.fillStyle = i === 6 ? '#5BE38A' : '#34507F'; x.fill(); }
  } else if (type === 'list') {
    x.fillStyle = '#FFFDF7'; x.fillRect(0, 0, SW, SH); status(x);
    x.fillStyle = '#1F1A17'; x.font = '800 60px InterXB'; lines(x, s.title || '', 760).forEach((l, i) => x.fillText(l, 70, 230 + i * 72));
    let y = 420; const items = s.items || [];
    items.forEach((it, i) => {
      const on = u > 0.1 + (i / Math.max(1, items.length)) * 0.7;
      x.font = '700 44px InterB'; const ls = lines(x, it, 640); const h = ls.length * 56 + 50;
      rr(x, 50, y, SW - 100, h, 24); x.fillStyle = on ? '#E9F8EE' : '#F3F0EA'; x.fill();
      x.beginPath(); x.arc(115, y + h / 2, 34, 0, 7); x.fillStyle = on ? '#22A35A' : '#D9D3C9'; x.fill();
      if (on) { x.strokeStyle = '#FFFFFF'; x.lineWidth = 9; x.lineCap = 'round'; x.beginPath(); x.moveTo(98, y + h / 2); x.lineTo(112, y + h / 2 + 14); x.lineTo(134, y + h / 2 - 14); x.stroke(); }
      x.fillStyle = '#1F1A17'; ls.forEach((l, j) => x.fillText(l, 175, y + 66 + j * 56)); y += h + 26;
    });
  } else if (type === 'ad') {
    x.fillStyle = '#FFFFFF'; x.fillRect(0, 0, SW, SH); status(x);
    x.fillStyle = '#F2A33A'; x.beginPath(); x.arc(100, 175, 40, 0, 7); x.fill();
    x.fillStyle = '#1F1A17'; x.font = '800 40px InterXB'; x.fillText(s.brand || 'yourbrand', 160, 170); x.fillStyle = '#8A8178'; x.font = '600 30px InterSB'; x.fillText('Sponsored', 160, 208);
    const g = x.createLinearGradient(0, 260, 0, 1160); g.addColorStop(0, '#FFE1C2'); g.addColorStop(1, '#F7B98B'); x.fillStyle = g; x.fillRect(0, 250, SW, 900);
    drawProduct(x, s.product, SW / 2, 700, 1.6);
    x.fillStyle = '#1F1A17'; x.font = '800 54px InterXB'; x.textAlign = 'center'; lines(x, s.headline || '', 780).forEach((l, i) => x.fillText(l, SW / 2, 360 + i * 64)); x.textAlign = 'left';
    x.fillStyle = '#EFF4FF'; x.fillRect(0, 1150, SW, 110); x.fillStyle = '#2D6BE4'; x.font = '800 40px InterXB'; x.fillText('Shop now  ›', 60, 1220);
    (s.notes || []).forEach((n, i) => {
      if (u < 0.15 + i * 0.22) return;
      x.save(); x.translate(i % 2 ? 560 : 260, 1400 + i * 120); x.rotate(i % 2 ? 0.05 : -0.06);
      x.font = '700 38px InterB'; const w = Math.min(560, x.measureText(n).width + 60);
      x.fillStyle = '#FFE36E'; x.fillRect(-w / 2, -55, w, 90); x.fillStyle = '#1F1A17'; x.textAlign = 'center'; x.fillText(n, 0, 0); x.restore();
    });
  } else if (type === 'notify') {
    const g = x.createLinearGradient(0, 0, 0, SH); g.addColorStop(0, '#3B2F5E'); g.addColorStop(1, '#C0607A'); x.fillStyle = g; x.fillRect(0, 0, SW, SH); status(x, true);
    x.fillStyle = '#FFFFFF'; x.font = '300 190px InterSB'; x.textAlign = 'center'; x.fillText('9:41', SW / 2, 420); x.textAlign = 'left';
    const items = s.items || []; let y = 560;
    items.forEach((it, i) => {
      if (u < 0.05 + (i / Math.max(1, items.length)) * 0.75) return;
      rr(x, 50, y, SW - 100, 170, 36); x.fillStyle = 'rgba(255,255,255,0.86)'; x.fill();
      x.fillStyle = '#E0453A'; rr(x, 80, y + 30, 64, 64, 16); x.fill();
      x.fillStyle = '#1F1A17'; x.font = '800 34px InterXB'; x.fillText(it.app || 'Store', 165, y + 72); x.fillStyle = '#8A8178'; x.font = '600 28px InterSB'; x.fillText('now', SW - 150, y + 72);
      x.fillStyle = '#1F1A17'; x.font = '600 36px InterSB'; x.fillText(lines(x, it.text, 700)[0], 80, y + 135);
      y += 195;
    });
  }
  x.restore();
}
