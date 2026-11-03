// Editorial, kind "sites", arm B: general opener. Hook with a ₹0 badge, one website card per way with a ₹0-to-join check,
// the full list as the screenshot card with Topmate marked favourite, the catch as an approval chip and a filling calendar,
// a send chat, then the big SITES keyword.
const OUT = 'expo.out', P3 = 'power3.out', POP = 'back.out(1.8)';
const span = (n) => T.end(n) - T.voice(n);
const at = (n, f) => T.voice(n) + f * span(n);
const title = (s, t) => tl.fromTo(`${s} .title .l`, { yPercent: 110 }, { yPercent: 0, duration: 0.55, ease: OUT, stagger: 0.08 }, t);
const step = (s, t) => tl.fromTo(`${s} .step`, { x: -40, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4, ease: P3 }, t);

// texture: slow drifting blobs for the whole reel
tl.fromTo('#blob1', { x: 0, y: 0 }, { x: 180, y: 120, duration: T.dur, ease: 'sine.inOut' }, 0);
tl.fromTo('#blob2', { x: 0, y: 0 }, { x: -200, y: -160, duration: T.dur, ease: 'sine.inOut' }, 0);

// progress bar: one segment per beat
tl.set(['#p1', '#p2', '#p3', '#p4', '#p5', '#p6', '#p7'], { scaleX: 0 }, 0);
[1, 2, 3, 4, 5, 6, 7].forEach((n) => tl.to(`#p${n}`, { scaleX: 1, duration: 0.5, ease: 'power2.out' }, T.at(n)));

// 0. hook: title and badge on screen at frame 0
tl.fromTo('#s0-title .l', { yPercent: 0 }, { yPercent: 0, duration: 0.01 }, 0);
tl.fromTo('#s0-title', { scale: 1.05 }, { scale: 1, duration: 0.6, ease: OUT }, 0);
tl.fromTo('#s0-step', { opacity: 0.7 }, { opacity: 1, duration: 0.3 }, 0);
tl.fromTo('#s0-badge', { scale: 1.1, rotation: -16 }, { scale: 1, rotation: -8, duration: 0.5, ease: POP }, 0);
const tb = at(0, 0.78);
tl.fromTo('#s0-badge', { scale: 1 }, { scale: 0.92, duration: 0.1, ease: 'power2.in' }, tb - 0.1);
tl.fromTo('#s0-badge', { scale: 0.92 }, { scale: 1.1, duration: 0.3, ease: POP }, tb);
tl.fromTo('#s0-badge', { scale: 1.1 }, { scale: 1, duration: 0.3, ease: 'power2.inOut' }, tb + 0.35);

// 1-3. one website card per way: card swings in, url types, name blurs in, rows land on the words, the ₹0 check draws
[1, 2, 3].forEach((n) => {
  const s = `#s${n}`;
  step(s, T.at(n));
  title(s, T.at(n) + 0.05);
  tl.fromTo(`${s}-card`, { x: 140, opacity: 0, rotation: 3 }, { x: 0, opacity: 1, rotation: 0, duration: 0.55, ease: OUT }, T.at(n) + 0.15);
  tl.fromTo(`${s} .url`, { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 0.45, ease: 'steps(12)' }, T.at(n) + 0.45);
  tl.fromTo(`${s} .num`, { scale: 0, rotation: -90 }, { scale: 1, rotation: 0, duration: 0.45, ease: POP }, T.voice(n) + 0.1);
  tl.fromTo(`${s} .name`, { opacity: 0, filter: 'blur(12px)' }, { opacity: 1, filter: 'blur(0px)', duration: 0.45, ease: P3 }, T.voice(n) + 0.15);
  [['.r1', 0.3], ['.r2', 0.48], ['.r3', 0.64]].forEach(([r, f]) =>
    tl.fromTo(`${s} ${r}`, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.35, ease: OUT }, at(n, f)));
  tl.fromTo(`${s} .free`, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.35, ease: P3 }, at(n, 0.8));
  tl.fromTo(`${s} .ck`, { strokeDashoffset: 44 }, { strokeDashoffset: 0, duration: 0.25, ease: 'power2.out' }, at(n, 0.8) + 0.1);
});

// 4. the full list: rows 1-3 file in, Topmate pops, the FAVOURITE badge slams (ding), chips land on "Indian" and "price"
step('#s4', T.at(4));
title('#s4', T.at(4) + 0.05);
tl.fromTo('#s4-card', { y: 100, opacity: 0, scale: 0.96 }, { y: 0, opacity: 1, scale: 1, duration: 0.6, ease: OUT }, T.at(4) + 0.15);
tl.fromTo('#s4-head', { opacity: 0 }, { opacity: 1, duration: 0.3 }, T.at(4) + 0.35);
tl.fromTo(['#l1', '#l2', '#l3'], { x: 50, opacity: 0 }, { x: 0, opacity: 1, duration: 0.35, ease: OUT, stagger: 0.07 }, T.at(4) + 0.3);
tl.fromTo('#l4', { scale: 0.9, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.45, ease: POP }, T.voice(4) + 0.15);
tl.fromTo('#fav', { scale: 2.2, opacity: 0, rotation: -14 }, { scale: 1, opacity: 1, rotation: 0, duration: 0.22, ease: 'power4.in' }, T.voice(4) + 0.38);
tl.fromTo('#l4', { scale: 1 }, { scale: 1.04, duration: 0.18, yoyo: true, repeat: 1, ease: 'sine.inOut' }, T.voice(4) + 0.62);
tl.fromTo('#l4 .u', { opacity: 0 }, { opacity: 1, duration: 0.3 }, at(4, 0.35));
tl.fromTo('#s4-c1', { scale: 0.6, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.35, ease: POP }, at(4, 0.52));
tl.fromTo('#s4-c2', { scale: 0.6, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.35, ease: POP }, at(4, 0.8));

// 5. the catch: IN REVIEW slams (thud) and shakes, then three weeks of days fill
step('#s5', T.at(5));
title('#s5', T.at(5) + 0.05);
tl.fromTo('#s5-card', { y: 100, opacity: 0, scale: 0.96 }, { y: 0, opacity: 1, scale: 1, duration: 0.6, ease: OUT }, T.at(5) + 0.1);
tl.fromTo('#s5-status', { x: 50, opacity: 0 }, { x: 0, opacity: 1, duration: 0.35, ease: OUT }, T.voice(5));
tl.fromTo('#s5-chip', { scale: 1.9, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.22, ease: 'power4.in' }, T.voice(5) + 0.28);
tl.fromTo('#s5-status', { x: 0 }, { x: 8, duration: 0.05, repeat: 5, yoyo: true, ease: 'none' }, T.voice(5) + 0.5);
tl.fromTo('#s5-grid .c', { backgroundColor: '#EFE9DF' }, { backgroundColor: '#2F6B4F', duration: 0.2, ease: 'power2.out', stagger: 0.035 }, at(5, 0.42));
tl.fromTo('#s5-big', { opacity: 0, filter: 'blur(12px)' }, { opacity: 1, filter: 'blur(0px)', duration: 0.45, ease: P3 }, at(5, 0.62));

// 6. send: the reel lands in the chat, the note follows, ticks go green, the friend starts typing
step('#s6', T.at(6));
title('#s6', T.at(6) + 0.05);
tl.fromTo('#s6-card', { y: 100, opacity: 0, scale: 0.96 }, { y: 0, opacity: 1, scale: 1, duration: 0.6, ease: OUT }, T.at(6) + 0.1);
tl.fromTo('#s6-reel', { scale: 0.6, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: POP }, T.voice(6) + 0.25);
tl.fromTo('#s6-msg', { scale: 0.6, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.35, ease: POP }, at(6, 0.45));
tl.fromTo('#s6-seen', { opacity: 0 }, { opacity: 1, duration: 0.3 }, at(6, 0.62));
tl.fromTo('#s6-tick', { color: '#9A928A' }, { color: '#2F6B4F', duration: 0.3, ease: 'power2.out' }, at(6, 0.75));
tl.fromTo('#s6-typing', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.3, ease: P3 }, at(6, 0.82));
tl.fromTo('#s6-typing .td', { y: 0 }, { y: -10, duration: 0.25, ease: 'sine.inOut', stagger: 0.1, yoyo: true, repeat: 3 }, at(6, 0.86));

// 7. keyword: Save. rises, bookmark drops, SITES letters fall in (pop), FREE sticker slams, pill bumps on the beat
tl.fromTo('#s7-save .l', { yPercent: 110 }, { yPercent: 0, duration: 0.55, ease: OUT }, T.at(7));
tl.fromTo('#s7-mark', { y: -80, opacity: 0 }, { y: 0, opacity: 1, duration: 0.45, ease: POP }, T.at(7) + 0.15);
tl.fromTo('#s7-pill', { scale: 0.85, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.45, ease: POP }, T.at(7) + 0.05);
tl.fromTo('#s7-pk', { opacity: 0 }, { opacity: 1, duration: 0.3 }, T.at(7) + 0.25);
tl.fromTo('#s7-word .ltr', { y: -140, opacity: 0 }, { y: 0, opacity: 1, duration: 0.35, ease: 'back.out(1.6)', stagger: 0.06 }, T.voice(7) + 0.05);
tl.fromTo('#s7-sub', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.35, ease: P3 }, T.voice(7) + 0.6);
tl.fromTo('#s7-free', { scale: 2.2, opacity: 0, rotation: -24 }, { scale: 1, opacity: 1, rotation: -8, duration: 0.22, ease: 'power4.in' }, T.voice(7) + 0.9);
tl.fromTo('#s7-pill', { scale: 1 }, { scale: 1.04, duration: 0.2, yoyo: true, repeat: 1, ease: 'sine.inOut' }, T.voice(7) + 0.4 + 2 * T.beat);
tl.fromTo('#s7-hint', { opacity: 0, x: -30 }, { opacity: 1, x: 0, duration: 0.4, ease: P3 }, T.voice(7) + 1.0);
tl.fromTo('#s7-arrow', { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.35, ease: P3 }, T.voice(7) + 1.15);
tl.fromTo('#s7-arrow', { y: 0 }, { y: 14, duration: 0.3, yoyo: true, repeat: 3, ease: 'sine.inOut' }, T.voice(7) + 1.55);
