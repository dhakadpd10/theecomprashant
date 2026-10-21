// Checks a story-reel post.json (docs/STORY.md) before anything is recorded or rendered. Returns a list of problems.
const words = (s = '') => String(s).trim().split(/\s+/).filter(Boolean).length;

const STORY = {
  who: ['bunty', 'prashant'],
  shots: ['two', 'bunty', 'prashant', 'bunty-push', 'prashant-push', 'phone', 'wide'],
  acts: ['explain', 'point', 'phone', 'facepalm', 'celebrate', 'shrug', 'think', 'arms', 'idle', 'sign'],
  moods: ['normal', 'happy', 'excited', 'smug', 'worried', 'sad', 'angry', 'shock'],
  screens: ['chat', 'page', 'whatsapp', 'stats', 'list', 'ad', 'notify'],
  sfx: ['fail', 'ding', 'boing', 'cash', 'buzz', 'scratch', 'pop'],
};
// the worst AI tells from Corey Haines' copywriting skill (skills/marketingskills/ai-tells.md)
const AI_TELLS = [
  [/\bit'?s not (just )?[^.!?]{1,40}[,;.] ?it'?s\b/i, '"it\'s not X, it\'s Y"'],
  [/\bnot because\b[^.!?]*\. because\b/i, '"not because X. Because Y."'],
  [/\bgame[- ]?changer\b/i, '"game-changer"'], [/\bunlock\b/i, '"unlock"'], [/\bsay goodbye to\b/i, '"say goodbye to"'],
  [/\bhere'?s the (thing|secret)\b/i, '"here\'s the thing"'], [/\blevel up\b/i, '"level up"'], [/—/, 'an em dash'],
  [/\bthe (result|catch|best part)\s*[?:]/i, 'a self-answered question or colon reveal'],
];

// the reel language follows story/cast.json ("hi" = spoken Hindi in Devanagari, captions in Hinglish Roman letters)
const CAST_LANG = (() => { try { return require('../story/cast.json').language || 'en'; } catch { return 'en'; } })();
const DEVA = /[ऀ-ॿ]/, DEVA_ALL = /[ऀ-ॿ]/g;

function validateStory(p, { keywords, hindi = CAST_LANG === 'hi' } = {}) {
  const e = [];
  if (hindi) {
    // the voice reads "say" (Hindi in Devanagari; tool names like Claude, Meta, WhatsApp may stay in English letters);
    // viewers read "show", "hook", "sign" and "hot" (Hinglish in Roman letters: the caption fonts have no Devanagari)
    for (const [k, v] of [['hook', p.hook], ['sign', p.sign], ['hot', (p.hot || []).join(' ')]]) if (DEVA.test(v || '')) e.push(`${k} must be Hinglish in Roman letters, no Devanagari`);
    (p.beats || []).forEach((b, i) => {
      const letters = String(b.say || '').replace(/[^\p{L}]/gu, ''), deva = (String(b.say || '').match(DEVA_ALL) || []).length;
      if (!letters || deva / letters.length < 0.6) e.push(`beats[${i}].say must be spoken Hindi written in Devanagari (English only for tool names)`);
      if (!b.show) e.push(`beats[${i}] needs "show": the same line in Hinglish Roman letters for the captions`);
      else if (DEVA.test(b.show)) e.push(`beats[${i}].show must be Hinglish in Roman letters, no Devanagari`);
      // captions and camera cuts follow the spoken words one for one, so "show" is the same words, transliterated
      else if (Math.abs(words(b.show) - words(b.say)) > 2) e.push(`beats[${i}].show has ${words(b.show)} words but say has ${words(b.say)}; write show as the same words, word for word, in Roman letters`);
    });
    p = { ...p, beats: (p.beats || []).map((b) => ({ ...b, say: b.show || b.say })) }; // count and check the words as viewers read them
  }
  if (!p.id || !/^[a-z0-9-]+$/.test(p.id)) e.push('id must be lowercase-with-dashes');
  if (p.style !== 'story') e.push('style must be "story"');
  if (!p.keyword || !/^[A-Z]+$/.test(p.keyword)) e.push('keyword must be one uppercase word');
  if (keywords && !keywords.includes(p.keyword)) e.push(`keyword ${p.keyword} has no free tool`);
  if (!p.hook || words(p.hook) > 6) e.push('hook must be 6 words or fewer');
  const sl = String(p.sign || '').split('\n');
  if (!p.sign || sl.length < 2 || sl.length > 4 || sl.some((l) => l.length > 22)) e.push('sign must be 2 to 4 lines (joined with \\n) of 22 characters or fewer');
  if (p.cover?.mood && !STORY.moods.includes(p.cover.mood)) e.push(`cover.mood must be one of ${STORY.moods.join(' ')}`);
  const bs = Array.isArray(p.beats) ? p.beats : [];
  if (bs.length < 6 || bs.length > 9) e.push('beats must have 6 to 9 entries (docs/VIRAL.md: 15 to 25 seconds)');
  const total = bs.reduce((n, b) => n + words(b.say), 0);
  if (total < 40 || total > 80) e.push(`the spoken words add up to ${total}; keep it to 45 to 70 (15 to 25 seconds); short reels get watched to the end`);
  bs.forEach((b, i) => {
    const at = `beats[${i}]`;
    if (!STORY.who.includes(b.who)) e.push(`${at}.who must be bunty or prashant`);
    if (!b.say) e.push(`${at} needs "say"`);
    if (words(b.say) > 14) e.push(`${at}.say is ${words(b.say)} words; 14 or fewer`);
    if (i === 0 && words(b.say) > 10) e.push('beats[0] is the hook: 10 spoken words or fewer, payoff or shock first');
    if (!hindi && /\d/.test(b.say || '')) e.push(`${at}.say has digits; spell numbers as words in "say" and put digits in "show"`);
    if (!hindi && /^\s*claude\b/i.test(b.say || '')) e.push(`${at}.say starts with "Claude"; the voice garbles it there, reword`);
    for (const [re, name] of AI_TELLS) if (re.test(b.say || '') || re.test(b.show || '')) e.push(`${at} uses ${name}, an AI tell; say it the way a person talks`);
    if (b.shot && !STORY.shots.includes(b.shot)) e.push(`${at}.shot must be one of ${STORY.shots.join(' ')}`);
    if (b.act && !STORY.acts.includes(b.act)) e.push(`${at}.act must be one of ${STORY.acts.join(' ')}`);
    if (b.mood && !STORY.moods.includes(b.mood)) e.push(`${at}.mood must be one of ${STORY.moods.join(' ')}`);
    if (b.other && ((b.other.act && !STORY.acts.includes(b.other.act)) || (b.other.mood && !STORY.moods.includes(b.other.mood)))) e.push(`${at}.other has an unknown act or mood`);
    for (const f of b.sfx || []) if (!STORY.sfx.includes(f)) e.push(`${at}.sfx "${f}" must be one of ${STORY.sfx.join(' ')}`);
    if (b.shot === 'phone') {
      const sc = b.screen;
      if (!sc || !STORY.screens.includes(sc.type)) e.push(`${at} is a phone shot: it needs a screen with type ${STORY.screens.join(' | ')}`);
      else if (sc.type === 'chat' && (!sc.ask || !sc.answer || words(sc.ask) > 45 || words(sc.answer) > 45)) e.push(`${at}.screen chat needs ask and answer of 45 words or fewer`);
      else if (sc.type === 'page' && (!Array.isArray(sc.lines) || sc.lines.length < 1 || sc.lines.length > 4)) e.push(`${at}.screen page needs 1 to 4 lines`);
      else if (sc.type === 'whatsapp' && (!Array.isArray(sc.msgs) || !sc.msgs.length || sc.msgs.length > 4)) e.push(`${at}.screen whatsapp needs 1 to 4 msgs`);
      else if (sc.type === 'list' && (!Array.isArray(sc.items) || sc.items.length < 2 || sc.items.length > 5)) e.push(`${at}.screen list needs 2 to 5 items`);
      else if (sc.type === 'stats' && (typeof sc.from !== 'number' || typeof sc.to !== 'number')) e.push(`${at}.screen stats needs numeric from and to`);
    } else if (b.screen) e.push(`${at} has a screen but its shot is not "phone"`);
  });
  const phones = bs.filter((b) => b.shot === 'phone').length;
  if (phones < 2 || phones > 3) e.push(`use the phone shot for 2 or 3 beats (now ${phones})`);
  if (bs[0] && bs[0].who !== 'bunty') e.push('the first beat is Bunty with the problem');
  const last = bs[bs.length - 1];
  if (last && (!last.cta || !new RegExp(`\\b${p.keyword}\\b`, 'i').test(last.say || ''))) e.push(`the last beat needs "cta": true and must say the keyword ${p.keyword}`);
  if (bs.filter((b) => b.cta).length !== 1) e.push('exactly one beat has "cta": true (the last one)');
  if (p.musicStop !== undefined && (!Number.isInteger(p.musicStop) || p.musicStop < 3 || p.musicStop >= bs.length)) e.push('musicStop must be the index of the twist beat');
  return e;
}

module.exports = { STORY, validateStory };
