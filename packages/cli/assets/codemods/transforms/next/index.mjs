// Copyright (c) Meta Platforms, Inc. and affiliates.
/**
 * @file next transform manifest
 *
 * Staged codemods for the next release. The Version Packages PR promotes
 * this file into the resolved version folder.
 */

import migrateUseMenuPressToRefForm, {
  meta as migrateUseMenuPressToRefFormMeta,
} from './migrate-use-menu-press-to-ref-form.mjs';

export default [
  {
    name: 'migrate-use-menu-press-to-ref-form',
    transform: migrateUseMenuPressToRefForm,
    meta: migrateUseMenuPressToRefFormMeta,
  },
];
