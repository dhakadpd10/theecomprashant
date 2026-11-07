// Pair 1 B, money list on the general opener. One list card fills slot by slot. Way 3 (the shop near you) gets the
// full-width shop, then the payoff: the finished AI reel sent in a chat, asking their price. No pay rates on screen.
const OUT = 'expo.out', POP = 'back.out(1.8)';
const span = (n) => T.end(n) - T.voice(n);
const sayAt = (n, f) => T.voice(n) + f * span(n);
const title = (s, t) => tl.fromTo(`${s} .title .l`, { yPercent: 110 }, { yPercent: 0, duration: 0.55, ease: OUT, stagger: 0.08 }, t);
const card = (id, t) => tl.fromTo(id, { y: 110, opacity: 0, scale: 0.96 }, { y: 0, opacity: 1, scale: 1, duration: 0.55, ease: OUT }, t);
const step = (id, t) => tl.fromTo(id, { x: -40, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4, ease: OUT }, t);
const late = (id, t) => tl.fromTo(id, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.35, ease: OUT }, t);
const pop = (id, t) => {
  tl.fromTo(id, { scale: 0, opacity: 0 }, { scale: 1.12, opacity: 1, duration: 0.22, ease: 'power2.out' }, t);
  tl.to(id, { scale: 1, duration: 0.18, ease: 'power2.inOut' }, t + 0.22);
};
const fill = (id, t) => tl.fromTo(id, { x: 50, opacity: 0 }, { x: 0, opacity: 1, duration: 0.45, ease: OUT }, t);
const shake = (id, t, px = 8) => tl.fromTo(id, { x: 0 }, { x: px, duration: 0.05, repeat: 5, yoyo: true, ease: 'none' }, t);

// texture: two soft orbs drift for the whole reel
tl.fromTo('#orb1', { x: 0, y: 0 }, { x: 170, y: -110, duration: T.dur, ease: 'sine.inOut' }, 0);
tl.fromTo('#orb2', { x: 0, y: 0 }, { x: -190, y: -150, duration: T.dur, ease: 'sine.inOut' }, 0);

// progress bar: one segment per way, filling as each way is said
tl.set(['#p1', '#p2', '#p3', '#p4'], { scaleX: 0 }, 0);
tl.to('#p1', { scaleX: 1, duration: 0.5, ease: 'power2.out' }, T.voice(2) + 0.2);
tl.to('#p2', { scaleX: 1, duration: 0.5, ease: 'power2.out' }, T.voice(3) + 0.2);
tl.to('#p3', { scaleX: 1, duration: 0.5, ease: 'power2.out' }, T.voice(4) + 0.9);
tl.to('#p4', { scaleX: 1, duration: 0.5, ease: 'power2.out' }, T.voice(6) + 0.2);

// 0. hook: title and #3 badge on screen at frame 0; badge bumps on the thud, spins on "number three"
tl.fromTo('#s0-title .l', { yPercent: 0 }, { yPercent: 0, duration: 0.01 }, 0);
tl.fromTo('#s0-title', { scale: 1.06 }, { scale: 1, duration: 0.7, ease: OUT }, 0);
tl.fromTo('#s0-step', { opacity: 0.7 }, { opacity: 1, duration: 0.3, ease: 'power2.out' }, 0);
tl.fromTo('#s0-badge', { scale: 1, rotation: -8 }, { scale: 1.18, rotation: -8, duration: 0.12, ease: 'power2.out' }, T.voice(0) + 0.5);
tl.to('#s0-badge', { scale: 1, duration: 0.3, ease: 'back.out(2)' }, T.voice(0) + 0.62);
tl.to('#s0-badge', { rotation: 352, duration: 0.6, ease: 'power3.inOut' }, sayAt(0, 0.6));
tl.to('#s0-badge', { scale: 1.1, duration: 0.15, yoyo: true, repeat: 1, ease: 'sine.inOut' }, sayAt(0, 0.6) + 0.6);

// 1. you use AI daily (example screen time), and it pays you nothing yet
step('#s1-k', T.at(1)); title('#s1', T.at(1) + 0.05); card('#s1-card', T.at(1) + 0.12);
late('#s1-h', T.at(1) + 0.35); late('#s1-ex', T.at(1) + 0.42);
['#s1-u1', '#s1-u2', '#s1-u3'].forEach((id, i) => tl.fromTo(id, { x: 50, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4, ease: OUT }, T.at(1) + 0.3 + i * 0.07));
tl.fromTo('#s1-f1', { scaleX: 0 }, { scaleX: 1, duration: 0.6, ease: 'power3.out' }, T.at(1) + 0.45);
tl.fromTo('#s1-f2', { scaleX: 0 }, { scaleX: 1, duration: 0.6, ease: 'power3.out' }, T.at(1) + 0.52);
pop('#s1-zero', sayAt(1, 0.62));
shake('#s1-u3', sayAt(1, 0.62) + 0.4, 6);

// 2. the list card: Fiverr fills on the pop, tints, the dollar coin lands on "dollars"
step('#s2-k1', T.at(2)); title('#s2', T.at(2) + 0.05); card('#s2-card', T.at(2) + 0.12);
fill('#s2-f1', T.voice(2) + 0.2); pop('#s2-n1', T.voice(2) + 0.3);
tl.fromTo('#s2-f1', { backgroundColor: '#F6F2EA' }, { backgroundColor: '#E2F0E7', duration: 0.3, ease: 'power2.out' }, sayAt(2, 0.4));
pop('#s2-coin', sayAt(2, 0.85));
tl.set('#s2-coin', { opacity: 0 }, 0);
// way 2: kicker swaps, Internshala fills, then the empty #3 slot teases
tl.to('#s2-k1', { opacity: 0, duration: 0.2, ease: 'power3.in' }, T.at(3));
step('#s2-k2', T.at(3) + 0.1);
tl.to('#s2-f1', { backgroundColor: '#F6F2EA', duration: 0.3, ease: 'power2.inOut' }, T.voice(3));
fill('#s2-f2', T.voice(3) + 0.2); pop('#s2-n2', T.voice(3) + 0.3);
tl.fromTo('#s2-r3', { scale: 1 }, { scale: 1.04, duration: 0.2, yoyo: true, repeat: 3, ease: 'sine.inOut' }, T.end(3) - 0.6);

// 4. the shop near your house: awning drops, sign swings, shelves stock up, stamp slams on "nobody"
step('#s4-k', T.at(4)); title('#s4', T.at(4) + 0.05); card('#s4-card', T.at(4) + 0.12);
tl.fromTo('#s4-awn', { scaleY: 0 }, { scaleY: 1, duration: 0.4, ease: 'power3.out' }, T.at(4) + 0.3);
tl.fromTo('#s4-sign', { rotation: -8, opacity: 0 }, { rotation: 0, opacity: 1, duration: 0.5, ease: 'back.out(2)' }, T.at(4) + 0.42);
tl.fromTo('#s4 .pr', { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.3, ease: POP, stagger: 0.03 }, T.at(4) + 0.5);
tl.fromTo('#s4-jar', { y: -30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.35, ease: OUT }, T.at(4) + 0.6);
tl.fromTo('#s4-stamp', { scale: 2.4, opacity: 0, rotation: -22 }, { scale: 1, opacity: 1, rotation: -8, duration: 0.22, ease: 'power4.in' }, T.voice(4) + 0.9);
shake('#s4-card', T.voice(4) + 1.12, 9);
tl.fromTo('#s4-pin', { y: -60, opacity: 0 }, { y: 0, opacity: 1, duration: 0.45, ease: 'back.out(2.2)' }, sayAt(4, 0.68));
late('#s4-near', sayAt(4, 0.72));
tl.fromTo('#s4-walk', { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 0.5, ease: 'power2.inOut' }, sayAt(4, 0.76));
pop('#s4-home', sayAt(4, 0.9));

// 5. the payoff: the finished AI reel lands in the chat, then the price question, then they start typing
step('#s5-k', T.at(5)); title('#s5', T.at(5) + 0.05); card('#s5-card', T.at(5) + 0.12);
late('#s5-ex', T.at(5) + 0.5);
tl.fromTo('#s5-b1', { y: 40, opacity: 0, scale: 0.85 }, { y: 0, opacity: 1, scale: 1, duration: 0.45, ease: POP }, sayAt(5, 0.12));
pop('#s5-tag', sayAt(5, 0.12) + 0.3);
tl.fromTo('#s5-play', { scale: 1 }, { scale: 1.15, duration: T.beat / 2, yoyo: true, repeat: 3, ease: 'sine.inOut' }, sayAt(5, 0.12) + 0.5);
tl.fromTo('#s5-b2', { y: 30, opacity: 0, scale: 0.85 }, { y: 0, opacity: 1, scale: 1, duration: 0.4, ease: POP }, sayAt(5, 0.55));
tl.fromTo('#s5-typ', { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.35, ease: POP }, sayAt(5, 0.76));
tl.fromTo('#s5 .dt', { y: 0 }, { y: -10, duration: 0.2, yoyo: true, repeat: 5, ease: 'sine.inOut', stagger: 0.08 }, sayAt(5, 0.76) + 0.25);

// 6. the full list: way 3 starred, Outlier fills slot 4, the whole card bumps as complete
step('#s6-k', T.at(6)); title('#s6', T.at(6) + 0.05); card('#s6-card', T.at(6) + 0.12);
fill('#s6-f4', T.voice(6) + 0.2); pop('#s6-n4', T.voice(6) + 0.3);
tl.fromTo('#s6-star', { scale: 0, rotation: -90 }, { scale: 1, rotation: 0, duration: 0.45, ease: POP }, T.at(6) + 0.5);
tl.to('#s6-card', { scale: 1.03, duration: 0.15, yoyo: true, repeat: 1, ease: 'sine.inOut' }, sayAt(6, 0.75));

// 7. the catch: three rows land as they are said, icons pop
step('#s7-k', T.at(7)); title('#s7', T.at(7) + 0.05); card('#s7-card', T.at(7) + 0.12);
[['#s7-r1', '#s7-i1', T.voice(7) + 0.15], ['#s7-r2', '#s7-i2', sayAt(7, 0.45)], ['#s7-r3', '#s7-i3', sayAt(7, 0.75)]].forEach(([r, ic, t]) => {
  tl.fromTo(r, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.35, ease: OUT }, t);
  pop(ic, t + 0.15);
});
shake('#s7-r3', sayAt(7, 0.75) + 0.45, 6);

// 8. send this, then the keyword letters drop in on the beat
tl.fromTo('#s8-send', { yPercent: 40, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.6, ease: OUT }, T.at(8));
late('#s8-who', T.voice(8) + 0.3);
tl.fromTo('#s8-pill', { scale: 0.6, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.45, ease: POP }, sayAt(8, 0.55));
late('#s8-c', sayAt(8, 0.55) + 0.2);
tl.fromTo('#s8 .ltr', { yPercent: -60, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.4, ease: 'back.out(1.6)', stagger: T.beat / 4 }, sayAt(8, 0.72));
tl.fromTo('#s8-stk', { scale: 0, opacity: 0, rotation: -12 }, { scale: 1, opacity: 1, rotation: -3, duration: 0.4, ease: POP }, T.end(8) + 0.1);
late('#s8-save', T.end(8) + 0.35);
tl.to('#s8-pill', { scale: 1.05, duration: 0.3, yoyo: true, repeat: 1, ease: 'sine.inOut' }, T.end(8) + 0.6);
