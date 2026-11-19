# Switch: the first toggle, by a touch tap on the label

Builds: Storybook built at `4c0ac27e27dc13df948b0a8f3aca25d6acc0b354` (head) and at `badc19e4996da38ab5825cb98b7b9681eab5de5a` (its merge-base on main). Each build's `astryx-build-sha.txt` reads back its full SHA, from a clean tree.

Browser: Chromium 149.0.7827.55 (Playwright 1.61.1) in touch emulation: a 390×844 viewport at device scale 3, `isMobile` and touch, so `(pointer: coarse)` matches. This is not phone evidence.

Story: `core-switch--default` ("Enable notifications", off), light. Each take is a fresh page load, so the tap is the first press on that switch. The tap is CDP `Input.dispatchTouchEvent` at the centre of the label: touchStart, then touchEnd 40 ms later. The track is never touched.

Strips: CDP screencast frames of take 1, from the tap until 600 ms after it, cropped to the track. The frames come at 390×844 and show at 4×. Times are ms from the tap.

Table: the thumb's box from `getBoundingClientRect`, read at every animation frame. Frames −1 to 15 are listed, then the settled value. x is the thumb's left edge from the track's left edge, in CSS px. Frame 0 is the first frame with the switch on. Take 1 is shown. Takes 2 and 3 give the same values within 0.1 px.

## `switch-first-toggle-head-4c0ac27e-core-40x24.png`

head 4c0ac27e · Core: no theme (Storybook theme global `none`), Switch md, track 40×24

| frame | ms | x | width |
| --- | --- | --- | --- |
| -1 | 57 | 4 | 16 |
| 0 | 73.7 | 4 | 16 |
| 1 | 90.9 | 4.697 | 16.075 |
| 2 | 107.3 | 6.287 | 16.28 |
| 3 | 123.9 | 8.149 | 16.572 |
| 4 | 140.5 | 9.971 | 16.921 |
| 5 | 157.3 | 11.606 | 17.301 |
| 6 | 173.8 | 12.989 | 17.678 |
| 7 | 190.7 | 14.127 | 18.045 |
| 8 | 207.4 | 15.026 | 18.405 |
| 9 | 224.5 | 15.726 | 18.727 |
| 10 | 240.7 | 16.236 | 19.016 |
| 11 | 258.2 | 16.645 | 19.269 |
| 12 | 274 | 16.952 | 19.484 |
| 13 | 290.6 | 17.188 | 19.665 |
| 14 | 307.2 | 17.353 | 19.813 |
| 15 | 324 | 17.489 | 19.93 |
| … | 1173.8 | 18 | 20 |

## `switch-first-toggle-main-badc19e4-core-40x24.png`

main badc19e4 (the merge-base) · Core: no theme (Storybook theme global `none`), Switch md, track 40×24

| frame | ms | x | width |
| --- | --- | --- | --- |
| -1 | 59.3 | 4 | 16 |
| 0 | 75.8 | 4 | 16 |
| 1 | 92.9 | 4.706 | 16.075 |
| 2 | 109.3 | 6.309 | 16.283 |
| 3 | 126 | 8.171 | 16.576 |
| 4 | 142.9 | 9.981 | 16.923 |
| 5 | 159.5 | 11.615 | 17.304 |
| 6 | 176.1 | 13.003 | 17.682 |
| 7 | 192.8 | 14.133 | 18.047 |
| 8 | 209.3 | 15.031 | 18.407 |
| 9 | 226.2 | 15.733 | 18.73 |
| 10 | 242.8 | 16.24 | 19.019 |
| 11 | 260.6 | 16.647 | 19.27 |
| 12 | 276.2 | 16.955 | 19.487 |
| 13 | 292.8 | 17.19 | 19.666 |
| 14 | 309.5 | 17.354 | 19.814 |
| 15 | 326 | 17.49 | 19.931 |
| … | 1175.9 | 18 | 20 |

## `switch-first-toggle-head-4c0ac27e-track-36x24.png`

head 4c0ac27e · Core (no theme), plus a stylesheet added to the page head before any script runs: `.astryx-switch[data-size="md"] { width: 36px; }`. The md track is then 36×24; the 40×24 wrapper is unchanged.

| frame | ms | x | width |
| --- | --- | --- | --- |
| -1 | 57 | 4 | 16 |
| 0 | 74.4 | 4 | 16 |
| 1 | 90.8 | 4.487 | 16.071 |
| 2 | 107.3 | 5.645 | 16.272 |
| 3 | 123.9 | 6.993 | 16.562 |
| 4 | 140.6 | 8.332 | 16.91 |
| 5 | 157.2 | 9.521 | 17.29 |
| 6 | 173.8 | 10.519 | 17.667 |
| 7 | 190.5 | 11.334 | 18.034 |
| 8 | 207.2 | 11.964 | 18.393 |
| 9 | 224.1 | 12.388 | 18.718 |
| 10 | 240.4 | 12.82 | 19.006 |
| 11 | 258.1 | 13.052 | 19.261 |
| 12 | 273.9 | 13.299 | 19.479 |
| 13 | 290.4 | 13.417 | 19.66 |
| 14 | 307.1 | 13.552 | 19.809 |
| 15 | 323.7 | 13.614 | 19.927 |
| … | 1173.6 | 14 | 20 |

## `switch-first-toggle-main-badc19e4-track-36x24.png`

main badc19e4 (the merge-base) · the same stylesheet: track 36×24

| frame | ms | x | width |
| --- | --- | --- | --- |
| -1 | 61.5 | 4 | 16 |
| 0 | 78.2 | 4 | 16 |
| 1 | 95.1 | 4.515 | 16.075 |
| 2 | 111.8 | 5.673 | 16.278 |
| 3 | 128.4 | 7.041 | 16.574 |
| 4 | 145.1 | 8.372 | 16.921 |
| 5 | 161.8 | 9.557 | 17.301 |
| 6 | 178.7 | 10.549 | 17.678 |
| 7 | 195.1 | 11.358 | 18.045 |
| 8 | 211.9 | 11.985 | 18.405 |
| 9 | 228.8 | 12.401 | 18.727 |
| 10 | 245 | 12.832 | 19.016 |
| 11 | 262.6 | 13.061 | 19.269 |
| 12 | 278.4 | 13.302 | 19.484 |
| 13 | 295 | 13.422 | 19.665 |
| 14 | 311.6 | 13.554 | 19.813 |
| 15 | 328.3 | 13.616 | 19.93 |
| … | 1178.2 | 14 | 20 |

