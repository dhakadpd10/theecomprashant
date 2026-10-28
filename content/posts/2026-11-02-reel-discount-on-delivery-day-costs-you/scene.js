// Editorial theme, green accent: the delivery-day discount mistake, then the 3-message use-up series.
const OUT = 'expo.out', POP = 'back.out(1.7)';
const span = (n) => T.end(n) - T.voice(n);
const at = (n, f) => T.voice(n) + f * span(n);
const title = (s, t) => tl.fromTo(s + ' .title .l', { yPercent: 110 }, { yPercent: 0, duration: 0.55, ease: OUT, stagger: 0.09 }, t);
const card = (id, t) => tl.fromTo(id, { y: 120, opacity: 0, scale: 0.96 }, { y: 0, opacity: 1, scale: 1, duration: 0.6, ease: OUT }, t);
const step = (s, t) => tl.fromTo(s + ' .step', { x: -40, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4, ease: OUT }, t);
const pop = (id, t) => tl.fromTo(id, { scale: 0.5, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: POP }, t);
const slam = (id, t) => tl.fromTo(id, { scale: 1.8, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.25, ease: 'power4.in' }, t);
const shake = (id, t) => tl.fromTo(id, { x: 0 }, { x: 8, duration: 0.05, repeat: 5, yoyo: true, ease: 'none' }, t);
const beat = (s, c, n) => { step(s, T.at(n)); title(s, T.at(n) + 0.05); card(c, T.at(n) + 0.2); };

// texture: slow drifting blobs for the whole reel
tl.fromTo('#blob1', { x: 0, y: 0 }, { x: 140, y: 90, duration: T.dur, ease: 'sine.inOut' }, 0);
tl.fromTo('#blob2', { x: 0, y: 0 }, { x: -120, y: -70, duration: T.dur, ease: 'sine.inOut' }, 0);

// progress bar: one segment per step
tl.set(['#p1', '#p2', '#p3'], { scaleX: 0 }, 0);
[['#p1', 3], ['#p2', 4], ['#p3', 5]].forEach(([id, n]) => tl.to(id, { scaleX: 1, duration: 0.5, ease: 'power2.out' }, T.at(n)));

// 0. hook: title and the discount WhatsApp are on screen at frame 0
tl.fromTo('#s0-title .l', { yPercent: 0 }, { yPercent: 0, duration: 0.01 }, 0);
tl.fromTo('#s0-title', { scale: 1.05 }, { scale: 1, duration: 0.6, ease: OUT }, 0);
tl.fromTo('#s0-kick', { opacity: 0.7 }, { opacity: 1, duration: 0.3 }, 0);
tl.fromTo('#s0-wa', { y: 16 }, { y: 0, duration: 0.5, ease: OUT }, 0);
shake('#s0-code', at(0, 0.2));
tl.fromTo('#s0-wa', { scale: 1 }, { scale: 1.05, duration: 0.25, yoyo: true, repeat: 1, ease: 'sine.inOut' }, at(0, 0.75));

// 1. wrong day: the offer gets struck out, the bar runs to the day it's used up
beat('#s1', '#s1-card', 1);
tl.fromTo('#s1-bub', { y: 30, opacity: 0, scale: 0.9 }, { y: 0, opacity: 1, scale: 1, duration: 0.4, ease: POP }, T.at(1) + 0.35);
tl.fromTo('#s1-any', { filter: 'blur(12px)', opacity: 0 }, { filter: 'blur(0px)', opacity: 1, duration: 0.4, ease: OUT }, T.voice(1) + 0.5);
tl.fromTo('#s1-strike', { scaleX: 0 }, { scaleX: 1, duration: 0.25, ease: 'power3.out' }, T.voice(1) + 0.9);
shake('#s1-bub', T.voice(1) + 0.9);
tl.fromTo('#s1-fill', { scaleX: 0 }, { scaleX: 1, duration: 0.4 * span(1), ease: 'power2.inOut' }, at(1, 0.45));
tl.fromTo('#s1-d1', { scale: 0.95 }, { scale: 1.35, duration: 0.3, yoyo: true, repeat: 1, ease: 'sine.inOut' }, at(1, 0.85));
pop('#s1-send', at(1, 0.88));

// 2. just tell Claude: the prompt types, SEND presses
beat('#s2', '#s2-card', 2);
tl.fromTo('#s2-pl1', { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 0.6, ease: 'steps(24)' }, T.voice(2) + 0.6);
tl.fromTo('#s2-pl2', { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 0.55, ease: 'steps(21)' }, T.voice(2) + 1.25);
pop('#s2-go', T.voice(2) + 1.75);
tl.fromTo('#s2-go', { scale: 1 }, { scale: 0.9, duration: 0.12, yoyo: true, repeat: 1, ease: 'power2.inOut' }, T.voice(2) + 2.2);

// 3. step 1: days count up while the pack drains
beat('#s3', '#s3-card', 3);
pop('#s3-ex', T.voice(3) + 0.4);
const days = { v: 0 };
tl.fromTo(days, { v: 0 }, { v: 40, duration: 0.75 * span(3), ease: 'power2.out', onUpdate: () => { document.getElementById('s3-num').textContent = String(Math.round(days.v)); } }, T.voice(3) + 0.3);
tl.fromTo('#s3-level', { scaleX: 1 }, { scaleX: 0.04, duration: 0.75 * span(3), ease: 'power2.out' }, T.voice(3) + 0.3);
tl.fromTo('#s3-num', { scale: 1 }, { scale: 1.05, duration: 0.2, yoyo: true, repeat: 1, ease: 'sine.inOut' }, T.voice(3) + 0.3 + 0.75 * span(3));

// 4. step 2: three dashed slots fill as each timing is said
beat('#s4', '#s4-card', 4);
[
  ['#s4-b1', '#s4-c1', '#s4-t1', 0.3],
  ['#s4-b2', '#s4-c2', '#s4-t2', 0.45],
  ['#s4-b3', '#s4-c3', '#s4-t3', 0.75],
].forEach(([b, c, tx, f]) => {
  const t = at(4, f);
  tl.fromTo(b, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: 'power2.out' }, t);
  pop(c, t + 0.05);
  tl.fromTo(tx, { x: -30, opacity: 0 }, { x: 0, opacity: 1, duration: 0.35, ease: OUT }, t + 0.1);
});
tl.fromTo('#s4-ex', { opacity: 0 }, { opacity: 1, duration: 0.3 }, at(4, 0.85));

// 5. step 3: typing dots, then message one pops (pop sfx)
beat('#s5', '#s5-card', 5);
pop('#s5-day', T.at(5) + 0.45);
tl.fromTo('#s5-typing', { scale: 0.6, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.3, ease: POP }, T.at(5) + 0.5);
tl.fromTo('#s5-typing i', { y: 0 }, { y: -10, duration: 0.2, yoyo: true, repeat: 3, ease: 'sine.inOut', stagger: 0.08 }, T.at(5) + 0.6);
tl.to('#s5-typing', { opacity: 0, duration: 0.15, ease: 'power3.in' }, T.voice(5) + 0.8);
tl.fromTo('#s5-msg', { y: 30, opacity: 0, scale: 0.9 }, { y: 0, opacity: 1, scale: 1, duration: 0.4, ease: POP }, T.voice(5) + 0.9);
tl.fromTo('#s5-btns .btn', { scale: 0.6, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.35, ease: POP, stagger: 0.07 }, at(5, 0.75));

// 6. the trick: no code on 1 and 2, the 10% waits for message 3
beat('#s6', '#s6-card', 6);
['#s6-r1', '#s6-r2', '#s6-r3'].forEach((id, i) => tl.fromTo(id, { x: 60, opacity: 0 }, { x: 0, opacity: 1, duration: 0.35, ease: OUT }, T.at(6) + 0.3 + i * 0.07));
tl.set('#s6-c3', { opacity: 0 }, T.at(6));
slam('#s6-c1', T.voice(6) + 0.1);
slam('#s6-c2', T.voice(6) + 0.3);
pop('#s6-c3', at(6, 0.45));
tl.fromTo('#s6-note', { filter: 'blur(12px)', opacity: 0 }, { filter: 'blur(0px)', opacity: 1, duration: 0.4, ease: OUT }, at(6, 0.72));
tl.fromTo('#s6-r3', { scale: 1 }, { scale: 1.05, duration: 0.25, yoyo: true, repeat: 1, ease: 'sine.inOut' }, at(6, 0.8));

// 7. the catch: stamp lands on the thud, kurtas get skipped, a goes-with message instead
beat('#s7', '#s7-card', 7);
['#s7-r1', '#s7-r2', '#s7-r3'].forEach((id, i) => tl.fromTo(id, { x: 60, opacity: 0 }, { x: 0, opacity: 1, duration: 0.35, ease: OUT }, T.at(7) + 0.3 + i * 0.07));
tl.fromTo('#s7-stamp', { scale: 2.2, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.25, ease: 'power4.in' }, T.voice(7) + 0.15);
pop('#s7-c1', at(7, 0.35));
pop('#s7-c2', at(7, 0.42));
slam('#s7-c3', at(7, 0.62));
shake('#s7-c3', at(7, 0.62) + 0.25);
tl.fromTo('#s7-bub', { y: 30, opacity: 0, scale: 0.9 }, { y: 0, opacity: 1, scale: 1, duration: 0.4, ease: POP }, at(7, 0.85));

// 8. save + comment: the ready message, keyword letters drop in
tl.fromTo('#save', { yPercent: 40, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.6, ease: OUT }, T.at(8));
tl.fromTo('#mark', { y: -120, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: 'bounce.out' }, T.at(8) + 0.3);
card('#s8-msg', T.at(8) + 0.15);
tl.fromTo('#pill', { scale: 0.6, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.45, ease: POP }, T.voice(8) + 0.1);
tl.fromTo('#s8-kw span', { yPercent: -120, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.35, ease: POP, stagger: 0.04 }, T.voice(8) + 0.3);
pop('#s8-free', at(8, 0.6));
tl.fromTo('#pill', { scale: 1 }, { scale: 1.05, duration: 0.3, yoyo: true, repeat: 3, ease: 'sine.inOut' }, T.end(8));
