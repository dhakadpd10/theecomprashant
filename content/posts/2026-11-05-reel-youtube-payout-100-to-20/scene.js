// Editorial theme, kind "news": the limit drops ($100 struck, $20 lands, the limit marker slides past an example balance),
// the notice card, who gets it, who doesn't, the catch slams, one screenshot card, send, then the free prompt and PRODUCT.
const OUT = 'expo.out', POP = 'back.out(1.8)';
const span = (n) => T.end(n) - T.voice(n);
const at = (n, k) => T.voice(n) + k * span(n);
const title = (s, t) => tl.fromTo(`${s} .title .l`, { yPercent: 110 }, { yPercent: 0, duration: 0.55, ease: OUT, stagger: 0.08 }, t);
const step = (s, t) => tl.fromTo(`${s} .step`, { x: -40, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4, ease: OUT }, t);
const card = (id, t) => tl.fromTo(id, { y: 120, opacity: 0, scale: 0.96 }, { y: 0, opacity: 1, scale: 1, duration: 0.6, ease: OUT }, t);
const pop = (id, t) => tl.fromTo(id, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: POP }, t);
const shake = (id, t) => tl.fromTo(id, { x: 0 }, { x: 8, duration: 0.05, repeat: 5, yoyo: true, ease: 'none' }, t);

// texture: slow drifting blobs for the whole reel
tl.fromTo('#blob1', { x: -40, y: 0 }, { x: 80, y: 60, duration: T.dur / 2, ease: 'sine.inOut', yoyo: true, repeat: 1 }, 0);
tl.fromTo('#blob2', { x: 40, y: 0 }, { x: -70, y: -50, duration: T.dur / 2, ease: 'sine.inOut', yoyo: true, repeat: 1 }, 0);

// progress bar: one segment per beat after the hook
tl.set(['#p1', '#p2', '#p3', '#p4', '#p5', '#p6', '#p7', '#p8'], { scaleX: 0 }, 0);
[1, 2, 3, 4, 5, 6, 7, 8].forEach((n) => tl.to(`#p${n}`, { scaleX: 1, duration: 0.5, ease: 'power2.out' }, T.at(n)));

// 0. hook: "Stuck under $100?" is on screen at frame 0
tl.fromTo('#s0-title .l', { yPercent: 0 }, { yPercent: 0, duration: 0.01 }, 0);
tl.fromTo('#s0-title', { scale: 1.05 }, { scale: 1, duration: 0.6, ease: OUT }, 0);
tl.fromTo('#s0-step', { opacity: 0.7 }, { opacity: 1, duration: 0.3 }, 0);
tl.fromTo('#s0-ul', { scaleX: 0 }, { scaleX: 1, duration: 0.45, ease: 'power3.out' }, T.voice(0) + 0.35);
tl.fromTo('#s0-amt', { scale: 1 }, { scale: 1.08, duration: 0.2, yoyo: true, repeat: 1, ease: 'sine.inOut' }, at(0, 0.62));

// 1. the drop: $100 struck, $20 lands, the limit marker slides left past the example balance, which turns green
step('#s1', T.at(1)); title('#s1', T.at(1) + 0.05); card('#s1-card', T.at(1) + 0.12);
tl.fromTo('#s1-strike', { scaleX: 0 }, { scaleX: 1, duration: 0.25, ease: 'power3.out' }, T.voice(1) + 0.25);
tl.fromTo('#s1-mark', { x: 464 }, { x: 0, duration: 0.6, ease: 'power2.inOut' }, T.voice(1) + 0.35);
tl.fromTo('#s1-arrow', { x: -30, opacity: 0 }, { x: 0, opacity: 1, duration: 0.3, ease: OUT }, T.voice(1) + 0.4);
tl.fromTo('#s1-new', { scale: 0.6, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: POP }, T.voice(1) + 0.5);
tl.fromTo('#s1-in', { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.35, ease: OUT }, T.voice(1) + 0.8);
tl.fromTo('#s1-fill', { backgroundColor: '#A9A39B' }, { backgroundColor: '#2F6B4F', duration: 0.2, ease: 'power2.out' }, T.voice(1) + 0.85);
pop('#s1-paid', T.voice(1) + 0.9);
tl.fromTo('#s1-in', { scale: 1 }, { scale: 1.04, duration: 0.2, yoyo: true, repeat: 1, ease: 'sine.inOut' }, at(1, 0.8));

// 2. the notice: forum post card, the rows land as the line is said, the change types in
step('#s2', T.at(2)); title('#s2', T.at(2) + 0.05); card('#s2-card', T.at(2) + 0.12);
pop('#s2-av', T.at(2) + 0.4);
['#s2-r1', '#s2-r2', '#s2-r3'].forEach((id, i) => tl.fromTo(id, { x: 60, opacity: 0 }, { x: 0, opacity: 1, duration: 0.35, ease: OUT }, at(2, 0.1 + i * 0.28)));
tl.fromTo('#s2-r1 .v', { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 0.5, ease: 'steps(19)' }, at(2, 0.1) + 0.2);

// 3. who gets it: tick pops (pop sfx), the dice rolls, the Apply button gets struck out
step('#s3', T.at(3)); title('#s3', T.at(3) + 0.05); card('#s3-card', T.at(3) + 0.12);
[['#s3-r1', T.voice(3) + 0.1], ['#s3-r2', at(3, 0.4)], ['#s3-r3', at(3, 0.66)]].forEach(([id, t]) => tl.fromTo(id, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.35, ease: OUT }, t));
tl.fromTo('#s3-tick', { scale: 0 }, { scale: 1, duration: 0.35, ease: POP }, T.voice(3) + 0.78);
tl.fromTo('#s3-dice', { rotation: -180, scale: 0.4 }, { rotation: 0, scale: 1, duration: 0.5, ease: 'back.out(1.6)' }, at(3, 0.42));
tl.fromTo('#s3-strike', { scaleX: 0 }, { scaleX: 1, duration: 0.25, ease: 'power3.out' }, at(3, 0.84));
shake('#s3-apply', at(3, 0.84) + 0.25);

// 4. who doesn't: the X slams on the buzz, the watch-hours cells show how far there is to go
step('#s4', T.at(4)); title('#s4', T.at(4) + 0.05); card('#s4-card', T.at(4) + 0.1);
tl.fromTo('#s4-x', { scale: 2, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.22, ease: 'power4.in' }, T.voice(4) - 0.02);
shake('#s4-r1', T.voice(4) + 0.2);
tl.fromTo('#s4-card > .k', { opacity: 0 }, { opacity: 1, duration: 0.3 }, at(4, 0.35));
tl.fromTo('#s4 .cell', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.35, ease: OUT, stagger: 0.05 }, at(4, 0.4));
tl.fromTo('#s4 .cell b', { scaleY: 0 }, { scaleY: 1, duration: 0.3, ease: 'power3.out', stagger: 0.1 }, at(4, 0.62));
tl.fromTo(['#s4-note', '#s4-sub'], { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: OUT, stagger: 0.08 }, at(4, 0.7));

// 5. the catch: the card slams on the thud, HELPS pops, NOT YET slams and shakes
step('#s5', T.at(5)); title('#s5', T.at(5) + 0.05);
tl.fromTo('#s5-card', { scale: 1.2, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.25, ease: 'power4.in' }, T.voice(5) + 0.15);
tl.fromTo('#s5-card', { y: 0 }, { y: 8, duration: 0.06, yoyo: true, repeat: 1, ease: 'sine.inOut' }, T.voice(5) + 0.4);
pop('#s5-c1', at(5, 0.45));
tl.fromTo('#s5-c2', { scale: 1.8, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.25, ease: 'power4.in' }, at(5, 0.8));
shake('#s5-r2', at(5, 0.8) + 0.25);

// 6. screenshot card: full width, rows stack in, the frame snaps on the click with a flash, the beginners row lights up
card('#s6-card', T.at(6));
tl.fromTo('#s6 .srow', { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: OUT, stagger: 0.08 }, T.at(6) + 0.2);
tl.fromTo('#s6 .n', { scale: 0 }, { scale: 1, duration: 0.35, ease: POP, stagger: 0.08 }, T.at(6) + 0.4);
tl.fromTo('#s6 .br', { scale: 1.25, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.2, ease: 'power4.in' }, T.voice(6) + 0.1);
tl.fromTo('#s6-flash', { opacity: 0 }, { opacity: 0.55, duration: 0.06, ease: 'power2.out' }, T.voice(6) + 0.3);
tl.to('#s6-flash', { opacity: 0, duration: 0.35, ease: 'power2.out' }, T.voice(6) + 0.36);
tl.fromTo('#s6-hl', { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 0.5, ease: 'power2.inOut' }, at(6, 0.15));
tl.fromTo('#s6-r4 .v', { scale: 1 }, { scale: 1.04, duration: 0.2, yoyo: true, repeat: 1, ease: 'sine.inOut' }, at(6, 0.62));

// 7. send: the forward card fills, the friend gets ticked, Send is pressed and the plane flies off
title('#s7', T.at(7));
tl.fromTo('#s7-plane', { x: -200, y: 100, opacity: 0, rotation: -15 }, { x: 0, y: 0, opacity: 1, rotation: 0, duration: 0.6, ease: OUT }, T.at(7) + 0.2);
card('#s7-card', T.at(7) + 0.15);
tl.fromTo('#s7-row', { x: 60, opacity: 0 }, { x: 0, opacity: 1, duration: 0.35, ease: OUT }, T.voice(7) + 0.3);
tl.fromTo('#s7-msg', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.35, ease: OUT }, at(7, 0.3));
pop('#s7-check', at(7, 0.45));
tl.fromTo('#s7-btn', { scale: 1 }, { scale: 0.94, duration: 0.1, yoyo: true, repeat: 1, ease: 'power2.inOut' }, at(7, 0.72));
tl.to('#s7-plane', { x: 220, y: -160, opacity: 0, rotation: 10, duration: 0.5, ease: 'power3.in' }, at(7, 0.78));

// 8. save + keyword: bookmark drops, the free prompt card shows what you get, PRODUCT drops in letter by letter
title('#s8', T.at(8));
tl.fromTo('#s8-mark', { y: -60, opacity: 0 }, { y: 0, opacity: 1, duration: 0.45, ease: POP }, T.at(8) + 0.12);
card('#s8-card', T.at(8) + 0.1);
tl.fromTo('#s8 .trow', { x: 50, opacity: 0 }, { x: 0, opacity: 1, duration: 0.35, ease: OUT, stagger: 0.07 }, T.at(8) + 0.35);
tl.fromTo('#s8-pill', { scale: 0.7, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.45, ease: POP }, T.voice(8) + 0.05);
tl.fromTo('#s8 .ch', { yPercent: -120, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.35, ease: 'back.out(1.6)', stagger: 0.04 }, T.voice(8) + 0.25);
tl.fromTo('#s8-kw', { scale: 1 }, { scale: 1.06, duration: 0.2, yoyo: true, repeat: 1, ease: 'sine.inOut' }, T.end(8) + 0.1);
