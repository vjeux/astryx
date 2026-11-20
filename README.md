# Input clear button: a 24 px target under a fine pointer

#12125 at 952aa599eb35d3784a63413115b48bd2841bf2f9 (head) against its merge base, 4b718430e39b8ff3de48c669c869538ed26b9ca0 (main). The hover check also shows the prior head, 8b0fe8bd8a2e56ee4ad1e2c31eae0a59ca322085. All results are from test runs.

## Builds

- Main: the hosted production deploy of 4b718430, checked by its version.json.
- Head: the hosted preview of 952aa599, checked by its version.json.
- 8b0fe8bd: a local static Storybook build, because its only preview failed to build. Its build stamp reads 8b0fe8bd.
- Positive control: main was also built locally the same way. Its frames equal the hosted main's, byte for byte, in 6 of 6 stories.
- 8b0fe8bd sits on an older main. So some of its frames differ from main in ways unrelated to this change, such as the label's weight. Only its computed colours are compared.

## (1) Hover on the clear glyph

| Story | Build | Glyph at rest | Glyph with the mouse on it | Theme's hover colour (`--color-accent`) | Glyph matches `:hover` | Element under the mouse |
| --- | --- | --- | --- | --- | --- | --- |
| DateInput, Themed Clear Icon | main | rgb(106, 106, 106) | rgb(27, 27, 27) (the hover colour) | rgb(27, 27, 27) | yes | the glyph (its path) |
| DateInput, Themed Clear Icon | 8b0fe8bd | rgb(106, 106, 106) | rgb(106, 106, 106) (still the rest colour) | rgb(27, 27, 27) | no | the button, not the glyph |
| DateInput, Themed Clear Icon | head | rgb(106, 106, 106) | rgb(27, 27, 27) (the hover colour) | rgb(27, 27, 27) | yes | the glyph (its path) |
| Selector, Themed Icons | main | rgb(106, 106, 106) | rgb(27, 27, 27) (the hover colour) | rgb(27, 27, 27) | yes | the glyph (its path) |
| Selector, Themed Icons | 8b0fe8bd | rgb(106, 106, 106) | rgb(106, 106, 106) (still the rest colour) | rgb(27, 27, 27) | no | the button, not the glyph |
| Selector, Themed Icons | head | rgb(106, 106, 106) | rgb(27, 27, 27) (the hover colour) | rgb(27, 27, 27) | yes | the glyph (its path) |

- Each theme sets the glyph to `--color-icon-secondary` at rest and `--color-accent` on hover.
- On main and on the head, the glyph takes the hover colour, and the element under the mouse is the glyph.
- On 8b0fe8bd, the glyph keeps its rest colour. The element under the mouse is the button: its 24 px target layer lies over the glyph, so the glyph is never hovered.

## (2) At rest

| Story | LTR, light | LTR, dark | RTL, light | RTL, dark |
| --- | --- | --- | --- | --- |
| TextInput, Clearable | identical | identical | identical | identical |
| NumberInput, Clearable | identical | identical | identical | identical |
| DateInput, Clearable | identical | identical | identical | identical |
| TimeInput, With Clear Button | identical | identical | identical | identical |
| DateTimeInput, With Clear Button | identical | identical | identical | identical |
| MultiSelector, Clearable | identical | identical | identical | identical |

24 of 24 frames are byte-identical to main.

## (3) The hit band

| Story | Pointer | Direction | Button | Hit band, main | Hit band, head |
| --- | --- | --- | --- | --- | --- |
| TextInput, Clearable | touch, 390 px | LTR | 20 × 20 px | 34 × 37 px, x 343 to 377, y 45 to 82 | the same |
| TextInput, Clearable | touch, 390 px | RTL | 20 × 20 px | 34 × 37 px, x 13 to 47, y 45 to 82 | the same |
| TextInput, Clearable | mouse, 1280 px | LTR | 20 × 20 px | 20.5 × 20.5 px, x 1234.5 to 1255, y 45.5 to 66 | 24.5 × 24 px, x 1234.5 to 1259, y 44 to 68 |
| TextInput, Clearable | mouse, 1280 px | RTL | 20 × 20 px | 20.5 × 20.5 px, x 24.5 to 45, y 45.5 to 66 | 24 × 24 px, x 21 to 45, y 44 to 68 |
| NumberInput, Clearable | touch, 390 px | LTR | 20 × 20 px | 34 × 37 px, x 343 to 377, y 45 to 82 | the same |
| NumberInput, Clearable | touch, 390 px | RTL | 20 × 20 px | 34 × 37 px, x 13 to 47, y 45 to 82 | the same |
| NumberInput, Clearable | mouse, 1280 px | LTR | 20 × 20 px | 20.5 × 20.5 px, x 1234.5 to 1255, y 45.5 to 66 | 24.5 × 24 px, x 1234.5 to 1259, y 44 to 68 |
| NumberInput, Clearable | mouse, 1280 px | RTL | 20 × 20 px | 20.5 × 20.5 px, x 24.5 to 45, y 45.5 to 66 | 24 × 24 px, x 21 to 45, y 44 to 68 |
| DateInput, Clearable | touch, 390 px | LTR | 20 × 20 px | 34 × 37 px, x 343 to 377, y 45 to 82 | the same |
| DateInput, Clearable | touch, 390 px | RTL | 20 × 20 px | 34 × 37 px, x 13 to 47, y 45 to 82 | the same |
| DateInput, Clearable | mouse, 1280 px | LTR | 20 × 20 px | 20.5 × 20.5 px, x 1234.5 to 1255, y 45.5 to 66 | 24.5 × 24 px, x 1234.5 to 1259, y 44 to 68 |
| DateInput, Clearable | mouse, 1280 px | RTL | 20 × 20 px | 20.5 × 20.5 px, x 24.5 to 45, y 45.5 to 66 | 24 × 24 px, x 21 to 45, y 44 to 68 |
| TimeInput, With Clear Button | touch, 390 px | LTR | 20 × 20 px | 34 × 37 px, x 343 to 377, y 45 to 82 | the same |
| TimeInput, With Clear Button | touch, 390 px | RTL | 20 × 20 px | 34 × 37 px, x 13 to 47, y 45 to 82 | the same |
| TimeInput, With Clear Button | mouse, 1280 px | LTR | 20 × 20 px | 20.5 × 20.5 px, x 1234.5 to 1255, y 45.5 to 66 | 24.5 × 24 px, x 1234.5 to 1259, y 44 to 68 |
| TimeInput, With Clear Button | mouse, 1280 px | RTL | 20 × 20 px | 20.5 × 20.5 px, x 24.5 to 45, y 45.5 to 66 | 24 × 24 px, x 21 to 45, y 44 to 68 |
| DateTimeInput, With Clear Button | touch, 390 px | LTR | 20 × 20 px | 34 × 34 px, x 343 to 377, y 45 to 79 | the same |
| DateTimeInput, With Clear Button | touch, 390 px | RTL | 20 × 20 px | 34 × 34 px, x 13 to 47, y 45 to 79 | the same |
| DateTimeInput, With Clear Button | mouse, 1280 px | LTR | 20 × 20 px | 20.5 × 20.5 px, x 606.5 to 627, y 45.5 to 66 | 24.5 × 24 px, x 606.5 to 631, y 44 to 68 |
| DateTimeInput, With Clear Button | mouse, 1280 px | RTL | 20 × 20 px | 20.5 × 20.5 px, x 652.5 to 673, y 45.5 to 66 | 24 × 24 px, x 649 to 673, y 44 to 68 |
| MultiSelector, Clearable | touch, 390 px | LTR | 20 × 20 px | 24 × 37 px, x 286 to 310, y 449 to 486 | the same |
| MultiSelector, Clearable | touch, 390 px | RTL | 20 × 20 px | 24 × 37 px, x 80 to 104, y 449 to 486 | the same |
| MultiSelector, Clearable | mouse, 1280 px | LTR | 20 × 20 px | 20.5 × 20.5 px, x 732.5 to 753, y 451.5 to 472 | 24.5 × 24 px, x 732.5 to 757, y 450 to 474 |
| MultiSelector, Clearable | mouse, 1280 px | RTL | 20 × 20 px | 20.5 × 20.5 px, x 526.5 to 547, y 451.5 to 472 | 24 × 24 px, x 523 to 547, y 450 to 474 |

- Under touch, the hit band is the same on both builds in all 12 cases. That band is Button's shared touch band, which this change does not touch.
- Under a mouse, main's band is the 20 px button. The head's band is 24 px: it grows 2 px up, 2 px down and 4 px toward the field's end. Its edge on the text side stays where it was, in LTR and in RTL.
- The sweep samples every 0.5 px, so each edge is known to within 0.5 px. Under a mouse, where a band's top or left edge is the button's own edge, the band starts 0.5 px before it.

## Method

- Desktop Chromium 149.0.7827.55 through Playwright, at device pixel ratio 2.
- Mouse: 1280 × 900 px. Touch: 390 × 900 px with `hasTouch` and `isMobile`, so `(pointer: coarse)` matches.
- (1) The mouse rests at the glyph's centre for 0.6 s. The glyph's computed colour is read before and after. The theme's two tokens are read by resolving `var(--color-accent)` and `var(--color-icon-secondary)` on an element in the same theme scope.
- (2) The story's content is captured with the mouse away from it. Light and dark use the Storybook `colorMode` global and `prefers-color-scheme`; RTL uses the `direction` global.
- (3) `elementFromPoint` is called every 0.5 px over the clear button's box and 40 px around it. The hit band is the box of the points that reach the button.
- Every frame was looked at.

## Frames

Contact sheets: [hover close-ups](sheets/hover-zoom.png), [hover](sheets/hover.png), [rest, LTR light](sheets/rest-ltr-light.png), [rest, LTR dark](sheets/rest-ltr-dark.png), [rest, RTL light](sheets/rest-rtl-light.png), [rest, RTL dark](sheets/rest-rtl-dark.png), [touch](sheets/touch.png), [touch with the hit band outlined](sheets/touch-band.png).

In [frames/](frames/), each name starts with the build (`main`, `prev` for 8b0fe8bd, or `head`):
- `-1-rest-`, `-1-hover-`, `-1-rest-zoom-` and `-1-hover-zoom-`: (1), with the mouse away and on the glyph;
- `-2-rest-<story>-<direction>-<scheme>`: (2);
- `-3-touch-<story>`: (3), at 390 px with touch, and `-3-touch-band-<story>` with the sweep's band outlined in magenta.

The raw readings are in [results.json](results.json).
