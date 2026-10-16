// node trim.js <dir> -> reads lineNN.wav, writes lineNN.f32 (mono float32 @ 48k, silence trimmed) + timing.json
const fs = require('fs'); const dir = process.argv[2];
function readWav(f) {
  const b = fs.readFileSync(f); let p = 12, fmt, data;
  while (p < b.length) { const id = b.toString('ascii', p, p + 4), sz = b.readUInt32LE(p + 4); if (id === 'fmt ') fmt = { tag: b.readUInt16LE(p + 8), ch: b.readUInt16LE(p + 10), sr: b.readUInt32LE(p + 12), bits: b.readUInt16LE(p + 22) }; if (id === 'data') data = b.subarray(p + 8, p + 8 + sz); p += 8 + sz + (sz % 2); }
  const n = data.length / (fmt.bits / 8) / fmt.ch, out = new Float32Array(n);
  for (let i = 0; i < n; i++) out[i] = fmt.tag === 3 ? data.readFloatLE(i * 4 * fmt.ch) : data.readInt16LE(i * 2 * fmt.ch) / 32768;
  return { sr: fmt.sr, x: out, fmt };
}
const files = fs.readdirSync(dir).filter((f) => /^line\d+\.wav$/.test(f)).sort();
const res = [];
for (const f of files) {
  const { sr, x, fmt } = readWav(`${dir}/${f}`);
  const th = 0.012; let a = 0, b = x.length - 1;
  while (a < x.length && Math.abs(x[a]) < th) a++;
  while (b > a && Math.abs(x[b]) < th) b--;
  a = Math.max(0, a - Math.round(0.03 * sr)); b = Math.min(x.length - 1, b + Math.round(0.08 * sr));
  // resample to 48k (linear)
  const seg = x.subarray(a, b), k = 48000 / sr, n = Math.round(seg.length * k), y = new Float32Array(n);
  for (let i = 0; i < n; i++) { const s = i / k, j = Math.floor(s), fr = s - j; y[i] = (seg[j] || 0) * (1 - fr) + (seg[j + 1] || 0) * fr; }
  fs.writeFileSync(`${dir}/${f.replace('.wav', '.f32')}`, Buffer.from(y.buffer));
  res.push(+(n / 48000).toFixed(3));
}
fs.writeFileSync(`${dir}/trimmed.json`, JSON.stringify(res));
console.log(dir, 'fmt', JSON.stringify(readWav(`${dir}/${files[0]}`).fmt), 'lens', res.join(' '), 'total', res.reduce((s, v) => s + v, 0).toFixed(2));
