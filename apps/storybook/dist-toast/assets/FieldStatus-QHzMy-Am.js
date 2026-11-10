import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{t}from"./react-DlPsW1c0.js";import{n,t as r}from"./stylex-BSlGVhGe.js";import{b as i,p as a}from"./tokens.stylex-uC3T-IhP.js";import{t as o}from"./jsx-runtime-MKhVqBIO.js";import{n as s}from"./mergeProps-DHkqklmt.js";import{i as c,t as l}from"./themeProps-BVy3p_gf.js";import{_ as u,d,n as f,t as p}from"./useIsHydrating-BD37vgNd.js";import{n as m,t as h}from"./Icon-BmO5FtDV.js";function g(e=`slideDown`){let t=f(),[n]=(0,_.useState)(()=>!t&&v);return n?y[e]:null}var _,v,y;function b(){return(b=e((()=>{_=t(),p(),v=!1,typeof window<`u`&&requestAnimationFrame(()=>{v=!0}),y={slideDown:{kKVMdj:`astryx1os9y4q astryx1aquc0h`,k44tkh:`astryx9uej1z`,kyAemX:`astryx128ha8g`,kWV6AL:`astryxskzprw`,$$css:!0},slideUp:{kKVMdj:`astryxmzgm1l astryx1aquc0h`,k44tkh:`astryx9uej1z`,kyAemX:`astryx128ha8g`,kWV6AL:`astryxskzprw`,$$css:!0},fadeIn:{kKVMdj:`astryxdcu2ud astryx1aquc0h`,k44tkh:`astryx9uej1z`,kyAemX:`astryx128ha8g`,kWV6AL:`astryxskzprw`,$$css:!0},scaleIn:{kKVMdj:`astryx7bk1nq astryx1aquc0h`,k44tkh:`astryx9uej1z`,kyAemX:`astryx128ha8g`,kWV6AL:`astryxskzprw`,$$css:!0}}})))()}function x(e,t){let n=u();(0,S.useEffect)(()=>{e&&n(e,t===`error`?`assertive`:`polite`)},[n,e,t])}var S;function C(){return(C=e((()=>{S=t(),d()})))()}function w({ref:e,type:t,message:r,id:i,variant:a=`attached`,xstyle:o,className:l,style:u,...d}){let f=g(`slideDown`);return x(r,t),(0,T.jsx)(`div`,{ref:e,id:i,...d,...s(c(`field-status`,{type:t,variant:a}),n(D.base,f,a===`attached`?D.attached:D.detached,O[t],o),l,u),children:a===`detached`?(0,T.jsxs)(`span`,{className:`astryx78zum5 astryx1cy8zhl astryxzye2dw`,children:[(0,T.jsx)(`span`,{className:`astryx3nfvp2 astryx6s0dn4 astryx14o5nre astryx2lah0s`,children:(0,T.jsx)(h,{icon:E[t],size:`sm`,color:`inherit`,...c(`field-status-icon`,{type:t})})}),(0,T.jsx)(`span`,{children:r})]}):r})}var T,E,D,O;function k(){return(k=e((()=>{t(),r(),a(),b(),l(),m(),C(),T=o(),E={warning:`warning`,error:`error`,success:`success`},`${i[`--spacing-1-5`]}`,D={base:{kMeerF:`astryxcthrzx`,k3XXqK:`astryx815t2r`,kjBf7l:`astryx3teovq`,kInvED:`astryxvr1dqx`,kMv6JI:`astryx9ynric`,kGuDYH:`astryx141an7d`,kLWn49:`astryx1ltkj2j`,kHjlTd:`astryxj0a0fe`,"--_astryx-text-overflow-wrap":`astryx5ujdhh`,$$css:!0},attached:{keoZOQ:`astryx3dbumh`,kLKAdn:`astryxdgtoc0`,kGO01o:`astryx1wesfrj`,kg3NbH:`astryxf314gf`,kuDDbn:null,kE3dHu:null,kP0aTx:null,kpe85a:null,kVL7Gh:`astryxquck67`,kT0f0o:`astryx14i3lts`,kqGeR4:null,kYm2EN:null,kfzvcC:`astryx47corl`,$$css:!0},detached:{keoZOQ:`astryxcsaf9d`,k8WAf4:`astryxce4md1`,kLKAdn:null,kGO01o:null,kg3NbH:`astryxf314gf`,kuDDbn:null,kE3dHu:null,kP0aTx:null,kpe85a:null,kaIpWk:`astryxh6dtrn`,krdFHd:null,kfmiAY:null,kVL7Gh:null,kT0f0o:null,kIxVMA:null,ksF3WI:null,kqGeR4:null,kYm2EN:null,$$css:!0}},O={warning:{kWkggS:`astryx24i8r5`,kMwMTN:`astryxfy1f8t`,$$css:!0},error:{kWkggS:`astryx1pritpl`,kMwMTN:`astryxl8t7bd`,$$css:!0},success:{kWkggS:`astryxu13z74`,kMwMTN:`astryxvchut`,$$css:!0}},w.displayName=`FieldStatus`,w.__docgenInfo={description:`A status message component for form fields.

The \`detached\` variant renders a leading status icon before the message so
status is not conveyed by color or position alone (WCAG 1.4.1). The icon is
decorative for assistive tech (\`aria-hidden\`): the message text already names
the status in words and is announced through the live region. The \`attached\`
variant keeps its status affordance on the bordered input, so it renders no
icon here to avoid a duplicate. FieldStatus has no \`tooltip\` presentation:
a field control given \`statusVariant="tooltip"\` surfaces the status through
a tooltip on its on-field icon and renders no FieldStatus for it
(\`component:FieldStatus\` FR7).

Screen-reader announcements go through the persistent \`useAnnounce\` live
regions (assertive for errors, polite otherwise) rather than \`role\`/
\`aria-live\` on the rendered element. Live regions that mount together with
their content are not reliably announced by assistive technology, and
FieldStatus is almost always conditionally rendered by its callers. The
message is announced whenever it appears — including on first mount — and
whenever it changes.

@example
\`\`\`
<FieldStatus
  type="error"
  message="This field is required"
/>
<FieldStatus
  type="warning"
  message="This will be visible to others"
  variant="detached"
/>
\`\`\``,methods:[],displayName:`FieldStatus`,props:{xstyle:{required:!1,tsType:{name:`StyleXStyles`},description:"StyleX styles created via `stylex.create()`. Merged with the component's\nbase styles inside a single `stylex.props()` call for optimal deduplication.\n\n@example\n```\nconst overrides = stylex.create({ root: { marginBottom: 8 } });\n<Component xstyle={overrides.root} />\n```"},ref:{required:!1,tsType:{name:`ReactRef`,raw:`React.Ref<HTMLDivElement>`,elements:[{name:`HTMLDivElement`}]},description:`Ref to the rendered message box.`},type:{required:!0,tsType:{name:`union`,raw:`'warning' | 'error' | 'success'`,elements:[{name:`literal`,value:`'warning'`},{name:`literal`,value:`'error'`},{name:`literal`,value:`'success'`}]},description:`The type of status to display.`},message:{required:!0,tsType:{name:`string`},description:`The status message to display.`},variant:{required:!1,tsType:{name:`FieldStatusVariantMap`},description:`Visual variant of the status message.
- 'attached': Overlaps with input above (used in Field)
- 'detached': Floats below with spacing (used in Switch, CheckboxInput)
@default 'attached'`,defaultValue:{value:`'attached'`,computed:!1}}},composes:[`Omit`]}})))()}export{x as i,k as n,C as r,w as t};