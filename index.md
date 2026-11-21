# SegmentedControl at d492c143 on iPhone Safari: the segments grow with Dynamic Type

Head: #12457 at d492c14372604dc8950a2f03ae56bd3ed28b6f5c, on its preview deploy. Main: the Production deploy of 3d313c666b6cc67e6610dd568581de295b940e64. All numbers are test measurements.

## Answer (test)

- Default story, at the Default text size: the segment is 24 px tall on both builds, and the whole label is inside it.
- At AX3, AX4 and AX5, main's segment stays 24 px tall. The label's line box spills past it by 11, 15 and 19 px.
- On the head, the segment grows to 56, 66 and 74 px, the height of the label box. The whole label is inside its segment.
- Size variants: main's sm / md / lg segments stay 20 / 24 / 28 px at every size.
- On the head, they follow the label boxes: 50 / 56 / 56 at AX3, 58 / 66 / 66 at AX4, and 67 / 74 / 74 at AX5.
- At AX3, AX4 and AX5, every size variant's labels spill past their segments on main. On the head, none does.
- Both builds cut Day, Week and Month with an ellipsis at AX4 md and lg, and at AX5 sm, md and lg.
- Against the 872843fa take, 16 of 16 story, size and build cells are identical.

## What changed since 872843fa

- d492c143 merges main into the pull request. Since 872843fa, that adds 62 commits and changes 589 files.
- `packages/core/src/SegmentedControl/` is unchanged.
- `packages/core/src/Layer/useLayer.tsx` changed, with 128 lines added and 76 removed, so that Tab can pass through a popover.
- The layer module is shared code, so the 872843fa take was repeated at d492c143.

## Builds

- Head: the preview deploy of d492c143, by its version.json, read in the same page.
- Main: the Production deploy of 3d313c66, by its version.json, read in the same page. All 8 main takes read that commit.
- 3d313c66 is 2 commits past the head's merge base, facdcb9a. Neither commit changes SegmentedControl or the layer module.

## Repeat of the 872843fa take

- The 872843fa take is in measurements.json under `take872843fa`, with its head 872843fa and its main commits.
- Each segment's height, label box height, text line height and ellipsis flag is rounded to 0.1 px and compared cell by cell.
- The head is compared with head 872843fa, and main with main at each earlier take. 16 of 16 cells are identical.
- Each cell's values are in `repeatOf872843fa.perCell`.
- The line box's overhang past each segment's top and bottom edges also matches the earlier take, in 96 of 96 segments.

## Default story (`core-segmentedcontrol--default`)

| Dynamic Type | In-page body | Main: segment / label box / text line, px | Head: segment / label box / text line, px | Font size / line height, px (both builds) | Main: the label's line box past the segment | Head: the label's line box past the segment |
| --- | --- | --- | --- | --- | --- | --- |
| Default | 17px / 17px | 24 / 24 / 20 | 24 / 24 / 20 | 16 / 24 | none | none |
| AX3 | 40px / 40px | 24 / 56 / 46 | 56 / 56 / 46 | 37.6464 / 56.469601 | 11 px for Grid, List and Table; the text is outside the track | none |
| AX4 | 47px / 47px | 24 / 66 / 54 | 66 / 66 / 54 | 44.235199 / 66.352798 | 15 px for Grid, List and Table; the text is outside the track | none |
| AX5 | 53px / 53px | 24 / 74 / 61 | 74 / 74 / 61 | 49.881599 / 74.822395 | 19 px for Grid, List and Table; the text is outside the track | none |

## Size variants (`core-segmentedcontrol--size-variants`)

| Dynamic Type | In-page body | Main: segment height sm / md / lg, px | Main: label box sm / md / lg, px | Head: segment height sm / md / lg, px | Head: label box sm / md / lg, px |
| --- | --- | --- | --- | --- | --- |
| Default | 17px / 17px | 20 / 24 / 28 | 20 / 24 / 24 | 20 / 24 / 28 | 20 / 24 / 24 |
| AX3 | 40px / 40px | 20 / 24 / 28 | 50 / 56 / 56 | 50 / 56 / 56 | 50 / 56 / 56 |
| AX4 | 47px / 47px | 20 / 24 / 28 | 58 / 66 / 66 | 58 / 66 / 66 | 58 / 66 / 66 |
| AX5 | 53px / 53px | 20 / 24 / 28 | 67 / 74 / 74 | 67 / 74 / 74 | 67 / 74 / 74 |

### Spill and ellipsis, per size variant

| Dynamic Type | Variant | Build | The label's line box past the segment, for Day, Week and Month | Text outside the track | Ellipsis on Day, Week and Month | Label box / text line, px | Font size, px |
| --- | --- | --- | --- | --- | --- | --- | --- |
| AX3 | sm | main | 12 px | yes | no | 50 / 43 | 35.539001 |
| AX3 | md | main | 11 px | yes | no | 56 / 46 | 37.6464 |
| AX3 | lg | main | 9 px | yes | no | 56 / 46 | 37.6464 |
| AX4 | sm | main | 15 px | yes | no | 58 / 49 | 40.923401 |
| AX4 | md | main | 15 px | yes | yes | 66 / 54 | 44.235199 |
| AX4 | lg | main | 13 px | yes | yes | 66 / 54 | 44.235199 |
| AX4 | md | head | none | no | yes | 66 / 54 | 44.235199 |
| AX4 | lg | head | none | no | yes | 66 / 54 | 44.235199 |
| AX5 | sm | main | 19.5 px | yes | yes | 67 / 58 | 47.384399 |
| AX5 | md | main | 19 px | yes | yes | 74 / 61 | 49.881599 |
| AX5 | lg | main | 17 px | yes | yes | 74 / 61 | 49.881599 |
| AX5 | sm | head | none | no | yes | 67 / 58 | 47.384399 |
| AX5 | md | head | none | no | yes | 74 / 61 | 49.881599 |
| AX5 | lg | head | none | no | yes | 74 / 61 | 49.881599 |

- Cases that are not in this table have no spill, no text outside the track and no ellipsis.
- The spill is the line box's overhang past the segment's top edge. Past the bottom edge, it is the same or 1 px less.

## Method

- Device: the iPhone 11 Simulator, iOS 26.2 (runtime "iPhone 11.iOS 26.2"), 414 × 896 pt at 2x. Browser: Mobile Safari 26.2.
- Its user agent: `Mozilla/5.0 (iPhone; CPU iPhone OS 18_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/26.2 Mobile/15E148 Safari/604.1`.
- Each Dynamic Type size sets the preference that `simctl ui content_size` writes: `com.apple.UIKit UIPreferredContentSizeCategoryName`.
- The sizes are UICTContentSizeCategoryL (Default), AccessibilityXL (AX3), AccessibilityXXL (AX4) and AccessibilityXXXL (AX5).
- The value is read back, and Safari is relaunched. The page reads `font: -apple-system-body` back ("In-page body"), which confirms the active size.
- The builds are read from their version.json files, in the same page.
- A bookmarklet, run from Safari's Bookmarks list, reads the story's DOM in CSS px. It is the same script as in the 872843fa take.
- For each `[role=radio]` segment, it reads the segment's box and its label element's box (font size × line height).
- It also reads the label text's line box (Range rects), the ellipsis (scrollWidth > clientWidth) and the segment's overflow.

## Stills

The page area only, with main on the left and the head on the right. Each still carries a burned-in label with the build, its commit and the text size:

- `12457-default-l.png`
- `12457-default-ax3.png`
- `12457-default-ax4.png`
- `12457-default-ax5.png`
- `12457-size-variants-l.png`
- `12457-size-variants-ax3.png`
- `12457-size-variants-ax4.png`
- `12457-size-variants-ax5.png`

The stills keep their pixels. Only their tIME and caNv metadata chunks are removed.

## Per take

```
L head core-segmentedcontrol--default -> d492c14372604dc8950a2f03ae56bd3ed28b6f5c (pref read back: UICTContentSizeCategoryL)
L head core-segmentedcontrol--size-variants -> d492c14372604dc8950a2f03ae56bd3ed28b6f5c (pref read back: UICTContentSizeCategoryL)
L main core-segmentedcontrol--default -> 3d313c666b6cc67e6610dd568581de295b940e64 (pref read back: UICTContentSizeCategoryL)
L main core-segmentedcontrol--size-variants -> 3d313c666b6cc67e6610dd568581de295b940e64 (pref read back: UICTContentSizeCategoryL)
AX3 main core-segmentedcontrol--default -> 3d313c666b6cc67e6610dd568581de295b940e64 (pref read back: UICTContentSizeCategoryAccessibilityXL)
AX3 main core-segmentedcontrol--size-variants -> 3d313c666b6cc67e6610dd568581de295b940e64 (pref read back: UICTContentSizeCategoryAccessibilityXL)
AX3 head core-segmentedcontrol--default -> d492c14372604dc8950a2f03ae56bd3ed28b6f5c (pref read back: UICTContentSizeCategoryAccessibilityXL)
AX3 head core-segmentedcontrol--size-variants -> d492c14372604dc8950a2f03ae56bd3ed28b6f5c (pref read back: UICTContentSizeCategoryAccessibilityXL)
AX4 head core-segmentedcontrol--default -> d492c14372604dc8950a2f03ae56bd3ed28b6f5c (pref read back: UICTContentSizeCategoryAccessibilityXXL)
AX4 head core-segmentedcontrol--size-variants -> d492c14372604dc8950a2f03ae56bd3ed28b6f5c (pref read back: UICTContentSizeCategoryAccessibilityXXL)
AX4 main core-segmentedcontrol--default -> 3d313c666b6cc67e6610dd568581de295b940e64 (pref read back: UICTContentSizeCategoryAccessibilityXXL)
AX4 main core-segmentedcontrol--size-variants -> 3d313c666b6cc67e6610dd568581de295b940e64 (pref read back: UICTContentSizeCategoryAccessibilityXXL)
AX5 main core-segmentedcontrol--default -> 3d313c666b6cc67e6610dd568581de295b940e64 (pref read back: UICTContentSizeCategoryAccessibilityXXXL)
AX5 main core-segmentedcontrol--size-variants -> 3d313c666b6cc67e6610dd568581de295b940e64 (pref read back: UICTContentSizeCategoryAccessibilityXXXL)
AX5 head core-segmentedcontrol--default -> d492c14372604dc8950a2f03ae56bd3ed28b6f5c (pref read back: UICTContentSizeCategoryAccessibilityXXXL)
AX5 head core-segmentedcontrol--size-variants -> d492c14372604dc8950a2f03ae56bd3ed28b6f5c (pref read back: UICTContentSizeCategoryAccessibilityXXXL)
```
