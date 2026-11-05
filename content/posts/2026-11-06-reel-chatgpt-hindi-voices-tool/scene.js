// Tool reel: ChatGPT voice mode's two Hindi voices. One analogy (calling the cousin who knows everything),
// one screen per beat, the finished spoken reply on the payoff beat, then the catch and the starter-card preview.
// Motion: enters expo.out 0.5 s, pops back.out, slam power4.in, stagger 0.07 s, labels settle late, waveforms as texture.
const OUT = 'expo.out', POP = 'back.out(1.7)';
const span = (n) => T.end(n) - T.voice(n);
const at = (n, f) => T.voice(n) + f * span(n);
const title = (s, t) => tl.fromTo(`${s} .title .l`, { yPercent: 110 }, { yPercent: 0, duration: 0.55, ease: OUT, stagger: 0.08 }, t);
const step = (s, t) => tl.fromTo(`${s} .step`, { x: -40, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4, ease: OUT }, t);
const card = (id, t) => tl.fromTo(id, { y: 120, opacity: 0, scale: 0.96 }, { y: 0, opacity: 1, scale: 1, duration: 0.6, ease: OUT }, t);
const late = (id, t) => tl.fromTo(id, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.35, ease: OUT }, t);
const slide = (id, t, dx = 60) => tl.fromTo(id, { x: dx, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4, ease: OUT }, t);
const chip = (id, t) => {
  tl.fromTo(id, { scale: 0, opacity: 0 }, { scale: 1.12, opacity: 1, duration: 0.22, ease: 'power2.out' }, t);
  tl.to(id, { scale: 1, duration: 0.18, ease: 'power2.inOut' }, t + 0.22);
};
const wipe = (id, t, d, n) => tl.fromTo(id, { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: d, ease: `steps(${n})` }, t);
const shake = (id, t, px = 8) => tl.fromTo(id, { x: 0 }, { x: px, duration: 0.05, repeat: 5, yoyo: true, ease: 'none' }, t);
const waves = (ids, t0, t1, seed, lo = 0.2) => {
  const r = T.rand(seed);
  ids.forEach((id) => {
    const d = 0.18 + r() * 0.2;
    const reps = Math.max(1, Math.round((t1 - t0) / d) - 1);
    tl.fromTo(id, { scaleY: lo + r() * 0.2 }, { scaleY: 0.6 + r() * 0.4, duration: d, repeat: reps, yoyo: true, ease: 'sine.inOut' }, t0 + r() * 0.12);
  });
};
const ids = (pre, n) => Array.from({ length: n }, (_, i) => `#${pre}${i}`);

// ambient layer
tl.fromTo('#orb1', { x: 0, y: 0 }, { x: 170, y: -120, duration: T.dur, ease: 'sine.inOut' }, 0);
tl.fromTo('#orb2', { x: 0, y: 0 }, { x: -180, y: -150, duration: T.dur, ease: 'sine.inOut' }, 0);

// progress bar: one segment per beat after the hook
tl.set(['#p1', '#p2', '#p3', '#p4', '#p5', '#p6', '#p7'], { scaleX: 0 }, 0);
[1, 2, 3, 4, 5, 6, 7].forEach((n) => tl.to(`#p${n}`, { scaleX: 1, duration: 0.5, ease: 'power2.out' }, T.at(n)));

// 0. hook: title and both voice chips on screen at frame 0; chips bump on the thud, squiggle under "mummy."
tl.fromTo('#s0-title', { scale: 1.06 }, { scale: 1, duration: 0.7, ease: OUT }, 0);
tl.fromTo('#s0-step', { opacity: 0.6 }, { opacity: 1, duration: 0.3 }, 0);
waves([...ids('s0-a', 4), ...ids('s0-b', 4)], 0, T.end(0), 11, 0.3);
tl.to(['#s0-neer', '#s0-leher'], { scale: 1.12, duration: 0.12, yoyo: true, repeat: 1, ease: 'power2.out' }, T.voice(0) + 0.6);
tl.fromTo('#s0-neer', { y: 0 }, { y: -14, duration: 1.2, yoyo: true, repeat: 2, ease: 'sine.inOut' }, 0.2);
tl.fromTo('#s0-leher', { y: 0 }, { y: -14, duration: 1.2, yoyo: true, repeat: 2, ease: 'sine.inOut' }, 0.5);
tl.fromTo('#squig-p', { strokeDashoffset: 420 }, { strokeDashoffset: 0, duration: 0.6, ease: 'power2.out' }, at(0, 0.78));

// 1. who it's for: English gets struck out, then the family rows land with HINDI chips
step('#s1', T.at(1)); title('#s1', T.at(1) + 0.05); card('#s1-card', T.at(1) + 0.15);
late('#s1-note', T.at(1) + 0.5);
slide('#r1', at(1, 0.1)); chip('#c1', at(1, 0.1) + 0.12);
tl.fromTo('#s1-strike', { scaleX: 0 }, { scaleX: 1, duration: 0.3, ease: 'power3.in' }, at(1, 0.4));
chip('#s1-ec', at(1, 0.48));
slide('#r2', at(1, 0.72)); chip('#c2', at(1, 0.72) + 0.12);
slide('#r3', at(1, 0.82)); chip('#c3', at(1, 0.82) + 0.12);

// 2. the analogy: the cousin's call rings, connects, the timer runs, "Haan, bolo?"
step('#s2', T.at(2)); title('#s2', T.at(2) + 0.05); card('#s2-card', T.at(2) + 0.15);
chip('#s2-av', T.at(2) + 0.35);
tl.fromTo('#ring1', { scale: 1, opacity: 0.6 }, { scale: 1.5, opacity: 0, duration: 0.9, repeat: 2, ease: 'power2.out' }, T.at(2) + 0.4);
tl.fromTo('#ring2', { scale: 1, opacity: 0.6 }, { scale: 1.5, opacity: 0, duration: 0.9, repeat: 2, ease: 'power2.out' }, T.at(2) + 0.85);
late('#s2-name', T.at(2) + 0.45); late('#s2-sub', T.at(2) + 0.52); late('#s2-time', T.at(2) + 0.58);
chip('#s2-end', T.at(2) + 0.65);
tl.fromTo('#s2-av', { rotation: 0 }, { rotation: 6, duration: 0.07, repeat: 5, yoyo: true, ease: 'sine.inOut' }, at(2, 0.3));
const clock = { v: 0 };
tl.fromTo(clock, { v: 0 }, { v: 3.9, duration: span(2) * 0.6, ease: 'none', onUpdate: () => { document.getElementById('s2-time').textContent = `00:0${Math.min(9, Math.floor(clock.v))}`; } }, at(2, 0.4));
tl.fromTo('#s2-bub', { scale: 0.6, opacity: 0, y: 30 }, { scale: 1, opacity: 1, y: 0, duration: 0.45, ease: POP }, at(2, 0.75));

// 3. step 1: voice mode button presses on the click, the two voices list, Neer gets selected
step('#s3', T.at(3)); title('#s3', T.at(3) + 0.05); card('#s3-card', T.at(3) + 0.15);
slide('#vm', T.at(3) + 0.35);
tl.fromTo('#vm-btn', { scale: 1 }, { scale: 0.88, duration: 0.1, ease: 'power2.in' }, T.voice(3) + 1.1);
tl.to('#vm-btn', { scale: 1, duration: 0.35, ease: POP }, T.voice(3) + 1.2);
chip('#vm-on', T.voice(3) + 1.22);
late('#s3-pick', at(3, 0.4));
slide('#v1', at(3, 0.45)); slide('#v2', at(3, 0.45) + 0.07);
chip('#v1c', at(3, 0.5)); chip('#v2c', at(3, 0.5) + 0.07);
tl.fromTo('#v1', { backgroundColor: '#F7F4EE', borderColor: 'rgba(46,75,198,0)' }, { backgroundColor: '#EEF1FF', borderColor: 'rgba(46,75,198,1)', duration: 0.25, ease: 'power2.out' }, at(3, 0.72));
tl.fromTo('#d1', { scale: 0 }, { scale: 1, duration: 0.35, ease: POP }, at(3, 0.72));
tl.to('#v1', { scale: 1.03, duration: 0.12, yoyo: true, repeat: 1, ease: 'sine.inOut' }, at(3, 0.72) + 0.05);
late('#s3-foot', at(3, 0.85));

// 4. step 2: it listens, the Hindi question types into the bubble, the meaning settles under it
step('#s4', T.at(4)); title('#s4', T.at(4) + 0.05); card('#s4-card', T.at(4) + 0.15);
waves(ids('s4-w', 15), T.at(4) + 0.3, T.end(4), 29, 0.15);
tl.fromTo('#ask', { y: 40, opacity: 0, scale: 0.92 }, { y: 0, opacity: 1, scale: 1, duration: 0.45, ease: OUT }, T.at(4) + 0.35);
wipe('#q1', at(4, 0.12), 0.9, 20);
wipe('#q2', at(4, 0.48), 1.0, 22);
late('#mean', at(4, 0.8));
tl.to('#ask', { scale: 1.04, duration: 0.1, yoyo: true, repeat: 1, ease: 'power2.out' }, T.end(4) - 0.15);

// 5. the payoff: the speaker pulses, the spoken Hindi reply fills in, OUT LOUD and HINDI chips land
step('#s5', T.at(5)); title('#s5', T.at(5) + 0.05); card('#s5-card', T.at(5) + 0.15);
chip('#spk', T.at(5) + 0.3);
tl.fromTo('#spk-ring', { scale: 1, opacity: 0.7 }, { scale: 1.6, opacity: 0, duration: 0.8, repeat: 2, ease: 'power2.out' }, T.at(5) + 0.4);
late('#s5-name', T.at(5) + 0.4); late('#s5-st', T.at(5) + 0.47);
waves(ids('s5-w', 7), T.at(5) + 0.35, T.end(5) + 0.1, 41, 0.2);
tl.fromTo('#reply', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: OUT }, T.at(5) + 0.35);
wipe('#y1', at(5, 0.08), 0.5, 18);
wipe('#y2', at(5, 0.3), 0.5, 18);
wipe('#y3', at(5, 0.52), 0.5, 18);
chip('#o1', at(5, 0.6)); chip('#o2', at(5, 0.84));
late('#s5-note', at(5, 0.9));

// 6. the catch: Pure Hindi works, Hinglish slams in on the buzz and shakes, the voice picker is glitchy
step('#s6', T.at(6)); title('#s6', T.at(6) + 0.05); card('#s6-card', T.at(6) + 0.15);
tl.fromTo('#k1', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.35, ease: OUT }, T.at(6) + 0.35);
chip('#h1', T.at(6) + 0.5);
tl.fromTo('#k2', { y: -30, opacity: 0, scale: 1.15 }, { y: 0, opacity: 1, scale: 1, duration: 0.22, ease: 'power4.in' }, T.voice(6) + 0.6);
shake('#k2', T.voice(6) + 0.82, 9);
chip('#h2', at(6, 0.42));
tl.fromTo('#k3', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.35, ease: OUT }, at(6, 0.62));
chip('#h3', at(6, 0.72));
tl.fromTo('#h3', { rotation: 0 }, { rotation: 5, duration: 0.08, repeat: 5, yoyo: true, ease: 'sine.inOut' }, at(6, 0.72) + 0.45);
late('#s6-note', at(6, 0.86));

// 7. send + keyword: the starter card's contents tick in, then BOLO drops in letter by letter on the beat
tl.fromTo('#s7-send', { yPercent: 40, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.6, ease: OUT }, T.at(7));
late('#s7-who', T.voice(7) + 0.3);
card('#s7-card', T.at(7) + 0.3);
late('#s7-kick', T.at(7) + 0.6); late('#s7-head', T.at(7) + 0.66);
['#t1', '#t2', '#t3'].forEach((id, i) => slide(id, T.voice(7) + 0.7 + i * 0.3, 50));
['#ok1', '#ok2', '#ok3'].forEach((id, i) => chip(id, T.voice(7) + 0.85 + i * 0.3));
const pillT = at(7, 0.68);
tl.fromTo('#pill', { scale: 0.6, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.45, ease: POP }, pillT);
['#b1', '#b2', '#b3', '#b4'].forEach((id, i) => tl.fromTo(id, { y: -110, opacity: 0, rotation: -12 }, { y: 0, opacity: 1, rotation: 0, duration: 0.4, ease: 'back.out(2)' }, pillT + 0.15 + i * T.beat / 2));
tl.to('#pill', { scale: 1.05, duration: 0.6, yoyo: true, repeat: 1, ease: 'sine.inOut' }, T.end(7));
