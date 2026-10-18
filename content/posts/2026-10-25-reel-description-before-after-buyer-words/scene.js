// Same kurta, two descriptions. Hero = the page being rewritten; support = reviews, rows, bars; texture = drifting blobs + dot grid.
// Every selector is written out in full (no template strings) so the checker can match each id.
const OUT = 'expo.out', POP = 'back.out(1.8)', IN = 'power3.in', SLAM = 'power4.in';
const span = (n) => T.end(n) - T.voice(n);
const at = (n, f) => T.voice(n) + f * span(n);

// texture: background drifts for the whole reel
tl.fromTo('#blobA', { x: 0, y: 0 }, { x: 240, y: 260, duration: T.dur, ease: 'sine.inOut' }, 0);
tl.fromTo('#blobB', { x: 0, y: 0 }, { x: -260, y: -220, duration: T.dur, ease: 'sine.inOut' }, 0);
tl.fromTo('#blobC', { x: 0, y: 0 }, { x: 180, y: -160, duration: T.dur, ease: 'sine.inOut' }, 0);

// 0. hook: title and generic chips on screen at frame one; strike, stamp, chips fade
tl.fromTo('#s0-title', { scale: 1.06 }, { scale: 1, duration: 0.5, ease: OUT }, 0);
tl.fromTo('#s0 .chip', { y: 24 }, { y: 0, duration: 0.45, ease: OUT, stagger: 0.05 }, 0);
tl.fromTo('#s0-strike', { scaleX: 0 }, { scaleX: 1, duration: 0.32, ease: 'power3.out' }, T.voice(0) + 0.95);
tl.fromTo('#s0-stamp', { scale: 2.4, rotation: -18, opacity: 0 }, { scale: 1, rotation: -6, opacity: 1, duration: 0.26, ease: SLAM }, T.voice(0) + 1.3);
tl.fromTo('#s0-chips', { x: 0 }, { x: 10, duration: 0.05, repeat: 5, yoyo: true, ease: 'none' }, T.voice(0) + 1.56);
tl.fromTo('#s0 .chip:not(.hot)', { opacity: 1 }, { opacity: 0.45, duration: 0.3, ease: 'power2.out', stagger: 0.04 }, T.voice(0) + 2.1);
tl.fromTo('#s0 .chip.hot', { scale: 1 }, { scale: 1.1, duration: 0.15, yoyo: true, repeat: 1, ease: 'power2.out' }, T.voice(0) + 2.3);

// 1. the example page: generic phrases light up as they are read, then SAYS NOTHING
tl.fromTo('#s1-tab', { x: -60, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4, ease: OUT }, T.at(1));
tl.fromTo('#s1-card', { y: 180, rotation: 3, opacity: 0 }, { y: 0, rotation: 0, opacity: 1, duration: 0.6, ease: OUT }, T.at(1) + 0.05);
tl.fromTo('#s1-kurta', { scale: 0.8 }, { scale: 1, duration: 0.45, ease: POP }, T.at(1) + 0.3);
tl.fromTo('#s1 .dl', { x: 30, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4, ease: OUT, stagger: 0.08 }, T.at(1) + 0.45);
tl.fromTo('#s1-d1 .hl', { scaleX: 0 }, { scaleX: 1, duration: 0.3, ease: 'power3.out' }, at(1, 0.34));
tl.fromTo('#s1-d2 .hl', { scaleX: 0 }, { scaleX: 1, duration: 0.3, ease: 'power3.out' }, at(1, 0.56));
tl.fromTo('#s1-d3 .hl', { scaleX: 0 }, { scaleX: 1, duration: 0.3, ease: 'power3.out' }, at(1, 0.72));
tl.fromTo('#s1-stamp', { scale: 2.4, rotation: -20, opacity: 0 }, { scale: 1, rotation: -8, opacity: 1, duration: 0.26, ease: SLAM }, T.end(1) - 0.5);
tl.fromTo('#s1-card', { x: 0 }, { x: 14, duration: 0.05, repeat: 6, yoyo: true, ease: 'none' }, T.end(1) - 0.22);

// 2. reviews arrive, counter runs, old copy is struck and wiped
tl.fromTo('#s2 .rv', { y: -140, opacity: 0, rotation: 0 }, { y: 0, opacity: 1, rotation: (i) => [-7, 2, 8][i], duration: 0.45, ease: POP, stagger: 0.07 }, T.at(2));
tl.fromTo('#s2-card', { y: 180, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: OUT }, T.at(2) + 0.12);
tl.fromTo('#s2-old .os', { scaleX: 0 }, { scaleX: 1, duration: 0.28, ease: 'power3.out', stagger: 0.08 }, T.voice(2) + 0.3);
const n20 = { v: 0 };
tl.fromTo(n20, { v: 0 }, { v: 20, duration: 1.0, ease: 'power2.out', onUpdate: () => { document.getElementById('s2-count').textContent = String(Math.round(n20.v)); } }, T.voice(2) + 0.8);
tl.fromTo('#s2-cl', { x: 30, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4, ease: OUT }, T.voice(2) + 0.9);
tl.fromTo('#s2-old', { clipPath: 'inset(0 0% 0 0)' }, { clipPath: 'inset(0 100% 0 0)', duration: 0.3, ease: IN }, T.voice(2) + 2.3);
tl.fromTo('#s2 .row', { x: -80, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4, ease: OUT, stagger: 0.07 }, T.voice(2) + 2.5);

// 3. each buyer phrase fills its slot on the pop
const fillRow = (s, t) => {
  tl.fromTo('#s2-rv3', { scale: 1 }, { scale: 1.08, duration: 0.1, yoyo: true, repeat: 1, ease: 'power2.out' }, t - 0.12);
  tl.fromTo(s.fill, { opacity: 0 }, { opacity: 1, duration: 0.15, ease: 'power1.out' }, t - 0.05);
  tl.fromTo(s.qb, { scale: 0 }, { scale: 1, duration: 0.35, ease: POP }, t - 0.05);
  tl.fromTo(s.t, { opacity: 0, y: 24, filter: 'blur(12px)' }, { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.4, ease: OUT }, t);
  tl.fromTo(s.row, { scale: 1 }, { scale: 1.04, duration: 0.12, yoyo: true, repeat: 1, ease: 'power2.out' }, t + 0.05);
};
fillRow({ row: '#s2-b1', fill: '#s2-b1 .fill', qb: '#s2-b1 .qb', t: '#s2-b1 .t' }, T.voice(3) + 0.9);
fillRow({ row: '#s2-b2', fill: '#s2-b2 .fill', qb: '#s2-b2 .qb', t: '#s2-b2 .t' }, T.voice(3) + 1.9);
fillRow({ row: '#s2-b3', fill: '#s2-b3 .fill', qb: '#s2-b3 .qb', t: '#s2-b3 .t' }, T.voice(3) + 3.0);
tl.fromTo('#s2-card', { scale: 1 }, { scale: 1.03, duration: 0.15, yoyo: true, repeat: 1, ease: 'power2.out' }, T.voice(3) + 3.7);

// 4. the tool: two inputs type in, REWRITE presses, the answer card slides up
tl.fromTo('#s4 .kicker .l', { yPercent: 110 }, { yPercent: 0, duration: 0.5, ease: OUT, stagger: 0.08 }, T.at(4));
tl.fromTo('#s4-win', { y: 220, opacity: 0 }, { y: 0, opacity: 1, duration: 0.55, ease: OUT }, T.at(4) + 0.1);
tl.fromTo('#s4 .inp', { x: -60, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4, ease: OUT, stagger: 0.07 }, T.at(4) + 0.35);
tl.fromTo('#s4-in1 .t', { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 0.55, ease: 'steps(16)' }, T.voice(4) + 0.9);
tl.fromTo('#s4-in1 .ic', { scale: 1 }, { scale: 1.15, duration: 0.12, yoyo: true, repeat: 1, ease: 'power2.out' }, T.voice(4) + 1.45);
tl.fromTo('#s4-in2 .t', { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 0.7, ease: 'steps(21)' }, T.voice(4) + 1.7);
tl.fromTo('#s4-in2 .ic', { scale: 1 }, { scale: 1.15, duration: 0.12, yoyo: true, repeat: 1, ease: 'power2.out' }, T.voice(4) + 2.4);
tl.fromTo('#s4-go', { scale: 1 }, { scale: 0.88, duration: 0.1, yoyo: true, repeat: 1, ease: 'power2.out' }, T.voice(4) + 2.5);
tl.fromTo('#s4-out', { y: 120, opacity: 0 }, { y: 0, opacity: 1, duration: 0.45, ease: OUT }, T.voice(4) + 2.65);
tl.fromTo('#s4-out .ln', { scaleX: 0 }, { scaleX: 1, duration: 0.3, ease: 'power3.out', stagger: 0.07 }, T.voice(4) + 2.9);

// 5. the assistant slams in on the thud, a shopper asks, it answers from the description
tl.fromTo('#s5 .kicker .l', { yPercent: 110 }, { yPercent: 0, duration: 0.5, ease: OUT, stagger: 0.08 }, T.at(5));
tl.fromTo('#s5-win', { y: 220, opacity: 0 }, { y: 0, opacity: 1, duration: 0.55, ease: OUT }, T.at(5) + 0.1);
tl.fromTo('#s5-bot', { scale: 2.6, rotation: -20, opacity: 0 }, { scale: 1, rotation: 0, opacity: 1, duration: 0.25, ease: SLAM }, T.voice(5) + 0.75);
tl.fromTo('#s5-win', { scale: 1 }, { scale: 1.02, duration: 0.08, yoyo: true, repeat: 1, ease: 'power2.out' }, T.voice(5) + 1.0);
tl.fromTo('#s5-q', { scale: 0.4, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: POP }, T.voice(5) + 2.0);
tl.fromTo('#s5-typing', { scale: 0.6, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.3, ease: POP }, T.voice(5) + 2.55);
tl.fromTo('#s5-typing i', { y: 0 }, { y: -12, duration: 0.15, yoyo: true, repeat: 3, ease: 'sine.inOut', stagger: 0.1 }, T.voice(5) + 2.8);
tl.to('#s5-typing', { opacity: 0, duration: 0.2, ease: IN }, T.voice(5) + 3.4);
tl.fromTo('#s5-a', { scale: 0.6, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.45, ease: POP }, T.voice(5) + 3.5);
tl.fromTo('#s5-hl', { scaleX: 0 }, { scaleX: 1, duration: 0.4, ease: 'power3.out' }, T.voice(5) + 4.2);
tl.fromTo('#s5-hl2', { scaleX: 0 }, { scaleX: 1, duration: 0.4, ease: 'power3.out' }, T.voice(5) + 4.75);

// 6. the catch: meter fills to 9, short of the 10 line, GUESSING slams
tl.fromTo('#s6 .kicker .l', { yPercent: 110 }, { yPercent: 0, duration: 0.5, ease: OUT }, T.at(6));
tl.fromTo('#s6-num', { scale: 0.6, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: POP }, T.at(6) + 0.1);
tl.fromTo('#s6-lbl', { x: 40, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4, ease: OUT }, T.at(6) + 0.18);
tl.fromTo('#s6-track', { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 0.45, ease: OUT }, T.at(6) + 0.15);
tl.fromTo('#s6-ticks span', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.35, ease: OUT, stagger: 0.06 }, T.at(6) + 0.25);
tl.fromTo('#s6-zone', { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 0.45, ease: 'power3.out' }, T.at(6) + 0.3);
tl.fromTo('#s6-mark', { scaleY: 0 }, { scaleY: 1, duration: 0.35, ease: OUT }, T.at(6) + 0.35);
const n9 = { v: 0 };
tl.fromTo(n9, { v: 0 }, { v: 9, duration: 0.45, ease: 'power3.out', onUpdate: () => { document.getElementById('s6-num').textContent = String(Math.round(n9.v)); } }, T.voice(6) + 0.55);
tl.fromTo('#s6-fill', { scaleX: 0 }, { scaleX: 0.3, duration: 0.45, ease: 'power3.out' }, T.voice(6) + 0.55);
tl.fromTo('#s6-track', { x: 0 }, { x: 12, duration: 0.05, repeat: 5, yoyo: true, ease: 'none' }, T.voice(6) + 1.0);
tl.fromTo('#s6-num', { x: 0 }, { x: -12, duration: 0.05, repeat: 5, yoyo: true, ease: 'none' }, T.voice(6) + 1.0);
tl.fromTo('#s6-zl', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: OUT }, T.voice(6) + 1.4);
tl.fromTo('#s6-stamp', { scale: 2.4, rotation: -16, opacity: 0 }, { scale: 1, rotation: -5, opacity: 1, duration: 0.26, ease: SLAM }, at(6, 0.86) - 0.26);

// 7. comment DESC: chip pops, letters drop on the ding, the comment types and sends
tl.fromTo('#s7 .kicker .l', { yPercent: 110 }, { yPercent: 0, duration: 0.5, ease: OUT }, T.at(7));
tl.fromTo('#s7-chip', { scale: 0.5, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: POP }, T.at(7) + 0.02);
tl.fromTo('#s7-chip .ch', { y: -180, scale: 1.4, opacity: 0 }, { y: 0, scale: 1, opacity: 1, duration: 0.3, ease: 'back.out(1.6)', stagger: T.beat / 4 }, T.voice(7) + 0.05);
tl.fromTo('#s7-field', { y: 100, opacity: 0 }, { y: 0, opacity: 1, duration: 0.45, ease: OUT }, T.voice(7) + 0.7);
tl.fromTo('#s7-typed', { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 0.4, ease: 'steps(4)' }, T.voice(7) + 1.0);
tl.fromTo('#s7-send', { scale: 1 }, { scale: 0.85, duration: 0.1, yoyo: true, repeat: 1, ease: 'power2.out' }, T.voice(7) + 1.5);
tl.fromTo('#s7-sticker', { scale: 0, rotation: -25 }, { scale: 1, rotation: 5, duration: 0.45, ease: POP }, T.voice(7) + 1.7);
tl.fromTo('#s7-chip', { scale: 1 }, { scale: 1.04, duration: T.beat / 2, yoyo: true, repeat: 3, ease: 'sine.inOut' }, T.voice(7) + 2.1);
