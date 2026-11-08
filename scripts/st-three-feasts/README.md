# The 3 Feasts Commemoration

The 29th of each Coptic month remembers the Annunciation, the Nativity and the Resurrection (not in Tubah and Amshir,
nor in Jonah's Fast, Great Lent or Holy Week; see `three-feasts` in `src/data/coptic-calendar.ts`). The owner asked for
it among the Minor Feasts of the Lord on 2026-11-08. `src/data/st-three-feasts.ts` holds its services in Spirit &
Truth's order, as `st-full-seasons.ts` does for the other Minor Feasts, and `hymns-build.ts` puts them in.

How it was made: Spirit & Truth's services for Babah 29, 1743 (Sunday 8 November 2026, its live day) were read from
its Mac window as in `scripts/st-wording` (captures in `captures/st-three-feasts`, kept out of git). Each of its hymns
is matched to the app's hymn with most of the same Coptic verses (a copy of it goes in the order). The litanies,
readings and the priest's prayers are left out, as for the other feasts. The one hymn the app lacked, the Adam Psali
for the Annunciation, is written in from Spirit & Truth's words, with Arabic in English letters written for the app in
`arabic-english.json`.

Sunday's Midnight Praises has the Sunday Theotokia; on other days Follow Along swaps in that day's Theotokia (the
feast's own hymns, the Psalis for the three feasts and the Hymn of the Resurrection, stay).

Rebuilding:

1. `npx tsx scripts/st-three-feasts/dump.mjs hymns.json` saves the hymns a feast's order can copy.
2. `python3 -I scripts/st-three-feasts/build.py hymns.json captures/st-three-feasts three-feasts-` writes
   `src/data/st-three-feasts.ts` (and says which hymns it wrote in, and any whose English letters are still to write).
