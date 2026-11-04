// Explainer: an AI voice clone calls in a panic. One idea (it copies the voice, not the phone), one analogy (the sangeet mimic),
// colour = meaning: blue = the AI copy, red = the scam, green = real / safe, amber = careful.
// Motion: enters expo.out 0.5 s, pops back.out, slam power4.in, stagger 0.07 s, labels settle after their card.
const OUT = 'expo.out', POP = 'back.out(1.8)';
const span = (n) => T.end(n) - T.voice(n);
const title = (s, t) => tl.fromTo(`${s} .title .l`, { yPercent: 110 }, { yPercent: 0, duration: 0.55, ease: OUT, stagger: 0.09 }, t);
const card = (id, t) => tl.fromTo(id, { y: 120, opacity: 0, scale: 0.96 }, { y: 0, opacity: 1, scale: 1, duration: 0.6, ease: OUT }, t);
const step = (s, t) => tl.fromTo(`${s} .step`, { x: -40, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4, ease: OUT }, t);
const late = (id, t) => tl.fromTo(id, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.35, ease: OUT }, t);
const chip = (id, t) => {
  tl.fromTo(id, { scale: 0, opacity: 0 }, { scale: 1.12, opacity: 1, duration: 0.22, ease: 'power2.out' }, t);
  tl.to(id, { scale: 1, duration: 0.18, ease: 'power2.inOut' }, t + 0.22);
};
const slide = (id, t) => tl.fromTo(id, { x: 60, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4, ease: OUT }, t);
const bubble = (id, t) => tl.fromTo(id, { scale: 0.6, opacity: 0, y: 20 }, { scale: 1, opacity: 1, y: 0, duration: 0.4, ease: POP }, t);
const bump = (id, t) => tl.fromTo(id, { scale: 1 }, { scale: 1.06, duration: 0.15, yoyo: true, repeat: 1, ease: 'sine.inOut' }, t);
const shake = (id, t, px = 8) => tl.fromTo(id, { x: 0 }, { x: px, duration: 0.05, repeat: 5, yoyo: true, ease: 'none' }, t);
const wave = (sel, t) => tl.fromTo(sel, { scaleY: 0.1 }, { scaleY: 1, duration: 0.35, ease: POP, stagger: 0.03 }, t);

// ambient: two soft orbs drift for the whole reel
tl.fromTo('#orb1', { x: 0, y: 0 }, { x: 160, y: -120, duration: T.dur, ease: 'sine.inOut' }, 0);
tl.fromTo('#orb2', { x: 0, y: 0 }, { x: -180, y: -150, duration: T.dur, ease: 'sine.inOut' }, 0);

// progress bar: one segment per beat after the hook
tl.set(['#p1', '#p2', '#p3', '#p4', '#p5', '#p6', '#p7', '#p8'], { scaleX: 0 }, 0);
[1, 2, 3, 4, 5, 6, 7, 8].forEach((n) => tl.to(`#p${n}`, { scaleX: 1, duration: 0.5, ease: 'power2.out' }, T.at(n)));

// 0. hook: the call is already ringing at frame 0, the decline button gets pressed on "call back first"
tl.fromTo('#s0-title', { scale: 1.06 }, { scale: 1, duration: 0.7, ease: OUT }, 0);
tl.fromTo('#s0-step', { opacity: 0.7 }, { opacity: 1, duration: 0.3 }, 0);
tl.fromTo('#s0-r1', { scale: 0.9, opacity: 0.9 }, { scale: 1.6, opacity: 0, duration: 0.9, ease: 'power2.out', repeat: 2 }, 0);
tl.fromTo('#s0-r2', { scale: 0.9, opacity: 0 }, { scale: 1.6, opacity: 0, duration: 0.01 }, 0);
tl.fromTo('#s0-r2', { scale: 0.9, opacity: 0.9 }, { scale: 1.6, opacity: 0, duration: 0.9, ease: 'power2.out', repeat: 1 }, 0.45);
tl.fromTo('#s0-acc', { rotation: 0 }, { rotation: 12, duration: 0.06, repeat: 9, yoyo: true, ease: 'sine.inOut' }, 0.15);
tl.fromTo('#s0-acc', { rotation: 0 }, { rotation: 12, duration: 0.06, repeat: 9, yoyo: true, ease: 'sine.inOut' }, 1.35);
const press = T.voice(0) + 0.72 * span(0);
tl.fromTo('#s0-dec', { scale: 1 }, { scale: 0.85, duration: 0.12, ease: 'power2.in' }, press);
tl.to('#s0-dec', { scale: 1.1, duration: 0.2, ease: POP }, press + 0.12);
tl.to('#s0-dec', { scale: 1, duration: 0.2, ease: 'power2.inOut' }, press + 0.32);
tl.to('#s0-acc', { opacity: 0.25, scale: 0.9, duration: 0.3, ease: 'power3.in' }, press + 0.15);
tl.fromTo('#s0-line-p', { strokeDashoffset: 640 }, { strokeDashoffset: 0, duration: 0.6, ease: 'power2.out' }, press + 0.1);

// 1. how it works: clips get scanned, the real voice and the copy draw the same wave
step('#s1', T.at(1)); title('#s1', T.at(1) + 0.05); card('#s1-clips', T.at(1) + 0.15); card('#s1-match', T.at(1) + 0.3);
['#t1', '#t2', '#t3'].forEach((id, i) => tl.fromTo(id, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: OUT }, T.voice(1) + 0.2 + i * 0.07));
late('#s1-ai-lbl', T.voice(1) + 0.25 * span(1));
const scan = T.voice(1) + 0.25 * span(1);
tl.fromTo('#s1-scan', { x: 0, opacity: 0 }, { x: 0, opacity: 1, duration: 0.15 }, scan);
tl.fromTo('#s1-scan', { x: 0 }, { x: 830, duration: 0.9, ease: 'none' }, scan + 0.1);
tl.to('#s1-scan', { opacity: 0, duration: 0.2, ease: 'power3.in' }, scan + 1.0);
['#t1', '#t2', '#t3'].forEach((id, i) => bump(id, scan + 0.15 + i * 0.3));
wave('#v1 .wave i', T.voice(1) + 0.5 * span(1)); chip('#s1-c1', T.voice(1) + 0.58 * span(1));
wave('#v2 .wave i', T.voice(1) + 0.68 * span(1)); chip('#s1-c2', T.voice(1) + 0.76 * span(1));
late('#s1-mic', T.voice(1) + 0.84 * span(1)); late('#s1-note', T.voice(1) + 0.86 * span(1));

// 2. the fake call: panic bubbles, the UPI amount, FAKE slams on the thud
step('#s2', T.at(2)); title('#s2', T.at(2) + 0.05); card('#s2-card', T.at(2) + 0.15);
late('#s2-name', T.at(2) + 0.4); late('#s2-sub', T.at(2) + 0.46);
tl.fromTo('#s2-dot', { scale: 1, opacity: 1 }, { scale: 1.5, opacity: 0.4, duration: 0.3, repeat: 7, yoyo: true, ease: 'sine.inOut' }, T.at(2) + 0.4);
bubble('#b1', T.voice(2) + 0.35);
bubble('#b2', T.voice(2) + 0.85);
slide('#s2-upi', T.voice(2) + 1.1);
const amt = { v: 0 };
tl.fromTo(amt, { v: 0 }, { v: 20000, duration: 0.4, ease: 'power3.out', onUpdate: () => { document.getElementById('s2-amt').textContent = `₹${Math.round(amt.v).toLocaleString('en-IN')}`; } }, T.voice(2) + 1.15);
tl.fromTo('#s2-stamp', { scale: 2.4, opacity: 0, rotation: -24 }, { scale: 1, opacity: 1, rotation: -10, duration: 0.22, ease: 'power4.in' }, T.voice(2) + 1.38);
shake('#s2-card', T.voice(2) + 1.6, 10);
tl.fromTo('#s2-pay', { scale: 1 }, { scale: 1.08, duration: 0.2, yoyo: true, repeat: 3, ease: 'sine.inOut' }, T.voice(2) + 0.8 * span(2));

// 3. the fix: three steps tick on the pops and the ding, the saved contact slides in
step('#s3', T.at(3)); title('#s3', T.at(3) + 0.05); card('#s3-card', T.at(3) + 0.15);
['#d1', '#d2', '#d3'].forEach((id, i) => slide(id, T.at(3) + 0.3 + i * 0.07));
tl.set(['#k1', '#k2', '#k3'], { scale: 0, opacity: 0 }, 0);
chip('#k1', T.voice(3) + 0.3); tl.to('#d1', { backgroundColor: '#E8F4EC', duration: 0.25, ease: 'power2.out' }, T.voice(3) + 0.3);
chip('#k2', T.voice(3) + 1.1); tl.to('#d2', { backgroundColor: '#E8F4EC', duration: 0.25, ease: 'power2.out' }, T.voice(3) + 1.1);
tl.fromTo('#s3-con', { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.45, ease: OUT }, T.voice(3) + 1.35);
chip('#s3-call', T.voice(3) + 1.6);
tl.fromTo('#s3-ic', { scale: 1 }, { scale: 1.1, duration: 0.15, yoyo: true, repeat: 3, ease: 'sine.inOut' }, T.voice(3) + 1.7);
chip('#k3', T.voice(3) + 2.35); tl.to('#d3', { backgroundColor: '#E8F4EC', duration: 0.25, ease: 'power2.out' }, T.voice(3) + 2.35);

// 4. payoff: the voice gets copied, the phone does not, and the real call back says all fine
step('#s4', T.at(4)); title('#s4', T.at(4) + 0.05); card('#s4-split', T.at(4) + 0.12);
wave('#s4-wave i', T.voice(4) + 0.1);
chip('#s4-c1', T.voice(4) + 0.45);
tl.fromTo('#s4-ph', { scale: 0.5, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.35, ease: POP }, T.voice(4) + 0.55);
late('#s4-num', T.voice(4) + 0.65);
chip('#s4-c2', T.voice(4) + 0.8);
card('#s4-call', T.voice(4) + 0.55);
tl.fromTo('#s4-dotg', { scale: 1 }, { scale: 1.4, duration: 0.25, yoyo: true, repeat: 5, ease: 'sine.inOut' }, T.voice(4) + 0.8);
bubble('#s4-b1', T.voice(4) + 0.92);
bubble('#s4-b2', T.voice(4) + 1.12);
bump('#s4-c2', T.voice(4) + 0.8 * span(4));

// 5. the catch: the pause ring draws, rush vs pause
step('#s5', T.at(5)); title('#s5', T.at(5) + 0.05); card('#s5-card', T.at(5) + 0.15);
tl.fromTo('#s5-arc', { strokeDashoffset: 691 }, { strokeDashoffset: 0, duration: 1.4, ease: 'power2.inOut' }, T.at(5) + 0.25);
tl.fromTo('#s5-pause', { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: POP }, T.voice(5) + 0.1);
slide('#w1', T.voice(5) + 0.35); chip('#s5-c1', T.voice(5) + 0.5); shake('#s5-c1', T.voice(5) + 0.75, 6);
slide('#w2', T.voice(5) + 0.75); chip('#s5-c2', T.voice(5) + 0.9);

// 6. money gone: 1930 types in, call fast, recovery not certain
step('#s6', T.at(6)); title('#s6', T.at(6) + 0.05); card('#s6-card', T.at(6) + 0.15);
late('#s6-lbl', T.at(6) + 0.45);
tl.fromTo('#s6-num', { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 0.5, ease: 'steps(4)' }, T.voice(6) + 0.3 * span(6));
chip('#s6-callb', T.voice(6) + 0.48 * span(6));
tl.to('#s6-callb', { scale: 1.08, duration: 0.25, yoyo: true, repeat: 3, ease: 'sine.inOut' }, T.voice(6) + 0.48 * span(6) + 0.45);
slide('#e1', T.voice(6) + 0.5 * span(6)); chip('#s6-c1', T.voice(6) + 0.56 * span(6));
slide('#e2', T.voice(6) + 0.72 * span(6)); chip('#s6-c2', T.voice(6) + 0.78 * span(6));
tl.fromTo('#s6-c2', { rotation: 0 }, { rotation: 5, duration: 0.08, repeat: 5, yoyo: true, ease: 'sine.inOut' }, T.voice(6) + 0.78 * span(6) + 0.45);
late('#s6-note', T.voice(6) + 0.88 * span(6));

// 7. send this: the forwarded card lands in the family group, the ticks turn blue
title('#s7', T.at(7)); card('#s7-card', T.at(7) + 0.15);
late('#s7-gname', T.at(7) + 0.45); late('#s7-gsub', T.at(7) + 0.5);
bubble('#s7-fw', T.voice(7) + 0.3 * span(7));
late('#s7-tk', T.voice(7) + 0.5 * span(7));
tl.to('#s7-tk path', { stroke: '#2A8BE0', duration: 0.25, ease: 'power2.out' }, T.voice(7) + 0.72 * span(7));
late('#s7-seen', T.voice(7) + 0.75 * span(7));
bump('#s7-fw', T.voice(7) + 0.78 * span(7));

// 8. keyword: save, the card it gives you, SAFE drops in letter by letter
step('#s8', T.at(8)); title('#s8', T.at(8) + 0.05);
tl.fromTo('#s8-bm', { y: -60, opacity: 0 }, { y: 0, opacity: 1, duration: 0.45, ease: POP }, T.at(8) + 0.2);
card('#s8-card', T.at(8) + 0.15);
['#f1', '#f2', '#f3'].forEach((id, i) => slide(id, T.voice(8) + 0.05 + i * 0.07));
tl.set(['#m1', '#m2', '#m3'], { scale: 0, opacity: 0 }, 0);
['#m1', '#m2', '#m3'].forEach((id, i) => chip(id, T.voice(8) + 0.9 + i * 0.08));
tl.fromTo('#s8-pill', { scale: 0.6, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.45, ease: POP }, T.voice(8) + 0.4);
late('#s8-cm', T.voice(8) + 0.55);
tl.fromTo(['#kS', '#kA', '#kF', '#kE'], { y: -80, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: POP, stagger: 0.12 }, T.voice(8) + 0.6);
tl.fromTo('#s8-pill', { scale: 1 }, { scale: 1.05, duration: 0.3, yoyo: true, repeat: 1, ease: 'sine.inOut' }, T.end(8) + 0.1);
