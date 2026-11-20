# SegmentedControl: the selected segment's cues, per theme and mode

Main: the production Storybook of 1f04ed3e37217372e7fa2e2757abab8421d164e2, by its version.json (environment "production").

## Method

- Stories: `core-segmentedcontrol--default` for every measure and still, and `core-segmentedcontrol--with-icons` for the icon colours. "Grid" is the selected segment; "List" and "Table" are not.
- Theme and mode: the Storybook globals `astryxTheme` (toolbar "Theme") and `colorMode` (toolbar "Mode"), set in the story URL as `globals=astryxTheme:<theme>;colorMode:<mode>`. The browser's colour-scheme preference matched the mode.
- Themes: `none` (no theme, the base tokens: the Core default), and the seven published themes: neutral, stone, butter, chocolate, gothic, matcha and y2k. `probe` is left out: it is a private test fixture and is never published.
- Chromium (Playwright 1.61.1, Chrome for Testing 149.0.7827.55), 1280×800, device scale 2. No pointer over the control and no focus.
- Colours: computed `color` and `background-color`, resolved to 8-bit sRGB through a canvas. Each one is composited over the layers below it, down to the browser canvas colour (the `Canvas` system colour in the page's scheme).
- Contrast: the WCAG 2 relative-luminance ratio. Weights: the computed `font-weight` of each label.
- Pixel samples come from the same screenshot. The page is sampled beside the control, the track inside an unselected segment and the pill inside the selected segment, each left of the label. A label's ink is the pixel in its box with the highest contrast against its surface.
- The computed and sampled colours agree within 2/255 per channel in every condition, so the table gives the computed values.
- Where computed styles alone mislead: in Core (base tokens) light and Core (base tokens) dark, no element behind the control paints a background. So the page is the browser canvas, and the samples confirm the canvas colours given.
- Shadow: the computed `box-shadow`, and its pixel effect. That is the track pixel just below the pill against a plain track pixel, as a contrast ratio.
- All numbers are test measurements: one browser on one machine, not field data.

## Table

| Theme | Mode | Selected label on pill | Unselected label on track | Selected vs unselected label | Weights (selected / unselected) | Pill vs track | Pill vs page | Selected shadow (pixel effect under the pill) |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Core (base tokens) | light | #0a1317 on #ffffff: 18.78 | #445564 on #e6ebee: 6.41 | 2.44 | 600 / 500 | 1.2 | 1 | rgba(0,0,0,0.1) 0px 1px 1px, rgba(0,0,0,0.1) 0px 2px 8px (1.208) |
| Core (base tokens) | dark | #dfe2e5 on #1f1f22: 12.64 | #b0b5bb on #3b3b3c: 5.42 | 1.59 | 600 / 500 | 1.47 | 1.14 | rgba(0,0,0,0.2) 0px 1px 1px, rgba(0,0,0,0.2) 0px 2px 8px (1.161) |
| Neutral | light | #000000 on #ffffff: 21 | #474747 on #f0f0f0: 8.15 | 2.26 | 600 / 500 | 1.14 | 1 | none (1) |
| Neutral | dark | #ffffff on #262626: 15.13 | #c6c6c6 on #3c3c3c: 6.46 | 1.71 | 600 / 500 | 1.37 | 1 | none (1) |
| Stone | light | #25252a on #ffffff: 15.25 | #5f5f64 on #f2f2f2: 5.67 | 2.4 | 600 / 500 | 1.12 | 1 | rgba(37,37,42,0.05) 0px 2px 4px, rgba(37,37,42,0.1) 0px 4px 8px (1.225) |
| Stone | dark | #f0f0f9 on #1b1b21: 15.13 | #ababb3 on #303037: 5.74 | 2.01 | 600 / 500 | 1.31 | 1 | rgba(37,37,42,0.05) 0px 2px 4px, rgba(37,37,42,0.1) 0px 4px 8px (1.03) |
| Butter | light | #1d1c11 on #ffffff: 17.12 | #605f52 on #f2f2f1: 5.76 | 2.65 | 600 / 500 | 1.12 | 1 | rgba(29,28,17,0.05) 0px 2px 4px, rgba(29,28,17,0.1) 0px 4px 8px (1.249) |
| Butter | dark | #f3f2e2 on #2e2117: 13.83 | #adac9e on #42372c: 5.05 | 2.03 | 600 / 500 | 1.35 | 1 | rgba(29,28,17,0.05) 0px 2px 4px, rgba(29,28,17,0.1) 0px 4px 8px (1.077) |
| Chocolate | light | #4a3520 on #fffcf7: 11.27 | #894d0e on #f8f2ea: 6.03 | 1.72 | 600 / 500 | 1.09 | 1 | rgba(74,53,32,0.05) 0px 2px 4px, rgba(74,53,32,0.1) 0px 4px 8px (1.217) |
| Chocolate | dark | #ede4d4 on #1c1610: 14.21 | #c4a882 on #312b24: 6.17 | 1.8 | 600 / 500 | 1.28 | 1 | rgba(74,53,32,0.05) 0px 2px 4px, rgba(74,53,32,0.1) 0px 4px 8px (1.014) |
| Gothic | light | #e8f1f6 on #101314: 16.3 | #96a0ab on #262a2b: 5.46 | 2.32 | 600 / 500 | 1.29 | 1 | rgba(0,0,0,0.2) 0px 2px 4px, rgba(0,0,0,0.25) 0px 4px 8px (1.169) |
| Gothic | dark | #e8f1f6 on #101314: 16.3 | #96a0ab on #262a2b: 5.46 | 2.32 | 600 / 500 | 1.29 | 1 | rgba(0,0,0,0.2) 0px 2px 4px, rgba(0,0,0,0.25) 0px 4px 8px (1.169) |
| Matcha | light | #3e481d on #ffffff: 9.77 | #5a6b2a on #f4f4f2: 5.34 | 1.66 | 600 / 500 | 1.1 | 1 | rgba(62,72,29,0.05) 0px 2px 4px, rgba(62,72,29,0.1) 0px 4px 8px (1.187) |
| Matcha | dark | #c0cba9 on #1a1c14: 10.13 | #a8bf6a on #2b2e23: 6.8 | 1.2 | 600 / 500 | 1.24 | 1 | rgba(62,72,29,0.05) 0px 2px 4px, rgba(62,72,29,0.1) 0px 4px 8px (1.006) |
| Y2K | light | #2d241b on #ffffff: 15.22 | #5a5146 on #f2f1f1: 6.9 | 1.96 | 600 / 500 | 1.13 | 1 | rgba(45,36,27,0.05) 0px 2px 4px, rgba(45,36,27,0.1) 0px 4px 8px (1.215) |
| Y2K | dark | #edeffc on #16182b: 15.3 | #a6acd6 on #2c2e41: 6.03 | 1.93 | 600 / 500 | 1.31 | 1 | rgba(45,36,27,0.05) 0px 2px 4px, rgba(45,36,27,0.1) 0px 4px 8px (1.043) |

| Theme | Page, light | Page, dark | Label size | Computed font family | Track radius |
| --- | --- | --- | --- | --- | --- |
| Core (base tokens) | #ffffff | #121212 | 14px | -apple-system | 8px |
| Neutral | #ffffff | #262626 | 14px | Figtree | 10px |
| Stone | #ffffff | #1b1b21 | 14px | Figtree | 8px |
| Butter | #ffffff | #2e2117 | 14px | Outfit | 8px |
| Chocolate | #fffcf7 | #1c1610 | 14px | Albert Sans | 10px |
| Gothic | #101314 | #101314 | 16px | Fustat | 8px |
| Matcha | #ffffff | #1a1c14 | 16px | DM Sans | 12px |
| Y2K | #ffffff | #16182b | 16px | Poppins | 0px |

## Other cues

- Borders and outlines: none on the selected segment, the unselected segments or the track, in every condition (all 0 px); no outline at rest.
- The moving selection surface (the control's `::before`) does not paint at rest: the selected segment's own background is the pill.
- Icons (`core-segmentedcontrol--with-icons`): each icon takes its label's colour, selected and unselected, in every condition. So an icon adds no cue of its own.
- Weight: 600/500 (selected / unselected) in every condition.
- Drawn face: this Storybook loads no `@font-face` for the theme families. `document.fonts` lists only Storybook's own Nunito Sans, and no font file is requested.
- So every label here is drawn in the platform fallback, Liberation Sans, in all 8 themes. By CDP's platform-font report, the selected label uses LiberationSans-Bold and the unselected labels LiberationSans.
- That font has no 500 or 600 face, so the computed 600 and 500 draw as its bold and regular faces. The stills show those faces, not the themes' own fonts.
## Findings

- Pill vs track: 1.09–1.2 on light pages and 1.24–1.47 on dark pages. Gothic draws a dark page in light mode too, so its light row counts as dark.
- Pill vs page: 1 (the pill is the page colour) in every condition except Core (base tokens) dark (1.14).
- Selected label on the pill: 9.77–21. Unselected label on the track: 5.05–8.15.
- Selected vs unselected label colour: 1.2–2.65, lowest in Matcha dark, highest in Butter light.
- The selected shadow changes the track under the pill by 1.187–1.249 on light pages and 1.006–1.169 on dark pages. Neutral has no shadow.
- Stone, Butter, Chocolate, Matcha, Y2K use the same shadow colours in dark mode as in light mode.
- Gothic gives the same values in light and dark mode.

## Files

- `<theme>--<mode>.png`: one still per condition, at device scale 2, clipped to the control and the page around it. The theme is the `astryxTheme` value (`none` is the base tokens).
- `measurements.json`: the values behind the table, with the pixel samples.
