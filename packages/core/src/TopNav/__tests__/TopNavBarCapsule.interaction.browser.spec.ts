// Copyright (c) Meta Platforms, Inc. and affiliates.

/**
 * @file TopNavBarCapsule.interaction.browser.spec.ts
 * @input The built "Touch bar over content" AppShell story on the touch
 *   phone profile (its TopNav in the phone bar: a Profile icon button and the
 *   drawer toggle), the interaction harness, and the iOS 26 bar geometry in
 *   motion/uikit/bars
 * @output Browser proof of the iOS 26 bar buttons under a finger, in the
 *   default look that grows no box for touch (`spec:AST-094` FR42, DEC-20):
 *   the phone bar keeps its 48px height and 8px padding, and its end items,
 *   still 32px controls 4px apart, sit on one capsule that is paint only
 *   (the theme's surface, fully rounded, reaching 4px past them, no drop
 *   shadow), the same boxes a mouse gets; right to left, the capsule sits at
 *   the inline end; an end group emptied of its content paints no capsule
 *   and the bar keeps its heading centred; Reduce Transparency changes
 *   nothing (the capsule is opaque); a finger on the toggle still opens the
 *   drawer; the buttons keep their names and order; a mouse keeps today's
 *   bar; a still of the bar
 * @position Interaction proof for TopNav.tsx's phone bar, run by
 *   `pnpm test:interaction` (Chromium and WebKit). Touch is one model on
 *   every touch device, so the phone profile's coarse pointer is the touch
 *   case in both engines
 */

import {expect, test, type Page} from '@playwright/test';
import {
  openStory,
  touchDriver,
  withStorybook,
} from '@astryxdesign/interaction-harness';

const storybook = withStorybook(test);

/** Opens the story, left to right or right to left. */
async function openBar(
  page: Page,
  {dir = 'ltr'}: {dir?: 'ltr' | 'rtl'} = {},
): Promise<void> {
  if (dir === 'rtl') {
    // Storybook's direction global sets the story's provider direction.
    await page.goto(
      `${storybook()}/iframe.html?id=${STORY}&viewMode=story&globals=direction:rtl`,
    );
    await page.locator('#storybook-root > *').first().waitFor();
  } else {
    await openStory(page, storybook(), STORY);
  }
}

const STORY = 'core-appshell--touch-bar-over-content';

/**
 * The default look's phone bar, under every pointer: `--spacing-2` padding
 * around `--size-element-md` controls `--spacing-1` apart.
 */
const PAD = 8;
const CONTROL = 32;
const GAP = 4;
const BAR = PAD + CONTROL + PAD;
/** Two icon buttons and the gap between them. */
const TWO_CONTROLS = CONTROL + GAP + CONTROL;
/** How far the capsule's paint reaches past the controls: UIKit's 4pt cell inset. */
const REACH = 4;

/** The theme's `--color-background-surface`, computed beside the capsule. */
async function surfaceColor(page: Page): Promise<string> {
  return page.evaluate(() => {
    const capsule = document.querySelector('[data-bar-capsule]');
    const probe = document.createElement('div');
    probe.style.backgroundColor = 'var(--color-background-surface)';
    (capsule?.parentElement ?? document.body).append(probe);
    const color = getComputedStyle(probe).backgroundColor;
    probe.remove();
    return color;
  });
}

interface Geometry {
  shellLeft: number;
  shellRight: number;
  bar: {top: number; height: number};
  /** The heading's vertical centre, from the bar's. */
  headingOffset: number;
  capsule: {
    left: number;
    right: number;
    top: number;
    width: number;
    height: number;
    radius: string;
    background: string;
    shadow: string;
  };
  /** Each button's centre, from the capsule's left edge. */
  centres: number[];
  names: string[];
}

async function geometry(page: Page): Promise<Geometry> {
  return page.evaluate(() => {
    const banner = document.querySelector('[role="banner"]') as HTMLElement;
    const shell = (banner.closest('.astryx-app-shell') ??
      banner.parentElement) as HTMLElement;
    const bar = banner.querySelector('[role="navigation"]') as HTMLElement;
    const capsule = bar.querySelector('[data-bar-capsule]') as HTMLElement;
    const c = capsule.getBoundingClientRect();
    const style = getComputedStyle(capsule);
    const buttons = Array.from(capsule.querySelectorAll('button'));
    return {
      shellLeft: shell.getBoundingClientRect().left,
      shellRight: shell.getBoundingClientRect().right,
      bar: {
        top: bar.getBoundingClientRect().top,
        height: bar.getBoundingClientRect().height,
      },
      headingOffset: (() => {
        const heading = bar.firstElementChild?.getBoundingClientRect();
        const b = bar.getBoundingClientRect();
        return heading == null
          ? Infinity
          : heading.top + heading.height / 2 - (b.top + b.height / 2);
      })(),
      capsule: {
        left: c.left,
        right: c.right,
        top: c.top,
        width: c.width,
        height: c.height,
        radius: style.borderTopLeftRadius,
        background: style.backgroundColor,
        shadow: style.boxShadow,
      },
      centres: buttons.map(b => {
        const r = b.getBoundingClientRect();
        return r.left + r.width / 2 - c.left;
      }),
      names: buttons.map(
        b => b.getAttribute('aria-label') ?? b.textContent ?? '',
      ),
    };
  });
}

test('under a finger the bar keeps its boxes, its end items on one capsule of paint', async ({
  page,
}) => {
  await openBar(page);
  const g = await geometry(page);
  test
    .info()
    .annotations.push({type: 'geometry', description: JSON.stringify(g)});
  // No box grows for touch: the bar and its end group measure as with a
  // mouse (below).
  expect(g.bar.height).toBeCloseTo(BAR, 1);
  expect(g.capsule.height).toBeCloseTo(CONTROL, 1);
  expect(g.capsule.width).toBeCloseTo(TWO_CONTROLS, 1);
  expect(g.shellRight - g.capsule.right).toBeCloseTo(PAD, 1);
  // The capsule is paint: the theme's surface, opaque, fully rounded, and
  // reaching 4px past the controls through a spread of the same colour.
  const surface = await surfaceColor(page);
  expect(g.capsule.background).toBe(surface);
  expect(g.capsule.background).not.toBe('rgba(0, 0, 0, 0)');
  expect(g.capsule.radius).toBe('9999px');
  expect(g.capsule.shadow).toBe(`${surface} 0px 0px 0px ${REACH}px`);
});

test('two icon buttons keep their size and spacing in the capsule', async ({
  page,
}) => {
  await openBar(page);
  const g = await geometry(page);
  expect(g.names).toEqual(['Profile', 'Open navigation']);
  // Centres 16px and 52px from the group's start, as with a mouse.
  expect(g.centres[0]).toBeCloseTo(CONTROL / 2, 0);
  expect(g.centres[1]).toBeCloseTo(CONTROL + GAP + CONTROL / 2, 0);
});

test('an end group emptied of its content paints no capsule; the heading stays centred', async ({
  page,
}) => {
  await openBar(page);
  const paint = await page.evaluate(() => {
    const group = document.querySelector('[data-bar-capsule]') as HTMLElement;
    group.replaceChildren();
    const style = getComputedStyle(group);
    return {background: style.backgroundColor, shadow: style.boxShadow};
  });
  expect(paint).toEqual({background: 'rgba(0, 0, 0, 0)', shadow: 'none'});
  const g = await geometry(page);
  expect(Math.abs(g.headingOffset)).toBeLessThan(0.5);
});

test('a finger on the toggle in the capsule opens the drawer', async ({
  page,
}) => {
  await openBar(page);
  const toggle = page.getByRole('button', {name: 'Open navigation'});
  const box = await toggle.boundingBox();
  if (box == null) {
    throw new Error('the toggle has no box');
  }
  const finger = await touchDriver(page);
  await finger.tap({x: box.x + box.width / 2, y: box.y + box.height / 2});
  await expect(toggle).toHaveAttribute('aria-expanded', 'true');
});

test('still: the bar at rest', {tag: '@storyboard'}, async ({page}) => {
  await openBar(page);
  const bar = page.getByRole('banner');
  await test.info().attach('bar-capsule-at-rest', {
    body: await bar.screenshot(),
    contentType: 'image/png',
  });
  await expect(bar).toBeVisible();
});

test('right to left, the capsule sits at the inline end', async ({page}) => {
  await openBar(page, {dir: 'rtl'});
  const g = await geometry(page);
  test.info().annotations.push({type: 'rtl', description: JSON.stringify(g)});
  expect(g.capsule.left - g.shellLeft).toBeCloseTo(PAD, 1);
  expect(g.capsule.height).toBeCloseTo(CONTROL, 1);
  // The order follows the inline direction: Profile first, at the right.
  expect(g.names).toEqual(['Profile', 'Open navigation']);
  expect(g.centres[0]).toBeGreaterThan(g.centres[1]);
});

test('Reduce Transparency changes nothing: the capsule is opaque', async ({
  page,
  browserName,
}) => {
  test.skip(
    browserName !== 'chromium',
    'prefers-reduced-transparency is emulated through the Chromium protocol',
  );
  const session = await page.context().newCDPSession(page);
  await session.send('Emulation.setEmulatedMedia', {
    features: [{name: 'prefers-reduced-transparency', value: 'reduce'}],
  });
  await openBar(page);
  expect(
    await page.evaluate(
      () => matchMedia('(prefers-reduced-transparency: reduce)').matches,
    ),
  ).toBe(true);
  const g = await geometry(page);
  expect(g.capsule.background).toBe(await surfaceColor(page));
});

test.describe('with a mouse', () => {
  test.use({hasTouch: false, isMobile: false});

  test('the bar keeps today’s layout: no capsule, the same boxes', async ({
    page,
  }) => {
    await openBar(page);
    expect(
      await page.evaluate(() => matchMedia('(pointer: coarse)').matches),
    ).toBe(false);
    const g = await geometry(page);
    test
      .info()
      .annotations.push({type: 'mouse', description: JSON.stringify(g)});
    expect(g.capsule.background).toBe('rgba(0, 0, 0, 0)');
    expect(g.capsule.radius).toBe('0px');
    expect(g.capsule.shadow).toBe('none');
    expect(g.bar.height).toBeCloseTo(BAR, 1);
    expect(g.capsule.height).toBeCloseTo(CONTROL, 1);
    expect(g.capsule.width).toBeCloseTo(TWO_CONTROLS, 1);
  });
});
