## User impact

A chat that scrolls the whole page passes `useChatStreamScroll` the document's scroller. There, `scrollToMessage(el)` should put the message at the top of the viewport. On main, the message lands off by the page's own scroll. With the page scrolled 462 px, it sits 462 px above the viewport.

ChatLayout itself does not call `scrollToMessage`. Apps that call the hook directly with a page scroller meet the defect.

## Problem and solution fit

- **Why does it fail?** The hook measures the message from the scroller's box: `elRect.top − containerRect.top + container.scrollTop`. The root element's box moves up by the page's scroll, so the scroll counts twice.
- **Why does it harm the task?** The reader lands away from the message they asked for, often where nothing of it shows.
- **Why does it matter?** `scrollToMessage` is public API. The hook documents it as "Scroll so a specific element is at the top of the visible area."
- **The fix:** for the page's scroller, the hook measures from the viewport's top. An element scroller keeps its own measure.

## Expected behavior and authority

- The hook's public contract for `scrollToMessage`: "Scroll so a specific element is at the top of the visible area. No lock change."
- `component:ChatLayout`, representative state "External `scrollRef`": "The named element may be the document element".

No record changes.

## Smallest restoration

Only `useChatStreamScroll.ts` changes in source. A module helper, `scrollsPage(el)`, now names the page's scroller for both the scroll listener from #10779 and `scrollToMessage`. For the page, the measure starts at 0 instead of the root's box. There is no new API, prop or default. A second, test-only commit moves #10779's page-scroll ChatLayout cases above the next block's banner.

## Evidence

- **Reproduction before the change**, at main 376a483319, which includes #10779: the message's top lands at −462 px in Chromium and −465 px in WebKit. That is minus the page's scroll, in each of 3 runs.
- **Result after the change:** the message's top lands at 0 px, in each of 5 runs per engine.
- **Representative unchanged path:** a unit pins an element scroller's offset, 350 px, on both builds.
- **Mutation-sensitive proof:** two mutants each fail a unit: the page measured from the root's box (2836b6ec60), and every scroller measured from 0 (563a44b995).

## Scope

- [x] One defect is restored.
- [x] Separable contradictory or unsettled tagalongs were removed or split.
- [x] No new public API, visual representation, default, or interaction model is hidden under the bug-fix label.
- [x] Public text and artifacts contain no internal Meta context.

## Testing

- `pnpm exec vitest run --project ui packages/core/src/Chat/`: 498/498 at f6dfa61483. New: a page-scroller case, which fails on main, and an element-scroller case, which passes on both.
- `useChatStreamScrollPage.a11y.browser.spec.ts`, in Chromium and in WebKit: 4/4 in each of 5 runs per engine at f6dfa61483. The new case scrolls the page up with the wheel, then calls `scrollToMessage`. On main it fails with −462 and −465, in each of 3 runs.
- `pnpm exec tsc` and ESLint: clean. `pnpm review:pre`: 0 findings, and the branch merges clean with main.
