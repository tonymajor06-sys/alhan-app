# parse.py capture-files... -> verses.json: [{coptic (Unicode), arabicCoptic (Orsozoxi), english}]
import sys, json, re
LOW = dict(zip('abgdezhqiklmnxoprctuvywfjs;]\\\'', 'ⲁⲃⲅⲇⲉⲍⲏⲑⲓⲕⲗⲙⲛⲭⲟⲡⲣⲥⲧⲩⲫⲯⲱϥϫϭϯϣϩϧ'))
UP = {k.upper(): v.upper() for k, v in LOW.items() if k.isalpha()}
UP.update({'|': 'Ϩ', '"': 'Ϧ', '}': 'Ϣ', ':': 'Ϯ', '{': 'Ⲝ'})
LOW['['] = 'ⲝ'
def to_unicode(s):
    s = s.replace('‪', '').replace('‬', '')
    s = re.sub(r'[‘’“”]', '', s)
    out, jink = [], False
    for ch in s:
        if ch in '`~': jink = True; continue
        if ch == '_': out.append('ϭⲟⲓⲥ'); jink = False; continue
        u = LOW.get(ch) or UP.get(ch)
        if u:
            out.append(u + ('̀' if jink else '')); jink = False
        elif ch == '?': out.append('̅')  # the line over a holy name
        elif ch == '>': out.append(':')
        elif ch.isalpha() and ord(ch) < 0x370: jink = False  # a Latin letter the font does not use
        else: out.append(ch); jink = False
    return ''.join(out)
ar = re.compile(r'[؀-ۿ]')
verses, seen = [], set()
for f in sys.argv[2:]:
    for block in open(f).read().split('<<<>>>'):
        lines = [l.strip() for l in block.strip().split('\n') if l.strip()]
        lat = [i for i, l in enumerate(lines) if l.startswith('‪')]
        if not lat or lat[0] < 2: continue
        i = lat[0]
        if not ar.search(lines[i - 1]): continue
        key = lines[i]
        if key in seen: continue
        seen.add(key)
        verses.append({'arabic': lines[i - 2], 'arabicCoptic': lines[i - 1], 'ascii': lines[i].strip('‪‬'),
                       'coptic': to_unicode(lines[i]), 'english': lines[i + 1].strip('‪‬') if i + 1 < len(lines) else ''})
json.dump(verses, open(sys.argv[1], 'w'), ensure_ascii=False, indent=1)
print(len(verses), 'verses')
