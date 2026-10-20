// One command for one story reel: voices (checked by ear) -> sound mix -> cover and reel.
//   node story/make.js content/posts/<id>              everything
//   node story/make.js content/posts/<id> --no-reel    voices, sound and cover only (quick check)
//   node story/make.js content/posts/<id> --stills 1,6,12   a few frames into stills/ (for checking the look)
// Prints "CHECK THESE WORDS: ..." when the speech check could not hear a line right (the planner rewrites those lines).
const path = require('path');
const { spawnSync } = require('child_process');
const render = require('./render');

(async () => {
  const dir = path.resolve(process.argv[2]); const noReel = process.argv.includes('--no-reel'); const si = process.argv.indexOf('--stills');
  const node = (args) => { const r = spawnSync(process.execPath, args, { encoding: 'utf8', maxBuffer: 1 << 26 }); process.stdout.write(r.stdout || ''); if (r.status) throw new Error(`${path.basename(args[0])} failed:\n${(r.stderr || '').slice(-1500)}`); return r.stdout || ''; };
  const t0 = Date.now();
  const v = process.argv.includes('--keep-voice') ? '' : node([path.join(__dirname, 'voices.mjs'), dir, '--check']);
  node([path.join(__dirname, 'audio.js'), dir]);
  const r = await render.open(dir);
  await r.cover(path.join(dir, 'cover.jpg'));
  if (si > -1) for (const s of process.argv[si + 1].split(',').map(Number)) await r.still(s, path.join(dir, 'stills', `t${s.toFixed(2)}.jpg`));
  else if (!noReel) await r.reel(path.join(dir, 'reel.mp4'), path.join(dir, 'audio.wav'));
  await r.close();
  console.log(`made ${path.basename(dir)} in ${((Date.now() - t0) / 60000).toFixed(1)} min${/CHECK THESE WORDS/.test(v) ? ' (with words to check)' : ''}`);
})().catch((e) => { console.error(e); process.exit(1); });
