// Tool reel: Canva Craft makes a shop poster with readable text. Analogy: print shop proofs (the 4 Dream Lab options become proofs A to D).
// Before publishing, re-check on Canva's own pages: Craft open to all users, "up to 4" options per prompt, 55 languages, monthly AI caps on every plan.
// Motion: enters expo.out 0.4-0.6 s, pops back.out, slams power4.in, rows stagger 0.07 s, labels settle after their card.
const OUT = 'expo.out', POP = 'back.out(1.8)';
const span = (n) => T.end(n) - T.voice(n);
const at = (n, f) => T.voice(n) + f * span(n);
const title = (s, t) => tl.fromTo(`${s} .title .l`, { yPercent: 110 }, { yPercent: 0, duration: 0.55, ease: OUT, stagger: 0.08 }, t);
const step = (s, t) => tl.fromTo(`${s} .step`, { x: -40, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4, ease: OUT }, t);
const card = (id, t) => tl.fromTo(id, { y: 110, opacity: 0, scale: 0.96 }, { y: 0, opacity: 1, scale: 1, duration: 0.6, ease: OUT }, t);
const late = (id, t) => tl.fromTo(id, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.35, ease: OUT }, t);
const rowIn = (id, t) => tl.fromTo(id, { x: 60, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4, ease: OUT }, t);
const chip = (id, t) => {
  tl.fromTo(id, { scale: 0, opacity: 0 }, { scale: 1.12, opacity: 1, duration: 0.22, ease: 'power2.out' }, t);
  tl.to(id, { scale: 1, duration: 0.18, ease: 'power2.inOut' }, t + 0.22);
};
const shake = (id, t, px = 8) => tl.fromTo(id, { x: 0 }, { x: px, duration: 0.05, repeat: 5, yoyo: true, ease: 'none' }, t);
const count = (id, to, t, d) => { const o = { v: 0 }; tl.fromTo(o, { v: 0 }, { v: to, duration: d, ease: 'power3.out', onUpdate: () => { document.getElementById(id).textContent = String(Math.round(o.v)); } }, t); };

// ambient: two soft orbs drift for the whole reel
tl.fromTo('#orb1', { x: 0, y: 0 }, { x: 170, y: -110, duration: T.dur, ease: 'sine.inOut' }, 0);
tl.fromTo('#orb2', { x: 0, y: 0 }, { x: -170, y: -150, duration: T.dur, ease: 'sine.inOut' }, 0);

// progress bar: one segment per beat
tl.set(['#p1', '#p2', '#p3', '#p4', '#p5', '#p6', '#p7'], { scaleX: 0 }, 0);
[1, 2, 3, 4, 5, 6, 7].forEach((n) => tl.to(`#p${n}`, { scaleX: 1, duration: 0.5, ease: 'power2.out' }, T.at(n)));

// 0. hook: the claim is on screen at frame 0, the BY EVENING stamp slams on the thud
tl.fromTo('#s0-title', { scale: 1.06, transformOrigin: '0% 0%' }, { scale: 1, duration: 0.7, ease: OUT }, 0);
tl.fromTo('#s0-step', { opacity: 0.7 }, { opacity: 1, duration: 0.3, ease: 'power2.out' }, 0);
tl.fromTo('#s0-stamp', { scale: 2.2, opacity: 0, rotation: -16 }, { scale: 1, opacity: 1, rotation: -6, duration: 0.24, ease: 'power4.in' }, T.voice(0) + 0.6 - 0.24);
tl.to('#s0-stamp', { scale: 1.05, duration: 0.12, yoyo: true, repeat: 1, ease: 'sine.inOut' }, T.voice(0) + 0.6);
tl.to('#s0-stamp', { scale: 1.08, duration: 0.15, yoyo: true, repeat: 1, ease: 'sine.inOut' }, at(0, 0.86));

// 1. the tool: logo pops, three facts land, OPEN on "all users"
step('#s1', T.at(1)); title('#s1', T.at(1) + 0.05); card('#s1-card', T.at(1) + 0.15);
chip('#s1-logo', T.at(1) + 0.45);
late('#s1-name', T.at(1) + 0.55); late('#s1-sub', T.at(1) + 0.62);
['#s1-r1', '#s1-r2', '#s1-r3'].forEach((id, i) => rowIn(id, at(1, 0.15 + i * 0.15)));
chip('#s1-open', at(1, 0.72));
late('#s1-note', at(1, 0.85));

// 2. one prompt types in, Generate presses, four options pop on the pop
step('#s2', T.at(2)); title('#s2', T.at(2) + 0.05); card('#s2-card', T.at(2) + 0.15);
late('#s2-head', T.at(2) + 0.3); late('#s2-ex', T.at(2) + 0.36);
tl.fromTo('#s2-l1', { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 0.4, ease: 'steps(25)' }, T.at(2) + 0.3);
tl.fromTo('#s2-l2', { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 0.4, ease: 'steps(23)' }, T.at(2) + 0.7);
tl.fromTo('#s2-go', { scale: 1 }, { scale: 0.9, duration: 0.12, ease: 'power2.in' }, T.voice(2) + 0.95);
tl.to('#s2-go', { scale: 1, duration: 0.3, ease: POP }, T.voice(2) + 1.07);
['#s2-t1', '#s2-t2', '#s2-t3', '#s2-t4'].forEach((id, i) => tl.fromTo(id, { scale: 0.6, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: POP }, T.voice(2) + 1.2 + i * 0.07));
late('#s2-up', at(2, 0.72));
tl.to(['#s2-t1', '#s2-t2', '#s2-t3', '#s2-t4'], { scale: 1.05, duration: 0.15, yoyo: true, repeat: 1, ease: 'sine.inOut', stagger: 0.07 }, at(2, 0.82));

// 3. the analogy: four proofs pinned up, C gets picked on the click
step('#s3', T.at(3)); title('#s3', T.at(3) + 0.05); card('#s3-card', T.at(3) + 0.12);
late('#s3-head', T.at(3) + 0.4);
['#s3-p1', '#s3-p2', '#s3-p3', '#s3-p4'].forEach((id, i) => tl.fromTo(id, { y: -60, opacity: 0 }, { y: 0, opacity: 1, duration: 0.45, ease: 'power3.out' }, T.voice(3) + 0.15 + i * 0.07));
late('#s3-note', T.voice(3) + 0.6);
tl.to(['#s3-p1', '#s3-p2', '#s3-p4'], { opacity: 0.35, duration: 0.25, ease: 'power2.out' }, T.voice(3) + 1.5);
tl.to('#s3-p3', { y: -10, duration: 0.3, ease: POP }, T.voice(3) + 1.5);
tl.fromTo('#s3-ring', { scale: 1.15, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.25, ease: 'power3.out' }, T.voice(3) + 1.5);
chip('#s3-pick', T.voice(3) + 1.6);

// 4. the words: a counter climbs to 55, three rows say what to check
step('#s4', T.at(4)); title('#s4', T.at(4) + 0.05); card('#s4-card', T.at(4) + 0.15);
tl.fromTo('#s4-num', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.4, ease: OUT }, T.at(4) + 0.35);
count('s4-num', 55, T.at(4) + 0.35, 0.9);
late('#s4-l1', T.at(4) + 0.6); late('#s4-l2', T.at(4) + 0.68);
[['#s4-r1', '#s4-c1'], ['#s4-r2', '#s4-c2'], ['#s4-r3', '#s4-c3']].forEach(([r, c], i) => {
  const t = at(4, [0.18, 0.45, 0.72][i]);
  rowIn(r, t); chip(c, t + 0.2);
});

// 5. payoff: the finished poster drops onto the shutter, tapes slam on the thud, green tick
step('#s5', T.at(5)); title('#s5', T.at(5) + 0.02); card('#s5-wall', T.at(5) + 0.05);
tl.fromTo('#s5-poster', { y: -80, rotation: -4, opacity: 0 }, { y: 0, rotation: 0, opacity: 1, duration: 0.5, ease: 'power3.out' }, T.at(5) + 0.2);
['#s5-f1', '#s5-f2', '#s5-f3'].forEach((id, i) => tl.fromTo(id, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.35, ease: POP }, T.at(5) + 0.5 + i * 0.07));
tl.fromTo('#s5-tape1', { scale: 1.8, opacity: 0, rotation: -24 }, { scale: 1, opacity: 1, rotation: -10, duration: 0.22, ease: 'power4.in' }, T.voice(5) + 0.7 - 0.22);
tl.fromTo('#s5-tape2', { scale: 1.8, opacity: 0, rotation: 24 }, { scale: 1, opacity: 1, rotation: 10, duration: 0.22, ease: 'power4.in' }, T.voice(5) + 0.7 - 0.14);
tl.to('#s5-poster', { scale: 1.03, duration: 0.12, yoyo: true, repeat: 1, ease: 'sine.inOut' }, T.voice(5) + 0.75);
chip('#s5-done', at(5, 0.78));

// 6. the catch: the monthly meter hits the cap on the ding, then a typo gets caught and fixed
step('#s6', T.at(6)); title('#s6', T.at(6) + 0.05); card('#s6-card', T.at(6) + 0.15);
late('#s6-l1', T.at(6) + 0.4); late('#s6-l2', T.at(6) + 0.46);
tl.fromTo('#s6-fill', { scaleX: 0 }, { scaleX: 0.94, duration: 1.0, ease: 'power2.inOut' }, T.voice(6) + 0.4);
tl.to('#s6-fill', { backgroundColor: '#B83227', duration: 0.2, ease: 'power2.out' }, T.voice(6) + 1.4);
chip('#s6-cap', T.voice(6) + 1.4);
late('#s6-l3', T.voice(6) + 1.5);
rowIn('#s6-r1', at(6, 0.5)); chip('#s6-c1', at(6, 0.5) + 0.15); shake('#s6-r1', at(6, 0.5) + 0.4, 8);
rowIn('#s6-r2', at(6, 0.66)); chip('#s6-c2', at(6, 0.66) + 0.15);
tl.fromTo('#s6-r2', { scale: 1 }, { scale: 1.04, duration: 0.15, yoyo: true, repeat: 1, ease: 'sine.inOut' }, at(6, 0.66) + 0.45);
rowIn('#s6-r3', at(6, 0.8)); chip('#s6-c3', at(6, 0.8) + 0.15);

// 7. send this, then the keyword: CRAFT letters drop in and pulse as it is said
tl.fromTo('#s7-send', { yPercent: 40, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.6, ease: OUT }, T.at(7));
tl.fromTo('#s7-plane', { x: -200, opacity: 0, rotation: -20 }, { x: 0, opacity: 1, rotation: 0, duration: 0.7, ease: 'power2.out' }, T.at(7) + 0.25);
tl.fromTo('#s7-plane', { y: 120 }, { y: 0, duration: 0.7, ease: 'back.out(2)' }, T.at(7) + 0.25);
late('#s7-who', T.voice(7) + 0.3);
tl.fromTo('#s7-pill', { scale: 0.6, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.45, ease: POP }, at(7, 0.48));
late('#s7-cm', at(7, 0.48) + 0.15);
tl.fromTo('#s7-kw .k', { y: -70, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: POP, stagger: 0.06 }, at(7, 0.48) + 0.2);
late('#s7-save', at(7, 0.78));
tl.to('#s7-kw', { scale: 1.06, duration: 0.18, yoyo: true, repeat: 1, ease: 'sine.inOut' }, at(7, 0.9));
tl.to('#s7-plane', { x: 24, y: -18, duration: 0.8, yoyo: true, repeat: 1, ease: 'sine.inOut' }, T.end(7));
