# Every Arabic verse the app already has in English letters, so a hymn's Arabic in English letters can be rebuilt
# verse by verse (used by build.py here and by scripts/st-mysteries). Arabic marks and punctuation don't count.
import json, re, unicodedata

MARKS = re.compile('[ً-ٰٟـ‎‏‪-‮]')
LABELS = {
    'الشعب': "Esh-sha'b:", 'الشماس': 'Esh-shammas:', 'الكاهن': 'El-kahin:', 'الأسقف': 'El-usquf:',
    'الاسقف': 'El-usquf:', 'الشمامسة': 'Esh-shamamsa:', 'المرتلون': 'El-murattiloun:', 'البابا': 'El-Baba:',
    'رئيس الشمامسة': "Ra'ees esh-shamamsa:", 'القارئ': "El-qari':",
}

def norm(text):
    t = MARKS.sub('', unicodedata.normalize('NFC', text))
    t = t.replace('أ', 'ا').replace('إ', 'ا').replace('آ', 'ا').replace('ى', 'ي').replace('ة', 'ه')
    t = re.sub(r'[^ء-ي0-9٠-٩ ]', ' ', t)
    return ' '.join(t.split())

def label_of(arabic):
    key = norm(arabic)
    for word, latin in LABELS.items():
        if key == norm(word) and arabic.strip().endswith(':'):
            return latin
    return None

def lexicon(hymns):
    # Arabic verse -> its English letters, from every hymn whose two versions have the same number of verses
    found = {}
    for h in hymns:
        ar, en = h['v'].get('arabic', ''), h['v'].get('englishArabic', '')
        a = [p for p in ar.split('\n\n') if p.strip()]
        e = [p for p in en.split('\n\n') if p.strip()]
        if not a or len(a) != len(e):
            continue
        for x, y in zip(a, e):
            if label_of(x) or y.strip().startswith('('):
                continue
            found.setdefault(norm(x), y.strip())
    return found
