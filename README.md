# Carousel hasPaging evidence (Mobile Safari, iPhone 17 Pro, iOS 26.2 simulator; Chromium storyboards)

The built "Paging" and "Paging (Loop)" stories, driven by real touches in Mobile Safari, 60 fps recordings.
`ios-carousel-runs.json` has, per run: the scroller's touch-action, overflow and pointer type, the page on
screen afterwards, the track's x every frame the page could sample, and the second slide's x per recorded frame.

- `ios-carousel-flick-busy.png`: a flick on "Paging"; 100 ms after the lift the page blocks its main thread
  for 600 ms. Cells every 33 ms from just before the lift: the settle keeps moving every frame and lands
  while the thread is blocked; the incoming page is painted whole (it has its own layer).
- Other runs in the JSON: a flick (one page), a slow drag past 60 % of a page (the nearest page), a swipe
  back from the first page of "Paging (Loop)" (lands on the last page).
- `carousel-paging-*-storyboard.png`: Chromium storyboards, seeked every 16.7 ms: a flick to the next page,
  and the loop's wrap from the first page back to the last.
