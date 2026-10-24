# Desktop and touch builds for touch code (spike)

Touch presentations add code a desktop page never runs: the compositor
animator, the gesture recognizers and their host, the UIKit tables, and each
component's touch layer. A lazy chunk would keep it off desktop, but it adds a
round trip on the phone, where it costs most. This spike builds the touch
layer twice instead: the same app, bundled once for touch-capable devices and
once for the rest, with no extra request on either.

## Prior art

- The wiki's *Distribution* page: core ships per-file ESM (`dist/` mirrors
  `src/`), a generated `exports` map with a `source` condition for the
  monorepo, and one precompiled `astryx.css`. *Why StyleX*: consumers import
  that one stylesheet and never run StyleX.
- #8296 (`spec:AST-080` FR8, `component-style-authoring` INV6): each changed
  component's import is bundled with esbuild and its gzip JavaScript and CSS
  reported; touch-only growth above 2 KB JavaScript or 1 KB CSS is flagged.
- #8316 (`spec:AST-094`): touch work costs nothing under a fine pointer, and
  the touch presentation applies after hydration.
- No current record covers build conditions or a touch specifier; this needs
  a draft record for the owners.

## Library: one specifier, two resolutions

- A component's touch layer lives in a touch module
  (`Button/ButtonTouch.ts`) that holds only touch paths. Shared and mouse
  behavior stays in the component's always-loaded code (a Lightbox stage's
  double-click and keyboard zoom, a TabBar lens under a mouse).
- The component imports it only as `#touch/Button/ButtonTouch` and calls it
  only behind the touch presentation (`useTouchPresentation().isTouch` or
  `readTouchPresentation()`).
- `packages/core/package.json` maps the specifier:

  ```json
  "imports": {
    "#touch/*": {
      "astryx-desktop": {
        "source": "./src/touch-stubs/*.ts",
        "default": "./dist/touch-stubs/*.js"
      },
      "source": "./src/*.ts",
      "default": "./dist/*.js"
    }
  }
  ```

  Without a condition the real module loads, eagerly, so an app that builds
  once still works everywhere (the universal build).
- `generate-stubs.mjs` writes each stub: the module's export names as no-ops,
  typed from the real module (`--check` in CI). A desktop build on a device
  whose pointer later turns coarse keeps the desktop behavior.
- The shared touch core is reached only through touch modules, so the
  desktop condition drops it and the tables' side-effect registrations with
  it. Two leaks remain today: the theme's role validation pulls `roles.ts`
  and `spring.ts` (about 1.5 KB gzip) into every theme user, and the gestures
  barrel registers the gesture table on import.
- `check-touch-modules.mjs` enforces the rule from source: a touch module is
  imported only through `#touch/`, and a file that imports one reads the
  touch presentation. Its runtime half is a test project that resolves
  `#touch/*` to stubs that throw and renders every component under a fine
  pointer: any touch call outside the gate fails.

## App: two client builds, one request

- Bundle the same entry twice: Vite `resolve.conditions` (or webpack
  `resolve.conditionNames`, esbuild `conditions`) with `astryx-desktop` for
  one build and without it for the other. The server build stays universal:
  the touch presentation applies after hydration, so the HTML is the same.
- Serve with media-scoped preloads and an inline choice:

  ```html
  <link rel="modulepreload" href="/touch/entry.js" media="(any-pointer: coarse)">
  <link rel="modulepreload" href="/desktop/entry.js" media="not (any-pointer: coarse)">
  <script type="module">
    import(matchMedia('(any-pointer: coarse)').matches ? '/touch/entry.js' : '/desktop/entry.js');
  </script>
  ```

  `any-pointer` sends every touch-capable device (a convertible, a tablet
  with a mouse docked) the touch build, which is the superset.
- Next.js has no stock path to two client builds; there the universal build
  is the default until a plugin sets the condition per client compilation.

## CSS stays universal

The coarse-pointer blocks of `astryx.css` are about 0.9 KB gzip of 33.4 KB
(StyleX dedupes atomics; touch rules are media-gated and do nothing under a
mouse). A second stylesheet is not worth it now. The size report should
measure each component under both conditions: the desktop figure must not
grow from touch work, and the touch-only budget applies to the difference.

## Numbers

Source bundles (esbuild, minified ESM, React and StyleX left out unless
noted, gzip). Absolute component sizes include StyleX objects as JavaScript;
the differences are what count.

| What | gzip |
|---|---|
| Shared touch core: animator | 9.1 KB |
| … `motion/experimental` (animator, spring, rubber band, bézier, resolveMotion, tables) | 12.0 KB |
| … `gestures/experimental` (recognizers, arena, PressTracker, haptics, resolver) | 18.5 KB |
| … UIKit tables | 3.8 KB |
| … motion + gestures, paid once per touch page | 27.3 KB |
| Button's own touch code (press release) | +0.1 KB, +17.7 KB with the core it reaches |
| Item's own touch code (swipe on the compositor) | +0.8 KB, +24.8 KB with the core it reaches |
| BottomSheet's own touch code (sheet present) | +2.5 KB, +13.1 KB with the core it reaches |
| Button with its spike touch layer: universal / desktop | 49.6 / 39.8 KB |
| Page (Button, Item, BottomSheet, React): desktop / touch | 123.2 / 152.9 KB |

Load, Chromium with network throttling, navigation to touch-ready (desktop:
page-ready), median of 7:

| Network | One touch bundle | Lazy touch chunk | Split, touch device | Split, mouse device |
|---|---|---|---|---|
| Slow 4G (150 ms RTT, 1.6 Mbps) | 1106 ms | 1277 ms (+171) | 1106 ms | 950 ms (−156) |
| 4G (70 ms RTT, 9 Mbps) | 295 ms | 380 ms (+85) | 295 ms | 266 ms (−29) |

The split fetched only the matching entry in Chromium. Still to measure:
WebKit's handling of `media` on `modulepreload`, and the same pages on the
iOS simulator and an Android emulator.
