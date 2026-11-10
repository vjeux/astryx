// Copyright (c) Meta Platforms, Inc. and affiliates.

/**
 * @file SelectionMarkFinePress.interaction.browser.spec.ts
 * @input The CheckboxInput and RadioList stories, and a mouse where the
 *   primary pointer is fine
 * @output Browser proofs: a mouse press on a checkbox or a radio option
 *   paints once, at `pointerdown`, through the press controller. It fades on
 *   release. A right click paints nothing
 * @position Fine-pointer half of the selection marks' press; the finger half
 *   is in CheckboxListPress.a11y.chromium.spec.ts and the indicator specs
 */

import {
  expect,
  test,
  type Browser,
  type Page,
} from '@astryxdesign/a11y-spec/playwright';
import {openStory, withStorybook} from '@astryxdesign/interaction-harness';

const storybook = withStorybook(test);

interface Mark {
  readonly story: string;
  /** The control the mouse presses. */
  readonly target: string;
  /**
   * Which element's `::after` paints the press: the control's wrapper, or the
   * circle a CheckboxInput maps in.
   */
  readonly layer: 'wrapper' | 'circle';
}

const MARKS: Readonly<Record<string, Mark>> = {
  checkbox: {
    story: 'core-checkboxinput--default',
    target: 'input[type="checkbox"]:not(:disabled)',
    layer: 'wrapper',
  },
  'radio option': {
    story: 'core-radiolist--default',
    target: 'input[type="radio"]:not(:disabled)',
    layer: 'wrapper',
  },
};

/** No paint: a computed transparent background colour. */
const TRANSPARENT = 'rgba(0, 0, 0, 0)';

interface PressRead {
  /** The press controller's attribute on the pressed surface. */
  readonly attribute: string | null;
  /** The press layer's background image and colour. */
  readonly image: string;
  readonly color: string;
}

/** The press as the page shows it on the mark's first enabled control. */
async function readPress(page: Page, mark: Mark): Promise<PressRead> {
  return page.evaluate(({target, layer}) => {
    const input = document.querySelector<HTMLElement>(target);
    if (input == null) {
      throw new Error(`no control matches ${target}`);
    }
    const surface = input.closest('[data-astryx-pressable]');
    const paint =
      layer === 'wrapper'
        ? input.parentElement
        : (surface?.querySelector('.astryx-circle-check-indicator') ?? null);
    if (paint == null) {
      throw new Error(`no ${layer} layer`);
    }
    const style = getComputedStyle(paint, '::after');
    return {
      attribute: surface?.getAttribute('data-astryx-press') ?? null,
      image: style.backgroundImage,
      color: style.backgroundColor,
    };
  }, mark);
}

/** The story in a context with no touch screen: the primary pointer is fine. */
async function openFinePointerStory(browser: Browser, story: string) {
  const context = await browser.newContext({
    viewport: {width: 800, height: 600},
    deviceScaleFactor: 1,
    isMobile: false,
    hasTouch: false,
  });
  const page = await context.newPage();
  await openStory(page, storybook(), story);
  expect(
    await page.evaluate(() => matchMedia('(pointer: coarse)').matches),
  ).toBe(false);
  return {page, close: async () => context.close()};
}

/** The centre of the mark's first enabled control. */
async function centreOf(page: Page, mark: Mark) {
  const box = await page.locator(mark.target).first().boundingBox();
  if (box == null) {
    throw new Error(`no box for ${mark.target}`);
  }
  return {x: box.x + box.width / 2, y: box.y + box.height / 2};
}

for (const [name, mark] of Object.entries(MARKS)) {
  test(`a mouse press on a ${name} paints once at pointerdown and fades on release`, async ({
    browser,
  }) => {
    const story = await openFinePointerStory(browser, mark.story);
    try {
      const {page} = story;
      const at = await centreOf(page, mark);
      await page.mouse.move(at.x, at.y);
      await page.mouse.down();
      const held = await readPress(page, mark);
      expect(
        held.attribute,
        'the press controller paints the press at pointerdown',
      ).toBe('on');
      expect(held.image).toContain('gradient');
      expect(held.color, 'the :active fill yields to that paint').toBe(
        TRANSPARENT,
      );
      await page.mouse.up();
      expect((await readPress(page, mark)).attribute).toBe('fading');
      await expect
        .poll(async () => (await readPress(page, mark)).attribute)
        .toBeNull();
    } finally {
      await story.close();
    }
  });
}

test('a right click on a checkbox paints no press', async ({browser}) => {
  const mark = MARKS.checkbox;
  const story = await openFinePointerStory(browser, mark.story);
  try {
    const {page} = story;
    const at = await centreOf(page, mark);
    await page.mouse.move(at.x, at.y);
    await page.mouse.down({button: 'right'});
    const held = await readPress(page, mark);
    expect(held.attribute).toBeNull();
    expect(held.image).toBe('none');
    await page.mouse.up({button: 'right'});
  } finally {
    await story.close();
  }
});
