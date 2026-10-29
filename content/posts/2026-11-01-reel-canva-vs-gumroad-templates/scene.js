// Editorial theme, kind "breakdown", hook #17 Head To Head: Canva vs Gumroad, one platform card each, the tools, my take, the catch, send, keyword.
const OUT = 'expo.out', POP = 'back.out(1.8)', SLAM = 'power4.in';
const span = (n) => T.end(n) - T.voice(n);
const at = (n, f) => T.voice(n) + f * span(n);
const title = (s, t) => tl.fromTo(`${s} .title .l`, { yPercent: 110 }, { yPercent: 0, duration: 0.55, ease: OUT, stagger: 0.08 }, t);
const step = (s, t) => tl.fromTo(`${s} .step`, { x: -40, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4, ease: OUT }, t);
const head = (s, n) => { step(s, T.at(n)); title(s, T.at(n) + 0.05); };
const card = (id, t) => tl.fromTo(id, { y: 110, opacity: 0, scale: 0.96 }, { y: 0, opacity: 1, scale: 1, duration: 0.55, ease: OUT }, t);
const rowIn = (id, t) => tl.fromTo(id, { x: 60, opacity: 0 }, { x: 0, opacity: 1, duration: 0.35, ease: OUT }, t);
const chipPop = (id, t) => tl.fromTo(id, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: POP }, t);
const chipSlam = (id, t) => {
  tl.fromTo(id, { scale: 1.8, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.22, ease: SLAM }, t);
  tl.fromTo(id, { x: 0 }, { x: 8, duration: 0.05, repeat: 5, yoyo: true, ease: 'none' }, t + 0.22);
};

// texture: slow drifting blobs for the whole reel
tl.fromTo('#blob1', { x: 0, y: 0 }, { x: 260, y: -160, duration: T.dur, ease: 'sine.inOut' }, 0);
tl.fromTo('#blob2', { x: 0, y: 0 }, { x: -240, y: 140, duration: T.dur, ease: 'sine.inOut' }, 0);

// progress bar: one segment per beat
tl.set(['#p1', '#p2', '#p3', '#p4', '#p5', '#p6', '#p7', '#p8'], { scaleX: 0 }, 0);
[1, 2, 3, 4, 5, 6, 7, 8].forEach((n) => tl.to(`#p${n}`, { scaleX: 1, duration: 0.5, ease: 'power2.out' }, T.at(n)));

// 0. hook: the matchup is on screen at frame 0, the question wipes in
tl.fromTo('#s0-title', { scale: 1.06 }, { scale: 1, duration: 0.6, ease: OUT }, 0);
tl.fromTo('#s0-q', { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 0.5, ease: 'power3.out' }, 0.15);
tl.fromTo('#s0-rule', { scaleX: 0 }, { scaleX: 1, duration: 0.45, ease: 'power3.out' }, 0.4);
tl.fromTo('#s0-q', { scale: 1 }, { scale: 1.05, duration: 0.18, yoyo: true, repeat: 1, ease: 'sine.inOut' }, at(0, 0.55));

// 1. AI templates: three template tiles land, the rupee coin pops on "rupees"
head('#s1', 1); card('#s1-card', T.at(1) + 0.15);
tl.fromTo('#s1 .tile', { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: OUT, stagger: 0.07 }, T.at(1) + 0.35);
tl.fromTo('#s1 .tl', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.35, ease: OUT, stagger: 0.07 }, T.at(1) + 0.41);
rowIn('#s1 .row', at(1, 0.4));
tl.fromTo('#s1-coin', { scale: 0, rotation: -90, opacity: 0 }, { scale: 1, rotation: 0, opacity: 1, duration: 0.45, ease: POP }, at(1, 0.75));

// 2-3. each platform: card rises, url types, rows land on the words, a stamp slams on the verdict
const site = (n, stampF, rows) => {
  const s = `#s${n}`;
  head(s, n); card(`${s}-card`, T.at(n) + 0.2);
  tl.fromTo(`${s} .url`, { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 0.45, ease: 'steps(12)' }, T.at(n) + 0.45);
  tl.fromTo(`${s} .num`, { scale: 0, rotation: -90 }, { scale: 1, rotation: 0, duration: 0.45, ease: POP }, T.at(n) + 0.5);
  rows.forEach(([r, f]) => rowIn(`${s} ${r}`, at(n, f)));
  tl.fromTo(`${s}-stamp`, { scale: 2.4, opacity: 0, rotation: -22 }, { scale: 1, opacity: 1, rotation: -9, duration: 0.22, ease: SLAM }, at(n, stampF));
  tl.fromTo(`${s}-card`, { rotation: 0 }, { rotation: 0.8, duration: 0.07, yoyo: true, repeat: 3, ease: 'sine.inOut' }, at(n, stampF) + 0.22);
};
site(2, 0.3, [['.r1', 0.12], ['.r2', 0.42], ['.r3', 0.62]]);
site(3, 0.28, [['.r1', 0.12], ['.r2', 0.55], ['.r3', 0.78]]);
tl.fromTo('#s3 .r3', { scale: 1 }, { scale: 1.05, duration: 0.18, yoyo: true, repeat: 1, ease: 'sine.inOut' }, at(3, 0.9));

// 4. the tools: design and words, one chip each
head('#s4', 4); card('#s4-card', T.at(4) + 0.15);
rowIn('#s4-k1', T.voice(4) + 0.05); chipPop('#s4-c1', T.voice(4) + 0.3);
rowIn('#s4-k2', at(4, 0.5)); chipPop('#s4-c2', at(4, 0.5) + 0.25);

// 5. my take (the whistle line): Gumroad this week gets the success bump, Canva later
head('#s5', 5); card('#s5-card', T.at(5) + 0.15);
rowIn('#s5-k1', at(5, 0.12)); chipPop('#s5-c1', at(5, 0.25));
tl.fromTo('#s5-k1', { scale: 1 }, { scale: 1.05, duration: 0.2, yoyo: true, repeat: 1, ease: 'sine.inOut' }, at(5, 0.4));
rowIn('#s5-k2', at(5, 0.55)); chipPop('#s5-c2', at(5, 0.66));
tl.fromTo('#s5-note', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: OUT }, at(5, 0.78));

// 6. the catch: warning chips slam and shake (thud at voice + 0.6)
head('#s6', 6); card('#s6-card', T.at(6) + 0.15);
rowIn('#s6-k1', T.voice(6) + 0.15); chipSlam('#s6-c1', T.voice(6) + 0.4);
rowIn('#s6-k2', at(6, 0.5)); chipSlam('#s6-c2', at(6, 0.62));
tl.fromTo('#s6-card', { x: 0 }, { x: 8, duration: 0.05, repeat: 5, yoyo: true, ease: 'none' }, at(6, 0.62) + 0.22);

// 7. send: the plane flies in, the group lands, the Canva star gets the badge
tl.fromTo('#s7-send', { yPercent: 40, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.55, ease: OUT }, T.at(7));
tl.fromTo('#s7-plane', { x: -200, y: 120, opacity: 0, rotation: -20 }, { x: 0, y: 0, opacity: 1, rotation: 0, duration: 0.6, ease: OUT }, T.at(7) + 0.25);
card('#s7-card', T.at(7) + 0.3);
tl.fromTo('#s7 .av', { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: POP, stagger: 0.07 }, T.voice(7) + 0.4);
tl.fromTo('#s7-star', { scale: 0, rotation: -120 }, { scale: 1, rotation: 0, duration: 0.45, ease: POP }, at(7, 0.6));
chipPop('#s7-chip', at(7, 0.68));
tl.to('#s7-plane', { y: -18, duration: 0.4, yoyo: true, repeat: 1, ease: 'sine.inOut' }, at(7, 0.75));

// 8. save + keyword: the pill pops, PRODUCT drops in letter by letter, the free sticker lands
tl.fromTo('#s8-save', { filter: 'blur(12px)', opacity: 0 }, { filter: 'blur(0px)', opacity: 1, duration: 0.5, ease: 'power3.out' }, T.at(8));
tl.fromTo('#s8-mark', { y: -80, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: POP }, T.at(8) + 0.15);
tl.fromTo('#s8-pill', { scale: 0.6, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.45, ease: POP }, T.at(8) + 0.1);
tl.fromTo('#s8-label', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.35, ease: OUT }, T.at(8) + 0.3);
tl.fromTo('#s8 .ch', { yPercent: -120, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.4, ease: POP, stagger: 0.04 }, T.voice(8) + 0.3);
tl.fromTo('#s8-sticker', { scale: 0, rotation: -20 }, { scale: 1, rotation: -4, duration: 0.45, ease: POP }, at(8, 0.7));
tl.fromTo('#s8-sub', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: OUT }, at(8, 0.85));
tl.fromTo('#s8-word', { scale: 1 }, { scale: 1.06, duration: 0.2, yoyo: true, repeat: 1, ease: 'sine.inOut' }, T.end(8) + 0.1);
tl.fromTo('#s8-mark', { rotation: 0 }, { rotation: 8, duration: 0.15, yoyo: true, repeat: 3, ease: 'sine.inOut' }, T.end(8) + 0.4);
