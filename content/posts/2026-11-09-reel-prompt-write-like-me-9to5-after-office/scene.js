// Prompt explainer: make AI write like you. One idea (show it 3 of your own messages first), one analogy
// (a tailor needs your measurements), the finished leave message on the payoff beat, the catch, then STYLE.
// Note for Prashant: the STYLE tool copy talks about customer replies; check it also covers writing a new
// message (like this leave message) before posting, since the payoff shows that use.
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
const slide = (id, t) => tl.fromTo(id, { x: 60, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4, ease: OUT }, t);
const shake = (id, t, px = 8) => tl.fromTo(id, { x: 0 }, { x: px, duration: 0.05, repeat: 5, yoyo: true, ease: 'none' }, t);

// ambient: two soft orbs drift for the whole reel
tl.fromTo('#orb1', { x: 0, y: 0 }, { x: 160, y: -120, duration: T.dur, ease: 'sine.inOut' }, 0);
tl.fromTo('#orb2', { x: 0, y: 0 }, { x: -180, y: -160, duration: T.dur, ease: 'sine.inOut' }, 0);

// progress bar: one segment per step after the hook
[1, 2, 3, 4, 5, 6, 7, 8].forEach((n) => tl.fromTo(`#p${n}`, { scaleX: 0 }, { scaleX: 1, duration: 0.5, ease: 'power2.out' }, T.at(n)));

// 0. hook: title and kicker on screen at frame 0; the robot phrase is struck out on the thud
tl.fromTo('#s0-title .l', { yPercent: 0 }, { yPercent: 0, duration: 0.01 }, 0);
tl.fromTo('#s0-title', { scale: 1.06 }, { scale: 1, duration: 0.7, ease: OUT }, 0);
tl.fromTo('#s0-strike', { scaleX: 0 }, { scaleX: 1, duration: 0.25, ease: 'power4.in' }, T.voice(0) + 0.25);
shake('#s0-kick', T.voice(0) + 0.5, 6);
tl.fromTo('#s0-ul-p', { strokeDashoffset: 720 }, { strokeDashoffset: 0, duration: 0.6, ease: 'power2.out' }, at(0, 0.7));
tl.fromTo('#s0-3', { scale: 1 }, { scale: 1.12, duration: 0.18, yoyo: true, repeat: 1, ease: 'sine.inOut' }, at(0, 0.78));

// 1. bus home: you ask, it starts typing
step('#s1', T.at(1)); title('#s1', T.at(1) + 0.05); card('#s1-card', T.at(1) + 0.12);
late('#s1-head', T.at(1) + 0.4); late('#s1-where', T.at(1) + 0.45);
tl.fromTo('#s1-user', { x: 50, opacity: 0, scale: 0.85 }, { x: 0, opacity: 1, scale: 1, duration: 0.4, ease: POP }, at(1, 0.3));
tl.fromTo('#s1-dots', { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 0.3, ease: POP }, at(1, 0.72));
tl.fromTo('#s1-dots i', { y: 0 }, { y: -10, duration: 0.15, yoyo: true, repeat: 5, stagger: 0.1, ease: 'sine.inOut' }, at(1, 0.72) + 0.2);

// 2. the robot reply lands, the phrase lights up red, ROBOT slams on the buzz
step('#s2', T.at(2)); title('#s2', T.at(2) + 0.05);
tl.to('#s1-dots', { opacity: 0, scale: 0.8, duration: 0.15, ease: 'power3.in' }, T.voice(2) - 0.05);
tl.fromTo('#s1-ai', { opacity: 0, y: 30, filter: 'blur(12px)' }, { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.45, ease: OUT }, T.voice(2) + 0.05);
tl.fromTo('#s1-hl', { backgroundColor: 'rgba(194,59,43,0)' }, { backgroundColor: 'rgba(194,59,43,0.18)', duration: 0.3, ease: 'power2.out' }, T.voice(2) + 0.6);
tl.fromTo('#s1-stamp', { scale: 2.4, opacity: 0, rotation: -22 }, { scale: 1, opacity: 1, rotation: -8, duration: 0.22, ease: 'power4.in' }, T.voice(2) + 0.98);
shake('#s1-card', T.voice(2) + 1.2, 9);

// 3. the tailor: shirt draws, measurements are all question marks, so it guesses one size
step('#s3', T.at(3)); title('#s3', T.at(3) + 0.05); card('#s3-card', T.at(3) + 0.12);
tl.fromTo('#s3-shirt-p', { strokeDashoffset: 900 }, { strokeDashoffset: 0, duration: 0.7, ease: 'power2.out' }, T.at(3) + 0.3);
tl.fromTo('#s3-shirt-f', { opacity: 0 }, { opacity: 1, duration: 0.4, ease: 'power2.out' }, T.at(3) + 0.6);
['#mr1', '#mr2', '#mr3'].forEach((id, i) => slide(id, T.at(3) + 0.35 + i * 0.07));
tl.fromTo('#s3-meas', { opacity: 0 }, { opacity: 1, duration: 0.3, ease: 'power2.out' }, at(3, 0.5));
tl.fromTo('#s3-tape', { scaleX: 0 }, { scaleX: 1, duration: 0.6, ease: 'power3.out' }, at(3, 0.5));
['#q1', '#q2', '#q3'].forEach((id, i) => chip(id, at(3, 0.6) + i * 0.08));
tl.fromTo('#s3-guess', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: OUT }, at(3, 0.76));
chip('#s3-gchip', at(3, 0.84));
late('#s3-note', at(3, 0.92));

// 4. step 1: three of your own messages drop into the slots on the beat, the counter ticks to 3 / 3
step('#s4', T.at(4)); title('#s4', T.at(4) + 0.05); card('#s4-card', T.at(4) + 0.12);
late('#s4-head', T.at(4) + 0.4); late('#s4-n', T.at(4) + 0.45);
['#m1', '#m2', '#m3'].forEach((id, i) => {
  const t = T.voice(4) + 0.42 + i * T.beat;
  tl.fromTo(id, { y: -50, opacity: 0, scale: 0.95 }, { y: 0, opacity: 1, scale: 1, duration: 0.4, ease: OUT }, t);
  chip(`${id} .num`, t + 0.08);
});
const cnt = { v: 0 };
tl.fromTo(cnt, { v: 0 }, { v: 3, duration: 3 * T.beat, ease: 'none', onUpdate: () => { document.getElementById('s4-n').textContent = `${Math.floor(cnt.v + 0.0001)} / 3`; } }, T.voice(4) + 0.05);
late('#s4-foot', at(4, 0.82)); late('#s4-ex', at(4, 0.88));

// 5. step 2: messages attached on the click, the prompt types, a scan bar reads your style row by row
step('#s5', T.at(5)); title('#s5', T.at(5) + 0.05); card('#s5-a', T.at(5) + 0.1); card('#s5-b', T.at(5) + 0.25);
chip('#s5-att', T.voice(5) + 0.1);
['#s5-l1', '#s5-l2', '#s5-l3'].forEach((id, i) => tl.fromTo(id, { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 0.36, ease: 'steps(14)' }, T.voice(5) + 0.35 + i * 0.38));
tl.fromTo('#s5-go', { scale: 1 }, { scale: 0.9, duration: 0.1, yoyo: true, repeat: 1, ease: 'power2.inOut' }, T.voice(5) + 1.45);
tl.fromTo('#s5-scan', { y: 0, opacity: 0 }, { y: 0, opacity: 1, duration: 0.2, ease: 'power2.out' }, T.voice(5) + 1.5);
tl.to('#s5-scan', { y: 96, duration: 0.3, ease: 'power2.inOut' }, T.voice(5) + 1.78);
tl.to('#s5-scan', { y: 192, duration: 0.3, ease: 'power2.inOut' }, T.voice(5) + 2.13);
['#v1', '#v2', '#v3'].forEach((id, i) => chip(id, T.voice(5) + 1.6 + i * 0.35));

// 6. the result: the robot draft is struck out, your message builds as it is said, the cooker whistles
step('#s6', T.at(6)); title('#s6', T.at(6) + 0.05); card('#s6-card', T.at(6) + 0.1);
late('#s6-bl', T.at(6) + 0.35); late('#s6-ex', T.at(6) + 0.4);
tl.fromTo('#s6-st1', { scaleX: 0 }, { scaleX: 1, duration: 0.28, ease: 'power3.in' }, T.voice(6) + 0.25);
tl.fromTo('#s6-st2', { scaleX: 0 }, { scaleX: 1, duration: 0.28, ease: 'power3.in' }, T.voice(6) + 0.38);
late('#s6-al', at(6, 0.1));
tl.fromTo('#s6-after', { opacity: 0, y: 40, scale: 0.92 }, { opacity: 1, y: 0, scale: 1, duration: 0.45, ease: POP }, at(6, 0.12));
[['#a1', 0.16], ['#a2', 0.4], ['#a3', 0.62]].forEach(([id, f]) => tl.fromTo(id, { opacity: 0, filter: 'blur(12px)' }, { opacity: 1, filter: 'blur(0px)', duration: 0.4, ease: OUT }, at(6, f)));
['#ok1', '#ok2', '#ok3'].forEach((id, i) => chip(id, at(6, 0.72) + i * 0.07));
tl.to('#s6-after', { scale: 1.05, duration: 0.18, yoyo: true, repeat: 1, ease: 'sine.inOut' }, at(6, 0.8));

// 7. the catch: typo gets a red squiggle, READ FIRST, then NEVER shakes on "others' chats"
step('#s7', T.at(7)); title('#s7', T.at(7) + 0.05); card('#s7-card', T.at(7) + 0.1);
slide('#k1', T.at(7) + 0.35);
tl.fromTo('#s7-sq-p', { strokeDashoffset: 300 }, { strokeDashoffset: 0, duration: 0.5, ease: 'power2.out' }, at(7, 0.22));
chip('#c1', at(7, 0.4));
slide('#k2', at(7, 0.5));
chip('#c2', at(7, 0.72));
shake('#k2', at(7, 0.72) + 0.3, 7);
slide('#k3', at(7, 0.82));
chip('#c3', at(7, 0.9));

// 8. send this, then the keyword letters drop in one by one and the pill lands
tl.fromTo('#s8-send', { opacity: 0, y: 30, filter: 'blur(12px)' }, { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.5, ease: OUT }, T.at(8));
tl.fromTo('#s8-mark', { y: -80, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: 'back.out(2)' }, T.at(8) + 0.3);
late('#s8-who', T.voice(8) + 0.3);
card('#s8-card', at(8, 0.45));
chip('#s8-av', at(8, 0.45) + 0.25);
late('#s8-cl', at(8, 0.45) + 0.3);
['#L1', '#L2', '#L3', '#L4', '#L5'].forEach((id, i) => tl.fromTo(id, { y: -120, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: 'back.out(1.6)' }, at(8, 0.7) + i * 0.1));
tl.fromTo('#s8-pill', { scale: 0.6, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.45, ease: POP }, at(8, 0.9));
chip('#s8-free', T.end(8) + 0.1);
tl.fromTo('#s8-word', { scale: 1 }, { scale: 1.06, duration: 0.3, yoyo: true, repeat: 1, ease: 'sine.inOut' }, T.end(8) + 0.5);
tl.to('#s8-mark', { y: -10, duration: 0.6, yoyo: true, repeat: 1, ease: 'sine.inOut' }, T.end(8) + 0.4);
