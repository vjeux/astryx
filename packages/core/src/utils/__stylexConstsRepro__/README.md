# Repro: defineConsts imported across files under the Astryx StyleX wrapper

Throwaway repro branch, not for merging.

- `reproConsts.stylex.ts`: `stylex.defineConsts({touch: '@media (pointer: coarse)', rowHeight: '52px'})`
- `MediaKeyConsumer.tsx`: `transitionProperty: {default: 'color', [reproConsts.touch]: 'none'}`
- `ValueConsumer.tsx`: `minHeight: reproConsts.rowHeight`
- `apps/storybook/repro-plain.vite.config.ts`: plain `@stylexjs/unplugin` (`stylex.vite`)
- `apps/storybook/repro-astryx.vite.config.ts`: `astryxStylex` from `packages/build/src/vite.ts` (what Storybook uses), same options

Run from `apps/storybook`:

    REPRO=media npx vite build --config repro-plain.vite.config.ts
    REPRO=value npx vite build --config repro-plain.vite.config.ts
    REPRO=media npx vite build --config repro-astryx.vite.config.ts
    REPRO=value npx vite build --config repro-astryx.vite.config.ts

Results (Vite 8.1.3, @stylexjs/unplugin 0.19.0):

| build | media key | value |
|---|---|---|
| plain unplugin | `@media (pointer: coarse) { .x1002qvo.x1002qvo { transition-property: none; } }` | `.xlc533a { min-height: 52px; }` |
| astryxStylex | build fails: `SyntaxError: Invalid empty selector` (lightningcss, in the unplugin's CSS collection; the per-file rule is `var(--x…){.cls.cls{…}}`) | builds, but `.astryx2d173q { min-height: var(--astryxsoqqj2); }` and nothing defines `--astryxsoqqj2` |

The same value read inside the `.stylex.ts` file that defines it is inlined (that is why `pressLayerConsts`-style styles work). The wrapper runs two StyleX instances with different `classNamePrefix` (library `astryx`, product `x`); the consumer's reference to the constant and the constant's own definition do not end up under the same name.
