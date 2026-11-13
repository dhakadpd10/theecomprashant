// Draws the clay host layers once and saves them as transparent PNGs in character/clay/png/.
//   node character/clay/build.js            all layers
//   node character/clay/build.js --test     one full-body still per pose, for checking the look (test-*.png)
// Windows uses Edge with the GPU (run from PowerShell); servers use Chrome with SwiftShader.
const http = require('http'), fs = require('fs'), path = require('path'), os = require('os');
const puppeteer = require('puppeteer-core');

const ROOT = path.join(__dirname, '..', '..'), MODS = path.join(ROOT, 'node_modules'), OUT = path.join(__dirname, 'png');
const TYPES = { '.js': 'text/javascript', '.mjs': 'text/javascript', '.html': 'text/html' };
const POSES = ['idle', 'point', 'explain', 'thumbs', 'shrug', 'think', 'phone', 'wave', 'cooker'];
const MOODS = ['normal', 'happy', 'smug', 'shock', 'worried', 'think'];
const MOUTHS = { closed: 0, talk: 0.45, open: 0.85 };

function browser() {
  const c = [process.env.CHROME_PATH, 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe', 'C:/Program Files/Microsoft/Edge/Application/msedge.exe',
    '/usr/bin/google-chrome', '/usr/bin/google-chrome-stable', '/usr/bin/chromium'].filter(Boolean);
  const exe = c.find((p) => fs.existsSync(p)); if (!exe) throw new Error('no Chrome or Edge found');
  const gpu = process.platform === 'win32' && !process.env.RENDER_SOFTWARE;
  return puppeteer.launch({ executablePath: exe, headless: true, userDataDir: path.join(os.tmpdir(), 'clay-' + process.pid),
    args: [...(gpu ? ['--use-angle=d3d11', '--enable-gpu', '--ignore-gpu-blocklist'] : ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--no-sandbox']), '--no-first-run'] });
}

(async () => {
  const test = process.argv.includes('--test');
  const srv = http.createServer((q, r) => {
    const u = decodeURIComponent(q.url.split('?')[0]); let f = null;
    if (u === '/page.html') f = path.join(__dirname, 'page.html');
    else if (u.startsWith('/story/')) f = path.join(ROOT, 'story', u.slice(7));
    else if (u.startsWith('/node_modules/')) f = path.join(MODS, u.slice(14));
    if (!f || !fs.existsSync(f) || fs.statSync(f).isDirectory()) { r.writeHead(404); return r.end(); }
    r.writeHead(200, { 'Content-Type': TYPES[path.extname(f)] || 'application/octet-stream' }); fs.createReadStream(f).pipe(r);
  });
  await new Promise((res) => srv.listen(0, '127.0.0.1', res));
  const b = await browser(); const page = await b.newPage();
  await page.setViewport({ width: 520, height: 760, deviceScaleFactor: 1 });
  page.on('pageerror', (e) => console.log('PAGE ERROR:', e.message));
  await page.goto(`http://127.0.0.1:${srv.address().port}/page.html`);
  await page.waitForFunction('window.ready === true', { timeout: 120000 });
  fs.mkdirSync(OUT, { recursive: true });
  const shot = async (name, o) => { await page.evaluate((x) => window.draw(x), o); await page.screenshot({ path: path.join(OUT, name), omitBackground: true }); process.stdout.write('.'); };
  if (test) {
    for (const [i, pose] of POSES.entries()) await shot(`test-${pose}.png`, { part: 'full', pose, mood: MOODS[i % MOODS.length], mouth: i % 3 ? 0 : 0.45 });
  } else {
    for (const pose of POSES) await shot(`body-${pose}.png`, { part: 'body', pose });
    for (const mood of MOODS) for (const [m, v] of Object.entries(MOUTHS)) await shot(`head-${mood}-${m}.png`, { part: 'head', mood, mouth: v });
    for (const mood of MOODS) await shot(`head-${mood}-blink.png`, { part: 'head', mood, blink: 1 });
  }
  await b.close(); srv.close(); console.log('\nwrote', OUT);
})().catch((e) => { console.error(e); process.exit(1); });
