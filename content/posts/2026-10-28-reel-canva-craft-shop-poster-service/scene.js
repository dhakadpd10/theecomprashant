// Editorial host reel, kind "news": the example poster, the service stamp, the Craft news card, three steps on a progress bar, the catch, then the keyword.
const OUT = 'expo.out', POP = 'back.out(1.8)';
const span = (n) => T.end(n) - T.voice(n);
const fr = (n, f) => T.voice(n) + f * span(n);
const title = (s, t) => tl.fromTo(`${s} .title .l`, { yPercent: 110 }, { yPercent: 0, duration: 0.55, ease: OUT, stagger: 0.09 }, t);
const card = (id, t) => tl.fromTo(id, { y: 120, opacity: 0, scale: 0.96 }, { y: 0, opacity: 1, scale: 1, duration: 0.6, ease: OUT }, t);
const step = (s, t) => tl.fromTo(`${s} .step`, { x: -40, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4, ease: OUT }, t);

// texture: slow drifting blobs across the whole reel
tl.fromTo('#blobA', { x: 0, y: 0 }, { x: 160, y: 120, duration: T.dur, ease: 'sine.inOut' }, 0);
tl.fromTo('#blobB', { x: 0, y: 0 }, { x: -140, y: -160, duration: T.dur, ease: 'sine.inOut' }, 0);

// progress bar: only during the three steps
tl.set('#bar', { opacity: 0 }, 0);
tl.set(['#p1', '#p2', '#p3'], { scaleX: 0 }, 0);
tl.to('#bar', { opacity: 1, duration: 0.3, ease: 'power3.out' }, T.at(3));
[3, 4, 5].forEach((n, i) => tl.to(`#p${i + 1}`, { scaleX: 1, duration: 0.5, ease: 'power2.out' }, T.at(n)));
tl.to('#bar', { opacity: 0, duration: 0.25, ease: 'power3.in' }, T.at(6));

// 0. hook: title and poster on screen at frame 0
tl.fromTo('#s0-title .l', { yPercent: 0 }, { yPercent: 0, duration: 0.01 }, 0);
tl.fromTo('#s0-title', { scale: 1.05 }, { scale: 1, duration: 0.6, ease: OUT }, 0);
tl.fromTo('#s0-step', { opacity: 0.6 }, { opacity: 1, duration: 0.3, ease: 'power2.out' }, 0);
tl.fromTo('#s0-poster', { scale: 1.08, rotation: 4 }, { scale: 1, rotation: 4, duration: 0.7, ease: OUT }, 0);
tl.fromTo('#s0-broke', { x: 0 }, { x: 8, duration: 0.05, repeat: 5, yoyo: true, ease: 'none' }, fr(0, 0.38));
tl.fromTo('#s0-poster', { scale: 1 }, { scale: 1.05, duration: 0.18, yoyo: true, repeat: 1, ease: 'sine.inOut' }, fr(0, 0.78));

// 1. the service: poster rises big, rows settle, FOR HIRE stamp slams on "pay"
step('#s1', T.at(1)); title('#s1', T.at(1) + 0.05);
tl.fromTo('#s1-poster', { y: 140, opacity: 0, scale: 0.9, rotation: -4 }, { y: 0, opacity: 1, scale: 1, rotation: -2, duration: 0.6, ease: OUT }, T.at(1) + 0.15);
tl.fromTo('#s1-poster .pr', { x: -30, opacity: 0 }, { x: 0, opacity: 1, duration: 0.35, ease: 'power3.out', stagger: 0.06 }, T.at(1) + 0.45);
tl.fromTo('#s1-tag', { opacity: 0 }, { opacity: 1, duration: 0.3, ease: 'power2.out' }, T.at(1) + 0.75);
const stampT = fr(1, 0.62);
tl.fromTo('#s1-stamp', { scale: 2.4, opacity: 0, rotation: -20 }, { scale: 1, opacity: 1, rotation: -8, duration: 0.24, ease: 'power4.in' }, stampT);
tl.fromTo('#s1-poster', { y: 0 }, { y: 10, duration: 0.07, yoyo: true, repeat: 1, ease: 'power2.out' }, stampT + 0.24);

// 2. news: the Canva card, url types, rows land with the words
step('#s2', T.at(2)); title('#s2', T.at(2) + 0.05); card('#s2-card', T.at(2) + 0.2);
tl.fromTo('#s2-url', { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 0.45, ease: 'steps(9)' }, T.at(2) + 0.5);
[['#s2-r1', 0.02], ['#s2-r2', 0.25], ['#s2-r3', 0.5], ['#s2-r4', 0.72], ['#s2-r5', 0.88]].forEach(([id, f]) =>
  tl.fromTo(id, { x: 60, opacity: 0 }, { x: 0, opacity: 1, duration: 0.35, ease: OUT }, fr(2, f)));
tl.fromTo('#s2-r4', { scale: 1 }, { scale: 1.04, duration: 0.2, yoyo: true, repeat: 1, ease: 'sine.inOut' }, fr(2, 0.72) + 0.4);

// 3. step 1: viewfinder snaps on, shutter presses, flash
step('#s3', T.at(3)); title('#s3', T.at(3) + 0.05); card('#s3-cam', T.at(3) + 0.12);
tl.fromTo('#s3-frame', { scale: 1.15, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: 'power3.out' }, T.voice(3) + 0.2);
const snap = fr(3, 0.7);
tl.fromTo('#s3-shut', { scale: 1 }, { scale: 0.82, duration: 0.1, yoyo: true, repeat: 1, ease: 'power2.inOut' }, snap);
tl.fromTo('#s3-flash', { opacity: 0 }, { opacity: 0.9, duration: 0.06, ease: 'power2.out' }, snap + 0.1);
tl.to('#s3-flash', { opacity: 0, duration: 0.35, ease: 'power2.out' }, snap + 0.16);
tl.fromTo('#s3-board', { scale: 1 }, { scale: 1.04, duration: 0.18, yoyo: true, repeat: 1, ease: 'sine.inOut' }, snap + 0.2);

// 4. step 2: prompt types, three posters pop as each is named
step('#s4', T.at(4)); title('#s4', T.at(4) + 0.05); card('#s4-card', T.at(4) + 0.2);
tl.fromTo('#s4-type', { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 0.8, ease: 'steps(21)' }, T.voice(4) + 0.25);
[['#s4-t1', 0.48], ['#s4-t2', 0.66], ['#s4-t3', 0.84]].forEach(([id, f]) =>
  tl.fromTo(id, { scale: 0.6, opacity: 0, y: 40 }, { scale: 1, opacity: 1, y: 0, duration: 0.45, ease: POP }, fr(4, f)));

// 5. step 3: the message pops with the three posters, ticks wipe in
step('#s5', T.at(5)); title('#s5', T.at(5) + 0.05); card('#s5-chat', T.at(5) + 0.12);
tl.fromTo('#s5-bub', { scale: 0.7, opacity: 0, y: 30 }, { scale: 1, opacity: 1, y: 0, duration: 0.4, ease: POP }, fr(5, 0.35));
tl.fromTo('#s5-bub .th', { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.35, ease: POP, stagger: 0.06 }, fr(5, 0.35) + 0.15);
tl.fromTo('#s5-tick', { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 0.3, ease: 'power3.out' }, fr(5, 0.85));

// 6. the catch: rows land, chips slam (thud on the first) and shake
step('#s6', T.at(6)); title('#s6', T.at(6) + 0.05); card('#s6-card', T.at(6) + 0.15);
tl.fromTo('#s6-k1', { x: 60, opacity: 0 }, { x: 0, opacity: 1, duration: 0.35, ease: OUT }, T.voice(6) + 0.15);
tl.fromTo('#s6-k2', { x: 60, opacity: 0 }, { x: 0, opacity: 1, duration: 0.35, ease: OUT }, fr(6, 0.6));
[['#s6-c1', T.voice(6) + 0.6 - 0.24, '#s6-k1'], ['#s6-c2', fr(6, 0.88), '#s6-k2']].forEach(([id, t, row]) => {
  tl.fromTo(id, { scale: 1.8, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.24, ease: 'power4.in' }, t);
  tl.fromTo(row, { x: 0 }, { x: 8, duration: 0.05, repeat: 5, yoyo: true, ease: 'none' }, t + 0.24);
});

// 7. send + keyword: plane flies in, POSTER letters drop on the word, save and the pill
step('#s7', T.at(7)); title('#s7', T.at(7) + 0.05);
tl.fromTo('#s7-plane', { x: -200, y: 120, opacity: 0, rotation: -20 }, { x: 0, y: 0, opacity: 1, rotation: 0, duration: 0.7, ease: OUT }, T.at(7) + 0.25);
tl.fromTo('#s7-who', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: OUT }, T.voice(7) + 0.3);
card('#s7-card', fr(7, 0.5));
tl.fromTo('#s7-word .lt', { y: -80, opacity: 0, scale: 1.3 }, { y: 0, opacity: 1, scale: 1, duration: 0.35, ease: 'power3.out', stagger: 0.06 }, fr(7, 0.8));
tl.fromTo('#s7-sub', { opacity: 0 }, { opacity: 1, duration: 0.4, ease: 'power2.out' }, fr(7, 0.95));
tl.fromTo('#s7-pill', { scale: 0.6, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.45, ease: POP }, T.end(7) + 0.05);
tl.fromTo('#s7-mark', { y: -40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.45, ease: POP }, T.end(7) + 0.3);
tl.fromTo('#s7-save', { x: 40, opacity: 0 }, { x: 0, opacity: 1, duration: 0.45, ease: OUT }, T.end(7) + 0.34);
tl.fromTo('#s7-word', { scale: 1 }, { scale: 1.05, duration: 0.2, yoyo: true, repeat: 1, ease: 'sine.inOut' }, T.end(7) + 0.8);
tl.to('#s7-plane', { x: 24, y: -16, duration: 0.6, yoyo: true, repeat: 1, ease: 'sine.inOut' }, T.end(7));
