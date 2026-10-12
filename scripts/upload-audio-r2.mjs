// Uploads every recording in assets/audio to the Cloudflare R2 bucket the app streams from.
//
//   npx wrangler login                      (once; or set CLOUDFLARE_API_TOKEN)
//   node scripts/upload-audio-r2.mjs        (creates the bucket if needed, uploads what is missing)
//   node scripts/upload-audio-r2.mjs --force    (upload everything again, even files already there)
//
// Then put the bucket's public address in EXPO_PUBLIC_AUDIO_BASE_URL (see .env.example).
import { spawn, spawnSync } from 'node:child_process';
import { readdirSync, statSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const BUCKET = process.env.R2_BUCKET ?? 'coptic-psalmody-audio';
const DIR = join(dirname(fileURLToPath(import.meta.url)), '..', 'assets', 'audio');
const force = process.argv.includes('--force');
const PARALLEL = 6;
const types = { '.mp3': 'audio/mpeg', '.m4a': 'audio/mp4' };

const run = (args) =>
  new Promise((resolve) => {
    const p = spawn('npx', ['wrangler', ...args], { shell: true });
    let out = '';
    p.stdout.on('data', (d) => (out += d));
    p.stderr.on('data', (d) => (out += d));
    p.on('close', (status) => resolve({ status, out }));
  });

// 1. The bucket (an existing one is fine)
const created = spawnSync('npx', ['wrangler', 'r2', 'bucket', 'create', BUCKET], { shell: true, encoding: 'utf8' });
const text = `${created.stdout}${created.stderr}`;
const existed = created.status !== 0 && /already exists|10004/i.test(text);
if (created.status !== 0 && !existed) {
  console.error(text);
  console.error('Could not create the bucket. Are you logged in? Run: npx wrangler login');
  process.exit(1);
}
console.log(existed ? `Bucket ${BUCKET} already exists` : `Created bucket ${BUCKET}`);

// 2. The recordings, several at a time. A new bucket is empty, so only an existing one needs the "already there" check.
const files = readdirSync(DIR).filter((f) => types[f.slice(f.lastIndexOf('.')).toLowerCase()]);
let done = 0;
let skipped = 0;
const failed = [];
const queue = [...files];

async function worker() {
  while (queue.length) {
    const file = queue.shift();
    const ext = file.slice(file.lastIndexOf('.')).toLowerCase();
    const key = `${BUCKET}/${file}`;
    if (existed && !force) {
      const head = await run(['r2', 'object', 'get', key, '--remote', '--file', process.platform === 'win32' ? 'NUL' : '/dev/null']);
      if (head.status === 0) {
        skipped++;
        continue;
      }
    }
    const args = ['r2', 'object', 'put', key, '--file', join(DIR, file), '--content-type', types[ext], '--cache-control', '"public, max-age=31536000, immutable"', '--remote'];
    let r = await run(args);
    if (r.status !== 0) r = await run(args); // one retry
    if (r.status === 0) {
      done++;
      console.log(`[${done + skipped}/${files.length}] ${file} (${Math.round(statSync(join(DIR, file)).size / 1024)} KB)`);
    } else {
      failed.push(file);
      console.error(`FAILED ${file}\n${r.out.slice(-400)}`);
    }
  }
}
await Promise.all(Array.from({ length: PARALLEL }, worker));

console.log(`\n${done} uploaded, ${skipped} already there, ${failed.length} failed (of ${files.length}) in ${BUCKET}${failed.length ? `: ${failed.join(', ')}` : ''}`);
console.log('\nNext: enable public access (Cloudflare dashboard > R2 > the bucket > Settings > Public access, or');
console.log(`  npx wrangler r2 bucket dev-url enable ${BUCKET}`);
console.log('), then set EXPO_PUBLIC_AUDIO_BASE_URL to that address, with no trailing slash.');
process.exit(failed.length ? 1 : 0);
