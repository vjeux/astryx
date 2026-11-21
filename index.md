# MultiSelector at 3450d896: mixed-direction labels in the collapsed trigger

Head: #11220 at 3450d8963b2ce9e85429824b988d97cd1da30ac7, `head` in file names. Base: main at eafcbfe61a11cf7f83e8cf963a671fca6383e68a, the head's merge base, `base` in file names. All numbers are test measurements.

## Answer (test)

- This pull request does not change the collapsed trigger. Its trigger text code is the same on both builds.
- All 12 trigger stills and all 3 page frames are byte-identical between the builds. So every finding below holds on both.
- Each label reads in its own direction in 12 of 12 triggers. Nothing clips: every trigger text is one line inside its box.
- The trigger text has no bidi isolation. No trigger text holds a directional mark or an isolate.
- On the `en` page, the items keep their order only when no Hebrew label shows: 1 of 4 sets.
- There, set A "Design, עיצוב, שיווק, +2" shows, from left to right, as Design, +2, שיווק, עיצוב.
- In sets A, B and C of the `en` page, the "+" sits to the right of its digit. So the count reads "2+".
- Set C, all Hebrew, shows fully reversed, with the count at the far left.
- On the `he-IL` page, 3 of 4 sets keep their order, with "ו-" before the count.
- In set D there, the three English labels form one left-to-right run. So, read from right to left, they come in reverse: Sales, Marketing, Design.
- On the `ar-SA` page, all 4 sets keep their order. The Arabic conjunction "و" is a strong right-to-left letter, and it stands between every two items.
- On `ar-SA`, the count uses Arabic-Indic digits: "+٢".

## The story

- No MultiSelector story has mixed-direction selections, and the Storybook has no locale setting. So a scratch story is used: `scratch-story.tsx`.
- It is in neither tree. It renders four MultiSelectors per page with the labels display, which shows three labels and a count.
- Each page wraps them in an InternationalizationProvider: `en` with `dir="ltr"`, `he-IL` and `ar-SA` with `dir="rtl"`. The page direction matches.
- Each set puts labels of one direction side by side in a different place. Set D shows only English labels.

## Builds

- Both builds are local Storybook builds, because only a local build can hold the scratch story.
- Base: eafcbfe6, the same commit as main's Production deploy, by its version.json (environment "production").
- Control: on the existing "Trigger Modes" story, the local base build and the Production deploy give byte-identical frames.
- The head's preview deploy was still building during the run, so it has no control.
- The pull request's head was the same at the start and the end of the run.

## Every trigger (test)

| Page | Set | Selected, in order | Trigger text, exact | Items from left to right | Items in reading order | Labels read in their own direction | Separators between their items | The "+" against its digits | Clipped |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `en`, left to right | A | Design, עיצוב, שיווק, Marketing, Sales | "Design, עיצוב, שיווק, +2" | Design · +2 · שיווק · עיצוב | **no** | yes | yes, no, no | to their right | no |
| `en`, left to right | B | עיצוב, Design, שיווק, Marketing, מכירות | "עיצוב, Design, שיווק, +2" | עיצוב · Design · +2 · שיווק | **no** | yes | yes, yes, no | to their right | no |
| `en`, left to right | C | עיצוב, שיווק, מכירות, Design, Sales | "עיצוב, שיווק, מכירות, +2" | +2 · מכירות · שיווק · עיצוב | **no** | yes | no, no, no | to their right | no |
| `en`, left to right | D | Design, Marketing, Sales, עיצוב, שיווק | "Design, Marketing, Sales, +2" | Design · Marketing · Sales · +2 | yes | yes | yes, yes, yes | to their left | no |
| `he-IL`, right to left | A | Design, עיצוב, שיווק, Marketing, Sales | "Design, עיצוב, שיווק ו-+2" | +2 · שיווק · עיצוב · Design | yes | yes | yes, yes, yes | to their right | no |
| `he-IL`, right to left | B | עיצוב, Design, שיווק, Marketing, מכירות | "עיצוב, Design, שיווק ו-+2" | +2 · שיווק · Design · עיצוב | yes | yes | yes, yes, yes | to their right | no |
| `he-IL`, right to left | C | עיצוב, שיווק, מכירות, Design, Sales | "עיצוב, שיווק, מכירות ו-+2" | +2 · מכירות · שיווק · עיצוב | yes | yes | yes, yes, yes | to their right | no |
| `he-IL`, right to left | D | Design, Marketing, Sales, עיצוב, שיווק | "Design, Marketing, Sales ו-+2" | +2 · Design · Marketing · Sales | **no** | yes | no, no, yes | to their right | no |
| `ar-SA`, right to left | A | Design, تصميم, تسويق, Marketing, Sales | "Design وتصميم وتسويق و+٢" | +٢ · تسويق · تصميم · Design | yes | yes | yes, yes, yes | to their right | no |
| `ar-SA`, right to left | B | تصميم, Design, تسويق, Marketing, مبيعات | "تصميم وDesign وتسويق و+٢" | +٢ · تسويق · Design · تصميم | yes | yes | yes, yes, yes | to their right | no |
| `ar-SA`, right to left | C | تصميم, تسويق, مبيعات, Design, Sales | "تصميم وتسويق ومبيعات و+٢" | +٢ · مبيعات · تسويق · تصميم | yes | yes | yes, yes, yes | to their right | no |
| `ar-SA`, right to left | D | Design, Marketing, Sales, تصميم, تسويق | "Design وMarketing وSales و+٢" | +٢ · Sales · Marketing · Design | yes | yes | yes, yes, yes | to their right | no |

- The text is the trigger's own text node, exactly. The items are the three shown labels and the count.
- "Items in reading order" is left to right on the `en` page and right to left on the other two pages.
- A label reads in its own direction when its characters run left to right for English, and right to left for Hebrew and Arabic.
- A separator sits between its items when its box comes after the first item's and before the second's, in the page's reading direction.

## Head against base (test)

| Page | Page frame, head against base | Trigger stills, head against base | Readings, head against base |
| --- | --- | --- | --- |
| `en`, left to right | byte-identical | 4 of 4 byte-identical | 4 of 4 equal |
| `he-IL`, right to left | byte-identical | 4 of 4 byte-identical | 4 of 4 equal |
| `ar-SA`, right to left | byte-identical | 4 of 4 byte-identical | 4 of 4 equal |

## Method

- Chromium 149.0.7827.55 through Playwright, 1280 × 800 at scale 2, light mode.
- The list text comes from `Intl.ListFormat` with a narrow conjunction. Only `en` holds the count message, so the other locales use it too.
- Each character's position is the box of a DOM Range around that one character.
- An item's direction compares its first character's position with its last. The items' order compares their centers.
- All numbers are test measurements from one machine. Every frame was looked at.

## Files

- `trigger--<page>--set<A–D>--<build>.png`: each trigger, with 8 px around it.
- `page--<page>--<build>.png`: each page.
- `control--trigger-modes--base--<local|hosted>.png`: the control frames.
- `scratch-story.tsx` and `measurements.json`: the story, and every reading with each trigger's code points.
