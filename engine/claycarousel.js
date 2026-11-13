// Clay carousels (carousel.json "style": "clay"; docs/CLAY.md): 1080 x 1350 slides drawn as HTML with the plasticine
// filters from engine/clay.js and the clay host, rendered by a headless browser to slide-01.jpg ... + sheet.png.
//   node engine/claycarousel.js content/posts/<id>
const fs = require('fs'), path = require('path'), os = require('os');
const puppeteer = require('puppeteer-core');
const clay = require('./clay');

const W = 1080, H = 1350, ROOT = path.join(__dirname, '..'), NM = path.join(ROOT, 'node_modules');
const PNG = path.join(ROOT, 'character', 'clay', 'png');
const esc = (s) => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const uri = (f) => 'data:' + (f.endsWith('.png') ? 'image/png' : 'font/woff2') + ';base64,' + fs.readFileSync(f).toString('base64');
const FONTS = [['Playfair Display', '@fontsource/playfair-display/files/playfair-display-latin-700-normal.woff2', 700],
  ['Playfair Italic', '@fontsource/playfair-display/files/playfair-display-latin-700-italic.woff2', 700],
  ['Inter', '@fontsource/inter/files/inter-latin-700-normal.woff2', 700], ['Inter', '@fontsource/inter/files/inter-latin-800-normal.woff2', 800]];

// the host as one picture: a body pose with a head (mood + mouth) on top
const host = (pose, mood, mouth = 'closed', css = '') => `<div class="host" style="${css}"><img src="${uri(path.join(PNG, `body-${pose}.png`))}"><img src="${uri(path.join(PNG, `head-${mood}-${mouth}.png`))}"></div>`;
// "*word*" -> the accent word in italic
const em = (s) => esc(s).replace(/\*([^*]+)\*/g, '<span class="it">$1</span>');

function slideHTML(spec, s, i, n, handle) {
  const foot = `<div class="foot"><span>${esc(handle)}</span><span>${i + 1} / ${n}</span></div>`;
  if (s.kind === 'cover') return `<div class="kicker">${esc(s.kicker || '')}</div>
<div class="title big">${s.title.map((l) => `<div>${em(l)}</div>`).join('')}</div>
${s.sub ? `<div class="sub">${esc(s.sub)}</div>` : ''}
<div class="save clay-s">SAVE THIS</div>
${host('explain', 'happy', 'talk', 'right:20px;bottom:96px;width:440px;height:643px')}${foot}`;
  if (s.kind === 'item') return `<div class="kicker">${esc(s.kicker || `${s.n} OF ${spec.slides.filter((x) => x.kind === 'item').length}`)}</div>
<div class="num clay-s">${esc(s.n)}</div>
<div class="title mid">${em(s.name)}</div>
${s.domain ? `<div class="domain">${esc(s.domain)}</div>` : ''}
<div class="card">
  <div class="line">${esc(s.line)}</div>
  ${s.box ? `<div class="box">${esc(s.box)}</div>` : ''}
  ${(s.rows || []).map((r) => `<div class="row"><b>${esc(r.k)}</b><span>${esc(r.v)}</span></div>`).join('')}
  ${s.catch ? `<div class="catch"><b>THE CATCH</b><span>${esc(s.catch)}</span></div>` : ''}
</div>
${host(['thumbs', 'point', 'explain', 'shrug', 'think'][(s.n - 1) % 5], ['happy', 'smug', 'happy', 'normal', 'think'][(s.n - 1) % 5], 'closed', 'right:30px;bottom:96px;width:300px;height:438px')}${foot}`;
  if (s.kind === 'recap') return `<div class="kicker">${esc(s.kicker || 'QUICK RECAP')}</div>
<div class="title mid" style="left:90px">${em(s.title || 'Save this *list.*')}</div>
<div class="card recap">${s.items.map((t, k) => `<div class="ri"><i class="clay-s">${k + 1}</i><span>${esc(t)}</span></div>`).join('')}</div>${foot}`;
  // cta
  return `<div class="title big" style="top:200px">${em(s.title || 'Send this to *a friend.*')}</div>
<div class="sub" style="top:470px">${esc(s.who || '')}</div>
<div class="pill clay-s">Comment <b>${esc(spec.keyword)}</b></div>
<div class="sub2">${esc(s.text || "and I'll DM you the full list")}</div>
${host('point', 'happy', 'closed', 'left:0;bottom:96px;width:400px;height:584px')}${foot}`;
}

function pageHTML(spec, s, i, n, handle) {
  const pal = { bg: '#E9D6B8', ink: '#2B2420', accent: '#D2602A', ...(spec.palette || {}) };
  const faces = FONTS.map(([f, file, wt]) => `@font-face{font-family:'${f}';src:url(${uri(path.join(NM, file))}) format('woff2');font-weight:${wt};font-style:${/italic/.test(file) ? 'italic' : 'normal'}}`).join('\n');
  return `<!doctype html><html><head><meta charset="utf-8"><style>${faces}
:root{--bg:${pal.bg};--ink:${pal.ink};--accent:${pal.accent}}
html,body{margin:0;width:${W}px;height:${H}px;overflow:hidden}
#s{position:relative;width:${W}px;height:${H}px;overflow:hidden;background:radial-gradient(130% 90% at 45% 25%,#F4E8D5 0%,var(--bg) 60%,#D8C19E 100%);color:var(--ink);font-family:Inter,sans-serif}
.card,.clay{filter:url(#clay-slab)} .clay-s{filter:url(#clay-pill)} .title{filter:url(#clay-type)}
.kicker{position:absolute;left:90px;top:96px;font-weight:800;font-size:30px;letter-spacing:.18em;color:var(--accent)}
.title{position:absolute;left:90px;right:90px;top:150px;font-family:'Playfair Display',serif;font-weight:700;line-height:1.04}
.title.big{font-size:118px}.title.mid{top:210px;font-size:88px;left:250px}
.it{font-family:'Playfair Italic',serif;font-style:italic;color:var(--accent)}
.sub{position:absolute;left:90px;right:520px;top:560px;font-weight:700;font-size:38px;line-height:1.3;color:rgba(43,36,32,.72)}
.sub2{position:absolute;left:440px;right:90px;top:840px;font-weight:700;font-size:34px;color:rgba(43,36,32,.7);text-align:center}
.save{position:absolute;left:90px;top:820px;padding:0 40px;height:96px;border-radius:48px;background:var(--ink);color:#F4E8D5;font-weight:800;font-size:36px;letter-spacing:.12em;display:flex;align-items:center}
.num{position:absolute;left:90px;top:200px;width:130px;height:130px;border-radius:50%;background:var(--accent);color:#fff;font-weight:800;font-size:72px;display:flex;align-items:center;justify-content:center}
.domain{position:absolute;left:254px;top:318px;font-weight:700;font-size:34px;color:rgba(43,36,32,.55)}
.card{position:absolute;left:80px;right:300px;top:420px;max-height:760px;border-radius:52px;background:#FBF4E8;padding:50px 54px;box-sizing:border-box;display:flex;flex-direction:column;gap:26px}
.line{font-weight:800;font-size:46px;line-height:1.25}
.box{font-weight:700;font-size:34px;line-height:1.4;background:#F1E5CF;border-radius:28px;padding:28px 32px;white-space:pre-wrap}
.row{display:flex;flex-direction:column;gap:6px;background:#F1E5CF;border-radius:28px;padding:22px 30px}
.row b{font-size:24px;letter-spacing:.14em;color:rgba(43,36,32,.5)} .row span{font-size:36px;font-weight:800}
.catch{display:flex;flex-direction:column;gap:6px;background:#F7DCCB;border-radius:28px;padding:22px 30px}
.catch b{font-size:24px;letter-spacing:.14em;color:#9A3B16} .catch span{font-size:34px;font-weight:700;color:#5A2A12}
.card.recap{right:80px;gap:22px} .ri{display:flex;align-items:center;gap:26px;font-size:40px;font-weight:800}
.ri i{flex:none;width:76px;height:76px;border-radius:50%;background:var(--accent);color:#fff;font-style:normal;display:flex;align-items:center;justify-content:center;font-size:40px}
.pill{position:absolute;left:440px;right:90px;top:700px;height:120px;border-radius:60px;background:var(--ink);color:#F4E8D5;font-weight:800;font-size:46px;display:flex;align-items:center;justify-content:center;gap:16px}
.pill b{color:#F2A57F}
.host{position:absolute} .host img{position:absolute;left:0;top:0;width:100%;height:100%}
.foot{position:absolute;left:90px;right:90px;bottom:56px;display:flex;justify-content:space-between;font-weight:800;font-size:28px;color:rgba(43,36,32,.5)}
</style></head><body><div id="s">${clay.defs()}${slideHTML(spec, s, i, n, handle)}</div></body></html>`;
}

function browserPath() {
  const c = [process.env.CHROME_PATH, 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe', 'C:/Program Files/Microsoft/Edge/Application/msedge.exe',
    '/usr/bin/google-chrome', '/usr/bin/google-chrome-stable', '/usr/bin/chromium'].filter(Boolean);
  const f = c.find((p) => fs.existsSync(p)); if (!f) throw new Error('no Chrome or Edge found: set CHROME_PATH'); return f;
}

async function render(dir) {
  const spec = JSON.parse(fs.readFileSync(path.join(dir, 'carousel.json'), 'utf8'));
  const cfg = JSON.parse(fs.readFileSync(path.join(ROOT, 'config', 'agent.json'), 'utf8'));
  const b = await puppeteer.launch({ executablePath: browserPath(), headless: true, userDataDir: path.join(os.tmpdir(), 'claycar-' + process.pid), args: ['--no-first-run', '--no-sandbox', '--disable-dev-shm-usage'] });
  const page = await b.newPage(); await page.setViewport({ width: W, height: H });
  for (const f of fs.readdirSync(dir)) if (/^slide-\d+\.(jpg|png)$/.test(f)) fs.unlinkSync(path.join(dir, f));
  const n = spec.slides.length;
  for (const [i, s] of spec.slides.entries()) {
    await page.setContent(pageHTML(spec, s, i, n, cfg.handle), { waitUntil: 'load' });
    await page.evaluate(() => document.fonts.ready);
    await page.screenshot({ path: path.join(dir, `slide-${String(i + 1).padStart(2, '0')}.jpg`), type: 'jpeg', quality: 92, clip: { x: 0, y: 0, width: W, height: H } });
  }
  await b.close();
  console.log(`wrote ${n} clay slides in ${dir}`);
}

if (require.main === module) render(path.resolve(process.argv[2])).catch((e) => { console.error(e); process.exit(1); });
module.exports = { render };
