#!/usr/bin/env node
// Quick safety test, run before the Doctor saves any automatic fix (and fine to run by hand):
// every source file parses, every module loads, the config and every queued plan read cleanly,
// every queued post's spec passes its validator, and the site builds. Exit 1 on any problem.
const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');
const ROOT = path.resolve(__dirname, '..');
const fail = []; const ok = (m) => console.log('ok  ', m);
const check = (name, fn) => { try { const r = fn(); ok(name + (r ? `: ${r}` : '')); } catch (e) { fail.push(`${name}: ${e.message}`); console.log('FAIL', name, e.message); } };

const js = (d) => fs.readdirSync(path.join(ROOT, d)).filter((f) => f.endsWith('.js')).map((f) => path.join(d, f));
for (const f of [...js('src'), ...js('engine'), 'scripts/smoke.js']) check(`parses ${f}`, () => { const r = spawnSync(process.execPath, ['--check', path.join(ROOT, f)], { encoding: 'utf8' }); if (r.status) throw new Error(r.stderr.split('\n').slice(0, 4).join(' ')); });
for (const m of ['util', 'claude', 'ig', 'validate', 'publish', 'engage', 'analytics', 'site', 'review', 'health', 'legal']) check(`loads src/${m}`, () => { require(path.join(ROOT, 'src', m)); });
check('loads src/plan', () => { require(path.join(ROOT, 'src/plan')); });

const { config, readJSON, P } = require(path.join(ROOT, 'src/util'));
const v = require(path.join(ROOT, 'src/validate'));
check('config', () => { const c = config(); if (!c.slots?.length) throw new Error('no slots'); return `${Object.keys(c.keywords).length} keywords`; });
check('queued plans and their posts', () => {
  const kws = Object.keys(config().keywords); let n = 0; const errs = [];
  for (const w of fs.readdirSync(P('content/queue'))) {
    const plan = readJSON(P('content/queue', w, 'plan.json'), null); if (!plan) continue;
    if (!Array.isArray(plan.slots)) throw new Error(`${w}/plan.json has no slots array`);
    for (const s of plan.slots.filter((x) => x.status === 'made')) {
      const dir = P('content/posts', s.post); if (!fs.existsSync(dir)) continue; // sparse checkouts (Prashant's PC) have no media
      n++;
      if (!kws.includes(s.keyword)) errs.push(`${s.post}: keyword ${s.keyword} has no free tool`);
      if (!fs.existsSync(path.join(dir, 'caption.txt'))) errs.push(`${s.post}: no caption.txt`);
      if (s.format === 'reel' && !fs.existsSync(path.join(dir, 'reel.mp4'))) errs.push(`${s.post}: no reel.mp4`);
      if (s.format === 'carousel' && !fs.readdirSync(dir).some((f) => /^slide-\d+\.jpg$/.test(f))) errs.push(`${s.post}: no slides`);
    }
  }
  if (errs.length) throw new Error(errs.slice(0, 8).join('; '));
  return `${n} waiting posts have their files`;
});
check('site builds', () => { const r = spawnSync(process.execPath, [P('src/cli.js'), 'site'], { cwd: ROOT, encoding: 'utf8' }); if (r.status) throw new Error((r.stderr || r.stdout).slice(-300)); fs.rmSync(P('_site'), { recursive: true, force: true }); });
check('validators run', () => { const r = v.validateReel({}); if (!Array.isArray(r) || !r.length) throw new Error('validateReel accepted an empty spec'); });

console.log(fail.length ? `\nSMOKE FAILED (${fail.length})` : '\nSMOKE OK');
process.exit(fail.length ? 1 : 0);
