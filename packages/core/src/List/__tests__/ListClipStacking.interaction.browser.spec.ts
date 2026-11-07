// Copyright (c) Meta Platforms, Inc. and affiliates.
// NOT FOR LANDING: what the list's isolation is for, wherever it sits. Under
// a finger, a sticky header before the list and an overlay after it keep
// their taps over the first row's raised band; without the isolation the
// band rises above the header.
import {expect, test} from '@astryxdesign/a11y-spec/playwright';
import {openStory, withStorybook} from '@astryxdesign/interaction-harness';

const storybook = withStorybook(test);

test('stacking', async ({page}) => {
  await openStory(page, storybook(), 'core-list--compact');
  const result = await page.evaluate(() => {
    const first = document.querySelector<HTMLElement>('#storybook-root li')!;
    const list = first.parentElement!;
    const isolating = [list, list.parentElement!].find(el => getComputedStyle(el).isolation === 'isolate') ?? null;
    const reach = parseFloat(getComputedStyle(first).getPropertyValue('--astryx-hit-inset-top')) || 0;
    const top = first.getBoundingClientRect().top;
    const x = first.getBoundingClientRect().left + 40;
    const y = top - (reach * 3) / 4;
    const cover = (el: HTMLElement, z: string, h: number) => Object.assign(el.style, {position: 'fixed', insetInline: '0', top: '0', height: `${h}px`, zIndex: z});
    const hit = (named: Map<Element, string>) => {
      const element = document.elementFromPoint(x, y);
      return element != null && named.has(element) ? named.get(element)! : element?.closest('li') != null ? 'row' : String(element?.tagName);
    };
    const header = document.createElement('div');
    cover(header, '1', top - reach / 2);
    document.body.prepend(header);
    const withHeader = hit(new Map([[header, 'header']]));
    let headerUnisolated: string | null = null;
    if (isolating) {
      isolating.style.isolation = 'auto';
      headerUnisolated = hit(new Map([[header, 'header']]));
      isolating.style.isolation = '';
    }
    header.remove();
    const overlay = document.createElement('div');
    cover(overlay, '1', top);
    document.body.append(overlay);
    const withOverlay = hit(new Map([[overlay, 'overlay']]));
    overlay.remove();
    return {
      isolates: isolating == null ? 'nothing' : isolating === list ? 'the list (ul)' : 'the list root (div)',
      listIsolation: getComputedStyle(list).isolation, rootIsolation: getComputedStyle(list.parentElement!).isolation,
      reach, withHeader, headerUnisolated, withOverlay,
    };
  });
  console.log(`STACKING ${JSON.stringify({sb: process.env.ASTRYX_STORYBOOK_DIR?.split('/').pop(), ...result})}`);
  expect(result.reach).toBeGreaterThan(2);
  expect(result.withHeader).toBe('header');
  expect(result.headerUnisolated).toBe('row');
  expect(result.withOverlay).toBe('overlay');
});
