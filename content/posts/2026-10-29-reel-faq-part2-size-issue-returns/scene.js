// Editorial tutorial: vague "size issue" returns become one fit line per product, shown above Add to cart.
const OUT = 'expo.out', POP = 'back.out(1.8)';
const span = (n) => T.end(n) - T.voice(n);
const at = (n, f) => T.voice(n) + f * span(n);
const title = (s, t) => tl.fromTo(`${s} .title .l`, { yPercent: 110 }, { yPercent: 0, duration: 0.55, ease: OUT, stagger: 0.09 }, t);
const card = (id, t) => tl.fromTo(id, { y: 110, opacity: 0, scale: 0.96 }, { y: 0, opacity: 1, scale: 1, duration: 0.6, ease: OUT }, t);
const step = (s, t) => tl.fromTo(`${s} .step`, { x: -40, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4, ease: OUT }, t);
const press = (id, t) => tl.fromTo(id, { scale: 1 }, { scale: 0.92, duration: 0.1, yoyo: true, repeat: 1, ease: 'power2.inOut' }, t);
const pop = (id, t) => tl.fromTo(id, { scale: 0.5, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: POP }, t);

// texture: slow drifting blobs for the whole reel
tl.fromTo('#blob1', { x: 0, y: 0 }, { x: 160, y: 120, duration: T.dur, ease: 'sine.inOut' }, 0);
tl.fromTo('#blob2', { x: 0, y: 0 }, { x: -140, y: -160, duration: T.dur, ease: 'sine.inOut' }, 0);

// progress bar: one segment fills per beat
tl.set(['#p1', '#p2', '#p3', '#p4', '#p5', '#p6', '#p7', '#p8'], { scaleX: 0 }, 0);
[1, 2, 3, 4, 5, 6, 7, 8].forEach((n) => tl.to(`#p${n}`, { scaleX: 1, duration: 0.5, ease: 'power2.out' }, T.at(n)));

// 0. hook: title and the pile of "Size issue" notes are on screen at frame 0
tl.fromTo('#s0-title .l', { yPercent: 0 }, { yPercent: 0, duration: 0.01 }, 0);
tl.fromTo('#s0-title', { scale: 1.04 }, { scale: 1, duration: 0.6, ease: OUT }, 0);
tl.fromTo('#s0 .note', { y: -12 }, { y: 0, duration: 0.45, ease: 'power3.out', stagger: 0.05 }, 0);
tl.fromTo('#badge', { scale: 1.8, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.25, ease: 'power4.in' }, T.voice(0) + 0.5);
tl.fromTo('#s0 .note', { x: 0 }, { x: 6, duration: 0.05, repeat: 5, yoyo: true, ease: 'none' }, T.voice(0) + 0.78);
tl.fromTo('#s0-ex', { opacity: 0 }, { opacity: 1, duration: 0.3, ease: 'power2.out' }, T.voice(0) + 0.8);
tl.fromTo('#s0-ul', { scaleX: 0 }, { scaleX: 1, duration: 0.45, ease: 'power3.out' }, at(0, 0.6));

// 1. just tell Claude: the question, then the notes attached
step('#s1', T.at(1)); title('#s1', T.at(1) + 0.05); card('#s1-card', T.at(1) + 0.2);
tl.fromTo('#s1-bub', { y: 30, opacity: 0, scale: 0.9 }, { y: 0, opacity: 1, scale: 1, duration: 0.35, ease: POP }, at(1, 0.25));
tl.fromTo('#s1-file', { x: -60, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4, ease: OUT }, at(1, 0.6));
tl.fromTo('#s1-ex', { opacity: 0 }, { opacity: 1, duration: 0.3, ease: 'power2.out' }, at(1, 0.7));

// 2. step 1: notes list wipes in, Export is pressed, the file appears
step('#s2', T.at(2)); title('#s2', T.at(2) + 0.05); card('#s2-card', T.at(2) + 0.2);
['#r1', '#r2', '#r3', '#r4'].forEach((id, i) => tl.fromTo(id, { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 0.4, ease: 'power3.out' }, T.voice(2) + 0.2 + i * 0.07));
press('#s2-btn', T.voice(2) + 0.7);
pop('#s2-csv', T.voice(2) + 0.85);

// 3. step 2: the three boxes fill, then Write it
step('#s3', T.at(3)); title('#s3', T.at(3) + 0.05); card('#s3-card', T.at(3) + 0.2);
['#fd1', '#fd2', '#fd3'].forEach((id, i) => tl.fromTo(id, { x: 60, opacity: 0 }, { x: 0, opacity: 1, duration: 0.35, ease: OUT }, T.voice(3) + 0.3 + i * 0.08));
[['#ok1', 0.42], ['#ok2', 0.56], ['#ok3', 0.7]].forEach(([id, f]) => pop(id, at(3, f)));
press('#s3-go', at(3, 0.88));

// 4. step 3: grouped rows, counts pop on the ding, the top row bumps
step('#s4', T.at(4)); title('#s4', T.at(4) + 0.05); card('#s4-card', T.at(4) + 0.2);
['#g1', '#g2', '#g3'].forEach((id, i) => tl.fromTo(id, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: OUT }, T.voice(4) + 0.2 + i * 0.08));
['#c1', '#c2', '#c3'].forEach((id, i) => pop(id, T.voice(4) + 0.8 + i * 0.07));
tl.fromTo('#g1', { scale: 1 }, { scale: 1.05, duration: 0.25, yoyo: true, repeat: 1, ease: 'sine.inOut' }, T.voice(4) + 1.3);

// 5. product page: the fit line slams in above Add to cart, the PDF gets struck out
step('#s5', T.at(5)); title('#s5', T.at(5) + 0.05); card('#s5-card', T.at(5) + 0.2);
tl.fromTo('#s5-fit', { scale: 1.3, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.25, ease: 'power4.in' }, T.voice(5) + 0.9);
tl.fromTo('#s5-cart', { scale: 1 }, { scale: 1.05, duration: 0.2, yoyo: true, repeat: 1, ease: 'sine.inOut' }, T.voice(5) + 1.2);
pop('#s5-pdf', at(5, 0.6));
tl.fromTo('#s5-strike', { scaleX: 0 }, { scaleX: 1, duration: 0.3, ease: 'power3.out' }, at(5, 0.74));

// 6. the catch: a text box is added to the return form, then two weeks pass
step('#s6', T.at(6)); title('#s6', T.at(6) + 0.05); card('#s6-card', T.at(6) + 0.2);
tl.fromTo('#s6-box', { scale: 0.85, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: POP }, at(6, 0.5));
tl.fromTo('#s6-type', { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 0.7, ease: 'steps(18)' }, at(6, 0.5) + 0.35);
tl.fromTo('#s6-wait', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.35, ease: OUT }, at(6, 0.68));
tl.fromTo('#s6-fill', { scaleX: 0 }, { scaleX: 1, duration: 0.9, ease: 'power1.inOut' }, at(6, 0.74));
const day = { d: 0 };
tl.fromTo(day, { d: 0 }, { d: 14, duration: 0.9, ease: 'power1.inOut', onUpdate: () => { document.getElementById('s6-day').textContent = `Day ${Math.round(day.d)}`; } }, at(6, 0.74));

// 7. before / now: the vague reason is struck out, the real fit line pops in full and readable
step('#s7', T.at(7)); title('#s7', T.at(7) + 0.05);
card('#s7-before', T.at(7) + 0.15);
tl.fromTo('#s7-strike', { scaleX: 0 }, { scaleX: 1, duration: 0.3, ease: 'power3.out' }, at(7, 0.22));
tl.fromTo('#s7-after', { scale: 0.85, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.45, ease: POP }, T.voice(7) + 1.4);
tl.fromTo('#s7-after', { scale: 1 }, { scale: 1.05, duration: 0.3, yoyo: true, repeat: 1, ease: 'sine.inOut' }, at(7, 0.8));

// 8. save + comment FAQ: letters drop in on the beat
tl.fromTo('#save', { yPercent: 40, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.6, ease: OUT }, T.at(8));
tl.fromTo('#mark', { y: -120, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: 'bounce.out' }, T.at(8) + 0.3);
tl.fromTo('#cta', { y: 80, opacity: 0, scale: 0.96 }, { y: 0, opacity: 1, scale: 1, duration: 0.55, ease: OUT }, T.at(8) + 0.35);
['#k1', '#k2', '#k3'].forEach((id, i) => tl.fromTo(id, { y: -140, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: POP }, at(8, 0.42) + i * T.beat / 2));
tl.fromTo('#free', { scale: 0, rotation: -10 }, { scale: 1, rotation: -4, duration: 0.4, ease: POP }, T.end(8) - 0.2);
tl.fromTo('#cta', { scale: 1 }, { scale: 1.04, duration: 0.3, yoyo: true, repeat: 3, ease: 'sine.inOut' }, T.end(8) + 0.1);
