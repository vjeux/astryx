# PageControl scrub, window and fades: evidence (Chromium, phone profile)

- `page-control-window.png`: the "Many Pages (50)" story at page 26: ten slots, 4.31 and 7.33 px edge indicators on both sides, the current page in the last full slot (UIKit's shape at pages 10 and 25).
- `page-control-scrub-storyboard.png`: a finger dragged from page 3 across the 5-page control, photographed after each touch event: the platter shows once it is held (interacting=true), the page follows the indicator under the finger.
- `page-control-window-slide-storyboard.png`: page 26 → 27 on the 50-page control, the held slide seeked every 16.7 ms: the strip moves one slot (17.67 px) without overshoot while the new current indicator grows from 0.76 to full.
