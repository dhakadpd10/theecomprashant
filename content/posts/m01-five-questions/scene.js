// Five questions every shopper asks. Hero = the thing being judged each beat; support = rows, ticks, dots; texture = drifting blobs.
const OUT = 'expo.out', POP = 'back.out(1.8)', IN = 'power3.in';
const span = (n) => T.end(n) - T.voice(n); // how long line n is spoken

// texture: the background drifts for the whole reel
tl.fromTo('#blobA', { x: 0, y: 0 }, { x: 260, y: 200, duration: T.dur, ease: 'sine.inOut' }, 0);
tl.fromTo('#blobB', { x: 0, y: 0 }, { x: -240, y: -280, duration: T.dur, ease: 'sine.inOut' }, 0);

// 0. hook: on screen from frame one, then the page arrives and buyers walk off
tl.fromTo('#s0 .kicker', { scale: 1.08 }, { scale: 1, duration: 0.5, ease: OUT }, 0);
tl.fromTo('#card', { y: 140, rotation: 4 }, { y: 0, rotation: -2, duration: 0.7, ease: OUT }, 0.05);
tl.fromTo('.dot', { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.35, ease: POP, stagger: 0.05 }, 0.35);
tl.to('.dot', { x: 760, opacity: 0, duration: 0.6, ease: IN, stagger: 0.12 }, T.voice(0) + 1.0);
tl.fromTo('#stamp', { scale: 2.4, rotation: -24, opacity: 0 }, { scale: 1, rotation: -10, opacity: 1, duration: 0.28, ease: 'power4.in' }, T.end(0) - 0.85);
tl.fromTo('#card', { x: 0 }, { x: 14, duration: 0.05, repeat: 5, yoyo: true, ease: 'none' }, T.end(0) - 0.57);

// 1. the big 5 and five empty slots
tl.fromTo('#big5', { scale: 0.2, rotation: -20, opacity: 0 }, { scale: 1, rotation: 0, opacity: 1, duration: 0.5, ease: POP }, T.at(1));
tl.fromTo('#q-head', { x: 80, opacity: 0 }, { x: 0, opacity: 1, duration: 0.45, ease: OUT }, T.voice(1) + 0.3);
tl.fromTo('#s1 .row', { x: -120, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4, ease: OUT, stagger: 0.07 }, T.voice(1) + 0.9);

// 2-3. each question fills its slot as it is asked
const ask = (i, t) => {
  tl.to(`#r${i} .fill`, { opacity: 1, duration: 0.18, ease: 'none' }, t);
  tl.fromTo(`#r${i}`, { scale: 1 }, { scale: 1.05, duration: 0.12, yoyo: true, repeat: 1, ease: 'power2.out' }, t);
  tl.fromTo(`#r${i} .q`, { opacity: 0, x: 40 }, { opacity: 1, x: 0, duration: 0.3, ease: OUT }, t);
  tl.set(`#r${i}`, { className: 'row filled' }, t);
};
[0, 0.34, 0.66].forEach((f, i) => ask(i, T.voice(2) + f * span(2)));
[0, 0.52].forEach((f, i) => ask(i + 3, T.voice(3) + f * span(3)));

// 4. one goes unanswered: the trust row empties, the rest dim, GONE slams in
tl.to('#r2 .fill', { opacity: 0, duration: 0.2 }, T.voice(4) + 0.15);
tl.to('#r2 .q', { opacity: 0.25, duration: 0.2 }, T.voice(4) + 0.15);
tl.to('#r2', { borderColor: '#E5484D', duration: 0.2 }, T.voice(4) + 0.15);
tl.set('#r2', { className: 'row' }, T.voice(4) + 0.15);
tl.fromTo('#r2', { x: 0 }, { x: 18, duration: 0.05, repeat: 7, yoyo: true, ease: 'none' }, T.voice(4) + 0.3);
tl.to(['#r0', '#r1', '#r3', '#r4', '#big5', '#q-head'], { opacity: 0.18, duration: 0.3 }, T.voice(4) + 1.05);
tl.fromTo('#gone', { scale: 2.2, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.25, ease: 'power4.in' }, T.voice(4) + 1.1);

// 5. the audit: title wipes up, the window rises, a scan line ticks every question off on the beat
tl.fromTo('#s5 .kicker .l', { yPercent: 110 }, { yPercent: 0, duration: 0.5, ease: OUT, stagger: 0.08 }, T.at(5));
tl.fromTo('#audit', { y: 300, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: OUT }, T.at(5) + 0.1);
const clock = { s: 300 };
tl.fromTo(clock, { s: 300 }, { s: 0, duration: span(5), ease: 'none', onUpdate: () => { const s = Math.round(clock.s); document.getElementById('timer').textContent = `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`; } }, T.voice(5));
const tickAt = (k) => T.voice(5) + 0.9 + k * T.beat * 0.55;
tl.fromTo('#scan', { y: 0 }, { y: 4 * 138, duration: tickAt(4) - tickAt(0), ease: 'none' }, tickAt(0));
for (let k = 0; k < 5; k++) tl.fromTo(`#s5 .check:nth-child(${k + 1}) .tick`, { opacity: 0, scale: 0.3 }, { opacity: 1, scale: 1, duration: 0.25, ease: POP }, tickAt(k));

// 6. paste the page, get a ranked fix list
tl.fromTo('#s6 .kicker .l', { yPercent: 110 }, { yPercent: 0, duration: 0.5, ease: OUT }, T.at(6));
tl.fromTo('#paste', { y: 120, opacity: 0 }, { y: 0, opacity: 1, duration: 0.45, ease: OUT }, T.at(6) + 0.05);
tl.fromTo('#paste .url', { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 0.8, ease: 'steps(18)' }, T.voice(6) + 0.1);
tl.fromTo('#paste .go', { scale: 1 }, { scale: 0.86, duration: 0.1, yoyo: true, repeat: 1 }, T.voice(6) + 0.95);
tl.fromTo('#fixes', { y: 200, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: OUT }, T.voice(6) + 1.05);
tl.fromTo('#fixes .fix', { x: 140, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4, ease: OUT, stagger: 0.16 }, T.voice(6) + 1.3);

// 7. comment the keyword: letters drop into the bubble on the beat
tl.fromTo('#s7 .kicker .l', { yPercent: 110 }, { yPercent: 0, duration: 0.5, ease: OUT }, T.at(7));
tl.fromTo('#avatar', { scale: 0 }, { scale: 1, duration: 0.4, ease: POP }, T.at(7) + 0.1);
tl.fromTo('#bubble', { scale: 0.4, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.45, ease: POP }, T.at(7) + 0.2);
tl.fromTo('#bubble .ch', { y: -160, opacity: 0 }, { y: 0, opacity: 1, duration: 0.35, ease: 'bounce.out', stagger: T.beat / 4 }, T.voice(7) + 0.3);
tl.fromTo('#sticker', { scale: 0, rotation: -30 }, { scale: 1, rotation: 6, duration: 0.45, ease: POP }, T.voice(7) + 1.3);
tl.fromTo('#bubble', { scale: 1 }, { scale: 1.04, duration: T.beat / 2, yoyo: true, repeat: 3, ease: 'sine.inOut' }, T.voice(7) + 1.6);
