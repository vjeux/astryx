# Lab Rating stills (#11082)

Storybook was built from #11082's head `dce1ab30de6766de0b1a70bd97d204692c06a65d` in an offline container, from a fresh clone. Its build stamp reads that SHA. The stills are captured in Chromium 149.0.7827.55 (Playwright 1.61.1).

- Themes: Core is the Storybook theme global `none`. Neutral is the global `neutral`, the Storybook default.
- Modes: light and dark, through the Storybook `colorMode` global.
- Desktop: 1280×800 at device scale 2, with a mouse.
- Phone: a 390×844 Chromium viewport at device scale 3, with touch emulation. `(pointer: coarse)` matches. This is not phone evidence.
- Each still is cropped to the story's content, with 16 px of margin.
- File names: `rating-<state>-<theme>-<mode>-<viewport>.png`.

## Empty (value null)

`lab-rating--interactive` at load. All five stars are unchecked, and the story reads "Not rated".

- `rating-empty-core-light-desktop.png`
- `rating-empty-core-dark-desktop.png`
- `rating-empty-neutral-light-desktop.png`
- `rating-empty-neutral-dark-desktop.png`
- `rating-empty-core-light-phone.png`
- `rating-empty-core-dark-phone.png`
- `rating-empty-neutral-light-phone.png`
- `rating-empty-neutral-dark-phone.png`

## Partial (read-only 4.3) and read-only

`lab-rating--read-only-average` at load. It is the only read-only story. It shows 4.3 (md) and 2.5 (sm), named "Average rating: 4.3 of 5 stars" and "Average rating: 2.5 of 5 stars".

- `rating-partial-read-only-core-light-desktop.png`
- `rating-partial-read-only-core-dark-desktop.png`
- `rating-partial-read-only-neutral-light-desktop.png`
- `rating-partial-read-only-neutral-dark-desktop.png`
- `rating-partial-read-only-core-light-phone.png`
- `rating-partial-read-only-core-dark-phone.png`
- `rating-partial-read-only-neutral-light-phone.png`
- `rating-partial-read-only-neutral-dark-phone.png`

## Full (5 of 5)

`lab-rating--interactive` after a click (desktop) or a tap (phone) on star 5. No story starts at 5. Star 5 is checked, and the story reads "5 of 5". The star has focus but not focus-visible, so it shows no ring.

- `rating-full-core-light-desktop.png`
- `rating-full-core-dark-desktop.png`
- `rating-full-neutral-light-desktop.png`
- `rating-full-neutral-dark-desktop.png`
- `rating-full-core-light-phone.png`
- `rating-full-core-dark-phone.png`
- `rating-full-neutral-light-phone.png`
- `rating-full-neutral-dark-phone.png`

## Hover preview on star 3 (desktop only)

`lab-rating--interactive` at load, with the mouse resting on star 3. Star 3 matches `:hover`, and stars 1 to 3 show the preview fill.

- `rating-hover-star-3-core-light-desktop.png`
- `rating-hover-star-3-core-dark-desktop.png`
- `rating-hover-star-3-neutral-light-desktop.png`
- `rating-hover-star-3-neutral-dark-desktop.png`

## Keyboard focus-visible on the checked star

`lab-rating--sizes` at load, then Tab twice. Focus is on the Medium rating's star 3, which is checked and matches `:focus-visible`.

- `rating-focus-visible-checked-core-light-desktop.png`
- `rating-focus-visible-checked-core-dark-desktop.png`
- `rating-focus-visible-checked-neutral-light-desktop.png`
- `rating-focus-visible-checked-neutral-dark-desktop.png`
- `rating-focus-visible-checked-core-light-phone.png`
- `rating-focus-visible-checked-core-dark-phone.png`
- `rating-focus-visible-checked-neutral-light-phone.png`
- `rating-focus-visible-checked-neutral-dark-phone.png`

## Disabled (rated)

`lab-rating--states` at load. The "Disabled" rating has `aria-disabled="true"` and value 2. The same story shows "Ten stars", 7 of 10.

- `rating-disabled-rated-core-light-desktop.png`
- `rating-disabled-rated-core-dark-desktop.png`
- `rating-disabled-rated-neutral-light-desktop.png`
- `rating-disabled-rated-neutral-dark-desktop.png`
- `rating-disabled-rated-core-light-phone.png`
- `rating-disabled-rated-core-dark-phone.png`
- `rating-disabled-rated-neutral-light-phone.png`
- `rating-disabled-rated-neutral-dark-phone.png`

## RTL read-only fraction

`lab-rating--read-only-average` with the Storybook `direction` global set to `rtl`. Core, light, desktop only. The story's English caption reorders by bidi rules ("(reviews 128) 4.3"). That is the story's text, not the Rating.

- `rating-rtl-read-only-core-light-desktop.png`

## Not captured

- Hover on the phone viewport: not requested. The hover preview is behind `(hover: hover)`, which a coarse pointer does not match.
- RTL in other themes, modes or viewports: one RTL case was requested.
