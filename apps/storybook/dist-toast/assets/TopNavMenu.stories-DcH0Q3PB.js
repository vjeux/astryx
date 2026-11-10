import{a as e,n as t}from"./rolldown-runtime-sJBDdmOt.js";import{t as n}from"./react-DlPsW1c0.js";import{n as r,t as i}from"./stylex-BSlGVhGe.js";import{b as a,p as o}from"./tokens.stylex-uC3T-IhP.js";import{t as s}from"./jsx-runtime-MKhVqBIO.js";import{n as c}from"./mergeProps-DHkqklmt.js";import{n as l}from"./isRenderable-C2vVZKI4.js";import{i as u,t as d}from"./themeProps-BVy3p_gf.js";import{n as f,t as p}from"./useMergedRefs-D6axeCXB.js";import{t as m}from"./composeEventHandlers-CceNiKXL.js";import{n as h,t as g}from"./rtlStyles-BwjrfDSU.js";import{a as _,r as v}from"./focusOutline.stylex-DWroqGen.js";import{i as y,n as b,r as x,t as S}from"./usePressFeedback-KAUIHUDJ.js";import{r as ee}from"./safeUrl-BlyUdgZD.js";import{n as C,t as te}from"./Icon-BmO5FtDV.js";import{n as w,t as T}from"./Button-DoGM0DEN.js";import{n as ne,t as E}from"./useLinkComponent-DVILVvhE.js";import{n as re,r as ie}from"./TopNavRenderContext-BplNsfZl.js";import{i as ae,t as oe}from"./useListFocus-nrRBdloE.js";import{n as se,r as ce}from"./usePopover-BRtTc03T.js";import{a as le,n as ue}from"./useMenuPress-q1UHdjWB.js";import{n as de}from"./menuPressOnItems-BpK5A4ws.js";import{n as fe,t as D}from"./menuTouchAction.stylex-BraRkFMH.js";import{n as pe,t as O}from"./useMenuOverflow-FfwzF77a.js";import{n as me,t as he}from"./useTypeahead-CVLZIfYI.js";import{n as ge,t as _e}from"./useMenuHover-DooZoHxc.js";import{n as ve,t as ye}from"./useCloseMobileDrawerOnActivate-DJLEVvau.js";import{n as be,t as xe}from"./NavIcon-Cx3trlkR.js";import{n as k,t as Se}from"./Grid-DxYgorpj.js";import{a as A,c as Ce,i as we,n as Te,o as Ee,r as j,s as De,t as M}from"./TopNavItem-D28XBy_I.js";import{n as Oe,t as ke}from"./navItemStyles.stylex-CCtSTRHz.js";import{n as Ae,t as je}from"./ChartBarIcon-C-9cNjBA.js";import{n as Me,t as Ne}from"./CubeIcon-BM24LJ8s.js";import{n as Pe,t as Fe}from"./GlobeAltIcon-WNucSUjV.js";import{n as Ie,t as Le}from"./ShieldCheckIcon-T0uBknyE.js";import{n as Re,t as ze}from"./UserCircleIcon-D4Zqsnla.js";function Be(e){return e.title}function N({ref:e,label:t,items:n,delay:i=150,hideDelay:o=200,xstyle:s,className:d,style:p,onClick:h,onMouseEnter:g,onMouseLeave:_,...x}){let S=b(),C=ie(),w=ve(C===`drawer`),T=ne(),[E,re]=(0,P.useState)(!1),oe=(0,P.useId)(),se=Ce(),ue=(0,P.useRef)(null),D=ce({role:`none`}),{triggerProps:O,contentProps:he,menuRef:_e,setTriggerEl:ye,close:be}=ge({show:D.show,hide:D.hide,isOpen:D.isOpen,isEnabled:!0,showDelay:i,hideDelay:o,popoverId:D.id}),xe=f(ue,D.triggerRef,ye,e),{listRef:k,handleKeyDown:Se,handleFocus:A,focusItem:we}=ae({itemSelector:`[role="menuitem"]`,hasRovingTabIndex:!0,onEscape:be}),Te=(0,P.useCallback)(()=>k.current?Array.from(k.current.querySelectorAll(`[role="menuitem"]`)):[],[k]),Ee=me({getItemLabels:()=>Te().map(e=>e.textContent),onMatch:we,getCurrentIndex:()=>Te().findIndex(e=>e===document.activeElement||e.contains(document.activeElement))}),j=(0,P.useCallback)(e=>{if(e.key===`Enter`||e.key===` `){let t=document.activeElement;if(t?.getAttribute(`role`)===`menuitem`){e.preventDefault(),t.click();return}}Ee.onKeyDown(e)?e.preventDefault():Se(e)},[Se,Ee]),De=f(_e,k),M=le({menuRef:k,itemSelector:`[role="menuitem"]`,onDismiss:be}),ke=pe(k,n.length,D.isOpen);return C===`mobile-bar`?null:C===`drawer`?(0,F.jsxs)(`div`,{className:`astryx78zum5 astryxdt5ytf`,children:[(0,F.jsxs)(`button`,{ref:e,type:`button`,...x,onMouseEnter:g,onMouseLeave:_,onClick:m(h,()=>re(e=>!e)),"aria-expanded":E,"aria-controls":`${oe}-items`,...S,...c(v.focusVisible(Oe.item,y.backgroundColor,L.header,s),d,p),children:[t,(0,F.jsx)(te,{icon:`chevronDown`,size:`sm`,color:`inherit`,xstyle:[L.chevron,E&&L.chevronExpanded]})]}),(0,F.jsx)(`div`,{id:`${oe}-items`,"aria-hidden":!E,inert:!E||void 0,...{0:{className:`astryxrvj5dj astryxihq33y astryxb3r6kr astryx6kj92 astryxd00j3c astryx1eizr8u astryxlr8y92`},1:{className:`astryxrvj5dj astryx6kj92 astryxd00j3c astryx1eizr8u astryxlr8y92 astryx1tu4anv astryx1rea2x4 astryxostmdb`}}[!!E|0],children:(0,F.jsx)(`div`,{className:`astryx2lwn1j`,children:n.map(e=>(0,F.jsxs)(T,{href:e.href,...S,onClick:w(t=>{e.onClick?.()}),...v.focusVisible(Oe.item,y.backgroundColor,L.item),children:[l(e.icon)&&(0,F.jsx)(`span`,{className:`astryx2lah0s astryxw4jnvo astryx1qx5ct2`,children:e.icon}),(0,F.jsxs)(`span`,{className:`astryx78zum5 astryxdt5ytf astryx1lsbc85`,children:[e.title,e.description&&(0,F.jsx)(`span`,{className:`astryx141an7d astryxv1l7n4 astryx1sodnla`,children:e.description})]})]},Be(e)))})})]}):(0,F.jsxs)(F.Fragment,{children:[(0,F.jsxs)(`button`,{ref:xe,type:`button`,...x,...D.triggerProps,...O,onClick:m(h,O.onClick),onMouseEnter:m(g,O.onMouseEnter),onMouseLeave:m(_,O.onMouseLeave),...c(u(`top-nav-menu`),v.focusVisible(I.trigger,D.isOpen&&I.triggerOpen,s),d,p),children:[t,(0,F.jsx)(te,{icon:`chevronDown`,size:`sm`,color:`inherit`,xstyle:[I.chevron,D.isOpen&&I.chevronOpen]})]}),D.render((0,F.jsx)(`div`,{ref:De,role:`menu`,"aria-label":t,...he,...M.menuProps,onPointerDown:de(M.menuProps.onPointerDown,`[role="menuitem"]`),onKeyDown:j,onFocus:A,...r(I.menuContainer,ke?fe.scrolls:fe.fits),children:n.map(e=>{let t=e.href?`a`:`div`;return(0,F.jsxs)(t,{role:`menuitem`,tabIndex:-1,href:e.href!=null&&ee(e.href)?e.href:void 0,draggable:e.href==null&&void 0,onClick:e.onClick,...v.focusVisible(I.menuItem),children:[(0,F.jsx)(`div`,{className:`astryx78zum5 astryx6s0dn4 astryxl56j7k astryx100vrsf astryx1vqgdyp astryxh6dtrn astryx17x4s8c astryx2lah0s`,children:e.icon}),(0,F.jsxs)(`div`,{className:`astryx78zum5 astryxdt5ytf astryxzye2dw astryxeuugli`,children:[(0,F.jsx)(`span`,{className:`astryxcr08ib astryx1kq96og astryx2mo6ok astryx1tgivj0`,children:e.title}),e.description&&(0,F.jsx)(`span`,{className:`astryx141an7d astryx1ltkj2j astryx1sodnla astryxv1l7n4`,children:e.description})]})]},Be(e))})}),{placement:`below`,alignment:se,offset:a[`--spacing-1`]})]})}var P,F,I,L;function Ve(){return(Ve=t((()=>{P=e(n(),1),i(),se(),_e(),ue(),D(),O(),oe(),he(),C(),p(),ke(),De(),re(),ye(),E(),d(),_(),x(),S(),o(),F=s(),I={trigger:{k1xSpc:`astryx3nfvp2`,kGNEyG:`astryx6s0dn4`,kOIVth:`astryx1txdalj`,khm7nJ:null,k1C7PZ:null,k8WAf4:`astryx1vofgu7`,kLKAdn:null,kGO01o:null,kg3NbH:`astryxrrkdod`,kuDDbn:null,kE3dHu:null,kP0aTx:null,kpe85a:null,kaIpWk:`astryxh6dtrn`,krdFHd:null,kfmiAY:null,kVL7Gh:null,kT0f0o:null,kIxVMA:null,ksF3WI:null,kqGeR4:null,kYm2EN:null,kGuDYH:`astryxcr08ib`,kLWn49:`astryx1kq96og`,k63SB2:`astryx1e4wzip`,kMwMTN:`astryxv1l7n4`,kybGjl:`astryx1hl2dhg`,k1TLXF:null,kMnn75:null,kmVMDM:null,kNySMw:null,kkrTdU:`astryx1ypdohk astryx16khyan`,k1ekBW:`astryxs2xxs2`,kIyJzY:`astryxuedmi6`,kAMwcw:`astryxlr8y92`,kWkggS:`astryxjbqb8w astryxoevpu5`,kMzoRj:`astryxc342km`,kjGldf:null,k2ei4v:null,kZ1KPB:null,ke9TFa:null,kWqL5O:null,kLoX6v:null,kEafiO:null,kt9PQ7:null,ksu8eU:`astryxng3xce`,kJRH4f:null,kVhnKS:null,k4WBpm:null,k8ry5P:null,kSWEuD:null,kDUl1X:null,kPef9Z:null,kfdmCh:null,kMv6JI:`astryxjb2p0i`,$$css:!0},triggerOpen:{kMwMTN:`astryx1tgivj0`,kWkggS:`astryx1lmrjuc`,$$css:!0},chevron:{k1xSpc:`astryx3nfvp2`,kGNEyG:`astryx6s0dn4`,kzqmXN:`astryx15vhz18`,kZKoxP:`astryxlzyvqe`,kGuDYH:`astryx1qlqyl8`,k1ekBW:`astryx11xpdln`,kIyJzY:`astryxuedmi6`,kAMwcw:`astryxlr8y92`,$$css:!0},chevronOpen:{k3aq6I:`astryx19jd1h0`,$$css:!0},menuContainer:{kfSwDN:`astryx87ps6o`,k1xSpc:`astryx78zum5`,kXwgrk:`astryxdt5ytf`,kOIVth:`astryxzye2dw`,k7Eaqz:`astryx1u2d2a2`,kmVPX3:`astryx9epnlk`,$$css:!0},menuItem:{k1xSpc:`astryx78zum5`,kGNEyG:`astryx6s0dn4`,kOIVth:`astryxjcht0a`,khm7nJ:null,k1C7PZ:null,k8WAf4:`astryx8o8v82`,kLKAdn:null,kGO01o:null,kg3NbH:`astryxrrkdod`,kuDDbn:null,kE3dHu:null,kP0aTx:null,kpe85a:null,kaIpWk:`astryxh6dtrn`,krdFHd:null,kfmiAY:null,kVL7Gh:null,kT0f0o:null,kIxVMA:null,ksF3WI:null,kqGeR4:null,kYm2EN:null,kybGjl:`astryx1hl2dhg`,k1TLXF:null,kMnn75:null,kmVMDM:null,kNySMw:null,kkrTdU:`astryx1ypdohk astryx16khyan`,k1ekBW:`astryx15406qy`,kIyJzY:`astryxuedmi6`,kAMwcw:`astryxlr8y92`,kWkggS:`astryxjbqb8w astryxoevpu5`,kMzoRj:`astryxc342km`,kjGldf:null,k2ei4v:null,kZ1KPB:null,ke9TFa:null,kWqL5O:null,kLoX6v:null,kEafiO:null,kt9PQ7:null,ksu8eU:`astryxng3xce`,kJRH4f:null,kVhnKS:null,k4WBpm:null,k8ry5P:null,kSWEuD:null,kDUl1X:null,kPef9Z:null,kfdmCh:null,$$css:!0}},L={header:{kjj79g:`astryx1qughib`,kMzoRj:`astryxc342km`,kjGldf:null,k2ei4v:null,kZ1KPB:null,ke9TFa:null,kWqL5O:null,kLoX6v:null,kEafiO:null,kt9PQ7:null,ksu8eU:`astryxng3xce`,kJRH4f:null,kVhnKS:null,k4WBpm:null,k8ry5P:null,kSWEuD:null,kDUl1X:null,kPef9Z:null,kfdmCh:null,kWkggS:`astryxjbqb8w`,$$css:!0},chevron:{k1xSpc:`astryx3nfvp2`,kzqmXN:`astryx15vhz18`,kZKoxP:`astryxlzyvqe`,kGuDYH:`astryx1qlqyl8`,k1ekBW:`astryx11xpdln`,kIyJzY:`astryxuedmi6`,kAMwcw:`astryxlr8y92`,$$css:!0},chevronExpanded:{k3aq6I:`astryx19jd1h0`,$$css:!0},item:{kZCmMZ:`astryx31w388`,kE3dHu:null,kpe85a:null,kybGjl:`astryx1hl2dhg`,k1TLXF:null,kMnn75:null,kmVMDM:null,kNySMw:null,$$css:!0}},N.displayName=`TopNavMenu`,N.__docgenInfo={description:`A navigation item that displays a hover-triggered overflow menu.

Renders as a nav item in TopNav's startContent slot. On hover,
shows a popover with rich menu items containing an icon, title,
and optional description.

@example
\`\`\`
<TopNav
  startContent={
    <>
      <TopNavItem label="Home" href="/" isSelected />
      <TopNavMenu
        label="Products"
        items={[
          {
            title: 'Analytics',
            description: 'Track and analyze user behavior',
            icon: <ChartBarIcon />,
            href: '/products/analytics',
          },
          {
            title: 'Messaging',
            description: 'Real-time communication tools',
            icon: <ChatBubbleIcon />,
            href: '/products/messaging',
          },
        ]}
      />
    </>
  }
/>
\`\`\``,methods:[],displayName:`TopNavMenu`,props:{xstyle:{required:!1,tsType:{name:`StyleXStyles`},description:"StyleX styles created via `stylex.create()`. Merged with the component's\nbase styles inside a single `stylex.props()` call for optimal deduplication.\n\n@example\n```\nconst overrides = stylex.create({ root: { marginBottom: 8 } });\n<Component xstyle={overrides.root} />\n```"},ref:{required:!1,tsType:{name:`ReactRef`,raw:`React.Ref<HTMLButtonElement>`,elements:[{name:`HTMLButtonElement`}]},description:``},label:{required:!0,tsType:{name:`string`},description:`The visible label for the nav item trigger.`},items:{required:!0,tsType:{name:`Array`,elements:[{name:`TopNavMenuItemData`}],raw:`TopNavMenuItemData[]`},description:`Menu items to display in the hover popover.`},delay:{required:!1,tsType:{name:`number`},description:`Delay before showing the menu on hover (ms).
@default 150`,defaultValue:{value:`150`,computed:!1}},hideDelay:{required:!1,tsType:{name:`number`},description:`Delay before hiding the menu after mouse leaves (ms).
@default 200`,defaultValue:{value:`200`,computed:!1}}},composes:[`Omit`]}})))()}function He({ref:e,label:t,items:n,featured:r,delay:i=150,hideDelay:a=250,onOpenChange:o,...s}){let c=ie();return c===`mobile-bar`?null:c===`drawer`?(0,z.jsx)(We,{ref:e,label:t,items:n,featured:r,...s}):(0,z.jsx)(Ue,{ref:e,label:t,items:n,featured:r,delay:i,hideDelay:a,onOpenChange:o,...s})}function Ue({ref:e,label:t,items:n,featured:r,delay:i=150,hideDelay:a=250,onOpenChange:o,xstyle:s,className:d,style:p,onClick:h,onMouseEnter:g,onMouseLeave:_,...y}){let b=Ce(),x=(0,R.useRef)(null),S=(0,R.useCallback)(()=>{o?.(!0)},[o]),ee=(0,R.useCallback)(()=>{o?.(!1)},[o]),C=ce({role:`none`,hasSurface:!1,hasLightDismiss:!0,onShow:S,onHide:ee});(0,R.useEffect)(()=>{let e=x.current?.closest(`nav`);return e&&C.triggerRef(e),()=>{C.triggerRef(null)}},[C]);let{triggerProps:w,contentProps:T,menuRef:ne,setTriggerEl:E}=ge({show:C.show,hide:C.hide,isOpen:C.isOpen,isEnabled:!0,showDelay:i,hideDelay:a,itemSelector:Ge,popoverId:C.id});return(0,z.jsxs)(z.Fragment,{children:[(0,z.jsxs)(`button`,{ref:f(x,E,e),type:`button`,...y,...C.triggerProps,...w,onClick:m(h,w.onClick),onMouseEnter:m(g,w.onMouseEnter),onMouseLeave:m(_,w.onMouseLeave),...c(u(`top-nav-mega-menu`),v.focusVisible(B.trigger,C.isOpen&&B.triggerOpen,s),d,p),children:[t,(0,z.jsx)(te,{icon:`chevronDown`,size:`sm`,color:`inherit`,xstyle:[B.chevron,C.isOpen&&B.chevronOpen]})]}),C.render((0,z.jsx)(`div`,{ref:ne,role:`group`,"aria-label":t,...T,className:`astryx1prclbq astryx11xkdxz astryx13fuv20 astryx1pc3f07 astryx1hviunn astryx1i5ehqx astryxb3r6kr astryx78zum5 astryxdt5ytf astryx2lwn1j`,children:(0,z.jsxs)(`div`,{className:`astryx78zum5 astryx1a02dak astryx1qh66ti astryx8o8v82 astryxrrkdod astryx1m1aaou astryx9f619 astryx1odjw0f astryxish69e`,children:[l(n)&&(0,z.jsx)(Se,{columns:2,gap:2,xstyle:B.menuWrapper,children:n}),l(r)&&(0,z.jsx)(`div`,{className:`astryx1iyjqo2 astryxs83m0k astryxjpgo6f astryx1hviunn astryxwmxj5m astryxb3r6kr astryx78zum5 astryxdt5ytf`,children:r})]})}),{placement:`below`,alignment:b,xstyle:[B.panelAnimation,B.panelViewportFit]})]})}function We({ref:e,label:t,items:n,featured:r,xstyle:i,className:a,style:o,onClick:s,...d}){let[f,p]=(0,R.useState)(!1),h=b(),g=`mega-menu-${t.toLowerCase().replace(/\s+/g,`-`)}`;return(0,z.jsxs)(`div`,{className:`astryx78zum5 astryxdt5ytf`,children:[(0,z.jsxs)(`button`,{ref:e,type:`button`,...d,onClick:m(s,()=>p(e=>!e)),"aria-expanded":f,"aria-controls":`${g}-items`,...h,...c(u(`top-nav-mega-menu`,{mode:`drawer`}),v.focusVisible(Oe.item,y.backgroundColor,B.drawerHeader,i),a,o),children:[t,(0,z.jsx)(te,{icon:`chevronDown`,size:`sm`,color:`inherit`,xstyle:[B.drawerChevron,f&&B.drawerChevronExpanded]})]}),(0,z.jsx)(`div`,{id:`${g}-items`,"aria-hidden":!f,inert:!f||void 0,...{0:{className:`astryxrvj5dj astryxihq33y astryxb3r6kr astryx6kj92 astryxd00j3c astryx1eizr8u astryxlr8y92`},1:{className:`astryxrvj5dj astryx6kj92 astryxd00j3c astryx1eizr8u astryxlr8y92 astryx1tu4anv astryx1rea2x4 astryxostmdb`}}[!!f|0],children:(0,z.jsxs)(`div`,{className:`astryx2lwn1j`,children:[n,l(r)&&(0,z.jsx)(`div`,{className:`astryxtbrsbv astryx1l10yog astryx1hviunn astryxwmxj5m astryxb3r6kr`,children:r})]})})]})}var R,z,B,Ge;function Ke(){return(Ke=t((()=>{R=e(n(),1),se(),_e(),k(),C(),ke(),De(),re(),d(),_(),x(),S(),p(),z=s(),B={trigger:{k1xSpc:`astryx3nfvp2`,kGNEyG:`astryx6s0dn4`,kOIVth:`astryx1txdalj`,khm7nJ:null,k1C7PZ:null,k8WAf4:`astryx1vofgu7`,kLKAdn:null,kGO01o:null,kg3NbH:`astryxrrkdod`,kuDDbn:null,kE3dHu:null,kP0aTx:null,kpe85a:null,kaIpWk:`astryxh6dtrn`,krdFHd:null,kfmiAY:null,kVL7Gh:null,kT0f0o:null,kIxVMA:null,ksF3WI:null,kqGeR4:null,kYm2EN:null,kGuDYH:`astryxcr08ib`,kLWn49:`astryx1kq96og`,k63SB2:`astryx1e4wzip`,kMwMTN:`astryxv1l7n4`,kybGjl:`astryx1hl2dhg`,k1TLXF:null,kMnn75:null,kmVMDM:null,kNySMw:null,kkrTdU:`astryx1ypdohk astryx16khyan`,k1ekBW:`astryxs2xxs2`,kIyJzY:`astryxuedmi6`,kAMwcw:`astryxlr8y92`,kWkggS:`astryxjbqb8w astryxoevpu5`,kMzoRj:`astryxc342km`,kjGldf:null,k2ei4v:null,kZ1KPB:null,ke9TFa:null,kWqL5O:null,kLoX6v:null,kEafiO:null,kt9PQ7:null,ksu8eU:`astryxng3xce`,kJRH4f:null,kVhnKS:null,k4WBpm:null,k8ry5P:null,kSWEuD:null,kDUl1X:null,kPef9Z:null,kfdmCh:null,kMv6JI:`astryxjb2p0i`,$$css:!0},triggerOpen:{kMwMTN:`astryx1tgivj0`,kWkggS:`astryx1lmrjuc`,$$css:!0},chevron:{k1xSpc:`astryx3nfvp2`,kGNEyG:`astryx6s0dn4`,kzqmXN:`astryx15vhz18`,kZKoxP:`astryxlzyvqe`,kGuDYH:`astryx1qlqyl8`,k1ekBW:`astryx11xpdln`,kIyJzY:`astryxuedmi6`,kAMwcw:`astryxlr8y92`,$$css:!0},chevronOpen:{k3aq6I:`astryx19jd1h0`,$$css:!0},panelAnimation:{kSiTet:`astryxg01cxk astryxofkqq2`,k3aq6I:`astryx1bvilyr astryx9cjr8z astryxuupxpy`,k1ekBW:`astryx4bbghf astryx3ya4ca`,kIyJzY:`astryxgneliz astryxh0ie4q astryxuh6ohu`,kAMwcw:`astryxlr8y92 astryx19dgjhz`,kzIqYQ:`astryxd00j3c`,kamtoy:`astryx4itv7f`,k1tdAh:`astryx12p7p72`,$$css:!0},panelViewportFit:{k1xSpc:`astryx1s85apg astryx1y40yee`,kXwgrk:`astryxdt5ytf`,kskxy:`astryxbhvqqn`,$$css:!0},menuWrapper:{kzQI83:`astryxgyuaek`,kmuXW:`astryxs83m0k`,kCS8Yb:`astryxchdapg`,k7Eaqz:`astryxeuugli`,$$css:!0},drawerHeader:{kjj79g:`astryx1qughib`,kMzoRj:`astryxc342km`,kjGldf:null,k2ei4v:null,kZ1KPB:null,ke9TFa:null,kWqL5O:null,kLoX6v:null,kEafiO:null,kt9PQ7:null,ksu8eU:`astryxng3xce`,kJRH4f:null,kVhnKS:null,k4WBpm:null,k8ry5P:null,kSWEuD:null,kDUl1X:null,kPef9Z:null,kfdmCh:null,kWkggS:`astryxjbqb8w`,$$css:!0},drawerChevron:{k1xSpc:`astryx3nfvp2`,kzqmXN:`astryx15vhz18`,kZKoxP:`astryxlzyvqe`,kGuDYH:`astryx1qlqyl8`,k1ekBW:`astryx11xpdln`,kIyJzY:`astryxuedmi6`,kAMwcw:`astryxlr8y92`,$$css:!0},drawerChevronExpanded:{k3aq6I:`astryx19jd1h0`,$$css:!0}},He.displayName=`TopNavMegaMenu`,Ge=`a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])`,He.__docgenInfo={description:`A navigation item that displays a full-width mega menu on hover.

Uses a composed children API with sub-components:
- \`items\` — ReactNode slot, typically TopNavMegaMenuItem components
- \`featured\` — ReactNode slot for the right-panel / drawer featured card

Supports three render modes via TopNavRenderContext:
- \`'default'\`: desktop popover with hover/click trigger
- \`'mobile-bar'\`: hidden (returns null)
- \`'drawer'\`: inline collapsible matching TopNavMenu pattern

@example
\`\`\`
<TopNav
  startContent={
    <TopNavMegaMenu
      label="Products"
      items={
        <>
          <TopNavMegaMenuItem
            title="Analytics"
            description="Track behavior"
            icon={<ChartIcon />}
            href="/analytics"
          />
          <TopNavMegaMenuItem
            title="Messaging"
            description="Real-time comms"
            icon={<ChatIcon />}
            href="/messaging"
          />
        </>
      }
      featured={
        <>
          <strong>New: AI Features</strong>
          <p>Explore our latest AI-powered tools.</p>
        </>
      }
    />
  }
/>
\`\`\``,methods:[],displayName:`TopNavMegaMenu`,props:{xstyle:{required:!1,tsType:{name:`StyleXStyles`},description:"StyleX styles created via `stylex.create()`. Merged with the component's\nbase styles inside a single `stylex.props()` call for optimal deduplication.\n\n@example\n```\nconst overrides = stylex.create({ root: { marginBottom: 8 } });\n<Component xstyle={overrides.root} />\n```"},ref:{required:!1,tsType:{name:`ReactRef`,raw:`React.Ref<HTMLButtonElement>`,elements:[{name:`HTMLButtonElement`}]},description:``},label:{required:!0,tsType:{name:`string`},description:`The visible label for the nav item trigger.`},items:{required:!1,tsType:{name:`ReactNode`},description:`Menu items slot — typically one or more TopNavMegaMenuItem components,
but accepts any ReactNode for custom layouts.`},featured:{required:!1,tsType:{name:`ReactNode`},description:`Featured content slot — rendered in the right panel on desktop,
and below the items in the mobile drawer.`},delay:{required:!1,tsType:{name:`number`},description:`Delay before showing the menu on hover (ms). @default 150`,defaultValue:{value:`150`,computed:!1}},hideDelay:{required:!1,tsType:{name:`number`},description:`Delay before hiding the menu after mouse leaves (ms). @default 250`,defaultValue:{value:`250`,computed:!1}},onOpenChange:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(isOpen: boolean) => void`,signature:{arguments:[{type:{name:`boolean`},name:`isOpen`}],return:{name:`void`}}},description:`Callback fired when the mega menu opens or closes.
Useful for coordinating wrapper styles (e.g. hiding other shadows).`}},composes:[`Omit`]}})))()}function V({ref:e,title:t,description:n,icon:r,href:i,onClick:a,as:o,tabIndex:s,xstyle:d,className:f,style:p,...m}){let h=b(),g=ie(),_=ne(o),x=ve(g===`drawer`);if(g===`drawer`){let o=i?_:`button`,g=o===`button`?{type:`button`}:{},b=x(()=>{a?.()});return(0,H.jsxs)(o,{...m,ref:e,href:i,...h,onClick:b,tabIndex:s,...g,...c(u(`top-nav-mega-menu-item`,{mode:`drawer`}),v.focusVisible(Oe.item,y.backgroundColor,qe.drawerItem,d),f,p),children:[l(r)&&(0,H.jsx)(`div`,{className:`astryx78zum5 astryx6s0dn4 astryxl56j7k astryx1td3qas astryx10w6t97 astryxh6dtrn astryx17x4s8c astryx2lah0s astryxv9yike astryxjc2qm6`,children:r}),(0,H.jsxs)(`div`,{className:`astryx78zum5 astryxdt5ytf astryx1lsbc85 astryxeuugli`,children:[t,n&&(0,H.jsx)(`span`,{className:`astryx141an7d astryx1ltkj2j astryxv1l7n4 astryx1sodnla`,children:n})]})]})}return(0,H.jsxs)(i?_:`div`,{...m,ref:e,href:i,...h,onClick:a,tabIndex:s,...c(u(`top-nav-mega-menu-item`),v.focusVisible(qe.desktop,y.backgroundColor,d),f,p),children:[l(r)&&(0,H.jsx)(`div`,{className:`astryx78zum5 astryx6s0dn4 astryxl56j7k astryx100vrsf astryx1vqgdyp astryxh6dtrn astryx17x4s8c astryx2lah0s astryxv9yike`,children:r}),(0,H.jsxs)(`div`,{className:`astryx78zum5 astryxdt5ytf astryxzye2dw astryxeuugli`,children:[(0,H.jsx)(`span`,{className:`astryxcr08ib astryx1kq96og astryx2mo6ok astryx1tgivj0`,children:t}),n&&(0,H.jsx)(`span`,{className:`astryx141an7d astryx1ltkj2j astryx1sodnla astryxv1l7n4`,children:n})]})]})}var H,qe;function Je(){return(Je=t((()=>{n(),ke(),E(),re(),ye(),d(),_(),x(),S(),H=s(),qe={desktop:{k1xSpc:`astryx78zum5`,kGNEyG:`astryx1cy8zhl`,kOIVth:`astryxjcht0a`,khm7nJ:null,k1C7PZ:null,k8WAf4:`astryx8o8v82`,kLKAdn:null,kGO01o:null,kg3NbH:`astryxrrkdod`,kuDDbn:null,kE3dHu:null,kP0aTx:null,kpe85a:null,kaIpWk:`astryxh6dtrn`,krdFHd:null,kfmiAY:null,kVL7Gh:null,kT0f0o:null,kIxVMA:null,ksF3WI:null,kqGeR4:null,kYm2EN:null,kybGjl:`astryx1hl2dhg`,k1TLXF:null,kMnn75:null,kmVMDM:null,kNySMw:null,kkrTdU:`astryx1ypdohk astryx16khyan`,k1ekBW:`astryx15406qy`,kIyJzY:`astryxuedmi6`,kAMwcw:`astryxlr8y92`,kMzoRj:`astryxc342km`,kjGldf:null,k2ei4v:null,kZ1KPB:null,ke9TFa:null,kWqL5O:null,kLoX6v:null,kEafiO:null,kt9PQ7:null,ksu8eU:`astryxng3xce`,kJRH4f:null,kVhnKS:null,k4WBpm:null,k8ry5P:null,kSWEuD:null,kDUl1X:null,kPef9Z:null,kfdmCh:null,kMwMTN:`astryx1heor9g`,kMv6JI:`astryxjb2p0i`,k9WMMc:`astryx1yc453h`,kB7OPa:`astryx9f619`,kzqmXN:`astryxh8yej3`,$$css:!0},drawerItem:{kZCmMZ:`astryx31w388`,kE3dHu:null,kpe85a:null,kGNEyG:`astryx1cy8zhl`,kybGjl:`astryx1hl2dhg`,k1TLXF:null,kMnn75:null,kmVMDM:null,kNySMw:null,$$css:!0}},V.displayName=`TopNavMegaMenuItem`,V.__docgenInfo={description:`An individual item inside an TopNavMegaMenu.

Renders itself in both desktop (popover grid) and mobile drawer modes
using TopNavRenderContext to switch appearance.

@example
\`\`\`
<TopNavMegaMenu
  label="Products"
  items={
    <>
      <TopNavMegaMenuItem
        title="Analytics"
        description="Track and analyze user behavior"
        icon={<ChartIcon />}
        href="/analytics"
      />
      <TopNavMegaMenuItem title="Reports" href="/reports" />
    </>
  }
/>
\`\`\``,methods:[],displayName:`TopNavMegaMenuItem`,props:{ref:{required:!1,tsType:{name:`ReactRef`,raw:`React.Ref<HTMLElement>`,elements:[{name:`HTMLElement`}]},description:``},title:{required:!0,tsType:{name:`string`},description:`Display title for the menu item.`},description:{required:!1,tsType:{name:`string`},description:`Optional description text displayed below the title.`},icon:{required:!1,tsType:{name:`ReactNode`},description:`Optional icon element displayed to the left.`},href:{required:!1,tsType:{name:`string`},description:`URL to navigate to when clicked.`},onClick:{required:!1,tsType:{name:`signature`,type:`function`,raw:`() => void`,signature:{arguments:[],return:{name:`void`}}},description:`Callback when item is clicked.`},as:{required:!1,tsType:{name:`ElementType`},description:"Custom component to render instead of `<a>` for link items.\nOverrides the provider-level default set by LinkProvider."}},composes:[`Omit`]}})))()}function Ye({ref:e,title:t,description:n,image:i,imageAlt:a,linkLabel:o,linkHref:s,children:l,xstyle:d,className:f,style:p,...m}){let g=ne();return(0,U.jsxs)(`div`,{ref:e,...c(u(`top-nav-mega-menu-featured-card`),r(Xe.root,d),f,p),...m,children:[i&&(0,U.jsx)(`img`,{src:i,alt:a??``,role:a?void 0:`presentation`,"aria-hidden":!a||void 0,className:`astryxh8yej3 astryxhjk10j astryxl1xv1r astryx1lliihq`}),(0,U.jsxs)(`div`,{className:`astryx78zum5 astryxdt5ytf astryx1txdalj astryx1shk3sm`,children:[(0,U.jsx)(`span`,{className:`astryxcr08ib astryx2mo6ok astryx1kq96og astryx1tgivj0`,children:t}),n&&(0,U.jsx)(`span`,{className:`astryx141an7d astryx1ltkj2j astryxv1l7n4`,children:n}),o&&s&&(0,U.jsxs)(g,{href:s,className:`astryx141an7d astryx2mo6ok astryx1ltkj2j astryxjse4m1 astryx1hl2dhg`,children:[o,` `,(0,U.jsx)(`span`,{...r(Xe.linkArrow,h.mirror),children:`→`})]}),l]})]})}var U,Xe;function Ze(){return(Ze=t((()=>{n(),i(),g(),E(),d(),U=s(),Xe={root:{k1xSpc:`astryx78zum5`,kXwgrk:`astryxdt5ytf`,$$css:!0},linkArrow:{k1xSpc:`astryx1rg5ohu`,$$css:!0}},Ye.displayName=`TopNavMegaMenuFeaturedCard`,Ye.__docgenInfo={description:`Standard featured card for the TopNavMegaMenu \`featured\` slot.

Provides a consistent card with optional image, title, description,
and CTA link. For fully custom content, pass any ReactNode directly
to the \`featured\` slot instead.

@example
\`\`\`
<TopNavMegaMenu
  label="Products"
  items={...}
  featured={
    <TopNavMegaMenuFeaturedCard
      title="What's new in v4.0"
      description="AI-powered analytics and real-time collaboration."
      image="https://example.com/promo.jpg"
      imageAlt="Team collaboration"
      linkLabel="Read the announcement"
      linkHref="/blog/v4"
    />
  }
/>
\`\`\``,methods:[],displayName:`TopNavMegaMenuFeaturedCard`,props:{xstyle:{required:!1,tsType:{name:`StyleXStyles`},description:"StyleX styles created via `stylex.create()`. Merged with the component's\nbase styles inside a single `stylex.props()` call for optimal deduplication.\n\n@example\n```\nconst overrides = stylex.create({ root: { marginBottom: 8 } });\n<Component xstyle={overrides.root} />\n```"},ref:{required:!1,tsType:{name:`ReactRef`,raw:`React.Ref<HTMLDivElement>`,elements:[{name:`HTMLDivElement`}]},description:``},title:{required:!0,tsType:{name:`string`},description:`Card title.`},description:{required:!1,tsType:{name:`string`},description:`Description text below the title.`},image:{required:!1,tsType:{name:`string`},description:`Optional image URL displayed above the body.`},imageAlt:{required:!1,tsType:{name:`string`},description:'Alt text for the image.\n\nWhen omitted, the image is explicitly decorative (`alt=""` +\n`role="presentation"` + `aria-hidden`, matching Avatar) and hidden from\nassistive technology. Since the card already has a visible `title`, a\ndecorative image is usually correct; pass `imageAlt` only when the image\nconveys information beyond the title and description.'},linkLabel:{required:!1,tsType:{name:`string`},description:`CTA link text.`},linkHref:{required:!1,tsType:{name:`string`},description:`CTA link URL.`},children:{required:!1,tsType:{name:`ReactNode`},description:`Custom content rendered below the standard body.`}},composes:[`Omit`]}})))()}function Qe({title:e,titleId:t,...n},r){return W.createElement(`svg`,Object.assign({xmlns:`http://www.w3.org/2000/svg`,fill:`none`,viewBox:`0 0 24 24`,strokeWidth:1.5,stroke:`currentColor`,"aria-hidden":`true`,"data-slot":`icon`,ref:r,"aria-labelledby":t},n),e?W.createElement(`title`,{id:t},e):null,W.createElement(`path`,{strokeLinecap:`round`,strokeLinejoin:`round`,d:`m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z`}))}var W,$e;function et(){return(et=t((()=>{W=e(n()),$e=W.forwardRef(Qe)})))()}function tt({title:e,titleId:t,...n},r){return G.createElement(`svg`,Object.assign({xmlns:`http://www.w3.org/2000/svg`,fill:`none`,viewBox:`0 0 24 24`,strokeWidth:1.5,stroke:`currentColor`,"aria-hidden":`true`,"data-slot":`icon`,ref:r,"aria-labelledby":t},n),e?G.createElement(`title`,{id:t},e):null,G.createElement(`path`,{strokeLinecap:`round`,strokeLinejoin:`round`,d:`M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5`}))}var G,K;function nt(){return(nt=t((()=>{G=e(n()),K=G.forwardRef(tt)})))()}var rt,q,it,J,Y,X,Z,Q,$,at;function ot(){return(ot=t((()=>{rt=n(),Ee(),we(),Te(),Ve(),Ke(),Je(),Ze(),be(),w(),Me(),Ae(),Ie(),et(),nt(),Pe(),Re(),q=s(),it={title:`Core/TopNavMenu`,component:N,tags:[`autodocs`],parameters:{layout:`fullscreen`}},J={render:()=>(0,q.jsx)(A,{label:`Main navigation`,heading:(0,q.jsx)(j,{heading:`My App`,logo:(0,q.jsx)(xe,{icon:(0,q.jsx)(Ne,{style:{width:16,height:16}})}),headingHref:`#`}),startContent:(0,q.jsxs)(q.Fragment,{children:[(0,q.jsx)(M,{label:`Home`,href:`#`,isSelected:!0}),(0,q.jsx)(N,{label:`Products`,items:[{title:`Analytics`,description:`Track and analyze user behavior`,icon:(0,q.jsx)(je,{style:{width:20,height:20}}),href:`#analytics`},{title:`Security`,description:`Enterprise-grade protection`,icon:(0,q.jsx)(Le,{style:{width:20,height:20}}),href:`#security`},{title:`Automation`,description:`Streamline your workflows`,icon:(0,q.jsx)($e,{style:{width:20,height:20}}),href:`#automation`},{title:`Developer Tools`,description:`APIs, SDKs, and CLI tools`,icon:(0,q.jsx)(K,{style:{width:20,height:20}}),href:`#dev-tools`}]}),(0,q.jsx)(M,{label:`Pricing`,href:`#`})]}),endContent:(0,q.jsx)(T,{label:`Profile`,variant:`ghost`,icon:(0,q.jsx)(ze,{style:{width:16,height:16}}),isIconOnly:!0})})},Y={render:()=>(0,q.jsx)(A,{label:`Main navigation`,heading:(0,q.jsx)(j,{heading:`My App`,headingHref:`#`}),startContent:(0,q.jsx)(N,{label:`Actions`,items:[{title:`Invite teammates`,description:`Send an invite by email`,icon:(0,q.jsx)(ze,{style:{width:20,height:20}}),onClick:()=>{}},{title:`Run automation`,description:`Start the default workflow`,icon:(0,q.jsx)($e,{style:{width:20,height:20}}),onClick:()=>{}}]})})},X={name:`Multiple Menus`,render:()=>(0,q.jsx)(A,{label:`Main navigation`,heading:(0,q.jsx)(j,{heading:`Platform`,headingHref:`#`}),startContent:(0,q.jsxs)(q.Fragment,{children:[(0,q.jsx)(N,{label:`Products`,items:[{title:`Analytics`,description:`Track behavior`,icon:(0,q.jsx)(je,{style:{width:20,height:20}}),href:`#`},{title:`Security`,description:`Enterprise protection`,icon:(0,q.jsx)(Le,{style:{width:20,height:20}}),href:`#`}]}),(0,q.jsx)(N,{label:`Resources`,items:[{title:`Documentation`,href:`#`},{title:`API Reference`,href:`#`},{title:`Community Forum`,href:`#`}]}),(0,q.jsx)(M,{label:`Pricing`,href:`#`})]})})},Z={name:`Mega Menu`,render:function(){let[,e]=(0,rt.useState)(!1);return(0,q.jsx)(`div`,{style:{position:`relative`},children:(0,q.jsx)(A,{label:`Marketing navigation`,heading:(0,q.jsx)(j,{heading:`Acme`,logo:(0,q.jsx)(xe,{icon:(0,q.jsx)(Ne,{style:{width:16,height:16}})}),headingHref:`#`}),startContent:(0,q.jsxs)(q.Fragment,{children:[(0,q.jsx)(He,{label:`Products`,onOpenChange:e,items:(0,q.jsxs)(q.Fragment,{children:[(0,q.jsx)(V,{title:`Analytics`,description:`Track and analyze user behavior across your apps`,icon:(0,q.jsx)(je,{style:{width:20,height:20}}),href:`#analytics`}),(0,q.jsx)(V,{title:`Security`,description:`Enterprise-grade protection for your data`,icon:(0,q.jsx)(Le,{style:{width:20,height:20}}),href:`#security`}),(0,q.jsx)(V,{title:`Automation`,description:`Streamline workflows with intelligent tools`,icon:(0,q.jsx)($e,{style:{width:20,height:20}}),href:`#automation`}),(0,q.jsx)(V,{title:`Developer Tools`,description:`APIs, SDKs, and CLI for integration`,icon:(0,q.jsx)(K,{style:{width:20,height:20}}),href:`#dev-tools`}),(0,q.jsx)(V,{title:`Global Network`,description:`Low-latency edge infra in 40+ regions`,icon:(0,q.jsx)(Fe,{style:{width:20,height:20}}),href:`#network`})]}),featured:(0,q.jsx)(Ye,{title:`What's new in v4.0`,description:`AI-powered analytics and real-time collaboration.`,image:`https://images.unsplash.com/photo-1551434678-e076c223a692?w=560&h=280&fit=crop`,imageAlt:`Team collaboration`,linkLabel:`Read the announcement`,linkHref:`#announcement`})}),(0,q.jsx)(M,{label:`Pricing`,href:`#`}),(0,q.jsx)(M,{label:`Docs`,href:`#`})]}),endContent:(0,q.jsxs)(q.Fragment,{children:[(0,q.jsx)(T,{label:`Sign in`,variant:`ghost`}),(0,q.jsx)(T,{label:`Get started`,variant:`primary`})]})})})}},Q={name:`Mega Menu (Simple)`,render:()=>(0,q.jsx)(`div`,{style:{position:`relative`},children:(0,q.jsx)(A,{label:`Simple navigation`,heading:(0,q.jsx)(j,{heading:`App`,headingHref:`#`}),startContent:(0,q.jsxs)(q.Fragment,{children:[(0,q.jsx)(M,{label:`Home`,href:`#`,isSelected:!0}),(0,q.jsx)(He,{label:`Features`,items:(0,q.jsxs)(q.Fragment,{children:[(0,q.jsx)(V,{title:`Dashboard`,description:`Overview of your key metrics`,icon:(0,q.jsx)(je,{style:{width:20,height:20}}),href:`#`}),(0,q.jsx)(V,{title:`Integrations`,description:`Connect with your favorite tools`,icon:(0,q.jsx)(K,{style:{width:20,height:20}}),href:`#`}),(0,q.jsx)(V,{title:`API Access`,description:`Programmatic access to all features`,icon:(0,q.jsx)(Fe,{style:{width:20,height:20}}),href:`#`})]})})]}),endContent:(0,q.jsx)(T,{label:`Sign in`,variant:`primary`})})})},$={name:`Featured card / Link arrow`,render:()=>(0,q.jsx)(`div`,{style:{width:`max-content`},children:(0,q.jsx)(Ye,{title:`New`,linkLabel:`Read the announcement`,linkHref:`#announcement`})})},J.parameters={...J.parameters,docs:{...J.parameters?.docs,source:{originalSource:`{
  render: () => <TopNav label="Main navigation" heading={<TopNavHeading heading="My App" logo={<NavIcon icon={<CubeIcon style={{
    width: 16,
    height: 16
  }} />} />} headingHref="#" />} startContent={<>
          <TopNavItem label="Home" href="#" isSelected />
          <TopNavMenu label="Products" items={[{
      title: 'Analytics',
      description: 'Track and analyze user behavior',
      icon: <ChartBarIcon style={{
        width: 20,
        height: 20
      }} />,
      href: '#analytics'
    }, {
      title: 'Security',
      description: 'Enterprise-grade protection',
      icon: <ShieldCheckIcon style={{
        width: 20,
        height: 20
      }} />,
      href: '#security'
    }, {
      title: 'Automation',
      description: 'Streamline your workflows',
      icon: <BoltIcon style={{
        width: 20,
        height: 20
      }} />,
      href: '#automation'
    }, {
      title: 'Developer Tools',
      description: 'APIs, SDKs, and CLI tools',
      icon: <CodeBracketIcon style={{
        width: 20,
        height: 20
      }} />,
      href: '#dev-tools'
    }]} />
          <TopNavItem label="Pricing" href="#" />
        </>} endContent={<Button label="Profile" variant="ghost" icon={<UserCircleIcon style={{
    width: 16,
    height: 16
  }} />} isIconOnly />} />
}`,...J.parameters?.docs?.source},description:{story:`Basic hover-triggered nav menu with 4 items, each with icon, title,
and description.`,...J.parameters?.docs?.description}}},Y.parameters={...Y.parameters,docs:{...Y.parameters?.docs,source:{originalSource:`{
  render: () => <TopNav label="Main navigation" heading={<TopNavHeading heading="My App" headingHref="#" />} startContent={<TopNavMenu label="Actions" items={[{
    title: 'Invite teammates',
    description: 'Send an invite by email',
    icon: <UserCircleIcon style={{
      width: 20,
      height: 20
    }} />,
    onClick: () => {}
  }, {
    title: 'Run automation',
    description: 'Start the default workflow',
    icon: <BoltIcon style={{
      width: 20,
      height: 20
    }} />,
    onClick: () => {}
  }]} />} />
}`,...Y.parameters?.docs?.source},description:{story:"A nav menu of action items (no destinations): each runs its `onClick`.",...Y.parameters?.docs?.description}}},X.parameters={...X.parameters,docs:{...X.parameters?.docs,source:{originalSource:`{
  name: 'Multiple Menus',
  render: () => <TopNav label="Main navigation" heading={<TopNavHeading heading="Platform" headingHref="#" />} startContent={<>
          <TopNavMenu label="Products" items={[{
      title: 'Analytics',
      description: 'Track behavior',
      icon: <ChartBarIcon style={{
        width: 20,
        height: 20
      }} />,
      href: '#'
    }, {
      title: 'Security',
      description: 'Enterprise protection',
      icon: <ShieldCheckIcon style={{
        width: 20,
        height: 20
      }} />,
      href: '#'
    }]} />
          <TopNavMenu label="Resources" items={[{
      title: 'Documentation',
      href: '#'
    }, {
      title: 'API Reference',
      href: '#'
    }, {
      title: 'Community Forum',
      href: '#'
    }]} />
          <TopNavItem label="Pricing" href="#" />
        </>} />
}`,...X.parameters?.docs?.source},description:{story:`Multiple nav menus side by side. Hovering one closes the other
(standard hover-menu behavior).`,...X.parameters?.docs?.description}}},Z.parameters={...Z.parameters,docs:{...Z.parameters?.docs,source:{originalSource:`{
  name: 'Mega Menu',
  render: function MegaMenuStory() {
    const [, setMenuOpen] = useState(false);
    return <div style={{
      position: 'relative'
    }}>
        <TopNav label="Marketing navigation" heading={<TopNavHeading heading="Acme" logo={<NavIcon icon={<CubeIcon style={{
        width: 16,
        height: 16
      }} />} />} headingHref="#" />} startContent={<>
              <TopNavMegaMenu label="Products" onOpenChange={setMenuOpen} items={<>
                    <TopNavMegaMenuItem title="Analytics" description="Track and analyze user behavior across your apps" icon={<ChartBarIcon style={{
            width: 20,
            height: 20
          }} />} href="#analytics" />
                    <TopNavMegaMenuItem title="Security" description="Enterprise-grade protection for your data" icon={<ShieldCheckIcon style={{
            width: 20,
            height: 20
          }} />} href="#security" />
                    <TopNavMegaMenuItem title="Automation" description="Streamline workflows with intelligent tools" icon={<BoltIcon style={{
            width: 20,
            height: 20
          }} />} href="#automation" />
                    <TopNavMegaMenuItem title="Developer Tools" description="APIs, SDKs, and CLI for integration" icon={<CodeBracketIcon style={{
            width: 20,
            height: 20
          }} />} href="#dev-tools" />
                    <TopNavMegaMenuItem title="Global Network" description="Low-latency edge infra in 40+ regions" icon={<GlobeAltIcon style={{
            width: 20,
            height: 20
          }} />} href="#network" />
                  </>} featured={<TopNavMegaMenuFeaturedCard title="What's new in v4.0" description="AI-powered analytics and real-time collaboration." image="https://images.unsplash.com/photo-1551434678-e076c223a692?w=560&h=280&fit=crop" imageAlt="Team collaboration" linkLabel="Read the announcement" linkHref="#announcement" />} />
              <TopNavItem label="Pricing" href="#" />
              <TopNavItem label="Docs" href="#" />
            </>} endContent={<>
              <Button label="Sign in" variant="ghost" />
              <Button label="Get started" variant="primary" />
            </>} />
      </div>;
  }
}`,...Z.parameters?.docs?.source},description:{story:`Full-width mega menu with composed children API.`,...Z.parameters?.docs?.description}}},Q.parameters={...Q.parameters,docs:{...Q.parameters?.docs,source:{originalSource:`{
  name: 'Mega Menu (Simple)',
  render: () => <div style={{
    position: 'relative'
  }}>
      <TopNav label="Simple navigation" heading={<TopNavHeading heading="App" headingHref="#" />} startContent={<>
            <TopNavItem label="Home" href="#" isSelected />
            <TopNavMegaMenu label="Features" items={<>
                  <TopNavMegaMenuItem title="Dashboard" description="Overview of your key metrics" icon={<ChartBarIcon style={{
          width: 20,
          height: 20
        }} />} href="#" />
                  <TopNavMegaMenuItem title="Integrations" description="Connect with your favorite tools" icon={<CodeBracketIcon style={{
          width: 20,
          height: 20
        }} />} href="#" />
                  <TopNavMegaMenuItem title="API Access" description="Programmatic access to all features" icon={<GlobeAltIcon style={{
          width: 20,
          height: 20
        }} />} href="#" />
                </>} />
          </>} endContent={<Button label="Sign in" variant="primary" />} />
    </div>
}`,...Q.parameters?.docs?.source},description:{story:`Mega menu without the featured content area — just the items grid.`,...Q.parameters?.docs?.description}}},$.parameters={...$.parameters,docs:{...$.parameters?.docs,source:{originalSource:`{
  name: 'Featured card / Link arrow',
  render: () => <div style={{
    width: 'max-content'
  }}>
      <TopNavMegaMenuFeaturedCard title="New" linkLabel="Read the announcement" linkHref="#announcement" />
    </div>
}`,...$.parameters?.docs?.source},description:{story:`Fixture for the RTL audit: a featured card shrink-wrapped to its link, so the
link box is the label and its arrow, and the arrow's side of the label can be
measured in both directions.`,...$.parameters?.docs?.description}}},at=[`Default`,`ActionItems`,`MultipleMenus`,`MegaMenu`,`MegaMenuSimple`,`FeaturedCardLinkArrow`]})))()}ot();export{Y as ActionItems,J as Default,$ as FeaturedCardLinkArrow,Z as MegaMenu,Q as MegaMenuSimple,X as MultipleMenus,at as __namedExportsOrder,it as default};