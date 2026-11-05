// Tool explainer: lock one chat instead of deleting it. Analogy: a locker inside your cupboard.
// Honesty: every app screen is a mock labelled ILLUSTRATION, not the real app UI; chat titles are labelled EXAMPLE.
// Before publishing, confirm on OpenAI's own help page that chat lock, PIN plus fingerprint/face unlock, free-plan access,
// the slow rollout and "reset deletes locked chats" all match the script. If any differ, fix post.json first.
// Motion: enters expo.out 0.4 to 0.55 s, pops back.out 0.4 s, slams power4.in, stagger 0.07 s, follow-through labels.
const OUT = 'expo.out', POP = 'back.out(1.8)', INK = '#1E1A16', BLUE = '#2B50D6';
const span = (n) => T.end(n) - T.voice(n);
const vt = (n, f) => T.voice(n) + f * span(n);
const title = (s, t) => tl.fromTo(`${s} .title .l`, { yPercent: 110 }, { yPercent: 0, duration: 0.55, ease: OUT, stagger: 0.08 }, t);
const step = (s, t) => tl.fromTo(`${s} .step`, { x: -40, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4, ease: OUT }, t);
const card = (id, t) => tl.fromTo(id, { y: 110, opacity: 0, scale: 0.96 }, { y: 0, opacity: 1, scale: 1, duration: 0.55, ease: OUT }, t);
const late = (id, t) => tl.fromTo(id, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.35, ease: OUT }, t);
const rise = (ids, t, gap = 0.07) => ids.forEach((id, i) => tl.fromTo(id, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: OUT }, t + i * gap));
const slide = (ids, t, gap = 0.08) => ids.forEach((id, i) => tl.fromTo(id, { x: 60, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4, ease: OUT }, t + i * gap));
const chip = (id, t) => { // anticipation, then settle
  tl.fromTo(id, { scale: 0, opacity: 0 }, { scale: 1.12, opacity: 1, duration: 0.22, ease: 'power2.out' }, t);
  tl.to(id, { scale: 1, duration: 0.18, ease: 'power2.inOut' }, t + 0.22);
};
const shake = (id, t, px = 8) => tl.fromTo(id, { x: 0 }, { x: px, duration: 0.05, repeat: 5, yoyo: true, ease: 'none', immediateRender: false }, t);
const bump = (id, t, s = 1.05) => tl.fromTo(id, { scale: 1 }, { scale: s, duration: 0.15, yoyo: true, repeat: 1, ease: 'sine.inOut', immediateRender: false }, t);

// ambient: two soft orbs drift for the whole reel
tl.fromTo('#orb1', { x: 0, y: 0 }, { x: 170, y: -110, duration: T.dur, ease: 'sine.inOut' }, 0);
tl.fromTo('#orb2', { x: 0, y: 0 }, { x: -190, y: -150, duration: T.dur, ease: 'sine.inOut' }, 0);

// progress bar: one segment per beat after the hook
const segs = [1, 2, 3, 4, 5, 6, 7, 8];
tl.set(segs.map((n) => `#p${n}`), { scaleX: 0 }, 0);
segs.forEach((n) => tl.to(`#p${n}`, { scaleX: 1, duration: 0.5, ease: 'power2.out' }, T.at(n)));

// 0. hook: title and bin on screen at frame 0, the red no-sign slams on "Stop", blue squiggle under "chats."
tl.fromTo('#s0-title .l', { yPercent: 0 }, { yPercent: 0, duration: 0.01 }, 0);
tl.fromTo('#s0-title', { scale: 1.06 }, { scale: 1, duration: 0.7, ease: OUT, transformOrigin: '0% 50%' }, 0);
tl.fromTo('#s0-no', { scale: 2.4, opacity: 0, rotation: -25 }, { scale: 1, opacity: 1, rotation: 0, duration: 0.18, ease: 'power4.in' }, 0);
shake('#s0-bin', T.voice(0) + 0.1, 7);
tl.fromTo('#s0-squig-p', { strokeDashoffset: 400 }, { strokeDashoffset: 0, duration: 0.5, ease: 'power2.out' }, T.voice(0) + 0.9);
shake('#s0-bin', vt(0, 0.75), 6);
bump('#s0-no', vt(0, 0.75) + 0.3, 1.08);

// 1. one phone, two people: the roommate's eyes sweep your chat list, then the line everyone hears
step('#s1', T.at(1)); title('#s1', T.at(1) + 0.05); card('#s1-card', T.at(1) + 0.1);
late('#s1-lbl', T.at(1) + 0.35);
rise(['#s1-r1', '#s1-r2', '#s1-r3'], T.at(1) + 0.25);
tl.fromTo('#s1-scan', { opacity: 0 }, { opacity: 1, duration: 0.2, ease: 'power2.out' }, vt(1, 0.1));
tl.fromTo('#s1-scan', { y: 0 }, { y: 220, duration: 0.9, ease: 'power2.inOut' }, vt(1, 0.15));
['#s1-r1', '#s1-r2', '#s1-r3'].forEach((id, i) => tl.to(id, { backgroundColor: '#FBE9E6', duration: 0.2, ease: 'power2.out' }, vt(1, 0.15) + i * 0.45));
tl.fromTo('#s1-av', { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.35, ease: POP }, vt(1, 0.4));
tl.fromTo('#s1-bub', { scale: 0.8, opacity: 0, y: 20 }, { scale: 1, opacity: 1, y: 0, duration: 0.4, ease: POP, transformOrigin: '0% 100%' }, vt(1, 0.45));

// 2. the analogy (full width): the open cupboard of chats, then the blue locker, then the shackle snaps shut
step('#s2', T.at(2)); title('#s2', T.at(2) + 0.05); card('#s2-card', T.at(2) + 0.12);
late('#s2-lbl', T.at(2) + 0.4);
rise(['#s2-a', '#s2-b', '#s2-c', '#s2-d'], T.at(2) + 0.3);
tl.fromTo('#s2-lk', { scale: 0.9, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.45, ease: POP }, vt(2, 0.5));
tl.fromTo('#s2-shackle', { y: -44 }, { y: 0, duration: 0.25, ease: 'power4.in' }, vt(2, 0.78));
bump('#s2-lk', vt(2, 0.78) + 0.25);
late('#s2-ll', vt(2, 0.85));

// 3. set the PIN: toggle on, four dots fill on half-beats, LOCK is pressed on the click
step('#s3', T.at(3)); title('#s3', T.at(3) + 0.05); card('#s3-card', T.at(3) + 0.12);
late('#s3-lbl', T.at(3) + 0.4);
rise(['#s3-r1', '#s3-r2', '#s3-r3'], T.at(3) + 0.25);
tl.set('#s3-lock', { opacity: 0, scale: 0 }, 0);
tl.fromTo('#s3-tog', { backgroundColor: '#CFC8BD' }, { backgroundColor: BLUE, duration: 0.25, ease: 'power2.out' }, T.at(3) + 0.5);
tl.fromTo('#s3-knob', { x: 0 }, { x: 50, duration: 0.3, ease: 'power2.inOut' }, T.at(3) + 0.5);
['#s3-d1', '#s3-d2', '#s3-d3', '#s3-d4'].forEach((id, i) => tl.fromTo(id, { scale: 0 }, { scale: 1, duration: 0.25, ease: POP }, T.voice(3) + 0.6 + i * T.beat / 3));
const press = T.voice(3) + 1.6;
tl.to('#s3-chip', { scale: 0.86, duration: 0.08, ease: 'power2.in' }, press);
tl.to('#s3-chip', { scale: 1, backgroundColor: INK, duration: 0.25, ease: POP }, press + 0.08);
chip('#s3-lock', press + 0.1);
late('#s3-note', press + 0.4);

// 4. fingerprint or face: PIN is already on, the two quicker unlocks switch on as they are named
step('#s4', T.at(4)); title('#s4', T.at(4) + 0.05); card('#s4-card', T.at(4) + 0.1);
late('#s4-lbl', T.at(4) + 0.35);
rise(['#s4-r1', '#s4-r2', '#s4-r3'], T.at(4) + 0.2);
chip('#s4-c2', T.voice(4) + 0.45); bump('#s4-i2', T.voice(4) + 0.45, 1.18);
chip('#s4-c3', T.voice(4) + 0.9); bump('#s4-i3', T.voice(4) + 0.9, 1.18);

// 5. the payoff: what the roommate sees. Open rows slide in, the locked row stays blurred, the lock holds, FREE lands
step('#s5', T.at(5)); title('#s5', T.at(5) + 0.05); card('#s5-card', T.at(5) + 0.1);
late('#s5-lbl', T.at(5) + 0.35);
slide(['#s5-r1', '#s5-r2'], T.at(5) + 0.3);
chip('#s5-c1', vt(5, 0.12)); chip('#s5-c2', vt(5, 0.12) + 0.08);
slide(['#s5-r3'], vt(5, 0.3));
chip('#s5-lock', vt(5, 0.36)); chip('#s5-c3', vt(5, 0.42));
shake('#s5-lock', vt(5, 0.5), 6);
bump('#s5-r3', vt(5, 0.5) + 0.35);
slide(['#s5-r4'], vt(5, 0.68)); chip('#s5-c4', vt(5, 0.8));

// 6. the catch: some phones have it, some don't yet, your app gets an amber "not yet?"
step('#s6', T.at(6)); title('#s6', T.at(6) + 0.05); card('#s6-card', T.at(6) + 0.1);
late('#s6-lbl', T.at(6) + 0.35);
['#s6-p1', '#s6-p2', '#s6-p3', '#s6-p4'].forEach((id, i) => tl.fromTo(id, { scale: 0.6, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: POP }, T.at(6) + 0.35 + i * 0.07));
chip('#s6-l1', vt(6, 0.28)); chip('#s6-l3', vt(6, 0.28) + 0.15);
rise(['#s6-you'], vt(6, 0.55));
chip('#s6-c', vt(6, 0.66)); shake('#s6-c', vt(6, 0.66) + 0.4, 6);
late('#s6-note', vt(6, 0.85));

// 7. forget vs reset: SAFE in green, WIPES in red on the buzz, the locked chats get struck out, GONE slams on "forever"
step('#s7', T.at(7)); title('#s7', T.at(7) + 0.05); card('#s7-card', T.at(7) + 0.1);
late('#s7-lbl', T.at(7) + 0.35);
rise(['#s7-r1'], T.voice(7) + 0.1); chip('#s7-c1', vt(7, 0.22));
rise(['#s7-r2'], vt(7, 0.4)); late('#s7-lbl2', vt(7, 0.44)); rise(['#s7-l1', '#s7-l2'], vt(7, 0.46));
chip('#s7-c2', T.voice(7) + 2.6); shake('#s7-r2', T.voice(7) + 2.6, 8);
['#s7-s1', '#s7-s2'].forEach((id, i) => tl.fromTo(id, { scaleX: 0 }, { scaleX: 1, duration: 0.3, ease: 'power3.out' }, vt(7, 0.64) + i * 0.12));
tl.to(['#s7-l1', '#s7-l2'], { opacity: 0.35, duration: 0.3, ease: 'power2.out' }, vt(7, 0.72));
tl.fromTo('#s7-gone', { scale: 2.4, opacity: 0, rotation: -24 }, { scale: 1, opacity: 1, rotation: -8, duration: 0.24, ease: 'power4.in' }, vt(7, 0.86));
shake('#s7-card', vt(7, 0.86) + 0.24, 6);

// 8. send this, the free card preview, then the keyword drops in letter by letter on the pop
title('#s8', T.at(8));
late('#s8-who', T.voice(8) + 0.3);
card('#s8-card', T.at(8) + 0.45);
late('#s8-lbl', T.at(8) + 0.7); late('#s8-head', T.at(8) + 0.75);
slide(['#s8-n1', '#s8-n2', '#s8-n3'], T.at(8) + 0.85);
const kw = T.voice(8) + 2.8;
tl.fromTo('#s8-pill', { scale: 0.6, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.45, ease: POP }, kw);
late('#s8-cm', kw + 0.1);
tl.fromTo('#s8-kw .k', { y: -90, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: 'back.out(2)', stagger: 0.04 }, kw + 0.15);
tl.to('#s8-pill', { scale: 1.04, duration: 0.3, yoyo: true, repeat: 1, ease: 'sine.inOut' }, T.end(8) + 0.2);
