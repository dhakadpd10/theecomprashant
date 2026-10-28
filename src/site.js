// Builds the public GitHub Pages site into _site/:
//   /tools/          the free-tools page every keyword DM links to (#store, #launch, ...)
//   /media/posts/... reels, covers and carousel slides, at public URLs Instagram's API can fetch
//   /                a small home page
const fs = require('fs');
const path = require('path');
const { P, config, readText } = require('./util');

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const md = (s) => esc(s).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>').replace(/`([^`]+)`/g, '<code>$1</code>');

const CSS = `
:root { --bg:#F3EEE3; --surface:#FFFDF8; --ink:#15171D; --muted:#6A6458; --line:#DDD4C3; --signal:#F2B705; --signal-ink:#15171D; --good:#1F7A4D; --code:#EFE8DA;
  --display:"Archivo Black","Arial Black",Impact,sans-serif; --body:"Archivo","Helvetica Neue",Arial,sans-serif; --mono:"JetBrains Mono",ui-monospace,Consolas,monospace; color-scheme: light }
@media (prefers-color-scheme: dark) { :root { --bg:#11141B; --surface:#1A1F29; --ink:#EEF0F4; --muted:#9AA2B1; --line:#2C3442; --signal:#FFD23F; --good:#45D69B; --code:#222937; color-scheme: dark } }
* { box-sizing:border-box } html { -webkit-text-size-adjust:100% }
body { margin:0; background:var(--bg); color:var(--ink); font:400 16px/1.55 var(--body); padding:36px max(16px, env(safe-area-inset-right)) 64px max(16px, env(safe-area-inset-left)) }
.wrap { max-width:760px; margin:0 auto; display:grid; gap:28px } header { display:grid; gap:12px }
.sticker { justify-self:start; background:var(--signal); color:var(--signal-ink); font:400 13px/1 var(--display); letter-spacing:.08em; padding:8px 12px; border-radius:6px; transform:rotate(-1.5deg) }
h1 { font:400 clamp(34px,7vw,56px)/1.02 var(--display); margin:0; text-wrap:balance } .lede { margin:0; color:var(--muted); max-width:60ch; font-size:17px }
nav { display:flex; flex-wrap:wrap; gap:8px } nav a { font:700 13px/1 var(--body); letter-spacing:.06em; text-decoration:none; color:var(--ink); border:1.5px solid var(--ink); padding:8px 11px; border-radius:999px }
nav a:hover { background:var(--ink); color:var(--bg) } a:focus-visible, button:focus-visible, summary:focus-visible { outline:3px solid var(--signal); outline-offset:2px }
.tool { background:var(--surface); border:1px solid var(--line); border-radius:14px; padding:24px; display:grid; gap:12px; scroll-margin-top:16px; min-width:0 }
.tool:target { border-color:var(--signal); box-shadow:0 0 0 3px color-mix(in srgb, var(--signal) 45%, transparent) }
.head { display:flex; justify-content:space-between; align-items:center } .kw { background:var(--signal); color:var(--signal-ink); font:400 15px/1 var(--display); letter-spacing:.05em; padding:8px 12px; border-radius:8px }
.count { color:var(--muted); font:500 12px/1 var(--mono) } h2 { margin:0; font:400 26px/1.1 var(--display) } .how { margin:0; color:var(--muted); max-width:64ch }
code { font:500 .9em var(--mono); background:var(--code); padding:1px 5px; border-radius:4px } .actions { display:flex; flex-wrap:wrap; align-items:center; gap:12px }
.copy { font:700 16px/1 var(--body); background:var(--ink); color:var(--bg); border:0; border-radius:10px; padding:14px 18px; cursor:pointer } .done { color:var(--good); font-weight:600; font-size:14px }
details { border-top:1px solid var(--line); padding-top:10px } summary { cursor:pointer; font-weight:600; color:var(--muted) }
pre { white-space:pre-wrap; word-break:break-word; font:500 13px/1.6 var(--mono); background:var(--code); padding:16px; border-radius:10px; margin:12px 0 0; max-height:460px; overflow:auto }
h2 { font:400 24px/1.15 var(--display); margin:28px 0 8px } .legal { max-width:68ch } .legal ul, .legal ol { padding-left:22px } .legal li { margin:6px 0 } .legal a { color:inherit }
footer { color:var(--muted); font-size:13px; max-width:64ch } @media (prefers-reduced-motion:no-preference) { html { scroll-behavior:smooth } }`;

const page = (title, body) => `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${esc(title)}</title><link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Archivo+Black&family=Archivo:wght@400;600;700&family=JetBrains+Mono:wght@500&display=swap">
<style>${CSS}</style></head><body>${body}</body></html>\n`;

function toolsPage() {
  const cfg = config(); const entries = Object.entries(cfg.keywords).filter(([, v]) => fs.existsSync(P('tools', `${v.tool}.md`))).sort(([, a], [, b]) => !!a.retired - !!b.retired);
  const cards = entries.map(([kw, v], n) => {
    const raw = readText(P('tools', `${v.tool}.md`)).replace(/\r/g, ''); const parts = raw.split(/\n---\n/);
    const intro = parts[0].split('\n').filter((l) => l && !l.startsWith('# ')).join(' '); const prompt = parts.slice(1).join('\n---\n').trim();
    return `<article class="tool" id="${v.tool}"><div class="head"><span class="kw">${kw}</span><span class="count">${n + 1} / ${entries.length}</span></div>
<h2>${esc(v.title)}</h2><p class="how">${md(intro)}</p>
<div class="actions"><button type="button" class="copy" data-target="p-${v.tool}">Copy the prompt</button><span class="done" id="done-${v.tool}" role="status" aria-live="polite"></span></div>
<details><summary>Read the full prompt</summary><pre id="p-${v.tool}">${esc(prompt)}</pre></details></article>`;
  }).join('\n');
  return page('Free AI Money Prompts', `<div class="wrap"><header><span class="sticker">FREE · NO SIGN-UP</span><h1>Free AI Money Prompts</h1>
<p class="lede">Every tool from ${esc(cfg.handle)}'s posts, ready to paste into Claude. Tap the keyword you commented, copy the prompt, paste it into a new Claude chat, then answer its questions. The tools for online sellers from older posts are further down.</p>
<nav aria-label="Tools">${entries.map(([kw, v]) => `<a href="#${v.tool}">${kw}</a>`).join('')}</nav></header>
${cards}
<footer>These prompts run on your own Claude account and only use what you paste in. AI shoppers, critics and customers are a rehearsal: use them to find problems early, then check with real buyers and your real numbers.</footer></div>
<script>document.querySelectorAll('.copy').forEach((b)=>b.addEventListener('click',async()=>{const pre=document.getElementById(b.dataset.target),out=document.getElementById('done-'+b.dataset.target.slice(2));
try{await navigator.clipboard.writeText(pre.textContent);out.textContent='Copied. Paste it into Claude.'}catch(e){pre.closest('details').open=true;const r=document.createRange();r.selectNodeContents(pre);const s=getSelection();s.removeAllRanges();s.addRange(r);out.textContent='Selected. Press copy on your keyboard.'}}));</script>`);
}

function build(out = P('_site')) {
  const cfg = config();
  fs.rmSync(out, { recursive: true, force: true }); fs.mkdirSync(path.join(out, 'tools'), { recursive: true });
  fs.writeFileSync(path.join(out, 'tools', 'index.html'), toolsPage());
  fs.writeFileSync(path.join(out, 'index.html'), page(cfg.name, `<div class="wrap"><header><span class="sticker">OPEN-SOURCE INSTAGRAM AGENT</span><h1>${esc(cfg.name)}</h1>
<p class="lede">Real ways to make money with AI, posted daily on Instagram at ${esc(cfg.handle)}. The free tools from every post are on <a href="tools/">the tools page</a>.</p></header><footer><a href="privacy/">Privacy</a> · <a href="data-deletion/">Data deletion</a> · <a href="terms/">Terms</a></footer></div>`));
  const legal = require('./legal');
  for (const [dir, title, html] of [['privacy', 'Privacy Policy', legal.privacy(cfg.handle)], ['data-deletion', 'Data Deletion', legal.deletion(cfg.handle)], ['terms', 'Terms of Use', legal.terms(cfg.handle)]]) {
    fs.mkdirSync(path.join(out, dir), { recursive: true });
    fs.writeFileSync(path.join(out, dir, 'index.html'), page(`${title} · ${cfg.name}`, html));
  }
  fs.writeFileSync(path.join(out, '.nojekyll'), '');
  // media Instagram needs to fetch: reels, JPEG covers and JPEG slides
  let n = 0; const posts = P('content/posts');
  for (const id of fs.existsSync(posts) ? fs.readdirSync(posts) : []) {
    for (const f of fs.readdirSync(path.join(posts, id))) {
      if (!/^(reel\.mp4|cover\.jpg|slide-\d+\.jpg)$/.test(f)) continue;
      const dest = path.join(out, 'media', 'posts', id); fs.mkdirSync(dest, { recursive: true });
      fs.copyFileSync(path.join(posts, id, f), path.join(dest, f)); n++;
    }
  }
  console.log(`site built: tools page + ${n} media files in ${out}`);
}

module.exports = { build, toolsPage };
