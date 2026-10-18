// Ask when it's empty, not on day 7. Hero = the calendar and bottle, then the tool; support = chips, ticks, coins; texture = drifting blobs.
const OUT = 'expo.out', POP = 'back.out(1.8)', IN = 'power3.in';
const span = (n) => T.end(n) - T.voice(n);
const at = (n, f) => T.voice(n) + f * span(n);

// texture
tl.fromTo('#blobA', { x: 0, y: 0 }, { x: 240, y: 220, duration: T.dur, ease: 'sine.inOut' }, 0);
tl.fromTo('#blobB', { x: 0, y: 0 }, { x: -260, y: -300, duration: T.dur, ease: 'sine.inOut' }, 0);
tl.set('#liquid', { transformOrigin: '50% 100%' }, 0);

// 0. hook: title and calendar on screen at frame one; day 7 gets crossed out
tl.fromTo('#s0-k', { scale: 1.05, transformOrigin: '0% 0%' }, { scale: 1, duration: 0.5, ease: OUT }, 0);
tl.fromTo('#cal', { scale: 0.97 }, { scale: 1, duration: 0.6, ease: OUT }, 0);
tl.fromTo('#c7', { scale: 1 }, { scale: 1.12, duration: 0.15, yoyo: true, repeat: 1, ease: 'power2.out' }, at(0, 0.22));
tl.fromTo('#x7', { scale: 2.6, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.25, ease: 'power4.in' }, at(0, 0.5) - 0.25);
tl.fromTo('#c7', { x: 0 }, { x: 10, duration: 0.05, repeat: 5, yoyo: true, ease: 'none' }, at(0, 0.5));
tl.fromTo('#s0-when', { scale: 0.4, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.45, ease: POP }, at(0, 0.64));
tl.fromTo(['#s0-k', '#s0-when'], { y: 0, opacity: 1 }, { y: -40, opacity: 0, duration: 0.22, ease: IN, immediateRender: false }, T.at(1) - 0.22);

// 1. calendar slides up, the day-7 ask lands, the buyer still has lots left
tl.fromTo('#cal', { y: 0 }, { y: -280, duration: 0.55, ease: 'power3.out' }, T.at(1));
tl.fromTo('#s1-ask', { scale: 0.5, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: POP, transformOrigin: '100% 100%' }, T.at(1) + 0.35);
tl.fromTo('#c7', { scale: 1 }, { scale: 1.12, duration: 0.15, yoyo: true, repeat: 1, ease: 'power2.out', immediateRender: false }, T.at(1) + 0.45);
tl.fromTo('#s1-typing', { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.3, ease: POP, transformOrigin: '0% 100%' }, T.voice(1) + 0.75);
tl.fromTo('#s1-typing i', { y: 0 }, { y: -10, duration: 0.15, yoyo: true, repeat: 1, stagger: 0.08, ease: 'sine.inOut' }, T.voice(1) + 0.95);
tl.fromTo('#s1-typing', { opacity: 1 }, { opacity: 0, duration: 0.1, ease: 'power2.out', immediateRender: false }, T.voice(1) + 1.4);
tl.fromTo('#s1-reply', { scale: 0.5, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: POP, transformOrigin: '0% 100%' }, T.voice(1) + 1.4);
tl.fromTo('#s1-ex', { opacity: 0 }, { opacity: 1, duration: 0.3, ease: 'power2.out' }, T.voice(1) + 1.6);

// 2. the example bottle; a week passes and it's still 72% full (buzz)
tl.fromTo('#bottle', { scale: 0.6, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.5, ease: POP, transformOrigin: '50% 100%' }, T.at(2));
tl.fromTo('#s2-c1', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: OUT }, at(2, 0.2));
tl.fromTo('#c1, #c2, #c3, #c4, #c5, #c6', { backgroundColor: 'rgba(244,239,228,0.07)' }, { backgroundColor: 'rgba(124,224,176,0.32)', duration: 0.2, ease: 'power2.out', stagger: 0.07 }, T.voice(2) + 0.45);
tl.fromTo('#liquid', { scaleY: 1 }, { scaleY: 0.72, duration: 0.5, ease: 'power2.inOut', transformOrigin: '50% 100%' }, T.voice(2) + 0.45);
tl.fromTo('#s2-left', { scale: 0.6, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.3, ease: POP }, T.voice(2) + 0.95);
tl.fromTo('#s2-left', { x: 0 }, { x: 12, duration: 0.05, repeat: 5, yoyo: true, ease: 'none' }, T.voice(2) + 1.05);
tl.fromTo('#c7', { x: 0 }, { x: 10, duration: 0.05, repeat: 5, yoyo: true, ease: 'none', immediateRender: false }, T.voice(2) + 1.0);
tl.fromTo('#s2-c2', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: OUT }, at(2, 0.62));
tl.fromTo('#s2-ex', { opacity: 0 }, { opacity: 1, duration: 0.3, ease: 'power2.out' }, at(2, 0.8));
tl.fromTo(['#s2-c1', '#s2-c2', '#s2-left', '#s2-ex'], { opacity: 1 }, { opacity: 0, duration: 0.22, ease: IN, immediateRender: false }, T.at(3) - 0.24);

// 3. count the days until it's empty
tl.fromTo('#s3-num', { opacity: 0, filter: 'blur(12px)' }, { opacity: 1, filter: 'blur(0px)', duration: 0.4, ease: OUT }, T.at(3));
const run = span(3) - 0.35;
const day = { d: 7 };
tl.fromTo(day, { d: 7 }, { d: 25, duration: run, ease: 'power1.inOut', onUpdate: () => { document.getElementById('s3-num').textContent = 'DAY ' + Math.round(day.d); } }, T.voice(3) + 0.1);
tl.fromTo('#liquid', { scaleY: 0.72 }, { scaleY: 0, duration: run, ease: 'power1.inOut', transformOrigin: '50% 100%', immediateRender: false }, T.voice(3) + 0.1);
const later = '#c8, #c9, #c10, #c11, #c12, #c13, #c14, #c15, #c16, #c17, #c18, #c19, #c20, #c21, #c22, #c23, #c24, #c25';
tl.fromTo(later, { backgroundColor: 'rgba(244,239,228,0.07)' }, { backgroundColor: 'rgba(124,224,176,0.32)', duration: 0.2, ease: 'power2.out', stagger: (run - 0.15) / 17 }, T.voice(3) + 0.1);
tl.fromTo('#c25', { backgroundColor: 'rgba(124,224,176,0.32)', color: '#F4EFE4' }, { backgroundColor: '#7CE0B0', color: '#0F1A17', duration: 0.15, ease: 'power2.out', immediateRender: false }, T.end(3) - 0.15);
tl.fromTo('#c25', { scale: 1 }, { scale: 1.15, duration: 0.15, yoyo: true, repeat: 1, ease: 'power2.out' }, T.end(3) - 0.15);
tl.fromTo('#s3-empty', { scale: 0.3, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.35, ease: POP }, T.end(3) - 0.2);
tl.fromTo('#s3-sub', { opacity: 0 }, { opacity: 1, duration: 0.25, ease: 'power2.out' }, T.end(3) - 0.05);

// 4. the free tool arrives and locks onto day 25 (ding)
tl.fromTo('#s4-card', { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: OUT }, T.at(4));
tl.fromTo('#s4-card .ttl .l', { yPercent: 110 }, { yPercent: 0, duration: 0.5, ease: OUT, stagger: 0.08 }, T.at(4) + 0.12);
tl.fromTo('#s4-free', { scale: 0, rotation: -20 }, { scale: 1, rotation: 0, duration: 0.4, ease: POP }, T.at(4) + 0.35);
const ding = T.voice(4) + 0.9;
tl.fromTo('#ring25', { scale: 2.2, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.25, ease: 'power4.in' }, ding - 0.25);
tl.fromTo('#c25', { scale: 1 }, { scale: 1.15, duration: 0.15, yoyo: true, repeat: 1, ease: 'power2.out', immediateRender: false }, ding);
tl.fromTo('#s4-card .f', { x: -30, opacity: 0 }, { x: 0, opacity: 1, duration: 0.35, ease: OUT, stagger: 0.08 }, ding);
tl.fromTo(['#bottle', '#s4-card'], { opacity: 1 }, { opacity: 0, duration: 0.22, ease: IN, immediateRender: false }, T.at(5) - 0.24);

// 5. add your product: two fields type in, GO, day 25 pulses
tl.fromTo('#s5-box', { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.45, ease: OUT }, T.at(5));
tl.fromTo('#s5-v1', { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 0.5, ease: 'steps(11)' }, T.voice(5) + 0.15);
tl.fromTo('#s5-v2', { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 0.6, ease: 'steps(17)' }, T.voice(5) + 0.75);
tl.fromTo('#s5-ex', { opacity: 0 }, { opacity: 1, duration: 0.3, ease: 'power2.out' }, T.voice(5) + 0.3);
tl.fromTo('#s5-go', { scale: 1 }, { scale: 0.86, duration: 0.1, yoyo: true, repeat: 1, ease: 'power2.out' }, T.end(5) - 0.25);
tl.fromTo('#ring25', { scale: 1 }, { scale: 1.15, duration: 0.15, yoyo: true, repeat: 1, ease: 'power2.out', immediateRender: false }, T.end(5) - 0.05);

// 6. three messages pop in as each is named
tl.fromTo('#s6 .kicker .l', { yPercent: 110 }, { yPercent: 0, duration: 0.5, ease: OUT }, T.at(6));
tl.fromTo('#m1', { scale: 0.85, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: POP }, at(6, 0.42) - 0.1);
tl.fromTo('#m1 .no', { scale: 0.3 }, { scale: 1, duration: 0.35, ease: POP }, at(6, 0.42) - 0.04);
tl.fromTo('#m2', { scale: 0.85, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: POP }, at(6, 0.62) - 0.1);
tl.fromTo('#m2 .no', { scale: 0.3 }, { scale: 1, duration: 0.35, ease: POP }, at(6, 0.62) - 0.04);
tl.fromTo('#m3', { scale: 0.85, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: POP }, at(6, 0.84) - 0.1);
tl.fromTo('#m3 .no', { scale: 0.3 }, { scale: 1, duration: 0.35, ease: POP }, at(6, 0.84) - 0.04);

// 7. the catch: the day is an estimate (pop), so check it
tl.fromTo('#s7 .kicker .l', { yPercent: 110 }, { yPercent: 0, duration: 0.5, ease: OUT }, T.at(7));
tl.fromTo('#s7-card', { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.45, ease: OUT }, T.at(7) + 0.08);
tl.fromTo('#s7 .tkl', { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.3, ease: OUT, stagger: 0.06 }, T.at(7) + 0.25);
tl.fromTo('#s7-dot', { scale: 0 }, { scale: 1, duration: 0.35, ease: POP }, T.voice(7) + 0.35);
tl.fromTo('#s7-band', { scaleX: 0, transformOrigin: '50% 50%' }, { scaleX: 1, duration: 0.35, ease: 'power3.out' }, T.voice(7) + 0.55);
tl.fromTo('#s7-stk', { scale: 0.3, rotation: -20, opacity: 0 }, { scale: 1, rotation: -6, opacity: 1, duration: 0.35, ease: POP }, T.voice(7) + 0.75);
tl.fromTo('#s7-dot', { x: 0 }, { x: -90, duration: 0.3, yoyo: true, repeat: 1, ease: 'power2.inOut' }, T.voice(7) + 0.95);
tl.fromTo('#s7-dot', { x: 0 }, { x: 90, duration: 0.25, yoyo: true, repeat: 1, ease: 'power2.inOut', immediateRender: false }, T.voice(7) + 1.55);
tl.fromTo('#s7-chk', { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: OUT }, at(7, 0.72) - 0.15);
tl.fromTo('#s7-tick', { scale: 0 }, { scale: 1, duration: 0.35, ease: POP }, at(7, 0.8));

// 8. every sales message costs money (thud), so the list shrinks to 3
tl.fromTo('#s8-stamp', { scale: 1.6, rotation: -8, opacity: 0 }, { scale: 1, rotation: 0, opacity: 1, duration: 0.25, ease: 'power4.in' }, T.voice(8) + 0.05);
tl.fromTo('#s8-stamp', { x: 0 }, { x: 8, duration: 0.05, repeat: 5, yoyo: true, ease: 'none' }, T.voice(8) + 0.3);
tl.fromTo('#s8 .bar8', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: OUT, stagger: 0.07 }, T.voice(8) + 0.45);
tl.fromTo('#s8 .coin', { scale: 0 }, { scale: 1, duration: 0.3, ease: POP, stagger: 0.07 }, T.voice(8) + 0.75);
const cut = at(8, 0.55);
tl.fromTo(['#b1', '#b2', '#b4'], { x: 0 }, { x: 12, duration: 0.05, repeat: 5, yoyo: true, ease: 'none' }, cut);
tl.fromTo(['#b1', '#b2', '#b4'], { opacity: 1, scale: 1 }, { opacity: 0, scale: 0.85, duration: 0.25, ease: IN, immediateRender: false }, cut + 0.3);
tl.fromTo('#b3', { y: 0 }, { y: -280, duration: 0.45, ease: 'power2.inOut', immediateRender: false }, cut + 0.5);
tl.fromTo('#b5', { y: 0 }, { y: -420, duration: 0.45, ease: 'power2.inOut', immediateRender: false }, cut + 0.5);
tl.fromTo(['#b0', '#b3', '#b5'], { borderColor: 'rgba(244,239,228,0.16)' }, { borderColor: '#7CE0B0', duration: 0.2, ease: 'power2.out' }, cut + 0.95);
tl.fromTo(['#b0', '#b3', '#b5'], { scale: 1 }, { scale: 1.04, duration: 0.12, yoyo: true, repeat: 1, ease: 'power2.out', immediateRender: false }, cut + 0.95);

// 9. comment the keyword: letters drop into the bubble on the beat
tl.fromTo('#s9 .kicker .l', { yPercent: 110 }, { yPercent: 0, duration: 0.5, ease: OUT }, T.at(9));
tl.fromTo('#s9-av', { scale: 0 }, { scale: 1, duration: 0.4, ease: POP }, T.at(9) + 0.1);
tl.fromTo('#s9-bub', { scale: 0.4, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.45, ease: POP }, T.at(9) + 0.2);
tl.fromTo('#s9-bub .ch', { y: -160, opacity: 0 }, { y: 0, opacity: 1, duration: 0.35, ease: 'bounce.out', stagger: T.beat / 4 }, T.voice(9) + 0.25);
tl.fromTo('#s9-stk', { scale: 0, rotation: -24 }, { scale: 1, rotation: 3, duration: 0.45, ease: POP }, T.voice(9) + 1.2);
tl.fromTo('#s9-bub', { scale: 1 }, { scale: 1.04, duration: T.beat / 2, yoyo: true, repeat: 3, ease: 'sine.inOut', immediateRender: false }, T.voice(9) + 1.6);
