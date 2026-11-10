// Tutorial: a recipe e-book in 4 steps. Analogy: mom's recipe diary, typed and bound.
// Motion: enters expo.out 0.5 s, pops back.out, slams power4.in, staggers 0.05 to 0.08 s, labels settle late.
const OUT = 'expo.out', POP = 'back.out(1.8)';
const span = (n) => T.end(n) - T.voice(n);
const at = (n, f) => T.voice(n) + f * span(n);
const title = (s, t) => tl.fromTo(`${s} .title .l`, { yPercent: 110 }, { yPercent: 0, duration: 0.55, ease: OUT, stagger: 0.08 }, t);
const card = (id, t) => tl.fromTo(id, { y: 110, opacity: 0, scale: 0.96 }, { y: 0, opacity: 1, scale: 1, duration: 0.6, ease: OUT }, t);
const step = (s, t) => tl.fromTo(`${s} .step`, { x: -40, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4, ease: OUT }, t);
const late = (id, t) => tl.fromTo(id, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.35, ease: OUT }, t);
const chip = (id, t) => {
  tl.fromTo(id, { scale: 0, opacity: 0 }, { scale: 1.12, opacity: 1, duration: 0.22, ease: 'power2.out' }, t);
  tl.to(id, { scale: 1, duration: 0.18, ease: 'power2.inOut' }, t + 0.22);
};
const slideIn = (id, t, dx = 60) => tl.fromTo(id, { x: dx, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4, ease: OUT }, t);
const shake = (id, t, px = 8) => tl.fromTo(id, { x: 0 }, { x: px, duration: 0.05, repeat: 5, yoyo: true, ease: 'none' }, t);
const count = (id, to, t, d, fmt) => {
  const o = { v: 0 };
  tl.fromTo(o, { v: 0 }, { v: to, duration: d, ease: 'power2.out', onUpdate: () => { document.getElementById(id).textContent = fmt(Math.round(o.v)); } }, t);
};

// ambient: two soft orbs drift for the whole reel
tl.fromTo('#orb1', { x: 0, y: 0 }, { x: 170, y: -130, duration: T.dur, ease: 'sine.inOut' }, 0);
tl.fromTo('#orb2', { x: 0, y: 0 }, { x: -190, y: -150, duration: T.dur, ease: 'sine.inOut' }, 0);

// progress bar: one segment per step (lines 2 to 5)
tl.set(['#p1', '#p2', '#p3', '#p4'], { scaleX: 0 }, 0);
[2, 3, 4, 5].forEach((n, i) => tl.to(`#p${i + 1}`, { scaleX: 1, duration: 0.5, ease: 'power2.out' }, T.at(n)));

// 0. hook: the title and the example-price label are on screen at frame 0
tl.fromTo('#s0-title .l', { yPercent: 0 }, { yPercent: 0, duration: 0.01 }, 0);
tl.fromTo('#s0-title', { scale: 1.06 }, { scale: 1, duration: 0.7, ease: OUT }, 0);
tl.fromTo('#s0-kick', { opacity: 0.7 }, { opacity: 1, duration: 0.3 }, 0);
tl.fromTo('#s0-ex', { opacity: 1 }, { opacity: 1, duration: 0.01 }, 0);
tl.fromTo('#squig-p', { strokeDashoffset: 320 }, { strokeDashoffset: 0, duration: 0.5, ease: 'power2.out' }, T.voice(0) + 0.25);
tl.fromTo('#s0-price', { scale: 1 }, { scale: 1.14, duration: 0.12, yoyo: true, repeat: 1, ease: 'power2.out' }, T.voice(0) + 0.6);
chip('#s0-talk', at(0, 0.78));

// 1. the analogy: handwritten diary, an arrow, the typed and bound page
step('#s1', T.at(1)); title('#s1', T.at(1) + 0.05); card('#s1-card', T.at(1) + 0.15);
tl.fromTo('#diary', { x: -40, opacity: 0 }, { x: 0, opacity: 1, duration: 0.45, ease: OUT }, T.at(1) + 0.25);
tl.fromTo('#diary .hw', { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 0.3, ease: 'power2.out', stagger: 0.08 }, T.at(1) + 0.4);
tl.fromTo('#s1-arrow-p', { strokeDashoffset: 90 }, { strokeDashoffset: 0, duration: 0.35, ease: 'power2.out' }, at(1, 0.35));
tl.fromTo('#page', { x: 50, opacity: 0, scale: 0.94 }, { x: 0, opacity: 1, scale: 1, duration: 0.45, ease: POP }, at(1, 0.48));
tl.fromTo('#page .pr', { opacity: 0, filter: 'blur(10px)' }, { opacity: 1, filter: 'blur(0px)', duration: 0.3, ease: 'power2.out', stagger: 0.07 }, at(1, 0.6));
tl.fromTo('#ribbon', { scaleY: 0 }, { scaleY: 1, duration: 0.3, ease: 'back.out(2)', transformOrigin: 'center top' }, at(1, 0.75));
late('#s1-l1', at(1, 0.5)); late('#s1-l2', at(1, 0.8));

// 2. step 1: dishes tick in, the counter climbs to 15
step('#s2', T.at(2)); title('#s2', T.at(2) + 0.05); card('#s2-card', T.at(2) + 0.15); late('#s2-head', T.at(2) + 0.45);
['#d1', '#d2', '#d3', '#d4'].forEach((id, i) => slideIn(id, T.voice(2) + 0.2 + i * 0.07));
['#t1', '#t2', '#t3', '#t4'].forEach((id, i) => chip(id, at(2, 0.3 + i * 0.15)));
count('s2-count', 15, at(2, 0.3), 1.5, (v) => `${v} / 15`);
late('#s2-more', at(2, 0.75));
tl.fromTo('#s2-count', { scale: 1 }, { scale: 1.1, duration: 0.15, yoyo: true, repeat: 1, ease: 'sine.inOut' }, at(2, 0.3) + 1.5);

// 3. step 2 (favourite): the voice note pops, then the AI types the neat recipe
step('#s3', T.at(3)); title('#s3', T.at(3) + 0.05); card('#s3-a', T.at(3) + 0.15); late('#s3-la', T.at(3) + 0.45);
tl.fromTo('#mic', { scale: 0.95 }, { scale: 1, duration: 0.2, ease: 'power2.out' }, T.voice(3) + 0.2);
tl.fromTo('#mic-ring', { scale: 1, opacity: 0.6 }, { scale: 1.45, opacity: 0, duration: 0.6, ease: 'power2.out', repeat: 3 }, T.voice(3) + 0.3);
tl.fromTo('#bubble', { scale: 0.6, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: POP, transformOrigin: 'left center' }, T.voice(3) + 0.4);
tl.fromTo('#wave i', { scaleY: 0.3 }, { scaleY: 1, duration: 0.2, ease: 'sine.inOut', stagger: 0.04, yoyo: true, repeat: 5 }, T.voice(3) + 0.55);
card('#s3-b', at(3, 0.42));
chip('#s3-free', at(3, 0.42) + 0.3); late('#s3-lb', at(3, 0.42) + 0.38);
late('#rt', at(3, 0.5));
['#rl1', '#rl2', '#rl3', '#rl4'].forEach((id, i) => tl.fromTo(id, { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 0.28, ease: 'steps(12)' }, at(3, 0.55) + i * 0.3));
chip('#s3-qty', at(3, 0.88));
late('#s3-ex', at(3, 0.9));

// 4. step 3: 20 pages pop into the Canva grid, the counter runs with them
step('#s4', T.at(4)); title('#s4', T.at(4) + 0.05); card('#s4-card', T.at(4) + 0.15); late('#s4-head', T.at(4) + 0.45);
tl.fromTo('#grid .pg', { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.3, ease: POP, stagger: 0.035 }, T.voice(4) + 0.3);
count('s4-count', 20, T.voice(4) + 0.3, 0.75, (v) => `${v} / 20 pages`);
tl.fromTo('#grid', { scale: 1 }, { scale: 1.04, duration: 0.18, yoyo: true, repeat: 1, ease: 'sine.inOut' }, at(4, 0.75));

// 5. step 4: list it (click), then the rupee site and the dollar site, fees left to each pricing page
step('#s5', T.at(5)); title('#s5', T.at(5) + 0.05); card('#s5-card', T.at(5) + 0.15);
slideIn('#lst', T.at(5) + 0.3, 40);
tl.set('#go-b', { opacity: 0 }, 0);
tl.fromTo('#go', { scale: 1 }, { scale: 0.88, duration: 0.1, yoyo: true, repeat: 1, ease: 'power2.inOut' }, T.voice(5) + 0.9);
tl.to('#go', { backgroundColor: '#187A47', duration: 0.2, ease: 'power2.out' }, T.voice(5) + 1.0);
tl.to('#go-a', { opacity: 0, duration: 0.15 }, T.voice(5) + 1.0);
tl.fromTo('#go-b', { opacity: 0 }, { opacity: 1, duration: 0.2 }, T.voice(5) + 1.05);
slideIn('#o1', at(5, 0.35)); chip('#o1c', at(5, 0.45)); late('#o1f', at(5, 0.52));
slideIn('#o2', at(5, 0.68)); chip('#o2c', at(5, 0.78)); late('#o2f', at(5, 0.85));

// 6. the result: the finished e-book, cover and page, price labelled example (whistle line)
step('#s6', T.at(6)); title('#s6', T.at(6) + 0.05); card('#s6-card', T.at(6) + 0.12);
tl.fromTo('#cov', { y: 40, opacity: 0, rotation: -4 }, { y: 0, opacity: 1, rotation: 0, duration: 0.5, ease: POP }, T.at(6) + 0.25);
tl.fromTo('#pg2', { x: 60, opacity: 0 }, { x: 0, opacity: 1, duration: 0.45, ease: OUT }, T.at(6) + 0.38);
tl.fromTo('#pg2 .rr', { opacity: 0, filter: 'blur(10px)' }, { opacity: 1, filter: 'blur(0px)', duration: 0.3, ease: 'power2.out', stagger: 0.06 }, T.at(6) + 0.55);
late('#s6-price', T.at(6) + 0.7); late('#s6-ex', T.at(6) + 0.8);
chip('#pg2-ai', at(6, 0.2));
chip('#s6-yours', at(6, 0.55));
tl.fromTo('#cov', { scale: 1 }, { scale: 1.05, duration: 0.18, yoyo: true, repeat: 1, ease: 'sine.inOut' }, at(6, 0.6));

// 7. the list card everyone saves, then the catch chips land with a buzz
step('#s7', T.at(7)); title('#s7', T.at(7) + 0.05); card('#s7-card', T.at(7) + 0.1); late('#s7-head', T.at(7) + 0.35);
['#m1', '#m2', '#m3', '#m4'].forEach((id, i) => slideIn(id, T.at(7) + 0.3 + i * 0.07));
chip('#fav', T.at(7) + 0.65);
tl.fromTo('#s7-div', { scaleX: 0 }, { scaleX: 1, duration: 0.4, ease: 'power3.out' }, T.voice(7) + 0.45);
late('#s7-cl', T.voice(7) + 0.5);
chip('#c1', T.voice(7) + 0.72); shake('#c1', T.voice(7) + 0.95);
chip('#c2', at(7, 0.5));
chip('#c3', at(7, 0.8)); shake('#c3', at(7, 0.8) + 0.4);

// 8. send this, save it, then the keyword drops in letter by letter
title('#s8', T.at(8));
late('#s8-who', T.voice(8) + 0.3);
tl.fromTo('#bm', { y: -40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: 'back.out(2)' }, T.voice(8) + 0.9);
late('#s8-st', T.voice(8) + 1.0);
tl.fromTo('#s8-pill', { scale: 0.6, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.45, ease: POP }, T.voice(8) + 2.0);
late('#s8-com', T.voice(8) + 2.2);
tl.fromTo('#kw .k', { y: -90, opacity: 0 }, { y: 0, opacity: 1, duration: 0.35, ease: 'back.out(2.2)', stagger: 0.06 }, T.voice(8) + 2.4);
chip('#s8-stk', T.voice(8) + 3.0);
tl.fromTo('#s8-pill', { scale: 1 }, { scale: 1.04, duration: 0.3, yoyo: true, repeat: 1, ease: 'sine.inOut' }, T.end(8) - 0.2);
