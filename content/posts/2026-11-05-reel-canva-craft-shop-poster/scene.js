// Tool reel: Canva's poster AI that gets the words right. Analogy: a signboard painter pencils the letters, then paints.
// Check before this posts: "Canva Craft", "Canva Brush" and the free vs Pro split come from the script, but the free
// tool's description names Canva's Dream Lab. Confirm the names and plans on Canva's own site. The picture only repeats the script.
const OUT = 'expo.out', POP = 'back.out(1.8)';
const span = (n) => T.end(n) - T.voice(n);
const at = (n, f) => T.voice(n) + f * span(n);
const title = (s, t) => tl.fromTo(`${s} .title .l`, { yPercent: 110 }, { yPercent: 0, duration: 0.55, ease: OUT, stagger: 0.08 }, t);
const step = (s, t) => tl.fromTo(`${s} .step`, { x: -40, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4, ease: OUT }, t);
const beat = (n, s) => { step(s, T.at(n)); title(s, T.at(n) + 0.05); };
const card = (id, t) => tl.fromTo(id, { y: 110, opacity: 0, scale: 0.96 }, { y: 0, opacity: 1, scale: 1, duration: 0.6, ease: OUT }, t);
const late = (id, t) => tl.fromTo(id, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.35, ease: OUT }, t);
const row = (id, t) => tl.fromTo(id, { x: 60, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4, ease: OUT }, t);
const chip = (id, t) => {
  tl.fromTo(id, { scale: 0, opacity: 0 }, { scale: 1.12, opacity: 1, duration: 0.22, ease: 'power2.out' }, t);
  tl.to(id, { scale: 1, duration: 0.18, ease: 'power2.inOut' }, t + 0.22);
};
const bump = (id, t, s = 1.05) => tl.fromTo(id, { scale: 1 }, { scale: s, duration: 0.15, yoyo: true, repeat: 1, ease: 'sine.inOut' }, t);
const shake = (id, t, px = 8) => tl.fromTo(id, { x: 0 }, { x: px, duration: 0.05, repeat: 5, yoyo: true, ease: 'none' }, t);

// ambient layer: two soft orbs drift for the whole reel
tl.fromTo('#orb1', { x: 0, y: 0 }, { x: 160, y: -120, duration: T.dur, ease: 'sine.inOut' }, 0);
tl.fromTo('#orb2', { x: 0, y: 0 }, { x: -180, y: -160, duration: T.dur, ease: 'sine.inOut' }, 0);

// progress bar: one segment per beat after the hook
const segs = ['#p1', '#p2', '#p3', '#p4', '#p5', '#p6', '#p7', '#p8'];
tl.set(segs, { scaleX: 0 }, 0);
segs.forEach((id, i) => tl.to(id, { scaleX: 1, duration: 0.5, ease: 'power2.out' }, T.at(i + 1)));

// 0. hook: title and both signs on screen at frame 0; the cardboard wobbles, the poster lands
tl.fromTo('#s0-title .l', { yPercent: 0 }, { yPercent: 0, duration: 0.01 }, 0);
tl.fromTo('#s0-title', { scale: 1.06 }, { scale: 1, duration: 0.7, ease: OUT }, 0);
tl.fromTo('#s0-card', { scale: 1.04 }, { scale: 1, duration: 0.6, ease: OUT }, 0);
tl.fromTo('#s0-card', { rotation: 0 }, { rotation: -4, duration: 0.08, repeat: 5, yoyo: true, ease: 'sine.inOut' }, at(0, 0.42));
tl.fromTo('#s0-card', { opacity: 1 }, { opacity: 0.6, duration: 0.3, ease: 'power2.out' }, at(0, 0.75));
bump('#s0-post', at(0, 0.75), 1.1);
bump('#s0-after', at(0, 0.75) + 0.08, 1.15);

// 1. the problem: a typical AI image, the right word vs what it drew, the red ring on the typo
beat(1, '#s1'); card('#s1-card', T.at(1) + 0.15); late('#s1-note', T.at(1) + 0.5);
row('#s1-r1', T.voice(1) + 0.45); chip('#s1-c1', T.voice(1) + 0.55);
row('#s1-r2', T.voice(1) + 0.85); chip('#s1-c2', T.voice(1) + 1.0);
shake('#s1-img', T.voice(1) + 1.0, 9);
tl.fromTo('#s1-ring-p', { strokeDashoffset: 900 }, { strokeDashoffset: 0, duration: 0.5, ease: 'power2.out' }, at(1, 0.75));

// 2. the analogy: a pencil traces the letters on a signboard, then the two-step rule
beat(2, '#s2'); card('#s2-card', T.at(2) + 0.15); late('#s2-note', T.at(2) + 0.5);
const w2 = T.voice(2) + 0.45;
tl.fromTo('#s2-word', { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 1.3, ease: 'power1.inOut' }, w2);
tl.fromTo('#s2-pencil', { opacity: 0 }, { opacity: 1, duration: 0.2, ease: 'power2.out' }, w2 - 0.1);
tl.fromTo('#s2-pencil', { x: -68 }, { x: 508, duration: 1.3, ease: 'power1.inOut' }, w2);
tl.to('#s2-pencil', { opacity: 0, duration: 0.25, ease: 'power3.in' }, w2 + 1.3);
row('#s2-r1', at(2, 0.55)); chip('#s2-c1', at(2, 0.55) + 0.12);
row('#s2-r2', at(2, 0.72)); chip('#s2-c2', at(2, 0.72) + 0.12);

// 3. how it works: layout boxes pop, the words pencil in, then the brush paints the poster
beat(3, '#s3'); card('#s3-card', T.at(3) + 0.15);
const pillOn = (id, t) => tl.fromTo(id, { backgroundColor: '#EFEEEA', color: '#1E1A16' }, { backgroundColor: '#2B4BD8', color: '#FFFFFF', duration: 0.25, ease: 'power2.out' }, t);
const t1 = T.voice(3) + 0.8, t2 = at(3, 0.42), t3 = at(3, 0.68);
pillOn('#s3-k1', t1);
tl.fromTo('#s3 .wf', { scale: 0.6, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: POP, stagger: 0.06 }, t1);
pillOn('#s3-k2', t2);
tl.fromTo('#s3 .pc', { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 0.4, ease: 'power2.out', stagger: 0.08 }, t2);
pillOn('#s3-k3', t3);
tl.fromTo('#s3-paint', { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 0.7, ease: 'power2.inOut' }, t3);
tl.fromTo('#s3-brush', { opacity: 0 }, { opacity: 1, duration: 0.1, ease: 'power2.out' }, t3);
tl.fromTo('#s3-brush', { x: 0 }, { x: 820, duration: 0.7, ease: 'power2.inOut' }, t3);
tl.to('#s3-brush', { opacity: 0, duration: 0.2, ease: 'power3.in' }, t3 + 0.62);

// 4. the result (payoff, cooker whistles): the finished poster bumps on the ding, price lands, spelled right
beat(4, '#s4'); card('#s4-card', T.at(4) + 0.1);
bump('#s4-poster', T.voice(4) + 0.4, 1.05);
chip('#s4-price', T.voice(4) + 0.5);
row('#s4-r1', at(4, 0.58)); chip('#s4-c1', at(4, 0.72));
late('#s4-note', at(4, 0.85));

// 5. every Canva user: shop poster and tuition poster, each lifts as the voice names it
beat(5, '#s5'); card('#s5-card', T.at(5) + 0.15);
tl.fromTo('#s5-a', { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.45, ease: OUT }, T.at(5) + 0.4);
tl.fromTo('#s5-b', { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.45, ease: OUT }, T.at(5) + 0.47);
late('#s5-la', T.at(5) + 0.7); late('#s5-lb', T.at(5) + 0.76);
row('#s5-r1', at(5, 0.32)); chip('#s5-c1', at(5, 0.4));
late('#s5-note', at(5, 0.5));
bump('#s5-a', at(5, 0.62), 1.06);
bump('#s5-b', at(5, 0.86), 1.06);

// 6. the catch: stamp slams on the thud, a scan box checks each letter, CHECK chips pop
beat(6, '#s6'); card('#s6-card', T.at(6) + 0.1); late('#s6-note', T.at(6) + 0.4);
tl.fromTo('#s6 .lt', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.35, ease: OUT, stagger: 0.05 }, T.at(6) + 0.2);
row('#s6-r1', T.at(6) + 0.3); row('#s6-r2', T.at(6) + 0.37);
tl.fromTo('#s6-stamp', { scale: 2.4, opacity: 0, rotation: -20 }, { scale: 1, opacity: 1, rotation: -8, duration: 0.24, ease: 'power4.in' }, T.voice(6) + 0.26);
shake('#s6-card', T.voice(6) + 0.5, 6);
const sc = T.voice(6) + 0.7;
tl.fromTo('#s6-scan', { opacity: 0 }, { opacity: 1, duration: 0.15, ease: 'power2.out' }, sc);
tl.fromTo('#s6-scan', { x: 0 }, { x: 490, duration: 1.1, ease: 'none' }, sc);
['#s6-l1', '#s6-l2', '#s6-l3', '#s6-l4', '#s6-l5', '#s6-l6'].forEach((id, i) =>
  tl.fromTo(id, { backgroundColor: '#F6F5F2' }, { backgroundColor: '#DDF1E4', duration: 0.15, ease: 'power2.out' }, sc + 0.05 + i * 0.22));
chip('#s6-c1', T.voice(6) + 1.6); chip('#s6-c2', T.voice(6) + 1.8);

// 7. second catch: Craft is free, Brush is Pro; the locked edit button shakes on "isn't free"
beat(7, '#s7'); card('#s7-card', T.at(7) + 0.15); late('#s7-note', T.at(7) + 0.45);
row('#s7-t1', T.at(7) + 0.35); chip('#s7-c1', T.at(7) + 0.5);
row('#s7-t2', at(7, 0.2));
tl.fromTo('#s7-btn', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: OUT }, at(7, 0.42));
shake('#s7-btn', at(7, 0.55), 7);
chip('#s7-c2', at(7, 0.78));
late('#s7-pro', at(7, 0.86));

// 8. send, then the keyword drops in letter by letter, pops again as it is spoken, save pill last
tl.fromTo('#s8-send .l', { yPercent: 110 }, { yPercent: 0, duration: 0.6, ease: OUT }, T.at(8));
late('#s8-who', T.voice(8) + 0.4);
const c8 = at(8, 0.28);
card('#s8-card', c8);
tl.fromTo('#s8-av', { scale: 0 }, { scale: 1, duration: 0.4, ease: POP }, c8 + 0.25);
late('#s8-cm', c8 + 0.3);
tl.fromTo('#s8 .k', { y: -140, opacity: 0 }, { y: 0, opacity: 1, duration: 0.45, ease: 'back.out(1.6)', stagger: 0.12 }, c8 + 0.45);
chip('#s8-free', at(8, 0.55));
late('#s8-dm', at(8, 0.62));
tl.fromTo('#s8-pill', { scale: 0.6, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.45, ease: POP }, at(8, 0.78));
tl.fromTo('#s8 .k', { scale: 1 }, { scale: 1.14, duration: 0.14, yoyo: true, repeat: 1, ease: 'sine.inOut', stagger: 0.04 }, at(8, 0.86));
bump('#s8-card', T.end(8) + 0.3, 1.04);
