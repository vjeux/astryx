import{a as e,n as t,r as n}from"./rolldown-runtime-sJBDdmOt.js";import{t as r}from"./react-DlPsW1c0.js";import{t as i}from"./jsx-runtime-MKhVqBIO.js";import{a,r as o}from"./focusOutline.stylex-DWroqGen.js";import{n as s,t as c}from"./useIsomorphicLayoutEffect-CuJHR9MK.js";import{n as l,t as u}from"./useTooltip-Cmp3pcbb.js";var d=n({Tooltip:()=>m});function f(e){return typeof e==`string`||typeof e==`number`}function p(...e){let t=e.filter(Boolean);return t.length>0?t.join(` `):void 0}function m({children:e,anchorRef:t,content:n,placement:r=`above`,alignment:i=`center`,delay:a=200,hideDelay:c=0,focusTrigger:u=`auto`,touchTrigger:d=`auto`,isEnabled:m=!0,onOpenChange:v,hasHoverIndication:y=`auto`,isOpen:b,isDefaultOpen:x}){let S=(0,h.useRef)(null),C=e!=null&&f(e),w=y===!0||y===`auto`&&C,T=(0,h.useCallback)(()=>{v?.(!0)},[v]),E=(0,h.useCallback)(()=>{v?.(!1)},[v]),D=l({placement:r,alignment:i,delay:a,hideDelay:c,focusTrigger:u,touchTrigger:d,isEnabled:m,isOpen:b,isDefaultOpen:x,onShow:T,onHide:E});return s(()=>{if(!t)return;let e=e=>{D.ref(e);let t=e.getAttribute(`aria-describedby`);return e.setAttribute(`aria-describedby`,p(t,D.describedBy)??``),()=>{D.ref(null),t?e.setAttribute(`aria-describedby`,t):e.removeAttribute(`aria-describedby`)}},n=t.current;if(n)return e(n);let r,i=!1;return queueMicrotask(()=>{if(i)return;let n=t.current;n&&(r=e(n))}),()=>{i=!0,r?.()}},[t,D.ref,D.describedBy]),s(()=>{if(t||C)return;let e=S.current;if(!e)return;let n=e.firstElementChild;if(!n)return;D.ref(n);let r=n.getAttribute(`aria-describedby`);return n.setAttribute(`aria-describedby`,p(r,D.describedBy)??``),()=>{D.ref(null),r?n.setAttribute(`aria-describedby`,r):n.removeAttribute(`aria-describedby`)}},[t,C,D.ref,D.describedBy]),t&&e==null?(0,g.jsx)(g.Fragment,{children:D.renderTooltip(n)}):C?(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)(`span`,{ref:D.ref,tabIndex:0,"aria-describedby":D.describedBy,...o.focusVisible(_.wrapperInline,w&&_.hoverIndication),children:e}),D.renderTooltip(n)]}):(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)(`div`,{ref:S,className:`astryxjp7ctv`,children:e}),D.renderTooltip(n)]})}var h,g,_;function v(){return(v=t((()=>{h=e(r(),1),c(),a(),u(),g=i(),_={wrapperInline:{k1xSpc:`astryxt0psk2`,$$css:!0},hoverIndication:{kMnn75:`astryxujl8zx`,kmVMDM:`astryxev0dqp`,k1TLXF:`astryxycaml9`,kcSHmL:`astryxrys4gj`,$$css:!0}},m.displayName=`Tooltip`,m.__docgenInfo={description:`Tooltip component for displaying informative text on hover/focus.

Uses inverted colors (dark background, light text) for high contrast.
Uses a display:contents wrapper so children refs are preserved.
Uses CSS anchor positioning and the Popover API for optimal performance.

@example
\`\`\`
<Tooltip content="Helpful tooltip text" placement="above">
  <Button>Hover me</Button>
</Tooltip>
\`\`\``,methods:[],displayName:`Tooltip`,props:{children:{required:!1,tsType:{name:`ReactNode`},description:`The trigger element(s). Children refs are preserved.
When \`anchorRef\` is provided, children can be omitted and the tooltip
attaches to the external ref element as a sibling.`},anchorRef:{required:!1,tsType:{name:`ReactRefObject`,raw:`React.RefObject<HTMLElement | null>`,elements:[{name:`union`,raw:`HTMLElement | null`,elements:[{name:`HTMLElement`},{name:`null`}]}]},description:`External ref to use as the tooltip anchor.
When provided (and no children), the tooltip attaches to this element
instead of wrapping children. This enables sibling-mode rendering,
useful for lazy-loaded tooltips that shouldn't remount children.`},content:{required:!0,tsType:{name:`ReactNode`},description:`Content to display in the tooltip.
Typically short, non-interactive text.`},placement:{required:!1,tsType:{name:`union`,raw:`'above' | 'below' | 'start' | 'end'`,elements:[{name:`literal`,value:`'above'`},{name:`literal`,value:`'below'`},{name:`literal`,value:`'start'`},{name:`literal`,value:`'end'`}]},description:`Position placement relative to anchor
@default 'above'`,defaultValue:{value:`'above'`,computed:!1}},alignment:{required:!1,tsType:{name:`union`,raw:`'start' | 'center' | 'end'`,elements:[{name:`literal`,value:`'start'`},{name:`literal`,value:`'center'`},{name:`literal`,value:`'end'`}]},description:`Alignment along the placement axis
@default 'center'`,defaultValue:{value:`'center'`,computed:!1}},delay:{required:!1,tsType:{name:`number`},description:`Delay before showing on hover (ms)
@default 200`,defaultValue:{value:`200`,computed:!1}},hideDelay:{required:!1,tsType:{name:`number`},description:`Delay before hiding after mouse/focus leave (ms)
@default 0`,defaultValue:{value:`0`,computed:!1}},focusTrigger:{required:!1,tsType:{name:`union`,raw:`'auto' | 'always' | 'never'`,elements:[{name:`literal`,value:`'auto'`},{name:`literal`,value:`'always'`},{name:`literal`,value:`'never'`}]},description:`When to trigger on focus:
- \`auto\`: focus on the trigger itself, or within a trigger that is
  focusable when focus arrives
- \`always\`: focus on the trigger or anything inside it
- \`never\`: never on focus (for composite widgets)

@default 'auto'`,defaultValue:{value:`'auto'`,computed:!1}},touchTrigger:{required:!1,tsType:{name:`union`,raw:`'auto' | 'tap' | 'none'`,elements:[{name:`literal`,value:`'auto'`},{name:`literal`,value:`'tap'`},{name:`literal`,value:`'none'`}]},description:`What a tap does on a touch pointer, where there is no hover:
- \`auto\`: tap opens the tooltip, unless the trigger performs an action of
  its own (a button, a link, a form control) — that tap belongs to the
  control, and a hint about a control the user just operated is noise
- \`tap\`: tap always opens the tooltip, even on a trigger that acts
- \`none\`: touch never opens the tooltip

@default 'auto'`,defaultValue:{value:`'auto'`,computed:!1}},isEnabled:{required:!1,tsType:{name:`boolean`},description:`Whether the tooltip is enabled.
When false, hover/focus triggers are disabled.

@default true`,defaultValue:{value:`true`,computed:!1}},onOpenChange:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(isOpen: boolean) => void`,signature:{arguments:[{type:{name:`boolean`},name:`isOpen`}],return:{name:`void`}}},description:"Callback fired when tooltip visibility changes.\nCalled with `true` when shown and `false` when hidden."},hasHoverIndication:{required:!1,tsType:{name:`union`,raw:`'auto' | boolean`,elements:[{name:`literal`,value:`'auto'`},{name:`boolean`}]},description:"Whether to show hover indication (dashed underline) on the trigger.\n- `'auto'`: Show for text-only children\n- `true`: Always show\n- `false`: Never show\n\n@default 'auto'",defaultValue:{value:`'auto'`,computed:!1}},isOpen:{required:!1,tsType:{name:`boolean`},description:`Controlled open state. When provided, overrides hover/focus triggers:
- \`true\`: force-show the tooltip (hover/focus hide is suppressed)
- \`false\`: force-hide the tooltip
- \`undefined\`: uncontrolled — hover/focus triggers manage visibility

A controlled tooltip still takes Escape when it is the top-most layer, and
answers by calling \`onOpenChange(false)\` without hiding itself — closing is
your update's decision, exactly as for a controlled Dialog. Ignore the call
and the tip stays, and so does the press: nothing underneath dismisses.

The same holds for focus held closed: focus that would open the tooltip
calls \`onOpenChange(true)\` and shows nothing until your update sets
\`isOpen\`.`},isDefaultOpen:{required:!1,tsType:{name:`boolean`},description:`Whether the tooltip should be shown on mount.
The tooltip is still dismissible — this just opens it initially.`}}}})))()}export{d as n,v as r,m as t};