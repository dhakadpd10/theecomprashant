// Explain reel: why ChatGPT makes things up. One idea (it predicts the likely next word), one analogy (phone keyboard).
// Colour = meaning: blue = the AI's pick, green = true, red = wrong, amber = unsure.
// Motion: enters expo.out ~0.55 s, pops back.out, slams power4.in from big scale, labels settle after their card.
const OUT = 'expo.out', POP = 'back.out(1.8)', SLAM = 'power4.in';
const span = (n) => T.end(n) - T.voice(n);
const at = (n, f) => T.voice(n) + f * span(n);
const title = (s, t) => tl.fromTo(`${s} .title .l`, { yPercent: 110 }, { yPercent: 0, duration: 0.55, ease: OUT, stagger: 0.08 }, t);
const stepIn = (s, t) => tl.fromTo(`${s} .step`, { opacity: 0, y: -16 }, { opacity: 1, y: 0, duration: 0.4, ease: 'power3.out' }, t);
const cardIn = (id, t) => tl.fromTo(id, { y: 90, opacity: 0, rotation: 1.5 }, { y: 0, opacity: 1, rotation: 0, duration: 0.55, ease: OUT }, t);
const settle = (id, t) => tl.fromTo(id, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.35, ease: 'power3.out' }, t);
const slideIn = (id, t, dx = 50) => tl.fromTo(id, { x: dx, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4, ease: OUT }, t);
const chip = (id, t) => { // overshoot then settle
  tl.fromTo(id, { scale: 0, opacity: 0 }, { scale: 1.12, opacity: 1, duration: 0.22, ease: 'power2.out' }, t);
  tl.to(id, { scale: 1, duration: 0.16, ease: 'power2.inOut' }, t + 0.22);
};
const fill = (sel, t, d = 0.6) => tl.fromTo(sel, { scaleX: 0 }, { scaleX: 1, duration: d, ease: 'power3.out' }, t);
const slam = (id, t, rot) => tl.fromTo(id, { scale: 2.3, opacity: 0, rotation: rot - 12 }, { scale: 1, opacity: 1, rotation: rot, duration: 0.22, ease: SLAM }, t);
const shake = (id, t, px = 8) => tl.fromTo(id, { x: 0 }, { x: px, duration: 0.05, repeat: 5, yoyo: true, ease: 'sine.inOut' }, t);
const count = (id, to, t, d = 0.6) => { const o = { v: 0 }; tl.fromTo(o, { v: 0 }, { v: to, duration: d, ease: 'power3.out', onUpdate: () => { document.getElementById(id).textContent = `${Math.round(o.v)}%`; } }, t); };

// texture: soft orbs drift, the ruled paper creeps up, all reel long
tl.fromTo('#orbA', { x: 0, y: 0 }, { x: 140, y: -110, duration: T.dur, ease: 'sine.inOut' }, 0);
tl.fromTo('#orbB', { x: 0, y: 0 }, { x: -160, y: -140, duration: T.dur, ease: 'sine.inOut' }, 0);
tl.fromTo('#ruled', { y: 0 }, { y: -64, duration: T.dur, ease: 'none' }, 0);

// progress bar: one segment per beat after the hook
tl.set(['#p1', '#p2', '#p3', '#p4', '#p5', '#p6', '#p7', '#p8'], { scaleX: 0 }, 0);
[1, 2, 3, 4, 5, 6, 7, 8].forEach((n) => tl.to(`#p${n}`, { scaleX: 1, duration: 0.5, ease: 'power2.out' }, T.at(n)));

// 0. hook: the warning is on screen at frame 0, squiggle under "facts." as he says it, a punch on "interview"
tl.fromTo('#s0-title .l', { yPercent: 0 }, { yPercent: 0, duration: 0.01 }, 0);
tl.fromTo('#s0-title', { scale: 1.05 }, { scale: 1, duration: 0.8, ease: OUT }, 0);
tl.fromTo('#s0-step', { opacity: 1, x: 0 }, { opacity: 1, x: 0, duration: 0.01 }, 0);
tl.fromTo('#squig-p', { strokeDashoffset: 400 }, { strokeDashoffset: 0, duration: 0.5, ease: 'power2.out' }, at(0, 0.5));
tl.fromTo('#s0-step', { x: 0 }, { x: 8, duration: 0.05, repeat: 5, yoyo: true, ease: 'sine.inOut' }, at(0, 0.82));
tl.to('#s0-title', { scale: 1.03, duration: 0.15, yoyo: true, repeat: 1, ease: 'sine.inOut' }, at(0, 0.84));

// 1. the chat: question, confident wrong answer, WRONG YEAR slams on "wrong" (thud), the real year lands
stepIn('#s1', T.at(1)); title('#s1', T.at(1) + 0.04); cardIn('#s1-card', T.at(1) + 0.1);
settle('#s1-lbl', T.at(1) + 0.3);
slideIn('#s1-q', T.at(1) + 0.25, 40);
tl.fromTo('#s1-a', { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.35, ease: POP }, T.voice(1) + 0.35);
slam('#s1-stamp', T.end(1) - 0.52, -8);
shake('#s1-card', T.end(1) - 0.3, 7);
tl.fromTo('#s1-truth', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.3, ease: OUT }, T.end(1) - 0.4);
chip('#s1-chip', T.end(1) - 0.3);

// 2. the analogy: the keyboard types, offers three words with odds, the top one wins
stepIn('#s2', T.at(2)); title('#s2', T.at(2) + 0.04); cardIn('#s2-card', T.at(2) + 0.1);
tl.fromTo('#typed-a', { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 0.6, ease: 'steps(21)' }, T.at(2) + 0.35);
tl.fromTo('#typed-b', { opacity: 0 }, { opacity: 1, duration: 0.2, ease: 'power2.out' }, at(2, 0.8));
tl.fromTo('#caret', { opacity: 1 }, { opacity: 0, duration: 0.3, repeat: 7, yoyo: true, ease: 'steps(1)' }, T.at(2) + 0.35);
['#g1', '#g2', '#g3'].forEach((id, i) => chip(id, T.voice(2) + 0.2 + i * 0.07));
[['#q1', 'n1', 55], ['#q2', 'n2', 25], ['#q3', 'n3', 10]].forEach(([q, n, v], i) => {
  const t = at(2, 0.3) + i * 0.07;
  tl.fromTo(q, { opacity: 0 }, { opacity: 1, duration: 0.25, ease: 'power2.out' }, t);
  fill(`${q} .fill`, t + 0.05); count(n, v, t + 0.05);
});
tl.fromTo('#g1', { backgroundColor: '#EEEAE3', color: '#1E1A16' }, { backgroundColor: '#2F4BD8', color: '#FFFFFF', duration: 0.2, ease: 'power2.out' }, at(2, 0.72));
tl.to('#g1', { scale: 1.1, duration: 0.15, yoyo: true, repeat: 1, ease: 'sine.inOut' }, at(2, 0.72));
settle('#s2-lbl', at(2, 0.85));

// 3. likely isn't true: three years with odds, it picks 2012, it says it boldly, WRONG slams (buzz), 2015 was TRUE
stepIn('#s3', T.at(3)); title('#s3', T.at(3) + 0.04); cardIn('#s3-card', T.at(3) + 0.1);
tl.fromTo('#s3 .ask', { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 0.5, ease: 'steps(14)' }, T.at(3) + 0.35);
settle('#s3-lbl', T.at(3) + 0.5);
['#c1', '#c2', '#c3'].forEach((id, i) => { slideIn(id, T.voice(3) + 0.1 + i * 0.07, 40); fill(`${id} .fill`, T.voice(3) + 0.15 + i * 0.07, 0.55); });
chip('#c1-chip', T.voice(3) + 0.75);
tl.fromTo('#said', { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.35, ease: OUT }, T.voice(3) + 0.9);
slam('#s3-stamp', T.voice(3) + 1.18, -9);
shake('#said', T.voice(3) + 1.4, 8);
chip('#c2-chip', T.voice(3) + 1.55);
settle('#s3-note', T.voice(3) + 1.7);

// 4. the fix: the prompt types in line by line (pop), the key words in blue, Send pops then presses
stepIn('#s4', T.at(4)); title('#s4', T.at(4) + 0.04); cardIn('#s4-card', T.at(4) + 0.1);
settle('#s4-lbl', T.at(4) + 0.4);
tl.fromTo('#prompt', { scale: 1 }, { scale: 1.03, duration: 0.12, yoyo: true, repeat: 1, ease: 'sine.inOut' }, T.voice(4) + 0.55);
['#l1', '#l2', '#l3', '#l4'].forEach((id, i) => tl.fromTo(id, { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 0.4, ease: 'steps(16)' }, T.voice(4) + 0.6 + i * 0.5));
settle('#s4-works', T.voice(4) + 2.2);
tl.fromTo('#go', { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.35, ease: POP }, T.voice(4) + 2.1);
tl.to('#go', { scale: 0.92, duration: 0.1, yoyo: true, repeat: 1, ease: 'power2.inOut' }, T.end(4) - 0.3);

// 5. the result: the old answer is struck out, UNSURE lands (pop), then what to check; the card bumps on the whistle
stepIn('#s5', T.at(5)); title('#s5', T.at(5) + 0.04); cardIn('#s5-card', T.at(5) + 0.1);
settle('#s5-lbl', T.at(5) + 0.35);
slideIn('#a0', T.at(5) + 0.4, 40);
tl.fromTo('#s5-strike', { scaleX: 0 }, { scaleX: 1, duration: 0.3, ease: 'power3.in' }, T.voice(5) + 0.45);
settle('#s5-lbl2', T.voice(5) + 0.65);
slideIn('#a1', T.voice(5) + 0.72, 60);
chip('#a1c', T.voice(5) + 0.82);
slideIn('#a2', at(5, 0.55), 60); chip('#a2c', at(5, 0.55) + 0.1);
slideIn('#a3', at(5, 0.7), 60); chip('#a3c', at(5, 0.7) + 0.1);
tl.fromTo('#a1c', { rotation: 0 }, { rotation: 5, duration: 0.08, repeat: 5, yoyo: true, ease: 'sine.inOut' }, at(5, 0.84));
settle('#s5-note', at(5, 0.8));
tl.fromTo('#s5-card', { scale: 1 }, { scale: 1.03, duration: 0.17, yoyo: true, repeat: 1, ease: 'sine.inOut' }, at(5, 0.88));

// 6. the catch: made-up answers drop a lot but not to zero; then check their own site
stepIn('#s6', T.at(6)); title('#s6', T.at(6) + 0.04); cardIn('#s6-card', T.at(6) + 0.1);
settle('#s6-lbl', T.at(6) + 0.4);
tl.fromTo('#m1', { opacity: 0 }, { opacity: 1, duration: 0.25, ease: 'power2.out' }, T.voice(6) + 0.15);
fill('#m1 .fill', T.voice(6) + 0.2, 0.7);
tl.fromTo('#m2', { opacity: 0 }, { opacity: 1, duration: 0.25, ease: 'power2.out' }, T.voice(6) + 0.15 + T.beat);
fill('#m2 .fill', T.voice(6) + 0.2 + T.beat, 0.5);
chip('#nz', at(6, 0.36));
tl.fromTo('#s6-rule', { scaleX: 0 }, { scaleX: 1, duration: 0.4, ease: 'power2.inOut' }, at(6, 0.5));
slideIn('#s6-check', at(6, 0.58), 40);
tl.fromTo('#tick-p', { strokeDashoffset: 50 }, { strokeDashoffset: 0, duration: 0.35, ease: 'power2.out' }, at(6, 0.66));
tl.fromTo('#site', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: OUT }, at(6, 0.74));

// 7. send: copy, paste, submit, then NO CHECK slams; the forward pill arrives
title('#s7', T.at(7)); cardIn('#s7-card', T.at(7) + 0.15);
settle('#s7-lbl', T.at(7) + 0.45);
['#f1', '#f2', '#f3'].forEach((id, i) => chip(id, T.voice(7) + 0.5 + i * T.beat));
['#v1', '#v2'].forEach((id, i) => tl.fromTo(id, { opacity: 0, x: -10 }, { opacity: 1, x: 0, duration: 0.25, ease: 'power3.out' }, T.voice(7) + 0.8 + i * T.beat));
slam('#s7-stamp', at(7, 0.62), -6);
shake('#s7-card', at(7, 0.62) + 0.22, 6);
tl.fromTo('#fwd', { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.45, ease: OUT }, at(7, 0.76));
tl.fromTo('#fwd-arrow', { x: 0 }, { x: 10, duration: 0.3, yoyo: true, repeat: 3, ease: 'sine.inOut' }, at(7, 0.76) + 0.45);

// 8. keyword: Save. + bookmark, TRUTH letters drop into the comment (bloop), the sticker and the dark pill
title('#s8', T.at(8));
tl.fromTo('#s8-mark', { y: -80, opacity: 0 }, { y: 0, opacity: 1, duration: 0.45, ease: 'back.out(2)' }, T.at(8) + 0.15);
cardIn('#s8-bubble', T.at(8) + 0.08);
chip('#s8-av', T.at(8) + 0.25);
settle('#s8-lbl', T.at(8) + 0.35);
tl.fromTo('#s8 .k', { y: -170, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: 'back.out(1.6)', stagger: 0.07 }, T.voice(8) + 0.3);
tl.fromTo('#s8-pill', { scale: 0.6, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.45, ease: POP }, T.voice(8) + 0.75);
tl.fromTo('#s8-free', { scale: 0, opacity: 0, rotation: -20 }, { scale: 1, opacity: 1, rotation: 6, duration: 0.4, ease: POP }, T.voice(8) + 0.95);
settle('#s8-note', T.end(8));
tl.to('#s8 .k', { scale: 1.08, duration: 0.15, yoyo: true, repeat: 1, stagger: 0.06, ease: 'sine.inOut' }, T.end(8) + 0.3);
tl.to('#s8-mark', { y: -10, duration: 0.6, yoyo: true, repeat: 1, ease: 'sine.inOut' }, T.end(8) + 0.2);
