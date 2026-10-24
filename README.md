# C23 path clips (batch 5)

Mobile Safari on the iOS 26.2 simulator (iPhone 17 Pro), `simctl recordVideo`, cropped to page content, 400 px wide,
30 fps; `*-chromium.gif` are Chromium keyboard recordings (15 fps). Reduce Motion clips were recorded with the
simulator's Reduce Motion on (the page reported `prefers-reduced-motion: reduce`).

- pager-*: the pager fixture (five full-width pages): rubber band past page 0, goTo (a tap below the pages), goTo
  during a drag, a still finger catching a settle, a drag catching one, RTL, a vertical drag scrolling the page.
- carousel-*: the Carousel hasPaging stories: vertical / horizontal / 35° drags in a long page, the Next button, a
  catch, the rubber band at the first page, RTL, Reduce Motion, keys (Chromium, iOS idiom).
- pagecontrol-change-at-lift, -drag-scrolls-page, -rtl-taps, -keys-chromium: the #8164 build (tap only).
- pagecontrol-fades-quarter-speed, -rapid-taps, -rtl-scrub, -rtl-window, -reduce-motion: the #8174 build.
