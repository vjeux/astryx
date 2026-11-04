// Copyright (c) Meta Platforms, Inc. and affiliates.

'use client';

import {useRef} from 'react';
import {usePanGesture} from '@astryxdesign/core/hooks';

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

export default function PanDraggableBox() {
  const box = useRef<HTMLDivElement>(null);
  usePanGesture(box, {
    onPan: ({state, translation}) => {
      const style = box.current?.style;
      if (style == null) {
        return;
      }
      if (state === 'began' || state === 'changed') {
        // Follow the drag.
        style.transition = 'none';
        style.translate = `${translation.x}px ${translation.y}px`;
      } else {
        // Spring back when it is let go, unless the person reduces motion.
        const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
        style.transition = reduced ? 'none' : SPRING_BACK;
        style.translate = '0px 0px';
      }
    },
  });
  return (
    <div style={STAGE}>
      <div ref={box} style={BOX}>
        Drag me
      </div>
    </div>
  );
}
