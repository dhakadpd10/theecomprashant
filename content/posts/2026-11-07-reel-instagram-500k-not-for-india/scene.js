// Editorial theme, kind "news": the headline, the test card with India struck out, the source check, three slots that fill with real ways (payoff: the finished product), the catch, the forwarded chat, the keyword.
const OUT = 'expo.out', POP = 'back.out(1.8)';
const span = (n) => T.end(n) - T.voice(n);
const at = (n, f) => T.voice(n) + f * span(n);
const title = (s, t) => tl.fromTo(`${s} .title .l`, { yPercent: 110 }, { yPercent: 0, duration: 0.55, ease: OUT, stagger: 0.08 }, t);
const step = (s, t) => tl.fromTo(`${s} .step`, { x: -40, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4, ease: OUT }, t);
const rise = (id, t) => tl.fromTo(id, { y: 110, opacity: 0, scale: 0.96 }, { y: 0, opacity: 1, scale: 1, duration: 0.6, ease: OUT }, t);
const slide = (id, t) => tl.fromTo(id, { x: 60, opacity: 0 }, { x: 0, opacity: 1, duration: 0.35, ease: OUT }, t);
const slam = (id, t, rot) => tl.fromTo(id, { scale: 2.2, opacity: 0, rotation: rot * 3 }, { scale: 1, opacity: 1, rotation: rot, duration: 0.22, ease: 'power4.in' }, t);
const shake = (id, t) => tl.fromTo(id, { x: 0 }, { x: 8, duration: 0.05, repeat: 5, yoyo: true, ease: 'none' }, t);
const wipe = (sel, t) => tl.fromTo(sel, { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 0.5, ease: 'steps(14)' }, t);

// texture: slow paper blobs for the whole reel
tl.fromTo('#blob1', { x: 0, y: 0 }, { x: 160, y: 120, duration: T.dur, ease: 'sine.inOut' }, 0);
tl.fromTo('#blob2', { x: 0, y: 0 }, { x: -140, y: -100, duration: T.dur, ease: 'sine.inOut' }, 0);

// progress bar: news, source, 3 ways, catch, send, comment
[1, 2, 3, 7, 8, 9].forEach((n, i) => tl.fromTo(`#p${i + 1}`, { scaleX: 0 }, { scaleX: 1, duration: 0.5, ease: 'power2.out' }, T.at(n)));

// 0. hook: $500K and "Not for India" are on screen at frame 0
tl.fromTo('#s0-title .l', { yPercent: 0 }, { yPercent: 0, duration: 0.01 }, 0);
tl.fromTo('#s0-title', { scale: 1.06 }, { scale: 1, duration: 0.6, ease: OUT, transformOrigin: 'left top' }, 0);
tl.fromTo('#s0-kick', { opacity: 0.6 }, { opacity: 1, duration: 0.3 }, 0);
tl.fromTo('#s0-chip', { scale: 0, opacity: 0, rotation: -30 }, { scale: 1, opacity: 1, rotation: -8, duration: 0.45, ease: POP }, at(0, 0.3));
shake('#s0-title', at(0, 0.85));

// 1. the test: US and Brazil light up, India gets struck out on the thud
step('#s1', T.at(1)); title('#s1', T.at(1) + 0.05); rise('#s1-card', T.at(1) + 0.15);
wipe('#s1 .blab', T.at(1) + 0.45);
slide('#s1-r1', T.at(1) + 0.35);
slide('#s1-r2', T.voice(1) + 0.1);
[['#g-us', 0.25], ['#g-br', 0.45], ['#g-in', 0.6]].forEach(([id, d]) => tl.fromTo(id, { scale: 0.6, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.35, ease: POP }, T.voice(1) + d));
tl.fromTo('#g-x', { scaleX: 0 }, { scaleX: 1, duration: 0.2, ease: 'power4.in', transformOrigin: 'left center' }, T.voice(1) + 0.8);
shake('#g-in', T.voice(1) + 1.0);
slide('#s1-r3', at(1, 0.6));
slide('#s1-r4', at(1, 0.82));

// 2. the source: rows land, REPORTED stamp slams under the card
step('#s2', T.at(2)); title('#s2', T.at(2) + 0.05); rise('#s2-card', T.at(2) + 0.15);
wipe('#s2 .blab', T.at(2) + 0.45);
slide('#s2-r1', at(2, 0.1)); slide('#s2-r2', at(2, 0.4)); slide('#s2-r3', at(2, 0.65));
slam('#s2-stamp', at(2, 0.85), -8);

// 3. three open slots, and the invite ticket gets stamped
step('#s3', T.at(3)); title('#s3', T.at(3) + 0.05); rise('#s3-card', T.at(3) + 0.15);
tl.fromTo('#s3 .slot', { x: 50, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4, ease: OUT, stagger: 0.07 }, T.at(3) + 0.3);
rise('#d0', T.voice(3) + 0.35);
slam('#d0-stamp', at(3, 0.7), -6);

// 4-6. each slot fills on its pop; the detail card below shows that way
[1, 2, 3].forEach((k) => {
  const t = T.voice(3 + k) + 0.3;
  tl.fromTo(`#n${k}`, { scale: 0.8 }, { scale: 1, duration: 0.4, ease: POP }, t - 0.05);
  tl.fromTo(`#f${k}`, { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 0.4, ease: 'power3.out' }, t);
});

// 4. brand deal: the shop and the work
rise('#d1', T.at(4) + 0.02);
tl.fromTo('#d1-shop', { scale: 0.6, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.45, ease: POP }, T.at(4) + 0.2);
slide('#d1-k1', T.voice(4) + 0.2); slide('#d1-v1', T.voice(4) + 0.26);
slide('#d1-k2', at(4, 0.55)); slide('#d1-v2', at(4, 0.55) + 0.06);

// 5. payoff: the finished product, priced, on the whistle
rise('#d2', T.at(5) + 0.02);
tl.fromTo('#cover', { rotation: -10, scale: 0.7, opacity: 0 }, { rotation: 0, scale: 1, opacity: 1, duration: 0.5, ease: POP }, T.at(5) + 0.15);
slide('#d2-k', T.voice(5) + 0.2); slide('#d2-v', T.voice(5) + 0.26);
tl.fromTo('#price', { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: POP }, at(5, 0.45));
tl.fromTo('#ptag', { opacity: 0 }, { opacity: 1, duration: 0.3, ease: 'power2.out' }, at(5, 0.55));
slide('#d2-p', at(5, 0.65));
tl.fromTo('#d2', { scale: 1 }, { scale: 1.05, duration: 0.2, yoyo: true, repeat: 1, ease: 'sine.inOut' }, at(5, 0.75));
tl.fromTo('#sl2', { scale: 1 }, { scale: 1.04, duration: 0.2, yoyo: true, repeat: 1, ease: 'sine.inOut' }, at(5, 0.75));

// 6. paid call: time slots, one gets picked, booked
rise('#d3', T.at(6) + 0.02);
slide('#d3-k', T.voice(6) + 0.15); slide('#d3-v', T.voice(6) + 0.21);
tl.fromTo('#t1, #t2, #t3', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.35, ease: OUT, stagger: 0.06 }, at(6, 0.3));
tl.fromTo('#t2on', { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.35, ease: POP }, at(6, 0.55));
slide('#d3-ok', at(6, 0.75));

// 7. the catch: three chips slam in, the first on the thud
step('#s7', T.at(7)); title('#s7', T.at(7) + 0.05); rise('#s7-card', T.at(7) + 0.15);
slide('#c1', T.voice(7) + 0.05); slam('#ch1', T.voice(7) + 0.28, 0);
slide('#c2', at(7, 0.35)); slam('#ch2', at(7, 0.35) + 0.2, 0); shake('#ch2', at(7, 0.35) + 0.42);
slide('#c3', at(7, 0.62)); slam('#ch3', at(7, 0.62) + 0.2, 0);
tl.fromTo('#s7-note', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: OUT }, at(7, 0.85));

// 8. send: the forwarded headline, typing, the honest reply
title('#s8', T.at(8));
tl.fromTo('#plane', { x: -200, y: 120, opacity: 0, rotation: -20 }, { x: 0, y: 0, opacity: 1, rotation: 0, duration: 0.7, ease: OUT }, T.at(8) + 0.2);
rise('#s8-card', T.at(8) + 0.15);
tl.fromTo('#s8-in', { scale: 0.7, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: POP, transformOrigin: 'left bottom' }, T.voice(8) + 0.15);
tl.fromTo('#s8-typing', { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.25, ease: OUT }, at(8, 0.3));
tl.fromTo('#s8-typing i', { y: 0 }, { y: -10, duration: 0.15, yoyo: true, repeat: 3, stagger: 0.08, ease: 'sine.inOut' }, at(8, 0.3) + 0.1);
tl.to('#s8-typing', { opacity: 0, duration: 0.2, ease: 'power3.in' }, at(8, 0.58));
tl.fromTo('#s8-out', { scale: 0.7, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: POP, transformOrigin: 'right bottom' }, at(8, 0.62));

// 9. save + keyword: bookmark drops, PRODUCT letters fall in, the free prompt card fills
title('#s9', T.at(9));
tl.fromTo('#bm', { y: -60, opacity: 0 }, { y: 0, opacity: 1, duration: 0.45, ease: POP }, T.at(9) + 0.15);
tl.fromTo('#pill', { scale: 0.85, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.45, ease: POP }, T.at(9) + 0.1);
tl.fromTo('#kw .ch', { yPercent: -120, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.4, ease: 'back.out(2)', stagger: 0.04 }, T.voice(9) + 0.35);
tl.fromTo('#sticker', { scale: 0, opacity: 0, rotation: 20 }, { scale: 1, opacity: 1, rotation: 6, duration: 0.4, ease: POP }, at(9, 0.45));
rise('#s9-card', T.at(9) + 0.3);
slide('#s9-k', T.at(9) + 0.5); slide('#s9-v', T.at(9) + 0.56);
slide('#s9-r1', at(9, 0.4)); slide('#s9-r2', at(9, 0.58)); slide('#s9-r3', at(9, 0.76));
tl.fromTo('#pill', { scale: 1 }, { scale: 1.05, duration: 0.2, yoyo: true, repeat: 1, ease: 'sine.inOut' }, T.end(9) + 0.15);
