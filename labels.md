# Pagination #12652: dots that are not the current page, before and after

Storybook production builds of:
- head 6fa783d25cb206270f2d96470fb158fe9df80cd4 (#12652)
- base e836f0e7ae2703ab7dde96fda9cba3f592f7fa01 (#11658, the head's base)

Story Core/Pagination "Dots Variant", page 1 of 8 current:
`core-pagination--dots-variant`.
Chromium 149.0.7827.55 (Playwright 1.61.1, new headless), desktop 1280x800
CSS px at 2x, with prefers-color-scheme matching the mode. Themes come
from the Storybook globals: astryxTheme none (Core, no theme), neutral and
gothic; colorMode light and dark.

Each frame is the story cropped with 16 px around it. A grey strip with
three lines of text is added under it after capture. The lines give the
build (HEAD or BASE and its commit), the theme and mode, and the measured
contrast.

## How the contrast is measured

As the pull request's own browser spec measures it, for every dot that is
not the current page:
1. The dot's computed `background-color`, read with `getComputedStyle`,
   painted into a 1x1 canvas and read back as sRGB 0-255 with an alpha.
2. The page behind the dot: the computed `background-color` of each
   ancestor up to the first opaque one, read the same way, composited
   bottom-up. With no opaque ancestor, the bottom is the canvas: the
   computed `Canvas` system colour of an element in the root, which
   follows the root's color-scheme. A translucent dot is composited over
   that page. The pull request's spec composites over white there
   instead; see the Core dark rows.
3. Relative luminance (WCAG 2): each channel c/255 is linearised as
   c/12.92 when c <= 0.03928, else ((c + 0.055) / 1.055)^2.4. Then
   L = 0.2126 R + 0.7152 G + 0.0722 B.
4. Contrast = (L_lighter + 0.05) / (L_darker + 0.05).

The table rounds the composite dot colour; the contrast uses it unrounded.

In Core dark, composited over white as the spec does, the dots read
1.05:1 at the base and 5.44:1 at the head. The page there renders
rgb(18, 18, 18), so the measures below use that.

Cross-check: the same formula on the screenshot's pixels, a 3x3 device px
average at the dot's centre against one in the gap beside it.

## Frames

| Frame | Build | Theme, mode | Dot computed colour | Dot sRGB | Page sRGB (from) | L dot | L page | Contrast | Pixels: dot, page, contrast |
|---|---|---|---|---|---|---|---|---|---|
| pagination-dots--none--light--base.png | base e836f0e7ae | Core (no theme), light | `rgba(5, 54, 89, 0.1)` | (230, 235, 238) | (255, 255, 255) (canvas rgb(255, 255, 255)) | 0.824 | 1 | 1.20:1 | (230, 235, 238), (255, 255, 255), 1.20:1 |
| pagination-dots--none--dark--base.png | base e836f0e7ae | Core (no theme), dark | `rgba(223, 226, 229, 0.2)` | (59, 59, 60) | (18, 18, 18) (canvas rgb(18, 18, 18)) | 0.044 | 0.006 | 1.69:1 | (59, 59, 60), (18, 18, 18), 1.67:1 |
| pagination-dots--neutral--light--base.png | base e836f0e7ae | Neutral, light | `rgba(0, 0, 0, 0.06)` | (240, 240, 240) | (255, 255, 255) (div rgb(255, 255, 255)) | 0.871 | 1 | 1.14:1 | (240, 240, 240), (255, 255, 255), 1.14:1 |
| pagination-dots--neutral--dark--base.png | base e836f0e7ae | Neutral, dark | `rgba(255, 255, 255, 0.1)` | (60, 60, 60) | (38, 38, 38) (div rgb(38, 38, 38)) | 0.045 | 0.019 | 1.38:1 | (60, 60, 60), (38, 38, 38), 1.37:1 |
| pagination-dots--gothic--light--base.png | base e836f0e7ae | Gothic, light | `rgba(232, 241, 246, 0.1)` | (38, 42, 43) | (16, 19, 20) (div rgb(16, 19, 20)) | 0.023 | 0.006 | 1.29:1 | (38, 42, 42), (16, 19, 20), 1.29:1 |
| pagination-dots--gothic--dark--base.png | base e836f0e7ae | Gothic, dark | `rgba(232, 241, 246, 0.1)` | (38, 42, 43) | (16, 19, 20) (div rgb(16, 19, 20)) | 0.023 | 0.006 | 1.29:1 | (38, 42, 42), (16, 19, 20), 1.29:1 |
| pagination-dots--none--light--head.png | head 6fa783d25c | Core (no theme), light | `rgb(135, 141, 149)` | (135, 141, 149) | (255, 255, 255) (canvas rgb(255, 255, 255)) | 0.264 | 1 | 3.35:1 | (135, 141, 149), (255, 255, 255), 3.35:1 |
| pagination-dots--none--dark--head.png | head 6fa783d25c | Core (no theme), dark | `rgb(102, 106, 112)` | (102, 106, 112) | (18, 18, 18) (canvas rgb(18, 18, 18)) | 0.143 | 0.006 | 3.44:1 | (102, 106, 112), (18, 18, 18), 3.44:1 |
| pagination-dots--neutral--light--head.png | head 6fa783d25c | Neutral, light | `rgb(132, 132, 132)` | (132, 132, 132) | (255, 255, 255) (div rgb(255, 255, 255)) | 0.231 | 1 | 3.74:1 | (132, 132, 132), (255, 255, 255), 3.74:1 |
| pagination-dots--neutral--dark--head.png | head 6fa783d25c | Neutral, dark | `rgb(119, 119, 119)` | (119, 119, 119) | (38, 38, 38) (div rgb(38, 38, 38)) | 0.184 | 0.019 | 3.38:1 | (119, 119, 119), (38, 38, 38), 3.38:1 |
| pagination-dots--gothic--light--head.png | head 6fa783d25c | Gothic, light | `rgb(104, 114, 121)` | (104, 114, 121) | (16, 19, 20) (div rgb(16, 19, 20)) | 0.164 | 0.006 | 3.80:1 | (104, 114, 121), (16, 19, 20), 3.80:1 |
| pagination-dots--gothic--dark--head.png | head 6fa783d25c | Gothic, dark | `rgb(104, 114, 121)` | (104, 114, 121) | (16, 19, 20) (div rgb(16, 19, 20)) | 0.164 | 0.006 | 3.80:1 | (104, 114, 121), (16, 19, 20), 3.80:1 |

Gothic's page and dot colours are the same in light and dark mode.

The 7 dots that are not the current page read the same in each frame
(theme, mode, build: computed range, pixel range):
- none light base: 1.20-1.20:1, 1.20-1.20:1 (7 dots)
- none dark base: 1.69-1.69:1, 1.67-1.67:1 (7 dots)
- neutral light base: 1.14-1.14:1, 1.14-1.14:1 (7 dots)
- neutral dark base: 1.38-1.38:1, 1.37-1.37:1 (7 dots)
- gothic light base: 1.29-1.29:1, 1.29-1.29:1 (7 dots)
- gothic dark base: 1.29-1.29:1, 1.29-1.29:1 (7 dots)
- none light head: 3.35-3.35:1, 3.35-3.35:1 (7 dots)
- none dark head: 3.44-3.44:1, 3.44-3.44:1 (7 dots)
- neutral light head: 3.74-3.74:1, 3.74-3.74:1 (7 dots)
- neutral dark head: 3.38-3.38:1, 3.38-3.38:1 (7 dots)
- gothic light head: 3.80-3.80:1, 3.80-3.80:1 (7 dots)
- gothic dark head: 3.80-3.80:1, 3.80-3.80:1 (7 dots)
