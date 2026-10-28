// Editorial COD reel: the "confirmed" message gets struck out, then 3 steps, the cancel-vs-refusal math, the catch, and RTO.
const OUT = 'expo.out', POP = 'back.out(1.8)';
const span = (n) => T.end(n) - T.voice(n);
const at = (n, f) => T.voice(n) + f * span(n);
const title = (s, t) => tl.fromTo(`${s} .title .l`, { yPercent: 110 }, { yPercent: 0, duration: 0.55, ease: OUT, stagger: 0.09 }, t);
const card = (id, t) => tl.fromTo(id, { y: 120, opacity: 0, scale: 0.96 }, { y: 0, opacity: 1, scale: 1, duration: 0.6, ease: OUT }, t);
const lab = (s, t) => tl.fromTo(`${s} .lab`, { x: -40, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4, ease: OUT }, t);
const slam = (id, t) => tl.fromTo(id, { scale: 1.8, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.25, ease: 'power4.in' }, t);
const shake = (id, t) => tl.fromTo(id, { x: 0 }, { x: 8, duration: 0.05, repeat: 5, yoyo: true, ease: 'none' }, t);
const bump = (id, t) => tl.fromTo(id, { scale: 1 }, { scale: 1.05, duration: 0.15, yoyo: true, repeat: 1, ease: 'sine.inOut' }, t);

// texture: two soft blobs drift across the whole reel
tl.fromTo('#blob1', { x: 0, y: 0 }, { x: 260, y: 180, duration: T.dur, ease: 'sine.inOut' }, 0);
tl.fromTo('#blob2', { x: 0, y: 0 }, { x: -240, y: -260, duration: T.dur, ease: 'sine.inOut' }, 0);

// progress bar: one segment per step
tl.set(['#p1', '#p2', '#p3'], { scaleX: 0 }, 0);
[3, 4, 5].forEach((n, i) => tl.to(`#p${i + 1}`, { scaleX: 1, duration: 0.5, ease: 'power2.out' }, T.at(n)));

// 0. hook: title and the "confirmed" bubble are on screen at frame 0; the strike lands on the thud
tl.fromTo('#s0-title .l', { yPercent: 0 }, { yPercent: 0, duration: 0.01 }, 0);
tl.fromTo('#s0-title', { scale: 1.05 }, { scale: 1, duration: 0.6, ease: OUT }, 0);
tl.fromTo('#s0-ticks', { opacity: 0.35 }, { opacity: 1, duration: 0.4, ease: 'power2.out' }, 0.3);
tl.fromTo('#s0-strike', { scaleX: 0 }, { scaleX: 1, duration: 0.25, ease: 'power4.in' }, T.voice(0) + 1.35);
shake('#s0-msg', T.voice(0) + 1.6);
tl.fromTo('#s0-msg', { opacity: 1 }, { opacity: 0.55, duration: 0.3, ease: 'power2.out' }, T.voice(0) + 1.9);
tl.fromTo('#s0-q', { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.45, ease: POP }, at(0, 0.62));
bump('#s0-q', at(0, 0.62) + 0.6);

// 1. example: 40 COD orders sent, 0 replies, parcels refused
lab('#s1', T.at(1)); title('#s1', T.at(1) + 0.05); card('#s1-card', T.at(1) + 0.15);
const sent = { v: 0 };
tl.fromTo(sent, { v: 0 }, { v: 40, duration: 1.1, ease: 'power2.out', onUpdate: () => { document.getElementById('s1-sent').textContent = String(Math.round(sent.v)); } }, T.voice(1) + 0.5);
tl.fromTo('#st2', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.4, ease: OUT }, at(1, 0.42));
shake('#s1-rep', at(1, 0.5));
['#o1', '#o2', '#o3'].forEach((id, i) => tl.fromTo(id, { x: 60, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4, ease: OUT }, at(1, 0.6) + i * 0.07));
['#r1', '#r2', '#r3'].forEach((id, i) => slam(id, at(1, 0.72) + i * 0.18));
tl.fromTo('#s1-tag', { opacity: 0 }, { opacity: 1, duration: 0.3, ease: 'power2.out' }, T.voice(1) + 0.4);

// 2. the message asks nothing; tell Claude to ask one question
title('#s2', T.at(2) + 0.05); card('#s2-card', T.at(2) + 0.15);
tl.fromTo('#s2-slot', { scale: 0.9, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: OUT }, T.voice(2) + 0.45);
shake('#s2-slot', T.voice(2) + 0.9);
tl.fromTo('#s2-ask', { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.45, ease: OUT }, at(2, 0.48));
tl.fromTo('#s2-type', { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 0.6, ease: 'steps(19)' }, at(2, 0.55));
tl.fromTo('#s2-go', { scale: 1 }, { scale: 0.86, duration: 0.12, yoyo: true, repeat: 1, ease: 'power2.inOut' }, at(2, 0.88));

// 3. step 1: the kit pops in (pop sfx), then the order details type in
lab('#s3', T.at(3)); title('#s3', T.at(3) + 0.05); card('#s3-card', T.at(3) + 0.15);
tl.fromTo('#s3-kit', { scale: 0.6, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: POP }, T.voice(3) + 0.38);
['#f1', '#f2', '#f3', '#f4'].forEach((id, i) => tl.fromTo(id, { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 0.42, ease: 'steps(14)' }, T.voice(3) + 1.0 + i * 0.45));
tl.fromTo('#s3-tag', { opacity: 0 }, { opacity: 1, duration: 0.3, ease: 'power2.out' }, at(3, 0.85));

// 4. step 2: the message, then options 1, 2, 3 as they are said
lab('#s4', T.at(4)); title('#s4', T.at(4) + 0.05); card('#s4-card', T.at(4) + 0.15);
tl.fromTo('#s4-msg', { y: 30, opacity: 0, scale: 0.92 }, { y: 0, opacity: 1, scale: 1, duration: 0.4, ease: POP }, T.voice(4) + 0.3);
[['#q1', '#n1', 0.3], ['#q2', '#n2', 0.52], ['#q3', '#n3', 0.78]].forEach(([row, num, f]) => {
  tl.fromTo(row, { x: 60, opacity: 0 }, { x: 0, opacity: 1, duration: 0.38, ease: OUT }, at(4, f));
  tl.fromTo(num, { scale: 0 }, { scale: 1, duration: 0.35, ease: POP }, at(4, f) + 0.06);
});
tl.fromTo('#s4-tag', { opacity: 0 }, { opacity: 1, duration: 0.3, ease: 'power2.out' }, at(4, 0.9));

// 5. step 3: a day runs out on the ring (ding), then Call or Hold
lab('#s5', T.at(5)); title('#s5', T.at(5) + 0.05);
tl.fromTo('#s5-ring', { scale: 0.75, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.5, ease: OUT }, T.at(5) + 0.05);
tl.fromTo('#s5-lbl', { opacity: 0 }, { opacity: 1, duration: 0.3, ease: 'power2.out' }, T.at(5) + 0.3);
const fillDur = T.voice(5) + 0.9 - (T.at(5) + 0.2);
tl.fromTo('#s5-arc', { strokeDashoffset: 1320 }, { strokeDashoffset: 0, duration: fillDur, ease: 'power2.inOut' }, T.at(5) + 0.2);
const hrs = { h: 0 };
tl.fromTo(hrs, { h: 0 }, { h: 24, duration: fillDur, ease: 'power2.inOut', onUpdate: () => { document.getElementById('s5-clock').textContent = `${Math.round(hrs.h)}h`; } }, T.at(5) + 0.2);
bump('#s5-ring', T.voice(5) + 0.9);
tl.fromTo('#s5-call', { scale: 0.5, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: POP }, at(5, 0.68));
tl.fromTo('#s5-hold', { scale: 0.5, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: POP }, at(5, 0.86));

// 6. why: a cancel costs ₹0, a refusal pays shipping twice
title('#s6', T.at(6) + 0.05); card('#s6-a', T.at(6) + 0.15);
tl.fromTo('#s6-zero', { scale: 0.95, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: POP }, at(6, 0.3));
tl.fromTo('#s6-ok', { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: POP }, at(6, 0.3) + 0.08);
bump('#s6-a', at(6, 0.42));
card('#s6-b', at(6, 0.5));
slam('#s6-two', at(6, 0.76));
shake('#s6-b', at(6, 0.76) + 0.25);
tl.fromTo('#s6-loop', { scale: 0.6, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: POP }, at(6, 0.84));

// 7. the catch: paid tools may charge (buzz), the free app won't, the kit only writes
tl.fromTo('#s7 .lab', { scale: 1.6, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.25, ease: 'power4.in' }, T.at(7) + 0.05);
shake('#s7 .lab', T.voice(7) + 0.2);
title('#s7', T.at(7) + 0.1); card('#s7-card', T.at(7) + 0.2);
slam('#c1-chip', at(7, 0.35));
tl.fromTo('#c1-ic', { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.35, ease: POP }, at(7, 0.35) + 0.08);
tl.fromTo('#c2', { x: 60, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4, ease: OUT }, at(7, 0.58));
tl.fromTo('#c2-chip', { scale: 0.6, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.35, ease: POP }, at(7, 0.72));
tl.fromTo('#c2-ic', { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.35, ease: POP }, at(7, 0.72) + 0.06);
tl.fromTo('#s7-note', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: OUT }, at(7, 0.84));

// 8. save + comment RTO: letters drop on the half beats
tl.fromTo('#save', { yPercent: 40, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.6, ease: OUT }, T.at(8));
tl.fromTo('#mark', { y: -120, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: 'bounce.out' }, T.at(8) + 0.3);
tl.fromTo('#pill', { scale: 0.6, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.45, ease: POP }, T.voice(8) + 0.9);
['#k1', '#k2', '#k3'].forEach((id, i) => tl.fromTo(id, { y: -120, opacity: 0 }, { y: 0, opacity: 1, duration: 0.35, ease: POP }, T.voice(8) + 2 * T.beat + i * (T.beat / 2)));
tl.fromTo('#stk', { scale: 0.5, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: POP }, T.voice(8) + 2.4);
tl.fromTo('#pill', { scale: 1 }, { scale: 1.05, duration: 0.3, yoyo: true, repeat: 3, ease: 'sine.inOut' }, T.end(8));
