// Copyright (c) Meta Platforms, Inc. and affiliates.

/**
 * @file TopNavBarCapsule.test.tsx
 * @input vitest (jsdom), React Testing Library, TopNav in its phone-bar mode,
 *   the iOS 26 bar geometry in motion/uikit/bars, and the raw CSS the StyleX
 *   runtime injects (recorded before jsdom parses it)
 * @output Checks the phone bar under a finger (the coarse pointer: one
 *   touch model on every touch device): the default look grows no box
 *   (`spec:AST-094` FR42, DEC-20), so no touch rule sizes the bar or its end
 *   group, also with no end items; the end items sit on one capsule that is
 *   paint only (the theme's surface, fully rounded, carried `--spacing-1`
 *   past the end group by a spread shadow of the same colour, UIKit's 4 pt
 *   cell inset in bars.ts); an end group that is empty, or whose content
 *   renders nothing, paints no capsule; with a mouse the bar and its end
 *   items keep today's layout
 * @position Testing; validates TopNav.tsx's phone-bar styles. jsdom's CSS
 *   parser drops media blocks, so the declarations are read from the rules
 *   StyleX hands to `insertRule`; the geometry in a real browser is proven by
 *   __tests__/TopNavBarCapsule.interaction.browser.spec.ts
 */

import {render, screen} from '@testing-library/react';
import {beforeAll, describe, expect, it} from 'vitest';
import type {TopNav as TopNavComponent} from './TopNav';
import type {TopNavRenderContext as TopNavRenderContextValue} from './TopNavRenderContext';
import type {Button as ButtonComponent} from '../Button/Button';
import {bars} from '../motion/uikit/bars';
import {spacingDefaults} from '../theme/tokens.stylex';

const COARSE_KEY = '@media (pointer: coarse)';

/** Every rule StyleX inserted, as the raw text it handed to `insertRule`. */
const rawRules: string[] = [];
let TopNav: typeof TopNavComponent;
let TopNavRenderContext: typeof TopNavRenderContextValue;
let Button: typeof ButtonComponent;

beforeAll(async () => {
  const insertRule = CSSStyleSheet.prototype.insertRule;
  CSSStyleSheet.prototype.insertRule = function (
    this: CSSStyleSheet,
    rule: string,
    index?: number,
  ) {
    rawRules.push(rule);
    return insertRule.call(this, rule, index);
  };
  // StyleX injects when the styles are created: load TopNav after the
  // recorder is in place.
  ({TopNav} = await import('./TopNav'));
  ({TopNavRenderContext} = await import('./TopNavRenderContext'));
  ({Button} = await import('../Button/Button'));
});

/**
 * The declarations `el`'s own classes make, by property: outside any at-rule
 * (`where` omitted), or under the coarse pointer alone (`'touch'`), on the
 * class itself or, with `pseudo`, on that pseudo-class of it. StyleX
 * minifies values: they are compared without whitespace.
 */
function declared(
  el: Element,
  where: 'default' | 'touch' = 'default',
  pseudo = '',
): Map<string, string> {
  const out = new Map<string, string>();
  const escapedPseudo = pseudo.replace(/[()]/g, '\\$&');
  for (const className of Array.from(el.classList)) {
    // Inside at-rules StyleX repeats the class for specificity.
    const selector = new RegExp(
      `^(?:\\.${className})+${escapedPseudo}(?::not\\(#\\\\#\\))*\\{([^}]*)\\}$`,
    );
    for (const raw of rawRules) {
      let body = raw;
      const atRules: string[] = [];
      for (let match; (match = /^(@[^{]+)\{(.*)\}$/s.exec(body));) {
        atRules.push(match[1].trim());
        body = match[2];
      }
      const ruleWhere =
        atRules.length === 0
          ? 'default'
          : atRules.length === 1 && atRules[0] === COARSE_KEY
            ? 'touch'
            : null;
      if (ruleWhere !== where) {
        continue;
      }
      const match = selector.exec(body);
      if (match == null) {
        continue;
      }
      for (const declaration of match[1].split(';')) {
        const colon = declaration.indexOf(':');
        if (colon > 0) {
          out.set(
            declaration.slice(0, colon).trim(),
            declaration.slice(colon + 1).replace(/\s+/g, ''),
          );
        }
      }
    }
  }
  return out;
}

function renderPhoneBar(endContent?: React.ReactNode) {
  return render(
    <TopNavRenderContext value="mobile-bar">
      <TopNav heading={<span>Acme</span>} endContent={endContent} />
    </TopNavRenderContext>,
  );
}

const profile = () => (
  <Button label="Profile" variant="ghost" icon={<span>P</span>} isIconOnly />
);

describe('TopNav phone bar under a finger', () => {
  /** The geometry a touch rule must not set (`spec:AST-094` FR42, DEC-20). */
  const BAR_GEOMETRY = [
    'padding',
    'padding-inline',
    'padding-top',
    'padding-bottom',
    'padding-block',
    'height',
    'min-height',
  ];
  const END_GEOMETRY = [
    'padding',
    'padding-inline',
    'padding-block',
    'height',
    'min-height',
    'width',
    'gap',
  ];

  it('grows no box: no touch rule sizes the bar or its end group (spec:AST-094 FR42, DEC-20)', () => {
    const {container} = renderPhoneBar(profile());
    const bar = screen.getByRole('navigation');
    for (const property of BAR_GEOMETRY) {
      expect(declared(bar, 'touch').has(property), property).toBe(false);
    }
    // The 8px padding all round, as with a mouse.
    expect(declared(bar).get('padding')).toBe('var(--spacing-2)');
    const capsule = container.querySelector('[data-bar-capsule]')!;
    for (const property of END_GEOMETRY) {
      expect(declared(capsule, 'touch').has(property), property).toBe(false);
    }
  });

  it('with no end items keeps the same bar, its heading centred', () => {
    const {container} = renderPhoneBar();
    const bar = screen.getByRole('navigation');
    expect(container.querySelector('[data-bar-capsule]')).toBeNull();
    for (const property of BAR_GEOMETRY) {
      expect(declared(bar, 'touch').has(property), property).toBe(false);
    }
    expect(declared(bar).get('align-items')).toBe('center');
  });

  it('puts the end items on one capsule that is paint only', () => {
    const {container} = renderPhoneBar(profile());
    const capsule = container.querySelector('[data-bar-capsule]')!;
    expect(capsule).not.toBeNull();
    expect(
      capsule.contains(screen.getByRole('button', {name: 'Profile'})),
    ).toBe(true);
    const touch = declared(capsule, 'touch');
    expect(touch.get('background-color')).toBe(
      'var(--color-background-surface)',
    );
    expect(touch.get('border-radius')).toBe('var(--radius-full)');
    // The fill reaches `--spacing-1` past the end group, UIKit's cell inset,
    // through a spread of the same colour: a pill around the controls that
    // changes no box. No drop shadow: UIKit's capsule has none.
    expect(touch.get('box-shadow')).toBe(
      '000var(--spacing-1)var(--color-background-surface)',
    );
  });

  it('paints no capsule when the end content renders nothing', () => {
    const Nothing = () => null;
    const {container} = renderPhoneBar(<Nothing />);
    const group = container.querySelector('[data-bar-capsule]')!;
    expect(group.matches(':empty')).toBe(true);
    const empty = declared(group, 'touch', ':empty');
    expect(empty.get('background-color')).toBe('transparent');
    expect(empty.get('box-shadow')).toBe('none');
  });

  it('keeps today’s layout with a mouse: no surface, no size, the 4px gap', () => {
    expect(window.matchMedia('(pointer: coarse)').matches).toBe(false);
    const {container} = renderPhoneBar(profile());
    const capsule = container.querySelector('[data-bar-capsule]')!;
    const mouse = declared(capsule);
    expect(mouse.get('gap')).toBe('var(--spacing-1)');
    // The capsule is the touch rules': none of its rules is gated on WebKit
    // for iOS.
    const own = Array.from(capsule.classList);
    expect(
      rawRules.some(
        rule =>
          rule.includes('touch-callout') &&
          own.some(className => rule.includes(`.${className}`)),
      ),
    ).toBe(false);
    for (const property of [
      'height',
      'border-radius',
      'background-color',
      'box-shadow',
      'padding-inline',
    ]) {
      expect(mouse.has(property), property).toBe(false);
    }
  });

  it('draws no capsule for an empty end group', () => {
    const {container} = renderPhoneBar();
    expect(container.querySelector('[data-bar-capsule]')).toBeNull();
  });
});

describe('the capsule’s reach is the cell inset measured in bars.ts', () => {
  /** A default token in px (rem at the default 16px root). */
  const px = (value: string): number =>
    value.endsWith('rem') ? parseFloat(value) * 16 : parseFloat(value);

  it('`--spacing-1` is UIKit’s cell inset', () => {
    expect(px(spacingDefaults['--spacing-1'])).toBe(
      bars.buttonCapsules.cellInsetPt,
    );
  });
});
