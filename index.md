# SideNav at 8d1e623a: a label that does not fit wraps instead of ending in an ellipsis

Head: #13216 at 8d1e623a246467d774d176aded48ffba3426e6d3, `head` in file names. Base: #13192 at 1a2ff3a284e66db3c57402a189fe4a1451cc740d, `base` in file names. All numbers are test measurements.

## Answer (test)

- 200% text, desktop rail: on the head, no label ends in an ellipsis. On the base, every long label is one line with an ellipsis.
- In Neutral, Stone, Butter, Chocolate and Gothic, every label shows whole, in LTR and RTL: 10 of 14 conditions.
- In those themes, a label still breaks inside a word when the word is wider than its box: 9 breaks per condition, 11 in Gothic.
- For example, "Projects" breaks as "Projec|ts" in its 84 px label box. measurements.json lists every broken word.
- At 200% in the rail, neither badge fits beside the label's longest word. So both badges move to their own line. Each sits at the row's inline end, except the depth-3 "New" in Matcha and Y2K.
- The badge position follows the pull request's rule in 14 of 14 conditions. A badge sits beside the first line only when the longest word and the badge fit.
- Matcha and Y2K, the gap the pull request names: the depth-3 row has a 20 px label box. Its label breaks into 40 lines, and its glyphs leave the box.
- There, the depth-3 "New" badge is wider than its box and runs past the nav's edge.
- Matcha and Y2K also cut two rows outside the gap the pull request names.
- The depth-2 group row "Infrastructure migrations and rollouts" gets a 0 px label box and 35 lines. "Projects" gets a 12 px box and 8 lines.
- 100% text: 22 of 24 SideNav stories are pixel-identical. All 97 rows on one line on both builds are identical in their own box.
- End Content's long row changes from an ellipsis to 3 lines, though its label says it "wraps onto a second line". Its badge sits beside the first line.
- Nested Long Labels, new in #13192, also changes. Its 3 long rows wrap to 2, 2 and 3 lines, with each badge beside the first line.
- The collapsed rail's tooltips are pixel-identical in 5 of 5 cases. Each sits at its leaf's inline end.
- In the 390 px drawer, every row that fits on one line on the base is identical in its own box. That is 3 rows at 100% and 2 at 200%.

## Builds

- Head: the preview deploy of 8d1e623a, by its version.json (environment "preview").
- Base: the preview deploy of 1a2ff3a2, #13192's head, by its version.json (environment "preview").
- #13216's head is now 93467b00. Over 8d1e623a, it changes only a release note and the SideNav spec, with no code or story change.
- The story exists on both builds, so no scratch story is used.
- The version.json files and both pull requests' heads were the same at the start and the end of each run.

## 200% text, desktop rail: the head (test)

| Theme | Direction | Row | Depth | Label box width, px | Lines | Label whole | Breaks inside a word | Badge | Badge position | Badge at the row's inline end | Longest word and badge fit on one line | Badge wider than its box | Row height, px |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Neutral | LTR | "Dashboard" | 1 | 148 | 1 | yes | 0 | - | - | - | - | - | 40 |
| Neutral | LTR | "Projects" | 1 | 84 | 2 | yes | 1 | - | - | - | - | - | 80 |
| Neutral | LTR | "Quarterly planning…" | 2 | 148 | 5 | yes | 0 | 12 | own line, after 5 label lines | yes | no | no | 240 |
| Neutral | LTR | "Infrastructure migrations…" | 2 | 84 | 8 | yes | 4 | - | - | - | - | - | 320 |
| Neutral | LTR | "Regional database…" | 3 | 100 | 9 | yes | 4 | New | own line, after 9 label lines | yes | no | no | 400 |
| Neutral | RTL | "Dashboard" | 1 | 148 | 1 | yes | 0 | - | - | - | - | - | 40 |
| Neutral | RTL | "Projects" | 1 | 84 | 2 | yes | 1 | - | - | - | - | - | 80 |
| Neutral | RTL | "Quarterly planning…" | 2 | 148 | 5 | yes | 0 | 12 | own line, after 5 label lines | yes | no | no | 240 |
| Neutral | RTL | "Infrastructure migrations…" | 2 | 84 | 8 | yes | 4 | - | - | - | - | - | 320 |
| Neutral | RTL | "Regional database…" | 3 | 100 | 9 | yes | 4 | New | own line, after 9 label lines | yes | no | no | 400 |
| Stone | LTR | "Dashboard" | 1 | 148 | 1 | yes | 0 | - | - | - | - | - | 40 |
| Stone | LTR | "Projects" | 1 | 84 | 2 | yes | 1 | - | - | - | - | - | 80 |
| Stone | LTR | "Quarterly planning…" | 2 | 148 | 5 | yes | 0 | 12 | own line, after 5 label lines | yes | no | no | 240 |
| Stone | LTR | "Infrastructure migrations…" | 2 | 84 | 8 | yes | 4 | - | - | - | - | - | 320 |
| Stone | LTR | "Regional database…" | 3 | 100 | 9 | yes | 4 | New | own line, after 9 label lines | yes | no | no | 400 |
| Stone | RTL | "Dashboard" | 1 | 148 | 1 | yes | 0 | - | - | - | - | - | 40 |
| Stone | RTL | "Projects" | 1 | 84 | 2 | yes | 1 | - | - | - | - | - | 80 |
| Stone | RTL | "Quarterly planning…" | 2 | 148 | 5 | yes | 0 | 12 | own line, after 5 label lines | yes | no | no | 240 |
| Stone | RTL | "Infrastructure migrations…" | 2 | 84 | 8 | yes | 4 | - | - | - | - | - | 320 |
| Stone | RTL | "Regional database…" | 3 | 100 | 9 | yes | 4 | New | own line, after 9 label lines | yes | no | no | 400 |
| Butter | LTR | "Dashboard" | 1 | 148 | 1 | yes | 0 | - | - | - | - | - | 40 |
| Butter | LTR | "Projects" | 1 | 84 | 2 | yes | 1 | - | - | - | - | - | 80 |
| Butter | LTR | "Quarterly planning…" | 2 | 148 | 5 | yes | 0 | 12 | own line, after 5 label lines | yes | no | no | 240 |
| Butter | LTR | "Infrastructure migrations…" | 2 | 84 | 8 | yes | 4 | - | - | - | - | - | 320 |
| Butter | LTR | "Regional database…" | 3 | 100 | 9 | yes | 4 | New | own line, after 9 label lines | yes | no | no | 400 |
| Butter | RTL | "Dashboard" | 1 | 148 | 1 | yes | 0 | - | - | - | - | - | 40 |
| Butter | RTL | "Projects" | 1 | 84 | 2 | yes | 1 | - | - | - | - | - | 80 |
| Butter | RTL | "Quarterly planning…" | 2 | 148 | 5 | yes | 0 | 12 | own line, after 5 label lines | yes | no | no | 240 |
| Butter | RTL | "Infrastructure migrations…" | 2 | 84 | 8 | yes | 4 | - | - | - | - | - | 320 |
| Butter | RTL | "Regional database…" | 3 | 100 | 9 | yes | 4 | New | own line, after 9 label lines | yes | no | no | 400 |
| Chocolate | LTR | "Dashboard" | 1 | 148 | 1 | yes | 0 | - | - | - | - | - | 40 |
| Chocolate | LTR | "Projects" | 1 | 84 | 2 | yes | 1 | - | - | - | - | - | 80 |
| Chocolate | LTR | "Quarterly planning…" | 2 | 148 | 5 | yes | 0 | 12 | own line, after 5 label lines | yes | no | no | 240 |
| Chocolate | LTR | "Infrastructure migrations…" | 2 | 84 | 8 | yes | 4 | - | - | - | - | - | 320 |
| Chocolate | LTR | "Regional database…" | 3 | 100 | 9 | yes | 4 | New | own line, after 9 label lines | yes | no | no | 400 |
| Chocolate | RTL | "Dashboard" | 1 | 148 | 1 | yes | 0 | - | - | - | - | - | 40 |
| Chocolate | RTL | "Projects" | 1 | 84 | 2 | yes | 1 | - | - | - | - | - | 80 |
| Chocolate | RTL | "Quarterly planning…" | 2 | 148 | 5 | yes | 0 | 12 | own line, after 5 label lines | yes | no | no | 240 |
| Chocolate | RTL | "Infrastructure migrations…" | 2 | 84 | 8 | yes | 4 | - | - | - | - | - | 320 |
| Chocolate | RTL | "Regional database…" | 3 | 100 | 9 | yes | 4 | New | own line, after 9 label lines | yes | no | no | 400 |
| Gothic | LTR | "Dashboard" | 1 | 148 | 2 | yes | 1 | - | - | - | - | - | 96 |
| Gothic | LTR | "Projects" | 1 | 84 | 2 | yes | 1 | - | - | - | - | - | 96 |
| Gothic | LTR | "Quarterly planning…" | 2 | 148 | 6 | yes | 0 | 12 | own line, after 6 label lines | yes | no | no | 336 |
| Gothic | LTR | "Infrastructure migrations…" | 2 | 84 | 8 | yes | 4 | - | - | - | - | - | 384 |
| Gothic | LTR | "Regional database…" | 3 | 100 | 10 | yes | 5 | New | own line, after 10 label lines | yes | no | no | 528 |
| Gothic | RTL | "Dashboard" | 1 | 148 | 2 | yes | 1 | - | - | - | - | - | 96 |
| Gothic | RTL | "Projects" | 1 | 84 | 2 | yes | 1 | - | - | - | - | - | 96 |
| Gothic | RTL | "Quarterly planning…" | 2 | 148 | 6 | yes | 0 | 12 | own line, after 6 label lines | yes | no | no | 336 |
| Gothic | RTL | "Infrastructure migrations…" | 2 | 84 | 8 | yes | 4 | - | - | - | - | - | 384 |
| Gothic | RTL | "Regional database…" | 3 | 100 | 10 | yes | 5 | New | own line, after 10 label lines | yes | no | no | 528 |
| Matcha | LTR | "Dashboard" | 1 | 108 | 2 | yes | 1 | - | - | - | - | - | 96 |
| Matcha | LTR | "Projects" | 1 | 12 | 8 | no | 7 | - | - | - | - | - | 384 |
| Matcha | LTR | "Quarterly planning…" | 2 | 92 | 11 | yes | 5 | 12 | own line, after 11 label lines | yes | no | no | 576 |
| Matcha | LTR | "Infrastructure migrations…" | 2 | 0 | 35 | no | 31 | - | - | - | - | - | 1680 |
| Matcha | LTR | "Regional database…" | 3 | 20 | 40 | no | 35 | New | own line, after 40 label lines | no | no | yes | 1968 |
| Matcha | RTL | "Dashboard" | 1 | 108 | 2 | yes | 1 | - | - | - | - | - | 96 |
| Matcha | RTL | "Projects" | 1 | 12 | 8 | no | 7 | - | - | - | - | - | 384 |
| Matcha | RTL | "Quarterly planning…" | 2 | 92 | 11 | yes | 5 | 12 | own line, after 11 label lines | yes | no | no | 576 |
| Matcha | RTL | "Infrastructure migrations…" | 2 | 0 | 35 | no | 31 | - | - | - | - | - | 1680 |
| Matcha | RTL | "Regional database…" | 3 | 20 | 40 | no | 35 | New | own line, after 40 label lines | no | no | yes | 1968 |
| Y2K | LTR | "Dashboard" | 1 | 108 | 2 | yes | 1 | - | - | - | - | - | 96 |
| Y2K | LTR | "Projects" | 1 | 12 | 8 | no | 7 | - | - | - | - | - | 384 |
| Y2K | LTR | "Quarterly planning…" | 2 | 92 | 11 | yes | 5 | 12 | own line, after 11 label lines | yes | no | no | 576 |
| Y2K | LTR | "Infrastructure migrations…" | 2 | 0 | 35 | no | 31 | - | - | - | - | - | 1680 |
| Y2K | LTR | "Regional database…" | 3 | 20 | 40 | no | 35 | New | own line, after 40 label lines | no | no | yes | 1968 |
| Y2K | RTL | "Dashboard" | 1 | 108 | 2 | yes | 1 | - | - | - | - | - | 96 |
| Y2K | RTL | "Projects" | 1 | 12 | 8 | no | 7 | - | - | - | - | - | 384 |
| Y2K | RTL | "Quarterly planning…" | 2 | 92 | 11 | yes | 5 | 12 | own line, after 11 label lines | yes | no | no | 576 |
| Y2K | RTL | "Infrastructure migrations…" | 2 | 0 | 35 | no | 31 | - | - | - | - | - | 1680 |
| Y2K | RTL | "Regional database…" | 3 | 20 | 40 | no | 35 | New | own line, after 40 label lines | no | no | yes | 1968 |

- Depth 1 is a top-level row. The label box is the label's own box. A break inside a word is a line break between two letters.
- A label is whole when its text stays inside its box.

## 200% text, desktop rail: the base (test)

| Theme | Direction | Rows | Rows that end in an ellipsis | Rows on one line | Row heights, px |
| --- | --- | --- | --- | --- | --- |
| Neutral | LTR | 5 | 4 | 5 | 40 |
| Neutral | RTL | 5 | 4 | 5 | 40 |
| Stone | LTR | 5 | 4 | 5 | 40 |
| Stone | RTL | 5 | 4 | 5 | 40 |
| Butter | LTR | 5 | 4 | 5 | 40 |
| Butter | RTL | 5 | 4 | 5 | 40 |
| Chocolate | LTR | 5 | 4 | 5 | 40 |
| Chocolate | RTL | 5 | 4 | 5 | 40 |
| Gothic | LTR | 5 | 5 | 5 | 48 |
| Gothic | RTL | 5 | 5 | 5 | 48 |
| Matcha | LTR | 5 | 5 | 5 | 48, 60 |
| Matcha | RTL | 5 | 5 | 5 | 48, 60 |
| Y2K | LTR | 5 | 5 | 5 | 48, 60 |
| Y2K | RTL | 5 | 5 | 5 | 48, 60 |

## 100% text: every SideNav story (test)

| Story | Frame | Rows | Rows on one line on both builds | Of those, identical in their own box | Rows that changed |
| --- | --- | --- | --- | --- | --- |
| default | identical | 5 | 5 | 5 | none |
| title-without-icon | identical | 3 | 3 | 3 | none |
| with-header-menu-items | identical | 1 | 1 | 1 | none |
| with-header-menu | identical | 2 | 2 | 2 | none |
| suite-header | identical | 2 | 2 | 2 | none |
| nested-items | identical | 5 | 5 | 5 | none |
| nested-long-labels | 7633 px differ | 5 | 2 | 2 | "Quarterly planning…", "Infrastructure migrations…", "Regional database…" |
| with-footer | identical | 2 | 2 | 2 | none |
| disabled-item | identical | 3 | 3 | 3 | none |
| hidden-section-header | identical | 3 | 3 | 3 | none |
| end-content | 3284 px differ | 8 | 7 | 7 | "A very…" |
| row-actions | identical | 6 | 6 | 6 | none |
| header-end-content | identical | 2 | 2 | 2 | none |
| header-end-content-action | identical | 1 | 1 | 1 | none |
| header-end-content-with-menu | identical | 1 | 1 | 1 | none |
| collapsible-items | identical | 18 | 18 | 18 | none |
| collapsible-sidebar | identical | 9 | 9 | 9 | none |
| resizable-in-app-shell | identical | 3 | 3 | 3 | none |
| iconless-nested-items | identical | 10 | 10 | 10 | none |
| collapse-focus | identical | 3 | 3 | 3 | none |
| collapse-focus-without-toggle | identical | 3 | 3 | 3 | none |
| section-end-content | identical | 2 | 2 | 2 | none |
| collapse-ownership | identical | 2 | 2 | 2 | none |
| inline-ref-collapse | identical | 2 | 2 | 2 | none |

- Each build's row is cropped at that build's own row box. So a row that only moves down still compares as identical.
- The identical frames are not published. Their sha256 values are in measurements.json.

## 100% text: the rows that change (test)

| Story | Row | Lines | Ends in an ellipsis | Row height, px | Badge position on the head | Badge at the row's inline end |
| --- | --- | --- | --- | --- | --- | --- |
| nested-long-labels | "Quarterly planning…" | 1 → 2 | yes → no | 32 → 40 | 12, beside the first line | yes |
| nested-long-labels | "Infrastructure migrations…" | 1 → 2 | yes → no | 32 → 40 | - | - |
| nested-long-labels | "Regional database…" | 1 → 3 | yes → no | 32 → 60 | New, beside the first line | yes |
| end-content | "A very…" | 1 → 3 | yes → no | 32 → 60 | 99, beside the first line | yes |

## The collapsed rail's tooltips (test)

| Story | Text size | Direction | Leaf | Tooltip text | At the leaf's inline end (base / head) | Tooltip box equal | Frame |
| --- | --- | --- | --- | --- | --- | --- | --- |
| nested-long-labels | 100% | LTR | Dashboard | "Dashboard" | yes / yes | yes | identical |
| nested-long-labels | 100% | RTL | Dashboard | "Dashboard" | yes / yes | yes | identical |
| nested-long-labels | 200% | LTR | Dashboard | "Dashboard" | yes / yes | yes | identical |
| nested-long-labels | 200% | RTL | Dashboard | "Dashboard" | yes / yes | yes | identical |
| collapsible-sidebar | 100% | LTR | Analytics | "Analytics" | yes / yes | yes | identical |

## The 390 px drawer (test)

| Text size | Row | Fits on one line on the base | Lines | Ends in an ellipsis | Row height, px | Own box | Label whole on the head | Breaks inside a word on the head |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 100% | "Dashboard" | yes | 1 → 1 | no → no | 32 → 32 | identical | yes | 0 |
| 100% | "Projects" | yes | 1 → 1 | no → no | 32 → 32 | identical | yes | 0 |
| 100% | "Quarterly planning…" | no | 1 → 2 | yes → no | 32 → 40 | size differs | yes | 0 |
| 100% | "Infrastructure migrations…" | yes | 1 → 1 | no → no | 32 → 32 | identical | yes | 0 |
| 100% | "Regional database…" | no | 1 → 2 | yes → no | 32 → 40 | size differs | yes | 0 |
| 200% | "Dashboard" | yes | 1 → 1 | no → no | 40 → 40 | identical | yes | 0 |
| 200% | "Projects" | yes | 1 → 1 | no → no | 40 → 40 | identical | yes | 0 |
| 200% | "Quarterly planning…" | no | 1 → 6 | yes → no | 40 → 240 | size differs | yes | 0 |
| 200% | "Infrastructure migrations…" | no | 1 → 5 | yes → no | 40 → 200 | size differs | yes | 1 |
| 200% | "Regional database…" | no | 1 → 5 | yes → no | 40 → 240 | size differs | yes | 0 |

- In each drawer still, one row shows its hover background: the row under the pointer, which stays where the navigation button was clicked.
- At 200%, that is the Projects row at load, on both builds.

## Method

- Chromium 149.0.7827.55 through Playwright. The rail is 1280 × 800 at scale 1. The drawer is 390 × 844 at scale 2.
- 200% text doubles the browser's default font size with the DevTools command `Page.setFontSizes`: standard 32 px, fixed 26 px.
- The themes are the 7 that the pull request's own spec lists, set with the Storybook `astryxTheme` global. Light mode only.
- A row's label is its longest text span outside the badge. Its lines are the distinct line tops of its text.
- A badge is beside the first line when its box starts above the label's first line ends.
- "Fit" is the pull request's own test: the longest word, the gap and the badge fit in the label area's width.
- Tooltips: Collapse sidebar is clicked, then the pointer rests on a leaf until its tooltip shows.
- At 200%, the long rows run below the visible list. So the stills scroll each row into view at its end.
- Three full runs gave the same readings for every row. The third run added the count of breaks inside a word.
- All numbers are test measurements from one machine. Every frame was looked at.

## Files

- `wrap200--<theme>--<dir>--<build>--top.png`: the nav at load.
- `wrap200--<theme>--<dir>--head--<row>-end.png`: the nav with that row scrolled into view at its end.
- `default100--<story>--<build>.png`: the two stories that change at 100% text.
- `tooltip--<story>--<size>--<dir>--<build>.png`: the collapsed rail with a leaf's tooltip.
- `drawer--<size>--<build>.png` and `drawer--200--<build>--<row>-end.png`: the drawer.
- `measurements.json`: every reading, the broken words and the summaries.
