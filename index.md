# MediaPlayer: a marker popover's first touch open, base and head (re-take)

Base: main c1c5cdf03eef3ab9bbd87db0f687fd5f0585d154. Head: #12989 at 5366392ac97b6c457c5195f19e05b5d53c7cc84d, `pr` in file names. The earlier run, at de45e67e: [index](https://github.com/vjeux/astryx/blob/2389fc572ed3861178f7decb1d3ddbb8835e9490/index.md).

## Answer

- Yes. On a phone tap, the head's cold first open now grows out of the marker, as on main. Both builds start the same entrance, from the same origin, on the first, second and throttled opens.
- No flash on either build: no frame paints the popover at full size, or away from the marker, before its entrance.
- Idle, open at rest and a second open at rest are byte-identical between main and the head.
- The head paints its first open later than main. The tap first loads the chunk, and the popover opens 70–107 ms after the chunk arrives. The timing section has the numbers.

## Builds

- Main: the production deploy of c1c5cdf03e, the head's merge base, by its version.json.
- Head: the preview deploy of 5366392ac9, by its version.json. This deploy succeeded, so no local build was used.

## Method

- The same harness and method as the earlier run: story `lab-mediaplayer--comment-markers`, the first marker (0.8 s), Chromium (Playwright 1.61.1).
- Phone only: 390×844, touch, scale 2, light. The same frame-only style, local clip with byte ranges, and playback start through the large play control.
- Cold first open: each run is a fresh browser context, then a tap on the marker. 5 runs; then a second open in the same page.
- Throttled: CDP request interception holds the popover chunk (`MediaMarkerPopover-*.js`) for 400 ms. 3 runs.
- A probe reads every animation frame: the dialog's computed `scale`, `opacity`, `transform-origin` and rect, and its running animations.
- The origin in page coordinates is the rect edge plus scale times the local origin. A second check fits the fixed point from each scaled rect against the resting rect.
- A CDP screencast records run 0 of each case through the close. Its last frame (the video at the marker, no popover) is the reference for the pixel counts.
- Popover pixels: pixels that differ from the reference inside the popover's resting box (pixelmatch, threshold 0.1). Pixels that the seek alone changes are left out.
- All numbers are test measurements: hosted builds over this machine's network, one machine, not field data.

## Entrance

| Measure | Main | Head |
| --- | --- | --- |
| Animated element | the dialog, through CSS `scale` and `opacity` | same |
| Entrance animations | 2: scale (38 keyframes) and opacity (18 keyframes), one timing | the same, keyframe for keyframe |
| First keyframe | scale 0.01 0.00893 (3.6×1.0 px), opacity 0.001 | same |
| `transform-origin` | 109.938px 112px | same |
| Origin x − marker dot centre x | 0.04 px | same |
| Origin y − popover bottom edge | -0.01 px | same |
| Fitted fixed point x − dot centre x | -0.12–0.12 px over both runs | same |
| Resting popover | 358×112 px at (16, 357.7) | same |

This holds on every cold, throttled and second open, in every run of both builds.

### Frame by frame (run 0, from the first read with the entrance running)

| Frame | Main, cold: ms after tap · scale · opacity · size | Head, cold | Main, throttled | Head, throttled |
| --- | --- | --- | --- | --- |
| 1 | 50.7 · 0.01 0.00893 · 0.001 · 3.6×1 | 141.8 · 0.01 0.00893 · 0.001 · 3.6×1 | 40.4 · 0.01 0.00893 · 0.001 · 3.6×1 | 557.5 · 0.01 0.00893 · 0.001 · 3.6×1 |
| 2 | 66.1 · 0.249952 0.229776 · 0.242 · 89.5×25.7 | 149.1 · 0.0784838 0.0706798 · 0.068 · 28.1×7.9 | 49.7 · 0.148059 0.134437 · 0.139 · 53×15.1 | 564.9 · 0.0676705 0.0609299 · 0.058 · 24.2×6.8 |
| 3 | 82.6 · 0.485582 0.458616 · 0.48 · 173.8×51.4 | 163.1 · 0.347898 0.323366 · 0.34 · 124.5×36.2 | 65.9 · 0.404654 0.378602 · 0.399 · 144.9×42.4 | 578.5 · 0.340615 0.31632 · 0.332 · 121.9×35.4 |
| 4 | 99.2 · 0.663759 0.639629 · 0.66 · 237.6×71.6 | 179.9 · 0.561945 0.535347 · 0.556 · 201.2×60 | 82.5 · 0.604422 0.578579 · 0.6 · 216.4×64.8 | 595.3 · 0.556539 0.529855 · 0.55 · 199.2×59.3 |
| 5 | 116 · 0.787591 0.769486 · 0.785 · 282×86.2 | 196.5 · 0.717867 0.695971 · 0.714 · 257×77.9 | 99.3 · 0.747428 0.727018 · 0.744 · 267.6×81.4 | 612.1 · 0.713272 0.691156 · 0.709 · 255.4×77.4 |
| 6 | 132.6 · 0.870296 0.858081 · 0.869 · 311.6×96.1 | 213.1 · 0.82438 0.808722 · 0.822 · 295.1×90.6 | 115.8 · 0.84349 0.829209 · 0.841 · 302×92.9 | 628.8 · 0.821277 0.805403 · 0.819 · 294×90.2 |

The head's rows start later because its popover opens later. Every open, on both builds, runs the same two animations keyframe for keyframe; the rows sample that one curve at different moments.

## No flash

- Main, cold: the first frame that paints the popover is at 70 ms, with 547 popover pixels of the 32105 at rest. The 1 frame between the tap and it has 0 popover pixels.
- Head, cold: the first frame that paints the popover is at 168 ms, with 2829 popover pixels of the 32105 at rest. The 4 frames between the tap and it have 0 to 5 popover pixels; the largest matches the first keyframe's 3.6×1 px size.
- Main, throttled: the first frame that paints the popover is at 54 ms, with 217 popover pixels of the 32105 at rest. The 1 frame between the tap and it has 0 popover pixels.
- Head, throttled: the first frame that paints the popover is at 583 ms, with 2637 popover pixels of the 32105 at rest. The 4 frames between the tap and it have 0 to 5 popover pixels; the largest matches the first keyframe's 3.6×1 px size.
- The probe also reads the dialog once, after it mounts and before its entrance starts, at full size and opacity 1. No recorded frame paints that read, on either build.

## Timing

Tap (`pointerdown`) to the first painted popover frame. Median (range).

| Case | Main | Head |
| --- | --- | --- |
| Cold first open, this run (5 runs) | 64.9 ms (48.1–66.1) | 161 ms (146–212.5) |
| Cold first open, an earlier run (5 runs) | 48.7 ms (48.6–49) | 146.5 ms (129.8–147.4) |
| Second open (5 runs) | 33 ms (32.5–33.2) | 33 ms (32.9–33.2) |
| Throttled first open, this run (3 runs) | 49.7 ms (48.1–65) | 562.1 ms (546.1–564.9) |
| Throttled first open, an earlier run (3 runs) | 48.8 ms (48.7–49.2) | 545.9 ms (530.6–563.4) |

The machine's load average was about 70 on 166 cores in this run, and about 38 in the earlier one.

Where the head's time goes, in this run:

- Cold: the chunk request starts 0.3–1 ms before the tap's `pointerdown` and ends 49.6 ms (48.6–69.5) after it.
- Cold: the popover opens (`aria-expanded` "true") 120.9–176.8 ms after the tap, 72.3–107.3 ms after the chunk arrives. Main opens 25.7–31.5 ms after the tap.
- From the open to the first painted frame: main 22.4–37 ms, the head 24.2–35.7 ms.
- Throttled: the chunk is held 400 ms. It arrives 460.1 ms (451.9–463.8) after the tap, and the popover opens 70.2–76.2 ms after that.
- In every case the press seeks at once: the video is at the marker 10.7–12.9 ms after the tap on the head. Until the popover opens, the frames show the thumb at the marker and no popover.

## Spot checks

| State | Differing pixels | Byte-identical |
| --- | --- | --- |
| Idle | 0 | yes |
| Open at rest (first open) | 0 | yes |
| Second open at rest | 0 | yes |

Open at rest, both builds: above the marker, gap 13 px, 358 px wide, 16 px from each viewport edge.

## Files

- `<case>--<build>--<role>--<time>ms.png`: screencast frames of run 0. The case is `cold` or `throttled`, the build `main` or `pr`, and the time is from the tap (`m` = before it).
- Roles: `before`, `after-tap`, `gap` (the head: the last frame with no popover), `speck` (a frame with under 30 popover pixels), `first-popover`, `entrance-2` to `entrance-4`, and `settled`.
- `phone-light--<state>--main.png`, `--pr.png` and `--diff.png`: the spot checks, at scale 2.
- `measurements.json`: the values behind these tables.
