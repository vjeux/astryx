# Time and date text in the locale's direction

#13151 at 829e8ad9256eb9dcf72fe962a95f70fd68b582bb (head) against its merge base, 938dbc46ecb71ace04efe4a9f7fc790288a8e0b4 (main). The Storybook locale is "en", and the page direction is set to LTR or RTL. All results are from test runs.

## Builds

- Main: the hosted production deploy of 938dbc46, checked by its version.json.
- Head: the hosted preview of 829e8ad9, checked by its version.json.
- Both builds are hosted, so no local build was made.

## Results

| Case | Direction | Main: the text on screen | Main: where it sits | Head: the text on screen | Head: where it sits | Head frame against main |
| --- | --- | --- | --- | --- | --- | --- |
| TimeInput, With Value, 12-hour, text input | LTR | "2:30 PM" (input text) | left edge | "2:30 PM" (input text) | left edge | identical |
| TimeInput, With Value, 12-hour, text input | RTL | "PM 2:30" (input text) | right edge | "2:30 PM" (input text) | right edge | differs |
| TimeInput, With Value, 12-hour, native | LTR | "2:30 PM" (overlay text) | left edge | "2:30 PM" (overlay text) | left edge | identical |
| TimeInput, With Value, 12-hour, native | RTL | "PM 2:30" (overlay text) | right edge | "2:30 PM" (overlay text) | right edge | differs |
| DateTimeInput, Default (empty) | LTR | "Select a time" (placeholder) | left edge | "Select a time" (placeholder) | left edge | identical |
| DateTimeInput, Default (empty) | RTL | "Select a time" (placeholder) | right edge | "Select a time" (placeholder) | right edge | identical |
| DateTimeInput, With Value (added to this check) | LTR | "2:30 PM" (input text) | left edge | "2:30 PM" (input text) | left edge | identical |
| DateTimeInput, With Value (added to this check) | RTL | "PM 2:30" (input text) | right edge | "2:30 PM" (input text) | right edge | differs |
| DateTimeInput, With Time Options, options open (added to this check) | LTR | "9:00 AM" (input text) | left edge | "9:00 AM" (input text) | left edge | identical |
| DateTimeInput, With Time Options, options open (added to this check) | RTL | "AM 9:00" (input text) | right edge | "9:00 AM" (input text) | right edge | differs |

- On an RTL page, main shows each time with the period first, such as "PM 2:30". The head shows "2:30 PM", at the right edge of the field, beside the clock icon.
- In LTR, 5 of 5 head frames are byte-identical to main.
- DateTimeInput's Default story is empty: it shows only its placeholders, which read the same on both builds. So this check also reads its With Value and With Time Options stories, which exist on both builds and show its time text.

### The open time options

| Direction | Main: options | Head: options |
| --- | --- | --- |
| LTR | 48 options, each with the period last. Shown in full: "5:00 AM" to "9:00 AM" | 48 options, each with the period last. Shown in full: "5:00 AM" to "9:00 AM" |
| RTL | 48 options, each with the period first. Shown in full: "AM 5:00" to "AM 9:00" | 48 options, each with the period last. Shown in full: "5:00 AM" to "9:00 AM" |

- The list opens scrolled to the selected 9:00 AM, so the options from 5:00 to 9:00 AM show in full.

### The time text's styles

| Case | Direction | Main: direction, `text-align` | Head: `dir`, direction, `text-align` |
| --- | --- | --- | --- |
| TimeInput, With Value, 12-hour, text input | LTR | ltr, start | ltr, ltr, left |
| TimeInput, With Value, 12-hour, text input | RTL | rtl, start | ltr, ltr, right |
| TimeInput, With Value, 12-hour, native | LTR | ltr, start | ltr, ltr, left |
| TimeInput, With Value, 12-hour, native | RTL | rtl, start | ltr, ltr, right |

On the head, the time text gets `dir="ltr"`, the direction of the "en" locale. Its alignment follows the field's own direction, so the text stays on the right in RTL.

## Not covered

- iPhone Safari: the native field there is not part of this run.

## Method

- Desktop Chromium 149.0.7827.55 through Playwright, 1280 × 900 px, at device pixel ratio 2.
- TimeInput uses the story arguments `hourFormat: 12h` with `presentation: text-input` or `presentation: native`. The page direction uses the Storybook `direction` global.
- The text on screen is read from each visible character's box, sorted from left to right. Light-DOM text is measured with a Range. An input's own value or placeholder is measured the same way, through its user-agent shadow text.
- Text that is transparent, hidden or fully faded is left out. In the native presentation, the time input's own text is transparent, and an overlay draws the time, so the overlay is what is read.
- "Where it sits" compares the text with the edges of its field's content box.
- For the open options, the time field is clicked. All 48 options are read the same way, including those the list scrolls out of view.
- Every frame was looked at.

## Frames

Contact sheets, each with main LTR, head LTR, main RTL and head RTL from top to bottom:
- [TimeInput, With Value, 12-hour, text input](sheets/timeinput-text-input.png)
- [TimeInput, With Value, 12-hour, native](sheets/timeinput-native.png)
- [DateTimeInput, Default (empty)](sheets/datetimeinput-default.png)
- [DateTimeInput, With Value (added to this check)](sheets/datetimeinput-with-value.png)
- [DateTimeInput, With Time Options, options open (added to this check)](sheets/datetimeinput-time-options.png)
- [RTL close-ups of the time text, main left, head right](sheets/rtl-zoom.png)

In [frames/](frames/), each name is `<build>-<case>-<direction>.png`, and [frames/zoom/](frames/zoom/) has the RTL close-ups. The raw readings are in [results.json](results.json).
