# Course Detail page template (#12934), round 4: 7b7b3b9a

Commit 7b7b3b9ab3c2c8d997c90f2d7c0754329677e734, now the pull request's head: fixes on mego1123's copy fix 9c26ce2d, which sits on the earlier head 5e65026bf6b8d42b4f24958f2b23813fa7333d67 (a8529880 with main 0dad3454 merged in). It changes only `packages/cli/assets/templates/pages/course-detail/page.tsx`. Against round 3's candidate f193ed68, the change is 9c26ce2d's copy: the preview count's noun agrees with the count, and the poster note starts with a capital. Round 3's candidate f193ed68 was not pushed. Round 3's frames and index are in [round3-f193ed68/](round3-f193ed68/README.md). For scale, main's `product-detail` page template comes from the same build. The earlier head's frames are round 1's: https://github.com/vjeux/astryx/blob/e85d21dbc409701869594f702a454bf6adeecaf7/README.md

Each page is the Sandbox app's own template route (`/templates/<id>/?embed=1&theme=neutral&mode=<light|dark>`), built from that commit and shown in Chromium 149.0.7827.55 with no network access. The Sandbox asks a font host for the neutral theme's Figtree; with no network, the theme package's own copy of the same faces answered those requests (its `fonts.css` and woff2 files), so the text draws in Figtree: each page reports Figtree 400, 500, 600 and 700 loaded. Requests to any other origin: 0. Page errors: 0.

Sizes: 1280 × 800 with a mouse at 1×, and 390 × 844 with touch at 2×. Each size is captured in light and in dark. The page scrolls inside its own layout, so a full-page frame grows the window to the content's height; frames taller than 15000 device pixels come in parts.

## The copy spots (round 4)

The copy that 9c26ce2d changes, at each size and scheme: the exact text, its box against its content (box/content width; a cut text has a smaller box), and how many texts in that state are under contrast. PASS or FAIL judges 7b7b3b9a.

| Spot | Size, scheme | 5e65026b (earlier head) | f193ed68 (round 3) | 7b7b3b9a (round 4) | Result |
|---|---|---|---|---|---|
| Poster note under the preview button | 1280 light | "three preview lessons · no card needed" 209/209 px; 0 under contrast | "three preview lessons · no card needed" 209/209 px; 0 under contrast | "Three preview lessons · no card needed" 211/211 px; 0 under contrast | PASS |
| Preview dialog subtitle | 1280 light | "The three preview lessons are free — no card needed."; dialog 1280/1280 px; 0 under contrast | "The three preview lessons are free — no card needed."; dialog 1280/1280 px; 0 under contrast | "The three preview lessons are free — no card needed."; dialog 1280/1280 px; 0 under contrast | PASS |
| Closing band paragraph | 1280 light | not measured | not measured | "The three preview lessons are free, the project ships with your enrolment, and the first cohort starts in March." 540/540 px; 0 under contrast | PASS |
| Poster note under the preview button | 1280 dark | "three preview lessons · no card needed" 209/209 px; 0 under contrast | "three preview lessons · no card needed" 209/209 px; 0 under contrast | "Three preview lessons · no card needed" 211/211 px; 0 under contrast | PASS |
| Preview dialog subtitle | 1280 dark | "The three preview lessons are free — no card needed."; dialog 1280/1280 px; 0 under contrast | "The three preview lessons are free — no card needed."; dialog 1280/1280 px; 0 under contrast | "The three preview lessons are free — no card needed."; dialog 1280/1280 px; 0 under contrast | PASS |
| Closing band paragraph | 1280 dark | not measured | not measured | "The three preview lessons are free, the project ships with your enrolment, and the first cohort starts in March." 540/540 px; 0 under contrast | PASS |
| Poster note under the preview button | 390 light | "three preview lessons · no card needed" 171/171 px; 0 under contrast | "three preview lessons · no card needed" 244/244 px; 0 under contrast | "Three preview lessons · no card needed" 246/246 px; 0 under contrast | PASS |
| Preview dialog subtitle | 390 light | "The three preview lessons are free — no card needed."; dialog 390/390 px; 0 under contrast | "The three preview lessons are free — no card needed."; dialog 390/390 px; 0 under contrast | "The three preview lessons are free — no card needed."; dialog 390/390 px; 0 under contrast | PASS |
| Closing band paragraph | 390 light | not measured | not measured | "The three preview lessons are free, the project ships with your enrolment, and the first cohort starts in March." 294/294 px; 0 under contrast | PASS |
| Poster note under the preview button | 390 dark | "three preview lessons · no card needed" 171/171 px; 0 under contrast | "three preview lessons · no card needed" 244/244 px; 0 under contrast | "Three preview lessons · no card needed" 246/246 px; 0 under contrast | PASS |
| Preview dialog subtitle | 390 dark | "The three preview lessons are free — no card needed."; dialog 390/390 px; 0 under contrast | "The three preview lessons are free — no card needed."; dialog 390/390 px; 0 under contrast | "The three preview lessons are free — no card needed."; dialog 390/390 px; 0 under contrast | PASS |
| Closing band paragraph | 390 dark | not measured | not measured | "The three preview lessons are free, the project ships with your enrolment, and the first cohort starts in March." 294/294 px; 0 under contrast | PASS |

## PR Review checklist (round 4: the five fixes)

Each item is measured on 7b7b3b9a, on round 3's candidate f193ed68 and on the earlier head 5e65026b, each built in the sandbox and read by the same probe. PASS or FAIL judges 7b7b3b9a.

| Item | Scheme | 5e65026b (earlier head) | f193ed68 (round 3) | 7b7b3b9a (round 4) | Result |
|---|---|---|---|---|---|
| (1) 390: "See the preview lessons" shows its whole label; its note wraps below | light | label 115 of 173 px; note beside the button | label 173 of 173 px; note below the button | label 173 of 173 px; note below the button | PASS |
| (2) 390: the syllabus "Preview" badges keep their width (box/content) | light | 33/50, 33/50, 39/50 px | 50/50, 50/50, 50/50 px | 50/50, 50/50, 50/50 px | PASS |
| (3) 390: the FAQ number badges keep their width (box/content) | light | "1" 4/15, "2" 8/8, "3" 7/17, "4" 9/9 px | "1" 6/6, "2" 8/8, "3" 8/8, "4" 9/9 px | "1" 6/6, "2" 8/8, "3" 8/8, "4" 9/9 px | PASS |
| (3) 1280: the FAQ number badges keep their width (box/content) | light | "1" 5/5, "2" 7/7, "3" 7/7, "4" 8/8 px | "1" 5/5, "2" 7/7, "3" 7/7, "4" 8/8 px | "1" 5/5, "2" 7/7, "3" 7/7, "4" 8/8 px | PASS |
| (4a) 1280: the review search keeps one width while typing (06 before typing; 07 and 08 with text) | light | 06: 214.8 px; 07: 380 px; 08: 380.1 px | 06: 200 px; 07: 200 px; 08: 200 px | 06: 200 px; 07: 200 px; 08: 200 px | PASS |
| (4b) 1280: Search, Rating and Newest/Helpful stay on one row, before and while typing | light | 06: one row; 07: Sort below, Rating on; 08: Sort below, Rating on | 06: one row; 07: one row; 08: one row | 06: one row; 07: one row; 08: one row | PASS |
| (5) 1280: a syllabus search hit ("reranker") lists only the matching lessons, as many as announced | light | 4 shown; announced "1 lesson match “reranker”" | 1 shown; announced "1 lesson match “reranker”" | 1 shown; announced "1 lesson match “reranker”" | PASS |
| (5) 390: a syllabus search hit ("reranker") lists only the matching lessons, as many as announced | light | 4 shown; announced "1 lesson match “reranker”" | 1 shown; announced "1 lesson match “reranker”" | 1 shown; announced "1 lesson match “reranker”" | PASS |
| (1) 390: "See the preview lessons" shows its whole label; its note wraps below | dark | label 115 of 173 px; note beside the button | label 173 of 173 px; note below the button | label 173 of 173 px; note below the button | PASS |
| (2) 390: the syllabus "Preview" badges keep their width (box/content) | dark | 33/50, 33/50, 39/50 px | 50/50, 50/50, 50/50 px | 50/50, 50/50, 50/50 px | PASS |
| (3) 390: the FAQ number badges keep their width (box/content) | dark | "1" 4/15, "2" 8/8, "3" 7/17, "4" 9/9 px | "1" 6/6, "2" 8/8, "3" 8/8, "4" 9/9 px | "1" 6/6, "2" 8/8, "3" 8/8, "4" 9/9 px | PASS |
| (3) 1280: the FAQ number badges keep their width (box/content) | dark | "1" 5/5, "2" 7/7, "3" 7/7, "4" 8/8 px | "1" 5/5, "2" 7/7, "3" 7/7, "4" 8/8 px | "1" 5/5, "2" 7/7, "3" 7/7, "4" 8/8 px | PASS |
| (4a) 1280: the review search keeps one width while typing (06 before typing; 07 and 08 with text) | dark | 06: 214.8 px; 07: 380 px; 08: 380.1 px | 06: 200 px; 07: 200 px; 08: 200 px | 06: 200 px; 07: 200 px; 08: 200 px | PASS |
| (4b) 1280: Search, Rating and Newest/Helpful stay on one row, before and while typing | dark | 06: one row; 07: Sort below, Rating on; 08: Sort below, Rating on | 06: one row; 07: one row; 08: one row | 06: one row; 07: one row; 08: one row | PASS |
| (5) 1280: a syllabus search hit ("reranker") lists only the matching lessons, as many as announced | dark | 4 shown; announced "1 lesson match “reranker”" | 1 shown; announced "1 lesson match “reranker”" | 1 shown; announced "1 lesson match “reranker”" | PASS |
| (5) 390: a syllabus search hit ("reranker") lists only the matching lessons, as many as announced | dark | 4 shown; announced "1 lesson match “reranker”" | 1 shown; announced "1 lesson match “reranker”" | 1 shown; announced "1 lesson match “reranker”" | PASS |
| Regression: no horizontal overflow (cd-w1280-dark) | dark | 11 states: scrollWidth − clientWidth 0; 0 el, 0 lines past | 11 states: scrollWidth − clientWidth 0; 0 el, 0 lines past | 11 states: scrollWidth − clientWidth 0; 0 el, 0 lines past | PASS |
| Regression: no horizontal overflow (cd-w1280-light) | light | 11 states: scrollWidth − clientWidth 0; 0 el, 0 lines past | 11 states: scrollWidth − clientWidth 0; 0 el, 0 lines past | 11 states: scrollWidth − clientWidth 0; 0 el, 0 lines past | PASS |
| Regression: no horizontal overflow (cd-w390-dark) | dark | 11 states: scrollWidth − clientWidth 0; 0 el, 0 lines past | 11 states: scrollWidth − clientWidth 0; 0 el, 0 lines past | 11 states: scrollWidth − clientWidth 0; 0 el, 0 lines past | PASS |
| Regression: no horizontal overflow (cd-w390-light) | light | 11 states: scrollWidth − clientWidth 0; 0 el, 0 lines past | 11 states: scrollWidth − clientWidth 0; 0 el, 0 lines past | 11 states: scrollWidth − clientWidth 0; 0 el, 0 lines past | PASS |
| Regression: no horizontal overflow (pd-w1280-dark) | dark | 1 state: scrollWidth − clientWidth 0; 0 el, 0 lines past | 1 state: scrollWidth − clientWidth 0; 0 el, 0 lines past | 1 state: scrollWidth − clientWidth 0; 0 el, 0 lines past | PASS |
| Regression: no horizontal overflow (pd-w1280-light) | light | 1 state: scrollWidth − clientWidth 0; 0 el, 0 lines past | 1 state: scrollWidth − clientWidth 0; 0 el, 0 lines past | 1 state: scrollWidth − clientWidth 0; 0 el, 0 lines past | PASS |
| Regression: no horizontal overflow (pd-w390-dark) | dark | 1 state: scrollWidth − clientWidth 0; 0 el, 0 lines past | 1 state: scrollWidth − clientWidth 0; 0 el, 0 lines past | 1 state: scrollWidth − clientWidth 0; 0 el, 0 lines past | PASS |
| Regression: no horizontal overflow (pd-w390-light) | light | 1 state: scrollWidth − clientWidth 0; 0 el, 0 lines past | 1 state: scrollWidth − clientWidth 0; 0 el, 0 lines past | 1 state: scrollWidth − clientWidth 0; 0 el, 0 lines past | PASS |

**Two states are cropped.** At 1280, the frames of `07-review-search-miss` and `08-rating-no-match` (light and dark) show only the review toolbar and the results under it: rows 536 to 643 of the 628 × 643 section frame. In the full frame, the ratings card above the toolbar ends in the row "4.6 / 4.7 / 4.5". OCR reads that row as one IPv4-like token, "4.64.74.5", and the media leak gate refuses the frame. The card is visible in the other frames, such as `06-review-sort-newest`. The measurements come from the page, so the crop does not change them. Round 3's frames of those states are cropped the same way.

## Summary

| Page, size, scheme | Overflow: doc scrollWidth/clientWidth; past viewport (not held) | Text under contrast | Text over images | State graphics under 3:1 | Focus rings at 3:1 | Text cut short by its own box | Icons |
|---|---|---|---|---|---|---|---|
| Course Detail 1280 light | 1280/1280; 0 el, 0 lines | 0 (full page: 164 texts, 163 pixel-checked) | 3/3 pass | 6 controls, 0 icons | 7/7 | 0 | 21 template (0 not drawn, 0 off-size); 14 from core components |
| Course Detail 1280 dark | 1280/1280; 0 el, 0 lines | 0 (full page: 164 texts, 163 pixel-checked) | 3/3 pass | 6 controls, 0 icons | 7/7 | 0 | 21 template (0 not drawn, 0 off-size); 14 from core components |
| Course Detail 390 touch light | 390/390; 0 el, 0 lines | 0 (full page: 154 texts, 154 pixel-checked) | none | 6 controls, 0 icons | 7/7 | 0 | 21 template (0 not drawn, 0 off-size); 14 from core components |
| Course Detail 390 touch dark | 390/390; 0 el, 0 lines | 0 (full page: 154 texts, 154 pixel-checked) | none | 6 controls, 0 icons | 7/7 | 0 | 21 template (0 not drawn, 0 off-size); 14 from core components |
| product-detail 1280 light | 1280/1280; 0 el, 0 lines | 0 (full page: 22 texts, 22 pixel-checked) | none | 4 controls, 1 icon | 4/4 | 0 | 2 template (0 not drawn, 0 off-size); 5 from core components |
| product-detail 1280 dark | 1280/1280; 0 el, 0 lines | 0 (full page: 22 texts, 22 pixel-checked) | none | 3 controls, 1 icon | 4/4 | 0 | 2 template (0 not drawn, 0 off-size); 5 from core components |
| product-detail 390 touch light | 390/390; 0 el, 0 lines | 0 (full page: 22 texts, 22 pixel-checked) | none | 4 controls, 1 icon | 4/4 | 0 | 2 template (0 not drawn, 0 off-size); 5 from core components |
| product-detail 390 touch dark | 390/390; 0 el, 0 lines | 0 (full page: 22 texts, 22 pixel-checked) | none | 3 controls, 1 icon | 4/4 | 0 | 2 template (0 not drawn, 0 off-size); 5 from core components |

The columns are measured, not judged by eye:

- Overflow: the document's scrollWidth against its clientWidth; elements whose box passes the viewport's left or right edge with no clipping or scrolling ancestor; and text lines (each line box of each text node) that pass the viewport or their clipping ancestor. "states" names any state with overflow.
- Text under contrast: every text, placeholder and typed input value is checked two ways. First, its computed color over the background colors behind it, down to the page canvas (the Canvas color of the root's color scheme). Second, wherever its lines are in a capture, its color over the median pixel under its line boxes with all text hidden. A text counts when the pixels put it under 4.5:1 (3:1 at large sizes), or, with no pixel check, when its computed colors do. Every state and every part of the full page is checked; the column counts each text once.
- Text over images: the pixels under each line box with all text hidden, against the text color. A line passes when 95% of those pixels reach its threshold.
  At 1280, the three are the button labels "Save" (pressed), "Start lesson one free" and "Apply to teach", each over its button's own CSS background-image; no text sits over a photo.
- State graphics: pixels inside each control with text hidden, against the median background in a band just outside it (95th percentile). A selected segment, a pressed toggle, every radio and slider counts. A text field counts its 1 px edge and its fill against the color just outside the element that draws it, and passes when either reaches 3:1. A progress bar counts its fill against its track, each sampled at its middle for the bar's value, and against the background. A control or icon behind an open modal dialog is not sampled. Icons are sampled the same way with text shown.
- Focus rings: one control of each kind, focused from the keyboard. The pixels that change against the unfocused frame (95th percentile change ratio).
- Icons: every icon each state shows, with its rendered size. A template icon is one whose path matches a Heroicons glyph in the package installed in the build (the 15 glyphs the template imports); the other icons are drawn by core components (for example the chevron of a collapsible section). "Not drawn" means no pixel reaches 1.5:1 against its background; "off-size" means a template icon that is not square or not 12, 16, 20 or 24 px.

## Findings

### Course Detail (the pull request)

- Course Detail 1280 light (02-save-pressed): toggle button "Save" (aria-pressed true): its painted shape, with text and icons hidden, reaches 1.41:1 against #ffffff. Pressed, the button also swaps the outline heart for a solid heart; icons are drawn in the text color, so this text-hidden sample leaves the heart out.
- Course Detail 1280 dark (02-save-pressed): toggle button "Save" (aria-pressed true): its painted shape, with text and icons hidden, reaches 1.53:1 against #121212. Pressed, the button also swaps the outline heart for a solid heart; icons are drawn in the text color, so this text-hidden sample leaves the heart out.
- Course Detail 390 touch light (02-save-pressed): toggle button "Save" (aria-pressed true): its painted shape, with text and icons hidden, reaches 1.26:1 against #ffffff. Pressed, the button also swaps the outline heart for a solid heart; icons are drawn in the text color, so this text-hidden sample leaves the heart out.
- Course Detail 390 touch dark (02-save-pressed): toggle button "Save" (aria-pressed true): its painted shape, with text and icons hidden, reaches 1.31:1 against #121212. Pressed, the button also swaps the outline heart for a solid heart; icons are drawn in the text color, so this text-hidden sample leaves the heart out.

### Course Detail: core component styles, measured the same way on main's product-detail

- Course Detail 1280 light (01-default, 06-review-sort-newest, 07-review-search-miss): segment button[role=radio] "All" (aria-checked true): its painted shape, with text and icons hidden, reaches 1.14:1 against #f0f0f0. Main's product-detail, same size and scheme: segment button[role=radio] "Snow" 1.14:1.
- Course Detail 1280 light (01-default, 06-review-sort-newest, 07-review-search-miss, 08-rating-no-match): segment button[role=radio] "Newest" (aria-checked true): its painted shape, with text and icons hidden, reaches 1.14:1 against #f0f0f0. Main's product-detail, same size and scheme: segment button[role=radio] "Snow" 1.14:1.
- Course Detail 1280 light (01-default, 02-save-pressed): segment button[role=radio] "Self-paced" (aria-checked true): its painted shape, with text and icons hidden, reaches 1.14:1 against #f0f0f0. Main's product-detail, same size and scheme: segment button[role=radio] "Snow" 1.14:1.
- Course Detail 1280 light (01-default, 06-review-sort-newest, 08-rating-no-match): a text field at rest: its edge #d4d4d4 (computed border 1px solid rgb(212, 212, 212)) reaches 1.48:1, and its fill #ffffff 1:1, against #ffffff outside it. Main's product-detail, same size and scheme: text field input[role=spinbutton] "" 1.48:1.
- Course Detail 1280 light (08-rating-no-match): segment button[role=radio] "5 star" (aria-checked true): its painted shape, with text and icons hidden, reaches 1.14:1 against #f0f0f0. Main's product-detail, same size and scheme: segment button[role=radio] "Snow" 1.14:1.
- Course Detail 1280 dark (01-default, 06-review-sort-newest, 07-review-search-miss): segment button[role=radio] "All" (aria-checked true): its painted shape, with text and icons hidden, reaches 1.37:1 against #3c3c3c. Main's product-detail, same size and scheme: segment button[role=radio] "Snow" 1.05:1.
- Course Detail 1280 dark (01-default, 06-review-sort-newest, 07-review-search-miss, 08-rating-no-match): segment button[role=radio] "Newest" (aria-checked true): its painted shape, with text and icons hidden, reaches 1.37:1 against #3c3c3c. Main's product-detail, same size and scheme: segment button[role=radio] "Snow" 1.05:1.
- Course Detail 1280 dark (01-default, 02-save-pressed): segment button[role=radio] "Self-paced" (aria-checked true): its painted shape, with text and icons hidden, reaches 1.18:1 against #323232. Main's product-detail, same size and scheme: segment button[role=radio] "Snow" 1.05:1.
- Course Detail 1280 dark (01-default, 06-review-sort-newest, 08-rating-no-match): a text field at rest: its edge #525252 (computed border 1px solid rgb(82, 82, 82)) reaches 1.94:1, and its fill #262626 1:1, against #262626 outside it. Main's product-detail, same size and scheme: text field input[role=spinbutton] "" 2.4:1.
- Course Detail 1280 dark (08-rating-no-match): segment button[role=radio] "5 star" (aria-checked true): its painted shape, with text and icons hidden, reaches 1.37:1 against #3c3c3c. Main's product-detail, same size and scheme: segment button[role=radio] "Snow" 1.05:1.
- Course Detail 390 touch light (01-default, 06-review-sort-newest, 07-review-search-miss): segment button[role=radio] "All" (aria-checked true): its painted shape, with text and icons hidden, reaches 1.14:1 against #f0f0f0. Main's product-detail, same size and scheme: segment button[role=radio] "Snow" 1.14:1.
- Course Detail 390 touch light (01-default, 06-review-sort-newest, 07-review-search-miss, 08-rating-no-match): segment button[role=radio] "Newest" (aria-checked true): its painted shape, with text and icons hidden, reaches 1.14:1 against #f0f0f0. Main's product-detail, same size and scheme: segment button[role=radio] "Snow" 1.14:1.
- Course Detail 390 touch light (01-default): segment button[role=radio] "Self-paced" (aria-checked true): its painted shape, with text and icons hidden, reaches 1.14:1 against #f0f0f0. Main's product-detail, same size and scheme: segment button[role=radio] "Snow" 1.14:1.
- Course Detail 390 touch light (01-default, 06-review-sort-newest, 08-rating-no-match): a text field at rest: its edge #d4d4d4 (computed border 1px solid rgb(212, 212, 212)) reaches 1.48:1, and its fill #ffffff 1:1, against #ffffff outside it. Main's product-detail, same size and scheme: text field input[role=spinbutton] "" 1.48:1.
- Course Detail 390 touch light (08-rating-no-match): segment button[role=radio] "5 star" (aria-checked true): its painted shape, with text and icons hidden, reaches 1.14:1 against #f0f0f0. Main's product-detail, same size and scheme: segment button[role=radio] "Snow" 1.14:1.
- Course Detail 390 touch dark (01-default, 06-review-sort-newest, 07-review-search-miss): segment button[role=radio] "All" (aria-checked true): its painted shape, with text and icons hidden, reaches 1.37:1 against #3c3c3c. Main's product-detail, same size and scheme: segment button[role=radio] "Snow" 1.05:1.
- Course Detail 390 touch dark (01-default, 06-review-sort-newest, 07-review-search-miss, 08-rating-no-match): segment button[role=radio] "Newest" (aria-checked true): its painted shape, with text and icons hidden, reaches 1.37:1 against #3c3c3c. Main's product-detail, same size and scheme: segment button[role=radio] "Snow" 1.05:1.
- Course Detail 390 touch dark (01-default): segment button[role=radio] "Self-paced" (aria-checked true): its painted shape, with text and icons hidden, reaches 1.18:1 against #323232. Main's product-detail, same size and scheme: segment button[role=radio] "Snow" 1.05:1.
- Course Detail 390 touch dark (01-default, 06-review-sort-newest, 08-rating-no-match): a text field at rest: its edge #525252 (computed border 1px solid rgb(82, 82, 82)) reaches 1.94:1, and its fill #262626 1:1, against #262626 outside it. Main's product-detail, same size and scheme: text field input[role=spinbutton] "" 2.4:1.
- Course Detail 390 touch dark (08-rating-no-match): segment button[role=radio] "5 star" (aria-checked true): its painted shape, with text and icons hidden, reaches 1.37:1 against #3c3c3c. Main's product-detail, same size and scheme: segment button[role=radio] "Snow" 1.05:1.

### product-detail (main, for scale; the pull request does not change it)

- product-detail 1280 light (01-default): segment button[role=radio] "Snow" (aria-checked true): its painted shape, with text and icons hidden, reaches 1.14:1 against #f0f0f0.
- product-detail 1280 light (01-default): segment button[role=radio] "Matte" (aria-checked true): its painted shape, with text and icons hidden, reaches 1.14:1 against #f0f0f0.
- product-detail 1280 light (01-default): checkbox input "Product image 1" (checked true): its painted shape, with text and icons hidden, reaches 2.55:1 against #ffffff.
- product-detail 1280 light (01-default): a text field at rest: its edge #d4d4d4 (computed border 1px solid rgb(212, 212, 212)) reaches 1.48:1, and its fill #ffffff 1:1, against #ffffff outside it.
- product-detail 1280 light (01-default): icon path "M5 12h14…" (a minus) (16x16) in button "Decrease quantity" reaches 1.84:1 against #ffffff.
- product-detail 1280 dark (01-default): segment button[role=radio] "Snow" (aria-checked true): its painted shape, with text and icons hidden, reaches 1.05:1 against #2a2a2a.
- product-detail 1280 dark (01-default): segment button[role=radio] "Matte" (aria-checked true): its painted shape, with text and icons hidden, reaches 1.05:1 against #2a2a2a.
- product-detail 1280 dark (01-default): a text field at rest: its edge #525252 (computed border 1px solid rgb(82, 82, 82)) reaches 2.4:1, and its fill #262626 1.24:1, against #121212 outside it.
- product-detail 1280 dark (01-default): icon path "M5 12h14…" (a minus) (16x16) in button "Decrease quantity" reaches 2.22:1 against #121212.
- product-detail 390 touch light (01-default): segment button[role=radio] "Snow" (aria-checked true): its painted shape, with text and icons hidden, reaches 1.14:1 against #f0f0f0.
- product-detail 390 touch light (01-default): segment button[role=radio] "Matte" (aria-checked true): its painted shape, with text and icons hidden, reaches 1.14:1 against #f0f0f0.
- product-detail 390 touch light (01-default): checkbox input "Product image 1" (checked true): its painted shape, with text and icons hidden, reaches 2.54:1 against #ffffff.
- product-detail 390 touch light (01-default): a text field at rest: its edge #d4d4d4 (computed border 1px solid rgb(212, 212, 212)) reaches 1.48:1, and its fill #ffffff 1:1, against #ffffff outside it.
- product-detail 390 touch light (01-default): icon path "M5 12h14…" (a minus) (16x16) in button "Decrease quantity" reaches 1:1 against #ffffff.
- product-detail 390 touch dark (01-default): segment button[role=radio] "Snow" (aria-checked true): its painted shape, with text and icons hidden, reaches 1.05:1 against #2a2a2a.
- product-detail 390 touch dark (01-default): segment button[role=radio] "Matte" (aria-checked true): its painted shape, with text and icons hidden, reaches 1.05:1 against #2a2a2a.
- product-detail 390 touch dark (01-default): a text field at rest: its edge #525252 (computed border 1px solid rgb(82, 82, 82)) reaches 2.4:1, and its fill #262626 1.24:1, against #121212 outside it.
- product-detail 390 touch dark (01-default): icon path "M5 12h14…" (a minus) (16x16) in button "Decrease quantity" reaches 1:1 against #121212.

## Measurement notes

- Course Detail 1280 light: progress div[role=progressbar] "" at 0.47 of 0–100: the fill is under 4 px at this value, so fill against track is not measured there.
- Course Detail 1280 dark: progress div[role=progressbar] "" at 0.47 of 0–100: the fill is under 4 px at this value, so fill against track is not measured there.
- Course Detail 390 touch light: progress div[role=progressbar] "" at 0.93 of 0–100: the fill is under 4 px at this value, so fill against track is not measured there.
- Course Detail 390 touch light: progress div[role=progressbar] "" at 0.47 of 0–100: the fill is under 4 px at this value, so fill against track is not measured there.
- Course Detail 390 touch dark: progress div[role=progressbar] "" at 0.93 of 0–100: the fill is under 4 px at this value, so fill against track is not measured there.
- Course Detail 390 touch dark: progress div[role=progressbar] "" at 0.47 of 0–100: the fill is under 4 px at this value, so fill against track is not measured there.
- product-detail 390 touch light and dark: the minus icon's 1:1 is the 95th-percentile sample of a stroke that covers 4% of its 16 px box. Its strongest pixel reaches 4.06:1 (light) and 5.36:1 (dark), and the frame shows it drawn.

## What each state shows (Course Detail, 1280 light; the other sizes and schemes match unless the JSON says otherwise)

- Save toggle: aria-pressed is true after one press.
- Preview dialog: "Preview lessons"; its text, line by line: "Preview lessons"; "The three preview lessons are free — no card needed."; "What a language model can and cannot promise"; "Free preview"; "12 min"; "The working setup: SDK, keys, and a scratchpad"; "Free preview"; "18 min"; "Tokens, temperature, and the cost dial"; "Free preview"; "18 min".
- Syllabus search "reranker": the module "Retrieval that answers the question" is open; announced ["1 lesson match “reranker”"].
- Syllabus search "kubernetes": the message text appears in 2 elements; announced ["No lessons match “kubernetes”"].
- Review sort: "Helpful" orders ["Drew Young","Pablo Morales","Jihoo Song","Ana Thomas"]; "Newest" orders ["Drew Young","Jihoo Song","Ana Thomas","Pablo Morales"].
- Review search "kubernetes": the message text appears in 2 elements; announced ["No reviews match “kubernetes”"].
- Rating filter: no star rating is empty on its own (the reviews are 5, 5, 4 and 5 stars), so the no-match state is the search "fine-tuning" (one 4-star review) with "5 star" chosen. The message text appears in 2 elements; the live region announced ["No reviews match “fine-tuning”"] after the rating change (after the search: ["1 review match “fine-tuning”"]).
- Common questions: ["1 Do I need production access to a language model?=true","2 How long do I have access?=false","3 What if the course is not right for me?=false","4 Is there a certificate?=false"].
- Closing band "Start lesson one free": toast "Demo: lesson one would play here".
- Closing band "Apply to teach": toast "Demo: the teaching application would open here".

## Icons (Course Detail, every state, 1280 light)

21 template icons by glyph, size and place. Glyphs: heroicons 24/outline CheckIcon × 5; heroicons 24/outline BookOpenIcon × 2; heroicons 24/outline PlayIcon × 2; heroicons 24/outline HeartIcon × 1; heroicons 24/outline ShareIcon × 1; heroicons 24/solid StarIcon × 1; heroicons 24/outline ClockIcon × 1; heroicons 24/outline GlobeAltIcon × 1; heroicons 24/outline BoltIcon × 1; heroicons 24/outline MagnifyingGlassIcon × 1; heroicons 24/outline UsersIcon × 1; heroicons 24/outline StarIcon × 1; heroicons 24/outline ArrowRightIcon × 1; heroicons 24/outline ChevronRightIcon × 1; heroicons 24/solid HeartIcon × 1.

From core components: path "m6 9 6 6 6-6…" (a down chevron) at 17 × 17 px, 9 icons; path "m9 18 6-6-6-6…" (a right chevron) at 12 × 12 px, 1 icon; path "M18 6 6 18…" (an x) at 16 × 16 px, 4 icons. Main's product-detail shows path "M5 12h14…" (a minus) at 16 × 16 px, 1 icon; path "M12 4.5v15m7.5-7…" (a plus) at 16 × 16 px, 1 icon; path "m6 9 6 6 6-6…" (a down chevron) at 17 × 17 px, 3 icons at the same size and scheme.

Rendered sizes: 16x16 × 17; 12x12 × 4.

## Frames

| Course Detail | 1280 light | 1280 dark | 390 light | 390 dark |
|---|---|---|---|---|
| 01-default: the default page, top to bottom | [01-default.png](cd-w1280-light-01-default.png) | [01-default.png](cd-w1280-dark-01-default.png) | [01-default.png](cd-w390-light-01-default.png) | [01-default.png](cd-w390-dark-01-default.png) |
| 02-save-pressed: the Save toggle pressed (viewport at the top) | [02-save-pressed.png](cd-w1280-light-02-save-pressed.png) | [02-save-pressed.png](cd-w1280-dark-02-save-pressed.png) | [02-save-pressed.png](cd-w390-light-02-save-pressed.png) | [02-save-pressed.png](cd-w390-dark-02-save-pressed.png) |
| 03-preview-dialog: the preview dialog open (viewport) | [03-preview-dialog.png](cd-w1280-light-03-preview-dialog.png) | [03-preview-dialog.png](cd-w1280-dark-03-preview-dialog.png) | [03-preview-dialog.png](cd-w390-light-03-preview-dialog.png) | [03-preview-dialog.png](cd-w390-dark-03-preview-dialog.png) |
| 04-syllabus-hit: syllabus search "reranker" | [04-syllabus-hit.png](cd-w1280-light-04-syllabus-hit.png) | [04-syllabus-hit.png](cd-w1280-dark-04-syllabus-hit.png) | [04-syllabus-hit.png](cd-w390-light-04-syllabus-hit.png) | [04-syllabus-hit.png](cd-w390-dark-04-syllabus-hit.png) |
| 05-syllabus-miss: syllabus search "kubernetes" | [05-syllabus-miss.png](cd-w1280-light-05-syllabus-miss.png) | [05-syllabus-miss.png](cd-w1280-dark-05-syllabus-miss.png) | [05-syllabus-miss.png](cd-w390-light-05-syllabus-miss.png) | [05-syllabus-miss.png](cd-w390-dark-05-syllabus-miss.png) |
| 06-review-sort-newest: review sort "Newest" (after "Helpful") | [06-review-sort-newest.png](cd-w1280-light-06-review-sort-newest.png) | [06-review-sort-newest.png](cd-w1280-dark-06-review-sort-newest.png) | [06-review-sort-newest.png](cd-w390-light-06-review-sort-newest.png) | [06-review-sort-newest.png](cd-w390-dark-06-review-sort-newest.png) |
| 07-review-search-miss: review search "kubernetes" | [07-review-search-miss.png](cd-w1280-light-07-review-search-miss.png) | [07-review-search-miss.png](cd-w1280-dark-07-review-search-miss.png) | [07-review-search-miss.png](cd-w390-light-07-review-search-miss.png) | [07-review-search-miss.png](cd-w390-dark-07-review-search-miss.png) |
| 08-rating-no-match: rating filter "5 star" over the search "fine-tuning" (no match) | [08-rating-no-match.png](cd-w1280-light-08-rating-no-match.png) | [08-rating-no-match.png](cd-w1280-dark-08-rating-no-match.png) | [08-rating-no-match.png](cd-w390-light-08-rating-no-match.png) | [08-rating-no-match.png](cd-w390-dark-08-rating-no-match.png) |
| 09-faq-first-open: common questions, the first open (default) | [09-faq-first-open.png](cd-w1280-light-09-faq-first-open.png) | [09-faq-first-open.png](cd-w1280-dark-09-faq-first-open.png) | [09-faq-first-open.png](cd-w390-light-09-faq-first-open.png) | [09-faq-first-open.png](cd-w390-dark-09-faq-first-open.png) |
| 10a-closing-lesson-toast: closing band "Start lesson one free" pressed, its toast visible (viewport) | [10a-closing-lesson-toast.png](cd-w1280-light-10a-closing-lesson-toast.png) | [10a-closing-lesson-toast.png](cd-w1280-dark-10a-closing-lesson-toast.png) | [10a-closing-lesson-toast.png](cd-w390-light-10a-closing-lesson-toast.png) | [10a-closing-lesson-toast.png](cd-w390-dark-10a-closing-lesson-toast.png) |
| 10b-closing-teach-toast: closing band "Apply to teach" pressed, its toast visible (viewport) | [10b-closing-teach-toast.png](cd-w1280-light-10b-closing-teach-toast.png) | [10b-closing-teach-toast.png](cd-w1280-dark-10b-closing-teach-toast.png) | [10b-closing-teach-toast.png](cd-w390-light-10b-closing-teach-toast.png) | [10b-closing-teach-toast.png](cd-w390-dark-10b-closing-teach-toast.png) |

| product-detail (main, for scale) | 1280 light | 1280 dark | 390 light | 390 dark |
|---|---|---|---|---|
| 01-default: the default page, top to bottom | [01-default.png](pd-w1280-light-01-default.png) | [01-default.png](pd-w1280-dark-01-default.png) | [01-default.png](pd-w390-light-01-default.png) | [01-default.png](pd-w390-dark-01-default.png) |

## Measurement files

- [cd-w1280-light.json](cd-w1280-light.json): Course Detail 1280 light, every state.
- [cd-w1280-dark.json](cd-w1280-dark.json): Course Detail 1280 dark, every state.
- [cd-w390-light.json](cd-w390-light.json): Course Detail 390 touch light, every state.
- [cd-w390-dark.json](cd-w390-dark.json): Course Detail 390 touch dark, every state.
- [pd-w1280-light.json](pd-w1280-light.json): product-detail 1280 light, every state.
- [pd-w1280-dark.json](pd-w1280-dark.json): product-detail 1280 dark, every state.
- [pd-w390-light.json](pd-w390-light.json): product-detail 390 touch light, every state.
- [pd-w390-dark.json](pd-w390-dark.json): product-detail 390 touch dark, every state.
