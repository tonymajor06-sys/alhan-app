import type * as SpeechModule from 'expo-speech';

// Says Arabic aloud with the phone's own Arabic voice (Learn Arabic's letters, syllables and words); a little slower
// than normal so a beginner can follow. On an iPhone in silent mode nothing is heard (expo-speech's note).
// Loaded when first used, and only if this build of the app has it (one made before 2026-11-12 doesn't): then there is
// no sound rather than a crash.
let speech: typeof SpeechModule | null | undefined;

export function speakArabic(text: string) {
  if (speech === undefined) {
    try {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      speech = require('expo-speech') as typeof SpeechModule;
    } catch {
      speech = null;
    }
  }
  if (!speech) return;
  speech.stop();
  speech.speak(text, { language: 'ar', rate: 0.8 });
}
