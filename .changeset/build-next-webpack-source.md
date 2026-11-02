---
'@astryxdesign/build': minor
---

[breaking] `withAstryx()` builds Astryx from source under webpack the way it does under Turbopack: Core, Lab, Charts and Rich Text compile with the class names their prebuilt stylesheets use, inside `@layer astryx-base`, and `@astryxdesign/build/next/postcss` prints their rules in place of `@astryx;`. Your own CSS stays unlayered, above every Astryx rule. Beside `withAstryx()`, `@astryxdesign/build/postcss` now fails the build, naming the migration: remove `@astryxdesign/build/babel` from your Babel config, replace `@astryxdesign/build/postcss` with `@astryxdesign/build/next/postcss` (compiling your own StyleX with its own plugin), add `@astryx;` to your global stylesheet, and drop the `product` layer. Astryx's class names change from `astryx…` to `x…`; select Astryx elements by their stable `astryx-*` classes. `astryx upgrade --from <your version> --apply` makes the mechanical part of the move; the @astryxdesign/build README's migration section has the details.

@vjeux
