// Tool reel, ranked list: 3 free AI tools already on your phone, #1 Google Lens translates the words on a photo.
// Motion: enters expo.out 0.5 s, pops back.out, slams power4.in, stagger 0.07 s, labels settle late, orbs drift all reel.
const OUT = 'expo.out', POP = 'back.out(1.8)';
const span = (n) => T.end(n) - T.voice(n);
const title = (s, t) => tl.fromTo(`${s} .title .l`, { yPercent: 110 }, { yPercent: 0, duration: 0.55, ease: OUT, stagger: 0.09 }, t);
const card = (id, t) => tl.fromTo(id, { y: 120, opacity: 0, scale: 0.96 }, { y: 0, opacity: 1, scale: 1, duration: 0.6, ease: OUT }, t);
const step = (s, t) => tl.fromTo(`${s} .step`, { x: -40, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4, ease: OUT }, t);
const late = (id, t) => tl.fromTo(id, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.35, ease: OUT }, t);
const chip = (id, t) => {
  tl.fromTo(id, { scale: 0, opacity: 0 }, { scale: 1.12, opacity: 1, duration: 0.22, ease: 'power2.out' }, t);
  tl.to(id, { scale: 1, duration: 0.18, ease: 'power2.inOut' }, t + 0.22);
};
const slide = (id, t) => tl.fromTo(id, { x: 70, opacity: 0 }, { x: 0, opacity: 1, duration: 0.42, ease: OUT }, t);
const shake = (id, t, px = 8) => tl.fromTo(id, { x: 0 }, { x: px, duration: 0.05, repeat: 5, yoyo: true, ease: 'none' }, t);
const bump = (id, t, s = 1.06) => tl.fromTo(id, { scale: 1 }, { scale: s, duration: 0.15, repeat: 1, yoyo: true, ease: 'sine.inOut' }, t);

// ambient: two soft orbs drift the whole reel
tl.fromTo('#orb1', { x: 0, y: 0 }, { x: 170, y: -120, duration: T.dur, ease: 'sine.inOut' }, 0);
tl.fromTo('#orb2', { x: 0, y: 0 }, { x: -180, y: -150, duration: T.dur, ease: 'sine.inOut' }, 0);

// progress bar, one segment per beat after the hook
tl.set(['#p1', '#p2', '#p3', '#p4', '#p5', '#p6', '#p7'], { scaleX: 0 }, 0);
[1, 2, 3, 4, 5, 6, 7].forEach((n) => tl.to(`#p${n}`, { scaleX: 1, duration: 0.5, ease: 'power2.out' }, T.at(n)));

// 0. hook: "3 free AI tools." is on screen at frame 0, underline draws, "#1 WINS" slams on the thud
tl.fromTo('#s0-title .l', { yPercent: 0 }, { yPercent: 0, duration: 0.01 }, 0);
tl.fromTo('#s0-title', { scale: 1.06 }, { scale: 1, duration: 0.7, ease: OUT }, 0);
tl.fromTo('#s0-step', { opacity: 0.6 }, { opacity: 1, duration: 0.3 }, 0);
tl.fromTo('#s0-ul-p', { strokeDashoffset: 300 }, { strokeDashoffset: 0, duration: 0.5, ease: 'power2.out' }, T.voice(0) + 0.2);
tl.fromTo('#s0-tag', { scale: 2.3, opacity: 0, rotation: -20 }, { scale: 1, opacity: 1, rotation: 6, duration: 0.25, ease: 'power4.in' }, T.voice(0) + 0.25);
bump('#s0-tag', T.voice(0) + 0.85 * span(0), 1.1);

// 1. the analogy: a friend contact holding all three tools, FREE chips, "last called: never"
step('#s1', T.at(1)); title('#s1', T.at(1) + 0.05); card('#s1-card', T.at(1) + 0.15);
tl.fromTo('#s1-av', { scale: 0.6, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.45, ease: POP }, T.at(1) + 0.35);
late('#s1-name', T.at(1) + 0.45); late('#s1-sub', T.at(1) + 0.52);
['#f1', '#f2', '#f3'].forEach((id, i) => slide(id, T.at(1) + 0.5 + i * 0.07));
['#fc1', '#fc2', '#fc3'].forEach((id, i) => chip(id, T.at(1) + 0.8 + i * 0.08));
late('#s1-note', T.voice(1) + 0.78 * span(1));
shake('#s1-note', T.voice(1) + 0.78 * span(1) + 0.35, 6);

// 2. #3 Gemini: question, answer, then the mic and voice wave for "talking"
step('#s2', T.at(2)); title('#s2', T.at(2) + 0.05); card('#s2-card', T.at(2) + 0.15);
late('#s2-head', T.at(2) + 0.45);
tl.fromTo('#s2-in', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.4, ease: OUT }, T.at(2) + 0.35);
tl.fromTo('#s2-q', { scale: 0.7, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: POP }, T.voice(2) + 0.3 * span(2));
tl.fromTo('#s2-a', { scale: 0.7, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: POP }, T.voice(2) + 0.52 * span(2));
chip('#s2-mic', T.voice(2) + 0.7 * span(2));
tl.fromTo('#s2 .wv i', { scaleY: 0.35 }, { scaleY: 1, duration: 0.12, repeat: 5, yoyo: true, ease: 'sine.inOut', stagger: 0.05 }, T.voice(2) + 0.74 * span(2));
late('#s2-note', T.voice(2) + 0.85 * span(2));

// 3. #2 Circle to Search: the ring draws around the plant, the answer slides up
step('#s3', T.at(3)); title('#s3', T.at(3) + 0.05); card('#s3-card', T.at(3) + 0.15);
tl.fromTo('#s3-plant', { scale: 0.92, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.5, ease: OUT }, T.at(3) + 0.35);
tl.fromTo('#s3-ring-p', { strokeDashoffset: 1000 }, { strokeDashoffset: 0, duration: 0.7, ease: 'power2.inOut' }, T.voice(3) + 0.42 * span(3));
tl.fromTo('#s3-res', { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.42, ease: OUT }, T.voice(3) + 0.72 * span(3));
chip('#s3-chip', T.voice(3) + 0.72 * span(3) + 0.1);
late('#s3-note', T.voice(3) + 0.86 * span(3));

// 4. the winner: #3 and #2 slot in, #1 pops in on top, the star spins, "MY FAVOURITE" slams
step('#s4', T.at(4)); title('#s4', T.at(4) + 0.05); card('#s4-card', T.at(4) + 0.1);
late('#s4-head', T.at(4) + 0.4);
slide('#rk3', T.at(4) + 0.25); slide('#rk2', T.at(4) + 0.32);
tl.fromTo('#rk1', { scale: 0.85, opacity: 0, y: -30 }, { scale: 1, opacity: 1, y: 0, duration: 0.45, ease: POP }, T.voice(4) + 0.1);
tl.fromTo('#rk1-star', { scale: 0, rotation: -90 }, { scale: 1, rotation: 0, duration: 0.45, ease: POP }, T.voice(4) + 0.35);
tl.fromTo('#s4-fav', { scale: 2.2, opacity: 0, rotation: -16 }, { scale: 1, opacity: 1, rotation: -4, duration: 0.25, ease: 'power4.in' }, T.voice(4) + 0.55);
bump('#rk1-n', T.voice(4) + 0.8, 1.12);

// 5. the payoff: scan the sign, the strange script becomes words you can read, on the photo
step('#s5', T.at(5)); title('#s5', T.at(5) + 0.05); card('#s5-card', T.at(5) + 0.15);
late('#s5-head', T.at(5) + 0.4); late('#s5-ex', T.at(5) + 0.45);
['#tab1', '#tab2', '#tab3'].forEach((id, i) => tl.fromTo(id, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.35, ease: OUT }, T.at(5) + 0.5 + i * 0.06));
tl.fromTo(['#cn1', '#cn2', '#cn3', '#cn4'], { scale: 1.3, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.35, ease: OUT, stagger: 0.05 }, T.voice(5) + 0.15);
tl.fromTo('#s5-scan', { y: 0, opacity: 1 }, { y: 404, opacity: 1, duration: 0.9, ease: 'sine.inOut' }, T.voice(5) + 0.25);
tl.to('#s5-scan', { opacity: 0, duration: 0.2, ease: 'power3.in' }, T.voice(5) + 1.15);
tl.fromTo('#s5-tr', { opacity: 0, filter: 'blur(12px)' }, { opacity: 1, filter: 'blur(0px)', duration: 0.45, ease: OUT }, T.voice(5) + 0.45 * span(5));
chip('#s5-chip', T.voice(5) + 0.45 * span(5) + 0.25);
bump('#s5-card', T.voice(5) + 0.68 * span(5), 1.04);

// 6. the catch: three rows, amber chips land as each limit is said, a shake on "slip"
step('#s6', T.at(6)); title('#s6', T.at(6) + 0.05); card('#s6-card', T.at(6) + 0.15);
['#k1', '#k2', '#k3'].forEach((id, i) => tl.fromTo(id, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.35, ease: OUT }, T.at(6) + 0.4 + i * 0.07));
chip('#h1', T.voice(6) + 0.3 * span(6));
chip('#h2', T.voice(6) + 0.72 * span(6));
shake('#k2', T.voice(6) + 0.72 * span(6) + 0.4, 8);
chip('#h3', T.voice(6) + 0.88 * span(6));

// 7. send this, the free card's blanks draw in, then the big keyword
tl.fromTo('#send', { yPercent: 40, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.6, ease: OUT }, T.at(7));
late('#who', T.voice(7) + 0.3);
card('#s7-card', T.voice(7) + 0.2 * span(7));
late('#s7-head', T.voice(7) + 0.2 * span(7) + 0.3);
['#fl1', '#fl2'].forEach((id, i) => slide(id, T.voice(7) + 0.2 * span(7) + 0.35 + i * 0.08));
['#bl1', '#bl2'].forEach((id, i) => tl.fromTo(id, { scaleX: 0 }, { scaleX: 1, duration: 0.45, ease: 'power3.out' }, T.voice(7) + 0.2 * span(7) + 0.6 + i * 0.08));
late('#s7-foot', T.voice(7) + 0.2 * span(7) + 0.8);
tl.fromTo('#pill', { scale: 0.6, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.45, ease: POP }, T.voice(7) + 0.68 * span(7));
tl.fromTo('#kw', { yPercent: -60, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.4, ease: POP }, T.voice(7) + 0.68 * span(7) + 0.15);
bump('#pill', T.end(7), 1.06);
bump('#pill', T.end(7) + 2 * T.beat, 1.05);
