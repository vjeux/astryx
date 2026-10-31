// Copyright (c) Meta Platforms, Inc. and affiliates.

/**
 * @file playingCardsTemplates.test.tsx
 * @input The CLI's two playing-card examples of the public animator (the
 *   `useAnimator` one, which drags through `usePanGesture`, and the
 *   plain-JavaScript `createAnimator` one), each rendered with a recording
 *   animator in place of the real one, and the React one with a recording
 *   pan whose drags the test reports.
 * @output Tests that a drag held still before its release springs back
 *   instead of being thrown, that a thrown card's successor is dealt and
 *   announced once the thrown card has faded, without waiting for its coast,
 *   and that the Discard button moves the card with `animate`, never `decay`,
 *   so Reduce Motion fades it in place (`design:reduced-motion` DR2).
 * @position The examples ship to products through the CLI, so their release
 *   logic is checked here, beside the animator they demonstrate.
 */

import type {ComponentType} from 'react';
import {act, render, screen} from '@testing-library/react';
import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest';

// The examples live in the CLI's templates, outside Core's type-checked
// sources, so they load at run time; the CLI type-checks them itself.
const TEMPLATES = '../../../cli/assets/templates/blocks/components';
async function loadExample(file: string): Promise<ComponentType> {
  const module = (await import(/* @vite-ignore */ `${TEMPLATES}/${file}`)) as {
    default: ComponentType;
  };
  return module.default;
}
const AnimatorPlayingCards = await loadExample(
  'useAnimator/AnimatorPlayingCards',
);
const AnimatorPlayingCardsVanilla = await loadExample(
  'createAnimator/AnimatorPlayingCardsVanilla',
);

const recorder = vi.hoisted(() => {
  const state = {
    calls: [] as {method: string; values?: unknown}[],
    finishFade: () => {},
    /** The React example's pan listener, as usePanGesture received it. */
    onPan: (_event: {
      state: 'began' | 'changed' | 'ended' | 'cancelled';
      translation: {x: number; y: number};
      velocity: {x: number; y: number};
    }) => {},
  };
  const animator = {
    animate: async (values: {opacity?: number}) => {
      state.calls.push({method: 'animate', values});
      if (values.opacity === 0) {
        await new Promise<void>(resolve => {
          state.finishFade = resolve;
        });
      }
    },
    // A thrown card coasts for seconds: this one never stops on its own.
    decay: async (values: unknown) => {
      state.calls.push({method: 'decay', values});
      await new Promise<void>(() => {});
    },
    set: (values: unknown) => {
      state.calls.push({method: 'set', values});
    },
    get: () => ({x: 0, y: 0, scale: 1, rotate: 0, opacity: 1}),
    getVelocity: () => ({x: 0, y: 0, scale: 0, rotate: 0, opacity: 0}),
    stop: () => {},
    destroy: () => {},
  };
  return {state, animator};
});

vi.mock('@astryxdesign/core/hooks', async importOriginal => ({
  ...(await importOriginal<object>()),
  useAnimator: () => recorder.animator,
  usePanGesture: (
    _ref: unknown,
    options: {onPan: typeof recorder.state.onPan},
  ) => {
    recorder.state.onPan = options.onPan;
  },
}));
vi.mock('@astryxdesign/core', async importOriginal => ({
  ...(await importOriginal<object>()),
  createAnimator: () => recorder.animator,
}));

/** Dispatches a pointer event at a given time stamp (ms). */
function pointer(
  target: Element,
  type: 'pointerdown' | 'pointermove' | 'pointerup',
  x: number,
  t: number,
) {
  const event = new MouseEvent(type, {
    bubbles: true,
    cancelable: true,
    clientX: x,
    clientY: 0,
  });
  Object.defineProperty(event, 'pointerId', {value: 1});
  Object.defineProperty(event, 'timeStamp', {value: t});
  act(() => {
    target.dispatchEvent(event);
  });
}

/**
 * A 150 px drag over 100 ms, released at `releasedAt`, through the card's
 * pointer events (the plain-JavaScript example samples them itself).
 */
function pointerDrag(card: Element, releasedAt: number) {
  pointer(card, 'pointerdown', 0, 1000);
  for (let step = 1; step <= 10; step++) {
    pointer(card, 'pointermove', step * 15, 1000 + step * 10);
  }
  pointer(card, 'pointerup', 150, releasedAt);
}

/**
 * The same drag as the pan reports it to the React example: a finger that
 * rested before lifting releases at 0 px/s, a flick at its speed.
 */
function panDrag(isStill: boolean) {
  const report = recorder.state.onPan;
  act(() => {
    report({state: 'began', translation: {x: 0, y: 0}, velocity: {x: 0, y: 0}});
    for (let step = 1; step <= 10; step++) {
      report({
        state: 'changed',
        translation: {x: step * 15, y: 0},
        velocity: {x: 1500, y: 0},
      });
    }
    report({
      state: 'ended',
      translation: {x: 150, y: 0},
      velocity: isStill ? {x: 0, y: 0} : {x: 1500, y: 0},
    });
  });
}

const methods = () => recorder.state.calls.map(call => call.method);

const EXAMPLES = [
  {
    name: 'the useAnimator example',
    mount: () => render(<AnimatorPlayingCards />),
    // Held still for 600 ms before the release, or flicked.
    drag: (isStill: boolean) => panDrag(isStill),
    discardButton: 'Discard Ace of spades',
    announced: 'Ace of spades discarded',
  },
  {
    name: 'the createAnimator example',
    mount: () => render(<AnimatorPlayingCardsVanilla />),
    drag: (isStill: boolean) =>
      pointerDrag(
        screen.getByLabelText('Top card'),
        isStill ? 1100 + 600 : 1100,
      ),
    discardButton: 'Discard the top card',
    announced: 'A\u2660 discarded',
  },
];

describe.each(EXAMPLES)('$name', ({mount, drag, discardButton, announced}) => {
  beforeEach(() => {
    recorder.state.calls = [];
    HTMLElement.prototype.setPointerCapture = () => {};
  });
  afterEach(() => {
    Reflect.deleteProperty(HTMLElement.prototype, 'setPointerCapture');
  });

  it('a drag held still for 600 ms before its release springs back, not thrown', () => {
    mount();
    drag(true);
    expect(methods()).not.toContain('decay');
    expect(recorder.state.calls.at(-1)).toMatchObject({
      method: 'animate',
      values: {x: 0, y: 0, rotate: 0},
    });
  });

  it('a flick deals and announces the next card once the thrown one fades, during its coast', async () => {
    mount();
    drag(false);
    expect(methods()).toContain('decay');
    expect(screen.queryByText(announced)).toBeNull();
    await act(async () => {
      recorder.state.finishFade();
    });
    expect(screen.getByText(announced)).toBeTruthy();
    expect(recorder.state.calls).toContainEqual({
      method: 'set',
      values: {x: 0, y: 0, rotate: 0, scale: 0.9, opacity: 0},
    });
  });

  it('the Discard button moves the card off with animate, never decay, so Reduce Motion fades it in place (design:reduced-motion DR2)', async () => {
    mount();
    act(() => {
      screen.getByRole('button', {name: discardButton}).click();
    });
    // A coast keeps its momentum under Reduce Motion, as a person's throw;
    // a button's move is planned, so it fades where it is.
    expect(methods()).not.toContain('decay');
    expect(recorder.state.calls[0]).toEqual({
      method: 'animate',
      values: {x: 400, opacity: 0},
    });
    await act(async () => {
      recorder.state.finishFade();
    });
    expect(screen.getByText(announced)).toBeTruthy();
  });
});

describe('the createAnimator example', () => {
  it('colours its card from the theme\u2019s surface and text tokens, so it reads in a dark theme', () => {
    render(<AnimatorPlayingCardsVanilla />);
    const {style} = screen.getByLabelText('Top card');
    expect(style.backgroundColor).toBe('var(--color-background-surface)');
    expect(style.color).toBe('var(--color-text-primary)');
  });
});
