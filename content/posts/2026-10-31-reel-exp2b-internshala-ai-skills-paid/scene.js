// Editorial theme, kind "skills": example application (skill line vs proof), the 4-slot proof list filling, proof chips on every application, the catch, then send + SKILL.
const OUT = 'expo.out', POP = 'back.out(1.8)';
const span = (n) => T.end(n) - T.voice(n);
const at = (n, f) => T.voice(n) + f * span(n);
const rowIn = (id, t) => tl.fromTo(id, { x: 60, opacity: 0 }, { x: 0, opacity: 1, duration: 0.35, ease: OUT }, t);
const pop = (id, t) => tl.fromTo(id, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: POP }, t);
const card = (id, t) => tl.fromTo(id, { y: 120, opacity: 0, scale: 0.96 }, { y: 0, opacity: 1, scale: 1, duration: 0.6, ease: OUT }, t);
const title = (sel, t) => tl.fromTo(sel, { yPercent: 110 }, { yPercent: 0, duration: 0.55, ease: OUT, stagger: 0.08 }, t);
const step = (sel, t) => tl.fromTo(sel, { x: -40, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4, ease: OUT }, t);
const slam = (id, t) => {
  tl.fromTo(id, { scale: 1.8, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.24, ease: 'power4.in' }, t);
  tl.fromTo(id, { x: 0 }, { x: 7, duration: 0.05, repeat: 5, yoyo: true, ease: 'none' }, t + 0.24);
};

// texture: slow drifting blobs across the whole reel
tl.fromTo('#blob1', { x: 0, y: 0 }, { x: 260, y: -140, duration: T.dur, ease: 'sine.inOut' }, 0);
tl.fromTo('#blob2', { x: 0, y: 0 }, { x: -300, y: -200, duration: T.dur, ease: 'sine.inOut' }, 0);

// progress bar: one segment per step
tl.set(['#p1', '#p2', '#p3', '#p4', '#p5'], { scaleX: 0 }, 0);
tl.to('#p1', { scaleX: 1, duration: 0.5, ease: 'power2.out' }, T.at(1));
tl.to('#p2', { scaleX: 1, duration: 0.5, ease: 'power2.out' }, T.at(3));
tl.to('#p3', { scaleX: 1, duration: 0.5, ease: 'power2.out' }, T.at(6));
tl.to('#p4', { scaleX: 1, duration: 0.5, ease: 'power2.out' }, T.at(7));
tl.to('#p5', { scaleX: 1, duration: 0.5, ease: 'power2.out' }, T.at(8));

// 0. hook: title and the 4 empty skill slots are on screen at frame 0
tl.fromTo('#s0-title .l', { yPercent: 0 }, { yPercent: 0, duration: 0.01 }, 0);
tl.fromTo('#s0-title', { scale: 1.05 }, { scale: 1, duration: 0.6, ease: OUT }, 0);
tl.fromTo('#s0-step', { opacity: 0.6 }, { opacity: 1, duration: 0.3, ease: 'power2.out' }, 0);
tl.fromTo('#s0-slots .slot', { scale: 0.92 }, { scale: 1, duration: 0.4, ease: OUT, stagger: 0.05 }, 0);
tl.fromTo('#s0-slots .slot', { y: 0 }, { y: -14, duration: 0.2, yoyo: true, repeat: 1, ease: 'sine.inOut', stagger: 0.07 }, T.voice(0) + T.beat);
tl.fromTo('#s0-slots .slot', { scale: 1 }, { scale: 1.08, duration: 0.18, yoyo: true, repeat: 1, ease: 'sine.inOut', stagger: 0.06 }, T.voice(0) + 4 * T.beat);

// 1-2. example application: the vague line gets the VAGUE chip, the proof line gets PROOF + link
step('#s1 .step', T.at(1)); title('#s1 .title .l', T.at(1) + 0.05); card('#s1-card', T.at(1) + 0.15);
tl.fromTo('#s1-url', { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 0.5, ease: 'steps(14)' }, T.at(1) + 0.45);
rowIn('#s1-a', T.voice(1) + 0.25);
slam('#s1-ca', at(1, 0.8));
rowIn('#s1-b', T.at(2) + 0.05);
tl.fromTo('#s1-strike', { scaleX: 0 }, { scaleX: 1, duration: 0.35, ease: 'power2.inOut' }, T.at(2) + 0.15);
pop('#s1-cb', T.voice(2) + 0.9);
tl.fromTo('#s1-link', { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 0.4, ease: 'power3.out' }, at(2, 0.72));
tl.fromTo('#s1-b', { scale: 1 }, { scale: 1.04, duration: 0.2, yoyo: true, repeat: 1, ease: 'sine.inOut' }, at(2, 0.92));

// 3-5. proof list: empty dashed slots, each fills as the skill is said, pips tick up
step('#s2 .step', T.at(3)); title('#s2 .title .l', T.at(3) + 0.05); card('#s2-card', T.at(3) + 0.15);
tl.fromTo('#s2 .srow', { x: 60, opacity: 0 }, { x: 0, opacity: 1, duration: 0.35, ease: OUT, stagger: 0.07 }, T.at(3) + 0.35);
const fills = [
  ['#s2-fill1', '#s2-f1', at(4, 0.05)],
  ['#s2-fill2', '#s2-f2', at(4, 0.5)],
  ['#s2-fill3', '#s2-f3', at(5, 0.03)],
  ['#s2-fill4', '#s2-f4', at(5, 0.45)]
];
fills.forEach(([fill, pip, t]) => {
  tl.fromTo(fill, { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 0.45, ease: 'power3.out' }, t);
  tl.fromTo(pip, { scale: 0 }, { scale: 1, duration: 0.35, ease: POP }, t + 0.2);
});
tl.fromTo('#s2-card', { scale: 1 }, { scale: 1.03, duration: 0.2, yoyo: true, repeat: 1, ease: 'sine.inOut' }, at(5, 0.85));

// 6. attach the proof: every example application gets a PROOF chip
step('#s3 .step', T.at(6)); title('#s3 .title .l', T.at(6) + 0.05); card('#s3-card', T.at(6) + 0.15);
tl.fromTo('#s3 .jrow', { x: 60, opacity: 0 }, { x: 0, opacity: 1, duration: 0.35, ease: OUT, stagger: 0.07 }, T.at(6) + 0.3);
pop('#s3-c1', at(6, 0.3));
pop('#s3-c2', at(6, 0.5));
pop('#s3-c3', at(6, 0.7));

// 7. the catch: the badge slams on the thud, then yes / no / varies
tl.fromTo('#s4-badge', { scale: 2.2, opacity: 0, rotation: -8 }, { scale: 1, opacity: 1, rotation: -3, duration: 0.24, ease: 'power4.in' }, T.voice(7) + 0.16);
title('#s4 .title .l', T.at(7) + 0.3); card('#s4-card', T.at(7) + 0.45);
rowIn('#s4-k1', at(7, 0.15)); pop('#s4-c1', at(7, 0.3));
rowIn('#s4-k2', at(7, 0.45)); slam('#s4-c2', at(7, 0.58));
rowIn('#s4-k3', at(7, 0.68)); pop('#s4-c3', at(7, 0.8));

// 8. send this, then the keyword drops in letter by letter, the free plan sticker and Save.
tl.fromTo('#send', { yPercent: 40, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.6, ease: OUT }, T.at(8));
tl.fromTo('#plane', { x: -200, y: 120, opacity: 0, rotation: -20 }, { x: 0, y: 0, opacity: 1, rotation: 0, duration: 0.7, ease: OUT }, T.at(8) + 0.25);
tl.fromTo('#who', { opacity: 0, filter: 'blur(12px)' }, { opacity: 1, filter: 'blur(0px)', duration: 0.45, ease: OUT }, T.voice(8) + 0.3);
tl.fromTo('#pill', { scale: 0.6, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.45, ease: POP }, at(8, 0.58));
tl.fromTo('#kw .kl', { y: -90, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: POP, stagger: 0.06 }, at(8, 0.7));
tl.fromTo('#sticker', { scale: 0, opacity: 0, rotation: -10 }, { scale: 1, opacity: 1, rotation: 4, duration: 0.45, ease: POP }, at(8, 0.82));
tl.fromTo('#save-mark', { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.45, ease: OUT }, T.end(8));
tl.fromTo('#save', { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.45, ease: OUT }, T.end(8) + 0.06);
tl.fromTo('#pill', { scale: 1 }, { scale: 1.04, duration: 0.2, yoyo: true, repeat: 1, ease: 'sine.inOut' }, T.end(8) + 0.6);
tl.to('#plane', { x: 30, y: -20, duration: 0.8, yoyo: true, repeat: 1, ease: 'sine.inOut' }, T.end(8));
