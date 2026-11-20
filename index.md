# Slider at 76db5b31: Opacity and Rating keep one track length, in seven fonts

Earlier head: #12496 at 851a97e19f7ba7982b6328a3a1ab070e85ae6a33, `main` in file names. Head: #12496 at 76db5b311e241f2a66c096ccc42dd8f592110204, `pr` in file names.

## Answer

- Opacity and Rating now meet the bar. Each keeps one track length at every value and on every frame of a mouse drag.
- That holds in all seven fonts, in light and dark, and left to right and right to left: 28 of 28 conditions for each slider.
- Each of those lengths is shorter than 851a97e1's shortest track for that slider and font. Opacity is shorter by 11.67 to 21 px, and Rating by 13.23 to 32 px.
- Temperature, Price range and Blend are unchanged from 851a97e1. They give the same lengths in 28 of 28 conditions each.
- No value text clips or overflows on either build: at 7,341 values and about 20,700 drag frames each, and no page scrolls sideways.
- In Fustat, "0.5", "0.8", "75°F" and "0 – 500" read normally. The head draws the value text with `font-variant-numeric: normal`, and with no added letter or word spacing.

## Track length on the head (px)

| Slider | Default (as served) | Outfit | Albert Sans | Fustat | DM Sans | Figtree | Poppins |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Opacity | 1208.86 | 1204 | 1204 | 1200 | 1192 | 1204 | 1196 |
| Rating | 1169.94 | 1159 | 1159 | 1150 | 1137 | 1159 | 1146 |
| Temperature | 1201.08 | 1195 | 1195 | 1190 | 1181 | 1195 | 1186 |
| Price range | 1146.58 | 1132 | 1132 | 1120 | 1104 | 1132 | 1116 |
| Blend | 1208.86 | 1204 | 1204 | 1200 | 1192 | 1204 | 1196 |

- A single value is one length at every value, on every drag frame, and in all four conditions.
- Light and dark give the same lengths, and so do left to right and right to left, for every slider and font.

## 851a97e1's track, for comparison (px)

| Slider | Default (as served) | Outfit | Albert Sans | Fustat | DM Sans | Figtree | Poppins |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Opacity | 1220.53–1224.44 | 1219–1222 | 1219–1222 | 1217–1220 | 1213–1214 | 1219–1222 | 1212–1216 |
| Rating | 1183.17–1193.3 | 1182–1186 | 1181–1186 | 1174–1180 | 1169–1170 | 1181–1186 | 1164–1176 |
| Temperature | 1201.08 | 1195 | 1195 | 1190 | 1181 | 1195 | 1186 |
| Price range | 1146.58 | 1132 | 1132 | 1120 | 1104 | 1132 | 1116 |
| Blend | 1208.86 | 1204 | 1204 | 1200 | 1192 | 1204 | 1196 |

- Temperature, Price range and Blend are the same on both builds.

## The floor

- For up to 200 steps, the head's floor counts the longest text that any step shows, plus one ch. On 851a97e1 it counted only the two end texts.
- Opacity's longest step text has three characters, such as "0.5". So its floor grows from 2ch to 4ch.
- That is 31.14 px in the default font, and 36 to 44 px in the theme fonts. On 851a97e1 it was 15.57 px, and 18 to 22 px.
- Rating's longest word is "Not good", with eight characters. So its floor grows from 6ch to 9ch: 70.08 px in the default font, and 81 to 99 px in the theme fonts.
- Temperature, Price range and Blend keep their floors, because their end texts are already their longest.

## Rating (light, left to right; px)

| Font | 76db5b31: all five words | 851a97e1: Bad, Okay, Good, Great | 851a97e1: Not good |
| --- | --- | --- | --- |
| Default (as served) | 1169.94 | 1193.3 | 1183.17 |
| Outfit | 1159 | 1186 | 1182 |
| Albert Sans | 1159 | 1186 | 1181 |
| Fustat | 1150 | 1180 | 1174 |
| DM Sans | 1137 | 1170 | 1169 |
| Figtree | 1159 | 1186 | 1181 |
| Poppins | 1146 | 1176 | 1164 |

- On the head, every word gives the same length, "Not good" included.

## During a drag

- Each drag is a real mouse drag of one thumb. The pointer presses on the thumb, moves past one end of the track, then past the other, and releases.
- Each drag gives 123 to 181 animation frames, and the track is read on every one.
- On both builds the drags cover each slider's full range. Opacity runs 0 to 1, Rating Bad to Great, and Temperature 60°F to 90°F.
- Price range runs 0 to 1000 for each thumb, and Blend 0 to 0.8.
- For every slider, every drag frame's track on the head equals the length in the head's table.

## Fonts

| Setup | Theme | Face drawn |
| --- | --- | --- |
| Default (as served) | Neutral, no font loaded | Liberation Sans |
| Outfit | Butter | Outfit Thin |
| Albert Sans | Chocolate | Albert Sans |
| Fustat | Gothic | Fustat |
| DM Sans | Matcha | DM Sans 9pt |
| Figtree | Neutral | Figtree Light |
| Poppins | Y2K | Poppins |

- Storybook loads no theme font. So the harness loads each theme's body face from the theme's own `fonts.css`.
- On every page, the browser's platform-font check names the face that draws the value text. Each name above is the one inside the face's file.
- The default injects nothing, so its stack falls back to Liberation Sans.

## Builds

- Earlier head: the preview deploy of 851a97e19f, by its version.json (environment "preview").
- Head: the preview deploy of 76db5b311e, by its version.json (environment "preview").
- Both version.json files, and the pull request's head, were the same at the start and the end of each run.

## Method

- Every slider is the story's own, on both builds. The story file is the same at both commits.
- `core-slider--text-value-widths` holds Price range, Blend, Opacity and Rating. Temperature is `core-slider--with-format-value`.
- In that story, Price range is 0 to 1000, step 10, with two thumbs. Blend is 0 to 0.8, and Opacity 0 to 1, both in steps of 0.1. Rating is 1 to 5, with the five words.
- Theme: the Storybook global `astryxTheme`. Mode: the global `colorMode` and the page's color scheme. Direction: the global `direction`.
- Values: Home, then ArrowUp to the end, reading the track after each step. A range steps its upper thumb up, then its lower one.
- Track: the width of the slider's control element. Clipped: the value text's box scrolls, or its glyphs pass the box by more than 0.5 px.
- Chromium (Playwright 1.61.1, Chrome for Testing 149.0.7827.55), 1280 × 800, scale 1, mouse.
- All numbers are test measurements: hosted builds over this machine's network, one machine.
- Box load average (1 min), on 166 cores: 29.5 at the start of 851a97e1's run and 15.7 at its end.
- For the head's run: 12.2 at the start and 23.4 at the end.
- Another browser measurement ran on the same machine during the first part of 851a97e1's run.
- Times on 2026-11-20: 851a97e1 from 20:06:44Z to 20:18:20Z, and the head from 20:13:56Z to 20:25:31Z.

## Files

- `gothic-fustat--<slider>--<min|mid|max>--light--ltr--<build>.png`: Fustat at the lowest, a middle and the highest value.
- Gothic is a dark-only theme, so its light frames are dark too.
- `gothic-fustat--<slider>--max--dark--rtl--pr.png`: Fustat on the head, right to left, at the highest value.
- `<setup>--rating--word-Not-good--light--ltr--pr.png`: Rating at "Not good" on the head, in each font.
- `measurements.json`: every value's track and text, every drag's frames, the summaries, and the drawn faces.
