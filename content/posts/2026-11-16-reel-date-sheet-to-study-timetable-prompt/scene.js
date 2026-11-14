// Clay theme, kind "prompt": the date sheet flips into a timetable, the vague plan, the vague answer, the EXAM prompt, the 3-part plan, the finished timetable, the catch, the keyword.
// Every selector is written out in full (no template strings), so the checker can match each id.
const OUT = 'expo.out', POP = 'back.out(1.8)';
const span = (n) => T.end(n) - T.voice(n);
const at = (n, f) => T.voice(n) + f * span(n);
const title = (sel, t) => tl.fromTo(sel, { yPercent: 110 }, { yPercent: 0, duration: 0.55, ease: OUT, stagger: 0.08 }, t);
const step = (sel, t) => tl.fromTo(sel, { x: -40, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4, ease: OUT }, t);
const rise = (id, t) => tl.fromTo(id, { y: 90, opacity: 0, scale: 0.96 }, { y: 0, opacity: 1, scale: 1, duration: 0.55, ease: OUT }, t);
const bump = (id, t, s = 1.05) => tl.fromTo(id, { scale: 1 }, { scale: s, duration: 0.18, yoyo: true, repeat: 1, ease: 'sine.inOut' }, t);
const shake = (id, t, d = 8) => tl.fromTo(id, { x: 0 }, { x: d, duration: 0.05, repeat: 5, yoyo: true, ease: 'none' }, t);

// texture: slow blobs across the whole reel
tl.fromTo('#blob1', { x: 0, y: 0 }, { x: 260, y: 180, duration: T.dur, ease: 'sine.inOut' }, 0);
tl.fromTo('#blob2', { x: 0, y: 0 }, { x: -240, y: -260, duration: T.dur, ease: 'sine.inOut' }, 0);

// progress bar: one segment per beat after the hook
const fill = (id, n) => tl.fromTo(id, { scaleX: 0 }, { scaleX: 1, duration: 0.5, ease: 'power2.out' }, T.at(n));
fill('#p1', 1); fill('#p2', 2); fill('#p3', 3); fill('#p4', 4); fill('#p5', 5); fill('#p6', 6); fill('#p7', 7);

// 0. hook: title and the crumpled date sheet are on screen at frame 0, the sheet flips into the timetable by 1.2 s
tl.fromTo('#s0-title .l', { yPercent: 0 }, { yPercent: 0, duration: 0.01 }, 0);
tl.fromTo('#s0-title', { scale: 1.05 }, { scale: 1, duration: 0.6, ease: OUT }, 0);
tl.fromTo('#s0-sheet', { scale: 1 }, { scale: 0.96, duration: 0.2, ease: 'power2.inOut' }, 0.25);
tl.fromTo('#s0-sheet', { rotationX: 0, transformPerspective: 900 }, { rotationX: 90, transformPerspective: 900, duration: 0.3, ease: 'power2.in' }, 0.45);
tl.fromTo('#s0-tt', { rotationX: -90, opacity: 0, transformPerspective: 900 }, { rotationX: 0, opacity: 1, transformPerspective: 900, duration: 0.45, ease: OUT }, 0.75);
tl.fromTo('#s0-tt .tt-c', { scale: 0.85, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.35, ease: POP, stagger: 0.06 }, 0.9);
tl.fromTo('#s0-strike', { scaleX: 0 }, { scaleX: 1, duration: 0.35, ease: 'power3.out' }, 1.45);
tl.fromTo('#s0-tt', { y: 0 }, { y: -10, duration: 0.25, yoyo: true, repeat: 1, ease: 'sine.inOut' }, 2.4);
tl.fromTo('#s0-l2', { scale: 1 }, { scale: 1.06, duration: 0.2, yoyo: true, repeat: 1, ease: 'sine.inOut' }, at(0, 0.82));

// 1. exams are weeks away: the calendar builds, paper day lights up, 'start tomorrow' is stamped three times
step('#s1 .step', T.at(1)); title('#s1 .title .l', T.at(1) + 0.05); rise('#s1-cal', T.at(1) + 0.15);
tl.fromTo('#s1 .cal-g i', { scale: 0.6, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.3, ease: POP, stagger: 0.03 }, T.at(1) + 0.35);
tl.fromTo('#s1-c8', { scale: 1 }, { scale: 1.25, duration: 0.22, yoyo: true, repeat: 1, ease: 'power2.inOut' }, at(1, 0.3));
tl.fromTo('#s1-tag', { scale: 0.7, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: POP }, at(1, 0.34));
tl.fromTo('#s1-d2', { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.3, ease: POP }, at(1, 0.3));
tl.fromTo('#s1-d1', { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.3, ease: POP }, at(1, 0.3) + 0.08);
tl.fromTo('#s1-bub', { scale: 0.7, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: POP }, at(1, 0.38));
tl.fromTo('#s1-b1', { scale: 2, opacity: 0, rotation: -12 }, { scale: 1, opacity: 1, rotation: -6, duration: 0.22, ease: 'power4.in' }, at(1, 0.5) - 0.22);
shake('#s1-bub', at(1, 0.5), 6);
tl.fromTo('#s1-b2', { scale: 2, opacity: 0, rotation: 8 }, { scale: 1, opacity: 1, rotation: 4, duration: 0.22, ease: 'power4.in' }, at(1, 0.68) - 0.22);
shake('#s1-bub', at(1, 0.68), 6);
tl.fromTo('#s1-b3', { scale: 2, opacity: 0, rotation: -6 }, { scale: 1, opacity: 1, rotation: -3, duration: 0.22, ease: 'power4.in' }, at(1, 0.86) - 0.22);
shake('#s1-bub', at(1, 0.86), 6);

// 2. the plain ask: message, typing dots, the vague reply, GENERIC slams on the buzz
step('#s2 .step', T.at(2)); title('#s2 .title .l', T.at(2) + 0.05); rise('#s2-chat', T.at(2) + 0.1);
tl.fromTo('#s2-me', { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.35, ease: POP }, T.at(2) + 0.3);
tl.fromTo('#s2-dots', { scale: 0.6, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.25, ease: POP }, T.voice(2) + 0.4);
tl.fromTo('#s2-dots i', { y: 0 }, { y: -10, duration: 0.15, yoyo: true, repeat: 1, ease: 'sine.inOut', stagger: 0.07 }, T.voice(2) + 0.45);
tl.to('#s2-dots', { opacity: 0, scale: 0.8, duration: 0.15, ease: 'power3.in' }, T.voice(2) + 0.72);
tl.fromTo('#s2-ai', { scale: 0.85, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.3, ease: POP }, T.voice(2) + 0.78);
tl.fromTo('#s2-stamp', { scale: 2.4, opacity: 0, rotation: -18 }, { scale: 1, opacity: 1, rotation: -8, duration: 0.22, ease: 'power4.in' }, T.voice(2) + 0.78);
shake('#s2-ai', T.voice(2) + 1.0);
tl.fromTo('#s2-chip', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: OUT }, at(2, 0.6));
bump('#s2-chip', at(2, 0.86));

// 3. the EXAM prompt: tap, the prompt types, the three things attach on the stressed words, send
step('#s3 .step', T.at(3)); title('#s3 .title .l', T.at(3) + 0.05); rise('#s3-card', T.at(3) + 0.1);
tl.fromTo('#s3-tag', { scale: 0.6, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.35, ease: POP }, T.at(3) + 0.35);
tl.fromTo('#s3-box', { scale: 1 }, { scale: 0.97, duration: 0.1, yoyo: true, repeat: 1, ease: 'power2.inOut' }, T.voice(3) + 0.3);
const typeLine = (id, i) => tl.fromTo(id, { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 0.26, ease: 'steps(12)' }, T.voice(3) + 0.45 + i * 0.28);
typeLine('#s3-l0', 0); typeLine('#s3-l1', 1); typeLine('#s3-l2', 2); typeLine('#s3-l3', 3); typeLine('#s3-l4', 4);
const attach = (id, f) => tl.fromTo(id, { scale: 0.6, opacity: 0, y: 20 }, { scale: 1, opacity: 1, y: 0, duration: 0.35, ease: POP }, at(3, f));
attach('#s3-a1', 0.47); attach('#s3-a2', 0.66); attach('#s3-a3', 0.86);
tl.fromTo('#s3-send', { scale: 1 }, { scale: 0.82, duration: 0.12, yoyo: true, repeat: 1, ease: 'power2.inOut' }, T.end(3) - 0.2);

// 4. the three parts: cards land full, then each spins its number as it is said
step('#s4 .step', T.at(4)); title('#s4 .title .l', T.at(4) + 0.05);
rise('#s4-c1', T.at(4) + 0.1); rise('#s4-c2', T.at(4) + 0.22); rise('#s4-c3', T.at(4) + 0.34);
tl.fromTo('#s4 .pr', { x: 40, opacity: 0 }, { x: 0, opacity: 1, duration: 0.3, ease: OUT, stagger: 0.06 }, T.at(4) + 0.4);
const part = (c, n, t) => { tl.fromTo(n, { rotation: 0 }, { rotation: 360, duration: 0.5, ease: 'power3.out' }, t); bump(c, t, 1.03); };
part('#s4-c1', '#s4-n1', T.voice(4) + 0.5);
part('#s4-c2', '#s4-n2', at(4, 0.62));
part('#s4-c3', '#s4-n3', at(4, 0.84));

// 5. payoff: the full timetable fills row by row, the GENERIC answer shrinks beside it
step('#s5 .step', T.at(5)); title('#s5 .title .l', T.at(5) + 0.05); rise('#s5-tt', T.at(5) + 0.05);
tl.fromTo('#s5 .tr', { x: 50, opacity: 0 }, { x: 0, opacity: 1, duration: 0.3, ease: OUT, stagger: 0.06 }, T.at(5) + 0.3);
tl.fromTo('#s5-gen', { scale: 1.6, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.5, ease: 'power2.inOut' }, T.at(5) + 0.15);
tl.fromTo('#s5-tag', { scale: 2, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.25, ease: 'power4.in' }, T.voice(5) + 0.8);
bump('#s5-tt', at(5, 0.7), 1.04);

// 6. the catch: CHECK slams on the thud, the card shakes, the two rows tick on the beat
step('#s6 .step', T.at(6)); title('#s6 .title .l', T.at(6) + 0.05); rise('#s6-card', T.at(6) + 0.05);
tl.fromTo('#s6-k1', { x: 60, opacity: 0 }, { x: 0, opacity: 1, duration: 0.35, ease: OUT }, T.at(6) + 0.3);
tl.fromTo('#s6-k2', { x: 60, opacity: 0 }, { x: 0, opacity: 1, duration: 0.35, ease: OUT }, T.at(6) + 0.38);
tl.fromTo('#s6-stamp', { scale: 2.4, opacity: 0, rotation: -20 }, { scale: 1, opacity: 1, rotation: -10, duration: 0.24, ease: 'power4.in' }, T.voice(6) + 0.36);
shake('#s6-card', T.voice(6) + 0.6);
tl.fromTo('#s6-b1', { backgroundColor: '#FFFFFF' }, { backgroundColor: '#9A3C14', duration: 0.2, ease: 'power2.out' }, at(6, 0.32));
tl.fromTo('#s6-t1', { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.35, ease: POP }, at(6, 0.32));
tl.fromTo('#s6-b2', { backgroundColor: '#FFFFFF' }, { backgroundColor: '#9A3C14', duration: 0.2, ease: 'power2.out' }, at(6, 0.72));
tl.fromTo('#s6-t2', { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.35, ease: POP }, at(6, 0.72));

// 7. send + keyword: the pill pops, E X A M drop in on half beats, the sticker lands
title('#s7 .title .l', T.at(7));
tl.fromTo('#s7-who', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: OUT }, T.at(7) + 0.3);
tl.fromTo('#s7-pill', { scale: 0.7, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.45, ease: POP }, T.at(7) + 0.5);
const drop = (id, i) => tl.fromTo(id, { y: -120, opacity: 0 }, { y: 0, opacity: 1, duration: 0.35, ease: 'back.out(2)' }, T.voice(7) + 0.9 + i * (T.beat / 2));
drop('#s7-k1', 0); drop('#s7-k2', 1); drop('#s7-k3', 2); drop('#s7-k4', 3);
tl.fromTo('#s7-stk', { scale: 0, rotation: -20 }, { scale: 1, rotation: -4, duration: 0.4, ease: POP }, T.voice(7) + 2.0);
bump('#s7-pill', at(7, 0.88), 1.06);
tl.fromTo('#s7-stk', { y: 0 }, { y: -8, duration: 0.6, yoyo: true, repeat: 1, ease: 'sine.inOut' }, T.end(7) + 0.1);
