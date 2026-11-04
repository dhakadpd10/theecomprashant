// Editorial theme, kind "prompt": the hook says "get paid", three prompt rows build the planner,
// skills appear, real sites slam into dashed slots, the finished 7-day plan fills the full width,
// the catch chips slam, then the send line and a big MONEY keyword.
const OUT = 'expo.out', POP = 'back.out(1.8)', SLAM = 'power4.in';
const span = (n) => T.end(n) - T.voice(n);
const at = (n, f) => T.voice(n) + f * span(n);
const title = (s, t) => tl.fromTo(`${s} .title .l`, { yPercent: 110 }, { yPercent: 0, duration: 0.55, ease: OUT, stagger: 0.08 }, t);
const step = (s, t) => tl.fromTo(`${s} .step`, { x: -40, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4, ease: OUT }, t);
const card = (id, t) => tl.fromTo(id, { y: 110, opacity: 0, scale: 0.96 }, { y: 0, opacity: 1, scale: 1, duration: 0.6, ease: OUT }, t);
const rowIn = (id, t) => tl.fromTo(id, { x: 50, opacity: 0 }, { x: 0, opacity: 1, duration: 0.38, ease: 'power3.out' }, t);
const slam = (id, t) => tl.fromTo(id, { scale: 1.7, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.22, ease: SLAM }, t);

// texture: slow drifting blobs for the whole reel
tl.fromTo('#blob1', { x: -60, y: 0 }, { x: 80, y: 120, duration: T.dur, ease: 'sine.inOut' }, 0);
tl.fromTo('#blob2', { x: 40, y: 0 }, { x: -90, y: -100, duration: T.dur, ease: 'sine.inOut' }, 0);

// progress bar: prompt 1, prompt 2, prompt 3, the catch, send
tl.set(['#p1', '#p2', '#p3', '#p4', '#p5'], { scaleX: 0 }, 0);
[[1, 2], [2, 3], [3, 5], [4, 6], [5, 8]].forEach(([p, n]) => tl.fromTo(`#p${p}`, { scaleX: 0 }, { scaleX: 1, duration: 0.5, ease: 'power2.out' }, T.at(n)));

// 0. hook: on screen at frame 0, settles, "paid" bumps as it's said
tl.fromTo('#s0-title', { scale: 1.04 }, { scale: 1, duration: 0.6, ease: OUT }, 0);
tl.fromTo('#s0-step', { opacity: 0.7 }, { opacity: 1, duration: 0.3, ease: 'power2.out' }, 0);
tl.fromTo('#s0-paid', { scale: 1 }, { scale: 1.1, duration: 0.18, yoyo: true, repeat: 1, ease: 'sine.inOut' }, at(0, 0.8));

// 1. the three prompts land one by one (click on the first)
step('#s1', T.at(1)); title('#s1', T.at(1) + 0.05); card('#s1-card', T.at(1) + 0.15);
['#s1-r1', '#s1-r2', '#s1-r3'].forEach((id, i) => {
  const t = T.voice(1) + 0.3 + i * 0.45;
  rowIn(id, t);
  tl.fromTo(`${id} .pn`, { scale: 0 }, { scale: 1, duration: 0.4, ease: POP }, t + 0.12);
});

// 2. prompt 1: the prompt types in, the skills it finds tick in
step('#s2', T.at(2)); title('#s2', T.at(2) + 0.05); card('#s2-card', T.at(2) + 0.15);
tl.fromTo('#s2-t1', { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 0.55, ease: 'steps(19)' }, T.voice(2) + 0.2);
tl.fromTo('#s2-t2', { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 0.55, ease: 'steps(20)' }, T.voice(2) + 0.8);
['#s2-a', '#s2-b', '#s2-c', '#s2-d'].forEach((id, i) => {
  const t = T.voice(2) + 1.45 + i * 0.25;
  rowIn(id, t);
  tl.fromTo(`${id} .tick`, { scale: 0 }, { scale: 1, duration: 0.35, ease: POP }, t + 0.1);
});

// 3. prompt 2: skills listed with empty slots, the TOP PICK badge pops
step('#s3', T.at(3)); title('#s3', T.at(3) + 0.05); card('#s3-card', T.at(3) + 0.15);
['#s3-m1', '#s3-m2', '#s3-m3', '#s3-m4'].forEach((id, i) => rowIn(id, T.at(3) + 0.4 + i * 0.07));
tl.fromTo('#s3-pick', { scale: 0, opacity: 0, rotation: -14 }, { scale: 1, opacity: 1, rotation: -4, duration: 0.4, ease: POP }, T.voice(3) + 0.55);

// 4. the real sites slam into their slots as they're named, then what to post
slam('#s3-x1', T.voice(4) + 0.05);
slam('#s3-x2', at(4, 0.18));
slam('#s3-x3', at(4, 0.36));
slam('#s3-x4', at(4, 0.55));
rowIn('#s3-post', at(4, 0.76));
tl.fromTo('#s3-post', { scale: 1 }, { scale: 1.04, duration: 0.18, yoyo: true, repeat: 1, ease: 'sine.inOut' }, at(4, 0.76) + 0.45);

// 5. prompt 3: the finished 7-day plan fills the full width (pop)
step('#s5', T.at(5)); title('#s5', T.at(5) + 0.05);
tl.fromTo('#s5-card', { y: 100, opacity: 0, scale: 0.95 }, { y: 0, opacity: 1, scale: 1, duration: 0.6, ease: OUT }, T.at(5) + 0.1);
tl.fromTo('#s5-hv', { filter: 'blur(12px)', opacity: 0 }, { filter: 'blur(0px)', opacity: 1, duration: 0.45, ease: 'power3.out' }, T.voice(5) + 0.3);
['#d1', '#d2', '#d3', '#d4', '#d5', '#d6', '#d7'].forEach((id, i) => rowIn(id, T.voice(5) + 0.45 + i * 0.07));
tl.fromTo('#d7', { scale: 1 }, { scale: 1.04, duration: 0.2, yoyo: true, repeat: 1, ease: 'sine.inOut' }, at(5, 0.85));

// 6-7. the catch: chips slam (thud), then the rules row shakes and the check note lands
step('#s6', T.at(6)); title('#s6', T.at(6) + 0.05); card('#s6-card', T.at(6) + 0.15);
rowIn('#k1', T.voice(6) + 0.05);
slam('#c1', T.voice(6) + 0.28);
rowIn('#k2', at(6, 0.6));
slam('#c2', at(6, 0.6) + 0.15);
rowIn('#k3', T.voice(7) + 0.15);
slam('#c3', at(7, 0.55));
tl.fromTo('#k3', { x: 0 }, { x: 8, duration: 0.05, repeat: 5, yoyo: true, ease: 'none' }, at(7, 0.55) + 0.22);
rowIn('#s6-note', at(7, 0.75));
tl.fromTo('#s6-note .tick', { scale: 0 }, { scale: 1, duration: 0.35, ease: POP }, at(7, 0.75) + 0.12);

// 8. send this, then the big keyword drops in letter by letter (ding)
title('#s7', T.at(8));
tl.fromTo('#s7-who', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.45, ease: 'power3.out' }, T.voice(8) + 0.3);
card('#kw-card', T.voice(8) + 0.6);
tl.fromTo('#kw .kl', { yPercent: -120, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.35, ease: POP, stagger: 0.06 }, T.voice(8) + 1.9);
tl.fromTo('#kw-sub', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.4, ease: 'power3.out' }, T.voice(8) + 2.5);
tl.fromTo('#sticker', { scale: 0, opacity: 0, rotation: -20 }, { scale: 1, opacity: 1, rotation: 8, duration: 0.4, ease: POP }, T.voice(8) + 2.7);
tl.fromTo('#save', { x: -40, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4, ease: 'power3.out' }, T.end(8) - 0.3);
tl.fromTo('#kw', { scale: 1 }, { scale: 1.06, duration: 0.2, yoyo: true, repeat: 1, ease: 'sine.inOut' }, T.end(8));
