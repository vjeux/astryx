Stacked on {C} and {F} (on #9399). Review only this PR's change: https://github.com/vjeux/astryx/compare/a88504b9e42158ea2063ccb88ba59267f9ea6777...b416f9f4868093753575c40e96dc9ef4be46a03d

## User need

Phone apps on Astryx need iOS 26's bottom tab bar: the top-level sections in a floating capsule, with a lens that answers a finger as UIKit's does. A composed tab list ignores a finger's press and drag.

## Evidence

![iOS: taps](https://raw.githubusercontent.com/vjeux/astryx/f535f65f47f12a633ce29cf1479d5439b9e1cdc0/ios-slide.gif) ![iOS: drag](https://raw.githubusercontent.com/vjeux/astryx/f535f65f47f12a633ce29cf1479d5439b9e1cdc0/ios-drag.gif) ![iOS: busy main thread](https://raw.githubusercontent.com/vjeux/astryx/f535f65f47f12a633ce29cf1479d5439b9e1cdc0/ios-slide-busy.gif) ![iOS: Reduce Motion](https://raw.githubusercontent.com/vjeux/astryx/f535f65f47f12a633ce29cf1479d5439b9e1cdc0/ios-l1-reduce-motion.gif) ![Android](https://raw.githubusercontent.com/vjeux/astryx/f535f65f47f12a633ce29cf1479d5439b9e1cdc0/android-l2-drag.gif)

Recorded from the drafts this replaces (iOS 26.2 simulator, Android emulator).

## Problem and solution fit

Under a finger the lens lifts into glass, follows a drag and settles on the tab nearest the lift, on UIKit's springs, while the bar flexes. Under a mouse or a pen a click chooses a tab on the theme's motion; a drag carries the lens on the tracking spring and settles from its speed. Under every pointer, sliding off the bar cancels, and so does a second finger. Choosing the selected tab again calls `onReselect`.

## Current specification

- **Lab:** Lab is not shipped; no spec needed.
- **CLI:** `official-packages.json` is regenerated, so `astryx discover` lists TabBar (`spec:AST-051` FR11).

## Owner decisions

1. `spec:AST-094` FR4: the lens plays UIKit's measured springs from `uikitTabBar.ts`. Open until promotion: non-gesture motion (tap moves) plays the theme's motion tokens; only gesture-driven motion springs from velocity. Lab keeps the UIKit springs while iterating.
2. `spec:AST-017` FR60: under a finger, a copy of the items rides in the lens while it moves. Open until promotion: the moving lens adds 23 elements in the 4-tab Default story while it moves (none at rest); promotion must meet AST-017 FR60 or record an approved exception.

Already decided by the owner: sliding off cancels under every pointer (`family:action-groups` FR3); a mouse or pen drag settles on a spring from its speed (`spec:AST-017` FR59).

Also: Core's `useActionGroupTracking` (through {C}) owns the press, a second finger's cancel and focus after the lift; TabBar draws the lens. `@astryx/disabled-cursor` requires the cursor rule, though no tab is disabled here.

## Public delta and caller burden

New Lab exports `TabBar` and `TabBarItem`, with their props types:

```tsx
<TabBar value={tab} onChange={setTab} onReselect={popToRoot} label="Sections">
  <TabBarItem value="home" label="Home" icon={<Icon icon={HomeIcon} />} />
</TabBar>
```

## Design and alternatives

- The lens runs on Core's motion engine, on the compositor, under a finger and through a mouse or pen drag. A click under a mouse slides it on a CSS transition. No move here is state-change-only, so none uses `createAnimator`.

## Scope

- [x] One capability is added.
- [x] Unrelated fixes, cleanup, and policy changes were removed or split.
- [x] Consumer docs, focused tests, and migration evidence ship with the feature.
- [x] Public text and artifacts contain no internal Meta context.

## Testing

Local gates at b416f9f486 (on the Core part, over #9754's 4e363d85cf), node 24.22.1 from `.nvmrc`:

1. **Interaction specs, built Storybook:** Chromium 47/47; WebKit 39 passed, 8 skipped (Chromium-only evidence: CDP traces, scripted touch times, and a second finger, which Playwright's WebKit can't lift apart).
2. **Red-first, this round:** on the previous head's build, a second finger landing mid-drag let the first finger's lift choose Browse (Chromium), and after a finger's slide focus stayed on Home (both engines). On a build without the shared press's cancel, a press the tab list ended moved focus to Library at the lift (both engines).
3. **Red-first, earlier rounds:** a finger lifted off the bar chose Library (2/2); past the bar's end the lift reselected (2/2); a mouse drag's release never carried past Browse (4/4). A release that reports twice fails the mouse-click case (2/2).
4. **Scene clock:** the drag's chase law, the finger landing before the last lift and the mouse release's carry run on the page freeze, at scripted instants, so a loaded runner can't change them.
5. **Unit and static:** 83 unit tests (TabBar, its model, its UIKit table's sources, Lab's motion-engine hook, the CLI official list); Lab and Core typecheck; strict ESLint and `pnpm lint`, 0 problems; Prettier; Changesets and coverage; docsite data with the ShadCN route lock; `review:pre`.

Still owed before ready: the WebKit CI profile ×10, the busy-main-thread proof ×10 at this head, and the feel check on a phone.

Batch: L1 · Lab: iOS chrome (TabBar, SearchField, NavigationStack, PageControl)

Size: 4,965 added lines, about half tests. Minimize through More follow in a second batch.

Supersedes #8129, #8141 and #8703.

Stack: #9754 → {C} → this PR → {B}.
