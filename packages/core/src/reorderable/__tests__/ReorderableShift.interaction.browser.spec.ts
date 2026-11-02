// Copyright (c) Meta Platforms, Inc. and affiliates.

/**
 * @file ReorderableShift.interaction.browser.spec.ts
 * @input The Core/createReorderable stories' built Storybook (the row, wrap
 *   and column demos' Line | Shift toggle), real mouse and touch input (the
 *   interaction harness's drivers), and Reduce Motion emulated
 * @output Browser proofs of createReorderable's `feedback` (spec:AST-103
 *   FR9): Line, the default, keeps the other items still and draws the
 *   insertion line; Shift slides the items a drag passes aside to open the
 *   gap, with no preview and no line, moves the gap only once the dragged
 *   item's centre passes a slot's centre, settles the drop into the gap with
 *   no jump, slides reorder mode's arrow moves, and puts everything back on
 *   a cancel, with no Layout or Paint per move; under Reduce Motion nothing
 *   travels: with a finger the gap cross-fades in place, and with a mouse
 *   the drag and reorder mode show the insertion line
 * @position Interaction proofs for reorderable/createReorderable.ts's
 *   `feedback` and List/listReorderEngine.tsx's shift
 */

import {expect, test, type Locator, type Page} from '@playwright/test';
import {
  countBetween,
  drag,
  openStory,
  touchDriver,
  traceRendering,
  withStorybook,
  type Point,
} from '@astryxdesign/interaction-harness';
import {expectPainted} from '../../List/__tests__/painted';
import {reorder} from '../../motion/uikit/reorder';

const storybook = withStorybook(test);

const STORY = 'core-createreorderable--attached-cards-in-a-row';
const WRAP_STORY = 'core-createreorderable--attached-cards-wrapping';
const ROWS_STORY = 'core-createreorderable--attached-rows-in-a-column';

/** The cards' slot centres, where the story's CSS row places them. */
const SLOTS = [0, 1, 2, 3, 4].map(index => ({x: 44 + index * 88, y: 56}));
const HOLD_MS = reorder.claim.delayMs + 80;
/** Long enough for a slide on the shared settle motion to come to rest. */
const SETTLE_MS = 700;

const table = (page: Page) => page.locator('#storybook-root [data-moves]');
/** The cards, without the line's preview (a copy of the dragged card). */
const cards = (page: Page) =>
  table(page).locator('[data-card]:not([data-astryx-reorder-preview])');
const card = (page: Page, name: string) =>
  table(page).locator(
    `[data-card="${name}"]:not([data-astryx-reorder-preview])`,
  );

const order = async (page: Page) =>
  cards(page).evaluateAll(elements =>
    elements.map(element => (element as HTMLElement).dataset.card ?? ''),
  );

/** How many moves the story's onReorder has reported. */
const moves = async (page: Page) =>
  Number(await table(page).getAttribute('data-moves'));

/** Picks the demo's drag feedback on its Line | Shift toggle. */
async function pick(page: Page, label: 'Line' | 'Shift') {
  const segment = page.getByRole('radio', {name: label, exact: true});
  await segment.click();
  await expect(segment).toBeChecked();
}

/** The centre of `element` in the viewport. */
async function centerOf(element: Locator): Promise<Point> {
  const box = await element.boundingBox();
  if (box == null) {
    throw new Error('no box');
  }
  return {x: box.x + box.width / 2, y: box.y + box.height / 2};
}

const gripOf = async (page: Page, name: string) =>
  centerOf(card(page, name).locator('[data-grip]'));

/** An element's offset from its layout place, as shown now. */
const offsetOf = async (element: Locator) =>
  element.evaluate(el => {
    const [x = '0', y = '0'] = getComputedStyle(el).translate.split(' ');
    return {x: parseFloat(x) || 0, y: parseFloat(y) || 0};
  });

/** `name`'s centre in the table's padding box, as shown now. */
async function slotOf(page: Page, name: string) {
  return table(page).evaluate((element, label) => {
    const box = element.getBoundingClientRect();
    const item = element
      .querySelector(
        `[data-card="${label}"]:not([data-astryx-reorder-preview])`,
      )
      ?.getBoundingClientRect();
    return item == null
      ? null
      : {
          x: item.left + item.width / 2 - box.left - element.clientLeft,
          y: item.top + item.height / 2 - box.top - element.clientTop,
        };
  }, name);
}

/** The insertion line attach draws in its container, while it shows. */
const lineShown = async (page: Page) =>
  table(page).evaluate(container => {
    const line = container.querySelector<HTMLElement>(
      '[data-astryx-reorder-line-element]',
    );
    if (line == null || getComputedStyle(line).display === 'none') {
      return false;
    }
    const box = line.getBoundingClientRect();
    return box.width > 0 || box.height > 0;
  });

const previews = (page: Page) =>
  page.locator('#storybook-root [data-astryx-reorder-preview]');

const waitForRest = async (page: Page) =>
  expect
    .poll(async () =>
      page.evaluate(
        () =>
          document.getAnimations().filter(a => a.playState === 'running')
            .length,
      ),
    )
    .toBe(0);

/**
 * Starts recording, every frame for `ms`, each named card's offset and
 * opacity, and its centre in the table; `samples` reads them.
 *
 * These are real-time frame proofs: they need the page to paint its frames.
 * WebKit in the Playwright container under `podman --cpus=3` with 16 workers
 * painted 5 frames in 600 ms (one per ~120 ms, Oct 31 2026), too few for
 * them, and a recorder's start lagged the moves it watched; that profile
 * fails them now and then. Under the CI lane's own profile (`--cpus=4`, one
 * worker) every frame paints, and they pass ten runs in ten.
 */
async function record(page: Page, names: ReadonlyArray<string>, ms: number) {
  await table(page).evaluate(
    (element, {labels, duration}) => {
      const samples: Record<
        string,
        {x: number; y: number; cx: number; opacity: number}[]
      > = {};
      (window as unknown as {shiftSamples: typeof samples}).shiftSamples =
        samples;
      const start = performance.now();
      const tick = () => {
        const box = element.getBoundingClientRect();
        for (const label of labels) {
          const item = element.querySelector<HTMLElement>(
            `[data-card="${label}"]:not([data-astryx-reorder-preview])`,
          );
          if (item == null) {
            continue;
          }
          const style = getComputedStyle(item);
          const [x = '0', y = '0'] = style.translate.split(' ');
          const rect = item.getBoundingClientRect();
          (samples[label] ??= []).push({
            x: parseFloat(x) || 0,
            y: parseFloat(y) || 0,
            cx: rect.left + rect.width / 2 - box.left,
            opacity: Number(style.opacity),
          });
        }
        if (performance.now() - start < duration) {
          requestAnimationFrame(tick);
        }
      };
      requestAnimationFrame(tick);
    },
    {labels: names, duration: ms},
  );
}

const samples = async (page: Page) =>
  page.evaluate(
    () =>
      (
        window as unknown as {
          shiftSamples: Record<
            string,
            {x: number; y: number; cx: number; opacity: number}[]
          >;
        }
      ).shiftSamples,
  );

test.describe('with a mouse', () => {
  test.use({
    hasTouch: false,
    isMobile: false,
    viewport: {width: 900, height: 700},
  });

  test('the demo opens on Line: a drag keeps the other cards still and draws the insertion line, the default (spec:AST-103 FR9)', async ({
    page,
  }) => {
    await openStory(page, storybook(), STORY);
    await expect(
      page.getByRole('radio', {name: 'Line', exact: true}),
    ).toBeChecked();
    const from = await gripOf(page, 'A');
    await page.mouse.move(from.x, from.y);
    await page.mouse.down();
    // Past K's centre: under Shift this would open the gap.
    await page.mouse.move(from.x + 100, from.y, {steps: 12});
    await page.waitForTimeout(SETTLE_MS);
    await expectPainted(cards(page), 5);
    for (const name of ['K', 'Q', 'J', '10']) {
      expect(await offsetOf(card(page, name)), name).toEqual({x: 0, y: 0});
    }
    expect(await lineShown(page)).toBe(true);
    await expect(previews(page)).toHaveCount(1);
    expect(
      Number(
        await card(page, 'A').evaluate(el => getComputedStyle(el).opacity),
      ),
    ).toBeLessThan(1);
    await page.mouse.up();
    await expect
      .poll(async () => order(page))
      .toEqual(['K', 'A', 'Q', 'J', '10']);
  });

  test('under Shift a drag slides the cards it passes aside to open the gap, with no preview and no line (spec:AST-103 FR9)', async ({
    page,
  }) => {
    await openStory(page, storybook(), STORY);
    await pick(page, 'Shift');
    const before = await moves(page);
    const from = await gripOf(page, 'A');
    await page.mouse.move(from.x, from.y);
    await page.mouse.down();
    await page.mouse.move(from.x + 100, from.y, {steps: 12});
    await page.waitForTimeout(SETTLE_MS);
    await expectPainted(cards(page), 5);
    // K slid into A's slot; the cards beyond the gap stayed.
    const shifted = await offsetOf(card(page, 'K'));
    expect(shifted.x).toBeCloseTo(-88, 0);
    expect(shifted.y).toBeCloseTo(0, 0);
    for (const name of ['Q', 'J', '10']) {
      expect(await offsetOf(card(page, name)), name).toEqual({x: 0, y: 0});
    }
    // A itself rides the pointer, undimmed: no copy follows it, no line.
    expect((await offsetOf(card(page, 'A'))).x).toBeCloseTo(100, 0);
    expect(
      Number(
        await card(page, 'A').evaluate(el => getComputedStyle(el).opacity),
      ),
    ).toBe(1);
    await expect(previews(page)).toHaveCount(0);
    expect(await lineShown(page)).toBe(false);
    await page.mouse.up();
    await expect
      .poll(async () => order(page))
      .toEqual(['K', 'A', 'Q', 'J', '10']);
    expect(await moves(page)).toBe(before + 1);
    await waitForRest(page);
    const landed = await slotOf(page, 'A');
    expect(Math.abs((landed?.x ?? Number.NaN) - SLOTS[1].x)).toBeLessThan(0.5);
    for (const name of ['A', 'K']) {
      expect(await offsetOf(card(page, name)), name).toEqual({x: 0, y: 0});
    }
  });

  test('under Shift the gap moves only once the card passes a slot centre: a pointer resting near a boundary moves nothing (spec:AST-103 FR9)', async ({
    page,
  }) => {
    await openStory(page, storybook(), STORY);
    await pick(page, 'Shift');
    const from = await gripOf(page, 'A');
    const kAt = async () => (await offsetOf(card(page, 'K'))).x;
    await page.mouse.move(from.x, from.y);
    await page.mouse.down();
    // A's centre 8 px short of K's: nothing moves.
    await page.mouse.move(from.x + 80, from.y, {steps: 10});
    await page.waitForTimeout(SETTLE_MS);
    await expectPainted(cards(page), 5);
    expect(await kAt()).toBeCloseTo(0, 0);
    // 4 px past K's centre: K slides into A's slot.
    await page.mouse.move(from.x + 92, from.y, {steps: 4});
    await page.waitForTimeout(SETTLE_MS);
    expect(await kAt()).toBeCloseTo(-88, 0);
    // Back 32 px, well inside the boundary the line would use: K stays.
    await page.mouse.move(from.x + 60, from.y, {steps: 6});
    await page.waitForTimeout(SETTLE_MS);
    expect(await kAt()).toBeCloseTo(-88, 0);
    // Back past A's own slot centre: K returns.
    await page.mouse.move(from.x - 4, from.y, {steps: 8});
    await page.waitForTimeout(SETTLE_MS);
    expect(await kAt()).toBeCloseTo(0, 0);
    await page.mouse.up();
    await expect
      .poll(async () => order(page))
      .toEqual(['A', 'K', 'Q', 'J', '10']);
  });

  test('under Shift the drop settles the card into the open gap with no jump, and the cards it passed stay where they are shown (spec:AST-103 FR9)', async ({
    page,
  }) => {
    await openStory(page, storybook(), STORY);
    await pick(page, 'Shift');
    const from = await gripOf(page, 'A');
    await page.mouse.move(from.x, from.y);
    await page.mouse.down();
    // Past K's and Q's centres: the gap is Q's slot.
    await page.mouse.move(from.x + 190, from.y + 6, {steps: 16});
    await page.waitForTimeout(SETTLE_MS);
    await expectPainted(cards(page), 5);
    await record(page, ['A', 'K', 'Q'], 900);
    await page.mouse.up();
    await expect
      .poll(async () => order(page))
      .toEqual(['K', 'Q', 'A', 'J', '10']);
    await waitForRest(page);
    const recorded = await samples(page);
    for (const name of ['A', 'K', 'Q']) {
      const track = recorded[name] ?? [];
      expect(track.length, name).toBeGreaterThan(10);
      // No frame jumps: a layout jump would move a card a whole slot (88 px)
      // in one frame.
      const largest = Math.max(
        ...track
          .slice(1)
          .map((sample, index) => Math.abs(sample.cx - track[index].cx)),
      );
      expect(
        largest,
        `${name}: ${JSON.stringify(track.map(s => s.cx))}`,
      ).toBeLessThan(30);
    }
    // K and Q were in their new slots already: they never move.
    for (const name of ['K', 'Q']) {
      const track = recorded[name] ?? [];
      const centres = track.map(sample => sample.cx);
      expect(Math.max(...centres) - Math.min(...centres), name).toBeLessThan(1);
    }
    const landed = await slotOf(page, 'A');
    expect(Math.abs((landed?.x ?? Number.NaN) - SLOTS[2].x)).toBeLessThan(0.5);
    expect(Math.abs((landed?.y ?? Number.NaN) - SLOTS[2].y)).toBeLessThan(0.5);
  });

  test("under Shift reorder mode's arrow slides the cards into their new places, with no line (spec:AST-103 FR4, FR9)", async ({
    page,
  }) => {
    await openStory(page, storybook(), STORY);
    await pick(page, 'Shift');
    const grip = card(page, 'A').locator('[data-grip]');
    await grip.focus();
    await page.keyboard.press('Enter');
    await expect(grip).toHaveAttribute('aria-pressed', 'true');
    await expectPainted(cards(page), 5);
    expect(await lineShown(page)).toBe(false);
    await record(page, ['A', 'K'], 900);
    await page.keyboard.press('ArrowRight');
    await expect
      .poll(async () => order(page))
      .toEqual(['K', 'A', 'Q', 'J', '10']);
    await waitForRest(page);
    expect(await lineShown(page)).toBe(false);
    const recorded = await samples(page);
    // K slid from its old slot to its new one through the places between.
    const kCentres = (recorded.K ?? []).map(sample => sample.cx);
    expect(
      kCentres.some(x => x > SLOTS[0].x + 10 && x < SLOTS[1].x - 10),
      JSON.stringify(kCentres),
    ).toBe(true);
    expect(kCentres[kCentres.length - 1]).toBeCloseTo(SLOTS[0].x, 0);
  });

  test('under Shift with Reduce Motion and a mouse the drag shows the insertion line: no card travels or jumps (spec:AST-103 FR9)', async ({
    page,
  }) => {
    await page.emulateMedia({reducedMotion: 'reduce'});
    await openStory(page, storybook(), STORY);
    await pick(page, 'Shift');
    const from = await gripOf(page, 'A');
    await page.mouse.move(from.x, from.y);
    await page.mouse.down();
    await page.mouse.move(from.x + 80, from.y, {steps: 8});
    await expectPainted(cards(page), 5);
    await record(page, ['K'], 500);
    await page.mouse.move(from.x + 100, from.y, {steps: 2});
    await page.waitForTimeout(600);
    const track = (await samples(page)).K ?? [];
    expect(track.length).toBeGreaterThan(10);
    // K stays in its place, shown in full: the line marks the gap instead.
    for (const sample of track) {
      expect(sample.x, JSON.stringify(track)).toBe(0);
      expect(sample.opacity, JSON.stringify(track)).toBe(1);
    }
    expect(await lineShown(page)).toBe(true);
    await expect(previews(page)).toHaveCount(1);
    await page.mouse.up();
    await expect
      .poll(async () => order(page))
      .toEqual(['K', 'A', 'Q', 'J', '10']);
  });

  test("under Shift with Reduce Motion and a mouse, reorder mode's arrow moves the card at once and the line marks its place (spec:AST-103 FR4, FR9)", async ({
    page,
  }) => {
    await page.emulateMedia({reducedMotion: 'reduce'});
    await openStory(page, storybook(), STORY);
    await pick(page, 'Shift');
    const grip = card(page, 'A').locator('[data-grip]');
    await grip.focus();
    await page.keyboard.press('Enter');
    await expect(grip).toHaveAttribute('aria-pressed', 'true');
    await expectPainted(cards(page), 5);
    await record(page, ['K'], 600);
    await page.keyboard.press('ArrowRight');
    await expect
      .poll(async () => order(page))
      .toEqual(['K', 'A', 'Q', 'J', '10']);
    await expect.poll(async () => lineShown(page)).toBe(true);
    await page.waitForTimeout(600);
    // At once: K shows at its old slot, then at its new one, never between.
    const kCentres = ((await samples(page)).K ?? []).map(sample => sample.cx);
    expect(kCentres.length).toBeGreaterThan(10);
    for (const x of kCentres) {
      expect(
        Math.abs(x - SLOTS[1].x) < 0.5 || Math.abs(x - SLOTS[0].x) < 0.5,
        JSON.stringify(kCentres),
      ).toBe(true);
    }
    expect(kCentres[kCentres.length - 1]).toBeCloseTo(SLOTS[0].x, 0);
  });

  test('under Shift the rows of a column slide aside by the dragged row and the gap (spec:AST-103 FR9)', async ({
    page,
  }) => {
    await openStory(page, storybook(), ROWS_STORY);
    await pick(page, 'Shift');
    const rows = page.locator('#storybook-root [data-row]');
    const row = (name: string) =>
      page.locator(`#storybook-root [data-row="${name}"]`);
    const step = await page.evaluate(() => {
      const [first, second] = Array.from(
        document.querySelectorAll<HTMLElement>('#storybook-root [data-row]'),
      );
      return second.offsetTop - first.offsetTop;
    });
    const from = await centerOf(row('Inbox').locator('[data-grip]'));
    await page.mouse.move(from.x, from.y);
    await page.mouse.down();
    await page.mouse.move(from.x, from.y + step + 6, {steps: 10});
    await page.waitForTimeout(SETTLE_MS);
    await expectPainted(rows, 4);
    expect((await offsetOf(row('Sent'))).y).toBeCloseTo(-step, 0);
    for (const name of ['Drafts', 'Archive']) {
      expect((await offsetOf(row(name))).y, name).toBeCloseTo(0, 0);
    }
    expect(await previews(page).count()).toBe(0);
    await page.mouse.up();
    await expect
      .poll(async () =>
        rows.evaluateAll(elements =>
          elements.map(element => (element as HTMLElement).dataset.row),
        ),
      )
      .toEqual(['Sent', 'Inbox', 'Drafts', 'Archive']);
  });

  test('under Shift the cards of a wrapping grid move to their neighbours’ slots on both axes (spec:AST-103 FR9)', async ({
    page,
  }) => {
    await openStory(page, storybook(), WRAP_STORY);
    await pick(page, 'Shift');
    const from = await gripOf(page, 'A');
    const jSlot = await slotOf(page, 'J');
    const aSlot = await slotOf(page, 'A');
    const qSlot = await slotOf(page, 'Q');
    if (jSlot == null || aSlot == null || qSlot == null) {
      throw new Error('no slots');
    }
    await page.mouse.move(from.x, from.y);
    await page.mouse.down();
    // A's centre past J's slot centre, below A's own: the gap is J's slot.
    await page.mouse.move(
      from.x + (jSlot.x - aSlot.x) + 4,
      from.y + (jSlot.y - aSlot.y) + 6,
      {steps: 14},
    );
    await page.waitForTimeout(SETTLE_MS);
    await expectPainted(cards(page), 5);
    // K, Q and J each moved one slot back: J up to the first row's end.
    const j = await offsetOf(card(page, 'J'));
    expect(j.x).toBeCloseTo(qSlot.x - jSlot.x, 0);
    expect(j.y).toBeCloseTo(qSlot.y - jSlot.y, 0);
    expect((await offsetOf(card(page, '10'))).x).toBeCloseTo(0, 0);
    await page.mouse.up();
    await expect
      .poll(async () => order(page))
      .toEqual(['K', 'Q', 'J', 'A', '10']);
  });
});

test.describe('with a finger', () => {
  test('under Shift a finger holds a grip, then drags: the cards it passes slide aside, and the drop settles the card into the gap (spec:AST-103 FR9)', async ({
    page,
  }) => {
    await openStory(page, storybook(), STORY);
    test.skip(
      !(await page.evaluate(() => matchMedia('(pointer: coarse)').matches)),
      'the hold runs on a touch screen',
    );
    await pick(page, 'Shift');
    const before = await moves(page);
    const from = await gripOf(page, 'A');
    const driver = await touchDriver(page);
    let during: {
      k: {x: number; y: number};
      previews: number;
      line: boolean;
    } | null = null;
    await driver.play(
      drag(
        from,
        {x: from.x + 100, y: from.y},
        {holdMs: HOLD_MS, durationMs: 300, restMs: 50},
      ),
      {
        onEvent: async step => {
          if (step.type === 'touchMove' && step.t >= HOLD_MS + 299) {
            await page.waitForTimeout(SETTLE_MS);
            await expectPainted(cards(page), 5);
            during = {
              k: await offsetOf(card(page, 'K')),
              previews: await previews(page).count(),
              line: await lineShown(page),
            };
          }
        },
      },
    );
    expect(during).not.toBeNull();
    const seen = during as unknown as {
      k: {x: number; y: number};
      previews: number;
      line: boolean;
    };
    expect(seen.k.x).toBeCloseTo(-88, 0);
    expect(seen.previews).toBe(0);
    expect(seen.line).toBe(false);
    await expect
      .poll(async () => order(page))
      .toEqual(['K', 'A', 'Q', 'J', '10']);
    expect(await moves(page)).toBe(before + 1);
    await waitForRest(page);
    const landed = await slotOf(page, 'A');
    expect(Math.abs((landed?.x ?? Number.NaN) - SLOTS[1].x)).toBeLessThan(0.5);
  });

  test('under Shift a drag does no Layout or Paint per move: the dragged card and the slides move in the compositor (spec:AST-103 FR9)', async ({
    page,
    browserName,
  }) => {
    test.skip(browserName !== 'chromium', 'rendering traces are Chromium-only');
    await openStory(page, storybook(), STORY);
    test.skip(
      !(await page.evaluate(() => matchMedia('(pointer: coarse)').matches)),
      'the hold runs on a touch screen',
    );
    await pick(page, 'Shift');
    await expectPainted(cards(page), 5);
    const from = await gripOf(page, 'A');
    const driver = await touchDriver(page);
    let played: Awaited<ReturnType<typeof driver.play>> = [];
    const slid: {at?: number} = {};
    const trace = await traceRendering(page, async () => {
      // Past K's centre, then Q's: K's slide is running, and Q's starts.
      played = await driver.play(
        drag(
          from,
          {x: from.x + 190, y: from.y},
          {holdMs: HOLD_MS, durationMs: 600, restMs: 100},
        ),
        {
          onEvent: async step => {
            if (slid.at != null || step.type !== 'touchMove') {
              return;
            }
            if ((await offsetOf(card(page, 'K'))).x < -1) {
              slid.at = Date.now();
            }
          },
        },
      );
      await page.waitForTimeout(400);
    });
    expect(slid.at).toBeDefined();
    // From K's first slid frame to the last move: each move only moves A and
    // starts or retargets slides, in the compositor.
    const moves = played.filter(
      step =>
        step.type === 'touchMove' &&
        step.dispatchedAt > (slid.at ?? Number.POSITIVE_INFINITY),
    );
    expect(moves.length).toBeGreaterThan(10);
    const during = countBetween(
      trace,
      moves[0].dispatchedAt,
      moves[moves.length - 1].dispatchedAt,
    );
    expect(during.Layout ?? 0, JSON.stringify(during)).toBe(0);
    expect(during.Paint ?? 0, JSON.stringify(during)).toBe(0);
  });

  test('under Shift a cancelled drag puts every card back and reports nothing (spec:AST-103 FR9)', async ({
    page,
    browserName,
  }) => {
    test.skip(
      browserName !== 'chromium',
      'the cancel is a touchcancel through Chromium CDP',
    );
    await openStory(page, storybook(), STORY);
    test.skip(
      !(await page.evaluate(() => matchMedia('(pointer: coarse)').matches)),
      'the hold runs on a touch screen',
    );
    await pick(page, 'Shift');
    const before = await moves(page);
    const from = await gripOf(page, 'A');
    const driver = await touchDriver(page);
    let opened: number | null = null;
    await driver.play(
      drag(
        from,
        {x: from.x + 100, y: from.y},
        {holdMs: HOLD_MS, durationMs: 200, cancel: true},
      ),
      {
        onEvent: async step => {
          if (step.type === 'touchMove' && step.t >= HOLD_MS + 199) {
            // The gap was open when the browser took the touch.
            await page.waitForTimeout(SETTLE_MS);
            opened = (await offsetOf(card(page, 'K'))).x;
          }
        },
      },
    );
    expect(opened).not.toBeNull();
    expect(opened ?? 0).toBeCloseTo(-88, 0);
    await waitForRest(page);
    await expectPainted(cards(page), 5);
    expect(await order(page)).toEqual(['A', 'K', 'Q', 'J', '10']);
    expect(await moves(page)).toBe(before);
    for (const name of ['A', 'K', 'Q', 'J', '10']) {
      expect(await offsetOf(card(page, name)), name).toEqual({x: 0, y: 0});
    }
  });

  test('under Shift with Reduce Motion a finger sees the gap cross-fade in place: the passed card fades and never travels (spec:AST-103 FR9)', async ({
    page,
  }) => {
    await page.emulateMedia({reducedMotion: 'reduce'});
    await openStory(page, storybook(), STORY);
    test.skip(
      !(await page.evaluate(() => matchMedia('(pointer: coarse)').matches)),
      'the cross-fade is the coarse pointer’s',
    );
    await pick(page, 'Shift');
    const from = await gripOf(page, 'A');
    const driver = await touchDriver(page);
    const held: {x: number; y: number; cx: number; opacity: number}[] = [];
    let recording = false;
    await driver.play(
      drag(
        from,
        {x: from.x + 100, y: from.y},
        {holdMs: HOLD_MS, durationMs: 300, restMs: 50},
      ),
      {
        onEvent: async step => {
          if (step.type !== 'touchMove' || step.t < HOLD_MS) {
            return;
          }
          // Watch K from the drag's first move, before A's centre passes
          // K's: a recorder started at the last move can miss a cross-fade
          // that ran while the moves were still being dispatched.
          if (!recording) {
            recording = true;
            await expectPainted(cards(page), 5);
            await record(page, ['K'], 3000);
          }
          if (step.t >= HOLD_MS + 299) {
            // While the finger still holds: the drop comes after this.
            await page.waitForTimeout(600);
            held.push(...((await samples(page)).K ?? []));
          }
        },
      },
    );
    await expect
      .poll(async () => order(page))
      .toEqual(['K', 'A', 'Q', 'J', '10']);
    const track = held;
    expect(track.length).toBeGreaterThan(10);
    // While the finger holds, K is shown at its own slot or at A's, never
    // between, and lands there while faded out.
    for (const sample of track.filter(each => each.opacity > 0.05)) {
      expect(
        Math.abs(sample.cx - SLOTS[1].x) < 0.5 ||
          Math.abs(sample.cx - SLOTS[0].x) < 0.5,
        JSON.stringify(track),
      ).toBe(true);
    }
    expect(
      Math.min(...track.map(sample => sample.opacity)),
      JSON.stringify(track),
    ).toBeLessThan(0.5);
    // Before the drop it already stands in A's slot, fully shown.
    const last = track[track.length - 1];
    expect(last.cx).toBeCloseTo(SLOTS[0].x, 0);
    expect(last.opacity).toBe(1);
  });
});
