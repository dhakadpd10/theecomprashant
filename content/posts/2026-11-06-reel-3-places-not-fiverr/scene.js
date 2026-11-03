// Editorial theme, kind "sites": hook with Fiverr struck out, one site card per site, Contra's money flow, a screenshot card with viewfinder and flash, the catch at zero, a forwarded chat, then the keyword tiles.
const OUT = 'expo.out', P3 = 'power3.out', POP = 'back.out(1.8)';
const span = (n) => T.end(n) - T.voice(n);
const at = (n, f) => T.voice(n) + f * span(n);
const title = (s, t) => tl.fromTo(`${s} .title .l`, { yPercent: 110 }, { yPercent: 0, duration: 0.55, ease: OUT, stagger: 0.08 }, t);
const step = (s, t) => tl.fromTo(`${s} .step`, { x: -40, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4, ease: P3 }, t);
const rise = (id, t, rot) => tl.fromTo(id, { y: 110, opacity: 0, rotation: rot }, { y: 0, opacity: 1, rotation: 0, duration: 0.6, ease: OUT }, t);
const slide = (id, t) => tl.fromTo(id, { x: 50, opacity: 0 }, { x: 0, opacity: 1, duration: 0.35, ease: P3 }, t);
const slam = (id, t) => tl.fromTo(id, { scale: 1.8, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.25, ease: 'power4.in' }, t);
const shake = (id, t) => tl.fromTo(id, { x: 0 }, { x: 8, duration: 0.05, repeat: 5, yoyo: true, ease: 'sine.inOut' }, t);
const bump = (id, t, s) => tl.fromTo(id, { scale: 1 }, { scale: s, duration: 0.18, yoyo: true, repeat: 1, ease: 'sine.inOut' }, t);

// texture: slow drifting blobs for the whole reel
tl.fromTo('#blob1', { x: -40, y: -30 }, { x: 90, y: 70, duration: T.dur, ease: 'sine.inOut' }, 0);
tl.fromTo('#blob2', { x: 40, y: 40 }, { x: -80, y: -60, duration: T.dur, ease: 'sine.inOut' }, 0);

// progress bar: one segment per beat after the hook
tl.set('#bar b', { scaleX: 0 }, 0);
[1, 2, 3, 4, 5, 6, 7].forEach((n) => tl.to(`#p${n}`, { scaleX: 1, duration: 0.45, ease: 'power2.out' }, T.at(n)));

// 0. hook: on screen at frame 0, "pay" bumps, Fiverr gets struck out on "Not Fiverr"
tl.fromTo('#s0-title', { scale: 1.05 }, { scale: 1, duration: 0.6, ease: OUT }, 0);
tl.fromTo('#s0-step', { opacity: 0.7 }, { opacity: 1, duration: 0.3, ease: 'power2.out' }, 0);
bump('#s0-pay', at(0, 0.55), 1.08);
tl.fromTo('#s0-strike', { scaleX: 0 }, { scaleX: 1, duration: 0.25, ease: P3 }, at(0, 0.82));
shake('#s0-nf', at(0, 0.82) + 0.25);

// 1-3. each site: card rises, url types, number pops on the voice, name slides in
[1, 2, 3].forEach((n) => {
  const s = `#s${n}`;
  step(s, T.at(n));
  title(s, T.at(n) + 0.05);
  rise(`${s}-card`, T.at(n) + 0.15, n === 2 ? -2.5 : 2.5);
  tl.fromTo(`${s} .url`, { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 0.45, ease: 'steps(10)' }, T.at(n) + 0.45);
  tl.fromTo(`${s} .num`, { scale: 0, rotation: -90 }, { scale: 1, rotation: 0, duration: 0.45, ease: POP }, T.voice(n) + 0.1);
  tl.fromTo(`${s} .name`, { x: -30, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4, ease: P3 }, T.voice(n) + 0.2);
});

// rows for Prolific and Internshala land with the words, the pay row last
const rows = { 1: [0.22, 0.45, 0.78], 2: [0.42, 0.66, 0.86] };
[1, 2].forEach((n) => {
  rows[n].forEach((f, i) => slide(`#s${n} .r${i + 1}`, at(n, f)));
  bump(`#s${n} .r3`, at(n, rows[n][2]) + 0.4, 1.04);
});

// 3. Contra: no commission chip slams, client pays, you keep the same (example numbers)
slide('#s3 .r1', at(3, 0.15));
slam('#s3-chip', at(3, 0.3));
tl.fromTo('#s3-pay', { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: P3 }, at(3, 0.55));
tl.fromTo('#s3-ex', { opacity: 0 }, { opacity: 1, duration: 0.3, ease: 'power2.out' }, at(3, 0.55));
tl.fromTo('#s3-arrow', { x: -20, opacity: 0 }, { x: 0, opacity: 1, duration: 0.3, ease: P3 }, at(3, 0.64));
tl.fromTo('#s3-keep', { scale: 0.6, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: POP }, at(3, 0.72));
const fmt = (v) => { const s = String(v); return s.length > 3 ? s.slice(0, -3) + ',' + s.slice(-3) : s; };
const keep = { v: 0 };
tl.fromTo(keep, { v: 0 }, {
  v: 5000, duration: 0.5, ease: 'power2.out',
  onUpdate: () => { const el = document.querySelector('#s3-keepv'); if (el) el.textContent = '₹' + fmt(Math.round(keep.v / 50) * 50); }
}, at(3, 0.72));
bump('#s3-keep', at(3, 0.72) + 0.55, 1.06);

// 4. screenshot: full-width card, viewfinder corners close in, flash on the click
step('#s4', T.at(4));
title('#s4', T.at(4) + 0.03);
tl.fromTo('#s4-card', { y: 70, opacity: 0, scale: 0.97 }, { y: 0, opacity: 1, scale: 1, duration: 0.45, ease: OUT }, T.at(4));
tl.fromTo('#s4 .lrow', { x: 50, opacity: 0 }, { x: 0, opacity: 1, duration: 0.35, ease: P3, stagger: 0.07 }, T.at(4) + 0.15);
tl.fromTo('#s4-foot', { opacity: 0 }, { opacity: 1, duration: 0.3, ease: 'power2.out' }, T.at(4) + 0.45);
[['#cn1', -30, -30], ['#cn2', 30, -30], ['#cn3', -30, 30], ['#cn4', 30, 30]].forEach(([id, x, y]) =>
  tl.fromTo(id, { x, y, opacity: 0 }, { x: 0, y: 0, opacity: 1, duration: 0.3, ease: P3 }, T.at(4)));
tl.fromTo('.cn', { scale: 1 }, { scale: 0.85, duration: 0.1, yoyo: true, repeat: 1, ease: 'sine.inOut' }, T.voice(4) + 0.2);
tl.fromTo('#s4-flash', { opacity: 0 }, { opacity: 0.85, duration: 0.05, ease: 'power2.out' }, T.voice(4) + 0.2);
tl.to('#s4-flash', { opacity: 0, duration: 0.35, ease: 'power2.out' }, T.voice(4) + 0.25);
tl.fromTo('#s4 .lnum', { scale: 1 }, { scale: 1.15, duration: 0.15, yoyo: true, repeat: 1, ease: 'sine.inOut', stagger: 0.12 }, at(4, 0.6));

// 5. the catch: zero new work slams in and shakes, then the three checks
step('#s5', T.at(5));
title('#s5', T.at(5) + 0.05);
rise('#s5-card', T.at(5) + 0.05, 2);
tl.fromTo('#s5-zero', { scale: 2.4, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.22, ease: 'power4.in' }, T.voice(5) + 0.18);
shake('#s5-zero', T.voice(5) + 0.42);
tl.fromTo('#s5-from', { x: -20, opacity: 0 }, { x: 0, opacity: 1, duration: 0.35, ease: P3 }, T.voice(5) + 0.5);
[['#k1', '#c1', 0.4], ['#k2', '#c2', 0.62], ['#k3', '#c3', 0.85]].forEach(([r, c, f]) => {
  slide(r, at(5, f));
  slam(c, at(5, f) + 0.15);
});

// 6. send: the list goes to the friend as a forwarded bubble, sent, typing
step('#s6', T.at(6));
title('#s6', T.at(6) + 0.05);
rise('#s6-card', T.at(6) + 0.1, -2);
tl.fromTo('#s6-bub', { scale: 0.6, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: POP }, at(6, 0.15));
tl.fromTo('#s6 .bi', { x: 30, opacity: 0 }, { x: 0, opacity: 1, duration: 0.3, ease: P3, stagger: 0.07 }, at(6, 0.15) + 0.25);
tl.fromTo('#s6-sent', { y: 10, opacity: 0 }, { y: 0, opacity: 1, duration: 0.3, ease: P3 }, at(6, 0.5));
tl.fromTo('#s6-typing', { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.35, ease: POP }, at(6, 0.68));
tl.fromTo('#s6 .td', { y: 0 }, { y: -10, duration: 0.2, yoyo: true, repeat: 3, ease: 'sine.inOut', stagger: 0.08 }, at(6, 0.68) + 0.3);

// 7. keyword: Save + bookmark, the comment's letters drop in, the DM reply, the pill
step('#s7', T.at(7));
title('#s7', T.at(7) + 0.05);
tl.fromTo('#s7-bm', { y: -60, opacity: 0 }, { y: 0, opacity: 1, duration: 0.45, ease: POP }, T.at(7) + 0.2);
rise('#s7-card', T.at(7) + 0.1, 0);
tl.fromTo('#s7-av', { scale: 0 }, { scale: 1, duration: 0.35, ease: POP }, T.at(7) + 0.35);
tl.fromTo('#s7 .tile', { y: -70, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: 'back.out(1.6)', stagger: 0.08 }, T.voice(7) + 0.25);
tl.fromTo('#s7-reply', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: P3 }, at(7, 0.6));
tl.fromTo('#s7-pill', { scale: 0.6, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.45, ease: POP }, at(7, 0.85));
tl.fromTo('#s7-stk', { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.35, ease: POP }, T.end(7) + 0.1);
tl.fromTo('#s7-note', { opacity: 0 }, { opacity: 1, duration: 0.3, ease: 'power2.out' }, T.end(7) + 0.3);
tl.fromTo('#s7 .tile', { scale: 1 }, { scale: 1.1, duration: 0.15, yoyo: true, repeat: 1, ease: 'sine.inOut', stagger: 0.06 }, T.end(7) + 0.6);
