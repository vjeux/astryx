// Local probe, not part of any diff: the wheels a trackpad flick delivers,
// where the gesture splitter cuts them, and the row the column rests on.
import {
  openStory,
  webInputDriver,
  withStorybook,
} from '@astryxdesign/interaction-harness';
import {expect, test} from '@playwright/test';
import {WheelSegmenter} from '../../gestures/wheelSegmenter';

const storybook = withStorybook(test);

declare global {
  interface Window {
    f2wheels: [number, number, number][];
  }
}

test.use({hasTouch: false, isMobile: false});

test('f2 wheel probe: a trackpad flick', async ({page, browserName}) => {
  test.skip(browserName !== 'webkit', 'WebKit sends a trackpad');
  await page.addInitScript(() => {
    window.f2wheels = [];
    addEventListener(
      'wheel',
      e => window.f2wheels.push([e.timeStamp, e.deltaY, e.deltaMode]),
      {capture: true, passive: true},
    );
  });
  await openStory(page, storybook(), 'core-wheel--touch-minutes');
  const field = page.getByRole('textbox', {name: 'Committed minute'});
  await expect(field).toHaveValue('00');
  const minutes = page.getByRole('listbox', {name: 'Minute'});
  await expect(minutes).toBeVisible();
  await page.waitForTimeout(600);
  const box = await minutes.boundingBox();
  if (box == null) {
    throw new Error('no minute column');
  }
  const at = {x: box.x + box.width / 2, y: box.y + box.height / 2};
  const input = await webInputDriver(page);
  const fingers = Array.from({length: 12}, () => ({dy: 12}));
  const momentum = [11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1].map(dy => ({dy}));
  await input.wheelBurst({...at, steps: [...fingers, ...momentum]});
  let rested = await field.inputValue();
  for (let i = 0; i < 16; i++) {
    await page.waitForTimeout(500);
    const now = await field.inputValue();
    if (now === rested && i >= 4) {
      break;
    }
    rested = now;
  }
  const wheels = await page.evaluate(() => window.f2wheels);
  const seg = new WheelSegmenter();
  const cuts: string[] = [];
  let lift = -1;
  for (const [i, [t, dy]] of wheels.entries()) {
    const s = seg.push(t, dy, 180);
    if (s.boundary != null && i > 0) {
      cuts.push(`${i}:${s.boundary}`);
    }
    if (s.liftNow) {
      lift = i;
    }
  }
  const gaps = wheels
    .slice(1)
    .map(([t], i) => (t - wheels[i][0]).toFixed(0))
    .join(',');
  const deltas = wheels.map(([, dy]) => dy).join(',');
  console.log(
    `F2WHEEL rested=${rested} n=${wheels.length} lift=${lift} cuts=${cuts.join('|') || 'none'} deltas=${deltas} gaps=${gaps}`,
  );
});
