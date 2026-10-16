// node hear.mjs <file.wav> -> transcript with timestamps (Whisper base.en, local)
import { pipeline } from '@huggingface/transformers';
import fs from 'fs';
const b = fs.readFileSync(process.argv[2]);
let p = 12, data, ch = 2, sr = 48000;
while (p < b.length) { const id = b.toString('ascii', p, p + 4), sz = b.readUInt32LE(p + 4); if (id === 'fmt ') { ch = b.readUInt16LE(p + 10); sr = b.readUInt32LE(p + 12); } if (id === 'data') data = b.subarray(p + 8, p + 8 + sz); p += 8 + sz; }
const n = data.length / 2 / ch, k = sr / 16000, m = Math.floor(n / k), x = new Float32Array(m);
for (let i = 0; i < m; i++) { const j = Math.floor(i * k); let s = 0; for (let c = 0; c < ch; c++) s += data.readInt16LE((j * ch + c) * 2) / 32768; x[i] = s / ch; }
const asr = await pipeline('automatic-speech-recognition', 'onnx-community/whisper-base.en', { dtype: 'q8' });
const out = await asr(x, { return_timestamps: true, chunk_length_s: 30, stride_length_s: 5 });
for (const c of out.chunks) console.log(`[${c.timestamp[0]?.toFixed(1)} - ${c.timestamp[1]?.toFixed(1)}] ${c.text.trim()}`);
