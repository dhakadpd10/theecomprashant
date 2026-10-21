// Turns post.json + voice/voice.json into absolute times: when each beat starts, when its line plays, when the shot cuts,
// and when each caption chunk (3-4 words) shows.
const fs = require('fs'), path = require('path');

// spoken: when each spoken word starts (voice.json "words", from Azure). With it, every chunk starts on the exact
// word the voice is saying (caption word j maps to spoken word j, scaled when the counts differ a little), so the
// captions and the camera cuts that follow them (story/scene.js) land on the voice. Without it, chunks are spread by length.
function chunks(text, vo, len, spoken) {
  const words = String(text || '').split(/\s+/).filter(Boolean); if (!words.length) return [];
  const groups = []; let cur = [];
  for (const w of words) { cur.push(w); if (cur.length >= 4 || (/[.,!?;:]$/.test(w) && cur.length >= 2)) { groups.push(cur); cur = []; } }
  if (cur.length) { if (cur.length === 1 && groups.length) groups[groups.length - 1].push(...cur); else groups.push(cur); }
  if (spoken?.length) {
    let j = 0; const starts = groups.map((g) => { const k = Math.min(spoken.length - 1, Math.round((j * spoken.length) / words.length)); j += g.length; return vo + spoken[k].t; });
    return groups.map((g, i) => ({ text: g.join(' '), at: +starts[i].toFixed(3), end: +(i + 1 < starts.length ? starts[i + 1] : vo + len).toFixed(3) }));
  }
  const weight = (g) => g.join(' ').length + 4, total = groups.reduce((s, g) => s + weight(g), 0);
  let t = vo; return groups.map((g) => { const d = (weight(g) / total) * len; const c = { text: g.join(' '), at: +t.toFixed(3), end: +(t + d).toFixed(3) }; t += d; return c; });
}

module.exports = function timeline(dir) {
  const post = JSON.parse(fs.readFileSync(path.join(dir, 'post.json'), 'utf8'));
  const voice = JSON.parse(fs.readFileSync(path.join(dir, 'voice', 'voice.json'), 'utf8'));
  let t = 0;
  const beats = post.beats.map((b, i) => {
    const key = String(i).padStart(2, '0'), v = voice[key];
    const pre = b.pre ?? (i === 0 ? 0.15 : 0.18);
    const start = t, vo = v ? +(t + pre).toFixed(3) : null, len = v ? v.len : 0;
    const end = v ? t + pre + len + (b.post ?? 0.12) : t + (b.dur || 1);
    t = end;
    return { ...b, i, key, start: +start.toFixed(3), vo, len, end: +end.toFixed(3), env: v ? v.env : null, caps: v ? chunks(b.show || b.say, vo, len, v.words) : [] };
  });
  return { id: post.id, keyword: post.keyword, hook: post.hook, hot: post.hot || [], sign: post.sign, brand: post.brand || {}, cover: post.cover || {}, beats, DUR: +(t + 0.5).toFixed(2) };
};
