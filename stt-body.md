Stacked on #9700 (on #9699, on #9754). Review only this PR's change: https://github.com/vjeux/astryx/compare/be8f19a555e128b354112c30ed76a41756c08957...26fb25208e4c935e796ba6d3166130f6e965cd91

## User need

On iOS, tapping the tab you are already on brings that section back to its top. TabBar reports the reselect (`onReselect`), but each app then has to find the section's scroll area and animate it, and a wrong guess scrolls the page or another region.

## Problem and solution fit

Choosing the selected tab again, by a tap, a click or a key, now scrolls that tab's own scroll area to its top. TabBar finds the panel through the tab's `panelId` and scrolls the panel itself when it scrolls vertically, or else the first element inside it that does. A row that scrolls only sideways, such as filter chips, is skipped. Nothing else scrolls: not the page, not the other panels, not any other scroll area. The area glides to the top; under Reduce Motion it jumps. `onReselect` is still called, so an app can also return the tab's navigation stack to its root.

## Current specification

- **Lab:** Lab is not shipped; no spec needed.
- **Owner request (2026-11-04):** "tap the current tab to scroll to top … scrolls only the active tab's own scroll area."

## Public delta and caller burden

No new props. A tab that names its panel (`panelId`) now scrolls that panel on reselect; a tab without one behaves as before. A caller puts each section's content in a ScrollableArea inside its panel, or makes the panel the scroll area:

```tsx
<div id="panel-home" role="tabpanel" aria-label="Home">
  <ScrollableArea label="Home">{rows}</ScrollableArea>
</div>
<TabBarItem value="home" label="Home" icon={<Icon icon={HomeIcon} />} panelId="panel-home" />
```

## Design and alternatives

- It scrolls the scroll area's own element with the browser's smooth scroll, as Core's Carousel does (`smooth`, or an instant jump under Reduce Motion), so Core needs no change.
- Rejected: a ref per tab for its scroll area (more for the caller, while `panelId` already names the panel for `aria-controls`), and scrolling the document (it would move scrollers outside the tab).

## Evidence

The new Scroll To Top story: each panel has a sideways row of chips over its list. Scroll Home down, then choose Home again: Home's list glides to its top, and the pinned scroller above stays put.

## Scope

- [x] One capability is added.
- [x] Unrelated fixes, cleanup, and policy changes were removed or split.
- [x] Consumer docs, focused tests, and migration evidence ship with the feature.
- [x] Public text and artifacts contain no internal Meta context.

## Testing

Local gates at 26fb25208e, node 24.22.1 from `.nvmrc`:

1. **Red-first, built Storybook, 2/2 in each engine,** on two not-for-landing builds. Without the TabBar change (6cced548b0), a tap on the selected tab left its panel at 800 px, and so did a click; the glide and the Reduce Motion jump never reached the top. With an earlier lookup that took the first `overflow-y: auto` element (3f2556f707), the chips row above the list was taken, and the same four cases stayed at 800. The control, choosing another tab scrolls nothing, passed on every build.
2. **Interaction specs:** TabBar's, Chromium 57/57 and WebKit 49 passed, 8 skipped (Chromium-only evidence); AlertDialog's, 12/12 in each engine.
3. **Units:** 89 (TabBar, its model and UIKit table, Lab's internal hooks, the CLI official list). The scroll cases fail on the previous TabBar.tsx, and the sideways-row case fails on the earlier lookup. CLI node suite: 326.
4. **Static:** Lab typecheck; strict ESLint on the changed files, 0 problems; `pnpm lint`, 0 errors; Prettier; `review:pre`.
