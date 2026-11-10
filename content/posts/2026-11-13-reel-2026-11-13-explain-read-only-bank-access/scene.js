// Explainer: read-only bank access. One idea (an app can look, never move money), one analogy (your CA gets the passbook,
// not your ATM card and PIN), colour = meaning: blue = AI app, green = allowed, red = never / scam, amber = the catch.
//
// FLAGS FOR THE PUBLISHER (please read before posting):
// 1. Plan: the 13 Nov fixed slots are tool #11 (09:00), compare #17 (13:00) and a money tutorial #11 (19:30).
//    This week's plan says "No explain reels this week", and this brief has no header block (slot, hook id, list card,
//    named viewer, arm/pair). Per the plan, a slot that can't follow its line is skipped and logged, never swapped.
//    If it runs anyway, log it as off-plan: kind explain, list card no.
// 2. Proof: check "Claude Personal Finance", Plaid, read-only, US-only and paid against the release notes before posting.
//    The stage only draws what the script claims (connect, log in via Plaid, read-only, US, paid) and names no price.
// 3. Keyword: PRIVATE must match the "What Not to Type into AI Card" on the tools page (housekeeping step 4).
// 4. The voice says "ID number" and the caption says "Aadhaar". The stage follows the caption.
//
// Motion system: enters expo.out 0.4 to 0.6 s, pops back.out, stamps slam power4.in, stagger 0.07 s,
// labels settle after their card, slow ambient orbs behind it all. Every selector below is a literal id.
const OUT = 'expo.out', POP = 'back.out(1.8)';
const span = (n) => T.end(n) - T.voice(n);
const at = (n, f) => T.voice(n) + f * span(n);
const title = (sel, t) => tl.fromTo(sel, { yPercent: 110 }, { yPercent: 0, duration: 0.55, ease: OUT, stagger: 0.08 }, t);
const card = (id, t) => tl.fromTo(id, { y: 110, opacity: 0, scale: 0.96 }, { y: 0, opacity: 1, scale: 1, duration: 0.6, ease: OUT }, t);
const step = (sel, t) => tl.fromTo(sel, { x: -40, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4, ease: OUT }, t);
const late = (id, t) => tl.fromTo(id, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.35, ease: OUT }, t);
const slide = (id, t) => tl.fromTo(id, { x: 60, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4, ease: OUT }, t);
const chip = (id, t) => {
  tl.fromTo(id, { scale: 0, opacity: 0 }, { scale: 1.12, opacity: 1, duration: 0.22, ease: 'power2.out' }, t);
  tl.to(id, { scale: 1, duration: 0.18, ease: 'power2.inOut' }, t + 0.22);
};
const slam = (id, t, rot) => tl.fromTo(id, { scale: 2.4, opacity: 0, rotation: rot - 14 }, { scale: 1, opacity: 1, rotation: rot, duration: 0.24, ease: 'power4.in' }, t);
const shake = (id, t, px = 8) => tl.fromTo(id, { x: 0 }, { x: px, duration: 0.05, repeat: 5, yoyo: true, ease: 'none' }, t);
const wipe = (id, t, d, n) => tl.fromTo(id, { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: d, ease: 'steps(' + n + ')' }, t);
const bump = (id, t, s = 1.05) => tl.to(id, { scale: s, duration: 0.15, yoyo: true, repeat: 1, ease: 'sine.inOut' }, t);

// ambient layer
tl.fromTo('#orb1', { x: 0, y: 0 }, { x: 160, y: -120, duration: T.dur, ease: 'sine.inOut' }, 0);
tl.fromTo('#orb2', { x: 0, y: 0 }, { x: -180, y: -150, duration: T.dur, ease: 'sine.inOut' }, 0);

// progress bar, one segment per beat after the hook
const segs = [['#p1', 1], ['#p2', 2], ['#p3', 3], ['#p4', 4], ['#p5', 5], ['#p6', 6], ['#p7', 7], ['#p8', 8], ['#p9', 9]];
tl.set(['#p1', '#p2', '#p3', '#p4', '#p5', '#p6', '#p7', '#p8', '#p9'], { scaleX: 0 }, 0);
segs.forEach(([id, n]) => tl.to(id, { scaleX: 1, duration: 0.5, ease: 'power2.out' }, T.at(n)));

// 0. hook: title and both badges on screen at frame 0; the tick, then the red cross thuds onto MOVE
tl.fromTo('#s0-title', { scale: 1.06 }, { scale: 1, duration: 0.7, ease: OUT }, 0);
tl.fromTo('#s0-step', { opacity: 0.6 }, { opacity: 1, duration: 0.3, ease: 'power2.out' }, 0);
tl.fromTo('#s0-look', { scale: 0.92, opacity: 1 }, { scale: 1, opacity: 1, duration: 0.5, ease: POP }, 0);
tl.fromTo('#s0-move', { scale: 0.92, opacity: 1 }, { scale: 1, opacity: 1, duration: 0.5, ease: POP }, 0.08);
chip('#m-look', T.voice(0) + 0.15);
slam('#m-move', T.voice(0) + 0.5, 0);
shake('#s0-move', T.voice(0) + 0.74, 7);
bump('#s0-look', at(0, 0.8), 1.06);

// 1. the search: tap, the question types in, the worried follow-ups drop below
step('#s1 .step', T.at(1)); title('#s1 .title .l', T.at(1) + 0.05); card('#s1-card', T.at(1) + 0.15);
tl.fromTo('#s1-box', { scale: 1 }, { scale: 0.97, duration: 0.1, yoyo: true, repeat: 1, ease: 'power2.inOut' }, T.voice(1) + 0.6);
wipe('#ql1', at(1, 0.3), 0.5, 16);
wipe('#ql2', at(1, 0.3) + 0.55, 0.45, 18);
slide('#g1', at(1, 0.72));
slide('#g2', at(1, 0.72) + 0.07);
slide('#g3', at(1, 0.72) + 0.14);

// 2. the analogy: the passbook goes to the CA (GIVE), the ATM card and PIN stay home (NEVER)
step('#s2 .step', T.at(2)); title('#s2 .title .l', T.at(2) + 0.05); card('#s2-card', T.at(2) + 0.15);
slide('#s2-give', at(2, 0.15));
tl.fromTo('#book', { rotation: -8, scale: 0.9 }, { rotation: 0, scale: 1, duration: 0.5, ease: POP }, at(2, 0.15) + 0.06);
chip('#s2-gc', at(2, 0.38));
slide('#s2-keep', at(2, 0.55));
tl.fromTo('#pin i', { scale: 0 }, { scale: 1, duration: 0.3, ease: POP, stagger: 0.06 }, at(2, 0.62));
chip('#s2-kc', at(2, 0.82));
shake('#atm', at(2, 0.82) + 0.2, 7);

// 3. read-only (full width): bank and app, the LOOK arrow draws, the MOVE arrow gets BLOCKED on the buzz
step('#s3 .step', T.at(3)); title('#s3 .title .l', T.at(3) + 0.05); card('#s3-card', T.at(3) + 0.15);
tl.fromTo(['#nb', '#na'], { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.45, ease: POP, stagger: 0.08 }, T.at(3) + 0.35);
tl.fromTo('#ar-look', { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 0.4, ease: 'power3.out' }, T.voice(3) + 0.85);
late('#al-look', T.voice(3) + 0.95);
slide('#pr1', T.voice(3) + 1.0); chip('#pc1', T.voice(3) + 1.12);
tl.fromTo('#ar-move', { clipPath: 'inset(0 0 0 100%)' }, { clipPath: 'inset(0 0 0 0%)', duration: 0.35, ease: 'power3.out' }, T.voice(3) + 1.25);
late('#al-move', T.voice(3) + 1.3);
slam('#s3-stamp', T.voice(3) + 1.6, -8);
shake('#ar-move', T.voice(3) + 1.84, 6);
slide('#pr2', T.voice(3) + 1.7); chip('#pc2', T.voice(3) + 1.82);
slide('#pr3', T.voice(3) + 1.85); chip('#pc3', T.voice(3) + 1.97);

// 4. the password: dots type on the bank's own page (pop on TYPE IT HERE), the chat version gets struck out
step('#s4 .step', T.at(4)); title('#s4 .title .l', T.at(4) + 0.05); card('#s4-card', T.at(4) + 0.15);
tl.fromTo('#s4-page', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.4, ease: OUT }, T.at(4) + 0.3);
wipe('#s4-dots', T.voice(4) + 0.3, 0.4, 8);
chip('#s4-here', T.voice(4) + 0.8);
chip('#s4-login', T.voice(4) + 0.88);
tl.fromTo('#s4-chat', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.35, ease: OUT }, T.voice(4) + 0.7);
tl.fromTo('#s4-bub', { scale: 0.6, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.3, ease: POP }, T.voice(4) + 0.78);
tl.fromTo('#s4-strike', { scaleX: 0 }, { scaleX: 1, duration: 0.2, ease: 'power3.in' }, T.voice(4) + 0.95);
chip('#s4-never', T.voice(4) + 1.0);
shake('#s4-bub', at(4, 0.8), 7);

// 5. the real example: three steps of how it connects, the read-only step last
step('#s5 .step', T.at(5)); title('#s5 .title .l', T.at(5) + 0.05); card('#s5-card', T.at(5) + 0.15);
late('#s5-head', T.at(5) + 0.5);
slide('#st1', at(5, 0.15)); chip('#sn1', at(5, 0.15) + 0.08); chip('#sc1', at(5, 0.15) + 0.2);
slide('#st2', at(5, 0.42)); chip('#sn2', at(5, 0.42) + 0.08); chip('#sc2', at(5, 0.42) + 0.2);
slide('#st3', at(5, 0.68)); chip('#sn3', at(5, 0.68) + 0.08); chip('#sc3', at(5, 0.68) + 0.2);
bump('#st3', T.end(5) - 0.35, 1.04);

// 6. the rule (payoff, cooker whistles): title snaps in, the READ-ONLY seal slams
step('#s6 .step', T.at(6));
tl.fromTo('#s6-title .l', { yPercent: 110 }, { yPercent: 0, duration: 0.45, ease: OUT, stagger: 0.08 }, T.at(6));
slam('#seal', at(6, 0.5), -6);
bump('#seal', at(6, 0.5) + 0.3, 1.05);

// 7. the catch: three rows, the last one is a red NO
step('#s7 .step', T.at(7)); title('#s7 .title .l', T.at(7) + 0.05); card('#s7-card', T.at(7) + 0.15);
slide('#k1', at(7, 0.2)); chip('#kc1', at(7, 0.2) + 0.1);
slide('#k2', at(7, 0.42)); chip('#kc2', at(7, 0.42) + 0.1);
slide('#k3', at(7, 0.7)); chip('#kc3', at(7, 0.7) + 0.1);
shake('#kc3', at(7, 0.7) + 0.4, 6);

// 8. the scam: typing dots, the bot asks for the PIN, SCAM slams on the buzz, the three NEVER rows follow the words
step('#s8 .step', T.at(8)); title('#s8 .title .l', T.at(8) + 0.05); card('#s8-card', T.at(8) + 0.15);
tl.fromTo('#s8-dots', { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 0.25, ease: POP }, T.at(8) + 0.4);
tl.fromTo('#s8-dots i', { y: 0 }, { y: -10, duration: 0.15, yoyo: true, repeat: 3, ease: 'sine.inOut', stagger: 0.08 }, T.at(8) + 0.5);
tl.to('#s8-dots', { opacity: 0, duration: 0.15, ease: 'power3.in' }, T.voice(8) + 0.55);
tl.fromTo('#s8-bub', { scale: 0.7, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.35, ease: POP }, T.voice(8) + 0.65);
late('#s8-ex', T.voice(8) + 0.9);
slam('#s8-stamp', T.voice(8) + 1.5, -10);
shake('#s8-bub', T.voice(8) + 1.74, 8);
slide('#v1', at(8, 0.42)); chip('#vc1', at(8, 0.42) + 0.12);
slide('#v2', at(8, 0.58)); chip('#vc2', at(8, 0.58) + 0.12);
slide('#v3', at(8, 0.72)); chip('#vc3', at(8, 0.72) + 0.12);
bump('#s8-stamp', at(8, 0.93), 1.12);

// 9. send + keyword: the example card the keyword gives, then PRIVATE drops in letter by letter
title('#s9-title .l', T.at(9));
late('#s9-who', T.at(9) + 0.35);
card('#s9-card', T.at(9) + 0.45);
late('#s9-head', T.at(9) + 0.8);
slide('#n1', T.at(9) + 0.9); slide('#n2', T.at(9) + 0.97); slide('#n3', T.at(9) + 1.04); slide('#n4', T.at(9) + 1.11);
chip('#nc1', T.at(9) + 1.05); chip('#nc2', T.at(9) + 1.12); chip('#nc3', T.at(9) + 1.19); chip('#nc4', T.at(9) + 1.26);
tl.fromTo('#s9-pill', { scale: 0.7, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.45, ease: POP }, at(9, 0.55));
tl.fromTo('#s9-kw div', { yPercent: -120, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.4, ease: 'back.out(2)', stagger: 0.04 }, at(9, 0.7));
chip('#s9-free', at(9, 0.7) + 0.4);
bump('#s9-pill', T.end(9) + 0.2, 1.05);
