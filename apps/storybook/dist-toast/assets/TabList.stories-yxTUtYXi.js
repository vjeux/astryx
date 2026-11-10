import{a as e,n as t}from"./rolldown-runtime-sJBDdmOt.js";import{t as n}from"./react-DlPsW1c0.js";import{n as r,t as i}from"./stylex-BSlGVhGe.js";import{t as a}from"./jsx-runtime-MKhVqBIO.js";import{n as o}from"./mergeProps-DHkqklmt.js";import{i as s,t as c}from"./themeProps-BVy3p_gf.js";import{n as l,t as u}from"./LayoutHeader-ewlJxePS.js";import{n as ee,t as d}from"./useMergedRefs-D6axeCXB.js";import{n as f,o as te,r as p,s as m}from"./useTheme-CUotWZgR.js";import{t as ne}from"./composeEventHandlers-CceNiKXL.js";import{a as re,r as ie}from"./focusOutline.stylex-DWroqGen.js";import{n as h,r as ae,t as oe}from"./Icon-BmO5FtDV.js";import{n as se,t as g}from"./Button-DoGM0DEN.js";import{n as ce,t as le}from"./Heading-YiIeUtHm.js";import{i as ue,t as de}from"./useListFocus-nrRBdloE.js";import{n as _,r as fe}from"./usePopover-BRtTc03T.js";import{a as pe,n as me}from"./useMenuPress-q1UHdjWB.js";import{n as he,t as v}from"./menuTouchAction.stylex-BraRkFMH.js";import{n as y,t as b}from"./useMenuOverflow-FfwzF77a.js";import{o as x,r as S}from"./menuItemRoles-B9F29fZ1.js";import{r as C,t as ge}from"./Tooltip-CmQs04jO.js";import{n as _e,t as ve}from"./HStack-D5idGciI.js";import{n as ye,t as be}from"./VStack-SWtDePqc.js";import{n as xe,t as Se}from"./StackItem-BBK-dp_K.js";import{a as w,c as Ce,i as we,n as Te,o as Ee,r as De,s as Oe,t as T}from"./Tab-DWNlq4bK.js";import{n as ke,t as Ae}from"./neutralTheme-BXK-s1F0.js";import{c as je,o as Me}from"./iframe-B7UFaprG.js";import{n as Ne,t as Pe}from"./FunnelIcon-DufqMjpU.js";import{n as Fe,t as Ie}from"./PlusIcon-BRwsGuH-.js";function E({ref:e,label:t,options:n,xstyle:i,className:a,style:c,onClick:l,...u}){let d=Ce(),f=(0,D.useId)(),te=(0,D.useRef)(null),p=fe({hasLightDismiss:!0,hasCloseButton:!1,hasAutoFocus:!1,role:`none`,onHide:(0,D.useCallback)(()=>{te.current?.focus()},[])}),{listRef:m,handleKeyDown:re,handleFocus:h,focusFirst:se}=ue({hasRovingTabIndex:!0,itemSelector:S,onEscape:()=>p.hide()}),g=pe({menuRef:m,itemSelector:S,onDismiss:p.hide}),ce=y(m,n.length,p.isOpen),le=(0,D.useCallback)(()=>{p.isOpen?p.hide():(p.show(),requestAnimationFrame(()=>se()))},[p,se]),de=(0,D.useCallback)(e=>{e.key===`Tab`?p.hide():re(e)},[re,p]),_=n.find(e=>e.value===d.value),me=_?.label??t,v=_!=null,b=d.size,x=(0,D.useCallback)(e=>{d.onChange(e),p.hide()},[d,p]),C=ee(p.triggerRef,te,e);return(0,O.jsxs)(O.Fragment,{children:[(0,O.jsxs)(`button`,{...u,ref:C,type:`button`,"aria-haspopup":`menu`,"aria-expanded":p.isOpen,"aria-controls":f,"data-tab-menu":``,tabIndex:v?0:-1,onClick:ne(le,l),...o(s(`tab-menu`),ie.focusVisible(k.trigger,Le[b],v&&k.triggerSelected,we,i),a,c),children:[(0,O.jsx)(`span`,{"aria-hidden":`true`,...r(k.hoverBg,Re[b])}),(0,O.jsxs)(`span`,{className:`astryx1n2onr6 astryxwz0xwf astryx6s0dn4 astryxkh2ocl`,children:[(0,O.jsx)(`span`,{className:`astryx1agbcgv astryxcrlgei`,children:me}),(0,O.jsx)(`span`,{"aria-hidden":`true`,className:`astryx1agbcgv astryxcrlgei astryxlshs6z astryx47corl astryx2mo6ok`,children:me})]}),(0,O.jsx)(`span`,{"aria-hidden":`true`,className:`astryx12xnipv astryx6b6gus astryx2lah0s`,children:(0,O.jsx)(oe,{icon:`chevronDown`,size:`sm`,color:`inherit`,xstyle:[k.chevronIcon,p.isOpen&&k.chevronOpen]})}),v&&(0,O.jsx)(`span`,{...o(s(`tab-indicator`,{selected:`selected`}),{className:`astryx10l6tqk astryxyi47jn astryx1ybfrjj astryx1mcfs9z astryx36qwtl astryxjspbzw astryx47corl astryxnpjden astryxuedmi6 astryxlr8y92 astryxowkcby astryx1hc1fzr`})})]}),p.render((0,O.jsxs)(`div`,{ref:m,id:f,role:`menu`,"aria-label":t,...g.menuProps,onKeyDown:de,onFocus:h,...o(s(`tab-menu-dropdown`),r(k.dropdown,ce?he.scrolls:he.fits)),children:[(0,O.jsx)(`span`,{role:`presentation`,className:`astryx141an7d astryx1ltkj2j astryx2mo6ok astryxv1l7n4 astryxu0wf1k astryxrrkdod`,children:t}),n.map(e=>{let t=d.value===e.value;return(0,O.jsxs)(`div`,{role:`menuitemradio`,tabIndex:-1,"aria-checked":t,onClick:()=>x(e.value),onKeyDown:t=>{(t.key===`Enter`||t.key===` `)&&(t.preventDefault(),x(e.value))},...o(s(`tab-menu-item`),ie.focusVisible(k.menuItem,t&&k.menuItemSelected)),children:[(0,O.jsxs)(`span`,{className:`astryx78zum5 astryx6s0dn4 astryx1txdalj`,children:[e.icon&&ae(e.icon,{size:`sm`,color:`secondary`}),e.label]}),t&&(0,O.jsx)(oe,{icon:`check`,size:`sm`,color:`accent`})]},e.value)})]}),{placement:`below`,alignment:`start`})]})}var D,O,k,Le,Re;function ze(){return(ze=t((()=>{D=e(n(),1),i(),h(),re(),_(),x(),de(),me(),v(),b(),Oe(),De(),d(),c(),O=a(),k={trigger:{kVAEAm:`astryx1n2onr6`,kmuXW:`astryx2lah0s`,k1xSpc:`astryx3nfvp2`,kGNEyG:`astryx6s0dn4`,kjj79g:`astryxl56j7k`,kOIVth:`astryxzye2dw`,khm7nJ:null,k1C7PZ:null,kg3NbH:`astryxrrkdod`,kuDDbn:null,kE3dHu:null,kP0aTx:null,kpe85a:null,kWkggS:`astryxjbqb8w`,kMzoRj:`astryxc342km`,kjGldf:null,k2ei4v:null,kZ1KPB:null,ke9TFa:null,kWqL5O:null,kLoX6v:null,kEafiO:null,kt9PQ7:null,ksu8eU:`astryxng3xce`,kJRH4f:null,kVhnKS:null,k4WBpm:null,k8ry5P:null,kSWEuD:null,kDUl1X:null,kPef9Z:null,kfdmCh:null,kaIpWk:`astryxh6dtrn`,krdFHd:null,kfmiAY:null,kVL7Gh:null,kT0f0o:null,kIxVMA:null,ksF3WI:null,kqGeR4:null,kYm2EN:null,kMv6JI:`astryxjb2p0i`,kGuDYH:`astryxcr08ib`,kLWn49:`astryx1kq96og`,k63SB2:`astryx1sodnla`,kMwMTN:`astryxv1l7n4`,kkrTdU:`astryx1ypdohk astryx16khyan`,kybGjl:`astryx1hl2dhg`,k1TLXF:null,kMnn75:null,kmVMDM:null,kNySMw:null,k1ekBW:`astryxt3l3uh`,kIyJzY:`astryxuedmi6`,kAMwcw:`astryxlr8y92`,$$css:!0},triggerSelected:{kMwMTN:`astryx1tgivj0`,k63SB2:`astryx2mo6ok`,$$css:!0},hoverBg:{kVAEAm:`astryx10l6tqk`,kpwlN0:`astryx10a8y8t`,kogj98:`astryx1bpp3o7`,kzqmXN:`astryxh8yej3`,kaIpWk:`astryxh6dtrn`,kfzvcC:`astryx47corl`,kWkggS:`astryxjbqb8w astryxh1nd0x`,k1ekBW:`astryx15406qy`,kIyJzY:`astryxuedmi6`,kAMwcw:`astryxlr8y92`,$$css:!0},chevronIcon:{k1ekBW:`astryx11xpdln`,kIyJzY:`astryxuedmi6`,kAMwcw:`astryxlr8y92`,$$css:!0},chevronOpen:{k3aq6I:`astryx19jd1h0`,$$css:!0},dropdown:{kfSwDN:`astryx87ps6o`,k1xSpc:`astryx78zum5`,kXwgrk:`astryxdt5ytf`,kOIVth:`astryx1lsbc85`,k8WAf4:`astryxu0wf1k`,kg3NbH:`astryx7a5moj`,$$css:!0},menuItem:{k1xSpc:`astryx78zum5`,kGNEyG:`astryx6s0dn4`,kjj79g:`astryx1qughib`,kOIVth:`astryx1txdalj`,khm7nJ:null,k1C7PZ:null,k8WAf4:`astryxce4md1`,kLKAdn:null,kGO01o:null,kg3NbH:`astryxrrkdod`,kuDDbn:null,kE3dHu:null,kP0aTx:null,kpe85a:null,kaIpWk:`astryxh6dtrn`,krdFHd:null,kfmiAY:null,kVL7Gh:null,kT0f0o:null,kIxVMA:null,ksF3WI:null,kqGeR4:null,kYm2EN:null,kMv6JI:`astryxjb2p0i`,kGuDYH:`astryxcr08ib`,kLWn49:`astryx1kq96og`,k63SB2:`astryx1sodnla`,kMwMTN:`astryx1tgivj0`,kkrTdU:`astryx1ypdohk astryx16khyan`,k1ekBW:`astryx15406qy`,kIyJzY:`astryxuedmi6`,kAMwcw:`astryxlr8y92`,kWkggS:`astryxjbqb8w astryxoevpu5`,$$css:!0},menuItemSelected:{k63SB2:`astryx1e4wzip`,$$css:!0}},Le={sm:{kAzted:`astryx1gdqauq`,$$css:!0},md:{kAzted:`astryx1uogy3y`,$$css:!0},lg:{kAzted:`astryx1xf4nls`,$$css:!0}},Re={sm:{kAzted:`astryx1gdqauq`,$$css:!0},md:{kAzted:`astryx1uogy3y`,$$css:!0},lg:{kAzted:`astryx1xf4nls`,$$css:!0}},E.displayName=`TabMenu`,E.__docgenInfo={description:`Tab menu trigger that opens a dropdown of additional tab options.
Shows the selected option's label as trigger text when an option is active.
Dropdown includes a heading showing the menu's label prop.

@example
\`\`\`
<TabList value={tab} onChange={setTab}>
  <Tab value="overview" label="Overview" />
  <TabMenu label="More" options={[
    { value: "settings", label: "Settings" },
    { value: "history", label: "History" },
  ]} />
</TabList>
\`\`\``,methods:[],displayName:`TabMenu`,props:{ref:{required:!1,tsType:{name:`ReactRef`,raw:`React.Ref<HTMLButtonElement>`,elements:[{name:`HTMLButtonElement`}]},description:``},label:{required:!0,tsType:{name:`string`},description:`Label for the trigger button and dropdown heading.
Displayed as trigger text when no option is selected.`},options:{required:!0,tsType:{name:`Array`,elements:[{name:`TabMenuOption`}],raw:`TabMenuOption[]`},description:`Menu options rendered in the dropdown.`}},composes:[`Omit`]}})))()}function Be({title:e,titleId:t,...n},r){return A.createElement(`svg`,Object.assign({xmlns:`http://www.w3.org/2000/svg`,fill:`none`,viewBox:`0 0 24 24`,strokeWidth:1.5,stroke:`currentColor`,"aria-hidden":`true`,"data-slot":`icon`,ref:r,"aria-labelledby":t},n),e?A.createElement(`title`,{id:t},e):null,A.createElement(`path`,{strokeLinecap:`round`,strokeLinejoin:`round`,d:`M9 4.5v15m6-15v15m-10.875 0h15.75c.621 0 1.125-.504 1.125-1.125V5.625c0-.621-.504-1.125-1.125-1.125H4.125C3.504 4.5 3 5.004 3 5.625v12.75c0 .621.504 1.125 1.125 1.125Z`}))}var A,Ve;function He(){return(He=t((()=>{A=e(n()),Ve=A.forwardRef(Be)})))()}function Ue(e){return{boxSizing:`border-box`,width:480,paddingInline:e,"--container-padding-inline-start":`${e}px`,"--container-padding-inline-end":`${e}px`}}function j(e,t,n){if(Math.abs(t-n)>.5)throw Error(`${e}: expected ${n.toFixed(2)}px, received ${t.toFixed(2)}px`)}var M,N,We,P,F,Ge,Ke,qe,Je,I,Ye,L,R,z,B,V,H,U,W,G,K,q,J,Y,X,Z,Xe,Q,$,Ze;function Qe(){return(Qe=t((()=>{M=n(),Ee(),Te(),ze(),se(),l(),ye(),_e(),xe(),ce(),h(),C(),je(),m(),f(),Ae(),Fe(),Ne(),He(),N=a(),We={title:`Core/TabList`,component:w,tags:[`autodocs`],argTypes:{size:{control:`select`,options:[`sm`,`md`,`lg`],description:`Size of the tab hover targets`}}},P={args:{size:`md`},render:e=>{let[t,n]=(0,M.useState)(`home`);return(0,N.jsxs)(w,{value:t,onChange:n,size:e.size,children:[(0,N.jsx)(T,{value:`home`,label:`Home`}),(0,N.jsx)(T,{value:`projects`,label:`Projects`}),(0,N.jsx)(T,{value:`settings`,label:`Settings`})]})}},F=16,Ge=8,Ke=4,qe=6,Je=640,I=e=>Number.parseFloat(e),Ye=(e,t)=>{let n=document.createElement(`div`);n.style.position=`absolute`,n.style.width=`var(${t})`,e.append(n);let r=I(getComputedStyle(n).width);return n.remove(),r},L={render:()=>{let[e,t]=(0,M.useState)(`home`);return(0,N.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:24},children:[(0,N.jsx)(`div`,{"data-full-bleed-fixture":`hug`,style:Ue(F),children:(0,N.jsxs)(w,{value:e,onChange:t,"aria-label":`Hug full-bleed geometry`,isFullBleed:!0,children:[(0,N.jsx)(T,{value:`home`,label:`Home`}),(0,N.jsx)(T,{value:`projects`,label:`Projects`})]})}),(0,N.jsx)(`div`,{"data-full-bleed-fixture":`fill`,style:Ue(F),children:(0,N.jsxs)(w,{value:e,onChange:t,"aria-label":`Fill full-bleed geometry`,layout:`fill`,isFullBleed:!0,children:[(0,N.jsx)(T,{value:`home`,label:`Home`}),(0,N.jsx)(T,{value:`projects`,label:`Projects`}),(0,N.jsx)(E,{label:`More`,options:[{value:`settings`,label:`Settings`},{value:`billing`,label:`Billing`}]})]})}),(0,N.jsx)(`div`,{"data-full-bleed-fixture":`clamp`,style:Ue(Ge),children:(0,N.jsxs)(w,{value:e,onChange:t,"aria-label":`Clamp full-bleed geometry`,isFullBleed:!0,children:[(0,N.jsx)(T,{value:`home`,label:`Home`}),(0,N.jsx)(T,{value:`projects`,label:`Projects`})]})}),(0,N.jsx)(`div`,{"data-full-bleed-fixture":`noop`,style:{boxSizing:`border-box`,width:480},children:(0,N.jsxs)(w,{value:e,onChange:t,"aria-label":`No-op full-bleed geometry`,isFullBleed:!0,children:[(0,N.jsx)(T,{value:`home`,label:`Home`}),(0,N.jsx)(T,{value:`projects`,label:`Projects`})]})}),(0,N.jsx)(`div`,{"data-full-bleed-fixture":`noop-control`,style:{boxSizing:`border-box`,width:480},children:(0,N.jsxs)(w,{value:e,onChange:t,"aria-label":`No-op control geometry`,children:[(0,N.jsx)(T,{value:`home`,label:`Home`}),(0,N.jsx)(T,{value:`projects`,label:`Projects`})]})}),(0,N.jsx)(`div`,{"data-full-bleed-fixture":`header-dock`,style:{boxSizing:`border-box`,width:Je},children:(0,N.jsx)(u,{hasDivider:!0,padding:Ke,paddingBlockEnd:0,children:(0,N.jsxs)(be,{gap:3,children:[(0,N.jsx)(le,{level:2,maxLines:1,children:`Order #1001`}),(0,N.jsxs)(ve,{vAlign:`center`,children:[(0,N.jsx)(Se,{size:`fill`,children:(0,N.jsxs)(w,{value:e,onChange:t,size:`lg`,"aria-label":`Header dock full-bleed geometry`,isFullBleed:!0,children:[(0,N.jsx)(T,{value:`home`,label:`Details`}),(0,N.jsx)(T,{value:`projects`,label:`Invoices`}),(0,N.jsx)(T,{value:`timeline`,label:`Timeline`}),(0,N.jsx)(E,{label:`More`,options:[{value:`customer`,label:`Customer`},{value:`analysis`,label:`Analysis`}]})]})}),(0,N.jsx)(g,{label:`Show panel`,variant:`ghost`,size:`md`,icon:(0,N.jsx)(Ve,{}),isIconOnly:!0})]})]})})}),(0,N.jsx)(`div`,{"data-full-bleed-fixture":`header-fill`,style:{boxSizing:`border-box`,width:Je},children:(0,N.jsx)(u,{hasDivider:!0,padding:qe,paddingBlockEnd:0,children:(0,N.jsxs)(w,{value:e,onChange:t,size:`lg`,layout:`fill`,"aria-label":`Header fill full-bleed geometry`,isFullBleed:!0,children:[(0,N.jsx)(T,{value:`home`,label:`Details`}),(0,N.jsx)(T,{value:`projects`,label:`Invoices`}),(0,N.jsx)(E,{label:`More`,options:[{value:`customer`,label:`Customer`},{value:`analysis`,label:`Analysis`}]})]})})})]})},play:async({canvasElement:e})=>{await document.fonts.ready,await new Promise(e=>requestAnimationFrame(()=>requestAnimationFrame(()=>e())));let t=e.querySelector(`[data-full-bleed-fixture="hug"]`),n=t?.querySelector(`.astryx-tab-strip`),r=n?.querySelector(`[data-tab-value="home"]`),i=r?.querySelector(`span span`),a=e.querySelector(`[data-full-bleed-fixture="fill"]`),o=a?.querySelector(`.astryx-tab-strip`),s=o?.querySelector(`[data-tab-menu]`),c=e.querySelector(`[data-full-bleed-fixture="clamp"]`),l=c?.querySelector(`.astryx-tab-strip`),u=l?.querySelector(`[data-tab-value="home"]`),ee=u?.querySelector(`span span`),d=e.querySelector(`[data-full-bleed-fixture="noop"] .astryx-tab-strip`),f=e.querySelector(`[data-full-bleed-fixture="noop-control"] .astryx-tab-strip`);if(!t||!n||!r||!i||!a||!o||!s||!c||!l||!u||!ee||!d||!f)throw Error(`Full-bleed geometry fixture did not render as expected`);let te=t.getBoundingClientRect(),p=n.getBoundingClientRect(),m=r.getBoundingClientRect(),ne=s.getBoundingClientRect(),re=a.getBoundingClientRect(),ie=i.getBoundingClientRect(),h=Number.parseFloat(getComputedStyle(r).paddingInlineStart),ae=Number.parseFloat(getComputedStyle(s).paddingInlineEnd),oe=Number.parseFloat(getComputedStyle(n).paddingInlineStart),se=Number.parseFloat(getComputedStyle(o).paddingInlineEnd),g=te.left+F,ce=re.right-F;j(`strip box start`,p.left,te.left),j(`first label start`,ie.left,g),j(`stop padding coupling`,oe,F-h),j(`first stop content start`,m.left+h,g),j(`TabMenu padding coupling`,se,F-ae),j(`last stop content end`,ne.right-ae,ce);let le=c.getBoundingClientRect(),ue=l.getBoundingClientRect(),de=ee.getBoundingClientRect(),_=Number.parseFloat(getComputedStyle(u).paddingInlineStart),fe=Number.parseFloat(getComputedStyle(l).paddingInlineStart);if(j(`clamp strip box start`,ue.left,le.left),j(`clamp strip pad-back`,fe,0),j(`clamp preserves stop inset`,de.left,le.left+_),_<=Ge)throw Error(`clamp fixture is not on the far side: stop padding ${_}px must exceed the ${Ge}px container padding`);let pe=d.getBoundingClientRect(),me=f.getBoundingClientRect();j(`no-op strip start`,pe.left,me.left),j(`no-op strip end`,pe.right,me.right),j(`no-op strip padding`,Number.parseFloat(getComputedStyle(d).paddingInlineStart),Number.parseFloat(getComputedStyle(f).paddingInlineStart));let he=t=>{let n=e.querySelector(`[data-full-bleed-fixture="${t}"]`),r=n?.querySelector(`.astryx-layout-header`),i=r?.firstElementChild,a=n?.querySelector(`.astryx-tab-list`),o=n?.querySelector(`.astryx-tab-strip`),s=n?.querySelector(`[data-tab-value="home"]`),c=s?.querySelector(`.astryx-tab-indicator`);if(!n||!r||!i||!a||!o||!s)throw Error(`${t} header fixture did not render as expected`);if(!c)throw Error(`${t}: selected tab has no indicator to dock`);let l=getComputedStyle(r),u=getComputedStyle(i);return{header:r,headerRect:r.getBoundingClientRect(),dividerWidth:I(l.borderBlockEndWidth),inner:i,innerRect:i.getBoundingClientRect(),padStart:I(u.paddingInlineStart),padEnd:I(u.paddingInlineEnd),padBlockEnd:I(u.paddingBlockEnd),varStart:Ye(i,`--container-padding-inline-start`),varEnd:Ye(i,`--container-padding-inline-end`),varBlockEnd:Ye(i,`--container-padding-block-end`),nav:a,navRect:a.getBoundingClientRect(),strip:o,stripRect:o.getBoundingClientRect(),stripPadStart:I(getComputedStyle(o).paddingInlineStart),stripPadEnd:I(getComputedStyle(o).paddingInlineEnd),firstStop:s,firstStopRect:s.getBoundingClientRect(),firstStopPad:I(getComputedStyle(s).paddingInlineStart),indicatorRect:c.getBoundingClientRect()}},v=(e,t)=>{j(`${e}: published inline-start inset`,t.varStart,t.padStart),j(`${e}: published inline-end inset`,t.varEnd,t.padEnd),j(`${e}: block-end padding docked`,t.padBlockEnd,0),j(`${e}: published block-end inset`,t.varBlockEnd,t.padBlockEnd),j(`${e}: tab row on the header content edge`,t.navRect.bottom,t.innerRect.bottom);let n=t.headerRect.bottom-t.dividerWidth,r=t.indicatorRect.height-t.dividerWidth;j(`${e}: underline docks on the divider`,t.indicatorRect.bottom,t.headerRect.bottom),j(`${e}: underline top relative to the divider rail`,t.indicatorRect.top-n,-r),j(`${e}: strip box start on the header edge`,t.stripRect.left,t.headerRect.left),j(`${e}: strip pad-back start`,t.stripPadStart,Math.max(t.padStart-t.firstStopPad,0)),j(`${e}: first stop content on the start inset`,t.firstStopRect.left+t.firstStopPad,t.headerRect.left+t.padStart)},y=he(`header-dock`);v(`header-dock`,y);let b=y.firstStop.querySelector(`span span`),x=y.nav.parentElement;if(!b||!x)throw Error(`header-dock: tab label or stack slot did not render`);j(`header-dock: first label on the start inset`,b.getBoundingClientRect().left,y.headerRect.left+y.padStart),j(`header-dock: strip end bleeds past its stack slot`,y.navRect.right,x.getBoundingClientRect().right+y.padEnd);let S=he(`header-fill`);v(`header-fill`,S);let C=S.strip.querySelector(`[data-tab-menu]`);if(!C)throw Error(`header-fill: TabMenu did not render`);if(Math.abs(S.padStart-y.padStart)<.5)throw Error(`header-fill must use a different padding step than header-dock, so a stale fallback cannot satisfy both; both measured ${S.padStart.toFixed(2)}px`);j(`header-fill: strip box end on the header edge`,S.stripRect.right,S.headerRect.right);let ge=I(getComputedStyle(C).paddingInlineEnd);j(`header-fill: strip pad-back end`,S.stripPadEnd,Math.max(S.padEnd-ge,0)),j(`header-fill: last stop content on the end inset`,C.getBoundingClientRect().right-ge,S.headerRect.right-S.padEnd)}},R={args:{size:`md`},render:e=>{let[t,n]=(0,M.useState)(`home`);return(0,N.jsxs)(w,{value:t,onChange:n,size:e.size,children:[(0,N.jsx)(T,{value:`home`,label:`Home`}),(0,N.jsx)(T,{value:`projects`,label:`Projects`}),(0,N.jsx)(E,{label:`More`,options:[{value:`analytics`,label:`Analytics`},{value:`reports`,label:`Reports`},{value:`billing`,label:`Billing`}]})]})}},z={args:{size:`md`},render:e=>{let[t,n]=(0,M.useState)(`analytics`);return(0,N.jsxs)(w,{value:t,onChange:n,size:e.size,children:[(0,N.jsx)(T,{value:`home`,label:`Home`}),(0,N.jsx)(T,{value:`projects`,label:`Projects`}),(0,N.jsx)(E,{label:`More`,options:[{value:`analytics`,label:`Analytics`},{value:`reports`,label:`Reports`}]})]})}},B={render:()=>{let[e,t]=(0,M.useState)(`home`);return(0,N.jsx)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:`24px`},children:[`sm`,`md`,`lg`].map(n=>(0,N.jsxs)(`div`,{children:[(0,N.jsxs)(`div`,{style:{marginBottom:`8px`,fontSize:`12px`,color:`var(--color-text-secondary)`,fontFamily:`monospace`},children:[`size=\\"`,n,`\\"`]}),(0,N.jsx)(`div`,{style:{border:`1px dashed #ccc`,display:`inline-flex`},children:(0,N.jsxs)(w,{value:e,onChange:t,size:n,"aria-label":`Tabs (${n})`,children:[(0,N.jsx)(T,{value:`home`,label:`Home`}),(0,N.jsx)(T,{value:`projects`,label:`Projects`}),(0,N.jsx)(T,{value:`settings`,label:`Settings`})]})})]},n))})}},V={args:{size:`md`},render:e=>{let[t,n]=(0,M.useState)(`home`),r=(0,N.jsx)(`svg`,{viewBox:`0 0 16 16`,fill:`currentColor`,width:`100%`,height:`100%`,children:(0,N.jsx)(`path`,{d:`M8.543 2.232a.75.75 0 0 0-1.085 0l-5.25 5.5A.75.75 0 0 0 2.75 9H4v4a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-2h1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1V9h1.25a.75.75 0 0 0 .543-1.268l-5.25-5.5Z`})}),i=(0,N.jsx)(`svg`,{viewBox:`0 0 16 16`,fill:`currentColor`,width:`100%`,height:`100%`,children:(0,N.jsx)(`path`,{fillRule:`evenodd`,d:`M6.955 1.45A.5.5 0 0 1 7.452 1h1.096a.5.5 0 0 1 .497.45l.17 1.699c.484.12.94.312 1.356.562l1.321-.816a.5.5 0 0 1 .67.087l.774.774a.5.5 0 0 1 .087.67l-.816 1.321c.25.416.442.872.562 1.356l1.699.17a.5.5 0 0 1 .45.497v1.096a.5.5 0 0 1-.45.497l-1.699.17c-.12.484-.312.94-.562 1.356l.816 1.321a.5.5 0 0 1-.087.67l-.774.774a.5.5 0 0 1-.67.087l-1.321-.816c-.416.25-.872.442-1.356.562l-.17 1.699a.5.5 0 0 1-.497.45H7.452a.5.5 0 0 1-.497-.45l-.17-1.699a4.973 4.973 0 0 1-1.356-.562l-1.321.816a.5.5 0 0 1-.67-.087l-.774-.774a.5.5 0 0 1-.087-.67l.816-1.321a4.972 4.972 0 0 1-.562-1.356l-1.699-.17A.5.5 0 0 1 1 8.548V7.452a.5.5 0 0 1 .45-.497l1.699-.17c.12-.484.312-.94.562-1.356l-.816-1.321a.5.5 0 0 1 .087-.67l.774-.774a.5.5 0 0 1 .67-.087l1.321.816c.416-.25.872-.442 1.356-.562l.17-1.699ZM8 10.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z`,clipRule:`evenodd`})});return(0,N.jsxs)(w,{value:t,onChange:n,size:e.size,children:[(0,N.jsx)(T,{value:`home`,label:`Home`,icon:r}),(0,N.jsx)(T,{value:`settings`,label:`Settings`,icon:i})]})}},H={args:{size:`md`},render:e=>{let[t,n]=(0,M.useState)(`desktop`),r=(0,N.jsx)(`svg`,{viewBox:`0 0 16 16`,fill:`currentColor`,width:`100%`,height:`100%`,children:(0,N.jsx)(`path`,{d:`M2.5 3A1.5 1.5 0 0 0 1 4.5v5A1.5 1.5 0 0 0 2.5 11h4.75v1.5H5a.75.75 0 0 0 0 1.5h6a.75.75 0 0 0 0-1.5H8.75V11h4.75A1.5 1.5 0 0 0 15 9.5v-5A1.5 1.5 0 0 0 13.5 3h-11Zm0 1.5h11v5h-11v-5Z`})}),i=(0,N.jsx)(`svg`,{viewBox:`0 0 16 16`,fill:`currentColor`,width:`100%`,height:`100%`,children:(0,N.jsx)(`path`,{d:`M5 1.5A1.5 1.5 0 0 0 3.5 3v10A1.5 1.5 0 0 0 5 14.5h6a1.5 1.5 0 0 0 1.5-1.5V3A1.5 1.5 0 0 0 11 1.5H5Zm0 1.5h6v10H5V3Zm2.25 8.5a.75.75 0 0 1 .75-.75h.01a.75.75 0 0 1 0 1.5H8a.75.75 0 0 1-.75-.75Z`})}),a=(0,N.jsx)(`svg`,{viewBox:`0 0 16 16`,fill:`currentColor`,width:`100%`,height:`100%`,children:(0,N.jsx)(`path`,{d:`M8 1.5a6.5 6.5 0 0 0 0 13h.25a1.75 1.75 0 0 0 1.2-3.02.35.35 0 0 1 .23-.6h.97A3.85 3.85 0 0 0 14.5 7.03 5.53 5.53 0 0 0 8.97 1.5H8Zm-3 5a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm2-1.75a1 1 0 1 1 2 0 1 1 0 0 1-2 0ZM4.5 9a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm6-1.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z`})});return(0,N.jsxs)(w,{value:t,onChange:n,size:e.size,children:[(0,N.jsx)(T,{value:`desktop`,label:`Desktop preview`,icon:r,isLabelHidden:!0}),(0,N.jsx)(T,{value:`phone`,label:`Phone preview`,icon:i,isLabelHidden:!0}),(0,N.jsx)(T,{value:`theme`,label:`Theme`,icon:a,isLabelHidden:!0})]})}},U={render:()=>{let[e,t]=(0,M.useState)(`all`);return(0,N.jsxs)(w,{value:e,onChange:t,size:`lg`,hasDivider:!0,children:[(0,N.jsx)(T,{value:`all`,label:`All items`}),(0,N.jsx)(T,{value:`active`,label:`Active`}),(0,N.jsx)(T,{value:`archived`,label:`Archived`}),(0,N.jsxs)(`div`,{style:{marginInlineStart:`auto`,display:`flex`,alignItems:`center`,gap:`4px`},children:[(0,N.jsx)(g,{label:`Filter`,variant:`ghost`,size:`lg`,icon:(0,N.jsx)(Pe,{}),isIconOnly:!0}),(0,N.jsx)(g,{label:`New item`,variant:`primary`,size:`lg`,icon:(0,N.jsx)(Ie,{})})]})]})}},W={name:`Divider Gap (sm / md / lg)`,render:()=>{let[e,t]=(0,M.useState)(`overview`);return(0,N.jsx)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:`32px`},children:[`sm`,`md`,`lg`].map(n=>(0,N.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:`8px`},children:[(0,N.jsxs)(`span`,{style:{font:`600 12px system-ui`,color:`var(--color-text-secondary)`},children:[`size="`,n,`" · hasDivider · matched Button size`]}),(0,N.jsxs)(w,{value:e,onChange:t,size:n,hasDivider:!0,"aria-label":`Tabs (${n})`,children:[(0,N.jsx)(T,{value:`overview`,label:`Overview`}),(0,N.jsx)(T,{value:`activity`,label:`Activity`}),(0,N.jsx)(T,{value:`settings`,label:`Settings`}),(0,N.jsxs)(`div`,{style:{marginInlineStart:`auto`,display:`flex`,alignItems:`center`,gap:`4px`},children:[(0,N.jsx)(g,{label:`Filter`,variant:`ghost`,size:n,icon:(0,N.jsx)(Pe,{}),isIconOnly:!0}),(0,N.jsx)(g,{label:`New item`,variant:`primary`,size:n,icon:(0,N.jsx)(Ie,{})})]})]})]},n))})}},G={render:()=>{let[e,t]=(0,M.useState)(`home`);return(0,N.jsx)(`div`,{style:{width:`500px`},children:(0,N.jsxs)(w,{value:e,onChange:t,layout:`fill`,hasDivider:!0,children:[(0,N.jsx)(T,{value:`home`,label:`Home`}),(0,N.jsx)(T,{value:`projects`,label:`Projects`}),(0,N.jsx)(T,{value:`settings`,label:`Settings`})]})})}},K={render:()=>{let[e,t]=(0,M.useState)(`overview`);return(0,N.jsx)(`div`,{style:{maxWidth:`400px`,border:`1px dashed #ccc`},children:(0,N.jsxs)(w,{value:e,onChange:t,children:[(0,N.jsx)(T,{value:`overview`,label:`Overview`}),(0,N.jsx)(T,{value:`activity`,label:`Activity`}),(0,N.jsx)(T,{value:`members`,label:`Members`}),(0,N.jsx)(T,{value:`settings`,label:`Settings`}),(0,N.jsx)(T,{value:`integrations`,label:`Integrations`}),(0,N.jsx)(T,{value:`billing`,label:`Billing & Plans`}),(0,N.jsx)(T,{value:`security`,label:`Security`}),(0,N.jsx)(T,{value:`notifications`,label:`Notifications`}),(0,N.jsx)(T,{value:`api`,label:`API Keys`})]})})}},q={render:()=>{let[e,t]=(0,M.useState)(`dashboard`);return(0,N.jsx)(`div`,{style:{maxWidth:`350px`},children:(0,N.jsxs)(w,{value:e,onChange:t,hasDivider:!0,size:`lg`,children:[(0,N.jsx)(T,{value:`dashboard`,label:`Dashboard`}),(0,N.jsx)(T,{value:`analytics`,label:`Analytics`}),(0,N.jsx)(T,{value:`reports`,label:`Reports`}),(0,N.jsx)(T,{value:`customers`,label:`Customers`}),(0,N.jsx)(T,{value:`products`,label:`Products`}),(0,N.jsx)(T,{value:`orders`,label:`Orders`})]})})}},J={render:()=>{let[e,t]=(0,M.useState)(`api`);return(0,N.jsxs)(`div`,{style:{display:`grid`,gap:`8px`,maxWidth:`400px`,minWidth:0},children:[(0,N.jsx)(`div`,{style:{border:`1px dashed #ccc`,minWidth:0},children:(0,N.jsxs)(w,{value:e,onChange:t,children:[(0,N.jsx)(T,{value:`overview`,label:`Overview`}),(0,N.jsx)(T,{value:`activity`,label:`Activity`}),(0,N.jsx)(T,{value:`members`,label:`Members`}),(0,N.jsx)(T,{value:`settings`,label:`Settings`}),(0,N.jsx)(T,{value:`integrations`,label:`Integrations`}),(0,N.jsx)(T,{value:`billing`,label:`Billing & Plans`}),(0,N.jsx)(T,{value:`security`,label:`Security`}),(0,N.jsx)(T,{value:`notifications`,label:`Notifications`}),(0,N.jsx)(T,{value:`api`,label:`API Keys`})]})}),(0,N.jsxs)(`div`,{style:{display:`flex`,gap:`4px`},children:[(0,N.jsx)(g,{label:`Select first`,variant:`secondary`,size:`sm`,onClick:()=>t(`overview`)}),(0,N.jsx)(g,{label:`Select last`,variant:`secondary`,size:`sm`,onClick:()=>t(`api`)})]})]})}},Y={render:()=>{let[e,t]=(0,M.useState)(`overview`);return(0,N.jsx)(`div`,{style:{maxWidth:`400px`,border:`1px dashed #ccc`},children:(0,N.jsxs)(w,{value:e,onChange:t,overflow:`visible`,children:[(0,N.jsx)(T,{value:`overview`,label:`Overview`}),(0,N.jsx)(T,{value:`activity`,label:`Activity`}),(0,N.jsx)(T,{value:`members`,label:`Members`}),(0,N.jsx)(T,{value:`settings`,label:`Settings`}),(0,N.jsx)(T,{value:`integrations`,label:`Integrations`}),(0,N.jsx)(T,{value:`billing`,label:`Billing & Plans`}),(0,N.jsx)(T,{value:`security`,label:`Security`}),(0,N.jsx)(T,{value:`notifications`,label:`Notifications`}),(0,N.jsx)(T,{value:`api`,label:`API Keys`})]})})}},X={render:()=>{let[e,t]=(0,M.useState)(`overview`);return(0,N.jsxs)(`div`,{style:{display:`grid`,gap:`12px`,maxWidth:`400px`},children:[(0,N.jsxs)(w,{value:e,onChange:t,role:`tablist`,"aria-label":`Project views`,hasDivider:!0,children:[(0,N.jsx)(T,{value:`overview`,label:`Overview`,id:`tab-overview`,panelId:`panel-overview`}),(0,N.jsx)(T,{value:`activity`,label:`Activity`,id:`tab-activity`,panelId:`panel-activity`}),(0,N.jsx)(T,{value:`members`,label:`Members`,id:`tab-members`,panelId:`panel-members`})]}),Object.entries({overview:`Everything at a glance.`,activity:`What happened recently.`,members:`Who has access.`}).map(([t,n])=>(0,N.jsx)(`div`,{id:`panel-${t}`,role:`tabpanel`,"aria-labelledby":`tab-${t}`,tabIndex:0,hidden:t!==e,children:n},t))]})}},Z={name:`Tab With Help Text`,render:()=>{let[e,t]=(0,M.useState)(`general`),n=(0,M.useRef)(null),r=(0,M.useRef)(null);return(0,N.jsxs)(`div`,{style:{display:`grid`,gap:`12px`,maxWidth:`420px`},children:[(0,N.jsxs)(w,{value:e,onChange:t,role:`tablist`,"aria-label":`Settings`,children:[(0,N.jsx)(T,{ref:n,value:`general`,label:`General`,panelId:`panel-help-general`,endContent:(0,N.jsx)(oe,{icon:`info`,size:`sm`})}),(0,N.jsx)(T,{ref:r,value:`members`,label:`Members`,panelId:`panel-help-members`,endContent:(0,N.jsx)(oe,{icon:`info`,size:`sm`})}),(0,N.jsx)(T,{value:`advanced`,label:`Advanced`,panelId:`panel-help-advanced`})]}),(0,N.jsx)(ge,{content:`Name, language, and time zone for this workspace.`,anchorRef:n}),(0,N.jsx)(ge,{content:`Who can open this workspace, and what they can change.`,anchorRef:r}),Object.entries({general:`Workspace name, language, and time zone.`,members:`People with access to this workspace.`,advanced:`Export, archive, and delete.`}).map(([t,n])=>(0,N.jsx)(`div`,{id:`panel-help-${t}`,role:`tabpanel`,tabIndex:0,hidden:t!==e,children:n},t))]})}},Xe=te({name:`full-width-tab-indicator`,extends:ke,components:{"tab-indicator":{base:{insetInline:`0`}}}}),Q={name:`Full-Width Indicator (Nested Theme)`,render:()=>{let[e,t]=(0,M.useState)(`app`),{mode:n}=p();return(0,N.jsxs)(be,{gap:4,children:[(0,N.jsx)(Me,{theme:Xe,mode:n,children:(0,N.jsxs)(w,{value:e,onChange:t,"aria-label":`Open files`,size:`sm`,hasDivider:!0,children:[(0,N.jsx)(T,{value:`app`,label:`App.tsx`}),(0,N.jsx)(T,{value:`styles`,label:`styles.css`}),(0,N.jsx)(T,{value:`readme`,label:`README.md`})]})}),(0,N.jsxs)(w,{value:e,onChange:t,"aria-label":`Default indicator, for comparison`,size:`sm`,hasDivider:!0,children:[(0,N.jsx)(T,{value:`app`,label:`App.tsx`}),(0,N.jsx)(T,{value:`styles`,label:`styles.css`}),(0,N.jsx)(T,{value:`readme`,label:`README.md`})]})]})}},$={name:`Pressed state`,parameters:{docs:{description:{story:"Press and hold an enabled tab to paint the system's `--color-overlay-pressed` layer on its surface. The disabled tab remains visually unchanged and cannot change selection."}}},render:()=>{let[e,t]=(0,M.useState)(`home`);return(0,N.jsxs)(w,{value:e,onChange:t,children:[(0,N.jsx)(T,{value:`home`,label:`Home`}),(0,N.jsx)(T,{value:`projects`,label:`Projects — press and hold`}),(0,N.jsx)(T,{value:`settings`,label:`Settings`}),(0,N.jsx)(T,{value:`unavailable`,label:`Unavailable — no pressed state`,"aria-disabled":`true`})]})}},P.parameters={...P.parameters,docs:{...P.parameters?.docs,source:{originalSource:`{
  args: {
    size: 'md'
  },
  render: args => {
    const [value, setValue] = useState('home');
    return <TabList value={value} onChange={setValue} size={args.size}>
        <Tab value="home" label="Home" />
        <Tab value="projects" label="Projects" />
        <Tab value="settings" label="Settings" />
      </TabList>;
  }
}`,...P.parameters?.docs?.source}}},L.parameters={...L.parameters,docs:{...L.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [value, setValue] = useState('home');
    return <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 24
    }}>
        <div data-full-bleed-fixture="hug" style={fullBleedFixtureStyle(FULL_BLEED_FIXTURE_PADDING)}>
          <TabList value={value} onChange={setValue} aria-label="Hug full-bleed geometry" isFullBleed>
            <Tab value="home" label="Home" />
            <Tab value="projects" label="Projects" />
          </TabList>
        </div>
        <div data-full-bleed-fixture="fill" style={fullBleedFixtureStyle(FULL_BLEED_FIXTURE_PADDING)}>
          <TabList value={value} onChange={setValue} aria-label="Fill full-bleed geometry" layout="fill" isFullBleed>
            <Tab value="home" label="Home" />
            <Tab value="projects" label="Projects" />
            <TabMenu label="More" options={[{
            value: 'settings',
            label: 'Settings'
          }, {
            value: 'billing',
            label: 'Billing'
          }]} />
          </TabList>
        </div>
        <div data-full-bleed-fixture="clamp" style={fullBleedFixtureStyle(CLAMP_FIXTURE_PADDING)}>
          <TabList value={value} onChange={setValue} aria-label="Clamp full-bleed geometry" isFullBleed>
            <Tab value="home" label="Home" />
            <Tab value="projects" label="Projects" />
          </TabList>
        </div>
        <div data-full-bleed-fixture="noop" style={{
        boxSizing: 'border-box',
        width: 480
      }}>
          <TabList value={value} onChange={setValue} aria-label="No-op full-bleed geometry" isFullBleed>
            <Tab value="home" label="Home" />
            <Tab value="projects" label="Projects" />
          </TabList>
        </div>
        <div data-full-bleed-fixture="noop-control" style={{
        boxSizing: 'border-box',
        width: 480
      }}>
          <TabList value={value} onChange={setValue} aria-label="No-op control geometry">
            <Tab value="home" label="Home" />
            <Tab value="projects" label="Projects" />
          </TabList>
        </div>
        {/* The shipped seam, composed exactly as \`detail-page\` composes it:
            a padded LayoutHeader with its divider, its block-end padding
            docked to 0, and the tab row as the last thing in the header. */}
        <div data-full-bleed-fixture="header-dock" style={{
        boxSizing: 'border-box',
        width: HEADER_FIXTURE_WIDTH
      }}>
          <LayoutHeader hasDivider padding={HEADER_DOCK_PADDING_STEP} paddingBlockEnd={0}>
            <VStack gap={3}>
              <Heading level={2} maxLines={1}>
                Order #1001
              </Heading>
              <HStack vAlign="center">
                <StackItem size="fill">
                  <TabList value={value} onChange={setValue} size="lg" aria-label="Header dock full-bleed geometry" isFullBleed>
                    <Tab value="home" label="Details" />
                    <Tab value="projects" label="Invoices" />
                    <Tab value="timeline" label="Timeline" />
                    <TabMenu label="More" options={[{
                    value: 'customer',
                    label: 'Customer'
                  }, {
                    value: 'analysis',
                    label: 'Analysis'
                  }]} />
                  </TabList>
                </StackItem>
                <Button label="Show panel" variant="ghost" size="md" icon={<ViewColumnsIcon />} isIconOnly />
              </HStack>
            </VStack>
          </LayoutHeader>
        </div>
        {/* Same header wiring with the strip as the header's only child, so
            both inline edges are free to reach the header's box and the last
            stop's far label can be measured against the end inset. */}
        <div data-full-bleed-fixture="header-fill" style={{
        boxSizing: 'border-box',
        width: HEADER_FIXTURE_WIDTH
      }}>
          <LayoutHeader hasDivider padding={HEADER_FILL_PADDING_STEP} paddingBlockEnd={0}>
            <TabList value={value} onChange={setValue} size="lg" layout="fill" aria-label="Header fill full-bleed geometry" isFullBleed>
              <Tab value="home" label="Details" />
              <Tab value="projects" label="Invoices" />
              <TabMenu label="More" options={[{
              value: 'customer',
              label: 'Customer'
            }, {
              value: 'analysis',
              label: 'Analysis'
            }]} />
            </TabList>
          </LayoutHeader>
        </div>
      </div>;
  },
  play: async ({
    canvasElement
  }) => {
    await document.fonts.ready;
    await new Promise<void>(resolve => requestAnimationFrame(() => requestAnimationFrame(() => resolve())));
    const wrapper = canvasElement.querySelector<HTMLElement>('[data-full-bleed-fixture="hug"]');
    const strip = wrapper?.querySelector<HTMLElement>('.astryx-tab-strip');
    const firstStop = strip?.querySelector<HTMLElement>('[data-tab-value="home"]');
    const firstLabel = firstStop?.querySelector<HTMLElement>('span span');
    const fillWrapper = canvasElement.querySelector<HTMLElement>('[data-full-bleed-fixture="fill"]');
    const fillStrip = fillWrapper?.querySelector<HTMLElement>('.astryx-tab-strip');
    const lastStop = fillStrip?.querySelector<HTMLElement>('[data-tab-menu]');
    const clampWrapper = canvasElement.querySelector<HTMLElement>('[data-full-bleed-fixture="clamp"]');
    const clampStrip = clampWrapper?.querySelector<HTMLElement>('.astryx-tab-strip');
    const clampFirstStop = clampStrip?.querySelector<HTMLElement>('[data-tab-value="home"]');
    const clampFirstLabel = clampFirstStop?.querySelector<HTMLElement>('span span');
    const noopStrip = canvasElement.querySelector<HTMLElement>('[data-full-bleed-fixture="noop"] .astryx-tab-strip');
    const noopControlStrip = canvasElement.querySelector<HTMLElement>('[data-full-bleed-fixture="noop-control"] .astryx-tab-strip');
    if (!wrapper || !strip || !firstStop || !firstLabel || !fillWrapper || !fillStrip || !lastStop || !clampWrapper || !clampStrip || !clampFirstStop || !clampFirstLabel || !noopStrip || !noopControlStrip) {
      throw new Error('Full-bleed geometry fixture did not render as expected');
    }
    const wrapperRect = wrapper.getBoundingClientRect();
    const stripRect = strip.getBoundingClientRect();
    const firstStopRect = firstStop.getBoundingClientRect();
    const lastStopRect = lastStop.getBoundingClientRect();
    const fillWrapperRect = fillWrapper.getBoundingClientRect();
    const firstLabelRect = firstLabel.getBoundingClientRect();
    const stopPadding = Number.parseFloat(getComputedStyle(firstStop).paddingInlineStart);
    const lastStopPadding = Number.parseFloat(getComputedStyle(lastStop).paddingInlineEnd);
    const stripPadding = Number.parseFloat(getComputedStyle(strip).paddingInlineStart);
    const stripPaddingEnd = Number.parseFloat(getComputedStyle(fillStrip).paddingInlineEnd);
    const contentInset = wrapperRect.left + FULL_BLEED_FIXTURE_PADDING;
    const contentEnd = fillWrapperRect.right - FULL_BLEED_FIXTURE_PADDING;
    assertGeometry('strip box start', stripRect.left, wrapperRect.left);
    assertGeometry('first label start', firstLabelRect.left, contentInset);
    assertGeometry('stop padding coupling', stripPadding, FULL_BLEED_FIXTURE_PADDING - stopPadding);
    assertGeometry('first stop content start', firstStopRect.left + stopPadding, contentInset);
    assertGeometry('TabMenu padding coupling', stripPaddingEnd, FULL_BLEED_FIXTURE_PADDING - lastStopPadding);
    assertGeometry('last stop content end', lastStopRect.right - lastStopPadding, contentEnd);

    // Far side of the clamp: at 8px container padding the strip still bleeds
    // to the wrapper edge, but the pad-back clamps to zero — the stop's own
    // 12px inset is preserved, never shrunk, so the label sits 4px inside the
    // content inset (matching main's behaviour with hand-written margins).
    const clampWrapperRect = clampWrapper.getBoundingClientRect();
    const clampStripRect = clampStrip.getBoundingClientRect();
    const clampLabelRect = clampFirstLabel.getBoundingClientRect();
    const clampStopPadding = Number.parseFloat(getComputedStyle(clampFirstStop).paddingInlineStart);
    const clampStripPadding = Number.parseFloat(getComputedStyle(clampStrip).paddingInlineStart);
    assertGeometry('clamp strip box start', clampStripRect.left, clampWrapperRect.left);
    assertGeometry('clamp strip pad-back', clampStripPadding, 0);
    assertGeometry('clamp preserves stop inset', clampLabelRect.left, clampWrapperRect.left + clampStopPadding);
    if (clampStopPadding <= CLAMP_FIXTURE_PADDING) {
      throw new Error(\`clamp fixture is not on the far side: stop padding \${clampStopPadding}px must exceed the \${CLAMP_FIXTURE_PADDING}px container padding\`);
    }

    // Outside a padded container the custom properties are unset and the prop
    // is a no-op: the strip's box and padding match a plain TabList exactly.
    const noopStripRect = noopStrip.getBoundingClientRect();
    const noopControlRect = noopControlStrip.getBoundingClientRect();
    assertGeometry('no-op strip start', noopStripRect.left, noopControlRect.left);
    assertGeometry('no-op strip end', noopStripRect.right, noopControlRect.right);
    assertGeometry('no-op strip padding', Number.parseFloat(getComputedStyle(noopStrip).paddingInlineStart), Number.parseFloat(getComputedStyle(noopControlStrip).paddingInlineStart));

    // ── The real seam ──────────────────────────────────────────────────────
    // Everything above runs against hand-written custom properties. What
    // ships is a LayoutHeader publishing them, so measure that instead.

    /** Resolves one \`header-*\` fixture's parts, or throws naming the gap. */
    const headerParts = (name: string) => {
      const fixture = canvasElement.querySelector<HTMLElement>(\`[data-full-bleed-fixture="\${name}"]\`);
      const header = fixture?.querySelector<HTMLElement>('.astryx-layout-header');
      // LayoutHeader's padded inner wrapper: the element that both applies the
      // padding and publishes the container-padding variables.
      const inner = header?.firstElementChild as HTMLElement | null;
      const nav = fixture?.querySelector<HTMLElement>('.astryx-tab-list');
      const strip = fixture?.querySelector<HTMLElement>('.astryx-tab-strip');
      const firstStop = fixture?.querySelector<HTMLElement>('[data-tab-value="home"]');
      const indicator = firstStop?.querySelector<HTMLElement>('.astryx-tab-indicator');
      if (!fixture || !header || !inner || !nav || !strip || !firstStop) {
        throw new Error(\`\${name} header fixture did not render as expected\`);
      }
      if (!indicator) {
        throw new Error(\`\${name}: selected tab has no indicator to dock\`);
      }
      const headerStyle = getComputedStyle(header);
      const innerStyle = getComputedStyle(inner);
      return {
        header,
        headerRect: header.getBoundingClientRect(),
        dividerWidth: px(headerStyle.borderBlockEndWidth),
        inner,
        innerRect: inner.getBoundingClientRect(),
        padStart: px(innerStyle.paddingInlineStart),
        padEnd: px(innerStyle.paddingInlineEnd),
        padBlockEnd: px(innerStyle.paddingBlockEnd),
        varStart: resolvedPx(inner, '--container-padding-inline-start'),
        varEnd: resolvedPx(inner, '--container-padding-inline-end'),
        varBlockEnd: resolvedPx(inner, '--container-padding-block-end'),
        nav,
        navRect: nav.getBoundingClientRect(),
        strip,
        stripRect: strip.getBoundingClientRect(),
        stripPadStart: px(getComputedStyle(strip).paddingInlineStart),
        stripPadEnd: px(getComputedStyle(strip).paddingInlineEnd),
        firstStop,
        firstStopRect: firstStop.getBoundingClientRect(),
        firstStopPad: px(getComputedStyle(firstStop).paddingInlineStart),
        indicatorRect: indicator.getBoundingClientRect()
      };
    };

    /**
     * What both header fixtures owe regardless of their contents: the header
     * publishes the padding it actually applies (the coupling the whole bleed
     * rests on), the tab row is docked on the header's content bottom edge,
     * and the selected underline lands on the divider rather than floating
     * above it. Round 3 measured that underline 7.00px above the divider with
     * the template's hand-written margins; docked it reads -1.00px — the 2px
     * indicator's top edge one pixel above the 1px divider's top edge, its
     * bottom flush with the divider's outer edge.
     */
    const assertHeaderSeam = (name: string, p: ReturnType<typeof headerParts>) => {
      assertGeometry(\`\${name}: published inline-start inset\`, p.varStart, p.padStart);
      assertGeometry(\`\${name}: published inline-end inset\`, p.varEnd, p.padEnd);
      assertGeometry(\`\${name}: block-end padding docked\`, p.padBlockEnd, 0);
      assertGeometry(\`\${name}: published block-end inset\`, p.varBlockEnd, p.padBlockEnd);

      // paddingBlockEnd={0} is the whole reason the tab row can reach the
      // rail: its bottom edge is the header's content bottom edge.
      assertGeometry(\`\${name}: tab row on the header content edge\`, p.navRect.bottom, p.innerRect.bottom);
      const dividerTop = p.headerRect.bottom - p.dividerWidth;
      const overhang = p.indicatorRect.height - p.dividerWidth;
      assertGeometry(\`\${name}: underline docks on the divider\`, p.indicatorRect.bottom, p.headerRect.bottom);
      assertGeometry(\`\${name}: underline top relative to the divider rail\`, p.indicatorRect.top - dividerTop, -overhang);

      // The inline bleed itself, through the published variables: the strip's
      // box clears the header's inline-start padding, and it pads back by the
      // part of that inset a stop's own padding does not already supply.
      assertGeometry(\`\${name}: strip box start on the header edge\`, p.stripRect.left, p.headerRect.left);
      assertGeometry(\`\${name}: strip pad-back start\`, p.stripPadStart, Math.max(p.padStart - p.firstStopPad, 0));
      assertGeometry(\`\${name}: first stop content on the start inset\`, p.firstStopRect.left + p.firstStopPad, p.headerRect.left + p.padStart);
    };

    // Template mirror: tabs share the row with a trailing ghost toggle, so the
    // strip's end edge stops at that toggle. Its bleed is still measurable —
    // the box hangs the published end inset past its own StackItem.
    const dock = headerParts('header-dock');
    assertHeaderSeam('header-dock', dock);
    const dockLabel = dock.firstStop.querySelector<HTMLElement>('span span');
    const dockSlot = dock.nav.parentElement;
    if (!dockLabel || !dockSlot) {
      throw new Error('header-dock: tab label or stack slot did not render');
    }
    assertGeometry('header-dock: first label on the start inset', dockLabel.getBoundingClientRect().left, dock.headerRect.left + dock.padStart);
    assertGeometry('header-dock: strip end bleeds past its stack slot', dock.navRect.right, dockSlot.getBoundingClientRect().right + dock.padEnd);

    // Strip alone in the header, and at a different padding step: both inline
    // edges are free to reach the header's box, and the last stop's content
    // returns to the end inset.
    const fill = headerParts('header-fill');
    assertHeaderSeam('header-fill', fill);
    const fillMenu = fill.strip.querySelector<HTMLElement>('[data-tab-menu]');
    if (!fillMenu) {
      throw new Error('header-fill: TabMenu did not render');
    }
    if (Math.abs(fill.padStart - dock.padStart) < 0.5) {
      throw new Error(\`header-fill must use a different padding step than header-dock, so a stale fallback cannot satisfy both; both measured \${fill.padStart.toFixed(2)}px\`);
    }
    assertGeometry('header-fill: strip box end on the header edge', fill.stripRect.right, fill.headerRect.right);
    const fillMenuPadEnd = px(getComputedStyle(fillMenu).paddingInlineEnd);
    assertGeometry('header-fill: strip pad-back end', fill.stripPadEnd, Math.max(fill.padEnd - fillMenuPadEnd, 0));
    assertGeometry('header-fill: last stop content on the end inset', fillMenu.getBoundingClientRect().right - fillMenuPadEnd, fill.headerRect.right - fill.padEnd);
  }
}`,...L.parameters?.docs?.source},description:{story:`Browser geometry guard for \`isFullBleed\`. The strip must escape the
wrapper's padding while the first label returns to the content inset. The
strip-pad assertion also pins TabList's restated stop-padding token to the
padding the real Tab paints; changing either side breaks this story. The
clamp and no-op fixtures cover the accepted far side: container padding
below a stop's own inset preserves that inset, and outside a padded
container the prop changes nothing.

The first four fixtures hand-write the \`--container-padding-inline-*\`
values on a plain wrapper, which pins TabList's half of the contract but
proves nothing about who publishes those values. The two \`header-*\`
fixtures close that: they compose a real
\`LayoutHeader hasDivider padding paddingBlockEnd={0}\` around a real
\`TabList isFullBleed\` — the shape the \`detail-page\` template ships — so the
whole seam is measured, publisher included.

Enforced by \`.github/scripts/story-play-guard.js\` in the \`pr-a11y\` job —
the play assertions below fail required CI, not just a local canvas.`,...L.parameters?.docs?.description}}},R.parameters={...R.parameters,docs:{...R.parameters?.docs,source:{originalSource:`{
  args: {
    size: 'md'
  },
  render: args => {
    const [value, setValue] = useState('home');
    return <TabList value={value} onChange={setValue} size={args.size}>
        <Tab value="home" label="Home" />
        <Tab value="projects" label="Projects" />
        <TabMenu label="More" options={[{
        value: 'analytics',
        label: 'Analytics'
      }, {
        value: 'reports',
        label: 'Reports'
      }, {
        value: 'billing',
        label: 'Billing'
      }]} />
      </TabList>;
  }
}`,...R.parameters?.docs?.source}}},z.parameters={...z.parameters,docs:{...z.parameters?.docs,source:{originalSource:`{
  args: {
    size: 'md'
  },
  render: args => {
    const [value, setValue] = useState('analytics');
    return <TabList value={value} onChange={setValue} size={args.size}>
        <Tab value="home" label="Home" />
        <Tab value="projects" label="Projects" />
        <TabMenu label="More" options={[{
        value: 'analytics',
        label: 'Analytics'
      }, {
        value: 'reports',
        label: 'Reports'
      }]} />
      </TabList>;
  }
}`,...z.parameters?.docs?.source}}},B.parameters={...B.parameters,docs:{...B.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [value, setValue] = useState('home');
    return <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '24px'
    }}>
        {(['sm', 'md', 'lg'] as const).map(size => <div key={size}>
            <div style={{
          marginBottom: '8px',
          fontSize: '12px',
          color: 'var(--color-text-secondary)',
          fontFamily: 'monospace'
        }}>
              size=\\"{size}\\"
            </div>
            <div style={{
          border: '1px dashed #ccc',
          display: 'inline-flex'
        }}>
              <TabList value={value} onChange={setValue} size={size} aria-label={\`Tabs (\${size})\`}>
                <Tab value="home" label="Home" />
                <Tab value="projects" label="Projects" />
                <Tab value="settings" label="Settings" />
              </TabList>
            </div>
          </div>)}
      </div>;
  }
}`,...B.parameters?.docs?.source}}},V.parameters={...V.parameters,docs:{...V.parameters?.docs,source:{originalSource:`{
  args: {
    size: 'md'
  },
  render: args => {
    const [value, setValue] = useState('home');
    const HomeIcon = <svg viewBox="0 0 16 16" fill="currentColor" width="100%" height="100%">
        <path d="M8.543 2.232a.75.75 0 0 0-1.085 0l-5.25 5.5A.75.75 0 0 0 2.75 9H4v4a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-2h1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1V9h1.25a.75.75 0 0 0 .543-1.268l-5.25-5.5Z" />
      </svg>;
    const CogIcon = <svg viewBox="0 0 16 16" fill="currentColor" width="100%" height="100%">
        <path fillRule="evenodd" d="M6.955 1.45A.5.5 0 0 1 7.452 1h1.096a.5.5 0 0 1 .497.45l.17 1.699c.484.12.94.312 1.356.562l1.321-.816a.5.5 0 0 1 .67.087l.774.774a.5.5 0 0 1 .087.67l-.816 1.321c.25.416.442.872.562 1.356l1.699.17a.5.5 0 0 1 .45.497v1.096a.5.5 0 0 1-.45.497l-1.699.17c-.12.484-.312.94-.562 1.356l.816 1.321a.5.5 0 0 1-.087.67l-.774.774a.5.5 0 0 1-.67.087l-1.321-.816c-.416.25-.872.442-1.356.562l-.17 1.699a.5.5 0 0 1-.497.45H7.452a.5.5 0 0 1-.497-.45l-.17-1.699a4.973 4.973 0 0 1-1.356-.562l-1.321.816a.5.5 0 0 1-.67-.087l-.774-.774a.5.5 0 0 1-.087-.67l.816-1.321a4.972 4.972 0 0 1-.562-1.356l-1.699-.17A.5.5 0 0 1 1 8.548V7.452a.5.5 0 0 1 .45-.497l1.699-.17c.12-.484.312-.94.562-1.356l-.816-1.321a.5.5 0 0 1 .087-.67l.774-.774a.5.5 0 0 1 .67-.087l1.321.816c.416-.25.872-.442 1.356-.562l.17-1.699ZM8 10.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" clipRule="evenodd" />
      </svg>;
    return <TabList value={value} onChange={setValue} size={args.size}>
        <Tab value="home" label="Home" icon={HomeIcon} />
        <Tab value="settings" label="Settings" icon={CogIcon} />
      </TabList>;
  }
}`,...V.parameters?.docs?.source}}},H.parameters={...H.parameters,docs:{...H.parameters?.docs,source:{originalSource:`{
  args: {
    size: 'md'
  },
  render: args => {
    const [value, setValue] = useState('desktop');
    const DesktopIcon = <svg viewBox="0 0 16 16" fill="currentColor" width="100%" height="100%">
        <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v5A1.5 1.5 0 0 0 2.5 11h4.75v1.5H5a.75.75 0 0 0 0 1.5h6a.75.75 0 0 0 0-1.5H8.75V11h4.75A1.5 1.5 0 0 0 15 9.5v-5A1.5 1.5 0 0 0 13.5 3h-11Zm0 1.5h11v5h-11v-5Z" />
      </svg>;
    const PhoneIcon = <svg viewBox="0 0 16 16" fill="currentColor" width="100%" height="100%">
        <path d="M5 1.5A1.5 1.5 0 0 0 3.5 3v10A1.5 1.5 0 0 0 5 14.5h6a1.5 1.5 0 0 0 1.5-1.5V3A1.5 1.5 0 0 0 11 1.5H5Zm0 1.5h6v10H5V3Zm2.25 8.5a.75.75 0 0 1 .75-.75h.01a.75.75 0 0 1 0 1.5H8a.75.75 0 0 1-.75-.75Z" />
      </svg>;
    const ThemeIcon = <svg viewBox="0 0 16 16" fill="currentColor" width="100%" height="100%">
        <path d="M8 1.5a6.5 6.5 0 0 0 0 13h.25a1.75 1.75 0 0 0 1.2-3.02.35.35 0 0 1 .23-.6h.97A3.85 3.85 0 0 0 14.5 7.03 5.53 5.53 0 0 0 8.97 1.5H8Zm-3 5a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm2-1.75a1 1 0 1 1 2 0 1 1 0 0 1-2 0ZM4.5 9a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm6-1.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z" />
      </svg>;
    return <TabList value={value} onChange={setValue} size={args.size}>
        <Tab value="desktop" label="Desktop preview" icon={DesktopIcon} isLabelHidden />
        <Tab value="phone" label="Phone preview" icon={PhoneIcon} isLabelHidden />
        <Tab value="theme" label="Theme" icon={ThemeIcon} isLabelHidden />
      </TabList>;
  }
}`,...H.parameters?.docs?.source}}},U.parameters={...U.parameters,docs:{...U.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [value, setValue] = useState('all');
    return <TabList value={value} onChange={setValue} size="lg" hasDivider>
        <Tab value="all" label="All items" />
        <Tab value="active" label="Active" />
        <Tab value="archived" label="Archived" />
        <div style={{
        marginInlineStart: 'auto',
        display: 'flex',
        alignItems: 'center',
        gap: '4px'
      }}>
          <Button label="Filter" variant="ghost" size="lg" icon={<FunnelIcon />} isIconOnly />
          <Button label="New item" variant="primary" size="lg" icon={<PlusIcon />} />
        </div>
      </TabList>;
  }
}`,...U.parameters?.docs?.source},description:{story:`Demonstrates a common page header pattern: large tab list items on the left
with action buttons on the right, separated by a full-width divider underneath.`,...U.parameters?.docs?.description}}},W.parameters={...W.parameters,docs:{...W.parameters?.docs,source:{originalSource:`{
  name: 'Divider Gap (sm / md / lg)',
  render: () => {
    const [value, setValue] = useState('overview');
    return <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '32px'
    }}>
        {(['sm', 'md', 'lg'] as const).map(size => <div key={size} style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '8px'
      }}>
            <span style={{
          font: '600 12px system-ui',
          color: 'var(--color-text-secondary)'
        }}>
              size=&quot;{size}&quot; · hasDivider · matched Button size
            </span>
            <TabList value={value} onChange={setValue} size={size} hasDivider aria-label={\`Tabs (\${size})\`}>
              <Tab value="overview" label="Overview" />
              <Tab value="activity" label="Activity" />
              <Tab value="settings" label="Settings" />
              <div style={{
            marginInlineStart: 'auto',
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
          }}>
                <Button label="Filter" variant="ghost" size={size} icon={<FunnelIcon />} isIconOnly />
                <Button label="New item" variant="primary" size={size} icon={<PlusIcon />} />
              </div>
            </TabList>
          </div>)}
      </div>;
  }
}`,...W.parameters?.docs?.source}}},G.parameters={...G.parameters,docs:{...G.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [value, setValue] = useState('home');
    return <div style={{
      width: '500px'
    }}>
        <TabList value={value} onChange={setValue} layout="fill" hasDivider>
          <Tab value="home" label="Home" />
          <Tab value="projects" label="Projects" />
          <Tab value="settings" label="Settings" />
        </TabList>
      </div>;
  }
}`,...G.parameters?.docs?.source}}},K.parameters={...K.parameters,docs:{...K.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [value, setValue] = useState('overview');
    return <div style={{
      maxWidth: '400px',
      border: '1px dashed #ccc'
    }}>
        <TabList value={value} onChange={setValue}>
          <Tab value="overview" label="Overview" />
          <Tab value="activity" label="Activity" />
          <Tab value="members" label="Members" />
          <Tab value="settings" label="Settings" />
          <Tab value="integrations" label="Integrations" />
          <Tab value="billing" label="Billing & Plans" />
          <Tab value="security" label="Security" />
          <Tab value="notifications" label="Notifications" />
          <Tab value="api" label="API Keys" />
        </TabList>
      </div>;
  }
}`,...K.parameters?.docs?.source},description:{story:`A strip narrower than its tabs scrolls. Every tab stays a tab — nothing is
hidden behind a menu — and the edges fade to show there is more. Pointers
that can hover also get arrow affordances; keyboard users reach every tab
with the arrow keys, which scrolls the focused tab into view.`,...K.parameters?.docs?.description}}},q.parameters={...q.parameters,docs:{...q.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [value, setValue] = useState('dashboard');
    return <div style={{
      maxWidth: '350px'
    }}>
        <TabList value={value} onChange={setValue} hasDivider size="lg">
          <Tab value="dashboard" label="Dashboard" />
          <Tab value="analytics" label="Analytics" />
          <Tab value="reports" label="Reports" />
          <Tab value="customers" label="Customers" />
          <Tab value="products" label="Products" />
          <Tab value="orders" label="Orders" />
        </TabList>
      </div>;
  }
}`,...q.parameters?.docs?.source},description:{story:`Overflow with divider — typical page header in a narrow viewport. The
selected indicator still sits on the rail while the strip scrolls.`,...q.parameters?.docs?.description}}},J.parameters={...J.parameters,docs:{...J.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [value, setValue] = useState('api');
    return <div style={{
      display: 'grid',
      gap: '8px',
      maxWidth: '400px',
      minWidth: 0
    }}>
        <div style={{
        border: '1px dashed #ccc',
        minWidth: 0
      }}>
          <TabList value={value} onChange={setValue}>
            <Tab value="overview" label="Overview" />
            <Tab value="activity" label="Activity" />
            <Tab value="members" label="Members" />
            <Tab value="settings" label="Settings" />
            <Tab value="integrations" label="Integrations" />
            <Tab value="billing" label="Billing & Plans" />
            <Tab value="security" label="Security" />
            <Tab value="notifications" label="Notifications" />
            <Tab value="api" label="API Keys" />
          </TabList>
        </div>
        <div style={{
        display: 'flex',
        gap: '4px'
      }}>
          <Button label="Select first" variant="secondary" size="sm" onClick={() => setValue('overview')} />
          <Button label="Select last" variant="secondary" size="sm" onClick={() => setValue('api')} />
        </div>
      </div>;
  }
}`,...J.parameters?.docs?.source},description:{story:"A tab selected while it is out of view is scrolled back in — on mount and\nwhenever the host changes `value` itself.",...J.parameters?.docs?.description}}},Y.parameters={...Y.parameters,docs:{...Y.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [value, setValue] = useState('overview');
    return <div style={{
      maxWidth: '400px',
      border: '1px dashed #ccc'
    }}>
        <TabList value={value} onChange={setValue} overflow="visible">
          <Tab value="overview" label="Overview" />
          <Tab value="activity" label="Activity" />
          <Tab value="members" label="Members" />
          <Tab value="settings" label="Settings" />
          <Tab value="integrations" label="Integrations" />
          <Tab value="billing" label="Billing & Plans" />
          <Tab value="security" label="Security" />
          <Tab value="notifications" label="Notifications" />
          <Tab value="api" label="API Keys" />
        </TabList>
      </div>;
  }
}`,...Y.parameters?.docs?.source},description:{story:'`overflow="visible"` opts out: the tabs keep their intrinsic widths and spill\nout of the strip, for a host that handles overflow itself.',...Y.parameters?.docs?.description}}},X.parameters={...X.parameters,docs:{...X.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [value, setValue] = useState('overview');
    const panels = {
      overview: 'Everything at a glance.',
      activity: 'What happened recently.',
      members: 'Who has access.'
    };
    return <div style={{
      display: 'grid',
      gap: '12px',
      maxWidth: '400px'
    }}>
        <TabList value={value} onChange={setValue} role="tablist" aria-label="Project views" hasDivider>
          <Tab value="overview" label="Overview" id="tab-overview" panelId="panel-overview" />
          <Tab value="activity" label="Activity" id="tab-activity" panelId="panel-activity" />
          <Tab value="members" label="Members" id="tab-members" panelId="panel-members" />
        </TabList>
        {Object.entries(panels).map(([key, text]) => <div key={key} id={\`panel-\${key}\`} role="tabpanel" aria-labelledby={\`tab-\${key}\`} tabIndex={0} hidden={key !== value}>
            {text}
          </div>)}
      </div>;
  }
}`,...X.parameters?.docs?.source},description:{story:'`role="tablist"` asks for the WAI-ARIA tabs pattern: `role="tablist"` /\n`role="tab"`, `aria-selected`, and each tab pointing at the panel it\ncontrols. A screen reader announces "tab 2 of 3, selected" and can move to\nthe panel it opens. Without it the strip stays a `<nav>` landmark marking\nthe current tab with `aria-current`.',...X.parameters?.docs?.description}}},Z.parameters={...Z.parameters,docs:{...Z.parameters?.docs,source:{originalSource:`{
  name: 'Tab With Help Text',
  render: () => {
    const [value, setValue] = useState('general');
    const generalRef = useRef<HTMLButtonElement>(null);
    const membersRef = useRef<HTMLButtonElement>(null);
    const panels = {
      general: 'Workspace name, language, and time zone.',
      members: 'People with access to this workspace.',
      advanced: 'Export, archive, and delete.'
    };
    return <div style={{
      display: 'grid',
      gap: '12px',
      maxWidth: '420px'
    }}>
        <TabList value={value} onChange={setValue} role="tablist" aria-label="Settings">
          <Tab ref={generalRef} value="general" label="General" panelId="panel-help-general" endContent={<Icon icon="info" size="sm" />} />
          <Tab ref={membersRef} value="members" label="Members" panelId="panel-help-members" endContent={<Icon icon="info" size="sm" />} />
          <Tab value="advanced" label="Advanced" panelId="panel-help-advanced" />
        </TabList>
        <Tooltip content="Name, language, and time zone for this workspace." anchorRef={generalRef} />
        <Tooltip content="Who can open this workspace, and what they can change." anchorRef={membersRef} />
        {Object.entries(panels).map(([key, text]) => <div key={key} id={\`panel-help-\${key}\`} role="tabpanel" tabIndex={0} hidden={key !== value}>
            {text}
          </div>)}
      </div>;
  }
}`,...Z.parameters?.docs?.source},description:{story:`A tab's help text: a Tooltip anchored on the Tab through its ref, so it
describes the tab itself. Each Tooltip renders after the TabList, because the
strip holds only tabs. The tab stays one button; the info glyph is decorative.`,...Z.parameters?.docs?.description}}},Q.parameters={...Q.parameters,docs:{...Q.parameters?.docs,source:{originalSource:`{
  name: 'Full-Width Indicator (Nested Theme)',
  render: () => {
    const [value, setValue] = useState('app');
    const {
      mode
    } = useTheme();
    return <VStack gap={4}>
        <Theme theme={fullWidthIndicatorTheme} mode={mode}>
          <TabList value={value} onChange={setValue} aria-label="Open files" size="sm" hasDivider>
            <Tab value="app" label="App.tsx" />
            <Tab value="styles" label="styles.css" />
            <Tab value="readme" label="README.md" />
          </TabList>
        </Theme>
        <TabList value={value} onChange={setValue} aria-label="Default indicator, for comparison" size="sm" hasDivider>
          <Tab value="app" label="App.tsx" />
          <Tab value="styles" label="styles.css" />
          <Tab value="readme" label="README.md" />
        </TabList>
      </VStack>;
  }
}`,...Q.parameters?.docs?.source}}},$.parameters={...$.parameters,docs:{...$.parameters?.docs,source:{originalSource:`{
  name: 'Pressed state',
  parameters: {
    docs: {
      description: {
        story: "Press and hold an enabled tab to paint the system's \`--color-overlay-pressed\` layer on its surface. The disabled tab remains visually unchanged and cannot change selection."
      }
    }
  },
  render: () => {
    const [value, setValue] = useState('home');
    return <TabList value={value} onChange={setValue}>
        <Tab value="home" label="Home" />
        <Tab value="projects" label="Projects — press and hold" />
        <Tab value="settings" label="Settings" />
        <Tab value="unavailable" label="Unavailable — no pressed state" aria-disabled="true" />
      </TabList>;
  }
}`,...$.parameters?.docs?.source}}},Ze=[`Default`,`FullBleedGeometry`,`WithMenu`,`MenuWithSelectedChild`,`SizeVariants`,`WithIcons`,`IconOnly`,`WithActions`,`DividerGap`,`FillLayout`,`Overflow`,`OverflowWithDivider`,`OverflowSelectedOffscreen`,`OverflowVisible`,`TabsPattern`,`DescribedTabs`,`FullWidthIndicator`,`PressedState`]})))()}Qe();export{P as Default,Z as DescribedTabs,W as DividerGap,G as FillLayout,L as FullBleedGeometry,Q as FullWidthIndicator,H as IconOnly,z as MenuWithSelectedChild,K as Overflow,J as OverflowSelectedOffscreen,Y as OverflowVisible,q as OverflowWithDivider,$ as PressedState,B as SizeVariants,X as TabsPattern,U as WithActions,V as WithIcons,R as WithMenu,Ze as __namedExportsOrder,We as default};