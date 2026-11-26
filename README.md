# Token Remove button at 200% text: main 157be798 vs head cd49a825

Chromium 149 runs headless through Playwright 1.61.1. Storybook is built at each revision. The 200% stills set the root font size to 200%. Each still is DPR 2.

The PowerSearch pair uses a local test story with a date filter and a long Title filter. On both revisions, the date token's value is "date range". At head, its label takes more room and the value is cut short. The hit test checks five points in a 24 × 24 px target around each Remove button's center. `measures.json` has each token's boxes, its hit test and the result of a real press.

| Pair | Story | Text | main | head |
| --- | --- | --- | --- | --- |
| `powersearch-title-{main,head}-200pct-390.png` | PowerSearch, long Title token, 390 px | 200% | The label has no width. Remove is outside the token. A click at its center misses. | The label is 70.3 px wide. Remove is inside the token. A click removes the token. |
| `token-long-end-{main,head}-200pct-390.png` | Token, "Long End Content In Narrow Space", static and clickable, 390 px | 200% | Both labels have no width. Both Remove buttons are outside their tokens. Clicks and taps miss. | The labels are 44.75 and 52.61 px wide. Both Remove buttons are inside. Clicks and taps remove the tokens. |
| `token-with-end-content-{main,head}-100pct-1280-light.png` | Token, "With End Content", light, 1280 px | 100% | Same pixels as head. | Same pixels as main. |
