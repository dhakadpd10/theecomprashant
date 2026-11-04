// Editorial skit, kind "skit": uncle's lines land as big serif props above the centred host,
// the clock jumps 2 hours, the WhatsApp ask pops on the whistle, then the real card (what you charge for) and the quiet CLIENT card.
const OUT = 'expo.out', POP = 'back.out(1.8)';
const span = (n) => T.end(n) - T.voice(n);
const at = (n, f) => T.voice(n) + f * span(n);
const reveal = (sel, t) => tl.fromTo(sel, { yPercent: 110 }, { yPercent: 0, duration: 0.55, ease: OUT, stagger: 0.08 }, t);
const kick = (sel, t) => tl.fromTo(sel, { y: -20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: OUT }, t);

// texture: slow drifting colour across the whole reel
tl.fromTo('#blob1', { x: 0, y: 0 }, { x: 160, y: 120, duration: T.dur, ease: 'sine.inOut' }, 0);
tl.fromTo('#blob2', { x: 0, y: 0 }, { x: -180, y: -140, duration: T.dur, ease: 'sine.inOut' }, 0);

// 0. hook: the price question is on screen at frame 0
tl.fromTo('#s0-title .l', { yPercent: 0 }, { yPercent: 0, duration: 0.01 }, 0);
tl.fromTo('#s0-title', { scale: 1.06 }, { scale: 1, duration: 0.6, ease: OUT }, 0);
tl.to('#s0-title', { scale: 1.05, duration: 0.18, yoyo: true, repeat: 1, ease: 'sine.inOut' }, at(0, 0.45));
tl.fromTo('#s0-line2', { x: 0 }, { x: 8, duration: 0.05, repeat: 5, yoyo: true, ease: 'none' }, at(0, 0.8));

// 1. AI helps, then the slow lean-in punch
kick('#s1 .kick', T.at(1));
reveal('#s1 .title .l', T.at(1) + 0.05);
tl.fromTo('#s1-note', { scale: 0.6, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: POP }, at(1, 0.55));
tl.fromTo('#s1-title', { scale: 1 }, { scale: 1.12, duration: T.end(1) - at(1, 0.55) + 0.1, ease: 'power2.inOut' }, at(1, 0.55));

// 2. paying you: the title slams on the thud, the price tag swings
kick('#s2 .kick', T.at(2));
tl.fromTo('#s2-title', { scale: 1.6, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.25, ease: 'power4.in' }, T.voice(2) - 0.05);
tl.fromTo('#s2-tag', { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: OUT }, T.at(2) + 0.08);
tl.fromTo('#s2-tag', { rotation: 0 }, { rotation: 6, duration: 0.06, repeat: 5, yoyo: true, ease: 'none' }, T.voice(2) + 0.22);

// 3. the big one: suspense dots
kick('#s3 .kick', T.at(3));
reveal('#s3 .title .l', T.at(3) + 0.05);
tl.fromTo('#s3-dots i', { opacity: 0 }, { opacity: 1, duration: 0.2, stagger: 0.06 }, T.at(3) + 0.2);
tl.fromTo('#s3-dots i', { y: 0 }, { y: -26, duration: 0.15, yoyo: true, repeat: 3, ease: 'sine.inOut', stagger: 0.08 }, T.voice(3) + 0.3);

// 4. my nephew: the ChatGPT chip pops, then shakes on the buzz
kick('#s4 .kick', T.at(4));
reveal('#s4 .title .l', T.at(4) + 0.05);
tl.fromTo('#s4-chip', { scale: 0.6, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.35, ease: POP }, T.voice(4) + 0.2);
tl.fromTo('#s4-chip', { x: 0 }, { x: 10, duration: 0.05, repeat: 7, yoyo: true, ease: 'none' }, T.voice(4) + 0.6);
tl.to('#s4-title', { scale: 1.05, duration: 0.15, yoyo: true, repeat: 1, ease: 'sine.inOut' }, T.voice(4) + 0.6);

// 5. fine, uncle: the quote heads to the nephew, pill pops on the pop sound
kick('#s5 .kick', T.at(5));
reveal('#s5 .title .l', T.at(5) + 0.05);
tl.fromTo('#s5-tag', { x: 120, opacity: 0 }, { x: 0, opacity: 1, duration: 0.45, ease: OUT }, T.at(5) + 0.15);
tl.fromTo('#s5-arrow', { scaleX: 0, transformOrigin: 'left center' }, { scaleX: 1, duration: 0.3, ease: 'power2.out' }, T.voice(5) + 0.5);
tl.fromTo('#s5-pill', { scale: 0.4, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.35, ease: POP }, T.voice(5) + 0.8);
tl.to('#s5-tag', { y: 12, rotation: -6, duration: 0.35, ease: 'power2.out' }, T.voice(5) + 0.9);

// 6. two hours later: the clock spins, the counter runs, the notification drops in
tl.fromTo('#s6-clock', { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.45, ease: POP }, T.at(6));
tl.fromTo('#s6-count', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.45, ease: OUT }, T.at(6) + 0.08);
tl.fromTo('#s6-lab', { opacity: 0 }, { opacity: 1, duration: 0.3, ease: 'power2.out' }, T.at(6) + 0.16);
const clk = { m: 0 };
tl.fromTo(clk, { m: 0 }, {
  m: 120, duration: 1.2, ease: 'power2.inOut',
  onUpdate: () => {
    const m = Math.round(clk.m);
    document.getElementById('s6-count').textContent = '+' + Math.floor(m / 60) + ':' + String(m % 60).padStart(2, '0');
  }
}, T.voice(6) + 0.1);
tl.fromTo('#s6-min', { rotation: 0 }, { rotation: 720, svgOrigin: '100 100', duration: 1.2, ease: 'power2.inOut' }, T.voice(6) + 0.1);
tl.fromTo('#s6-hr', { rotation: 0 }, { rotation: 60, svgOrigin: '100 100', duration: 1.2, ease: 'power2.inOut' }, T.voice(6) + 0.1);
tl.fromTo('#s6-note', { y: -60, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: OUT }, at(6, 0.5));

// 7. the ask: video bubble, typing, the "small thing" message, the scribble on the whistle
tl.fromTo('#s7-card', { y: -40, opacity: 0, scale: 0.97 }, { y: 0, opacity: 1, scale: 1, duration: 0.5, ease: OUT }, T.at(7));
tl.fromTo('#s7-vid', { x: -40, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4, ease: OUT }, T.at(7) + 0.2);
tl.fromTo('#s7-typing', { opacity: 0 }, { opacity: 1, duration: 0.15, ease: 'power2.out' }, T.voice(7) + 0.5);
tl.fromTo('#s7-typing i', { y: 0 }, { y: -10, duration: 0.15, yoyo: true, repeat: 3, stagger: 0.08, ease: 'sine.inOut' }, T.voice(7) + 0.55);
tl.to('#s7-typing', { opacity: 0, duration: 0.1, ease: 'power2.in' }, at(7, 0.42));
tl.fromTo('#s7-msg', { scale: 0.6, opacity: 0, transformOrigin: 'left bottom' }, { scale: 1, opacity: 1, duration: 0.35, ease: POP }, at(7, 0.42) + 0.05);
tl.fromTo('#s7-ul', { scaleX: 0, transformOrigin: 'left center' }, { scaleX: 1, duration: 0.35, ease: 'power3.out' }, at(7, 0.8));
tl.fromTo('#s7-note', { scale: 2, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.25, ease: 'power4.in' }, at(7, 0.85));

// 8. the real card: three things you charge for, then the tool gets struck out
kick('#s8-kick', T.at(8));
reveal('#s8 .title .l', T.at(8) + 0.05);
tl.fromTo('#s8-card', { y: 100, opacity: 0, scale: 0.96 }, { y: 0, opacity: 1, scale: 1, duration: 0.6, ease: OUT }, T.at(8) + 0.15);
[['#s8-r1', T.voice(8) + 0.4], ['#s8-r2', at(8, 0.45)], ['#s8-r3', at(8, 0.62)]].forEach(([id, t]) => {
  tl.fromTo(id, { x: 60, opacity: 0 }, { x: 0, opacity: 1, duration: 0.35, ease: OUT }, t);
  tl.fromTo(`${id} .n`, { scale: 0 }, { scale: 1, duration: 0.35, ease: POP }, t + 0.06);
});
tl.fromTo('#s8-tool', { x: 60, opacity: 0 }, { x: 0, opacity: 1, duration: 0.35, ease: OUT }, at(8, 0.78));
tl.fromTo('#s8-strike', { scaleX: 0, transformOrigin: 'left center' }, { scaleX: 1, duration: 0.25, ease: 'power4.in' }, at(8, 0.88));
tl.to('#s8-tool', { scale: 1.04, duration: 0.18, yoyo: true, repeat: 1, ease: 'sine.inOut' }, at(8, 0.88) + 0.25);
tl.fromTo('#s8-foot', { opacity: 0 }, { opacity: 1, duration: 0.35, ease: 'power2.out' }, at(8, 0.92));

// 9. send this, the free prompt card, then the quiet CLIENT card with its letters dropping in
reveal('#s9 .title .l', T.at(9));
tl.fromTo('#s9-to', { x: -30, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4, ease: OUT }, T.at(9) + 0.25);
tl.fromTo('#s9-card', { y: 100, opacity: 0, scale: 0.96 }, { y: 0, opacity: 1, scale: 1, duration: 0.6, ease: OUT }, T.voice(9) + 0.35);
tl.fromTo('#s9-mark', { y: -30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: POP }, T.voice(9) + 0.6);
['#s9-c1', '#s9-c2', '#s9-c3'].forEach((id, i) => tl.fromTo(id, { x: 50, opacity: 0 }, { x: 0, opacity: 1, duration: 0.35, ease: OUT }, T.voice(9) + 0.8 + i * 0.07));
tl.fromTo('#s9 .tick', { scale: 0 }, { scale: 1, duration: 0.3, ease: POP, stagger: 0.07 }, T.voice(9) + 0.9);
tl.fromTo('#s9-pill', { scale: 0.9, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.45, ease: POP }, at(9, 0.62));
tl.fromTo('#s9-pill .ch', { yPercent: -120, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.4, ease: POP, stagger: 0.06 }, at(9, 0.62) + 0.2);
tl.to('#s9-pill', { scale: 1.05, duration: 0.2, yoyo: true, repeat: 1, ease: 'sine.inOut' }, T.end(9) + 0.1);
