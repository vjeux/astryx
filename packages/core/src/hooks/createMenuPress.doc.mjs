// Copyright (c) Meta Platforms, Inc. and affiliates.

/** @type {import('@astryxdesign/cli/authoring').HookDoc} */
export const docs = {
  name: 'createMenuPress',
  displayName: 'createMenuPress',
  // A factory documented as a hook: listed with the utilities, beside its
  // hook, not as a tile in the components gallery.
  group: 'Utilities',
  keywords: [
    'menu',
    'press',
    'release',
    'touch',
    'finger',
    'drag',
    'highlight',
    'pointer',
    'gesture',
    'listbox',
    'vanilla',
    'factory',
  ],
  params: [
    {
      name: 'menu',
      type: 'HTMLElement',
      description:
        'The menu or listbox root: the surface whose rows a press picks from. The press listens on it and on the trigger itself, and marks the root with data-astryx-menu-press, so there is nothing to spread.',
      required: true,
    },
    {
      name: 'options',
      type: 'CreateMenuPressOptions',
      description: 'Configuration object.',
      required: true,
    },
    {
      name: 'options.trigger',
      type: 'HTMLElement | null',
      description:
        'The control that opens the menu, when a press may start there.',
    },
    {
      name: 'options.itemSelector',
      type: 'string',
      description:
        'Selector matching the ENABLED rows. A pointer over anything else inside the menu — a divider, a heading, a disabled row — highlights nothing.',
      required: true,
    },
    {
      name: 'options.onTriggerPress',
      type: "(pointerType: 'mouse' | 'pen' | 'touch') => boolean",
      description:
        'A mouse pressed the trigger, or a finger rested on it for the long-press delay: open the menu under the held pointer, and return whether it opened. A false (the press closed an open menu instead) ends the gesture.',
    },
    {
      name: 'options.onHighlight',
      type: '(row: HTMLElement | null) => void',
      description:
        'Move the highlight; null clears it. By default it moves focus onto the row, without scrolling. A picker that highlights through aria-activedescendant supplies its own.',
    },
    {
      name: 'options.onActivate',
      type: '(row: HTMLElement, release: PointerEvent) => void',
      description:
        "Act on the row under the release. By default it dispatches a click on the row with the release's button and modifier keys, so the row acts as its own click would.",
    },
    {
      name: 'options.onDismiss',
      type: '() => void',
      description:
        'A mouse was released outside the menu with nothing acting: close it.',
    },
    {
      name: 'options.getScroller',
      type: '() => HTMLElement | null',
      description:
        'The element to scroll while a tracked pointer rests near its edge. By default it is the menu root when it overflows; return null for none.',
    },
    {
      name: 'options.hitTest',
      type: '(x: number, y: number) => Element | null',
      description:
        "Resolve the element under a viewport point. By default it asks the menu's own document or shadow root.",
    },
    {
      name: 'options.longPressDelayMs',
      type: 'number',
      description:
        'How long a finger rests on the trigger before the menu opens, in ms.',
      default: '500',
    },
    {
      name: 'options.isEnabled',
      type: 'boolean',
      description: 'Whether the model is live.',
      default: 'true',
    },
    {
      name: 'options.startBehavior',
      type: "'menu' | 'items'",
      description:
        "Where a press may start. 'items' takes only a press that lands on an item, with the main button, so other content in the menu keeps its own clicks and a Ctrl, Cmd or Shift mouse press on a link item opens it as the browser would.",
      default: "'menu'",
    },
  ],
  returns: [
    {
      name: 'isTriggerClickFromPress',
      type: '() => boolean',
      description:
        'Whether the click reaching the trigger belongs to the gesture that just pressed it. That press already opened or closed the menu, so the click must neither toggle nor reopen.',
    },
    {
      name: 'cancel',
      type: '() => void',
      description:
        'End the gesture in flight with nothing acting, for when the menu closes under it.',
    },
    {
      name: 'update',
      type: '(options: Partial<CreateMenuPressOptions>) => void',
      description:
        'Merge new options with the ones the press has. They apply from the next event and never end a press in progress.',
    },
    {
      name: 'handleMenuPointerDown',
      type: '(event: PointerEvent | React.PointerEvent) => void',
      description:
        "Hand the press a menu press-down that a handler forwards. The press takes each event once; the menu's own listener already takes one that reaches it.",
    },
    {
      name: 'handleTriggerPointerDown',
      type: '(event: PointerEvent | React.PointerEvent) => void',
      description:
        'Hand the press a trigger press-down that a handler forwards, as above.',
    },
    {
      name: 'handleTriggerContextMenu',
      type: '(event: MouseEvent | React.MouseEvent) => void',
      description:
        "The same for the trigger's contextmenu, which a held finger raises as it opens the menu.",
    },
    {
      name: 'destroy',
      type: '() => void',
      description:
        'Remove every listener the press added. Call it when you remove the menu.',
    },
  ],
  usage: {
    description:
      "The menu press model without React, on any element: the row under the pointer when it is RELEASED is the row that acts, the highlight follows the pointer while it is held, a mouse opens the menu on press and can drag straight into it, and a finger held on the trigger opens it with the finger still down. In React, use the useMenuPress hook. Astryx's own menus already run on this factory.",
    bestPractices: [
      {
        guidance: true,
        description:
          'Pass a selector for ENABLED rows only, so a disabled row or a divider under the pointer clears the highlight instead of lighting up.',
      },
      {
        guidance: true,
        description:
          'Call update() when the trigger, a callback or an option changes, rather than creating a new press: a press in progress goes on.',
      },
      {
        guidance: true,
        description:
          'Call destroy() when you remove the menu, so no listener stays behind.',
      },
      {
        guidance: false,
        description:
          'Act on a row from its own pointerdown or pointerup handler as well; the press already activates the row under the release, and a second path acts twice.',
      },
    ],
  },
  relatedHooks: ['useMenuPress'],
  importPath: '@astryxdesign/core',
  category: 'interaction',
};

/** @type {import('@astryxdesign/cli/authoring').HookTranslationDoc} */
export const docsDense = {
  description:
    'The menu press model without React: the row under the RELEASE acts, the highlight follows a held pointer, a mouse opens on press, a held finger opens with the finger down.',
  paramDescriptions: {
    menu: 'menu / listbox root; listened on and marked, nothing to spread.',
    options: 'config.',
    'options.trigger': 'the control that opens the menu.',
    'options.itemSelector': 'selector for ENABLED rows; anything else clears.',
    'options.onTriggerPress':
      'mouse press / held finger on trigger: open, return whether it opened (false = the press closed it).',
    'options.onHighlight':
      'move highlight (null clears); default = focus w/o scroll.',
    'options.onActivate':
      'act on row under release; default = dispatch click w/ release button + modifiers.',
    'options.onDismiss': 'MOUSE released outside: close.',
    'options.getScroller':
      'element to edge-autoscroll; default = menu root if it overflows.',
    'options.hitTest': 'element under a point; default = the menu’s root.',
    'options.longPressDelayMs': 'finger hold before open, ms.',
    'options.isEnabled': 'false = inert.',
    'options.startBehavior': "'items' = only a press on an item starts.",
  },
  returnDescriptions: {
    isTriggerClickFromPress:
      'true = the trigger click belongs to the press that already opened / closed; ignore it.',
    cancel: 'end the gesture w/o acting.',
    update: 'merge options; from the next event, never ends a press.',
    handleMenuPointerDown: 'forward a menu press-down; taken once.',
    handleTriggerPointerDown: 'forward a trigger press-down; taken once.',
    handleTriggerContextMenu: 'forward the trigger’s contextmenu.',
    destroy: 'remove every listener.',
  },
  usage: {
    description:
      'Release decides; highlight follows the pointer; mouse press-opens; held finger opens. React: useMenuPress.',
    bestPractices: [
      {
        guidance: true,
        description: 'itemSelector = ENABLED rows only.',
      },
      {
        guidance: true,
        description: 'update() on a change; destroy() on removal.',
      },
      {
        guidance: false,
        description:
          'Also act on pointerdown / pointerup in the row; the press already acts on release.',
      },
    ],
  },
};
