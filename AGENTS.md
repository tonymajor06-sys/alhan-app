This is an Expo/React Native mobile application. Prioritize mobile-first patterns, performance, and cross-platform compatibility.

## Expo has changed — do not trust your training data

Expo ships breaking changes every SDK release. APIs you remember are likely renamed, moved, or removed. Before writing any code that touches an Expo, EAS, or React Native API:

1. Read the major version of the `expo` package in `package.json`.
2. Fetch the matching versioned docs: `https://docs.expo.dev/versions/v<major>.0.0/`
3. For anything else, fetch https://docs.expo.dev/llms.txt — an index of all Expo docs with corrections to common LLM misconceptions. Follow its links to the specific page you need; never answer from memory.

## Commands

Use `bunx` instead of `npx` if the project uses bun (`bun.lock` present).

```bash
npx expo install <package>  # ALWAYS use instead of npm/yarn/pnpm/bun add — resolves SDK-compatible versions
npx expo start              # start the dev server
npx expo lint               # lint
npx tsc --noEmit            # typecheck
npx expo-doctor             # diagnose dependency and config issues
npx expo install --fix      # fix incompatible package versions
```

Run lint and typecheck before declaring any task done.

## Navigation & Routing

- Use **Expo Router** for all navigation. Routes live in `src/app/` — every file there is a screen, `_layout.tsx` files define navigators. Keep non-route code (components, hooks, utils) outside `src/app/`.
- Import `Link`, `router`, and `useLocalSearchParams` from `expo-router`.
- Docs: https://docs.expo.dev/router/introduction.md

## Building with EAS

Use EAS to build, sign, and submit the app in the cloud (`eas build`, `eas submit`) and to ship over-the-air updates (`eas update`) — no local Xcode or Android Studio required. Run EAS CLI as `bunx eas-cli <command>` in Bun projects, or `npx eas-cli@latest <command>` otherwise; substitute that for bare `eas` in docs examples.
Docs: https://docs.expo.dev/eas/index.md

## Rules

- If `ios/` and `android/` directories do not exist, they are generated (Continuous Native Generation). Never create or edit them by hand — configure native behavior in `app.json` and config plugins.
- Expo Go only includes its bundled native modules. After adding a library with native code, the app needs a development build: `npx expo run:ios|android` locally, or `eas build --profile development`.
- Prefer recommended Expo modules over third-party libraries, and check your available skills before adding dependencies. Docs: https://docs.expo.dev/versions/latest/index.md

## Project notes (shared by every AI assistant working on this repo)

Several assistants (Claude Code, Antigravity) work in this repo. Commit finished work in small commits so the others see a clean state, and don't edit the same files at the same time.

- **Transliterations:** if a hymn comes without "Coptic in English letters" or "Arabic in English letters", write it yourself and say which parts you wrote.
- **English Coptic** in hymns is tasbeha.org's (since 2026-10-20): every hymn's Coptic in English letters is rebuilt from its Coptic with Tasbeha's spelling of each word (`src/data/tasbeha-words.ts`) and, for words Tasbeha lacks, rules in its style (ⲏ ee, ⲱ o, ⲟⲩ before a vowel ow, Ⲫϯ Efnoti, ⲡ̀ϭⲟⲓⲥ Epshois); see `src/data/tasbeha-coptic.ts` and `scripts/tasbeha/`. Learn Coptic still teaches the owner's alphabet chart (`src/data/english-coptic.ts`).
- **Arabic Coptic** in hymns is the Orsozoxi app's (since 2026-10-20): every hymn's Coptic in Arabic letters uses Orsozoxi's spelling of each word (`src/data/orsozoxi-words.ts`, from its Annual and Kiahk Psalmody) and, for words it lacks, rules in its style (no short-vowel marks, ⲡ ب, ⲃ ف, final ⲓ/ⲏ ى, Ⲡϭⲟⲓⲥ إبتشويس, a new word at each inner أ/إ/آ: إم إبتشويس); see `src/data/arabic-coptic.ts` and `scripts/orsozoxi/`. Orsozoxi's files are encrypted: read its texts from its window, never decrypt them.
- **Saint lists** (Hymns > Other: Veneration, Other Doxologies and the rest, 2026-11-02): `src/data/st-saints.ts`, written by `scripts/st-saints/build.py` from Spirit & Truth captures in `captures/st-saints` (read with every box in its Saint Selection ticked; screen in `src/components/saint-tab.tsx`). Their Arabic in English letters was written for the app (`scripts/st-saints/arabic-english.json`).
- **Deacon's Guide** follows Archdeacon Arsani Sidarous's instructions, which the owner forwards over time (candles 2026-11-03, blessing the tonia 2026-11-07). Fold each new message into `src/data/deacon-guide.ts` (with Arabic and quiz questions) and replace anything that disagrees with him. Summarize each message into a quick read (short cards, bullets): the guide will grow long. No "From the teaching of" label in the app (removed 2026-11-07 at the owner's request).
- **Theology School** (Our Faith, 2026-11-03): 32 lessons, one a day with a quiz, in `src/data/theology-lessons-faith.ts` and `theology-lessons-history.ts` (the daily logic is in `theology-school.ts`, progress in `src/hooks/use-school-progress.ts`). Sources are listed at the top of each file; the Synaxarium wins on dates and counts (e.g. St Athanasius's five exiles). Months use the app's spellings (Tout, Baramoudah, Misra).
- **Kids mode** (Settings, 2026-11-12, setting `kidMode`): Home shows a Kids Corner button and only Hymns, Saints, Learn Coptic and Playlists; Settings hides the grown-up options, donations and Instagram. Kids Corner (`/kids`, also listed in Our Faith) is 16 short Bible and faith stories with a three-question quiz and a star each (`src/data/kids-lessons.ts`, progress in `src/hooks/use-kids-progress.ts`). Hold its facts to the same Coptic Orthodox standard as the Theology School: nothing guessed.
- **Coptic Translator** (Learn Coptic, 2026-11-03): a dictionary, not a sentence translator. It uses every lesson word plus `src/data/coptic-dictionary.ts` (hymn words checked against the Comprehensive Coptic Lexicon and the app's own verse translations), and breaks words into prefixes and suffixes with the rules in `coptic-translator.ts`. Add new words there, never guessed meanings. Made smarter 2026-11-04, still without AI: other spellings (ⲫⲛⲟⲩⲧⲓ, ⲁⲅⲁⲡⲓ) find the dictionary word, a word a letter off is only offered ("Did you mean"), Coptic in English letters is matched by sound against every hymn word, sentences get a word-for-word line and the closest hymn verse, and English/Arabic plurals, endings and typos are understood.
- **Deacon's Guide psalms** (2026-11-04): Psalms for Serving shows every psalm whole (`src/data/serving-psalms.ts`: NKJV English with its notice, Van Dyck Arabic, Agpeya numbering). Where to Stand, What to Bring and When to Take the Incense were removed at the owner's request; a deacon never touches the holy vessels.
- **Follow along** (2026-11-04): a switch in the hymn reader (setting `followAlong`) opens the hymn out into its whole service on one page as in Spirit & Truth (a Midnight/Vesper day's group, or tonight's order), languages side by side with Side by Side, a floating Contents to jump anywhere, tap a part to make it current, ▶ to play from it. Book contents in `src/data/service-book.ts`, view in `src/components/service-book.tsx`.
- **Spirit & Truth's wording** (2026-11-07): every hymn verse the app shares with Spirit & Truth says what it says, in English and Arabic (and its Coptic spelling), verse by verse in `src/data/st-wording.ts`, made by `scripts/st-wording/` from captures of its window (see the README there) and applied in `hymns-build.ts`. When a hymn's English or Arabic is changed by hand, check it against Spirit & Truth too.
- **3 Feasts Commemoration** (2026-11-08): the 29th of each Coptic month (not Tubah, Amshir, Jonah's Fast, Great Lent or Holy Week) is one of the Minor Feasts of the Lord, with its services in Spirit & Truth's order in `src/data/st-three-feasts.ts` (made by `scripts/st-three-feasts/`, see its README). Each Minor Feast opens on a page of its own (`/hymns/minor-feasts/feast/<feast>`, `src/data/season-feasts.ts`).
- **Learn Coptic follows the Coptic Teacher app** (2026-11-08, the owner's request; it is on the owner's Mac, read from its window): its greetings (Ⲛⲁⲛⲉ ⲧⲟⲟⲩⲓ, Ⲛⲟϥⲣⲓ ⲉ̀ϫⲱⲣϩ), "what is your name" (Ⲁϣ ⲡⲉ ⲡⲉⲕⲣⲁⲛ / ⲡⲉⲣⲁⲛ), numbers (ϥ̀ⲧⲟⲩ, ⲧ̀ⲓⲟⲩ), days of the week (ⲡⲓⲟⲩⲁⲓ...) and letter rules (ⲅ is n before ⲅ ⲕ ⲝ ⲭ, ⲇ th, ⲭ sh in Greek words before ⲉ ⲏ ⲓ). Ⲭⲉⲣⲉ is "hail", never "hello". The letter names stay the owner's chart's.
- **Phones, tablets, computers** (2026-11-08): iPad is supported (`supportsTablet`); pages are a readable column on wide screens (`scrollContent` in `alhan-ui.tsx`). On Android the app asks for no microphone and needs no touchscreen (`plugins/with-every-device.js`), so Google Play offers it to tablets and Chromebooks too.
- **Arabic in English letters:** write ج as "g" (Egyptian Coptic pronunciation), never "j".
- **Permissions already granted** (don't raise them again): Archdeacon Arsani Sidarous's recordings (KlickAud, alhan.org, his YouTube playlist), every track in the SoundCloud playlist "Archie Arsani Sidarous", and the texts of the Spirit & Truth app (its creator approved). Keep Spirit & Truth source captures out of git.
- **Hymns are built in `src/data/hymns-build.ts`** (since 2026-11-06): make every change to the hymns there (or in the files it builds from), never in `src/data/hymns.ts`, which only loads them. The phone app's release loads them already built, from `src/data/hymns-snapshot.generated.js`, which `metro.config.js` makes fresh before every release build (`scripts/hymns-snapshot.mjs`; not in git), so the app opens fast; while developing, and on the website, they are built as before. Coptic in English/Arabic letters and English in Arabic letters are written out only when a hymn is first read (`src/data/lazy-text.ts`): copy a hymn version with `copyVersion`, not `{ ...version }`, in code that runs over every hymn.
- **Player** (2026-11-10): phones play through react-native-nitro-player (`src/hooks/audio-engine.native.ts`), which keeps the queue natively so the lock screen, headphones and Android Auto move through it, and lists the user's playlists in Android Auto (`plugins/with-car-audio.js`, `src/components/car-library.ts`); the website (and a build missing it) uses expo-audio (`audio-engine-expo.ts`). The queue, shuffle and Night listening stay in `use-audio-queue.ts` for both. No Google Cast (patched out on iOS, its setup entry and Wi-Fi permissions removed on Android). CarPlay still needs Apple's CarPlay audio entitlement and Expo SDK 58's scenes.
- **Audio** lives in `assets/audio` and is mirrored to Cloudflare R2 with `node scripts/upload-audio-r2.mjs`; upload new files after adding them, and run `node scripts/audio-waveforms.mjs` so the player can draw their waveforms.
- **No ads** for now (removed 2026-10-13; the old setup is in commit aae287c). Donations go through the box in `src/components/donation-box.tsx` (links in `src/constants/donate.ts`). Never call donations tax-deductible.
- **Website:** https://copticpsalmody.com is a Cloudflare Worker. Publish with `rm -rf dist && NODE_OPTIONS='--require ./scripts/limit-open-files.cjs' npx expo export -p web && npx wrangler deploy` (the `&&` matters: without the script the export fails with EMFILE, leaving a partial dist).

## Releases: every other Friday (from 2026-11-13)

The app (iOS for now) and the website are updated together every other Friday: 2026-11-13, 11-27, 12-11, 12-25, 2027-01-08, and every 14 days after. Work in between is committed and pushed as usual; nothing goes to the stores or the website in between unless the owner asks (an urgent fix).

**Nothing is sent out without the owner's approval, on release Fridays too.** Prepare everything (steps 1 to 3 and the build), then show the owner what is in the release and ask. Only after the owner says yes: submit the build, publish the website, tag. Never use `--auto-submit`.

1. `git pull`, then `npx expo lint`, `npx tsc --noEmit` and `npx jest`; nothing goes out with a failure.
2. New recordings: `node scripts/upload-audio-r2.mjs`, then `node scripts/audio-waveforms.mjs` (waveforms and Night listening's loudness).
3. Raise `version` in `app.json` (1.2.0 with new features, 1.1.1 with only fixes); build numbers count up by themselves (EAS `autoIncrement`).
4. App (iPhone and iPad only for now): `npx eas-cli@latest build --platform ios --profile production` (builds only). Then show the owner the release notes and wait for approval; once approved, `npx eas-cli@latest submit --platform ios --latest` and send it for review in App Store Connect. After a native change (a new library, `app.json` plugins), make a `preview` build and try it on a phone first. Android is on hold (2026-11-10: the owner is still looking for help with it); don't build or submit Android until the owner says. When it starts, remember that Android Auto (`plugins/with-car-audio.js`) brings a manual Google review that holds every Android update until it passes.
5. Website, once the owner approves: the publish command under Website above.
6. Commit the version, tag it (`git tag v1.2.0`), and push with tags. The release notes are the commits since the last tag, written short for listeners.

## Open work (left by Claude Code, 2026-10-18)

- **Vesper Praises**: done. Every season has Spirit & Truth's Vesper Praises (`src/data/st-vesper-praises.ts`, built into `hymns-build.ts`), with Arabic in English letters for every new hymn.
- **Liturgy order**: done (2026-10-28). Every season's Liturgy of the Word runs Taishori/Tishori, Hitens, the Pauline Coptic Reading, the Praxis Response and the Praxis Coptic Reading, the Agios, then the rest, with the Psalm and Gospel Response last (moved up from under the Liturgy of the Faithful); the sort is at the end of `hymns-build.ts`. Seasonal Psalm 150 refrains, concluding-hymn prayers and the Theophany/Jonah doxologies are in `src/data/seasonal-texts.ts` (from tasbeha.org).
- **Three liturgies (Annual)**: done (2026-10-19). Annual's Liturgy of the Faithful is split into St Basil, St Gregory and St Cyril, each in the order of its Spirit & Truth book: three services in Deacon Responses > Annual (and Festival Special), and three groups in Annual > Liturgy. The orders and the responses that were missing are in `src/data/st-liturgies.ts`. St Basil keeps the original ids; the others are "@" copies.
- **AI help**: removed (2026-10-28) at the owner's request: the Ask screen, the floating bubble, `ai-service.ts`, `/api/ask` and the Worker's AI binding are gone. Do not add AI back, and never a paid provider.
