import sys, json, re, unicodedata
from collections import Counter, defaultdict
hymns = json.load(open(sys.argv[1], encoding='utf-8'))
COP = re.compile(r'[Ⲁ-⳿Ϣ-ϯ]')
def norm(w):
    w = unicodedata.normalize('NFC', w)
    w = w.replace('̀', '̀').replace('́', '̀').replace('`', '̀').replace('︦', '̅').replace('̄', '̅')
    w = re.sub(r'^[^\ẁ̅Ⲁ-⳿Ϣ-ϯ]+|[^\ẁ̅Ⲁ-⳿Ϣ-ϯ]+$', '', w)
    return w.lower()
def clean_t(t):
    return re.sub(r'^[^\w]+|[^\w]+$', '', t)
exact = defaultdict(Counter); loose = defaultdict(Counter)
bad = 0
for h in hymns.values():
    for line in h['lines']:
        for t, c in line:
            if ' ' in c.strip() or not COP.search(c): continue
            k = norm(c); tt = clean_t(t)
            if not k or not tt or COP.search(tt): bad += 1; continue
            exact[k][tt.lower()] += 1
            loose[k.replace('̀', '')][tt.lower()] += 1
pick = lambda d: {k: v.most_common(1)[0][0] for k, v in d.items()}
json.dump({'exact': pick(exact), 'loose': pick(loose)}, open(sys.argv[2], 'w', encoding='utf-8'), ensure_ascii=False)
amb = sum(1 for v in exact.values() if len(v) > 1)
print('exact words', len(exact), 'loose', len(loose), 'ambiguous', amb, 'skipped', bad)
