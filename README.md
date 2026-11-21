# useTruncation example: Text's own tooltip

#13143 at 3f3c8d8f3f68289ad11a5f76cc861abfdc9e1c3b (head) against its merge base, 395ef28a89ebbddb3e84250eaccc7921201d2548 (main). It covers the template block "useTruncation — Tooltip on Cut-Off Text", on the sandbox page that renders it. All results are from test runs.

## Builds

- Main: the hosted production deploy of 395ef28a, checked by its version.json.
- Head: the hosted preview of 3f3c8d8f, checked by its version.json.
- The page is `/sandbox/templates/useTruncationHookUsage/` on each build.

## (a) Console

On both builds, in light and dark, the page logs no console message, no page error and no failed request.

## (b) and (c) Mouse hover

| Cell | Main: tooltips on mouse hover | Head: tooltips on mouse hover |
| --- | --- | --- |
| `build-…/index.html` (cut to one line) | one, reading "artifacts/release/build-20261103-120344/index.html" | one, reading "artifacts/release/build-20261103-120344/index.html" |
| `reports/coverage/…` (clamped to two lines) | one, reading "reports/coverage/packages/core/src/components/Calendar/index.html" | one, reading "reports/coverage/packages/core/src/components/Calendar/index.html" |
| `README.md` (fits) | none | none |

- At rest and on each hover, the head frames are byte-identical to main, in light and in dark.
- On the head, the tooltip is Text's own: the example no longer uses Tooltip.

## aria-describedby

| Cell | Main | Head |
| --- | --- | --- |
| `build-…/index.html` (cut to one line) | From the load: on the span, to a tooltip reading "artifacts/release/build-20261103-120344/index.html". | None at load. From the first hover: on the span, to a tooltip reading "artifacts/release/build-20261103-120344/index.html". It stays after the hover ends. |
| `reports/coverage/…` (clamped to two lines) | From the load: on the span, to a tooltip reading "reports/coverage/packages/core/src/components/Calendar/index.html". | None at load. From the first hover: on the span, to a tooltip reading "reports/coverage/packages/core/src/components/Calendar/index.html". It stays after the hover ends. |
| `README.md` (fits) | From the load: on the span, to a tooltip reading "README.md". | None, at load, while hovered, or after. |

- At load, main has 3 tooltips in the page, one per path cell, and the head has 0.
- On main, the README.md cell's tooltip never shows, but its `aria-describedby` still points to it.
- On the head, Text adds its tooltip and the `aria-describedby` on the first hover. Both stay after the hover; the tooltip is hidden again.

## Keyboard

Main, from a fresh load:
- Tabs 1 to 6: the sandbox toolbar's 6 buttons.
- Tab 7: the cut cell's span (`tabindex="0"`); tooltips shown: one, reading "artifacts/release/build-20261103-120344/index.html".
- Tab 8: the clamped cell's span (`tabindex="0"`); tooltips shown: one, reading "reports/coverage/packages/core/src/components/Calendar/index.html".
- Tab 9: focus leaves the page.

Head, from a fresh load:
- Tabs 1 to 6: the sandbox toolbar's 6 buttons.
- Tab 7: focus leaves the page.

On the head, no cell takes focus, so the keyboard shows no tooltip.

## Light and dark

Every reading above is the same in light and in dark. The frames show both modes.

## Method

- Desktop Chromium 149.0.7827.55 through Playwright, 1280 × 900 px, at device pixel ratio 2.
- Dark uses the sandbox's own stored mode, the one its toolbar's mode button writes, set before the page loads. The page then reports a dark color scheme.
- A tooltip counts when an element with `role="tooltip"` is drawn: it has a size and is not hidden or transparent.
- Hover: the mouse rests on the cell's text for 1.2 s and then moves away for 1.2 s.
- `aria-describedby` is read on every element in the cell, at load, while hovered and after the hover. Each target is found by its id.
- Keyboard: a fresh load, then Tab, up to 14 times or until focus leaves the page. After each Tab, a 1.2 s wait, then the focused element and the drawn tooltips are read.
- Console: every console message, page error and failed request, from the load to the end.
- Every frame was looked at.

## Frames

Contact sheets: [mouse, light](sheets/light-mouse.png) and [mouse, dark](sheets/dark-mouse.png), main on the left and head on the right; [keyboard on main, light](sheets/light-keyboard-main.png) and [keyboard on main, dark](sheets/dark-keyboard-main.png).

In [frames/](frames/), each name is `<build>-<mode>-<step>.png`, where the step is `rest`, `hover-<cell>` or `tab<n>`. The raw readings are in [results.json](results.json).
