// Writes the weekly pull-request description: every post with its cover, time and keyword.
// Merging the pull request = approving the week.
const fs = require('fs');
const path = require('path');
const { P, readJSON, readText } = require('./util');

// one strip of frames per reel (engine/motion.js writes sheet.jpg), numbered like the table, and the "skip" reply
function sheets(plan, raw) {
  const rows = plan.slots.map((s, i) => (fs.existsSync(P('content/posts', s.post, 'sheet.jpg')) ? `**${i + 1}. ${s.day} ${s.time}**: ${s.topic.replace(/\n/g, ' ')}\n<img src="${raw(`content/posts/${s.post}/sheet.jpg`)}" width="100%">\n` : '')).filter(Boolean);
  if (!rows.length) return '';
  return `### Look before they post

Weak hook, empty card or a frame you don't like? **Reply in this pull request with the numbers to drop, like \`skip 3, 5\`.** Skipped reels never post and the agent writes new ones for those slots. It works before or after this is merged, up to an hour before the post.

${rows.join('\n')}
`;
}

function body(week, branch) {
  const repo = process.env.GITHUB_REPOSITORY || 'OWNER/theecomprashant';
  const plan = readJSON(P('content/queue', week, 'plan.json'));
  const raw = (p) => `https://raw.githubusercontent.com/${repo}/${branch}/${p}`;
  const rows = plan.slots.map((s, i) => {
    const dir = `content/posts/${s.post}`; const img = s.format === 'reel' ? `${dir}/cover.jpg` : `${dir}/slide-01.jpg`;
    const cap = readText(P(dir, s.caption_file || 'caption.txt')).split('\n')[0].replace(/\|/g, '/');
    return `| ${i + 1} | ${s.day} ${s.time} | ${s.format} | **${s.keyword}** | ${s.topic.replace(/\|/g, '/')} | <img src="${raw(img)}" width="140"> | ${cap} |`;
  });
  const problems = readText(P('content/queue', week, 'problems.txt')).trim();
  return `## ${week}: ${plan.slots.length} posts ready for your OK

**Merge this pull request to approve the week.** Nothing is posted before it's merged. If you don't get to it, the agent approves it by itself 30 hours before the first post, so the page never goes quiet: add the label **hold** to stop that. To hold a post back, open \`content/queue/${week}/plan.json\` in this PR and change its \`"status"\` to \`"skip"\`. Close the PR to reject the whole week.

| # | When (IST) | Format | Keyword | Topic | Preview | Caption line 1 |
|---|---|---|---|---|---|---|
${rows.join('\n')}

${sheets(plan, raw)}
Full videos, slides and captions are in the **Files changed** tab.
${problems ? `\n### Couldn't make\n${problems.split('\n').map((p) => `- ${p}`).join('\n')}\n` : ''}
### What the agent learned
${readText(P('brand/learnings.md')).split('\n## ').slice(1, 2).map((s) => '#### ' + s).join('') || 'No posts live yet.'}
`;
}

module.exports = { body };
