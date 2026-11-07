// Tutorial: voice note to to-do list. Analogy: a friend who hears the whole rant and hands back a chit.
// Honesty note for Prashant: the free tool works from a transcript (phone keyboard mic or a voice-to-text app), so the
// Step 1 card shows the keyboard mic, not a file upload, even though the voice says "upload". Before posting, confirm the
// TODO prompt really asks for time order and an urgent flag; if it doesn't, line 5 overclaims. The list is labelled example.
const OUT = 'expo.out', POP = 'back.out(1.8)';
const span = (n) => T.end(n) - T.voice(n);
const at = (n, f) => T.voice(n) + f * span(n);
const title = (s, t) => tl.fromTo(`${s} .title .l`, { yPercent: 110 }, { yPercent: 0, duration: 0.55, ease: OUT, stagger: 0.08 }, t);
const step = (s, t) => tl.fromTo(`${s} .step`, { x: -40, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4, ease: OUT }, t);
const card = (id, t) => tl.fromTo(id, { y: 110, opacity: 0, scale: 0.96 }, { y: 0, opacity: 1, scale: 1, duration: 0.6, ease: OUT }, t);
const late = (id, t) => tl.fromTo(id, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.35, ease: OUT }, t);
const slide = (id, t) => tl.fromTo(id, { x: 60, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4, ease: OUT }, t);
const chip = (id, t) => {
  tl.fromTo(id, { scale: 0, opacity: 0 }, { scale: 1.12, opacity: 1, duration: 0.22, ease: 'power2.out' }, t);
  tl.to(id, { scale: 1, duration: 0.18, ease: 'power2.inOut' }, t + 0.22);
};
const shake = (id, t, px = 8) => tl.fromTo(id, { x: 0 }, { x: px, duration: 0.05, repeat: 5, yoyo: true, ease: 'none' }, t);
const wipe = (id, t, d, n) => tl.fromTo(id, { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: d, ease: 'steps(' + n + ')' }, t);
const wave = (sel, t, reps, d = 0.3) => tl.fromTo(sel, { scaleY: 0.45 }, { scaleY: 1, duration: d, ease: 'sine.inOut', yoyo: true, repeat: reps, stagger: 0.04 }, t);

// texture: two soft orbs drift for the whole reel
tl.fromTo('#orb1', { x: 0, y: 0 }, { x: 160, y: -120, duration: T.dur, ease: 'sine.inOut' }, 0);
tl.fromTo('#orb2', { x: 0, y: 0 }, { x: -180, y: -160, duration: T.dur, ease: 'sine.inOut' }, 0);

// progress bar: hidden in the hook and story, one segment per step
tl.fromTo('#bar', { opacity: 0 }, { opacity: 1, duration: 0.4, ease: 'power2.out' }, T.at(3));
tl.fromTo('#p1', { scaleX: 0 }, { scaleX: 1, duration: 0.5, ease: 'power2.out' }, T.at(3) + 0.1);
tl.fromTo('#p2', { scaleX: 0 }, { scaleX: 1, duration: 0.5, ease: 'power2.out' }, T.at(4) + 0.1);
tl.fromTo('#p3', { scaleX: 0 }, { scaleX: 1, duration: 0.5, ease: 'power2.out' }, T.at(5) + 0.1);

// 0. hook: title and the unplayed voice note are on screen at frame 0; the 0 PLAYS stamp slams on the thud
tl.fromTo('#s0-title', { scale: 1.03 }, { scale: 1, duration: 0.7, ease: OUT }, 0);
wave('#s0-wv i', 0, 12);
tl.fromTo('#s0-dot', { scale: 1 }, { scale: 1.35, duration: 0.3, yoyo: true, repeat: 5, ease: 'sine.inOut' }, 0.6);
const thud0 = T.voice(0) + 0.4;
tl.fromTo('#s0-stamp', { scale: 2.4, opacity: 0, rotation: -18 }, { scale: 1, opacity: 1, rotation: -6, duration: 0.22, ease: 'power4.in' }, thud0 - 0.22);
shake('#s0-vn', thud0, 7);
tl.fromTo('#s0-step', { scale: 1 }, { scale: 1.12, duration: 0.18, yoyo: true, repeat: 1, ease: 'power2.out' }, at(0, 0.8));

// 1. metro home: the train rides office to home, the rant counts up to 2:00, then NEVER replayed
step('#s1', T.at(1)); title('#s1', T.at(1) + 0.05); card('#s1-card', T.at(1) + 0.15);
late('#s1-head', T.at(1) + 0.45); late('#route', T.at(1) + 0.35);
tl.fromTo('#trk-f', { scaleX: 0 }, { scaleX: 1, duration: 1.4, ease: 'power2.inOut' }, T.voice(1) + 0.1);
tl.fromTo('#train', { x: 0 }, { x: 280, duration: 1.4, ease: 'power2.inOut' }, T.voice(1) + 0.1);
chip('#stB', T.voice(1) + 1.45);
slide('#s1-vn', at(1, 0.3));
wave('#s1-wv i', at(1, 0.3) + 0.1, 6);
const clock = { v: 0 };
tl.fromTo(clock, { v: 0 }, { v: 120, duration: 0.9, ease: 'power2.out', onUpdate: () => { const s = Math.round(clock.v); document.getElementById('s1-time').textContent = Math.floor(s / 60) + ':' + String(s % 60).padStart(2, '0'); } }, at(1, 0.3) + 0.1);
slide('#s1-row', at(1, 0.62));
chip('#s1-never', at(1, 0.78));
shake('#s1-never', at(1, 0.78) + 0.42, 6);
late('#s1-note', at(1, 0.88));

// 2. the analogy: rant fragments land, the filler gets struck out, the useful bits turn blue, the chit slides up
step('#s2', T.at(2)); title('#s2', T.at(2) + 0.05); card('#s2-card', T.at(2) + 0.15); late('#s2-head', T.at(2) + 0.45);
['#f1', '#f2', '#f3', '#f4', '#f5', '#f6'].forEach((id, i) => tl.fromTo(id, { scale: 0.6, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.35, ease: POP }, T.at(2) + 0.4 + i * 0.07));
const fillAt = at(2, 0.35);
[['#f1', '#sk1'], ['#f3', '#sk3'], ['#f5', '#sk5']].forEach(([id, sk], i) => {
  tl.to(id, { color: '#6B635A', backgroundColor: '#FFFFFF', duration: 0.25, ease: 'power2.out' }, fillAt + i * 0.06);
  tl.fromTo(sk, { scaleX: 0 }, { scaleX: 1, duration: 0.25, ease: 'power3.in' }, fillAt + i * 0.06);
});
['#f2', '#f4', '#f6'].forEach((id, i) => tl.to(id, { backgroundColor: '#DCE3FF', duration: 0.25, ease: 'power2.out' }, fillAt + 0.2 + i * 0.06));
tl.fromTo('#s2-arrow-p', { strokeDashoffset: 140 }, { strokeDashoffset: 0, duration: 0.4, ease: 'power2.out' }, at(2, 0.52));
tl.fromTo('#chit', { y: 80, opacity: 0, rotation: -10 }, { y: 0, opacity: 1, rotation: -2, duration: 0.5, ease: POP }, at(2, 0.6));
['#c1', '#c2', '#c3'].forEach((id, i) => wipe(id, at(2, 0.6) + 0.2 + i * 0.14, 0.3, 10));

// 3. step 1: keys settle, the mic pops and pulses, the transcript types itself line by line
step('#s3', T.at(3)); title('#s3', T.at(3) + 0.05); card('#s3-card', T.at(3) + 0.15); late('#s3-head', T.at(3) + 0.45);
['#s3-k1', '#s3-k2', '#s3-k3', '#s3-k4'].forEach((id, i) => tl.fromTo(id, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.3, ease: OUT }, T.at(3) + 0.4 + i * 0.05));
chip('#mic', T.at(3) + 0.5);
tl.fromTo('#ring', { scale: 1, opacity: 0.7 }, { scale: 1.6, opacity: 0, duration: 0.8, ease: 'power2.out', repeat: 2, immediateRender: false }, T.voice(3) + 0.4);
['#y1', '#y2', '#y3'].forEach((id, i) => wipe(id, T.voice(3) + 0.2 + i * 0.55, 0.5, 18));
tl.fromTo('#caret', { opacity: 1 }, { opacity: 0, duration: 0.25, repeat: 7, yoyo: true, ease: 'steps(1)' }, T.voice(3) + 1.3);
late('#s3-note', at(3, 0.72));

// 4. step 2: the prompt pastes in, the transcript fills, Send presses on the click
step('#s4', T.at(4)); title('#s4', T.at(4) + 0.05); card('#s4-card', T.at(4) + 0.15); late('#s4-head', T.at(4) + 0.4);
['#s4-d1', '#s4-d2', '#s4-d3'].forEach((id, i) => chip(id, T.at(4) + 0.35 + i * 0.05));
tl.fromTo('#s4-p', { scale: 0.92, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: POP }, T.voice(4) + 0.15);
late('#s4-t', T.voice(4) + 0.35);
wipe('#s4-tt', T.voice(4) + 0.45, 0.35, 16);
late('#s4-send', T.at(4) + 0.45);
const click4 = T.voice(4) + 0.9;
tl.to('#s4-send', { scale: 0.9, duration: 0.08, ease: 'power2.in' }, click4 - 0.08);
tl.to('#s4-send', { scale: 1.06, duration: 0.15, ease: 'power2.out' }, click4);
tl.to('#s4-send', { scale: 1, duration: 0.15, ease: 'power2.inOut' }, click4 + 0.15);
tl.to('#s4-send', { backgroundColor: '#1E1A16', duration: 0.2, ease: 'power2.out' }, click4);
late('#s4-warn', T.voice(4) + 1.1);

// 5. step 3: rows land jumbled on the pop, slide into time order, then the urgent two turn amber
step('#s5', T.at(5)); title('#s5', T.at(5) + 0.05); card('#s5-card', T.at(5) + 0.15); late('#s5-head', T.at(5) + 0.45);
['#s5-r3', '#s5-r1', '#s5-r4', '#s5-r2'].forEach((id, i) => tl.fromTo(id, { scale: 0.9, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.35, ease: POP }, T.voice(5) + 0.6 + i * 0.07));
const sortAt = at(5, 0.45);
[['#s5-r1', 124], ['#s5-r2', 248], ['#s5-r3', -248], ['#s5-r4', -124]].forEach(([id, off], i) => tl.fromTo(id, { y: off }, { y: 0, duration: 0.5, ease: 'power2.inOut' }, sortAt + i * 0.03));
const amberAt = at(5, 0.72);
[['#s5-r1', '#s5-f1'], ['#s5-r2', '#s5-f2']].forEach(([id, fl], i) => {
  tl.to(id, { backgroundColor: '#FCE6B0', duration: 0.25, ease: 'power2.out' }, amberAt + i * 0.08);
  chip(fl, amberAt + 0.05 + i * 0.08);
});
late('#s5-note', at(5, 0.88));

// 6. the result: 2:00 rant becomes 4 jobs, the finished list lands, ticks pop on the beat, the card bumps on the ding
step('#s6', T.at(6)); title('#s6', T.at(6) + 0.05);
slide('#s6-vn', T.at(6) + 0.1);
wave('#s6-wv i', T.at(6) + 0.2, 4);
tl.fromTo('#s6-arrow', { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 0.3, ease: 'power3.out' }, T.at(6) + 0.3);
chip('#s6-jobs', T.at(6) + 0.45);
card('#s6-card', T.at(6) + 0.15); late('#s6-h', T.at(6) + 0.4); late('#s6-note', T.at(6) + 0.5);
['#d6-1', '#d6-2', '#d6-3', '#d6-4'].forEach((id, i) => slide(id, T.at(6) + 0.3 + i * 0.07));
['#tk1', '#tk2', '#tk3', '#tk4'].forEach((id, i) => chip(id, T.voice(6) + 0.15 + i * T.beat / 4));
tl.to('#s6-card', { scale: 1.04, duration: 0.15, yoyo: true, repeat: 1, ease: 'sine.inOut' }, T.voice(6) + 0.8);
['#s6-f1', '#s6-f2'].forEach((id, i) => tl.fromTo(id, { rotation: 0 }, { rotation: 8, duration: 0.08, yoyo: true, repeat: 3, ease: 'sine.inOut' }, T.voice(6) + 1.3 + i * 0.1));

// 7. the catch: metro noise jitters, a word goes missing on the buzz, then names and dates get CHECK
step('#s7', T.at(7)); title('#s7', T.at(7) + 0.05); card('#s7-card', T.at(7) + 0.15); late('#s7-head', T.at(7) + 0.45);
tl.fromTo('#s7-nz i', { scaleY: 0.3 }, { scaleY: 1, duration: 0.12, yoyo: true, repeat: 15, stagger: 0.03, ease: 'sine.inOut' }, T.at(7) + 0.3);
slide('#heard', T.at(7) + 0.4);
const buzz7 = T.voice(7) + 0.9;
chip('#gap', buzz7 - 0.05);
shake('#heard', buzz7 + 0.4, 8);
slide('#s7-c1', at(7, 0.5)); slide('#s7-c2', at(7, 0.6));
chip('#s7-h1', at(7, 0.72)); chip('#s7-h2', at(7, 0.86));
late('#s7-note', at(7, 0.84));

// 8. send this, then the keyword: letters drop in on the beat, the free sticker and bookmark follow
title('#s8', T.at(8));
tl.fromTo('#plane', { x: -200, opacity: 0, rotation: -20 }, { x: 0, opacity: 1, rotation: 0, duration: 0.7, ease: 'power2.out' }, T.at(8) + 0.25);
tl.fromTo('#plane', { y: 120 }, { y: 0, duration: 0.7, ease: 'back.out(2)' }, T.at(8) + 0.25);
late('#who', T.voice(8) + 0.35);
tl.fromTo('#key', { scale: 0.85, opacity: 0, y: 40 }, { scale: 1, opacity: 1, y: 0, duration: 0.5, ease: POP }, at(8, 0.55));
late('#key-l', at(8, 0.55) + 0.2);
const kwAt = at(8, 0.7);
['#kw1', '#kw2', '#kw3', '#kw4'].forEach((id, i) => tl.fromTo(id, { y: -70, opacity: 0 }, { y: 0, opacity: 1, duration: 0.35, ease: 'back.out(2.2)' }, kwAt + i * T.beat / 2));
chip('#free', kwAt + 2 * T.beat + 0.1);
late('#bm', kwAt + 2 * T.beat + 0.2);
late('#bm-l', kwAt + 2 * T.beat + 0.25);
tl.to('#kw', { scale: 1.06, duration: 0.3, yoyo: true, repeat: 1, ease: 'sine.inOut' }, T.end(8) + 0.2);
tl.to('#plane', { x: 24, y: -18, duration: 0.8, yoyo: true, repeat: 1, ease: 'sine.inOut' }, T.end(8));
