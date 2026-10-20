import sys, os, re, json, html, unicodedata
from collections import Counter, defaultdict
pages = sys.argv[1]; out = sys.argv[2]
TAG = re.compile(r'<[^>]+>')
def text(x): return html.unescape(TAG.sub('', x)).strip()
WP = re.compile(r'<span class="wp"[^>]*><span class="w sync-translit"[^>]*>(.*?)</span><span class="w sync-coptic[^"]*"[^>]*>(.*?)</span></span>', re.S)
LINE = re.compile(r'<div class="sync-text">(.*?)</div>', re.S)
UNALIGNED = re.compile(r'<span class="sync-translit">(.*?)</span><span class="sync-coptic[^"]*"[^>]*>(.*?)</span></div>', re.S)
hymns = {}
pairs = []
for f in sorted(os.listdir(pages), key=lambda n: int(n.split('.')[0])):
    s = open(os.path.join(pages, f), encoding='utf-8', errors='ignore').read()
    hid = f.split('.')[0]
    title = text(re.search(r'<title>(.*?)</title>', s, re.S).group(1)) if '<title>' in s else ''
    crumbs = [text(c) for c in re.findall(r'<a[^>]*>(.*?)</a>', (re.search(r'class="hp-crumbs"(.*?)</nav>|class="hp-crumbs"(.*?)</div>', s, re.S) or [''])[0] if False else '')]
    lines = []
    for body in LINE.findall(s):
        ws = WP.findall(body)
        if ws:
            line = [(text(t), text(c)) for t, c in ws]
        else:
            m = UNALIGNED.search(body + '</div>')
            if not m: continue
            tr = text(m.group(1)).split()
            cw = [text(w) for w in re.findall(r'<span class="w"[^>]*>(.*?)</span>', m.group(2))]
            line = list(zip(tr, cw)) if len(tr) == len(cw) else [(' '.join(tr), ' '.join(cw))]
        lines.append(line)
    hymns[hid] = {'title': title, 'lines': lines}
json.dump(hymns, open(out, 'w', encoding='utf-8'), ensure_ascii=False)
n = sum(len(l) for h in hymns.values() for l in h['lines'])
print('hymns', len(hymns), 'with text', sum(1 for h in hymns.values() if h['lines']), 'word pairs', n)
