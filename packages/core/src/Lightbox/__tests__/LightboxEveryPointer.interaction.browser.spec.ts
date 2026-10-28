// Copyright (c) Meta Platforms, Inc. and affiliates.

/**
 * @file LightboxEveryPointer.interaction.browser.spec.ts
 * @input The built "With zoom", "Gallery with zoom" and "Default" Lightbox
 *   stories in a desktop context. It has a mouse and a trackpad's wheel, and
 *   in Chromium a pen and timed mouse events
 * @output Proofs that every pointer gets Lightbox's gestures. They cover
 *   drag down to close, paging, ctrl-wheel zoom and a trackpad's pan of a
 *   zoomed photo, never a mouse wheel's notch. They also cover a zoomed coast
 *   and Reduce Motion's close
 * @position Interaction tests for Lightbox (browser), beside
 *   LightboxZoomModes.interaction.browser.spec.ts
 */

import {
  expect,
  test,
  type Browser,
  type Locator,
  type Page,
} from '@playwright/test';
import {
  frames,
  openStory,
  waitForRest,
  withStorybook,
} from '@astryxdesign/interaction-harness';

const storybook = withStorybook(test);

type Story = 'with-zoom' | 'gallery-with-zoom' | 'default';

const TRIGGER: Record<Story, string> = {
  'with-zoom': 'Open with zoom',
  'gallery-with-zoom': 'Open gallery with zoom',
  default: 'Open lightbox',
};

function photoSvg(width: number, height: number): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}"><rect width="${width}" height="${height}" fill="#5f7fa6"/><circle cx="${width / 2}" cy="${height / 2}" r="${height / 4}" fill="#fff" fill-opacity="0.35"/></svg>`;
}

interface Point {
  x: number;
  y: number;
}

/** Opens a story's viewer in a desktop context: a mouse, no touch. */
async function openDesktop(
  browser: Browser,
  story: Story,
  {reducedMotion = false}: {reducedMotion?: boolean} = {},
) {
  const context = await browser.newContext({
    viewport: {width: 1280, height: 800},
    hasTouch: false,
    isMobile: false,
    reducedMotion: reducedMotion ? 'reduce' : 'no-preference',
  });
  const page = await context.newPage();
  // A fine primary pointer in this context (the interaction config can report
  // a coarse one without touch).
  expect(
    await page.evaluate(() => matchMedia('(pointer: coarse)').matches),
  ).toBe(false);
  await page.route('https://picsum.photos/**', async route =>
    route.fulfill({contentType: 'image/svg+xml', body: photoSvg(3000, 2000)}),
  );
  await openStory(page, storybook(), `core-lightbox--${story}`);
  await page.getByRole('button', {name: TRIGGER[story]}).click();
  const dialog = page.getByRole('dialog');
  await expect(dialog).toBeVisible();
  const img =
    story === 'gallery-with-zoom'
      ? dialog.locator('[data-current] img')
      : dialog.getByRole('img').first();
  await expect
    .poll(async () => img.evaluate(el => (el as HTMLImageElement).naturalWidth))
    .toBe(3000);
  await frames(page, 2);
  const box = await boxOf(img);
  // A wheel delta as the page receives it, in CSS pixels. Chromium's input
  // divides Playwright's by the device pixel ratio, and WebKit's does not. A
  // mouse wheel's notch is a whole 100 px only as the page sees it.
  const scale =
    page.context().browser()?.browserType().name() === 'chromium'
      ? await page.evaluate(() => window.devicePixelRatio)
      : 1;
  return {
    wheel: async (dx: number, dy: number) =>
      page.mouse.wheel(dx * scale, dy * scale),
    context,
    page,
    dialog,
    img,
    centre: {x: box.x + box.width / 2, y: box.y + box.height / 2},
  };
}

async function boxOf(locator: Locator) {
  const box = await locator.boundingBox();
  if (box == null) {
    throw new Error('no box');
  }
  return box;
}

/** A mouse pressed at `from` and moved to `to` in `steps`, one a frame. */
async function mouseDrag(page: Page, from: Point, to: Point, steps: number) {
  await page.mouse.move(from.x, from.y);
  await page.mouse.down();
  for (let i = 1; i <= steps; i++) {
    await page.mouse.move(
      from.x + ((to.x - from.x) * i) / steps,
      from.y + ((to.y - from.y) * i) / steps,
    );
    await frames(page, 1);
  }
}

/**
 * Mouse or pen events with exact timestamps through the Chrome DevTools
 * Protocol: a release's velocity is the move's, whatever the runner's pace.
 */
async function timedPointer(page: Page, pointerType: 'mouse' | 'pen') {
  const cdp = await page.context().newCDPSession(page);
  let clock = await page.evaluate(
    () => performance.timeOrigin + performance.now(),
  );
  return async (
    type: 'mousePressed' | 'mouseMoved' | 'mouseReleased',
    at: Point,
    afterMs: number,
  ) => {
    clock += afterMs;
    await cdp.send('Input.dispatchMouseEvent', {
      type,
      x: at.x,
      y: at.y,
      button: 'left',
      buttons: type === 'mouseReleased' ? 0 : 1,
      clickCount: type === 'mouseMoved' ? 0 : 1,
      pointerType,
      timestamp: clock / 1000,
    });
  };
}

test('a mouse drag down from the fitted size follows the pointer and closes the viewer at once at the release', async ({
  browser,
}) => {
  const {context, page, dialog, img, centre} = await openDesktop(
    browser,
    'with-zoom',
  );
  try {
    const before = await boxOf(img);
    await mouseDrag(page, centre, {x: centre.x, y: centre.y + 150}, 10);
    // The photo follows past the pan's 10 px threshold, as under a finger.
    expect((await boxOf(img)).y - before.y).toBeGreaterThan(100);
    await page.mouse.up();
    // At once, with no exit spring: where the primary pointer is fine, only
    // a finger's release plays it.
    await expect(dialog).toBeHidden({timeout: 150});
  } finally {
    await context.close();
  }
});

for (const story of ['with-zoom', 'gallery-with-zoom'] as const) {
  test(`a photo dragged to dismiss draws past the box it was fitted in (${story})`, async ({
    browser,
  }) => {
    const {context, page, img, centre} = await openDesktop(browser, story);
    try {
      await mouseDrag(page, centre, {x: centre.x, y: centre.y + 140}, 10);
      await frames(page, 2);
      const drawn = await img.evaluate(el => {
        const photo = el.getBoundingClientRect();
        const stage = el
          .closest('[data-zoom-dismissing]')
          ?.getBoundingClientRect();
        // The first box between the photo and the dialog that clips it.
        let clippedBy: string | null = null;
        for (
          let box = el.parentElement;
          box != null && box.tagName !== 'DIALOG';
          box = box.parentElement
        ) {
          if (
            getComputedStyle(box).overflowY !== 'visible' &&
            photo.bottom > box.getBoundingClientRect().bottom + 0.5
          ) {
            clippedBy = box.outerHTML.slice(0, 80);
            break;
          }
        }
        return {past: photo.bottom - (stage?.bottom ?? Number.NaN), clippedBy};
      });
      // The photo reaches past its box, and no box cuts it off.
      expect(drawn.past).toBeGreaterThan(20);
      expect(drawn.clippedBy).toBeNull();
      await page.mouse.up();
    } finally {
      await context.close();
    }
  });
}

test('a mouse drag down brought back to where it started springs back, the viewer open', async ({
  browser,
}) => {
  const {context, page, dialog, img, centre} = await openDesktop(
    browser,
    'with-zoom',
  );
  try {
    const before = await boxOf(img);
    await mouseDrag(page, centre, {x: centre.x, y: centre.y + 120}, 8);
    // It followed the pointer down.
    expect((await boxOf(img)).y - before.y).toBeGreaterThan(80);
    for (let i = 1; i <= 8; i++) {
      await page.mouse.move(centre.x, centre.y + 120 - 15 * i);
      await frames(page, 1);
    }
    // Held still at the start for 15 frames, past the velocity filter's
    // silent hold, then let go. Nothing projects past the dismissal's
    // distance.
    await frames(page, 15);
    await page.mouse.up();
    await waitForRest(img);
    await expect(dialog).toBeVisible();
    expect((await boxOf(img)).y).toBeCloseTo(before.y, 0);
  } finally {
    await context.close();
  }
});

test('a mouse drag sideways pages a gallery', async ({browser}) => {
  const {context, page, dialog, centre} = await openDesktop(
    browser,
    'gallery-with-zoom',
  );
  try {
    const counter = dialog.getByText(/^\d+ \/ \d+$/);
    await expect(counter).toHaveText('1 / 4');
    // Past half a page from the photo's right side, so the release pages on
    // its travel alone, whatever the runner's pace.
    await mouseDrag(page, {x: 1100, y: centre.y}, {x: 250, y: centre.y}, 17);
    await page.mouse.up();
    await expect(counter).toHaveText('2 / 4');
  } finally {
    await context.close();
  }
});

const WHEEL_DRIVERS =
  "Chromium's driver sends each wheel as a mouse wheel's notch; WebKit's sends a trackpad's precise deltas.";

test('a trackpad’s horizontal scroll pages a gallery', async ({
  browser,
  browserName,
}) => {
  test.skip(browserName !== 'webkit', WHEEL_DRIVERS);
  const {wheel, context, page, dialog, centre} = await openDesktop(
    browser,
    'gallery-with-zoom',
  );
  try {
    const counter = dialog.getByText(/^\d+ \/ \d+$/);
    await expect(counter).toHaveText('1 / 4');
    await page.mouse.move(centre.x, centre.y);
    // Past half a page, so the gesture pages on its travel alone. No delta is
    // a multiple of 40 px, which would read as a mouse wheel's notch.
    for (let i = 0; i < 24; i++) {
      await wheel(30, 0);
      await frames(page, 1);
    }
    await expect(counter).toHaveText('2 / 4');
  } finally {
    await context.close();
  }
});

test("a mouse wheel's notches leave a gallery on its photo", async ({
  browser,
  browserName,
}) => {
  test.skip(browserName !== 'chromium', WHEEL_DRIVERS);
  const {wheel, context, page, dialog, centre} = await openDesktop(
    browser,
    'gallery-with-zoom',
  );
  try {
    const counter = dialog.getByText(/^\d+ \/ \d+$/);
    await expect(counter).toHaveText('1 / 4');
    await page.mouse.move(centre.x, centre.y);
    for (let i = 0; i < 8; i++) {
      await wheel(120, 0);
      await frames(page, 1);
    }
    // The host ends a notch's stream 100 ms after its last event. Fifteen
    // frames pass that at up to 120 Hz.
    await frames(page, 15);
    await expect(counter).toHaveText('1 / 4');
  } finally {
    await context.close();
  }
});

test('a ctrl-wheel zooms the photo', async ({browser}) => {
  const {wheel, context, page, dialog, img, centre} = await openDesktop(
    browser,
    'with-zoom',
  );
  try {
    const fitted = await boxOf(img);
    await page.mouse.move(centre.x, centre.y);
    await page.keyboard.down('Control');
    for (let i = 0; i < 3; i++) {
      await wheel(0, -20);
      await frames(page, 1);
    }
    await page.keyboard.up('Control');
    await expect(dialog.getByRole('button', {name: 'Zoom'})).toHaveAttribute(
      'aria-pressed',
      'true',
    );
    await waitForRest(img);
    expect((await boxOf(img)).width).toBeGreaterThan(fitted.width * 1.05);
  } finally {
    await context.close();
  }
});

test("a trackpad's scroll pans a zoomed photo", async ({
  browser,
  browserName,
}) => {
  test.skip(browserName !== 'webkit', WHEEL_DRIVERS);
  const {wheel, context, page, dialog, img, centre} = await openDesktop(
    browser,
    'with-zoom',
  );
  try {
    await dialog.getByRole('button', {name: 'Zoom'}).focus();
    await page.keyboard.press('+');
    await waitForRest(img);
    const zoomed = await boxOf(img);
    await page.mouse.move(centre.x, centre.y);
    // A trackpad's stream of small deltas. One 120 px delta over a 360
    // legacy delta reads as a mouse wheel's notch.
    for (const dy of [12, 12, 12, 12, 12, 12, 11, 10, 9, 8]) {
      await wheel(0, dy);
    }
    await expect
      .poll(async () => (await boxOf(img)).y, {timeout: 3000})
      .toBeLessThan(zoomed.y - 20);
    await expect(dialog).toBeVisible();
  } finally {
    await context.close();
  }
});

test("a mouse wheel's notch leaves a zoomed photo in place", async ({
  browser,
  browserName,
}) => {
  test.skip(browserName !== 'chromium', WHEEL_DRIVERS);
  const {wheel, context, page, dialog, img, centre} = await openDesktop(
    browser,
    'with-zoom',
  );
  try {
    await dialog.getByRole('button', {name: 'Zoom'}).focus();
    await page.keyboard.press('+');
    await waitForRest(img);
    const zoomed = await boxOf(img);
    await page.mouse.move(centre.x, centre.y);
    await wheel(0, 120);
    // The host ends a notch's stream 100 ms after its last event. Fifteen
    // frames pass that at up to 120 Hz.
    await frames(page, 15);
    await waitForRest(img);
    const after = await boxOf(img);
    expect(Math.abs(after.x - zoomed.x)).toBeLessThan(1);
    expect(Math.abs(after.y - zoomed.y)).toBeLessThan(1);
    await expect(dialog).toBeVisible();
  } finally {
    await context.close();
  }
});

test('a zoomed photo coasts on after a mouse drag released moving', async ({
  browser,
  browserName,
}) => {
  test.skip(
    browserName !== 'chromium',
    'Timed mouse events are dispatched through the Chrome DevTools Protocol.',
  );
  const {context, page, dialog, img, centre} = await openDesktop(
    browser,
    'with-zoom',
  );
  try {
    await dialog.getByRole('button', {name: 'Zoom'}).focus();
    await page.keyboard.press('+');
    await waitForRest(img);
    const mouse = await timedPointer(page, 'mouse');
    await mouse('mouseMoved', centre, 0);
    await mouse('mousePressed', centre, 16);
    for (let i = 1; i <= 6; i++) {
      await mouse('mouseMoved', {x: centre.x - 20 * i, y: centre.y}, 16);
    }
    await mouse('mouseReleased', {x: centre.x - 120, y: centre.y}, 4);
    const atRelease = (await boxOf(img)).x;
    await waitForRest(img);
    // It kept going after the release, as a finger's flick does.
    expect((await boxOf(img)).x).toBeLessThan(atRelease - 20);
  } finally {
    await context.close();
  }
});

test('a pen drag down closes the viewer', async ({browser, browserName}) => {
  test.skip(
    browserName !== 'chromium',
    'Pen input is dispatched through the Chrome DevTools Protocol.',
  );
  const {context, page, dialog, centre} = await openDesktop(
    browser,
    'with-zoom',
  );
  try {
    const pen = await timedPointer(page, 'pen');
    await pen('mouseMoved', centre, 0);
    await pen('mousePressed', centre, 16);
    for (let i = 1; i <= 8; i++) {
      await pen('mouseMoved', {x: centre.x, y: centre.y + 20 * i}, 24);
    }
    await pen('mouseReleased', {x: centre.x, y: centre.y + 160}, 8);
    await expect(dialog).toBeHidden();
  } finally {
    await context.close();
  }
});

test("a trackpad's scroll down over a fitted photo closes the viewer", async ({
  browser,
  browserName,
}) => {
  test.skip(browserName !== 'webkit', WHEEL_DRIVERS);
  const {wheel, context, page, dialog, img, centre} = await openDesktop(
    browser,
    'with-zoom',
  );
  try {
    const before = await boxOf(img);
    await page.mouse.move(centre.x, centre.y);
    const lowest = page.evaluate(
      async () =>
        new Promise<number>(resolve => {
          const photo = document.querySelector('dialog img');
          let low = photo?.getBoundingClientRect().y ?? 0;
          const t0 = performance.now();
          const tick = () => {
            low = Math.max(low, photo?.getBoundingClientRect().y ?? low);
            if (performance.now() - t0 < 400) {
              requestAnimationFrame(tick);
            } else {
              resolve(low);
            }
          };
          requestAnimationFrame(tick);
        }),
    );
    // A scroll moves the content with it, as a trackpad's swipe down does
    // under natural scrolling. No delta is a multiple of 40 px, which would
    // read as a mouse wheel's notch.
    for (let i = 0; i < 10; i++) {
      await wheel(0, -12);
      await frames(page, 1);
    }
    // The photo moved down with the scroll, as a drag down moves it.
    expect(await lowest).toBeGreaterThan(before.y + 20);
    // 120 px are past the commit point, `zoomMedia.dismiss.cancelTravel`
    // (10 pt). So the stream's end closes the viewer, as a pull lifted does.
    await expect(dialog).toBeHidden();
  } finally {
    await context.close();
  }
});

test("a mouse wheel's notch leaves a fitted photo and the viewer in place", async ({
  browser,
  browserName,
}) => {
  test.skip(browserName !== 'chromium', WHEEL_DRIVERS);
  const {wheel, context, page, dialog, img, centre} = await openDesktop(
    browser,
    'with-zoom',
  );
  try {
    const before = await boxOf(img);
    await page.mouse.move(centre.x, centre.y);
    await wheel(0, -100);
    // The host ends a notch's stream 100 ms after its last event. Fifteen
    // frames pass that at up to 120 Hz.
    await frames(page, 15);
    expect(Math.abs((await boxOf(img)).y - before.y)).toBeLessThan(1);
    await expect(dialog).toBeVisible();
  } finally {
    await context.close();
  }
});

test('under Reduce Motion a mouse’s release closes the viewer at once where the primary pointer is fine (design:reduced-motion DR3)', async ({
  browser,
}) => {
  const {context, page, dialog, centre} = await openDesktop(
    browser,
    'with-zoom',
    {reducedMotion: true},
  );
  try {
    await mouseDrag(page, centre, {x: centre.x, y: centre.y + 150}, 10);
    await page.mouse.up();
    // At once, with no fade: only a coarse pointer's or a finger's release
    // fades.
    await expect(dialog).toBeHidden({timeout: 150});
  } finally {
    await context.close();
  }
});
