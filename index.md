# Fields after the merge with main: TextInput, TextArea and NumberInput, main and head

Main: c701ba4280dfb4d5e5f5c66b64eae864b208ce60. Head: #11450 at 0d40640ed4c98a9d4e880f17dd1d032dcdbcf1f5, `pr` in file names. The head is the pull request's previous head, decd6b372c, merged with this main.

## Answer

- In all 48 conditions the head's page is byte-identical to main's: 0 pixels over pixelmatch threshold 0.1, and every pixel equal.
- The computed styles of each control and of the element that draws its border are the same on both builds.
- That is 25 properties for each of the two, in every condition.
- So the merge carries main's field styles. Nothing differs at rest, focused by keyboard or by pointer, or disabled, in light or dark, at 1280 or 390.
- Focus: one Tab press, or a click or tap, focuses the control with `:focus-visible` on both builds, in every focus condition.
- Disabled: every disabled control has `aria-disabled="true"` on both builds. By design these fields do not set the native `disabled` attribute.
- Control: the same 48 conditions with main against main give byte-identical pages in 48 of 48, so these captures are deterministic.

## What the merge carries

- The pull request's previous head, decd6b372c, was based on main 5815d02bf5. Since then main has changed `Field/inputStyles.stylex.ts`, `NumberInput.tsx` and `ContextMenu.tsx`.
- At the head, the `Field/` folder, `inputStyles.stylex.ts` included, is byte-identical to main's. So is `ContextMenu.tsx`, which these stills do not show.
- `TextInput.tsx`, `TextArea.tsx` and `NumberInput.tsx` differ from main's only by the deferred-keyboard hook. Each calls `useDeferredMobileKeyboard(ref)` instead of `useMobileKeyboard(ref)`.
- Each also renders the part the new hook returns. That part is `null` until the touch loader has loaded it. Then it is a component that calls `useMobileKeyboard` and renders `null`.

## Builds

- Main: the production deploy of c701ba4280, by its version.json (environment "production").
- Head: the preview deploy of 0d40640ed4, by its version.json (environment "preview"). No local build was used.

## Method

- Stories: `core-textinput--default`, `core-textarea--default` and `core-numberinput--default` for rest and focus. `core-textinput--disabled`, `core-textarea--disabled` and `core-numberinput--disabled` for disabled.
- The story files are the same in both builds.
- At rest: no focus, the pointer at the page's top-left corner. Focused by keyboard: one Tab press. Disabled: the Disabled story.
- Focused by pointer: a click at the control's center, then the pointer moves away (1280), or a tap at its center (390).
- Each page settles before the state: network idle, fonts ready, then 1 s. A focus state is captured 600 ms after the press.
- Screenshots of the viewport, with animations finished and the caret hidden. Mode: the Storybook global `colorMode` and the page's color scheme.
- Chromium (Playwright 1.61.1, Chrome for Testing 149.0.7827.55). 1280: 1280×800, mouse, scale 1. 390: 390×844, touch, scale 2.
- Pixel counts use pixelmatch at threshold 0.1 over the whole page. "Byte-identical" compares the screenshots' pixels exactly.
- Styles: 25 computed properties of the control (`input` or `textarea`), and of the closest ancestor with a border or a box shadow, the field's box.
- All numbers are test measurements: hosted builds over this machine's network, one machine. Box load average (1 min): about 4 to 6 during the run, on 166 cores.

## Pixels over threshold, head against main (whole page)

| Component | State | 1280, light | 1280, dark | 390, light | 390, dark |
| --- | --- | --- | --- | --- | --- |
| TextInput | At rest | 0 (identical) | 0 (identical) | 0 (identical) | 0 (identical) |
| TextInput | Focused by keyboard (Tab) | 0 (identical) | 0 (identical) | 0 (identical) | 0 (identical) |
| TextInput | Focused by pointer (click or tap) | 0 (identical) | 0 (identical) | 0 (identical) | 0 (identical) |
| TextInput | Disabled | 0 (identical) | 0 (identical) | 0 (identical) | 0 (identical) |
| TextArea | At rest | 0 (identical) | 0 (identical) | 0 (identical) | 0 (identical) |
| TextArea | Focused by keyboard (Tab) | 0 (identical) | 0 (identical) | 0 (identical) | 0 (identical) |
| TextArea | Focused by pointer (click or tap) | 0 (identical) | 0 (identical) | 0 (identical) | 0 (identical) |
| TextArea | Disabled | 0 (identical) | 0 (identical) | 0 (identical) | 0 (identical) |
| NumberInput | At rest | 0 (identical) | 0 (identical) | 0 (identical) | 0 (identical) |
| NumberInput | Focused by keyboard (Tab) | 0 (identical) | 0 (identical) | 0 (identical) | 0 (identical) |
| NumberInput | Focused by pointer (click or tap) | 0 (identical) | 0 (identical) | 0 (identical) | 0 (identical) |
| NumberInput | Disabled | 0 (identical) | 0 (identical) | 0 (identical) | 0 (identical) |

## The field's box, 1280 (main and head)

The element that draws the border, on both builds; each value is the same on main and head.

| Component | State | Mode | Border color | Box shadow | Background | Opacity | Cursor |
| --- | --- | --- | --- | --- | --- | --- | --- |
| TextInput | At rest | light | rgb(212, 212, 212) | none | rgb(255, 255, 255) | 1 | text |
| TextInput | At rest | dark | rgb(82, 82, 82) | none | rgb(38, 38, 38) | 1 | text |
| TextInput | Focused by keyboard (Tab) | light | rgb(27, 27, 27) | rgb(212, 212, 212) 0px 0px 0px 2px inset | rgb(255, 255, 255) | 1 | text |
| TextInput | Focused by keyboard (Tab) | dark | rgb(241, 241, 241) | rgb(71, 71, 71) 0px 0px 0px 2px inset | rgb(38, 38, 38) | 1 | text |
| TextInput | Focused by pointer (click or tap) | light | rgb(27, 27, 27) | rgb(212, 212, 212) 0px 0px 0px 2px inset | rgb(255, 255, 255) | 1 | text |
| TextInput | Focused by pointer (click or tap) | dark | rgb(241, 241, 241) | rgb(71, 71, 71) 0px 0px 0px 2px inset | rgb(38, 38, 38) | 1 | text |
| TextInput | Disabled | light | rgb(212, 212, 212) | none | rgb(255, 255, 255) | 1 | default |
| TextInput | Disabled | dark | rgb(82, 82, 82) | none | rgb(38, 38, 38) | 1 | default |
| TextArea | At rest | light | rgb(212, 212, 212) | none | rgb(255, 255, 255) | 1 | text |
| TextArea | At rest | dark | rgb(82, 82, 82) | none | rgb(38, 38, 38) | 1 | text |
| TextArea | Focused by keyboard (Tab) | light | rgb(27, 27, 27) | rgb(212, 212, 212) 0px 0px 0px 2px inset | rgb(255, 255, 255) | 1 | text |
| TextArea | Focused by keyboard (Tab) | dark | rgb(241, 241, 241) | rgb(71, 71, 71) 0px 0px 0px 2px inset | rgb(38, 38, 38) | 1 | text |
| TextArea | Focused by pointer (click or tap) | light | rgb(27, 27, 27) | rgb(212, 212, 212) 0px 0px 0px 2px inset | rgb(255, 255, 255) | 1 | text |
| TextArea | Focused by pointer (click or tap) | dark | rgb(241, 241, 241) | rgb(71, 71, 71) 0px 0px 0px 2px inset | rgb(38, 38, 38) | 1 | text |
| TextArea | Disabled | light | rgb(212, 212, 212) | none | rgb(255, 255, 255) | 1 | default |
| TextArea | Disabled | dark | rgb(82, 82, 82) | none | rgb(38, 38, 38) | 1 | default |
| NumberInput | At rest | light | rgb(212, 212, 212) | none | rgb(255, 255, 255) | 1 | text |
| NumberInput | At rest | dark | rgb(82, 82, 82) | none | rgb(38, 38, 38) | 1 | text |
| NumberInput | Focused by keyboard (Tab) | light | rgb(27, 27, 27) | rgb(212, 212, 212) 0px 0px 0px 2px inset | rgb(255, 255, 255) | 1 | text |
| NumberInput | Focused by keyboard (Tab) | dark | rgb(241, 241, 241) | rgb(71, 71, 71) 0px 0px 0px 2px inset | rgb(38, 38, 38) | 1 | text |
| NumberInput | Focused by pointer (click or tap) | light | rgb(27, 27, 27) | rgb(212, 212, 212) 0px 0px 0px 2px inset | rgb(255, 255, 255) | 1 | text |
| NumberInput | Focused by pointer (click or tap) | dark | rgb(241, 241, 241) | rgb(71, 71, 71) 0px 0px 0px 2px inset | rgb(38, 38, 38) | 1 | text |
| NumberInput | Disabled | light | rgb(212, 212, 212) | none | rgb(255, 255, 255) | 1 | default |
| NumberInput | Disabled | dark | rgb(82, 82, 82) | none | rgb(38, 38, 38) | 1 | default |

- Opacity and cursor are the control's. No page scrolls sideways in any condition (0).

## Files

- `<component>--<state>--<viewport>--<mode>--main.png`, `--pr.png` and `--diff.png`: the story root with a 12 px margin, at the viewport's scale.
- States: `rest`, `focus-keyboard`, `focus-pointer` and `disabled`. Viewports: `desktop` (1280) and `phone` (390).
- `measurements.json`: every condition's pixel counts, computed styles, focus state and boxes, and the control run's pixel counts.
