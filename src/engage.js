// Every 10 minutes (from .github/loop.sh): answer the page.
//  - comment with a post's keyword  -> one private DM with the free tool link + a short public reply
//  - other comments                 -> Claude sorts them: reply (questions, thanks), escalate to Prashant, or ignore (spam)
//  - new DMs (inside Instagram's 24-hour window) -> same sorting
// Anything escalated becomes a GitHub issue so Prashant gets a phone notification.
const fs = require('fs');
const path = require('path');
const { P, readJSON, writeJSON, readText, config, log } = require('./util');
const { askJSON } = require('./claude');
const ig = require('./ig');

const STATE = P('content/state/engage.json');
const DAY = 86400000;

function postByMedia() {
  const map = {}; const qroot = P('content/queue'); if (!fs.existsSync(qroot)) return map;
  for (const w of fs.readdirSync(qroot)) for (const s of readJSON(path.join(qroot, w, 'plan.json'), { slots: [] }).slots) if (s.media_id) map[s.media_id] = s;
  return map;
}
const keywordIn = (caption = '') => (caption.match(/[Cc]omment\s+"?([A-Z]{3,})"?/) || [])[1];
const toolLink = (kw) => { const c = config(); const t = c.keywords[kw]; return t ? `${c.site_url.replace(/\/$/, '')}/tools/#${t.tool}` : null; };

async function openIssue(title, body) {
  const repo = process.env.GITHUB_REPOSITORY, token = process.env.GITHUB_TOKEN;
  if (!repo || !token) { log('ESCALATE (no GitHub token here):', title); return; }
  await fetch(`https://api.github.com/repos/${repo}/issues`, { method: 'POST', headers: { Authorization: `Bearer ${token}`, Accept: 'application/vnd.github+json' }, body: JSON.stringify({ title, body, labels: ['inbox'] }) });
}

async function sortMessages(items) {
  if (!items.length) return [];
  const cfg = config();
  const res = await askJSON({
    effort: cfg.models.replies_effort,
    system: `You answer comments and DMs for the Instagram page ${cfg.handle} (practical AI for D2C and ecommerce brands, run by Prashant). Voice:\n${readText(P('brand/voice.md'))}\n\nFree tools and their links: ${Object.entries(cfg.keywords).map(([k, v]) => `${k} = ${v.title} (${toolLink(k)})`).join('; ')}.`,
    validate: (v) => (Array.isArray(v.items) && v.items.length === items.length && v.items.every((x) => ['reply', 'escalate', 'ignore'].includes(x.action)) ? [] : [`return {"items":[...]} with exactly ${items.length} entries, each action reply|escalate|ignore`]),
    prompt: `For each message decide:
- "reply": questions about the content or tools, thanks, simple feedback. Write a short, warm, human reply (1-2 sentences, no hashtags, no em dashes, at most one emoji). Point to a free tool link only if it truly answers them. Never promise prices, timelines, results or anything Prashant hasn't said.
- "escalate": ${cfg.replies.escalate.join(', ')}, angry or upset people, anything you're unsure about. Give a one-line summary for Prashant.
- "ignore": spam, bots, emoji-only, "nice".
Messages:\n${items.map((x, i) => `${i}. [${x.kind} on "${x.context}"] @${x.username}: ${x.text}`).join('\n')}

Return JSON only: {"items":[{"action":"reply","text":"..."} | {"action":"escalate","summary":"..."} | {"action":"ignore"}]}`,
  });
  return res.items;
}

async function run() {
  const cfg = config(); const st = readJSON(STATE, { comments: {}, dms: {} }); const posts = postByMedia();
  const me = (process.env.IG_USERNAME || cfg.handle).replace('@', '').toLowerCase();
  let budget = cfg.limits.max_auto_replies_per_run; const todo = [];

  for (const m of await ig.recentMedia(12)) {
    if (Date.now() - new Date(m.timestamp) > 7 * DAY) continue; // private replies only work within 7 days
    const kw = posts[m.id]?.keyword || keywordIn(m.caption);
    const list = await ig.comments(m.id);
    const replies = list.reduce((n, c) => n + (c.replies?.data?.length || 0), 0);
    if ((m.comments_count || 0) > list.length + replies) {
      log(`WARNING: ${m.comments_count - list.length - replies} comment(s) on post ${m.id} are hidden from the agent. Usual causes: the Meta app is not published (Live), or the comments come from private or teen accounts, which Instagram never shares with apps.`);
    }
    st.sent ||= {}; // "<post>:<person>" -> true, so a person gets each post's tool once
    for (const c of list) {
      const who = (c.username || c.from?.username || '').toLowerCase(), whoId = c.from?.id || who;
      if (st.comments[c.id] || who === me || (whoId && whoId === process.env.IG_USER_ID)) continue;
      if ((c.replies?.data || []).some((r) => (r.username || r.from?.username || '').toLowerCase() === me)) { st.comments[c.id] = 'already'; continue; }
      if (cfg.replies.keyword_dm && kw && new RegExp(`\\b${kw}\\b`, 'i').test(c.text || '') && budget-- > 0) {
        const key = `${m.id}:${whoId}`;
        if (whoId && st.sent[key]) { st.comments[c.id] = 'keyword-repeat'; log('already sent', kw, 'to', '@' + (who || whoId)); continue; }
        const link = toolLink(kw);
        try {
          await ig.privateReply(c.id, `Here's the ${cfg.keywords[kw]?.title || 'free tool'} 👇\n${link}\nCopy the prompt, paste it into Claude, and add your own details where it says. Tell me what it finds!`);
          const pub = cfg.replies.public_keyword_replies; await ig.replyToComment(c.id, pub[Math.floor(Math.random() * pub.length)]);
          st.comments[c.id] = 'keyword'; if (whoId) st.sent[key] = true; log('keyword DM sent', kw, '@' + (who || whoId));
        } catch (e) { log('keyword DM failed', c.id, e.message); st.comments[c.id] = 'failed'; }
        continue;
      }
      todo.push({ kind: 'comment', id: c.id, username: who || 'someone', text: c.text, context: (m.caption || '').split('\n')[0].slice(0, 80) });
    }
  }
  try {
    for (const conv of await ig.conversations()) {
      const last = conv.messages?.data?.[0]; if (!last || st.dms[last.id]) continue;
      const fromMe = (last.from?.username || '').toLowerCase() === me || last.from?.id === process.env.IG_USER_ID;
      if (fromMe || Date.now() - new Date(last.created_time) > DAY) { st.dms[last.id] = 'skip'; continue; }
      todo.push({ kind: 'dm', id: last.id, from: last.from?.id, username: last.from?.username, text: last.message, context: 'direct message' });
    }
  } catch (e) { log('DM inbox not readable yet:', e.message); }

  const batch = todo.slice(0, Math.max(0, budget));
  const decisions = await sortMessages(batch);
  const escalations = [];
  for (let i = 0; i < batch.length; i++) {
    const x = batch[i], d = decisions[i]; const book = x.kind === 'dm' ? st.dms : st.comments;
    try {
      if (d.action === 'reply' && cfg.replies.auto_reply_questions) {
        if (x.kind === 'dm') await ig.sendMessage(x.from, d.text); else await ig.replyToComment(x.id, d.text);
        book[x.id] = 'replied'; log('replied', x.kind, '@' + x.username);
      } else if (d.action === 'escalate' || (d.action === 'reply' && !cfg.replies.auto_reply_questions)) {
        // the repo is public: DM contents never go into an issue, only that a DM is waiting
        escalations.push(x.kind === 'dm'
          ? `- A **direct message** from @${x.username} needs your reply. Open the Instagram inbox to read it.`
          : `- **@${x.username}** commented on "${x.context}": ${x.text}\n  - ${d.summary || 'Suggested reply: ' + d.text}`);
        book[x.id] = 'escalated';
      } else book[x.id] = 'ignored';
    } catch (e) { log('reply failed', x.id, e.message); book[x.id] = 'failed'; }
  }
  if (escalations.length) await openIssue(`Inbox: ${escalations.length} message${escalations.length > 1 ? 's' : ''} need you`, `The agent didn't answer these. Reply on Instagram yourself, then close this issue.\n\n${escalations.join('\n')}`);
  writeJSON(STATE, st);
  log(`engage done: ${batch.length} sorted, ${escalations.length} escalated`);
}

module.exports = { run };
