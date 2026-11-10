import{a as e,n as t}from"./rolldown-runtime-sJBDdmOt.js";import{t as n}from"./react-DlPsW1c0.js";import{n as r,t as i}from"./stylex-BSlGVhGe.js";import{t as a}from"./jsx-runtime-MKhVqBIO.js";import{n as o}from"./mergeProps-DHkqklmt.js";import{i as s,t as c}from"./themeProps-BVy3p_gf.js";import{o as l}from"./InternationalizationContext-C5wQA9mp.js";import{n as u,t as d}from"./useComponentTranslator-Dzvlp8mx.js";import{n as f}from"./isApplePlatform-D4illHiy.js";var p;function m(){return(m=t((()=>{p={"@astryx.kbd.key.alt":`Alt`,"@astryx.kbd.key.altShort":`Alt`,"@astryx.kbd.key.backspace":`Backspace`,"@astryx.kbd.key.command":`Command`,"@astryx.kbd.key.control":`Control`,"@astryx.kbd.key.controlShort":`Ctrl`,"@astryx.kbd.key.down":`Down arrow`,"@astryx.kbd.key.enter":`Enter`,"@astryx.kbd.key.escape":`Escape`,"@astryx.kbd.key.escapeShort":`Esc`,"@astryx.kbd.key.left":`Left arrow`,"@astryx.kbd.key.plus":`Plus`,"@astryx.kbd.key.right":`Right arrow`,"@astryx.kbd.key.shift":`Shift`,"@astryx.kbd.key.shiftShort":`Shift`,"@astryx.kbd.key.tab":`Tab`,"@astryx.kbd.key.up":`Up arrow`,"@astryx.kbd.key.windowsShort":`Win`,"@astryx.kbd.shortcut":`{shortcut} + {key}`}})))()}function h(e,t,n){let r=t?w.get(e):void 0;if(r!=null)return r;let i=t?void 0:T.get(e);return i==null?e===`escape`?n(`@astryx.kbd.key.escapeShort`):C.get(e)??e.toUpperCase():n(i)}function g(e,t,n){if(e===`mod`)return n(t?`@astryx.kbd.key.command`:`@astryx.kbd.key.control`);let r=D.get(e);return r?n(r):e.toUpperCase()}function _(){return()=>{}}function v(){return!1}function y({keys:e,ref:t,xstyle:n,className:i,style:a,...c}){let l=u(),d=(0,b.useSyncExternalStore)(_,f,v),p=new Map,m=e.split(`+`).map(e=>e.trim().toLowerCase()).map(e=>{let t=p.get(e)??0;return p.set(e,t+1),{key:E.get(e)??e,reactKey:`${e}:${t}`}}),y=m.map(({key:e})=>g(e,d,l)).reduce((e,t,n)=>n===0?t:l(`@astryx.kbd.shortcut`,{shortcut:e,key:t}),``);return(0,x.jsx)(`span`,{...c,ref:t,role:`img`,"aria-label":y,...o(s(`kbd`),r(S.wrapper,n),i,a),children:m.map(({key:e,reactKey:t})=>(0,x.jsx)(`kbd`,{"aria-hidden":`true`,className:`astryx3nfvp2 astryx6s0dn4 astryxl56j7k astryx16asifk astryx1grt7ep astryx1tn5z8q astryx7a5moj astryxx3sua9 astryx17x4s8c astryxlxy82 astryx1q0q8m5 astryxib2hle astryx1tgivj0 astryx9ynric astryx141an7d astryx1e4wzip astryx1ltkj2j astryx87ps6o`,children:h(e,d,l)},t))})}var b,x,S,C,w,T,E,D;function O(){return(O=t((()=>{b=e(n(),1),i(),c(),d(),m(),x=a(),l(p),S={wrapper:{k1xSpc:`astryx3nfvp2`,kGNEyG:`astryx6s0dn4`,kOIVth:`astryxzye2dw`,kmuXW:`astryx2lah0s`,$$css:!0}},C=new Map([[`enter`,`↵`],[`backspace`,`⌫`],[`tab`,`⇥`],[`up`,`↑`],[`down`,`↓`],[`left`,`←`],[`right`,`→`],[`plus`,`+`]]),w=new Map([[`mod`,`⌘`],[`meta`,`⌘`],[`ctrl`,`⌃`],[`alt`,`⌥`],[`shift`,`⇧`]]),T=new Map([[`mod`,`@astryx.kbd.key.controlShort`],[`ctrl`,`@astryx.kbd.key.controlShort`],[`alt`,`@astryx.kbd.key.altShort`],[`shift`,`@astryx.kbd.key.shiftShort`],[`meta`,`@astryx.kbd.key.windowsShort`]]),E=new Map([[`esc`,`escape`],[`return`,`enter`]]),D=new Map([[`ctrl`,`@astryx.kbd.key.control`],[`alt`,`@astryx.kbd.key.alt`],[`shift`,`@astryx.kbd.key.shift`],[`enter`,`@astryx.kbd.key.enter`],[`backspace`,`@astryx.kbd.key.backspace`],[`escape`,`@astryx.kbd.key.escape`],[`tab`,`@astryx.kbd.key.tab`],[`up`,`@astryx.kbd.key.up`],[`down`,`@astryx.kbd.key.down`],[`left`,`@astryx.kbd.key.left`],[`right`,`@astryx.kbd.key.right`],[`plus`,`@astryx.kbd.key.plus`]]),y.displayName=`Kbd`,y.__docgenInfo={description:`Displays a keyboard shortcut as styled <kbd> elements.

A general-purpose component for rendering keyboard shortcuts
anywhere in the system — tooltips, menus, documentation, etc.

Platform-aware: \`mod\` renders as ⌘ on macOS and Ctrl elsewhere.
SSR-safe — defers platform detection through useSyncExternalStore to avoid
hydration mismatches.

@example
\`\`\`
<Kbd keys="mod+k" />
\`\`\``,methods:[],displayName:`Kbd`,props:{xstyle:{required:!1,tsType:{name:`StyleXStyles`},description:"StyleX styles created via `stylex.create()`. Merged with the component's\nbase styles inside a single `stylex.props()` call for optimal deduplication.\n\n@example\n```\nconst overrides = stylex.create({ root: { marginBottom: 8 } });\n<Component xstyle={overrides.root} />\n```"},ref:{required:!1,tsType:{name:`ReactRef`,raw:`React.Ref<HTMLSpanElement>`,elements:[{name:`HTMLSpanElement`}]},description:``},keys:{required:!0,tsType:{name:`string`},description:`Keyboard shortcut string. Use "+" to separate keys.
Special keys: mod, ctrl, alt and shift (Apple symbols on Apple platforms,
short text such as "Ctrl" elsewhere and before hydration), meta (⌘ on
Apple platforms, "Win" text elsewhere and before hydration), enter, backspace, escape, tab, up, down, left, and right.
Aliases: "esc" for "escape" and "return" for "enter".
Use "plus" to render a literal "+" key (e.g. "shift+plus").

@example
\`\`\`
"mod+k"
"mod+shift+p"
"shift+plus"
"enter"
\`\`\``}},composes:[`Omit`]}})))()}export{O as n,y as t};