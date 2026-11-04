// Copyright (c) Meta Platforms, Inc. and affiliates.
// @vitest-environment jsdom

/**
 * @file Behavior test for the two draggable-box pan blocks.
 * @input The shipped PanDraggableBox (usePanGesture) and
 *   PanDraggableBoxVanilla (createPanGesture) blocks, rendered in jsdom with
 *   the pan itself stubbed.
 * @output Guards that the box follows a drag and springs back when it is let
 *   go. A person who reduces motion gets no spring. The plain-JavaScript
 *   block takes its pan down with the box.
 * @position CLI template regression coverage; runs in the node test project,
 *   under jsdom for this file.
 */

import {act, createElement, type ComponentType} from 'react';
import {createRoot} from 'react-dom/client';
import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest';
import PanDraggableBoxVanilla from '../../assets/templates/blocks/components/createPanGesture/PanDraggableBoxVanilla';
import PanDraggableBox from '../../assets/templates/blocks/components/usePanGesture/PanDraggableBox';

type PanEvent = {
  state: 'began' | 'changed' | 'ended' | 'cancelled';
  translation: {x: number; y: number};
  velocity: {x: number; y: number};
};
// The stubbed pan keeps the block's listener, so a case can drive a drag.
const pan = vi.hoisted(() => ({
  onPan: null as null | ((event: PanEvent) => void),
  destroyed: 0,
}));
vi.mock('@astryxdesign/core/hooks', () => ({
  usePanGesture: (
    _ref: unknown,
    options: {onPan: (event: PanEvent) => void},
  ) => {
    pan.onPan = options.onPan;
  },
}));
vi.mock('@astryxdesign/core', () => ({
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

const reactActEnvironment = globalThis as {IS_REACT_ACT_ENVIRONMENT?: boolean};
let reducesMotion = false;

beforeEach(() => {
  reactActEnvironment.IS_REACT_ACT_ENVIRONMENT = true;
  reducesMotion = false;
  window.matchMedia = ((query: string) => ({
    matches: reducesMotion,
    media: query,
    addEventListener: () => {},
    removeEventListener: () => {},
  })) as unknown as typeof window.matchMedia;
});

afterEach(() => {
  document.body.innerHTML = '';
});

async function mount(Block: ComponentType) {
  const container = document.createElement('div');
  document.body.append(container);
  const root = createRoot(container);
  await act(async () => {
    root.render(createElement(Block));
  });
  // The box sits in its stage.
  const box = container.firstElementChild?.firstElementChild;
  return {root, box: box as HTMLElement};
}

const at = (x: number, y = 0) => ({x, y});

/** A drag to (30, 12), then its release. */
function drag(release: () => void) {
  pan.onPan?.({state: 'began', translation: at(0), velocity: at(0)});
  pan.onPan?.({state: 'changed', translation: at(30, 12), velocity: at(400)});
  release();
}

describe('the draggable-box pan blocks', () => {
  for (const [name, Block] of [
    ['usePanGesture', PanDraggableBox],
    ['createPanGesture', PanDraggableBoxVanilla],
  ] as ReadonlyArray<[string, ComponentType]>) {
    it(`follows a drag, then springs back when it is let go (${name})`, async () => {
      const {box} = await mount(Block);
      let held = {translate: '', transition: ''};
      drag(() => {
        held = {
          translate: box.style.translate,
          transition: box.style.transition,
        };
        pan.onPan?.({
          state: 'ended',
          translation: at(30, 12),
          velocity: at(0),
        });
      });
      expect(held).toEqual({translate: '30px 12px', transition: 'none'});
      expect(box.style.translate).toBe('0px 0px');
      expect(box.style.transition).toContain('translate 300ms');
    });

    it(`springs back at once for a person who reduces motion (${name})`, async () => {
      reducesMotion = true;
      const {box} = await mount(Block);
      drag(() =>
        pan.onPan?.({
          state: 'cancelled',
          translation: at(30, 12),
          velocity: at(0),
        }),
      );
      expect({
        translate: box.style.translate,
        transition: box.style.transition,
      }).toEqual({translate: '0px 0px', transition: 'none'});
    });
  }

  it('takes the plain-JavaScript pan down with the box', async () => {
    const {root} = await mount(PanDraggableBoxVanilla);
    const destroyed = pan.destroyed;
    await act(async () => {
      root.unmount();
    });
    expect(pan.destroyed).toBe(destroyed + 1);
  });
});
