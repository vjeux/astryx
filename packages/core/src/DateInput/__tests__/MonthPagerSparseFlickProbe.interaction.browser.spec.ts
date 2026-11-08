// LOCAL PROBE (not for commit): sparse fast flicks on the month pager.
// Code Quality saw one 3-move flick at 2.11 px/ms (last two moves) fail to
// page at 7ea993f835 on a loaded Android emulator. Each case scripts every
// touch's time, so in Chromium the page reads exactly these timestamps.
import {expect, test, type Page} from '@astryxdesign/a11y-spec/playwright';
import {
  openStory,
  touchDriver,
  waitForRest,
  withStorybook,
  type TouchScript,
} from '@astryxdesign/interaction-harness';

const storybook = withStorybook(test);
const STORY = 'core-dateinput--bottom-sheet-calendar';

async function open(page: Page) {
  await openStory(page, storybook(), STORY);
  const driver = await touchDriver(page);
  const opener = page.getByRole('button', {name: /calendar/i}).first();
  const box = await opener.boundingBox();
  if (box == null) throw new Error('no opener');
  await driver.tap({x: box.x + box.width / 2, y: box.y + box.height / 2});
  const viewport = page.locator('[data-scroller="months"]');
  await expect(viewport).toBeVisible();
  await page.waitForTimeout(1500);
  const rect = await viewport.boundingBox();
  if (rect == null) throw new Error('no viewport');
  return {
    driver,
    viewport,
    track: page.locator('[data-month-track]'),
    title: page.locator('[data-title="month-year"]'),
    width: rect.width,
    center: {x: rect.x + rect.width / 2, y: rect.y + rect.height / 2},
  };
}

/**
 * A leftward flick: touch-down, then moves at the given times (ms) each at
 * the given speed (px/ms) over its own interval, then the lift `liftGap` ms
 * after the last move, at the last move's place.
 */
function sparseFlick(
  from: {x: number; y: number},
  moves: ReadonlyArray<{t: number; speed: number}>,
  liftGap: number,
): TouchScript {
  const frames: {t: number; fingers: {id: number; x: number; y: number}[]}[] = [
    {t: 0, fingers: [{id: 0, x: from.x, y: from.y}]},
  ];
  let x = from.x;
  let previous = 0;
  for (const move of moves) {
    x -= move.speed * (move.t - previous);
    previous = move.t;
    frames.push({t: move.t, fingers: [{id: 0, x, y: from.y}]});
  }
  frames.push({t: previous + liftGap, fingers: []});
  return frames;
}

const even = (count: number, overMs: number, speed: number) =>
  Array.from({length: count}, (_, i) => ({
    t: ((i + 1) * overMs) / count,
    speed,
  }));

const CASES: ReadonlyArray<{
  name: string;
  moves: ReadonlyArray<{t: number; speed: number}>;
  liftGap: number;
}> = [
  {name: '2 moves, 2.1 px/ms, lift +5', moves: even(2, 60, 2.1), liftGap: 5},
  {name: '3 moves, 2.1 px/ms, lift +5', moves: even(3, 60, 2.1), liftGap: 5},
  {name: '4 moves, 2.1 px/ms, lift +5', moves: even(4, 60, 2.1), liftGap: 5},
  {name: '3 moves over 80, 2.11, lift +20', moves: even(3, 60, 2.11), liftGap: 20},
  {name: '3 moves, 2.1, lift +30', moves: even(3, 60, 2.1), liftGap: 30},
  {name: '3 moves, 2.1, lift +38', moves: even(3, 60, 2.1), liftGap: 38},
  {name: '3 moves, 2.1, lift +45', moves: even(3, 60, 2.1), liftGap: 45},
  {name: '3 moves, 2.1, lift +55', moves: even(3, 60, 2.1), liftGap: 55},
  {
    name: '3 moves accelerating 0.3/1.2/2.11, lift +5',
    moves: [
      {t: 20, speed: 0.3},
      {t: 40, speed: 1.2},
      {t: 60, speed: 2.11},
    ],
    liftGap: 5,
  },
  {
    name: '3 moves, slow start 0.1/0.4/2.11, lift +5',
    moves: [
      {t: 20, speed: 0.1},
      {t: 40, speed: 0.4},
      {t: 60, speed: 2.11},
    ],
    liftGap: 5,
  },
];

for (const c of CASES) {
  test(`probe flick: ${c.name}`, async ({page}, testInfo) => {
    const {driver, viewport, track, title, center} = await open(page);
    const before = await title.textContent();
    const played = await driver.play(sparseFlick(center, c.moves, c.liftGap), {
      pacing: 'spacing',
      // The pager's release: Core's scrollVelocity blend.
      release: 'scroll',
    });
    await waitForRest(track);
    const months = await viewport.evaluate(element => {
      const t = element.querySelector('[data-month-track]');
      if (t == null) return NaN;
      return (
        (element.getBoundingClientRect().left - t.getBoundingClientRect().left) /
        element.getBoundingClientRect().width
      );
    });
    const after = await title.textContent();
    const lift = played[played.length - 1];
    console.log(
      `PROBE3 ${testInfo.project.name} | ${c.name} | before=${before} after=${after} months=${months.toFixed(3)} release=${JSON.stringify(lift.release ?? null)}`,
    );
  });
}
