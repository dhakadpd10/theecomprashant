// Clay paper, kind list (log as compare): PDF problem, 3 friends, ranked card 3 to 1, the clause it points at, the catch, hide IDs, send, SIMPLE.
// FLAG 1: the voice says "the one line to paste with your PDF", but SIMPLE's tool is the Explain-Like-I'm-New Prompt
//   (paste into Claude, type a word). The end card shows what the tool really does. Fix the tool or line 10 before posting.
// FLAG 2: the 3-2-1 order follows post.json and is provisional until the side-by-side test. If the test disagrees, reorder #s3-r1..r3.
const OUT = 'expo.out', POP = 'back.out(1.8)', SLAM = 'power4.in';
const span = (n) => T.end(n) - T.voice(n);
const at = (n, f) => T.voice(n) + f * span(n);
const title = (s, t) => tl.fromTo(`${s} .title .l`, { yPercent: 110 }, { yPercent: 0, duration: 0.55, ease: OUT, stagger: 0.08 }, t);
const step = (s, t) => tl.fromTo(`${s} .step`, { x: -40, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4, ease: OUT }, t);
const rise = (id, t, d = 0.6) => tl.fromTo(id, { y: 110, opacity: 0, scale: 0.96 }, { y: 0, opacity: 1, scale: 1, duration: d, ease: OUT }, t);
const shake = (id, t) => tl.fromTo(id, { x: 0 }, { x: 8, duration: 0.05, repeat: 5, yoyo: true, ease: 'none' }, t);

// texture: slow blobs across the whole reel
tl.fromTo('#blob1', { x: 0, y: 0 }, { x: 140, y: 90, duration: T.dur / 2, ease: 'sine.inOut', yoyo: true, repeat: 1 }, 0);
tl.fromTo('#blob2', { x: 0, y: 0 }, { x: -120, y: -110, duration: T.dur / 2, ease: 'sine.inOut', yoyo: true, repeat: 1 }, 0);
tl.fromTo('#blob3', { x: 0, y: 0 }, { x: -90, y: 70, duration: T.dur / 2, ease: 'sine.inOut', yoyo: true, repeat: 1 }, 0);

// progress bar: problem, #3, #2, #1, catch, send
tl.set(['#p1', '#p2', '#p3', '#p4', '#p5', '#p6'], { scaleX: 0 }, 0);
[[1, 1], [2, 3], [3, 4], [4, 5], [5, 7], [6, 9]].forEach(([p, n]) => tl.to(`#p${p}`, { scaleX: 1, duration: 0.5, ease: 'power2.out' }, T.at(n)));

// 0. hook: title, PDF and the 3-2-1 badges are on screen at frame 0
tl.fromTo('#s0-title .l', { yPercent: 0 }, { yPercent: 0, duration: 0.01 }, 0);
tl.fromTo('#s0-title', { scale: 1.05 }, { scale: 1, duration: 0.6, ease: OUT }, 0);
tl.fromTo('#s0-doc', { y: 0, rotation: -6 }, { y: -16, rotation: -3, duration: 1.0, ease: 'sine.inOut', yoyo: true, repeat: 1 }, 0);
tl.fromTo(['#s0-rk3', '#s0-rk2', '#s0-rk1'], { scale: 1 }, { scale: 1.14, duration: 0.18, ease: 'power2.out', yoyo: true, repeat: 1, stagger: 0.08 }, at(0, 0.7));

// 1. 40 pages after office: the page counter runs, the text scrolls, HR's message pops
step('#s1', T.at(1)); title('#s1', T.at(1) + 0.05); rise('#s1-card', T.at(1) + 0.15);
const pg = { v: 1 };
tl.fromTo(pg, { v: 1 }, { v: 40, duration: 0.55 * span(1), ease: 'power2.inOut', onUpdate: () => { document.querySelector('#s1-num').textContent = String(Math.round(pg.v)); } }, T.voice(1) + 0.1);
tl.fromTo('#s1-scroll', { y: 0 }, { y: -300, duration: 0.55 * span(1), ease: 'power2.inOut' }, T.voice(1) + 0.1);
tl.fromTo('#s1-pages', { scale: 1 }, { scale: 1.08, duration: 0.15, ease: 'power2.out', yoyo: true, repeat: 1 }, T.voice(1) + 0.1 + 0.55 * span(1));
tl.fromTo('#s1-hr', { y: 40, opacity: 0, scale: 0.9 }, { y: 0, opacity: 1, scale: 1, duration: 0.45, ease: POP }, at(1, 0.6));

// 2. three friends, one PDF: wires draw, friends rise, the same question pops on each
title('#s2', T.at(2));
tl.fromTo('#s2-pdf', { scale: 0.7, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.45, ease: POP }, T.at(2) + 0.1);
tl.fromTo('#s2 .friend', { y: 70, opacity: 0, scale: 0.92 }, { y: 0, opacity: 1, scale: 1, duration: 0.5, ease: OUT, stagger: 0.08 }, at(2, 0.1));
tl.fromTo('#s2 .wire', { strokeDashoffset: 360 }, { strokeDashoffset: 0, duration: 0.5, ease: 'power2.out', stagger: 0.06 }, T.voice(2) + 0.25);
tl.fromTo('#s2 .q', { scale: 0.6, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.35, ease: POP, stagger: 0.07 }, at(2, 0.62));

// 3-5. the ranked card: dashed slots fill from the bottom, 3 then 2 then 1
step('#s3', T.at(3)); title('#s3', T.at(3) + 0.05); rise('#s3-card', T.at(3) + 0.1);
[[3, '#s3-r3', 0.5, at(3, 0.86)], [4, '#s3-r2', 0.66, at(4, 0.58)], [5, '#s3-r1', 0.72, T.voice(5) + 0.7]].forEach(([n, id, lnF, chipT]) => {
  const t = T.voice(n) + 0.15;
  tl.fromTo(`${id} .fill`, { x: 60, opacity: 0 }, { x: 0, opacity: 1, duration: 0.45, ease: OUT }, t);
  tl.fromTo(`${id} .rank`, { scale: 0, rotation: -90 }, { scale: 1, rotation: 0, duration: 0.45, ease: POP }, t + 0.06);
  tl.fromTo(`${id} .ln`, { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 0.45, ease: 'power2.out' }, at(n, lnF));
  tl.fromTo(`${id} .chip`, { scale: 1.7, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.24, ease: SLAM }, chipT);
});
shake('#s3-r3 .chip', at(3, 0.86) + 0.24);
tl.fromTo('#s3-star', { scale: 0, rotation: -120 }, { scale: 1, rotation: 0, duration: 0.45, ease: POP }, T.voice(5) + 0.7);
tl.fromTo('#s3-r1 .fill', { scale: 1 }, { scale: 1.04, duration: 0.18, ease: 'sine.inOut', yoyo: true, repeat: 1 }, T.voice(5) + 0.74);

// 6. payoff: question, answer with a source chip, the cursor taps it, the clause lights green
step('#s6', T.at(6)); title('#s6', T.at(6) + 0.03); rise('#s6-card', T.at(6) + 0.06, 0.5);
tl.fromTo('#s6-q', { scale: 0.7, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.35, ease: POP }, T.at(6) + 0.25);
tl.fromTo('#s6-a', { x: -50, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4, ease: OUT }, T.voice(6) + 0.25);
tl.fromTo('#s6-cursor', { x: 110, y: 150, opacity: 0 }, { x: 0, y: 0, opacity: 1, duration: 0.4, ease: 'power2.inOut' }, T.voice(6) + 0.28);
tl.fromTo('#s6-cursor', { scale: 1 }, { scale: 0.85, duration: 0.1, ease: 'power2.inOut', yoyo: true, repeat: 1 }, T.voice(6) + 0.64);
tl.fromTo('#s6-ring', { scale: 0.6, opacity: 0 }, { scale: 0.9, opacity: 0.9, duration: 0.08, ease: 'power2.out' }, T.voice(6) + 0.7);
tl.to('#s6-ring', { scale: 2.2, opacity: 0, duration: 0.45, ease: 'power2.out' }, T.voice(6) + 0.78);
tl.fromTo('#s6-cite', { scale: 1 }, { scale: 1.2, duration: 0.15, ease: 'power2.out', yoyo: true, repeat: 1 }, T.voice(6) + 0.7);
tl.fromTo('#s6-src', { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: OUT }, T.voice(6) + 0.75);
tl.fromTo('#s6-hl', { scaleX: 0 }, { scaleX: 1, duration: 0.55, ease: 'power3.out' }, T.voice(6) + 0.95);

// 7. the catch: RISK row slams on the thud, then HR and insurer, then the stamp
step('#s7', T.at(7)); title('#s7', T.at(7) + 0.03); rise('#s7-card', T.at(7) + 0.06, 0.45);
tl.fromTo('#s7-k1', { scale: 1.25, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.24, ease: SLAM }, T.voice(7) + 0.02);
shake('#s7-k1', T.voice(7) + 0.27);
tl.fromTo('#s7-k2', { x: 60, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4, ease: OUT }, at(7, 0.48));
tl.fromTo('#s7-k3', { x: 60, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4, ease: OUT }, at(7, 0.7));
tl.fromTo('#s7-stamp', { scale: 2.2, opacity: 0, rotation: -20 }, { scale: 1, opacity: 1, rotation: -7, duration: 0.24, ease: SLAM }, at(7, 0.86));

// 8. hide Aadhaar and policy number: red bars wipe across as each is said, then upload
step('#s8', T.at(8)); title('#s8', T.at(8) + 0.05); rise('#s8-card', T.at(8) + 0.15);
tl.fromTo('#s8 .frow', { x: 50, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4, ease: OUT, stagger: 0.07 }, T.at(8) + 0.3);
tl.fromTo('#s8-m1', { scaleX: 0 }, { scaleX: 1, duration: 0.35, ease: 'power3.out' }, at(8, 0.25));
tl.fromTo('#s8-m2', { scaleX: 0 }, { scaleX: 1, duration: 0.35, ease: 'power3.out' }, at(8, 0.52));
tl.fromTo('#s8-up', { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: POP }, at(8, 0.85));

// 9. send: the plane flies in, the colleague gets ticked, the button presses
tl.fromTo('#s9-send .l', { yPercent: 110 }, { yPercent: 0, duration: 0.55, ease: OUT }, T.at(9));
tl.fromTo('#s9-plane', { x: -220, y: 120, opacity: 0, rotation: -18 }, { x: 0, y: 0, opacity: 1, rotation: 0, duration: 0.7, ease: OUT }, T.at(9) + 0.25);
tl.to('#s9-plane', { x: 24, y: -18, duration: 0.9, ease: 'sine.inOut', yoyo: true, repeat: 1 }, T.at(9) + 1.0);
rise('#s9-card', T.at(9) + 0.3);
tl.fromTo('#s9-c1', { x: 50, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4, ease: OUT }, at(9, 0.28));
tl.fromTo('#s9-c2', { x: 50, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4, ease: OUT }, at(9, 0.36));
tl.fromTo('#s9-tick', { scale: 0 }, { scale: 1, duration: 0.35, ease: POP }, at(9, 0.55));
tl.fromTo('#s9-btn', { scale: 1 }, { scale: 0.94, duration: 0.12, ease: 'power2.inOut', yoyo: true, repeat: 1 }, at(9, 0.9));

// 10. keyword: Save + bookmark, SIMPLE letters drop on the beat, the honest tool card
tl.fromTo('#s10-save .l', { yPercent: 110 }, { yPercent: 0, duration: 0.55, ease: OUT }, T.at(10));
tl.fromTo('#s10-mark', { y: -80, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: 'back.out(1.6)' }, T.at(10) + 0.15);
tl.fromTo('#s10-lbl', { x: -40, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4, ease: OUT }, T.at(10) + 0.1);
tl.fromTo('#s10 .tile', { y: -160, opacity: 0, rotation: -8 }, { y: 0, opacity: 1, rotation: 0, duration: 0.4, ease: 'back.out(1.7)', stagger: T.beat / 4 }, T.voice(10) + 0.1);
rise('#s10-card', at(10, 0.45));
tl.fromTo('#s10 .pc', { scale: 0.6, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.35, ease: POP, stagger: 0.07 }, at(10, 0.62));
tl.fromTo('#s10 .tile', { scale: 1 }, { scale: 1.06, duration: 0.2, ease: 'sine.inOut', yoyo: true, repeat: 1, stagger: 0.05 }, T.end(10) + 0.1);
