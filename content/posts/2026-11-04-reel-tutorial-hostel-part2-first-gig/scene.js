// Tutorial explainer, hostel Part 2: skill -> Fiverr gig with free tools. Analogy: the dhaba menu (1 dish, 3 plates).
// Motion system: enters expo.out ~0.5 s, pops back.out, slams power4.in, staggers 0.06 to 0.12 s, labels settle late.
const OUT = 'expo.out', POP = 'back.out(1.8)';
const span = (n) => T.end(n) - T.voice(n);
const at = (n, f) => T.voice(n) + f * span(n);
const title = (s, t) => tl.fromTo(`${s} .title .l`, { yPercent: 110 }, { yPercent: 0, duration: 0.55, ease: OUT, stagger: 0.08 }, t);
const step = (s, t) => tl.fromTo(`${s} .step`, { x: -40, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4, ease: OUT }, t);
const card = (id, t) => tl.fromTo(id, { y: 110, opacity: 0, scale: 0.96 }, { y: 0, opacity: 1, scale: 1, duration: 0.55, ease: OUT }, t);
const late = (id, t) => tl.fromTo(id, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.35, ease: OUT }, t);
const rowIn = (id, t) => tl.fromTo(id, { x: 60, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4, ease: OUT }, t);
const chip = (id, t) => {
  tl.fromTo(id, { scale: 0, opacity: 0 }, { scale: 1.12, opacity: 1, duration: 0.22, ease: 'power2.out' }, t);
  tl.to(id, { scale: 1, duration: 0.18, ease: 'power2.inOut' }, t + 0.22);
};

// ambient: two soft orbs drift for the whole reel
tl.fromTo('#orb1', { x: 0, y: 0 }, { x: 170, y: -120, duration: T.dur, ease: 'sine.inOut' }, 0);
tl.fromTo('#orb2', { x: 0, y: 0 }, { x: -180, y: -150, duration: T.dur, ease: 'sine.inOut' }, 0);

// 0. hook: title on screen at frame 0, the FREE AI sticker slams on the thud, then a punch on "gig"
tl.fromTo('#s0-title', { scale: 1.06, transformOrigin: '0% 50%' }, { scale: 1, duration: 0.7, ease: OUT }, 0);
tl.fromTo('#s0-step', { opacity: 0.7 }, { opacity: 1, duration: 0.3, ease: 'power2.out' }, 0);
tl.fromTo('#s0-free', { scale: 2.2, opacity: 0, rotation: -25 }, { scale: 1, opacity: 1, rotation: -10, duration: 0.22, ease: 'power4.in' }, T.voice(0) + 0.28);
tl.to('#s0-free', { scale: 1.08, duration: 0.12, yoyo: true, repeat: 1, ease: 'sine.inOut' }, T.voice(0) + 0.5);
tl.to('#s0-title', { scale: 1.04, duration: 0.15, yoyo: true, repeat: 1, ease: 'sine.inOut' }, at(0, 0.85));

// 1. the hostel room: live dot blinks, four ready rows, chips pop as he talks
step('#s1', T.at(1)); title('#s1', T.at(1) + 0.05); card('#s1-card', T.at(1) + 0.15);
tl.fromTo('#s1-dot', { opacity: 1 }, { opacity: 0.2, duration: 0.3, repeat: 9, yoyo: true, ease: 'steps(1)' }, T.at(1) + 0.2);
['#r1', '#r2', '#r3', '#r4'].forEach((id, i) => rowIn(id, at(1, 0.08) + i * 0.07));
['#c1', '#c2', '#c3', '#c4'].forEach((id, i) => chip(id, at(1, 0.35) + i * 0.18 * span(1)));
late('#s1-note', at(1, 0.85));

// 2. the analogy: a dhaba menu board, empty slots fill: the dish, then three plates
step('#s2', T.at(2)); title('#s2', T.at(2) + 0.05); card('#s2-card', T.at(2) + 0.15);
late('#s2-head', T.at(2) + 0.4); late('#s2-ex', T.at(2) + 0.48);
const fill = (id, t) => {
  tl.fromTo(id, { backgroundColor: 'rgba(246,238,219,0)', borderColor: 'rgba(246,238,219,0.45)' }, { backgroundColor: 'rgba(246,238,219,1)', borderColor: 'rgba(246,238,219,1)', duration: 0.25, ease: 'power2.out' }, t);
  tl.fromTo(`${id} .in`, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.3, ease: OUT }, t + 0.05);
};
fill('#dish', at(2, 0.42));
late('#s2-col', at(2, 0.58));
['#pl1', '#pl2', '#pl3'].forEach((id, i) => {
  const t = at(2, 0.62) + i * 0.12;
  fill(id, t);
  tl.fromTo(`${id} .plate`, { scale: 0, rotation: -90 }, { scale: 1, rotation: 0, duration: 0.4, ease: POP }, t + 0.08);
});

// progress bar: one segment per step
tl.set(['#p1', '#p2', '#p3'], { scaleX: 0 }, 0);
[3, 4, 5].forEach((n, i) => tl.to(`#p${i + 1}`, { scaleX: 1, duration: 0.5, ease: 'power2.out' }, T.at(n)));

// 3. step 1: prompt + skill pasted, the AI types, four parts of the gig come back ready (pop on the last chip)
step('#s3', T.at(3)); title('#s3', T.at(3) + 0.05); card('#s3-card', T.at(3) + 0.15);
tl.fromTo('#s3-ask', { scale: 0.8, opacity: 0, transformOrigin: '100% 100%' }, { scale: 1, opacity: 1, duration: 0.4, ease: POP }, at(3, 0.12));
late('#s3-paste', at(3, 0.2));
tl.fromTo('#s3-skill', { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 0.6, ease: 'steps(18)' }, at(3, 0.35));
tl.fromTo('#s3-dots', { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 0.25, ease: POP }, at(3, 0.5));
tl.fromTo('#s3-dots i', { y: 0 }, { y: -10, duration: 0.15, yoyo: true, repeat: 1, stagger: 0.08, ease: 'sine.inOut' }, at(3, 0.5) + 0.15);
tl.to('#s3-dots', { opacity: 0, duration: 0.2, ease: 'power3.in' }, at(3, 0.64));
late('#s3-rl', at(3, 0.66));
['#a1', '#a2', '#a3', '#a4'].forEach((id, i) => rowIn(id, at(3, 0.66) + i * 0.1));
['#ac1', '#ac2', '#ac3', '#ac4'].forEach((id, i) => chip(id, T.end(3) - 0.3 - (3 - i) * 0.12));

// 4. step 2: the Canva image builds: background wipes, text rises, three posts pop, download turns green
step('#s4', T.at(4)); title('#s4', T.at(4) + 0.05); card('#s4-card', T.at(4) + 0.1);
late('#s4-lbl', T.at(4) + 0.3);
tl.fromTo('#cv-bg', { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 0.4, ease: 'power3.out' }, T.voice(4) + 0.05);
tl.fromTo('#s4 .cvm > span', { yPercent: 110 }, { yPercent: 0, duration: 0.45, ease: OUT, stagger: 0.08 }, T.voice(4) + 0.3);
['#ph1', '#ph2', '#ph3'].forEach((id, i) => tl.fromTo(id, { y: 60, opacity: 0, rotation: 0 }, { y: 0, opacity: 1, rotation: [-8, 0, 8][i], duration: 0.4, ease: POP }, T.voice(4) + 0.5 + i * 0.07));
late('#cv-sub', T.voice(4) + 0.8);
tl.fromTo('#tools .tool', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.3, ease: OUT, stagger: 0.06 }, T.at(4) + 0.35);
tl.fromTo('#tl3', { backgroundColor: '#ECEBE7', color: '#1E1A16' }, { backgroundColor: '#157A44', color: '#FFFFFF', duration: 0.2, ease: 'power2.out' }, T.end(4) - 0.25);
tl.fromTo('#tl3', { scale: 1 }, { scale: 1.08, duration: 0.12, yoyo: true, repeat: 1, ease: 'sine.inOut' }, T.end(4) - 0.25);

// 5. step 3 (full width): the form fills field by field, Publish clicks, FREE TO JOIN slams
step('#s5', T.at(5)); title('#s5', T.at(5) + 0.05); card('#s5-card', T.at(5) + 0.05);
tl.fromTo('#f1t', { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 0.45, ease: 'steps(20)' }, T.voice(5) + 0.05);
tl.fromTo('#s5-pks .pk', { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.3, ease: POP, stagger: 0.06 }, T.voice(5) + 0.3);
tl.fromTo('#f3t', { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 0.3, ease: 'power2.out' }, T.voice(5) + 0.5);
tl.fromTo('#f4-th', { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.3, ease: POP }, T.voice(5) + 0.6);
late('#f4-t', T.voice(5) + 0.66);
tl.fromTo('#s5-pub', { scale: 1, backgroundColor: '#2F5BD3' }, { scale: 0.9, backgroundColor: '#1F3F9C', duration: 0.08, ease: 'power2.in' }, T.voice(5) + 0.82);
tl.to('#s5-pub', { scale: 1, backgroundColor: '#2F5BD3', duration: 0.3, ease: POP }, T.voice(5) + 0.9);
tl.fromTo('#s5-free', { scale: 2, opacity: 0, rotation: -14 }, { scale: 1, opacity: 1, rotation: -4, duration: 0.22, ease: 'power4.in' }, at(5, 0.62));

// 6. the result: the finished gig page, LIVE stamp lands before the cover frame, card bumps (success)
step('#s6', T.at(6)); title('#s6', T.at(6) + 0.05); card('#s6-card', T.at(6));
late('#g-lbl', T.at(6) + 0.15);
tl.fromTo('#g-img', { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 0.35, ease: 'power3.out' }, T.at(6) + 0.08);
['#g-sel', '#g-title', '#g-tabs'].forEach((id, i) => rowIn(id, T.at(6) + 0.2 + i * 0.07));
tl.fromTo('#g-live', { scale: 2.4, opacity: 0, rotation: -24 }, { scale: 1, opacity: 1, rotation: -8, duration: 0.22, ease: 'power4.in' }, T.voice(6) + 0.35);
tl.to('#s6-card', { scale: 1.03, duration: 0.15, yoyo: true, repeat: 1, ease: 'sine.inOut' }, T.voice(6) + 0.6);

// 7. the catch: weeks fill amber one by one, then Fiverr's 20% slice cuts into the order bar
step('#s7', T.at(7)); title('#s7', T.at(7) + 0.05); card('#s7-a', T.at(7) + 0.15); card('#s7-b', T.at(7) + 0.3);
late('#s7-ex', T.at(7) + 0.5);
['#w1', '#w2', '#w3', '#w4'].forEach((id, i) => {
  const t = at(7, 0.12) + i * T.beat / 2;
  tl.fromTo(id, { backgroundColor: '#F2F0EC' }, { backgroundColor: '#E8A317', duration: 0.2, ease: 'power2.out' }, t);
  tl.fromTo(id, { scale: 0.95 }, { scale: 1, duration: 0.3, ease: POP }, t);
});
late('#s7-an', at(7, 0.45));
tl.fromTo('#sp-fv', { scaleX: 0 }, { scaleX: 1, duration: 0.45, ease: 'power3.out' }, at(7, 0.7));
tl.fromTo('#sp-fvt', { opacity: 0 }, { opacity: 1, duration: 0.2, ease: 'power2.out' }, at(7, 0.7));
const fee = { v: 0 };
tl.fromTo(fee, { v: 0 }, { v: 20, duration: 0.45, ease: 'power3.out', onUpdate: () => {
  document.getElementById('sp-fvt').textContent = `${Math.round(fee.v)}%`;
  document.getElementById('sp-you').textContent = `You ${100 - Math.round(fee.v)}%`;
} }, at(7, 0.7));
tl.fromTo('#sp-fvt', { x: 0 }, { x: 6, duration: 0.05, repeat: 5, yoyo: true, ease: 'none' }, at(7, 0.7) + 0.5);
late('#s7-fee', at(7, 0.82));

// 8. send + keyword: the roommate's "next sem" bubble (ding), empty slots, G-I-G drops in, then Save.
title('#s8', T.at(8)); card('#s8-chat', T.at(8) + 0.2);
tl.fromTo('#s8-dots', { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 0.25, ease: POP }, T.voice(8) + 0.5);
tl.fromTo('#s8-dots i', { y: 0 }, { y: -10, duration: 0.15, yoyo: true, repeat: 3, stagger: 0.08, ease: 'sine.inOut' }, T.voice(8) + 0.6);
tl.to('#s8-dots', { opacity: 0, duration: 0.15, ease: 'power3.in' }, T.voice(8) + 1.25);
tl.fromTo('#s8-bub', { scale: 0.6, opacity: 0, transformOrigin: '0% 50%' }, { scale: 1, opacity: 1, duration: 0.4, ease: POP }, T.voice(8) + 1.4);
late('#s8-pill', at(8, 0.4));
tl.fromTo('#s8 .tile', { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.45, ease: OUT, stagger: 0.07 }, at(8, 0.48));
['#gk1', '#gk2', '#gk3'].forEach((id, i) => {
  const t = at(8, 0.84) + i * T.beat / 3;
  tl.fromTo(`${id} .ch`, { yPercent: -130 }, { yPercent: 0, duration: 0.4, ease: 'back.out(1.6)' }, t);
  tl.fromTo(id, { backgroundColor: 'rgba(255,255,255,0)', borderColor: 'rgba(47,91,211,0.5)' }, { backgroundColor: 'rgba(255,255,255,1)', borderColor: 'rgba(47,91,211,1)', duration: 0.25, ease: 'power2.out' }, t + 0.15);
});
tl.to('#s8-pill', { scale: 1.05, duration: 0.15, yoyo: true, repeat: 1, ease: 'sine.inOut' }, at(8, 0.84) + 0.7);
tl.fromTo('#s8-save', { x: -40, opacity: 0 }, { x: 0, opacity: 1, duration: 0.45, ease: OUT }, T.end(8) - 0.05);
tl.fromTo('#bm-p', { fill: 'rgba(47,91,211,0)' }, { fill: 'rgba(47,91,211,1)', duration: 0.3, ease: 'power2.out' }, T.end(8) + 0.35);
tl.fromTo('#bm', { scale: 0.95 }, { scale: 1, duration: 0.35, ease: POP }, T.end(8) + 0.35);
