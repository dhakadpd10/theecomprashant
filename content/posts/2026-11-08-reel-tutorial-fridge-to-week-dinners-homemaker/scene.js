// Tutorial: fridge to 7 dinners. Cold open on the finished week, the sabziwala analogy, 3 steps, the full week + shopping list as payoff,
// the catch (spoilage, allergies), a check beat, then the keyword. Enters expo.out, pops back.out, exits power3.in, stagger 0.06 to 0.08 s.
// Every id is written out in full (no ids built from template strings).
const OUT = 'expo.out', POP = 'back.out(1.8)';
const span = (n) => T.end(n) - T.voice(n);
const title = (s, t) => tl.fromTo(s + ' .title .l', { yPercent: 110 }, { yPercent: 0, duration: 0.55, ease: OUT, stagger: 0.08 }, t);
const card = (id, t) => tl.fromTo(id, { y: 110, opacity: 0, scale: 0.96 }, { y: 0, opacity: 1, scale: 1, duration: 0.55, ease: OUT }, t);
const step = (s, t) => tl.fromTo(s + ' .step', { x: -40, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4, ease: OUT }, t);
const late = (id, t) => tl.fromTo(id, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.35, ease: OUT }, t);
const chip = (id, t) => { // anticipation, then the pop
  tl.fromTo(id, { scale: 0, opacity: 0 }, { scale: 1.12, opacity: 1, duration: 0.22, ease: 'power2.out' }, t);
  tl.to(id, { scale: 1, duration: 0.18, ease: 'power2.inOut' }, t + 0.22);
};
const bump = (id, t, s = 1.05) => tl.fromTo(id, { scale: 1 }, { scale: s, duration: 0.15, yoyo: true, repeat: 1, ease: 'sine.inOut' }, t);
const shake = (id, t, px = 8) => tl.fromTo(id, { x: 0 }, { x: px, duration: 0.05, repeat: 5, yoyo: true, ease: 'none' }, t);
const wipe = (id, t, d = 0.4, n = 14) => tl.fromTo(id, { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: d, ease: 'steps(' + n + ')' }, t);

// ambient: two soft orbs drift for the whole reel
tl.fromTo('#orb1', { x: 0, y: 0 }, { x: 160, y: -120, duration: T.dur, ease: 'sine.inOut' }, 0);
tl.fromTo('#orb2', { x: 0, y: 0 }, { x: -180, y: -150, duration: T.dur, ease: 'sine.inOut' }, 0);

// progress bar: one segment per step (lines 2, 3, 4)
tl.set(['#p1', '#p2', '#p3'], { scaleX: 0 }, 0);
tl.to('#p1', { scaleX: 1, duration: 0.5, ease: 'power2.out' }, T.at(2));
tl.to('#p2', { scaleX: 1, duration: 0.5, ease: 'power2.out' }, T.at(3));
tl.to('#p3', { scaleX: 1, duration: 0.5, ease: 'power2.out' }, T.at(4));

// 0. hook: title and the fridge card are on screen at frame 0; the 7 day tiles fill as the voice runs
tl.fromTo('#s0-title .l', { yPercent: 0 }, { yPercent: 0, duration: 0.01 }, 0);
tl.fromTo('#s0-title', { scale: 1.06 }, { scale: 1, duration: 0.7, ease: OUT, transformOrigin: '0% 50%' }, 0);
tl.fromTo('#s0-card', { scale: 1.02 }, { scale: 1, duration: 0.6, ease: OUT }, 0);
bump('#s0-i1', T.voice(0) + 0.4, 1.06);
bump('#s0-i2', T.voice(0) + 0.75, 1.06);
tl.fromTo('#s0-arrow', { y: -6 }, { y: 6, duration: 0.3, yoyo: true, repeat: 5, ease: 'sine.inOut' }, 0.2);
const t0 = T.voice(0) + 0.55, gap = 0.22;
const tiles = ['#s0-t1', '#s0-t2', '#s0-t3', '#s0-t4', '#s0-t5', '#s0-t6', '#s0-t7'];
tiles.forEach((id, i) => {
  const t = t0 + i * gap;
  tl.fromTo(id, { backgroundColor: '#F1EEE8' }, { backgroundColor: '#2D4FC4', duration: 0.2, ease: 'power2.out' }, t);
  tl.fromTo(id + ' .d', { color: '#1E1A16' }, { color: '#FFFFFF', duration: 0.2, ease: 'power2.out' }, t);
  tl.fromTo(id + ' .plate', { opacity: 1 }, { opacity: 0, duration: 0.15, ease: 'power2.out' }, t);
  chip(id + ' .tk', t + 0.04);
});
const c0 = { v: 1 };
tl.fromTo(c0, { v: 1 }, { v: 8, duration: 7 * gap, ease: 'none', onUpdate: () => { document.getElementById('s0-n').textContent = Math.min(7, Math.floor(c0.v)) + '/7'; } }, t0);
bump('#s0-count', t0 + 6 * gap + 0.25, 1.08);

// 1. the analogy: 7 pm, a vague question, a reply full of things you don't have
step('#s1', T.at(1)); title('#s1', T.at(1) + 0.05); card('#s1-card', T.at(1) + 0.15);
chip('#s1-clock', T.voice(1) + 0.1);
tl.fromTo('#s1-hand', { rotation: 0 }, { rotation: 360, duration: span(1), ease: 'power1.inOut' }, T.voice(1));
tl.fromTo('#s1-q', { opacity: 0, y: 30, scale: 0.9 }, { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: POP }, T.voice(1) + 0.18 * span(1));
tl.fromTo('#s1-dots', { opacity: 0, scale: 0.6 }, { opacity: 1, scale: 1, duration: 0.3, ease: POP }, T.voice(1) + 0.32 * span(1));
['#s1-d1', '#s1-d2', '#s1-d3'].forEach((id, i) => tl.fromTo(id, { y: 0 }, { y: -10, duration: 0.25, yoyo: true, repeat: 3, ease: 'sine.inOut' }, T.voice(1) + 0.32 * span(1) + 0.1 + i * 0.08));
tl.to('#s1-dots', { opacity: 0, scale: 0.8, duration: 0.2, ease: 'power3.in' }, T.voice(1) + 0.53 * span(1));
tl.fromTo('#s1-a', { opacity: 0, y: 40, scale: 0.95 }, { opacity: 1, y: 0, scale: 1, duration: 0.45, ease: OUT }, T.voice(1) + 0.55 * span(1));
['#ar1', '#ar2', '#ar3'].forEach((id, i) => tl.fromTo(id, { x: 50, opacity: 0 }, { x: 0, opacity: 1, duration: 0.35, ease: OUT }, T.voice(1) + 0.58 * span(1) + i * 0.07));
['#m1', '#m2', '#m3'].forEach((id, i) => chip(id, T.voice(1) + 0.74 * span(1) + i * 0.12));
shake('#s1-a', T.voice(1) + 0.88 * span(1), 8);
late('#s1-note', T.voice(1) + 0.8 * span(1));

// 2. step 1: the fridge comes into frame, the camera snaps, or you type the list
step('#s2', T.at(2)); title('#s2', T.at(2) + 0.05); card('#s2-card', T.at(2) + 0.1);
['#vf-cab', '#vf-eggs', '#vf-on', '#vf-rice', '#vf-dal', '#vf-atta'].forEach((id, i) => tl.fromTo(id, { scale: 0.6, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.35, ease: POP }, T.at(2) + 0.3 + i * 0.05));
['#cn1', '#cn2', '#cn3', '#cn4'].forEach((id) => tl.fromTo(id, { scale: 1.5, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.3, ease: 'power3.out' }, T.voice(2) + 0.3));
tl.fromTo('#vf-flash', { opacity: 0 }, { opacity: 0.85, duration: 0.06, ease: 'power2.out' }, T.voice(2) + 0.6);
tl.to('#vf-flash', { opacity: 0, duration: 0.3, ease: 'power2.out' }, T.voice(2) + 0.66);
late('#s2-or', T.voice(2) + 0.45 * span(2));
wipe('#s2-l1', T.voice(2) + 0.5 * span(2), 0.4, 18);
wipe('#s2-l2', T.voice(2) + 0.5 * span(2) + 0.42, 0.45, 24);
late('#s2-note', T.voice(2) + 0.85 * span(2));

// 3. step 2 (full width): photo attached, the prompt types in, the key line lights up, Send presses on the pop
step('#s3', T.at(3)); title('#s3', T.at(3) + 0.05); card('#s3-card', T.at(3) + 0.12); late('#s3-head', T.at(3) + 0.4);
chip('#s3-att', T.at(3) + 0.35);
['#s3-l1', '#s3-l2', '#s3-l3', '#s3-l4'].forEach((id, i) => wipe(id, T.voice(3) + 0.1 + i * 0.18, 0.3, 12));
chip('#s3-go', T.at(3) + 0.5);
tl.to('#s3-go', { scale: 0.9, duration: 0.1, ease: 'power2.in' }, T.voice(3) + 0.9);
tl.to('#s3-go', { scale: 1, duration: 0.3, ease: POP }, T.voice(3) + 1.0);
tl.fromTo('#s3-l2', { backgroundColor: 'rgba(45,79,196,0)' }, { backgroundColor: 'rgba(45,79,196,0.12)', duration: 0.3, ease: 'power2.out' }, T.voice(3) + 0.6 * span(3));
late('#s3-note', T.voice(3) + 0.75 * span(3));

// 4. step 3, the payoff: the week fills row by row, then the 5-item shopping list
const week = ['#w1', '#w2', '#w3', '#w4', '#w5', '#w6', '#w7'];
step('#s4', T.at(4)); title('#s4', T.at(4) + 0.05); card('#s4-week', T.at(4) + 0.1);
week.forEach((id, i) => tl.fromTo(id, { x: 50, opacity: 0 }, { x: 0, opacity: 1, duration: 0.35, ease: OUT }, T.voice(4) + 0.05 + i * 0.06));
tl.set('#s4-week .tk', { scale: 0, opacity: 0 }, 0);
card('#s4-shop', T.voice(4) + 0.5 * span(4));
tl.fromTo('#s4-chips .sc', { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.35, ease: POP, stagger: 0.07 }, T.voice(4) + 0.62 * span(4));

// 5. exact list in, real dinners out: every day ticks green, the week card lands (cooker whistles)
week.forEach((id, i) => {
  const t = T.voice(5) + 0.1 + i * 0.07;
  chip(id + ' .tk', t);
  tl.fromTo(id + ' .dc', { backgroundColor: '#2D4FC4' }, { backgroundColor: '#2E7D4F', duration: 0.2, ease: 'power2.out' }, t);
});
bump('#s4-week', T.voice(5) + 0.6 * span(5), 1.03);
bump('#s4-shop', T.voice(5) + 0.75 * span(5), 1.03);

// 6. the catch: it can't see the brown spots, and it doesn't know your allergies
step('#s6', T.at(6)); title('#s6', T.at(6) + 0.05); card('#s6-card', T.at(6) + 0.12);
tl.fromTo('#s6-cab', { scale: 0.6, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: POP }, T.at(6) + 0.4);
tl.fromTo('#s6-eye', { scale: 0.6, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: POP }, T.at(6) + 0.48);
tl.fromTo('#s6-slash', { strokeDashoffset: 170 }, { strokeDashoffset: 0, duration: 0.3, ease: 'power3.in' }, T.voice(6) + 0.22 * span(6));
tl.fromTo('#k1', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.35, ease: OUT }, T.voice(6) + 0.3 * span(6));
chip('#h1', T.voice(6) + 0.45 * span(6));
tl.fromTo('#k2', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.35, ease: OUT }, T.voice(6) + 0.6 * span(6));
chip('#h2', T.voice(6) + 0.76 * span(6));
late('#s6-note', T.voice(6) + 0.85 * span(6));

// 7. check: two rows pass, the paneer row gets struck out on the buzz
step('#s7', T.at(7)); title('#s7', T.at(7) + 0.05); card('#s7-card', T.at(7) + 0.1); late('#s7-lbl', T.at(7) + 0.4);
['#cr1', '#cr2', '#cr3'].forEach((id, i) => tl.fromTo(id, { x: 50, opacity: 0 }, { x: 0, opacity: 1, duration: 0.35, ease: OUT }, T.at(7) + 0.2 + i * 0.07));
chip('#g1', T.voice(7) + 0.15); chip('#g3', T.voice(7) + 0.27);
chip('#g2', T.voice(7) + 0.42);
tl.fromTo('#s7-strike', { scaleX: 0 }, { scaleX: 1, duration: 0.25, ease: 'power3.in' }, T.voice(7) + 0.5);
shake('#cr2', T.voice(7) + 0.75, 9);

// 8. send this, then the keyword letters drop in big
tl.fromTo('#s8-send .l', { yPercent: 110 }, { yPercent: 0, duration: 0.55, ease: OUT }, T.at(8));
tl.fromTo('#s8-plane', { x: -200, opacity: 0, rotation: -20 }, { x: 0, opacity: 1, rotation: 0, duration: 0.7, ease: 'power2.out' }, T.at(8) + 0.25);
tl.fromTo('#s8-plane', { y: 120 }, { y: 0, duration: 0.7, ease: 'back.out(2)' }, T.at(8) + 0.25);
late('#s8-who', T.voice(8) + 0.3);
tl.fromTo('#s8-pill', { scale: 0.7, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.45, ease: POP }, T.voice(8) + 0.5 * span(8));
tl.fromTo('#s8-kw .k', { y: -90, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: POP, stagger: 0.06 }, T.voice(8) + 0.72 * span(8));
bump('#s8-pill', T.voice(8) + 0.72 * span(8) + 0.75, 1.04);
late('#s8-free', T.voice(8) + 0.72 * span(8) + 0.5);
tl.to('#s8-plane', { x: 24, y: -18, duration: 0.8, yoyo: true, repeat: 1, ease: 'sine.inOut' }, T.end(8));
