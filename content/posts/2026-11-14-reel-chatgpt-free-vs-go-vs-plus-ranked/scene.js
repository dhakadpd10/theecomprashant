// Compare: Free vs Go vs Plus, ranked. Analogy: recharge packs. Hook on screen at frame 0,
// three rows fill their slots on the three plan lines, the ranked pick lands full width, the rule as a 4-week check,
// the catch as a plan page with CHECK chips and a stamp, then send + RENEW + the free card.
const OUT = 'expo.out', POP = 'back.out(1.8)';
const span = (n) => T.end(n) - T.voice(n);
const at = (n, f) => T.voice(n) + f * span(n);
const title = (s, t) => tl.fromTo(`${s} .title .l`, { yPercent: 110 }, { yPercent: 0, duration: 0.55, ease: OUT, stagger: 0.08 }, t);
const card = (id, t) => tl.fromTo(id, { y: 110, opacity: 0, scale: 0.96 }, { y: 0, opacity: 1, scale: 1, duration: 0.55, ease: OUT }, t);
const step = (s, t) => tl.fromTo(`${s} .step`, { x: -40, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4, ease: OUT }, t);
const late = (id, t) => tl.fromTo(id, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.35, ease: OUT }, t);
const slide = (id, t) => tl.fromTo(id, { x: 60, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4, ease: OUT }, t);
const chip = (id, t) => {
  tl.fromTo(id, { scale: 0, opacity: 0 }, { scale: 1.12, opacity: 1, duration: 0.22, ease: 'power2.out' }, t);
  tl.to(id, { scale: 1, duration: 0.18, ease: 'power2.inOut' }, t + 0.22);
};
const bar = (sel, t, d = 0.6) => tl.fromTo(sel, { scaleX: 0 }, { scaleX: 1, duration: d, ease: 'power3.out' }, t);
const shake = (id, t, px = 8) => tl.fromTo(id, { x: 0 }, { x: px, duration: 0.05, repeat: 5, yoyo: true, ease: 'none' }, t);
const bump = (id, t, s = 1.05) => tl.fromTo(id, { scale: 1 }, { scale: s, duration: 0.15, yoyo: true, repeat: 1, ease: 'sine.inOut' }, t);

// ambient: two soft orbs drift the whole reel
tl.fromTo('#orb1', { x: 0, y: 0 }, { x: 160, y: -120, duration: T.dur, ease: 'sine.inOut' }, 0);
tl.fromTo('#orb2', { x: 0, y: 0 }, { x: -180, y: -150, duration: T.dur, ease: 'sine.inOut' }, 0);

// progress bar: one segment per line after the hook
tl.set(['#p1', '#p2', '#p3', '#p4', '#p5', '#p6', '#p7', '#p8'], { scaleX: 0 }, 0);
[1, 2, 3, 4, 5, 6, 7, 8].forEach((n) => tl.to(`#p${n}`, { scaleX: 1, duration: 0.5, ease: 'power2.out' }, T.at(n)));

// 0. hook: title already on screen, punch on the thud, underline draws under "Plus?"
tl.fromTo('#s0-title', { scale: 1.06 }, { scale: 1, duration: 0.42, ease: OUT }, 0);
tl.to('#s0-title', { scale: 1.035, duration: 0.12, yoyo: true, repeat: 1, ease: 'power2.out' }, T.voice(0) + 0.4);
tl.fromTo('#s0-ul-p', { strokeDashoffset: 420 }, { strokeDashoffset: 0, duration: 0.55, ease: 'power2.out' }, T.voice(0) + 1.0);
tl.fromTo('#s0-hl', { scaleX: 0 }, { scaleX: 1, duration: 0.45, ease: 'power3.out' }, at(0, 0.7));

// 1. analogy: a big pack, a little used, the rest wasted
step('#s1', T.at(1)); title('#s1', T.at(1) + 0.05); card('#s1-card', T.at(1) + 0.12);
late('#s1-lbl', T.at(1) + 0.45); late('#s1-pack', T.at(1) + 0.5);
bar('#s1-used', at(1, 0.2), 0.6);
tl.fromTo('#s1-unused', { clipPath: 'inset(0 100% 0 0)', opacity: 0.4 }, { clipPath: 'inset(0 0% 0 0)', opacity: 1, duration: 0.5, ease: 'power3.out' }, at(1, 0.42));
slide('#s1-r1', at(1, 0.5)); slide('#s1-r2', at(1, 0.6));
chip('#s1-c1', at(1, 0.58)); chip('#s1-c2', at(1, 0.72));
shake('#s1-r2', at(1, 0.72) + 0.42, 7);
late('#s1-note', at(1, 0.85));

// 2. head to head: each plan fills its slot as it is said, limit meter grows, price chip pops
step('#s2', T.at(2)); title('#s2', T.at(2) + 0.05); card('#s2-card', T.at(2) + 0.12);
[['#s2-f', 2], ['#s2-g', 3], ['#s2-p', 4]].forEach(([id, n]) => {
  slide(id, n === 2 ? T.voice(2) + 0.2 : T.voice(n) - 0.05);
  bar(`${id} .meter i`, at(n, 0.35), 0.6);
  chip(`${id} .chip`, at(n, 0.62));
});
bump('#s2-p', at(4, 0.62) + 0.45, 1.04);
late('#s2-note', at(4, 0.85));

// 3. the pick: full-width ranked card, OUR PICK pops on the pop sound
step('#s3', T.at(5)); title('#s3', T.at(5) + 0.03); card('#s3-card', T.at(5) + 0.08);
['#s3-r1', '#s3-r2', '#s3-r3'].forEach((id, i) => slide(id, T.at(5) + 0.25 + i * 0.07));
chip('#s3-badge', T.voice(5) + 0.5);
bump('#s3-r1', T.voice(5) + 0.75, 1.04);
late('#s3-note', T.voice(5) + 0.9);

// 4. the rule (payoff, cooker whistles): four example weeks, then the verdict row lights up
step('#s4', T.at(6)); title('#s4', T.at(6) + 0.05); card('#s4-card', T.at(6) + 0.12);
late('#s4-lbl', T.at(6) + 0.4);
['#s4-w1', '#s4-w2', '#s4-w3', '#s4-w4'].forEach((id, i) => tl.fromTo(id, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.35, ease: OUT }, T.at(6) + 0.35 + i * 0.06));
['#s4-h1', '#s4-h2', '#s4-h3', '#s4-h4'].forEach((id, i) => chip(id, T.voice(6) + 0.25 + i * T.beat / 2));
slide('#s4-d1', T.voice(6) + 1.2); slide('#s4-d2', T.voice(6) + 1.32);
chip('#s4-c1', T.voice(6) + 1.4); chip('#s4-c2', T.voice(6) + 1.52);
tl.fromTo('#s4-d2', { backgroundColor: '#F6F3EE' }, { backgroundColor: '#E3F1E8', duration: 0.25, ease: 'power2.out' }, T.voice(6) + 1.78);
bump('#s4-d2', T.voice(6) + 1.78);
late('#s4-note', T.voice(6) + 1.85);

// 5. the catch: the plan page refreshes, three CHECK chips, then the stamp slams
step('#s5', T.at(7)); title('#s5', T.at(7) + 0.05); card('#s5-card', T.at(7) + 0.12);
tl.fromTo('#s5-ref', { rotation: 0 }, { rotation: 360, duration: 0.9, ease: 'power2.inOut' }, T.voice(7) + 0.3);
['#s5-k1', '#s5-k2', '#s5-k3'].forEach((id, i) => slide(id, T.voice(7) + 0.5 + i * 0.07));
['#s5-h1', '#s5-h2', '#s5-h3'].forEach((id, i) => chip(id, at(7, 0.35 + i * 0.12)));
tl.fromTo('#s5-ref', { rotation: 0 }, { rotation: 360, duration: 0.8, ease: 'power2.inOut' }, at(7, 0.62));
tl.fromTo('#s5-stamp', { scale: 2.2, opacity: 0, rotation: -18 }, { scale: 1, opacity: 1, rotation: -7, duration: 0.22, ease: 'power4.in' }, at(7, 0.75));
shake('#s5-card', at(7, 0.75) + 0.22, 8);

// 6. send this, the keyword drops in on the ding, then the free card it unlocks
tl.fromTo('#s6-send', { yPercent: 40, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.55, ease: OUT }, T.at(8));
tl.fromTo('#s6-plane', { x: -200, opacity: 0, rotation: -20 }, { x: 0, opacity: 1, rotation: 0, duration: 0.7, ease: 'power2.out' }, T.at(8) + 0.25);
tl.fromTo('#s6-plane', { y: 120 }, { y: 0, duration: 0.7, ease: 'back.out(2)' }, T.at(8) + 0.25);
late('#s6-who', T.voice(8) + 0.3);
tl.fromTo('#s6-pill', { scale: 0.7, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.45, ease: POP }, T.voice(8) + 1.1);
late('#s6-cmt', T.voice(8) + 1.3);
tl.fromTo('#s6-word .k', { y: -90, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: 'back.out(2)', stagger: 0.06 }, T.voice(8) + 1.4);
card('#s6-card', T.voice(8) + 1.95);
late('#s6-lbl', T.voice(8) + 2.2); late('#s6-q', T.voice(8) + 2.25);
['#s6-t1', '#s6-t2', '#s6-t3', '#s6-t4'].forEach((id, i) => chip(id, T.voice(8) + 2.4 + i * 0.07));
late('#s6-note', T.voice(8) + 2.8);
bump('#s6-word', T.end(8) - 0.3, 1.06);
tl.to('#s6-plane', { x: 24, y: -18, duration: 0.6, yoyo: true, repeat: 1, ease: 'sine.inOut' }, T.end(8));
