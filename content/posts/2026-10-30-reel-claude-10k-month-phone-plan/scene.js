// Editorial theme, kind "prompt": the prompt types in, 4 answer cards fill their slots on the pops,
// a labelled ₹10,000 target counts up and gets a NOT EARNED stamp, the catch in weeks, send, then the keyword.
// Every animated id is written out in full so the checker can match it to scene.html.
const OUT = 'expo.out', POP = 'back.out(1.8)';
const span = (n) => T.end(n) - T.voice(n);
const at = (n, f) => T.voice(n) + f * span(n);
const title = (s, t) => tl.fromTo(s + ' .title .l', { yPercent: 110 }, { yPercent: 0, duration: 0.55, ease: OUT, stagger: 0.08 }, t);
const step = (s, t) => tl.fromTo(s + ' .step', { x: -40, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4, ease: OUT }, t);
const card = (id, t) => tl.fromTo(id, { y: 110, opacity: 0, scale: 0.96 }, { y: 0, opacity: 1, scale: 1, duration: 0.6, ease: OUT }, t);

// texture: two soft blobs drift across the whole reel
tl.fromTo('#blob1', { x: 0, y: 0 }, { x: 160, y: 120, duration: T.dur, ease: 'sine.inOut' }, 0);
tl.fromTo('#blob2', { x: 0, y: 0 }, { x: -140, y: -160, duration: T.dur, ease: 'sine.inOut' }, 0);

// progress bar: one segment per beat after the hook
tl.set(['#p1', '#p2', '#p3', '#p4', '#p5', '#p6'], { scaleX: 0 }, 0);
[['#p1', 1], ['#p2', 2], ['#p3', 3], ['#p4', 5], ['#p5', 6], ['#p6', 7]].forEach(([p, n]) => tl.to(p, { scaleX: 1, duration: 0.5, ease: 'power2.out' }, T.at(n)));

// 0. hook: title and ₹10,000 chip on screen at frame 0
tl.fromTo('#s0-title .l', { yPercent: 0 }, { yPercent: 0, duration: 0.01 }, 0);
tl.fromTo('#s0-title', { scale: 1.05 }, { scale: 1, duration: 0.6, ease: OUT, transformOrigin: 'left center' }, 0);
tl.fromTo('#s0-step', { opacity: 0.6 }, { opacity: 1, duration: 0.3 }, 0);
tl.fromTo('#s0-chip', { scale: 1.2 }, { scale: 1, duration: 0.4, ease: POP }, 0);
tl.to('#s0-chip', { scale: 1.08, duration: 0.15, yoyo: true, repeat: 1, ease: 'power2.out' }, at(0, 0.62));

// 1. the prompt: card rises, lines type in, constraint chips pop on the words, SEND presses
step('#s1', T.at(1)); title('#s1', T.at(1) + 0.05); card('#s1-card', T.at(1) + 0.12);
[['#s1-l1', 21], ['#s1-l2', 21], ['#s1-l3', 21], ['#s1-l4', 22], ['#s1-l5', 13]].forEach(([id, n], i) => tl.fromTo(id, { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 0.3, ease: 'steps(' + n + ')' }, T.at(1) + 0.35 + i * 0.3));
[['#s1-c1', 0.3], ['#s1-c2', 0.55], ['#s1-c3', 0.82]].forEach(([id, f]) => tl.fromTo(id, { scale: 0.6, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.35, ease: POP }, at(1, f)));
tl.fromTo('#s1-hint', { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 0.4, ease: OUT }, T.at(1) + 0.9);
tl.fromTo('#s1-go', { scale: 1 }, { scale: 0.9, duration: 0.1, yoyo: true, repeat: 1, ease: 'power2.inOut' }, T.end(1) - 0.2);

// 2. four cards: dashed slots appear, each card pops into its slot on the pop sounds
step('#s2', T.at(2)); title('#s2', T.at(2) + 0.05);
tl.fromTo(['#s2-s1', '#s2-s2', '#s2-s3', '#s2-s4'], { opacity: 0, scale: 0.94 }, { opacity: 1, scale: 1, duration: 0.4, ease: OUT, stagger: 0.06 }, T.at(2) + 0.12);
[
  ['#s2-c1', '#s2-c1 .gn', '#s2-c1 .gv', 0.4],
  ['#s2-c2', '#s2-c2 .gn', '#s2-c2 .gv', 1.1],
  ['#s2-c3', '#s2-c3 .gn', '#s2-c3 .gv', 1.8],
  ['#s2-c4', '#s2-c4 .gn', '#s2-c4 .gv', 2.5]
].forEach(([id, gn, gv, d]) => {
  const t = T.voice(2) + d;
  tl.fromTo(id, { scale: 0.6, opacity: 0, y: 40 }, { scale: 1, opacity: 1, y: 0, duration: 0.42, ease: POP }, t - 0.06);
  tl.fromTo(gn, { scale: 0, rotation: -90 }, { scale: 1, rotation: 0, duration: 0.4, ease: POP }, t + 0.05);
  tl.fromTo(gv, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.35, ease: OUT }, t + 0.12);
});

// 3. the total: example label, counter to ₹10,000, the track fills
step('#s3', T.at(3)); title('#s3', T.at(3) + 0.05); card('#s3-card', T.at(3) + 0.12);
tl.fromTo('#s3-k', { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 0.4, ease: OUT }, T.at(3) + 0.3);
tl.fromTo('#s3-ex', { scale: 0.6, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.35, ease: POP }, T.at(3) + 0.45);
const total = { v: 0 };
tl.fromTo(total, { v: 0 }, {
  v: 10000, duration: 0.9, ease: 'power2.out',
  onUpdate: () => {
    const r = Math.round(total.v / 50) * 50;
    const th = Math.floor(r / 1000), rest = r % 1000;
    const el = document.querySelector('#s3-num');
    if (el) el.textContent = th > 0 ? '₹' + th + ',' + String(rest).padStart(3, '0') : '₹' + rest;
  }
}, T.voice(3) + 0.1);
tl.fromTo('#s3-fill', { scaleX: 0 }, { scaleX: 1, duration: 0.9, ease: 'power2.out' }, T.voice(3) + 0.1);
tl.fromTo('#s3-row', { x: 50, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4, ease: OUT }, at(3, 0.45));

// 4. not money I earned: the stamp slams under the card, the card shakes
tl.fromTo('#s3-stamp', { scale: 2.2, opacity: 0, rotation: -20 }, { scale: 1, opacity: 1, rotation: -8, duration: 0.24, ease: 'power4.in' }, at(4, 0.55));
tl.fromTo('#s3-card', { x: 0 }, { x: 8, duration: 0.05, repeat: 5, yoyo: true, ease: 'none' }, at(4, 0.55) + 0.24);

// 5. the catch: rows land, WEEKS slams, the weeks fill slowly
step('#s5', T.at(5)); title('#s5', T.at(5) + 0.05); card('#s5-card', T.at(5) + 0.12);
tl.fromTo('#s5-r1', { x: 60, opacity: 0 }, { x: 0, opacity: 1, duration: 0.35, ease: OUT }, T.at(5) + 0.3);
tl.fromTo('#s5-r2', { x: 60, opacity: 0 }, { x: 0, opacity: 1, duration: 0.35, ease: OUT }, T.voice(5) + 0.3);
tl.fromTo('#s5-c2', { scale: 1.9, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.24, ease: 'power4.in' }, T.voice(5) + 0.36);
tl.fromTo('#s5-c2', { x: 0 }, { x: 8, duration: 0.05, repeat: 5, yoyo: true, ease: 'none' }, T.voice(5) + 0.6);
['#s5-w1', '#s5-w2', '#s5-w3', '#s5-w4'].forEach((id, i) => tl.fromTo(id, { scaleX: 0 }, { scaleX: 1, duration: 0.6, ease: 'power2.inOut' }, T.voice(5) + 0.9 + i * 0.55));
tl.fromTo('#s5 .title', { scale: 1 }, { scale: 1.04, duration: 0.15, yoyo: true, repeat: 1, ease: 'power2.out', transformOrigin: 'left center' }, at(5, 0.55));
tl.fromTo('#s5-r3', { x: 60, opacity: 0 }, { x: 0, opacity: 1, duration: 0.35, ease: OUT }, at(5, 0.68));

// 6. send: share sheet, ticks pop, SEND presses
step('#s6', T.at(6)); title('#s6', T.at(6) + 0.05); card('#s6-card', T.at(6) + 0.12);
['#s6-r1', '#s6-r2', '#s6-r3'].forEach((id, i) => tl.fromTo(id, { x: 50, opacity: 0 }, { x: 0, opacity: 1, duration: 0.35, ease: OUT }, T.at(6) + 0.35 + i * 0.07));
[['#s6-t1', 0.3], ['#s6-t2', 0.5], ['#s6-t3', 0.66]].forEach(([id, f]) => tl.fromTo(id, { scale: 0 }, { scale: 1, duration: 0.3, ease: POP }, at(6, f)));
tl.fromTo('#s6-btn', { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: OUT }, at(6, 0.72));
tl.to('#s6-btn', { scale: 0.92, duration: 0.1, yoyo: true, repeat: 1, ease: 'power2.inOut' }, T.end(6) - 0.25);

// 7. save + keyword: bookmark drops, MONEY letters fall in, pill and sticker pop
tl.fromTo('#s7-save', { yPercent: 40, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.5, ease: OUT }, T.at(7));
tl.fromTo('#s7-mark', { y: -60, opacity: 0, scale: 0.8 }, { y: 0, opacity: 1, scale: 1, duration: 0.45, ease: POP }, T.at(7) + 0.15);
tl.fromTo('#s7-word .ch', { yPercent: -120, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.4, ease: POP, stagger: 0.04 }, T.at(7) + 0.1);
tl.fromTo('#s7-word', { scale: 1 }, { scale: 1.06, duration: 0.15, yoyo: true, repeat: 1, ease: 'power2.out', transformOrigin: 'left center' }, at(7, 0.35));
tl.fromTo('#s7-pill', { scale: 0.6, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.45, ease: POP }, at(7, 0.6));
tl.fromTo('#s7-tag', { scale: 0.5, opacity: 0, rotation: -12 }, { scale: 1, opacity: 1, rotation: -4, duration: 0.4, ease: POP }, at(7, 0.85));
tl.to('#s7-mark', { y: -10, duration: 0.6, yoyo: true, repeat: 1, ease: 'sine.inOut' }, T.end(7));
