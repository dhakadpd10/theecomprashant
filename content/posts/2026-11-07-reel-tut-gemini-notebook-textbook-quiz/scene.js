// Tutorial: Gemini's textbook sources turn a real book into a study guide and a quiz that cites the page.
// Colour = meaning: blue = the tool and your taps, green = from the book, red = guessing and the catch.
// Motion: enters expo.out ~0.5 s, pops back.out, slams power4.in, stagger 0.07 s, labels settle after their card.
const OUT = 'expo.out', POP = 'back.out(1.8)';
const span = (n) => T.end(n) - T.voice(n);
const at = (n, f) => T.voice(n) + f * span(n);
const title = (s, t) => tl.fromTo(`${s} .title .l`, { yPercent: 110 }, { yPercent: 0, duration: 0.55, ease: OUT, stagger: 0.08 }, t);
const step = (s, t) => tl.fromTo(`${s} .step`, { x: -40, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4, ease: OUT }, t);
const card = (id, t) => tl.fromTo(id, { y: 110, opacity: 0, scale: 0.96 }, { y: 0, opacity: 1, scale: 1, duration: 0.55, ease: OUT }, t);
const late = (id, t) => tl.fromTo(id, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.35, ease: OUT }, t);
const slide = (id, t, x = 60) => tl.fromTo(id, { x, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4, ease: OUT }, t);
const rise = (id, t) => tl.fromTo(id, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.35, ease: OUT }, t);
const pop = (id, t) => {
  tl.fromTo(id, { scale: 0, opacity: 0 }, { scale: 1.12, opacity: 1, duration: 0.22, ease: 'power2.out' }, t);
  tl.to(id, { scale: 1, duration: 0.18, ease: 'power2.inOut' }, t + 0.22);
};
const bump = (id, t, s = 1.05, d = 0.15) => tl.to(id, { scale: s, duration: d, yoyo: true, repeat: 1, ease: 'sine.inOut' }, t);
const shake = (id, t, px = 8) => tl.fromTo(id, { x: 0 }, { x: px, duration: 0.05, repeat: 5, yoyo: true, ease: 'none', immediateRender: false }, t);
const slam = (id, t, r) => tl.fromTo(id, { scale: 2.2, opacity: 0, rotation: r - 12 }, { scale: 1, opacity: 1, rotation: r, duration: 0.24, ease: 'power4.in' }, t);
const type = (id, t, n, d = 0.3) => tl.fromTo(id, { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: d, ease: `steps(${n})` }, t);

// ambient layer: two soft orbs drift for the whole reel
tl.fromTo('#orb1', { x: 0, y: 0 }, { x: 170, y: -110, duration: T.dur, ease: 'sine.inOut' }, 0);
tl.fromTo('#orb2', { x: 0, y: 0 }, { x: -180, y: -150, duration: T.dur, ease: 'sine.inOut' }, 0);

// progress bar: one segment per step
[3, 4, 5].forEach((n, i) => tl.fromTo(`#p${i + 1}`, { scaleX: 0 }, { scaleX: 1, duration: 0.5, ease: 'power2.out' }, T.at(n)));

// 0. hook: title and closed book on screen at frame 0; "guess." shakes on the thud, the squiggle draws on "guesses", the book opens on "open your textbook"
tl.fromTo('#s0-title', { scale: 1.05, transformOrigin: '0% 50%' }, { scale: 1, duration: 0.6, ease: OUT }, 0);
shake('#s0-guess', T.voice(0) + 0.34, 7);
tl.fromTo('#s0-squig-p', { strokeDashoffset: 460 }, { strokeDashoffset: 0, duration: 0.55, ease: 'power2.out' }, at(0, 0.32));
tl.fromTo('#s0-closed', { scale: 1, opacity: 1, transformOrigin: '50% 50%' }, { scale: 0.7, opacity: 0, duration: 0.25, ease: 'power3.in' }, at(0, 0.66));
tl.fromTo('#s0-open', { scale: 0.5, opacity: 0, transformOrigin: '50% 50%' }, { scale: 1, opacity: 1, duration: 0.45, ease: POP }, at(0, 0.66) + 0.2);

// 1. the scene: a chapter on the phone, a highlighter pass, exam week / library / on phone, then the doubt
step('#s1', T.at(1)); title('#s1', T.at(1) + 0.05); card('#s1-card', T.at(1) + 0.15);
late('#s1-head', T.at(1) + 0.4); late('#s1-ex', T.at(1) + 0.48);
tl.fromTo('#s1 .ln', { scaleX: 0 }, { scaleX: 1, duration: 0.4, ease: 'power3.out', stagger: 0.06 }, T.at(1) + 0.4);
pop('#s1-c1', at(1, 0.12)); pop('#s1-c2', at(1, 0.38)); pop('#s1-c3', at(1, 0.78));
tl.fromTo('#s1-hl', { scaleX: 0 }, { scaleX: 1, duration: 0.5, ease: 'power2.inOut' }, at(1, 0.55));
late('#s1-warn', at(1, 0.86));

// 2. the idea (host hidden): memory vs the book, the TOPPER stamp, then memory gets struck out
step('#s2', T.at(2)); title('#s2', T.at(2) + 0.05);
card('#s2-l', T.at(2) + 0.15); card('#s2-r', T.at(2) + 0.25);
pop('#s2-lp', T.at(2) + 0.5); pop('#s2-rp', T.at(2) + 0.58);
pop('#s2-think', T.at(2) + 0.6);
tl.fromTo('#s2-book', { scale: 0.6, opacity: 0, transformOrigin: '50% 50%' }, { scale: 1, opacity: 1, duration: 0.45, ease: POP }, T.at(2) + 0.68);
['#s2-l1', '#s2-l2'].forEach((id, i) => slide(id, at(2, 0.12) + i * 0.07, -60));
['#s2-r1', '#s2-r2'].forEach((id, i) => slide(id, at(2, 0.16) + i * 0.07));
slam('#s2-stamp', at(2, 0.3), -8);
bump('#s2-r', at(2, 0.3) + 0.26, 1.04, 0.18);
tl.fromTo('#s2-strike', { scaleX: 0 }, { scaleX: 1, duration: 0.3, ease: 'power3.in' }, at(2, 0.68));
shake('#s2-l', at(2, 0.68) + 0.3, 8);
tl.fromTo('#s2-think', { rotation: 0 }, { rotation: 8, duration: 0.08, repeat: 5, yoyo: true, ease: 'sine.inOut', immediateRender: false }, at(2, 0.68) + 0.3);

// 3. step 1: the button presses on the click, the menu opens, the tap moves to Textbooks
step('#s3', T.at(3)); title('#s3', T.at(3) + 0.05); card('#s3-card', T.at(3) + 0.15);
late('#s3-head', T.at(3) + 0.4); late('#s3-gem', T.at(3) + 0.46);
tl.fromTo('#s3-btn', { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: POP }, T.at(3) + 0.35);
tl.fromTo('#s3-tap', { scale: 0.3, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.25, ease: POP }, T.voice(3) + 0.55);
tl.to('#s3-btn', { scale: 0.93, duration: 0.08, yoyo: true, repeat: 1, ease: 'power2.inOut' }, T.voice(3) + 0.86);
tl.to('#s3-tap', { scale: 0.75, duration: 0.08, yoyo: true, repeat: 1, ease: 'power2.inOut' }, T.voice(3) + 0.86);
['#m1', '#m2', '#m3'].forEach((id, i) => rise(id, T.voice(3) + 1.0 + i * 0.07));
tl.to('#s3-tap', { x: 160, y: 360, duration: 0.45, ease: 'power2.inOut' }, T.voice(3) + 1.25);
tl.to('#s3-tap', { scale: 0.75, duration: 0.08, yoyo: true, repeat: 1, ease: 'power2.inOut' }, at(3, 0.8));
tl.to('#m3', { backgroundColor: '#E1E8FF', duration: 0.2, ease: 'power2.out' }, at(3, 0.82));
bump('#m3', at(3, 0.82), 1.04);
pop('#m3-go', at(3, 0.86));

// 4. step 2: the shelf, S Chand gets the green ring and tick on the pop
step('#s4', T.at(4)); title('#s4', T.at(4) + 0.05); card('#s4-card', T.at(4) + 0.1);
late('#s4-search', T.at(4) + 0.3);
['#bk1', '#bk2'].forEach((id, i) => tl.fromTo(id, { y: 70, opacity: 0 }, { y: 0, opacity: 1, duration: 0.45, ease: OUT }, T.at(4) + 0.35 + i * 0.07));
tl.fromTo('#s4-ring', { opacity: 0, scale: 1.1 }, { opacity: 1, scale: 1, duration: 0.3, ease: 'power3.out' }, T.voice(4) + 0.72);
pop('#s4-tick', T.voice(4) + 0.78);
bump('#bk2', T.voice(4) + 0.8, 1.04);
slide('#s4-row', T.voice(4) + 1.0);
pop('#s4-chip', T.voice(4) + 1.12);

// 5. step 3: the prompt types line by line, SEND presses on the bloop, two finished tiles land
step('#s5', T.at(5)); title('#s5', T.at(5) + 0.05); card('#s5-card', T.at(5) + 0.12);
late('#s5-lbl', T.at(5) + 0.35);
pop('#s5-go', T.at(5) + 0.45);
type('#pl1', T.voice(5) + 0.1, 18); type('#pl2', T.voice(5) + 0.38, 17); type('#pl3', T.voice(5) + 0.66, 18);
tl.to('#s5-go', { scale: 0.88, duration: 0.08, ease: 'power2.in' }, T.voice(5) + 0.94);
tl.to('#s5-go', { scale: 1, duration: 0.25, ease: POP }, T.voice(5) + 1.02);
['#tile1', '#tile2'].forEach((id, i) => tl.fromTo(id, { y: 50, opacity: 0, scale: 0.9 }, { y: 0, opacity: 1, scale: 1, duration: 0.4, ease: POP }, T.voice(5) + 1.2 + i * 0.08));
late('#rd1', T.voice(5) + 1.5); late('#rd2', T.voice(5) + 1.58);

// 6. the result (cover frame at +1.0): the quiz with a page chip on every answer, then the chips light up in turn
step('#s6', T.at(6)); title('#s6', T.at(6) + 0.05); card('#s6-card', T.at(6) + 0.08);
late('#s6-head', T.at(6) + 0.28); late('#s6-ex', T.at(6) + 0.32);
['#q1', '#q2', '#q3', '#q4'].forEach((id, i) => slide(id, T.at(6) + 0.3 + i * 0.08));
['#src1', '#src2', '#src3'].forEach((id, i) => pop(id, T.at(6) + 0.5 + i * 0.08));
tl.to(['#src1', '#src2', '#src3'], { scale: 1.15, duration: 0.14, yoyo: true, repeat: 1, ease: 'sine.inOut', stagger: 0.12 }, at(6, 0.55));
bump('#s6-card', at(6, 0.78), 1.03, 0.2);
bump('#q4', at(6, 0.85), 1.04);

// 7. the catch: who checked slams on the thud, the count runs to 3, BUGGY stamps the India filter
step('#s7', T.at(7)); title('#s7', T.at(7) + 0.05); card('#s7-card', T.at(7) + 0.3);
tl.fromTo('#k1', { scale: 1.15, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.22, ease: 'power4.in' }, T.voice(7) + 0.9);
slide('#k2', at(7, 0.33));
const books = { v: 0 };
tl.fromTo(books, { v: 0 }, { v: 3, duration: 0.6, ease: 'power3.out', onUpdate: () => { document.getElementById('s7-num').textContent = String(Math.round(books.v)); } }, at(7, 0.36));
late('#k2-a', at(7, 0.46)); late('#k2-b', at(7, 0.5));
slide('#k3', at(7, 0.62));
slam('#s7-buggy', at(7, 0.84), -6);
shake('#k3', at(7, 0.84) + 0.26, 8);
late('#s7-note', at(7, 0.92));

// 8. save, send, then the keyword drops in letter by letter on the beat
tl.fromTo('#s8-save .l', { yPercent: 110 }, { yPercent: 0, duration: 0.55, ease: OUT }, T.at(8));
tl.fromTo('#s8-bm', { y: -80, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: POP }, T.at(8) + 0.2);
late('#s8-send', T.voice(8) + 0.25);
tl.fromTo('#s8-card', { scale: 0.85, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.45, ease: POP }, T.voice(8) + 0.9);
late('#s8-com', T.voice(8) + 1.1);
tl.fromTo('#s8-word i', { y: -120, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: POP, stagger: 0.12 }, T.voice(8) + 3 * T.beat);
late('#s8-tool', T.voice(8) + 3 * T.beat + 0.75);
pop('#s8-free', T.voice(8) + 4 * T.beat + 0.5);
late('#s8-hint', T.voice(8) + 4 * T.beat + 0.75);
bump('#s8-bm', T.end(8), 1.1);
tl.to('#s8-card', { scale: 1.03, duration: 0.3, yoyo: true, repeat: 1, ease: 'sine.inOut' }, T.end(8) + 0.2);
