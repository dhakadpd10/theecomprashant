// Weekly run: learn from last week -> research -> plan 14 posts -> write -> render -> queue for approval.
// node src/cli.js plan [--start 2026-10-19] [--days 7]
const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');
const { P, readJSON, writeJSON, readText, config, log, localDay, addDays, isoWeek, python } = require('./util');
const { ask, askJSON, WEB_SEARCH } = require('./claude');
const { validateReel, validateCarousel, validateCaption, WORLDS } = require('./validate');
const { WORLD_NOTES } = require('../engine/themes');

const brand = () => [
  '# Voice\n' + readText(P('brand/voice.md')),
  '# Pillars and topic bank\n' + readText(P('brand/pillars.md')),
  '# What the numbers said (newest first)\n' + readText(P('brand/learnings.md')),
].join('\n\n');

const SYSTEM = () => `You are Theecomprashant, the content agent for an Instagram page about practical AI for D2C and ecommerce brands, run by Prashant (an Indian D2C founder). You write reels and carousels in a fixed house format and you never invent results, clients or revenue. Example numbers must be labelled as examples. Every post gives away a real free tool reached by commenting one keyword.

${brand()}`;

function recentTopics(weeks = 4) {
  const dir = P('content/queue'); if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).sort().slice(-weeks).flatMap((w) => (readJSON(path.join(dir, w, 'plan.json'), { slots: [] }).slots || []).map((s) => `${s.format}: ${s.topic || s.post}`));
}
function nextMonday(from = localDay()) { let d = from; do d = addDays(d, 1); while (new Date(`${d}T00:00:00Z`).getUTCDay() !== 1); return d; }

// ---------- 1. learn ----------
async function learn() {
  const logCsv = readText(P('content/analytics/log.csv'));
  if (logCsv.split('\n').filter(Boolean).length < 3) { log('no analytics yet, skipping the weekly learning step'); return; }
  const { text } = await ask({
    system: SYSTEM(), effort: 'high',
    prompt: `Here is the per-post metrics log (latest snapshot per post counts):\n\n${logCsv.slice(-20000)}\n\nWrite this week's entry for learnings.md: a "## Week of ${localDay()}" heading, then 3 to 5 bullet points: what over-performed and why you think so, what to stop, and one experiment for next week. Use views, saves, shares, comments and keyword comments; say plainly when a sample is too small to conclude anything. Markdown only, no preamble.`,
  });
  const f = P('brand/learnings.md'); const old = readText(f);
  const [head, ...rest] = old.split('\n## ');
  fs.writeFileSync(f, `${head.trim()}\n\n${text.trim()}\n\n## ${rest.join('\n## ')}`.replace(/\n## $/, '\n'));
  log('learnings updated');
}

// ---------- 2. research ----------
async function research() {
  const { text } = await ask({
    system: SYSTEM(), effort: 'medium', tools: [WEB_SEARCH], maxTokens: 16000,
    prompt: `Search the web for what changed in the last 14 days that a small D2C or Shopify brand owner could use: new AI features or tools (Claude, ChatGPT, Gemini, Meta Ads, Shopify, WhatsApp Business, Instagram), festival or sale dates coming up in India, and ecommerce problems people are discussing. Return 6 to 10 short bullets, each with what it is, why a D2C owner should care, and a source link. Skip pure model news with no practical use.`,
  });
  return text;
}

// ---------- 3. plan ----------
async function planWeek(start, days, researchNotes) {
  const cfg = config(); const kws = Object.keys(cfg.keywords);
  const validate = (v) => {
    const e = []; if (!Array.isArray(v.days) || v.days.length !== days) e.push(`days must have exactly ${days} entries`);
    (v.days || []).forEach((d, i) => {
      if (!d.keyword || !/^[A-Z]+$/.test(d.keyword)) e.push(`days[${i}].keyword must be one uppercase word`);
      if (!kws.includes(d.keyword) && !d.new_tool) e.push(`days[${i}] uses ${d.keyword} which has no free tool: pick one of ${kws.join(', ')} or add new_tool {title, what}`);
      for (const k of ['reel', 'carousel']) if (!d[k]?.topic || !d[k]?.slug || !/^[a-z0-9-]+$/.test(d[k].slug)) e.push(`days[${i}].${k} needs topic and a lowercase-dash slug`);
      if (!WORLDS.includes(d.reel?.world)) e.push(`days[${i}].reel.world must be one of ${WORLDS.join(', ')}`);
    });
    const used = (v.days || []).map((d) => d.reel?.world); if (new Set(used).size !== used.length) e.push('every reel this week needs a different world');
    return e;
  };
  return askJSON({
    system: SYSTEM(), effort: 'high', validate,
    prompt: `Plan ${days} days of posts starting ${start}. Each day has a 13:00 carousel and a 19:30 reel that share ONE keyword, so both lead to the same free tool.

Free tools that already exist (keyword: title): ${kws.map((k) => `${k}: ${cfg.keywords[k].title}`).join('; ')}.
You may introduce at most 2 new tools this week (give new_tool {title, what}); otherwise reuse existing ones from a fresh angle.
Do not repeat any of these recent topics: ${recentTopics().join(' | ') || 'none'}.
Research notes from this week:\n${researchNotes || 'none'}

Each reel gets its own visual world, chosen to fit the topic, all 7 different (worlds: ${WORLDS.map((w) => `${w} = ${WORLD_NOTES[w]}`).join('; ')}).

Rules: reels are one idea with a mechanism (panels of AI critics/shoppers/customers judging the viewer's thing work best); carousels are list- or step-shaped and screenshot-worthy. Follow the pillar mix. Reply with JSON only:
{"days":[{"keyword":"STORE","pillar":"Sell more","reel":{"slug":"...","topic":"...","angle":"...","world":"courtroom"},"carousel":{"slug":"...","topic":"...","angle":"..."},"new_tool":null}]}`,
  });
}

// ---------- 4. write + render ----------
const SCENES_DOC = () => readText(P('docs/SCENES.md'));
const example = (id, file) => readText(P('content/posts', id, file));

async function writeTool(keyword, nt) {
  const id = keyword.toLowerCase();
  const { text } = await ask({
    system: SYSTEM(), effort: 'high',
    prompt: `Write the free tool "${nt.title}" (${nt.what}) as a Markdown file in exactly this shape: a "# Title" line, one short paragraph telling the reader what to paste and where, a line with only "---", then the full prompt they paste into Claude. The prompt must be safe, honest (never invent facts; mark unknowns as [CHECK: ...]) and genuinely useful for a D2C store owner. Model it on this example:\n\n${readText(P('tools/store.md'))}\n\nReturn the Markdown only.`,
  });
  fs.writeFileSync(P('tools', `${id}.md`), text.trim() + '\n');
  const cfgFile = P('config/agent.json'); const cfg = readJSON(cfgFile);
  cfg.keywords[keyword] = { tool: id, title: nt.title }; writeJSON(cfgFile, cfg);
  log('new free tool', keyword, nt.title);
}

function render(kind, dir) {
  const script = kind === 'reel' ? 'engine/make.js' : 'engine/carousel.js';
  const r = spawnSync('node', [P(script), dir], { cwd: P(), encoding: 'utf8', maxBuffer: 1 << 26 });
  const out = (r.stdout || '') + (r.stderr || '');
  if (r.status !== 0) throw new Error(`${script} failed:\n${out.slice(-2000)}`);
  return out;
}
function lintCaption(file) {
  const [py, pre] = python(); const out = {};
  const a = spawnSync(py, [...pre, P('skills/ig-caption/caption.py'), file], { encoding: 'utf8' });
  const b = spawnSync(py, [...pre, P('skills/ig-human/detect.py'), file], { encoding: 'utf8' });
  out.verdict = ((a.stdout || '').match(/VERDICT\s+(\w+)/) || [])[1] || 'UNKNOWN';
  out.human = Number(((b.stdout || '').match(/HUMAN SCORE[^\d]*([\d.]+)/) || [])[1] || 0);
  out.notes = ((a.stdout || '').match(/WARN.*|FAIL.*/g) || []).join('\n');
  return out;
}

async function writeCaption(dir, kind, spec) {
  const kw = spec.keyword, tool = config().keywords[kw].title;
  let caption = (await ask({ system: SYSTEM(), effort: 'high', prompt: `Write the Instagram caption for this ${kind} (keyword ${kw}, free tool "${tool}"). Follow the caption rules in this guide exactly:\n\n${SCENES_DOC().split('## Caption')[1]}\n\nModel caption:\n${example(kind === 'reel' ? '02-launch-trial' : 'c01-leaky-page', 'caption.txt')}\n\nThe ${kind}:\n${JSON.stringify(spec)}\n\nReturn the caption text only.` })).text.trim();
  const f = path.join(dir, 'caption.txt');
  for (let i = 0; i < 2; i++) {
    const errs = validateCaption(caption, kw); fs.writeFileSync(f, caption + '\n');
    const lint = lintCaption(f);
    if (!errs.length && lint.verdict !== 'FAIL' && lint.human >= 70) break;
    caption = (await ask({ system: SYSTEM(), effort: 'medium', prompt: `Revise this caption. Problems: ${[...errs, lint.notes, lint.human < 70 ? `it reads machine-written (human score ${lint.human}/100): use contractions, "you", varied sentence lengths, concrete numbers` : ''].filter(Boolean).join('; ')}.\n\n${caption}\n\nReturn the caption only.` })).text.trim();
  }
  fs.writeFileSync(f, caption + '\n');
}

async function makeReel(day, d) {
  const cfg = config(); const id = `${day}-reel-${d.reel.slug}`.slice(0, 60).replace(/-+$/, ''); const dir = P('content/posts', id);
  const spec = await askJSON({
    system: SYSTEM(), effort: 'high', validate: (v) => validateReel(v, { keywords: Object.keys(cfg.keywords) }),
    prompt: `Write the reel spec (post.json) for: ${d.reel.topic}. Angle: ${d.reel.angle}. Keyword ${d.keyword} (free tool: ${cfg.keywords[d.keyword].title}). id must be "${id}", world "${d.reel.world}" (${WORLD_NOTES[d.reel.world]}), voice "${cfg.voice.id}", speed ${cfg.voice.speed}. 20 to 30 seconds spoken (about 60 to 80 words). Two-line hook first.\n\nHow specs work:\n${SCENES_DOC()}\n\nA finished example that rendered well:\n${example('02-launch-trial', 'post.json')}\n\nReturn post.json only.`,
  });
  fs.mkdirSync(dir, { recursive: true }); writeJSON(path.join(dir, 'post.json'), spec);
  let out = render('reel', dir);
  const bad = (out.match(/CHECK THESE WORDS: (.*)/) || [])[1];
  if (bad) { // the voice check flagged words: reword those lines once and re-record
    const fixed = await askJSON({ system: SYSTEM(), effort: 'medium', validate: (v) => validateReel(v, { keywords: Object.keys(cfg.keywords) }), prompt: `Speech-to-text could not hear these words clearly in the voiceover: ${bad}. Reword only the "say" text of the lines containing them (simpler, common words; keep meaning and timing), then return the full post.json.\n\n${JSON.stringify(spec)}` });
    writeJSON(path.join(dir, 'post.json'), fixed); out = render('reel', dir);
  }
  await writeCaption(dir, 'reel', spec);
  return { id, out };
}

async function makeCarousel(day, d) {
  const cfg = config(); const id = `${day}-carousel-${d.carousel.slug}`.slice(0, 60).replace(/-+$/, ''); const dir = P('content/posts', id);
  const spec = await askJSON({
    system: SYSTEM(), effort: 'high', validate: (v) => validateCarousel(v, { keywords: Object.keys(cfg.keywords) }),
    prompt: `Write the carousel spec (carousel.json) for: ${d.carousel.topic}. Angle: ${d.carousel.angle}. Keyword ${d.keyword} (free tool: ${cfg.keywords[d.keyword].title}). id must be "${id}". 8 to 10 slides.\n\nHow specs work:\n${SCENES_DOC()}\n\nA finished example:\n${example('c01-leaky-page', 'carousel.json')}\n\nReturn carousel.json only.`,
  });
  fs.mkdirSync(dir, { recursive: true }); writeJSON(path.join(dir, 'carousel.json'), spec);
  render('carousel', dir);
  await writeCaption(dir, 'carousel', spec);
  return { id };
}

// ---------- run ----------
async function run({ start, days = 7 } = {}) {
  const cfg = config();
  const launch = readJSON(P('content/queue/launch-week/plan.json'), null);
  if (launch && !launch.start) { log('launch week has no dates yet: run the Launch workflow first'); return { skipped: true }; }
  if (!start && launch?.start) { const end = addDays(launch.start, 6); start = nextMonday(end > localDay() ? end : localDay()); }
  start = start || nextMonday();
  const week = isoWeek(start); const qdir = P('content/queue', week);
  if (fs.existsSync(path.join(qdir, 'plan.json'))) { log(`${week} already planned`); return { week, skipped: true }; }
  await learn();
  const notes = await research().catch((e) => { log('research skipped:', e.message); return ''; });
  const plan = await planWeek(start, days, notes);
  for (const d of plan.days) if (d.new_tool && !cfg.keywords[d.keyword]) await writeTool(d.keyword, d.new_tool);

  const slots = []; const problems = [];
  for (let i = 0; i < plan.days.length; i++) {
    const d = plan.days[i], day = addDays(start, i);
    for (const slot of config().slots) {
      const kind = slot.format;
      try {
        const made = kind === 'reel' ? await makeReel(day, d) : await makeCarousel(day, d);
        slots.push({ day, time: slot.time, format: kind, post: made.id, keyword: d.keyword, pillar: d.pillar, topic: d[kind].topic, status: 'made' });
        log('made', made.id);
      } catch (e) { problems.push(`${day} ${kind}: ${e.message.split('\n')[0]}`); log('FAILED', day, kind, e.message); }
    }
  }
  writeJSON(path.join(qdir, 'plan.json'), { week, start, research: notes, slots });
  fs.writeFileSync(path.join(qdir, 'problems.txt'), problems.join('\n'));
  log(`planned ${week}: ${slots.length} posts made, ${problems.length} failed`);
  return { week, slots, problems };
}

module.exports = { run, nextMonday };
