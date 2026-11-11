// Tutorial, 4 steps (#11 list with a favourite): talk -> prompt -> "more polite, shorter" (favourite) -> PDF on WhatsApp.
// Payoff shows the finished example letter; the catch shows the gap the AI filled (dates) and what to check.
const OUT = 'expo.out', POP = 'back.out(1.8)';
const span = (n) => T.end(n) - T.voice(n);
const sp = (n, f) => T.voice(n) + f * span(n);
const title = (s, t) => tl.fromTo(`${s} .title .l`, { yPercent: 110 }, { yPercent: 0, duration: 0.55, ease: OUT, stagger: 0.08 }, t);
const step = (s, t) => tl.fromTo(`${s} .step`, { x: -40, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4, ease: OUT }, t);
const card = (id, t) => tl.fromTo(id, { y: 110, opacity: 0, scale: 0.96 }, { y: 0, opacity: 1, scale: 1, duration: 0.55, ease: OUT }, t);
const late = (id, t) => tl.fromTo(id, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.35, ease: OUT }, t);
const row = (id, t) => tl.fromTo(id, { x: 60, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4, ease: OUT }, t);
const chip = (id, t) => {
  tl.fromTo(id, { scale: 0, opacity: 0 }, { scale: 1.12, opacity: 1, duration: 0.22, ease: 'power2.out' }, t);
  tl.to(id, { scale: 1, duration: 0.18, ease: 'power2.inOut' }, t + 0.22);
};
const shake = (id, t, px = 8) => tl.fromTo(id, { x: 0 }, { x: px, duration: 0.05, repeat: 5, yoyo: true, ease: 'none' }, t);

// texture: two soft orbs drift for the whole reel
tl.fromTo('#orb1', { x: 0, y: 0 }, { x: 150, y: -120, duration: T.dur, ease: 'sine.inOut' }, 0);
tl.fromTo('#orb2', { x: 0, y: 0 }, { x: -170, y: -150, duration: T.dur, ease: 'sine.inOut' }, 0);

// progress bar: one segment per step
tl.set(['#p1', '#p2', '#p3', '#p4'], { scaleX: 0 }, 0);
[1, 2, 3, 4].forEach((n) => tl.to(`#p${n}`, { scaleX: 1, duration: 0.5, ease: 'power2.out' }, T.at(n)));

// 0. hook: title and the 4-step row are on screen at frame 0; the row ticks through, step 3 gets the star
tl.fromTo('#s0-title .l', { yPercent: 0 }, { yPercent: 0, duration: 0.01 }, 0);
tl.fromTo('#s0-title', { scale: 1.06 }, { scale: 1, duration: 0.45, ease: OUT }, 0);
tl.to('#s0-title', { scale: 1.04, duration: 0.12, yoyo: true, repeat: 1, ease: 'sine.inOut' }, T.voice(0) + 0.5);
['#sc1', '#sc2', '#sc3', '#sc4'].forEach((id, i) => tl.to(id, { scale: 1.08, duration: 0.12, yoyo: true, repeat: 1, ease: 'sine.inOut' }, T.voice(0) + 0.65 + i * 0.08));
tl.to('#sc3', { scale: 1.1, duration: 0.16, yoyo: true, repeat: 3, ease: 'sine.inOut' }, sp(0, 0.66));
tl.fromTo('#s0-star', { rotation: 0, scale: 1 }, { rotation: 216, scale: 1.25, duration: 0.6, ease: POP }, sp(0, 0.66));

// 1. tap the mic and talk: mic pops, waveform moves, the spoken words land as a bubble
step('#s1', T.at(1)); title('#s1', T.at(1) + 0.05); card('#s1-card', T.at(1) + 0.12);
chip('#s1-hi', T.at(1) + 0.4); chip('#s1-en', T.at(1) + 0.47);
chip('#s1-mic', T.voice(1) + 0.15);
tl.fromTo('#s1-ring', { scale: 1, opacity: 0.6 }, { scale: 1.45, opacity: 0, duration: 0.6, repeat: 3, ease: 'power2.out' }, T.voice(1) + 0.3);
const r = T.rand(7);
for (let i = 1; i <= 16; i++) {
  const h = 0.3 + 0.7 * r();
  tl.fromTo(`#w${i}`, { scaleY: 0.15 }, { scaleY: h, duration: 0.24, yoyo: true, repeat: 7, ease: 'sine.inOut' }, T.voice(1) + 0.2 + i * 0.02);
}
tl.fromTo('#s1-bub', { scale: 0.85, opacity: 0, y: 20 }, { scale: 1, opacity: 1, y: 0, duration: 0.4, ease: POP }, T.voice(1) + 0.6);
tl.fromTo('#s1-txt', { clipPath: 'inset(0 0 100% 0)' }, { clipPath: 'inset(0 0 0% 0)', duration: 0.9, ease: 'steps(3)' }, T.voice(1) + 0.75);
late('#s1-note', sp(1, 0.8));

// 2. paste the prompt: the prompt bubble types in, the AI types, then asks its questions
step('#s2', T.at(2)); title('#s2', T.at(2) + 0.05); card('#s2-card', T.at(2) + 0.1);
chip('#s2-paste', T.voice(2) + 0.05);
tl.fromTo('#s2-user', { x: 80, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4, ease: OUT }, T.voice(2) + 0.3);
['#s2-p1', '#s2-p2', '#s2-p3'].forEach((id, i) => tl.fromTo(id, { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 0.3, ease: 'steps(12)' }, T.voice(2) + 0.45 + i * 0.18));
tl.fromTo('#s2-dots', { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 0.2, ease: POP }, T.voice(2) + 0.95);
['#d1', '#d2', '#d3'].forEach((id, i) => tl.fromTo(id, { y: 0 }, { y: -8, duration: 0.12, yoyo: true, repeat: 1, ease: 'sine.inOut' }, T.voice(2) + 1.0 + i * 0.06));
tl.to('#s2-dots', { opacity: 0, duration: 0.15, ease: 'power3.in' }, T.voice(2) + 1.3);
tl.fromTo('#s2-ai', { opacity: 0, scale: 0.85, y: 20 }, { opacity: 1, scale: 1, y: 0, duration: 0.4, ease: POP }, T.voice(2) + 1.3);
late('#s2-note', T.voice(2) + 1.55);

// 3. the favourite: star lands on "the best one", the ask types, the new polite version replaces the blunt draft
step('#s3', T.at(3)); title('#s3', T.at(3) + 0.05); card('#s3-card', T.at(3) + 0.12);
late('#s3-l1', T.at(3) + 0.35); row('#s3-draft', T.at(3) + 0.4);
chip('#s3-fav', T.voice(3) + 0.9);
tl.fromTo('#s3-star', { rotation: -144 }, { rotation: 0, duration: 0.5, ease: POP }, T.voice(3) + 0.95);
tl.fromTo('#s3-typed', { scale: 0.9, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.3, ease: POP }, sp(3, 0.42));
tl.fromTo('#s3-tt', { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 0.55, ease: 'steps(20)' }, sp(3, 0.42) + 0.1);
tl.to('#s3-draft', { opacity: 0.45, duration: 0.3, ease: 'power2.out' }, sp(3, 0.7));
late('#s3-l2', sp(3, 0.7));
tl.fromTo('#s3-new', { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: OUT }, sp(3, 0.7));
tl.to('#s3-new', { scale: 1.04, duration: 0.12, yoyo: true, repeat: 1, ease: 'sine.inOut' }, sp(3, 0.7) + 0.42);
chip('#s3-c1', sp(3, 0.82)); chip('#s3-c2', sp(3, 0.82) + 0.07);

// 4. save as PDF and share: two ticked steps, then the PDF lands in the chat with blue ticks
step('#s4', T.at(4)); title('#s4', T.at(4) + 0.05); card('#s4-card', T.at(4) + 0.12);
row('#s4-r1', T.voice(4) + 0.15); chip('#s4-ok1', sp(4, 0.25));
row('#s4-r2', sp(4, 0.2)); chip('#s4-pdf', sp(4, 0.32)); chip('#s4-ok2', sp(4, 0.42));
tl.fromTo('#s4-chat', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.4, ease: OUT }, sp(4, 0.3));
late('#s4-lbl', sp(4, 0.36));
tl.fromTo('#s4-file', { scale: 0.6, opacity: 0, y: 40 }, { scale: 1, opacity: 1, y: 0, duration: 0.45, ease: POP }, T.voice(4) + 1.15);
tl.fromTo('#s4-tick', { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 0.3, ease: 'power2.out' }, T.voice(4) + 1.7);
late('#s4-note', T.voice(4) + 1.9);

// 5. the payoff: the finished letter writes itself in, READY slams on before the cover frame
step('#s5', T.at(5)); title('#s5', T.at(5) + 0.03);
tl.fromTo('#s5-card', { y: 90, opacity: 0, scale: 0.94 }, { y: 0, opacity: 1, scale: 1, duration: 0.5, ease: OUT }, T.at(5) + 0.08);
late('#s5-from', T.at(5) + 0.25); chip('#s5-pdf', T.at(5) + 0.3);
['#lt1', '#lt2', '#lt3', '#lt4', '#lt5', '#lt6'].forEach((id, i) => tl.fromTo(id, { opacity: 0, filter: 'blur(10px)', y: 10 }, { opacity: 1, filter: 'blur(0px)', y: 0, duration: 0.35, ease: OUT }, T.at(5) + 0.22 + i * 0.07));
late('#s5-ex', T.at(5) + 0.6);
tl.fromTo('#s5-stamp', { scale: 2.4, opacity: 0, rotation: -24 }, { scale: 1, opacity: 1, rotation: -8, duration: 0.22, ease: 'power4.in' }, T.voice(5) + 0.55);
tl.to('#s5-card', { scale: 1.03, duration: 0.14, yoyo: true, repeat: 1, ease: 'sine.inOut' }, T.voice(5) + 1.0);

// 6. the catch: the guessed dates buzz, then three CHECK rows stamp in
step('#s6', T.at(6)); title('#s6', T.at(6) + 0.05); card('#s6-card', T.at(6) + 0.12);
late('#s6-glbl', T.at(6) + 0.4);
tl.fromTo('#s6-gt', { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.35, ease: OUT }, T.at(6) + 0.45);
shake('#s6-guess', T.voice(6) + 0.8, 9);
tl.fromTo('#s6-hl', { scale: 1 }, { scale: 1.15, duration: 0.15, yoyo: true, repeat: 1, ease: 'sine.inOut' }, T.voice(6) + 0.8);
['#k1', '#k2', '#k3'].forEach((id, i) => tl.fromTo(id, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.35, ease: OUT }, sp(6, 0.45) + i * 0.45));
['#h1', '#h2', '#h3'].forEach((id, i) => chip(id, sp(6, 0.45) + i * 0.45 + 0.15));

// 7. send this, then the keyword drops in letter by letter
tl.fromTo('#s7-send .l', { yPercent: 110 }, { yPercent: 0, duration: 0.6, ease: OUT }, T.at(7));
late('#s7-who', T.voice(7) + 0.3);
tl.fromTo('#s7-plane', { x: -200, y: 100, opacity: 0, rotation: -20 }, { x: 0, y: 0, opacity: 1, rotation: 0, duration: 0.7, ease: 'power2.out' }, T.at(7) + 0.3);
tl.fromTo('#s7-pill', { scale: 0.6, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.45, ease: POP }, sp(7, 0.62));
tl.fromTo('#kw .k', { yPercent: -130, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.4, ease: 'back.out(2)', stagger: 0.08 }, sp(7, 0.62) + 0.15);
tl.fromTo('#s7-stk', { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: POP }, T.end(7) - 0.1);
tl.to('#s7-pill', { scale: 1.05, duration: 0.15, yoyo: true, repeat: 1, ease: 'sine.inOut' }, T.end(7) + 0.2);
tl.to('#s7-plane', { x: 24, y: -16, duration: 0.8, yoyo: true, repeat: 1, ease: 'sine.inOut' }, T.end(7) + 0.1);
