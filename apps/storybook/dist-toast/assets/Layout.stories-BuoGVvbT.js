import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{n as t,t as n}from"./stylex-BSlGVhGe.js";import{i as r,n as i,r as a,t as o}from"./LayoutContent-BEmJ3Yl2.js";import{t as ee}from"./jsx-runtime-MKhVqBIO.js";import{n as te,t as s}from"./LayoutHeader-ewlJxePS.js";import{n as ne,t as c}from"./LayoutPanel-BWGJdNoy.js";import{n as re,t as l}from"./AppShell-BYFBfdFp.js";import{n as ie,t as u}from"./Button-DoGM0DEN.js";import{n as ae,t as d}from"./container.stylex-CpZmVsV6.js";import{n as oe,t as se}from"./Divider-DkevuVb8.js";import{n as f,t as p}from"./Card-DA0ZfoAz.js";import{n as ce,t as m}from"./HStack-D5idGciI.js";import{n as le,t as h}from"./VStack-SWtDePqc.js";import{n as ue,t as g}from"./Section-g5hpGOnN.js";import{n as de,t as _}from"./LayoutFooter-aEVnoSty.js";import{n as fe,t as pe}from"./neutralTheme-BXK-s1F0.js";import{a as me,c as he,i as ge,o as v}from"./iframe-B7UFaprG.js";var y,b,x,S,C,w,T,E,D,O,k,A,j,M,N,P,F,I,L,R,z,B,V,H,U,W,G,K,q,J,Y,X,Z,Q;function $(){return($=e((()=>{n(),f(),ue(),r(),te(),de(),i(),ne(),ae(),ce(),le(),ie(),oe(),re(),he(),ge(),pe(),y=ee(),b={storySection:{kmVPX3:`x1shk3sm`,kg3NbH:null,kuDDbn:null,kE3dHu:null,kP0aTx:null,kpe85a:null,k8WAf4:null,kLKAdn:null,kGO01o:null,kWkggS:`x1eiddq6`,$$css:!0},demoContainer:{kWkggS:`x1de1mus`,kaIpWk:`x1hviunn`,krdFHd:null,kfmiAY:null,kVL7Gh:null,kT0f0o:null,kIxVMA:null,ksF3WI:null,kqGeR4:null,kYm2EN:null,kGVxlE:`x1i5ehqx`,$$css:!0},demoSize:{kzqmXN:`xdzyupr`,kZKoxP:`x1isuwpm`,$$css:!0},scrollbarProbeContent:{kZ7BSC:`x185mbhu`,$$css:!0}},x=({active:e,children:t})=>(0,y.jsx)(`div`,{...{0:{className:`x1s1e50u x1kogg8i x1ypdohk x1tgivj0 x9ynric xif65rj xjbqb8w x1uwx2nv`},1:{className:`x1s1e50u x1kogg8i x1ypdohk x9ynric xif65rj xgcxg3y xjse4m1`}}[!!e|0],children:t}),S=({id:e,label:t})=>(0,y.jsxs)(o,{"data-scrollbar-case":e,label:`${t} content`,role:`region`,tabIndex:0,xstyle:b.scrollbarProbeContent,children:[(0,y.jsx)(`p`,{className:`x1ghz6dp x9ynric xif65rj x1evy7pa xv1l7n4`,children:`Scroll this content to confirm its scrollbar stays on the outer edge of the content area.`}),Array.from({length:8},(e,n)=>(0,y.jsxs)(`div`,{className:`xspzpui xur7f20 x1shk3sm xv1l7n4 x9ynric xif65rj`,children:[t,` content block `,n+1]},n))]}),C={title:`Core/Layout`,component:a,tags:[`autodocs`],parameters:{controls:{expanded:!1},docs:{description:{component:"\nThe Astryx Layout System provides a structured way to build page and component layouts.\n\n**Components:**\n- `Card` - Card container with shadow\n- `Section` - Section container with background variants\n- `Layout` - Arranges content into header, content, footer, and panel slots\n- `LayoutHeader` - Header slot with optional divider\n- `LayoutContent` - Scrollable main content area\n- `LayoutFooter` - Footer slot with optional divider\n- `LayoutPanel` - Side panel slots (start/end) with optional divider\n        "}}},argTypes:{content:{table:{disable:!0}},end:{table:{disable:!0}},footer:{table:{disable:!0}},header:{table:{disable:!0}},height:{table:{disable:!0}},padding:{table:{disable:!0}},start:{table:{disable:!0}}}},w={name:`Playground`,args:{cardWidth:700,cardHeight:400,layoutPadding:4,showHeader:!0,headerHasDivider:!0,headerPadding:4,contentPadding:4,contentIsScrollable:!0,showFooter:!0,footerHasDivider:!0,footerPadding:4,showStartPanel:!0,startPanelWidth:160,startPanelHasDivider:!0,startPanelIsScrollable:!0,showEndPanel:!1,endPanelWidth:200,endPanelHasDivider:!0,endPanelIsScrollable:!0},argTypes:{cardWidth:{control:{type:`range`,min:300,max:1e3,step:50},description:`Width of the card container`,table:{category:`Card`}},cardHeight:{control:{type:`range`,min:200,max:600,step:50},description:`Height of the card container`,table:{category:`Card`}},layoutPadding:{control:{type:`range`,min:0,max:8,step:1},description:`Padding at layout outer edges (0 for full bleed)`,table:{category:`Layout`}},showHeader:{control:`boolean`,description:`Show or hide the header`,table:{category:`Header`}},headerHasDivider:{control:`boolean`,description:`Add a border below the header`,table:{category:`Header`}},headerPadding:{control:{type:`range`,min:0,max:8,step:1},description:`Header padding (0 for full bleed)`,table:{category:`Header`}},contentPadding:{control:{type:`range`,min:0,max:8,step:1},description:`Content padding (0 for edge-to-edge content)`,table:{category:`Content`}},contentIsScrollable:{control:`boolean`,description:`Enable scrollable overflow`,table:{category:`Content`}},showFooter:{control:`boolean`,description:`Show or hide the footer`,table:{category:`Footer`}},footerHasDivider:{control:`boolean`,description:`Add a border above the footer`,table:{category:`Footer`}},footerPadding:{control:{type:`range`,min:0,max:8,step:1},description:`Footer padding (0 for full bleed)`,table:{category:`Footer`}},showStartPanel:{control:`boolean`,description:`Show or hide the start (left) panel`,table:{category:`Start Panel`}},startPanelWidth:{control:{type:`range`,min:100,max:300,step:20},description:`Width of the start panel`,table:{category:`Start Panel`}},startPanelHasDivider:{control:`boolean`,description:`Add a border to the start panel`,table:{category:`Start Panel`}},startPanelIsScrollable:{control:`boolean`,description:`Enable scrollable overflow for start panel`,table:{category:`Start Panel`}},showEndPanel:{control:`boolean`,description:`Show or hide the end (right) panel`,table:{category:`End Panel`}},endPanelWidth:{control:{type:`range`,min:100,max:300,step:20},description:`Width of the end panel`,table:{category:`End Panel`}},endPanelHasDivider:{control:`boolean`,description:`Add a border to the end panel`,table:{category:`End Panel`}},endPanelIsScrollable:{control:`boolean`,description:`Enable scrollable overflow for end panel`,table:{category:`End Panel`}}},render:e=>(0,y.jsx)(`div`,{className:`x1egiwwb x1eiddq6 x1shk3sm`,children:(0,y.jsx)(p,{width:e.cardWidth,height:e.cardHeight,children:(0,y.jsx)(a,{padding:e.layoutPadding,header:e.showHeader?(0,y.jsx)(s,{hasDivider:e.headerHasDivider,padding:e.headerPadding,children:(0,y.jsx)(`h3`,{className:`x1ghz6dp x9ynric xosj86m x1s688f x1tgivj0`,children:`Layout Header`})}):void 0,start:e.showStartPanel?(0,y.jsxs)(c,{width:e.startPanelWidth,hasDivider:e.startPanelHasDivider,isScrollable:e.startPanelIsScrollable,role:`navigation`,children:[(0,y.jsx)(x,{active:!0,children:`Dashboard`}),(0,y.jsx)(x,{children:`Settings`}),(0,y.jsx)(x,{children:`Profile`}),(0,y.jsx)(x,{children:`Help`})]}):void 0,content:(0,y.jsxs)(o,{padding:e.contentPadding,isScrollable:e.contentIsScrollable,children:[(0,y.jsx)(`h4`,{className:`x1ghz6dp x9ynric xif65rj xk50ysn xv1l7n4`,children:`Main Content Area`}),(0,y.jsx)(`br`,{}),(0,y.jsx)(`p`,{className:`x1ghz6dp x9ynric xif65rj x1evy7pa xv1l7n4`,children:`This is the main content area. Use the controls panel to toggle headers, footers, side panels, and adjust their properties.`}),(0,y.jsx)(`br`,{}),(0,y.jsx)(`p`,{className:`x1ghz6dp x9ynric xif65rj x1evy7pa xv1l7n4`,children:`Try setting padding to 0 to see how content can extend to the edges, or toggle "isScrollable" to change overflow behavior.`}),(0,y.jsx)(`br`,{}),(0,y.jsx)(`div`,{className:`xspzpui xur7f20 x1shk3sm xv1l7n4 x9ynric xif65rj`,children:`Placeholder content block`})]}),end:e.showEndPanel?(0,y.jsxs)(c,{width:e.endPanelWidth,hasDivider:e.endPanelHasDivider,isScrollable:e.endPanelIsScrollable,role:`complementary`,children:[(0,y.jsx)(`p`,{className:`xrcdmg7 x9ynric xfifm61 x1s688f xtvhhri x2ujxvm xv1l7n4`,children:`Details`}),(0,y.jsx)(`p`,{className:`x1ghz6dp x9ynric xif65rj x1evy7pa xv1l7n4`,children:`Additional information or actions can go in the end panel.`})]}):void 0,footer:e.showFooter?(0,y.jsx)(_,{hasDivider:e.footerHasDivider,padding:e.footerPadding,children:(0,y.jsxs)(m,{gap:2,hAlign:`end`,children:[(0,y.jsx)(u,{label:`Cancel`,variant:`secondary`,children:`Cancel`}),(0,y.jsx)(u,{label:`Save`,variant:`primary`,children:`Save`})]})}):void 0})})})},T={name:`Basic Card Layout`,render:()=>(0,y.jsx)(`div`,{className:`x1egiwwb x1eiddq6 x1shk3sm`,children:(0,y.jsx)(p,{width:400,height:350,children:(0,y.jsx)(a,{header:(0,y.jsx)(s,{hasDivider:!0,children:(0,y.jsx)(`h3`,{className:`x1ghz6dp x9ynric xosj86m x1s688f x1tgivj0`,children:`Card Title`})}),content:(0,y.jsxs)(o,{children:[(0,y.jsx)(`p`,{className:`x1ghz6dp x9ynric xif65rj x1evy7pa xv1l7n4`,children:`This is a basic card layout with a header, scrollable content area, and footer. The layout automatically handles padding and spacing between sections.`}),(0,y.jsx)(`br`,{}),(0,y.jsx)(`p`,{className:`x1ghz6dp x9ynric xif65rj x1evy7pa xv1l7n4`,children:`Try scrolling this content area when it overflows.`})]}),footer:(0,y.jsx)(_,{hasDivider:!0,children:(0,y.jsxs)(m,{gap:2,hAlign:`end`,children:[(0,y.jsx)(u,{label:`Cancel`,variant:`secondary`,children:`Cancel`}),(0,y.jsx)(u,{label:`Save`,variant:`primary`,children:`Save`})]})})})})})},E={name:`Layout with Sidebar`,render:()=>(0,y.jsx)(`div`,{className:`x1egiwwb x1eiddq6 x1shk3sm`,children:(0,y.jsx)(p,{width:700,height:400,children:(0,y.jsx)(a,{header:(0,y.jsx)(s,{hasDivider:!0,children:(0,y.jsx)(`h3`,{className:`x1ghz6dp x9ynric xosj86m x1s688f x1tgivj0`,children:`Settings`})}),start:(0,y.jsxs)(c,{hasDivider:!0,role:`navigation`,children:[(0,y.jsx)(x,{active:!0,children:`General`}),(0,y.jsx)(x,{children:`Account`}),(0,y.jsx)(x,{children:`Privacy`}),(0,y.jsx)(x,{children:`Notifications`}),(0,y.jsx)(x,{children:`Security`})]}),content:(0,y.jsxs)(o,{children:[(0,y.jsx)(`h4`,{className:`x1ghz6dp x9ynric xif65rj xk50ysn xv1l7n4`,children:`General Settings`}),(0,y.jsx)(`br`,{}),(0,y.jsx)(`p`,{className:`x1ghz6dp x9ynric xif65rj x1evy7pa xv1l7n4`,children:`Configure your general preferences here. The sidebar navigation allows you to switch between different settings sections.`})]}),footer:(0,y.jsx)(_,{hasDivider:!0,children:(0,y.jsxs)(m,{gap:2,hAlign:`end`,children:[(0,y.jsx)(u,{label:`Reset`,variant:`secondary`,children:`Reset`}),(0,y.jsx)(u,{label:`Save Changes`,variant:`primary`,children:`Save Changes`})]})})})})})},D={name:`Dual Panel Layout`,render:()=>(0,y.jsx)(`div`,{className:`x1eiddq6 x1shk3sm x1jn0hjm`,children:(0,y.jsx)(p,{width:`100%`,maxWidth:800,height:400,children:(0,y.jsx)(a,{header:(0,y.jsx)(s,{hasDivider:!0,children:(0,y.jsx)(`h3`,{className:`x1ghz6dp x9ynric xosj86m x1s688f x1tgivj0`,children:`File Browser`})}),start:(0,y.jsxs)(c,{hasDivider:!0,children:[(0,y.jsx)(`p`,{className:`xrcdmg7 x9ynric xfifm61 x1s688f xtvhhri x2ujxvm xv1l7n4`,children:`Folders`}),(0,y.jsx)(x,{children:`Documents`}),(0,y.jsx)(x,{active:!0,children:`Projects`}),(0,y.jsx)(x,{children:`Downloads`})]}),content:(0,y.jsxs)(o,{children:[(0,y.jsx)(`p`,{className:`xrcdmg7 x9ynric xfifm61 x1s688f xtvhhri x2ujxvm xv1l7n4`,children:`Files`}),(0,y.jsx)(`div`,{className:`xspzpui xur7f20 x1shk3sm xv1l7n4 x9ynric xif65rj`,children:`Select a folder to view its contents`})]}),end:(0,y.jsxs)(c,{hasDivider:!0,children:[(0,y.jsx)(`p`,{className:`xrcdmg7 x9ynric xfifm61 x1s688f xtvhhri x2ujxvm xv1l7n4`,children:`Details`}),(0,y.jsx)(`p`,{className:`x1ghz6dp x9ynric xif65rj x1evy7pa xv1l7n4`,children:`Select a file to view details`})]})})})})},O={name:`Without Dividers`,render:()=>(0,y.jsx)(`div`,{className:`x1egiwwb x1eiddq6 x1shk3sm`,children:(0,y.jsx)(p,{width:400,height:350,children:(0,y.jsx)(a,{header:(0,y.jsx)(s,{children:(0,y.jsx)(`h3`,{className:`x1ghz6dp x9ynric xosj86m x1s688f x1tgivj0`,children:`Seamless Layout`})}),content:(0,y.jsx)(o,{children:(0,y.jsx)(`p`,{className:`x1ghz6dp x9ynric xif65rj x1evy7pa xv1l7n4`,children:`When dividers are not used, the layout automatically collapses spacing between sections for a smooth visual flow.`})}),footer:(0,y.jsx)(_,{children:(0,y.jsx)(m,{gap:2,hAlign:`end`,children:(0,y.jsx)(u,{label:`Continue`,variant:`primary`,children:`Continue`})})})})})})},k={name:`Full Bleed Content`,render:()=>(0,y.jsx)(`div`,{className:`x1egiwwb x1eiddq6 x1shk3sm`,children:(0,y.jsx)(p,{width:400,height:350,children:(0,y.jsx)(a,{header:(0,y.jsx)(s,{hasDivider:!0,children:(0,y.jsx)(`h3`,{className:`x1ghz6dp x9ynric xosj86m x1s688f x1tgivj0`,children:`Full Bleed Example`})}),content:(0,y.jsx)(o,{padding:0,children:(0,y.jsx)(`div`,{className:`xspzpui x1shk3sm xv1l7n4 x9ynric xif65rj x11md1zd`,children:`This content uses padding=0 to remove padding, allowing it to touch the edges. Useful for tables, images, or other edge-to-edge content.`})}),footer:(0,y.jsx)(_,{hasDivider:!0,children:(0,y.jsx)(m,{gap:2,hAlign:`end`,children:(0,y.jsx)(u,{label:`Close`,variant:`secondary`,children:`Close`})})})})})})},A={name:`Section Variants`,render:()=>(0,y.jsxs)(h,{gap:6,xstyle:b.storySection,children:[(0,y.jsx)(`p`,{className:`xrcdmg7 x9ynric xfifm61 x1s688f xtvhhri x2ujxvm xv1l7n4`,children:`Section Variants`}),(0,y.jsxs)(m,{gap:4,wrap:`wrap`,children:[(0,y.jsx)(g,{variant:`section`,width:300,height:250,children:(0,y.jsx)(a,{header:(0,y.jsx)(s,{hasDivider:!0,children:(0,y.jsx)(`p`,{className:`x1ghz6dp x9ynric xif65rj xk50ysn xv1l7n4`,children:`Section`})}),content:(0,y.jsx)(o,{children:(0,y.jsx)(`p`,{className:`x1ghz6dp x9ynric xif65rj x1evy7pa xv1l7n4`,children:`Surface background color`})})})}),(0,y.jsx)(g,{variant:`muted`,width:300,height:250,children:(0,y.jsx)(a,{header:(0,y.jsx)(s,{hasDivider:!0,children:(0,y.jsx)(`p`,{className:`x1ghz6dp x9ynric xif65rj xk50ysn xv1l7n4`,children:`Wash`})}),content:(0,y.jsx)(o,{children:(0,y.jsx)(`p`,{className:`x1ghz6dp x9ynric xif65rj x1evy7pa xv1l7n4`,children:`Wash background color`})})})}),(0,y.jsx)(g,{variant:`transparent`,width:300,height:250,children:(0,y.jsx)(a,{header:(0,y.jsx)(s,{hasDivider:!0,children:(0,y.jsx)(`p`,{className:`x1ghz6dp x9ynric xif65rj xk50ysn xv1l7n4`,children:`Transparent`})}),content:(0,y.jsx)(o,{children:(0,y.jsx)(`p`,{className:`x1ghz6dp x9ynric xif65rj x1evy7pa xv1l7n4`,children:`No background, shows parent`})})})})]})]})},j={name:`Content Only`,render:()=>(0,y.jsx)(`div`,{className:`x1egiwwb x1eiddq6 x1shk3sm`,children:(0,y.jsx)(p,{width:400,height:350,children:(0,y.jsx)(a,{content:(0,y.jsxs)(o,{children:[(0,y.jsx)(`h3`,{className:`x1ghz6dp x9ynric xosj86m x1s688f x1tgivj0`,children:`Simple Content`}),(0,y.jsx)(`br`,{}),(0,y.jsx)(`p`,{className:`x1ghz6dp x9ynric xif65rj x1evy7pa xv1l7n4`,children:`A layout can have just content without header or footer. This is useful for simple cards or content blocks.`})]})})})})},M={name:`Closed Regions`,args:{isOpen:!1},argTypes:{isOpen:{control:`boolean`,description:`Open the regions that the closed examples hide`}},render:({isOpen:e})=>(0,y.jsxs)(h,{gap:6,xstyle:b.storySection,children:[(0,y.jsxs)(m,{gap:4,children:[(0,y.jsxs)(h,{gap:2,children:[(0,y.jsx)(`p`,{className:`x1ghz6dp x9ynric xif65rj xk50ysn xv1l7n4`,children:`Slots omitted, padding=6`}),(0,y.jsx)(p,{width:300,height:220,"data-closed-region":`omitted`,children:(0,y.jsx)(a,{padding:6,content:(0,y.jsx)(o,{children:(0,y.jsx)(`p`,{className:`x1ghz6dp x9ynric xif65rj x1evy7pa xv1l7n4`,children:`Content area.`})})})})]}),(0,y.jsxs)(h,{gap:2,children:[(0,y.jsxs)(`p`,{className:`x1ghz6dp x9ynric xif65rj xk50ysn xv1l7n4`,children:[e?`Regions open`:`Regions closed`,`, padding=6`]}),(0,y.jsx)(p,{width:300,height:220,"data-closed-region":`closed`,children:(0,y.jsx)(a,{padding:6,header:e&&(0,y.jsx)(s,{hasDivider:!0,children:(0,y.jsx)(`h3`,{className:`x1ghz6dp x9ynric xosj86m x1s688f x1tgivj0`,children:`Header`})}),start:e&&(0,y.jsx)(c,{width:100,hasDivider:!0,children:(0,y.jsx)(x,{active:!0,children:`Nav`})}),content:(0,y.jsx)(o,{children:(0,y.jsx)(`p`,{className:`x1ghz6dp x9ynric xif65rj x1evy7pa xv1l7n4`,children:`Content area.`})}),footer:e&&(0,y.jsx)(_,{hasDivider:!0,children:(0,y.jsx)(`p`,{className:`x1ghz6dp x9ynric xif65rj x1evy7pa xv1l7n4`,children:`Footer`})})})})]})]}),(0,y.jsxs)(h,{gap:2,children:[(0,y.jsx)(`p`,{className:`x1ghz6dp x9ynric xif65rj xk50ysn xv1l7n4`,children:`contentWidth=400 with the end panel closed`}),(0,y.jsx)(`div`,{"data-closed-region":`content-width`,className:`x1dllhtq x14i3s5s x1hviunn xb3r6kr x11i3ho8 x1u5z0ei`,children:(0,y.jsx)(a,{contentWidth:400,header:(0,y.jsx)(s,{hasDivider:!0,children:(0,y.jsxs)(m,{hAlign:`between`,children:[(0,y.jsx)(`span`,{"data-header-edge":`start`,children:`Header start`}),(0,y.jsx)(`span`,{"data-header-edge":`end`,children:`Header end`})]})}),content:(0,y.jsx)(S,{id:`closed-end`,label:`Closed end panel`}),end:e&&(0,y.jsx)(c,{width:120,hasDivider:!0,children:(0,y.jsx)(`p`,{className:`x1ghz6dp x9ynric xif65rj x1evy7pa xv1l7n4`,children:`Details`})})})})]})]})},N={name:`Themed Layout (Neutral vs Stone)`,render:()=>(0,y.jsxs)(m,{gap:6,xstyle:b.storySection,children:[(0,y.jsxs)(h,{gap:3,children:[(0,y.jsx)(`p`,{className:`xrcdmg7 x9ynric xfifm61 x1s688f xtvhhri x2ujxvm xv1l7n4`,children:`Stone Theme`}),(0,y.jsx)(v,{theme:me,children:(0,y.jsx)(p,{width:400,children:(0,y.jsx)(a,{header:(0,y.jsx)(s,{hasDivider:!0,children:(0,y.jsx)(`h3`,{className:`x1ghz6dp x9ynric xosj86m x1s688f x1tgivj0`,children:`Stone Theme`})}),content:(0,y.jsx)(o,{children:(0,y.jsx)(`p`,{className:`x1ghz6dp x9ynric xif65rj x1evy7pa xv1l7n4`,children:`This card uses the stone theme around the layout areas.`})}),footer:(0,y.jsx)(_,{hasDivider:!0,children:(0,y.jsxs)(m,{gap:2,hAlign:`end`,children:[(0,y.jsx)(u,{label:`Cancel`,variant:`secondary`,children:`Cancel`}),(0,y.jsx)(u,{label:`Save`,variant:`primary`,children:`Save`})]})})})})})]}),(0,y.jsxs)(h,{gap:3,children:[(0,y.jsx)(`p`,{className:`xrcdmg7 x9ynric xfifm61 x1s688f xtvhhri x2ujxvm xv1l7n4`,children:`Neutral Theme`}),(0,y.jsx)(v,{theme:fe,children:(0,y.jsx)(p,{width:400,children:(0,y.jsx)(a,{header:(0,y.jsx)(s,{hasDivider:!0,children:(0,y.jsx)(`h3`,{className:`x1ghz6dp x9ynric xosj86m x1s688f x1tgivj0`,children:`Neutral Theme`})}),content:(0,y.jsx)(o,{children:(0,y.jsx)(`p`,{className:`x1ghz6dp x9ynric xif65rj x1evy7pa xv1l7n4`,children:`This card uses the neutral theme around the layout areas.`})}),footer:(0,y.jsx)(_,{hasDivider:!0,children:(0,y.jsxs)(m,{gap:2,hAlign:`end`,children:[(0,y.jsx)(u,{label:`Cancel`,variant:`secondary`,children:`Cancel`}),(0,y.jsx)(u,{label:`Save`,variant:`primary`,children:`Save`})]})})})})})]})]})},P={name:`Outer Padding Demonstration`,render:()=>(0,y.jsxs)(h,{gap:6,xstyle:b.storySection,children:[(0,y.jsx)(`p`,{className:`xrcdmg7 x9ynric xfifm61 x1s688f xtvhhri x2ujxvm xv1l7n4`,children:`Outer Padding`}),(0,y.jsx)(`p`,{className:`x1ghz6dp x9ynric xif65rj x1evy7pa xv1l7n4`,children:`Outer padding creates space between the container edge and the layout content. Notice how the dividers are inset from the container edges as outer padding increases.`}),(0,y.jsxs)(m,{gap:4,wrap:`wrap`,children:[(0,y.jsxs)(h,{gap:2,children:[(0,y.jsx)(`p`,{className:`x1ghz6dp x9ynric xif65rj xk50ysn xv1l7n4`,children:`paddingOuterX/Y = spacing0`}),(0,y.jsx)(`div`,{...t(...d({paddingOuterX:`spacing0`,paddingOuterY:`spacing0`}),b.demoContainer,b.demoSize),children:(0,y.jsx)(a,{header:(0,y.jsx)(s,{hasDivider:!0,children:(0,y.jsx)(`p`,{className:`x1ghz6dp x9ynric xif65rj xk50ysn xv1l7n4`,children:`Header`})}),content:(0,y.jsx)(o,{children:(0,y.jsx)(`p`,{className:`x1ghz6dp x9ynric xif65rj x1evy7pa xv1l7n4`,children:`Dividers touch container edges.`})}),footer:(0,y.jsx)(_,{hasDivider:!0,children:(0,y.jsx)(`p`,{className:`x1ghz6dp x9ynric xif65rj x1evy7pa xv1l7n4`,children:`Footer`})})})})]}),(0,y.jsxs)(h,{gap:2,children:[(0,y.jsx)(`p`,{className:`x1ghz6dp x9ynric xif65rj xk50ysn xv1l7n4`,children:`paddingOuterX/Y = spacing4`}),(0,y.jsx)(`div`,{...t(...d({paddingOuterX:`spacing4`,paddingOuterY:`spacing4`}),b.demoContainer,b.demoSize),children:(0,y.jsx)(a,{header:(0,y.jsx)(s,{hasDivider:!0,children:(0,y.jsx)(`p`,{className:`x1ghz6dp x9ynric xif65rj xk50ysn xv1l7n4`,children:`Header`})}),content:(0,y.jsx)(o,{children:(0,y.jsx)(`p`,{className:`x1ghz6dp x9ynric xif65rj x1evy7pa xv1l7n4`,children:`16px inset from edges.`})}),footer:(0,y.jsx)(_,{hasDivider:!0,children:(0,y.jsx)(`p`,{className:`x1ghz6dp x9ynric xif65rj x1evy7pa xv1l7n4`,children:`Footer`})})})})]}),(0,y.jsxs)(h,{gap:2,children:[(0,y.jsx)(`p`,{className:`x1ghz6dp x9ynric xif65rj xk50ysn xv1l7n4`,children:`paddingOuterX/Y = spacing7`}),(0,y.jsx)(`div`,{...t(...d({paddingOuterX:`spacing7`,paddingOuterY:`spacing7`}),b.demoContainer,b.demoSize),children:(0,y.jsx)(a,{header:(0,y.jsx)(s,{hasDivider:!0,children:(0,y.jsx)(`p`,{className:`x1ghz6dp x9ynric xif65rj xk50ysn xv1l7n4`,children:`Header`})}),content:(0,y.jsx)(o,{children:(0,y.jsx)(`p`,{className:`x1ghz6dp x9ynric xif65rj x1evy7pa xv1l7n4`,children:`48px inset from edges.`})}),footer:(0,y.jsx)(_,{hasDivider:!0,children:(0,y.jsx)(`p`,{className:`x1ghz6dp x9ynric xif65rj x1evy7pa xv1l7n4`,children:`Footer`})})})})]})]})]})},F={name:`Content Width — Dividers, No Panels`,render:()=>(0,y.jsxs)(h,{gap:4,xstyle:b.storySection,children:[(0,y.jsx)(`p`,{className:`xrcdmg7 x9ynric xfifm61 x1s688f xtvhhri x2ujxvm xv1l7n4`,children:`contentWidth=640 in a 900px container; dividers remain full-bleed while content is constrained`}),(0,y.jsx)(`div`,{className:`x1dllhtq x14i3s5s x1hviunn xb3r6kr x1sii68`,children:(0,y.jsx)(a,{contentWidth:640,defaultHasDividers:!0,header:(0,y.jsxs)(s,{children:[(0,y.jsx)(`h3`,{className:`x1ghz6dp x9ynric xosj86m x1s688f x1tgivj0`,children:`Header`}),(0,y.jsx)(`p`,{className:`x1ghz6dp x9ynric xif65rj x1evy7pa xv1l7n4`,children:`Header content is constrained to 640px`})]}),content:(0,y.jsxs)(o,{children:[(0,y.jsx)(`p`,{className:`x1ghz6dp x9ynric xif65rj x1evy7pa xv1l7n4`,children:`Main content is constrained to 640px and centered. The dividers above and below span the full width of the container.`}),(0,y.jsx)(`br`,{}),(0,y.jsx)(`div`,{className:`xspzpui xur7f20 x1shk3sm xv1l7n4 x9ynric xif65rj`,children:`Placeholder content block`})]}),footer:(0,y.jsx)(_,{children:(0,y.jsxs)(m,{gap:2,hAlign:`end`,children:[(0,y.jsx)(u,{label:`Cancel`,variant:`secondary`,children:`Cancel`}),(0,y.jsx)(u,{label:`Save`,variant:`primary`,children:`Save`})]})})})})]})},I={name:`Content Width — Start Panel`,render:()=>(0,y.jsxs)(h,{gap:4,xstyle:b.storySection,children:[(0,y.jsx)(`p`,{className:`xrcdmg7 x9ynric xfifm61 x1s688f xtvhhri x2ujxvm xv1l7n4`,children:`contentWidth=640 with a 200px start panel: the panel stays aligned while content extends to the open end edge`}),(0,y.jsx)(`div`,{className:`x1dllhtq x14i3s5s x1hviunn xb3r6kr x1sii68`,children:(0,y.jsx)(a,{contentWidth:640,defaultHasDividers:!0,header:(0,y.jsx)(s,{children:(0,y.jsx)(`h3`,{className:`x1ghz6dp x9ynric xosj86m x1s688f x1tgivj0`,children:`Settings`})}),start:(0,y.jsxs)(c,{width:200,hasDivider:!0,role:`navigation`,children:[(0,y.jsx)(x,{active:!0,children:`General`}),(0,y.jsx)(x,{children:`Account`}),(0,y.jsx)(x,{children:`Privacy`}),(0,y.jsx)(x,{children:`Notifications`})]}),content:(0,y.jsxs)(o,{children:[(0,y.jsx)(`h4`,{className:`x1ghz6dp x9ynric xif65rj xk50ysn xv1l7n4`,children:`General Settings`}),(0,y.jsx)(`br`,{}),(0,y.jsx)(`p`,{className:`x1ghz6dp x9ynric xif65rj x1evy7pa xv1l7n4`,children:`The start panel stays inside the centered 640px frame while the content area extends to the container's open end edge.`})]}),footer:(0,y.jsx)(_,{children:(0,y.jsx)(m,{gap:2,hAlign:`end`,children:(0,y.jsx)(u,{label:`Save Changes`,variant:`primary`,children:`Save Changes`})})})})})]})},L={name:`Content Width — Both Panels`,render:()=>(0,y.jsxs)(h,{gap:4,xstyle:b.storySection,children:[(0,y.jsx)(`p`,{className:`xrcdmg7 x9ynric xfifm61 x1s688f xtvhhri x2ujxvm xv1l7n4`,children:`contentWidth=800 with start=200 and end=200 panels in a 1200px container`}),(0,y.jsx)(`div`,{className:`x1dllhtq x14i3s5s x1hviunn xb3r6kr x1y43apy`,children:(0,y.jsx)(a,{contentWidth:800,defaultHasDividers:!0,header:(0,y.jsx)(s,{children:(0,y.jsx)(`h3`,{className:`x1ghz6dp x9ynric xosj86m x1s688f x1tgivj0`,children:`File Browser`})}),start:(0,y.jsxs)(c,{width:200,hasDivider:!0,children:[(0,y.jsx)(`p`,{className:`xrcdmg7 x9ynric xfifm61 x1s688f xtvhhri x2ujxvm xv1l7n4`,children:`Folders`}),(0,y.jsx)(x,{children:`Documents`}),(0,y.jsx)(x,{active:!0,children:`Projects`}),(0,y.jsx)(x,{children:`Downloads`})]}),content:(0,y.jsxs)(o,{children:[(0,y.jsx)(`p`,{className:`xrcdmg7 x9ynric xfifm61 x1s688f xtvhhri x2ujxvm xv1l7n4`,children:`Files`}),(0,y.jsx)(`div`,{className:`xspzpui xur7f20 x1shk3sm xv1l7n4 x9ynric xif65rj`,children:`Select a folder to view its contents`})]}),end:(0,y.jsxs)(c,{width:200,hasDivider:!0,children:[(0,y.jsx)(`p`,{className:`xrcdmg7 x9ynric xfifm61 x1s688f xtvhhri x2ujxvm xv1l7n4`,children:`Details`}),(0,y.jsx)(`p`,{className:`x1ghz6dp x9ynric xif65rj x1evy7pa xv1l7n4`,children:`Select a file to view details`})]}),footer:(0,y.jsx)(_,{children:(0,y.jsx)(`p`,{className:`x1ghz6dp x9ynric xif65rj x1evy7pa xv1l7n4`,children:`3 items`})})})})]})},R={name:`Content Width — Scrollbar Placement`,tags:[`visual-baseline`],render:()=>{let e=[{id:`none`,label:`No panels`,start:void 0,end:void 0},{id:`start`,label:`Start panel only`,start:(0,y.jsx)(c,{width:160,hasDivider:!0,children:(0,y.jsx)(x,{active:!0,children:`Nav`})}),end:void 0},{id:`both`,label:`Start and end panels`,start:(0,y.jsx)(c,{width:160,hasDivider:!0,children:(0,y.jsx)(x,{active:!0,children:`Nav`})}),end:(0,y.jsx)(c,{width:160,hasDivider:!0,children:(0,y.jsx)(`p`,{className:`x1ghz6dp x9ynric xif65rj x1evy7pa xv1l7n4`,children:`Details`})})},{id:`end`,label:`End panel only`,start:void 0,end:(0,y.jsx)(c,{width:160,hasDivider:!0,children:(0,y.jsx)(`p`,{className:`x1ghz6dp x9ynric xif65rj x1evy7pa xv1l7n4`,children:`Details`})})}];return(0,y.jsxs)(h,{gap:6,xstyle:b.storySection,children:[(0,y.jsx)(`p`,{className:`xrcdmg7 x9ynric xfifm61 x1s688f xtvhhri x2ujxvm xv1l7n4`,children:`contentWidth=640 in a 900px container. With no panels, content spans the container and aligns internally. With exactly one panel, content extends through the opposite open area. The two-panel layout remains constrained. Header markers expose both alignment edges.`}),e.map(({id:e,label:t,start:n,end:r})=>(0,y.jsxs)(h,{gap:2,children:[(0,y.jsx)(`p`,{className:`x1ghz6dp x9ynric xif65rj xk50ysn xv1l7n4`,children:t}),(0,y.jsx)(`div`,{"data-scrollbar-layout":e,className:`x1dllhtq x14i3s5s x1hviunn xb3r6kr x1sii68 x1u5z0ei`,children:(0,y.jsx)(a,{contentWidth:640,header:(0,y.jsx)(s,{hasDivider:!0,children:(0,y.jsxs)(m,{hAlign:`between`,children:[(0,y.jsx)(`span`,{"data-header-edge":`start`,children:`Header start`}),(0,y.jsx)(`span`,{"data-header-edge":`end`,children:`Header end`})]})}),start:n,content:(0,y.jsx)(S,{id:e,label:t}),end:r})})]},e))]})}},z={name:`Content Width — No Dividers`,render:()=>(0,y.jsxs)(h,{gap:4,xstyle:b.storySection,children:[(0,y.jsx)(`p`,{className:`xrcdmg7 x9ynric xfifm61 x1s688f xtvhhri x2ujxvm xv1l7n4`,children:`contentWidth=640 without dividers: constraint works the same`}),(0,y.jsx)(`div`,{className:`x1dllhtq x14i3s5s x1hviunn xb3r6kr x1sii68`,children:(0,y.jsx)(a,{contentWidth:640,header:(0,y.jsx)(s,{children:(0,y.jsx)(`h3`,{className:`x1ghz6dp x9ynric xosj86m x1s688f x1tgivj0`,children:`Seamless Layout`})}),content:(0,y.jsxs)(o,{children:[(0,y.jsx)(`p`,{className:`x1ghz6dp x9ynric xif65rj x1evy7pa xv1l7n4`,children:`Even without dividers, the content is constrained to 640px and centered. The visual flow is continuous with no divider lines.`}),(0,y.jsx)(`br`,{}),(0,y.jsx)(`div`,{className:`xspzpui xur7f20 x1shk3sm xv1l7n4 x9ynric xif65rj`,children:`Placeholder content block`})]}),footer:(0,y.jsx)(_,{children:(0,y.jsx)(m,{gap:2,hAlign:`end`,children:(0,y.jsx)(u,{label:`Continue`,variant:`primary`,children:`Continue`})})})})})]})},B={name:`Content Width — Narrower Than Container`,render:()=>(0,y.jsxs)(h,{gap:4,xstyle:b.storySection,children:[(0,y.jsx)(`p`,{className:`xrcdmg7 x9ynric xfifm61 x1s688f xtvhhri x2ujxvm xv1l7n4`,children:`contentWidth=400 in a 900px container: content is visibly centered`}),(0,y.jsx)(`div`,{className:`x1dllhtq x14i3s5s x1hviunn xb3r6kr x1sii68`,children:(0,y.jsx)(a,{contentWidth:400,defaultHasDividers:!0,header:(0,y.jsx)(s,{children:(0,y.jsx)(`h3`,{className:`x1ghz6dp x9ynric xosj86m x1s688f x1tgivj0`,children:`Narrow Content`})}),content:(0,y.jsxs)(o,{children:[(0,y.jsx)(`p`,{className:`x1ghz6dp x9ynric xif65rj x1evy7pa xv1l7n4`,children:`This content is constrained to 400px inside a 900px container. Notice the visible centering, great for focused forms or settings pages.`}),(0,y.jsx)(`br`,{}),(0,y.jsx)(`div`,{className:`xspzpui xur7f20 x1shk3sm xv1l7n4 x9ynric xif65rj`,children:`Narrow placeholder block`})]}),footer:(0,y.jsx)(_,{children:(0,y.jsx)(m,{gap:2,hAlign:`end`,children:(0,y.jsx)(u,{label:`Submit`,variant:`primary`,children:`Submit`})})})})})]})},V={name:`Content Width — Wider Than Container`,render:()=>(0,y.jsxs)(h,{gap:4,xstyle:b.storySection,children:[(0,y.jsx)(`p`,{className:`xrcdmg7 x9ynric xfifm61 x1s688f xtvhhri x2ujxvm xv1l7n4`,children:`contentWidth=2000 in a 350px container, degrades gracefully to 100%`}),(0,y.jsx)(`div`,{className:`x1dllhtq x14i3s5s x1hviunn xb3r6kr xxsgkw5`,children:(0,y.jsx)(a,{contentWidth:2e3,defaultHasDividers:!0,header:(0,y.jsx)(s,{children:(0,y.jsx)(`h3`,{className:`x1ghz6dp x9ynric xosj86m x1s688f x1tgivj0`,children:`Overflow`})}),content:(0,y.jsx)(o,{children:(0,y.jsx)(`p`,{className:`x1ghz6dp x9ynric xif65rj x1evy7pa xv1l7n4`,children:`The contentWidth is 2000px but the container is only 350px. The content fills 100% of the available space, with no overflow or scrollbar.`})}),footer:(0,y.jsx)(_,{children:(0,y.jsx)(`p`,{className:`x1ghz6dp x9ynric xif65rj x1evy7pa xv1l7n4`,children:`Footer`})})})})]})},H={name:`No Content Width — Frame Wider Than the Viewport`,render:()=>(0,y.jsx)(`div`,{className:`x8j1qa8`,"data-testid":`wide-frame`,children:(0,y.jsx)(a,{defaultHasDividers:!0,header:(0,y.jsx)(s,{"data-testid":`wide-header`,children:(0,y.jsx)(`h3`,{className:`x1ghz6dp x9ynric xosj86m x1s688f x1tgivj0`,children:`Header`})}),content:(0,y.jsx)(o,{"data-testid":`wide-content`,children:(0,y.jsx)(`p`,{className:`x1ghz6dp x9ynric xif65rj x1evy7pa xv1l7n4`,children:`The frame is 2400px wide, wider than the viewport. With no contentWidth, nothing caps the regions.`})}),footer:(0,y.jsx)(_,{"data-testid":`wide-footer`,children:(0,y.jsx)(`p`,{className:`x1ghz6dp x9ynric xif65rj x1evy7pa xv1l7n4`,children:`Footer`})})})})},U={name:`Content Width — Responsive Panels`,render:()=>(0,y.jsxs)(h,{gap:6,xstyle:b.storySection,children:[(0,y.jsx)(`p`,{className:`xrcdmg7 x9ynric xfifm61 x1s688f xtvhhri x2ujxvm xv1l7n4`,children:`contentWidth=640 with a start panel at three container widths — 1000px, 640px, and 400px`}),(0,y.jsxs)(m,{gap:4,wrap:`wrap`,children:[(0,y.jsxs)(h,{gap:2,children:[(0,y.jsx)(`p`,{className:`x1ghz6dp x9ynric xif65rj xk50ysn xv1l7n4`,children:`1000px container`}),(0,y.jsx)(`div`,{className:`x1dllhtq x14i3s5s x1hviunn xb3r6kr x1p2m28r`,children:(0,y.jsx)(a,{contentWidth:640,defaultHasDividers:!0,header:(0,y.jsx)(s,{children:(0,y.jsx)(`h3`,{className:`x1ghz6dp x9ynric xosj86m x1s688f x1tgivj0`,children:`Wide`})}),start:(0,y.jsxs)(c,{width:160,hasDivider:!0,role:`navigation`,label:`Wide navigation`,children:[(0,y.jsx)(x,{active:!0,children:`Dashboard`}),(0,y.jsx)(x,{children:`Settings`})]}),content:(0,y.jsx)(o,{children:(0,y.jsx)(`p`,{className:`x1ghz6dp x9ynric xif65rj x1evy7pa xv1l7n4`,children:`Content is centered with room to spare.`})}),footer:(0,y.jsx)(_,{children:(0,y.jsx)(`p`,{className:`x1ghz6dp x9ynric xif65rj x1evy7pa xv1l7n4`,children:`Footer`})})})})]}),(0,y.jsxs)(h,{gap:2,children:[(0,y.jsx)(`p`,{className:`x1ghz6dp x9ynric xif65rj xk50ysn xv1l7n4`,children:`640px container`}),(0,y.jsx)(`div`,{className:`x1dllhtq x14i3s5s x1hviunn xb3r6kr x11i3ho8`,children:(0,y.jsx)(a,{contentWidth:640,defaultHasDividers:!0,header:(0,y.jsx)(s,{children:(0,y.jsx)(`h3`,{className:`x1ghz6dp x9ynric xosj86m x1s688f x1tgivj0`,children:`Medium`})}),start:(0,y.jsxs)(c,{width:160,hasDivider:!0,role:`navigation`,label:`Medium navigation`,children:[(0,y.jsx)(x,{active:!0,children:`Dashboard`}),(0,y.jsx)(x,{children:`Settings`})]}),content:(0,y.jsx)(o,{children:(0,y.jsx)(`p`,{className:`x1ghz6dp x9ynric xif65rj x1evy7pa xv1l7n4`,children:`Content fills the available space.`})}),footer:(0,y.jsx)(_,{children:(0,y.jsx)(`p`,{className:`x1ghz6dp x9ynric xif65rj x1evy7pa xv1l7n4`,children:`Footer`})})})})]}),(0,y.jsxs)(h,{gap:2,children:[(0,y.jsx)(`p`,{className:`x1ghz6dp x9ynric xif65rj xk50ysn xv1l7n4`,children:`400px container`}),(0,y.jsx)(`div`,{className:`x1dllhtq x14i3s5s x1hviunn xb3r6kr x1l2rt3b`,children:(0,y.jsx)(a,{contentWidth:640,defaultHasDividers:!0,header:(0,y.jsx)(s,{children:(0,y.jsx)(`h3`,{className:`x1ghz6dp x9ynric xosj86m x1s688f x1tgivj0`,children:`Narrow`})}),start:(0,y.jsxs)(c,{width:160,hasDivider:!0,role:`navigation`,label:`Narrow navigation`,children:[(0,y.jsx)(x,{active:!0,children:`Dashboard`}),(0,y.jsx)(x,{children:`Settings`})]}),content:(0,y.jsx)(o,{children:(0,y.jsx)(`p`,{className:`x1ghz6dp x9ynric xif65rj x1evy7pa xv1l7n4`,children:`Degrades to 100%.`})}),footer:(0,y.jsx)(_,{children:(0,y.jsx)(`p`,{className:`x1ghz6dp x9ynric xif65rj x1evy7pa xv1l7n4`,children:`Footer`})})})})]})]})]})},W={name:`Content Width — Nested in AppShell`,render:()=>(0,y.jsxs)(h,{gap:4,xstyle:b.storySection,children:[(0,y.jsx)(`p`,{className:`xrcdmg7 x9ynric xfifm61 x1s688f xtvhhri x2ujxvm xv1l7n4`,children:`Layout with contentWidth=640 nested inside an AppShell`}),(0,y.jsx)(`div`,{className:`x1dllhtq x14i3s5s x1hviunn xb3r6kr x1sii68`,children:(0,y.jsx)(l,{height:`auto`,children:(0,y.jsx)(a,{contentWidth:640,defaultHasDividers:!0,header:(0,y.jsx)(s,{children:(0,y.jsx)(`h3`,{className:`x1ghz6dp x9ynric xosj86m x1s688f x1tgivj0`,children:`App Shell + Content Width`})}),content:(0,y.jsxs)(o,{children:[(0,y.jsx)(`p`,{className:`x1ghz6dp x9ynric xif65rj x1evy7pa xv1l7n4`,children:`This layout is nested inside an AppShell. The contentWidth constraint applies to the inner layout while the app shell provides the outer structure.`}),(0,y.jsx)(`br`,{}),(0,y.jsx)(`div`,{className:`xspzpui xur7f20 x1shk3sm xv1l7n4 x9ynric xif65rj`,children:`Placeholder content block`})]}),footer:(0,y.jsx)(_,{children:(0,y.jsxs)(m,{gap:2,hAlign:`end`,children:[(0,y.jsx)(u,{label:`Cancel`,variant:`secondary`,children:`Cancel`}),(0,y.jsx)(u,{label:`Save`,variant:`primary`,children:`Save`})]})})})})})]})},G=({panelWidth:e})=>(0,y.jsx)(a,{header:(0,y.jsx)(s,{hasDivider:!0,children:(0,y.jsx)(`h3`,{className:`x1ghz6dp x9ynric xosj86m x1s688f x1tgivj0`,children:`Orders`})}),end:(0,y.jsx)(c,{hasDivider:!0,width:e,role:`complementary`,label:`Order details`,children:(0,y.jsxs)(h,{gap:2,children:[(0,y.jsx)(`p`,{className:`x1ghz6dp x9ynric xif65rj xk50ysn xv1l7n4`,children:`Order #1042`}),(0,y.jsx)(`p`,{className:`x1ghz6dp x9ynric xif65rj x1evy7pa xv1l7n4`,children:`Shipped · 3 items`})]})}),content:(0,y.jsx)(o,{children:(0,y.jsx)(`p`,{className:`x1ghz6dp x9ynric xif65rj x1evy7pa xv1l7n4`,children:`Select an order to see its shipping and payment details.`})})}),K={name:`Nested Layout — Inset in AppShell`,render:()=>(0,y.jsxs)(h,{gap:4,xstyle:b.storySection,children:[(0,y.jsx)(`p`,{className:`xrcdmg7 x9ynric xfifm61 x1s688f xtvhhri x2ujxvm xv1l7n4`,children:`Page Layout with a details panel inside AppShell (no padding props), 390px frame`}),(0,y.jsx)(`div`,{className:`x1dllhtq x14i3s5s x1hviunn xb3r6kr xqujd4m x1bo65i3`,children:(0,y.jsx)(l,{children:(0,y.jsx)(G,{panelWidth:150})})}),(0,y.jsx)(`p`,{className:`xrcdmg7 x9ynric xfifm61 x1s688f xtvhhri x2ujxvm xv1l7n4`,children:`Unchanged: Layout inside Card padding=2 takes the Card inset`}),(0,y.jsx)(`div`,{className:`x1m258z3`,children:(0,y.jsx)(p,{padding:2,children:(0,y.jsx)(a,{height:`auto`,header:(0,y.jsx)(s,{hasDivider:!0,children:(0,y.jsx)(`h3`,{className:`x1ghz6dp x9ynric xosj86m x1s688f x1tgivj0`,children:`Card title`})}),content:(0,y.jsx)(o,{children:(0,y.jsx)(`p`,{className:`x1ghz6dp x9ynric xif65rj x1evy7pa xv1l7n4`,children:`Header and content align to the Card's 8px inset.`})})})})})]})},q={name:`Nested Layout — Inset in AppShell (960px)`,render:()=>(0,y.jsxs)(h,{gap:4,xstyle:b.storySection,children:[(0,y.jsx)(`p`,{className:`xrcdmg7 x9ynric xfifm61 x1s688f xtvhhri x2ujxvm xv1l7n4`,children:`Page Layout with a details panel inside AppShell (no padding props), 960px frame`}),(0,y.jsx)(`div`,{className:`x1dllhtq x14i3s5s x1hviunn xb3r6kr xbqi55i x1bo65i3`,children:(0,y.jsx)(l,{children:(0,y.jsx)(G,{panelWidth:320})})})]})},J={name:`Content Insets`,render:()=>{let e=(0,y.jsx)(`p`,{className:`x1ghz6dp x9ynric xif65rj x1evy7pa xv1l7n4`,children:`Content area.`}),t=(0,y.jsx)(c,{width:100,hasDivider:!0,children:(0,y.jsx)(x,{active:!0,children:`Nav`})}),n=[{id:`start-panel`,label:`Start panel, padding=6`,layout:(0,y.jsx)(a,{padding:6,start:t,content:(0,y.jsx)(o,{"data-content-inset":`start-panel`,children:e})})},{id:`end-panel`,label:`End panel, padding=6`,layout:(0,y.jsx)(a,{padding:6,end:t,content:(0,y.jsx)(o,{"data-content-inset":`end-panel`,children:e})})},{id:`header-without-divider`,label:`Header without divider, footer with divider, padding=6`,layout:(0,y.jsx)(a,{padding:6,header:(0,y.jsx)(s,{children:(0,y.jsx)(`h3`,{className:`x1ghz6dp x9ynric xosj86m x1s688f x1tgivj0`,children:`Header`})}),content:(0,y.jsx)(o,{"data-content-inset":`header-without-divider`,children:e}),footer:(0,y.jsx)(_,{hasDivider:!0,children:(0,y.jsx)(`p`,{className:`x1ghz6dp x9ynric xif65rj x1evy7pa xv1l7n4`,children:`Footer`})})})},{id:`full-bleed-start-panel`,label:`Start panel, padding=0`,layout:(0,y.jsx)(a,{padding:0,start:t,content:(0,y.jsx)(o,{"data-content-inset":`full-bleed-start-panel`,children:e})})},{id:`content-width-start-panel`,label:`contentWidth=240, start panel, padding=6`,layout:(0,y.jsx)(a,{padding:6,contentWidth:240,header:(0,y.jsx)(s,{hasDivider:!0,children:(0,y.jsx)(`h3`,{className:`x1ghz6dp x9ynric xosj86m x1s688f x1tgivj0`,children:`Header`})}),start:t,content:(0,y.jsx)(o,{"data-content-inset":`content-width-start-panel`,children:e})})},{id:`nested`,label:`Nested Layout under a header without divider`,layout:(0,y.jsx)(a,{padding:6,header:(0,y.jsx)(s,{children:(0,y.jsx)(`h3`,{className:`x1ghz6dp x9ynric xosj86m x1s688f x1tgivj0`,children:`Outer header`})}),content:(0,y.jsx)(o,{padding:0,children:(0,y.jsx)(a,{header:(0,y.jsx)(s,{hasDivider:!0,children:(0,y.jsx)(`p`,{className:`x1ghz6dp x9ynric xif65rj x1evy7pa xv1l7n4`,children:`Inner header`})}),content:(0,y.jsx)(o,{"data-content-inset":`nested`,children:e})})})})}];return(0,y.jsx)(h,{gap:4,xstyle:b.storySection,children:(0,y.jsx)(m,{gap:4,wrap:`wrap`,children:n.map(({id:e,label:t,layout:n})=>(0,y.jsxs)(h,{gap:2,children:[(0,y.jsx)(`p`,{className:`x1ghz6dp x9ynric xif65rj xk50ysn xv1l7n4`,children:t}),(0,y.jsx)(`div`,{className:`x1dllhtq x14i3s5s x1hviunn xb3r6kr x1cvmir6 x1m3v4wt`,children:n})]},e))})})}},Y={name:`Footer States`,render:()=>{let e=(0,y.jsx)(`p`,{className:`x1ghz6dp x9ynric xif65rj x1evy7pa xv1l7n4`,children:`Content area.`}),t=(0,y.jsxs)(h,{gap:2,children:[Array.from({length:12},(e,t)=>(0,y.jsxs)(`p`,{className:`x1ghz6dp x9ynric xif65rj x1evy7pa xv1l7n4`,children:[`Row `,t+1]},t)),(0,y.jsx)(u,{label:`Load more`,variant:`secondary`,children:`Load more`})]}),n=(0,y.jsx)(`p`,{className:`x1ghz6dp x9ynric xif65rj x1evy7pa xv1l7n4`,children:`Footer`}),r=[{id:`automatic`,label:`No divider, padding=6`,layout:(0,y.jsx)(a,{padding:6,content:(0,y.jsx)(o,{children:e}),footer:(0,y.jsx)(_,{"data-footer-case":`automatic`,children:n})})},{id:`divider`,label:`hasDivider, padding=6`,layout:(0,y.jsx)(a,{padding:6,content:(0,y.jsx)(o,{children:e}),footer:(0,y.jsx)(_,{hasDivider:!0,"data-footer-case":`divider`,children:n})})},{id:`layout-default`,label:`Layout defaultHasDividers`,layout:(0,y.jsx)(a,{padding:6,defaultHasDividers:!0,content:(0,y.jsx)(o,{children:e}),footer:(0,y.jsx)(_,{"data-footer-case":`layout-default`,children:n})})},{id:`explicit-off`,label:`Layout defaultHasDividers, hasDivider={false}`,layout:(0,y.jsx)(a,{padding:6,defaultHasDividers:!0,content:(0,y.jsx)(o,{children:e}),footer:(0,y.jsx)(_,{hasDivider:!1,"data-footer-case":`explicit-off`,children:n})})},{id:`padding-2`,label:`hasDivider, footer padding=2`,layout:(0,y.jsx)(a,{padding:6,content:(0,y.jsx)(o,{children:e}),footer:(0,y.jsx)(_,{hasDivider:!0,padding:2,"data-footer-case":`padding-2`,children:n})})},{id:`full-bleed`,label:`hasDivider, footer padding=0`,layout:(0,y.jsx)(a,{padding:6,content:(0,y.jsx)(o,{children:e}),footer:(0,y.jsx)(_,{hasDivider:!0,padding:0,"data-footer-case":`full-bleed`,children:n})})},{id:`height`,label:`hasDivider, height=72 below overflowing content`,layout:(0,y.jsx)(a,{padding:6,content:(0,y.jsx)(o,{children:t}),footer:(0,y.jsx)(_,{hasDivider:!0,height:72,"data-footer-case":`height`,children:n})})},{id:`content-width`,label:`hasDivider, Layout contentWidth=240`,layout:(0,y.jsx)(a,{padding:6,contentWidth:240,content:(0,y.jsx)(o,{children:e}),footer:(0,y.jsx)(_,{hasDivider:!0,"data-footer-case":`content-width`,children:n})})},{id:`nested`,label:`Nested Layout above an outer footer without divider`,layout:(0,y.jsx)(a,{padding:6,content:(0,y.jsx)(o,{padding:0,children:(0,y.jsx)(a,{content:(0,y.jsx)(o,{children:e}),footer:(0,y.jsx)(_,{hasDivider:!0,"data-footer-case":`nested`,children:n})})}),footer:(0,y.jsx)(_,{children:n})})},{id:`caller-attribute`,label:`No divider, caller data-divider="false"`,layout:(0,y.jsx)(a,{padding:6,content:(0,y.jsx)(o,{children:e}),footer:(0,y.jsx)(_,{"data-divider":`false`,"data-footer-case":`caller-attribute`,children:n})})}];return(0,y.jsx)(h,{gap:4,xstyle:b.storySection,children:(0,y.jsx)(m,{gap:4,wrap:`wrap`,children:r.map(({id:e,label:t,layout:n})=>(0,y.jsxs)(h,{gap:2,children:[(0,y.jsx)(`p`,{className:`x1ghz6dp x9ynric xif65rj xk50ysn xv1l7n4`,children:t}),(0,y.jsx)(`div`,{className:`x1dllhtq x14i3s5s x1hviunn xb3r6kr x1cvmir6 x1m3v4wt`,children:n})]},e))})})}},X={name:`Header States`,render:()=>{let e=(0,y.jsx)(`p`,{className:`x1ghz6dp x9ynric xif65rj x1evy7pa xv1l7n4`,children:`Content area.`}),t=(0,y.jsxs)(h,{gap:2,children:[Array.from({length:12},(e,t)=>(0,y.jsxs)(`p`,{className:`x1ghz6dp x9ynric xif65rj x1evy7pa xv1l7n4`,children:[`Row `,t+1]},t)),(0,y.jsx)(u,{label:`Load more`,variant:`secondary`,children:`Load more`})]}),n=(0,y.jsx)(`p`,{className:`x1ghz6dp x9ynric xif65rj x1evy7pa xv1l7n4`,children:`Header`}),r=[{id:`automatic`,label:`No divider, padding=6`,layout:(0,y.jsx)(a,{padding:6,content:(0,y.jsx)(o,{children:e}),header:(0,y.jsx)(s,{"data-header-case":`automatic`,children:n})})},{id:`divider`,label:`hasDivider, padding=6`,layout:(0,y.jsx)(a,{padding:6,content:(0,y.jsx)(o,{children:e}),header:(0,y.jsx)(s,{hasDivider:!0,"data-header-case":`divider`,children:n})})},{id:`layout-default`,label:`Layout defaultHasDividers`,layout:(0,y.jsx)(a,{padding:6,defaultHasDividers:!0,content:(0,y.jsx)(o,{children:e}),header:(0,y.jsx)(s,{"data-header-case":`layout-default`,children:n})})},{id:`explicit-off`,label:`Layout defaultHasDividers, hasDivider={false}`,layout:(0,y.jsx)(a,{padding:6,defaultHasDividers:!0,content:(0,y.jsx)(o,{children:e}),header:(0,y.jsx)(s,{hasDivider:!1,"data-header-case":`explicit-off`,children:n})})},{id:`padding-2`,label:`hasDivider, header padding=2`,layout:(0,y.jsx)(a,{padding:6,content:(0,y.jsx)(o,{children:e}),header:(0,y.jsx)(s,{hasDivider:!0,padding:2,"data-header-case":`padding-2`,children:n})})},{id:`full-bleed`,label:`hasDivider, header padding=0`,layout:(0,y.jsx)(a,{padding:6,content:(0,y.jsx)(o,{children:e}),header:(0,y.jsx)(s,{hasDivider:!0,padding:0,"data-header-case":`full-bleed`,children:n})})},{id:`height`,label:`hasDivider, height=72 above overflowing content`,layout:(0,y.jsx)(a,{padding:6,content:(0,y.jsx)(o,{children:t}),header:(0,y.jsx)(s,{hasDivider:!0,height:72,"data-header-case":`height`,children:n})})},{id:`content-width`,label:`hasDivider, Layout contentWidth=240`,layout:(0,y.jsx)(a,{padding:6,contentWidth:240,content:(0,y.jsx)(o,{children:e}),header:(0,y.jsx)(s,{hasDivider:!0,"data-header-case":`content-width`,children:n})})},{id:`padding-block-end`,label:`hasDivider, paddingBlockEnd=0`,layout:(0,y.jsx)(a,{padding:6,content:(0,y.jsx)(o,{children:e}),header:(0,y.jsx)(s,{hasDivider:!0,paddingBlockEnd:0,"data-header-case":`padding-block-end`,children:n})})},{id:`nested`,label:`Nested Layout below an outer header without divider`,layout:(0,y.jsx)(a,{padding:6,content:(0,y.jsx)(o,{padding:0,children:(0,y.jsx)(a,{content:(0,y.jsx)(o,{children:e}),header:(0,y.jsx)(s,{hasDivider:!0,"data-header-case":`nested`,children:n})})}),header:(0,y.jsx)(s,{children:n})})},{id:`caller-attribute`,label:`No divider, caller data-divider="false"`,layout:(0,y.jsx)(a,{padding:6,content:(0,y.jsx)(o,{children:e}),header:(0,y.jsx)(s,{"data-divider":`false`,"data-header-case":`caller-attribute`,children:n})})}];return(0,y.jsx)(h,{gap:4,xstyle:b.storySection,children:(0,y.jsx)(m,{gap:4,wrap:`wrap`,children:r.map(({id:e,label:t,layout:n})=>(0,y.jsxs)(h,{gap:2,children:[(0,y.jsx)(`p`,{className:`x1ghz6dp x9ynric xif65rj xk50ysn xv1l7n4`,children:t}),(0,y.jsx)(`div`,{className:`x1dllhtq x14i3s5s x1hviunn xb3r6kr x1cvmir6 x1m3v4wt`,children:n})]},e))})})}},Z={name:`Panel States`,render:()=>{let e=(0,y.jsx)(`p`,{className:`x1ghz6dp x9ynric xif65rj x1evy7pa xv1l7n4`,children:`Content area.`}),t=(0,y.jsx)(`p`,{className:`x1ghz6dp x9ynric xif65rj x1evy7pa xv1l7n4`,children:`Panel`}),n=Array.from({length:12},(e,t)=>(0,y.jsxs)(`p`,{className:`x1ghz6dp x9ynric xif65rj x1evy7pa xv1l7n4`,children:[`Item `,t+1]},t)),r=[{id:`start-automatic`,label:`Start, no divider, padding=6`,layout:(0,y.jsx)(a,{padding:6,start:(0,y.jsx)(c,{width:120,"data-panel-case":`start-automatic`,children:t}),content:(0,y.jsx)(o,{children:e})})},{id:`start-divider`,label:`Start, hasDivider, padding=6`,layout:(0,y.jsx)(a,{padding:6,start:(0,y.jsx)(c,{width:120,hasDivider:!0,"data-panel-case":`start-divider`,children:t}),content:(0,y.jsx)(o,{children:e})})},{id:`end-automatic`,label:`End, no divider, padding=6`,layout:(0,y.jsx)(a,{padding:6,end:(0,y.jsx)(c,{width:120,"data-panel-case":`end-automatic`,children:t}),content:(0,y.jsx)(o,{children:e})})},{id:`end-divider`,label:`End, hasDivider, padding=6`,layout:(0,y.jsx)(a,{padding:6,end:(0,y.jsx)(c,{width:120,hasDivider:!0,"data-panel-case":`end-divider`,children:t}),content:(0,y.jsx)(o,{children:e})})},{id:`header-footer`,label:`Start, hasDivider, with header and footer`,layout:(0,y.jsx)(a,{padding:6,header:(0,y.jsx)(s,{hasDivider:!0,children:(0,y.jsx)(`p`,{className:`x1ghz6dp x9ynric xif65rj x1evy7pa xv1l7n4`,children:`Header`})}),start:(0,y.jsx)(c,{width:120,hasDivider:!0,"data-panel-case":`header-footer`,children:t}),content:(0,y.jsx)(o,{children:e}),footer:(0,y.jsx)(_,{hasDivider:!0,children:(0,y.jsx)(`p`,{className:`x1ghz6dp x9ynric xif65rj x1evy7pa xv1l7n4`,children:`Footer`})})})},{id:`bleed-child`,label:`Start, hasDivider, full-bleed Divider inside`,layout:(0,y.jsx)(a,{padding:6,start:(0,y.jsxs)(c,{width:160,hasDivider:!0,"data-panel-case":`bleed-child`,children:[t,(0,y.jsx)(se,{isFullBleed:!0}),t]}),content:(0,y.jsx)(o,{children:e})})},{id:`padding-2`,label:`Start, hasDivider, panel padding=2`,layout:(0,y.jsx)(a,{padding:6,start:(0,y.jsx)(c,{width:120,hasDivider:!0,padding:2,"data-panel-case":`padding-2`,children:t}),content:(0,y.jsx)(o,{children:e})})},{id:`full-bleed`,label:`Start, hasDivider, panel padding=0`,layout:(0,y.jsx)(a,{padding:6,start:(0,y.jsx)(c,{width:120,hasDivider:!0,padding:0,"data-panel-case":`full-bleed`,children:t}),content:(0,y.jsx)(o,{children:e})})},{id:`width-string`,label:`Start, hasDivider, width="10rem"`,layout:(0,y.jsx)(a,{padding:6,start:(0,y.jsx)(c,{width:`10rem`,hasDivider:!0,"data-panel-case":`width-string`,children:t}),content:(0,y.jsx)(o,{children:e})})},{id:`landmark`,label:`Start, role="navigation", label="Sections"`,layout:(0,y.jsx)(a,{padding:6,start:(0,y.jsx)(c,{width:120,hasDivider:!0,role:`navigation`,label:`Sections`,"data-panel-case":`landmark`,children:t}),content:(0,y.jsx)(o,{children:e})})},{id:`scrolling`,label:`Start, overflowing content`,layout:(0,y.jsx)(a,{padding:6,start:(0,y.jsx)(c,{width:120,hasDivider:!0,"data-panel-case":`scrolling`,children:(0,y.jsxs)(h,{gap:2,children:[n,(0,y.jsx)(u,{label:`More`,variant:`secondary`,children:`More`})]})}),content:(0,y.jsx)(o,{children:e})})},{id:`not-scrollable`,label:`Start, overflowing content, isScrollable={false}`,layout:(0,y.jsx)(a,{padding:6,start:(0,y.jsx)(c,{width:120,hasDivider:!0,isScrollable:!1,"data-panel-case":`not-scrollable`,children:(0,y.jsx)(h,{gap:2,children:n})}),content:(0,y.jsx)(o,{children:e})})}];return(0,y.jsx)(h,{gap:4,xstyle:b.storySection,children:(0,y.jsx)(m,{gap:4,wrap:`wrap`,children:r.map(({id:e,label:t,layout:n})=>(0,y.jsxs)(h,{gap:2,children:[(0,y.jsx)(`p`,{className:`x1ghz6dp x9ynric xif65rj xk50ysn xv1l7n4`,children:t}),(0,y.jsx)(`div`,{className:`x1dllhtq x14i3s5s x1hviunn xb3r6kr x1cvmir6 x1m3v4wt`,children:n})]},e))})})}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  name: 'Playground',
  args: {
    // Card defaults
    cardWidth: 700,
    cardHeight: 400,
    // Layout defaults
    layoutPadding: 4,
    // Header defaults
    showHeader: true,
    headerHasDivider: true,
    headerPadding: 4,
    // Content defaults
    contentPadding: 4,
    contentIsScrollable: true,
    // Footer defaults
    showFooter: true,
    footerHasDivider: true,
    footerPadding: 4,
    // Start panel defaults
    showStartPanel: true,
    startPanelWidth: 160,
    startPanelHasDivider: true,
    startPanelIsScrollable: true,
    // End panel defaults
    showEndPanel: false,
    endPanelWidth: 200,
    endPanelHasDivider: true,
    endPanelIsScrollable: true
  },
  argTypes: {
    // Card controls
    cardWidth: {
      control: {
        type: 'range',
        min: 300,
        max: 1000,
        step: 50
      },
      description: 'Width of the card container',
      table: {
        category: 'Card'
      }
    },
    cardHeight: {
      control: {
        type: 'range',
        min: 200,
        max: 600,
        step: 50
      },
      description: 'Height of the card container',
      table: {
        category: 'Card'
      }
    },
    // Layout controls
    layoutPadding: {
      control: {
        type: 'range',
        min: 0,
        max: 8,
        step: 1
      },
      description: 'Padding at layout outer edges (0 for full bleed)',
      table: {
        category: 'Layout'
      }
    },
    // Header controls
    showHeader: {
      control: 'boolean',
      description: 'Show or hide the header',
      table: {
        category: 'Header'
      }
    },
    headerHasDivider: {
      control: 'boolean',
      description: 'Add a border below the header',
      table: {
        category: 'Header'
      }
    },
    headerPadding: {
      control: {
        type: 'range',
        min: 0,
        max: 8,
        step: 1
      },
      description: 'Header padding (0 for full bleed)',
      table: {
        category: 'Header'
      }
    },
    // Content controls
    contentPadding: {
      control: {
        type: 'range',
        min: 0,
        max: 8,
        step: 1
      },
      description: 'Content padding (0 for edge-to-edge content)',
      table: {
        category: 'Content'
      }
    },
    contentIsScrollable: {
      control: 'boolean',
      description: 'Enable scrollable overflow',
      table: {
        category: 'Content'
      }
    },
    // Footer controls
    showFooter: {
      control: 'boolean',
      description: 'Show or hide the footer',
      table: {
        category: 'Footer'
      }
    },
    footerHasDivider: {
      control: 'boolean',
      description: 'Add a border above the footer',
      table: {
        category: 'Footer'
      }
    },
    footerPadding: {
      control: {
        type: 'range',
        min: 0,
        max: 8,
        step: 1
      },
      description: 'Footer padding (0 for full bleed)',
      table: {
        category: 'Footer'
      }
    },
    // Start panel controls
    showStartPanel: {
      control: 'boolean',
      description: 'Show or hide the start (left) panel',
      table: {
        category: 'Start Panel'
      }
    },
    startPanelWidth: {
      control: {
        type: 'range',
        min: 100,
        max: 300,
        step: 20
      },
      description: 'Width of the start panel',
      table: {
        category: 'Start Panel'
      }
    },
    startPanelHasDivider: {
      control: 'boolean',
      description: 'Add a border to the start panel',
      table: {
        category: 'Start Panel'
      }
    },
    startPanelIsScrollable: {
      control: 'boolean',
      description: 'Enable scrollable overflow for start panel',
      table: {
        category: 'Start Panel'
      }
    },
    // End panel controls
    showEndPanel: {
      control: 'boolean',
      description: 'Show or hide the end (right) panel',
      table: {
        category: 'End Panel'
      }
    },
    endPanelWidth: {
      control: {
        type: 'range',
        min: 100,
        max: 300,
        step: 20
      },
      description: 'Width of the end panel',
      table: {
        category: 'End Panel'
      }
    },
    endPanelHasDivider: {
      control: 'boolean',
      description: 'Add a border to the end panel',
      table: {
        category: 'End Panel'
      }
    },
    endPanelIsScrollable: {
      control: 'boolean',
      description: 'Enable scrollable overflow for end panel',
      table: {
        category: 'End Panel'
      }
    }
  },
  render: (args: PlaygroundArgs) => <div {...stylex.props(styles.pageWrapper)}>
      <Card width={args.cardWidth} height={args.cardHeight}>
        <Layout padding={args.layoutPadding} header={args.showHeader ? <LayoutHeader hasDivider={args.headerHasDivider} padding={args.headerPadding}>
                <h3 {...stylex.props(styles.heading)}>Layout Header</h3>
              </LayoutHeader> : undefined} start={args.showStartPanel ? <LayoutPanel width={args.startPanelWidth} hasDivider={args.startPanelHasDivider} isScrollable={args.startPanelIsScrollable} role="navigation">
                <NavItem active>Dashboard</NavItem>
                <NavItem>Settings</NavItem>
                <NavItem>Profile</NavItem>
                <NavItem>Help</NavItem>
              </LayoutPanel> : undefined} content={<LayoutContent padding={args.contentPadding} isScrollable={args.contentIsScrollable}>
              <h4 {...stylex.props(styles.subheading)}>Main Content Area</h4>
              <br />
              <p {...stylex.props(styles.bodyText)}>
                This is the main content area. Use the controls panel to toggle
                headers, footers, side panels, and adjust their properties.
              </p>
              <br />
              <p {...stylex.props(styles.bodyText)}>
                Try setting padding to 0 to see how content can extend to the
                edges, or toggle &quot;isScrollable&quot; to change overflow
                behavior.
              </p>
              <br />
              <div {...stylex.props(styles.placeholder)}>
                Placeholder content block
              </div>
            </LayoutContent>} end={args.showEndPanel ? <LayoutPanel width={args.endPanelWidth} hasDivider={args.endPanelHasDivider} isScrollable={args.endPanelIsScrollable} role="complementary">
                <p {...stylex.props(styles.sectionLabel)}>Details</p>
                <p {...stylex.props(styles.bodyText)}>
                  Additional information or actions can go in the end panel.
                </p>
              </LayoutPanel> : undefined} footer={args.showFooter ? <LayoutFooter hasDivider={args.footerHasDivider} padding={args.footerPadding}>
                <HStack gap={2} hAlign="end">
                  <Button label="Cancel" variant="secondary">
                    Cancel
                  </Button>
                  <Button label="Save" variant="primary">
                    Save
                  </Button>
                </HStack>
              </LayoutFooter> : undefined} />
      </Card>
    </div>
}`,...w.parameters?.docs?.source}}},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  name: 'Basic Card Layout',
  render: () => <div {...stylex.props(styles.pageWrapper)}>
      <Card width={400} height={350}>
        <Layout header={<LayoutHeader hasDivider>
              <h3 {...stylex.props(styles.heading)}>Card Title</h3>
            </LayoutHeader>} content={<LayoutContent>
              <p {...stylex.props(styles.bodyText)}>
                This is a basic card layout with a header, scrollable content
                area, and footer. The layout automatically handles padding and
                spacing between sections.
              </p>
              <br />
              <p {...stylex.props(styles.bodyText)}>
                Try scrolling this content area when it overflows.
              </p>
            </LayoutContent>} footer={<LayoutFooter hasDivider>
              <HStack gap={2} hAlign="end">
                <Button label="Cancel" variant="secondary">
                  Cancel
                </Button>
                <Button label="Save" variant="primary">
                  Save
                </Button>
              </HStack>
            </LayoutFooter>} />
      </Card>
    </div>
}`,...T.parameters?.docs?.source}}},E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  name: 'Layout with Sidebar',
  render: () => <div {...stylex.props(styles.pageWrapper)}>
      <Card width={700} height={400}>
        <Layout header={<LayoutHeader hasDivider>
              <h3 {...stylex.props(styles.heading)}>Settings</h3>
            </LayoutHeader>} start={<LayoutPanel hasDivider role="navigation">
              <NavItem active>General</NavItem>
              <NavItem>Account</NavItem>
              <NavItem>Privacy</NavItem>
              <NavItem>Notifications</NavItem>
              <NavItem>Security</NavItem>
            </LayoutPanel>} content={<LayoutContent>
              <h4 {...stylex.props(styles.subheading)}>General Settings</h4>
              <br />
              <p {...stylex.props(styles.bodyText)}>
                Configure your general preferences here. The sidebar navigation
                allows you to switch between different settings sections.
              </p>
            </LayoutContent>} footer={<LayoutFooter hasDivider>
              <HStack gap={2} hAlign="end">
                <Button label="Reset" variant="secondary">
                  Reset
                </Button>
                <Button label="Save Changes" variant="primary">
                  Save Changes
                </Button>
              </HStack>
            </LayoutFooter>} />
      </Card>
    </div>
}`,...E.parameters?.docs?.source}}},D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
  name: 'Dual Panel Layout',
  render: () => <div {...stylex.props(styles.pageWrapper, styles.pageWrapperTall)}>
      <Card width="100%" maxWidth={800} height={400}>
        <Layout header={<LayoutHeader hasDivider>
              <h3 {...stylex.props(styles.heading)}>File Browser</h3>
            </LayoutHeader>} start={<LayoutPanel hasDivider>
              <p {...stylex.props(styles.sectionLabel)}>Folders</p>
              <NavItem>Documents</NavItem>
              <NavItem active>Projects</NavItem>
              <NavItem>Downloads</NavItem>
            </LayoutPanel>} content={<LayoutContent>
              <p {...stylex.props(styles.sectionLabel)}>Files</p>
              <div {...stylex.props(styles.placeholder)}>
                Select a folder to view its contents
              </div>
            </LayoutContent>} end={<LayoutPanel hasDivider>
              <p {...stylex.props(styles.sectionLabel)}>Details</p>
              <p {...stylex.props(styles.bodyText)}>
                Select a file to view details
              </p>
            </LayoutPanel>} />
      </Card>
    </div>
}`,...D.parameters?.docs?.source}}},O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
  name: 'Without Dividers',
  render: () => <div {...stylex.props(styles.pageWrapper)}>
      <Card width={400} height={350}>
        <Layout header={<LayoutHeader>
              <h3 {...stylex.props(styles.heading)}>Seamless Layout</h3>
            </LayoutHeader>} content={<LayoutContent>
              <p {...stylex.props(styles.bodyText)}>
                When dividers are not used, the layout automatically collapses
                spacing between sections for a smooth visual flow.
              </p>
            </LayoutContent>} footer={<LayoutFooter>
              <HStack gap={2} hAlign="end">
                <Button label="Continue" variant="primary">
                  Continue
                </Button>
              </HStack>
            </LayoutFooter>} />
      </Card>
    </div>
}`,...O.parameters?.docs?.source}}},k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
  name: 'Full Bleed Content',
  render: () => <div {...stylex.props(styles.pageWrapper)}>
      <Card width={400} height={350}>
        <Layout header={<LayoutHeader hasDivider>
              <h3 {...stylex.props(styles.heading)}>Full Bleed Example</h3>
            </LayoutHeader>} content={<LayoutContent padding={0}>
              <div {...stylex.props(styles.placeholderFullBleed)}>
                This content uses padding=0 to remove padding, allowing it to
                touch the edges. Useful for tables, images, or other
                edge-to-edge content.
              </div>
            </LayoutContent>} footer={<LayoutFooter hasDivider>
              <HStack gap={2} hAlign="end">
                <Button label="Close" variant="secondary">
                  Close
                </Button>
              </HStack>
            </LayoutFooter>} />
      </Card>
    </div>
}`,...k.parameters?.docs?.source}}},A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`{
  name: 'Section Variants',
  render: () => <VStack gap={6} xstyle={styles.storySection}>
      <p {...stylex.props(styles.sectionLabel)}>Section Variants</p>
      <HStack gap={4} wrap="wrap">
        <Section variant="section" width={300} height={250}>
          <Layout header={<LayoutHeader hasDivider>
                <p {...stylex.props(styles.subheading)}>Section</p>
              </LayoutHeader>} content={<LayoutContent>
                <p {...stylex.props(styles.bodyText)}>
                  Surface background color
                </p>
              </LayoutContent>} />
        </Section>

        <Section variant="muted" width={300} height={250}>
          <Layout header={<LayoutHeader hasDivider>
                <p {...stylex.props(styles.subheading)}>Wash</p>
              </LayoutHeader>} content={<LayoutContent>
                <p {...stylex.props(styles.bodyText)}>Wash background color</p>
              </LayoutContent>} />
        </Section>

        <Section variant="transparent" width={300} height={250}>
          <Layout header={<LayoutHeader hasDivider>
                <p {...stylex.props(styles.subheading)}>Transparent</p>
              </LayoutHeader>} content={<LayoutContent>
                <p {...stylex.props(styles.bodyText)}>
                  No background, shows parent
                </p>
              </LayoutContent>} />
        </Section>
      </HStack>
    </VStack>
}`,...A.parameters?.docs?.source}}},j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
  name: 'Content Only',
  render: () => <div {...stylex.props(styles.pageWrapper)}>
      <Card width={400} height={350}>
        <Layout content={<LayoutContent>
              <h3 {...stylex.props(styles.heading)}>Simple Content</h3>
              <br />
              <p {...stylex.props(styles.bodyText)}>
                A layout can have just content without header or footer. This is
                useful for simple cards or content blocks.
              </p>
            </LayoutContent>} />
      </Card>
    </div>
}`,...j.parameters?.docs?.source}}},M.parameters={...M.parameters,docs:{...M.parameters?.docs,source:{originalSource:`{
  name: 'Closed Regions',
  args: {
    isOpen: false
  },
  argTypes: {
    isOpen: {
      control: 'boolean',
      description: 'Open the regions that the closed examples hide'
    }
  },
  render: ({
    isOpen
  }: ClosedRegionsArgs) => <VStack gap={6} xstyle={styles.storySection}>
      <HStack gap={4}>
        <VStack gap={2}>
          <p {...stylex.props(styles.subheading)}>Slots omitted, padding=6</p>
          <Card width={300} height={220} data-closed-region="omitted">
            <Layout padding={6} content={<LayoutContent>
                  <p {...stylex.props(styles.bodyText)}>Content area.</p>
                </LayoutContent>} />
          </Card>
        </VStack>
        <VStack gap={2}>
          <p {...stylex.props(styles.subheading)}>
            {isOpen ? 'Regions open' : 'Regions closed'}, padding=6
          </p>
          <Card width={300} height={220} data-closed-region="closed">
            <Layout padding={6} header={isOpen && <LayoutHeader hasDivider>
                    <h3 {...stylex.props(styles.heading)}>Header</h3>
                  </LayoutHeader>} start={isOpen && <LayoutPanel width={100} hasDivider>
                    <NavItem active>Nav</NavItem>
                  </LayoutPanel>} content={<LayoutContent>
                  <p {...stylex.props(styles.bodyText)}>Content area.</p>
                </LayoutContent>} footer={isOpen && <LayoutFooter hasDivider>
                    <p {...stylex.props(styles.bodyText)}>Footer</p>
                  </LayoutFooter>} />
          </Card>
        </VStack>
      </HStack>
      <VStack gap={2}>
        <p {...stylex.props(styles.subheading)}>
          contentWidth=400 with the end panel closed
        </p>
        <div data-closed-region="content-width" {...stylex.props(styles.cwContainer, styles.cwContainer640, styles.cwContainerMatrix)}>
          <Layout contentWidth={400} header={<LayoutHeader hasDivider>
                <HStack hAlign="between">
                  <span data-header-edge="start">Header start</span>
                  <span data-header-edge="end">Header end</span>
                </HStack>
              </LayoutHeader>} content={<ScrollbarProbeContent id="closed-end" label="Closed end panel" />} end={isOpen && <LayoutPanel width={120} hasDivider>
                  <p {...stylex.props(styles.bodyText)}>Details</p>
                </LayoutPanel>} />
        </div>
      </VStack>
    </VStack>
}`,...M.parameters?.docs?.source},description:{story:"A region hidden with `isOpen && <LayoutHeader />` leaves `false` in its\nslot. The closed column must match the column that omits the slots: both\nset `padding={6}`, so the outer inset differs from the inner one. With\n`contentWidth`, a closed end panel must give the no-panel composition.",...M.parameters?.docs?.description}}},N.parameters={...N.parameters,docs:{...N.parameters?.docs,source:{originalSource:`{
  name: 'Themed Layout (Neutral vs Stone)',
  render: () => <HStack gap={6} xstyle={styles.storySection}>
      <VStack gap={3}>
        <p {...stylex.props(styles.sectionLabel)}>Stone Theme</p>
        <Theme theme={stoneTheme}>
          <Card width={400}>
            <Layout header={<LayoutHeader hasDivider>
                  <h3 {...stylex.props(styles.heading)}>Stone Theme</h3>
                </LayoutHeader>} content={<LayoutContent>
                  <p {...stylex.props(styles.bodyText)}>
                    This card uses the stone theme around the layout areas.
                  </p>
                </LayoutContent>} footer={<LayoutFooter hasDivider>
                  <HStack gap={2} hAlign="end">
                    <Button label="Cancel" variant="secondary">
                      Cancel
                    </Button>
                    <Button label="Save" variant="primary">
                      Save
                    </Button>
                  </HStack>
                </LayoutFooter>} />
          </Card>
        </Theme>
      </VStack>

      <VStack gap={3}>
        <p {...stylex.props(styles.sectionLabel)}>Neutral Theme</p>
        <Theme theme={neutralTheme}>
          <Card width={400}>
            <Layout header={<LayoutHeader hasDivider>
                  <h3 {...stylex.props(styles.heading)}>Neutral Theme</h3>
                </LayoutHeader>} content={<LayoutContent>
                  <p {...stylex.props(styles.bodyText)}>
                    This card uses the neutral theme around the layout areas.
                  </p>
                </LayoutContent>} footer={<LayoutFooter hasDivider>
                  <HStack gap={2} hAlign="end">
                    <Button label="Cancel" variant="secondary">
                      Cancel
                    </Button>
                    <Button label="Save" variant="primary">
                      Save
                    </Button>
                  </HStack>
                </LayoutFooter>} />
          </Card>
        </Theme>
      </VStack>
    </HStack>
}`,...N.parameters?.docs?.source}}},P.parameters={...P.parameters,docs:{...P.parameters?.docs,source:{originalSource:`{
  name: 'Outer Padding Demonstration',
  render: () => <VStack gap={6} xstyle={styles.storySection}>
      <p {...stylex.props(styles.sectionLabel)}>Outer Padding</p>
      <p {...stylex.props(styles.bodyText)}>
        Outer padding creates space between the container edge and the layout
        content. Notice how the dividers are inset from the container edges as
        outer padding increases.
      </p>
      <HStack gap={4} wrap="wrap">
        <VStack gap={2}>
          <p {...stylex.props(styles.subheading)}>paddingOuterX/Y = spacing0</p>
          <div {...stylex.props(...container({
          paddingOuterX: 'spacing0',
          paddingOuterY: 'spacing0'
        }), styles.demoContainer, styles.demoSize)}>
            <Layout header={<LayoutHeader hasDivider>
                  <p {...stylex.props(styles.subheading)}>Header</p>
                </LayoutHeader>} content={<LayoutContent>
                  <p {...stylex.props(styles.bodyText)}>
                    Dividers touch container edges.
                  </p>
                </LayoutContent>} footer={<LayoutFooter hasDivider>
                  <p {...stylex.props(styles.bodyText)}>Footer</p>
                </LayoutFooter>} />
          </div>
        </VStack>

        <VStack gap={2}>
          <p {...stylex.props(styles.subheading)}>paddingOuterX/Y = spacing4</p>
          <div {...stylex.props(...container({
          paddingOuterX: 'spacing4',
          paddingOuterY: 'spacing4'
        }), styles.demoContainer, styles.demoSize)}>
            <Layout header={<LayoutHeader hasDivider>
                  <p {...stylex.props(styles.subheading)}>Header</p>
                </LayoutHeader>} content={<LayoutContent>
                  <p {...stylex.props(styles.bodyText)}>
                    16px inset from edges.
                  </p>
                </LayoutContent>} footer={<LayoutFooter hasDivider>
                  <p {...stylex.props(styles.bodyText)}>Footer</p>
                </LayoutFooter>} />
          </div>
        </VStack>

        <VStack gap={2}>
          <p {...stylex.props(styles.subheading)}>paddingOuterX/Y = spacing7</p>
          <div {...stylex.props(...container({
          paddingOuterX: 'spacing7',
          paddingOuterY: 'spacing7'
        }), styles.demoContainer, styles.demoSize)}>
            <Layout header={<LayoutHeader hasDivider>
                  <p {...stylex.props(styles.subheading)}>Header</p>
                </LayoutHeader>} content={<LayoutContent>
                  <p {...stylex.props(styles.bodyText)}>
                    48px inset from edges.
                  </p>
                </LayoutContent>} footer={<LayoutFooter hasDivider>
                  <p {...stylex.props(styles.bodyText)}>Footer</p>
                </LayoutFooter>} />
          </div>
        </VStack>
      </HStack>
    </VStack>
}`,...P.parameters?.docs?.source}}},F.parameters={...F.parameters,docs:{...F.parameters?.docs,source:{originalSource:`{
  name: 'Content Width — Dividers, No Panels',
  render: () => <VStack gap={4} xstyle={styles.storySection}>
      <p {...stylex.props(styles.sectionLabel)}>
        contentWidth=640 in a 900px container; dividers remain full-bleed while
        content is constrained
      </p>
      <div {...stylex.props(styles.cwContainer, styles.cwContainer900)}>
        <Layout contentWidth={640} defaultHasDividers header={<LayoutHeader>
              <h3 {...stylex.props(styles.heading)}>Header</h3>
              <p {...stylex.props(styles.bodyText)}>
                Header content is constrained to 640px
              </p>
            </LayoutHeader>} content={<LayoutContent>
              <p {...stylex.props(styles.bodyText)}>
                Main content is constrained to 640px and centered. The dividers
                above and below span the full width of the container.
              </p>
              <br />
              <div {...stylex.props(styles.placeholder)}>
                Placeholder content block
              </div>
            </LayoutContent>} footer={<LayoutFooter>
              <HStack gap={2} hAlign="end">
                <Button label="Cancel" variant="secondary">
                  Cancel
                </Button>
                <Button label="Save" variant="primary">
                  Save
                </Button>
              </HStack>
            </LayoutFooter>} />
      </div>
    </VStack>
}`,...F.parameters?.docs?.source}}},I.parameters={...I.parameters,docs:{...I.parameters?.docs,source:{originalSource:`{
  name: 'Content Width — Start Panel',
  render: () => <VStack gap={4} xstyle={styles.storySection}>
      <p {...stylex.props(styles.sectionLabel)}>
        contentWidth=640 with a 200px start panel: the panel stays aligned while
        content extends to the open end edge
      </p>
      <div {...stylex.props(styles.cwContainer, styles.cwContainer900)}>
        <Layout contentWidth={640} defaultHasDividers header={<LayoutHeader>
              <h3 {...stylex.props(styles.heading)}>Settings</h3>
            </LayoutHeader>} start={<LayoutPanel width={200} hasDivider role="navigation">
              <NavItem active>General</NavItem>
              <NavItem>Account</NavItem>
              <NavItem>Privacy</NavItem>
              <NavItem>Notifications</NavItem>
            </LayoutPanel>} content={<LayoutContent>
              <h4 {...stylex.props(styles.subheading)}>General Settings</h4>
              <br />
              <p {...stylex.props(styles.bodyText)}>
                The start panel stays inside the centered 640px frame while the
                content area extends to the container&apos;s open end edge.
              </p>
            </LayoutContent>} footer={<LayoutFooter>
              <HStack gap={2} hAlign="end">
                <Button label="Save Changes" variant="primary">
                  Save Changes
                </Button>
              </HStack>
            </LayoutFooter>} />
      </div>
    </VStack>
}`,...I.parameters?.docs?.source}}},L.parameters={...L.parameters,docs:{...L.parameters?.docs,source:{originalSource:`{
  name: 'Content Width — Both Panels',
  render: () => <VStack gap={4} xstyle={styles.storySection}>
      <p {...stylex.props(styles.sectionLabel)}>
        contentWidth=800 with start=200 and end=200 panels in a 1200px container
      </p>
      <div {...stylex.props(styles.cwContainer, styles.cwContainer1200)}>
        <Layout contentWidth={800} defaultHasDividers header={<LayoutHeader>
              <h3 {...stylex.props(styles.heading)}>File Browser</h3>
            </LayoutHeader>} start={<LayoutPanel width={200} hasDivider>
              <p {...stylex.props(styles.sectionLabel)}>Folders</p>
              <NavItem>Documents</NavItem>
              <NavItem active>Projects</NavItem>
              <NavItem>Downloads</NavItem>
            </LayoutPanel>} content={<LayoutContent>
              <p {...stylex.props(styles.sectionLabel)}>Files</p>
              <div {...stylex.props(styles.placeholder)}>
                Select a folder to view its contents
              </div>
            </LayoutContent>} end={<LayoutPanel width={200} hasDivider>
              <p {...stylex.props(styles.sectionLabel)}>Details</p>
              <p {...stylex.props(styles.bodyText)}>
                Select a file to view details
              </p>
            </LayoutPanel>} footer={<LayoutFooter>
              <p {...stylex.props(styles.bodyText)}>3 items</p>
            </LayoutFooter>} />
      </div>
    </VStack>
}`,...L.parameters?.docs?.source}}},R.parameters={...R.parameters,docs:{...R.parameters?.docs,source:{originalSource:`{
  name: 'Content Width — Scrollbar Placement',
  tags: ['visual-baseline'],
  render: () => {
    const cases = [{
      id: 'none',
      label: 'No panels',
      start: undefined,
      end: undefined
    }, {
      id: 'start',
      label: 'Start panel only',
      start: <LayoutPanel width={160} hasDivider>
            <NavItem active>Nav</NavItem>
          </LayoutPanel>,
      end: undefined
    }, {
      id: 'both',
      label: 'Start and end panels',
      start: <LayoutPanel width={160} hasDivider>
            <NavItem active>Nav</NavItem>
          </LayoutPanel>,
      end: <LayoutPanel width={160} hasDivider>
            <p {...stylex.props(styles.bodyText)}>Details</p>
          </LayoutPanel>
    }, {
      id: 'end',
      label: 'End panel only',
      start: undefined,
      end: <LayoutPanel width={160} hasDivider>
            <p {...stylex.props(styles.bodyText)}>Details</p>
          </LayoutPanel>
    }];
    return <VStack gap={6} xstyle={styles.storySection}>
        <p {...stylex.props(styles.sectionLabel)}>
          contentWidth=640 in a 900px container. With no panels, content spans
          the container and aligns internally. With exactly one panel, content
          extends through the opposite open area. The two-panel layout remains
          constrained. Header markers expose both alignment edges.
        </p>
        {cases.map(({
        id,
        label,
        start,
        end
      }) => <VStack key={id} gap={2}>
            <p {...stylex.props(styles.subheading)}>{label}</p>
            <div data-scrollbar-layout={id} {...stylex.props(styles.cwContainer, styles.cwContainer900, styles.cwContainerMatrix)}>
              <Layout contentWidth={640} header={<LayoutHeader hasDivider>
                    <HStack hAlign="between">
                      <span data-header-edge="start">Header start</span>
                      <span data-header-edge="end">Header end</span>
                    </HStack>
                  </LayoutHeader>} start={start} content={<ScrollbarProbeContent id={id} label={label} />} end={end} />
            </div>
          </VStack>)}
      </VStack>;
  }
}`,...R.parameters?.docs?.source}}},z.parameters={...z.parameters,docs:{...z.parameters?.docs,source:{originalSource:`{
  name: 'Content Width — No Dividers',
  render: () => <VStack gap={4} xstyle={styles.storySection}>
      <p {...stylex.props(styles.sectionLabel)}>
        contentWidth=640 without dividers: constraint works the same
      </p>
      <div {...stylex.props(styles.cwContainer, styles.cwContainer900)}>
        <Layout contentWidth={640} header={<LayoutHeader>
              <h3 {...stylex.props(styles.heading)}>Seamless Layout</h3>
            </LayoutHeader>} content={<LayoutContent>
              <p {...stylex.props(styles.bodyText)}>
                Even without dividers, the content is constrained to 640px and
                centered. The visual flow is continuous with no divider lines.
              </p>
              <br />
              <div {...stylex.props(styles.placeholder)}>
                Placeholder content block
              </div>
            </LayoutContent>} footer={<LayoutFooter>
              <HStack gap={2} hAlign="end">
                <Button label="Continue" variant="primary">
                  Continue
                </Button>
              </HStack>
            </LayoutFooter>} />
      </div>
    </VStack>
}`,...z.parameters?.docs?.source}}},B.parameters={...B.parameters,docs:{...B.parameters?.docs,source:{originalSource:`{
  name: 'Content Width — Narrower Than Container',
  render: () => <VStack gap={4} xstyle={styles.storySection}>
      <p {...stylex.props(styles.sectionLabel)}>
        contentWidth=400 in a 900px container: content is visibly centered
      </p>
      <div {...stylex.props(styles.cwContainer, styles.cwContainer900)}>
        <Layout contentWidth={400} defaultHasDividers header={<LayoutHeader>
              <h3 {...stylex.props(styles.heading)}>Narrow Content</h3>
            </LayoutHeader>} content={<LayoutContent>
              <p {...stylex.props(styles.bodyText)}>
                This content is constrained to 400px inside a 900px container.
                Notice the visible centering, great for focused forms or
                settings pages.
              </p>
              <br />
              <div {...stylex.props(styles.placeholder)}>
                Narrow placeholder block
              </div>
            </LayoutContent>} footer={<LayoutFooter>
              <HStack gap={2} hAlign="end">
                <Button label="Submit" variant="primary">
                  Submit
                </Button>
              </HStack>
            </LayoutFooter>} />
      </div>
    </VStack>
}`,...B.parameters?.docs?.source}}},V.parameters={...V.parameters,docs:{...V.parameters?.docs,source:{originalSource:`{
  name: 'Content Width — Wider Than Container',
  render: () => <VStack gap={4} xstyle={styles.storySection}>
      <p {...stylex.props(styles.sectionLabel)}>
        contentWidth=2000 in a 350px container, degrades gracefully to 100%
      </p>
      <div {...stylex.props(styles.cwContainer, styles.cwContainer350)}>
        <Layout contentWidth={2000} defaultHasDividers header={<LayoutHeader>
              <h3 {...stylex.props(styles.heading)}>Overflow</h3>
            </LayoutHeader>} content={<LayoutContent>
              <p {...stylex.props(styles.bodyText)}>
                The contentWidth is 2000px but the container is only 350px. The
                content fills 100% of the available space, with no overflow or
                scrollbar.
              </p>
            </LayoutContent>} footer={<LayoutFooter>
              <p {...stylex.props(styles.bodyText)}>Footer</p>
            </LayoutFooter>} />
      </div>
    </VStack>
}`,...V.parameters?.docs?.source}}},H.parameters={...H.parameters,docs:{...H.parameters?.docs,source:{originalSource:`{
  name: 'No Content Width — Frame Wider Than the Viewport',
  render: () => <div {...stylex.props(styles.wideFrame)} data-testid="wide-frame">
      <Layout defaultHasDividers header={<LayoutHeader data-testid="wide-header">
            <h3 {...stylex.props(styles.heading)}>Header</h3>
          </LayoutHeader>} content={<LayoutContent data-testid="wide-content">
            <p {...stylex.props(styles.bodyText)}>
              The frame is 2400px wide, wider than the viewport. With no
              contentWidth, nothing caps the regions.
            </p>
          </LayoutContent>} footer={<LayoutFooter data-testid="wide-footer">
            <p {...stylex.props(styles.bodyText)}>Footer</p>
          </LayoutFooter>} />
    </div>
}`,...H.parameters?.docs?.source},description:{story:"A Layout with no `contentWidth` in a frame wider than the viewport: the\nheader and footer span the frame, as the content does.",...H.parameters?.docs?.description}}},U.parameters={...U.parameters,docs:{...U.parameters?.docs,source:{originalSource:`{
  name: 'Content Width — Responsive Panels',
  render: () => <VStack gap={6} xstyle={styles.storySection}>
      <p {...stylex.props(styles.sectionLabel)}>
        contentWidth=640 with a start panel at three container widths — 1000px,
        640px, and 400px
      </p>
      <HStack gap={4} wrap="wrap">
        <VStack gap={2}>
          <p {...stylex.props(styles.subheading)}>1000px container</p>
          <div {...stylex.props(styles.cwContainer, styles.cwContainer1000)}>
            <Layout contentWidth={640} defaultHasDividers header={<LayoutHeader>
                  <h3 {...stylex.props(styles.heading)}>Wide</h3>
                </LayoutHeader>} start={<LayoutPanel width={160} hasDivider role="navigation" label="Wide navigation">
                  <NavItem active>Dashboard</NavItem>
                  <NavItem>Settings</NavItem>
                </LayoutPanel>} content={<LayoutContent>
                  <p {...stylex.props(styles.bodyText)}>
                    Content is centered with room to spare.
                  </p>
                </LayoutContent>} footer={<LayoutFooter>
                  <p {...stylex.props(styles.bodyText)}>Footer</p>
                </LayoutFooter>} />
          </div>
        </VStack>

        <VStack gap={2}>
          <p {...stylex.props(styles.subheading)}>640px container</p>
          <div {...stylex.props(styles.cwContainer, styles.cwContainer640)}>
            <Layout contentWidth={640} defaultHasDividers header={<LayoutHeader>
                  <h3 {...stylex.props(styles.heading)}>Medium</h3>
                </LayoutHeader>} start={<LayoutPanel width={160} hasDivider role="navigation" label="Medium navigation">
                  <NavItem active>Dashboard</NavItem>
                  <NavItem>Settings</NavItem>
                </LayoutPanel>} content={<LayoutContent>
                  <p {...stylex.props(styles.bodyText)}>
                    Content fills the available space.
                  </p>
                </LayoutContent>} footer={<LayoutFooter>
                  <p {...stylex.props(styles.bodyText)}>Footer</p>
                </LayoutFooter>} />
          </div>
        </VStack>

        <VStack gap={2}>
          <p {...stylex.props(styles.subheading)}>400px container</p>
          <div {...stylex.props(styles.cwContainer, styles.cwContainer400)}>
            <Layout contentWidth={640} defaultHasDividers header={<LayoutHeader>
                  <h3 {...stylex.props(styles.heading)}>Narrow</h3>
                </LayoutHeader>} start={<LayoutPanel width={160} hasDivider role="navigation" label="Narrow navigation">
                  <NavItem active>Dashboard</NavItem>
                  <NavItem>Settings</NavItem>
                </LayoutPanel>} content={<LayoutContent>
                  <p {...stylex.props(styles.bodyText)}>Degrades to 100%.</p>
                </LayoutContent>} footer={<LayoutFooter>
                  <p {...stylex.props(styles.bodyText)}>Footer</p>
                </LayoutFooter>} />
          </div>
        </VStack>
      </HStack>
    </VStack>
}`,...U.parameters?.docs?.source}}},W.parameters={...W.parameters,docs:{...W.parameters?.docs,source:{originalSource:`{
  name: 'Content Width — Nested in AppShell',
  render: () => <VStack gap={4} xstyle={styles.storySection}>
      <p {...stylex.props(styles.sectionLabel)}>
        Layout with contentWidth=640 nested inside an AppShell
      </p>
      <div {...stylex.props(styles.cwContainer, styles.cwContainer900)}>
        <AppShell height="auto">
          <Layout contentWidth={640} defaultHasDividers header={<LayoutHeader>
                <h3 {...stylex.props(styles.heading)}>
                  App Shell + Content Width
                </h3>
              </LayoutHeader>} content={<LayoutContent>
                <p {...stylex.props(styles.bodyText)}>
                  This layout is nested inside an AppShell. The contentWidth
                  constraint applies to the inner layout while the app shell
                  provides the outer structure.
                </p>
                <br />
                <div {...stylex.props(styles.placeholder)}>
                  Placeholder content block
                </div>
              </LayoutContent>} footer={<LayoutFooter>
                <HStack gap={2} hAlign="end">
                  <Button label="Cancel" variant="secondary">
                    Cancel
                  </Button>
                  <Button label="Save" variant="primary">
                    Save
                  </Button>
                </HStack>
              </LayoutFooter>} />
        </AppShell>
      </div>
    </VStack>
}`,...W.parameters?.docs?.source}}},K.parameters={...K.parameters,docs:{...K.parameters?.docs,source:{originalSource:`{
  name: 'Nested Layout — Inset in AppShell',
  render: () => <VStack gap={4} xstyle={styles.storySection}>
      <p {...stylex.props(styles.sectionLabel)}>
        Page Layout with a details panel inside AppShell (no padding props),
        390px frame
      </p>
      <div {...stylex.props(styles.cwContainer, nestedStyles.frame390)}>
        <AppShell>
          <OrdersPageLayout panelWidth={150} />
        </AppShell>
      </div>
      <p {...stylex.props(styles.sectionLabel)}>
        Unchanged: Layout inside Card padding=2 takes the Card inset
      </p>
      <div {...stylex.props(nestedStyles.frame320)}>
        <Card padding={2}>
          <Layout height="auto" header={<LayoutHeader hasDivider>
                <h3 {...stylex.props(styles.heading)}>Card title</h3>
              </LayoutHeader>} content={<LayoutContent>
                <p {...stylex.props(styles.bodyText)}>
                  Header and content align to the Card&apos;s 8px inset.
                </p>
              </LayoutContent>} />
        </Card>
      </div>
    </VStack>
}`,...K.parameters?.docs?.source},description:{story:"A Layout nested in AppShell content keeps its regions' default inset:\nAppShell's own internal Layout is full bleed (`padding={0}`), and a\nLayout's `padding` applies only to its own regions. The Card row shows the\nunchanged path: a Layout inside a padded Card still takes the Card's inset.\nOne AppShell per story: each renders a `<main>` landmark.",...K.parameters?.docs?.description}}},q.parameters={...q.parameters,docs:{...q.parameters?.docs,source:{originalSource:`{
  name: 'Nested Layout — Inset in AppShell (960px)',
  render: () => <VStack gap={4} xstyle={styles.storySection}>
      <p {...stylex.props(styles.sectionLabel)}>
        Page Layout with a details panel inside AppShell (no padding props),
        960px frame
      </p>
      <div {...stylex.props(styles.cwContainer, nestedStyles.frame960)}>
        <AppShell>
          <OrdersPageLayout panelWidth={320} />
        </AppShell>
      </div>
    </VStack>
}`,...q.parameters?.docs?.source},description:{story:`The same nested page Layout in a 960px AppShell frame.`,...q.parameters?.docs?.description}}},J.parameters={...J.parameters,docs:{...J.parameters?.docs,source:{originalSource:`{
  name: 'Content Insets',
  render: () => {
    const body = <p {...stylex.props(styles.bodyText)}>Content area.</p>;
    const panel = <LayoutPanel width={100} hasDivider>
        <NavItem active>Nav</NavItem>
      </LayoutPanel>;
    const cases = [{
      id: 'start-panel',
      label: 'Start panel, padding=6',
      layout: <Layout padding={6} start={panel} content={<LayoutContent data-content-inset="start-panel">
                {body}
              </LayoutContent>} />
    }, {
      id: 'end-panel',
      label: 'End panel, padding=6',
      layout: <Layout padding={6} end={panel} content={<LayoutContent data-content-inset="end-panel">
                {body}
              </LayoutContent>} />
    }, {
      id: 'header-without-divider',
      label: 'Header without divider, footer with divider, padding=6',
      layout: <Layout padding={6} header={<LayoutHeader>
                <h3 {...stylex.props(styles.heading)}>Header</h3>
              </LayoutHeader>} content={<LayoutContent data-content-inset="header-without-divider">
                {body}
              </LayoutContent>} footer={<LayoutFooter hasDivider>
                <p {...stylex.props(styles.bodyText)}>Footer</p>
              </LayoutFooter>} />
    }, {
      id: 'full-bleed-start-panel',
      label: 'Start panel, padding=0',
      layout: <Layout padding={0} start={panel} content={<LayoutContent data-content-inset="full-bleed-start-panel">
                {body}
              </LayoutContent>} />
    }, {
      id: 'content-width-start-panel',
      label: 'contentWidth=240, start panel, padding=6',
      layout: <Layout padding={6} contentWidth={240} header={<LayoutHeader hasDivider>
                <h3 {...stylex.props(styles.heading)}>Header</h3>
              </LayoutHeader>} start={panel} content={<LayoutContent data-content-inset="content-width-start-panel">
                {body}
              </LayoutContent>} />
    }, {
      id: 'nested',
      label: 'Nested Layout under a header without divider',
      layout: <Layout padding={6} header={<LayoutHeader>
                <h3 {...stylex.props(styles.heading)}>Outer header</h3>
              </LayoutHeader>} content={<LayoutContent padding={0}>
                <Layout header={<LayoutHeader hasDivider>
                      <p {...stylex.props(styles.bodyText)}>Inner header</p>
                    </LayoutHeader>} content={<LayoutContent data-content-inset="nested">
                      {body}
                    </LayoutContent>} />
              </LayoutContent>} />
    }];
    return <VStack gap={4} xstyle={styles.storySection}>
        <HStack gap={4} wrap="wrap">
          {cases.map(({
          id,
          label,
          layout
        }) => <VStack key={id} gap={2}>
              <p {...stylex.props(styles.subheading)}>{label}</p>
              <div {...stylex.props(styles.cwContainer, styles.insetFrame)}>
                {layout}
              </div>
            </VStack>)}
        </HStack>
      </VStack>;
  }
}`,...J.parameters?.docs?.source},description:{story:"LayoutContent beside each kind of neighbour, in plain frames with no\npadding container: the inner inset is spacing step 4, and `padding={6}`\nsets the Layout-edge inset. Each case names its content region with\n`data-content-inset`. With `contentWidth` and one start panel, the content\nchildren end one Layout-edge inset inside the content-width frame.",...J.parameters?.docs?.description}}},Y.parameters={...Y.parameters,docs:{...Y.parameters?.docs,source:{originalSource:`{
  name: 'Footer States',
  render: () => {
    const body = <p {...stylex.props(styles.bodyText)}>Content area.</p>;
    const tallBody = <VStack gap={2}>
        {Array.from({
        length: 12
      }, (_, index) => <p key={index} {...stylex.props(styles.bodyText)}>
            Row {index + 1}
          </p>)}
        {/* A focusable control keeps the scrolling content keyboard-reachable. */}
        <Button label="Load more" variant="secondary">
          Load more
        </Button>
      </VStack>;
    const footerText = <p {...stylex.props(styles.bodyText)}>Footer</p>;
    const cases = [{
      id: 'automatic',
      label: 'No divider, padding=6',
      layout: <Layout padding={6} content={<LayoutContent>{body}</LayoutContent>} footer={<LayoutFooter data-footer-case="automatic">
                {footerText}
              </LayoutFooter>} />
    }, {
      id: 'divider',
      label: 'hasDivider, padding=6',
      layout: <Layout padding={6} content={<LayoutContent>{body}</LayoutContent>} footer={<LayoutFooter hasDivider data-footer-case="divider">
                {footerText}
              </LayoutFooter>} />
    }, {
      id: 'layout-default',
      label: 'Layout defaultHasDividers',
      layout: <Layout padding={6} defaultHasDividers content={<LayoutContent>{body}</LayoutContent>} footer={<LayoutFooter data-footer-case="layout-default">
                {footerText}
              </LayoutFooter>} />
    }, {
      id: 'explicit-off',
      label: 'Layout defaultHasDividers, hasDivider={false}',
      layout: <Layout padding={6} defaultHasDividers content={<LayoutContent>{body}</LayoutContent>} footer={<LayoutFooter hasDivider={false} data-footer-case="explicit-off">
                {footerText}
              </LayoutFooter>} />
    }, {
      id: 'padding-2',
      label: 'hasDivider, footer padding=2',
      layout: <Layout padding={6} content={<LayoutContent>{body}</LayoutContent>} footer={<LayoutFooter hasDivider padding={2} data-footer-case="padding-2">
                {footerText}
              </LayoutFooter>} />
    }, {
      id: 'full-bleed',
      label: 'hasDivider, footer padding=0',
      layout: <Layout padding={6} content={<LayoutContent>{body}</LayoutContent>} footer={<LayoutFooter hasDivider padding={0} data-footer-case="full-bleed">
                {footerText}
              </LayoutFooter>} />
    }, {
      id: 'height',
      label: 'hasDivider, height=72 below overflowing content',
      layout: <Layout padding={6} content={<LayoutContent>{tallBody}</LayoutContent>} footer={<LayoutFooter hasDivider height={72} data-footer-case="height">
                {footerText}
              </LayoutFooter>} />
    }, {
      id: 'content-width',
      label: 'hasDivider, Layout contentWidth=240',
      layout: <Layout padding={6} contentWidth={240} content={<LayoutContent>{body}</LayoutContent>} footer={<LayoutFooter hasDivider data-footer-case="content-width">
                {footerText}
              </LayoutFooter>} />
    }, {
      id: 'nested',
      label: 'Nested Layout above an outer footer without divider',
      layout: <Layout padding={6} content={<LayoutContent padding={0}>
                <Layout content={<LayoutContent>{body}</LayoutContent>} footer={<LayoutFooter hasDivider data-footer-case="nested">
                      {footerText}
                    </LayoutFooter>} />
              </LayoutContent>} footer={<LayoutFooter>{footerText}</LayoutFooter>} />
    }, {
      id: 'caller-attribute',
      label: 'No divider, caller data-divider="false"',
      layout: <Layout padding={6} content={<LayoutContent>{body}</LayoutContent>} footer={<LayoutFooter data-divider="false" data-footer-case="caller-attribute">
                {footerText}
              </LayoutFooter>} />
    }];
    return <VStack gap={4} xstyle={styles.storySection}>
        <HStack gap={4} wrap="wrap">
          {cases.map(({
          id,
          label,
          layout
        }) => <VStack key={id} gap={2}>
              <p {...stylex.props(styles.subheading)}>{label}</p>
              <div {...stylex.props(styles.cwContainer, styles.insetFrame)}>
                {layout}
              </div>
            </VStack>)}
        </HStack>
      </VStack>;
  }
}`,...Y.parameters?.docs?.source},description:{story:"LayoutFooter in each configuration, in plain frames with no padding\ncontainer: the inner inset is spacing step 4, and `padding={6}` sets the\nLayout-edge inset. Each case names its footer with `data-footer-case`. The\nnested case puts a Layout with a divided footer above an outer footer\nwithout a divider. The caller-attribute case passes its own `data-divider`,\nwhich must not replace the value the footer reflects.",...Y.parameters?.docs?.description}}},X.parameters={...X.parameters,docs:{...X.parameters?.docs,source:{originalSource:`{
  name: 'Header States',
  render: () => {
    const body = <p {...stylex.props(styles.bodyText)}>Content area.</p>;
    const tallBody = <VStack gap={2}>
        {Array.from({
        length: 12
      }, (_, index) => <p key={index} {...stylex.props(styles.bodyText)}>
            Row {index + 1}
          </p>)}
        {/* A focusable control keeps the scrolling content keyboard-reachable. */}
        <Button label="Load more" variant="secondary">
          Load more
        </Button>
      </VStack>;
    const headerText = <p {...stylex.props(styles.bodyText)}>Header</p>;
    const cases = [{
      id: 'automatic',
      label: 'No divider, padding=6',
      layout: <Layout padding={6} content={<LayoutContent>{body}</LayoutContent>} header={<LayoutHeader data-header-case="automatic">
                {headerText}
              </LayoutHeader>} />
    }, {
      id: 'divider',
      label: 'hasDivider, padding=6',
      layout: <Layout padding={6} content={<LayoutContent>{body}</LayoutContent>} header={<LayoutHeader hasDivider data-header-case="divider">
                {headerText}
              </LayoutHeader>} />
    }, {
      id: 'layout-default',
      label: 'Layout defaultHasDividers',
      layout: <Layout padding={6} defaultHasDividers content={<LayoutContent>{body}</LayoutContent>} header={<LayoutHeader data-header-case="layout-default">
                {headerText}
              </LayoutHeader>} />
    }, {
      id: 'explicit-off',
      label: 'Layout defaultHasDividers, hasDivider={false}',
      layout: <Layout padding={6} defaultHasDividers content={<LayoutContent>{body}</LayoutContent>} header={<LayoutHeader hasDivider={false} data-header-case="explicit-off">
                {headerText}
              </LayoutHeader>} />
    }, {
      id: 'padding-2',
      label: 'hasDivider, header padding=2',
      layout: <Layout padding={6} content={<LayoutContent>{body}</LayoutContent>} header={<LayoutHeader hasDivider padding={2} data-header-case="padding-2">
                {headerText}
              </LayoutHeader>} />
    }, {
      id: 'full-bleed',
      label: 'hasDivider, header padding=0',
      layout: <Layout padding={6} content={<LayoutContent>{body}</LayoutContent>} header={<LayoutHeader hasDivider padding={0} data-header-case="full-bleed">
                {headerText}
              </LayoutHeader>} />
    }, {
      id: 'height',
      label: 'hasDivider, height=72 above overflowing content',
      layout: <Layout padding={6} content={<LayoutContent>{tallBody}</LayoutContent>} header={<LayoutHeader hasDivider height={72} data-header-case="height">
                {headerText}
              </LayoutHeader>} />
    }, {
      id: 'content-width',
      label: 'hasDivider, Layout contentWidth=240',
      layout: <Layout padding={6} contentWidth={240} content={<LayoutContent>{body}</LayoutContent>} header={<LayoutHeader hasDivider data-header-case="content-width">
                {headerText}
              </LayoutHeader>} />
    }, {
      id: 'padding-block-end',
      label: 'hasDivider, paddingBlockEnd=0',
      layout: <Layout padding={6} content={<LayoutContent>{body}</LayoutContent>} header={<LayoutHeader hasDivider paddingBlockEnd={0} data-header-case="padding-block-end">
                {headerText}
              </LayoutHeader>} />
    }, {
      id: 'nested',
      label: 'Nested Layout below an outer header without divider',
      layout: <Layout padding={6} content={<LayoutContent padding={0}>
                <Layout content={<LayoutContent>{body}</LayoutContent>} header={<LayoutHeader hasDivider data-header-case="nested">
                      {headerText}
                    </LayoutHeader>} />
              </LayoutContent>} header={<LayoutHeader>{headerText}</LayoutHeader>} />
    }, {
      id: 'caller-attribute',
      label: 'No divider, caller data-divider="false"',
      layout: <Layout padding={6} content={<LayoutContent>{body}</LayoutContent>} header={<LayoutHeader data-divider="false" data-header-case="caller-attribute">
                {headerText}
              </LayoutHeader>} />
    }];
    return <VStack gap={4} xstyle={styles.storySection}>
        <HStack gap={4} wrap="wrap">
          {cases.map(({
          id,
          label,
          layout
        }) => <VStack key={id} gap={2}>
              <p {...stylex.props(styles.subheading)}>{label}</p>
              <div {...stylex.props(styles.cwContainer, styles.insetFrame)}>
                {layout}
              </div>
            </VStack>)}
        </HStack>
      </VStack>;
  }
}`,...X.parameters?.docs?.source},description:{story:"LayoutHeader in each configuration, in plain frames with no padding\ncontainer: the inner inset is spacing step 4, and `padding={6}` sets the\nLayout-edge inset. Each case names its header with `data-header-case`. The\nnested case puts a Layout with a divided header below an outer header\nwithout a divider. The caller-attribute case passes its own `data-divider`,\nwhich must not replace the value the header reflects.",...X.parameters?.docs?.description}}},Z.parameters={...Z.parameters,docs:{...Z.parameters?.docs,source:{originalSource:`{
  name: 'Panel States',
  render: () => {
    const body = <p {...stylex.props(styles.bodyText)}>Content area.</p>;
    const panelText = <p {...stylex.props(styles.bodyText)}>Panel</p>;
    const rows = Array.from({
      length: 12
    }, (_, index) => <p key={index} {...stylex.props(styles.bodyText)}>
        Item {index + 1}
      </p>);
    const cases = [{
      id: 'start-automatic',
      label: 'Start, no divider, padding=6',
      layout: <Layout padding={6} start={<LayoutPanel width={120} data-panel-case="start-automatic">
                {panelText}
              </LayoutPanel>} content={<LayoutContent>{body}</LayoutContent>} />
    }, {
      id: 'start-divider',
      label: 'Start, hasDivider, padding=6',
      layout: <Layout padding={6} start={<LayoutPanel width={120} hasDivider data-panel-case="start-divider">
                {panelText}
              </LayoutPanel>} content={<LayoutContent>{body}</LayoutContent>} />
    }, {
      id: 'end-automatic',
      label: 'End, no divider, padding=6',
      layout: <Layout padding={6} end={<LayoutPanel width={120} data-panel-case="end-automatic">
                {panelText}
              </LayoutPanel>} content={<LayoutContent>{body}</LayoutContent>} />
    }, {
      id: 'end-divider',
      label: 'End, hasDivider, padding=6',
      layout: <Layout padding={6} end={<LayoutPanel width={120} hasDivider data-panel-case="end-divider">
                {panelText}
              </LayoutPanel>} content={<LayoutContent>{body}</LayoutContent>} />
    }, {
      id: 'header-footer',
      label: 'Start, hasDivider, with header and footer',
      layout: <Layout padding={6} header={<LayoutHeader hasDivider>
                <p {...stylex.props(styles.bodyText)}>Header</p>
              </LayoutHeader>} start={<LayoutPanel width={120} hasDivider data-panel-case="header-footer">
                {panelText}
              </LayoutPanel>} content={<LayoutContent>{body}</LayoutContent>} footer={<LayoutFooter hasDivider>
                <p {...stylex.props(styles.bodyText)}>Footer</p>
              </LayoutFooter>} />
    }, {
      id: 'bleed-child',
      label: 'Start, hasDivider, full-bleed Divider inside',
      layout: <Layout padding={6} start={<LayoutPanel width={160} hasDivider data-panel-case="bleed-child">
                {panelText}
                <Divider isFullBleed />
                {panelText}
              </LayoutPanel>} content={<LayoutContent>{body}</LayoutContent>} />
    }, {
      id: 'padding-2',
      label: 'Start, hasDivider, panel padding=2',
      layout: <Layout padding={6} start={<LayoutPanel width={120} hasDivider padding={2} data-panel-case="padding-2">
                {panelText}
              </LayoutPanel>} content={<LayoutContent>{body}</LayoutContent>} />
    }, {
      id: 'full-bleed',
      label: 'Start, hasDivider, panel padding=0',
      layout: <Layout padding={6} start={<LayoutPanel width={120} hasDivider padding={0} data-panel-case="full-bleed">
                {panelText}
              </LayoutPanel>} content={<LayoutContent>{body}</LayoutContent>} />
    }, {
      id: 'width-string',
      label: 'Start, hasDivider, width="10rem"',
      layout: <Layout padding={6} start={<LayoutPanel width="10rem" hasDivider data-panel-case="width-string">
                {panelText}
              </LayoutPanel>} content={<LayoutContent>{body}</LayoutContent>} />
    }, {
      id: 'landmark',
      label: 'Start, role="navigation", label="Sections"',
      layout: <Layout padding={6} start={<LayoutPanel width={120} hasDivider role="navigation" label="Sections" data-panel-case="landmark">
                {panelText}
              </LayoutPanel>} content={<LayoutContent>{body}</LayoutContent>} />
    }, {
      id: 'scrolling',
      label: 'Start, overflowing content',
      layout: <Layout padding={6} start={<LayoutPanel width={120} hasDivider data-panel-case="scrolling">
                <VStack gap={2}>
                  {rows}
                  {/* A focusable control keeps the scrolling content keyboard-reachable. */}
                  <Button label="More" variant="secondary">
                    More
                  </Button>
                </VStack>
              </LayoutPanel>} content={<LayoutContent>{body}</LayoutContent>} />
    }, {
      id: 'not-scrollable',
      label: 'Start, overflowing content, isScrollable={false}',
      layout: <Layout padding={6} start={<LayoutPanel width={120} hasDivider isScrollable={false} data-panel-case="not-scrollable">
                <VStack gap={2}>{rows}</VStack>
              </LayoutPanel>} content={<LayoutContent>{body}</LayoutContent>} />
    }];
    return <VStack gap={4} xstyle={styles.storySection}>
        <HStack gap={4} wrap="wrap">
          {cases.map(({
          id,
          label,
          layout
        }) => <VStack key={id} gap={2}>
              <p {...stylex.props(styles.subheading)}>{label}</p>
              <div {...stylex.props(styles.cwContainer, styles.insetFrame)}>
                {layout}
              </div>
            </VStack>)}
        </HStack>
      </VStack>;
  }
}`,...Z.parameters?.docs?.source}}},Q=`Playground.BasicCard.WithSidebar.DualPanels.NoDividers.FullBleedContent.SectionVariants.ContentOnly.ClosedRegions.ThemedLayout.OuterPaddingDemo.ContentWidthWithDividers.ContentWidthWithStartPanel.ContentWidthWithBothPanels.ContentWidthScrollbarPlacement.ContentWidthNoDividers.ContentWidthNarrower.ContentWidthWider.WiderThanViewport.ContentWidthResponsive.ContentWidthInAppShell.NestedInAppShell.NestedInAppShellWide.ContentInsets.FooterStates.HeaderStates.PanelStates`.split(`.`)})))()}$();export{T as BasicCard,M as ClosedRegions,J as ContentInsets,j as ContentOnly,W as ContentWidthInAppShell,B as ContentWidthNarrower,z as ContentWidthNoDividers,U as ContentWidthResponsive,R as ContentWidthScrollbarPlacement,V as ContentWidthWider,L as ContentWidthWithBothPanels,F as ContentWidthWithDividers,I as ContentWidthWithStartPanel,D as DualPanels,Y as FooterStates,k as FullBleedContent,X as HeaderStates,K as NestedInAppShell,q as NestedInAppShellWide,O as NoDividers,P as OuterPaddingDemo,Z as PanelStates,w as Playground,A as SectionVariants,N as ThemedLayout,H as WiderThanViewport,E as WithSidebar,Q as __namedExportsOrder,C as default};