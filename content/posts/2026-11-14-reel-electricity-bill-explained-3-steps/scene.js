// Tutorial: explain your electricity bill in 3 steps. Analogy: the bill is a prescription, the AI is the chemist who reads it out.
// Colour = meaning: blue = the AI, green = explained and fine, amber = check against the paper bill.
// Motion: enters expo.out, pops back.out, slams power4.in, labels settle after their card, slow ambient orbs.
// Every animated id is written out in full (no built-up id strings).
const OUT = 'expo.out', POP = 'back.out(1.8)';
const span = (n) => T.end(n) - T.voice(n);
const at = (n, f) => T.voice(n) + f * span(n);
const title = (sel, t) => tl.fromTo(sel, { yPercent: 110 }, { yPercent: 0, duration: 0.55, ease: OUT, stagger: 0.08 }, t);
const step = (sel, t) => tl.fromTo(sel, { x: -40, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4, ease: OUT }, t);
const card = (id, t) => tl.fromTo(id, { y: 110, opacity: 0, scale: 0.97 }, { y: 0, opacity: 1, scale: 1, duration: 0.6, ease: OUT }, t);
const late = (id, t) => tl.fromTo(id, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.35, ease: OUT }, t);
const pop = (id, t) => {
  tl.fromTo(id, { scale: 0, opacity: 0 }, { scale: 1.12, opacity: 1, duration: 0.22, ease: 'power2.out' }, t);
  tl.to(id, { scale: 1, duration: 0.18, ease: 'power2.inOut' }, t + 0.22);
};
const slide = (id, t, dx = 60) => tl.fromTo(id, { x: dx, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4, ease: OUT }, t);
const draw = (id, len, t, d = 0.5) => tl.fromTo(id, { strokeDashoffset: len }, { strokeDashoffset: 0, duration: d, ease: 'power2.out' }, t);
const type = (id, t, d, n) => tl.fromTo(id, { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: d, ease: 'steps(' + n + ')' }, t);

// ambient layer
tl.fromTo('#orb1', { x: 0, y: 0 }, { x: 160, y: -120, duration: T.dur, ease: 'sine.inOut' }, 0);
tl.fromTo('#orb2', { x: 0, y: 0 }, { x: -180, y: -150, duration: T.dur, ease: 'sine.inOut' }, 0);

// progress bar: one segment per step
tl.set(['#p1', '#p2', '#p3'], { scaleX: 0 }, 0);
[['#p1', 2], ['#p2', 3], ['#p3', 4]].forEach(([id, n]) => tl.to(id, { scaleX: 1, duration: 0.5, ease: 'power2.out' }, T.at(n) + 0.1));

// 0. hook: title and the camera demo are on screen at frame 0; shutter snaps, the AI bubble is already typing
tl.fromTo('#s0-title', { scale: 1.06 }, { scale: 1, duration: 0.7, ease: OUT }, 0);
tl.fromTo('#s0-step', { opacity: 0.5 }, { opacity: 1, duration: 0.3 }, 0);
tl.fromTo('#s0-shut', { scale: 1 }, { scale: 0.82, duration: 0.08, yoyo: true, repeat: 1, ease: 'power2.inOut' }, 0.1);
tl.fromTo('#s0-phone', { scale: 1 }, { scale: 0.97, duration: 0.08, ease: 'power2.out' }, 0.1);
tl.to('#s0-phone', { scale: 1, duration: 0.35, ease: POP }, 0.18);
tl.fromTo('#s0-flash', { opacity: 0 }, { opacity: 0.92, duration: 0.06, ease: 'power2.out' }, 0.15);
tl.to('#s0-flash', { opacity: 0, duration: 0.4, ease: 'power2.out' }, 0.22);
tl.fromTo('#s0-type', { clipPath: 'inset(0 70% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 1.1, ease: 'steps(12)' }, 0.35);
draw('#s0-up', 480, at(0, 0.5), 0.6);
tl.fromTo('#s0-bub', { scale: 1 }, { scale: 1.05, duration: 0.15, yoyo: true, repeat: 1, ease: 'sine.inOut' }, at(0, 0.8));

// 1. the prescription: four charges land with the voice, scrawled amounts, grey question marks, then the Rx
step('#s1 .step', T.at(1)); title('#s1 .title .l', T.at(1) + 0.05); card('#s1-card', T.at(1) + 0.12); late('#s1-head', T.at(1) + 0.4);
[['#s1-r1', '#s1-w1', '#s1-q1'], ['#s1-r2', '#s1-w2', '#s1-q2'], ['#s1-r3', '#s1-w3', '#s1-q3'], ['#s1-r4', '#s1-w4', '#s1-q4']].forEach(([r, w, q], i) => {
  const t = at(1, 0.04 + i * 0.1);
  slide(r, t);
  draw(w, 420, t + 0.12, 0.5);
  pop(q, t + 0.25);
});
tl.fromTo('#s1-rx', { scale: 2.2, opacity: 0, rotation: -24 }, { scale: 1, opacity: 1, rotation: -8, duration: 0.25, ease: 'power4.in' }, at(1, 0.62));
draw('#s1-sp', 520, at(1, 0.62) + 0.1, 0.6);
tl.to('#s1 .q', { rotation: 12, duration: 0.08, yoyo: true, repeat: 5, stagger: 0.05, ease: 'sine.inOut' }, at(1, 0.86));

// 2. step 1: number blocks appear, the CROPPED bar wipes over them, then the shutter flashes
step('#s2 .step', T.at(2)); title('#s2 .title .l', T.at(2) + 0.05); card('#s2-card', T.at(2) + 0.12);
tl.fromTo('#s2-n i', { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.3, ease: POP, stagger: 0.05 }, T.at(2) + 0.35);
tl.fromTo('#s2-cover', { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 0.4, ease: 'power3.out' }, at(2, 0.18));
tl.fromTo('#s2-crop', { scale: 0.6, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.3, ease: POP }, at(2, 0.18) + 0.3);
tl.fromTo('#s2-shut', { scale: 1 }, { scale: 0.84, duration: 0.08, yoyo: true, repeat: 1, ease: 'power2.inOut' }, T.voice(2) + 0.85);
tl.fromTo('#s2-flash', { opacity: 0 }, { opacity: 0.9, duration: 0.06, ease: 'power2.out' }, T.voice(2) + 0.9);
tl.to('#s2-flash', { opacity: 0, duration: 0.4, ease: 'power2.out' }, T.voice(2) + 0.97);
tl.fromTo('#s2-vf', { scale: 1 }, { scale: 1.03, duration: 0.15, yoyo: true, repeat: 1, ease: 'sine.inOut' }, T.voice(2) + 0.95);
late('#s2-note', T.voice(2) + 1.3);
late('#s2-tip', T.voice(2) + 1.5);

// 3. step 2: the prompt types line by line, the photo chip, the Hindi / English toggle flips, Send
step('#s3 .step', T.at(3)); title('#s3 .title .l', T.at(3) + 0.05); card('#s3-card', T.at(3) + 0.12); late('#s3-head', T.at(3) + 0.4);
['#s3-l1', '#s3-l2', '#s3-l3'].forEach((id, i) => type(id, T.voice(3) + 0.1 + i * 0.5, 0.45, 14));
late('#s3-note', T.voice(3) + 1.2);
pop('#s3-att', T.voice(3) + 1.6);
pop('#s3-tog', at(3, 0.6));
tl.fromTo('#s3-knob', { x: 0 }, { x: 164, duration: 0.4, ease: 'power2.inOut' }, at(3, 0.8));
pop('#s3-go', at(3, 0.88));

// 4. step 3: the question pops, the AI starts typing
step('#s4 .step', T.at(4)); title('#s4 .title .l', T.at(4) + 0.05); card('#s4-card', T.at(4) + 0.1);
slide('#s4-photo', T.at(4) + 0.3);
slide('#s4-ai', T.at(4) + 0.38, -50);
pop('#s4-q', T.voice(4) + 0.35);
late('#s4-note', T.voice(4) + 0.6);
pop('#s4-dots', T.voice(4) + 0.95);
tl.fromTo('#s4-dots .dot', { y: 0 }, { y: -12, duration: 0.18, yoyo: true, repeat: 3, ease: 'sine.inOut', stagger: 0.08 }, T.voice(4) + 1.1);
tl.to('#s4-dots', { scale: 1.15, duration: 0.1, yoyo: true, repeat: 1, ease: 'power2.out' }, T.end(4) - 0.02);

// 5. payoff: every charge on one plain line, green fine, amber check; the chemist tag lands on the ding
step('#s5 .step', T.at(5)); title('#s5 .title .l', T.at(5) + 0.05); card('#s5-card', T.at(5) + 0.1); late('#s5-ex', T.at(5) + 0.35);
['#s5-r1', '#s5-r2', '#s5-r3', '#s5-r4', '#s5-r5'].forEach((id, i) => slide(id, T.voice(5) + 0.15 + i * 0.2, 50));
pop('#s5-tag', T.voice(5) + 1.4);
tl.to(['#s5-r4', '#s5-r5'], { scale: 1.03, duration: 0.18, yoyo: true, repeat: 1, ease: 'sine.inOut', stagger: 0.1 }, at(5, 0.82));

// 6. the catch: the figure blurs (buzz), the amber magnifier checks the paper, then it matches
step('#s6 .step', T.at(6)); title('#s6 .title .l', T.at(6) + 0.05); card('#s6-card', T.at(6) + 0.1);
late('#s6-l1', T.at(6) + 0.3); slide('#s6-ai', T.at(6) + 0.3);
late('#s6-l2', T.at(6) + 0.42); slide('#s6-paper', T.at(6) + 0.42);
tl.fromTo('#s6-val', { filter: 'blur(0px)' }, { filter: 'blur(9px)', duration: 0.3, ease: 'power2.out' }, T.voice(6) + 0.55);
tl.to('#s6-ai', { x: 8, duration: 0.05, repeat: 5, yoyo: true, ease: 'none' }, T.voice(6) + 0.7);
pop('#s6-mag', T.voice(6) + 0.95);
tl.fromTo('#s6-mag', { y: 0 }, { y: 206, duration: 0.45, ease: 'power2.inOut' }, T.voice(6) + 1.45);
tl.to('#s6-paper', { borderColor: '#E8A317', duration: 0.2, ease: 'power2.out' }, T.voice(6) + 1.85);
tl.to('#s6-mag', { y: 0, duration: 0.4, ease: 'power2.inOut' }, T.voice(6) + 2.1);
tl.to('#s6-val', { filter: 'blur(0px)', duration: 0.3, ease: 'power2.out' }, T.voice(6) + 2.45);
pop('#s6-tick', T.voice(6) + 2.55);
late('#s6-okt', T.voice(6) + 2.65);
late('#s6-tip', T.voice(6) + 2.8);

// 7. disputes: the bubble heads for the chat, the arrow sends it to the board, a tick
step('#s7 .step', T.at(7)); title('#s7 .title .l', T.at(7) + 0.05); card('#s7-chat', T.at(7) + 0.1);
late('#s7-l1', T.at(7) + 0.35); slide('#s7-ai', T.at(7) + 0.35, -50);
tl.fromTo('#s7-bub', { x: 60, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4, ease: OUT }, T.voice(7) + 0.2);
card('#s7-board', T.voice(7) + 0.45);
draw('#s7-ap', 200, at(7, 0.42), 0.4);
tl.fromTo('#s7-ah', { opacity: 0 }, { opacity: 1, duration: 0.15, ease: 'power2.out' }, at(7, 0.42) + 0.35);
tl.fromTo('#s7-bub', { y: 0 }, { y: 450, duration: 0.5, ease: 'power2.inOut' }, at(7, 0.42) + 0.45);
pop('#s7-tick', at(7, 0.42) + 1.0);
late('#s7-bl', at(7, 0.42) + 1.05);

// 8. save + keyword: the 3-step list card, the sticker, then BILL drops in letter by letter
title('#s8 .title .l', T.at(8) + 0.05);
tl.fromTo('#s8-mark', { y: -80, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: 'back.out(2)' }, T.at(8) + 0.3);
card('#s8-card', T.at(8) + 0.35); late('#s8-head', T.at(8) + 0.6);
[['#s8-r1', '#s8-n1'], ['#s8-r2', '#s8-n2'], ['#s8-r3', '#s8-n3']].forEach(([r, n], i) => { slide(r, T.voice(8) + 0.6 + i * 0.07); pop(n, T.voice(8) + 0.8 + i * 0.07); });
pop('#s8-stk', at(8, 0.35));
tl.fromTo('#s8-pill', { scale: 0.6, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.45, ease: POP }, at(8, 0.6));
tl.fromTo('#s8-kw .k', { y: -70, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: 'back.out(2)', stagger: 0.07 }, at(8, 0.6) + 0.3);
tl.to('#s8-pill', { scale: 1.05, duration: 0.2, yoyo: true, repeat: 1, ease: 'sine.inOut' }, T.end(8) + 0.1);
tl.to('#s8-mark', { rotation: -8, duration: 0.15, yoyo: true, repeat: 3, ease: 'sine.inOut' }, T.end(8) + 0.4);
