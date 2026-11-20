# Docsite hook pages: Parameters and Returns tables, before and after hydration

Sites: the production docsite and the canary docsite, both at b07619f1809137ee21921922562f90969bf08d1e for the frames. Some later checks ran at b9329f65ad, as Builds says. Browser: Chromium at 1280 × 800, light color scheme. `prod` and `canary` in file names name the two sites.

## Answer

- Yes. On both sites, `/components/useAnimator` shows its Parameters and Returns tables after hydration.
- No page logged a console error or a page error.
- The tables match `useAnimator.doc.mjs`. Parameters has `ref`, required, of type `RefObject<HTMLElement | null>`. Returns has `animator`, of type `AnimatorHandle`.
- In the HTML that a browser gets, the content area holds only the page heading and a loading placeholder. The client then renders the Overview from the page's own props.
- The cause is on the docsite side, and it is by design. The data is complete, and #9832 is not involved.
- Four hook pages work this way on both sites: useAnimator, useCombobox, useDragToSnapPoints and usePanGesture.
- The other 79 hook pages on the production docsite, and 85 on the canary docsite, have their tables in the HTML.

## Why the tables are not in the HTML

- A component page has tabs when it has a playground, a theming tab or an accessibility tab. The theming tab is on the canary docsite only.
- With tabs, the Overview renders inside a Suspense boundary. The component inside it reads the URL's search parameters.
- That is `ComponentDetailClient.tsx`, lines 247 to 263 and 404 to 478.
- The docsite builds with `cacheComponents: true`. So that boundary is a hole in the prerendered page, which holds only the boundary's fallback.
- `static-shell.test.ts`, lines 10 to 14, describes this. The code comment on the boundary says it keeps "the page heading and every component with no tabs" in the prerendered shell.
- `useAnimator.doc.mjs` lists two accessibility entries, so its page has an Accessibility tab.
- `useMediaQuery.doc.mjs` lists no accessibility entries and has no playground, so its Overview is in the HTML.
- The other hook docs with accessibility entries are useCombobox, useDragToSnapPoints and usePanGesture. Their pages behave like useAnimator's.
- So do the factory pages createAnimator, createDragToSnapPoints and createPanGesture, and createSwipe on the canary docsite. The production docsite returns 404 for createSwipe.

## Why #9832 is not the cause

- #9832 filters hooks out of the preview registry's lazy component map, which renders live previews. A hook renders nothing to preview.
- That is `generate-data.mjs`, lines 1330 and 1331. It does not change the hook doc data: the page props carry useAnimator's params and returns.
- The tabbed boundary dates from #5548, on 2026-08-31.
- `useAnimator.doc.mjs` has had its accessibility list since #8653 added the file, on 2026-11-03. #9832 merged on 2026-11-19.

## (1) useAnimator, with JavaScript off and on

| Site | JavaScript | Content headings | Parameters | Returns | Console errors |
| --- | --- | --- | --- | --- | --- |
| Production docsite | off | none: the title and a loading placeholder | none | none | 0 |
| Production docsite | on | Usage, Best practices, Parameters, Returns, Examples | `ref`, required: `RefObject<HTMLElement \| null>` | `animator`: `AnimatorHandle` | 0 |
| Canary docsite | off | none: the title and a loading placeholder | none | none | 0 |
| Canary docsite | on | Usage, Best practices, Parameters, Returns, Examples, Use with shadcn | as on production | as on production | 0 |

- With JavaScript on, both pages show a tab row, Overview and Accessibility, above Usage.
- On useAnimator, the Parameters heading appears 0.42 to 0.82 s after DOMContentLoaded on production. On canary it appears 0.66 to 0.94 s after. That is three loads each.
- On useMediaQuery, the heading is in the HTML. It exists 60 to 135 ms before DOMContentLoaded, in all six loads.
- No load sent a React Server Components request. The Overview comes from data that is already in the page.
- In the frames run, every page with JavaScript on logged one warning: a preloaded style sheet was not used within a few seconds.
- Each of those pages also had one aborted request, to `/api/search`. useMediaQuery shows the same warning and the same aborted request.
- With JavaScript off, Chromium blocks the webpack runtime script. That is the one failed request on every page.

## What each client gets

The production docsite's `/components/useAnimator`, at b07619f180:

| Client | Edge cache | Document bytes | Overview HTML | Params in the page props |
| --- | --- | --- | --- | --- |
| Chromium | HIT | 464,177 | no | yes |
| curl, each of 7 header sets | BYPASS | 507,748 | yes, at the end, in a hidden element | yes |

- curl got the full server render each time. Its Overview comes at the end of the document, in a hidden element that an inline script moves into place.
- A parser that runs no script, or skips hidden elements, sees only the title in that response.
- Chromium got the cached prerender. It holds the placeholder and the page props, but no Overview HTML.
- The 7 header sets are three user agents, a compressed request, `Accept: text/html` with and without compression, and a full set of browser headers.

## Hook pages on each site

- The sweep took every `/components/use…` link on each site's component index. It fetched each page with curl, at b07619f180.
- Production docsite: 83 hook pages. 79 have their tables in the HTML; some of those have only one of the two tables. The other 4 have them only in a hidden streamed chunk.
- Canary docsite: 89 hook pages. 85 have their tables in the HTML, and the same 4 have them in a hidden chunk.
- In Chromium, each tabbed page below got no table HTML. Then it rendered both tables after hydration, with no console error.

| Page | Production docsite, rows in Parameters / Returns | Canary docsite, rows in Parameters / Returns |
| --- | --- | --- |
| useAnimator | 1 / 1 | 1 / 1 |
| useCombobox | 12 / 10 | 12 / 10 |
| useDragToSnapPoints | 5 / 1 | 5 / 1 |
| usePanGesture | 4 / 1 | 4 / 1 |
| createAnimator | 1 / 7 | 1 / 7 |
| createDragToSnapPoints | 5 / 2 | 5 / 2 |
| createPanGesture | 4 / 1 | 4 / 1 |
| createSwipe | 404 | 3 / 1 |

- useAnimator ran at b07619f180. The other pages ran at b9329f65ad, after both sites moved to it.

## (2) Stills at the tables

- `prod--useMediaQuery--params.png`: Parameters, with `query`, required, of type `string`. Returns, with `matches`, of type `boolean`.
- `canary--useMediaQuery--params.png`: the same two tables on the canary docsite.
- `canary--useMediaPlayer--params.png`: Returns, 6 rows. They are `state`, `play / pause / togglePaused`, `seek / seekBy`, `setVolume / setMuted / toggleMuted`, `setPlaybackRate` and `toggleFullscreen / setTextTrack / toggleCaptions / reload`.
- `canary--useMediaPlaybackTime--params.png`: Returns, 1 row, `time`, of type `number`.
- That still is cropped to 1280 × 440, just below the table.
- The two Lab hooks take no parameters. Their pages have a Returns table and no Parameters table, so their stills show Returns.
- Both Lab hooks are on the canary docsite only. The production docsite returns 404 for each.
- `<site>--useAnimator--top--no-js.png`: JavaScript off. The page shows the title, the package line and the loading placeholder.
- `<site>--useAnimator--top.png` and `<site>--useAnimator--params.png`: JavaScript on. They show the tab row and Usage, then the Parameters and Returns tables.
- `<site>--useMediaQuery--top--no-js.png` and `<site>--useMediaQuery--params--no-js.png`: JavaScript off. The tables are already there.
- `<site>--useMediaQuery--top.png`, `canary--useMediaPlayer--top.png` and `canary--useMediaPlaybackTime--top.png`: JavaScript on, the top of each page.
- Each params still puts the Parameters or Returns heading 52 px below the sticky header, except useMediaPlaybackTime's. That page ends before its heading can scroll that far.
- The header ends at 48 px on production, and at 112 px on canary, which also shows a banner.

## Builds

- Production docsite: `version.json` gives commit b07619f1809137ee21921922562f90969bf08d1e, environment `production`.
- Canary docsite: `version.json` gives the same commit, environment `preview`. Its deployment record for this commit is from 14:43:40Z. Before that it served 5ebe00f5b273a253c8b5b76ecdf6c5fb5eead74d.
- Each page's asset URLs carry a deployment id. That deployment's own `version.json` gives the commit above. `measurements.json` lists the ids.
- The pages print no Next.js build id. Each page's package line gives the package version.
- That is `@astryxdesign/core` v0.7.16 on production and v0.7.17 on canary. The Lab pages give `@astryxdesign/lab` v0.1.9.
- Later both sites moved to b9329f65ad200d7d13177b385992914c5d748397. Its deployment records are from 14:59:22Z on canary and 15:03:58Z on production.
- That commit changes none of the files cited here. The other tabbed pages and the timing loads ran on it.

## Method

- Chrome for Testing 149.0.7827.55, through Playwright 1.61.1. Viewport 1280 × 800, scale 1, light color scheme.
- Each page loads twice, with JavaScript off and on, each in a new browser context. The harness waits for network idle, then 1.5 s.
- It then reads the headings and tables, and records console messages, page errors and failed requests.
- It also checks the document for a Parameters heading, the hook's params in the page props, and hidden streamed chunks.
- Timing: a mutation observer records when a "Parameters" heading first exists, from the navigation start. There are three loads per page.
- Times on 2026-11-20: frames from 14:57:16Z to 14:57:59Z, other tabbed pages from 15:10Z to 15:12Z, and timing from 15:13Z to 15:14Z.
- The hook-page sweep ran from 14:46Z to 14:49Z. The curl comparison ran at about 14:52Z.
- All numbers are test measurements: hosted sites over this machine's network, one machine.
- Box load average (1 min), on 166 cores: about 7 during the frames, and about 25 during the timing loads. It was 49 to 53 during the other tabbed pages.

## Files

- The 18 stills above, from the frames run.
- `measurements.json`: every page load's numbers, the sweep, the responses by client, the timing loads, the builds and the cited source lines.
