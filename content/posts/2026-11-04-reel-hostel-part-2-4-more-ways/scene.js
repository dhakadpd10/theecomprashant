// Editorial theme, deep green: deadline circled at frame 0, four-way list with the favourite held back, one website card per way, the screenshot list with the favourite flagged, the catch, a month filling up, then the SITES comment card.
const OUT = 'expo.out', POP = 'back.out(1.8)';
const span = (n) => T.end(n) - T.voice(n);
const at = (n, f) => T.voice(n) + f * span(n);
const title = (s, t) => tl.fromTo(`${s} .title .l`, { yPercent: 110 }, { yPercent: 0, duration: 0.55, ease: OUT, stagger: 0.08 }, t);
const step = (s, t) => tl.fromTo(`${s} .step`, { x: -40, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4, ease: OUT }, t);
const card = (id, t) => tl.fromTo(id, { y: 120, opacity: 0, scale: 0.96 }, { y: 0, opacity: 1, scale: 1, duration: 0.6, ease: OUT }, t);

// texture: slow drifting blobs for the whole reel
tl.fromTo('#blob1', { x: -60, y: 0 }, { x: 120, y: 160, duration: T.dur, ease: 'sine.inOut' }, 0);
tl.fromTo('#blob2', { x: 40, y: 0 }, { x: -140, y: -120, duration: T.dur, ease: 'sine.inOut' }, 0);

// progress bar: one segment per way, filling as each way starts
tl.set(['#p1', '#p2', '#p3', '#p4'], { scaleX: 0 }, 0);
[2, 3, 4, 5].forEach((n, i) => tl.to(`#p${i + 1}`, { scaleX: 1, duration: 0.5, ease: 'power2.out' }, T.at(n)));

// 0. hook: title on screen at frame 0, the deadline gets circled on the thud
tl.fromTo('#s0-title', { scale: 1.05 }, { scale: 1, duration: 0.6, ease: OUT, transformOrigin: 'left top' }, 0);
tl.fromTo('#s0-kick', { opacity: 0.75 }, { opacity: 1, duration: 0.3, ease: 'power2.out' }, 0);
tl.fromTo('#s0-ring ellipse', { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.5, ease: 'power2.out' }, T.voice(0) + 1.05);
tl.fromTo('#s0-ring', { scale: 1 }, { scale: 1.08, duration: 0.14, yoyo: true, repeat: 1, ease: 'sine.inOut' }, T.voice(0) + 1.6);
tl.fromTo('#s0-kick', { scale: 1 }, { scale: 1.06, duration: 0.15, yoyo: true, repeat: 1, ease: 'sine.inOut' }, at(0, 0.8));

// 1. four more ways: rows land, the favourite stays a question
step('#s1', T.at(1)); title('#s1', T.at(1) + 0.05); card('#s1-card', T.at(1) + 0.15);
tl.fromTo('#s1 .li', { x: 60, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4, ease: OUT, stagger: 0.07 }, T.voice(1) + 0.35);
tl.fromTo('#s1-q', { scale: 0.95 }, { scale: 1.18, duration: 0.25, yoyo: true, repeat: 1, ease: 'sine.inOut' }, at(1, 0.7));

// 2-4. each website: card rises, url types in, number pops, rows land as they are said
const fr = { 2: [0.15, 0.45, 0.75], 3: [0.2, 0.45, 0.7], 4: [0.12, 0.4, 0.72] };
[2, 3, 4].forEach((n) => {
  const s = `#s${n}`;
  step(s, T.at(n)); title(s, T.at(n) + 0.05); card(`${s}-card`, T.at(n) + 0.18);
  tl.fromTo(`${s} .url`, { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 0.45, ease: 'steps(12)' }, T.at(n) + 0.45);
  tl.fromTo(`${s} .num`, { scale: 0, rotation: -90 }, { scale: 1, rotation: 0, duration: 0.45, ease: POP }, T.voice(n) + 0.15);
  ['.r1', '.r2', '.r3'].forEach((r, i) => tl.fromTo(`${s} ${r}`, { x: 60, opacity: 0 }, { x: 0, opacity: 1, duration: 0.35, ease: OUT }, at(n, fr[n][i])));
});
// Contra: tick pops on "commission"
tl.fromTo('#s2-tick', { scale: 0, rotation: -40 }, { scale: 1, rotation: 0, duration: 0.4, ease: POP }, at(2, 0.86));
// Gumroad: the "templates" row gets a bump
tl.fromTo('#s3 .r2', { scale: 1 }, { scale: 1.04, duration: 0.18, yoyo: true, repeat: 1, ease: 'sine.inOut' }, at(3, 0.62));
// Upwork: the arrow climbs on "growing fastest"
tl.fromTo('#s4-up', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.45, ease: POP }, at(4, 0.55));
tl.to('#s4-up', { y: -8, duration: 0.3, yoyo: true, repeat: 1, ease: 'sine.inOut' }, at(4, 0.55) + 0.5);

// 5. payoff: the full list, the favourite slams in, "on AI Plus" chips show it runs the other three
step('#s5', T.at(5)); title('#s5', T.at(5) + 0.05); card('#s5-card', T.at(5) + 0.12);
tl.fromTo('#s5 .it5', { x: 60, opacity: 0 }, { x: 0, opacity: 1, duration: 0.35, ease: OUT, stagger: 0.07 }, T.at(5) + 0.25);
tl.fromTo('#s5-fav', { scale: 0.95, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: POP }, T.voice(5) + 0.1);
tl.fromTo('#s5-rib', { scale: 1.9, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.22, ease: 'power4.in' }, T.voice(5) + 0.3);
tl.fromTo('#s5 .on', { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.35, ease: POP, stagger: 0.08 }, at(5, 0.5));
tl.to('#s5-fav', { scale: 1.04, duration: 0.18, yoyo: true, repeat: 1, ease: 'sine.inOut' }, at(5, 0.85));

// 6. the catch: three limits, chips slam as each is said, the first one shakes on the thud
step('#s6', T.at(6)); title('#s6', T.at(6) + 0.05); card('#s6-card', T.at(6) + 0.15);
['#q1', '#q2', '#q3'].forEach((id, i) => tl.fromTo(id, { x: 60, opacity: 0 }, { x: 0, opacity: 1, duration: 0.35, ease: OUT }, T.voice(6) + 0.2 + i * 0.33 * span(6)));
['#c1', '#c2', '#c3'].forEach((id, i) => {
  const t = T.voice(6) + 0.4 + i * 0.33 * span(6);
  tl.fromTo(id, { scale: 1.8, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.24, ease: 'power4.in' }, t);
});
tl.to('#q1', { x: 8, duration: 0.05, repeat: 5, yoyo: true, ease: 'none' }, T.voice(6) + 0.64);

// 7. weeks, not days: the month fills one week per beat
step('#s7', T.at(7)); title('#s7', T.at(7) + 0.05); card('#s7-card', T.at(7) + 0.12);
[0, 1, 2, 3].forEach((k) => tl.fromTo(`#s7 .w${k} i`, { backgroundColor: '#EFE8DC', color: '#6A625A' }, { backgroundColor: '#2F6B4F', color: '#FFFFFF', duration: 0.25, ease: 'power2.out', stagger: 0.04 }, T.voice(7) + 0.3 + k * T.beat));

// 8. send + keyword: comment card, SITES letters drop in on the ding, pill, then Save.
step('#s8', T.at(8)); title('#s8', T.at(8) + 0.05); card('#s8-card', T.at(8) + 0.2);
tl.fromTo('#s8-av', { scale: 0 }, { scale: 1, duration: 0.4, ease: POP }, T.at(8) + 0.45);
tl.fromTo('#s8-bub', { scale: 0.9, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: POP }, T.voice(8) + 0.7);
tl.fromTo('#s8-bub .ltr', { yPercent: -120, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.3, ease: 'power3.out', stagger: 0.06 }, T.voice(8) + 0.95);
tl.fromTo('#s8-pill', { scale: 0.6, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.45, ease: POP }, T.voice(8) + 1.45);
tl.fromTo(['#s8-k', '#s8-v'], { x: 40, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4, ease: OUT, stagger: 0.06 }, at(8, 0.6));
tl.fromTo('#s8-save', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.45, ease: OUT }, T.end(8) - 0.3);
tl.to('#s8-bub', { scale: 1.05, duration: 0.2, yoyo: true, repeat: 1, ease: 'sine.inOut' }, T.end(8) + 0.4);
