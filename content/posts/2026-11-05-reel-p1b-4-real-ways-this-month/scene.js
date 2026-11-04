// ARM B PATCH: line 0 only. Replaces arm A's line-0 tweens; every other tween stays exactly as arm A wrote it.
// Hook is fully on screen at frame 0 (no fade from black); it settles, then the swash draws as the voice says "pays".
{
  const s0Span = T.end(0) - T.voice(0);
  const s0Pays = T.voice(0) + 0.5 * s0Span; // "pays" is word 8 of 14
  tl.fromTo('#s0-title .l', { yPercent: 0 }, { yPercent: 0, duration: 0.01 }, 0);
  tl.fromTo('#s0-title', { scale: 1.06 }, { scale: 1, duration: 0.7, ease: 'expo.out' }, 0);
  tl.fromTo('#s0-step', { opacity: 0.6, x: -12 }, { opacity: 1, x: 0, duration: 0.35, ease: 'power3.out' }, 0);
  tl.fromTo('#s0-swash-p', { strokeDashoffset: 320 }, { strokeDashoffset: 0, duration: 0.5, ease: 'power2.out' }, s0Pays);
  tl.fromTo('#s0-pw', { scale: 1 }, { scale: 1.06, duration: 0.15, yoyo: true, repeat: 1, ease: 'sine.inOut' }, s0Pays + 0.1);
}
