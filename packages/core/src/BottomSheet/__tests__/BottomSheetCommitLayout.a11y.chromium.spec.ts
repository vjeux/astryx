// Copyright (c) Meta Platforms, Inc. and affiliates.
// @pr-a11y scope DateInput

/**
 * @file BottomSheetCommitLayout.a11y.chromium.spec.ts
 * @input Built stories, real Chromium touch input, and a CDP trace that keeps
 *   the JavaScript stack of each style recalculation and layout
 * @output Browser evidence that a tap that renders an open sheet again forces
 *   no style recalculation or layout in its task. That holds for the month and
 *   year toggle in DateInput's sheet and for a checkbox in a BottomSheet. A
 *   control proves that the trace sees a forced layout in a tap's task.
 * @position Chromium proof for BottomSheetPanel's viewport height. The sheet
 *   renders from the height its resize listener keeps, so a commit never reads
 *   `innerHeight` after its DOM writes.
 */

import {
  expect,
  test,
  type Locator,
  type Page,
} from '@astryxdesign/a11y-spec/playwright';
import {
  DEFAULT_STORYBOOK_DIR,
  serveStorybook,
  type StaticServer,
} from '@astryxdesign/a11y-spec/storybook';

let storybook: StaticServer;
test.beforeAll(async () => {
  storybook = await serveStorybook(
    process.env.ASTRYX_STORYBOOK_DIR ?? DEFAULT_STORYBOOK_DIR,
  );
});
test.afterAll(async () => {
  await storybook?.close();
});

test.use({hasTouch: true, isMobile: true, viewport: {width: 390, height: 844}});

interface TraceFrame {
  functionName?: string;
  url?: string;
  lineNumber?: number;
  columnNumber?: number;
}

interface TraceEvent {
  name: string;
  ph: string;
  ts: number;
  dur?: number;
  pid: number;
  tid: number;
  args?: {
    data?: {type?: string};
    beginData?: {stackTrace?: TraceFrame[]};
  };
}

/** A style recalculation or layout that script forced, with its stack. */
interface ForcedWork {
  name: string;
  ms: number;
  stack: string;
}

/** The tap's events: a touch tap dispatches these in its own task. */
const TAP_EVENTS = new Set(['pointerup', 'touchend', 'mouseup', 'click']);

/**
 * Taps `target` with a real touch and returns the style recalculations and
 * layouts that script forced in the tasks that dispatched the tap.
 */
async function forcedWorkInTap(
  page: Page,
  target: Locator,
): Promise<ForcedWork[]> {
  const box = await target.boundingBox();
  if (box == null) {
    throw new Error('no target box');
  }
  const x = box.x + box.width / 2;
  const y = box.y + box.height / 2;
  const cdp = await page.context().newCDPSession(page);
  const events: TraceEvent[] = [];
  cdp.on('Tracing.dataCollected', ({value}) => {
    events.push(...(value as unknown as TraceEvent[]));
  });
  const complete = new Promise<void>(resolve => {
    cdp.once('Tracing.tracingComplete', () => resolve());
  });
  await cdp.send('Tracing.start', {
    transferMode: 'ReportEvents',
    traceConfig: {
      includedCategories: [
        'devtools.timeline',
        'disabled-by-default-devtools.timeline',
        'disabled-by-default-devtools.timeline.stack',
      ],
      excludedCategories: ['*'],
    },
  });
  await cdp.send('Input.dispatchTouchEvent', {
    type: 'touchStart',
    touchPoints: [{x, y}],
  });
  await cdp.send('Input.dispatchTouchEvent', {
    type: 'touchEnd',
    touchPoints: [],
  });
  // Two frames after the tap: its task and the frame after it are traced.
  await page.evaluate(
    () =>
      new Promise(resolve => {
        requestAnimationFrame(() => requestAnimationFrame(resolve));
      }),
  );
  await cdp.send('Tracing.end');
  await complete;
  await cdp.detach().catch(() => {});

  const dispatches = events.filter(
    e =>
      e.name === 'EventDispatch' &&
      e.ph === 'X' &&
      TAP_EVENTS.has(e.args?.data?.type ?? ''),
  );
  if (!dispatches.some(e => e.args?.data?.type === 'click')) {
    throw new Error('the trace has no click');
  }
  const tasks = events.filter(
    task =>
      task.name === 'RunTask' &&
      task.ph === 'X' &&
      dispatches.some(
        e =>
          e.pid === task.pid &&
          e.tid === task.tid &&
          e.ts >= task.ts &&
          e.ts <= task.ts + (task.dur ?? 0),
      ),
  );
  return events
    .filter(
      e =>
        (e.name === 'UpdateLayoutTree' || e.name === 'Layout') &&
        e.ph === 'X' &&
        (e.args?.beginData?.stackTrace?.length ?? 0) > 0 &&
        tasks.some(
          task =>
            e.pid === task.pid &&
            e.tid === task.tid &&
            e.ts >= task.ts &&
            e.ts <= task.ts + (task.dur ?? 0),
        ),
    )
    .map(e => ({
      name: e.name,
      ms: Math.round((e.dur ?? 0) / 100) / 10,
      stack: (e.args?.beginData?.stackTrace ?? [])
        .slice(0, 4)
        .map(
          frame =>
            `${frame.functionName || '<anonymous>'} ${frame.url?.split('/').pop() ?? ''}:${frame.lineNumber}:${frame.columnNumber}`,
        )
        .join(' < '),
    }));
}

/** Waits until nothing animates on the page. */
async function waitForStill(page: Page): Promise<void> {
  await expect
    .poll(() =>
      page.evaluate(
        () =>
          document
            .getAnimations()
            .filter(animation => animation.playState === 'running').length,
      ),
    )
    .toBe(0);
}

async function openDateSheet(page: Page): Promise<Locator> {
  await page.goto(
    `${storybook.origin}/iframe.html?id=core-dateinput--bottom-sheet-wide-range&viewMode=story`,
  );
  await page.getByRole('combobox', {name: 'Date of birth'}).tap();
  const dialog = page.getByRole('dialog');
  await expect(dialog).toBeVisible();
  const toggle = dialog.locator('button[data-title="month-year"]');
  await expect(toggle).toHaveAttribute('aria-expanded', 'false');
  await waitForStill(page);
  return toggle;
}

test("the month and year toggle in DateInput's sheet forces no style recalculation or layout in its tap", async ({
  page,
}) => {
  const toggle = await openDateSheet(page);
  const forced = await forcedWorkInTap(page, toggle);
  await expect(toggle).toHaveAttribute('aria-expanded', 'true');
  expect(forced, JSON.stringify(forced, null, 2)).toEqual([]);
});

test("a checkbox in a BottomSheet's content forces no style recalculation or layout in its tap", async ({
  page,
}) => {
  await page.goto(
    `${storybook.origin}/iframe.html?id=core-bottomsheet--showcase&viewMode=story`,
  );
  await page.getByRole('button', {name: 'Open sheet'}).tap();
  const dialog = page.getByRole('dialog', {name: 'Filters'});
  await expect(dialog).toBeVisible();
  await waitForStill(page);
  const checkbox = dialog.getByRole('checkbox', {name: 'In stock'});
  await expect(checkbox).not.toBeChecked();
  const forced = await forcedWorkInTap(page, checkbox);
  await expect(checkbox).toBeChecked();
  expect(forced, JSON.stringify(forced, null, 2)).toEqual([]);
});

test("the trace sees a layout that script forces in a tap's task", async ({
  page,
}) => {
  const toggle = await openDateSheet(page);
  // The control: the tap's own click forces a layout.
  await page.evaluate(() => {
    document.addEventListener(
      'click',
      () => {
        document.body.style.paddingTop = '1px';
        void document.body.offsetHeight;
        document.body.style.removeProperty('padding-top');
      },
      {capture: true, once: true},
    );
  });
  const forced = await forcedWorkInTap(page, toggle);
  expect(forced.some(work => work.name === 'Layout')).toBe(true);
});
