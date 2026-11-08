// Compare reel: one example chat, one prompt, three free plans, scored on two questions.
// BLOCKED: the payoff (s5) and the pick pill read short {{TOKENS}} in scene.html that come only from the real run (see post.json "_pending").
// Nothing here invents a result; rank 1 is always the top row, so no token is needed in this file.
const OUT = 'expo.out', POP = 'back.out(1.8)';
const span = (n) => T.end(n) - T.voice(n);
const at = (n, f) => T.voice(n) + f * span(n);
const title = (s, t) => tl.fromTo(`${s} .title .l`, { yPercent: 110 }, { yPercent: 0, duration: 0.55, ease: OUT, stagger: 0.08 }, t);
const step = (s, t) => tl.fromTo(`${s} .step`, { x: -40, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4, ease: OUT }, t);
const card = (id, t) => tl.fromTo(id, { y: 90, opacity: 0, scale: 0.96 }, { y: 0, opacity: 1, scale: 1, duration: 0.55, ease: OUT }, t);
const late = (id, t) => tl.fromTo(id, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.35, ease: OUT }, t);
const chip = (id, t) => {
  tl.fromTo(id, { scale: 0, opacity: 0 }, { scale: 1.12, opacity: 1, duration: 0.22, ease: 'power2.out' }, t);
  tl.to(id, { scale: 1, duration: 0.18, ease: 'power2.inOut' }, t + 0.22);
};
const shake = (id, t, px = 8) => tl.fromTo(id, { x: 0 }, { x: px, duration: 0.05, repeat: 5, yoyo: true, ease: 'none' }, t);
const bump = (id, t) => tl.fromTo(id, { scale: 1 }, { scale: 1.05, duration: 0.18, yoyo: true, repeat: 1, ease: 'sine.inOut' }, t);

// texture: two soft orbs drift for the whole reel
tl.fromTo('#orb1', { x: 0, y: 0 }, { x: 160, y: -120, duration: T.dur, ease: 'sine.inOut' }, 0);
tl.fromTo('#orb2', { x: 0, y: 0 }, { x: -180, y: -160, duration: T.dur, ease: 'sine.inOut' }, 0);

// progress bar: one segment per line after the hook
const segs = [1, 2, 3, 4, 5, 6, 7, 8, 9];
tl.set(segs.map((n) => `#p${n}`), { scaleX: 0 }, 0);
segs.forEach((n) => tl.to(`#p${n}`, { scaleX: 1, duration: 0.5, ease: 'power2.out' }, T.at(n)));

// 0. hook: the title is on screen at frame 0; the amber highlighter slams under "due date" on the thud
tl.fromTo('#s0-title', { scale: 1.06 }, { scale: 1, duration: 0.7, ease: OUT }, 0);
tl.fromTo('#s0-hl', { scaleX: 0 }, { scaleX: 1, duration: 0.4, ease: 'power3.out' }, T.voice(0) + 0.45);
['#b1', '#b2', '#b3'].forEach((id, i) => tl.fromTo(id, { y: 0 }, { y: -14, duration: 1.2, yoyo: true, repeat: 3, ease: 'sine.inOut' }, 0.2 * i));
tl.fromTo('#b4', { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: POP }, T.voice(0) + 0.7);
bump('#s0-badge', at(0, 0.55));
tl.fromTo('#b4', { rotation: 0 }, { rotation: 8, duration: 0.08, repeat: 5, yoyo: true, ease: 'sine.inOut' }, at(0, 0.82));

// 1. home from office: the unread counter runs up while messages pile in
step('#s1', T.at(1)); title('#s1', T.at(1) + 0.05); card('#s1-card', T.at(1) + 0.15);
const unread = { v: 0 };
tl.fromTo(unread, { v: 0 }, { v: 300, duration: 1.6, ease: 'power2.out', onUpdate: () => { document.getElementById('s1-count').textContent = String(Math.round(unread.v)); } }, T.voice(1) + 0.1);
['#m1', '#m2', '#m3', '#m4', '#m5'].forEach((id, i) => tl.fromTo(id, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: OUT }, at(1, 0.12) + i * 0.07));
bump('#s1-count', at(1, 0.8));
late('#s1-note', at(1, 0.85));

// 2. the chai stall friend: 300 messages become 3 lines, the DO line bumps on "matters"
step('#s2', T.at(2)); title('#s2', T.at(2) + 0.05);
tl.fromTo('#s2-card', { scale: 1.08, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.5, ease: OUT }, T.at(2) + 0.12);
[['#e1', '#e1c', 0.2], ['#e2', '#e2c', 0.4], ['#e3', '#e3c', 0.58]].forEach(([r, c, f]) => {
  tl.fromTo(r, { x: 60, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4, ease: OUT }, at(2, f));
  chip(c, at(2, f) + 0.08);
});
bump('#e1', at(2, 0.86));
late('#s2-note', at(2, 0.9));

// 3. the test: the prompt types in, three columns land, one prompt drops into each (pop)
step('#s3', T.at(3)); title('#s3', T.at(3) + 0.05);
tl.fromTo('#s3-prompt', { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.45, ease: OUT }, T.at(3) + 0.12);
tl.fromTo('#s3-pt', { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 0.6, ease: 'steps(18)' }, T.at(3) + 0.3);
['#s3-c1', '#s3-c2', '#s3-c3'].forEach((id, i) => card(id, T.at(3) + 0.25 + i * 0.08));
late('#s3-note', T.at(3) + 0.6);
['#s3-k1', '#s3-k2', '#s3-k3'].forEach((id, i) => tl.fromTo(id, { y: -80, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: POP }, T.voice(3) + 0.9 + i * 0.08));

// 4. the two questions: headers drop as they are asked, empty cells wait, "Invented?" buzzes
step('#s4', T.at(4)); title('#s4', T.at(4) + 0.05); card('#s4-card', T.at(4) + 0.15);
['#t1', '#t2', '#t3'].forEach((id, i) => tl.fromTo(id, { x: 60, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4, ease: OUT }, T.at(4) + 0.35 + i * 0.07));
tl.fromTo('#s4-h1', { y: -30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: POP }, at(4, 0.12));
tl.fromTo('#s4-h2', { y: -30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: POP }, at(4, 0.55));
tl.fromTo('#s4 .cell', { opacity: 0.4 }, { opacity: 1, duration: 0.3, yoyo: true, repeat: 3, ease: 'sine.inOut', stagger: 0.05 }, at(4, 0.2));
shake('#s4-h2', T.voice(4) + 1.4, 8);
late('#s4-note', at(4, 0.85));

// 5. the result (whistle): real results fill the ranked card, due-date column on the ding, row 1 bumps
step('#s5', T.at(5)); title('#s5', T.at(5) + 0.05); card('#s5-card', T.at(5) + 0.15);
late('#s5-h1', T.at(5) + 0.35); late('#s5-h2', T.at(5) + 0.42);
['#k1', '#k2', '#k3'].forEach((id, i) => tl.fromTo(id, { x: 70, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4, ease: OUT }, T.at(5) + 0.3 + i * 0.08));
['#k1d', '#k2d', '#k3d'].forEach((id, i) => chip(id, T.voice(5) + 0.8 + i * 0.08));
['#k1v', '#k2v', '#k3v'].forEach((id, i) => chip(id, at(5, 0.72) + i * 0.08));
bump('#k1', at(5, 0.92));
late('#s5-note', T.end(5));

// 6. the pick: the dark pill pops under the ranked card
tl.fromTo('#s6-pick', { scale: 0.7, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.42, ease: POP }, T.at(6) + 0.05);

// 7. the catch: the number is struck out, then the paste meter hits its cap
step('#s7', T.at(7)); title('#s7', T.at(7) + 0.05); card('#s7-card', T.at(7) + 0.15);
late('#s7-l1', T.at(7) + 0.35);
tl.fromTo('#s7-msg', { x: 60, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4, ease: OUT }, T.at(7) + 0.4);
tl.fromTo('#s7-strike', { scaleX: 0 }, { scaleX: 1, duration: 0.3, ease: 'power3.in' }, at(7, 0.22));
tl.fromTo('#s7-mt', { opacity: 1 }, { opacity: 0.35, duration: 0.25, ease: 'power2.out' }, at(7, 0.22) + 0.3);
chip('#s7-del', at(7, 0.22) + 0.3);
late('#s7-l2', at(7, 0.48));
tl.fromTo('#s7-track', { opacity: 0 }, { opacity: 1, duration: 0.3, ease: OUT }, at(7, 0.5));
tl.fromTo('#s7-fill', { scaleX: 0 }, { scaleX: 1, duration: 0.8, ease: 'power2.out' }, at(7, 0.55));
tl.fromTo('#s7-over', { opacity: 0 }, { opacity: 1, duration: 0.3, ease: OUT }, at(7, 0.55) + 0.8);
tl.fromTo('#s7-cap', { scaleY: 2.2, opacity: 0 }, { scaleY: 1, opacity: 1, duration: 0.22, ease: 'power4.in' }, at(7, 0.55) + 0.75);
shake('#s7-track', at(7, 0.55) + 0.97, 6);
late('#s7-capl', at(7, 0.55) + 1.0);
late('#s7-tip', at(7, 0.88));
late('#s7-note', T.end(7));

// 8. send this: the bell gets its slash, the muted group and the missed meeting land
title('#s8', T.at(8));
tl.fromTo('#bell', { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.45, ease: POP }, T.at(8) + 0.2);
tl.fromTo('#slash', { strokeDashoffset: 210 }, { strokeDashoffset: 0, duration: 0.35, ease: 'power3.out' }, T.voice(8) + 0.6);
tl.fromTo('#bell', { rotation: 0 }, { rotation: 10, duration: 0.07, repeat: 5, yoyo: true, ease: 'sine.inOut' }, T.voice(8) + 0.95);
late('#s8-who', T.voice(8) + 0.3);
card('#s8-card', at(8, 0.35));
chip('#g1c', at(8, 0.5));
chip('#g2c', at(8, 0.8));

// 9. the keyword: Save., the bookmark drops, RECAP letters fall in on the pop
title('#s9', T.at(9));
tl.fromTo('#bm', { y: -60, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: 'back.out(2)' }, T.at(9) + 0.15);
tl.fromTo('#s9-pill', { scale: 0.7, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.45, ease: POP }, T.at(9) + 0.1);
late('#s9-cl', T.at(9) + 0.35);
['#w1', '#w2', '#w3', '#w4', '#w5'].forEach((id, i) => tl.fromTo(id, { y: -90, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: 'back.out(2)' }, T.voice(9) + 0.4 + i * 0.07));
tl.fromTo('#s9-tag', { scale: 0, opacity: 0, rotation: -10 }, { scale: 1, opacity: 1, rotation: -4, duration: 0.4, ease: POP }, T.voice(9) + 1.0);
bump('#s9-pill', T.end(9) + 0.2);
