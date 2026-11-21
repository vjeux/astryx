# ProgressBar at 1ce9a1fb: the bar follows its own direction, and a variant that a theme adds keeps its fill

Head: #13307 at 1ce9a1fb8540cddc2ee727a012dc442c5e7a2146, `head` in file names. Base: 86857ba38eaa1e683c00cd8cca6624a5f3761c7f, the head's merge base on main, `base` in file names. All numbers are test measurements.

## Answer (test)

- (a) Seven stock stories at 1280 and 390 px, light and dark, LTR and RTL: all 56 frames are byte-identical between head and base.
- (b) The mixed case is an LTR bar inside an RTL region, as the audit spec builds it.
- On the base, its indeterminate fill takes the RTL slide and moves right to left, in 23 of 23 steps.
- So on the base, the fill covers only 0 to 998.38 px of the 1248 px track. The track is empty in 11 of 24 samples.
- On the head, the same bar takes the LTR slide and moves left to right in 23 of 23 steps, like its label. It covers the whole track.
- The scratch story, the same story on an RTL page, and the spec's own wrap give the same readings on each build.
- The target mark in that region is a 2 px tick. On the base, its centring translate is +1 px instead of −1 px.
- So on the base, the tick's centre sits 1.99 px past its value. On the head, it sits within 0.01 px of it, as on an LTR page.
- (c) Under reduced motion, the indeterminate fill pulses in place on LTR, RTL and mixed, on both builds.
- It spans the whole track in 24 of 24 samples. Its opacity moves between 0.84 and 1, and its box does not move.
- (d) A variant that no built-in style knows ("brand"): on the base, the fill and the mark on it are transparent. The fill against the track is 1:1.
- On the head, the fill takes the accent colour, and the mark takes the on-accent colour, as the accent variant does.
- The head's fill against the track is 11.62:1 in light mode and 6.92:1 in dark mode. Its mark against the fill is 17.22:1 and 16.72:1.
- The spec's own args on With Target Mark, `variant: 'brand'` with a "Start" mark at 20, give the same colours on the hosted builds.

## What changed

- The slide's mirror and the mark's centring translate use `:dir(rtl)` instead of `:is([dir="rtl"] *)`. So both follow the bar's own direction.
- A variant with no built-in style paints the accent fill and the accent's mark colour.
- `{...rest}` now comes before the root's own attributes. So a caller's `data-variant` no longer replaces the variant that themes match on. This take does not measure that.

## Builds

- Head: the preview deploy of 1ce9a1fb, by its version.json (environment "preview").
- Base: the Production deploy of 86857ba3, by its version.json (environment "production").
- Local builds of both commits add one scratch story, in neither tree: `ZZ/ProgressBarMixed`. measurements.json lists its four stories.
- The scratch story renders `<div dir="rtl"><ProgressBar dir="ltr" … /></div>`, and a bar with `variant="brand"` and a mark at 20.
- Local and hosted builds give byte-identical frames in 6 of 6 checks on stock stories:

| Story | Direction | Build | Local against hosted |
| --- | --- | --- | --- |
| core-progressbar--with-target-mark | ltr | head | byte-identical |
| core-progressbar--with-target-mark | ltr | base | byte-identical |
| core-progressbar--indeterminate | rtl | head | byte-identical |
| core-progressbar--indeterminate | rtl | base | byte-identical |
| core-progressbar--variants | ltr | head | byte-identical |
| core-progressbar--variants | ltr | base | byte-identical |

- The version.json files and the pull request's head were the same at the start and the end of the runs.

## (a) Stock stories, head against base (test)

| Story | Frames | Byte-identical, head against base |
| --- | --- | --- |
| core-progressbar--default | 8 | 8 of 8 |
| core-progressbar--variants | 8 | 8 of 8 |
| core-progressbar--disabled | 8 | 8 of 8 |
| core-progressbar--with-target-mark | 8 | 8 of 8 |
| core-progressbar--with-multiple-marks | 8 | 8 of 8 |
| core-progressbar--indeterminate | 8 | 8 of 8 |
| core-progressbar--indeterminate-variants | 8 | 8 of 8 |

- Each story has 8 frames: 1280 × 800 and 390 × 844 px, light and dark, LTR and RTL.
- Infinite animations are held at their start for these frames. The frames are not published, since they are identical. measurements.json holds their sha256 values.

## (b) The mixed case, frame by frame (test)

| Case | Build | Served | Keyframe | Steps right / left / still | Track covered, px | Samples with no fill on the track |
| --- | --- | --- | --- | --- | --- | --- |
| ltr | base | hosted | the LTR slide | 23 / 0 / 0 | 0–1248 of 1248 | 1 of 24 |
| rtl | base | hosted | the RTL slide | 0 / 23 / 0 | 0–1248 of 1248 | 1 of 24 |
| mixed, the audit spec's wrap | base | hosted | the RTL slide | 0 / 23 / 0 | 0–998.38 of 1248 | 11 of 24 |
| ltr | base | local | the LTR slide | 23 / 0 / 0 | 0–1248 of 1248 | 1 of 24 |
| rtl | base | local | the RTL slide | 0 / 23 / 0 | 0–1248 of 1248 | 1 of 24 |
| mixed, scratch story | base | local | the RTL slide | 0 / 23 / 0 | 0–998.38 of 1248 | 11 of 24 |
| mixed, scratch story on an RTL page | base | local | the RTL slide | 0 / 23 / 0 | 0–998.38 of 1248 | 11 of 24 |
| ltr | head | hosted | the LTR slide | 23 / 0 / 0 | 0–1248 of 1248 | 1 of 24 |
| rtl | head | hosted | the RTL slide | 0 / 23 / 0 | 0–1248 of 1248 | 1 of 24 |
| mixed, the audit spec's wrap | head | hosted | the LTR slide | 23 / 0 / 0 | 0–1248 of 1248 | 1 of 24 |
| ltr | head | local | the LTR slide | 23 / 0 / 0 | 0–1248 of 1248 | 1 of 24 |
| rtl | head | local | the RTL slide | 0 / 23 / 0 | 0–1248 of 1248 | 1 of 24 |
| mixed, scratch story | head | local | the LTR slide | 23 / 0 / 0 | 0–1248 of 1248 | 1 of 24 |
| mixed, scratch story on an RTL page | head | local | the LTR slide | 23 / 0 / 0 | 0–1248 of 1248 | 1 of 24 |

- The fill is sampled at 24 even points of one 1500 ms iteration, with its animation paused at each point.
- A step is the fill centre's change between neighbouring samples. A change of 0.5 px or more counts as a move.
- "The audit spec's wrap" is the spec's own method on the hosted builds: the bar's root moves into a dir=rtl element, with dir=ltr on it.

## (b) The target mark (test)

| Case | Build | Served | Tick width, px | Translate x, px | Centre against its value, px | From pixels, px |
| --- | --- | --- | --- | --- | --- | --- |
| ltr | base | hosted | 2 | -1 | -0.01 | -0.4 |
| rtl | base | hosted | 2 | 1 | 0.01 | 0.4 |
| mixed, the audit spec's wrap | base | hosted | 2 | 1 | 1.99 | 1.6 |
| ltr | base | local | 2 | -1 | -0.01 | -0.4 |
| mixed, scratch story | base | local | 2 | 1 | 1.99 | 1.6 |
| mixed, scratch story on an RTL page | base | local | 2 | 1 | 1.99 | 1.6 |
| ltr | head | hosted | 2 | -1 | -0.01 | -0.4 |
| rtl | head | hosted | 2 | 1 | 0.01 | 0.4 |
| mixed, the audit spec's wrap | head | hosted | 2 | -1 | -0.01 | -0.4 |
| ltr | head | local | 2 | -1 | -0.01 | -0.4 |
| mixed, scratch story | head | local | 2 | -1 | -0.01 | -0.4 |
| mixed, scratch story on an RTL page | head | local | 2 | -1 | -0.01 | -0.4 |

- The bar is With Target Mark's: value 45, with a "Goal" mark at 80. The centre is the tick's box centre against 80% of the track.
- "From pixels" reads the tick's ink on the track's middle row, at scale 2. It rounds to the device pixel.

## (c) Reduced motion (test)

| Case | Build | Served | Keyframe | Fill left, px | Fill width, px, of the track | Opacity |
| --- | --- | --- | --- | --- | --- | --- |
| ltr | base | hosted | the pulse | 0 | 1248 of 1248 | 0.84–1 |
| rtl | base | hosted | the pulse | 0 | 1248 of 1248 | 0.84–1 |
| mixed, the audit spec's wrap | base | hosted | the pulse | 0 | 1248 of 1248 | 0.84–1 |
| ltr | base | local | the pulse | 0 | 1248 of 1248 | 0.84–1 |
| rtl | base | local | the pulse | 0 | 1248 of 1248 | 0.84–1 |
| mixed, scratch story | base | local | the pulse | 0 | 1248 of 1248 | 0.84–1 |
| mixed, scratch story on an RTL page | base | local | the pulse | 0 | 1248 of 1248 | 0.84–1 |
| ltr | head | hosted | the pulse | 0 | 1248 of 1248 | 0.84–1 |
| rtl | head | hosted | the pulse | 0 | 1248 of 1248 | 0.84–1 |
| mixed, the audit spec's wrap | head | hosted | the pulse | 0 | 1248 of 1248 | 0.84–1 |
| ltr | head | local | the pulse | 0 | 1248 of 1248 | 0.84–1 |
| rtl | head | local | the pulse | 0 | 1248 of 1248 | 0.84–1 |
| mixed, scratch story | head | local | the pulse | 0 | 1248 of 1248 | 0.84–1 |
| mixed, scratch story on an RTL page | head | local | the pulse | 0 | 1248 of 1248 | 0.84–1 |

- The pulse's iteration is 2000 ms, sampled at 24 even points, as in (b).

## (d) A variant that no built-in style knows (test)

| Case | Mode | Build | Served | Fill | Mark on the fill | Track | Fill against track | Mark against fill |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| theme-added variant, scratch story | light | base | local | rgba(0, 0, 0, 0) | rgba(0, 0, 0, 0) | rgb(212, 212, 212) | 1:1 | 1:1 |
| accent, scratch story | light | base | local | rgb(27, 27, 27) | rgb(255, 255, 255) | rgb(212, 212, 212) | 11.62:1 | 17.22:1 |
| theme-added variant, the audit spec's args | light | base | hosted | rgba(0, 0, 0, 0) | rgba(0, 0, 0, 0) | rgb(212, 212, 212) | 1:1 | 1:1 |
| theme-added variant, scratch story | dark | base | local | rgba(0, 0, 0, 0) | rgba(0, 0, 0, 0) | rgb(82, 82, 82) | 1:1 | 1:1 |
| accent, scratch story | dark | base | local | rgb(241, 241, 241) | rgb(17, 17, 17) | rgb(82, 82, 82) | 6.92:1 | 16.72:1 |
| theme-added variant, the audit spec's args | dark | base | hosted | rgba(0, 0, 0, 0) | rgba(0, 0, 0, 0) | rgb(82, 82, 82) | 1:1 | 1:1 |
| theme-added variant, scratch story | light | head | local | rgb(27, 27, 27) | rgb(255, 255, 255) | rgb(212, 212, 212) | 11.62:1 | 17.22:1 |
| accent, scratch story | light | head | local | rgb(27, 27, 27) | rgb(255, 255, 255) | rgb(212, 212, 212) | 11.62:1 | 17.22:1 |
| theme-added variant, the audit spec's args | light | head | hosted | rgb(27, 27, 27) | rgb(255, 255, 255) | rgb(212, 212, 212) | 11.62:1 | 17.22:1 |
| theme-added variant, scratch story | dark | head | local | rgb(241, 241, 241) | rgb(17, 17, 17) | rgb(82, 82, 82) | 6.92:1 | 16.72:1 |
| accent, scratch story | dark | head | local | rgb(241, 241, 241) | rgb(17, 17, 17) | rgb(82, 82, 82) | 6.92:1 | 16.72:1 |
| theme-added variant, the audit spec's args | dark | head | hosted | rgb(241, 241, 241) | rgb(17, 17, 17) | rgb(82, 82, 82) | 6.92:1 | 16.72:1 |

- The bar has value 45 and a "Start" mark at 20, so the mark sits on the fill.
- The contrast ratios use the most frequent pixel colour on the track's middle row, inside the fill and on the bare track.

## Method

- Chromium 149.0.7827.55 through Playwright, at scale 2, 1280 × 800 px unless a table names another size.
- Light and dark come from the Storybook `colorMode` global, and direction from the `direction` global.
- Reduced motion is Playwright's emulation of `prefers-reduced-motion: reduce`.
- The local builds ran under the lowest scheduling priority.
- Every frame was looked at. All numbers are test measurements from one machine.

## Files

- `b-ltr--head.png`, `b-rtl--head.png`: the LTR and RTL references, four frames each, at 20, 40, 60 and 80% of the iteration.
- `b-mixed-scratch--<build>-local.png` and `b-mixed-spec-wrap--<build>.png`: the mixed case, the same four frames.
- `c-…`: the same frames under reduced motion.
- `b-mark-…`: the tick and 24 px of track on each side.
- `d-theme-added-variant-scratch--<mode>--<build>-local.png` and `d-accent-scratch--<mode>--head-local.png`: the bar with each variant.
- `measurements.json`: every reading, the summaries and the run's start and end lines.
