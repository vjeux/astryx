import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{t}from"./jsx-runtime-MKhVqBIO.js";import{l as n,u as r}from"./themeProps-BVy3p_gf.js";import{o as i}from"./InternationalizationContext-C5wQA9mp.js";import{n as a,t as o}from"./useComponentTranslator-Dzvlp8mx.js";import{n as s,r as c}from"./SizeContext-CD5NK1Xe.js";import{r as l,t as u}from"./useIcon-C4R3CUqb.js";import{n as d,t as f}from"./DropdownMenu-M0We7Ho-.js";var p;function m(){return(m=e((()=>{p={"@astryx.moreMenu.label":`More options`}})))()}function h({items:e,label:t,variant:n=`ghost`,size:i,icon:o,isDisabled:s=!1,placement:u,alignment:d,presentation:p,isMenuOpen:m,onOpenChange:h,xstyle:_,className:v,style:y,"data-testid":b,ref:x}){let S=a(),C=t??S(`@astryx.moreMenu.label`),w=c(i,`md`),T=l(`moreHorizontal`);return(0,g.jsx)(f,{className:v?`${r(`more-menu`)} ${v}`:r(`more-menu`),xstyle:_,style:y,isMenuOpen:m,onOpenChange:h,placement:u,alignment:d,presentation:p,button:{label:C,icon:o??T,variant:n,size:w,isDisabled:s,tooltip:C,isIconOnly:!0,ref:x},items:e,hasChevron:!1,"data-testid":b})}var g;function _(){return(_=e((()=>{u(),d(),s(),n(),o(),m(),g=t(),i(p),h.displayName=`MoreMenu`,h.__docgenInfo={description:`Overflow menu with a three-dot icon trigger.

A convenience wrapper around DropdownMenu with icon-only button defaults.

@example
\`\`\`
<MoreMenu
  items={[
    { label: 'Edit', onClick: handleEdit },
    { label: 'Delete', onClick: handleDelete },
  ]}
/>
\`\`\``,methods:[],displayName:`MoreMenu`,props:{ref:{required:!1,tsType:{name:`ReactRef`,raw:`React.Ref<HTMLButtonElement>`,elements:[{name:`HTMLButtonElement`}]},description:`Ref forwarded to the trigger button`},items:{required:!0,tsType:{name:`Array`,elements:[{name:`union`,raw:`DropdownMenuItemData | DropdownMenuDividerData | DropdownMenuSection`,elements:[{name:`DropdownMenuItemData`},{name:`DropdownMenuDividerData`},{name:`DropdownMenuSection`}]}],raw:`DropdownMenuOption[]`},description:"Menu items \\u2014 data array of actions, dividers, and sections.\nSame type as DropdownMenu's `items` prop."},label:{required:!1,tsType:{name:`string`},description:`Accessible label for the trigger button.
Always used as aria-label (the button is always icon-only).
@default 'More options'`},variant:{required:!1,tsType:{name:`ButtonVariantMap`},description:`Visual style variant of the trigger button.
@default 'ghost'`,defaultValue:{value:`'ghost'`,computed:!1}},size:{required:!1,tsType:{name:`unknown`},description:`Size of the trigger button.
@default 'md'`},icon:{required:!1,tsType:{name:`ReactNode`},description:`Override the default three-dot icon.
@default Three horizontal dots from the icon registry ('moreHorizontal')`},isDisabled:{required:!1,tsType:{name:`boolean`},description:`Whether the menu trigger is disabled.
@default false`,defaultValue:{value:`false`,computed:!1}},placement:{required:!1,tsType:{name:`union`,raw:`'above' | 'below' | 'start' | 'end'`,elements:[{name:`literal`,value:`'above'`},{name:`literal`,value:`'below'`},{name:`literal`,value:`'start'`},{name:`literal`,value:`'end'`}]},description:`Position of the menu relative to the trigger button.
Forwarded to DropdownMenu, which owns the default.
@default 'below'`},alignment:{required:!1,tsType:{name:`union`,raw:`'start' | 'center' | 'end'`,elements:[{name:`literal`,value:`'start'`},{name:`literal`,value:`'center'`},{name:`literal`,value:`'end'`}]},description:`Alignment of the menu along the placement axis.
Forwarded to DropdownMenu, which owns the default.
@default 'start'`},presentation:{required:!1,tsType:{name:`union`,raw:`'popover' | 'bottom-sheet' | 'adaptive'`,elements:[{name:`literal`,value:`'popover'`},{name:`literal`,value:`'bottom-sheet'`},{name:`literal`,value:`'adaptive'`}]},description:`Menu presentation policy, forwarded to DropdownMenu. \`adaptive\` uses a
BottomSheet on compact coarse-pointer viewports and an anchored popover
elsewhere. Omitted, the menu is the anchored popover, and the finger that
opened it follows UIMenu's handoff on every device. \`'popover'\` pins the
pointer behavior on every device.`},isMenuOpen:{required:!1,tsType:{name:`boolean`},description:`Controlled open state for the menu.`},onOpenChange:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(isOpen: boolean) => void`,signature:{arguments:[{type:{name:`boolean`},name:`isOpen`}],return:{name:`void`}}},description:`Callback fired when the menu visibility changes.`},"data-testid":{required:!1,tsType:{name:`string`},description:`Test ID for testing frameworks.`}},composes:[`Pick`]}})))()}export{_ as n,h as t};