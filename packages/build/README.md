# @astryxdesign/build

Build plugins for Astryx source builds. In Next.js, under webpack or Turbopack, `withAstryx()` and `@astryxdesign/build/next/postcss` compile Astryx the way its prebuilt stylesheets are compiled: the same class names, in `@layer astryx-base`, with your own CSS unlayered above it.

The Vite setup and the Babel and PostCSS plugins compile Astryx library and product code with separate class name prefixes, which enables independent CSS layers:

```
reset < astryx-base (library, astryx prefix) < astryx-theme < product (app, x prefix)
```

## Why?

StyleX generates atomic CSS: same declaration = same class name. Without separate prefixes, library and product classes collide and can't be placed in independent CSS layers, which breaks theme overrides.

The Vite setup and the Babel and PostCSS plugins solve this by:

1. Compiling Astryx library code with `astryx` prefix (`.astryx78zum5`)
2. Compiling product code with default `x` prefix (`.x78zum5`)
3. Placing each group in its own CSS `@layer`
4. Rejecting unsupported StyleX declarations instead of silently omitting them

## Packages

| Export                             | Purpose                                      | Platform                                 |
| ---------------------------------- | -------------------------------------------- | ---------------------------------------- |
| `@astryxdesign/build/next`         | `withAstryx()`: the Next.js config helper    | Next.js (webpack, Turbopack)             |
| `@astryxdesign/build/next/postcss` | PostCSS plugin: `@astryx;`                   | Next.js (webpack, Turbopack)             |
| `@astryxdesign/build/vite`         | Vite plugin: wraps unplugin + splits layers  | Vite, Storybook                          |
| `@astryxdesign/build/babel`        | Babel plugin: splits class prefixes per file | Babel pipelines without `withAstryx()`   |
| `@astryxdesign/build/postcss`      | PostCSS plugin: compiles + splits CSS layers | PostCSS pipelines without `withAstryx()` |

## Install

```bash
npm install -D @astryxdesign/build @stylexjs/babel-plugin @babel/core
```

For Vite, also install:

```bash
npm install -D @stylexjs/unplugin
```

---

## Next.js Setup

Under webpack or Turbopack (the default bundler since Next.js 16), `withAstryx()` compiles the
Astryx modules your app imports from source as the prebuilt stylesheets are compiled,
and `@astryxdesign/build/next/postcss` emits each source-built package's prebuilt
stylesheet from that source: the same rules and selectors, in the same order, inside
`@layer astryx-base`. Installed and workspace-linked packages both work; Astryx needs
no Babel config.

1. `next.config.mjs`, around your config and its own `turbopack.rules` or `webpack` hook:

   ```js
   import {withAstryx} from '@astryxdesign/build/next';
   export default withAstryx({/* your Next.js config */});
   ```

2. `postcss.config.js`, beside any plugin your app already uses:

   ```js
   module.exports = {plugins: {'@astryxdesign/build/next/postcss': {}}};
   ```

3. Your global stylesheet, with `@astryx;` in place of `astryx.css`, `lab.css`, `charts.css` and `richtext.css` (every installed package with a prebuilt stylesheet builds from source, so import none of them: the build fails on one):

   ```css
   @import '@astryxdesign/core/reset.css';
   @import '@astryxdesign/theme-neutral/theme.css';

   @astryx;
   ```

   Each package's rules start with the `reset, astryx-base, astryx-theme` layer
   order, as `reset.css` and the theme do, so the order holds in any chunk order
   without a line of your own.

Your own Turbopack rules are kept off Astryx source. Your Babel config file is not,
and Babel's `ignore` cannot exclude Astryx: to keep it off, set
`experimental.turbopackUseBuiltinBabel: false` and run `babel-loader` from a
`turbopack.rules` entry, which `withAstryx()` keeps off Astryx source like any rule.
Under webpack, Astryx modules reach your loaders and Babel config only after
`withAstryx()` has compiled their StyleX, and Astryx needs no Babel config there
either. A custom Babel config turns off Next.js's SWC compiler, which
`next/font` needs (a fresh `create-next-app` layout imports `next/font/google`),
and it also compiles your dependencies, where Next.js's Babel cannot compile
Lexical, which Rich Text imports. So compile your own StyleX with a `webpack`
rule on your own files rather than a Babel config.

## Migrating from the webpack setup

Before 0.8, a webpack app compiled Astryx with `@astryxdesign/build/babel` and
`@astryxdesign/build/postcss`, in `astryx`-prefixed classes and a `product` layer.
`withAstryx()` now builds Astryx under webpack as under Turbopack, and the
PostCSS plugin refuses to run beside it, naming these steps:

1. `babel.config.js`: remove `@astryxdesign/build/babel`, and the file itself if
   nothing else needs it. If your own code uses StyleX, compile it with a
   `webpack` rule on your own files (above); keeping `@stylexjs/babel-plugin`
   in a Babel config also works, without `next/font` or Rich Text.
2. `postcss.config.js`: replace `@astryxdesign/build/postcss` with
   `@astryxdesign/build/next/postcss`. If your own code uses StyleX, add
   `@stylexjs/postcss-plugin` for it (its `include` covers your source, and its
   `babelConfig` holds the plugins `babelPlugins` held).
3. Your global stylesheet: add `@astryx;` (before `@stylex;`, if you keep it for
   your own StyleX) and drop `product` from the `@layer` list: your own CSS is
   unlayered and wins over every Astryx rule. `layers.css` is no longer needed.
4. `next.config.mjs`: remove any `transpilePackages` or `conditionNames` you set
   for Astryx by hand; `withAstryx()` sets them.

Astryx's class names change from `astryx…` to the prebuilt stylesheets' `x…`;
select Astryx elements by their stable `astryx-*` classes rather than by
compiled ones.

`astryx upgrade --from <your version> --apply` makes the mechanical part of
steps 1 to 3: the Babel and PostCSS plugin entries (a PostCSS entry with
options other than `appDir` and `babelPlugins` stays for you to move), the
`product` layer, and `@astryx;` in a stylesheet that loads Core's `reset.css`.
It keeps a Babel config for your own StyleX, as before; moving that to a
`webpack` rule, for `next/font` or Rich Text, is yours.

---

## Vite Setup

```ts
import {astryxStylex} from '@astryxdesign/build/vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    ...astryxStylex({
      stylexOptions: {
        dev: process.env.NODE_ENV === 'development',
        runtimeInjection: false,
        propertyValidationMode: 'throw',
        treeshakeCompensation: true,
        unstable_moduleResolution: {
          type: 'commonJS',
          rootDir: __dirname,
        },
      },
    }),
    react(),
  ],
  resolve: {
    alias: {
      '@astryxdesign/core': path.resolve(
        __dirname,
        'node_modules/@astryxdesign/core/src',
      ),
    },
  },
  optimizeDeps: {
    exclude: ['@astryxdesign/core', '@astryxdesign/theme-neutral'],
  },
});
```

---

## How it works

### Babel plugin (`@astryxdesign/build/babel`)

Wraps `@stylexjs/babel-plugin` with two internal instances: one with `classNamePrefix: 'astryx'` for library files, one with default `'x'` for product files. Routes each file to the correct instance based on its path.

Library patterns (configurable):

- `packages/core/`
- `packages/themes/`
- `node_modules/@astryxdesign/`

### PostCSS plugin (`@astryxdesign/build/postcss`)

Compiles StyleX from both library and product source files in two separate passes with different prefixes. Wraps the results in named `@layer` blocks:

- Library rules → `@layer astryx-base`
- Product rules → `@layer product`

### Vite plugin (`@astryxdesign/build/vite`)

Wraps `@stylexjs/unplugin` and intercepts the dev CSS endpoint (`/virtual:stylex.css`). Partitions the collected rules by file path and serves split-layer CSS. Production builds write those rules to one cache-safe shared stylesheet and link it from every emitted HTML entry, without cross-loading entry-owned CSS.

Unsupported declarations fail the build by default with StyleX's replacement guidance. Set `propertyValidationMode` explicitly in `stylexOverrides` (modern API) or `stylexOptions` (legacy API) only when a migration needs the upstream `warn` or `silent` behavior.

A production build also checks the StyleX stylesheet for generated custom properties (`--<prefix><hash>`) that it reads but no stylesheet in the build declares, which browsers drop: a `.stylex.ts` export read in a style that is not a `defineVars`/`defineConsts` value, or one whose module never reached the build. It warns, naming the variable and the rule that reads it. Only stylesheets count as declarations, so a property the app sets at runtime (an inline style) is reported too: give it a name outside the StyleX class-name prefixes.

---

## Advanced Options

### Babel plugin

```js
[
  '@astryxdesign/build/babel',
  {
    // Patterns to identify library files (default shown)
    libraryPatterns: [
      'packages/core/',
      'packages/themes/',
      'node_modules/@astryxdesign/',
    ],

    // Class name prefix for library styles (default: 'astryx')
    libraryPrefix: 'astryx',

    // Class name prefix for product styles (default: 'x')
    classNamePrefix: 'x',

    // ... all @stylexjs/babel-plugin options
  },
];
```

### PostCSS plugin

```js
'@astryxdesign/build/postcss': {
  appDir: 'src',           // Your app source directory
  babelPlugins: [...],     // StyleX babel plugin config
  libraryPrefix: 'astryx',   // Prefix for library CSS (default: 'astryx')
  extraInclude: [...],     // Additional glob patterns
  layers: {                // Layer names (defaults shown)
    library: 'astryx-base',
    product: 'product',
  },
}
```

## Related

- [example-nextjs-source](../../apps/example-nextjs-source/): full Next.js source build example
- [`@stylexjs/babel-plugin`](https://github.com/facebook/stylex): the underlying StyleX compiler
