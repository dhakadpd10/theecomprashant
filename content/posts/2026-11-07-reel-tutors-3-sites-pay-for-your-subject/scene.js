// Editorial, kind "sites" for tutors: hook title at frame 0, three website cards (Topmate stamped BEST FIT on the whistle),
// a full-width screenshot table with the CATCH stamp, the catch rows, then Send / Save / a huge SITES.
const OUT = 'expo.out', POP = 'back.out(1.8)';
const span = (n) => T.end(n) - T.voice(n);
const at = (n, f) => T.voice(n) + f * span(n);
const title = (s, t) => tl.fromTo(`${s} .title .l`, { yPercent: 110 }, { yPercent: 0, duration: 0.55, ease: OUT, stagger: 0.08 }, t);
const step = (s, t) => tl.fromTo(`${s} .step`, { x: -40, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4, ease: OUT }, t);
const card = (id, t) => tl.fromTo(id, { y: 110, opacity: 0, scale: 0.96 }, { y: 0, opacity: 1, scale: 1, duration: 0.6, ease: OUT }, t);

// texture: slow drifting blobs across the whole reel
tl.fromTo('#blob1', { x: 0, y: 0 }, { x: 220, y: 160, duration: T.dur, ease: 'sine.inOut' }, 0);
tl.fromTo('#blob2', { x: 0, y: 0 }, { x: -260, y: -200, duration: T.dur, ease: 'sine.inOut' }, 0);

// progress bar: one segment per beat
tl.set(['#p1', '#p2', '#p3', '#p4', '#p5', '#p6'], { scaleX: 0 }, 0);
[1, 2, 3, 4, 5, 6].forEach((n) => tl.to(`#p${n}`, { scaleX: 1, duration: 0.5, ease: 'power2.out' }, T.at(n)));

// 0. hook: on screen at frame 0, a punch-in, the rule draws on "three websites", a bump on "pay"
tl.fromTo('#s0-title .l', { yPercent: 0 }, { yPercent: 0, duration: 0.01 }, 0);
tl.fromTo('#s0-title', { scale: 1.06 }, { scale: 1, duration: 0.6, ease: OUT }, 0);
tl.fromTo('#s0-step', { opacity: 0.7 }, { opacity: 1, duration: 0.3 }, 0);
tl.fromTo('#s0-rule', { scaleX: 0 }, { scaleX: 1, duration: 0.5, ease: 'power3.out' }, T.voice(0) + 0.9);
tl.to('#s0-title', { scale: 1.04, duration: 0.18, yoyo: true, repeat: 1, ease: 'sine.inOut' }, at(0, 0.55));

// 1-3. website cards: card rises, url types, number pops, name wipes, rows land with the words, pay row last
[1, 2, 3].forEach((n) => {
  const s = `#s${n}`;
  step(s, T.at(n)); title(s, T.at(n) + 0.05); card(`${s}-card`, T.at(n) + 0.15);
  tl.fromTo(`${s} .url`, { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 0.5, ease: 'steps(12)' }, T.at(n) + 0.45);
  tl.fromTo(`${s} .num`, { scale: 0, rotation: -90 }, { scale: 1, rotation: 0, duration: 0.45, ease: POP }, T.voice(n) + 0.25);
  const nameT = n === 3 ? at(3, 0.5) : T.voice(n) + 0.35;
  tl.fromTo(`${s} .name`, { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 0.45, ease: 'power3.out' }, nameT);
  tl.fromTo(`${s} .tag`, { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.35, ease: OUT }, nameT + 0.08);
  [['.r1', 0.38], ['.r2', 0.58], ['.r3', 0.76]].forEach(([r, f]) => tl.fromTo(`${s} ${r}`, { x: 60, opacity: 0 }, { x: 0, opacity: 1, duration: 0.35, ease: OUT }, at(n, f)));
});
// Topmate: BEST FIT stamp slams as the name is said, card jolts, pay row bumps
tl.fromTo('#s3-stamp', { scale: 2.2, opacity: 0, rotation: -22 }, { scale: 1, opacity: 1, rotation: -8, duration: 0.25, ease: 'power4.in' }, at(3, 0.5) + 0.15);
tl.fromTo('#s3-card', { x: 0 }, { x: 6, duration: 0.05, repeat: 5, yoyo: true, ease: 'none' }, at(3, 0.5) + 0.4);
tl.to('#s3 .r3', { scale: 1.04, duration: 0.2, yoyo: true, repeat: 1, ease: 'sine.inOut' }, at(3, 0.92));

// 4. screenshot table full width: rows stagger in, CATCH stamp lands with the thud, Alignerr row ringed and shaken
step('#s4', T.at(4)); title('#s4', T.at(4) + 0.05);
tl.fromTo('#s4-card', { y: 110, opacity: 0, scale: 0.97 }, { y: 0, opacity: 1, scale: 1, duration: 0.5, ease: OUT }, T.at(4) + 0.08);
tl.fromTo('#s4 .thead', { opacity: 0 }, { opacity: 1, duration: 0.3 }, T.at(4) + 0.2);
tl.fromTo('#s4 .trow', { x: 60, opacity: 0 }, { x: 0, opacity: 1, duration: 0.35, ease: OUT, stagger: 0.07 }, T.at(4) + 0.22);
tl.fromTo('#s4-stamp', { scale: 2.4, opacity: 0, rotation: -20 }, { scale: 1, opacity: 1, rotation: -7, duration: 0.24, ease: 'power4.in' }, T.voice(4) + 0.16);
tl.fromTo('#s4-ring', { opacity: 0, scale: 1.05 }, { opacity: 1, scale: 1, duration: 0.3, ease: OUT }, at(4, 0.45));
tl.fromTo('#s4-r1', { x: 0 }, { x: 8, duration: 0.05, repeat: 6, yoyo: true, ease: 'none' }, at(4, 0.5));

// 5. the catch: Alignerr row already there, Gumroad and Topmate land as they are said
step('#s5', T.at(5)); title('#s5', T.at(5) + 0.05); card('#s5-card', T.at(5) + 0.1);
tl.fromTo('#s5-c1', { x: 60, opacity: 0 }, { x: 0, opacity: 1, duration: 0.35, ease: OUT }, T.at(5) + 0.3);
tl.fromTo('#s5-c2', { x: 60, opacity: 0 }, { x: 0, opacity: 1, duration: 0.35, ease: OUT }, at(5, 0.08));
tl.fromTo('#s5-c3', { x: 60, opacity: 0 }, { x: 0, opacity: 1, duration: 0.35, ease: OUT }, at(5, 0.5));
tl.fromTo('#s5 .bar', { scaleY: 0 }, { scaleY: 1, duration: 0.4, ease: OUT, stagger: 0.5 }, T.at(5) + 0.4);
tl.to('#s5-c3', { scale: 1.04, duration: 0.2, yoyo: true, repeat: 1, ease: 'sine.inOut' }, at(5, 0.82));

// 6. send this: plane flies in, Save card and bookmark, then SITES drops in letter by letter on the word
tl.fromTo('#send .l', { yPercent: 110 }, { yPercent: 0, duration: 0.55, ease: OUT }, T.at(6));
tl.fromTo('#plane', { x: -200, y: 120, opacity: 0, rotation: -20 }, { x: 0, y: 0, opacity: 1, rotation: 0, duration: 0.7, ease: OUT }, T.at(6) + 0.25);
tl.fromTo('#who', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: OUT }, T.voice(6) + 0.3);
card('#s6-save', T.voice(6) + 0.35);
tl.fromTo('#mark', { y: -50, scale: 0.95, opacity: 0 }, { y: 0, scale: 1, opacity: 1, duration: 0.4, ease: POP }, T.voice(6) + 0.6);
tl.fromTo('#s6-cta', { scale: 0.7, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.45, ease: POP }, at(6, 0.5));
tl.fromTo('#s6-key b', { yPercent: -70, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.4, ease: POP, stagger: 0.06 }, at(6, 0.7));
tl.to('#s6-cta', { scale: 1.04, duration: 0.2, yoyo: true, repeat: 1, ease: 'sine.inOut' }, T.end(6) + 0.1);
tl.to('#plane', { x: 24, y: -18, duration: 0.6, yoyo: true, repeat: 1, ease: 'sine.inOut' }, T.end(6));
