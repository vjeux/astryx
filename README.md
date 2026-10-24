# MobileNav close runs like a UIKit dismissal: evidence

## Chromium

`close-contract-before-main.txt`: `MobileNavClose.a11y.chromium.spec.ts` run against a `main` Storybook. 3 of 4 tests fail:

- midway through the slide-out, the dialog is no longer modal;
- a tap on the leaving drawer's link registers;
- a tap late in the slide-out reaches the page.

The reduced-motion test passes on both. On this branch all 4 pass, in three runs in a row.

## iOS 26.2 simulator (iPhone 17 Pro, Safari), Core/MobileNav "Default" story

Each run taps the backdrop to close, taps the same point again about 0.23–0.29 s later, then taps it once more after about 1.1–1.3 s. Times are from the first touch; the click fires about 55 ms after its touch.

- `ios-after1.json`, `ios-after2.json` (this change): the dialog closes 365 and 362 ms after the first touch, at the end of the slide-out. At the second touch the dialog is still modal, the drawer is inert and nearly out (x ≈ 395–400 of 402), and the scrim is at 0.02 and 0.006. The second tap lands on the backdrop, not on the page or the drawer. The third tap reaches the page, so nothing is left blocking it.
- `ios-before1.json`, `ios-before2.json` (`main`): the dialog closes 240 and 236 ms after the first touch, about 60% of the way into the slide-out. In run 2 the second tap came late (1.3 s) and only shows the page working afterwards.

`stateAtTouches` columns: `[t, modal, drawerInert, drawerX, scrim, open]`.
