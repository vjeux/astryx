// Copyright (c) Meta Platforms, Inc. and affiliates.

/**
 * @file next transform manifest
 *
 * Staged codemods for the next release. The Version Packages PR promotes
 * this file into the resolved version folder.
 */

import migrateNextWebpackConfig, {
  meta as migrateNextWebpackConfigMeta,
} from './migrate-next-webpack-config.mjs';
import migrateNextWebpackStylesheet, {
  meta as migrateNextWebpackStylesheetMeta,
} from './migrate-next-webpack-stylesheet.mjs';

export default [
  {
    // withAstryx() builds Astryx under webpack as under Turbopack
    // (spec:AST-080 FR9); the former webpack setup's Babel and PostCSS
    // entries and its stylesheet's `product` layer move with it.
    name: 'migrate-next-webpack-config',
    transform: migrateNextWebpackConfig,
    meta: migrateNextWebpackConfigMeta,
  },
  {
    name: 'migrate-next-webpack-stylesheet',
    transform: migrateNextWebpackStylesheet,
    meta: migrateNextWebpackStylesheetMeta,
  },
];
