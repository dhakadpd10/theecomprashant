// Editorial skit: a 7-day bar fills as the week wears on, the thank-you card decays (handwritten, Thx, blank), the review lands, the twist stamps DAY 1.
const OUT = 'expo.out', POP = 'back.out(1.8)';
const span = (n) => T.end(n) - T.voice(n);
const at = (n, f) => T.voice(n) + f * span(n);
const title = (s, t) => tl.fromTo(`${s} .title .l`, { yPercent: 110 }, { yPercent: 0, duration: 0.55, ease: OUT, stagger: 0.08 }, t);
const step = (s, t) => tl.fromTo(`${s} .step`, { x: -40, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4, ease: OUT }, t);

// texture: slow drifting colour blobs across the whole reel
tl.fromTo('#blob1', { x: 0, y: 0 }, { x: 160, y: 120, duration: T.dur, ease: 'sine.inOut' }, 0);
tl.fromTo('#blob2', { x: 0, y: 0 }, { x: -180, y: -90, duration: T.dur, ease: 'sine.inOut' }, 0);

// the week bar: day 1, then days 2 to 4, then days 5 to 7
tl.set(['#d1', '#d2', '#d3', '#d4', '#d5', '#d6', '#d7'], { scaleX: 0 }, 0);
tl.to('#d1', { scaleX: 1, duration: 0.5, ease: 'power2.out' }, T.at(1));
tl.to(['#d2', '#d3', '#d4'], { scaleX: 1, duration: 0.35, ease: 'power2.out', stagger: 0.08 }, T.at(3));
tl.to(['#d5', '#d6', '#d7'], { scaleX: 1, duration: 0.35, ease: 'power2.out', stagger: 0.08 }, T.at(4));

// 0. hook: title, both parcels and the question mark are on screen at frame 0
tl.fromTo('#s0-title', { scale: 1.05 }, { scale: 1, duration: 0.6, ease: OUT }, 0);
tl.fromTo('#s0-q', { rotation: -8 }, { rotation: 8, duration: 0.3, ease: 'sine.inOut', yoyo: true, repeat: 7 }, 0.1);
tl.fromTo('#s0-a', { y: 0 }, { y: -16, duration: 0.22, ease: 'power2.out', yoyo: true, repeat: 1 }, T.voice(0) + 0.5);
tl.fromTo('#s0-b', { y: 0 }, { y: -16, duration: 0.22, ease: 'power2.out', yoyo: true, repeat: 1 }, T.voice(0) + 1.9);
const q = T.voice(0) + 3.0;
tl.fromTo('#s0-q', { scale: 1 }, { scale: 0.9, duration: 0.12, ease: 'power2.in' }, q);
tl.to('#s0-q', { scale: 1.25, duration: 0.3, ease: POP }, q + 0.12);
tl.to('#s0-q', { scale: 1, duration: 0.3, ease: 'power2.inOut' }, q + 0.6);

// 1. day 1: each item pops in as it is said
step('#s1', T.at(1)); title('#s1', T.at(1) + 0.05);
[['#c1', 0.33], ['#c2', 0.6], ['#c3', 0.77], ['#c4', 0.9]].forEach(([id, f]) => {
  tl.fromTo(id, { y: 20, opacity: 0, scale: 0.9 }, { y: 0, opacity: 1, scale: 1, duration: 0.35, ease: POP }, at(1, f));
  tl.fromTo(`${id} .tick`, { scale: 0 }, { scale: 1, duration: 0.3, ease: POP }, at(1, f) + 0.06);
});

// 2. the story photo: viewfinder closes in, REC blinks, the flash fires
tl.fromTo('#s1 .vf', { scale: 1.4, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: OUT, stagger: 0.05 }, T.at(2));
tl.fromTo('#s1-story', { x: 40, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4, ease: OUT }, T.at(2) + 0.1);
tl.fromTo('#s1-rec', { opacity: 1 }, { opacity: 0.2, duration: 0.3, ease: 'sine.inOut', yoyo: true, repeat: 5 }, T.at(2) + 0.5);
const snap = at(2, 0.42);
tl.fromTo('#s1-grid', { scale: 1 }, { scale: 0.97, duration: 0.1, ease: 'power2.in' }, snap - 0.1);
tl.to('#s1-grid', { scale: 1, duration: 0.35, ease: POP }, snap);
tl.fromTo('#s1-flash', { opacity: 0 }, { opacity: 0.9, duration: 0.08, ease: 'power2.out' }, snap);
tl.to('#s1-flash', { opacity: 0, duration: 0.45, ease: 'power2.out' }, snap + 0.08);

// 3. day 4: the extras get struck off, the card just says Thx (pop sfx at voice+0.9)
step('#s3', T.at(3)); title('#s3', T.at(3) + 0.05);
tl.fromTo('#s3-note', { y: 80, opacity: 0, rotation: 4 }, { y: 0, opacity: 1, rotation: -3, duration: 0.6, ease: OUT }, T.at(3) + 0.15);
tl.fromTo(['#s3-k1', '#s3-k2'], { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.35, ease: OUT, stagger: 0.07 }, T.at(3) + 0.3);
tl.fromTo('#s3-k1 .strike', { scaleX: 0 }, { scaleX: 1, duration: 0.3, ease: 'power2.out' }, T.voice(3) + 0.35);
tl.fromTo('#s3-k2 .strike', { scaleX: 0 }, { scaleX: 1, duration: 0.3, ease: 'power2.out' }, T.voice(3) + 0.5);
tl.fromTo('#s3-thx', { scale: 1.8, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.25, ease: 'power4.in' }, T.voice(3) + 0.65);
tl.fromTo('#s3-note', { scale: 1 }, { scale: 1.04, duration: 0.15, ease: 'power2.out', yoyo: true, repeat: 1 }, T.voice(3) + 0.9);

// 4. day 7: the card is blank, it shakes on "blank"
step('#s4', T.at(4)); title('#s4', T.at(4) + 0.05);
tl.fromTo('#s4-note', { y: 80, opacity: 0, rotation: -4 }, { y: 0, opacity: 1, rotation: 2, duration: 0.6, ease: OUT }, T.at(4) + 0.15);
tl.fromTo('#s4-note', { x: 0 }, { x: 8, duration: 0.05, ease: 'none', yoyo: true, repeat: 6 }, at(4, 0.8));

// 5. asleep in a carton, the tape gun keeps running (buzz sfx at voice+0.5)
tl.to('#s4-note', { y: 60, opacity: 0, duration: 0.25, ease: 'power3.in' }, T.at(5));
tl.fromTo('#s4-box', { y: 100, opacity: 0, scale: 0.94 }, { y: 0, opacity: 1, scale: 1, duration: 0.55, ease: OUT }, T.at(5) + 0.15);
tl.fromTo('#s4-gun', { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.3, ease: OUT }, T.at(5) + 0.15);
tl.fromTo('#s4-tape', { scaleX: 0 }, { scaleX: 1, duration: span(5) - 0.5, ease: 'none' }, T.voice(5) + 0.5);
tl.fromTo('#s4-gun', { x: 0 }, { x: 6, duration: 0.05, ease: 'none', yoyo: true, repeat: 7 }, T.voice(5) + 0.5);
tl.fromTo('#s4-gun', { x: 0 }, { x: 6, duration: 0.05, ease: 'none', yoyo: true, repeat: 7 }, T.voice(5) + 2.0);
['#s4-z1', '#s4-z2', '#s4-z3'].forEach((id, i) => {
  const t0 = T.voice(5) + 0.3 + i * 0.25;
  tl.fromTo(id, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: OUT }, t0);
  tl.fromTo(id, { y: 0 }, { y: -12, duration: 0.6, ease: 'sine.inOut', yoyo: true, repeat: 3 }, t0 + 0.6);
});

// 6. next morning: the review drops in (ding at voice), stars pop, the quote blurs in, "handwritten" gets marked
step('#s6', T.at(6));
tl.fromTo('#s6-card', { y: -60, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: OUT }, T.at(6));
tl.fromTo('#s6 .star', { scale: 0, rotation: -30 }, { scale: 1, rotation: 0, duration: 0.35, ease: POP, stagger: 0.07 }, T.voice(6) + 0.3);
tl.fromTo('#s6-ex', { opacity: 0 }, { opacity: 1, duration: 0.3, ease: 'power2.out' }, T.voice(6) + 0.4);
tl.fromTo('#s6-quote', { opacity: 0, filter: 'blur(12px)' }, { opacity: 1, filter: 'blur(0px)', duration: 0.5, ease: 'power3.out' }, at(6, 0.45));
tl.fromTo('#s6-hl', { backgroundSize: '0% 40%' }, { backgroundSize: '100% 40%', duration: 0.4, ease: 'power2.out' }, at(6, 0.72));

// 7. the twist: DAY 1 stamp slams (thud at voice+0.6), then 6 days of transit count up
step('#s7', T.at(7));
tl.fromTo('#s7-card', { x: 60, opacity: 0 }, { x: 0, opacity: 1, duration: 0.55, ease: OUT }, T.at(7) + 0.1);
tl.fromTo(['#s7-r1', '#s7-r2'], { x: 30, opacity: 0 }, { x: 0, opacity: 1, duration: 0.35, ease: OUT, stagger: 0.07 }, T.at(7) + 0.3);
tl.fromTo('#s7-num', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.45, ease: OUT }, T.at(7) + 0.05);
tl.fromTo('#s7-stamp', { scale: 2.2, opacity: 0, rotation: -4 }, { scale: 1, opacity: 1, rotation: -10, duration: 0.25, ease: 'power4.in' }, T.voice(7) + 0.35);
tl.fromTo('#s7-card', { y: 0 }, { y: 6, duration: 0.06, ease: 'none', yoyo: true, repeat: 3 }, T.voice(7) + 0.6);
const tr = { d: 0 };
tl.fromTo(tr, { d: 0 }, { d: 6, duration: 0.35 * span(7), ease: 'power1.inOut', onUpdate: () => { document.getElementById('s7-num').textContent = String(Math.round(tr.d)); } }, at(7, 0.45));
tl.fromTo('#s7-dot', { x: 0 }, { x: 322, duration: 0.35 * span(7), ease: 'power1.inOut' }, at(7, 0.45));
tl.fromTo('#s7-unit', { opacity: 0 }, { opacity: 1, duration: 0.3, ease: 'power2.out' }, at(7, 0.45));
tl.fromTo('#s7-num', { scale: 1 }, { scale: 1.05, duration: 0.15, ease: 'power2.out', yoyo: true, repeat: 1 }, at(7, 0.8));

// 8. save + comment PACK, the three tabs the sheet gives you
tl.fromTo('#s8-save .l', { yPercent: 110 }, { yPercent: 0, duration: 0.55, ease: OUT }, T.at(8));
tl.fromTo('#s8-mark', { y: -120, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: 'bounce.out' }, T.at(8) + 0.25);
tl.fromTo('#s8-pill', { scale: 0.6, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.45, ease: POP }, T.at(8) + 0.05);
tl.fromTo('#s8-pill .lt', { yPercent: -120, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.35, ease: POP, stagger: 0.06 }, T.voice(8) + 0.5 * T.beat);
tl.fromTo('#s8-tabs .tab', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: OUT, stagger: 0.07 }, at(8, 0.55));
tl.fromTo('#s8-pill', { scale: 1 }, { scale: 1.05, duration: 0.3, ease: 'sine.inOut', yoyo: true, repeat: 3 }, T.end(8));
