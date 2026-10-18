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
- **English Coptic** follows the owner's alphabet chart: ⲃ = v before a vowel, b otherwise; ⲏ ē, ⲱ ō, ⲭ/ϧ kh, ϭ tsh, ϫ j before e-sound vowels (ⲉ, ⲏ, ⲓ, ⲩ) and g otherwise (as in "Gōr evol ennigaji"), ϯ ti; a jinkim adds "e" before its letter; abbreviations are written out (Ⲡ̅ⲟ̅ⲥ̅ Eptshois, Ⲫϯ Efnouti). Exception: Ⲭⲉⲣⲉ is always "Shere". See `src/data/english-coptic.ts`.
- **Arabic in English letters:** write ج as "g" (Egyptian Coptic pronunciation), never "j".
- **Permissions already granted** (don't raise them again): Archdeacon Arsani Sidarous's recordings (KlickAud, alhan.org, his YouTube playlist), every track in the SoundCloud playlist "Archie Arsani Sidarous", and the texts of the Spirit & Truth app (its creator approved). Keep Spirit & Truth source captures out of git.
- **Audio** lives in `assets/audio` and is mirrored to Cloudflare R2 with `node scripts/upload-audio-r2.mjs`; upload new files after adding them.
- **No ads** for now (removed 2026-10-13; the old setup is in commit aae287c). Donations go through the box in `src/components/donation-box.tsx` (links in `src/constants/donate.ts`). Never call donations tax-deductible.
- **Website:** https://copticpsalmody.com is a Cloudflare Worker. Publish with `rm -rf dist && npx expo export -p web && npx wrangler deploy`.

## Open work (left by Claude Code, 2026-10-18)

- **Vesper Praises**: every season now has Spirit & Truth's Vesper Praises (`src/data/st-vesper-praises.ts`, built into `hymns.ts`). Ten new hymns still need "Arabic in English letters" (an `englishArabic` version, paragraph for paragraph with the Arabic): the nine "Melody for the Saturday Theotokia by Bishop Youannis" passages (`vp-melody-for-the-saturday-theotokia-by-bishop-youannis-*`) and `vp-adam-nativity-psali-on-sunday-theotokia`.
- **Liturgy order**: many seasons' Liturgy lists are out of order. Each season's own hymns sit at the top of "Liturgy of the Word" ahead of the Golden Censer and Hitens (they belong after them, by the Praxis, Psalm and Gospel), and the "Liturgy of the Faithful" heading comes before the Gospel Response, which belongs to the Liturgy of the Word. In Annual, "One is the Holy Father" and the Introduction to the Fraction come before "Your Death, O Lord", "May Their Holy Blessings" and "According to Your Mercy". The order to follow is: Your Death → May Their Holy Blessings → According to Your Mercy → Introduction to the Fraction → One is the Holy Father. Source orders are in `src/data/st-full-seasons.ts`.
- **AI help**: not started. The plan is an "Ask" screen that calls a Cloudflare Worker route (the website already runs on one), which calls the Claude API with the key kept as a Worker secret, never in the app.
