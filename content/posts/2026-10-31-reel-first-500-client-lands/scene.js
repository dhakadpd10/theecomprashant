// Editorial skit: the first ₹500 ritual. One small card per ritual above the host, a bill, a counter that dives below zero, then save + CLIENT.
// Every selector is written out in full (no built-up ids) so the checker can match each one to scene.html.
const OUT = 'expo.out', POP = 'back.out(1.8)', SLAM = 'power4.in';
const span = (n) => T.end(n) - T.voice(n);
const at = (n, f) => T.voice(n) + f * span(n);
const title = (sel, t) => tl.fromTo(sel, { yPercent: 110 }, { yPercent: 0, duration: 0.5, ease: OUT, stagger: 0.08 }, t);
const step = (sel, t) => tl.fromTo(sel, { x: -30, opacity: 0 }, { x: 0, opacity: 1, duration: 0.35, ease: OUT }, t);
const rise = (id, t) => tl.fromTo(id, { y: 90, opacity: 0, scale: 0.96 }, { y: 0, opacity: 1, scale: 1, duration: 0.5, ease: OUT }, t);
const pop = (id, t) => tl.fromTo(id, { scale: 0.5, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.38, ease: POP }, t);
const shake = (id, t) => tl.fromTo(id, { x: 0 }, { x: 8, duration: 0.05, repeat: 5, yoyo: true, ease: 'none' }, t);
const flash = (id, t) => {
  tl.fromTo(id, { opacity: 0 }, { opacity: 0.95, duration: 0.05, ease: 'none' }, t);
  tl.to(id, { opacity: 0, duration: 0.3, ease: 'power2.out' }, t + 0.05);
};

// texture: slow drifting blobs across the whole reel
tl.fromTo('#blob1', { x: 0, y: 0 }, { x: 160, y: 120, duration: T.dur, ease: 'sine.inOut' }, 0);
tl.fromTo('#blob2', { x: 0, y: 0 }, { x: -140, y: -100, duration: T.dur, ease: 'sine.inOut' }, 0);

// progress bar: one segment per ritual beat
const segs = ['#p1', '#p2', '#p3', '#p4', '#p5', '#p6', '#p7', '#p8'];
tl.set(segs, { scaleX: 0 }, 0);
segs.forEach((id, i) => tl.to(id, { scaleX: 1, duration: 0.45, ease: 'power2.out' }, T.at(i + 1)));

// 0. hook: the payment notification and "This is you." are on screen at frame 0
tl.fromTo('#s0-note', { scale: 1.04 }, { scale: 1, duration: 0.5, ease: OUT }, 0);
tl.fromTo('#s0-tick', { scale: 0.7 }, { scale: 1, duration: 0.4, ease: POP }, 0.05);
tl.fromTo('#s0-amt', { scale: 1, transformOrigin: '0% 50%' }, { scale: 1.08, transformOrigin: '0% 50%', duration: 0.18, yoyo: true, repeat: 1, ease: 'sine.inOut' }, T.voice(0) + 0.9);
tl.fromTo('#s0-title', { scale: 1, transformOrigin: '0% 50%' }, { scale: 1.05, transformOrigin: '0% 50%', duration: 0.2, yoyo: true, repeat: 1, ease: 'sine.inOut' }, at(0, 0.75));

// 1. screenshot it, twice: two flashes
step('#s1 .step', T.at(1)); title('#s1 .title .l', T.at(1) + 0.04);
tl.fromTo('#s1-a', { y: 80, opacity: 0, rotation: -10 }, { y: 0, opacity: 1, rotation: -5, duration: 0.45, ease: OUT }, T.at(1) + 0.08);
flash('#s1-fa', T.voice(1) + 0.3);
tl.fromTo('#s1-b', { scale: 0.6, opacity: 0, rotation: 14 }, { scale: 1, opacity: 1, rotation: 6, duration: 0.4, ease: POP }, at(1, 0.72));
flash('#s1-fb', at(1, 0.72) + 0.1);

// 2. send it to mummy: bubble, typing dots, her reply
step('#s2 .step', T.at(2)); title('#s2 .title .l', T.at(2) + 0.04);
rise('#s2-card', T.at(2));
pop('#s2-out', T.at(2) + 0.12);
tl.fromTo('#s2-dots', { opacity: 0, scale: 0.6 }, { opacity: 1, scale: 1, duration: 0.18, ease: OUT }, T.voice(2) + 0.15);
tl.fromTo('#s2-dots i', { y: 0 }, { y: -8, duration: 0.1, yoyo: true, repeat: 1, stagger: 0.05, ease: 'sine.inOut' }, T.voice(2) + 0.2);
tl.to('#s2-dots', { opacity: 0, duration: 0.08 }, T.voice(2) + 0.4);
pop('#s2-in', T.voice(2) + 0.42);

// 3. hostel group: everyone asks for a treat
step('#s3 .step', T.at(3)); title('#s3 .title .l', T.at(3) + 0.04);
rise('#s3-card', T.at(3));
pop('#s3-out', T.at(3) + 0.15);
tl.fromTo(['#s3-i1', '#s3-i2', '#s3-i3'], { scale: 0.5, opacity: 0, x: -20 }, { scale: 1, opacity: 1, x: 0, duration: 0.35, ease: POP, stagger: 0.25 }, T.voice(3) + 0.5);

// 4. wallpaper: the phone rises, ₹500 blurs in, a bump
step('#s4 .step', T.at(4)); title('#s4 .title .l', T.at(4) + 0.04);
tl.fromTo('#s4-phone', { y: 120, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: OUT }, T.at(4) + 0.05);
tl.fromTo('#s4-amt', { opacity: 0, filter: 'blur(12px)', scale: 1.3 }, { opacity: 1, filter: 'blur(0px)', scale: 1, duration: 0.45, ease: OUT }, T.voice(4) + 0.2);
tl.fromTo('#s4-phone', { scale: 1 }, { scale: 1.05, duration: 0.15, yoyo: true, repeat: 1, ease: 'sine.inOut' }, T.voice(4) + 0.75);

// 5. refuse to spend: the padlock slams on "single rupee"
step('#s5 .step', T.at(5)); title('#s5 .title .l', T.at(5) + 0.04);
rise('#s5-card', T.at(5) + 0.05);
tl.fromTo('#s5-lock', { scale: 2.2, opacity: 0, rotation: -20 }, { scale: 1, opacity: 1, rotation: 0, duration: 0.25, ease: SLAM }, at(5, 0.6));
shake('#s5-card', at(5, 0.6) + 0.25);
pop('#s5-chip', at(5, 0.6) + 0.3);

// 6. the cooker whistles three times: each ring fills with a puff of steam
step('#s6 .step', T.at(6)); title('#s6 .title .l', T.at(6) + 0.04);
tl.fromTo('#s6-lbl', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.4, ease: OUT }, T.at(6) + 0.3);
const seetis = [['#s6-r1', '#s6-p1'], ['#s6-r2', '#s6-p2'], ['#s6-r3', '#s6-p3']];
seetis.forEach((pair, i) => {
  const t = T.voice(6) + 0.55 + i * 0.45;
  tl.fromTo(pair[0], { scale: 0.6, opacity: 0.2 }, { scale: 1, opacity: 1, duration: 0.35, ease: POP }, t);
  tl.fromTo(pair[1], { y: 20, opacity: 0, scale: 0.5 }, { y: 0, opacity: 0.9, scale: 0.8, duration: 0.12, ease: 'power2.out' }, t);
  tl.to(pair[1], { y: -70, opacity: 0, scale: 1.5, duration: 0.7, ease: 'power2.out' }, t + 0.12);
});

// 7. the biryani bill: ₹540 lands, turns red, "₹40 over"
step('#s7 .step', T.at(7)); title('#s7 .title .l', T.at(7) + 0.04);
rise('#s7-card', T.at(7) + 0.05);
tl.fromTo('#s7-r1', { x: 40, opacity: 0 }, { x: 0, opacity: 1, duration: 0.35, ease: OUT }, T.voice(7) + 0.2);
tl.fromTo('#s7-r2', { x: 40, opacity: 0 }, { x: 0, opacity: 1, duration: 0.35, ease: OUT }, at(7, 0.35));
pop('#s7-price', at(7, 0.45));
tl.fromTo('#s7-price', { color: '#1E1A16' }, { color: '#A3342A', duration: 0.2, ease: 'power2.out' }, at(7, 0.78));
shake('#s7-price', at(7, 0.78));
pop('#s7-over', at(7, 0.8) + 0.2);

// 8. net profit: the counter dives from ₹500 to –₹40, the LOSS stamp slams on the thud
step('#s8 .step', T.at(8)); title('#s8 .title .l', T.at(8) + 0.04);
const c = { v: 500 };
tl.fromTo(c, { v: 500 }, {
  v: -40, duration: 0.55, ease: 'power2.in',
  onUpdate: () => {
    const v = Math.round(c.v);
    document.getElementById('s8-num').textContent = v < 0 ? '–₹' + Math.abs(v) : '₹' + v;
  }
}, T.at(8) + 0.1);
tl.fromTo('#s8-num', { color: '#1E1A16' }, { color: '#A3342A', duration: 0.2, ease: 'power2.out' }, T.at(8) + 0.5);
tl.fromTo('#s8-math', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.35, ease: OUT }, T.at(8) + 0.25);
tl.fromTo('#s8-stamp', { scale: 2.4, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.22, ease: SLAM }, T.voice(8) + 0.38);
shake('#s8-num', T.voice(8) + 0.6);

// 9. send this: the framed first payment drops in and swings, the plane flies in
step('#s9 .step', T.at(9)); title('#s9 .title .l', T.at(9) + 0.04);
tl.fromTo('#s9-frame', { y: -100, opacity: 0, rotation: -10, transformOrigin: '50% 0%' }, { y: 0, opacity: 1, rotation: 0, transformOrigin: '50% 0%', duration: 0.6, ease: OUT }, T.at(9) + 0.1);
tl.to('#s9-frame', { rotation: 3, duration: 0.4, yoyo: true, repeat: 3, ease: 'sine.inOut' }, T.at(9) + 0.75);
tl.fromTo('#s9-plane', { x: -200, y: 90, opacity: 0, rotation: -15 }, { x: 0, y: 0, opacity: 1, rotation: 0, duration: 0.6, ease: OUT }, T.voice(9) + 0.3);
tl.to('#s9-plane', { y: -14, duration: 0.6, yoyo: true, repeat: 1, ease: 'sine.inOut' }, T.voice(9) + 1.0);

// 10. save + CLIENT: the tool card ticks in, the keyword letters drop on the beat
step('#s10 .step', T.at(10)); title('#s10 .title .l', T.at(10) + 0.04);
tl.fromTo('#s10-mark', { y: -60, opacity: 0 }, { y: 0, opacity: 1, duration: 0.45, ease: OUT }, T.at(10) + 0.2);
rise('#s10-card', T.at(10) + 0.1);
tl.fromTo(['#s10-t1', '#s10-t2', '#s10-t3'], { x: 40, opacity: 0 }, { x: 0, opacity: 1, duration: 0.35, ease: OUT, stagger: 0.08 }, T.at(10) + 0.35);
tl.fromTo('#s10-pill', { scale: 0.7, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.45, ease: POP }, T.voice(10) + 0.15);
tl.fromTo('#s10-pill .kw b', { yPercent: -120, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.35, ease: 'back.out(2)', stagger: 0.06 }, T.voice(10) + 0.45);
tl.fromTo('#s10-sticker', { scale: 0, rotation: 25, opacity: 0 }, { scale: 1, rotation: 6, opacity: 1, duration: 0.4, ease: POP }, T.voice(10) + 1.2);
tl.fromTo('#s10-pill', { scale: 1 }, { scale: 1.05, duration: 0.18, yoyo: true, repeat: 1, ease: 'sine.inOut' }, T.end(10) + 0.1);
tl.fromTo('#s10-mark', { y: 0 }, { y: -12, duration: 0.2, yoyo: true, repeat: 1, ease: 'sine.inOut' }, T.end(10) + 0.7);
