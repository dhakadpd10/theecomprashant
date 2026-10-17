// Writes the weekly pull-request description: every post with its cover, time and keyword.
// Merging the pull request = approving the week.
const path = require('path');
const { P, readJSON, readText } = require('./util');

function body(week, branch) {
  const repo = process.env.GITHUB_REPOSITORY || 'OWNER/theecomprashant';
  const plan = readJSON(P('content/queue', week, 'plan.json'));
  const raw = (p) => `https://raw.githubusercontent.com/${repo}/${branch}/${p}`;
  const rows = plan.slots.map((s, i) => {
    const dir = `content/posts/${s.post}`; const img = s.format === 'reel' ? `${dir}/cover.jpg` : `${dir}/slide-01.jpg`;
    const cap = readText(P(dir, 'caption.txt')).split('\n')[0].replace(/\|/g, '/');
    return `| ${i + 1} | ${s.day} ${s.time} | ${s.format} | **${s.keyword}** | ${s.topic.replace(/\|/g, '/')} | <img src="${raw(img)}" width="140"> | ${cap} |`;
  });
  const problems = readText(P('content/queue', week, 'problems.txt')).trim();
  return `## ${week}: ${plan.slots.length} posts ready for your OK

**Merge this pull request to approve the week.** Nothing is posted before it's merged. If you don't get to it, the agent approves it by itself 30 hours before the first post, so the page never goes quiet: add the label **hold** to stop that. To hold a post back, open \`content/queue/${week}/plan.json\` in this PR and change its \`"status"\` to \`"skip"\`. Close the PR to reject the whole week.

| # | When (IST) | Format | Keyword | Topic | Preview | Caption line 1 |
|---|---|---|---|---|---|---|
${rows.join('\n')}

Full videos, slides and captions are in the **Files changed** tab.
${problems ? `\n### Couldn't make\n${problems.split('\n').map((p) => `- ${p}`).join('\n')}\n` : ''}
### What the agent learned
${readText(P('brand/learnings.md')).split('\n## ').slice(1, 2).map((s) => '#### ' + s).join('') || 'No posts live yet.'}
`;
}

module.exports = { body };
