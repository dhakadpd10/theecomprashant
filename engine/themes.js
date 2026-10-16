// Worlds: every reel picks one, so no two reels in a week look alike.
// A world sets the background art, colours, title-card style, caption style and character style.
// Scenes (page, drop, jury...) draw on top unchanged.
const W = 1080, H = 1920;
let seed = 1; const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
const reseed = (s) => { seed = s; };

// ---------- background art ----------
function stage(ctx, t, h) { h.defaultBackground(ctx, t); }

function courtroom(ctx, t) {
  const g = ctx.createLinearGradient(0, 0, 0, H); g.addColorStop(0, '#24140C'); g.addColorStop(1, '#3E2517');
  ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
  reseed(7);
  for (let x = 0; x < W; x += 120) { // wood panelling
    ctx.fillStyle = `rgba(${90 + rnd() * 30},${55 + rnd() * 15},${32 + rnd() * 10},0.55)`; ctx.fillRect(x + 4, 120, 112, 1030);
    ctx.strokeStyle = 'rgba(255,220,170,0.06)'; ctx.lineWidth = 3; ctx.strokeRect(x + 18, 160, 84, 950);
  }
  ctx.fillStyle = '#6B4128'; ctx.fillRect(0, 1150, W, 46); ctx.fillStyle = '#8A5634'; ctx.fillRect(0, 1150, W, 10);
  for (let x = 0; x < W; x += 270) { ctx.fillStyle = '#2E1A10'; ctx.fillRect(x + 20, 1220, 230, 700); ctx.strokeStyle = 'rgba(255,210,150,0.10)'; ctx.lineWidth = 4; ctx.strokeRect(x + 44, 1250, 182, 640); }
  for (const cx of [70, W - 70]) { // marble columns
    const m = ctx.createLinearGradient(cx - 55, 0, cx + 55, 0); m.addColorStop(0, '#BDB3A3'); m.addColorStop(0.45, '#F2ECE1'); m.addColorStop(1, '#A89E8E');
    ctx.fillStyle = m; ctx.fillRect(cx - 55, 150, 110, 1000);
    ctx.strokeStyle = 'rgba(80,60,40,0.18)'; ctx.lineWidth = 3; for (let k = -36; k <= 36; k += 18) { ctx.beginPath(); ctx.moveTo(cx + k, 180); ctx.lineTo(cx + k, 1130); ctx.stroke(); }
    ctx.fillStyle = '#E2D9CA'; ctx.fillRect(cx - 75, 120, 150, 40); ctx.fillRect(cx - 75, 1130, 150, 30);
  }
  ctx.save(); ctx.globalAlpha = 0.07; ctx.strokeStyle = '#F2D28A'; ctx.lineWidth = 14; // scales of justice watermark
  ctx.beginPath(); ctx.moveTo(540, 600); ctx.lineTo(540, 1040); ctx.moveTo(340, 680); ctx.lineTo(740, 680); ctx.stroke();
  for (const sx of [340, 740]) { ctx.beginPath(); ctx.moveTo(sx, 680); ctx.lineTo(sx - 70, 860); ctx.moveTo(sx, 680); ctx.lineTo(sx + 70, 860); ctx.stroke(); ctx.beginPath(); ctx.arc(sx, 860, 70, 0, Math.PI); ctx.stroke(); }
  ctx.restore();
  const l = ctx.createRadialGradient(540, 520, 50, 540, 520, 900); l.addColorStop(0, 'rgba(255,196,120,0.20)'); l.addColorStop(1, 'rgba(255,196,120,0)');
  ctx.fillStyle = l; ctx.fillRect(0, 0, W, H);
}

function bazaar(ctx, t) {
  const g = ctx.createLinearGradient(0, 0, 0, 1100); g.addColorStop(0, '#FF9A3C'); g.addColorStop(0.5, '#E2456F'); g.addColorStop(1, '#5B2A86');
  ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
  reseed(11); // building silhouettes with lit windows
  for (let x = -20; x < W; ) { const bw = 120 + rnd() * 120, bh = 260 + rnd() * 320; ctx.fillStyle = '#3A1B5C'; ctx.fillRect(x, 1000 - bh, bw, bh + 100);
    for (let wy = 1000 - bh + 30; wy < 960; wy += 60) for (let wx = x + 18; wx < x + bw - 30; wx += 44) if (rnd() > 0.45) { ctx.fillStyle = `rgba(255,${190 + rnd() * 50},90,${0.6 + rnd() * 0.4})`; ctx.fillRect(wx, wy, 20, 28); }
    x += bw + 8; }
  for (const [y0, sag] of [[470, 70], [640, 60]]) { // string lights
    ctx.strokeStyle = 'rgba(40,20,30,0.7)'; ctx.lineWidth = 3; ctx.beginPath();
    for (let i = 0; i <= 30; i++) { const x = (i / 30) * W, y = y0 + Math.sin((i / 30) * Math.PI) * sag; i ? ctx.lineTo(x, y) : ctx.moveTo(x, y); } ctx.stroke();
    for (let i = 1; i < 30; i += 2) { const x = (i / 30) * W, y = y0 + Math.sin((i / 30) * Math.PI) * sag + 12, a = 0.65 + 0.35 * Math.sin(t * 3 + i);
      const gl = ctx.createRadialGradient(x, y, 1, x, y, 34); gl.addColorStop(0, `rgba(255,230,140,${a})`); gl.addColorStop(1, 'rgba(255,230,140,0)'); ctx.fillStyle = gl; ctx.fillRect(x - 34, y - 34, 68, 68);
      ctx.fillStyle = ['#FFE08A', '#FF8FA3', '#9BE7FF', '#B6F09C'][i % 4]; ctx.beginPath(); ctx.arc(x, y, 9, 0, 7); ctx.fill(); }
  }
  for (let x = 0; x < W; x += 90) { // striped awning
    ctx.fillStyle = (x / 90) % 2 ? '#F4A300' : '#FFF1D6'; ctx.fillRect(x, 1020, 90, 90);
    ctx.beginPath(); ctx.arc(x + 45, 1110, 45, 0, Math.PI); ctx.fill(); }
  const w = ctx.createLinearGradient(0, 1160, 0, H); w.addColorStop(0, '#7A4A2A'); w.addColorStop(1, '#4A2A16'); ctx.fillStyle = w; ctx.fillRect(0, 1160, W, H);
  ctx.strokeStyle = 'rgba(0,0,0,0.25)'; ctx.lineWidth = 3; for (let y = 1220; y < H; y += 70) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); }
}

function desk(ctx, t) {
  ctx.fillStyle = '#E3C79F'; ctx.fillRect(0, 0, W, H);
  reseed(5);
  for (let y = 0; y < H; y += 160) { ctx.fillStyle = `rgba(${200 + rnd() * 30},${165 + rnd() * 25},${115 + rnd() * 25},0.5)`; ctx.fillRect(0, y, W, 156);
    ctx.strokeStyle = 'rgba(120,80,40,0.12)'; ctx.lineWidth = 2; for (let k = 0; k < 6; k++) { const yy = y + 20 + rnd() * 120; ctx.beginPath(); ctx.moveTo(0, yy); ctx.bezierCurveTo(300, yy + 8, 700, yy - 8, W, yy); ctx.stroke(); }
    ctx.fillStyle = 'rgba(90,60,30,0.25)'; ctx.fillRect(0, y + 156, W, 4); }
  const shadow = (fn) => { ctx.save(); ctx.shadowColor = 'rgba(60,40,20,0.35)'; ctx.shadowBlur = 24; ctx.shadowOffsetY = 10; fn(); ctx.restore(); };
  shadow(() => { ctx.fillStyle = '#FFFFFF'; ctx.beginPath(); ctx.arc(985, 150, 110, 0, 7); ctx.fill(); }); // coffee mug from above
  ctx.fillStyle = '#5A3420'; ctx.beginPath(); ctx.arc(985, 150, 82, 0, 7); ctx.fill(); ctx.fillStyle = 'rgba(255,255,255,0.25)'; ctx.beginPath(); ctx.ellipse(960, 130, 30, 14, -0.5, 0, 7); ctx.fill();
  shadow(() => { ctx.save(); ctx.translate(40, 1560); ctx.rotate(-0.12); ctx.fillStyle = '#FFE36E'; ctx.fillRect(-40, 0, 260, 250); ctx.restore(); });
  shadow(() => { ctx.save(); ctx.translate(900, 1620); ctx.rotate(0.15); ctx.fillStyle = '#FF9EBB'; ctx.fillRect(0, 0, 230, 230); ctx.restore(); });
  shadow(() => { ctx.save(); ctx.translate(120, 260); ctx.rotate(-0.6); ctx.fillStyle = '#2F6FED'; ctx.fillRect(0, 0, 300, 18); ctx.fillStyle = '#E8ECF4'; ctx.fillRect(300, 0, 30, 18); ctx.restore(); });
}

function arcade(ctx, t) {
  const g = ctx.createLinearGradient(0, 0, 0, 1120); g.addColorStop(0, '#0D0026'); g.addColorStop(0.7, '#3A0B5E'); g.addColorStop(1, '#7A1E7A');
  ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
  reseed(3); ctx.fillStyle = '#FFFFFF'; for (let i = 0; i < 90; i++) { ctx.globalAlpha = 0.3 + rnd() * 0.6; ctx.fillRect(rnd() * W, rnd() * 900, 3, 3); } ctx.globalAlpha = 1;
  ctx.save(); ctx.beginPath(); ctx.arc(540, 1060, 300, Math.PI, 0); ctx.clip(); // synthwave sun
  const s = ctx.createLinearGradient(0, 760, 0, 1060); s.addColorStop(0, '#FFE66B'); s.addColorStop(1, '#FF3D9A'); ctx.fillStyle = s; ctx.fillRect(240, 760, 600, 300);
  ctx.fillStyle = '#3A0B5E'; for (let k = 0; k < 7; k++) { const y = 900 + k * 24; ctx.fillRect(200, y, 700, 4 + k * 2.2); } ctx.restore();
  ctx.fillStyle = '#12002B'; ctx.fillRect(0, 1060, W, H);
  ctx.save(); ctx.strokeStyle = 'rgba(255,61,154,0.75)'; ctx.lineWidth = 3; ctx.shadowColor = '#FF3D9A'; ctx.shadowBlur = 12;
  for (let i = -14; i <= 14; i++) { ctx.beginPath(); ctx.moveTo(540 + i * 30, 1060); ctx.lineTo(540 + i * 280, H); ctx.stroke(); }
  const off = (t * 0.6) % 1; for (let j = 0; j < 10; j++) { const p = (j + off) / 10, y = 1060 + Math.pow(p, 2.1) * (H - 1060); ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); }
  ctx.restore();
  ctx.fillStyle = 'rgba(0,0,0,0.10)'; for (let y = 0; y < H; y += 6) ctx.fillRect(0, y, W, 2); // scanlines
}

function studio(ctx, t) {
  const g = ctx.createLinearGradient(0, 0, 0, H); g.addColorStop(0, '#061A40'); g.addColorStop(1, '#0D3B8C'); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
  ctx.save(); ctx.globalCompositeOperation = 'lighter';
  for (const [x0, dir] of [[0, 1], [W, -1]]) for (let k = 0; k < 3; k++) { // light beams from the top corners
    const a = dir * (0.35 + k * 0.3 + Math.sin(t * 0.6 + k) * 0.08); // angle from straight down
    ctx.fillStyle = 'rgba(120,180,255,0.06)'; ctx.beginPath(); ctx.moveTo(x0, 0);
    ctx.lineTo(x0 + Math.sin(a - 0.07) * 2600, Math.cos(a - 0.07) * 2600); ctx.lineTo(x0 + Math.sin(a + 0.07) * 2600, Math.cos(a + 0.07) * 2600); ctx.fill(); }
  ctx.restore();
  ctx.save(); ctx.strokeStyle = 'rgba(140,190,255,0.16)'; ctx.lineWidth = 2; const cx = 540, cy = 820, r = 390; // wireframe globe
  ctx.beginPath(); ctx.arc(cx, cy, r, 0, 7); ctx.stroke();
  for (let k = -3; k <= 3; k++) { const yy = cy + (k / 4) * r; const rr = Math.sqrt(r * r - (yy - cy) ** 2); ctx.beginPath(); ctx.ellipse(cx, yy, rr, rr * 0.12, 0, 0, 7); ctx.stroke(); }
  for (let k = 0; k < 6; k++) { const ph = ((k / 6) * Math.PI + t * 0.3) % Math.PI; ctx.beginPath(); ctx.ellipse(cx, cy, Math.abs(Math.cos(ph)) * r, r, 0, 0, 7); ctx.stroke(); }
  ctx.restore();
  const d = ctx.createLinearGradient(0, 1480, 0, H); d.addColorStop(0, '#0A2559'); d.addColorStop(1, '#04112B'); ctx.fillStyle = d; ctx.fillRect(0, 1480, W, H);
  ctx.fillStyle = 'rgba(160,200,255,0.35)'; ctx.fillRect(0, 1480, W, 4);
  ctx.fillStyle = '#D62839'; ctx.fillRect(0, 1640, 230, 70); ctx.fillStyle = '#FFFFFF'; ctx.font = h_bebas(48); ctx.textBaseline = 'middle'; ctx.textAlign = 'left'; ctx.fillText('D2C AI', 30, 1678);
  ctx.fillStyle = 'rgba(255,255,255,0.92)'; ctx.fillRect(230, 1640, W, 70); ctx.fillStyle = '#061A40'; ctx.font = h_bebas(44);
  const tick = 'NEW AI TOOLS FOR YOUR STORE  ·  FREE PROMPTS IN THE DMS  ·  PRACTICAL, NOT HYPE  ·  ';
  ctx.save(); ctx.beginPath(); ctx.rect(230, 1640, W, 70); ctx.clip(); const tw = ctx.measureText(tick).width; const ox = 250 - ((t * 140) % tw);
  ctx.fillText(tick + tick, ox, 1678); ctx.restore();
}
let h_bebas = (s) => `400 ${s}px Bebas, sans-serif`;

function notebook(ctx, t) {
  ctx.fillStyle = '#FBF8F1'; ctx.fillRect(0, 0, W, H);
  ctx.strokeStyle = 'rgba(80,120,200,0.28)'; ctx.lineWidth = 2; for (let y = 210; y < H; y += 64) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); }
  ctx.strokeStyle = 'rgba(230,80,80,0.55)'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(120, 0); ctx.lineTo(120, H); ctx.stroke();
  ctx.fillStyle = '#E8E2D4'; for (const y of [420, 960, 1500]) { ctx.beginPath(); ctx.arc(55, y, 26, 0, 7); ctx.fill(); }
  ctx.save(); ctx.strokeStyle = 'rgba(30,60,160,0.45)'; ctx.lineWidth = 5; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  const star = (x, y, r) => { ctx.beginPath(); for (let k = 0; k <= 10; k++) { const a = -Math.PI / 2 + (k * Math.PI) / 5, rr = k % 2 ? r * 0.45 : r; k ? ctx.lineTo(x + Math.cos(a) * rr, y + Math.sin(a) * rr) : ctx.moveTo(x + Math.cos(a) * rr, y + Math.sin(a) * rr); } ctx.stroke(); };
  star(960, 560, 40); star(200, 1560, 30); star(930, 1700, 26);
  ctx.beginPath(); ctx.moveTo(880, 1450); ctx.bezierCurveTo(960, 1400, 1000, 1500, 940, 1540); ctx.stroke();
  ctx.beginPath(); for (let k = 0; k < 40; k++) { const a = k * 0.5, r = 4 + k * 1.6; k ? ctx.lineTo(180 + Math.cos(a) * r, 650 + Math.sin(a) * r) : ctx.moveTo(180, 650); } ctx.stroke();
  ctx.restore();
}

function space(ctx, t) {
  const g = ctx.createLinearGradient(0, 0, 0, H); g.addColorStop(0, '#04051A'); g.addColorStop(1, '#0D1240'); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
  for (const [x, y, r, c] of [[250, 700, 520, '120,60,200'], [850, 1300, 600, '20,160,190'], [600, 300, 380, '200,60,140']]) { const n = ctx.createRadialGradient(x, y, 10, x, y, r); n.addColorStop(0, `rgba(${c},0.30)`); n.addColorStop(1, `rgba(${c},0)`); ctx.fillStyle = n; ctx.fillRect(0, 0, W, H); }
  reseed(9); for (let i = 0; i < 160; i++) { const x = rnd() * W, y = rnd() * H, s = rnd() * 2.6 + 0.6, a = 0.35 + 0.65 * Math.abs(Math.sin(t * (0.6 + rnd()) + i)); ctx.fillStyle = `rgba(255,255,255,${a})`; ctx.fillRect(x, y, s, s); }
  const px = 905, py = 560, r = 120; const pl = ctx.createLinearGradient(px - r, py - r, px + r, py + r); pl.addColorStop(0, '#FFB36B'); pl.addColorStop(1, '#B04A2F');
  ctx.save(); ctx.strokeStyle = 'rgba(255,220,180,0.55)'; ctx.lineWidth = 10; ctx.beginPath(); ctx.ellipse(px, py, r * 1.8, r * 0.45, -0.35, Math.PI, 2 * Math.PI); ctx.stroke();
  ctx.fillStyle = pl; ctx.beginPath(); ctx.arc(px, py, r, 0, 7); ctx.fill();
  ctx.beginPath(); ctx.ellipse(px, py, r * 1.8, r * 0.45, -0.35, 0, Math.PI); ctx.stroke(); ctx.restore();
}

function gameshow(ctx, t) {
  ctx.fillStyle = '#1B0B2E'; ctx.fillRect(0, 0, W, H);
  for (let k = 0; k < 4; k++) { const x = 540 + (k - 1.5) * 260, sw = Math.sin(t * 0.8 + k) * 40; // spotlights
    const s = ctx.createLinearGradient(0, 0, 0, 1300); s.addColorStop(0, 'rgba(255,240,180,0.20)'); s.addColorStop(1, 'rgba(255,240,180,0)');
    ctx.fillStyle = s; ctx.beginPath(); ctx.moveTo(x - 20, 0); ctx.lineTo(x + 20, 0); ctx.lineTo(x + 170 + sw, 1300); ctx.lineTo(x - 170 + sw, 1300); ctx.fill(); }
  const curtain = (x0, w, flip) => { for (let i = 0; i < 6; i++) { const x = x0 + (flip ? -1 : 1) * i * (w / 6), c = ctx.createLinearGradient(x, 0, x + (flip ? -1 : 1) * (w / 6), 0);
    c.addColorStop(0, '#8E1020'); c.addColorStop(0.5, '#C8243A'); c.addColorStop(1, '#6A0A17'); ctx.fillStyle = c; ctx.fillRect(Math.min(x, x + (flip ? -1 : 1) * (w / 6)), 0, w / 6, 1420); } };
  curtain(0, 200, false); curtain(W, 200, true);
  ctx.fillStyle = '#A01428'; ctx.fillRect(0, 0, W, 110); for (let x = 0; x < W; x += 90) { ctx.beginPath(); ctx.arc(x + 45, 110, 45, 0, Math.PI); ctx.fill(); }
  ctx.fillStyle = '#E8B33A'; ctx.fillRect(0, 100, W, 10);
  const f = ctx.createLinearGradient(0, 1250, 0, H); f.addColorStop(0, '#3A1A5C'); f.addColorStop(1, '#140826'); ctx.fillStyle = f; ctx.fillRect(0, 1250, W, H);
  for (let i = 0; i < 18; i++) { const x = 30 + i * 60, on = (Math.floor(t * 4) + i) % 2; ctx.fillStyle = on ? '#FFE27A' : '#8A6A2A'; ctx.beginPath(); ctx.arc(x, 1262, 9, 0, 7); ctx.fill(); }
}

// ---------- the worlds ----------
const WORLDS = {
  stage:     { bg: stage,     card: 'sticker', caption: 'box',     char: 'box',   pal: {} },
  courtroom: { bg: courtroom, card: 'plaque',  caption: 'bar',     char: 'box',   pal: { fg: '#F5ECD9', fgMute: '#CDB894', accent: '#E9C46A', accentInk: '#24140C', capBg: '#F5ECD9', capFg: '#2A1810', capHot: '#A3262A' } },
  bazaar:    { bg: bazaar,    card: 'tag',     caption: 'tiles',   char: 'blob',  pal: { fg: '#FFF3E0', fgMute: '#FFD8B0', accent: '#FFD23F', accentInk: '#3A1B5C', capBg: '#F4A300', capFg: '#2B1500', capHot: '#FFFFFF' } },
  desk:      { bg: desk,      card: 'sticky',  caption: 'box',     char: 'paper', pal: { fg: '#2B2118', fgMute: '#6B5A48', accent: '#E8475F', accentInk: '#FFFFFF', capBg: '#FFFFFF', capFg: '#2B2118', capHot: '#E8475F' } },
  arcade:    { bg: arcade,    card: 'pixel',   caption: 'outline', char: 'robot', pal: { fg: '#F2E9FF', fgMute: '#C3A6F0', accent: '#00F0FF', accentInk: '#12002B', capBg: 'transparent', capFg: '#FFFFFF', capHot: '#00F0FF', capStroke: '#B0167A' } },
  studio:    { bg: studio,    card: 'tv',      caption: 'bar',     char: 'box',   pal: { fg: '#FFFFFF', fgMute: '#9DB4D9', accent: '#FFD23F', accentInk: '#061A40', capBg: '#061A40', capFg: '#FFFFFF', capHot: '#FFD23F' } },
  notebook:  { bg: notebook,  card: 'hand',    caption: 'box',     char: 'paper', pal: { fg: '#1E2A5A', fgMute: '#5A6890', accent: '#2F6FED', accentInk: '#FFFFFF', capBg: '#FFFFFF', capFg: '#1E2A5A', capHot: '#2F6FED', capBorder: '#1E2A5A' } },
  space:     { bg: space,     card: 'neon',    caption: 'tiles',   char: 'robot', pal: { fg: '#FFFFFF', fgMute: '#9FB0FF', accent: '#7DF9FF', accentInk: '#04051A', capBg: 'rgba(10,14,50,0.85)', capFg: '#FFFFFF', capHot: '#7DF9FF' } },
  gameshow:  { bg: gameshow,  card: 'marquee', caption: 'box',     char: 'blob',  pal: { fg: '#FFFFFF', fgMute: '#E0C3FF', accent: '#FFD23F', accentInk: '#1B0B2E' } },
};
const WORLD_NOTES = {
  stage: 'dark night stage, spotlight, paper sticker titles (the original look)',
  courtroom: 'wood-panelled court, marble columns, gold plaque titles: trials, verdicts, juries, judging',
  bazaar: 'Indian market street at dusk, string lights, striped awning, price-tag titles: shoppers, pricing, festivals, selling',
  desk: 'top-down founder desk, coffee, sticky notes, paper-cutout characters: audits, checklists, planning, workflows',
  arcade: 'synthwave arcade, neon grid, pixel titles, robots: automation, agents, tools, hacks, speed',
  studio: 'TV news studio, globe, ticker, lower-third titles: news, new features, announcements, trends',
  notebook: 'ruled notebook paper, doodles, marker titles: lessons, frameworks, copywriting, hooks',
  space: 'space with planet and stars, neon titles, robots: big ideas, AI teams, scaling, the future',
  gameshow: 'game-show stage, curtains, spotlights, marquee titles: versus, votes, A/B tests, prices, challenges',
};

module.exports = { WORLDS, WORLD_NOTES, setBebas: (f) => { h_bebas = f; } };
