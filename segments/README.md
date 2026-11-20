# The remove button's focus ring in Thumbnail and Token, segment by segment

Measured on the Storybook of main at 77a11ae0d2305c3f261190161248853f5741b52b, checked by its version.json. All results are from test runs.

## Method

- Desktop Chromium 149.0.7827.55 through Playwright, a 1000 × 700 viewport at device pixel ratio 4, focus moved with Tab.
- Light and dark use the Storybook `colorMode` global. Forced colours use Chromium's forced-colors media emulation (`forcedColors: 'active'`), with the light scheme.
- The ring is the remove button's outline: 2 px wide, 3 px from the button. The measurement walks the ring's centre line every 0.25 px. At each point it reads the ring across its width at 8 positions.
- A position is clipped when it lies outside a clipping ancestor's rounded box (overflow other than visible). The browser snaps a clip edge to device pixels. So the painted width in the screenshots can differ from the geometric width by up to 0.25 px. Where the ring and the image share a colour (mixed tones, dark), the painted width cannot be read; results.json gives 0.93 px there.
- Contrast is WCAG relative-luminance contrast between the ring's colour and the colours next to it. The ring's colour is read in the part of the ring the clip leaves. Inside means the middle of the gap between the button and the ring. Outside means 1.5 px beyond the ring's outer edge.
- Each side's numbers cover every point on that side; corner arcs are split at 45 degrees.
- 1.4.11 asks a focus indicator for 3:1 against its adjacent colours. Values under 3:1 are in bold.

## Thumbnail

Stories: Clickable with remove (a dark image) and Media mode (four thumbnails with a dark, a light, a mixed and a warm image).

The clip is the same over every image. The image's container cuts the outer part of the ring along its top and right sides. On average, 1.21 px of its 2 px show there. The full width shows on 16% of each of those sides. No point of the ring is hidden. The bottom and left sides show in full. The thumbnail's own ring also shows while the remove button has focus.

| Image under the button | Scheme | Top: contrast inside · outside (min–median) | Right | Bottom | Left | Share of each side under 3:1 against both neighbours |
| --- | --- | --- | --- | --- | --- | --- |
| Dark landscape (Clickable with remove) | light | in **1.12**–**1.13** (image) · out **1.07**–17.22 (page 94%, image 6%) | in **1.14**–**1.70** (image) · out **1.57**–17.22 (page 94%, image 6%) | in **1.16**–**1.70** (image) · out **1.17**–**1.70** (image) | in **1.12**–**1.14** (image) · out **1.11**–**1.13** (image) | top 6%, right 5%, bottom 100%, left 100% |
| Dark landscape (Clickable with remove) | dark | in 13.27–13.47 (image) · out 10.01–13.40 (page 94%, image 6%) | in 8.95–8.95 (image) · out 6.66–13.40 (page 94%, image 6%) | in 8.95–8.95 (image) · out 8.95–8.95 (image) | in 13.07–13.43 (image) · out 13.07–13.47 (image) | none |
| Dark landscape (Clickable with remove) | forced colours | in **1.21**–**1.23** (image) · out **1.20**–18.70 (page 94%, image 6%) | in **1.23**–**1.78** (image) · out **1.78**–17.97 (page 94%, image 6%) | in **1.25**–**1.78** (image) · out **1.24**–**1.78** (image) | in **1.21**–**1.23** (image) · out **1.20**–**1.23** (image) | top 6%, right 5%, bottom 100%, left 100% |
| Dark image (Media mode) | light | in **1.12**–**1.13** (image) · out **1.07**–17.22 (page 94%, image 6%) | in **1.14**–**1.70** (image) · out **1.57**–17.22 (page 94%, image 6%) | in **1.16**–**1.70** (image) · out **1.17**–**1.70** (image) | in **1.12**–**1.14** (image) · out **1.11**–**1.13** (image) | top 7%, right 6%, bottom 100%, left 100% |
| Light image (Media mode) | light | in 15.35–15.45 (image) · out 12.86–17.22 (page 94%, image 6%) | in 15.45–15.77 (image) · out 13.45–17.22 (page 94%, image 6%) | in 15.95–16.09 (image) · out 16.08–16.22 (image) | in 15.47–15.77 (image) · out 15.32–15.77 (image) | none |
| Mixed tones (Media mode) | light | in **1.13**–**1.13** (image) · out **1.08**–17.22 (page 94%, image 6%) | in **1.13**–15.27 (image) · out 12.79–17.22 (page 94%, image 6%) | in **1.13**–15.27 (image) · out **1.13**–15.27 (image) | in **1.13**–**1.13** (image) · out **1.13**–**1.13** (image) | top 7%, bottom 4%, left 100% |
| Warm tones (Media mode) | light | in 5.64–5.97 (image) · out 5.42–17.22 (page 94%, image 6%) | in 4.94–5.23 (image) · out 4.05–17.22 (page 94%, image 6%) | in 4.91–5.07 (image) · out 4.73–4.94 (image) | in 5.68–6.08 (image) · out 5.86–6.31 (image) | none |
| Dark image (Media mode) | dark | in 13.23–13.47 (image) · out 10.01–13.40 (page 94%, image 6%) | in 8.95–8.95 (image) · out 6.66–13.40 (page 94%, image 6%) | in 8.95–8.95 (image) · out 8.95–8.95 (image) | in 13.07–13.43 (image) · out 13.07–13.47 (image) | none |
| Light image (Media mode) | dark | in **1.01**–**1.01** (image) · out **1.00**–13.40 (page 94%, image 6%) | in **1.01**–**1.03** (image) · out **1.06**–13.40 (page 93%, image 7%) | in **1.05**–**1.06** (image) · out **1.05**–**1.06** (image) | in **1.01**–**1.03** (image) · out **1.00**–**1.03** (image) | top 7%, right 6%, bottom 100%, left 100% |
| Mixed tones (Media mode) | dark | in 13.55–13.55 (image) · out 9.92–13.40 (page 94%, image 6%) | in **1.00**–**1.00** (image) · out **1.01**–13.40 (page 94%, image 6%) | in **1.00**–**1.00** (image) · out **1.00**–**1.00** (image) | in 13.55–13.55 (image) · out 13.55–13.55 (image) | right 5%, bottom 86% |
| Warm tones (Media mode) | dark | in **2.48**–**2.55** (image) · out **2.16**–13.40 (page 94%, image 6%) | in **2.70**–**2.92** (image) · out **2.79**–13.40 (page 94%, image 6%) | in **1.78**–3.01 (image) · out **1.80**–3.09 (image) | in **1.76**–**2.51** (image) · out **1.73**–**2.42** (image) | top 7%, bottom 41%, left 100% |
| Dark image (Media mode) | forced colours | in **1.21**–**1.23** (image) · out **1.20**–18.70 (page 94%, image 6%) | in **1.23**–**1.78** (image) · out **1.78**–17.97 (page 94%, image 6%) | in **1.25**–**1.78** (image) · out **1.25**–**1.78** (image) | in **1.21**–**1.23** (image) · out **1.20**–**1.23** (image) | top 7%, right 6%, bottom 100%, left 100% |
| Light image (Media mode) | forced colours | in 10.41–10.48 (image) · out 10.37–11.69 (page 94%, image 6%) | in 10.48–10.59 (image) · out 10.73–11.63 (page 94%, image 6%) | in 10.64–10.73 (image) · out 10.72–10.82 (image) | in 10.48–10.59 (image) · out 10.37–10.61 (image) | none |
| Mixed tones (Media mode) | forced colours | in **1.22**–**1.22** (image) · out **1.22**–18.68 (page 94%, image 6%) | in **1.13**–10.47 (image) · out 10.47–11.81 (page 94%, image 6%) | in **1.22**–10.47 (image) · out **1.22**–10.47 (image) | in **1.22**–**1.22** (image) · out **1.22**–**1.22** (image) | top 7%, bottom 4%, left 100% |
| Warm tones (Media mode) | forced colours | in 5.10–5.31 (image) · out 5.64–15.34 (page 94%, image 6%) | in 4.58–4.82 (image) · out 4.39–15.83 (page 94%, image 6%) | in 4.29–4.68 (image) · out 4.39–4.56 (image) | in 4.67–5.42 (image) · out 5.26–5.62 (image) | none |

## Token

Story: Clickable with remove (a button token and a link token, each with a remove button).

The token's rounded overflow clip cuts the outer part of the ring at its top, right and bottom. The ring shows on every side. The numbers are the same in light, dark and forced colours.

| Token | Whole ring | Top | Right | Bottom | Left | Painted width in the screenshots (mean) |
| --- | --- | --- | --- | --- | --- | --- |
| Design (a button token) | 64% full width, 36% part, 0% none; mean 1.74 of 2 px | 53% full, 47% part, 0% none; mean 1.65 px | 53% full, 47% part, 0% none; mean 1.65 px | 53% full, 47% part, 0% none; mean 1.65 px | 100% full, 0% part, 0% none; mean 2.00 px | 1.54 px |
| Docs (a link token) | 64% full width, 36% part, 0% none; mean 1.74 of 2 px | 53% full, 47% part, 0% none; mean 1.65 px | 53% full, 47% part, 0% none; mean 1.65 px | 53% full, 47% part, 0% none; mean 1.65 px | 100% full, 0% part, 0% none; mean 2.00 px | 1.74 px |

Against the token and the page next to it, the ring measures 15.11:1 or more in light. It measures 9.77:1 or more in dark and 11.31:1 or more in forced colours. On the left, it passes next to the label's last letter, where it measures down to 1.06:1 against the letter.

## Files

- [crops/](crops/): per button and scheme, the button unfocused and focused, and the samples drawn on the focused crop. Grey is clipped. Green is 3:1 or more against both neighbours, amber against one, and red under 3:1 against both.
- [sheets/](sheets/): the same crops, one sheet per button.
- [results.json](results.json): every side's numbers, each clipping ancestor and the ring geometry.
