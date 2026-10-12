// Where the recordings are hosted online (no trailing slash): the public address of the Cloudflare R2 bucket
// "coptic-psalmody-audio", which holds the files from assets/audio (same file names, no sub-folders).
// A recording streams from here, or plays from the copy the user downloaded, so new ones must be uploaded to the bucket.
// Set EXPO_PUBLIC_AUDIO_BASE_URL (see .env.example) to the bucket's public address or custom domain. Until it is set
// (the bucket is not live yet), recordings keep streaming from the assets/audio folder of the GitHub repo.
const GITHUB_AUDIO_URL = 'https://raw.githubusercontent.com/tonymajor06-sys/alhan-app/main/assets/audio';
export const AUDIO_BASE_URL = (process.env.EXPO_PUBLIC_AUDIO_BASE_URL || GITHUB_AUDIO_URL).replace(/\/+$/, '');

// Recordings shipped inside the app, so they play offline with no download.
// Kept empty so the app stays small: every recording is online. Add a line here only for one that must
// play with no internet before it is downloaded.
export const bundledAudio: Record<string, number> = {};

export const remoteAudioUrl = (file: string): string | null =>
  AUDIO_BASE_URL ? `${AUDIO_BASE_URL}/${encodeURIComponent(file)}` : null;
