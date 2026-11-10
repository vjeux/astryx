import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{t}from"./react-DlPsW1c0.js";import{n,t as r}from"./stylex-BSlGVhGe.js";import{n as i,t as a}from"./sharedContext-BVffqy7N.js";import{t as o}from"./jsx-runtime-MKhVqBIO.js";import{n as s}from"./mergeProps-DHkqklmt.js";import{i as c,t as l}from"./themeProps-BVy3p_gf.js";import{n as u,t as d}from"./useMergedRefs-D6axeCXB.js";import{o as f}from"./InternationalizationContext-C5wQA9mp.js";import{n as p,t as m}from"./useComponentTranslator-Dzvlp8mx.js";import{t as h}from"./composeEventHandlers-CceNiKXL.js";import{i as g,n as _,r as v,t as y}from"./usePressFeedback-KAUIHUDJ.js";import{n as b,r as x}from"./DialogContext-Ds2kp7np.js";function S(){return(0,C.use)(w)}var C,w;function T(){return(T=e((()=>{C=t(),i(),w=a(`CommandPaletteContext`,1,null),w.displayName=`CommandPaletteContext`})))()}var E;function D(){return(D=e((()=>{E={"@astryx.commandPalette.list.label":`Commands`}})))()}function O({children:e,label:t,ref:r,xstyle:i,className:a,style:o,...l}){let u=p(),d=t??u(`@astryx.commandPalette.list.label`),f=S(),m=!f||f.selectableItems.length>0;return(0,k.jsx)(`div`,{ref:r,...l,id:f?.listId??l.id,role:m?`listbox`:void 0,"aria-label":m?d:void 0,...s(c(`command-palette-list`),n(A.list,i),a,o),children:e})}var k,A;function j(){return(j=e((()=>{r(),T(),l(),m(),D(),k=o(),f(E),A={list:{kORKVm:`astryx1odjw0f`,kskxy:`astryxmz0i5r`,kmVPX3:`astryx9epnlk`,kUk6DE:`astryx98rzlu`,k1xSpc:`astryx78zum5`,kXwgrk:`astryxdt5ytf`,kOIVth:`astryx1lsbc85`,$$css:!0}},O.displayName=`CommandPaletteList`,O.__docgenInfo={description:`Scrollable results container for the command palette. Standalone composition
renders as a listbox. Inside CommandPalette, listbox semantics are present
only while selectable results exist; empty and pending states retain the same
styled container without exposing an empty interactive popup.

When used inside CommandPalette, automatically gets the correct
ID for aria-controls linking with the input.

@compositionHint CommandPalette renders its own list after its input; render
  this list directly only for a standalone results list. Contains
  CommandPaletteItem and CommandPaletteGroup children.

@example
\`\`\`
<CommandPaletteList>
  <CommandPaletteItem value="home" onSelect={goHome}>
    Go Home
  </CommandPaletteItem>
</CommandPaletteList>
\`\`\``,methods:[],displayName:`CommandPaletteList`,props:{xstyle:{required:!1,tsType:{name:`StyleXStyles`},description:"StyleX styles created via `stylex.create()`. Merged with the component's\nbase styles inside a single `stylex.props()` call for optimal deduplication.\n\n@example\n```\nconst overrides = stylex.create({ root: { marginBottom: 8 } });\n<Component xstyle={overrides.root} />\n```"},ref:{required:!1,tsType:{name:`ReactRef`,raw:`React.Ref<HTMLDivElement>`,elements:[{name:`HTMLDivElement`}]},description:`Ref forwarded to the root element.`},children:{required:!0,tsType:{name:`ReactNode`},description:`Command palette items, groups, empty states, etc.`},label:{required:!1,tsType:{name:`string`},description:`Accessible label for the listbox.
@default 'Commands'`}},composes:[`Omit`]}})))()}function M({value:e,onSelect:t,isHighlighted:r,isSelected:i,isDisabled:a=!1,children:o,ref:l,xstyle:d,className:f,style:p,id:m,onClick:v,onMouseEnter:y,...b}){let C=_(),w=S(),T=x()?.isInline===!0,E=(0,N.useRef)(null),D=(0,N.useRef)(!1),O=(0,N.useMemo)(()=>w?.selectableItems.findIndex(t=>t.value===e)??-1,[w?.selectableItems,e]),k=r??(w?w.highlightedIndex===O&&O>=0:!1),A=i??(w?w.value===e:!1);(0,N.useEffect)(()=>{if(w)return;let e=T&&!D.current;D.current=!0,e||k&&E.current&&E.current.scrollIntoView?.({block:`nearest`})},[w,k,T]);let j=(0,N.useCallback)(()=>{t?.(e),w&&(w.selectItem(e),w.onClose())},[e,t,w]);return(0,P.jsx)(`div`,{ref:u(l,E),...b,id:w&&O>=0?w.getItemId(O):m,role:`option`,"aria-selected":A,"aria-disabled":a||void 0,"data-value":e,...C,onClick:a?void 0:h(v,j),onMouseEnter:y,...s(c(`command-palette-item`,{highlighted:k?`highlighted`:null,selected:A?`selected`:null,disabled:a?`disabled`:null}),n(F.item,!a&&g.backgroundColor,k&&F.itemHighlighted,A&&F.itemSelected,a&&F.itemDisabled,d),f,p),children:o})}var N,P,F;function I(){return(I=e((()=>{N=t(),r(),T(),b(),l(),v(),y(),d(),P=o(),F={item:{k1xSpc:`astryx78zum5`,kGNEyG:`astryx6s0dn4`,kOIVth:`astryx1txdalj`,kzqmXN:`astryxh8yej3`,kg3NbH:`astryxrrkdod`,k8WAf4:`astryxce4md1`,kaIpWk:`astryxx3sua9`,kMv6JI:`astryx9ynric`,kGuDYH:`astryxcr08ib`,kMwMTN:`astryx1tgivj0`,kWkggS:`astryxjbqb8w`,kMzoRj:`astryxc342km`,ksu8eU:`astryxng3xce`,kkrTdU:`astryx1ypdohk astryx16khyan`,k9WMMc:`astryx1yc453h`,kI3sdo:`astryx1a2a7pz`,kfSwDN:`astryx87ps6o`,$$css:!0},itemHighlighted:{kWkggS:`astryx1lmrjuc`,$$css:!0},itemDisabled:{kSiTet:`astryxbyyjgo`,kkrTdU:`astryxt0e3qv`,$$css:!0},itemSelected:{kWkggS:`astryxgcxg3y`,$$css:!0}},M.displayName=`CommandPaletteItem`,M.__docgenInfo={description:`A selectable item in the command palette.
Accepts arbitrary children for full rendering control.

When used inside CommandPalette, context supplies identity, highlight,
selection, and close behavior. Standalone use supports explicit visual
state and pointer activation but does not provide a composite listbox
keyboard model.

@compositionHint Place inside CommandPaletteList or CommandPaletteGroup.

@example
\`\`\`
<CommandPaletteItem value="settings" onSelect={() => navigate('/settings')}>
  Settings
</CommandPaletteItem>
\`\`\``,methods:[],displayName:`CommandPaletteItem`,props:{ref:{required:!1,tsType:{name:`ReactRef`,raw:`React.Ref<HTMLDivElement>`,elements:[{name:`HTMLDivElement`}]},description:`Ref forwarded to the root element.`},value:{required:!0,tsType:{name:`string`},description:`Unique value for identification and selection.`},onSelect:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(value: string) => void`,signature:{arguments:[{type:{name:`string`},name:`value`}],return:{name:`void`}}},description:`Called after this item is activated by pointer.
Keyboard selection inside CommandPalette reports through the root
\`onValueChange\` callback.`},isHighlighted:{required:!1,tsType:{name:`boolean`},description:`Whether this item is visually highlighted (keyboard focus).
When omitted inside CommandPalette, derived from context.
@default false`},isSelected:{required:!1,tsType:{name:`boolean`},description:`Whether this item is currently selected (picker mode).
When omitted inside CommandPalette, derived from the palette value.
@default false`},isDisabled:{required:!1,tsType:{name:`boolean`},description:`Whether the item is disabled.
@default false`,defaultValue:{value:`false`,computed:!1}},children:{required:!0,tsType:{name:`ReactNode`},description:`Non-interactive item content: labels, icons, descriptions, shortcuts, etc.`}},composes:[`Omit`]}})))()}export{w as a,j as i,I as n,T as o,O as r,S as s,M as t};