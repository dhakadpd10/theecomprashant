// Weekly run: learn from last week -> research -> plan every empty slot -> write -> render -> queue for approval.
// Slots come from config (slots, or a slot_overrides period such as "October: reels only"); slots another queue already fills are skipped.
// node src/cli.js plan [--start 2026-10-19] [--days 7]
const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');
const { P, readJSON, writeJSON, readText, config, log, localDay, addDays, isoWeek, slotsFor, slotDate, python } = require('./util');
const { ask, askJSON } = require('./claude');
const { validateReel, validateMotionReel, validateScene, validateCarousel, validateCaption, WORLDS } = require('./validate');
const { WORLD_NOTES } = require('../engine/themes');

const brand = () => [
  '# Voice\n' + readText(P('brand/voice.md')),
  '# Pillars and topic bank\n' + readText(P('brand/pillars.md')),
  '# This week\'s strategy (from the weekly audit; it outranks the defaults)\n' + readText(P('brand/strategy.md'), 'No strategy yet: not enough posts to judge.'),
  '# What the numbers said (newest first)\n' + readText(P('brand/learnings.md')),
].join('\n\n');

// ---------- the Instagram skill pack (skills/ig-*): the method docs, and the scripts that actually score things ----------
// The skills were written for a person chatting with Claude. Here they run unattended, so their "ask the user" and
// "~/.claude/instagram/*" steps are replaced by this repo's files (brand/*, content/analytics, content/queue).
const skill = (name) => readText(P('skills', name, 'SKILL.md')).replace(/^---[\s\S]*?---\s*/, '').trim();
const UNATTENDED = 'You are running unattended inside an automated pipeline: never ask questions and never read or write ~/.claude files. The repo files quoted here replace the voice, swipe and log files the method mentions.';
const HOOKS = () => readJSON(P('skills/ig-reel/hooks.json'));
function pyJSON(script, input) { // run one of the skill scripts on some text, read its --json output (null if Python is missing)
  const f = path.join(require('os').tmpdir(), `ig-${process.pid}-${Date.now()}.txt`); fs.writeFileSync(f, input);
  const [py, pre] = python(); const r = spawnSync(py, [...pre, P(script), f, '--json'], { encoding: 'utf8' }); fs.rmSync(f, { force: true });
  try { return JSON.parse(r.stdout); } catch { return null; }
}

const SYSTEM = () => `You are Theecomprashant, the content agent for an Instagram page about practical AI for D2C and ecommerce brands, run by Prashant (an Indian D2C founder). You write reels and carousels in a fixed house format and you never invent results, clients or revenue. Example numbers must be labelled as examples. Every post gives away a real free tool reached by commenting one keyword.

${brand()}`;

function recentTopics(weeks = 4) {
  const dir = P('content/queue'); if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).sort().slice(-weeks).flatMap((w) => (readJSON(path.join(dir, w, 'plan.json'), { slots: [] }).slots || []).map((s) => `${s.format}: ${s.topic || s.post}`));
}
function nextMonday(from = localDay()) { let d = from; do d = addDays(d, 1); while (new Date(`${d}T00:00:00Z`).getUTCDay() !== 1); return d; }

// ---------- 1. learn: the ig-audit method on our own numbers -> learnings.md, strategy.md, a weekly report ----------
function postStats() {
  const lines = readText(P('content/analytics/log.csv')).trim().split('\n'); const cols = (lines.shift() || '').split(',');
  const latest = {}; // last snapshot per post
  for (const l of lines) { const r = Object.fromEntries(l.split(',').map((v, i) => [cols[i], v])); if (r.post) latest[r.post] = r; }
  const slot = {}; const qroot = P('content/queue');
  if (fs.existsSync(qroot)) for (const w of fs.readdirSync(qroot)) for (const s of readJSON(path.join(qroot, w, 'plan.json'), { slots: [] }).slots) slot[s.post] = s;
  const num = (v) => Number(v) || 0;
  const rows = Object.values(latest).map((r) => {
    const s = slot[r.post] || {}, reach = num(r.reach);
    return { post: r.post, format: r.format, keyword: r.keyword, pillar: r.pillar, style: s.style || '', hook: s.hook ? `#${s.hook.id} ${s.hook.name}` : '', published: (r.published_at || '').slice(0, 16),
      views: num(r.views), reach, likes: num(r.likes), comments: num(r.comments), saves: num(r.saved), shares: num(r.shares),
      shares_per_1k_reach: reach ? +(1000 * num(r.shares) / reach).toFixed(1) : 0, saves_per_1k_reach: reach ? +(1000 * num(r.saved) / reach).toFixed(1) : 0 };
  });
  const v = rows.map((r) => r.views).sort((a, b) => a - b), median = v.length ? v[Math.floor(v.length / 2)] || 1 : 1;
  for (const r of rows) r.outlier = +(r.views / median).toFixed(2);
  return { rows: rows.sort((a, b) => b.outlier - a.outlier), median };
}

async function learn() {
  const { rows, median } = postStats();
  if (rows.length < 3) { log(`only ${rows.length} posts with numbers yet, skipping the weekly audit`); return null; }
  const res = await askJSON({
    system: SYSTEM(), effort: 'high',
    validate: (x) => (typeof x.learnings === 'string' && /^## Week of /.test(x.learnings.trim()) && typeof x.strategy === 'string' && x.strategy.length > 200 && typeof x.summary === 'string' ? [] : ['return {"summary":"...","learnings":"## Week of ...","strategy":"..."}']),
    prompt: `${UNATTENDED}

Run this audit method on the page's own numbers:
${skill('ig-audit')}

Instagram's API does not give hold-at-3s, watch time, follows or non-follower reach per post, so rank by outlier multiple (views / the page's median of ${median}) and shares and saves per 1,000 reach, and say which conclusions need those missing numbers. Each row has the hook formula and reel style used.

Posts (latest numbers, best first):
${JSON.stringify(rows, null, 1).slice(0, 30000)}

Return JSON only:
- "summary": the audit block in the method's output format (top 5, bottom 5, WHAT THE DATA SAYS, STOP, DO MORE), plain text, honest about sample size.
- "learnings": this week's entry for learnings.md: a "## Week of ${localDay()}" heading and 3 to 5 bullets.
- "strategy": the full strategy for next week in Markdown, which replaces brand/strategy.md and is read when planning and writing every post: hook formulas to favour and to avoid (by number), reel styles and worlds that worked, pillars and keywords to push or rest, topics to repeat with a new angle, one experiment with how we'll judge it. Only claims the data supports; with few posts, say so and keep most defaults.`,
  });
  const f = P('brand/learnings.md'); const old = readText(f);
  const [head, ...rest] = old.split('\n## ');
  fs.writeFileSync(f, `${head.trim()}\n\n${res.learnings.trim()}\n\n## ${rest.join('\n## ')}`.replace(/\n## $/, '\n'));
  fs.writeFileSync(P('brand/strategy.md'), `# Strategy for the week of ${localDay()}\n\n${res.strategy.trim()}\n`);
  log('audit done: learnings and strategy updated');
  return res.summary;
}

async function weeklyReport(summary, week) { // a GitHub issue, so Prashant gets the audit on his phone
  const repo = process.env.GITHUB_REPOSITORY, token = process.env.GITHUB_TOKEN; if (!repo || !token || !summary) return;
  const body = `The agent read last week's numbers with the ig-audit method and changed next week's plan to match.\n\n\`\`\`\n${summary.trim()}\n\`\`\`\n\n### Strategy now in use\n${readText(P('brand/strategy.md'))}\n\nClose this issue once you've read it.`;
  const r = await fetch(`https://api.github.com/repos/${repo}/issues`, { method: 'POST', headers: { Authorization: `Bearer ${token}`, Accept: 'application/vnd.github+json' }, body: JSON.stringify({ title: `Weekly report: what worked, and the plan for ${week}`, body, labels: ['report'] }) }).catch((e) => ({ ok: false, statusText: e.message }));
  log(r.ok ? 'weekly report issue opened' : `weekly report issue failed: ${r.status || ''} ${r.statusText}`);
}

// ---------- 2. research ----------
async function research() {
  const text = await ask({
    system: SYSTEM(), effort: 'medium', web: true, maxTokens: 16000,
    prompt: `Search the web for what changed in the last 14 days that a small D2C or Shopify brand owner could use: new AI features or tools (Claude, ChatGPT, Gemini, Meta Ads, Shopify, WhatsApp Business, Instagram), festival or sale dates coming up in India, and ecommerce problems people are discussing. Return 6 to 10 short bullets, each with what it is, why a D2C owner should care, and a source link. Skip pure model news with no practical use.`,
  });
  return text;
}

// ---------- 3. plan ----------
// every slot from start for n days that no queue fills yet (published or waiting), and that hasn't passed
function openSlots(start, days) {
  const taken = new Set(); const qroot = P('content/queue');
  if (fs.existsSync(qroot)) for (const w of fs.readdirSync(qroot)) for (const s of readJSON(path.join(qroot, w, 'plan.json'), { slots: [] }).slots) if (['made', 'published'].includes(s.status)) taken.add(`${s.day} ${s.time}`);
  const out = [];
  for (let i = 0; i < days; i++) { const day = addDays(start, i); for (const sl of slotsFor(day)) if (!taken.has(`${day} ${sl.time}`) && slotDate(day, sl.time) > new Date()) out.push({ day, time: sl.time, format: sl.format }); }
  return out;
}

async function planWeek(need, researchNotes) {
  const cfg = config(); const kws = Object.keys(cfg.keywords);
  const reels = need.filter((n) => n.format === 'reel').length, maxWorld = Math.max(1, Math.ceil(reels / WORLDS.length)), maxNew = reels > 8 ? 3 : 2;
  const motionCount = Math.round(reels * Math.min(1, Math.max(0, Number(cfg.motion?.share ?? 0)))); // reels made as motion graphics (docs/MOTION.md)
  const hooks = HOOKS().hooks, hookIds = hooks.map((h) => h.id);
  const validate = (v) => {
    const e = []; const posts = v.posts || [], fresh = v.new_tools || {};
    if (!Array.isArray(v.posts) || posts.length !== need.length) e.push(`posts must have exactly ${need.length} entries, one per slot, in the order given`);
    if (Object.keys(fresh).length > maxNew) e.push(`at most ${maxNew} new tools`);
    for (const [k, t] of Object.entries(fresh)) if (!/^[A-Z]{3,}$/.test(k) || kws.includes(k) || !t?.title || !t?.what) e.push(`new_tools.${k} needs a new uppercase keyword with title and what`);
    posts.forEach((p, i) => {
      const n = need[i]; if (!n) return;
      if (p.day !== n.day || p.time !== n.time || p.format !== n.format) e.push(`posts[${i}] must be day ${n.day}, time ${n.time}, format ${n.format}`);
      if (!p.keyword || !(kws.includes(p.keyword) || fresh[p.keyword])) e.push(`posts[${i}].keyword must be one of ${kws.join(', ')} or a key of new_tools`);
      if (!p.topic || !p.slug || !/^[a-z0-9-]+$/.test(p.slug)) e.push(`posts[${i}] needs topic and a lowercase-dash slug`);
      if (p.format === 'reel' && !WORLDS.includes(p.world)) e.push(`posts[${i}].world must be one of ${WORLDS.join(', ')}`);
      if (p.format === 'reel' && !['motion', 'world'].includes(p.style)) e.push(`posts[${i}].style must be "motion" or "world"`);
      if (p.format === 'reel' && !hookIds.includes(p.hook_formula)) e.push(`posts[${i}].hook_formula must be a hook id number from the list`);
    });
    const motion = posts.filter((p) => p.format === 'reel' && p.style === 'motion').length;
    if (motion !== motionCount) e.push(`exactly ${motionCount} reels must have style "motion" (you have ${motion})`);
    const rs = posts.filter((p) => p.format === 'reel'); const count = {};
    rs.forEach((p, i) => { count[p.world] = (count[p.world] || 0) + 1; if (i && rs[i - 1].world === p.world) e.push(`reels on ${rs[i - 1].day} ${rs[i - 1].time} and ${p.day} ${p.time} follow each other, so they need different worlds`); });
    for (const [w, c] of Object.entries(count)) if (c > maxWorld) e.push(`world ${w} is used ${c} times; at most ${maxWorld}`);
    if (new Set(posts.map((p) => p.slug)).size !== posts.length) e.push('every slug must be different');
    return e;
  };
  return askJSON({
    system: SYSTEM(), effort: 'high', validate,
    prompt: `Plan one post for each of these ${need.length} open slots (IST), in this order:
${need.map((n, i) => `${i}. ${n.day} ${n.time} ${n.format}`).join('\n')}

Free tools that already exist (keyword: title): ${kws.map((k) => `${k}: ${cfg.keywords[k].title}`).join('; ')}.
You may introduce at most ${maxNew} new tools (in new_tools); otherwise reuse existing ones from a fresh angle. When a day has a carousel and a reel, they share one keyword so both lead to the same free tool. When a day has two reels, give them different keywords and different pillars.
Do not repeat any of these recent topics: ${recentTopics().join(' | ') || 'none'}.
Research notes from this week:
${researchNotes || 'none'}

Reel styles: exactly ${motionCount} of the ${reels} reels are "motion" (motion graphics: kinetic type, animated UI mock-ups, counters, checklists, chat, before/after; best for numbers, steps, tools, news, prompts) and the rest are "world" (character panels: shoppers, critics, juries judging the viewer's thing). Give motion to the topics that suit it and spread them out; on two-reel days make one of each where you can.

Every reel, motion or not, gets a visual world that fits its topic (the look for world reels, and the backup if a motion render fails). Reels that follow each other never share a world, and no world is used more than ${maxWorld} time(s) (worlds: ${WORLDS.map((w) => `${w} = ${WORLD_NOTES[w]}`).join('; ')}).

Plan with this method (${UNATTENDED} The posting cadence is fixed by the slots above, so use its post types, mix and angle rules, not its posts-per-week count. "Proof" may only use real public data or our own published numbers, never invented results. The engagement round is done by Prashant, so leave it out):
${skill('ig-plan').split('## The engagement round')[0]}

Hook formulas (id name: best for). Pick the one that fits each reel's angle, follow the strategy above, and don't use the same formula on two reels in a row:
${hooks.map((h) => `${h.id} ${h.name}: ${h.best_for}`).join('\n')}

Rules: reels are one idea with a mechanism (panels of AI critics/shoppers/customers judging the viewer's thing work best); carousels are list- or step-shaped and screenshot-worthy. Follow the pillar mix. Reply with JSON only:
{"posts":[{"day":"${need[0]?.day}","time":"${need[0]?.time}","format":"${need[0]?.format}","keyword":"STORE","pillar":"Sell more","post_type":"Teach","slug":"...","topic":"...","angle":"...","style":"motion","world":"courtroom","hook_formula":5}],"new_tools":{"NEWWORD":{"title":"...","what":"..."}}}
(style, world and hook_formula only for reels; new_tools may be {}).`,
  });
}

// ---------- 4. write + render ----------
const SCENES_DOC = () => readText(P('docs/SCENES.md'));
const example = (id, file) => readText(P('content/posts', id, file));

async function writeTool(keyword, nt) {
  const id = keyword.toLowerCase(); // tools/<id>.md becomes keyword <ID> automatically (see config() in util.js)
  const text = await ask({
    system: SYSTEM(), effort: 'high',
    prompt: `Write the free tool "${nt.title}" (${nt.what}) as a Markdown file in exactly this shape: a "# Title" line, one short paragraph telling the reader what to paste and where, a line with only "---", then the full prompt they paste into Claude. The prompt must be safe, honest (never invent facts; mark unknowns as [CHECK: ...]) and genuinely useful for a D2C store owner. Model it on this example:\n\n${readText(P('tools/store.md'))}\n\nReturn the Markdown only.`,
  });
  fs.writeFileSync(P('tools', `${id}.md`), text.trim() + '\n');
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
  let caption = (await ask({ system: SYSTEM(), effort: 'high', prompt: `Write the Instagram caption for this ${kind} (keyword ${kw}, free tool "${tool}"). Follow the caption rules in this guide exactly:\n\n${SCENES_DOC().split('## Caption')[1]}\n\nModel caption:\n${example(kind === 'reel' ? '02-launch-trial' : 'c01-leaky-page', 'caption.txt')}\n\nThe ${kind}:\n${JSON.stringify(spec)}\n\nReturn the caption text only.` })).trim();
  const f = path.join(dir, 'caption.txt');
  for (let i = 0; i < 2; i++) {
    const errs = validateCaption(caption, kw); fs.writeFileSync(f, caption + '\n');
    const lint = lintCaption(f);
    if (!errs.length && lint.verdict !== 'FAIL' && lint.human >= 70) break;
    caption = (await ask({ system: SYSTEM(), effort: 'medium', prompt: `Revise this caption. Problems: ${[...errs, lint.notes, lint.human < 70 ? `it reads machine-written (human score ${lint.human}/100): use contractions, "you", varied sentence lengths, concrete numbers` : ''].filter(Boolean).join('; ')}.\n\n${caption}\n\nReturn the caption only.` })).trim();
  }
  fs.writeFileSync(f, caption + '\n');
}

// ig-reel step 1-2: three hooks off different formulas, scored by skills/ig-reel/hookscore.py; the best one opens the reel
async function pickHook(d) {
  const H = HOOKS(), ids = H.hooks.map((h) => h.id);
  const card = (h) => ({ id: h.id, name: h.name, template: h.template, example: h.example, on_screen: h.on_screen, best_for: h.best_for, trap: h.trap });
  let best = null, feedback = '';
  for (let round = 0; round < 2; round++) {
    const res = await askJSON({
      system: SYSTEM(), effort: 'medium',
      validate: (v) => (Array.isArray(v.hooks) && v.hooks.length === 3 && v.hooks.every((h) => ids.includes(h.id) && h.spoken && h.on_screen) && new Set(v.hooks.map((h) => h.id)).size === 3 ? [] : ['return {"hooks":[three {"id","spoken","on_screen"} with three different formula ids]}']),
      prompt: `${UNATTENDED}\n\nWrite three hook options for this reel, each off a different formula (the planner suggested #${d.hook_formula}; include it). The spoken line is the first sentence of the voiceover (under 3 seconds, 5 to 12 words, numbers as digits here); the on-screen line is 6 words or fewer. Never invent results: example numbers must be clearly examples or public data.\n\nReel: ${d.topic}. Angle: ${d.angle}. Keyword ${d.keyword}.\n\nRules:\n- ${H.rules.join('\n- ')}\n\nFormulas:\n${JSON.stringify(H.hooks.map(card))}\n${feedback}\nReturn JSON only: {"hooks":[{"id":5,"spoken":"...","on_screen":"..."}]}`,
    });
    const scored = pyJSON('skills/ig-reel/hookscore.py', res.hooks.map((h) => h.spoken.replace(/\n/g, ' ')).join('\n'));
    const opts = res.hooks.map((h, i) => ({ ...h, name: H.hooks.find((x) => x.id === h.id).name, score: scored?.[i]?.score ?? null, verdict: scored?.[i]?.verdict, weakest: scored?.[i]?.weakest }));
    opts.sort((a, b) => (b.score ?? 0) - (a.score ?? 0));
    if (!best || (opts[0].score ?? 0) > (best.score ?? 0)) best = opts[0];
    if (best.score === null || best.score >= 50) break; // hookscore under 50 = "you do not have the hook yet": one more round
    feedback = `\nLast round's best scored only ${best.score}/100 (weakest: ${opts.map((o) => `${o.spoken} -> ${o.weakest}`).join('; ')}). Write three stronger ones.`;
  }
  log(`hook #${best.id} ${best.name} scored ${best.score ?? 'n/a'}: ${best.spoken}`);
  return best;
}
const hookLine = (h) => (h ? `\n\nOpen with this hook (formula #${h.id} ${h.name}): the first line's "say" is "${h.spoken}" with numbers spelled as words, and its card is "${h.on_screen}".` : '');

// ig-reel step 5: run the spoken script through skills/ig-human/detect.py; reword once if it reads machine-written
async function humanize(spec, validate) {
  // voiceover lines are short and even on purpose and spell numbers out, so the burstiness and specificity checks
  // don't apply; act on stock phrases (SLOP DENSITY) and a flat, impersonal voice (VOICE) only
  const text = (spec.lines || []).map((l) => l.say).join('\n'), r = pyJSON('skills/ig-human/detect.py', text);
  const c = r?.checks || {}, bad = [['SLOP DENSITY', 70], ['VOICE', 50]].filter(([k, min]) => c[k] && c[k].score < min);
  if (!r || !bad.length) return spec;
  const notes = bad.map(([k]) => `${k}: ${c[k].detail}`).join('; ');
  log(`voiceover reads machine-written (human score ${r.human_score}), rewording once`);
  return askJSON({ system: SYSTEM(), effort: 'medium', validate, prompt: `${UNATTENDED}\n\nThis voiceover reads machine-written (human score ${r.human_score}/100: ${notes}). Use this method:\n${skill('ig-human').slice(0, 4000)}\n\nReword only the "say" text so it sounds like a person talking (contractions, short lines, varied rhythm, no stock phrases), keep the hook line's meaning, the timing and every other field, then return the full post.json.\n\n${JSON.stringify(spec)}` });
}

async function makeReel(day, d) {
  const cfg = config(); const id = `${day}-reel-${d.slug}`.slice(0, 60).replace(/-+$/, ''); const dir = P('content/posts', id);
  d.hook ||= await pickHook(d);
  if (d.style === 'motion') {
    try { await makeMotionReel(d, id, dir); return { id, style: 'motion', hook: d.hook }; } catch (e) {
      if (USAGE_LIMIT.test(e.message)) throw e; // out of Claude for now: the run stops and tops up later
      log('motion reel failed, making it as a world reel instead:', e.message.split('\n')[0]);
      fs.rmSync(dir, { recursive: true, force: true });
    }
  }
  const draft = await askJSON({
    system: SYSTEM(), effort: 'high', validate: (v) => validateReel(v, { keywords: Object.keys(cfg.keywords) }),
    prompt: `Write the reel spec (post.json) for: ${d.topic}. Angle: ${d.angle}. Keyword ${d.keyword} (free tool: ${cfg.keywords[d.keyword].title}). id must be "${id}", world "${d.world}" (${WORLD_NOTES[d.world]}), voice "${cfg.voice.id}", speed ${cfg.voice.speed}. 20 to 30 seconds spoken (about 60 to 80 words). Two-line hook first.${hookLine(d.hook)}\n\nHow specs work:\n${SCENES_DOC()}\n\nA finished example that rendered well:\n${example('02-launch-trial', 'post.json')}\n\nReturn post.json only.`,
  });
  const spec = await humanize(draft, (v) => validateReel(v, { keywords: Object.keys(cfg.keywords) }));
  fs.mkdirSync(dir, { recursive: true }); writeJSON(path.join(dir, 'post.json'), spec);
  let out = render('reel', dir);
  const bad = (out.match(/CHECK THESE WORDS: (.*)/) || [])[1];
  if (bad) { // the voice check flagged words: reword those lines once and re-record
    const fixed = await askJSON({ system: SYSTEM(), effort: 'medium', validate: (v) => validateReel(v, { keywords: Object.keys(cfg.keywords) }), prompt: `Speech-to-text could not hear these words clearly in the voiceover: ${bad}. Reword only the "say" text of the lines containing them (simpler, common words; keep meaning and timing), then return the full post.json.\n\n${JSON.stringify(spec)}` });
    writeJSON(path.join(dir, 'post.json'), fixed); out = render('reel', dir);
  }
  await writeCaption(dir, 'reel', spec);
  return { id, out, style: 'world', hook: d.hook };
}

// ---------- motion reels: HyperFrames picture written per reel (docs/MOTION.md, engine/motion.js) ----------
const USAGE_LIMIT = /usage limit|session limit|hit your .*limit/i;
const MOTION_DOC = () => readText(P('docs/MOTION.md'));
const MOTION_EXAMPLE = 'm01-five-questions';
function motion(dir, ...args) {
  const r = spawnSync('node', [P('engine/motion.js'), dir, ...args], { cwd: P(), encoding: 'utf8', maxBuffer: 1 << 26 });
  return { ok: r.status === 0, out: (r.stdout || '') + (r.stderr || '') };
}
const findings = (out) => { try { return JSON.parse((out.match(/MOTION FINDINGS: (.*)/) || [])[1]); } catch { return { errors: [out.slice(-1500)], warnings: [] }; } };
const fenced = (text, langs) => (text.match(new RegExp('```(?:' + langs + ')\\s*([\\s\\S]*?)```')) || [])[1];

/** Ask for scene.html + scene.js; static problems and HyperFrames checker errors go back to Claude (4 rounds max). */
async function writeScene(dir, spec, tool) {
  const toolText = readText(P('tools', `${config().keywords[spec.keyword].tool}.md`)).split('\n---')[0].trim();
  const base = [
    'Write the picture for this motion reel: scene.html and scene.js. Follow the guide exactly.',
    `# The guide\n${MOTION_DOC()}`,
    `# The reel (post.json)\n${JSON.stringify(spec, null, 2)}`,
    `# The free tool it gives away ("${tool}"): the payoff must show what it really does\n${toolText}`,
    `# Real timing in seconds (the voice is recorded; T in scene.js holds these)\n${readText(path.join(dir, 'timing.json'))}`,
    `# A finished example that passed the checker. Match its quality, not its look: use a different palette, layout and moves that fit THIS idea.\n--- scene.html ---\n${example(MOTION_EXAMPLE, 'scene.html')}\n--- scene.js ---\n${example(MOTION_EXAMPLE, 'scene.js')}`,
    'Reply with exactly two fenced blocks: ```html (scene.html) then ```js (scene.js).',
  ].join('\n\n');
  let prompt = base;
  for (let round = 0; round < 4; round++) {
    const text = await ask({ system: SYSTEM(), effort: 'high', prompt, maxTokens: 48000 });
    const html = fenced(text, 'html'), js = fenced(text, 'js|javascript');
    const errs = validateScene(html, js);
    if (errs.length) { prompt = `${base}\n\nYour previous answer:\n${text}\n\nProblems to fix:\n- ${errs.join('\n- ')}\nReturn both blocks again, corrected.`; continue; }
    fs.writeFileSync(path.join(dir, 'scene.html'), html.trim() + '\n'); fs.writeFileSync(path.join(dir, 'scene.js'), js.trim() + '\n');
    const r = motion(dir, '--lint', '--skip-vo'), f = findings(r.out);
    if (r.ok && !f.errors.length) { log('motion scene passed the checker', f.warnings.length ? `(${f.warnings.length} warnings)` : ''); return; }
    log('motion checker found', f.errors.length, 'errors; asking for a fix');
    prompt = `${base}\n\nYour previous answer:\n${text}\n\nThe HyperFrames checker found these errors. Fix every one (warnings are for taste):\nERRORS:\n- ${f.errors.join('\n- ')}\nWARNINGS:\n- ${(f.warnings || []).slice(0, 15).join('\n- ') || 'none'}\nReturn both blocks again, corrected.`;
  }
  throw new Error('the motion scene did not pass the checker after 4 tries');
}

async function makeMotionReel(d, id, dir) {
  const cfg = config(), tool = cfg.keywords[d.keyword].title, kws = Object.keys(cfg.keywords);
  const spec = await askJSON({
    system: SYSTEM(), effort: 'high', validate: (v) => validateMotionReel(v, { keywords: kws }),
    prompt: `Write the motion reel spec (post.json) for: ${d.topic}. Angle: ${d.angle}. Keyword ${d.keyword} (free tool: ${tool}). id must be "${id}", style "motion", world "${d.world}" (the backup look), voice "${cfg.voice.id}", speed ${cfg.voice.speed}. 20 to 30 seconds spoken (about 60 to 80 words). Hook first.${hookLine(d.hook)}\n\nHow motion reels work:\n${MOTION_DOC()}\n\nA finished example:\n${example(MOTION_EXAMPLE, 'post.json')}\n\nReturn post.json only.`,
  }).then((s) => humanize(s, (v) => validateMotionReel(v, { keywords: kws })));
  fs.mkdirSync(dir, { recursive: true }); writeJSON(path.join(dir, 'post.json'), spec);
  let prep = motion(dir, '--prep');
  if (!prep.ok) throw new Error(`voiceover failed: ${prep.out.slice(-600)}`);
  const bad = (prep.out.match(/CHECK THESE WORDS: (.*)/) || [])[1];
  if (bad) { // the voice check flagged words: reword those lines once and re-record
    const fixed = await askJSON({ system: SYSTEM(), effort: 'medium', validate: (v) => validateMotionReel(v, { keywords: kws }), prompt: `Speech-to-text could not hear these words clearly in the voiceover: ${bad}. Reword only the "say" text of the lines containing them (simpler, common words; keep meaning and timing), then return the full post.json.\n\n${JSON.stringify(spec)}` });
    writeJSON(path.join(dir, 'post.json'), fixed); prep = motion(dir, '--prep');
    if (!prep.ok) throw new Error(`voiceover failed: ${prep.out.slice(-600)}`);
  }
  const final = readJSON(path.join(dir, 'post.json'));
  await writeScene(dir, final, tool);
  const r = motion(dir, '--skip-vo');
  if (!r.ok || !fs.existsSync(path.join(dir, 'reel.mp4'))) throw new Error(`motion render failed: ${r.out.slice(-800)}`);
  await writeCaption(dir, 'reel', final);
}

async function makeCarousel(day, d) {
  const cfg = config(); const id = `${day}-carousel-${d.slug}`.slice(0, 60).replace(/-+$/, ''); const dir = P('content/posts', id);
  const spec = await askJSON({
    system: SYSTEM(), effort: 'high', validate: (v) => validateCarousel(v, { keywords: Object.keys(cfg.keywords) }),
    prompt: `Write the carousel spec (carousel.json) for: ${d.topic}. Angle: ${d.angle}. Keyword ${d.keyword} (free tool: ${cfg.keywords[d.keyword].title}). id must be "${id}". 8 to 10 slides.\n\nHow specs work:\n${SCENES_DOC()}\n\nA finished example:\n${example('c01-leaky-page', 'carousel.json')}\n\nReturn carousel.json only.`,
  });
  fs.mkdirSync(dir, { recursive: true }); writeJSON(path.join(dir, 'carousel.json'), spec);
  render('carousel', dir);
  await writeCaption(dir, 'carousel', spec);
  return { id };
}

// ---------- run ----------
async function run({ start, days = 7 } = {}) {
  const cfg = config();
  if (cfg.paused?.on) { log('paused in config/agent.json: no planning'); return { skipped: true }; }
  const launch = readJSON(P('content/queue/launch-week/plan.json'), null);
  if (launch && !launch.start) { log('launch week has no dates yet: run the Launch workflow first'); return { skipped: true }; }
  if (!start && launch?.start) { const end = addDays(launch.start, 6); start = nextMonday(end > localDay() ? end : localDay()); }
  start = start || nextMonday();
  // a second run for the same week (to top up slots a first run couldn't make) gets its own folder: 2026-W43-2
  let week = isoWeek(start);
  for (let n = 2; fs.existsSync(P('content/queue', week, 'plan.json')); n++) week = `${isoWeek(start)}-${n}`;
  const qdir = P('content/queue', week);
  const need = openSlots(start, days);
  if (!need.length) { log(`no open slots ${start} + ${days} days`); return { week, skipped: true }; }
  log(`open slots: ${need.length} (${need.filter((n) => n.format === 'reel').length} reels)`);
  const audit = await learn().catch((e) => { if (USAGE_LIMIT.test(e.message)) throw e; log('audit skipped:', e.message.split('\n')[0]); return null; });
  const notes = await research().catch((e) => { log('research skipped:', e.message); return ''; });
  const plan = await planWeek(need, notes);
  for (const [kw, nt] of Object.entries(plan.new_tools || {})) if (!config().keywords[kw] && plan.posts.some((p) => p.keyword === kw)) await writeTool(kw, nt);

  const slots = []; const problems = [];
  for (const p of plan.posts) {
    try {
      const made = p.format === 'reel' ? await makeReel(p.day, p) : await makeCarousel(p.day, p);
      slots.push({ day: p.day, time: p.time, format: p.format, post: made.id, ...(made.style ? { style: made.style } : {}), ...(made.hook ? { hook: { id: made.hook.id, name: made.hook.name, score: made.hook.score } } : {}), keyword: p.keyword, pillar: p.pillar, topic: p.topic, status: 'made' });
      log('made', made.id);
    } catch (e) {
      problems.push(`${p.day} ${p.time} ${p.format}: ${e.message.split('\n')[0]}`); log('FAILED', p.day, p.format, e.message);
      if (USAGE_LIMIT.test(e.message)) { // the Claude plan is used up: stop, keep what's made, top up later
        for (const q of plan.posts.slice(plan.posts.indexOf(p) + 1)) problems.push(`${q.day} ${q.time} ${q.format}: not made (Claude usage limit reached; merge this, then run Weekly again to fill the rest)`);
        break;
      }
    }
  }
  writeJSON(path.join(qdir, 'plan.json'), { week, start, research: notes, slots });
  fs.writeFileSync(path.join(qdir, 'problems.txt'), problems.join('\n'));
  log(`planned ${week}: ${slots.length} posts made, ${problems.length} failed`);
  await weeklyReport(audit, week);
  return { week, slots, problems };
}

module.exports = { run, nextMonday, makeReel };
