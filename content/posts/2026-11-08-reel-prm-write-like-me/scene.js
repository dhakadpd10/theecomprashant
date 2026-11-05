// Prompt explainer: make AI write like you. One idea (it copies the voice you show it), one analogy (a tailor copying your old kurta).
// Colour = meaning: red = robot voice, blue = your voice, green = matched, amber = the catch.
// Motion: enters expo.out 0.4 to 0.55 s, pops back.out, stamp slams power4.in, labels settle late, two orbs drift all reel.
const OUT = 'expo.out', POP = 'back.out(1.8)';
const span = (n) => T.end(n) - T.voice(n);
const title = (s, t) => tl.fromTo(`${s} .title .l`, { yPercent: 110 }, { yPercent: 0, duration: 0.55, ease: OUT, stagger: 0.08 }, t);
const step = (s, t) => tl.fromTo(`${s} .step`, { x: -40, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4, ease: OUT }, t);
const card = (id, t, d = 0.55) => tl.fromTo(id, { y: 110, opacity: 0, scale: 0.96 }, { y: 0, opacity: 1, scale: 1, duration: d, ease: OUT }, t);
const late = (id, t) => tl.fromTo(id, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.35, ease: OUT }, t);
const slide = (id, t, dx = 60) => tl.fromTo(id, { x: dx, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4, ease: OUT }, t);
const pop = (id, t) => {
  tl.fromTo(id, { scale: 0, opacity: 0 }, { scale: 1.1, opacity: 1, duration: 0.22, ease: 'power2.out' }, t);
  tl.to(id, { scale: 1, duration: 0.16, ease: 'power2.inOut' }, t + 0.22);
};
const shake = (id, t, px = 8) => tl.fromTo(id, { x: 0 }, { x: px, duration: 0.05, repeat: 5, yoyo: true, ease: 'none' }, t);

// ambient layer
tl.fromTo('#orb1', { x: 0, y: 0 }, { x: 170, y: -110, duration: T.dur, ease: 'sine.inOut' }, 0);
tl.fromTo('#orb2', { x: 0, y: 0 }, { x: -190, y: -150, duration: T.dur, ease: 'sine.inOut' }, 0);

// progress bar: one segment per beat after the hook
tl.set(['#p1', '#p2', '#p3', '#p4', '#p5', '#p6', '#p7', '#p8'], { scaleX: 0 }, 0);
[1, 2, 3, 4, 5, 6, 7, 8].forEach((n) => tl.to(`#p${n}`, { scaleX: 1, duration: 0.5, ease: 'power2.out' }, T.at(n)));

// 0. hook: title on screen at frame 0, slams on the thud, "robot" shakes, squiggle draws, then the blue fix pill
tl.fromTo('#s0-title', { scale: 1.1 }, { scale: 1, duration: 0.25, ease: 'power4.in' }, 0.03);
tl.fromTo('#s0-step', { opacity: 0.5 }, { opacity: 1, duration: 0.3, ease: 'power2.out' }, 0);
tl.fromTo('#squig-p', { strokeDashoffset: 420 }, { strokeDashoffset: 0, duration: 0.6, ease: 'power2.out' }, T.voice(0) + 0.5);
shake('#s0-robot', T.voice(0) + 0.35 * span(0), 7);
tl.fromTo('#s0-pill', { scale: 0.6, opacity: 0, y: 16 }, { scale: 1, opacity: 1, y: 0, duration: 0.4, ease: POP }, T.voice(0) + 0.62 * span(0));

// 1. on the bus: client asks, typing dots, the robot reply lands, BANK NOTICE slams on the buzz
step('#s1', T.at(1)); title('#s1', T.at(1) + 0.05); card('#s1-card', T.at(1) + 0.15);
late('#s1-head', T.at(1) + 0.4);
tl.fromTo('#s1-in', { scale: 0.6, opacity: 0, y: 20 }, { scale: 1, opacity: 1, y: 0, duration: 0.35, ease: POP }, T.voice(1) + 0.25);
tl.fromTo('#s1-dots', { opacity: 0, scale: 0.6 }, { opacity: 1, scale: 1, duration: 0.2, ease: POP }, T.voice(1) + 0.45);
tl.fromTo('#s1-dots i', { y: 0 }, { y: -8, duration: 0.12, yoyo: true, repeat: 1, stagger: 0.05, ease: 'sine.inOut' }, T.voice(1) + 0.5);
tl.to('#s1-dots', { opacity: 0, duration: 0.12, ease: 'power3.in' }, T.voice(1) + 0.78);
tl.fromTo('#s1-out', { x: 50, opacity: 0, scale: 0.9 }, { x: 0, opacity: 1, scale: 1, duration: 0.4, ease: POP }, T.voice(1) + 0.85);
tl.fromTo('#s1-stamp', { scale: 2.4, opacity: 0, rotation: -24 }, { scale: 1, opacity: 1, rotation: -8, duration: 0.22, ease: 'power4.in' }, T.voice(1) + 1.28);
shake('#s1-card', T.voice(1) + 1.5, 8);
late('#s1-note', T.voice(1) + 1.9);

// 2. its own voice: its stock words pop, its bar fills red, yours stays empty, three blank slots wait
step('#s2', T.at(2)); title('#s2', T.at(2) + 0.05); card('#s2-card', T.at(2) + 0.15);
late('#s2-head', T.at(2) + 0.4);
['#w1', '#w2', '#w3', '#w4'].forEach((id, i) => pop(id, T.voice(2) + 0.2 + i * 0.07));
slide('#v1', T.voice(2) + 0.3 * span(2));
tl.fromTo('#v1 .fill', { scaleX: 0 }, { scaleX: 1, duration: 0.6, ease: 'power3.out' }, T.voice(2) + 0.3 * span(2) + 0.05);
slide('#v2', T.voice(2) + 0.48 * span(2));
pop('#v2-chip', T.voice(2) + 0.62 * span(2));
late('#s2-note', T.voice(2) + 0.66 * span(2));
['#sl1', '#sl2', '#sl3'].forEach((id, i) => pop(id, T.voice(2) + 0.72 * span(2) + i * 0.07));

// 3. the tailor: old kurta in, new one drawn as an outline, then filled to match, tape measure wipes across
step('#s3', T.at(3)); title('#s3', T.at(3) + 0.05);
card('#s3-a', T.at(3) + 0.1, 0.5); card('#s3-b', T.at(3) + 0.2, 0.5);
late('#s3-yours', T.at(3) + 0.45);
tl.fromTo('#s3-arrow', { x: -30, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4, ease: OUT }, T.at(3) + 0.4);
tl.fromTo('#s3-line', { strokeDashoffset: 1300 }, { strokeDashoffset: 0, duration: 0.7, ease: 'power2.inOut' }, T.voice(3) + 0.25);
tl.fromTo('#s3-tape', { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 0.5, ease: 'power3.out' }, T.voice(3) + 0.45 * span(3));
tl.fromTo('#s3-fill', { opacity: 0 }, { opacity: 1, duration: 0.3, ease: 'power2.out' }, T.voice(3) + 0.6 * span(3));
tl.fromTo('#s3-det', { opacity: 0 }, { opacity: 1, duration: 0.3, ease: 'power2.out' }, T.voice(3) + 0.6 * span(3) + 0.06);
late('#s3-fit', T.voice(3) + 0.72 * span(3));
tl.to('#s3-b', { scale: 1.04, duration: 0.14, yoyo: true, repeat: 1, ease: 'sine.inOut' }, T.voice(3) + 0.72 * span(3));

// 4. the prompt: three of your messages paste in on the click, the instruction types, Send presses
step('#s4', T.at(4)); title('#s4', T.at(4) + 0.05); card('#s4-card', T.at(4) + 0.15);
late('#s4-head', T.at(4) + 0.4);
['#m1', '#m2', '#m3'].forEach((id, i) => slide(id, T.voice(4) + 0.3 + i * T.beat));
late('#s4-ex', T.voice(4) + 0.3 + 2 * T.beat + 0.3);
tl.fromTo('#l1', { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 0.45, ease: 'steps(16)' }, T.voice(4) + 0.48 * span(4));
tl.fromTo('#l2', { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 0.45, ease: 'steps(15)' }, T.voice(4) + 0.48 * span(4) + 0.5);
pop('#s4-go', T.voice(4) + 0.72 * span(4));
late('#s4-new', T.voice(4) + 0.78 * span(4));
tl.to('#s4-go', { scale: 0.9, duration: 0.1, yoyo: true, repeat: 1, ease: 'power2.inOut' }, T.end(4) - 0.25);

// 5. the result: the robot line is struck out, your-tone reply pops on the pop, three green matches
step('#s5', T.at(5)); title('#s5', T.at(5) + 0.03); card('#s5-card', T.at(5) + 0.03, 0.45);
late('#s5-l1', T.at(5) + 0.08);
slide('#s5-old', T.at(5) + 0.1, 40);
tl.fromTo('#s5-strike', { scaleX: 0 }, { scaleX: 1, duration: 0.25, ease: 'power3.in' }, T.at(5) + 0.22);
late('#s5-l2', T.at(5) + 0.25);
tl.fromTo('#s5-new', { scale: 0.7, opacity: 0, y: 30 }, { scale: 1, opacity: 1, y: 0, duration: 0.4, ease: POP }, T.voice(5) + 0.2);
['#f1', '#f2', '#f3'].forEach((id, i) => tl.fromTo(id, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.3, ease: POP }, T.at(5) + 0.58 + i * 0.06));
late('#s5-note', T.at(5) + 0.72);
tl.to('#s5-new', { scale: 1.04, duration: 0.12, yoyo: true, repeat: 1, ease: 'sine.inOut' }, T.at(5) + 0.98);

// 6. the catch: three rows land as each limit is said
step('#s6', T.at(6)); title('#s6', T.at(6) + 0.05); card('#s6-card', T.at(6) + 0.15);
[['#k1', '#c1', 0.75], ['#k2', '#c2', 1.55], ['#k3', '#c3', 2.05]].forEach(([k, c, d]) => {
  tl.fromTo(k, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.35, ease: OUT }, T.voice(6) + d);
  pop(c, T.voice(6) + d + 0.12);
});
late('#s6-note', T.voice(6) + 2.35);

// 7. send this: the plane arcs in, then the friend's robot text shakes
title('#s7', T.at(7));
tl.fromTo('#s7-plane', { x: -240, y: 120, opacity: 0, rotation: -20 }, { x: 0, y: 0, opacity: 1, rotation: 0, duration: 0.7, ease: 'power2.out' }, T.at(7) + 0.25);
late('#s7-who', T.voice(7) + 0.3);
late('#s7-lbl', T.voice(7) + 0.5 * span(7));
tl.fromTo('#s7-bub', { scale: 0.6, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: POP }, T.voice(7) + 0.55 * span(7));
shake('#s7-bub', T.voice(7) + 0.55 * span(7) + 0.45, 7);
tl.to('#s7-plane', { x: 24, y: -18, duration: 0.8, yoyo: true, repeat: 1, ease: 'sine.inOut' }, T.end(7) - 1.6);

// 8. keyword: Save + bookmark, STYLE tiles drop, the row bumps on the ding, FREE sticker, dark pill
title('#s8', T.at(8));
tl.fromTo('#s8-mark', { y: -60, opacity: 0 }, { y: 0, opacity: 1, duration: 0.45, ease: POP }, T.at(8) + 0.15);
late('#s8-lbl', T.at(8) + 0.2);
['#t1', '#t2', '#t3', '#t4', '#t5'].forEach((id, i) => tl.fromTo(id, { y: -90, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: 'back.out(1.6)' }, T.at(8) + i * 0.06));
tl.to('#s8-tiles', { scale: 1.06, duration: 0.15, yoyo: true, repeat: 1, ease: 'sine.inOut' }, T.voice(8) + 0.4);
tl.fromTo('#s8-sticker', { scale: 0, opacity: 0, rotation: -25 }, { scale: 1, opacity: 1, rotation: 10, duration: 0.4, ease: POP }, T.voice(8) + 0.4);
tl.fromTo('#s8-pill', { scale: 0.6, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.45, ease: POP }, T.voice(8) + 0.55 * span(8));
late('#s8-free', T.voice(8) + 1.0);
tl.to('#s8-pill', { scale: 1.05, duration: 0.3, yoyo: true, repeat: 1, ease: 'sine.inOut' }, T.end(8) + 0.2);
tl.fromTo('#s8-mark', { rotation: 0 }, { rotation: 8, duration: 0.12, yoyo: true, repeat: 3, ease: 'sine.inOut' }, T.end(8) + 0.5);
