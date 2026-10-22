---
'@astryxdesign/build': patch
---

[feat] `@astryxdesign/build/next/postcss` prints only the rules of the Astryx modules the app imports, instead of each source-built package's whole stylesheet, in the prebuilt stylesheets' order. It follows imports through barrels and through installed packages that depend on Astryx, at any depth, honoring each package's `sideEffects`; anything not provably unused stays. The new `include` option takes globs of the files whose Astryx imports count (default: every JS, TS and MDX file outside `node_modules` and `.next`), and the plugin watches them. An installed dependent whose `package.json` cannot be read fails the build.

@vjeux
