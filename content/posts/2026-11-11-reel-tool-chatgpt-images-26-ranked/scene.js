// Tool reel: three ChatGPT image upgrades, ranked 3 to 1 on one list card, then the payoff (doodle -> painted greeting -> loop).
// Motion: enters expo.out, pops with an anticipation dip, slams power4.in, labels settle late, orbs drift behind everything.
const OUT = 'expo.out', POP = 'back.out(1.8)';
const span = (n) => T.end(n) - T.voice(n);
const at = (n, f) => T.voice(n) + f * span(n);
const title = (s, t) => tl.fromTo(`${s} .title .l`, { yPercent: 110 }, { yPercent: 0, duration: 0.55, ease: OUT, stagger: 0.08 }, t);
const step = (s, t) => tl.fromTo(`${s} .step`, { x: -40, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4, ease: OUT }, t);
const card = (id, t) => tl.fromTo(id, { y: 110, opacity: 0, scale: 0.96 }, { y: 0, opacity: 1, scale: 1, duration: 0.6, ease: OUT }, t);
const late = (id, t) => tl.fromTo(id, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.35, ease: OUT }, t);
const pop = (id, t) => {
  tl.fromTo(id, { scale: 0, opacity: 0 }, { scale: 1.12, opacity: 1, duration: 0.22, ease: 'power2.out' }, t);
  tl.to(id, { scale: 1, duration: 0.18, ease: 'power2.inOut' }, t + 0.22);
};
const slide = (id, t) => tl.fromTo(id, { x: 60, opacity: 0 }, { x: 0, opacity: 1, duration: 0.42, ease: OUT }, t);
const shake = (id, t, px = 8) => tl.fromTo(id, { x: 0 }, { x: px, duration: 0.05, repeat: 5, yoyo: true, ease: 'none' }, t);
const bump = (id, t, s = 1.06) => tl.to(id, { scale: s, duration: 0.15, yoyo: true, repeat: 1, ease: 'sine.inOut' }, t);
const fadeOut = (id, t) => tl.fromTo(id, { opacity: 1 }, { opacity: 0, duration: 0.2, ease: 'power3.in' }, t);

// ambient layer
tl.fromTo('#orb1', { x: 0, y: 0 }, { x: 150, y: -110, duration: T.dur, ease: 'sine.inOut' }, 0);
tl.fromTo('#orb2', { x: 0, y: 0 }, { x: -170, y: -150, duration: T.dur, ease: 'sine.inOut' }, 0);

// progress bar, one segment per beat
const segs = [1, 2, 3, 4, 5, 6, 7, 8];
tl.set(segs.map((n) => `#p${n}`), { scaleX: 0 }, 0);
segs.forEach((n) => tl.to(`#p${n}`, { scaleX: 1, duration: 0.5, ease: 'power2.out' }, T.at(n)));

// 0. hook: title and the saved doodle are on screen at frame 0; the tap (click) names it, the squiggle lands on "name"
tl.fromTo('#s0-title', { scale: 1.05 }, { scale: 1, duration: 0.7, ease: OUT }, 0);
tl.fromTo('#s0-step', { opacity: 0.6 }, { opacity: 1, duration: 0.3, ease: 'power2.out' }, 0);
tl.fromTo('#s0-badge', { scale: 1.08, rotation: -4 }, { scale: 1, rotation: 0, duration: 0.3, ease: OUT }, 0);
tl.to('#s0-badge', { scale: 0.94, duration: 0.08, ease: 'power2.in' }, T.voice(0) + 0.32);
tl.to('#s0-badge', { scale: 1, duration: 0.3, ease: POP }, T.voice(0) + 0.4);
tl.set('#s0-ring', { opacity: 0, scale: 0.9 }, 0);
tl.fromTo('#s0-ring', { scale: 0.9, opacity: 0.9 }, { scale: 1.35, opacity: 0, duration: 0.5, ease: 'power2.out', immediateRender: false }, T.voice(0) + 0.4);
pop('#s0-name', T.voice(0) + 0.4);
tl.fromTo('#s0-squig-p', { strokeDashoffset: 420 }, { strokeDashoffset: 0, duration: 0.55, ease: 'power2.out' }, at(0, 0.62));
bump('#s0-name', at(0, 0.88), 1.1);

// 1. at home: the family chat, a good-morning image arrives, then the 3 slams in
step('#s1', T.at(1)); title('#s1', T.at(1) + 0.05); card('#s1-card', T.at(1) + 0.15);
late('#s1-head', T.at(1) + 0.4);
late('#s1-who', at(1, 0.05));
tl.fromTo('#s1-img', { scale: 0.85, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.42, ease: POP }, at(1, 0.08));
tl.fromTo('#s1-sun', { y: 70 }, { y: 0, duration: 1.3, ease: 'power2.out' }, at(1, 0.12));
tl.fromTo('#s1-txt', { scale: 0.85, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.38, ease: POP }, at(1, 0.34));
tl.fromTo('#s1-three', { scale: 2.2, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.25, ease: 'power4.in' }, at(1, 0.78));
bump('#s1-three', at(1, 0.78) + 0.25, 1.06);
late('#s1-up', at(1, 0.86));

// 2-3. the ranked list card: slot 3 fills (speed, OpenAI's number), then slot 2 (looping GIFs); slot 1 stays a teaser.
// Each dashed slot fades out as its filled row slides over it, so no number sits hidden under a row.
step('#s2', T.at(2)); title('#s2', T.at(2) + 0.05); card('#s2-card', T.at(2) + 0.15);
fadeOut('#sl3', T.voice(2) + 0.12);
tl.fromTo('#r3', { x: 60, opacity: 0, scale: 0.96 }, { x: 0, opacity: 1, scale: 1, duration: 0.42, ease: OUT }, T.voice(2) + 0.2);
pop('#r3-x', at(2, 0.38));
const sp = { v: 1 };
tl.fromTo(sp, { v: 1 }, { v: 1.5, duration: 0.8, ease: 'power3.out', onUpdate: () => { document.getElementById('r3-x').textContent = `~${sp.v.toFixed(1)}x`; } }, at(2, 0.42));
late('#s2-note', at(2, 0.85));
fadeOut('#sl2', T.voice(3) + 0.12);
tl.fromTo('#r2', { x: 60, opacity: 0, scale: 0.96 }, { x: 0, opacity: 1, scale: 1, duration: 0.42, ease: OUT }, T.voice(3) + 0.2);
pop('#r2-c', at(3, 0.42));
tl.fromTo('#r2-loop', { rotation: 0 }, { rotation: 540, duration: T.at(4) - (T.voice(3) + 0.35), ease: 'none' }, T.voice(3) + 0.35);
tl.to('#r1-q', { scale: 1.25, duration: 0.18, yoyo: true, repeat: 3, ease: 'sine.inOut' }, at(3, 0.75));

// 4. number one, full width: the doodle is saved like a contact (thud), then called by name in a prompt
step('#s4', T.at(4)); title('#s4', T.at(4) + 0.05); card('#s4-card', T.at(4) + 0.12);
tl.fromTo('#s4-av', { scale: 0.7, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.45, ease: POP }, T.at(4) + 0.25);
tl.fromTo('#s4-name', { opacity: 0, filter: 'blur(12px)' }, { opacity: 1, filter: 'blur(0px)', duration: 0.45, ease: OUT }, T.at(4) + 0.35);
tl.fromTo('#s4-stamp', { scale: 2.4, opacity: 0, rotation: -22 }, { scale: 1, opacity: 1, rotation: -8, duration: 0.22, ease: 'power4.in' }, T.voice(4) + 0.5);
shake('#s4-av', T.voice(4) + 0.72, 6);
late('#s4-sub', T.voice(4) + 0.6);
tl.fromTo('#s4-prompt', { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: OUT }, T.voice(4) + 0.5);
tl.fromTo('#s4-typed', { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 0.5, ease: 'steps(26)' }, T.voice(4) + 0.66);
tl.fromTo('#s4-call', { backgroundColor: 'rgba(107,45,92,0)', color: '#1E1A16' }, { backgroundColor: 'rgba(107,45,92,1)', color: '#FFFFFF', duration: 0.25, ease: 'power2.out' }, at(4, 0.78));
tl.to('#s4-go', { scale: 0.9, duration: 0.1, yoyo: true, repeat: 1, ease: 'power2.inOut' }, at(4, 0.9));
late('#s4-note', at(4, 0.88));

// 5. the payoff: the line doodle becomes a painted greeting, then the rays start to loop (the GIF, if you have it)
step('#s5', T.at(5)); title('#s5', T.at(5) + 0.05); card('#s5-card', T.at(5) + 0.12);
pop('#s5-thumb', at(5, 0.1));
tl.fromTo('#s5-paint', { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 0.6, ease: 'power2.inOut' }, at(5, 0.12));
late('#s5-ex', at(5, 0.3));
tl.fromTo('#s5-greet', { opacity: 0, filter: 'blur(12px)' }, { opacity: 1, filter: 'blur(0px)', duration: 0.45, ease: OUT }, at(5, 0.36));
pop('#s5-gif', at(5, 0.58));
tl.fromTo('#s5-rays', { rotation: 0 }, { rotation: 180, duration: T.at(6) - at(5, 0.55), ease: 'none' }, at(5, 0.55));
tl.fromTo('#s5-sun', { y: 0 }, { y: -12, duration: 0.3, yoyo: true, repeat: 3, ease: 'sine.inOut' }, at(5, 0.55));
late('#s5-if', at(5, 0.84));

// 6-7. the catch: two amber rows (buzz + shake), then free-plan limits and consent
step('#s6', T.at(6)); title('#s6', T.at(6) + 0.05); card('#s6-card', T.at(6) + 0.12);
slide('#k1', T.voice(6) + 0.05); pop('#c1', T.voice(6) + 0.3);
shake('#s6-card', T.voice(6) + 0.52, 8);
slide('#k2', at(6, 0.5)); pop('#c2', at(6, 0.5) + T.beat / 2);
slide('#k3', T.voice(7) + 0.05); pop('#c3', T.voice(7) + 0.05 + T.beat / 2);
slide('#k4', at(7, 0.5)); pop('#c4', at(7, 0.5) + T.beat / 2);
bump('#c4', T.end(7) - 0.3, 1.08);

// 8. send this, then the keyword drops in letter by letter
tl.fromTo('#s8-send .l', { yPercent: 110 }, { yPercent: 0, duration: 0.55, ease: OUT }, T.at(8));
late('#s8-who', T.at(8) + 0.35);
pop('#s8-badge', T.at(8) + 0.5);
card('#kw', at(8, 0.55));
late('#kw-lbl', at(8, 0.62));
tl.fromTo('#kw-word i', { yPercent: -120, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.45, ease: 'back.out(1.6)', stagger: 0.06 }, at(8, 0.72));
late('#kw-foot', at(8, 0.9));
bump('#kw-word', T.end(8) + 0.3, 1.06);
tl.to('#s8-badge', { rotation: 8, duration: 0.3, yoyo: true, repeat: 1, ease: 'sine.inOut' }, T.end(8) + 0.5);
