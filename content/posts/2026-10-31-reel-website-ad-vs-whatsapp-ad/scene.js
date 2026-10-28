// Editorial: a 72-hour clock hook, who pays, five slots fill, chat vs website verdicts, the draft-not-sent catch, Save + Comment CHAT.
const OUT = 'expo.out', POP = 'back.out(1.8)', SLAM = 'power4.in';
const span = (n) => T.end(n) - T.voice(n);
const at = (n, f) => T.voice(n) + f * span(n);
const title = (s, t) => tl.fromTo(`${s} .title .l`, { yPercent: 110 }, { yPercent: 0, duration: 0.55, ease: OUT, stagger: 0.08 }, t);
const step = (s, t) => tl.fromTo(`${s} .step`, { x: -40, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4, ease: OUT }, t);
const card = (id, t) => tl.fromTo(id, { y: 120, opacity: 0, scale: 0.96 }, { y: 0, opacity: 1, scale: 1, duration: 0.6, ease: OUT }, t);
const slam = (id, t) => tl.fromTo(id, { scale: 1.8, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.25, ease: SLAM }, t);
const shake = (id, t) => tl.fromTo(id, { x: 0 }, { x: 8, duration: 0.05, repeat: 5, yoyo: true, ease: 'none', immediateRender: false }, t);
const bump = (id, t) => tl.fromTo(id, { scale: 1 }, { scale: 1.06, duration: 0.15, repeat: 1, yoyo: true, ease: 'power2.inOut', immediateRender: false }, t);
const pop = (id, t) => tl.fromTo(id, { scale: 0.6, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: POP }, t);

// texture: slow drifting colour blobs for the whole reel
tl.fromTo('#blob1', { x: 0, y: 0 }, { x: 220, y: -160, duration: T.dur, ease: 'sine.inOut' }, 0);
tl.fromTo('#blob2', { x: 0, y: 0 }, { x: -200, y: -120, duration: T.dur, ease: 'sine.inOut' }, 0);

// progress bar: one segment per beat after the hook
tl.set(['#p1', '#p2', '#p3', '#p4', '#p5'], { scaleX: 0 }, 0);
[1, 2, 3, 6, 7].forEach((n, i) => tl.to(`#p${i + 1}`, { scaleX: 1, duration: 0.5, ease: 'power2.out' }, T.at(n)));

// 0. hook: title, kicker and the 72:00:00 clock are on screen at frame 0
tl.fromTo('#s0-title .l', { yPercent: 0 }, { yPercent: 0, duration: 0.01 }, 0);
tl.fromTo('#s0-title', { scale: 1.05 }, { scale: 1, duration: 0.6, ease: OUT }, 0);
tl.fromTo('#s0-dot', { scale: 0.8 }, { scale: 1, duration: 0.4, ease: POP }, 0);
tl.fromTo('#s0-ul', { scaleX: 0 }, { scaleX: 1, duration: 0.5, ease: 'power3.out' }, 0.5);
const clk = { s: 259200 };
tl.fromTo(clk, { s: 259200 }, { s: 259196, duration: T.end(0), ease: 'none', onUpdate: () => {
  const v = Math.max(0, Math.ceil(clk.s));
  const h = Math.floor(v / 3600), m = Math.floor((v % 3600) / 60), s = v % 60;
  document.getElementById('s0-timer').textContent = `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
} }, 0);
bump('#s0-timer', at(0, 0.78));

// 1. who pays: template message PAID (ding), chat from your ad FREE, the 72h window fills
step('#s1', T.at(1)); title('#s1', T.at(1) + 0.05); card('#s1-card', T.at(1) + 0.15);
['#s1-r1', '#s1-r2'].forEach((id, i) => tl.fromTo(id, { x: 60, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4, ease: OUT }, T.at(1) + 0.4 + i * 0.08));
slam('#s1-paid', T.voice(1) + 1.15);
shake('#s1-paid', T.voice(1) + 1.4);
pop('#s1-free', at(1, 0.62));
bump('#s1-free', at(1, 0.62) + 0.45);
tl.fromTo('#s1-win', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: OUT }, at(1, 0.64));
tl.fromTo('#s1-fill', { scaleX: 0 }, { scaleX: 1, duration: T.end(1) - at(1, 0.7), ease: 'power2.inOut' }, at(1, 0.7));
const hrs = { h: 0 };
tl.fromTo(hrs, { h: 0 }, { h: 72, duration: T.end(1) - at(1, 0.7), ease: 'power2.inOut', onUpdate: () => {
  document.getElementById('s1-hrs').textContent = `${Math.round(hrs.h)}h`;
} }, at(1, 0.7));
tl.fromTo('#s1-tag', { opacity: 0 }, { opacity: 1, duration: 0.3, ease: 'power2.out' }, at(1, 0.85));

// 2. the kit: empty dashed slots, each fills as the voice names it
step('#s2', T.at(2)); title('#s2', T.at(2) + 0.05); card('#s2-card', T.at(2) + 0.15);
tl.fromTo(['#k1', '#k2', '#k3', '#k4', '#k5'], { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.35, ease: OUT, stagger: 0.06 }, T.at(2) + 0.35);
['#k1f', '#k2f', '#k3f', '#k4f', '#k5f'].forEach((id, i) => tl.fromTo(id, { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 0.4, ease: 'power3.out' }, at(2, [0.38, 0.55, 0.7, 0.78, 0.86][i])));
tl.fromTo('#s2-tag', { opacity: 0 }, { opacity: 1, duration: 0.3, ease: 'power2.out' }, T.at(2) + 0.9);

// 3. the twist: chat vs website, then two example cases get their verdicts
step('#s3', T.at(3)); title('#s3', T.at(3) + 0.05); card('#s3-card', T.at(3) + 0.15);
tl.fromTo('#vs-chat', { x: -40, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4, ease: OUT }, T.at(3) + 0.2);
tl.fromTo('#vs-web', { x: 40, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4, ease: OUT }, T.at(3) + 0.26);
slam('#vs-x', T.voice(3) + 0.05);
shake('#vs-chat', T.voice(3) + 0.3);

// 4. example: ₹499 kurta, size and COD questions, chat wins
tl.fromTo('#ca', { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 0.45, ease: OUT }, T.at(4));
tl.fromTo('#ca-ex', { opacity: 0 }, { opacity: 1, duration: 0.3, ease: 'power2.out' }, T.at(4) + 0.2);
tl.fromTo('#ca-nm', { scale: 0.95 }, { scale: 1.08, duration: 0.12, ease: 'power2.out', immediateRender: false }, T.voice(4) + 0.68);
tl.fromTo('#ca-nm', { scale: 1.08 }, { scale: 1, duration: 0.35, ease: POP, immediateRender: false }, T.voice(4) + 0.8);
pop('#qa1', at(4, 0.5));
pop('#qa2', at(4, 0.62));
slam('#ca-v', at(4, 0.86));
bump('#ca-v', at(4, 0.86) + 0.3);

// 5. example: impulse buy, the website is faster
tl.fromTo('#cb', { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 0.45, ease: OUT }, T.at(5));
tl.fromTo('#cb-ex', { opacity: 0 }, { opacity: 1, duration: 0.3, ease: 'power2.out' }, T.at(5) + 0.15);
pop('#cb-buy', at(5, 0.3));
slam('#cb-v', at(5, 0.72));
bump('#cb-v', at(5, 0.72) + 0.3);

// 6. the catch: it is a DRAFT (buzz), you tap send, a human replies in minutes
step('#s4', T.at(6)); title('#s4', T.at(6) + 0.05); card('#s4-card', T.at(6) + 0.15);
tl.fromTo('#s4-bub', { y: 30, opacity: 0, scale: 0.92 }, { y: 0, opacity: 1, scale: 1, duration: 0.4, ease: POP }, T.at(6) + 0.25);
slam('#s4-draft', T.voice(6) + 0.15);
shake('#s4-draft', T.voice(6) + 0.4);
pop('#s4-send', at(6, 0.42));
tl.fromTo('#s4-clock', { x: 60, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4, ease: OUT }, at(6, 0.6));
tl.fromTo('#s4-arc', { strokeDashoffset: 213.6 }, { strokeDashoffset: 0, duration: T.end(6) - at(6, 0.62), ease: 'power1.inOut' }, at(6, 0.62));

// 7. save + comment CHAT: letters drop in on the pop
tl.fromTo('#s5-q', { opacity: 0, filter: 'blur(12px)' }, { opacity: 1, filter: 'blur(0px)', duration: 0.45, ease: 'power3.out' }, T.at(7) + 0.1);
tl.fromTo('#save', { yPercent: 40, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.6, ease: OUT }, T.at(7));
tl.fromTo('#mark', { y: -120, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: 'bounce.out' }, T.at(7) + 0.3);
tl.fromTo('#pill', { scale: 0.6, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.45, ease: POP }, T.voice(7) + 0.55);
tl.fromTo(['#kw1', '#kw2', '#kw3', '#kw4'], { y: -60, opacity: 0 }, { y: 0, opacity: 1, duration: 0.35, ease: POP, stagger: 0.06 }, T.voice(7) + 1.2);
pop('#stick', T.voice(7) + 1.75);
tl.fromTo('#pill', { scale: 1 }, { scale: 1.05, duration: 0.3, yoyo: true, repeat: 3, ease: 'sine.inOut', immediateRender: false }, T.end(7) + 0.1);
