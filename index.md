# TableRowExpansion at c9d23901: the expanded row's divider rule moves into TableCell, and the table looks the same

Head: #13359 at c9d239011c8d631e0c1af36f7f4e5d0ceedb04be, `head` in file names. Main: 67b821f39b7d30b703570f350c258232e80095e6, the head's merge base, `main` in file names. All numbers are test measurements.

## Answer (test)

- Desktop Chromium: 12 of 12 frames are pixel-identical between head and main. They cover dividers "rows" and "grid", light and dark, and three states.
- The three states are: collapsed, row 1 expanded, and row 1 expanded with the table scrolled under its pinned Customer column.
- Physical iPhone 14: 4 of 4 pairs are pixel-identical, rows and grid, light and dark, with row 1 expanded. A recount from the decoded pixels agrees.
- With row 1 expanded, its cells draw a 0px bottom border on both builds, and the panel below them draws the 1px divider.
- Collapsed, row 1's cells draw a 1px bottom border on both builds.
- The pixels agree. Just above row 1's bottom edge they show the background, and just above the panel's bottom edge the divider colour.

## What changed

- The rule that drops an expanded row's own divider moves from the row expansion plugin's style into TableCell.
- TableCell now matches its row with `:has(+ [data-expansion-panel])`. The values are the same: 0 for the border and for the private divider width.
- The pull request also renders only the toggled row's chevron and panel on a toggle. These frames show the result, not the render count.

## Builds

- Head: the preview deploy of c9d23901, by its version.json (environment "preview").
- Main: the Production deploy of 67b821f3, by its version.json (environment "production"). The iPhone run reads the same two deploys.
- The version.json files and the pull request's head were the same at the start and the end of the desktop run.

## Desktop Chromium (test)

| Dividers | Mode | Frame | Head against main | Row 1 cells: bottom border, divider width | The row below row 1 | Its cells: bottom border | Pixels just above row 1's bottom edge | Pixels just above the next row's bottom edge |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| rows | light | collapsed | pixel-identical, readings equal | 1px, 1px | row 2 | 1px | 235, 235, 235 (100%) | 235, 235, 235 (100%) |
| rows | light | row 1 expanded | pixel-identical, readings equal | 0px, 0px | its panel | 1px | 255, 255, 255 (100%) | 235, 235, 235 (100%) |
| rows | light | row 1 expanded, scrolled to the end | pixel-identical, readings equal | 0px, 0px | its panel | 1px | 255, 255, 255 (99.1%); 230, 230, 230 (0.1%) | 235, 235, 235 (100%) |
| grid | light | collapsed | pixel-identical, readings equal | 1px, 1px | row 2 | 1px | 235, 235, 235 (99.5%); 217, 217, 217 (0.5%) | 235, 235, 235 (99.5%); 217, 217, 217 (0.5%) |
| grid | light | row 1 expanded | pixel-identical, readings equal | 0px, 0px | its panel | 1px | 255, 255, 255 (99.5%); 235, 235, 235 (0.5%) | 235, 235, 235 (99.5%); 217, 217, 217 (0.5%) |
| grid | light | row 1 expanded, scrolled to the end | pixel-identical, readings equal | 0px, 0px | its panel | 1px | 255, 255, 255 (98.7%); 230, 230, 230 (0.2%) | 235, 235, 235 (99.7%); 217, 217, 217 (0.3%) |
| rows | dark | collapsed | pixel-identical, readings equal | 1px, 1px | row 2 | 1px | 60, 60, 60 (59.4%); 50, 50, 50 (40.6%) | 60, 60, 60 (59.4%); 50, 50, 50 (40.6%) |
| rows | dark | row 1 expanded | pixel-identical, readings equal | 0px, 0px | its panel | 1px | 38, 38, 38 (59.4%); 27, 27, 27 (40.6%) | 60, 60, 60 (100%) |
| rows | dark | row 1 expanded, scrolled to the end | pixel-identical, readings equal | 0px, 0px | its panel | 1px | 38, 38, 38 (58.5%); 27, 27, 27 (40.7%) | 60, 60, 60 (100%) |
| grid | dark | collapsed | pixel-identical, readings equal | 1px, 1px | row 2 | 1px | 60, 60, 60 (59.1%); 50, 50, 50 (40.4%) | 60, 60, 60 (59.1%); 50, 50, 50 (40.4%) |
| grid | dark | row 1 expanded | pixel-identical, readings equal | 0px, 0px | its panel | 1px | 38, 38, 38 (59.1%); 27, 27, 27 (40.4%) | 60, 60, 60 (99.5%); 79, 79, 79 (0.5%) |
| grid | dark | row 1 expanded, scrolled to the end | pixel-identical, readings equal | 0px, 0px | its panel | 1px | 38, 38, 38 (58.3%); 27, 27, 27 (40.6%) | 60, 60, 60 (99.7%); 79, 79, 79 (0.3%) |

- The table scrolls sideways: its scroller is 920 px wide and shows 640 px, so the scrolled frames are at 280 px.
- The collapsed frames are not published, since they are identical. measurements.json holds their sha256 values.

## Physical iPhone 14 (test)

| Dividers | Mode | Main 67b821f3 | Head c9d23901 | Diff image | Differing px, the iPhone run's count | Differing px, recounted here | Of px |
| --- | --- | --- | --- | --- | --- | --- | --- |
| rows | light | `13359-iphone-rows-light-main-67b821f3.png` | `13359-iphone-rows-light-head-c9d23901.png` | `13359-iphone-rows-light-diff.png` | 0 | 0 | 2397330 |
| rows | dark | `13359-iphone-rows-dark-main-67b821f3.png` | `13359-iphone-rows-dark-head-c9d23901.png` | `13359-iphone-rows-dark-diff.png` | 0 | 0 | 2397330 |
| grid | light | `13359-iphone-grid-light-main-67b821f3.png` | `13359-iphone-grid-light-head-c9d23901.png` | `13359-iphone-grid-light-diff.png` | 0 | 0 | 2397330 |
| grid | dark | `13359-iphone-grid-dark-main-67b821f3.png` | `13359-iphone-grid-dark-head-c9d23901.png` | `13359-iphone-grid-dark-diff.png` | 0 | 0 | 2397330 |

- Physical iPhone 14, iOS 26.2, Mobile Safari 26.2, 390 × 844 pt at 3x. Each build's version.json was read on the phone first.
- Row 1 is expanded by a tap on its toggle in the page, with a 2.8 s settle. The Customer column is pinned, as in the story.
- Each still is the phone's screenshot cropped to the page area: 1170 × 2049 px from y 141, with no status bar or browser bar.
- The iPhone run's count uses ImageMagick's AE metric at fuzz 0%. Its diff images mark differing pixels in red over a faded main.

## Method

- Desktop: Chromium 149.0.7827.55 through Playwright, 1280 × 800 px at scale 2. Light and dark come from the Storybook `colorMode` global.
- The story is `core-tablerowexpansion--gliding-rows`, with `dividers` at "rows" (the default) and at "grid".
- Row 1 expands by a real mouse click on its chevron. Each frame is taken when three screenshots in a row are identical.
- The desktop stills are the story's container with 8 device px around it.
- The edge pixels are the most frequent colours on the row of device pixels just above a row's bottom edge, across the row.
- The iPhone stills keep their pixels, and their JSON keeps its bytes. Only the PNGs' tIME and text chunks are removed.
- Every frame was looked at. All numbers are test measurements.

## Files

- `desktop-gliding-rows--<dividers>--<state>--<mode>--<build>.png`: the desktop frames, row 1 expanded and expanded-scrolled.
- `13359-iphone-<dividers>-<mode>-<build>.png` and `…-diff.png`: the iPhone stills and their diff images.
- `13359-iphone-stills.json`: the iPhone run's method, files and counts.
- `measurements.json`: every desktop reading, both halves' counts and the recount.
