// Checks every spec Claude writes before anything is rendered. Returns a list of problems (empty = OK).
const PROPS = ['question', 'tag', 'gift', 'glass', 'phone', 'heart', 'shades', 'gavel', 'cart', 'none'];
const MOODS = [undefined, 'neutral', 'happy', 'frown', 'angry'];
const SCENES = ['page', 'drop', 'grid', 'chat', 'lineup', 'versus', 'jury', 'list', 'verdict', 'stat', 'cta'];
const SLIDES = ['cover', 'stake', 'idea', 'recap', 'cta'];
const WORLDS = Object.keys(require('../engine/themes').WORLDS);
const words = (s = '') => s.trim().split(/\s+/).filter(Boolean).length;
const isTime = (v) => v === undefined || typeof v === 'number' || /^@line\d+([+-][\d.]+)?$/.test(v);

function castErrors(cast, e) {
  if (!Array.isArray(cast) || !cast.length || cast.length > 16) e.push('cast must have 1 to 16 characters');
  (cast || []).forEach((c, i) => {
    if (!c.name) e.push(`cast[${i}] needs a name`);
    if (!/^#[0-9a-fA-F]{6}$/.test(c.col || '')) e.push(`cast[${i}].col must be a hex colour like #7DD3C0`);
    if (!PROPS.includes(c.prop)) e.push(`cast[${i}].prop must be one of ${PROPS.join(' ')}`);
  });
}
const idOk = (cast, i) => Number.isInteger(i) && i >= 0 && i < cast.length;

function validateReel(p, { keywords } = {}) {
  const e = [];
  if (!p.id || !/^[a-z0-9-]+$/.test(p.id)) e.push('id must be lowercase-with-dashes');
  if (!p.keyword || !/^[A-Z]+$/.test(p.keyword)) e.push('keyword must be one uppercase word');
  if (keywords && !keywords.includes(p.keyword)) e.push(`keyword ${p.keyword} has no free tool`);
  if (p.world !== undefined && !WORLDS.includes(p.world)) e.push(`world must be one of ${WORLDS.join(' ')}`);
  castErrors(p.cast, e);
  const cast = p.cast || [];
  if (!Array.isArray(p.lines) || p.lines.length < 6 || p.lines.length > 12) e.push('lines must have 6 to 12 entries');
  (p.lines || []).forEach((l, i) => {
    if (!l.say) e.push(`lines[${i}] needs "say"`);
    if (words(l.say) > 16) e.push(`lines[${i}].say is ${words(l.say)} words; keep it to 16 or fewer`);
    if (/^\s*claude\b(?!\s+can\b)/i.test(l.say || '')) e.push(`lines[${i}].say starts with "Claude"; the voice mispronounces it at the start, reword`);
    if (/\d/.test(l.say || '')) e.push(`lines[${i}].say has digits; spell numbers as words in "say" and put digits in "show"`);
    if (l.card && (l.card.length > 30 || words(l.card) > 6)) e.push(`lines[${i}].card must be 6 words / 30 characters max`);
    if (i === 0 && (!l.scene || !l.card)) e.push('the first line needs a scene and a card');
    const s = l.scene; if (!s) return;
    if (!SCENES.includes(s.type)) { e.push(`lines[${i}].scene.type must be one of ${SCENES.join(' ')}`); return; }
    for (const k of ['whoAt', 'fixAt', 'voteAt', 'tally', 'gap']) if (!isTime(s[k])) e.push(`lines[${i}].scene.${k} must be seconds or "@lineN+x"`);
    const ids = (a) => (a || []).forEach((x) => { if (!idOk(cast, x)) e.push(`lines[${i}] refers to cast index ${x}, which doesn't exist`); });
    if (s.ids) ids(s.ids);
    if (s.who !== undefined) ids([s.who]);
    if (s.type === 'chat' && !s.text) e.push(`lines[${i}] chat scene needs "text"`);
    if (s.type === 'lineup') { if (!Array.isArray(s.rows)) e.push(`lines[${i}] lineup needs rows`); (s.rows || []).forEach(ids); ids(s.reveal); ids(s.shown); }
    if (s.type === 'versus') for (const side of ['left', 'right']) { const v = s[side]; if (!v || !idOk(cast, v.who) || !v.tag || !Array.isArray(v.say)) e.push(`lines[${i}] versus.${side} needs who, tag and say [lines]`); }
    if (s.type === 'jury') { if (!s.ids) e.push(`lines[${i}] jury needs ids`); if (s.votes && s.votes.length !== (s.ids || []).length) e.push(`lines[${i}] jury votes must match ids`); }
    if (s.type === 'list' && (!s.title || !Array.isArray(s.items) || s.items.length < 2 || s.items.length > 5)) e.push(`lines[${i}] list needs a title and 2 to 5 items`);
    if (s.type === 'list') (s.items || []).forEach((it) => { if (it.length > 34) e.push(`lines[${i}] list item "${it}" is too long (34 characters max)`); });
    if (s.type === 'verdict' && (!idOk(cast, s.who) || !s.stamp || s.stamp.length > 16)) e.push(`lines[${i}] verdict needs who and a stamp of 16 characters max`);
    if (s.type === 'stat' && !s.big) e.push(`lines[${i}] stat needs "big"`);
    if (s.type === 'page') (s.pins || []).forEach((pn) => { if (typeof pn.x !== 'number' || typeof pn.y !== 'number') e.push(`lines[${i}] pins need numeric x and y`); if ((pn.label || '').length > 14) e.push(`lines[${i}] pin label "${pn.label}" too long (14 max)`); });
    for (const m of [s.mood, s.left?.mood, s.right?.mood]) if (!MOODS.includes(m)) e.push(`lines[${i}] mood must be one of neutral happy frown angry`);
  });
  const last = (p.lines || []).at(-1);
  if (last && (!last.scene || last.scene.type !== 'cta')) e.push('the last line must be a cta scene');
  if (last && !new RegExp(`\\b${p.keyword}\\b`).test(last.say || '')) e.push(`the last line must say the keyword ${p.keyword}`);
  if (!p.cover || !Array.isArray(p.cover.title) || p.cover.title.length !== 2 || !Number.isInteger(p.cover.line) || p.cover.line >= (p.lines || []).length || !(p.lines[p.cover.line] || {}).scene) e.push('cover needs title [2 lines] and line = index of a line that starts a scene');
  return e;
}

// ---------- motion reels (docs/MOTION.md) ----------
const FX = ['pop', 'thud', 'click', 'bloop', 'buzz', 'ding', 'whoosh'];
const isAt = (v, n) => typeof v === 'number' || v === 'end' || (/^@line(\d+)(\.(voice|end))?([+-][\d.]+)?$/.test(v || '') && Number(v.match(/^@line(\d+)/)[1]) < n);

function validateMotionReel(p, { keywords } = {}) {
  const e = [];
  if (!p.id || !/^[a-z0-9-]+$/.test(p.id)) e.push('id must be lowercase-with-dashes');
  if (p.style !== 'motion') e.push('style must be "motion"');
  if (!p.keyword || !/^[A-Z]+$/.test(p.keyword)) e.push('keyword must be one uppercase word');
  if (keywords && !keywords.includes(p.keyword)) e.push(`keyword ${p.keyword} has no free tool`);
  if (!WORLDS.includes(p.world)) e.push(`world (the fallback look) must be one of ${WORLDS.join(' ')}`);
  for (const k of ['bg', 'ink', 'accent']) if (p.palette && p.palette[k] !== undefined && !/^#[0-9a-fA-F]{6}$/.test(p.palette[k])) e.push(`palette.${k} must be a hex colour like #FFC857`);
  const n = (p.lines || []).length;
  if (!Array.isArray(p.lines) || n < 6 || n > 12) e.push('lines must have 6 to 12 entries');
  (p.lines || []).forEach((l, i) => {
    if (!l.say) e.push(`lines[${i}] needs "say"`);
    if (words(l.say) > 16) e.push(`lines[${i}].say is ${words(l.say)} words; keep it to 16 or fewer`);
    if (/^\s*claude\b(?!\s+can\b)/i.test(l.say || '')) e.push(`lines[${i}].say starts with "Claude"; the voice mispronounces it at the start, reword`);
    if (/\d/.test(l.say || '')) e.push(`lines[${i}].say has digits; spell numbers as words in "say" and put digits in "show"`);
    if (l.show && words(l.show) > 12) e.push(`lines[${i}].show is ${words(l.show)} words; captions are 4 to 9 words`);
  });
  if (n && (p.lines || []).filter((l) => l.cut).length < 3) e.push('mark at least 3 lines with "cut": true (new beats)');
  const last = (p.lines || []).at(-1);
  if (last && !new RegExp(`\\b${p.keyword}\\b`).test(last.say || '')) e.push(`the last line must say the keyword ${p.keyword}`);
  (p.sfx || []).forEach((s, i) => { if (!FX.includes(s.fx)) e.push(`sfx[${i}].fx must be one of ${FX.join(' ')}`); if (!isAt(s.at, n)) e.push(`sfx[${i}].at must be seconds or "@lineN", "@lineN.voice+0.3" with N under ${n}`); });
  if (!p.cover || !Array.isArray(p.cover.title) || p.cover.title.length !== 2 || p.cover.title.some((t) => words(t) > 6) || !isAt(p.cover.at, n)) e.push('cover needs at ("@lineN+x") and title [2 lines of 6 words max]');
  return e;
}

/** Static checks on scene.html + scene.js before HyperFrames sees them. */
function validateScene(html, js) {
  const e = [];
  if (!html || !js) return ['reply with two fenced blocks: ```html (scene.html) then ```js (scene.js)'];
  if (html.length + js.length > 80000) e.push('scene is too big: keep html + js under 80 KB');
  if (/<script/i.test(html)) e.push('no <script> in scene.html; all animation goes in scene.js');
  if (/https?:\/\//i.test(html + js)) e.push('no http links anywhere: draw with CSS or inline SVG, use the house fonts');
  if (/<img|url\(/i.test(html)) e.push('no images or url(): draw with CSS gradients or inline SVG');
  if (!/data-from="/.test(html)) e.push('time each beat with <section data-from="@lineN" data-to="@lineM">');
  for (const [re, why] of [[/\bDate\b|performance\.now/, 'Date / performance.now'], [/Math\.random/, 'Math.random (use T.rand(seed))'], [/setTimeout|setInterval|requestAnimationFrame/, 'timers'], [/\bfetch\s*\(|XMLHttpRequest|import\s*\(/, 'network calls'], [/__timelines|gsap\.timeline|\.play\s*\(/, 'creating, registering or playing timelines (use the tl you are given)'], [/repeat\s*:\s*-1/, 'repeat: -1'], [/addEventListener|\bon(click|scroll|load)\b/, 'event listeners'], [/autoAlpha|visibility|display\s*:/, 'tweening autoAlpha, visibility or display']]) if (re.test(js)) e.push(`scene.js must not use ${why}`);
  const ids = new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]));
  for (const m of js.matchAll(/['"`]#([A-Za-z][\w-]*)(?!\$\{)/g)) if (!ids.has(m[1]) && !/^[0-9a-f]{3,8}$/i.test(m[1])) e.push(`scene.js animates #${m[1]}, which is not in scene.html`);
  const dup = [...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]).filter((id, i, a) => a.indexOf(id) !== i);
  if (dup.length) e.push(`duplicate ids: ${[...new Set(dup)].join(', ')}`);
  return [...new Set(e)];
}

function validateCarousel(c, { keywords } = {}) {
  const e = [];
  if (!c.id || !/^[a-z0-9-]+$/.test(c.id)) e.push('id must be lowercase-with-dashes');
  if (keywords && !keywords.includes(c.keyword)) e.push(`keyword ${c.keyword} has no free tool`);
  castErrors(c.cast, e);
  const s = c.slides || [];
  if (s.length < 6 || s.length > 10) e.push('carousel needs 6 to 10 slides');
  if (s[0]?.type !== 'cover') e.push('slide 1 must be the cover');
  if (s.at(-1)?.type !== 'cta') e.push('the last slide must be the cta');
  if (!s.some((x) => x.type === 'recap')) e.push('include a recap slide before the cta');
  s.forEach((x, i) => {
    if (!SLIDES.includes(x.type)) e.push(`slides[${i}].type must be one of ${SLIDES.join(' ')}`);
    if (x.type === 'cover' && (!Array.isArray(x.title) || x.title.some((t) => words(t) > 6))) e.push('cover title must be 1-2 lines of 6 words max');
    if (x.type === 'idea' && (!x.title || words(x.body) > 28)) e.push(`slides[${i}] idea needs a title and a body of 28 words max`);
    if (x.type === 'recap' && (!Array.isArray(x.items) || x.items.length < 3 || x.items.length > 7)) e.push(`slides[${i}] recap needs 3 to 7 items`);
    (x.art?.cast || []).forEach((a) => { if (!idOk(c.cast || [], a.who)) e.push(`slides[${i}] art refers to cast index ${a.who}, which doesn't exist`); if (!MOODS.includes(a.mood)) e.push(`slides[${i}] bad mood`); });
  });
  return e;
}

function validateCaption(text, keyword) {
  const e = [];
  if (!text || text.length > 2200) e.push('caption must be 1 to 2200 characters');
  if (text.split('\n')[0].length > 125) e.push('first line must be 125 characters or fewer');
  if (!new RegExp(`"?${keyword}"?`).test(text)) e.push(`caption must ask people to comment "${keyword}"`);
  if (/—/.test(text)) e.push('no em dashes');
  const tags = (text.match(/#\w+/g) || []).length; if (tags > 5) e.push('use 3 hashtags');
  return e;
}

module.exports = { WORLDS, validateReel, validateMotionReel, validateScene, validateCarousel, validateCaption, SCENES, PROPS };
