// Uploads every recording in assets/audio to the Cloudflare R2 bucket the app streams from.
//
//   npx wrangler login                      (once; or set CLOUDFLARE_API_TOKEN)
//   node scripts/upload-audio-r2.mjs        (creates the bucket if needed, uploads what is missing)
//   node scripts/upload-audio-r2.mjs --force    (upload everything again)
//
// Then put the bucket's public address in EXPO_PUBLIC_AUDIO_BASE_URL (see .env.example).
import { spawnSync } from 'node:child_process';
import { readdirSync, statSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const BUCKET = process.env.R2_BUCKET ?? 'coptic-psalmody-audio';
const DIR = join(dirname(fileURLToPath(import.meta.url)), '..', 'assets', 'audio');
const force = process.argv.includes('--force');
const types = { '.mp3': 'audio/mpeg', '.m4a': 'audio/mp4' };

const wrangler = (args, { quiet = false } = {}) => {
  const r = spawnSync('npx', ['wrangler', ...args], { shell: true, encoding: 'utf8' });
  if (!quiet && r.status !== 0) console.error(r.stdout, r.stderr);
  return r;
};

// 1. The bucket (an existing one is fine)
const created = wrangler(['r2', 'bucket', 'create', BUCKET], { quiet: true });
const text = `${created.stdout}${created.stderr}`;
if (created.status !== 0 && !/already exists|10004/i.test(text)) {
  console.error(text);
  console.error('Could not create the bucket. Are you logged in? Run: npx wrangler login');
  process.exit(1);
}
console.log(created.status === 0 ? `Created bucket ${BUCKET}` : `Bucket ${BUCKET} already exists`);

// 2. The recordings
const files = readdirSync(DIR).filter((f) => types[f.slice(f.lastIndexOf('.')).toLowerCase()]);
let done = 0;
let failed = [];
for (const file of files) {
  const ext = file.slice(file.lastIndexOf('.')).toLowerCase();
  const key = `${BUCKET}/${file}`;
  if (!force) {
    // Skip files already in the bucket (get prints the object; a missing one fails)
    const head = wrangler(['r2', 'object', 'get', key, '--remote', '--file', process.platform === 'win32' ? 'NUL' : '/dev/null'], { quiet: true });
    if (head.status === 0) {
      done++;
      continue;
    }
  }
  const r = wrangler(['r2', 'object', 'put', key, '--file', join(DIR, file), '--content-type', types[ext], '--cache-control', '"public, max-age=31536000, immutable"', '--remote'], { quiet: true });
  if (r.status === 0) {
    done++;
    console.log(`[${done}/${files.length}] ${file} (${Math.round(statSync(join(DIR, file)).size / 1024)} KB)`);
  } else {
    failed.push(file);
    console.error(`FAILED ${file}\n${r.stderr}`);
  }
}
console.log(`\n${done}/${files.length} recordings in ${BUCKET}${failed.length ? `, ${failed.length} failed: ${failed.join(', ')}` : ''}`);
console.log('\nNext: enable public access (Cloudflare dashboard > R2 > the bucket > Settings > Public access, or');
console.log(`  npx wrangler r2 bucket dev-url enable ${BUCKET}`);
console.log('), then set EXPO_PUBLIC_AUDIO_BASE_URL to that address, with no trailing slash.');
process.exit(failed.length ? 1 : 0);
