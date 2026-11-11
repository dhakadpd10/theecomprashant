// Prompt explainer: long chats blur early details, so hand the chat over to a fresh one like a last-day handover note.
// Motion: enters expo.out 0.5 s, pops back.out, slams power4.in, stagger 0.07 s, labels settle late, orbs drift all reel.
const OUT = 'expo.out', POP = 'back.out(1.8)';
const span = (n) => T.end(n) - T.voice(n);
const title = (s, t) => tl.fromTo(`${s} .title .l`, { yPercent: 110 }, { yPercent: 0, duration: 0.55, ease: OUT, stagger: 0.09 }, t);
const step = (s, t) => tl.fromTo(`${s} .step`, { x: -40, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4, ease: OUT }, t);
const card = (id, t) => tl.fromTo(id, { y: 120, opacity: 0, scale: 0.96 }, { y: 0, opacity: 1, scale: 1, duration: 0.6, ease: OUT }, t);
const late = (id, t) => tl.fromTo(id, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.35, ease: OUT }, t);
const chip = (id, t) => {
  tl.fromTo(id, { scale: 0, opacity: 0 }, { scale: 1.12, opacity: 1, duration: 0.22, ease: 'power2.out' }, t);
  tl.to(id, { scale: 1, duration: 0.18, ease: 'power2.inOut' }, t + 0.22);
};
const pop = (id, t, from = 0.6) => tl.fromTo(id, { scale: from, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: POP }, t);
const slide = (id, t, dx = 60) => tl.fromTo(id, { x: dx, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4, ease: OUT }, t);
const shake = (id, t, px = 8) => tl.fromTo(id, { x: 0 }, { x: px, duration: 0.05, repeat: 5, yoyo: true, ease: 'none' }, t);
const bump = (id, t, s = 1.05) => tl.fromTo(id, { scale: 1 }, { scale: s, duration: 0.15, yoyo: true, repeat: 1, ease: 'sine.inOut' }, t);
const wipe = (id, t, d = 0.45, n = 18) => tl.fromTo(id, { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: d, ease: `steps(${n})` }, t);

// ambient layer
tl.fromTo('#orb1', { x: 0, y: 0 }, { x: 160, y: -120, duration: T.dur, ease: 'sine.inOut' }, 0);
tl.fromTo('#orb2', { x: 0, y: 0 }, { x: -180, y: -150, duration: T.dur, ease: 'sine.inOut' }, 0);

// progress bar, one segment per beat after the hook
tl.set(['#p1', '#p2', '#p3', '#p4', '#p5', '#p6', '#p7', '#p8'], { scaleX: 0 }, 0);
[1, 2, 3, 4, 5, 6, 7, 8].forEach((n) => tl.to(`#p${n}`, { scaleX: 1, duration: 0.5, ease: 'power2.out' }, T.at(n)));

// 0. hook: title and the long chat are on screen at frame 0; the chat scrolls on and the counter climbs
tl.fromTo('#s0-title .l', { yPercent: 0 }, { yPercent: 0, duration: 0.01 }, 0);
tl.fromTo('#s0-title', { scale: 1.06 }, { scale: 1, duration: 0.7, ease: OUT }, 0);
tl.fromTo('#s0-step', { opacity: 0.6 }, { opacity: 1, duration: 0.3 }, 0);
tl.fromTo('#s0-card', { scale: 1.02 }, { scale: 1, duration: 0.6, ease: OUT }, 0);
tl.fromTo('#s0-feed', { y: 0 }, { y: -220, duration: 2.6, ease: 'power2.inOut' }, 0.3);
{ const o = { v: 8 }; tl.fromTo(o, { v: 8 }, { v: 40, duration: 2.4, ease: 'power2.out', onUpdate: () => { document.getElementById('s0-n').textContent = `${Math.round(o.v)} MSGS`; } }, 0.1); }
bump('#s0-n', T.voice(0) + 0.5, 1.12);
tl.fromTo('#s0-squig-p', { strokeDashoffset: 620 }, { strokeDashoffset: 0, duration: 0.6, ease: 'power2.out' }, T.voice(0) + 0.45 * span(0));
tl.to('#s0-n', { backgroundColor: '#C23B3B', duration: 0.25, ease: 'power2.out' }, T.voice(0) + 0.6 * span(0));

// 1. wrong company: asked for Infosys, it writes to TCS, the stamp slams on the buzz
step('#s1', T.at(1)); title('#s1', T.at(1) + 0.05); card('#s1-card', T.at(1) + 0.15);
pop('#s1-ask', T.voice(1) + 0.2);
slide('#s1-reply', T.voice(1) + 0.5, -60);
tl.fromTo(['#s1-w1', '#s1-w2'], { color: '#1E1A16' }, { color: '#C23B3B', duration: 0.2, ease: 'power2.out', stagger: 0.08 }, T.voice(1) + 0.8);
tl.fromTo('#s1-stamp', { scale: 2.4, opacity: 0, rotation: -22 }, { scale: 1, opacity: 1, rotation: -9, duration: 0.22, ease: 'power4.in' }, T.voice(1) + 0.68);
shake('#s1-card', T.voice(1) + 0.92, 10);
['#s1-r1', '#s1-r2'].forEach((id, i) => slide(id, T.voice(1) + 1.4 + i * 0.15));
chip('#s1-c1', T.voice(1) + 1.5); chip('#s1-c2', T.voice(1) + 1.65);

// 2. early details blur: four messages land, the early ones go soft, message 40 stays sharp
step('#s2', T.at(2)); title('#s2', T.at(2) + 0.05); card('#s2-card', T.at(2) + 0.1);
['#m1', '#m2', '#m3', '#m4'].forEach((id, i) => slide(id, T.at(2) + 0.3 + i * 0.07));
tl.fromTo(['#m1 .t', '#m2 .t'], { filter: 'blur(0px)' }, { filter: 'blur(5px)', duration: 0.5, ease: 'power2.out', stagger: 0.08 }, T.voice(2) + 0.45 * span(2));
tl.fromTo('#m3 .t', { filter: 'blur(0px)' }, { filter: 'blur(2px)', duration: 0.5, ease: 'power2.out' }, T.voice(2) + 0.55 * span(2));
bump('#m4', T.voice(2) + 0.75 * span(2));
late('#s2-note', T.voice(2) + 0.85 * span(2));

// 3. the analogy: a handover note slides across like it's handed to you, lines write in
step('#s3', T.at(3)); title('#s3', T.at(3) + 0.05);
tl.fromTo('#s3-card', { x: -80, y: 60, opacity: 0, rotation: -6 }, { x: 0, y: 0, opacity: 1, rotation: -1.5, duration: 0.6, ease: OUT }, T.at(3) + 0.1);
chip('#s3-day', T.voice(3) + 0.42 * span(3));
['#h1', '#h2', '#h3', '#h4'].forEach((id, i) => wipe(id, T.voice(3) + 0.3 * span(3) + i * 0.12, 0.35, 14));
late('#s3-note', T.voice(3) + 0.85 * span(3));

// 4. the prompt types in, Send presses, the note it writes appears (host hidden, full width)
step('#s4', T.at(4)); title('#s4', T.at(4) + 0.05); card('#s4-p', T.at(4) + 0.1);
tl.fromTo('#s4-field', { backgroundColor: '#F6F3EE' }, { backgroundColor: '#EEF1FF', duration: 0.2, ease: 'power2.out' }, T.voice(4) + 0.3);
wipe('#pl1', T.voice(4) + 0.3, 0.45, 21); wipe('#pl2', T.voice(4) + 0.75, 0.45, 20);
tl.fromTo('#s4-go', { scale: 1 }, { scale: 0.9, duration: 0.1, ease: 'power2.in' }, T.voice(4) + 1.25);
tl.to('#s4-go', { scale: 1, duration: 0.3, ease: POP }, T.voice(4) + 1.35);
card('#s4-a', T.voice(4) + 1.35);
['#n1', '#n2', '#n3', '#n4', '#n5'].forEach((id, i) => tl.fromTo(id, { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.35, ease: OUT }, T.voice(4) + 1.5 + i * 0.07));
late('#s4-acount', T.voice(4) + 1.7);
bump('#n5', T.end(4) - 0.3, 1.06);

// 5. fresh chat: the empty hint gives way, the note pops in as message 1, the AI is ready
step('#s5', T.at(5)); title('#s5', T.at(5) + 0.05); card('#s5-card', T.at(5) + 0.1);
tl.fromTo('#s5-hint', { opacity: 1 }, { opacity: 0, duration: 0.2, ease: 'power3.in' }, T.voice(5) + 0.62);
tl.set('#s5-note', { transformOrigin: '100% 100%' }, 0);
tl.fromTo('#s5-note', { scale: 0.95, opacity: 0 }, { scale: 0.9, opacity: 0.4, duration: 0.08, ease: 'power2.out' }, T.voice(5) + 0.72);
tl.fromTo('#s5-note', { scale: 0.9 }, { scale: 1, opacity: 1, duration: 0.4, ease: POP, immediateRender: false }, T.voice(5) + 0.8);
pop('#s5-rep', T.voice(5) + 1.2);
late('#s5-lbl', T.voice(5) + 1.35);

// 6. the payoff: same ask, right company, green chip, a success bump on the whistle
step('#s6', T.at(6)); title('#s6', T.at(6) + 0.05); card('#s6-card', T.at(6) + 0.1);
pop('#s6-ask', T.voice(6) + 0.1);
tl.fromTo('#s6-reply', { opacity: 0, filter: 'blur(12px)', x: -30 }, { opacity: 1, filter: 'blur(0px)', x: 0, duration: 0.5, ease: OUT }, T.voice(6) + 0.4);
tl.fromTo(['#s6-w1', '#s6-w2'], { color: '#1E1A16' }, { color: '#167A45', duration: 0.2, ease: 'power2.out', stagger: 0.08 }, T.voice(6) + 0.5 * span(6));
['#s6-r1', '#s6-r2'].forEach((id, i) => slide(id, T.voice(6) + 0.55 * span(6) + i * 0.12));
chip('#s6-c1', T.voice(6) + 0.6 * span(6)); chip('#s6-c2', T.voice(6) + 0.6 * span(6) + 0.15);
bump('#s6-card', T.voice(6) + 0.82 * span(6));

// 7. the catch: a scan bar reads the note row by row, three ticks, then one FILL IN that wobbles
step('#s7', T.at(7)); title('#s7', T.at(7) + 0.05); card('#s7-card', T.at(7) + 0.1);
['#k1', '#k2', '#k3', '#k4'].forEach((id, i) => tl.fromTo(id, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.35, ease: OUT }, T.at(7) + 0.3 + i * 0.07));
{
  const t0 = T.voice(7) + 0.3;
  tl.fromTo('#s7-scan', { y: 0, opacity: 0 }, { y: 0, opacity: 1, duration: 0.2, ease: 'power2.out' }, t0);
  chip('#t1', t0 + 0.25);
  tl.to('#s7-scan', { y: 114, duration: 0.35, ease: 'power2.inOut' }, t0 + 0.6); chip('#t2', t0 + 0.95);
  tl.to('#s7-scan', { y: 228, duration: 0.35, ease: 'power2.inOut' }, t0 + 1.2); chip('#t3', t0 + 1.55);
  tl.to('#s7-scan', { y: 342, duration: 0.35, ease: 'power2.inOut' }, t0 + 1.8);
  tl.to('#s7-scan', { borderColor: '#E8A317', duration: 0.2, ease: 'power2.out' }, t0 + 2.1);
  chip('#t4', t0 + 2.15);
  tl.fromTo('#t4', { rotation: 0 }, { rotation: 6, duration: 0.08, repeat: 5, yoyo: true, ease: 'sine.inOut' }, t0 + 2.55);
}
late('#s7-lbl', T.voice(7) + 0.9 * span(7));

// 8. send this, then CARRY drops in letter by letter and bumps as it is said
tl.fromTo('#s8-send', { yPercent: 40, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.6, ease: OUT }, T.at(8));
tl.fromTo('#s8-plane', { x: -200, opacity: 0, rotation: -20 }, { x: 0, opacity: 1, rotation: 0, duration: 0.7, ease: 'power2.out' }, T.at(8) + 0.25);
tl.fromTo('#s8-plane', { y: 120 }, { y: 0, duration: 0.7, ease: 'back.out(2)' }, T.at(8) + 0.25);
late('#s8-who', T.voice(8) + 0.3);
card('#s8-card', T.at(8) + 0.55);
late('#s8-lbl', T.at(8) + 0.85);
tl.fromTo('#s8-word .ltr', { y: -140, opacity: 0 }, { y: 0, opacity: 1, duration: 0.45, ease: POP, stagger: 0.07 }, T.at(8) + 0.9);
chip('#s8-free', T.voice(8) + 0.45 * span(8));
pop('#s8-pill', T.voice(8) + 0.6 * span(8));
tl.fromTo('#s8-word .ltr', { y: 0 }, { y: -26, duration: 0.15, yoyo: true, repeat: 1, ease: 'sine.inOut', stagger: 0.05 }, T.voice(8) + 0.86 * span(8));
bump('#s8-pill', T.end(8) + 0.1);
tl.to('#s8-plane', { x: 24, y: -18, duration: 0.8, yoyo: true, repeat: 1, ease: 'sine.inOut' }, T.end(8));
