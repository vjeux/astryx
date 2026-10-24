// Copyright (c) Meta Platforms, Inc. and affiliates.

/**
 * @file ContextMenuLift.interaction.browser.spec.ts
 * @input The built "Touch / long press" ContextMenu story, real touch input
 *   (Chromium CDP / WebKit's input command), the interaction harness, the
 *   context-menu constants and springs
 * @output Interaction and animation proofs for the lift presentation: a held
 *   card lifts to UIKit's size about its center over the theme's backdrop
 *   colour with the theme's shadow, the card itself still showing under its
 *   copy, with the menu 16 px below it and
 *   centered; a card near the bottom gets its menu above; a card at the left
 *   edge lifts 16 px in with its menu flush; the copy grows on from the
 *   press, and the backdrop fades in, on springs.contextMenuLift frame by
 *   frame; the menu's glass grows out of the finger with its content
 *   following from a blur, then settles as the menu itself; closing shrinks
 *   the menu back into the finger as its glass fades and returns the copy on
 *   the morph spring; closing clears the backdrop; storyboards of the lift
 *   and of the exit
 * @position Interaction specs of packages/core/src/ContextMenu, beside
 *   ContextMenuLongPress.interaction.browser.spec.ts (the press timeline)
 */

import {expect, test, type Page} from '@playwright/test';
import {
  animationStoryboard,
  holdAnimations,
  openStory,
  releaseAnimations,
  seekAnimations,
  tap,
  timeline,
  touchDriver,
  withStorybook,
  writeEvidence,
  type TouchDriver,
} from '@astryxdesign/interaction-harness';
import {solveSpring, toSpring} from '../../motion/spring';
import {contextMenu, springs} from '../../motion/uikit';

const storybook = withStorybook(test);
const {menuDisplayMs} = contextMenu.press;
const {menuGap, screenInset, verticalMargin} = contextMenu.lift;

interface Box {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface LiftStory {
  driver: TouchDriver;
  center: {x: number; y: number};
}

/**
 * Opens the story; `moveCard` gets the card's box and returns the offset
 * (CSS px) to move it by, for the placement cases.
 */
async function openLiftStory(
  page: Page,
  moveCard?: (
    box: Box,
    viewport: {width: number; height: number},
  ) => {
    dx: number;
    dy: number;
  },
): Promise<LiftStory> {
  await openStory(page, storybook(), 'core-contextmenu--touch-long-press');
  const trigger = page.getByTestId('touch-context-menu');
  let box = await trigger.boundingBox();
  if (box == null) {
    throw new Error('no trigger');
  }
  if (moveCard != null) {
    const viewport = page.viewportSize();
    if (viewport == null) {
      throw new Error('no viewport');
    }
    const {dx, dy} = moveCard(box, viewport);
    await trigger.evaluate(
      (el, offset) => {
        const host = el as HTMLElement;
        host.style.position = 'relative';
        host.style.left = `${offset.dx}px`;
        host.style.top = `${offset.dy}px`;
      },
      {dx, dy},
    );
    box = await trigger.boundingBox();
    if (box == null) {
      throw new Error('no trigger');
    }
  }
  return {
    driver: await touchDriver(page),
    center: {x: box.x + box.width / 2, y: box.y + box.height / 2},
  };
}

/** The card, its lifted copy, the menu's popover and the backdrop, now. */
async function readLift(page: Page) {
  return page.evaluate(() => {
    const rect = (el: Element | null | undefined) => {
      if (el == null) {
        return null;
      }
      const r = el.getBoundingClientRect();
      return {x: r.x, y: r.y, width: r.width, height: r.height};
    };
    const card = document.querySelector('[data-testid="touch-context-menu"]');
    const backdrop = document.querySelector(
      '[data-astryx-context-menu-lift] > span',
    );
    return {
      card: rect(card),
      cardOpacity: card == null ? null : getComputedStyle(card).opacity,
      preview: rect(
        document.querySelector('[data-astryx-context-menu-preview]'),
      ),
      menu: rect(document.querySelector('[role="menu"]')?.closest('[popover]')),
      backdropColor:
        backdrop == null ? null : getComputedStyle(backdrop).backgroundColor,
      shadow: (() => {
        const layer = document.querySelector(
          '[data-astryx-context-menu-shadow]',
        );
        if (layer == null) {
          return null;
        }
        const style = getComputedStyle(layer);
        return {opacity: Number(style.opacity), boxShadow: style.boxShadow};
      })(),
      backdropOpacity:
        backdrop == null ? null : Number(getComputedStyle(backdrop).opacity),
      layerOpen:
        document
          .querySelector('[data-astryx-context-menu-lift]')
          ?.matches(':popover-open') ?? false,
    };
  });
}

/** A finger held until the menu shows, then lifted (the menu stays). */
async function liftAndSettle(page: Page, {driver, center}: LiftStory) {
  await driver.play(tap(center, {holdMs: menuDisplayMs + 100}));
  await expect(page.getByRole('menu', {name: 'Photo actions'})).toBeVisible();
  // The lift settles within about half a second.
  await page.waitForTimeout(800);
  return readLift(page);
}

test('a held card lifts to UIKit’s size about its center over the theme’s dim and shadow, the card still under it, its menu 16 px below and centered', async ({
  page,
}) => {
  const story = await openLiftStory(page);
  // Closed, the lift layer takes no room and no touches.
  await expect(page.locator('[data-astryx-context-menu-lift]')).toBeHidden();
  const lift = await liftAndSettle(page, story);
  const {card, preview, menu} = lift;
  if (card == null || preview == null || menu == null) {
    throw new Error(JSON.stringify(lift));
  }
  const detail = JSON.stringify(lift);
  // 200 × 120 lifts by 26 pt on its longer side: 226 × 135.6.
  expect(preview.width, detail).toBeCloseTo(226, 0);
  expect(preview.height, detail).toBeCloseTo(135.6, 0);
  expect(preview.x + preview.width / 2, detail).toBeCloseTo(
    card.x + card.width / 2,
    0,
  );
  expect(preview.y + preview.height / 2, detail).toBeCloseTo(
    card.y + card.height / 2,
    0,
  );
  expect(lift.cardOpacity, detail).toBe('1');
  // The theme's modal dim (`--color-background-backdrop`; this story's theme
  // sets its own), fully faded in.
  // An rgb() colour is opaque; an rgba() one carries its alpha last.
  const dimAlpha = /^rgba\((?:[^,]+,){3}\s*([\d.]+)\)$/u.exec(
    lift.backdropColor ?? '',
  );
  expect(lift.backdropColor, detail).toMatch(/^rgba?\(/u);
  expect(Number(dimAlpha?.[1] ?? 1), detail).toBeGreaterThan(0);
  // The theme's high shadow, faded in under the copy.
  expect(lift.shadow?.opacity, detail).toBeCloseTo(1, 2);
  expect(lift.shadow?.boxShadow, detail).not.toBe('none');
  expect(lift.backdropOpacity, detail).toBeCloseTo(1, 2);
  expect(menu.y, detail).toBeCloseTo(preview.y + preview.height + menuGap, 0);
  expect(menu.x + menu.width / 2, detail).toBeCloseTo(
    preview.x + preview.width / 2,
    0,
  );
});

test('a card near the bottom gets its menu above, and its copy stays 20 px clear of the bottom', async ({
  page,
}) => {
  const story = await openLiftStory(page, (box, viewport) => ({
    dx: 0,
    // The card's bottom 10 px from the viewport's.
    dy: viewport.height - 10 - (box.y + box.height),
  }));
  const lift = await liftAndSettle(page, story);
  const {preview, menu} = lift;
  if (preview == null || menu == null) {
    throw new Error(JSON.stringify(lift));
  }
  const viewport = page.viewportSize();
  const detail = JSON.stringify({lift, viewport});
  expect(preview.y + preview.height, detail).toBeCloseTo(
    (viewport?.height ?? NaN) - verticalMargin,
    0,
  );
  expect(menu.y + menu.height, detail).toBeCloseTo(preview.y - menuGap, 0);
});

test('a card at the left edge lifts 16 px in, and its menu is flush with it', async ({
  page,
}) => {
  const story = await openLiftStory(page, box => ({dx: 4 - box.x, dy: 0}));
  const lift = await liftAndSettle(page, story);
  const {preview, menu} = lift;
  if (preview == null || menu == null) {
    throw new Error(JSON.stringify(lift));
  }
  const detail = JSON.stringify(lift);
  expect(preview.x, detail).toBeCloseTo(screenInset, 0);
  expect(menu.x, detail).toBeCloseTo(screenInset, 0);
});

test('the copy grows on from the press, and the backdrop fades in, on springs.contextMenuLift, frame by frame', async ({
  page,
}, testInfo) => {
  const {driver, center} = await openLiftStory(page);
  const playing = driver.play(tap(center, {holdMs: menuDisplayMs + 600}));
  const preview = page.locator('[data-astryx-context-menu-preview]');
  await expect(preview).toBeAttached({timeout: 5_000});
  await holdAnimations(page);
  const samples: {t: number; scale: number; backdrop: number}[] = [];
  for (const t of timeline(450)) {
    await seekAnimations(page, t);
    samples.push({
      t,
      ...(await page.evaluate(() => {
        const copy = document.querySelector(
          '[data-astryx-context-menu-preview]',
        );
        const backdrop = document.querySelector(
          '[data-astryx-context-menu-lift] > span',
        );
        const scale = copy == null ? 'none' : getComputedStyle(copy).scale;
        return {
          scale: scale === 'none' ? 1 : Number.parseFloat(scale),
          backdrop:
            backdrop == null ? NaN : Number(getComputedStyle(backdrop).opacity),
        };
      })),
    });
  }
  await releaseAnimations(page);
  await playing;
  const from = samples[0].scale;
  const scale = solveSpring(toSpring(springs.contextMenuLift), {
    from,
    to: 1.13,
  });
  const fade = solveSpring(toSpring(springs.contextMenuLift), {from: 0, to: 1});
  const errors = samples.map(s => ({
    t: s.t,
    widthErrorPx: Math.abs(s.scale - scale.value(s.t / 1000)) * 200,
    // Opacity stops at 1: the spring's 1.5% overshoot (UIKit's alpha peaks
    // at 1.0145 too) presents as 1.
    backdropError: Math.abs(s.backdrop - Math.min(1, fade.value(s.t / 1000))),
  }));
  await writeEvidence(
    'curves/contextmenu-lift',
    {
      [`${testInfo.project.name}.json`]: JSON.stringify(
        {from, samples, errors},
        null,
        1,
      ),
    },
    testInfo,
  );
  // The press left the card at about 1.06 (UIKit: 1.0618 at 733 ms).
  expect(from).toBeGreaterThan(1.04);
  expect(from).toBeLessThan(1.07);
  expect(Math.max(...errors.map(e => e.widthErrorPx))).toBeLessThan(0.3);
  expect(Math.max(...errors.map(e => e.backdropError))).toBeLessThan(0.01);
  // It overshoots, as UIKit's does (226.39 pt at +279 ms).
  expect(Math.max(...samples.map(s => s.scale))).toBeGreaterThan(1.13);
});

test('the menu’s glass grows out of the finger, its content following from a blur, and settles as the menu itself', async ({
  page,
}) => {
  const {driver, center} = await openLiftStory(page);
  const playing = driver.play(tap(center, {holdMs: menuDisplayMs + 900}));
  await expect(page.getByRole('menu', {name: 'Photo actions'})).toBeVisible();
  await holdAnimations(page);
  const read = async (t: number) => {
    await seekAnimations(page, t);
    return page.evaluate(() => {
      const list = document.querySelector('[role="menu"]');
      const glass = document.querySelector('[data-astryx-context-menu-glass]');
      if (list == null) {
        return null;
      }
      const style = getComputedStyle(list);
      const blur = /blur\(([\d.]+)px\)/u.exec(style.filter);
      const box = glass?.getBoundingClientRect();
      return {
        opacity: Number(style.opacity),
        blur: blur == null ? 0 : Number(blur[1]),
        glass:
          box == null || glass == null
            ? null
            : {
                x: box.x + box.width / 2,
                y: box.y + box.height / 2,
                width: box.width,
                height: box.height,
                opacity: Number(getComputedStyle(glass).opacity),
              },
      };
    });
  };
  const start = await read(0);
  const middle = await read(100);
  await releaseAnimations(page);
  // Settled: the glass is gone and the menu wears its own again.
  await page.waitForTimeout(700);
  const settled = await page.evaluate(() => {
    const list = document.querySelector('[role="menu"]');
    return {
      glass: document.querySelector('[data-astryx-context-menu-glass]') != null,
      inline: list?.getAttribute('style') ?? '',
      opacity: list == null ? null : getComputedStyle(list).opacity,
    };
  });
  await playing;
  const curve = solveSpring(toSpring(contextMenu.lift.morphSpring), {
    from: 0,
    to: 1,
  });
  const detail = JSON.stringify({center, start, middle, settled});
  const {morphStart, menuEntranceBlur} = contextMenu.lift;
  // A blob the morph's start size, at the finger.
  expect(start?.glass?.x, detail).toBeCloseTo(center.x, 0);
  expect(start?.glass?.y, detail).toBeCloseTo(center.y, 0);
  expect(start?.glass?.width, detail).toBeCloseTo(morphStart.width, 0);
  expect(start?.glass?.height, detail).toBeCloseTo(morphStart.height, 0);
  // It starts clear, as UIKit's starts as the view under the finger.
  expect(start?.glass?.opacity, detail).toBeCloseTo(0, 2);
  expect(middle?.glass?.opacity, detail).toBeCloseTo(curve.value(0.1), 1);
  expect(start?.opacity, detail).toBeCloseTo(0, 2);
  expect(start?.blur, detail).toBeCloseTo(menuEntranceBlur, 1);
  expect(middle?.opacity, detail).toBeCloseTo(curve.value(0.1), 1);
  expect(settled.glass, detail).toBe(false);
  expect(settled.inline, detail).not.toMatch(/background|box-shadow|overflow/u);
  expect(settled.opacity, detail).toBe('1');
});

test('closing shrinks the menu back into the finger as its glass fades, and returns the copy on the morph spring', async ({
  page,
}) => {
  const story = await openLiftStory(page);
  await liftAndSettle(page, story);
  // The menu's frame as laid out (its popover's box).
  const menuBox = await page.evaluate(() => {
    const r = document
      .querySelector('[role="menu"]')
      ?.closest('[popover]')
      ?.getBoundingClientRect();
    return r == null
      ? null
      : {x: r.x + r.width / 2, y: r.y + r.height / 2, width: r.width};
  });
  await page.keyboard.press('Escape');
  await holdAnimations(page);
  const read = async (t: number) => {
    await seekAnimations(page, t);
    return page.evaluate(() => {
      const glass = document.querySelector(
        '[data-astryx-context-menu-glass="exit"]',
      );
      const content = document.querySelector('[data-astryx-context-menu-exit]');
      const copy = document.querySelector('[data-astryx-context-menu-preview]');
      const box = glass?.getBoundingClientRect();
      const scale = copy == null ? 'none' : getComputedStyle(copy).scale;
      return {
        glass:
          box == null || glass == null
            ? null
            : {
                x: box.x + box.width / 2,
                y: box.y + box.height / 2,
                width: box.width,
                opacity: Number(getComputedStyle(glass).opacity),
              },
        contentOpacity:
          content == null ? null : Number(getComputedStyle(content).opacity),
        copyScale: scale === 'none' ? 1 : Number.parseFloat(scale),
      };
    });
  };
  const start = await read(0);
  const middle = await read(120);
  await releaseAnimations(page);
  await page.waitForTimeout(900);
  const after = await page.evaluate(() => ({
    exit:
      document.querySelector('[data-astryx-context-menu-exit]') != null ||
      document.querySelector('[data-astryx-context-menu-glass]') != null,
    layerOpen:
      document
        .querySelector('[data-astryx-context-menu-lift]')
        ?.matches(':popover-open') ?? false,
  }));
  const returning = solveSpring(toSpring(contextMenu.lift.morphSpring), {
    from: 1.13,
    to: 1,
  });
  const detail = JSON.stringify({
    menuBox,
    center: story.center,
    start,
    middle,
    after,
  });
  // It starts as the menu, glass and content opaque.
  expect(start.glass?.x, detail).toBeCloseTo(menuBox?.x ?? NaN, 0);
  expect(start.glass?.y, detail).toBeCloseTo(menuBox?.y ?? NaN, 0);
  expect(start.glass?.width, detail).toBeCloseTo(menuBox?.width ?? NaN, 0);
  expect(start.contentOpacity, detail).toBeCloseTo(1, 2);
  // Partway, smaller, nearer the finger, fading.
  expect(middle.glass?.width ?? Infinity, detail).toBeLessThan(
    (menuBox?.width ?? 0) * 0.8,
  );
  expect(
    Math.abs((middle.glass?.y ?? NaN) - story.center.y),
    detail,
  ).toBeLessThan(Math.abs((menuBox?.y ?? NaN) - story.center.y));
  expect(middle.glass?.opacity ?? 1, detail).toBeLessThan(1);
  expect(middle.contentOpacity ?? 1, detail).toBeLessThan(0.5);
  expect(middle.copyScale, detail).toBeCloseTo(returning.value(0.12), 2);
  // Done: the copies are gone and the lift layer hides.
  expect(after.exit, detail).toBe(false);
  expect(after.layerOpen, detail).toBe(false);
});

test('closing returns the copy to the card and clears the backdrop', async ({
  page,
}) => {
  const story = await openLiftStory(page);
  await liftAndSettle(page, story);
  await page.keyboard.press('Escape');
  await expect(page.getByRole('menu', {name: 'Photo actions'})).toBeHidden();
  await page.waitForTimeout(900);
  const after = await readLift(page);
  const detail = JSON.stringify(after);
  expect(after.preview, detail).toBeNull();
  expect(after.layerOpen, detail).toBe(false);
  expect(after.cardOpacity, detail).toBe('1');
});

test('a tap on the backdrop closes the menu and reaches nothing under it', async ({
  page,
}) => {
  const story = await openLiftStory(page);
  const lift = await liftAndSettle(page, story);
  if (lift.card == null) {
    throw new Error(JSON.stringify(lift));
  }
  await page.evaluate(() => {
    const w = window as unknown as {__clicked?: string[]};
    w.__clicked = [];
    document.addEventListener(
      'click',
      event => {
        const target = event.target as Element;
        w.__clicked?.push(
          target.closest('[data-astryx-context-menu-lift]')
            ? 'backdrop'
            : target.closest('[data-testid="touch-context-menu"]')
              ? 'card'
              : target.tagName.toLowerCase(),
        );
      },
      {capture: true},
    );
  });
  // On the card's own spot, under the backdrop, clear of the copy's edge.
  await story.driver.play(
    tap({x: lift.card.x + 10, y: lift.card.y + lift.card.height + 8}),
  );
  await expect(page.getByRole('menu', {name: 'Photo actions'})).toBeHidden();
  const clicked = await page.evaluate(
    () => (window as unknown as {__clicked?: string[]}).__clicked ?? [],
  );
  expect(clicked.filter(target => target !== 'backdrop')).toEqual([]);
});

test(
  'storyboard: the lift, from the menu’s moment',
  {tag: '@storyboard'},
  async ({page}, testInfo) => {
    const {driver, center} = await openLiftStory(page);
    const playing = driver.play(tap(center, {holdMs: menuDisplayMs + 900}));
    await expect(
      page.locator('[data-astryx-context-menu-preview]'),
    ).toBeAttached({timeout: 5_000});
    const viewport = page.viewportSize();
    const {storyboard} = await animationStoryboard(page, {
      name: 'contextmenu-lift',
      clip: {
        x: 0,
        y: Math.max(0, center.y - 120),
        width: viewport?.width ?? 402,
        height: 360,
      },
      times: timeline(450, 1000 / 30),
      measure: async () =>
        page.evaluate(() => {
          const copy = document.querySelector(
            '[data-astryx-context-menu-preview]',
          );
          const backdrop = document.querySelector(
            '[data-astryx-context-menu-lift] > span',
          );
          return {
            width: copy?.getBoundingClientRect().width.toFixed(1) ?? '-',
            backdrop:
              backdrop == null
                ? '-'
                : Number(getComputedStyle(backdrop).opacity).toFixed(3),
          };
        }),
      columns: 5,
      cellScale: 0.5,
    });
    await releaseAnimations(page);
    await playing;
    await storyboard.write(testInfo);
    const widths = storyboard.frames.map(f => Number(f.data.width));
    expect(widths.at(-1)).toBeCloseTo(226, 0);
  },
);

test(
  'storyboard: the exit, from the close',
  {tag: '@storyboard'},
  async ({page}, testInfo) => {
    const story = await openLiftStory(page);
    await liftAndSettle(page, story);
    await page.keyboard.press('Escape');
    const viewport = page.viewportSize();
    const {storyboard} = await animationStoryboard(page, {
      name: 'contextmenu-exit',
      clip: {
        x: 0,
        y: Math.max(0, story.center.y - 120),
        width: viewport?.width ?? 402,
        height: 400,
      },
      times: timeline(450, 1000 / 30),
      measure: async () =>
        page.evaluate(() => {
          const glass = document.querySelector(
            '[data-astryx-context-menu-glass="exit"]',
          );
          const copy = document.querySelector(
            '[data-astryx-context-menu-preview]',
          );
          return {
            glass: glass?.getBoundingClientRect().width.toFixed(1) ?? '-',
            copy: copy?.getBoundingClientRect().width.toFixed(1) ?? '-',
          };
        }),
      columns: 5,
      cellScale: 0.5,
    });
    await releaseAnimations(page);
    await storyboard.write(testInfo);
    // Until the copies are cleared away, at the end.
    const copies = storyboard.frames
      .map(f => Number(f.data.copy))
      .filter(Number.isFinite);
    expect(copies[0]).toBeCloseTo(226, 0);
    expect(copies.at(-1)).toBeCloseTo(200, 0);
  },
);
