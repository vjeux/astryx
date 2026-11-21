# Dictation's interim words at be6b12a3: four stills

Head: #13434 at be6b12a3d970bd944161d8ccb54113be9d2e366b (draft). Before: 1d99135a69253b5155964b84811451a41ab3507d, the head's parent. Neutral theme, light and dark. All numbers are test measurements.

Each is the core-chatcomposer--simplest story with "Confirmed words " typed and the interim span injected (a headless browser can't dictate).

## Stills

| Theme | Before (1d99135a) | After (be6b12a3) |
| --- | --- | --- |
| Light | `neutral-light-before.png` | `neutral-light-after.png` |
| Dark | `neutral-dark-before.png` | `neutral-dark-after.png` |

## The interim words' contrast (test)

| Theme | Before | After |
| --- | --- | --- |
| Light | 2.14:1 (#B1B1B1 on #FFFFFF) | 9.29:1 (#474747 on #FFFFFF) |
| Dark | 1.69:1 (#414141 on #1B1B1B) | 6.43:1 (#9E9E9E on #1B1B1B) |

- The colours come from the pixels. Before and after differ only in the interim words: 2429 px in one 298 × 27 px box, in both themes.
- Inside that box, the most frequent colour is the composer's background. The text colour is the colour of the pixels with the strongest contrast against it.
- Before, the span's computed colour is #919191 in light and #525252 in dark, at opacity 0.7. So the drawn colour moves toward the background: #B1B1B1 in light, #414141 in dark.
- After, the span's computed colour is #474747 in light and #9E9E9E in dark, at full opacity. Those are the drawn colours.

## How they were taken

- Before: the Production deploy of 1d99135a, by its version.json (environment "production").
- After: the preview deploy of be6b12a3, by its version.json (environment "preview"). The version.json files were the same at the start and the end of the run.
- Chromium 149.0.7827.55 through Playwright, a 720 × 400 px viewport at device scale 2. Each still is an element shot of `#storybook-root`, 744 × 230 CSS px, so 1488 × 460 px.
- The globals are `astryxTheme:neutral` and `colorMode:light` or `colorMode:dark`.
- The story has no dictation control. So a script makes the span the way each build's `insertInterimSpan` makes it.
- It types "Confirmed words " into the composer. Then it appends a span with `data-astryx-dictation-interim`, `contentEditable` false and that build's own inline style to the focused editable, and fires an input event.
- Then it sets the span's text to "words not yet confirmed", and a click at (5, 5) takes the focus away.
- Before, the inline style is `color: var(--color-text-disabled, #999); font-style: italic; opacity: 0.7; pointer-events: none`. After, it is `color: var(--color-text-secondary); font-style: italic; pointer-events: none`.
- Each still is taken when three shots in a row are identical. Every frame was looked at.

## Files

- `neutral-light-before.png`, `neutral-light-after.png`, `neutral-dark-before.png`, `neutral-dark-after.png`: the four stills.
- `measurements.json`: each still's sha256, the span's computed styles, the background, and the pixel readings.
