// Compare: which AI gives a source you can open. Analogy: the neighbour with the newspaper.
// Motion: enters expo.out 0.5 s, pops back.out(1.8), slams power4.in, stagger 0.07 s, labels settle late, orbs drift.
// HONESTY HOLD: the #s4 ranking is an EXAMPLE placeholder until it matches Prashant's real test.
const OUT = 'expo.out', POP = 'back.out(1.8)';
const span = (n) => T.end(n) - T.voice(n);
const at = (n, f) => T.voice(n) + f * span(n);
const title = (s, t) => tl.fromTo(`${s} .title .l`, { yPercent: 110 }, { yPercent: 0, duration: 0.55, ease: OUT, stagger: 0.08 }, t);
const step = (s, t) => tl.fromTo(`${s} .step`, { x: -30, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4, ease: 'power3.out' }, t);
const rise = (id, t, d = 0.55) => tl.fromTo(id, { y: 90, opacity: 0, scale: 0.97 }, { y: 0, opacity: 1, scale: 1, duration: d, ease: OUT }, t);
const late = (id, t) => tl.fromTo(id, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.35, ease: OUT }, t);
const pop = (id, t) => {
  tl.fromTo(id, { scale: 0, opacity: 0 }, { scale: 1.1, opacity: 1, duration: 0.22, ease: 'power2.out' }, t);
  tl.to(id, { scale: 1, duration: 0.16, ease: 'power2.inOut' }, t + 0.22);
};
const bump = (id, t, s = 1.05) => {
  tl.to(id, { scale: 0.96, duration: 0.1, ease: 'power2.in' }, t);
  tl.to(id, { scale: s, duration: 0.18, ease: 'power2.out' }, t + 0.1);
  tl.to(id, { scale: 1, duration: 0.22, ease: 'power2.inOut' }, t + 0.28);
};
const slam = (id, t, rot) => tl.fromTo(id, { scale: 2.4, opacity: 0, rotation: rot - 14 }, { scale: 1, opacity: 1, rotation: rot, duration: 0.24, ease: 'power4.in' }, t);
const shake = (id, t, px = 8) => tl.fromTo(id, { x: 0 }, { x: px, duration: 0.05, repeat: 5, yoyo: true, ease: 'none' }, t);

// texture: soft orbs drift for the whole reel
tl.fromTo('#orb1', { x: 0, y: 0 }, { x: 170, y: -120, duration: T.dur, ease: 'sine.inOut' }, 0);
tl.fromTo('#orb2', { x: 0, y: 0 }, { x: -180, y: -150, duration: T.dur, ease: 'sine.inOut' }, 0);

// progress bar: one segment per step
tl.set(['#p1', '#p2', '#p3', '#p4', '#p5', '#p6', '#p7'], { scaleX: 0 }, 0);
[1, 2, 3, 4, 5, 6, 7].forEach((n) => tl.to(`#p${n}`, { scaleX: 1, duration: 0.5, ease: 'power2.out' }, T.at(n)));

// 0. hook: title on screen at frame 0, punch on the thud, blue squiggle under "rule." as it's said
tl.fromTo('#s0-title .l', { yPercent: 0 }, { yPercent: 0, duration: 0.01 }, 0);
tl.fromTo('#s0-title', { scale: 1 }, { scale: 1.05, duration: 0.12, ease: 'power2.out' }, T.voice(0) + 0.5);
tl.to('#s0-title', { scale: 1, duration: 0.3, ease: 'power2.inOut' }, T.voice(0) + 0.62);
tl.fromTo('#s0-step', { opacity: 1 }, { opacity: 0.55, duration: 0.2, yoyo: true, repeat: 1, ease: 'sine.inOut' }, at(0, 0.45));
tl.fromTo('#s0-ul-p', { strokeDashoffset: 420 }, { strokeDashoffset: 0, duration: 0.55, ease: 'power2.out' }, at(0, 0.84));

// 1. the forward: group header, forwarded tag types in, the bubble pops, shakes on the fee, FAKE? slams
step('#s1', T.at(1)); title('#s1', T.at(1) + 0.05); rise('#s1-card', T.at(1) + 0.15);
late('#s1-head', T.at(1) + 0.4);
tl.fromTo('#s1-fwd', { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 0.5, ease: 'steps(18)' }, T.at(1) + 0.5);
tl.fromTo('#s1-bub', { scale: 0.9, opacity: 0, y: 20 }, { scale: 1, opacity: 1, y: 0, duration: 0.4, ease: POP }, at(1, 0.15));
shake('#s1-bub', at(1, 0.62), 8);
slam('#s1-tag', at(1, 0.8), -8);
late('#s1-note', at(1, 0.86));

// 2. the analogy: three neighbours answer, the one with the newspaper wins
step('#s2', T.at(2)); title('#s2', T.at(2) + 0.05); rise('#s2-card', T.at(2) + 0.15);
['#n1', '#n2', '#n3'].forEach((id, i) => tl.fromTo(id, { x: 60, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4, ease: OUT }, at(2, 0.08 + i * 0.1)));
['#nc1', '#nc2', '#nc3'].forEach((id, i) => pop(id, at(2, 0.08 + i * 0.1) + 0.16));
tl.fromTo('#n3-ring', { opacity: 0 }, { opacity: 1, duration: 0.25, ease: 'power2.out' }, at(2, 0.72));
tl.to(['#n1', '#n2'], { opacity: 0.45, duration: 0.3, ease: 'power2.inOut' }, at(2, 0.72));
bump('#n3', at(2, 0.72), 1.04);
late('#s2-note', at(2, 0.86));

// 3. same forward goes to all three, then the rule bar lands
step('#s3', T.at(3)); title('#s3', T.at(3) + 0.05);
pop('#s3-fw', T.at(3) + 0.2);
tl.fromTo('#s3-lines path', { strokeDashoffset: 340 }, { strokeDashoffset: 0, duration: 0.45, ease: 'power2.out', stagger: 0.06 }, at(3, 0.12));
['#ap1', '#ap2', '#ap3'].forEach((id, i) => rise(id, at(3, 0.2) + i * 0.07, 0.5));
['#mb1', '#mb2', '#mb3'].forEach((id, i) => pop(id, at(3, 0.34) + i * 0.07));
tl.fromTo('#s3-rule', { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: OUT }, at(3, 0.5));
bump('#s3-rule', at(3, 0.88), 1.04);

// 4. the scorecard: rows slide in, the #1 tick draws on the ding, the others stay unsure
step('#s4', T.at(4)); title('#s4', T.at(4) + 0.05); rise('#s4-card', T.at(4) + 0.12, 0.6);
late('#s4-leg', T.at(4) + 0.35); late('#s4-note', T.at(4) + 0.45);
tl.fromTo('#leg-tk', { strokeDashoffset: 50 }, { strokeDashoffset: 0, duration: 0.3, ease: 'power2.out' }, T.at(4) + 0.5);
['#rk1', '#rk2', '#rk3'].forEach((id, i) => tl.fromTo(id, { x: 70, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4, ease: OUT }, T.voice(4) + 0.15 + i * 0.07));
pop('#c1', T.voice(4) + 0.6);
tl.fromTo('#c1-tk', { strokeDashoffset: 44 }, { strokeDashoffset: 0, duration: 0.25, ease: 'power2.out' }, T.voice(4) + 0.66);
tl.to('#lk1', { backgroundColor: '#2B4ACB', color: '#FFFFFF', duration: 0.25, ease: 'power2.out' }, T.voice(4) + 0.66);
tl.fromTo('#rk1-ring', { opacity: 0 }, { opacity: 1, duration: 0.25, ease: 'power2.out' }, T.voice(4) + 0.7);
pop('#c2', T.voice(4) + 0.9); pop('#c3', T.voice(4) + 1.0);
bump('#rk1', T.voice(4) + 0.6 + 2 * T.beat, 1.03);

// 5. the payoff: the #1 answer, its link gets tapped, the real source page opens
step('#s5', T.at(5)); title('#s5', T.at(5) + 0.05); rise('#s5-ans', T.at(5) + 0.12);
tl.fromTo('#s5-txt', { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 0.5, ease: 'steps(20)' }, T.at(5) + 0.35);
pop('#s5-cite', T.voice(5) + 0.1);
tl.fromTo('#s5-tap', { scale: 0.3, opacity: 0.9 }, { scale: 1.4, opacity: 0, duration: 0.45, ease: 'power2.out' }, T.voice(5) + 0.5);
tl.to('#s5-cite', { scale: 0.92, duration: 0.08, ease: 'power2.in' }, T.voice(5) + 0.5);
tl.to('#s5-cite', { scale: 1, duration: 0.2, ease: POP }, T.voice(5) + 0.58);
rise('#s5-page', T.voice(5) + 0.65, 0.6);
late('#s5-url', T.voice(5) + 0.9);
tl.fromTo('#s5-h', { filter: 'blur(12px)', opacity: 0 }, { filter: 'blur(0px)', opacity: 1, duration: 0.45, ease: 'power3.out' }, T.voice(5) + 1.0);
tl.fromTo('#s5-page .pb', { scaleX: 0 }, { scaleX: 1, duration: 0.4, ease: 'power3.out', stagger: 0.07 }, T.voice(5) + 1.15);
pop('#s5-ok', at(5, 0.75));
bump('#s5-page', at(5, 0.75) + T.beat, 1.03);

// 6. the catch: three CHECK rows, the red stamp slams on the buzz
step('#s6', T.at(6)); title('#s6', T.at(6) + 0.05); rise('#s6-card', T.at(6) + 0.15);
['#k1', '#k2', '#k3'].forEach((id, i) => tl.fromTo(id, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.35, ease: OUT }, T.voice(6) + 0.2 + i * T.beat / 2));
['#h1', '#h2', '#h3'].forEach((id, i) => pop(id, T.voice(6) + 0.35 + i * T.beat / 2));
slam('#s6-stamp', T.voice(6) + 0.6, -6);
shake('#s6-card', T.voice(6) + 0.86, 9);

// 7. send this: forward arrow flies in, then the keyword drops in letter by letter
title('#s7', T.at(7));
tl.fromTo('#s7-send .l', { yPercent: 110 }, { yPercent: 0, duration: 0.55, ease: OUT, stagger: 0.08 }, T.at(7));
tl.fromTo('#s7-arrow', { x: -120, opacity: 0, rotation: -15 }, { x: 0, opacity: 1, rotation: 0, duration: 0.6, ease: 'power2.out' }, T.at(7) + 0.25);
late('#s7-who', T.voice(7) + 0.3);
tl.fromTo('#s7-pill', { scale: 0.6, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.45, ease: POP }, at(7, 0.4));
tl.fromTo('#s7-kw .k', { yPercent: -120, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.35, ease: POP, stagger: 0.08 }, at(7, 0.52));
late('#s7-free', at(7, 0.8));
tl.to('#s7-arrow', { x: 24, y: -14, duration: 0.6, yoyo: true, repeat: 1, ease: 'sine.inOut' }, T.end(7));
bump('#s7-pill', T.end(7) + 0.3, 1.04);
