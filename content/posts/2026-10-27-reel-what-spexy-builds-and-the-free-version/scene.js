// Free version of a paid AI build. Hero per beat: the build card, the to-do note, the AI core, the 4-agent chat, the HANDOFF block, the free/paid split, the TEAM bubble.
const OUT = 'expo.out', POP = 'back.out(1.8)', IN = 'power3.in', SLAM = 'power4.in';
const span = (n) => T.end(n) - T.voice(n);
const at = (n, f) => T.voice(n) + f * span(n);

// texture: space drifts for the whole reel
tl.fromTo('#blobA', { x: 0, y: 0 }, { x: 240, y: 220, duration: T.dur, ease: 'sine.inOut' }, 0);
tl.fromTo('#blobB', { x: 0, y: 0 }, { x: -260, y: -240, duration: T.dur, ease: 'sine.inOut' }, 0);
tl.fromTo('#blobC', { x: 0, y: 0 }, { x: 180, y: -160, duration: T.dur, ease: 'sine.inOut' }, 0);
tl.fromTo('#starsA', { y: 0 }, { y: -120, duration: T.dur, ease: 'none' }, 0);
tl.fromTo('#starsB', { opacity: 0.35 }, { opacity: 0.9, duration: T.beat * 4, yoyo: true, repeat: 9, ease: 'sine.inOut' }, 0);

// 0. hook: title and the paid build card are on screen at frame 0; the free ticket slides out of it
tl.fromTo('#s0 .kicker', { scale: 1.06 }, { scale: 1, duration: 0.5, ease: OUT }, 0);
tl.fromTo('#s0-card', { y: 70, rotation: 2 }, { y: 0, rotation: 0, duration: 0.6, ease: OUT }, 0);
tl.fromTo('#s0 .node', { scale: 0.88 }, { scale: 1, duration: 0.4, ease: POP, stagger: 0.06 }, 0.1);
tl.fromTo('#s0 .wire', { scaleX: 0 }, { scaleX: 1, duration: 0.35, ease: OUT, stagger: 0.1 }, 0.45);
tl.fromTo('#s0 .bar', { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 0.45, ease: 'power3.out', stagger: 0.07 }, 0.6);
tl.fromTo('#s0-ticket', { y: -150, opacity: 0, scale: 0.85, rotation: 0 }, { y: 0, opacity: 1, scale: 1, rotation: -6, duration: 0.55, ease: OUT }, at(0, 0.25));
tl.fromTo('#s0-ai', { scale: 1 }, { scale: 1.1, duration: 0.15, yoyo: true, repeat: 1, ease: 'power2.out', immediateRender: false }, at(0, 0.62));
tl.fromTo('#s0-ticket', { rotation: -6 }, { rotation: -1, duration: 0.07, yoyo: true, repeat: 3, ease: 'power2.inOut', immediateRender: false }, at(0, 0.85));

// 1. the excuse: "after Diwali" slams onto the note (thud), gets struck out, TONIGHT rises
tl.fromTo('#s1 .bulb', { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.3, ease: POP, stagger: 0.04 }, T.at(1));
tl.fromTo('#s1-note', { y: 220, rotation: 4, opacity: 0 }, { y: 0, rotation: -2, opacity: 1, duration: 0.55, ease: OUT }, T.at(1) + 0.05);
const thud1 = T.voice(1) + 0.9;
tl.fromTo('#s1-later', { scale: 1.8, rotation: -8, opacity: 0 }, { scale: 1, rotation: 0, opacity: 1, duration: 0.25, ease: SLAM }, thud1 - 0.25);
tl.fromTo('#s1-note', { x: 0 }, { x: 8, duration: 0.05, yoyo: true, repeat: 5, ease: 'none' }, thud1);
tl.fromTo('#s1-strike', { scaleX: 0 }, { scaleX: 1, duration: 0.35, ease: 'power3.out' }, at(1, 0.5));
tl.fromTo('#s1-moon', { scale: 0, rotation: -90 }, { scale: 1, rotation: 0, duration: 0.45, ease: POP }, at(1, 0.68));
tl.fromTo('#s1-tonight .l', { yPercent: 110 }, { yPercent: 0, duration: 0.5, ease: OUT }, at(1, 0.7));
tl.to('#s1 .bulb:nth-child(odd)', { opacity: 0.35, duration: T.beat / 2, yoyo: true, repeat: 5, ease: 'sine.inOut' }, T.at(1) + 0.7);

// 2. the paid build: AI core, then store and ads wire into it, data pulses flow in
tl.fromTo('#s2 .kicker .l', { yPercent: 110 }, { yPercent: 0, duration: 0.5, ease: OUT }, T.at(2));
tl.fromTo('#s2-core', { scale: 0.3, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.5, ease: POP }, T.at(2) + 0.12);
tl.fromTo('#s2-ring', { scale: 1, opacity: 0.8 }, { scale: 1.5, opacity: 0, duration: T.beat * 1.5, repeat: 2, ease: 'power2.out' }, T.voice(2) + 0.6);
const tStore = at(2, 0.5), tAds = at(2, 0.72);
tl.fromTo('#s2-store', { y: 80, opacity: 0 }, { y: 0, opacity: 1, duration: 0.45, ease: OUT }, tStore);
tl.fromTo('#s2-w1', { strokeDashoffset: 440 }, { strokeDashoffset: 0, duration: 0.4, ease: 'power2.inOut' }, tStore + 0.15);
tl.fromTo('#s2-ads', { y: 80, opacity: 0 }, { y: 0, opacity: 1, duration: 0.45, ease: OUT }, tAds);
tl.fromTo('#s2-w2', { strokeDashoffset: 440 }, { strokeDashoffset: 0, duration: 0.4, ease: 'power2.inOut' }, tAds + 0.15);
[['#s2-p1', 140], ['#s2-p2', -140]].forEach(([id, dx], i) => {
  const t0 = tAds + 0.5 + i * 0.06;
  tl.fromTo(id, { opacity: 0 }, { opacity: 1, duration: 0.08, ease: 'power1.out' }, t0);
  tl.fromTo(id, { y: 0 }, { y: 300, duration: 0.2, ease: 'power1.in', immediateRender: false }, t0);
  tl.fromTo(id, { x: 0 }, { x: dx, duration: 0.14, ease: 'power1.out', immediateRender: false }, t0 + 0.2);
});
tl.fromTo('#s2-core', { scale: 1 }, { scale: 1.08, duration: 0.12, yoyo: true, repeat: 1, ease: 'power2.out', immediateRender: false }, tAds + 0.85);

// 3. the free version: one chat app window, four agents slide in
tl.fromTo('#s3 .kicker .l', { yPercent: 110 }, { yPercent: 0, duration: 0.5, ease: OUT }, T.at(3));
tl.fromTo('#s3-win', { y: 240, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: OUT }, T.at(3) + 0.05);
tl.fromTo('#s3 .agent', { x: -80, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4, ease: OUT, stagger: 0.07 }, at(3, 0.32));
tl.fromTo('#s3-title', { scale: 1 }, { scale: 1.12, duration: 0.15, yoyo: true, repeat: 1, ease: 'power2.out' }, at(3, 0.72));
tl.fromTo('#s3 .wbar', { backgroundColor: '#1C2350' }, { backgroundColor: '#2A3678', duration: 0.15, yoyo: true, repeat: 1, ease: 'power2.out' }, at(3, 0.72));

// 4. each agent lights as it is named (clicks), each ends with a HANDOFF, then work passes down the chain
const lit = [T.voice(4) + 0.05, T.voice(4) + 0.5, T.voice(4) + 1.1, T.voice(4) + 1.7];
lit.forEach((t, i) => {
  tl.fromTo(`#a${i} .fill`, { opacity: 0 }, { opacity: 1, duration: 0.18, ease: 'power2.out' }, t);
  tl.fromTo(`#a${i} .nm`, { color: '#EEF0FF' }, { color: '#0B0F24', duration: 0.18, ease: 'power2.out' }, t);
  tl.fromTo(`#a${i}`, { scale: 1 }, { scale: 1.04, duration: 0.12, yoyo: true, repeat: 1, ease: 'power2.out' }, t);
  tl.fromTo(`#a${i} .pill`, { scale: 0.3, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.35, ease: POP }, t + 0.06);
});
const hop0 = T.voice(4) + 2.05;
tl.fromTo('#s3-token', { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.25, ease: POP }, hop0 - 0.2);
tl.fromTo('#s3-trackfill', { scaleY: 0 }, { scaleY: 1, duration: 0.84, ease: 'power1.inOut' }, hop0);
for (let k = 0; k < 3; k++) {
  tl.fromTo('#s3-token', { y: k * 194 }, { y: (k + 1) * 194, duration: 0.24, ease: 'power2.inOut', immediateRender: false }, hop0 + k * 0.28);
  tl.fromTo(`#a${k + 1} .pill`, { scale: 1 }, { scale: 1.15, duration: 0.1, yoyo: true, repeat: 1, ease: 'power2.out', immediateRender: false }, hop0 + k * 0.28 + 0.22);
}

// 5. the catch (buzz): the HANDOFF block, you press COPY, drag it to the next agent, paste
tl.fromTo('#s5 .kicker .l', { yPercent: 110 }, { yPercent: 0, duration: 0.45, ease: OUT }, T.at(5));
tl.fromTo('#s5 .kicker', { x: 0 }, { x: 14, duration: 0.05, yoyo: true, repeat: 7, ease: 'none' }, T.voice(5) + 0.3);
tl.fromTo('#s5-card', { y: 160, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: OUT }, T.at(5) + 0.08);
tl.fromTo('#s5 .ln', { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 0.35, ease: 'power3.out', stagger: 0.07 }, T.at(5) + 0.3);
tl.fromTo(['#s5-writer', '#s5-planner'], { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: OUT, stagger: 0.08 }, T.at(5) + 0.25);
tl.fromTo('#s5-arrow', { scaleX: 0 }, { scaleX: 1, duration: 0.35, ease: OUT }, T.at(5) + 0.45);
const tCopy = at(5, 0.33);
tl.fromTo('#s5-cursor', { x: 70, y: 70, opacity: 0 }, { x: 0, y: 0, opacity: 1, duration: 0.3, ease: OUT }, tCopy - 0.35);
tl.fromTo('#s5-copy', { scale: 1 }, { scale: 0.86, duration: 0.1, yoyo: true, repeat: 1, ease: 'power2.out' }, tCopy);
tl.fromTo('#s5-ghost', { scale: 0.6, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.3, ease: POP }, tCopy + 0.08);
const tMove = tCopy + 0.3;
tl.to('#s5-ghost', { x: -25, y: 135, duration: 0.45, ease: 'power2.inOut' }, tMove);
tl.to('#s5-cursor', { x: -25, y: 225, duration: 0.5, ease: 'power2.inOut' }, tMove);
const tPaste = tMove + 0.55;
tl.to('#s5-ghost', { y: 175, scale: 0.5, opacity: 0, duration: 0.2, ease: IN }, tPaste - 0.05);
tl.fromTo('#s5-planner .flash', { opacity: 0 }, { opacity: 1, duration: 0.15, ease: 'power2.out' }, tPaste);
tl.fromTo('#s5-planner .tx', { color: '#EEF0FF' }, { color: '#0B0F24', duration: 0.15, ease: 'power2.out' }, tPaste);
tl.fromTo('#s5-planner', { scale: 1 }, { scale: 1.06, duration: 0.12, yoyo: true, repeat: 1, ease: 'power2.out' }, tPaste);
tl.fromTo('#s5-count', { scale: 0.5, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: POP }, tPaste + 0.35);

// 6. free vs paid: NO ACCESS pops onto the free side, then the paid side wipes in, wired and ticked
tl.fromTo('#s6-free .hd .l', { yPercent: 110 }, { yPercent: 0, duration: 0.5, ease: OUT }, T.at(6));
tl.fromTo('#s6-free .cardc', { y: 120, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: OUT }, T.at(6) + 0.06);
tl.fromTo('#s6-free .rw', { x: -60, opacity: 0 }, { x: 0, opacity: 1, duration: 0.35, ease: OUT, stagger: 0.07 }, T.at(6) + 0.2);
tl.fromTo('#s6-free .foot', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.35, ease: OUT }, T.at(6) + 0.35);
const pop6 = T.voice(6) + 0.5;
tl.fromTo('#s6-stamp', { scale: 2.2, rotation: -26, opacity: 0 }, { scale: 1, rotation: -12, opacity: 1, duration: 0.25, ease: SLAM }, pop6 - 0.25);
tl.fromTo('#s6-free .cardc', { x: 0 }, { x: 12, duration: 0.05, yoyo: true, repeat: 5, ease: 'none' }, pop6);
tl.fromTo('#s6-div', { scaleY: 0 }, { scaleY: 1, duration: 0.4, ease: OUT }, at(6, 0.45));
const wipe6 = at(6, 0.55);
tl.fromTo('#s6-paid', { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 0.5, ease: 'power3.out' }, wipe6);
tl.fromTo('#s6-paid .tk', { scale: 0 }, { scale: 1, duration: 0.3, ease: POP, stagger: 0.15 }, wipe6 + 0.35);
tl.fromTo('#s6-paid .wire', { scaleY: 0 }, { scaleY: 1, duration: 0.3, ease: 'power2.inOut' }, wipe6 + 0.65);
tl.fromTo('#s6-paid .cardc', { scale: 1 }, { scale: 1.04, duration: 0.15, yoyo: true, repeat: 1, ease: 'power2.out' }, wipe6 + 0.95);

// 7. comment TEAM: letters drop into the bubble on the beat, the free sticker and the four agents pop
tl.fromTo('#s7 .kicker .l', { yPercent: 110 }, { yPercent: 0, duration: 0.5, ease: OUT }, T.at(7));
tl.fromTo('#s7-avatar', { scale: 0 }, { scale: 1, duration: 0.4, ease: POP }, T.at(7) + 0.1);
tl.fromTo('#s7-bubble', { scale: 0.4, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.45, ease: POP }, T.at(7) + 0.18);
tl.fromTo('#s7-bubble .ch', { y: -160, opacity: 0 }, { y: 0, opacity: 1, duration: 0.35, ease: 'bounce.out', stagger: T.beat / 4 }, T.voice(7) + 0.3);
tl.fromTo('#s7-sticker', { scale: 0, rotation: -30 }, { scale: 1, rotation: 4, duration: 0.45, ease: POP }, T.voice(7) + 1.2);
tl.fromTo('#s7-team .tm', { scale: 0, y: 40 }, { scale: 1, y: 0, duration: 0.35, ease: POP, stagger: 0.07 }, T.voice(7) + 1.5);
tl.fromTo('#s7-bubble', { scale: 1 }, { scale: 1.04, duration: T.beat / 2, yoyo: true, repeat: 3, ease: 'sine.inOut', immediateRender: false }, T.voice(7) + 1.9);
