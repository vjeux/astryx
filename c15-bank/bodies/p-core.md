## Maintainer impact

Lab's TabBar lands as two Lab-only batches, drafts that follow this one. They read seven Core pieces and three catalog strings that Lab can't add itself, and a Lab-only batch carries no Core code. So those parts land here first, on their own.

## Intended invariant

No behavior change. Core's internal touch entry stays internal: named re-exports only, outside the public API, and limited to Core and Lab by `@astryx/no-core-internal-import`. No Core module reads the new catalog keys.

## Change

- `@astryxdesign/core/internal/touch` re-exports `PanGestureRecognizer`, `useFingerScroll`, `usePressTracker`, `lockSelection`, `TOUCH_QUERY`, `rubberBand` and `UIKIT_GESTURES` under their own names. No public factory has any of these names.
- `packages/core/locales/en.json` gains `@astryx.tabBar.badgedItem`, `@astryx.tabBar.more` and `@astryx.tabBar.cancelSearch`. The last names the tab bar's own Cancel button, drawn over its search circle. It is not the search field's close button.
- A Core changeset names the re-exports and the strings.

## Evidence

- Failure before the change: the entry test's new case fails on the current entry (`PanGestureRecognizer: expected undefined`).
- Success after the change: it passes, and checks that each re-export is its module's own value.
- Product/runtime behavior verified unchanged: re-exports and catalog additions only. No component imports the new names.

## Scope

- [x] No intended public API, product behavior, visual direction, or policy change.
- [x] Product changes discovered during the work were removed or split.
- [x] Public text and artifacts contain no internal Meta context.

## Testing

Local gates at b86bd24b4f, on #9399's 1748182dbf, node 24.22.1 from `.nvmrc`: Core typecheck; the entry's tests, 3/3, with the new case red on the current entry first; the touch bundle and internal-entry lint tests; Changesets; i18n catalog and runtime; strict ESLint, 0 problems; Prettier. The provenance baseline check fails only on main's four stale entries (ChatComposer, Item, layerSurfacePress, Token), none of this PR's files.

#9669 and NavigationStack's Core part also add `PanGestureRecognizer`, `TOUCH_QUERY` and `UIKIT_GESTURES` to this entry. Whichever merges later drops its duplicate export lines and rebases the header.

This branch sits on #9399 (SearchField), which changes the same entry file. It rebases onto main once #9399 merges.
