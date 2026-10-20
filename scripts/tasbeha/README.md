# Coptic in English letters from tasbeha.org

Every hymn's "Coptic (English letters)" is written as tasbeha.org writes it (St Mark Coptic Orthodox Church,
Jersey City). Its hymn library shows each Coptic word with its English-letters spelling under it, so the app keeps a
word list: `src/data/tasbeha-words.ts` holds the words whose spelling differs from the rules in
`src/data/tasbeha-coptic.ts`, which write any other word in Tasbeha's style.

To rebuild the word list (the downloaded pages stay out of git):

1. `python3 -I scripts/tasbeha/crawl.py urls.txt pages/` with the `https://tasbeha.org/hymn/<n>` addresses from
   https://tasbeha.org/sitemap.xml in `urls.txt` (slow on purpose: three at a time with a pause).
2. `python3 -I scripts/tasbeha/parse.py pages/ tasbeha.json` reads the word pairs.
3. `python3 -I scripts/tasbeha/build_dict.py tasbeha.json dict.json` keeps each word's most common spelling.
4. Run a small Jest test that writes `src/data/tasbeha-words.ts`: for each word in `dict.json`, keep it when
   `tasbehaByRules(word)` differs from Tasbeha's spelling (and the same for the app's words marked with other jinkims).
