// Copyright (c) Meta Platforms, Inc. and affiliates.

/**
 * @file playingCardsTemplates.test.tsx
 * @input The CLI's two playing-card examples of the public animator, each
 *   rendered with a recording animator and a stubbed pan.
 * @output Tests of each example's release logic. A release at rest springs
 *   back, and so does a cancel. A thrown card's successor is dealt and
 *   announced once it has faded, before its coast ends. Discard uses
 *   `animate`, never `decay`, so Reduce Motion fades the card in place
 *   (`design:reduced-motion` DR2). The card is a named image. One card
 *   leaves at a time, and a drag that meets a discard is ignored to its end.
 * @position The examples ship through the CLI, so their release logic is
 *   checked beside the animator they demonstrate.
 */

import type {ComponentType} from 'react';
import {act, render, screen} from '@testing-library/react';
import {beforeEach, describe, expect, it, vi} from 'vitest';

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
    // The fades still running, oldest first.
    fades: [] as (() => void)[],
    finishFade: () => {
      state.fades.shift()?.();
    },
  };
  const animator = {
    animate: async (values: {opacity?: number}) => {
      state.calls.push({method: 'animate', values});
      if (values.opacity != null) {
        // A new opacity target takes over a running fade, which then
        // resolves, as the animator's does.
        for (const finish of state.fades.splice(0)) {
          finish();
        }
      }
      if (values.opacity === 0) {
        await new Promise<void>(resolve => {
          state.fades.push(resolve);
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
    // Stopping settles a running fade, as the animator's stop does.
    stop: () => {
      state.calls.push({method: 'stop'});
      for (const finish of state.fades.splice(0)) {
        finish();
      }
    },
    destroy: () => {
      state.calls.push({method: 'destroy'});
    },
  };
  return {state, animator};
});

type PanEvent = {
  state: 'began' | 'changed' | 'ended' | 'cancelled';
  translation: {x: number; y: number};
  velocity: {x: number; y: number};
};
// The stubbed pan keeps the example's listener, so a case drives the drag.
const pan = vi.hoisted(() => ({
  onPan: null as null | ((event: PanEvent) => void),
  destroyed: 0,
}));
vi.mock('@astryxdesign/core/hooks', async importOriginal => ({
  ...(await importOriginal<object>()),
  useAnimator: () => recorder.animator,
  usePanGesture: (
    _ref: unknown,
    options: {onPan: (event: PanEvent) => void},
  ) => {
    pan.onPan = options.onPan;
  },
}));
vi.mock('@astryxdesign/core', async importOriginal => ({
  ...(await importOriginal<object>()),
  createAnimator: () => recorder.animator,
  createPanGesture: (
    _element: unknown,
    options: {onPan: (event: PanEvent) => void},
  ) => {
    pan.onPan = options.onPan;
    return {
      destroy: () => {
        pan.destroyed += 1;
      },
    };
  },
}));

/** One pan event at `x` px, at `vx` px/s. */
function panTo(state: PanEvent['state'], x: number, vx = 0) {
  act(() => {
    pan.onPan?.({state, translation: {x, y: 0}, velocity: {x: vx, y: 0}});
  });
}

/** A 150 px drag the pan reports, released at `velocity` px/s. */
function drag(velocity: number) {
  panTo('began', 15);
  for (let step = 2; step <= 10; step++) {
    panTo('changed', step * 15);
  }
  panTo('ended', 150, velocity);
}

const methods = () => recorder.state.calls.map(call => call.method);

const EXAMPLES = [
  {
    name: 'the useAnimator example',
    mount: () => render(<AnimatorPlayingCards />),
    discardButton: 'Discard Ace of spades',
    announced: 'Ace of spades discarded',
  },
  {
    name: 'the createAnimator example',
    mount: () => render(<AnimatorPlayingCardsVanilla />),
    discardButton: 'Discard the top card',
    announced: 'Ace of spades discarded',
  },
];

describe.each(EXAMPLES)('$name', ({mount, discardButton, announced}) => {
  beforeEach(() => {
    recorder.state.calls = [];
    recorder.state.fades = [];
  });

  it('a release the pan reports at rest springs back, not thrown', () => {
    mount();
    drag(0);
    expect(methods()).not.toContain('decay');
    expect(recorder.state.calls.at(-1)).toMatchObject({
      method: 'animate',
      values: {x: 0, y: 0, rotate: 0},
    });
  });

  it('a drag that the pan cancels springs back, even after fast moves', () => {
    mount();
    panTo('began', 15);
    for (let step = 2; step <= 10; step++) {
      panTo('changed', step * 15);
    }
    panTo('cancelled', 150);
    expect(methods()).not.toContain('decay');
    expect(recorder.state.calls.at(-1)).toMatchObject({
      method: 'animate',
      values: {x: 0, y: 0, rotate: 0},
    });
  });

  it('a flick deals and announces the next card once the thrown one fades, during its coast', async () => {
    mount();
    drag(1500);
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

  it('names the dealt card by its rank and suit', async () => {
    mount();
    act(() => {
      screen.getByRole('button', {name: discardButton}).click();
    });
    await act(async () => {
      recorder.state.finishFade();
    });
    expect(screen.getByRole('img', {name: 'King of hearts'})).toBeTruthy();
  });
});

/** The `set` calls that deal a card. */
const deals = () =>
  recorder.state.calls.filter(
    call =>
      call.method === 'set' && (call.values as {scale?: number}).scale === 0.9,
  );

describe.each(EXAMPLES)(
  '$name, one discard at a time',
  ({mount, discardButton}) => {
    beforeEach(() => {
      recorder.state.calls = [];
      recorder.state.fades = [];
    });

    /** Settles every running fade, as the animator ends them. */
    async function finishFades() {
      await act(async () => {
        while (recorder.state.fades.length > 0) {
          recorder.state.finishFade();
          await Promise.resolve();
        }
      });
    }

    it('a pan that begins while a card leaves is ignored to its end: it stops nothing and moves nothing, and the next card is dealt once', async () => {
      mount();
      act(() => {
        screen.getByRole('button', {name: discardButton}).click();
      });
      recorder.state.calls = [];
      panTo('began', 15);
      panTo('changed', 60);
      expect(methods()).toEqual([]);
      await finishFades();
      expect(deals()).toHaveLength(1);
      recorder.state.calls = [];
      // The drag outlives the discard: the dealt card stays where it is.
      panTo('changed', 90);
      panTo('ended', 120, 2000);
      expect(methods()).toEqual([]);
    });

    it('a pan a discard interrupts moves nothing more', async () => {
      mount();
      panTo('began', 15);
      panTo('changed', 30);
      act(() => {
        screen.getByRole('button', {name: discardButton}).click();
      });
      recorder.state.calls = [];
      panTo('changed', 60);
      panTo('ended', 120, 2000);
      expect(methods()).toEqual([]);
      await finishFades();
      expect(deals()).toHaveLength(1);
    });

    it('finishes the deal when a pan begins while the dealt card grows in', async () => {
      mount();
      act(() => {
        screen.getByRole('button', {name: discardButton}).click();
      });
      await act(async () => {
        recorder.state.finishFade();
      });
      expect(deals()).toHaveLength(1);
      recorder.state.calls = [];
      panTo('began', 15);
      panTo('ended', 20);
      // The pan's stop halts the deal's growth; the deal then finishes.
      const afterStop = recorder.state.calls.slice(methods().indexOf('stop'));
      expect(afterStop).toContainEqual({
        method: 'animate',
        values: {scale: 1, opacity: 1},
      });
    });

    it('follows the next pan after an ignored one', async () => {
      mount();
      act(() => {
        screen.getByRole('button', {name: discardButton}).click();
      });
      panTo('began', 15);
      await finishFades();
      panTo('ended', 30);
      recorder.state.calls = [];
      panTo('began', 15);
      panTo('changed', 45);
      expect(recorder.state.calls).toContainEqual({
        method: 'set',
        values: {x: 45, y: 0, rotate: 45 / 18},
      });
    });

    it('a second Discard press while the card leaves deals one card, not two', async () => {
      mount();
      const button = screen.getByRole('button', {name: discardButton});
      act(() => {
        button.click();
      });
      act(() => {
        button.click();
      });
      await act(async () => {
        while (recorder.state.fades.length > 0) {
          recorder.state.finishFade();
          await Promise.resolve();
        }
      });
      expect(deals()).toHaveLength(1);
    });

    it('a Discard press while a flicked card fades deals one card, not two', async () => {
      mount();
      drag(1500);
      act(() => {
        screen.getByRole('button', {name: discardButton}).click();
      });
      await act(async () => {
        while (recorder.state.fades.length > 0) {
          recorder.state.finishFade();
          await Promise.resolve();
        }
      });
      expect(deals()).toHaveLength(1);
    });
  },
);

describe('the createAnimator example', () => {
  it('colours its card from the theme\u2019s surface and text tokens, so it reads in a dark theme', () => {
    render(<AnimatorPlayingCardsVanilla />);
    const {style} = screen.getByRole('img', {name: 'Ace of spades'});
    expect(style.backgroundColor).toBe('var(--color-background-surface)');
    expect(style.color).toBe('var(--color-text-primary)');
  });

  it('takes its deck down when it unmounts', () => {
    recorder.state.calls = [];
    const {unmount} = render(<AnimatorPlayingCardsVanilla />);
    expect(screen.getByRole('img', {name: 'Ace of spades'})).toBeTruthy();
    const destroyed = pan.destroyed;
    unmount();
    expect(screen.queryByRole('img')).toBeNull();
    expect(methods()).toContain('destroy');
    expect(pan.destroyed).toBe(destroyed + 1);
  });
});
