# Field text on right-to-left pages: before and after

Stills for the pull request at its head
d9958d0684e35abe42f48b4916366aca659710c3, which keeps label, description and
status text in their written order on right-to-left pages.

## The story

Core/Field "Mixed Direction" (`core-field--mixed-direction`). Each of the
first six fields uses one string as its label, its description and its
status message. The seventh has a long label only.

## Frames

Each image is a table of crops: before on the left, after on the right. A
crop holds the text line of one part, cut inside that part's box. The
frames show the fields written `+3` and `@alice`.

- `11220-rtl-light-390.png`, `11220-rtl-dark-390.png`,
  `11220-rtl-light-1280.png`, `11220-rtl-dark-1280.png`: a right-to-left
  page. Before, `+3` reads `3+` and `@alice` reads `alice@`, in the label,
  the description and the status message. After, both keep their written
  order.
- `11220-ltr-light-1280.png`: a left-to-right page. Before and after are the
  same.

There is no frame for `https://`, `example.com موقع` or the long label. For
those strings, and for every other string in the story, the table below gives
the measured order instead.

## Measured order on a right-to-left page

Each cell is the text a reader sees, left to right. `[Arabic word]` stands
for the Arabic word of that string, which reads as one unit. The label, the
description and the status message give the same order for each string. Each
order is the same in light and dark mode, at 390 and 1280 px.

| Written text | Before | After |
| --- | --- | --- |
| `https://` | `//:https` | `https://` |
| `.com` | `com.` | `.com` |
| `+3` | `3+` | `+3` |
| `@alice` | `alice@` | `@alice` |
| `iPhone جديد` | `[Arabic word] iPhone` | `[Arabic word] iPhone` |
| `example.com موقع` | `[Arabic word] example.com` | `[Arabic word] example.com` |

Before, these four strings are reordered: `https://` reads `//:https`,
`.com` reads `com.`, `+3` reads `3+` and `@alice` reads `alice@`. After, each
keeps its written order. The two strings with an Arabic word read the same
before and after.

The long label reads the same before and after:

- At 390 px it wraps into two lines:
  `Open https://example.com/reports/quarterly or +3` and
  `shared links to reach this report`.
- At 1280 px it is one line:
  `Open https://example.com/reports/quarterly or +3 shared links to reach this report`.

On a left-to-right page, every string reads in its written order, before
and after, in all four modes and widths.

How the order is measured: a DOM `Range` gives the box of each character.
The characters are grouped into lines by their vertical center. Each line
is sorted by horizontal center.

## Left-to-right is unchanged

All four left-to-right captures of the whole story (light and dark, 390 and
1280 px) are byte-identical between before and after. Each pair has the same
SHA-256. The left-to-right crops are byte-identical too. This also
shows that the two builds render the story the same way, apart from this
change.

## Sources

- Before: a production Storybook build of main
  f58e64459aa0aa534e8e5913eea8e9c277f3118b with one file added: this pull
  request's `apps/storybook/stories/Field.stories.tsx`, from d9958d06. The
  story is new in this pull request, so main's own deployment does not have
  it. Main's production deployment reports
  `{"commit":"f58e64459aa0aa534e8e5913eea8e9c277f3118b","environment":"production"}`
  in its `version.json`. In this build, main's Field, FieldLabel and
  FieldStatus code renders the story.
- After: this pull request's preview deployment. Its `version.json` reports
  `{"commit":"d9958d0684e35abe42f48b4916366aca659710c3","environment":"preview"}`.

## How the pictures were taken

- Chromium 149.0.7827.55 (Playwright 1.61.1), device scale factor 2.
- Viewports of 390 × 844 and 1280 × 800 CSS px.
- Right-to-left comes from Storybook's Direction setting
  (`globals=direction:rtl`). The story decorator puts `dir="rtl"` on the
  story's wrapper element and passes `dir="rtl"` to
  `InternationalizationProvider`. The `<html>` element has no `dir`.
- Light and dark come from Storybook's color mode setting
  (`globals=colorMode:light` or `colorMode:dark`).
