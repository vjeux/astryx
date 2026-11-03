// Copyright (c) Meta Platforms, Inc. and affiliates.

/**
 * @file index.ts
 * @input keyboardHeight.ts, sheetKeyboard.ts, keyboardLayoutGuide.ts,
 *   keyboardModel.ts, rideKeyboard.ts and keyboardDismiss.ts
 * @output Re-exports the on-screen keyboard module, BottomSheet's hook, the
 *   keyboard layout guide, rideKeyboard and observeKeyboardDismiss, with
 *   their types
 * @position Entry of the keyboard module. It is internal to core, and the
 *   package entry point exports nothing here.
 *
 * SYNC: When modified, update /packages/core/src/keyboard/README.md
 */

export {
  claimTapFocus,
  findTextEntryControl,
  getKeyboardHeight,
  isKeyboardMeasurable,
  isTextEntryControl,
  measureKeyboardHeight,
  refuseFocusReveal,
  subscribeKeyboardHeight,
  useKeyboardHeight,
  watchRevealPan,
  type ClaimTapFocusOptions,
  type KeyboardHeightEvent,
  type RefuseFocusRevealOptions,
  type RevealPanWatch,
  type WatchRevealPanOptions,
} from './keyboardHeight';
export {useSheetKeyboard} from './sheetKeyboard';
export {
  bringsUpKeyboard,
  getKeyboardLayoutGuide,
  keyboardProfileOf,
  type KeyboardLayoutGuide,
} from './keyboardLayoutGuide';
export {rideKeyboard} from './rideKeyboard';
export {observeKeyboardDismiss} from './keyboardDismiss';
export type {
  KeyboardDismissMode,
  KeyboardDismissOptions,
} from './keyboardDismiss';
export {
  createKeyboardModel,
  type KeyboardCurve,
  type KeyboardModel,
  type KeyboardModelOptions,
  type KeyboardProfile,
  type KeyboardTransition,
  type KeyboardTransitionKind,
} from './keyboardModel';
