// Editorial theme: one step per beat, a progress bar that fills, a serif title with an italic accent word, one clean app card.
const OUT = 'expo.out', POP = 'back.out(1.7)';
const span = (n) => T.end(n) - T.voice(n);
const title = (s, t) => tl.fromTo(`${s} .title .l`, { yPercent: 110 }, { yPercent: 0, duration: 0.55, ease: OUT, stagger: 0.09 }, t);
const card = (id, t) => tl.fromTo(id, { y: 120, opacity: 0, scale: 0.96 }, { y: 0, opacity: 1, scale: 1, duration: 0.6, ease: OUT }, t);
const step = (s, t) => tl.fromTo(`${s} .step`, { x: -40, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4, ease: OUT }, t);

// progress bar: a segment fills as each step starts
tl.set(['#p1', '#p2', '#p3', '#p4', '#p5', '#p6'], { scaleX: 0 }, 0);
[1, 2, 3, 4, 5, 6].forEach((n) => tl.to(`#p${n}`, { scaleX: 1, duration: 0.5, ease: 'power2.out' }, T.at(n)));

// 0. hook: the title is on screen at frame 0, the inbox piles up under it
tl.fromTo('#s0-title .l', { yPercent: 0 }, { yPercent: 0, duration: 0.01 }, 0);
tl.fromTo('#s0-title', { scale: 1.06 }, { scale: 1, duration: 0.6, ease: OUT }, 0);
tl.fromTo('#s0-kick', { opacity: 0.6 }, { opacity: 1, duration: 0.3 }, 0);
['#n1', '#n2', '#n3', '#n4'].forEach((id, i) => tl.fromTo(id, { y: -260, opacity: 0 }, { y: 0, opacity: 1, duration: 0.45, ease: POP }, 0.1 + i * 0.32));
const unread = { n: 12 };
tl.fromTo(unread, { n: 12 }, { n: 47, duration: span(0) + 0.4, ease: 'power2.in', onUpdate: () => { document.getElementById('badge').textContent = String(Math.round(unread.n)); } }, 0.2);
tl.fromTo('#badge', { scale: 0.4, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: POP }, 0.25);
tl.fromTo('#badge', { scale: 1 }, { scale: 1.15, duration: 0.12, yoyo: true, repeat: 3, ease: 'power2.out' }, T.end(0) - 0.6);

// 1. paste your policies: the lines type in
step('#s1', T.at(1)); title('#s1', T.at(1) + 0.05); card('#s1-card', T.at(1) + 0.2);
['#pl1', '#pl2', '#pl3', '#pl4'].forEach((id, i) => tl.fromTo(id, { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 0.45, ease: 'steps(14)' }, T.voice(1) + 0.6 + i * 0.5));

// 2. paste the messages: rows drop in, then "+ 16 more"
step('#s2', T.at(2)); title('#s2', T.at(2) + 0.05); card('#s2-card', T.at(2) + 0.2);
['#m1', '#m2', '#m3', '#m4'].forEach((id, i) => tl.fromTo(id, { x: -80, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4, ease: OUT }, T.voice(2) + 0.5 + i * 0.12));
tl.fromTo('#more', { scale: 0.5, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: POP }, T.voice(2) + 0.6 * span(2));

// 3. a reply for each: question bubble, then the answer pops in
step('#s3', T.at(3)); title('#s3', T.at(3) + 0.05); card('#s3-card', T.at(3) + 0.2);
[['#b1', 0.25], ['#b2', 0.42], ['#b3', 0.6], ['#b4', 0.77]].forEach(([id, f]) => tl.fromTo(id, { y: 30, opacity: 0, scale: 0.9 }, { y: 0, opacity: 1, scale: 1, duration: 0.35, ease: POP }, T.voice(3) + f * span(3)));

// 4. the hard ones come to you: rows appear, the YOU chips slam in and shake
step('#s4', T.at(4)); title('#s4', T.at(4) + 0.05); card('#s4-card', T.at(4) + 0.2);
['#f1', '#f2', '#f3', '#f4'].forEach((id, i) => tl.fromTo(id, { x: 60, opacity: 0 }, { x: 0, opacity: 1, duration: 0.35, ease: OUT }, T.voice(4) + 0.2 + i * 0.1));
['#c2', '#c4'].forEach((id, i) => {
  const t = T.voice(4) + 0.6 + i * 0.35;
  tl.fromTo(id, { scale: 1.8, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.25, ease: 'power4.in' }, t);
  tl.fromTo(id, { x: 0 }, { x: 8, duration: 0.05, repeat: 5, yoyo: true, ease: 'none' }, t + 0.25);
});

// 5. the clock runs to ten minutes, the ring closes
tl.fromTo('#ring', { scale: 0.7, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.5, ease: OUT }, T.at(5));
tl.fromTo('#arc', { strokeDashoffset: 1382 }, { strokeDashoffset: 0, duration: span(5), ease: 'power1.inOut' }, T.voice(5));
const clock = { m: 0 };
tl.fromTo(clock, { m: 0 }, { m: 600, duration: span(5), ease: 'power1.inOut', onUpdate: () => { const s = Math.round(clock.m); document.getElementById('clock').textContent = `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`; } }, T.voice(5));
tl.fromTo('#mins', { opacity: 0 }, { opacity: 1, duration: 0.3 }, T.voice(5) + 0.2);
title('#s5', T.voice(5) + 0.1);

// 6. save + comment
tl.fromTo('#save', { yPercent: 40, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.6, ease: OUT }, T.at(6));
tl.fromTo('#mark', { y: -120, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: 'bounce.out' }, T.at(6) + 0.3);
tl.fromTo('#pill', { scale: 0.6, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.45, ease: POP }, T.voice(6) + 0.5 * span(6));
tl.fromTo('#pill', { scale: 1 }, { scale: 1.05, duration: 0.3, yoyo: true, repeat: 3, ease: 'sine.inOut' }, T.end(6));
