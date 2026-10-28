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
- **Arabic in English letters:** write ج as "g" (Egyptian Coptic pronunciation), never "j".
- **Permissions already granted** (don't raise them again): Archdeacon Arsani Sidarous's recordings (KlickAud, alhan.org, his YouTube playlist), every track in the SoundCloud playlist "Archie Arsani Sidarous", and the texts of the Spirit & Truth app (its creator approved). Keep Spirit & Truth source captures out of git.
- **Audio** lives in `assets/audio` and is mirrored to Cloudflare R2 with `node scripts/upload-audio-r2.mjs`; upload new files after adding them, and run `node scripts/audio-waveforms.mjs` so the player can draw their waveforms.
- **No ads** for now (removed 2026-10-13; the old setup is in commit aae287c). Donations go through the box in `src/components/donation-box.tsx` (links in `src/constants/donate.ts`). Never call donations tax-deductible.
- **Website:** https://copticpsalmody.com is a Cloudflare Worker. Publish with `rm -rf dist && npx expo export -p web && npx wrangler deploy`.

## Open work (left by Claude Code, 2026-10-18)

- **Vesper Praises**: done. Every season has Spirit & Truth's Vesper Praises (`src/data/st-vesper-praises.ts`, built into `hymns.ts`), with Arabic in English letters for every new hymn.
- **Liturgy order**: many seasons' Liturgy lists are out of order. Each season's own hymns sit at the top of "Liturgy of the Word" ahead of the Golden Censer and Hitens (they belong after them, by the Praxis, Psalm and Gospel), and the "Liturgy of the Faithful" heading comes before the Gospel Response, which belongs to the Liturgy of the Word. Source orders are in `src/data/st-full-seasons.ts`.
- **Three liturgies (Annual)**: done (2026-10-19). Annual's Liturgy of the Faithful is split into St Basil, St Gregory and St Cyril, each in the order of its Spirit & Truth book: three services in Deacon Responses > Annual (and Festival Special), and three groups in Annual > Liturgy. The orders and the responses that were missing are in `src/data/st-liturgies.ts`. St Basil keeps the original ids; the others are "@" copies.
- **AI help**: removed (2026-10-28) at the owner's request: the Ask screen, the floating bubble, `ai-service.ts`, `/api/ask` and the Worker's AI binding are gone. Do not add AI back, and never a paid provider.
