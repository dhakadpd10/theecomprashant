// Prompt reel: "Tell me about yourself" in 3 facts, in order. One analogy (packing a bag), colour = meaning
// (blue NOW, green PROOF, terracotta WHY THIS JOB, red vague / don't). Enters expo.out, pops back.out,
// slams power4.in, labels settle after their card, slow orbs behind everything.
const OUT = 'expo.out', POP = 'back.out(1.8)';
const span = (n) => T.end(n) - T.voice(n);
const at = (n, f) => T.voice(n) + f * span(n);
const title = (s, t) => tl.fromTo(`${s} .title .l`, { yPercent: 110 }, { yPercent: 0, duration: 0.55, ease: OUT, stagger: 0.08 }, t);
const step = (s, t) => tl.fromTo(`${s} .step`, { x: -40, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4, ease: OUT }, t);
const card = (id, t) => tl.fromTo(id, { y: 110, opacity: 0, scale: 0.96 }, { y: 0, opacity: 1, scale: 1, duration: 0.6, ease: OUT }, t);
const late = (id, t) => tl.fromTo(id, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.35, ease: OUT }, t);
const slideIn = (id, t, dx = 60) => tl.fromTo(id, { x: dx, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4, ease: OUT }, t);
const pop = (id, t) => {
  tl.fromTo(id, { scale: 0, opacity: 0 }, { scale: 1.12, opacity: 1, duration: 0.22, ease: 'power2.out' }, t);
  tl.to(id, { scale: 1, duration: 0.18, ease: 'power2.inOut' }, t + 0.22);
};
const slam = (id, t, rot = 0) => tl.fromTo(id, { scale: 2.2, opacity: 0, rotation: rot - 12 }, { scale: 1, opacity: 1, rotation: rot, duration: 0.22, ease: 'power4.in' }, t);
const shake = (id, t, px = 8) => tl.fromTo(id, { x: 0 }, { x: px, duration: 0.05, repeat: 5, yoyo: true, ease: 'none' }, t);
const press = (id, t) => {
  tl.fromTo(id, { scale: 1 }, { scale: 0.9, duration: 0.1, ease: 'power2.in' }, t);
  tl.to(id, { scale: 1.06, duration: 0.2, ease: POP }, t + 0.1);
  tl.to(id, { scale: 1, duration: 0.15, ease: 'power2.out' }, t + 0.3);
};

// ambient: two soft orbs drift the whole reel
tl.fromTo('#orb1', { x: 0, y: 0 }, { x: 170, y: -120, duration: T.dur, ease: 'sine.inOut' }, 0);
tl.fromTo('#orb2', { x: 0, y: 0 }, { x: -180, y: -150, duration: T.dur, ease: 'sine.inOut' }, 0);

// progress bar: one segment per step
tl.set(['#p1', '#p2', '#p3', '#p4', '#p5', '#p6', '#p7'], { scaleX: 0 }, 0);
[1, 2, 3, 4, 5, 6, 7].forEach((n) => tl.to(`#p${n}`, { scaleX: 1, duration: 0.5, ease: 'power2.out' }, T.at(n)));

// 0. hook: title on screen at frame 0; "learn it by heart" gets struck on the thud, "In order." gets underlined
tl.fromTo('#s0-title', { scale: 1.05 }, { scale: 1, duration: 0.5, ease: OUT }, 0);
tl.fromTo('#s0-strike', { scaleX: 0 }, { scaleX: 1, duration: 0.22, ease: 'power4.in' }, T.voice(0) + 0.38);
tl.to('#s0-title', { scale: 1.04, duration: 0.12, ease: 'power2.out' }, T.voice(0) + 0.62);
tl.to('#s0-title', { scale: 1, duration: 0.3, ease: 'power2.inOut' }, T.voice(0) + 0.74);
tl.fromTo('#s0-line-p', { strokeDashoffset: 520 }, { strokeDashoffset: 0, duration: 0.5, ease: 'power2.out' }, at(0, 0.72));

// 1. the night before: interview tomorrow, answer not ready, the question gets typed and sent
step('#s1', T.at(1)); title('#s1', T.at(1) + 0.05); card('#s1-card', T.at(1) + 0.15);
pop('#s1-cal', T.at(1) + 0.45); late('#s1-int', T.at(1) + 0.5);
slideIn('#s1-r', at(1, 0.18));
pop('#s1-tom', at(1, 0.3));
pop('#s1-no', at(1, 0.4)); shake('#s1-no', at(1, 0.4) + 0.42, 6);
late('#s1-you', at(1, 0.42));
tl.fromTo('#s1-text', { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 1.0, ease: 'steps(23)' }, at(1, 0.48));
press('#s1-send', T.end(1) - 0.25);

// 2. basic prompt: the vague words land one by one, each slammed VAGUE (first one on the buzz)
step('#s2', T.at(2)); title('#s2', T.at(2) + 0.05); card('#s2-card', T.at(2) + 0.15);
pop('#s2-you', T.at(2) + 0.4); late('#s2-lbl', T.at(2) + 0.6);
const c0 = T.voice(2) + 1.2;
['#s2-r1', '#s2-r2', '#s2-r3'].forEach((id, i) => slideIn(id, c0 - 0.25 + i * 0.45));
['#v1', '#v2', '#v3'].forEach((id, i) => slam(id, c0 + i * 0.45));
late('#s2-note', c0 + 1.0);
shake('#s2-card', c0 + 1.1, 8);

// 3. the analogy: everything gets thrown in the bag, no order
step('#s3', T.at(3)); title('#s3', T.at(3) + 0.05); card('#s3-card', T.at(3) + 0.15);
late('#s3-lbl', T.at(3) + 0.45);
tl.fromTo('#s3-bag', { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: OUT }, T.at(3) + 0.3);
const r = T.rand(11);
['#t1', '#t2', '#t3', '#t4', '#t5', '#t6'].forEach((id, i) => {
  const r0 = r() * 50 - 25, rf = r() * 14 - 7;
  tl.fromTo(id, { y: -280, opacity: 0, rotation: r0 }, { y: 0, opacity: 1, rotation: rf, duration: 0.55, ease: 'bounce.out' }, T.voice(3) + 0.15 + i * 0.2);
});
tl.fromTo('#s3-bag', { scaleY: 1 }, { scaleY: 0.94, duration: 0.1, yoyo: true, repeat: 1, ease: 'sine.inOut' }, T.voice(3) + 1.35);
slam('#s3-no', at(3, 0.78), -6);
shake('#s3-card', at(3, 0.78) + 0.24, 7);

// 4. the prompt packs three, in order: each slot fills on its pop
step('#s4', T.at(4)); title('#s4', T.at(4) + 0.05); card('#s4-card', T.at(4) + 0.15);
late('#s4-lbl', T.at(4) + 0.45);
['#k1', '#k2', '#k3'].forEach((id, i) => slideIn(id, T.at(4) + 0.5 + i * 0.08, 60));
[2.0, 2.4, 2.9].forEach((p, i) => {
  const t = T.voice(4) + p, k = `#k${i + 1}`;
  tl.fromTo(k, { scale: 1 }, { scale: 0.97, duration: 0.08, yoyo: true, repeat: 1, ease: 'sine.inOut' }, t - 0.16);
  tl.fromTo(`${k} .bg`, { opacity: 0 }, { opacity: 1, duration: 0.2, ease: 'power2.out' }, t);
  tl.fromTo(`${k} .numf`, { scale: 0.4, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.3, ease: POP }, t);
  tl.fromTo(`${k} .sub`, { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 0.25, ease: 'power2.out' }, t + 0.04);
  pop(`${k} .tick`, t + 0.08);
});

// 5. the result: CV + job post in, GO on the click, the answer builds NOW / PROOF / WHY, timer reaches 0:30
step('#s5', T.at(5)); title('#s5', T.at(5) + 0.05); card('#s5-card', T.at(5));
press('#s5-go', T.voice(5) + 0.12);
late('#s5-lbl', T.voice(5) + 0.4); pop('#s5-timer', T.voice(5) + 0.4);
['#b1', '#b2', '#b3'].forEach((id, i) => slideIn(id, T.voice(5) + 0.5 + i * 0.55, 70));
const clock = { v: 0 };
tl.fromTo(clock, { v: 0 }, { v: 30, duration: 1.7, ease: 'power2.out', onUpdate: () => { document.getElementById('s5-timer').textContent = `0:${String(Math.round(clock.v)).padStart(2, '0')}`; } }, T.voice(5) + 0.5);
tl.fromTo('#b3', { scale: 1 }, { scale: 1.04, duration: 0.18, yoyo: true, repeat: 1, ease: 'sine.inOut' }, T.voice(5) + 2.3);

// 6. the catch: DO / NO rows, the NO lines get struck through
step('#s6', T.at(6)); title('#s6', T.at(6) + 0.05); card('#s6-card', T.at(6) + 0.15);
[0.08, 0.28, 0.52, 0.7].forEach((f, i) => { const t = at(6, f); slideIn(`#c${i + 1}`, t, 50); pop(`#h${i + 1}`, t + 0.15); });
tl.fromTo('#x2', { scaleX: 0 }, { scaleX: 1, duration: 0.3, ease: 'power3.out' }, at(6, 0.28) + 0.3);
tl.fromTo('#x4', { scaleX: 0 }, { scaleX: 1, duration: 0.3, ease: 'power3.out' }, at(6, 0.7) + 0.3);

// 7. send this, then the keyword drops in letter by letter, the pill lands, a gentle hold to the end
tl.fromTo('#s7-send', { yPercent: 40, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.6, ease: OUT }, T.at(7));
late('#s7-who', T.voice(7) + 0.3);
card('#s7-card', at(7, 0.4));
['#L1', '#L2', '#L3', '#L4', '#L5'].forEach((id, i) => tl.fromTo(id, { y: -120, opacity: 0 }, { y: 0, opacity: 1, duration: 0.45, ease: 'back.out(2)' }, at(7, 0.62) + i * 0.08));
tl.fromTo('#s7-free', { scale: 0, opacity: 0, rotation: -20 }, { scale: 1, opacity: 1, rotation: -4, duration: 0.4, ease: POP }, at(7, 0.55));
late('#s7-save', at(7, 0.75));
tl.fromTo('#s7-pill', { scale: 0.6, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.45, ease: POP }, at(7, 0.8));
tl.fromTo('#s7-bm', { rotation: 0 }, { rotation: 8, duration: 0.12, yoyo: true, repeat: 3, ease: 'sine.inOut' }, at(7, 0.8) + 0.3);
tl.fromTo('#s7-word', { scale: 1 }, { scale: 1.06, duration: 0.3, yoyo: true, repeat: 1, ease: 'sine.inOut' }, T.end(7) + 0.2);
