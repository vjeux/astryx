# Slider at 851a97e1: one track length across values and drags, in seven fonts

Main: 8a5008a7ececb7e6296a3148597117026e5ade3e, the head's merge base, `main` in file names. Head: #12496 at 851a97e19f7ba7982b6328a3a1ab070e85ae6a33, `pr` in file names.

## Answer

- Quantity, Temperature, Price range and Blend meet the bar. Each keeps one track length at every value and on every frame of a mouse drag.
- That holds in all seven fonts, in light and dark, and left to right and right to left: 28 of 28 conditions for each slider.
- Each of those lengths is shorter than main's shortest track for that slider and font, by 7.78 to 37 px.
- Opacity does not meet the bar. In every font, its track changes by 1 to 4 px between its ends and its middle values.
- Its end texts, "0" and "1", have one character each, so its floor is 2ch. Most of "0.1" to "0.9" are wider than that: 212 of 252.
- Rating changes only at "Not good", as expected. That word is longer than both ends, "Bad" and "Great".
- No value text clips or overflows on either build: at 7,678 values and about 24,140 drag frames each, and no page scrolls sideways.
- In Fustat, "0.8", "75°F" and "1000 – 1000" read normally. The head draws the value text with `font-variant-numeric: normal`, and with no added letter or word spacing.

## Track length on the head (px)

| Slider | Default (as served) | Outfit | Albert Sans | Fustat | DM Sans | Figtree | Poppins |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Quantity | 1208.86 | 1204 | 1204 | 1200 | 1192 | 1204 | 1196 |
| Temperature | 1201.08 | 1195 | 1195 | 1190 | 1181 | 1195 | 1186 |
| Price range | 1146.58 | 1132 | 1132 | 1120 | 1104 | 1132 | 1116 |
| Blend | 1208.86 | 1204 | 1204 | 1200 | 1192 | 1204 | 1196 |
| Opacity | 1220.53–1224.44 | 1219–1222 | 1219–1222 | 1217–1220 | 1213–1214 | 1219–1222 | 1212–1216 |
| Rating | 1183.17–1193.3 | 1182–1186 | 1181–1186 | 1174–1180 | 1169–1170 | 1181–1186 | 1164–1176 |

- A single value is one length at every value, on every drag frame, and in all four conditions.
- Light and dark give the same lengths, and so do left to right and right to left, for every slider and font.

## Main's track, for comparison (px)

| Slider | Default (as served) | Outfit | Albert Sans | Fustat | DM Sans | Figtree | Poppins |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Quantity | 1216.64–1232.2 | 1217–1231 | 1218–1231 | 1215–1230 | 1209–1225 | 1216–1231 | 1211–1226 |
| Temperature | 1210.27 | 1209–1214 | 1208–1214 | 1205–1212 | 1201–1208 | 1209–1213 | 1199–1205 |
| Price range | 1162.11–1208.86 | 1162–1208 | 1161–1205 | 1152–1202 | 1141–1195 | 1160–1208 | 1148–1198 |
| Blend | 1220.53–1232.2 | 1219–1231 | 1219–1231 | 1217–1230 | 1213–1225 | 1219–1231 | 1212–1226 |
| Opacity | 1220.53–1232.2 | 1219–1235 | 1219–1236 | 1217–1235 | 1213–1231 | 1219–1234 | 1212–1231 |
| Rating | 1183.17–1215.08 | 1182–1215 | 1181–1216 | 1174–1211 | 1169–1207 | 1181–1216 | 1164–1206 |

## Opacity

- Its floor comes from its longer end text. "0" and "1" have one character each, so the floor is 2ch.
- That is 15.57 px in the default font, and 18 to 22 px in the theme fonts.
- At "0" and "1" the text fits the floor, and the head's track is at its longest.
- Where a middle value's text is wider than the floor, its box widens. There the head's track equals main's at the same value, at all 212 such values.
- In the default font, every middle value is wider. The head's track is 1224.44 px at "0" and "1", and 1220.53 px at "0.1" to "0.9".
- In the theme fonts, some middle values fit, such as "0.1" and "0.7" in Fustat. So the track takes two to four lengths.
- The largest change is 4 px, in Poppins.

## Rating, on the head (light, left to right; px)

| Font | Bad, Okay, Good, Great | Not good | Main: Bad, Okay, Good, Great | Main: Not good |
| --- | --- | --- | --- | --- |
| Default (as served) | 1193.3 | 1183.17 | 1215.08, 1207.31, 1205.75, 1204.98 | 1183.17 |
| Outfit | 1186 | 1182 | 1215, 1207, 1205, 1202 | 1182 |
| Albert Sans | 1186 | 1181 | 1216, 1208, 1205, 1204 | 1181 |
| Fustat | 1180 | 1174 | 1211, 1203, 1200, 1199 | 1174 |
| DM Sans | 1170 | 1169 | 1207, 1198, 1196, 1194 | 1169 |
| Figtree | 1186 | 1181 | 1216, 1208, 1205, 1204 | 1181 |
| Poppins | 1176 | 1164 | 1206, 1195, 1193, 1189 | 1164 |

- "Not good" is wider than the floor, so its box takes its own width, as on main.

## During a drag

- Each drag is a real mouse drag of one thumb. The pointer presses on the thumb, moves past one end of the track, then past the other, and releases.
- Each drag gives 123 to 130 animation frames, and the track is read on every one.
- On the head, the drags cover each slider's full range. Quantity runs 0 to 100, Temperature 60°F to 90°F, and Price range 0 to 1000 for each thumb.
- Blend runs 0 to 0.8, and Opacity 0 to 1.
- On main, in Fustat, DM Sans and Figtree, Price range's upper thumb stopped at 10.
- For Quantity, Temperature, Price range and Blend, every drag frame's track equals the length in the head's table.
- For Opacity and Rating, the drags show the same lengths as the stepped values.

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

- Main: the production deploy of 8a5008a7ec, by its version.json (environment "production").
- Head: the preview deploy of 851a97e19f, by its version.json (environment "preview").
- Both version.json files, and the pull request's head, were the same at the start and the end of each run.

## Method

- Quantity is the `core-slider--custom-step` story, and Temperature is `core-slider--with-format-value`.
- Price range, Blend, Opacity and Rating get their props through Storybook's preview, the same way on both builds.
- Price range is `core-slider--range` from 0 to 1000, step 10, with a text value. Blend is 0 to 0.8, step 0.1. Opacity is 0 to 1, step 0.1. Rating is 1 to 5, step 1, with the five words.
- Theme: the Storybook global `astryxTheme`. Mode: the global `colorMode` and the page's color scheme. Direction: the global `direction`.
- Values: Home, then ArrowUp to the end, reading the track after each step. A range steps its upper thumb up, then its lower one.
- Track: the width of the slider's control element. Clipped: the value text's box scrolls, or its glyphs pass the box by more than 0.5 px.
- Chromium (Playwright 1.61.1, Chrome for Testing 149.0.7827.55), 1280 × 800, scale 1, mouse.
- All numbers are test measurements: hosted builds over this machine's network, one machine.
- Box load average (1 min), on 166 cores: about 30 to 59 during the main run, and about 14 to 47 during the head's.
- A test suite ran on the same machine during both runs.
- Times on 2026-11-20: main from 19:06:03Z to 19:22:32Z, and the head from 19:13:33Z to 19:30:05Z.

## Files

- `gothic-fustat--<slider>--<min|mid|max>--light--ltr--<build>.png`: Fustat at the lowest, a middle and the highest value. `custom-step` is Quantity, and `with-format-value` is Temperature.
- Gothic is a dark-only theme, so its light frames are dark too.
- `gothic-fustat--<slider>--max--dark--rtl--pr.png`: Fustat on the head, right to left, at the highest value.
- `<setup>--rating--word-Not-good--light--ltr--pr.png`: Rating at "Not good" on the head, in each font.
- `measurements.json`: every value's track and text, every drag's frames, the summaries, and the drawn faces.
