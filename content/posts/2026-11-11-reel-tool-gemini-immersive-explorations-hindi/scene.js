// Tool reel: Gemini's immersive explorations, 3 topics ranked, #2 (the water cycle) wins.
// REVIEW BEFORE PUBLISH (honesty rules):
// 1. "Immersive explorations", "free", "in Hindi" and "student hub only" must be confirmed on Google's own page this week.
//    If any of these can't be confirmed, the script changes, not just the picture.
// 2. STUDY gives away a Claude prompt (chapter photo to explanation in Hindi or English), not the Gemini feature.
//    The end card says so on screen ("FREE PROMPT · FOR CLAUDE") so the comment ask is not misleading.
// 3. The water cycle card is our own sketch, labelled "NOT A SCREENSHOT", and its labels are in Roman Hindi
//    because Devanagari can't be rendered with the house fonts.
// Motion: enters expo.out, pops back.out, slams power4.in, staggers 0.06 to 0.08 s, labels settle after their card.
const OUT = 'expo.out', POP = 'back.out(1.8)';
const span = (n) => T.end(n) - T.voice(n);
const at = (n, f) => T.voice(n) + f * span(n);
const title = (s, t) => tl.fromTo(`${s} .title .l`, { yPercent: 110 }, { yPercent: 0, duration: 0.55, ease: OUT, stagger: 0.08 }, t);
const step = (s, t) => tl.fromTo(`${s} .step`, { x: -40, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4, ease: OUT }, t);
const card = (id, t) => tl.fromTo(id, { y: 110, opacity: 0, scale: 0.96 }, { y: 0, opacity: 1, scale: 1, duration: 0.55, ease: OUT }, t);
const late = (id, t) => tl.fromTo(id, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.35, ease: OUT }, t);
const rowIn = (id, t) => tl.fromTo(id, { x: 50, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4, ease: OUT }, t);
const chip = (id, t) => {
  tl.fromTo(id, { scale: 0, opacity: 0 }, { scale: 1.12, opacity: 1, duration: 0.22, ease: 'power2.out' }, t);
  tl.to(id, { scale: 1, duration: 0.18, ease: 'power2.inOut' }, t + 0.22);
};
const bump = (id, t, s = 1.06) => tl.fromTo(id, { scale: 1 }, { scale: s, duration: 0.15, yoyo: true, repeat: 1, ease: 'sine.inOut' }, t);
const shake = (id, t, px = 8) => tl.fromTo(id, { x: 0 }, { x: px, duration: 0.05, repeat: 6, yoyo: true, ease: 'none' }, t);
const opener = (s, n) => { step(s, T.at(n)); title(s, T.at(n) + 0.05); };

// ambient layer
tl.fromTo('#orb1', { x: 0, y: 0 }, { x: 170, y: -120, duration: T.dur, ease: 'sine.inOut' }, 0);
tl.fromTo('#orb2', { x: 0, y: 0 }, { x: -180, y: -150, duration: T.dur, ease: 'sine.inOut' }, 0);

// progress bar: one segment per beat after the hook
const segs = ['#p1', '#p2', '#p3', '#p4', '#p5', '#p6', '#p7', '#p8'];
tl.set(segs, { scaleX: 0 }, 0);
segs.forEach((id, i) => tl.to(id, { scaleX: 1, duration: 0.5, ease: 'power2.out' }, T.at(i + 1)));

// 0. hook: title on screen at frame 0, the #2 WINS stamp slams on the thud, a red line strikes "cramming"
tl.fromTo('#s0-title .l', { yPercent: 0 }, { yPercent: 0, duration: 0.01 }, 0);
tl.fromTo('#s0-title', { scale: 1.06 }, { scale: 1, duration: 0.7, ease: OUT }, 0);
tl.fromTo('#s0-step', { opacity: 0.6 }, { opacity: 1, duration: 0.3 }, 0);
tl.fromTo('#s0-stamp', { scale: 2.4, opacity: 0, rotation: -22 }, { scale: 1, opacity: 1, rotation: -8, duration: 0.22, ease: 'power4.in' }, T.voice(0) + 0.28);
shake('#s0-stamp', T.voice(0) + 0.5, 6);
tl.fromTo('#s0-strike', { scaleX: 0 }, { scaleX: 1, duration: 0.35, ease: 'power3.in' }, at(0, 0.42));
bump('#s0-stamp', at(0, 0.85), 1.08);

// 1. the library: the page lines appear, the highlighter sweeps the same line again and again, the count climbs
opener('#s1', 1); card('#s1-card', T.at(1) + 0.15); late('#s1-head', T.at(1) + 0.45);
tl.fromTo('#s1 .ln', { scaleX: 0 }, { scaleX: 1, duration: 0.4, ease: 'power3.out', stagger: 0.06 }, T.at(1) + 0.35);
[0.2, 0.9, 1.6].forEach((d) => tl.fromTo('#s1-hl', { scaleX: 0 }, { scaleX: 1, duration: 0.35, ease: 'power2.out' }, T.voice(1) + d));
rowIn('#s1-cnt', T.at(1) + 0.55);
const reads = { v: 1 };
tl.fromTo(reads, { v: 1 }, { v: 6, duration: 0.8 * span(1), ease: 'power1.inOut', onUpdate: () => { document.getElementById('s1-n').textContent = `${Math.round(reads.v)}×`; } }, T.voice(1) + 0.3);
tl.fromTo('#s1-loop', { rotation: 0 }, { rotation: 720, duration: span(1), ease: 'sine.inOut' }, T.voice(1));
late('#s1-note', at(1, 0.7));

// 2. the analogy: the senior's sketch draws itself stroke by stroke, then reading vs seeing
opener('#s2', 2); card('#s2-card', T.at(2) + 0.15);
['#k1', '#k2', '#k3', '#k4', '#k5', '#k6', '#k7', '#k8'].forEach((id, i) => tl.fromTo(id, { strokeDashoffset: 800 }, { strokeDashoffset: 0, duration: 0.4, ease: 'power2.out' }, T.voice(2) + 0.05 + i * 0.2));
rowIn('#s2-r1', at(2, 0.55)); chip('#s2-c1', at(2, 0.55) + 0.1);
rowIn('#s2-r2', at(2, 0.72)); chip('#s2-c2', at(2, 0.72) + 0.1);
bump('#s2-c2', T.end(2) - 0.3, 1.1);

// 3. the tool: three rows, each chip pops as the voice says free, Hindi, moving
opener('#s3', 3); card('#s3-card', T.at(3) + 0.15); late('#s3-head', T.at(3) + 0.45);
['#s3-r1', '#s3-r2', '#s3-r3'].forEach((id, i) => rowIn(id, T.at(3) + 0.4 + i * 0.07));
chip('#s3-c1', at(3, 0.45)); chip('#s3-c2', at(3, 0.6)); chip('#s3-c3', at(3, 0.8));
tl.fromTo('#s3-c3', { x: 0 }, { x: 6, duration: 0.1, repeat: 5, yoyo: true, ease: 'sine.inOut' }, at(3, 0.8) + 0.4);

// 4. the ranking (host hidden): three dashed slots, #1 and #3 fill on the pops, #2 waits
opener('#s4', 4); card('#s4-card', T.at(4) + 0.12); late('#s4-head', T.at(4) + 0.4);
['#s4-r1', '#s4-r2', '#s4-r3'].forEach((id, i) => tl.fromTo(id, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: OUT, stagger: 0 }, T.at(4) + 0.25 + i * 0.07));
tl.fromTo('#s4-f1', { scale: 0.9, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: POP }, T.voice(4) + 0.2);
tl.fromTo('#s4-f3', { scale: 0.9, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: POP }, T.voice(4) + 1.4);
tl.fromTo('#s4-n2', { scale: 1 }, { scale: 1.15, duration: 0.3, yoyo: true, repeat: 3, ease: 'sine.inOut' }, T.voice(4) + 1.9);

// 5. the payoff: #2 lands on the ding, the water cycle builds and moves (steam rises, rain falls), CLICKS slams
opener('#s5', 5); card('#s5-card', T.at(5) + 0.05);
chip('#s5-two', T.voice(5) + 0.3); late('#s5-name', T.at(5) + 0.3); chip('#s5-hindi', T.at(5) + 0.4);
tl.fromTo('#s5-sea', { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.45, ease: OUT }, T.at(5) + 0.15);
tl.fromTo('#s5-sun', { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: POP, svgOrigin: '80 80' }, T.at(5) + 0.2);
tl.fromTo('#s5-rays', { rotation: 0, opacity: 0 }, { rotation: 90, opacity: 1, duration: 2.6, ease: 'sine.inOut', svgOrigin: '80 80' }, T.at(5) + 0.25);
tl.fromTo('#s5-evap', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.35, ease: OUT }, T.at(5) + 0.3);
tl.fromTo('#s5 .ev', { strokeDashoffset: 0 }, { strokeDashoffset: -48, duration: 0.6, repeat: 3, ease: 'none' }, T.at(5) + 0.3);
tl.fromTo('#s5-cloud', { scale: 0.6, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: POP, svgOrigin: '480 110' }, T.at(5) + 0.35);
tl.fromTo('#s5-cloud', { x: 0 }, { x: 14, duration: 1.1, yoyo: true, repeat: 1, ease: 'sine.inOut' }, T.at(5) + 0.8);
tl.fromTo('#s5-drops', { opacity: 0 }, { opacity: 1, duration: 0.2, ease: 'power2.out' }, T.at(5) + 0.45);
['#d1', '#d2', '#d3', '#d4', '#d5'].forEach((id, i) => tl.fromTo(id, { y: 0, opacity: 1 }, { y: 140, opacity: 0, duration: 0.6, repeat: 3, ease: 'power1.in' }, T.at(5) + 0.45 + i * 0.12));
tl.fromTo('#s5 .w5', { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.3, ease: OUT, stagger: 0.05 }, T.at(5) + 0.25);
tl.fromTo('#s5-stamp', { scale: 2.2, opacity: 0, rotation: -20 }, { scale: 1, opacity: 1, rotation: -7, duration: 0.22, ease: 'power4.in' }, at(5, 0.82) - 0.22);
bump('#s5-card', at(5, 0.82), 1.03);
late('#s5-note', T.at(5) + 0.6);

// 6. the catch: NOT YET pops on "for now", YES on "student hub"
opener('#s6', 6); card('#s6-card', T.at(6) + 0.15); late('#s6-head', T.at(6) + 0.45);
rowIn('#s6-r1', T.voice(6) + 0.15); rowIn('#s6-r2', T.voice(6) + 0.22);
chip('#s6-c2', at(6, 0.4)); chip('#s6-c1', at(6, 0.85));
late('#s6-note', T.end(6) - 0.2);

// 7. facts can be wrong: a right label, a wrong one that shakes on the buzz, then the textbook check
opener('#s7', 7); card('#s7-card', T.at(7) + 0.15); late('#s7-head', T.at(7) + 0.45);
['#s7-r1', '#s7-r2', '#s7-r3'].forEach((id, i) => rowIn(id, T.voice(7) + 0.1 + i * 0.07));
chip('#s7-c1', T.voice(7) + 0.35); chip('#s7-c2', T.voice(7) + 0.7);
shake('#s7-r2', T.voice(7) + 0.9, 10);
chip('#s7-c3', at(7, 0.72)); bump('#s7-r3', at(7, 0.72) + 0.4, 1.04);

// 8. send it, show what STUDY really gives, then the keyword drops in letter by letter
tl.fromTo('#s8-send', { yPercent: 40, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.6, ease: OUT }, T.at(8));
late('#s8-who', T.voice(8) + 0.4);
card('#s8-tool', at(8, 0.3)); late('#s8-head', at(8, 0.3) + 0.3);
rowIn('#s8-r1', at(8, 0.3) + 0.35); chip('#s8-c1', at(8, 0.3) + 0.45);
rowIn('#s8-r2', at(8, 0.3) + 0.6); chip('#s8-c2', at(8, 0.3) + 0.7);
tl.fromTo('#s8-pill', { scale: 0.6, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.45, ease: POP }, at(8, 0.74));
tl.fromTo('#s8-kw i', { yPercent: -120, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.35, ease: POP, stagger: 0.06 }, at(8, 0.84));
bump('#s8-pill', T.end(8) + 0.3, 1.05);
