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
  'midnight-arihoo-chasf.m4a': require('../../assets/audio/midnight-arihoo-chasf.m4a'),
  'midnight-aripsalin.m4a': require('../../assets/audio/midnight-aripsalin.m4a'),
  'midnight-doxology-virgin-mary.m4a': require('../../assets/audio/midnight-doxology-virgin-mary.m4a'),
  'psalm-trailer-annual.m4a': require('../../assets/audio/psalm-trailer-annual.m4a'),
  'gospel-response-annual.m4a': require('../../assets/audio/gospel-response-annual.m4a'),
  'vespers-doxology-virgin-mary.m4a': require('../../assets/audio/vespers-doxology-virgin-mary.m4a'),
  'liturgy-hymn-of-blessing.m4a': require('../../assets/audio/liturgy-hymn-of-blessing.m4a'),
  'midnight-doxology-heavenly-beings.m4a': require('../../assets/audio/midnight-doxology-heavenly-beings.m4a'),
  'midnight-doxology-st-mark.m4a': require('../../assets/audio/midnight-doxology-st-mark.m4a'),
  'midnight-doxology-philopater-mercurius.m4a': require('../../assets/audio/midnight-doxology-philopater-mercurius.m4a'),
  'midnight-doxology-st-mena.m4a': require('../../assets/audio/midnight-doxology-st-mena.m4a'),
  'midnight-doxology-conclusion.m4a': require('../../assets/audio/midnight-doxology-conclusion.m4a'),
  'midnight-esmou-epchois-melismatic.m4a': require('../../assets/audio/midnight-esmou-epchois-melismatic.m4a'),
  'midnight-first-canticle-lobsh.m4a': require('../../assets/audio/midnight-first-canticle-lobsh.m4a'),
  'midnight-first-canticle.m4a': require('../../assets/audio/midnight-first-canticle.m4a'),
  'midnight-fourth-canticle.m4a': require('../../assets/audio/midnight-fourth-canticle.m4a'),
  'midnight-second-canticle-lobsh.m4a': require('../../assets/audio/midnight-second-canticle-lobsh.m4a'),
  'midnight-second-canticle.m4a': require('../../assets/audio/midnight-second-canticle.m4a'),
  'midnight-saturday-theotokion-1.m4a': require('../../assets/audio/midnight-saturday-theotokion-1.m4a'),
  'midnight-saturday-theotokion-2.m4a': require('../../assets/audio/midnight-saturday-theotokion-2.m4a'),
  'midnight-saturday-theotokion-3.m4a': require('../../assets/audio/midnight-saturday-theotokion-3.m4a'),
  'midnight-saturday-theotokion-4.m4a': require('../../assets/audio/midnight-saturday-theotokion-4.m4a'),
  'midnight-saturday-theotokion-5.m4a': require('../../assets/audio/midnight-saturday-theotokion-5.m4a'),
  'midnight-saturday-theotokion-6.m4a': require('../../assets/audio/midnight-saturday-theotokion-6.m4a'),
  'midnight-saturday-theotokion-7.m4a': require('../../assets/audio/midnight-saturday-theotokion-7.m4a'),
  'midnight-saturday-theotokion-8.m4a': require('../../assets/audio/midnight-saturday-theotokion-8.m4a'),
  'midnight-saturday-theotokion-9.m4a': require('../../assets/audio/midnight-saturday-theotokion-9.m4a'),
  'midnight-saturday-watos-psali-conclusion.m4a': require('../../assets/audio/midnight-saturday-watos-psali-conclusion.m4a'),
  'midnight-sunday-theotokion-8.m4a': require('../../assets/audio/midnight-sunday-theotokion-8.m4a'),
  'midnight-sunday-theotokion-7.m4a': require('../../assets/audio/midnight-sunday-theotokion-7.m4a'),
  'midnight-third-canticle.m4a': require('../../assets/audio/midnight-third-canticle.m4a'),
  'psalm-150-arabic.m4a': require('../../assets/audio/psalm-150-arabic.m4a'),
  'psalm-150-coptic.m4a': require('../../assets/audio/psalm-150-coptic.m4a'),
  'psalm-150-english.m4a': require('../../assets/audio/psalm-150-english.m4a'),
  'psalm-trailer-pope-bishop-liturgy.m4a': require('../../assets/audio/psalm-trailer-pope-bishop-liturgy.m4a'),
  'verse-of-the-cymbals-annual.m4a': require('../../assets/audio/verse-of-the-cymbals-annual.m4a'),
};

export const remoteAudioUrl = (file: string): string | null =>
  AUDIO_BASE_URL ? `${AUDIO_BASE_URL}/${encodeURIComponent(file)}` : null;
