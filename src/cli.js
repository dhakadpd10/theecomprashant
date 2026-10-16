#!/usr/bin/env node
// Theecomprashant - entry point for every job (the GitHub Actions workflows call these).
//   node src/cli.js plan [--start YYYY-MM-DD] [--days 7]   research, plan, write and render next week
//   node src/cli.js review <week> <branch>                 print the approval pull-request text
//   node src/cli.js publish [--dry-run]                    publish approved posts that are due
//   node src/cli.js engage                                 keyword DMs, comment + DM replies
//   node src/cli.js analytics                              log every live post's numbers
//   node src/cli.js site                                   build the public site into _site/
//   node src/cli.js refresh-token                          print a refreshed Instagram token (workflow stores it)
//   node src/cli.js launch --start YYYY-MM-DD             give the launch week real dates (Day 1 = start)
//   node src/cli.js check                                  check keys and the Instagram connection
const args = process.argv.slice(2);
const flag = (name, def) => { const i = args.indexOf(`--${name}`); return i < 0 ? def : args[i + 1] ?? true; };

(async () => {
  const cmd = args[0];
  if (cmd === 'plan') {
    const r = await require('./plan').run({ start: flag('start'), days: Number(flag('days', 7)) });
    if (process.env.GITHUB_OUTPUT && r.week) require('fs').appendFileSync(process.env.GITHUB_OUTPUT, `week=${r.week}\nskipped=${!!r.skipped}\n`);
  } else if (cmd === 'review') console.log(require('./review').body(args[1], args[2]));
  else if (cmd === 'publish') await require('./publish').run({ dryRun: args.includes('--dry-run') });
  else if (cmd === 'engage') await require('./engage').run();
  else if (cmd === 'analytics') await require('./analytics').run();
  else if (cmd === 'site') require('./site').build();
  else if (cmd === 'launch') {
    const { P, readJSON, writeJSON, addDays } = require('./util'); const start = flag('start');
    if (!/^\d{4}-\d{2}-\d{2}$/.test(start || '')) throw new Error('give --start YYYY-MM-DD');
    const f = P('content/queue/launch-week/plan.json'); const plan = readJSON(f);
    for (const s of plan.slots) { const m = String(s.day).match(/^DAY(\d+)$/); if (m) s.day = addDays(start, Number(m[1]) - 1); }
    plan.start = start; delete plan.note; writeJSON(f, plan); console.log(`launch week set: ${start} to ${addDays(start, 6)}`);
  }
  else if (cmd === 'refresh-token') { const t = await require('./ig').refreshToken(); process.stdout.write(t.access_token); }
  else if (cmd === 'check') {
    const ok = (b) => (b ? 'yes' : 'NO');
    console.log('ANTHROPIC_API_KEY set:', ok(process.env.ANTHROPIC_API_KEY));
    console.log('IG_ACCESS_TOKEN set:  ', ok(process.env.IG_ACCESS_TOKEN));
    console.log('IG_USER_ID set:       ', ok(process.env.IG_USER_ID));
    if (process.env.IG_ACCESS_TOKEN) { const me = await require('./ig').me(); console.log('Instagram account:', me.username, me.account_type, me.followers_count, 'followers'); }
  } else { console.log(require('fs').readFileSync(__filename, 'utf8').split('\n').slice(1, 12).join('\n')); process.exit(cmd ? 1 : 0); }
})().catch((e) => { console.error('ERROR:', e.message); process.exit(1); });
