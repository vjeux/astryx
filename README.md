# Pagination dots: touch targets, focus ring and reduced motion

#12632 at abc8ca1c7be60709e5b3ef1c323357fd79c69c97 against its merge base, 47faabe747b155508152775a3175c3ecdc23c801. Each build's Storybook was checked by its version.json: the head's preview serves abc8ca1c, and the base's production deploy serves 47faabe7. All results are from test runs.

## Method

- Desktop Chromium 149.0.7827.55 through Playwright, at device pixel ratio 4. The story is Dots Variant: 8 pages, page 1 current, between a previous-page and a next-page arrow.
- Viewports: 1280 × 400 and 390 × 400 px with a mouse, and 390 × 400 px with touch emulation (`hasTouch` and `isMobile`, so `(pointer: coarse)` matches). Light and dark use the Storybook `colorMode` global and `prefers-color-scheme`.
- (1) The story's whole root, head against base, compared pixel for pixel.
- (2) Tab until a dot has focus. The previous-page arrow is the first stop, so page 1 has focus after the second Tab. ArrowRight then moves focus to page 2 and selects it. The ring is the set of pixels that change between the focused and the unfocused screenshot. It is read along 72 rays from the dot's centre, from its inner to its outer edge, so across the band's whole width.
- (2) For page 2, Tab then moves focus to the next-page arrow, with page 2 still selected. Shift+Tab brings focus back to page 2. Those two screenshots give page 2's ring and still.
- (3) At 390 px with touch emulation, each dot's hit area comes from three readings:
  - the `--astryx-hit-inset-*` values on the dot, with its `getBoundingClientRect`;
  - the computed insets of the dot's `::after` layer;
  - a debug outline drawn on that layer alone (1 px magenta, with `clip-path` off), found in the pixels.
- (3) Hit tests use `elementFromPoint` at 6 points per dot, at the head's coordinates on both builds. A click and a touch tap land 8 px above page 3, outside the dot and inside its head hit area.
- (4) Each page change runs with `prefers-reduced-motion: reduce` on both builds, and with no preference on head as the control. Page 2 is clicked from script after a click on the empty page, so nothing hovers or rings. The run records each dot's computed `transition-duration`. Then, on every animation frame for 500 ms, it records each dot's computed opacity and background colour. The outgoing dot is page 1, and the incoming dot is page 2.
- (4) The stills of each change slow CSS transitions 20 times, for the eye only. The frame numbers above come from the run at normal speed.
- Every frame was looked at.

## (1) At rest and (2) the focus ring

| Scheme | Viewport | (1) At rest: pixels that differ | (2) Page 1 ring, base / head | (2) Page 2 ring, base / head | (2) Focused crops |
| --- | --- | --- | --- | --- | --- |
| light | 1280 px, mouse | 0 of 1,310,720 | both 18 × 18 px, centre offset 0, 0; band 2.13–2.5 px | both 18 × 18 px, centre offset 0, 0; band 2.13–2.5 px | identical |
| light | 390 px, mouse | 0 of 399,360 | both 18 × 18 px, centre offset 0, 0; band 2.13–2.5 px | both 18 × 18 px, centre offset 0, 0; band 2.13–2.5 px | identical |
| light | 390 px, touch | 0 of 399,360 | both 18 × 18 px, centre offset 0, 0; band 2.13–2.5 px | both 18 × 18 px, centre offset 0, 0; band 2.13–2.5 px | identical |
| dark | 1280 px, mouse | 0 of 1,310,720 | both 18 × 18 px, centre offset 0, 0; band 2.13–2.5 px | both 18 × 18 px, centre offset 0, 0; band 2.13–2.5 px | identical |
| dark | 390 px, mouse | 0 of 399,360 | both 18 × 18 px, centre offset 0, 0; band 2.13–2.5 px | both 18 × 18 px, centre offset 0, 0; band 2.13–2.5 px | identical |
| dark | 390 px, touch | 0 of 399,360 | both 18 × 18 px, centre offset 0, 0; band 2.13–2.5 px | both 18 × 18 px, centre offset 0, 0; band 2.13–2.5 px | identical |

## (3) Touch hit areas, 390 px with touch emulation

| Scheme | Build | Hit area of each dot (three readings) | Growth beside each dot / half the gap | Clearance to the next hit area | Past the dots group (8 px tall) | Past the row with the arrows (32 px tall) | elementFromPoint, 1 px inside the hit area's top | Click 8 px above page 3 | Touch tap 8 px above page 3 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| light | head | 12 × 44 px for all 8; the three readings agree to 0.01 px | 2 / 2 px | 0 px (they meet; none overlaps) | 18 px above and 18 px below; 2 px left and 2 px right | 6 px above and 6 px below; none sideways | the dot, 8 of 8 | selects page 3 | selects page 3 |
| light | base | no hit layer: no inset values and no ::after on any dot; the target is the 8 × 8 px dot | – | – | – | – | 0 of 8 the dot; otherwise the div | page 1 stays selected | selects page 3 |
| dark | head | 12 × 44 px for all 8; the three readings agree to 0.01 px | 2 / 2 px | 0 px (they meet; none overlaps) | 18 px above and 18 px below; 2 px left and 2 px right | 6 px above and 6 px below; none sideways | the dot, 8 of 8 | selects page 3 | selects page 3 |
| dark | base | no hit layer: no inset values and no ::after on any dot; the target is the 8 × 8 px dot | – | – | – | – | 0 of 8 the dot; otherwise the div | page 1 stays selected | selects page 3 |

- Every hit area is at most 44 px each way: 12 px wide and 44 px tall.
- Each side grows at most half the gap to its neighbour: 2 px of each 4 px gap.
- Neighbouring hit areas meet and none overlaps. That includes page 8's and the next-page arrow's own hit area.
- Each hit area is 44 px tall. So it reaches past the 8 px dots group and the 32 px row with the arrows, above and below. The next-page arrow's hit area does the same on both builds. Every hit area stays inside the story's root.

## (4) A page change

| Scheme | Build | Motion preference | transition-duration (page 1 / page 2) | Frames between the old and new colour (outgoing / incoming) | First frame at the final colour (outgoing / incoming) | Opacity on every frame |
| --- | --- | --- | --- | --- | --- | --- |
| light | head | reduce | 0s / 0s | 0 / 0 | 16.7 / 16.7 ms after the click | 1 |
| light | base | reduce | 0.125s / 0.125s | 6 / 7 | 116.6 / 133.4 ms after the click | 1 |
| light | head | no-preference | 0.125s / 0.125s | 6 / 7 | 116.7 / 133.4 ms after the click | 1 |
| dark | head | reduce | 0s / 0s | 0 / 0 | 16.6 / 16.6 ms after the click | 1 |
| dark | base | reduce | 0.125s / 0.125s | 5 / 7 | 99.9 / 133.4 ms after the click | 1 |
| dark | head | no-preference | 0.125s / 0.125s | 5 / 7 | 99.9 / 133.3 ms after the click | 1 |

The dots fade through the alpha of their background colour, not opacity. Without the reduced-motion preference, the incoming dot's alpha in light runs 0.506 → 0.773 → 0.906 → 0.97 → 0.992 → 1 → 1 on successive frames. The last two round to 1. With it, the head's dots change colour on the first frame that paints after the click.

## Notes

- After this base, main changed Pagination in #12253, #12380 and #12824 (a test). Neither build includes them, so this comparison is the head against its own base.
- A touch tap 8 px above page 3 selects page 3 on both builds, because Chromium moves a tap onto a nearby target. A click at that exact point selects page 3 on the head only.
- At page 1, the previous-page arrow takes focus but has no hit insets on either build.

## Frames

Contact sheets: [rest](sheets/rest.png), [focus](sheets/focus.png), [hit areas](sheets/hit-areas.png), [page change, light](sheets/page-change-light.png), [page change, dark](sheets/page-change-dark.png).

In [frames/](frames/), each name starts with the build (`head` is #12632, `base` its merge base) and the scheme. The rest of the name gives:
- `-1-rest`: at rest, per viewport;
- `-2-focus-page-1` and `-2-focus-page-2`: focused, per viewport, the ring at 4×;
- `-3-hit-areas`: each layer outlined in alternating colours, the dots group in dashed green and the row in dashed orange;
- `-4-change-NN`: the page change at 1/20 speed. The first still is before the click. The others are 10, 40, 75, 115 and 200 ms into the change at normal speed.

The raw numbers are in [results.json](results.json).
