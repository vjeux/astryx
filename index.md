# MultiSelector at 50f9716c: each label in the collapsed trigger is isolated

Head: #13244 at 50f9716c000ee9134fb333c1e2c0a838a41a1e25, `head` in file names. Main: eafcbfe61a11cf7f83e8cf963a671fca6383e68a, the head's merge base, `base` in file names. All numbers are test measurements.

- #13244's branch carries #11220 (3450d896), which does not change the trigger. Its trigger stills match main's byte for byte.

## Answer (test)

- On the head, the trigger's items keep their reading order in 12 of 12 sets, on all three pages. On main, 8 of 12 do.
- (1) On the `en` page, "Design, עיצוב, שיווק, +2" now shows, from left to right, Design · עיצוב · שיווק · +2. The count reads "+2".
- On main, the same text shows Design · +2 · שיווק · עיצוב, and the count reads "2+".
- (2) On the `he-IL` page, set D's English run now reads in order: Design, Marketing, Sales, from the right. On main, the run reads in reverse.
- (3) On the `ar-SA` page, the items keep the same order as on main, in 4 of 4 sets.
- One more thing changes on the right-to-left pages: the count's "+" now sits to the left of its digit, as on the `en` page. On main, it sits to the right.
- So the `ar-SA` page is not pixel-identical to main. Only the count's two glyphs swap sides.
- On the head, each label reads in its own direction in 12 of 12 sets. Each of the 36 separators sits between its two items.
- The head inserts no isolation characters. Its trigger text and code points equal main's in 15 of 15 triggers.
- Each item is a `<span dir="auto">` with `unicode-bidi: isolate`, and each separator is plain text between them.
- The count has no strong letter, so its span resolves to left to right. That puts the "+" to the left of its digit.
- When narrow, the trigger still ends in an ellipsis at the end of its line, on both builds and on all three pages.
- On the head, the narrow trigger draws a start of the text on all three pages: "Design, עיצוב" on `en`, then the ellipsis.
- On main's `en` page, the narrow trigger draws "Design", the last letter of "שיווק" and "+2", but not "עיצוב".
- The pull request's "Mixed Direction Labels" story keeps reading order on the head. Its copy on main reorders, like set A.

## The stories

- On the head, the pull request's story `core-multiselector--mixed-direction-labels` is used.
- Main has no such story. So a scratch story, `scratch-story.tsx`, copies its render verbatim, with the MultiSelector stories' 300 px decorator.
- On the head, that copy and the pull request's story give byte-identical frames.
- The Storybook preview always uses the `en` locale, so the `he-IL` and `ar-SA` pages also need the scratch story.
- It renders four sets per page, as in the #11220 take, and a fifth trigger 150 px wide, with set A.
- Each page wraps them in an InternationalizationProvider: `en` with `dir="ltr"`, `he-IL` and `ar-SA` with `dir="rtl"`. It is in neither tree.

## Builds

- Both builds are local Storybook builds, because only a local build can hold the scratch story.
- Main: eafcbfe6, the same commit as main's Production deploy, by its version.json (environment "production").
- Control: on the existing "Trigger Modes" story, the local main build and the Production deploy give byte-identical frames.
- Control: on the pull request's own story, the local head build and the head's preview deploy give byte-identical frames. The preview's version.json reads environment "preview".
- The pull request's head was the same at the start and the end of each run.

## Every set (test)

| Page | Set | Selected, in order | Trigger text, exact (both builds) | Main: items from left to right | Main: in reading order | Head: items from left to right | Head: in reading order | The "+" against its digits: main → head | Head: labels read in their own direction | Head: separators between their items |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `en`, left to right | A | Design, עיצוב, שיווק, Marketing, Sales | "Design, עיצוב, שיווק, +2" | Design · +2 · שיווק · עיצוב | **no** | Design · עיצוב · שיווק · +2 | yes | right → left | yes | yes |
| `en`, left to right | B | עיצוב, Design, שיווק, Marketing, מכירות | "עיצוב, Design, שיווק, +2" | עיצוב · Design · +2 · שיווק | **no** | עיצוב · Design · שיווק · +2 | yes | right → left | yes | yes |
| `en`, left to right | C | עיצוב, שיווק, מכירות, Design, Sales | "עיצוב, שיווק, מכירות, +2" | +2 · מכירות · שיווק · עיצוב | **no** | עיצוב · שיווק · מכירות · +2 | yes | right → left | yes | yes |
| `en`, left to right | D | Design, Marketing, Sales, עיצוב, שיווק | "Design, Marketing, Sales, +2" | Design · Marketing · Sales · +2 | yes | Design · Marketing · Sales · +2 | yes | left → left | yes | yes |
| `he-IL`, right to left | A | Design, עיצוב, שיווק, Marketing, Sales | "Design, עיצוב, שיווק ו-+2" | +2 · שיווק · עיצוב · Design | yes | +2 · שיווק · עיצוב · Design | yes | right → left | yes | yes |
| `he-IL`, right to left | B | עיצוב, Design, שיווק, Marketing, מכירות | "עיצוב, Design, שיווק ו-+2" | +2 · שיווק · Design · עיצוב | yes | +2 · שיווק · Design · עיצוב | yes | right → left | yes | yes |
| `he-IL`, right to left | C | עיצוב, שיווק, מכירות, Design, Sales | "עיצוב, שיווק, מכירות ו-+2" | +2 · מכירות · שיווק · עיצוב | yes | +2 · מכירות · שיווק · עיצוב | yes | right → left | yes | yes |
| `he-IL`, right to left | D | Design, Marketing, Sales, עיצוב, שיווק | "Design, Marketing, Sales ו-+2" | +2 · Design · Marketing · Sales | **no** | +2 · Sales · Marketing · Design | yes | right → left | yes | yes |
| `ar-SA`, right to left | A | Design, تصميم, تسويق, Marketing, Sales | "Design وتصميم وتسويق و+٢" | +٢ · تسويق · تصميم · Design | yes | +٢ · تسويق · تصميم · Design | yes | right → left | yes | yes |
| `ar-SA`, right to left | B | تصميم, Design, تسويق, Marketing, مبيعات | "تصميم وDesign وتسويق و+٢" | +٢ · تسويق · Design · تصميم | yes | +٢ · تسويق · Design · تصميم | yes | right → left | yes | yes |
| `ar-SA`, right to left | C | تصميم, تسويق, مبيعات, Design, Sales | "تصميم وتسويق ومبيعات و+٢" | +٢ · مبيعات · تسويق · تصميم | yes | +٢ · مبيعات · تسويق · تصميم | yes | right → left | yes | yes |
| `ar-SA`, right to left | D | Design, Marketing, Sales, تصميم, تسويق | "Design وMarketing وSales و+٢" | +٢ · Sales · Marketing · Design | yes | +٢ · Sales · Marketing · Design | yes | right → left | yes | yes |

- The text is the trigger's own text, exactly. The items are the three shown labels and the count.
- Reading order is left to right on the `en` page and right to left on the other two pages.
- A label reads in its own direction when its characters run left to right for English, and right to left for Hebrew and Arabic.
- A separator sits between its items when its box comes after the first item's and before the second's, in the page's reading direction.

## The narrow trigger (test)

| Page | Build | Text box, px (content / needed) | Characters drawn before the ellipsis, in text order | Each item | The drawn characters are a start of the text |
| --- | --- | --- | --- | --- | --- |
| `en`, left to right | main | 100 / 144 | "Design, ק, +2" | Design: whole; עיצוב: cut; שיווק: partly: ק; +2: whole | **no** |
| `en`, left to right | head | 100 / 144 | "Design, עיצוב" | Design: whole; עיצוב: whole; שיווק: cut; +2: cut | yes |
| `he-IL`, right to left | main | 100 / 148 | "Design, עיצוב" | Design: whole; עיצוב: whole; שיווק: cut; +2: cut | yes |
| `he-IL`, right to left | head | 100 / 148 | "Design, עיצוב" | Design: whole; עיצוב: whole; שיווק: cut; +2: cut | yes |
| `ar-SA`, right to left | main | 100 / 168 | "Design وتصمي" | Design: whole; تصميم: partly: تصمي; تسويق: cut; +٢: cut | yes |
| `ar-SA`, right to left | head | 100 / 168 | "Design وتصمي" | Design: whole; تصميم: partly: تصمي; تسويق: cut; +٢: cut | yes |

- The ellipsis takes the end of the line: the right on the `en` page, the left on the other two. It is 14 px wide.
- A character counts as drawn when its box lies inside the text box and clear of the ellipsis. The frames agree.

## The pull request's story (test)

| Story | Build | Trigger text | Items from left to right | In reading order | The "+" against its digits |
| --- | --- | --- | --- | --- | --- |
| `core-multiselector--mixed-direction-labels` | head | "Design, עיצוב, שיווק, +2" | Design · עיצוב · שיווק · +2 | yes | left |
| the copy in the scratch story | head | "Design, עיצוב, שיווק, +2" | Design · עיצוב · שיווק · +2 | yes | left |
| the copy in the scratch story | main | "Design, עיצוב, שיווק, +2" | Design · +2 · שיווק · עיצוב | **no** | right |

## The head's markup: `he-IL`, set D (test)

| Child of the text box, in order | Text | dir | unicode-bidi (computed) | Resolved direction |
| --- | --- | --- | --- | --- |
| `<span>` | "Design" | auto | isolate | ltr |
| text | ", " | - | - | - |
| `<span>` | "Marketing" | auto | isolate | ltr |
| text | ", " | - | - | - |
| `<span>` | "Sales" | auto | isolate | ltr |
| text | " ו-" | - | - | - |
| `<span>` | "+2" | auto | isolate | ltr |

## Method

- Chromium 149.0.7827.55 through Playwright, 1280 × 800 at scale 2, light mode.
- The text is every text node in the trigger's text box, in order. Each character's position is the box of a DOM Range around it.
- An item's direction compares its first character's position with its last. The items' order compares their centers.
- Three full runs gave the same readings for every trigger. The second run added the ellipsis, and the third added the head's control.
- All numbers are test measurements from one machine. Every frame was looked at.

## Files

- `trigger--<page>--set<A–D or A-narrow>--<build>.png`: each trigger, with 8 px around it.
- `page--<page>--<build>.png`: each page.
- `mixed-direction-labels--<story or copy>--<build>.png`: the pull request's story and its copy.
- `control--trigger-modes--base--<local|hosted>.png` and `control--mixed-direction-labels--head--<local|hosted>.png`: the control frames.
- `scratch-story.tsx` and `measurements.json`: the story, and every reading with each trigger's code points and markup.
