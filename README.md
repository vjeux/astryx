# #12486: a collapsed `unfocusedLayer` Tokenizer keeps a tab stop on its placeholder

Stills and measurements of the pull request at **093afdb8b40f027006d8f0f7f4a28dda8b01667a** against main at **ee65f4f0a19daef6456874c171e7ff6018512353**, the pull request's base.

## How they were taken

- **Builds:** the hosted Storybook of the pull request's Vercel preview deployment and of main's production deployment. Each deployment's `version.json` names its commit: `{"commit":"093afdb8b40f027006d8f0f7f4a28dda8b01667a","environment":"preview"}` and `{"commit":"ee65f4f0a19daef6456874c171e7ff6018512353","environment":"production"}`.
- **Browser:** Chromium 149.0.7827.55, full build in new headless mode (Playwright 1.61.1, channel `chromium`), 1280 × 800 at 1×, with a keyboard.
- **Schemes:** light and dark, through the Storybook color-mode global, with the matching `prefers-color-scheme`; neutral theme.
- **Stories:** `core-tokenizer--overflow-layer` (both builds), `core-tokenizer--overflow-layer-states` (added by the pull request: Reviewers is empty, Owners is disabled, Approvers is disabled with a reason), and `core-tokenizer--disabled-with-message` (both builds, as the reference disabled field).
- **Frames:** the page only (the viewport), with nothing of the browser. For frame 2, the screencast keeps the last frame painted before the Tab keydown and each different frame painted after it; a script also records the focused element and the placeholder's styles at the keydown and at each of the next 30 animation frames.

## Measurements

| Step | Light | Dark |
|---|---|---|
| 1. Field box at rest, main | 16,40 400×32 | 16,40 400×32 |
| 1. Field box at rest, pull request | 16,40 400×32 | 16,40 400×32 |
| 1. Pixels that differ, main vs pull request at rest | 0 of 1,024,000 | 0 of 1,024,000 |
| 1. The collapsed placeholder, main | no role, not focusable | no role, not focusable |
| 1. The collapsed placeholder, pull request | role group, tabIndex 0, named "Team Members" | role group, tabIndex 0, named "Team Members" |
| Main, for reference: focus after one Tab | `button`, tabIndex 0, "Remove Alice Johnson", :focus-visible | `button`, tabIndex 0, "Remove Alice Johnson", :focus-visible |
| 2. Focus after one Tab | `input`, role combobox, tabIndex 0, "Team Members", :focus-visible | `input`, role combobox, tabIndex 0, "Team Members", :focus-visible |
| 2. Placeholder after one Tab | role group, tabIndex -1 | role group, tabIndex -1 |
| 2. First animation frame after the keydown | 25.1 ms: input focused, field open (16,40 400×59, 6 tokens) | 16.4 ms: input focused, field open (16,40 400×59, 6 tokens) |
| 2. The open field's ring at full strength | 148.9 ms (`border-color, box-shadow 0.125s cubic-bezier(0.24, 1, 0.4, 1)`) | 136.2 ms (same transition) |
| 2. Frames where the placeholder matches :focus-visible or changes border or shadow | 0 of 31 | 0 of 31 |
| 3. Tab on from Reviewers' input | `div`, role group, tabIndex 0, "Owners", aria-disabled, :focus-visible; the field does not open | `div`, role group, tabIndex 0, "Owners", aria-disabled, :focus-visible; the field does not open |
| 3. Disabled placeholder's ring (border, shadow) | rgb(27, 27, 27), rgb(212, 212, 212) 0px 0px 0px 2px inset | rgb(241, 241, 241), rgb(71, 71, 71) 0px 0px 0px 2px inset |
| 3. Next Tab | `div`, role group, tabIndex 0, "Approvers", aria-disabled, :focus-visible; tooltip "You need edit access to change approvers" above the field | `div`, role group, tabIndex 0, "Approvers", aria-disabled, :focus-visible; same tooltip |
| 3. Approvers' accessible description | "You need edit access to change approvers" | "You need edit access to change approvers" |
| 4. Shift+Tab from the open Team Members field | presses 1–6: the 6 remove buttons inside the open field, last to first (placeholder stays tabIndex −1); press 7: `body` (nothing focused), field closed, placeholder tabIndex 0 | presses 1–6: the 6 remove buttons inside the open field, last to first (placeholder stays tabIndex −1); press 7: `body` (nothing focused), field closed, placeholder tabIndex 0 |
| 4. Shift+Tab from Approvers | 1: `div`, role group, tabIndex 0, "Owners", aria-disabled, :focus-visible; 2: `input`, role combobox, tabIndex 0, "Reviewers", :focus-visible; 3: `body` (nothing focused) | 1: `div`, role group, tabIndex 0, "Owners", aria-disabled, :focus-visible; 2: `input`, role combobox, tabIndex 0, "Reviewers", :focus-visible; 3: `body` (nothing focused) |
| Horizontal overflow (document scrollWidth vs clientWidth; elements past the viewport edge) | 1280 = 1280 and 0 at all 17 steps | 1280 = 1280 and 0 at all 17 steps |
| Page errors | 0 | 0 |

## What the frames show

1. **At rest** the collapsed field draws the same on main and the pull request: the same box (16,40 400×32), the same three tokens and "+3 more", and no pixel differs between the two frames in each scheme. The pull request adds role="group", tabIndex 0 and the label "Team Members" to the placeholder. On main the placeholder takes no focus, and the first Tab lands on the first token's remove button.
2. **Tab into the field.** In the first frame painted after the keydown, the field is open with all six tokens and the caret in the input. The input has focus and matches :focus-visible, and the placeholder has tabIndex −1. The field's ring then fades in with its own 125 ms transition. The placeholder never matches :focus-visible, and its border and shadow stay at rest in every recorded frame, so no ring shows on it. The empty Reviewers field opens the same way.
3. **The disabled fields keep a tab stop.** Tab moves from Reviewers' input to the Owners placeholder and then to the Approvers placeholder. Each one takes focus with aria-disabled and shows the same ring as the open field (the focus border color and a 2 px inset shadow), and neither field opens. On Approvers the reason shows in a tooltip, and the placeholder's aria-describedby carries the same text.
   The tooltip opens above the field, as the inline disabled field's tooltip does when there is room above it. There it covers 39 px of its label's text on main and on the pull request (frames `*-ref-disabled-message-offset-*`, with 180 px of padding added above that story; at the top of its story, the inline tooltip flips below). On Approvers the tooltip covers 10.1 px of the label's text, the final "s".
4. **Shift+Tab back out.** From the open Team Members field, Shift+Tab walks back through the six remove buttons inside the field, and the next press leaves the field, which closes. The placeholder (tabIndex −1 while the field is open) never takes focus on the way out, so focus does not reopen the field. From Approvers, Shift+Tab reaches Owners, then opens Reviewers with focus in its input, then leaves the fields; every field is collapsed again with its placeholder back at tabIndex 0.

Also seen, the same on main: a focused token remove button's ring (2 px outline, 3 px offset) reaches 1 px into its token's text box.

## Frames

### 1. At rest

**light:** [1-rest-main](light-1-rest-main.png) (main: the collapsed field at rest); [1-rest-pr](light-1-rest-pr.png) (the pull request: the collapsed field at rest); [1-rest-states](light-1-rest-states.png) (the pull request: the three collapsed fields at rest)

**dark:** [1-rest-main](dark-1-rest-main.png) (main: the collapsed field at rest); [1-rest-pr](dark-1-rest-pr.png) (the pull request: the collapsed field at rest); [1-rest-states](dark-1-rest-states.png) (the pull request: the three collapsed fields at rest)

### Main, for reference: after one Tab

**light:** [ref-main-tab](light-ref-main-tab.png) (main, for reference: after one Tab from the page start)

**dark:** [ref-main-tab](dark-ref-main-tab.png) (main, for reference: after one Tab from the page start)

### 2. Tab into the Team Members field (screencast, then settled)

**light:** [2-tab-in-f00-minus397ms](light-2-tab-in-f00-minus397ms.png) (last paint before the Tab keydown); [2-tab-in-f01-plus39ms](light-2-tab-in-f01-plus39ms.png) (painted 39 ms after the Tab keydown); [2-tab-in-f02-plus46ms](light-2-tab-in-f02-plus46ms.png) (painted 46 ms after the Tab keydown); [2-tab-in-f03-plus57ms](light-2-tab-in-f03-plus57ms.png) (painted 57 ms after the Tab keydown); [2-tab-in-f04-plus73ms](light-2-tab-in-f04-plus73ms.png) (painted 73 ms after the Tab keydown); [2-tab-in-f05-plus89ms](light-2-tab-in-f05-plus89ms.png) (painted 89 ms after the Tab keydown); [2-tab-in-f06-plus106ms](light-2-tab-in-f06-plus106ms.png) (painted 106 ms after the Tab keydown); [2-tab-in-f07-plus123ms](light-2-tab-in-f07-plus123ms.png) (painted 123 ms after the Tab keydown); [2-tab-in-f08-plus139ms](light-2-tab-in-f08-plus139ms.png) (painted 139 ms after the Tab keydown); [2-tab-in-f09-plus156ms](light-2-tab-in-f09-plus156ms.png) (painted 156 ms after the Tab keydown); [2-tab-in-settled](light-2-tab-in-settled.png) (the pull request: one Tab from the page start, settled)

**dark:** [2-tab-in-f00-minus397ms](dark-2-tab-in-f00-minus397ms.png) (last paint before the Tab keydown); [2-tab-in-f01-plus28ms](dark-2-tab-in-f01-plus28ms.png) (painted 28 ms after the Tab keydown); [2-tab-in-f02-plus41ms](dark-2-tab-in-f02-plus41ms.png) (painted 41 ms after the Tab keydown); [2-tab-in-f03-plus57ms](dark-2-tab-in-f03-plus57ms.png) (painted 57 ms after the Tab keydown); [2-tab-in-f04-plus74ms](dark-2-tab-in-f04-plus74ms.png) (painted 74 ms after the Tab keydown); [2-tab-in-f05-plus91ms](dark-2-tab-in-f05-plus91ms.png) (painted 91 ms after the Tab keydown); [2-tab-in-f06-plus107ms](dark-2-tab-in-f06-plus107ms.png) (painted 107 ms after the Tab keydown); [2-tab-in-f07-plus124ms](dark-2-tab-in-f07-plus124ms.png) (painted 124 ms after the Tab keydown); [2-tab-in-f08-plus141ms](dark-2-tab-in-f08-plus141ms.png) (painted 141 ms after the Tab keydown); [2-tab-in-f09-plus158ms](dark-2-tab-in-f09-plus158ms.png) (painted 158 ms after the Tab keydown); [2-tab-in-settled](dark-2-tab-in-settled.png) (the pull request: one Tab from the page start, settled)

### 2. Tab into the empty Reviewers field (screencast, then settled)

**light:** [2-states-tab-in-f00-minus396ms](light-2-states-tab-in-f00-minus396ms.png) (last paint before the Tab keydown); [2-states-tab-in-f01-plus22ms](light-2-states-tab-in-f01-plus22ms.png) (painted 22 ms after the Tab keydown); [2-states-tab-in-f02-plus33ms](light-2-states-tab-in-f02-plus33ms.png) (painted 33 ms after the Tab keydown); [2-states-tab-in-f03-plus50ms](light-2-states-tab-in-f03-plus50ms.png) (painted 50 ms after the Tab keydown); [2-states-tab-in-f04-plus66ms](light-2-states-tab-in-f04-plus66ms.png) (painted 66 ms after the Tab keydown); [2-states-tab-in-f05-plus83ms](light-2-states-tab-in-f05-plus83ms.png) (painted 83 ms after the Tab keydown); [2-states-tab-in-f06-plus99ms](light-2-states-tab-in-f06-plus99ms.png) (painted 99 ms after the Tab keydown); [2-states-tab-in-f07-plus116ms](light-2-states-tab-in-f07-plus116ms.png) (painted 116 ms after the Tab keydown); [2-states-tab-in-f08-plus133ms](light-2-states-tab-in-f08-plus133ms.png) (painted 133 ms after the Tab keydown); [2-states-tab-in-f09-plus149ms](light-2-states-tab-in-f09-plus149ms.png) (painted 149 ms after the Tab keydown); [2-states-tab-in-settled](light-2-states-tab-in-settled.png) (Reviewers after one Tab, settled)

**dark:** [2-states-tab-in-f00-minus393ms](dark-2-states-tab-in-f00-minus393ms.png) (last paint before the Tab keydown); [2-states-tab-in-f01-plus46ms](dark-2-states-tab-in-f01-plus46ms.png) (painted 46 ms after the Tab keydown); [2-states-tab-in-f02-plus60ms](dark-2-states-tab-in-f02-plus60ms.png) (painted 60 ms after the Tab keydown); [2-states-tab-in-f03-plus75ms](dark-2-states-tab-in-f03-plus75ms.png) (painted 75 ms after the Tab keydown); [2-states-tab-in-f04-plus93ms](dark-2-states-tab-in-f04-plus93ms.png) (painted 93 ms after the Tab keydown); [2-states-tab-in-f05-plus108ms](dark-2-states-tab-in-f05-plus108ms.png) (painted 108 ms after the Tab keydown); [2-states-tab-in-f06-plus124ms](dark-2-states-tab-in-f06-plus124ms.png) (painted 124 ms after the Tab keydown); [2-states-tab-in-f07-plus142ms](dark-2-states-tab-in-f07-plus142ms.png) (painted 142 ms after the Tab keydown); [2-states-tab-in-f08-plus160ms](dark-2-states-tab-in-f08-plus160ms.png) (painted 160 ms after the Tab keydown); [2-states-tab-in-f09-plus535ms](dark-2-states-tab-in-f09-plus535ms.png) (painted 535 ms after the Tab keydown); [2-states-tab-in-settled](dark-2-states-tab-in-settled.png) (Reviewers after one Tab, settled)

### 3. The disabled fields reached by Tab

**light:** [3-tab-approvers](light-3-tab-approvers.png) (Approvers, disabled, reached by Tab); [3-tab-owners](light-3-tab-owners.png) (Owners, disabled, reached by Tab)

**dark:** [3-tab-approvers](dark-3-tab-approvers.png) (Approvers, disabled, reached by Tab); [3-tab-owners](dark-3-tab-owners.png) (Owners, disabled, reached by Tab)

### 3. Reference: the inline disabled field with a reason

**light:** [ref-disabled-message-main](light-ref-disabled-message-main.png) (main, for reference: the inline disabled field with a message, after one Tab); [ref-disabled-message-offset-main](light-ref-disabled-message-offset-main.png) (main, for reference: the inline disabled field with a message, 180 px lower, after one Tab); [ref-disabled-message-offset-pr](light-ref-disabled-message-offset-pr.png) (the pull request, for reference: the inline disabled field with a message, 180 px lower, after one Tab); [ref-disabled-message-pr](light-ref-disabled-message-pr.png) (the pull request, for reference: the inline disabled field with a message, after one Tab)

**dark:** [ref-disabled-message-main](dark-ref-disabled-message-main.png) (main, for reference: the inline disabled field with a message, after one Tab); [ref-disabled-message-offset-main](dark-ref-disabled-message-offset-main.png) (main, for reference: the inline disabled field with a message, 180 px lower, after one Tab); [ref-disabled-message-offset-pr](dark-ref-disabled-message-offset-pr.png) (the pull request, for reference: the inline disabled field with a message, 180 px lower, after one Tab); [ref-disabled-message-pr](dark-ref-disabled-message-pr.png) (the pull request, for reference: the inline disabled field with a message, after one Tab)

### 4. Shift+Tab back out

**light:** [4-shift-tab-1](light-4-shift-tab-1.png) (the pull request: the first Shift+Tab from the open field); [4-shift-tab-out](light-4-shift-tab-out.png) (the pull request: Shift+Tab press 7, focus out of the field); [4-states-shift-tab-1](light-4-states-shift-tab-1.png) (Shift+Tab press 1 from Approvers); [4-states-shift-tab-2](light-4-states-shift-tab-2.png) (Shift+Tab press 2 from Approvers); [4-states-shift-tab-3](light-4-states-shift-tab-3.png) (Shift+Tab press 3 from Approvers)

**dark:** [4-shift-tab-1](dark-4-shift-tab-1.png) (the pull request: the first Shift+Tab from the open field); [4-shift-tab-out](dark-4-shift-tab-out.png) (the pull request: Shift+Tab press 7, focus out of the field); [4-states-shift-tab-1](dark-4-states-shift-tab-1.png) (Shift+Tab press 1 from Approvers); [4-states-shift-tab-2](dark-4-states-shift-tab-2.png) (Shift+Tab press 2 from Approvers); [4-states-shift-tab-3](dark-4-states-shift-tab-3.png) (Shift+Tab press 3 from Approvers)

## Data

- [measurements.json](measurements.json): every step, with the focused element, each field's box, placeholder, input and open layer, the tooltips, the overflow check, and the per-frame record after each Tab keydown.
- [measurements-offset.json](measurements-offset.json): the tooltip-placement reference and the tooltip's overlap with each label's text.
