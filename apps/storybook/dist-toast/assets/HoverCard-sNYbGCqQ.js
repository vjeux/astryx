import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{t}from"./react-DlPsW1c0.js";import{t as n}from"./jsx-runtime-MKhVqBIO.js";import{n as r}from"./isRenderable-C2vVZKI4.js";import{i,n as a}from"./sharedMutationObserver-B1G19sqt.js";import{a as o,r as s}from"./focusOutline.stylex-DWroqGen.js";import{n as c,t as l}from"./useIsomorphicLayoutEffect-CuJHR9MK.js";import{n as u,t as d}from"./useHoverCard-CRINreBn.js";import{a as f,i as p,n as m,r as h,s as g,t as _}from"./popupTrigger-BY83XI94.js";function v(e){if(typeof e==`string`||typeof e==`number`)return!0;if(!Array.isArray(e))return!1;let t=!1;for(let n of e.flat(1/0))if(r(n)){if(typeof n!=`string`&&typeof n!=`number`)return!1;t=!0}return t}function y({children:e,content:t,placement:n=`above`,alignment:r=`center`,delay:a=300,hideDelay:o=200,focusTrigger:l=`auto`,touchTrigger:d=`auto`,isEnabled:h=!0,label:y,onOpenChange:C,hasHoverIndication:w=`auto`,isOpen:T,isDefaultOpen:E,xstyle:D,className:O,style:k}){let A=(0,b.useRef)(null),j=v(e),M=w===!0||w===`auto`&&j,N=(0,b.useCallback)(()=>{C?.(!0)},[C]),P=(0,b.useCallback)(()=>{C?.(!1)},[C]),F=u({placement:n,alignment:r,delay:a,hideDelay:o,focusTrigger:l,touchTrigger:d,isEnabled:h,label:y,isOpen:T,isDefaultOpen:E,onShow:N,onHide:P}),[I,L]=(0,b.useState)(0),R=(0,b.useRef)(null);c(()=>{let e=A.current;if(!(j||e==null))return R.current=e.firstElementChild,i(e,{childList:!0},()=>{let t=e.firstElementChild;t!==R.current&&(R.current=t,L(e=>e+1))})},[j]),c(()=>{if(j)return;let e=A.current;if(!e)return;let t=e.firstElementChild;if(!t)return;if(F.ref(t),y){let e={haspopup:t.getAttribute(`aria-haspopup`),controls:t.getAttribute(`aria-controls`),expanded:t.getAttribute(`aria-expanded`)};return m(t,p(f(t),e,{id:F.id,isOpen:F.isOpen})),()=>{F.ref(null),m(t,p(_,e,{id:null,isOpen:!1}))}}let n=t.getAttribute(`aria-describedby`);return t.setAttribute(`aria-describedby`,g(n,F.describedBy)??``),()=>{F.ref(null),n?t.setAttribute(`aria-describedby`,n):t.removeAttribute(`aria-describedby`)}},[j,y,F.ref,F.id,F.isOpen,F.describedBy,I]);let z=F.renderHoverCard(t,{xstyle:D,className:O,style:k});return j?(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)(`span`,{ref:F.ref,tabIndex:0,...y?p(_,{},{id:F.id,isOpen:F.isOpen}):null,"aria-describedby":y?void 0:F.describedBy,...s.focusVisible(S.wrapperInline,M&&S.hoverIndication),children:e}),z]}):(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)(`span`,{ref:A,className:`astryxjp7ctv`,children:e}),z]})}var b,x,S;function C(){return(C=e((()=>{b=t(),a(),l(),o(),d(),h(),x=n(),S={wrapperInline:{k1xSpc:`astryxt0psk2`,$$css:!0},hoverIndication:{kMnn75:`astryxujl8zx`,kmVMDM:`astryxev0dqp`,k1TLXF:`astryxycaml9`,kcSHmL:`astryx11b3rvo`,$$css:!0}},y.displayName=`HoverCard`,y.__docgenInfo={description:`HoverCard component for displaying interactive content on hover/focus.

Uses a display:contents wrapper so children refs are preserved.
Uses CSS anchor positioning and the Popover API for optimal performance.

@example
\`\`\`
<HoverCard
  content={<ProfileCard user={user} />}
  placement="above">
  <Button>Hover me</Button>
</HoverCard>
\`\`\``,methods:[],displayName:`HoverCard`,props:{children:{required:!0,tsType:{name:`ReactNode`},description:`The trigger element(s). Children refs are preserved.`},content:{required:!0,tsType:{name:`ReactNode`},description:`Content to display in the hover card.`},placement:{required:!1,tsType:{name:`union`,raw:`'above' | 'below' | 'start' | 'end'`,elements:[{name:`literal`,value:`'above'`},{name:`literal`,value:`'below'`},{name:`literal`,value:`'start'`},{name:`literal`,value:`'end'`}]},description:`Position placement relative to anchor
@default 'above'`,defaultValue:{value:`'above'`,computed:!1}},alignment:{required:!1,tsType:{name:`union`,raw:`'start' | 'center' | 'end'`,elements:[{name:`literal`,value:`'start'`},{name:`literal`,value:`'center'`},{name:`literal`,value:`'end'`}]},description:`Alignment along the placement axis
@default 'center'`,defaultValue:{value:`'center'`,computed:!1}},delay:{required:!1,tsType:{name:`number`},description:`Delay before showing on hover (ms)
@default 300`,defaultValue:{value:`300`,computed:!1}},hideDelay:{required:!1,tsType:{name:`number`},description:`Delay before hiding after mouse/focus leave (ms)
@default 200`,defaultValue:{value:`200`,computed:!1}},focusTrigger:{required:!1,tsType:{name:`union`,raw:`'auto' | 'always' | 'never'`,elements:[{name:`literal`,value:`'auto'`},{name:`literal`,value:`'always'`},{name:`literal`,value:`'never'`}]},description:`When to trigger on focus:
- \`auto\`: focus on the trigger itself, or within a trigger that is
  focusable when focus arrives
- \`always\`: focus on the trigger or anything inside it
- \`never\`: never on focus (for composite widgets)

@default 'auto'`,defaultValue:{value:`'auto'`,computed:!1}},touchTrigger:{required:!1,tsType:{name:`union`,raw:`'auto' | 'tap' | 'none'`,elements:[{name:`literal`,value:`'auto'`},{name:`literal`,value:`'tap'`},{name:`literal`,value:`'none'`}]},description:`What a tap does on a touch pointer, where there is no hover:
- \`auto\`: tap opens the card, unless the trigger performs an action of its
  own (a button, a link, a form control) — that tap belongs to the control
- \`tap\`: tap always opens the card, even on a trigger that acts
- \`none\`: touch never opens the card

@default 'auto'`,defaultValue:{value:`'auto'`,computed:!1}},isEnabled:{required:!1,tsType:{name:`boolean`},description:`Whether the hover card is enabled.
When false, hover/focus triggers are disabled.

@default true`,defaultValue:{value:`true`,computed:!1}},label:{required:!1,tsType:{name:`string`},description:`Accessible name for the hover card popup.

When provided, the popup is exposed to assistive technology as a named
\`role="dialog"\`. When omitted, the popup falls back to \`role="group"\` —
a group may validly be unnamed, an unnamed dialog may not.`},onOpenChange:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(isOpen: boolean) => void`,signature:{arguments:[{type:{name:`boolean`},name:`isOpen`}],return:{name:`void`}}},description:"Callback fired when hover card visibility changes.\nCalled with `true` when shown and `false` when hidden."},hasHoverIndication:{required:!1,tsType:{name:`union`,raw:`'auto' | boolean`,elements:[{name:`literal`,value:`'auto'`},{name:`boolean`}]},description:"Whether to show hover indication (dashed underline) on a text trigger.\nAn element trigger keeps its own styling, so this has no effect on it.\n- `'auto'`: Show when children is text: strings and numbers, such as\n  `Edited {when}`, with holes such as `false` and `null` ignored\n- `true`: Show on a text trigger\n- `false`: Never show\n\n@default 'auto'",defaultValue:{value:`'auto'`,computed:!1}},isOpen:{required:!1,tsType:{name:`boolean`},description:`Controlled open state. When provided, overrides the hover trigger:
- \`true\`: force-show the hover card (hover/focus hide is suppressed)
- \`false\`: hide the hover card and keep hover and focus from opening it
- \`undefined\`: uncontrolled — hover/focus triggers manage visibility

A controlled hover card still takes Escape when it is the top-most layer,
and answers by calling \`onOpenChange(false)\` without hiding itself —
closing is your update's decision, exactly as for a controlled Dialog.
Ignore the call and the card stays, and so does the press: nothing
underneath dismisses.`},isDefaultOpen:{required:!1,tsType:{name:`boolean`},description:`Whether the hover card should be shown on mount.
The hover card is still dismissible — this just opens it initially.`}},composes:[`Pick`]}})))()}export{C as n,y as t};