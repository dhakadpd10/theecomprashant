// Editorial theme, green accent: a "mixed" report gets struck out, three steps fill the bar, the best-click ad gets stamped KILL, and the sorted board ends it.
const OUT = 'expo.out', POP = 'back.out(1.8)', SLAM = 'power4.in';
const span = (n) => T.end(n) - T.voice(n);
const at = (n, f) => T.voice(n) + f * span(n);
const title = (s, t) => tl.fromTo(`${s} .title .l`, { yPercent: 110 }, { yPercent: 0, duration: 0.55, ease: OUT, stagger: 0.08 }, t);
const card = (id, t) => tl.fromTo(id, { y: 110, opacity: 0, scale: 0.96 }, { y: 0, opacity: 1, scale: 1, duration: 0.55, ease: OUT }, t);
const step = (s, t) => tl.fromTo(`${s} .step`, { x: -40, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4, ease: OUT }, t);
const pop = (id, t) => tl.fromTo(id, { scale: 0.4, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: POP }, t);
const shake = (id, t) => tl.fromTo(id, { x: 0 }, { x: 8, duration: 0.05, repeat: 5, yoyo: true, ease: 'none' }, t);

// texture: two soft blobs drift for the whole reel
tl.fromTo('#blob1', { x: 0, y: 0 }, { x: 160, y: 120, duration: T.dur, ease: 'sine.inOut' }, 0);
tl.fromTo('#blob2', { x: 0, y: 0 }, { x: -140, y: -180, duration: T.dur, ease: 'sine.inOut' }, 0);

// progress bar: one segment per step
tl.set(['#p1', '#p2', '#p3'], { scaleX: 0 }, 0);
[2, 3, 4].forEach((n, i) => tl.to(`#p${i + 1}`, { scaleX: 1, duration: 0.5, ease: 'power2.out' }, T.at(n)));

// 0. hook: the quote is on screen at frame 0, gets struck out, then the three calls pop
tl.fromTo('#s0-title', { scale: 1.05 }, { scale: 1, duration: 0.6, ease: OUT }, 0);
tl.fromTo('#s0-k1', { scaleX: 0 }, { scaleX: 1, duration: 0.3, ease: 'power3.out' }, at(0, 0.33));
tl.fromTo('#s0-k2', { scaleX: 0 }, { scaleX: 1, duration: 0.3, ease: 'power3.out' }, at(0, 0.33) + 0.2);
shake('#s0-title', at(0, 0.33) + 0.5);
pop('#s0-c1', at(0, 0.6));
pop('#s0-c2', at(0, 0.72));
pop('#s0-c3', at(0, 0.86));

// 1. the report: 9 rows x 14 columns wipe in, "mixed" footer, then "Just tell Claude."
title('#s1', T.at(1));
card('#s1-card', T.at(1) + 0.15);
tl.fromTo(['#s1-h', '#s1-r1', '#s1-r2', '#s1-r3', '#s1-r4', '#s1-r5', '#s1-r6', '#s1-r7', '#s1-r8', '#s1-r9'], { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 0.35, ease: 'power3.out', stagger: 0.05 }, T.at(1) + 0.3);
tl.fromTo('#s1-foot', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: OUT }, T.at(1) + 0.85);
pop('#s1-spend', T.at(1) + 0.95);
shake('#s1-foot', T.at(1) + 1.55);
tl.fromTo('#s1-ask', { scale: 1 }, { scale: 0.95, duration: 0.08, ease: 'power2.inOut' }, at(1, 0.68));
tl.fromTo('#s1-ask', { scale: 0.5, opacity: 0, y: 40 }, { scale: 1, opacity: 1, y: 0, duration: 0.45, ease: POP }, at(1, 0.68) + 0.08);

// 2. step 1: filters set, export pressed (click), file downloads, tick
step('#s2', T.at(2)); title('#s2', T.at(2) + 0.05); card('#s2-card', T.at(2) + 0.15);
tl.fromTo(['#s2-f1', '#s2-f2'], { scale: 0.6, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.35, ease: POP, stagger: 0.07 }, T.at(2) + 0.4);
tl.fromTo('#s2-file', { x: 60, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4, ease: OUT }, T.at(2) + 0.5);
tl.fromTo('#s2-btn', { scale: 1 }, { scale: 0.94, duration: 0.1, ease: 'power2.inOut' }, T.voice(2) + 0.82);
tl.fromTo('#s2-btn', { scale: 0.94 }, { scale: 1, duration: 0.3, ease: POP }, T.voice(2) + 0.92);
tl.fromTo('#s2-fill', { scaleX: 0 }, { scaleX: 1, duration: 0.6, ease: 'power2.inOut' }, T.voice(2) + 0.95);
pop('#s2-tick', T.voice(2) + 1.55);

// 3. step 2: sheet pasted, break-even typed, prompt typed, send pressed
step('#s3', T.at(3)); title('#s3', T.at(3) + 0.05); card('#s3-card', T.at(3) + 0.15);
tl.fromTo('#s3-file', { y: 30, opacity: 0, scale: 0.9 }, { y: 0, opacity: 1, scale: 1, duration: 0.4, ease: POP }, T.at(3) + 0.35);
tl.fromTo('#s3-field', { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.45, ease: OUT }, T.at(3) + 0.5);
tl.fromTo('#s3-val', { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 0.35, ease: 'steps(4)' }, at(3, 0.55));
pop('#s3-ex', at(3, 0.7));
tl.fromTo('#s3-ask', { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 0.35, ease: 'steps(10)' }, T.at(3) + 1.55);
tl.fromTo('#s3-send', { scale: 1 }, { scale: 0.88, duration: 0.08, ease: 'power2.inOut' }, T.at(3) + 1.95);
tl.fromTo('#s3-send', { scale: 0.88 }, { scale: 1, duration: 0.25, ease: POP }, T.at(3) + 2.03);

// 4. step 3: one row per ad, each call pops on (pop sfx on the first)
step('#s4', T.at(4)); title('#s4', T.at(4) + 0.05); card('#s4-card', T.at(4) + 0.15);
tl.fromTo(['#s4-a1', '#s4-a2', '#s4-a3'], { x: 60, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4, ease: OUT, stagger: 0.08 }, T.voice(4) + 0.25);
[['#s4-c1', 0.8], ['#s4-c2', 1.25], ['#s4-c3', 1.7]].forEach(([id, d]) => {
  tl.fromTo(id, { scale: 0.3, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.35, ease: POP }, T.voice(4) + d);
});

// 5. the twist: clicks count up, purchases stay 0, KILL slams on (thud)
title('#s5', T.at(5));
card('#s5-card', T.at(5) + 0.15);
pop('#s5-best', T.voice(5) + 0.3);
const clicks = { n: 0 };
tl.fromTo(clicks, { n: 0 }, { n: 1240, duration: 0.6, ease: 'power2.out', onUpdate: () => { const v = Math.round(clicks.n); document.getElementById('s5-clicks').textContent = v >= 1000 ? `${Math.floor(v / 1000)},${String(v % 1000).padStart(3, '0')}` : String(v); } }, T.voice(5) + 0.15);
tl.fromTo('#s5-buys', { scale: 1 }, { scale: 1.15, duration: 0.15, yoyo: true, repeat: 1, ease: 'power2.inOut' }, T.voice(5) + 0.45);
tl.fromTo('#s5-stamp', { scale: 2.4, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.25, ease: SLAM }, T.voice(5) + 0.65);
shake('#s5-card', T.voice(5) + 0.9);
tl.fromTo('#s5-ex', { filter: 'blur(12px)', opacity: 0 }, { filter: 'blur(0px)', opacity: 1, duration: 0.45, ease: OUT }, T.voice(5) + 1.4);
tl.fromTo('#s5-stamp', { scale: 1 }, { scale: 1.05, duration: 0.2, yoyo: true, repeat: 1, ease: 'sine.inOut' }, at(5, 0.85));

// 6. the catch: note pinned (buzz shake), then the COD subtraction
title('#s6', T.at(6));
tl.fromTo('#s6-note', { y: -60, opacity: 0, scale: 1.04 }, { y: 0, opacity: 1, scale: 1, duration: 0.45, ease: 'power3.out' }, T.at(6) + 0.1);
shake('#s6-note', T.voice(6) + 0.5);
card('#s6-math', at(6, 0.28));
tl.fromTo('#s6-m1', { x: 50, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4, ease: OUT }, at(6, 0.36));
tl.fromTo('#s6-m2', { x: 50, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4, ease: OUT }, at(6, 0.52));
tl.fromTo('#s6-line', { scaleX: 0 }, { scaleX: 1, duration: 0.35, ease: 'power3.out' }, at(6, 0.72));
tl.fromTo('#s6-m3', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: OUT }, at(6, 0.78));
tl.fromTo('#s6-m3', { scale: 1 }, { scale: 1.05, duration: 0.2, yoyo: true, repeat: 1, ease: 'sine.inOut' }, at(6, 0.78) + 0.45);
tl.fromTo('#s6-ex', { opacity: 0 }, { opacity: 1, duration: 0.3, ease: 'power2.out' }, at(6, 0.85));

// 7. the payoff: every ad sorted into three columns, readable for a screenshot
tl.fromTo('#s7-board', { y: 80, opacity: 0, scale: 0.96 }, { y: 0, opacity: 1, scale: 1, duration: 0.55, ease: OUT }, T.at(7));
tl.fromTo(['#s7-h1', '#s7-h2', '#s7-h3'], { scale: 0.4, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.35, ease: POP, stagger: 0.07 }, T.at(7) + 0.25);
tl.fromTo(['#s7-k1', '#s7-p1', '#s7-s1', '#s7-k2', '#s7-p2', '#s7-s2', '#s7-k3', '#s7-p3', '#s7-s3'], { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.35, ease: POP, stagger: 0.05 }, T.voice(7) + 0.4);
title('#s7', at(7, 0.55));
tl.fromTo('#s7-board', { scale: 1 }, { scale: 1.03, duration: 0.2, yoyo: true, repeat: 1, ease: 'sine.inOut' }, T.end(7) - 0.5);

// 8. save + comment SCALE: letters drop in on the beat, sticker, pulse
tl.fromTo('#save', { yPercent: 40, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.6, ease: OUT }, T.at(8));
tl.fromTo('#mark', { y: -120, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: 'bounce.out' }, T.at(8) + 0.3);
tl.fromTo('#pill', { scale: 0.6, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.45, ease: POP }, at(8, 0.3));
tl.fromTo(['#kw1', '#kw2', '#kw3', '#kw4', '#kw5'], { y: -60, opacity: 0 }, { y: 0, opacity: 1, duration: 0.35, ease: POP, stagger: 0.05 }, at(8, 0.3) + 0.3);
tl.fromTo('#s8-sticker', { scale: 0.4, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: POP }, T.end(8) - 0.3);
tl.fromTo('#pill', { scale: 1 }, { scale: 1.05, duration: 0.3, yoyo: true, repeat: 3, ease: 'sine.inOut' }, T.end(8));
