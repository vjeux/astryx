// Copyright (c) Meta Platforms, Inc. and affiliates.

/* eslint-disable @astryx/no-hover-on-disabled -- Every hover branch is
 * nested beneath ENABLED below, as in interactionOverlay.stylex.ts. */

/**
 * @file privateAttributes/press.stylex.ts
 * @input StyleX, the overlay color tokens, the touch press strength
 *   (`pressVars`) and the row layer's clocks (utils/rowPressLayer.stylex.ts)
 * @output `rowPressLayerStyles`: the compositor press layer for list rows
 *   (`cell`), and its image arms for a `backgroundImage` row (`cellOnImage`)
 * @position Owner module of the private press attribute: new styles that read
 *   it live here. Item and TreeList compose the row layer after their overlay
 *   variant. No package entry exports it.
 */

import * as stylex from '@stylexjs/stylex';
import {colorVars} from '../theme/tokens.stylex';
import {pressVars} from '../utils/interactionOverlay.stylex';
import {cellPressConsts} from '../utils/rowPressLayer.stylex';

// The overlay's arm selectors (utils/interactionOverlay.stylex.ts), restated
// here: StyleX resolves a style's keys within its own file.
const ENABLED = ':where(:not(:disabled,[aria-disabled="true"]))';
const HOVER_HOVER = '@media (hover: hover)';
const COARSE = '@media (pointer: coarse)';
const PRESSED_ON = '[data-astryx-press="on"]';
const PRESSED_FADING = '[data-astryx-press="fading"]';
/**
 * A press in any of its states. The row layer exists only then, so at rest a
 * row's own `::before` and its stacking stay untouched.
 */
const PRESSED_ANY =
  ':is([data-astryx-press="on"],[data-astryx-press="fading"])';

const PRESS_ALPHA = pressVars['--astryx-press-alpha'];

const hoverImage = `linear-gradient(${colorVars['--color-overlay-hover']}, ${colorVars['--color-overlay-hover']})`;
const pressedImage = `linear-gradient(${colorVars['--color-overlay-pressed']}, ${colorVars['--color-overlay-pressed']})`;
/** The overlay's paint, read back off the element (its gradient layer). */
const pressedOverlayImage = 'var(--_press-paint-image)';

/**
 * The overlay's strength release (interactionOverlay.stylex.ts), restated so
 * a fine pointer keeps it: the same keyframes, so the same animation.
 */
const pressRelease = stylex.keyframes({
  from: {[PRESS_ALPHA]: 1},
  to: {[PRESS_ALPHA]: 0},
});

/**
 * The row layer's clock, scaled by the theme's `--_astryx-motion-tempo` up to
 * 1.5, as the overlay's release is. The press controller's timer reads the
 * same property, so the fade and the attribute end together.
 */
const CELL_RELEASE = `calc(${cellPressConsts.cellReleaseMs}ms * min(var(--_astryx-motion-tempo, 1), 1.5))`;
/** The same clock under Reduce Motion: a tempo may shorten it, never lengthen it. */
const CELL_RELEASE_REDUCED = `min(${cellPressConsts.cellReleaseMs}ms, calc(${cellPressConsts.cellReleaseMs}ms * var(--_astryx-motion-tempo, 1)))`;
const REDUCED_MOTION = '@media (prefers-reduced-motion: reduce)';

/** Opacity 1 → 0: the row layer leaves; its fading arm runs it. */
const cellRelease = stylex.keyframes({
  from: {opacity: 1},
  to: {opacity: 0},
});

/** The release's curve: the table's gentle ease-out. */
const RELEASE_EASE = cellPressConsts.cellReleaseEase;

export const rowPressLayerStyles = stylex.create({
  /**
   * A list row's touch press on a compositor layer, for Item and TreeList's
   * row box. Compose it after the row's overlay variant, since StyleX is
   * last-wins per property.
   *
   * The variant's touch paint is a gradient whose strength is a registered
   * custom property. That animates on the main thread, so while script runs a
   * pressed row stays at full strength. Here the press is a `::before` under
   * the row's content, and its opacity is the strength. `on` shows it at once.
   * `fading` animates its opacity from 1 to 0 on the cell's release clock.
   * Engines run that opacity animation on the compositor, so it keeps going
   * while the main thread is blocked, and it paints nothing. The pixels match
   * the variant's paint at the same strength. The variant keeps the hover and
   * a mouse's `:active`.
   *
   * The layer is placed absolutely, so the row must be positioned.
   * `isolation: isolate` keeps the layer above the row's background, such as
   * a selected fill, and below its content. The layer exists only while a
   * press is on or releasing. During a press it replaces the row's own
   * `::before`, so a caller decorates with `::after` or a child.
   *
   * All of this applies under a coarse primary pointer only. A fine pointer
   * keeps the variant exactly: no layer, no stacking context, and its own
   * touch paint.
   */
  cell: {
    // The `backgroundColor` variant's image arms (Item's), whose touch paint
    // yields to the layer under a finger. Only the row's own image turns off.
    // The press paint (`--_press-paint`) stays the variant's, so a row's
    // descendants still paint from it. A fine pointer keeps the arms exactly.
    // `cellOnImage` does the same for the `backgroundImage` variant.
    backgroundImage: {
      default: null,
      [ENABLED]: {
        default: null,
        [PRESSED_ON]: {default: pressedOverlayImage, [COARSE]: 'none'},
        [PRESSED_FADING]: {default: pressedOverlayImage, [COARSE]: 'none'},
      },
    },
    // Under a finger the strength's own release (a main-thread animation)
    // is dropped: the layer fades instead, on the compositor. A row whose
    // descendant fades at the row's strength (a radio row's circle) brings
    // it back with `pressedAlpha`. A fine pointer keeps it as the variant
    // declares it (its clock and curve are untouched).
    animationName: {
      default: null,
      [PRESSED_FADING]: {default: pressRelease, [COARSE]: 'none'},
    },
    // The stacking context the layer needs, for a press only.
    isolation: {
      default: null,
      [COARSE]: {default: null, [PRESSED_ANY]: 'isolate'},
    },
    // The layer exists under a finger only, while a press is on or releasing.
    // With a fine pointer none of it applies. At rest a row's own `::before`
    // stays as it was.
    '::before': {
      content: {
        default: null,
        [COARSE]: {
          default: null,
          [ENABLED]: {default: null, [PRESSED_ANY]: '""'},
        },
      },
      position: {
        default: null,
        [COARSE]: {default: null, [PRESSED_ANY]: 'absolute'},
      },
      inset: {default: null, [COARSE]: {default: null, [PRESSED_ANY]: 0}},
      zIndex: {default: null, [COARSE]: {default: null, [PRESSED_ANY]: -1}},
      borderRadius: {
        default: null,
        [COARSE]: {default: null, [PRESSED_ANY]: 'inherit'},
      },
      pointerEvents: {
        default: null,
        [COARSE]: {default: null, [PRESSED_ANY]: 'none'},
      },
      backgroundColor: {
        default: null,
        [COARSE]: {
          default: null,
          [PRESSED_ANY]: colorVars['--color-overlay-pressed'],
        },
      },
      // On at once while the press is believed; nothing transitions it.
      opacity: {
        default: null,
        [COARSE]: {default: null, [PRESSED_ON]: 1, [PRESSED_FADING]: 0},
      },
      animationName: {
        default: null,
        [COARSE]: {
          default: null,
          [ENABLED]: {default: null, [PRESSED_FADING]: cellRelease},
        },
      },
      animationDuration: {
        default: null,
        [COARSE]: {
          default: null,
          [PRESSED_FADING]: {
            default: CELL_RELEASE,
            [REDUCED_MOTION]: CELL_RELEASE_REDUCED,
          },
        },
      },
      animationTimingFunction: {
        default: null,
        [COARSE]: {
          default: null,
          [PRESSED_FADING]: RELEASE_EASE,
        },
      },
      animationFillMode: {
        default: null,
        [COARSE]: {default: null, [PRESSED_FADING]: 'both'},
      },
    },
  },
  /**
   * `cell`'s image arms for a row on the `backgroundImage` variant, such as
   * TreeList's row box. Compose it after `cell`. Under a coarse primary
   * pointer, the variant's touch paint yields to the layer.
   */
  cellOnImage: {
    backgroundImage: {
      default: null,
      [ENABLED]: {
        default: null,
        ':active': {
          default: pressedImage,
          [COARSE]: 'none',
        },
        [HOVER_HOVER]: {
          default: null,
          ':hover': hoverImage,
          ':active': pressedImage,
        },
        [PRESSED_ON]: {default: pressedOverlayImage, [COARSE]: 'none'},
        [PRESSED_FADING]: {default: pressedOverlayImage, [COARSE]: 'none'},
      },
    },
  },
});
