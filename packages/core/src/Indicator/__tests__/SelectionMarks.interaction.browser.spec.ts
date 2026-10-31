// Copyright (c) Meta Platforms, Inc. and affiliates.

/**
 * @file SelectionMarks.interaction.browser.spec.ts
 * @input The built CheckboxList and RadioList Default stories, real touch
 *   input (Chromium CDP / WebKit's tap) and the interaction harness
 * @output Proofs that under a finger a checkbox or radio mark changes in the
 *   frame the selection lands, as iOS's selection marks do
 *   (motion/uikit/selection.ts): no transition is created and the first style
 *   the page computes after the change is the final one, for a checkbox, for
 *   both radios of a moving choice, and under Reduce Motion; a mouse keeps the
 *   theme's transition, and a screencast frame of it held at its midpoint
 *   shows a colour between the two states (the negative control); the
 *   presented frames of a tap show only the two states, each at rest or
 *   under the finger's press overlay (storyboard); and a main thread
 *   blocked right after the change keeps showing the whole mark (judging the
 *   frames on screen during the block once the change showed, each the
 *   settled checked colour, after a precondition that the change showed by
 *   the block's end).
 * @position Real-engine layer of the touch mark change; the stylesheet layer
 *   is Indicator/selectionMotion.test.ts.
 */

import {expect, test, type Page} from '@playwright/test';
// @ts-expect-error -- pngjs ships no declarations; runtime support is pinned.
import {PNG} from 'pngjs';
import {
  blockMainThread,
  castStoryboard,
  frames,
  openStory,
  startScreencast,
  touchDriver,
  withStorybook,
  writeEvidence,
  type CastFrame,
} from '@astryxdesign/interaction-harness';

const storybook = withStorybook(test);

type RGB = [number, number, number];

/** What the page saw in the microtask after the mark's class changed. */
interface MarkRead {
  /** The first background colour computed after the change. */
  first: string;
  /** Animations on the mark right after that computation. */
  animations: {property: string; duration: number}[];
}

const MARK = {
  checkbox: '.astryx-checkbox-indicator',
  radio: '.astryx-radio-indicator',
} as const;

/**
 * Watches the mark of the option named `name`: when React writes its new
 * state, the observer (a microtask, before any frame) computes its style once
 * and records the colour and any transition that computation started. With
 * `hold`, it also pauses those animations where they begin, so nothing
 * presents them until a test moves them (seekMark).
 */
async function watchMark(
  page: Page,
  role: 'checkbox' | 'radio',
  name: string,
  {hold = false}: {hold?: boolean} = {},
): Promise<void> {
  await page.getByRole(role, {name}).evaluate(
    (input, {selector, key, hold}) => {
      // The option's row: a CheckboxList `li`, a RadioList item.
      const row = input.closest('.astryx-item, li');
      const mark = row?.querySelector<HTMLElement>(selector);
      if (mark == null) {
        throw new Error(`no mark for ${key}`);
      }
      const reads = ((
        window as unknown as Record<string, unknown>
      ).__selectionMarkReads ??= {}) as Record<string, unknown>;
      const observer = new MutationObserver(() => {
        if (reads[key] != null) {
          return;
        }
        const first = getComputedStyle(mark).backgroundColor;
        reads[key] = {
          first,
          animations: mark.getAnimations().map(animation => ({
            property:
              (animation as CSSTransition).transitionProperty ??
              animation.constructor.name,
            duration: Number(animation.effect?.getTiming().duration ?? 0),
          })),
        };
        if (hold) {
          for (const animation of mark.getAnimations()) {
            animation.pause();
          }
        }
        observer.disconnect();
      });
      observer.observe(mark, {attributes: true, attributeFilter: ['class']});
    },
    {selector: MARK[role], key: `${role}:${name}`, hold},
  );
}

async function readMark(
  page: Page,
  role: 'checkbox' | 'radio',
  name: string,
): Promise<MarkRead> {
  const key = `${role}:${name}`;
  await page.waitForFunction(
    k =>
      ((window as unknown as Record<string, Record<string, unknown>>)
        .__selectionMarkReads ?? {})[k] != null,
    key,
  );
  return page.evaluate(
    k =>
      (window as unknown as Record<string, Record<string, MarkRead>>)
        .__selectionMarkReads[k],
    key,
  );
}

/** The mark's colour once everything has settled. */
async function settledColour(
  page: Page,
  role: 'checkbox' | 'radio',
  name: string,
): Promise<string> {
  await page.waitForTimeout(600);
  return page.getByRole(role, {name}).evaluate((input, selector) => {
    const mark = input.closest('.astryx-item, li')?.querySelector(selector);
    if (mark == null) {
      throw new Error('no mark');
    }
    return getComputedStyle(mark).backgroundColor;
  }, MARK[role]);
}

/**
 * Moves the animations on the option's mark to `t` ms, or finishes them, or
 * with 'midway' parks them where the mark's computed colour is furthest from
 * both its start and its end (stepping through the duration), so the point
 * is a blend whatever the theme's easing.
 */
async function seekMark(
  page: Page,
  role: 'checkbox' | 'radio',
  name: string,
  t: number | 'finish' | 'midway',
): Promise<void> {
  await page.getByRole(role, {name}).evaluate(
    (input, {selector, t}) => {
      const mark = input.closest('.astryx-item, li')?.querySelector(selector);
      const animations = mark?.getAnimations() ?? [];
      if (animations.length === 0) {
        throw new Error('no animation on the mark');
      }
      if (t === 'midway') {
        const end = Math.max(
          ...animations.map(animation =>
            Number(animation.effect?.getComputedTiming().endTime ?? 0),
          ),
        );
        const colourAt = (time: number) => {
          for (const animation of animations) {
            animation.currentTime = time;
          }
          return (
            getComputedStyle(mark as Element).backgroundColor.match(
              /[\d.]+/g,
            ) ?? []
          )
            .slice(0, 3)
            .map(Number);
        };
        const start = colourAt(0);
        const finish = colourAt(end);
        const apart = (a: number[], b: number[]) =>
          Math.max(...a.map((v, i) => Math.abs(v - b[i])));
        let best = 0;
        let bestApart = -1;
        for (let step = 1; step < 50; step++) {
          const time = (end * step) / 50;
          const colour = colourAt(time);
          const fromEnds = Math.min(
            apart(colour, start),
            apart(colour, finish),
          );
          if (fromEnds > bestApart) {
            best = time;
            bestApart = fromEnds;
          }
        }
        colourAt(best);
        return;
      }
      for (const animation of animations) {
        if (t === 'finish') {
          animation.finish();
        } else {
          animation.currentTime = t;
        }
      }
    },
    {selector: MARK[role], t},
  );
}

/** Waits until no animation in the page is running: a state, not a time. */
async function idle(page: Page): Promise<void> {
  await expect
    .poll(
      async () =>
        page.evaluate(
          () =>
            document
              .getAnimations()
              .filter(animation => animation.playState === 'running').length,
        ),
      {timeout: 30_000},
    )
    .toBe(0);
}

/**
 * The colour at a CSS px point in the first frame a new screencast sends: the
 * screen as it is now. Only a frame's arrival is waited for, never a time.
 */
async function castColour(
  page: Page,
  at: {x: number; y: number},
): Promise<RGB> {
  await frames(page, 2);
  const cast = await startScreencast(page);
  await expect
    .poll(() => cast.frameCount(), {timeout: 30_000})
    .toBeGreaterThan(0);
  const shot = await cast.stop();
  const [first] = await decodeFrames(page, shot.slice(0, 1), at);
  return first.colour;
}

/**
 * The press overlay the theme paints over a pressed control, as the page
 * resolves `--color-overlay-pressed`: its colour and its opacity.
 */
async function pressOverlay(page: Page): Promise<{rgb: RGB; alpha: number}> {
  const value = await page
    .locator('#storybook-root > *')
    .first()
    .evaluate(host => {
      const probe = document.createElement('div');
      probe.style.backgroundColor = 'var(--color-overlay-pressed)';
      host.append(probe);
      const colour = getComputedStyle(probe).backgroundColor;
      probe.remove();
      return colour;
    });
  const match = /^rgba?\(([^)]+)\)$/.exec(value);
  if (match == null) {
    throw new Error(`the press overlay is not an rgb colour: ${value}`);
  }
  const [r, g, b, a = '1'] = match[1].split(/[\s,/]+/).filter(Boolean);
  return {rgb: [Number(r), Number(g), Number(b)], alpha: Number(a)};
}

/** Within `tolerance` of a colour between `a` and `b` (a blend of the two). */
function nearSegment(c: RGB, a: RGB, b: RGB, tolerance: number): boolean {
  const ab = b.map((v, i) => v - a[i]);
  const length = ab.reduce((sum, v) => sum + v * v, 0);
  const along =
    length === 0
      ? 0
      : Math.min(
          1,
          Math.max(
            0,
            c.reduce((sum, v, i) => sum + (v - a[i]) * ab[i], 0) / length,
          ),
        );
  return c.every((v, i) => Math.abs(v - (a[i] + along * ab[i])) <= tolerance);
}

async function centreOf(page: Page, name: string, role: 'checkbox' | 'radio') {
  const box = await page.getByRole(role, {name}).evaluate((input, selector) => {
    const mark = input.closest('.astryx-item, li')?.querySelector(selector);
    if (mark == null) {
      throw new Error('no mark');
    }
    const r = mark.getBoundingClientRect();
    return {x: r.x + r.width / 2, y: r.y + r.height / 2, w: r.width};
  }, MARK[role]);
  return box;
}

/** The colour at a CSS px point of the page as presented now. */
async function pagePixel(page: Page, at: {x: number; y: number}): Promise<RGB> {
  const png = PNG.sync.read(
    await page.screenshot({
      clip: {x: Math.round(at.x), y: Math.round(at.y), width: 1, height: 1},
      scale: 'css',
      animations: 'allow',
    }),
  );
  return [png.data[0], png.data[1], png.data[2]];
}

interface DecodedFrame {
  /** Mean colour of a 3 × 3 CSS px patch around the sample point. */
  readonly colour: RGB;
  /** The frame cut down to `crop`, as a PNG frame (for a storyboard cell). */
  readonly cropped: CastFrame | null;
}

/**
 * Decodes screencast frames in a scratch page, whatever their format
 * (Chromium sends PNG, WebKit JPEG): the colour at a CSS px point of each,
 * and with `crop`, the frame cut down to that box.
 */
async function decodeFrames(
  page: Page,
  shot: ReadonlyArray<CastFrame>,
  at: {x: number; y: number},
  crop?: {x: number; y: number; width: number; height: number},
): Promise<DecodedFrame[]> {
  const scratch = await page.context().newPage();
  try {
    const decoded = await scratch.evaluate(
      async ({cast, point, box}) => {
        const out: {colour: number[]; png: string | null}[] = [];
        for (const frame of cast) {
          const bitmap = await createImageBitmap(
            await (
              await fetch(`data:image/${frame.format};base64,${frame.data}`)
            ).blob(),
          );
          const scale = bitmap.width / frame.viewportWidth;
          const canvas = document.createElement('canvas');
          canvas.width = bitmap.width;
          canvas.height = bitmap.height;
          const context = canvas.getContext('2d');
          if (context == null) {
            throw new Error('no 2d context');
          }
          context.drawImage(bitmap, 0, 0);
          const patch = context.getImageData(
            Math.round((point.x - 1) * scale),
            Math.round((point.y - 1) * scale),
            Math.max(1, Math.round(3 * scale)),
            Math.max(1, Math.round(3 * scale)),
          ).data;
          const sum = [0, 0, 0];
          for (let i = 0; i < patch.length; i += 4) {
            sum[0] += patch[i];
            sum[1] += patch[i + 1];
            sum[2] += patch[i + 2];
          }
          const count = patch.length / 4;
          let png: string | null = null;
          if (box != null) {
            const cut = document.createElement('canvas');
            cut.width = Math.round(box.width * scale);
            cut.height = Math.round(box.height * scale);
            cut
              .getContext('2d')
              ?.drawImage(
                canvas,
                Math.round(box.x * scale),
                Math.round(box.y * scale),
                cut.width,
                cut.height,
                0,
                0,
                cut.width,
                cut.height,
              );
            const url = cut.toDataURL('image/png');
            png = url.slice(url.indexOf(',') + 1);
          }
          out.push({colour: sum.map(v => Math.round(v / count)), png});
        }
        return out;
      },
      {cast: shot, point: at, box: crop ?? null},
    );
    return decoded.map(({colour, png}, i) => ({
      colour: colour as RGB,
      cropped:
        png == null ? null : {...shot[i], format: 'png' as const, data: png},
    }));
  } finally {
    await scratch.close();
  }
}

/**
 * Within `tolerance` levels per channel. The press overlay over the box
 * fades out after the lift, darkening a mark by a few levels on the way:
 * that is the press, not the mark changing. WebKit's frames are JPEG, which
 * moves a flat colour by a few levels more.
 */
const near = (a: RGB, b: RGB, tolerance: number) =>
  a.every((v, i) => Math.abs(v - b[i]) <= tolerance);
const same = (a: RGB, b: RGB) => near(a, b, 2);
/** Further than this from both ends is a blend between the two states. */
const PRESS_TOLERANCE = 20;

interface BusyProbe {
  /** The colour at the rest state's sample point before the tap. */
  readonly restColour: RGB;
  /** The colour there once the block is over and the page has settled. */
  readonly settledColour: RGB;
  /** Each frame on screen during the block once the change showed, oldest first. */
  readonly colours: RGB[];
  readonly trace: Record<string, unknown>;
}

/**
 * One busy-window probe: a tap checks "Push notification", and once the page
 * has committed the change the main thread blocks for 500 ms. It returns what
 * the screen showed during the block from the change's presentation on: the
 * last frame presented before the block began if it already shows the change,
 * plus every frame presented inside the block from the change on. Chromium's
 * screencast sends nothing for an unchanged screen, so the block window can
 * hold no frame at all, and an earlier captured frame was never on screen
 * during it. The capture starts before the tap, so the frame that presents
 * the change is in it. Both engines' compositors can present a change the
 * page committed before the block a few milliseconds into it, which is
 * presentation latency, not the blocked thread holding the mark back. A
 * change committed before the block and first presented after it is a
 * failure, with its frames.
 */
async function probeBusyAfterChange(page: Page): Promise<BusyProbe> {
  await openStory(page, storybook(), 'core-checkboxlist--default');
  const driver = await touchDriver(page);
  const at = await centreOf(page, 'Push notification', 'checkbox');
  const sample = {x: at.x - at.w / 2 + 3, y: at.y};
  const restColour = await pagePixel(page, sample);
  const cast = await startScreencast(page);
  await driver.tap(at);
  await expect(
    page.getByRole('checkbox', {name: 'Push notification'}),
  ).toBeChecked();
  // The change committed: the second frame's callbacks run only after the
  // first frame, which renders the change, has been committed. Now the app
  // does 500 ms of work.
  await frames(page, 2);
  const busy = await blockMainThread(page, 500);
  await frames(page, 2);
  const shot = await cast.stop();
  // The mark once the block is over: the checked colour, whole.
  const settledColour = await pagePixel(page, sample);
  const decoded = await decodeFrames(page, shot, sample);
  const read = shot.map((frame, i) => ({
    t: frame.t,
    colour: decoded[i].colour,
  }));
  const change = read.find(
    frame => !near(frame.colour, restColour, PRESS_TOLERANCE),
  );
  if (change == null || change.t > busy.to) {
    throw new Error(
      'the change, committed before the block, showed only after it: ' +
        JSON.stringify({busy, frames: read}),
    );
  }
  const before = read
    .filter(frame => frame.t >= change.t && frame.t < busy.from)
    .at(-1);
  const inside = read.filter(
    frame => frame.t >= busy.from && frame.t <= busy.to && frame.t >= change.t,
  );
  const onScreen = before == null ? inside : [before, ...inside];
  return {
    restColour,
    settledColour,
    colours: onScreen.map(frame => frame.colour),
    trace: {
      busy,
      frames: shot.length,
      changePresented: change.t,
      inBlock: inside.length,
      settledColour,
      judged: onScreen.map(frame => ({t: frame.t, colour: frame.colour})),
    },
  };
}

test.describe('selection marks under a finger', () => {
  // One touch model on every touch device: a coarse primary pointer. The
  // touch page here is the engine's own touch emulation; real iOS Safari and
  // Android Chrome are the simulator and emulator recordings.

  test('a tap changes a checkbox mark in the frame the selection lands', async ({
    page,
  }) => {
    await openStory(page, storybook(), 'core-checkboxlist--default');
    const driver = await touchDriver(page);
    await watchMark(page, 'checkbox', 'SMS');
    const at = await centreOf(page, 'SMS', 'checkbox');
    await driver.tap(at);
    const read = await readMark(page, 'checkbox', 'SMS');
    await expect(page.getByRole('checkbox', {name: 'SMS'})).toBeChecked();
    // No transition was started, and the first colour the page computed is
    // the one the mark keeps.
    expect(read.animations).toEqual([]);
    expect(read.first).toBe(await settledColour(page, 'checkbox', 'SMS'));
  });

  test('a tap moves a radio choice in one frame, on both circles', async ({
    page,
  }) => {
    await openStory(page, storybook(), 'core-radiolist--default');
    const driver = await touchDriver(page);
    await driver.tap(await centreOf(page, 'Email', 'radio'));
    await expect(page.getByRole('radio', {name: 'Email'})).toBeChecked();
    await frames(page, 2);
    await watchMark(page, 'radio', 'Email');
    await watchMark(page, 'radio', 'SMS');
    await driver.tap(await centreOf(page, 'SMS', 'radio'));
    const selected = await readMark(page, 'radio', 'SMS');
    const deselected = await readMark(page, 'radio', 'Email');
    await expect(page.getByRole('radio', {name: 'SMS'})).toBeChecked();
    expect(selected.animations).toEqual([]);
    expect(deselected.animations).toEqual([]);
    expect(selected.first).toBe(await settledColour(page, 'radio', 'SMS'));
    expect(deselected.first).toBe(await settledColour(page, 'radio', 'Email'));
  });

  test('Reduce Motion keeps the one-frame change', async ({page}) => {
    await page.emulateMedia({reducedMotion: 'reduce'});
    await openStory(page, storybook(), 'core-checkboxlist--default');
    const driver = await touchDriver(page);
    await watchMark(page, 'checkbox', 'Email');
    await driver.tap(await centreOf(page, 'Email', 'checkbox'));
    const read = await readMark(page, 'checkbox', 'Email');
    expect(read.animations).toEqual([]);
    expect(read.first).toBe(await settledColour(page, 'checkbox', 'Email'));
  });

  test('a mouse keeps the theme’s transition (negative control)', async ({
    browser,
  }) => {
    const context = await browser.newContext({
      viewport: {width: 1024, height: 768},
      hasTouch: false,
      isMobile: false,
    });
    const page = await context.newPage();
    try {
      await openStory(page, storybook(), 'core-checkboxlist--default');
      // A fine-pointer case proves nothing under a coarse primary pointer.
      expect(
        await page.evaluate(() => matchMedia('(pointer: coarse)').matches),
      ).toBe(false);
      // The fade is frozen where it begins, in the task that starts it, so the
      // frames below read it at set points however busy the page is: a fade
      // runs on the main thread, and a busy one can present none of it.
      await watchMark(page, 'checkbox', 'SMS', {hold: true});
      const at = await centreOf(page, 'SMS', 'checkbox');
      const sample = {x: at.x - at.w / 2 + 3, y: at.y};
      // Hover first, so the colours below differ by the click alone.
      await page.mouse.move(at.x, at.y);
      await idle(page);
      const before = await castColour(page, sample);
      await page.mouse.click(at.x, at.y);
      const read = await readMark(page, 'checkbox', 'SMS');
      const themeMs = await page.evaluate(() => {
        const value = getComputedStyle(document.documentElement)
          .getPropertyValue('--duration-fast')
          .trim();
        return value.endsWith('ms')
          ? parseFloat(value)
          : parseFloat(value) * 1000;
      });
      expect(themeMs).toBeGreaterThan(0);
      expect(read.animations).toContainEqual({
        property: 'background-color',
        duration: themeMs,
      });
      // The fade midway (where its colour is furthest from both ends), then
      // finished, as screencast frames show them once every other animation
      // (the hover, the press) is at rest.
      await seekMark(page, 'checkbox', 'SMS', 'midway');
      await idle(page);
      const midway = await castColour(page, sample);
      await seekMark(page, 'checkbox', 'SMS', 'finish');
      await idle(page);
      const after = await castColour(page, sample);
      expect(read.first).not.toBe(await settledColour(page, 'checkbox', 'SMS'));
      // The instrument sees a blend when the screen shows one.
      const summary = JSON.stringify({before, midway, after});
      expect(near(before, after, PRESS_TOLERANCE), summary).toBe(false);
      expect(near(midway, before, PRESS_TOLERANCE), summary).toBe(false);
      expect(near(midway, after, PRESS_TOLERANCE), summary).toBe(false);
    } finally {
      await context.close();
    }
  });

  test('the frames of a tap show no colour between the two states @storyboard', async ({
    page,
  }, testInfo) => {
    await openStory(page, storybook(), 'core-checkboxlist--default');
    const driver = await touchDriver(page);
    const at = await centreOf(page, 'SMS', 'checkbox');
    // Sample inside the box, clear of the check glyph.
    const sample = {x: at.x - at.w / 2 + 3, y: at.y};
    const list = await page.getByRole('group').first().boundingBox();
    if (list == null) {
      throw new Error('no list');
    }
    const cast = await startScreencast(page);
    await frames(page, 4);
    const tapAt = Date.now();
    await driver.tap(at);
    await expect(page.getByRole('checkbox', {name: 'SMS'})).toBeChecked();
    await page.waitForTimeout(400);
    const shot = await cast.stop();
    // Two frames at least, or the capture shows nothing between. Capped at
    // 3 CPUs with 16 workers, WebKit's screencast can hold a single frame for
    // the whole capture, which this reports: the engine's limit there.
    expect(shot.length).toBeGreaterThan(1);
    const clip = {
      x: Math.max(0, Math.floor(list.x) - 8),
      y: Math.max(0, Math.floor(list.y) - 8),
      width: Math.ceil(list.width) + 16,
      height: Math.ceil(list.height) + 16,
    };
    const decoded = await decodeFrames(page, shot, sample, clip);
    const colours = decoded.map(frame => frame.colour);
    const before = colours[0];
    const after = colours[colours.length - 1];
    // The box shows two states, unchecked and checked, each at rest or under
    // the press overlay: a finger paints it at touch-down, before the lift
    // changes the mark, and it fades after. Until the mark first shows
    // checked, a frame is the unchecked box; from then on, the checked one.
    // Any other colour is a blend of the two marks.
    const overlay = await pressOverlay(page);
    const pressed = (c: RGB): RGB => [
      c[0] * (1 - overlay.alpha) + overlay.rgb[0] * overlay.alpha,
      c[1] * (1 - overlay.alpha) + overlay.rgb[1] * overlay.alpha,
      c[2] * (1 - overlay.alpha) + overlay.rgb[2] * overlay.alpha,
    ];
    const unchecked = (c: RGB) =>
      nearSegment(c, before, pressed(before), PRESS_TOLERANCE);
    const checked = (c: RGB) =>
      nearSegment(c, after, pressed(after), PRESS_TOLERANCE);
    const changed = colours.findIndex(checked);
    const between = colours.filter((c, i) =>
      i < changed ? !unchecked(c) : !checked(c),
    );
    // The evidence is written first, so a failing run shows its blend.
    const storyboard = await castStoryboard(
      page,
      decoded.map((frame, i) => frame.cropped ?? shot[i]),
      {
        name: 'checkbox-mark-tap',
        zero: tapAt,
        cellScale: 1,
        columns: 4,
        data: t => {
          const i = shot.findIndex(f => f.t === t);
          return {box: i < 0 ? '' : `rgb(${colours[i].join(',')})`};
        },
      },
    );
    await storyboard.write(testInfo, {
      claim:
        'under a finger the mark changes in one frame (motion/uikit/selection.ts)',
      sample,
      before,
      after,
      blendFrames: between.length,
    });
    expect(same(before, after)).toBe(false);
    // Every presented frame shows one state or the other, at rest or pressed,
    // never a blend.
    expect(between).toEqual([]);
  });

  test('a main thread blocked right after the change shows the whole mark', async ({
    page,
  }, testInfo) => {
    const probe = await probeBusyAfterChange(page);
    const {colours, restColour, settledColour} = probe;
    expect(near(settledColour, restColour, PRESS_TOLERANCE)).toBe(false);
    // Whatever the screen showed during the block, once the change showed,
    // is the checked mark, whole: the settled colour, never a frozen blend.
    for (const colour of colours) {
      expect(near(colour, restColour, PRESS_TOLERANCE)).toBe(false);
      expect(near(colour, colours[0], 8)).toBe(true);
      expect(near(colour, settledColour, 8)).toBe(true);
    }
    await writeEvidence(
      'selection-marks/busy-after-change',
      {'trace.json': JSON.stringify(probe.trace, null, 2)},
      testInfo,
    );
  });
});

test.describe('selection marks with a mouse under Reduce Motion', () => {
  test('the change is immediate (design:reduced-motion DR3)', async ({
    browser,
  }) => {
    const context = await browser.newContext({
      viewport: {width: 1024, height: 768},
      hasTouch: false,
      isMobile: false,
      reducedMotion: 'reduce',
    });
    const page = await context.newPage();
    try {
      await openStory(page, storybook(), 'core-checkboxlist--default');
      // A fine-pointer case proves nothing under a coarse primary pointer.
      expect(
        await page.evaluate(() => matchMedia('(pointer: coarse)').matches),
      ).toBe(false);
      await watchMark(page, 'checkbox', 'SMS');
      const at = await centreOf(page, 'SMS', 'checkbox');
      await page.mouse.move(at.x, at.y);
      await page.waitForTimeout(400);
      await page.mouse.click(at.x, at.y);
      const read = await readMark(page, 'checkbox', 'SMS');
      await expect(page.getByRole('checkbox', {name: 'SMS'})).toBeChecked();
      expect(read.animations).toEqual([]);
      expect(read.first).toBe(await settledColour(page, 'checkbox', 'SMS'));
    } finally {
      await context.close();
    }
  });
});
