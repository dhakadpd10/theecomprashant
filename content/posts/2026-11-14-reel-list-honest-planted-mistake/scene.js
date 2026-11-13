// Clay explainer, ranked compare: receipt hook, three free AIs typing, the "looks good, bro" colleague, ranked verdict cards (colour = meaning), the ring around the wrong total, the catch, send, keyword.
const OUT = 'expo.out', POP = 'back.out(1.8)';
const span = (n) => T.end(n) - T.voice(n);
const at = (n, f) => T.voice(n) + f * span(n);
const title = (s, t) => tl.fromTo(`${s} .title .l`, { yPercent: 110 }, { yPercent: 0, duration: 0.55, ease: OUT, stagger: 0.08 }, t);
const step = (s, t) => tl.fromTo(`${s} .step`, { x: -40, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4, ease: OUT }, t);
const rise = (id, t) => tl.fromTo(id, { y: 110, opacity: 0, scale: 0.96 }, { y: 0, opacity: 1, scale: 1, duration: 0.6, ease: OUT }, t);
const shake = (id, t) => tl.fromTo(id, { x: 0 }, { x: 8, duration: 0.05, repeat: 5, yoyo: true, ease: 'none' }, t);
const bump = (id, t) => tl.fromTo(id, { scale: 1 }, { scale: 1.05, duration: 0.18, yoyo: true, repeat: 1, ease: 'sine.inOut' }, t);

// texture: slow drifting clay blobs for the whole reel
tl.fromTo('#b1', { x: -40, y: 0 }, { x: 90, y: 140, duration: T.dur / 2, yoyo: true, repeat: 1, ease: 'sine.inOut' }, 0);
tl.fromTo('#b2', { x: 40, y: 0 }, { x: -120, y: -110, duration: T.dur / 2, yoyo: true, repeat: 1, ease: 'sine.inOut' }, 0);
tl.fromTo('#b3', { x: 0, y: 0 }, { x: -80, y: 60, duration: T.dur / 2, yoyo: true, repeat: 1, ease: 'sine.inOut' }, 0);

// progress bar: one segment per beat after the hook
const segs = ['#p1', '#p2', '#p3', '#p4', '#p5', '#p6', '#p7', '#p8'];
tl.set(segs, { scaleX: 0 }, 0);
segs.forEach((id, i) => tl.to(id, { scaleX: 1, duration: 0.5, ease: 'power2.out' }, T.at(i + 1)));

// 0. hook: title and receipt on screen at frame 0, then the hidden mark pops on the wrong total
tl.fromTo('#s0-title .l', { yPercent: 0 }, { yPercent: 0, duration: 0.01 }, 0);
tl.fromTo('#s0-title', { scale: 1.06 }, { scale: 1, duration: 0.6, ease: OUT }, 0);
tl.fromTo('#s0-rc', { scale: 1.04 }, { scale: 1, duration: 0.6, ease: OUT }, 0);
tl.fromTo('#s0-step', { opacity: 0.6 }, { opacity: 1, duration: 0.3 }, 0);
tl.fromTo('#s0-mark', { scale: 0 }, { scale: 1, duration: 0.4, ease: POP }, at(0, 0.4));
shake('#s0-tot', at(0, 0.4) + 0.4);
bump('#s0-step', at(0, 0.72));

// 1. same budget, three free AIs: the question goes out, three chats start typing
step('#s1', T.at(1)); title('#s1', T.at(1) + 0.05);
tl.fromTo('#s1-you', { scale: 0.6, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: POP }, T.at(1) + 0.25);
tl.fromTo('#s1 .ai', { x: 70, opacity: 0 }, { x: 0, opacity: 1, duration: 0.45, ease: OUT, stagger: 0.08 }, at(1, 0.35));
tl.fromTo('#s1 .dt', { y: 0 }, { y: -10, duration: 0.18, yoyo: true, repeat: 5, ease: 'sine.inOut', stagger: 0.05 }, at(1, 0.6));

// 2. AIs lean to yes: the colleague says "looks good, bro", the file stays shut
step('#s2', T.at(2)); title('#s2', T.at(2) + 0.05); rise('#s2-card', T.at(2) + 0.2);
tl.fromTo('#s2-head', { scale: 0.95 }, { scale: 1, duration: 0.35, ease: POP }, at(2, 0.15));
tl.fromTo('#s2-file', { y: -40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.45, ease: OUT }, at(2, 0.35));
tl.fromTo('#s2-flab', { opacity: 0 }, { opacity: 1, duration: 0.35 }, at(2, 0.45));
tl.fromTo('#s2-pill', { scale: 0.5, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: POP }, at(2, 0.62));
tl.fromTo('#s2-stamp', { scale: 2.2, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.22, ease: 'power4.in' }, at(2, 0.85));
shake('#s2-file', at(2, 0.85) + 0.22);

// 3-4. ranked verdict cards: badge, name wipe, verdict blur-in, colour stamp slams on the sound
[3, 4].forEach((n) => {
  const s = `#s${n}`;
  step(s, T.at(n)); title(s, T.at(n) + 0.05); rise(`${s}-card`, T.at(n) + 0.1);
  tl.fromTo(`${s} .num`, { scale: 0, rotation: -90 }, { scale: 1, rotation: 0, duration: 0.4, ease: POP }, T.voice(n) + 0.1);
  tl.fromTo(`${s} .name`, { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 0.4, ease: 'power3.out' }, T.at(n) + 0.3);
  tl.fromTo(`${s} .quote`, { filter: 'blur(12px)', opacity: 0 }, { filter: 'blur(0px)', opacity: 1, duration: 0.4, ease: OUT }, T.at(n) + 0.4);
  tl.fromTo(`${s} .stamp`, { scale: 1.8, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.22, ease: 'power4.in' }, T.voice(n) + 0.6);
  bump(`${s} .stamp`, T.voice(n) + 0.85);
});
tl.fromTo('#sL-leg .lg', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.35, ease: OUT, stagger: 0.06 }, T.at(3) + 0.5);

// 5. payoff: favourite stamp, the budget rows, the ring drawn around the wrong total, the real sum
tl.fromTo('#s5 .step', { x: -40, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4, ease: OUT }, T.at(5));
tl.fromTo('#s5-num', { scale: 0, rotation: -90 }, { scale: 1, rotation: 0, duration: 0.4, ease: POP }, T.at(5) + 0.05);
tl.fromTo('#s5-name', { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 0.45, ease: 'power3.out' }, T.at(5) + 0.15);
rise('#s5-bud', T.at(5) + 0.1);
tl.fromTo('#s5-bud .br', { x: 50, opacity: 0 }, { x: 0, opacity: 1, duration: 0.35, ease: OUT, stagger: 0.06 }, T.at(5) + 0.3);
tl.fromTo('#s5-trow', { x: 50, opacity: 0 }, { x: 0, opacity: 1, duration: 0.35, ease: OUT }, T.at(5) + 0.55);
tl.fromTo('#s5-fav', { scale: 2, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.24, ease: 'power4.in' }, T.voice(5) + 0.3);
tl.fromTo('#s5-reply', { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 0.45, ease: OUT }, T.at(5) + 0.55);
tl.fromTo('#s5-ring ellipse', { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.5, ease: 'power2.inOut' }, T.voice(5) + 0.8);
tl.fromTo('#s5-note', { scale: 0.6, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: POP }, T.voice(5) + 1.0);
shake('#s5-total', at(5, 0.8));
bump('#s5-note', at(5, 0.8) + 0.35);

// 6. the catch: CHECK tag slams with the buzz, the limits list in, the warning lands last
step('#s6', T.at(6)); title('#s6', T.at(6) + 0.05); rise('#s6-card', T.at(6) + 0.15);
tl.fromTo('#s6-tag', { scale: 1.9, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.22, ease: 'power4.in' }, T.voice(6) + 0.2);
shake('#s6-tag', T.voice(6) + 0.42);
[['#s6-k1', 0.25], ['#s6-k2', 0.38], ['#s6-k3', 0.5]].forEach(([id, f]) => {
  tl.fromTo(id, { x: 60, opacity: 0 }, { x: 0, opacity: 1, duration: 0.35, ease: OUT }, at(6, f));
  tl.fromTo(`${id} .chip`, { scale: 0.6, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.3, ease: POP }, at(6, f) + 0.12);
});
tl.fromTo('#s6-warn', { filter: 'blur(12px)', opacity: 0 }, { filter: 'blur(0px)', opacity: 1, duration: 0.45, ease: OUT }, at(6, 0.62));
bump('#s6-warn', at(6, 0.88));

// 7. send: title, plane glides in, the colleague card, the plane leaves, SENT pops
tl.fromTo('#s7-send', { yPercent: 40, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.6, ease: OUT }, T.at(7));
tl.fromTo('#s7-plane', { x: -220, y: 120, opacity: 0, rotation: -18 }, { x: 0, y: 0, opacity: 1, rotation: 0, duration: 0.7, ease: OUT }, T.at(7) + 0.25);
rise('#s7-card', T.voice(7) + 0.4);
tl.fromTo('#s7-pill', { scale: 0.5, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: POP }, at(7, 0.4));
tl.to('#s7-plane', { x: 140, y: -90, rotation: 12, duration: 0.5, ease: 'power3.in' }, at(7, 0.62));
tl.fromTo('#s7-sent', { scale: 0.5, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: POP }, at(7, 0.72));
bump('#s7-sent', at(7, 0.92));

// 8. keyword: clay letters drop in, the dark pill, the free chip, then save
step('#s8', T.at(8));
tl.fromTo('#s8 .ltr', { y: -160, opacity: 0 }, { y: 0, opacity: 1, duration: 0.45, ease: POP, stagger: 0.07 }, T.at(8) + 0.1);
tl.fromTo('#s8-pill', { scale: 0.6, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.45, ease: POP }, T.voice(8) + 0.9);
tl.fromTo('#s8-chip', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: OUT }, T.voice(8) + 1.4);
tl.fromTo('#s8-mark', { scale: 0.6, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: POP }, T.voice(8) + 2.1);
tl.fromTo('#s8-save', { x: 40, opacity: 0 }, { x: 0, opacity: 1, duration: 0.45, ease: OUT }, T.voice(8) + 2.2);
tl.fromTo('#s8 .ltr', { y: 0 }, { y: -14, duration: 0.18, yoyo: true, repeat: 1, ease: 'sine.inOut', stagger: 0.05 }, T.end(8));
