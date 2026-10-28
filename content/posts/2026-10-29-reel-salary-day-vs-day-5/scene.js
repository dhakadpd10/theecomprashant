// Editorial skit: salary day vs day 5. Host stays centre stage; the story plays out on small cards in the top band.
const OUT = 'expo.out', POP = 'back.out(1.8)';
const span = (n) => T.end(n) - T.voice(n);
const sp = (n, f) => T.voice(n) + f * span(n);
const title = (s, t) => tl.fromTo(`${s} .title .l`, { yPercent: 110 }, { yPercent: 0, duration: 0.55, ease: OUT, stagger: 0.08 }, t);
const step = (s, t) => tl.fromTo(`${s} .step`, { x: -40, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4, ease: OUT }, t);
const card = (id, t) => tl.fromTo(id, { y: 90, opacity: 0, scale: 0.96 }, { y: 0, opacity: 1, scale: 1, duration: 0.55, ease: OUT }, t);
const shake = (id, t) => tl.fromTo(id, { x: 0 }, { x: 8, duration: 0.05, repeat: 5, yoyo: true, ease: 'none' }, t);

// texture: slow drifting blobs for the whole reel
tl.fromTo('#blobA', { x: 0, y: 0 }, { x: 260, y: 180, duration: T.dur, ease: 'sine.inOut' }, 0);
tl.fromTo('#blobB', { x: 0, y: 0 }, { x: -240, y: -220, duration: T.dur, ease: 'sine.inOut' }, 0);

// progress bar: hook, salary day, day 5, the ping, the planner
tl.fromTo('#p1', { scaleX: 1 }, { scaleX: 1, duration: 0.01 }, 0);
[[2, 1], [3, 4], [4, 7], [5, 9]].forEach(([p, n]) => tl.fromTo(`#p${p}`, { scaleX: 0 }, { scaleX: 1, duration: 0.5, ease: 'power2.out' }, T.at(n)));

// 0. hook: title and the month strip are on screen at frame 0; days 1 to 4 get struck off, the 5th pops
tl.fromTo('#s0-title .l', { yPercent: 0 }, { yPercent: 0, duration: 0.01 }, 0);
tl.fromTo('#s0-title', { scale: 1.05 }, { scale: 1, duration: 0.6, ease: OUT }, 0);
tl.fromTo('#s0-step', { opacity: 0.6 }, { opacity: 1, duration: 0.3 }, 0);
tl.fromTo('#s0 .x', { scaleX: 0 }, { scaleX: 1, duration: 0.22, ease: 'power3.out', stagger: 0.07 }, sp(0, 0.3));
tl.fromTo('#d5', { scale: 0.95 }, { scale: 1.12, duration: 0.3, ease: POP }, sp(0, 0.72));
tl.to('#d5', { scale: 1, duration: 0.3, ease: 'power2.inOut' }, sp(0, 0.72) + 0.35);

// 1-3. salary day: the spend log fills, every chip a flex
step('#s1', T.at(1)); title('#s1', T.at(1) + 0.05); card('#s1-card', T.at(1) + 0.15);
const rowIn = (r, c, t) => {
  tl.fromTo(r, { x: 60, opacity: 0 }, { x: 0, opacity: 1, duration: 0.35, ease: OUT }, t);
  tl.fromTo(c, { scale: 0.6, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: POP }, t + 0.1);
};
rowIn('#r1', '#c1', T.voice(1) + 0.5);
rowIn('#r2', '#c2', sp(2, 0.35));
rowIn('#r3', '#c3', T.voice(3) + 0.1);
tl.fromTo('#c3', { scale: 1 }, { scale: 1.12, duration: 0.18, yoyo: true, repeat: 1, ease: 'sine.inOut' }, sp(3, 0.75));
tl.fromTo('#s1-card', { rotation: 0 }, { rotation: -1.5, duration: 0.3, yoyo: true, repeat: 1, ease: 'power2.inOut' }, sp(3, 0.7));

// 4. day 5: one Maggi packet splits four ways
step('#s2', T.at(4)); title('#s2', T.at(4) + 0.05);
card('#s3-card', T.at(4) + 0.15);
[['#q1', 55], ['#q2', 35], ['#q3', 15], ['#q4', -5]].forEach(([id, dx]) => tl.fromTo(id, { x: dx }, { x: 0, duration: 0.45, ease: 'power2.inOut' }, sp(4, 0.72)));
tl.fromTo('#s3 .q', { y: 0 }, { y: -10, duration: 0.15, yoyo: true, repeat: 1, ease: 'sine.inOut', stagger: 0.06 }, sp(4, 0.72) + 0.45);
tl.fromTo('#s3-lab', { opacity: 0, filter: 'blur(12px)' }, { opacity: 1, filter: 'blur(0px)', duration: 0.45, ease: OUT }, sp(4, 0.85));

// 5. UPI balance: blurred on purpose, the buzz, LOW slams, one eye closes
card('#s4-card', T.at(5) + 0.05);
tl.fromTo('#s4-val', { opacity: 0, filter: 'blur(14px)' }, { opacity: 1, filter: 'blur(5px)', duration: 0.45, ease: OUT }, T.voice(5) + 0.25);
tl.fromTo('#s4-low', { scale: 1.8, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.22, ease: 'power4.in' }, T.voice(5) + 0.58);
shake('#s4-card', T.voice(5) + 0.8);
tl.fromTo('#s4-lid', { scaleY: 0 }, { scaleY: 0.6, duration: 0.35, ease: 'power2.inOut' }, sp(5, 0.68));
tl.fromTo('#s4-pupil', { x: 0 }, { x: -18, duration: 0.35, ease: 'power2.inOut' }, sp(5, 0.68));

// 6. the auction: bids pop, SOLD slams on the thud
card('#s5-card', T.at(6) + 0.05);
tl.fromTo('#s5-sachet', { rotation: 0 }, { rotation: 6, duration: 0.18, yoyo: true, repeat: 3, ease: 'sine.inOut' }, T.at(6) + 0.45);
['#b1', '#b2', '#b3'].forEach((id, i) => tl.fromTo(id, { scale: 0.5, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.35, ease: POP }, T.voice(6) + 0.45 + i * 0.15));
tl.fromTo('#s5-stamp', { scale: 2.4, opacity: 0, rotation: -24 }, { scale: 1, opacity: 1, rotation: -10, duration: 0.22, ease: 'power4.in' }, T.voice(6) + 0.98);
shake('#s5-card', T.voice(6) + 1.2);

// 7. the ping: the notification lands on the ding, rings pulse, the cooker whistles
step('#s6', T.at(7)); title('#s6', T.at(7) + 0.05);
tl.fromTo('#s6-card', { y: -80, opacity: 0, scale: 0.96 }, { y: 0, opacity: 1, scale: 1, duration: 0.45, ease: OUT }, T.voice(7) + 0.5);
['#s6-ring1', '#s6-ring2'].forEach((id, i) => tl.fromTo(id, { scale: 1, opacity: 0.7 }, { scale: 1.7, opacity: 0, duration: 0.6, ease: 'power2.out' }, T.voice(7) + 0.9 + i * T.beat));
tl.fromTo(['#s6-k', '#s6-h', '#s6-s'], { x: 40, opacity: 0 }, { x: 0, opacity: 1, duration: 0.35, ease: OUT, stagger: 0.07 }, T.voice(7) + 0.95);
tl.fromTo('#s6-tag', { scale: 0.6, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.35, ease: POP }, sp(7, 0.6));
tl.fromTo('#s6-card', { scale: 1 }, { scale: 1.05, duration: 0.2, yoyo: true, repeat: 1, ease: 'sine.inOut' }, sp(7, 0.78));

// 8. the whole room turns: faces pop, eyes swing, "Bhai." slams on the word
step('#s7', T.at(8));
tl.fromTo('#s7 .face', { scale: 0.5, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: POP, stagger: 0.07 }, T.at(8) + 0.05);
tl.fromTo('#s7 .eyes', { x: -16 }, { x: 16, duration: 0.35, ease: 'power2.inOut', stagger: 0.06 }, sp(8, 0.22));
tl.fromTo('#s7 .face', { rotation: 0 }, { rotation: 8, duration: 0.35, ease: 'power2.inOut', stagger: 0.06 }, sp(8, 0.22));
tl.fromTo('#s7-title', { scale: 1.6, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.25, ease: 'power4.in' }, sp(8, 0.68) - 0.25);
tl.fromTo('#s7-title', { y: 0 }, { y: -8, duration: 0.15, yoyo: true, repeat: 1, ease: 'sine.inOut' }, sp(8, 0.68));

// 9. the free planner: rows tick in, save, then the keyword drops letter by letter
step('#s8', T.at(9)); title('#s8', T.at(9) + 0.05); card('#s8-card', T.at(9) + 0.2);
['#pr1', '#pr2', '#pr3'].forEach((id, i) => tl.fromTo(id, { x: 50, opacity: 0 }, { x: 0, opacity: 1, duration: 0.35, ease: OUT }, sp(9, 0.12) + i * 0.3));
tl.fromTo('#s8 .tk', { scale: 0 }, { scale: 1, duration: 0.3, ease: POP, stagger: 0.3 }, sp(9, 0.12) + 0.15);
tl.fromTo('#s8-free', { scale: 0.6, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: POP }, sp(9, 0.4));
tl.fromTo('#s8-save', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: OUT }, sp(9, 0.5));
tl.fromTo('#s8-mark', { y: 0 }, { y: -12, duration: 0.18, yoyo: true, repeat: 1, ease: 'sine.inOut' }, sp(9, 0.5) + 0.4);
tl.fromTo('#s8-pill', { scale: 0.6, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.45, ease: POP }, sp(9, 0.66));
tl.fromTo('#s8-word .lt', { yPercent: -120, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.35, ease: POP, stagger: 0.05 }, sp(9, 0.8));
tl.fromTo('#s8-pill', { scale: 1 }, { scale: 1.05, duration: 0.25, yoyo: true, repeat: 1, ease: 'sine.inOut' }, T.end(9) + 0.1);
