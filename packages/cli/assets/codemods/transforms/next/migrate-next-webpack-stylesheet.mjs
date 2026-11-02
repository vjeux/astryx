// Copyright (c) Meta Platforms, Inc. and affiliates.

/**
 * @file Codemod: move a Next.js webpack stylesheet onto withAstryx()'s source build
 *
 * Under webpack, `withAstryx()` now builds Astryx as it does under Turbopack:
 * Astryx's rules come from `@astryx;` (via `@astryxdesign/build/next/postcss`),
 * inside `@layer astryx-base`, and the app's own CSS is unlayered. The former
 * webpack setup instead registered a `product` layer for the app's StyleX and
 * printed Astryx's rules through `@stylex;`. This transform makes two narrow
 * edits to CSS/SCSS files:
 *
 * - `@layer reset, astryx-base, astryx-theme, product;`, that exact list,
 *   loses `product`.
 * - A stylesheet that imports `@astryxdesign/core/reset.css`, prints `@stylex;`
 *   and imports no prebuilt package stylesheet (`astryx.css`, `lab.css`,
 *   `charts.css`, `richtext.css`) gains `@astryx;` before its `@stylex;`.
 *   `@stylex;` stays for the app's own StyleX.
 *
 * A stylesheet already holding `@astryx;`, or loading a prebuilt package
 * stylesheet (the default setup), is left alone. CSS has no meaningful AST for
 * this class of edit, so this is a plain string transform.
 */

export const meta = {
  title: "Move a Next.js webpack stylesheet onto withAstryx()'s source build",
  description:
    'Drops `product` from the `@layer reset, astryx-base, astryx-theme, product;` ' +
    'list, and adds `@astryx;` before `@stylex;` in a stylesheet that loads ' +
    "Core's reset.css and no prebuilt package stylesheet.",
  fileExtensions: ['.css', '.scss'],
};

const PRODUCT_LAYER_LIST =
  /@layer\s+reset\s*,\s*astryx-base\s*,\s*astryx-theme\s*,\s*product\s*;/g;
const RESET_IMPORT =
  /@import\s+(?:url\(\s*)?(['"])@astryxdesign\/core\/reset\.css\1/;
const PREBUILT_IMPORT =
  /@import\s+(?:url\(\s*)?(['"])@astryxdesign\/(?:core\/astryx|lab\/lab|charts\/charts|richtext\/richtext)\.css\1/;
const STYLEX_RULE = /^([ \t]*)@stylex\s*;/m;
const ASTRYX_RULE = /@astryx\s*;/;

/**
 * @param {import('../../../../authoring/codemod/type').AstryxCodemodFile} file
 * @returns {string | null | undefined}
 */
export default function transformer(file /*, api */) {
  const source = file.source;
  if (typeof source !== 'string') return undefined;

  let next = source.replace(
    PRODUCT_LAYER_LIST,
    '@layer reset, astryx-base, astryx-theme;',
  );
  if (
    RESET_IMPORT.test(next) &&
    STYLEX_RULE.test(next) &&
    !ASTRYX_RULE.test(next) &&
    !PREBUILT_IMPORT.test(next)
  ) {
    next = next.replace(
      STYLEX_RULE,
      (rule, indent) => `${indent}@astryx;\n${rule}`,
    );
  }
  return next === source ? undefined : next;
}
