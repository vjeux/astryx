// Copyright (c) Meta Platforms, Inc. and affiliates.

'use client';

/**
 * @file DropdownMenuTouch.ts
 * @input menuSurfaceMotion.ts (UIMenu's grow and collapse on the animator)
 * @output DropdownMenu's touch layer: createMenuSurfaceMotion and its type
 * @position The one module DropdownMenu imports touch-only code through, and
 *   its only import site is DropdownMenu.tsx. The mouse paths stay outside
 *   it, so a desktop build can swap it for a no-op (AST-080 FR8).
 *
 * SYNC: When modified, keep every touch-only import of DropdownMenu.tsx here.
 */

export {
  createMenuSurfaceMotion,
  type MenuSurfaceMotion,
} from './menuSurfaceMotion';
