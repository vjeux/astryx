# #12238 re-take stills (test data, local Storybook builds)

- Builds, with stamps read back from each served build: main 2ff1afc9f8d11a2899f42b8193970f638b1aebff, head 37fdd5c4da78e63ed1e57a3272eaad57646a2480, reference 87637c6bae2a4a20274946b585b673854b866c37.
- Main is 2ff1afc9f8, the head's merge-base. The reference 87637c6bae sits on the older base f4790a3949.
- Every build carries the head's OverflowList.stories.tsx (sha256 c9d14130195029c4…) and Toolbar.stories.tsx (a1d6b8c97ba12f55…). Product code is each SHA's own.
- Browsers: Playwright chromium 149.0.7827.55 and firefox 151.0. Light, deviceScaleFactor 2, viewport 1400×900.
- Widths are set as the PR's own spec sets them. After 300 ms, the list labels are read on 12 consecutive animation frames (the DOM).
- Shown text: for each still, the text the still shows is read right before and right after it. Each glyph counts as shown when at least half of it lies inside the still and every clipping box. A glyph also needs to sit before the ellipsis of an overflowing `text-overflow: ellipsis` box. A clipping box under a CSS transform (ScaledRow) is scaled to the page first.
- The first character of such a box is never ellipsed. When it does not fit with the ellipsis, Chromium draws it and a clipped ellipsis, and Firefox draws no ellipsis and clips the text.
- In shown text, "cut from" means an ellipsis replaced the rest; "clipped from" means a box edge cut it off; "not shown" means no glyph is visible.
- The count-capped row has a second still, "-outlined": the capture draws a dashed 1 px red line just outside the list's box, as an overlay outside the story, so the list's width shows. The gap is measured in the page: the list's right edge minus its last item's right edge.

## PR Review's bar for this re-take (shown text and measures)

| Bar | Engine | main 2ff1afc9f8 | head 37fdd5c4da | reference 87637c6bae |
|---|---|---|---|---|
| 1. ScaledRow: scaled-wide shows all six | chromium | YES: DOM [Save, Edit, Duplicate, Share, Archive, Delete]; shows Save · Edit · Duplicate · Share · Archive · Delete | YES: DOM [Save, Edit, Duplicate, Share, Archive, Delete]; shows Save · Edit · Duplicate · Share · Archive · Delete | YES: DOM [Save, Edit, Duplicate, Share, Archive, Delete]; shows Save · Edit · Duplicate · Share · Archive · Delete |
| 2. ScaledRow: scaled-narrow (30 px under scale(0.5)) shows "+6" whole | chromium | NO: DOM [+6]; shows "+" (clipped from "+6") | YES: DOM [+6]; shows +6 | NO: DOM [+6]; shows "+" (clipped from "+6") |
| 3. count-capped (maxVisibleItems 3): "Save, Edit, Duplicate, +3", no blank space after "+3" | chromium | YES: [Save, Edit, Duplicate, +3]; gap after the last item 0 px (list 250.4 px for 250.4 px of items) | YES: [Save, Edit, Duplicate, +3]; gap after the last item 0 px (list 250.4 px for 250.4 px of items) | YES: [Save, Edit, Duplicate, +3]; gap after the last item 0 px (list 250.4 px for 250.4 px of items) |
| 1. ScaledRow: scaled-wide shows all six | firefox | YES: DOM [Save, Edit, Duplicate, Share, Archive, Delete]; shows Save · Edit · Duplicate · Share · Archive · Delete | YES: DOM [Save, Edit, Duplicate, Share, Archive, Delete]; shows Save · Edit · Duplicate · Share · Archive · Delete | YES: DOM [Save, Edit, Duplicate, Share, Archive, Delete]; shows Save · Edit · Duplicate · Share · Archive · Delete |
| 2. ScaledRow: scaled-narrow (30 px under scale(0.5)) shows "+6" whole | firefox | NO: DOM [+6]; shows "+" (clipped from "+6") | YES: DOM [+6]; shows +6 | NO: DOM [+6]; shows "+" (clipped from "+6") |
| 3. count-capped (maxVisibleItems 3): "Save, Edit, Duplicate, +3", no blank space after "+3" | firefox | YES: [Save, Edit, Duplicate, +3]; gap after the last item 0 px (list 249.1 px for 249.1 px of items) | YES: [Save, Edit, Duplicate, +3]; gap after the last item 0 px (list 249.1 px for 249.1 px of items) | YES: [Save, Edit, Duplicate, +3]; gap after the last item 0 px (list 249.1 px for 249.1 px of items) |

## The earlier bar, still checked (shown text)

| Bar | Engine | Case | main 2ff1afc9f8 | head 37fdd5c4da | reference 87637c6bae |
|---|---|---|---|---|---|
| 1. "5 selected" badge whole | chromium | #8804 at 380 px, LTR | WHOLE: "5 selected" | WHOLE: "5 selected" | WHOLE: "5 selected" |
| 1. "5 selected" badge whole | chromium | #8804 at 380 px, RTL | WHOLE: "5 selected" | WHOLE: "5 selected" | WHOLE: "5 selected" |
| 2. "After" whole at 300 px | chromium | FollowedBySibling, step 2 (300 px) | WHOLE: "After" | WHOLE: "After" | WHOLE: "After" |
| 1. "5 selected" badge whole | firefox | #8804 at 380 px, LTR | WHOLE: "5 selected" | WHOLE: "5 selected" | WHOLE: "5 selected" |
| 1. "5 selected" badge whole | firefox | #8804 at 380 px, RTL | WHOLE: "5 selected" | WHOLE: "5 selected" | WHOLE: "5 selected" |
| 2. "After" whole at 300 px | firefox | FollowedBySibling, step 2 (300 px) | WHOLE: "After" | WHOLE: "After" | WHOLE: "After" |

## The PR's own spec, unedited (Chromium, the interaction config's phone profile, retries 0, 3 repeats)

| Test | main 2ff1afc9f8 | head 37fdd5c4da | reference 87637c6bae |
|---|---|---|---|
| folds beside the end lane at 380 px with its trigger whole (#8804) | 0 of 3 pass | 3 of 3 pass | 3 of 3 pass |
| folds before the content beside it in the start lane truncates (#8804, 380 px) | 3 of 3 pass | 3 of 3 pass | 3 of 3 pass |
| keeps the lanes apart at 320 px, the smallest supported width | 0 of 3 pass | 3 of 3 pass | 3 of 3 pass |
| holds one fold across frames at 565 px, the edge of its share | 3 of 3 pass | 3 of 3 pass | 3 of 3 pass |
| shows every action and no trigger when the row has room | 3 of 3 pass | 3 of 3 pass | 3 of 3 pass |
| unfolds again when the row widens after a fold | 0 of 3 pass | 3 of 3 pass | 3 of 3 pass |
| reports the width where the lanes first meet | 0 of 3 pass | 3 of 3 pass | 3 of 3 pass |
| settle without clipping or flicker at 380 px | 3 of 3 pass | 3 of 3 pass | 3 of 3 pass |
| settle without clipping or flicker at 530 px | 3 of 3 pass | 3 of 3 pass | 3 of 3 pass |
| settle without clipping or flicker at 597 px | 3 of 3 pass | 3 of 3 pass | 3 of 3 pass |
| settle without clipping or flicker at 900 px | 3 of 3 pass | 3 of 3 pass | 3 of 3 pass |
| settle without clipping or flicker at 901 px | 3 of 3 pass | 3 of 3 pass | 3 of 3 pass |
| both fold into their own triggers at 380 px and stay folded | 0 of 3 pass | 3 of 3 pass | 3 of 3 pass |
| a nested list keeps its lane at content width with every action shown | 3 of 3 pass | 3 of 3 pass | 3 of 3 pass |
| the table filter template shows every clause at 1280 px | 3 of 3 pass | 3 of 3 pass | 3 of 3 pass |
| reports the width where the table filter template lanes first meet | 3 of 3 pass | 3 of 3 pass | 3 of 3 pass |
| keeps the width of its items in a content-sized parent, and with one item | 3 of 3 pass | 3 of 3 pass | 3 of 3 pass |
| in a wide flex row, a list with a set or capped width folds within it and keeps its trigger | 3 of 3 pass | 3 of 3 pass | 3 of 3 pass |
| in a row that narrows and widens again, a list folding from the start and one keeping an item unfold | 0 of 3 pass | 3 of 3 pass | 3 of 3 pass |
| a list whose flex basis or width is narrower than its folded width holds that width with its trigger, across frames | 3 of 3 pass | 3 of 3 pass | 0 of 3 pass |
| a list followed by a button keeps the button whole beside it as the row narrows and widens | 0 of 3 pass | 3 of 3 pass | 3 of 3 pass |
| a list in a block parent fills the line, as before | 3 of 3 pass | 3 of 3 pass | 3 of 3 pass |
| a list whose parent switches between a flex row and a block follows it | 3 of 3 pass | 3 of 3 pass | 3 of 3 pass |
| a list capped at three items is as wide as those items and its trigger | 3 of 3 pass | 3 of 3 pass | 3 of 3 pass |
| under an ancestor scaled to one half, a list with room shows every item and one in a 30 px parent keeps its trigger whole | 3 of 3 pass | 3 of 3 pass | 3 of 3 pass |
| a list capped with calc() holds one fold across frames | 3 of 3 pass | 3 of 3 pass | 3 of 3 pass |
| in a parent narrower than its folded width, keeps the indicator whole | 0 of 3 pass | 3 of 3 pass | 3 of 3 pass |
| with room, the floor is no wider than the unfolded items | 3 of 3 pass | 3 of 3 pass | 3 of 3 pass |

## chromium 149.0.7827.55

| Case | Build | Meets | Detail |
|---|---|---|---|
| #8804: OverflowActions at 380 px, LTR | main 2ff1afc9f8 | no | Shown: 5 selected · Save · Edit · Duplicate · Share · ("Archive" shows only a sliver of one glyph at a box edge) · ("Delete" not shown) · ("Clear" not shown). fold: no (lanes apart, end lane outside the frame); "5 selected" badge: WHOLE; vs head: 2338 px differ, max Δ 241 |
| #8804: OverflowActions at 380 px, LTR | head 37fdd5c4da | yes | Shown: 5 selected · Save · Edit · +4 · Clear. fold: yes (lanes apart, end lane inside); "5 selected" badge: WHOLE |
| #8804: OverflowActions at 380 px, LTR | reference 87637c6bae | yes | Shown: 5 selected · Save · Edit · +4 · Clear. fold: yes (lanes apart, end lane inside); "5 selected" badge: WHOLE; vs head: identical (0 px) |
| #8804: OverflowActions at 380 px, RTL | main 2ff1afc9f8 | no | Shown: ("Clear" not shown) · ("Delete" not shown) · ("Archive" shows only a sliver of one glyph at a box edge) · Share · Duplicate · Edit · Save · 5 selected. fold: no (lanes apart, end lane outside the frame); "5 selected" badge: WHOLE; vs head: 2327 px differ, max Δ 241 |
| #8804: OverflowActions at 380 px, RTL | head 37fdd5c4da | yes | Shown: Clear · +4 · Edit · Save · 5 selected. fold: yes (lanes apart, end lane inside); "5 selected" badge: WHOLE |
| #8804: OverflowActions at 380 px, RTL | reference 87637c6bae | yes | Shown: Clear · +4 · Edit · Save · 5 selected. fold: yes (lanes apart, end lane inside); "5 selected" badge: WHOLE; vs head: identical (0 px) |
| TwoOverflowLists at 380 px | main 2ff1afc9f8 | no | Shown: Save · Edit · Duplicate · Share · Archive · "D" (clipped from "Delete") · ("Save" not shown) · ("Edit" not shown) · ("Duplicate" not shown) · ("Share" not shown) · ("Archive" not shown) · ("Delete" not shown) · ("Clear" not shown). lanes apart, end lane outside the frame; vs head: 4067 px differ, max Δ 255 |
| TwoOverflowLists at 380 px | head 37fdd5c4da | yes | Shown: Save · +5 · Save · +5 · Clear. lanes apart, end lane inside |
| TwoOverflowLists at 380 px | reference 87637c6bae | yes | Shown: Save · +5 · Save · +5 · Clear. lanes apart, end lane inside; vs head: 1522 px differ, max Δ 255 |
| TwoOverflowLists at 530 px | main 2ff1afc9f8 | no | Shown: Save · Edit · Duplicate · Share · Archive · Delete · Save · Edit · ("Duplicate" not shown) · ("Share" not shown) · ("Archive" not shown) · ("Delete" not shown) · ("Clear" not shown). lanes apart, end lane outside the frame; vs head: 5852 px differ, max Δ 255 |
| TwoOverflowLists at 530 px | head 37fdd5c4da | yes | Shown: Save · Edit · +4 · Save · Edit · +4 · Clear. lanes apart, end lane inside |
| TwoOverflowLists at 530 px | reference 87637c6bae | yes | Shown: Save · Edit · +4 · Save · Edit · +4 · Clear. lanes apart, end lane inside; vs head: 2099 px differ, max Δ 255 |
| TwoOverflowLists at 900 px | main 2ff1afc9f8 | no | Shown: Save · Edit · Duplicate · Share · Archive · Delete · Save · Edit · Duplicate · Share · Archive · Delete · Clear. lanes apart, end lane outside the frame; vs head: 8803 px differ, max Δ 255 |
| TwoOverflowLists at 900 px | head 37fdd5c4da | yes | Shown: Save · Edit · Duplicate · Share · Archive · +1 · Save · Edit · Duplicate · Share · Archive · +1 · Clear. lanes apart, end lane inside |
| TwoOverflowLists at 900 px | reference 87637c6bae | yes | Shown: Save · Edit · Duplicate · Share · Archive · +1 · Save · Edit · Duplicate · Share · Archive · +1 · Clear. lanes apart, end lane inside; vs head: 5995 px differ, max Δ 255 |
| ToolbarTableFilter template at 1280 px | main 2ff1afc9f8 | yes | Shown: Status · Priority · Customer · 5 · of · 5 · Job · Customer · Status · Priority · VAV zones not cooling · Northgate Dental · In progress · High · Exhaust fan noise · Riverside Club · On hold · Normal · Humidifier board fault · Summit Medical · Overdue · High · Economizer stuck shut · Northgate Dental · Scheduled · Normal · Contactor replacement · Harborview Hotel · … 2 more. ; vs head: identical (0 px) |
| ToolbarTableFilter template at 1280 px | head 37fdd5c4da | yes | Shown: Status · Priority · Customer · 5 · of · 5 · Job · Customer · Status · Priority · VAV zones not cooling · Northgate Dental · In progress · High · Exhaust fan noise · Riverside Club · On hold · Normal · Humidifier board fault · Summit Medical · Overdue · High · Economizer stuck shut · Northgate Dental · Scheduled · Normal · Contactor replacement · Harborview Hotel · … 2 more.  |
| ToolbarTableFilter template at 1280 px | reference 87637c6bae | yes | Shown: Status · Priority · Customer · 5 · of · 5 · Job · Customer · Status · Priority · VAV zones not cooling · Northgate Dental · In progress · High · Exhaust fan noise · Riverside Club · On hold · Normal · Humidifier board fault · Summit Medical · Overdue · High · Economizer stuck shut · Northgate Dental · Scheduled · Normal · Contactor replacement · Harborview Hotel · … 2 more. ; vs head: identical (0 px) |
| One-item row (ContentSizedParent) | main 2ff1afc9f8 | yes | Shown: Go. ; vs head: identical (0 px) |
| One-item row (ContentSizedParent) | head 37fdd5c4da | yes | Shown: Go.  |
| One-item row (ContentSizedParent) | reference 87637c6bae | yes | Shown: Go. ; vs head: identical (0 px) |
| Toolbar with only start content (StartOnly) | main 2ff1afc9f8 | n/a | Shown: 3 selected · Delete · Archive. report only: aria-orientation horizontal; vs head: identical (0 px) |
| Toolbar with only start content (StartOnly) | head 37fdd5c4da | n/a | Shown: 3 selected · Delete · Archive. report only: aria-orientation horizontal |
| Toolbar with only start content (StartOnly) | reference 87637c6bae | n/a | Shown: 3 selected · Delete · Archive. report only: aria-orientation horizontal; vs head: identical (0 px) |
| Toolbar with only end content (EndOnly) | main 2ff1afc9f8 | n/a | Shown: Cancel · Save. report only: aria-orientation horizontal; vs head: identical (0 px) |
| Toolbar with only end content (EndOnly) | head 37fdd5c4da | n/a | Shown: Cancel · Save. report only: aria-orientation horizontal |
| Toolbar with only end content (EndOnly) | reference 87637c6bae | n/a | Shown: Cancel · Save. report only: aria-orientation horizontal; vs head: identical (0 px) |
| Vertical toolbar (Default story, orientation arg vertical) | main 2ff1afc9f8 | n/a | Shown: Cut · Copy · Paste. report only: aria-orientation vertical; vs head: identical (0 px) |
| Vertical toolbar (Default story, orientation arg vertical) | head 37fdd5c4da | n/a | Shown: Cut · Copy · Paste. report only: aria-orientation vertical |
| Vertical toolbar (Default story, orientation arg vertical) | reference 87637c6bae | n/a | Shown: Cut · Copy · Paste. report only: aria-orientation vertical; vs head: identical (0 px) |
| CallerLimitedWidth, all six rows | main 2ff1afc9f8 | yes | Shown: Save · Edit · +4 · Save · Edit · +4 · Save · Edit · +4 · "+" (clipped from "+6") · "+" (clipped from "+6") · Save · Edit · Duplicate · +3. DOM: [Save, Edit, +4] + [Save, Edit, +4] + [Save, Edit, +4] + [+6] + [+6] + [Save, Edit, Duplicate, +3] (0 changes over 12 frames); vs head: 356 px differ, max Δ 255 |
| CallerLimitedWidth, all six rows | head 37fdd5c4da | yes | Shown: Save · Edit · +4 · Save · Edit · +4 · Save · Edit · +4 · +6 · +6 · Save · Edit · Duplicate · +3. DOM: [Save, Edit, +4] + [Save, Edit, +4] + [Save, Edit, +4] + [+6] + [+6] + [Save, Edit, Duplicate, +3] (0 changes over 12 frames) |
| CallerLimitedWidth, all six rows | reference 87637c6bae | no | Shown: Save · Edit · +4 · Save · Edit · +4 · Save · Edit · +4 · +6 · Save · Edit · Duplicate · +3. DOM: [Save, Edit, +4] + [Save, Edit, +4] + [Save, Edit, +4] + [Save, Edit, Duplicate, Share, Archive, Delete] + [+6] + [Save, Edit, Duplicate, +3] (0 changes over 12 frames); vs head: 3225 px differ, max Δ 255 |
| RowWidensAfterFold: 140 px, then 900 px | main 2ff1afc9f8 | no | Shown: 140px: +10 · A1 · +9 · +10 | 900px: +10 · A1 · +9 · +10. DOM 140 px: [+10] + [A1, +9] + [+10] (0 changes over 12 frames). DOM 900 px: [+10] + [A1, +9] + [+10] (0 changes over 12 frames); stills byte-identical to the head's first still of the same step: 140px 0/3, 900px 0/3 |
| RowWidensAfterFold: 140 px, then 900 px | head 37fdd5c4da | yes | Shown: 140px: +9 · A10 · A1 · +9 · A1 · A2 · +8 | 900px: A1 · A2 · A3 · A4 · A5 · A6 · A7 · A8 · A9 · A10 · A1 · A2 · A3 · A4 · A5 · A6 · A7 · A8 · A9 · A10 · A1 · A2 · A3 · A4 · A5 · A6 · A7 · A8 · … 2 more. DOM 140 px: [+9, A10] + [A1, +9] + [A1, A2, +8] (0 changes over 12 frames). DOM 900 px: [A1, A2, A3, A4, A5, A6, A7, A8, A9, A10] + [A1, A2, A3, A4, A5, A6, A7, A8, A9, A10] + [A1, A2, A3, A4, A5, A6, A7, A8, A9, A10] (0 changes over 12 frames) |
| RowWidensAfterFold: 140 px, then 900 px | reference 87637c6bae | no | Shown: 140px: +9 · A10 · A1 · +9 · A1 · +9 | 140px: +9 · A10 · A1 · +9 · A1 · +9 / then +9 · A10 · A1 · +9 · +10 (the page changed while this still was taken) | 140px: +9 · A10 · A1 · +9 · +10 / then +9 · A10 · A1 · +9 · A1 · +9 (the page changed while this still was taken) | 900px: A1 · A2 · A3 · A4 · A5 · A6 · A7 · A8 · A9 · A10 · A1 · A2 · A3 · A4 · A5 · A6 · A7 · A8 · A9 · A10 · A1 · A2 · A3 · A4 · A5 · A6 · A7 · A8 · … 2 more. DOM 140 px: [+9, A10] + [A1, +9] + [+10] <> [+9, A10] + [A1, +9] + [A1, +9] (11 changes over 12 frames). DOM 900 px: [A1, A2, A3, A4, A5, A6, A7, A8, A9, A10] + [A1, A2, A3, A4, A5, A6, A7, A8, A9, A10] + [A1, A2, A3, A4, A5, A6, A7, A8, A9, A10] (0 changes over 12 frames); stills byte-identical to the head's first still of the same step: 140px 0/3, 900px 3/3 |
| The width-calc row, three stills 100 ms apart | main 2ff1afc9f8 | yes | Shown: calc: Save · Edit · +4. DOM: [Save, Edit, +4] (0 changes over 12 frames); stills byte-identical to the head's first still of the same step: calc 9/9 |
| The width-calc row, three stills 100 ms apart | head 37fdd5c4da | yes | Shown: calc: Save · Edit · +4. DOM: [Save, Edit, +4] (0 changes over 12 frames) |
| The width-calc row, three stills 100 ms apart | reference 87637c6bae | yes | Shown: calc: Save · Edit · +4. DOM: [Save, Edit, +4] (0 changes over 12 frames); stills byte-identical to the head's first still of the same step: calc 0/9 |
| FollowedBySibling: sibling-frame at 900, 300, then 900 px; block-parent row | main 2ff1afc9f8 | no | Shown: step1-900px: Save · Edit · Duplicate · Share · Archive · Delete · After · Save · Edit | step2-300px: Save · Edit · +4 · After · Save · Edit | step3-900px: Save · Edit · +4 · After · Save · Edit | block: Save · Edit. step1-900px: list [Save, Edit, Duplicate, Share, Archive, Delete]; After's box after the list and inside the frame; "After" label WHOLE. step2-300px: list [Save, Edit, +4]; After's box after the list and inside the frame; "After" label WHOLE. step3-900px: list [Save, Edit, +4]; After's box after the list and inside the frame; "After" label WHOLE. block-parent at step 3: list 884 px in a 884 px parent, [Save, Edit]; stills byte-identical to the head's first still of the same step: step1-900px 1/1, step2-300px 0/1, step3-900px 0/1, block 0/1 |
| FollowedBySibling: sibling-frame at 900, 300, then 900 px; block-parent row | head 37fdd5c4da | yes | Shown: step1-900px: Save · Edit · Duplicate · Share · Archive · Delete · After · Save · Edit | step2-300px: Save · Edit · +4 · After · Save · Edit | step3-900px: Save · Edit · Duplicate · Share · Archive · Delete · After · Save · Edit | block: Save · Edit. step1-900px: list [Save, Edit, Duplicate, Share, Archive, Delete]; After's box after the list and inside the frame; "After" label WHOLE. step2-300px: list [Save, Edit, +4]; After's box after the list and inside the frame; "After" label WHOLE. step3-900px: list [Save, Edit, Duplicate, Share, Archive, Delete]; After's box after the list and inside the frame; "After" label WHOLE. block-parent at step 3: list 884 px in a 884 px parent, [Save, Edit] |
| FollowedBySibling: sibling-frame at 900, 300, then 900 px; block-parent row | reference 87637c6bae | yes | Shown: step1-900px: Save · Edit · Duplicate · Share · Archive · Delete · After · Save · Edit | step2-300px: Save · Edit · +4 · After · Save · Edit | step3-900px: Save · Edit · Duplicate · Share · Archive · Delete · After · Save · Edit | block: Save · Edit. step1-900px: list [Save, Edit, Duplicate, Share, Archive, Delete]; After's box after the list and inside the frame; "After" label WHOLE. step2-300px: list [Save, Edit, +4]; After's box after the list and inside the frame; "After" label WHOLE. step3-900px: list [Save, Edit, Duplicate, Share, Archive, Delete]; After's box after the list and inside the frame; "After" label WHOLE. block-parent at step 3: list 884 px in a 884 px parent, [Save, Edit]; stills byte-identical to the head's first still of the same step: step1-900px 1/1, step2-300px 0/1, step3-900px 1/1, block 1/1 |
| ScaledRow: lists under an ancestor scaled to one half; scaled-wide and scaled-narrow (a 30 px parent) | main 2ff1afc9f8 | no | Shown: Save · Edit · Duplicate · Share · Archive · Delete · "+" (clipped from "+6"). scale 0.5. DOM: [Save, Edit, Duplicate, Share, Archive, Delete] + [+6] (0 changes over 12 frames). scaled-wide shows: Save · Edit · Duplicate · Share · Archive · Delete. scaled-narrow shows: "+" (clipped from "+6"). scaled-wide: list 211.5 px on screen (423 px in layout) in a 350 px row (700 px in layout); scaled-narrow: list 15 px on screen (30 px in layout) in a 15 px row (30 px in layout); vs head: 61 px differ, max Δ 255 |
| ScaledRow: lists under an ancestor scaled to one half; scaled-wide and scaled-narrow (a 30 px parent) | head 37fdd5c4da | yes | Shown: Save · Edit · Duplicate · Share · Archive · Delete · +6. scale 0.5. DOM: [Save, Edit, Duplicate, Share, Archive, Delete] + [+6] (0 changes over 12 frames). scaled-wide shows: Save · Edit · Duplicate · Share · Archive · Delete. scaled-narrow shows: +6. scaled-wide: list 211.5 px on screen (423 px in layout) in a 350 px row (700 px in layout); scaled-narrow: list 20 px on screen (40 px in layout) in a 15 px row (30 px in layout) |
| ScaledRow: lists under an ancestor scaled to one half; scaled-wide and scaled-narrow (a 30 px parent) | reference 87637c6bae | no | Shown: Save · Edit · Duplicate · Share · Archive · Delete · "+" (clipped from "+6"). scale 0.5. DOM: [Save, Edit, Duplicate, Share, Archive, Delete] + [+6] (0 changes over 12 frames). scaled-wide shows: Save · Edit · Duplicate · Share · Archive · Delete. scaled-narrow shows: "+" (clipped from "+6"). scaled-wide: list 211.5 px on screen (423 px in layout) in a 350 px row (700 px in layout); scaled-narrow: list 15 px on screen (30 px in layout) in a 15 px row (30 px in layout); vs head: 61 px differ, max Δ 255 |
| CallerLimitedWidth: count-capped (maxVisibleItems 3) in the 700 px wrapper | main 2ff1afc9f8 | yes | Shown: Save · Edit · Duplicate · +3 | outlined: Save · Edit · Duplicate · +3. DOM: [Save, Edit, Duplicate, +3] (0 changes over 12 frames). Shows: Save · Edit · Duplicate · +3. Gap between the last item's right edge and the list's right edge: 0 px. The list is 250.4 px wide for 250.4 px of items (first item's left edge to the last item's right edge), in a 684 px row with 433.6 px of the row after the list; vs head: identical (0 px) |
| CallerLimitedWidth: count-capped (maxVisibleItems 3) in the 700 px wrapper | head 37fdd5c4da | yes | Shown: Save · Edit · Duplicate · +3 | outlined: Save · Edit · Duplicate · +3. DOM: [Save, Edit, Duplicate, +3] (0 changes over 12 frames). Shows: Save · Edit · Duplicate · +3. Gap between the last item's right edge and the list's right edge: 0 px. The list is 250.4 px wide for 250.4 px of items (first item's left edge to the last item's right edge), in a 684 px row with 433.6 px of the row after the list |
| CallerLimitedWidth: count-capped (maxVisibleItems 3) in the 700 px wrapper | reference 87637c6bae | yes | Shown: Save · Edit · Duplicate · +3 | outlined: Save · Edit · Duplicate · +3. DOM: [Save, Edit, Duplicate, +3] (0 changes over 12 frames). Shows: Save · Edit · Duplicate · +3. Gap between the last item's right edge and the list's right edge: 0 px. The list is 250.4 px wide for 250.4 px of items (first item's left edge to the last item's right edge), in a 684 px row with 433.6 px of the row after the list; vs head: identical (0 px) |

## firefox 151.0

| Case | Build | Meets | Detail |
|---|---|---|---|
| #8804: OverflowActions at 380 px, LTR | main 2ff1afc9f8 | no | Shown: 5 selected · Save · Edit · Duplicate · Share · ("Archive" shows only a sliver of one glyph at a box edge) · ("Delete" not shown) · ("Clear" not shown). fold: no (lanes apart, end lane outside the frame); "5 selected" badge: WHOLE; vs head: 2344 px differ, max Δ 241 |
| #8804: OverflowActions at 380 px, LTR | head 37fdd5c4da | yes | Shown: 5 selected · Save · Edit · +4 · Clear. fold: yes (lanes apart, end lane inside); "5 selected" badge: WHOLE |
| #8804: OverflowActions at 380 px, LTR | reference 87637c6bae | yes | Shown: 5 selected · Save · Edit · +4 · Clear. fold: yes (lanes apart, end lane inside); "5 selected" badge: WHOLE; vs head: identical (0 px) |
| #8804: OverflowActions at 380 px, RTL | main 2ff1afc9f8 | no | Shown: ("Clear" not shown) · ("Delete" not shown) · ("Archive" shows only a sliver of one glyph at a box edge) · Share · Duplicate · Edit · Save · 5 selected. fold: no (lanes apart, end lane outside the frame); "5 selected" badge: WHOLE; vs head: 2288 px differ, max Δ 241 |
| #8804: OverflowActions at 380 px, RTL | head 37fdd5c4da | yes | Shown: Clear · +4 · Edit · Save · 5 selected. fold: yes (lanes apart, end lane inside); "5 selected" badge: WHOLE |
| #8804: OverflowActions at 380 px, RTL | reference 87637c6bae | yes | Shown: Clear · +4 · Edit · Save · 5 selected. fold: yes (lanes apart, end lane inside); "5 selected" badge: WHOLE; vs head: identical (0 px) |
| TwoOverflowLists at 380 px | main 2ff1afc9f8 | no | Shown: Save · Edit · Duplicate · Share · Archive · "D" (clipped from "Delete") · ("Save" not shown) · ("Edit" not shown) · ("Duplicate" not shown) · ("Share" not shown) · ("Archive" not shown) · ("Delete" not shown) · ("Clear" not shown). lanes apart, end lane outside the frame; vs head: 4077 px differ, max Δ 255 |
| TwoOverflowLists at 380 px | head 37fdd5c4da | yes | Shown: Save · +5 · Save · +5 · Clear. lanes apart, end lane inside |
| TwoOverflowLists at 380 px | reference 87637c6bae | yes | Shown: Save · +5 · Save · +5 · Clear. lanes apart, end lane inside; vs head: 1492 px differ, max Δ 255 |
| TwoOverflowLists at 530 px | main 2ff1afc9f8 | no | Shown: Save · Edit · Duplicate · Share · Archive · Delete · Save · Edit · ("Duplicate" not shown) · ("Share" not shown) · ("Archive" not shown) · ("Delete" not shown) · ("Clear" not shown). lanes apart, end lane outside the frame; vs head: 5808 px differ, max Δ 255 |
| TwoOverflowLists at 530 px | head 37fdd5c4da | yes | Shown: Save · Edit · +4 · Save · Edit · +4 · Clear. lanes apart, end lane inside |
| TwoOverflowLists at 530 px | reference 87637c6bae | yes | Shown: Save · Edit · +4 · Save · Edit · +4 · Clear. lanes apart, end lane inside; vs head: 2156 px differ, max Δ 255 |
| TwoOverflowLists at 900 px | main 2ff1afc9f8 | no | Shown: Save · Edit · Duplicate · Share · Archive · Delete · Save · Edit · Duplicate · Share · Archive · Delete · Clear. lanes apart, end lane outside the frame; vs head: 8508 px differ, max Δ 255 |
| TwoOverflowLists at 900 px | head 37fdd5c4da | yes | Shown: Save · Edit · Duplicate · Share · Archive · +1 · Save · Edit · Duplicate · Share · Archive · +1 · Clear. lanes apart, end lane inside |
| TwoOverflowLists at 900 px | reference 87637c6bae | yes | Shown: Save · Edit · Duplicate · Share · Archive · +1 · Save · Edit · Duplicate · Share · Archive · +1 · Clear. lanes apart, end lane inside; vs head: 6075 px differ, max Δ 255 |
| ToolbarTableFilter template at 1280 px | main 2ff1afc9f8 | yes | Shown: Status · Priority · Customer · 5 · of · 5 · Job · Customer · Status · Priority · VAV zones not cooling · Northgate Dental · In progress · High · Exhaust fan noise · Riverside Club · On hold · Normal · Humidifier board fault · Summit Medical · Overdue · High · Economizer stuck shut · Northgate Dental · Scheduled · Normal · Contactor replacement · Harborview Hotel · … 2 more. ; vs head: identical (0 px) |
| ToolbarTableFilter template at 1280 px | head 37fdd5c4da | yes | Shown: Status · Priority · Customer · 5 · of · 5 · Job · Customer · Status · Priority · VAV zones not cooling · Northgate Dental · In progress · High · Exhaust fan noise · Riverside Club · On hold · Normal · Humidifier board fault · Summit Medical · Overdue · High · Economizer stuck shut · Northgate Dental · Scheduled · Normal · Contactor replacement · Harborview Hotel · … 2 more.  |
| ToolbarTableFilter template at 1280 px | reference 87637c6bae | yes | Shown: Status · Priority · Customer · 5 · of · 5 · Job · Customer · Status · Priority · VAV zones not cooling · Northgate Dental · In progress · High · Exhaust fan noise · Riverside Club · On hold · Normal · Humidifier board fault · Summit Medical · Overdue · High · Economizer stuck shut · Northgate Dental · Scheduled · Normal · Contactor replacement · Harborview Hotel · … 2 more. ; vs head: identical (0 px) |
| One-item row (ContentSizedParent) | main 2ff1afc9f8 | yes | Shown: Go. ; vs head: identical (0 px) |
| One-item row (ContentSizedParent) | head 37fdd5c4da | yes | Shown: Go.  |
| One-item row (ContentSizedParent) | reference 87637c6bae | yes | Shown: Go. ; vs head: identical (0 px) |
| Toolbar with only start content (StartOnly) | main 2ff1afc9f8 | n/a | Shown: 3 selected · Delete · Archive. report only: aria-orientation horizontal; vs head: identical (0 px) |
| Toolbar with only start content (StartOnly) | head 37fdd5c4da | n/a | Shown: 3 selected · Delete · Archive. report only: aria-orientation horizontal |
| Toolbar with only start content (StartOnly) | reference 87637c6bae | n/a | Shown: 3 selected · Delete · Archive. report only: aria-orientation horizontal; vs head: identical (0 px) |
| Toolbar with only end content (EndOnly) | main 2ff1afc9f8 | n/a | Shown: Cancel · Save. report only: aria-orientation horizontal; vs head: identical (0 px) |
| Toolbar with only end content (EndOnly) | head 37fdd5c4da | n/a | Shown: Cancel · Save. report only: aria-orientation horizontal |
| Toolbar with only end content (EndOnly) | reference 87637c6bae | n/a | Shown: Cancel · Save. report only: aria-orientation horizontal; vs head: identical (0 px) |
| Vertical toolbar (Default story, orientation arg vertical) | main 2ff1afc9f8 | n/a | Shown: Cut · Copy · Paste. report only: aria-orientation vertical; vs head: identical (0 px) |
| Vertical toolbar (Default story, orientation arg vertical) | head 37fdd5c4da | n/a | Shown: Cut · Copy · Paste. report only: aria-orientation vertical |
| Vertical toolbar (Default story, orientation arg vertical) | reference 87637c6bae | n/a | Shown: Cut · Copy · Paste. report only: aria-orientation vertical; vs head: identical (0 px) |
| CallerLimitedWidth, all six rows | main 2ff1afc9f8 | yes | Shown: Save · Edit · +4 · Save · Edit · +4 · Save · Edit · +4 · "+" (clipped from "+6") · "+" (clipped from "+6") · Save · Edit · Duplicate · +3. DOM: [Save, Edit, +4] + [Save, Edit, +4] + [Save, Edit, +4] + [+6] + [+6] + [Save, Edit, Duplicate, +3] (0 changes over 12 frames); vs head: 362 px differ, max Δ 255 |
| CallerLimitedWidth, all six rows | head 37fdd5c4da | yes | Shown: Save · Edit · +4 · Save · Edit · +4 · Save · Edit · +4 · +6 · +6 · Save · Edit · Duplicate · +3. DOM: [Save, Edit, +4] + [Save, Edit, +4] + [Save, Edit, +4] + [+6] + [+6] + [Save, Edit, Duplicate, +3] (0 changes over 12 frames) |
| CallerLimitedWidth, all six rows | reference 87637c6bae | no | Shown: Save · Edit · +4 · Save · Edit · +4 · Save · Edit · +4 · Save · Edit · Duplicate · +3. DOM: [Save, Edit, +4] + [Save, Edit, +4] + [Save, Edit, +4] + [Save, Edit, Duplicate, Share, Archive, Delete] + [Save, Edit, Duplicate, Share, Archive, Delete] + [Save, Edit, Duplicate, +3] (0 changes over 12 frames); vs head: 6436 px differ, max Δ 255 |
| RowWidensAfterFold: 140 px, then 900 px | main 2ff1afc9f8 | no | Shown: 140px: +10 · A1 · +9 · +10 | 900px: +10 · A1 · +9 · +10. DOM 140 px: [+10] + [A1, +9] + [+10] (0 changes over 12 frames). DOM 900 px: [+10] + [A1, +9] + [+10] (0 changes over 12 frames); stills byte-identical to the head's first still of the same step: 140px 0/3, 900px 0/3 |
| RowWidensAfterFold: 140 px, then 900 px | head 37fdd5c4da | yes | Shown: 140px: +9 · A10 · A1 · +9 · A1 · A2 · +8 | 900px: A1 · A2 · A3 · A4 · A5 · A6 · A7 · A8 · A9 · A10 · A1 · A2 · A3 · A4 · A5 · A6 · A7 · A8 · A9 · A10 · A1 · A2 · A3 · A4 · A5 · A6 · A7 · A8 · … 2 more. DOM 140 px: [+9, A10] + [A1, +9] + [A1, A2, +8] (0 changes over 12 frames). DOM 900 px: [A1, A2, A3, A4, A5, A6, A7, A8, A9, A10] + [A1, A2, A3, A4, A5, A6, A7, A8, A9, A10] + [A1, A2, A3, A4, A5, A6, A7, A8, A9, A10] (0 changes over 12 frames) |
| RowWidensAfterFold: 140 px, then 900 px | reference 87637c6bae | no | Shown: 140px: +9 · A10 · A1 · +9 · +10 / then +9 · A10 · A1 · +9 · A1 · +9 (the page changed while this still was taken) | 900px: A1 · A2 · A3 · A4 · A5 · A6 · A7 · A8 · A9 · A10 · A1 · A2 · A3 · A4 · A5 · A6 · A7 · A8 · A9 · A10 · A1 · A2 · A3 · A4 · A5 · A6 · A7 · A8 · … 2 more. DOM 140 px: [+9, A10] + [A1, +9] + [A1, +9] <> [+9, A10] + [A1, +9] + [+10] (11 changes over 12 frames). DOM 900 px: [A1, A2, A3, A4, A5, A6, A7, A8, A9, A10] + [A1, A2, A3, A4, A5, A6, A7, A8, A9, A10] + [A1, A2, A3, A4, A5, A6, A7, A8, A9, A10] (0 changes over 12 frames); stills byte-identical to the head's first still of the same step: 140px 0/3, 900px 3/3 |
| The width-calc row, three stills 100 ms apart | main 2ff1afc9f8 | yes | Shown: calc: Save · Edit · +4. DOM: [Save, Edit, +4] (0 changes over 12 frames); stills byte-identical to the head's first still of the same step: calc 9/9 |
| The width-calc row, three stills 100 ms apart | head 37fdd5c4da | yes | Shown: calc: Save · Edit · +4. DOM: [Save, Edit, +4] (0 changes over 12 frames) |
| The width-calc row, three stills 100 ms apart | reference 87637c6bae | yes | Shown: calc: Save · Edit · +4. DOM: [Save, Edit, +4] (0 changes over 12 frames); stills byte-identical to the head's first still of the same step: calc 0/9 |
| FollowedBySibling: sibling-frame at 900, 300, then 900 px; block-parent row | main 2ff1afc9f8 | no | Shown: step1-900px: Save · Edit · Duplicate · Share · Archive · Delete · After · Save · Edit | step2-300px: Save · Edit · +4 · After · Save · Edit | step3-900px: Save · Edit · +4 · After · Save · Edit | block: Save · Edit. step1-900px: list [Save, Edit, Duplicate, Share, Archive, Delete]; After's box after the list and inside the frame; "After" label WHOLE. step2-300px: list [Save, Edit, +4]; After's box after the list and inside the frame; "After" label WHOLE. step3-900px: list [Save, Edit, +4]; After's box after the list and inside the frame; "After" label WHOLE. block-parent at step 3: list 884 px in a 884 px parent, [Save, Edit]; stills byte-identical to the head's first still of the same step: step1-900px 1/1, step2-300px 0/1, step3-900px 0/1, block 0/1 |
| FollowedBySibling: sibling-frame at 900, 300, then 900 px; block-parent row | head 37fdd5c4da | yes | Shown: step1-900px: Save · Edit · Duplicate · Share · Archive · Delete · After · Save · Edit | step2-300px: Save · Edit · +4 · After · Save · Edit | step3-900px: Save · Edit · Duplicate · Share · Archive · Delete · After · Save · Edit | block: Save · Edit. step1-900px: list [Save, Edit, Duplicate, Share, Archive, Delete]; After's box after the list and inside the frame; "After" label WHOLE. step2-300px: list [Save, Edit, +4]; After's box after the list and inside the frame; "After" label WHOLE. step3-900px: list [Save, Edit, Duplicate, Share, Archive, Delete]; After's box after the list and inside the frame; "After" label WHOLE. block-parent at step 3: list 884 px in a 884 px parent, [Save, Edit] |
| FollowedBySibling: sibling-frame at 900, 300, then 900 px; block-parent row | reference 87637c6bae | yes | Shown: step1-900px: Save · Edit · Duplicate · Share · Archive · Delete · After · Save · Edit | step2-300px: Save · Edit · +4 · After · Save · Edit | step3-900px: Save · Edit · Duplicate · Share · Archive · Delete · After · Save · Edit | block: Save · Edit. step1-900px: list [Save, Edit, Duplicate, Share, Archive, Delete]; After's box after the list and inside the frame; "After" label WHOLE. step2-300px: list [Save, Edit, +4]; After's box after the list and inside the frame; "After" label WHOLE. step3-900px: list [Save, Edit, Duplicate, Share, Archive, Delete]; After's box after the list and inside the frame; "After" label WHOLE. block-parent at step 3: list 884 px in a 884 px parent, [Save, Edit]; stills byte-identical to the head's first still of the same step: step1-900px 1/1, step2-300px 0/1, step3-900px 1/1, block 1/1 |
| ScaledRow: lists under an ancestor scaled to one half; scaled-wide and scaled-narrow (a 30 px parent) | main 2ff1afc9f8 | no | Shown: Save · Edit · Duplicate · Share · Archive · Delete · "+" (clipped from "+6"). scale 0.5. DOM: [Save, Edit, Duplicate, Share, Archive, Delete] + [+6] (0 changes over 12 frames). scaled-wide shows: Save · Edit · Duplicate · Share · Archive · Delete. scaled-narrow shows: "+" (clipped from "+6"). scaled-wide: list 210.3 px on screen (421 px in layout) in a 350 px row (700 px in layout); scaled-narrow: list 15 px on screen (30 px in layout) in a 15 px row (30 px in layout); vs head: 58 px differ, max Δ 255 |
| ScaledRow: lists under an ancestor scaled to one half; scaled-wide and scaled-narrow (a 30 px parent) | head 37fdd5c4da | yes | Shown: Save · Edit · Duplicate · Share · Archive · Delete · +6. scale 0.5. DOM: [Save, Edit, Duplicate, Share, Archive, Delete] + [+6] (0 changes over 12 frames). scaled-wide shows: Save · Edit · Duplicate · Share · Archive · Delete. scaled-narrow shows: +6. scaled-wide: list 210.5 px on screen (421 px in layout) in a 350 px row (700 px in layout); scaled-narrow: list 20.5 px on screen (41 px in layout) in a 15 px row (30 px in layout) |
| ScaledRow: lists under an ancestor scaled to one half; scaled-wide and scaled-narrow (a 30 px parent) | reference 87637c6bae | no | Shown: Save · Edit · Duplicate · Share · Archive · Delete · "+" (clipped from "+6"). scale 0.5. DOM: [Save, Edit, Duplicate, Share, Archive, Delete] + [+6] (0 changes over 12 frames). scaled-wide shows: Save · Edit · Duplicate · Share · Archive · Delete. scaled-narrow shows: "+" (clipped from "+6"). scaled-wide: list 210.3 px on screen (421 px in layout) in a 350 px row (700 px in layout); scaled-narrow: list 15 px on screen (30 px in layout) in a 15 px row (30 px in layout); vs head: 58 px differ, max Δ 255 |
| CallerLimitedWidth: count-capped (maxVisibleItems 3) in the 700 px wrapper | main 2ff1afc9f8 | yes | Shown: Save · Edit · Duplicate · +3 | outlined: Save · Edit · Duplicate · +3. DOM: [Save, Edit, Duplicate, +3] (0 changes over 12 frames). Shows: Save · Edit · Duplicate · +3. Gap between the last item's right edge and the list's right edge: 0 px. The list is 249.1 px wide for 249.1 px of items (first item's left edge to the last item's right edge), in a 684 px row with 434.9 px of the row after the list; vs head: identical (0 px) |
| CallerLimitedWidth: count-capped (maxVisibleItems 3) in the 700 px wrapper | head 37fdd5c4da | yes | Shown: Save · Edit · Duplicate · +3 | outlined: Save · Edit · Duplicate · +3. DOM: [Save, Edit, Duplicate, +3] (0 changes over 12 frames). Shows: Save · Edit · Duplicate · +3. Gap between the last item's right edge and the list's right edge: 0 px. The list is 249.1 px wide for 249.1 px of items (first item's left edge to the last item's right edge), in a 684 px row with 434.9 px of the row after the list |
| CallerLimitedWidth: count-capped (maxVisibleItems 3) in the 700 px wrapper | reference 87637c6bae | yes | Shown: Save · Edit · Duplicate · +3 | outlined: Save · Edit · Duplicate · +3. DOM: [Save, Edit, Duplicate, +3] (0 changes over 12 frames). Shows: Save · Edit · Duplicate · +3. Gap between the last item's right edge and the list's right edge: 0 px. The list is 249.1 px wide for 249.1 px of items (first item's left edge to the last item's right edge), in a 684 px row with 434.9 px of the row after the list; vs head: 318 px differ, max Δ 15 |

## Measured in the page: the narrow ScaledRow trigger

Read after the stills, at the same builds, in Chromium 149.0.7827.55 and Firefox 151.0:

- main 2ff1afc9f8 and reference 87637c6bae: the 30 px row, the list and the trigger button are all 30 px in layout (15 px on screen). The trigger's label box is 6 px wide for 22 px (Chromium) or 16 px (Firefox) of text, so the still shows only "+".
- head 37fdd5c4da: in the 30 px row, the list is 40 px in layout in Chromium and 41 in Firefox (20 and 20.5 on screen); the trigger is 40. Its label box is 16 px for 16 px of text, so "+6" is whole.
- The PR's own test for this row checks that the trigger button's right edge stays inside the list's box. That holds on main too (0 px), so the test passes on main. It does not check the label.

## Shown text of each still

- pr12238-rt2-chromium-t1-actions-380-ltr-main-2ff1afc9f8.png: 5 selected · Save · Edit · Duplicate · Share · ("Archive" shows only a sliver of one glyph at a box edge) · ("Delete" not shown) · ("Clear" not shown)
- pr12238-rt2-chromium-t1-actions-380-ltr-head-37fdd5c4da.png: 5 selected · Save · Edit · +4 · Clear
- pr12238-rt2-chromium-t1-actions-380-ltr-ref-87637c6bae.png: 5 selected · Save · Edit · +4 · Clear
- pr12238-rt2-chromium-t1-actions-380-rtl-main-2ff1afc9f8.png: ("Clear" not shown) · ("Delete" not shown) · ("Archive" shows only a sliver of one glyph at a box edge) · Share · Duplicate · Edit · Save · 5 selected
- pr12238-rt2-chromium-t1-actions-380-rtl-head-37fdd5c4da.png: Clear · +4 · Edit · Save · 5 selected
- pr12238-rt2-chromium-t1-actions-380-rtl-ref-87637c6bae.png: Clear · +4 · Edit · Save · 5 selected
- pr12238-rt2-chromium-t2-two-lists-380-main-2ff1afc9f8.png: Save · Edit · Duplicate · Share · Archive · "D" (clipped from "Delete") · ("Save" not shown) · ("Edit" not shown) · ("Duplicate" not shown) · ("Share" not shown) · ("Archive" not shown) · ("Delete" not shown) · ("Clear" not shown)
- pr12238-rt2-chromium-t2-two-lists-380-head-37fdd5c4da.png: Save · +5 · Save · +5 · Clear
- pr12238-rt2-chromium-t2-two-lists-380-ref-87637c6bae.png: Save · +5 · Save · +5 · Clear
- pr12238-rt2-chromium-t2-two-lists-530-main-2ff1afc9f8.png: Save · Edit · Duplicate · Share · Archive · Delete · Save · Edit · ("Duplicate" not shown) · ("Share" not shown) · ("Archive" not shown) · ("Delete" not shown) · ("Clear" not shown)
- pr12238-rt2-chromium-t2-two-lists-530-head-37fdd5c4da.png: Save · Edit · +4 · Save · Edit · +4 · Clear
- pr12238-rt2-chromium-t2-two-lists-530-ref-87637c6bae.png: Save · Edit · +4 · Save · Edit · +4 · Clear
- pr12238-rt2-chromium-t2-two-lists-900-main-2ff1afc9f8.png: Save · Edit · Duplicate · Share · Archive · Delete · Save · Edit · Duplicate · Share · Archive · Delete · Clear
- pr12238-rt2-chromium-t2-two-lists-900-head-37fdd5c4da.png: Save · Edit · Duplicate · Share · Archive · +1 · Save · Edit · Duplicate · Share · Archive · +1 · Clear
- pr12238-rt2-chromium-t2-two-lists-900-ref-87637c6bae.png: Save · Edit · Duplicate · Share · Archive · +1 · Save · Edit · Duplicate · Share · Archive · +1 · Clear
- pr12238-rt2-chromium-t3-table-filter-1280-main-2ff1afc9f8.png: Status · Priority · Customer · 5 · of · 5 · Job · Customer · Status · Priority · VAV zones not cooling · Northgate Dental · In progress · High · Exhaust fan noise · Riverside Club · On hold · Normal · Humidifier board fault · Summit Medical · Overdue · High · Economizer stuck shut · Northgate Dental · Scheduled · Normal · Contactor replacement · Harborview Hotel · … 2 more
- pr12238-rt2-chromium-t3-table-filter-1280-head-37fdd5c4da.png: Status · Priority · Customer · 5 · of · 5 · Job · Customer · Status · Priority · VAV zones not cooling · Northgate Dental · In progress · High · Exhaust fan noise · Riverside Club · On hold · Normal · Humidifier board fault · Summit Medical · Overdue · High · Economizer stuck shut · Northgate Dental · Scheduled · Normal · Contactor replacement · Harborview Hotel · … 2 more
- pr12238-rt2-chromium-t3-table-filter-1280-ref-87637c6bae.png: Status · Priority · Customer · 5 · of · 5 · Job · Customer · Status · Priority · VAV zones not cooling · Northgate Dental · In progress · High · Exhaust fan noise · Riverside Club · On hold · Normal · Humidifier board fault · Summit Medical · Overdue · High · Economizer stuck shut · Northgate Dental · Scheduled · Normal · Contactor replacement · Harborview Hotel · … 2 more
- pr12238-rt2-chromium-t4-one-item-main-2ff1afc9f8.png: Go
- pr12238-rt2-chromium-t4-one-item-head-37fdd5c4da.png: Go
- pr12238-rt2-chromium-t4-one-item-ref-87637c6bae.png: Go
- pr12238-rt2-chromium-t5-start-only-main-2ff1afc9f8.png: 3 selected · Delete · Archive
- pr12238-rt2-chromium-t5-start-only-head-37fdd5c4da.png: 3 selected · Delete · Archive
- pr12238-rt2-chromium-t5-start-only-ref-87637c6bae.png: 3 selected · Delete · Archive
- pr12238-rt2-chromium-t5-end-only-main-2ff1afc9f8.png: Cancel · Save
- pr12238-rt2-chromium-t5-end-only-head-37fdd5c4da.png: Cancel · Save
- pr12238-rt2-chromium-t5-end-only-ref-87637c6bae.png: Cancel · Save
- pr12238-rt2-chromium-t5-vertical-main-2ff1afc9f8.png: Cut · Copy · Paste
- pr12238-rt2-chromium-t5-vertical-head-37fdd5c4da.png: Cut · Copy · Paste
- pr12238-rt2-chromium-t5-vertical-ref-87637c6bae.png: Cut · Copy · Paste
- pr12238-rt2-chromium-o1-caller-limited-main-2ff1afc9f8.png: Save · Edit · +4 · Save · Edit · +4 · Save · Edit · +4 · "+" (clipped from "+6") · "+" (clipped from "+6") · Save · Edit · Duplicate · +3
- pr12238-rt2-chromium-o1-caller-limited-head-37fdd5c4da.png: Save · Edit · +4 · Save · Edit · +4 · Save · Edit · +4 · +6 · +6 · Save · Edit · Duplicate · +3
- pr12238-rt2-chromium-o1-caller-limited-ref-87637c6bae.png: Save · Edit · +4 · Save · Edit · +4 · Save · Edit · +4 · +6 · Save · Edit · Duplicate · +3
- pr12238-rt2-chromium-o2-widen-after-fold-main-2ff1afc9f8-140px-frame1.png: +10 · A1 · +9 · +10
- pr12238-rt2-chromium-o2-widen-after-fold-main-2ff1afc9f8-900px-frame1.png: +10 · A1 · +9 · +10
- pr12238-rt2-chromium-o2-widen-after-fold-head-37fdd5c4da-140px-frame1.png: +9 · A10 · A1 · +9 · A1 · A2 · +8
- pr12238-rt2-chromium-o2-widen-after-fold-head-37fdd5c4da-900px-frame1.png: A1 · A2 · A3 · A4 · A5 · A6 · A7 · A8 · A9 · A10 · A1 · A2 · A3 · A4 · A5 · A6 · A7 · A8 · A9 · A10 · A1 · A2 · A3 · A4 · A5 · A6 · A7 · A8 · … 2 more
- pr12238-rt2-chromium-o2-widen-after-fold-ref-87637c6bae-140px-frame1.png: +9 · A10 · A1 · +9 · A1 · +9
- pr12238-rt2-chromium-o2-widen-after-fold-ref-87637c6bae-140px-frame2.png: +9 · A10 · A1 · +9 · A1 · +9 / then +9 · A10 · A1 · +9 · +10 (the page changed while this still was taken)
- pr12238-rt2-chromium-o2-widen-after-fold-ref-87637c6bae-900px-frame1.png: A1 · A2 · A3 · A4 · A5 · A6 · A7 · A8 · A9 · A10 · A1 · A2 · A3 · A4 · A5 · A6 · A7 · A8 · A9 · A10 · A1 · A2 · A3 · A4 · A5 · A6 · A7 · A8 · … 2 more
- pr12238-rt2-chromium-o3-calc-row-main-2ff1afc9f8-frame1.png: Save · Edit · +4
- pr12238-rt2-chromium-o3-calc-row-head-37fdd5c4da-frame1.png: Save · Edit · +4
- pr12238-rt2-chromium-o3-calc-row-ref-87637c6bae-frame1.png: Save · Edit · +4
- pr12238-rt2-chromium-o4-followed-by-sibling-main-2ff1afc9f8-step1-900px.png: Save · Edit · Duplicate · Share · Archive · Delete · After · Save · Edit
- pr12238-rt2-chromium-o4-followed-by-sibling-main-2ff1afc9f8-step2-300px.png: Save · Edit · +4 · After · Save · Edit
- pr12238-rt2-chromium-o4-followed-by-sibling-main-2ff1afc9f8-step3-900px.png: Save · Edit · +4 · After · Save · Edit
- pr12238-rt2-chromium-o4-followed-by-sibling-main-2ff1afc9f8-block-parent.png: Save · Edit
- pr12238-rt2-chromium-o4-followed-by-sibling-head-37fdd5c4da-step1-900px.png: Save · Edit · Duplicate · Share · Archive · Delete · After · Save · Edit
- pr12238-rt2-chromium-o4-followed-by-sibling-head-37fdd5c4da-step2-300px.png: Save · Edit · +4 · After · Save · Edit
- pr12238-rt2-chromium-o4-followed-by-sibling-head-37fdd5c4da-step3-900px.png: Save · Edit · Duplicate · Share · Archive · Delete · After · Save · Edit
- pr12238-rt2-chromium-o4-followed-by-sibling-head-37fdd5c4da-block-parent.png: Save · Edit
- pr12238-rt2-chromium-o4-followed-by-sibling-ref-87637c6bae-step1-900px.png: Save · Edit · Duplicate · Share · Archive · Delete · After · Save · Edit
- pr12238-rt2-chromium-o4-followed-by-sibling-ref-87637c6bae-step2-300px.png: Save · Edit · +4 · After · Save · Edit
- pr12238-rt2-chromium-o4-followed-by-sibling-ref-87637c6bae-step3-900px.png: Save · Edit · Duplicate · Share · Archive · Delete · After · Save · Edit
- pr12238-rt2-chromium-o4-followed-by-sibling-ref-87637c6bae-block-parent.png: Save · Edit
- pr12238-rt2-chromium-o5-scaled-row-main-2ff1afc9f8.png: Save · Edit · Duplicate · Share · Archive · Delete · "+" (clipped from "+6")
- pr12238-rt2-chromium-o5-scaled-row-head-37fdd5c4da.png: Save · Edit · Duplicate · Share · Archive · Delete · +6
- pr12238-rt2-chromium-o5-scaled-row-ref-87637c6bae.png: Save · Edit · Duplicate · Share · Archive · Delete · "+" (clipped from "+6")
- pr12238-rt2-chromium-o6-count-capped-main-2ff1afc9f8.png: Save · Edit · Duplicate · +3
- pr12238-rt2-chromium-o6-count-capped-main-2ff1afc9f8-outlined.png: Save · Edit · Duplicate · +3
- pr12238-rt2-chromium-o6-count-capped-head-37fdd5c4da.png: Save · Edit · Duplicate · +3
- pr12238-rt2-chromium-o6-count-capped-head-37fdd5c4da-outlined.png: Save · Edit · Duplicate · +3
- pr12238-rt2-chromium-o6-count-capped-ref-87637c6bae.png: Save · Edit · Duplicate · +3
- pr12238-rt2-chromium-o6-count-capped-ref-87637c6bae-outlined.png: Save · Edit · Duplicate · +3
- pr12238-rt2-firefox-t1-actions-380-ltr-main-2ff1afc9f8.png: 5 selected · Save · Edit · Duplicate · Share · ("Archive" shows only a sliver of one glyph at a box edge) · ("Delete" not shown) · ("Clear" not shown)
- pr12238-rt2-firefox-t1-actions-380-ltr-head-37fdd5c4da.png: 5 selected · Save · Edit · +4 · Clear
- pr12238-rt2-firefox-t1-actions-380-ltr-ref-87637c6bae.png: 5 selected · Save · Edit · +4 · Clear
- pr12238-rt2-firefox-t1-actions-380-rtl-main-2ff1afc9f8.png: ("Clear" not shown) · ("Delete" not shown) · ("Archive" shows only a sliver of one glyph at a box edge) · Share · Duplicate · Edit · Save · 5 selected
- pr12238-rt2-firefox-t1-actions-380-rtl-head-37fdd5c4da.png: Clear · +4 · Edit · Save · 5 selected
- pr12238-rt2-firefox-t1-actions-380-rtl-ref-87637c6bae.png: Clear · +4 · Edit · Save · 5 selected
- pr12238-rt2-firefox-t2-two-lists-380-main-2ff1afc9f8.png: Save · Edit · Duplicate · Share · Archive · "D" (clipped from "Delete") · ("Save" not shown) · ("Edit" not shown) · ("Duplicate" not shown) · ("Share" not shown) · ("Archive" not shown) · ("Delete" not shown) · ("Clear" not shown)
- pr12238-rt2-firefox-t2-two-lists-380-head-37fdd5c4da.png: Save · +5 · Save · +5 · Clear
- pr12238-rt2-firefox-t2-two-lists-380-ref-87637c6bae.png: Save · +5 · Save · +5 · Clear
- pr12238-rt2-firefox-t2-two-lists-530-main-2ff1afc9f8.png: Save · Edit · Duplicate · Share · Archive · Delete · Save · Edit · ("Duplicate" not shown) · ("Share" not shown) · ("Archive" not shown) · ("Delete" not shown) · ("Clear" not shown)
- pr12238-rt2-firefox-t2-two-lists-530-head-37fdd5c4da.png: Save · Edit · +4 · Save · Edit · +4 · Clear
- pr12238-rt2-firefox-t2-two-lists-530-ref-87637c6bae.png: Save · Edit · +4 · Save · Edit · +4 · Clear
- pr12238-rt2-firefox-t2-two-lists-900-main-2ff1afc9f8.png: Save · Edit · Duplicate · Share · Archive · Delete · Save · Edit · Duplicate · Share · Archive · Delete · Clear
- pr12238-rt2-firefox-t2-two-lists-900-head-37fdd5c4da.png: Save · Edit · Duplicate · Share · Archive · +1 · Save · Edit · Duplicate · Share · Archive · +1 · Clear
- pr12238-rt2-firefox-t2-two-lists-900-ref-87637c6bae.png: Save · Edit · Duplicate · Share · Archive · +1 · Save · Edit · Duplicate · Share · Archive · +1 · Clear
- pr12238-rt2-firefox-t3-table-filter-1280-main-2ff1afc9f8.png: Status · Priority · Customer · 5 · of · 5 · Job · Customer · Status · Priority · VAV zones not cooling · Northgate Dental · In progress · High · Exhaust fan noise · Riverside Club · On hold · Normal · Humidifier board fault · Summit Medical · Overdue · High · Economizer stuck shut · Northgate Dental · Scheduled · Normal · Contactor replacement · Harborview Hotel · … 2 more
- pr12238-rt2-firefox-t3-table-filter-1280-head-37fdd5c4da.png: Status · Priority · Customer · 5 · of · 5 · Job · Customer · Status · Priority · VAV zones not cooling · Northgate Dental · In progress · High · Exhaust fan noise · Riverside Club · On hold · Normal · Humidifier board fault · Summit Medical · Overdue · High · Economizer stuck shut · Northgate Dental · Scheduled · Normal · Contactor replacement · Harborview Hotel · … 2 more
- pr12238-rt2-firefox-t3-table-filter-1280-ref-87637c6bae.png: Status · Priority · Customer · 5 · of · 5 · Job · Customer · Status · Priority · VAV zones not cooling · Northgate Dental · In progress · High · Exhaust fan noise · Riverside Club · On hold · Normal · Humidifier board fault · Summit Medical · Overdue · High · Economizer stuck shut · Northgate Dental · Scheduled · Normal · Contactor replacement · Harborview Hotel · … 2 more
- pr12238-rt2-firefox-t4-one-item-main-2ff1afc9f8.png: Go
- pr12238-rt2-firefox-t4-one-item-head-37fdd5c4da.png: Go
- pr12238-rt2-firefox-t4-one-item-ref-87637c6bae.png: Go
- pr12238-rt2-firefox-t5-start-only-main-2ff1afc9f8.png: 3 selected · Delete · Archive
- pr12238-rt2-firefox-t5-start-only-head-37fdd5c4da.png: 3 selected · Delete · Archive
- pr12238-rt2-firefox-t5-start-only-ref-87637c6bae.png: 3 selected · Delete · Archive
- pr12238-rt2-firefox-t5-end-only-main-2ff1afc9f8.png: Cancel · Save
- pr12238-rt2-firefox-t5-end-only-head-37fdd5c4da.png: Cancel · Save
- pr12238-rt2-firefox-t5-end-only-ref-87637c6bae.png: Cancel · Save
- pr12238-rt2-firefox-t5-vertical-main-2ff1afc9f8.png: Cut · Copy · Paste
- pr12238-rt2-firefox-t5-vertical-head-37fdd5c4da.png: Cut · Copy · Paste
- pr12238-rt2-firefox-t5-vertical-ref-87637c6bae.png: Cut · Copy · Paste
- pr12238-rt2-firefox-o1-caller-limited-main-2ff1afc9f8.png: Save · Edit · +4 · Save · Edit · +4 · Save · Edit · +4 · "+" (clipped from "+6") · "+" (clipped from "+6") · Save · Edit · Duplicate · +3
- pr12238-rt2-firefox-o1-caller-limited-head-37fdd5c4da.png: Save · Edit · +4 · Save · Edit · +4 · Save · Edit · +4 · +6 · +6 · Save · Edit · Duplicate · +3
- pr12238-rt2-firefox-o1-caller-limited-ref-87637c6bae.png: Save · Edit · +4 · Save · Edit · +4 · Save · Edit · +4 · Save · Edit · Duplicate · +3
- pr12238-rt2-firefox-o2-widen-after-fold-main-2ff1afc9f8-140px-frame1.png: +10 · A1 · +9 · +10
- pr12238-rt2-firefox-o2-widen-after-fold-main-2ff1afc9f8-900px-frame1.png: +10 · A1 · +9 · +10
- pr12238-rt2-firefox-o2-widen-after-fold-head-37fdd5c4da-140px-frame1.png: +9 · A10 · A1 · +9 · A1 · A2 · +8
- pr12238-rt2-firefox-o2-widen-after-fold-head-37fdd5c4da-900px-frame1.png: A1 · A2 · A3 · A4 · A5 · A6 · A7 · A8 · A9 · A10 · A1 · A2 · A3 · A4 · A5 · A6 · A7 · A8 · A9 · A10 · A1 · A2 · A3 · A4 · A5 · A6 · A7 · A8 · … 2 more
- pr12238-rt2-firefox-o2-widen-after-fold-ref-87637c6bae-140px-frame1.png: +9 · A10 · A1 · +9 · +10 / then +9 · A10 · A1 · +9 · A1 · +9 (the page changed while this still was taken)
- pr12238-rt2-firefox-o2-widen-after-fold-ref-87637c6bae-900px-frame1.png: A1 · A2 · A3 · A4 · A5 · A6 · A7 · A8 · A9 · A10 · A1 · A2 · A3 · A4 · A5 · A6 · A7 · A8 · A9 · A10 · A1 · A2 · A3 · A4 · A5 · A6 · A7 · A8 · … 2 more
- pr12238-rt2-firefox-o3-calc-row-main-2ff1afc9f8-frame1.png: Save · Edit · +4
- pr12238-rt2-firefox-o3-calc-row-head-37fdd5c4da-frame1.png: Save · Edit · +4
- pr12238-rt2-firefox-o3-calc-row-ref-87637c6bae-frame1.png: Save · Edit · +4
- pr12238-rt2-firefox-o4-followed-by-sibling-main-2ff1afc9f8-step1-900px.png: Save · Edit · Duplicate · Share · Archive · Delete · After · Save · Edit
- pr12238-rt2-firefox-o4-followed-by-sibling-main-2ff1afc9f8-step2-300px.png: Save · Edit · +4 · After · Save · Edit
- pr12238-rt2-firefox-o4-followed-by-sibling-main-2ff1afc9f8-step3-900px.png: Save · Edit · +4 · After · Save · Edit
- pr12238-rt2-firefox-o4-followed-by-sibling-main-2ff1afc9f8-block-parent.png: Save · Edit
- pr12238-rt2-firefox-o4-followed-by-sibling-head-37fdd5c4da-step1-900px.png: Save · Edit · Duplicate · Share · Archive · Delete · After · Save · Edit
- pr12238-rt2-firefox-o4-followed-by-sibling-head-37fdd5c4da-step2-300px.png: Save · Edit · +4 · After · Save · Edit
- pr12238-rt2-firefox-o4-followed-by-sibling-head-37fdd5c4da-step3-900px.png: Save · Edit · Duplicate · Share · Archive · Delete · After · Save · Edit
- pr12238-rt2-firefox-o4-followed-by-sibling-head-37fdd5c4da-block-parent.png: Save · Edit
- pr12238-rt2-firefox-o4-followed-by-sibling-ref-87637c6bae-step1-900px.png: Save · Edit · Duplicate · Share · Archive · Delete · After · Save · Edit
- pr12238-rt2-firefox-o4-followed-by-sibling-ref-87637c6bae-step2-300px.png: Save · Edit · +4 · After · Save · Edit
- pr12238-rt2-firefox-o4-followed-by-sibling-ref-87637c6bae-step3-900px.png: Save · Edit · Duplicate · Share · Archive · Delete · After · Save · Edit
- pr12238-rt2-firefox-o4-followed-by-sibling-ref-87637c6bae-block-parent.png: Save · Edit
- pr12238-rt2-firefox-o5-scaled-row-main-2ff1afc9f8.png: Save · Edit · Duplicate · Share · Archive · Delete · "+" (clipped from "+6")
- pr12238-rt2-firefox-o5-scaled-row-head-37fdd5c4da.png: Save · Edit · Duplicate · Share · Archive · Delete · +6
- pr12238-rt2-firefox-o5-scaled-row-ref-87637c6bae.png: Save · Edit · Duplicate · Share · Archive · Delete · "+" (clipped from "+6")
- pr12238-rt2-firefox-o6-count-capped-main-2ff1afc9f8.png: Save · Edit · Duplicate · +3
- pr12238-rt2-firefox-o6-count-capped-main-2ff1afc9f8-outlined.png: Save · Edit · Duplicate · +3
- pr12238-rt2-firefox-o6-count-capped-head-37fdd5c4da.png: Save · Edit · Duplicate · +3
- pr12238-rt2-firefox-o6-count-capped-head-37fdd5c4da-outlined.png: Save · Edit · Duplicate · +3
- pr12238-rt2-firefox-o6-count-capped-ref-87637c6bae.png: Save · Edit · Duplicate · +3
- pr12238-rt2-firefox-o6-count-capped-ref-87637c6bae-outlined.png: Save · Edit · Duplicate · +3
