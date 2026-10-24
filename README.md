# Pager evidence (Mobile Safari, iPhone 17 Pro, iOS 26.2 simulator; Chromium storyboards)

A fixture page: five 402 pt pages in a clipped viewport, the pager driving the track. 60 fps screen
recordings; each sheet is cropped to the viewport. `ios-runs.json` has each run's page log (reported
page, settle, blocks, touch times), the played curves, and page 2's x per recorded frame.

- `ios-render-on-page-change.png`: a flick; the page-change callback blocks the main thread for 600 ms
  (an app's render of the new page). Cells every 33 ms from 66 ms before the block. The settle keeps
  moving every frame and lands while the thread is still blocked. Pages have their own layers.
- `ios-render-on-page-change-unlayered.png`: the same without per-page layers: the part of the next page
  the browser had not painted stays blank until the block ends.
- `ios-block-at-lift.png`: control. A 600 ms block starting at the lift: the settle cannot start until
  the block ends (why the page is reported two frames into the settle).
- `ios-catch-hold.png`: a finger lands on a moving pager and holds for 0.8 s: the motion stops about
  85 ms after the touch, no text is selected, and the lift settles on the nearest page.
- `pager-*-storyboard.png`: Chromium storyboards, seeked every 16.7 ms (flick, goTo, release at rest).
