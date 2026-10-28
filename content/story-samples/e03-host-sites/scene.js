// Editorial theme, kind "sites": one website card per beat, a progress bar that fills, the catch, the scam stamp, then the send line.
const OUT = 'expo.out', POP = 'back.out(1.7)';
const span = (n) => T.end(n) - T.voice(n);
const title = (s, t) => tl.fromTo(`${s} .title .l`, { yPercent: 110 }, { yPercent: 0, duration: 0.55, ease: OUT, stagger: 0.09 }, t);
const card = (id, t) => tl.fromTo(id, { y: 120, opacity: 0, scale: 0.96 }, { y: 0, opacity: 1, scale: 1, duration: 0.6, ease: OUT }, t);
const step = (s, t) => tl.fromTo(`${s} .step`, { x: -40, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4, ease: OUT }, t);

// progress bar: a segment fills as each beat starts
tl.set(['#p1', '#p2', '#p3', '#p4', '#p5', '#p6'], { scaleX: 0 }, 0);
[1, 2, 3, 4, 5, 6].forEach((n) => tl.to(`#p${n}`, { scaleX: 1, duration: 0.5, ease: 'power2.out' }, T.at(n)));

// 0. hook: the promise is on screen at frame 0
tl.fromTo('#s0-title .l', { yPercent: 0 }, { yPercent: 0, duration: 0.01 }, 0);
tl.fromTo('#s0-title', { scale: 1.06 }, { scale: 1, duration: 0.6, ease: OUT }, 0);
tl.fromTo('#s0-step', { opacity: 0.6 }, { opacity: 1, duration: 0.3 }, 0);

// 1-3. each website: the card rises, the url types in, the rows land one by one, the pay row last
[1, 2, 3].forEach((n) => {
  const s = `#s${n}`;
  step(s, T.at(n)); title(s, T.at(n) + 0.05); card(`${s}-card`, T.at(n) + 0.2);
  tl.fromTo(`${s} .url`, { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 0.5, ease: 'steps(12)' }, T.at(n) + 0.5);
  tl.fromTo(`${s} .num`, { scale: 0, rotation: -90 }, { scale: 1, rotation: 0, duration: 0.45, ease: POP }, T.voice(n) + 0.2);
  [['.r1', 0.3], ['.r2', 0.5], ['.r3', 0.7]].forEach(([r, f]) => tl.fromTo(`${s} ${r}`, { x: 60, opacity: 0 }, { x: 0, opacity: 1, duration: 0.35, ease: OUT }, T.voice(n) + f * span(n)));
});
tl.fromTo('#s3 .r3', { scale: 1 }, { scale: 1.04, duration: 0.2, yoyo: true, repeat: 1, ease: 'sine.inOut' }, T.voice(3) + 0.9 * span(3));

// 4. the catch: two rows, the chips slam in and shake
step('#s4', T.at(4)); title('#s4', T.at(4) + 0.05); card('#s4-card', T.at(4) + 0.2);
['#k1', '#k2'].forEach((id, i) => tl.fromTo(id, { x: 60, opacity: 0 }, { x: 0, opacity: 1, duration: 0.35, ease: OUT }, T.voice(4) + 0.2 + i * 0.35 * span(4)));
['#c1', '#c2'].forEach((id, i) => {
  const t = T.voice(4) + 0.4 + i * 0.35 * span(4);
  tl.fromTo(id, { scale: 1.8, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.25, ease: 'power4.in' }, t);
  tl.fromTo(id, { x: 0 }, { x: 8, duration: 0.05, repeat: 5, yoyo: true, ease: 'none' }, t + 0.25);
});

// 5. never pay to join: the fee ticket appears, the SCAM stamp lands on it
step('#s5', T.at(5)); title('#s5', T.at(5) + 0.05);
tl.fromTo('#ticket', { y: 80, opacity: 0, rotation: 3 }, { y: 0, opacity: 1, rotation: 0, duration: 0.5, ease: OUT }, T.at(5) + 0.2);
tl.fromTo('#stamp', { scale: 2.4, opacity: 0, rotation: -24 }, { scale: 1, opacity: 1, rotation: -12, duration: 0.22, ease: 'power4.in' }, T.voice(5) + 0.7);
tl.fromTo('#ticket', { x: 0 }, { x: 10, duration: 0.05, repeat: 5, yoyo: true, ease: 'none' }, T.voice(5) + 0.92);
tl.fromTo('#s5-sub', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: OUT }, T.voice(5) + 0.6 * span(5));

// 6. send this: the plane flies in, then the quiet keyword card
tl.fromTo('#send', { yPercent: 40, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.6, ease: OUT }, T.at(6));
tl.fromTo('#plane', { x: -260, y: 140, opacity: 0, rotation: -20 }, { x: 0, y: 0, opacity: 1, rotation: 0, duration: 0.7, ease: OUT }, T.at(6) + 0.25);
tl.fromTo('#who', { opacity: 0 }, { opacity: 1, duration: 0.4 }, T.voice(6) + 0.3);
tl.fromTo('#pill', { scale: 0.6, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.45, ease: POP }, T.voice(6) + 0.6 * span(6));
tl.to('#plane', { x: 30, y: -20, duration: 0.8, yoyo: true, repeat: 1, ease: 'sine.inOut' }, T.end(6));
