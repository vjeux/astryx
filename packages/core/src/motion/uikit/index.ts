// Copyright (c) Meta Platforms, Inc. and affiliates.

/**
 * @file index.ts
 * @input The domain files of the UIKit constants table
 * @output Re-exports `springs`, `scroll`, `timing` and the component domains
 *   (`switchControl`)
 * @position Entry of the UIKit constants table (motion/uikit). Internal to
 *   core: not exported from the package entry point
 *
 * THE table (law P1): every spring, duration, deceleration rate, rubber-band
 * constant and timing curve a touch presentation uses comes from here, with
 * its source next to it. Components never carry their own numbers. Gesture
 * thresholds live in the sibling `gestures.ts`, owned by the gesture
 * foundation.
 *
 * SYNC: When a domain file is added, re-export it here and list it in
 * /packages/core/src/motion/README.md.
 */

export {scroll} from './scroll';
export {springs} from './springs';
export {switchControl} from './switch';
export {timing} from './timing';
