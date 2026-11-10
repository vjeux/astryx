A draft record for the lab TabBar, split from #10619 so that pull request changes Lab files only. #10619 implements it. This record takes the spec owners' `/approve-spec` at its own head.

## Exact decision needed

How the lab TabBar holds more sections than fit, for every pointer. Also how its disabled tabs meet the keyboard and the More list, and where the More label comes from.

## Existing authority searched

- No current record covers TabBar; `pnpm specs:for packages/lab/src/TabBar/TabBar.tsx` lists only global claims.
- `spec:AST-085` FR1, FR2 and FR5 own the disabled-control rules; this record applies them to tabs and More rows. Its Non-goals leave arrow-key visits inside a composite to the composite's own record.
- Core's TabList skips a disabled tab under the arrow keys (`TabList.test.tsx`, "skips disabled tabs during arrow navigation"); its record contracts only the tab stop.
- Core's catalog holds `@astryx.tabBar.more` (#10791).

## Decision

- **FR1:** past five tabs the bar shows four tabs and More, which lists the rest, for every pointer, as UITabBarController does. FR1 records the spec owners' Nov 8, 2026 ruling on mouse and trackpad.
- **FR2–FR3:** More reads as selected while `value` is `moreValue` or any tab past the fourth. Choosing More calls `onChange` with `moreValue`; choosing it again calls `onReselect`.
- **FR4–FR5:** `TabBarMoreList` takes the bar's children and lists every tab past the fourth, in order. The selected tab's row reads as selected, and an enabled row calls `onChange`. A disabled tab's row is disabled.
- **FR6–FR7:** the arrow keys skip a disabled tab, as Core's TabList does, and it stays announced as disabled. The label comes from `@astryx.tabBar.more`.

## Rejected alternatives

- More for touch input only: the fifth slot would change with the pointer. The record's review checks reject that.
- TabBar drawing the list: it would own a screen, which the app owns.
- Arrow keys reaching a disabled tab, as Core's menus do: Core's TabList skips it, and TabBar follows TabList.

## Claim scope and non-goals

The record owns which tabs the bar shows, when More reads as selected, and More's list. More's navigation stack belongs to the app. Rearranging tabs (iOS's Edit) is not provided.

## Evidence and implementation relationship

#10619 implements it. Its unit and interaction cases are the verification map's, and each fails on main's TabBar there.

## Writing rubric results

- R1 narration: none; the record states the More tab, the arrow keys and the label in the present tense.
- R2 research in the record: none; the UIKit comparison stays in this description.
- R3 evidence naming a change: none; each basis names UIKit's behavior, a `spec:AST-085` rule, Core's TabList or Core's message catalog.
- R4 rejected alternatives over one line or outside a decision: none in the record.
- R5 pull request or issue references remaining: none.
- R6 ruled open questions still listing options: none; FR1 states the pointer ruling.

## Scope

Components: TabBar, TabBarMoreList

- [x] This PR contains specification records only.
- [x] It records observable behavior and preserves equivalent internal implementations.
- [x] Any named internal mechanism is intentionally public, names its dependent caller/system, and explains why an equivalent implementation would not satisfy the contract.
- [x] Verification states the evidence layer and failure signal without prescribing CI job/workflow topology.
- [x] It records one intentional durable decision, not a rescue for a separable tagalong.
- [x] The canonical knowledge owner, affected current claims, and overlapping open work are named; any ownership collision is resolved or called out for human decision.
- [x] Adjacent API, visual, accessibility, composition, and implementation facts remain outside scope unless this exact decision depends on them.
- [x] Public text and artifacts contain no internal Meta context.

## Validation

- `pnpm check:knowledge`: the record is aligned.
- Prettier: clean.
- `git diff --check`: clean.
- `pnpm review:pre`: no findings.
