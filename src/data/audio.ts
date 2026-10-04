// Where the recordings are hosted online (no trailing slash): the assets/audio folder of the public GitHub repo.
// A recording streams from here, or plays from the copy the user downloaded, so new ones must be pushed to main.
export const AUDIO_BASE_URL = 'https://raw.githubusercontent.com/tonymajor06-sys/alhan-app/main/assets/audio';

// Recordings shipped inside the app, so they play offline with no download.
// Kept empty so the app stays small: every recording is online. Add a line here only for one that must
// play with no internet before it is downloaded.
export const bundledAudio: Record<string, number> = {};

export const remoteAudioUrl = (file: string): string | null =>
  AUDIO_BASE_URL ? `${AUDIO_BASE_URL}/${encodeURIComponent(file)}` : null;
