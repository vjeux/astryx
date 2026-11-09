// Copyright (c) Meta Platforms, Inc. and affiliates.
// NOT FOR LANDING: a probe of the Switch thumb's size on every frame across
// a value change, as the compositor presents it (screencast, painted marker)
// and as the main thread reads it (per frame callback).
import {expect, test, type Page} from '@astryxdesign/a11y-spec/playwright';
import {
  MARKER_RGB,
  openStory,
  startScreencast,
  tap,
  touchDriver,
  trackMarker,
  waitForRest,
  withStorybook,
} from '@astryxdesign/interaction-harness';

const storybook = withStorybook(test);
const STORY = process.env.ZZ_STORY ?? 'core-switch--default';

type Rec = {frames: number[][]; change: number[]};

async function open(page: Page) {
  await openStory(page, storybook(), STORY);
  const root = page.locator('#storybook-root');
  const input = root.getByRole('switch').first();
  const thumb = root.locator('.astryx-switch-thumb').first();
  await expect(thumb).toBeVisible();
  await page.addStyleTag({
    content: `#storybook-root .astryx-switch-thumb { background: rgb(${MARKER_RGB.join(
      ',',
    )}) !important; background-image: none !important; }
#storybook-root .astryx-switch-thumb::after { box-shadow: none !important; background: transparent !important; }`,
  });
  await page.evaluate(() => {
    const t = document.querySelector(
      '#storybook-root .astryx-switch-thumb',
    ) as HTMLElement;
    const i = document.querySelector(
      '#storybook-root [role="switch"]',
    ) as HTMLInputElement;
    const rec: Rec = {frames: [], change: []};
    (window as unknown as {__zz: Rec}).__zz = rec;
    i.addEventListener(
      'change',
      () => rec.change.push(performance.timeOrigin + performance.now()),
      true,
    );
    // When the thumb's scale curves are created, on the page clock.
    const origAnimate = Element.prototype.animate;
    (rec as unknown as {made: unknown[]}).made = [];
    Element.prototype.animate = function (this: Element, kf: unknown, opts: unknown) {
      const a = origAnimate.call(this, kf as Keyframe[], opts as KeyframeAnimationOptions);
      if (this === t) {
        const k = (a.effect as KeyframeEffect).getKeyframes();
        if (k.some(x => 'scale' in x)) {
          (rec as unknown as {made: unknown[]}).made.push([Math.round(performance.now()), String(k[0].scale).split(' ')[0], i.checked ? 1 : 0, (new Error().stack ?? '').split('\n').slice(1, 40).map(l => l.trim().replace(/\(http[^)]*\/([^/)]+)\)/, '($1)')).join(' | ')]);
        }
      }
      return a;
    };
    // A read after every frame callback and the layout of the frame: a
    // ResizeObserver on a probe box that the frame callback resizes.
    const post: number[][] = [];
    (rec as unknown as {post: number[][]}).post = post;
    const probeBox = document.createElement('div');
    probeBox.style.cssText = 'position:fixed;left:-50px;top:0;height:1px;width:1px';
    document.body.append(probeBox);
    let frameTs = 0;
    new ResizeObserver(() => {
      const r = t.getBoundingClientRect();
      const cs = getComputedStyle(t);
      const sc = cs.scale === 'none' ? 1 : parseFloat(cs.scale);
      post.push([performance.timeOrigin + frameTs, +r.width.toFixed(2), parseFloat(cs.width), +sc.toFixed(4), i.checked ? 1 : 0]);
    }).observe(probeBox);
    const tick = (ts: number) => {
      frameTs = ts;
      probeBox.style.width = probeBox.style.width === '1px' ? '2px' : '1px';
      const r = t.getBoundingClientRect();
      const cs = getComputedStyle(t);
      const sc = cs.scale === 'none' ? 1 : parseFloat(cs.scale);
      const anims = t
        .getAnimations()
        .filter(a => {
          const kf = (a.effect as KeyframeEffect | null)?.getKeyframes() ?? [];
          return kf.some(k => 'scale' in k);
        })
        .map(a => {
          const kf = (a.effect as KeyframeEffect).getKeyframes();
          return `${a.playState[0]}${a.pending ? 'P' : ''}@${a.startTime == null ? 'null' : Math.round(Number(a.startTime))}:${String(kf[0].scale).split(' ')[0]}`;
        })
        .join(',');
      rec.frames.push([
        performance.timeOrigin + ts,
        +r.width.toFixed(2),
        +r.height.toFixed(2),
        parseFloat(cs.width),
        +sc.toFixed(4),
        i.checked ? 1 : 0,
        anims as unknown as number,
        Math.round(ts),
      ]);
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  });
  const box = await thumb.boundingBox();
  if (box == null) {
    throw new Error('no thumb');
  }
  return {
    input,
    thumb,
    center: {x: box.x + box.width / 2, y: box.y + box.height / 2},
  };
}

const TOGGLES = Number(process.env.ZZ_TOGGLES ?? 2);
for (const how of ['finger', 'program']) {
  test(`zzpop ${how}`, async ({page, browserName}) => {
    test.setTimeout(240_000);
    const {input, thumb, center} = await open(page);
    const driver = await touchDriver(page);
    await page.waitForTimeout(300);
    const cast = await startScreencast(page);
    for (let n = 0; n < TOGGLES; n++) {
      const target = n % 2 === 0;
      if (how === 'finger') {
        if (browserName === 'webkit' && process.env.ZZ_HOLD !== '1') {
          await driver.tap(center);
        } else {
          await driver.play(tap(center, {holdMs: 50}));
        }
      } else {
        await input.evaluate(el => (el as HTMLInputElement).click());
      }
      if (target) {
        await expect(input).toBeChecked();
      } else {
        await expect(input).not.toBeChecked();
      }
      await waitForRest(thumb);
      await page.waitForTimeout(400);
    }
    const frames = await cast.stop();
    const tracked = await trackMarker(page, frames);
    const rec = await page.evaluate(
      () => (window as unknown as {__zz: Rec}).__zz,
    );
    const made = (rec as unknown as {made: number[][]}).made;
    const out = rec.change.map((at, k) => ({
      change: k,
      atPage: Math.round(at - (rec.frames[0][0] - rec.frames[0][7])),
      made: made.filter(m => Math.abs(m[0] - (at - (rec.frames[0][0] - rec.frames[0][7]))) < 120),
      cast: tracked
        .filter(f => f.t >= at - 200 && f.t <= at + 700)
        .map(f => [
          +(f.t - at).toFixed(1),
          f.box == null ? null : +f.box.width.toFixed(1),
          f.box == null ? null : +f.box.height.toFixed(1),
        ]),
      raf: rec.frames
        .filter(f => f[0] >= at - 200 && f[0] <= at + 700)
        .map(f => [+(f[0] - at).toFixed(1), ...f.slice(1)]),
      post: (rec as unknown as {post: number[][]}).post
        .filter(f => f[0] >= at - 200 && f[0] <= at + 700)
        .map(f => [+(f[0] - at).toFixed(1), ...f.slice(1)]),
    }));
    console.log(`ZZPOP ${browserName} ${how} ${JSON.stringify(out)}`);
  });
}
