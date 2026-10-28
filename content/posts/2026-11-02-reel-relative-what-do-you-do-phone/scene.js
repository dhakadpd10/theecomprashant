// Editorial skit: the hook is on screen at frame 0, then a chat that mishears three times
// (a "HEARD" tally fills: GAMES, FEVER, RISHTA), a voice note a week later, "Free hai na?", send, keyword card.
const OUT = 'expo.out', POP = 'back.out(1.8)';
const span = (n) => T.end(n) - T.voice(n);
const at = (n, f) => T.voice(n) + f * span(n);
const title = (sel, t) => tl.fromTo(`${sel} .l`, { yPercent: 110 }, { yPercent: 0, duration: 0.55, ease: OUT, stagger: 0.08 }, t);
const kick = (sel, t) => tl.fromTo(sel, { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 0.4, ease: 'power3.out' }, t);

// texture: two warm blobs drift across the whole reel
tl.fromTo('#blob1', { x: 0, y: 0 }, { x: -120, y: 90, duration: T.dur / 2, ease: 'sine.inOut', yoyo: true, repeat: 1 }, 0);
tl.fromTo('#blob2', { x: 0, y: 0 }, { x: 140, y: -80, duration: T.dur / 2, ease: 'sine.inOut', yoyo: true, repeat: 1 }, 0);

// 0. hook: title and heart already on screen at frame 0
tl.fromTo('#s0 .l', { yPercent: 0 }, { yPercent: 0, duration: 0.01 }, 0);
tl.fromTo('#s0-title', { scale: 1.05 }, { scale: 1, duration: 0.6, ease: OUT }, 0);
tl.fromTo('#s0-heart', { scale: 1, rotation: 0 }, { scale: 1.18, rotation: -6, duration: 0.15, yoyo: true, repeat: 3, ease: 'sine.inOut' }, at(0, 0.8));
tl.fromTo('#s0-heart', { y: 0 }, { y: -10, duration: T.beat, yoyo: true, repeat: 1, ease: 'sine.inOut' }, T.beat);

// 1. the question (cover frame)
kick('#s1-k', T.at(1));
title('#s1-title', T.at(1) + 0.05);
tl.to('#s1-title', { scale: 1.03, duration: 0.25, yoyo: true, repeat: 1, ease: 'sine.inOut' }, at(1, 0.55));
tl.fromTo('#s1-chip', { scale: 0.6, opacity: 0, rotation: -12 }, { scale: 1, opacity: 1, rotation: -4, duration: 0.4, ease: POP }, at(1, 0.85));

// tally of what he heard
tl.fromTo('#st-k', { opacity: 0, x: -30 }, { opacity: 1, x: 0, duration: 0.4, ease: OUT }, T.at(2));
tl.fromTo('#st .slot', { y: -20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: OUT, stagger: 0.07 }, T.at(2) + 0.05);
tl.set(['#t1f', '#t2f', '#t3f'], { opacity: 0 }, 0);

// 2-4. each exchange: my bubble, typing dots, his mishearing pops, the tally slot slams
const ex = (n, fMe, fDots, fHe, fSlot, slot) => {
  const s = `#s${n}`;
  tl.fromTo(`${s} .me`, { scale: 0 }, { scale: 1, duration: 0.35, ease: POP }, T.at(n));
  tl.fromTo(`${s}-me`, { x: -50, opacity: 0, scale: 0.9 }, { x: 0, opacity: 1, scale: 1, duration: 0.4, ease: OUT }, T.voice(n) + fMe);
  const tD = T.voice(n) + fDots, tH = T.voice(n) + fHe, tS = T.voice(n) + fSlot;
  tl.fromTo(`${s} .ch`, { scale: 0 }, { scale: 1, duration: 0.35, ease: POP }, tD - 0.1);
  tl.fromTo(`${s}-dots`, { opacity: 0, scale: 0.7 }, { opacity: 1, scale: 1, duration: 0.25, ease: POP }, tD);
  tl.fromTo(`${s}-dots i`, { y: 0 }, { y: -10, duration: 0.12, yoyo: true, repeat: 1, stagger: 0.07, ease: 'sine.inOut' }, tD + 0.1);
  tl.to(`${s}-dots`, { opacity: 0, scale: 0.8, duration: 0.15, ease: 'power3.in' }, tH - 0.12);
  tl.fromTo(`${s}-he`, { scale: 0.4, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.35, ease: POP }, tH);
  tl.fromTo(slot, { scale: 1.8, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.25, ease: 'power4.in' }, tS);
  tl.fromTo(`${s}-he`, { x: 0 }, { x: 8, duration: 0.05, repeat: 5, yoyo: true, ease: 'none' }, tS + 0.25);
};
ex(2, 0.05, 0.95, 1.6, 1.85, '#t1f');
ex(3, 0.05, 0.75, 1.15, 1.5, '#t2f');
ex(4, 0.05, 1.0, 1.35, 1.6, '#t3f');
tl.fromTo('#s4-heart', { scale: 0, rotation: -30 }, { scale: 1, rotation: 0, duration: 0.4, ease: POP }, at(4, 0.7));
tl.to('#s4-heart', { scale: 1.15, duration: 0.15, yoyo: true, repeat: 3, ease: 'sine.inOut' }, at(4, 0.7) + 0.45);

// 5. one week later: the voice note lands
kick('#s5-k', T.at(5));
tl.fromTo('#s5-card', { y: 60, opacity: 0, scale: 0.96 }, { y: 0, opacity: 1, scale: 1, duration: 0.5, ease: OUT }, T.voice(5) + 0.2);
tl.fromTo('#s5-play', { scale: 0 }, { scale: 1, duration: 0.4, ease: POP }, T.voice(5) + 0.3);
tl.fromTo('#s5-wave i', { scaleY: 0.2 }, { scaleY: 1, duration: 0.3, ease: OUT, stagger: 0.02 }, T.voice(5) + 0.4);
tl.fromTo('#s5-who', { opacity: 0 }, { opacity: 1, duration: 0.3 }, T.voice(5) + 0.6);

// 6. it plays: bars wiggle, progress runs, then "Free hai na?" slams
const r = T.rand(7);
for (let i = 1; i <= 26; i++) {
  tl.to(`#s5-wave i:nth-child(${i})`, { scaleY: 0.35 + 0.6 * r(), duration: 0.2 + 0.08 * r(), yoyo: true, repeat: 13, ease: 'sine.inOut' }, T.voice(6) + 0.01 * i);
}
tl.fromTo('#s5-prog', { scaleX: 0 }, { scaleX: 1, duration: span(6), ease: 'none' }, T.voice(6));
tl.fromTo('#s6-chip', { scale: 0.6, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: POP }, T.voice(6) + 0.3);
tl.fromTo('#s6-title', { scale: 1.6, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.28, ease: 'power4.in' }, at(6, 0.62));
tl.to('#s6-title', { scale: 1.05, duration: 0.18, yoyo: true, repeat: 1, ease: 'sine.inOut' }, at(6, 0.62) + 0.32);
tl.fromTo('#s6-chip', { x: 0 }, { x: 8, duration: 0.05, repeat: 5, yoyo: true, ease: 'none' }, at(6, 0.62) + 0.3);

// 7. send this: the plane flies in, the cousin line blurs in
title('#s7-title', T.at(7));
tl.fromTo('#s7-plane', { x: -200, y: 120, opacity: 0, rotation: -20 }, { x: 0, y: 0, opacity: 1, rotation: 0, duration: 0.7, ease: OUT }, T.at(7) + 0.25);
tl.fromTo('#s7-sub', { filter: 'blur(12px)', opacity: 0 }, { filter: 'blur(0px)', opacity: 1, duration: 0.5, ease: OUT }, at(7, 0.3));
tl.to('#s7-plane', { x: 20, y: -16, duration: 0.8, yoyo: true, repeat: 1, ease: 'sine.inOut' }, T.at(7) + 1.0);

// 8. keyword: MONEY letters drop in on the beat, the planner card, the pill, Save.
kick('#s8-k', T.at(8));
title('#s8-title', T.at(8) + 0.05);
tl.fromTo('#s8 .kw b', { yPercent: -120, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.4, ease: POP, stagger: 0.06 }, T.voice(8) + 0.25);
tl.fromTo('#s8-card', { y: 100, opacity: 0, scale: 0.96 }, { y: 0, opacity: 1, scale: 1, duration: 0.55, ease: OUT }, T.voice(8) + 0.5);
tl.fromTo('#s8 .row', { x: 60, opacity: 0 }, { x: 0, opacity: 1, duration: 0.35, ease: OUT, stagger: 0.08 }, T.voice(8) + 0.75);
tl.fromTo('#s8 .tk', { scale: 0 }, { scale: 1, duration: 0.3, ease: POP, stagger: 0.08 }, T.voice(8) + 0.95);
tl.fromTo('#s8-pill', { scale: 0.6, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.45, ease: POP }, T.voice(8) + 1.3);
tl.fromTo('#s8-mark', { y: -40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: POP }, T.end(8) + 0.1);
tl.fromTo('#s8-save', { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 0.4, ease: OUT }, T.end(8) + 0.18);
tl.to('#s8 .kw b', { y: -12, duration: 0.15, yoyo: true, repeat: 1, stagger: 0.05, ease: 'sine.inOut' }, T.end(8) + 0.5);
