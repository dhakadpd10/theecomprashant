// node say.mjs <voice> <outdir> <lines.txt>  -> outdir/line01.wav ... + durations.json
import { KokoroTTS } from 'kokoro-js';
import fs from 'fs';
const [voice, outdir, file] = process.argv.slice(2);
fs.mkdirSync(outdir, { recursive: true });
const tts = await KokoroTTS.from_pretrained('onnx-community/Kokoro-82M-v1.0-ONNX', { dtype: 'q8', device: 'cpu' });
// allow voices outside the built-in list: name like hm_omega or hm_omega@b (b = British English pronunciation)
const ACC = {}; const _gen = tts.generate.bind(tts);
tts._validate_voice = (v) => ACC[v] || v.at(0);
tts.generate = (text, o) => { const [v, acc] = o.voice.split('@'); if (acc) ACC[v] = acc; else if (!'ab'.includes(v.at(0))) ACC[v] = 'a'; return _gen(text, { ...o, voice: v }); };
const lines = fs.readFileSync(file, 'utf8').split(/\r?\n/).filter(Boolean);
const dur = [];
for (let i = 0; i < lines.length; i++) {
  const m = lines[i].match(/^@(\w)\|(.*)$/); // per-line accent: "@b|text"
  const audio = await tts.generate(m ? m[2] : lines[i], { voice: m ? voice + '@' + m[1] : voice, speed: Number(process.env.SPEED || 1.08) });
  const f = `${outdir}/line${String(i + 1).padStart(2, '0')}.wav`;
  audio.save(f);
  dur.push({ i: i + 1, text: lines[i], sec: +(audio.audio.length / audio.sampling_rate).toFixed(3), sr: audio.sampling_rate });
  console.log(dur[i].sec, lines[i]);
}
fs.writeFileSync(`${outdir}/durations.json`, JSON.stringify(dur, null, 1));
