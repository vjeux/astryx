# Slider text value at 19138d49: one track length in every theme font, and in French

Head: #12496 at 19138d49c24c4257f3f7e8273f1d6b99c388be52, `pr` in file names. Main: 35bda7f8f11c2c0b076ba07f24bb171207ce85e3, the head's merge base, `main` in file names. All numbers are test measurements.

## Answer (test)

- On the head, the approved text-value stories keep one track length: Price range, Blend, Opacity, Rating and Temperature.
- That holds at every value and on every drag frame, in all 7 font setups, light and dark, LTR and RTL: 140 of 140 sliders.
- No text is clipped, and no text runs over the track.
- In English, the head's track is shorter than main's at every value, by at least 9.19 px. It is never longer.
- The approved stories measure the same as the 76db5b31 take: 140 of 140 sliders and 27 of 27 stills are identical.
- French: fr-FR ships no `@astryx.slider.rangeValue`, so a scratch story sets the message with a provider override.
- The French range text keeps one track length in 28 of 28 conditions, and it is never clipped.
- In French, the head's track is shorter than main's at every value, by at least 19.45 px.

## Builds

- Head: the preview deploy of 19138d49, by its version.json (environment "preview").
- Main: the Production deploy of 35bda7f8, the head's merge base, by its version.json (environment "production").
- French: local Storybook builds of 19138d49 and 35bda7f8. Each adds the same scratch story, `scratch-story.tsx`, which is in neither pull request.
- The version.json files and the pull request's head were the same at the start and the end of the hosted runs.

## (1) English: the approved stories on the head (test)

| Slider | Font | Track length on the head, px (all 4 conditions) | Values per condition | Drag frames per condition | Text clipped or over the track |
| --- | --- | --- | --- | --- | --- |
| Price range | Default (as served) | 1146.58 (one length) | 202 | 246 | none |
| Price range | Butter, Outfit | 1132 (one length) | 202 | 246 | none |
| Price range | Chocolate, Albert Sans | 1132 (one length) | 202 | 246 | none |
| Price range | Gothic, Fustat | 1120 (one length) | 202–203 | 246 | none |
| Price range | Matcha, DM Sans | 1104 (one length) | 202 | 246 | none |
| Price range | Neutral, Figtree | 1132 (one length) | 202 | 246 | none |
| Price range | Y2K, Poppins | 1116 (one length) | 202 | 246 | none |
| Blend | Default (as served) | 1208.86 (one length) | 10 | 123 | none |
| Blend | Butter, Outfit | 1204 (one length) | 10 | 123 | none |
| Blend | Chocolate, Albert Sans | 1204 (one length) | 10 | 123 | none |
| Blend | Gothic, Fustat | 1200 (one length) | 10–11 | 123 | none |
| Blend | Matcha, DM Sans | 1192 (one length) | 10 | 123 | none |
| Blend | Neutral, Figtree | 1204 (one length) | 10 | 123 | none |
| Blend | Y2K, Poppins | 1196 (one length) | 10 | 123 | none |
| Opacity | Default (as served) | 1208.86 (one length) | 12 | 123 | none |
| Opacity | Butter, Outfit | 1204 (one length) | 12 | 123 | none |
| Opacity | Chocolate, Albert Sans | 1204 (one length) | 12 | 123 | none |
| Opacity | Gothic, Fustat | 1200 (one length) | 12–13 | 123 | none |
| Opacity | Matcha, DM Sans | 1192 (one length) | 12 | 123 | none |
| Opacity | Neutral, Figtree | 1204 (one length) | 12 | 123 | none |
| Opacity | Y2K, Poppins | 1196 (one length) | 12 | 123 | none |
| Rating | Default (as served) | 1169.94 (one length) | 6 | 123 | none |
| Rating | Butter, Outfit | 1159 (one length) | 6 | 123 | none |
| Rating | Chocolate, Albert Sans | 1159 (one length) | 6 | 123 | none |
| Rating | Gothic, Fustat | 1150 (one length) | 6–7 | 123 | none |
| Rating | Matcha, DM Sans | 1137 (one length) | 6 | 123 | none |
| Rating | Neutral, Figtree | 1159 (one length) | 6 | 123 | none |
| Rating | Y2K, Poppins | 1146 (one length) | 6 | 123 | none |
| Temperature | Default (as served) | 1201.08 (one length) | 32 | 123 | none |
| Temperature | Butter, Outfit | 1195 (one length) | 32 | 123 | none |
| Temperature | Chocolate, Albert Sans | 1195 (one length) | 32 | 123 | none |
| Temperature | Gothic, Fustat | 1190 (one length) | 32–33 | 123 | none |
| Temperature | Matcha, DM Sans | 1181 (one length) | 32 | 123 | none |
| Temperature | Neutral, Figtree | 1195 (one length) | 32 | 123 | none |
| Temperature | Y2K, Poppins | 1186 (one length) | 32 | 123 | none |

- Each condition reaches every value from the keyboard. It also drags each thumb with the mouse, past one end and then past the other.
- In Gothic, Fustat, light LTR, the middle still adds one reading. So the Gothic rows have one more value in that condition.

## Against the 76db5b31 take (test)

- 3df5fd86 changed only a code comment and the release note over 76db5b31. So the 76db5b31 take shows the 3df5fd86 code.
- Since 3df5fd86, the head adds one code change, 4cc72108, for a `max` off the step grid. Each approved slider's `max` is on its step grid.
- Against that take, 140 of 140 sliders have the same track length and the same text at every value.
- 27 of 27 stills of the head's own stories are byte-identical to that take's stills.

## The guard: never longer than main (test)

- Main has no Text Value Widths story, because this pull request adds it. So both builds build the same sliders from story arguments.
- On the head, those sliders equal the story's own sliders, in 28 of 28 conditions for each slider.

| Slider | Font | Head: track length, px | Main: shortest–longest track, px | Head minus main, px (largest over the values) | Values compared per condition | Head ever longer than main |
| --- | --- | --- | --- | --- | --- | --- |
| Price range | Default (as served) | 1146.58 | 1162.11–1208.86 | -15.53 | 202 | no |
| Price range | Butter, Outfit | 1132 | 1162–1208 | -30.00 | 202 | no |
| Price range | Chocolate, Albert Sans | 1132 | 1161–1205 | -29.00 | 202 | no |
| Price range | Gothic, Fustat | 1120 | 1152–1202 | -32.00 | 202–203 | no |
| Price range | Matcha, DM Sans | 1104 | 1141–1195 | -37.00 | 202 | no |
| Price range | Neutral, Figtree | 1132 | 1160–1208 | -28.00 | 202 | no |
| Price range | Y2K, Poppins | 1116 | 1148–1198 | -32.00 | 202 | no |
| Blend | Default (as served) | 1208.86 | 1220.53–1232.2 | -11.67 | 10 | no |
| Blend | Butter, Outfit | 1204 | 1219–1231 | -15.00 | 10 | no |
| Blend | Chocolate, Albert Sans | 1204 | 1219–1231 | -15.00 | 10 | no |
| Blend | Gothic, Fustat | 1200 | 1217–1230 | -17.00 | 10–11 | no |
| Blend | Matcha, DM Sans | 1192 | 1213–1225 | -21.00 | 10 | no |
| Blend | Neutral, Figtree | 1204 | 1219–1231 | -15.00 | 10 | no |
| Blend | Y2K, Poppins | 1196 | 1212–1226 | -16.00 | 10 | no |
| Opacity | Default (as served) | 1208.86 | 1220.53–1232.2 | -11.67 | 12 | no |
| Opacity | Butter, Outfit | 1204 | 1219–1235 | -15.00 | 12 | no |
| Opacity | Chocolate, Albert Sans | 1204 | 1219–1236 | -15.00 | 12 | no |
| Opacity | Gothic, Fustat | 1200 | 1217–1235 | -17.00 | 12–13 | no |
| Opacity | Matcha, DM Sans | 1192 | 1213–1231 | -21.00 | 12 | no |
| Opacity | Neutral, Figtree | 1204 | 1219–1234 | -15.00 | 12 | no |
| Opacity | Y2K, Poppins | 1196 | 1212–1231 | -16.00 | 12 | no |
| Rating | Default (as served) | 1169.94 | 1183.17–1215.08 | -13.23 | 6 | no |
| Rating | Butter, Outfit | 1159 | 1182–1215 | -23.00 | 6 | no |
| Rating | Chocolate, Albert Sans | 1159 | 1181–1216 | -22.00 | 6 | no |
| Rating | Gothic, Fustat | 1150 | 1174–1211 | -24.00 | 6–7 | no |
| Rating | Matcha, DM Sans | 1137 | 1169–1207 | -32.00 | 6 | no |
| Rating | Neutral, Figtree | 1159 | 1181–1216 | -22.00 | 6 | no |
| Rating | Y2K, Poppins | 1146 | 1164–1206 | -18.00 | 6 | no |
| Temperature | Default (as served) | 1201.08 | 1210.27–1210.27 | -9.19 | 32 | no |
| Temperature | Butter, Outfit | 1195 | 1209–1214 | -14.00 | 32 | no |
| Temperature | Chocolate, Albert Sans | 1195 | 1208–1214 | -13.00 | 32 | no |
| Temperature | Gothic, Fustat | 1190 | 1205–1212 | -15.00 | 32–33 | no |
| Temperature | Matcha, DM Sans | 1181 | 1201–1208 | -20.00 | 32 | no |
| Temperature | Neutral, Figtree | 1195 | 1209–1213 | -14.00 | 32 | no |
| Temperature | Y2K, Poppins | 1186 | 1199–1205 | -13.00 | 32 | no |

- "Head minus main" is the head's track length minus main's, at the same value. A negative number means the head's track is shorter.

## (2) French (test)

- fr-FR ships no `@astryx.slider.rangeValue`. The shipped en message is "{start} – {end}".
- So the scratch story wraps the Price range slider in a provider with the fr-FR locale and an override: "de {start} à {end}".
- The numbers have no thousands separator. The text runs from "de 0 à 0" to "de 1000 à 1000".

| Font | Head: track length, px (all 4 conditions) | Main: shortest–longest track, px | Head minus main, px (largest over the values) | Values compared per condition | Drag frames per condition (head) | Text clipped or over the track |
| --- | --- | --- | --- | --- | --- | --- |
| Default (as served) | 1123.22 (one length) | 1142.67–1189.39 | -19.45 | 202 | 246 | none |
| Butter, Outfit | 1105 (one length) | 1143–1189 | -38.00 | 202 | 246 | none |
| Chocolate, Albert Sans | 1105 (one length) | 1143–1187 | -38.00 | 202 | 246 | none |
| Gothic, Fustat | 1090 (one length) | 1130–1180 | -40.00 | 202–203 | 246 | none |
| Matcha, DM Sans | 1071 (one length) | 1120–1174 | -49.00 | 202 | 246 | none |
| Neutral, Figtree | 1105 (one length) | 1142–1190 | -37.00 | 202 | 246 | none |
| Y2K, Poppins | 1086 (one length) | 1124–1174 | -38.00 | 202 | 246 | none |

## Method

- Chromium 149.0.7827.55 through Playwright, 1280 × 800 px, at scale 1. Light and dark, LTR and RTL, set with the Storybook globals.
- The 7 font setups are the default as served, and each theme's own body font.
- The theme fonts are Butter (Outfit), Chocolate (Albert Sans), Gothic (Fustat), Matcha (DM Sans), Neutral (Figtree) and Y2K (Poppins).
- Each theme's font faces come from the repository, because Storybook loads no theme font. The drawn face is checked on every page.
- The track length is the width of the slider's control.
- The text is checked for clipping, for overlap with the track, and for running past its row or the page.
- Every value is reached from the keyboard. Each drag is a real mouse drag, read on every animation frame.
- All numbers are test measurements from one machine. Every frame was looked at.

## Files

- `en-story--<font>--<slider>--<value>--<mode>--<dir>--pr.png`: the head's own stories.
- `en-guard--<font>--<slider>--<value>--light--ltr--<build>.png`: the sliders built from story arguments, on both builds.
- `fr--<font>--price-range--<value>--<mode>--<dir>--<build>.png`: the French scratch story.
- `scratch-story.tsx`: the French scratch story.
- `measurements.json`: every value's track length and text, every drag frame, the guard pairs and the summaries.
