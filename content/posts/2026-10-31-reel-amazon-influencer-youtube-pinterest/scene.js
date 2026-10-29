// Editorial theme, deep green: the ₹0 gets struck out, the program card lands, 4 slots fill on each step, the catch chips slam, send, then the keyword drops in.
const OUT = 'expo.out', POP = 'back.out(1.8)';
const span = (n) => T.end(n) - T.voice(n);
const hit = (n, f) => T.voice(n) + f * span(n);
const title = (s, t) => tl.fromTo(`${s} .title .l`, { yPercent: 110 }, { yPercent: 0, duration: 0.55, ease: OUT, stagger: 0.08 }, t);
const step = (s, t) => tl.fromTo(`${s} .step`, { x: -40, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4, ease: OUT }, t);
const card = (id, t) => tl.fromTo(id, { y: 110, opacity: 0, scale: 0.96 }, { y: 0, opacity: 1, scale: 1, duration: 0.55, ease: OUT }, t);
const shake = (id, t) => tl.fromTo(id, { x: 0 }, { x: 8, duration: 0.05, repeat: 5, yoyo: true, ease: 'none' }, t);

// texture: two slow blobs drift for the whole reel
tl.fromTo('#b1', { x: 0, y: 0 }, { x: 140, y: -90, duration: T.dur, ease: 'sine.inOut' }, 0);
tl.fromTo('#b2', { x: 0, y: 0 }, { x: -120, y: 70, duration: T.dur, ease: 'sine.inOut' }, 0);

// progress bar: one segment per beat after the hook
const segs = [1, 2, 3, 4, 5, 6, 7, 8];
tl.set(segs.map((n) => `#p${n}`), { scaleX: 0 }, 0);
segs.forEach((n) => tl.to(`#p${n}`, { scaleX: 1, duration: 0.45, ease: 'power2.out' }, T.at(n)));

// 0. hook: title on screen at frame 0, ₹0 struck out on "free", then the commission pill
tl.fromTo('#s0-title', { scale: 1.05 }, { scale: 1, duration: 0.6, ease: OUT }, 0);
tl.fromTo('#s0-step', { opacity: 0.5 }, { opacity: 1, duration: 0.3, ease: 'power2.out' }, 0);
tl.fromTo('#s0-strike', { scaleX: 0 }, { scaleX: 1, duration: 0.3, ease: 'power3.out' }, hit(0, 0.38));
shake('#s0-zero', hit(0, 0.38) + 0.3);
tl.fromTo('#s0-pill', { scale: 0.6, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.45, ease: POP }, hit(0, 0.55));

// 1. the program: card rises, url types, rows land fast (cover at @line1+1.2), ₹ coin pops on "commission"
step('#s1', T.at(1)); title('#s1', T.at(1) + 0.05); card('#s1-card', T.at(1) + 0.15);
tl.fromTo('#s1 .url', { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 0.4, ease: 'steps(9)' }, T.at(1) + 0.35);
tl.fromTo('#s1-name', { opacity: 0, filter: 'blur(12px)' }, { opacity: 1, filter: 'blur(0px)', duration: 0.4, ease: OUT }, T.at(1) + 0.35);
['.r1', '.r2', '.r3'].forEach((r, i) => tl.fromTo(`#s1 ${r}`, { x: 60, opacity: 0 }, { x: 0, opacity: 1, duration: 0.35, ease: OUT }, T.at(1) + 0.4 + i * 0.15));
tl.fromTo('#s1-coin', { scale: 0, rotation: -90 }, { scale: 1, rotation: 0, duration: 0.45, ease: POP }, hit(1, 0.42));
tl.fromTo('#s1 .r3', { scale: 1 }, { scale: 1.04, duration: 0.2, yoyo: true, repeat: 1, ease: 'sine.inOut' }, hit(1, 0.42) + 0.3);
tl.fromTo('#s1-play', { scale: 1 }, { scale: 1.15, duration: 0.2, yoyo: true, repeat: 1, ease: 'sine.inOut' }, hit(1, 0.85));

// 2. the steps: empty dashed slots, each fills as its step is said, a tick pops when it lands
step('#s2', T.at(2)); title('#s2', T.at(2) + 0.05); card('#s2-card', T.at(2) + 0.15);
tl.set(['#f1', '#f2', '#f3', '#f4'], { clipPath: 'inset(0 100% 0 0)' }, 0);
tl.set(['#t1', '#t2', '#t3', '#t4'], { scale: 0 }, 0);
const fills = [
  [1, 2, T.voice(2) + 0.35, hit(2, 0.8)],
  [2, 3, T.voice(3) + 0.25, hit(3, 0.8)],
  [3, 4, T.voice(4) + 0.25, hit(4, 0.75)],
  [4, 5, T.at(5), T.voice(5) + 0.3]
];
fills.forEach(([k, n, tf, tt]) => {
  tl.fromTo(`#f${k}`, { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 0.35, ease: 'power3.out' }, tf);
  tl.fromTo(`#q${k}`, { scale: 1 }, { scale: 1.03, duration: 0.15, yoyo: true, repeat: 1, ease: 'sine.inOut' }, tf + 0.3);
  tl.fromTo(`#t${k}`, { scale: 0, rotation: -60 }, { scale: 1, rotation: 0, duration: 0.4, ease: POP }, tt);
});

// 3. the catch: NONE lands on "commission only", ₹0 slams on the thud, the card shakes
step('#s3', T.at(6)); title('#s3', T.at(6) + 0.05); card('#s3-card', T.at(6) + 0.15);
tl.fromTo('#c1', { x: 60, opacity: 0 }, { x: 0, opacity: 1, duration: 0.35, ease: OUT }, T.voice(6) + 0.4);
tl.fromTo('#c1-chip', { scale: 1.8, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.25, ease: 'power4.in' }, T.voice(6) + 0.75);
tl.fromTo('#c2', { x: 60, opacity: 0 }, { x: 0, opacity: 1, duration: 0.35, ease: OUT }, T.voice(6) + 0.9);
tl.fromTo('#c2-chip', { scale: 2, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.25, ease: 'power4.in' }, T.voice(6) + 1.15);
shake('#s3-card', T.voice(6) + 1.4);
tl.fromTo('#s3-sub', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: OUT }, hit(6, 0.7));

// 4. send this: the plane flies in, the friend line blurs in
title('#s4', T.at(7));
tl.fromTo('#plane', { x: -220, y: 120, opacity: 0, rotation: -20 }, { x: 0, y: 0, opacity: 1, rotation: 0, duration: 0.65, ease: OUT }, T.at(7) + 0.25);
tl.fromTo('#who', { opacity: 0, filter: 'blur(12px)' }, { opacity: 1, filter: 'blur(0px)', duration: 0.45, ease: OUT }, T.voice(7) + 0.4);
tl.fromTo('#plane', { scale: 1 }, { scale: 1.08, duration: 0.6, yoyo: true, repeat: 1, ease: 'sine.inOut' }, hit(7, 0.6));

// 5. save + keyword: bookmark drops, the dark card lands, PRODUCT drops letter by letter on the word
title('#s5', T.at(8));
tl.fromTo('#s5-mark', { y: -60, opacity: 0 }, { y: 0, opacity: 1, duration: 0.45, ease: POP }, T.at(8) + 0.15);
tl.fromTo('#s5-cta', { scale: 0.9, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.45, ease: OUT }, T.at(8) + 0.1);
tl.fromTo('#s5-word .ch', { yPercent: -120, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.35, ease: POP, stagger: 0.06 }, T.voice(8) + 0.45);
tl.fromTo('#s5-sub', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: OUT }, T.voice(8) + 0.9);
tl.fromTo('#s5-word', { scale: 1 }, { scale: 1.06, duration: 0.2, yoyo: true, repeat: 1, ease: 'sine.inOut' }, T.end(8) + 0.1);
