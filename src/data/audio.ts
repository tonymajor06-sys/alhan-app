// Where the recordings are hosted online, e.g. 'https://example.com/alhan-audio' (no trailing slash).
// While this is empty, recordings only play from the copies bundled in the app below.
export const AUDIO_BASE_URL = '';

// Recordings shipped inside the app, so they play offline with no download.
// Once a file is uploaded to AUDIO_BASE_URL, its line can be removed here to make the app smaller:
// it will then stream, or play from the copy the user downloaded.
export const bundledAudio: Record<string, number> = {
  'doxology-conclusion-coptic.m4a': require('../../assets/audio/doxology-conclusion-coptic.m4a'),
  'doxology-virgin-mary.m4a': require('../../assets/audio/doxology-virgin-mary.m4a'),
  'introduction-to-doxologies-coptic.m4a': require('../../assets/audio/introduction-to-doxologies-coptic.m4a'),
  'midnight-arihoo-chasf.mp3': require('../../assets/audio/midnight-arihoo-chasf.mp3'),
  'midnight-aripsalin.mp3': require('../../assets/audio/midnight-aripsalin.mp3'),
  'midnight-doxology-virgin-mary.m4a': require('../../assets/audio/midnight-doxology-virgin-mary.m4a'),
  'midnight-esmou-epchois-melismatic.mp3': require('../../assets/audio/midnight-esmou-epchois-melismatic.mp3'),
  'midnight-first-canticle-lobsh.mp3': require('../../assets/audio/midnight-first-canticle-lobsh.mp3'),
  'midnight-first-canticle.mp3': require('../../assets/audio/midnight-first-canticle.mp3'),
  'midnight-fourth-canticle.mp3': require('../../assets/audio/midnight-fourth-canticle.mp3'),
  'midnight-second-canticle-lobsh.mp3': require('../../assets/audio/midnight-second-canticle-lobsh.mp3'),
  'midnight-second-canticle.mp3': require('../../assets/audio/midnight-second-canticle.mp3'),
  'midnight-sunday-theotokion-7.mp3': require('../../assets/audio/midnight-sunday-theotokion-7.mp3'),
  'midnight-third-canticle.mp3': require('../../assets/audio/midnight-third-canticle.mp3'),
  'psalm-150-arabic.m4a': require('../../assets/audio/psalm-150-arabic.m4a'),
  'psalm-150-coptic.mp3': require('../../assets/audio/psalm-150-coptic.mp3'),
  'psalm-150-english.mp3': require('../../assets/audio/psalm-150-english.mp3'),
  'psalm-trailer-pope-bishop-liturgy.mp3': require('../../assets/audio/psalm-trailer-pope-bishop-liturgy.mp3'),
  'verse-of-the-cymbals-annual.mp3': require('../../assets/audio/verse-of-the-cymbals-annual.mp3'),
};

export const remoteAudioUrl = (file: string): string | null =>
  AUDIO_BASE_URL ? `${AUDIO_BASE_URL}/${encodeURIComponent(file)}` : null;
