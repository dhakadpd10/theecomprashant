// Editorial host reel, kind "sites", arm B: the money outcome (₹0 to join) at frame 0, three real site cards, the catch, red flags, helpline, send, keyword.
const OUT = 'expo.out', POP = 'back.out(1.8)';
const span = (n) => T.end(n) - T.voice(n);
const said = (n, f) => T.voice(n) + f * span(n);
const title = (s, t) => tl.fromTo(`${s} .title .l`, { yPercent: 110 }, { yPercent: 0, duration: 0.55, ease: OUT, stagger: 0.08 }, t);
const card = (id, t) => tl.fromTo(id, { y: 100, opacity: 0, scale: 0.96 }, { y: 0, opacity: 1, scale: 1, duration: 0.6, ease: OUT }, t);
const step = (s, t) => tl.fromTo(`${s} .step`, { x: -40, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4, ease: OUT }, t);
const shake = (id, t) => tl.to(id, { x: 8, duration: 0.05, repeat: 5, yoyo: true, ease: 'none' }, t);
const bump = (id, t) => tl.to(id, { scale: 1.05, duration: 0.2, yoyo: true, repeat: 1, ease: 'sine.inOut' }, t);

// texture: slow drifting blobs across the whole reel
tl.fromTo('#blob1', { x: -80, y: 0 }, { x: 120, y: -60, duration: T.dur, ease: 'sine.inOut' }, 0);
tl.fromTo('#blob2', { x: 60, y: 0 }, { x: -100, y: -80, duration: T.dur, ease: 'sine.inOut' }, 0);

// progress bar: one segment per beat from site 1 to the helpline
tl.set(['#p1', '#p2', '#p3', '#p4', '#p5', '#p6'], { scaleX: 0 }, 0);
[1, 2, 3, 4, 5, 6].forEach((n) => tl.to(`#p${n}`, { scaleX: 1, duration: 0.5, ease: 'power2.out' }, T.at(n)));

// 0. hook: "₹0 to join. They pay you." is on screen at frame 0
tl.fromTo('#s0-title .l', { yPercent: 0 }, { yPercent: 0, duration: 0.01 }, 0);
tl.fromTo('#s0-title', { scale: 1.05 }, { scale: 1, duration: 0.6, ease: OUT }, 0);
tl.fromTo('#s0-step', { opacity: 0.6 }, { opacity: 1, duration: 0.3 }, 0);
tl.fromTo('#s0-t1', { scale: 0.6, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: POP }, 0.3);
tl.fromTo('#s0-t2', { scale: 0.6, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: POP }, 0.38);
bump('#s0-t1', said(0, 0.78));
bump('#s0-t2', said(0, 0.78) + 0.08);

// 1-3. each site: card rises, url types, number pops on the voice, rows land as they are said
[1, 2, 3].forEach((n) => {
  const s = `#s${n}`;
  step(s, T.at(n)); title(s, T.at(n) + 0.05); card(`${s}-card`, T.at(n) + 0.2);
  tl.fromTo(`${s} .url`, { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 0.5, ease: 'steps(12)' }, T.at(n) + 0.5);
  tl.fromTo(`${s} .num`, { scale: 0, rotation: -90 }, { scale: 1, rotation: 0, duration: 0.45, ease: POP }, T.voice(n) - 0.05);
  [['.r1', 0.25], ['.r2', 0.5], ['.r3', 0.72]].forEach(([r, f]) => tl.fromTo(`${s} ${r}`, { x: 60, opacity: 0 }, { x: 0, opacity: 1, duration: 0.35, ease: OUT }, said(n, f)));
});
bump('#s1 .r3', said(1, 0.9));
bump('#s3 .r3', said(3, 0.9));

// 4. the catch: three rows, each chip slams in and shakes
step('#s4', T.at(4)); title('#s4', T.at(4) + 0.05); card('#s4-card', T.at(4) + 0.2);
[['#k1', '#c1', 0.3], ['#k2', '#c2', 0.52], ['#k3', '#c3', 0.78]].forEach(([row, chip, f]) => {
  const t = said(4, f);
  tl.fromTo(row, { x: 60, opacity: 0 }, { x: 0, opacity: 1, duration: 0.35, ease: OUT }, t - 0.15);
  tl.fromTo(chip, { scale: 1.8, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.25, ease: 'power4.in' }, t);
  shake(chip, t + 0.25);
});

// 5. red flags: the flag slams on the thud, each flag row gets its X as it is said
step('#s5', T.at(5)); title('#s5', T.at(5) + 0.05); card('#s5-card', T.at(5) + 0.2);
tl.fromTo('#s5-flag', { scale: 2.2, opacity: 0, rotation: -20 }, { scale: 1, opacity: 1, rotation: 0, duration: 0.22, ease: 'power4.in' }, T.voice(5) + 0.38);
[['#f1', '#x1', 0.28], ['#f2', '#x2', 0.44], ['#f3', '#x3', 0.6], ['#f4', '#x4', 0.8]].forEach(([row, x, f]) => {
  const t = said(5, f);
  tl.fromTo(row, { x: 60, opacity: 0 }, { x: 0, opacity: 1, duration: 0.35, ease: OUT }, t - 0.12);
  tl.fromTo(x, { scale: 0, rotation: -45 }, { scale: 1, rotation: 0, duration: 0.35, ease: POP }, t + 0.1);
  shake(row, t + 0.3);
});
tl.fromTo('#s5-sub', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: OUT }, said(5, 0.92));

// 6. helpline: label clicks in, digits drop as they are spoken, the call button rings
step('#s6', T.at(6)); title('#s6', T.at(6) + 0.05); card('#s6-card', T.at(6) + 0.1);
tl.fromTo('#s6-label', { scale: 0.7, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.3, ease: POP }, T.voice(6) + 0.36);
[['#s6-d1', 0.5], ['#s6-d2', 0.64], ['#s6-d3', 0.78], ['#s6-d4', 0.9]].forEach(([d, f]) => tl.fromTo(d, { y: -60, opacity: 0 }, { y: 0, opacity: 1, duration: 0.3, ease: POP }, said(6, f) - 0.1));
tl.fromTo('#s6-url', { opacity: 0 }, { opacity: 1, duration: 0.3, ease: 'power2.out' }, T.voice(6) + 0.6);
tl.fromTo('#s6-call', { scale: 0.6, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: POP }, T.voice(6) + 0.7);
tl.fromTo('#s6-ring', { scale: 1, opacity: 0 }, { scale: 1.7, opacity: 0, duration: 0.01 }, T.at(6));
tl.fromTo('#s6-ring', { scale: 1, opacity: 0.6 }, { scale: 1.7, opacity: 0, duration: 0.6, ease: 'power2.out' }, T.end(6) - 0.4);
bump('#s6-call', T.end(6) - 0.4);

// 7. send this: the friend's job message, you typing, your reply, seen
step('#s7', T.at(7)); title('#s7', T.at(7) + 0.05); card('#s7-card', T.at(7) + 0.15);
tl.fromTo('#s7-in', { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: POP }, T.at(7) + 0.45);
tl.fromTo('#s7-typing', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.3, ease: OUT }, said(7, 0.35));
tl.fromTo('#s7 .td', { y: 0 }, { y: -10, duration: 0.2, yoyo: true, repeat: 3, ease: 'sine.inOut', stagger: 0.08 }, said(7, 0.35) + 0.1);
tl.to('#s7-typing', { opacity: 0, duration: 0.2, ease: 'power3.in' }, said(7, 0.7) - 0.05);
tl.fromTo('#s7-out', { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: POP }, said(7, 0.7));
tl.fromTo('#s7-seen', { opacity: 0, x: 20 }, { opacity: 1, x: 0, duration: 0.3, ease: OUT }, said(7, 0.92));

// 8. save + keyword: bookmark drops, what you get, SITES letters drop in, the pill bumps
step('#s8', T.at(8)); title('#s8', T.at(8) + 0.05);
tl.fromTo('#s8-mark', { y: -80, opacity: 0 }, { y: 0, opacity: 1, duration: 0.45, ease: POP }, T.at(8) + 0.2);
card('#s8-card', T.at(8) + 0.25);
tl.fromTo(['#g1', '#g2'], { x: 60, opacity: 0 }, { x: 0, opacity: 1, duration: 0.35, ease: OUT, stagger: 0.08 }, T.at(8) + 0.4);
tl.fromTo('#s8-pill', { scale: 0.6, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.45, ease: POP }, T.voice(8) + 0.25);
tl.fromTo('#s8-kw .kl', { y: -80, opacity: 0 }, { y: 0, opacity: 1, duration: 0.35, ease: POP, stagger: 0.05 }, T.voice(8) + 0.45);
tl.fromTo('#s8-sub', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.4, ease: OUT }, T.end(8) - 0.2);
bump('#s8-pill', T.end(8) + 0.3);
tl.to('#s8-mark', { y: -12, duration: 0.3, yoyo: true, repeat: 1, ease: 'sine.inOut' }, T.end(8) + 0.9);
