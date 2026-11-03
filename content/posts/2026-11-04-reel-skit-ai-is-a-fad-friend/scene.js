// Skit, editorial theme: hook rows on frame 0 (fad struck out, Fiverr underlined), the chai stall, a day counter to 180,
// the whisper, the search typing, the chai and napkin sliding across, then the 3 real places, the catch, the share sheet and the keyword card.
const OUT = 'expo.out', POP = 'back.out(1.8)', IN = 'power3.in', SLAM = 'power4.in';
const span = (n) => T.end(n) - T.voice(n);
const say = (n, f) => T.voice(n) + f * span(n);
const reveal = (sel, t) => tl.fromTo(sel, { yPercent: 110 }, { yPercent: 0, duration: 0.55, ease: OUT, stagger: 0.08 }, t);
const rise = (sel, t) => tl.fromTo(sel, { y: 110, opacity: 0, scale: 0.96 }, { y: 0, opacity: 1, scale: 1, duration: 0.6, ease: OUT }, t);
const slideIn = (sel, t) => tl.fromTo(sel, { x: 70, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4, ease: OUT }, t);
const popIn = (sel, t) => tl.fromTo(sel, { scale: 0.5, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: POP }, t);
const bump = (sel, t, s = 1.06) => tl.fromTo(sel, { scale: 1 }, { scale: s, duration: 0.18, yoyo: true, repeat: 1, ease: 'sine.inOut' }, t);
const slam = (sel, t) => {
  tl.fromTo(sel, { scale: 1.8, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.24, ease: SLAM }, t);
  tl.fromTo(sel, { x: 0 }, { x: 7, duration: 0.05, repeat: 5, yoyo: true, ease: 'none' }, t + 0.24);
};
const fade = (sel, t) => tl.fromTo(sel, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: 'power2.out' }, t);
const numPop = (sel, t) => tl.fromTo(sel, { scale: 0, rotation: -90 }, { scale: 1, rotation: 0, duration: 0.45, ease: POP }, t);

// texture: two soft blobs drift across the whole reel
tl.fromTo('#blob1', { x: 0, y: 0 }, { x: -160, y: 120, duration: T.dur, ease: 'sine.inOut' }, 0);
tl.fromTo('#blob2', { x: 0, y: 0 }, { x: 180, y: -90, duration: T.dur, ease: 'sine.inOut' }, 0);

// 0. hook: both rows on screen at frame 0; "fad" gets struck as the voice says "half a year later", Fiverr gets underlined
tl.fromTo('#s0-title .l', { yPercent: 0 }, { yPercent: 0, duration: 0.01 }, 0);
tl.fromTo('#s0-title', { scale: 1.05 }, { scale: 1, duration: 0.6, ease: OUT }, 0);
tl.fromTo('#s0-strike', { scaleX: 0 }, { scaleX: 1, duration: 0.3, ease: 'power3.out' }, say(0, 0.42));
bump('#s0-d180', say(0, 0.5));
tl.fromTo('#s0-under', { scaleX: 0 }, { scaleX: 1, duration: 0.35, ease: 'power3.out' }, say(0, 0.82));
bump('#s0-fiv', say(0, 0.9), 1.08);

// 1. Day 1 at the stall: awning drops, sign swings, the verdict bubble pops
tl.fromTo('#s1 .awn', { y: -110 }, { y: 0, duration: 0.5, ease: OUT }, T.at(1));
tl.fromTo('#s1 .sign', { y: -60, opacity: 0, rotation: -6 }, { y: 0, opacity: 1, rotation: 0, duration: 0.5, ease: POP }, T.at(1) + 0.12);
slideIn('#s1 .day', T.at(1) + 0.1);
popIn('#s1-bub', T.voice(1) + 0.05);
tl.fromTo('#s1-say', { filter: 'blur(12px)', opacity: 0 }, { filter: 'blur(0px)', opacity: 1, duration: 0.4, ease: OUT }, T.voice(1) + 0.15);
bump('#s1-fad', say(1, 0.72), 1.1);

// 2. six months later: the calendar slams (thud), the day counts 1 to 180
tl.fromTo('#s2-cal', { scale: 1.45, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.2, ease: SLAM }, T.at(2));
tl.fromTo('#s2-cal', { y: 0 }, { y: 8, duration: 0.05, repeat: 3, yoyo: true, ease: 'none' }, T.at(2) + 0.2);
const day = { v: 1 };
tl.fromTo(day, { v: 1 }, { v: 180, duration: 0.8, ease: 'power2.out', onUpdate: () => { document.querySelector('#s2-num').textContent = String(Math.round(day.v)); } }, T.voice(2) + 0.05);
reveal('#s2-title .l', T.voice(2) + 0.15);

// 3. same stall, same friend, whispering: awning resettles, DAY 180 chip, the dashed whisper bubble
tl.fromTo('#s3 .awn', { y: -40 }, { y: 0, duration: 0.4, ease: OUT }, T.at(3));
bump('#s3 .sign', T.voice(3) + 0.1);
popIn('#s3 .day', T.at(3) + 0.15);
popIn('#s3-bub', say(3, 0.58));
tl.fromTo('#s3 .dt', { y: 0 }, { y: -14, duration: 0.15, repeat: 3, yoyo: true, ease: 'sine.inOut', stagger: 0.1 }, say(3, 0.58) + 0.3);
tl.fromTo('#s3-psst', { filter: 'blur(12px)', opacity: 0 }, { filter: 'blur(0px)', opacity: 1, duration: 0.4, ease: OUT }, say(3, 0.58) + 0.15);

// 4. the question: search bar pops (pop), the query types, cursor blinks, the button presses
tl.fromTo('#s4-search', { scale: 0.92, opacity: 0, y: 30 }, { scale: 1, opacity: 1, y: 0, duration: 0.4, ease: POP }, T.voice(4) - 0.05);
tl.fromTo('#s4-q', { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 1.3, ease: 'steps(28)' }, T.voice(4) + 0.2);
tl.fromTo('#s4-cur', { opacity: 1 }, { opacity: 0, duration: 0.15, repeat: 3, yoyo: true, ease: 'none' }, T.voice(4) + 1.55);
tl.fromTo('#s4-go', { scale: 1 }, { scale: 0.88, duration: 0.12, yoyo: true, repeat: 1, ease: 'power2.inOut' }, say(4, 0.92));

// 5. the chai slides across with a napkin note (the cooker whistles on the host)
tl.fromTo(['#s5-chai', '#s5-nap'], { x: 340, opacity: 0 }, { x: 0, opacity: 1, duration: 0.65, ease: 'power3.out', stagger: 0.06 }, T.voice(5));
tl.fromTo('#s5-nap', { rotation: -9 }, { rotation: -3, duration: 0.7, ease: 'power3.out' }, T.voice(5) + 0.06);
tl.fromTo('#s5-steam', { y: 12, opacity: 0 }, { y: -6, opacity: 1, duration: 0.9, ease: 'sine.inOut' }, T.voice(5) + 0.55);
tl.fromTo('#s5-nap .h', { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 0.45, ease: 'steps(11)' }, T.voice(5) + 0.6);
tl.fromTo('#s5-nap .n', { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 0.5, ease: 'power2.out' }, T.voice(5) + 0.9);

// 6. start here: the card rises, each place lands as it's named, chips pop on "gigs" and "paid studies"
reveal('#s6 .ttl .l', T.at(6) + 0.05);
rise('#s6 .panel', T.at(6) + 0.2);
fade('#s6 .ph', T.at(6) + 0.5);
slideIn('#s6 .ra', T.voice(6) + 0.35); numPop('#s6 .ra .n', T.voice(6) + 0.45);
slideIn('#s6 .rb', say(6, 0.36)); numPop('#s6 .rb .n', say(6, 0.36) + 0.1);
popIn('#s6 .ra .chip', say(6, 0.5));
popIn('#s6 .rb .chip', say(6, 0.5) + 0.08);
slideIn('#s6 .rc', say(6, 0.64)); numPop('#s6 .rc .n', say(6, 0.64) + 0.1);
popIn('#s6 .rc .chip', say(6, 0.86));

// 7. the catch: three rows, each chip slams and shakes
reveal('#s7 .ttl .l', T.at(7) + 0.05);
rise('#s7 .panel', T.at(7) + 0.2);
fade('#s7 .ph', T.at(7) + 0.5);
slideIn('#s7 .ra', say(7, 0.05)); slam('#s7 .ra .chip', say(7, 0.33));
slideIn('#s7 .rb', say(7, 0.48)); slam('#s7 .rb .chip', say(7, 0.72));
slideIn('#s7 .rc', say(7, 0.8)); slam('#s7 .rc .chip', say(7, 0.9));

// 8a. send this: the share sheet, the fad friend's button presses to SENT, the plane flies off
reveal('#s8a .ttl .l', T.at(8) + 0.05);
tl.fromTo('#s8a-plane', { x: -220, y: 120, opacity: 0, rotation: -20 }, { x: 0, y: 0, opacity: 1, rotation: 0, duration: 0.6, ease: OUT }, T.at(8) + 0.2);
rise('#s8a .panel', T.at(8) + 0.2);
fade('#s8a .ph', T.at(8) + 0.45);
tl.fromTo(['#s8a .ra', '#s8a .rb', '#s8a .rc'], { x: 70, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4, ease: OUT, stagger: 0.07 }, T.at(8) + 0.45);
const press = say(8, 0.32);
tl.fromTo('#s8a-btn', { scale: 1 }, { scale: 0.88, duration: 0.1, yoyo: true, repeat: 1, ease: 'power2.inOut' }, press);
tl.fromTo('#s8a-btn', { backgroundColor: '#1E1A16' }, { backgroundColor: '#2E6A4F', duration: 0.2, ease: 'power2.out' }, press + 0.1);
tl.fromTo('#s8a-send', { opacity: 1 }, { opacity: 0, duration: 0.15, ease: 'power2.out' }, press + 0.1);
tl.fromTo('#s8a-sent', { opacity: 0 }, { opacity: 1, duration: 0.2, ease: 'power2.out' }, press + 0.15);
tl.to('#s8a-plane', { x: 140, y: -70, opacity: 0, duration: 0.3, ease: IN }, press + 0.25);

// 8b. the keyword, huge, and the roadmap it sends; bump on the ding
const K = T.voice(8) + 2.0;
reveal('#s8b-title .l', K);
rise('#s8b-panel', K + 0.15);
tl.fromTo('#s8b .trow', { x: 70, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4, ease: OUT, stagger: 0.12 }, K + 0.4);
tl.fromTo('#s8b .tick', { scale: 0 }, { scale: 1, duration: 0.35, ease: POP, stagger: 0.12 }, K + 0.5);
fade('#s8b-ft', K + 0.9);
bump('#s8b-title', T.end(8) + 0.3, 1.06);
