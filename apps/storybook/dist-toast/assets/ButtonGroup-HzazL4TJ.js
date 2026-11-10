import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{t}from"./react-DlPsW1c0.js";import{n,t as r}from"./stylex-BSlGVhGe.js";import{t as i}from"./jsx-runtime-MKhVqBIO.js";import{n as a}from"./mergeProps-DHkqklmt.js";import{i as o,t as s}from"./themeProps-BVy3p_gf.js";import{n as c,t as l}from"./useMergedRefs-D6axeCXB.js";import{t as u}from"./composeEventHandlers-CceNiKXL.js";import{r as d,t as f}from"./touchPresentation-Ckv04u4m.js";import{n as p,r as m,t as h}from"./SizeContext-CD5NK1Xe.js";import{f as g,h as _,m as v,p as y}from"./Button-DoGM0DEN.js";import{n as b,t as x}from"./touchHitArea.stylex-BEr3D7is.js";import{n as S,r as C,t as w}from"./useListFocus-nrRBdloE.js";import{n as T,r as E,t as D}from"./useGroupPressTracking-B0I_js7Z.js";function O({children:e,label:t,orientation:r=`horizontal`,size:i,isDisabled:s=!1,elevation:l=`none`,xstyle:f,className:p,style:_,ref:y,"data-testid":x,onKeyDown:S,onFocus:w,...T}){let O=m(i,`md`),{listRef:F,handleKeyDown:I,handleFocus:L}=C({itemSelector:N,boundarySelector:`[role="group"], [popover]`,orientation:r,hasRovingTabIndex:!0,tabStopOrder:P}),R=(0,k.useMemo)(()=>({orientation:r,isDisabled:s}),[r,s]),{isTouch:z}=d(),B=!s&&z,V=(0,k.useRef)(null),{hitAreaRef:H}=E(V,B);return(0,A.jsx)(v,{value:R,children:(0,A.jsx)(h,{value:O,children:(0,A.jsx)(`div`,{ref:c(y,F,V,H),...T,...a(o(`button-group`,{size:O,orientation:r,elevation:l}),n(j.group,B&&j.tracking,B&&b.layerBelowChildren,r===`vertical`&&j.vertical,M[l],f),p,_),role:`group`,"aria-label":t,onKeyDown:u(S,I),onFocus:u(w,L),"aria-disabled":s||void 0,"data-testid":x,children:(0,A.jsx)(g,{value:B?D:null,children:e})})})})}var k,A,j,M,N,P;function F(){return(F=e((()=>{k=t(),r(),p(),w(),y(),T(),f(),x(),_(),s(),l(),A=i(),j={group:{k1xSpc:`astryx3nfvp2`,kGNEyG:`astryx1qjc9v5`,$$css:!0},vertical:{kXwgrk:`astryxdt5ytf`,$$css:!0},tracking:{kVAEAm:`astryx1n2onr6`,$$css:!0}},M={none:{kGVxlE:`astryx1gnnqk1`,$$css:!0},low:{kGVxlE:`astryx1i5ehqx`,kaIpWk:`astryxh6dtrn`,krdFHd:null,kfmiAY:null,kVL7Gh:null,kT0f0o:null,kIxVMA:null,ksF3WI:null,kqGeR4:null,kYm2EN:null,$$css:!0},med:{kGVxlE:`astryx14hfi27`,kaIpWk:`astryxh6dtrn`,krdFHd:null,kfmiAY:null,kVL7Gh:null,kT0f0o:null,kIxVMA:null,ksF3WI:null,kqGeR4:null,kYm2EN:null,$$css:!0},high:{kGVxlE:`astryx1kcpxr7`,kaIpWk:`astryxh6dtrn`,krdFHd:null,kfmiAY:null,kVL7Gh:null,kT0f0o:null,kIxVMA:null,ksF3WI:null,kqGeR4:null,kYm2EN:null,$$css:!0}},N=`button, a[href], [tabindex]`,P=S(N,`[role="group"], [popover]`),O.displayName=`ButtonGroup`,O.__docgenInfo={description:`Groups buttons with connected styling — shared borders, proper border-radius
handling (only on outer edges), and horizontal or vertical orientation.

Children automatically detect the group via context and apply position-aware
styles in pure CSS.

The group is a single tab stop: arrow keys move between members along the
orientation, Home/End jump to the ends, and focus wraps (the APG roving
tabindex technique, via \`useListFocus\`).

Members that render their own layer — a Button with a \`tooltip\`, or a
DropdownMenu — compose correctly, including as the trailing member.

@example
\`\`\`
<ButtonGroup label="Actions">
  <Button label="Copy" />
  <Button label="Cut" />
  <Button label="Paste" />
</ButtonGroup>
\`\`\`

@example
\`\`\`
<ButtonGroup label="Approve action">
  <Button label="Allow once" variant="primary" />
  <DropdownMenu
    button={{label: 'Allow options', variant: 'primary', isIconOnly: true, icon: <Icon icon="chevronDown" />}}
    items={[{label: 'Allow for 30 minutes'}, {label: 'Always allow'}]}
  />
</ButtonGroup>
\`\`\``,methods:[],displayName:`ButtonGroup`,props:{xstyle:{required:!1,tsType:{name:`StyleXStyles`},description:"StyleX styles created via `stylex.create()`. Merged with the component's\nbase styles inside a single `stylex.props()` call for optimal deduplication.\n\n@example\n```\nconst overrides = stylex.create({ root: { marginBottom: 8 } });\n<Component xstyle={overrides.root} />\n```"},ref:{required:!1,tsType:{name:`ReactRef`,raw:`React.Ref<HTMLDivElement>`,elements:[{name:`HTMLDivElement`}]},description:`Ref forwarded to the root element.`},children:{required:!0,tsType:{name:`ReactNode`},description:`Button or IconButton children.`},label:{required:!0,tsType:{name:`string`},description:`Accessible label for the group (used as aria-label).`},orientation:{required:!1,tsType:{name:`union`,raw:`'horizontal' | 'vertical'`,elements:[{name:`literal`,value:`'horizontal'`},{name:`literal`,value:`'vertical'`}]},description:`Orientation of the button group.
@default 'horizontal'`,defaultValue:{value:`'horizontal'`,computed:!1}},size:{required:!1,tsType:{name:`unknown`},description:`Default size for buttons in the group.
Individual buttons can override this with their own \`size\` prop.
@default 'md'`},elevation:{required:!1,tsType:{name:`union`,raw:`'none' | 'low' | 'med' | 'high'`,elements:[{name:`literal`,value:`'none'`},{name:`literal`,value:`'low'`},{name:`literal`,value:`'med'`},{name:`literal`,value:`'high'`}]},description:`Resting elevation for the group. The connected buttons share one surface,
so the shadow sits on the group and lifts them together. Use for a floating
group of actions above content.
@default 'none'`,defaultValue:{value:`'none'`,computed:!1}},isDisabled:{required:!1,tsType:{name:`boolean`},description:`Whether all buttons in the group are disabled.
@default false`,defaultValue:{value:`false`,computed:!1}},"data-testid":{required:!1,tsType:{name:`string`},description:`Test ID for testing frameworks.`}},composes:[`Omit`]}})))()}export{F as n,O as t};