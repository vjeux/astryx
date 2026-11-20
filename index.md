# MediaPlayer: a marker popover at #12989 fecbe27a, against main

Base: main ecfdfc3543896736b42ff664b41970dd98503cac. Head: #12989 at fecbe27a8811d819fc3c91f293c9ea58e0633cf5, `pr` in file names. The head's merge base is this main. The earlier re-take, at 5366392a: [index](https://github.com/vjeux/astryx/blob/b93856f45b5df428681298d01ccd768faf5017c9/index.md).

## Answer

- Cold first open on a phone tap: the head paints 163.7 ms after the tap, and main 48.5 ms (medians). The head's popover opens (`aria-expanded` "true") at 139 ms, and main's at 20 ms.
- With the chunk held 400 ms, the head paints at 563.7 ms and opens at 537.1 ms. Main loads no chunk: 48.6 ms and 19.1 ms.
- The entrance still grows out of the marker on both builds. Every open runs one entrance, keyframe for keyframe.
- Identity: 12 pairs have 0 pixels over pixelmatch's threshold of 0.1; 11 are byte-identical. They cover 390 and 1280, light and dark: idle, open at rest, and a second open at rest. In the other pair, 2 pixels differ by at most 14/255, and two captures of one main build differ there too.

## Builds

- Main: the production deploy of ecfdfc3543, by its version.json. It includes #13016 (the compact control bar) and #13035.
- Head: the preview deploy of fecbe27a88, by its version.json. No local build was used.

## Method

- The same harness and method as the re-take: story `lab-mediaplayer--comment-markers`, the first marker (0.8 s), Chromium (Playwright 1.61.1, Chrome for Testing 149.0.7827.55).
- Phone: 390×844, touch, scale 2. Desktop: 1280×800, mouse, scale 1. The same frame-only style on the phone, local clip with byte ranges, and playback start through the large play control.
- Timing, phone, light: each run is a fresh browser context, then a tap on the marker. 5 cold runs, then a second open in the same page; 3 runs with the chunk held 400 ms.
- A probe reads every animation frame: the dialog's computed `scale`, `opacity`, `transform-origin`, rect and `aria-expanded`. First paint is the first read with the entrance running; a read before the entrance starts is dropped.
- A CDP screencast records run 0 of each case through the close. Popover pixels are counted against its last frame, leaving out the pixels the seek alone changes.
- Identity: on desktop the pointer moves off the marker after the click, so no hover preview is in the open frames.
- Pixel counts use pixelmatch at threshold 0.1: a pixel counts when its YIQ colour distance is over 0.1 of the black-to-white distance. Pixelmatch leaves out pixels it finds to be anti-aliasing; counting those too changes no count here.
- All numbers are test measurements: hosted builds over this machine's network, one machine. Box load average (1 min): about 37 during the identity captures and 37 falling to 16 during the timing runs, on 166 cores.

## Timing (phone tap, light)

Median (range), in ms after the tap.

| Case | Main: first paint | Head: first paint | Main: `aria-expanded` "true" | Head: `aria-expanded` "true" |
| --- | --- | --- | --- | --- |
| Cold first open (5 runs) | 48.5 ms (48.4–49.1) | 163.7 ms (163.5–163.9) | 20 ms (19.2–21.8) | 139 ms (133.4–143.2) |
| Second open (5 runs) | 33.5 ms (33–33.6) | 33.2 ms (33–33.4) | 16.3 ms (16–16.4) | 16.1 ms (15.7–16.3) |
| Chunk held 400 ms, first open (3 runs) | 48.6 ms (48.4–49.3) | 563.7 ms (563.4–580.7) | 19.1 ms (18.8–19.7) | 537.1 ms (536.7–559.8) |

Where the head's time goes:

- Cold: the chunk request starts 0–0.4 ms before the tap's `pointerdown` and ends 82.7 ms (79.2–89.9) after it. The popover opens 53.3–56.3 ms after the chunk arrives.
- Throttled: the chunk is held 400 ms. It arrives 482.8 ms (479.6–505.8) after the tap, and the popover opens 54–57.1 ms after that.
- From the open to the first painted frame: main 27.3–29.2 ms, the head 20.7–30.2 ms (cold).
- In the re-take at 5366392a, the popover opened 72.3–107.3 ms (cold) and 70.2–76.2 ms (throttled) after the chunk arrived; here, 53.3–56.3 and 54–57.1 ms. These are two separate test runs, with different network times.

## Entrance

| Measure | Main | Head |
| --- | --- | --- |
| Animated element | the dialog, through CSS `scale` and `opacity` | same |
| First keyframe | scale 0.01 0.00893 (3.6×1.0 px), opacity 0.001 | same |
| `transform-origin` | 100.359px 112px | same |
| Origin x − marker dot centre x | -0.04 px | same |
| Origin y − popover bottom edge | -0.01 px | same |
| Fitted fixed point x − dot centre x | -0.11–0.12 px | same |
| Resting popover | 358×112 px at (16, 365.7) | same |

This holds on every cold, throttled and second open, in every run of both builds.

### Frame by frame (run 0, from the first read with the entrance running)

| Frame | Main, cold: ms after tap · scale · opacity · size | Head, cold | Main, throttled | Head, throttled |
| --- | --- | --- | --- | --- |
| 1 | 35.6 · 0.01 0.00893 · 0.001 · 3.6×1 | 155.6 · 0.01 0.00893 · 0.001 · 3.6×1 | 32.7 · 0.01 0.00893 · 0.001 · 3.6×1 | 572.8 · 0.01 0.00893 · 0.001 · 3.6×1 |
| 2 | 49.1 · 0.226122 0.20723 · 0.217 · 81×23.2 | 163.9 · 0.144587 0.131253 · 0.136 · 51.8×14.7 | 49.3 · 0.280137 0.258333 · 0.273 · 100.3×28.9 | 580.7 · 0.141116 0.128069 · 0.132 · 50.5×14.3 |
| 3 | 65.7 · 0.468034 0.441145 · 0.461 · 167.6×49.4 | 180.5 · 0.403314 0.377284 · 0.397 · 144.4×42.3 | 65.9 · 0.509086 0.482062 · 0.504 · 182.3×54 | 597.4 · 0.399203 0.373255 · 0.393 · 142.9×41.8 |
| 4 | 82.3 · 0.650926 0.626367 · 0.646 · 233×70.2 | 197.3 · 0.602427 0.576534 · 0.598 · 215.7×64.6 | 82.5 · 0.680413 0.656901 · 0.677 · 243.6×73.6 | 614.1 · 0.600431 0.57449 · 0.596 · 215×64.3 |
| 5 | 99 · 0.778737 0.760106 · 0.776 · 278.8×85.1 | 213.9 · 0.746035 0.725549 · 0.743 · 267.1×81.3 | 99.2 · 0.798695 0.781304 · 0.796 · 285.9×87.5 | 630.8 · 0.743945 0.723345 · 0.741 · 266.3×81 |
| 6 | 115.6 · 0.864527 0.851857 · 0.863 · 309.5×95.4 | 230.5 · 0.843023 0.828708 · 0.841 · 301.8×92.8 | 115.8 · 0.87746 0.865831 · 0.875 · 314.1×97 | 647.6 · 0.841625 0.827206 · 0.84 · 301.3×92.6 |

The head's rows start later because its popover opens later; the rows sample one curve at different moments.

## No flash

- Main, cold: the first frame with more than 30 popover pixels is at 52 ms, with 814 of the 31810 at rest. The 1 frame between the tap and it has 0 popover pixels.
- Head, cold: the first frame with more than 30 popover pixels is at 184 ms, with 4460 of the 31810 at rest. The 4 frames between the tap and it have 0–7 popover pixels.
- Main, throttled: the first frame with more than 30 popover pixels is at 52 ms, with 1122 of the 31810 at rest. The 1 frame between the tap and it has 0 popover pixels.
- Head, throttled: the first frame with more than 30 popover pixels is at 601 ms, with 4355 of the 31810 at rest. The 4 frames between the tap and it have 0–3 popover pixels.

## Identity spot checks

| Viewport | Mode | State | Pixels over pixelmatch threshold 0.1 | Byte-identical |
| --- | --- | --- | --- | --- |
| 390 touch | light | idle | 0 | yes |
| 390 touch | light | open at rest (first open) | 0 | yes |
| 390 touch | light | second open at rest | 0 | yes |
| 390 touch | dark | idle | 0 | yes |
| 390 touch | dark | open at rest (first open) | 0 | yes |
| 390 touch | dark | second open at rest | 0 | yes |
| 1280 mouse | light | idle | 0 | yes |
| 1280 mouse | light | open at rest (first open) | 0 | yes |
| 1280 mouse | light | second open at rest | 0 | yes |
| 1280 mouse | dark | idle | 0 | no |
| 1280 mouse | dark | open at rest (first open) | 0 | yes |
| 1280 mouse | dark | second open at rest | 0 | yes |

- 1280 dark, idle: 2 pixels differ, at (991, 563) and (991, 565), by at most 14/255. That is the control bar's top-right corner. Two captures of one main build (the production deploy of 5815d02bf5) differ there too: 1 pixel, by at most 14/255. So this is capture noise, not a build difference.

## Files

- `<viewport>-<mode>--<state>--main.png`, `--pr.png` and `--diff.png`: the identity checks. The viewport is `phone` (390, scale 2) or `desktop` (1280).
- `<case>--<build>--<role>--<time>ms.png`: screencast frames of run 0 (phone, light). The case is `cold` or `throttled`, and the time is from the tap (`m` = before it).
- Roles: `before`, `after-tap`, `gap`, `speck`, `first-popover`, `entrance-2` to `entrance-4`, and `settled`. A `gap` frame (the head only) has no popover pixels and a `speck` 1 to 30; `first-popover` is the first with more than 30.
- `measurements.json`: the values behind these tables.
