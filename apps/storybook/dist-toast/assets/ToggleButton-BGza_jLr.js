import{a as e,n as t}from"./rolldown-runtime-sJBDdmOt.js";import{t as n}from"./react-DlPsW1c0.js";import{n as r,t as i}from"./stylex-BSlGVhGe.js";import{t as a}from"./jsx-runtime-MKhVqBIO.js";import{n as o,r as s}from"./layerScopedContext-CqwdhY_A.js";import{n as c}from"./mergeProps-DHkqklmt.js";import{i as l,r as u,t as d}from"./themeProps-BVy3p_gf.js";import{n as f,t as p}from"./useMergedRefs-D6axeCXB.js";import{r as m,t as h}from"./touchPresentation-Ckv04u4m.js";import{d as g,f as _,n as v,p as y,t as b}from"./Button-DoGM0DEN.js";import{n as x,t as S}from"./touchHitArea.stylex-BEr3D7is.js";import{n as C,r as w,t as T}from"./useGroupPressTracking-B0I_js7Z.js";function E(){return(0,O.use)(A)}function D(e){let{children:t,label:n,orientation:i=`horizontal`,size:a,isDisabled:o=!1,xstyle:s,className:u,style:d,"data-testid":p,type:h,value:g,onChange:v,...y}=e,b=e.type===`multiple`,S=(0,O.useMemo)(()=>{if(b)return new Set(e.value);let t=e.value;return t==null?new Set:new Set([t])},[b,e.value]),C=(0,O.useCallback)(t=>{if(b){let n=e.value,r=e.onChange;n.includes(t)?r(n.filter(e=>e!==t)):r([...n,t])}else{let n=e.value,r=e.onChange;r(n===t?null:t)}},[b,e.value,e.onChange]),{isTouch:T}=m(),E=!o&&T,D=(0,O.useMemo)(()=>({selectedValues:S,toggle:C,size:a,isDisabled:o,tracksPress:E}),[S,C,a,o,E]),M=(0,O.useRef)(null),{hitAreaRef:N}=w(M,E),P=e.ref,F=f(P,M,N);return(0,k.jsx)(A,{value:D,children:(0,k.jsx)(`div`,{...y,ref:F,role:`group`,"aria-label":n,"data-testid":p,...c(l(`toggle-button-group`),r(j.group,E&&j.tracking,E&&x.layerBelowChildren,i===`vertical`&&j.vertical,s),u,d),children:(0,k.jsx)(_,{value:null,children:t})})})}var O,k,A,j;function M(){return(M=t((()=>{O=n(),s(),i(),y(),h(),C(),p(),S(),d(),k=a(),A=o(`ToggleButtonGroupContext`,1,null),A.displayName=`ToggleButtonGroupContext`,j={group:{k1xSpc:`astryx3nfvp2`,kGNEyG:`astryx6s0dn4`,kOIVth:`astryxzye2dw`,$$css:!0},vertical:{kXwgrk:`astryxdt5ytf`,kGNEyG:`astryx1qjc9v5`,$$css:!0},tracking:{kVAEAm:`astryx1n2onr6`,$$css:!0}},D.displayName=`ToggleButtonGroup`,D.__docgenInfo={description:`Groups toggle buttons for exclusive (single) or multi-select behavior.

Uses a discriminated union on \`type\` for type-safe value/onChange:
- \`'single'\` (default): \`value: string | null\`, click active deselects
- \`'multiple'\`: \`value: string[]\`, toggles individual items

@example
\`\`\`
const [view, setView] = useState<string | null>('grid');
<ToggleButtonGroup value={view} onChange={setView} label="View mode">
  <ToggleButton value="list" label="List" icon={<ListIcon />} />
  <ToggleButton value="grid" label="Grid" icon={<GridIcon />} />
</ToggleButtonGroup>
\`\`\``,methods:[],displayName:`ToggleButtonGroup`}})))()}function N({ref:e,label:t,isPressed:n,onPressedChange:r,pressedChangeAction:i,size:a,elevation:o=`none`,isDisabled:s=!1,isLoading:d=!1,icon:f,isIconOnly:p=!1,pressedIcon:m,children:h,tooltip:v,value:y,xstyle:x,className:S,style:C,onClick:w,...D}){let O=E(),k=O&&y!=null?O.selectedValues.has(y):n??!1,A=a??O?.size??`md`,j=(O?.isDisabled??!1)||s,[M,N]=(0,P.useOptimistic)(k),L=M,R=!L,z=L&&m?m:f,B=e=>{if(j)return;let t=e.defaultPrevented;w?.(e),O&&y!=null?(O.toggle(y),e.preventDefault()):(t||!e.defaultPrevented)&&r?.(R,e)},V=i&&!(O&&y!=null)?async()=>{N(R),await i(R)}:void 0,H=h==null?p?void 0:(0,F.jsxs)(`span`,{className:`astryx3nfvp2 astryxdt5ytf astryx6s0dn4 astryxl56j7k`,children:[(0,F.jsx)(`span`,{...{0:{},1:{className:`astryx2mo6ok`}}[!!L|0],children:t}),(0,F.jsx)(`span`,{className:`astryx1lliihq astryx2mo6ok astryxqtp20y astryxb3r6kr astryxlshs6z astryx47corl`,"aria-hidden":`true`,children:t})]}):(0,F.jsxs)(`span`,{className:`astryx3nfvp2 astryxdt5ytf astryx6s0dn4 astryxl56j7k`,children:[(0,F.jsx)(`span`,{...{0:{},1:{className:`astryx2mo6ok`}}[!!L|0],children:h}),(0,F.jsx)(`span`,{className:`astryx1lliihq astryx2mo6ok astryxqtp20y astryxb3r6kr astryxlshs6z astryx47corl`,"aria-hidden":`true`,children:h})]}),U=(0,P.use)(_),W=O==null?U:O.tracksPress===!0&&y!=null?T:null;return(0,F.jsx)(_,{value:W,children:(0,F.jsx)(g,{value:O!=null&&W!=null,children:(0,F.jsx)(b,{ref:e,label:t,variant:`ghost`,size:A,elevation:o,isDisabled:j,isLoading:d,isInterruptible:!0,isIconOnly:p,icon:z,tooltip:v,...c(l(`toggle-button`,{isPressed:L?`true`:`false`,elevation:o}),S),xstyle:[L?I.background:void 0,x],style:C,onClick:B,clickAction:V,...D,"aria-pressed":L,...u({isPressed:L?`true`:`false`,elevation:o}),children:H})})})}var P,F,I;function L(){return(L=t((()=>{P=e(n(),1),v(),y(),C(),M(),d(),F=a(),I={background:{kAXs8y:`astryx1kzknox`,kWkggS:`astryxi89dp7 astryx1jzqe4`,kMwMTN:`astryx1k5gbb1`,$$css:!0}},N.displayName=`ToggleButton`,N.__docgenInfo={description:`A button that toggles between pressed and unpressed states.
Thin wrapper over Button — adds controlled toggle pattern,
icon swap, and font weight emphasis.

Use for toolbar actions, view mode switches, and formatting controls.
For on/off settings, use Switch instead.

Works standalone (with \`isPressed\`/\`onPressedChange\`) or inside
ToggleButtonGroup (which controls selection via \`value\`).

@example
\`\`\`
const [isBold, setIsBold] = useState(false);
<ToggleButton
  label="Bold"
  icon={<BoldIcon />}
  isPressed={isBold}
  onPressedChange={setIsBold}
/>
\`\`\``,methods:[],displayName:`ToggleButton`,props:{xstyle:{required:!1,tsType:{name:`StyleXStyles`},description:"StyleX styles created via `stylex.create()`. Merged with the component's\nbase styles inside a single `stylex.props()` call for optimal deduplication.\n\n@example\n```\nconst overrides = stylex.create({ root: { marginBottom: 8 } });\n<Component xstyle={overrides.root} />\n```"},ref:{required:!1,tsType:{name:`ReactRef`,raw:`React.Ref<HTMLButtonElement>`,elements:[{name:`HTMLButtonElement`}]},description:``},label:{required:!0,tsType:{name:`string`},description:`Accessible label for the button (required).
Used as visible text, or as aria-label for icon-only buttons.`},isPressed:{required:!1,tsType:{name:`boolean`},description:`Whether the button is currently pressed/active.
When used inside ToggleButtonGroup, this is controlled by the group
and this prop is ignored.`},onPressedChange:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(
  isPressed: boolean,
  event: React.MouseEvent<HTMLButtonElement>,
) => void`,signature:{arguments:[{type:{name:`boolean`},name:`isPressed`},{type:{name:`ReactMouseEvent`,raw:`React.MouseEvent<HTMLButtonElement>`,elements:[{name:`HTMLButtonElement`}]},name:`event`}],return:{name:`void`}}},description:`Called when the pressed state should change. Receives the next pressed
state and the originating click event. Call \`event.preventDefault()\` to
opt out of running \`pressedChangeAction\` (e.g. to handle the toggle
entirely in this callback).
When used inside ToggleButtonGroup, this is handled by the group
and this prop is ignored.`},pressedChangeAction:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(isPressed: boolean) => void | Promise<void>`,signature:{arguments:[{type:{name:`boolean`},name:`isPressed`}],return:{name:`union`,raw:`void | Promise<void>`,elements:[{name:`void`},{name:`Promise`,elements:[{name:`void`}],raw:`Promise<void>`}]}}},description:`Action handler for API- or navigation-backed toggles, run through Button's
clickAction transition after onPressedChange unless that callback prevents
default. It also runs without a callback. Omit it for callback-only toggles
that need no Action transition. The button shows a loading spinner while
the action is pending, including synchronous actions that suspend.
Ignored when a value identifies this button as a ToggleButtonGroup member.

@example
\`\`\`
<ToggleButton
  label="Favorite"
  isPressed={isFavorited}
  onPressedChange={setIsFavorited}
  pressedChangeAction={async (newState) => {
    await api.setFavorite(itemId, newState);
  }}
/>
\`\`\``},size:{required:!1,tsType:{name:`unknown`},description:`The size of the toggle button.
When used inside ToggleButtonGroup, defaults to the group's size.
@default 'md'`},elevation:{required:!1,tsType:{name:`union`,raw:`'none' | 'low' | 'med' | 'high'`,elements:[{name:`literal`,value:`'none'`},{name:`literal`,value:`'low'`},{name:`literal`,value:`'med'`},{name:`literal`,value:`'high'`}]},description:`Resting elevation — the shadow depth the button sits at, mirroring
Button's \`elevation\` for floating (FAB-style) toggle buttons.
\`none\` is the default flat button. Applies inside a
ToggleButtonGroup as well — grouped children retain their own
elevation.
@default 'none'`,defaultValue:{value:`'none'`,computed:!1}},isDisabled:{required:!1,tsType:{name:`boolean`},description:`Whether the button is disabled.
When used inside ToggleButtonGroup, a disabled group disables this button
too, but an enabled group does not re-enable a button that disables itself.
@default false`,defaultValue:{value:`false`,computed:!1}},isLoading:{required:!1,tsType:{name:`boolean`},description:`Whether the button is in a loading state.
@default false`,defaultValue:{value:`false`,computed:!1}},icon:{required:!1,tsType:{name:`ReactNode`},description:`Icon element rendered before the label text.`},isIconOnly:{required:!1,tsType:{name:`boolean`},description:`When true, renders as a square icon-only button with \`label\` as aria-label
and an automatic tooltip from the label.
@default false`,defaultValue:{value:`false`,computed:!1}},pressedIcon:{required:!1,tsType:{name:`ReactNode`},description:`Icon element to render when the button is pressed.
Use to swap between outline (unpressed) and filled (pressed) icon styles.
Falls back to \`icon\` if not provided.

To color the pressed icon, pass an already-colored element:
@example
\`\`\`
pressedIcon={<StarIconSolid style={{color: 'var(--color-icon-yellow)'}} />}
\`\`\``},children:{required:!1,tsType:{name:`ReactNode`},description:"Optional visible content. When provided, rendered instead of `label`\nas the visible text."},tooltip:{required:!1,tsType:{name:`string`},description:`Tooltip text shown on hover.
Passed through to Button.`},value:{required:!1,tsType:{name:`string`},description:`Value identifier when used inside ToggleButtonGroup.
Required when used in a group.`}},composes:[`Omit`]}})))()}export{M as i,L as n,D as r,N as t};