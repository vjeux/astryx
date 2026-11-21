# Link at f265062c: a link in running text is underlined at rest

Proposed: #11146 at f265062ced31669f926cb1f0302defd38cb262fc (draft). Current: main at 0ed091c8b8c7d4b0af48a9b68507618e73227892, on its Production deploy. All numbers are test measurements.

## Answer (test)

- (1) A paragraph with an inline link: Current draws no underline at rest, in all 5 themes, light and dark. Proposed underlines the link in all 10.
- (2) Markdown with `components={{link: Link}}`: Current draws no underline at rest, and Proposed underlines the link, in all 10.
- Markdown's own default link (core-markdown--inline-display) is underlined on both builds already. Its frames are pixel-identical between Current and Proposed.
- (3) A standalone link has no underline at rest on either build. Its crop is pixel-identical between Current and Proposed in all 20 pairs.
- The standalone link's crop is also pixel-identical against the head's merge base in all 10 stock pairs.
- In the stock stories, the only pixels that differ between Current and Proposed are the new underline's.
- Context: in Stone, Gothic and Matcha, a link's colour is its text's colour, in light and dark, on both builds. Its weight is the same too.
- So on Current, nothing sets a link in a paragraph apart from its text at rest, in 6 of the 10 pairs. Neutral's link differs by 1.22:1 or less.
- The new underline matches a Link with `hasUnderline` (core-link--with-underline) on Current, in 10 of 10 theme and scheme pairs.
- It has the same computed decoration and the same 2 device-pixel rows, at the same place under the text.

## Themes

- "Stock" is the Storybook theme None (base tokens): the library's own defaults, with no theme.
- The others are Neutral (the Storybook default), Stone, Gothic and Matcha, each in light and dark.

## Stories

- `core-link--in-running-text`: the pull request's new story, on Proposed. It holds all three cases in one frame.
- On Current, a verbatim copy of it runs as `zz-linkinrunningtext--in-running-text`, in a local build of main. The copy is in neither tree.
- `core-link--inline-with-text`, `core-markdown--inline-display` and `core-link--standalone`: stock stories on both builds, hosted. They give cases 1, 2 and 3.

## Builds

- Proposed: the preview deploy of f265062c, by its version.json (environment "preview").
- Current: the Production deploy of 0ed091c8, by its version.json (environment "production").
- The local build of 0ed091c8 adds only the scratch story. Against the hosted build, it gives pixel-identical frames in 12 of 12 checks.
- Those checks are the three stock stories in Neutral and Gothic, light and dark.
- The head's merge base, 2535488b, is a control for case 3, at its Production deploy. Current is 187 commits past it.
- The version.json files and the pull request's head were the same at the start and the end of each run.
- Main has moved on since. Its newer commits do not change Link, Markdown, Text or the themes' tokens.

## A link's colour against the text around it (test)

| Theme | Scheme | Link colour | Text colour around it | Link against text | Same on both builds |
| --- | --- | --- | --- | --- | --- |
| Neutral | light | rgb(27, 27, 27) | rgb(0, 0, 0) | 1.22:1 | yes |
| Neutral | dark | rgb(241, 241, 241) | rgb(255, 255, 255) | 1.13:1 | yes |
| Stock = None (base tokens) | light | rgb(0, 100, 224) | rgb(10, 19, 23) | 3.49:1 | yes |
| Stock = None (base tokens) | dark | rgb(62, 158, 251) | rgb(223, 226, 229) | 2.16:1 | yes |
| Stone | light | rgb(37, 37, 42) | rgb(37, 37, 42) | 1:1 | yes |
| Stone | dark | rgb(240, 240, 249) | rgb(240, 240, 249) | 1:1 | yes |
| Gothic | light | rgb(232, 241, 246) | rgb(232, 241, 246) | 1:1 | yes |
| Gothic | dark | rgb(232, 241, 246) | rgb(232, 241, 246) | 1:1 | yes |
| Matcha | light | rgb(62, 72, 29) | rgb(62, 72, 29) | 1:1 | yes |
| Matcha | dark | rgb(192, 203, 169) | rgb(192, 203, 169) | 1:1 | yes |

- The link is the one in `core-link--inline-with-text`. The text colour is its parent's computed colour.
- When colour alone marks a link, WCAG technique `G183` asks for 3:1 against the text around it, and another cue on hover and focus. Only Stock in light mode reaches the 3:1.

## The pull request's story: Current against Proposed (test)

| Theme | Scheme | Case | Link width, device px | Current (main, local) | Proposed (#11146) | Proposed against Current, px |
| --- | --- | --- | --- | --- | --- | --- |
| Neutral | light | (1) paragraph | 184 | none | underline: 2 rows, widest 185 px | 370 |
| Neutral | light | (2) Markdown | 176 | none | underline: 2 rows, widest 144 px | 288 |
| Neutral | light | (3) standalone | 1120 | none | none | 0 |
| Neutral | dark | (1) paragraph | 184 | none | underline: 2 rows, widest 185 px | 370 |
| Neutral | dark | (2) Markdown | 176 | none | underline: 2 rows, widest 144 px | 288 |
| Neutral | dark | (3) standalone | 1120 | none | none | 0 |
| Stock = None (base tokens) | light | (1) paragraph | 184 | none | underline: 2 rows, widest 185 px | 370 |
| Stock = None (base tokens) | light | (2) Markdown | 176 | none | underline: 2 rows, widest 144 px | 288 |
| Stock = None (base tokens) | light | (3) standalone | 1120 | none | none | 0 |
| Stock = None (base tokens) | dark | (1) paragraph | 184 | none | underline: 2 rows, widest 185 px | 370 |
| Stock = None (base tokens) | dark | (2) Markdown | 176 | none | underline: 2 rows, widest 144 px | 288 |
| Stock = None (base tokens) | dark | (3) standalone | 1120 | none | none | 0 |
| Stone | light | (1) paragraph | 184 | none | underline: 2 rows, widest 185 px | 370 |
| Stone | light | (2) Markdown | 176 | none | underline: 2 rows, widest 144 px | 288 |
| Stone | light | (3) standalone | 1120 | none | none | 0 |
| Stone | dark | (1) paragraph | 184 | none | underline: 2 rows, widest 185 px | 370 |
| Stone | dark | (2) Markdown | 176 | none | underline: 2 rows, widest 144 px | 288 |
| Stone | dark | (3) standalone | 1120 | none | none | 0 |
| Gothic | light | (1) paragraph | 210 | none | underline: 2 rows, widest 211 px | 422 |
| Gothic | light | (2) Markdown | 201 | none | underline: 2 rows, widest 163 px | 326 |
| Gothic | light | (3) standalone | 1120 | none | none | 0 |
| Gothic | dark | (1) paragraph | 210 | none | underline: 2 rows, widest 211 px | 422 |
| Gothic | dark | (2) Markdown | 201 | none | underline: 2 rows, widest 163 px | 326 |
| Gothic | dark | (3) standalone | 1120 | none | none | 0 |
| Matcha | light | (1) paragraph | 210 | none | underline: 2 rows, widest 211 px | 422 |
| Matcha | light | (2) Markdown | 201 | none | underline: 2 rows, widest 163 px | 326 |
| Matcha | light | (3) standalone | 1120 | none | none | 0 |
| Matcha | dark | (1) paragraph | 210 | none | underline: 2 rows, widest 211 px | 422 |
| Matcha | dark | (2) Markdown | 201 | none | underline: 2 rows, widest 163 px | 326 |
| Matcha | dark | (3) standalone | 1120 | none | none | 0 |

- "Rows" are the device-pixel rows under the link that change when its underline is forced off. "Widest" is the most pixels that change in one row.
- The underline's antialiased ends can reach one pixel past the link's box. In Markdown, the underline skips the descender of "g", so fewer pixels change.

## Stock stories (test)

| Theme | Scheme | Case | Link width, device px | Current (main) | Proposed (#11146) | Merge base | Proposed against Current, px |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Neutral | light | (1) paragraph | 184 | none | underline: 2 rows, widest 185 px | none | 370 |
| Neutral | light | (2) Markdown | 221 | underline: 2 rows, widest 222 px | underline: 2 rows, widest 222 px | underline: 2 rows, widest 222 px | 0 |
| Neutral | light | (3) standalone | 201 | none | none | none | 0 |
| Neutral | dark | (1) paragraph | 184 | none | underline: 2 rows, widest 185 px | none | 370 |
| Neutral | dark | (2) Markdown | 221 | underline: 2 rows, widest 222 px | underline: 2 rows, widest 222 px | underline: 2 rows, widest 222 px | 0 |
| Neutral | dark | (3) standalone | 201 | none | none | none | 0 |
| Stock = None (base tokens) | light | (1) paragraph | 184 | none | underline: 2 rows, widest 185 px | none | 370 |
| Stock = None (base tokens) | light | (2) Markdown | 221 | underline: 2 rows, widest 222 px | underline: 2 rows, widest 222 px | underline: 2 rows, widest 222 px | 0 |
| Stock = None (base tokens) | light | (3) standalone | 201 | none | none | none | 0 |
| Stock = None (base tokens) | dark | (1) paragraph | 184 | none | underline: 2 rows, widest 185 px | none | 370 |
| Stock = None (base tokens) | dark | (2) Markdown | 221 | underline: 2 rows, widest 222 px | underline: 2 rows, widest 222 px | underline: 2 rows, widest 222 px | 0 |
| Stock = None (base tokens) | dark | (3) standalone | 201 | none | none | none | 0 |
| Stone | light | (1) paragraph | 184 | none | underline: 2 rows, widest 185 px | none | 370 |
| Stone | light | (2) Markdown | 234 | underline: 2 rows, widest 235 px | underline: 2 rows, widest 235 px | underline: 2 rows, widest 235 px | 0 |
| Stone | light | (3) standalone | 201 | none | none | none | 0 |
| Stone | dark | (1) paragraph | 184 | none | underline: 2 rows, widest 185 px | none | 370 |
| Stone | dark | (2) Markdown | 234 | underline: 2 rows, widest 235 px | underline: 2 rows, widest 235 px | underline: 2 rows, widest 235 px | 0 |
| Stone | dark | (3) standalone | 201 | none | none | none | 0 |
| Gothic | light | (1) paragraph | 210 | none | underline: 2 rows, widest 211 px | none | 422 |
| Gothic | light | (2) Markdown | 260 | underline: 4 rows, widest 262 px | underline: 4 rows, widest 262 px | underline: 4 rows, widest 262 px | 0 |
| Gothic | light | (3) standalone | 230 | none | none | none | 0 |
| Gothic | dark | (1) paragraph | 210 | none | underline: 2 rows, widest 211 px | none | 422 |
| Gothic | dark | (2) Markdown | 260 | underline: 4 rows, widest 262 px | underline: 4 rows, widest 262 px | underline: 4 rows, widest 262 px | 0 |
| Gothic | dark | (3) standalone | 230 | none | none | none | 0 |
| Matcha | light | (1) paragraph | 210 | none | underline: 2 rows, widest 211 px | none | 422 |
| Matcha | light | (2) Markdown | 260 | underline: 4 rows, widest 262 px | underline: 4 rows, widest 262 px | underline: 4 rows, widest 262 px | 0 |
| Matcha | light | (3) standalone | 230 | none | none | none | 0 |
| Matcha | dark | (1) paragraph | 210 | none | underline: 2 rows, widest 211 px | none | 422 |
| Matcha | dark | (2) Markdown | 260 | underline: 4 rows, widest 262 px | underline: 4 rows, widest 262 px | underline: 4 rows, widest 262 px | 0 |
| Matcha | dark | (3) standalone | 230 | none | none | none | 0 |

## Method

- Chromium 149.0.7827.55 through Playwright, 1280 × 800 px at scale 2.
- The theme comes from the Storybook `astryxTheme` global, and the scheme from `colorMode`.
- Rest state only: the pointer rests at the page's corner, with no hover and no focus.
- Each frame is taken when three screenshots in a row are identical.
- Each link is shot at rest, then again with `text-decoration-line: none` forced on that link alone. The rows that change between the two are its underline.
- The computed `text-decoration-line` of each link is in measurements.json, with its thickness, offset and colour.
- Every frame was looked at. All numbers are test measurements from one machine.

## Files

- `running-text--<theme>--<scheme>--current-vs-proposed.png`: the pull request's story, Current on the left and Proposed on the right.
- `stock-stories--<theme>--<scheme>--current-vs-proposed.png`: the three stock stories, top to bottom, Current on the left and Proposed on the right.
- `measurements.json`: every reading, the case-3 pairs and the run's start and end lines.
