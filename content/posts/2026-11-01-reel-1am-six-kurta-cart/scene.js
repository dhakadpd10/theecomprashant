// Editorial skit: one cart card empties through the night (6 -> 3 -> 1 -> cancelled), a serif title per beat, sunrise clock, then the keyword.
const OUT = 'expo.out', POP = 'back.out(1.8)', SLAM = 'power4.in';
const span = (n) => T.end(n) - T.voice(n);
const at = (n, f) => T.voice(n) + f * span(n);
const title = (s, t) => tl.fromTo(`${s} .title .l`, { yPercent: 110 }, { yPercent: 0, duration: 0.55, ease: OUT, stagger: 0.08 }, t);
const kick = (s, t) => tl.fromTo(`${s} .kick`, { x: -30, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4, ease: OUT }, t);
const beat = (n) => { kick(`#s${n}`, T.at(n)); title(`#s${n}`, T.at(n) + 0.05); };
const slam = (id, land, from) => tl.fromTo(id, { scale: from, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.25, ease: SLAM }, land - 0.25);
const swap = (a, b, t) => {
  tl.fromTo(a, { opacity: 1, y: 0 }, { opacity: 0, y: -16, duration: 0.2, ease: 'power3.in', immediateRender: false }, t);
  tl.fromTo(b, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.4, ease: OUT }, t + 0.15);
};
const leave = (ids, t) => tl.fromTo(ids, { y: 0, opacity: 1, scale: 1 }, { y: -50, opacity: 0, scale: 0.6, duration: 0.35, ease: 'power3.in', stagger: 0.07 }, t);
const hop = (ids, t) => tl.fromTo(ids, { y: 0 }, { y: -14, duration: 0.18, ease: 'power2.out', yoyo: true, repeat: 1, stagger: 0.05 }, t);
const KUR = ['#k1', '#k2', '#k3', '#k4', '#k5', '#k6'];

// texture: slow warm blobs for the whole reel
tl.fromTo('#blobA', { x: -40, y: 0 }, { x: 90, y: 60, duration: T.dur, ease: 'sine.inOut' }, 0);
tl.fromTo('#blobB', { x: 40, y: 40 }, { x: -80, y: -30, duration: T.dur, ease: 'sine.inOut' }, 0);

// progress bar: one segment per line
const P = ['#p0', '#p1', '#p2', '#p3', '#p4', '#p5', '#p6', '#p7', '#p8'];
tl.set(P, { scaleX: 0 }, 0);
P.forEach((id, n) => tl.to(id, { scaleX: 1, duration: 0.5, ease: 'power2.out' }, T.at(n)));

// 0. hook: title and the full 6-kurta cart are on screen at frame 0
tl.fromTo('#s0-title .l', { yPercent: 0 }, { yPercent: 0, duration: 0.01 }, 0);
tl.fromTo('#s0-title', { scale: 1.05 }, { scale: 1, duration: 0.6, ease: OUT }, 0);
tl.fromTo('#cart', { scale: 1.03 }, { scale: 1, duration: 0.6, ease: OUT }, 0);
hop(KUR, at(0, 0.5));

// 1. 1:02 am, phone lights up: ping on the ding, kurtas hop on "six items"
beat(1);
tl.fromTo('#ping', { opacity: 0.9, scale: 1 }, { opacity: 0, scale: 1.08, duration: 0.7, ease: 'power2.out', immediateRender: false }, T.voice(1));
tl.fromTo('#cart', { scale: 1 }, { scale: 1.04, duration: 0.15, ease: 'power2.out', yoyo: true, repeat: 1, immediateRender: false }, T.voice(1));
hop(KUR, at(1, 0.5));

// 2. Goa planned: the trip stamp slams onto the card
beat(2);
slam('#goa', at(2, 0.72), 1.7);

// 3. 1:09 am: 3 kurtas leave on the pop, the total gets struck
beat(3);
leave(['#k6', '#k5', '#k4'], T.voice(3) + 0.9);
swap('#c6', '#c3', T.voice(3) + 0.9);
tl.fromTo('#strike', { scaleX: 0 }, { scaleX: 1, duration: 0.35, ease: 'power2.out' }, T.voice(3) + 1.15);

// 4. 1:15 am: down to 1, Goa is crossed out, Lonavala slams in
beat(4);
leave(['#k3', '#k2'], T.voice(4) + 0.6);
swap('#c3', '#c1', T.voice(4) + 0.6);
tl.fromTo('#goa-x', { scaleX: 0 }, { scaleX: 1, duration: 0.3, ease: 'power2.out' }, at(4, 0.68));
slam('#lona', at(4, 0.68) + 0.4, 1.7);

// 5. 1:16 am: order placed, ₹499, COD
beat(5);
tl.fromTo('#placed', { scale: 0.5, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: POP }, T.voice(5) + 0.5);
swap('#amt1', '#amt2', T.voice(5) + 0.5);
swap('#c1', '#cc', at(5, 0.7));
tl.fromTo('#k1', { scale: 1 }, { scale: 1.08, duration: 0.15, ease: 'power2.out', yoyo: true, repeat: 1 }, T.voice(5) + 0.5);

// 6. 1:17 am: CANCELLED slams on the buzz, the card shakes
beat(6);
slam('#cancel', T.voice(6) + 0.8, 2);
tl.fromTo(['#cart', '#cancel'], { x: 0 }, { x: 8, duration: 0.05, repeat: 5, yoyo: true, ease: 'none' }, T.voice(6) + 0.8);
tl.fromTo('#placed', { opacity: 1 }, { opacity: 0.3, duration: 0.3, ease: 'power2.out', immediateRender: false }, T.voice(6) + 0.85);
tl.fromTo('#k1', { opacity: 1 }, { opacity: 0.25, duration: 0.3, ease: 'power2.out' }, T.voice(6) + 0.85);

// 7. till sunrise: the clock card lands on the thud, the clock runs to 6 am, the sun rises
beat(7);
tl.fromTo('#clockcard', { y: -50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.25, ease: SLAM }, T.voice(7) + 0.05);
const clk = { m: 77 };
tl.fromTo(clk, { m: 77 }, { m: 360, duration: span(7) - 0.4, ease: 'power1.inOut', onUpdate: () => { const m = Math.round(clk.m); document.getElementById('clk').textContent = `${Math.floor(m / 60)}:${String(m % 60).padStart(2, '0')} am`; } }, T.voice(7) + 0.4);
tl.fromTo('#sun', { y: 100 }, { y: 0, duration: span(7) - 0.4, ease: 'sine.inOut' }, T.voice(7) + 0.4);
tl.fromTo('#dawn', { opacity: 0 }, { opacity: 1, duration: span(7) - 0.4, ease: 'sine.inOut' }, T.voice(7) + 0.4);

// 8. comment CART: the free sequence, three messages you send yourself
beat(8);
tl.fromTo('#ctacard', { y: 80, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: OUT }, T.at(8) + 0.2);
tl.fromTo(['#m1', '#m2', '#m3'], { scale: 0.5, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: POP, stagger: 0.08 }, at(8, 0.6));
tl.fromTo('#ctalabel', { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 0.45, ease: 'power3.out' }, at(8, 0.82));
tl.fromTo('#s8-title', { scale: 1 }, { scale: 1.04, duration: 0.3, yoyo: true, repeat: 3, ease: 'sine.inOut' }, T.end(8));
