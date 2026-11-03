// Copyright (c) Meta Platforms, Inc. and affiliates.

/**
 * @file AlertDialog.motion.interaction.browser.spec.ts
 * @input The built "Delete" AlertDialog story on the phone profile, a desktop
 *   pointer profile, real touch input and the interaction harness
 * @output Proofs of the alert's touch presentation in Chromium and WebKit:
 *   UIKit's look on the theme's dialog entrance and exit, the viewport start,
 *   taps during either transition, frames through a blocked main thread,
 *   reduced motion, and a mouse's theme entrance
 * @position Motion lane of AlertDialog, beside the touch-tracking spec. Run
 *   with `pnpm test:interaction AlertDialog`.
 */

import {
  expect,
  test,
  type ElementHandle,
  type Locator,
  type Page,
} from '@playwright/test';
import {
  blockMainThread,
  frames,
  openStory,
  startScreencast,
  touchDriver,
  waitForAnimation,
  waitForRest,
  withStorybook,
  writeEvidence,
  type Point,
  type TouchDriver,
} from '@astryxdesign/interaction-harness';
import {alertController} from '../../motion/uikit/alert';

const storybook = withStorybook(test);

const {scaleFrom} = alertController.present;

/** A theme's longer exit, ms, in the proofs that need one. */
const EXIT_MS = 300;

/** The entrance and the exit in the busy-main-thread proof, ms. */
const BUSY_MS = 2000;

/** The touch exit's duration and curve, as the alert spells them. */
const EXIT_TIMING = {
  duration: 'var(--duration-exit, var(--duration-fast))',
  easing: 'var(--ease-exit)',
};

/** Dialog's entrance duration and curve. */
const ENTRANCE_TIMING = {
  duration: 'var(--duration-medium-max)',
  easing: 'var(--ease-standard)',
};

const centerOf = async (locator: Locator): Promise<Point> => {
  const box = await locator.boundingBox();
  if (box == null) {
    throw new Error('no box');
  }
  return {x: box.x + box.width / 2, y: box.y + box.height / 2};
};

interface Opened {
  driver: TouchDriver;
  trigger: Locator;
  dialog: Locator;
}

/** Opens the story with the alert closed. */
async function openPage(page: Page): Promise<Opened> {
  await openStory(page, storybook(), 'core-alertdialog--delete');
  return {
    driver: await touchDriver(page),
    trigger: page.getByRole('button', {name: 'Delete item'}),
    dialog: page.getByRole('alertdialog', {name: 'Delete item?'}),
  };
}

/**
 * Sets a theme token on the page's root, as a theme does. Call it once the
 * story is open: a navigation drops the style.
 */
async function setToken(page: Page, name: string, value: string) {
  await page.addStyleTag({content: `:root { ${name}: ${value}; }`});
}

/** A CSS time in ms. */
const msOf = (time: string): number =>
  time.endsWith('ms')
    ? Number.parseFloat(time)
    : Number.parseFloat(time) * 1000;

/** The dialog's and its backdrop's animation duration and curve. */
async function timingOf(dialog: Locator) {
  return dialog.evaluate(element => {
    const own = getComputedStyle(element);
    const dim = getComputedStyle(element, '::backdrop');
    return {
      duration: own.animationDuration,
      easing: own.animationTimingFunction,
      dimDuration: dim.animationDuration,
      dimEasing: dim.animationTimingFunction,
    };
  });
}

/**
 * A duration and a curve as the dialog's animation computes them: a probe
 * beside the dialog resolves both in the browser's own form.
 */
async function tokenTiming(
  dialog: Locator,
  timing: {duration: string; easing: string},
) {
  return dialog.evaluate((element, values) => {
    const probe = element.ownerDocument.createElement('div');
    probe.style.animationDuration = values.duration;
    probe.style.animationTimingFunction = values.easing;
    element.parentElement?.append(probe);
    const style = getComputedStyle(probe);
    const resolved = {
      duration: style.animationDuration,
      easing: style.animationTimingFunction,
    };
    probe.remove();
    return resolved;
  }, timing);
}

/**
 * Pauses the dialog's CSS animations and its backdrop's as the browser makes
 * them, before any frame, so a slow read still sees them whole.
 * `sampleDialog` seeks them, and `release` resumes them.
 */
async function holdAtStart(page: Page): Promise<void> {
  await page.evaluate(() => {
    const record = window as unknown as {__held: Animation[]};
    record.__held = [];
    const observer = new MutationObserver(() => {
      const dialog = document.querySelector('dialog');
      const made = document
        .getAnimations()
        .filter(a => (a.effect as KeyframeEffect | null)?.target === dialog);
      if (made.length > 0) {
        observer.disconnect();
        record.__held = made;
        for (const animation of made) {
          animation.pause();
        }
      }
    });
    observer.observe(document.body, {
      attributes: true,
      childList: true,
      subtree: true,
    });
  });
}

async function whenHeld(page: Page): Promise<void> {
  await page.waitForFunction(
    () => (window as unknown as {__held: Animation[]}).__held.length > 0,
  );
}

interface Look {
  scale: number;
  opacity: number;
  dim: number;
}

/**
 * Seeks the held animations to each time and reads what the screen shows
 * there.
 */
async function sampleDialog(
  page: Page,
  times: ReadonlyArray<number>,
): Promise<{
  /** Each held animation: a CSS animation, and its length in ms. */
  held: {css: boolean; duration: number}[];
  looks: Look[];
}> {
  return page.evaluate(ts => {
    const held = (window as unknown as {__held: Animation[]}).__held;
    const dialog = (held[0]?.effect as KeyframeEffect | null)?.target;
    if (!(dialog instanceof Element)) {
      throw new Error('no held dialog animation');
    }
    const scaleOf = (value: string) =>
      value === 'none' ? 1 : Number(value.split(' ')[0]);
    const looks = ts.map(t => {
      for (const animation of held) {
        animation.currentTime = t;
      }
      return {
        scale: scaleOf(getComputedStyle(dialog).scale),
        opacity: Number(getComputedStyle(dialog).opacity),
        dim: Number(getComputedStyle(dialog, '::backdrop').opacity),
      };
    });
    return {
      held: held.map(animation => ({
        css: 'animationName' in animation,
        duration: Number(animation.effect?.getComputedTiming().duration),
      })),
      looks,
    };
  }, times);
}

async function release(page: Page): Promise<void> {
  await page.evaluate(() => {
    for (const animation of (window as unknown as {__held: Animation[]})
      .__held) {
      animation.play();
    }
  });
}

interface NextAnimations {
  /** When the browser made them, ms on the page's clock. */
  madeAt: number;
  /** When the dialog closed, ms on the page's clock; 0 while open. */
  closedAt: number;
  animations: {
    css: boolean;
    duration: number;
    properties: string[];
    opacities: number[];
  }[];
  easing: string;
}

/**
 * Records the dialog's next CSS animations as the browser makes them,
 * without holding them, and when the dialog closes.
 */
async function recordNextAnimations(dialog: Locator): Promise<void> {
  await dialog.evaluate(element => {
    const log: NextAnimations = {
      madeAt: 0,
      closedAt: 0,
      animations: [],
      easing: '',
    };
    (window as unknown as {__next: NextAnimations}).__next = log;
    const observer = new MutationObserver(() => {
      const made = document
        .getAnimations()
        .filter(a => (a.effect as KeyframeEffect | null)?.target === element);
      if (made.length === 0) {
        return;
      }
      observer.disconnect();
      log.madeAt = performance.now();
      log.easing = getComputedStyle(element).animationTimingFunction;
      log.animations = made.map(animation => {
        const frames = (animation.effect as KeyframeEffect).getKeyframes();
        const meta = new Set([
          'offset',
          'computedOffset',
          'easing',
          'composite',
        ]);
        return {
          css: 'animationName' in animation,
          duration: Number(animation.effect?.getComputedTiming().duration),
          properties: [
            ...new Set(
              frames.flatMap(frame =>
                Object.keys(frame).filter(key => !meta.has(key)),
              ),
            ),
          ],
          opacities: frames.map(frame => Number(frame.opacity)),
        };
      });
    });
    observer.observe(element, {attributes: true});
    element.addEventListener('close', () => {
      log.closedAt = performance.now();
    });
  });
}

async function nextAnimations(page: Page): Promise<NextAnimations> {
  return page.evaluate(
    () => (window as unknown as {__next: NextAnimations}).__next,
  );
}

/** The midpoint's progress on each channel: they share one curve. */
function progressAt(look: Look, from: Look, to: Look) {
  const part = (key: keyof Look) =>
    (look[key] - from[key]) / (to[key] - from[key]);
  return {
    scale: from.scale === to.scale ? null : part('scale'),
    opacity: part('opacity'),
    dim: part('dim'),
  };
}

/**
 * Frames the screencast delivered inside a window, judged at its own cadence,
 * as the harness's busy-window verdict judges them: the median interval
 * between the frames around the window (a loaded machine's screencast can
 * deliver one frame in several), the frames that cadence makes room for, and
 * the longest gap in those intervals. A main-thread animation delivers no
 * frame for the whole block.
 */
function cadence(
  frameTimes: ReadonlyArray<number>,
  window: {from: number; to: number},
): {
  frames: number;
  expected: number;
  cadenceMs: number;
  longestGapMs: number;
  longestGapFrames: number;
} {
  const inside = frameTimes.filter(t => t >= window.from && t <= window.to);
  const edges = [window.from, ...inside, window.to];
  let longestGapMs = 0;
  for (let i = 1; i < edges.length; i += 1) {
    longestGapMs = Math.max(longestGapMs, edges[i] - edges[i - 1]);
  }
  const around = frameTimes.filter(
    t => t >= window.from - 250 && t <= window.to + 250,
  );
  const intervals = around
    .slice(1)
    .map((t, i) => t - around[i])
    .sort((a, b) => a - b);
  const cadenceMs =
    intervals.length >= 4
      ? intervals[Math.floor(intervals.length / 2)]
      : 1000 / 60;
  return {
    frames: inside.length,
    expected: Math.floor((window.to - window.from) / cadenceMs),
    cadenceMs,
    longestGapMs,
    longestGapFrames: Math.round(longestGapMs / cadenceMs),
  };
}

test.describe('under a finger', () => {
  test("presents from scale 1.2 and opacity 0 with the dimming, on the theme's dialog entrance", async ({
    page,
  }) => {
    const {driver, trigger, dialog} = await openPage(page);
    await holdAtStart(page);
    await driver.tap(await centerOf(trigger));
    await whenHeld(page);
    const timing = await timingOf(dialog);
    const entrance = await tokenTiming(dialog, ENTRANCE_TIMING);
    const entranceMs = msOf(entrance.duration);
    const {held, looks} = await sampleDialog(page, [
      0,
      entranceMs / 2,
      entranceMs,
    ]);
    await release(page);
    // The alert's own CSS animation and the dimming's, on the entrance
    // tokens.
    expect(held).toEqual([
      {css: true, duration: entranceMs},
      {css: true, duration: entranceMs},
    ]);
    expect(timing).toEqual({
      duration: entrance.duration,
      easing: entrance.easing,
      dimDuration: entrance.duration,
      dimEasing: entrance.easing,
    });
    const [start, mid, end] = looks;
    expect(start).toEqual({scale: scaleFrom, opacity: 0, dim: 0});
    expect(end).toEqual({scale: 1, opacity: 1, dim: 1});
    // Midway, the scale, the opacity and the dimming are as far along.
    const progress = progressAt(mid, start, end);
    expect(progress.opacity).toBeGreaterThan(0);
    expect(progress.opacity).toBeLessThan(1);
    expect(progress.scale ?? 0).toBeCloseTo(progress.opacity, 2);
    expect(progress.dim).toBeCloseTo(progress.opacity, 2);
  });

  test("dismisses with a fade alone on the exit tokens, whatever the theme's dialog exit switch says, then closes and returns focus", async ({
    page,
  }) => {
    const {driver, trigger, dialog} = await openPage(page);
    for (const dialogExit of ['off', 'on'] as const) {
      if (dialogExit === 'on') {
        // A theme that turns the pointer dialog exit on: the touch exit stays.
        await setToken(page, '--duration-exit-dialog', `${EXIT_MS}ms`);
      }
      await driver.tap(await centerOf(trigger));
      await waitForRest(dialog);
      const exit = await tokenTiming(dialog, EXIT_TIMING);
      await recordNextAnimations(dialog);
      await driver.tap(
        await centerOf(dialog.getByRole('button', {name: 'Cancel'})),
      );
      await expect(dialog).toBeHidden();
      await expect(trigger).toBeFocused();
      const log = await nextAnimations(page);
      const exitMs = msOf(exit.duration);
      // The alert's own fade and the dimming's: opacity alone, from 1 to 0,
      // on the exit tokens.
      const fade = {
        css: true,
        duration: exitMs,
        properties: ['opacity'],
        opacities: [1, 0],
      };
      expect(exitMs, dialogExit).toBeGreaterThan(0);
      expect(log.animations, dialogExit).toEqual([fade, fade]);
      expect(log.easing, dialogExit).toBe(exit.easing);
      // It stays presented until the fade has run its length.
      expect(log.closedAt - log.madeAt, dialogExit).toBeGreaterThanOrEqual(
        exitMs,
      );
    }
  });

  test("starts inside the viewport: on a screen narrower than UIKit's 1.2 start, from the viewport's width", async ({
    page,
  }) => {
    // 360 px: the 320 px alert at 1.2 would be 384 px wide.
    await page.setViewportSize({width: 360, height: 714});
    const {driver, trigger, dialog} = await openPage(page);
    await holdAtStart(page);
    await driver.tap(await centerOf(trigger));
    await whenHeld(page);
    // Seeked to the presentation's first frame.
    const {looks} = await sampleDialog(page, [0]);
    const box = await dialog.evaluate(el => {
      const rect = el.getBoundingClientRect();
      return {
        left: rect.left,
        right: rect.right,
        width: (el as HTMLElement).offsetWidth,
        viewport: document.documentElement.clientWidth,
      };
    });
    await release(page);
    expect(box.width).toBe(alertController.width);
    expect(looks[0].scale).toBeCloseTo(box.viewport / box.width, 3);
    expect(looks[0].scale).toBeLessThan(scaleFrom);
    expect(box.left).toBeGreaterThanOrEqual(0);
    expect(box.right).toBeLessThanOrEqual(box.viewport + 0.5);
  });

  test('a tap while the alert presents or leaves reaches nothing', async ({
    page,
  }) => {
    const {driver, trigger, dialog} = await openPage(page);
    // A long exit, so the tap that must land inside it does.
    await setToken(page, '--duration-exit', '2000ms');
    await driver.tap(await centerOf(trigger));
    await waitForAnimation(dialog);
    const cancelPoint = await centerOf(
      dialog.getByRole('button', {name: 'Cancel'}),
    );
    const deletePoint = await centerOf(
      dialog.getByRole('button', {name: 'Delete'}),
    );
    await page.evaluate(() => {
      const dialogElement = document.querySelector('dialog[open]');
      const entrance = document
        .getAnimations()
        .find(
          a => (a.effect as KeyframeEffect | null)?.target === dialogElement,
        );
      const log = {
        start: Number(entrance?.startTime),
        end: Number(entrance?.effect?.getComputedTiming().endTime),
        closedAt: 0,
        touches: [] as number[],
        clicks: [] as string[],
      };
      (window as unknown as {__tapLog: typeof log}).__tapLog = log;
      dialogElement?.addEventListener('close', () => {
        log.closedAt = performance.now();
      });
      document.addEventListener(
        'touchstart',
        event => log.touches.push(event.timeStamp),
        true,
      );
      document.addEventListener(
        'click',
        event => {
          const button = (event.target as Element).closest('button');
          if (button != null) {
            log.clicks.push(button.textContent ?? '');
          }
        },
        true,
      );
    });
    const readTapLog = async () =>
      page.evaluate(
        () =>
          (
            window as unknown as {
              __tapLog: {
                start: number;
                end: number;
                closedAt: number;
                touches: number[];
                clicks: string[];
              };
            }
          ).__tapLog,
      );
    // A tap on Cancel while the alert presents.
    await driver.tap(cancelPoint);
    // The tap must land inside the presentation for this to prove anything.
    const {start, end, touches} = await readTapLog();
    expect(touches[0] - start).toBeLessThan(end);
    await waitForRest(dialog);
    await frames(page, 4);
    await expect(dialog).toBeVisible();
    // Presented, Cancel runs. A tap on Delete while the alert fades out runs
    // nothing.
    await driver.tap(cancelPoint);
    await driver.tap(deletePoint);
    await expect(dialog).toBeHidden();
    const after = await readTapLog();
    // The Delete tap landed before the alert closed.
    expect(after.touches[2]).toBeLessThan(after.closedAt);
    expect(after.clicks).toEqual(['Cancel']);
  });

  test('present and dismiss keep presenting frames while the main thread is blocked', async ({
    page,
    browserName,
  }, testInfo) => {
    test.skip(
      browserName !== 'chromium',
      'screencast frame evidence is Chromium-only in Playwright (WebKit: the iOS simulator rig)',
    );
    const {driver, trigger, dialog} = await openPage(page);
    // Both motions run 2 s here, so the 1 s block always lands inside them,
    // however late it starts on a loaded runner.
    await page.addStyleTag({
      content: `dialog { --duration-medium-max: ${BUSY_MS}ms !important; --duration-exit: ${BUSY_MS}ms !important; }`,
    });
    const proofs: Record<string, ReturnType<typeof cadence>> = {};
    for (const phase of ['present', 'dismiss'] as const) {
      const cast = await startScreencast(page, {format: 'jpeg', quality: 40});
      await driver.tap(
        await centerOf(
          phase === 'present'
            ? trigger
            : dialog.getByRole('button', {name: 'Cancel'}),
        ),
      );
      const [running] = await waitForAnimation(dialog, {minProgressMs: 16});
      const block = await blockMainThread(page, 1000);
      const castFrames = await cast.stop();
      expect(msOf((await timingOf(dialog)).duration)).toBe(BUSY_MS);
      proofs[phase] = cadence(
        castFrames.map(f => f.t),
        {
          from: block.from + 20,
          to: Math.min(block.to, running.from + BUSY_MS) - 20,
        },
      );
      if (phase === 'present') {
        await waitForRest(dialog);
        await frames(page, 6);
      } else {
        await expect(dialog).toBeHidden();
      }
    }
    await writeEvidence(
      'busy-main-thread/alertdialog',
      {[`${testInfo.project.name}.json`]: JSON.stringify(proofs, null, 1)},
      testInfo,
    );
    // Judged at the screencast's own cadence: something to judge, nearly every
    // frame that cadence makes room for, and no gap over three of its
    // intervals.
    for (const proof of Object.values(proofs)) {
      expect(proof.expected, JSON.stringify(proofs)).toBeGreaterThanOrEqual(4);
      expect(proof.frames, JSON.stringify(proofs)).toBeGreaterThanOrEqual(
        proof.expected - 2,
      );
      expect(
        proof.longestGapFrames,
        JSON.stringify(proofs),
      ).toBeLessThanOrEqual(3);
    }
  });

  test("under reduced motion the alert and the dimming only fade in, over 200 ms, and a theme's exit fades within 200 ms (design:reduced-motion DR1, DR2)", async ({
    page,
  }) => {
    await page.emulateMedia({reducedMotion: 'reduce'});
    const {driver, trigger, dialog} = await openPage(page);
    await setToken(page, '--duration-exit', `${EXIT_MS}ms`);
    await holdAtStart(page);
    await driver.tap(await centerOf(trigger));
    await whenHeld(page);
    const timing = await timingOf(dialog);
    const {held, looks} = await sampleDialog(page, [0]);
    await release(page);
    // Dialog's reduced cross-fade on a touch screen, for the alert and the
    // dimming alike.
    expect(held).toEqual([
      {css: true, duration: 200},
      {css: true, duration: 200},
    ]);
    expect(msOf(timing.duration)).toBe(200);
    expect(msOf(timing.dimDuration)).toBe(200);
    expect(looks[0]).toEqual({scale: 1, opacity: 0, dim: 0});
    await waitForRest(dialog);
    // The theme's 300 ms exit fades within the reduced 200 ms.
    await recordNextAnimations(dialog);
    await driver.tap(
      await centerOf(dialog.getByRole('button', {name: 'Cancel'})),
    );
    await expect(dialog).toBeHidden();
    const exit = await nextAnimations(page);
    expect(exit.animations.map(animation => animation.duration)).toEqual([
      200, 200,
    ]);
  });
});

/**
 * Whether the dialog is still open on the next frame. Takes the element
 * before the close: a closed dialog leaves the accessibility tree.
 */
const openOnNextFrame = async (element: ElementHandle | null) =>
  element?.evaluate(
    async el =>
      new Promise<boolean>(resolve =>
        requestAnimationFrame(() => resolve((el as HTMLDialogElement).open)),
      ),
  );

test.describe('with a mouse', () => {
  test.use({hasTouch: false, isMobile: false});

  test('keeps the theme entrance and closes at once', async ({page}) => {
    const {trigger, dialog} = await openPage(page);
    // A fine pointer in this context, before anything is checked.
    expect(
      await page.evaluate(() => matchMedia('(pointer: coarse)').matches),
    ).toBe(false);
    // Recorded as it starts: a short entrance can end before a poll after the
    // click first reads the page (a busy WebKit takes longer than it runs).
    await page.evaluate(() => {
      const record = window as unknown as {__entrance: number};
      record.__entrance = 0;
      document.addEventListener(
        'animationstart',
        event => {
          const {target, pseudoElement} = event;
          if (
            target instanceof Element &&
            target.tagName === 'DIALOG' &&
            !pseudoElement
          ) {
            record.__entrance += 1;
          }
        },
        {capture: true},
      );
    });
    await trigger.click();
    await waitForRest(dialog);
    // The theme's CSS entrance ran on the alert (an animationstart is a CSS
    // animation's).
    expect(
      await page.evaluate(
        () => (window as unknown as {__entrance: number}).__entrance,
      ),
    ).toBeGreaterThan(0);
    // A closed dialog leaves the accessibility tree: hold on to the element.
    const element = await dialog.elementHandle();
    await dialog.getByRole('button', {name: 'Cancel'}).click();
    // No exit: the dialog is closed by the next frame.
    expect(await openOnNextFrame(element)).toBe(false);
  });
});
