// Copyright (c) Meta Platforms, Inc. and affiliates.

/**
 * @file TabBar.interaction.browser.spec.ts
 * @input The built "Lab/TabBar" stories on the harness's phone (touch, so
 *   the touch presentation applies), real touch input (Chromium CDP /
 *   WebKit's input command) and the interaction harness; the iOS cases run
 *   on the harness's phone (a coarse pointer, any engine: one touch
 *   model), the mouse cases without touch
 *   without it
 * @output Proofs that TabBar's lens moves like UITabBar's on iOS 26.2: a tap
 *   on another tab slides it on UIKit's spring (response 0.4 s, damping
 *   ratio 0.85) to within half a pixel, with the selected copy inside it
 *   counter-moving exactly; a second tap mid-slide turns it around without a
 *   jump; the slide keeps advancing every frame through a blocked main
 *   thread and does no Layout or Paint; under Reduce Motion a touch screen's
 *   tap cross-fades it and a click moves it at once (design:reduced-motion);
 *   choosing the
 *   selected tab reselects and moves nothing; badges change without
 *   animating; a storyboard of the slide. Under a mouse (a fine
 *   pointer) the lens slides on the theme's motion instead, which
 *   Reduce Motion replaces as above
 * @position Interaction proof for lab TabBar (TabBar.tsx, tabBarModel.ts);
 *   shape copied from the harness exemplar,
 *   BottomSheetDetent.interaction.browser.spec.ts
 */

import {expect, test, type Locator, type Page} from '@playwright/test';
import {
  advanceFrozenPage,
  animationStoryboard,
  blockMainThread,
  busyWindowProof,
  castStoryboard,
  countBetween,
  freezePage,
  holdAnimations,
  installPageFreeze,
  installTimerGate,
  markElement,
  openStory,
  releaseAnimations,
  sampleCurve,
  sampleRects,
  springStep,
  startScreencast,
  thawPage,
  touchDriver,
  traceRendering,
  trackMarker,
  waitForAnimation,
  waitForRest,
  withStorybook,
  writeEvidence,
} from '@astryxdesign/interaction-harness';

const storybook = withStorybook(test);

/**
 * A mouse case's own guard: its context's primary pointer is fine (a context
 * without touch can still match a coarse pointer in the interaction config).
 */
async function expectFinePointer(page: Page) {
  expect(
    await page.evaluate(() => matchMedia('(pointer: coarse)').matches),
    'the primary pointer is fine',
  ).toBe(false);
}

/** UIKit's lens travel on iOS 26.2 (uikit/tabBar.ts `lensTravel`). */
const LENS_TRAVEL = {response: 0.4, dampingFraction: 0.85};

/**
 * Opens a TabBar story on the harness's phone: a coarse primary pointer, so
 * the touch presentation applies, whatever the engine (one touch model).
 */
/**
 * Page side, from before the story loads: every script animation the page
 * makes (the animator's), with the document time it was made, and when a
 * finger last lifted. design:reduced-motion's checks read a short cross-fade
 * from it after the fade has ended, and date "since the lift" by the page's
 * own lift rather than a read the test makes afterwards.
 */
function animationLog(): void {
  const w = window as unknown as {
    __tabBarMade?: {animation: Animation; at: number}[];
    __tabBarLifted?: number;
  };
  if (w.__tabBarMade != null) {
    return;
  }
  const made: {animation: Animation; at: number}[] = [];
  w.__tabBarMade = made;
  w.__tabBarLifted = 0;
  const now = () => Number(document.timeline.currentTime ?? 0);
  const animate = Element.prototype.animate;
  Element.prototype.animate = function (
    this: Element,
    ...args: Parameters<Element['animate']>
  ) {
    const animation = animate.apply(this, args);
    made.push({animation, at: now()});
    if (made.length > 5000) {
      made.splice(0, made.length - 5000);
    }
    return animation;
  };
  window.addEventListener(
    'touchend',
    () => {
      w.__tabBarLifted = now();
    },
    true,
  );
}

/** When a finger last lifted on the page, on the document timeline (0: never). */
const liftedAt = (page: Page) =>
  page.evaluate(
    () => (window as unknown as {__tabBarLifted?: number}).__tabBarLifted ?? 0,
  );

async function openBar(page: Page, story = 'default') {
  await page.addInitScript(animationLog);
  await openStory(page, storybook(), `lab-tabbar--${story}`);
  const driver = await touchDriver(page);
  const bar = page.getByRole('tablist', {name: 'Sections'});
  await expect(bar).toBeVisible();
  return {driver, bar};
}

/**
 * `openBar` on a page whose scene the test can freeze: the page clock goes in
 * before the story loads, the timer gate after.
 */
async function openFreezableBar(page: Page, story = 'default') {
  await installPageFreeze(page);
  const opened = await openBar(page, story);
  await installTimerGate(page);
  return opened;
}

const tab = (page: Page, name: string | RegExp) =>
  page.getByRole('tab', {name});

/** The centre of a tab's 76 × 54 item, where a finger lands on it. */
async function itemCenter(page: Page, name: string | RegExp) {
  const box = await tab(page, name).locator('span').first().boundingBox();
  if (box == null) {
    throw new Error(`no tab ${String(name)}`);
  }
  return {x: box.x + box.width / 2, y: box.y + box.height / 2};
}

const lensBody = (page: Page) => page.locator('[data-tab-bar-lens-body]');
const lensCopy = (page: Page) => page.locator('[data-tab-bar-copy]');

/** The lens's centre on screen. */
async function lensCenterX(page: Page) {
  const box = await lensBody(page).boundingBox();
  if (box == null) {
    throw new Error('no lens');
  }
  return box.x + box.width / 2;
}

/** A presented translateX, px (the animator drives `translate`). */
const translateX = async (locator: Locator) =>
  locator.evaluate(element => {
    const value = getComputedStyle(element).translate;
    return value === 'none' ? 0 : parseFloat(value);
  });

test('a tap on another tab slides the lens on UIKit’s spring, the selected copy counter-moving', async ({
  page,
}, testInfo) => {
  const {driver} = await openFreezableBar(page);
  const from = await itemCenter(page, 'Home');
  const to = await itemCenter(page, 'Browse');
  // The scene stands still from before the tap: the slide it starts is held
  // at its start, and the copy that rides in the lens only while it slides
  // stays mounted, however slowly the test process reads them.
  await freezePage(page);
  await driver.tap(to);
  await expect(tab(page, 'Browse')).toHaveAttribute('aria-selected', 'true');
  const body = lensBody(page);
  await waitForAnimation(body, {minProgressMs: 0});
  await holdAnimations(page);

  const times = Array.from({length: 49}, (_, i) => i * 16.667);
  const bodySamples = await sampleCurve(body, times);
  const copySamples = await sampleCurve(lensCopy(page), times);
  // The body starts where the lens was (over Home) relative to its new
  // resting place (Browse) and springs to 0 from rest.
  const start = from.x - to.x;
  const samples = times.map((t, i) => ({
    t: +t.toFixed(1),
    body: bodySamples[i].transform.translateX,
    copy: copySamples[i].transform.translateX,
    analytic: start * (1 - springStep(LENS_TRAVEL, t)),
  }));
  await releaseAnimations(page, {finish: true});
  await thawPage(page);
  await writeEvidence(
    'curves/tabbar-lens-travel',
    {
      [`${testInfo.project.name}.json`]: JSON.stringify(
        {start, samples},
        null,
        1,
      ),
    },
    testInfo,
  );

  for (const sample of samples) {
    expect(
      Math.abs(sample.body - sample.analytic),
      JSON.stringify(sample),
    ).toBeLessThan(0.5);
    // The copy inside undoes the body's travel, so the items stay put.
    expect(
      Math.abs(sample.copy + sample.body),
      JSON.stringify(sample),
    ).toBeLessThan(0.3);
  }
  // UIKit's lens overshoots a little (ζ 0.85) before it settles.
  expect(Math.max(...samples.map(s => s.body))).toBeGreaterThan(0.5);
  await waitForRest(body);
  expect(Math.abs((await lensCenterX(page)) - to.x)).toBeLessThan(0.5);
});

test('a second tap mid-slide turns the lens around from where it is, without a jump', async ({
  page,
}) => {
  const {driver} = await openFreezableBar(page);
  const home = await itemCenter(page, 'Home');
  const profile = await itemCenter(page, 'Profile');
  const library = await itemCenter(page, 'Library');
  // Records the lens's centre in the frame the second tap selects Library.
  await page.evaluate(() => {
    const target = [...document.querySelectorAll('[role="tab"]')].find(
      element => element.textContent?.startsWith('Library'),
    );
    const lens = document.querySelector('[data-tab-bar-lens-body]');
    const observer = new MutationObserver(() => {
      if (target?.getAttribute('aria-selected') === 'true' && lens != null) {
        const box = lens.getBoundingClientRect();
        (window as unknown as {__turnedAt: number}).__turnedAt =
          box.x + box.width / 2;
        observer.disconnect();
      }
    });
    if (target != null) {
      observer.observe(target, {attributeFilter: ['aria-selected']});
    }
  });
  // Every frame's lens position, sampled in the page while the taps land.
  const sampling = sampleRects(lensBody(page), 1300);
  // The scene stands still from before the first tap: the slide it starts is
  // held at its start, then stepped on by the scene's own time until the lens
  // is past Library, however late the test process is, and the second tap
  // lands there, with most of the slide still ahead.
  await freezePage(page);
  await driver.tap(profile);
  let frozenAt = await lensCenterX(page);
  for (
    let stepped = 0;
    frozenAt <= library.x + 25 && stepped < 1_000;
    stepped += 4
  ) {
    await advanceFrozenPage(page, 4);
    frozenAt = await lensCenterX(page);
  }
  // Mid-slide: past Library, short of Profile.
  expect(frozenAt).toBeGreaterThan(library.x + 20);
  expect(frozenAt).toBeLessThan(profile.x - 20);
  await driver.tap(library);
  await thawPage(page);
  await expect(tab(page, 'Library')).toHaveAttribute('aria-selected', 'true');
  const turnedAt = await page.evaluate(
    () => (window as unknown as {__turnedAt: number}).__turnedAt,
  );
  // The second tap took effect where the scene stood.
  expect(Math.abs(turnedAt - frozenAt)).toBeLessThan(0.5);
  const samples = (await sampling).flatMap(sample =>
    sample.box == null
      ? []
      : [{t: sample.t, x: sample.box.x + sample.box.width / 2}],
  );
  // It headed for Profile and came back to Library, never jumping: a jump
  // to either end would cover the whole remaining distance (over 100 px)
  // in one frame. Only consecutive frames are compared, never samples a
  // stall kept apart.
  const steps = samples
    .slice(1)
    .flatMap((sample, i) =>
      sample.t - samples[i].t <= 34 ? [sample.x - samples[i].x] : [],
    );
  expect(
    Math.max(...steps.map(Math.abs)),
    JSON.stringify(samples),
  ).toBeLessThan(60);
  expect(Math.min(...samples.map(sample => sample.x))).toBeGreaterThan(
    home.x - 1,
  );
  await waitForRest(lensBody(page));
  expect(Math.abs((await lensCenterX(page)) - library.x)).toBeLessThan(0.5);
});

test('choosing the selected tab again reselects and moves nothing', async ({
  page,
}) => {
  const {driver} = await openBar(page);
  await driver.tap(await itemCenter(page, 'Home'));
  await expect(page.getByTestId('reselects')).toHaveText('Reselected 1 times');
  const animations = await lensBody(page).evaluate(
    element => element.getAnimations({subtree: true}).length,
  );
  expect(animations).toBe(0);
  await expect(tab(page, 'Home')).toHaveAttribute('aria-selected', 'true');
});

test('the bar sets no page-level stacking rank: its layers order inside it', async ({
  page,
}) => {
  await openBar(page);
  const root = await page.getByTestId('tab-bar').evaluate(element => {
    const style = getComputedStyle(element);
    return {zIndex: style.zIndex, isolation: style.isolation};
  });
  expect(root).toEqual({zIndex: 'auto', isolation: 'isolate'});
});

test('a held finger never starts text selection on the bar', async ({page}) => {
  await openBar(page);
  const styles = await page
    .getByRole('tablist', {name: 'Sections'})
    .evaluate(element => {
      const style = getComputedStyle(element);
      return {
        // iOS Safari reads the prefixed property; WebKit has no other.
        prefixed: style.getPropertyValue('-webkit-user-select'),
        unprefixed: CSS.supports('user-select', 'none')
          ? style.getPropertyValue('user-select')
          : 'none',
      };
    });
  expect(styles).toEqual({prefixed: 'none', unprefixed: 'none'});
});

test('badges appear, change and clear without animating', async ({page}) => {
  const {driver} = await openBar(page, 'badges');
  const badge = page.locator('[data-tab-bar-badge="inbox"]');
  await expect(badge).toHaveCount(0);
  await driver.tap(
    await page
      .getByRole('button', {name: 'Add one'})
      .boundingBox()
      .then(box => {
        if (box == null) {
          throw new Error('no button');
        }
        return {x: box.x + box.width / 2, y: box.y + box.height / 2};
      }),
  );
  await expect(badge).toHaveText('1');
  expect(await badge.evaluate(element => element.getAnimations().length)).toBe(
    0,
  );
  await expect(tab(page, /^Inbox\s*, 1 unread$/)).toBeVisible();
  await page.getByRole('button', {name: 'Add ten'}).click();
  await expect(badge).toHaveText('11');
  // "11" is wider than one digit: the badge grows past its 18.33 px circle.
  const box = await badge.boundingBox();
  expect(box?.height).toBeCloseTo(18.33, 1);
  expect(box?.width ?? 0).toBeGreaterThan(18.5);
  await page.getByRole('button', {name: 'Clear'}).click();
  await expect(badge).toHaveCount(0);
});

test('the slide keeps advancing every frame while the main thread is blocked', async ({
  page,
  browserName,
}, testInfo) => {
  test.skip(
    browserName !== 'chromium',
    'screencast frame evidence is Chromium-only in Playwright (WebKit: the iOS simulator rig)',
  );
  const {driver} = await openBar(page);
  const body = lensBody(page);
  const profile = await itemCenter(page, 'Profile');
  await markElement(body);
  const cast = await startScreencast(page);
  // Armed before the tap, the page blocks itself in the frame that sees the
  // slide running: one evaluate sees it and blocks, so no runner latency
  // between the two can eat the slide first. The judged part ends where the
  // lens settles (settledWithin).
  const blocking = blockMainThread(page, 600, {during: body});
  await driver.tap(profile);
  const block = await blocking;
  await page.waitForTimeout(150);
  const castFrames = await cast.stop();
  const tracked = await trackMarker(page, castFrames);
  const proof = busyWindowProof(
    tracked,
    {from: block.from, to: block.to},
    {
      axis: 'x',
      settledWithin: 2,
      // Screencast throughput, not the animation: no display-rate bound.
      maxMedianFrameMs: Infinity,
    },
  );
  await writeEvidence(
    'busy-main-thread/tabbar-lens-travel',
    {
      [`${testInfo.project.name}.json`]: JSON.stringify(
        {block, proof},
        null,
        1,
      ),
    },
    testInfo,
  );
  const film = await castStoryboard(page, castFrames, {
    name: 'tabbar-lens-travel-busy-main-thread',
    zero: block.from,
    from: block.from - 40,
    to: proof.judged.to + 40,
    columns: 8,
    cellScale: 0.35,
    data: t => ({x: tracked.find(f => f.t === t)?.box?.x ?? -1}),
  });
  await film.write(testInfo, {block});
  // The harness's verdict: no stall past two dropped screencast frames,
  // and the frames moving (a loaded machine drops a frame
  // or two; a frozen slide presents none).
  expect(
    proof.verdict.pass,
    `${proof.summary}; ${proof.verdict.failures.join('; ')}`,
  ).toBe(true);
});

/**
 * Notes, on the page, when the DOM change an action makes has rendered: three
 * frames after the first change once armed (with `attribute`, the first that
 * changes it), which are the frame that styles, lays out and paints it, the
 * frame that paints the layers its new animations take, and a clean one. A
 * rendering proof counts per-frame work from there, not from a fixed delay a
 * loaded machine stretches.
 */
async function noteSettle(page: Page, attribute?: string) {
  await page.evaluate(attribute => {
    const w = window as unknown as {__tabBarSettledAt?: number};
    w.__tabBarSettledAt = 0;
    const observer = new MutationObserver(records => {
      if (
        attribute != null &&
        !records.some(record => record.attributeName === attribute)
      ) {
        return;
      }
      observer.disconnect();
      let frames = 3;
      const next = () => {
        frames -= 1;
        if (frames === 0) {
          w.__tabBarSettledAt = performance.timeOrigin + performance.now();
          return;
        }
        requestAnimationFrame(next);
      };
      requestAnimationFrame(next);
    });
    observer.observe(document.documentElement, {
      attributes: true,
      characterData: true,
      childList: true,
      subtree: true,
    });
  }, attribute ?? null);
}

/** When `noteSettle` noted the render, epoch ms on the page's clock (0: not yet). */
const settledAt = (page: Page) =>
  page.evaluate(
    () =>
      (window as unknown as {__tabBarSettledAt?: number}).__tabBarSettledAt ??
      0,
  );

test('the slide does no Layout or Paint per frame', async ({
  page,
  browserName,
}) => {
  test.skip(browserName !== 'chromium', 'rendering traces are Chromium-only');
  const {driver} = await openBar(page);
  const body = lensBody(page);
  const target = await itemCenter(page, 'Profile');
  let slide = {from: 0, to: 0};
  await noteSettle(page, 'aria-selected');
  const trace = await traceRendering(page, async () => {
    await driver.tap(target);
    [slide] = await waitForAnimation(body);
    await waitForRest(body);
  });
  // The spring is within a pixel of rest by ~0.55 s. The selection's own
  // render lays out and paints: counted from three frames after its DOM
  // change, not from a fixed delay, and over at least 100 ms of the slide.
  expect(slide.to - slide.from).toBeGreaterThan(500);
  const from = await settledAt(page);
  expect(from, 'the selection never rendered').toBeGreaterThan(0);
  expect(slide.from + 500 - from, 'counted window, ms').toBeGreaterThan(100);
  const during = countBetween(trace, from, slide.from + 500);
  const when = trace.events
    .filter(e => e.name === 'Layout' || e.name === 'Paint')
    .map(e => `${e.name}@${Math.round(e.t - slide.from)}`);
  expect(during.Layout ?? 0, JSON.stringify({during, when})).toBe(0);
  expect(during.Paint ?? 0, JSON.stringify({during, when})).toBe(0);
});

/** The document's timeline now, to read only the animations a change starts. */
const timelineNow = (page: Page) =>
  page.evaluate(() => Number(document.timeline.currentTime ?? 0));

/**
 * Every animation running in the document (CSS transitions included) that
 * started at or after `since`, as design:reduced-motion's checks read it: the
 * properties its keyframes interpolate (a value that only jumps, at one
 * offset, moves nothing on screen), and when its curve reaches its end value
 * (the animator holds the end after it). The animator's own are read from the
 * page's log too, so one that ended before the read (a cross-fade is short)
 * is still read.
 */
async function runningAnimations(page: Page, since = 0) {
  return page.evaluate(since => {
    const meta = ['offset', 'computedOffset', 'easing', 'composite'];
    const made = (
      (
        window as unknown as {
          __tabBarMade?: {animation: Animation; at: number}[];
        }
      ).__tabBarMade ?? []
    )
      .filter(entry => entry.at >= since - 50)
      .map(entry => entry.animation);
    const running = document
      .getAnimations()
      .filter(
        animation =>
          animation.startTime == null ||
          Number(animation.startTime) >= since - 50,
      );
    return [...new Set([...running, ...made])].map(animation => {
      const effect = animation.effect as KeyframeEffect;
      const frames = effect.getKeyframes();
      const keys = [
        ...new Set(frames.flatMap(frame => Object.keys(frame))),
      ].filter(key => !meta.includes(key));
      const value = (frame: ComputedKeyframe, key: string) =>
        String(frame[key]);
      const interpolated = keys.filter(key =>
        frames.some(
          (frame, index) =>
            index > 0 &&
            frame.computedOffset !== frames[index - 1].computedOffset &&
            value(frame, key) !== value(frames[index - 1], key),
        ),
      );
      const last = frames[frames.length - 1];
      let end = frames.length - 1;
      while (
        end > 0 &&
        keys.every(key => value(frames[end - 1], key) === value(last, key))
      ) {
        end -= 1;
      }
      const timing = effect.getTiming();
      return {
        properties: interpolated,
        endsMs:
          Number(timing.delay ?? 0) +
          (frames[end]?.computedOffset ?? 0) * Number(timing.duration),
      };
    });
  }, since);
}

/**
 * design:reduced-motion DR2, on a touch screen: the change cross-fades, every
 * animation it starts changes opacity only and ends within 200 ms.
 */
async function expectCrossFade(page: Page, since = 0) {
  await expect
    .poll(
      async () =>
        (await runningAnimations(page, since)).some(
          animation =>
            animation.properties.includes('opacity') && animation.endsMs > 0,
        ),
      {message: 'no cross-fade', timeout: 2000},
    )
    .toBe(true);
  assertCrossFade(await runningAnimations(page, since));
}

/** design:reduced-motion DR2 on animations already read. */
function assertCrossFade(
  animations: Awaited<ReturnType<typeof runningAnimations>>,
) {
  expect(
    animations.some(
      animation =>
        animation.properties.includes('opacity') && animation.endsMs > 0,
    ),
    `no cross-fade: ${JSON.stringify(animations)}`,
  ).toBe(true);
  for (const animation of animations) {
    expect(
      animation.properties.filter(property => property !== 'opacity'),
      JSON.stringify(animations),
    ).toEqual([]);
    expect(animation.endsMs, JSON.stringify(animations)).toBeLessThanOrEqual(
      200,
    );
  }
}

/** design:reduced-motion DR3, under a mouse: nothing animates. */
async function expectNoMotion(page: Page, since = 0) {
  await page.waitForTimeout(150);
  const animations = await runningAnimations(page, since);
  expect(
    animations.filter(animation => animation.properties.length > 0),
    JSON.stringify(animations),
  ).toEqual([]);
}

/** A tab's label: its weight tells the selected look from the plain one. */
const labelWeight = (page: Page, name: string) =>
  tab(page, name)
    .locator(':scope > span > span')
    .nth(1)
    .evaluate(element => getComputedStyle(element).fontWeight);

test('at rest the selected tab draws its own look; the copy of the items rides in the lens only while it slides', async ({
  page,
}) => {
  const {driver} = await openBar(page);
  // At rest each item is drawn once, the selected one in its selected look.
  await expect(lensCopy(page)).toHaveCount(0);
  expect(await labelWeight(page, 'Home')).toBe('600');
  expect(await labelWeight(page, 'Browse')).not.toBe('600');
  await driver.tap(await itemCenter(page, 'Browse'));
  // While the lens slides, the selected look rides inside it…
  await expect(lensCopy(page)).toHaveCount(1);
  expect(await labelWeight(page, 'Browse')).not.toBe('600');
  // …and once it rests the copy goes and the tab draws it again.
  await waitForRest(lensBody(page));
  await expect(lensCopy(page)).toHaveCount(0);
  expect(await labelWeight(page, 'Browse')).toBe('600');
  expect(await labelWeight(page, 'Home')).not.toBe('600');
});

test.describe('with Reduce Motion (design:reduced-motion)', () => {
  test('on a touch screen a tap cross-fades the lens: opacity only, within 200 ms', async ({
    page,
  }) => {
    await page.emulateMedia({reducedMotion: 'reduce'});
    const {driver} = await openBar(page);
    const to = await itemCenter(page, 'Browse');
    const since = await timelineNow(page);
    await driver.tap(to);
    await expect(tab(page, 'Browse')).toHaveAttribute('aria-selected', 'true');
    await expectCrossFade(page, since);
    await waitForRest(lensBody(page));
    expect(Math.abs((await lensCenterX(page)) - to.x)).toBeLessThan(0.5);
  });
});

/** The lens's CSS slide under a mouse: its duration and running transitions. */
const cssSlide = async (page: Page) =>
  page.locator('[data-tab-bar-lens]').evaluate(element => ({
    duration: getComputedStyle(element).transitionDuration,
    transitions: element
      .getAnimations()
      .filter(animation => animation instanceof CSSTransition).length,
  }));

/**
 * Counts, on the page from now, the CSS transitions the lens starts (one
 * transitionrun per property), for `expectCssSlide`. Call it before the
 * action that slides the lens.
 */
async function watchCssSlide(page: Page) {
  await page.locator('[data-tab-bar-lens]').evaluate(element => {
    const w = window as unknown as {__tabBarSlides?: number};
    w.__tabBarSlides = 0;
    element.addEventListener('transitionrun', event => {
      if (event.target === element) {
        w.__tabBarSlides = (w.__tabBarSlides ?? 0) + 1;
      }
    });
  });
}

/**
 * Under a mouse the lens slides in CSS on the theme's motion, and its body,
 * which the animator moves under a finger, never animates.
 */
async function expectCssSlide(page: Page, {isRunning = true} = {}) {
  expect((await cssSlide(page)).duration).not.toBe('0s');
  if (isRunning) {
    // Counted on the page from `watchCssSlide`, so a short slide that ends
    // before this looks is still seen.
    await expect
      .poll(() =>
        page.evaluate(
          () =>
            (window as unknown as {__tabBarSlides?: number}).__tabBarSlides ??
            0,
        ),
      )
      .toBe(1);
  }
  expect(
    await lensBody(page).evaluate(element => element.getAnimations().length),
  ).toBe(0);
}

test.describe('touch work costs nothing under a fine pointer', () => {
  test.describe('under a mouse', () => {
    test.use({hasTouch: false, isMobile: false});

    test('with Reduce Motion a click moves the lens at once', async ({
      page,
    }) => {
      await expectFinePointer(page);
      await page.emulateMedia({reducedMotion: 'reduce'});
      await openStory(page, storybook(), 'lab-tabbar--default');
      await expect(page.getByRole('tablist', {name: 'Sections'})).toBeVisible();
      const since = await timelineNow(page);
      await tab(page, 'Browse').click();
      await expect(tab(page, 'Browse')).toHaveAttribute(
        'aria-selected',
        'true',
      );
      await expectNoMotion(page, since);
    });

    test('a click draws no copy of the items', async ({page}) => {
      await expectFinePointer(page);
      await openStory(page, storybook(), 'lab-tabbar--default');
      await expect(page.getByRole('tablist', {name: 'Sections'})).toBeVisible();
      await tab(page, 'Browse').click();
      await expect(tab(page, 'Browse')).toHaveAttribute(
        'aria-selected',
        'true',
      );
      // The selected look moves to the tab at once; the lens slides under it.
      expect(await labelWeight(page, 'Browse')).toBe('600');
      await expect(lensCopy(page)).toHaveCount(0);
      await page.waitForTimeout(400);
      await expect(lensCopy(page)).toHaveCount(0);
    });

    test('a click slides the lens on the theme’s motion', async ({page}) => {
      await expectFinePointer(page);
      await openStory(page, storybook(), 'lab-tabbar--default');
      await expect(page.getByRole('tablist', {name: 'Sections'})).toBeVisible();
      await watchCssSlide(page);
      await tab(page, 'Browse').click();
      await expect(tab(page, 'Browse')).toHaveAttribute(
        'aria-selected',
        'true',
      );
      await expectCssSlide(page);
    });
  });
});

test(
  'storyboard: a tap slides the lens',
  {tag: '@storyboard'},
  async ({page}, testInfo) => {
    const {driver, bar} = await openBar(page);
    await driver.tap(await itemCenter(page, 'Profile'));
    await waitForAnimation(lensBody(page));
    const box = await bar.boundingBox();
    if (box == null) {
      throw new Error('no bar');
    }
    const {storyboard} = await animationStoryboard(page, {
      name: 'tabbar-lens-travel',
      clip: {
        x: 0,
        y: box.y - 12,
        width: box.x * 2 + box.width,
        height: box.height + 24,
      },
      times: Array.from({length: 37}, (_, i) => i * 16.667),
      measure: async () => ({x: await translateX(lensBody(page))}),
      columns: 6,
      cellScale: 0.6,
    });
    await storyboard.write(testInfo);
    await releaseAnimations(page, {finish: true});
    const xs = storyboard.frames.map(f => (f.data as {x: number}).x);
    expect(xs[0]).toBeLessThan(-200);
    expect(Math.abs(xs.at(-1) ?? Infinity)).toBeLessThan(2);
  },
);
