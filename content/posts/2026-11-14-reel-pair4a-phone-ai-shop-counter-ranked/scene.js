// Tool reel, pair 4 A: 3 AI tools already on a shop owner's phone, ranked #3 to #1, then the catch on one ranked card.
// Colour = meaning: blue = Gemini and the favourite mark, green = Circle to Search, terracotta = Google Lens, red = the catch.
// Motion: enters expo.out, pops back.out, slams power4.in, stagger 0.07 s, labels settle late, orbs drift all reel.
const OUT = 'expo.out', POP = 'back.out(1.8)';
const span = (n) => T.end(n) - T.voice(n);
const at = (n, f) => T.voice(n) + f * span(n);
const title = (s, t) => tl.fromTo(`${s} .title .l`, { yPercent: 110 }, { yPercent: 0, duration: 0.55, ease: OUT, stagger: 0.08 }, t);
const step = (s, t) => tl.fromTo(`${s} .step`, { x: -40, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4, ease: OUT }, t);
const card = (id, t) => tl.fromTo(id, { y: 110, opacity: 0, scale: 0.96 }, { y: 0, opacity: 1, scale: 1, duration: 0.55, ease: OUT }, t);
const late = (id, t) => tl.fromTo(id, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.35, ease: OUT }, t);
const chip = (id, t) => {
  tl.fromTo(id, { scale: 0, opacity: 0 }, { scale: 1.12, opacity: 1, duration: 0.22, ease: 'power2.out' }, t);
  tl.to(id, { scale: 1, duration: 0.18, ease: 'power2.inOut' }, t + 0.22);
};
const rows = (ids, t, gap = 0.07, x = 60) => ids.forEach((id, i) => tl.fromTo(id, { x, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4, ease: OUT }, t + i * gap));
const slam = (id, t, rot) => tl.fromTo(id, { scale: 2.4, opacity: 0, rotation: rot - 14 }, { scale: 1, opacity: 1, rotation: rot, duration: 0.24, ease: 'power4.in' }, t);
const shake = (id, t, px = 8) => tl.fromTo(id, { x: 0 }, { x: px, duration: 0.05, repeat: 5, yoyo: true, ease: 'none' }, t);
const draw = (id, len, t, d = 0.5) => tl.fromTo(id, { strokeDashoffset: len }, { strokeDashoffset: 0, duration: d, ease: 'power2.out' }, t);

// texture: two warm orbs drift for the whole reel
tl.fromTo('#orb1', { x: 0, y: 0 }, { x: 170, y: -130, duration: T.dur, ease: 'sine.inOut' }, 0);
tl.fromTo('#orb2', { x: 0, y: 0 }, { x: -190, y: -150, duration: T.dur, ease: 'sine.inOut' }, 0);

// progress bar: helpers, #3, #2, #1, catch, send
tl.set(['#p1', '#p2', '#p3', '#p4', '#p5', '#p6'], { scaleX: 0 }, 0);
[1, 2, 3, 4, 6, 8].forEach((n, i) => tl.to(`#p${i + 1}`, { scaleX: 1, duration: 0.5, ease: 'power2.out' }, T.at(n)));

// 0. hook: title, tool tiles and host are all there at frame 0. FREE slams on the thud, a hand circle rings the 3
tl.fromTo('#s0-title .l', { yPercent: 0 }, { yPercent: 0, duration: 0.01 }, 0);
tl.fromTo('#s0-title', { scale: 1.06 }, { scale: 1, duration: 0.7, ease: OUT }, 0);
tl.fromTo('#s0-step', { opacity: 0.6 }, { opacity: 1, duration: 0.3 }, 0);
tl.fromTo(['#t1', '#t2', '#t3'], { y: 0 }, { y: -14, duration: 1.1, yoyo: true, repeat: 2, ease: 'sine.inOut', stagger: 0.2 }, 0);
slam('#s0-free', T.voice(0) + 0.5, 8);
draw('#s0-ring-p', 520, at(0, 0.28), 0.5);
tl.fromTo(['#t1', '#t2', '#t3'], { scale: 1 }, { scale: 1.1, duration: 0.15, yoyo: true, repeat: 1, ease: 'sine.inOut', stagger: 0.08 }, at(0, 0.78));

// 1. the analogy: a staff roster of three helpers, every salary FREE
step('#s1', T.at(1)); title('#s1', T.at(1) + 0.05); card('#s1-card', T.at(1) + 0.12);
late('#s1-head', T.at(1) + 0.35); late('#s1-sal', T.at(1) + 0.4);
rows(['#s1-r1', '#s1-r2', '#s1-r3'], T.voice(1) + 0.15, 0.08);
['#s1-c1', '#s1-c2', '#s1-c3'].forEach((id, i) => chip(id, at(1, 0.35) + i * 0.07));
late('#s1-note', at(1, 0.75));

// 2. #3 Gemini: you speak, the waveform moves, three dots, the drafted reply lands
step('#s2', T.at(2)); title('#s2', T.at(2) + 0.05); card('#s2-card', T.at(2) + 0.12);
chip('#s2-rank', T.voice(2) + 0.2);
tl.fromTo('#s2-spark', { rotation: -90, scale: 0.4, opacity: 0 }, { rotation: 0, scale: 1, opacity: 1, duration: 0.45, ease: POP }, T.voice(2) + 0.25);
late('#s2-ex', T.voice(2) + 0.3);
tl.fromTo('#s2-voice', { x: 60, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4, ease: OUT }, T.voice(2) + 0.3);
tl.fromTo('#s2-wave i', { scaleY: 0.3 }, { scaleY: 1, duration: 0.14, repeat: 5, yoyo: true, ease: 'sine.inOut', stagger: 0.03 }, T.voice(2) + 0.4);
tl.fromTo('#s2-dots', { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 0.2, ease: POP }, T.voice(2) + 0.8);
tl.fromTo('#s2-dots i', { y: 0 }, { y: -8, duration: 0.12, repeat: 1, yoyo: true, ease: 'sine.inOut', stagger: 0.06 }, T.voice(2) + 0.85);
tl.to('#s2-dots', { opacity: 0, duration: 0.12, ease: 'power3.in' }, T.voice(2) + 1.15);
tl.fromTo('#s2-reply', { opacity: 0, y: 20, scale: 0.88 }, { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: POP }, T.voice(2) + 1.2);
late('#s2-lim', at(2, 0.88));

// 3. #2 Circle to Search: a white loop draws around the product, the match slides up
step('#s3', T.at(3)); title('#s3', T.at(3) + 0.05); card('#s3-card', T.at(3) + 0.12);
chip('#s3-rank', T.voice(3) + 0.2);
draw('#s3-ring-p', 640, at(3, 0.3), 0.5);
tl.fromTo('#s3-bottle', { scale: 1 }, { scale: 1.06, duration: 0.25, yoyo: true, repeat: 1, ease: 'sine.inOut' }, at(3, 0.3) + 0.5);
rows(['#s3-r1', '#s3-r2'], at(3, 0.6), 0.1, 0);
tl.fromTo(['#s3-r1', '#s3-r2'], { y: 40 }, { y: 0, duration: 0.4, ease: OUT, stagger: 0.1 }, at(3, 0.6));
chip('#s3-match', at(3, 0.72));
late('#s3-lim', at(3, 0.88));

// 4. #1 Google Lens (host hidden, full width): FAVOURITE slams on "one", the viewfinder locks, the scan reads each line
step('#s4', T.at(4)); title('#s4', T.at(4) + 0.05); card('#s4-card', T.at(4) + 0.12);
slam('#s4-fav', T.voice(4) + 0.6, 0);
tl.fromTo('#s4-vf', { scale: 1.08, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: OUT }, T.voice(4) + 0.9);
chip('#s4-lang', at(4, 0.5));
late('#s4-tip', at(4, 0.6));
const scanAt = at(4, 0.45);
tl.fromTo('#s4-scan', { y: 0, opacity: 0 }, { y: 390, opacity: 1, duration: 1.6, ease: 'sine.inOut' }, scanAt);
tl.to('#s4-scan', { opacity: 0, duration: 0.25, ease: 'power3.in' }, scanAt + 1.6);
[['#s4-l1', 0.6], ['#s4-l2', 0.85], ['#s4-l3', 1.05], ['#s4-l4', 1.35]].forEach(([id, d]) => tl.to(id, { color: '#2A4BD7', duration: 0.2, ease: 'power2.out' }, scanAt + d));

// 5. the result (payoff, cooker whistles): the same bill, now in Hindi, wiped in line by line
step('#s5', T.at(5)); title('#s5', T.at(5) + 0.05); card('#s5-card', T.at(5) + 0.1);
chip('#s5-hi', T.at(5) + 0.4);
['#s5-r1', '#s5-r2', '#s5-r3', '#s5-r4'].forEach((id, i) => tl.fromTo(id, { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 0.35, ease: 'power3.out' }, T.voice(5) + 0.1 + i * 0.22));
tl.fromTo('#s5-r4', { scale: 1 }, { scale: 1.05, duration: 0.15, yoyo: true, repeat: 1, ease: 'sine.inOut' }, T.voice(5) + 1.05);
late('#s5-note', T.voice(5) + 1.1);

// 6 to 7. the catch on the ranked card: Circle is ringed red and shakes, then CHECK TOTALS slams on Lens
step('#s6', T.at(6)); title('#s6', T.at(6) + 0.05); card('#s6-card', T.at(6) + 0.12);
late('#s6-head', T.at(6) + 0.35);
rows(['#s6-r1', '#s6-r2', '#s6-r3'], T.at(6) + 0.3, 0.08);
chip('#s6-best', T.at(6) + 0.6);
tl.fromTo('#s6-ring2', { scale: 1.08, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.3, ease: OUT }, at(6, 0.3));
tl.to('#s6-r2', { backgroundColor: '#FBE7E3', duration: 0.3, ease: 'power2.out' }, at(6, 0.3));
shake('#s6-r2', at(6, 0.75), 8);
tl.to('#s6-ring2', { opacity: 0, duration: 0.25, ease: 'power3.in' }, T.at(7));
tl.to('#s6-r2', { backgroundColor: '#F6F3EE', duration: 0.25, ease: 'power2.inOut' }, T.at(7));
tl.fromTo('#s6-ring1', { scale: 1.08, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.3, ease: OUT }, T.voice(7) + 0.05);
slam('#s6-stamp', T.voice(7) + 0.4, -8);
shake('#s6-card', T.voice(7) + 0.64, 6);
tl.to('#s6-l1', { color: '#C0392B', duration: 0.25, ease: 'power2.out' }, at(7, 0.7));

// 8. send this, the free card's three rows tick in, then PHONE drops in letter by letter
tl.fromTo('#s8-send .l', { yPercent: 110 }, { yPercent: 0, duration: 0.55, ease: OUT, stagger: 0.08 }, T.at(8));
late('#s8-who', T.voice(8) + 0.25);
card('#s8-card', T.voice(8) + 0.45);
late('#s8-head', T.voice(8) + 0.7);
rows(['#s8-f1', '#s8-f2', '#s8-f3'], T.voice(8) + 0.75, 0.08, 40);
['#s8-f1 .tk', '#s8-f2 .tk', '#s8-f3 .tk'].forEach((id, i) => chip(id, T.voice(8) + 0.85 + i * 0.08));
tl.fromTo('#s8-pill', { scale: 0.6, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.45, ease: POP }, at(8, 0.6));
tl.fromTo('#s8-kw b', { yPercent: -120, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.4, ease: 'back.out(2)', stagger: 0.05 }, at(8, 0.68));
tl.to('#s8-pill', { scale: 1.05, duration: 0.35, yoyo: true, repeat: 1, ease: 'sine.inOut' }, T.end(8) + 0.15);
