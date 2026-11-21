# Cut labels at 2079599e: on a right-to-left page, a cut Latin label keeps its start

Head: #13413 at 2079599e3a66b3ba9021eae4a4ace13df21c1b45 (draft). Main: dbc4d8d1c9a6130b1c326dfcff71e19b9ba97523, the head's merge base. Chromium and Firefox. All numbers are test measurements.

## Answer (test)

- On a right-to-left page, a cut Latin label keeps its start on the head, in Button, SegmentedControl and a truncating Table heading. On main it keeps its end. This is the same in Chromium and Firefox.
- In the TruncatedLabels story, "Monthly" reads "Mo…" on the head and "…hly" on main. At that width two letters fit beside the ellipsis, not three.
- The Hebrew label "שבועי מפורט" keeps the page direction and is cut at its own end, as on main. Its pixels are the same on both builds.
- "Month" reads "M…" on the head and "…th" on main in Button and the Table heading. In SegmentedControl it reads "Mo…" and "…nth".
- "iPhone חדש" keeps the page direction and is cut as on main, in all three components. Its pixels are the same on both builds.
- On a left-to-right page, the head is pixel-identical to main, with one exception.
- In Chromium, 3 device pixels differ in the Table fixture, with either label. They are one column at the left edge of the uncut heading "Value", which the head now wraps in its new span. Firefox shows 0.

## What changed

- Button, SegmentedControlItem and TableHeaderCell put `textDirectionProps` on the element that cuts its label. That element also gets `text-align: match-parent`.
- So a label with no right-to-left letter gets `dir="ltr"`, and the ellipsis takes its right end. A label with a right-to-left letter keeps the page's direction.
- A truncating TableHeaderCell now wraps a plain-text heading in a span that cuts it, so the cell's padding and dividers stay where they are.
- The pull request also changes MultiSelector and list formatting. This take does not cover them.

## Stories and labels

- `core-segmentedcontrol--truncated-labels`: new in the pull request, so main does not have it. Both builds also run a copy of it, `ZZ/CutLabels` TruncatedLabelsCopy, with the same story body.
- On the head, the copy and the stock story are pixel-identical in both browsers, on both pages.
- `core-button--truncation`: a Button in a 200 px container with the label "A very long button label that overflows", and one in a narrow flex row.
- `core-table--overflow-behavior`: its truncating Table has the headings "Scenario" and "Content". Neither heading is cut.
- So a scratch story, `ZZ/CutLabels`, adds the cut labels on each component, in neither tree. It is the same file in both builds.
- Its cases: a Button 56 px wide, and a SegmentedControl 180 px wide with "Week" and "Year" beside the label.
- The Table case is a heading in a 56 px column, with `textOverflow="truncate"`.
- Each case takes "Month", or "iPhone " followed by U+05D7 U+05D3 U+05E9, written with `\u` escapes.
- The toolbar has no locale: the story decorator pins the locale "en". So the he and ar locales are not part of this take.

## Every cut label, right-to-left page (test)

| Browser | Page | Case | Label | Main | Head |
| --- | --- | --- | --- | --- | --- |
| Chromium | rtl | SegmentedControl, the stock TruncatedLabels story | Monthly | - | Mo… (keeps start; dir=ltr, ltr; dots right) |
| Chromium | rtl | SegmentedControl, the stock TruncatedLabels story | שבועי מפורט | - | שבועי … (keeps start; no dir, rtl; dots left) |
| Chromium | rtl | SegmentedControl, the stock TruncatedLabels story | Yearly | - | Y… (keeps start; dir=ltr, ltr; dots right) |
| Chromium | rtl | Button, the stock Truncation story | A very long button label that overflows | … label that overflows (keeps end; no dir, rtl; dots left) | A very long button la… (keeps start; dir=ltr, ltr; dots right) |
| Chromium | rtl | Button, the stock Truncation story | Submit this extremely long form action | …it this extremely long form action (keeps end; no dir, rtl; dots left) | Submit this extremely long form … (keeps start; dir=ltr, ltr; dots right) |
| Chromium | rtl | Table, the stock OverflowBehavior story | a_very_long_string_like_this_that_overflows_the_column_without_any_spaces_or_hyphens | …e_column_without_any_spaces_or_hyphens (keeps end; no dir, rtl; dots left) | …e_column_without_any_spaces_or_hyphens (keeps end; no dir, rtl; dots left) |
| Chromium | rtl | Table, the stock OverflowBehavior story | This is a longer sentence that might wrap or truncate depending on the textOverflow setting of the table. | …nding on the textOverflow setting of the table (keeps other; no dir, rtl; dots left) | …nding on the textOverflow setting of the table (keeps other; no dir, rtl; dots left) |
| Chromium | rtl | SegmentedControl, a copy of TruncatedLabels | Monthly | …hly (keeps end; no dir, rtl; dots left) | Mo… (keeps start; dir=ltr, ltr; dots right) |
| Chromium | rtl | SegmentedControl, a copy of TruncatedLabels | שבועי מפורט | שבועי … (keeps start; no dir, rtl; dots left) | שבועי … (keeps start; no dir, rtl; dots left) |
| Chromium | rtl | SegmentedControl, a copy of TruncatedLabels | Yearly | …ly (keeps end; no dir, rtl; dots left) | Y… (keeps start; dir=ltr, ltr; dots right) |
| Chromium | rtl | Button, "Month" | Month | …th (keeps end; no dir, rtl; dots left) | M… (keeps start; dir=ltr, ltr; dots right) |
| Chromium | rtl | SegmentedControl, "Month" | Month | …nth (keeps end; no dir, rtl; dots left) | Mo… (keeps start; dir=ltr, ltr; dots right) |
| Chromium | rtl | SegmentedControl, "Month" | Week | …ek (keeps end; no dir, rtl; dots left) | W… (keeps start; dir=ltr, ltr; dots right) |
| Chromium | rtl | SegmentedControl, "Month" | Year | …r (keeps end; no dir, rtl; dots left) | Y… (keeps start; dir=ltr, ltr; dots right) |
| Chromium | rtl | Table heading, "Month" | Month | …th (keeps end; no dir, rtl; dots left) | M… (keeps start; dir=ltr, ltr; dots right) |
| Chromium | rtl | Button, "iPhone" + Hebrew | iPhone חדש | …ne (keeps other; no dir, rtl; dots left) | …ne (keeps other; no dir, rtl; dots left) |
| Chromium | rtl | SegmentedControl, "iPhone" + Hebrew | iPhone חדש | …hone (keeps other; no dir, rtl; dots left) | …hone (keeps other; no dir, rtl; dots left) |
| Chromium | rtl | SegmentedControl, "iPhone" + Hebrew | Week | …k (keeps end; no dir, rtl; dots left) | narrower than a letter and the ellipsis; pixels: 1 letter part, 3 dots (dir=ltr, ltr) |
| Chromium | rtl | SegmentedControl, "iPhone" + Hebrew | Year | …r (keeps end; no dir, rtl; dots left) | narrower than a letter and the ellipsis; pixels: 1 letter part, 2 dots (dir=ltr, ltr) |
| Chromium | rtl | Table heading, "iPhone" + Hebrew | iPhone חדש | …ne (keeps other; no dir, rtl; dots -) | …ne (keeps other; no dir, rtl; dots -) |
| Firefox | rtl | SegmentedControl, the stock TruncatedLabels story | Monthly | - | Mo… (keeps start; dir=ltr, ltr; dots right) |
| Firefox | rtl | SegmentedControl, the stock TruncatedLabels story | שבועי מפורט | - | שבועי … (keeps start; no dir, rtl; dots left) |
| Firefox | rtl | SegmentedControl, the stock TruncatedLabels story | Yearly | - | Y… (keeps start; dir=ltr, ltr; dots right) |
| Firefox | rtl | Button, the stock Truncation story | A very long button label that overflows | … label that overflows (keeps end; no dir, rtl; dots left) | A very long button la… (keeps start; dir=ltr, ltr; dots right) |
| Firefox | rtl | Button, the stock Truncation story | Submit this extremely long form action | …it this extremely long form action (keeps end; no dir, rtl; dots left) | Submit this extremely long form a… (keeps start; dir=ltr, ltr; dots right) |
| Firefox | rtl | Table, the stock OverflowBehavior story | a_very_long_string_like_this_that_overflows_the_column_without_any_spaces_or_hyphens | …e_column_without_any_spaces_or_hyphens (keeps end; no dir, rtl; dots left) | …e_column_without_any_spaces_or_hyphens (keeps end; no dir, rtl; dots left) |
| Firefox | rtl | Table, the stock OverflowBehavior story | This is a longer sentence that might wrap or truncate depending on the textOverflow setting of the table. | …nding on the textOverflow setting of the table (keeps other; no dir, rtl; dots left) | …nding on the textOverflow setting of the table (keeps other; no dir, rtl; dots left) |
| Firefox | rtl | SegmentedControl, a copy of TruncatedLabels | Monthly | …hly (keeps end; no dir, rtl; dots left) | Mo… (keeps start; dir=ltr, ltr; dots right) |
| Firefox | rtl | SegmentedControl, a copy of TruncatedLabels | שבועי מפורט | שבועי … (keeps start; no dir, rtl; dots left) | שבועי … (keeps start; no dir, rtl; dots left) |
| Firefox | rtl | SegmentedControl, a copy of TruncatedLabels | Yearly | …ly (keeps end; no dir, rtl; dots left) | Y… (keeps start; dir=ltr, ltr; dots right) |
| Firefox | rtl | Button, "Month" | Month | …th (keeps end; no dir, rtl; dots left) | M… (keeps start; dir=ltr, ltr; dots right) |
| Firefox | rtl | SegmentedControl, "Month" | Month | …nth (keeps end; no dir, rtl; dots left) | Mo… (keeps start; dir=ltr, ltr; dots right) |
| Firefox | rtl | SegmentedControl, "Month" | Week | …ek (keeps end; no dir, rtl; dots left) | W… (keeps start; dir=ltr, ltr; dots right) |
| Firefox | rtl | SegmentedControl, "Month" | Year | …r (keeps end; no dir, rtl; dots -) | Y… (keeps start; dir=ltr, ltr; dots right) |
| Firefox | rtl | Table heading, "Month" | Month | …th (keeps end; no dir, rtl; dots left) | M… (keeps start; dir=ltr, ltr; dots right) |
| Firefox | rtl | Button, "iPhone" + Hebrew | iPhone חדש | …ne (keeps other; no dir, rtl; dots -) | …ne (keeps other; no dir, rtl; dots -) |
| Firefox | rtl | SegmentedControl, "iPhone" + Hebrew | iPhone חדש | …hone (keeps other; no dir, rtl; dots left) | …hone (keeps other; no dir, rtl; dots left) |
| Firefox | rtl | SegmentedControl, "iPhone" + Hebrew | Week | …k (keeps end; no dir, rtl; dots left) | narrower than a letter and the ellipsis; pixels: 3 letter parts, no ellipsis (dir=ltr, ltr) |
| Firefox | rtl | SegmentedControl, "iPhone" + Hebrew | Year | …r (keeps end; no dir, rtl; dots left) | narrower than a letter and the ellipsis; pixels: 4 letter parts, no ellipsis (dir=ltr, ltr) |
| Firefox | rtl | Table heading, "iPhone" + Hebrew | iPhone חדש | …ne (keeps other; no dir, rtl; dots -) | …ne (keeps other; no dir, rtl; dots -) |

- The visible text comes from each character's Range box, as in the #13244 take. A character is drawn when it is inside the element's padding box and clear of the ellipsis.
- The ellipsis takes the element's inline end. "Dots" is its side as read from the pixels: three small ink parts in a row, beside the letters.
- The pixel side is found in 64 of 74 readings, and it agrees with the glyph-box reading in all 64. The other frames were checked by eye.
- With "iPhone חדש" in the first segment, "Week" and "Year" are narrower than one letter and the ellipsis. There the pixels decide.
- In those segments, Chromium draws the first letter and a clipped ellipsis, and Firefox clips the letters with no ellipsis. On the left-to-right page, this is the same on both builds.
- "Keeps start" means the drawn characters are the start of the text. "Keeps end" means they are its end.
- In the stock OverflowBehavior story, the cut texts are body cells. Its headings are not cut.
- "Other" means they are neither. A mixed label on a right-to-left page shows its Latin word's last letters first, and a trailing period moves to the line's far end.
- "iPhone חדש" reads back as U+0069 U+0050 U+0068 U+006F U+006E U+0065 U+0020 U+05D7 U+05D3 U+05E9, on both builds and in both browsers.

## Left-to-right page (test)

| Case | Browser | Cut labels | Same reading on main and the head |
| --- | --- | --- | --- |
| Button, the stock Truncation story | Chromium | 2 | 2 of 2 |
| Table, the stock OverflowBehavior story | Chromium | 2 | 2 of 2 |
| SegmentedControl, a copy of TruncatedLabels | Chromium | 3 | 3 of 3 |
| Button, "Month" | Chromium | 1 | 1 of 1 |
| SegmentedControl, "Month" | Chromium | 3 | 3 of 3 |
| Table heading, "Month" | Chromium | 1 | 1 of 1 |
| Button, "iPhone" + Hebrew | Chromium | 1 | 1 of 1 |
| SegmentedControl, "iPhone" + Hebrew | Chromium | 3 | 3 of 3 |
| Table heading, "iPhone" + Hebrew | Chromium | 1 | 1 of 1 |
| Button, the stock Truncation story | Firefox | 2 | 2 of 2 |
| Table, the stock OverflowBehavior story | Firefox | 2 | 2 of 2 |
| SegmentedControl, a copy of TruncatedLabels | Firefox | 3 | 3 of 3 |
| Button, "Month" | Firefox | 1 | 1 of 1 |
| SegmentedControl, "Month" | Firefox | 3 | 3 of 3 |
| Table heading, "Month" | Firefox | 1 | 1 of 1 |
| Button, "iPhone" + Hebrew | Firefox | 1 | 1 of 1 |
| SegmentedControl, "iPhone" + Hebrew | Firefox | 3 | 3 of 3 |
| Table heading, "iPhone" + Hebrew | Firefox | 1 | 1 of 1 |

## Pixels, head against main (test)

| Case | Browser | LTR page, px that differ | RTL page, px that differ |
| --- | --- | --- | --- |
| SegmentedControl, the stock TruncatedLabels story | Chromium | - | - |
| SegmentedControl, the stock TruncatedLabels story | Firefox | - | - |
| Button, the stock Truncation story | Chromium | 0 | 8664 |
| Button, the stock Truncation story | Firefox | 0 | 8062 |
| Table, the stock OverflowBehavior story | Chromium | 0 | 0 |
| Table, the stock OverflowBehavior story | Firefox | 0 | 0 |
| SegmentedControl, a copy of TruncatedLabels | Chromium | 0 | 1225 |
| SegmentedControl, a copy of TruncatedLabels | Firefox | 0 | 1272 |
| Button, "Month" | Chromium | 0 | 514 |
| Button, "Month" | Firefox | 0 | 515 |
| SegmentedControl, "Month" | Chromium | 0 | 1677 |
| SegmentedControl, "Month" | Firefox | 0 | 1722 |
| Table heading, "Month" | Chromium | 3 | 752 |
| Table heading, "Month" | Firefox | 0 | 767 |
| Button, "iPhone" + Hebrew | Chromium | 0 | 0 |
| Button, "iPhone" + Hebrew | Firefox | 0 | 0 |
| SegmentedControl, "iPhone" + Hebrew | Chromium | 0 | 646 |
| SegmentedControl, "iPhone" + Hebrew | Firefox | 0 | 920 |
| Table heading, "iPhone" + Hebrew | Chromium | 3 | 0 |
| Table heading, "iPhone" + Hebrew | Firefox | 0 | 0 |

- On the right-to-left page, each pixel that differs lies inside the border box of an element that cuts a label, on either build. For a heading, that element on main is its cell.
- For "iPhone חדש" and the Hebrew label, the label's own box is pixel-identical between the builds.
- In SegmentedControl with "iPhone חדש", the pixels that differ are in "Week" and "Year", which are Latin labels.

## Builds

- Head: the preview deploy of 2079599e, by its version.json (environment "preview"). Main: the Production deploy of dbc4d8d1, by its version.json (environment "production").
- Main moved after dbc4d8d1. By 123c39fe, its later commits change AppShell, Resizable, SegmentedControlItem, `getLocaleDirection` and `animatedLayout` in the core package, besides docs and tests.
- The SegmentedControlItem change is #12457: a segment grows with its label. The SegmentedControl rows here do not include it.
- So this take compares the head with the main that it is based on.
- The scratch cases run on local builds of both commits. Against the hosted deploys, the local builds give, on the right-to-left page:

| Browser | Story | Build | Page | Local against hosted, px that differ |
| --- | --- | --- | --- | --- |
| Chromium | core-segmentedcontrol--truncated-labels | head | rtl | 0 |
| Chromium | core-button--truncation | head | rtl | 0 |
| Chromium | core-button--truncation | main | rtl | 0 |
| Chromium | core-table--overflow-behavior | main | rtl | 0 |
| Chromium | stock TruncatedLabels against its copy, the SegmentedControl box | head | ltr | 0 |
| Chromium | stock TruncatedLabels against its copy, the SegmentedControl box | head | rtl | 0 |
| Firefox | core-segmentedcontrol--truncated-labels | head | rtl | 0 |
| Firefox | core-button--truncation | head | rtl | 0 |
| Firefox | core-button--truncation | main | rtl | 0 |
| Firefox | core-table--overflow-behavior | main | rtl | 0 |
| Firefox | stock TruncatedLabels against its copy, the SegmentedControl box | head | ltr | 0 |
| Firefox | stock TruncatedLabels against its copy, the SegmentedControl box | head | rtl | 0 |

- The version.json files and the pull request's head were the same at the start and the end of the run.

## Method

- Chromium 149.0.7827.55 and Firefox 151.0 through Playwright, 1280 × 800 px at scale 2, light, reduced motion. The direction is the toolbar's global.
- Each case runs on main and then on the head, interleaved, per browser and direction. A frame is taken when three screenshots in a row are identical.
- Every frame was looked at.

## Files

- `rtl--<case>--main-vs-head.png`: the story on a right-to-left page, Chromium above and Firefox below, main on the left and the head on the right.
- `rtl--segmentedcontrol-the-stock-truncatedlabels-story--head.png`: the head only, as main does not have that story.
- `measurements.json`: every reading, with each character's box, code point and drawn state.
