# NavigationStack evidence (lab)

Chromium, the interaction harness's phone (402 × 714 viewport; the stack is 370 px wide in the story), story `lab-navigationstack--settings` / `--pushed`.

- `push.png`: a push, frame by frame from the tap (held Web Animations, 16.7 ms apart). The new screen slides in on UIKit's push spring while the root moves at −0.3× under the dimming. In the bar, the new title is in place from the first frame, the covered title slides toward the leading edge, and the round Back chevron fades in.
- `push-curve.chromium.json`: the top card's translateX at every 16.7 ms frame against UIKit's push spring, from 370 px at −8.773 widths/s (critically damped, ω = 2π/0.3). Max difference: 0.03 px.
- `edge-pop.png`: a back swipe from the leading edge (home-screen web app) released past half. The card follows the finger 1:1 after the 15 px threshold, both titles ride their screens, and the chevron stays put.
- `push-busy-main-thread.png` and `push-busy-main-thread.chromium.json`: a push with the main thread blocked for 600 ms. 20 of 20 expected screencast frames arrive with a median gap of 16.4 ms and a longest gap of 33.8 ms, and the card advances in 17 of them.
