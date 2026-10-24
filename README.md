# Evidence: DropdownMenu's touch presentation (UIMenu parity)

- `ios-open-busy-main-thread.png`: iOS 26.2 Safari (simulator, iPhone 17 Pro), 60 fps frames of a tap on the
  Default story's trigger while the page blocks its main thread for 400 ms from 31 ms into the open. The menu
  grows out of the trigger and overshoots on the compositor through the block.
- `ios-open.png`: the same open without the block.
- `ios-close.png`: a tap outside; the menu collapses back into its trigger and fades.
- `chromium-open-storyboard.png`, `chromium-close-storyboard.png`: the interaction harness's seeked storyboards
  (phone profile, Chromium), with the presented width, height and opacity per frame.
