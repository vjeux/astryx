// Copyright (c) Meta Platforms, Inc. and affiliates.

/**
 * @file ToastCatch.interaction.browser.spec.ts
 * @input The error Toast story (no auto-hide) on a phone, under a finger
 * @output Proves that a finger catches the card while it springs back and
 *   while it leaves, holds it there, then moves it. A card caught on its way
 *   out, or dismissed during a drag, leaves at the lift. Under reduced motion
 *   a spring-back fades once. A dragging or catching finger starts no text
 *   selection; a still hold on a resting card can. A tap, a drag or a
 *   dismissal during the entrance leaves it running. Under reduced motion
 *   the dismissal fades from there, and a spring-back or a catch then shows
 *   the card at full opacity. A lost lift ends at the next touch
 * @position Toast's interaction proofs that its motion is interruptible
 */

import {
  expect,
  test,
  type Locator,
  type Page,
} from '@astryxdesign/a11y-spec/playwright';
import {
  advanceFrozenPage,
  freezePage,
  installPageFreeze,
  installTimerGate,
  openStory,
  thawPage,
  touchDriver,
  waitForRest,
  withStorybook,
  type HeldTouch,
  type TouchFrame,
  type TouchScript,
} from '@astryxdesign/interaction-harness';
import {toast as TOAST} from '../../motion/uikit/toast';

const storybook = withStorybook(test);

test.use({
  viewport: {width: 390, height: 844},
  isMobile: true,
  hasTouch: true,
});

const FRAME_MS = 1000 / 60;

interface CardFrame {
  t: number;
  /** The card's vertical translate (px), or null once it is gone. */
  y: number | null;
}

/** When each touch landed, first moved and lifted, on the page's clock. */
interface TouchTimes {
  down: number;
  firstMove: number | null;
  up: number | null;
}

interface Recorder {
  __frames: CardFrame[];
  __touches: TouchTimes[];
}

/** Shows the error toast, which stays until it is dismissed, at rest. */
async function showToast(page: Page): Promise<Locator> {
  await openStory(page, storybook(), 'core-toast--error-persists');
  await page
    .getByRole('button', {name: 'Trigger error'})
    .evaluate(element => (element as HTMLElement).click());
  const card = page.locator('.astryx-toast').first();
  await expect(card).toBeVisible();
  await waitForRest(card);
  return card;
}

/**
 * Records, in the page, the card's translate on every frame and when each
 * touch lands, first moves and lifts. A read per frame in the page keeps the
 * script in real time. The times are the page's clock when each event runs:
 * an event's own time stamp can follow the script's clock instead.
 */
async function recordCard(page: Page): Promise<void> {
  await page.evaluate(() => {
    const recorder = window as unknown as Recorder;
    recorder.__frames = [];
    recorder.__touches = [];
    const current = () => recorder.__touches[recorder.__touches.length - 1];
    const options = {capture: true, passive: true};
    window.addEventListener(
      'touchstart',
      () => {
        recorder.__touches.push({
          down: performance.now(),
          firstMove: null,
          up: null,
        });
      },
      options,
    );
    window.addEventListener(
      'touchmove',
      () => {
        const touch = current();
        if (touch != null && touch.firstMove == null) {
          touch.firstMove = performance.now();
        }
      },
      options,
    );
    window.addEventListener(
      'touchend',
      () => {
        const touch = current();
        if (touch != null) {
          touch.up = performance.now();
        }
      },
      options,
    );
    const tick = (t: number) => {
      const card = document.querySelector('.astryx-toast');
      let y: number | null = null;
      if (card != null) {
        const value = getComputedStyle(card).translate;
        const [, ty = '0px'] = value === 'none' ? [] : value.split(' ');
        y = Number.parseFloat(ty);
      }
      recorder.__frames.push({t, y});
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  });
}

async function readRecord(page: Page): Promise<Recorder> {
  return page.evaluate(() => {
    const {__frames, __touches} = window as unknown as Recorder;
    return {__frames, __touches};
  });
}

/**
 * Waits in the page until the card has moved `by` px from `from` toward
 * `toward`, and returns its box then. A finger then lands mid-motion,
 * whatever the driver's pacing.
 */
async function waitForMotion(
  page: Page,
  from: number,
  toward: number,
  by: number,
): Promise<{x: number; y: number}> {
  const handle = await page.waitForFunction(
    ({from, toward, by}) => {
      const card = document.querySelector('.astryx-toast');
      if (card == null) {
        return null;
      }
      const value = getComputedStyle(card).translate;
      const [, ty = '0px'] = value === 'none' ? [] : value.split(' ');
      const y = Number.parseFloat(ty);
      if (Math.sign(toward - from) * (y - from) < by) {
        return null;
      }
      const box = card.getBoundingClientRect();
      return {x: box.left + box.width * 0.3, y: box.top + box.height / 2};
    },
    {from, toward, by},
    {polling: 'raf'},
  );
  const at = (await handle.jsonValue()) as {x: number; y: number};
  return {x: Math.round(at.x), y: Math.round(at.y)};
}

/** One finger's frames from `fromMs`, every frame, held at `at`. */
function hold(
  id: number,
  at: {x: number; y: number},
  fromMs: number,
  forMs: number,
): TouchFrame[] {
  const frames: TouchFrame[] = [];
  for (let t = fromMs; t <= fromMs + forMs; t += FRAME_MS) {
    frames.push({t: +t.toFixed(3), fingers: [{id, ...at}]});
  }
  return frames;
}

/** One finger's frames from `fromMs`, moving from `from` to `to` over `forMs`. */
function move(
  id: number,
  from: {x: number; y: number},
  to: {x: number; y: number},
  fromMs: number,
  forMs: number,
): TouchFrame[] {
  const frames: TouchFrame[] = [];
  const steps = Math.max(1, Math.round(forMs / FRAME_MS));
  for (let i = 1; i <= steps; i += 1) {
    const k = i / steps;
    frames.push({
      t: +(fromMs + (forMs * i) / steps).toFixed(3),
      fingers: [
        {
          id,
          x: Math.round(from.x + (to.x - from.x) * k),
          y: Math.round(from.y + (to.y - from.y) * k),
        },
      ],
    });
  }
  return frames;
}

/** The card's translates between two times, skipping frames without it. */
function between(frames: CardFrame[], fromMs: number, toMs: number): number[] {
  return frames
    .filter(frame => frame.t >= fromMs && frame.t <= toMs)
    .map(frame => frame.y)
    .filter((y): y is number => y != null);
}

function spread(values: number[]): number {
  return Math.max(...values) - Math.min(...values);
}

test('a finger catches a card that springs back where it shows, and the card follows the finger', async ({
  page,
}) => {
  const card = await showToast(page);
  const box = await card.boundingBox();
  if (box == null) {
    throw new Error('no toast');
  }
  const driver = await touchDriver(page);
  await recordCard(page);
  // A bottom toast. The finger moves 20 px toward its edge, so the swipe
  // begins. Then it turns back 140 px up and rests: the card stretches up,
  // and it springs back when the finger lifts.
  const start = {
    x: Math.round(box.x + box.width / 2),
    y: Math.round(box.y + box.height / 2),
  };
  const begun = {x: start.x, y: start.y + 20};
  const stretched = {x: start.x, y: start.y - 120};
  const first: TouchFrame[] = [
    {t: 0, fingers: [{id: 0, ...start}]},
    ...move(0, start, begun, 0, 60),
    ...move(0, begun, stretched, 60, 220),
    ...hold(0, stretched, 280 + FRAME_MS, 60),
  ];
  const lift = first[first.length - 1].t + FRAME_MS;
  await driver.play([...first, {t: +lift.toFixed(3), fingers: []}]);
  // Once the spring has moved the card 5 px back, a second touch lands on it.
  // It holds still, then moves 40 px toward the edge.
  const stretchedY = Math.min(
    ...between(
      (await readRecord(page)).__frames,
      Number.NEGATIVE_INFINITY,
      Number.POSITIVE_INFINITY,
    ),
  );
  const catchAt = await waitForMotion(page, stretchedY, 0, 5);
  const moved = {x: catchAt.x, y: catchAt.y + 40};
  const second: TouchFrame[] = [
    ...hold(1, catchAt, 0, 150),
    ...move(1, catchAt, moved, 150, 160),
  ];
  await driver.play([
    ...second,
    {t: +(second[second.length - 1].t + FRAME_MS).toFixed(3), fingers: []},
  ]);
  const {__frames: frames, __touches: touches} = await readRecord(page);
  expect(touches, 'two touches landed').toHaveLength(2);
  const {down, firstMove, up} = touches[1];
  if (firstMove == null || up == null) {
    throw new Error('the second touch did not move and lift');
  }
  expect(
    spread(between(frames, down - 6 * FRAME_MS, down)),
    'the card springs back before the catch (px)',
  ).toBeGreaterThan(2);
  const held = between(frames, down + 2 * FRAME_MS, firstMove - FRAME_MS);
  expect(held.length, 'frames while the finger holds').toBeGreaterThan(4);
  expect(
    spread(held),
    'the card stays where the finger caught it (px)',
  ).toBeLessThanOrEqual(1);
  expect(
    Math.abs(held[0]),
    'the finger caught it away from rest (px)',
  ).toBeGreaterThan(5);
  // The card follows the finger toward the edge at the follow ratio, past
  // the dead zone measured from where the finger landed.
  const followed = between(frames, up - 3 * FRAME_MS, up);
  expect(followed.length, 'frames at the end of the move').toBeGreaterThan(0);
  expect(
    Math.max(...followed) - held[0],
    'the card follows the finger toward its edge (px)',
  ).toBeGreaterThan(0.5 * TOAST.followRatio * (40 - TOAST.followFrom));
});

test('a finger catches a card on its way out where it shows, and the card leaves once the finger lifts', async ({
  page,
}) => {
  const card = await showToast(page);
  const box = await card.boundingBox();
  if (box == null) {
    throw new Error('no toast');
  }
  const driver = await touchDriver(page);
  await recordCard(page);
  // The close button starts the retract. Once the card has started to leave,
  // a finger lands on its text and holds still.
  await page
    .getByRole('button', {name: 'Dismiss notification'})
    .evaluate(element => (element as HTMLElement).click());
  const catchAt = await waitForMotion(page, 0, box.height, 2);
  const held = hold(0, catchAt, 0, 160);
  const script: TouchScript = [
    ...held,
    {t: +(held[held.length - 1].t + FRAME_MS).toFixed(3), fingers: []},
  ];
  await driver.play(script);
  const {__frames: frames, __touches: touches} = await readRecord(page);
  expect(touches, 'one touch landed').toHaveLength(1);
  const {down, up} = touches[0];
  if (up == null) {
    throw new Error('the touch did not lift');
  }
  const whileHeld = frames.filter(
    frame => frame.t >= down + 2 * FRAME_MS && frame.t <= up - FRAME_MS,
  );
  expect(
    whileHeld.every(frame => frame.y != null),
    'the card stays in the page while the finger holds it',
  ).toBe(true);
  const ys = whileHeld.map(frame => frame.y as number);
  expect(ys.length, 'frames while the finger holds').toBeGreaterThan(4);
  expect(
    spread(ys),
    'the card stays where the finger caught it (px)',
  ).toBeLessThanOrEqual(1);
  expect(ys[0], 'the card had started to leave (px)').toBeGreaterThan(0.5);
  // Its toast is dismissed, so the card leaves when the finger lifts.
  await expect(page.locator('.astryx-toast')).toHaveCount(0, {timeout: 3000});
});

test('a dismissal while a finger drags the card lets the card leave once the finger lifts', async ({
  page,
}) => {
  const card = await showToast(page);
  const box = await card.boundingBox();
  if (box == null) {
    throw new Error('no toast');
  }
  const driver = await touchDriver(page);
  // The close button dismisses the toast after the finger's third move,
  // while the finger drags the card.
  await page
    .getByRole('button', {name: 'Dismiss notification'})
    .evaluate(element => {
      let moves = 0;
      window.addEventListener(
        'touchmove',
        () => {
          moves += 1;
          if (moves === 3) {
            setTimeout(() => (element as HTMLElement).click(), 0);
          }
        },
        {capture: true, passive: true},
      );
    });
  // The finger drags the bottom toast 24 px toward its edge, then brings it
  // back to 4 px and rests. So the lift alone would not dismiss it.
  const start = {
    x: Math.round(box.x + box.width * 0.3),
    y: Math.round(box.y + box.height / 2),
  };
  const out = {x: start.x, y: start.y + 24};
  const back = {x: start.x, y: start.y + 4};
  const frames: TouchFrame[] = [
    {t: 0, fingers: [{id: 0, ...start}]},
    ...move(0, start, out, 0, 100),
    ...move(0, out, back, 100, 160),
    ...hold(0, back, 260 + FRAME_MS, 60),
  ];
  await driver.play([
    ...frames,
    {t: +(frames[frames.length - 1].t + FRAME_MS).toFixed(3), fingers: []},
  ]);
  // Its toast is dismissed, so the card leaves once the finger lifts.
  await expect(page.locator('.astryx-toast')).toHaveCount(0, {timeout: 3000});
});

test('under reduced motion, a drag that turns back fades the card back to rest once', async ({
  page,
}) => {
  await page.emulateMedia({reducedMotion: 'reduce'});
  const card = await showToast(page);
  const box = await card.boundingBox();
  if (box == null) {
    throw new Error('no toast');
  }
  const driver = await touchDriver(page);
  // The card's opacity on every frame.
  await page.evaluate(() => {
    const recorder = window as unknown as {__opacity: number[]};
    recorder.__opacity = [];
    const tick = () => {
      const element = document.querySelector('.astryx-toast');
      if (element != null) {
        recorder.__opacity.push(
          Number.parseFloat(getComputedStyle(element).opacity),
        );
      }
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  });
  // The finger drags the bottom toast 20 px toward its edge, then 115 px back
  // past where it started. It rests and lifts, and the card springs back.
  const start = {
    x: Math.round(box.x + box.width * 0.3),
    y: Math.round(box.y + box.height / 2),
  };
  const out = {x: start.x, y: start.y + 20};
  const away = {x: start.x, y: start.y - 115};
  const frames: TouchFrame[] = [
    {t: 0, fingers: [{id: 0, ...start}]},
    ...move(0, start, out, 0, 100),
    ...move(0, out, away, 100, 300),
    ...hold(0, away, 400 + FRAME_MS, 60),
  ];
  await driver.play([
    ...frames,
    {t: +(frames[frames.length - 1].t + FRAME_MS).toFixed(3), fingers: []},
  ]);
  await page.waitForTimeout(1000);
  const opacity = await page.evaluate(
    () => (window as unknown as {__opacity: number[]}).__opacity,
  );
  // One fade: the card dips below full opacity once, then stays there.
  let fades = 0;
  let isLow = false;
  for (const value of opacity) {
    if (value < 0.95 && !isLow) {
      fades += 1;
    }
    isLow = value < 0.95;
  }
  expect(fades, 'the spring-back fades once').toBe(1);
  expect(opacity[opacity.length - 1]).toBe(1);
  // The fade over, the card's own transitions are the stylesheet's again.
  expect(
    await card.evaluate(element =>
      (element as HTMLElement).style.getPropertyValue('transition-property'),
    ),
  ).toBe('');
});

test('under a finger the card keeps its own layer from the stylesheet, with no inline will-change', async ({
  page,
}) => {
  const card = await showToast(page);
  const layer = await card.evaluate(element => ({
    computed: getComputedStyle(element).willChange,
    inline: (element as HTMLElement).style.getPropertyValue('will-change'),
  }));
  expect(layer).toEqual({computed: 'translate', inline: ''});
});

test('a finger that drags or catches the card starts no text selection; a still hold on a resting card still can', async ({
  page,
}) => {
  const card = await showToast(page);
  const box = await card.boundingBox();
  if (box == null) {
    throw new Error('no toast');
  }
  const driver = await touchDriver(page);
  await recordCard(page);
  // Each probe asks the card's text for a selection, as a long press does,
  // and records whether the card refused it.
  await page.evaluate(() => {
    const recorder = window as unknown as {__refused: Record<string, boolean>};
    recorder.__refused = {};
    const probe = (label: string) => {
      const element = document.querySelector('.astryx-toast');
      if (element == null) {
        return;
      }
      const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT);
      let text = walker.nextNode();
      while (text != null && (text.textContent ?? '').trim() === '') {
        text = walker.nextNode();
      }
      const event = new Event('selectstart', {bubbles: true, cancelable: true});
      (text?.parentElement ?? element).dispatchEvent(event);
      recorder.__refused[label] = event.defaultPrevented;
    };
    let touches = 0;
    let moves = 0;
    const options = {capture: true, passive: true};
    window.addEventListener(
      'touchstart',
      () => {
        touches += 1;
        moves = 0;
        const touch = touches;
        setTimeout(() => probe(`hold ${touch}`), 100);
      },
      options,
    );
    window.addEventListener(
      'touchmove',
      () => {
        moves += 1;
        if (moves === 8) {
          probe(`drag ${touches}`);
        }
      },
      options,
    );
    window.addEventListener(
      'touchend',
      () => {
        const touch = touches;
        setTimeout(() => probe(`after ${touch}`), 30);
      },
      options,
    );
  });
  const start = {
    x: Math.round(box.x + box.width / 2),
    y: Math.round(box.y + box.height / 2),
  };
  // First a still hold on the resting card.
  await driver.play([
    ...hold(0, start, 0, 300),
    {t: 300 + FRAME_MS, fingers: []},
  ]);
  // Then a drag: 20 px toward the edge, so the swipe claims the touch, then
  // 140 px back. The card stretches and springs back at the lift.
  const begun = {x: start.x, y: start.y + 20};
  const stretched = {x: start.x, y: start.y - 120};
  const drag: TouchFrame[] = [
    {t: 0, fingers: [{id: 1, ...start}]},
    ...move(1, start, begun, 0, 60),
    ...move(1, begun, stretched, 60, 220),
    ...hold(1, stretched, 280 + FRAME_MS, 60),
  ];
  await driver.play([
    ...drag,
    {t: +(drag[drag.length - 1].t + FRAME_MS).toFixed(3), fingers: []},
  ]);
  // Then a finger catches the springing card and holds it.
  const stretchedY = Math.min(
    ...between(
      (await readRecord(page)).__frames,
      Number.NEGATIVE_INFINITY,
      Number.POSITIVE_INFINITY,
    ),
  );
  const catchAt = await waitForMotion(page, stretchedY, 0, 5);
  await driver.play([
    ...hold(2, catchAt, 0, 300),
    {t: 300 + FRAME_MS, fingers: []},
  ]);
  await page.waitForTimeout(100);
  const refused = await page.evaluate(
    () => (window as unknown as {__refused: Record<string, boolean>}).__refused,
  );
  expect(refused['hold 1'], 'a still hold on a resting card can select').toBe(
    false,
  );
  expect(refused['drag 2'], 'a drag starts no selection').toBe(true);
  expect(refused['after 2'], 'the lift lets selection start again').toBe(false);
  expect(
    refused['hold 3'],
    'a finger that catches the card starts no selection',
  ).toBe(true);
  expect(refused['after 3'], 'the lift lets selection start again').toBe(false);
});

test('a card caught by a finger whose lift the page never hears leaves after a tap on its close button', async ({
  page,
}) => {
  // The page never hears the second finger lift: its touchend and pointerup
  // stop at the window before the app's own listeners, added first.
  await page.addInitScript(() => {
    let touches = 0;
    let second: number | null = null;
    window.addEventListener(
      'touchstart',
      event => {
        for (const touch of Array.from(event.changedTouches)) {
          touches += 1;
          if (touches === 2) {
            second = touch.identifier;
          }
        }
      },
      {capture: true},
    );
    window.addEventListener(
      'touchend',
      event => {
        if (
          Array.from(event.changedTouches).some(
            touch => touch.identifier === second,
          )
        ) {
          event.stopImmediatePropagation();
        }
      },
      {capture: true},
    );
    let pointers = 0;
    let secondPointer: number | null = null;
    window.addEventListener(
      'pointerdown',
      event => {
        pointers += 1;
        if (pointers === 2) {
          secondPointer = event.pointerId;
        }
      },
      {capture: true},
    );
    for (const type of ['pointerup', 'pointercancel', 'lostpointercapture']) {
      window.addEventListener(
        type,
        event => {
          if ((event as PointerEvent).pointerId === secondPointer) {
            event.stopImmediatePropagation();
          }
        },
        {capture: true},
      );
    }
  });
  const card = await showToast(page);
  const box = await card.boundingBox();
  if (box == null) {
    throw new Error('no toast');
  }
  const driver = await touchDriver(page);
  // A flick toward the bottom edge dismisses the toast, and a second finger
  // catches the leaving card.
  const start = {
    x: Math.round(box.x + box.width * 0.3),
    y: Math.round(box.y + box.height / 2),
  };
  const flicked = {x: start.x, y: start.y + 40};
  const flick: TouchFrame[] = [
    {t: 0, fingers: [{id: 0, ...start}]},
    ...move(0, start, flicked, 0, 50),
  ];
  await driver.play([
    ...flick,
    {t: +(flick[flick.length - 1].t + FRAME_MS).toFixed(3), fingers: []},
  ]);
  const caught = {x: start.x, y: start.y + 8};
  await driver.play([
    ...hold(1, caught, 0, 150),
    {t: 150 + FRAME_MS, fingers: []},
  ]);
  await page.waitForTimeout(300);
  await expect(card, 'the card stays caught').toBeVisible();
  // The tap on its close button tells the page that finger is gone.
  const close = page.getByRole('button', {name: 'Dismiss notification'});
  const closeBox = await close.boundingBox();
  if (closeBox == null) {
    throw new Error('no close button');
  }
  const tap = {
    x: Math.round(closeBox.x + closeBox.width / 2),
    y: Math.round(closeBox.y + closeBox.height / 2),
  };
  await driver.play([
    {t: 0, fingers: [{id: 2, ...tap}]},
    {t: 60, fingers: []},
  ]);
  await expect(page.locator('.astryx-toast')).toHaveCount(0, {timeout: 3000});
});

/**
 * How far into its entrance the scene stops a toast for the entrance proofs.
 * The card then still fades in, however slowly the page or the test process
 * runs.
 */
const ENTERING_MS = 300;

/**
 * Opens the error toast with a slow entrance and stops the scene
 * `ENTERING_MS` into it. The entrance starts in the frozen scene, so it is
 * held at its start until the scene steps on. The scene stays frozen.
 */
async function freezeEnteringToast(page: Page): Promise<Locator> {
  await installPageFreeze(page);
  await openStory(page, storybook(), 'core-toast--error-persists');
  await installTimerGate(page);
  await page.addStyleTag({
    content: '.astryx-toast { transition-duration: 2s !important; }',
  });
  await freezePage(page);
  await page
    .getByRole('button', {name: 'Trigger error'})
    .evaluate(element => (element as HTMLElement).click());
  const card = page.locator('.astryx-toast').first();
  await expect(card).toBeVisible();
  await advanceFrozenPage(page, ENTERING_MS);
  return card;
}

/** The card's opacity, its vertical translate (px) and whether it is in view. */
async function readCard(
  card: Locator,
): Promise<{opacity: number; y: number; inView: boolean}> {
  return card.evaluate(element => {
    const style = getComputedStyle(element);
    const [, ty = '0px'] =
      style.translate === 'none' ? [] : style.translate.split(' ');
    const rect = element.getBoundingClientRect();
    return {
      opacity: Number.parseFloat(style.opacity),
      y: Number.parseFloat(ty),
      inView:
        rect.bottom > 0 &&
        rect.top < innerHeight &&
        rect.right > 0 &&
        rect.left < innerWidth,
    };
  });
}

/** Where a finger lands on the card: left of its middle, clear of its button. */
async function cardPoint(card: Locator): Promise<{x: number; y: number}> {
  const box = await card.boundingBox();
  if (box == null) {
    throw new Error('no toast');
  }
  return {
    x: Math.round(box.x + box.width * 0.3),
    y: Math.round(box.y + box.height / 2),
  };
}

/**
 * Drags a held finger `by` px down, 5 px a frame, each move a frame of the
 * frozen scene's own time after the last.
 */
async function dragFrozen(
  page: Page,
  finger: HeldTouch,
  from: {x: number; y: number},
  by: number,
): Promise<void> {
  for (let dy = 5; dy <= by; dy += 5) {
    await advanceFrozenPage(page, FRAME_MS);
    await finger.move({x: from.x, y: from.y + dy});
  }
}

test('a tap on the card during its entrance leaves the entrance running', async ({
  page,
}) => {
  const card = await freezeEnteringToast(page);
  const before = await readCard(card);
  expect(before.opacity, 'the card still fades in').toBeLessThan(0.9);
  const at = await cardPoint(card);
  const driver = await touchDriver(page);
  await driver.play([
    {t: 0, fingers: [{id: 0, ...at}]},
    {t: 60, fingers: []},
  ]);
  // The tap moved nothing, so the entrance stands where the scene stopped it.
  expect(await readCard(card), 'the card after the tap').toEqual(before);
  await thawPage(page);
  await expect(card).toHaveCSS('opacity', '1', {timeout: 5000});
});

test('a drag during the entrance takes the card from where it shows', async ({
  page,
}) => {
  const card = await freezeEnteringToast(page);
  const before = await readCard(card);
  expect(before.opacity, 'the card fades in before the drag').toBeLessThan(0.9);
  const start = await cardPoint(card);
  const driver = await touchDriver(page);
  const finger = await driver.press(start);
  await dragFrozen(page, finger, start, 40);
  const dragged = await readCard(card);
  await thawPage(page);
  await finger.lift();
  expect(dragged.y, 'the card follows the finger').toBeGreaterThan(2);
  // The entrance runs on under the finger: the card is no fainter than before
  // the drag, and its entrance is not cut to full opacity.
  expect(dragged.opacity).toBeGreaterThanOrEqual(before.opacity);
  expect(dragged.opacity, 'the entrance runs on under the finger').toBeLessThan(
    0.9,
  );
});

test('a dismissal during the entrance slides the card out from where it shows', async ({
  page,
}) => {
  const card = await freezeEnteringToast(page);
  const before = await readCard(card);
  expect(before.opacity, 'the card fades in before the dismissal').toBeLessThan(
    0.9,
  );
  await page
    .getByRole('button', {name: 'Dismiss notification'})
    .evaluate(element => (element as HTMLElement).click());
  // The scene steps 60 ms into the exit, and the entrance runs on with it.
  await advanceFrozenPage(page, 60);
  const leaving = await readCard(card);
  await thawPage(page);
  expect(leaving.y, 'the card slides toward its edge').toBeGreaterThan(0);
  expect(leaving.opacity).toBeGreaterThanOrEqual(before.opacity);
  expect(
    leaving.opacity,
    'the entrance runs on as the card leaves',
  ).toBeLessThan(0.9);
  await expect(page.locator('.astryx-toast')).toHaveCount(0, {timeout: 3000});
});

test('under reduced motion, a dismissal during the entrance fades the card out from where it shows', async ({
  page,
}) => {
  await page.emulateMedia({reducedMotion: 'reduce'});
  const card = await freezeEnteringToast(page);
  const before = await readCard(card);
  expect(before.opacity, 'the card still fades in').toBeLessThan(0.9);
  await page
    .getByRole('button', {name: 'Dismiss notification'})
    .evaluate(element => (element as HTMLElement).click());
  // The fade, read at its start and then 40 and 80 ms into it.
  const fading = [await readCard(card)];
  for (const step of [40, 40]) {
    await advanceFrozenPage(page, step);
    fading.push(await readCard(card));
  }
  await thawPage(page);
  expect(
    fading.every(frame => frame.inView),
    'the card fades in place',
  ).toBe(true);
  expect(
    fading[0].opacity,
    'the fade starts where the card shows',
  ).toBeLessThanOrEqual(before.opacity);
  expect(fading[1].opacity, 'the card fades').toBeLessThan(fading[0].opacity);
  expect(fading[2].opacity, 'the card fades').toBeLessThan(fading[1].opacity);
  await expect(page.locator('.astryx-toast')).toHaveCount(0, {timeout: 3000});
});

test('under reduced motion, a spring-back during the entrance ends at full opacity', async ({
  page,
}) => {
  await page.emulateMedia({reducedMotion: 'reduce'});
  const card = await freezeEnteringToast(page);
  expect(
    (await readCard(card)).opacity,
    'the card still fades in',
  ).toBeLessThan(0.9);
  const start = await cardPoint(card);
  const driver = await touchDriver(page);
  const finger = await driver.press(start);
  await dragFrozen(page, finger, start, 30);
  // The finger rests, then lifts short of dismissing: the card fades back to
  // rest, and the scene steps past that fade.
  await advanceFrozenPage(page, 100);
  await finger.lift();
  await advanceFrozenPage(page, 300);
  const rested = await readCard(card);
  await thawPage(page);
  expect(rested.inView, 'the card stays').toBe(true);
  expect(rested.opacity, 'the card at rest').toBeGreaterThan(0.99);
});

test('under reduced motion, a finger that catches a dismissal during the entrance holds the card at full opacity', async ({
  page,
}) => {
  await page.emulateMedia({reducedMotion: 'reduce'});
  const card = await freezeEnteringToast(page);
  const at = await cardPoint(card);
  const driver = await touchDriver(page);
  // The close button starts the fade, and a finger lands on the card 40 ms
  // into it, then holds still for 300 ms.
  await page
    .getByRole('button', {name: 'Dismiss notification'})
    .evaluate(element => (element as HTMLElement).click());
  await advanceFrozenPage(page, 40);
  const fading = await readCard(card);
  const finger = await driver.press(at);
  const held = [await readCard(card)];
  await advanceFrozenPage(page, 300);
  held.push(await readCard(card));
  await thawPage(page);
  await finger.lift();
  expect(fading.opacity, 'the card fades when the finger lands').toBeLessThan(
    0.9,
  );
  expect(
    held.every(frame => frame.inView),
    'the card stays in view under the finger',
  ).toBe(true);
  // A caught fade finishes, and the card shows at its own opacity.
  expect(
    Math.min(...held.map(frame => frame.opacity)),
    'the card under the finger',
  ).toBeGreaterThan(0.99);
  // Its toast is dismissed, so the card leaves when the finger lifts.
  await expect(page.locator('.astryx-toast')).toHaveCount(0, {timeout: 3000});
});
