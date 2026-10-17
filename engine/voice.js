// Voiceover shared by every reel style: records each "say" line with Kokoro (local), checks every word with
// Whisper (local), and works out the timing the visuals follow. Re-records only when words, voice or speed change.
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { spawnSync } = require('child_process');

const TTS = path.resolve(__dirname, '../tts');
const GAP = 0.2, LEAD = 0.1, TAIL = 1.4;

/** Record the voiceover into <dir>/vo unless it is already up to date. Prints CHECK THESE WORDS when Whisper missed some. */
function record(dir, post) {
  const voDir = path.join(dir, 'vo');
  const sayLines = post.lines.map((l) => l.say);
  const hash = crypto.createHash('md5').update(JSON.stringify([post.voice, post.speed, sayLines])).digest('hex');
  const hashFile = path.join(voDir, 'hash.txt');
  if (fs.existsSync(hashFile) && fs.readFileSync(hashFile, 'utf8') === hash) return;
  console.log('recording voiceover:', post.voice);
  fs.rmSync(voDir, { recursive: true, force: true });
  const linesFile = path.join(dir, 'vo-lines.txt');
  fs.writeFileSync(linesFile, sayLines.join('\n') + '\n');
  const env = { ...process.env, SPEED: String(post.speed || 1.08) };
  spawnSync('node', ['say.mjs', post.voice, voDir, linesFile], { cwd: TTS, env, stdio: 'ignore' });
  spawnSync('node', ['trim.js', voDir], { cwd: TTS, stdio: 'inherit' });
  // word check: speak it back through Whisper with no music under it
  const lens0 = JSON.parse(fs.readFileSync(path.join(voDir, 'trimmed.json')));
  const parts = lens0.map((_, i) => { const b = fs.readFileSync(path.join(voDir, `line${String(i + 1).padStart(2, '0')}.f32`)); return new Float32Array(b.buffer, b.byteOffset, b.length / 4); });
  const n = parts.reduce((s, p) => s + p.length + 9600, 0), d = Buffer.alloc(n * 4); let k = 0;
  for (const p of parts) { for (const v of [...p, ...new Float32Array(9600)]) { const s = Math.round(Math.max(-1, Math.min(1, v)) * 32767); d.writeInt16LE(s, k * 4); d.writeInt16LE(s, k * 4 + 2); k++; } }
  const h = Buffer.alloc(44); h.write('RIFF', 0); h.writeUInt32LE(36 + d.length, 4); h.write('WAVE', 8); h.write('fmt ', 12); h.writeUInt32LE(16, 16); h.writeUInt16LE(1, 20); h.writeUInt16LE(2, 22); h.writeUInt32LE(48000, 24); h.writeUInt32LE(192000, 28); h.writeUInt16LE(4, 32); h.writeUInt16LE(16, 34); h.write('data', 36); h.writeUInt32LE(d.length, 40);
  fs.writeFileSync(path.join(voDir, 'vo-only.wav'), Buffer.concat([h, d]));
  const heard = spawnSync('node', ['hear.mjs', path.join(voDir, 'vo-only.wav')], { cwd: TTS, encoding: 'utf8' }).stdout.split('\n').filter((l) => l.startsWith('[')).map((l) => l.replace(/^\[[^\]]*\]\s*/, '')).join(' ');
  const norm = (s) => s.toLowerCase().replace(/[^a-z0-9 ]+/g, ' ').split(/\s+/).filter(Boolean);
  const said = new Set(norm(heard)); const missing = [...new Set(norm(sayLines.join(' ').replace(/^@\w\|/gm, '')))].filter((w) => !said.has(w) && w.length > 2);
  fs.writeFileSync(path.join(voDir, 'heard.txt'), heard + '\n\nnot heard: ' + missing.join(', ') + '\n');
  console.log('WHISPER HEARD:', heard);
  console.log(missing.length ? `CHECK THESE WORDS: ${missing.join(', ')}` : 'every word heard');
  fs.writeFileSync(hashFile, hash);
}

/** Seconds for each line: starts[i] = voice starts, cut[i] = visual change (a beat before the voice), DUR = reel length. */
function timing(dir) {
  const lens = JSON.parse(fs.readFileSync(path.join(dir, 'vo', 'trimmed.json')));
  const starts = []; { let t = 0.08; for (const l of lens) { starts.push(t); t += l + GAP; } }
  const cut = starts.map((s, i) => (i === 0 ? 0 : s - LEAD));
  const DUR = +(starts[starts.length - 1] + lens[lens.length - 1] + TAIL).toFixed(2);
  return { lens, starts, cut, DUR };
}

module.exports = { record, timing };
