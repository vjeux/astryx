# #12179 own-revision iPhone rows (a) and (d): 46a28a57 vs 414ea36a (test numbers)

All numbers are test measurements.

**Verdict: no difference.** On the physical iPhone, rows (a) and (d) give the same result at #12179's own revision as at 414ea36a. That holds in the Safari tab and in the Home Screen web app.

- New: 46a28a57b59d6ca5f1f75a569869198542ba9441, an empty commit on 67dc9e9414d745a48bb5af57aba153897ffebeb2, with the same tree. It is #12179's head.
- It ran on its own preview deploy. The phone read its `version.json` as 46a28a57.
- Old: 414ea36ad5fcfa337d5630c539783c946d7d4a96, on its own preview deploy. The phone read its `version.json` as 414ea36a.
- Device: one physical iPhone 14, iOS 26.2, on Nov 23 from 05:27 to 05:41 UTC.
- Story: core-dropdownmenu--button-variants.
- Procedure: the same row procedures and driver as the earlier side-by-side. The takes are interleaved new, old, old, new, new, old: 3 per head per row.
- Each Safari take loads the page with its own query string. A small page script reads the focus, the menus and the events in Safari.
- The Home Screen app has no page script, so its reads come from the driver only: the menu and the trigger's rect.

| row | host | new 46a28a57 (3 takes) | old 414ea36a (3 takes) |
|---|---|---|---|
| (a) held pick | Safari | menu closed, Ghost not expanded, no ghost events; focus on BUTTON "Secondary" 3/3 | same 3/3 |
| (d) tap, then empty page space | Safari | menu closed, trigger rect unchanged; focus on BODY 3/3 | same 3/3 |
| (a) | Home Screen app | rows open, menu closed after, rect (32,405,128,33) unchanged 3/3 | same 3/3 |
| (d) | Home Screen app | rows open, menu closed after, rect unchanged 3/3 | same 3/3 |

- This fits the code reading of the earlier row (d) iPhone difference. At a9e89138, which is #12179 plus #12216, the focus stayed on Secondary.
- At #12179's own revision, the focus goes to the body, as at 414ea36a and at main. So that difference comes from #12216's outside hold, not from #12179.
