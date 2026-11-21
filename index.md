# Dictation's interim words at be6b12a3: every theme in the menu

Head: #13434 at be6b12a3d970bd944161d8ccb54113be9d2e366b (draft). Before: 1d99135a69253b5155964b84811451a41ab3507d, the head's parent. Every theme in the Storybook theme menu, light and dark. All numbers are test measurements.

Each is the core-chatcomposer--simplest story with "Confirmed words " typed and the interim span injected (a headless browser can't dictate).

## Answer (test)

- In the 7 published themes, light and dark, the interim words go from 1.31–2.14:1 before to 5.53–9.29:1 after, against the composer's background.
- In all 32 frames, the confirmed words are upright, in the theme's primary text colour. The interim words are italic, in another colour, on the same line after them.
- Before and after differ only in the interim words, in every theme and mode.
- Probe is the menu's test fixture, and its package is private. Its confirmed words are 1.35:1 in both modes.
- In Probe, the interim words go from 1.36 to 5.18:1 in light, and from 2.22 to 1.39:1 in dark.
- Gothic draws the same composer in light and dark, so its numbers are the same in both modes. Only the page around it changes.
- The Neutral frames are byte-identical to the earlier take's, at commit ee5f3ce5.

## Contrast against the composer's background (test)

| Theme | Mode | Background | Interim words, before | Interim words, after | Confirmed words |
| --- | --- | --- | --- | --- | --- |
| Butter | light | #FFFFFF | 1.75:1 (#C5C4BA) | 6.45:1 (#605F52) | 17.12:1 (#1D1C11) |
| Butter | dark | #3A2A1F | 1.68:1 (#544F42) | 5.99:1 (#ADAC9E) | 12.16:1 (#F3F2E2) |
| Chocolate | light | #FFFCF7 | 1.67:1 (#D5C3B2) | 6.55:1 (#894D0E) | 11.27:1 (#4A3520) |
| Chocolate | dark | #2A2018 | 1.75:1 (#574534) | 7.03:1 (#C4A882) | 12.63:1 (#EDE4D4) |
| Gothic | light | #24292D | 1.49:1 (#3E4449) | 5.53:1 (#96A0AB) | 12.83:1 (#E8F1F6) |
| Gothic | dark | #24292D | 1.49:1 (#3E4449) | 5.53:1 (#96A0AB) | 12.83:1 (#E8F1F6) |
| Matcha | light | #FFFFFF | 1.44:1 (#D2DAC2) | 5.88:1 (#5A6B2A) | 9.77:1 (#3E481D) |
| Matcha | dark | #1E2016 | 1.92:1 (#484F33) | 8.11:1 (#A8BF6A) | 9.7:1 (#C0CBA9) |
| Neutral | light | #FFFFFF | 2.14:1 (#B1B1B1) | 9.29:1 (#474747) | 21:1 (#000000) |
| Neutral | dark | #1B1B1B | 1.69:1 (#414141) | 6.43:1 (#9E9E9E) | 17.22:1 (#FFFFFF) |
| Probe (test fixture) | light | #6DEF43 | 1.36:1 (#92C296) | 5.18:1 (#435563) | 1.35:1 (#F0FF00) |
| Probe (test fixture) | dark | #6DEF43 | 2.22:1 (#6D986A) | 1.39:1 (#AEB5B9) | 1.35:1 (#F0FF00) |
| Stone | light | #FFFFFF | 1.31:1 (#E0E0E7) | 6.35:1 (#5F5F64) | 15.25:1 (#25252A) |
| Stone | dark | #302F36 | 1.65:1 (#505056) | 5.81:1 (#ABABB3) | 11.69:1 (#F0F0F9) |
| Y2K | light | #FFFFFF | 1.44:1 (#DED6CD) | 7.78:1 (#5A5146) | 15.22:1 (#2D241B) |
| Y2K | dark | #1F2238 | 1.57:1 (#3D415B) | 7.06:1 (#A6ACD6) | 13.65:1 (#EDEFFC) |

- Each colour is read from the frame's pixels, inside that text's own boxes. The most frequent colour there is the background.
- The text colour is the colour of the pixels with the strongest contrast against that background.
- In each theme and mode, the background is the same in all four readings, and the confirmed words read the same before and after.
- Before, the span is at opacity 0.7, so its drawn colour lies between its token's colour and the background. The computed colours are in measurements.json.

## Stills

| Theme | Light, before | Light, after | Dark, before | Dark, after |
| --- | --- | --- | --- | --- |
| Butter | `butter-light-before.png` | `butter-light-after.png` | `butter-dark-before.png` | `butter-dark-after.png` |
| Chocolate | `chocolate-light-before.png` | `chocolate-light-after.png` | `chocolate-dark-before.png` | `chocolate-dark-after.png` |
| Gothic | `gothic-light-before.png` | `gothic-light-after.png` | `gothic-dark-before.png` | `gothic-dark-after.png` |
| Matcha | `matcha-light-before.png` | `matcha-light-after.png` | `matcha-dark-before.png` | `matcha-dark-after.png` |
| Neutral | `neutral-light-before.png` | `neutral-light-after.png` | `neutral-dark-before.png` | `neutral-dark-after.png` |
| Probe (test fixture) | `probe-light-before.png` | `probe-light-after.png` | `probe-dark-before.png` | `probe-dark-after.png` |
| Stone | `stone-light-before.png` | `stone-light-after.png` | `stone-dark-before.png` | `stone-dark-after.png` |
| Y2K | `y2k-light-before.png` | `y2k-light-after.png` | `y2k-dark-before.png` | `y2k-dark-after.png` |

## How they were taken

- Before: the Production deploy of 1d99135a, by its version.json (environment "production").
- After: the preview deploy of be6b12a3, by its version.json (environment "preview"). The version.json files were the same at the start and the end of the run.
- Chromium 149.0.7827.55 through Playwright, a 720 × 400 px viewport at device scale 2. Each still is an element shot of `#storybook-root`, 744 CSS px wide.
- Its height is 230 to 254 CSS px by theme, so each still is 1488 px wide and 460 to 508 px high.
- The globals are `astryxTheme:<theme>` and `colorMode:light` or `colorMode:dark`. In every frame, the theme and mode the page applied were read back from its own attributes.
- The menu holds 8 themes. Its other entry, "None (base tokens)", is no theme, so this take leaves it out.
- The story has no dictation control. So a script makes the span the way each build's `insertInterimSpan` makes it.
- It types "Confirmed words " into the composer. Then it appends a span with `data-astryx-dictation-interim`, `contentEditable` false and that build's own inline style to the focused editable, and fires an input event.
- Then it sets the span's text to "words not yet confirmed", and a click at (5, 5) takes the focus away.
- Before, the inline style is `color: var(--color-text-disabled, #999); font-style: italic; opacity: 0.7; pointer-events: none`. After, it is `color: var(--color-text-secondary); font-style: italic; pointer-events: none`.
- Each still is taken when three shots in a row are identical. Every frame was looked at.

## Files

- `<theme>-<mode>-<before|after>.png`: the 32 stills.
- `measurements.json`: each still's sha256, the theme the page applied, the computed styles and tokens, each text's boxes, and every pixel reading.
