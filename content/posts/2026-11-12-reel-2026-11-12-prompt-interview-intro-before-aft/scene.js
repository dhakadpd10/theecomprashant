// Prompt explainer: plain ask gives a generic intro; AI is a tailor, so give it measurements (role, goal, format) + 3 true facts.
// Payoff: the finished 45-second opening answer, labelled EXAMPLE. Every beat builds one piece; colour = meaning.
// Note for the team: caption line 4 says "40 vendors" but the voice says "many vendors"; the stage avoids the number.
const OUT = 'expo.out', POP = 'back.out(1.8)';
const span = (n) => T.end(n) - T.voice(n);
const at = (n, f) => T.voice(n) + f * span(n);
const title = (s, t) => tl.fromTo(`${s} .title .l`, { yPercent: 110 }, { yPercent: 0, duration: 0.55, ease: OUT, stagger: 0.08 }, t);
const step = (s, t) => tl.fromTo(`${s} .step`, { x: -40, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4, ease: OUT }, t);
const card = (id, t) => tl.fromTo(id, { y: 110, opacity: 0, scale: 0.96 }, { y: 0, opacity: 1, scale: 1, duration: 0.6, ease: OUT }, t);
const late = (id, t) => tl.fromTo(id, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.35, ease: OUT }, t);
const chip = (id, t) => {
  tl.fromTo(id, { scale: 0, opacity: 0 }, { scale: 1.12, opacity: 1, duration: 0.22, ease: 'power2.out' }, t);
  tl.to(id, { scale: 1, duration: 0.18, ease: 'power2.inOut' }, t + 0.22);
};
const shake = (id, t, px = 8) => tl.fromTo(id, { x: 0 }, { x: px, duration: 0.05, repeat: 5, yoyo: true, ease: 'none' }, t);
const wipe = (id, t, d = 0.35, steps = 14) => tl.fromTo(id, { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: d, ease: `steps(${steps})` }, t);

// texture: two soft orbs drift for the whole reel
tl.fromTo('#orb1', { x: 0, y: 0 }, { x: 170, y: -120, duration: T.dur, ease: 'sine.inOut' }, 0);
tl.fromTo('#orb2', { x: 0, y: 0 }, { x: -180, y: -150, duration: T.dur, ease: 'sine.inOut' }, 0);

// progress bar: one segment per beat after the hook
tl.set(['#p1', '#p2', '#p3', '#p4', '#p5', '#p6', '#p7'], { scaleX: 0 }, 0);
[1, 2, 3, 4, 5, 6, 7].forEach((n) => tl.to(`#p${n}`, { scaleX: 1, duration: 0.5, ease: 'power2.out' }, T.at(n)));

// 0. hook: title and the full 45-second ring are on screen at frame 0; the clock drains as he talks
tl.fromTo('#s0-title .l', { yPercent: 0 }, { yPercent: 0, duration: 0.01 }, 0);
tl.fromTo('#s0-title', { scale: 1.06 }, { scale: 1, duration: 0.7, ease: OUT }, 0);
tl.fromTo('#squig-p', { strokeDashoffset: 720 }, { strokeDashoffset: 0, duration: 0.6, ease: 'power2.out' }, T.voice(0) + 0.45);
tl.fromTo('#s0-arc', { strokeDashoffset: 0 }, { strokeDashoffset: 503, duration: T.end(0) - 0.4, ease: 'none' }, 0.3);
const clock = { v: 45 };
tl.fromTo(clock, { v: 45 }, { v: 0, duration: T.end(0) - 0.4, ease: 'none', onUpdate: () => { document.getElementById('s0-num').textContent = `${Math.ceil(clock.v)}`; } }, 0.3);
tl.fromTo('#s0-ring', { scale: 1 }, { scale: 1.08, duration: 0.15, yoyo: true, repeat: 1, ease: 'sine.inOut' }, T.voice(0) + 4 * T.beat);

// 1. plain ask: your message, typing dots, the generic reply, buzzwords go red, GENERIC slams
step('#s1', T.at(1)); title('#s1', T.at(1) + 0.05); card('#s1-card', T.at(1) + 0.15);
tl.fromTo('#s1-user', { scale: 0.6, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.35, ease: POP }, T.at(1) + 0.35);
tl.fromTo('#s1-dots', { opacity: 0 }, { opacity: 1, duration: 0.15, ease: 'power2.out' }, T.voice(1) + 0.4);
tl.fromTo('#s1-dots i', { y: 0 }, { y: -10, duration: 0.12, yoyo: true, repeat: 1, stagger: 0.07, ease: 'sine.inOut' }, T.voice(1) + 0.45);
tl.to('#s1-dots', { opacity: 0, duration: 0.12, ease: 'power3.in' }, T.voice(1) + 0.8);
tl.fromTo('#s1-ai', { scale: 0.85, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: POP }, T.voice(1) + 0.88);
[['#bz1', 0.45], ['#bz2', 0.62], ['#bz3', 0.8]].forEach(([id, f]) => tl.to(id, { color: '#C63D3D', backgroundColor: 'rgba(198,61,61,0.12)', duration: 0.18, ease: 'power2.out' }, at(1, f)));
tl.fromTo('#s1-stamp', { scale: 2.2, opacity: 0, rotation: -22 }, { scale: 1, opacity: 1, rotation: -8, duration: 0.22, ease: 'power4.in' }, at(1, 0.88));
shake('#s1-ai', at(1, 0.88) + 0.22, 8);
late('#s1-note', at(1, 0.95));

// 2. the analogy: a shirt with no measurements, three blanks, the FREE SIZE tag drops and swings
step('#s2', T.at(2)); title('#s2', T.at(2) + 0.05); card('#s2-card', T.at(2) + 0.15);
tl.fromTo('#s2-shirt', { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: OUT }, T.at(2) + 0.35);
['#m1', '#m2', '#m3'].forEach((id, i) => tl.fromTo(id, { x: 50, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4, ease: OUT }, T.at(2) + 0.45 + i * 0.07));
['#q1', '#q2', '#q3'].forEach((id, i) => chip(id, at(2, 0.42 + i * 0.08)));
tl.fromTo('#s2-tag', { y: -110, opacity: 0, rotation: -24 }, { y: 0, opacity: 1, rotation: 14, duration: 0.35, ease: 'power3.out' }, at(2, 0.78));
tl.to('#s2-tag', { rotation: -8, duration: 0.3, ease: 'sine.inOut' }, at(2, 0.78) + 0.35);
tl.to('#s2-tag', { rotation: 3, duration: 0.25, ease: 'sine.inOut' }, at(2, 0.78) + 0.65);
tl.fromTo('#s2-shirt', { scaleX: 1 }, { scaleX: 1.08, duration: 0.25, yoyo: true, repeat: 1, ease: 'sine.inOut' }, at(2, 0.86));
late('#s2-loose', at(2, 0.9));

// 3. the measurements (host hidden): the tape runs out, three dashed slots fill on the clicks
step('#s3', T.at(3)); title('#s3', T.at(3) + 0.05); card('#s3-card', T.at(3) + 0.12);
tl.fromTo('#s3-tape', { scaleX: 0 }, { scaleX: 1, duration: 0.7, ease: 'power3.out' }, T.at(3) + 0.3);
late('#s3-lbl', T.at(3) + 0.55);
tl.set(['#r1 .fillbg', '#r2 .fillbg', '#r3 .fillbg'], { opacity: 0 }, 0);
tl.set(['#r1 .ok', '#r2 .ok', '#r3 .ok'], { scale: 0, opacity: 0 }, 0);
[[1, T.voice(3) + 0.9], [2, T.voice(3) + 1.5], [3, at(3, 0.92)]].forEach(([i, t]) => {
  tl.to(`#r${i} .fillbg`, { opacity: 1, duration: 0.25, ease: 'power2.out' }, t);
  wipe(`#r${i} .t`, t, 0.35, 14);
  chip(`#r${i} .ok`, t + 0.28);
});

// 4. the facts: CV and job post paste in, then three TRUE rows land on the beat
step('#s4', T.at(4)); title('#s4', T.at(4) + 0.05); card('#s4-card', T.at(4) + 0.15);
['#s4-cv', '#s4-job'].forEach((id, i) => tl.fromTo(id, { y: -30, opacity: 0, scale: 0.9 }, { y: 0, opacity: 1, scale: 1, duration: 0.4, ease: POP }, T.at(4) + 0.45 + i * 0.08));
late('#s4-facts', T.voice(4) + 0.9);
['#f1', '#f2', '#f3'].forEach((id, i) => {
  const t = T.voice(4) + 1.4 + i * T.beat;
  tl.fromTo(id, { x: 70, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4, ease: OUT }, t);
  chip(`#t${i + 1}`, t + 0.15);
});

// 5. the result (whistle): the old line gets struck, the finished 45-second answer writes in, the measurement chips stack up
step('#s5', T.at(5)); title('#s5', T.at(5) + 0.05); card('#s5-card', T.at(5) + 0.12);
tl.fromTo('#s5-strike', { scaleX: 0 }, { scaleX: 1, duration: 0.3, ease: 'power3.in' }, T.at(5) + 0.35);
tl.fromTo('#s5-ans .al', { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 0.26, ease: 'power2.out', stagger: 0.08 }, T.at(5) + 0.4);
chip('#s5-time', T.at(5) + 0.55);
['#c1', '#c2', '#c3', '#c4'].forEach((id, i) => tl.fromTo(id, { y: 24, opacity: 0, scale: 0.8 }, { y: 0, opacity: 1, scale: 1, duration: 0.35, ease: POP }, T.at(5) + 0.75 + i * 0.06));
tl.to('#s5-card', { scale: 1.04, duration: 0.2, yoyo: true, repeat: 1, ease: 'sine.inOut' }, T.end(5) - 0.55);

// 6. the catch: TRUE FACTS slams on the thud, made-up work gets struck and shaken, then the two rules
step('#s6', T.at(6)); title('#s6', T.at(6) + 0.05); card('#s6-card', T.at(6) + 0.1);
tl.fromTo('#k1', { scale: 1.25, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.25, ease: 'power4.in' }, T.voice(6) + 0.15);
chip('#h1', T.voice(6) + 0.45);
tl.fromTo('#k2', { x: 70, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4, ease: OUT }, at(6, 0.4));
chip('#h2', at(6, 0.48));
tl.fromTo('#s6-strike', { scaleX: 0 }, { scaleX: 1, duration: 0.3, ease: 'power3.in' }, at(6, 0.52));
shake('#k2', at(6, 0.52) + 0.3, 8);
tl.fromTo('#k3', { x: 70, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4, ease: OUT }, at(6, 0.66));
chip('#h3', at(6, 0.66) + 0.15);
tl.fromTo('#k4', { x: 70, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4, ease: OUT }, at(6, 0.8));
chip('#h4', at(6, 0.8) + 0.15);
tl.to('#h4', { scale: 1.06, duration: 0.25, yoyo: true, repeat: 1, ease: 'sine.inOut' }, T.end(6) - 0.4);

// 7. send + keyword: serif send line, bookmark pops, the comment card drops INTRO letter by letter
tl.fromTo('#s7-send .l', { yPercent: 110 }, { yPercent: 0, duration: 0.55, ease: OUT }, T.at(7));
tl.fromTo('#s7-mark', { y: -60, opacity: 0, rotation: -12 }, { y: 0, opacity: 1, rotation: 0, duration: 0.45, ease: POP }, T.at(7) + 0.4);
late('#s7-who', T.voice(7) + 0.3);
card('#s7-card', at(7, 0.42));
tl.fromTo('#s7-word .k', { y: -150, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: POP, stagger: 0.07 }, at(7, 0.42) + 0.25);
late('#s7-get', at(7, 0.42) + 0.7);
tl.fromTo('#s7-pill', { scale: 0.6, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.45, ease: POP }, at(7, 0.62));
tl.fromTo('#s7-sticker', { scale: 0, opacity: 0, rotation: -30 }, { scale: 1, opacity: 1, rotation: 8, duration: 0.4, ease: POP }, at(7, 0.7));
tl.to('#s7-word .k', { y: -22, duration: 0.15, yoyo: true, repeat: 1, ease: 'sine.inOut', stagger: 0.05 }, at(7, 0.84));
tl.to('#s7-pill', { scale: 1.04, duration: 0.3, yoyo: true, repeat: 1, ease: 'sine.inOut' }, T.end(7) + 0.2);
