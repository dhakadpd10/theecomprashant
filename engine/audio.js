// Music bed + sound effects synthesised from scratch, voiceover mixed on top with the music ducked under it.
const fs = require('fs');
const path = require('path');

module.exports = function buildAudio({ DUR, starts, cuts, cues, voDir, out }) {
  const SR = 48000, N = Math.round(SR * DUR), TAU = Math.PI * 2, BEAT = 0.6;
  const mtof = (m) => 440 * Math.pow(2, (m - 69) / 12);
  const clamp = (x, a = 0, b = 1) => Math.max(a, Math.min(b, x));
  const music = [new Float32Array(N), new Float32Array(N)], sfx = [new Float32Array(N), new Float32Array(N)];
  let seed = 777; const rnd = () => ((seed = (seed * 1664525 + 1013904223) >>> 0) / 4294967296) * 2 - 1;
  function add(bus, t0, len, gen, { pan = 0, gain = 1 } = {}) {
    const s0 = Math.round(t0 * SR), n = Math.round(len * SR);
    const gl = Math.cos((pan + 1) * Math.PI / 4), gr = Math.sin((pan + 1) * Math.PI / 4);
    for (let i = 0; i < n; i++) { const k = s0 + i; if (k < 0 || k >= N) continue; const v = gen(i / SR) * gain; bus[0][k] += v * gl; bus[1][k] += v * gr; }
  }
  const onePole = () => { let y = 0; return (x, a) => (y += a * (x - y)); };

  // music: Am F C G at 100 BPM
  const prog = [[45, [57, 60, 64]], [41, [53, 57, 60]], [48, [55, 60, 64]], [43, [55, 59, 62]]];
  for (let b = 0; b < Math.ceil(DUR / (BEAT * 4)); b++) {
    const t0 = b * BEAT * 4, [root, chord] = prog[b % 4];
    for (let k = 0; k < 4; k++) {
      const tk = t0 + k * BEAT;
      add(music, tk, 0.35, (t) => Math.sin(TAU * (45 * t + 90 * (1 - Math.exp(-t * 28)) / 28)) * Math.exp(-t * 9) * 0.9);
      const lp = onePole(); add(music, tk + BEAT / 2, 0.06, (t) => { const n = rnd(); return (n - lp(n, 0.3)) * Math.exp(-t * 60) * 0.35; }, { pan: 0.3 });
    }
    [1, 3].forEach((k) => { const lp = onePole(); add(music, t0 + k * BEAT, 0.18, (t) => lp(rnd(), 0.5) * Math.exp(-t * 22) * 0.45, { pan: -0.1 }); });
    [[0, root, 1.0], [2.5, root + 12, 0.45], [3, root, 0.5]].forEach(([at, m, len]) => {
      const f = mtof(m); add(music, t0 + at * BEAT, len * BEAT, (t) => { const ph = (f * t) % 1; return (4 * Math.abs(ph - 0.5) - 1) * Math.min(1, t * 200) * Math.exp(-t * 2.5) * 0.5; });
    });
    for (let e = 0; e < 8; e++) {
      const f = mtof(chord[e % 3] + (e >= 6 ? 12 : 0));
      add(music, t0 + e * BEAT / 2, 0.5, (t) => (Math.sin(TAU * f * t) + 0.35 * Math.sin(TAU * 2 * f * t) + 0.12 * Math.sin(TAU * 3 * f * t)) * Math.exp(-t * 7) * 0.12, { pan: e % 2 ? 0.35 : -0.35 });
    }
    chord.forEach((m, i) => { const f = mtof(m - 12); add(music, t0, BEAT * 4, (t) => (Math.sin(TAU * f * t) + Math.sin(TAU * f * 1.003 * t)) * Math.min(1, t / 0.4) * Math.min(1, (BEAT * 4 - t) / 0.4) * 0.035, { pan: (i - 1) * 0.5 }); });
  }

  // sound effects
  const FX = {
    pop: (t0, pitch = 1) => add(sfx, t0, 0.14, (t) => Math.sin(TAU * 500 * pitch * (1 + 1.5 * Math.min(1, t * 20)) * t) * Math.exp(-t * 30) * 0.9, { gain: 0.35 }),
    thud: (t0) => add(sfx, t0, 0.2, (t) => Math.sin(TAU * (60 + 80 * Math.exp(-t * 40)) * t) * Math.exp(-t * 18), { gain: 0.5 }),
    click: (t0) => { const lp = onePole(); add(sfx, t0, 0.03, (t) => { const n = rnd(); return (n - lp(n, 0.2)) * Math.exp(-t * 180); }, { gain: 0.35, pan: 0.2 }); },
    bloop: (t0) => add(sfx, t0, 0.3, (t) => Math.sin(TAU * (300 * t + 900 * t * t)) * Math.exp(-t * 10), { gain: 0.45 }),
    buzz: (t0) => add(sfx, t0, 0.22, (t) => (Math.sign(Math.sin(TAU * 140 * t)) * 0.5 + Math.sin(TAU * 280 * t) * 0.3) * Math.exp(-t * 14) * 0.6, { gain: 0.32, pan: 0.3 }),
    ding: (t0, m = 84) => add(sfx, t0, 0.9, (t) => { const f = mtof(m); return (Math.sin(TAU * f * t) + 0.4 * Math.sin(TAU * f * 2.76 * t) * Math.exp(-t * 6)) * Math.exp(-t * 4.5); }, { gain: 0.22, pan: 0.3 }),
    whoosh: (t0, len = 0.35) => { const lp = onePole(), lp2 = onePole(); add(sfx, t0 - len - 0.04, len, (t) => { const x = t / len, a = 0.02 + 0.5 * x; return lp2(lp(rnd(), a), a) * Math.sin(Math.PI * x) * 1.6; }, { gain: 0.28 }); },
  };
  cuts.forEach((c) => c > 0 && FX.whoosh(c));
  cues.forEach(([name, at, arg]) => FX[name] && FX[name](at, arg));

  // voiceover
  const vo = new Float32Array(N);
  fs.readdirSync(voDir).filter((f) => /^line\d+\.f32$/.test(f)).sort().forEach((f, i) => {
    const buf = fs.readFileSync(path.join(voDir, f)); const x = new Float32Array(buf.buffer, buf.byteOffset, buf.length / 4);
    const s0 = Math.round(starts[i] * SR); for (let j = 0; j < x.length && s0 + j < N; j++) vo[s0 + j] += x[j];
  });
  let vpk = 0; for (let i = 0; i < N; i++) vpk = Math.max(vpk, Math.abs(vo[i]));
  for (let i = 0; i < N; i++) vo[i] *= 0.95 / (vpk || 1);
  const duck = new Float32Array(N); let env = 0;
  for (let i = 0; i < N; i++) { const x = Math.abs(vo[i]); env = x > env ? env + (x - env) * 0.02 : env * 0.99993; duck[i] = 1 - 0.75 * clamp(env * 9); }

  const L = new Float32Array(N), R = new Float32Array(N);
  for (let i = 0; i < N; i++) {
    const t = i / SR, fade = clamp((DUR - t) / 0.8) * clamp(t / 0.02);
    L[i] = (music[0][i] * 0.5 * duck[i] + sfx[0][i] * 0.55 * (0.12 + 0.88 * duck[i]) + vo[i] * 1.05) * fade;
    R[i] = (music[1][i] * 0.5 * duck[i] + sfx[1][i] * 0.55 * (0.12 + 0.88 * duck[i]) + vo[i] * 1.05) * fade;
  }
  let peak = 0; for (let i = 0; i < N; i++) peak = Math.max(peak, Math.abs(L[i]), Math.abs(R[i]));
  const drive = 1.1 / peak, ceil = 0.89, d = Buffer.alloc(N * 4);
  for (let i = 0; i < N; i++) {
    d.writeInt16LE(Math.round(clamp(Math.tanh(L[i] * drive) / Math.tanh(1.1) * ceil, -1, 1) * 32767), i * 4);
    d.writeInt16LE(Math.round(clamp(Math.tanh(R[i] * drive) / Math.tanh(1.1) * ceil, -1, 1) * 32767), i * 4 + 2);
  }
  const h = Buffer.alloc(44);
  h.write('RIFF', 0); h.writeUInt32LE(36 + d.length, 4); h.write('WAVE', 8); h.write('fmt ', 12); h.writeUInt32LE(16, 16);
  h.writeUInt16LE(1, 20); h.writeUInt16LE(2, 22); h.writeUInt32LE(SR, 24); h.writeUInt32LE(SR * 4, 28); h.writeUInt16LE(4, 32); h.writeUInt16LE(16, 34);
  h.write('data', 36); h.writeUInt32LE(d.length, 40);
  fs.writeFileSync(out, Buffer.concat([h, d]));
};
