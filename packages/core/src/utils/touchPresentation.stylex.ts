// Copyright (c) Meta Platforms, Inc. and affiliates.

/**
 * @file touchPresentation.stylex.ts
 * @input Uses StyleX defineConsts
 * @output touchMedia: the touch presentation's conditions as StyleX media keys
 * @position CSS-first twin of utils/touchPresentation.ts
 *
 * The same conditions as the resolver's queries, as keys a style can switch
 * on, so a touch presentation paints right before hydration:
 *
 * ```
 * const styles = stylex.create({
 *   spin: {
 *     animationDuration: {default: themeDuration, [touchMedia.touch]: '1s'},
 *   },
 * });
 * ```
 *
 * `defineConsts`, not plain exported strings: StyleX inlines a cross-file
 * value only through `defineVars`/`defineConsts` from a `.stylex.ts` file.
 *
 * SYNC: When modified, update utils/touchPresentation.ts (the queries).
 */

import * as stylex from '@stylexjs/stylex';

export const touchMedia = stylex.defineConsts({
  /** The primary pointer is coarse: touch behaviours and UIKit motion. */
  touch: '@media (pointer: coarse)',
  /** The viewport is compact: layout behaviours. */
  compact: '@media (max-width: 768px)',
  /** Both: presentations such as a sheet in place of a popover. */
  compactTouch: '@media (max-width: 768px) and (pointer: coarse)',
});
