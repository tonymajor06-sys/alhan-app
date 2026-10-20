# Coptic in Arabic letters from the Orsozoxi app

Every hymn's "Coptic (Arabic letters)" is written as the Orsozoxi app writes it (the owner has permission to use its
texts). Orsozoxi shows each verse in Arabic, Coptic in Arabic letters, Coptic and English, so the app keeps a word
list: `src/data/orsozoxi-words.ts` holds the words whose spelling differs from the rules in `src/data/arabic-coptic.ts`,
which write any other word in Orsozoxi's style.

Orsozoxi's book files are encrypted, so its texts are read from its window on the Mac (macOS accessibility), as the
app shows them; don't try to decrypt the files. The captures stay out of git.

To rebuild the word list:

1. Open Orsozoxi (`/Applications/Runner.app`), go to المنجلية and open a book (الإبصلمودية السنوية, الإبصلمودية
   الكيهكية, الخولاجى المقدس), then a day. Allow the terminal under System Settings > Privacy & Security >
   Accessibility.
2. `zsh scripts/orsozoxi/book.sh captures/<book>` steps through every section in the book's section list and saves
   each one's verses (it brings Orsozoxi to the front and moves the pointer to scroll the list).
3. `python3 -I scripts/orsozoxi/parse.py verses.json captures/*/*.txt` reads the verses, turning Orsozoxi's Coptic
   font text into Unicode Coptic.
4. `python3 -I scripts/orsozoxi/align.py verses.json letters.json pairs.json` matches each Coptic letter with the
   Arabic Orsozoxi wrote for it, and each Coptic word with its Arabic spelling.
5. `node scripts/orsozoxi/build_words.mjs pairs.json` writes `src/data/orsozoxi-words.ts`: each word's commonest
   Orsozoxi spelling, where it differs from the rules.
