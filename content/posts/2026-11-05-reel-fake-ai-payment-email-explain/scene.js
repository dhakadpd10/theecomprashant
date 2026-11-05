// Explainer: a fake AI bill email is a photocopied shop counter. Colour = meaning: blue real app, red copy, green safe, amber example.
// Motion: enters expo.out 0.5 s, pops back.out, slams power4.in, staggers 0.07 s, labels settle after their card, orbs drift all reel.
const OUT = 'expo.out', POP = 'back.out(1.8)';
const span = (n) => T.end(n) - T.voice(n);
const at = (n, f) => T.voice(n) + f * span(n);
const title = (s, t) => tl.fromTo(`${s} .title .l`, { yPercent: 110 }, { yPercent: 0, duration: 0.55, ease: OUT, stagger: 0.08 }, t);
const step = (s, t) => tl.fromTo(`${s} .step`, { x: -40, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4, ease: OUT }, t);
const card = (id, t) => tl.fromTo(id, { y: 110, opacity: 0, scale: 0.96 }, { y: 0, opacity: 1, scale: 1, duration: 0.6, ease: OUT }, t);
const late = (id, t) => tl.fromTo(id, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.35, ease: OUT }, t);
const chip = (id, t) => {
  tl.fromTo(id, { scale: 0, opacity: 0 }, { scale: 1.12, opacity: 1, duration: 0.22, ease: 'power2.out' }, t);
  tl.to(id, { scale: 1, duration: 0.18, ease: 'power2.inOut' }, t + 0.22);
};
const shake = (id, t, px = 8) => tl.fromTo(id, { x: 0 }, { x: px, duration: 0.05, repeat: 5, yoyo: true, ease: 'none' }, t);

// ambient
tl.fromTo('#orb1', { x: 0, y: 0 }, { x: 170, y: -110, duration: T.dur, ease: 'sine.inOut' }, 0);
tl.fromTo('#orb2', { x: 0, y: 0 }, { x: -170, y: -150, duration: T.dur, ease: 'sine.inOut' }, 0);

// progress bar: one segment per step
tl.set(['#p1', '#p2', '#p3', '#p4', '#p5', '#p6', '#p7'], { scaleX: 0 }, 0);
[1, 3, 4, 5, 6, 7, 8].forEach((n, i) => tl.to(`#p${i + 1}`, { scaleX: 1, duration: 0.5, ease: 'power2.out' }, T.at(n)));

// 0. hook: title and phone on screen at frame 0; the red slash slams on the thud, the app icon pops on "Open the app"
tl.fromTo('#s0-phone', { rotation: -3 }, { rotation: 0, duration: 0.6, ease: OUT }, 0);
tl.fromTo('#s0-slash', { scale: 2.2, opacity: 0, rotation: -20 }, { scale: 1, opacity: 1, rotation: 0, duration: 0.22, ease: 'power4.in' }, T.voice(0, 0.18));
shake('#s0-phone', T.voice(0, 0.42), 8);
tl.to('#s0-banner', { scale: 1.05, duration: 0.3, yoyo: true, repeat: 1, ease: 'sine.inOut' }, T.voice(0, 1.7));
chip('#s0-app', at(0, 0.76));
late('#s0-applbl', at(0, 0.76) + 0.2);
tl.to('#s0-app', { scale: 1.06, duration: 0.25, yoyo: true, repeat: 1, ease: 'sine.inOut' }, at(0, 0.76) + 0.6);

// 1. the email (example mock): card lands full, the clock starts ticking, the button pulses on "Update"
step('#s1', T.at(1)); title('#s1', T.at(1) + 0.05); card('#s1-card', T.at(1) + 0.1);
tl.fromTo(['#s1-subj', '#s1-body', '#s1-timer', '#s1-clock', '#s1-left', '#s1-btn'], { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.4, ease: OUT, stagger: 0.06 }, T.at(1) + 0.35);
chip('#s1-tag', T.at(1) + 0.75);
const clock = { v: 172800 };
tl.fromTo(clock, { v: 172800 }, { v: 172794, duration: T.at(3) - T.at(1) - 0.5, ease: 'none', onUpdate: () => {
  const s = Math.ceil(clock.v), p = (n) => String(n).padStart(2, '0');
  document.getElementById('s1-clock').textContent = `${p(Math.floor(s / 3600))}:${p(Math.floor((s % 3600) / 60))}:${p(s % 60)}`;
} }, T.at(1) + 0.4);
tl.fromTo('#s1-arc', { strokeDashoffset: 0 }, { strokeDashoffset: 22, duration: T.at(3) - T.at(1) - 0.5, ease: 'sine.inOut' }, T.at(1) + 0.4);
tl.fromTo('#s1-pulse', { scale: 1, opacity: 0 }, { scale: 1.1, opacity: 0, duration: 0.01 }, 0);
tl.fromTo('#s1-pulse', { scale: 1, opacity: 0.9 }, { scale: 1.1, opacity: 0, duration: 0.7, ease: 'power2.out', repeat: 1 }, at(1, 0.55));

// 2. why now: the calendar pops, the year punches, the renewal chip wobbles
tl.fromTo('#s2-cal', { scale: 0.6, opacity: 0, y: 30 }, { scale: 1, opacity: 1, y: 0, duration: 0.45, ease: POP }, T.voice(2) + 0.15);
tl.fromTo('#s2-y', { scale: 1.35 }, { scale: 1, duration: 0.45, ease: OUT }, at(2, 0.38));
chip('#s2-renew', at(2, 0.72));
tl.fromTo('#s2-renew', { rotation: 0 }, { rotation: 7, duration: 0.08, repeat: 7, yoyo: true, ease: 'sine.inOut' }, at(2, 0.72) + 0.45);
tl.to('#s1-btn', { scale: 1.04, duration: 0.25, yoyo: true, repeat: 1, ease: 'sine.inOut' }, at(2, 0.9));

// 3. the photocopied counter: counters, then signboards, then forms, then a copy-light sweeps, then the tags
step('#s3', T.at(3)); title('#s3', T.at(3) + 0.05);
tl.fromTo(['#s3-a .awn', '#s3-b .awn'], { y: -40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.45, ease: OUT, stagger: 0.08 }, T.at(3) + 0.2);
tl.fromTo(['#s3-a .base', '#s3-b .base'], { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.45, ease: OUT, stagger: 0.08 }, T.at(3) + 0.26);
tl.fromTo(['#s3-a .sign', '#s3-b .sign'], { y: -24, opacity: 0, rotation: -4 }, { y: 0, opacity: 1, rotation: 0, duration: 0.4, ease: POP, stagger: 0.08 }, at(3, 0.2));
tl.fromTo(['#s3-a .form', '#s3-b .form'], { opacity: 0, filter: 'blur(12px)' }, { opacity: 1, filter: 'blur(0px)', duration: 0.45, ease: OUT, stagger: 0.08 }, at(3, 0.4));
tl.fromTo('#s3-scan', { y: 0, opacity: 0 }, { y: 600, opacity: 1, duration: 0.9, ease: 'sine.inOut' }, at(3, 0.5));
tl.to('#s3-scan', { opacity: 0, duration: 0.2, ease: 'power3.in' }, at(3, 0.5) + 0.8);
chip('#s3-ta', at(3, 0.7)); chip('#s3-tb', at(3, 0.7) + 0.12);
late('#s3-src', at(3, 0.88));

// 4. the address: same name, then the copy address types in and one letter turns red (buzz)
step('#s4', T.at(4)); title('#s4', T.at(4) + 0.05); card('#s4-card', T.at(4) + 0.12);
tl.fromTo('#s4-r1', { opacity: 0, x: 50 }, { opacity: 1, x: 0, duration: 0.4, ease: OUT }, T.at(4) + 0.3);
chip('#s4-same', T.at(4) + 0.5);
late('#s4-l1', T.at(4) + 0.6);
tl.fromTo('#s4-a', { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.4, ease: OUT }, T.at(4) + 0.6);
late('#s4-l2', T.at(4) + 0.68);
tl.fromTo('#s4-b', { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.4, ease: OUT }, T.at(4) + 0.66);
tl.fromTo('#s4-typed', { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 0.6, ease: 'steps(11)' }, T.at(4) + 0.78);
tl.fromTo('#s4-q', { color: '#1C1A17' }, { color: '#C53030', duration: 0.12, ease: 'power2.out' }, T.voice(4, 1.35));
tl.to('#s4-q', { scale: 1.3, duration: 0.14, yoyo: true, repeat: 1, ease: 'power2.out' }, T.voice(4, 1.35));
tl.fromTo('#s4-ring-e', { strokeDashoffset: 100 }, { strokeDashoffset: 0, duration: 0.4, ease: 'power2.out' }, T.voice(4, 1.42));
shake('#s4-b', T.voice(4, 1.45), 8);
late('#s4-note', T.voice(4, 1.95));

// 5. the drawer: password and OTP fill, the arrow draws, the OTP drops in, the drawer shuts on the click
const c5 = T.voice(5, 1.3);
step('#s5', T.at(5)); title('#s5', T.at(5) + 0.05); card('#s5-card', T.at(5) + 0.1);
tl.fromTo('#s5-dots', { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 0.45, ease: 'steps(8)' }, c5 - 1.05);
tl.fromTo('#s5-otp .d', { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.25, ease: POP, stagger: 0.05 }, c5 - 0.88);
tl.fromTo('#s5-arrow-p', { strokeDashoffset: 100 }, { strokeDashoffset: 0, duration: 0.3, ease: 'power2.out' }, c5 - 0.62);
tl.fromTo('#s5-head', { opacity: 0 }, { opacity: 1, duration: 0.12, ease: 'power2.out' }, c5 - 0.34);
tl.fromTo('#s5-chip', { y: -150, opacity: 0 }, { y: 0, opacity: 1, duration: 0.25, ease: 'power2.in' }, c5 - 0.48);
tl.fromTo(['#s5-tray', '#s5-chip', '#s5-front'], { x: 0 }, { x: -230, duration: 0.22, ease: 'power3.in' }, c5 - 0.22);
tl.to('#s5-arrow', { opacity: 0, duration: 0.25, ease: 'power3.in' }, c5 + 0.05);
chip('#s5-lock', at(5, 0.7));
tl.fromTo('#s5-who', { color: '#F6F1E7' }, { color: '#FF8F86', duration: 0.2, ease: 'power2.out' }, at(5, 0.72));
tl.to('#s5-cab', { scale: 1.04, duration: 0.15, yoyo: true, repeat: 1, ease: 'power2.out' }, at(5, 0.72));

// 6. payoff: the real counter. The email link gets struck, then three rows tick green as they're said
step('#s6', T.at(6)); title('#s6', T.at(6) + 0.05); card('#s6-card', T.at(6) + 0.1);
tl.fromTo('#s6 .rw', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.4, ease: OUT, stagger: 0.07 }, T.at(6) + 0.3);
tl.fromTo('#s6-link', { opacity: 0, x: 40 }, { opacity: 1, x: 0, duration: 0.35, ease: OUT }, T.at(6) + 0.45);
tl.fromTo('#s6-strike', { scaleX: 0 }, { scaleX: 1, duration: 0.3, ease: 'power3.in' }, T.at(6) + 0.62);
late('#s6-never', T.at(6) + 0.8);
const k1 = at(6, 0.3), k2 = at(6, 0.6), k3 = at(6, 0.9);
tl.fromTo('#s6-hl', { opacity: 0, y: 0 }, { opacity: 1, y: 0, duration: 0.25, ease: 'power2.out' }, k1 - 0.2);
tl.to('#s6-hl', { y: 130, duration: 0.3, ease: 'power2.inOut' }, k2 - 0.25);
tl.to('#s6-hl', { y: 260, duration: 0.3, ease: 'power2.inOut' }, k3 - 0.25);
chip('#s6-k1', k1); chip('#s6-k2', k2); chip('#s6-k3', k3);
tl.to('#s6-card', { scale: 1.03, duration: 0.2, yoyo: true, repeat: 1, ease: 'sine.inOut' }, k3 + 0.3);

// 7. the catch: two identical counters, the address check isn't enough, the app is the answer
step('#s7', T.at(7)); title('#s7', T.at(7) + 0.05); card('#s7-card', T.at(7) + 0.1);
tl.fromTo('#s7 .mini', { y: 40, opacity: 0, scale: 0.9 }, { y: 0, opacity: 1, scale: 1, duration: 0.45, ease: OUT, stagger: 0.08 }, T.at(7) + 0.35);
chip('#s7-eq', T.at(7) + 0.65);
chip('#s7-q1', at(7, 0.42)); chip('#s7-q2', at(7, 0.42) + 0.08);
chip('#s7-warn', at(7, 0.55));
shake('#s7-warn', at(7, 0.55) + 0.4, 7);
chip('#s7-ok', at(7, 0.8));
tl.to('#s7-ok', { scale: 1.05, duration: 0.2, yoyo: true, repeat: 1, ease: 'sine.inOut' }, at(7, 0.8) + 0.5);

// 8. helpline: 1930 lands on the pop, the phone rings, the site settles below
const c8 = T.voice(8, 0.9);
step('#s8', T.at(8)); title('#s8', T.at(8) + 0.05); card('#s8-card', T.at(8) + 0.1);
late('#s8-lbl', T.at(8) + 0.4);
chip('#s8-ph', T.at(8) + 0.45);
tl.fromTo('#s8-num', { scale: 0.5, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.35, ease: POP }, c8 - 0.2);
tl.fromTo('#s8-ph', { rotation: 0 }, { rotation: 10, duration: 0.06, repeat: 7, yoyo: true, ease: 'none' }, c8 + 0.1);
late('#s8-lbl2', c8 + 0.2);
tl.fromTo('#s8-web', { opacity: 0, filter: 'blur(12px)' }, { opacity: 1, filter: 'blur(0px)', duration: 0.4, ease: OUT }, c8 + 0.3);

// 9. end: Save. and the bookmark, the free card sticker, then SAFE drops into the pill letter by letter
tl.fromTo('#s9-save .l', { yPercent: 110 }, { yPercent: 0, duration: 0.55, ease: OUT }, T.at(9));
tl.fromTo('#s9-book', { y: -80, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: 'back.out(2)' }, T.at(9) + 0.25);
late('#s9-who', T.at(9) + 0.6);
tl.fromTo('#s9-stk', { scale: 0.6, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.45, ease: POP }, T.voice(9, 1.0));
tl.fromTo('#s9-pill', { scale: 0.7, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.45, ease: POP }, at(9, 0.5));
tl.fromTo('#s9-kw .k', { yPercent: -120, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.35, ease: 'back.out(2)', stagger: 0.07 }, at(9, 0.78));
tl.to('#s9-pill', { scale: 1.05, duration: 0.25, yoyo: true, repeat: 1, ease: 'sine.inOut' }, T.end(9) + 0.1);
tl.to('#s9-book', { rotation: 8, duration: 0.15, yoyo: true, repeat: 3, ease: 'sine.inOut' }, T.end(9) + 0.7);
