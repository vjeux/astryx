// Copyright (c) Meta Platforms, Inc. and affiliates.

'use strict';

/**
 * Loader for Astryx package source, installed by `withAstryx()` under webpack
 * and Turbopack. It compiles each module's StyleX with the options the prebuilt
 * stylesheets are compiled with (source-stylesheet.js `stylexOptions`), so the
 * class names a component renders are the ones `@astryxdesign/build/next/postcss`
 * emits rules for. TypeScript and JSX are left for the bundler.
 */

const babel = require('@babel/core');
const stylexBabelPlugin = require('@stylexjs/babel-plugin');
const {pluginOptions} = require('./source-stylesheet');

module.exports = function astryxSourceLoader(source) {
  const callback = this.async();
  if (!source.includes('@stylexjs/stylex')) {
    callback(null, source);
    return;
  }
  babel
    .transformAsync(source, {
      filename: this.resourcePath,
      babelrc: false,
      configFile: false,
      sourceMaps: true,
      parserOpts: {plugins: ['typescript', 'jsx']},
      plugins: [[stylexBabelPlugin, pluginOptions(this.getOptions())]],
    })
    .then(result => callback(null, result.code, result.map), callback);
};
