// Editorial theme, kind "breakdown": the unpaid hook, the gig card, buyers, an example price, Fiverr vs Upwork head to head, the pick, the plan, the catch, then send + GIG.
const OUT = 'expo.out', POP = 'back.out(1.8)';
const span = (n) => T.end(n) - T.voice(n);
const at = (n, f) => T.voice(n) + f * span(n);
const title = (s, t) => tl.fromTo(`${s} .title .l`, { yPercent: 110 }, { yPercent: 0, duration: 0.55, ease: OUT, stagger: 0.08 }, t);
const step = (s, t) => tl.fromTo(`${s} .step`, { x: -40, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4, ease: OUT }, t);
const card = (id, t) => tl.fromTo(id, { y: 110, opacity: 0, scale: 0.96 }, { y: 0, opacity: 1, scale: 1, duration: 0.6, ease: OUT }, t);
const rowIn = (id, t) => tl.fromTo(id, { x: 60, opacity: 0 }, { x: 0, opacity: 1, duration: 0.38, ease: OUT }, t);
const slam = (id, land) => tl.fromTo(id, { scale: 1.8, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.24, ease: 'power4.in' }, land - 0.24);
const shake = (id, t) => tl.fromTo(id, { x: 0 }, { x: 8, duration: 0.05, repeat: 5, yoyo: true, ease: 'none' }, t);

// texture: two warm blobs drift across the whole reel
tl.fromTo('#blob1', { x: 0, y: 0 }, { x: 120, y: 80, duration: T.dur, ease: 'sine.inOut' }, 0);
tl.fromTo('#blob2', { x: 0, y: 0 }, { x: -110, y: -70, duration: T.dur, ease: 'sine.inOut' }, 0);

// progress bar: one segment per beat after the hook
const segs = [1, 2, 3, 4, 6, 7, 8, 9];
tl.set(['#p1', '#p2', '#p3', '#p4', '#p5', '#p6', '#p7', '#p8'], { scaleX: 0 }, 0);
segs.forEach((n, i) => tl.to(`#p${i + 1}`, { scaleX: 1, duration: 0.5, ease: 'power2.out' }, T.at(n)));

// 0. hook: title and the ₹0 tag are on screen at frame 0, the UNPAID stamp lands on the thud
tl.fromTo('#s0-title', { scale: 1.04 }, { scale: 1, duration: 0.6, ease: OUT }, 0);
tl.fromTo('#s0-tag', { scale: 1 }, { scale: 0.96, duration: 0.18, ease: 'power2.inOut' }, T.voice(0) + 0.1);
tl.fromTo('#s0-stamp', { scale: 2.4, opacity: 0, rotation: -22 }, { scale: 1, opacity: 1, rotation: -10, duration: 0.24, ease: 'power4.in' }, T.voice(0) + 0.26);
tl.to('#s0-tag', { scale: 1, duration: 0.3, ease: POP }, T.voice(0) + 0.5);
shake('#s0-tag', T.voice(0) + 0.52);
tl.fromTo('#s0-step', { opacity: 1 }, { opacity: 0.55, duration: 0.3, yoyo: true, repeat: 1, ease: 'sine.inOut' }, at(0, 0.6));

// 1. the gig: card rises, the gig name types, rows land as each part is said, ₹0 bumps
step('#s1', T.at(1)); title('#s1', T.at(1) + 0.05); card('#s1-card', T.at(1) + 0.2);
tl.fromTo('#s1-thumb', { scale: 0, rotation: -20 }, { scale: 1, rotation: 0, duration: 0.45, ease: POP }, T.voice(1) + 0.35);
tl.fromTo('#s1-gv', { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 0.5, ease: 'steps(12)' }, T.voice(1) + 0.5);
rowIn('#s1 .r1', at(1, 0.42));
rowIn('#s1 .r2', at(1, 0.62));
rowIn('#s1 .r3', at(1, 0.82));
tl.fromTo('#s1 .r3 .v', { scale: 1 }, { scale: 1.12, duration: 0.2, yoyo: true, repeat: 1, ease: 'sine.inOut' }, at(1, 0.82) + 0.3);

// 2. buyers: each row slides in as it's named, ticks pop on "they'll pay"
step('#s2', T.at(2)); title('#s2', T.at(2) + 0.05); card('#s2-card', T.at(2) + 0.15);
rowIn('#b1', at(2, 0.05));
rowIn('#b2', at(2, 0.24));
rowIn('#b3', at(2, 0.42));
tl.fromTo(['#t1', '#t2', '#t3'], { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: POP, stagger: 0.08 }, at(2, 0.66));

// 3. example price: the counter runs to ₹1,500 on the ding, the 2-hour ring fills
step('#s3', T.at(3)); title('#s3', T.at(3) + 0.05); card('#s3-card', T.at(3) + 0.15);
tl.fromTo('#s3-chip', { scale: 0.6, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: POP }, T.voice(3) + 0.25);
tl.fromTo('#s3-label', { x: 30, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4, ease: OUT }, T.voice(3) + 0.35);
const cnt = { v: 0 };
tl.fromTo(cnt, { v: 0 }, {
  v: 1500, duration: 0.7, ease: 'power2.out',
  onUpdate: () => {
    const n = Math.round(cnt.v / 10) * 10;
    document.getElementById('s3-num').textContent = '₹' + (n >= 1000 ? Math.floor(n / 1000) + ',' + String(n % 1000).padStart(3, '0') : String(n));
  }
}, T.voice(3) + 0.2);
tl.fromTo('#s3-num', { scale: 1 }, { scale: 1.08, duration: 0.18, yoyo: true, repeat: 1, ease: 'sine.inOut' }, T.voice(3) + 0.9);
tl.fromTo('#s3-time', { filter: 'blur(12px)', opacity: 0 }, { filter: 'blur(0px)', opacity: 1, duration: 0.45, ease: OUT }, at(3, 0.58));
tl.fromTo('#s3-arc', { strokeDashoffset: 251.3 }, { strokeDashoffset: 0, duration: 0.9, ease: 'power2.inOut' }, at(3, 0.6));

// 4-5. head to head: Fiverr card pops, an empty slot waits, Upwork fills it
step('#s4', T.at(4)); title('#s4', T.at(4) + 0.05);
tl.fromTo('#s4-a', { y: 40, scale: 0.85, opacity: 0 }, { y: 0, scale: 1, opacity: 1, duration: 0.45, ease: POP }, T.voice(4) + 0.05);
tl.fromTo('#s4-slot', { opacity: 0 }, { opacity: 1, duration: 0.4, ease: 'power2.out' }, T.voice(4) + 0.4);
tl.fromTo('#s4-ca', { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: POP }, at(4, 0.72));
tl.fromTo('#s4-b', { y: 40, scale: 0.85, opacity: 0 }, { y: 0, scale: 1, opacity: 1, duration: 0.45, ease: POP }, T.voice(5) + 0.05);
tl.to('#s4-slot', { opacity: 0, duration: 0.25, ease: 'power3.in' }, T.voice(5) + 0.3);
tl.fromTo('#s4-cb', { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: POP }, at(5, 0.7));

// 6. pick by type: two rows, the verdict chips slam (second on the thud)
step('#s6', T.at(6)); title('#s6', T.at(6) + 0.05); card('#s6-card', T.at(6) + 0.12);
rowIn('#s6-r1', T.voice(6) + 0.1);
slam('#s6-c1', T.voice(6) + 0.75);
rowIn('#s6-r2', T.voice(6) + 0.8);
slam('#s6-c2', T.voice(6) + 1.2);

// 7. this week: checklist scan, ticks pop, three café dots fill
step('#s7', T.at(7)); title('#s7', T.at(7) + 0.05); card('#s7-card', T.at(7) + 0.15);
tl.fromTo('#s7-scan', { opacity: 0, y: 0 }, { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' }, T.voice(7) + 0.3);
tl.fromTo('#s7-b1', { backgroundColor: '#FFFFFF' }, { backgroundColor: '#2E6B4A', duration: 0.2, ease: 'power2.out' }, at(7, 0.45));
tl.fromTo('#s7-k1', { scale: 0 }, { scale: 1, duration: 0.35, ease: POP }, at(7, 0.45));
tl.to('#s7-scan', { y: 118, duration: 0.4, ease: 'power2.inOut' }, at(7, 0.55));
tl.fromTo(['#cup1', '#cup2', '#cup3'], { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.35, ease: POP, stagger: 0.08 }, at(7, 0.68));
tl.fromTo('#s7-b2', { backgroundColor: '#FFFFFF' }, { backgroundColor: '#2E6B4A', duration: 0.2, ease: 'power2.out' }, at(7, 0.9));
tl.fromTo('#s7-k2', { scale: 0 }, { scale: 1, duration: 0.35, ease: POP }, at(7, 0.9));

// 8. the catch: WEEKS slams on the buzz and the card shakes, then FEES
step('#s8', T.at(8)); title('#s8', T.at(8) + 0.05); card('#s8-card', T.at(8) + 0.12);
rowIn('#s8-r1', T.voice(8) + 0.05);
slam('#s8-c1', T.voice(8) + 0.6);
shake('#s8-card', T.voice(8) + 0.62);
rowIn('#s8-r2', at(8, 0.58));
slam('#s8-c2', at(8, 0.82));

// 9. send this: plane flies in, the free prompt card, then the GIG letters drop into the pill
title('#s9', T.at(9));
tl.fromTo('#plane', { x: -240, y: 120, opacity: 0, rotation: -20 }, { x: 0, y: 0, opacity: 1, rotation: 0, duration: 0.7, ease: OUT }, T.at(9) + 0.2);
card('#s9-tool', T.voice(9) + 0.4);
tl.fromTo('#s9 .tchip', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.35, ease: OUT, stagger: 0.07 }, T.voice(9) + 0.8);
tl.fromTo('#s9-pill', { scale: 0.6, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.45, ease: POP }, at(9, 0.55));
tl.fromTo('#s9 .g', { y: -90, opacity: 0 }, { y: 0, opacity: 1, duration: 0.45, ease: POP, stagger: 0.08 }, at(9, 0.78));
tl.fromTo('#s9-gig', { scale: 1 }, { scale: 1.06, duration: 0.25, yoyo: true, repeat: 1, ease: 'sine.inOut' }, T.end(9) + 0.1);
tl.to('#plane', { x: 24, y: -16, duration: 0.6, yoyo: true, repeat: 1, ease: 'sine.inOut' }, T.end(9));
