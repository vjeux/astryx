# Fields grow with larger text: before and after

Main: the production build at 3492268f1a3c53feb6681d96b0fb651b174dcf00 (its version.json). Its Core is the same as the head's base a19a5170: that commit changes no file under `packages/core`.
Head: the preview build at 25a969072c0eb9f12eb8977f05ce51fc43e8059e (its version.json).

## Method

- Each build's docs-site Playground renders one test page, `page.tsx` here: every field at sm, md and lg, a 120 px FileInput, and two horizontal `FormLayout` rows of mixed fields.
- The stills show the preview only, page-only, in Chromium (Playwright).
- Desktop: 1280 px, mouse (fine pointer), scale 1. Phone: a 390 px preview with touch (coarse pointer), scale 2. The phone is Chromium, not iOS: the iOS-only 16 px text floor (`@supports (-webkit-touch-callout: none)`) does not apply here.
- 200% text: the preview document's root font size is set to 200% (32 px), not text-only zoom. 100% leaves it at 16 px.
- Light theme, plus one dark set at 200%.
- Height: `getBoundingClientRect()` of each field's frame, its outermost bordered element (DateTimeInput has two).
- Line box: the input's computed line height and the Range rects of the frame's text.
- Clipping (✗): an input whose content box is shorter than its line, `scrollHeight > clientHeight`, a text line outside the frame's inner edges, or a clipping element inside the frame. Visually hidden content (a hidden label, the file input) is skipped.
- Rows: the top and bottom deltas of the members' frames, and whether the members span the row (overflow is how far the last member runs past the row's end).

## Field heights (px)

| Field | Size | Desktop 100% (main = head) | Desktop 200% main | Desktop 200% head | Phone 100% (main = head) | Phone 200% main | Phone 200% head | Line at 200%, head |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| NumberInput | sm | 28 | 28 ✗ | 42 | 28 | 28 ✗ | 42 | 40 |
| NumberInput, steppers | sm | 28 | 28 ✗ | 51 | 28 | 28 ✗ | 42 | 40 |
| DateInput | sm | 28 | 28 ✗ | 42 | 28 | 28 ✗ | 42 | 40 |
| TimeInput | sm | 28 | 28 ✗ | 42 | 28 | 28 ✗ | 42 | 40 |
| DateTimeInput (date + time) | sm | 28 + 28 | 28 + 28 ✗ | 42 + 42 | 28 + 28 | 28 + 28 ✗ | 42 + 42 | 40 + 40 |
| FileInput (input mode) | sm | 32 | 32 ✗ | 42 | 32 | 32 ✗ | 42 | 34 |
| InputGroup + Button | sm | 28 | 28 ✗ | 42 | 28 | 28 ✗ | 42 | 40 |
| NumberInput | md | 32 | 32 ✗ | 42 | 32 | 32 ✗ | 42 | 40 |
| NumberInput, steppers | md | 32 | 32 ✗ | 51 | 32 | 32 ✗ | 42 | 40 |
| DateInput | md | 32 | 32 ✗ | 42 | 32 | 32 ✗ | 42 | 40 |
| TimeInput | md | 32 | 32 ✗ | 42 | 32 | 32 ✗ | 42 | 40 |
| DateTimeInput (date + time) | md | 32 + 32 | 32 + 32 ✗ | 42 + 42 | 32 + 32 | 32 + 32 ✗ | 42 + 42 | 40 + 40 |
| FileInput (input mode) | md | 32 | 32 ✗ | 42 | 32 | 32 ✗ | 42 | 34 |
| InputGroup + Button | md | 32 | 32 ✗ | 42 | 32 | 32 ✗ | 42 | 40 |
| NumberInput | lg | 36 | 36 ✗ | 42 | 36 | 36 ✗ | 42 | 40 |
| NumberInput, steppers | lg | 36 | 36 ✗ | 51 | 36 | 36 ✗ | 42 | 40 |
| DateInput | lg | 36 | 36 ✗ | 42 | 36 | 36 ✗ | 42 | 40 |
| TimeInput | lg | 36 | 36 ✗ | 42 | 36 | 36 ✗ | 42 | 40 |
| DateTimeInput (date + time) | lg | 36 + 36 | 36 + 36 ✗ | 42 + 42 | 36 + 36 | 36 + 36 ✗ | 42 + 42 | 40 + 40 |
| FileInput (input mode) | lg | 32 | 32 ✗ | 42 | 32 | 32 ✗ | 42 | 34 |
| InputGroup + Button | lg | 36 | 36 ✗ | 42 | 36 | 36 ✗ | 42 | 40 |
| FileInput, 120 px wide | md | 32 | 32 ✗ | 82 | 32 | 32 ✗ | 82 | 34 |

Dark at 200% gives the same heights as light, on both builds and both devices.

Clipping findings: d100 main 0 in 0 fields, head 0 in 0 fields; d200 main 37 in 28 fields, head 0 in 0 fields; p100 main 0 in 0 fields, head 0 in 0 fields; p200 main 43 in 28 fields, head 0 in 0 fields; d200dark main 37 in 28 fields, head 0 in 0 fields; p200dark main 43 in 28 fields, head 0 in 0 fields.

## Mixed rows

| Row | Condition | Build | Frame heights | Top delta | Bottom delta | Spans the row |
| --- | --- | --- | --- | --- | --- | --- |
| Text, Number + steppers, Date, Time, Group + Button | desktop-1280--text-100--light | main | 32, 32, 32, 32, 32 | 0 | 0 | yes |
| Number + steppers, Group + Button | desktop-1280--text-100--light | main | 32, 32 | 0 | 0 | yes |
| Text, Number + steppers, Date, Time, Group + Button | desktop-1280--text-100--light | head | 32, 32, 32, 32, 32 | 0 | 0 | yes |
| Number + steppers, Group + Button | desktop-1280--text-100--light | head | 32, 32 | 0 | 0 | yes |
| Text, Number + steppers, Date, Time, Group + Button | desktop-1280--text-200--light | main | 42, 32, 32, 32, 32 | 0 | 10 | no: 895 px past its end |
| Number + steppers, Group + Button | desktop-1280--text-200--light | main | 32, 32 | 0 | 0 | yes |
| Text, Number + steppers, Date, Time, Group + Button | desktop-1280--text-200--light | head | 42, 51, 42, 42, 42 | 0 | 9 | no: 895 px past its end |
| Number + steppers, Group + Button | desktop-1280--text-200--light | head | 51, 42 | 0 | 9 | yes |
| Text, Number + steppers, Date, Time, Group + Button | phone-390--text-100--light | main | 32, 32, 32, 32, 32 | 0 | 0 | no: 594 px past its end |
| Number + steppers, Group + Button | phone-390--text-100--light | main | 32, 32 | 0 | 0 | no: 62 px past its end |
| Text, Number + steppers, Date, Time, Group + Button | phone-390--text-100--light | head | 32, 32, 32, 32, 32 | 0 | 0 | no: 594 px past its end |
| Number + steppers, Group + Button | phone-390--text-100--light | head | 32, 32 | 0 | 0 | no: 62 px past its end |
| Text, Number + steppers, Date, Time, Group + Button | phone-390--text-200--light | main | 42, 32, 32, 32, 32 | 0 | 10 | no: 1453 px past its end |
| Number + steppers, Group + Button | phone-390--text-200--light | main | 32, 32 | 0 | 0 | no: 483 px past its end |
| Text, Number + steppers, Date, Time, Group + Button | phone-390--text-200--light | head | 42, 42, 42, 42, 42 | 0 | 0 | no: 1453 px past its end |
| Number + steppers, Group + Button | phone-390--text-200--light | head | 42, 42 | 0 | 0 | no: 483 px past its end |

## What the numbers show

- At 100% nothing moves: main and head stills are byte-identical on desktop and phone. Heights are 28, 32 and 36 px by size; FileInput is 32 px at every size on both builds.
- At 200% on main, every field keeps its 100% height, and its line runs past its border: 40 px, or 34 px in FileInput. TextInput, already on main, grows to 42 px.
- At 200% on the head, every field grows to hold its line, with no clipping finding. All three sizes become 42 px; a NumberInput with steppers is 51 px on desktop; the 120 px FileInput wraps its prompt to two lines and grows to 82 px.
- In a mixed row at 200% on desktop, the tops stay aligned. The bottoms differ by 9 px, because a NumberInput with steppers is 51 px and its neighbours are 42 px. On the phone the steppers are hidden, every member is 42 px, and the rows align.
- The five-field row runs past its end at 200% and on the phone, on both builds: FormLayout's equal columns do not shrink below a field's minimum width. The two-field row spans its row on desktop at both text sizes.
- At 200% a long value (a date, "Members") is cut at the field's inline end in narrow columns, on both builds; the input scrolls it.

## Stills

- desktop-1280--text-100--light: `desktop-1280--text-100--light--main.png`, `desktop-1280--text-100--light--pr.png` (head)
- desktop-1280--text-200--light: `desktop-1280--text-200--light--main.png`, `desktop-1280--text-200--light--pr.png` (head)
- phone-390--text-100--light: `phone-390--text-100--light--main.png`, `phone-390--text-100--light--pr.png` (head)
- phone-390--text-200--light: `phone-390--text-200--light--main.png`, `phone-390--text-200--light--pr.png` (head)
- desktop-1280--text-200--dark: `desktop-1280--text-200--dark--main.png`, `desktop-1280--text-200--dark--pr.png` (head)
- phone-390--text-200--dark: `phone-390--text-200--dark--main.png`, `phone-390--text-200--dark--pr.png` (head)
