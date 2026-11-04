// Explainer: why that scheme ad is a deepfake. One idea (real clip + copied voice + new script),
// one analogy (a dubbed film), colour = meaning: green real/safe, red fake/scam, amber careful, blue what you check.
// Motion: enters expo.out, pops back.out, slams power4.in, stagger 0.07 s, labels settle late (follow-through).
const OUT = 'expo.out', POP = 'back.out(1.7)';
const span = (n) => T.end(n) - T.voice(n);
const at = (n, f) => T.voice(n) + f * span(n);
const title = (s, t) => tl.fromTo(`${s} .title .l`, { yPercent: 110 }, { yPercent: 0, duration: 0.55, ease: OUT, stagger: 0.09 }, t);
const step = (s, t) => tl.fromTo(`${s} .step`, { x: -40, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4, ease: OUT }, t);
const card = (id, t) => tl.fromTo(id, { y: 120, opacity: 0, scale: 0.96 }, { y: 0, opacity: 1, scale: 1, duration: 0.6, ease: OUT }, t);
const late = (id, t) => tl.fromTo(id, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.35, ease: OUT }, t);
const rowIn = (id, t) => tl.fromTo(id, { x: 60, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4, ease: OUT }, t);
const chip = (id, t) => {
  tl.fromTo(id, { scale: 0, opacity: 0 }, { scale: 1.12, opacity: 1, duration: 0.22, ease: 'power2.out' }, t);
  tl.to(id, { scale: 1, duration: 0.18, ease: 'power2.inOut' }, t + 0.22);
};
const slam = (id, land, rot) => tl.fromTo(id, { scale: 2.4, opacity: 0, rotation: rot - 14 }, { scale: 1, opacity: 1, rotation: rot, duration: 0.22, ease: 'power4.in' }, land - 0.22);
const shake = (id, t, px = 8) => tl.fromTo(id, { x: 0 }, { x: px, duration: 0.05, repeat: 5, yoyo: true, ease: 'none' }, t);

// ambient: two soft orbs drift for the whole reel
tl.fromTo('#orb1', { x: 0, y: 0 }, { x: 160, y: -120, duration: T.dur, ease: 'sine.inOut' }, 0);
tl.fromTo('#orb2', { x: 0, y: 0 }, { x: -180, y: -160, duration: T.dur, ease: 'sine.inOut' }, 0);

// progress bar: one segment per beat after the hook
tl.set(['#p1', '#p2', '#p3', '#p4', '#p5', '#p6', '#p7', '#p8', '#p9'], { scaleX: 0 }, 0);
[1, 2, 3, 4, 5, 6, 7, 8, 9].forEach((n) => tl.to(`#p${n}`, { scaleX: 1, duration: 0.5, ease: 'power2.out' }, T.at(n)));

// 0. hook: the title is on screen at frame 0, FAKE slams on the thud, bumps on "never said"
tl.fromTo('#s0-title', { scale: 1.06 }, { scale: 1, duration: 0.7, ease: OUT }, 0);
tl.fromTo('#s0-step', { opacity: 0.6 }, { opacity: 1, duration: 0.3, ease: 'power2.out' }, 0);
slam('#s0-stamp', T.voice(0) + 0.5, -10);
shake('#s0-title', T.voice(0) + 0.5, 6);
tl.to('#s0-stamp', { scale: 1.1, duration: 0.15, yoyo: true, repeat: 1, ease: 'sine.inOut' }, at(0, 0.78));

// 1. the ad: a sponsored video plays, the mouth moves, FREE MONEY wipes in, Apply now pops
step('#s1', T.at(1)); title('#s1', T.at(1) + 0.05); card('#s1-card', T.at(1) + 0.15);
late('#s1-spon', T.at(1) + 0.45);
chip('#s1-live', T.at(1) + 0.55);
tl.fromTo('#s1-play', { scaleX: 0 }, { scaleX: 1, duration: T.lines[1].b - T.at(1) - 0.3, ease: 'none' }, T.at(1) + 0.3);
tl.fromTo('#s1-mouth', { scaleY: 1 }, { scaleY: 0.25, transformOrigin: '50% 50%', duration: 0.14, repeat: 15, yoyo: true, ease: 'sine.inOut' }, T.voice(1) + 0.1);
tl.fromTo('#s1-banner', { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 0.4, ease: 'power3.out' }, at(1, 0.72));
chip('#s1-apply', at(1, 0.84));
tl.to('#s1-apply', { scale: 1.06, duration: 0.2, yoyo: true, repeat: 1, ease: 'sine.inOut' }, at(1, 0.84) + 0.45);
late('#s1-note', at(1, 0.9));

// 2. the analogy: the face moves its lips, a separate red soundtrack plays; REAL vs DUBBED
step('#s2', T.at(2)); title('#s2', T.at(2) + 0.05); card('#s2-card', T.at(2) + 0.15);
tl.fromTo('#s2-mouth', { scaleY: 1 }, { scaleY: 0.3, transformOrigin: '50% 50%', duration: 0.14, repeat: 15, yoyo: true, ease: 'sine.inOut' }, T.voice(2) + 0.1);
tl.fromTo('#s2-wave', { opacity: 0, x: 30 }, { opacity: 1, x: 0, duration: 0.4, ease: OUT }, at(2, 0.5));
const rnd = T.rand(7);
['#w1', '#w2', '#w3', '#w4', '#w5', '#w6', '#w7'].forEach((id, i) => {
  tl.fromTo(id, { scaleY: 0.3 }, { scaleY: 1, duration: 0.12 + rnd() * 0.1, repeat: 7, yoyo: true, ease: 'sine.inOut' }, at(2, 0.5) + i * 0.04);
});
rowIn('#s2-r1', T.voice(2) + 0.2); rowIn('#s2-r2', T.voice(2) + 0.27);
chip('#s2-c1', at(2, 0.42));
chip('#s2-c2', at(2, 0.72));

// 3. the recipe (host hidden): three parts land on the voice and the pops, then the dark result bar
step('#s3', T.at(3)); title('#s3', T.at(3) + 0.05); card('#s3-card', T.at(3) + 0.15);
rowIn('#s3-r1', T.voice(3) + 0.05); chip('#s3-i1', T.voice(3) + 0.12); chip('#s3-c1', T.voice(3) + 0.45);
rowIn('#s3-r2', T.voice(3) + 0.75); chip('#s3-i2', T.voice(3) + 0.8); chip('#s3-c2', T.voice(3) + 0.9 - 0.12);
rowIn('#s3-r3', T.voice(3) + 1.65); chip('#s3-i3', T.voice(3) + 1.7); chip('#s3-c3', T.voice(3) + 1.8 - 0.12);
tl.fromTo('#s3-res', { y: 30, opacity: 0, scale: 0.95 }, { y: 0, opacity: 1, scale: 1, duration: 0.4, ease: POP }, T.voice(3) + 2.3);
chip('#s3-c4', T.voice(3) + 2.5);

// 4. the trap: bait APPROVED, the example fee counts up, Pay with UPI, then SCAM slams on the thud
step('#s4', T.at(4)); title('#s4', T.at(4) + 0.05); card('#s4-card', T.at(4) + 0.15);
late('#s4-head', T.at(4) + 0.4);
rowIn('#s4-r1', T.at(4) + 0.3); chip('#s4-c1', T.at(4) + 0.5);
tl.fromTo('#s4-fee', { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: OUT }, T.voice(4) + 0.2);
const fee = { v: 0 };
tl.fromTo(fee, { v: 0 }, { v: 499, duration: 0.6, ease: 'power3.out', onUpdate: () => { document.getElementById('s4-amt').textContent = '₹' + Math.round(fee.v); } }, T.voice(4) + 0.2);
late('#s4-ex', T.voice(4) + 0.4);
chip('#s4-pay', T.voice(4) + 0.45);
slam('#s4-stamp', T.voice(4) + 1.0, -9);
shake('#s4-fee', T.voice(4) + 1.0, 8);
tl.to('#s4-pay', { scale: 0.95, duration: 0.12, yoyo: true, repeat: 1, ease: 'power2.inOut' }, at(4, 0.82));

// 5. the proof: I4C, then each example ad gets a red FLAGGED chip as the voice says "flagged"
step('#s5', T.at(5)); title('#s5', T.at(5) + 0.05); card('#s5-card', T.at(5) + 0.15);
['#s5-r1', '#s5-r2', '#s5-r3'].forEach((id, i) => rowIn(id, T.at(5) + 0.35 + i * 0.07));
chip('#s5-shield', at(5, 0.3));
tl.fromTo('#s5-i4c', { opacity: 0, scale: 0.7 }, { opacity: 1, scale: 1, duration: 0.45, ease: POP }, at(5, 0.36));
late('#s5-sub', at(5, 0.48));
['#s5-c1', '#s5-c2', '#s5-c3'].forEach((id, i) => chip(id, at(5, 0.72) + i * T.beat / 2));
late('#s5-note', at(5, 0.92));

// 6. the payoff: three checks, the blue ring scans each row as it's asked, badge pops on the ding
step('#s6', T.at(6)); title('#s6', T.at(6) + 0.05); card('#s6-card', T.at(6) + 0.15);
late('#s6-head', T.at(6) + 0.4);
['#s6-r1', '#s6-r2', '#s6-r3'].forEach((id, i) => rowIn(id, T.voice(6) + 0.3 + i * 0.07));
chip('#s6-badge', T.voice(6) + 1.2 - 0.22);
tl.fromTo('#s6-ring', { opacity: 0, scale: 1.05 }, { opacity: 1, scale: 1, duration: 0.3, ease: OUT }, at(6, 0.44));
chip('#s6-c1', at(6, 0.48));
tl.fromTo('#s6-ring', { y: 0 }, { y: 150, duration: 0.3, ease: 'power2.inOut' }, at(6, 0.64) - 0.1);
chip('#s6-c2', at(6, 0.68));
shake('#s6-r2', at(6, 0.68) + 0.25, 6);
tl.to('#s6-ring', { y: 300, duration: 0.3, ease: 'power2.inOut' }, at(6, 0.84) - 0.1);
chip('#s6-c3', at(6, 0.88));

// 7. report it: the URL types, the button is tapped on the click, 1930 drops in digit by digit
step('#s7', T.at(7)); title('#s7', T.at(7) + 0.05); card('#s7-card', T.at(7) + 0.15);
rowIn('#s7-a', T.at(7) + 0.3); rowIn('#s7-b', T.at(7) + 0.37);
tl.fromTo('#s7-url-t', { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 0.7, ease: 'steps(17)' }, T.voice(7) + 0.6);
tl.fromTo('#s7-btn', { scale: 1 }, { scale: 0.93, duration: 0.1, yoyo: true, repeat: 1, ease: 'power2.inOut' }, T.voice(7) + 1.35);
tl.fromTo('#s7-tap', { scale: 0.3, opacity: 0.9 }, { scale: 1.7, opacity: 0, duration: 0.45, ease: 'power2.out' }, T.voice(7) + 1.4);
chip('#s7-call', at(7, 0.66));
['#s7-d1', '#s7-d2', '#s7-d3', '#s7-d4'].forEach((id, i) => tl.fromTo(id, { yPercent: -60, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.35, ease: 'back.out(2)' }, at(7, 0.74) + i * 0.1));
tl.to('#s7-call', { scale: 1.08, duration: 0.18, yoyo: true, repeat: 3, ease: 'sine.inOut' }, at(7, 0.74) + 0.5);
late('#s7-b-n', at(7, 0.88));

// 8. the catch: the magnifier lands on the perfect face, CAN LIE, then glides down to the source
step('#s8', T.at(8)); title('#s8', T.at(8) + 0.05); card('#s8-card', T.at(8) + 0.15);
rowIn('#s8-a', T.at(8) + 0.3); rowIn('#s8-b', T.at(8) + 0.37);
tl.fromTo('#s8-mag', { scale: 0.6, opacity: 0, rotation: -20 }, { scale: 1, opacity: 1, rotation: 0, duration: 0.45, ease: POP }, T.voice(8) + 0.3);
chip('#s8-c1', at(8, 0.4));
shake('#s8-face', at(8, 0.4) + 0.25, 6);
tl.to('#s8-mag', { y: 260, duration: 0.45, ease: 'power2.inOut' }, at(8, 0.62));
chip('#s8-c2', at(8, 0.74));
tl.fromTo('#s8-b', { scale: 1 }, { scale: 1.03, duration: 0.15, yoyo: true, repeat: 1, ease: 'sine.inOut' }, at(8, 0.82));

// 9. send this: the card lands in the family group, then the big SAFE drops in letter by letter
title('#s9', T.at(9)); late('#s9-who', T.at(9) + 0.3);
card('#s9-chat', T.at(9) + 0.15);
tl.fromTo('#s9-bub', { scale: 0.85, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: POP }, T.voice(9) + 0.35);
late('#s9-ct', T.voice(9) + 0.55);
['#s9-k1', '#s9-k2', '#s9-k3'].forEach((id, i) => tl.fromTo(id, { x: 40, opacity: 0 }, { x: 0, opacity: 1, duration: 0.35, ease: OUT }, T.voice(9) + 0.7 + i * 0.07));
['#s9-t1', '#s9-t2', '#s9-t3'].forEach((id, i) => chip(id, T.voice(9) + 0.8 + i * 0.07));
late('#s9-bl', T.voice(9) + 1.05);
tl.fromTo('#s9-pill', { scale: 0.6, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.45, ease: POP }, at(9, 0.5));
['#s9-L1', '#s9-L2', '#s9-L3', '#s9-L4'].forEach((id, i) => tl.fromTo(id, { yPercent: -120, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.35, ease: 'back.out(2)' }, at(9, 0.68) + i * 0.06));
tl.fromTo('#s9-free', { scale: 0, opacity: 0, rotation: 0 }, { scale: 1, opacity: 1, rotation: -8, duration: 0.4, ease: POP }, at(9, 0.88));
tl.to('#s9-pill', { scale: 1.05, duration: 0.3, yoyo: true, repeat: 1, ease: 'sine.inOut' }, T.end(9) + 0.2);
