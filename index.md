# Slider option A (digit padding): a text value and the track's length, main and head

Main: 9e40cf11fc33fac5da12ccc3df3b9060965dc2d1, also the head's merge base with main. Head: #12496 at b6515e257acafbcd56531c4c364c1ed50818d2a6, `pr` in file names.

## Answer

- Temperature (60°F to 90°F): the head's track keeps one width, equal to main's at its widest text. The difference is 0 px in all 16 conditions.
- Main's Temperature track is constant too here: every value has two digits, and this face's digits are equal in width.
- Quantity (0 to 100): the head's track keeps one width in all 16 conditions, within 0.01 px. Main's takes 3 widths, 1232.2 px at "0" to 1216.64 px at "100" (1280, 100%).
- The head's Quantity track equals main's at "100": 0 px apart in all 16 conditions.
- Rating (words): at each of the five words, the head's track is exactly as long as main's, in all 16 conditions.
- The head pads nothing for words, so its Rating track follows the word, as on main.
- Blend and Opacity: one width each in all 16 conditions.
- Price range is NOT constant on the head: at "0 – 110" and "110 – 1000" its track is longer. It is longer by up to 1.05 and 2.08 px at 1280 (100% and 200%), and 1.2 and 2.37 px at 390.
- Those are the only texts with the digit pair "11", which this face kerns. The digit padding counts each digit as 1ch, so a kerned text leaves its box narrower.
- With `font-kerning: none` on the value text (harness only), the track at "0 – 110" equals the track at "0 – 100" at all four sizes.
- The value text is never clipped and never overlaps the track: 0 clipped states and 0 px of overlap, over 5456 states on both builds.
- No text runs past its row or the viewport (0 px), and no page scrolls sideways (0 states). That holds at 200% text and in RTL.

## Builds

- Main: the production deploy of 9e40cf11fc, by its version.json (environment "production"). `git merge-base` of the head and main gives this commit.
- Head: the preview deploy of b6515e257a, by its version.json (environment "preview"). No local build was used.

## What "main's" Rating is

- Main has no `core-slider--text-value-widths` story, so it has no Rating slider. Main's Rating is main's own Slider given the same props, in main's own build.
- The harness loads `core-slider--with-format-value` and gives it new args through Storybook's preview in the page: label "Rating", min 1, max 5, step 1.
- The args also set `formatValue` to the five words ("Bad", "Not good", "Okay", "Good", "Great"), as the head's story does. The call is `__STORYBOOK_PREVIEW__.onUpdateArgs`; the change is harness only.
- The head gets the same treatment, so the comparison uses one story layout on both builds. The head's own Text Value Widths Rating is listed beside it.

## Method

- Stories on both builds: `core-slider--custom-step` (Quantity, 0 to 100 by 10), `core-slider--with-format-value` (Temperature, 60°F to 90°F by 1), and that story with Rating's props.
- Head only: `core-slider--text-value-widths`. It has Price range (0 to 1000 by 10, two thumbs) and Blend (0 to 0.8 by 0.1). It also has Opacity (0 to 1 by 0.1) and Rating (1 to 5, words).
- Each slider, in each condition: focus a thumb, press Home, then press ArrowUp until the value stops at the maximum. The record is taken after each press, and after End.
- Two thumbs: first the high thumb goes from 0 up to 1000, with the low thumb at 0. Then the low thumb goes up to 1000, with the high thumb at 1000.
- Track width: the bounding width of `.astryx-slider-control`, the box the head's own browser test reads.
- Value text: its box, the box of its glyphs, `scrollWidth` against `clientWidth`, and its overlap with the track's box.
- Root text 200%: `document.documentElement.style.fontSize = '200%'` after load. RTL: the Storybook global `direction:rtl` in the story URL, which sets `dir="rtl"` on the story's wrapper element.
- Conditions: 1280 and 390, light and dark, 100% and 200% text, LTR and RTL: 16 per story and build.
- Chromium (Playwright 1.61.1, Chrome for Testing 149.0.7827.55). Desktop: 1280×800, scale 1. Phone: 390×844, touch, scale 2.
- Drawn face, both builds: Liberation Sans (Chromium's platform fonts for the value text). Every digit is 7.787 px at 14px, on both builds, with and without `tabular-nums`.
- All numbers are test measurements: hosted builds over this machine's network, one machine. Box load average (1 min): about 8 to 15 during the sweep, on 166 cores.

## (1) Temperature: the head against main's widest text

| Viewport | Text | Main: largest minus smallest | Main at its widest text | Head: usual width, largest minus smallest | Head minus main |
| --- | --- | --- | --- | --- | --- |
| 1280 | 100% | 0 px | 1210.27 px ("60°F"; 31 texts are this wide) | 1210.27 px, 0 px | 0 px |
| 1280 | 200% | 0 px | 1172.55 px ("60°F"; 31 texts are this wide) | 1172.55 px, 0 px | 0 px |
| 390 | 100% | 0 px | 316.03 px ("60°F"; 31 texts are this wide) | 316.03 px, 0 px | 0 px |
| 390 | 200% | 0 px | 274.06 px ("60°F"; 31 texts are this wide) | 274.06 px, 0 px | 0 px |

- Light and dark, LTR and RTL give the same values within 0.03 px; the generator checks every condition.

## (2) Quantity: the track at min, mid and max

| Viewport | Text | Main: "0" / "50" / "100" | Head: "0" / "50" / "100" | Head: largest minus smallest |
| --- | --- | --- | --- | --- |
| 1280 | 100% | 1232.2 / 1224.42 / 1216.64 | 1216.64 / 1216.64 / 1216.64 | 0 px |
| 1280 | 200% | 1216.42 / 1200.84 / 1185.28 | 1185.28 / 1185.28 / 1185.28 | 0 px |
| 390 | 100% | 341.09 / 332.2 / 323.3 | 323.3 / 323.31 / 323.3 | 0.01 px |
| 390 | 200% | 324.2 / 306.41 / 288.61 | 288.61 / 288.61 / 288.61 | 0 px |

## (3) Rating: the track at each word

Main and head: the With Format Value story with Rating's props. "Head story": the head's own Text Value Widths Rating. Light, LTR; dark and RTL give the same values.

| Viewport | Text | Word | Main | Head | Head story | Head minus main |
| --- | --- | --- | --- | --- | --- | --- |
| 1280 | 100% | Bad | 1215.08 | 1215.08 | 1215.08 | 0 px |
| 1280 | 100% | Not good | 1183.17 | 1183.17 | 1183.17 | 0 px |
| 1280 | 100% | Okay | 1207.31 | 1207.31 | 1207.31 | 0 px |
| 1280 | 100% | Good | 1205.75 | 1205.75 | 1205.75 | 0 px |
| 1280 | 100% | Great | 1204.98 | 1204.98 | 1204.98 | 0 px |
| 1280 | 200% | Bad | 1182.17 | 1182.17 | 1182.17 | 0 px |
| 1280 | 200% | Not good | 1118.36 | 1118.36 | 1118.36 | 0 px |
| 1280 | 200% | Okay | 1166.64 | 1166.64 | 1166.64 | 0 px |
| 1280 | 200% | Good | 1163.5 | 1163.5 | 1163.5 | 0 px |
| 1280 | 200% | Great | 1161.97 | 1161.97 | 1161.97 | 0 px |
| 390 | 100% | Bad | 321.53 | 321.53 | 321.53 | 0 px |
| 390 | 100% | Not good | 285.06 | 285.06 | 285.06 | 0 px |
| 390 | 100% | Okay | 312.66 | 312.66 | 312.66 | 0 px |
| 390 | 100% | Good | 310.86 | 310.86 | 310.86 | 0 px |
| 390 | 100% | Great | 309.98 | 309.98 | 309.98 | 0 px |
| 390 | 200% | Bad | 285.06 | 285.06 | 285.06 | 0 px |
| 390 | 200% | Not good | 212.13 | 212.13 | 212.13 | 0 px |
| 390 | 200% | Okay | 267.31 | 267.31 | 267.31 | 0 px |
| 390 | 200% | Good | 263.72 | 263.72 | 263.72 | 0 px |
| 390 | 200% | Great | 261.97 | 261.97 | 261.97 | 0 px |

## (4) Price range, Blend and Opacity, head

Each cell: the usual width, then the largest minus the smallest over the run. Light, LTR; dark and RTL agree within the tolerance.

| Slider | Readings | 1280, 100% | 1280, 200% | 390, 100% | 390, 200% | Texts more than 0.05 px off |
| --- | --- | --- | --- | --- | --- | --- |
| Price range | 204 | 1162.14, 1.05 | 1076.3, 2.1 | 261.02, 1.2 | 164.05, 2.37 | "0 – 110", "110 – 1000" |
| Blend | 11 | 1209.44, 0 | 1171.86, 0 | 315.2, 0 | 273.41, 0 | none |
| Opacity | 13 | 1209.44, 0 | 1171.86, 0 | 315.2, 0 | 273.41, 0 | none |

- At 1280 and 200%, every text with a two-digit number, and "1000 – 1000", sits 0.02 px below the usual width. So the spread there is 2.1 px.

## Price range and the "11" kerning pair, head

The track at "0 – 100" and "0 – 110", with the value text as built, then with `font-kerning: none` set on it in the page (harness only). Light, LTR.

| Viewport | Text | Font size | As built: "0 – 100" / "0 – 110" | As built: difference | Kerning off: difference | "11" / "10", kerning on |
| --- | --- | --- | --- | --- | --- | --- |
| 1280 | 100% | 14px | 1162.14 / 1163.19 | 1.05 px | 0 px | 14.547 / 15.578 px |
| 1280 | 200% | 28px | 1076.3 / 1078.38 | 2.08 px | 0 px | 29.078 / 31.156 px |
| 390 | 100% | 16px | 261.02 / 262.2 | 1.18 px | 0 px | 16.609 / 17.797 px |
| 390 | 200% | 32px | 164.05 / 166.42 | 2.37 px | 0 px | 33.219 / 35.594 px |

- With kerning off, "11" and "10" are the same width at every size. The track then keeps one length at these two values.
- Stills at 390 and 200%, one clip for all three: `price-range--kerning--phone--light--text-200--ltr--0-100--pr.png`, `…--0-110--pr.png` and `…--0-110-kerning-off--pr.png`.
- At "0 – 110" as built, the track ends 2.37 px further right than at "0 – 100". With kerning off, it ends where it does at "0 – 100".

## Value text: clipping, overlap and overflow

| Build | Story | States | Clipped | Overlap with the track | Past the row or viewport | Sideways page scroll |
| --- | --- | --- | --- | --- | --- | --- |
| main | custom-step | 208 | 0 | 0 px | 0 px | 0 |
| main | with-format-value | 528 | 0 | 0 px | 0 px | 0 |
| main | with-format-value--rating | 112 | 0 | 0 px | 0 px | 0 |
| head | custom-step | 208 | 0 | 0 px | 0 px | 0 |
| head | with-format-value | 528 | 0 | 0 px | 0 px | 0 |
| head | with-format-value--rating | 112 | 0 | 0 px | 0 px | 0 |
| head | text-value-widths | 3760 | 0 | 0 px | 0 px | 0 |

- In LTR the text is right of the track, and in RTL left of it, on both builds.

## Files

- `<story>--s<n>--<viewport>--<mode>--text-<size>--<dir>--<min|max>--<main|pr>.png`: one slider with its label, at the minimum and the maximum.
- `with-format-value--rating` is the With Format Value story with Rating's props. In text-value-widths, s0 is Price range, s1 Blend, s2 Opacity and s3 Rating.
- Stills cover four conditions: desktop light 100% LTR, desktop dark 200% RTL, phone light 200% LTR, and phone dark 100% RTL.
- `price-range--kerning--…`: the Price range track's end and its text, from the kerning test above.
- `measurements.json`: every recorded state, with the track width, the values and the text measures. It also has the font probe and the kerning test.
