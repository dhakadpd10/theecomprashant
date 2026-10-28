// Editorial theme, green accent: stale sheet vs empty shelf, then 3 steps of the Reorder Alert Sheet, the red row twist, the catch, the keyword.
const OUT = 'expo.out', POP = 'back.out(1.8)', SLAM = 'power4.in';
const span = (n) => T.end(n) - T.voice(n);
const at = (n, f) => T.voice(n) + f * span(n);
const title = (s, t) => tl.fromTo(`${s} .title .l`, { yPercent: 110 }, { yPercent: 0, duration: 0.55, ease: OUT, stagger: 0.08 }, t);
const card = (id, t) => tl.fromTo(id, { y: 110, opacity: 0, scale: 0.96 }, { y: 0, opacity: 1, scale: 1, duration: 0.55, ease: OUT }, t);
const label = (s, t) => tl.fromTo(`${s} .step`, { x: -40, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4, ease: OUT }, t);
const shake = (id, t) => tl.fromTo(id, { x: 0 }, { x: 8, duration: 0.05, repeat: 5, yoyo: true, ease: 'none' }, t);
const cnt = (id, from, to, t, d, fmt) => {
  const o = { v: from };
  tl.fromTo(o, { v: from }, { v: to, duration: d, ease: 'power2.out', onUpdate: () => { document.getElementById(id).textContent = fmt(Math.round(o.v)); } }, t);
};
const days = (v) => `${v} days`;

// texture: slow drifting blobs for the whole reel
tl.fromTo('#blob1', { x: 0, y: 0 }, { x: 180, y: 120, duration: T.dur, ease: 'sine.inOut' }, 0);
tl.fromTo('#blob2', { x: 0, y: 0 }, { x: -160, y: -140, duration: T.dur, ease: 'sine.inOut' }, 0);

// progress bar: hidden for the hook, one segment per step
tl.fromTo('#bar', { opacity: 0 }, { opacity: 1, duration: 0.3, ease: 'power2.out' }, T.at(3));
[3, 4, 5].forEach((n, i) => tl.fromTo(`#p${i + 1}`, { scaleX: 0 }, { scaleX: 1, duration: 0.5, ease: 'power2.out' }, T.at(n)));

// 0. hook: title and the day pills are on screen at frame 0; Monday drains, Tuesday slams red
tl.fromTo('#s0-title .l', { yPercent: 0 }, { yPercent: 0, duration: 0.01 }, 0);
tl.fromTo('#s0-title', { scale: 1.05 }, { scale: 1, duration: 0.6, ease: OUT }, 0);
tl.fromTo('#d1', { scale: 1 }, { scale: 1.08, duration: 0.15, yoyo: true, repeat: 1, ease: 'power2.out' }, at(0, 0.36));
tl.fromTo('#d2', { scale: 1 }, { scale: 1.05, duration: 0.15, yoyo: true, repeat: 1, ease: 'power2.out' }, at(0, 0.5));
cnt('d2n', 48, 21, at(0, 0.5), 1.0, (v) => `${v}`);
tl.fromTo('#d3r', { scale: 1.8, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.25, ease: SLAM }, at(0, 0.84));
shake('#d3r', at(0, 0.84) + 0.25);

// 1. stale sheet: 48 pops, the 0 slams on the buzz, the card shakes
label('#s1', T.at(1)); title('#s1', T.at(1) + 0.05); card('#s1-card', T.at(1) + 0.12);
tl.fromTo('#s1-48', { scale: 0.6, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: POP }, T.voice(1) + 0.4);
tl.fromTo(['#pk1', '#pk2'], { scaleX: 0 }, { scaleX: 1, duration: 0.35, ease: 'power3.out', stagger: 0.06 }, T.voice(1) + 0.7);
tl.fromTo('#s1-0', { scale: 2.2, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.25, ease: SLAM }, T.voice(1) + 0.95);
shake('#s1-card', T.voice(1) + 1.2);

// 2. not by gut: strike draws, the empty sheet arrives, FREE sticker pops
tl.fromTo('#s2-step', { opacity: 0, x: -40 }, { opacity: 1, x: 0, duration: 0.4, ease: OUT }, T.at(2));
tl.fromTo('#s2-strike', { scaleX: 0 }, { scaleX: 1, duration: 0.3, ease: 'power2.inOut' }, T.voice(2) + 0.7);
title('#s2', T.voice(2) + 0.9);
card('#s2-card', T.voice(2) + 1.0);
tl.fromTo('#s2-hdr', { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 0.4, ease: 'power3.out' }, T.voice(2) + 1.2);
tl.fromTo(['#sl1', '#sl2', '#sl3'], { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.35, ease: OUT, stagger: 0.07 }, T.voice(2) + 1.3);
tl.fromTo('#s2-stk', { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: POP }, at(2, 0.82));

// 3. step 1: PASTE presses on the click, the export rows type in, PII chip confirms
label('#s3', T.at(3)); title('#s3', T.at(3) + 0.05); card('#s3-card', T.at(3) + 0.15);
tl.fromTo('#s3-btn', { scale: 1 }, { scale: 0.88, duration: 0.08, yoyo: true, repeat: 1, ease: 'power2.inOut' }, T.voice(3) + 0.82);
['#ol1', '#ol2', '#ol3', '#ol4'].forEach((id, i) => tl.fromTo(id, { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 0.3, ease: 'steps(16)' }, T.voice(3) + 1.0 + i * 0.28));
tl.fromTo('#s3-chip', { scale: 0.95, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.35, ease: POP }, T.voice(3) + 2.0);

// 4. step 2: formula blurs in, the days-left counters run
label('#s4', T.at(4)); title('#s4', T.at(4) + 0.05); card('#s4-card', T.at(4) + 0.15);
tl.fromTo('#s4-f', { filter: 'blur(12px)', opacity: 0 }, { filter: 'blur(0px)', opacity: 1, duration: 0.45, ease: OUT }, T.voice(4) + 0.35);
tl.fromTo(['#dr1', '#dr2', '#dr3'], { x: 60, opacity: 0 }, { x: 0, opacity: 1, duration: 0.35, ease: OUT, stagger: 0.07 }, T.voice(4) + 0.5);
cnt('dv1', 0, 22, T.voice(4) + 0.8, 1.0, days);
cnt('dv2', 0, 14, T.voice(4) + 0.88, 1.0, days);
cnt('dv3', 0, 5, T.voice(4) + 0.96, 1.0, days);

// 5. step 3: lead time counts to 9, the pin drops, the red zone slams on the thud
label('#s5', T.at(5)); title('#s5', T.at(5) + 0.05); card('#s5-card', T.at(5) + 0.15);
cnt('s5-chip', 0, 9, T.voice(5) + 0.4, 0.7, days);
tl.fromTo('#s5-chip', { scale: 1 }, { scale: 1.06, duration: 0.15, yoyo: true, repeat: 1, ease: 'power2.out' }, T.voice(5) + 1.1);
tl.fromTo(['#s5-pin', '#s5-9'], { y: -40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.35, ease: POP, stagger: 0.05 }, T.voice(5) + 1.0);
tl.fromTo('#s5-red', { scaleX: 0 }, { scaleX: 1, duration: 0.25, ease: SLAM }, T.voice(5) + 1.35);
tl.fromTo('#s5-track', { scale: 1 }, { scale: 1.04, duration: 0.12, yoyo: true, repeat: 1, ease: 'power2.out' }, T.voice(5) + 1.6);
tl.fromTo('#s5-green', { opacity: 0 }, { opacity: 1, duration: 0.3, ease: 'power2.out' }, T.voice(5) + 1.7);
tl.fromTo(['#lg1', '#lg2'], { x: 40, opacity: 0 }, { x: 0, opacity: 1, duration: 0.35, ease: OUT, stagger: 0.08 }, T.voice(5) + 1.85);

// 6. the twist: viral kurta is OK, the plain black one goes red, 6 a day pops
label('#s6', T.at(6)); title('#s6', T.at(6) + 0.05); card('#s6-card', T.at(6) + 0.12);
tl.fromTo(['#rr1', '#rr2', '#rr3'], { x: 60, opacity: 0 }, { x: 0, opacity: 1, duration: 0.35, ease: OUT, stagger: 0.07 }, T.at(6) + 0.3);
tl.fromTo('#ok1', { scale: 0.4, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.35, ease: POP }, at(6, 0.22));
tl.fromTo('#ok2', { scale: 0.4, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.35, ease: POP }, at(6, 0.3));
tl.fromTo('#s6-bg', { opacity: 0 }, { opacity: 1, duration: 0.3, ease: 'power2.out' }, at(6, 0.55));
tl.fromTo('#re3', { scale: 1.9, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.25, ease: SLAM }, at(6, 0.55));
shake('#rr3', at(6, 0.55) + 0.25);
tl.fromTo('#s6-six', { scale: 0.5, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.35, ease: POP }, at(6, 0.84));
tl.fromTo('#rr3', { scale: 1 }, { scale: 1.04, duration: 0.18, yoyo: true, repeat: 1, ease: 'power2.out' }, at(6, 0.84) + 0.4);

// 7. the catch: a 2-minute timer, done by hand
label('#s7', T.at(7)); title('#s7', T.at(7) + 0.05); card('#s7-card', T.at(7) + 0.15);
tl.fromTo('#s7-arc', { strokeDashoffset: 1006 }, { strokeDashoffset: 0, duration: span(7), ease: 'power1.inOut' }, T.voice(7));
const clock = { s: 0 };
tl.fromTo(clock, { s: 0 }, { s: 120, duration: span(7), ease: 'power1.inOut', onUpdate: () => { const s = Math.round(clock.s); document.getElementById('s7-clock').textContent = `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`; } }, T.voice(7));
tl.fromTo('#s7-sub', { filter: 'blur(12px)', opacity: 0 }, { filter: 'blur(0px)', opacity: 1, duration: 0.45, ease: OUT }, at(7, 0.35));

// 8. keyword: pill pops, STOCK letters drop on the pop, Save. and the bookmark land
tl.fromTo('#pill', { scale: 0.6, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.45, ease: POP }, T.at(8));
tl.fromTo('#s8-word .k', { yPercent: -120, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.35, ease: POP, stagger: 0.05 }, T.voice(8) + 0.8);
tl.fromTo('#save', { yPercent: 40, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.6, ease: OUT }, at(8, 0.72));
tl.fromTo('#mark', { y: -120, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: 'bounce.out' }, at(8, 0.72) + 0.25);
tl.fromTo('#s8-stk', { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: POP }, T.voice(8) + 1.3);
tl.fromTo('#pill', { scale: 1 }, { scale: 1.05, duration: 0.3, yoyo: true, repeat: 3, ease: 'sine.inOut' }, T.end(8));
