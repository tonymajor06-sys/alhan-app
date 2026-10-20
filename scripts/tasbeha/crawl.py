import sys, os, time, urllib.request, concurrent.futures as cf
urls = open(sys.argv[1]).read().split()
out = sys.argv[2]
def get(u):
    p = os.path.join(out, u.rsplit('/', 1)[1] + '.html')
    if os.path.exists(p) and os.path.getsize(p) > 1000: return 'skip'
    for attempt in range(3):
        try:
            req = urllib.request.Request(u, headers={'User-Agent': 'Mozilla/5.0 (alhan-app hymn sync)'})
            data = urllib.request.urlopen(req, timeout=30).read()
            open(p, 'wb').write(data); time.sleep(0.4); return 'ok'
        except Exception as e:
            time.sleep(3)
    return 'fail ' + u
with cf.ThreadPoolExecutor(3) as ex:
    res = list(ex.map(get, urls))
print({r: res.count(r) for r in set(r.split()[0] for r in res)})
print([r for r in res if r.startswith('fail')][:20])
