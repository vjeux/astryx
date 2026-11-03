// Copyright (c) Meta Platforms, Inc. and affiliates.

/**
 * @file interactionOverlay.cell.test.ts
 * @input vitest, the UIKit constants table (motion/uikit/list.ts), the row
 *   press layer (privateAttributes/press.stylex.ts) and the rows that compose
 *   it
 * @output Holds the layer's clocks to the table and to the overlay's release.
 *   Asserts what a row ships under a finger, and that a fine pointer's row is
 *   unchanged.
 * @position Unit test of the row press layer. The real-engine proofs are in
 *   List/__tests__/ListRowPress.interaction.browser.spec.ts.
 */

import {execFileSync} from 'node:child_process';
import {readFileSync} from 'node:fs';
import {resolve} from 'node:path';
import * as stylex from '@stylexjs/stylex';
import {createElement} from 'react';
import {render, screen} from '@testing-library/react';
import {afterEach, describe, expect, it, vi} from 'vitest';
import {list} from '../motion/uikit/list';
import {timing} from '../motion/uikit/timing';
import {Item} from '../Item';
import {TreeList} from '../TreeList';
import {durationToMs, rulesDeclaredFor} from '../__tests__/pressState';
import {interactionOverlayStyles} from './interactionOverlay.stylex';
import {PRESS_FADE_MS} from './pressGesture';
import {cellPressConsts} from './rowPressLayer.stylex';

const ON = '[data-astryx-press="on"]';
const FADING = '[data-astryx-press="fading"]';

const selectorOf = (rule: string) => rule.slice(0, rule.indexOf('{'));
const layerRules = (el: Element, arm: string) =>
  rulesDeclaredFor(el).filter(rule => {
    const selector = selectorOf(rule);
    return selector.includes('::before') && selector.includes(arm);
  });

const COARSE = '(pointer: coarse)';

const isHost = (rule: string) => !selectorOf(rule).includes('::before');

/**
 * A sheet the document may not read: one loaded from another origin, whose
 * `cssRules` throws. Its rules are never ours. Every other sheet is read, so
 * an error reading one fails the test instead of hiding its rules.
 */
const isCrossOrigin = (sheet: CSSStyleSheet) =>
  sheet.href != null &&
  new URL(sheet.href, document.baseURI).origin !== window.location.origin;

/**
 * The element's style rules inside an `@media` naming `media`, as
 * `selector {declarations}` text. A null `media` means outside every `@media`.
 */
function rulesIn(el: Element, media: string | null): string[] {
  const classes = el.className
    .split(/\s+/)
    .filter(Boolean)
    .map(name => `.${name}`);
  const out: string[] = [];
  const walk = (list: CSSRuleList, inside: string | null) => {
    for (const rule of Array.from(list)) {
      if (rule instanceof CSSMediaRule) {
        walk(rule.cssRules, rule.media.mediaText);
      } else if (rule instanceof CSSStyleRule) {
        const selector = rule.selectorText;
        const here = media == null ? inside == null : inside?.includes(media);
        if (here && classes.some(cls => selector.startsWith(cls))) {
          out.push(`${selector} {${rule.style.cssText}}`);
        }
      }
    }
  };
  for (const sheet of Array.from(document.styleSheets)) {
    if (!isCrossOrigin(sheet)) {
      walk(sheet.cssRules, null);
    }
  }
  return out;
}

/** Declarations of `property` in the element's rules, by value. */
const values = (rules: string[], property: string) =>
  rules.flatMap(rule => {
    const match = rule.match(
      new RegExp(`(?:^|[;{\\s])${property}:\\s*([^;}]+)`),
    );
    return match == null ? [] : [match[1].trim()];
  });

describe('the stylesheet reader', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  /** The document holds one sheet: its `href`, and what reading its rules does. */
  const onlySheet = (href: string | null, read: () => CSSRuleList) => {
    const sheet = {
      href,
      get cssRules() {
        return read();
      },
    } as unknown as CSSStyleSheet;
    vi.spyOn(Document.prototype, 'styleSheets', 'get').mockReturnValue([
      sheet,
    ] as unknown as StyleSheetList);
  };

  it('lets a real error reading a same-origin sheet throw, instead of reading no rules from it', () => {
    onlySheet(null, () => {
      throw new TypeError('a real error');
    });
    expect(() => rulesIn(document.body, null)).toThrow('a real error');
  });

  it('skips only a sheet from another origin, whose rules the document may not read', () => {
    onlySheet('https://cdn.example.com/theme.css', () => {
      throw new DOMException('blocked', 'SecurityError');
    });
    expect(rulesIn(document.body, null)).toEqual([]);
  });
});

/**
 * The CSS clocks a file declares as `const NAME = \`…\``, with its own
 * millisecond constant written as `MS`.
 */
function clocks(file: string, names: string[], constant: string) {
  const source = readFileSync(resolve(__dirname, file), 'utf8');
  return names.map(name => {
    const match = source.match(new RegExp(`const ${name} = \`([^\`]*)\`;`));
    return (match?.[1] ?? '').split(constant).join('MS');
  });
}

describe('press layer clock', () => {
  it("follows the theme's tempo and the Reduce Motion cap exactly as the overlay's release does", () => {
    const layer = clocks(
      '../privateAttributes/press.stylex.ts',
      ['CELL_RELEASE', 'CELL_RELEASE_REDUCED'],
      '${cellPressConsts.cellReleaseMs}',
    );
    const overlay = clocks(
      'interactionOverlay.stylex.ts',
      ['PRESS_RELEASE_DURATION', 'PRESS_RELEASE_DURATION_REDUCED'],
      '${pressConsts.releaseMs}',
    );
    // Present first: both files declare both clocks.
    for (const clock of [...layer, ...overlay]) {
      expect(clock).toContain('MS');
    }
    expect(layer).toEqual(overlay);
    const [release, reduced] = layer;
    expect(release).toContain('var(--_astryx-motion-tempo, 1)');
    // A tempo may shorten the Reduce Motion clock, never lengthen it.
    expect(reduced.startsWith('min(MSms,')).toBe(true);
    // No literal clock: every duration is the table's constant.
    expect(layer.join(' ')).not.toMatch(/\d+m?s\b/);
  });

  it('is the constants table’s cell release, mirrored for the stylesheet', () => {
    expect(cellPressConsts.cellReleaseMs).toBe(list.highlight.releaseMs);
    expect(cellPressConsts.cellReleaseEase).toBe(
      `cubic-bezier(${list.highlight.releaseCurve.join(', ')})`,
    );
  });

  it('runs on the clock the controller checks the release at', () => {
    expect(cellPressConsts.cellReleaseMs).toBe(PRESS_FADE_MS);
  });

  it("plays the table's release clock and curve", () => {
    expect(list.highlight.releaseMs).toBe(timing.press.highlightOutMs);
    expect(list.highlight.releaseCurve).toBe(timing.press.highlightOutCurve);
  });

  it("the shared overlay's release plays the same curve, the table's, from its own copy", () => {
    const element = document.createElement('button');
    element.className =
      stylex.props(interactionOverlayStyles.pressedAlpha).className ?? '';
    document.body.append(element);
    const fading = rulesDeclaredFor(element).filter(rule => {
      const selector = selectorOf(rule);
      return selector.includes(FADING) && !selector.includes('::');
    });
    // StyleX writes the curve minified: compare the control points.
    const points = (css: string) =>
      (css.match(/-?\d*\.?\d+/g) ?? []).map(Number);
    expect(values(fading, 'animation-timing-function').map(points)).toEqual([
      [...timing.press.highlightOutCurve],
    ]);
    element.remove();
  });
});

describe("the row layer's constants", () => {
  it('reach only the components that render a press row: a Card ships none of them', () => {
    // The shared overlay reaches nearly every component, since core's
    // package.json marks `.stylex` modules as side effects. So whatever it
    // imports does too. esbuild runs in its own process for a native
    // TextEncoder.
    const script = [
      "import {build} from 'esbuild';",
      'const result = await build({',
      `  entryPoints: ${JSON.stringify([resolve(__dirname, '../Card/index.ts')])},`,
      "  bundle: true, write: false, format: 'esm', logLevel: 'silent',",
      "  external: ['react', 'react-dom', 'react/*', 'react-dom/*', '@stylexjs/stylex'],",
      '});',
      'process.stdout.write(result.outputFiles.map(file => file.text).join("\\n"));',
    ].join('\n');
    const bundle = execFileSync(
      process.execPath,
      ['--input-type=module', '-e', script],
      {cwd: resolve(__dirname, '../../../..'), encoding: 'utf8'},
    );
    // The shared overlay reaches the Card…
    expect(bundle).toContain('astryx-press-alpha');
    // …and brings none of the row layer's constants.
    expect(bundle).not.toContain('cellRelease');
  });
});

describe.each([
  [
    'Item',
    () => {
      render(
        createElement(Item, {
          label: 'Row',
          onClick: () => {},
          'data-testid': 'row',
        }),
      );
      return screen.getByTestId('row');
    },
  ],
  [
    'TreeList row',
    () => {
      render(
        createElement(TreeList, {
          items: [{id: 'a', label: 'Row', onClick: () => {}}],
        }),
      );
      // The row box: the element the controller writes the press on.
      return screen
        .getByRole('treeitem')
        .querySelector('[data-astryx-pressable]') as HTMLElement;
    },
  ],
])('%s paints the touch press on a compositor layer', (_, mount) => {
  it('shows the pressed token on its ::before at once while the press is on', () => {
    const row = mount();
    expect(row).toHaveAttribute('data-astryx-pressable');
    const all = rulesDeclaredFor(row).filter(rule =>
      selectorOf(rule).includes('::before'),
    );
    expect(values(all, 'background-color')).toEqual(
      expect.arrayContaining([
        expect.stringContaining('--color-overlay-pressed'),
      ]),
    );
    expect(values(all, 'opacity')).toContain('0');
    const on = layerRules(row, ON);
    expect(values(on, 'opacity')).toEqual(['1']);
    // The onset is instant: nothing animates on the on arm.
    expect(values(on, 'animation-name')).toEqual([]);
  });

  it('releases with an opacity animation on the cell clock and curve', () => {
    const row = mount();
    const fading = layerRules(row, FADING);
    expect(values(fading, 'animation-name')).toHaveLength(1);
    // The clock and its Reduce Motion cap are both the table's value.
    expect([
      ...new Set(values(fading, 'animation-duration').map(durationToMs)),
    ]).toEqual([list.highlight.releaseMs]);
    // StyleX writes the curve minified (`cubic-bezier(0,0,.2,1)`): compare
    // the control points.
    const points = (css: string) =>
      (css.match(/-?\d*\.?\d+/g) ?? []).map(Number);
    expect(values(fading, 'animation-timing-function').map(points)).toEqual([
      [...list.highlight.releaseCurve],
    ]);
    expect(values(fading, 'animation-fill-mode')).toEqual(['both']);
  });

  it('turns off only the row’s own image under a finger: the press paint stays for what the row’s descendants paint, and the release is the layer’s', () => {
    const row = mount();
    const coarse = rulesIn(row, COARSE).filter(isHost);
    // The row's own image arms yield to the layer…
    expect(
      values(
        coarse.filter(rule => rule.includes(ON)),
        'background-image',
      ),
    ).toEqual(['none']);
    expect(
      values(
        coarse.filter(rule => rule.includes(FADING)),
        'background-image',
      ),
    ).toEqual(['none']);
    // …while the paint a row's descendants read from it stays the overlay's.
    // The strength's main-thread release is dropped, and the layer fades
    // instead.
    expect(values(coarse, '--_press-paint')).toEqual([]);
    expect(values(coarse, '--_press-paint-image')).toEqual([]);
    expect(
      values(
        coarse.filter(rule => rule.includes(FADING)),
        'animation-name',
      ),
    ).toEqual(['none']);
  });

  it('under a finger, nothing of the layer applies at rest: every rule of it waits for a press', () => {
    const row = mount();
    const coarse = rulesIn(row, COARSE);
    // The layer's box and its stacking context exist only while a press is
    // on or releasing. At rest a row's own `::before` and its children's
    // stacking stay as they were.
    const layer = coarse.filter(rule => !isHost(rule));
    expect(layer.length).toBeGreaterThan(0);
    for (const rule of layer) {
      expect(selectorOf(rule), rule).toMatch(/data-astryx-press=/);
    }
    const isolation = coarse.filter(
      rule => isHost(rule) && rule.includes('isolation:'),
    );
    expect(isolation).toHaveLength(1);
    expect(selectorOf(isolation[0] ?? '')).toMatch(/data-astryx-press=/);
  });

  it('leaves a fine pointer’s row as it was: the overlay’s own paint and release, no layer, no stacking context', () => {
    const row = mount();
    const outside = rulesIn(row, null);
    // The overlay's own touch paint and release, as the overlay declares
    // them: touch work leaves a fine pointer's rows as they were.
    const paint = values(outside.filter(isHost), '--_press-paint');
    expect(paint).toHaveLength(1);
    expect(paint[0]).toContain('color-mix');
    const release = values(
      outside.filter(rule => isHost(rule) && rule.includes(FADING)),
      'animation-name',
    );
    expect(release).toHaveLength(1);
    expect(release[0]).not.toBe('none');
    // The layer's box and its stacking context exist under a finger only. No
    // declaration of the layer applies outside it, so a row's own `::before`
    // keeps its opacity, stacking and hit testing.
    expect(outside.filter(rule => !isHost(rule))).toEqual([]);
    expect(values(outside, 'content')).toEqual([]);
    expect(values(outside, 'isolation')).toEqual([]);
    expect(values(rulesIn(row, COARSE), 'isolation')).toEqual(['isolate']);
    expect(
      values(
        rulesIn(row, COARSE).filter(rule => !isHost(rule)),
        'content',
      ),
    ).toEqual(['""']);
  });
});

it('a row without an action paints no press layer', () => {
  render(createElement(Item, {label: 'Static', 'data-testid': 'row'}));
  const row = screen.getByTestId('row');
  expect(row).not.toHaveAttribute('data-astryx-pressable');
  expect(layerRules(row, ON)).toEqual([]);
});
