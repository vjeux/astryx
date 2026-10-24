# MobileNav width cap: evidence

Core/MobileNav "Default" story on a 320 × 568 phone (Chromium, touch, device scale 2), drawer open.

- `320-before.png` (`main`): the default 320 px drawer covers the whole screen. There is no backdrop to tap.
- `320-after.png` (this change): the drawer is 272 px wide (85%), and a 48 px strip of the dimmed page stays beside it. A tap on the strip closes the drawer.
- `width-contract-before-main.txt`: `MobileNavWidth.a11y.chromium.spec.ts` run against a `main` Storybook. The 320 px test fails with width 320 where 272 is expected; the 402 px test, the unchanged path, passes.
