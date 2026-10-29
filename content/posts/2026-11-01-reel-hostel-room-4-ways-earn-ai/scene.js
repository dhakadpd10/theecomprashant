// Editorial host reel, kind "sites": hook, ₹0 to join, one list card whose four slots fill site by site,
// the catch tagged and stamped onto that same card (the screenshot card), then send and the keyword.
const OUT = 'expo.out', POP = 'back.out(1.8)';
const span = (n) => T.end(n) - T.voice(n);
const at = (n, f) => T.voice(n) + f * span(n);
const title = (s, t) => tl.fromTo(`${s} .title .l`, { yPercent: 110 }, { yPercent: 0, duration: 0.55, ease: OUT, stagger: 0.08 }, t);
const step = (s, t) => tl.fromTo(`${s} .step`, { x: -40, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4, ease: OUT }, t);
const ROW = 158;

// texture: slow drifting blobs for the whole reel, clipped inside the stage layer (#tex, y 120 to 1300)
tl.fromTo('#blob1', { x: 0, y: 0 }, { x: 180, y: 140, duration: T.dur, ease: 'sine.inOut' }, 0);
tl.fromTo('#blob2', { x: 0, y: 0 }, { x: -200, y: -160, duration: T.dur, ease: 'sine.inOut' }, 0);

// progress bar: sites 1-4, the catch, the send
tl.set(['#p1', '#p2', '#p3', '#p4', '#p5', '#p6'], { scaleX: 0 }, 0);
[[1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 8]].forEach(([p, n]) => tl.to(`#p${p}`, { scaleX: 1, duration: 0.5, ease: 'power2.out' }, T.at(n)));

// 0. hook: title and pill on screen at frame 0, the pill punches on "tests you"
tl.set('#s0-title .l', { yPercent: 0 }, 0);
tl.fromTo('#s0-title', { scale: 1.05 }, { scale: 1, duration: 0.7, ease: OUT }, 0);
tl.fromTo('#s0-pill', { scale: 1 }, { scale: 0.94, duration: 0.12, ease: 'power2.out' }, at(0, 0.66));
tl.to('#s0-pill', { scale: 1.1, duration: 0.3, ease: POP }, at(0, 0.66) + 0.12);
tl.to('#s0-pill', { scale: 1, duration: 0.3, ease: 'power2.out' }, at(0, 0.66) + 0.5);

// 1. zero to join: the card rises, chips settle, ₹0 pops on "zero"
tl.fromTo('#s1-card', { y: 100, opacity: 0 }, { y: 0, opacity: 1, duration: 0.55, ease: OUT }, T.at(1));
['#s1-c1', '#s1-c2'].forEach((id, i) => tl.fromTo(id, { x: 50, opacity: 0 }, { x: 0, opacity: 1, duration: 0.35, ease: OUT }, T.at(1) + 0.2 + i * 0.07));
tl.fromTo('#s1-label', { opacity: 0 }, { opacity: 1, duration: 0.3, ease: 'power2.out' }, T.at(1) + 0.4);
tl.fromTo('#s1-zero', { scale: 0.3, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: POP }, at(1, 0.45));
tl.fromTo('#s1-all', { x: 30, opacity: 0 }, { x: 0, opacity: 1, duration: 0.35, ease: OUT }, at(1, 0.45) + 0.08);

// 2-5. the list card arrives once; each site fills its slot, the highlight moves down
tl.fromTo('#list', { y: 80, opacity: 0 }, { y: 0, opacity: 1, duration: 0.45, ease: OUT }, T.at(2));
tl.fromTo('#hl', { y: 0, opacity: 0 }, { y: 0, opacity: 1, duration: 0.3, ease: 'power2.out' }, T.voice(2) + 0.3);
[3, 4, 5].forEach((n) => tl.to('#hl', { y: (n - 2) * ROW, duration: 0.4, ease: 'power2.inOut' }, T.at(n)));

[2, 3, 4, 5].forEach((n) => {
  const s = `#s${n}`, r = `#r${n - 1}`;
  step(s, T.at(n));
  tl.fromTo(`${s} .url`, { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 0.45, ease: 'steps(10)' }, T.at(n) + 0.15);
  title(s, T.at(n) + 0.05);
  tl.fromTo(`#e${n - 1}`, { opacity: 1 }, { opacity: 0, duration: 0.2, ease: 'power3.in' }, T.voice(n));
  tl.fromTo(`${r} .xfill`, { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 0.45, ease: OUT }, T.voice(n));
  tl.fromTo(`${r} .xnum`, { scale: 0, rotation: -90 }, { scale: 1, rotation: 0, duration: 0.4, ease: POP }, T.voice(n) + 0.08);
  tl.fromTo(`${r} .xwhat`, { x: 30, opacity: 0 }, { x: 0, opacity: 1, duration: 0.35, ease: OUT }, at(n, 0.45));
  tl.fromTo(`${r} .xpay`, { x: 30, opacity: 0 }, { x: 0, opacity: 1, duration: 0.35, ease: OUT }, at(n, 0.7));
});
tl.fromTo('#lock4', { opacity: 1 }, { opacity: 0, duration: 0.2, ease: 'power3.in' }, T.voice(5));
tl.fromTo('#r4', { scale: 1 }, { scale: 1.04, duration: 0.2, yoyo: true, repeat: 1, ease: 'sine.inOut' }, at(5, 0.85));

// 6. the catch: screenshot flash, TEST FIRST slams onto Outlier, the paused note wipes in under it
step('#s6', T.at(6));
title('#s6', T.at(6) + 0.05);
tl.fromTo('#flash', { opacity: 0 }, { opacity: 0.75, duration: 0.08, ease: 'power2.out' }, T.at(6));
tl.to('#flash', { opacity: 0, duration: 0.4, ease: 'power2.out' }, T.at(6) + 0.08);
tl.fromTo('#t4', { scale: 1.8, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.25, ease: 'power4.in' }, at(6, 0.25));
tl.fromTo('#r4', { x: 0 }, { x: 8, duration: 0.05, repeat: 5, yoyo: true, ease: 'none' }, at(6, 0.25) + 0.25);
tl.fromTo('#foot', { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 0.5, ease: 'power3.out' }, at(6, 0.5));

// 7. Prolific comes in bursts: highlight climbs back, chip pops, the stamp lands on the thud
tl.to('#hl', { y: 0, duration: 0.5, ease: 'power2.inOut' }, T.at(7));
tl.fromTo('#t1', { scale: 0.5, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.35, ease: POP }, T.voice(7) + 0.55);
tl.fromTo('#stamp', { scale: 2.2, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.22, ease: 'power4.in' }, T.voice(7) + 0.98);
tl.fromTo('#list', { x: 0 }, { x: 9, duration: 0.05, repeat: 5, yoyo: true, ease: 'none' }, T.voice(7) + 1.2);

// 8. send this: the card stays as the screenshot, the roommate chip slides in
tl.to('#hl', { opacity: 0, duration: 0.25, ease: 'power3.in' }, T.at(8));
step('#s8', T.at(8));
title('#s8', T.at(8) + 0.05);
tl.fromTo('#s8-chip', { x: -60, opacity: 0 }, { x: 0, opacity: 1, duration: 0.45, ease: OUT }, at(8, 0.4));
tl.fromTo('#s8-plane', { x: -14, y: 10, rotation: -15 }, { x: 0, y: 0, rotation: 0, duration: 0.5, ease: POP }, at(8, 0.4) + 0.1);
tl.fromTo('#list', { scale: 1 }, { scale: 1.03, duration: 0.25, yoyo: true, repeat: 1, ease: 'sine.inOut' }, at(8, 0.4) + 0.15);
tl.to('#list', { y: 40, opacity: 0, duration: 0.25, ease: 'power3.in' }, T.at(9) - 0.25);

// 9. end card: Save., the bookmark drops, SITES letters land on the ding, the free sticker
title('#s9', T.at(9) + 0.05);
tl.fromTo('#s9-mark', { y: -80, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: POP }, T.at(9) + 0.2);
tl.fromTo('#s9-pill', { scale: 0.6, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.45, ease: POP }, T.at(9) + 0.15);
tl.fromTo('#s9-lab', { opacity: 0 }, { opacity: 1, duration: 0.3, ease: 'power2.out' }, T.at(9) + 0.35);
tl.fromTo('#s9-kw b', { yPercent: -110, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.35, ease: POP, stagger: 0.06 }, T.voice(9) + 0.01);
tl.to('#s9-pill', { scale: 1.05, duration: 0.15, yoyo: true, repeat: 1, ease: 'power2.out' }, T.voice(9) + 0.6);
tl.fromTo('#s9-sticker', { scale: 0.7, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: POP }, at(9, 0.7));
tl.to('#s9-mark', { y: -10, duration: 0.6, yoyo: true, repeat: 1, ease: 'sine.inOut' }, T.end(9) + 0.1);
