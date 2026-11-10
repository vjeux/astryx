import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{t}from"./react-DlPsW1c0.js";import{t as n}from"./jsx-runtime-MKhVqBIO.js";import{n as r}from"./mergeProps-DHkqklmt.js";import{i,t as a}from"./themeProps-BVy3p_gf.js";import{t as o}from"./composeEventHandlers-CceNiKXL.js";import{a as s,i as c}from"./focusOutline.stylex-DWroqGen.js";import{n as l,r as u}from"./Icon-BmO5FtDV.js";import{o as d,s as f}from"./useMenuPress-q1UHdjWB.js";import{n as p,t as m}from"./Item-1P46XrPN.js";import{b as h,m as g,p as _,y as v}from"./renderDropdownItems-hNxj8lO0.js";import{c as y,o as b}from"./menuItemRoles-B9F29fZ1.js";import{n as x,t as S}from"./useIndicator-Be-PSbYo.js";function C({label:e,description:t,icon:n,value:a,onChange:s,isDisabled:l=!1,hasCloseOnSelect:d=!1,endContent:p,xstyle:g,className:v,style:b,onClick:S,onPointerMove:C,...D}){let O=h(),k=O?.menuSize??`md`,A=k===`sm`?`sm`:`md`,j=x(`checkbox`),M=(0,w.useCallback)(e=>{l?e.preventDefault():(s?.(!a),d&&O?.closeMenu(),S?.(e))},[l,s,a,d,O,S]),N=(0,w.useCallback)(e=>_(e,l),[l]);return(0,T.jsx)(m,{...D,onMouseDown:o(D.onMouseDown,l?y:void 0),role:`menuitemcheckbox`,"aria-checked":a,tabIndex:-1,onPointerMove:o(N,C),marker:(0,T.jsx)(j,{state:a?`checked`:`unchecked`,size:A,isDisabled:l,xstyle:E.marker}),startContent:n?u(n,{size:`sm`,color:`secondary`}):void 0,label:e,description:t,endContent:p,onClick:M,isDisabled:l,xstyle:[c.focusVisible,E.root,f,l&&E.disabled,g],...r(i(`dropdown-menu-item`,{size:k}),{className:v,style:b})})}var w,T,E;function D(){return(D=e((()=>{w=t(),l(),S(),p(),v(),s(),d(),g(),a(),b(),T=n(),E={root:{kzqmXN:`astryxh8yej3`,kaIpWk:`astryx1ws5lxm`,krdFHd:null,kfmiAY:null,kVL7Gh:null,kT0f0o:null,kIxVMA:null,ksF3WI:null,kqGeR4:null,kYm2EN:null,kMwMTN:`astryx1tgivj0`,kWkggS:`astryxjbqb8w astryx1p2z2pi`,kkrTdU:`astryx1ypdohk astryx16khyan`,kInvED:`astryx1c097ug`,$$css:!0},disabled:{kSiTet:`astryxbyyjgo`,kkrTdU:`astryxt0e3qv`,$$css:!0},marker:{kfzvcC:`astryx47corl`,kayTVb:`astryx1g77sc7 astryxozvky`,keTefX:`astryx1lziwak astryx1jymrmb`,koQZXg:null,km5ZXQ:null,$$css:!0}},C.displayName=`DropdownMenuCheckboxItem`,C.__docgenInfo={description:`A checkable dropdown menu item (role="menuitemcheckbox").

Must be used inside a DropdownMenu. Toggles an independent boolean; for a
one-of-N choice use DropdownMenuRadioGroup + DropdownMenuRadioItem instead.
Consumer click and pointer-move handlers compose after the row's own
activation and hover-focus behavior; disabled activation stops before the
consumer click handler.

@example
\`\`\`
import {DropdownMenuCheckboxItem} from '@astryxdesign/core/DropdownMenu';
<DropdownMenu button={{label: 'View'}}>
  <DropdownMenuCheckboxItem
    label="Show archived"
    value={showArchived}
    onChange={setShowArchived}
  />
</DropdownMenu>
\`\`\``,methods:[],displayName:`DropdownMenuCheckboxItem`,props:{label:{required:!0,tsType:{name:`ReactNode`},description:`Primary label text identifying the item.`},description:{required:!1,tsType:{name:`ReactNode`},description:`Secondary description text displayed below the label.`},icon:{required:!1,tsType:{name:`union`,raw:`ReactNode | IconType`,elements:[{name:`ReactNode`},{name:`ComponentType`,elements:[{name:`SVGProps`,elements:[{name:`SVGSVGElement`}],raw:`SVGProps<SVGSVGElement>`}],raw:`ComponentType<SVGProps<SVGSVGElement>>`}]},description:"Icon to display before the label. Accepts a semantic icon name (see\n`astryx docs icons`) or a rendered node."},value:{required:!0,tsType:{name:`boolean`},description:"Whether the item is checked. Controlled — pair with `onChange`."},onChange:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(checked: boolean) => void`,signature:{arguments:[{type:{name:`boolean`},name:`checked`}],return:{name:`void`}}},description:`Callback fired with the next checked state when the item is toggled.`},isDisabled:{required:!1,tsType:{name:`boolean`},description:`Whether the item is disabled. A disabled item stays in the accessibility
tree as disabled (\`aria-disabled\`), and the arrow keys and typeahead reach
it so keyboard users find it. The pointer highlight skips it, and
activation is blocked.
@default false`,defaultValue:{value:`false`,computed:!1}},hasCloseOnSelect:{required:!1,tsType:{name:`boolean`},description:`Whether toggling the item closes the menu. Checkbox items default to
staying open so several can be toggled in a single session, unlike radio
items which default to closing on selection.
@default false`,defaultValue:{value:`false`,computed:!1}},ref:{required:!1,tsType:{name:`ReactRef`,raw:`React.Ref<HTMLElement>`,elements:[{name:`HTMLElement`}]},description:'Ref forwarded to the row root — the element carrying `role="menuitemcheckbox"`.'},endContent:{required:!1,tsType:{name:`ReactNode`},description:`Content to render after the label and description, such as a keyboard
shortcut hint or badge.`}},composes:[`Omit`]}})))()}export{D as n,C as t};