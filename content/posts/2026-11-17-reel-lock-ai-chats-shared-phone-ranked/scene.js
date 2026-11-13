// Tool reel, ranked list card: 3 ways to hide AI chats on a shared phone. Analogy: one locked drawer in a shared cupboard.
// VERIFY before publish: ChatGPT locked chats + PIN, Temporary Chat "kept up to 30 days", Gemini "kept up to 72 hours", on each company's help page.
// Motion: enters expo.out 0.4-0.6 s, pops back.out, stamp power4.in, stagger 0.07 s, labels settle after their card, ambient orbs drift.
const OUT = 'expo.out', POP = 'back.out(1.8)', BLUE = '#1F5FA8', INK = '#1E1A16', RED = '#B83A3A';
const span = (n) => T.end(n) - T.voice(n);
const at = (n, f) => T.voice(n) + f * span(n);
const title = (s, t) => tl.fromTo(`${s} .title .l`, { yPercent: 110 }, { yPercent: 0, duration: 0.55, ease: OUT, stagger: 0.08 }, t);
const step = (s, t) => tl.fromTo(`${s} .step`, { x: -40, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4, ease: OUT }, t);
const card = (id, t) => tl.fromTo(id, { y: 110, opacity: 0, scale: 0.96 }, { y: 0, opacity: 1, scale: 1, duration: 0.6, ease: OUT }, t);
const late = (id, t) => tl.fromTo(id, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.35, ease: OUT }, t);
const chip = (id, t) => {
  tl.fromTo(id, { scale: 0, opacity: 0 }, { scale: 1.12, opacity: 1, duration: 0.22, ease: 'power2.out' }, t);
  tl.to(id, { scale: 1, duration: 0.18, ease: 'power2.inOut' }, t + 0.22);
};
const pop = (id, t) => tl.fromTo(id, { scale: 0.9, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: POP }, t);
const bump = (id, t, s = 1.05) => tl.to(id, { scale: s, duration: 0.15, yoyo: true, repeat: 1, ease: 'sine.inOut' }, t);
const shake = (id, t, px = 8) => tl.fromTo(id, { x: 0 }, { x: px, duration: 0.05, repeat: 5, yoyo: true, ease: 'none', immediateRender: false }, t);
const rows = (ids, t) => ids.forEach((id, i) => tl.fromTo(id, { x: 50, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4, ease: OUT }, t + i * 0.07));
const fillDots = (sel, color, t, st = 0.1) => tl.to(sel, { backgroundColor: color, duration: 0.12, ease: 'power2.out', stagger: st }, t);

// ambient layer
tl.fromTo('#orb1', { x: 0, y: 0 }, { x: 160, y: -120, duration: T.dur, ease: 'sine.inOut' }, 0);
tl.fromTo('#orb2', { x: 0, y: 0 }, { x: -180, y: -160, duration: T.dur, ease: 'sine.inOut' }, 0);

// progress bar, one segment per beat after the hook
tl.set(['#p1', '#p2', '#p3', '#p4', '#p5', '#p6', '#p7', '#p8'], { scaleX: 0 }, 0);
[1, 2, 3, 4, 5, 6, 7, 8].forEach((n) => tl.to(`#p${n}`, { scaleX: 1, duration: 0.5, ease: 'power2.out' }, T.at(n)));

// 0. hook: title, open padlock and empty PIN pill all on frame 0; the PIN fills and the shackle snaps shut on the click
tl.fromTo('#s0-title', { scale: 1.04 }, { scale: 1, duration: 0.8, ease: OUT }, 0);
tl.fromTo('#s0-lock', { rotation: -8 }, { rotation: 0, duration: 0.6, ease: 'back.out(2)' }, 0.15);
tl.fromTo('#s0-pin', { y: -8 }, { y: 0, duration: 0.4, ease: OUT }, 0.1);
fillDots('#s0-pin .dot', BLUE, T.voice(0) + 1.4, 0.1);
tl.fromTo('#s0-shackle', { y: -30 }, { y: 0, duration: 0.2, ease: 'power4.in' }, T.voice(0) + 1.7);
bump('#s0-lock', T.voice(0) + 1.9, 1.08);
bump('#s0-pin', T.voice(0) + 1.98, 1.06);

// 1. the analogy: a shared cupboard, two drawers anyone can pull, one drawer that locks
step('#s1', T.at(1)); title('#s1', T.at(1) + 0.05); card('#s1-card', T.at(1) + 0.15); late('#s1-head', T.at(1) + 0.45);
rows(['#d1', '#d2', '#d3'], T.at(1) + 0.35);
['#d1', '#d2'].forEach((id, i) => tl.to(id, { x: 26, duration: 0.22, yoyo: true, repeat: 1, ease: 'power2.inOut' }, at(1, 0.3) + i * 0.12));
tl.to('#d3', { backgroundColor: '#E8F0FA', borderColor: BLUE, duration: 0.3, ease: 'power2.out' }, at(1, 0.72));
chip('#s1-lock', at(1, 0.72));
bump('#d3', at(1, 0.72) + 0.4, 1.03);

// 2-3. the countdown: slot 3 fills, then slot 2, slot 1 waits with a question mark
step('#s2', T.at(2)); title('#s2', T.at(2) + 0.05); card('#s2-card', T.at(2) + 0.15); late('#s2-head', T.at(2) + 0.45);
pop('#s2-f3', T.voice(2) + 0.2);
bump('#s2-r3', T.voice(2) + 0.62, 1.03);
pop('#s2-f2', T.voice(3) + 0.2);
bump('#s2-r2', T.voice(3) + 0.62, 1.03);
tl.to('#s2-r1', { borderColor: BLUE, duration: 0.3, ease: 'power2.out' }, at(3, 0.72));
tl.to('#s2-q1', { scale: 1.3, duration: 0.2, yoyo: true, repeat: 1, ease: 'sine.inOut' }, at(3, 0.72));

// 4. number 1, full width: the row fills, FAVOURITE slams on the ding, the PIN dots fill
step('#s4', T.at(4)); title('#s4', T.at(4) + 0.05); card('#s4-card', T.at(4) + 0.1); late('#s4-head', T.at(4) + 0.4);
pop('#s4-f1', T.voice(4) + 0.15);
tl.fromTo('#s4-stamp', { scale: 2.2, opacity: 0, rotation: -16 }, { scale: 1, opacity: 1, rotation: -6, duration: 0.22, ease: 'power4.in' }, T.voice(4) + 0.48);
bump('#s4-r1', T.voice(4) + 0.72, 1.03);
fillDots('#s4-dots .dot', BLUE, at(4, 0.62), 0.1);

// 5. the result: the private chat leaves history, search finds nothing, a borrower hits the PIN screen and fails
step('#s5', T.at(5)); title('#s5', T.at(5) + 0.05); card('#s5-hist', T.at(5) + 0.15); late('#s5-head', T.at(5) + 0.45);
rows(['#s5-ha', '#s5-hb', '#s5-hc'], T.at(5) + 0.35);
tl.to('#s5-hb', { x: -60, opacity: 0, duration: 0.28, ease: 'power3.in' }, at(5, 0.2));
tl.to('#s5-hc', { y: -90, duration: 0.4, ease: 'power2.inOut' }, at(5, 0.2) + 0.3);
tl.fromTo('#s5-q', { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 0.4, ease: 'steps(4)' }, at(5, 0.36));
chip('#s5-nores', at(5, 0.48));
card('#s5-pin', at(5, 0.6));
late('#s5-pinhead', at(5, 0.6) + 0.3);
fillDots('#s5-dots .dot', INK, at(5, 0.6) + 0.45, 0.08);
tl.to('#s5-dots .dot', { borderColor: RED, backgroundColor: RED, duration: 0.15, ease: 'power2.out' }, at(5, 0.6) + 0.85);
shake('#s5-dots', at(5, 0.6) + 0.85, 10);

// 6. the catch: hidden from people, not from OpenAI, not encryption (buzz on NOT HIDDEN)
step('#s6', T.at(6)); title('#s6', T.at(6) + 0.05); card('#s6-card', T.at(6) + 0.15);
rows(['#k1', '#k2', '#k3'], T.at(6) + 0.35);
chip('#c1', T.voice(6) + 0.55);
chip('#c2', T.voice(6) + 1.0);
shake('#k2', T.voice(6) + 1.22, 9);
chip('#c3', at(6, 0.8));
shake('#k3', at(6, 0.8) + 0.4, 7);

// 7. still the catch: read the lost-PIN help page first
tl.fromTo('#k4', { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.45, ease: OUT }, T.voice(7) + 0.15);
chip('#c4', at(7, 0.5));
bump('#k4', T.end(7) - 0.35, 1.03);

// 8. the free card (what it really gives), then the keyword drops in letter by letter
card('#s8-card', T.at(8) + 0.1); late('#s8-head', T.at(8) + 0.4); late('#s8-ex', T.at(8) + 0.45);
rows(['#n1', '#n2', '#n3', '#n4'], T.at(8) + 0.45);
late('#s8-foot', T.at(8) + 0.9);
tl.fromTo('#s8-pill', { scale: 0.6, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.45, ease: POP }, at(8, 0.4));
late('#s8-cm', at(8, 0.4) + 0.2);
tl.fromTo('#s8-key .k', { yPercent: -130, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.4, ease: POP, stagger: 0.09 }, at(8, 0.7));
bump('#s8-pill', T.end(8) + 0.1, 1.04);
