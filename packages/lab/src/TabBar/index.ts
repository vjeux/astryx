// Copyright (c) Meta Platforms, Inc. and affiliates.

'use client';

/**
 * @file index.ts
 * @input Imports from TabBar.tsx and TabBarMoreList.tsx
 * @output Re-exports TabBar, TabBarItem, TabBarMoreList and their types
 * @position Barrel export; consumed by packages/lab/src/index.ts
 */

export {TabBar, TabBarItem} from './TabBar';
export type {TabBarItemProps, TabBarProps} from './TabBar';
export {TabBarMoreList} from './TabBarMoreList';
export type {TabBarMoreListProps} from './TabBarMoreList';
