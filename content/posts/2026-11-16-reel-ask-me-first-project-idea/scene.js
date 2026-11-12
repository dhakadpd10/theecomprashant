// Prompt reel: make AI ask you first. One idea, one analogy (the doctor who asks before prescribing).
// Moves: fanned duplicate stack + stamp (hook), chat with typing dots + GENERIC slam, doctor's questions,
// 3 numbered questions popping on the sfx, the finished idea card with a 7-day plan, catch checklist, keyword letters dropping in.
const OUT = 'expo.out', POP = 'back.out(1.8)';
const span = (n) => T.end(n) - T.voice(n);
const at = (n, f) => T.voice(n) + f * span(n);
const title = (s, t) => tl.fromTo(s + ' .title .l', { yPercent: 110 }, { yPercent: 0, duration: 0.55, ease: OUT, stagger: 0.08 }, t);
const step = (s, t) => tl.fromTo(s + ' .step', { x: -40, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4, ease: OUT }, t);
const card = (id, t) => tl.fromTo(id, { y: 110, opacity: 0, scale: 0.96 }, { y: 0, opacity: 1, scale: 1, duration: 0.6, ease: OUT }, t);
const late = (id, t) => tl.fromTo(id, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.35, ease: OUT }, t);
const pop = (id, t) => {
  tl.fromTo(id, { scale: 0.4, opacity: 0 }, { scale: 1.1, opacity: 1, duration: 0.2, ease: 'power2.out' }, t);
  tl.to(id, { scale: 1, duration: 0.16, ease: 'power2.inOut' }, t + 0.2);
};
const slide = (id, t, dx = 60) => tl.fromTo(id, { x: dx, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4, ease: OUT }, t);
const shake = (id, t, px = 8) => tl.fromTo(id, { x: 0 }, { x: px, duration: 0.05, repeat: 5, yoyo: true, ease: 'none' }, t);
const slam = (id, t, rot) => tl.fromTo(id, { scale: 2.4, opacity: 0, rotation: rot - 12 }, { scale: 1, opacity: 1, rotation: rot, duration: 0.22, ease: 'power4.in' }, t);

// texture: orbs drift, notebook lines creep down for the whole reel
tl.fromTo('#orb1', { x: 0, y: 0 }, { x: 170, y: -110, duration: T.dur, ease: 'sine.inOut' }, 0);
tl.fromTo('#orb2', { x: 0, y: 0 }, { x: -170, y: -150, duration: T.dur, ease: 'sine.inOut' }, 0);
tl.fromTo('#ruled', { y: 0 }, { y: 70, duration: T.dur, ease: 'none' }, 0);

// progress bar: one segment per line
const BARS = ['#p2', '#p3', '#p4', '#p5', '#p6', '#p7'];
tl.set(BARS, { scaleX: 0 }, 0);
tl.set('#p1', { scaleX: 1 }, 0);
BARS.forEach((id, i) => tl.to(id, { scaleX: 1, duration: 0.5, ease: 'power2.out' }, T.at(i + 1)));

// 0. hook: title and the duplicate stack are on screen at frame 0; SAME slams on the thud
tl.fromTo('#s0-title', { scale: 1.06, transformOrigin: '0% 50%' }, { scale: 1, duration: 0.7, ease: OUT }, 0);
tl.fromTo('#s0-step', { opacity: 0.6 }, { opacity: 1, duration: 0.3, ease: 'power2.out' }, 0);
[['#s0-k1', -6], ['#s0-k2', 3], ['#s0-k3', -2]].forEach(([id, r], i) => tl.fromTo(id, { rotation: r, y: -18 }, { rotation: r, y: 0, duration: 0.5, ease: OUT }, i * 0.05));
slam('#s0-stamp', T.voice(0) + 0.28, -12);
shake('#s0 .stack', T.voice(0) + 0.5, 7);
// "as everyone else": the copies fan out
tl.to('#s0-k1', { rotation: -11, x: -14, y: -8, duration: 0.45, ease: 'power2.inOut' }, T.voice(0) + 2.5);
tl.to('#s0-k2', { rotation: 7, x: 22, y: 6, duration: 0.45, ease: 'power2.inOut' }, T.voice(0) + 2.55);
tl.to('#s0-stamp', { scale: 1.08, duration: 0.15, yoyo: true, repeat: 1, ease: 'sine.inOut' }, T.voice(0) + 2.6);
// "watch this"
tl.fromTo('#s0-l2', { scale: 1, transformOrigin: '0% 50%' }, { scale: 1.05, duration: 0.2, yoyo: true, repeat: 1, ease: 'sine.inOut' }, T.voice(0) + 3.7);

// 1. the vague ask: bubble, typing dots, the generic pile dumps in, GENERIC slams on the word
step('#s1', T.at(1)); title('#s1', T.at(1) + 0.05); card('#s1-card', T.at(1) + 0.15);
tl.fromTo('#s1-ask', { scale: 0.5, opacity: 0, transformOrigin: '100% 100%' }, { scale: 1, opacity: 1, duration: 0.4, ease: POP }, T.voice(1) + 0.45);
tl.fromTo('#s1-dots', { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 0.25, ease: OUT }, T.voice(1) + 0.9);
['#s1-dot1', '#s1-dot2', '#s1-dot3'].forEach((id, i) => tl.fromTo(id, { y: 0 }, { y: -10, duration: 0.15, yoyo: true, repeat: 3, ease: 'sine.inOut' }, T.voice(1) + 1.0 + i * 0.08));
tl.to('#s1-dots', { opacity: 0, duration: 0.15, ease: 'power3.in' }, T.voice(1) + 1.65);
const IDEAS = ['#s1-i1', '#s1-i2', '#s1-i3', '#s1-i4'];
IDEAS.forEach((id, i) => tl.fromTo(id, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: OUT }, T.voice(1) + 1.72 + i * 0.07));
late('#s1-more', T.voice(1) + 2.2);
slam('#s1-stamp', at(1, 0.78) - 0.22, -8);
shake('#s1-card', at(1, 0.78), 9);
tl.to(IDEAS, { opacity: 0.7, duration: 0.3, ease: 'power2.out' }, at(1, 0.78) + 0.3);

// 2. the analogy: empty input gets a guess; a doctor asks three things first
step('#s2', T.at(2)); title('#s2', T.at(2) + 0.05); card('#s2-card', T.at(2) + 0.15);
late('#s2-in', T.at(2) + 0.35);
tl.fromTo('#s2-caret', { opacity: 1 }, { opacity: 0, duration: 0.2, repeat: 5, yoyo: true, ease: 'steps(1)' }, T.at(2) + 0.4);
pop('#s2-guess', at(2, 0.3));
tl.fromTo('#s2-guess', { rotation: 0 }, { rotation: 7, duration: 0.08, repeat: 5, yoyo: true, ease: 'sine.inOut' }, at(2, 0.3) + 0.4);
late('#s2-doc', at(2, 0.48));
['#s2-q1', '#s2-q2', '#s2-q3'].forEach((id, i) => slide(id, at(2, 0.52) + i * 0.08));
const QB = ['#s2-qb1', '#s2-qb2', '#s2-qb3'];
QB.forEach((id, i) => pop(id, at(2, 0.52) + 0.1 + i * 0.08));
QB.forEach((id, i) => tl.to(id, { scale: 1.15, duration: 0.15, yoyo: true, repeat: 1, ease: 'sine.inOut' }, at(2, 0.88) + i * 0.06));

// 3. the fix: three numbered questions land on the three pops, then the student's answers
step('#s3', T.at(3)); title('#s3', T.at(3) + 0.05); card('#s3-card', T.at(3) + 0.15);
late('#s3-head', T.at(3) + 0.5);
[['#s3-a1', '#s3-n1', '#s3-ic1', 1.4], ['#s3-a2', '#s3-n2', '#s3-ic2', 2.0], ['#s3-a3', '#s3-n3', '#s3-ic3', 2.6]].forEach(([row, num, icon, k]) => {
  const t = T.voice(3) + k;
  slide(row, t - 0.25, 60);
  pop(num, t - 0.12);
  late(icon, t + 0.05);
});
tl.fromTo('#s3-reply', { scale: 0.5, opacity: 0, transformOrigin: '100% 100%' }, { scale: 1, opacity: 1, duration: 0.4, ease: POP }, T.voice(3) + 3.2);
late('#s3-note', T.voice(3) + 3.45);

// 4. the result: one idea that fits, FITS slams on the ding, the 7-day plan fills
step('#s4', T.at(4)); title('#s4', T.at(4) + 0.05); card('#s4-card', T.at(4) + 0.1);
late('#s4-k', T.at(4) + 0.3); late('#s4-ex', T.at(4) + 0.35);
tl.fromTo('#s4-name', { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 0.4, ease: 'power3.out' }, T.at(4) + 0.4);
slam('#s4-fits', T.voice(4) + 0.4, 0);
late('#s4-sub', T.voice(4) + 0.7);
['#s4-t1', '#s4-t2', '#s4-t3'].forEach((id, i) => tl.fromTo(id, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.35, ease: OUT }, T.voice(4) + 0.75 + i * 0.07));
late('#s4-plan', T.voice(4) + 0.95);
['#s4-d1', '#s4-d2', '#s4-d3', '#s4-d4'].forEach((id, i) => slide(id, T.voice(4) + 1.05 + i * 0.08, 50));
['#s4-o1', '#s4-o2', '#s4-o3', '#s4-o4', '#s4-o5', '#s4-o6', '#s4-o7'].forEach((id, i) => tl.fromTo(id, { backgroundColor: 'rgb(230, 236, 248)' }, { backgroundColor: 'rgb(46, 91, 186)', duration: 0.15, ease: 'power2.out' }, T.voice(4) + 1.1 + i * 0.06));
tl.to('#s4-card', { scale: 1.03, duration: 0.2, yoyo: true, repeat: 1, ease: 'sine.inOut' }, T.voice(4) + 1.75);

// 5. the catch: rows land, chips pop as each part is said
step('#s5', T.at(5)); title('#s5', T.at(5) + 0.05); card('#s5-card', T.at(5) + 0.15);
['#s5-c1', '#s5-c2', '#s5-c3'].forEach((id, i) => slide(id, T.voice(5) + 0.3 + i * 0.07));
pop('#s5-x1', at(5, 0.28)); shake('#s5-x1', at(5, 0.28) + 0.36, 6);
late('#s5-note', at(5, 0.4));
pop('#s5-x2', at(5, 0.62));
pop('#s5-x3', at(5, 0.85));

// 6. send this: the Friday tile, then the keyword letters drop in on the half beats
tl.fromTo('#send', { yPercent: 40, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.6, ease: OUT }, T.at(6));
late('#who', T.voice(6) + 0.3);
tl.fromTo('#cal', { scale: 0.5, opacity: 0, rotation: -10 }, { scale: 1, opacity: 1, rotation: -4, duration: 0.45, ease: POP }, at(6, 0.38));
tl.fromTo('#pill', { scale: 0.7, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.45, ease: POP }, at(6, 0.58));
['#ka', '#ks', '#kk'].forEach((id, i) => tl.fromTo(id, { y: -140, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: 'back.out(2)' }, at(6, 0.58) + 0.3 + i * T.beat / 2));
late('#free', at(6, 0.58) + 1.4);
tl.to('#pill', { scale: 1.04, duration: 0.35, yoyo: true, repeat: 1, ease: 'sine.inOut' }, T.end(6) + 0.1);
tl.to('#cal', { rotation: 2, duration: 0.4, yoyo: true, repeat: 1, ease: 'sine.inOut' }, T.end(6) + 0.2);
