// Copyright (c) Meta Platforms, Inc. and affiliates.

/**
 * @file groupHitArea.stylex.ts
 * @input The hit inset properties that utils/hitArea.ts writes
 * @output groupHitAreaStyles: the invisible hit layer of a group whose
 *   members' touch targets grow toward 44 px
 * @position Shared style of the group press tracking
 *   (hooks/useGroupPressTracking). ButtonGroup and ToggleButtonGroup apply it.
 *   SYNC: /packages/core/src/utils/hitArea.ts (HIT_INSET_PROPERTIES)
 */

import * as stylex from '@stylexjs/stylex';

export const groupHitAreaStyles = stylex.create({
  // A group applies this only under a coarse primary pointer, where
  // utils/hitArea.ts writes how far the group may grow toward 44 px on each
  // side. A finger just past a small member lands on this layer, and the
  // tracker picks that member. The root contains the layer and isolates its
  // z-index, so the layer sits under the members.
  hitArea: {
    position: 'relative',
    isolation: 'isolate',
    '::after': {
      content: '""',
      position: 'absolute',
      inset:
        'calc(var(--astryx-hit-inset-top, 0px) * -1) calc(var(--astryx-hit-inset-right, 0px) * -1) calc(var(--astryx-hit-inset-bottom, 0px) * -1) calc(var(--astryx-hit-inset-left, 0px) * -1)',
      zIndex: -1,
    },
  },
});
