# Table cell at ba80944c: a default cell measures its truncation on first hover or focus

Head: #11933 at ba80944c7ab26def7e767c8bd69dd7266d382050 (draft). Main: 7916ed572d8d9700bcb72c848d8cf0b9247650f4, the head's merge base. All numbers are test measurements.

## Answer (test)

- (1) At rest, a cut-off Table cell and a cut-off Text line are pixel-identical to main, in 2 of 2 stories. No tooltip shows at rest.
- (2) A hover shows the full-text tooltip exactly once, on the first hover and on the second, on both builds.
- Keyboard focus shows it exactly once too, on both builds. Each tooltip's text is the full text, and it goes away after the hover or Escape.
- (3) A cell whose text fits shows no tooltip on hover or on keyboard focus, on both builds.
- In all, 18 of 18 cut-off interactions show one tooltip, and 6 of 6 interactions on the cell that fits show none.

## What changed

- A default Table cell now measures whether its text is cut off when a hover, tap or focus reaches it, not when it mounts.
- These frames show what a reader sees, not when the measuring runs.

## Stories

- `core-table--overflow-behavior`: its second Table, "Truncate (with tooltip on hover)". It has two cut-off cells and the cell "Fits fine.".
- `core-text--single-line-truncation`: a cut-off Text line with `maxLines={1}`.
- The stories are the same on both builds.

## Keyboard focus

- The stock cells have no Tab stop: 0 elements in either story take Tab focus, on both builds.
- So for the keyboard rows, the harness sets `tabindex="0"` on the cell's own Text element. Then it presses the Tab key until that element has focus.
- The ring in the keyboard stills is the browser's focus ring on that element. It is the same on both builds.

## Builds

- Head: the preview deploy of ba80944c, by its version.json (environment "preview").
- Main: the Production deploy of 7916ed57, by its version.json (environment "production").
- The version.json files and the pull request's head were the same at the start and the end of the run.
- Main's #12443 changed `TruncationTooltip.tsx` after the pull request's earlier base. The head merges it, so this take covers that merge.

## (1) At rest (test)

| Story | Story area, px that differ | Whole viewport, px that differ | Tooltips at rest, main / head | Tab stops in the story, main / head |
| --- | --- | --- | --- | --- |
| `core-table--overflow-behavior` | 0 | 0 | 0 / 0 | 0 / 0 |
| `core-text--single-line-truncation` | 0 | 0 | 0 / 0 | 0 / 0 |

## (2) and (3) Hover and keyboard focus (test)

| Text | Cut off, scroll width > client width, px | Build | Interaction | Tooltip elements, most at once | Visible, most at once | Its text is the full text | Visible after leaving |
| --- | --- | --- | --- | --- | --- | --- | --- |
| table cell, cut off (Normal prose) | 642 > 296: yes | main | first hover | 1 | 1 | yes | 0 |
| table cell, cut off (Normal prose) | 642 > 296: yes | main | second hover | 1 | 1 | yes | 0 |
| table cell, cut off (Normal prose) | 642 > 296: yes | main | first keyboard focus (Tab ×1) | 1 | 1 | yes | 0 |
| table cell, cut off (Normal prose) | 642 > 296: yes | head | first hover | 1 | 1 | yes | 0 |
| table cell, cut off (Normal prose) | 642 > 296: yes | head | second hover | 1 | 1 | yes | 0 |
| table cell, cut off (Normal prose) | 642 > 296: yes | head | first keyboard focus (Tab ×1) | 1 | 1 | yes | 0 |
| table cell, cut off (Long unbroken string) | 570 > 296: yes | main | first hover | 1 | 1 | yes | 0 |
| table cell, cut off (Long unbroken string) | 570 > 296: yes | main | second hover | 1 | 1 | yes | 0 |
| table cell, cut off (Long unbroken string) | 570 > 296: yes | main | first keyboard focus (Tab ×1) | 1 | 1 | yes | 0 |
| table cell, cut off (Long unbroken string) | 570 > 296: yes | head | first hover | 1 | 1 | yes | 0 |
| table cell, cut off (Long unbroken string) | 570 > 296: yes | head | second hover | 1 | 1 | yes | 0 |
| table cell, cut off (Long unbroken string) | 570 > 296: yes | head | first keyboard focus (Tab ×1) | 1 | 1 | yes | 0 |
| table cell that fits (Fits fine.) | 296 > 296: no | main | first hover | 0 | 0 | - | 0 |
| table cell that fits (Fits fine.) | 296 > 296: no | main | second hover | 0 | 0 | - | 0 |
| table cell that fits (Fits fine.) | 296 > 296: no | main | first keyboard focus (Tab ×1) | 0 | 0 | - | 0 |
| table cell that fits (Fits fine.) | 296 > 296: no | head | first hover | 0 | 0 | - | 0 |
| table cell that fits (Fits fine.) | 296 > 296: no | head | second hover | 0 | 0 | - | 0 |
| table cell that fits (Fits fine.) | 296 > 296: no | head | first keyboard focus (Tab ×1) | 0 | 0 | - | 0 |
| Text line, cut off | 661 > 274: yes | main | first hover | 1 | 1 | yes | 0 |
| Text line, cut off | 661 > 274: yes | main | second hover | 1 | 1 | yes | 0 |
| Text line, cut off | 661 > 274: yes | main | first keyboard focus (Tab ×1) | 1 | 1 | yes | 0 |
| Text line, cut off | 661 > 274: yes | head | first hover | 1 | 1 | yes | 0 |
| Text line, cut off | 661 > 274: yes | head | second hover | 1 | 1 | yes | 0 |
| Text line, cut off | 661 > 274: yes | head | first keyboard focus (Tab ×1) | 1 | 1 | yes | 0 |

- The tooltip count is sampled at 100, 300, 600, 1000, 1500 and 2500 ms after the hover or the focus starts.
- A tooltip counts when its element has role="tooltip". It counts as visible when its box is not empty and it is not hidden.

## Method

- Chromium 149.0.7827.55 through Playwright, 1280 × 800 px at scale 2, light.
- The hover is a real mouse. The first and the second hover are on the same page load, with the mouse moved away between them.
- Each keyboard row is on a fresh page load, so the focus is the first interaction there.
- The rest frames are taken when three screenshots in a row are identical. The hover and focus stills are at 1000 ms.
- Every frame was looked at.

## Files

- `rest--<story>--main-vs-head.png`: the story at rest, main on the left and head on the right.
- `<interaction>--<text>--main-vs-head.png`: the text and its tooltip at 1000 ms, main on the left and head on the right.
- `measurements.json`: every reading and sample.
