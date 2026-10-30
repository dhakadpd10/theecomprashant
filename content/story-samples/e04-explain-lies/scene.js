// Explainer: why ChatGPT makes things up. One idea, one analogy (the phone keyboard), diagrams that build one piece at a time.
// Motion system (docs/EXPLAINER.md): enters expo.out 0.5 s, pops back.out 0.4 s, exits power2.in 0.25 s, stagger 0.07 s,
// anticipation on every chip, labels settle a beat after their card (follow-through), slow ambient orbs behind it all.
const OUT = 'expo.out', POP = 'back.out(1.7)';
const span = (n) => T.end(n) - T.voice(n);
const title = (s, t) => tl.fromTo(`${s} .title .l`, { yPercent: 110 }, { yPercent: 0, duration: 0.55, ease: OUT, stagger: 0.09 }, t);
const card = (id, t) => tl.fromTo(id, { y: 120, opacity: 0, scale: 0.96 }, { y: 0, opacity: 1, scale: 1, duration: 0.6, ease: OUT }, t);
const step = (s, t) => tl.fromTo(`${s} .step`, { x: -40, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4, ease: OUT }, t);
const late = (id, t) => tl.fromTo(id, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.35, ease: OUT }, t); // follow-through labels
const chip = (id, t) => { // anticipation dip, then the pop
  tl.fromTo(id, { scale: 0, opacity: 0 }, { scale: 1.12, opacity: 1, duration: 0.22, ease: 'power2.out' }, t);
  tl.to(id, { scale: 1, duration: 0.18, ease: 'power2.inOut' }, t + 0.22);
};
const bar = (sel, t, d = 0.6) => tl.fromTo(sel, { scaleX: 0 }, { scaleX: 1, duration: d, ease: 'power3.out' }, t);
const count = (id, to, t, d = 0.6) => { const o = { v: 0 }; tl.fromTo(o, { v: 0 }, { v: to, duration: d, ease: 'power3.out', onUpdate: () => { document.getElementById(id).textContent = `${Math.round(o.v)}%`; } }, t); };
const shake = (id, t, px = 8) => tl.fromTo(id, { x: 0 }, { x: px, duration: 0.05, repeat: 5, yoyo: true, ease: 'none' }, t);

// ambient layer: two soft orbs drift for the whole reel
tl.fromTo('#orb1', { x: 0, y: 0 }, { x: 160, y: -120, duration: T.dur, ease: 'sine.inOut' }, 0);
tl.fromTo('#orb2', { x: 0, y: 0 }, { x: -180, y: -160, duration: T.dur, ease: 'sine.inOut' }, 0);

// progress bar
tl.set(['#p1', '#p2', '#p3', '#p4', '#p5', '#p6', '#p7'], { scaleX: 0 }, 0);
[1, 2, 3, 4, 5, 6, 7].forEach((n) => tl.to(`#p${n}`, { scaleX: 1, duration: 0.5, ease: 'power2.out' }, T.at(n)));

// 0. hook: the claim is on screen at frame 0, the red squiggle draws under "up." as the voice says it
tl.fromTo('#s0-title .l', { yPercent: 0 }, { yPercent: 0, duration: 0.01 }, 0);
tl.fromTo('#s0-title', { scale: 1.08 }, { scale: 1, duration: 0.7, ease: OUT }, 0);
tl.fromTo('#s0-step', { opacity: 0.6 }, { opacity: 1, duration: 0.3 }, 0);
tl.fromTo('#squig-p', { strokeDashoffset: 420 }, { strokeDashoffset: 0, duration: 0.6, ease: 'power2.out' }, T.voice(0) + 0.35);

// 1. it doesn't look anything up: the search bar gets struck out, then NO / YES
step('#s1', T.at(1)); title('#s1', T.at(1) + 0.05); card('#s1-card', T.at(1) + 0.15);
tl.fromTo('#strike', { scaleX: 0 }, { scaleX: 1, duration: 0.35, ease: 'power3.in' }, T.voice(1) + 0.25 * span(1));
['#r1', '#r2'].forEach((id, i) => tl.fromTo(id, { x: 60, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4, ease: OUT }, T.voice(1) + (0.4 + i * 0.12) * span(1)));
chip('#c1', T.voice(1) + 0.5 * span(1)); chip('#c2', T.voice(1) + 0.68 * span(1));
late('#s1-note', T.voice(1) + 0.8 * span(1));

// 2. the analogy: typing, three suggestions, their odds, the top one wins
step('#s2', T.at(2)); title('#s2', T.at(2) + 0.05); card('#s2-card', T.at(2) + 0.15);
tl.fromTo('#typed-a', { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 0.6, ease: 'steps(16)' }, T.at(2) + 0.4);
tl.set('#typed-b', { opacity: 0, scale: 0.5 }, 0);
tl.fromTo('#caret', { opacity: 1 }, { opacity: 0, duration: 0.3, repeat: 7, yoyo: true, ease: 'steps(1)' }, T.at(2) + 0.4);
['#g1', '#g2', '#g3'].forEach((id, i) => chip(id, T.voice(2) + 0.15 + i * 0.07));
[['#q1', 'n1', 62], ['#q2', 'n2', 21], ['#q3', 'n3', 9]].forEach(([q, n, v], i) => {
  const t = T.voice(2) + 0.3 * span(2) + i * 0.07;
  tl.fromTo(q, { opacity: 0 }, { opacity: 1, duration: 0.25 }, t);
  bar(`${q} .fill`, t + 0.05); count(n, v, t + 0.05);
});
tl.to('#g1', { backgroundColor: '#3D5AFE', color: '#FFFFFF', duration: 0.2, ease: 'power2.out' }, T.voice(2) + 0.7 * span(2));
tl.fromTo('#g1', { scale: 1 }, { scale: 1.12, duration: 0.15, yoyo: true, repeat: 1, ease: 'sine.inOut' }, T.voice(2) + 0.7 * span(2));
tl.fromTo('#typed-b', { opacity: 0, scale: 0.5 }, { opacity: 1, scale: 1, duration: 0.35, ease: POP }, T.voice(2) + 0.78 * span(2));
late('#s2-note', T.voice(2) + 0.85 * span(2));

// 3. likely isn't true: the sure answer, then the weak guesses said just as boldly, then the stamp
step('#s3', T.at(3)); title('#s3', T.at(3) + 0.05); card('#s3-a', T.at(3) + 0.15); card('#s3-b', T.at(3) + 0.3);
bar('#ca .fill', T.at(3) + 0.5, 0.7); late('#s3-note', T.at(3) + 0.9);
['#cb1', '#cb2', '#cb3'].forEach((id, i) => { tl.fromTo(id, { opacity: 0, x: 40 }, { opacity: 1, x: 0, duration: 0.3, ease: OUT }, T.voice(3) + 0.15 + i * 0.07); bar(`${id} .fill`, T.voice(3) + 0.2 + i * 0.07, 0.5); });
tl.fromTo('#said', { opacity: 0, y: 30, scale: 0.9 }, { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: POP }, T.voice(3) + 0.8);
tl.fromTo('#stamp3', { scale: 2.4, opacity: 0, rotation: -22 }, { scale: 1, opacity: 1, rotation: -10, duration: 0.22, ease: 'power4.in' }, T.voice(3) + 1.0);
shake('#s3-b', T.voice(3) + 1.22, 10);

// 4. the fix: the prompt types in line by line, the key line in blue, the send button breathes
step('#s4', T.at(4)); title('#s4', T.at(4) + 0.05); card('#s4-card', T.at(4) + 0.15); late('#s4-head', T.at(4) + 0.45);
['#l1', '#l2', '#l3', '#l4'].forEach((id, i) => tl.fromTo(id, { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 0.45, ease: 'steps(14)' }, T.voice(4) + 0.3 * span(4) + i * 0.45));
chip('#send-btn', T.voice(4) + 0.3 * span(4) + 1.9);
tl.to('#send-btn', { scale: 1.06, duration: 0.3, yoyo: true, repeat: 1, ease: 'sine.inOut' }, T.end(4) - 0.6);

// 5. the result: two SURE rows land, the UNSURE row arrives last and wobbles (the payoff)
step('#s5', T.at(5)); title('#s5', T.at(5) + 0.05); card('#s5-card', T.at(5) + 0.15);
['#a1', '#a2', '#a3'].forEach((id, i) => tl.fromTo(id, { x: 70, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4, ease: OUT }, T.voice(5) + 0.2 + i * 0.3 * span(5)));
tl.fromTo('#u3', { rotation: 0 }, { rotation: 6, duration: 0.08, repeat: 5, yoyo: true, ease: 'sine.inOut' }, T.voice(5) + 0.2 + 0.6 * span(5) + 0.35);
late('#s5-note', T.voice(5) + 0.85 * span(5));

// 6. the catch: three CHECK chips stamp in, one per beat
step('#s6', T.at(6)); title('#s6', T.at(6) + 0.05); card('#s6-card', T.at(6) + 0.15);
['#k1', '#k2', '#k3'].forEach((id, i) => tl.fromTo(id, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.35, ease: OUT }, T.voice(6) + 0.15 + i * T.beat / 2));
['#h1', '#h2', '#h3'].forEach((id, i) => chip(id, T.voice(6) + 0.35 + i * T.beat / 2));

// 7. send this: the plane flies in on an arc, then the quiet keyword card
tl.fromTo('#send', { yPercent: 40, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.6, ease: OUT }, T.at(7));
tl.fromTo('#plane', { x: -260, opacity: 0, rotation: -20 }, { x: 0, opacity: 1, rotation: 0, duration: 0.7, ease: 'power2.out' }, T.at(7) + 0.25);
tl.fromTo('#plane', { y: 140 }, { y: 0, duration: 0.7, ease: 'back.out(2)' }, T.at(7) + 0.25);
late('#who', T.voice(7) + 0.3);
tl.fromTo('#pill', { scale: 0.6, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.45, ease: POP }, T.voice(7) + 0.55 * span(7));
tl.to('#plane', { x: 30, y: -20, duration: 0.8, yoyo: true, repeat: 1, ease: 'sine.inOut' }, T.end(7));
