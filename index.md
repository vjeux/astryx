# SideNav at 1a2ff3a2: nested rows with long labels stay inside the nav at 200% text

Head: #13192 at 1a2ff3a284e66db3c57402a189fe4a1451cc740d, `head` in file names. Main: 7ee32e5f847d024d5075cc570e5c80c8dd7e4d88, the head's merge base, `main` in file names. All numbers are test measurements.

## Answer (test)

- Expanded rail, 200% text: on main, the nested rows are 808.33 px wide, and end 580.33 px past the top-level rows.
- On main, their badges end 548.33 px past the nav's right edge. The nav clips the rows, so the labels are cut with no ellipsis, and no badge shows.
- On the head, every nested row is 228 px wide, the same as the top-level rows. Each badge ends 32 px inside the nav.
- On the head, each long label ends in an ellipsis. The deepest label has 4 px of room in the rail, so only a sliver of its first letter shows.
- Phone drawer: on main, the nested rows end 521.33 px past the top-level rows, and the badges 489.33 px past the drawer.
- On the head, the drawer's rows are 287 px wide, like the top-level rows. The badges end 32 px inside, and the labels end in an ellipsis.
- Collapsed rail's flyout: main and the head are pixel-identical. The flyout is 776.33 px wide, so every label shows in full, with its badge inside.
- Focus: 4 Tab presses reach the first nested row. On main, its ring has no right side, because the nav clips it at its right edge.
- On the head, the ring paints on all four sides. Its core contrast is at least 15.11 on the right, bottom and left sides.
- On the top side, it is at least 9.07 in light and 6.11 in dark, except at 4 positions where a letter touches the ring.
- Unchanged: Nested Items, End Content and Collapsible Sidebar are pixel-identical between the builds, at the default text size, in light and dark.

## The story on main

- Main has no "Nested Long Labels" story, and the story takes no args. So a scratch story, `scratch-story.tsx`, copies its render verbatim.
- The scratch story also copies the SideNav stories' centered layout and 480 px decorator. It is in neither pull request.
- Main renders the scratch story on a local Storybook build of 7ee32e5f.
- Control: the head's local build with the same scratch story equals the head's preview with its own story.

| Surface | Mode | Readings equal | Frames byte-identical |
| --- | --- | --- | --- |
| Expanded rail, 1280 × 800 | light | yes | 2 of 2 |
| Expanded rail, 1280 × 800 | dark | yes | 2 of 2 |
| Collapsed rail's flyout, 1280 × 800 | light | yes | 1 of 1 |
| Collapsed rail's flyout, 1280 × 800 | dark | yes | 1 of 1 |
| Phone drawer, 390 × 844 | light | yes | 1 of 1 |
| Phone drawer, 390 × 844 | dark | yes | 1 of 1 |

## 200% text

- The browser's default font size is doubled with the DevTools command `Page.setFontSizes`, standard 32 px and fixed 26 px.
- The repository's own SideNav text-size specs set it the same way. The page's root font size reads 32px.

## The rows (test)

| Surface | Build | Container, left–right (px) | Row | Depth | Row width, px | Row right edge, px | Past the top-level rows' right edge, px | Badge right edge, px | Badge past the container's right edge, px | Label room / label text width, px | Label ends in an ellipsis |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Expanded rail, 1280 × 800 | main | 460.97–720.97 | "Dashboard…" | 1 | 228 | 704.97 | 0 | - | - | - | - |
| Expanded rail, 1280 × 800 | main | 460.97–720.97 | "Projects…" | 1 | 228 | 704.97 | 0 | - | - | - | - |
| Expanded rail, 1280 × 800 | main | 460.97–720.97 | "Quarterly planning for the…" | 2 | 808.33 | 1285.3 | 580.33 | 1269.3 (12) | 548.33 | 654 / 654 | no, the whole label shows |
| Expanded rail, 1280 × 800 | main | 460.97–720.97 | "Infrastructure migrations …" | 2 | 808.33 | 1285.3 | 580.33 | - | - | 664 / 454 | no, the whole label shows |
| Expanded rail, 1280 × 800 | main | 460.97–720.97 | "Regional database failover…" | 3 | 808.33 | 1285.3 | 580.33 | 1269.3 (New) | 548.33 | 584 / 576 | no, the whole label shows |
| Expanded rail, 1280 × 800 | head | 460.97–720.97 | "Dashboard…" | 1 | 228 | 704.97 | 0 | - | - | - | - |
| Expanded rail, 1280 × 800 | head | 460.97–720.97 | "Projects…" | 1 | 228 | 704.97 | 0 | - | - | - | - |
| Expanded rail, 1280 × 800 | head | 460.97–720.97 | "Quarterly planning for the…" | 2 | 228 | 704.97 | 0 | 688.97 (12) | -32 | 73 / 654 | yes |
| Expanded rail, 1280 × 800 | head | 460.97–720.97 | "Infrastructure migrations …" | 2 | 228 | 704.97 | 0 | - | - | 84 / 454 | yes |
| Expanded rail, 1280 × 800 | head | 460.97–720.97 | "Regional database failover…" | 3 | 228 | 704.97 | 0 | 688.97 (New) | -32 | 4 / 576 | yes |
| Collapsed rail's flyout, 1280 × 800 | main | 495.67–1272 | "Quarterly planning for the…" | 1 | 760.33 | 1264 | 0 | 1248 (12) | -24 | 654 / 654 | no, the whole label shows |
| Collapsed rail's flyout, 1280 × 800 | main | 495.67–1272 | "Infrastructure migrations …" | 1 | 760.33 | 1264 | 0 | - | - | 664 / 454 | no, the whole label shows |
| Collapsed rail's flyout, 1280 × 800 | main | 495.67–1272 | "Regional database failover…" | 2 | 760.33 | 1264 | 0 | 1248 (New) | -24 | 584 / 576 | no, the whole label shows |
| Collapsed rail's flyout, 1280 × 800 | head | 495.67–1272 | "Quarterly planning for the…" | 1 | 760.33 | 1264 | 0 | 1248 (12) | -24 | 654 / 654 | no, the whole label shows |
| Collapsed rail's flyout, 1280 × 800 | head | 495.67–1272 | "Infrastructure migrations …" | 1 | 760.33 | 1264 | 0 | - | - | 664 / 454 | no, the whole label shows |
| Collapsed rail's flyout, 1280 × 800 | head | 495.67–1272 | "Regional database failover…" | 2 | 760.33 | 1264 | 0 | 1248 (New) | -24 | 584 / 576 | no, the whole label shows |
| Phone drawer, 390 × 844 | main | 0–390 | "Dashboard…" | 1 | 287 | 374 | 0 | - | - | - | - |
| Phone drawer, 390 × 844 | main | 0–390 | "Projects…" | 1 | 287 | 374 | 0 | - | - | - | - |
| Phone drawer, 390 × 844 | main | 0–390 | "Quarterly planning for the…" | 2 | 808.33 | 895.33 | 521.33 | 879.33 (12) | 489.33 | 654 / 654 | no, the whole label shows |
| Phone drawer, 390 × 844 | main | 0–390 | "Infrastructure migrations …" | 2 | 808.33 | 895.33 | 521.33 | - | - | 664 / 454 | no, the whole label shows |
| Phone drawer, 390 × 844 | main | 0–390 | "Regional database failover…" | 3 | 808.33 | 895.33 | 521.33 | 879.33 (New) | 489.33 | 584 / 576 | no, the whole label shows |
| Phone drawer, 390 × 844 | head | 0–390 | "Dashboard…" | 1 | 287 | 374 | 0 | - | - | - | - |
| Phone drawer, 390 × 844 | head | 0–390 | "Projects…" | 1 | 287 | 374 | 0 | - | - | - | - |
| Phone drawer, 390 × 844 | head | 0–390 | "Quarterly planning for the…" | 2 | 287 | 374 | 0 | 358 (12) | -32 | 132 / 654 | yes |
| Phone drawer, 390 × 844 | head | 0–390 | "Infrastructure migrations …" | 2 | 287 | 374 | 0 | - | - | 143 / 454 | yes |
| Phone drawer, 390 × 844 | head | 0–390 | "Regional database failover…" | 3 | 287 | 374 | 0 | 358 (New) | -32 | 63 / 576 | yes |

- Depth 1 is a top-level row. The container is the nav for the rail, and the visible dialog for the flyout and the drawer.
- "Label room" is the width of the label's box, and "label text width" is the width its text needs.
- A negative number means the badge ends inside the container. The dark readings equal the light ones.

## The focus ring on the first nested row (test)

| Mode | Build | Tab presses | Focused row | Outline | Ring sides painted: top / right / bottom / left | Ring box, x (px) | Nav box, x (px) | Ring core contrast, lowest on each side: top / right / bottom / left |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| light | main | 4 | "Quarterly planning for the…" | solid 2px rgb(27, 27, 27) offset 3px | 225/225 / 0/26 / 225/225 / 26/26 | 472–721 | 460.97–720.97 | 9.07 (4 positions 1.22) / not painted / 15.25 / 15.25 |
| light | head | 4 | "Quarterly planning for the…" | solid 2px rgb(27, 27, 27) offset 3px | 214/214 / 26/26 / 214/214 / 26/26 | 472–710 | 460.97–720.97 | 9.07 (4 positions 1.22) / 15.25 / 15.25 / 15.25 |
| dark | main | 4 | "Quarterly planning for the…" | solid 2px rgb(241, 241, 241) offset 3px | 225/225 / 0/26 / 225/225 / 26/26 | 472–721 | 460.97–720.97 | 6.11 (4 positions 1.13) / not painted / 15.25 / 15.11 |
| dark | head | 4 | "Quarterly planning for the…" | solid 2px rgb(241, 241, 241) offset 3px | 214/214 / 26/26 / 214/214 / 26/26 | 472–710 | 460.97–720.97 | 6.11 (4 positions 1.13) / 15.11 / 15.25 / 15.11 |

- Each side counts the positions along its straight part that have ring pixels. On main, the right side has none.
- On main, the ring box ends at 721 px, where the nav ends. The nav's overflow is hidden.
- The core is the band's strongest pixel at each position, against the pixel 2 px outside the band.
- At x 584 to 587 on the top side, the pixel outside the band is the "j" of "Proj…" in the row above. The ring there is the same color as elsewhere.
- `rail-focus--light--head--zoom-top.png` shows that spot, 8 times larger.

## Main against the head, per frame (test)

| Frame | Mode | Main against the head |
| --- | --- | --- |
| rail | light | 7243 px differ |
| rail-focus | light | 7564 px differ |
| rail | dark | 7226 px differ |
| rail-focus | dark | 7547 px differ |
| flyout | light | identical |
| flyout | dark | identical |
| drawer | light | 28980 px differ |
| drawer | dark | 28972 px differ |

## Unchanged stories, at the default text size (test)

| Story | Mode | Main against the head |
| --- | --- | --- |
| nested-items | light | pixel-identical |
| nested-items | dark | pixel-identical |
| end-content | light | pixel-identical |
| end-content | dark | pixel-identical |
| collapsible-sidebar | light | pixel-identical |
| collapsible-sidebar | dark | pixel-identical |

## Builds

- Head: the preview deploy of 1a2ff3a2, by its version.json (environment "preview").
- Main: the Production deploy of 7ee32e5f, by its version.json (environment "production"). It renders the unchanged stories.
- The new story on main: a local Storybook build of 7ee32e5f. The control: a local Storybook build of 1a2ff3a2.
- The version.json files and the pull request's head were the same at the start and the end of the run.

## Method

- Chromium 149.0.7827.55 through Playwright. The rail and the flyout are 1280 × 800 at scale 1. The drawer is 390 × 844 at scale 2.
- Light and dark come from the Storybook `colorMode` global.
- The rows are every visible `.astryx-side-nav-item` in the container, with each row's badge and long label.
- The flyout opens with a click on "Collapse sidebar", then on "Projects". The drawer opens with a click on the navigation button.
- Focus: Tab from page start until focus is on a row two groups deep.
- The ring is every pixel that differs between the rest frame and the focus frame, near the focused row.
- Per side, the ring is read along its straight part, 12 px in from each corner.
- All numbers are test measurements from one machine. Every frame was looked at.

## Files

- `rail--<mode>--<build>.png` and `rail-focus--<mode>--<build>.png`: the expanded rail, at rest and with the first nested row focused.
- `flyout--<mode>--<build>.png` and `drawer--<mode>--<build>.png`: the flyout and the phone drawer.
- `unchanged--<story>--<mode>--<build>.png`: the unchanged stories at the default text size.
- `scratch-story.tsx`: the scratch story.
- `measurements.json`: every reading and the summaries.
