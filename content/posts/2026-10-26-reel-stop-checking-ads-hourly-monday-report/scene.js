// Stop refreshing ROAS: midnight phone -> 6h of a week -> refresh button -> Monday paste -> verdicts -> the catch -> thin data -> SCALE.
const OUT = 'expo.out', P3 = 'power3.out', POP = 'back.out(1.8)', IN = 'power3.in', SLAM = 'power4.in';
const span = (n) => T.end(n) - T.voice(n);
const at = (n, f) => T.voice(n) + f * span(n);
const r = T.rand(11);

// texture: slow drift all reel
tl.fromTo('#blobA', { x: 0, y: 0 }, { x: 240, y: 180, duration: T.dur, ease: 'sine.inOut' }, 0);
tl.fromTo('#blobB', { x: 0, y: 0 }, { x: -260, y: -240, duration: T.dur, ease: 'sine.inOut' }, 0);
tl.fromTo('#blobC', { x: 0, y: 0, scale: 1 }, { x: -120, y: 160, scale: 1.2, duration: T.dur, ease: 'sine.inOut' }, 0);

// 0. hook: the phone is already there, ROAS flickers, refresh spins, then 1 report Monday
tl.fromTo('#s0 .kicker', { scale: 1.06 }, { scale: 1, duration: 0.5, ease: OUT }, 0);
tl.fromTo('#phone', { y: 70, rotation: 3 }, { y: 0, rotation: -1.5, duration: 0.7, ease: OUT }, 0);
const H = [0, 1, 2, 3].map(() => [0, 1, 2, 3, 4, 5].map(() => 0.2 + 0.8 * r()));
tl.fromTo('#s0 .bar', { scaleY: (i) => H[0][i] }, { scaleY: (i) => H[1][i], duration: 0.45, ease: 'power2.inOut', stagger: 0.03 }, 0.15);
tl.to('#s0 .bar', { scaleY: (i) => H[2][i], duration: 0.45, ease: 'power2.inOut', stagger: 0.03 }, 1.05);
tl.to('#s0 .bar', { scaleY: (i) => H[3][i], duration: 0.45, ease: 'power2.inOut', stagger: 0.03 }, 1.8);
[0.3, 1.0, 1.75, 2.3].forEach((t, k) => tl.fromTo('#s0-ref', { rotation: k * 360 }, { rotation: (k + 1) * 360, duration: 0.45, ease: 'power2.inOut' }, t));
const RO = ['2.1', '1.4', '2.8', '0.9', '1.7', '3.2', '1.1', '2.4'];
const ro = { v: 0 };
tl.fromTo(ro, { v: 0 }, { v: RO.length - 0.01, duration: 2.4, ease: 'none', onUpdate: () => { document.getElementById('s0-roas').textContent = RO[Math.min(RO.length - 1, Math.floor(ro.v))]; } }, 0.2);
const ck = { m: 4 };
tl.fromTo(ck, { m: 4 }, { m: 9, duration: 2.6, ease: 'none', onUpdate: () => { document.getElementById('s0-clock').textContent = '12:' + String(Math.floor(ck.m)).padStart(2, '0') + ' AM'; } }, 0.1);
tl.to('#phone', { opacity: 0.35, scale: 0.95, duration: 0.4, ease: 'power2.inOut' }, at(0, 0.58));
tl.fromTo('#s0-stk', { scale: 0, rotation: -20, opacity: 0 }, { scale: 1, rotation: -4, opacity: 1, duration: 0.45, ease: POP }, at(0, 0.62));
tl.to('#s0-stk', { scale: 1.06, duration: 0.15, yoyo: true, repeat: 1, ease: 'power2.out' }, at(0, 0.9));

// 1. six hours is a sliver of the week: pin drops on the buzz, GUESS slams on "guess"
tl.fromTo('#s1-big', { scale: 0.6, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.45, ease: POP }, T.at(1));
tl.fromTo('#s1-card', { y: 160, opacity: 0 }, { y: 0, opacity: 1, duration: 0.55, ease: OUT }, T.at(1) + 0.08);
tl.fromTo('#s1 .days span', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.3, ease: P3, stagger: 0.05 }, T.at(1) + 0.3);
tl.fromTo('#s1-seg', { scaleX: 0 }, { scaleX: 1, duration: 0.3, ease: P3 }, T.voice(1) + 0.55);
tl.fromTo('#s1-pin', { y: -90, opacity: 0 }, { y: 0, opacity: 1, duration: 0.25, ease: SLAM }, T.voice(1) + 0.65);
tl.fromTo('#s1-card', { x: 0 }, { x: 12, duration: 0.05, repeat: 5, yoyo: true, ease: 'none' }, T.voice(1) + 0.9);
tl.fromTo('#s1-guess', { scale: 2.3, rotation: -22, opacity: 0 }, { scale: 1, rotation: -8, opacity: 1, duration: 0.25, ease: SLAM }, at(1, 0.84) - 0.25);
tl.to('#s1-card', { opacity: 0.45, duration: 0.25, ease: 'power2.out' }, at(1, 0.84) - 0.02);

// 2. built for refreshing: the button keeps getting pressed, the count climbs
tl.fromTo('#s2 .kicker .l', { yPercent: 110 }, { yPercent: 0, duration: 0.5, ease: OUT, stagger: 0.08 }, T.at(2));
tl.fromTo('#s2-btn', { scale: 0.3, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.5, ease: POP }, T.at(2) + 0.1);
tl.fromTo('#s2-count', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.4, ease: OUT }, T.at(2) + 0.2);
tl.fromTo('#s2-lbl', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.4, ease: OUT }, T.at(2) + 0.28);
[0.6, 1.15, 1.55, 2.2, 2.6].forEach((d, k) => {
  const t = T.voice(2) + d;
  tl.to('#s2-btn', { scale: 0.93, duration: 0.08, yoyo: true, repeat: 1, ease: 'power2.out' }, t);
  tl.fromTo('#s2-arrow', { rotation: k * 360 }, { rotation: (k + 1) * 360, duration: 0.45, ease: 'power2.inOut' }, t);
});
const rc = { n: 0 };
tl.fromTo(rc, { n: 0 }, { n: 37, duration: span(2), ease: 'power1.in', onUpdate: () => { document.getElementById('s2-count').textContent = String(Math.round(rc.n)); } }, T.voice(2));

// 3. Monday slams on the thud, last 7 days fill to the ding, export rows drop into the report
tl.fromTo('#s3-k1', { yPercent: 110 }, { yPercent: 0, duration: 0.5, ease: OUT }, T.at(3));
tl.fromTo('#s3-mon', { scale: 1.9, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.25, ease: SLAM }, T.voice(3) + 0.25);
tl.fromTo('#s3 .day', { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: OUT, stagger: 0.05 }, T.at(3) + 0.15);
tl.to('#s3 .df', { opacity: 1, duration: 0.15, ease: 'power1.out', stagger: 0.07 }, T.voice(3) + 0.82);
tl.to('#s3 .dl', { color: '#0E1A17', duration: 0.15, ease: 'power1.out', stagger: 0.07 }, T.voice(3) + 0.82);
tl.fromTo('#s3-brk', { scaleX: 0 }, { scaleX: 1, duration: 0.3, ease: P3 }, T.voice(3) + 1.0);
tl.fromTo('#s3-brk-l', { scale: 0.5, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.3, ease: POP }, T.voice(3) + 1.0);
tl.to('#s3-week', { scale: 1.04, duration: 0.12, yoyo: true, repeat: 1, ease: 'power2.out' }, T.voice(3) + 1.3);
tl.fromTo('#s3-sheet', { y: 90, opacity: 0 }, { y: 0, opacity: 1, duration: 0.45, ease: OUT }, T.voice(3) + 1.15);
tl.fromTo('#s3-slot', { y: 90, opacity: 0 }, { y: 0, opacity: 1, duration: 0.45, ease: OUT }, T.voice(3) + 1.25);
tl.fromTo('#s3-r1', { y: 0, scale: 1, opacity: 1 }, { y: 360, scale: 0.6, opacity: 0, duration: 0.35, ease: IN }, T.voice(3) + 1.9);
tl.fromTo('#s3-r2', { y: 0, scale: 1, opacity: 1 }, { y: 290, scale: 0.6, opacity: 0, duration: 0.35, ease: IN }, T.voice(3) + 2.04);
tl.fromTo('#s3-r3', { y: 0, scale: 1, opacity: 1 }, { y: 220, scale: 0.6, opacity: 0, duration: 0.35, ease: IN }, T.voice(3) + 2.18);
tl.to('#s3-slot .sf', { opacity: 1, duration: 0.2, ease: 'power1.out' }, T.voice(3) + 2.45);
tl.to('#s3-st', { color: '#0E1A17', duration: 0.2, ease: 'power1.out' }, T.voice(3) + 2.45);
tl.to('#s3-slot', { scale: 1.05, duration: 0.14, yoyo: true, repeat: 1, ease: 'power2.out' }, T.voice(3) + 2.45);
tl.to('#s3-sheet', { opacity: 0.35, duration: 0.3, ease: 'power2.out' }, T.voice(3) + 2.45);
tl.to('#s3-slot', { scale: 1.05, duration: 0.14, yoyo: true, repeat: 1, ease: 'power2.out' }, at(3, 0.8));

// 4. the report: KILL on the thud, KEEP, SCALE, bump on the ding, then the reasons light up
tl.fromTo('#s4 .kicker .l', { yPercent: 110 }, { yPercent: 0, duration: 0.5, ease: OUT }, T.at(4));
tl.fromTo('#s4-rep', { y: 120, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: OUT }, T.at(4) + 0.03);
tl.fromTo('#s4 .vrow', { x: 90, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4, ease: OUT, stagger: 0.07 }, T.at(4) + 0.18);
const land1 = T.voice(4) + 0.5, land2 = T.voice(4) + 0.8, land3 = T.voice(4) + 1.08;
tl.fromTo('#s4-c1', { scale: 2.2, rotation: -12, opacity: 0 }, { scale: 1, rotation: 0, opacity: 1, duration: 0.25, ease: SLAM }, land1 - 0.25);
tl.fromTo('#s4-w1', { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 0.25, ease: 'power2.out' }, land1 - 0.25);
tl.fromTo('#s4-c2', { scale: 2.2, rotation: -12, opacity: 0 }, { scale: 1, rotation: 0, opacity: 1, duration: 0.25, ease: SLAM }, land2 - 0.25);
tl.fromTo('#s4-w2', { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 0.25, ease: 'power2.out' }, land2 - 0.25);
tl.fromTo('#s4-c3', { scale: 2.2, rotation: -12, opacity: 0 }, { scale: 1, rotation: 0, opacity: 1, duration: 0.25, ease: SLAM }, land3 - 0.25);
tl.fromTo('#s4-w3', { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 0.25, ease: 'power2.out' }, land3 - 0.25);
tl.to('#s4-v1', { x: 10, duration: 0.05, repeat: 5, yoyo: true, ease: 'none' }, land1 + 0.02);
tl.to('#s4-v3', { scale: 1.04, duration: 0.14, yoyo: true, repeat: 1, ease: 'power2.out' }, T.voice(4) + 1.3);
tl.to('#s4-v3', { borderColor: 'rgba(124,245,176,1)', duration: 0.2, ease: 'power2.out' }, T.voice(4) + 1.3);
tl.to('#s4 .why', { color: '#7CF5B0', duration: 0.25, ease: 'power2.out', stagger: 0.08 }, at(4, 0.72));

// 5. the catch: the export goes in, Ads Manager stays locked
tl.fromTo('#s5 .kicker .l', { yPercent: 110 }, { yPercent: 0, duration: 0.5, ease: OUT }, T.at(5));
tl.fromTo('#s5-file', { x: -80, opacity: 0, rotation: -6 }, { x: 0, opacity: 1, rotation: -3, duration: 0.5, ease: OUT }, T.at(5) + 0.05);
tl.fromTo('#s5-box', { x: 80, opacity: 0 }, { x: 0, opacity: 1, duration: 0.5, ease: OUT }, T.at(5) + 0.12);
tl.fromTo('#s5-arrow', { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 0.35, ease: 'power2.out' }, T.voice(5) + 0.55);
tl.fromTo('#s5-tick', { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.35, ease: POP }, T.voice(5) + 0.9);
tl.fromTo('#s5-am', { y: 90, opacity: 0 }, { y: 0, opacity: 1, duration: 0.45, ease: OUT }, T.voice(5) + 1.25);
tl.fromTo('#s5-no', { scale: 2, rotation: -10, opacity: 0 }, { scale: 1, rotation: -4, opacity: 1, duration: 0.22, ease: SLAM }, T.voice(5) + 1.75);
tl.to('#s5-am', { x: 10, duration: 0.05, repeat: 5, yoyo: true, ease: 'none' }, T.voice(5) + 1.97);

// 6. thin data: tiny bars in empty columns, KILL arrives, "maybe?" slams over it
tl.fromTo('#s6 .kicker .l', { yPercent: 110 }, { yPercent: 0, duration: 0.5, ease: OUT, stagger: 0.08 }, T.at(6));
tl.fromTo('#s6-chart', { y: 120, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: OUT }, T.at(6) + 0.08);
tl.fromTo('#s6 .bv', { scaleY: 0 }, { scaleY: 1, duration: 0.35, ease: POP, stagger: 0.06 }, T.voice(6) + 1.0);
tl.fromTo('#s6 .gh', { opacity: 0.15 }, { opacity: 0.9, duration: 0.2, yoyo: true, repeat: 3, ease: 'sine.inOut' }, T.voice(6) + 1.9);
tl.fromTo('#s6-kill', { scale: 0.3, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: POP }, at(6, 0.7));
tl.fromTo('#s6-maybe', { scale: 2.2, rotation: -20, opacity: 0 }, { scale: 1, rotation: -8, opacity: 1, duration: 0.25, ease: SLAM }, at(6, 0.9) - 0.25);
tl.to('#s6-kill', { opacity: 0.4, duration: 0.25, ease: 'power2.out' }, at(6, 0.9));

// 7. comment SCALE: letters drop in, the comment pops, the report lands in DMs
tl.fromTo('#s7 .kicker .l', { yPercent: 110 }, { yPercent: 0, duration: 0.5, ease: OUT }, T.at(7));
tl.fromTo('#s7-box', { scale: 0.5, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: POP }, T.at(7) + 0.03);
tl.fromTo('#s7 .ch', { y: -180, opacity: 0 }, { y: 0, opacity: 1, duration: 0.3, ease: 'bounce.out', stagger: 0.07 }, T.at(7) + 0.15);
tl.to('#s7-box', { scale: 1.06, duration: 0.12, yoyo: true, repeat: 1, ease: 'power2.out' }, T.voice(7) + 0.6);
tl.fromTo('#s7-dm', { y: 100, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: OUT }, at(7, 0.55));
tl.fromTo('#s7-doc', { scale: 0.6, rotation: -12 }, { scale: 1, rotation: -4, duration: 0.4, ease: POP }, at(7, 0.6));
tl.fromTo('#s7-stk', { scale: 0, rotation: -25 }, { scale: 1, rotation: 5, duration: 0.45, ease: POP }, at(7, 0.88));
tl.to('#s7-box', { scale: 1.035, duration: T.beat / 2, yoyo: true, repeat: 3, ease: 'sine.inOut' }, T.end(7) + 0.1);
