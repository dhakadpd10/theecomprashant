// Tutorial: a Fiverr gig page in one evening. Analogy: the gig is a fest stall (board = title, menu = packages, table = samples).
// Motion system: enters expo.out 0.4 to 0.6 s, pops back.out, slams power4.in, stagger 0.07 s, chips dip then settle,
// labels follow a beat after their card, two soft orbs drift behind the whole reel.
const OUT = 'expo.out', POP = 'back.out(1.8)';
const span = (n) => T.end(n) - T.voice(n);
const say = (n, f) => T.voice(n) + f * span(n);
const title = (sel, t) => tl.fromTo(`${sel} .l`, { yPercent: 110 }, { yPercent: 0, duration: 0.55, ease: OUT, stagger: 0.08 }, t);
const step = (s, t) => tl.fromTo(`${s} .step`, { x: -40, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4, ease: OUT }, t);
const card = (id, t) => tl.fromTo(id, { y: 110, opacity: 0, scale: 0.96 }, { y: 0, opacity: 1, scale: 1, duration: 0.6, ease: OUT }, t);
const late = (id, t) => tl.fromTo(id, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.35, ease: OUT }, t);
const slide = (id, t, dx = 60) => tl.fromTo(id, { x: dx, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4, ease: OUT }, t);
const chip = (id, t) => {
  tl.fromTo(id, { scale: 0, opacity: 0 }, { scale: 1.12, opacity: 1, duration: 0.22, ease: 'power2.out' }, t);
  tl.to(id, { scale: 1, duration: 0.18, ease: 'power2.inOut' }, t + 0.22);
};
const bump = (id, t, s = 1.06) => tl.fromTo(id, { scale: 1 }, { scale: s, duration: 0.15, yoyo: true, repeat: 1, ease: 'sine.inOut', immediateRender: false }, t);
const shake = (id, t, px = 8) => tl.fromTo(id, { x: 0 }, { x: px, duration: 0.05, repeat: 5, yoyo: true, ease: 'none', immediateRender: false }, t);
const wipe = (id, t, d, n) => tl.fromTo(id, { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: d, ease: `steps(${n})` }, t);
const dollars = (id, to, t) => {
  const o = { v: 0 };
  tl.fromTo(o, { v: 0 }, { v: to, duration: 0.6, ease: 'power3.out', onUpdate: () => { document.getElementById(id).textContent = `$${Math.round(o.v)}`; } }, t);
};

// ambient layer
tl.fromTo('#orb1', { x: 0, y: 0 }, { x: 170, y: -120, duration: T.dur, ease: 'sine.inOut' }, 0);
tl.fromTo('#orb2', { x: 0, y: 0 }, { x: -180, y: -150, duration: T.dur, ease: 'sine.inOut' }, 0);

// progress bar: one segment per step (lines 2, 3, 4)
tl.set(['#p1', '#p2', '#p3'], { scaleX: 0 }, 0);
[2, 3, 4].forEach((n, i) => tl.to(`#p${i + 1}`, { scaleX: 1, duration: 0.5, ease: 'power2.out' }, T.at(n)));

// 0. hook: title and the 3 samples are on screen at frame 0; "portfolio." gets struck out on the thud
tl.fromTo('#s0-title', { scale: 1.06 }, { scale: 1, duration: 0.7, ease: OUT }, 0);
tl.fromTo('#m1', { rotation: -4, y: 10 }, { rotation: -10, y: 0, duration: 0.6, ease: OUT }, 0);
tl.fromTo('#m2', { rotation: 2, y: 10 }, { rotation: -2, y: 0, duration: 0.6, ease: OUT }, 0.05);
tl.fromTo('#m3', { rotation: 2, y: 10 }, { rotation: 7, y: 0, duration: 0.6, ease: OUT }, 0.1);
tl.fromTo('#s0-strike', { scaleX: 0 }, { scaleX: 1, duration: 0.25, ease: 'power4.in' }, T.voice(0) + 0.35);
shake('#s0-title', T.voice(0) + 0.6, 5);
tl.fromTo(['#m1', '#m2', '#m3'], { scale: 1 }, { scale: 1.1, duration: 0.15, yoyo: true, repeat: 1, ease: 'sine.inOut', stagger: 0.07, immediateRender: false }, say(0, 0.72));

// 1. the analogy: the stall builds, then board, menu and table map to title, packages, samples
step('#s1', T.at(1)); title('#s1 .title', T.at(1) + 0.05); card('#s1-card', T.at(1) + 0.15);
tl.fromTo(['#st-p1', '#st-p2'], { scaleY: 0 }, { scaleY: 1, duration: 0.4, ease: OUT, stagger: 0.06 }, T.at(1) + 0.4);
tl.fromTo('#st-awn', { scaleY: 0 }, { scaleY: 1, duration: 0.45, ease: OUT }, T.at(1) + 0.45);
tl.fromTo('#st-scal', { opacity: 0 }, { opacity: 1, duration: 0.3, ease: 'power2.out' }, T.at(1) + 0.65);
tl.fromTo('#st-table', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: OUT }, T.at(1) + 0.55);
tl.fromTo('#st-board', { y: -50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.45, ease: POP }, say(1, 0.4));
tl.fromTo('#st-menu', { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: POP }, say(1, 0.5));
tl.fromTo(['#st-s1', '#st-s2', '#st-s3'], { y: -30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.35, ease: OUT, stagger: 0.07 }, say(1, 0.6));
[['#mp1', '#mc1', '#st-board'], ['#mp2', '#mc2', '#st-menu'], ['#mp3', '#mc3', ['#st-s1', '#st-s2', '#st-s3']]].forEach(([r, c, p], i) => {
  const t = say(1, 0.62 + i * 0.11);
  slide(r, t); chip(c, t + 0.12); bump(p, t + 0.12, 1.08);
});
late('#s1-note', say(1, 0.88));

// 2. step 1: the question, typing dots, the example reply, PICK pops on the sound
step('#s2', T.at(2)); title('#s2 .title', T.at(2) + 0.05); card('#s2-card', T.at(2) + 0.15); late('#s2-head', T.at(2) + 0.4);
tl.fromTo('#ask', { scale: 0.85, opacity: 0, y: 30 }, { scale: 1, opacity: 1, y: 0, duration: 0.4, ease: POP }, T.at(2) + 0.35);
tl.fromTo('#dots', { opacity: 0 }, { opacity: 1, duration: 0.15, ease: 'power2.out' }, T.voice(2) + 0.5);
tl.fromTo('#dots i', { y: 0 }, { y: -10, duration: 0.15, yoyo: true, repeat: 3, stagger: 0.06, ease: 'sine.inOut' }, T.voice(2) + 0.55);
tl.fromTo('#dots', { opacity: 1 }, { opacity: 0, duration: 0.12, ease: 'power3.in', immediateRender: false }, T.voice(2) + 0.95);
tl.fromTo('#reply', { opacity: 0, scale: 0.92 }, { opacity: 1, scale: 1, duration: 0.4, ease: OUT }, T.voice(2) + 0.95);
tl.fromTo(['#o1', '#o2', '#o3'], { x: 40, opacity: 0 }, { x: 0, opacity: 1, duration: 0.35, ease: OUT, stagger: 0.07 }, T.voice(2) + 1.0);
chip('#pick', T.voice(2) + 1.18);
tl.to('#o1', { backgroundColor: '#E3F0EA', duration: 0.25, ease: 'power2.out' }, T.voice(2) + 1.4);
bump('#o1', T.voice(2) + 1.4, 1.04);
late('#s2-note', T.voice(2) + 1.7);

// 3. step 2: the GIG prompt types, GO clicks, the board (title) types out, the menu lands and prices count up
step('#s3', T.at(3)); title('#s3 .title', T.at(3) + 0.05); card('#s3-prompt', T.at(3) + 0.1);
chip('#s3-gig', T.at(3) + 0.35);
wipe('#s3-typed', T.at(3) + 0.45, 0.5, 25);
tl.fromTo('#go', { scale: 1 }, { scale: 0.86, duration: 0.08, yoyo: true, repeat: 1, ease: 'power2.inOut', immediateRender: false }, T.voice(3) + 0.84);
tl.to('#go', { backgroundColor: '#1F6B52', duration: 0.15, ease: 'power2.out' }, T.voice(3) + 0.9);
card('#s3-board', T.voice(3) + 1.0); late('#s3-bl', T.voice(3) + 1.2);
wipe('#gtitle', T.voice(3) + 1.3, 0.6, 37);
card('#s3-menu', say(3, 0.5)); late('#s3-ml', say(3, 0.5) + 0.25);
['#pk1', '#pk2', '#pk3'].forEach((id, i) => tl.fromTo(id, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: OUT }, say(3, 0.5) + 0.2 + i * 0.07));
[['pp1', 10], ['pp2', 25], ['pp3', 45]].forEach(([id, v], i) => dollars(id, v, say(3, 0.62) + i * 0.08));
bump('#pk2', say(3, 0.88), 1.05);

// 4. step 3: rows slide in from the left (host is on the right), thumbnails pop on the sound, ticks land on "table"
step('#s4', T.at(4)); title('#s4 .title', T.at(4) + 0.05); card('#s4-card', T.at(4) + 0.15); late('#s4-head', T.at(4) + 0.4);
['#sm1', '#sm2', '#sm3'].forEach((id, i) => slide(id, T.at(4) + 0.35 + i * 0.07, -60));
['#th1', '#th2', '#th3'].forEach((id, i) => tl.fromTo(id, { scale: 0.6, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: POP }, T.voice(4) + 1.0 + i * 0.08));
['#tk1', '#tk2', '#tk3'].forEach((id, i) => chip(id, say(4, 0.72) + i * 0.07));
late('#s4-note', say(4, 0.86));

// 5. the result: the whole gig page builds, LIVE slams on "open", the cooker whistles; ONE EVENING lands on the words
step('#s5', T.at(5)); title('#s5 .title', T.at(5) + 0.02); card('#s5-card', T.at(5) + 0.1); late('#s5-head', T.at(5) + 0.3);
tl.fromTo('#gal', { opacity: 0, scale: 0.94 }, { opacity: 1, scale: 1, duration: 0.45, ease: OUT }, T.at(5) + 0.25);
wipe('#gt', T.at(5) + 0.36, 0.4, 37);
late('#tabs', T.at(5) + 0.46); late('#pr', T.at(5) + 0.54);
chip('#buy', T.at(5) + 0.6);
tl.fromTo('#stamp5', { scale: 2.4, opacity: 0, rotation: -22 }, { scale: 1, opacity: 1, rotation: -8, duration: 0.24, ease: 'power4.in' }, say(5, 0.28) - 0.24);
bump('#s5-card', say(5, 0.28), 1.03);
chip('#eve', say(5, 0.8));

// 6. the catch: LIVE, then three weeks of 0 orders that flash and shake on the buzz
step('#s6', T.at(6)); title('#s6-tA', T.at(6) + 0.05); card('#s6-card', T.at(6) + 0.15); late('#s6-head', T.at(6) + 0.45);
slide('#d1', T.voice(6) + 0.3); chip('#dc1', T.voice(6) + 0.45);
['#d2', '#d3', '#d4'].forEach((id, i) => slide(id, T.voice(6) + 0.7 + i * 0.07));
['#w1', '#w2', '#w3'].forEach((id, i) => chip(id, T.voice(6) + 0.85 + i * 0.07));
tl.to(['#w1', '#w2', '#w3'], { backgroundColor: '#B4432B', color: '#FFFFFF', duration: 0.2, ease: 'power2.out' }, T.voice(6) + 1.3);
['#w1', '#w2', '#w3'].forEach((id) => shake(id, T.voice(6) + 1.3, 7));
bump('#d4', say(6, 0.9), 1.04);

// 7. many get none (the zeros pulse), then the title swaps and the free joining row lands, with the honest cut note
bump(['#w1', '#w2', '#w3'], T.voice(7) + 0.15, 1.15);
const swap = say(7, 0.5);
tl.fromTo('#s6-tA .l', { yPercent: 0 }, { yPercent: -110, duration: 0.25, ease: 'power3.in', stagger: 0.05, immediateRender: false }, swap);
title('#s6-tB', swap + 0.2);
slide('#d5', say(7, 0.55)); chip('#dc5', say(7, 0.55) + 0.15);
late('#s6-cut', say(7, 0.82));

// 8. send this, then the keyword: G I G drops letter by letter on the half beat
tl.fromTo('#s8-send', { yPercent: 40, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.6, ease: OUT }, T.at(8));
tl.fromTo('#plane', { x: -200, opacity: 0, rotation: -20 }, { x: 0, opacity: 1, rotation: 0, duration: 0.7, ease: 'power2.out' }, T.at(8) + 0.25);
tl.fromTo('#plane', { y: 120 }, { y: 0, duration: 0.7, ease: 'back.out(2)' }, T.at(8) + 0.25);
late('#s8-who', T.voice(8) + 0.3);
late('#s8-save', T.voice(8) + 0.7);
tl.fromTo('#cta', { scale: 0.7, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.5, ease: POP }, say(8, 0.4));
late('#cta-l', say(8, 0.4) + 0.25);
tl.fromTo('#gig .k', { y: -120, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: 'back.out(2)', stagger: T.beat / 2 }, say(8, 0.6));
chip('#free', T.end(8) - 0.4);
late('#what', T.end(8) - 0.1);
bump('#gig', T.end(8) + 0.5, 1.08);
tl.to('#plane', { x: 20, y: -16, duration: 0.6, yoyo: true, repeat: 1, ease: 'sine.inOut' }, T.end(8));
