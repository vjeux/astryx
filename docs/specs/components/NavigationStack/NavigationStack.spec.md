---
schema_version: 3
template_version: 7
kind: component
id: component:NavigationStack
authority: draft
archive_reason: null
superseded_by: null
approved_by: null
approved_at: null
owners: [cixzhang]
review_triggers:
  [public-api, behavior, accessibility, interaction, motion, navigation]
verified_by:
  [
    packages/lab/src/NavigationStack/NavigationStack.test.tsx,
    packages/lab/src/NavigationStack/__tests__/NavigationStack.interaction.browser.spec.ts,
  ]
modules: []
families: []
design_specs: [design:reduced-motion]
architecture:
  [
    architecture:component-import-boundaries,
    architecture:interaction-modality,
    architecture:react-component-runtime,
  ]
contributing: []
system_specs:
  [
    spec:AST-020/FR1,
    spec:AST-094/FR11,
    spec:AST-094/FR20,
    spec:AST-094/FR36,
    spec:AST-013/FR9,
  ]
---

# NavigationStack component contract

## Contract at a glance

| Area                    | Contract                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| ----------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Public contract         | `push`, `pop` and `popToRoot` take `transition: 'cut'`. `NavigationStack` takes `retainPopped`. The stack's API adds `evict`, `prepare` and `drop`. `useNavigationScreen` reads a screen's state, and `useNavigationLink` wires a row. `NavigationScreen` takes `scroll`, and `useNavigationScroller` names a content's scroller. `NavigationScreen` takes `isBarHidden`, `titleFocusRef` and `titleContent`; a change takes `focus`; the API adds `replace`; the stack takes `onTransition`. |
| Behavior                | A cut lands in one commit with no motion. A popped screen can stay mounted and come back as it was left. A pressed row can render its screen before the push. A hidden screen never takes input. Content can own its scroller, and a screen can hide the bar.                                                                                                                                                                                                                                 |
| End-user impact         | A screen that opens with the keyboard moves once. A screen people return to keeps its scroll and its draft. A pushed screen starts moving at once.                                                                                                                                                                                                                                                                                                                                            |
| Builder impact          | Each behavior is opt-in, per change or per stack. Retention and preparation key screens by `getKey`.                                                                                                                                                                                                                                                                                                                                                                                          |
| Compatibility/readiness | Additive: with no option set, the stack behaves as released. Requirement gaps: FR1–FR3, FR5–FR8, FR10–FR21 and PR3.                                                                                                                                                                                                                                                                                                                                                                           |
| Review checks           | Reject a hidden screen that a pointer, a wheel, a key or `elementFromPoint` reaches, a retained screen that remounts on its re-push, or an unused option that grows the first load past INV10.                                                                                                                                                                                                                                                                                                |
| Governing rules         | `spec:AST-094` FR11 and FR20 (the press a scroll takes), FR36 (the back swipe's release), `architecture:component-import-boundaries` INV2 and INV10, `architecture:react-component-runtime`.                                                                                                                                                                                                                                                                                                  |

This table is a review projection; the body below is authoritative.

## Intent

NavigationStack is the lab's drill-down navigator for phone layouts,
UINavigationController's counterpart. Its push, pop and back swipe follow
UIKit. This record states three behaviors an app chooses: a change with no
motion, popped screens that stay mounted, and a screen rendered before its
push. It states what a hidden screen must never do, how a screen scrolls and
shows its bar, where focus goes, and what a change reports. Consumer usage
lives in `NavigationStack.doc.mjs`.

## Compatibility and migration

- Released default preserved: `yes`. With no `transition`, `retainPopped`
  or preparation, a change and a pop behave as released.
- Compatibility class: additive. Every new prop, option, method and hook is
  new.
- Controlled/uncontrolled behavior: unchanged. The app owns `path`; a cut, a
  re-push and a prepared push change it through `onPathChange` as any change
  does.
- Migration decision: none needed.

## Ownership boundary

**Owns**

- How a change moves: its travel, its dimming and its cut (FR1).
- Which popped screens stay mounted, and when they leave (FR2, FR3).
- How a hidden screen keeps out of input, paint and the accessibility tree
  (FR4).
- The screen state a screen reads (FR5).
- A screen rendered before its push, and when a press starts or drops it
  (FR6–FR8).
- Which scroller a screen scrolls in, and the box its content gets (FR10).
- Whether a screen draws the bar, and how the bar comes and goes with a change
  (FR11, FR12, FR18–FR20).
- Where focus goes after a change, and when a revealed screen takes input
  (FR9, FR13, FR17).
- The first render, replacing the top entry, and a change's reported phases
  (FR14–FR16).

**Does not own / non-goals**

- What a hidden screen's own work does while hidden — owned by the screen,
  which reads FR5's state.
- Where the path comes from (the URL, the app's state) — owned by the app.
- The browser's own back gesture and a platform-animated history change —
  owned by `spec:AST-094` FR22 and the stack's existing behavior.

## Public concepts

| Concept                     | Closed values or states                        | Meaning                                                               | Availability by variant/orientation/state   | Default     | Owner                       | Stability    | Invalid-value behavior                               |
| --------------------------- | ---------------------------------------------- | --------------------------------------------------------------------- | ------------------------------------------- | ----------- | --------------------------- | ------------ | ---------------------------------------------------- |
| `transition`                | `'default'`, `'cut'`                           | How one push, pop or popToRoot moves                                  | Every change                                | `'default'` | `component:NavigationStack` | experimental | An unknown value moves as `'default'`                |
| `retainPopped`              | 0–4                                            | How many popped screens stay mounted                                  | Stacks with `getKey`                        | 0           | `component:NavigationStack` | experimental | Clamped to 0–4; without `getKey`, 0                  |
| Screen state                | `top`, `covered`, `hidden`, `prepared`         | On view, painted under it, deeper or retained, or before its push     | Every mounted screen, from its first render | `top`       | `component:NavigationStack` | experimental | Not applicable                                       |
| `evict(entry)`              | a retained or prepared entry                   | Unmounts that entry's hidden screen                                   | Stacks with `getKey`                        | none        | `component:NavigationStack` | experimental | An entry with no hidden screen does nothing          |
| `prepare(entry)` / `drop()` | one prepared entry or none                     | Renders an entry's screen before its push, or unmounts it             | Stacks with `getKey`                        | none        | `component:NavigationStack` | experimental | A key already on the path does nothing               |
| `useNavigationLink(entry)`  | the press props of one push control            | Prepares at the press, drops at a scroll, pushes at the activation    | Inside a screen                             | none        | `component:NavigationStack` | experimental | Outside a stack it throws, as the stack's API        |
| `scroll`                    | `'screen'`, `'content'`                        | Whether the stack's scroller or the content's own scrolls the screen  | Every screen; `'content'` is inline-titled  | `'screen'`  | `component:NavigationStack` | experimental | An unknown value scrolls as `'screen'`               |
| `useNavigationScroller()`   | the content's scroller ref and the bar's inset | Names the scroller the bar's edge effect and FR3's restore read       | Screens with `scroll: 'content'`            | none        | `component:NavigationStack` | experimental | Outside such a screen it returns no inset            |
| `isBarHidden`               | `true`, `false`                                | Whether the screen draws the stack's bar or keeps its own header      | Every screen                                | `false`     | `component:NavigationStack` | experimental | Not applicable                                       |
| `titleFocusRef`             | a ref to an element in the screen              | The element a change focuses in the title's place                     | Screens with `isBarHidden`                  | none        | `component:NavigationStack` | experimental | A ref with no element falls back to the hidden title |
| `titleContent`              | any React node                                 | Rich content for the bar's title area; `title` still names the screen | Every screen                                | none        | `component:NavigationStack` | experimental | Not applicable                                       |
| `focus`                     | `'title'`, `'keep'`, an element                | Where focus goes once a change lands                                  | Every change                                | `'title'`   | `component:NavigationStack` | experimental | An unknown value moves focus as `'title'`            |
| `replace(entry)`            | an entry for the top's depth                   | Changes the top entry at the same depth                               | Depth 1 or more                             | none        | `component:NavigationStack` | experimental | At the root it pushes                                |
| `onTransition`              | start, settle; swipe begin, cancel, commit     | Reports a change's phases and its cause                               | Every stack                                 | none        | `component:NavigationStack` | experimental | Not applicable                                       |

## Behavioral and layout contract

Draft requirements identify their basis so observed code is not mistaken for an
intentional decision. A `current` contract contains no unresolved rows.

| ID   | Candidate invariant                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Basis                                                                                                                                                                                                         | Draft review state |
| ---- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ |
| FR1  | A change made with `transition: 'cut'` MUST land in the commit that changes the path, with no travel, no dimming and no fade. Everything else is the change's own: covered screens are inert, focus moves as FR9 says, and the bars and the back button show the new top.                                                                                                                                                                                                                                                                                                                                                                         | Proposal (DEC-1): a screen that opens with the keyboard, whose rise is its only motion                                                                                                                        | human decision     |
| FR2  | With `retainPopped` above 0, a popped screen MUST stay mounted with its React state and its scroll positions, up to `retainPopped` screens. The least recently popped leaves first. `evict(entry)` unmounts one at once.                                                                                                                                                                                                                                                                                                                                                                                                                          | Proposal (DEC-2)                                                                                                                                                                                              | human decision     |
| FR3  | A push of a retained screen's key MUST reuse that screen with no remount. It moves as any push, with its state and scroll as they were left.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Proposal (DEC-2)                                                                                                                                                                                              | human decision     |
| FR4  | A screen that is not on view (covered beyond the one under the top, retained or prepared) MUST NOT paint and MUST be `inert`, or isolated by FR21's guard during a change. Every pointer, touch, wheel and key event over the stack reaches the screen on view, and `elementFromPoint` returns it, whatever the screens' order in the DOM.                                                                                                                                                                                                                                                                                                        | Proposal (DEC-2); the stack's existing covered screens                                                                                                                                                        | human decision     |
| FR5  | `useNavigationScreen()` MUST return, from a screen's first render, its state: `top`, `covered` (painted under the top), `hidden` (deeper or retained) or `prepared`. A screen re-renders when its state changes, so only the top one runs document-level work.                                                                                                                                                                                                                                                                                                                                                                                    | Proposal (DEC-3)                                                                                                                                                                                              | human decision     |
| FR6  | `prepare(entry)` MUST render that entry's screen at transition priority, hidden as FR4 says. A push of the same key then mounts nothing new and starts its motion in its first frame. `drop()` unmounts it. One screen is prepared at a time; a new `prepare` drops the last.                                                                                                                                                                                                                                                                                                                                                                     | Proposal (DEC-4)                                                                                                                                                                                              | human decision     |
| FR7  | `useNavigationLink(entry)` MUST prepare at the control's first `pointerdown` from any pointer, drop when the browser takes the touch for a scroll (`spec:AST-094` FR20) or the press ends with no activation, and push at the activation.                                                                                                                                                                                                                                                                                                                                                                                                         | Proposal (DEC-4); `architecture:component-import-boundaries` INV2                                                                                                                                             | human decision     |
| FR8  | A dropped preparation MUST release everything it mounted, and the stack MUST hold at most one. A press that becomes a scroll costs one screen's render at transition priority, which input interrupts.                                                                                                                                                                                                                                                                                                                                                                                                                                            | Proposal (DEC-4)                                                                                                                                                                                              | human decision     |
| FR9  | After any change, re-push or prepared push, focus MUST be on the screen on view, or where the app put it inside that screen. No hidden screen keeps focus or takes a key.                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | The stack's existing focus rule; proposal (DEC-2, DEC-4)                                                                                                                                                      | human decision     |
| FR10 | A screen with `scroll: 'content'` MUST give its content the card's whole box, a definite height, under the bar; the stack's own scroller does not scroll. The bar's edge effect and FR3's scroll restore read the scroller the content names, and the content reads the bar's inset.                                                                                                                                                                                                                                                                                                                                                              | Proposal (DEC-5): content that brings its own scroller, such as a windowed list                                                                                                                               | human decision     |
| FR11 | A screen with `isBarHidden` MUST draw no bar; its content starts at the card's top. A push from it brings the pushed screen's bar in with the push, on the push's UIKit spring, and a pop back to it takes the bar out on the pop's.                                                                                                                                                                                                                                                                                                                                                                                                              | Proposal (DEC-6): a root screen with its own header, as UIKit's `navigationBarHidden`                                                                                                                         | human decision     |
| FR12 | A screen's `titleContent` MUST render in the bar's title area, with the bar's layout, truncation and motion. `title` still names the screen, Back's label and the title's accessible name.                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Proposal (DEC-7): a title that is a menu, such as a scope picker                                                                                                                                              | human decision     |
| FR13 | By default a change MUST move focus to the new top's title (FR9), but only when focus is detached or still on the screen it left. A change never takes focus the person moved into the new top screen while it ran. With `focus` set to an element in the new top screen, focus moves there. With `focus: 'keep'`, focus stays if it is in the new top screen; otherwise the title takes it.                                                                                                                                                                                                                                                      | Proposal (DEC-7): a tap that opens a screen and focuses its field                                                                                                                                             | human decision     |
| FR14 | The stack adopts `spec:AST-013` FR9: for a given path, its server markup and its hydrating render are the same, with no capability, input-modality or geometry read during either. A first mount with screens pushed renders them at rest, with no motion.                                                                                                                                                                                                                                                                                                                                                                                        | Proposal (DEC-8): a link that opens deep in the stack                                                                                                                                                         | human decision     |
| FR15 | `replace(entry)` MUST change the top entry at the same depth. It moves as a push from the trailing edge, or cuts with FR1. The screen it replaces is retained as a popped one, under `retainPopped`'s bound (FR2).                                                                                                                                                                                                                                                                                                                                                                                                                                | Proposal (DEC-9)                                                                                                                                                                                              | human decision     |
| FR16 | `onTransition` MUST report each change's start and settle, and a back swipe's begin, cancel and commit, each with its cause: the back button, the content swipe, the edge swipe or a path change. It reports values only and exposes no gesture machinery (`spec:AST-107` DEC-1).                                                                                                                                                                                                                                                                                                                                                                 | Proposal (DEC-10): work deferred until a change settles, and timing to its first frame                                                                                                                        | human decision     |
| FR17 | The screen a pop reveals MUST take input once the pop is visually done: the leaving screen is within one CSS pixel of its rest, or a programmatic pop has committed. A pop the finger reverses keeps the revealed screen inert until it settles.                                                                                                                                                                                                                                                                                                                                                                                                  | Proposal (DEC-11): a row tapped right after Back                                                                                                                                                              | human decision     |
| FR18 | In a home-screen web app with `viewport-fit=cover`, the bar and its controls MUST keep clear of `env(safe-area-inset-top)`, and in landscape of the leading and trailing insets.                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Proposal (DEC-12)                                                                                                                                                                                             | human decision     |
| FR19 | Where the bar paints nothing, it MUST take no input over the content; only its controls take input.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Proposal (DEC-12): a clear bar over a list's first rows                                                                                                                                                       | human decision     |
| FR20 | A screen's content MUST never paint over the bar: each card is its own stacking context, under the bar's, whatever z-index its content sets. Its floor is WCAG 2.2 SC 2.4.11 Focus Not Obscured (Minimum), `spec:AST-020` FR1.                                                                                                                                                                                                                                                                                                                                                                                                                    | Its minimum: `spec:AST-020` FR1, through WCAG 2.2 SC 2.4.11 (content must not hide the focused Back button or title). The rest: documented promise, content scrolls under the bar (`NavigationStack.doc.mjs`) | human decision     |
| FR21 | A screen that is not on view MUST have no pointer, focus, key or assistive-technology access at any moment. At rest it is `inert`. A change moves `inert` off its critical frames. A push sets it after its first moving frame is presented. A pop lifts it from the revealed screen as the pop is visually done (FR17). Whenever `inert` is off a screen that is not on view, a guard isolates it as fully. Its card takes `pointer-events: none` and `aria-hidden="true"`, and focus containment keeps Tab and every focus attempt in the screen on view. The guard comes off when `inert` takes over, or when the revealed screen takes input. | Proposal (DEC-13): setting or lifting `inert` on a large screen in a change's first or last frame delays its motion and input                                                                                 | human decision     |

FR1 gap: every change travels; no change takes a `transition` option.
FR2, FR3 gap: a popped screen unmounts when its pop ends.
FR5–FR8 gap: no screen state, `prepare`, `drop` or `useNavigationLink`
exists.
FR10 gap: every screen scrolls in the stack's scroller, whose content box has
no definite height.
FR11 gap: every screen draws the bar.
FR12, FR13, FR15, FR16 gap: no `titleContent`, `focus`, `replace` or
`onTransition` exists. FR14 gap: not verified. FR17 gap: every screen stays
`inert` until a pop settles. FR18, FR19 gap: the bar reads no safe-area inset,
and its empty area takes taps over the content.
FR20 gap: a card is no stacking context, so content with a z-index above the
bar's paints over it.
FR21 gap: a covered screen turns `inert` in a change's first commit, and a
revealed one only once a pop settles.

### Allowed variation

- **AV1 — how a hidden screen is hidden.** Any technique that meets FR4 and
  keeps FR2's scroll positions.
- **AV2 — eviction timing.** An evicted screen may unmount in the next commit
  rather than the current one.

### Representative states

| State                                         | Required invariant                                                        | Allowed variation           |
| --------------------------------------------- | ------------------------------------------------------------------------- | --------------------------- |
| A cut push that the app's tap then focuses in | One commit; the new top has focus; nothing travels (FR1, FR9)             | The bars' cross-fade length |
| A screen popped, then pushed again            | The same screen instance, scroll and draft as left (FR2, FR3)             | None                        |
| A retained screen after the top in the DOM    | Clicks, wheels and `elementFromPoint` reach the top (FR4)                 | AV1                         |
| A press on a row that becomes a scroll        | The prepared screen is dropped; the list scrolls (FR7, FR8)               | None                        |
| A prepared screen pushed                      | Its motion starts in the first frame; nothing mounts in that commit (FR6) | None                        |
| A windowed list as a screen's content         | Its box has a definite height; the veil follows its scroller (FR10)       | None                        |
| A root with its own header, pushing a screen  | No bar on the root; the bar arrives with the push (FR11)                  | None                        |
| A pop, then a tap on the revealed list        | The tap lands once the pop looks done (FR17)                              | None                        |
| A deep link's first mount                     | Its screens at rest, markup equal to the server's (FR14)                  | None                        |

### Transformation and precedence order

- **ORD1 — retention bound.** A pop lands first, then the least recently
  popped screens past `retainPopped` leave (FR2).
- **ORD2 — preparation and push.** A push of a prepared key promotes that
  screen before any other change in its commit (FR6).

### Performance and resources

- **PR1 — hidden screens cost no frames.** A hidden screen does no layout,
  paint or animation work of the stack's; its own work stands down by FR5.
- **PR2 — first load.** Each of the cut, retention and preparation adds at
  most 0.3 KB gzip to a page whose stack does not use it
  (`architecture:component-import-boundaries` INV10).
- **PR3 — touch code at first load.** The stack's first load MUST carry only
  the touch code its first render uses. Its back swipes load through the
  shared touch runtime (`architecture:react-component-runtime` INV13).

PR3 gap: the stack imports Core's internal touch entry, whose unused exports
a consumer's bundler keeps, and its back swipes load with its first render.

## Accessibility contract

- **AR1 — hidden is absent.** A hidden screen (FR4) MUST be absent from the
  accessibility tree and unreachable by Tab.
- **AR2 — focus follows the change.** A cut, a re-push and a prepared push
  move focus as a push does (FR9).
- **AR3 — one keyboard scroller per screen.** With `scroll: 'screen'`, the
  stack's scroller takes keyboard scrolling and is named by the screen's
  title. With `scroll: 'content'`, the content's scroller owns its keyboard
  access, and the stack adds no scroller or tab stop of its own.
- **AR4 — restore in both modes.** A covered or retained screen keeps the
  scroll position of the scroller that scrolls it: the stack's, or the one
  the content names (FR3, FR10).
- **AR5 — a hidden bar keeps the title.** A screen with `isBarHidden` keeps
  `title` as its heading for assistive technology, visually hidden. A change
  focuses that heading where it would focus a bar's title, or the element the
  screen names with `titleFocusRef`, such as its own header's first control.
  The stack's region and its name do not change.

## Design relationships

| Anatomy or state  | Design requirement      | Representation authority | Hierarchy role | Component contract |
| ----------------- | ----------------------- | ------------------------ | -------------- | ------------------ |
| A change's motion | `design:reduced-motion` | prescribed (UIKit)       | supporting     | FR1                |

The component implements design requirements without copying their rationale.

## Family and system relationships

- `spec:AST-094` owns the press model and the back swipe's release; FR7 drops
  a preparation where FR20 hands the touch to a scroll.
- A transition from rest follows `spec:AST-094` FR6's late-commit rule: a
  heavy commit delays its start to the first presented frame and never erases
  it.
- `architecture:component-import-boundaries` owns intent loading and INV10;
  FR7 starts a preparation at INV2's intent, and PR2 holds INV10.

## Verification map

| Contract   | Verification                                                                                                                                                                                    | Representative states                                                                          | Mutation or failure expectation                                                                                      | Audit section                  |
| ---------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- | ------------------------------ |
| FR1        | Unit and browser tests: a cut push and pop land in one commit, with no travel or dimming, and focus a control in the same tap                                                                   | Push, pop, popToRoot, under each pointer                                                       | A travelled cut, or a second commit, fails                                                                           | `audit:NavigationStack/cut`    |
| FR2, FR3   | Unit tests: a popped screen keeps its state and scroll and comes back with no remount; eviction order; `evict`                                                                                  | `retainPopped` 0, 2 and 4                                                                      | A remount on re-push, or a wrong eviction, fails                                                                     | `audit:NavigationStack/keep`   |
| FR4        | Browser tests in Chromium and WebKit: a retained and a prepared screen after the top in the DOM; clicks, wheels, keys and `elementFromPoint` reach the top                                      | Each hidden state, each DOM order                                                              | A hidden screen that takes an event fails                                                                            | `audit:NavigationStack/keep`   |
| FR5        | Unit tests: each state, and a re-render on each change                                                                                                                                          | Every state                                                                                    | A stale state fails                                                                                                  | `audit:NavigationStack/keep`   |
| FR6–FR8    | Unit and browser tests: a prepared push mounts nothing new; a press that becomes a scroll drops; one prepared screen                                                                            | Finger, mouse; a tap and a scroll                                                              | A second mount, a kept drop, or two prepared screens fail                                                            | `audit:NavigationStack/ready`  |
| FR9        | Browser tests: after a pop and a re-push, the screen on view's controls act on its own state, and focus is in it                                                                                | Retained and prepared screens                                                                  | Focus or a key in a hidden screen fails                                                                              | `audit:NavigationStack/keep`   |
| FR10       | Unit and browser tests: a content scroller fills the box under the bar; the veil and a re-push read its scroll                                                                                  | A windowed list; a transcript and composer                                                     | A content box with no height, or a veil on the wrong scroller, fails                                                 | `audit:NavigationStack/scroll` |
| FR11       | Unit and browser tests: a bar-hidden root draws no bar; a push brings the bar in on the push's spring, and a pop takes it out                                                                   | Push and pop, under each pointer; a bar-hidden root with `titleFocusRef`                       | A bar on a hidden screen, or a bar that cuts in, fails                                                               | `audit:NavigationStack/bar`    |
| FR12, FR13 | Unit and browser tests: rich title content in the bar, named by `title`; `focus` as an element and as `'keep'`                                                                                  | A menu as the title; a cut and a push; focus the person moves into the new top during a change | A title named by its content, or focus nowhere meaningful, or a change that takes back focus the person moved, fails | `audit:NavigationStack/bar`    |
| FR14       | A server-render test against the hydrating render; a first mount with a pushed path                                                                                                             | Empty and deep paths                                                                           | A hydration mismatch, or a first mount that moves, fails                                                             | `audit:NavigationStack/ssr`    |
| FR15       | Unit and browser tests: a replace pushes from the trailing edge, or cuts; the replaced screen is retained                                                                                       | With and without retention                                                                     | A missing motion or retention fails                                                                                  | `audit:NavigationStack/cut`    |
| FR16       | Unit tests: each phase and cause, in order                                                                                                                                                      | Back button, swipes, path change                                                               | A missing or misordered event fails                                                                                  | `audit:NavigationStack/events` |
| FR17       | Browser test: a tap right after Back lands once the pop looks done                                                                                                                              | Programmatic pop, a swipe's commit and its reversal                                            | A dropped tap fails                                                                                                  | `audit:NavigationStack/keep`   |
| FR18, FR19 | An iPhone in a home-screen web app with insets; a tap under the clear bar                                                                                                                       | Portrait and landscape                                                                         | A control under an inset, or a swallowed tap, fails                                                                  | `audit:NavigationStack/bar`    |
| FR20       | Browser test: content with a high z-index under the bar                                                                                                                                         | Push, pop and at rest                                                                          | Content painted over the bar fails                                                                                   | `audit:NavigationStack/bar`    |
| FR21       | Browser tests in Chromium and WebKit: Tab pressed and taps sent on every frame of a push and a pop                                                                                              | Push; programmatic pop; a swipe's commit and its reversal                                      | Focus, a key or a tap that reaches a screen not on view, at any frame, fails                                         | `audit:NavigationStack/keep`   |
| PR1        | A browser performance trace while screens are hidden: no layout, paint or animation work of the stack's on a hidden screen                                                                      | Covered beyond the one under the top, retained and prepared screens                            | Layout, paint or an animation on a hidden screen fails                                                               | `audit:NavigationStack/keep`   |
| PR2        | `pnpm size:pages` with a NavigationStack page, each option on and off                                                                                                                           | Each option                                                                                    | More than 0.3 KB gzip for an unused option fails                                                                     | `audit:NavigationStack/size`   |
| PR3        | A first-load bundle check of a page with only NavigationStack: its static graph carries no touch code its first render leaves unused, and the back swipe loads through the shared touch runtime | Back swipes on and off                                                                         | An unused touch internal in the first load, or a static path to the back swipe, fails                                | `audit:NavigationStack/size`   |

## Decision log

### DEC-1 — An app may cut one change

**Reference:** `component:NavigationStack/DEC-1`
**Decider:** pending

A screen that opens with the keyboard has two motions if it also travels.
The app names the change it cuts; every other change keeps UIKit's motion.

### DEC-2 — Popped screens can stay mounted, up to a bound

**Reference:** `component:NavigationStack/DEC-2`
**Decider:** pending

People return to the screens they just left, and a remount loses their
scroll and drafts. A bound of four keeps memory bounded; the default, 0,
keeps the released behavior.

Rejected: keeping every popped screen, because memory grows with each one.

### DEC-3 — A screen reads its own state

**Reference:** `component:NavigationStack/DEC-3`
**Decider:** pending

A hidden screen must stop its live work, such as scroll watchers and frame
loops, and only the screen knows that work.

### DEC-4 — A press can render a screen before its push

**Reference:** `component:NavigationStack/DEC-4`
**Decider:** pending

A push that mounts its screen first can drop frames at its start. The press
that leads to it gives time to render the screen, and a scroll drops it.

### DEC-5 — A screen's content can own its scroller

**Reference:** `component:NavigationStack/DEC-5`
**Decider:** pending

Content such as a windowed list or a transcript brings its own scroller.
Inside the stack's scroller it has no definite height, and the bar watches
the wrong scroller.

### DEC-6 — A screen can hide the bar

**Reference:** `component:NavigationStack/DEC-6`
**Decider:** pending

A root screen can bring its own header, such as a scope menu over a search
field. The bar then arrives and leaves with the change that needs it, on
the change's own spring.

### DEC-7 — A screen names its title content and its focus

**Reference:** `component:NavigationStack/DEC-7`
**Decider:** pending

A screen's title can be a control, and a tap can focus a field inside the
gesture. `title` still names the screen, and focus always lands somewhere a
screen reader announces.

### DEC-8 — The first render matches the server's

**Reference:** `component:NavigationStack/DEC-8`
**Decider:** pending

A link can open deep in the stack. It hydrates with no mismatch and lands at
rest.

### DEC-9 — Replacing the top entry is a change

**Reference:** `component:NavigationStack/DEC-9`
**Decider:** pending

An app moves to a sibling screen at the same depth. It moves as a push, or
cuts, and retention applies.

### DEC-10 — A change's phases are observable

**Reference:** `component:NavigationStack/DEC-10`
**Decider:** pending

An app defers work until a change settles and times the arrival of a
screen.

### DEC-11 — Input returns when a pop looks done

**Reference:** `component:NavigationStack/DEC-11`
**Decider:** pending

A spring takes longer to settle than to look done, and a tap in that tail is
not lost.

### DEC-12 — The bar keeps clear of the safe area and of its empty space

**Reference:** `component:NavigationStack/DEC-12`
**Decider:** pending

A home-screen web app draws under the status bar and the side insets. Where a
clear bar shows content through, it must not take that content's taps.

### DEC-13 — `inert` stays the isolation, off a change's critical frames

**Reference:** `component:NavigationStack/DEC-13`
**Decider:** pending

Setting or lifting `inert` on a large screen costs a style and layout pass.
In a change's first frame, or as a pop ends, that delays the motion and the
next tap. A guard of cheap parts isolates the screen as fully until `inert`
lands.

Rejected: a permanent cheaper isolation, because a second mechanism must stay
equal to `inert` forever.

## Open questions

- **OQ1 — Default bound for `retainPopped`** (`human-api`): whether an app
  that opts in without a number gets 2.

## Content boundary

This file does not duplicate consumer prop tables or examples
(`NavigationStack.doc.mjs`), `spec:AST-094`'s touch rules, or shared theming
rules. It links to their owners.
