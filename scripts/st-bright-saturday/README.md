# Bright Saturday in Spirit & Truth's order

Holy Week > Bright Saturday holds the whole day as Spirit & Truth has it (the owner asked on 2026-11-12: "ur missing
so much in bright saturday like the midnight praises"): Midnight Praises of Bright Saturday, the Offering of Morning
Incense, the Offering of the Lamb, the Liturgy of the Word, St Basil's and St Gregory's Liturgies and the Distribution,
each under its heading. `src/data/st-bright-saturday.ts` holds the order (`st-full-seasons.ts` lists it with the other
days) and `hymns-build.ts` puts it in.

As for the other feasts (`scripts/st-three-feasts`): each of Spirit & Truth's hymns is matched to the app's hymn with
most of its Coptic verses. Bright Saturday's own hymns keep their place, ids and recordings (Psalm 151 and the Second
Canticle's Lobsh, Arsani's, now open Midnight Praises, so Holy Week's "Apocalypse Night: Praises and Matins" is gone);
Annual's and the other seasons' are copied in (another season's only when it is the same hymn, not with its own
season's verses). The hymns the app lacked are written in from Spirit & Truth's words, and so are the Prophets'
Praises, which had no Coptic. The litanies, readings and the priest's prayers are left out, as for the other feasts,
and so are Midnight Praises' Bible readings (the Prophets' Praises, the Praises of the Virgin, Zacharias and Simeon, the
Story of Susanna: `READINGS` in `build.py`), left out at the owner's request on 2026-11-13 ("i only want the hymns"). The
Hours and the Book of Revelation (psalms and readings) are left out too; the Apocalypse's hymns are in Holy Week's
Apocalypse Night: Revelation.

By hand, in `build.py` (`OVERRIDES`): Psalm 151 is Arsani's (its words, in `alhan-seasons.ts`, are now Spirit &
Truth's whole psalm; the app had only the first verses); the Standard Watos Aspasmos is Annual's, with the air and the
fruits (Bright Saturday is in Baramouda; Spirit & Truth gave the seeds' verse of the day it was opened on).

The Arabic in English letters of the hymns written in comes from the same Arabic elsewhere in the app or from
`arabic-english.json` (written for the app, ج as g; it also keeps the Prophets' Praises' own from before). The build
lists any still missing in `to-write.json`.

## Rebuilding

1. Read Spirit & Truth's window as in `scripts/st-wording` (its book files are encrypted, don't decrypt them; the
   captures stay out of git). Open Bright Saturday's day, and for each service swipe left for the side panel, open
   the service and tap its Top, then check the first row is the service's name before reading:
   `./ax captures/st-bright-saturday/bright-<service>.txt 3000` for `midnight`, `morning-incense`, `lamb`, `word`,
   `basil`, `gregory`, `dist`. The reader stops after 12 pages with nothing new, so where a service repeats its
   litanies near the end, read the rest from there into `bright-morning-incense-end.txt` (with the limit raised).
   Midnight Praises also with `scripts/st-mysteries/axpages` and `stitch.py` into `bright-midnight-full.txt`, which
   keeps repeated rows ("Reader:", "Praise be to God forever. Amen.").
2. `npx tsx scripts/st-bright-saturday/dump.mjs /tmp/bs.json`
3. `python3 -I scripts/st-bright-saturday/build.py /tmp/bs.json captures/st-bright-saturday` writes
   `src/data/st-bright-saturday.ts`. The hymns it writes from Spirit & Truth are listed in `stBrightSaturdayWritten`
   and written again each time; running it twice gives the same file.
