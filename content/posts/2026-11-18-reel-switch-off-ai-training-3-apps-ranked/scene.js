// Clay theme, ranked list: the hook switch flips at frame 0.4, the studio-window analogy, apps 3 > 2 > 1 with their tap paths,
// all three toggles off in the payoff, the catch timeline, the send, then OPTOUT in clay tiles over the free card.
const OUT = 'expo.out', POP = 'back.out(1.8)';
const span = (n) => T.end(n) - T.voice(n);
const fr = (n, f) => T.voice(n) + f * span(n);
const title = (s, t) => tl.fromTo(`${s} .l`, { yPercent: 110 }, { yPercent: 0, duration: 0.55, ease: OUT, stagger: 0.08 }, t);
const rise = (id, t, d = 0.55) => tl.fromTo(id, { y: 90, opacity: 0, scale: 0.96 }, { y: 0, opacity: 1, scale: 1, duration: d, ease: OUT }, t);
const slide = (id, t) => tl.fromTo(id, { x: 60, opacity: 0 }, { x: 0, opacity: 1, duration: 0.35, ease: 'power3.out' }, t);
const pop = (id, t) => tl.fromTo(id, { scale: 0.5, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: POP }, t);
const stepIn = (id, t) => tl.fromTo(id, { x: -40, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4, ease: OUT }, t);
const wipeDown = (id, t) => tl.fromTo(id, { clipPath: 'inset(0 0 100% 0)' }, { clipPath: 'inset(0 0 0% 0)', duration: 0.25, ease: 'power2.out' }, t);
const wipeRight = (id, t, d, ease) => tl.fromTo(id, { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: d, ease }, t);
const press = (id, t) => tl.fromTo(id, { scale: 1 }, { scale: 0.95, duration: 0.1, yoyo: true, repeat: 1, ease: 'power2.inOut' }, t);
const flip = (id, t) => {
  tl.fromTo(`${id} .kn`, { x: 60 }, { x: 0, duration: 0.3, ease: 'power2.inOut' }, t);
  tl.fromTo(id, { backgroundColor: '#B44C20' }, { backgroundColor: '#2E7D46', duration: 0.3, ease: 'power2.inOut' }, t);
  tl.fromTo(`${id} .on`, { opacity: 1 }, { opacity: 0, duration: 0.15, ease: 'power2.out' }, t);
  tl.fromTo(`${id} .off`, { opacity: 0 }, { opacity: 1, duration: 0.2, ease: 'power2.out' }, t + 0.15);
  tl.fromTo(id, { scale: 1 }, { scale: 1.08, duration: 0.14, yoyo: true, repeat: 1, ease: 'sine.inOut' }, t + 0.3);
};

// texture: slow clay blobs drift across the whole reel
tl.fromTo('#blob1', { x: 0, y: 0 }, { x: 240, y: 180, duration: T.dur, ease: 'sine.inOut' }, 0);
tl.fromTo('#blob2', { x: 0, y: 0 }, { x: -220, y: -200, duration: T.dur, ease: 'sine.inOut' }, 0);

// progress bar: one segment per beat
tl.set(['#p1', '#p2', '#p3', '#p4', '#p5', '#p6', '#p7', '#p8'], { scaleX: 0 }, 0);
[1, 2, 3, 4, 5, 6, 7, 8].forEach((n) => tl.to(`#p${n}`, { scaleX: 1, duration: 0.5, ease: 'power2.out' }, T.at(n)));

// 0. hook: title and the ON switch are on screen at frame 0; the switch flips off on the click
tl.fromTo('#s0-title', { scale: 1.05 }, { scale: 1, duration: 0.6, ease: OUT }, 0);
flip('#s0-tg', T.at(0, 0.4));
tl.fromTo('#s0-ring', { scale: 1, opacity: 0.9 }, { scale: 1.5, opacity: 0, duration: 0.6, ease: 'power2.out' }, T.at(0, 0.7));
tl.fromTo('#s0-lab', { x: 0 }, { x: 10, duration: 0.05, repeat: 5, yoyo: true, ease: 'none' }, T.at(0, 0.72));
tl.to('#s0-row', { scale: 1.05, duration: 0.15, yoyo: true, repeat: 1, ease: 'sine.inOut' }, fr(0, 0.62));

// 1. analogy: the chats you typed travel to the studio window
title('#s1', T.at(1) + 0.05);
rise('#s1-card', T.at(1) + 0.15);
pop('#s1-b1', fr(1, 0.05));
pop('#s1-b2', fr(1, 0.2));
wipeDown('#s1-arrow', fr(1, 0.42));
rise('#s1-win', fr(1, 0.48), 0.45);
tl.fromTo('#s1-photo', { scale: 0, rotation: -12 }, { scale: 1, rotation: 0, duration: 0.45, ease: POP }, fr(1, 0.66));
tl.fromTo('#s1-chip', { opacity: 0, filter: 'blur(12px)' }, { opacity: 1, filter: 'blur(0px)', duration: 0.4, ease: 'power3.out' }, fr(1, 0.78));

// 3 > Gemini: the path draws in, the switch clicks off, history goes with it
stepIn('#s2-step', T.at(2));
rise('#s2-card', T.at(2) + 0.08);
tl.fromTo('#s2-badge', { scale: 0, rotation: -90 }, { scale: 1, rotation: 0, duration: 0.45, ease: POP }, T.voice(2) + 0.1);
wipeRight('#s2-url', T.at(2) + 0.45, 0.5, 'steps(17)');
slide('#s2-p1', fr(2, 0.3)); wipeDown('#s2-a1', fr(2, 0.3) + 0.15);
slide('#s2-p2', fr(2, 0.42)); wipeDown('#s2-a2', fr(2, 0.42) + 0.15);
slide('#s2-p3', fr(2, 0.54));
flip('#s2-tg', T.voice(2) + 2.2);
pop('#s2-chip', T.voice(2) + 2.6);

// 2 > Claude: same path shape, history stays
stepIn('#s3-step', T.at(3));
rise('#s3-card', T.at(3) + 0.08);
tl.fromTo('#s3-badge', { scale: 0, rotation: -90 }, { scale: 1, rotation: 0, duration: 0.45, ease: POP }, T.voice(3) + 0.1);
wipeRight('#s3-url', T.at(3) + 0.45, 0.4, 'steps(9)');
slide('#s3-p1', fr(3, 0.33)); wipeDown('#s3-a1', fr(3, 0.33) + 0.15);
slide('#s3-p2', fr(3, 0.45)); wipeDown('#s3-a2', fr(3, 0.45) + 0.15);
slide('#s3-p3', fr(3, 0.57));
flip('#s3-tg', T.voice(3) + 2.0);
pop('#s3-chip', T.voice(3) + 2.3);

// 1 > ChatGPT: full width, the favourite stamp slams, Data controls is tapped on the click
stepIn('#s4-step', T.at(4));
rise('#s4-card', T.at(4) + 0.08, 0.6);
tl.fromTo('#s4-badge', { scale: 0, rotation: -90 }, { scale: 1, rotation: 0, duration: 0.45, ease: POP }, T.voice(4) + 0.15);
wipeRight('#s4-url', T.at(4) + 0.5, 0.45, 'steps(11)');
tl.fromTo('#s4-stamp', { scale: 2.4, opacity: 0, rotation: -20 }, { scale: 1, opacity: 1, rotation: -7, duration: 0.24, ease: 'power4.in' }, fr(4, 0.3) - 0.24);
tl.to('#s4-card', { x: 8, duration: 0.05, repeat: 5, yoyo: true, ease: 'none' }, fr(4, 0.3));
slide('#s4-p1', T.voice(4) + 1.6); wipeDown('#s4-a1', T.voice(4) + 1.75);
slide('#s4-p2', T.voice(4) + 2.0);
press('#s4-p2', T.voice(4) + 2.4);
wipeDown('#s4-a2', T.voice(4) + 2.55);
slide('#s4-p3', T.voice(4) + 2.75);
flip('#s4-tg', fr(4, 0.84));
pop('#s4-c1', fr(4, 0.84) + 0.24);
pop('#s4-c2', fr(4, 0.84) + 0.34);

// 5. payoff: all three off on the half beats, the photo leaves the window for the home album
title('#s5', T.at(5) + 0.05);
rise('#s5-card', T.at(5), 0.4);
flip('#s5-t1', T.voice(5) + 0.2);
flip('#s5-t2', T.voice(5) + 0.4);
flip('#s5-t3', T.voice(5) + 0.6);
rise('#s5-win', T.at(5) + 0.2, 0.45);
rise('#s5-album', T.at(5) + 0.3, 0.45);
tl.fromTo('#s5-photo', { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 0.35, ease: POP }, T.at(5) + 0.35);
tl.fromTo('#s5-photo', { x: 0 }, { x: 305, duration: 0.55, ease: 'power2.inOut' }, fr(5, 0.55));
tl.fromTo('#s5-photo', { y: 0 }, { y: -90, duration: 0.275, ease: 'power2.out' }, fr(5, 0.55));
tl.to('#s5-photo', { y: -29, duration: 0.275, ease: 'power2.in' }, fr(5, 0.55) + 0.275);
tl.to('#s5-album', { scale: 1.05, duration: 0.14, yoyo: true, repeat: 1, ease: 'sine.inOut' }, fr(5, 0.55) + 0.55);

// 6. the catch: a timeline, the TODAY pin slams on the thud, the past is grey and stays used
title('#s6', T.at(6) + 0.05);
rise('#s6-card', T.at(6) + 0.12);
wipeRight('#s6-old', T.at(6) + 0.4, 0.4, 'power2.out');
tl.fromTo('#s6-pin', { y: -50, scaleY: 1.4, opacity: 0 }, { y: 0, scaleY: 1, opacity: 1, duration: 0.22, ease: 'power4.in' }, T.voice(6) + 0.38);
pop('#s6-today', T.voice(6) + 0.62);
wipeRight('#s6-new', T.voice(6) + 0.7, 0.45, 'power2.out');
slide('#s6-k2', fr(6, 0.3));
pop('#s6-c2', fr(6, 0.3) + 0.2);
slide('#s6-k1', fr(6, 0.55));
tl.fromTo('#s6-c1', { scale: 1.8, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.24, ease: 'power4.in' }, fr(6, 0.55) + 0.2);
tl.fromTo('#s6-c1', { x: 0 }, { x: 8, duration: 0.05, repeat: 5, yoyo: true, ease: 'none' }, fr(6, 0.55) + 0.44);
slide('#s6-note', fr(6, 0.82));

// 7. send: the plane flies along the dotted trail to the contact
title('#s7', T.at(7) + 0.05);
wipeRight('#s7-trail', T.at(7) + 0.2, 0.6, 'power2.out');
tl.fromTo('#s7-plane', { x: -320, y: 90, rotation: -25, opacity: 0 }, { x: 0, y: 0, rotation: 0, opacity: 1, duration: 0.7, ease: OUT }, T.at(7) + 0.25);
tl.to('#s7-plane', { y: -14, duration: 0.6, yoyo: true, repeat: 3, ease: 'sine.inOut' }, T.at(7) + 1.0);
rise('#s7-contact', fr(7, 0.3));
tl.fromTo('#s7-av', { scale: 0 }, { scale: 1, duration: 0.4, ease: POP }, fr(7, 0.3) + 0.15);
pop('#s7-pill', fr(7, 0.62));
press('#s7-pill', fr(7, 0.88));

// 8. keyword: OPTOUT tiles drop in on the pop, the free card it gives you, the sticker
tl.fromTo('#s8-lab', { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.4, ease: OUT }, T.at(8));
const rnd = T.rand(8);
['#s8-L1', '#s8-L2', '#s8-L3', '#s8-L4', '#s8-L5', '#s8-L6'].forEach((id, i) => {
  tl.fromTo(id, { y: -160, opacity: 0, rotation: (rnd() - 0.5) * 30 }, { y: 0, opacity: 1, rotation: 0, duration: 0.45, ease: 'back.out(1.6)' }, T.voice(8) + 0.05 + i * 0.06);
});
rise('#s8-card', T.voice(8) + 0.6);
['#s8-o1', '#s8-o2', '#s8-o3'].forEach((id, i) => slide(id, T.voice(8) + 0.9 + i * 0.07));
tl.fromTo('#s8-stk', { scale: 1.8, opacity: 0, rotation: -10 }, { scale: 1, opacity: 1, rotation: -3, duration: 0.24, ease: 'power4.in' }, fr(8, 0.75));
tl.to('#s8-word .lt', { y: -22, duration: 0.15, yoyo: true, repeat: 1, stagger: 0.05, ease: 'power2.out' }, T.voice(8) + 4 * T.beat);
