// DRAFT TEMPLATE: compare reel, ChatGPT vs Gemini vs Claude on one real CV. Analogy: the darzi (take it in, never sew a new pocket).
// Every result on stage is a {{...}} in scene.html, to be filled from the filming-day screenshots. This file draws no result itself.
// Colour = meaning: green = real fact kept, red = invented, amber = check it, blue = the prompt / the AI.
// Motion: enters expo.out, pops back.out, slams power4.in, stagger 0.06 to 0.08 s, labels settle late, orbs drift all reel.
// Every id is written out in full (no ids built from numbers), so each one can be matched to scene.html.
const OUT = 'expo.out', POP = 'back.out(1.8)';
const span = (n) => T.end(n) - T.voice(n);
const at = (n, f) => T.voice(n) + f * span(n);
const title = (s, t) => tl.fromTo(`${s} .title .l`, { yPercent: 110 }, { yPercent: 0, duration: 0.55, ease: OUT, stagger: 0.08 }, t);
const step = (s, t) => tl.fromTo(`${s} .step`, { x: -40, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4, ease: OUT }, t);
const card = (id, t) => tl.fromTo(id, { y: 110, opacity: 0, scale: 0.96 }, { y: 0, opacity: 1, scale: 1, duration: 0.6, ease: OUT }, t);
const late = (id, t) => tl.fromTo(id, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.35, ease: OUT }, t);
const chip = (id, t) => {
  tl.fromTo(id, { scale: 0, opacity: 0 }, { scale: 1.12, opacity: 1, duration: 0.22, ease: 'power2.out' }, t);
  tl.to(id, { scale: 1, duration: 0.18, ease: 'power2.inOut' }, t + 0.22);
};
const shake = (id, t, px = 8) => tl.fromTo(id, { x: 0 }, { x: px, duration: 0.05, repeat: 5, yoyo: true, ease: 'none' }, t);
const open = (s, cardId, n) => { step(s, T.at(n)); title(s, T.at(n) + 0.05); card(cardId, T.at(n) + 0.12); };

// ambient: two soft orbs drift for the whole reel
tl.fromTo('#orb1', { x: 0, y: 0 }, { x: 170, y: -120, duration: T.dur, ease: 'sine.inOut' }, 0);
tl.fromTo('#orb2', { x: 0, y: 0 }, { x: -180, y: -150, duration: T.dur, ease: 'sine.inOut' }, 0);

// progress bar, one segment per beat after the hook
const BAR = ['#p1', '#p2', '#p3', '#p4', '#p5', '#p6', '#p7'];
tl.set(BAR, { scaleX: 0 }, 0);
BAR.forEach((id, i) => tl.to(id, { scaleX: 1, duration: 0.5, ease: 'power2.out' }, T.at(i + 1)));

// 0. hook: the three names are on screen at frame 0, punch on the thud, red chip lands on "Red means invented"
tl.fromTo('#s0-title', { scale: 1.06 }, { scale: 1, duration: 0.4, ease: OUT }, 0);
tl.to('#s0-title', { scale: 1.03, duration: 0.1, yoyo: true, repeat: 1, ease: 'power2.out' }, T.voice(0) + 0.45);
chip('#s0-chip', at(0, 0.62));
shake('#s0-chip', at(0, 0.62) + 0.42, 6);

// 1. midnight, the CV runs to two pages
open('#s1', '#s1-card', 1);
late('#s1-clock', T.at(1) + 0.3); late('#s1-time', T.at(1) + 0.36);
tl.fromTo('#s1-hand', { rotation: 0 }, { rotation: 24, duration: 1.6, ease: 'power2.inOut' }, T.at(1) + 0.4);
['#s1-a', '#s1-b'].forEach((id, i) => {
  tl.fromTo(id, { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 0.45, ease: OUT }, T.at(1) + 0.3 + i * 0.08);
  tl.fromTo(`${id} .sk`, { scaleX: 0 }, { scaleX: 1, duration: 0.35, ease: 'power3.out', stagger: 0.04 }, T.at(1) + 0.45 + i * 0.08);
});
late('#s1-pa', T.at(1) + 0.7); late('#s1-pb', T.at(1) + 0.76);
chip('#s1-pages', at(1, 0.75));
tl.to('#s1-b', { borderColor: '#E39B12', duration: 0.2, ease: 'power2.out' }, at(1, 0.75));
shake('#s1-b', at(1, 0.75) + 0.12, 6);
late('#s1-note', at(1, 0.85));

// 2. one prompt types in, then fans out to three free apps
open('#s2', '#s2-card', 2);
tl.fromTo('#s2-typed', { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 0.5, ease: 'steps(12)' }, T.voice(2) + 0.2);
chip('#s2-c1', T.voice(2) + 0.62); chip('#s2-c2', T.voice(2) + 0.69);
['#s2-f1', '#s2-f2', '#s2-f3'].forEach((id, i) => tl.fromTo(id, { strokeDashoffset: 260 }, { strokeDashoffset: 0, duration: 0.45, ease: 'power2.out' }, at(2, 0.35) + i * 0.06));
['#s2-t1', '#s2-t2', '#s2-t3'].forEach((id, i) => {
  tl.fromTo(id, { y: 40, opacity: 0, scale: 0.9 }, { y: 0, opacity: 1, scale: 1, duration: 0.4, ease: POP }, at(2, 0.5) + i * 0.07);
  chip(`${id} .chip`, at(2, 0.66) + i * 0.07);
});
tl.fromTo('#s2-box', { scale: 1 }, { scale: 1.03, duration: 0.15, yoyo: true, repeat: 1, ease: 'sine.inOut' }, at(2, 0.88));

// 3. the darzi: the shirt is taken in (green), a ghost pocket appears and is struck out (red)
open('#s3', '#s3-card', 3);
tl.fromTo('#s3-shirt', { scale: 0.9, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.45, ease: OUT }, T.at(3) + 0.22);
tl.fromTo('#s3-al', { x: -30, opacity: 0 }, { x: 0, opacity: 1, duration: 0.3, ease: OUT }, at(3, 0.18));
tl.fromTo('#s3-ar', { x: 30, opacity: 0 }, { x: 0, opacity: 1, duration: 0.3, ease: OUT }, at(3, 0.18));
tl.fromTo('#s3-shirt', { scaleX: 1 }, { scaleX: 0.86, duration: 0.45, ease: 'power2.inOut' }, at(3, 0.32));
tl.to('#s3-al', { x: 24, duration: 0.45, ease: 'power2.inOut' }, at(3, 0.32));
tl.to('#s3-ar', { x: -24, duration: 0.45, ease: 'power2.inOut' }, at(3, 0.32));
tl.fromTo('#s3-r1', { x: 60, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4, ease: OUT }, at(3, 0.3));
chip('#s3-g1', at(3, 0.45));
tl.fromTo('#s3-pocket', { opacity: 0, scale: 0.6 }, { opacity: 1, scale: 1, duration: 0.35, ease: POP }, at(3, 0.6));
tl.fromTo('#s3-r2', { x: 60, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4, ease: OUT }, at(3, 0.6));
tl.fromTo('#s3-x1', { strokeDashoffset: 110 }, { strokeDashoffset: 0, duration: 0.18, ease: 'power3.in' }, at(3, 0.78));
tl.fromTo('#s3-x2', { strokeDashoffset: 110 }, { strokeDashoffset: 0, duration: 0.18, ease: 'power3.in' }, at(3, 0.78) + 0.1);
chip('#s3-g2', at(3, 0.82));
shake('#s3-pocket', at(3, 0.82) + 0.2, 6);

// 4. the test (host hidden, cover frame): columns land, green tallies pop, meters fill, red tallies pop on the buzz
open('#s4', '#s4-card', 4);
late('#s4-leg', T.at(4) + 0.32);
['#s4-c1', '#s4-c2', '#s4-c3'].forEach((col, i) => {
  tl.fromTo(`${col} .hd`, { y: -20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.35, ease: OUT }, T.at(4) + 0.3 + i * 0.06);
  tl.fromTo(`${col} .kept`, { scale: 0.6, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.35, ease: POP }, T.voice(4) + 0.4 + i * 0.07);
  tl.fromTo(`${col} .fill`, { scaleX: 0 }, { scaleX: 1, duration: 0.5, ease: 'power3.out' }, T.voice(4) + 0.7 + i * 0.07);
  late(`${col} .mlbl`, T.voice(4) + 0.7 + i * 0.07);
  late(`${col} .mval`, T.voice(4) + 0.78 + i * 0.07);
  tl.fromTo(`${col} .inv`, { scale: 0.6, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.35, ease: POP }, T.voice(4) + 1.05 + i * 0.07);
  shake(`${col} .inv`, T.voice(4) + 1.6 + i * 0.06, 6);
});
late('#s4-src', T.voice(4) + 0.9);

// 5. payoff: the winner's real one-page CV, ticks run down the margin, verdict chips land, success bump on the whistle
open('#s5', '#s5-card', 5);
tl.fromTo('#s5-name', { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 0.4, ease: 'power3.out' }, T.at(5) + 0.4);
late('#s5-red', T.at(5) + 0.55);
chip('#s5-who', at(5, 0.15));
['#s5-x1', '#s5-x2', '#s5-x3'].forEach((id, i) => {
  tl.fromTo(id, { x: 40, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4, ease: OUT }, T.at(5) + 0.45 + i * 0.07);
  tl.fromTo(`${id} .sb`, { scaleX: 0 }, { scaleX: 1, duration: 0.4, ease: 'power3.out', stagger: 0.06 }, T.at(5) + 0.55 + i * 0.07);
});
['#s5-k1', '#s5-k2', '#s5-k3'].forEach((id, i) => chip(id, T.voice(5) + 0.5 + i * T.beat / 2));
chip('#s5-v1', at(5, 0.55));
tl.to('#s5-card', { scale: 1.03, duration: 0.18, yoyo: true, repeat: 1, ease: 'sine.inOut' }, at(5, 0.55) + 0.4);
chip('#s5-v2', at(5, 0.8));
late('#s5-pick', at(5, 0.88));

// 6. the catch: rows scan in, the invented line turns up, gets circled in amber, the stamp slams, a scan line reads every row
open('#s6', '#s6-card', 6);
['#s6-r1', '#s6-r2', '#s6-r3', '#s6-r4'].forEach((id, i) => tl.fromTo(id, { x: 50, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4, ease: OUT }, T.at(6) + 0.35 + i * 0.07));
['#s6-g1', '#s6-g2', '#s6-g4'].forEach((id, i) => chip(id, T.voice(6) + 0.3 + i * 0.06));
chip('#s6-g3', T.voice(6) + 0.6);
shake('#s6-r3', T.voice(6) + 0.85, 8);
tl.fromTo('#s6-ring-e', { strokeDashoffset: 1500 }, { strokeDashoffset: 0, duration: 0.6, ease: 'power2.out' }, at(6, 0.45));
tl.fromTo('#s6-stamp', { scale: 2.2, opacity: 0, rotation: -12 }, { scale: 1, opacity: 1, rotation: -4, duration: 0.25, ease: 'power4.in' }, at(6, 0.62));
tl.fromTo('#s6-scan', { opacity: 0 }, { opacity: 1, duration: 0.2, ease: 'power2.out' }, at(6, 0.72));
tl.fromTo('#s6-scan', { y: 0 }, { y: 420, duration: 1.1, ease: 'sine.inOut' }, at(6, 0.72) + 0.1);

// 7. end card: Save. mask reveal, bookmark drops, the keyword letters fall in on the beat, sticker pops
tl.fromTo('#s7-save .l', { yPercent: 110 }, { yPercent: 0, duration: 0.6, ease: OUT }, T.at(7));
tl.fromTo('#s7-bm', { y: -120, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'back.out(2)' }, T.at(7) + 0.2);
tl.fromTo('#s7-who', { opacity: 0, filter: 'blur(12px)' }, { opacity: 1, filter: 'blur(0px)', duration: 0.5, ease: 'power3.out' }, T.voice(7) + 0.3);
tl.fromTo('#s7-pill', { scale: 0.6, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.45, ease: POP }, at(7, 0.5));
tl.fromTo('#s7-kw .kl', { yPercent: -120, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.35, ease: POP, stagger: T.beat / 4 }, at(7, 0.58));
tl.fromTo('#s7-stw', { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: POP }, T.end(7) + 0.1);
tl.to('#s7-bm', { y: -14, duration: 0.3, yoyo: true, repeat: 1, ease: 'sine.inOut' }, T.end(7) + 0.6);
tl.to('#s7-pill', { scale: 1.05, duration: 0.2, yoyo: true, repeat: 1, ease: 'sine.inOut' }, T.end(7) + 0.9);
