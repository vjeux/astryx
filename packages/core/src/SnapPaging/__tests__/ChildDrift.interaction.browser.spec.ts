// NOT FOR LANDING: evidence that every child of a held row moves as one
// through a retarget.
import {expect, test} from '@astryxdesign/a11y-spec/playwright';
import {
  drag,
  openStory,
  touchDriver,
  withStorybook,
} from '@astryxdesign/interaction-harness';

const storybook = withStorybook(test);

test('a narrowing mid-settle: every child shows the same translate in each frame', async ({
  page,
}) => {
  await openStory(page, storybook(), 'core-carousel--snap-paging-three-up', {
    mode: 'paging',
  });
  const scroller = page.getByRole('region').getByRole('group').first();
  const start = await scroller.evaluate(el => {
    const box = el.getBoundingClientRect();
    return (
      el.children[3].getBoundingClientRect().left - box.left + el.scrollLeft
    );
  });
  await scroller.evaluate(
    (el, left) => el.scrollTo({left, behavior: 'instant'}),
    start,
  );
  await expect
    .poll(async () => scroller.evaluate(el => Math.abs(el.scrollLeft)))
    .toBeCloseTo(start, 0);
  await scroller.evaluate(el => {
    const spreads: {width: number; spread: number}[] = [];
    (window as unknown as {spreads?: unknown}).spreads = spreads;
    const sample = () => {
      const values = Array.from(
        el.children,
        child => Number.parseFloat(getComputedStyle(child).translate) || 0,
      );
      if (values.some(value => value !== 0)) {
        spreads.push({
          width: el.clientWidth,
          spread: Math.max(...values) - Math.min(...values),
        });
      }
      if (spreads.length < 80) {
        requestAnimationFrame(sample);
      }
    };
    el.addEventListener(
      'touchend',
      () => {
        requestAnimationFrame(sample);
        setTimeout(() => {
          el.style.width = `${el.clientWidth - 100}px`;
        }, 150);
      },
      {once: true},
    );
  });
  const box = await scroller.boundingBox();
  if (box == null) {
    throw new Error('no scroller');
  }
  const y = box.y + box.height / 2;
  const driver = await touchDriver(page);
  await driver.play(
    drag(
      {x: box.x + box.width * 0.7, y},
      {x: box.x + box.width * 0.07, y},
      {durationMs: 200, restMs: 120},
    ),
  );
  await expect
    .poll(
      async () =>
        scroller.evaluate(el =>
          Array.from(el.children).every(
            child => (child as HTMLElement).style.translate === '',
          ),
        ),
      {timeout: 5000},
    )
    .toBe(true);
  const spreads = await page.evaluate(
    () =>
      (window as unknown as {spreads: {width: number; spread: number}[]})
        .spreads,
  );
  const before = spreads.filter(frame => frame.width === 300);
  const after = spreads.filter(frame => frame.width === 200);
  test
    .info()
    .annotations.push({
      type: 'spread',
      description: JSON.stringify({
        before: Math.max(0, ...before.map(f => f.spread)),
        after: Math.max(0, ...after.map(f => f.spread)),
        frames: spreads.length,
      }),
    });
  expect(after.length, 'frames after the narrowing').toBeGreaterThan(3);
  expect(
    Math.max(...before.map(f => f.spread)),
    'children apart before the narrowing (px)',
  ).toBeLessThanOrEqual(0.05);
  expect(
    Math.max(...after.map(f => f.spread)),
    'children apart after the narrowing (px)',
  ).toBeLessThanOrEqual(0.05);
});
