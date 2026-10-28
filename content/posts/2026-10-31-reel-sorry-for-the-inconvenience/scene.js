// Editorial theme, plum accent. The copy-pasted apology gets struck out, then the fix is built step by step into a reply with no sorry in it.
const OUT = 'expo.out', POP = 'back.out(1.8)', SLAM = 'power4.in';
const span = (n) => T.end(n) - T.voice(n);
const at = (n, f) => T.voice(n) + f * span(n);
const title = (s, t) => tl.fromTo(`${s} .title .l`, { yPercent: 110 }, { yPercent: 0, duration: 0.55, ease: OUT, stagger: 0.08 }, t);
const label = (s, t) => tl.fromTo(`${s} .step`, { x: -40, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4, ease: OUT }, t);
const card = (id, t) => tl.fromTo(id, { y: 100, opacity: 0, scale: 0.96 }, { y: 0, opacity: 1, scale: 1, duration: 0.55, ease: OUT }, t);
const open = (s, id, t) => { label(s, t); title(s, t + 0.05); card(id, t + 0.15); };
const shake = (id, t) => tl.fromTo(id, { x: 0 }, { x: 8, duration: 0.05, repeat: 5, yoyo: true, ease: 'none' }, t);
const slam = (id, t) => tl.fromTo(id, { scale: 1.8, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.25, ease: SLAM }, t);

// texture: slow drifting colour blobs for the whole reel
tl.fromTo('#blob1', { x: 0, y: 0 }, { x: 180, y: 140, duration: T.dur, ease: 'sine.inOut' }, 0);
tl.fromTo('#blob2', { x: 0, y: 0 }, { x: -160, y: -120, duration: T.dur, ease: 'sine.inOut' }, 0);

// progress bar: one segment per step
tl.set(['#p1', '#p2', '#p3'], { scaleX: 0 }, 0);
[3, 4, 5].forEach((n, i) => tl.to(`#p${i + 1}`, { scaleX: 1, duration: 0.5, ease: 'power2.out' }, T.at(n)));

// 0. hook: title and the apology bubble are on screen at frame 0
tl.fromTo('#s0-title', { scale: 1.05, transformOrigin: 'left center' }, { scale: 1, duration: 0.6, ease: OUT }, 0);
tl.fromTo('#s0-bub', { scale: 1.04 }, { scale: 1, duration: 0.6, ease: OUT }, 0);
// pasted again and again: copies stack out behind it
tl.fromTo('#g1', { x: 0, y: 0, opacity: 0 }, { x: 14, y: 14, opacity: 0.55, duration: 0.4, ease: OUT }, 0.45);
tl.fromTo('#g2', { x: 0, y: 0, opacity: 0 }, { x: 28, y: 28, opacity: 0.55, duration: 0.4, ease: OUT }, 0.6);
// struck out, and the bubble shakes (mistake)
tl.fromTo('#s0-strike', { scaleX: 0 }, { scaleX: 1, duration: 0.35, ease: 'power3.out' }, 1.0);
shake('#s0-bub', 1.35);
// "twelve percent bad reviews", labelled example
tl.fromTo('#s0-chip', { scale: 0.6, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: POP }, at(0, 0.7));
tl.fromTo('#s0-ex', { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 0.35, ease: OUT }, at(0, 0.7) + 0.15);

// 1. says nothing: the chat, then the three missing pieces slam in
label('#s1', T.at(1)); title('#s1', T.at(1) + 0.05); card('#s1-card', T.at(1));
tl.fromTo('#s1-in', { y: 24, opacity: 0, scale: 0.9 }, { y: 0, opacity: 1, scale: 1, duration: 0.3, ease: POP }, T.at(1) + 0.12);
tl.fromTo('#s1-out', { y: 24, opacity: 0, scale: 0.9 }, { y: 0, opacity: 1, scale: 1, duration: 0.3, ease: POP }, T.at(1) + 0.22);
shake('#s1-out', T.voice(1) + 0.45);
[['#r1', '#x1', 0.36], ['#r2', '#x2', 0.58], ['#r3', '#x3', 0.76]].forEach(([r, x, f]) => {
  tl.fromTo(r, { x: 60, opacity: 0 }, { x: 0, opacity: 1, duration: 0.35, ease: OUT }, at(1, f) - 0.15);
  slam(x, at(1, f) + 0.05);
});

// 2. just tell Claude: the question types, the button presses, dots think
open('#s2', '#s2-card', T.at(2));
tl.fromTo('#s2-type', { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 0.5, ease: 'steps(17)' }, T.voice(2) + 0.25);
tl.fromTo('#s2-go', { scale: 1 }, { scale: 0.92, duration: 0.1, yoyo: true, repeat: 1, ease: 'power2.inOut' }, T.voice(2) + 0.9);
tl.fromTo('#s2-dots', { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 0.3, ease: POP }, T.voice(2) + 1.1);
tl.fromTo('#s2-dots .dot', { y: 0 }, { y: -12, duration: 0.15, yoyo: true, repeat: 3, stagger: 0.08, ease: 'sine.inOut' }, T.voice(2) + 1.2);

// 3. step 1: the policy lines type in
open('#s3', '#s3-card', T.at(3));
['#pl1', '#pl2', '#pl3'].forEach((id, i) => tl.fromTo(id, { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 0.3, ease: 'steps(12)' }, T.voice(3) + 0.3 + i * 0.3));
tl.fromTo('#s3-ex', { opacity: 0 }, { opacity: 1, duration: 0.3, ease: 'power2.out' }, T.voice(3) + 1.1);

// 4. step 2: the courier timeline draws down to Thursday
open('#s4', '#s4-card', T.at(4));
tl.fromTo('#s4-line', { scaleY: 0 }, { scaleY: 1, duration: 0.9, ease: 'power2.inOut' }, T.voice(4) + 0.3);
[['#d1', '#t1', 0.3], ['#d2', '#t2', 0.65], ['#d3', '#t3', 1.0]].forEach(([d, t, o]) => {
  tl.fromTo(d, { scale: 0 }, { scale: 1, duration: 0.3, ease: POP }, T.voice(4) + o);
  tl.fromTo(t, { x: 40, opacity: 0 }, { x: 0, opacity: 1, duration: 0.35, ease: OUT }, T.voice(4) + o + 0.06);
});
tl.fromTo('#d3', { scale: 1 }, { scale: 1.25, duration: 0.15, yoyo: true, repeat: 1, ease: 'power2.out' }, T.voice(4) + 1.35);
tl.fromTo('#s4-ex', { opacity: 0 }, { opacity: 1, duration: 0.3, ease: 'power2.out' }, T.voice(4) + 1.2);

// 5. step 3: the highlight sweeps down, ticks pop as each thing is said (click on the first)
open('#s5', '#s5-card', T.at(5));
const k1 = T.voice(5) + 0.8, k2 = at(5, 0.58), k3 = at(5, 0.86);
tl.fromTo('#s5-hl', { y: 0, opacity: 0 }, { y: 0, opacity: 1, duration: 0.2, ease: 'power2.out' }, k1 - 0.15);
tl.to('#s5-hl', { y: 130, duration: 0.35, ease: 'power2.inOut' }, k2 - 0.35);
tl.to('#s5-hl', { y: 260, duration: 0.35, ease: 'power2.inOut' }, k3 - 0.35);
[['#k1', k1], ['#k2', k2], ['#k3', k3]].forEach(([id, t]) => tl.fromTo(id, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.35, ease: POP }, t));

// 6. the draft: reply blurs in, the three things light up green
open('#s6', '#s6-card', T.at(6));
tl.fromTo('#s6-bub', { filter: 'blur(12px)', opacity: 0 }, { filter: 'blur(0px)', opacity: 1, duration: 0.5, ease: 'power3.out' }, T.voice(6) + 0.1);
tl.fromTo(['#h1', '#h2', '#h3'], { scale: 0.6, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.35, ease: POP, stagger: 0.08 }, at(6, 0.55));

// 7. the twist: "0 sorry" stamp slams on the thud, the card bumps (success)
const thud = T.voice(7) + 0.6;
tl.fromTo('#s7-stamp', { scale: 2.2, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.25, ease: SLAM }, thud - 0.25);
tl.fromTo('#s6-card', { scale: 1 }, { scale: 1.03, duration: 0.12, yoyo: true, repeat: 1, ease: 'power2.out' }, thud);

// 8. the catch: what it does, what you do, what you paste
open('#s8', '#s8-card', T.at(8));
[['#f1', '#y1', 0.1], ['#f2', '#y2', 0.32], ['#f3', '#y3', 0.62]].forEach(([r, c, f]) => {
  tl.fromTo(r, { x: 60, opacity: 0 }, { x: 0, opacity: 1, duration: 0.35, ease: OUT }, at(8, f));
  slam(c, at(8, f) + 0.2);
});

// 9. save + comment SUPPORT, letters drop in as the keyword is said
tl.fromTo('#save', { yPercent: 40, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.6, ease: OUT }, T.at(9));
tl.fromTo('#mark', { y: -120, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: 'bounce.out' }, T.at(9) + 0.2);
tl.fromTo('#s9-pill', { scale: 0.6, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.45, ease: POP }, T.voice(9) + 0.35);
tl.fromTo('#kw .k', { y: -80, opacity: 0 }, { y: 0, opacity: 1, duration: 0.35, ease: POP, stagger: 0.04 }, at(9, 0.42));
tl.fromTo('#s9-free', { scale: 0.5, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: POP }, at(9, 0.85));
tl.fromTo('#s9-pill', { scale: 1 }, { scale: 1.05, duration: 0.2, yoyo: true, repeat: 3, ease: 'sine.inOut' }, T.end(9));
