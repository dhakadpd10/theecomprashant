// Compare (#17 Head To Head): which AI knows this week's news. Idea: it learned old text, so it searches or guesses.
// Analogy: three toppers, today's notice, one walked past the board. The ranked card is filled from the real run only.
// Motion: enters expo.out 0.4-0.6 s, pops back.out, slams power4.in, stagger 0.07 s, labels settle late (follow-through).
const OUT = 'expo.out', POP = 'back.out(1.8)';
const span = (n) => T.end(n) - T.voice(n);
const sp = (n, f) => T.voice(n) + f * span(n);
const title = (s, t) => tl.fromTo(`${s} .title .l`, { yPercent: 110 }, { yPercent: 0, duration: 0.55, ease: OUT, stagger: 0.08 }, t);
const step = (s, t) => tl.fromTo(`${s} .step`, { x: -40, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4, ease: OUT }, t);
const card = (id, t) => tl.fromTo(id, { y: 100, opacity: 0, scale: 0.97 }, { y: 0, opacity: 1, scale: 1, duration: 0.6, ease: OUT }, t);
const late = (id, t) => tl.fromTo(id, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.35, ease: OUT }, t);
const rowIn = (id, t) => tl.fromTo(id, { x: 60, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4, ease: OUT }, t);
const chip = (id, t) => {
  tl.fromTo(id, { scale: 0, opacity: 0 }, { scale: 1.12, opacity: 1, duration: 0.22, ease: 'power2.out' }, t);
  tl.to(id, { scale: 1, duration: 0.18, ease: 'power2.inOut' }, t + 0.22);
};
const bump = (id, t, s = 1.05) => tl.to(id, { scale: s, duration: 0.15, yoyo: true, repeat: 1, ease: 'sine.inOut' }, t);
const shake = (id, t, px = 8) => tl.fromTo(id, { x: 0 }, { x: px, duration: 0.05, repeat: 5, yoyo: true, ease: 'none' }, t);

// ambient: two soft orbs drift for the whole reel
tl.fromTo('#orb1', { x: 0, y: 0 }, { x: 160, y: -120, duration: T.dur, ease: 'sine.inOut' }, 0);
tl.fromTo('#orb2', { x: 0, y: 0 }, { x: -180, y: -160, duration: T.dur, ease: 'sine.inOut' }, 0);

// progress bar: one segment per beat
tl.set(['#p1', '#p2', '#p3', '#p4', '#p5', '#p6', '#p7'], { scaleX: 0 }, 0);
[1, 3, 4, 5, 6, 7, 8].forEach((n, i) => tl.to(`#p${i + 1}`, { scaleX: 1, duration: 0.5, ease: 'power2.out' }, T.at(n)));

// 0. hook: the question and the three contenders are on screen at frame 0; each name bumps as it's said
tl.fromTo('#s0-title .l', { yPercent: 0 }, { yPercent: 0, duration: 0.01 }, 0);
tl.fromTo('#s0-title', { scale: 1.06 }, { scale: 1, duration: 0.7, ease: OUT }, 0);
bump('#s0-t1', T.voice(0) + 0.5, 1.12);
bump('#s0-t2', sp(0, 0.3), 1.12);
bump('#s0-t3', sp(0, 0.45), 1.12);
tl.fromTo('#squig-p', { strokeDashoffset: 640 }, { strokeDashoffset: 0, duration: 0.6, ease: 'power2.out' }, sp(0, 0.72));

// 1. it learned old text: the blue bar fills to a cutoff, a dashed gap, then a red "?" at this week
step('#s1', T.at(1)); title('#s1', T.at(1) + 0.05); card('#s1-card', T.at(1) + 0.15);
late('#s1-head', T.at(1) + 0.45);
tl.fromTo('#tl-fill', { scaleX: 0 }, { scaleX: 1, duration: 0.8, ease: 'power3.out' }, sp(1, 0.45));
late('#tl-old', sp(1, 0.45) + 0.5);
tl.fromTo('#tl-tick', { scaleY: 0 }, { scaleY: 1, duration: 0.3, ease: POP }, sp(1, 0.45) + 0.7);
late('#tl-cut', sp(1, 0.45) + 0.8);
tl.fromTo('#tl-gap', { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 0.4, ease: 'power2.out' }, sp(1, 0.75));
chip('#tl-pin', sp(1, 0.86)); late('#tl-now', sp(1, 0.9));

// 2. fresh news: it searches (green SOURCE) or guesses (red NO SOURCE)
late('#s1-fork', T.at(2));
rowIn('#f1', T.voice(2) + 0.05); chip('#f1c', sp(2, 0.35));
rowIn('#f2', sp(2, 0.45)); chip('#f2c', sp(2, 0.68));

// 3. the analogy: the notice goes up, three toppers, two guess, one saw the board (board glows green)
step('#s3', T.at(3)); title('#s3', T.at(3) + 0.05); card('#s3-card', T.at(3) + 0.15);
tl.fromTo('#board', { y: -30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: OUT }, T.at(3) + 0.3);
tl.fromTo('#notice', { rotation: -6, scale: 0.8, opacity: 0 }, { rotation: 0, scale: 1, opacity: 1, duration: 0.45, ease: POP }, T.at(3) + 0.45);
chip('#pin', T.at(3) + 0.75);
['#t1', '#t2', '#t3'].forEach((id, i) => rowIn(id, sp(3, 0.12) + i * 0.07));
chip('#t1c', sp(3, 0.55)); chip('#t3c', sp(3, 0.55) + 0.12);
tl.fromTo('#board-glow', { opacity: 0 }, { opacity: 1, duration: 0.3, ease: 'power2.out' }, sp(3, 0.78));
chip('#t2c', sp(3, 0.78));
bump('#t2', sp(3, 0.78) + 0.25, 1.04);
late('#s3-map', sp(3, 0.82));

// 4. the proof: the counter runs to 13.9%, seven dots with one red, the buzz shakes the number
step('#s4', T.at(4)); title('#s4', T.at(4) + 0.05); card('#s4-card', T.at(4) + 0.15);
late('#s4-src', T.at(4) + 0.5);
const pct = { v: 0 };
tl.fromTo(pct, { v: 0 }, { v: 13.9, duration: 1.2, ease: 'power3.out', onUpdate: () => { document.getElementById('s4-num').textContent = `${pct.v.toFixed(1)}%`; } }, sp(4, 0.1));
bump('#s4-num', sp(4, 0.1) + 1.25, 1.06);
['#d1', '#d2', '#d3', '#d4', '#d5', '#d6', '#d7'].forEach((id, i) => tl.fromTo(id, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.3, ease: POP }, sp(4, 0.22) + i * 0.06));
bump('#d7', sp(4, 0.22) + 0.6, 1.2);
late('#s4-one', sp(4, 0.32));
tl.fromTo('#s4-txt', { filter: 'blur(12px)', opacity: 0 }, { filter: 'blur(0px)', opacity: 1, duration: 0.5, ease: OUT }, sp(4, 0.42));
shake('#s4-num', T.end(4) - 0.2, 8);
shake('#d7', T.end(4) - 0.2, 6);

// 5. the test: the question wipes in, arrows draw, three free-plan tiles pop (pop sfx), each gets ASKED
step('#s5', T.at(5)); title('#s5', T.at(5) + 0.05); card('#s5-card', T.at(5) + 0.1);
late('#s5-qlbl', T.at(5) + 0.3);
tl.fromTo('#s5-q', { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 0.5, ease: 'power2.out' }, T.at(5) + 0.3);
tl.fromTo('#s5 .arp', { strokeDashoffset: 80 }, { strokeDashoffset: 0, duration: 0.35, ease: 'power2.out', stagger: 0.07 }, T.voice(5) + 0.15);
['#tile1', '#tile2', '#tile3'].forEach((id, i) => tl.fromTo(id, { scale: 0.85, opacity: 0, y: 30 }, { scale: 1, opacity: 1, y: 0, duration: 0.4, ease: POP }, T.voice(5) + 0.3 + i * 0.07));
['#a1', '#a2', '#a3'].forEach((id, i) => chip(id, sp(5, 0.7) + i * 0.07));
late('#s5-foot', sp(5, 0.85));

// 6. the payoff: the ranked card lands fully by the cover frame, PICK slams onto rank 1 (real run only)
step('#s6', T.at(6)); title('#s6', T.at(6) + 0.05); card('#s6-card', T.at(6) + 0.1);
late('#s6-head', T.at(6) + 0.35);
['#r1', '#r2', '#r3'].forEach((id, i) => rowIn(id, T.at(6) + 0.25 + i * 0.07));
['#n1', '#n2', '#n3'].forEach((id, i) => chip(id, T.at(6) + 0.4 + i * 0.07));
[['#r1s', '#r1d'], ['#r2s', '#r2d'], ['#r3s', '#r3d']].forEach((pair, i) => pair.forEach((id, j) => chip(id, T.at(6) + 0.5 + i * 0.07 + j * 0.05)));
tl.fromTo('#pick', { scale: 2.2, opacity: 0, rotation: -14 }, { scale: 1, opacity: 1, rotation: -4, duration: 0.22, ease: 'power4.in' }, T.at(6) + 0.75);
late('#s6-foot', T.at(6) + 0.85);
bump('#r1', sp(6, 0.62), 1.04);

// 7. the catch: an example source link with an old date, the cursor clicks the date (click sfx), two rules
step('#s7', T.at(7)); title('#s7', T.at(7) + 0.05); card('#s7-card', T.at(7) + 0.15);
rowIn('#s7-link', T.at(7) + 0.35);
late('#s7-ex', T.at(7) + 0.45);
chip('#s7-date', T.voice(7) + 0.8);
tl.fromTo('#s7-cur', { x: -220, y: 160, opacity: 0 }, { x: 0, y: 0, opacity: 1, duration: 0.45, ease: 'power2.inOut' }, T.voice(7) + 0.9);
tl.to('#s7-cur', { scale: 0.82, duration: 0.08, yoyo: true, repeat: 1, ease: 'power2.inOut' }, T.voice(7) + 1.36);
shake('#s7-date', T.voice(7) + 1.5, 6);
rowIn('#s7-r1', sp(7, 0.55)); chip('#s7-r1c', sp(7, 0.55) + 0.2);
rowIn('#s7-r2', sp(7, 0.7)); chip('#s7-r2c', sp(7, 0.7) + 0.2);

// 8. send this, then the keyword, big, letters drop in; the free tool's two real promises underneath
title('#s8', T.at(8));
tl.fromTo('#s8-plane', { x: -200, opacity: 0, rotation: -20 }, { x: 0, opacity: 1, rotation: 0, duration: 0.7, ease: 'power2.out' }, T.at(8) + 0.2);
tl.fromTo('#s8-plane', { y: 120 }, { y: 0, duration: 0.7, ease: 'back.out(2)' }, T.at(8) + 0.2);
late('#s8-who', T.voice(8) + 0.3);
tl.fromTo('#s8-pill', { scale: 0.7, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.45, ease: POP }, T.at(8) + 0.5);
late('#s8-cm', T.at(8) + 0.7);
['#kw1', '#kw2', '#kw3', '#kw4', '#kw5'].forEach((id, i) => tl.fromTo(id, { y: -70, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: POP }, T.at(8) + 0.75 + i * 0.07));
late('#s8-free', sp(8, 0.35));
rowIn('#s8-r1', sp(8, 0.4)); rowIn('#s8-r2', sp(8, 0.4) + 0.12);
['#kw1', '#kw2', '#kw3', '#kw4', '#kw5'].forEach((id, i) => tl.to(id, { y: -18, duration: 0.15, yoyo: true, repeat: 1, ease: 'sine.inOut' }, sp(8, 0.78) + i * 0.07));
bump('#s8-pill', T.end(8) + 0.2, 1.05);
tl.to('#s8-plane', { x: 24, y: -16, duration: 0.6, yoyo: true, repeat: 1, ease: 'sine.inOut' }, T.end(8));
