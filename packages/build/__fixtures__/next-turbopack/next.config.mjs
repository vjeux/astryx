// Copyright (c) Meta Platforms, Inc. and affiliates.

// An app with its own StyleX setup three ways: a Babel config, a `*.tsx` rule
// list (which also matches Astryx source) and the StyleX PostCSS plugin; under
// webpack, a rule of its own on its own files.
import {createRequire} from 'node:module';
import {fileURLToPath} from 'node:url';
import {withAstryx} from '@astryxdesign/build/next';

const require = createRequire(import.meta.url);
const src = fileURLToPath(new URL('./src/', import.meta.url));
const loader = require.resolve('./app-loader.cjs');
const stylex = {name: 'stylex', ...require('./app-stylex.cjs')};

// Bare loaders mixed with a rule object, each logging where it runs.
const rules = {
  '*.tsx': [
    {loader, options: {name: 'a'}},
    {loaders: [{loader, options: stylex}], as: '*'},
    {loader, options: {name: 'b'}},
  ],
};

export default withAstryx({
  typescript: {ignoreBuildErrors: true},
  turbopack: {rules},
  webpack: config => {
    config.module.rules.push({
      test: /\.tsx$/,
      include: src,
      use: [{loader, options: stylex}],
    });
    return config;
  },
});
