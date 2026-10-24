// Copyright (c) Meta Platforms, Inc. and affiliates.

/**
 * @file uikitMorphFrames.ts
 * @input UIKit's context-menu presentation measured on iOS 26.2 (iPhone 17
 *   Pro simulator, 60 Hz): a 200 × 120 pt card held 0.9 s at its centre, a
 *   3-action menu (250 × 146 pt) below it
 * @output UIKIT_MORPH_CASES: the menu's morph container (its glass) per
 *   frame, from willDisplay, for the card in the middle and at the left edge
 * @position Fixture for the morph's parity test
 *   (packages/core/src/ContextMenu/contextMenuLiftGeometry.test.ts)
 *
 * Columns: ms after willDisplay; the glass's centre x and y; its width and
 * height (pt). `startMs` is when its centre starts moving (UIKit commits the
 * animation a frame or two after the delegate call; least squares); its size
 * starts `contextMenu.lift.morphSizeDelayMs` later.
 */

interface MorphCase {
  readonly press: {readonly x: number; readonly y: number};
  readonly menu: {
    readonly x: number;
    readonly y: number;
    readonly width: number;
    readonly height: number;
  };
  readonly startMs: number;
  readonly frames: ReadonlyArray<
    readonly [ms: number, x: number, y: number, width: number, height: number]
  >;
}

export const UIKIT_MORPH_CASES: Readonly<
  Record<'middle' | 'leftEdge', MorphCase>
> = {
  middle: {
    press: {x: 201, y: 437},
    menu: {x: 76, y: 521, width: 250, height: 146},
    startMs: 29,
    frames: [
      [45.4, 201, 444.65, 65.08, 51.64],
      [62, 201, 462.49, 81.74, 60.69],
      [78.7, 201, 484.71, 104.59, 72.93],
      [95.4, 201, 507.44, 130.43, 86.33],
      [112, 201, 528.38, 156.44, 99.47],
      [128.7, 201, 546.42, 180.45, 111.37],
      [145.4, 201, 561.13, 201.11, 121.51],
      [162, 201, 572.61, 217.84, 129.69],
      [178.7, 201, 581.14, 230.64, 135.95],
      [195.4, 201, 587.23, 239.91, 140.52],
      [212, 201, 591.33, 246.23, 143.66],
      [228.7, 201, 593.94, 250.23, 145.69],
      [245.4, 201, 595.43, 252.51, 146.89],
      [262, 201, 596.15, 253.58, 147.49],
      [278.7, 201, 596.37, 253.87, 147.7],
      [295.4, 201, 596.27, 253.67, 147.66],
      [312, 201, 596, 253.22, 147.48],
      [328.7, 201, 595.67, 252.66, 147.25],
      [345.4, 201, 595.32, 252.1, 146.99],
      [362, 201, 595, 251.58, 146.76],
      [378.7, 201, 594.73, 251.14, 146.55],
      [395.4, 201, 594.5, 250.78, 146.39],
      [412, 201, 594.33, 250.5, 146.25],
      [428.7, 201, 594.2, 250.38, 146.15],
      [445.4, 201, 594.1, 250.15, 146.08],
      [462, 201, 594.04, 250.02, 146.02],
      [478.7, 201, 594, 250, 146.01],
    ],
  },
  leftEdge: {
    press: {x: 104, y: 437},
    menu: {x: 16, y: 521, width: 250, height: 146},
    startMs: 14.5,
    frames: [
      [31.2, 105.87, 444.65, 65.08, 51.64],
      [47.9, 110.18, 462.49, 81.74, 60.69],
      [64.6, 115.5, 484.71, 104.59, 72.93],
      [81.2, 120.9, 507.44, 130.43, 86.33],
      [97.9, 125.85, 528.38, 156.44, 99.47],
      [114.6, 130.07, 546.42, 180.45, 111.37],
      [131.2, 133.5, 561.13, 201.11, 121.51],
      [147.9, 136.16, 572.61, 217.84, 129.69],
      [164.6, 138.12, 581.14, 230.64, 135.95],
      [181.2, 139.51, 587.23, 239.91, 140.52],
      [197.9, 140.44, 591.33, 246.23, 143.66],
      [214.6, 141.03, 593.94, 250.23, 145.69],
      [231.2, 141.37, 595.43, 252.51, 146.89],
      [247.9, 141.52, 596.15, 253.14, 147.49],
      [264.6, 141.56, 596.37, 253.87, 147.7],
      [281.2, 141.53, 596.27, 253.67, 147.66],
      [297.9, 141.47, 596, 253.22, 147.48],
      [314.6, 141.39, 595.67, 252.66, 147.25],
      [331.2, 141.31, 595.32, 252.1, 146.99],
      [347.9, 141.23, 595, 251.58, 146.76],
      [364.6, 141.17, 594.73, 251.14, 146.55],
      [381.2, 141.11, 594.5, 250.78, 146.39],
      [397.9, 141.07, 594.33, 250.5, 146.25],
      [414.6, 141.04, 594.2, 250.3, 146.15],
      [431.2, 141.03, 594.1, 250.15, 146.08],
      [447.9, 141.01, 594.04, 250.02, 146.02],
      [464.6, 141, 594, 250, 146.01],
    ],
  },
};
