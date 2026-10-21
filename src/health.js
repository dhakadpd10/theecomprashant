// Hourly health check (Doctor workflow). Finds what would stop the page posting every day and fixes the
// mechanical things itself, without Claude:
//   - the posting loop isn't running            -> start the Run workflow
//   - an approval PR is due within 30 hours     -> merge it (unless it has the "hold" label), then deploy the site
//   - a post failed because its media wasn't on the site yet -> redeploy the site and give it another try
//   - a post was held for rescheduling          -> move it into the next free slot of its format
//   - empty slots in the next 3 days            -> run the planner for them
// Everything else is reported: "code" problems go to Claude in the Doctor workflow, "human" ones become an issue.
// node src/cli.js health [--fix]      prints {problems:[{kind, key, text}], fixed:[...]} as JSON on stdout
const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');
const { P, readJSON, writeJSON, config, slotsFor, slotDate, addDays, localDay } = require('./util');

const H = 3600000;
const gh = (...args) => { const r = spawnSync('gh', args, { encoding: 'utf8' }); return { ok: r.status === 0, out: (r.stdout || '').trim(), err: (r.stderr || '').trim() }; };
const ghJSON = (...args) => { const r = gh(...args); try { return r.ok ? JSON.parse(r.out) : null; } catch { return null; } };
const git = (...args) => spawnSync('git', args, { encoding: 'utf8' });
const say = (...a) => console.error(...a); // stdout is the JSON report

function plans() { // [{file, plan}] on this checkout
  const q = P('content/queue'); if (!fs.existsSync(q)) return [];
  return fs.readdirSync(q).map((w) => ({ file: path.join(q, w, 'plan.json'), plan: readJSON(path.join(q, w, 'plan.json'), null) })).filter((x) => x.plan);
}
function prPlans(prs) { // the plan.json inside each open approval PR branch
  return prs.flatMap((pr) => {
    git('fetch', '-q', 'origin', pr.headRefName);
    const files = git('ls-tree', '-r', '--name-only', 'FETCH_HEAD', 'content/queue').stdout.split('\n').filter((f) => f.endsWith('/plan.json'));
    return files.map((f) => { try { return { pr, plan: JSON.parse(git('show', `FETCH_HEAD:${f}`).stdout) }; } catch { return null; } }).filter(Boolean);
  });
}
const taken = (lists) => new Set(lists.flatMap((p) => p.slots).filter((s) => ['made', 'published'].includes(s.status)).map((s) => `${s.day} ${s.time}`));

async function run({ fix = false } = {}) {
  const problems = [], fixed = [], now = Date.now(), cfg = config();
  const add = (kind, key, text) => problems.push({ kind, key, text });
  const local = plans();
  const prs = ghJSON('pr', 'list', '--state', 'open', '--json', 'number,title,headRefName,labels,mergeable,createdAt') || [];
  const approvals = prs.filter((p) => /^Approve /.test(p.title));
  const pending = prPlans(approvals);

  // 1. Instagram access
  const blocked = readJSON(P('content/state/ig-blocked.json'), null);
  if (blocked) add('human', 'ig-blocked', `Instagram has refused every call since ${blocked.since} ("${blocked.error}"). The agent retries every 30 minutes. Fix: make a fresh access token (Meta app dashboard → Manage messaging and content on Instagram → API setup with Instagram login → Generate token) and save it as the IG_ACCESS_TOKEN secret. Also check the Instagram app for a "confirm it's you" notice.`);
  const castProvider = (() => { try { return require('../story/cast.json').provider; } catch { return null; } })();
  if (castProvider === 'azure' && process.env.AZURE_SET === 'false') add('human', 'azure-key', 'Reels are in Hindi now, and the Hindi voices need the AZURE_SPEECH_KEY and AZURE_SPEECH_REGION secrets. Until they are added the planner makes nothing. Steps: docs/SETUP.md, "Hindi voices".');
  if (!process.env.GH_PAT_SET || process.env.GH_PAT_SET === 'false') add('human', 'gh-pat', 'The GH_PAT secret is missing, so the Instagram token can\'t renew itself and will stop working about 60 days after it was made. Add GH_PAT (docs/SETUP.md, step "Token").');

  // 2. the posting loop must be running
  const runs = ghJSON('run', 'list', '--workflow', 'run.yml', '--limit', '5', '--json', 'status,createdAt') || [];
  if (!runs.some((r) => ['in_progress', 'queued', 'waiting', 'pending', 'requested'].includes(r.status))) {
    if (fix && gh('workflow', 'run', 'run.yml').ok) fixed.push('started the posting loop (Run workflow), which had stopped');
    else add('code', 'loop-stopped', 'No Run workflow is running or queued, so nothing is being posted.');
  }

  // 3. approval PRs: merge when the first post is close, so the page never goes quiet
  for (const pr of approvals) {
    const slots = pending.filter((x) => x.pr.number === pr.number).flatMap((x) => x.plan.slots).filter((s) => s.status === 'made' && /^\d{4}-/.test(s.day));
    if (!slots.length) { if (fix && now - new Date(pr.createdAt) > 6 * H) { gh('pr', 'close', String(pr.number), '--comment', 'Nothing in this week was made (see problems.txt); closing it so the next run can fill the slots.'); fixed.push(`closed empty approval PR #${pr.number}`); } continue; }
    const first = Math.min(...slots.map((s) => slotDate(s.day, s.time).getTime()));
    if ((pr.labels || []).some((l) => l.name === 'hold')) { if (first - now < 30 * H) add('human', `pr-hold-${pr.number}`, `PR #${pr.number} "${pr.title}" has the "hold" label and its first post is due ${new Date(first).toISOString()}. Remove the label or close the PR.`); continue; }
    if (first - now > 30 * H) continue;
    if (pr.mergeable === 'CONFLICTING') { add('code', `pr-conflict-${pr.number}`, `Approval PR #${pr.number} (${pr.headRefName}) has merge conflicts with main and its first post is due within 30 hours. Merge origin/main into that branch, keeping main's version of content/state, content/queue/* status fields and config, and the branch's new posts and tools.`); continue; }
    if (!fix) { add('info', `pr-due-${pr.number}`, `would auto-approve PR #${pr.number}`); continue; }
    const m = gh('pr', 'merge', String(pr.number), '--merge', '--subject', `${pr.title} (approved automatically: not reviewed within its window)`);
    if (m.ok) { fixed.push(`auto-approved PR #${pr.number} "${pr.title}" (first post within 30 hours)`); gh('workflow', 'run', 'site.yml'); }
    else add('code', `pr-merge-${pr.number}`, `Could not merge approval PR #${pr.number}: ${m.err.slice(0, 300)}`);
  }

  // 4. posts that failed or were held
  let changed = new Set();
  const all = [...local.map((x) => x.plan), ...pending.map((x) => x.plan)];
  const free = (format, within) => { // next free future slot of this format within N days, not taken anywhere
    const t = taken(all);
    for (let i = 0; i <= within; i++) { const day = addDays(localDay(), i); for (const sl of slotsFor(day)) if (sl.format === format && !t.has(`${day} ${sl.time}`) && slotDate(day, sl.time).getTime() > now + 15 * 60000) return { day, time: sl.time }; }
    return null;
  };
  for (const { file, plan } of local) for (const s of plan.slots) {
    const due = /^\d{4}-/.test(s.day) ? slotDate(s.day, s.time).getTime() : 0;
    if (s.status === 'failed' && /not on the site yet/.test(s.error || '') && now - due < 5 * H) {
      if (fix) { gh('workflow', 'run', 'site.yml'); s.status = 'made'; s.attempts = 0; changed.add(file); fixed.push(`redeployed the site and retried ${s.post} (its media wasn't online yet)`); }
    } else if (!blocked && (s.status === 'failed' || (s.status === 'missed' && now - due < 4 * 24 * H) || (s.status === 'hold' && /reschedule/i.test(s.note || '')))) { // missed = held up longer than 6 h (e.g. while Instagram was blocked)
      const slot = free(s.format, 3);
      if (slot && fix) { const was = `${s.day} ${s.time}`; Object.assign(s, slot, { status: 'made', attempts: 0, note: `rescheduled from ${was}` }); delete s.error; changed.add(file); fixed.push(`rescheduled ${s.post} from ${was} to ${slot.day} ${slot.time}`); }
      else if (s.status === 'failed') add('code', `post-failed-${s.post}`, `Post ${s.post} (${s.day} ${s.time}) failed: ${s.error}`);
    } else if (s.status === 'failed' && now - due < 48 * H) add('info', `post-failed-${s.post}`, `${s.post} failed while Instagram was blocked; it will be rescheduled when access is back.`);
  }
  for (const f of changed) writeJSON(f, local.find((x) => x.file === f).plan);

  // 5. empty slots in the next 3 days -> planner (unless one is running or a PR covers them)
  const t = taken(all), gaps = [];
  for (let i = 0; i < 3; i++) { const day = addDays(localDay(), i); for (const sl of slotsFor(day)) if (!t.has(`${day} ${sl.time}`) && slotDate(day, sl.time).getTime() > now + H) gaps.push(`${day} ${sl.time}`); }
  if (gaps.length && cfg.paused?.on) add('info', 'gaps', `Paused in config/agent.json: ${gaps.length} empty slots in the next 3 days stay empty.`);
  else if (gaps.length) {
    const weekly = ghJSON('run', 'list', '--workflow', 'weekly.yml', '--limit', '3', '--json', 'status,createdAt') || [];
    const busy = weekly.some((r) => r.status !== 'completed' || now - new Date(r.createdAt) < 3 * H);
    if (busy) add('info', 'gaps', `${gaps.length} empty slots in the next 3 days; a planner run is already going or just ran.`);
    else if (fix && gh('workflow', 'run', 'weekly.yml', '-f', `start=${gaps[0].slice(0, 10)}`, '-f', 'days=7').ok) fixed.push(`started the planner for ${gaps.length} empty slots from ${gaps[0]}`);
    else add('code', 'gaps', `${gaps.length} empty slots in the next 3 days (${gaps.join(', ')}) and the planner could not be started.`);
  }

  const report = { at: new Date().toISOString(), problems, fixed };
  writeJSON(P('content/state/health.json'), report);
  console.log(JSON.stringify(report, null, 1));
  return report;
}

module.exports = { run };
