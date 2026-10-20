// Sound for one story reel: a bouncy marimba-and-pluck bed, cut whooshes, comedy hits and both voices.
// node story/audio.js content/posts/<id>  -> <id>/audio.wav (48 kHz, 16-bit stereo)
// Beat "sfx": ["ding" | "fail" | "boing" | "cash" | "buzz" | "scratch" | "pop"]; post.json "musicStop": beat index where the music cuts (the punchline).
const fs = require('fs'), path = require('path');
const timeline = require('./timeline');

const EP = path.resolve(process.argv[2]);
const TL = timeline(EP), B = TL.beats, DUR = TL.DUR;
const post = JSON.parse(fs.readFileSync(path.join(EP, 'post.json'), 'utf8'));
const SR = 48000, N = Math.round(SR * DUR), TAU = Math.PI * 2;
const mtof = (m) => 440 * Math.pow(2, (m - 69) / 12);
const clamp = (x, a = 0, b = 1) => Math.max(a, Math.min(b, x));
const music = [new Float32Array(N), new Float32Array(N)], sfx = [new Float32Array(N), new Float32Array(N)];
let seed = 99; const rnd = () => ((seed = (seed * 1664525 + 1013904223) >>> 0) / 4294967296) * 2 - 1;
function add(bus, t0, len, gen, { pan = 0, gain = 1 } = {}) {
  const s0 = Math.round(t0 * SR), n = Math.round(len * SR), gl = Math.cos((pan + 1) * Math.PI / 4), gr = Math.sin((pan + 1) * Math.PI / 4);
  for (let i = 0; i < n; i++) { const k = s0 + i; if (k < 0 || k >= N) continue; const v = gen(i / SR) * gain; bus[0][k] += v * gl; bus[1][k] += v * gr; }
}
const onePole = () => { let y = 0; return (x, a) => (y += a * (x - y)); };

// ---------- music: C  Am  F  G at 112 BPM, marimba chords, plucked bass, claps ----------
const stopBeat = post.musicStop !== undefined ? B[post.musicStop] : null;
const stopAt = stopBeat ? Math.max(0.5, stopBeat.vo - 0.05) : DUR;
const BEAT = 60 / 112, BAR = BEAT * 4;
const chords = [[60, 64, 67], [57, 60, 64], [53, 57, 60], [55, 59, 62]];
const marimba = (f) => (t) => (Math.sin(TAU * f * t) + 0.25 * Math.sin(TAU * f * 4 * t) * Math.exp(-t * 30)) * Math.exp(-t * 7) * Math.min(1, t * 400);
const pluck = (f) => (t) => { const ph = (f * t) % 1; return (2 * ph - 1) * Math.exp(-t * 6) * Math.min(1, t * 300) * 0.6 + Math.sin(TAU * f * t) * Math.exp(-t * 3) * 0.6; };
for (let bar = 0; bar * BAR < stopAt; bar++) {
  const tb = bar * BAR, ch = chords[bar % 4];
  // marimba plays an off-beat chord pattern
  [0, 1.5, 2, 3, 3.5].forEach((at, j) => { const m = ch[j % 3] + 12; add(music, tb + at * BEAT, 0.5, marimba(mtof(m)), { gain: 0.09, pan: j % 2 ? 0.3 : -0.3 }); });
  // a hook melody every other bar
  if (bar % 2 === 0) [[0, 4], [0.5, 2], [1, 0], [2, 7], [2.5, 4]].forEach(([at, d]) => add(music, tb + at * BEAT, 0.35, marimba(mtof(72 + d)), { gain: 0.07, pan: 0.15 }));
  // bass
  [[0, 0], [1.5, 0], [2, 7], [3, 12]].forEach(([at, d]) => add(music, tb + at * BEAT, BEAT * 0.9, pluck(mtof(ch[0] - 24 + d)), { gain: 0.16 }));
  // kick, clap, shaker
  for (let k = 0; k < 4; k++) {
    const tk = tb + k * BEAT; if (tk > stopAt) break;
    add(music, tk, 0.25, (t) => Math.sin(TAU * (48 * t + 70 * (1 - Math.exp(-t * 35)) / 35)) * Math.exp(-t * 14), { gain: 0.42 });
    if (k % 2 === 1) { const lp = onePole(); add(music, tk, 0.14, (t) => { const n = rnd(); return (n - lp(n, 0.15)) * (Math.exp(-t * 30) + 0.5 * Math.exp(-Math.abs(t - 0.012) * 300)); }, { gain: 0.2, pan: -0.05 }); }
    for (let s = 0; s < 2; s++) { const lp = onePole(); add(music, tk + s * BEAT / 2, 0.05, (t) => { const n = rnd(); return (n - lp(n, 0.3)) * Math.exp(-t * 80); }, { gain: 0.06, pan: 0.35 }); }
  }
}
// hard stop at the punchline, with a short fade
const sStop = Math.round(stopAt * SR);
for (let i = sStop; i < N; i++) { const g = clamp(1 - (i - sStop) / (0.05 * SR)); music[0][i] *= g; music[1][i] *= g; }
// the music comes back for the call to action
const cta = B.find((b) => b.cta);
if (stopBeat && cta && cta.start > stopAt + 0.3) {
  for (let bar = 0; cta.start + bar * BAR < DUR; bar++) { const tb = cta.start + bar * BAR, ch = chords[bar % 4]; [0, 1.5, 2, 3, 3.5].forEach((at, j) => add(music, tb + at * BEAT, 0.5, marimba(mtof(ch[j % 3] + 12)), { gain: 0.08, pan: j % 2 ? 0.3 : -0.3 })); add(music, tb, BAR * 0.9, pluck(mtof(ch[0] - 24)), { gain: 0.14 }); }
}

// ---------- effects ----------
const whoosh = (t0, len = 0.32) => { const lp = onePole(), lp2 = onePole(); add(sfx, t0 - len + 0.04, len, (t) => { const x = t / len, a = 0.03 + 0.5 * x; return lp2(lp(rnd(), a), a) * Math.sin(Math.PI * x) * 1.6; }, { gain: 0.2 }); };
const FX = {
  pop: (t0) => add(sfx, t0, 0.14, (t) => Math.sin(TAU * 520 * (1 + 1.4 * Math.min(1, t * 22)) * t) * Math.exp(-t * 30), { gain: 0.3 }),
  ding: (t0) => [84, 91].forEach((m, i) => add(sfx, t0 + i * 0.09, 0.9, (t) => (Math.sin(TAU * mtof(m) * t) + 0.35 * Math.sin(TAU * mtof(m) * 2.76 * t) * Math.exp(-t * 6)) * Math.exp(-t * 4.5), { gain: 0.16, pan: 0.2 })),
  fail: (t0) => [62, 61, 60, 59].forEach((m, i) => add(sfx, t0 + i * 0.32, i === 3 ? 0.9 : 0.32, (t) => { const f = mtof(m) * (i === 3 ? 1 + 0.02 * Math.sin(TAU * 6 * t) : 1); const ph = (f * t) % 1; return ((2 * ph - 1) * 0.5 + Math.sin(TAU * f * t) * 0.5) * Math.min(1, t * 40) * Math.exp(-t * (i === 3 ? 1.6 : 2)); }, { gain: 0.14 })),
  boing: (t0) => add(sfx, t0, 0.5, (t) => Math.sin(TAU * (180 + 220 * Math.sin(TAU * 9 * t) * Math.exp(-t * 6)) * t) * Math.exp(-t * 5), { gain: 0.22 }),
  cash: (t0) => { [96, 100, 103].forEach((m, i) => add(sfx, t0 + i * 0.06, 0.5, (t) => Math.sin(TAU * mtof(m) * t) * Math.exp(-t * 8), { gain: 0.1, pan: 0.3 })); const lp = onePole(); add(sfx, t0 + 0.18, 0.3, (t) => { const n = rnd(); return (n - lp(n, 0.1)) * Math.exp(-t * 12); }, { gain: 0.12 }); },
  buzz: (t0) => { for (let k = 0; k < 2; k++) add(sfx, t0 + k * 0.5, 0.35, (t) => Math.sign(Math.sin(TAU * 165 * t)) * 0.5 * Math.min(1, t * 60) * Math.min(1, (0.35 - t) * 40), { gain: 0.07, pan: 0.2 }); },
  scratch: (t0) => { const lp = onePole(); add(sfx, t0, 0.38, (t) => { const n = rnd(); return lp(n, 0.25) * Math.sin(TAU * (900 - 1800 * t) * t) * 2 * Math.exp(-t * 4); }, { gain: 0.25 }); },
};
B.forEach((b, i) => {
  if (i > 0 && b.shot !== B[i - 1].shot) whoosh(b.start);
  if (b.shot === 'phone' && (i === 0 || B[i - 1].shot !== 'phone')) FX.pop(b.start + 0.12);
  if (b.punch && b.vo !== null) FX.boing(b.vo);
  if (b.cta) FX.ding(b.start + 0.12);
  for (const f of b.sfx || []) FX[f] && FX[f](b.vo ?? b.start);
});

// ---------- voices ----------
const vo = new Float32Array(N);
B.forEach((b) => {
  if (b.vo === null) return;
  const buf = fs.readFileSync(path.join(EP, 'voice', b.key + '.f32')); const x = new Float32Array(buf.buffer, buf.byteOffset, buf.length / 4);
  const s0 = Math.round(b.vo * SR); for (let j = 0; j < x.length && s0 + j < N; j++) vo[s0 + j] += x[j];
});
let vpk = 0; for (let i = 0; i < N; i++) vpk = Math.max(vpk, Math.abs(vo[i]));
for (let i = 0; i < N; i++) vo[i] *= 0.92 / (vpk || 1);
const duck = new Float32Array(N); let env = 0;
for (let i = 0; i < N; i++) { const a = Math.abs(vo[i]); env = a > env ? env + (a - env) * 0.02 : env * 0.99993; duck[i] = 1 - 0.62 * clamp(env * 8); }

// ---------- mix ----------
const L = new Float32Array(N), R = new Float32Array(N);
for (let i = 0; i < N; i++) {
  const t = i / SR, fade = clamp((DUR - t) / 0.4) * clamp(t / 0.02);
  L[i] = (music[0][i] * duck[i] + sfx[0][i] * (0.3 + 0.7 * duck[i]) + vo[i] * 1.05) * fade;
  R[i] = (music[1][i] * duck[i] + sfx[1][i] * (0.3 + 0.7 * duck[i]) + vo[i] * 1.05) * fade;
}
let peak = 0; for (let i = 0; i < N; i++) peak = Math.max(peak, Math.abs(L[i]), Math.abs(R[i]));
const drive = 1.08 / (peak || 1), d = Buffer.alloc(N * 4);
for (let i = 0; i < N; i++) { d.writeInt16LE(Math.round(clamp(Math.tanh(L[i] * drive) / Math.tanh(1.08) * 0.89, -1, 1) * 32767), i * 4); d.writeInt16LE(Math.round(clamp(Math.tanh(R[i] * drive) / Math.tanh(1.08) * 0.89, -1, 1) * 32767), i * 4 + 2); }
const h = Buffer.alloc(44);
h.write('RIFF', 0); h.writeUInt32LE(36 + d.length, 4); h.write('WAVE', 8); h.write('fmt ', 12); h.writeUInt32LE(16, 16); h.writeUInt16LE(1, 20); h.writeUInt16LE(2, 22); h.writeUInt32LE(SR, 24); h.writeUInt32LE(SR * 4, 28); h.writeUInt16LE(4, 32); h.writeUInt16LE(16, 34); h.write('data', 36); h.writeUInt32LE(d.length, 40);
fs.writeFileSync(path.join(EP, 'audio.wav'), Buffer.concat([h, d]));
console.log('wrote audio.wav', DUR + 's');
