// Copyright (c) Meta Platforms, Inc. and affiliates.

/**
 * @file Switch.interaction.browser.spec.ts
 * @input The built Switch stories, real touch input (Chromium CDP / WebKit's
 *   input command) and @astryxdesign/interaction-harness
 * @output Interaction and animation proofs of Switch's touch presentation
 *   against UISwitch on iOS 26.2, one named case per path (P1–P14), and
 *   storyboards of a tap and of a drag
 * @position The browser layer of Switch's touch tests; the pure model is
 *   switchTouch.test.ts. Runs on the phone profile (coarse pointer); a mouse
 *   context keeps the desktop switch.
 *
 * SYNC: useSwitchTouch.ts, switchTouch.ts, motion/uikit/switch.ts.
 */

import {
  expect,
  test,
  type Browser,
  type Locator,
  type Page,
} from '@astryxdesign/a11y-spec/playwright';
import {
  castStoryboard,
  animationStoryboard,
  armHold,
  blockMainThread,
  busyWindowProof,
  compareCurve,
  cubicBezier,
  controlClock,
  countBetween,
  advanceFrozenPage,
  drag,
  freezePageOn,
  freezeTimers,
  holdAnimations,
  installPageFreeze,
  installTimerGate,
  markElement,
  openStory,
  releaseAnimations,
  seekAnimations,
  springStep,
  startBusyControl,
  startScreencast,
  tap,
  thawPage,
  thawTimers,
  timeline,
  touchDriver,
  touchStoryboard,
  traceRendering,
  trackControl,
  trackMarker,
  waitForRest,
  watchAnimations,
  withStorybook,
  writeEvidence,
  type CastFrame,
  type TouchDriver,
  CONTROL_SIDE,
} from '@astryxdesign/interaction-harness';
import {BROWSER_CLICK_WAIT_MS} from '../../utils/browserClickWait';
import {CLICK_GUARD_WINDOW_MS} from '../../utils/clickGuard';

const storybook = withStorybook(test);

// UISwitch on iOS 26.2 (motion/uikit/switch.ts), restated here as the oracle.
const TRAVEL = {response: 0.3, dampingFraction: 1};
const WELL_ON = {response: 0.68, dampingFraction: 1};
/** The md track is 40 × 24. */
const TRACK = {width: 40, height: 24};
/** The md thumb, a circle at the size a mouse sees: 16 off, 20 on (Switch FR13). */
const THUMB_OFF = 16;
const THUMB_ON = 20;
/** The off thumb's inset in the track, on every side. */
const INSET = (TRACK.height - THUMB_OFF) / 2;
/** How far the thumb's center travels: each circle centered in the track's height at its end. */
const TRAVEL_PX = TRACK.width - TRACK.height;
/** The flip rule: the track minus the thumb past where the finger landed. */
const FLIP_DISTANCE = TRACK.width - THUMB_OFF;
const FLIP_FROM_ON = TRACK.width - THUMB_ON;
/** The lift grows the thumb into half the gap on each side (switchTouch.ts). */
const LIFT_SCALE = 1 + INSET / THUMB_OFF;
/**
 * design:reduced-motion DR2: under reduced motion a touch change is an
 * opacity-only cross-fade of this many ms or less.
 */
const REDUCED_FADE_MAX_MS = 200;
/** The release's clock and curve: the theme's exit motion tokens. */
interface Exit {
  readonly ms: number;
  readonly curve: readonly [number, number, number, number];
  readonly ease: (t: number) => number;
}

/** Reads `--duration-exit` and `--ease-exit` where the press paints. */
async function exitOf(surface: Locator): Promise<Exit> {
  const {ms, curve} = await surface.evaluate(el => {
    const style = getComputedStyle(el);
    const time = style.getPropertyValue('--duration-exit').trim();
    const points = (
      style.getPropertyValue('--ease-exit').match(/-?\d*\.?\d+/g) ?? []
    ).map(Number);
    return {
      ms: time.endsWith('ms') ? parseFloat(time) : parseFloat(time) * 1000,
      curve: points,
    };
  });
  const points = curve as unknown as Exit['curve'];
  return {ms, curve: points, ease: cubicBezier(...points)};
}

/** The layer's opacity t ms into the release: the strength, 1 → 0. */
const strengthAt = (exit: Exit, t: number) =>
  1 - exit.ease(Math.min(1, Math.max(0, t / exit.ms)));

interface ChangeSample {
  t: number;
  /** The thumb's scale as presented. */
  scale: number;
  /**
   * The thumb's center from the track's left edge (each state has its own
   * circle size, so the center is where it is).
   */
  left: number;
  /** How opaque the thumb shows. */
  opacity: number;
  /** How far the colour shows on (see presented()). */
  on: number;
  /** The track's own fill. */
  fill: string;
}

/**
 * Samples the first switch every frame for `ms` while `act` runs.
 */
async function sampleChange(
  page: Page,
  act: () => Promise<void>,
  ms = 700,
): Promise<ChangeSample[]> {
  await page.evaluate(duration => {
    const w = window as unknown as {__change: unknown[]};
    const track = document.querySelector<HTMLElement>(
      '#storybook-root .astryx-switch',
    )!;
    const thumb = document.querySelector<HTMLElement>(
      '#storybook-root .astryx-switch-thumb',
    )!;
    const input = document.querySelector<HTMLInputElement>(
      '#storybook-root [role="switch"]',
    )!;
    const scaleOf = (element: Element) => {
      const scale = getComputedStyle(element).scale;
      return scale === 'none' ? 1 : Number(scale.split(' ')[0]);
    };
    w.__change = [];
    const start = performance.now();
    const tick = () => {
      const t = performance.now() - start;
      const faded = Number(getComputedStyle(track, '::after').opacity);
      w.__change.push({
        t,
        scale: scaleOf(thumb),
        left:
          (thumb.getBoundingClientRect().left +
            thumb.getBoundingClientRect().right) /
            2 -
          track.getBoundingClientRect().left,
        opacity: Number(getComputedStyle(thumb).opacity),
        on: input.checked ? 1 - faded : faded,
        fill: getComputedStyle(track).backgroundColor,
      });
      if (t < duration) {
        requestAnimationFrame(tick);
      }
    };
    requestAnimationFrame(tick);
  }, ms);
  await act();
  await page.waitForTimeout(ms + 100);
  return page.evaluate(
    () => (window as unknown as {__change: ChangeSample[]}).__change,
  );
}

/**
 * Holds the press's release from the task that starts it: a microtask after
 * the row's attribute turns `fading`, before any timer or frame runs. The
 * page's gated timers freeze, so nothing removes the attribute. The release's
 * CSS animations are created there and held at their start, so a loaded
 * machine cannot play them out before the test reads them.
 */
async function holdReleaseWhenFading(page: Page): Promise<void> {
  await page.evaluate(() => {
    const row = document.querySelector(
      '#storybook-root [data-astryx-pressable]',
    )!;
    const gate = (window as unknown as {__harnessTimerGate: {frozen: boolean}})
      .__harnessTimerGate;
    const observer = new MutationObserver(() => {
      if (row.getAttribute('data-astryx-press') !== 'fading') {
        return;
      }
      gate.frozen = true;
      observer.disconnect();
      for (const animation of row.getAnimations({subtree: true})) {
        if (animation instanceof CSSAnimation) {
          animation.playbackRate = 0;
        }
      }
    });
    observer.observe(row, {attributeFilter: ['data-astryx-press']});
  });
}

/**
 * Gives the held release animations their rate back before the release.
 * The hold set it to 0, and an animation at rate 0 cannot finish. They stay
 * paused, so nothing moves.
 */
async function restoreHeldRates(page: Page): Promise<void> {
  await page.evaluate(() => {
    for (const animation of document.getAnimations()) {
      if (animation.playbackRate === 0) {
        animation.playbackRate = 1;
      }
    }
  });
}

/**
 * Resolves after a timer of `ms` queued now on the page. The switch queued
 * its own timer at the release, before this one. With the same delay, this
 * one runs after it, however late the page runs.
 */
async function afterPageTimer(page: Page, ms: number): Promise<void> {
  await page.evaluate(async delay => {
    await new Promise<void>(resolve => {
      setTimeout(resolve, delay);
    });
  }, ms);
}

/**
 * design:reduced-motion DR1 and DR2: the change scales nothing, never shows
 * the thumb between its two places, fades (opacity), and is done within the
 * cross-fade's bound.
 */
function expectCrossFade(samples: ChangeSample[]): void {
  const first = samples[0];
  const last = samples.at(-1)!;
  expect(Math.abs(last.left - first.left)).toBeGreaterThan(4);
  for (const sample of samples) {
    expect(Math.abs(sample.scale - 1), JSON.stringify(sample)).toBeLessThan(
      0.01,
    );
    if (sample.opacity > 0.1) {
      const atAnEnd = Math.min(
        Math.abs(sample.left - first.left),
        Math.abs(sample.left - last.left),
      );
      expect(atAnEnd, JSON.stringify(sample)).toBeLessThan(0.75);
    }
  }
  // A fade, not a jump: some frame shows the thumb or the colour part-way.
  expect(
    samples.some(
      s => (s.opacity > 0.1 && s.opacity < 0.9) || (s.on > 0.1 && s.on < 0.9),
    ),
  ).toBe(true);
  // Each fade, the thumb's and the colour's, lasts the bound or less. The
  // colour starts at the release and the thumb at the commit. A busy page can
  // start them frames apart, so each is measured on its own. Both samples of
  // a span lie inside its fade, so a frame read late cannot lengthen it.
  const spanOf = (fading: (s: ChangeSample) => boolean) => {
    const inside = samples.filter(fading);
    return inside.length === 0 ? 0 : inside.at(-1)!.t - inside[0].t;
  };
  const thumbFading = (s: ChangeSample) => s.opacity < 0.98;
  const colourFading = (s: ChangeSample) =>
    Math.abs(s.on - first.on) > 0.02 && Math.abs(s.on - last.on) > 0.02;
  // Present first: the change shows on screen.
  expect(samples.some(s => thumbFading(s) || colourFading(s))).toBe(true);
  expect(spanOf(thumbFading)).toBeLessThanOrEqual(REDUCED_FADE_MAX_MS);
  expect(spanOf(colourFading)).toBeLessThanOrEqual(REDUCED_FADE_MAX_MS);
}

interface OpenSwitch {
  driver: TouchDriver;
  input: Locator;
  thumb: Locator;
  onLayer: Locator;
  /** The thumb's center at rest, client px. */
  center: {x: number; y: number};
}

/** Waits for the switch's measured hit insets (utils/hitArea, a frame after mount). */
async function waitForHitArea(page: Page): Promise<void> {
  await page.waitForFunction(() => {
    const surface = document.querySelector<HTMLElement>(
      '#storybook-root [role="switch"]',
    )?.parentElement;
    return (
      surface?.style.getPropertyValue('--astryx-hit-inset-top') !== '' &&
      surface?.style.getPropertyValue('--astryx-hit-inset-top') != null
    );
  });
}

async function openSwitch(
  page: Page,
  storyId = 'core-switch--default',
  {
    direction = 'ltr',
    globals = [],
    belowControls = false,
  }: {
    direction?: 'ltr' | 'rtl';
    /** More Storybook globals, e.g. `theme:probe`. */
    globals?: string[];
    /**
     * Moves the switch below the busy controls' strips (the top
     * `2 * CONTROL_SIDE + 4` px), so a control never crosses its marker.
     */
    belowControls?: boolean;
  } = {},
): Promise<OpenSwitch> {
  const allGlobals = [
    ...(direction === 'rtl' ? ['direction:rtl'] : []),
    ...globals,
  ];
  if (allGlobals.length === 0) {
    await openStory(page, storybook(), storyId);
  } else {
    // Storybook's globals apply from the story's first render (the direction
    // global wraps it in `dir="rtl"`, so the switch mounts right to left).
    await page.goto(
      `${storybook()}/iframe.html?id=${storyId}&viewMode=story&globals=${allGlobals.join(';')}`,
    );
    await page
      .locator('#storybook-root > *')
      .first()
      .waitFor({state: 'attached'});
    await page.evaluate(async () => {
      await document.fonts.ready;
      await new Promise<void>(resolve =>
        requestAnimationFrame(() => requestAnimationFrame(() => resolve())),
      );
    });
  }
  if (belowControls) {
    await page.addStyleTag({
      content: `#storybook-root { padding-top: ${2 * CONTROL_SIDE + 16}px !important; }`,
    });
    await page.evaluate(
      async () =>
        new Promise<void>(resolve =>
          requestAnimationFrame(() => requestAnimationFrame(() => resolve())),
        ),
    );
  }
  const driver = await touchDriver(page);
  const root = page.locator('#storybook-root');
  const input = root.getByRole('switch').first();
  const thumb = root.locator('.astryx-switch-thumb').first();
  // The track: its ::after is the colour fade, its ::before the press.
  const onLayer = root.locator('.astryx-switch').first();
  // Under a finger the thumb itself moves and lifts.
  const box = await thumb.boundingBox();
  if (box == null) {
    throw new Error('no thumb');
  }
  return {
    driver,
    input,
    thumb,
    onLayer,
    center: {x: box.x + box.width / 2, y: box.y + box.height / 2},
  };
}

interface Presented {
  scaleX: number;
  scaleY: number;
  on: number;
  fill: number;
}

/**
 * A tap the browser turns into its own click. Chromium synthesises the click
 * from the scripted touch. WebKit synthesises one only from its tap path,
 * which has no hold.
 */
async function tapForClick(
  driver: TouchDriver,
  at: {x: number; y: number},
  holdMs = 50,
): Promise<void> {
  if (driver.engine === 'webkit') {
    await driver.tap(at);
  } else {
    await driver.play(tap(at, {holdMs}));
  }
}

/**
 * The opacity of the first track's press layer (its ::before), or null when
 * the track has none (at rest).
 */
async function pressLayer(
  page: Page,
  part: 'track' | 'thumb' = 'track',
): Promise<number | null> {
  return page.evaluate(which => {
    const track = document.querySelector<HTMLElement>(
      which === 'track'
        ? '#storybook-root .astryx-switch'
        : '#storybook-root .astryx-switch-thumb',
    )!;
    const layer = getComputedStyle(track, '::before');
    return layer.content === 'none' || layer.content === 'normal'
      ? null
      : Number(layer.opacity);
  }, part);
}

/** The press state the row's press feedback shows (`data-astryx-press`). */
async function pressState(page: Page, index = 0): Promise<string | null> {
  return page.evaluate(i => {
    const inputs = document.querySelectorAll('#storybook-root [role="switch"]');
    const row = inputs[i]?.closest('[data-astryx-pressable]');
    return row?.getAttribute('data-astryx-press') ?? null;
  }, index);
}

/**
 * The switch at rest: the thumb still, and the track's colour fade (its
 * ::after, which waitForRest does not read) finished too.
 */
async function waitForSwitchRest(page: Page, thumb: Locator): Promise<void> {
  await waitForRest(thumb);
  await page.waitForFunction(() =>
    document
      .querySelector('#storybook-root .astryx-switch')!
      .getAnimations({subtree: true})
      .every(animation => animation.playState !== 'running'),
  );
}

/** The thumb's scale and the track's color, as presented. */
async function presented(page: Page): Promise<Presented> {
  return page.evaluate(() => {
    const thumb = document.querySelector<HTMLElement>(
      '#storybook-root .astryx-switch-thumb',
    )!;
    // The fade layer over the track shows the other side's fill. How far the
    // colour shows on is its opacity while off, and its complement while on.
    const fade = document.querySelector<HTMLElement>(
      '#storybook-root .astryx-switch',
    )!;
    const input = document.querySelector<HTMLInputElement>(
      '#storybook-root [role="switch"]',
    )!;
    const faded = Number(getComputedStyle(fade, '::after').opacity);
    const scale = getComputedStyle(thumb).scale;
    const [sx, sy = sx] = (scale === 'none' ? '1' : scale)
      .split(' ')
      .map(Number);
    return {
      scaleX: sx,
      scaleY: sy,
      on: input.checked ? 1 - faded : faded,
      fill: Number(getComputedStyle(thumb).opacity),
    };
  });
}

/**
 * The thumb's offset from the track's start edge, exact: its center (a scale
 * about the center does not move it) less half its unscaled width.
 */
async function thumbOffset(page: Page): Promise<number> {
  // The thumb's center from the inline-start rest's: 0 off, TRAVEL_PX on (in
  // LTR). The center, since each state has its own circle size.
  return page.evaluate(height => {
    const box = document.querySelector<HTMLElement>(
      '#storybook-root .astryx-switch-thumb',
    )!;
    const rect = box.getBoundingClientRect();
    const track = box.parentElement!.getBoundingClientRect();
    return rect.left + rect.width / 2 - track.left - height / 2;
  }, TRACK.height);
}

/**
 * The thumb's travel: the newest animation of its `translate`, from its start
 * to the end of its motion, epoch ms.
 */
async function travelAnimation(
  page: Page,
): Promise<{from: number; to: number}> {
  for (let attempt = 0; attempt < 500; attempt++) {
    const found = await page.evaluate(() => {
      const box = document.querySelector<HTMLElement>(
        '#storybook-root .astryx-switch-thumb',
      )!;
      const travel = box
        .getAnimations()
        .filter(
          a =>
            a.playState === 'running' &&
            (a.effect as KeyframeEffect)
              .getKeyframes()
              .some(k => 'translate' in k),
        )
        .at(-1);
      if (travel == null || travel.startTime == null) {
        return null;
      }
      const from = performance.timeOrigin + Number(travel.startTime);
      // The animator's keyframes end with a hold of the end state: the
      // motion ends at the last keyframe before it.
      const effect = travel.effect as KeyframeEffect;
      const offsets = effect
        .getKeyframes()
        .map(k => k.computedOffset)
        .filter(o => o < 1);
      return {
        from,
        to:
          from +
          Number(effect.getComputedTiming().activeDuration) *
            Math.max(...offsets),
      };
    });
    if (found != null) {
      return found;
    }
    await page.waitForTimeout(4);
  }
  throw new Error('the thumb never travelled');
}

/** The probe theme paints every state of the `switch` target its own fill. */
const PROBE_THEME = 'astryxTheme:probe';

/**
 * The track's fill off and on as a theme paints it under a mouse: what a
 * finger has to show too.
 */
async function mouseFills(
  browser: Browser,
  globals: string[],
): Promise<{off: string; on: string}> {
  const context = await browser.newContext({
    hasTouch: false,
    isMobile: false,
    deviceScaleFactor: 1,
    viewport: {width: 480, height: 320},
  });
  try {
    const page = await context.newPage();
    await page.goto(
      `${storybook()}/iframe.html?id=core-switch--default&viewMode=story&globals=${globals.join(';')}`,
    );
    const input = page.locator('#storybook-root').getByRole('switch').first();
    await input.waitFor({state: 'attached'});
    const fill = async () => {
      // Off the switch (no hover tint), after the track's own transition.
      await page.mouse.move(1, 1);
      await page.waitForTimeout(400);
      return page.evaluate(
        () =>
          getComputedStyle(
            document.querySelector('#storybook-root .astryx-switch')!,
          ).backgroundColor,
      );
    };
    const off = await fill();
    await input.click({force: true});
    await expect(input).toBeChecked();
    return {off, on: await fill()};
  } finally {
    await context.close();
  }
}

/**
 * The colour a finger sees on the track: the fade layer's while it is
 * opaque, the track's own fill while it is clear.
 */
async function visibleFill(page: Page): Promise<string> {
  return page.evaluate(() => {
    const track = document.querySelector<HTMLElement>(
      '#storybook-root .astryx-switch',
    )!;
    const fade = getComputedStyle(track, '::after');
    return Number(fade.opacity) > 0.5
      ? fade.backgroundColor
      : getComputedStyle(track).backgroundColor;
  });
}

test.describe('C16 mount peak', () => {
  test('C16PEAK', async ({page}) => {
    const cdp = await page.context().newCDPSession(page);
    const trees: {n: number; ids: number[]; at: number}[] = [];
    const t0 = Date.now();
    cdp.on('LayerTree.layerTreeDidChange', event => {
      if (event.layers != null) {
        trees.push({
          n: event.layers.length,
          ids: event.layers.flatMap(l =>
            l.backendNodeId != null ? [l.backendNodeId] : [],
          ),
          at: Date.now() - t0,
        });
      }
    });
    await cdp.send('LayerTree.enable');
    await page.addInitScript(() => {
      const w = window as unknown as {__firstSwitch?: number};
      new MutationObserver(() => {
        if (
          w.__firstSwitch == null &&
          document.querySelector('[role="switch"]')
        ) {
          w.__firstSwitch = performance.timeOrigin + performance.now();
        }
      }).observe(document, {subtree: true, childList: true});
    });
    await openStory(page, storybook(), 'core-switch--in-scrolling-list');
    await page.waitForTimeout(1500);
    const first = await page.evaluate(
      () => (window as unknown as {__firstSwitch?: number}).__firstSwitch ?? 0,
    );
    const origin = await page.evaluate(() => performance.timeOrigin);
    await cdp.send('DOM.getDocument', {depth: -1});
    const peak = trees.reduce((a, b) => (b.n > a.n ? b : a), trees[0]);
    const names: string[] = [];
    for (const id of peak.ids) {
      try {
        const {node} = await cdp.send('DOM.describeNode', {backendNodeId: id});
        const cls = (node.attributes ?? []).join(' ').match(/class (\S+)/);
        names.push(
          `${node.nodeName}${node.pseudoType ? '::' + node.pseudoType : ''} ${cls ? cls[1].slice(0, 30) : ''}`,
        );
      } catch {
        names.push('gone');
      }
    }
    console.log(
      'C16PEAK ' +
        JSON.stringify({
          counts: trees.map(t => `${t.at}:${t.n}`),
          peakN: peak.n,
          peakAt: peak.at,
          firstSwitchAfterOriginMs: Math.round(first - origin),
          names,
        }),
    );
  });
});
