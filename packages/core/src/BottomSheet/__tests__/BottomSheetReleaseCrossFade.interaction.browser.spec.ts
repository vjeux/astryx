// Copyright (c) Meta Platforms, Inc. and affiliates.

/**
 * @file BottomSheetReleaseCrossFade.interaction.browser.spec.ts
 * @input The built "Capped height — Long content" BottomSheet story, real
 *   touch input and the interaction harness
 * @output Proof that under Reduce Motion a drag released short of the dismiss
 *   point cross-fades the sheet back to rest, from the grab bar and from the
 *   content. A copy fades out where the finger left the sheet as the sheet
 *   fades in at rest, each within 200 ms. The sheet shows on every frame,
 *   and it ends at rest.
 * @position Interaction proof for BottomSheet's release under Reduce Motion
 */

import {expect, test, type Page} from '@astryxdesign/a11y-spec/playwright';
import {
  drag,
  openStory,
  touchDriver,
  waitForRest,
  withStorybook,
} from '@astryxdesign/interaction-harness';

const storybook = withStorybook(test);

/** A row near the sheet's top, drawn by the sheet and by any copy of it. */
const LABEL = 'Saved place 1';

async function openSheet(page: Page, where: 'grab bar' | 'content') {
  await openStory(
    page,
    storybook(),
    'core-bottomsheet--capped-height-with-long-content',
  );
  const driver = await touchDriver(page);
  const trigger = await page
    .getByRole('button', {name: 'View saved places'})
    .boundingBox();
  if (trigger == null) {
    throw new Error('no trigger');
  }
  await driver.tap({
    x: trigger.x + trigger.width / 2,
    y: trigger.y + trigger.height / 2,
  });
  const sheet = page
    .getByRole('dialog', {name: 'Saved places'})
    .locator('.astryx-bottom-sheet')
    .first();
  await expect(sheet).toBeVisible();
  await waitForRest(sheet);
  const rect = await sheet.boundingBox();
  const row = await page.getByText(LABEL, {exact: true}).boundingBox();
  if (rect == null || row == null) {
    throw new Error('no sheet');
  }
  const from =
    where === 'grab bar'
      ? {x: rect.x + rect.width / 2, y: rect.y + 12}
      : {x: row.x + row.width / 2, y: row.y + row.height / 2};
  return {driver, sheet, from, restTop: row.y, sheetTop: rect.y};
}

/**
 * Records every frame's drawings of the row's label: where each one's top is
 * and its opacity up the tree. The sheet and any copy of it each draw one.
 */
async function recordLabel(page: Page) {
  await page.evaluate(text => {
    const record = window as unknown as {
      __label: {t: number; drawn: {top: number; opacity: number}[]}[];
      __labelStop: boolean;
    };
    record.__label = [];
    record.__labelStop = false;
    const frame = () => {
      const drawn: {top: number; opacity: number}[] = [];
      const texts = document.createTreeWalker(
        document.body,
        NodeFilter.SHOW_TEXT,
      );
      // React writes "Saved place " and "1" as two text nodes: the label is
      // their parent's text.
      const parents = new Set<Element>();
      for (let node = texts.nextNode(); node != null; node = texts.nextNode()) {
        const parent = node.parentElement;
        if (
          parent == null ||
          parents.has(parent) ||
          parent.textContent?.trim() !== text
        ) {
          continue;
        }
        parents.add(parent);
        let opacity = 1;
        for (
          let element: Element | null = parent;
          element != null;
          element = element.parentElement
        ) {
          opacity *= Number(getComputedStyle(element).opacity);
        }
        drawn.push({top: parent.getBoundingClientRect().top, opacity});
      }
      // On the page's wall clock, as the driver stamps its events.
      record.__label.push({
        t: performance.timeOrigin + performance.now(),
        drawn,
      });
      if (!record.__labelStop) {
        requestAnimationFrame(frame);
      }
    };
    requestAnimationFrame(frame);
  }, LABEL);
}

/**
 * Records each opacity fade the page starts: on the sheet, or on an inert copy
 * of it, with its values, its length and where its element was.
 */
async function recordFades(page: Page) {
  await page.evaluate(() => {
    const record = window as unknown as {
      __fades: {
        on: 'sheet' | 'copy' | 'other';
        from: number;
        to: number;
        ms: number;
        top: number;
        t: number;
      }[];
    };
    record.__fades = [];
    const native = Element.prototype.animate;
    Element.prototype.animate = function (
      this: Element,
      keyframes: Keyframe[] | PropertyIndexedKeyframes | null,
      options?: number | KeyframeAnimationOptions,
    ) {
      const frames = Array.isArray(keyframes) ? keyframes : [];
      const first = frames[0]?.opacity;
      const last = frames.at(-1)?.opacity;
      if (first != null && last != null) {
        record.__fades.push({
          on: this.hasAttribute('inert')
            ? 'copy'
            : this.classList.contains('astryx-bottom-sheet')
              ? 'sheet'
              : 'other',
          from: Number(first),
          to: Number(last),
          ms: Number(typeof options === 'number' ? options : options?.duration),
          top: this.getBoundingClientRect().top,
          t: performance.timeOrigin + performance.now(),
        });
      }
      return native.call(this, keyframes, options);
    };
  });
}

const readFades = async (page: Page) =>
  page.evaluate(
    () =>
      (
        window as unknown as {
          __fades: {
            on: 'sheet' | 'copy' | 'other';
            from: number;
            to: number;
            ms: number;
            top: number;
            t: number;
          }[];
        }
      ).__fades,
  );

const stopLabel = async (page: Page) =>
  page.evaluate(() => {
    const record = window as unknown as {
      __label: {t: number; drawn: {top: number; opacity: number}[]}[];
      __labelStop: boolean;
    };
    record.__labelStop = true;
    return record.__label;
  });

/** How much of the row a frame shows: 1 − Π(1 − opacity) over its drawings. */
const shownIn = (drawn: ReadonlyArray<{opacity: number}>) =>
  1 - drawn.reduce((hidden, {opacity}) => hidden * (1 - opacity), 1);

for (const where of ['grab bar', 'content'] as const) {
  test(`under Reduce Motion a ${where} drag released short of the dismiss point cross-fades the sheet back to rest`, async ({
    page,
  }) => {
    await page.emulateMedia({reducedMotion: 'reduce'});
    const {driver, sheet, from, restTop, sheetTop} = await openSheet(
      page,
      where,
    );
    await recordLabel(page);
    await recordFades(page);
    // 120 px down is short of the dismiss point. The finger rests before the
    // lift, so the release projects nothing.
    const played = await driver.play(
      drag(
        from,
        {x: from.x, y: from.y + 120},
        {durationMs: 400, hz: 60, restMs: 150},
      ),
    );
    await waitForRest(sheet);
    await expect
      .poll(async () =>
        page
          .locator('.astryx-bottom-sheet[inert], [inert] .astryx-bottom-sheet')
          .count(),
      )
      .toBe(0);
    const frames = await stopLabel(page);
    const lift = played.find(event => event.type === 'touchEnd');
    if (lift == null) {
      throw new Error('the play has no lift');
    }
    // WebKit's input command returns late, so the lift's dispatch bounds the
    // frames. A frame before the lift can trail the last move, so the first
    // frame after it is the release.
    const before = frames.filter(frame => frame.t <= lift.dispatchedAt);
    const after = frames.filter(frame => frame.t > lift.dispatchedAt);
    const released = before.at(-1)?.drawn[0]?.top;
    if (released == null || after.length === 0) {
      throw new Error('no frames around the lift');
    }
    expect(
      released - restTop,
      'the drag moved the sheet down before the lift',
    ).toBeGreaterThan(60);
    // A cross-fade fades the sheet in at rest while a copy fades out where
    // the finger left it. A release that jumps back starts no fade. The
    // fades are read from their start: a busy runner can draw no frame
    // inside one.
    const fades = (await readFades(page)).filter(
      fade => fade.t > lift.dispatchedAt - 50,
    );
    const shown = JSON.stringify(
      fades.map(fade => ({...fade, top: Math.round(fade.top)})),
    );
    const sheetFade = fades.find(fade => fade.on === 'sheet');
    expect(
      sheetFade,
      `the release started no fade on the sheet, so it jumped back from ${Math.round(released)} (fades: ${shown})`,
    ).toBeDefined();
    expect(sheetFade?.from).toBeLessThan(0.05);
    expect(sheetFade?.to).toBe(1);
    expect(sheetFade?.ms).toBeLessThanOrEqual(200);
    const copyFade = fades.find(fade => fade.on === 'copy');
    expect(copyFade, `no copy faded out (fades: ${shown})`).toBeDefined();
    expect(copyFade?.from).toBe(1);
    expect(copyFade?.to).toBe(0);
    expect(copyFade?.ms).toBe(sheetFade?.ms);
    // The copy is laid where the sheet was as the finger left it, 120 px
    // from rest. The last frame before the lift can trail the last move,
    // 5 px, so the copy matches it within 6 px.
    expect(
      Math.abs((copyFade?.top ?? 0) - sheetTop - (released - restTop)),
    ).toBeLessThanOrEqual(6);
    const least = Math.min(...after.map(frame => shownIn(frame.drawn)));
    expect(
      least,
      `the sheet showed at ${least.toFixed(3)} on its emptiest frame`,
    ).toBeGreaterThanOrEqual(0.5);
    const last = after.at(-1)?.drawn ?? [];
    expect(last.map(d => Math.round(d.top))).toEqual([Math.round(restTop)]);
    expect(last[0]?.opacity).toBe(1);
  });
}
