// Draws the waveform of every recording in assets/audio, for the player's SoundCloud-style progress bar.
//
//   node scripts/audio-waveforms.mjs          (adds the recordings that have no waveform yet)
//   node scripts/audio-waveforms.mjs --force  (draws every one again)
//
// Uses macOS's afconvert to read the audio. Writes src/data/audio-waveforms.ts: each recording's loudness in
// BARS bars, one character per bar from "0" (silent) to "z" (loudest), scaled to the recording's loudest bar.
import { spawnSync } from 'node:child_process';
import { existsSync, mkdtempSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const DIR = join(ROOT, 'assets', 'audio');
const OUT = join(ROOT, 'src', 'data', 'audio-waveforms.ts');
const BARS = 64;
const LEVELS = '0123456789abcdefghijklmnopqrstuvwxyz';
const force = process.argv.includes('--force');

const existing = {};
if (!force && existsSync(OUT))
  for (const [, file, wave] of readFileSync(OUT, 'utf8').matchAll(/^ {2}("(?:[^"\\]|\\.)*"): '([0-9a-z]+)',$/gm))
    existing[JSON.parse(file)] = wave;

const tmp = mkdtempSync(join(tmpdir(), 'waveforms-'));
const waves = {};
let drawn = 0;
for (const file of readdirSync(DIR).filter((f) => /\.(m4a|mp3)$/i.test(f)).sort()) {
  if (existing[file]) {
    waves[file] = existing[file];
    continue;
  }
  // Mono at 2,000 samples a second is plenty for 64 bars
  const wav = join(tmp, 'a.wav');
  const r = spawnSync('afconvert', ['-f', 'WAVE', '-d', 'LEI16@2000', '-c', '1', join(DIR, file), wav]);
  if (r.status !== 0) {
    console.warn(`could not read ${file}`);
    continue;
  }
  const buf = readFileSync(wav);
  const data = buf.indexOf('data', 12);
  const samples = new Int16Array(buf.buffer, buf.byteOffset + data + 8, Math.floor((buf.length - data - 8) / 2));
  const per = Math.max(1, Math.floor(samples.length / BARS));
  // The loudness (RMS) of each bar
  const rms = Array.from({ length: BARS }, (_, b) => {
    let sum = 0;
    for (let i = b * per; i < Math.min(samples.length, (b + 1) * per); i++) sum += samples[i] * samples[i];
    return Math.sqrt(sum / per);
  });
  const max = Math.max(...rms) || 1;
  waves[file] = rms.map((v) => LEVELS[Math.round((v / max) * (LEVELS.length - 1))]).join('');
  drawn++;
}
rmSync(tmp, { recursive: true, force: true });

const lines = Object.entries(waves).map(([file, wave]) => `  ${JSON.stringify(file)}: '${wave}',`);
writeFileSync(
  OUT,
  `// Made by scripts/audio-waveforms.mjs: each recording's loudness in ${BARS} bars, "0" (silent) to "z" (loudest).\n` +
    `// Run it again after adding recordings.\nexport const audioWaveforms: Record<string, string> = {\n${lines.join('\n')}\n};\n`
);
console.log(`${drawn} drawn, ${Object.keys(waves).length} in all`);
