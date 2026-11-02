// Copyright (c) Meta Platforms, Inc. and affiliates.

/**
 * @file Codemod: move a Next.js webpack Babel and PostCSS config onto withAstryx()'s source build
 *
 * Under webpack, `withAstryx()` now compiles Astryx itself, as under Turbopack,
 * and `@astryxdesign/build/postcss` refuses to run beside it. The former
 * webpack setup compiled Astryx and the app's StyleX together through
 * `@astryxdesign/build/babel` and `@astryxdesign/build/postcss`. This transform
 * rewrites those two entries in `babel.config.*`, `.babelrc.*` and
 * `postcss.config.*` files:
 *
 * - `'@astryxdesign/build/babel'` becomes `'@stylexjs/babel-plugin'`, with the
 *   same options: they are StyleX's, now for the app's own StyleX only.
 * - The `'@astryxdesign/build/postcss'` plugin entry becomes
 *   `'@astryxdesign/build/next/postcss': {}` and, when it had `babelPlugins`,
 *   `'@stylexjs/postcss-plugin'` compiling the app's own StyleX from `appDir`
 *   (default `src`) with those Babel plugins. An entry with any other option is
 *   left alone: the build's refusal message names the manual steps.
 */

export const meta = {
  title:
    "Move a Next.js webpack Babel and PostCSS config onto withAstryx()'s source build",
  description:
    "Rewrites '@astryxdesign/build/babel' to '@stylexjs/babel-plugin', and the " +
    "'@astryxdesign/build/postcss' plugin to '@astryxdesign/build/next/postcss' " +
    "plus '@stylexjs/postcss-plugin' for the app's own StyleX.",
  fileExtensions: ['.js', '.cjs', '.mjs'],
};

const BABEL_CONFIG = /(?:^|[\\/])(?:babel\.config|\.babelrc)\.[cm]?js$/;
const POSTCSS_CONFIG = /(?:^|[\\/])postcss\.config\.[cm]?js$/;
const LEGACY_POSTCSS = '@astryxdesign/build/postcss';

const isString = (node, value) =>
  (node?.type === 'StringLiteral' || node?.type === 'Literal') &&
  node.value === value;

/** A property's key as a string, whether written quoted or as an identifier. */
const keyName = property =>
  property.key?.type === 'Identifier' ? property.key.name : property.key?.value;

/**
 * @param {import('../../../../authoring/codemod/type').AstryxCodemodFile} file
 * @param {import('../../../../authoring/codemod/type').AstryxCodemodApi} api
 * @returns {string | null | undefined}
 */
export default function transformer(file, api) {
  const isBabel = BABEL_CONFIG.test(file.path);
  const isPostcss = POSTCSS_CONFIG.test(file.path);
  if (!isBabel && !isPostcss) return undefined;
  const j = api.jscodeshift;
  const root = j(file.source);
  let changed = false;

  if (isBabel) {
    root
      .find(j.Node, node => isString(node, '@astryxdesign/build/babel'))
      .forEach(path => {
        path.replace(j.stringLiteral('@stylexjs/babel-plugin'));
        changed = true;
      });
  }

  if (isPostcss) {
    root
      .find(
        j.Node,
        node =>
          (node.type === 'ObjectProperty' || node.type === 'Property') &&
          keyName(node) === LEGACY_POSTCSS &&
          node.value?.type === 'ObjectExpression',
      )
      .forEach(path => {
        const options = new Map(
          path.node.value.properties.map(option => [keyName(option), option]),
        );
        if (
          [...options.keys()].some(
            key => key !== 'appDir' && key !== 'babelPlugins',
          )
        ) {
          return;
        }
        const appDir = options.get('appDir')?.value;
        if (appDir != null && !isString(appDir, appDir.value)) return;
        const replacements = [
          j.objectProperty(
            j.stringLiteral('@astryxdesign/build/next/postcss'),
            j.objectExpression([]),
          ),
        ];
        const babelPlugins = options.get('babelPlugins')?.value;
        if (babelPlugins != null) {
          replacements.push(
            j.objectProperty(
              j.stringLiteral('@stylexjs/postcss-plugin'),
              j.objectExpression([
                j.objectProperty(
                  j.identifier('include'),
                  j.arrayExpression([
                    j.stringLiteral(
                      `${appDir?.value ?? 'src'}/**/*.{js,jsx,ts,tsx}`,
                    ),
                  ]),
                ),
                j.objectProperty(
                  j.identifier('babelConfig'),
                  j.objectExpression([
                    j.objectProperty(
                      j.identifier('babelrc'),
                      j.booleanLiteral(false),
                    ),
                    j.objectProperty(
                      j.identifier('parserOpts'),
                      j.objectExpression([
                        j.objectProperty(
                          j.identifier('plugins'),
                          j.arrayExpression([
                            j.stringLiteral('typescript'),
                            j.stringLiteral('jsx'),
                          ]),
                        ),
                      ]),
                    ),
                    j.objectProperty(j.identifier('plugins'), babelPlugins),
                  ]),
                ),
              ]),
            ),
          );
        }
        path.replace(...replacements);
        changed = true;
      });
  }

  return changed ? root.toSource({quote: 'single'}) : undefined;
}
