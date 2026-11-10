Two small Core additions that Lab's SearchField needs. They are split out of its pull request so that it changes only Lab files, as #10791 did for TabBar.

## Maintainer impact

SearchField's first pull request, the stacked field, reads UIKit's timing table through Core's internal entry and names its close button from Core's catalog. It opens once this merges. With both additions here, the SearchField pull request changes Lab files only.

## Intended invariant

No Core component changes behavior, and Core's public entry exports nothing new.

## Change

- Core's internal touch entry (`internal/touch.ts`) re-exports UIKit's `timing` table by name, and the motion engine's `AnimateOptions` and `MotionHandle` types. SearchField plays its activation on the table's clock and curve.
- Core's message catalog (`locales/en.json`) gains `@astryx.searchField.cancel`, the name of SearchField's close button. No Core component reads it. Its clear button reuses `@astryx.textInput.clearLabel`.
- Each addition has a `[chore] Internal` changeset.

## Evidence

- Failure before the change: with `touch.ts` as on main and these tests (d2e46bf7ba98a8907e9118c146a7437325607be6), `touch.test.ts`'s new case fails ("expected 'undefined' to be 'object'"). The bundle test fails too ("expected [ 'timing' ] to deeply equal []").
- Success after the change: both files pass, 22 tests.
- Product/runtime behavior verified unchanged: the re-exports add names to an internal entry only, and the bundle test keeps them out of the public entry. No Core source reads the new key. Core's typecheck passes.
- CI impact: none; no workflow or CI script changes.

## Scope

- [x] No intended public API, product behavior, visual direction, or policy change.
- [x] Product changes discovered during the work were removed or split.
- [x] Public text and artifacts contain no internal Meta context.

## Testing

Gates at 0383983a5112dc391ce8a057d4986b3343c17cc2, on main d933cb968fa2b888e94569f97276d6c7c32587cf.

- `pnpm vitest run packages/core/src/internal/touch.test.ts scripts/touch-support-bundle.test.mjs`: 22 passed.
- `pnpm -F @astryxdesign/core run typecheck`: 0 errors.
- `pnpm check:i18n-catalog`, `pnpm check:i18n-runtime` and `pnpm check:changesets`: pass.
- `pnpm check:repo`, ESLint and Prettier: clean.
- `pnpm review:pre`: 0 findings.
