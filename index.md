# MultiSelector at 56917358: the trigger's count keeps the locale's form

Head: #13244 at 56917358ec38927e2477ea5028684e250c3933e2, `head` in file names. Main: eafcbfe61a11cf7f83e8cf963a671fca6383e68a, the head's merge base, `base` in file names. All numbers are test measurements.

- #13244's branch carries #11220 (3450d896), which does not change the trigger. The earlier take of #13244 was at 50f9716c.
- After the run, #13244 moved to b287bfb9, a merge of main. Its own changes are the same as at 56917358.

## Answer (test)

- (1) On the `he-IL` and `ar-SA` pages, the count's "+" sits on main's side of its digit again: to its right, in 10 of 10 triggers.
- At 50f9716c, it sat to the left of the digit on both pages.
- The `ar-SA` page is now byte-identical to main: 5 of 5 trigger stills and the page frame.
- On the `he-IL` page, set D's English run still reads in order, from the right: Design, Marketing, Sales. On main, it reads in reverse.
- In the other `he-IL` sets, the order and the "+" side equal main's. Each character sits within 0.05 px of its place on main.
- Those small shifts redraw some glyph edges, so 3 of those 4 stills differ from main, in 134 to 314 px each. The narrow one is byte-identical.
- (2) On the `en` page, the count reads "+2" in 5 of 5 triggers. The `en` stills are byte-identical to the 50f9716c take.
- The trigger's items keep their reading order in 12 of 12 sets, on all three pages. Each label reads in its own direction in 12 of 12.
- Each of the 36 separators sits between its two items, in the page's reading direction.
- What changed in the markup: the count's span takes the locale's direction. Its `dir` is `ltr` under `en`, and `rtl` under `he-IL` and `ar-SA`.
- At 50f9716c, the count's span had `dir="auto"`, which resolves to left to right. The label spans keep `dir="auto"`.
- The head still inserts no bidi control characters. Its text and code points equal main's, and the 50f9716c take's, in 15 of 15 triggers.
- When narrow, the trigger ends in an ellipsis at the end of its line on all three pages. The head draws a start of the text on all three.
- The new story "Mixed Direction Labels Hebrew" reads in order, with the "+" to the right of its digit.
- Main has no such story. On main, the `he-IL` page's set A shows the same text and the same order, with the "+" on the same side.

## The stories

- On the head, the pull request's stories `core-multiselector--mixed-direction-labels` and `core-multiselector--mixed-direction-labels-hebrew` are used.
- The Hebrew story wraps the trigger in an InternationalizationProvider with the `he-IL` locale. It renders here on a right-to-left page, as the pull request's own test renders it.
- The scratch story, `scratch-story.tsx`, copies both stories' renders verbatim, with the MultiSelector stories' 300 px decorator. It is in neither tree.
- On the head, each copy and its story give byte-identical frames.
- The scratch story also renders the `en`, `he-IL` and `ar-SA` pages of the earlier takes. Each page has four sets, and set A in a 150 px box.
- Main's build is the one from the 50f9716c take. It holds the first copy and the three pages, but not the Hebrew copy.

## Builds

- Both builds are local Storybook builds, because the Storybook preview always uses the `en` locale.
- Main: eafcbfe6, the same commit as main's Production deploy, by its version.json (environment "production").
- Control: on the "Trigger Modes" story, the local main build and the Production deploy give byte-identical frames.
- Control: on the Hebrew story, the local head build and the head's preview deploy give byte-identical frames. The preview's version.json reads environment "preview".
- The pull request's head was the same at the start and the end of the run.

## Every set (test)

| Page | Set | Trigger text, exact (all builds) | Head: items from left to right | Head: in reading order | The "+" against its digits: main / 50f9716c / head | Head: count span `dir` | Head: labels read in their own direction | Head: separators between their items |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `en`, left to right | A | "Design, עיצוב, שיווק, +2" | Design · עיצוב · שיווק · +2 | yes | right / left / left | ltr | yes | yes |
| `en`, left to right | B | "עיצוב, Design, שיווק, +2" | עיצוב · Design · שיווק · +2 | yes | right / left / left | ltr | yes | yes |
| `en`, left to right | C | "עיצוב, שיווק, מכירות, +2" | עיצוב · שיווק · מכירות · +2 | yes | right / left / left | ltr | yes | yes |
| `en`, left to right | D | "Design, Marketing, Sales, +2" | Design · Marketing · Sales · +2 | yes | left / left / left | ltr | yes | yes |
| `he-IL`, right to left | A | "Design, עיצוב, שיווק ו-+2" | +2 · שיווק · עיצוב · Design | yes | right / left / right | rtl | yes | yes |
| `he-IL`, right to left | B | "עיצוב, Design, שיווק ו-+2" | +2 · שיווק · Design · עיצוב | yes | right / left / right | rtl | yes | yes |
| `he-IL`, right to left | C | "עיצוב, שיווק, מכירות ו-+2" | +2 · מכירות · שיווק · עיצוב | yes | right / left / right | rtl | yes | yes |
| `he-IL`, right to left | D | "Design, Marketing, Sales ו-+2" | +2 · Sales · Marketing · Design | yes | right / left / right | rtl | yes | yes |
| `ar-SA`, right to left | A | "Design وتصميم وتسويق و+٢" | +٢ · تسويق · تصميم · Design | yes | right / left / right | rtl | yes | yes |
| `ar-SA`, right to left | B | "تصميم وDesign وتسويق و+٢" | +٢ · تسويق · Design · تصميم | yes | right / left / right | rtl | yes | yes |
| `ar-SA`, right to left | C | "تصميم وتسويق ومبيعات و+٢" | +٢ · مبيعات · تسويق · تصميم | yes | right / left / right | rtl | yes | yes |
| `ar-SA`, right to left | D | "Design وMarketing وSales و+٢" | +٢ · Sales · Marketing · Design | yes | right / left / right | rtl | yes | yes |

- The text is the trigger's own text, exactly. The items are the three shown labels and the count.
- Reading order is left to right on the `en` page and right to left on the other two pages.
- A label reads in its own direction when its characters run left to right for English, and right to left for Hebrew and Arabic.
- A separator sits between its items when its box comes after the first item's and before the second's, in the page's reading direction.

## The count's span, and identity (test)

| Page | Count span at 50f9716c: `dir` → resolved | Count span at 56917358: `dir` → resolved | Trigger stills, head against main | Trigger stills, head against 50f9716c | Page frame, head against main |
| --- | --- | --- | --- | --- | --- |
| `en`, left to right | auto → ltr | ltr → ltr | 0 of 5 byte-identical | 5 of 5 byte-identical | differs |
| `he-IL`, right to left | auto → ltr | rtl → rtl | 1 of 5 byte-identical | 1 of 5 byte-identical | differs |
| `ar-SA`, right to left | auto → ltr | rtl → rtl | 5 of 5 byte-identical | 1 of 5 byte-identical | byte-identical |

- Each page has five triggers: sets A to D and the narrow copy of set A.

## The narrow trigger (test)

| Page | Build | Text box, px (content / needed) | Characters drawn before the ellipsis, in text order | The drawn characters are a start of the text |
| --- | --- | --- | --- | --- |
| `en`, left to right | main | 100 / 144 | "Design, ק, +2" | **no** |
| `en`, left to right | head | 100 / 144 | "Design, עיצוב" | yes |
| `he-IL`, right to left | main | 100 / 148 | "Design, עיצוב" | yes |
| `he-IL`, right to left | head | 100 / 148 | "Design, עיצוב" | yes |
| `ar-SA`, right to left | main | 100 / 168 | "Design وتصمي" | yes |
| `ar-SA`, right to left | head | 100 / 168 | "Design وتصمي" | yes |

- The ellipsis takes the end of the line: the right on the `en` page, the left on the other two. It is 14 px wide.
- A character counts as drawn when its box lies inside the text box and clear of the ellipsis. The frames agree.

## The pull request's stories (test)

| Story | Page | Build | Trigger text | Items from left to right | In reading order | The "+" against its digits | Count span `dir` |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `core-multiselector--mixed-direction-labels` | left to right | head | "Design, עיצוב, שיווק, +2" | Design · עיצוב · שיווק · +2 | yes | left | ltr |
| its copy in the scratch story | left to right | head | "Design, עיצוב, שיווק, +2" | Design · עיצוב · שיווק · +2 | yes | left | ltr |
| its copy in the scratch story | left to right | main | "Design, עיצוב, שיווק, +2" | Design · +2 · שיווק · עיצוב | **no** | right | - |
| `core-multiselector--mixed-direction-labels-hebrew` | right to left | head | "Design, עיצוב, שיווק ו-+2" | +2 · שיווק · עיצוב · Design | yes | right | rtl |
| its copy in the scratch story | right to left | head | "Design, עיצוב, שיווק ו-+2" | +2 · שיווק · עיצוב · Design | yes | right | rtl |

## The head's markup: `he-IL`, set D (test)

| Child of the text box, in order | Text | dir | unicode-bidi (computed) | Resolved direction |
| --- | --- | --- | --- | --- |
| `<span>` | "Design" | auto | isolate | ltr |
| text | ", " | - | - | - |
| `<span>` | "Marketing" | auto | isolate | ltr |
| text | ", " | - | - | - |
| `<span>` | "Sales" | auto | isolate | ltr |
| text | " ו-" | - | - | - |
| `<span>` | "+2" | rtl | isolate | rtl |

## Method

- Chromium 149.0.7827.55 through Playwright, 1280 × 800 at scale 2, light mode.
- The text is every text node in the trigger's text box, in order. Each character's position is the box of a DOM Range around it.
- An item's direction compares its first character's position with its last. The items' order compares their centers.
- The method and the scratch pages are those of the 50f9716c take.
- All numbers are test measurements from one machine. Every frame was looked at.
- Main's frames are byte-identical to the 50f9716c take's.

## Files

- `trigger--<page>--set<A–D or A-narrow>--<build>.png`: each trigger, with 8 px around it.
- `page--<page>--<build>.png`: each page.
- `mixed-direction-labels--<story, copy, hebrew-story or hebrew-copy>--<build>.png`: the pull request's stories and their copies.
- `control--<story>--<build>--<local|hosted>.png`: the control frames.
- `scratch-story.tsx` and `measurements.json`: the story, and every reading with each trigger's code points and markup.
