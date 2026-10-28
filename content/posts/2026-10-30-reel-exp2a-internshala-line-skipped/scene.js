// Editorial, kind "skills", arm A: the application line already struck at frame 0, the fix, then 4 slots filling on the voice.
// Every selector is written out in full (no built-up ids) so the checker can match each one to scene.html.
const OUT = 'expo.out', POP = 'back.out(1.8)';
const span = (n) => T.end(n) - T.voice(n);
const sp = (n, f) => T.voice(n) + f * span(n);
const reveal = (sel, t) => tl.fromTo(sel, { yPercent: 110 }, { yPercent: 0, duration: 0.55, ease: OUT }, t);
const slide = (sel, t) => tl.fromTo(sel, { x: -40, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4, ease: OUT }, t);
const rise = (sel, t) => tl.fromTo(sel, { y: 110, opacity: 0, scale: 0.96 }, { y: 0, opacity: 1, scale: 1, duration: 0.6, ease: OUT }, t);

// texture: slow drifting blobs across the whole reel
tl.fromTo('#blob1', { x: 0, y: 0 }, { x: 140, y: 90, duration: T.dur, ease: 'sine.inOut' }, 0);
tl.fromTo('#blob2', { x: 0, y: 0 }, { x: -120, y: -70, duration: T.dur, ease: 'sine.inOut' }, 0);

// progress bar: one segment per beat after the hook
const segs = [['#p1', 1], ['#p2', 2], ['#p3', 3], ['#p4', 4], ['#p5', 5], ['#p6', 6], ['#p7', 7], ['#p8', 8], ['#p9', 9]];
tl.set(['#p1', '#p2', '#p3', '#p4', '#p5', '#p6', '#p7', '#p8', '#p9'], { scaleX: 0 }, 0);
segs.forEach(([id, n]) => tl.to(id, { scaleX: 1, duration: 0.5, ease: 'power2.out' }, T.at(n)));

// 0. hook: the struck line and the tag are on screen at frame 0
tl.fromTo('#s0-card', { scale: 1.04 }, { scale: 1, duration: 0.6, ease: OUT }, 0);
tl.fromTo('#s0-strike', { scaleX: 1 }, { scaleX: 1, duration: 0.01 }, 0);
tl.fromTo('#s0-card', { x: 0 }, { x: 8, duration: 0.05, repeat: 5, yoyo: true, ease: 'none' }, T.voice(0) + 0.25);
tl.fromTo('#s0-zero', { scale: 0.6, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: POP }, sp(0, 0.32));
tl.fromTo('#s0-stamp', { scale: 2.4, opacity: 0, rotation: -24 }, { scale: 1, opacity: 1, rotation: -10, duration: 0.22, ease: 'power4.in' }, sp(0, 0.55));
tl.fromTo('#s0-card', { y: 0 }, { y: 6, duration: 0.06, yoyo: true, repeat: 1, ease: 'power2.out' }, sp(0, 0.55) + 0.22);
tl.fromTo('#s0-strike', { scaleY: 1 }, { scaleY: 1.6, duration: 0.15, yoyo: true, repeat: 1, ease: 'sine.inOut' }, sp(0, 0.85));

// 1. the fix: vague line struck, the proof line rises, the link chip pops
slide('#s1-step', T.at(1)); reveal('#s1-t1', T.at(1) + 0.03);
tl.fromTo('#s1-a', { x: 60, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4, ease: OUT }, T.at(1) + 0.1);
tl.fromTo('#s1-strike', { scaleX: 0 }, { scaleX: 1, duration: 0.3, ease: 'power2.inOut' }, T.at(1) + 0.35);
tl.fromTo('#s1-nothing', { scale: 0.7, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.35, ease: POP }, T.at(1) + 0.5);
rise('#s1-b', T.voice(1) + 0.5);
tl.fromTo('#s1-link', { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.35, ease: POP }, T.voice(1) + 0.9);
tl.fromTo('#s1-link', { scale: 1 }, { scale: 1.06, duration: 0.15, yoyo: true, repeat: 1, ease: 'sine.inOut' }, T.voice(1) + 1.25);

// 2. the screenshot card with 4 empty slots
slide('#s2-step', T.at(2)); reveal('#s2-t1', T.at(2) + 0.03);
rise('#s2-card', T.at(2) + 0.15);
tl.fromTo('#s2-head', { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 0.5, ease: 'power2.inOut' }, T.at(2) + 0.45);
tl.fromTo(['#s2-s1', '#s2-s2', '#s2-s3', '#s2-s4'], { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: OUT, stagger: 0.07 }, T.voice(2) + 0.5);
tl.set(['#s2-f1', '#s2-f2', '#s2-f3', '#s2-f4'], { opacity: 0 }, 0);

// 3-6. each slot fills as it is said, the attach chip lands on "attach"
const rows = [
  { n: 3, fill: '#s2-f1', num: '#s2-n1', chip: '#s2-a1' },
  { n: 4, fill: '#s2-f2', num: '#s2-n2', chip: '#s2-a2' },
  { n: 5, fill: '#s2-f3', num: '#s2-n3', chip: '#s2-a3' },
  { n: 6, fill: '#s2-f4', num: '#s2-n4', chip: '#s2-a4' },
];
rows.forEach(({ n, fill, num, chip }) => {
  const chipAt = n === 6 ? T.voice(n) + 0.75 : sp(n, 0.45);
  tl.fromTo(fill, { x: 40, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4, ease: OUT }, T.voice(n) + 0.05);
  tl.fromTo(num, { scale: 0, rotation: -90 }, { scale: 1, rotation: 0, duration: 0.45, ease: POP }, T.voice(n) + 0.15);
  tl.fromTo(chip, { scale: 0.6, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.35, ease: POP }, chipAt);
});
tl.fromTo('#s2-card', { scale: 1 }, { scale: 1.02, duration: 0.25, yoyo: true, repeat: 1, ease: 'sine.inOut' }, T.end(6) - 0.6);

// 7. the catch: the vague line fails, the proof row gets the tick, stipend varies
slide('#s3-step', T.at(7)); reveal('#s3-t1', T.at(7) + 0.03);
rise('#s3-card', T.at(7) + 0.15);
tl.fromTo('#s3-a', { x: 60, opacity: 0 }, { x: 0, opacity: 1, duration: 0.35, ease: OUT }, T.at(7) + 0.25);
tl.fromTo('#s3-b', { x: 60, opacity: 0 }, { x: 0, opacity: 1, duration: 0.35, ease: OUT }, T.at(7) + 0.32);
tl.fromTo('#s3-strike', { scaleX: 0 }, { scaleX: 1, duration: 0.3, ease: 'power2.inOut' }, T.at(7) + 0.5);
tl.fromTo('#s3-x', { scale: 0 }, { scale: 1, duration: 0.3, ease: POP }, T.at(7) + 0.6);
tl.fromTo('#s3-tick', { scale: 2, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.22, ease: 'power4.in' }, T.voice(7) + 0.4);
tl.fromTo('#s3-b', { scale: 1 }, { scale: 1.04, duration: 0.15, yoyo: true, repeat: 1, ease: 'sine.inOut' }, T.voice(7) + 0.62);
tl.fromTo('#s3-note', { filter: 'blur(12px)', opacity: 0 }, { filter: 'blur(0px)', opacity: 1, duration: 0.45, ease: OUT }, sp(7, 0.35));
tl.fromTo('#s3-pay', { scale: 0.6, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: POP }, sp(7, 0.62));

// 8. send: the reel is forwarded, typing, then the reply bubble
slide('#s4-step', T.at(8)); reveal('#s4-t1', T.at(8) + 0.03);
rise('#s4-card', T.at(8) + 0.15);
tl.fromTo('#s4-av', { scale: 0 }, { scale: 1, duration: 0.4, ease: POP }, T.at(8) + 0.4);
tl.fromTo('#s4-fwd', { x: 60, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4, ease: OUT }, T.voice(8) + 0.5);
tl.fromTo('#s4-arrow', { x: -30, rotation: -30 }, { x: 0, rotation: 0, duration: 0.45, ease: POP }, T.voice(8) + 0.6);
tl.fromTo('#s4-dots', { scale: 0.6, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.3, ease: POP }, sp(8, 0.4));
tl.fromTo('#s4-d1', { y: 0 }, { y: -8, duration: 0.15, yoyo: true, repeat: 3, ease: 'sine.inOut' }, sp(8, 0.4) + 0.1);
tl.fromTo('#s4-d2', { y: 0 }, { y: -8, duration: 0.15, yoyo: true, repeat: 3, ease: 'sine.inOut' }, sp(8, 0.4) + 0.18);
tl.fromTo('#s4-d3', { y: 0 }, { y: -8, duration: 0.15, yoyo: true, repeat: 3, ease: 'sine.inOut' }, sp(8, 0.4) + 0.26);
tl.to('#s4-dots', { opacity: 0, scale: 0.8, duration: 0.2, ease: 'power3.in' }, sp(8, 0.72));
tl.fromTo('#s4-bubble', { scale: 0.5, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: POP }, sp(8, 0.75));

// 9. end card: Save., bookmark, the keyword letters drop in on the beat
slide('#s5-step', T.at(9)); reveal('#s5-t1', T.at(9) + 0.03);
tl.fromTo('#s5-mark', { y: -60, opacity: 0 }, { y: 0, opacity: 1, duration: 0.45, ease: POP }, T.at(9) + 0.2);
tl.fromTo('#s5-pill', { scale: 0.85, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.5, ease: OUT }, T.at(9) + 0.25);
tl.fromTo('#s5-cm', { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 0.35, ease: OUT }, T.at(9) + 0.45);
tl.fromTo('#s5-kw .k', { y: -90, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: POP, stagger: 0.06 }, sp(9, 0.25));
tl.fromTo('#s5-stick', { scale: 0, rotation: -20 }, { scale: 1, rotation: -4, duration: 0.4, ease: POP }, sp(9, 0.55));
tl.fromTo('#s5-tool', { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: OUT }, sp(9, 0.7));
tl.fromTo('#s5-pill', { scale: 1 }, { scale: 1.05, duration: 0.2, yoyo: true, repeat: 1, ease: 'sine.inOut' }, T.end(9) + 0.3);
