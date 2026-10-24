# C23 PR clips

Mobile Safari on the iOS 26.2 simulator (iPhone 17 Pro), recorded with `simctl recordVideo`, cropped to the page
content, 400 px wide, 30 fps (15 fps for the Chromium keyboard clip):

- `pager-*.gif`: the pager fixture (five full-width pages): a flick, slow drags to 30 % and 70 % of a page, and a flick
  with a 600 ms main-thread block 100 ms after the lift.
- `carousel-*.gif`: Carousel `hasPaging` stories: a flick, drags to 30 % and 70 %, a flick with a 600 ms block, and a
  loop wrapping from the first page back to the last.
- `pagecontrol-*.gif`: lab PageControl stories: a tap on the trailing side, a scrub, a window slide on a 50-page
  control (also with a 400 ms block 60 ms after the lift), and a jog past the window's edge.
- `carousel-scroll-area-keyboard.gif`: Chromium, keyboard only: Tab reaches the overflowing scroll area, the arrow keys
  and End scroll it.
