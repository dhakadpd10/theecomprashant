// Editorial theme, kind "sites": your language is a paid skill, the 3-language student, 3 real site cards, the catch, the screenshot card, then SITES.
const OUT = 'expo.out', POP = 'back.out(1.8)';
const span = (n) => T.end(n) - T.voice(n);
const at = (n, f) => T.voice(n) + f * span(n);
const title = (s, t) => tl.fromTo(`${s} .title .l`, { yPercent: 110 }, { yPercent: 0, duration: 0.55, ease: OUT, stagger: 0.08 }, t);
const step = (s, t) => tl.fromTo(`${s} .step`, { x: -40, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4, ease: OUT }, t);
const card = (id, t) => tl.fromTo(id, { y: 110, opacity: 0, scale: 0.96 }, { y: 0, opacity: 1, scale: 1, duration: 0.6, ease: OUT }, t);

// texture: slow drifting blobs for the whole reel
tl.fromTo('#blob1', { x: -60, y: 0 }, { x: 120, y: 160, duration: T.dur, ease: 'sine.inOut' }, 0);
tl.fromTo('#blob2', { x: 40, y: 0 }, { x: -140, y: -120, duration: T.dur, ease: 'sine.inOut' }, 0);

// progress bar: sites 1-3, the catch, the screenshot card
[2, 3, 4, 5, 6].forEach((n, i) => tl.fromTo(`#p${i + 1}`, { scaleX: 0 }, { scaleX: 1, duration: 0.5, ease: 'power2.out' }, T.at(n)));

// 0. hook: title and language tags on screen at frame 0
tl.fromTo('#s0-title', { scale: 1.05 }, { scale: 1, duration: 0.6, ease: OUT }, 0);
tl.fromTo('#s0-step', { opacity: 0.6 }, { opacity: 1, duration: 0.3, ease: 'power2.out' }, 0);
tl.fromTo('#s0-guj', { scale: 1 }, { scale: 1.1, duration: 0.18, yoyo: true, repeat: 1, ease: 'sine.inOut' }, at(0, 0.38));
tl.fromTo('#s0-guj', { borderColor: 'rgba(30,26,22,0.15)' }, { borderColor: '#2F6B4F', duration: 0.2, ease: 'power2.out' }, at(0, 0.38));
tl.fromTo('#s0-pun', { scale: 1 }, { scale: 1.1, duration: 0.18, yoyo: true, repeat: 1, ease: 'sine.inOut' }, at(0, 0.58));
tl.fromTo('#s0-pun', { borderColor: 'rgba(30,26,22,0.15)' }, { borderColor: '#2F6B4F', duration: 0.2, ease: 'power2.out' }, at(0, 0.58));
tl.fromTo('#s0-paid', { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: POP }, at(0, 0.84));

// 1. three languages, zero offers (example)
tl.fromTo('#s1-card', { y: -40, opacity: 0, scale: 0.96 }, { y: 0, opacity: 1, scale: 1, duration: 0.5, ease: OUT }, T.at(1));
tl.fromTo('#s1 .lang', { x: -40, opacity: 0 }, { x: 0, opacity: 1, duration: 0.35, ease: OUT, stagger: 0.07 }, T.voice(1) + 0.05);
tl.fromTo('#s1 .tick', { scale: 0 }, { scale: 1, duration: 0.35, ease: POP, stagger: 0.07 }, T.voice(1) + 0.2);
tl.fromTo('#s1-zero', { scale: 2.2, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.25, ease: 'power4.in' }, at(1, 0.42));
tl.fromTo('#s1-card', { x: 0 }, { x: 8, duration: 0.05, repeat: 5, yoyo: true, ease: 'none' }, at(1, 0.42) + 0.25);
tl.fromTo('#s1-ex', { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.3, ease: OUT }, at(1, 0.42) + 0.35);
tl.fromTo('#s1-zero', { y: 0 }, { y: -10, duration: 0.25, yoyo: true, repeat: 1, ease: 'sine.inOut' }, at(1, 0.85));

// 2-3. Alignerr and Outlier cards: rise, url types, number pops, rows land, pay row last
[2, 3].forEach((n) => {
  const s = `#s${n}`;
  step(s, T.at(n)); title(s, T.at(n) + 0.05); card(`${s}-card`, T.at(n) + 0.1);
  tl.fromTo(`${s} .url`, { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 0.5, ease: 'steps(12)' }, T.at(n) + 0.45);
  tl.fromTo(`${s} .num`, { scale: 0, rotation: -90 }, { scale: 1, rotation: 0, duration: 0.45, ease: POP }, T.voice(n) + 0.2);
  [['.r1', 0.25], ['.r2', 0.5], ['.r3', 0.75]].forEach(([r, f]) => tl.fromTo(`${s} ${r}`, { x: 60, opacity: 0 }, { x: 0, opacity: 1, duration: 0.35, ease: OUT }, at(n, f)));
});
tl.fromTo('#s3 .r3', { scale: 1 }, { scale: 1.04, duration: 0.2, yoyo: true, repeat: 1, ease: 'sine.inOut' }, at(3, 0.75) + 0.45);

// 4. OpenTrain: role chips pop as each language is said (the whistle moment)
step('#s4', T.at(4)); title('#s4', T.at(4) + 0.05); card('#s4-card', T.at(4) + 0.1);
tl.fromTo('#s4 .url', { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 0.5, ease: 'steps(14)' }, T.at(4) + 0.45);
tl.fromTo('#s4 .num', { scale: 0, rotation: -90 }, { scale: 1, rotation: 0, duration: 0.45, ease: POP }, T.voice(4) + 0.15);
tl.fromTo('#s4-roles', { opacity: 0 }, { opacity: 1, duration: 0.3, ease: 'power2.out' }, T.voice(4) + 0.4);
[['#s4-c1', 0.25], ['#s4-c2', 0.4], ['#s4-c3', 0.55], ['#s4-c4', 0.9]].forEach(([id, f]) => tl.fromTo(id, { scale: 0.6, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.35, ease: POP }, at(4, f)));
tl.fromTo('#s4-r1', { x: 60, opacity: 0 }, { x: 0, opacity: 1, duration: 0.35, ease: OUT }, at(4, 0.65));
tl.fromTo('#s4-r2', { x: 60, opacity: 0 }, { x: 0, opacity: 1, duration: 0.35, ease: OUT }, at(4, 0.75));
tl.fromTo('#s4-card', { scale: 1 }, { scale: 1.03, duration: 0.18, yoyo: true, repeat: 1, ease: 'sine.inOut' }, T.end(4) - 0.3);

// 5. the catch: stamp slams on the thud, then three honest limits
step('#s5', T.at(5)); title('#s5', T.at(5) + 0.05); card('#s5-card', T.at(5) + 0.1);
tl.fromTo('#s5-stamp', { scale: 2.2, opacity: 0, rotation: -20 }, { scale: 1, opacity: 1, rotation: -8, duration: 0.24, ease: 'power4.in' }, T.voice(5) + 0.16);
[['#s5-k1', 0.15], ['#s5-k2', 0.35], ['#s5-k3', 0.55]].forEach(([id, f]) => {
  tl.fromTo(id, { x: 60, opacity: 0 }, { x: 0, opacity: 1, duration: 0.35, ease: OUT }, at(5, f));
  tl.fromTo(`${id} .ic`, { scale: 0 }, { scale: 1, duration: 0.35, ease: POP }, at(5, f) + 0.08);
});
tl.fromTo('#s5-k3', { x: 0 }, { x: 8, duration: 0.05, repeat: 5, yoyo: true, ease: 'none' }, at(5, 0.85));

// 6. the screenshot card: shutter flash on the click, rows settle, send button pops
step('#s6', T.at(6)); title('#s6', T.at(6) + 0.05); card('#s6-card', T.at(6) + 0.05);
tl.to('#s6-flash', { opacity: 0.9, duration: 0.06, ease: 'power2.out' }, T.at(6) + 0.2);
tl.to('#s6-flash', { opacity: 0, duration: 0.35, ease: 'power2.out' }, T.at(6) + 0.26);
tl.fromTo('#s6 .srow', { x: 50, opacity: 0 }, { x: 0, opacity: 1, duration: 0.35, ease: OUT, stagger: 0.08 }, T.at(6) + 0.45);
tl.fromTo('#s6-send', { scale: 0.6, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.45, ease: POP }, at(6, 0.45));
tl.fromTo('#s6-send svg', { x: -24, y: 12 }, { x: 0, y: 0, duration: 0.5, ease: OUT }, at(6, 0.45) + 0.1);
tl.fromTo('#s6-send', { scale: 1 }, { scale: 0.95, duration: 0.12, yoyo: true, repeat: 1, ease: 'sine.inOut' }, at(6, 0.85));

// 7. Save. + the keyword, letters drop as SITES is said
title('#s7', T.at(7));
tl.fromTo('#s7-mark', { y: -80, opacity: 0 }, { y: 0, opacity: 1, duration: 0.45, ease: POP }, T.at(7) + 0.2);
tl.fromTo('#s7-box', { scale: 0.85, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.5, ease: OUT }, T.at(7) + 0.1);
tl.fromTo('#s7-cm', { opacity: 0 }, { opacity: 1, duration: 0.3, ease: 'power2.out' }, T.at(7) + 0.3);
tl.fromTo('#s7 .lt', { yPercent: -120, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.4, ease: POP, stagger: 0.06 }, T.voice(7) + 0.2);
tl.fromTo('#s7-free', { scale: 0.6, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: POP }, at(7, 0.8));
tl.fromTo('#s7-box', { scale: 1 }, { scale: 1.04, duration: 0.3, yoyo: true, repeat: 1, ease: 'sine.inOut' }, T.end(7) + 0.3);
