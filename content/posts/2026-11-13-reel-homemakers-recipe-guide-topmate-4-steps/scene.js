// Tutorial with a list card: 4 steps to turn tiffin recipes into a small guide. Step 2 is the favourite.
// Motion: enters expo.out 0.5 s, pops back.out, slams power4.in, stagger 0.06 s, labels settle late (follow-through).
// Every selector is written out in full (no built-up ids), so each one matches an element in scene.html.
const OUT = 'expo.out', POP = 'back.out(1.8)';
const span = (n) => T.end(n) - T.voice(n);
const at = (n, f) => T.voice(n) + f * span(n);
const title = (sel, t) => tl.fromTo(sel, { yPercent: 110 }, { yPercent: 0, duration: 0.55, ease: OUT, stagger: 0.08 }, t);
const step = (sel, t) => tl.fromTo(sel, { x: -40, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4, ease: OUT }, t);
const card = (id, t, y = 110) => tl.fromTo(id, { y: y, opacity: 0, scale: 0.96 }, { y: 0, opacity: 1, scale: 1, duration: 0.55, ease: OUT }, t);
const late = (id, t) => tl.fromTo(id, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.35, ease: OUT }, t);
const pop = (id, t) => {
  tl.fromTo(id, { scale: 0, opacity: 0 }, { scale: 1.12, opacity: 1, duration: 0.22, ease: 'power2.out' }, t);
  tl.to(id, { scale: 1, duration: 0.18, ease: 'power2.inOut' }, t + 0.22);
};
const wipe = (id, t, d, n) => tl.fromTo(id, { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: d, ease: 'steps(' + n + ')' }, t);
const shake = (id, t, px = 8) => tl.fromTo(id, { x: 0 }, { x: px, duration: 0.05, repeat: 5, yoyo: true, ease: 'none' }, t);

// texture: two warm orbs drift the whole reel
tl.fromTo('#orb1', { x: 0, y: 0 }, { x: 170, y: -120, duration: T.dur, ease: 'sine.inOut' }, 0);
tl.fromTo('#orb2', { x: 0, y: 0 }, { x: -180, y: -150, duration: T.dur, ease: 'sine.inOut' }, 0);

// progress bar: one segment per step
tl.set(['#p1', '#p2', '#p3', '#p4'], { scaleX: 0 }, 0);
tl.to('#p1', { scaleX: 1, duration: 0.5, ease: 'power2.out' }, T.at(1));
tl.to('#p2', { scaleX: 1, duration: 0.5, ease: 'power2.out' }, T.at(2));
tl.to('#p3', { scaleX: 1, duration: 0.5, ease: 'power2.out' }, T.at(3));
tl.to('#p4', { scaleX: 1, duration: 0.5, ease: 'power2.out' }, T.at(4));

// 0. hook: title, finished PDF and the 4-slot list are on screen at frame 0; the star lands on slot 2 as "step two" is said
tl.set('#s0-title', { transformOrigin: '0% 50%' }, 0);
tl.fromTo('#s0-title', { scale: 1.06 }, { scale: 1, duration: 0.7, ease: OUT }, 0);
tl.fromTo('#s0-step', { opacity: 0.6 }, { opacity: 1, duration: 0.3, ease: 'power2.out' }, 0);
tl.fromTo('#s0-phone', { y: 0, rotation: -4 }, { y: -18, rotation: -2, duration: T.end(0), ease: 'sine.inOut' }, 0);
tl.fromTo('#s0-list', { y: 40 }, { y: 0, duration: 0.6, ease: OUT }, 0);
tl.fromTo(['#s0-r1', '#s0-r2', '#s0-r3', '#s0-r4'], { opacity: 0.35, scale: 0.92 }, { opacity: 1, scale: 1, duration: 0.35, ease: POP, stagger: 0.07 }, T.voice(0) + 1.5);
pop('#s0-star', at(0, 0.78));
tl.to('#s0-r2', { backgroundColor: '#FFF4DC', borderColor: '#D99A1E', duration: 0.25, ease: 'power2.out' }, at(0, 0.78));
tl.fromTo('#s0-r2', { scale: 1 }, { scale: 1.06, duration: 0.15, yoyo: true, repeat: 1, ease: 'sine.inOut' }, at(0, 0.82));

// 1. pick what you already cook: three recipes, ticks on the beat
step('#s1 .step', T.at(1)); title('#s1 .title .l', T.at(1) + 0.05); card('#s1-card', T.at(1) + 0.12);
late('#s1-head', T.at(1) + 0.35);
tl.fromTo(['#s1-r1', '#s1-r2', '#s1-r3'], { x: 60, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4, ease: OUT, stagger: 0.07 }, T.at(1) + 0.3);
pop('#s1-t1', at(1, 0.3));
pop('#s1-t2', at(1, 0.56));
pop('#s1-t3', at(1, 0.76));
pop('#s1-chip', at(1, 0.84));
late('#s1-note', at(1, 0.9));

// 2. the favourite: voice, then the AI box, then the guide types in section by section
step('#s2 .step', T.at(2)); pop('#s2-fav', T.at(2) + 0.25); title('#s2 .title .l', T.at(2) + 0.05);
tl.fromTo('#s2-voice', { x: -60, opacity: 0 }, { x: 0, opacity: 1, duration: 0.5, ease: OUT }, T.at(2) + 0.15);
const r = T.rand(7);
const bars = ['#s2-w1', '#s2-w2', '#s2-w3', '#s2-w4', '#s2-w5', '#s2-w6', '#s2-w7', '#s2-w8', '#s2-w9', '#s2-w10', '#s2-w11', '#s2-w12', '#s2-w13', '#s2-w14'];
bars.forEach((id, i) => {
  const h = 0.35 + 0.65 * r();
  tl.fromTo(id, { scaleY: 0.2 }, { scaleY: h, duration: 0.16, repeat: 8, yoyo: true, ease: 'sine.inOut' }, T.voice(2) + i * 0.03);
});
tl.fromTo('#s2-ar1', { x: -20, opacity: 0 }, { x: 0, opacity: 1, duration: 0.3, ease: OUT }, T.voice(2) + 0.9);
pop('#s2-ai', T.voice(2) + 1.2);
tl.fromTo('#s2-spark', { rotation: 0 }, { rotation: 90, duration: 1.2, ease: 'power2.inOut' }, T.voice(2) + 1.3);
tl.fromTo('#s2-ar2', { y: -16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.3, ease: OUT }, T.voice(2) + 1.5);
card('#s2-guide', T.voice(2) + 1.6, 80);
late('#s2-ex', T.voice(2) + 1.85);
const rows = [
  ['#s2-g1', '#s2-g1-t', '#s2-g1-k'],
  ['#s2-g2', '#s2-g2-t', '#s2-g2-k'],
  ['#s2-g3', '#s2-g3-t', '#s2-g3-k'],
  ['#s2-g4', '#s2-g4-t', '#s2-g4-k'],
];
rows.forEach(([row, txt, tk], i) => {
  const t = T.voice(2) + 1.85 + i * 0.24;
  tl.fromTo(row, { opacity: 0 }, { opacity: 1, duration: 0.15, ease: 'power2.out' }, t);
  wipe(txt, t, 0.35, 12);
  pop(tk, t + 0.2);
});

// 3. Canva AI: plain text on the left, the divider drops, the laid-out page wipes in on the right
step('#s3 .step', T.at(3)); title('#s3 .title .l', T.at(3) + 0.05); card('#s3-card', T.at(3) + 0.12);
late('#s3-lb', T.at(3) + 0.35);
tl.fromTo(['#s3-t1', '#s3-t2', '#s3-t3', '#s3-t4', '#s3-t5', '#s3-t6'], { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.3, ease: OUT, stagger: 0.05 }, T.at(3) + 0.35);
tl.set('#s3-div', { transformOrigin: '50% 0%' }, 0);
tl.fromTo('#s3-div', { scaleY: 0 }, { scaleY: 1, duration: 0.35, ease: 'power3.out' }, at(3, 0.22));
tl.fromTo('#s3-after', { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 0.6, ease: 'power2.inOut' }, at(3, 0.3));
late('#s3-la', at(3, 0.32));
tl.fromTo(['#s3-c1', '#s3-c2', '#s3-c3'], { x: 30, opacity: 0 }, { x: 0, opacity: 1, duration: 0.35, ease: OUT, stagger: 0.07 }, at(3, 0.55));
tl.fromTo(['#s3-tl1', '#s3-tl2'], { scale: 0.6, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.35, ease: POP, stagger: 0.06 }, at(3, 0.62));
pop('#s3-chip', at(3, 0.85));

// 4. sales page, then the link drops into the family group
step('#s4 .step', T.at(4)); title('#s4 .title .l', T.at(4) + 0.05); card('#s4-list', T.at(4) + 0.12);
pop('#s4-price', at(4, 0.18));
late('#s4-ex', at(4, 0.26));
tl.fromTo('#s4-buy', { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.35, ease: OUT }, at(4, 0.3));
card('#s4-chat', at(4, 0.45), 60);
tl.set('#s4-bub', { transformOrigin: '100% 100%' }, 0);
tl.fromTo('#s4-bub', { scale: 0.6, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: POP }, at(4, 0.62));
tl.fromTo('#s4-ticks', { color: '#9A948C' }, { color: '#2C8BE0', duration: 0.2, ease: 'power2.out' }, at(4, 0.85));
tl.fromTo('#s4-buy', { scale: 1 }, { scale: 0.95, duration: 0.12, yoyo: true, repeat: 1, ease: 'power2.inOut' }, at(4, 0.92));

// 5. payoff: the finished guide fans out, the price tag swings in, EXAMPLE slams on the thud, the done list sits below
step('#s5 .step', T.at(5)); title('#s5 .title .l', T.at(5) + 0.05);
tl.set(['#s5-p2', '#s5-p3'], { transformOrigin: '50% 100%' }, 0);
tl.fromTo('#s5-p1', { y: 90, opacity: 0 }, { y: 0, opacity: 1, duration: 0.55, ease: OUT }, T.at(5) + 0.12);
tl.fromTo('#s5-p3', { x: 0, rotation: 0, opacity: 0 }, { x: -56, rotation: -9, opacity: 1, duration: 0.45, ease: 'power2.inOut' }, T.at(5) + 0.4);
tl.fromTo('#s5-p2', { x: 0, rotation: 0, opacity: 0 }, { x: 56, rotation: 9, opacity: 1, duration: 0.45, ease: 'power2.inOut' }, T.at(5) + 0.46);
card('#s5-done', T.at(5) + 0.3, 60);
tl.fromTo(['#s5-d1', '#s5-d2', '#s5-d3', '#s5-d4'], { x: 40, opacity: 0 }, { x: 0, opacity: 1, duration: 0.35, ease: OUT, stagger: 0.06 }, T.at(5) + 0.45);
tl.set('#s5-tag', { transformOrigin: '50% 0%' }, 0);
tl.fromTo('#s5-tag', { rotation: -16, opacity: 0, y: -30 }, { rotation: 0, opacity: 1, y: 0, duration: 0.6, ease: 'back.out(2)' }, T.voice(5) + 0.3);
tl.fromTo('#s5-stamp', { scale: 2.4, opacity: 0, rotation: -22 }, { scale: 1, opacity: 1, rotation: -8, duration: 0.22, ease: 'power4.in' }, T.voice(5) + 0.7);
late('#s5-fee', T.at(5) + 0.85);
tl.fromTo('#s5-star', { scale: 1, rotation: 0 }, { scale: 1.3, rotation: 20, duration: 0.18, yoyo: true, repeat: 1, ease: 'sine.inOut' }, at(5, 0.55));
tl.fromTo('#s5-pages', { scale: 1 }, { scale: 1.05, duration: 0.2, yoyo: true, repeat: 1, ease: 'sine.inOut' }, at(5, 0.75));

// 6. the catch: three rows land as each limit is said; the first one buzzes
step('#s6 .step', T.at(6)); title('#s6 .title .l', T.at(6) + 0.05); card('#s6-card', T.at(6) + 0.12);
tl.fromTo('#s6-k1', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.35, ease: OUT }, at(6, 0.12));
pop('#s6-i1', at(6, 0.12) + 0.1);
tl.fromTo('#s6-k2', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.35, ease: OUT }, at(6, 0.45));
pop('#s6-i2', at(6, 0.45) + 0.1);
tl.fromTo('#s6-k3', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.35, ease: OUT }, at(6, 0.72));
pop('#s6-i3', at(6, 0.72) + 0.1);
shake('#s6-k1', T.voice(6) + 0.6, 8);

// 7. save, send, and the keyword drops in letter by letter
tl.fromTo('#s7-save .l', { yPercent: 110 }, { yPercent: 0, duration: 0.6, ease: OUT }, T.at(7));
tl.fromTo('#s7-mark', { y: -60, opacity: 0, scale: 0.8 }, { y: 0, opacity: 1, scale: 1, duration: 0.5, ease: POP }, T.at(7) + 0.3);
late('#s7-who', T.voice(7) + 0.3);
tl.fromTo('#s7-pill', { scale: 0.6, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.45, ease: POP }, at(7, 0.6));
late('#s7-cm', at(7, 0.66));
tl.fromTo('#s7-kw .k', { yPercent: -120, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.35, ease: 'back.out(2)', stagger: 0.04 }, at(7, 0.7));
tl.fromTo('#s7-stick', { scale: 0, rotation: -20, opacity: 0 }, { scale: 1, rotation: -6, opacity: 1, duration: 0.4, ease: POP }, at(7, 0.88));
tl.fromTo('#s7-mark', { y: 0 }, { y: -14, duration: 0.6, yoyo: true, repeat: 1, ease: 'sine.inOut' }, T.end(7));
tl.fromTo('#s7-pill', { scale: 1 }, { scale: 1.05, duration: 0.25, yoyo: true, repeat: 1, ease: 'sine.inOut' }, T.end(7) + 0.3);
