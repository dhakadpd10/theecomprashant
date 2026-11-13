// Tutorial: your leave mail in your own voice, 3 steps. Analogy: a tailor copying your old shirt's fit.
// Moves: envelope + seal slam (hook), shirt outline tracing (analogy), chat paste (step 1), mic + waveform + typed
// Hinglish (step 2), list card with FAVOURITE (step 3), two finished mails (payoff), scan + red flags on the same
// mails (catch), strike-through rows (privacy), contact send (share), dropping keyword letters (end).
const OUT = 'expo.out', POP = 'back.out(1.8)';
const span = (n) => T.end(n) - T.voice(n);
const at = (n, f) => T.voice(n) + f * span(n);
const title = (s, t) => tl.fromTo(`${s} .title .l`, { yPercent: 110 }, { yPercent: 0, duration: 0.55, ease: OUT, stagger: 0.08 }, t);
const step = (s, t) => tl.fromTo(`${s} .step`, { x: -36, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4, ease: OUT }, t);
const card = (id, t) => tl.fromTo(id, { y: 110, opacity: 0, scale: 0.96 }, { y: 0, opacity: 1, scale: 1, duration: 0.6, ease: OUT }, t);
const late = (id, t) => tl.fromTo(id, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.35, ease: OUT }, t);
const slideIn = (id, t) => tl.fromTo(id, { x: 60, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4, ease: OUT }, t);
const pop = (id, t) => {
  tl.fromTo(id, { scale: 0, opacity: 0 }, { scale: 1.12, opacity: 1, duration: 0.22, ease: 'power2.out' }, t);
  tl.to(id, { scale: 1, duration: 0.18, ease: 'power2.inOut' }, t + 0.22);
};
const type = (id, t, n, d) => tl.fromTo(id, { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: d, ease: `steps(${n})` }, t);
const shake = (id, t, px = 8) => tl.fromTo(id, { x: 0 }, { x: px, duration: 0.05, repeat: 5, yoyo: true, ease: 'none' }, t);

// texture: two warm blobs and the ruled-paper lines drift for the whole reel
tl.fromTo('#blob1', { x: 0, y: 0 }, { x: 180, y: -140, duration: T.dur, ease: 'sine.inOut' }, 0);
tl.fromTo('#blob2', { x: 0, y: 0 }, { x: -200, y: -160, duration: T.dur, ease: 'sine.inOut' }, 0);
tl.fromTo('#rules', { y: 0 }, { y: -64, duration: T.dur, ease: 'sine.inOut' }, 0);

// progress bar: one segment per step
tl.set(['#p1', '#p2', '#p3'], { scaleX: 0 }, 0);
[2, 3, 4].forEach((n, i) => tl.to(`#p${i + 1}`, { scaleX: 1, duration: 0.5, ease: 'power2.out' }, T.at(n)));

// 0. hook: title and envelope on screen at frame 0, the blue seal slams on the thud, "3 STEPS" bumps on "three steps"
tl.fromTo('#s0-title .l', { yPercent: 0 }, { yPercent: 0, duration: 0.01 }, 0);
tl.fromTo('#s0-title', { scale: 1.06 }, { scale: 1, duration: 0.8, ease: OUT }, 0);
tl.fromTo('#envw', { y: 0, rotation: -6 }, { y: -12, rotation: 4, duration: 1.2, ease: 'sine.inOut', yoyo: true, repeat: 1 }, 0);
tl.fromTo('#s0-seal', { scale: 2.6, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.22, ease: 'power4.in' }, T.voice(0) + 0.28);
tl.to('#envw', { scale: 1.06, duration: 0.12, yoyo: true, repeat: 1, ease: 'sine.inOut' }, T.voice(0) + 0.5);
tl.to('#s0-step', { scale: 1.08, duration: 0.15, yoyo: true, repeat: 1, ease: 'sine.inOut' }, at(0, 0.82));

// 1. the tailor: old shirt lands, arrow, the new shirt traces in blue and fills, then the mapping rows
step('#s1', T.at(1)); title('#s1', T.at(1) + 0.05); card('#s1-card', T.at(1) + 0.12);
tl.fromTo('#shirt-old', { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.45, ease: POP }, T.at(1) + 0.35);
late('#s1-l1', T.at(1) + 0.6);
tl.fromTo('#copy-arrow', { x: -30, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4, ease: OUT }, at(1, 0.15));
tl.fromTo('#sn-line', { strokeDashoffset: 840 }, { strokeDashoffset: 0, duration: 0.8, ease: 'power2.inOut' }, at(1, 0.25));
tl.fromTo('#sn-fill', { opacity: 0 }, { opacity: 1, duration: 0.3, ease: 'power2.out' }, at(1, 0.25) + 0.75);
late('#s1-l2', at(1, 0.25) + 0.8);
slideIn('#m1', at(1, 0.55)); slideIn('#m2', at(1, 0.55) + 0.15);

// 2. step 1: the app opens, two sent emails paste in (second pops on the sfx), the ask types, GO presses
step('#s2', T.at(2)); title('#s2', T.at(2) + 0.05); card('#s2-card', T.at(2) + 0.12);
late('#app-head', T.at(2) + 0.45);
tl.fromTo('#spark', { rotation: -90, scale: 0.4 }, { rotation: 0, scale: 1, duration: 0.5, ease: POP }, T.at(2) + 0.5);
slideIn('#e1', T.voice(2) + 0.6);
tl.fromTo('#e2', { x: 60, opacity: 0, scale: 0.92 }, { x: 0, opacity: 1, scale: 1, duration: 0.4, ease: POP }, T.voice(2) + 1.15);
tl.fromTo('#ask1', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.35, ease: OUT }, at(2, 0.45));
type('#ask1-t', at(2, 0.5), 18, 0.6);
tl.fromTo('#ask1-go', { scale: 1 }, { scale: 0.88, duration: 0.1, yoyo: true, repeat: 1, ease: 'power2.inOut' }, at(2, 0.78));
late('#s2-note', at(2, 0.85));

// 3. step 2 (host hidden): mic pops, rings pulse, waveform talks, the Hinglish types in, Hindi in brown
step('#s3', T.at(3)); title('#s3', T.at(3) + 0.05); card('#s3-card', T.at(3) + 0.12);
pop('#mic', T.at(3) + 0.3);
tl.fromTo('#ring1', { scale: 1, opacity: 0.55 }, { scale: 1.7, opacity: 0, duration: 0.9, ease: 'sine.out', repeat: 2 }, T.voice(3) + 0.3);
tl.fromTo('#ring2', { scale: 1, opacity: 0.55 }, { scale: 1.7, opacity: 0, duration: 0.9, ease: 'sine.out', repeat: 2 }, T.voice(3) + 0.75);
const r = T.rand(11);
for (let i = 0; i < 21; i++) {
  const h = 0.35 + 0.65 * r();
  tl.fromTo(`#wave i:nth-child(${i + 1})`, { scaleY: 0.15 }, { scaleY: h, duration: 0.2, ease: 'sine.inOut', yoyo: true, repeat: 9 }, T.voice(3) + 0.25 + i * 0.02);
}
late('#legend', at(3, 0.3));
type('#t1', at(3, 0.3), 19, 0.5);
type('#t2', at(3, 0.5), 21, 0.5);
type('#t3', at(3, 0.7), 15, 0.45);

// 4. step 3, the list card: steps 1 and 2 tick, step 3 gets FAVOURITE on "best part", then POLITE and FIRM pop
step('#s4', T.at(4)); title('#s4', T.at(4) + 0.05); card('#s4-card', T.at(4) + 0.12);
['#r1', '#r2', '#r3'].forEach((id, i) => slideIn(id, T.at(4) + 0.35 + i * 0.07));
pop('#tk1', T.at(4) + 0.6); pop('#tk2', T.at(4) + 0.68);
pop('#fav', T.voice(4) + 0.78);
tl.fromTo('#fav-star', { rotation: -120 }, { rotation: 0, duration: 0.5, ease: POP }, T.voice(4) + 0.8);
tl.fromTo('#ask2', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.35, ease: OUT }, at(4, 0.35));
type('#a1', at(4, 0.42), 24, 0.5);
type('#a2', at(4, 0.58), 21, 0.45);
pop('#vp', at(4, 0.72)); pop('#vf', at(4, 0.88));

// 5. the payoff: two finished mails land, lines blur in, a success bump as the cooker whistles
step('#s5h', T.at(5)); title('#s5h', T.at(5) + 0.05);
card('#mA', T.at(5) + 0.1); card('#mB', T.at(5) + 0.22);
pop('#vtA', T.at(5) + 0.3); pop('#vtB', T.at(5) + 0.42);
tl.fromTo('#mA .ml', { opacity: 0, filter: 'blur(10px)' }, { opacity: 1, filter: 'blur(0px)', duration: 0.4, ease: OUT, stagger: 0.06 }, T.at(5) + 0.35);
tl.fromTo('#mB .ml', { opacity: 0, filter: 'blur(10px)' }, { opacity: 1, filter: 'blur(0px)', duration: 0.4, ease: OUT, stagger: 0.06 }, T.at(5) + 0.5);
late('#s5-note', T.at(5) + 0.9);
tl.to(['#mA', '#mB'], { scale: 1.03, duration: 0.15, yoyo: true, repeat: 1, ease: 'sine.inOut' }, T.end(5) - 0.15);

// 6. the catch: a scan line reads the mails, the made-up date and the added promise turn red and get flagged
step('#s6', T.at(6)); title('#s6', T.at(6) + 0.05);
tl.fromTo('#scan', { y: 0 }, { y: 558, duration: 1.0, ease: 'power2.inOut' }, T.voice(6) + 0.05);
const dateT = T.voice(6) + 1.1;
tl.to('#mB3', { color: '#C23B3B', backgroundColor: 'rgba(194,59,59,0.12)', duration: 0.25, ease: 'power2.out' }, dateT - 0.1);
tl.fromTo('#f2', { scale: 2.2, opacity: 0, rotation: -12 }, { scale: 1, opacity: 1, rotation: -4, duration: 0.22, ease: 'power4.in' }, dateT - 0.22);
shake('#mB', dateT + 0.02, 8);
const promT = at(6, 0.6);
tl.to('#mA3', { color: '#C23B3B', backgroundColor: 'rgba(194,59,59,0.12)', duration: 0.25, ease: 'power2.out' }, promT - 0.1);
tl.fromTo('#f1', { scale: 2.2, opacity: 0, rotation: 12 }, { scale: 1, opacity: 1, rotation: 4, duration: 0.22, ease: 'power4.in' }, promT - 0.22);
shake('#mA', promT + 0.02, 8);
tl.fromTo('#scan', { y: 0 }, { y: 558, duration: 0.8, ease: 'power2.inOut', immediateRender: false }, at(6, 0.72));

// 7. privacy: salary slips and office data get struck out with NO, names and numbers get REMOVE
step('#s7', T.at(7)); title('#s7', T.at(7) + 0.05); card('#s7-card', T.at(7) + 0.12);
late('#s7-l', T.at(7) + 0.4);
['#q1', '#q2', '#q3'].forEach((id, i) => slideIn(id, T.at(7) + 0.4 + i * 0.07));
tl.fromTo('#sk1', { scaleX: 0 }, { scaleX: 1, duration: 0.3, ease: 'power3.in' }, at(7, 0.4));
pop('#n1', at(7, 0.4) + 0.25);
tl.fromTo('#sk2', { scaleX: 0 }, { scaleX: 1, duration: 0.3, ease: 'power3.in' }, at(7, 0.62));
pop('#n2', at(7, 0.62) + 0.2);
pop('#y3', at(7, 0.84));

// 8. send this: the colleague, the reel preview, Send presses, Sent lands
title('#s8', T.at(8));
card('#s8-card', T.at(8) + 0.2);
pop('#ava', T.at(8) + 0.45);
late('#cname', T.at(8) + 0.55); late('#csub', T.at(8) + 0.62);
tl.fromTo('#prev', { opacity: 0, y: 30, scale: 0.95 }, { opacity: 1, y: 0, scale: 1, duration: 0.45, ease: OUT }, T.voice(8) + 0.7);
tl.fromTo('#play', { scale: 0.6, rotation: -30 }, { scale: 1, rotation: 0, duration: 0.45, ease: POP }, T.voice(8) + 0.9);
tl.fromTo('#sendb', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.35, ease: OUT }, T.voice(8) + 0.9);
tl.to('#sendb', { scale: 0.92, duration: 0.1, yoyo: true, repeat: 1, ease: 'power2.inOut' }, at(8, 0.55));
tl.fromTo('#sentb', { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 0.4, ease: POP }, at(8, 0.55) + 0.2);
tl.to('#csub', { color: '#2F5BD3', duration: 0.2, ease: 'power2.out' }, at(8, 0.85));

// 9. the keyword: Save., the bookmark drops, STYLE letters fall in on the click, the dark pill pops
tl.fromTo('#save .l', { yPercent: 110 }, { yPercent: 0, duration: 0.55, ease: OUT }, T.at(9));
tl.fromTo('#bm', { y: -80, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: 'back.out(2)' }, T.at(9) + 0.2);
tl.fromTo('#s9-card', { opacity: 0, scale: 0.94 }, { opacity: 1, scale: 1, duration: 0.35, ease: OUT }, T.at(9));
late('#cav', T.at(9) + 0.15); late('#s9-l', T.at(9) + 0.22);
tl.fromTo('#kw b', { y: -140, opacity: 0 }, { y: 0, opacity: 1, duration: 0.35, ease: 'back.out(2)', stagger: 0.12 }, T.voice(9));
tl.fromTo('#sticker', { scale: 0, opacity: 0, rotation: -30 }, { scale: 1, opacity: 1, rotation: -8, duration: 0.45, ease: POP }, T.voice(9) + 0.8);
tl.fromTo('#pill', { scale: 0.6, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.45, ease: POP }, at(9, 0.45));
late('#s9-sub', at(9, 0.6));
tl.to('#pill', { scale: 1.05, duration: 0.3, yoyo: true, repeat: 1, ease: 'sine.inOut' }, T.end(9) + 0.1);
tl.to('#bm', { y: -14, duration: 0.25, yoyo: true, repeat: 1, ease: 'sine.inOut' }, T.end(9) + 0.5);
