// Tool reel: 3 free AI interviewers, ranked. Analogy: nets before the match.
// Moves: hook stamp + drawn underline, cricket-net ball, ranked slots filling bottom-up (3, 2, 1),
// a FREE sticker while the host is away, weak line struck out then the green fix, a draining limit ring,
// keyword letters dropping on half beats.
const OUT = 'expo.out', POP = 'back.out(1.8)';
const span = (n) => T.end(n) - T.voice(n);
const say = (n, f) => T.voice(n) + f * span(n);
const title = (s, t) => tl.fromTo(`${s} .title .l`, { yPercent: 110 }, { yPercent: 0, duration: 0.55, ease: OUT, stagger: 0.08 }, t);
const step = (s, t) => tl.fromTo(`${s} .step`, { x: -40, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4, ease: OUT }, t);
const card = (id, t) => tl.fromTo(id, { y: 110, opacity: 0, scale: 0.96 }, { y: 0, opacity: 1, scale: 1, duration: 0.6, ease: OUT }, t);
const late = (id, t) => tl.fromTo(id, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.35, ease: OUT }, t);
const rowIn = (id, t) => tl.fromTo(id, { x: 60, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4, ease: OUT }, t);
const pop = (id, t) => tl.fromTo(id, { y: 20, opacity: 0, scale: 0.85 }, { y: 0, opacity: 1, scale: 1, duration: 0.4, ease: POP }, t);
const chip = (id, t) => {
  tl.fromTo(id, { scale: 0, opacity: 0 }, { scale: 1.12, opacity: 1, duration: 0.22, ease: 'power2.out' }, t);
  tl.to(id, { scale: 1, duration: 0.18, ease: 'power2.inOut' }, t + 0.22);
};
const slam = (id, t, r0, r1) => tl.fromTo(id, { scale: 2.2, opacity: 0, rotation: r0 }, { scale: 1, opacity: 1, rotation: r1, duration: 0.24, ease: 'power4.in' }, t);
const shake = (id, t, px = 8) => tl.fromTo(id, { x: 0 }, { x: px, duration: 0.05, repeat: 5, yoyo: true, ease: 'none' }, t);
const bump = (id, t, s = 1.05) => tl.to(id, { scale: s, duration: 0.16, yoyo: true, repeat: 1, ease: 'sine.inOut' }, t);

// texture: two soft orbs drift the whole reel
tl.fromTo('#orb1', { x: 0, y: 0 }, { x: 180, y: -140, duration: T.dur, ease: 'sine.inOut' }, 0);
tl.fromTo('#orb2', { x: 0, y: 0 }, { x: -160, y: -200, duration: T.dur, ease: 'sine.inOut' }, 0);

// progress bar: one segment per step
const segs = ['#p1', '#p2', '#p3', '#p4', '#p5', '#p6', '#p7'];
tl.set(segs, { scaleX: 0 }, 0);
[1, 2, 3, 4, 5, 6, 8].forEach((n, i) => tl.to(segs[i], { scaleX: 1, duration: 0.5, ease: 'power2.out' }, T.at(n)));

// 0. hook: title on screen at frame 0, the #1 badge slams on the thud, underline draws, badge bumps on "strict HR"
tl.set('#s0-title .l', { yPercent: 0 }, 0);
tl.fromTo('#s0-title', { scale: 1.05 }, { scale: 1, duration: 0.7, ease: OUT }, 0);
tl.fromTo('#s0-step', { opacity: 0.7 }, { opacity: 1, duration: 0.3, ease: 'power2.out' }, 0);
slam('#s0-badge', T.voice(0) + 0.5, -18, -6);
tl.fromTo('#s0-line', { strokeDashoffset: 760 }, { strokeDashoffset: 0, duration: 0.6, ease: 'power2.out' }, T.voice(0) + 1.3);
bump('#s0-badge', say(0, 0.72), 1.08);

// 1. nets before the match: the ball flies into the net, then the two rows
step('#s1', T.at(1)); title('#s1', T.at(1) + 0.05); card('#s1-card', T.at(1) + 0.15);
const tb = T.at(1) + 0.5;
tl.fromTo('#ball', { x: 0, opacity: 0 }, { x: 380, opacity: 1, duration: 0.6, ease: 'power1.in' }, tb);
tl.fromTo('#ball-y', { y: 0 }, { y: -70, duration: 0.3, ease: 'power2.out' }, tb);
tl.to('#ball-y', { y: 6, duration: 0.3, ease: 'power2.in' }, tb + 0.3);
shake('#mesh', tb + 0.6, 6);
rowIn('#ra', say(1, 0.3)); chip('#ca', say(1, 0.42));
rowIn('#rb', say(1, 0.62)); chip('#cb', say(1, 0.78));

// 2-4. ranked card: dashed slots fill bottom-up as each rank is said
step('#s2', T.at(2)); title('#s2', T.at(2) + 0.05); card('#s2-card', T.at(2) + 0.15);
late('#s2-head', T.at(2) + 0.45);
const fill = (id, t) => tl.fromTo(id, { x: 60, opacity: 0, scale: 0.96 }, { x: 0, opacity: 1, scale: 1, duration: 0.4, ease: POP }, t);
fill('#r3-fill', T.voice(2) + 0.3);
tl.fromTo('#w3 i', { scaleY: 0.35 }, { scaleY: 1, duration: 0.14, repeat: 4, yoyo: true, ease: 'sine.inOut', stagger: 0.05 }, say(2, 0.68));
late('#s2-foot', T.voice(2) + 1.0);
// line 3, host away: FREE sticker and ENGLISH chip use the right side, then leave before he returns
fill('#r2-fill', T.voice(3) + 0.3);
tl.fromTo('#s2-free', { scale: 0, rotation: -25, opacity: 0 }, { scale: 1, rotation: -8, opacity: 1, duration: 0.45, ease: POP }, say(3, 0.5));
tl.fromTo('#s2-en', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: OUT }, say(3, 0.72));
tl.to(['#s2-free', '#s2-en'], { y: 40, opacity: 0, duration: 0.25, ease: 'power3.in' }, T.end(3) - 0.15);
// line 4: number one lands, FAVOURITE slams on the thud
fill('#r1-fill', T.voice(4) + 0.05);
slam('#fav', T.voice(4) + 0.4, -14, 0);
bump('#r1-fill', say(4, 0.8), 1.04);

// 5. payoff: the weak line gets struck, the fixed line lands in green
step('#s5', T.at(5)); title('#s5', T.at(5) + 0.05); card('#s5-card', T.at(5) + 0.15);
late('#s5-lbl', T.at(5) + 0.45);
pop('#q', T.at(5) + 0.35);
pop('#weak', say(5, 0.15));
tl.fromTo('#weak-strike', { scaleX: 0 }, { scaleX: 1, duration: 0.3, ease: 'power3.in' }, say(5, 0.3));
chip('#weak-chip', say(5, 0.34));
shake('#weak', say(5, 0.34) + 0.12, 7);
late('#fb', say(5, 0.42));
tl.fromTo('#fix', { y: 40, opacity: 0, scale: 0.92 }, { y: 0, opacity: 1, scale: 1, duration: 0.45, ease: POP }, say(5, 0.5));
bump('#fix', say(5, 0.5) + 0.5, 1.05);

// 6-7. the catch: two NO rows, then the free voice ring drains to a LIMIT chip
step('#s6', T.at(6)); title('#s6', T.at(6) + 0.05); card('#s6-card', T.at(6) + 0.15);
late('#s6-lbl', T.at(6) + 0.45);
rowIn('#k1', say(6, 0.2)); chip('#n1', say(6, 0.42)); shake('#k1', say(6, 0.42) + 0.2, 6);
rowIn('#k2', say(6, 0.62)); chip('#n2', say(6, 0.8));
rowIn('#k3', T.voice(7) + 0.05);
tl.fromTo('#ring-arc', { strokeDashoffset: 0 }, { strokeDashoffset: 113, duration: 1.1, ease: 'power1.inOut' }, T.voice(7) + 0.2);
late('#s6-foot', T.voice(7) + 0.5);
chip('#n3', say(7, 0.8));

// 8. send this, then the keyword drops in letter by letter on half beats
title('#s8', T.at(8));
tl.fromTo('#bm', { y: -80, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: 'back.out(1.6)' }, T.at(8) + 0.55);
late('#who', T.at(8) + 0.4);
card('#s8-card', T.at(8) + 0.3);
late('#s8-lbl', T.at(8) + 0.6);
tl.fromTo('#pill', { scale: 0.6, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: POP }, T.voice(8) + 1.2);
tl.to('#pill', { scale: 0.94, duration: 0.1, ease: 'power2.in' }, T.voice(8) + 1.6);
tl.to('#pill', { scale: 1, duration: 0.25, ease: 'back.out(2)' }, T.voice(8) + 1.7);
['#L1', '#L2', '#L3', '#L4', '#L5'].forEach((id, i) => tl.fromTo(id, { yPercent: -90, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.35, ease: 'back.out(2)' }, say(8, 0.5) + i * T.beat / 2));
bump('#kw', T.end(8) + 0.1, 1.06);
bump('#pill', T.end(8) + 0.7, 1.04);
