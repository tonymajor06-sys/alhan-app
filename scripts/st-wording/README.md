# Spirit & Truth's wording in every hymn

Every hymn verse the app shares with Spirit & Truth says what Spirit & Truth says (the owner asked for this on
2026-11-07, after finding mistakes): the verse's Coptic is looked up in Spirit & Truth, and where the app's English or
Arabic says it in other words, Spirit & Truth's goes in its place. Where Spirit & Truth spells a Coptic word otherwise
(a letter or two), its spelling is used too. `src/data/st-wording.ts` holds the changes, verse by verse, and
`src/data/hymns-build.ts` applies them before the transliterations are written, so Coptic in English/Arabic letters and
English in Arabic letters follow.

Read so far (2026-11-08): the Psalmody and Divine Liturgy services of every feast and season in its day list (and
ordinary Sundays and weekdays), and every rite in the Holy Mysteries. The Holy Pascha book would not open in the Mac
app, so Holy Week hymns are compared only where the other books have them.

What is left alone:

- punctuation and capitals only, and Arabic marks (tashkeel) only;
- a word Spirit & Truth misspelt that the app has right (its word is rare in Spirit & Truth, the app's is common there:
  "Allelluia", "السلا");
- a number Spirit & Truth dropped, and words its window put in the next row (the end of a verse);
- abbreviations (Ⲡ⳪, Ⲫϯ, Ⲓⲏ̅ⲥ̅) and the words written out;
- a verse whose Coptic says other words than Spirit & Truth's (another day's text): only spelling is matched.

The Arabic in English letters of a changed Arabic verse is the app's own with the changed words written over, where
that can be done safely; the others are written for the app in `arabic-english.json` (Spirit & Truth's Arabic: its
English letters). The build lists any still missing in `to-write.json`.

## Rebuilding

Spirit & Truth's texts are read from its Mac window (macOS accessibility), as for the saints (`scripts/st-saints`);
its book files are encrypted, don't decrypt them. The captures stay out of git (`captures/`).

1. Compile the readers: `swiftc -O scripts/st-wording/ax.swift -o ax` and `swiftc -O scripts/st-wording/axp.swift -o axp`
   (allow the terminal under System Settings > Privacy & Security > Accessibility).
2. In Spirit & Truth pick a day (`./axp press "•"`, then `./axp press "Set Live"` or the day's name and
   `./axp scrollpress "Feast of Nativity /"`), open a book and a service (`./axp press "Midnight Praises"`), then
   `./ax captures/st-wording/<day>-<service>.txt 3000` reads the whole service, scrolling page by page.
   `./axp list` shows the buttons on the screen.
3. `npx tsx scripts/st-wording/dump.mjs hymns.json` saves the hymns as they are without these changes.
4. `python3 -I scripts/st-wording/build.py hymns.json captures/st-wording` writes `src/data/st-wording.ts`.
