// COD to confirmed in 3 messages. Hero per beat: parcel, seesaw, phone, order card, belt, kit, keyword bubble. Texture: drifting blobs.
const OUT = 'expo.out', P3 = 'power3.out', POP = 'back.out(1.8)', IN = 'power3.in', SLAM = 'power4.in';
const span = (n) => T.end(n) - T.voice(n);
const at = (n, f) => T.voice(n) + f * span(n);

// texture: background drifts the whole reel
tl.fromTo('#blobA', { x: 0, y: 0 }, { x: 240, y: 220, duration: T.dur, ease: 'sine.inOut' }, 0);
tl.fromTo('#blobB', { x: 0, y: 0 }, { x: -260, y: -300, duration: T.dur, ease: 'sine.inOut' }, 0);

// 0. hook: title and COD parcel on screen at frame 0; it heads out, U-turns back, RTO stamp slams
tl.fromTo('#s0 .kicker', { scale: 1.06 }, { scale: 1, duration: 0.5, ease: OUT }, 0);
tl.fromTo('#parcel', { x: 0, rotation: 0 }, { x: 70, rotation: 3, duration: 0.55, ease: 'power2.out' }, 0);
tl.fromTo('#ret-path', { strokeDashoffset: 1400 }, { strokeDashoffset: 0, duration: 0.95, ease: 'power2.inOut' }, 0.1);
tl.fromTo('#ret-head', { opacity: 0 }, { opacity: 1, duration: 0.15, ease: 'power2.out' }, 0.95);
tl.to('#parcel', { x: -50, rotation: -3, duration: 0.5, ease: 'power2.inOut' }, 0.7);
tl.fromTo('#stamp', { scale: 2.4, rotation: -26, opacity: 0 }, { scale: 1, rotation: -10, opacity: 1, duration: 0.25, ease: SLAM }, T.end(0) - 0.62);
tl.to('#parcel', { x: -36, duration: 0.05, repeat: 5, yoyo: true, ease: 'none' }, T.end(0) - 0.37);

// 1. the report: two blocks land, COD side sinks, FAR MORE slams (no invented numbers)
tl.fromTo('#s1 .kicker .l', { yPercent: 110 }, { yPercent: 0, duration: 0.5, ease: OUT, stagger: 0.08 }, T.at(1));
tl.fromTo('#report', { y: 160, opacity: 0 }, { y: 0, opacity: 1, duration: 0.55, ease: P3 }, T.at(1) + 0.12);
tl.fromTo('#b-cod', { y: -240, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: 'bounce.out' }, at(1, 0.36));
tl.fromTo('#b-pre', { y: -240, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: 'bounce.out' }, at(1, 0.44));
tl.fromTo('#beam', { rotation: 0 }, { rotation: -9, duration: 0.6, ease: 'back.out(1.6)' }, at(1, 0.72));
tl.fromTo('#verdict', { scale: 2, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.25, ease: SLAM }, at(1, 0.86));
tl.fromTo('#s1-foot', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.4, ease: P3 }, at(1, 0.9));

// 2-4. the phone: each message pops as it is named, replies type in, status flips to CONFIRMED
tl.fromTo('#s2 .kicker .l', { yPercent: 110 }, { yPercent: 0, duration: 0.5, ease: OUT }, T.at(2));
tl.fromTo('#phone', { y: 220, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: P3 }, T.at(2) + 0.08);
tl.fromTo('#chip-new', { scale: 0.6, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.35, ease: POP }, T.at(2) + 0.5);
tl.fromTo('#s2 .pill', { opacity: 0, y: -12 }, { opacity: 1, y: 0, duration: 0.35, ease: P3 }, T.at(2) + 0.56);
tl.fromTo('#chip-ok', { scale: 2, opacity: 0 }, { scale: 2, opacity: 0, duration: 0.01 }, T.at(2));

const send = (m, n, t) => {
  tl.fromTo(m, { scale: 0.5, opacity: 0, y: 30, transformOrigin: '100% 100%' }, { scale: 1, opacity: 1, y: 0, transformOrigin: '100% 100%', duration: 0.38, ease: POP }, t);
  tl.fromTo(n, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.35, ease: POP }, t + 0.06);
};
const reply = (ty, r, tType, tReply) => {
  tl.fromTo(ty, { opacity: 0, scale: 0.6, transformOrigin: '0% 100%' }, { opacity: 1, scale: 1, transformOrigin: '0% 100%', duration: 0.25, ease: POP }, tType);
  tl.fromTo(`${ty} i`, { y: 0 }, { y: -10, duration: 0.15, yoyo: true, repeat: 3, stagger: 0.08, ease: 'sine.inOut' }, tType + 0.1);
  tl.to(ty, { opacity: 0, duration: 0.12, ease: IN }, tReply - 0.06);
  tl.fromTo(r, { scale: 0.5, opacity: 0, transformOrigin: '0% 100%' }, { scale: 1, opacity: 1, transformOrigin: '0% 100%', duration: 0.38, ease: POP }, tReply);
};
send('#m1', '#n1', at(2, 0.6));
reply('#ty1', '#r1', at(2, 0.6) + 0.55, T.end(2) - 0.3);
send('#m2', '#n2', T.voice(3) + 0.1);
reply('#ty2', '#r2', T.voice(3) + 0.85, T.voice(3) + 1.6);
send('#m3', '#n3', T.voice(4) + 0.5);
const okT = at(4, 0.78);
tl.to('#chip-new', { scale: 0.6, opacity: 0, duration: 0.2, ease: IN }, okT);
tl.to('#chip-ok', { scale: 1, opacity: 1, duration: 0.25, ease: SLAM }, okT + 0.05);
tl.to('#phone', { scale: 1.025, duration: 0.14, yoyo: true, repeat: 1, ease: 'power2.out' }, okT + 0.3);

// 5. no reply: the order card pops, shakes, then drops into the call list slot
tl.fromTo('#s5 .kicker .l', { yPercent: 110 }, { yPercent: 0, duration: 0.5, ease: OUT, stagger: 0.08 }, T.at(5));
tl.fromTo('#calllist', { y: 160, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: P3 }, T.at(5) + 0.2);
tl.fromTo('#s5 .crow', { x: -80, opacity: 0 }, { x: 0, opacity: 1, duration: 0.35, ease: OUT, stagger: 0.07 }, T.at(5) + 0.4);
tl.fromTo('#slot', { opacity: 0 }, { opacity: 1, duration: 0.3, ease: P3 }, T.at(5) + 0.55);
tl.fromTo('#slot .fill', { opacity: 0 }, { opacity: 0, duration: 0.01 }, T.at(5));
tl.fromTo('#slot .txt', { opacity: 0, x: 40 }, { opacity: 0, x: 40, duration: 0.01 }, T.at(5));
tl.fromTo('#order', { scale: 0.5, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.38, ease: POP }, T.voice(5) + 0.5);
tl.fromTo('#order .sd', { scale: 0 }, { scale: 1, duration: 0.3, ease: POP, stagger: 0.06 }, T.voice(5) + 0.62);
tl.fromTo('#noreply', { x: 0 }, { x: 10, duration: 0.05, repeat: 5, yoyo: true, ease: 'none' }, T.voice(5) + 0.75);
const dropT = at(5, 0.72);
tl.to('#order', { y: 420, scale: 0.7, opacity: 0, duration: 0.4, ease: IN }, dropT);
tl.to('#slot .fill', { opacity: 1, duration: 0.18, ease: 'power2.out' }, dropT + 0.35);
tl.to('#slot .txt', { opacity: 1, x: 0, duration: 0.35, ease: OUT }, dropT + 0.35);
tl.to('#slot', { scale: 1.04, duration: 0.12, yoyo: true, repeat: 1, ease: 'power2.out' }, dropT + 0.35);

// 6. the belt: unsure parcels buzz, fall off, the YES parcels ship
tl.fromTo('#s6 .kicker .l', { yPercent: 110 }, { yPercent: 0, duration: 0.5, ease: OUT, stagger: 0.08 }, T.at(6));
tl.fromTo('#belt', { scaleX: 0, transformOrigin: '0% 50%' }, { scaleX: 1, transformOrigin: '0% 50%', duration: 0.4, ease: OUT }, T.at(6) + 0.05);
tl.fromTo('#truck', { x: 200, opacity: 0 }, { x: 0, opacity: 1, duration: 0.5, ease: P3 }, T.at(6) + 0.1);
tl.fromTo('#s6 .pk', { y: -120, opacity: 0 }, { y: 0, opacity: 1, duration: 0.35, ease: POP, stagger: 0.06 }, T.at(6) + 0.15);
tl.fromTo('#s6-ex', { opacity: 0 }, { opacity: 1, duration: 0.3, ease: P3 }, T.at(6) + 0.5);
tl.fromTo('#ship', { scale: 0, rotation: -20 }, { scale: 0, rotation: -20, duration: 0.01 }, T.at(6));
tl.to(['#pk2', '#pk4'], { x: 10, duration: 0.05, repeat: 5, yoyo: true, ease: 'none' }, T.voice(6) + 0.4);
tl.to(['#pk2', '#pk4'], { y: 440, rotation: 28, opacity: 0, duration: 0.3, ease: SLAM }, T.voice(6) + 0.62);
tl.fromTo('#drop-lbl', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.4, ease: P3 }, T.voice(6) + 1.0);
tl.to(['#pk1', '#pk3', '#pk5'], { scale: 1.08, duration: 0.12, yoyo: true, repeat: 1, ease: 'power2.out', stagger: 0.08 }, T.voice(6) + 1.3);
tl.to('#ship', { scale: 1, rotation: 0, duration: 0.4, ease: POP }, T.voice(6) + 1.7);
tl.to('#truck', { x: 30, duration: 0.4, ease: 'power2.inOut' }, T.voice(6) + 2.1);

// 7. the catch: three ticks, then "Sends them" gets an X and a strike, then who sends it
tl.fromTo('#s7 .kicker .l', { yPercent: 110 }, { yPercent: 0, duration: 0.5, ease: OUT, stagger: 0.08 }, T.at(7));
tl.fromTo('#kit', { y: 180, opacity: 0 }, { y: 0, opacity: 1, duration: 0.55, ease: P3 }, T.at(7) + 0.1);
tl.fromTo('#kit .ok', { x: -60, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4, ease: OUT, stagger: 0.08 }, T.at(7) + 0.35);
const xT = at(7, 0.28);
tl.fromTo('#k4', { x: -60, opacity: 0 }, { x: 0, opacity: 1, duration: 0.35, ease: OUT }, xT);
tl.fromTo('#xic', { scale: 0 }, { scale: 1, duration: 0.35, ease: POP }, xT + 0.1);
tl.fromTo('#strike', { scaleX: 0, transformOrigin: '0% 50%' }, { scaleX: 1, transformOrigin: '0% 50%', duration: 0.3, ease: 'power2.inOut' }, xT + 0.25);
tl.to('#k4', { x: 12, duration: 0.05, repeat: 5, yoyo: true, ease: 'none' }, xT + 0.55);
tl.fromTo('#you-send', { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.45, ease: OUT }, at(7, 0.62));
tl.to('#you-send', { scale: 1.05, duration: 0.14, yoyo: true, repeat: 1, ease: 'power2.out' }, at(7, 0.62) + 0.5);

// 8. comment RTO: letters drop into the bubble on the beat, then the free kit sticker
tl.fromTo('#s8 .kicker .l', { yPercent: 110 }, { yPercent: 0, duration: 0.5, ease: OUT }, T.at(8));
tl.fromTo('#avatar', { scale: 0 }, { scale: 1, duration: 0.4, ease: POP }, T.at(8) + 0.1);
tl.fromTo('#bubble', { scale: 0.4, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.45, ease: POP }, T.at(8) + 0.2);
tl.fromTo('#bubble .ch', { y: -180, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: 'bounce.out', stagger: T.beat / 2 }, T.voice(8) + 0.2);
tl.fromTo('#sticker', { scale: 0, rotation: -30 }, { scale: 1, rotation: 6, duration: 0.45, ease: POP }, T.voice(8) + 1.4);
tl.fromTo('#s8 .sub', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: OUT, stagger: 0.08 }, T.voice(8) + 2.2);
tl.to('#bubble', { scale: 1.04, duration: T.beat / 2, yoyo: true, repeat: 3, ease: 'sine.inOut' }, T.voice(8) + 3.0);
tl.fromTo('#sent', { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: POP }, T.end(8) - 0.2);
