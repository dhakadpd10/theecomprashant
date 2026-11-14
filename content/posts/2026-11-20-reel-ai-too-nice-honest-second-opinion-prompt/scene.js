// Clay paper, kind "prompt": mummy struck for the strict aunty, the unanswered applications, the agree-switch, the typed prompt,
// three CV lines struck on the thuds, the rewrite (labelled example), the catch, the send card, then HONEST dropping in.
// Every animated id is written out in full (no template-built ids).
const OUT = 'expo.out', POP = 'back.out(1.8)', SLAM = 'power4.in';
const span = (n) => T.end(n) - T.voice(n);
const at = (n, f) => T.voice(n) + f * span(n);
const enterStep = (sel, t) => tl.fromTo(sel, { x: -40, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4, ease: OUT }, t);
const enterTitle = (sel, t) => tl.fromTo(sel, { yPercent: 110 }, { yPercent: 0, duration: 0.55, ease: OUT, stagger: 0.08 }, t);
const card = (id, t) => tl.fromTo(id, { y: 110, opacity: 0, scale: 0.96 }, { y: 0, opacity: 1, scale: 1, duration: 0.55, ease: OUT }, t);
const pop = (id, t) => tl.fromTo(id, { scale: 0.6, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: POP }, t);
const shake = (id, t) => tl.fromTo(id, { x: 0 }, { x: 8, duration: 0.05, repeat: 5, yoyo: true, ease: 'none' }, t);

// texture: two warm blobs drift for the whole reel
tl.fromTo('#blob1', { x: 0, y: 0 }, { x: 220, y: 160, duration: T.dur, ease: 'sine.inOut' }, 0);
tl.fromTo('#blob2', { x: 0, y: 0 }, { x: -200, y: -140, duration: T.dur, ease: 'sine.inOut' }, 0);

// progress bar: one segment per beat after the hook
const bars = ['#p1', '#p2', '#p3', '#p4', '#p5', '#p6', '#p7', '#p8'];
tl.set(bars, { scaleX: 0 }, 0);
bars.forEach((id, i) => tl.to(id, { scaleX: 1, duration: 0.5, ease: 'power2.out' }, T.at(i + 1)));

// 0. hook: title and the MUMMY chip are on screen at frame 0; mummy is struck, the strict aunty pops in
tl.fromTo('#s0-title .l', { yPercent: 0 }, { yPercent: 0, duration: 0.01 }, 0);
tl.fromTo('#s0-title', { scale: 1.05 }, { scale: 1, duration: 0.6, ease: OUT }, 0);
tl.fromTo('#s0-strike', { scaleX: 0 }, { scaleX: 1, duration: 0.3, ease: 'power3.out' }, at(0, 0.36));
tl.fromTo('#s0-arrow', { x: -24, opacity: 0 }, { x: 0, opacity: 1, duration: 0.35, ease: OUT }, at(0, 0.42));
tl.fromTo('#s0-aunty', { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.45, ease: POP }, at(0, 0.48));
tl.to('#s0-title', { scale: 1.03, duration: 0.2, yoyo: true, repeat: 1, ease: 'sine.inOut' }, T.voice(0) + 4 * T.beat);

// 1. 20 sent: rows land, every chip turns red on the buzz, then AI's "looks great" bubble
enterStep('#s1 .step', T.at(1)); enterTitle('#s1 .title .l', T.at(1) + 0.05); card('#s1-card', T.at(1) + 0.15);
tl.fromTo('#s1 .arow', { x: 60, opacity: 0 }, { x: 0, opacity: 1, duration: 0.35, ease: OUT, stagger: 0.07 }, T.at(1) + 0.35);
tl.to('#s1 .nr', { backgroundColor: '#B03A2E', duration: 0.15, ease: 'power2.out', stagger: 0.04 }, T.voice(1) + 1.6);
shake('#s1-card', T.voice(1) + 1.6);
pop('#s1-ai', at(1, 0.64));
tl.fromTo('#s1-heart', { scale: 0 }, { scale: 1, duration: 0.35, ease: POP }, at(1, 0.64) + 0.2);
tl.to('#s1-heart', { scale: 1.15, duration: 0.15, yoyo: true, repeat: 3, ease: 'sine.inOut' }, at(1, 0.64) + 0.6);

// 2. it agrees: the yes-bubbles stack, then the switch slides from MUMMY to STRICT AUNTY and the honest reply lands
enterStep('#s2 .step', T.at(2)); enterTitle('#s2 .title .l', T.at(2) + 0.05); card('#s2-card', T.at(2) + 0.12);
pop('#s2-u', T.at(2) + 0.35);
pop('#s2-a1', at(2, 0.14));
pop('#s2-a2', at(2, 0.3));
tl.fromTo('#s2-seg', { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: OUT }, at(2, 0.42));
tl.fromTo('#s2-hi', { x: 0 }, { x: 300, duration: 0.45, ease: 'power2.inOut' }, at(2, 0.72));
tl.fromTo('#s2-lm', { color: '#FFFFFF' }, { color: '#2B2420', duration: 0.25 }, at(2, 0.72) + 0.15);
tl.fromTo('#s2-la', { color: '#2B2420' }, { color: '#FFFFFF', duration: 0.25 }, at(2, 0.72) + 0.15);
pop('#s2-s', at(2, 0.86));

// 3. the prompt types in line by line, then SEND presses
enterStep('#s3 .step', T.at(3)); enterTitle('#s3 .title .l', T.at(3) + 0.05); card('#s3-card', T.at(3) + 0.12);
const typeIn = (id, t, d, n) => tl.fromTo(id, { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: d, ease: `steps(${n})` }, t);
typeIn('#s3-l1', at(3, 0.0) + 0.1, 0.6, 20);
typeIn('#s3-l2', at(3, 0.22) + 0.1, 0.6, 20);
typeIn('#s3-l3', at(3, 0.46) + 0.1, 0.6, 20);
typeIn('#s3-l4', at(3, 0.68) + 0.1, 0.6, 20);
typeIn('#s3-l5', at(3, 0.86), 0.45, 18);
tl.fromTo('#s3-box', { borderColor: 'rgba(43,36,32,0.14)' }, { borderColor: '#9A3B14', duration: 0.3, ease: 'power2.out' }, at(3, 0.68));
tl.fromTo('#s3-go', { scale: 1 }, { scale: 0.9, duration: 0.12, yoyo: true, repeat: 1, ease: 'power2.inOut' }, T.end(3) - 0.15);

// 4. full-width CV: three weakest lines struck on the three thuds, each fix chip slams in
enterStep('#s4 .step', T.at(4)); enterTitle('#s4 .title .l', T.at(4));
tl.fromTo('#s4-card', { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.2, ease: OUT }, T.at(4));
const strikeRow = (k, tx, fx, o) => {
  const t = T.voice(4) + o;
  tl.fromTo(k, { scaleX: 0 }, { scaleX: 1, duration: 0.18, ease: 'power2.out' }, t - 0.18);
  tl.fromTo(tx, { color: '#2B2420' }, { color: '#7A6E66', duration: 0.15 }, t);
  tl.fromTo(fx, { scale: 1.7, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.2, ease: SLAM }, t - 0.05);
};
strikeRow('#s4-k2', '#s4-t2', '#s4-f2', 0.1);
strikeRow('#s4-k3', '#s4-t3', '#s4-f3', 0.5);
strikeRow('#s4-k5', '#s4-t5', '#s4-f5', 0.9);
tl.fromTo('#s4-tag', { scale: 0.6, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.35, ease: POP }, T.voice(4) + 1.15);

// 5. the rewrite: before, then the after box wipes in (cover frame), chips pop on shorter / clearer / their job
enterStep('#s5 .step', T.at(5)); enterTitle('#s5 .title .l', T.at(5) + 0.05); card('#s5-card', T.at(5) + 0.12);
tl.fromTo('#s5-arrow', { y: -20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.35, ease: OUT }, T.voice(5) + 0.2);
tl.fromTo('#s5-after', { clipPath: 'inset(0 0 100% 0)' }, { clipPath: 'inset(0 0 0% 0)', duration: 0.5, ease: 'power3.out' }, T.voice(5) + 0.3);
pop('#s5-c1', at(5, 0.5));
pop('#s5-c2', at(5, 0.68));
pop('#s5-c3', at(5, 0.86));
tl.fromTo('#s5-after', { scale: 1 }, { scale: 1.04, duration: 0.2, yoyo: true, repeat: 1, ease: 'sine.inOut' }, T.end(5) - 0.15);

// 6. the catch: three rows, each chip slams and shakes
enterStep('#s6 .step', T.at(6)); enterTitle('#s6 .title .l', T.at(6) + 0.05); card('#s6-card', T.at(6) + 0.12);
const catchRow = (row, chip, f) => {
  const t = at(6, f);
  tl.fromTo(row, { x: 60, opacity: 0 }, { x: 0, opacity: 1, duration: 0.35, ease: OUT }, t);
  tl.fromTo(chip, { scale: 1.8, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.25, ease: SLAM }, t + 0.15);
  shake(chip, t + 0.4);
};
catchRow('#s6-r1', '#s6-c1', 0.12);
catchRow('#s6-r2', '#s6-c2', 0.4);
catchRow('#s6-r3', '#s6-c3', 0.68);

// 7. send: the friend, the message, SEND presses, the plane leaves, the tick draws
enterStep('#s7 .step', T.at(7)); enterTitle('#s7 .title .l', T.at(7) + 0.05); card('#s7-card', T.at(7) + 0.12);
tl.fromTo('#s7-who', { x: 60, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4, ease: OUT }, T.at(7) + 0.35);
pop('#s7-msg', at(7, 0.28));
tl.fromTo('#s7-send', { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: OUT }, at(7, 0.45));
tl.fromTo('#s7-send', { scale: 1 }, { scale: 0.95, duration: 0.12, yoyo: true, repeat: 1, ease: 'power2.inOut' }, at(7, 0.72));
tl.fromTo('#s7-plane', { x: 0, opacity: 1 }, { x: 260, opacity: 0, duration: 0.4, ease: 'power3.in' }, at(7, 0.72) + 0.1);
tl.fromTo('#s7-check', { backgroundColor: '#FFF8EE' }, { backgroundColor: '#2E6B3F', duration: 0.2, ease: 'power2.out' }, at(7, 0.72) + 0.3);
tl.fromTo('#s7-tick', { strokeDashoffset: 60 }, { strokeDashoffset: 0, duration: 0.3, ease: 'power3.out' }, at(7, 0.72) + 0.35);
tl.fromTo('#s7-check', { scale: 1 }, { scale: 1.12, duration: 0.15, yoyo: true, repeat: 1, ease: 'sine.inOut' }, at(7, 0.72) + 0.6);

// 8. keyword: HONEST drops in letter by letter on the pop, sticker slams, Save. and the dark pill
enterStep('#s8 .step', T.at(8));
tl.fromTo('#s8-bub', { y: 80, opacity: 0 }, { y: 0, opacity: 1, duration: 0.45, ease: OUT }, T.at(8));
pop('#s8-av', T.at(8) + 0.15);
tl.fromTo('#s8-key .k', { yPercent: -120, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.35, ease: POP, stagger: 0.07 }, T.voice(8) + 0.1);
tl.fromTo('#s8-stick', { scale: 1.8, opacity: 0, rotation: -20 }, { scale: 1, opacity: 1, rotation: -8, duration: 0.25, ease: SLAM }, at(8, 0.5));
tl.fromTo('#s8-save .l', { yPercent: 110 }, { yPercent: 0, duration: 0.55, ease: OUT }, T.at(8) + 0.4);
tl.fromTo('#s8-bm', { y: -60, opacity: 0 }, { y: 0, opacity: 1, duration: 0.45, ease: POP }, T.at(8) + 0.6);
pop('#s8-pill', at(8, 0.4));
tl.fromTo('#s8-sub', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: OUT }, at(8, 0.7));
tl.to('#s8-key .k', { y: -10, duration: 0.15, yoyo: true, repeat: 1, stagger: 0.05, ease: 'sine.inOut' }, T.end(8) + 0.4);
tl.to('#s8-pill', { scale: 1.05, duration: 0.2, yoyo: true, repeat: 1, ease: 'sine.inOut' }, T.end(8) + 0.6);
