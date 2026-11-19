# Rating under forced colors: c48db6dc vs 405db391

Both Storybooks were built in an offline container, each from a fresh clone of its commit.
Each build stamp reads back its full SHA: `c48db6dc1afd44e61e3c9bc67e81759eb8ace6a5` and `405db391f343cf5a834cc8a27483ccc8c2480127`.

Browser: Chromium 149.0.7827.55 (Playwright 1.61.1), 1280×800 at device scale 2, mouse.
Emulation: CDP `Emulation.setEmulatedMedia` with `forced-colors: active` and `prefers-color-scheme: light` or `dark`.
The page then matches `(forced-colors: active)` and the chosen scheme.
Story: `lab-rating--states`, with Storybook globals `astryxTheme:none` and `colorMode` set to the same scheme.

Each frame is one rating, cropped 12 px round its group. The disabled rating is "Disabled" (2 of 5). The enabled one is "Ten stars" (7 of 10).

Each star's color is read with `getComputedStyle` on its path.
A value is named by the system colors that compute to the same value in the same emulation.
Pixels sampled on each star's outline and center match these values. A filled star's center is Highlight at 0.8 alpha over Canvas; its outline is the stroke over that fill.

Palette, light: Canvas rgb(255, 255, 255), CanvasText rgb(0, 0, 0), Highlight rgba(5, 0, 73, 0.8), GrayText rgb(96, 0, 0).
Palette, dark: Canvas rgb(0, 0, 0), CanvasText rgb(255, 255, 255), Highlight rgba(0, 230, 255, 0.8), GrayText rgb(63, 242, 63).

## `forced-colors-disabled-before-c48db6dc-light.png`

c48db6dc, the disabled rating, light.

- star 1: fill Highlight, stroke Highlight
- star 2 (checked): fill Highlight, stroke Highlight
- star 3: fill none, stroke GrayText
- star 4: fill none, stroke GrayText
- star 5: fill none, stroke GrayText

## `forced-colors-disabled-before-c48db6dc-dark.png`

c48db6dc, the disabled rating, dark.

- star 1: fill Highlight, stroke Highlight
- star 2 (checked): fill Highlight, stroke Highlight
- star 3: fill none, stroke GrayText
- star 4: fill none, stroke GrayText
- star 5: fill none, stroke GrayText

## `forced-colors-disabled-after-405db391-light.png`

405db391, the disabled rating, light.

- star 1: fill GrayText, stroke GrayText
- star 2 (checked): fill GrayText, stroke GrayText
- star 3: fill none, stroke GrayText
- star 4: fill none, stroke GrayText
- star 5: fill none, stroke GrayText

## `forced-colors-disabled-after-405db391-dark.png`

405db391, the disabled rating, dark.

- star 1: fill GrayText, stroke GrayText
- star 2 (checked): fill GrayText, stroke GrayText
- star 3: fill none, stroke GrayText
- star 4: fill none, stroke GrayText
- star 5: fill none, stroke GrayText

## `forced-colors-enabled-before-c48db6dc-light.png`

c48db6dc, the enabled rating, light.

- star 1: fill Highlight, stroke Highlight
- star 2: fill Highlight, stroke Highlight
- star 3: fill Highlight, stroke Highlight
- star 4: fill Highlight, stroke Highlight
- star 5: fill Highlight, stroke Highlight
- star 6: fill Highlight, stroke Highlight
- star 7 (checked): fill Highlight, stroke Highlight
- star 8: fill none, stroke CanvasText / ButtonText / ButtonBorder / FieldText / MarkText
- star 9: fill none, stroke CanvasText / ButtonText / ButtonBorder / FieldText / MarkText
- star 10: fill none, stroke CanvasText / ButtonText / ButtonBorder / FieldText / MarkText

## `forced-colors-enabled-before-c48db6dc-dark.png`

c48db6dc, the enabled rating, dark.

- star 1: fill Highlight, stroke Highlight
- star 2: fill Highlight, stroke Highlight
- star 3: fill Highlight, stroke Highlight
- star 4: fill Highlight, stroke Highlight
- star 5: fill Highlight, stroke Highlight
- star 6: fill Highlight, stroke Highlight
- star 7 (checked): fill Highlight, stroke Highlight
- star 8: fill none, stroke CanvasText / ButtonText / ButtonBorder / FieldText / AccentColorText
- star 9: fill none, stroke CanvasText / ButtonText / ButtonBorder / FieldText / AccentColorText
- star 10: fill none, stroke CanvasText / ButtonText / ButtonBorder / FieldText / AccentColorText

## `forced-colors-enabled-after-405db391-light.png`

405db391, the enabled rating, light.

- star 1: fill Highlight, stroke Highlight
- star 2: fill Highlight, stroke Highlight
- star 3: fill Highlight, stroke Highlight
- star 4: fill Highlight, stroke Highlight
- star 5: fill Highlight, stroke Highlight
- star 6: fill Highlight, stroke Highlight
- star 7 (checked): fill Highlight, stroke Highlight
- star 8: fill none, stroke CanvasText / ButtonText / ButtonBorder / FieldText / MarkText
- star 9: fill none, stroke CanvasText / ButtonText / ButtonBorder / FieldText / MarkText
- star 10: fill none, stroke CanvasText / ButtonText / ButtonBorder / FieldText / MarkText

## `forced-colors-enabled-after-405db391-dark.png`

405db391, the enabled rating, dark.

- star 1: fill Highlight, stroke Highlight
- star 2: fill Highlight, stroke Highlight
- star 3: fill Highlight, stroke Highlight
- star 4: fill Highlight, stroke Highlight
- star 5: fill Highlight, stroke Highlight
- star 6: fill Highlight, stroke Highlight
- star 7 (checked): fill Highlight, stroke Highlight
- star 8: fill none, stroke CanvasText / ButtonText / ButtonBorder / FieldText / AccentColorText
- star 9: fill none, stroke CanvasText / ButtonText / ButtonBorder / FieldText / AccentColorText
- star 10: fill none, stroke CanvasText / ButtonText / ButtonBorder / FieldText / AccentColorText

## Summary

- c48db6dc, disabled, light: filled Highlight; empty GrayText.
- c48db6dc, disabled, dark: filled Highlight; empty GrayText.
- 405db391, disabled, light: filled GrayText; empty GrayText.
- 405db391, disabled, dark: filled GrayText; empty GrayText.
- c48db6dc, enabled, light: filled Highlight; empty CanvasText / ButtonText / ButtonBorder / FieldText / MarkText.
- c48db6dc, enabled, dark: filled Highlight; empty CanvasText / ButtonText / ButtonBorder / FieldText / AccentColorText.
- 405db391, enabled, light: filled Highlight; empty CanvasText / ButtonText / ButtonBorder / FieldText / MarkText.
- 405db391, enabled, dark: filled Highlight; empty CanvasText / ButtonText / ButtonBorder / FieldText / AccentColorText.
