// Editorial theme, kind "prompt": Maps hook, the prompt typed in, the buyer list fills, Maps searches wipe in,
// the 2-line message, the honest "you find the shops" map, the catch, the send, then CLIENT drops in.
// Swapped titles are hidden with opacity until their reveal, so the waiting line never sits under a card.
const OUT = 'expo.out', POP = 'back.out(1.8)', IN = 'power3.in';
const span = (n) => T.end(n) - T.voice(n);
const at = (n, f) => T.voice(n) + f * span(n);
const title = (sel, t) => tl.fromTo(sel, { yPercent: 110 }, { yPercent: 0, duration: 0.55, ease: OUT, stagger: 0.08 }, t);
const titleOut = (sel, t) => tl.fromTo(sel, { yPercent: 0 }, { yPercent: -110, duration: 0.25, ease: IN, stagger: 0.04, immediateRender: false }, t);
const card = (id, t) => tl.fromTo(id, { y: 110, opacity: 0, scale: 0.96 }, { y: 0, opacity: 1, scale: 1, duration: 0.6, ease: OUT }, t);
const step = (sel, t) => tl.fromTo(sel, { x: -40, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4, ease: OUT }, t);

// texture: slow drifting blobs for the whole reel
tl.fromTo('#b1', { x: 0, y: 0 }, { x: -120, y: 80, duration: T.dur, ease: 'sine.inOut' }, 0);
tl.fromTo('#b2', { x: 0, y: 0 }, { x: 140, y: -60, duration: T.dur, ease: 'sine.inOut' }, 0);

// progress bar: prompt, list, message, your part, catch, send
tl.set(['#p1', '#p2', '#p3', '#p4', '#p5', '#p6'], { scaleX: 0 }, 0);
tl.to('#p1', { scaleX: 1, duration: 0.5, ease: 'power2.out' }, T.at(1));
tl.to('#p2', { scaleX: 1, duration: 0.5, ease: 'power2.out' }, T.at(3));
tl.to('#p3', { scaleX: 1, duration: 0.5, ease: 'power2.out' }, T.at(5));
tl.to('#p4', { scaleX: 1, duration: 0.5, ease: 'power2.out' }, T.at(6));
tl.to('#p5', { scaleX: 1, duration: 0.5, ease: 'power2.out' }, T.at(7));
tl.to('#p6', { scaleX: 1, duration: 0.5, ease: 'power2.out' }, T.at(8));

// 0. hook: title and pin on screen at frame 0, underline draws as "Google Maps" is said, the pin hops
tl.fromTo('#s0-title .l', { yPercent: 0 }, { yPercent: 0, duration: 0.01 }, 0);
tl.fromTo('#s0-title', { scale: 1.05 }, { scale: 1, duration: 0.6, ease: OUT }, 0);
tl.fromTo('#s0-step', { opacity: 0.5 }, { opacity: 1, duration: 0.3 }, 0);
tl.fromTo('#s0-ul', { scaleX: 0 }, { scaleX: 1, duration: 0.45, ease: OUT }, at(0, 0.66));
tl.fromTo('#s0-pin', { y: 0 }, { y: -36, duration: 0.22, ease: 'power2.out', yoyo: true, repeat: 1 }, at(0, 0.72));

// 1. steal this prompt: the card rises, the prompt types in line by line
step('#s1 .step', T.at(1)); title('#s1-t1 .l', T.at(1) + 0.05); card('#s1-card', T.at(1) + 0.15);
tl.set('#s1-t2 .l', { yPercent: 110 }, 0);
tl.set('#s1-t2', { opacity: 0 }, 0);
tl.set(['#fv1', '#fv2'], { clipPath: 'inset(0 100% 0 0)' }, 0);
tl.fromTo('#s1-ptxt', { clipPath: 'inset(0 0 100% 0)' }, { clipPath: 'inset(0 0 0% 0)', duration: 0.8, ease: 'steps(4)' }, T.voice(1) + 0.3);

// 2. type your skill and area: fields focus and type, the button presses
titleOut('#s1-t1 .l', T.at(2));
tl.set('#s1-t1', { opacity: 0 }, T.at(2) + 0.3);
tl.set('#s1-t2', { opacity: 1 }, T.at(2) + 0.1);
title('#s1-t2 .l', T.at(2) + 0.12);
tl.fromTo('#f1', { borderColor: 'rgba(46,107,79,0)' }, { borderColor: 'rgba(46,107,79,1)', duration: 0.15, ease: 'power2.out' }, T.voice(2) + 0.3);
tl.fromTo('#fv1', { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 0.45, ease: 'steps(13)', immediateRender: false }, T.voice(2) + 0.3);
tl.fromTo('#f1', { borderColor: 'rgba(46,107,79,1)' }, { borderColor: 'rgba(46,107,79,0)', duration: 0.15, ease: 'power2.out', immediateRender: false }, T.voice(2) + 0.8);
tl.fromTo('#f2', { borderColor: 'rgba(46,107,79,0)' }, { borderColor: 'rgba(46,107,79,1)', duration: 0.15, ease: 'power2.out' }, T.voice(2) + 0.8);
tl.fromTo('#fv2', { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 0.3, ease: 'steps(6)', immediateRender: false }, T.voice(2) + 0.82);
tl.fromTo('#s1-go', { scale: 1 }, { scale: 0.94, duration: 0.08, yoyo: true, repeat: 1, ease: 'power2.inOut' }, T.end(2) - 0.2);

// 3. the list: each business lands as it is named
step('#s3 .step', T.at(3)); title('#s3-t1 .l', T.at(3) + 0.05); card('#s3-card', T.at(3) + 0.1);
tl.set('#s3-t2 .l', { yPercent: 110 }, 0);
tl.set('#s3-t2', { opacity: 0 }, 0);
tl.set('#s3 .bs', { clipPath: 'inset(0 100% 0 0)' }, 0);
tl.fromTo('#r1', { x: 60, opacity: 0 }, { x: 0, opacity: 1, duration: 0.35, ease: OUT }, at(3, 0.05));
tl.fromTo('#r2', { x: 60, opacity: 0 }, { x: 0, opacity: 1, duration: 0.35, ease: OUT }, at(3, 0.32));
tl.fromTo('#r3', { x: 60, opacity: 0 }, { x: 0, opacity: 1, duration: 0.35, ease: OUT }, at(3, 0.5));
tl.fromTo('#r4', { x: 60, opacity: 0 }, { x: 0, opacity: 1, duration: 0.35, ease: OUT }, at(3, 0.67));
tl.fromTo('#r5', { x: 60, opacity: 0 }, { x: 0, opacity: 1, duration: 0.35, ease: OUT }, at(3, 0.85));

// 4. each with its Maps search: the search lines wipe in down the list
titleOut('#s3-t1 .l', T.at(4));
tl.set('#s3-t1', { opacity: 0 }, T.at(4) + 0.3);
tl.set('#s3-t2', { opacity: 1 }, T.at(4) + 0.1);
title('#s3-t2 .l', T.at(4) + 0.12);
tl.fromTo('#s3 .bs', { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 0.4, ease: 'power3.out', stagger: 0.08, immediateRender: false }, T.voice(4) + 0.15);
tl.fromTo('#s3-card', { scale: 1 }, { scale: 1.02, duration: 0.2, yoyo: true, repeat: 1, ease: 'sine.inOut', immediateRender: false }, T.end(4) - 0.3);

// 5. the 2-line first message: two bubbles pop, the copy row settles
step('#s5 .step', T.at(5)); title('#s5-t .l', T.at(5) + 0.05); card('#s5-card', T.at(5) + 0.1);
tl.fromTo('#s5-b1', { scale: 0.6, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: POP }, T.voice(5) + 0.15);
tl.fromTo('#s5-b2', { scale: 0.6, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: POP }, T.voice(5) + 0.5);
tl.fromTo('#s5-copy', { x: 50, opacity: 0 }, { x: 0, opacity: 1, duration: 0.35, ease: OUT }, T.voice(5) + 0.85);
tl.fromTo('#s5-chip', { scale: 1 }, { scale: 1.08, duration: 0.15, yoyo: true, repeat: 1, ease: 'sine.inOut' }, T.voice(5) + 1.2);

// 6. no live names: ghost "?" spots, then you search Maps and the pins drop onto them
step('#s6 .step', T.at(6)); title('#s6-t .l', T.at(6) + 0.05); card('#s6-card', T.at(6) + 0.1);
tl.fromTo('#s6-q', { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 0.5, ease: 'steps(16)' }, T.at(6) + 0.35);
tl.fromTo('#s6 .gh', { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.35, ease: POP, stagger: 0.07 }, T.voice(6) + 0.2);
const pinT = at(6, 0.52);
tl.fromTo('#pn1', { y: -120, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: 'back.out(2)' }, pinT);
tl.fromTo('#g1', { opacity: 1 }, { opacity: 0, duration: 0.2, ease: 'power2.out', immediateRender: false }, pinT + 0.3);
tl.fromTo('#pn2', { y: -120, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: 'back.out(2)' }, pinT + 0.12);
tl.fromTo('#g2', { opacity: 1 }, { opacity: 0, duration: 0.2, ease: 'power2.out', immediateRender: false }, pinT + 0.42);
tl.fromTo('#pn3', { y: -120, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: 'back.out(2)' }, pinT + 0.24);
tl.fromTo('#g3', { opacity: 1 }, { opacity: 0, duration: 0.2, ease: 'power2.out', immediateRender: false }, pinT + 0.54);
tl.fromTo('#pn4', { y: -120, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: 'back.out(2)' }, pinT + 0.36);
tl.fromTo('#g4', { opacity: 1 }, { opacity: 0, duration: 0.2, ease: 'power2.out', immediateRender: false }, pinT + 0.66);
tl.set('#s6-ring', { opacity: 0 }, 0);
tl.fromTo('#s6-ring', { scale: 0.5, opacity: 0.8 }, { scale: 1.5, opacity: 0, duration: 0.7, ease: 'power2.out', immediateRender: false }, pinT + 0.4);

// 7. the catch: 20 messages fill, SENT slams on the thud, most go grey, two stay green
step('#s7 .step', T.at(7)); title('#s7-t .l', T.at(7) + 0.05); card('#s7-card', T.at(7) + 0.1);
tl.fromTo('#s7 .m', { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.3, ease: POP, stagger: 0.025 }, T.at(7) + 0.3);
tl.fromTo('#s7-stamp', { scale: 2.4, opacity: 0, rotation: -24 }, { scale: 1, opacity: 1, rotation: -10, duration: 0.25, ease: 'power4.in' }, T.voice(7) + 0.25);
tl.fromTo('#s7-card', { x: 0 }, { x: 8, duration: 0.05, repeat: 5, yoyo: true, ease: 'none', immediateRender: false }, T.voice(7) + 0.5);
tl.fromTo('#s7-stamp', { opacity: 1 }, { opacity: 0, duration: 0.25, ease: IN, immediateRender: false }, at(7, 0.62));
tl.fromTo('#s7 .m.no', { backgroundColor: '#2E6B4F' }, { backgroundColor: '#D6CFC2', duration: 0.25, ease: 'power2.out', stagger: 0.03, immediateRender: false }, at(7, 0.66));
tl.fromTo('#s7 .m.yes', { scale: 1 }, { scale: 1.15, duration: 0.18, yoyo: true, repeat: 1, ease: 'sine.inOut', immediateRender: false }, at(7, 0.66) + 0.55);
tl.fromTo('#s7-foot', { x: 50, opacity: 0 }, { x: 0, opacity: 1, duration: 0.35, ease: OUT }, at(7, 0.78));
tl.fromTo('#s7-chip', { scale: 1 }, { scale: 1.08, duration: 0.15, yoyo: true, repeat: 1, ease: 'sine.inOut' }, at(7, 0.78) + 0.4);

// 8. send this: the friend row, the send button presses, "Sent" ticks in
step('#s8 .step', T.at(8)); title('#s8-t .l', T.at(8) + 0.05); card('#s8-card', T.at(8) + 0.1);
tl.fromTo('#s8-row', { x: 60, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4, ease: OUT }, T.voice(8) + 0.3);
tl.fromTo('#s8-av', { scale: 0.95 }, { scale: 1, duration: 0.35, ease: POP }, T.voice(8) + 0.45);
tl.fromTo('#s8-btn', { scale: 1 }, { scale: 0.88, duration: 0.09, yoyo: true, repeat: 1, ease: 'power2.inOut' }, at(8, 0.6));
tl.fromTo('#s8-done', { scale: 0.7, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: POP }, at(8, 0.6) + 0.2);

// 9. save + CLIENT: bookmark pops, the dark card rises, the letters drop in on the beat
step('#s9 .step', T.at(9));
title('#s9-title .l', T.at(9) + 0.05);
tl.fromTo('#s9-mark', { scale: 0, y: -40 }, { scale: 1, y: 0, duration: 0.45, ease: POP }, T.at(9) + 0.25);
tl.fromTo('#s9-cta', { y: 110, opacity: 0, scale: 0.96 }, { y: 0, opacity: 1, scale: 1, duration: 0.6, ease: OUT }, T.at(9) + 0.15);
tl.fromTo('#kw .kl', { yPercent: -120, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.4, ease: POP, stagger: 0.06 }, at(9, 0.28));
tl.fromTo('#s9 .sub', { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: OUT }, at(9, 0.6));
tl.fromTo('#s9-free', { scale: 0, rotation: -30 }, { scale: 1, rotation: 8, duration: 0.4, ease: POP }, at(9, 0.75));
tl.fromTo('#s9-cta', { scale: 1 }, { scale: 1.03, duration: 0.3, yoyo: true, repeat: 1, ease: 'sine.inOut', immediateRender: false }, T.end(9) + 0.3);
