# Date and time text in the locale's direction (#13151), and an Arabic calendar in Firefox (#13174)

#13151's head: 8fb4c95b7f2e9889a70c84b4d7684695204b636a. #13174's head: b367958e951aa28de28119181b05f8d4a3e91046. Main: 5360d6e352e592e3471c986d707af57ae5f08c21. This index covers desktop Chromium and Firefox.

## Answer (test)

- Native date, en-GB, on an RTL page: main draws "March 2026 15". The head draws "15 March 2026", at the right edge, not clipped.
- Native date, ar-EG, on an RTL page: both builds draw the date right to left, day first, as "١٥ مارس ٢٠٢٦". Its digits are Arabic-Indic.
- The ar-EG glyph order equals the browser's own right-to-left rendering of the same text, so nothing is reversed twice.
- For ar-EG, the head's frames are byte-identical to main's, on both pages.
- TimeInput "With Value", 12-hour, on the RTL page: main draws "PM 2:30", and the head draws "2:30 PM", in both presentations.
- On the LTR page, all 4 head frames are byte-identical to main's.
- Firefox, the ar-SA calendar: main lays it out left to right, and the head lays it out right to left. The English calendar does not change.

## Builds

- Main is 5360d6e3. Case 2 and #13174 use its Production deploy, by its version.json (environment "production").
- #13151's head is the preview deploy of 8fb4c95b. #13174's head is the preview deploy of b367958e. Both are checked by version.json (environment "preview").
- Case 1 uses local Storybook builds of 8fb4c95b and 5360d6e3, because no story renders a native DateTimeInput under en-GB or ar-EG.
- Both local builds add one identical scratch story, `scratch-story.tsx`, which is in neither pull request.
- The scratch story puts a native DateTimeInput, with the value 2026-03-15T09:00, in a provider with the locale and no `dir`. The pull request's unit test does the same.

## Case 1: the native date (test)

| Case | Page | Main: the text on screen, left to right | Main: where it sits | Head: the text on screen, left to right | Head: where it sits | Head: `dir`, direction, text-align | Head frame against main |
| --- | --- | --- | --- | --- | --- | --- | --- |
| DateTimeInput, native, en-GB: the date | RTL | "March 2026 15" | right edge, 0 px gap, not clipped | "15 March 2026" | right edge, 0 px gap, not clipped | ltr, ltr, right | differs (2133 px) |
| DateTimeInput, native, en-GB: the date | LTR | "15 March 2026" | left edge, 0 px gap, not clipped | "15 March 2026" | left edge, 0 px gap, not clipped | ltr, ltr, left | byte-identical |
| DateTimeInput, native, ar-EG: the date | RTL | "٢٠٢٦ سرام ١٥"; read right to left: ١٥ مارس ٢٠٢٦ | right edge, 0 px gap, not clipped | "٢٠٢٦ سرام ١٥"; read right to left: ١٥ مارس ٢٠٢٦ | right edge, 0 px gap, not clipped | rtl, rtl, right | byte-identical |
| DateTimeInput, native, ar-EG: the date | LTR | "٢٠٢٦ سرام ١٥"; read right to left: ١٥ مارس ٢٠٢٦ | left edge, 0 px gap, not clipped | "٢٠٢٦ سرام ١٥"; read right to left: ١٥ مارس ٢٠٢٦ | left edge, 0 px gap, not clipped | rtl, rtl, left | byte-identical |

The time beside the date:

| Case | Page | Main: the text on screen, left to right | Main: where it sits | Head: the text on screen, left to right | Head: where it sits | Head: `dir`, direction, text-align | Head frame against main |
| --- | --- | --- | --- | --- | --- | --- | --- |
| DateTimeInput, native, en-GB: the time | RTL | "09:00" | right edge, 0 px gap, not clipped | "09:00" | right edge, 0 px gap, not clipped | ltr, ltr, right | differs (2133 px) |
| DateTimeInput, native, en-GB: the time | LTR | "09:00" | left edge, 0 px gap, not clipped | "09:00" | left edge, 0 px gap, not clipped | ltr, ltr, left | byte-identical |
| DateTimeInput, native, ar-EG: the time | RTL | "ص ٩:٠٠"; read right to left: ٩:٠٠ ص | right edge, 0 px gap, not clipped | "ص ٩:٠٠"; read right to left: ٩:٠٠ ص | right edge, 0 px gap, not clipped | rtl, rtl, right | byte-identical |
| DateTimeInput, native, ar-EG: the time | LTR | "ص ٩:٠٠"; read right to left: ٩:٠٠ ص | left edge, 0 px gap, not clipped | "ص ٩:٠٠"; read right to left: ٩:٠٠ ص | left edge, 0 px gap, not clipped | rtl, rtl, left | byte-identical |

- "Where it sits" compares the text's ends with its input's content box. On an RTL page, the right edge is the start.
- On main, the en-GB text has no `dir` of its own, so the RTL page reorders it. The head gives the date input and its overlay the locale's `dir`.

### The date's digits (ar-EG)

| Build | Page | Arabic-Indic digits in the date | ASCII digits in the date | Glyph order equals the browser's own rendering of the same text with its `dir` |
| --- | --- | --- | --- | --- |
| main | RTL | 6 | 0 | yes |
| main | LTR | 6 | 0 | yes |
| head | RTL | 6 | 0 | yes |
| head | LTR | 6 | 0 | yes |

### The native date input's own text

| Case | Build | Page | The date input's own text | Its color and text fill | Drawn |
| --- | --- | --- | --- | --- | --- |
| en-GB | main | RTL | "03/15/2026" | rgba(0, 0, 0, 0) / rgba(0, 0, 0, 0) | no |
| en-GB | head | RTL | "03/15/2026" | rgba(0, 0, 0, 0) / rgba(0, 0, 0, 0) | no |
| ar-EG | main | RTL | "03/15/2026" | rgba(0, 0, 0, 0) / rgba(0, 0, 0, 0) | no |
| ar-EG | head | RTL | "03/15/2026" | rgba(0, 0, 0, 0) / rgba(0, 0, 0, 0) | no |

- The date input's own text is transparent on both builds. The overlay above it draws the date, so the overlay is what is read.

## Case 2: TimeInput, With Value (test)

| Case | Page | Main: the text on screen, left to right | Main: where it sits | Head: the text on screen, left to right | Head: where it sits | Head: `dir`, direction, text-align | Head frame against main |
| --- | --- | --- | --- | --- | --- | --- | --- |
| TimeInput, With Value, 12-hour, text input | RTL | "PM 2:30" | right edge, 0 px gap, not clipped | "2:30 PM" | right edge, 0 px gap, not clipped | ltr, ltr, right | differs (1372 px) |
| TimeInput, With Value, 12-hour, text input | LTR | "2:30 PM" | left edge, 0 px gap, not clipped | "2:30 PM" | left edge, 0 px gap, not clipped | ltr, ltr, left | byte-identical |
| TimeInput, With Value, 12-hour, native | RTL | "PM 2:30" | right edge, 0 px gap, not clipped | "2:30 PM" | right edge, 0 px gap, not clipped | ltr, ltr, right | differs (1372 px) |
| TimeInput, With Value, 12-hour, native | LTR | "2:30 PM" | left edge, 0 px gap, not clipped | "2:30 PM" | left edge, 0 px gap, not clipped | ltr, ltr, left | byte-identical |

- For the text input, the time is the input's own text, read through its shadow text. For the native presentation, it is the overlay's text.

## #13174: an Arabic calendar in Firefox (test)

- The stories are in Core/Internationalization/Calendar systems: "Islamic (Umm al-Qura), ar-SA" and "ISO 8601, English".
- Each story puts its Calendar in a provider with the locale and no `dir`. The wrapper's `dir` comes from `getLocaleDirection(locale)`.
- This Firefox has no `Intl.Locale` text info: for ar-SA, `textInfo` is null, and `getTextInfo` is undefined.

| Story | Build | Wrapper `dir` | Wrapper and grid direction | Weekday headers, first and last (x) | First week, first and last cell (x) | First and last day cell of the grid (x) |
| --- | --- | --- | --- | --- | --- | --- |
| Islamic (Umm al-Qura), ar-SA | main | ltr | ltr, ltr | "سبت" at 60.6, "جمعة" at 260.2: first left of last (left to right) | "٢٩" at 60.6, "٥" at 260.2 | "٢٩" at 60.6, "١٠" at 260.2 |
| Islamic (Umm al-Qura), ar-SA | head | rtl | rtl, rtl | "سبت" at 260.2, "جمعة" at 60.6: first right of last (right to left) | "٢٩" at 260.2, "٥" at 60.6 | "٢٩" at 260.2, "١٠" at 60.6 |
| ISO 8601, English | main | ltr | ltr, ltr | "Mon" at 60, "Sun" at 252: first left of last (left to right) | "28" at 60, "4" at 252 | "28" at 60, "8" at 252 |
| ISO 8601, English | head | ltr | ltr, ltr | "Mon" at 60, "Sun" at 252: first left of last (left to right) | "28" at 60, "4" at 252 | "28" at 60, "8" at 252 |

- The x values are the cells' centers, in CSS pixels. The first and last day cells of the grid include the days outside the month.
- The English frames are byte-identical between the builds.

## Not covered

- iPhone Safari: those rows come from a separate run, and are added to this index later.

## Method

- Desktop Chromium 149.0.7827.55 through Playwright, 1280 × 900 px, at scale 2. The page direction comes from the Storybook `direction` global.
- The text on screen is read from each visible character's box, sorted from left to right. Each character is measured with a Range.
- Light-DOM text is measured directly. An input's own text is measured through its user-agent shadow text.
- Text that is transparent, hidden, fully faded or clipped is left out.
- The browser also lays out each drawn text in a separate span, with the text's own `dir`. The drawn glyph order must equal that layout.
- "Read right to left" lists the words from the rightmost to the leftmost, each spelled in its own order.
- Firefox 151.0 through Playwright, 1280 × 900 px, at scale 1. Each reading is the computed direction and the x of cell centers.
- All numbers are test measurements from one machine. Every frame was looked at.

## Files

- `<build>-<case>-<direction>.png`: the field, cropped to the page content. A `-zoom` file is the right end of an RTL frame, at full scale.
- `firefox-<build>-<story>.png`: the calendar, cropped to the page content.
- `scratch-story.tsx`: the scratch story of Case 1.
- `measurements.json`: every reading, with each character's box, and the summaries.
