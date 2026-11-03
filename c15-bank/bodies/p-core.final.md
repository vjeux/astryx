Stacked on #9754 (Core's internal touch entry and Lab's motion-engine hook). Review only this PR's change: https://github.com/vjeux/astryx/compare/4e363d85cfbcc6ff3951210cccc6d9531e4056d2...a88504b9e42158ea2063ccb88ba59267f9ea6777

## Maintainer impact

Lab's TabBar lands as two Lab-only batches, drafts that follow this one. Its press needs Core's action-group tracking hook, which Lab can't reach or extend itself, and its badged tabs need one catalog string. A Lab-only batch carries no Core code, so those parts land here first, on their own.

## Intended invariant

No behavior change for today's caller: the hook's new options are optional, and AlertDialog passes none. Core's internal touch entry stays internal: named re-exports only, outside the public API, and limited to Core and Lab by `@astryx/no-core-internal-import`. No Core module reads the new catalog key.

## Change

- `useActionGroupTracking` gains options for a group that draws its own highlight. `paintsHighlight: false` writes no press attribute. Press callbacks report the press: `onPressBegin` and `onPressMove` with the action under it, `onPressEnd` before the lift's action runs, and `onPressCancel` when it ends with nothing acting, a second finger's cancel included.
- `@astryxdesign/core/internal/touch` re-exports the hook and its options type. TabBar's press goes through it, so a second finger ends a press with nothing chosen (`family:action-groups` FR3) and focus follows the lift (FR1), as in AlertDialog.
- `packages/core/locales/en.json` gains `@astryx.tabBar.badgedItem`, a badged tab's name.
- A Core changeset (`[chore]`) names the re-export, the options and the string.

## Evidence

- Failure before the change: the hook's three new cases fail on the current hook (the press attribute is painted, `expected 'on' to be null`; no callback runs). The entry's new case fails on the current entry (`useActionGroupTracking: expected undefined`).
- Success after the change: they pass, and the hook's existing cases pass unchanged.
- Product/runtime behavior verified unchanged: AlertDialog's unit and interaction tests pass at this head.

## Scope

- [x] No intended public API, product behavior, visual direction, or policy change.
- [x] Product changes discovered during the work were removed or split.
- [x] Public text and artifacts contain no internal Meta context.

## Testing

Local gates at a88504b9e4, on #9754's 4e363d85cf, node 24.22.1 from `.nvmrc`: Core and Lab typecheck; 130 unit tests (the hook, the shared tracker, AlertDialog, the entry, and the internal-entry lint and bundle tests), with the hook's three new cases and the entry's new case red on the current code first; AlertDialog's interaction spec on the built Storybook, 12/12 in each engine; Changesets and coverage; i18n runtime and catalog; strict ESLint and `pnpm lint`, 0 problems; Prettier; `review:pre`.

Stack: #9754 → this PR → TabBar's Lab batches #9700 and #9701.
