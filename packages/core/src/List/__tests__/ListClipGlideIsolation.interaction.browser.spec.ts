// Copyright (c) Meta Platforms, Inc. and affiliates.
// NOT FOR LANDING: is the list's isolation needed during the post-drop glide?
// Drops it at the lift (C'), restores it when the glide's animations end, and
// reads per frame what is raised inside the list and what a tap at a sticky
// header's edge hits.
import {test, type Page} from '@astryxdesign/a11y-spec/playwright';
import {drag, openStory, touchDriver, withStorybook} from '@astryxdesign/interaction-harness';

const storybook = withStorybook(test);

const CASES = [
  {story: 'lab-transferlist--searchable', rows: '[data-transfer-list-row]:not([data-transfer-list-row=""])'},
  {story: 'core-list--reorder-in-clipped-card', rows: '#storybook-root ul > li'},
  {story: 'core-list--reorder-interactive-in-clipped-card', rows: '#storybook-root ul > li'},
];

async function arm(page: Page, rows: string, drop: boolean) {
  return page.evaluate(({rows, drop}) => {
    const all = () => Array.from(document.querySelectorAll<HTMLElement>(rows)).filter(r => r.getBoundingClientRect().height > 0);
    const first = all()[0];
    const ul = first.parentElement!;
    const reach = parseFloat(getComputedStyle(first).getPropertyValue('--astryx-hit-inset-top')) || 0;
    const top = first.getBoundingClientRect().top;
    // A sticky page header before the list, at z-index 1, ending halfway into
    // the band above the first row (ListTouchHitArea's geometry).
    const header = document.createElement('div');
    header.id = 'c-header';
    Object.assign(header.style, {position: 'fixed', insetInline: '0', top: '0', height: `${top - reach / 2}px`, zIndex: '1'});
    document.body.prepend(header);
    // A second page layer before the list, at z-index 1, over the second
    // row's text: what paints, and so hit-tests, on top there.
    const second = all()[1].getBoundingClientRect();
    const cover = document.createElement('div');
    cover.id = 'c-cover';
    Object.assign(cover.style, {position: 'fixed', left: `${second.left + 8}px`, width: '120px', top: `${second.top + 6}px`, height: `${second.height - 12}px`, zIndex: '1'});
    document.body.prepend(cover);
    const cx = second.left + 60, cy = second.top + second.height / 2;
    const x = first.getBoundingClientRect().left + 40;
    const y = top - (reach * 3) / 4;
    const rec: {frames: unknown[]; liftAt: number | null; restoredAt: number | null} = {frames: [], liftAt: null, restoredAt: null};
    (window as any).__cp = rec;
    const read = (tag: string) => {
      const raised = all().map(r => {
        const own = getComputedStyle(r), after = getComputedStyle(r, '::after');
        return {key: r.getAttribute('data-astryx-item-key') ?? r.getAttribute('data-transfer-list-row'), z: own.zIndex, inlineZ: r.style.zIndex, afterZ: after.content !== 'none' ? after.zIndex : null};
      }).filter(r => (r.z !== 'auto' && r.z !== '0') || (r.afterZ != null && r.afterZ !== 'auto' && r.afterZ !== '0'));
      const el = document.elementFromPoint(x, y);
      const ce = document.elementFromPoint(cx, cy);
      rec.frames.push({tag, t: rec.liftAt == null ? null : Math.round(performance.now() - rec.liftAt), iso: getComputedStyle(ul).isolation, hit: el === header ? 'header' : el?.closest('li, [data-transfer-list-row]') ? 'row' : String(el?.tagName), coverHit: ce === cover ? 'cover' : ce?.closest('li, [data-transfer-list-row]') ? 'row' : String(ce?.tagName), raised});
    };
    read('arm');
    addEventListener('touchend', () => {
      rec.liftAt = performance.now();
      if (drop) ul.style.setProperty('isolation', 'auto', 'important');
      let idle = 0, saw = false, n = 0;
      const tick = () => {
        read('raf');
        const running = ul.getAnimations({subtree: true}).filter(a => a.playState === 'running').length;
        if (running > 0) saw = true;
        idle = running === 0 ? idle + 1 : 0;
        if (drop && rec.restoredAt == null && ((saw && idle >= 2) || performance.now() - rec.liftAt! > 2000)) {
          ul.style.removeProperty('isolation');
          rec.restoredAt = Math.round(performance.now() - rec.liftAt!);
        }
        if (++n < 60) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, {capture: true, once: true});
    return {reach, interactiveBands: getComputedStyle(first, '::after').content !== 'none'};
  }, {rows, drop});
}

for (const c of CASES) {
  for (const drop of [false, true]) {
    test(`${c.story} ${drop ? "C'" : 'control'}`, async ({page}) => {
      await openStory(page, storybook(), c.story);
      const rowsLoc = page.locator(c.rows);
      const handle = rowsLoc.nth(2).locator('button[data-astryx-list-reorder]');
      const box = await handle.boundingBox();
      const r2 = await rowsLoc.nth(2).boundingBox();
      const r3 = await rowsLoc.nth(3).boundingBox();
      if (!box || !r2 || !r3) throw new Error('no handle');
      const from = {x: box.x + box.width / 2, y: box.y + box.height / 2};
      const to = {x: from.x, y: from.y + 6.4 * (r3.y - r2.y)};
      const info = await arm(page, c.rows, drop);
      const driver = await touchDriver(page);
      await driver.play(drag(from, to, {durationMs: 1600, hz: 60, holdMs: 600, restMs: 300}));
      await page.waitForTimeout(1500);
      const rec = await page.evaluate(() => (window as any).__cp);
      const frames = rec.frames as {tag: string; t: number | null; iso: string; hit: string; coverHit: string; raised: {key: string; z: string; inlineZ: string; afterZ: string | null}[]}[];
      const glide = frames.filter(f => f.tag === 'raf');
      const rowHits = glide.filter(f => f.hit !== 'header').map(f => `${f.t}`);
      const raisedKinds = new Set(glide.flatMap(f => f.raised.map(r => `${r.key}:z=${r.z}${r.inlineZ ? `(inline ${r.inlineZ})` : ''},after=${r.afterZ}`)));
      console.log(`CPDATA ${JSON.stringify({story: c.story, arm: drop ? "C'" : 'control', ...info, restoredAt: rec.restoredAt, frames: glide.length, isoAutoFrames: glide.filter(f => f.iso === 'auto').length, headerTapLostFrames: rowHits.length, firstLost: rowHits.slice(0, 3), armHit: (frames[0] as any).hit, armCoverHit: (frames[0] as any).coverHit, rowOverCoverFrames: glide.filter(f => f.coverHit !== 'cover').length, rowOverCoverMs: glide.filter(f => f.coverHit !== 'cover').map(f => f.t).filter((_, i, a) => i === 0 || i === a.length - 1), raisedAtArm: frames[0].raised.length, raisedDuringGlide: [...raisedKinds].slice(0, 6)})}`);
    });
  }
}
