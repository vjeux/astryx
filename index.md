# MultiSelector at 999d1e0c: the labels trigger keeps mixed-direction labels in order

Head: #13244 at 999d1e0c58fa50ccf1bacdaf44cfd6f1d34f06a1, the pull request after a merge of main. All numbers are test measurements.

## Answer (test)

- Chromium: both stories keep their labels in list order on an LTR page and on an RTL page, in 4 of 4 frames.
- Each Latin label reads left to right, and each Hebrew label right to left. No bidi control characters are added.
- In the en story, the count keeps its form, "+" left of "2", on both pages.
- In the Hebrew story, the count takes the Hebrew locale's direction in Chromium: "+" right of "2", on both pages.
- Against the earlier take at 56917358, both shared frames are pixel-identical: 0 px, with equal text, code points and character boxes.
- So neither the labels' new markup nor main's merge, #11220 included, changes these frames.
- Firefox: the labels keep their list order too, in 4 of 4 frames, and the en story's count keeps "+" left of "2".
- In Firefox, the Hebrew story's count has "+" left of "2" on both pages, where Chromium has it right of "2".

## Why Firefox differs (test)

- The count span takes its `dir` from the locale's direction, which `getLocaleDirection` reads from `Intl.Locale`.
- That helper reads `getTextInfo()`, or the older `textInfo` accessor. It returns `ltr` when neither gives a direction.
- In Chromium 149.0.7827.55, `getTextInfo()` gives `rtl` for he-IL and ar-SA. In Firefox 151.0, neither `getTextInfo` nor `textInfo` exists.
- So in Firefox, the Hebrew story's count span gets `dir="ltr"`, and Chromium's gets `dir="rtl"`.
- The pull request does not change `getLocaleDirection`. It now uses it for the count.

## What changed in the markup

- At 56917358, every label had `dir="auto"`. At 999d1e0c, a Latin label has `dir="ltr"`, and a Hebrew label has no `dir`.
- Every label span keeps `unicode-bidi: isolate`. The count span keeps the locale's direction.

| Browser | Story | Page | Label and count spans |
| --- | --- | --- | --- |
| Chromium (earlier take, 56917358) | Mixed direction labels (en) | ltr | `Design` dir=auto; `עיצוב` dir=auto; `שיווק` dir=auto; `+2` dir=ltr |
| Chromium (earlier take, 56917358) | Mixed direction labels, Hebrew | rtl | `Design` dir=auto; `עיצוב` dir=auto; `שיווק` dir=auto; `+2` dir=rtl |
| Chromium (999d1e0c) | Mixed direction labels (en) | ltr | `Design` dir=ltr; `עיצוב` no dir; `שיווק` no dir; `+2` dir=ltr |
| Chromium (999d1e0c) | Mixed direction labels (en) | rtl | `Design` dir=ltr; `עיצוב` no dir; `שיווק` no dir; `+2` dir=ltr |
| Chromium (999d1e0c) | Mixed direction labels, Hebrew | ltr | `Design` dir=ltr; `עיצוב` no dir; `שיווק` no dir; `+2` dir=rtl |
| Chromium (999d1e0c) | Mixed direction labels, Hebrew | rtl | `Design` dir=ltr; `עיצוב` no dir; `שיווק` no dir; `+2` dir=rtl |
| Firefox (999d1e0c) | Mixed direction labels (en) | ltr | `Design` dir=ltr; `עיצוב` no dir; `שיווק` no dir; `+2` dir=ltr |
| Firefox (999d1e0c) | Mixed direction labels (en) | rtl | `Design` dir=ltr; `עיצוב` no dir; `שיווק` no dir; `+2` dir=ltr |
| Firefox (999d1e0c) | Mixed direction labels, Hebrew | ltr | `Design` dir=ltr; `עיצוב` no dir; `שיווק` no dir; `+2` dir=ltr |
| Firefox (999d1e0c) | Mixed direction labels, Hebrew | rtl | `Design` dir=ltr; `עיצוב` no dir; `שיווק` no dir; `+2` dir=ltr |

## Every frame (test)

| Browser | Story | Page | Trigger text | Bidi controls | Items, visual order | Each label reads | Separators between their items | The count |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Chromium | Mixed direction labels (en) | ltr | Design, עיצוב, שיווק, +2 | none | in list order | ltr, rtl, rtl, ltr | 3 of 3 | "+" left of "2" |
| Chromium | Mixed direction labels (en) | rtl | Design, עיצוב, שיווק, +2 | none | in list order | ltr, rtl, rtl, ltr | 3 of 3 | "+" left of "2" |
| Chromium | Mixed direction labels, Hebrew | ltr | Design, עיצוב, שיווק ו-+2 | none | in list order | ltr, rtl, rtl, rtl | 3 of 3 | "+" right of "2" |
| Chromium | Mixed direction labels, Hebrew | rtl | Design, עיצוב, שיווק ו-+2 | none | in list order | ltr, rtl, rtl, rtl | 3 of 3 | "+" right of "2" |
| Firefox | Mixed direction labels (en) | ltr | Design, עיצוב, שיווק, +2 | none | in list order | ltr, rtl, rtl, ltr | 3 of 3 | "+" left of "2" |
| Firefox | Mixed direction labels (en) | rtl | Design, עיצוב, שיווק, +2 | none | in list order | ltr, rtl, rtl, ltr | 3 of 3 | "+" left of "2" |
| Firefox | Mixed direction labels, Hebrew | ltr | Design, עיצוב, שיווק ו-+2 | none | in list order | ltr, rtl, rtl, ltr | 3 of 3 | "+" left of "2" |
| Firefox | Mixed direction labels, Hebrew | rtl | Design, עיצוב, שיווק ו-+2 | none | in list order | ltr, rtl, rtl, ltr | 3 of 3 | "+" left of "2" |

## Against the earlier take at 56917358 (test, Chromium)

| Story | Page | Pixels that differ, full frame | Text and code points | Character boxes | Order | The count |
| --- | --- | --- | --- | --- | --- | --- |
| Mixed direction labels (en) | ltr | 0 | equal | equal | equal | "+" left of "2" → "+" left of "2" |
| Mixed direction labels, Hebrew | rtl | 0 | equal | equal | equal | "+" right of "2" → "+" right of "2" |

- The earlier take is the published index for 56917358. b287bfb9 merged main into it with the same change.
- Only these two story and page pairs were in the earlier take.

## Builds

- The head is its preview deploy, by its version.json (environment "preview"). It was the same at the start and the end of the run.
- The pull request's own change at 999d1e0c is byte-identical to its previous head 8a31b59c's, in all 9 of its files.

## Method

- Chromium 149.0.7827.55 and Firefox 151.0 through Playwright, 1280 × 800 px at scale 2, light.
- The page direction comes from the Storybook `direction` global.
- The reader is the one from the earlier takes, unchanged. It reads a Range box for each character across every text node of the trigger.
- It also reads the exact text, its code points, any bidi control characters, and the markup of the label and count spans.
- The items' visual order sorts them by their centres, from the page's start side. The count's form compares the "+" glyph's box with the digit's.
- Every frame was looked at.

## Files

- `trigger--<story>--<page>--<browser>.png`: each trigger with 8 CSS px around it.
- `measurements.json`: every reading, the comparison with the earlier take, and the locale-direction readings.
