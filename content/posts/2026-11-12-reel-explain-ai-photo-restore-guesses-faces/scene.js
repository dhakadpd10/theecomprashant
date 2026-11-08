// PHOTO explainer: AI photo repair fills the gaps with guesses. Analogy: a half-wiped rangoli.
// Colour = meaning: blue = the AI and its guesses, green = kept, amber = a guess, red = changed.
// Plan check: 12 Nov fixed slots are tutorial, SITES carousel, prompt. This reel is kind explain (held this week). Confirm the slot before publish.
const OUT = 'expo.out', POP = 'back.out(1.8)';
const span = (n) => T.end(n) - T.voice(n);
const hit = (n, f) => T.voice(n) + f * span(n);
const title = (s, t) => tl.fromTo(s + ' .title .l', { yPercent: 110 }, { yPercent: 0, duration: 0.55, ease: OUT, stagger: 0.08 }, t);
const step = (s, t) => tl.fromTo(s + ' .step', { x: -40, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4, ease: OUT }, t);
const card = (id, t, d = 0.6) => tl.fromTo(id, { y: 110, opacity: 0, scale: 0.96 }, { y: 0, opacity: 1, scale: 1, duration: d, ease: OUT }, t);
const late = (id, t) => tl.fromTo(id, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.35, ease: OUT }, t);
const rise = (id, t, d = 0.45) => tl.fromTo(id, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: d, ease: OUT }, t);
const slide = (id, t) => tl.fromTo(id, { opacity: 0, x: 60 }, { opacity: 1, x: 0, duration: 0.4, ease: OUT }, t);
const chip = (id, t) => {
  tl.fromTo(id, { scale: 0, opacity: 0 }, { scale: 1.12, opacity: 1, duration: 0.22, ease: 'power2.out' }, t);
  tl.to(id, { scale: 1, duration: 0.18, ease: 'power2.inOut' }, t + 0.22);
};
const shake = (id, t, px = 8) => tl.fromTo(id, { x: 0 }, { x: px, duration: 0.05, repeat: 5, yoyo: true, ease: 'none' }, t);
const bump = (id, t) => tl.to(id, { scale: 1.05, duration: 0.15, yoyo: true, repeat: 1, ease: 'sine.inOut' }, t);

// ambient layer: two soft orbs drift for the whole reel
tl.fromTo('#orb1', { x: 0, y: 0 }, { x: 160, y: -120, duration: T.dur, ease: 'sine.inOut' }, 0);
tl.fromTo('#orb2', { x: 0, y: 0 }, { x: -180, y: -160, duration: T.dur, ease: 'sine.inOut' }, 0);

// progress bar: one segment per step
const segs = ['#p1', '#p2', '#p3', '#p4', '#p5', '#p6', '#p7', '#p8', '#p9'];
tl.set(segs, { scaleX: 0 }, 0);
segs.forEach((id, i) => tl.to(id, { scaleX: 1, duration: 0.5, ease: 'power2.out' }, T.at(i + 1)));

// 0. hook: "3 lines. Same face." is on screen at frame 0, the underline lands on the thud, the prompt chip pops on "prompt"
tl.fromTo('#s0-title .l', { yPercent: 0 }, { yPercent: 0, duration: 0.01 }, 0);
tl.fromTo('#s0-title', { scale: 1.06 }, { scale: 1, duration: 0.8, ease: OUT, transformOrigin: 'left top' }, 0);
tl.fromTo('#s0-step', { opacity: 0.6 }, { opacity: 1, duration: 0.3 }, 0);
tl.fromTo('#s0-line', { scaleX: 0 }, { scaleX: 1, duration: 0.4, ease: 'power3.out' }, T.voice(0) + 0.5);
chip('#s0-chip', hit(0, 0.36));
tl.fromTo('#s0-chip', { rotation: 0 }, { rotation: 5, duration: 0.08, repeat: 5, yoyo: true, ease: 'sine.inOut' }, hit(0, 0.85));

// 1. the family group: the restored photo lands, someone asks, the lens moves in on "look closer"
step('#s1', T.at(1)); title('#s1', T.at(1) + 0.05); card('#s1-card', T.at(1) + 0.12);
late('#s1-head', T.at(1) + 0.4);
tl.fromTo('#s1-sent', { opacity: 0, y: 40, scale: 0.9 }, { opacity: 1, y: 0, scale: 1, duration: 0.45, ease: POP }, T.voice(1) + 0.35);
tl.fromTo('#s1-reply', { opacity: 0, x: -60 }, { opacity: 1, x: 0, duration: 0.4, ease: OUT }, hit(1, 0.55));
tl.fromTo('#s1-lens', { opacity: 0, scale: 0.4, x: -80, y: 80 }, { opacity: 1, scale: 1, x: 0, y: 0, duration: 0.5, ease: 'power3.out' }, hit(1, 0.74));
tl.to('#s1-lens', { scale: 1.12, duration: 0.3, ease: 'power2.inOut' }, hit(1, 0.74) + 0.55);
chip('#s1-q', hit(1, 0.9));

// 2. the analogy: the rangoli blooms petal by petal, then a duster wipes its right half on "half-wiped"
step('#s2', T.at(2)); title('#s2', T.at(2) + 0.05); card('#s2-card', T.at(2) + 0.12);
tl.fromTo('#s2 .pt', { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: POP, stagger: 0.05, transformOrigin: '50% 100%' }, T.at(2) + 0.35);
tl.fromTo('#s2 .dt', { opacity: 0 }, { opacity: 1, duration: 0.25, ease: 'power2.out', stagger: 0.03 }, T.at(2) + 0.6);
tl.fromTo('#s2-duster', { opacity: 0 }, { opacity: 1, duration: 0.15, ease: 'power2.out' }, hit(2, 0.47) - 0.15);
tl.fromTo('#s2-duster', { x: 0 }, { x: 230, duration: 0.7, ease: 'power2.inOut' }, hit(2, 0.47));
tl.fromTo('#s2-wipe', { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 0.7, ease: 'power2.inOut' }, hit(2, 0.47));
tl.to('#s2-duster', { opacity: 0, duration: 0.25, ease: 'power3.in' }, hit(2, 0.47) + 0.72);
chip('#s2-kept', hit(2, 0.62)); chip('#s2-lost', hit(2, 0.82));

// 3. AI fills the gaps: blue guessed shapes (not the old petals) pop into the wiped half on the pop sfx
step('#s3', T.at(3)); title('#s3', T.at(3) + 0.05); card('#s3-card', T.at(3) + 0.12, 0.5);
chip('#s3-kept', T.at(3) + 0.5);
tl.fromTo('#s3 .gs', { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.35, ease: POP, stagger: 0.07, transformOrigin: '50% 100%' }, T.voice(3) + 0.4);
tl.fromTo('#s3 .gd', { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.25, ease: POP, stagger: 0.04, transformOrigin: '50% 50%' }, T.voice(3) + 0.6);
chip('#s3-guess', T.voice(3) + 0.75);
late('#s3-note', T.voice(3) + 1.2);

// 4. the sharp face is a guess: old print vs AI repair, the repair snaps sharp, GUESS slams on the buzz
title('#s4', T.at(4) + 0.05); card('#s4-card', T.at(4) + 0.1, 0.45);
rise('#s4-a', T.at(4) + 0.15); rise('#s4-b', T.at(4) + 0.22);
tl.fromTo('#s4-b', { filter: 'blur(12px)' }, { filter: 'blur(0px)', duration: 0.5, ease: 'power2.out' }, T.at(4) + 0.25);
late('#s4-ca', T.voice(4) + 0.3); late('#s4-cb', T.voice(4) + 0.4);
tl.fromTo('#s4-stamp', { scale: 2.4, opacity: 0, rotation: -22 }, { scale: 1, opacity: 1, rotation: -8, duration: 0.22, ease: 'power4.in' }, T.voice(4) + 0.6);
shake('#s4-b', T.voice(4) + 0.82, 10);

// 5. the fix: the photo attaches on the click, each line lands as it is said, SEND presses
step('#s5', T.at(5)); title('#s5', T.at(5) + 0.05); card('#s5-card', T.at(5) + 0.12);
late('#s5-head', T.at(5) + 0.4);
tl.fromTo('#s5-att', { opacity: 0, y: 24, scale: 0.94 }, { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: POP }, T.voice(5) + 0.3);
chip('#s5-go', T.voice(5) + 0.45);
[['#s5-r1', '#s5-n1', 0.2], ['#s5-r2', '#s5-n2', 0.5], ['#s5-r3', '#s5-n3', 0.74]].forEach(([row, num, f]) => { slide(row, hit(5, f)); chip(num, hit(5, f) + 0.08); });
tl.to('#s5-go', { scale: 0.9, duration: 0.12, yoyo: true, repeat: 1, ease: 'power2.inOut' }, T.end(5) - 0.15);

// 6. the result (cooker whistles): same face, nothing added, and the three guesses listed
step('#s6', T.at(6)); title('#s6', T.at(6) + 0.05); card('#s6-card', T.at(6) + 0.12);
tl.fromTo('#s6-ph', { opacity: 0, scale: 0.88 }, { opacity: 1, scale: 1, duration: 0.45, ease: POP }, T.at(6) + 0.3);
late('#s6-note', T.at(6) + 0.45);
chip('#s6-c1', T.voice(6) + 0.3); chip('#s6-c2', T.voice(6) + 0.42);
bump('#s6-ph', T.voice(6) + 0.55);
late('#s6-closer', T.voice(6) + 0.55);
late('#s6-head', hit(6, 0.5));
[['#s6-g1', '#s6-k1'], ['#s6-g2', '#s6-k2'], ['#s6-g3', '#s6-k3']].forEach(([row, k], i) => { slide(row, hit(6, 0.55) + i * 0.12); chip(k, hit(6, 0.55) + i * 0.12 + 0.1); });

// 7. the catch: three edits, the face drifts, the red ring lands, then the two limits
step('#s7', T.at(7)); title('#s7', T.at(7) + 0.05); card('#s7-card', T.at(7) + 0.12);
['#s7-f1', '#s7-f2', '#s7-f3'].forEach((id, i) => rise(id, T.at(7) + 0.35 + i * 0.08, 0.4));
['#s7-e1', '#s7-e2', '#s7-e3'].forEach((id, i) => late(id, T.at(7) + 0.5 + i * 0.08));
slide('#s7-r1', hit(7, 0.12));
tl.fromTo('#s7-ring', { opacity: 0, scale: 1.3 }, { opacity: 1, scale: 1, duration: 0.25, ease: 'power4.in' }, hit(7, 0.3));
shake('#s7-f3', hit(7, 0.3) + 0.27, 6);
chip('#s7-c1', hit(7, 0.4));
slide('#s7-r2', hit(7, 0.58)); chip('#s7-c2', hit(7, 0.86));

// 8. stay honest: original kept, restored labelled, the caption tag wipes in
step('#s8', T.at(8)); title('#s8', T.at(8) + 0.05); card('#s8-card', T.at(8) + 0.12);
rise('#s8-a', T.at(8) + 0.2, 0.4); rise('#s8-b', T.at(8) + 0.27, 0.4);
late('#s8-la', T.at(8) + 0.35); late('#s8-lb', T.at(8) + 0.4);
chip('#s8-c1', hit(8, 0.3));
tl.fromTo('#s8-tag', { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 0.45, ease: 'power3.out' }, hit(8, 0.6));
chip('#s8-c2', hit(8, 0.72));

// 9. send this: the plane arcs in, then the keyword pill pops and PHOTO drops in letter by letter
title('#s9', T.at(9));
tl.fromTo('#s9-plane', { x: -200, opacity: 0, rotation: -20 }, { x: 0, opacity: 1, rotation: 0, duration: 0.7, ease: 'power2.out' }, T.at(9) + 0.25);
tl.fromTo('#s9-plane', { y: 120 }, { y: 0, duration: 0.7, ease: 'back.out(2)' }, T.at(9) + 0.25);
late('#s9-who', T.voice(9) + 0.35);
tl.to('#s9-plane', { x: 24, y: -16, duration: 0.8, yoyo: true, repeat: 1, ease: 'sine.inOut' }, hit(9, 0.4));
tl.fromTo('#s9-pill', { scale: 0.6, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.45, ease: POP }, hit(9, 0.66));
tl.fromTo('#s9 .lt', { yPercent: -120, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.4, ease: 'back.out(1.6)', stagger: 0.08 }, hit(9, 0.8));
late('#s9-save', hit(9, 0.95));
bump('#s9-pill', T.end(9) + 0.3);
