// Copyright (c) Meta Platforms, Inc. and affiliates.

'use client';

import {createPanGesture} from '@astryxdesign/core';

const SPRING_BACK = 'translate 300ms cubic-bezier(0.2, 0.9, 0.3, 1.2)';
/** Room to drag in: the box springs back to its center. */
const STAGE = {
  width: 'min(320px, 80vw)',
  height: 200,
  display: 'grid',
  placeItems: 'center',
  overflow: 'hidden',
} as const;
const BOX = {
  width: 120,
  padding: 24,
  textAlign: 'center',
  borderRadius: 12,
  backgroundColor: 'var(--color-background-surface)',
  color: 'var(--color-text-primary)',
  boxShadow: '0 2px 8px rgb(0 0 0 / 0.2)',
  cursor: 'grab',
  userSelect: 'none',
} as const;

/**
 * Makes `box` follow a drag and spring back, in plain JavaScript. As a
 * callback ref, its cleanup takes the pan down when React unmounts the box.
 */
function makeDraggable(box: HTMLDivElement | null) {
  if (box == null) {
    return undefined;
  }
  const pan = createPanGesture(box, {
    onPan: ({state, translation}) => {
      if (state === 'began' || state === 'changed') {
        // Follow the drag.
        box.style.transition = 'none';
        box.style.translate = `${translation.x}px ${translation.y}px`;
      } else {
        // Spring back when it is let go, unless the person reduces motion.
        const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
        box.style.transition = reduced ? 'none' : SPRING_BACK;
        box.style.translate = '0px 0px';
      }
    },
  });
  return () => pan.destroy();
}

export default function PanDraggableBoxVanilla() {
  return (
    <div style={STAGE}>
      <div ref={makeDraggable} style={BOX}>
        Drag me
      </div>
    </div>
  );
}
