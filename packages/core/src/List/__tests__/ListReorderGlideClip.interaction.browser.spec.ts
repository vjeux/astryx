// Copyright (c) Meta Platforms, Inc. and affiliates.

/**
 * @file ListReorderGlideClip.interaction.browser.spec.ts
 * @input The built List and TransferList reorder stories, real touch, mouse
 *   and key input through the interaction harness, and holds on the reorder's
 *   glides (armHold)
 * @output Proofs that under a coarse pointer a reorderable List stops clipping
 *   in the inline axis while its rows glide to rest. That holds after a drop
 *   on a page the document scrolls, in a Card and in a TransferList's
 *   scrolling panel. It holds after a reorder mode move too. The list clips
 *   again once they rest, and as soon as a finger lands on it, so a swiped
 *   row keeps the clip. A mouse's drop keeps the clip. ListReorder.test.tsx
 *   covers a cancelled drag's way home
 * @position Interaction evidence for privateAttributes/reorderGlide.stylex.ts
 *   and the reorder's glides in List/listReorderEngine.tsx
 */

import {
  expect,
  test,
  type Locator,
  type Page,
} from '@astryxdesign/a11y-spec/playwright';
import {
  armHold,
  openStory,
  releaseAnimations,
  touchDriver,
  waitForRest,
  withStorybook,
} from '@astryxdesign/interaction-harness';
import {reorder} from '../../motion/uikit/reorder';

const storybook = withStorybook(test);

/** Past the claim delay: the hold claims the drag. */
const HOLD_MS = reorder.claim.delayMs + 150;

const isTouch = async (page: Page) =>
  page.evaluate(() => matchMedia('(pointer: coarse)').matches);

/** The story's reorderable list: the one whose rows have reorder handles. */
function listOf(page: Page): Locator {
  return page
    .locator('#storybook-root [role="list"]', {
      has: page.getByRole('button', {name: /^Reorder /}),
    })
    .first();
}

/** The row whose handle reorders `label`. */
function rowOf(page: Page, label: string): Locator {
  return page.locator('#storybook-root li', {
    has: page.getByRole('button', {name: `Reorder ${label}`}),
  });
}

/** The list's computed inline overflow (StyleX writes the physical axis). */
async function inlineOverflow(page: Page): Promise<string> {
  return listOf(page).evaluate(list => getComputedStyle(list).overflowX);
}

/** The centre of `label`'s handle and the height of its row. */
async function handleOf(page: Page, label: string) {
  const handle = page.getByRole('button', {name: `Reorder ${label}`});
  await expect(handle).toBeVisible();
  const box = await handle.boundingBox();
  const rowHeight = await rowOf(page, label).evaluate(
    row => row.getBoundingClientRect().height,
  );
  if (box == null) {
    throw new Error(`no handle for ${label}`);
  }
  return {
    at: {x: box.x + box.width / 2, y: box.y + box.height / 2},
    rowHeight,
  };
}

/**
 * Drags `label`'s row `rows` places down under a finger and drops it. A hold
 * armed on the glide holds it as it starts. The hold judges `passed`, a row
 * the drag passes, which glides to its new place. Resolves once the glide is
 * held.
 */
async function dropHeld(
  page: Page,
  label: string,
  rows: number,
  passed: string,
): Promise<void> {
  const {at, rowHeight} = await handleOf(page, label);
  const driver = await touchDriver(page);
  const finger = await driver.press(at);
  await page.waitForTimeout(HOLD_MS);
  for (let step = 1; step <= 10; step++) {
    await finger.move({x: at.x, y: at.y + (rowHeight * rows * step) / 10});
  }
  // The rows stay still while the finger holds the drag, so the hold takes
  // the drop's glide.
  const hold = await armHold(page, listOf(page), {
    judges: {target: rowOf(page, passed), property: 'translate'},
  });
  await finger.lift();
  await hold.held();
}

/**
 * Lets the held glides finish, waits for every row to rest, and expects the
 * clip back. The mark goes when each glide's motion settles, a task after
 * its curve ends.
 */
async function finishGlides(page: Page): Promise<void> {
  await releaseAnimations(page, {finish: true});
  for (const row of await page.locator('#storybook-root li').all()) {
    await waitForRest(row);
  }
  await expect
    .poll(async () => inlineOverflow(page), {
      message: 'the clip once the rows rest',
      timeout: 1_000,
    })
    .toBe('clip');
}

test.describe('under a finger', () => {
  for (const {story, where} of [
    {story: 'core-list--reorderable', where: 'on a page the document scrolls'},
    {story: 'core-list--reorder-in-a-card', where: 'in a Card'},
  ]) {
    test(`${where}, a drop's glide lifts the list's inline clip until its rows rest`, async ({
      page,
    }) => {
      await openStory(page, storybook(), story);
      test.skip(
        !(await isTouch(page)),
        'this engine reports a fine primary pointer; the lift applies under (pointer: coarse)',
      );
      expect(await inlineOverflow(page), 'the clip at rest').toBe('clip');
      await dropHeld(page, 'Inbox', 2, 'Sent');
      expect(
        await inlineOverflow(page),
        "the list's inline overflow while its rows glide",
      ).toBe('visible');
      await finishGlides(page);
    });
  }

  test("in a TransferList's scrolling panel, a drop's glide lifts the list's inline clip", async ({
    browser,
  }) => {
    // A wide layout, where the panel's body scrolls the list.
    const context = await browser.newContext({
      viewport: {width: 1024, height: 768},
      hasTouch: true,
      isMobile: true,
    });
    const page = await context.newPage();
    await openStory(page, storybook(), 'lab-transferlist--default');
    test.skip(
      !(await isTouch(page)),
      'this engine reports a fine primary pointer; the lift applies under (pointer: coarse)',
    );
    const scroller = await listOf(page).evaluate(list => {
      let node = list.parentElement;
      while (node != null && getComputedStyle(node).overflowY !== 'auto') {
        node = node.parentElement;
      }
      return node != null;
    });
    expect(scroller, 'a scrolling panel around the list').toBe(true);
    await dropHeld(page, 'Name', 1, 'Owner');
    expect(
      await inlineOverflow(page),
      "the list's inline overflow while its rows glide",
    ).toBe('visible');
    await finishGlides(page);
    await context.close();
  });

  test("a reorder mode move's slide lifts the clip until the rows rest", async ({
    page,
  }) => {
    await openStory(page, storybook(), 'core-list--reorderable');
    test.skip(
      !(await isTouch(page)),
      'this engine reports a fine primary pointer; the lift applies under (pointer: coarse)',
    );
    const handle = page.getByRole('button', {name: 'Reorder Inbox'});
    await handle.focus();
    await page.keyboard.press('Enter');
    await expect(handle).toHaveAttribute('aria-pressed', 'true');
    const hold = await armHold(page, listOf(page), {
      judges: {target: rowOf(page, 'Sent'), property: 'translate'},
    });
    await page.keyboard.press('ArrowDown');
    await hold.held();
    expect(
      await inlineOverflow(page),
      "the list's inline overflow while its rows slide",
    ).toBe('visible');
    await finishGlides(page);
  });

  test('a drag that starts while rows glide has the clip back at once', async ({
    page,
  }) => {
    await openStory(page, storybook(), 'core-list--reorderable');
    test.skip(
      !(await isTouch(page)),
      'this engine reports a fine primary pointer; the lift applies under (pointer: coarse)',
    );
    await dropHeld(page, 'Inbox', 2, 'Sent');
    expect(await inlineOverflow(page), 'while the drop glides').toBe('visible');
    // A new drag while the rows still glide: the clip is back for the drag.
    const {at, rowHeight} = await handleOf(page, 'Spam');
    const driver = await touchDriver(page);
    const finger = await driver.press(at);
    await page.waitForTimeout(HOLD_MS);
    await finger.move({x: at.x, y: at.y - rowHeight / 4});
    await expect(
      page.locator('#storybook-root li[data-astryx-reorder-source]'),
      'the drag picked Spam up',
    ).toContainText('Spam');
    expect(
      await inlineOverflow(page),
      'during a drag that started while rows glided',
    ).toBe('clip');
    // Dropped where it was: nothing moves.
    await finger.lift();
    await finishGlides(page);
  });

  test('a swipe while rows glide has the clip back from its touch, and the swiped row keeps it', async ({
    page,
  }) => {
    await openStory(page, storybook(), 'core-list--reorder-in-a-card');
    test.skip(
      !(await isTouch(page)),
      'this engine reports a fine primary pointer; the lift applies under (pointer: coarse)',
    );
    await dropHeld(page, 'Inbox', 2, 'Sent');
    expect(await inlineOverflow(page), 'while the drop glides').toBe('visible');
    // A swipe on a row while the rows glide opens it. Its touch brought the
    // clip back first, so no frame of the swipe paints past the edge.
    const row = rowOf(page, 'Spam');
    const box = await row.boundingBox();
    if (box == null) {
      throw new Error('no Spam row');
    }
    const start = {x: box.x + box.width * 0.6, y: box.y + box.height / 2};
    const driver = await touchDriver(page);
    const finger = await driver.press(start);
    expect(
      await inlineOverflow(page),
      'once a finger lands on a row while the rows glide',
    ).toBe('clip');
    for (let step = 1; step <= 10; step++) {
      await finger.move({
        x: start.x - (box.width * 0.5 * step) / 10,
        y: start.y,
      });
    }
    await finger.lift();
    const swiped = async () =>
      row.evaluate(
        element =>
          element.matches('[style*="--_item-swipe-travel"]') ||
          element.querySelector('[style*="--_item-swipe-travel"]') != null,
      );
    expect(await swiped(), 'the swiped row rests open').toBe(true);
    expect(
      await inlineOverflow(page),
      'while the swiped row rests open and the rows still glide',
    ).toBe('clip');
    await finishGlides(page);
  });
});

test.describe('under a mouse', () => {
  // A desktop browser: the primary pointer is fine.
  test.use({hasTouch: false, isMobile: false});

  test("a drop keeps the list's inline clip throughout", async ({page}) => {
    await openStory(page, storybook(), 'core-list--reorderable');
    // Every change of the list's inline overflow from here on.
    await listOf(page).evaluate(list => {
      const w = window as unknown as {__overflows: string[]};
      w.__overflows = [];
      const observer = new MutationObserver(() => {
        w.__overflows.push(getComputedStyle(list).overflowX);
      });
      observer.observe(list, {attributes: true});
    });
    const {at, rowHeight} = await handleOf(page, 'Inbox');
    await page.mouse.move(at.x, at.y);
    await page.mouse.down();
    await page.mouse.move(at.x, at.y + rowHeight * 2.5, {steps: 12});
    await page.mouse.up();
    await expect
      .poll(
        async () =>
          rowOf(page, 'Inbox').evaluate(
            row => row.previousElementSibling?.textContent ?? '',
          ),
        {
          message: 'the drop moves Inbox below Drafts',
        },
      )
      .toContain('Drafts');
    expect(await inlineOverflow(page), 'after the drop').toBe('clip');
    expect(
      await page.evaluate(
        () => (window as unknown as {__overflows: string[]}).__overflows,
      ),
      "the list's inline overflow at each change of its attributes",
    ).not.toContain('visible');
  });
});
