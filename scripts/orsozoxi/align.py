# align.py verses.json -> aligned.json: each Coptic letter (with its word context) and the Arabic Orsozoxi wrote for it
import sys, json, re, unicodedata
C = {
 'ⲁ':'ا أ آ إ ى ي', 'ⲃ':'ف ب ڤ إف إب', 'ⲅ':'غ ج ك ن إغ ق', 'ⲇ':'ذ د ض إذ', 'ⲉ':'ي إي إ ى ا ي أ', 'ⲍ':'ز إز ذ',
 'ⲏ':'ي ى إي ئي ا', 'ⲑ':'ث ت إث ط', 'ⲓ':'ي ى إي أي ئ ئى ا', 'ⲕ':'ك إك ق', 'ⲗ':'ل إل', 'ⲙ':'م إم', 'ⲛ':'ن إن',
 'ⲝ':'كس إكس إكص اكس', 'ⲟ':'و أو ؤ ا أ ئو', 'ⲡ':'ب إب پ', 'ⲣ':'ر إر', 'ⲥ':'س إس ص إص ز', 'ⲧ':'ت ط إت إط ض',
 'ⲩ':'ي ى ف ف ڤ و إف إيف ب', 'ⲫ':'ف إف ب', 'ⲭ':'ك خ ش إك إخ ه', 'ⲯ':'إبس بس ابس', 'ⲱ':'و أو ؤ ا أ',
 'ϣ':'ش إش', 'ϥ':'ف إف', 'ϧ':'خ إخ', 'ϩ':'ه إه ح إح', 'ϫ':'ج إج', 'ϭ':'تش إتش ش تـش', 'ϯ':'تي تى إتي ت',
}
C = {k: set(v.split()) for k, v in C.items()}
# the Liturgy book often types the short e as أ or ا (أم أبتشويس)
C = {k: v | {a + c[1:] for c in v if c.startswith('إ') for a in 'أا'} for k, v in C.items()}
C['ⲟⲩ'] = {'و', 'وو', 'أو', 'أوو', 'ؤو', 'ؤ', 'ئو', 'إو', 'وؤ'}
FREE = set('ّـًٌٍَُِْ')
MARKS = {chr(0x300), chr(0x301), chr(0x60), chr(0x27), chr(0x305), chr(0xfe26)}
ABBR = {'ⲟⲥ': 'ϭⲟⲓⲥ', 'ⲡⲟⲥ': 'ⲡϭⲟⲓⲥ', 'ⲡⲉⲛⲟⲥ': 'ⲡⲉⲛϭⲟⲓⲥ', 'ⲧⲉⲛⲟⲥ': 'ⲧⲉⲛϭⲟⲓⲥ', 'ⲡⲁⲟⲥ': 'ⲡⲁϭⲟⲓⲥ', 'ⲧⲁⲟⲥ': 'ⲧⲁϭⲟⲓⲥ',
  'ⲡⲛⲁ': 'ⲡⲛⲉⲩⲙⲁ', 'ⲡⲛⲁⲧⲓ': 'ⲡⲛⲉⲩⲙⲁⲧⲓ', 'ⲭⲥ': 'ⲭⲣⲓⲥⲧⲟⲥ', 'ⲡⲭⲥ': 'ⲡⲓⲭⲣⲓⲥⲧⲟⲥ', 'ⲓⲏⲥ': 'ⲓⲏⲥⲟⲩⲥ', 'ⲛⲓⲏⲥ': 'ⲛⲓⲏⲥⲟⲩⲥ',
  'ⲥⲱⲣ': 'ⲥⲱⲧⲏⲣ', 'ⲡⲉⲛⲥⲱⲣ': 'ⲡⲉⲛⲥⲱⲧⲏⲣ', 'ⲉⲑⲩ': 'ⲉⲑⲟⲩⲁⲃ', 'ⲫⲏⲉⲑⲩ': 'ⲫⲏⲉⲑⲟⲩⲁⲃ', 'ⲁⲗ': 'ⲁⲗⲗⲏⲗⲟⲩⲓⲁ',
  'ⲓⲗⲏⲙ': 'ⲓⲉⲣⲟⲩⲥⲁⲗⲏⲙ', 'ⲡⲓⲡⲛⲁ': 'ⲡⲓⲡⲛⲉⲩⲙⲁ', 'ⲡⲡⲛⲁ': 'ⲡⲓⲡⲛⲉⲩⲙⲁ', 'ⲉⲡⲭⲥ': 'ⲉⲡⲓⲭⲣⲓⲥⲧⲟⲥ', 'ⲙⲡⲉⲛⲟⲥ': 'ⲙⲡⲉⲛϭⲟⲓⲥ',
  'ⲫϯ': 'ⲫⲛⲟⲩϯ', 'ⲙⲫϯ': 'ⲙⲫⲛⲟⲩϯ', 'ⲉⲫϯ': 'ⲉⲫⲛⲟⲩϯ', 'ⲛⲧⲉⲫϯ': 'ⲛⲧⲉⲫⲛⲟⲩϯ', 'ⲭⲉ': 'ϣⲉⲣⲉ ⲛⲉ ⲱ ϯⲡⲁⲣⲑⲉⲛⲟⲥ'}
def letters(word):
    out = []
    plain = ''.join(ch for ch in unicodedata.normalize('NFD', word) if ch not in MARKS and ch.lower() in C).lower()
    if plain in ABBR and (chr(0x305) in word or chr(0xfe26) in word or plain.endswith('ⲫϯ')): word = ABBR[plain].replace(' ', '')
    for ch in unicodedata.normalize('NFD', word):
        if ch in MARKS:
            if ch == '̀' and out: out[-1]['j'] = True
            continue
        l = ch.lower()
        if l in C: out.append({'c': l, 'j': False})
    # ⲟⲩ as one unit
    res, i = [], 0
    while i < len(out):
        if out[i]['c'] == 'ⲟ' and i + 1 < len(out) and out[i+1]['c'] == 'ⲩ' and not out[i+1]['j']:
            res.append({'c': 'ⲟⲩ', 'j': out[i]['j']}); i += 2
        else: res.append(out[i]); i += 1
    return res
def align(units, ar):
    # dp over (unit index, arabic index): spaces and marks are free, an extra Arabic letter costs 1, a skipped Coptic
    # letter 2 (0.6 for ⲓ ⲩ ⲉ and doubled letters, which Orsozoxi often leaves out)
    n, m = len(units), len(ar)
    INF = 1e9
    dp = [[INF]*(m+1) for _ in range(n+1)]; bk = [[None]*(m+1) for _ in range(n+1)]
    dp[0][0] = 0
    for i in range(n+1):
        for j in range(m+1):
            d = dp[i][j]
            if d >= INF: continue
            if j < m:
                c = 0 if ar[j] == ' ' or ar[j] in FREE else 1
                if d + c < dp[i][j+1]: dp[i][j+1] = d + c; bk[i][j+1] = ('x', i, j)
            if i < n:
                skip = 0.6 if units[i]['c'] in ('ⲓ', 'ⲩ', 'ⲉ') or (i and units[i]['c'] == units[i-1]['c']) else 2
                if d + skip < dp[i+1][j]: dp[i+1][j] = d + skip; bk[i+1][j] = ('s', i, j, '')
                # a Coptic word should start where an Arabic word starts
                pen = 0.8 if units[i]['pos'] == 0 and j > 0 and ar[j-1] != ' ' else 0
                for cand in units[i]['cands']:
                    L = len(cand)
                    if ar[j:j+L] == cand and d + pen < dp[i+1][j+L]:
                        dp[i+1][j+L] = d + pen; bk[i+1][j+L] = ('m', i, j, cand)
    i, j, got = n, m, {}
    while (i, j) != (0, 0):
        b = bk[i][j]
        if b[0] == 'm': got[b[1]] = (b[3], b[2])
        i, j = b[1], b[2]
    return dp[n][m], got
verses = json.load(open(sys.argv[1]))
rows, costs, pairs = [], [], []
for v in verses:
    words = [w for w in re.split(r'\s+', v['coptic']) if letters(w)]
    units = []
    for wi, w in enumerate(words):
        ls = letters(w)
        for li, u in enumerate(ls):
            u = dict(u); u['w'] = wi; u['pos'] = li; u['len'] = len(ls); u['word'] = w
            u['prev'] = ls[li-1]['c'] if li else '#'; u['next'] = ls[li+1]['c'] if li + 1 < len(ls) else '#'
            u['cands'] = C[u['c']]; units.append(u)
    ar = re.sub(r'[^\u0600-\u06ff ]', ' ', v['arabicCoptic'].replace(chr(0x640), ''))  # keep shadda, drop tatweel
    ar = re.sub(r' +', ' ', ar).strip()
    cost, got = align(units, ar)
    costs.append(cost / max(1, len(units)))
    if cost / max(1, len(units)) > 0.6: continue  # badly matched verse (different text)
    starts = {}
    for k, u in enumerate(units):
        g = got.get(k)
        rows.append({'c': u['c'], 'j': u['j'], 'pos': u['pos'], 'len': u['len'], 'prev': u['prev'], 'next': u['next'], 'word': u['word'], 'ar': g[0] if g else None})
        if g and u['w'] not in starts: starts[u['w']] = g[1]
    ws = sorted(starts.items())
    for n, (wi, st) in enumerate(ws):
        end = ws[n + 1][1] if n + 1 < len(ws) else len(ar)
        if wi == len(words) - 1 or (n + 1 < len(ws) and ws[n + 1][0] == wi + 1):
            pairs.append((words[wi], ar[st:end].strip()))
json.dump(rows, open(sys.argv[2], 'w'), ensure_ascii=False)
if len(sys.argv) > 3: json.dump(pairs, open(sys.argv[3], 'w'), ensure_ascii=False)
print(len(rows), 'letters;', sum(c <= 0.6 for c in costs), 'of', len(costs), 'verses aligned')
