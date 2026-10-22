// node story/voices.mjs <post dir> [--check]
// Speaks every beat that has "say" in its character's voice (story/cast.json):
//   provider "azure":  Microsoft Azure neural voices (Hindi, hi-IN), needs AZURE_SPEECH_KEY + AZURE_SPEECH_REGION
//   provider "kokoro": the local Kokoro model (English only)
// Writes voice/NN.f32 (48 kHz mono, trimmed) + voice/voice.json (lengths + mouth envelope).
// --check: transcribes every line with local Whisper; lines it can't hear right are printed as "CHECK THESE WORDS: ...".
import fs from 'fs';
import path from 'path';

const epDir = path.resolve(process.argv[2]);
const CHECK = process.argv.includes('--check');
const ep = JSON.parse(fs.readFileSync(path.join(epDir, 'post.json'), 'utf8'));
const cast = JSON.parse(fs.readFileSync(new URL('./cast.json', import.meta.url), 'utf8'));
const provider = cast.provider || 'kokoro', HINDI = cast.language === 'hi';
const out = path.join(epDir, 'voice');
fs.mkdirSync(out, { recursive: true });
const SR = 48000, FPS = 30, res = {}, lines = [];

// ---------- the voice engines: each returns { audio: Float32Array, sr } ----------
let speak;
if (provider === 'azure') {
  const key = (process.env.AZURE_SPEECH_KEY || '').trim(), region = (process.env.AZURE_SPEECH_REGION || '').trim();
  if (!key || !region) throw new Error('Hindi voices need the AZURE_SPEECH_KEY and AZURE_SPEECH_REGION secrets (docs/SETUP.md, "Hindi voices")');
  const sdk = (await import('microsoft-cognitiveservices-speech-sdk')).default;
  const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');
  // the SDK (not the plain REST call) reports when every word starts, so captions and camera cuts land on the words
  const once = (ssml) => new Promise((ok, fail) => {
    const cfg = sdk.SpeechConfig.fromSubscription(key, region);
    cfg.speechSynthesisOutputFormat = sdk.SpeechSynthesisOutputFormat.Riff48Khz16BitMonoPcm;
    const synth = new sdk.SpeechSynthesizer(cfg, null), words = [];
    synth.wordBoundary = (_, ev) => { if (ev.boundaryType === sdk.SpeechSynthesisBoundaryType.Word) words.push({ t: ev.audioOffset / 1e7, text: ev.text }); };
    synth.speakSsmlAsync(ssml, (r) => {
      synth.close();
      if (r.reason === sdk.ResultReason.SynthesizingAudioCompleted) return ok({ wav: Buffer.from(r.audioData), words });
      const d = sdk.CancellationDetails.fromResult(r); fail(new Error(`Azure speech failed: ${d.errorDetails || r.errorDetails || r.reason}`));
    }, (err) => { synth.close(); fail(new Error(`Azure speech failed: ${err}`)); });
  });
  speak = async (text, c) => {
    const ssml = `<speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xml:lang="${c.lang || 'hi-IN'}"><voice name="${c.voice}"><prosody rate="${c.rate || '+0%'}" pitch="${c.pitch || '+0%'}">${esc(text)}</prosody></voice></speak>`;
    for (let attempt = 1; ; attempt++) {
      try {
        const { wav: b, words } = await once(ssml); let p = 12, data = null;
        while (p < b.length - 8) { const id = b.toString('ascii', p, p + 4), sz = b.readUInt32LE(p + 4); if (id === 'data') { data = b.subarray(p + 8, p + 8 + sz); break; } p += 8 + sz; }
        if (!data) throw new Error('Azure returned audio without a data chunk');
        const x = new Float32Array(Math.floor(data.length / 2)); for (let k = 0; k < x.length; k++) x[k] = data.readInt16LE(k * 2) / 32768;
        return { audio: x, sr: 48000, words };
      } catch (e) {
        if (/429|throttl|5\d\d|timeout|Connection/i.test(e.message) && attempt < 5) { console.log(e.message, '- retrying'); await new Promise((ok) => setTimeout(ok, attempt * 4000)); continue; }
        throw new Error(/401|auth|subscription/i.test(e.message) ? `${e.message} (check the AZURE_SPEECH_KEY and AZURE_SPEECH_REGION secrets)` : e.message);
      }
    }
  };
} else {
  const { KokoroTTS } = await import('kokoro-js');
  const tts = await KokoroTTS.from_pretrained('onnx-community/Kokoro-82M-v1.0-ONNX', { dtype: 'q8', device: 'cpu' });
  let acc = 'a'; tts._validate_voice = () => acc; // allows the British voices with the right accent
  speak = async (text, c, b) => { acc = c.acc || 'a'; const au = await tts.generate(text, { voice: c.voice, speed: (c.speed || 1) * (b.speed || 1) }); return { audio: au.audio, sr: au.sampling_rate }; };
}

for (let i = 0; i < ep.beats.length; i++) {
  const b = ep.beats[i]; if (!b.say) continue;
  const key = String(i).padStart(2, '0'), c = (cast[provider] || cast)[b.who];
  if (!c) throw new Error(`beat ${i}: no ${provider} voice for "${b.who}" in story/cast.json`);
  const { audio: x, sr, words } = await speak(b.say, c, b);
  const th = 0.01; let a = 0, e = x.length - 1;
  while (a < x.length && Math.abs(x[a]) < th) a++;
  while (e > a && Math.abs(x[e]) < th) e--;
  a = Math.max(0, a - Math.round(0.02 * sr)); e = Math.min(x.length - 1, e + Math.round(0.06 * sr));
  const seg = x.subarray(a, e);
  // resample to 48k; pitch > 1 raises the voice (Kokoro only: Azure does pitch in its own prosody)
  const step = (sr / SR) * (provider === 'azure' ? 1 : c.pitch || 1), n = Math.floor(seg.length / step), y = new Float32Array(n), gain = c.gain || 1;
  for (let k = 0; k < n; k++) { const s = k * step, j = Math.floor(s), f = s - j; y[k] = ((seg[j] || 0) * (1 - f) + (seg[j + 1] || 0) * f) * gain; }
  fs.writeFileSync(path.join(out, key + '.f32'), Buffer.from(y.buffer));
  const hop = SR / FPS, env = [];
  for (let f = 0; f * hop < n; f++) { let s = 0; const s0 = Math.floor(f * hop), s1 = Math.min(n, Math.floor((f + 1) * hop)); for (let k = s0; k < s1; k++) s += y[k] * y[k]; env.push(Math.sqrt(s / Math.max(1, s1 - s0))); }
  const pk = Math.max(...env) || 1;
  res[key] = { who: b.who, len: +(n / SR).toFixed(3), env: env.map((v) => +(v / pk).toFixed(2)) };
  // when each spoken word starts, in seconds from the start of the trimmed line (Azure only)
  if (words?.length) res[key].words = words.map((w) => ({ t: +Math.max(0, w.t - a / sr).toFixed(3), text: w.text }));
  lines.push({ key, i, say: b.say, y });
  console.log(key, b.who, res[key].len + 's', b.say);
}
fs.writeFileSync(path.join(out, 'voice.json'), JSON.stringify(res));

// ---------- the ear check ----------
const lev = (r, h) => { const d = Array.from({ length: r.length + 1 }, (_, i) => [i, ...Array(h.length).fill(0)]); for (let j = 1; j <= h.length; j++) d[0][j] = j; for (let i = 1; i <= r.length; i++) for (let j = 1; j <= h.length; j++) d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (r[i - 1] === h[j - 1] ? 0 : 1)); return d[r.length][h.length] / Math.max(1, r.length); };
if (CHECK) {
  const { pipeline } = await import('@huggingface/transformers');
  const heard = {}, bad = [];
  if (HINDI) {
    // Hindi: multilingual Whisper, compared letter by letter on the Devanagari only (English tool names and digits
    // come back in either script, and small vowel-sign differences are spelling, not mishearing)
    const asr = await pipeline('automatic-speech-recognition', 'onnx-community/whisper-small', { dtype: 'q8' });
    const deva = (s) => s.normalize('NFC').replace(/[़ँ]/g, (m) => (m === 'ँ' ? 'ं' : '')).replace(/[^ऀ-ॿ]/g, '').replace(/[।॥]/g, '');
    for (const L of lines) {
      const m = Math.floor(L.y.length / 3), z = new Float32Array(m + 8000);
      for (let k = 0; k < m; k++) z[k + 4000] = L.y[k * 3];
      const text = (await asr(z, { language: 'hindi', task: 'transcribe' })).text.trim();
      const ref = deva(L.say), e = ref.length < 6 ? 0 : lev([...ref], [...deva(text)]);
      heard[L.key] = { say: L.say, heard: text, error: +e.toFixed(2) };
      if (e > 0.4) bad.push(`beat ${L.i} "${L.say}" was heard as "${text}"`);
    }
  } else {
    // the timestamped Whisper also says when each word starts, so captions and camera cuts can land on the voice
    const asr = await pipeline('automatic-speech-recognition', 'onnx-community/whisper-base.en_timestamped', { dtype: 'q8' });
    const tok = (s) => s.toLowerCase().replace(/[^a-z0-9' ]+/g, ' ').split(/\s+/).filter(Boolean);
    // line up the script's words with the heard words (edit-distance alignment); unmatched words get times in between
    const align = (sayWords, chunks) => {
      const r = sayWords.map((w) => w.toLowerCase().replace(/[^a-z0-9']/g, '')), h = chunks.map((c) => tok(c.text).join(''));
      const d = Array.from({ length: r.length + 1 }, (_, i) => [i, ...Array(h.length).fill(0)]); for (let j = 1; j <= h.length; j++) d[0][j] = j;
      for (let i = 1; i <= r.length; i++) for (let j = 1; j <= h.length; j++) d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (r[i - 1] === h[j - 1] ? 0 : 1));
      const t = Array(r.length).fill(null); let i = r.length, j = h.length;
      while (i > 0 && j > 0) { if (d[i][j] === d[i - 1][j - 1] + (r[i - 1] === h[j - 1] ? 0 : 1)) { t[i - 1] = chunks[j - 1].timestamp[0]; i--; j--; } else if (d[i][j] === d[i - 1][j] + 1) i--; else j--; }
      const known = t.map((v, k) => [k, v]).filter(([, v]) => v !== null);
      if (!known.length) return null;
      return t.map((v, k) => { if (v !== null) return v; const a = [...known].reverse().find(([x]) => x < k), b = known.find(([x]) => x > k);
        if (a && b) return a[1] + ((b[1] - a[1]) * (k - a[0])) / (b[0] - a[0]); return a ? a[1] + 0.25 * (k - a[0]) : Math.max(0, b[1] - 0.25 * (b[0] - k)); });
    };
    // words -> comparable tokens: numbers as digits, no punctuation, a few sound-alikes merged
    const NUM = { zero: 0, one: 1, two: 2, three: 3, four: 4, five: 5, six: 6, seven: 7, eight: 8, nine: 9, ten: 10, eleven: 11, twelve: 12, thirteen: 13, fourteen: 14, fifteen: 15, sixteen: 16, seventeen: 17, eighteen: 18, nineteen: 19, twenty: 20, thirty: 30, forty: 40, fifty: 50, sixty: 60, seventy: 70, eighty: 80, ninety: 90 };
    const SAME = { okay: 'ok', mum: 'mom', whether: 'weather', kurda: 'kurta', percent: '', per: '', cent: '' };
    const norm = (s) => {
      const w = s.toLowerCase().replace(/[%]/g, ' percent').replace(/[^a-z0-9' ]+/g, ' ').split(/\s+/).filter(Boolean).map((t) => SAME[t] ?? t).filter(Boolean);
      const outW = []; let acc2 = null;
      for (const t of w) {
        if (t in NUM) { acc2 = (acc2 || 0) + NUM[t]; continue; }
        if (t === 'hundred' && acc2 !== null) { acc2 *= 100; continue; }
        if (t === 'thousand' && acc2 !== null) { acc2 *= 1000; continue; }
        if (acc2 !== null) { outW.push(String(acc2)); acc2 = null; }
        outW.push(t.replace(/'/g, ''));
      }
      if (acc2 !== null) outW.push(String(acc2));
      return outW;
    };
    for (const L of lines) {
      const m = Math.floor(L.y.length / 3), z = new Float32Array(m + 8000);
      for (let k = 0; k < m; k++) z[k + 4000] = L.y[k * 3]; // 48k -> 16k with a little silence around it
      const o = await asr(z, { return_timestamps: 'word' }), text = o.text.trim();
      const sayWords = L.say.split(/\s+/).filter(Boolean), ts = o.chunks?.length ? align(sayWords, o.chunks) : null;
      if (ts) res[L.key].words = ts.map((v, k) => ({ t: +Math.max(0, v - 0.25).toFixed(3), text: sayWords[k] })); // 0.25 s of silence was added in front
      const e = lev(norm(L.say), norm(text)); heard[L.key] = { say: L.say, heard: text, error: +e.toFixed(2) };
      if (e > 0.2) bad.push(`beat ${L.i} "${L.say}" was heard as "${text}"`);
    }
  }
  fs.writeFileSync(path.join(out, 'heard.json'), JSON.stringify(heard, null, 1));
  fs.writeFileSync(path.join(out, 'voice.json'), JSON.stringify(res)); // now with word timings
  if (bad.length) console.log('CHECK THESE WORDS: ' + bad.join(' | ')); else console.log('voice check: every line heard right');
}
