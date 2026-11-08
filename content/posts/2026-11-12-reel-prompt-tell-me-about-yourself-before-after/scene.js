// Prompt explainer: give AI your measurements (the job + 3 true facts) and make it ask 3 questions before it writes.
// Analogy: the tailor. Colour = meaning: red = free-size / generic, blue = made for you, green = true facts.
// Review notes: (1) line 4's caption says "40 seconds" but the voice says "under a minute"; the stage follows the voice ("UNDER 1 MIN").
// (2) The reel says the INTRO prompt makes AI ask 3 questions first: confirm the tools-page prompt really contains that line.
// Every person, fact, question and intro on stage is labelled EXAMPLE.
const OUT = 'expo.out', POP = 'back.out(1.8)';
const span = (n) => T.end(n) - T.voice(n);
const at = (n, f) => T.voice(n) + f * span(n);
const title = (s, t) => tl.fromTo(`${s} .title .l`, { yPercent: 110 }, { yPercent: 0, duration: 0.55, ease: OUT, stagger: 0.08 }, t);
const step = (s, t) => tl.fromTo(`${s} .step`, { x: -40, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4, ease: OUT }, t);
const card = (id, t) => tl.fromTo(id, { y: 110, opacity: 0, scale: 0.96 }, { y: 0, opacity: 1, scale: 1, duration: 0.55, ease: OUT }, t);
const late = (id, t) => tl.fromTo(id, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.35, ease: OUT }, t);
const chip = (id, t) => {
  tl.fromTo(id, { scale: 0, opacity: 0 }, { scale: 1.12, opacity: 1, duration: 0.22, ease: 'power2.out' }, t);
  tl.to(id, { scale: 1, duration: 0.18, ease: 'power2.inOut' }, t + 0.22);
};
const slide = (id, t) => tl.fromTo(id, { x: 60, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4, ease: OUT }, t);
const shake = (id, t, px = 8) => tl.fromTo(id, { x: 0 }, { x: px, duration: 0.05, repeat: 5, yoyo: true, ease: 'none' }, t);
const slam = (id, t, rot) => tl.fromTo(id, { scale: 2.3, opacity: 0, rotation: rot - 12 }, { scale: 1, opacity: 1, rotation: rot, duration: 0.22, ease: 'power4.in' }, t);

// ambient: two soft orbs drift for the whole reel
tl.fromTo('#orb1', { x: 0, y: 0 }, { x: 170, y: -110, duration: T.dur, ease: 'sine.inOut' }, 0);
tl.fromTo('#orb2', { x: 0, y: 0 }, { x: -190, y: -150, duration: T.dur, ease: 'sine.inOut' }, 0);

// progress bar: one segment per beat after the hook
const segs = ['#p1', '#p2', '#p3', '#p4', '#p5', '#p6', '#p7', '#p8'];
tl.set(segs, { scaleX: 0 }, 0);
segs.forEach((id, i) => tl.to(id, { scaleX: 1, duration: 0.5, ease: 'power2.out' }, T.at(i + 1)));

// 0. hook: title and the three question bubbles are on screen at frame 0; underline slams on the thud
tl.fromTo('#s0-title', { scale: 1.06 }, { scale: 1, duration: 0.5, ease: OUT }, 0);
tl.to('#s0-title', { scale: 1.035, duration: 0.12, yoyo: true, repeat: 1, ease: 'power2.out' }, T.voice(0) + 0.5);
tl.fromTo('#s0-line', { scaleX: 0 }, { scaleX: 1, duration: 0.3, ease: 'power3.out' }, T.voice(0) + 0.5);
['#qb1', '#qb2', '#qb3'].forEach((id, i) => {
  tl.fromTo(id, { y: 0 }, { y: -14, duration: 0.6, yoyo: true, repeat: 4, ease: 'sine.inOut' }, 0.1 + i * 0.2);
  tl.fromTo(id, { scale: 1 }, { scale: 1.15, duration: 0.15, yoyo: true, repeat: 1, ease: 'power2.out' }, at(0, 0.72) + i * 0.08);
});

// 1. the free-size answer: question, generic reply, SAYS NOTHING slams on the buzz
step('#s1', T.at(1)); title('#s1', T.at(1) + 0.05); card('#s1-card', T.at(1) + 0.12);
late('#s1-head', T.at(1) + 0.35);
tl.fromTo('#ask', { opacity: 0, y: 20, scale: 0.9 }, { opacity: 1, y: 0, scale: 1, duration: 0.35, ease: POP }, T.at(1) + 0.4);
chip('#ai1', T.at(1) + 0.62);
tl.fromTo('#generic', { opacity: 0, filter: 'blur(12px)' }, { opacity: 1, filter: 'blur(0px)', duration: 0.4, ease: OUT }, T.at(1) + 0.7);
slam('#s1-stamp', T.voice(1) + 1.1, -8);
shake('#s1-card', T.voice(1) + 1.32, 10);
late('#s1-note', T.voice(1) + 1.5);

// 2. the tailor: empty measurements, the baggy kurta drops, the FREE SIZE tag swings, your real size shows in blue
step('#s2', T.at(2)); title('#s2', T.at(2) + 0.05); card('#s2-card', T.at(2) + 0.12);
['#m1', '#m2', '#m3'].forEach((id, i) => chip(id, at(2, 0.25) + i * 0.07));
shake('#m2', at(2, 0.25) + 0.5, 5);
tl.fromTo('#kurta', { y: -80, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: 'back.out(1.4)' }, at(2, 0.55));
tl.fromTo('#kurta', { scaleX: 1 }, { scaleX: 1.06, duration: 0.2, yoyo: true, repeat: 1, ease: 'power2.out' }, at(2, 0.55) + 0.5);
tl.fromTo('#string', { opacity: 0 }, { opacity: 1, duration: 0.25, ease: 'power2.out' }, at(2, 0.7));
tl.fromTo('#tag', { rotation: -35, opacity: 0, transformOrigin: '50% 0%' }, { rotation: 0, opacity: 1, duration: 0.9, ease: 'elastic.out(1, 0.4)', transformOrigin: '50% 0%' }, at(2, 0.72));
tl.fromTo('#you', { opacity: 0, strokeDashoffset: 0 }, { opacity: 1, strokeDashoffset: -48, duration: 0.5, ease: 'power2.out' }, at(2, 0.8));
late('#s2-note', at(2, 0.88));

// 3. your measurements: the tape runs out, ROLE fills on the pop, then the three true facts fill one by one
step('#s3', T.at(3)); title('#s3', T.at(3) + 0.05); card('#s3-card', T.at(3) + 0.12);
tl.fromTo('#tape', { scaleX: 0 }, { scaleX: 1, duration: 0.6, ease: 'power3.out' }, T.at(3) + 0.4);
const fill = (n, t) => {
  tl.fromTo(`#f${n}`, { backgroundColor: 'rgba(244,239,230,0)', borderColor: 'rgba(30,26,22,0.25)' }, { backgroundColor: 'rgba(244,239,230,1)', borderColor: 'rgba(30,26,22,0)', duration: 0.25, ease: 'power2.out' }, t);
  chip(`#f${n} .k`, t + 0.05);
  tl.fromTo(`#f${n} .v`, { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 0.35, ease: 'power2.out' }, t + 0.1);
};
fill(0, T.voice(3) + 0.9);
fill(1, at(3, 0.62)); fill(2, at(3, 0.62) + 0.18); fill(3, at(3, 0.62) + 0.36);
late('#s3-note', at(3, 0.9));

// 4. the prompt: four lines type in, the key line gets highlighted on the click, AI's three questions arrive
step('#s4', T.at(4)); title('#s4', T.at(4) + 0.05); card('#s4-card', T.at(4) + 0.12);
late('#s4-head', T.at(4) + 0.35);
['#pl1', '#pl2', '#pl3', '#pl4'].forEach((id, i) => tl.fromTo(id, { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 0.3, ease: 'steps(12)' }, T.voice(4) + 0.4 + i * 0.33));
chip('#timer', T.voice(4) + 0.9);
tl.fromTo('#mark', { scaleX: 0 }, { scaleX: 1, duration: 0.25, ease: 'power3.out' }, T.voice(4) + 1.7);
tl.fromTo('#pl4', { scale: 1 }, { scale: 1.04, duration: 0.15, yoyo: true, repeat: 1, ease: 'power2.out', transformOrigin: 'left center' }, T.voice(4) + 1.7);
late('#s4-ai', T.end(4) - 1.1);
['#aq1', '#aq2', '#aq3'].forEach((id, i) => {
  slide(id, T.end(4) - 1.0 + i * 0.14);
  chip(`${id} .n`, T.end(4) - 0.95 + i * 0.14);
});

// 5. the result: the fitted intro lands fast, MADE TO MEASURE slams, the card bumps (the whistle moment)
step('#s5', T.at(5)); title('#s5', T.at(5) + 0.03); card('#s5-card', T.at(5) + 0.06);
late('#s5-head', T.at(5) + 0.3);
['#e1', '#e2', '#e3', '#e4'].forEach((id, i) => tl.fromTo(id, { x: 50, opacity: 0 }, { x: 0, opacity: 1, duration: 0.35, ease: OUT }, T.voice(5) + 0.05 + i * 0.1));
slam('#s5-stamp', at(5, 0.7), -4);
tl.to('#s5-card', { scale: 1.03, duration: 0.15, yoyo: true, repeat: 1, ease: 'power2.out' }, at(5, 0.7) + 0.22);

// 6. the catch: two YES rows, then NO slams on "invent experience" and the row shakes
step('#s6', T.at(6)); title('#s6', T.at(6) + 0.05); card('#s6-card', T.at(6) + 0.12);
['#k1', '#k2'].forEach((id, i) => {
  tl.fromTo(id, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.35, ease: OUT }, T.voice(6) + 0.2 + i * T.beat / 2);
  chip(`#h${i + 1}`, T.voice(6) + 0.4 + i * T.beat / 2);
});
tl.fromTo('#k3', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.35, ease: OUT }, at(6, 0.5));
slam('#h3', at(6, 0.68), 0);
shake('#k3', at(6, 0.68) + 0.22, 10);

// 7. practise: two green ticks, then the voice waveform comes alive
step('#s7', T.at(7)); title('#s7', T.at(7) + 0.05); card('#s7-card', T.at(7) + 0.12);
slide('#t1', at(7, 0.12)); chip('#ok1', at(7, 0.3));
slide('#t2', at(7, 0.4)); chip('#ok2', at(7, 0.52));
tl.fromTo('#wave', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: OUT }, at(7, 0.55));
const r = T.rand(7);
for (let i = 0; i < 14; i++) {
  const h = 0.3 + 0.7 * r();
  tl.fromTo(`#w${i}`, { scaleY: 0.12 }, { scaleY: h, duration: 0.18 + 0.1 * r(), yoyo: true, repeat: 5, ease: 'sine.inOut' }, at(7, 0.62) + i * 0.03);
}
late('#s7-note', at(7, 0.8));

// 8. send + keyword: the calendar pops, the dark pill lands, INTRO drops in letter by letter on the beat
tl.fromTo('#send', { yPercent: 40, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.55, ease: OUT }, T.at(8));
tl.fromTo('#cal', { scale: 0.6, opacity: 0, rotation: -12 }, { scale: 1, opacity: 1, rotation: -4, duration: 0.45, ease: POP }, T.at(8) + 0.35);
late('#who', T.voice(8) + 0.6);
tl.fromTo('#pill', { scale: 0.7, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.45, ease: POP }, at(8, 0.6));
['#kl1', '#kl2', '#kl3', '#kl4', '#kl5'].forEach((id, i) => tl.fromTo(id, { yPercent: -120, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.35, ease: 'back.out(2)' }, at(8, 0.76) + i * T.beat / 4));
late('#bm', T.end(8) + 0.1);
late('#save', T.end(8) + 0.18);
tl.to('#pill', { scale: 1.05, duration: 0.2, yoyo: true, repeat: 1, ease: 'sine.inOut' }, T.end(8) + 0.5);
