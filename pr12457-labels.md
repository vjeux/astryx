# SegmentedControl under Dynamic Type: main and head frames (#12457)

- Builds: main be5d290db9, head d462abb22c (pull request #12457).
- Device: the iOS Simulator with Safari. Each screenshot is 828 × 1792 px, 414 × 896 pt at 2x. Each take reads its Dynamic Type size back with `simctl ui content_size`.
- Stories: SegmentedControl "Default" (`core-segmentedcontrol--default`) and "Size variants" (`core-segmentedcontrol--size-variants`).
- Sizes: the default size (Large), AX3 (accessibility-extra-large), AX4 (accessibility-extra-extra-large) and AX5 (accessibility-extra-extra-extra-large). AX5 also runs with the page forced to 390 px wide, and with the RTL direction global.
- Each frame is the page content of one full screenshot, cropped without resampling. The crop leaves out the iOS status bar, a capture marker row at the top of the page and Safari's toolbar. Main and head share the same crop at each size.
- Heights and widths are CSS px, measured in the page after it settles. "Segment" is the segment button's height. "Label line box" is the height of the label's box, and "text" is the height of its text box. "Track" is the control's width.
- All numbers are test data from the Simulator.

## Default story

| Frame | Build | Dynamic Type size | Segment | Label line box (text) | Track | What the frame shows |
|---|---|---|---|---|---|---|
| pr12457-default-default-main-be5d290db9.png | main be5d290db9 | default (Large) | 24 | 24 (20) | 183 | Grid · List · Table, all whole, inside the track. |
| pr12457-default-default-head-d462abb22c.png | head d462abb22c | default (Large) | 24 | 24 (20) | 183 | Grid · List · Table, all whole, inside the track. |
| pr12457-default-ax3-main-be5d290db9.png | main be5d290db9 | AX3 | 24 | 56 (46) | 304 | Grid · List · Table, all whole. The labels are taller than the track and spill above and below it. |
| pr12457-default-ax3-head-d462abb22c.png | head d462abb22c | AX3 | 56 | 56 (46) | 304 | Grid · List · Table, all whole, inside the track. |
| pr12457-default-ax4-main-be5d290db9.png | main be5d290db9 | AX4 | 24 | 66 (54) | 341 | Grid · List · Table, all whole. The labels spill above and below the track. |
| pr12457-default-ax4-head-d462abb22c.png | head d462abb22c | AX4 | 66 | 66 (54) | 341 | Grid · List · Table, all whole, inside the track. |
| pr12457-default-ax5-main-be5d290db9.png | main be5d290db9 | AX5 | 24 | 74 (61) | 374 | Grid · List · Table, all whole. The labels spill above and below the track. |
| pr12457-default-ax5-head-d462abb22c.png | head d462abb22c | AX5 | 74 | 74 (61) | 374 | Grid · List · Table, all whole, inside the track. |
| pr12457-default-ax5-w390-main-be5d290db9.png | main be5d290db9 | AX5, page 390 px wide | 24 | 74 (61) | 358 | "Gr…" · "Li…" · "Tab…" (each cut with an ellipsis inside its segment). The labels spill above and below the track. |
| pr12457-default-ax5-w390-head-d462abb22c.png | head d462abb22c | AX5, page 390 px wide | 74 | 74 (61) | 358 | "Gr…" · "Li…" · "Tab…" (each cut with an ellipsis inside its segment), inside the track. |
| pr12457-default-ax5-rtl-main-be5d290db9.png | main be5d290db9 | AX5, RTL | 24 | 74 (61) | 374 | Left to right: Table · List · Grid (Grid, selected, at the right), all whole. The labels spill above and below the track. |
| pr12457-default-ax5-rtl-head-d462abb22c.png | head d462abb22c | AX5, RTL | 74 | 74 (61) | 374 | Left to right: Table · List · Grid (Grid, selected, at the right), all whole, inside the track. |

## Size variants story

Each frame shows three rows: "Small", "Medium (default)" and "Large". The heights list the rows in that order.

| Frame | Build | Dynamic Type size | Segment (small / medium / large) | Label line box (text) | Track | What the frame shows |
|---|---|---|---|---|---|---|
| pr12457-size-variants-default-main-be5d290db9.png | main be5d290db9 | default (Large) | 20 / 24 / 28 | 21 (18) / 24 (20) / 24 (20) | 165 / 202 / 202 | Day · Week · Month in all three rows, all whole, inside the tracks. |
| pr12457-size-variants-default-head-d462abb22c.png | head d462abb22c | default (Large) | 21 / 24 / 28 | 21 (18) / 24 (20) / 24 (20) | 165 / 202 / 202 | Day · Week · Month in all three rows, all whole, inside the tracks. |
| pr12457-size-variants-ax3-main-be5d290db9.png | main be5d290db9 | AX3 | 20 / 24 / 28 | 53 (43) / 56 (46) / 56 (46) | 313 / 351 / 351 | Day · Week · Month in all three rows, all whole. The labels spill above and below the tracks. |
| pr12457-size-variants-ax3-head-d462abb22c.png | head d462abb22c | AX3 | 53 / 56 / 56 | 53 (43) / 56 (46) / 56 (46) | 313 / 351 / 351 | Day · Week · Month in all three rows, all whole, inside the tracks. |
| pr12457-size-variants-ax4-main-be5d290db9.png | main be5d290db9 | AX4 | 20 / 24 / 28 | 61 (49) / 66 (54) / 66 (54) | 350 / 382 / 382 | Small: Day · Week · Month, whole. Medium and Large: "D…" · "We…" · "Mon…". The labels spill above and below the tracks. |
| pr12457-size-variants-ax4-head-d462abb22c.png | head d462abb22c | AX4 | 61 / 66 / 66 | 61 (49) / 66 (54) / 66 (54) | 350 / 382 / 382 | Small: Day · Week · Month, whole. Medium and Large: "D…" · "We…" · "Mon…". All inside the tracks. |
| pr12457-size-variants-ax5-main-be5d290db9.png | main be5d290db9 | AX5 | 20 / 24 / 28 | 71 (58) / 74 (61) / 74 (61) | 382 / 382 / 382 | Small: "D…" · "We…" · "Mon…". Medium and Large: "D…" · "We…" · "Mo…". The labels spill above and below the tracks. |
| pr12457-size-variants-ax5-head-d462abb22c.png | head d462abb22c | AX5 | 71 / 74 / 74 | 71 (58) / 74 (61) / 74 (61) | 382 / 382 / 382 | Small: "D…" · "We…" · "Mon…". Medium and Large: "D…" · "We…" · "Mo…". All inside the tracks. |
| pr12457-size-variants-ax5-w390-main-be5d290db9.png | main be5d290db9 | AX5, page 390 px wide | 20 / 24 / 28 | 71 (58) / 74 (61) / 74 (61) | 358 / 358 / 358 | Small: "D…" · "We…" · "Mo…". Medium and Large: "D…" · "W…" · "Mo…". The labels spill above and below the tracks. |
| pr12457-size-variants-ax5-w390-head-d462abb22c.png | head d462abb22c | AX5, page 390 px wide | 71 / 74 / 74 | 71 (58) / 74 (61) / 74 (61) | 358 / 358 / 358 | Small: "D…" · "We…" · "Mo…". Medium and Large: "D…" · "W…" · "Mo…". All inside the tracks. |
| pr12457-size-variants-ax5-rtl-main-be5d290db9.png | main be5d290db9 | AX5, RTL | 20 / 24 / 28 | 71 (58) / 74 (61) / 74 (61) | 382 / 382 / 382 | Captions at the right. Left to right, Small: "…onth" · "…eek" · "…y". Medium and Large: "…nth" · "…ek" · "…y". The ellipsis is at each label's left (its reading end), and the selected "…y" (Day) is at the right. The labels spill above and below the tracks. |
| pr12457-size-variants-ax5-rtl-head-d462abb22c.png | head d462abb22c | AX5, RTL | 71 / 74 / 74 | 71 (58) / 74 (61) / 74 (61) | 382 / 382 / 382 | Captions at the right. Left to right, Small: "…onth" · "…eek" · "…y". Medium and Large: "…nth" · "…ek" · "…y". The ellipsis is at each label's left (its reading end), and the selected "…y" (Day) is at the right. All inside the tracks. |
