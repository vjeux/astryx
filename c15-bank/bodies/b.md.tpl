Stacked on {A}. Review only this PR's change: https://github.com/vjeux/astryx/compare/6f87bcd484d99140d0122553b0b4e0d2a2395750...52ecd8bbdfe559b0c27fac3b4741104934a23942

## User need

On iOS 26 a tab bar gets out of the way as the page scrolls, holds a bottom accessory such as a mini player, keeps search one tap away, and folds extra sections into a More tab. On Astryx each is built by hand, without UIKit's motion.

## Evidence

![iOS: minimize](https://raw.githubusercontent.com/vjeux/astryx/f535f65f47f12a633ce29cf1479d5439b9e1cdc0/ios-minimize.gif) ![iOS: minimize, blocked thread](https://raw.githubusercontent.com/vjeux/astryx/f535f65f47f12a633ce29cf1479d5439b9e1cdc0/ios-minimize-busy.gif) ![iOS: accessory](https://raw.githubusercontent.com/vjeux/astryx/f535f65f47f12a633ce29cf1479d5439b9e1cdc0/ios-accessory.gif) ![iOS: search](https://raw.githubusercontent.com/vjeux/astryx/f535f65f47f12a633ce29cf1479d5439b9e1cdc0/ios-search.gif) ![iOS: Cancel](https://raw.githubusercontent.com/vjeux/astryx/f535f65f47f12a633ce29cf1479d5439b9e1cdc0/ios-cancel.gif) ![iOS: More](https://raw.githubusercontent.com/vjeux/astryx/f535f65f47f12a633ce29cf1479d5439b9e1cdc0/ios-more.gif) ![Android](https://raw.githubusercontent.com/vjeux/astryx/f535f65f47f12a633ce29cf1479d5439b9e1cdc0/android-l3-minimize.gif)

Recorded from the drafts this replaces (iOS 26.2 simulator, Android emulator). Since then the field reads the keyboard from the visual viewport only, and a drag over a disabled tab returns the lens to the selected tab.

## Problem and solution fit

- `minimizeBehavior="onScrollDown"`: a finger's downward scroll collapses the bar into a circle; the top or a tap expands it.
- `bottomAccessory`: content above the bar that moves beside the circle.
- `isDisabled` on an item: visible, never chosen.
- `TabBarSearchTab`: a circle whose field rises above the keyboard, the circle then Cancel.
- `moreValue` and `TabBarMoreList`: past five tabs, four plus More.

## Current specification

- **Lab:** Lab is not shipped; no spec needed.
- **CLI:** `astryx discover` lists TabBarSearchTab and TabBarMoreList because `official-packages.json` is regenerated from the repository, as `spec:AST-051` FR11 requires.

## Owner decisions

1. Minimizing is finger-only: a mouse-driven bar stays expanded. `minimizeFade` is a guess (`@measure M-TB1`) until measured.
2. The accessory, minimize and search springs play UIKit's measured values, not motion roles (`spec:AST-094` FR4).
3. Disabled tabs: a finger landing on one moves nothing; over one the lens returns to the selected tab (`family:action-groups` FR2).
4. Collapsed, the bar is one button named after the selected tab.
5. More: first four plus More; More again while it holds a tab is a reselect.
6. Cancel grows while pressed and wobbles back.
7. The first batch's two open decisions carry over.
8. `architecture:public-component-api` INV3: `minimizeBehavior` and `automaticallyActivates` take effect only under a finger (a mouse keeps the bar expanded and always activates the field), with no `'adaptive'` value. Their names wait on this decision.

Also: each glass (accessory, search field) is three elements: an `aria-hidden` containing block that draws the start cap, and two pieces the motion animates by ref. The finger-only code is 6.5 KB gzip of TabBar's 12.6 KB.

## Public delta and caller burden

New Lab exports `TabBarSearchTab` and `TabBarMoreList`; `TabBar` gains `minimizeBehavior`, `bottomAccessory` and `moreValue`, and `TabBarItem` gains `isDisabled`. All optional; a bar without them is unchanged.

## Design and alternatives

- Only the person's scrolling counts toward minimizing, as on iOS.
- The search field stays mounted, so the choosing tap can focus it.

## Scope

- [x] One capability is added.
- [x] Unrelated fixes, cleanup, and policy changes were removed or split.
- [x] Consumer docs, focused tests, and migration evidence ship with the feature.
- [x] Public text and artifacts contain no internal Meta context.

## Testing

Local gates at 52ecd8bbdf (on the first batch, over #9399's 7b86fe2c06), node 24.22.1 from `.nvmrc`:

1. **Interaction specs, built Storybook:** Chromium 109/109; WebKit 94 passed, 15 skipped (Chromium-only evidence skips itself), on this tree less one assertion the first batch adds.
2. **Busy main thread:** the slide, collapse and accessory proofs on a two-core pin, one worker, ×10: 30/30 (at 3fe213b31e; this head changes only comments, a no-op effect and a test title).
3. **Accessibility contracts:** the PR selection's always-run specs, 23 files, 106 passed.
4. **Red-first:** with the bar's host a search landmark again, the new count finds two (2/2). Earlier rounds: over a disabled tab, the finger and mouse cases failed on the previous build, with the lens 89 px and 255 px from the selected tab. The first batch's off-bar and mouse-carry cases run here too.
5. **Unit and static:** 182 unit tests (TabBar, its model, its UIKit table's sources, SearchField, the entry, the finger-scroll reader, the CLI official list); Lab typecheck; strict ESLint, 0 problems; Changesets and coverage; i18n runtime; docsite data with the ShadCN route lock.

Still owed before ready: the WebKit CI profile ×10 and the feel check on a phone.

Batch: L1 · Lab: iOS chrome (TabBar, SearchField, NavigationStack, PageControl)

Size: 6,600 added lines, about half tests.

Supersedes #8154, #8172, #8192, #8210, #8222, #8243 and #8248.

Stack: #9399 → {C} → {F} → {A} → this PR.
