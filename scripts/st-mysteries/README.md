# Spirit & Truth's Holy Mysteries: Holy Orders, Reception of a New Priest, Filling of the Cup

Hymns > Rites of Grace (2026-11-12) holds every rite of Spirit & Truth's Holy Mysteries book. Matrimony, Unction,
Consecrations, Prostration, Baptism, the Liturgy of the Waters and the Funeral came earlier (`src/data/st-mysteries.ts`,
also Deacon Responses > Special Holy Orders) and are copied into it; Holy Orders (the ordinations from chanter to
hegumen), the Reception of a New Priest and Filling of the Cup are read here into `src/data/st-rites.ts`.

## Reading a rite

The texts are read from Spirit & Truth's Mac window (macOS accessibility), as for the other captures; its book files
are encrypted, don't decrypt them. The captures stay out of git (`captures/`).

1. `swiftc -O scripts/st-mysteries/axpages.swift -o axpages` (allow the terminal under Accessibility).
2. In Spirit & Truth open The Holy Mysteries > Holy Orders (or Filling of the Cup) > the rite. Its text may show only
   after a click on the title at the top. To go back, swipe left (click and drag) for the bar: its list, Go back (to the
   top of the rite) and Home. Check the page is the one you meant before reading it.
3. `./axpages /tmp/<rite>.jsonl` saves every page from the top, then
   `python3 -I scripts/st-mysteries/stitch.py /tmp/<rite>.jsonl captures/st-mysteries/<rite>.txt` joins them.
   Unlike st-wording's `ax`, this keeps repeated rows (the second "People:" or "Amen."), so every verse keeps its speaker.

## Building

`npx tsx scripts/verse-lines/dump.mjs /tmp/hymns.json && python3 -I scripts/st-mysteries/build.py /tmp/hymns.json`

As in the other rites: the hymns and the people's and deacons' parts, in order; the bishop's and priest's prayers, the
readings and the litanies are left out. For Holy Orders, the Verses of the Cymbals sung at every ordination, then each
ordination's call (the archdeacon's) and the people's answers ("Axios"). Arabic in English letters comes from the
same Arabic elsewhere in the app, or from `arabic-english.json` (written for the app, ج as g); the build stops and lists
any missing in `to-write.json`.
