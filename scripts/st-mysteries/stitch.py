# Joins the pages axpages saved into the whole text (rows separated by =====, as st-wording's captures):
#   python3 -I scripts/st-mysteries/stitch.py <pages.jsonl> <out.txt>
import json, sys, difflib
# (the window's title, "Spirit & Truth", ends every page)
pages = [[r for r in json.loads(l) if r.strip() not in ('Spirit & Truth', '')] for l in open(sys.argv[1], encoding='utf8') if l.strip()]
out = list(pages[0])
for n, page in enumerate(pages[1:], 1):
    start = max(0, len(out) - len(page) - 200)
    window = out[start:]
    m = difflib.SequenceMatcher(None, window, page, autojunk=False).find_longest_match(0, len(window), 0, len(page))
    if m.size < 6:
        sys.exit(f'page {n}: no overlap with what came before')
    end = start + m.a + m.size
    if end < len(out):
        # the page's rows run out before ours: only its rows after ours are new
        rest = len(out) - end
        if out[end:] != page[m.b + m.size:m.b + m.size + rest]:
            sys.exit(f'page {n}: rows differ after the overlap')
        out += page[m.b + m.size + rest:]
    else:
        out += page[m.b + m.size:]
open(sys.argv[2], 'w', encoding='utf8').write('\n=====\n'.join(out))
print(f'{len(pages)} pages, {len(out)} rows, {len(set(out))} different')
