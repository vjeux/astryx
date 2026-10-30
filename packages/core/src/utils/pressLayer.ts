// Copyright (c) Meta Platforms, Inc. and affiliates.

/* eslint-disable @astryx/no-hover-on-disabled -- Every hover branch is
 * nested beneath ENABLED below, as in interactionOverlay.stylex.ts. */

/**
 * @file pressLayer.ts
 * @input StyleX, the semantic overlay color tokens, the touch press strength
 *   (`pressVars`, interactionOverlay.stylex.ts), the control release's clock
 *   (controlPressLayer.stylex.ts) and the Reduce Motion fade
 * @output `pressLayerStyles`: the compositor press layer of every surface on
 *   an overlay variant other than Button and the cards (`before`, `after`,
 *   with each variant's host arms, `colorHost`, `imageHost` and
 *   `neutralHost`, and `positioned` for a host that is no containing block)
 * @position Internal to core: core's `exports` do not list this module
 *   (`architecture:public-component-api` INV12). Composed by SegmentedControl,
 *   Link, SideNav, Stepper, Outline, Calendar, Collapsible,
 *   NumberInput, Token, TopNav, CommandPalette, AvatarGroup and DateInput's
 *   touch field after their overlay variant (interactionOverlay.stylex.ts);
 *   Button's and the cards' layers are controlPressLayer.ts's, which this
 *   module leaves out of their imports.
 */

import * as stylex from '@stylexjs/stylex';
import {reducedMotionFadeConsts} from '../motion/reducedMotion.stylex';
import {colorVars} from '../theme/tokens.stylex';
import {controlPressConsts} from './controlPressLayer.stylex';
import {pressVars} from './interactionOverlay.stylex';

// The overlay's arm selectors (interactionOverlay.stylex.ts), restated here:
// StyleX resolves a style's keys within its own file.
const ENABLED = ':where(:not(:disabled,[aria-disabled="true"]))';
const HOVER_HOVER = '@media (hover: hover)';
const COARSE = '@media (pointer: coarse)';
const PRESSED_ON = '[data-astryx-press="on"]';
const PRESSED_FADING = '[data-astryx-press="fading"]';

const PRESS_ALPHA = pressVars['--astryx-press-alpha'];

const hoverImage = `linear-gradient(${colorVars['--color-overlay-hover']}, ${colorVars['--color-overlay-hover']})`;
const pressedImage = `linear-gradient(${colorVars['--color-overlay-pressed']}, ${colorVars['--color-overlay-pressed']})`;
const neutralImage = `linear-gradient(${colorVars['--color-neutral']}, ${colorVars['--color-neutral']})`;
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

/** Opacity 1 → 0: a control's press layer leaves; its fading arm runs it. */
const controlRelease = stylex.keyframes({
  from: {opacity: 1},
  to: {opacity: 0},
});

/** The control release's clock as CSS: the shared release's. */
const CONTROL_RELEASE_DURATION = `${controlPressConsts.controlReleaseMs}ms`;
/** A control's release curve: the shared release's. */
const CONTROL_RELEASE_EASE = controlPressConsts.controlReleaseEase;
/** Reduce Motion on a coarse primary pointer: the policy's cross-fade. */
const REDUCED_MOTION_RELEASE_DURATION = reducedMotionFadeConsts.duration;

/**
 * The strength's release on the element, for a surface whose own layer runs
 * the release under a coarse primary pointer: as the overlay variants run it
 * for any other pointer, and dropped under a coarse one, where the layer
 * releases on the compositor instead.
 */
const strengthReleaseOutsideCoarse = {
  animationName: {
    default: null,
    '[data-astryx-press="fading"]': {
      default: pressRelease,
      '@media (prefers-reduced-motion: reduce) and (not (pointer: coarse))':
        'none',
      '@media (pointer: coarse)': 'none',
    },
  },
};

/**
 * The `backgroundImage` variant's arms for a mouse (`:active`) and a hover,
 * restated from interactionOverlay.stylex.ts: `control` replaces that
 * variant's `backgroundImage`.
 */
const pointerImageArms = {
  ':active': {
    default: pressedImage,
    [COARSE]: 'none',
  },
  [HOVER_HOVER]: {
    default: null,
    ':hover': hoverImage,
    ':active': pressedImage,
  },
};

// The press layer and its host arms for every other surface the shared
// overlay paints, written with literal keys so one object serves `::before`
// and `::after` (a spread object keeps only literal keys through a build
// that lowers ES2015; see interactionOverlay.stylex.ts). The literals equal
// COARSE, ENABLED, PRESSED_ON and PRESSED_FADING above; a live press is
// either of the last two.

/**
 * The layer: the pressed token at full strength, under the content (its host
 * is a stacking context while the press lives), shown at once on the on arm
 * and released by its opacity, which engines run on the compositor.
 */
const pressLayer = {
  content: {
    default: null,
    '@media (pointer: coarse)': {
      default: null,
      ':where(:not(:disabled,[aria-disabled="true"]))': {
        default: null,
        ':is([data-astryx-press="on"],[data-astryx-press="fading"])': '""',
      },
    },
  },
  position: {
    default: null,
    '@media (pointer: coarse)': {
      default: null,
      ':where(:not(:disabled,[aria-disabled="true"]))': {
        default: null,
        ':is([data-astryx-press="on"],[data-astryx-press="fading"])':
          'absolute',
      },
    },
  },
  inset: {
    default: null,
    '@media (pointer: coarse)': {
      default: null,
      ':where(:not(:disabled,[aria-disabled="true"]))': {
        default: null,
        ':is([data-astryx-press="on"],[data-astryx-press="fading"])': 0,
      },
    },
  },
  zIndex: {
    default: null,
    '@media (pointer: coarse)': {
      default: null,
      ':where(:not(:disabled,[aria-disabled="true"]))': {
        default: null,
        ':is([data-astryx-press="on"],[data-astryx-press="fading"])': -1,
      },
    },
  },
  borderRadius: {
    default: null,
    '@media (pointer: coarse)': {
      default: null,
      ':where(:not(:disabled,[aria-disabled="true"]))': {
        default: null,
        ':is([data-astryx-press="on"],[data-astryx-press="fading"])': 'inherit',
      },
    },
  },
  pointerEvents: {
    default: null,
    '@media (pointer: coarse)': {
      default: null,
      ':where(:not(:disabled,[aria-disabled="true"]))': {
        default: null,
        ':is([data-astryx-press="on"],[data-astryx-press="fading"])': 'none',
      },
    },
  },
  backgroundColor: {
    default: null,
    '@media (pointer: coarse)': {
      default: null,
      ':where(:not(:disabled,[aria-disabled="true"]))': {
        default: null,
        ':is([data-astryx-press="on"],[data-astryx-press="fading"])':
          colorVars['--color-overlay-pressed'],
      },
    },
  },
  opacity: {
    default: null,
    '@media (pointer: coarse)': {
      default: null,
      ':where(:not(:disabled,[aria-disabled="true"]))': {
        default: null,
        '[data-astryx-press="on"]': 1,
        '[data-astryx-press="fading"]': 0,
      },
    },
  },
  animationName: {
    default: null,
    '@media (pointer: coarse)': {
      default: null,
      ':where(:not(:disabled,[aria-disabled="true"]))': {
        default: null,
        '[data-astryx-press="fading"]': controlRelease,
      },
    },
  },
  animationDuration: {
    default: null,
    '@media (pointer: coarse)': {
      default: null,
      '[data-astryx-press="fading"]': {
        default: CONTROL_RELEASE_DURATION,
        '@media (prefers-reduced-motion: reduce) and (pointer: coarse)':
          REDUCED_MOTION_RELEASE_DURATION,
      },
    },
  },
  animationTimingFunction: {
    default: null,
    '@media (pointer: coarse)': {
      default: null,
      '[data-astryx-press="fading"]': {
        default: CONTROL_RELEASE_EASE,
        '@media (prefers-reduced-motion: reduce) and (pointer: coarse)':
          reducedMotionFadeConsts.easing,
      },
    },
  },
  animationFillMode: {
    default: null,
    '@media (pointer: coarse)': {
      default: null,
      '[data-astryx-press="fading"]': 'both',
    },
  },
};

export const pressLayerStyles = stylex.create({
  /**
   * The host arms of the `backgroundColor` and `pressedBackgroundColor`
   * variants (interactionOverlay.stylex.ts), composed after the variant: the
   * press's image yields to the layer under a coarse primary pointer.
   */
  colorHost: {
    backgroundImage: {
      default: null,
      [ENABLED]: {
        default: null,
        [PRESSED_ON]: {default: pressedOverlayImage, [COARSE]: 'none'},
        [PRESSED_FADING]: {default: pressedOverlayImage, [COARSE]: 'none'},
      },
    },
  },
  /** The `backgroundImage` variant's host arms, its touch paint yielding. */
  imageHost: {
    backgroundImage: {
      default: null,
      [ENABLED]: {
        default: null,
        ...pointerImageArms,
        [PRESSED_ON]: {default: pressedOverlayImage, [COARSE]: 'none'},
        [PRESSED_FADING]: {default: pressedOverlayImage, [COARSE]: 'none'},
      },
    },
  },
  /**
   * The `backgroundImageOnNeutral` variant's host arms: under a coarse
   * primary pointer the neutral fill stays and the press yields to the layer.
   */
  neutralHost: {
    backgroundImage: {
      default: neutralImage,
      [ENABLED]: {
        default: null,
        ':active': {
          default: `${pressedImage}, ${neutralImage}`,
          [COARSE]: neutralImage,
        },
        [HOVER_HOVER]: {
          default: null,
          ':hover': `${hoverImage}, ${neutralImage}`,
          ':active': `${pressedImage}, ${neutralImage}`,
        },
        [PRESSED_ON]: {
          default: `${pressedOverlayImage}, ${neutralImage}`,
          [COARSE]: neutralImage,
        },
        [PRESSED_FADING]: {
          default: `${pressedOverlayImage}, ${neutralImage}`,
          [COARSE]: neutralImage,
        },
      },
    },
  },
  /**
   * The press layer on the host's `::before`, under its content. Under a
   * coarse primary pointer the strength holds while the press fades (no
   * custom property animates, so nothing is repainted per frame) and the
   * layer releases by opacity on the compositor; the layer and the host's
   * stacking context exist only while a press is on or fading. With any
   * other pointer nothing here applies (the desktop rule, `spec:AST-017`
   * FR59/DEC-25).
   */
  before: {
    ...strengthReleaseOutsideCoarse,
    isolation: {
      default: null,
      '@media (pointer: coarse)': {
        default: null,
        ':where(:not(:disabled,[aria-disabled="true"]))': {
          default: null,
          ':is([data-astryx-press="on"],[data-astryx-press="fading"])':
            'isolate',
        },
      },
    },
    '::before': pressLayer,
  },
  /** The same layer on `::after`, for a host whose `::before` is its own. */
  after: {
    ...strengthReleaseOutsideCoarse,
    isolation: {
      default: null,
      '@media (pointer: coarse)': {
        default: null,
        ':where(:not(:disabled,[aria-disabled="true"]))': {
          default: null,
          ':is([data-astryx-press="on"],[data-astryx-press="fading"])':
            'isolate',
        },
      },
    },
    '::after': pressLayer,
  },
  /**
   * A host that is no containing block of its own becomes one while its
   * press lives under a coarse primary pointer, so its layer covers it.
   */
  positioned: {
    position: {
      default: null,
      '@media (pointer: coarse)': {
        default: null,
        ':where(:not(:disabled,[aria-disabled="true"]))': {
          default: null,
          ':is([data-astryx-press="on"],[data-astryx-press="fading"])':
            'relative',
        },
      },
    },
  },
});
