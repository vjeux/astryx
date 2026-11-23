# #12216 DEC-31 re-take, cells (f) and (g): new head 3a27f092 against a9e89138 (test numbers)

All numbers are test measurements.

**Verdict: no difference.** Every (f) iPhone cell and every (g) desktop-mouse cell gives the same result at both heads. #13480's Switch change does not alter either cell.

- New head: 3a27f0922d2bde5a6526ddd4b42edaef88b98bc2, an empty commit on 647071c51ab7ccb125a2865c168c174e48f8e627, with the same tree.
- #12216's head today, b15341f9cb69aced682073f8d8d60c1fba9ded6a, has that same tree too.
- It ran on its own preview deploy. The phone read its `version.json` as 3a27f092.
- Old head: a9e89138156d239dd79378a7dc6a08e6c849be7c, on its own preview deploy. The phone read its `version.json` as a9e89138.
- Story: core-dropdownmenu--outside-tap-reaches-nothing.

## (f) iPhone 14 (physical), iOS 26.2: Safari tab and Home Screen web app
- One iPhone 14 unit, on Nov 23 from 04:29 to 04:44 UTC.
- Takes are interleaved per action. Each take: fresh load, the Actions menu opened with a finger tap, one outside action, then the page counters read from the accessibility tree.

```
04:29:03Z safari-switch-new-1: 3a27f092 safari switch | menu open true -> false | before {"Switch acts":0,"Slider acts":0,"Scroll offset":0,"Swipes":0} after {"Switch acts":0,"Slider acts":0,"Scroll offset":0,"Swipes":0}
04:29:39Z safari-switch-old-1: a9e89138 safari switch | menu open true -> false | before {"Switch acts":0,"Slider acts":0,"Scroll offset":0,"Swipes":0} after {"Switch acts":0,"Slider acts":0,"Scroll offset":0,"Swipes":0}
04:30:13Z safari-switch-old-2: a9e89138 safari switch | menu open true -> false | before {"Switch acts":0,"Slider acts":0,"Scroll offset":0,"Swipes":0} after {"Switch acts":0,"Slider acts":0,"Scroll offset":0,"Swipes":0}
04:30:49Z safari-switch-new-2: 3a27f092 safari switch | menu open true -> false | before {"Switch acts":0,"Slider acts":0,"Scroll offset":0,"Swipes":0} after {"Switch acts":0,"Slider acts":0,"Scroll offset":0,"Swipes":0}
04:31:23Z safari-slider-new-1: 3a27f092 safari slider | menu open true -> false | before {"Switch acts":0,"Slider acts":0,"Scroll offset":0,"Swipes":0} after {"Switch acts":0,"Slider acts":0,"Scroll offset":0,"Swipes":0}
04:31:58Z safari-slider-old-1: a9e89138 safari slider | menu open true -> false | before {"Switch acts":0,"Slider acts":0,"Scroll offset":0,"Swipes":0} after {"Switch acts":0,"Slider acts":0,"Scroll offset":0,"Swipes":0}
04:32:32Z safari-slider-old-2: a9e89138 safari slider | menu open true -> false | before {"Switch acts":0,"Slider acts":0,"Scroll offset":0,"Swipes":0} after {"Switch acts":0,"Slider acts":0,"Scroll offset":0,"Swipes":0}
04:33:07Z safari-slider-new-2: 3a27f092 safari slider | menu open true -> false | before {"Switch acts":0,"Slider acts":0,"Scroll offset":0,"Swipes":0} after {"Switch acts":0,"Slider acts":0,"Scroll offset":0,"Swipes":0}
04:33:42Z safari-pan-new-1: 3a27f092 safari pan | menu open true -> false | before {"Switch acts":0,"Slider acts":0,"Scroll offset":0,"Swipes":0} after {"Switch acts":0,"Slider acts":0,"Scroll offset":142,"Swipes":0}
04:34:17Z safari-pan-old-1: a9e89138 safari pan | menu open true -> false | before {"Switch acts":0,"Slider acts":0,"Scroll offset":0,"Swipes":0} after {"Switch acts":0,"Slider acts":0,"Scroll offset":139,"Swipes":0}
04:34:52Z safari-pan-old-2: a9e89138 safari pan | menu open true -> false | before {"Switch acts":0,"Slider acts":0,"Scroll offset":0,"Swipes":0} after {"Switch acts":0,"Slider acts":0,"Scroll offset":142,"Swipes":0}
04:35:27Z safari-pan-new-2: 3a27f092 safari pan | menu open true -> false | before {"Switch acts":0,"Slider acts":0,"Scroll offset":0,"Swipes":0} after {"Switch acts":0,"Slider acts":0,"Scroll offset":142,"Swipes":0}
04:36:06Z home-switch-new-1: 3a27f092 home switch | menu open true -> false | before {"Switch acts":0,"Slider acts":0,"Scroll offset":0,"Swipes":0} after {"Switch acts":0,"Slider acts":0,"Scroll offset":0,"Swipes":0}
04:36:44Z home-switch-old-1: a9e89138 home switch | menu open true -> false | before {"Switch acts":0,"Slider acts":0,"Scroll offset":0,"Swipes":0} after {"Switch acts":0,"Slider acts":0,"Scroll offset":0,"Swipes":0}
04:37:22Z home-slider-new-1: 3a27f092 home slider | menu open true -> false | before {"Switch acts":0,"Slider acts":0,"Scroll offset":0,"Swipes":0} after {"Switch acts":0,"Slider acts":0,"Scroll offset":0,"Swipes":0}
04:37:59Z home-slider-old-1: a9e89138 home slider | menu open true -> false | before {"Switch acts":0,"Slider acts":0,"Scroll offset":0,"Swipes":0} after {"Switch acts":0,"Slider acts":0,"Scroll offset":0,"Swipes":0}
04:38:37Z home-pan-new-1: 3a27f092 home pan | menu open true -> false | before {"Switch acts":0,"Slider acts":0,"Scroll offset":0,"Swipes":0} after {"Switch acts":0,"Slider acts":0,"Scroll offset":139,"Swipes":0}
04:39:15Z home-pan-old-1: a9e89138 home pan | menu open true -> false | before {"Switch acts":0,"Slider acts":0,"Scroll offset":0,"Swipes":0} after {"Switch acts":0,"Slider acts":0,"Scroll offset":142,"Swipes":0}
04:39:53Z home-swipe-new-1: 3a27f092 home swipe | menu open true -> false | before {"Switch acts":0,"Slider acts":0,"Scroll offset":0,"Swipes":0} after {"Switch acts":0,"Slider acts":0,"Scroll offset":0,"Swipes":0}
04:40:31Z home-swipe-old-1: a9e89138 home swipe | menu open true -> false | before {"Switch acts":0,"Slider acts":0,"Scroll offset":0,"Swipes":0} after {"Switch acts":0,"Slider acts":0,"Scroll offset":0,"Swipes":0}
04:41:09Z home-hswipe-new-1: 3a27f092 home hswipe | menu open true -> false | before {"Switch acts":0,"Slider acts":0,"Scroll offset":0,"Swipes":0} after {"Switch acts":0,"Slider acts":0,"Scroll offset":0,"Swipes":0}
04:41:46Z home-hswipe-old-1: a9e89138 home hswipe | menu open true -> false | before {"Switch acts":0,"Slider acts":0,"Scroll offset":0,"Swipes":0} after {"Switch acts":0,"Slider acts":0,"Scroll offset":0,"Swipes":0}
04:42:25Z home-hswipe-old-2: a9e89138 home hswipe | menu open true -> false | before {"Switch acts":0,"Slider acts":0,"Scroll offset":0,"Swipes":0} after {"Switch acts":0,"Slider acts":0,"Scroll offset":0,"Swipes":0}
04:43:03Z home-hswipe-new-2: 3a27f092 home hswipe | menu open true -> false | before {"Switch acts":0,"Slider acts":0,"Scroll offset":0,"Swipes":0} after {"Switch acts":0,"Slider acts":0,"Scroll offset":0,"Swipes":0}
04:43:33Z safari-switch-nomenu-new-1: 3a27f092 safari switch-nomenu | menu open false -> false | before {"Switch acts":0,"Slider acts":0,"Scroll offset":0,"Swipes":0} after {"Switch acts":1,"Slider acts":0,"Scroll offset":0,"Swipes":0}
04:44:03Z safari-switch-nomenu-old-1: a9e89138 safari switch-nomenu | menu open false -> false | before {"Switch acts":0,"Slider acts":0,"Scroll offset":0,"Swipes":0} after {"Switch acts":1,"Slider acts":0,"Scroll offset":0,"Swipes":0}
04:44:17Z FAILED exit 2: safari-hswipe-nomenu-new-1: no target for hswipe-nomenu
04:44:30Z FAILED exit 2: safari-hswipe-nomenu-old-1: no target for hswipe-nomenu
04:44:30Z done
```

- Every outside action closes the menu at both heads.
- Taps over the Switch, the Slider and the swipe row reach nothing (counters 0).
- The vertical pan scrolls the list 139–142 px at both heads.
- Without a menu open, a tap on the Switch acts (1) at both heads.
- The no-menu horizontal swipe could not run on this unit at either head, as the driver found no target for it.

## (g) desktop mouse: headless Chromium (chrome-headless-shell 158.0.8127.36) at 1280x800 with CDP mouse events
- Builds:
  - New: a static Storybook build of 3a27f092, whose `version.json` reads "static". Its tarball's sha256 begins 02e979f8c31f8aa3.
  - Old: a static Storybook build of a9e89138.
- Both are served locally. Per take: open Actions, wait 600 ms, click the target, then read the menu, the counters and document.activeElement about 300 ms later.

| target | head | menu open → after | counters | activeElement after open → at 1.2 s |
|---|---|---|---|---|
| switch | 3a27f092 (3a27f0922d2bde5a6526ddd4b42edaef88b98bc2) | true → false | Switch acts: 1, Slider acts: 0 | DIV[menu] → INPUT[switch] |
| switch | a9e89138 (a9e89138156d239dd79378a7dc6a08e6c849be7c) | true → false | Switch acts: 1, Slider acts: 0 | DIV[menu] → INPUT[switch] |
| switch | a9e89138 (a9e89138156d239dd79378a7dc6a08e6c849be7c) | true → false | Switch acts: 1, Slider acts: 0 | DIV[menu] → INPUT[switch] |
| switch | 3a27f092 (3a27f0922d2bde5a6526ddd4b42edaef88b98bc2) | true → false | Switch acts: 1, Slider acts: 0 | DIV[menu] → INPUT[switch] |
| slider | 3a27f092 (3a27f0922d2bde5a6526ddd4b42edaef88b98bc2) | true → false | Switch acts: 0, Slider acts: 0 | DIV[menu] → DIV[slider] |
| slider | a9e89138 (a9e89138156d239dd79378a7dc6a08e6c849be7c) | true → false | Switch acts: 0, Slider acts: 0 | DIV[menu] → DIV[slider] |
| slider | a9e89138 (a9e89138156d239dd79378a7dc6a08e6c849be7c) | true → false | Switch acts: 0, Slider acts: 0 | DIV[menu] → DIV[slider] |
| slider | 3a27f092 (3a27f0922d2bde5a6526ddd4b42edaef88b98bc2) | true → false | Switch acts: 0, Slider acts: 0 | DIV[menu] → DIV[slider] |
| slidertrack | 3a27f092 (3a27f0922d2bde5a6526ddd4b42edaef88b98bc2) | true → false | Switch acts: 0, Slider acts: 1 | DIV[menu] → DIV[slider] |
| slidertrack | a9e89138 (a9e89138156d239dd79378a7dc6a08e6c849be7c) | true → false | Switch acts: 0, Slider acts: 1 | DIV[menu] → DIV[slider] |
| slidertrack | a9e89138 (a9e89138156d239dd79378a7dc6a08e6c849be7c) | true → false | Switch acts: 0, Slider acts: 1 | DIV[menu] → DIV[slider] |
| slidertrack | 3a27f092 (3a27f0922d2bde5a6526ddd4b42edaef88b98bc2) | true → false | Switch acts: 0, Slider acts: 1 | DIV[menu] → DIV[slider] |

- The menu closes at both heads.
- A click on the Switch acts (1).
- A click on the Slider's thumb gives Slider acts 0, and a click on its track gives 1.
- Focus is on the clicked control at both heads.
