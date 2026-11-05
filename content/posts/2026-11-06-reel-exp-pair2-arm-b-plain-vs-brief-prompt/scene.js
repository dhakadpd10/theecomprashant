// Prompt explainer (pair 2, arm B): a 1-line ask gets a generic wall; role + goal + format gets the update.
// Analogy: "one chai" vs "cutting, less sugar, extra adrak". Enters expo.out, pops back.out, slams power4.in.
const OUT = 'expo.out', POP = 'back.out(1.8)';
const span = (n) => T.end(n) - T.voice(n);
const sp = (n, f) => T.voice(n) + f * span(n);
const title = (s, t) => tl.fromTo(s + ' .title .l', { yPercent: 110 }, { yPercent: 0, duration: 0.55, ease: OUT, stagger: 0.08 }, t);
const step = (s, t) => tl.fromTo(s + ' .step', { x: -40, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4, ease: OUT }, t);
const card = (id, t, d = 0.6) => tl.fromTo(id, { y: 110, opacity: 0, scale: 0.96 }, { y: 0, opacity: 1, scale: 1, duration: d, ease: OUT }, t);
const late = (id, t) => tl.fromTo(id, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.35, ease: OUT }, t);
const chip = (id, t) => {
  tl.fromTo(id, { scale: 0, opacity: 0 }, { scale: 1.12, opacity: 1, duration: 0.22, ease: 'power2.out' }, t);
  tl.to(id, { scale: 1, duration: 0.18, ease: 'power2.inOut' }, t + 0.22);
};
const wipe = (id, t, d = 0.5) => tl.fromTo(id, { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: d, ease: 'steps(22)' }, t);
const bump = (id, t, s = 1.05) => tl.fromTo(id, { scale: 1 }, { scale: s, duration: 0.15, yoyo: true, repeat: 1, ease: 'sine.inOut', immediateRender: false }, t);
const shake = (id, t, px = 8) => tl.fromTo(id, { x: 0 }, { x: px, duration: 0.05, repeat: 5, yoyo: true, ease: 'none', immediateRender: false }, t);

// ambient: two soft orbs drift for the whole reel
tl.fromTo('#orb1', { x: 0, y: 0 }, { x: 160, y: -120, duration: T.dur, ease: 'sine.inOut' }, 0);
tl.fromTo('#orb2', { x: 0, y: 0 }, { x: -180, y: -160, duration: T.dur, ease: 'sine.inOut' }, 0);

// progress bar: one segment per beat
tl.set(['#p2', '#p3', '#p4', '#p5', '#p6', '#p7', '#p8'], { scaleX: 0 }, 0);
tl.set('#p1', { scaleX: 1 }, 0);
[['#p2', 1], ['#p3', 2], ['#p4', 4], ['#p5', 5], ['#p6', 6], ['#p7', 7], ['#p8', 8]].forEach(([id, n]) => tl.to(id, { scaleX: 1, duration: 0.5, ease: 'power2.out' }, T.at(n)));

// 0. hook: title on screen at frame 0, "1-line" gets struck on the thud, the 3 THINGS badge pops on "three things"
tl.fromTo('#s0-title .l', { yPercent: 0 }, { yPercent: 0, duration: 0.01 }, 0);
tl.fromTo('#s0-title', { scale: 1.06 }, { scale: 1, duration: 0.7, ease: OUT }, 0);
tl.fromTo('#s0-step', { opacity: 0.6 }, { opacity: 1, duration: 0.3, ease: 'power2.out' }, 0);
tl.fromTo('#s0-strike', { scaleX: 0 }, { scaleX: 1, duration: 0.25, ease: 'power4.in' }, T.voice(0) + 0.15);
shake('#s0-x', T.voice(0) + 0.4, 6);
tl.fromTo('#s0-badge', { scale: 0, opacity: 0, rotation: -25 }, { scale: 1, opacity: 1, rotation: 0, duration: 0.45, ease: POP }, sp(0, 0.7));
bump('#s0-badge', T.end(0) - 0.2, 1.08);

// 1. same ask, two answers: the question bubble, then a red wall vs five blue bullets
step('#s1', T.at(1)); title('#s1', T.at(1) + 0.05); card('#s1-card', T.at(1) + 0.15);
tl.fromTo('#s1-q', { scale: 0.6, opacity: 0, y: 20 }, { scale: 1, opacity: 1, y: 0, duration: 0.4, ease: POP }, T.voice(1) + 0.15);
tl.fromTo('#s1-a', { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.45, ease: OUT }, sp(1, 0.42));
tl.fromTo('#s1-b', { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.45, ease: OUT }, sp(1, 0.42) + 0.08);
chip('#s1-a .chip', sp(1, 0.42) + 0.1); chip('#s1-b .chip', sp(1, 0.42) + 0.18);
tl.fromTo('#s1-a .sk', { scaleX: 0 }, { scaleX: 1, duration: 0.3, ease: 'power3.out', stagger: 0.04 }, sp(1, 0.42) + 0.15);
tl.fromTo('#s1-b .bl', { scaleX: 0 }, { scaleX: 1, duration: 0.3, ease: 'power3.out', stagger: 0.07 }, sp(1, 0.42) + 0.25);
late('#s1-a .lbl', sp(1, 0.42) + 0.75); late('#s1-b .lbl', sp(1, 0.42) + 0.82);

// 2. the 1-line way: it types, the generic wall floods in on the buzz, the word count runs, GENERIC slams
step('#s2', T.at(2)); title('#s2', T.at(2) + 0.05); card('#s2-card', T.at(2) + 0.15);
late('#s2-l1', T.at(2) + 0.35);
wipe('#s2-in-t', T.at(2) + 0.4, 0.55);
chip('#s2-in-c', T.at(2) + 0.95);
late('#s2-l2', T.voice(2) + 0.85);
chip('#s2-count', T.voice(2) + 0.9);
tl.fromTo('#s2-wall-t', { clipPath: 'inset(0 0 100% 0)' }, { clipPath: 'inset(0 0 0% 0)', duration: 1.3, ease: 'power2.out' }, T.voice(2) + 1.0);
const words = { v: 0 };
tl.fromTo(words, { v: 0 }, { v: 240, duration: 1.4, ease: 'power3.out', onUpdate: () => { document.getElementById('s2-count').textContent = Math.round(words.v) + ' WORDS'; } }, T.voice(2) + 1.0);
tl.fromTo('#s2-stamp', { scale: 2.4, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.22, ease: 'power4.in' }, sp(2, 0.8));
shake('#s2-card', sp(2, 0.8) + 0.22, 10);

// 3. the analogy: "one chai, please", and the stall has to guess size, sugar, ginger
step('#s3', T.at(3)); title('#s3', T.at(3) + 0.05); card('#s3-card', T.at(3) + 0.12);
late('#s3-l', T.at(3) + 0.35);
tl.fromTo('#s3-order', { x: 60, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4, ease: OUT }, T.at(3) + 0.3);
tl.fromTo('#s3-cup', { rotation: -12 }, { rotation: 0, duration: 0.5, ease: POP }, T.at(3) + 0.4);
['#s3-r1', '#s3-r2', '#s3-r3'].forEach((id, i) => tl.fromTo(id, { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.35, ease: OUT }, T.voice(3) + 0.35 + i * 0.07));
['#s3-q1', '#s3-q2', '#s3-q3'].forEach((id, i) => chip(id, T.voice(3) + 0.65 + i * 0.08));
tl.fromTo('#s3 .orow .chip', { rotation: 0 }, { rotation: 10, duration: 0.08, repeat: 5, yoyo: true, ease: 'sine.inOut', immediateRender: false }, T.voice(3) + 1.05);

// 4-6. the brief: three dashed slots, each fills on its line (chip pops on the pop sfx, words type in)
step('#s4', T.at(4)); title('#s4', T.at(4) + 0.05); card('#s4-card', T.at(4), 0.45);
late('#s4-l', T.at(4) + 0.3);
tl.fromTo('#s4-ask', { x: 60, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4, ease: OUT }, T.at(4) + 0.08);
['#s4-r1', '#s4-r2', '#s4-r3'].forEach((id, i) => tl.fromTo(id, { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.3, ease: OUT }, T.at(4) + 0.1 + i * 0.05));
[
  ['#s4-r1', '#s4-c1', '#s4-t1', 4, 0.4],
  ['#s4-r2', '#s4-c2', '#s4-t2', 5, 0.18],
  ['#s4-r3', '#s4-c3', '#s4-t3', 6, 0.18],
].forEach(([row, c, txt, n, f]) => {
  const t = T.voice(n) + 0.1;
  tl.fromTo(row, { backgroundColor: 'rgba(238,241,255,0)', borderColor: 'rgba(30,26,22,0.22)' }, { backgroundColor: 'rgba(238,241,255,1)', borderColor: 'rgba(47,75,216,0.5)', duration: 0.3, ease: 'power2.out' }, t);
  tl.fromTo(c, { opacity: 0.3, scale: 0.9 }, { opacity: 1, scale: 1.12, duration: 0.2, ease: 'power2.out' }, t);
  tl.to(c, { scale: 1, duration: 0.16, ease: 'power2.inOut' }, t + 0.2);
  wipe(txt, sp(n, f), 0.55);
  bump(row, sp(n, f) + 0.6, 1.03);
});

// 7. the payoff: the chai order lands, the finished 5-bullet update fills the card, a green tick on "done"
step('#s7', T.at(7)); title('#s7', T.at(7) + 0.05); card('#s7-card', T.at(7) + 0.1);
late('#s7-l', T.at(7) + 0.4);
[['#s7-k1', 0.05], ['#s7-k2', 0.19], ['#s7-k3', 0.32]].forEach(([id, f]) => tl.fromTo(id, { y: -50, opacity: 0, scale: 0.8 }, { y: 0, opacity: 1, scale: 1, duration: 0.35, ease: POP }, sp(7, f)));
['#s7-r1', '#s7-r2', '#s7-r3', '#s7-r4', '#s7-r5'].forEach((id, i) => tl.fromTo(id, { x: 60, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4, ease: OUT }, T.at(7) + 0.3 + i * 0.07));
tl.fromTo('#s7 .res .chip', { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.35, ease: POP, stagger: 0.07 }, T.at(7) + 0.45);
tl.fromTo('#s7-tick', { scale: 0, rotation: -30 }, { scale: 1, rotation: 0, duration: 0.4, ease: POP }, sp(7, 0.86));
bump('#s7-card', sp(7, 0.86) + 0.1, 1.04);

// 8. the catch: the warning lands first, then what you give vs what AI fixes
step('#s8', T.at(8)); title('#s8', T.at(8) + 0.05); card('#s8-card', T.at(8) + 0.12);
tl.fromTo('#s8-warn', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: OUT }, sp(8, 0.12));
chip('#s8-bang', sp(8, 0.12) + 0.15);
shake('#s8-warn', sp(8, 0.12) + 0.5, 6);
late('#s8-h1', sp(8, 0.5)); late('#s8-h2', sp(8, 0.72));
['#s8-a1', '#s8-a2', '#s8-a3'].forEach((id, i) => tl.fromTo(id, { x: -40, opacity: 0 }, { x: 0, opacity: 1, duration: 0.35, ease: OUT }, sp(8, 0.55) + i * 0.08));
['#s8-b1', '#s8-b2', '#s8-b3'].forEach((id, i) => tl.fromTo(id, { x: 40, opacity: 0 }, { x: 0, opacity: 1, duration: 0.35, ease: OUT }, sp(8, 0.78) + i * 0.08));

// 9. send this, then the keyword drops in letter by letter and bounces on "Comment BRIEF"
tl.fromTo('#s9-send', { yPercent: 40, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.6, ease: OUT }, T.at(9));
late('#s9-who', T.voice(9) + 0.35);
card('#s9-card', T.voice(9) + 0.9);
tl.fromTo('#s9-av', { scale: 0 }, { scale: 1, duration: 0.4, ease: POP }, T.voice(9) + 1.1);
late('#s9-l', T.voice(9) + 1.2);
tl.fromTo('#s9-word .lt', { y: -140, opacity: 0 }, { y: 0, opacity: 1, duration: 0.45, ease: 'back.out(1.6)', stagger: 0.07 }, T.voice(9) + 1.35);
late('#s9-l2', T.voice(9) + 1.9);
tl.fromTo('#s9-word .lt', { y: 0 }, { y: -28, duration: 0.15, yoyo: true, repeat: 1, ease: 'sine.inOut', stagger: 0.06, immediateRender: false }, sp(9, 0.8));
tl.fromTo('#s9-pill', { scale: 0.6, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.45, ease: POP }, sp(9, 0.88));
bump('#s9-word', T.end(9) + 0.35, 1.08);
