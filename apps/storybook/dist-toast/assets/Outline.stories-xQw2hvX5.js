import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{t}from"./react-DlPsW1c0.js";import{n,t as r}from"./stylex-BSlGVhGe.js";import{t as i}from"./jsx-runtime-MKhVqBIO.js";import{n as a}from"./mergeProps-DHkqklmt.js";import{i as o,t as s}from"./themeProps-BVy3p_gf.js";import{n as ee,t as c}from"./useMergedRefs-D6axeCXB.js";import{o as l}from"./InternationalizationContext-C5wQA9mp.js";import{n as u,t as d}from"./useComponentTranslator-Dzvlp8mx.js";import{a as f,r as p}from"./focusOutline.stylex-DWroqGen.js";import{i as m,n as h,r as g,t as _}from"./usePressFeedback-KAUIHUDJ.js";import{n as v,t as y}from"./Text-C5BHw0wv.js";import{n as b,t as x}from"./useLinkComponent-DVILVvhE.js";import{n as S,t as C}from"./Heading-YiIeUtHm.js";import{n as w,t as T}from"./Badge-DqOhTiyH.js";import{r as te,t as E}from"./scrollingAncestor-DWQl-gqg.js";import{M as D,T as ne,j as re,o as O,u as k}from"./MarkdownPluginNodeRenderer-By5mNuDg.js";import{i as ie,n as ae,r as oe,t as se}from"./Markdown-BzOsAWcI.js";function ce(e){return Number.parseFloat(window.getComputedStyle(e).scrollMarginTop)||0}function le(e){return e==null?0:e.getBoundingClientRect().top}function ue(e,t,n){return le(t)+n+ce(e)}function de(e,t,n,r){if(r===0){e.scrollIntoView({behavior:`smooth`,block:`start`});return}let i=e.getBoundingClientRect().top-ue(e,t,r);n.scrollBy({top:i,behavior:`smooth`})}function fe(e,t,n){if(e.length===0)return;if(t==null?window.innerHeight+window.scrollY>=document.documentElement.scrollHeight-2:t.scrollTop+t.clientHeight>=t.scrollHeight-2)return e[e.length-1].id;let r=e[0].id;for(let i of e){let e=document.getElementById(i.id);if(e!=null){if(e.getBoundingClientRect().top<=ue(e,t,n)+1)r=i.id;else break}}return r}function pe({activeId:e,items:t,onActiveIdChange:n,rootRef:r,offset:i=0,scrollContainerRef:a,hasScrollOnClick:o=!0,onNavigateStart:s,onNavigateEnd:ee}){let c=e!==void 0,[l,u]=(0,A.useState)(t[0]?.id),d=(0,A.useRef)(e),f=(0,A.useRef)(!1),p=(0,A.useRef)(null),m=(0,A.useRef)(null),h=(0,A.useRef)(t);h.current=t;let g=(0,A.useRef)(n);g.current=n;let _=t.map(e=>e.id).join(`
`);d.current=c?e:l;let v=(0,A.useCallback)(()=>a?.current??(r.current==null?null:te(r.current)),[r,a]);(0,A.useEffect)(()=>{if(c||typeof window>`u`)return;let e=v(),t=e??window,n=0,r=()=>{if(n=0,f.current)return;let t=fe(h.current,e,i);t!=null&&t!==d.current&&(d.current=t,u(t),g.current?.(t))},a=()=>{n===0&&(n=requestAnimationFrame(r))};return m.current=r,r(),t.addEventListener(`scroll`,a,{passive:!0}),window.addEventListener(`resize`,a,{passive:!0}),()=>{m.current=null,t.removeEventListener(`scroll`,a),window.removeEventListener(`resize`,a),n!==0&&cancelAnimationFrame(n)}},[c,_,i,v]),(0,A.useEffect)(()=>()=>{p.current?.teardown()},[]);let y=e=>{c||u(e),n?.(e)};return{activeId:c?e:l,setActiveId:y,scrollTo:e=>{let t=typeof document<`u`?document.getElementById(e):null;if(t==null)return!1;p.current?.supersede(),s?.(e),c?y(e):f.current=!0;let n=v(),r=n??window,a=0,l=!1,h=()=>{r.removeEventListener(`scrollend`,b),r.removeEventListener(`wheel`,x),r.removeEventListener(`touchmove`,x),window.removeEventListener(`keydown`,S),a!==0&&(clearTimeout(a),a=0),p.current=null},_=(t,n=!0)=>{l||(l=!0,h(),c||(f.current=!1,t?(u(e),d.current=e,g.current?.(e)):n&&m.current?.()),ee?.(e))},b=()=>_(!0),x=()=>_(!1),S=e=>{!e.defaultPrevented&&me.has(e.key)&&_(!1)};return o?(r.addEventListener(`scrollend`,b,{once:!0}),r.addEventListener(`wheel`,x,{passive:!0}),r.addEventListener(`touchmove`,x,{passive:!0}),window.addEventListener(`keydown`,S),a=window.setTimeout(b,j),p.current={supersede:()=>_(!1,!1),teardown:h},de(t,n,r,i)):_(!0),!0}}}var A,j,me;function he(){return(he=e((()=>{A=t(),E(),j=1200,me=new Set([`ArrowUp`,`ArrowDown`,`PageUp`,`PageDown`,`Home`,`End`,` `,`Spacebar`])})))()}var ge;function _e(){return(_e=e((()=>{ge={"@astryx.outline.label":`Table of contents`}})))()}function ve(e){switch(Math.max(1,Math.min(4,e-1||1))){case 1:return I.level1;case 2:return I.level2;case 3:return I.level3;default:return I.level4}}function ye(e){let t=document.getElementById(e);t!=null&&(t.focus({preventScroll:!0}),document.activeElement!==t&&!t.hasAttribute(`tabindex`)&&(t.setAttribute(`tabindex`,`-1`),t.focus({preventScroll:!0})))}function M({items:e,activeId:t,onActiveIdChange:r,label:i,density:s=`default`,onNavigateStart:c,onNavigateEnd:l,offset:d=0,scrollContainerRef:f,hasScrollOnClick:g=!0,xstyle:_,className:v,style:y,ref:x,"data-testid":S,...C}){let w=h(),T=u(),te=i??T(`@astryx.outline.label`),E=(0,N.useRef)(null),D=b(),{activeId:ne,scrollTo:re}=pe({activeId:t,items:e,onActiveIdChange:r,rootRef:E,offset:d,scrollContainerRef:f,hasScrollOnClick:g,onNavigateStart:c,onNavigateEnd:l}),O=e=>{re(e)&&(window.history.pushState(null,``,`#${e}`),ye(e))},k=e=>e.metaKey||e.altKey||e.ctrlKey||e.shiftKey,ie=e=>t=>{t.defaultPrevented||k(t)||document.getElementById(e)!=null&&(t.preventDefault(),O(e))},ae=e=>t=>{t.key!==` `&&t.key!==`Spacebar`||t.defaultPrevented||k(t)||(t.preventDefault(),O(e))};return(0,P.jsxs)(`nav`,{...C,ref:ee(E,x),"aria-label":te,"data-testid":S,...a(o(`outline`,{density:s}),n(F.root,_),v,y),children:[(0,P.jsx)(`ul`,{className:`astryx78zum5 astryxdt5ytf astryx1lsbc85 astryx1ghz6dp astryx1717udv astryxe8uvvx astryx98rzlu astryxeuugli`,role:`list`,children:e.map(e=>{let t=e.id===ne;return(0,P.jsx)(`li`,{className:`astryx3ct3a4 astryx1ghz6dp astryx1717udv`,role:`listitem`,children:(0,P.jsx)(D,{href:`#${e.id}`,"aria-current":t?`location`:void 0,onClick:ie(e.id),onKeyDown:ae(e.id),...w,...a(o(`outline-item`,{active:t?`active`:null,level:e.level}),p.focusVisible(F.link,m.backgroundColor,be[s],ve(e.level),t&&F.activeLink,t&&F.activeAnchor)),children:(0,P.jsx)(`span`,{className:`astryxb3r6kr astryxlyipyv astryxuxw1ft`,children:e.label})})},e.id)})}),(0,P.jsx)(`div`,{className:`astryx1n2onr6 astryxfo62xy astryx2lah0s astryx1clqncf`,"aria-hidden":`true`,children:(0,P.jsx)(`span`,{className:`astryx10l6tqk astryx13vifvy astryx1ey2m1c astryx1o0tod astryxfo62xy astryx1m4xfpy astryxjspbzw astryx47corl`})}),(0,P.jsx)(`span`,{...a(o(`outline-indicator`),{className:`astryx10l6tqk astryx1o0tod astryxfo62xy astryxowkcby astryxjspbzw astryx47corl astryx1vjfegm astryx1tsffl5 astryx1ltwjim astryx1qjb5ga astryx1xuz8iz astryxkvfbh3 astryxlr8y92`}),"aria-hidden":`true`})]})}var N,P,F,be,I;function xe(){return(xe=e((()=>{N=t(),r(),x(),he(),s(),f(),g(),_(),c(),d(),_e(),P=i(),l(ge),F={root:{k1xSpc:`astryx78zum5`,kXwgrk:`astryx1q0g3np`,kVAEAm:`astryx1n2onr6`,kOIVth:`astryx1lsbc85`,kzqmXN:`astryxh8yej3`,$$css:!0},activeAnchor:{k48fcG:`astryx7dpabl`,$$css:!0},link:{kGNEyG:`astryx6s0dn4`,kaIpWk:`astryxh6dtrn`,krdFHd:null,kfmiAY:null,kVL7Gh:null,kT0f0o:null,kIxVMA:null,ksF3WI:null,kqGeR4:null,kYm2EN:null,kB7OPa:`astryx9f619`,kMwMTN:`astryxv1l7n4`,kkrTdU:`astryx1ypdohk astryx16khyan`,k1xSpc:`astryx78zum5`,k63SB2:`astryx1sodnla`,kVAEAm:`astryx1n2onr6`,k9WMMc:`astryx1yc453h`,kybGjl:`astryx1hl2dhg`,k1TLXF:null,kMnn75:null,kmVMDM:null,kNySMw:null,kIyJzY:`astryxuedmi6`,k1ekBW:`astryxs2xxs2`,kAMwcw:`astryxlr8y92`,kzqmXN:`astryxh8yej3`,kGuDYH:`astryxjm74w1`,kLWn49:`astryxw6l6zx`,kZC7kL:`astryxo5jvnm`,$$css:!0},activeLink:{kMwMTN:`astryx1tgivj0`,k63SB2:`astryx2mo6ok`,$$css:!0}},be={compact:{k8WAf4:`astryxu0wf1k`,kLKAdn:null,kGO01o:null,kwRFfy:`astryx1djylfy`,kE3dHu:null,kpe85a:null,$$css:!0},default:{k8WAf4:`astryxce4md1`,kLKAdn:null,kGO01o:null,kwRFfy:`astryx1djylfy`,kE3dHu:null,kpe85a:null,$$css:!0}},I={level1:{kZCmMZ:`astryx126nfab`,kE3dHu:null,kpe85a:null,$$css:!0},level2:{kZCmMZ:`astryxchaq28`,kE3dHu:null,kpe85a:null,$$css:!0},level3:{kZCmMZ:`astryxc8afjc`,kE3dHu:null,kpe85a:null,$$css:!0},level4:{kZCmMZ:`astryx19b7t93`,kE3dHu:null,kpe85a:null,$$css:!0}},M.displayName=`Outline`,M.__docgenInfo={description:`A table-of-contents navigation component for document headings.

Outline accepts a flat \`items\` array and renders anchor links with
indentation based on each heading level. Features a sliding indicator
track that animates to the active item.

When \`activeId\` is omitted, it tracks scroll position and marks the last
heading whose top has passed its activation line — which is exactly where
navigating to that heading lands it: \`offset\` (a fixed header overlaying the
scroll root) plus the heading's own \`scroll-margin-top\`. It defaults to the
first item at the top and the last at the bottom.

Keyboard: each link is in the normal Tab order, and Enter/Space activate.
There is no arrow, Home, or End movement between links.

@example
\`\`\`
<Outline
  items={[
    {id: 'intro', label: 'Introduction', level: 1},
    {id: 'features', label: 'Features', level: 2},
    {id: 'api', label: 'API Reference', level: 1},
  ]}
/>
\`\`\`

Scoped to a custom scroll container, under a fixed header:

@example
\`\`\`
const scrollContainerRef = useRef<HTMLDivElement>(null);
<div ref={scrollContainerRef} style={{overflowY: 'auto'}}>...</div>
<Outline
  items={items}
  scrollContainerRef={scrollContainerRef}
  offset={64}
  onNavigateEnd={id => flashHeading(id)}
/>
\`\`\``,methods:[],displayName:`Outline`,props:{xstyle:{required:!1,tsType:{name:`StyleXStyles`},description:"StyleX styles created via `stylex.create()`. Merged with the component's\nbase styles inside a single `stylex.props()` call for optimal deduplication.\n\n@example\n```\nconst overrides = stylex.create({ root: { marginBottom: 8 } });\n<Component xstyle={overrides.root} />\n```"},ref:{required:!1,tsType:{name:`ReactRef`,raw:`React.Ref<HTMLElement>`,elements:[{name:`HTMLElement`}]},description:`Ref forwarded to the root nav element.`},items:{required:!0,tsType:{name:`Array`,elements:[{name:`OutlineItem`}],raw:`OutlineItem[]`},description:`Ordered list of heading items to render.`},activeId:{required:!1,tsType:{name:`string`},description:`ID of the currently active item. When provided, disables built-in scroll-spy.`},onActiveIdChange:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(id: string) => void`,signature:{arguments:[{type:{name:`string`},name:`id`}],return:{name:`void`}}},description:`Called when the active item changes from scroll-spy or click.`},label:{required:!1,tsType:{name:`string`},description:`Accessible label for the nav landmark. @default 'Table of contents'`},density:{required:!1,tsType:{name:`union`,raw:`'default' | 'compact'`,elements:[{name:`literal`,value:`'default'`},{name:`literal`,value:`'compact'`}]},description:`Density variant controlling item padding.
- 'default': Standard spacing (default)
- 'compact': Reduced spacing for dense UIs
@default 'default'`,defaultValue:{value:`'default'`,computed:!1}},onNavigateStart:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(id: string) => void`,signature:{arguments:[{type:{name:`string`},name:`id`}],return:{name:`void`}}},description:"Called when navigation to an item begins, before the scroll starts.\nReceives the item `id`. Pair with `onNavigateEnd` to drive an arrival\neffect (flash, ring, pulse) on the target heading."},onNavigateEnd:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(id: string) => void`,signature:{arguments:[{type:{name:`string`},name:`id`}],return:{name:`void`}}},description:`Called once when navigation to an item resolves — when the smooth scroll
settles, or immediately-ish when reduced motion turns it into a jump.

Fires exactly once for every \`onNavigateStart\`, including when the user
interrupts the scroll by scrolling manually, so a "navigating" state can
never leak. It does not fire if the Outline unmounts mid-scroll.`},offset:{required:!1,tsType:{name:`number`},description:`Height in px of a fixed header overlaying the top of the scroll root.

Shifts both the activation line *and* the scroll landing by the same
amount, so a heading activates exactly where navigating to it puts it —
below the header rather than hidden underneath it.

It composes with each heading's own \`scroll-margin-top\` (the header, then
the breathing room below it) rather than replacing it. When nothing
overlays the content, leave this at 0 and let \`scroll-margin-top\` do the
work — the browser already honors it.

@default 0`,defaultValue:{value:`0`,computed:!1}},scrollContainerRef:{required:!1,tsType:{name:`ReactRefObject`,raw:`React.RefObject<HTMLElement | null>`,elements:[{name:`union`,raw:`HTMLElement | null`,elements:[{name:`HTMLElement`},{name:`null`}]}]},description:`Scroll container to track, instead of auto-detecting the nearest scrollable
ancestor. Use this when the content scrolls inside a split pane, modal, or
dashboard panel rather than the viewport.`},hasScrollOnClick:{required:!1,tsType:{name:`boolean`},description:`Whether activating an item smooth-scrolls to it. Set to false to own the
scrolling yourself (virtualized content, a router) — the Outline still
updates the active item, the hash, and the navigate callbacks, but performs
no scroll and suppresses the anchor's default jump.
@default true`,defaultValue:{value:`true`,computed:!1}},"data-testid":{required:!1,tsType:{name:`string`},description:`Test ID for testing frameworks.`}},composes:[`Omit`]}})))()}function Se(e,t){let n=t?.plugins,r;try{r=n==null?void 0:re(n)}catch(e){D(`configuration`,`transform`,e),n=void 0}let i=k(e,{plugins:n},t?.isFinal??!0);return[...ie(i,r).outline]}function Ce(){return(Ce=e((()=>{O(),oe(),ne()})))()}function we(e,t){let n=t?.plugins,r=t?.isFinal;return(0,Te.useMemo)(()=>Se(e,{plugins:n,isFinal:r}),[e,n,r])}var Te;function Ee(){return(Ee=e((()=>{Te=t(),Ce()})))()}function L(e){return e==null?[]:Array.from(e.querySelectorAll(`h1,h2,h3,h4,h5,h6`)).map(e=>{let t=Number(e.tagName.slice(1)),n=e.textContent?.trim()??``;return{id:e.id,label:n,level:t}}).filter(e=>e.id!==``&&e.label!==``)}function De(e){let[t,n]=(0,R.useState)(()=>L(e.current));return(0,R.useEffect)(()=>{let t=e.current;if(n(L(t)),t==null||typeof MutationObserver>`u`)return;let r=new MutationObserver(()=>{n(L(t))});return r.observe(t,{childList:!0,subtree:!0,characterData:!0,attributes:!0,attributeFilter:[`id`]}),()=>{r.disconnect()}},[e]),t}var R;function Oe(){return(Oe=e((()=>{R=t()})))()}function ke(e){return typeof e==`string`||typeof e==`number`?String(e):Array.isArray(e)?e.map(ke).join(``):``}function Ae(e){return e.trim().toLowerCase().replace(/['\u201C\u201D"]/g,``).replace(/[^a-z0-9]+/g,`-`).replace(/^-+|-+$/g,``)||`section`}var z,B,je,V,H,U,W,G,K,q,J,Y,X,Z,Q,$,Me;function Ne(){return(Ne=e((()=>{z=t(),xe(),Oe(),Ee(),w(),ae(),S(),v(),B=i(),je={title:`Core/Outline`,component:M,tags:[`autodocs`],argTypes:{label:{control:`text`,description:`Accessible label for the nav landmark`},activeId:{control:`text`,description:`Controlled active item id`},density:{control:`radio`,options:[`default`,`compact`],description:`Density variant`}}},V=[{id:`overview`,label:`Overview`,level:2},{id:`installation`,label:`Installation`,level:2},{id:`theming`,label:`Theming`,level:2},{id:`tokens`,label:`Tokens`,level:3},{id:`component-overrides`,label:`Component overrides`,level:3},{id:`accessibility`,label:`Accessibility`,level:2}],H=48,U=`## Overview

Astryx gives teams a consistent foundation for internal product surfaces.

## Installation

Install the package and wrap the app in an Theme provider.

### Package setup

Import components from their component subpaths for clear ownership.

### Theme setup

Use a built theme in production so component overrides are present at first paint.

## Accessibility

Components include semantic roles, labels, and focus behavior where applicable.`,W={args:{items:V}},G={args:{items:V,activeId:`tokens`}},K={args:{items:V,activeId:`installation`,density:`compact`}},q={render:()=>(0,B.jsxs)(`div`,{style:{display:`grid`,gridTemplateColumns:`minmax(0, 1fr) 220px`,gap:32,maxWidth:960},children:[(0,B.jsxs)(`article`,{style:{display:`grid`,gap:24},children:[(0,B.jsxs)(`section`,{children:[(0,B.jsx)(`h2`,{id:`overview`,children:`Overview`}),(0,B.jsx)(`p`,{children:`Astryx components provide consistent interaction, styling, and theme behavior for internal tools.`})]}),(0,B.jsxs)(`section`,{children:[(0,B.jsx)(`h2`,{id:`installation`,children:`Installation`}),(0,B.jsx)(`p`,{children:`Install the package, wrap the app with Theme, and import components from their subpaths.`})]}),(0,B.jsxs)(`section`,{children:[(0,B.jsx)(`h2`,{id:`theming`,children:`Theming`}),(0,B.jsx)(`p`,{children:`Themes define semantic tokens and component overrides without changing app code.`}),(0,B.jsx)(`h3`,{id:`tokens`,children:`Tokens`}),(0,B.jsx)(`p`,{children:`Use semantic color, spacing, typography, radius, elevation, and motion tokens.`}),(0,B.jsx)(`h3`,{id:`component-overrides`,children:`Component overrides`}),(0,B.jsx)(`p`,{children:`Component overrides target the stable Astryx selector surface emitted by each component: astryx-* classes plus data-* prop reflections.`})]}),(0,B.jsxs)(`section`,{children:[(0,B.jsx)(`h2`,{id:`accessibility`,children:`Accessibility`}),(0,B.jsx)(`p`,{children:`Components include landmark, keyboard, focus, and ARIA behavior where applicable.`})]})]}),(0,B.jsx)(`aside`,{style:{position:`sticky`,top:24,alignSelf:`start`},children:(0,B.jsx)(M,{items:V})})]})},J={render:()=>{let e=we(U);return(0,B.jsxs)(`div`,{style:{display:`grid`,gridTemplateColumns:`minmax(0, 1fr) 220px`,gap:32,maxWidth:960},children:[(0,B.jsx)(se,{components:{heading:({level:e,children:t})=>{let n=`h${e}`;return(0,B.jsx)(n,{id:Ae(ke(t)),children:t})}},children:U}),(0,B.jsx)(`aside`,{style:{position:`sticky`,top:24,alignSelf:`start`},children:(0,B.jsx)(M,{items:e})})]})}},Y={render:()=>{let e=(0,z.useRef)(null),t=De(e);return(0,B.jsxs)(`div`,{style:{display:`grid`,gridTemplateColumns:`minmax(0, 1fr) 220px`,gap:32,maxWidth:960},children:[(0,B.jsxs)(`article`,{ref:e,style:{display:`grid`,gap:24},children:[(0,B.jsxs)(`section`,{children:[(0,B.jsx)(C,{id:`account-settings`,level:2,children:`Account settings`}),(0,B.jsx)(y,{type:`body`,children:`Manage profile, authentication, and workspace preferences.`}),(0,B.jsxs)(`div`,{style:{display:`flex`,gap:8,marginTop:12},children:[(0,B.jsx)(T,{variant:`success`,label:`Active`}),(0,B.jsx)(T,{variant:`neutral`,label:`Workspace`})]})]}),(0,B.jsxs)(`section`,{children:[(0,B.jsx)(C,{id:`notifications`,level:2,children:`Notifications`}),(0,B.jsx)(y,{type:`body`,children:`Choose which product events should notify the team.`}),(0,B.jsx)(C,{id:`email-alerts`,level:3,children:`Email alerts`}),(0,B.jsx)(y,{type:`body`,children:`Use email for low-frequency summaries and approvals.`}),(0,B.jsx)(C,{id:`push-alerts`,level:3,children:`Push alerts`}),(0,B.jsx)(y,{type:`body`,children:`Use push for time-sensitive updates and incidents.`})]}),(0,B.jsxs)(`section`,{children:[(0,B.jsx)(C,{id:`billing`,level:2,children:`Billing`}),(0,B.jsx)(y,{type:`body`,children:`Review invoices, payment methods, and usage limits.`})]})]}),(0,B.jsx)(`aside`,{style:{position:`sticky`,top:24,alignSelf:`start`},children:(0,B.jsx)(M,{items:t})})]})}},X={render:()=>(0,B.jsx)(`div`,{style:{width:240},children:(0,B.jsx)(M,{items:[{id:`chapter-1`,label:`Chapter 1`,level:1},{id:`section-1-1`,label:`Section 1.1`,level:2},{id:`subsection-1-1-1`,label:`Subsection 1.1.1`,level:3},{id:`subsection-1-1-2`,label:`Subsection 1.1.2`,level:3},{id:`section-1-2`,label:`Section 1.2`,level:2},{id:`chapter-2`,label:`Chapter 2`,level:1},{id:`section-2-1`,label:`Section 2.1`,level:2}],activeId:`subsection-1-1-1`})})},Z={render:()=>{let e=(0,z.useRef)(null);return(0,B.jsxs)(`div`,{style:{display:`grid`,gridTemplateColumns:`minmax(0, 1fr) 220px`,gap:32,maxWidth:960},children:[(0,B.jsxs)(`div`,{ref:e,tabIndex:0,role:`region`,"aria-label":`Article content`,style:{overflowY:`auto`,height:360,border:`1px solid rgba(128,128,128,0.3)`,borderRadius:8,position:`relative`},children:[(0,B.jsx)(`div`,{style:{position:`sticky`,top:0,height:H,boxSizing:`border-box`,padding:`0 16px`,display:`flex`,alignItems:`center`,background:`var(--color-surface, #fff)`,borderBottom:`1px solid rgba(128,128,128,0.3)`,zIndex:1},children:(0,B.jsx)(T,{label:`Sticky header (${H}px)`})}),(0,B.jsx)(`div`,{style:{padding:`0 16px 16px`},children:V.map(e=>(0,B.jsxs)(`section`,{children:[(0,B.jsx)(C,{id:e.id,level:e.level===2?2:3,style:{scrollMarginTop:8},children:e.label}),(0,B.jsx)(y,{children:`Scroll the pane. The outline tracks the pane's scroll position, not the window's.`}),(0,B.jsx)(`div`,{style:{height:160}})]},e.id))})]}),(0,B.jsx)(`aside`,{style:{alignSelf:`start`},children:(0,B.jsx)(M,{items:V,scrollContainerRef:e,offset:H})})]})}},Q={render:()=>{let[e,t]=(0,z.useState)(`idle`),[n,r]=(0,z.useState)(null);return(0,B.jsxs)(`div`,{style:{display:`grid`,gridTemplateColumns:`minmax(0, 1fr) 220px`,gap:32,maxWidth:960},children:[(0,B.jsx)(`article`,{children:V.map(e=>(0,B.jsxs)(`section`,{children:[(0,B.jsx)(C,{id:e.id,level:e.level===2?2:3,style:{scrollMarginTop:16,transition:`background-color 600ms`,backgroundColor:n===e.id?`var(--color-overlay-hover, rgba(128,128,128,0.2))`:`transparent`},children:e.label}),(0,B.jsx)(`div`,{style:{height:320}})]},e.id))}),(0,B.jsxs)(`aside`,{style:{position:`sticky`,top:24,alignSelf:`start`},children:[(0,B.jsx)(T,{label:e}),(0,B.jsx)(M,{items:V,onNavigateStart:e=>{r(null),t(`scrolling to ${e}`)},onNavigateEnd:e=>{r(e),t(`arrived at ${e}`)}})]})]})}},$={render:()=>(0,B.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:16,width:240},children:[(0,B.jsx)(`button`,{type:`button`,children:`Focus me, then press Tab`}),(0,B.jsx)(M,{items:V}),(0,B.jsx)(`button`,{type:`button`,children:`After the outline`})]})},W.parameters={...W.parameters,docs:{...W.parameters?.docs,source:{originalSource:`{
  args: {
    items: outlineItems
  }
}`,...W.parameters?.docs?.source}}},G.parameters={...G.parameters,docs:{...G.parameters?.docs,source:{originalSource:`{
  args: {
    items: outlineItems,
    activeId: 'tokens'
  }
}`,...G.parameters?.docs?.source}}},K.parameters={...K.parameters,docs:{...K.parameters?.docs,source:{originalSource:`{
  args: {
    items: outlineItems,
    activeId: 'installation',
    density: 'compact'
  }
}`,...K.parameters?.docs?.source},description:{story:`Compact density variant — reduced spacing for dense UIs`,...K.parameters?.docs?.description}}},q.parameters={...q.parameters,docs:{...q.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'grid',
    gridTemplateColumns: 'minmax(0, 1fr) 220px',
    gap: 32,
    maxWidth: 960
  }}>
      <article style={{
      display: 'grid',
      gap: 24
    }}>
        <section>
          <h2 id="overview">Overview</h2>
          <p>
            Astryx components provide consistent interaction, styling, and theme
            behavior for internal tools.
          </p>
        </section>
        <section>
          <h2 id="installation">Installation</h2>
          <p>
            Install the package, wrap the app with Theme, and import components
            from their subpaths.
          </p>
        </section>
        <section>
          <h2 id="theming">Theming</h2>
          <p>
            Themes define semantic tokens and component overrides without
            changing app code.
          </p>
          <h3 id="tokens">Tokens</h3>
          <p>
            Use semantic color, spacing, typography, radius, elevation, and
            motion tokens.
          </p>
          <h3 id="component-overrides">Component overrides</h3>
          <p>
            Component overrides target the stable Astryx selector surface
            emitted by each component: astryx-* classes plus data-* prop
            reflections.
          </p>
        </section>
        <section>
          <h2 id="accessibility">Accessibility</h2>
          <p>
            Components include landmark, keyboard, focus, and ARIA behavior
            where applicable.
          </p>
        </section>
      </article>
      <aside style={{
      position: 'sticky',
      top: 24,
      alignSelf: 'start'
    }}>
        <Outline items={outlineItems} />
      </aside>
    </div>
}`,...q.parameters?.docs?.source}}},J.parameters={...J.parameters,docs:{...J.parameters?.docs,source:{originalSource:`{
  render: () => {
    const items = useOutlineFromMarkdown(markdownContent);
    return <div style={{
      display: 'grid',
      gridTemplateColumns: 'minmax(0, 1fr) 220px',
      gap: 32,
      maxWidth: 960
    }}>
        <Markdown components={{
        heading: ({
          level,
          children
        }) => {
          const Tag = \`h\${level}\` as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
          return <Tag id={storySlug(nodeText(children))}>{children}</Tag>;
        }
      }}>
          {markdownContent}
        </Markdown>
        <aside style={{
        position: 'sticky',
        top: 24,
        alignSelf: 'start'
      }}>
          <Outline items={items} />
        </aside>
      </div>;
  }
}`,...J.parameters?.docs?.source}}},Y.parameters={...Y.parameters,docs:{...Y.parameters?.docs,source:{originalSource:`{
  render: () => {
    const contentRef = useRef<HTMLElement | null>(null);
    const items = useOutlineFromDOM(contentRef);
    return <div style={{
      display: 'grid',
      gridTemplateColumns: 'minmax(0, 1fr) 220px',
      gap: 32,
      maxWidth: 960
    }}>
        <article ref={contentRef} style={{
        display: 'grid',
        gap: 24
      }}>
          <section>
            <Heading id="account-settings" level={2}>
              Account settings
            </Heading>
            <Text type="body">
              Manage profile, authentication, and workspace preferences.
            </Text>
            <div style={{
            display: 'flex',
            gap: 8,
            marginTop: 12
          }}>
              <Badge variant="success" label="Active" />
              <Badge variant="neutral" label="Workspace" />
            </div>
          </section>
          <section>
            <Heading id="notifications" level={2}>
              Notifications
            </Heading>
            <Text type="body">
              Choose which product events should notify the team.
            </Text>
            <Heading id="email-alerts" level={3}>
              Email alerts
            </Heading>
            <Text type="body">
              Use email for low-frequency summaries and approvals.
            </Text>
            <Heading id="push-alerts" level={3}>
              Push alerts
            </Heading>
            <Text type="body">
              Use push for time-sensitive updates and incidents.
            </Text>
          </section>
          <section>
            <Heading id="billing" level={2}>
              Billing
            </Heading>
            <Text type="body">
              Review invoices, payment methods, and usage limits.
            </Text>
          </section>
        </article>
        <aside style={{
        position: 'sticky',
        top: 24,
        alignSelf: 'start'
      }}>
          <Outline items={items} />
        </aside>
      </div>;
  }
}`,...Y.parameters?.docs?.source}}},X.parameters={...X.parameters,docs:{...X.parameters?.docs,source:{originalSource:`{
  render: () => {
    const items: OutlineItem[] = [{
      id: 'chapter-1',
      label: 'Chapter 1',
      level: 1
    }, {
      id: 'section-1-1',
      label: 'Section 1.1',
      level: 2
    }, {
      id: 'subsection-1-1-1',
      label: 'Subsection 1.1.1',
      level: 3
    }, {
      id: 'subsection-1-1-2',
      label: 'Subsection 1.1.2',
      level: 3
    }, {
      id: 'section-1-2',
      label: 'Section 1.2',
      level: 2
    }, {
      id: 'chapter-2',
      label: 'Chapter 2',
      level: 1
    }, {
      id: 'section-2-1',
      label: 'Section 2.1',
      level: 2
    }];
    return <div style={{
      width: 240
    }}>
        <Outline items={items} activeId="subsection-1-1-1" />
      </div>;
  }
}`,...X.parameters?.docs?.source},description:{story:`Deep nesting with multiple indent levels`,...X.parameters?.docs?.description}}},Z.parameters={...Z.parameters,docs:{...Z.parameters?.docs,source:{originalSource:`{
  render: () => {
    const scrollContainerRef = useRef<HTMLDivElement | null>(null);
    return <div style={{
      display: 'grid',
      gridTemplateColumns: 'minmax(0, 1fr) 220px',
      gap: 32,
      maxWidth: 960
    }}>
        <div ref={scrollContainerRef}
      // The pane scrolls but contains nothing focusable, so it needs a
      // tab stop and a name for keyboard scrolling (axe:
      // scrollable-region-focusable).
      tabIndex={0} role="region" aria-label="Article content" style={{
        overflowY: 'auto',
        height: 360,
        border: '1px solid rgba(128,128,128,0.3)',
        borderRadius: 8,
        position: 'relative'
      }}>
          <div style={{
          position: 'sticky',
          top: 0,
          height: STICKY_HEADER_HEIGHT,
          boxSizing: 'border-box',
          padding: '0 16px',
          display: 'flex',
          alignItems: 'center',
          background: 'var(--color-surface, #fff)',
          borderBottom: '1px solid rgba(128,128,128,0.3)',
          zIndex: 1
        }}>
            <Badge label={\`Sticky header (\${STICKY_HEADER_HEIGHT}px)\`} />
          </div>
          <div style={{
          padding: '0 16px 16px'
        }}>
            {outlineItems.map(item => <section key={item.id}>
                {/* scroll-margin-top must sit on the element the outline
                    targets — the heading carries the id, so the browser reads
                    it from there, not from a wrapper. */}
                <Heading id={item.id} level={item.level === 2 ? 2 : 3} style={{
              scrollMarginTop: 8
            }}>
                  {item.label}
                </Heading>
                <Text>
                  Scroll the pane. The outline tracks the pane&apos;s scroll
                  position, not the window&apos;s.
                </Text>
                <div style={{
              height: 160
            }} />
              </section>)}
          </div>
        </div>
        <aside style={{
        alignSelf: 'start'
      }}>
          <Outline items={outlineItems} scrollContainerRef={scrollContainerRef} offset={STICKY_HEADER_HEIGHT} />
        </aside>
      </div>;
  }
}`,...Z.parameters?.docs?.source},description:{story:`Scroll-spy scoped to a custom scroll container, under a sticky header.

The content scrolls inside the pane, not the viewport — so the outline would
auto-detect the wrong scroll root and its highlight would never move.
\`scrollContainerRef\` scopes tracking to the pane.

\`offset\` is the height of the sticky header covering the top of that pane.
It moves the activation line *and* the scroll landing together, so clicking
an item parks its heading just below the header instead of hidden underneath
it — and the heading activates at the same line it lands on. The heading's
own \`scroll-margin-top\` adds the breathing room below the header (8px here),
so the two compose: 48 + 8 = 56px.`,...Z.parameters?.docs?.description}}},Q.parameters={...Q.parameters,docs:{...Q.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [status, setStatus] = useState('idle');
    const [flashId, setFlashId] = useState<string | null>(null);
    return <div style={{
      display: 'grid',
      gridTemplateColumns: 'minmax(0, 1fr) 220px',
      gap: 32,
      maxWidth: 960
    }}>
        <article>
          {outlineItems.map(item => <section key={item.id}>
              {/* scroll-margin-top belongs on the heading (it carries the id
                  the outline scrolls to), not on the section wrapper. */}
              <Heading id={item.id} level={item.level === 2 ? 2 : 3} style={{
            scrollMarginTop: 16,
            transition: 'background-color 600ms',
            backgroundColor: flashId === item.id ? 'var(--color-overlay-hover, rgba(128,128,128,0.2))' : 'transparent'
          }}>
                {item.label}
              </Heading>
              <div style={{
            height: 320
          }} />
            </section>)}
        </article>
        <aside style={{
        position: 'sticky',
        top: 24,
        alignSelf: 'start'
      }}>
          <Badge label={status} />
          <Outline items={outlineItems} onNavigateStart={id => {
          setFlashId(null);
          setStatus(\`scrolling to \${id}\`);
        }} onNavigateEnd={id => {
          setFlashId(id);
          setStatus(\`arrived at \${id}\`);
        }} />
        </aside>
      </div>;
  }
}`,...Q.parameters?.docs?.source},description:{story:"Navigate callbacks. `onNavigateStart` fires before the smooth scroll begins\nand `onNavigateEnd` once it settles — here it flashes the heading on arrival.\n\n`onNavigateEnd` fires exactly once for every `onNavigateStart`, including\nwhen the user scrolls away mid-jump, so the flash state can never get stuck.",...Q.parameters?.docs?.description}}},$.parameters={...$.parameters,docs:{...$.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
    width: 240
  }}>
      <button type="button">Focus me, then press Tab</button>
      <Outline items={outlineItems} />
      <button type="button">After the outline</button>
    </div>
}`,...$.parameters?.docs?.source},description:{story:`Keyboard navigation. Each link is in the normal Tab order: Tab moves from
link to link and leaves the outline after the last one, and Enter or Space
activates. There is no arrow, Home, or End movement between links.`,...$.parameters?.docs?.description}}},Me=[`Basic`,`Controlled`,`Compact`,`WithDocument`,`ExtractFromMarkdown`,`ExtractFromHTML`,`DeepNesting`,`ScrollSpy`,`NavigateCallbacks`,`KeyboardNavigation`]})))()}Ne();export{W as Basic,K as Compact,G as Controlled,X as DeepNesting,Y as ExtractFromHTML,J as ExtractFromMarkdown,$ as KeyboardNavigation,Q as NavigateCallbacks,Z as ScrollSpy,q as WithDocument,Me as __namedExportsOrder,je as default};