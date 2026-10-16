// node engine/worlds-preview.js [out.png] -> one still per world, same moment of the same reel, side by side
const fs = require('fs');
const path = require('path');
const { createCanvas } = require('@napi-rs/canvas');
const L = require('./lib');

const post = JSON.parse(fs.readFileSync(path.join(__dirname, '../content/posts/02-launch-trial/post.json'), 'utf8'));
const out = process.argv[2] || path.join(__dirname, '../docs/worlds.png');
const names = Object.keys(L.WORLDS);
const shots = [
  { type: 'versus', lt: 2.6, card: 'PROSECUTOR VS DEFENDER', cap: 'One AI argues it will flop.', p: post.lines[3].scene },
  { type: 'drop', lt: 1.6, card: 'ASK 12 AI CUSTOMERS', cap: 'Ask 12 AI customers.', p: post.lines[1].scene },
];
const cw = 270, ch = 480, sheet = createCanvas(cw * names.length, ch * shots.length), sx = sheet.getContext('2d');
const c = createCanvas(L.W, L.H), ctx = c.getContext('2d');
const hot = new RegExp(post.hot, 'i');
names.forEach((n, i) => {
  L.useWorld(n);
  shots.forEach((s, j) => {
    const t = 5 + s.lt; ctx.save(); L.background(ctx, t);
    const p = JSON.parse(JSON.stringify(s.p)); if (typeof p.gap === 'string') p.gap = 1.0;
    L.SCENES[s.type](ctx, s.lt, 4, p, t, post); ctx.restore();
    L.titleCard(ctx, t, 0, s.card); L.caption(ctx, t, 0, s.cap, hot);
    ctx.fillStyle = 'rgba(0,0,0,0.6)'; ctx.fillRect(0, 1780, L.W, 140); ctx.fillStyle = '#FFF'; ctx.font = L.XB(70); ctx.textAlign = 'center'; ctx.fillText(n, 540, 1870);
    sx.drawImage(c, i * cw, j * ch, cw, ch);
  });
});
fs.writeFileSync(out, sheet.toBuffer('image/png'));
console.log('wrote', out);
