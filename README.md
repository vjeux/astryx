# Focus rings on cards and rows with a nested control

Measured on the Storybook of #8872 at 643c67815a89859f06c8f8733a5bd3c3bf53d308 and of main at 77a11ae0d2305c3f261190161248853f5741b52b. Each build was checked by its version.json. All results are from test runs.

## Method

- Desktop Chromium 149.0.7827.55 through Playwright, a 1000 × 700 viewport at device pixel ratio 2, with no touch.
- Light and dark use the Storybook `colorMode` global. Forced colours use Chromium's forced-colors media emulation (`forcedColors: 'active'`), with the light scheme; `matchMedia('(forced-colors: active)')` was true on every forced-colours page.
- (a) Tab once, onto the component's own control. (b) Tab again, onto the nested control. Item tabs a third time, onto the control in a row with no action of its own. (c) On a fresh load, click the nested control with the mouse.
- A ring is a computed outline (a style other than none and a width above zero) on a visible box. The table counts every ringed element and says whose it is: the control that has focus, or the card, row, token or thumbnail around it.
- (d) Contrast is sampled from the screenshot pixels. It compares the middle of the ring band with the pixel just outside the ring, on all four sides. The table gives the lowest side where the ring shows. The computed outline colour against the same outside pixel is in the results file as a cross-check.
- (e) A clipping ancestor of the nested control has an overflow other than visible, `contain: paint`, or a clip path. Each must hold the ring's outer box, rounded corners included. The ring must also show in the pixels on all four sides.
- Every frame was looked at.

## Results

| Build | Component | Scheme | (a) rings at its own control | (b) rings at the nested control | (c) rings after a pointer click on it | (d) ring contrast: own control / nested control (sampled; lowest side) | (e) the nested control's ring |
| --- | --- | --- | --- | --- | --- | --- | --- |
| main at 77a11ae0 | ClickableCard | light | 1 (card) | 2 (card + control) | 0 | 17.22:1 / 17.22:1 | not clipped |
| main at 77a11ae0 | ClickableCard | dark | 1 (card) | 2 (card + control) | 0 | 13.40:1 / 15.25:1 | not clipped |
| main at 77a11ae0 | ClickableCard | forced colours | 1 (card) | 2 (card + control) | 0 | 21.00:1 / 11.31:1 | not clipped |
| #8872 at 643c6781 | ClickableCard | light | 1 (card) | 1 (control) | 0 | 17.22:1 / 17.22:1 | not clipped |
| #8872 at 643c6781 | ClickableCard | dark | 1 (card) | 1 (control) | 0 | 13.40:1 / 15.25:1 | not clipped |
| #8872 at 643c6781 | ClickableCard | forced colours | 1 (card) | 1 (control) | 0 | 21.00:1 / 11.31:1 | not clipped |
| #8872 at 643c6781 | SelectableCard | light | 1 (card) | 1 (control) | 0 | 17.22:1 / 17.22:1 | not clipped |
| #8872 at 643c6781 | SelectableCard | dark | 1 (card) | 1 (control) | 0 | 13.40:1 / 15.25:1 | not clipped |
| #8872 at 643c6781 | SelectableCard | forced colours | 1 (card) | 1 (control) | 0 | 21.00:1 / 11.31:1 | not clipped |
| main at 77a11ae0 | Item | light | 1 (row) | 1 (control); plain row: 1 (control) | 0 | 17.22:1 / 17.22:1 / 17.22:1 | not clipped / plain row: not clipped |
| main at 77a11ae0 | Item | dark | 1 (row) | 1 (control); plain row: 1 (control) | 0 | 13.40:1 / 13.40:1 / 13.40:1 | not clipped / plain row: not clipped |
| main at 77a11ae0 | Item | forced colours | 1 (row) | 1 (control); plain row: 1 (control) | 0 | 21.00:1 / 11.31:1 / 11.31:1 | not clipped / plain row: not clipped |
| main at 77a11ae0 | Token | light | 1 (token) | 1 (control) | 0 | 17.22:1 / 15.11:1 | clipped by the Token's rounded overflow clip (7 of 8 ring points outside); no ring on the right and bottom sides |
| main at 77a11ae0 | Token | dark | 1 (token) | 1 (control) | 0 | 13.40:1 / 9.77:1 | clipped by the Token's rounded overflow clip (7 of 8 ring points outside); no ring on the right and bottom sides |
| main at 77a11ae0 | Token | forced colours | 1 (token) | 1 (control) | 0 | 21.00:1 / 11.31:1 | clipped by the Token's rounded overflow clip (7 of 8 ring points outside); no ring on the right and bottom sides |
| main at 77a11ae0 | Thumbnail | light | 1 (thumbnail) | 2 (thumbnail + control) | 0 | 17.22:1 / 1.13:1 | clipped by the Thumbnail's rounded overflow clip (3 of 8 ring points outside) |
| main at 77a11ae0 | Thumbnail | dark | 1 (thumbnail) | 2 (thumbnail + control) | 0 | 13.40:1 / 8.95:1 | clipped by the Thumbnail's rounded overflow clip (3 of 8 ring points outside) |
| main at 77a11ae0 | Thumbnail | forced colours | 1 (thumbnail) | 2 (thumbnail + control) | 0 | 21.00:1 / 1.23:1 | clipped by the Thumbnail's rounded overflow clip (3 of 8 ring points outside) |

## Notes

- #8872's ClickableCard and SelectableCard show one ring at each tab stop: the card for its own control, and only the control for the nested button. Main's ClickableCard shows two rings, the card's and the button's, when the button has focus. Main has no SelectableCard story with a nested control, so SelectableCard is measured on #8872 only.
- On main, Item shows one ring at each stop, as does Token, for its own button and for its remove button.
- On main, Thumbnail shows two rings when its remove button has focus: the thumbnail's and the button's. The remove button's ring sits over the image. In light and forced colours, its left and bottom sides measure under 3:1 against the image next to them. The image's container clips the ring at its top right. At the top, the remove button's ring meets the gap inside the thumbnail's ring. On the right, the container clips the button's ring, so the samples fall on that gap and on the thumbnail's ring.
- On main, Token's remove button ring is clipped by the token's rounded overflow clip. The ring does not show on its right and bottom sides.
- A pointer click never left a ring. The light-grey fill in (c) frames is the hover state under the mouse.

## Frames

Contact sheets: [main-clickablecard](sheets/main-clickablecard.png), [head-clickablecard](sheets/head-clickablecard.png), [head-selectablecard](sheets/head-selectablecard.png), [main-item](sheets/main-item.png), [main-token](sheets/main-token.png), [main-thumbnail](sheets/main-thumbnail.png). In file names, `head` is #8872 at 643c6781 and `main` is main at 77a11ae0.

- main at 77a11ae0, ClickableCard, light: [main-clickablecard-light-a-own-control](frames/main-clickablecard-light-a-own-control.png), [main-clickablecard-light-b-nested-control](frames/main-clickablecard-light-b-nested-control.png), [main-clickablecard-light-c-pointer-click](frames/main-clickablecard-light-c-pointer-click.png)
- main at 77a11ae0, ClickableCard, dark: [main-clickablecard-dark-a-own-control](frames/main-clickablecard-dark-a-own-control.png), [main-clickablecard-dark-b-nested-control](frames/main-clickablecard-dark-b-nested-control.png), [main-clickablecard-dark-c-pointer-click](frames/main-clickablecard-dark-c-pointer-click.png)
- main at 77a11ae0, ClickableCard, forced colours: [main-clickablecard-forced-a-own-control](frames/main-clickablecard-forced-a-own-control.png), [main-clickablecard-forced-b-nested-control](frames/main-clickablecard-forced-b-nested-control.png), [main-clickablecard-forced-c-pointer-click](frames/main-clickablecard-forced-c-pointer-click.png)
- #8872 at 643c6781, ClickableCard, light: [head-clickablecard-light-a-own-control](frames/head-clickablecard-light-a-own-control.png), [head-clickablecard-light-b-nested-control](frames/head-clickablecard-light-b-nested-control.png), [head-clickablecard-light-c-pointer-click](frames/head-clickablecard-light-c-pointer-click.png)
- #8872 at 643c6781, ClickableCard, dark: [head-clickablecard-dark-a-own-control](frames/head-clickablecard-dark-a-own-control.png), [head-clickablecard-dark-b-nested-control](frames/head-clickablecard-dark-b-nested-control.png), [head-clickablecard-dark-c-pointer-click](frames/head-clickablecard-dark-c-pointer-click.png)
- #8872 at 643c6781, ClickableCard, forced colours: [head-clickablecard-forced-a-own-control](frames/head-clickablecard-forced-a-own-control.png), [head-clickablecard-forced-b-nested-control](frames/head-clickablecard-forced-b-nested-control.png), [head-clickablecard-forced-c-pointer-click](frames/head-clickablecard-forced-c-pointer-click.png)
- #8872 at 643c6781, SelectableCard, light: [head-selectablecard-light-a-own-control](frames/head-selectablecard-light-a-own-control.png), [head-selectablecard-light-b-nested-control](frames/head-selectablecard-light-b-nested-control.png), [head-selectablecard-light-c-pointer-click](frames/head-selectablecard-light-c-pointer-click.png)
- #8872 at 643c6781, SelectableCard, dark: [head-selectablecard-dark-a-own-control](frames/head-selectablecard-dark-a-own-control.png), [head-selectablecard-dark-b-nested-control](frames/head-selectablecard-dark-b-nested-control.png), [head-selectablecard-dark-c-pointer-click](frames/head-selectablecard-dark-c-pointer-click.png)
- #8872 at 643c6781, SelectableCard, forced colours: [head-selectablecard-forced-a-own-control](frames/head-selectablecard-forced-a-own-control.png), [head-selectablecard-forced-b-nested-control](frames/head-selectablecard-forced-b-nested-control.png), [head-selectablecard-forced-c-pointer-click](frames/head-selectablecard-forced-c-pointer-click.png)
- main at 77a11ae0, Item, light: [main-item-light-a-own-control](frames/main-item-light-a-own-control.png), [main-item-light-b-nested-control](frames/main-item-light-b-nested-control.png), [main-item-light-b2-control-in-plain-row](frames/main-item-light-b2-control-in-plain-row.png), [main-item-light-c-pointer-click](frames/main-item-light-c-pointer-click.png)
- main at 77a11ae0, Item, dark: [main-item-dark-a-own-control](frames/main-item-dark-a-own-control.png), [main-item-dark-b-nested-control](frames/main-item-dark-b-nested-control.png), [main-item-dark-b2-control-in-plain-row](frames/main-item-dark-b2-control-in-plain-row.png), [main-item-dark-c-pointer-click](frames/main-item-dark-c-pointer-click.png)
- main at 77a11ae0, Item, forced colours: [main-item-forced-a-own-control](frames/main-item-forced-a-own-control.png), [main-item-forced-b-nested-control](frames/main-item-forced-b-nested-control.png), [main-item-forced-b2-control-in-plain-row](frames/main-item-forced-b2-control-in-plain-row.png), [main-item-forced-c-pointer-click](frames/main-item-forced-c-pointer-click.png)
- main at 77a11ae0, Token, light: [main-token-light-a-own-control](frames/main-token-light-a-own-control.png), [main-token-light-b-nested-control](frames/main-token-light-b-nested-control.png), [main-token-light-c-pointer-click](frames/main-token-light-c-pointer-click.png)
- main at 77a11ae0, Token, dark: [main-token-dark-a-own-control](frames/main-token-dark-a-own-control.png), [main-token-dark-b-nested-control](frames/main-token-dark-b-nested-control.png), [main-token-dark-c-pointer-click](frames/main-token-dark-c-pointer-click.png)
- main at 77a11ae0, Token, forced colours: [main-token-forced-a-own-control](frames/main-token-forced-a-own-control.png), [main-token-forced-b-nested-control](frames/main-token-forced-b-nested-control.png), [main-token-forced-c-pointer-click](frames/main-token-forced-c-pointer-click.png)
- main at 77a11ae0, Thumbnail, light: [main-thumbnail-light-a-own-control](frames/main-thumbnail-light-a-own-control.png), [main-thumbnail-light-b-nested-control](frames/main-thumbnail-light-b-nested-control.png), [main-thumbnail-light-c-pointer-click](frames/main-thumbnail-light-c-pointer-click.png)
- main at 77a11ae0, Thumbnail, dark: [main-thumbnail-dark-a-own-control](frames/main-thumbnail-dark-a-own-control.png), [main-thumbnail-dark-b-nested-control](frames/main-thumbnail-dark-b-nested-control.png), [main-thumbnail-dark-c-pointer-click](frames/main-thumbnail-dark-c-pointer-click.png)
- main at 77a11ae0, Thumbnail, forced colours: [main-thumbnail-forced-a-own-control](frames/main-thumbnail-forced-a-own-control.png), [main-thumbnail-forced-b-nested-control](frames/main-thumbnail-forced-b-nested-control.png), [main-thumbnail-forced-c-pointer-click](frames/main-thumbnail-forced-c-pointer-click.png)

The raw numbers for every ring, side and clipping ancestor are in [results.json](results.json).
