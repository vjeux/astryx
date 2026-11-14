// Copyright (c) Meta Platforms, Inc. and affiliates.

/**
 * @file AlertDialogCloseTask.interaction.browser.spec.ts
 * @input The built AlertDialog Delete story on the phone profile, real touch
 *   input and the interaction harness
 * @output Proofs about the task that closes the alert under a finger: it
 *   reads none of the theme's exit timing, and in Chrome's engine a trace of
 *   its length and of the style recalculations that its script forced, at
 *   full speed and at 4× CPU, written as evidence
 * @position Motion lane of AlertDialog, beside the motion spec. Run with
 *   `pnpm test:interaction AlertDialog`.
 */

import {expect, test, type Page} from '@astryxdesign/a11y-spec/playwright';
import {
  openStory,
  touchDriver,
  waitForRest,
  withStorybook,
  writeEvidence,
} from '@astryxdesign/interaction-harness';

const storybook = withStorybook(test);

/** The theme's exit timing, which the dismissal plays. */
const EXIT_TOKENS = ['--duration-exit', '--ease-exit'];

/** Closes per CPU rate in the traced proof. */
const TAKES = 4;

interface TokenRead {
  readonly phase: string;
  readonly property: string;
  readonly isDialog: boolean;
}

interface TraceEvent {
  readonly name: string;
  readonly ph?: string;
  readonly ts: number;
  readonly dur?: number;
  readonly pid: number;
  readonly tid: number;
  readonly args?: {
    readonly data?: {readonly type?: unknown};
    readonly beginData?: {
      readonly stackTrace?: ReadonlyArray<{
        readonly functionName?: string;
        readonly url?: string;
      }>;
    };
  };
}

/** The task that closes the alert, as a trace shows it. */
interface CloseTask {
  readonly rate: number;
  readonly take: number;
  /** The length of the task that ran the tap's touchend, ms. */
  readonly taskMs: number;
  /** Style recalculations in that task that a script call forced. */
  readonly forcedRecalcs: number;
  /** Their time, ms. */
  readonly forcedRecalcMs: number;
  /** Every style recalculation in that task. */
  readonly recalcs: number;
  /** Layout in that task, ms. */
  readonly layoutMs: number;
  /** The script frame that forced each of those recalculations. */
  readonly forcedBy: ReadonlyArray<string>;
}

const median = (values: ReadonlyArray<number>): number => {
  const sorted = [...values].sort((a, b) => a - b);
  const middle = Math.floor(sorted.length / 2);
  return sorted.length % 2 === 1
    ? sorted[middle]
    : (sorted[middle - 1] + sorted[middle]) / 2;
};

/**
 * Opens the Delete story's alert with a tap and waits until it has entered.
 * `beforeTap` runs on the loaded story, before the tap.
 */
async function openAlert(page: Page, beforeTap?: () => Promise<void>) {
  await openStory(page, storybook(), 'core-alertdialog--delete');
  await beforeTap?.();
  const driver = await touchDriver(page);
  const trigger = page.getByRole('button', {name: 'Delete item'});
  const dialog = page.getByRole('alertdialog', {name: 'Delete item?'});
  const box = await trigger.boundingBox();
  if (box == null) {
    throw new Error('the trigger has no box');
  }
  await driver.tap({x: box.x + box.width / 2, y: box.y + box.height / 2});
  await waitForRest(dialog);
  const cancel = await dialog
    .getByRole('button', {name: 'Cancel'})
    .boundingBox();
  if (cancel == null) {
    throw new Error('Cancel has no box');
  }
  return {
    driver,
    dialog,
    cancel: {x: cancel.x + cancel.width / 2, y: cancel.y + cancel.height / 2},
  };
}

/**
 * Records every read of a computed style's property from here on, with the
 * phase the page is in and whether the style is the dialog's.
 */
async function recordStyleReads(page: Page) {
  await page.evaluate(() => {
    const w = window as unknown as {
      __closeTaskPhase: string;
      __closeTaskReads: {phase: string; property: string; isDialog: boolean}[];
    };
    w.__closeTaskPhase = 'idle';
    w.__closeTaskReads = [];
    const owners = new WeakMap<CSSStyleDeclaration, Element>();
    const getComputed = window.getComputedStyle;
    window.getComputedStyle = function (
      element: Element,
      pseudoElement?: string | null,
    ) {
      const style = getComputed.call(window, element, pseudoElement);
      owners.set(style, element);
      return style;
    };
    const getValue = CSSStyleDeclaration.prototype.getPropertyValue;
    CSSStyleDeclaration.prototype.getPropertyValue = function (
      this: CSSStyleDeclaration,
      property: string,
    ) {
      const owner = owners.get(this);
      if (owner != null) {
        w.__closeTaskReads.push({
          phase: w.__closeTaskPhase,
          property,
          isDialog: owner.localName === 'dialog',
        });
      }
      return getValue.call(this, property);
    };
  });
}

async function setPhase(page: Page, phase: string): Promise<void> {
  await page.evaluate(value => {
    (window as unknown as {__closeTaskPhase: string}).__closeTaskPhase = value;
  }, phase);
}

/**
 * Traces `body` and returns the task that ran the tap's touchend: its length,
 * and the style recalculations in it, those that a script call forced apart.
 */
async function traceCloseTask(
  page: Page,
  body: () => Promise<void>,
): Promise<Omit<CloseTask, 'rate' | 'take'>> {
  // The harness's animation recorder stands down while the trace runs, as in
  // traceRendering: its frame callback reads the page's animations, which
  // flushes style.
  const standDown = async (on: boolean) => {
    await page.evaluate(value => {
      const w = window as unknown as {
        __harnessRenderingTrace?: boolean;
        __harnessAnimations?: {resume?: () => void};
      };
      w.__harnessRenderingTrace = value;
      if (!value) {
        w.__harnessAnimations?.resume?.();
      }
    }, on);
  };
  await standDown(true);
  const cdp = await page.context().newCDPSession(page);
  const events: TraceEvent[] = [];
  cdp.on('Tracing.dataCollected', ({value}) => {
    events.push(...(value as unknown as TraceEvent[]));
  });
  const complete = new Promise<void>(resolve =>
    cdp.once('Tracing.tracingComplete', () => resolve()),
  );
  await cdp.send('Tracing.start', {
    transferMode: 'ReportEvents',
    traceConfig: {
      includedCategories: [
        'devtools.timeline',
        'disabled-by-default-devtools.timeline',
        'disabled-by-default-devtools.timeline.stack',
        'blink.user_timing',
        'toplevel',
      ],
      excludedCategories: ['*'],
    },
  });
  try {
    await page.evaluate(() => performance.mark('close-task:start'));
    await body();
    await page.evaluate(() => performance.mark('close-task:end'));
  } finally {
    await cdp.send('Tracing.end');
    await complete;
    await cdp.detach();
    await standDown(false);
  }
  const start = events.find(e => e.name === 'close-task:start');
  const end = events.find(e => e.name === 'close-task:end');
  if (start == null || end == null) {
    throw new Error('the window marks were not traced');
  }
  const onMain = events.filter(
    e =>
      e.pid === start.pid &&
      e.tid === start.tid &&
      e.ph === 'X' &&
      e.dur != null &&
      e.ts >= start.ts &&
      e.ts <= end.ts,
  );
  const touchEnd = onMain.find(
    e => e.name === 'EventDispatch' && e.args?.data?.type === 'touchend',
  );
  if (touchEnd == null) {
    throw new Error("the tap's touchend was not traced");
  }
  // The outermost task around the touchend: the closing commit, the fade and
  // the input hold all run in it.
  const task = onMain
    .filter(
      e =>
        (e.name === 'RunTask' || e.name === 'ThreadControllerImpl::RunTask') &&
        e.ts <= touchEnd.ts &&
        touchEnd.ts <= e.ts + (e.dur ?? 0),
    )
    .reduce<TraceEvent | null>(
      (longest, e) =>
        longest == null || (e.dur ?? 0) > (longest.dur ?? 0) ? e : longest,
      null,
    );
  if (task == null) {
    throw new Error("no task ran the tap's touchend");
  }
  const inTask = onMain.filter(
    e => e.ts >= task.ts && e.ts < task.ts + (task.dur ?? 0),
  );
  const recalcs = inTask.filter(e => e.name === 'UpdateLayoutTree');
  const forced = recalcs.filter(
    e => (e.args?.beginData?.stackTrace?.length ?? 0) > 0,
  );
  const ms = (list: ReadonlyArray<TraceEvent>) =>
    list.reduce((sum, e) => sum + (e.dur ?? 0), 0) / 1000;
  // A built module's file name, without its content hash.
  const fileOf = (url = '') =>
    (url.split('/').pop() ?? '').replace(/-[\w-]{8}\.js$/, '.js');
  return {
    taskMs: (task.dur ?? 0) / 1000,
    forcedRecalcs: forced.length,
    forcedRecalcMs: ms(forced),
    recalcs: recalcs.length,
    layoutMs: ms(inTask.filter(e => e.name === 'Layout')),
    forcedBy: forced.map(e => {
      const top = e.args?.beginData?.stackTrace?.[0];
      return `${fileOf(top?.url)}:${top?.functionName ?? ''}`;
    }),
  };
}

test.describe('under a finger', () => {
  test("the close reads none of the theme's exit timing: the alert read it when it opened", async ({
    page,
  }) => {
    const {driver, dialog, cancel} = await openAlert(page, async () => {
      await recordStyleReads(page);
      await setPhase(page, 'open');
    });
    await setPhase(page, 'close');
    await driver.tap(cancel);
    await expect(dialog).toBeHidden();
    const reads = await page.evaluate(
      () =>
        (window as unknown as {__closeTaskReads: TokenRead[]}).__closeTaskReads,
    );
    const exitReads = (phase: string) =>
      reads.filter(
        read =>
          read.phase === phase &&
          read.isDialog &&
          EXIT_TOKENS.includes(read.property),
      );
    // The close's task reads no exit timing of the alert.
    expect(exitReads('close')).toEqual([]);
    // The record sees such a read: the alert's opening made it.
    expect(exitReads('open').length).toBeGreaterThan(0);
  });
});

test.describe("under a finger in Chrome's engine", () => {
  test.skip(
    ({browserName}) => browserName !== 'chromium',
    "Chrome's engine traces through the DevTools protocol",
  );

  test("the close's task, traced at full speed and at 4× CPU: its length and the style recalculations that its script forced", async ({
    page,
  }, testInfo) => {
    test.setTimeout(180_000);
    const closes: CloseTask[] = [];
    for (const rate of [1, 4]) {
      for (let take = 0; take < TAKES; take += 1) {
        const {driver, dialog, cancel} = await openAlert(page);
        const cdp = await page.context().newCDPSession(page);
        await cdp.send('Emulation.setCPUThrottlingRate', {rate});
        try {
          const traced = await traceCloseTask(page, async () => {
            await driver.tap(cancel);
            await expect(dialog).toBeHidden();
          });
          closes.push({rate, take, ...traced});
        } finally {
          await cdp.send('Emulation.setCPUThrottlingRate', {rate: 1});
          await cdp.detach();
        }
      }
    }
    const summary = [1, 4].map(rate => {
      const at = closes.filter(close => close.rate === rate);
      return {
        rate,
        taskMs: median(at.map(close => close.taskMs)),
        forcedRecalcs: median(at.map(close => close.forcedRecalcs)),
        forcedRecalcMs: median(at.map(close => close.forcedRecalcMs)),
      };
    });
    await writeEvidence(
      'alertdialog-close-task',
      {'chromium.json': JSON.stringify({summary, closes}, null, 2)},
      testInfo,
    );
    for (const close of closes) {
      // Every trace holds the close's task, and its recalculations carry the
      // script that forced them: the input hold forces at least one.
      expect(close.taskMs, JSON.stringify(close)).toBeGreaterThan(0);
      expect(close.forcedRecalcs, JSON.stringify(close)).toBeGreaterThan(0);
    }
  });
});
