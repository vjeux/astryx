// Copyright (c) Meta Platforms, Inc. and affiliates.

/**
 * @file PressReleasePaint.interaction.browser.spec.ts
 * @input The built stories of each surface whose touch press releases on a
 *   compositor layer, real touch input (WebKit's input command), and the
 *   interaction harness's WebKit Timeline recorder
 * @output Real-engine proof that a touch press's release runs on the
 *   compositor in WebKit too (`spec:AST-094` FR5): the press shows (the
 *   surface's look changes from rest), and while it releases WebKit paints
 *   nothing over the surface, frame after frame, on a button, an icon
 *   button, the cards, a list row, a tree row, a radio row and a checkbox,
 *   and on every other surface the shared overlay paints (a segment, a
 *   switch, a tab, a link, a side-nav item and heading, a step, an outline
 *   entry, a calendar day, a disclosure, a number stepper, a token, a
 *   top-nav item, a command-palette option, an avatar group's overflow,
 *   the top-nav item, menu, mega menu and their entries in a phone's
 *   navigation drawer, and a bottom-sheet date field's month and year);
 *   a menu anchored to a tapped button is not laid out and repainted every
 *   frame while the button's press releases, since the anchor's box stays
 *   still; and the highlight of a menu row a finger lands on is painted in
 *   one frame, not on every frame of a colour transition. Paint at a
 *   motion's first or last frame is a layer appearing and leaving; paint
 *   between them is the motion being repainted, which a release that
 *   animates a paint property, or an anchor that animates a transform,
 *   causes every frame
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
  type TouchDriver,
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
];

/** A step before the press: the menu a row is in, opened by a tap. */
type Prepare = (page: Page, driver: TouchDriver) => Promise<void>;

/** Taps what opens a surface, with the engine's own tap, and lets it settle. */
async function tapOpen(
  page: Page,
  driver: TouchDriver,
  opener: Locator,
  opened: Locator,
): Promise<void> {
  const box = await opener.boundingBox();
  if (box == null) {
    throw new Error('the story rendered nothing to open');
  }
  await driver.tap({x: box.x + box.width / 2, y: box.y + box.height / 2});
  await expect(opened).toBeVisible();
  await settled(page);
}

/** Opens the menu story's menu. */
const openMenu: Prepare = async (page, driver) => {
  const trigger = page.getByRole('button', {name: 'Actions'});
  await tapOpen(page, driver, trigger, page.getByRole('menu'));
  await expect(trigger).toHaveAttribute('aria-expanded', 'true');
};

/** Opens the shell's navigation drawer, as on a phone. */
const openDrawer: Prepare = async (page, driver) => {
  await tapOpen(
    page,
    driver,
    page.getByRole('button', {name: 'Open navigation'}),
    page.getByRole('button', {name: 'Close navigation'}),
  );
};

/** Opens the drawer and expands one of its sections. */
const openDrawerSection =
  (section: string): Prepare =>
  async (page, driver) => {
    await openDrawer(page, driver);
    const header = page.getByRole('button', {name: section, exact: true});
    await tapOpen(page, driver, header, header);
    await expect(header).toHaveAttribute('aria-expanded', 'true');
  };

/** Opens the bottom-sheet date field's sheet. */
const openDateSheet: Prepare = async (page, driver) => {
  await tapOpen(
    page,
    driver,
    page.getByRole('button', {name: 'Open calendar'}).nth(2),
    page.locator('[data-title="month-year"]'),
  );
};

/** The surfaces on the shared overlay's other variants, each on its own layer. */
const OVERLAY_SURFACES: ReadonlyArray<
  readonly [string, string, (page: Page) => Locator, Prepare?]
> = [
  [
    'a segment',
    'core-segmentedcontrol--default',
    page => page.locator('#storybook-root [data-astryx-pressable]').nth(1),
  ],
  ['a switch', 'core-switch--default', firstPressable],
  [
    'a tab',
    'core-tablist--default',
    page => page.locator('#storybook-root [data-astryx-pressable]').nth(1),
  ],
  ['a link', 'core-link--default', firstPressable],
  [
    'a side-nav item',
    'core-sidenav--default',
    page =>
      page
        .locator('#storybook-root [data-astryx-pressable]')
        .filter({hasText: 'Dashboard'})
        .first(),
  ],
  [
    'a side-nav heading',
    'core-sidenav--nested-items',
    page =>
      page
        .locator('#storybook-root [data-astryx-pressable][aria-expanded]')
        .first(),
  ],
  ['a step', 'core-stepper--default', firstPressable],
  ['an outline entry', 'core-outline--basic', firstPressable],
  [
    'a calendar day',
    'core-calendar--default',
    page =>
      page
        .locator('#storybook-root [data-astryx-pressable]')
        .filter({hasText: /^15$/})
        .first(),
  ],
  ['a disclosure', 'core-collapsible--single-mode', firstPressable],
  [
    'a number stepper',
    'core-numberinput--with-number-steppers',
    firstPressable,
  ],
  ['a token', 'core-token--clickable', firstPressable],
  [
    'a top-nav item',
    'core-topnav--nav-item-states',
    page => page.locator('#storybook-root [data-astryx-pressable]').nth(1),
  ],
  [
    'a command-palette option',
    'core-commandpalette--audit-matrix',
    firstPressable,
  ],
  [
    "an avatar group's overflow",
    'core-avatargroup--clickable-overflow',
    page => page.locator('#storybook-root [data-astryx-pressable]').last(),
  ],
  [
    'a top-nav item in the drawer',
    'core-topnavmenu--in-app-shell',
    page => page.getByRole('link', {name: 'Home', exact: true}),
    openDrawer,
  ],
  [
    'a top-nav menu in the drawer',
    'core-topnavmenu--in-app-shell',
    page => page.getByRole('button', {name: 'Products', exact: true}),
    openDrawer,
  ],
  [
    'a top-nav menu entry in the drawer',
    'core-topnavmenu--in-app-shell',
    page => page.getByRole('link', {name: /^Analytics/}),
    openDrawerSection('Products'),
  ],
  [
    'a mega menu in the drawer',
    'core-topnavmenu--in-app-shell',
    page => page.getByRole('button', {name: 'Solutions', exact: true}),
    openDrawer,
  ],
  [
    'a mega-menu entry in the drawer',
    'core-topnavmenu--in-app-shell',
    page => page.getByRole('link', {name: /^Automation/}),
    openDrawerSection('Solutions'),
  ],
  [
    "the date sheet's month and year",
    'core-dateinput--native-picker-modes',
    page => page.locator('[data-title="month-year"]'),
    openDateSheet,
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

/** A painted rect over a box, with a little room for a scaled surface's edges. */
function overlaps(
  rect: {x: number; y: number; width: number; height: number},
  box: {x: number; y: number; width: number; height: number},
): boolean {
  const room = 4;
  return (
    rect.x < box.x + box.width + room &&
    rect.x + rect.width > box.x - room &&
    rect.y < box.y + box.height + room &&
    rect.y + rect.height > box.y - room
  );
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

for (const [name, story, locate, prepare] of [
  ...SURFACES,
  ...OVERLAY_SURFACES,
] as ReadonlyArray<
  readonly [string, string, (page: Page) => Locator, Prepare?]
>) {
  test(`WebKit paints nothing while the touch press on ${name} fades: the release runs on the compositor (spec:AST-094 FR5)`, async ({
    page,
    browserName,
  }) => {
    test.skip(
      browserName !== 'webkit',
      "WebKit's own Timeline; Chromium's counterparts are the rendering traces beside each surface's release proof",
    );
    await openStory(page, storybook(), story);
    const driver = await touchDriver(page);
    await prepare?.(page, driver);
    const surface = locate(page);
    await expect(surface).toBeVisible();
    expect(
      await page.evaluate(() => matchMedia('(pointer: coarse)').matches),
    ).toBe(true);
    const box = await surface.boundingBox();
    if (box == null) {
      throw new Error(`${story}: the surface has no box`);
    }
    // The finger lands; the lift waits until the recording runs, so the
    // whole release falls inside it however late the page runs.
    // The press shows: what the surface looks like at rest changes while a
    // finger is on it (a release that paints nothing because nothing was
    // ever painted proves nothing).
    const atRest = await surface.screenshot();
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
    expect(
      Buffer.compare(atRest, await surface.screenshot()),
      `${name} looks the same pressed as at rest`,
    ).not.toBe(0);
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
    // Paint over the surface at the release's edges only, never frame after
    // frame (what else on the story moves is not this release's).
    const painted = paintedFrames(
      timeline.paints
        .filter(({rect}) => overlaps(rect, box))
        .map(paint => paint.t),
    );
    expect(
      painted.length,
      `${name} painted in ${painted.length} frames of its release, where a release repainted on the main thread paints 10 or more: ${JSON.stringify(timeline.paints)}`,
    ).toBeLessThanOrEqual(EDGE_FRAMES);
  });
}

/**
 * Every animation on the page that runs on the document's clock to an end
 * has settled. One on a scroll timeline, or one that repeats forever, never
 * finishes by design, so it is not waited for.
 */
async function settled(page: Page): Promise<void> {
  await expect
    .poll(async () =>
      page.evaluate(
        () =>
          document.getAnimations().filter(animation => {
            const end = animation.effect?.getComputedTiming().endTime;
            return (
              animation.playState === 'running' &&
              animation.timeline === document.timeline &&
              typeof end === 'number' &&
              Number.isFinite(end)
            );
          }).length,
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

test('WebKit paints the highlight of a menu row a finger lands on in one frame, not on every frame of a colour transition (spec:AST-094 FR5)', async ({
  page,
  browserName,
}) => {
  test.skip(
    browserName !== 'webkit',
    "WebKit's own Timeline: it runs no colour animation on the compositor",
  );
  await openStory(page, storybook(), 'core-dropdownmenu--default');
  const driver = await touchDriver(page);
  await openMenu(page, driver);
  const row = page.getByRole('menuitem').first();
  await expect(row).toBeVisible();
  const box = await row.boundingBox();
  if (box == null) {
    throw new Error('the menu has no row');
  }
  // The finger lands on the row and stays down while WebKit records: the
  // highlight moves to it (the menu focuses the row under the finger) and its
  // press shows. The lift, which would choose the row, waits.
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
      playing = driver.play(
        tap({x: box.x + box.width / 2, y: box.y + box.height / 2}, {holdMs: 0}),
        {
          onEvent: async (_step, index) => {
            if (index === 0) {
              landed();
              await lifted;
            }
          },
        },
      );
      await down;
      await expect
        .poll(async () => row.evaluate(el => el === document.activeElement))
        .toBe(true);
      await expect
        .poll(async () => row.getAttribute('data-astryx-press'))
        .toBe('on');
      await settled(page);
      await frames(page);
    },
    {sentinel: true},
  );
  lift();
  await playing;
  // Over the row, two frames: (1) the highlight appearing as the finger
  // lands and (2) the press layer appearing. A highlight that fades in by a
  // colour transition is repainted on every frame of it instead.
  const painted = paintedFrames(
    timeline.paints
      .filter(({rect}) => overlaps(rect, box))
      .map(paint => paint.t),
  );
  expect(
    painted.length,
    `the menu row painted in ${painted.length} frames as the finger landed, where a highlight fading in by a colour transition paints every frame: ${JSON.stringify(timeline.paints)}`,
  ).toBeLessThanOrEqual(2);
});
