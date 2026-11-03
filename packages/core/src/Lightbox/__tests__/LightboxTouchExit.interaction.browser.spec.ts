// Copyright (c) Meta Platforms, Inc. and affiliates.

/**
 * @file LightboxTouchExit.interaction.browser.spec.ts
 * @input The built Lightbox stories on the phone project, real touch input
 * @output Proofs for Lightbox's touch exit: a close that no gesture drives
 *   fades the viewer on the theme's exit tokens, and the caller hears of the
 *   close when the exit ends
 * @position Interaction tests for Lightbox (browser), beside
 *   LightboxDismiss.interaction.browser.spec.ts
 */

import {expect, test, type Locator, type Page} from '@playwright/test';
import {
  frames,
  openStory,
  touchDriver,
  type TouchDriver,
  withStorybook,
} from '@astryxdesign/interaction-harness';

const storybook = withStorybook(test);

const STORIES = {
  zoom: {id: 'core-lightbox--with-zoom', trigger: 'Open with zoom'},
  plain: {id: 'core-lightbox--default', trigger: 'Open lightbox'},
  gallery: {
    id: 'core-lightbox--gallery-with-zoom',
    trigger: 'Open gallery with zoom',
  },
  // Its parent asks before closing; Playwright dismisses the confirm, so the
  // parent keeps the viewer open.
  confirm: {
    id: 'core-lightbox--confirm-close',
    trigger: 'Open, confirm to close',
  },
} as const;

/** The default exit curve, `--ease-exit`. */
const EASE_EXIT = 'cubic-bezier(0.3, 0, 0.6, 0.6)';

/** A `cubic-bezier()` curve's four numbers, however it is spelled. */
const curveOf = (easing: string) =>
  (easing.match(/-?\d*\.?\d+/g) ?? []).map(Number);

interface Viewer {
  driver: TouchDriver;
  dialog: Locator;
  /** The box that holds the photo, the caption and the controls. */
  container: Locator;
  /** The photo's stage. */
  stage: Locator;
  tapOn: (locator: Locator) => Promise<void>;
}

async function openViewer(
  page: Page,
  story: keyof typeof STORIES = 'zoom',
): Promise<Viewer> {
  await page.route('https://picsum.photos/**', async route =>
    route.fulfill({
      contentType: 'image/svg+xml',
      body: '<svg xmlns="http://www.w3.org/2000/svg" width="3000" height="2000"><rect width="3000" height="2000" fill="#888"/></svg>',
    }),
  );
  await openStory(page, storybook(), STORIES[story].id);
  const driver = await touchDriver(page);
  const tapOn = async (locator: Locator) => {
    const box = await locator.boundingBox();
    if (box == null) {
      throw new Error('nothing to tap');
    }
    await driver.tap({x: box.x + box.width / 2, y: box.y + box.height / 2});
  };
  await tapOn(page.getByRole('button', {name: STORIES[story].trigger}));
  const dialog = page.getByRole('dialog');
  await expect(dialog).toBeVisible();
  await expect
    .poll(async () =>
      dialog
        .locator('img')
        .first()
        .evaluate(el => (el as HTMLImageElement).naturalWidth),
    )
    .toBe(3000);
  await frames(page, 2);
  const container = dialog
    .locator('[data-lightbox-chrome]')
    .first()
    .locator('..');
  const stage =
    story === 'gallery'
      ? dialog.locator('[data-current] [data-lightbox-page-media]')
      : dialog.locator('img').first().locator('..');
  return {driver, dialog, container, stage, tapOn};
}

interface PlayingAnimation {
  duration: number;
  easing: string;
  properties: string[];
  to: Record<string, string>;
}

/** The animations running on the element, as CSS animations spell them. */
async function animationsOn(locator: Locator): Promise<PlayingAnimation[]> {
  return locator.evaluate(el =>
    el.getAnimations().map(animation => {
      const effect = animation.effect as KeyframeEffect;
      const keyframes = effect.getKeyframes();
      const last = keyframes[keyframes.length - 1] ?? {};
      const to: Record<string, string> = {};
      for (const [key, value] of Object.entries(last)) {
        if (
          !['offset', 'computedOffset', 'easing', 'composite'].includes(key)
        ) {
          to[key] = String(value);
        }
      }
      return {
        duration: Number(effect.getComputedTiming().duration),
        easing: keyframes[0]?.easing ?? effect.getTiming().easing ?? '',
        properties: Object.keys(to),
        to,
      };
    }),
  );
}

/** The animations running on the dialog's `::backdrop`. */
async function backdropAnimations(page: Page): Promise<PlayingAnimation[]> {
  return page.evaluate(() =>
    document
      .getAnimations()
      .filter(
        animation =>
          (animation.effect as KeyframeEffect).pseudoElement === '::backdrop',
      )
      .map(animation => {
        const effect = animation.effect as KeyframeEffect;
        const keyframes = effect.getKeyframes();
        const last = keyframes[keyframes.length - 1] ?? {};
        return {
          duration: Number(effect.getComputedTiming().duration),
          easing: keyframes[0]?.easing ?? '',
          properties: Object.keys(last).filter(
            key =>
              !['offset', 'computedOffset', 'easing', 'composite'].includes(
                key,
              ),
          ),
          to: {},
        };
      }),
  );
}

/** Whether the viewer's dialog is open; a closed one may be gone. */
const isOpen = async (page: Page) =>
  page.evaluate(() => document.querySelector('dialog')?.open === true);

/**
 * The theme's `--duration-fast`, ms. With no `--duration-exit`, the touch
 * exit falls back to it.
 */
const themeFastMs = async (page: Page) =>
  page.evaluate(() =>
    parseFloat(
      getComputedStyle(document.documentElement).getPropertyValue(
        '--duration-fast',
      ),
    ),
  );

test('a tap on Close fades the viewer out on the theme exit tokens, then reports the close', async ({
  page,
  browserName,
}) => {
  const v = await openViewer(page);
  const fast = await themeFastMs(page);
  expect(fast).toBeGreaterThan(0);
  await v.tapOn(v.dialog.getByRole('button', {name: 'Close'}));
  // The viewer stays up while it leaves.
  expect(await isOpen(page)).toBe(true);
  const [fade] = await animationsOn(v.container);
  expect(fade).toMatchObject({
    duration: fast,
    easing: EASE_EXIT,
    properties: ['opacity'],
  });
  expect(fade.to.opacity).toBe('0');
  // The photo shrinks a little, on the same clock.
  const [shrink] = await animationsOn(v.stage);
  expect(shrink).toMatchObject({duration: fast, easing: EASE_EXIT});
  expect(parseFloat(shrink.to.scale)).toBeGreaterThan(0.8);
  expect(parseFloat(shrink.to.scale)).toBeLessThan(1);
  if (browserName === 'webkit') {
    // WebKit lists no animation on `::backdrop`. Its computed style names the
    // fade and its timing.
    const backdrop = await v.dialog.evaluate(el => {
      const style = getComputedStyle(el, '::backdrop');
      return {
        name: style.animationName,
        seconds: parseFloat(style.animationDuration),
        easing: style.animationTimingFunction,
      };
    });
    expect(backdrop.name).not.toBe('none');
    expect(backdrop.seconds * 1000).toBeCloseTo(fast, 0);
    expect(curveOf(backdrop.easing)).toEqual(curveOf(EASE_EXIT));
  } else {
    const [backdrop] = await backdropAnimations(page);
    expect(backdrop).toMatchObject({
      duration: fast,
      easing: EASE_EXIT,
      properties: ['opacity'],
    });
  }
  // The close is reported when the exit ends.
  await expect.poll(async () => isOpen(page)).toBe(false);
});

test('Escape plays the touch exit too', async ({page}) => {
  const v = await openViewer(page);
  const fast = await themeFastMs(page);
  await page.keyboard.press('Escape');
  expect(await isOpen(page)).toBe(true);
  const [fade] = await animationsOn(v.container);
  expect(fade).toMatchObject({duration: fast, easing: EASE_EXIT});
  await expect.poll(async () => isOpen(page)).toBe(false);
});

test('a tap beside a photo without zoom plays the touch exit', async ({
  page,
}) => {
  const v = await openViewer(page, 'plain');
  const fast = await themeFastMs(page);
  const box = await v.container.boundingBox();
  if (box == null) {
    throw new Error('no viewer');
  }
  // The dark area under the photo, clear of the controls.
  await v.driver.tap({x: box.x + box.width / 2, y: box.y + box.height - 8});
  expect(await isOpen(page)).toBe(true);
  const [fade] = await animationsOn(v.container);
  expect(fade).toMatchObject({duration: fast, easing: EASE_EXIT});
  await expect.poll(async () => isOpen(page)).toBe(false);
});

test("a theme's exit duration times the touch exit", async ({page}) => {
  const v = await openViewer(page);
  await page.evaluate(() =>
    document.documentElement.style.setProperty('--duration-exit', '300ms'),
  );
  await v.tapOn(v.dialog.getByRole('button', {name: 'Close'}));
  const [fade] = await animationsOn(v.container);
  expect(fade.duration).toBe(300);
  const [shrink] = await animationsOn(v.stage);
  expect(shrink.duration).toBe(300);
});

test('under Reduce Motion the touch exit only fades, within the reduced cross-fade', async ({
  page,
}) => {
  await page.emulateMedia({reducedMotion: 'reduce'});
  const v = await openViewer(page);
  await page.evaluate(() =>
    document.documentElement.style.setProperty('--duration-exit', '300ms'),
  );
  await v.tapOn(v.dialog.getByRole('button', {name: 'Close'}));
  expect(await isOpen(page)).toBe(true);
  // The photo does not shrink.
  expect(await animationsOn(v.stage)).toEqual([]);
  // The fade keeps the exit curve, cut to the reduced cross-fade's 200 ms.
  const [fade] = await animationsOn(v.container);
  expect(fade).toMatchObject({
    duration: 200,
    easing: EASE_EXIT,
    properties: ['opacity'],
  });
  await expect.poll(async () => isOpen(page)).toBe(false);
});

test('the viewer takes no input while it leaves', async ({page}) => {
  const v = await openViewer(page, 'gallery');
  await page.evaluate(() =>
    document.documentElement.style.setProperty('--duration-exit', '600ms'),
  );
  const counter = v.dialog.getByText(/^\d+ \/ \d+$/);
  await expect(counter).toHaveText('1 / 4');
  const next = await v.dialog.getByRole('button', {name: 'Next'}).boundingBox();
  await v.tapOn(v.dialog.getByRole('button', {name: 'Close'}));
  expect(await v.container.evaluate(el => (el as HTMLElement).inert)).toBe(
    true,
  );
  expect(
    await v.dialog.evaluate(el => getComputedStyle(el).pointerEvents),
  ).toBe('none');
  // A tap on Next and an arrow key both do nothing.
  if (next == null) {
    throw new Error('no Next button');
  }
  await v.driver.tap({x: next.x + next.width / 2, y: next.y + next.height / 2});
  await page.keyboard.press('ArrowRight');
  expect(await counter.textContent()).toBe('1 / 4');
  await expect.poll(async () => isOpen(page)).toBe(false);
});

test('a caller that keeps the viewer open gets it back after the exit', async ({
  page,
}) => {
  const v = await openViewer(page, 'confirm');
  await v.tapOn(v.dialog.getByRole('button', {name: 'Close'}));
  // The caller hears of the close when the exit ends and keeps the viewer.
  await expect
    .poll(async () => v.container.evaluate(el => (el as HTMLElement).inert))
    .toBe(false);
  expect(await isOpen(page)).toBe(true);
  expect(await animationsOn(v.container)).toEqual([]);
  expect(
    await v.container.evaluate(el => parseFloat(getComputedStyle(el).opacity)),
  ).toBe(1);
  await expect(v.dialog.getByRole('button', {name: 'Close'})).toBeVisible();
});

test('with a mouse the viewer closes at once', async ({browser}) => {
  const context = await browser.newContext({
    viewport: {width: 1280, height: 800},
    hasTouch: false,
    isMobile: false,
  });
  try {
    const page = await context.newPage();
    expect(
      await page.evaluate(() => matchMedia('(pointer: coarse)').matches),
    ).toBe(false);
    await page.route('https://picsum.photos/**', async route =>
      route.fulfill({
        contentType: 'image/svg+xml',
        body: '<svg xmlns="http://www.w3.org/2000/svg" width="3000" height="2000"><rect width="3000" height="2000" fill="#888"/></svg>',
      }),
    );
    await openStory(page, storybook(), STORIES.zoom.id);
    await page.getByRole('button', {name: STORIES.zoom.trigger}).click();
    const dialog = page.getByRole('dialog');
    await expect(dialog).toBeVisible();
    await dialog.getByRole('button', {name: 'Close'}).click();
    expect(await isOpen(page)).toBe(false);
  } finally {
    await context.close();
  }
});
