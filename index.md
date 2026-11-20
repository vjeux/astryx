# Citation at ab745726: the preflight, and the number badge at enlarged text

Head: #12461 at ab745726c13d8c720c56add081c8f040fc66028d, `ab745726` in file names. Its parent, the pull request's previous head, is 0252d110adf7da2783412b6e678d1d982a66e266, `0252d110` in file names. Main: b9329f65ad200d7d13177b385992914c5d748397, the merge base, `main` in file names.

## Answer

- `pnpm preflight --browser` at ab745726 passes every check and prints "ready to flip". It also says that CI can run more for this change, and that CI decides.
- `CitationTextSize.interaction.browser.spec.ts` passes both of its cases there.
- Its enlarged-text case requires each citation's text to pass the citation's box by at most 1 px, at the top and at the bottom.
- The spec prints no measured values, only pass or fail. So the values below come from a harness that reads each citation as the spec does, on the same story.
- In that case, the number badge at ab745726 is 48 px tall, and its text box is 44 px tall.
- Above is −2 px and below is −2 px: the text sits 2 px inside the badge's top and bottom.
- At 0252d110 the same badge is 60 px tall, with −8 and −8. On main it stays 20 px, and its text passes it by 12 px at the top and the bottom.

## The preflight at ab745726

```
CHECK              RESULT  TIME  NOTE
review:pre         PASS      0s  checklist above
build              PASS    131s
typecheck          PASS    427s
lint               PASS     43s
vitest ui          PASS    369s
vitest node        PASS    720s
knowledge          PASS      8s
changesets         PASS      1s
storybook build    PASS     73s
a11y specs         PASS    162s
interaction specs  PASS      7s

ready to flip
CI can run more for this change than the checks above: whole-repository lint and its text and comment checks, the build tests, and the browser, visual, WebKit, accessibility and docsite jobs. CI decides.
Preflight reproduces the pre-review checklist and CI checks; a reviewer still judges the change.
```

- The a11y specs ran 111 tests, and all passed.
- The interaction specs ran this pull request's `CitationTextSize` spec, and both tests passed.
- They are "at the default text size each citation keeps its 20 px height" and "a label larger than the pill grows the pill".

## Each citation against its text, in px

The spec's enlarged text: `font-size: 40px` and `line-height: 60px` on each citation, with the spacing sizes unchanged.

| Build | Number badge: height, above, below | Each label: height, above, below |
| --- | --- | --- |
| main | 20, 12, 12 | 20, 20, 20 |
| 0252d110 | 60, −8, −8 | 60, 0, 0 |
| ab745726 | 48, −2, −2 | 60, 0, 0 |

- Above is the box's top minus the text's top. Below is the text's bottom minus the box's bottom. The spec requires both to be at most 1.
- ab745726 sizes the badge from its own digits: `max(--spacing-5, calc(1em + 2 * --spacing-1))`.
- 0252d110 sized it from the line: `max(--spacing-5, 1lh)`. So at 40 px text the badge is now 40 + 2 × 4 = 48 px, not the 60 px line.
- At the default text size, every citation is 20 px tall on all three builds. The badge's text sits 3 px inside it, at the top and the bottom.
- At the default text size, the three builds' stills are pixel-identical.
- At 200% root text, the badge is 40 px tall on all three builds, with −6 and −7. The spacing sizes are rem, so they grow with the text.

## The same reading on the spec's own build

- The preflight built Storybook at ab745726, and the spec ran on that build.
- Served locally, that build gives the same values as the hosted preview: 12 of 12 citation rows are equal.

## Builds

- main: the production deploy of b9329f65ad, by its version.json (environment "production").
- 0252d110: its preview deploy, by its version.json (environment "preview").
- ab745726: its preview deploy, by its version.json (environment "preview"), and the preflight's own local Storybook build.
- The pull request's head was ab745726 at the start and at the end of the preflight.

## Method

- Story: `core-citation--variants`, at 1280 × 800 and scale 1, as the spec opens it.
- Reading: a DOM range over each citation against the citation's box, as in the spec's own code. The number badge is the citation drawn with `vertical-align: super`.
- Conditions: the spec's enlarged text, 200% root text, and the default text size.
- Chromium (Playwright 1.61.1, Chrome for Testing 149.0.7827.55).
- The preflight ran in a fresh worktree at ab745726, after a frozen install, with a clean tree before and after.
- Times on 2026-11-20: the preflight from 17:56:32Z to 18:29:08Z. The hosted reading at 18:02Z, and the local one at about 18:30Z.
- All numbers are test measurements on one machine. Box load average (1 min): about 7 to 9 during the readings, on 166 cores.

## Files

- `citation-variants--spec-enlarged-text--<build>.png`: the story's citations with the spec's enlarged text. On main, that text runs past the top of the page, so the still stops there.
- `citation-variants--default-text--<build>.png`: the same citations at the default text size.
- `measurements.json`: every citation's height, above and below, per build and condition. It also holds the local build's rows and the preflight table.
