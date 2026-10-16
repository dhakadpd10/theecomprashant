// Daily: pull each published post's numbers and keep one row per post per day in content/analytics/log.csv.
const fs = require('fs');
const path = require('path');
const { P, readJSON, config, log, localDay } = require('./util');
const ig = require('./ig');

const COLS = ['date', 'post', 'format', 'keyword', 'pillar', 'published_at', 'views', 'reach', 'likes', 'comments', 'saved', 'shares', 'total_interactions', 'keyword_comments'];

async function run() {
  const file = P('content/analytics/log.csv'); const today = localDay();
  const rows = fs.existsSync(file) ? fs.readFileSync(file, 'utf8').trim().split('\n').slice(1).filter((r) => !r.startsWith(today + ',')) : [];
  const engage = readJSON(P('content/state/engage.json'), { comments: {} });
  const keywordCount = Object.values(engage.comments).filter((v) => v === 'keyword').length; // page-wide, kept for the weekly read
  let n = 0;
  for (const w of fs.existsSync(P('content/queue')) ? fs.readdirSync(P('content/queue')) : []) {
    for (const s of readJSON(path.join(P('content/queue'), w, 'plan.json'), { slots: [] }).slots) {
      if (!s.media_id || Date.now() - new Date(s.published_at) > 30 * 86400000) continue;
      try {
        const m = await ig.mediaInsights(s.media_id, s.format);
        rows.push([today, s.post, s.format, s.keyword, s.pillar || '', s.published_at, m.views, m.reach, m.likes, m.comments, m.saved, m.shares, m.total_interactions, ''].map((v) => (v ?? '')).join(','));
        n++;
      } catch (e) { log('insights failed', s.post, e.message); }
    }
  }
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, [COLS.join(','), ...rows].join('\n') + '\n');
  log(`analytics: ${n} posts logged; ${keywordCount} keyword DMs sent so far`);
}

module.exports = { run };
