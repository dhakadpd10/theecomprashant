// Editorial theme, kind "breakdown": the weekend as a timeline. Pick a topic, draft it, the finished planner + its ₹199 listing, an example counter, the zero-sales catch, then save / send / comment.
const OUT = 'expo.out', POP = 'back.out(1.8)';
const span = (n) => T.end(n) - T.voice(n);
const at = (n, f) => T.voice(n) + f * span(n);
const title = (s, t) => tl.fromTo(`${s} .title .l`, { yPercent: 110 }, { yPercent: 0, duration: 0.55, ease: OUT, stagger: 0.08 }, t);
const step = (s, t) => tl.fromTo(`${s} .step`, { x: -40, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4, ease: OUT }, t);
const card = (id, t) => tl.fromTo(id, { y: 100, opacity: 0, scale: 0.96 }, { y: 0, opacity: 1, scale: 1, duration: 0.6, ease: OUT }, t);

// texture: two warm blobs drift across the whole reel
tl.fromTo('#blob1', { x: 0, y: 0 }, { x: 260, y: 180, duration: T.dur, ease: 'sine.inOut' }, 0);
tl.fromTo('#blob2', { x: 0, y: 0 }, { x: -240, y: -220, duration: T.dur, ease: 'sine.inOut' }, 0);

// progress bar: one segment per beat
tl.set(['#p1', '#p2', '#p3', '#p4', '#p5', '#p6'], { scaleX: 0 }, 0);
[1, 2, 3, 4, 5, 6].forEach((n) => tl.to(`#p${n}`, { scaleX: 1, duration: 0.5, ease: 'power2.out' }, T.at(n)));

// 0. hook: title and planner on screen at frame 0, "design skills" gets struck out, the planner pops on "two hundred rupees"
tl.fromTo('#s0-title .l', { yPercent: 0 }, { yPercent: 0, duration: 0.01 }, 0);
tl.fromTo('#s0-title', { scale: 1.05, transformOrigin: 'left center' }, { scale: 1, duration: 0.6, ease: OUT }, 0);
tl.fromTo('#s0-pad', { rotation: 8, scale: 1 }, { rotation: 8, scale: 1, duration: 0.01 }, 0);
tl.fromTo('#s0-strike', { scaleX: 0 }, { scaleX: 1, duration: 0.35, ease: 'power3.out' }, at(0, 0.3));
const padT = at(0, 0.72);
tl.to('#s0-pad', { scale: 0.94, duration: 0.12, ease: 'power2.in' }, padT);
tl.to('#s0-pad', { scale: 1.1, rotation: -4, duration: 0.4, ease: POP }, padT + 0.12);
tl.to('#s0-pad', { scale: 1, duration: 0.3, ease: 'power2.inOut' }, padT + 0.6);

// 1. Saturday morning: three things people ask you about, one gets picked
step('#s1', T.at(1)); title('#s1', T.at(1) + 0.05); card('#s1-card', T.at(1) + 0.2);
['#s1-o1', '#s1-o2', '#s1-o3'].forEach((id, i) => tl.fromTo(id, { x: 60, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4, ease: OUT }, T.at(1) + 0.45 + i * 0.07));
const pickT = at(1, 0.68);
tl.fromTo('#s1-ring', { scale: 1.08, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.35, ease: POP }, pickT);
tl.fromTo('#s1-tick', { scale: 0, rotation: -60 }, { scale: 1, rotation: 0, duration: 0.4, ease: POP }, pickT + 0.06);
tl.fromTo('#s1-ring', { scale: 1 }, { scale: 1.03, duration: 0.15, yoyo: true, repeat: 1, ease: 'sine.inOut' }, pickT + 0.45);

// 2. Saturday afternoon: the prompt types, GO presses on the click, the draft pages land
step('#s2', T.at(2)); title('#s2', T.at(2) + 0.05);
tl.fromTo('#s2-card', { y: 100, opacity: 0, scale: 0.96 }, { y: 0, opacity: 1, scale: 1, duration: 0.5, ease: OUT }, T.at(2) + 0.05);
tl.fromTo('#s2-l1', { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 0.22, ease: 'steps(10)' }, T.at(2) + 0.2);
tl.fromTo('#s2-l2', { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 0.22, ease: 'steps(9)' }, T.at(2) + 0.43);
const goT = T.voice(2) + 0.6;
tl.fromTo('#s2-go', { scale: 1 }, { scale: 0.86, duration: 0.08, ease: 'power2.in', yoyo: true, repeat: 1 }, goT);
tl.fromTo('#s2-lab2', { opacity: 0 }, { opacity: 1, duration: 0.3, ease: 'power2.out' }, goT + 0.15);
['#s2-p1', '#s2-p2', '#s2-p3'].forEach((id, i) => tl.fromTo(id, { x: 60, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4, ease: OUT }, goT + 0.25 + i * 0.28));

// 3. Sunday: the finished planner page, then its listing; the price slams on the ding (cover frame)
step('#s3', T.at(3)); title('#s3', T.at(3) + 0.05);
tl.fromTo('#s3-page', { y: 100, opacity: 0, rotation: -3 }, { y: 0, opacity: 1, rotation: 0, duration: 0.6, ease: OUT }, T.at(3) + 0.15);
tl.fromTo('#s3 .day', { x: -40, opacity: 0 }, { x: 0, opacity: 1, duration: 0.35, ease: OUT, stagger: 0.07 }, T.at(3) + 0.4);
card('#s3-list', T.at(3) + 0.45);
tl.fromTo('#s3-url', { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 0.4, ease: 'steps(11)' }, T.at(3) + 0.7);
tl.fromTo(['#s3-name', '#s3-desc'], { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.35, ease: OUT, stagger: 0.06 }, T.at(3) + 0.75);
tl.fromTo('#s3-buy', { scale: 0.6, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: POP }, T.at(3) + 0.9);
tl.fromTo(['#s3-n1', '#s3-n2'], { x: 40, opacity: 0 }, { x: 0, opacity: 1, duration: 0.35, ease: OUT, stagger: 0.06 }, T.at(3) + 1.0);
tl.fromTo(['#s3-u1', '#s3-u2'], { opacity: 0 }, { opacity: 1, duration: 0.3, ease: 'power2.out' }, T.at(3) + 0.8);
tl.fromTo('#s3-price', { scale: 1.8, opacity: 0, transformOrigin: 'left center' }, { scale: 1, opacity: 1, duration: 0.25, ease: 'power4.in' }, T.voice(3) + 1.15);
tl.fromTo('#s3-live', { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: POP }, at(3, 0.78));
tl.fromTo('#s3-list', { scale: 1 }, { scale: 1.03, duration: 0.18, yoyo: true, repeat: 1, ease: 'sine.inOut' }, at(3, 0.78) + 0.1);

// 4. example: ten sale tokens fill while the counter climbs to ₹1,990
step('#s4', T.at(4)); title('#s4', T.at(4) + 0.05); card('#s4-card', T.at(4) + 0.2);
tl.fromTo('#s4-ex', { scale: 0.6, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.35, ease: POP }, T.at(4) + 0.5);
tl.fromTo('#s4-eq', { x: 40, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4, ease: OUT }, T.voice(4) + 0.5);
const c0 = T.voice(4) + 0.9;
tl.fromTo('#s4 .tk', { opacity: 0.15, scale: 0.6 }, { opacity: 1, scale: 1, duration: 0.2, ease: POP, stagger: 0.18 }, c0 + 0.02);
const money = { v: 0 };
tl.fromTo(money, { v: 0 }, {
  v: 10, duration: 1.8, ease: 'none',
  onUpdate: () => {
    const n = Math.floor(money.v + 0.000001) * 199;
    const txt = n >= 1000 ? Math.floor(n / 1000) + ',' + String(n % 1000).padStart(3, '0') : String(n);
    document.getElementById('s4-num').textContent = '₹' + txt;
  }
}, c0);
tl.fromTo('#s4-num', { scale: 1, transformOrigin: 'left center' }, { scale: 1.06, duration: 0.18, yoyo: true, repeat: 1, ease: 'sine.inOut' }, c0 + 1.8);
tl.fromTo('#s4-fee', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: OUT }, at(4, 0.8));
tl.fromTo('#s4-chk', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: OUT }, at(4, 0.8) + 0.08);

// 5. the catch: a flat week, the 0 slams on the thud, the card shakes, then why and where first buyers come from
step('#s5', T.at(5)); title('#s5', T.at(5) + 0.05); card('#s5-card', T.at(5) + 0.2);
tl.fromTo('#s5-line', { strokeDashoffset: 360 }, { strokeDashoffset: 0, duration: 0.7, ease: 'power2.inOut' }, T.at(5) + 0.5);
tl.fromTo('#s5 .pt', { opacity: 0 }, { opacity: 1, duration: 0.2, ease: 'power2.out', stagger: 0.07 }, T.at(5) + 0.55);
tl.fromTo('#s5-zero', { scale: 2.2, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.22, ease: 'power4.in' }, T.voice(5) + 0.78);
tl.fromTo('#s5-card', { x: 0 }, { x: 8, duration: 0.05, repeat: 5, yoyo: true, ease: 'none' }, T.voice(5) + 1.0);
tl.fromTo('#s5-r1', { x: 60, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4, ease: OUT }, at(5, 0.5));
tl.fromTo('#s5-r2', { x: 60, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4, ease: OUT }, at(5, 0.74));

// 6. save, send to the notes friend, then PRODUCT drops in letter by letter on the pop
tl.fromTo('#s6-save .l', { yPercent: 110 }, { yPercent: 0, duration: 0.55, ease: OUT }, T.at(6));
tl.fromTo('#s6-mark', { y: -60, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: POP }, T.at(6) + 0.2);
card('#s6-send', T.voice(6) + 0.3);
tl.fromTo('#s6-plane', { x: -40, y: 20, opacity: 0, rotation: -15 }, { x: 0, y: 0, opacity: 1, rotation: 0, duration: 0.5, ease: OUT }, T.voice(6) + 0.6);
tl.fromTo('#s6-kw', { scale: 0.9, opacity: 0, y: 40 }, { scale: 1, opacity: 1, y: 0, duration: 0.45, ease: POP }, T.voice(6) + 1.5);
tl.fromTo('#s6-letters .lt', { yPercent: -60, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.35, ease: POP, stagger: 0.075 }, T.voice(6) + 2.05);
tl.fromTo('#s6-free', { scale: 0.6, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: POP }, T.voice(6) + 2.9);
tl.fromTo('#s6-letters', { scale: 1, transformOrigin: 'left center' }, { scale: 1.06, duration: 0.2, yoyo: true, repeat: 1, ease: 'sine.inOut' }, at(6, 0.88));
tl.fromTo('#s6-plane', { x: 0, y: 0 }, { x: 10, y: -8, duration: 0.6, yoyo: true, repeat: 1, ease: 'sine.inOut' }, T.end(6));
tl.fromTo('#s6-mark', { scale: 1 }, { scale: 1.08, duration: 0.2, yoyo: true, repeat: 1, ease: 'sine.inOut' }, T.end(6) + 0.3);
