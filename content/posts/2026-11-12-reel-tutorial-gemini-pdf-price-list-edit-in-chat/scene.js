// Tutorial: shop rate list in Gemini, 3 steps, step 2 (fix it in the same chat) is the payoff.
// Note for review: the LETTER tool is a letter / one-page notes prompt (copy into Google Docs, save as PDF).
// The end card only says what it really gives ("the exact words to use"), not that it is a rate-list maker.
// All prices on screen are labelled EXAMPLE.
const OUT = 'expo.out', POP = 'back.out(1.8)';
const span = (n) => T.end(n) - T.voice(n);
const at = (n, f) => T.voice(n) + f * span(n);
const title = (s, t) => tl.fromTo(`${s} .title .l`, { yPercent: 110 }, { yPercent: 0, duration: 0.55, ease: OUT, stagger: 0.08 }, t);
const step = (s, t) => tl.fromTo(`${s} .step`, { x: -40, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4, ease: OUT }, t);
const rise = (id, t, d = 0.55) => tl.fromTo(id, { y: 110, opacity: 0, scale: 0.96 }, { y: 0, opacity: 1, scale: 1, duration: d, ease: OUT }, t);
const late = (id, t) => tl.fromTo(id, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.35, ease: OUT }, t);
const pop = (id, t) => {
  tl.fromTo(id, { scale: 0, opacity: 0 }, { scale: 1.12, opacity: 1, duration: 0.22, ease: 'power2.out' }, t);
  tl.to(id, { scale: 1, duration: 0.18, ease: 'power2.inOut' }, t + 0.22);
};
const wipe = (id, t, d = 0.4, ease = 'power3.out') => tl.fromTo(id, { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: d, ease }, t);
const strike = (id, t) => tl.fromTo(id, { scaleX: 0 }, { scaleX: 1, duration: 0.3, ease: 'power3.in' }, t);
const shake = (id, t, px = 8) => tl.to(id, { x: px, duration: 0.05, repeat: 5, yoyo: true, ease: 'none' }, t);

// texture: two soft orbs drift the whole reel
tl.fromTo('#orb1', { x: 0, y: 0 }, { x: 160, y: -120, duration: T.dur, ease: 'sine.inOut' }, 0);
tl.fromTo('#orb2', { x: 0, y: 0 }, { x: -180, y: -160, duration: T.dur, ease: 'sine.inOut' }, 0);

// progress bar: one segment per step
tl.set(['#p1', '#p2', '#p3'], { scaleX: 0 }, 0);
[2, 3, 4].forEach((n, i) => tl.to(`#p${i + 1}`, { scaleX: 1, duration: 0.5, ease: 'power2.out' }, T.at(n)));

// 0. hook: title and the three steps are on screen at frame 0; numbers thump, then #2 gets circled
tl.fromTo('#s0-title', { scale: 1.06 }, { scale: 1, duration: 0.7, ease: OUT }, 0);
tl.fromTo('#s0-step', { opacity: 0.6 }, { opacity: 1, duration: 0.3, ease: 'power2.out' }, 0);
['#t1 .num', '#t2 .num', '#t3 .num'].forEach((id, i) => tl.fromTo(id, { scale: 1 }, { scale: 1.18, duration: 0.15, yoyo: true, repeat: 1, ease: 'sine.inOut' }, T.voice(0) + 0.4 + i * T.beat / 2));
const m0 = at(0, 0.6);
tl.fromTo(['#t1', '#t3'], { opacity: 1 }, { opacity: 0.45, duration: 0.3, ease: 'power2.out' }, m0);
tl.fromTo(['#t2', '#s0-ring'], { x: 0 }, { x: 18, duration: 0.4, ease: 'power2.inOut' }, m0);
tl.fromTo('#s0-ring-p', { strokeDashoffset: 1760 }, { strokeDashoffset: 0, duration: 0.6, ease: 'power2.out' }, m0 + 0.1);
pop('#t2-chip', at(0, 0.82));

// 1. the old way: the cardboard list, a price scratched out and rewritten, then a shake
step('#s1', T.at(1)); title('#s1', T.at(1) + 0.05);
tl.fromTo('#s1-board', { y: 110, opacity: 0, rotation: -4 }, { y: 0, opacity: 1, rotation: -1.5, duration: 0.55, ease: OUT }, T.at(1) + 0.12);
['#m1', '#m2', '#m3', '#m4'].forEach((id, i) => tl.fromTo(id, { opacity: 0, filter: 'blur(10px)' }, { opacity: 1, filter: 'blur(0px)', duration: 0.35, ease: OUT }, T.at(1) + 0.3 + i * 0.07));
late('#s1-note', T.at(1) + 0.6);
strike('#m1-strike', at(1, 0.45));
wipe('#m1-new', at(1, 0.58), 0.3, 'steps(4)');
shake('#s1-board', T.end(1) - 0.3, 8);

// 2. step 1: type the ask, press send, the PDF page arrives
step('#s2', T.at(2)); title('#s2', T.at(2) + 0.05); rise('#s2-card', T.at(2) + 0.12);
tl.fromTo('#spark', { rotation: -90, scale: 0 }, { rotation: 0, scale: 1, duration: 0.45, ease: POP }, T.at(2) + 0.4);
late('#s2-head', T.at(2) + 0.45);
tl.fromTo('#inp', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.35, ease: OUT }, T.at(2) + 0.35);
wipe('#inp-t', T.at(2) + 0.45, 0.6, 'steps(25)');
const clk = T.voice(2) + 1.2;
tl.fromTo('#go', { scale: 1 }, { scale: 0.85, duration: 0.1, yoyo: true, repeat: 1, ease: 'power2.inOut' }, clk - 0.1);
tl.to('#inp-t', { opacity: 0, duration: 0.2, ease: 'power3.in' }, clk + 0.05);
tl.fromTo('#ubub', { opacity: 0, y: 40, scale: 0.9 }, { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: POP }, clk + 0.1);
rise('#page', clk + 0.45, 0.5);
late('#page-h', clk + 0.7);
['#pr1', '#pr2', '#pr3'].forEach((id, i) => tl.fromTo(id, { opacity: 0, x: 30 }, { opacity: 1, x: 0, duration: 0.3, ease: OUT }, clk + 0.75 + i * 0.07));
pop('#pdf', clk + 1.0);
late('#s2-ex', clk + 1.2);

// 3. step 2 (the payoff): one sentence in the same chat, only the chai line changes
step('#s3', T.at(3)); title('#s3', T.at(3) + 0.05);
rise('#s3-ask', T.at(3) + 0.12);
wipe('#s3-say', T.voice(3) + 0.2, 0.7, 'steps(29)');
rise('#s3-b', T.at(3) + 0.3); rise('#s3-c', T.at(3) + 0.42);
tl.fromTo('#s3-b .rw', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.3, ease: OUT, stagger: 0.06 }, T.at(3) + 0.5);
tl.fromTo('#s3-c .rw', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.3, ease: OUT, stagger: 0.06 }, T.at(3) + 0.62);
late('#s3-ex', T.at(3) + 0.9);
tl.fromTo('#arrow', { x: -30, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4, ease: OUT }, T.voice(3) + 1.0);
strike('#c-strike', T.voice(3) + 1.3);
tl.to(['#c-old', '#c-strike'], { opacity: 0, duration: 0.2, ease: 'power3.in' }, T.voice(3) + 1.55);
pop('#c-new', T.voice(3) + 1.6);
tl.fromTo('#c-chai', { backgroundColor: '#F6F2EB' }, { backgroundColor: '#DCEEE3', duration: 0.3, ease: 'power2.out' }, T.voice(3) + 1.6);
tl.to('#s3-c', { scale: 1.04, duration: 0.15, yoyo: true, repeat: 1, ease: 'sine.inOut' }, T.voice(3) + 1.85);
pop('#s3-chip', at(3, 0.72));

// 4. step 3: the PDF lands in a chat, and a copy prints out
step('#s4', T.at(4)); title('#s4', T.at(4) + 0.05); rise('#s4-card', T.at(4) + 0.12);
late('#s4-wa', T.at(4) + 0.4);
tl.fromTo('#s4-chat', { opacity: 0 }, { opacity: 1, duration: 0.3, ease: OUT }, T.at(4) + 0.4);
const bl = T.voice(4) + 0.9;
tl.fromTo('#fb', { opacity: 0, scale: 0.6, y: 30 }, { opacity: 1, scale: 1, y: 0, duration: 0.4, ease: POP }, bl);
tl.fromTo('#ticks-p', { strokeDashoffset: 120 }, { strokeDashoffset: 0, duration: 0.3, ease: 'power2.out' }, bl + 0.45);
late('#s4-pr', at(4, 0.4));
rise('#printer', at(4, 0.4));
tl.fromTo('#led', { opacity: 0.3 }, { opacity: 1, duration: 0.15, repeat: 6, yoyo: true, ease: 'steps(1)' }, at(4, 0.45));
tl.fromTo('#paper', { clipPath: 'inset(0 0 100% 0)' }, { clipPath: 'inset(0 0 0% 0)', duration: 0.9, ease: 'power2.inOut' }, at(4, 0.5));
pop('#done', at(4, 0.85));

// 5. the analogy: rub out one pencil price, write the new one, SAME PAGE stamps in (whistle line)
step('#s5', T.at(5)); title('#s5', T.at(5) + 0.05);
tl.fromTo('#reg', { y: 110, opacity: 0, rotation: 2 }, { y: 0, opacity: 1, rotation: 0, duration: 0.55, ease: OUT }, T.at(5) + 0.12);
late('#s5-ex', T.at(5) + 0.4);
['#pn1', '#pn2', '#pn3', '#pn4'].forEach((id, i) => wipe(id, T.at(5) + 0.3 + i * 0.07, 0.4));
tl.set('#pn1-new', { clipPath: 'inset(0 100% 0 0)' }, 0);
const er = at(5, 0.35);
tl.fromTo('#eraser', { opacity: 0, x: 80, y: -40, rotation: -12 }, { opacity: 1, x: 0, y: 0, rotation: -12, duration: 0.35, ease: OUT }, er);
tl.to('#eraser', { x: -26, duration: 0.1, repeat: 5, yoyo: true, ease: 'sine.inOut' }, er + 0.35);
tl.fromTo('#pn1-old', { opacity: 1, filter: 'blur(0px)' }, { opacity: 0, filter: 'blur(6px)', duration: 0.5, ease: 'power2.in' }, er + 0.4);
tl.to('#eraser', { opacity: 0, x: 80, y: -40, duration: 0.25, ease: 'power3.in' }, er + 1.0);
const pc = at(5, 0.6);
tl.fromTo('#pencil', { opacity: 0, x: 60, y: -30 }, { opacity: 1, x: 0, y: 0, duration: 0.3, ease: OUT }, pc - 0.25);
tl.to('#pn1-new', { clipPath: 'inset(0 0% 0 0)', duration: 0.45, ease: 'steps(5)' }, pc + 0.05);
tl.to('#pencil', { x: 60, duration: 0.45, ease: 'steps(5)' }, pc + 0.05);
tl.to('#pencil', { opacity: 0, duration: 0.25, ease: 'power3.in' }, pc + 0.7);
const st = at(5, 0.85);
tl.fromTo('#stamp5', { scale: 2.3, opacity: 0, rotation: -18 }, { scale: 1, opacity: 1, rotation: -6, duration: 0.22, ease: 'power4.in' }, st);
tl.to('#reg', { scale: 1.02, duration: 0.12, yoyo: true, repeat: 1, ease: 'sine.inOut' }, st + 0.22);

// 6. the catch: PDF-only limit shakes, then every price gets a tick on half beats
step('#s6', T.at(6)); title('#s6', T.at(6) + 0.05); rise('#s6-card', T.at(6) + 0.12);
tl.fromTo('#k0', { x: 60, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4, ease: OUT }, T.voice(6) + 0.3);
pop('#k0-chip', at(6, 0.3));
shake('#k0', at(6, 0.3) + 0.45, 6);
late('#s6-h', at(6, 0.45)); late('#s6-ex', at(6, 0.5));
['#ck1', '#ck2', '#ck3'].forEach((id, i) => tl.fromTo(id, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.35, ease: OUT }, at(6, 0.48) + i * 0.07));
['#tk1', '#tk2', '#tk3'].forEach((id, i) => pop(id, at(6, 0.68) + i * T.beat / 2));

// 7. send this: the cardboard box returns, a paper plane lifts off it
tl.fromTo('#send .l', { yPercent: 110 }, { yPercent: 0, duration: 0.55, ease: OUT }, T.at(7));
tl.fromTo('#s7-box', { y: 120, opacity: 0, rotation: -3 }, { y: 0, opacity: 1, rotation: -3, duration: 0.55, ease: OUT }, T.at(7) + 0.15);
tl.fromTo('#plane', { x: -200, y: 160, opacity: 0, rotation: -25 }, { x: 0, y: 0, opacity: 1, rotation: 0, duration: 0.7, ease: 'power2.out' }, T.voice(7) + 0.3);
late('#who', at(7, 0.45));
tl.to('#plane', { x: 20, y: -16, duration: 0.6, yoyo: true, repeat: 1, ease: 'sine.inOut' }, at(7, 0.6));
tl.to('#s7-box', { rotation: 1, duration: 0.12, repeat: 3, yoyo: true, ease: 'sine.inOut' }, at(7, 0.85));

// 8. keyword: LETTER drops in tile by tile, Save. and the bookmark, the dark pill, the free sticker
late('#s8-lbl', T.at(8));
tl.fromTo('#tiles .tl', { yPercent: -120, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.4, ease: POP, stagger: 0.07 }, T.at(8) + 0.1);
tl.fromTo('#save', { opacity: 0, filter: 'blur(12px)' }, { opacity: 1, filter: 'blur(0px)', duration: 0.5, ease: OUT }, T.voice(8) + 0.9);
tl.fromTo('#bookmark', { y: -60, opacity: 0 }, { y: 0, opacity: 1, duration: 0.45, ease: POP }, T.voice(8) + 1.1);
tl.fromTo('#pill', { scale: 0.6, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.45, ease: POP }, at(8, 0.5));
late('#s8-sub', at(8, 0.62));
pop('#sticker', at(8, 0.78));
tl.to('#tiles .tl', { y: -14, duration: 0.18, yoyo: true, repeat: 1, ease: 'sine.inOut', stagger: 0.06 }, T.end(8) + 0.1);
tl.to('#pill', { scale: 1.05, duration: 0.25, yoyo: true, repeat: 1, ease: 'sine.inOut' }, T.end(8) + 0.5);
