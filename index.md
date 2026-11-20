# Slider: a text value and the track's length, base and head

Base: 5e0d52c7c6a37df9948cd0476a8eea08897fdc34, the merge base of #12496 and main. Head: #12496 at 504c8da229b52c476c3e6b3e90caf5f2ae83b1ad, `pr` in file names.

## Answer

- Head: in all 96 slider-and-condition runs, the track keeps one width at every value. No run shows a second width.
- Base, Custom Step (0 to 100): the track gets shorter as the text grows from "0" to "100". It loses 15.56 px at 1280 and 17.79 px at 390, and twice that at 200% text.
- Base, With Format Value (60°F to 90°F): the track keeps one width there too, because every value has two digits.
- The head's track there is 14.83 px shorter than the base's at 1280 (16.83 px at 390). The head reserves 1em for each of "°" and "F".
- The value text is never clipped and never overlaps the track: 0 clipped states and 0 px of overlap, over 5232 states. That includes the widest end texts, 200% text and RTL.
- No text runs past its row or the viewport (0 px), and no page scrolls sideways (0 states).
- Non-numeric text (Rating, head only): the box reserves 106.79 px for "Not good", which is 56.83 px wide. At 390 and 200% the track is 99.2 px long.
- Both builds draw the value text in Liberation Sans: the stack's first family, Figtree, has no loaded face. In this face `tabular-nums` changes no digit width.
- RTL works the same: the text sits on the track's left, and every width equals the LTR width.

## Builds

- Base: the production deploy of 5e0d52c7c6, by its version.json (environment "production"). The merge base comes from `git merge-base` of the head and main.
- Head: the preview deploy of 504c8da229, by its version.json (environment "preview"). No local build was used.

## Method

- Stories on both builds: `core-slider--custom-step` (Quantity, 0 to 100 by 10) and `core-slider--with-format-value` (Temperature, 60°F to 90°F by 1).
- Head only: `core-slider--text-value-widths`. It has Price range (0 to 1000 by 10, two thumbs) and Blend (0 to 0.8 by 0.1). It also has Opacity (0 to 1 by 0.1) and Rating (1 to 5, words).
- The base has no story with a word value, so the non-numeric check is head only.
- Each slider, in each condition: focus a thumb, press Home, then press ArrowUp until the value stops at the maximum. The record is taken after each press, and after End.
- Two thumbs: first the high thumb goes from 0 up to 1000, with the low thumb at 0. Then the low thumb goes up to 1000, with the high thumb at 1000.
- "Min" is every thumb at the minimum, and "max" every thumb at the maximum. "Mid" is the step value nearest the middle, reached by ArrowUp from Home.
- For two thumbs, "mid" is the low thumb at 500 and the high thumb at 1000.
- Track width: the bounding width of `.astryx-slider-control`, the box the head's own browser test reads.
- Value text: its box, the box of its glyphs, `scrollWidth` against `clientWidth`, and its overlap with the track's box.
- Root text 200%: `document.documentElement.style.fontSize = '200%'` after load.
- RTL: the Storybook global `direction:rtl` in the story URL. It sets `dir="rtl"` on the story's wrapper element; the `html` element has no `dir`.
- Conditions: 1280 and 390, light and dark, 100% and 200% text, LTR and RTL: 16 per story and build.
- Chromium (Playwright 1.61.1, Chrome for Testing 149.0.7827.55). Desktop: 1280×800, scale 1. Phone: 390×844, touch, scale 2.
- Drawn face: Chromium's platform fonts for the value text's node, through the DevTools protocol.
- Digit widths: each digit ten times in the value text's face and size, with kerning off, with and without `tabular-nums`.
- All numbers are test measurements: hosted builds over this machine's network, one machine. Box load average (1 min): about 18 to 25 during the sweep, on 166 cores.

## Track width in px, base 5e0d52c7

Light and dark give the same widths, and so do LTR and RTL; the generator checks this for every run. Each cell is min / mid / max.

| Story | Slider | Text at min / mid / max | 1280, 100% | 1280, 200% | 390, 100% | 390, 200% | Widths seen |
| --- | --- | --- | --- | --- | --- | --- | --- |
| custom-step | Quantity | "0" / "50" / "100" | 1232.2 / 1224.42 / 1216.64 | 1216.42 / 1200.84 / 1185.28 | 341.09 / 332.2 / 323.3 | 324.2 / 306.41 / 288.61 | 3 per run (13 readings) |
| with-format-value | Temperature | "60°F" / "75°F" / "90°F" | 1210.27 / 1210.27 / 1210.27 | 1172.55 / 1172.55 / 1172.55 | 316.03 / 316.03 / 316.03 | 274.06 / 274.06 / 274.06 | 1 per run (33 readings) |

- Custom Step: each extra digit costs the track one digit's width, 7.78 px at 1280 and 100%.

## Track width in px, head 504c8da2

Light and dark give the same widths, and so do LTR and RTL; the generator checks this for every run. Each cell is min / mid / max.

| Story | Slider | Text at min / mid / max | 1280, 100% | 1280, 200% | 390, 100% | 390, 200% | Widths seen |
| --- | --- | --- | --- | --- | --- | --- | --- |
| custom-step | Quantity | "0" / "50" / "100" | 1215.66 / 1215.66 / 1215.66 | 1184.3 / 1184.3 / 1184.3 | 322.31 / 322.31 / 322.31 | 287.61 / 287.61 / 287.61 | 1 per run (13 readings) |
| with-format-value | Temperature | "60°F" / "75°F" / "90°F" | 1195.44 / 1195.44 / 1195.44 | 1143.86 / 1143.86 / 1143.86 | 299.2 / 299.2 / 299.2 | 241.41 / 241.41 / 241.41 | 1 per run (33 readings) |
| text-value-widths | Price range | "0 – 0" / "500 – 1000" / "1000 – 1000" | 1147.14 / 1147.14 / 1147.14 | 1047.28 / 1047.28 / 1047.28 | 244.02 / 244.02 / 244.02 | 131.03 / 131.03 / 131.03 | 1 per run (204 readings) |
| text-value-widths | Blend | "0" / "0.4" / "0.8" | 1209.44 / 1209.44 / 1209.44 | 1171.86 / 1171.86 / 1171.86 | 315.2 / 315.2 / 315.2 | 273.41 / 273.41 / 273.41 | 1 per run (11 readings) |
| text-value-widths | Opacity | "0" / "0.5" / "1" | 1209.44 / 1209.44 / 1209.44 | 1171.86 / 1171.86 / 1171.86 | 315.2 / 315.2 / 315.2 | 273.41 / 273.41 / 273.41 | 1 per run (13 readings) |
| text-value-widths | Rating | "Bad" / "Okay" / "Great" | 1133.22 / 1133.22 / 1133.22 | 1019.44 / 1019.44 / 1019.44 | 228.11 / 228.11 / 228.11 | 99.2 / 99.2 / 99.2 | 1 per run (7 readings) |

- Custom Step: the head's one width is the base's width at "100" less 0.98 px at 1280 (0.99 px at 390). That is about the reserve's extra 1 px.
- With Format Value: the head's track is shorter than the base's. It is 14.83 and 28.69 px shorter at 1280 (100% and 200%), and 16.83 and 32.65 px at 390.

## The reserved width, head (1280, 100%)

The head sets `min-inline-size` to `calc(<n>ch + <m>em + 1px)`. Here n is the most digits and spaces, and m the most other characters. Both are counted over the texts at, and one step in from, each end of the range.

| Story | Slider | Reserved width | Widest text seen | Text box |
| --- | --- | --- | --- | --- |
| custom-step | Quantity | 24.36 px | "100", 23.36 px | 24.34 px |
| with-format-value | Temperature | 44.57 px | "60°F", 29.73 px (31 texts are this wide) | 44.56 px |
| text-value-widths | Price range | 92.86 px | "1000 – 1000", 77.86 px | 92.86 px |
| text-value-widths | Blend | 30.57 px | "0.1", 19.47 px (8 texts are this wide) | 30.56 px |
| text-value-widths | Opacity | 30.57 px | "0.1", 19.47 px (9 texts are this wide) | 30.56 px |
| text-value-widths | Rating | 106.79 px | "Not good", 56.83 px | 106.78 px |

- In all 4496 head states, the text box keeps the reserved width, so the track keeps its length. A digit or a space fits in 1ch in this face.
- Each other character takes 1em, which is wider than most letters. So a word value's box is about twice the word: Rating 106.79 px for 56.83 px.

## Value text: clipping, overlap and overflow

| Build | Story | States | Clipped | Overlap with the track | Past the row or viewport | Sideways page scroll | Gap to the track |
| --- | --- | --- | --- | --- | --- | --- | --- |
| base | custom-step | 208 | 0 | 0 px | 0 px | 0 | 8 px at 100%, 16 px at 200% |
| base | with-format-value | 528 | 0 | 0 px | 0 px | 0 | 8 px at 100%, 16 px at 200% |
| head | custom-step | 208 | 0 | 0 px | 0 px | 0 | 8 px at 100%, 16 px at 200% |
| head | with-format-value | 528 | 0 | 0 px | 0 px | 0 | 8 px at 100%, 16 px at 200% |
| head | text-value-widths | 3760 | 0 | 0 px | 0 px | 0 | 8 px at 100%, 16 px at 200% |

- In LTR the text is right of the track, and in RTL left of it, on both builds.

## Numeric and non-numeric text

- `font-variant-numeric`: `normal` on the base, `tabular-nums` on the head.
- Drawn face, both builds and every story: Liberation Sans. The computed stack starts with Figtree, and the page has 0 Figtree faces.
- Digit widths at 14px, kerning off: every digit is 7.787 px with and without `tabular-nums`, on both builds. A space is 3.891 px.
- So in this face, the base's track moves only when the number of characters changes. A face with proportional digits was not tested here.
- Word values (Rating, head only): no state clips, and the track keeps one width.

## Files

- `<story>--s<n>--<viewport>--<mode>--text-<size>--<dir>--<min|max>--<main|pr>.png`: one slider with its label, at the minimum and the maximum.
- `s<n>` is the slider's place in the story: in text-value-widths, s0 Price range, s1 Blend, s2 Opacity and s3 Rating.
- Stills cover four conditions: desktop light 100% LTR, desktop dark 200% RTL, phone light 200% LTR, and phone dark 100% RTL.
- `measurements.json`: every recorded state, with the track width, the values and the text measures. It also has the font probe.
