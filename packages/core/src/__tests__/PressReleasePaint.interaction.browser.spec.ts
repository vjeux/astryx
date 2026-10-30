// Copyright (c) Meta Platforms, Inc. and affiliates.

/**
 * @file PressReleasePaint.interaction.browser.spec.ts
 * @input The built stories of each surface whose touch press releases on a
 *   compositor layer, real touch input (WebKit's input command), and the
 *   interaction harness's WebKit Timeline recorder
 * @output Real-engine proof that a touch press's release runs on the
 *   compositor in WebKit too (`spec:AST-094` FR5): while the release fades,
 *   WebKit paints nothing, frame after frame, on a button, an icon button,
 *   the cards, a list row, a tree row, a radio row, a checkbox, a button
 *   its group tracks and an alert dialog's action; and a
 *   menu anchored to a tapped button is not laid out and repainted every
 *   frame while the button's press releases, since the anchor's box stays
 *   still. Paint at a motion's first or last frame is a layer appearing and
 *   leaving; paint between them is the motion being repainted, which a
 *   release that animates a paint property, or an anchor that animates a
 *   transform, causes every frame
 * @position WebKit's counterpart of the Chromium rendering traces in
 *   ButtonPressRelease.interaction.browser.spec.ts and
 *   ListRowPress.interaction.browser.spec.ts ("does no Layout or Paint").
 *   Run with `pnpm test:interaction PressReleasePaint`.
 */

import {expect, test, type Locator, type Page} from '@playwright/test';
import {
  openStory,
  recordWebKitTimeline,
  tap,
  touchDriver,
  withStorybook,
} from '@astryxdesign/interaction-harness';

const storybook = withStorybook(test);

/**
 * The frames a release on the compositor paints, all at its edges: (1) its
 * first frame, where the press layer's fade starts; (2) on a scaled button,
 * the button's own layer rendered once again as its scale starts easing
 * back; (3) its last frame; (4) the press layer's removal. A release
 * repainted on the main thread paints every frame of its 200 ms instead: ten
 * or more at full rate, six or more at half. A correct build that needs more
 * than these is a finding, not a reason to allow more.
 */
const EDGE_FRAMES = 4;
/** Paint within this of the previous paint is the same frame. */
const SAME_FRAME_MS = 8;
/** The release's clock: the controller ends it no sooner (pressFeedback.ts). */
const RELEASE_MS = 200;

const firstPressable = (page: Page) =>
  page.locator('#storybook-root [data-astryx-pressable]').first();

/** Each surface, the story that shows it, and how to find it there. */
const SURFACES: ReadonlyArray<
  readonly [string, string, (page: Page) => Locator]
> = [
  [
    'a button',
    'core-press-feedback-touch--buttons',
    page => page.getByRole('button', {name: 'Secondary', exact: true}),
  ],
  ['an icon button', 'core-iconbutton--default', firstPressable],
  ['a ClickableCard', 'core-clickablecard--with-on-click', firstPressable],
  [
    'a SelectableCard',
    'core-selectablecard--single-select',
    // The second card: the first starts selected.
    page => page.locator('#storybook-root [data-astryx-pressable]').nth(1),
  ],
  ['a Thumbnail', 'core-thumbnail--clickable', firstPressable],
  [
    'a list row',
    'core-press-feedback-touch--rows',
    page =>
      page
        .locator('[data-astryx-pressable]')
        .filter({hasText: 'Conversation 1'})
        .first(),
  ],
  ['a tree row', 'core-treelist--basic', firstPressable],
  ['a radio row', 'core-radiolist--default', firstPressable],
  ['a checkbox', 'core-checkboxinput--default', firstPressable],
  [
    'a button its group tracks',
    'core-buttongroup--slide-across',
    page => page.getByRole('button', {name: 'Copy', exact: true}),
  ],
  [
    "an alert dialog's action",
    'core-alertdialog--inline',
    page => page.getByRole('button', {name: 'Cancel', exact: true}).first(),
  ],
];

/** The frames that painted: paint within {@link SAME_FRAME_MS} of the last is one frame. */
function paintedFrames(times: ReadonlyArray<number>): number[] {
  const frames: number[] = [];
  for (const t of [...times].sort((a, b) => a - b)) {
    if (frames.length === 0 || t - frames[frames.length - 1] > SAME_FRAME_MS) {
      frames.push(t);
    }
  }
  return frames;
}

/** Two frames: whatever the last write painted has painted. */
async function frames(page: Page): Promise<void> {
  await page.evaluate(
    async () =>
      new Promise<void>(resolve => {
        requestAnimationFrame(() => requestAnimationFrame(() => resolve()));
      }),
  );
}

interface ReleaseMarks {
  recording: number;
  fading: number | null;
  gone: number | null;
}

type Marked = Window & {__releaseMarks?: ReleaseMarks};

for (const [name, story, locate] of SURFACES) {
  test(`WebKit paints nothing while the touch press on ${name} fades: the release runs on the compositor (spec:AST-094 FR5)`, async ({
    page,
    browserName,
  }) => {
    test.skip(
      browserName !== 'webkit',
      "WebKit's own Timeline; Chromium's counterparts are the rendering traces beside each surface's release proof",
    );
    await openStory(page, storybook(), story);
    const surface = locate(page);
    await expect(surface).toBeVisible();
    expect(
      await page.evaluate(() => matchMedia('(pointer: coarse)').matches),
    ).toBe(true);
    const box = await surface.boundingBox();
    if (box == null) {
      throw new Error(`${story}: the surface has no box`);
    }
    const driver = await touchDriver(page);
    // The finger lands; the lift waits until the recording runs, so the
    // whole release falls inside it however late the page runs.
    let landed: () => void = () => undefined;
    const down = new Promise<void>(resolve => {
      landed = resolve;
    });
    let recording: () => void = () => undefined;
    const started = new Promise<void>(resolve => {
      recording = resolve;
    });
    const playing = driver.play(
      tap({x: box.x + box.width / 2, y: box.y + box.height / 2}, {holdMs: 0}),
      {
        onEvent: async (_step, index) => {
          if (index === 0) {
            landed();
            await started;
          }
        },
      },
    );
    await down;
    await expect
      .poll(async () => surface.getAttribute('data-astryx-press'))
      .toBe('on');
    await frames(page);
    const timeline = await recordWebKitTimeline(
      page,
      async () => {
        await surface.evaluate(el => {
          const marks: ReleaseMarks = {
            recording: performance.now(),
            fading: null,
            gone: null,
          };
          (window as Marked).__releaseMarks = marks;
          new MutationObserver(() => {
            const value = el.getAttribute('data-astryx-press');
            if (value === 'fading' && marks.fading == null) {
              marks.fading = performance.now();
            } else if (value == null && marks.gone == null) {
              marks.gone = performance.now();
            }
          }).observe(el, {
            attributes: true,
            attributeFilter: ['data-astryx-press'],
          });
        });
        recording();
        await playing;
        await expect
          .poll(async () => surface.getAttribute('data-astryx-press'), {
            timeout: 3000,
          })
          .toBeNull();
        await frames(page);
      },
      {sentinel: true},
    );
    const marks = await page.evaluate(() => (window as Marked).__releaseMarks);
    // The release ran, whole, inside the recording.
    expect(marks?.fading, JSON.stringify(marks)).not.toBeNull();
    expect(marks?.gone, JSON.stringify(marks)).not.toBeNull();
    expect(
      (marks?.gone ?? 0) - (marks?.fading ?? 0),
      JSON.stringify(marks),
    ).toBeGreaterThanOrEqual(RELEASE_MS - 50);
    // Paint at the release's edges only, never frame after frame.
    const painted = paintedFrames(timeline.paints.map(paint => paint.t));
    expect(
      painted.length,
      `${name} painted in ${painted.length} frames of its release, where a release repainted on the main thread paints 10 or more: ${JSON.stringify(timeline.paints)}`,
    ).toBeLessThanOrEqual(EDGE_FRAMES);
  });
}

/** Every animation on the page has settled. */
async function settled(page: Page): Promise<void> {
  await expect
    .poll(async () =>
      page.evaluate(
        () =>
          document
            .getAnimations()
            .filter(animation => animation.playState === 'running').length,
      ),
    )
    .toBe(0);
}

test('WebKit lays out and paints a menu anchored to a button once when the button is pressed, not on every frame: the anchor stays still (spec:AST-094 FR5)', async ({
  page,
  browserName,
}) => {
  test.skip(
    browserName !== 'webkit',
    "WebKit's own Timeline: it lays out again a popover positioned against an anchor that animates a transform",
  );
  await openStory(page, storybook(), 'core-dropdownmenu--default');
  const trigger = page.getByRole('button', {name: 'Actions'});
  await expect(trigger).toBeVisible();
  const box = await trigger.boundingBox();
  if (box == null) {
    throw new Error('the menu story rendered no trigger');
  }
  const center = {x: box.x + box.width / 2, y: box.y + box.height / 2};
  const driver = await touchDriver(page);
  // The engine's own tap opens the menu (WebKit synthesizes its click).
  await driver.tap(center);
  await expect(trigger).toHaveAttribute('aria-expanded', 'true');
  const menu = page.locator('[popover]:has([role="menu"])').first();
  await expect(menu).toBeVisible();
  await settled(page);
  const area = await menu.boundingBox();
  if (area == null) {
    throw new Error('the menu did not open');
  }
  // A finger presses the open menu's trigger and stays down while WebKit
  // records: the trigger's press scale, and whatever it costs the menu.
  let landed: () => void = () => undefined;
  const down = new Promise<void>(resolve => {
    landed = resolve;
  });
  let lift: () => void = () => undefined;
  const lifted = new Promise<void>(resolve => {
    lift = resolve;
  });
  let playing: Promise<unknown> = Promise.resolve();
  const timeline = await recordWebKitTimeline(
    page,
    async () => {
      playing = driver.play(tap(center, {holdMs: 0}), {
        onEvent: async (_step, index) => {
          if (index === 0) {
            landed();
            await lifted;
          }
        },
      });
      await down;
      await expect
        .poll(async () => trigger.getAttribute('data-astryx-press'))
        .toBe('on');
      await settled(page);
      await frames(page);
    },
    {sentinel: true},
  );
  lift();
  await playing;
  // While the finger is down the trigger's box changes once, as it scales
  // at the press, and WebKit lays the menu out again for that one frame. An
  // anchor whose scale animates moves the menu's layout every frame instead.
  const onMenu = timeline.paints.filter(
    ({rect}) =>
      rect.x < area.x + area.width &&
      rect.x + rect.width > area.x &&
      rect.y < area.y + area.height &&
      rect.y + rect.height > area.y,
  );
  const painted = paintedFrames(onMenu.map(paint => paint.t));
  expect(
    painted.length,
    `the menu painted in ${painted.length} frames while its trigger was pressed, where a menu laid out again with an animating anchor paints every frame: ${JSON.stringify(onMenu)}`,
  ).toBeLessThanOrEqual(1);
});
