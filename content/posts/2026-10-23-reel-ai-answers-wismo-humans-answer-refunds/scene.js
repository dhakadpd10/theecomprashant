// AI answers the same 5, refunds stay human. Hero per beat: inbox, the 5, the two lanes, the catch, the draft, the keyword.
const OUT = 'expo.out', POP = 'back.out(1.8)', SLAM = 'power4.in';
const span = (n) => T.end(n) - T.voice(n);
const at = (n, f) => T.voice(n) + f * span(n);

// texture: background drifts for the whole reel
tl.fromTo('#blobA', { x: 0, y: 0 }, { x: 240, y: 220, duration: T.dur, ease: 'sine.inOut' }, 0);
tl.fromTo('#blobB', { x: 0, y: 0 }, { x: -260, y: -240, duration: T.dur, ease: 'sine.inOut' }, 0);
tl.fromTo('#blobC', { x: 0, y: 0 }, { x: 200, y: -160, duration: T.dur, ease: 'sine.inOut' }, 0);

// 0. hook: inbox already full of the same question, you type it again, then the policy is pasted once
tl.fromTo('#s0 .kicker', { scale: 1.08 }, { scale: 1, duration: 0.5, ease: OUT }, 0);
tl.fromTo('#inbox', { y: 60 }, { y: 0, duration: 0.6, ease: OUT }, 0);
tl.fromTo(['#m0', '#m1'], { x: -30 }, { x: 0, duration: 0.45, ease: OUT, stagger: 0.06 }, 0);
tl.fromTo('#m2', { scale: 0.6, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.35, ease: POP }, 0.45);
tl.fromTo('#m3', { scale: 0.6, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.35, ease: POP }, 0.95);
tl.fromTo('#type .txt', { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 1.4, ease: 'steps(24)' }, 0.3);
tl.fromTo('#inbox', { x: 0 }, { x: 12, duration: 0.05, repeat: 5, yoyo: true, ease: 'none' }, 1.95);
tl.fromTo('#pdoc', { y: 180, rotation: 4, opacity: 0 }, { y: 0, rotation: -2, opacity: 1, duration: 0.55, ease: OUT }, at(0, 0.55));
tl.fromTo('#pdoc .v', { scaleX: 0 }, { scaleX: 1, duration: 0.4, ease: OUT, stagger: 0.07 }, at(0, 0.55) + 0.25);
tl.fromTo('#pstamp', { scale: 2.4, rotation: -22, opacity: 0 }, { scale: 1, rotation: -8, opacity: 1, duration: 0.26, ease: SLAM }, at(0, 0.86));
tl.fromTo('#pdoc', { scale: 1 }, { scale: 1.03, duration: 0.1, yoyo: true, repeat: 1, ease: 'power2.out', immediateRender: false }, at(0, 0.86) + 0.26);

// 1. festive week: the big 5, the clock starts running
tl.fromTo('#big5', { scale: 0.2, rotation: -20, opacity: 0 }, { scale: 1, rotation: 0, opacity: 1, duration: 0.5, ease: POP }, T.at(1));
tl.fromTo('#s1-head .l', { yPercent: 110 }, { yPercent: 0, duration: 0.5, ease: OUT, stagger: 0.08 }, T.at(1) + 0.1);
tl.fromTo('#fest', { scale: 0, rotation: -14 }, { scale: 1, rotation: -3, duration: 0.45, ease: POP }, T.voice(1) + 0.15);
tl.fromTo('#big5', { scale: 1 }, { scale: 1.12, duration: 0.15, yoyo: true, repeat: 1, ease: 'power2.out', immediateRender: false }, at(1, 0.55));
tl.fromTo('#clock', { scale: 0.5, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: POP }, at(1, 0.8));
const clk = { h: 9 };
tl.fromTo(clk, { h: 9 }, { h: 23.9, duration: T.end(3) - at(1, 0.8), ease: 'none', onUpdate: () => {
  const H = Math.floor(clk.h);
  const M = Math.floor(((clk.h - H) * 60) / 5) * 5;
  const h12 = H % 12 || 12;
  document.getElementById('clk').textContent = `${h12}:${String(M).padStart(2, '0')} ${H >= 12 ? 'PM' : 'AM'}`;
} }, at(1, 0.8));

// 2-3. each question pops in as it is asked, with copies stacking behind it (asked again and again)
const ask = (i, t) => {
  tl.fromTo(`#a${i}`, { scale: 0.6, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: POP }, t);
  tl.fromTo(`#a${i} .g1`, { x: -14, y: -14, opacity: 0 }, { x: 0, y: 0, opacity: 1, duration: 0.3, ease: OUT }, t + 0.12);
  tl.fromTo(`#a${i} .g2`, { x: -28, y: -28, opacity: 0 }, { x: 0, y: 0, opacity: 1, duration: 0.3, ease: OUT }, t + 0.2);
};
[0, 0.36, 0.7].forEach((f, i) => ask(i, at(2, f)));
[0, 0.5].forEach((f, i) => ask(i + 3, at(3, f)));
tl.fromTo('#s1 .ask', { x: 0 }, { x: 8, duration: 0.05, repeat: 5, yoyo: true, ease: 'none' }, T.end(3) - 0.15);

// 4. your policies feed the AI lane; each question gets a drafted answer on the beat
tl.fromTo('#pol', { y: -60, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: OUT }, T.at(4));
tl.fromTo('#pol .chip', { scale: 0.6, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.35, ease: POP, stagger: 0.06 }, T.at(4) + 0.15);
tl.fromTo('#laneL', { y: 80, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: OUT }, T.at(4) + 0.08);
tl.fromTo('#laneR', { opacity: 0 }, { opacity: 0.4, duration: 0.4, ease: 'power2.out' }, T.at(4) + 0.15);
tl.fromTo('#wire', { scaleY: 0 }, { scaleY: 1, duration: 0.3, ease: OUT }, T.voice(4) + 0.3);
tl.fromTo('#laneL .dc', { x: -50, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4, ease: OUT, stagger: 0.07 }, T.voice(4) + 0.2);
for (let k = 0; k < 5; k++) {
  tl.fromTo(`#d${k} .tk`, { scale: 0.3, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.25, ease: POP }, T.voice(4) + 0.6 + k * T.beat * 0.5);
}
tl.fromTo('#pol', { scale: 1 }, { scale: 1.04, duration: 0.12, yoyo: true, repeat: 1, ease: 'power2.out', immediateRender: false }, at(4, 0.85));

// 5. refunds and angry customers slam into the human lane
tl.to('#laneR', { opacity: 1, duration: 0.3, ease: 'power2.out' }, T.at(5));
tl.fromTo('#laneR .lh', { scale: 0.8 }, { scale: 1, duration: 0.4, ease: POP }, T.at(5));
tl.fromTo('#you', { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.45, ease: OUT }, T.at(5) + 0.1);
tl.fromTo('#h0', { scale: 1.5, rotation: -6, opacity: 0 }, { scale: 1, rotation: 0, opacity: 1, duration: 0.25, ease: SLAM }, T.voice(5) + 0.55);
tl.fromTo('#h1', { scale: 1.5, rotation: 5, opacity: 0 }, { scale: 1, rotation: 0, opacity: 1, duration: 0.25, ease: SLAM }, at(5, 0.62));
tl.fromTo('#you', { scale: 1 }, { scale: 1.08, duration: 0.12, yoyo: true, repeat: 1, ease: 'power2.out', immediateRender: false }, at(5, 0.62) + 0.25);

// 6. the catch: a question outside the pasted policy gets flagged, not answered
tl.fromTo('#s6 .kicker .l', { yPercent: 110 }, { yPercent: 0, duration: 0.5, ease: OUT, stagger: 0.08 }, T.at(6));
tl.fromTo('#cdoc', { y: 120, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: OUT }, T.at(6) + 0.1);
tl.fromTo('#s6 .kicker', { x: 0 }, { x: 12, duration: 0.05, repeat: 7, yoyo: true, ease: 'none' }, T.voice(6) + 0.4);
tl.fromTo('#cq', { scale: 0.6, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: POP }, T.voice(6) + 0.7);
tl.fromTo('#cscan', { y: 0, opacity: 0 }, { y: 140, opacity: 1, duration: 0.6, ease: 'sine.inOut' }, T.voice(6) + 0.95);
tl.fromTo('#crep', { x: 100, opacity: 0 }, { x: 0, opacity: 1, duration: 0.45, ease: OUT }, T.voice(6) + 1.5);
tl.fromTo('#crep .fl', { scale: 0, rotation: -30 }, { scale: 1, rotation: 0, duration: 0.4, ease: POP }, T.voice(6) + 1.65);

// 7. no tracking, no sending: strike them out; then you copy, you send
tl.fromTo('#no1', { x: -80, opacity: 0 }, { x: 0, opacity: 1, duration: 0.45, ease: OUT }, T.at(7));
tl.fromTo('#no1 .x', { scale: 0 }, { scale: 1, duration: 0.35, ease: POP }, T.at(7) + 0.1);
tl.fromTo('#draft', { y: 140, opacity: 0 }, { y: 0, opacity: 1, duration: 0.55, ease: OUT }, T.at(7) + 0.2);
tl.fromTo('#draft .ln', { scaleX: 0 }, { scaleX: 1, duration: 0.4, ease: OUT, stagger: 0.07 }, T.at(7) + 0.5);
tl.fromTo('#no1 .st', { scaleX: 0 }, { scaleX: 1, duration: 0.3, ease: 'power2.inOut' }, at(7, 0.2));
tl.to('#no1 .t', { opacity: 0.45, duration: 0.2, ease: 'power2.out' }, at(7, 0.2) + 0.25);
tl.fromTo('#no2', { x: -80, opacity: 0 }, { x: 0, opacity: 1, duration: 0.45, ease: OUT }, at(7, 0.28));
tl.fromTo('#no2 .x', { scale: 0 }, { scale: 1, duration: 0.35, ease: POP }, at(7, 0.28) + 0.1);
tl.fromTo('#no2 .st', { scaleX: 0 }, { scaleX: 1, duration: 0.3, ease: 'power2.inOut' }, at(7, 0.52));
tl.to('#no2 .t', { opacity: 0.45, duration: 0.2, ease: 'power2.out' }, at(7, 0.52) + 0.25);
tl.fromTo('#copy', { scale: 1 }, { scale: 0.9, duration: 0.1, yoyo: true, repeat: 1, ease: 'power2.out' }, at(7, 0.74));
tl.to('#copy', { backgroundColor: '#39FF88', color: '#0E0B1F', duration: 0.15, ease: 'power2.out' }, at(7, 0.74) + 0.1);
tl.fromTo('#send', { scale: 1 }, { scale: 0.9, duration: 0.1, yoyo: true, repeat: 1, ease: 'power2.out' }, at(7, 0.92));
tl.to('#send', { backgroundColor: '#39FF88', color: '#0E0B1F', duration: 0.15, ease: 'power2.out' }, at(7, 0.92) + 0.1);
tl.fromTo('#plane', { x: 0, y: 0 }, { x: 30, y: -18, duration: 0.3, ease: OUT }, at(7, 0.92) + 0.05);

// 8. comment SUPPORT: letters drop in, the sticker slams on the ding
tl.fromTo('#s8 .kicker .l', { yPercent: 110 }, { yPercent: 0, duration: 0.5, ease: OUT }, T.at(8));
tl.fromTo('#avatar', { scale: 0 }, { scale: 1, duration: 0.4, ease: POP }, T.at(8) + 0.05);
tl.fromTo('#bubble', { scale: 0.4, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.45, ease: POP }, T.at(8) + 0.1);
tl.fromTo('#bubble .ch', { y: -150, opacity: 0 }, { y: 0, opacity: 1, duration: 0.32, ease: 'bounce.out', stagger: 0.06 }, T.at(8) + 0.2);
tl.fromTo('#sticker', { scale: 2.2, rotation: -20, opacity: 0 }, { scale: 1, rotation: 5, opacity: 1, duration: 0.25, ease: SLAM }, T.voice(8) + 0.25);
tl.fromTo('#gets .get', { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: OUT, stagger: 0.07 }, T.voice(8) + 0.9);
tl.fromTo('#bubble', { scale: 1 }, { scale: 1.04, duration: T.beat / 2, yoyo: true, repeat: 3, ease: 'sine.inOut', immediateRender: false }, T.voice(8) + 1.5);
