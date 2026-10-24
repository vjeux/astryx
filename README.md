# BottomSheet presentation on the sheet spring: evidence

Evidence for the BottomSheet change that opens and closes a sheet on iOS's sheet spring under a finger.

## iOS 26.2 Safari (iPhone 17 Pro simulator)

The simulator gets simulated touches and is recorded at 60 fps. Each board plots the sheet's top in every frame against the curve the page planned, with the main-thread block shaded. Frames are cropped to the page.

- `ios/E1-open-busy700.png`: opening, with the main thread blocked for 700 ms from two frames after the dialog opens. The sheet rises on the present spring every frame through the block, the dim fades in, and the content is painted in every frame.
- `ios/E3-open-control.png`: the same opening with no block.
- `ios/E4-half-then-up-busy700.png`: released moving up from the half detent with a 700 ms block. The sheet rises to its tall detent, and the rows it reveals are painted in every frame.
- `ios/E6b-dismiss-busy700-onclose.png`: closing after a tap on the dimmed page, with a 700 ms block from two frames after the close starts. The sheet leaves on the dismiss spring every frame through the block, and the dim fades out with it.

## Chromium and WebKit (Playwright, real touch input)

- `storyboards/bottomsheet-present.{chromium,webkit}.png` and `.trace.json`: the entrance frame by frame. The sheet's top only falls toward its rest and the dim only rises.
- `storyboards/bottomsheet-present-busy-main-thread.chromium.png` and `.trace.json`: the entrance through a 700 ms long task, from the screencast. Time 0 is the start of the block.
- `busy-main-thread/bottomsheet-present.chromium.json`: that proof's frame data and result.
