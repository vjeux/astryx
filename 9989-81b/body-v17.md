Stack: #8677 → #10094 → #9989

Behavior module: the resize controller's pane reveal.

## User need

A resizable LayoutPanel jumps shut and open, and a pull past a limit stops dead, which reads as a bug. `spec:AST-105` FR9 slides it, under every pointer (FR5).

## Problem and solution fit

- A LayoutPanel with a `useResizable` region slides closed and open, the content beside it on the same motion: `collapse()`, `expand()`, keys, a double-click, a controlled `isCollapsed`, or a drag's lift.
- A pull past either limit follows with resistance and springs back from the release velocity.
- The lift decides a close: below `collapsedSize`, or a flick that would rest below it, slides shut from the release velocity; anything else returns to the minimum.
- A press on the handle where it shows mid-slide takes the handle.
- Known gap: grabbing the handle mid-slide on iOS lands on content until the glide hit-test fix lands.
- Reduce Motion lands at once.

## Current specification

`component:Resizable` FR8 and `component:LayoutPanel` FR7; `spec:AST-105` FR5, FR9.

## Public delta and caller burden

No prop, option or export; persistence and ARIA values keep to the limits. Desktop change: the glide applies under every pointer (`spec:AST-105` FR5; `spec:AST-017` FR59), a specs decision of Oct 31 (#8783). Changeset: `[feat]`.

## Design and alternatives

- The panel lends its element to the region (internal `resizablePane.ts`), in a layout Effect (`architecture:react-component-runtime` INV6).
- Core's rubber band, `VelocityTracker`, projection and `springs.settle`, with no new constants; the close seeds the shared glide with them.
- The handle stacks above the content; a glide's translate had trapped its z-index.
- Rejected: a touch-only gate (FR5); closing mid-drag.

## Evidence

- iOS 26.2 Simulator, 24 repeated finger drags past both limits, closing and reopening: every lift heard, no cancel. [Recording](https://raw.githubusercontent.com/vjeux/astryx/ae50a9414438540c677e43c0e27410d3812b0332/9989-81b/ios-repeated-drags-81b.gif), [MP4](https://raw.githubusercontent.com/vjeux/astryx/ae50a9414438540c677e43c0e27410d3812b0332/9989-81b/ios-repeated-drags-81b.mp4).
- Chromium touch, 450 random drags (151 mid-slide): none stuck; each browser cancel was a touch off the moving handle (harness latency) or where the Layout clips it.

Human check: the owner's card 81b.

## Writing rubric results

Over `component:Resizable` and `component:LayoutPanel`: the FR8 and FR7 gaps go. FR8's rubber band and lift close: "Owner direction, Nov 5 2026 (Cindy): rubber band at the limits on both sides, so hitting a limit doesn't read as a bug"; their mechanism (close decided on lift, resistance below the minimum, the iPadOS Split View model): Specs decision, Nov 5 2026.

- R3 evidence: rows name tests.
- R1, R2, R4–R6: none.

## Scope

- [x] One capability is added.
- [x] Unrelated fixes, cleanup, and policy changes were removed or split.
- [x] Consumer docs, focused tests, and migration evidence ship with the feature.
- [x] Public text and artifacts contain no internal Meta context.

## Testing

On #10094 at ad835149c7, over #8677. Over the card-81 head fcf5bcb25b, seven commits: the handle's stacking (red first), the rubber band and the lift's close (red first), FR8, and the separator's value at its bounds (red first).

- Local checks at f4e392cf08: `CI=true pnpm lint` (0 errors), core typecheck, the Resizable, Layout, motion, Collapsible, TreeList, SideNav, AppShell, Table, BottomSheet and gestures units (3,970 passed), check:knowledge, check:changesets, the CLI goldens (44 passed); Chromium and WebKit `paneSlide` (16 passed each). At this head: the Resizable units (299 passed) and core typecheck.
- Red first: at the test commit, 9 of the 141 cases in `useResizable.test.ts`, `useResizableForms.test.tsx` and `paneReveal.test.tsx` fail. On fcf5bcb25b's build, `paneSlide`'s six new cases fail in Chromium (a press mid-slide lands on the content; no rubber band; the close plays mid-drag). The separator case fails before its fix.
- The random-drag stress logs each drag's events and the handle's place at its pointerdown.
