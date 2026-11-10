// Copyright (c) Meta Platforms, Inc. and affiliates.

/**
 * @file TabBar.interaction.browser.spec.ts
 * @input The built "Lab/TabBar" stories, real touch and mouse input on the
 *   harness's phone, and the interaction harness
 * @output Proofs that TabBar moves like UITabBar on iOS 26.2: the lens's
 *   slide, its press tracking and drag. Also the mouse presentation.
 * @position Interaction proof for the lab TabBar (TabBar.tsx,
 *   tabBarModel.ts)
 */

import {
  expect,
  test,
  type Locator,
  type Page,
} from '@astryxdesign/a11y-spec/playwright';
import type {TouchScript} from '@astryxdesign/interaction-harness';
import {
  advanceFrozenPage,
  animationStoryboard,
  armHold,
  blockMainThread,
  busyWindowProof,
  castStoryboard,
  compareCurve,
  CONTROL_RGB,
  countBetween,
  cubicBezier,
  drag,
  FRAME_STARVATION_MS,
  freezePage,
  freezePageOn,
  freezePageWhen,
  holdAnimations,
  installPageFreeze,
  installTimerGate,
  markElement,
  MARKER_RGB,
  merge,
  openStory,
  PARTIAL_LIFT_SKIP,
  PEN_SKIP,
  releaseAnimations,
  requireFrames,
  sampleCurve,
  sampleRects,
  seekAnimations,
  springStep,
  startBusyControl,
  startScreencast,
  tap as tapScript,
  thawPage,
  toTouchEvents,
  touchDriver,
  touchStoryboard,
  traceRendering,
  trackMarkers,
  waitForAnimation,
  waitForRest,
  watchAnimations,
  webInputDriver,
  withFinger,
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
/**
 * The opacity of an element's `::before` at each of `times` (ms into the held
 * curves), as sampleCurve reads an element's. The lens's lifted glass is its
 * clip's `::before`.
 */
async function samplePseudoOpacity(locator: Locator, times: number[]) {
  return locator.evaluate((element, ts) => {
    const held =
      (window as unknown as {__harnessHeld?: Animation[]}).__harnessHeld ?? [];
    return ts.map(t => {
      for (const animation of held) {
        const end = Number(
          animation.effect?.getComputedTiming().endTime ?? Infinity,
        );
        animation.currentTime = Math.min(t, end - 0.001);
      }
      return Number(getComputedStyle(element, '::before').opacity);
    });
  }, times);
}

/** UIKit's lens travel on iOS 26.2 (uikitTabBar.ts `lensTravel`). */
const LENS_TRAVEL = {response: 0.4, dampingFraction: 0.85};
/** The lift (`lift`), the flex while pressed and after (`flexPress`, `flexRelease`). */
const LIFT = {response: 0.25, dampingFraction: 1};
const FLEX_PRESS = {response: 0.314, dampingFraction: 0.625};
const FLEX_RELEASE = {response: 0.36, dampingFraction: 0.6};
const FLEX_SCALE = 1.0488;
/** The lifted lens's scale: the resting lens grown by 8 px on every side. */
async function liftedScale(page: Page) {
  const width = await lensBody(page).evaluate(
    element => (element as HTMLElement).offsetWidth,
  );
  return {x: (width + 16) / width, y: 70 / 54};
}

/**
 * Opens a TabBar story on the harness's phone: a coarse primary pointer, so
 * the touch presentation applies, whatever the engine (one touch model).
 */
/**
 * Page side, from before the story loads: every script animation the page makes
 * (the animator's) and the document time it was made. It also records when a
 * finger last lifted. The reduced-motion checks read a short cross-fade from it
 * after the fade ends. They date "since the lift" by the page's own lift, not
 * by a later read.
 */
function animationLog(): void {
  const w = window as unknown as {
    __tabBarMade?: {animation: Animation; at: number; wall: number}[];
    __tabBarLifted?: number;
  };
  if (w.__tabBarMade != null) {
    return;
  }
  // `at` is the document time, which stands still within a frame. `wall`
  // is the real time the animator made the run.
  const made: {animation: Animation; at: number; wall: number}[] = [];
  w.__tabBarMade = made;
  w.__tabBarLifted = 0;
  const now = () => Number(document.timeline.currentTime ?? 0);
  const animate = Element.prototype.animate;
  Element.prototype.animate = function (
    this: Element,
    ...args: Parameters<Element['animate']>
  ) {
    const animation = animate.apply(this, args);
    made.push({animation, at: now(), wall: performance.now()});
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
  // A press can replace the touched element, as the selected look's icon is.
  // The touch's pointerup still reaches the window; its touchend does not.
  window.addEventListener(
    'pointerup',
    event => {
      if (event.pointerType === 'touch') {
        w.__tabBarLifted = now();
      }
    },
    true,
  );
}

/** When a finger last lifted on the page, on the document timeline (0: never). */
const liftedAt = (page: Page) =>
  page.evaluate(
    () => (window as unknown as {__tabBarLifted?: number}).__tabBarLifted ?? 0,
  );

async function openBar(page: Page, story = 'default', title = 'lab-tabbar') {
  await page.addInitScript(animationLog);
  await openStory(page, storybook(), `${title}--${story}`);
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

/**
 * Each animation that ran on the lens itself since `mark`, a page time. That
 * is its body, its clip or the copy, never their `::before`: the glass and
 * its shadow. It reads the recorder's page log, which `watchAnimations`
 * arms. The log keeps `animate()` runs and CSS transitions alike. The read
 * changes nothing in it. In WebKit, a CSS run that starts and ends between
 * two frames never reaches the log. No drawn frame shows it either, and the
 * case judges every drawn frame.
 */
async function lensRuns(page: Page, mark: number) {
  return lensBody(page).evaluate((body, from) => {
    const log =
      (
        window as unknown as {
          __harnessAnimations?: {
            log: {animation: Animation; seenAt: number}[];
          };
        }
      ).__harnessAnimations?.log ?? [];
    return log
      .filter(({animation, seenAt}) => {
        const effect = animation.effect as KeyframeEffect | null;
        const target = effect?.target;
        return (
          seenAt >= from &&
          target != null &&
          body.contains(target) &&
          effect?.pseudoElement == null
        );
      })
      .map(({animation}) => {
        const frames = (animation.effect as KeyframeEffect).getKeyframes();
        const keys = Object.keys(frames[0] ?? {}).filter(
          key =>
            !['offset', 'computedOffset', 'easing', 'composite'].includes(key),
        );
        return `${animation.constructor.name} ${keys.join(' ')}`;
      });
  }, mark);
}

/** How strongly a tab's press paint shows: its layer's opacity, 0 when off. */
async function itemPaint(page: Page, name: string) {
  return tab(page, name)
    .locator('span')
    .first()
    .evaluate(element => {
      const layer = getComputedStyle(element, '::before');
      // A layer with no color paints nothing, whatever its opacity.
      return layer.backgroundColor === 'rgba(0, 0, 0, 0)'
        ? 0
        : Number(layer.opacity);
    });
}

/**
 * Reads the event listeners on what `expression` evaluates to, through CDP
 * (Chromium): each as its type and its capture and passive flags.
 */
async function cdpListeners(page: Page) {
  const cdp = await page.context().newCDPSession(page);
  return async (expression: string) => {
    const {result} = await cdp.send('Runtime.evaluate', {expression});
    const {listeners: found} = await cdp.send('DOMDebugger.getEventListeners', {
      objectId: result.objectId ?? '',
    });
    return found
      .map(
        listener =>
          `${listener.type}${listener.useCapture ? '/capture' : ''}${listener.passive ? '/passive' : ''}`,
      )
      .sort();
  };
}

/**
 * An init script that lets a test switch the presentation. It wraps
 * `matchMedia` for the coarse-pointer query. Then `window.__setCoarse(false)`
 * makes the page's code read a fine primary pointer and hear the change.
 * Stylesheets keep the real media.
 */
const PRESENTATION_SWITCH = () => {
  const real = window.matchMedia.bind(window);
  const listeners = new Set<(event: {matches: boolean}) => void>();
  let coarse: boolean | null = null;
  (window as unknown as {__setCoarse: (value: boolean) => void}).__setCoarse =
    value => {
      coarse = value;
      for (const listener of [...listeners]) {
        listener({matches: value});
      }
    };
  window.matchMedia = (query: string) => {
    const list = real(query);
    if (query !== '(pointer: coarse)') {
      return list;
    }
    return new Proxy(list, {
      get(target, key) {
        if (key === 'matches') {
          return coarse ?? target.matches;
        }
        if (key === 'addEventListener') {
          return (
            type: string,
            listener: (event: {matches: boolean}) => void,
          ) => {
            if (type === 'change') {
              listeners.add(listener);
            }
          };
        }
        if (key === 'removeEventListener') {
          return (
            _type: string,
            listener: (event: {matches: boolean}) => void,
          ) => {
            listeners.delete(listener);
          };
        }
        const value = Reflect.get(target, key, target);
        return typeof value === 'function' ? value.bind(target) : value;
      },
    });
  };
};

/**
 * A tab's paint timing now, beside what `values` resolve to in its place,
 * through a probe inside the item. Each is a duration in ms and a curve.
 */
async function paintTimingAgainst(
  page: Page,
  name: string,
  values: {duration: string; easing: string},
) {
  return tab(page, name)
    .locator('span')
    .first()
    .evaluate((element, wanted) => {
      const probe = document.createElement('span');
      probe.style.transitionDuration = wanted.duration;
      probe.style.transitionTimingFunction = wanted.easing;
      element.append(probe);
      const read = (style: CSSStyleDeclaration) => ({
        ms: parseFloat(style.transitionDuration) * 1000,
        easing: style.transitionTimingFunction,
      });
      const result = {
        have: read(getComputedStyle(element, '::before')),
        want: read(getComputedStyle(probe)),
      };
      probe.remove();
      return result;
    }, values);
}

/** Gives the bar a theme exit duration of its own. */
async function setExitDuration(page: Page, value: string) {
  await page
    .getByRole('tablist', {name: 'Sections'})
    .evaluate(
      (element, duration) =>
        element.style.setProperty('--duration-exit', duration),
      value,
    );
}

/** A scroller's scroll offset, by test id. */
async function scrollTopOf(page: Page, testId: string) {
  return page.getByTestId(testId).evaluate(element => element.scrollTop);
}

/** Scrolls a scroller to `top` at once, by test id. */
async function setScrollTop(page: Page, testId: string, top: number) {
  await page
    .getByTestId(testId)
    .evaluate((element, offset) => element.scrollTo({top: offset}), top);
  await expect.poll(() => scrollTopOf(page, testId)).toBe(top);
}

/**
 * Starts recording a scroller's offset every frame, from now until it has
 * read 0 or 2 s have passed. The returned function waits for the end and
 * gives the offsets.
 */
async function recordScrollTop(page: Page, testId: string) {
  await page.getByTestId(testId).evaluate(element => {
    const record = {offsets: [] as number[], isDone: false};
    (window as unknown as {__scrollRecord: typeof record}).__scrollRecord =
      record;
    const start = performance.now();
    const sample = () => {
      record.offsets.push(element.scrollTop);
      if (element.scrollTop === 0 || performance.now() - start > 2000) {
        record.isDone = true;
        return;
      }
      requestAnimationFrame(sample);
    };
    requestAnimationFrame(sample);
  });
  return async () => {
    await page.waitForFunction(
      () =>
        (window as unknown as {__scrollRecord: {isDone: boolean}})
          .__scrollRecord.isDone,
    );
    return page.evaluate(
      () =>
        (window as unknown as {__scrollRecord: {offsets: number[]}})
          .__scrollRecord.offsets,
    );
  };
}

/** How long a tab's paint takes to change now, in ms. */
async function paintFadeMs(page: Page, name: string) {
  return tab(page, name)
    .locator('span')
    .first()
    .evaluate(
      element =>
        parseFloat(getComputedStyle(element, '::before').transitionDuration) *
        1000,
    );
}

/**
 * The elements under test are on screen before anything is measured about
 * them: `count` of them, each with a nonzero box.
 */
async function expectPainted(locator: Locator, count = 1) {
  await expect(locator).toHaveCount(count);
  const boxes = await locator.evaluateAll(elements =>
    elements.map(element => {
      const rect = element.getBoundingClientRect();
      return {width: rect.width, height: rect.height};
    }),
  );
  for (const box of boxes) {
    expect(box.width, JSON.stringify(boxes)).toBeGreaterThan(0);
    expect(box.height, JSON.stringify(boxes)).toBeGreaterThan(0);
  }
}

/** A presented translateX, px (the animator drives `translate`). */
const translateX = async (locator: Locator) =>
  locator.evaluate(element => {
    const value = getComputedStyle(element).translate;
    return value === 'none' ? 0 : parseFloat(value);
  });

/** A presented scale (the animator drives `scale`). */
const scaleOf = async (locator: Locator) =>
  locator.evaluate(element => {
    const value = getComputedStyle(element).scale;
    if (value === 'none') {
      return {x: 1, y: 1};
    }
    const [x, y = x] = value.split(' ').map(Number);
    return {x, y};
  });

/** The capsule's left edge on screen, before its flex (its root is unscaled). */
async function capsuleLeft(page: Page) {
  return page.getByRole('tablist').evaluate(element => {
    const root = element.parentElement?.getBoundingClientRect();
    return (root?.left ?? 0) + (element as HTMLElement).offsetLeft;
  });
}

test('a selection made with the keys slides the lens on UIKit’s spring, the selected copy counter-moving', async ({
  page,
}, testInfo) => {
  await openFreezableBar(page);
  const from = await itemCenter(page, 'Home');
  const to = await itemCenter(page, 'Browse');
  await tab(page, 'Home').focus();
  await page.keyboard.press('ArrowRight');
  await page.keyboard.press('ArrowRight');
  // The scene stands still from before the key: the slide it starts is held at
  // its start. The copy that rides in the lens only while it slides stays
  // mounted, however slowly the test process reads them.
  await freezePage(page);
  await page.keyboard.press('Enter');
  await expect(tab(page, 'Browse')).toHaveAttribute('aria-selected', 'true');
  const body = lensBody(page);
  await waitForAnimation(body, {minProgressMs: 0});
  await holdAnimations(page, undefined, {
    judges: [
      {target: body, property: 'translate'},
      {target: lensCopy(page), property: 'translate'},
    ],
  });

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
  // Records the lens's centre as each finger lands: under a finger the
  // lens turns for the second finger the moment it lands.
  await page.evaluate(() => {
    const lens = document.querySelector('[data-tab-bar-lens-body]');
    const landings: number[] = [];
    (window as unknown as {__landings: number[]}).__landings = landings;
    window.addEventListener(
      'touchstart',
      () => {
        const box = lens?.getBoundingClientRect();
        if (box != null) {
          landings.push(box.x + box.width / 2);
        }
      },
      {capture: true},
    );
  });
  // The scene stands still from before the first tap: the slide it starts is
  // held at its start. Then the scene's own time steps it on until the lens is
  // past Library, however late the test process is. The second tap lands there,
  // with most of the slide still ahead.
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
  expect(frozenAt).toBeGreaterThan(library.x + 5);
  expect(frozenAt).toBeLessThan(profile.x - 20);
  await driver.tap(library);
  await thawPage(page);
  // Every frame's lens position from the thaw on, as it turns. Before it the
  // test stepped the scene's time itself, several steps to a frame.
  const sampling = sampleRects(lensBody(page), 1300);
  await expect(tab(page, 'Library')).toHaveAttribute('aria-selected', 'true');
  const turnedAt = await page.evaluate(
    () => (window as unknown as {__landings: number[]}).__landings[1],
  );
  // The second finger landed on the lens where the scene stood.
  expect(Math.abs(turnedAt - frozenAt)).toBeLessThan(0.5);
  const samples = (await sampling).flatMap(sample =>
    sample.box == null
      ? []
      : [{t: sample.t, x: sample.box.x + sample.box.width / 2}],
  );
  // It went on toward Profile and came back to Library, never jumping. A jump
  // to either end would cover the whole remaining distance (over 100 px) in
  // one frame. Only consecutive frames are compared, never samples a stall kept
  // apart.
  const steps = samples
    .slice(1)
    .flatMap((sample, i) =>
      sample.t - samples[i].t <= 34 ? [sample.x - samples[i].x] : [],
    );
  // The first frame after the thaw starts where the scene stood.
  expect(Math.abs(samples[0].x - frozenAt)).toBeLessThan(90);
  expect(
    Math.max(...steps.map(Math.abs)),
    JSON.stringify(samples),
  ).toBeLessThan(90);
  expect(Math.min(...samples.map(sample => sample.x))).toBeGreaterThan(
    home.x - 1,
  );
  await waitForRest(lensBody(page));
  expect(Math.abs((await lensCenterX(page)) - library.x)).toBeLessThan(0.5);
});

test('a finger landing before the last lift reaches the app keeps the lens heading for it', async ({
  page,
}) => {
  const {driver} = await openFreezableBar(page);
  const profile = await itemCenter(page, 'Profile');
  const library = await itemCenter(page, 'Library');
  const sampling = sampleRects(lensBody(page), 1400);
  // A tap on Profile, then a finger held on Library from right after that lift.
  // Inside the frames before the tap's choice reaches the app, which then moves
  // the lens's resting place under the held finger. The scene freezes on the
  // first finger's pointerdown, before the page's touchstart work starts any
  // motion. A loaded box can spend tens of ms in that work. While frozen, the
  // scene moves on by the script's own gaps. So the second finger lands 80 ms
  // into the first slide of the scene's time, however a loaded box stretches
  // the gaps. It thaws once the second finger is down; the hold is a wait after
  // the landing.
  const script: TouchScript = [
    {t: 0, fingers: [{id: 0, ...profile}]},
    {t: 60, fingers: []},
    {t: 80, fingers: [{id: 1, ...library}]},
    {t: 580, fingers: []},
  ];
  const events = toTouchEvents(script);
  await freezePageOn(page, 'pointerdown');
  await driver.play(script, {
    realtime: false,
    onEvent: async (step, index) => {
      if (index < 2) {
        await advanceFrozenPage(page, events[index + 1].t - step.t);
      } else if (index === 2) {
        await thawPage(page);
        await page.waitForTimeout(500);
      }
    },
  });
  await expect(tab(page, 'Library')).toHaveAttribute('aria-selected', 'true');
  const samples = (await sampling).flatMap(sample =>
    sample.box == null
      ? []
      : [{t: sample.t, x: sample.box.x + sample.box.width / 2}],
  );
  const centers = samples.map(sample => sample.x);
  // Only consecutive frames are compared, never samples a stall kept apart
  // (software-rendered WebKit can present no frame for a while around a
  // touch).
  const steps = samples
    .slice(1)
    .flatMap((sample, i) =>
      sample.t - samples[i].t <= 34 ? [sample.x - samples[i].x] : [],
    );
  expect(
    Math.max(...steps.map(Math.abs)),
    JSON.stringify(samples),
  ).toBeLessThan(90);
  // The lens turned back for the held finger and never reached Profile.
  expect(Math.max(...centers), JSON.stringify(centers)).toBeLessThan(
    profile.x - 30,
  );
  await waitForRest(lensBody(page));
  expect(Math.abs((await lensCenterX(page)) - library.x)).toBeLessThan(0.5);
});

test('a tap on the selected tab reselects it: the lens lifts and settles back', async ({
  page,
}) => {
  const {driver} = await openBar(page);
  const home = await itemCenter(page, 'Home');
  await driver.tap(home);
  await expect(page.getByTestId('reselects')).toHaveText('Reselected 1 times');
  await expect(tab(page, 'Home')).toHaveAttribute('aria-selected', 'true');
  await waitForRest(page.getByRole('tablist'));
  expect(Math.abs((await lensCenterX(page)) - home.x)).toBeLessThan(0.5);
  expect(await scaleOf(lensBody(page))).toEqual({x: 1, y: 1});
});

test('with no tab selected, a finger chooses the tab under it', async ({
  page,
}) => {
  const {driver} = await openBar(page, 'no-selection');
  await expect(page.getByRole('tab', {selected: true})).toHaveCount(0);
  const browse = await itemCenter(page, 'Browse');
  await driver.tap(browse);
  await expect(tab(page, 'Browse')).toHaveAttribute('aria-selected', 'true');
});

test('a held finger never starts text selection on the bar', async ({page}) => {
  const {driver} = await openBar(page);
  const browse = await itemCenter(page, 'Browse');
  const capsule = page.getByRole('tablist');
  // The lens's hold opts into the gesture host's selection lock (spec:AST-094
  // FR41). Off iOS that lock writes no style. It cancels selectstart on what
  // the finger holds, so the proof dispatches one there, during the hold and
  // after the lift.
  const refusesSelection = () =>
    tab(page, 'Browse').evaluate(element => {
      const event = new Event('selectstart', {bubbles: true, cancelable: true});
      element.dispatchEvent(event);
      return event.defaultPrevented;
    });
  let refusedWhileHeld: boolean | null = null;
  await driver.play(tapScript(browse, {holdMs: 600}), {
    onEvent: async (_step, index) => {
      if (index !== 0) {
        return;
      }
      // The hold has begun once the lens lifts.
      await waitForAnimation(capsule);
      refusedWhileHeld = await refusesSelection();
    },
  });
  expect(refusedWhileHeld).toBe(true);
  expect(await refusesSelection()).toBe(false);
});

test('a tap reports its choice once', async ({page}) => {
  const {driver} = await openBar(page, 'removed-on-lift');
  const read = () =>
    page.evaluate(
      () => (window as unknown as {__tabBarChanges: string[]}).__tabBarChanges,
    );
  await page.evaluate(() => {
    (window as unknown as {__tabBarChanges: string[]}).__tabBarChanges = [];
  });
  // Under a finger the lift reports, and the click the browser sends after
  // it must not report again (`spec:AST-094` FR21).
  await driver.tap(await itemCenter(page, 'Library'));
  await page.waitForTimeout(400);
  expect((await read()).filter(entry => entry === 'library')).toEqual([
    'library',
  ]);
});

test('a bar removed as the finger lifts reports nothing after it is gone', async ({
  page,
}) => {
  const {driver} = await openBar(page, 'removed-on-lift');
  await page.evaluate(() => {
    (window as unknown as {__tabBarChanges: string[]}).__tabBarChanges = [];
  });
  await driver.tap(await itemCenter(page, 'Library'));
  await expect(page.getByText('Removed')).toBeVisible();
  await page.waitForTimeout(400);
  // The lift reports from its own event, so the choice may arrive before
  // the app removes the bar in that event, never after.
  const log = await page.evaluate(
    () => (window as unknown as {__tabBarChanges: string[]}).__tabBarChanges,
  );
  expect(log.at(-1)).toBe('(removed)');
  expect(log.filter(entry => entry !== '(removed)')).toEqual(
    log.length > 1 ? ['library'] : [],
  );
});

test('a press ends without a choice when the tab list changes under it', async ({
  page,
}) => {
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  const {driver, bar} = await openBar(page, 'drops-last-tab');
  await page.evaluate(() => {
    (window as unknown as {__tabBarChanges: string[]}).__tabBarChanges = [];
  });
  const profile = await itemCenter(page, 'Profile');
  await driver.play(tapScript(profile, {holdMs: 600}), {
    onEvent: async (_step, index) => {
      if (index !== 0) {
        return;
      }
      // The hold has begun once the lens lifts; the app then drops Profile,
      // the tab under the finger.
      await waitForAnimation(bar);
      await page.evaluate(() =>
        window.dispatchEvent(new Event('tabbar:drop-last')),
      );
      await expect(tab(page, 'Profile')).toHaveCount(0);
    },
  });
  // Settled before anything is read: the lens comes back onto Home after the
  // lift, however long a loaded machine takes.
  await waitForRest(lensBody(page));
  expect(errors).toEqual([]);
  expect(
    await page.evaluate(
      () => (window as unknown as {__tabBarChanges: string[]}).__tabBarChanges,
    ),
  ).toEqual([]);
  await expect(tab(page, 'Home')).toHaveAttribute('aria-selected', 'true');
  // The lens settled back onto Home, in the three-tab bar.
  const home = await itemCenter(page, 'Home');
  expect(Math.abs((await lensCenterX(page)) - home.x)).toBeLessThan(1);
});

test('a press the tab list ends moves no focus at the lift: it chose nothing (family:action-groups FR1)', async ({
  page,
}) => {
  const {driver, bar} = await openBar(page, 'drops-last-tab');
  const library = await itemCenter(page, 'Library');
  await tab(page, 'Home').focus();
  await driver.play(tapScript(library, {holdMs: 600}), {
    onEvent: async (_step, index) => {
      if (index !== 0) {
        return;
      }
      // The hold has begun once the lens lifts; the app then drops Profile.
      // Library, under the finger, stays.
      await waitForAnimation(bar);
      await page.evaluate(() =>
        window.dispatchEvent(new Event('tabbar:drop-last')),
      );
      await expect(tab(page, 'Profile')).toHaveCount(0);
    },
  });
  await waitForRest(lensBody(page));
  await expect(tab(page, 'Home')).toHaveAttribute('aria-selected', 'true');
  await expect(tab(page, 'Home')).toBeFocused();
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

test('a finger landing lifts the lens and flexes the bar on UIKit’s springs, the lens heading for the finger', async ({
  page,
}, testInfo) => {
  const {driver} = await openFreezableBar(page);
  const home = await itemCenter(page, 'Home');
  const browse = await itemCenter(page, 'Browse');
  const capsule = page.getByRole('tablist');
  const LIFTED = await liftedScale(page);
  const times = Array.from({length: 31}, (_, i) => i * 16.667);
  let samples: {
    t: number;
    flex: number;
    liftX: number;
    liftY: number;
    glass: number;
    x: number;
  }[] = [];
  // The scene freezes as the finger lands. So the lift, the flex and the travel
  // it starts are held at their start however slowly the test process reads
  // them.
  await freezePageOn(page, 'touchstart');
  await driver.play(tapScript(browse, {holdMs: 1200}), {
    onEvent: async (_step, index) => {
      if (index !== 0) {
        return;
      }
      await waitForAnimation(capsule, {minProgressMs: 0});
      await holdAnimations(page, undefined, {
        judges: [
          {target: capsule, property: 'scale'},
          {target: lensBody(page), property: 'scale'},
          {target: lensBody(page), property: 'translate'},
          {
            target: page.locator('[data-tab-bar-lens-clip]'),
            property: 'opacity',
            pseudoElement: '::before',
          },
        ],
      });
      const flex = await sampleCurve(capsule, times);
      const body = await sampleCurve(lensBody(page), times);
      const glass = await samplePseudoOpacity(
        page.locator('[data-tab-bar-lens-clip]'),
        times,
      );
      samples = times.map((t, i) => ({
        t: +t.toFixed(1),
        flex: flex[i].transform.scaleX,
        liftX: body[i].transform.scaleX,
        liftY: body[i].transform.scaleY,
        glass: glass[i],
        x: body[i].transform.translateX,
      }));
      await releaseAnimations(page);
      await thawPage(page);
    },
  });
  await writeEvidence(
    'curves/tabbar-press',
    {[`${testInfo.project.name}.json`]: JSON.stringify(samples, null, 1)},
    testInfo,
  );
  const travel = browse.x - home.x;
  for (const s of samples) {
    const lift = springStep(LIFT, s.t);
    const where = JSON.stringify(s);
    expect(
      Math.abs(s.flex - (1 + (FLEX_SCALE - 1) * springStep(FLEX_PRESS, s.t))),
      where,
    ).toBeLessThan(0.002);
    expect(Math.abs(s.liftX - (1 + (LIFTED.x - 1) * lift)), where).toBeLessThan(
      0.005,
    );
    expect(Math.abs(s.liftY - (1 + (LIFTED.y - 1) * lift)), where).toBeLessThan(
      0.005,
    );
    expect(Math.abs(s.glass - lift), where).toBeLessThan(0.01);
    expect(
      Math.abs(s.x - travel * springStep(LENS_TRAVEL, s.t)),
      where,
    ).toBeLessThan(0.5);
  }
  // The lift commits Browse.
  await expect(tab(page, 'Browse')).toHaveAttribute('aria-selected', 'true');
});

test('the lift reports its choice from its own event, the settle already started (react-component-runtime INV2)', async ({
  page,
}) => {
  const {driver} = await openBar(page);
  const browse = await itemCenter(page, 'Browse');
  await page.evaluate(() => {
    const w = window as unknown as {
      __lift: {
        frames: number;
        atLift: number;
        atChoice: number;
        settling: boolean;
      };
    };
    w.__lift = {frames: 0, atLift: -1, atChoice: -1, settling: false};
    const tick = () => {
      w.__lift.frames += 1;
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
    window.addEventListener(
      'touchend',
      () => {
        w.__lift.atLift = w.__lift.frames;
      },
      {capture: true},
    );
    const tab = [...document.querySelectorAll('[role="tab"]')].find(element =>
      element.textContent?.includes('Browse'),
    );
    const body = document.querySelector('[data-tab-bar-lens-body]');
    new MutationObserver(() => {
      if (tab?.getAttribute('aria-selected') === 'true') {
        w.__lift.atChoice = w.__lift.frames;
        w.__lift.settling = (body?.getAnimations().length ?? 0) > 0;
      }
    }).observe(tab as Element, {attributeFilter: ['aria-selected']});
  });
  await driver.play(tapScript(browse, {holdMs: 200}));
  await expect(tab(page, 'Browse')).toHaveAttribute('aria-selected', 'true');
  const lift = await page.evaluate(
    () =>
      (
        window as unknown as {
          __lift: {
            frames: number;
            atLift: number;
            atChoice: number;
            settling: boolean;
          };
        }
      ).__lift,
  );
  // Chosen in the lift's own task: no frame between the lift and the choice.
  expect(lift.atLift).toBeGreaterThanOrEqual(0);
  expect(lift.atChoice).toBe(lift.atLift);
  // The settle was running when the app heard the choice.
  expect(lift.settling).toBe(true);
});

test('the lift settles the lens and relaxes the lift and the flex on UIKit’s springs', async ({
  page,
}) => {
  const {driver} = await openFreezableBar(page);
  const browse = await itemCenter(page, 'Browse');
  const capsule = page.getByRole('tablist');
  const LIFTED = await liftedScale(page);
  // The scene freezes as the finger lifts, so the settle the lift starts is
  // held at its start however slowly the test process reads it.
  await freezePageOn(page, 'touchend');
  // Held long enough for the press springs to settle.
  await driver.play(tapScript(browse, {holdMs: 1200}));
  // The choice reaches the app from the lift itself and restarts the lens's
  // travel from its new resting place. Hold the curves after that, so no held
  // animation is one the animator has since replaced.
  await expect(tab(page, 'Browse')).toHaveAttribute('aria-selected', 'true');
  await waitForAnimation(capsule, {minProgressMs: 0});
  await holdAnimations(page, undefined, {
    judges: [
      {target: capsule, property: 'scale'},
      {target: lensBody(page), property: 'scale'},
    ],
  });
  const times = Array.from({length: 37}, (_, i) => i * 16.667);
  const flex = await sampleCurve(capsule, times);
  const body = await sampleCurve(lensBody(page), times);
  await releaseAnimations(page, {finish: true});
  await thawPage(page);
  times.forEach((t, i) => {
    const where = JSON.stringify({t, flex: flex[i].transform.scaleX});
    expect(
      Math.abs(
        flex[i].transform.scaleX -
          (FLEX_SCALE + (1 - FLEX_SCALE) * springStep(FLEX_RELEASE, t)),
      ),
      where,
    ).toBeLessThan(0.002);
    expect(
      Math.abs(
        body[i].transform.scaleX -
          (LIFTED.x + (1 - LIFTED.x) * springStep(LIFT, t)),
      ),
      where,
    ).toBeLessThan(0.005);
  });
  await waitForRest(lensBody(page));
  expect(Math.abs((await lensCenterX(page)) - browse.x)).toBeLessThan(0.5);
});

test('a drag chases the finger and the lift commits the item nearest it', async ({
  page,
}) => {
  const {driver} = await openFreezableBar(page);
  const home = await itemCenter(page, 'Home');
  const profile = await itemCenter(page, 'Profile');
  const left = await capsuleLeft(page);
  const lags: number[] = [];
  let atRest = Infinity;
  const script = drag(home, profile, {durationMs: 600, restMs: 400});
  const events = toTouchEvents(script);
  // The body's offset is in the capsule's own coordinates, from Home.
  const lensX = async () =>
    (await translateX(lensBody(page))) + (home.x - left);
  // The scene's own clock times the drag. Frozen from before the first touch,
  // it moves on by each scripted gap. So every lag is read at its scripted
  // instant, however late the test process is.
  await freezePage(page);
  await driver.play(script, {
    realtime: false,
    onEvent: async (step, index) => {
      let stepped = 0;
      const finger = step.fingers[0]?.x;
      if (finger != null) {
        lags.push(finger - left - (await lensX()));
        if (index === events.length - 2) {
          stepped = 350;
          await advanceFrozenPage(page, stepped);
          atRest = finger - left - (await lensX());
        }
      }
      const next = events[index + 1];
      if (next != null) {
        await advanceFrozenPage(page, Math.max(0, next.t - step.t - stepped));
      }
    },
  });
  await thawPage(page);
  // The lens trails a moving finger but keeps up with it, and catches up
  // once it rests.
  const moving = lags.slice(3, -2);
  expect(Math.max(...moving)).toBeGreaterThan(1);
  expect(Math.max(...moving.map(Math.abs))).toBeLessThan(40);
  expect(Math.abs(atRest)).toBeLessThan(1);
  await expect(tab(page, 'Profile')).toHaveAttribute('aria-selected', 'true');
  await waitForRest(page.getByRole('tablist'));
  expect(Math.abs((await lensCenterX(page)) - profile.x)).toBeLessThan(0.5);
});

test('when the app keeps the old selection, the lens settles back onto it', async ({
  page,
}) => {
  const {driver} = await openBar(page, 'keeps-selection');
  const home = await itemCenter(page, 'Home');
  const profile = await itemCenter(page, 'Profile');
  await driver.play(drag(home, profile, {durationMs: 500, restMs: 300}));
  // The lift chose Profile; the app kept Home.
  await page.waitForTimeout(150);
  await expect(tab(page, 'Home')).toHaveAttribute('aria-selected', 'true');
  await expect(tab(page, 'Profile')).toHaveAttribute('aria-selected', 'false');
  await waitForRest(page.getByRole('tablist'));
  expect(Math.abs((await lensCenterX(page)) - home.x)).toBeLessThan(0.5);
  expect(await scaleOf(lensBody(page))).toEqual({x: 1, y: 1});
});

test('right to left, a drag runs from the first tab leftward and commits where it lifts', async ({
  page,
}) => {
  const {driver} = await openBar(page, 'right-to-left');
  const library = await itemCenter(page, 'Library');
  const profile = await itemCenter(page, 'Profile');
  // The later tab sits to the left.
  expect(profile.x).toBeLessThan(library.x);
  await driver.play(drag(library, profile, {durationMs: 500, restMs: 300}));
  await expect(tab(page, 'Profile')).toHaveAttribute('aria-selected', 'true');
  await waitForRest(page.getByRole('tablist'));
  expect(Math.abs((await lensCenterX(page)) - profile.x)).toBeLessThan(0.5);
});

test('a lift between two items commits the nearer one (an exact tie goes to the leading one: tabBarModel.test.ts)', async ({
  page,
}) => {
  const {driver} = await openBar(page);
  const library = await itemCenter(page, 'Library');
  const browse = await itemCenter(page, 'Browse');
  const midpoint = (library.x + browse.x) / 2;
  await driver.play(tapScript({x: midpoint + 3, y: library.y}, {holdMs: 120}));
  await expect(tab(page, 'Browse')).toHaveAttribute('aria-selected', 'true');
  await driver.play(tapScript({x: midpoint - 3, y: library.y}, {holdMs: 120}));
  await expect(tab(page, 'Library')).toHaveAttribute('aria-selected', 'true');
});

test('a finger dragged off the bar chooses nothing at the lift, and the lens shows the selected tab again: sliding off cancels (family:action-groups FR3)', async ({
  page,
}) => {
  const {driver} = await openBar(page);
  const home = await itemCenter(page, 'Home');
  const library = await itemCenter(page, 'Library');
  const across = [...drag(home, library, {durationMs: 300})];
  // Without the drag's own lift: the finger lifts off the bar instead.
  across.pop();
  const last = across[across.length - 1];
  const up = Array.from({length: 10}, (_, i) => ({
    t: last.t + (i + 1) * 16.7,
    fingers: [{id: 0, x: library.x, y: library.y - (i + 1) * 8}],
  }));
  const end = up[up.length - 1].t + 16.7;
  await driver.play([
    ...across,
    ...up,
    // Held off the bar, then lifted there.
    {t: end + 300, fingers: up[up.length - 1].fingers},
    {t: end + 316.7, fingers: []},
  ]);
  await expect(tab(page, 'Home')).toHaveAttribute('aria-selected', 'true');
  await waitForRest(lensBody(page));
  expect(Math.abs((await lensCenterX(page)) - home.x)).toBeLessThan(0.5);
});

test('a second finger landing mid-drag ends the press with nothing chosen, and the lens shows the selected tab again (family:action-groups FR3)', async ({
  page,
}) => {
  const {driver} = await openBar(page);
  test.skip(!driver.partialLifts, PARTIAL_LIFT_SKIP);
  const home = await itemCenter(page, 'Home');
  const browse = await itemCenter(page, 'Browse');
  const profile = await itemCenter(page, 'Profile');
  const first = withFinger(
    drag(home, browse, {durationMs: 500, restMs: 300}),
    1,
  );
  // The second finger lands mid-drag and lifts before the first.
  const second = withFinger(tapScript(profile, {holdMs: 100}), 2, 250);
  await driver.play(merge(first, second));
  await expect(tab(page, 'Home')).toHaveAttribute('aria-selected', 'true');
  await expect(page.getByTestId('reselects')).toHaveText('Reselected 0 times');
  await waitForRest(lensBody(page));
  expect(Math.abs((await lensCenterX(page)) - home.x)).toBeLessThan(0.5);
});

test('after a finger’s slide, focus moves to the chosen tab, as a tap on it does: it never stays on the tab the press left (family:action-groups FR1)', async ({
  page,
}) => {
  const {driver} = await openBar(page);
  const home = await itemCenter(page, 'Home');
  const library = await itemCenter(page, 'Library');
  await tab(page, 'Home').focus();
  await driver.play(drag(home, library, {durationMs: 500, restMs: 300}));
  await expect(tab(page, 'Library')).toHaveAttribute('aria-selected', 'true');
  await expect(tab(page, 'Library')).toBeFocused();
});

test('with no tab selected, a finger held on a tab paints it, and the paint follows a slide (family:action-groups FR2)', async ({
  page,
}) => {
  const {driver} = await openBar(page, 'no-selection');
  // No tab is selected, so there is no lens to show the press.
  await expect(page.locator('[data-tab-bar-lens]')).toHaveCount(0);
  const home = await itemCenter(page, 'Home');
  const library = await itemCenter(page, 'Library');
  const script = drag(home, library, {durationMs: 500, restMs: 300});
  await driver.play(script, {
    onEvent: async (_step, index) => {
      if (index === 0) {
        await expect(tab(page, 'Home')).toHaveAttribute('data-tab-bar-pressed');
        await expect.poll(() => itemPaint(page, 'Home')).toBe(1);
      }
      // The finger is on Library, before the lift.
      if (index === script.length - 2) {
        await expect(tab(page, 'Library')).toHaveAttribute(
          'data-tab-bar-pressed',
        );
        await expect(tab(page, 'Home')).not.toHaveAttribute(
          'data-tab-bar-pressed',
        );
      }
    },
  });
  await expect(tab(page, 'Library')).toHaveAttribute('aria-selected', 'true');
});

test('with Reduce Motion a finger paints its tab at once, and its release keeps a fade of 200 ms or less, even on a slow theme (design:reduced-motion DR2)', async ({
  page,
}) => {
  await page.emulateMedia({reducedMotion: 'reduce'});
  const {driver} = await openBar(page, 'no-selection');
  await setExitDuration(page, '300ms');
  const home = await itemCenter(page, 'Home');
  await driver.play(tapScript(home, {holdMs: 400}), {
    onEvent: async (_step, index) => {
      if (index === 0) {
        await expect(tab(page, 'Home')).toHaveAttribute('data-tab-bar-pressed');
        expect(await itemPaint(page, 'Home')).toBe(1);
        expect(await paintFadeMs(page, 'Home')).toBe(0);
      }
    },
  });
  await expect(tab(page, 'Home')).toHaveAttribute('aria-selected', 'true');
  await expect(tab(page, 'Home')).not.toHaveAttribute('data-tab-bar-pressed');
  expect(await paintFadeMs(page, 'Home')).toBe(200);
});

test('a finger’s release fades the paint on the theme’s exit duration and curve, and its onset is at once', async ({
  page,
}) => {
  const {driver} = await openBar(page, 'no-selection');
  // An exit duration apart from the fast one, so the read tells them apart.
  await setExitDuration(page, '90ms');
  const home = await itemCenter(page, 'Home');
  await driver.play(tapScript(home, {holdMs: 400}), {
    onEvent: async (_step, index) => {
      if (index === 0) {
        await expect(tab(page, 'Home')).toHaveAttribute('data-tab-bar-pressed');
        expect(await paintFadeMs(page, 'Home')).toBe(0);
      }
    },
  });
  await expect(tab(page, 'Home')).not.toHaveAttribute('data-tab-bar-pressed');
  const {have, want} = await paintTimingAgainst(page, 'Home', {
    duration: 'var(--duration-exit)',
    easing: 'var(--ease-exit)',
  });
  expect(want.ms).toBe(90);
  expect(have).toEqual(want);
});

test('a finger’s release fades only its paint layer’s opacity, which the compositor runs (spec:AST-094 FR5)', async ({
  page,
}) => {
  const {driver} = await openBar(page, 'no-selection');
  // A slow exit, so the fade still runs when it is read.
  await setExitDuration(page, '5000ms');
  const home = await itemCenter(page, 'Home');
  await driver.play(tapScript(home, {holdMs: 400}));
  await expect(tab(page, 'Home')).not.toHaveAttribute('data-tab-bar-pressed');
  const fades = await tab(page, 'Home')
    .locator('span')
    .first()
    .evaluate(box =>
      box.getAnimations({subtree: true}).flatMap(animation => {
        const effect = animation.effect as KeyframeEffect | null;
        if (effect?.target !== box) {
          return [];
        }
        return [
          {
            property:
              animation instanceof CSSTransition
                ? animation.transitionProperty
                : 'animation',
            layer: effect.pseudoElement,
          },
        ];
      }),
    );
  expect(fades).toEqual([{property: 'opacity', layer: '::before'}]);
});

test('choosing the selected tab again scrolls its own panel to the top, and no other scroller moves', async ({
  page,
}) => {
  const {driver} = await openBar(page, 'scroll-to-top');
  await setScrollTop(page, 'scroller-home', 800);
  await setScrollTop(page, 'scroller-library', 300);
  await setScrollTop(page, 'other-scroller', 100);
  const home = await itemCenter(page, 'Home');
  await driver.play(tapScript(home));
  await expect(page.getByTestId('reselects')).toHaveText('Reselected 1 times');
  await expect.poll(() => scrollTopOf(page, 'scroller-home')).toBe(0);
  expect(await scrollTopOf(page, 'scroller-library')).toBe(300);
  expect(await scrollTopOf(page, 'other-scroller')).toBe(100);
});

test('the panel glides back to the top over several frames', async ({page}) => {
  const {driver} = await openBar(page, 'scroll-to-top');
  await setScrollTop(page, 'scroller-home', 800);
  const offsets = await recordScrollTop(page, 'scroller-home');
  const home = await itemCenter(page, 'Home');
  await driver.play(tapScript(home));
  const read = await offsets();
  expect(read.at(-1)).toBe(0);
  // A glide passes through offsets between where it started and the top.
  expect(read.some(offset => offset > 0 && offset < 800)).toBe(true);
});

test('with Reduce Motion the panel jumps to the top at once', async ({
  page,
}) => {
  await page.emulateMedia({reducedMotion: 'reduce'});
  const {driver} = await openBar(page, 'scroll-to-top');
  await setScrollTop(page, 'scroller-home', 800);
  const offsets = await recordScrollTop(page, 'scroller-home');
  const home = await itemCenter(page, 'Home');
  await driver.play(tapScript(home));
  const read = await offsets();
  expect(read.at(-1)).toBe(0);
  expect(read.filter(offset => offset > 0 && offset < 800)).toEqual([]);
});

test('choosing another tab switches without scrolling any panel', async ({
  page,
}) => {
  const {driver} = await openBar(page, 'scroll-to-top');
  await setScrollTop(page, 'scroller-home', 800);
  await setScrollTop(page, 'scroller-library', 300);
  await setScrollTop(page, 'other-scroller', 100);
  const library = await itemCenter(page, 'Library');
  await driver.play(tapScript(library));
  await expect(tab(page, 'Library')).toHaveAttribute('aria-selected', 'true');
  await page.waitForTimeout(500);
  expect(await scrollTopOf(page, 'scroller-home')).toBe(800);
  expect(await scrollTopOf(page, 'scroller-library')).toBe(300);
  expect(await scrollTopOf(page, 'other-scroller')).toBe(100);
  await expect(page.getByTestId('reselects')).toHaveText('Reselected 0 times');
});

test('past the last item, still on the bar, the lens rubber-bands beyond it and the lift commits the last item; past the bar’s end the lift chooses nothing', async ({
  page,
}) => {
  const {driver} = await openBar(page);
  const home = await itemCenter(page, 'Home');
  const profile = await itemCenter(page, 'Profile');
  const left = await capsuleLeft(page);
  const right = await page
    .getByRole('tablist')
    .evaluate(element => (element as HTMLElement).offsetWidth);
  // Two px inside the bar's trailing end.
  const inside = {x: left + right - 2, y: profile.y};
  const script = drag(home, inside, {durationMs: 500, restMs: 900});
  let past = NaN;
  await driver.play(script, {
    onEvent: async (_step, index) => {
      if (index === script.length - 2) {
        await page.waitForTimeout(800);
        const lens = (await translateX(lensBody(page))) + (home.x - left);
        past = lens - (profile.x - left);
      }
    },
  });
  // Rubber-banded: past the last item, but by less than the finger is.
  expect(past).toBeGreaterThan(0.5);
  expect(past).toBeLessThan(inside.x - profile.x);
  await expect(tab(page, 'Profile')).toHaveAttribute('aria-selected', 'true');
  // Past the bar's end the finger is off the bar: the lift chooses nothing.
  await driver.play(
    drag(
      profile,
      {x: left + right + 20, y: profile.y},
      {durationMs: 400, restMs: 300},
    ),
  );
  await expect(tab(page, 'Profile')).toHaveAttribute('aria-selected', 'true');
  await expect(page.getByTestId('reselects')).toHaveText('Reselected 0 times');
});

test('a vertical drag that starts on the bar never scrolls the page, and lifted off the bar it chooses nothing', async ({
  page,
  browserName,
}) => {
  test.skip(
    browserName !== 'chromium',
    'native scrolling from injected touches is Chromium-only in Playwright',
  );
  const {driver} = await openBar(page);
  const library = await itemCenter(page, 'Library');
  const before = await page.evaluate(() => window.scrollY);
  await driver.play(
    drag(library, {x: library.x, y: library.y - 300}, {durationMs: 300}),
  );
  await page.waitForTimeout(300);
  expect(await page.evaluate(() => window.scrollY)).toBe(before);
  await expect(tab(page, 'Home')).toHaveAttribute('aria-selected', 'true');
});

test('the slide keeps advancing every frame while the main thread is blocked', async ({
  page,
  browserName,
}, testInfo) => {
  test.skip(
    browserName !== 'chromium',
    'screencast frame evidence is Chromium-only in Playwright (WebKit: the iOS simulator)',
  );
  const {driver} = await openBar(page);
  const body = lensBody(page);
  const profile = await itemCenter(page, 'Profile');
  await markElement(body);
  // The compositor's own control rides in the same cast. A stall the compositor
  // itself makes on a loaded runner stalls it too. So the move is judged
  // against what the compositor presented, not against a fixed bound.
  await startBusyControl(page);
  const cast = await startScreencast(page);
  // Armed before the tap, the page blocks itself in the frame that sees the
  // slide running. One evaluate sees it and blocks, so no runner latency
  // between the two can eat the slide first. The judged part ends where the
  // lens settles (settledWithin).
  const blocking = blockMainThread(page, 600, {during: body});
  await driver.tap(profile);
  const block = await blocking;
  await page.waitForTimeout(150);
  const castFrames = await cast.stop();
  const [tracked, control] = await trackMarkers(page, castFrames, {
    colors: [MARKER_RGB, CONTROL_RGB],
  });
  const proof = busyWindowProof(
    tracked,
    {from: block.from, to: block.to},
    {
      axis: 'x',
      settledWithin: 2,
      // Screencast throughput, not the animation: no display-rate bound.
      maxMedianFrameMs: Infinity,
      control,
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
  // The harness's verdict: no stall past two dropped screencast frames, and the
  // frames moving. A loaded machine drops a frame or two; a frozen slide
  // presents none.
  expect(
    proof.verdict.pass,
    `${proof.summary}; ${proof.verdict.failures.join('; ')}`,
  ).toBe(true);
});

/**
 * Notes, on the page, when the DOM change an action makes has rendered. That is
 * three frames after the first change once armed (with `attribute`, the first
 * that changes it). The three frames are the one that styles, lays out and
 * paints the change, the one that paints its animations' layers, and a clean
 * one. A rendering proof counts per-frame work from there, not from a fixed
 * delay a loaded machine stretches.
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

test('a press, its lift, flex and travel, does no Layout or Paint per frame', async ({
  page,
  browserName,
}) => {
  test.skip(browserName !== 'chromium', 'rendering traces are Chromium-only');
  const {driver} = await openBar(page);
  const capsule = page.getByRole('tablist');
  const target = await itemCenter(page, 'Profile');
  let press = {from: 0, to: 0};
  // Held for 700 ms: the lens travels, lifts and the bar flexes with no render
  // at all. Counted from three frames after the press's own DOM change (its
  // render, then the layers its new animations take), not from a fixed delay.
  // The count runs until the finger lifts, by the page's own lift time. Nothing
  // renders in between, the curves' ends included.
  await noteSettle(page);
  const trace = await traceRendering(page, async () => {
    const playing = driver.play(tapScript(target, {holdMs: 700}));
    [press] = await waitForAnimation(capsule);
    await playing;
    await waitForRest(capsule);
  });
  const from = await settledAt(page);
  expect(from, 'the press changed no DOM').toBeGreaterThan(0);
  const to = await page.evaluate(
    () =>
      performance.timeOrigin +
      ((window as unknown as {__tabBarLifted?: number}).__tabBarLifted ?? 0),
  );
  expect(to - from, 'counted window, ms').toBeGreaterThan(100);
  const during = countBetween(trace, from, to);
  const when = trace.events
    .filter(e => e.name === 'Layout' || e.name === 'Paint')
    .map(e => `${e.name}@${Math.round(e.t - press.from)}`);
  expect(during.Layout ?? 0, JSON.stringify({during, when})).toBe(0);
  expect(during.Paint ?? 0, JSON.stringify({during, when})).toBe(0);
  await expect(tab(page, 'Profile')).toHaveAttribute('aria-selected', 'true');
});

/** The document's timeline now, to read only the animations a change starts. */
const timelineNow = (page: Page) =>
  page.evaluate(() => Number(document.timeline.currentTime ?? 0));

/**
 * Every animation running in the document (CSS transitions included) that
 * started at or after `since`, as the reduced-motion checks read it. For each:
 * the properties its keyframes interpolate, and when its curve reaches its end
 * value (the animator holds the end after it). A value that only jumps, at one
 * offset, moves nothing on screen. The animator's own are read from the page's
 * log too, so one that ended before the read (a cross-fade is short) is still
 * read.
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
  assertOpacityOnly(animations);
}

/**
 * The animator's cross-fade under Reduce Motion on a touch screen: 200 ms on
 * UIKit's easeInEaseOut, as core's `reducedMotionCrossFade` sets it. The
 * design rule asks only for opacity, within 200 ms.
 */
const REDUCED_MOTION_FADE = {ms: 200, curve: [0.42, 0, 0.58, 1]} as const;

/**
 * design:reduced-motion DR2 on animations already read, the fade itself not
 * required: every one changes opacity only and ends within 200 ms.
 */
function assertOpacityOnly(
  animations: Awaited<ReturnType<typeof runningAnimations>>,
) {
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

test('a disabled tab is announced disabled on the tab itself, with its name, in the accessibility tree (spec:AST-085 FR5)', async ({
  page,
  browserName,
}) => {
  test.skip(browserName !== 'chromium', 'reads Chromium’s accessibility tree');
  await openBar(page, 'disabled-tab');
  const cdp = await page.context().newCDPSession(page);
  const {nodes} = await cdp.send('Accessibility.getFullAXTree');
  const tabs = nodes
    .filter(node => node.ignored !== true && node.role?.value === 'tab')
    .map(node => ({
      name: node.name?.value,
      disabled:
        node.properties?.some(
          property =>
            property.name === 'disabled' && property.value.value === true,
        ) ?? false,
    }));
  expect(tabs).toContainEqual({name: 'Browse', disabled: true});
  expect(tabs.filter(entry => entry.disabled)).toHaveLength(1);
});

test('a finger landing on a disabled tab moves and lifts nothing (UIKit ignores the tap)', async ({
  page,
}) => {
  const {driver} = await openFreezableBar(page, 'disabled-tab');
  const home = await itemCenter(page, 'Home');
  const browse = await itemCenter(page, 'Browse');
  const capsule = page.getByRole('tablist');
  let held: {
    lens: number;
    lift: {x: number; y: number};
    flex: {x: number; y: number};
  } | null = null;
  // The scene freezes as the finger lands, then runs 120 ms by its own
  // clock. A lift would be well under way by then.
  await freezePageOn(page, 'touchstart');
  await driver.play(tapScript(browse, {holdMs: 200}), {
    onEvent: async (_step, index) => {
      if (index !== 0) {
        return;
      }
      await advanceFrozenPage(page, 120);
      held = {
        lens: await lensCenterX(page),
        lift: await scaleOf(lensBody(page)),
        flex: await scaleOf(capsule),
      };
      await thawPage(page);
    },
  });
  const atHold = held as {
    lens: number;
    lift: {x: number; y: number};
    flex: {x: number; y: number};
  } | null;
  expect(atHold).not.toBeNull();
  expect(atHold?.lift).toEqual({x: 1, y: 1});
  expect(atHold?.flex).toEqual({x: 1, y: 1});
  expect(Math.abs((atHold?.lens ?? Infinity) - home.x)).toBeLessThan(0.5);
  await expect(tab(page, 'Home')).toHaveAttribute('aria-selected', 'true');
});

test('a lift over a disabled tab leaves the selection, and the lens settles back', async ({
  page,
}) => {
  const {driver} = await openBar(page, 'disabled-tab');
  const home = await itemCenter(page, 'Home');
  const browse = await itemCenter(page, 'Browse');
  await driver.play(drag(home, browse, {durationMs: 400, restMs: 200}));
  await expect(tab(page, 'Home')).toHaveAttribute('aria-selected', 'true');
  await expect(tab(page, 'Browse')).toHaveAttribute('aria-disabled', 'true');
  await expect
    .poll(async () => Math.abs((await lensCenterX(page)) - home.x), {
      timeout: 3000,
    })
    .toBeLessThan(0.5);
});

test('a drag from a disabled tab lifts the lens once it drags, and the lift chooses the tab under the finger', async ({
  page,
}) => {
  const {driver} = await openBar(page, 'disabled-tab');
  const browse = await itemCenter(page, 'Browse');
  const profile = await itemCenter(page, 'Profile');
  let lifted: {x: number; y: number} | null = null;
  const script = drag(browse, profile, {durationMs: 500, restMs: 300});
  await driver.play(script, {
    onEvent: async (_step, index) => {
      // The finger rests over Profile before it lifts.
      if (index === script.length - 2) {
        lifted = await scaleOf(lensBody(page));
      }
    },
  });
  const atRest = lifted as {x: number; y: number} | null;
  expect(atRest?.x ?? 1).toBeGreaterThan(1);
  await expect(tab(page, 'Profile')).toHaveAttribute('aria-selected', 'true');
});

test('a finger that lands on a disabled tab and lifts within the slop over a neighbour chooses the neighbour, painted while held (family:action-groups FR1)', async ({
  page,
}) => {
  const {driver} = await openBar(page, 'disabled-tab-no-selection');
  const browse = await itemCenter(page, 'Browse');
  const box = await tab(page, 'Browse').boundingBox();
  if (box == null) {
    throw new Error('no Browse tab');
  }
  // 3 px inside Browse on Library's side, then 7 px onto Library: under the
  // 10 px slop.
  const from = {x: box.x + 3, y: browse.y};
  const to = {x: from.x - 7, y: browse.y};
  let painted: string[] | null = null;
  const script = drag(from, to, {durationMs: 200, restMs: 200});
  await driver.play(script, {
    onEvent: async (_step, index) => {
      if (index === script.length - 2) {
        painted = await page
          .locator('[data-tab-bar-pressed]')
          .evaluateAll(tabs => tabs.map(tab => tab.textContent ?? ''));
      }
    },
  });
  expect(painted).toEqual(['Library']);
  await expect(tab(page, 'Library')).toHaveAttribute('aria-selected', 'true');
});

test('a finger that lands on a disabled tab and lifts within the slop over a neighbour chooses the neighbour, the lens lifted over it while held (family:action-groups FR1, FR2)', async ({
  page,
}) => {
  const {driver} = await openBar(page, 'disabled-tab');
  const browse = await itemCenter(page, 'Browse');
  const library = await itemCenter(page, 'Library');
  const box = await tab(page, 'Browse').boundingBox();
  if (box == null) {
    throw new Error('no Browse tab');
  }
  const home = await itemCenter(page, 'Home');
  const from = {x: box.x + 3, y: browse.y};
  const to = {x: from.x - 7, y: browse.y};
  // While the finger rests on Library, the lens is lifted and has left Home.
  let held: {lift: {x: number; y: number}; lens: number} | null = null;
  const script = drag(from, to, {durationMs: 200, restMs: 200});
  await driver.play(script, {
    onEvent: async (_step, index) => {
      if (index === script.length - 2) {
        held = {
          lift: await scaleOf(lensBody(page)),
          lens: await lensCenterX(page),
        };
      }
    },
  });
  const atRest = held as {lift: {x: number; y: number}; lens: number} | null;
  expect(atRest?.lift.x ?? 1).toBeGreaterThan(1);
  expect(atRest?.lens ?? home.x).toBeGreaterThan(home.x + 30);
  await expect(tab(page, 'Library')).toHaveAttribute('aria-selected', 'true');
  await expect(tab(page, 'Home')).toHaveAttribute('aria-selected', 'false');
  await expect
    .poll(async () => Math.abs((await lensCenterX(page)) - library.x), {
      timeout: 3000,
    })
    .toBeLessThan(0.5);
});

test('a drag over a disabled tab returns the lens to the selected tab, since the lift there chooses nothing; the disabled tab keeps its paint (spec:AST-085 FR6)', async ({
  page,
}) => {
  const {driver, bar} = await openBar(page, 'disabled-tab');
  const home = await itemCenter(page, 'Home');
  const browse = await itemCenter(page, 'Browse');
  const box = await bar.boundingBox();
  if (box == null) {
    throw new Error('no bar');
  }
  // Where an item sits under the press's flex (about the capsule's centre).
  const center = box.x + box.width / 2;
  const flexed = (x: number) => center + (x - center) * FLEX_SCALE;
  // Just short of Browse's centre: over Browse, a disabled tab.
  const over = {x: browse.x - 5, y: browse.y};
  // The lens's farthest point on the way, as it chases the finger.
  let farthest = -Infinity;
  let held: {
    lens: number;
    color: string;
    weight: string;
    accent: string;
  } | null = null;
  const script = drag(home, over, {durationMs: 500, restMs: 600});
  await driver.play(script, {
    onEvent: async (_step, index) => {
      farthest = Math.max(farthest, await lensCenterX(page));
      if (index !== script.length - 2) {
        return;
      }
      // The finger holds over Browse until the lens comes to rest.
      await waitForRest(lensBody(page));
      const paint = await page.evaluate(() => {
        const item = document.querySelector(
          '[data-tab-bar-copy-item="browse"]',
        );
        const label = item?.querySelector(':scope > span:last-child');
        const enabled = document.querySelector(
          '[data-tab-bar-copy-item="home"]',
        );
        return {
          color: item == null ? '' : getComputedStyle(item).color,
          weight: label == null ? '' : getComputedStyle(label).fontWeight,
          accent: enabled == null ? '' : getComputedStyle(enabled).color,
        };
      });
      held = {lens: await lensCenterX(page), ...paint};
    },
  });
  const atHold = held as {
    lens: number;
    color: string;
    weight: string;
    accent: string;
  } | null;
  expect(atHold).not.toBeNull();
  // On the way the lens chased the finger away from Home.
  expect(farthest).toBeGreaterThan(flexed(home.x) + 30);
  // Over Browse it waits on Home, the selected tab: nothing is highlighted
  // over a disabled tab.
  expect(Math.abs((atHold?.lens ?? Infinity) - flexed(home.x))).toBeLessThan(
    0.5,
  );
  // Browse keeps its disabled paint in the lens's copy, not the selected look.
  expect(atHold?.color).not.toBe('');
  expect(atHold?.color).not.toBe(atHold?.accent);
  expect(atHold?.weight).not.toBe('600');
  // The lift over a disabled tab chooses nothing.
  await expect(tab(page, 'Home')).toHaveAttribute('aria-selected', 'true');
});

test('with Reduce Motion the settle back from a disabled tab cross-fades', async ({
  page,
}) => {
  await page.emulateMedia({reducedMotion: 'reduce'});
  const {driver} = await openBar(page, 'disabled-tab');
  const home = await itemCenter(page, 'Home');
  const browse = await itemCenter(page, 'Browse');
  await driver.play(drag(home, browse, {durationMs: 400, restMs: 300}));
  // Since the page's own lift, not a read the test makes after it.
  const released = await liftedAt(page);
  expect(released, 'no lift reached the page').toBeGreaterThan(0);
  // The fade starts with the input; what it changes follows a few frames
  // later.
  await expectCrossFade(page, released);
  await expect(tab(page, 'Home')).toHaveAttribute('aria-selected', 'true');
  assertOpacityOnly(await runningAnimations(page, released));
});

test.describe('with Reduce Motion (design:reduced-motion)', () => {
  test('on a touch screen a tap shows the lifted look at once, as UIKit’s does, and fades it only at the lift: opacity only, within 200 ms', async ({
    page,
  }) => {
    await page.emulateMedia({reducedMotion: 'reduce'});
    const {driver} = await openBar(page);
    const to = await itemCenter(page, 'Browse');
    const glass = page.locator('[data-tab-bar-lens-clip]');
    // Every frame from here: the lifted look's opacity, the glass (the
    // clip's ::before) and its shadow (the body's ::before).
    await page.evaluate(() => {
      const w = window as unknown as {
        __liftFrames: {t: number; glass: number; shadow: number}[];
        __liftDown: number;
        __liftUp: number;
      };
      w.__liftFrames = [];
      w.__liftDown = 0;
      w.__liftUp = 0;
      window.addEventListener(
        'touchstart',
        () => {
          w.__liftDown = performance.now();
        },
        {capture: true, once: true},
      );
      // The press ends at the touch's pointerup, before its touchend. The
      // lens dates its lowering from there.
      const lifted = (event: Event) => {
        if (
          w.__liftUp === 0 &&
          (!(event instanceof PointerEvent) || event.pointerType === 'touch')
        ) {
          w.__liftUp = performance.now();
        }
      };
      window.addEventListener('pointerup', lifted, {capture: true});
      window.addEventListener('touchend', lifted, {capture: true});
      const opacityOf = (selector: string) => {
        const element = document.querySelector(selector);
        return element == null
          ? NaN
          : Number(getComputedStyle(element, '::before').opacity);
      };
      const step = () => {
        w.__liftFrames.push({
          t: performance.now(),
          glass: opacityOf('[data-tab-bar-lens-clip]'),
          shadow: opacityOf('[data-tab-bar-lens-body]'),
        });
        if (w.__liftFrames.length < 600) {
          requestAnimationFrame(step);
        }
      };
      requestAnimationFrame(step);
    });
    const since = await timelineNow(page);
    // The lowering's course is read held, at set moments. A press under
    // Reduce Motion only sets the lifted look. So the first new runs on the
    // glass and its shadow are the lowering's, and the page holds them as
    // they start.
    const hold = await armHold(page, lensBody(page), {
      judges: [
        {target: glass, property: 'opacity', pseudoElement: '::before'},
        {
          target: lensBody(page),
          property: 'opacity',
          pseudoElement: '::before',
        },
      ],
      count: 2,
      newOnly: true,
    });
    await driver.play(tapScript(to, {holdMs: 500}));
    await hold.held();
    const times = Array.from({length: 16}, (_, i) => (i * 1000) / 60);
    const glassAt = await samplePseudoOpacity(glass, times);
    const shadowAt = await samplePseudoOpacity(lensBody(page), times);
    await releaseAnimations(page, {finish: true});
    await expect(tab(page, 'Browse')).toHaveAttribute('aria-selected', 'true');
    await waitForRest(lensBody(page));
    const {frames, down, up, lowerings} = await page.evaluate(from => {
      const w = window as unknown as {
        __liftFrames: {t: number; glass: number; shadow: number}[];
        __liftDown: number;
        __liftUp: number;
        __tabBarMade?: {animation: Animation; at: number; wall: number}[];
      };
      const layers = [
        document.querySelector('[data-tab-bar-lens-clip]'),
        document.querySelector('[data-tab-bar-lens-body]'),
      ];
      return {
        frames: w.__liftFrames,
        down: w.__liftDown,
        up: w.__liftUp,
        // When the animator made each fade of the glass and its shadow. A
        // set is a run of one value, which is no fade.
        lowerings: (w.__tabBarMade ?? [])
          .filter(({animation, at}) => {
            const effect = animation.effect as KeyframeEffect | null;
            const values = new Set(
              effect?.getKeyframes().map(frame => frame.opacity),
            );
            values.delete(undefined);
            return (
              at >= from &&
              effect?.pseudoElement === '::before' &&
              layers.includes(effect.target) &&
              values.size > 1
            );
          })
          .map(({wall}) => wall),
      };
    }, since);
    expect(down, 'no touch reached the page').toBeGreaterThan(0);
    expect(up, 'no lift reached the page').toBeGreaterThan(down);
    // The first frame drawn after the touch shows the lifted look. It must
    // come while one starvation threshold of a fade is still left to draw.
    const [first] = requireFrames(frames, {
      min: 1,
      during: 'the frame after the touch',
      where: frame =>
        frame.t > down &&
        frame.t <= down + REDUCED_MOTION_FADE.ms - FRAME_STARVATION_MS,
    });
    const isLifted = (frame: {glass: number; shadow: number}) =>
      frame.glass >= 0.99 && frame.shadow >= 0.99;
    expect(isLifted(first), 'the first frame after the touch').toBe(true);
    // Every frame drawn from it to the lift shows the lifted look too.
    expect(
      frames
        .filter(frame => frame.t >= first.t && frame.t < up)
        .filter(frame => !isLifted(frame))
        .map(frame => Math.round(frame.t - down)),
      'ms after the touch of each held frame without the lifted look',
    ).toEqual([]);
    // The animator makes the two fades in the lift's own event: after the
    // pointerup, and before the page draws its next frame.
    const [next] = requireFrames(frames, {
      min: 1,
      during: 'the frame after the lift',
      where: frame => frame.t > up,
    });
    expect(lowerings, 'the fades of the glass and its shadow').toHaveLength(2);
    expect(
      lowerings
        .filter(wall => wall < up || wall > next.t)
        .map(wall => Math.round(wall - up)),
      'ms after the lift of each fade made outside its event',
    ).toEqual([]);
    // Each held moment follows the animator's cross-fade.
    const fade = cubicBezier(...REDUCED_MOTION_FADE.curve);
    const fading = (t: number) =>
      1 - fade(Math.min(1, Math.max(0, t / REDUCED_MOTION_FADE.ms)));
    for (const [layer, values] of [
      ['glass', glassAt],
      ['shadow', shadowAt],
    ] as const) {
      const curve = compareCurve(
        times.map((t, index) => ({t, value: values[index]})),
        fading,
        0.02,
      );
      expect(
        curve.maxError,
        `the ${layer}'s fade: ${JSON.stringify(curve.worst)}`,
      ).toBeLessThanOrEqual(0.02);
      // Past 200 ms the held fade reads its end value exactly.
      expect(
        values[values.length - 1],
        `the ${layer} at the end of the lift`,
      ).toBeLessThanOrEqual(0.01);
    }
    assertOpacityOnly(await runningAnimations(page, since));
    expect(Math.abs((await lensCenterX(page)) - to.x)).toBeLessThan(0.5);
  });

  test('on a touch screen a tap held 150 ms puts the lens on the touched tab at once: a lens on every frame, and no fade of its own', async ({
    page,
  }) => {
    await page.emulateMedia({reducedMotion: 'reduce'});
    const {driver} = await openBar(page);
    const to = await itemCenter(page, 'Profile');
    // Every frame from here: the lens's own opacity.
    await lensBody(page).evaluate(body => {
      const w = window as unknown as {
        __lensFrames: {t: number; opacity: number}[];
        __lensDown: number;
      };
      w.__lensFrames = [];
      w.__lensDown = 0;
      window.addEventListener(
        'touchstart',
        () => {
          w.__lensDown = performance.now();
        },
        {capture: true, once: true},
      );
      const step = () => {
        w.__lensFrames.push({
          t: performance.now(),
          opacity: Number(getComputedStyle(body).opacity),
        });
        if (w.__lensFrames.length < 600) {
          requestAnimationFrame(step);
        }
      };
      requestAnimationFrame(step);
    });
    // The recorder logs each animation from its first frame, CSS
    // transitions too. The watch arms it before the tap.
    await watchAnimations(lensBody(page));
    const mark = await page.evaluate(() => performance.now());
    const opacity = () =>
      lensBody(page).evaluate(body => Number(getComputedStyle(body).opacity));
    expect(await opacity(), 'the lens before the tap').toBe(1);
    await driver.play(tapScript(to, {holdMs: 150}));
    await expect(tab(page, 'Profile')).toHaveAttribute('aria-selected', 'true');
    await waitForRest(lensBody(page));
    const {frames, down} = await page.evaluate(() => {
      const w = window as unknown as {
        __lensFrames: {t: number; opacity: number}[];
        __lensDown: number;
      };
      return {frames: w.__lensFrames, down: w.__lensDown};
    });
    expect(down, 'no touch reached the page').toBeGreaterThan(0);
    // The first frame drawn after the touch shows the lens. It must come
    // while one starvation threshold of a fade is still left to draw.
    const [first] = requireFrames(frames, {
      min: 1,
      during: 'the frame after the touch',
      where: frame =>
        frame.t > down &&
        frame.t <= down + REDUCED_MOTION_FADE.ms - FRAME_STARVATION_MS,
    });
    expect(
      first.opacity,
      'the lens in the first frame after the touch',
    ).toBeGreaterThanOrEqual(0.9);
    // Every frame drawn after the touch shows the lens.
    expect(
      frames
        .filter(frame => frame.t > down && !(frame.opacity >= 0.9))
        .map(frame => Math.round(frame.t - down)),
      'ms after the touch of each drawn frame with the lens faded',
    ).toEqual([]);
    // No animation ran on the lens itself, even one that ended between two
    // frames.
    expect(
      await lensRuns(page, mark),
      'each animation that ran on the lens itself',
    ).toEqual([]);
    expect(await opacity(), 'the lens at rest').toBe(1);
    expect(Math.abs((await lensCenterX(page)) - to.x)).toBeLessThan(0.5);
  });

  test('on a touch screen a held lens shows the touched tab in its selected look, as UIKit’s does, through the lift to rest', async ({
    page,
  }, testInfo) => {
    await page.emulateMedia({reducedMotion: 'reduce'});
    const {driver} = await openBar(page);
    const to = await itemCenter(page, 'Profile');
    // Every frame from here: whether Profile shows its selected look. Either
    // the lens holds the opaque selected copy with Profile's at its centre, or
    // the copy is gone and Profile's own item draws the look.
    await page.evaluate(() => {
      const w = window as unknown as {
        __copyFrames: {t: number; selected: boolean; copy: boolean}[];
        __copyDown: number;
        __copyUp: number;
      };
      w.__copyFrames = [];
      w.__copyDown = 0;
      w.__copyUp = 0;
      window.addEventListener(
        'touchstart',
        () => {
          w.__copyDown = performance.now();
        },
        {capture: true, once: true},
      );
      // The press ends at the touch's pointerup, before its touchend.
      const lifted = (event: Event) => {
        if (
          w.__copyUp === 0 &&
          (!(event instanceof PointerEvent) || event.pointerType === 'touch')
        ) {
          w.__copyUp = performance.now();
        }
      };
      window.addEventListener('pointerup', lifted, {capture: true});
      window.addEventListener('touchend', lifted, {capture: true});
      const centre = (element: Element | null) => {
        const box = element?.getBoundingClientRect();
        return box == null ? NaN : box.left + box.width / 2;
      };
      const step = () => {
        const copy = document.querySelector('[data-tab-bar-copy]');
        const item = copy?.querySelector('[data-tab-bar-copy-item="profile"]');
        const lens = document.querySelector('[data-tab-bar-lens-body]');
        const label = Array.from(
          document.querySelectorAll(
            '[role="tab"][data-tab-bar-value="profile"] span',
          ),
        ).find(
          span => span.children.length === 0 && span.textContent === 'Profile',
        );
        const inLens =
          copy != null &&
          Number(getComputedStyle(copy).opacity) >= 0.99 &&
          Math.abs(centre(item ?? null) - centre(lens)) < 1;
        // Its effective opacity: its own and its ancestors', multiplied.
        let opacity = 1;
        for (
          let node = label ?? null;
          node != null;
          node = node.parentElement
        ) {
          opacity *= Number(getComputedStyle(node).opacity);
        }
        const own =
          copy == null &&
          label != null &&
          Number(getComputedStyle(label).fontWeight) >= 600 &&
          opacity >= 0.99;
        w.__copyFrames.push({
          t: performance.now(),
          selected: inLens || own,
          copy: copy != null,
        });
        if (w.__copyFrames.length < 600) {
          requestAnimationFrame(step);
        }
      };
      requestAnimationFrame(step);
    });
    await driver.play(tapScript(to, {holdMs: 300}));
    await expect(tab(page, 'Profile')).toHaveAttribute('aria-selected', 'true');
    await waitForRest(lensBody(page));
    await expect(lensCopy(page)).toHaveCount(0);
    // At rest from here. The trace goes on until it holds a frame drawn
    // after this.
    const rested = await page.evaluate(() => performance.now());
    await page.waitForFunction(
      at => {
        const frames = (window as unknown as {__copyFrames: {t: number}[]})
          .__copyFrames;
        return frames.length > 0 && frames[frames.length - 1].t > at;
      },
      rested,
      {timeout: 2000},
    );
    const {frames, down, up} = await page.evaluate(() => {
      const w = window as unknown as {
        __copyFrames: {t: number; selected: boolean; copy: boolean}[];
        __copyDown: number;
        __copyUp: number;
      };
      return {frames: w.__copyFrames, down: w.__copyDown, up: w.__copyUp};
    });
    expect(down, 'no touch reached the page').toBeGreaterThan(0);
    expect(up, 'no lift reached the page').toBeGreaterThan(down);
    // Every frame drawn from the touch to rest shows Profile's selected look.
    const drawn = frames.filter(frame => frame.t > down);
    testInfo.annotations.push({
      type: 'drawn frames',
      description: `${drawn.length} from the touch to rest`,
    });
    expect(
      drawn
        .filter(frame => !frame.selected)
        .map(frame => Math.round(frame.t - down)),
      'ms after the touch of each frame whose Profile shows no selected look',
    ).toEqual([]);
    // Three moments must be drawn, or the run proves nothing. First, the
    // frame after the touch holds the copy. It must come while one
    // starvation threshold of a fade is still left to draw.
    const [first] = requireFrames(frames, {
      min: 1,
      during: 'the frame after the touch',
      where: frame =>
        frame.t > down &&
        frame.t <= down + REDUCED_MOTION_FADE.ms - FRAME_STARVATION_MS,
    });
    expect(first.copy, 'the first frame after the touch').toBe(true);
    // Second, the hand-off: the last frame with the copy, and the next frame,
    // which has none, within one starvation threshold.
    let handOff = 0;
    for (let index = 0; index < drawn.length; index += 1) {
      if (drawn[index].copy) {
        handOff = index;
      }
    }
    requireFrames(drawn, {
      min: 2,
      during: 'the hand-off from the copy to the item’s own look',
      where: frame =>
        frame.t >= drawn[handOff].t &&
        frame.t <= drawn[handOff].t + FRAME_STARVATION_MS,
    });
    // Third, a frame at rest.
    requireFrames(frames, {
      min: 1,
      during: 'rest',
      where: frame => frame.t > rested,
    });
  });
  test('on a touch screen a drag from a disabled tab onto an enabled one lifts the lens with that tab in its selected look', async ({
    page,
  }) => {
    await page.emulateMedia({reducedMotion: 'reduce'});
    const {driver} = await openBar(page, 'disabled-tab');
    const browse = await itemCenter(page, 'Browse');
    const profile = await itemCenter(page, 'Profile');
    // Every frame from here: how lifted the lens is, by its glass (the clip's
    // ::before). Also whether it holds the opaque selected copy, with
    // Profile's at its centre. The lift is dated by the touch's pointerup,
    // which reaches the window whatever the press replaced.
    await page.evaluate(() => {
      const w = window as unknown as {
        __dragFrames: {
          t: number;
          glass: number;
          copy: boolean;
          atProfile: boolean;
        }[];
        __dragUp: number;
      };
      w.__dragFrames = [];
      w.__dragUp = 0;
      window.addEventListener(
        'pointerup',
        event => {
          if (event.pointerType === 'touch') {
            w.__dragUp = performance.now();
          }
        },
        true,
      );
      const centre = (element: Element | null) => {
        const box = element?.getBoundingClientRect();
        return box == null ? NaN : box.left + box.width / 2;
      };
      const step = () => {
        const copy = document.querySelector('[data-tab-bar-copy]');
        const item = copy?.querySelector('[data-tab-bar-copy-item="profile"]');
        const lens = document.querySelector('[data-tab-bar-lens-body]');
        const clip = document.querySelector('[data-tab-bar-lens-clip]');
        w.__dragFrames.push({
          t: performance.now(),
          glass:
            clip == null
              ? 0
              : Number(getComputedStyle(clip, '::before').opacity),
          copy: copy != null && Number(getComputedStyle(copy).opacity) >= 0.99,
          atProfile: Math.abs(centre(item ?? null) - centre(lens)) < 1,
        });
        if (w.__dragFrames.length < 600) {
          requestAnimationFrame(step);
        }
      };
      requestAnimationFrame(step);
    });
    await driver.play(drag(browse, profile, {durationMs: 400, restMs: 300}));
    await expect(tab(page, 'Profile')).toHaveAttribute('aria-selected', 'true');
    const {frames, up} = await page.evaluate(() => {
      const w = window as unknown as {
        __dragFrames: {
          t: number;
          glass: number;
          copy: boolean;
          atProfile: boolean;
        }[];
        __dragUp: number;
      };
      return {frames: w.__dragFrames, up: w.__dragUp};
    });
    expect(up, 'no lift reached the page').toBeGreaterThan(0);
    // The lens lifts once the finger leaves the disabled tab. Every frame it
    // shows lifted before the finger lifts holds the opaque copy.
    const isLifted = (frame: {t: number; glass: number}) =>
      frame.t < up && frame.glass > 0.01;
    expect(frames.some(isLifted), 'a frame whose lens is lifted').toBe(true);
    const lifted = requireFrames(frames, {
      min: 8,
      during: 'the lifted drag',
      where: isLifted,
    });
    expect(
      lifted
        .filter(frame => !frame.copy)
        .map(frame => Math.round(up - frame.t)),
      'ms before the lift of each lifted frame without the opaque copy',
    ).toEqual([]);
    // At the lift, Profile's selected look sits at the lens centre.
    expect(
      lifted[lifted.length - 1].atProfile,
      'Profile at the lens at the lift',
    ).toBe(true);
  });

  test('on a touch screen a finger on the selected tab’s icon, which the copy replaces, still drags the lens, and its lift chooses the tab under it', async ({
    page,
  }) => {
    await page.emulateMedia({reducedMotion: 'reduce'});
    const {driver} = await openBar(page);
    // Home is selected, so its icon is the selected one. The copy's mount
    // replaces it while the finger is on it.
    const box = await tab(page, 'Home').locator('svg').first().boundingBox();
    if (box == null) {
      throw new Error('Home has no icon');
    }
    const start = {x: box.x + box.width / 2, y: box.y + box.height / 2};
    const library = await itemCenter(page, 'Library');
    await page.evaluate(() => {
      const w = window as unknown as {
        __swapTarget: EventTarget | null;
        __swapAttached: boolean | null;
      };
      w.__swapTarget = null;
      w.__swapAttached = null;
      window.addEventListener(
        'touchstart',
        event => {
          w.__swapTarget = event.target;
        },
        {capture: true, once: true},
      );
      window.addEventListener(
        'pointerup',
        event => {
          if (event.pointerType === 'touch' && w.__swapTarget instanceof Node) {
            w.__swapAttached = document.contains(w.__swapTarget);
          }
        },
        true,
      );
    });
    await driver.play(drag(start, library, {durationMs: 400, restMs: 300}));
    // The lift chooses Library, so the press saw the finger's moves and its
    // lift, after the element it landed on left the document.
    await expect(tab(page, 'Library')).toHaveAttribute('aria-selected', 'true');
    const attached = await page.evaluate(
      () =>
        (window as unknown as {__swapAttached: boolean | null}).__swapAttached,
    );
    expect(attached, 'the touched icon is in the document at the lift').toBe(
      false,
    );
  });

  test('a press neither lifts nor flexes, and a drag’s release cross-fades the settle', async ({
    page,
    browserName,
  }) => {
    test.skip(
      browserName !== 'chromium',
      'only Chromium’s touches can be read mid-script',
    );
    await page.emulateMedia({reducedMotion: 'reduce'});
    const {driver} = await openBar(page);
    const home = await itemCenter(page, 'Home');
    const library = await itemCenter(page, 'Library');
    let held: unknown = null;
    await driver.play(tapScript(home, {holdMs: 200}), {
      onEvent: async step => {
        if (step.type === 'touchStart') {
          await page.waitForTimeout(120);
          held = {
            lens: await scaleOf(lensBody(page)),
            bar: await scaleOf(page.getByRole('tablist')),
          };
        }
      },
    });
    expect(held).toEqual({lens: {x: 1, y: 1}, bar: {x: 1, y: 1}});
    // The lens follows the finger through the drag (direct manipulation); the
    // settle its release starts is a transition, so it cross-fades (DR2).
    await driver.play(drag(home, library, {durationMs: 400, restMs: 300}));
    // Since the page's own lift, not a read the test makes after it.
    const released = await liftedAt(page);
    expect(released, 'no lift reached the page').toBeGreaterThan(0);
    // The fade starts with the input; what it changes follows a few
    // frames later.
    await expectCrossFade(page, released);
    await expect(tab(page, 'Library')).toHaveAttribute('aria-selected', 'true');
    assertOpacityOnly(await runningAnimations(page, released));
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

    test('a click on the selected tab scrolls its own panel to the top, and nothing else', async ({
      page,
    }) => {
      await expectFinePointer(page);
      await openStory(page, storybook(), 'lab-tabbar--scroll-to-top');
      await expect(page.getByRole('tablist', {name: 'Sections'})).toBeVisible();
      await setScrollTop(page, 'scroller-home', 800);
      await setScrollTop(page, 'other-scroller', 100);
      await tab(page, 'Home').click();
      await expect(page.getByTestId('reselects')).toHaveText(
        'Reselected 1 times',
      );
      await expect.poll(() => scrollTopOf(page, 'scroller-home')).toBe(0);
      expect(await scrollTopOf(page, 'other-scroller')).toBe(100);
    });

    test('a click chooses a tab, and so do the keys', async ({page}) => {
      await expectFinePointer(page);
      await openBar(page);
      // The click chooses the tab, as a button's does.
      await tab(page, 'Library').click();
      await expect(tab(page, 'Library')).toHaveAttribute(
        'aria-selected',
        'true',
      );
      await expect(tab(page, 'Home')).toHaveAttribute('aria-selected', 'false');
      // And from the keyboard, the other route a fine pointer leaves.
      await page.keyboard.press('ArrowRight');
      await page.keyboard.press('Enter');
      await expect(tab(page, 'Browse')).toHaveAttribute(
        'aria-selected',
        'true',
      );
    });

    test('a click reports its choice once, and never as a reselect too', async ({
      page,
    }) => {
      await expectFinePointer(page);
      await openBar(page, 'removed-on-lift');
      await page.evaluate(() => {
        (window as unknown as {__tabBarChanges: string[]}).__tabBarChanges = [];
      });
      await tab(page, 'Library').click();
      await expect(tab(page, 'Library')).toHaveAttribute(
        'aria-selected',
        'true',
      );
      // The click chooses Library once. Reported again, it would reach the
      // newly selected tab as a reselect.
      await page.waitForTimeout(300);
      expect(
        await page.evaluate(
          () =>
            (window as unknown as {__tabBarChanges: string[]}).__tabBarChanges,
        ),
      ).toEqual(['library']);
      await expect(page.getByTestId('reselects')).toHaveText(
        'Reselected 0 times',
      );
    });

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

    test('the bar sets no selection or callout override of its own', async ({
      page,
    }) => {
      await expectFinePointer(page);
      await openStory(page, storybook(), 'lab-tabbar--default');
      const capsule = page.getByRole('tablist', {name: 'Sections'});
      await expect(capsule).toBeVisible();
      // Under a finger the gesture host owns them while a finger is down;
      // under a mouse desktop selection is unchanged.
      expect(
        await capsule.evaluate(element => getComputedStyle(element).userSelect),
      ).not.toBe('none');
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

test('in the touch presentation the bar claims a finger on its own element: one touchmove listener', async ({
  page,
  browserName,
}) => {
  test.skip(browserName !== 'chromium', 'listener counts read CDP (Chromium)');
  await openBar(page);
  const listeners = await cdpListeners(page);
  expect(
    await listeners('document.querySelector(\'[role="tablist"]\')'),
  ).toEqual(['touchmove']);
});

test('a switch to a fine pointer under a held finger ends the press: the lens lands back and the copy goes', async ({
  page,
}) => {
  await page.addInitScript(PRESENTATION_SWITCH);
  const {driver} = await openBar(page);
  const home = await itemCenter(page, 'Home');
  const library = await itemCenter(page, 'Library');
  await driver.play(tapScript(library, {holdMs: 600}), {
    onEvent: async (_step, index) => {
      if (index === 0) {
        // Lifted under the finger first.
        await expect(lensCopy(page)).toHaveCount(1);
        await page.evaluate(() =>
          (
            window as unknown as {__setCoarse: (value: boolean) => void}
          ).__setCoarse(false),
        );
        await expect(lensCopy(page)).toHaveCount(0);
        await expect
          .poll(async () => Math.abs((await lensCenterX(page)) - home.x))
          .toBeLessThan(0.5);
        await expect.poll(() => scaleOf(lensBody(page))).toEqual({x: 1, y: 1});
      }
    },
  });
});

test('a switch to a fine pointer under a held finger takes its paint off the tab', async ({
  page,
}) => {
  await page.addInitScript(PRESENTATION_SWITCH);
  const {driver} = await openBar(page, 'no-selection');
  const home = await itemCenter(page, 'Home');
  await driver.play(tapScript(home, {holdMs: 600}), {
    onEvent: async (_step, index) => {
      if (index === 0) {
        await expect(tab(page, 'Home')).toHaveAttribute('data-tab-bar-pressed');
        await page.evaluate(() =>
          (
            window as unknown as {__setCoarse: (value: boolean) => void}
          ).__setCoarse(false),
        );
        await expect(page.locator('[data-tab-bar-pressed]')).toHaveCount(0);
      }
    },
  });
  await expect(page.locator('[data-tab-bar-pressed]')).toHaveCount(0);
});

test.describe('under a fine pointer a press is a plain button press (family:action-groups FR1, FR5, DEC-1)', () => {
  test.use({hasTouch: false, isMobile: false});

  /** Opens the default bar under the context's fine pointer. */
  async function openFine(page: Page) {
    await expectFinePointer(page);
    await openStory(page, storybook(), 'lab-tabbar--default');
    await expect(page.getByRole('tablist', {name: 'Sections'})).toBeVisible();
  }

  test('a mouse press paints nothing, and dragged to another tab it moves no lens and chooses nothing', async ({
    page,
  }) => {
    await openFine(page);
    // On screen first: the lens, on Home.
    await expectPainted(lensBody(page));
    const home = await itemCenter(page, 'Home');
    const library = await itemCenter(page, 'Library');
    const browse = await itemCenter(page, 'Browse');
    await page.mouse.move(library.x, library.y);
    await page.mouse.down();
    for (let step = 1; step <= 12; step++) {
      await page.mouse.move(
        library.x + ((browse.x - library.x) * step) / 12,
        library.y,
      );
    }
    await page.waitForTimeout(300);
    // Held, the press paints no tab and carries no lens.
    await expect(page.locator('[data-tab-bar-pressed]')).toHaveCount(0);
    expect(Math.abs((await lensCenterX(page)) - home.x)).toBeLessThan(0.5);
    await page.mouse.up();
    await page.waitForTimeout(300);
    // Released over another tab, it chooses nothing, as a button's press does.
    await expect(tab(page, 'Home')).toHaveAttribute('aria-selected', 'true');
    await expect(page.getByTestId('reselects')).toHaveText(
      'Reselected 0 times',
    );
  });

  test('a mouse press released off the bar chooses nothing, a tab or a reselect, as a button’s does', async ({
    page,
  }) => {
    await openFine(page);
    const slideOff = async (name: string) => {
      const start = await itemCenter(page, name);
      await page.mouse.move(start.x, start.y);
      await page.mouse.down();
      for (let step = 1; step <= 8; step++) {
        await page.mouse.move(start.x, start.y - 15 * step);
      }
      await page.mouse.up();
      await page.waitForTimeout(300);
    };
    await slideOff('Library');
    await expect(tab(page, 'Home')).toHaveAttribute('aria-selected', 'true');
    await slideOff('Home');
    await expect(page.getByTestId('reselects')).toHaveText(
      'Reselected 0 times',
    );
    // The lens never left the selected tab.
    const home = await itemCenter(page, 'Home');
    expect(Math.abs((await lensCenterX(page)) - home.x)).toBeLessThan(0.5);
  });

  test('under a fine primary pointer the capsule keeps touch-action: manipulation (spec:AST-094 FR18)', async ({
    page,
  }) => {
    await openFine(page);
    // TabBar's capsule style sets it whatever the primary pointer, so a
    // touchscreen laptop's double tap never zooms the page.
    expect(
      await page
        .getByRole('tablist', {name: 'Sections'})
        .evaluate(element => getComputedStyle(element).touchAction),
    ).toBe('manipulation');
  });

  test('a pen dragged to another tab chooses nothing, as a button’s press does', async ({
    page,
  }) => {
    await openFine(page);
    const input = await webInputDriver(page);
    test.skip(!input.pens, PEN_SKIP);
    const start = await itemCenter(page, 'Home');
    const end = await itemCenter(page, 'Profile');
    await input.pen(
      Array.from({length: 13}, (_, step) => ({
        x: start.x + ((end.x - start.x) * step) / 12,
        y: start.y,
        t: step * 16,
      })),
    );
    await page.waitForTimeout(300);
    await expect(tab(page, 'Home')).toHaveAttribute('aria-selected', 'true');
    await expect(lensCopy(page)).toHaveCount(0);
  });

  test('a pen released off the bar chooses nothing, as a button’s press does', async ({
    page,
  }) => {
    await openFine(page);
    const input = await webInputDriver(page);
    test.skip(!input.pens, PEN_SKIP);
    const start = await itemCenter(page, 'Library');
    await input.pen(
      Array.from({length: 9}, (_, step) => ({
        x: start.x,
        y: start.y - 15 * step,
        t: step * 16,
      })),
    );
    await page.waitForTimeout(300);
    await expect(tab(page, 'Home')).toHaveAttribute('aria-selected', 'true');
  });

  test('the bar adds no gesture listener, on its element or on the page during a press', async ({
    page,
    browserName,
  }) => {
    test.skip(
      browserName !== 'chromium',
      'listener counts read CDP (Chromium)',
    );
    await openFine(page);
    const listeners = await cdpListeners(page);
    // The reader's own control: a listener planted on a probe shows up.
    await page.evaluate(() => {
      const probe = document.createElement('div');
      probe.id = 'listener-probe';
      probe.addEventListener('pointerdown', () => {});
      document.body.append(probe);
    });
    expect(
      await listeners("document.getElementById('listener-probe')"),
    ).toEqual(['pointerdown']);
    const pageLevel = async () => [
      ...(await listeners('document')).map(entry => `document:${entry}`),
      ...(await listeners('window')).map(entry => `window:${entry}`),
    ];
    /** What `after` adds to `before` and what it drops, counting repeats. */
    const delta = (before: string[], after: string[]) => {
      const added = [...after];
      const removed: string[] = [];
      for (const entry of before) {
        const index = added.indexOf(entry);
        if (index < 0) {
          removed.push(entry);
        } else {
          added.splice(index, 1);
        }
      }
      return {added, removed};
    };
    const capsule = 'document.querySelector(\'[role="tablist"]\')';
    // Nothing listens on the bar itself: its tabs are plain buttons.
    expect(await listeners(capsule)).toEqual([]);
    // openStory returns while Storybook is still completing the story's render.
    // Its own decorators' effects (the measure addon's document pointermove
    // among them) run when the render finishes, so the baseline waits for that.
    await page.waitForFunction(
      () =>
        (
          window as unknown as {
            __STORYBOOK_PREVIEW__?: {currentRender?: {phase?: string}};
          }
        ).__STORYBOOK_PREVIEW__?.currentRender?.phase === 'finished',
    );
    // The tabs are read first: Playwright's own locator reads add its
    // listeners to the window, which are the harness's, not the page's.
    const library = await itemCenter(page, 'Library');
    const browse = await itemCenter(page, 'Browse');
    const atRest = await pageLevel();
    const press = async ({x, y}: {x: number; y: number}) => {
      await page.mouse.move(x, y);
      await page.mouse.down();
      const during = await pageLevel();
      await page.mouse.up();
      return during;
    };
    // A press adds no listener to the page, and leaves none behind.
    expect(delta(atRest, await press(library)).added).toEqual([]);
    expect(delta(atRest, await press(browse)).added).toEqual([]);
    expect(delta(atRest, await pageLevel())).toEqual({added: [], removed: []});
  });
});

test(
  'storyboard: a selection from rest slides the lens (a touch first moves it under the finger: see the press storyboard)',
  {tag: '@storyboard'},
  async ({page}, testInfo) => {
    const {bar} = await openBar(page);
    await tab(page, 'Home').focus();
    for (let i = 0; i < 3; i += 1) {
      await page.keyboard.press('ArrowRight');
    }
    await page.keyboard.press('Enter');
    await expect(tab(page, 'Profile')).toHaveAttribute('aria-selected', 'true');
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
      judges: {target: lensBody(page), property: 'translate'},
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

test(
  'storyboard: a finger lands, drags across the bar and lifts',
  {tag: '@storyboard'},
  async ({page}, testInfo) => {
    const {driver, bar} = await openBar(page);
    const home = await itemCenter(page, 'Home');
    const browse = await itemCenter(page, 'Browse');
    const box = await bar.boundingBox();
    if (box == null) {
      throw new Error('no bar');
    }
    const storyboard = await touchStoryboard(
      page,
      driver,
      drag(home, browse, {durationMs: 400, hz: 20, holdMs: 250, restMs: 250}),
      {
        name: 'tabbar-press-drag',
        clip: {
          x: 0,
          y: box.y - 16,
          width: box.x * 2 + box.width,
          height: box.height + 32,
        },
        measure: async () => ({
          x: await translateX(lensBody(page)),
          lift: (await scaleOf(lensBody(page))).x,
          flex: (await scaleOf(bar)).x,
        }),
        columns: 5,
        cellScale: 0.6,
      },
    );
    await storyboard.write(testInfo);
    await expect(tab(page, 'Browse')).toHaveAttribute('aria-selected', 'true');
    const frames = storyboard.frames.map(
      f => f.data as {lift: number; flex: number},
    );
    // Lifted and flexed while the finger is down.
    expect(Math.max(...frames.map(f => f.lift))).toBeGreaterThan(1.1);
    expect(Math.max(...frames.map(f => f.flex))).toBeGreaterThan(1.03);
  },
);

test.describe('a disabled tab under a mouse', () => {
  test.use({hasTouch: false, isMobile: false});

  test('a click on a disabled tab chooses nothing, and the arrow keys skip it', async ({
    page,
  }) => {
    await expectFinePointer(page);
    await openBar(page, 'disabled-tab');
    const browse = await itemCenter(page, 'Browse');
    await page.mouse.click(browse.x, browse.y);
    await expect(tab(page, 'Home')).toHaveAttribute('aria-selected', 'true');
    await expect(tab(page, 'Browse')).toHaveAttribute('aria-selected', 'false');
    // From Library the next key stop is Profile.
    await tab(page, 'Library').focus();
    await page.keyboard.press('ArrowRight');
    await expect(tab(page, 'Profile')).toBeFocused();
  });
});

/** Flips the story to right to left: the tab bar's own direction ancestor. */
async function rightToLeft(page: Page) {
  await page.evaluate(() => {
    document
      .querySelector('[role="tablist"]')
      ?.closest('[dir]')
      ?.setAttribute('dir', 'rtl');
  });
  await page.evaluate(
    () =>
      new Promise<void>(resolve =>
        requestAnimationFrame(() => requestAnimationFrame(() => resolve())),
      ),
  );
}

/** The More tab's stories live under TabBarMoreList's own title. */
const MORE_LIST = 'lab-tabbarmorelist';

test.describe('More tab', () => {
  test('six tabs: the bar shows the first four and More at the five-tab layout, as UIKit does', async ({
    page,
  }) => {
    await openBar(page, 'more-tab', MORE_LIST);
    const tabs = page.getByRole('tab');
    await expect(tabs).toHaveCount(5);
    await expect(tabs.last()).toHaveAccessibleName('More');
    // iOS 26.2 on a 402 pt screen: five 77 pt items at x 25, 93.75, 162.5,
    // 231.25 and 300.
    const viewport = page.viewportSize();
    const lefts: number[] = [];
    for (let index = 0; index < 5; index += 1) {
      const box = await tabs.nth(index).locator('span').first().boundingBox();
      if (box == null) {
        throw new Error('no item');
      }
      // Within the item-width fit's 1 px (tabBar.ts `itemWidth`).
      expect(Math.abs(box.width - 77)).toBeLessThan(1);
      lefts.push(box.x);
    }
    if (viewport?.width === 402) {
      [25, 93.75, 162.5, 231.25, 300].forEach((x, index) => {
        expect(Math.abs(lefts[index] - x)).toBeLessThan(1);
      });
    }
  });

  test('with Reduce Motion a tap on More changes the lens by opacity only, with no slide', async ({
    page,
  }) => {
    await page.emulateMedia({reducedMotion: 'reduce'});
    const {driver} = await openBar(page, 'more-tab', MORE_LIST);
    const more = await itemCenter(page, 'More');
    const since = await timelineNow(page);
    await driver.tap(more);
    // The fade starts with the input; what it changes follows a few
    // frames later.
    await expectCrossFade(page, since);
    await expect(tab(page, 'More')).toHaveAttribute('aria-selected', 'true');
    assertOpacityOnly(await runningAnimations(page, since));
    // Nothing travels, so the lens carries no copy: it lands on More, and
    // More draws its own selected look.
    await waitForRest(lensBody(page));
    await expect(lensCopy(page)).toHaveCount(0);
    expect(Math.abs((await lensCenterX(page)) - more.x)).toBeLessThan(0.5);
    expect(await labelWeight(page, 'More')).toBe('600');
  });

  test('a section chosen in More opens inside it, More staying selected; More again returns to the list', async ({
    page,
  }) => {
    const {driver} = await openBar(page, 'more-tab', MORE_LIST);
    const more = await itemCenter(page, 'More');
    await driver.tap(more);
    await expect(tab(page, 'More')).toHaveAttribute('aria-selected', 'true');
    const settings = page.getByRole('button', {name: /Settings/});
    await expect(settings).toBeVisible();
    await settings.click();
    await expect(page.getByRole('heading', {name: 'Settings'})).toBeVisible();
    await expect(tab(page, 'More')).toHaveAttribute('aria-selected', 'true');
    await waitForRest(page.getByRole('tablist'));
    expect(Math.abs((await lensCenterX(page)) - more.x)).toBeLessThan(0.5);
    await driver.tap(more);
    await expect(page.getByRole('heading', {name: 'More'})).toBeVisible();
  });

  test('a disabled tab past the fourth stays disabled in the More list: a tap on its row chooses nothing (spec:AST-085 FR2)', async ({
    page,
  }) => {
    const {driver} = await openBar(page, 'more-disabled-row', MORE_LIST);
    await driver.tap(await itemCenter(page, 'More'));
    await expect(tab(page, 'More')).toHaveAttribute('aria-selected', 'true');
    const help = page.getByRole('button', {name: /Help/});
    await expect(page.locator('.astryx-item', {has: help})).toHaveAttribute(
      'aria-disabled',
      'true',
    );
    const box = await help.boundingBox();
    if (box == null) {
      throw new Error('no Help row');
    }
    await driver.tap({x: box.x + box.width / 2, y: box.y + box.height / 2});
    // The list stays: no section opened inside More.
    await expect(page.getByRole('heading', {name: 'More'})).toBeVisible();
    await expect(page.getByRole('heading', {name: 'Help'})).toHaveCount(0);
    await expect(tab(page, 'More')).toHaveAttribute('aria-selected', 'true');
    // Its enabled neighbour still opens.
    await page.getByRole('button', {name: /Settings/}).click();
    await expect(page.getByRole('heading', {name: 'Settings'})).toBeVisible();
  });

  test('right to left, the More list’s disclosure chevrons point left, as Core’s disclosure rows’ do', async ({
    page,
  }) => {
    const {driver} = await openBar(page, 'more-tab', MORE_LIST);
    await rightToLeft(page);
    await driver.tap(await itemCenter(page, 'More'));
    await expect(tab(page, 'More')).toHaveAttribute('aria-selected', 'true');
    const settings = page.getByRole('button', {name: /Settings/});
    await expect(settings).toBeVisible();
    // On screen first: the row's chevron.
    await expectPainted(
      page.locator('li', {has: settings}).locator('svg').last(),
    );
    // The row's last glyph is its chevron (beside the label's button): flipped
    // on it or a wrapper.
    const transform = await settings.evaluate(button => {
      const row = button.closest('li') ?? button;
      const glyphs = [...row.querySelectorAll('svg')];
      for (
        let node: Element | null = glyphs[glyphs.length - 1] ?? null;
        node != null && node !== row;
        node = node.parentElement
      ) {
        const value = getComputedStyle(node).transform;
        if (value !== 'none') {
          return value;
        }
      }
      return 'none';
    });
    expect(transform).toBe('matrix(-1, 0, 0, 1, 0, 0)');
  });

  test.describe('under a mouse', () => {
    test.use({hasTouch: false, isMobile: false});

    test('More works the same, the lens on the theme’s motion', async ({
      page,
    }) => {
      await expectFinePointer(page);
      await openStory(page, storybook(), `${MORE_LIST}--more-tab`);
      const more = await itemCenter(page, 'More');
      await tab(page, 'More').click();
      await expect(tab(page, 'More')).toHaveAttribute('aria-selected', 'true');
      await page.getByRole('button', {name: /Settings/}).click();
      await expect(page.getByRole('heading', {name: 'Settings'})).toBeVisible();
      await expect(tab(page, 'More')).toHaveAttribute('aria-selected', 'true');
      await expect
        .poll(async () => Math.abs((await lensCenterX(page)) - more.x))
        .toBeLessThan(0.5);
      await expectCssSlide(page, {isRunning: false});
    });
  });
});

// =============================================================================
// Minimize on scroll
// =============================================================================

/** uikitTabBar.ts: `minimizeDistance`, `minimizedSize`, the collapse springs. */
const MINIMIZE_DISTANCE = 66;
const MINIMIZED_SIZE = 48;
const COLLAPSE_TRAVEL = {response: 0.4, dampingFraction: 0.85};
const COLLAPSE_SIZE = {response: 0.6, dampingFraction: 0.85};

// The bar's tab list carries the flag (the platter mounts only while needed).
const isMinimized = (page: Page) =>
  page
    .locator('[role="tablist"]')
    .first()
    .evaluate(element => element.hasAttribute('data-tab-bar-minimized'));
const pageScroll = (page: Page) => page.evaluate(() => window.scrollY);
const circle = (page: Page) => page.locator('[data-tab-bar-circle]');

type TouchDriver = Awaited<ReturnType<typeof touchDriver>>;

/**
 * A finger dragging the page content by `dy` px (positive scrolls the page
 * down), then resting so nothing coasts. Where injected touches scroll natively
 * (Chromium) the page scrolls itself. In WebKit, whose injected touches do not
 * scroll, the page is scrolled by the finger's travel after each move while the
 * finger is down. The bar reads that scroll the same way.
 */
async function scrollByFinger(
  page: Page,
  driver: TouchDriver,
  dy: number,
  {settle = true, restMs}: {settle?: boolean; restMs?: number} = {},
) {
  const from = {x: 200, y: dy > 0 ? 520 : 160};
  const to = {x: from.x, y: from.y - dy};
  const script = drag(from, to, {
    durationMs: Math.max(160, Math.abs(dy) * 3),
    restMs: restMs ?? (settle ? 150 : 0),
  });
  if (driver.drivesNativeGestures) {
    await driver.play(script);
  } else {
    let lastY = from.y;
    await driver.play(script, {
      realtime: false,
      onEvent: async step => {
        const finger = step.changed[0];
        if (step.type !== 'touchMove' || finger == null) {
          return;
        }
        const delta = lastY - finger.y;
        lastY = finger.y;
        await page.evaluate(by => window.scrollBy(0, by), delta);
      },
    });
  }
  if (settle) {
    await page.waitForTimeout(200);
  }
}

/** Resolves once the page has not scrolled for three frames. */
async function waitForScrollIdle(page: Page) {
  await page.evaluate(
    () =>
      new Promise<void>(resolve => {
        let last = window.scrollY;
        let still = 0;
        const tick = () => {
          still = window.scrollY === last ? still + 1 : 0;
          last = window.scrollY;
          if (still >= 3) {
            resolve();
          } else {
            requestAnimationFrame(tick);
          }
        };
        requestAnimationFrame(tick);
      }),
  );
}

/**
 * Scrolls the page by a finger and reads the running animations in the frame
 * after `isChanged` first holds. The finger is still down then: a 200 ms fade
 * ends long before it lifts.
 */
async function readDuringScroll(
  page: Page,
  driver: TouchDriver,
  isChanged: () => Promise<boolean>,
  since: number,
) {
  let sampled: Awaited<ReturnType<typeof runningAnimations>> | null = null;
  const from = {x: 200, y: 520};
  let lastY = from.y;
  await driver.play(drag(from, {x: 200, y: 320}, {durationMs: 600}), {
    realtime: driver.drivesNativeGestures,
    onEvent: async step => {
      const finger = step.changed[0];
      if (step.type !== 'touchMove' || finger == null) {
        return;
      }
      if (!driver.drivesNativeGestures) {
        const delta = lastY - finger.y;
        lastY = finger.y;
        await page.evaluate(by => window.scrollBy(0, by), delta);
      }
      if (sampled == null && (await isChanged())) {
        await page.waitForTimeout(40);
        sampled = await runningAnimations(page, since);
      }
    },
  });
  if (sampled == null) {
    throw new Error('it never changed while the finger was down');
  }
  return sampled;
}

async function minimizeBar(page: Page, driver: TouchDriver) {
  await scrollByFinger(page, driver, 200);
  await expect.poll(() => isMinimized(page)).toBe(true);
}

test.describe('minimize on scroll', () => {
  test('the page root keeps no touch-action of its own while the bar watches the scroll', async ({
    page,
  }) => {
    const {driver, bar} = await openBar(page, 'minimize-on-scroll');
    const root = () =>
      page.evaluate(() => ({
        inline: document.documentElement.style.touchAction || '',
        computed: getComputedStyle(document.documentElement).touchAction,
      }));
    expect(await root()).toEqual({inline: '', computed: 'auto'});
    // The watch runs from a finger's pan, which claims no touch: the
    // gesture host manages the styles and writes none here.
    await scrollByFinger(page, driver, 200);
    await expect(bar).toHaveAttribute('data-tab-bar-minimized', '');
    expect(await root()).toEqual({inline: '', computed: 'auto'});
  });

  test('a finger scrolling the page down minimizes the bar 66 px into the scroll, not before', async ({
    page,
  }) => {
    const {driver} = await openBar(page, 'minimize-on-scroll');
    await scrollByFinger(page, driver, 45);
    const first = await pageScroll(page);
    expect(first).toBeGreaterThan(10);
    expect(first).toBeLessThan(MINIMIZE_DISTANCE);
    expect(await isMinimized(page)).toBe(false);
    await scrollByFinger(page, driver, 60);
    expect(await pageScroll(page)).toBeGreaterThanOrEqual(MINIMIZE_DISTANCE);
    await expect.poll(() => isMinimized(page)).toBe(true);
  });

  test('scrolling back up mid-page leaves it minimized; reaching the top expands it', async ({
    page,
  }) => {
    const {driver} = await openBar(page, 'minimize-on-scroll');
    await scrollByFinger(page, driver, 300);
    await expect.poll(() => isMinimized(page)).toBe(true);
    await scrollByFinger(page, driver, -120);
    expect(await pageScroll(page)).toBeGreaterThan(0);
    expect(await isMinimized(page)).toBe(true);
    await scrollByFinger(page, driver, -400);
    expect(await pageScroll(page)).toBe(0);
    await expect.poll(() => isMinimized(page)).toBe(false);
  });

  test('expanded by a tap, the bar minimizes again only after another 66 px down', async ({
    page,
  }) => {
    const {driver} = await openBar(page, 'minimize-on-scroll');
    await minimizeBar(page, driver);
    await waitForRest(lensBody(page));
    const box = await circle(page).boundingBox();
    if (box == null) {
      throw new Error('no circle');
    }
    await driver.tap({x: box.x + box.width / 2, y: box.y + box.height / 2});
    await expect.poll(() => isMinimized(page)).toBe(false);
    // Less than the distance down: still expanded.
    const from = await pageScroll(page);
    await scrollByFinger(page, driver, 40);
    expect((await pageScroll(page)) - from).toBeLessThan(MINIMIZE_DISTANCE);
    expect(await isMinimized(page)).toBe(false);
    // The rest of the distance minimizes it again.
    await scrollByFinger(page, driver, 60);
    await expect.poll(() => isMinimized(page)).toBe(true);
  });

  test('where the browser sends no scrollend, the watch ends with the person’s scroll: a script’s scroll after it counts for nothing', async ({
    page,
  }) => {
    await page.addInitScript(() => {
      // A browser without scrollend: no handler property to detect, and
      // no event delivered.
      // (On the global object the handler is an own property.)
      for (const target of [
        window,
        Window.prototype,
        Document.prototype,
        Element.prototype,
        HTMLElement.prototype,
      ]) {
        delete (target as unknown as {onscrollend?: unknown}).onscrollend;
      }
      window.addEventListener(
        'scrollend',
        event => event.stopImmediatePropagation(),
        {capture: true},
      );
    });
    const {driver} = await openBar(page, 'minimize-on-scroll');
    expect(await page.evaluate(() => 'onscrollend' in window)).toBe(false);
    await scrollByFinger(page, driver, 40);
    expect(await isMinimized(page)).toBe(false);
    // Past the reader's fallback after the last scroll event.
    await page.waitForTimeout(400);
    await page.evaluate(() => window.scrollBy(0, 120));
    await page.waitForTimeout(300);
    expect(await pageScroll(page)).toBeGreaterThan(MINIMIZE_DISTANCE);
    expect(await isMinimized(page)).toBe(false);
  });

  test('a script scrolling the page to the top leaves it minimized', async ({
    page,
  }) => {
    const {driver} = await openBar(page, 'minimize-on-scroll');
    await minimizeBar(page, driver);
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(300);
    expect(await pageScroll(page)).toBe(0);
    expect(await isMinimized(page)).toBe(true);
  });

  test('a tap on the circle expands the bar, keeping the tab and the scroll', async ({
    page,
  }) => {
    const {driver} = await openBar(page, 'minimize-on-scroll');
    await minimizeBar(page, driver);
    await waitForRest(lensBody(page));
    const scrolled = await pageScroll(page);
    const box = await circle(page).boundingBox();
    if (box == null) {
      throw new Error('no circle');
    }
    expect(box.width).toBeCloseTo(MINIMIZED_SIZE, 0);
    await driver.tap({x: box.x + box.width / 2, y: box.y + box.height / 2});
    await expect.poll(() => isMinimized(page)).toBe(false);
    expect(await pageScroll(page)).toBe(scrolled);
    await expect(tab(page, 'Library')).toHaveAttribute('aria-selected', 'true');
  });

  test('at rest the lens draws over the glass, under the tabs', async ({
    page,
  }) => {
    await openBar(page, 'minimize-on-scroll');
    const lens = page.locator('[data-tab-bar-lens]');
    // On screen first: the lens and the glass it must draw over.
    await expectPainted(lens);
    await expectPainted(page.locator('[data-tab-bar-platter]'));
    // Paint order at the lens, topmost first. The bar takes no pointer, so
    // hit testing is turned on for this read only.
    const order = await lens.evaluate(element => {
      const style = document.createElement('style');
      style.textContent =
        '.astryx-tab-bar * { pointer-events: auto !important; }';
      document.head.append(style);
      const box = element.getBoundingClientRect();
      const stack = document.elementsFromPoint(
        box.x + 6,
        box.y + box.height / 2,
      );
      style.remove();
      const first = (selector: string) =>
        stack.findIndex(node => node.closest(selector) != null);
      return {
        lens: first('[data-tab-bar-lens]'),
        glass: first('[data-tab-bar-platter]'),
      };
    });
    expect(order.lens).toBeGreaterThanOrEqual(0);
    expect(order.glass).toBeGreaterThanOrEqual(0);
    expect(order.lens, JSON.stringify(order)).toBeLessThan(order.glass);
  });

  test('minimized, the accessibility tree holds no empty tab list beside the circle', async ({
    page,
    browserName,
  }) => {
    test.skip(
      browserName !== 'chromium',
      'reads Chromium’s accessibility tree',
    );
    const {driver} = await openBar(page, 'minimize-on-scroll');
    await minimizeBar(page, driver);
    const cdp = await page.context().newCDPSession(page);
    const {nodes} = await cdp.send('Accessibility.getFullAXTree');
    const roles = nodes
      .filter(node => node.ignored !== true)
      .map(node => node.role?.value);
    expect(roles).not.toContain('tablist');
    expect(roles).toContain('button');
  });

  test('minimized, the circle alone stands for the bar: the selected tab, collapsed; the keys expand it onto that tab', async ({
    page,
  }) => {
    const {driver} = await openBar(page, 'minimize-on-scroll');
    await minimizeBar(page, driver);
    const button = page.getByRole('button', {name: 'Library'});
    await expect(button).toHaveAttribute('aria-expanded', 'false');
    // The tabs are inert: out of reach of assistive technology and focus.
    // The tab list carries the attribute, so each tab sits in an inert tree.
    const tabsInert = () =>
      page
        .locator('[role="tablist"]')
        .first()
        .evaluate(list =>
          [...list.querySelectorAll<HTMLElement>('[role="tab"]')].map(
            element => element.closest('[inert]') != null,
          ),
        );
    expect(await tabsInert()).toEqual([true, true, true, true]);
    await button.focus();
    await page.keyboard.press('Enter');
    await expect.poll(() => isMinimized(page)).toBe(false);
    await expect(tab(page, 'Library')).toBeFocused();
    expect(await tabsInert()).toEqual([false, false, false, false]);
  });

  test('expanded again, the lens carries no copy at rest, and a slide’s copy lines up with the items', async ({
    page,
  }) => {
    const {driver} = await openBar(page, 'minimize-on-scroll');
    await minimizeBar(page, driver);
    await waitForRest(lensBody(page));
    const box = await circle(page).boundingBox();
    if (box == null) {
      throw new Error('no circle');
    }
    await driver.tap({x: box.x + box.width / 2, y: box.y + box.height / 2});
    await expect.poll(() => isMinimized(page)).toBe(false);
    await waitForRest(lensBody(page));
    // At rest the selected tab draws its own look: no copy is mounted.
    await expect(lensCopy(page)).toHaveCount(0);
    // A slide mounts it again, and it starts where the items are: no offset
    // or scale left over from the collapse.
    await driver.tap(await itemCenter(page, 'Browse'));
    await waitForAnimation(lensCopy(page));
    await holdAnimations(page, undefined, {
      judges: [
        {target: lensBody(page), property: 'translate'},
        {target: lensCopy(page), property: 'translate'},
      ],
    });
    const offsets = await page.evaluate(() =>
      [...document.querySelectorAll('[data-tab-bar-copy-item]')].map(item => {
        const value = item.getAttribute('data-tab-bar-copy-item');
        const face = document.querySelector(
          `[data-tab-bar-value="${value}"] > span`,
        );
        const a = item.getBoundingClientRect();
        const b = face?.getBoundingClientRect();
        return b == null
          ? Infinity
          : Math.abs(a.left + a.width / 2 - (b.left + b.width / 2));
      }),
    );
    await releaseAnimations(page, {finish: true});
    expect(offsets.length).toBeGreaterThan(0);
    for (const offset of offsets) {
      expect(offset).toBeLessThan(0.5);
    }
  });

  test('minimized, the page takes the touches outside the circle', async ({
    page,
  }) => {
    const {driver} = await openBar(page, 'minimize-on-scroll');
    const profile = await itemCenter(page, 'Profile');
    await minimizeBar(page, driver);
    const hit = await page.evaluate(({x, y}) => {
      const element = document.elementFromPoint(x, y);
      return {
        inBar: element?.closest('[role="tablist"]') != null,
        onCircle: element?.closest('[data-tab-bar-circle]') != null,
      };
    }, profile);
    expect(hit).toEqual({inBar: false, onCircle: false});
  });

  test('a tap on the circle mid-collapse turns the bar around from where it is', async ({
    page,
  }) => {
    const {driver} = await openBar(page, 'minimize-on-scroll');
    const library = await itemCenter(page, 'Library');
    const body = lensBody(page);
    const sampling = sampleRects(body, 1500);
    // Just past the trigger, so the page stops scrolling while the bar is still
    // collapsing. A tap on a page that is still scrolling only stops it, here
    // as on iOS.
    await scrollByFinger(page, driver, 80, {settle: false});
    await expect.poll(() => isMinimized(page)).toBe(true);
    await waitForScrollIdle(page);
    expect(
      await body.evaluate(element =>
        element.getAnimations().some(a => a.playState === 'running'),
      ),
    ).toBe(true);
    const turning = await lensCenterX(page);
    const box = await circle(page).boundingBox();
    if (box == null) {
      throw new Error('no circle');
    }
    await driver.tap({x: box.x + box.width / 2, y: box.y + box.height / 2});
    await expect.poll(() => isMinimized(page)).toBe(false);
    const samples = (await sampling).flatMap(sample =>
      sample.box == null
        ? []
        : [{t: sample.t, x: sample.box.x + sample.box.width / 2}],
    );
    // It was on its way into the circle, then came back without a jump:
    // consecutive frames never cover the remaining distance at once.
    expect(Math.abs(turning - library.x)).toBeGreaterThan(5);
    const steps = samples
      .slice(1)
      .flatMap((sample, i) =>
        sample.t - samples[i].t <= 34 ? [sample.x - samples[i].x] : [],
      );
    expect(
      Math.max(...steps.map(Math.abs)),
      JSON.stringify(samples),
    ).toBeLessThan(40);
    await waitForRest(body);
    expect(Math.abs((await lensCenterX(page)) - library.x)).toBeLessThan(0.5);
    await expect(tab(page, 'Library')).toHaveAttribute('aria-selected', 'true');
  });

  test('with Reduce Motion the bar cross-fades into the circle: opacity only, within 200 ms', async ({
    page,
  }) => {
    await page.emulateMedia({reducedMotion: 'reduce'});
    const {driver} = await openBar(page, 'minimize-on-scroll');
    const since = await timelineNow(page);
    assertCrossFade(
      await readDuringScroll(page, driver, () => isMinimized(page), since),
    );
    await expect.poll(() => isMinimized(page)).toBe(true);
  });

  test('watching the page’s scroll adds no blocking touch listener on the page’s root path', async ({
    page,
    browserName,
  }) => {
    // A blocking (non-passive) touchstart, touchmove or wheel listener on the
    // root path makes the browser wait for the main thread before every page
    // scroll. The scroll watch's listeners are passive. The test page holds a
    // listener of its own on every story, so the bar is read against a page
    // that never minimizes. (A finger scrolling through a busy main thread is
    // a simulator proof: the harness cannot drive one.)
    test.skip(
      browserName !== 'chromium',
      'reads listeners through Chromium’s debugger',
    );
    const blockingOn = async (on: Page, story: string) => {
      const {driver} = await openBar(on, story);
      // A scroll first, so every listener the scroll watch adds while it
      // tracks a touch is in place.
      await scrollByFinger(on, driver, 120);
      const cdp = await on.context().newCDPSession(on);
      const blocking: string[] = [];
      for (const expression of [
        'window',
        'document',
        'document.documentElement',
        'document.body',
      ]) {
        const {result} = await cdp.send('Runtime.evaluate', {expression});
        if (result.objectId == null) {
          throw new Error(`no ${expression}`);
        }
        const {listeners} = await cdp.send('DOMDebugger.getEventListeners', {
          objectId: result.objectId,
        });
        for (const listener of listeners) {
          if (
            /^(touchstart|touchmove|wheel)$/.test(listener.type) &&
            !listener.passive
          ) {
            blocking.push(`${expression}: ${listener.type}`);
          }
        }
      }
      return blocking.sort();
    };
    const plain = await page.context().newPage();
    const without = await blockingOn(plain, 'default');
    await plain.close();
    expect(await blockingOn(page, 'minimize-on-scroll')).toEqual(without);
  });

  test('right to left, the bar collapses into a circle at the right edge', async ({
    page,
  }) => {
    const {driver} = await openBar(page, 'minimize-on-scroll');
    await rightToLeft(page);
    const width = await page.evaluate(() => window.innerWidth);
    await minimizeBar(page, driver);
    await waitForRest(lensBody(page));
    const box = await circle(page).boundingBox();
    if (box == null) {
      throw new Error('no circle');
    }
    // At the right, where the bar starts in a right-to-left layout. The bar's
    // 21 px inset plus the 7 px the 48 px circle sits inside the 62 px bar.
    expect(width - (box.x + box.width)).toBeCloseTo(28, 0);
    expect(box.width).toBeCloseTo(MINIMIZED_SIZE, 0);
  });

  test('minimized, a resize keeps the circle whole: the cap and the lens stay on it', async ({
    page,
  }) => {
    // A phone in portrait: the capsule narrower than its natural width.
    await page.setViewportSize({width: 375, height: 667});
    const {driver} = await openBar(page, 'minimize-on-scroll');
    await minimizeBar(page, driver);
    await waitForRest(lensBody(page));
    // Rotated to landscape while minimized: the capsule widens.
    await page.setViewportSize({width: 667, height: 375});
    await page.waitForTimeout(200);
    const circleBox = await circle(page).boundingBox();
    const endBox = await page
      .locator('[data-tab-bar-platter-end]')
      .boundingBox();
    const lensBox = await lensBody(page).boundingBox();
    if (circleBox == null || endBox == null || lensBox == null) {
      throw new Error('no circle');
    }
    // The trailing cap closes on the circle, and the lens sits in it.
    expect(
      Math.abs(endBox.x + endBox.width - (circleBox.x + circleBox.width)),
    ).toBeLessThan(1);
    expect(
      Math.abs(
        lensBox.x + lensBox.width / 2 - (circleBox.x + circleBox.width / 2),
      ),
    ).toBeLessThan(1);
  });

  test('collapsing carries the lens into the circle on UIKit’s springs while the platter contracts', async ({
    page,
  }, testInfo) => {
    const {driver} = await openFreezableBar(page, 'minimize-on-scroll');
    const body = lensBody(page);
    const restBox = await body.boundingBox();
    const circleBox = await circle(page).boundingBox();
    if (restBox == null || circleBox == null) {
      throw new Error('no lens or circle');
    }
    const travel =
      circleBox.x + circleBox.width / 2 - (restBox.x + restBox.width / 2);
    const endScale = MINIMIZED_SIZE / restBox.width;
    // The scene freezes on the first frame the collapse runs, however slowly
    // the test process reads it: the curves are sampled by their own time.
    const collapsing = freezePageWhen(
      page,
      () =>
        document
          .querySelector('[data-tab-bar-lens-body]')
          ?.getAnimations()
          .some(animation => animation.playState === 'running') ?? false,
      null,
      {timeout: 10_000},
    );
    await scrollByFinger(page, driver, 200);
    await collapsing;
    await waitForAnimation(body, {minProgressMs: 0});
    await holdAnimations(page, undefined, {
      judges: [
        {target: body, property: 'translate'},
        {target: body, property: 'scale'},
      ],
    });
    const times = Array.from({length: 61}, (_, i) => i * 16.667);
    const bodySamples = await sampleCurve(body, times);
    const samples = times.map((t, i) => ({
      t: +t.toFixed(1),
      x: bodySamples[i].transform.translateX,
      scaleX: bodySamples[i].transform.scaleX,
      opacity: bodySamples[i].opacity,
      analyticX: travel * springStep(COLLAPSE_TRAVEL, t),
      analyticScaleX: 1 + (endScale - 1) * springStep(COLLAPSE_SIZE, t),
    }));
    await releaseAnimations(page, {finish: true});
    await thawPage(page);
    await writeEvidence(
      'curves/tabbar-collapse',
      {
        [`${testInfo.project.name}.json`]: JSON.stringify(
          {travel, endScale, samples},
          null,
          1,
        ),
      },
      testInfo,
    );
    for (const sample of samples) {
      expect(
        Math.abs(sample.x - sample.analyticX),
        JSON.stringify(sample),
      ).toBeLessThan(0.5);
      expect(
        Math.abs(sample.scaleX - sample.analyticScaleX),
        JSON.stringify(sample),
      ).toBeLessThan(0.005);
    }
    // The lens ends inside the circle, faded out; the platter's pieces have
    // become the circle.
    expect(samples.at(-1)?.opacity ?? 1).toBeLessThan(0.05);
    const pieces = await page
      .locator('[data-tab-bar-platter] > div')
      .evaluateAll(elements =>
        elements.map(element => {
          const rect = element.getBoundingClientRect();
          return {left: rect.left, right: rect.right};
        }),
      );
    const left = Math.min(...pieces.map(piece => piece.left));
    const right = Math.max(...pieces.map(piece => piece.right));
    expect(right - left).toBeCloseTo(MINIMIZED_SIZE, 0);
    expect(left).toBeCloseTo(circleBox.x, 0);
  });

  test('the collapse keeps advancing every frame while the main thread is blocked', async ({
    page,
    browserName,
  }) => {
    test.skip(
      browserName !== 'chromium',
      'screencast frame evidence is Chromium-only in Playwright (WebKit: the iOS simulator)',
    );
    const {driver} = await openBar(page, 'minimize-on-scroll');
    const end = page.locator('[data-tab-bar-platter-end]');
    await markElement(end);
    // The compositor's own control rides in the same cast. A stall the
    // compositor itself makes on a loaded runner stalls it too. So the move is
    // judged against what the compositor presented, not against a fixed bound.
    await startBusyControl(page);
    const cast = await startScreencast(page);
    // Armed before the drag, the page blocks itself in the frame that sees the
    // collapse running. One evaluate sees it and blocks, so no runner latency
    // between the two can eat the collapse first. The judged part ends where
    // the platter settles (settledWithin).
    const blocking = blockMainThread(page, 600, {during: end});
    // Just past the trigger.
    await driver.play(
      drag({x: 200, y: 520}, {x: 200, y: 420}, {durationMs: 300, restMs: 150}),
    );
    const block = await blocking;
    await page.waitForTimeout(150);
    const castFrames = await cast.stop();
    const [tracked, control] = await trackMarkers(page, castFrames, {
      colors: [MARKER_RGB, CONTROL_RGB],
    });
    const proof = busyWindowProof(
      tracked,
      {from: block.from, to: block.to},
      {
        axis: 'x',
        settledWithin: 2,
        // Screencast throughput, not the animation: no display-rate bound.
        maxMedianFrameMs: Infinity,
        control,
      },
    );
    // The harness's verdict against the control: a frozen collapse moves on
    // none of the frames the control moved.
    expect(
      proof.verdict.pass,
      `${proof.summary}; ${proof.verdict.failures.join('; ')}`,
    ).toBe(true);
  });
});

test(
  'storyboard: the bar collapses into its circle, and a tap on the circle expands it',
  {tag: '@storyboard'},
  async ({page}, testInfo) => {
    const {driver, bar} = await openBar(page, 'minimize-on-scroll');
    const box = await bar.boundingBox();
    if (box == null) {
      throw new Error('no bar');
    }
    const clip = {
      x: 0,
      y: box.y - 12,
      width: box.x * 2 + box.width,
      height: box.height + 24,
    };
    const times = Array.from({length: 25}, (_, i) => i * 33.333);
    // Crosses the trigger near the end of the drag, so the storyboard holds
    // the collapse from its first frames.
    await scrollByFinger(page, driver, 100, {settle: false});
    await expect.poll(() => isMinimized(page)).toBe(true);
    const judges = [
      {target: lensBody(page), property: 'translate'},
      {
        target: page.locator('[data-tab-bar-platter-end]'),
        property: 'translate',
      },
    ];
    const {storyboard: collapse} = await animationStoryboard(page, {
      name: 'tabbar-collapse',
      clip,
      times,
      judges,
      columns: 5,
      cellScale: 0.6,
    });
    await collapse.write(testInfo);
    await releaseAnimations(page, {finish: true});
    const target = await circle(page).boundingBox();
    if (target == null) {
      throw new Error('no circle');
    }
    await driver.tap({
      x: target.x + target.width / 2,
      y: target.y + target.height / 2,
    });
    await expect.poll(() => isMinimized(page)).toBe(false);
    const {storyboard: expand} = await animationStoryboard(page, {
      name: 'tabbar-expand',
      clip,
      times,
      judges,
      columns: 5,
      cellScale: 0.6,
    });
    await expand.write(testInfo);
    await releaseAnimations(page, {finish: true});
  },
);

// =============================================================================
// Bottom accessory
// =============================================================================

/** uikitTabBar.ts: the accessory's springs. */
const ACCESSORY_COLLAPSE = {response: 0.405, dampingFraction: 0.745};
const ACCESSORY_EXPAND = {response: 0.329, dampingFraction: 0.731};
/** A spring step's rate of change at `t` ms, per second. */
function stepRate(
  spring: {response: number; dampingFraction: number},
  t: number,
): number {
  return (springStep(spring, t + 0.5) - springStep(spring, t - 0.5)) * 1000;
}

const accessory = (page: Page) => page.locator('[data-tab-bar-accessory]');

/**
 * On the page: whether the accessory runs an animation that started at or
 * after `since` (timeline ms), or is about to start one.
 */
const accessoryMovesSince = (since: number) =>
  (
    document.querySelector('[data-tab-bar-accessory]')?.getAnimations() ?? []
  ).some(
    animation =>
      animation.playState === 'running' &&
      (animation.startTime == null || Number(animation.startTime) >= since),
  );

test.describe('bottom accessory', () => {
  test('moves down inline beside the circle on UIKit’s spring, and back up when the bar expands', async ({
    page,
  }, testInfo) => {
    const {driver, bar} = await openFreezableBar(page, 'bottom-accessory');
    const barBox = await bar.boundingBox();
    const above = await accessory(page).boundingBox();
    if (barBox == null || above == null) {
      throw new Error('no bar or accessory');
    }
    // Above the bar, as wide as it, 8 px over it.
    expect(above.x).toBeCloseTo(barBox.x, 0);
    expect(above.width).toBeCloseTo(barBox.width, 0);
    expect(barBox.y - (above.y + above.height)).toBeCloseTo(8, 0);
    expect(above.height).toBeCloseTo(48, 0);

    // The scene freezes on the first frame the accessory moves, however slowly
    // the test process reads it. Its short spring is held at its start, not
    // after it has run its course.
    const collapsing = freezePageWhen(
      page,
      accessoryMovesSince,
      await timelineNow(page),
      {timeout: 10_000},
    );
    await scrollByFinger(page, driver, 100, {settle: false});
    await collapsing;
    await expect(accessory(page)).toHaveAttribute(
      'data-tab-bar-accessory',
      'inline',
    );
    await waitForAnimation(accessory(page), {minProgressMs: 0});
    // Only the accessory's own animations. A hold counts every curve from the
    // earliest start it holds. The bar's morph can start a millisecond before
    // the accessory's, and would make this spring read that much early.
    await holdAnimations(page, accessory(page), {
      judges: {target: accessory(page), property: 'translate'},
    });
    const times = Array.from({length: 46}, (_, i) => i * 16.667);
    const collapse = await sampleCurve(accessory(page), times);
    await releaseAnimations(page, {finish: true});
    await thawPage(page);
    const inline = await accessory(page).boundingBox();
    if (inline == null) {
      throw new Error('no accessory');
    }
    // Inline: 8 px after the 48 px circle, 7 px from the bar's trailing end.
    expect(inline.x - barBox.x).toBeCloseTo(63, 0);
    expect(inline.x + inline.width).toBeCloseTo(barBox.x + barBox.width - 7, 0);
    // It started where it was above the bar and sprang into place.
    const dx = above.x - inline.x;
    const dy = above.y - inline.y;
    const samples = times.map((t, i) => ({
      t: +t.toFixed(1),
      x: collapse[i].transform.translateX,
      y: collapse[i].transform.translateY,
      analyticX: dx * (1 - springStep(ACCESSORY_COLLAPSE, t)),
      analyticY: dy * (1 - springStep(ACCESSORY_COLLAPSE, t)),
    }));
    await writeEvidence(
      'curves/tabbar-accessory',
      {
        [`${testInfo.project.name}.json`]: JSON.stringify(
          {dx, dy, samples},
          null,
          1,
        ),
      },
      testInfo,
    );
    for (const sample of samples) {
      expect(
        Math.abs(sample.x - sample.analyticX),
        JSON.stringify(sample),
      ).toBeLessThan(0.5);
      expect(
        Math.abs(sample.y - sample.analyticY),
        JSON.stringify(sample),
      ).toBeLessThan(0.5);
    }

    // Back up on the expand spring (a tap on the circle expands at once), once
    // the collapse would have ended on its own. Finish() above skipped the
    // page's animations to their end, not the animator's clock.
    await page.waitForTimeout(1000);
    const target = await circle(page).boundingBox();
    if (target == null) {
      throw new Error('no circle');
    }
    // Frozen on the expand's first frame, as the collapse was.
    const expanding = freezePageWhen(
      page,
      accessoryMovesSince,
      await timelineNow(page),
      {timeout: 10_000},
    );
    await driver.tap({
      x: target.x + target.width / 2,
      y: target.y + target.height / 2,
    });
    await expanding;
    await expect(accessory(page)).toHaveAttribute(
      'data-tab-bar-accessory',
      'expanded',
    );
    await waitForAnimation(accessory(page), {minProgressMs: 0});
    await holdAnimations(page, accessory(page), {
      judges: {target: accessory(page), property: 'translate'},
    });
    const expand = await sampleCurve(accessory(page), times);
    await releaseAnimations(page, {finish: true});
    await thawPage(page);
    times.forEach((t, i) => {
      expect(
        Math.abs(
          expand[i].transform.translateX +
            dx * (1 - springStep(ACCESSORY_EXPAND, t)),
        ),
        JSON.stringify({t, x: expand[i].transform.translateX}),
      ).toBeLessThan(0.5);
    });
    const back = await accessory(page).boundingBox();
    expect(back?.x ?? 0).toBeCloseTo(above.x, 0);
    expect(back?.y ?? 0).toBeCloseTo(above.y, 0);
  });

  test('expanding, its content stays inside its glass', async ({page}) => {
    const {driver} = await openBar(page, 'bottom-accessory');
    await scrollByFinger(page, driver, 100);
    await expect(accessory(page)).toHaveAttribute(
      'data-tab-bar-accessory',
      'inline',
    );
    await page.waitForTimeout(1000);
    const target = await circle(page).boundingBox();
    if (target == null) {
      throw new Error('no circle');
    }
    await driver.tap({
      x: target.x + target.width / 2,
      y: target.y + target.height / 2,
    });
    await expect(accessory(page)).toHaveAttribute(
      'data-tab-bar-accessory',
      'expanded',
    );
    await waitForAnimation(accessory(page));
    await holdAnimations(page, accessory(page), {
      judges: {target: accessory(page), property: 'translate'},
    });
    const overhangs: {t: number; overhang: number; visible: number}[] = [];
    for (const t of [0, 16.667, 50, 100, 140, 200, 300]) {
      await seekAnimations(page, t);
      const {overhang, visible} = await accessory(page).evaluate(element => {
        // The glass's trailing cap, and "Next" as it shows: its box cut by
        // every clipping box between it and the accessory.
        const glass = element.firstElementChild as HTMLElement;
        const cap = (
          glass.lastElementChild as HTMLElement
        ).getBoundingClientRect();
        const next = [...element.querySelectorAll('button')].find(
          button =>
            button.getAttribute('aria-label') === 'Next' ||
            button.textContent === 'Next',
        );
        if (next == null) {
          throw new Error('no Next');
        }
        let right = next.getBoundingClientRect().right;
        let left = next.getBoundingClientRect().left;
        for (
          let node = next.parentElement;
          node != null && node !== element.parentElement;
          node = node.parentElement
        ) {
          if (getComputedStyle(node).overflow !== 'visible') {
            right = Math.min(right, node.getBoundingClientRect().right);
            left = Math.max(left, node.getBoundingClientRect().left);
          }
        }
        return {overhang: right - cap.right, visible: right - left};
      });
      overhangs.push({t, overhang, visible});
    }
    await releaseAnimations(page, {finish: true});
    // On screen first: "Next" shows through the window while it is measured
    // (a window closed to nothing would keep it inside the glass too).
    await expectPainted(
      accessory(page).getByRole('button', {name: 'Next', exact: true}),
    );
    for (const {t, visible} of overhangs.filter(sample => sample.t >= 200)) {
      expect(visible, JSON.stringify({t, overhangs})).toBeGreaterThan(0);
    }
    for (const {t, overhang} of overhangs) {
      expect(overhang, JSON.stringify({t, overhangs})).toBeLessThanOrEqual(0.5);
    }
  });

  test('turned around mid-move, it keeps its speed (spec:AST-094 FR6)', async ({
    page,
  }) => {
    const {driver} = await openBar(page, 'bottom-accessory');
    // The latest start among the accessory's running animations, on the
    // document timeline: the animator sets each one.
    const startOf = () =>
      accessory(page).evaluate(element => {
        const starts = element
          .getAnimations()
          .filter(
            animation =>
              animation.playState === 'running' && animation.startTime != null,
          )
          .map(animation => Number(animation.startTime));
        return starts.length === 0 ? null : Math.max(...starts);
      });
    // Just past the trigger, the finger rests long enough that the page doesn't
    // fling, since a tap on a flinging page only stops it. Then the circle is
    // tapped at once: the turn comes while the accessory still moves. The
    // person scrolls most of the way first, and a second drag crosses the 66 px
    // trigger near its end. A finger's own scroll keeps a few pixels as slop,
    // so how far the first got is read rather than assumed.
    await scrollByFinger(page, driver, 50);
    const scrolled = await page.evaluate(() => window.scrollY);
    expect(scrolled).toBeLessThan(66);
    await expect(accessory(page)).toHaveAttribute(
      'data-tab-bar-accessory',
      'expanded',
    );
    await scrollByFinger(page, driver, 66 - scrolled + 30, {
      settle: false,
      restMs: 100,
    });
    await expect(accessory(page)).toHaveAttribute(
      'data-tab-bar-accessory',
      'inline',
    );
    await expect.poll(startOf).not.toBeNull();
    const collapseStart = Number(await startOf());
    const target = await circle(page).boundingBox();
    if (target == null) {
      throw new Error('no circle');
    }
    await driver.tap({
      x: target.x + target.width / 2,
      y: target.y + target.height / 2,
    });
    await expect(accessory(page)).toHaveAttribute(
      'data-tab-bar-accessory',
      'expanded',
    );
    await expect.poll(startOf).toBeGreaterThan(collapseStart);
    const turnedAt = Number(await startOf()) - collapseStart;
    await holdAnimations(page, accessory(page), {
      judges: {target: accessory(page), property: 'translate'},
    });
    const [first, second] = await sampleCurve(accessory(page), [0, 16.667]);
    await releaseAnimations(page, {finish: true});
    // The collapse ran from rest. At the turn it had covered this share of its
    // distance. So the offset it turns from gives the distance, and its rate
    // there gives its speed.
    const share = springStep(ACCESSORY_COLLAPSE, turnedAt);
    const collapseSpeed =
      (first.transform.translateY / share) *
      stepRate(ACCESSORY_COLLAPSE, turnedAt);
    // The expand spring from that offset with that speed (a spring's answer
    // to a starting speed is its step's rate over its natural rate squared).
    const naturalRate = (2 * Math.PI) / ACCESSORY_EXPAND.response;
    const predicted =
      first.transform.translateY * (1 - springStep(ACCESSORY_EXPAND, 16.667)) +
      (collapseSpeed * stepRate(ACCESSORY_EXPAND, 16.667)) / naturalRate ** 2;
    expect(
      Math.abs(second.transform.translateY - predicted),
      JSON.stringify({first, second, turnedAt, collapseSpeed, predicted}),
    ).toBeLessThan(0.5);
  });

  test('its content takes taps above the bar and inline, never choosing a tab', async ({
    page,
  }) => {
    const {driver} = await openBar(page, 'bottom-accessory');
    const play = () => page.getByRole('button', {name: /^(Play|Pause)$/});
    const tapPlay = async () => {
      const box = await play().boundingBox();
      if (box == null) {
        throw new Error('no play button');
      }
      await driver.tap({x: box.x + box.width / 2, y: box.y + box.height / 2});
    };
    await tapPlay();
    await expect(page.getByRole('button', {name: 'Pause'})).toBeVisible();
    await expect(tab(page, 'Library')).toHaveAttribute('aria-selected', 'true');
    await minimizeBar(page, driver);
    // Inline, the content drops its secondary control.
    await expect(page.getByRole('button', {name: 'Next'})).toHaveCount(0);
    await waitForRest(accessory(page));
    await tapPlay();
    await expect(page.getByRole('button', {name: 'Play'})).toBeVisible();
    expect(await isMinimized(page)).toBe(true);
    await expect(tab(page, 'Library')).toHaveAttribute('aria-selected', 'true');
  });

  test('it keeps moving inline every frame while the main thread is blocked', async ({
    page,
    browserName,
  }) => {
    test.skip(
      browserName !== 'chromium',
      'screencast frame evidence is Chromium-only in Playwright (WebKit: the iOS simulator)',
    );
    const {driver} = await openBar(page, 'bottom-accessory');
    const moving = accessory(page);
    await markElement(moving);
    // The compositor's own control rides in the same cast. A stall the
    // compositor itself makes on a loaded runner stalls it too. So the move is
    // judged against what the compositor presented, not against a fixed bound.
    await startBusyControl(page);
    const cast = await startScreencast(page);
    // Armed before the scroll, the page blocks itself in the frame that sees
    // the move running. One evaluate sees it and blocks, so no runner latency
    // between the two can eat the short move first. The judged part ends where
    // the accessory settles (settledWithin).
    const blocking = blockMainThread(page, 600, {during: moving});
    await scrollByFinger(page, driver, 100, {settle: false});
    const block = await blocking;
    await page.waitForTimeout(150);
    const castFrames = await cast.stop();
    const [tracked, control] = await trackMarkers(page, castFrames, {
      colors: [MARKER_RGB, CONTROL_RGB],
    });
    const proof = busyWindowProof(
      tracked,
      {from: block.from, to: block.to},
      {
        axis: 'y',
        settledWithin: 2,
        // Screencast throughput, not the animation: no display-rate bound.
        maxMedianFrameMs: Infinity,
        control,
      },
    );
    expect(
      proof.verdict.pass,
      `${proof.summary}; ${proof.verdict.failures.join('; ')}`,
    ).toBe(true);
  });

  test('with Reduce Motion it cross-fades inline: opacity only, within 200 ms', async ({
    page,
  }) => {
    await page.emulateMedia({reducedMotion: 'reduce'});
    const {driver} = await openBar(page, 'bottom-accessory');
    const since = await timelineNow(page);
    assertCrossFade(
      await readDuringScroll(
        page,
        driver,
        async () =>
          (await accessory(page).getAttribute('data-tab-bar-accessory')) ===
          'inline',
        since,
      ),
    );
    await expect(accessory(page)).toHaveAttribute(
      'data-tab-bar-accessory',
      'inline',
    );
  });

  test('right to left, it moves inline to the left of the circle', async ({
    page,
  }) => {
    const {driver, bar} = await openBar(page, 'bottom-accessory');
    await rightToLeft(page);
    const barBox = await bar.boundingBox();
    await minimizeBar(page, driver);
    await waitForRest(accessory(page));
    const inline = await accessory(page).boundingBox();
    const dot = await circle(page).boundingBox();
    if (barBox == null || inline == null || dot == null) {
      throw new Error('no bar, accessory or circle');
    }
    // The circle sits at the right; the accessory ends 8 px before it and
    // starts 7 px from the bar's (left) trailing end.
    expect(dot.x - (inline.x + inline.width)).toBeCloseTo(8, 0);
    expect(inline.x - barBox.x).toBeCloseTo(7, 0);
  });
});

test(
  'storyboard: the bottom accessory moves inline as the bar collapses, and back',
  {tag: '@storyboard'},
  async ({page}, testInfo) => {
    const {driver, bar} = await openBar(page, 'bottom-accessory');
    const box = await bar.boundingBox();
    if (box == null) {
      throw new Error('no bar');
    }
    const clip = {
      x: 0,
      y: box.y - 72,
      width: box.x * 2 + box.width,
      height: box.height + 84,
    };
    const times = Array.from({length: 20}, (_, i) => i * 33.333);
    await scrollByFinger(page, driver, 100, {settle: false});
    await expect.poll(() => isMinimized(page)).toBe(true);
    const {storyboard: collapse} = await animationStoryboard(page, {
      name: 'tabbar-accessory-collapse',
      clip,
      times,
      judges: {target: accessory(page), property: 'translate'},
      columns: 5,
      cellScale: 0.6,
    });
    await collapse.write(testInfo);
    await releaseAnimations(page, {finish: true});
    const target = await circle(page).boundingBox();
    if (target == null) {
      throw new Error('no circle');
    }
    await driver.tap({
      x: target.x + target.width / 2,
      y: target.y + target.height / 2,
    });
    await expect.poll(() => isMinimized(page)).toBe(false);
    const {storyboard: expand} = await animationStoryboard(page, {
      name: 'tabbar-accessory-expand',
      clip,
      times,
      judges: {target: accessory(page), property: 'translate'},
      columns: 5,
      cellScale: 0.6,
    });
    await expand.write(testInfo);
    await releaseAnimations(page, {finish: true});
  },
);
