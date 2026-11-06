#!/usr/bin/env python3
"""Local analysis, not part of any PR: for every new position the frozen arm
shows in the judged part, the age of the step it shows (the latest step set
before the block within one cast step), over trace dumps."""
import glob, json, os, sys
ages = []
rows = 0
for d in sys.argv[1:]:
    for p in sorted(glob.glob(os.path.join(d, '*-1-*.json'))):
        r = json.load(open(p))
        if 'tracked' not in r:
            continue
        rows += 1
        w = r['window']; j = r['judged']; top = r['top']; step = r['castStepPx']
        pre = [s for s in r['steps'] if s['t'] < w['from']]
        tr = [f for f in r['tracked'] if f['y'] is not None]
        before = [f for f in tr if f['t'] < j['from']]
        shown = before[-1]['y'] if before else None
        for f in tr:
            if f['t'] < j['from'] or f['t'] > j['to']:
                continue
            if shown is not None and abs(f['y'] - shown) > 0.25:
                m = [s for s in pre if abs(top + s['y'] - f['y']) <= step]
                age = (w['from'] - m[-1]['t']) if m else None
                lead = w['from'] - r['steps'][0]['t']
                ages.append((age, f['t'] - w['from'], os.path.basename(d), lead))
            shown = f['y']
known = [a for a in ages if a[0] is not None]
print(f"{rows} runs, {len(ages)} new positions in the judged part; matched {len(known)}")
if known:
    known.sort()
    print('step age (ms before the block): min %.0f, median %.0f, max %.0f' % (known[0][0], known[len(known)//2][0], known[-1][0]))
    print('oldest five:', [(round(a), round(at), d, round(l)) for a, at, d, l in known[-5:]])
print('unmatched:', [(round(at), d, round(l)) for a, at, d, l in ages if a is None])
