// Editorial, kind "sites", arm A: homemakers hook at frame 0, one list card that fills slot by slot,
// the favourite (Topmate) as a full example page with the stamp, the catch with weeks filling, then the screenshot card and the keyword.
const OUT = 'expo.out', POP = 'back.out(1.8)', SLAM = 'power4.in';
const span = (n) => T.end(n) - T.voice(n);
const at = (n, f) => T.voice(n) + f * span(n);
const title = (s, t) => tl.fromTo(`${s} .title .l`, { yPercent: 110 }, { yPercent: 0, duration: 0.55, ease: OUT, stagger: 0.08 }, t);
const step = (s, t) => tl.fromTo(`${s} .step`, { x: -40, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4, ease: OUT }, t);
const card = (id, t) => tl.fromTo(id, { y: 100, opacity: 0, scale: 0.96 }, { y: 0, opacity: 1, scale: 1, duration: 0.6, ease: OUT }, t);

// texture: slow drifting blobs across the whole reel
tl.fromTo('#blob1', { x: 0, y: 0 }, { x: 140, y: 90, duration: T.dur / 2, ease: 'sine.inOut', yoyo: true, repeat: 1 }, 0);
tl.fromTo('#blob2', { x: 0, y: 0 }, { x: -120, y: -110, duration: T.dur / 2, ease: 'sine.inOut', yoyo: true, repeat: 1 }, 0);

// progress bar: one segment per way
[1, 2, 3, 4].forEach((n) => tl.fromTo(`#p${n}`, { scaleX: 0 }, { scaleX: 1, duration: 0.5, ease: 'power2.out' }, T.at(n)));

// 0. hook: title on screen at frame 0, the underline draws on "four real ways", the fee chip slams on "no joining fee"
tl.fromTo('#s0-title .l', { yPercent: 0 }, { yPercent: 0, duration: 0.01 }, 0);
tl.fromTo('#s0-title', { scale: 1.05 }, { scale: 1, duration: 0.6, ease: OUT }, 0);
tl.fromTo('#s0-step', { opacity: 0.6 }, { opacity: 1, duration: 0.3 }, 0);
tl.fromTo('#s0-ul path', { strokeDashoffset: 340 }, { strokeDashoffset: 0, duration: 0.5, ease: 'power2.out' }, at(0, 0.22));
tl.fromTo('#s0-fee', { scale: 1.8, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.25, ease: SLAM }, at(0, 0.8));
tl.to('#s0-fee', { scale: 1.06, duration: 0.15, yoyo: true, repeat: 1, ease: 'sine.inOut' }, at(0, 0.8) + 0.3);

// 1-3. the list card: four dashed slots, each fills as its way is said; a ring follows the active row
card('#sL-card', T.at(1) + 0.05);
tl.fromTo('#sL .row', { x: 40, opacity: 0 }, { x: 0, opacity: 1, duration: 0.35, ease: OUT, stagger: 0.06 }, T.at(1) + 0.2);
const fill = (r, t) => {
  tl.fromTo(r, { backgroundColor: 'rgba(246,241,232,0)', borderColor: 'rgba(30,26,22,0.22)' }, { backgroundColor: 'rgba(246,241,232,1)', borderColor: 'rgba(30,26,22,0)', duration: 0.3, ease: 'power2.out' }, t);
  tl.fromTo(`${r} .n`, { backgroundColor: 'rgba(30,26,22,0.08)', color: '#1E1A16' }, { backgroundColor: '#2E6A4F', color: '#FFFFFF', duration: 0.25, ease: 'power2.out' }, t);
  tl.fromTo(`${r} .n`, { scale: 0.9 }, { scale: 1, duration: 0.4, ease: POP }, t);
  tl.fromTo([`${r} .nm`, `${r} .ds`], { x: 40, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4, ease: OUT, stagger: 0.06 }, t + 0.05);
  tl.fromTo(`${r} .tag`, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: POP }, t + 0.15);
};
fill('#sL-r1', T.voice(1) + 0.2);
fill('#sL-r2', T.voice(2) + 0.2);
fill('#sL-r3', T.voice(3) + 0.2);
tl.fromTo('#sL-hl', { y: 0, opacity: 0 }, { y: 0, opacity: 1, duration: 0.3, ease: 'power2.out' }, T.voice(1) + 0.2);
tl.to('#sL-hl', { y: 152, duration: 0.4, ease: 'power2.inOut' }, T.voice(2) + 0.05);
tl.to('#sL-hl', { y: 304, duration: 0.4, ease: 'power2.inOut' }, T.voice(3) + 0.05);
tl.to('#sL-hl', { y: 456, duration: 0.45, ease: 'power2.inOut' }, at(3, 0.8));
tl.to('#sL-r4 .next', { scale: 1.08, duration: 0.18, yoyo: true, repeat: 1, ease: 'sine.inOut' }, at(3, 0.8) + 0.35);

// titles per way
[1, 2, 3].forEach((n) => { step(`#s${n}`, T.at(n)); title(`#s${n}`, T.at(n) + 0.05); });

// 4. the favourite: the Topmate example page builds, MY PICK stamps onto it, then "No portfolio needed" lands
step('#s4', T.at(4)); title('#s4', T.at(4) + 0.05); card('#s4-card', T.at(4) + 0.1);
tl.fromTo('#s4-url', { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 0.45, ease: 'steps(10)' }, T.at(4) + 0.4);
tl.fromTo('#s4-av', { scale: 0 }, { scale: 1, duration: 0.45, ease: POP }, T.at(4) + 0.35);
tl.fromTo(['#s4-name', '#s4-ex'], { x: 30, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4, ease: OUT, stagger: 0.06 }, T.at(4) + 0.42);
tl.fromTo(['#s4-r1', '#s4-r2', '#s4-r3'], { x: 50, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4, ease: OUT, stagger: 0.08 }, T.at(4) + 0.5);
const stampT = T.voice(4) + 0.85;
tl.fromTo('#s4-stamp', { scale: 2.4, opacity: 0, rotation: -20 }, { scale: 1, opacity: 1, rotation: -8, duration: 0.24, ease: SLAM }, stampT);
tl.to('#s4-stamp', { scale: 1.06, duration: 0.15, yoyo: true, repeat: 1, ease: 'sine.inOut' }, stampT + 0.3);
tl.to('#s4-r1', { scale: 1.03, duration: 0.2, yoyo: true, repeat: 1, ease: 'sine.inOut' }, at(4, 0.45));
tl.fromTo('#s4-tick', { x: 60, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4, ease: OUT }, at(4, 0.78));
tl.fromTo('#s4-tick svg', { scale: 0, rotation: -90 }, { scale: 1, rotation: 0, duration: 0.4, ease: POP }, at(4, 0.78) + 0.1);
tl.to('#s4-tick', { scale: 1.04, duration: 0.18, yoyo: true, repeat: 1, ease: 'sine.inOut' }, at(4, 0.78) + 0.5);

// 5. the catch: rows slide in, chips slam (thud on the first), weeks fill on "think weeks, not days"
step('#s5', T.at(5)); title('#s5', T.at(5) + 0.05); card('#s5-card', T.at(5) + 0.1);
tl.fromTo('#s5-k1', { x: 60, opacity: 0 }, { x: 0, opacity: 1, duration: 0.35, ease: OUT }, T.voice(5) + 0.15);
tl.fromTo('#s5-c1', { scale: 1.8, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.25, ease: SLAM }, T.voice(5) + 0.35);
tl.to('#s5-k1', { x: 8, duration: 0.05, repeat: 5, yoyo: true, ease: 'none' }, T.voice(5) + 0.6);
tl.fromTo('#s5-k2', { x: 60, opacity: 0 }, { x: 0, opacity: 1, duration: 0.35, ease: OUT }, at(5, 0.33));
tl.fromTo('#s5-c2', { scale: 1.8, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.25, ease: SLAM }, at(5, 0.33) + 0.3);
tl.fromTo('#s5-k3', { x: 60, opacity: 0 }, { x: 0, opacity: 1, duration: 0.35, ease: OUT }, at(5, 0.5));
tl.fromTo('#s5-c3', { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: POP }, at(5, 0.5) + 0.25);
tl.fromTo('#s5-wlab', { opacity: 0 }, { opacity: 1, duration: 0.3, ease: 'power2.out' }, at(5, 0.6));
['#w1', '#w2', '#w3', '#w4'].forEach((id, i) => tl.fromTo(id, { backgroundColor: '#F6F1E8', color: 'rgba(30,26,22,0.62)' }, { backgroundColor: '#2E6A4F', color: '#FFFFFF', duration: 0.25, ease: 'power2.out' }, at(5, 0.68) + i * 0.14));
tl.to('.weeks', { scale: 1.03, duration: 0.2, yoyo: true, repeat: 1, ease: 'sine.inOut' }, at(5, 0.68) + 0.7);

// 6. send this: the full list returns as the screenshot card, the plane flies in, a sheen passes, the favourite bumps
title('#s6', T.at(6));
card('#s6-card', T.at(6) + 0.1);
tl.fromTo('#s6 .row', { x: 40, opacity: 0 }, { x: 0, opacity: 1, duration: 0.35, ease: OUT, stagger: 0.07 }, T.at(6) + 0.25);
tl.fromTo('#s6-plane', { x: -200, y: 120, opacity: 0, rotation: -20 }, { x: 0, y: 0, opacity: 1, rotation: 0, duration: 0.7, ease: OUT }, T.at(6) + 0.2);
tl.fromTo('#s6-sheen', { x: -260 }, { x: 820, duration: 0.9, ease: 'power2.inOut' }, at(6, 0.35));
tl.fromTo('#s6-r4', { scale: 1 }, { scale: 1.04, duration: 0.2, yoyo: true, repeat: 1, ease: 'sine.inOut' }, at(6, 0.6));
tl.to('#s6-plane', { x: 24, y: -16, duration: 0.5, yoyo: true, repeat: 1, ease: 'sine.inOut' }, at(6, 0.7));

// 7. keyword: "Save." and the bookmark, the pill pops, SITES drops in letter by letter, the free tag lands
title('#s7', T.at(7));
tl.fromTo('#s7-mark', { y: -120, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: 'back.out(1.6)' }, T.at(7) + 0.15);
tl.fromTo('#s7-pill', { scale: 0.9, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.45, ease: POP }, T.at(7) + 0.1);
tl.fromTo('#s7-word .ch', { yPercent: -120, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.4, ease: 'back.out(2)', stagger: 0.06 }, T.voice(7) + 0.2);
tl.fromTo('#s7-tag', { scale: 0.6, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: POP }, T.voice(7) + 0.9);
tl.to('#s7-pill', { scale: 1.04, duration: 0.3, yoyo: true, repeat: 1, ease: 'sine.inOut' }, T.end(7) + 0.1);
