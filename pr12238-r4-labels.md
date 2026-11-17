# #12238 round 4 stills (test data, local Storybook builds)

- Builds, with stamps read back from each served build:
  - head: 87637c6bae2a4a20274946b585b673854b866c37.
  - old head: 7b992328d7bf173f2c2a9f3d4142911bde3ba841.
  - main: f4790a39497da47719e828ee39bb81d43246de13, the head's merge-base.
- The main and old-head builds carry the head's story files byte for byte. They are apps/storybook/stories/OverflowList.stories.tsx (sha256 e7fa986e63cb2e3d…) and Toolbar.stories.tsx (a1d6b8c97ba12f55…). Product code is each SHA's own.
- Browsers: Playwright Chromium 149.0.7827.55 and Playwright Firefox 151.0. Light, deviceScaleFactor 2, viewport 1400×900.
- New cases: the width is set as the PR's spec sets it, then held 300 ms.
  - Then the list labels are read on 12 consecutive animation frames.
  - Then 3 raw stills are taken 100 ms apart. New 2 adds 6 back-to-back stills.
  - A DOM read and a still are never the same frame.

## The PR's own spec cases (positive control)
The head's ToolbarOverflowList.interaction.browser.spec.ts (sha256 8f3c291f223bbbf9…) ran unedited. It used the chromium project of playwright.interaction.config.ts, with retries 0 and repeat-each 5.

| Case | old head 7b992328d7 | head 87637c6bae |
|---|---|---|
| in a row that narrows and widens again, a list folding from the start and one keeping an item unfold | 0 of 5 pass. At 900 px the one-kept list reads ["A1", "+9"], not 10 items. | 5 of 5 pass |
| a list capped with calc() holds one fold across frames | 0 of 5 pass. The samples differ across frames. | 5 of 5 pass |

## New 1: RowWidensAfterFold (a from-start list and a one-kept list)
- Head, both engines:
  - 140 px: [+9, A10] + [A1, +9] on all 12 frames.
  - 900 px: all 10 items in both lists on all 12 frames.
- Old head at 900 px, both engines: the from-start list shows all 10 items. The one-kept list stays folded as [A1, +9] on all 12 frames.
- Old head at 140 px:
  - Firefox: the labels alternate on 11 of 12 frames, between [+9, A10] + [A1, +9] and [+10] + [A1, +9]. Its 3 stills catch both.
  - Chromium: the DOM reads [+10] + [A1, +9] on all 12 frames. Yet all 3 stills paint the same pixels as the head's [+9, A10] + [A1, +9].
- Main (an extra), both engines: [+10] + [A1, +9] at 140 px and at 900 px. Both lists stay folded.

## New 2: the width-calc row of CallerLimitedWidth (max-width: calc(25% + 30px) in a 700 px row)
- Head and main, both engines: [Save, Edit, +4] on all 12 frames. All 9 stills are identical.
- Old head, both engines: the labels alternate on 11 of 12 frames. One state is [Save, Edit, +4]; the other is all six buttons.
  - Firefox: the 9 stills catch both. Some show the folded row, with the same pixels as the head. The rest show six buttons squeezed into the capped width.
  - Chromium: this run's 9 stills all show the folded row. An earlier run of the same build caught the squeezed row in all 3 of its stills (the -run1- files).

## The usual set (main vs head), both engines
- TwoOverflowLists at 380, 530 and 900 px: main never folds, and its end lane runs past the frame. The head folds each list into its own "+N" trigger, and the end lane stays inside.
- CallerLimitedWidth, all three rows: main and head are identical (0 px differ).
- #8804 OverflowActions at 380 px: main keeps all six actions in one row, which runs past the box. The head shows Save, Edit, +4, with Clear inside.

## Files
- Usual set: pr12238-r4-<engine>-<case>-<main-f4790a3949|head-87637c6bae>.png, where <case> is one of:
  - 1-two-lists-380, 1-two-lists-530, 1-two-lists-900
  - 2-caller-limited-width
  - 3-overflow-actions-380
- New 1: pr12238-r4-<engine>-4-widen-after-fold-<build>-<140px|900px>-frame<n>.png. The old head has frames 1 to 3; the head and main have frame 1.
- New 2: pr12238-r4-<engine>-5-calc-cap-<build>-<frame1..3|burst1..6>.png. The old head has all 9; the head and main have frame 1.
- The earlier Chromium run: pr12238-r4-chromium-5-calc-cap-oldhead-7b992328d7-run1-frame<1..3>.png.
