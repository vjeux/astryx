import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{t}from"./react-DlPsW1c0.js";import{n,t as r}from"./stylex-BSlGVhGe.js";import{t as i}from"./jsx-runtime-MKhVqBIO.js";import{n as a,r as o}from"./layerScopedContext-CqwdhY_A.js";import{n as s}from"./mergeProps-DHkqklmt.js";import{i as c,r as l,t as u}from"./themeProps-BVy3p_gf.js";import{n as ee,t as d}from"./useMergedRefs-D6axeCXB.js";import{o as f}from"./InternationalizationContext-C5wQA9mp.js";import{n as te,t as p}from"./useComponentTranslator-Dzvlp8mx.js";import{i as m,n as h}from"./sharedMutationObserver-B1G19sqt.js";import{r as g}from"./inputAria-WJ0sD5j3.js";import{i as ne,r as _}from"./usePressFeedback-KAUIHUDJ.js";import{n as v,t as y}from"./useTooltip-Cmp3pcbb.js";import{r as re,t as b}from"./touchPresentation-Ckv04u4m.js";import{i as ie,n as x}from"./press.stylex-BffiAd23.js";import{d as S,u as C}from"./Item-1P46XrPN.js";import{n as w,t as T}from"./Field-CBd_4iOL.js";import{n as E,t as D}from"./fieldParts-BCwX66yz.js";import{i as O,o as k}from"./leaving.stylex-CDjVNtbn.js";import{n as A,t as ae}from"./ListItem-C2dBt6xL.js";import{n as j,t as M}from"./List-Bq_ZN_6g.js";import{i as N,n as P,r as F,t as I}from"./CheckboxInput-CnJ0nBRn.js";var L;function R(){return(R=e((()=>{o(),L=a(`CheckboxListContext`,1,null),L.displayName=`CheckboxListContext`})))()}function z(e,t){return e.compareDocumentPosition(t)&Node.DOCUMENT_POSITION_FOLLOWING?-1:1}function B(){let e=new Map;function t(){let t=[...e.keys()].sort(z),n=[...e.values()].some(e=>e.isChecked)?void 0:t.find(t=>e.get(t)?.isEnabled===!0);for(let e of t)e.required=e===n}return{register(n,r){return e.set(n,r),t(),()=>{e.delete(n),n.required=!1,t()}},observe(e){return m(e,V,t)}}}var V;function H(){return(H=e((()=>{h(),V={childList:!0,subtree:!0}})))()}function U({label:e,isLabelHidden:t=!1,description:r,isOptional:i=!1,isRequired:a=!1,status:o,value:l,onChange:u,changeAction:d,density:f=`balanced`,hasDividers:te=!1,isDisabled:p=!1,disabledMessage:m,isReadOnly:h=!1,children:ne,ref:_,width:y,containerXstyle:re,containerClassName:b,containerStyle:ie,controlXstyle:x,controlClassName:S,controlStyle:C,"aria-labelledby":w,"aria-describedby":D,...O}){let{rest:k,container:A}=E(`CheckboxList`,O,{containerXstyle:re,containerClassName:b,containerStyle:ie}),ae=(0,W.useId)(),j=(0,W.useId)(),N=(0,W.useId)(),P=(0,W.useId)(),F=(0,W.useMemo)(()=>a?B():void 0,[a]),I=(0,W.useCallback)(e=>e!=null&&F!=null?F.observe(e):void 0,[F]),[,R]=(0,W.useTransition)(),z=l!==void 0,[V,H]=(0,W.useOptimistic)(l??K),[U,q]=(0,W.useOptimistic)(K,(e,t)=>e.includes(t)?e:[...e,t]),J=p&&!!m,Y=v({placement:`above`,focusTrigger:`always`,isEnabled:J}),X=(0,W.useCallback)((e,t)=>{u?.(e),d&&R(async()=>{H(e),t!==void 0&&q(t),await d(e)})},[u,d,R,H,q]),Z=(0,W.useMemo)(()=>({value:z?V:void 0,onChange:z?X:void 0,isDisabled:p,hasDisabledMessage:J,disabledMessageID:J?Y.describedBy:void 0,isReadOnly:h,isInvalid:o?.type===`error`,loadingValues:U,requiredGroup:F}),[z,V,X,p,J,Y.describedBy,h,o?.type,U,F]);return(0,G.jsxs)(T,{label:e,isLabelHidden:t,description:r,inputID:ae,labelID:j,isGroupLabel:!0,isOptional:i,isRequired:a,descriptionID:r?N:void 0,isDisabled:p,status:o?{type:o.type,message:o.message,messageID:o.message?P:void 0}:void 0,statusVariant:`detached`,width:y,xstyle:A.xstyle,...s(c(`checkbox-list`),{className:A.className,style:A.style}),children:[(0,G.jsx)(L,{value:Z,children:(0,G.jsx)(`div`,{...k,ref:ee(_,Y.ref,I),...s(n(x),S,C),role:`group`,"aria-disabled":p||k[`aria-disabled`],"aria-labelledby":g(j,w),"aria-describedby":[D,r?N:null,o?.message?P:null,J?Y.describedBy:null].filter(Boolean).join(` `)||void 0,children:(0,G.jsx)(M,{density:f,hasDividers:te,children:ne})})}),J&&Y.renderTooltip(m)]})}var W,G,K;function q(){return(q=e((()=>{W=t(),D(),d(),w(),j(),y(),r(),u(),R(),H(),G=i(),K=[],U.displayName=`CheckboxList`,U.__docgenInfo={description:`A checkbox group component for multi-value selection.

Composes Field (for label, description, status) and List
(for density, dividers) with a context provider for collection mode.

@example
\`\`\`
<CheckboxList
  label="Notifications"
  value={selected}
  onChange={setSelected}>
  <CheckboxListItem label="Email" value="email" />
  <CheckboxListItem label="SMS" value="sms" />
  <CheckboxListItem label="Push" value="push" />
</CheckboxList>
\`\`\``,methods:[],displayName:`CheckboxList`,props:{ref:{required:!1,tsType:{name:`ReactRef`,raw:`React.Ref<HTMLDivElement>`,elements:[{name:`HTMLDivElement`}]},description:'Ref forwarded to the `role="group"` element.'},label:{required:!0,tsType:{name:`string`},description:`Label text for the checkbox group (always rendered for accessibility).`},isLabelHidden:{required:!1,tsType:{name:`boolean`},description:`Whether to visually hide the label (still accessible to screen readers).
@default false`,defaultValue:{value:`false`,computed:!1}},description:{required:!1,tsType:{name:`string`},description:`Description text displayed below the label.`},isOptional:{required:!1,tsType:{name:`boolean`},description:`Whether the group is optional. Shows the optional indicator after the
group label, unless a surrounding \`FormLayout\` already makes fields
optional by default.
@default false`,defaultValue:{value:`false`,computed:!1}},isRequired:{required:!1,tsType:{name:`boolean`},description:`Whether the group needs at least one checked box. Shows the required
indicator after the group label by the same rules as every input field.
While no box is checked, the browser blocks submit and moves focus to
the first box that is neither disabled nor read-only. A disabled or
read-only group requires nothing. Show your own error text through
\`status\`.
Mutually exclusive with isOptional.
@default false`,defaultValue:{value:`false`,computed:!1}},status:{required:!1,tsType:{name:`InputStatus`},description:`Status indicator for the checkbox group.
When set with a message, displays a colored message box below the group.`},value:{required:!1,tsType:{name:`Array`,elements:[{name:`string`}],raw:`string[]`},description:`The currently selected values (collection mode).`},onChange:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(values: string[]) => void`,signature:{arguments:[{type:{name:`Array`,elements:[{name:`string`}],raw:`string[]`},name:`values`}],return:{name:`void`}}},description:`Callback fired when the selected values change (collection mode).`},changeAction:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(values: string[]) => void | Promise<void>`,signature:{arguments:[{type:{name:`Array`,elements:[{name:`string`}],raw:`string[]`},name:`values`}],return:{name:`union`,raw:`void | Promise<void>`,elements:[{name:`void`},{name:`Promise`,elements:[{name:`void`}],raw:`Promise<void>`}]}}},description:`Async action on change. Fires after onChange.
While the returned promise is pending, the toggled item shows a spinner
inside its checkbox and is marked \`aria-busy\`, and re-toggling it is
blocked. Other items remain interactive.`},density:{required:!1,tsType:{name:`union`,raw:`'compact' | 'balanced' | 'spacious'`,elements:[{name:`literal`,value:`'compact'`},{name:`literal`,value:`'balanced'`},{name:`literal`,value:`'spacious'`}]},description:`Spacing density for list items.
@default 'balanced'`,defaultValue:{value:`'balanced'`,computed:!1}},hasDividers:{required:!1,tsType:{name:`boolean`},description:`Whether to show dividers between list items.
@default false`,defaultValue:{value:`false`,computed:!1}},isDisabled:{required:!1,tsType:{name:`boolean`},description:`Whether all checkbox items are disabled.
@default false`,defaultValue:{value:`false`,computed:!1}},disabledMessage:{required:!1,tsType:{name:`string`},description:`Explains why the checkbox group is disabled. Applies to the whole-group
disabled state (\`isDisabled\`), not individual items. When set together with
\`isDisabled\`, the group shows a tooltip with this text on hover and keyboard
focus, and its checkboxes stay focusable (via \`aria-disabled\`) so the reason
is discoverable by keyboard and assistive technology. Toggling stays
blocked.

Use this instead of wrapping a disabled group in \`Tooltip\` — disabled
controls don't emit the pointer events an external tooltip needs.`},isReadOnly:{required:!1,tsType:{name:`boolean`},description:`Whether all checkbox items are read-only.
Displays the current state at full opacity but prevents interaction.
Unlike \`isDisabled\`, read-only checkboxes are not visually dimmed.
@default false`,defaultValue:{value:`false`,computed:!1}},width:{required:!1,tsType:{name:`union`,raw:`number | string`,elements:[{name:`number`},{name:`string`}]},description:"Width of the field. Numbers are treated as pixels, strings are used as-is\n(e.g. `'100%'`). Sizes the whole field (label, control, and status) so they\nstay aligned, unlike setting width via `xstyle`/`className`/`style`."},children:{required:!0,tsType:{name:`ReactNode`},description:`Checkbox list items to render.`}},composes:[`Omit`]}})))()}var J;function Y(){return(Y=e((()=>{J={"@astryx.checkboxList.item.checkbox":`Checkbox`}})))()}function X(e){let t=(0,Q.use)(C),n=(0,Q.use)(L);return(0,$.jsx)(I,{...e,"aria-describedby":g(t??void 0,n?.disabledMessageID),status:n?.isInvalid?se:void 0})}function Z({label:e,"aria-label":t,value:n,description:r,endContent:i,isDisabled:a=!1,isLoading:o=!1,isChecked:s,onCheck:c,ref:u,xstyle:d,className:f,style:p,onClick:m,align:h,...g}){let _=te(),v=(0,Q.use)(L);if(v&&v.value!==void 0&&n===void 0)throw Error("CheckboxListItem requires a `value` prop when used inside CheckboxList with a value array.");let y=typeof e!=`string`,b=(0,Q.useId)(),x=y&&t==null,S=t??(y?_(`@astryx.checkboxList.item.checkbox`):e),C=((0,Q.use)(O)?.density??`balanced`)===`compact`?`sm`:`md`,w=(v?.isDisabled??!1)||a,T=v?.isReadOnly??!1,E=o||n!==void 0&&(v?.loadingValues?.includes(n)??!1),D=!1;v&&v.value!==void 0&&n!==void 0?D=v.value.includes(n):s!==void 0&&(D=s);let k=!T&&(v!=null||c!=null),A=(0,Q.useRef)(null),j=k||m!=null,M=v?.requiredGroup,N=D===!0,P=!w&&!T,I=(0,Q.useCallback)(e=>e!=null&&M!=null?M.register(e,{isChecked:N,isEnabled:P}):void 0,[M,N,P]),R=ee(A,I),{isTouch:z}=re(),B=z&&j&&!w,V=T&&m!=null?e=>{m(e),e.stopPropagation()}:m,H=()=>{w||T||E||(v&&v.value!==void 0&&n!==void 0?v.value.includes(n)?v.onChange?.(v.value.filter(e=>e!==n),n):v.onChange?.([...v.value,n],n):c?.(D!==!0))},U=D===!0&&!w&&!T;return(0,$.jsx)(ae,{...g,...l({selected:U?`selected`:null}),ref:u,label:x?(0,$.jsx)(`span`,{id:b,children:e}):e,description:r,endContent:i,align:h,isDisabled:w,interactiveRef:j?A:void 0,"aria-busy":E||void 0,xstyle:[B&&ie.checkboxRow,B&&ne.pressedAlpha,U&&oe.selected,d],className:f,style:p,startContent:(0,$.jsx)(F,{value:B,children:(0,$.jsx)(X,{ref:R,label:S,"aria-labelledby":x?b:void 0,isLabelHidden:!0,value:D,onChange:()=>H(),onClick:V,isDisabled:w,isReadOnly:T,isLoading:E,size:C})})})}var Q,$,oe,se;function ce(){return(ce=e((()=>{Q=t(),P(),N(),x(),_(),b(),A(),k(),R(),S(),d(),u(),p(),Y(),$=i(),f(J),oe={selected:{kWkggS:`astryxgcxg3y`,$$css:!0}},se={type:`error`},Z.displayName=`CheckboxListItem`,Z.__docgenInfo={description:`A checkbox item for use within CheckboxList (collection mode, when the list
has a \`value\` array) or standalone (inside List, or inside a CheckboxList
without \`value\`).

In collection mode, checked state is derived from the parent's value array.
In standalone mode, uses isChecked/onCheck props directly.

Composes ListItem internally — gets density, dividers, hover/press,
focus, and container alignment for free.

@example
\`\`\`
<CheckboxListItem label="Email" value="email" />
<CheckboxListItem
  label="Accept terms"
  isChecked={accepted}
  onCheck={setAccepted}
/>
\`\`\``,methods:[],displayName:`CheckboxListItem`,props:{xstyle:{required:!1,tsType:{name:`StyleXStyles`},description:"StyleX styles created via `stylex.create()`. Merged with the component's\nbase styles inside a single `stylex.props()` call for optimal deduplication.\n\n@example\n```\nconst overrides = stylex.create({ root: { marginBottom: 8 } });\n<Component xstyle={overrides.root} />\n```"},align:{required:!1,tsType:{name:`union`,raw:`'center' | 'start' | 'first-line'`,elements:[{name:`literal`,value:`'center'`},{name:`literal`,value:`'start'`},{name:`literal`,value:`'first-line'`}]},description:`Vertical alignment of the start and end content against the label,
forwarded to Item. Use \`first-line\` to keep the checkbox level with the
first line of a wrapped label.
@default 'center'`},label:{required:!0,tsType:{name:`ReactNode`},description:`Primary text label for the item.

Accepts a plain string (single-line truncation applied automatically)
or a ReactNode for rich content (no truncation constraints —
child components control their own text behavior). Links and buttons in
the label keep their own behavior; only non-interactive row clicks
delegate to the checkbox.

A string names the checkbox directly. A ReactNode names it from its
visible text through \`aria-labelledby\`; if that text is absent, pass
\`aria-label\`. When visible text is present, an override must retain every
visible word so speech-input users can say what they see.`},"aria-label":{required:!1,tsType:{name:`string`},description:`Plain-text accessible name for the checkbox, replacing the one derived
from \`label\`.

A string \`label\` names the checkbox directly, and a rich (ReactNode)
\`label\` names it from its visible text through \`aria-labelledby\`. Pass
\`aria-label\` when that text is absent. When visible text is present, the
override must retain every visible word so speech-input users can say what
they see. It replaces the derived name and applies to the checkbox control,
not the row.

@example
\`\`\`
<CheckboxListItem
  label={<span>Pro plan <Badge label="Recommended" /></span>}
  aria-label="Pro plan Recommended option"
  value="pro"
/>
\`\`\``},value:{required:!1,tsType:{name:`string`},description:"Identity key for collection mode. Required when the parent CheckboxList\nhas a `value` array: the item throws without it there. An item inside\nList, or inside a CheckboxList without `value`, may omit it."},description:{required:!1,tsType:{name:`ReactNode`},description:`Secondary content below the label. Accepts a plain string or a ReactNode.
Exposed as the checkbox's accessible description through
\`aria-describedby\`, so assistive technology can tell it is the explanation
for this choice rather than unrelated row text.`},endContent:{required:!1,tsType:{name:`ReactNode`},description:`Content rendered after the label area.`},isDisabled:{required:!1,tsType:{name:`boolean`},description:`Whether this individual item is disabled.
@default false`,defaultValue:{value:`false`,computed:!1}},isLoading:{required:!1,tsType:{name:`boolean`},description:`Whether this item is in a loading state. Renders a spinner inside the
checkbox and blocks interaction on this item only.

In collection mode, this is also driven automatically: when the parent
\`CheckboxList\` has a \`changeAction\`, the toggled item shows its
spinner while that promise is pending.
@default false`,defaultValue:{value:`false`,computed:!1}},isChecked:{required:!1,tsType:{name:`union`,raw:`boolean | 'indeterminate'`,elements:[{name:`boolean`},{name:`literal`,value:`'indeterminate'`}]},description:"Direct checked state for standalone mode: an item inside List, or inside\na CheckboxList without `value` (for example, a select-all item). Ignored\nwhen the parent CheckboxList has a `value` array, which then owns the\nchecked state."},onCheck:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(checked: boolean) => void`,signature:{arguments:[{type:{name:`boolean`},name:`checked`}],return:{name:`void`}}},description:"Direct check handler for standalone mode: an item inside List, or inside a\nCheckboxList without `value`. Ignored when the parent CheckboxList has a\n`value` array; that list's `onChange` receives the change instead."},ref:{required:!1,tsType:{name:`ReactRef`,raw:`React.Ref<HTMLLIElement>`,elements:[{name:`HTMLLIElement`}]},description:`Ref forwarded to the root element`}},composes:[`Omit`]}})))()}export{q as i,ce as n,U as r,Z as t};