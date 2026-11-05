// Prompt explainer: a plain ask vs a brief. Analogy: ordering "one chai" vs ordering like a regular.
// Moves: before/after thumbnails, a vague reply dumping in, chai order with guesses, brief slots filling,
// a full prompt box that types and sends, the finished 5-line update, a you/AI split, and the keyword drop.
const OUT = 'expo.out', POP = 'back.out(1.8)';
const span = (n) => T.end(n) - T.voice(n);
const at = (n, f) => T.voice(n) + f * span(n);
const title = (s, t) => tl.fromTo(`${s} .title .l`, { yPercent: 110 }, { yPercent: 0, duration: 0.55, ease: OUT, stagger: 0.08 }, t);
const step = (s, t) => tl.fromTo(`${s} .step`, { x: -40, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4, ease: OUT }, t);
const card = (id, t, d = 0.6) => tl.fromTo(id, { y: 110, opacity: 0, scale: 0.96 }, { y: 0, opacity: 1, scale: 1, duration: d, ease: OUT }, t);
const late = (id, t) => tl.fromTo(id, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.35, ease: OUT }, t);
const rowIn = (id, t) => tl.fromTo(id, { x: 60, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4, ease: OUT }, t);
const chip = (id, t) => { // anticipation, then the pop
  tl.fromTo(id, { scale: 0, opacity: 0 }, { scale: 1.12, opacity: 1, duration: 0.22, ease: 'power2.out' }, t);
  tl.to(id, { scale: 1, duration: 0.18, ease: 'power2.inOut' }, t + 0.22);
};
const bump = (id, t, s = 1.05) => tl.fromTo(id, { scale: 1 }, { scale: s, duration: 0.15, yoyo: true, repeat: 1, ease: 'sine.inOut', immediateRender: false }, t);
const shake = (id, t, px = 7) => tl.fromTo(id, { x: 0 }, { x: px, duration: 0.05, repeat: 5, yoyo: true, ease: 'none', immediateRender: false }, t);
const wipe = (id, t, d, n) => tl.fromTo(id, { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: d, ease: `steps(${n})` }, t);
const press = (id, t) => {
  tl.fromTo(id, { scale: 1 }, { scale: 0.88, duration: 0.12, ease: 'power2.in', immediateRender: false }, t);
  tl.to(id, { scale: 1, duration: 0.3, ease: POP }, t + 0.12);
};

// ambient layer
tl.fromTo('#orb1', { x: 0, y: 0 }, { x: 170, y: -110, duration: T.dur, ease: 'sine.inOut' }, 0);
tl.fromTo('#orb2', { x: 0, y: 0 }, { x: -190, y: -150, duration: T.dur, ease: 'sine.inOut' }, 0);

// progress bar: one segment per beat after the hook
const P = ['#p1', '#p2', '#p3', '#p4', '#p5', '#p6', '#p7', '#p8', '#p9'];
tl.set(P, { scaleX: 0 }, 0);
P.forEach((id, i) => tl.to(id, { scaleX: 1, duration: 0.5, ease: 'power2.out' }, T.at(i + 1)));

// 0. hook: title and both answers on screen at frame 0; the verdicts pop as the voice says "different answers"
tl.fromTo('#s0-title .l', { yPercent: 0 }, { yPercent: 0, duration: 0.01 }, 0);
tl.fromTo('#s0-title', { y: 14 }, { y: 0, duration: 0.6, ease: OUT }, 0);
tl.fromTo('#s0-step', { opacity: 0.7 }, { opacity: 1, duration: 0.3 }, 0);
bump('#s0-q', at(0, 0.15), 1.05);
tl.fromTo('#s0-squig-p', { strokeDashoffset: 640 }, { strokeDashoffset: 0, duration: 0.6, ease: 'power2.out' }, at(0, 0.4));
chip('#s0-ca', at(0, 0.62));
shake('#s0-ta', at(0, 0.62) + 0.25, 6);
chip('#s0-cb', at(0, 0.8));
bump('#s0-tb', at(0, 0.8) + 0.2, 1.04);

// 1. the plain ask: the reply dumps in on the buzz, then LONG / VAGUE / USELESS as they're said
step('#s1', T.at(1)); title('#s1', T.at(1) + 0.05); card('#s1-card', T.at(1) + 0.15);
tl.fromTo('#s1-q', { scale: 0.6, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: POP }, T.at(1) + 0.4);
tl.fromTo('#s1-r', { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.35, ease: OUT }, T.voice(1) + 0.55);
tl.fromTo('#s1-rt', { clipPath: 'inset(0 0 100% 0)' }, { clipPath: 'inset(0 0 0% 0)', duration: 0.5, ease: 'steps(5)' }, T.voice(1) + 0.6);
shake('#s1-r', T.voice(1) + 0.9, 7);
['#s1-c1', '#s1-c2', '#s1-c3'].forEach((id, i) => chip(id, at(1, 0.6 + i * 0.13)));

// 2. the analogy: one chai, three guesses the stall makes for you
step('#s2', T.at(2)); title('#s2', T.at(2) + 0.05); card('#s2-card', T.at(2) + 0.15);
tl.fromTo('#s2-cup', { scale: 0.6, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.45, ease: POP }, T.at(2) + 0.35);
late('#s2-ol', T.at(2) + 0.45);
wipe('#s2-order', T.at(2) + 0.5, 0.5, 17);
['#s2-st1', '#s2-st2', '#s2-st3'].forEach((id, i) => tl.fromTo(id, { y: 6, opacity: 0.2 }, { y: -8, opacity: 0.85, duration: 0.6, repeat: 3, yoyo: true, ease: 'sine.inOut' }, T.at(2) + 0.5 + i * 0.15));
['#s2-k1', '#s2-k2', '#s2-k3'].forEach((id, i) => rowIn(id, at(2, 0.2) + i * 0.07));
['#s2-h1', '#s2-h2', '#s2-h3'].forEach((id, i) => chip(id, at(2, 0.55) + i * 0.12));
late('#s2-note', at(2, 0.86));

// 3-4. order like a regular: ROLE fills on line 3, GOAL on line 4, FORMAT waits
step('#s3', T.at(3)); title('#s3', T.at(3) + 0.05); card('#s3-card', T.at(3) + 0.15);
late('#s3-head', T.at(3) + 0.4);
rowIn('#s3-ask', T.at(3) + 0.35);
['#s3-r1', '#s3-r2', '#s3-r3'].forEach((id, i) => tl.fromTo(id, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.35, ease: OUT }, T.at(3) + 0.45 + i * 0.07));
const light = (row, tag, t) => {
  tl.fromTo(tag, { scale: 1 }, { scale: 1.25, duration: 0.15, ease: 'power2.out', immediateRender: false }, t);
  tl.to(tag, { scale: 1, duration: 0.25, ease: POP }, t + 0.15);
  tl.fromTo(tag, { color: 'rgba(30,26,22,0.62)' }, { color: '#2E4FD8', duration: 0.2, immediateRender: false }, t);
  tl.fromTo(row, { backgroundColor: 'rgba(238,241,255,0)', borderColor: 'rgba(30,26,22,0.28)' }, { backgroundColor: 'rgba(238,241,255,1)', borderColor: 'rgba(46,79,216,0.9)', duration: 0.3, immediateRender: false }, t);
};
light('#s3-r1', '#s3-t1', T.voice(3) + 0.6);
wipe('#s3-v1', at(3, 0.55), 0.6, 19);
light('#s3-r2', '#s3-t2', T.voice(4) + 0.4);
wipe('#s3-v2', T.voice(4) + 0.5, 0.6, 25);
bump('#s3-t3', T.end(4) - 0.35, 1.15);

// 5. host hidden: the whole brief at full width, FORMAT types in, Send presses
step('#s5', T.at(5)); title('#s5', T.at(5) + 0.03); card('#s5-card', T.at(5) + 0.05, 0.45);
late('#s5-head', T.at(5) + 0.3);
['#s5-l1', '#s5-l2', '#s5-l3', '#s5-l5'].forEach((id, i) => tl.fromTo(id, { opacity: 0, x: 30 }, { opacity: 1, x: 0, duration: 0.3, ease: OUT }, T.at(5) + 0.15 + i * 0.06));
tl.fromTo('#s5-hl', { scaleX: 0 }, { scaleX: 1, duration: 0.3, ease: 'power3.out' }, T.voice(5) + 0.35);
wipe('#s5-l4', T.voice(5) + 0.4, 0.45, 22);
late('#s5-note', T.at(5) + 0.5);
chip('#s5-go', T.at(5) + 0.4);
press('#s5-go', at(5, 0.85));

// 6. the result: five clean lines land, READY TO SEND slams on the ding
step('#s6', T.at(6)); title('#s6', T.at(6) + 0.03); card('#s6-card', T.at(6) + 0.05, 0.5);
late('#s6-head', T.at(6) + 0.25);
['#s6-u1', '#s6-u2', '#s6-u3', '#s6-u4', '#s6-u5'].forEach((id, i) => {
  tl.fromTo(id, { x: 60, opacity: 0 }, { x: 0, opacity: 1, duration: 0.38, ease: OUT }, T.at(6) + 0.2 + i * 0.07);
  chip(`${id} .chip`, T.at(6) + 0.28 + i * 0.07);
});
const n6 = { v: 0 };
tl.fromTo(n6, { v: 0 }, { v: 5, duration: 0.5, ease: 'power3.out', onUpdate: () => { document.getElementById('s6-n').textContent = `LINES ${Math.round(n6.v)}/5`; } }, T.at(6) + 0.2);
late('#s6-ex', T.at(6) + 0.6);
tl.fromTo('#s6-ready', { scale: 1.8, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.25, ease: 'power4.in' }, T.voice(6) + 0.45);
bump('#s6-card', T.voice(6) + 0.72, 1.03);
bump('#s6-ready', at(6, 0.85), 1.08);

// 7. the catch: YOU chips on "you give it the facts", AI chips on "fixes the shape"
step('#s7', T.at(7)); title('#s7', T.at(7) + 0.05); card('#s7-card', T.at(7) + 0.15);
['#s7-k1', '#s7-k2', '#s7-k3', '#s7-k4'].forEach((id, i) => rowIn(id, T.at(7) + 0.35 + i * 0.07));
chip('#s7-h1', at(7, 0.28)); chip('#s7-h2', at(7, 0.28) + 0.12);
bump('#s7-k1', at(7, 0.28) + 0.3, 1.03);
chip('#s7-h3', at(7, 0.72)); chip('#s7-h4', at(7, 0.72) + 0.12);
late('#s7-note', at(7, 0.85));

// 8. send this: the AI answer gets struck out by hand, then the share row and the send press
title('#s8', T.at(8)); card('#s8-card', T.at(8) + 0.15); late('#s8-lbl', T.at(8) + 0.4);
['#s8-x1', '#s8-x2', '#s8-x3'].forEach((id, i) => tl.fromTo(id, { strokeDashoffset: 600 }, { strokeDashoffset: 0, duration: 0.35, ease: 'power2.inOut' }, T.voice(8) + 0.35 + i * 0.18));
tl.fromTo('#s8-note', { scale: 0.5, opacity: 0, rotation: -12 }, { scale: 1, opacity: 1, rotation: -4, duration: 0.4, ease: POP }, T.voice(8) + 0.95);
rowIn('#s8-share', at(8, 0.45));
chip('#s8-btn', at(8, 0.62));
tl.set('#s8-ring', { opacity: 0 }, 0);
press('#s8-btn', at(8, 0.85));
tl.fromTo('#s8-ring', { scale: 1, opacity: 0.7 }, { scale: 1.9, opacity: 0, duration: 0.5, ease: 'power2.out', immediateRender: false }, at(8, 0.85) + 0.1);

// 9. the keyword: Save + bookmark, BRIEF drops in letter by letter on quarter beats
title('#s9', T.at(9));
tl.fromTo('#s9-bm', { y: -70, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: 'back.out(2)' }, T.at(9) + 0.2);
tl.fromTo('#s9-pill', { scale: 0.9, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.5, ease: OUT }, T.at(9) + 0.1);
late('#s9-cm', T.at(9) + 0.35);
['#s9-b', '#s9-r', '#s9-i', '#s9-e', '#s9-f'].forEach((id, i) => tl.fromTo(id, { yPercent: -110, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.4, ease: 'back.out(2)' }, T.voice(9) + 0.35 + i * (T.beat / 4)));
late('#s9-sub', T.voice(9) + 1.2);
tl.fromTo('#s9-tag', { scale: 0.4, opacity: 0, rotation: -14 }, { scale: 1, opacity: 1, rotation: -4, duration: 0.45, ease: POP }, T.voice(9) + 1.35);
late('#s9-works', T.voice(9) + 1.55);
bump('#s9-pill', T.end(9) + 0.2, 1.03);
