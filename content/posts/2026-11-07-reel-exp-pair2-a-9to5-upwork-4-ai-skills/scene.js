// Editorial theme, kind "skills": a ranked list that fills from 4 up to 1 with Upwork growth figures, the favourite kit, the catch, then the roadmap the free prompt gives you.
// Notes for Prashant before publishing (picture only, post.json untouched):
// 1) CapCut is banned in India, so the stage says "Free editor"; the caption's "CapCut" may need changing.
// 2) The +71/154/178/329% figures match Upwork's In-Demand Skills report published Feb 2025.
//    Check the year before the voice says "this year" and the cover says 2026.
// Every selector below is a literal string so the checker can match it to scene.html.
const OUT = 'expo.out', POP = 'back.out(1.8)';
const span = (n) => T.end(n) - T.voice(n);
const at = (n, f) => T.voice(n) + f * span(n);
const title = (sel, t) => tl.fromTo(sel, { yPercent: 110 }, { yPercent: 0, duration: 0.55, ease: OUT, stagger: 0.08 }, t);
const kick = (sel, t) => tl.fromTo(sel, { x: -40, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4, ease: OUT }, t);
const rise = (sel, t) => tl.fromTo(sel, { y: 110, opacity: 0, scale: 0.96 }, { y: 0, opacity: 1, scale: 1, duration: 0.6, ease: OUT }, t);
const count = (sel, to, t, d) => {
  const el = document.querySelector(sel);
  const o = { v: 0 };
  tl.fromTo(o, { v: 0 }, { v: to, duration: d, ease: 'power2.out', onUpdate: () => { el.textContent = '+' + Math.round(o.v) + '%'; } }, t);
};

// texture: two soft blobs drift across the whole reel
tl.fromTo('#blob1', { x: 0, y: 0 }, { x: 260, y: 180, duration: T.dur, ease: 'sine.inOut' }, 0);
tl.fromTo('#blob2', { x: 0, y: 0 }, { x: -240, y: -220, duration: T.dur, ease: 'sine.inOut' }, 0);

// progress bar: one segment per beat after the hook
tl.set(['#p1', '#p2', '#p3', '#p4', '#p5', '#p6', '#p7'], { scaleX: 0 }, 0);
[['#p1', 1], ['#p2', 2], ['#p3', 3], ['#p4', 4], ['#p5', 5], ['#p6', 6], ['#p7', 7]].forEach(([id, n]) => tl.to(id, { scaleX: 1, duration: 0.5, ease: 'power2.out' }, T.at(n)));

// 0. hook: "4 AI skills clients want" is on screen at frame 0
tl.fromTo('#s0-title .l', { yPercent: 0 }, { yPercent: 0, duration: 0.01 }, 0);
tl.fromTo('#s0-title', { scale: 1.05 }, { scale: 1, duration: 0.6, ease: OUT }, 0);
tl.fromTo('#s0-hand', { rotation: 0, svgOrigin: '22 22' }, { rotation: 300, svgOrigin: '22 22', duration: 4.2, ease: 'power2.inOut' }, 0.2);
tl.fromTo('#s0-chip', { scale: 1 }, { scale: 1.06, duration: 0.18, yoyo: true, repeat: 1, ease: 'sine.inOut' }, at(0, 0.2));
tl.fromTo('#s0-under', { scaleX: 0, rotation: -1.5 }, { scaleX: 1, rotation: -1.5, duration: 0.45, ease: 'power3.out' }, at(0, 0.5));

// 1-4. the countdown: dashed slots, then each skill fills its row as it is said, the count runs, the bar grows
kick('#s1-kick', T.at(1)); title('#s1-title .l', T.at(1) + 0.05); rise('#s1-card', T.at(1) + 0.15);
tl.fromTo('#s1 .slot', { x: 40, opacity: 0 }, { x: 0, opacity: 1, duration: 0.35, ease: OUT, stagger: 0.06 }, T.at(1) + 0.35);
tl.fromTo('#s1-head', { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 0.6, ease: 'steps(14)' }, T.voice(1) + 0.15);

const fillRow = (row, rk, pc, bar, t, to, frac, tb) => {
  tl.fromTo(row, { x: 70, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4, ease: OUT }, t);
  tl.fromTo(rk, { scale: 0 }, { scale: 1, duration: 0.4, ease: POP }, t + 0.06);
  count(pc, to, t + 0.1, 0.7);
  tl.fromTo(bar, { scaleX: 0 }, { scaleX: frac, duration: 0.6, ease: 'power2.out' }, tb);
};
fillRow('#f4', '#rk4', '#pc4', '#b4', T.voice(1) + 0.9, 71, 71 / 329, at(1, 0.78));
fillRow('#f3', '#rk3', '#pc3', '#b3', T.voice(2) + 0.3, 154, 154 / 329, at(2, 0.7));
fillRow('#f2', '#rk2', '#pc2', '#b2', T.voice(3) + 0.3, 178, 178 / 329, at(3, 0.65));

// number 1 slams in, its +329% stamps on, the bar fills the whole track before the cover frame
tl.fromTo('#f1', { scale: 1.25, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.25, ease: 'power4.in' }, T.at(4) + 0.5);
tl.fromTo('#rk1', { rotation: -90 }, { rotation: 0, duration: 0.4, ease: POP }, T.at(4) + 0.6);
tl.fromTo('#pc1', { scale: 2.2, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.22, ease: 'power4.in' }, T.at(4) + 1.05);
tl.fromTo('#b1', { scaleX: 0 }, { scaleX: 1, duration: 0.4, ease: 'power3.out' }, T.at(4) + 0.95);
tl.fromTo('#f1', { y: 0 }, { y: -10, duration: 0.18, yoyo: true, repeat: 1, ease: 'sine.inOut' }, at(4, 0.75));

// 5. the favourite: what you need to start, ticked as it is said
kick('#s5-kick', T.at(5)); title('#s5-title .l', T.at(5) + 0.05); rise('#s5-card', T.at(5) + 0.15);
tl.fromTo('#s5-star', { scale: 0, rotation: -90 }, { scale: 1, rotation: 0, duration: 0.45, ease: POP }, T.voice(5) + 0.2);
tl.fromTo('#s5-thumb', { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: OUT }, T.at(5) + 0.35);
[['#s5-r1', '#s5-t1', 0.42], ['#s5-r2', '#s5-t2', 0.68], ['#s5-r3', '#s5-t3', 0.86]].forEach(([r, k, f]) => {
  tl.fromTo(r, { x: 50, opacity: 0 }, { x: 0, opacity: 1, duration: 0.35, ease: OUT }, at(5, f));
  tl.fromTo(k, { scale: 0 }, { scale: 1, duration: 0.35, ease: POP }, at(5, f) + 0.15);
});
tl.fromTo('#s5-play', { scale: 0.6, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: POP }, at(5, 0.7));

// 6. the catch: NOT PAY slams on the thud, then the weeks fill one by one
kick('#s6-kick', T.at(6)); title('#s6-title .l', T.at(6) + 0.05); rise('#s6-card', T.at(6) + 0.15);
tl.fromTo('#s6-r1', { x: 50, opacity: 0 }, { x: 0, opacity: 1, duration: 0.35, ease: OUT }, T.voice(6) + 0.05);
tl.fromTo('#s6-chip', { scale: 1.9, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.22, ease: 'power4.in' }, T.voice(6) + 0.28);
tl.fromTo('#s6-chip', { x: 0 }, { x: 8, duration: 0.05, repeat: 5, yoyo: true, ease: 'none' }, T.voice(6) + 0.5);
tl.fromTo('#s6-r2', { x: 50, opacity: 0 }, { x: 0, opacity: 1, duration: 0.35, ease: OUT }, at(6, 0.5));
tl.fromTo(['#wf1', '#wf2', '#wf3', '#wf4'], { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.3, ease: POP, stagger: 0.18 }, at(6, 0.62));

// 7. send this: the roadmap the prompt gives you, then the keyword drops in letter by letter
kick('#s7-kick', T.at(7)); title('#s7-title .l', T.at(7) + 0.05); rise('#s7-card', T.at(7) + 0.15);
tl.fromTo('#s7 .rrow', { x: 50, opacity: 0 }, { x: 0, opacity: 1, duration: 0.35, ease: OUT, stagger: 0.07 }, T.voice(7) + 0.4);
tl.fromTo('#s7 .tk', { scale: 0 }, { scale: 1, duration: 0.35, ease: POP, stagger: 0.07 }, T.voice(7) + 0.6);
tl.fromTo('#s7-pill', { scale: 0.7, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.45, ease: POP }, at(7, 0.68));
tl.fromTo('#s7-word .lt', { yPercent: -120, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.4, ease: 'back.out(2)', stagger: 0.07 }, at(7, 0.76));
tl.fromTo('#s7-word', { scale: 1 }, { scale: 1.08, duration: 0.18, yoyo: true, repeat: 1, ease: 'sine.inOut' }, T.end(7) - 0.4);
tl.fromTo('#s7-free', { scale: 0, rotation: -30 }, { scale: 1, rotation: -8, duration: 0.4, ease: POP }, T.end(7) - 0.1);
