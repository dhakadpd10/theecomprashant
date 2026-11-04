// Editorial theme, kind "skills", experiment pair 2 arm B (no named viewer in the opener).
// Ranked slots fill 4 to 1 on the voice, No. 1 counts to Upwork's +329%, the favourite card shows what you need to start,
// the catch builds in three blocks, then the send line and the SKILL keyword with the roadmap it really gives.
// FLAG FOR PRASHANT BEFORE POSTING: the caption on line 4 names CapCut. CapCut was in India's 2020 app ban, so check it
// is available here before this goes out. The voice and this picture only say "free editor"; consider changing the caption.
const OUT = 'expo.out', POP = 'back.out(1.8)';
const span = (n) => T.end(n) - T.voice(n);
const at = (n, f) => T.voice(n) + f * span(n);
const title = (s, t) => tl.fromTo(`${s} .title .l`, { yPercent: 110 }, { yPercent: 0, duration: 0.55, ease: OUT, stagger: 0.08 }, t);
const step = (s, t) => tl.fromTo(`${s} .step`, { x: -40, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4, ease: OUT }, t);
const card = (id, t) => tl.fromTo(id, { y: 100, opacity: 0, scale: 0.96 }, { y: 0, opacity: 1, scale: 1, duration: 0.6, ease: OUT }, t);

// texture: two soft blobs drift across the whole reel
tl.fromTo('#blobA', { x: 0, y: 0 }, { x: 160, y: -120, duration: T.dur, ease: 'sine.inOut' }, 0);
tl.fromTo('#blobB', { x: 0, y: 0 }, { x: -180, y: -80, duration: T.dur, ease: 'sine.inOut' }, 0);

// progress bar: one segment per step (list, favourite, catch, send, keyword)
tl.set(['#p1', '#p2', '#p3', '#p4', '#p5'], { scaleX: 0 }, 0);
[[1, 1], [2, 4], [3, 5], [4, 8], [5, 9]].forEach(([p, n]) => tl.to(`#p${p}`, { scaleX: 1, duration: 0.5, ease: 'power2.out' }, T.at(n)));

// 0. hook: title on screen at frame 0, the trend arrow draws, the source chip lands on "Upwork's own numbers"
tl.fromTo('#s0-title .l', { yPercent: 0 }, { yPercent: 0, duration: 0.01 }, 0);
tl.fromTo('#s0-title', { scale: 1.05 }, { scale: 1, duration: 0.6, ease: OUT }, 0);
tl.fromTo('#s0-step', { opacity: 0.6 }, { opacity: 1, duration: 0.3 }, 0);
tl.fromTo('#s0-line', { strokeDashoffset: 240 }, { strokeDashoffset: 0, duration: 0.7, ease: 'power3.out' }, T.voice(0) + 1.0);
tl.fromTo('#s0-head', { strokeDashoffset: 90 }, { strokeDashoffset: 0, duration: 0.3, ease: 'power3.out' }, T.voice(0) + 1.6);
tl.fromTo('#s0-arrow', { y: 0 }, { y: -12, duration: 0.6, yoyo: true, repeat: 1, ease: 'sine.inOut' }, T.voice(0) + 2.1);
tl.fromTo('#s0-src', { scale: 0.6, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: POP }, at(0, 0.74));

// 1. ranked list: empty dashed slots, filled 4 to 1 as each skill is said
step('#s1', T.at(1)); title('#s1', T.at(1) + 0.05); card('#s1-card', T.at(1) + 0.15);
tl.fromTo('#s1 .rk', { x: 50, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4, ease: OUT, stagger: 0.06 }, T.at(1) + 0.25);
const fill = (id, t) => {
  tl.fromTo(`${id} .fill`, { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 0.4, ease: 'power3.out' }, t);
  tl.fromTo(`${id} .n`, { scale: 1 }, { scale: 1.18, duration: 0.15, yoyo: true, repeat: 1, ease: 'power2.out' }, t);
};
fill('#rk4', T.voice(1) + 0.2);
fill('#rk3', T.voice(1) + 1.4);
fill('#rk2', T.voice(2) + 0.2);
fill('#rk1', T.voice(3) + 0.1);
tl.fromTo('#rk1', { scale: 1 }, { scale: 1.04, duration: 0.2, yoyo: true, repeat: 1, ease: 'sine.inOut' }, T.voice(3) + 0.45);

// No. 1 stat: counts to +329% before the cover frame, then bumps on "four times"
tl.fromTo('#s1-stat', { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: OUT }, T.at(3) + 0.45);
const cnt = { v: 0 };
tl.fromTo(cnt, { v: 0 }, { v: 329, duration: 0.8, ease: 'power2.out', onUpdate: () => { document.getElementById('s1-num').textContent = '+' + Math.round(cnt.v) + '%'; } }, T.at(3) + 0.5);
tl.fromTo('#s1-up', { scale: 0, y: 20 }, { scale: 1, y: 0, duration: 0.45, ease: POP }, at(3, 0.6));
tl.fromTo('#s1-stat', { scale: 1 }, { scale: 1.05, duration: 0.18, yoyo: true, repeat: 1, ease: 'power2.out' }, at(3, 0.62));

// 2. the favourite: star pops, the sample reel plays on the phone, the three things you need tick in
step('#s2', T.at(4)); title('#s2', T.at(4) + 0.05); card('#s2-card', T.at(4) + 0.15);
tl.fromTo('#s2-star', { scale: 0, rotation: -120 }, { scale: 1, rotation: 0, duration: 0.5, ease: POP }, T.voice(4) + 0.15);
tl.fromTo(['#s2-lab', '#s2-name'], { x: 40, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4, ease: OUT, stagger: 0.06 }, T.voice(4) + 0.25);
tl.fromTo('#s2-phone', { y: 80, opacity: 0, rotation: -6 }, { y: 0, opacity: 1, rotation: 0, duration: 0.6, ease: OUT }, T.at(4) + 0.35);
tl.fromTo('#s2-head', { x: 0 }, { x: 130, duration: span(4), ease: 'none' }, T.voice(4) + 0.4);
tl.fromTo('#s2-play', { scale: 1 }, { scale: 1.15, duration: 0.3, yoyo: true, repeat: 3, ease: 'sine.inOut' }, at(4, 0.8));
[['#nd1', 0.3], ['#nd2', 0.42], ['#nd3', 0.6]].forEach(([id, f]) => {
  tl.fromTo(id, { x: 50, opacity: 0 }, { x: 0, opacity: 1, duration: 0.35, ease: OUT }, at(4, f));
  tl.fromTo(`${id} .tick`, { scale: 0 }, { scale: 1, duration: 0.35, ease: POP }, at(4, f) + 0.1);
});
tl.fromTo('#s2-cost', { scale: 0.7, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: POP }, at(4, 0.82));

// 3. the catch: demand chip slams on the thud, the old gigs shrink, the clock spins through the weeks
step('#s3', T.at(5)); title('#s3', T.at(5) + 0.05); card('#s3-card', T.at(5) + 0.15);
tl.fromTo('#c1', { x: 50, opacity: 0 }, { x: 0, opacity: 1, duration: 0.35, ease: OUT }, T.voice(5) + 0.1);
tl.fromTo('#c1-chip', { scale: 1.8, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.25, ease: 'power4.in' }, T.voice(5) + 0.25);
tl.fromTo('#c1-chip', { x: 0 }, { x: 8, duration: 0.05, repeat: 5, yoyo: true, ease: 'none' }, T.voice(5) + 0.5);
tl.fromTo('#c2', { x: 50, opacity: 0 }, { x: 0, opacity: 1, duration: 0.35, ease: OUT }, T.at(6) + 0.05);
tl.fromTo('#s3 .gig', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: OUT, stagger: 0.07 }, T.voice(6) + 0.15);
tl.fromTo('#s3 .gig', { scale: 1 }, { scale: 0.84, duration: 0.45, ease: 'power2.inOut', stagger: 0.06 }, at(6, 0.75));
tl.fromTo('#s3 .dn', { y: -10 }, { y: 6, duration: 0.3, ease: 'power3.out', stagger: 0.06 }, at(6, 0.75));
tl.fromTo('#c3', { x: 50, opacity: 0 }, { x: 0, opacity: 1, duration: 0.35, ease: OUT }, T.at(7) + 0.05);
tl.fromTo('#s3-hand', { rotation: 0, svgOrigin: '32 32' }, { rotation: 720, svgOrigin: '32 32', duration: span(7) + 0.4, ease: 'power2.inOut' }, T.voice(7));

// 4. send this: the plane flies in, "next month" gets struck, "today" pops
tl.fromTo('#s4-send .l', { yPercent: 110 }, { yPercent: 0, duration: 0.55, ease: OUT }, T.at(8));
tl.fromTo('#s4-plane', { x: -200, y: 120, opacity: 0, rotation: -20 }, { x: 0, y: 0, opacity: 1, rotation: 0, duration: 0.7, ease: OUT }, T.at(8) + 0.25);
tl.fromTo('#s4-who', { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: OUT }, T.voice(8) + 0.3);
card('#s4-card', T.voice(8) + 0.6);
tl.fromTo('#s4-strike', { scaleX: 0 }, { scaleX: 1, duration: 0.35, ease: 'power3.out' }, at(8, 0.7));
tl.fromTo('#s4-today', { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: POP }, at(8, 0.7) + 0.3);
tl.to('#s4-plane', { x: 24, y: -16, duration: 0.6, yoyo: true, repeat: 1, ease: 'sine.inOut' }, T.end(8) - 1.0);

// 5. keyword: what the roadmap gives you, Save, then SKILL drops in letter by letter on the click
step('#s5', T.at(9)); card('#s5-card', T.at(9) + 0.05);
tl.fromTo('#s5 .row', { x: 50, opacity: 0 }, { x: 0, opacity: 1, duration: 0.35, ease: OUT, stagger: 0.07 }, T.at(9) + 0.2);
tl.fromTo('#s5-save .l', { yPercent: 110 }, { yPercent: 0, duration: 0.5, ease: OUT }, T.at(9) + 0.35);
tl.fromTo('#s5-book', { y: -60, opacity: 0 }, { y: 0, opacity: 1, duration: 0.45, ease: POP }, T.at(9) + 0.5);
tl.fromTo('#s5-pill', { scale: 0.7, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: POP }, T.voice(9) + 0.1);
tl.fromTo('#s5-kw .k', { yPercent: -120, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.3, ease: 'back.out(2)', stagger: 0.05 }, T.voice(9) + 0.3);
tl.fromTo('#s5-pill', { scale: 1 }, { scale: 1.05, duration: 0.2, yoyo: true, repeat: 1, ease: 'power2.out' }, T.end(9));
tl.fromTo('#s5-book', { rotation: 0 }, { rotation: 8, duration: 0.15, yoyo: true, repeat: 3, ease: 'sine.inOut' }, T.end(9) + 0.3);
