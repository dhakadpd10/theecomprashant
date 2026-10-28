// Editorial host reel, arm A: the scam chat is on screen at frame 0 and gets stamped STOP, the pattern ticks in,
// row 3 turns into "money mule", three real site cards fill the progress bar, one screenshot card, send, keyword.
const OUT = 'expo.out', POP = 'back.out(1.8)';
const span = (n) => T.end(n) - T.voice(n);
const frac = (n, f) => T.voice(n) + f * span(n);
const title = (s, t) => tl.fromTo(`${s} .title .l`, { yPercent: 110 }, { yPercent: 0, duration: 0.55, ease: OUT, stagger: 0.08 }, t);
const step = (s, t) => tl.fromTo(`${s} .step`, { x: -40, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4, ease: OUT }, t);
const card = (id, t) => tl.fromTo(id, { y: 100, opacity: 0, scale: 0.96 }, { y: 0, opacity: 1, scale: 1, duration: 0.6, ease: OUT }, t);

// texture: two warm blobs drift across the whole reel
tl.fromTo('#blobA', { x: 0, y: 0 }, { x: 220, y: 160, duration: T.dur / 2, ease: 'sine.inOut', yoyo: true, repeat: 1 }, 0);
tl.fromTo('#blobB', { x: 0, y: 0 }, { x: -200, y: -180, duration: T.dur / 2, ease: 'sine.inOut', yoyo: true, repeat: 1 }, 0);

// progress bar: only for the three sites
tl.set('#bar', { opacity: 0 }, 0);
tl.set(['#p1', '#p2', '#p3'], { scaleX: 0 }, 0);
tl.fromTo('#bar', { opacity: 0 }, { opacity: 1, duration: 0.4, ease: 'power2.out', immediateRender: false }, T.at(3));
[3, 4, 5].forEach((n, i) => tl.to(`#p${i + 1}`, { scaleX: 1, duration: 0.5, ease: 'power2.out' }, T.at(n) + 0.1));
tl.to('#bar', { opacity: 0, duration: 0.25, ease: 'power3.in' }, T.at(6));

// 0. hook: title and scam chat visible at frame 0, ring on the fee, STOP slams on "Stop"
tl.fromTo('#s0-title .l', { yPercent: 0 }, { yPercent: 0, duration: 0.01 }, 0);
tl.fromTo('#s0-title', { scale: 1.05 }, { scale: 1, duration: 0.6, ease: OUT }, 0);
tl.fromTo('#s0-card', { scale: 1.04 }, { scale: 1, duration: 0.7, ease: OUT }, 0);
tl.fromTo('#s0-bub', { boxShadow: '0 0 0 0px rgba(168,50,42,0)' }, { boxShadow: '0 0 0 5px rgba(168,50,42,1)', duration: 0.35, ease: 'power3.out' }, frac(0, 0.32));
tl.fromTo('#s0-bub', { scale: 1 }, { scale: 1.04, duration: 0.15, yoyo: true, repeat: 1, ease: 'sine.inOut' }, frac(0, 0.32));
const stampAt = T.end(0) - 0.25 - 0.22;
tl.fromTo('#s0-stamp', { scale: 2.4, opacity: 0, rotation: -24 }, { scale: 1, opacity: 1, rotation: -10, duration: 0.22, ease: 'power4.in' }, stampAt);
tl.fromTo('#s0-card', { x: 0 }, { x: 8, duration: 0.05, repeat: 5, yoyo: true, ease: 'none', immediateRender: false }, stampAt + 0.22);

// 1. the pattern: three steps tick in as they are said
step('#s1', T.at(1)); title('#s1', T.at(1) + 0.05); card('#s1-card', T.at(1) + 0.15);
[['#s1-r1', 0.05], ['#s1-r2', 0.38], ['#s1-r3', 0.72]].forEach(([id, f]) => {
  tl.fromTo(id, { x: 60, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4, ease: OUT }, frac(1, f));
  tl.fromTo(`${id} .tk`, { scale: 0 }, { scale: 1, duration: 0.4, ease: POP }, frac(1, f) + 0.08);
});
tl.fromTo('#s1-src', { opacity: 0 }, { opacity: 1, duration: 0.4, ease: 'power2.out' }, T.at(1) + 0.5);

// 2. money mule: row 3 turns red and shakes, the chip pops on the buzz
step('#s2', T.at(2)); title('#s2', T.at(2) + 0.03);
const mule = T.voice(2) + 0.35;
tl.to('#s1-r3', { backgroundColor: '#F6DAD4', duration: 0.2, ease: 'power2.out' }, mule);
tl.to('#s1-r3 .pt', { color: '#7A1F18', duration: 0.2, ease: 'power2.out' }, mule);
tl.to('#s1-r3 .tk', { backgroundColor: '#A8322A', duration: 0.2, ease: 'power2.out' }, mule);
tl.fromTo('#s1-r3', { x: 0 }, { x: 8, duration: 0.05, repeat: 6, yoyo: true, ease: 'none', immediateRender: false }, mule + 0.05);
tl.fromTo('#s2-chip', { scale: 0.6, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: POP }, T.voice(2) + 0.5);

// 3-5. three real sites: card rises, url types, rows land, pay row last with a bump
[3, 4, 5].forEach((n) => {
  const s = `#s${n}`;
  step(s, T.at(n)); title(s, T.at(n) + 0.05); card(`${s}-card`, T.at(n) + 0.2);
  tl.fromTo(`${s} .url`, { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 0.5, ease: 'steps(12)' }, T.at(n) + 0.5);
  tl.fromTo(`${s} .num`, { scale: 0, rotation: -90 }, { scale: 1, rotation: 0, duration: 0.45, ease: POP }, T.voice(n) + 0.2);
  [['.r1', 0.3], ['.r2', 0.5], ['.r3', 0.7]].forEach(([r, f]) => tl.fromTo(`${s} ${r}`, { x: 60, opacity: 0 }, { x: 0, opacity: 1, duration: 0.35, ease: OUT }, frac(n, f)));
  tl.fromTo(`${s} .r3`, { scale: 1 }, { scale: 1.04, duration: 0.18, yoyo: true, repeat: 1, ease: 'sine.inOut', immediateRender: false }, frac(n, 0.7) + 0.4);
});
tl.fromTo('#s5-chip', { scale: 0.95, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: POP }, frac(5, 0.6));

// 6. the screenshot card: flags and sites land, the catch pops on the click
step('#s6', T.at(6)); title('#s6', T.at(6) + 0.03); card('#s6-card', T.at(6) + 0.1);
tl.fromTo('#s6 .fl', { x: 40, opacity: 0 }, { x: 0, opacity: 1, duration: 0.35, ease: OUT, stagger: 0.06 }, T.at(6) + 0.35);
tl.fromTo('#s6 .sr', { x: 40, opacity: 0 }, { x: 0, opacity: 1, duration: 0.35, ease: OUT, stagger: 0.07 }, T.at(6) + 0.6);
tl.fromTo('#s6-catch', { scale: 0.94, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: POP }, T.voice(6) + 0.45);
tl.fromTo('#s6-catch', { x: 0 }, { x: 6, duration: 0.05, repeat: 5, yoyo: true, ease: 'none', immediateRender: false }, frac(6, 0.75));

// 7. 1930: the fraud strip pops in, the phone rings, a ring highlights it
tl.fromTo('#s6-fraud', { y: 30, opacity: 0, scale: 0.95 }, { y: 0, opacity: 1, scale: 1, duration: 0.45, ease: POP }, T.at(7));
tl.fromTo('#s6-phone', { rotation: 0 }, { rotation: 14, duration: 0.06, repeat: 7, yoyo: true, ease: 'none' }, T.voice(7) + 0.3);
tl.fromTo('#s6-fraud', { boxShadow: '0 0 0 0px rgba(168,50,42,0)' }, { boxShadow: '0 0 0 6px rgba(168,50,42,1)', duration: 0.35, ease: 'power3.out' }, frac(7, 0.35));
tl.fromTo('#s6-fraud', { scale: 1 }, { scale: 1.04, duration: 0.18, yoyo: true, repeat: 1, ease: 'sine.inOut', immediateRender: false }, frac(7, 0.35));

// 8. send: the share arrow flies in, the scam chat gets crossed out
step('#s8', T.at(8)); title('#s8', T.at(8) + 0.03); card('#s8-chat', T.at(8) + 0.1);
tl.fromTo('#s8-arrow', { x: -140, y: 90, opacity: 0, rotation: -18 }, { x: 0, y: 0, opacity: 1, rotation: 0, duration: 0.65, ease: OUT }, T.at(8) + 0.3);
tl.fromTo('#s8-strike', { scaleX: 0 }, { scaleX: 1, duration: 0.35, ease: 'power3.out' }, frac(8, 0.45));
tl.fromTo('#s8-chat', { x: 0 }, { x: 8, duration: 0.05, repeat: 5, yoyo: true, ease: 'none', immediateRender: false }, frac(8, 0.45) + 0.35);
tl.fromTo('#s8-who', { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: OUT }, frac(8, 0.6));
tl.to('#s8-arrow', { x: 24, y: -16, duration: 0.7, yoyo: true, repeat: 1, ease: 'sine.inOut' }, frac(8, 0.7));

// 9. keyword: Save., bookmark drops, the pill pops on the pop sfx, letters drop on the beat, FREE sticker slams
title('#s9', T.at(9) + 0.02);
tl.fromTo('#s9-mark', { y: -80, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: POP }, T.at(9) + 0.15);
tl.fromTo('#s9-pill', { scale: 0.6, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: POP }, T.voice(9) + 0.1);
tl.fromTo('#s9-kw i', { yPercent: -120, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.4, ease: 'back.out(2)', stagger: 0.06 }, T.voice(9) + 0.3);
tl.fromTo('#s9-free', { scale: 2, opacity: 0, rotation: -30 }, { scale: 1, opacity: 1, rotation: 8, duration: 0.25, ease: 'power4.in' }, T.voice(9) + 0.3 + 2 * T.beat);
tl.fromTo('#s9-sub', { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: OUT }, T.voice(9) + 0.7);
tl.fromTo('#s9-pill', { scale: 1 }, { scale: 1.05, duration: 0.2, yoyo: true, repeat: 1, ease: 'sine.inOut', immediateRender: false }, T.end(9) + 0.2);
