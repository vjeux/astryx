# #11600 List (Reorderable): mouse drop, release to settle (test data, hosted previews)

- Hosted previews only, nothing built locally. Each take reads `version.json` from its preview before and after the take:
  - main (production preview), https://astryx.atmeta.com: `{"commit":"e434325ed09782cf09f9beeb7264aac4da7b71a9","environment":"production"}`
  - head (PR preview), https://astryx-git-feat-reorder-drop-glide-fbopensource.vercel.app: `{"commit":"a7bde7212424174f216413259ad101af21e6bbdd","environment":"preview"}`
- Story `core-list--reorderable`, opened as `/storybook/iframe.html?id=core-list--reorderable&viewMode=story`. Requests to other origins are blocked (none were made).
- Browser: Playwright chromium 149.0.7827.55, viewport 1400×300, deviceScaleFactor 2, light. Mouse input is real input through the DevTools protocol (Playwright's mouse: Input.dispatchMouseEvent).
- The drag: the pointer goes to the centre of the first row's reorder handle (button[data-astryx-list-reorder]) and waits 300 ms. The button goes down, then after 100 ms the pointer moves 128 px down in 20 steps, 16 ms apart, and rests for 700 ms. Then the button comes up (the release).
- Reduce Motion: the page's prefers-reduced-motion is emulated as reduce (Playwright's reducedMotion, Emulation.setEmulatedMedia).
- Frames: a DevTools screencast (Page.startScreencast, PNG, every frame). Each frame is the page only, cropped to the list's box plus 8 px. The page renders at deviceScaleFactor 2; the screencast delivers each frame at 1 px per CSS px. Its time is the frame's compositor swap time minus the time of the release's pointerup event, in ms. The public frames run from the last frame before the release to two frames after the settle. Every case ran 3 times in a fresh page; the frames are the first run's.
- Numbers: a requestAnimationFrame callback reads every list item's box and opacity, keyed by data-astryx-item-key. While the pointer is down, the list holds a preview copy of the row (data-astryx-reorder-preview, aria-hidden). The copy follows the pointer; the row itself stays in its slot. The release point is the preview copy's y in the last sample before the release.
- Settle: the time from the release to the first sample after which no preview copy is left. From that sample on, every row sits within 0.5 px of its final y, at its final opacity. On the first frame after the release, the dropped row does one of three things. It lands at its final y, starts on the release point's side of it, or jumps past it to the far side. Overshoot applies to a row that starts on the release point's side. It is the row's largest distance past its final y, away from the release point.
- All y values are CSS px from the top of the page. Each frame's top edge is at y=8.
- Each row ends with its reorder handle. The first row's handle box is 28×28 px on main and 16×16 px at the head. The head's base branch is feat/reorder-handle-options (#11575, not merged), so main does not have that handle.


## Results

| Case | Build | Settle, all rows (ms, each run) | Dropped row within 0.5 px of its final y (ms, each run) | First frame after the release (run 1) | Overshoot (px, each run) | Dropped row: release point → first frame after → final y; its y range after the release (run 1) | Rows that move after the release (run 1) / other rows' largest move while dragging (px) | Order after |
|---|---|---|---|---|---|---|---|---|
| Mouse drag and drop, normal motion | main (production preview) | 7.5, 12.1, 10.5 (median 10.5) | 7.5, 12.1, 10.5 | lands at once (7.5 ms) | 0, 0, 0 | Inbox: 144 → 127 → 127; 127–127 | none (each lands at once) / 0 | Sent, Drafts, Archive, Inbox, Spam, Trash |
| Mouse drag and drop, normal motion | head (PR preview) | 511.4, 525.4, 512.2 (median 512.2) | 444.7, 442.1, 445.6 | moves from the release point (0.073 px from it at 11.4 ms, opacity 1) | 0, 0, 0 | Inbox: 144 → 143.927 → 127; 127–143.927 | Sent 37 px up, Drafts 37 px up, Archive 37 px up / 0 | Sent, Drafts, Archive, Inbox, Spam, Trash |
| Mouse drag and drop, Reduce Motion (prefers-reduced-motion: reduce) | main (production preview) | 8.8, 9.5, 9.2 (median 9.2) | 8.8, 9.5, 9.2 | lands at once (8.8 ms) | 0, 0, 0 | Inbox: 144 → 127 → 127; 127–127 | none (each lands at once) / 0 | Sent, Drafts, Archive, Inbox, Spam, Trash |
| Mouse drag and drop, Reduce Motion (prefers-reduced-motion: reduce) | head (PR preview) | 7.1, 8.6, 8.1 (median 8.1) | 7.1, 8.6, 8.1 | lands at once (7.1 ms) | 0, 0, 0 | Inbox: 144 → 127 → 127; 127–127 | none (each lands at once) / 0 | Sent, Drafts, Archive, Inbox, Spam, Trash |

## While dragging (the other rows' shift)

- main (production preview): the other rows move 0 px in every run. The row itself stays at y=16 at opacity 0.6. The list's reorder line (--astryx-reorder-line-y) steps through 73, 110, 147 px (run 1).
- head (PR preview): the other rows move 0 px in every run. The row itself stays at y=16 at opacity 0.6. The list's reorder line (--astryx-reorder-line-y) steps through 73, 110, 147 px (run 1).
- The reorder line's steps are the same at both builds in every run: yes.

## The frames

### Mouse drag and drop, normal motion, main (production preview) (`{"commit":"e434325ed09782cf09f9beeb7264aac4da7b71a9","environment":"production"}`)

- pr11600-chromium-drop-main-f00-m0722ms.png: -722.1 ms. Rows by y (sample at -725.7 ms): Inbox y=16 (opacity 0.6) · Sent y=53 · Drafts y=90 · Archive y=127 · preview copy of Inbox y=144 (opacity 0.6) · Spam y=164 · Trash y=201.
- pr11600-chromium-drop-main-f01-p0012ms.png: +12.4 ms. Rows by y (sample at 7.5 ms): Sent y=16 · Drafts y=53 · Archive y=90 · Inbox y=127 · Spam y=164 · Trash y=201.

### Mouse drag and drop, normal motion, head (PR preview) (`{"commit":"a7bde7212424174f216413259ad101af21e6bbdd","environment":"preview"}`)

- pr11600-chromium-drop-head-f00-m0718ms.png: -718.1 ms. Rows by y (sample at -722 ms): Inbox y=16 (opacity 0.6) · Sent y=53 · Drafts y=90 · Archive y=127 · preview copy of Inbox y=144 (opacity 0.6) · Spam y=164 · Trash y=201.
- pr11600-chromium-drop-head-f01-p0020ms.png: +19.9 ms. Rows by y (sample at 11.4 ms): Sent y=52.914 · Drafts y=89.914 · Archive y=126.914 · Inbox y=143.927 · Spam y=164 · Trash y=201.
- pr11600-chromium-drop-head-f02-p0032ms.png: +31.8 ms. Rows by y (sample at 28 ms): Sent y=51.884 · Drafts y=88.884 · Archive y=125.884 · Inbox y=143.487 · Spam y=164 · Trash y=201.
- pr11600-chromium-drop-head-f03-p0049ms.png: +49 ms. Rows by y (sample at 44.7 ms): Sent y=49.971 · Drafts y=86.971 · Archive y=123.971 · Inbox y=142.583 · Spam y=164 · Trash y=201.
- pr11600-chromium-drop-head-f04-p0066ms.png: +65.6 ms. Rows by y (sample at 61.4 ms): Sent y=47.499 · Drafts y=84.499 · Archive y=121.499 · Inbox y=141.424 · Spam y=164 · Trash y=201.
- pr11600-chromium-drop-head-f05-p0082ms.png: +82.3 ms. Rows by y (sample at 78 ms): Sent y=44.765 · Drafts y=81.765 · Archive y=118.765 · Inbox y=140.216 · Spam y=164 · Trash y=201.
- pr11600-chromium-drop-head-f06-p0099ms.png: +99.1 ms. Rows by y (sample at 94.7 ms): Sent y=41.928 · Drafts y=78.928 · Archive y=115.928 · Inbox y=138.913 · Spam y=164 · Trash y=201.
- pr11600-chromium-drop-head-f07-p0116ms.png: +115.6 ms. Rows by y (sample at 111.3 ms): Sent y=39.185 · Drafts y=76.185 · Archive y=113.185 · Inbox y=137.654 · Spam y=164 · Trash y=201.
- pr11600-chromium-drop-head-f08-p0133ms.png: +132.5 ms. Rows by y (sample at 128 ms): Sent y=36.524 · Drafts y=73.524 · Archive y=110.524 · Inbox y=136.427 · Spam y=164 · Trash y=201.
- pr11600-chromium-drop-head-f09-p0150ms.png: +150.2 ms. Rows by y (sample at 144.7 ms): Sent y=34.051 · Drafts y=71.051 · Archive y=108.051 · Inbox y=135.296 · Spam y=164 · Trash y=201.
- pr11600-chromium-drop-head-f10-p0165ms.png: +165.4 ms. Rows by y (sample at 161.4 ms): Sent y=31.763 · Drafts y=68.763 · Archive y=105.763 · Inbox y=134.238 · Spam y=164 · Trash y=201.
- pr11600-chromium-drop-head-f11-p0182ms.png: +182.3 ms. Rows by y (sample at 178 ms): Sent y=29.729 · Drafts y=66.729 · Archive y=103.729 · Inbox y=133.31 · Spam y=164 · Trash y=201.
- pr11600-chromium-drop-head-f12-p0199ms.png: +198.8 ms. Rows by y (sample at 194.7 ms): Sent y=27.86 · Drafts y=64.86 · Archive y=101.86 · Inbox y=132.444 · Spam y=164 · Trash y=201.
- pr11600-chromium-drop-head-f13-p0215ms.png: +215.4 ms. Rows by y (sample at 211.4 ms): Sent y=26.245 · Drafts y=63.245 · Archive y=100.245 · Inbox y=131.71 · Spam y=164 · Trash y=201.
- pr11600-chromium-drop-head-f14-p0232ms.png: +232 ms. Rows by y (sample at 228 ms): Sent y=24.779 · Drafts y=61.779 · Archive y=98.779 · Inbox y=131.028 · Spam y=164 · Trash y=201.
- pr11600-chromium-drop-head-f15-p0249ms.png: +248.7 ms. Rows by y (sample at 244.7 ms): Sent y=23.545 · Drafts y=60.545 · Archive y=97.545 · Inbox y=130.468 · Spam y=164 · Trash y=201.
- pr11600-chromium-drop-head-f16-p0265ms.png: +265.3 ms. Rows by y (sample at 261.4 ms): Sent y=22.409 · Drafts y=59.409 · Archive y=96.409 · Inbox y=129.938 · Spam y=164 · Trash y=201.
- pr11600-chromium-drop-head-f17-p0282ms.png: +282.2 ms. Rows by y (sample at 278 ms): Sent y=21.494 · Drafts y=58.494 · Archive y=95.494 · Inbox y=129.525 · Spam y=164 · Trash y=201.
- pr11600-chromium-drop-head-f18-p0299ms.png: +299 ms. Rows by y (sample at 294.7 ms): Sent y=20.634 · Drafts y=57.634 · Archive y=94.634 · Inbox y=129.123 · Spam y=164 · Trash y=201.
- pr11600-chromium-drop-head-f19-p0316ms.png: +315.8 ms. Rows by y (sample at 311.4 ms): Sent y=19.959 · Drafts y=56.959 · Archive y=93.959 · Inbox y=128.82 · Spam y=164 · Trash y=201.
- pr11600-chromium-drop-head-f20-p0332ms.png: +332.1 ms. Rows by y (sample at 328 ms): Sent y=19.322 · Drafts y=56.322 · Archive y=93.322 · Inbox y=128.525 · Spam y=164 · Trash y=201.
- pr11600-chromium-drop-head-f21-p0349ms.png: +349.1 ms. Rows by y (sample at 344.7 ms): Sent y=18.834 · Drafts y=55.834 · Archive y=92.834 · Inbox y=128.302 · Spam y=164 · Trash y=201.
- pr11600-chromium-drop-head-f22-p0366ms.png: +365.5 ms. Rows by y (sample at 361.4 ms): Sent y=18.361 · Drafts y=55.361 · Archive y=92.361 · Inbox y=128.088 · Spam y=164 · Trash y=201.
- pr11600-chromium-drop-head-f23-p0382ms.png: +382.2 ms. Rows by y (sample at 378 ms): Sent y=18.016 · Drafts y=55.016 · Archive y=92.016 · Inbox y=127.926 · Spam y=164 · Trash y=201.
- pr11600-chromium-drop-head-f24-p0399ms.png: +398.9 ms. Rows by y (sample at 394.6 ms): Sent y=17.677 · Drafts y=54.677 · Archive y=91.677 · Inbox y=127.773 · Spam y=164 · Trash y=201.
- pr11600-chromium-drop-head-f25-p0415ms.png: +415.1 ms. Rows by y (sample at 411.4 ms): Sent y=17.424 · Drafts y=54.424 · Archive y=91.424 · Inbox y=127.654 · Spam y=164 · Trash y=201.
- pr11600-chromium-drop-head-f26-p0432ms.png: +432 ms. Rows by y (sample at 428 ms): Sent y=17.183 · Drafts y=54.183 · Archive y=91.183 · Inbox y=127.545 · Spam y=164 · Trash y=201.
- pr11600-chromium-drop-head-f27-p0449ms.png: +448.8 ms. Rows by y (sample at 444.7 ms): Sent y=17.002 · Drafts y=54.002 · Archive y=91.002 · Inbox y=127.46 · Spam y=164 · Trash y=201.
- pr11600-chromium-drop-head-f28-p0466ms.png: +465.7 ms. Rows by y (sample at 461.4 ms): Sent y=16.831 · Drafts y=53.831 · Archive y=90.831 · Inbox y=127.383 · Spam y=164 · Trash y=201.
- pr11600-chromium-drop-head-f29-p0482ms.png: +482.2 ms. Rows by y (sample at 478 ms): Sent y=16.702 · Drafts y=53.702 · Archive y=90.702 · Inbox y=127.321 · Spam y=164 · Trash y=201.
- pr11600-chromium-drop-head-f30-p0499ms.png: +498.7 ms. Rows by y (sample at 494.7 ms): Sent y=16.582 · Drafts y=53.582 · Archive y=90.582 · Inbox y=127.268 · Spam y=164 · Trash y=201.
- pr11600-chromium-drop-head-f31-p0516ms.png: +515.9 ms. Rows by y (sample at 511.4 ms): Sent y=16.489 · Drafts y=53.489 · Archive y=90.489 · Inbox y=127.224 · Spam y=164 · Trash y=201.
- pr11600-chromium-drop-head-f32-p0532ms.png: +532.2 ms. Rows by y (sample at 528 ms): Sent y=16.406 · Drafts y=53.406 · Archive y=90.406 · Inbox y=127.187 · Spam y=164 · Trash y=201.
- pr11600-chromium-drop-head-f33-p0549ms.png: +549.2 ms. Rows by y (sample at 544.7 ms): Sent y=16.34 · Drafts y=53.34 · Archive y=90.34 · Inbox y=127.155 · Spam y=164 · Trash y=201.

### Mouse drag and drop, Reduce Motion (prefers-reduced-motion: reduce), main (production preview) (`{"commit":"e434325ed09782cf09f9beeb7264aac4da7b71a9","environment":"production"}`)

- pr11600-chromium-drop-reduce-main-f00-m0721ms.png: -721 ms. Rows by y (sample at -724.5 ms): Inbox y=16 (opacity 0.6) · Sent y=53 · Drafts y=90 · Archive y=127 · preview copy of Inbox y=144 (opacity 0.6) · Spam y=164 · Trash y=201.
- pr11600-chromium-drop-reduce-main-f01-p0013ms.png: +12.8 ms. Rows by y (sample at 8.8 ms): Sent y=16 · Drafts y=53 · Archive y=90 · Inbox y=127 · Spam y=164 · Trash y=201.

### Mouse drag and drop, Reduce Motion (prefers-reduced-motion: reduce), head (PR preview) (`{"commit":"a7bde7212424174f216413259ad101af21e6bbdd","environment":"preview"}`)

- pr11600-chromium-drop-reduce-head-f00-m0723ms.png: -722.8 ms. Rows by y (sample at -726.3 ms): Inbox y=16 (opacity 0.6) · Sent y=53 · Drafts y=90 · Archive y=127 · preview copy of Inbox y=144 (opacity 0.6) · Spam y=164 · Trash y=201.
- pr11600-chromium-drop-reduce-head-f01-p0016ms.png: +15.9 ms. Rows by y (sample at 7.1 ms): Sent y=16 · Drafts y=53 · Archive y=90 · Inbox y=127 · Spam y=164 · Trash y=201.

