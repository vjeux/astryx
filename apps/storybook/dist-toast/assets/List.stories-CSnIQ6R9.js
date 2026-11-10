import{a as e,n as t}from"./rolldown-runtime-sJBDdmOt.js";import{t as n}from"./react-DlPsW1c0.js";import{t as r}from"./jsx-runtime-MKhVqBIO.js";import{n as i,t as a}from"./rtlStyles-BwjrfDSU.js";import{n as o,t as s}from"./Text-C5BHw0wv.js";import{n as c,t as l}from"./Icon-BmO5FtDV.js";import{n as u,t as d}from"./Button-DoGM0DEN.js";import{n as f,t as p}from"./Heading-YiIeUtHm.js";import{n as ee,t as te}from"./useAnimatedLayout-pgfL2aMP.js";import{n as ne,t as m}from"./Avatar-C6K3OBt3.js";import{n as re,t as h}from"./Badge-DqOhTiyH.js";import{n as ie,t as ae}from"./Card-DA0ZfoAz.js";import{n as oe,t as g}from"./VStack-SWtDePqc.js";import{n as se,t as _}from"./ListItem-C2dBt6xL.js";import{n as ce,t as v}from"./List-Bq_ZN_6g.js";import{n as le,t as ue}from"./ContextMenu-Di_JOkJz.js";import{n as de,t as fe}from"./Switch-C8kZJ1p7.js";import{n as pe,t as me}from"./createReorderable-BR-o97fJ.js";import{n as he,t as ge}from"./BellIcon-fgdNGfIx.js";import{n as _e,t as y}from"./ChevronRightIcon-BklTrRu0.js";import{n as ve,t as ye}from"./Cog6ToothIcon-CMrx7Bfx.js";import{n as be,t as xe}from"./DocumentIcon-DhksX2wy.js";import{n as Se,t as Ce}from"./ShieldCheckIcon-T0uBknyE.js";function we({title:e,titleId:t,...n},r){return b.createElement(`svg`,Object.assign({xmlns:`http://www.w3.org/2000/svg`,fill:`none`,viewBox:`0 0 24 24`,strokeWidth:1.5,stroke:`currentColor`,"aria-hidden":`true`,"data-slot":`icon`,ref:r,"aria-labelledby":t},n),e?b.createElement(`title`,{id:t},e):null,b.createElement(`path`,{strokeLinecap:`round`,strokeLinejoin:`round`,d:`M2.25 13.5h3.86a2.25 2.25 0 0 1 2.012 1.244l.256.512a2.25 2.25 0 0 0 2.013 1.244h3.218a2.25 2.25 0 0 0 2.013-1.244l.256-.512a2.25 2.25 0 0 1 2.013-1.244h3.859m-19.5.338V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 0 0-2.15-1.588H6.911a2.25 2.25 0 0 0-2.15 1.588L2.35 13.177a2.25 2.25 0 0 0-.1.661Z`}))}var b,x;function Te(){return(Te=t((()=>{b=e(n()),x=b.forwardRef(we)})))()}function Ee({title:e,titleId:t,...n},r){return S.createElement(`svg`,Object.assign({xmlns:`http://www.w3.org/2000/svg`,fill:`none`,viewBox:`0 0 24 24`,strokeWidth:1.5,stroke:`currentColor`,"aria-hidden":`true`,"data-slot":`icon`,ref:r,"aria-labelledby":t},n),e?S.createElement(`title`,{id:t},e):null,S.createElement(`path`,{strokeLinecap:`round`,strokeLinejoin:`round`,d:`M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5`}))}var S,De;function Oe(){return(Oe=t((()=>{S=e(n()),De=S.forwardRef(Ee)})))()}function ke(e){let t=e.getBoundingClientRect(),n=[],r=[];return e.querySelectorAll(`ul > li`).forEach((e,i)=>{let a=getComputedStyle(e,`::after`);if(a.position!==`absolute`)return;let o=getComputedStyle(e),s=e.getBoundingClientRect(),c=s.top+parseFloat(o.borderTopWidth)+parseFloat(a.top),l=s.bottom-parseFloat(o.borderBottomWidth)-parseFloat(a.bottom),u=s.left+parseFloat(o.borderLeftWidth)+parseFloat(a.left),d=s.right-parseFloat(o.borderRightWidth)-parseFloat(a.right);if(![c,l,u,d].every(Number.isFinite))return;let f=k[i]??`Row ${i+1}`;r.push({label:f,above:A(s.top-c),below:A(l-s.bottom)});let p=(e,r,i,a,o)=>{a-r>=.5&&o-i>=.5&&n.push({key:`${f} ${e}`,left:r-t.left,top:i-t.top,width:a-r,height:o-i})};p(`above`,u,c,d,s.top),p(`below`,u,s.bottom,d,l),p(`left`,u,s.top,s.left,s.bottom),p(`right`,s.right,s.top,d,s.bottom)}),{bands:n,reach:r}}function Ae(){let e=(0,w.useRef)(null),t=(0,w.useRef)(!1),[n,r]=(0,w.useState)(`nothing yet`),[i,a]=(0,w.useState)({bands:[],reach:[]});(0,w.useEffect)(()=>{let n=e.current;if(n==null)return;let i=0,o=()=>{i=0,a(ke(n))},s=()=>{i===0&&(i=requestAnimationFrame(o))},c=n.querySelectorAll(`ul`),l=new MutationObserver(s),u=new ResizeObserver(s);u.observe(n),c.forEach(e=>{l.observe(e,{attributes:!0,attributeFilter:[`style`],subtree:!0}),u.observe(e)});let d=n.ownerDocument,f=0,p=()=>{t.current=!1,clearTimeout(f),f=window.setTimeout(()=>{t.current||r(`none`)})};return d.addEventListener(`click`,p,!0),s(),()=>{cancelAnimationFrame(i),clearTimeout(f),l.disconnect(),u.disconnect(),d.removeEventListener(`click`,p,!0)}},[]);let o=e=>{t.current=!0,r(e)},c=e=>(0,T.jsx)(_,{label:e,onClick:()=>o(e)},e);return(0,T.jsxs)(g,{gap:4,children:[(0,T.jsx)(`div`,{"aria-live":`polite`,children:(0,T.jsxs)(s,{children:[`Last tapped: `,n]})}),(0,T.jsxs)(`div`,{ref:e,className:`x1n2onr6 xggk2y7`,children:[(0,T.jsxs)(g,{gap:2,children:[(0,T.jsx)(v,{density:`compact`,hasDividers:!0,children:k.slice(0,2).map(c)}),(0,T.jsx)(v,{density:`compact`,hasDividers:!0,children:k.slice(2).map(c)})]}),(0,T.jsx)(`div`,{"aria-hidden":`true`,className:`x10l6tqk x10a8y8t x47corl`,children:i.bands.map(e=>(0,T.jsx)(`div`,{className:`x10l6tqk xhddefb xq279if x1g40iwv`,style:{left:e.left,top:e.top,width:e.width,height:e.height}},e.key))})]}),(0,T.jsx)(g,{gap:1,children:i.reach.length===0?(0,T.jsx)(s,{color:`secondary`,children:`No bands with a mouse: a row's target is its own box. Open this story on a touch screen.`}):i.reach.map(({label:e,above:t,below:n})=>(0,T.jsxs)(s,{color:`secondary`,children:[e,`: `,t,` px above, `,n,` px below`]},e))})]})}function je(){let[e,t]=(0,w.useState)(!0);return(0,T.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:4},children:[(0,T.jsxs)(v,{density:`compact`,hasDividers:!0,header:(0,T.jsxs)(`div`,{style:{display:`flex`,alignItems:`center`,justifyContent:`space-between`},children:[(0,T.jsx)(s,{type:`label`,size:`lg`,children:`Connections`}),(0,T.jsx)(d,{label:`Edit`,variant:`ghost`,size:`sm`})]}),children:[(0,T.jsx)(_,{label:`Network`,onClick:()=>{},endContent:(0,T.jsx)(l,{icon:y,xstyle:i.mirror}),swipeActions:{trailing:[{label:`Forget`,onActivate:()=>{}}]}}),(0,T.jsx)(_,{label:`Wi-Fi`,endContent:(0,T.jsx)(fe,{label:`Wi-Fi`,isLabelHidden:!0,value:e,onChange:e=>t(e)})}),(0,T.jsx)(_,{label:`Bluetooth`,onClick:()=>{},endContent:(0,T.jsx)(l,{icon:y,xstyle:i.mirror})})]}),(0,T.jsx)(d,{label:`Load more`,variant:`secondary`})]})}function Me(){let[e,t]=(0,w.useState)(!1);return(0,T.jsxs)(v,{hasDividers:!0,header:(0,T.jsxs)(`div`,{style:{display:`flex`,alignItems:`center`,justifyContent:`space-between`},children:[(0,T.jsx)(s,{type:`label`,size:`lg`,children:`Notifications`}),(0,T.jsx)(fe,{label:`Show archived`,value:e,onChange:e=>t(e)})]}),children:[(0,T.jsx)(_,{label:`New deployment succeeded`,description:`Production v2.4.1 deployed`,startContent:(0,T.jsx)(l,{icon:ge})}),(0,T.jsx)(_,{label:`Security alert`,description:`Unusual login detected`,startContent:(0,T.jsx)(l,{icon:Ce})}),e&&(0,T.jsx)(_,{label:`Archived: Build completed`,description:`CI pipeline finished`,startContent:(0,T.jsx)(l,{icon:ye})})]})}function Ne(){let[e,t]=(0,w.useState)([`Inbox`,`Sent`,`Drafts`,`Archive`,`Spam`]),[n,r]=(0,w.useState)(1),i=(0,w.useRef)(null),a=ee({containerRef:i});return(0,T.jsx)(`div`,{ref:i,children:(0,T.jsxs)(g,{gap:4,children:[(0,T.jsx)(v,{animatedLayout:a,hasDividers:!0,children:e.map(e=>(0,T.jsx)(_,{itemKey:e,label:e,onClick:()=>{}},e))}),(0,T.jsx)(s,{"data-testid":`after-list`,children:`${e.length} folders`}),(0,T.jsx)(d,{label:`Insert a row second`,onClick:()=>{t(e=>[e[0],`Folder ${n}`,...e.slice(1)]),r(e=>e+1)}}),(0,T.jsx)(d,{label:`Remove the second row`,onClick:()=>t(e=>e.filter((e,t)=>t!==1))}),(0,T.jsx)(d,{label:`Move the last row first`,onClick:()=>t(e=>[e[e.length-1],...e.slice(0,-1)])})]})})}function Pe(){let[e,t]=(0,w.useState)([`Inbox`,`Sent`,`Drafts`,`Archive`,q]),n=(0,w.useRef)(null),r=ee({containerRef:n}),i=e=>t(t=>t.includes(e)?[e,...t.filter(t=>t!==e)]:t);return(0,T.jsxs)(`div`,{ref:n,children:[(0,T.jsx)(v,{animatedLayout:r,hasDividers:!0,children:e.map(e=>(0,T.jsx)(_,{itemKey:e,label:e,onClick:()=>{},swipeActions:e===q?void 0:{trailing:[{label:`Delete`,variant:`destructive`,hasRemoval:!0,onActivate:()=>t(t=>t.filter(t=>t!==e))}]}},e))}),(0,T.jsx)(d,{label:`Move Archive first`,variant:`secondary`,onClick:()=>i(`Archive`)}),(0,T.jsx)(d,{label:`Move Notes first`,variant:`secondary`,onClick:()=>i(q)})]})}function Fe(e,t,n){let r=e.filter(e=>e!==t);return r.splice(n,0,t),r}function C({initial:e,pinned:t=[],edge:n}){let[r,i]=(0,w.useState)(e);return(0,T.jsx)(v,{hasDividers:!0,edge:n,reorderable:me({onReorder:({key:e,to:t})=>i(n=>Fe(n,e,t)),isReorderable:e=>!t.includes(e)}),children:r.map(e=>(0,T.jsx)(_,{itemKey:e,label:e},e))})}function Ie(){let[e,t]=(0,w.useState)([`Inbox`,`Sent`,`Drafts`,`Archive`,`Spam`,`Trash`]),[n,r]=(0,w.useState)(`Sent`),i=(0,w.useMemo)(()=>me({onReorder:({key:e,to:n})=>t(t=>Fe(t,e,n))}),[]);return(0,T.jsxs)(g,{gap:2,children:[(0,T.jsx)(d,{label:`Move ${n}`,onClick:()=>i.start(n)}),(0,T.jsx)(ue,{label:`Row actions`,items:[{label:`Move ${n}`,onClick:()=>i.start(n)}],children:(0,T.jsx)(v,{hasDividers:!0,reorderable:i,children:e.map(e=>(0,T.jsx)(_,{itemKey:e,label:e,isSelected:e===n,onClick:()=>r(e)},e))})})]})}var w,T,Le,E,D,O,k,A,j,M,N,Re,P,F,I,L,R,z,B,V,H,U,W,G,K,q,J,Y,X,Z,Q,$,ze;function Be(){return(Be=t((()=>{w=n(),ce(),se(),pe(),ne(),re(),u(),ie(),c(),de(),f(),o(),oe(),te(),a(),le(),ve(),he(),Se(),_e(),Te(),Oe(),be(),T=r(),Le={title:`Core/List`,component:v,tags:[`autodocs`],argTypes:{density:{control:`select`,options:[`compact`,`balanced`,`spacious`],description:`Spacing density for list items`},hasDividers:{control:`boolean`,description:`Whether to show dividers between items`},edge:{control:`select`,options:[`padded`,`flush`,`outset`,`bleed`],description:`Where row text, dividers, and backgrounds sit relative to the list's edges and the container's padding`},listStyle:{control:`select`,options:[`none`,`disc`,`decimal`,`circle`],description:`List marker style`}}},E={render:e=>(0,T.jsxs)(v,{...e,children:[(0,T.jsx)(_,{label:`Notifications`,description:`Manage your alerts`}),(0,T.jsx)(_,{label:`Privacy`,description:`Control your data`}),(0,T.jsx)(_,{label:`Security`,description:`Password and 2FA`})]})},D={render:e=>(0,T.jsxs)(v,{hasDividers:!0,header:(0,T.jsx)(`strong`,{children:`Settings`}),...e,children:[(0,T.jsx)(_,{label:`Notifications`,description:`Manage your alerts`,startContent:(0,T.jsx)(l,{icon:ge})}),(0,T.jsx)(_,{label:`Privacy`,description:`Control your data`,startContent:(0,T.jsx)(l,{icon:Ce})}),(0,T.jsx)(_,{label:`General`,description:`App preferences`,startContent:(0,T.jsx)(l,{icon:ye})})]})},O={render:e=>(0,T.jsxs)(v,{density:`compact`,hasDividers:!0,...e,children:[(0,T.jsx)(_,{label:`Notifications`,onClick:()=>{},endContent:(0,T.jsx)(h,{label:`3`})}),(0,T.jsx)(_,{label:`Messages`,onClick:()=>{},endContent:(0,T.jsx)(h,{label:`12`})}),(0,T.jsx)(_,{label:`Settings`,onClick:()=>{}})]})},k=[`Row 1`,`Row 2`,`Row 3`,`Row 4`],A=e=>Math.round(e*2)/2,j={render:()=>(0,T.jsx)(Ae,{}),parameters:{docs:{description:{story:`Under a finger each compact row's touch target reaches past its box where nothing is near, up to 44 px tall. The striped bands show that reach, read from the rows' own hit layers. They sit above the first row, below the last one, and halfway across the gap between the two lists. Touching rows have no band between them. The readout names the row a tap fires, or "none".`}}}},M={render:e=>(0,T.jsxs)(v,{density:`spacious`,...e,children:[(0,T.jsx)(_,{label:`Getting Started`,description:`Learn the basics of our platform`}),(0,T.jsx)(_,{label:`Advanced Topics`,description:`Deep dive into advanced features`}),(0,T.jsx)(_,{label:`API Reference`,description:`Complete API documentation`})]})},N={args:{edge:`flush`,hasDividers:!0},render:e=>(0,T.jsxs)(`div`,{children:[(0,T.jsx)(s,{type:`label`,size:`lg`,children:`Order items`}),(0,T.jsxs)(v,{...e,children:[(0,T.jsx)(_,{label:`Solstice Mug`,description:`Ceramic, 12 oz`}),(0,T.jsx)(_,{label:`Meridian Notebook`,description:`Dot grid, A5`}),(0,T.jsx)(_,{label:`Field Pen`,description:`0.5 mm, black ink`})]})]}),parameters:{docs:{description:{story:`edge="flush" drops the rows' side padding, so row text starts on the same line as the heading and the ends of the dividers, with no container needed. Switch edge to compare.`}}}},Re=[`padded`,`flush`,`outset`,`bleed`],P={render:e=>(0,T.jsx)(`div`,{className:`xrvj5dj x1vn7x89 x1665zp3`,children:Re.map(t=>(0,T.jsx)(ae,{"data-edge":t,children:(0,T.jsxs)(g,{gap:3,children:[(0,T.jsx)(p,{level:3,children:`edge="${t}"`}),(0,T.jsxs)(v,{...e,edge:t,hasDividers:!0,children:[(0,T.jsx)(_,{label:`Ada Lovelace`,description:`Engineer`}),(0,T.jsx)(_,{label:`Grace Hopper`,description:`Admiral`})]}),(0,T.jsxs)(v,{...e,edge:t,children:[(0,T.jsx)(_,{label:`Inbox`,onClick:()=>{},startContent:(0,T.jsx)(l,{icon:x})}),(0,T.jsx)(_,{label:`Sent`,isSelected:!0,onClick:()=>{},startContent:(0,T.jsx)(l,{icon:De})})]})]})},t))}),parameters:{docs:{description:{story:`padded keeps text inside each row's padding. flush puts text, dividers, and backgrounds on the heading's line. outset puts text on the heading's line and reaches backgrounds into the card's padding by the rows' own padding. bleed reaches rows to the card's edges, like Table rows, with text on the card's padding line.`}}}},F={render:e=>(0,T.jsxs)(v,{...e,children:[(0,T.jsx)(_,{label:`Inbox`,isSelected:!0,onClick:()=>{},startContent:(0,T.jsx)(l,{icon:x}),endContent:(0,T.jsx)(l,{icon:y})}),(0,T.jsx)(_,{label:`Sent`,onClick:()=>{},startContent:(0,T.jsx)(l,{icon:De}),endContent:(0,T.jsx)(l,{icon:y})}),(0,T.jsx)(_,{label:`Drafts`,onClick:()=>{},startContent:(0,T.jsx)(l,{icon:xe}),endContent:(0,T.jsx)(l,{icon:y})})]})},I={render:e=>(0,T.jsxs)(v,{...e,children:[(0,T.jsx)(_,{label:`Documentation`,href:`/docs`}),(0,T.jsx)(_,{label:`GitHub`,href:`https://github.com`,target:`_blank`,description:`View source code`}),(0,T.jsx)(_,{label:`Storybook`,href:`/storybook`,description:`Component playground`})]})},L={render:()=>(0,T.jsx)(je,{}),parameters:{docs:{description:{story:`A compact row whose end content is its own control, a switch, between two interactive rows (the first one swipeable), under a header with its own button and above a button 4 px after the list. Under a finger, the interactive rows grow their touch targets only where nothing is near, never into the control's row, and a tap on the switch stays the switch's.`}}}},R={render:e=>(0,T.jsxs)(v,{listStyle:`decimal`,...e,children:[(0,T.jsx)(_,{label:`Install the package`,description:`npm install @astryxdesign/core`}),(0,T.jsx)(_,{label:`Import components`,description:`import { List } from '@astryxdesign/core'`}),(0,T.jsx)(_,{label:`Start building`,description:`Use components in your app`})]})},z={args:{listStyle:`decimal`,start:98},render:e=>(0,T.jsxs)(v,{...e,children:[(0,T.jsx)(_,{label:(0,T.jsx)(T.Fragment,{children:`Review the migration before applying it to your project.`})}),(0,T.jsx)(_,{label:(0,T.jsx)(T.Fragment,{children:`Check that existing behavior stays unchanged.`})}),(0,T.jsx)(_,{label:(0,T.jsx)(T.Fragment,{children:`Verify that the complete number stays beside its label.`})})]})},B={args:{listStyle:`decimal`,start:9},render:e=>(0,T.jsxs)(v,{...e,children:[(0,T.jsx)(_,{align:`first-line`,startContent:(0,T.jsx)(m,{name:`Ada Lovelace`,size:40}),label:(0,T.jsx)(T.Fragment,{children:`A numbered row with a tall avatar and a wrapped first line.`})}),(0,T.jsx)(_,{align:`first-line`,startContent:(0,T.jsx)(m,{name:`Grace Hopper`,size:40}),label:(0,T.jsx)(T.Fragment,{children:`The number and avatar follow the same first text line.`})})]})},V={render:e=>(0,T.jsxs)(v,{listStyle:`disc`,...e,children:[(0,T.jsx)(_,{label:`Accessible by default`}),(0,T.jsx)(_,{label:`Themeable with StyleX`}),(0,T.jsx)(_,{label:`Composable and extensible`})]})},H={render:e=>(0,T.jsxs)(v,{...e,children:[(0,T.jsx)(_,{label:`Available`,onClick:()=>{}}),(0,T.jsx)(_,{label:`Unavailable`,onClick:()=>{},isDisabled:!0}),(0,T.jsx)(_,{label:`Also Available`,onClick:()=>{}})]})},U={render:e=>(0,T.jsxs)(v,{hasDividers:!0,...e,children:[(0,T.jsx)(_,{label:`Alex Johnson`,description:`Hey, are we still on for lunch tomorrow?`,startContent:(0,T.jsx)(m,{name:`Alex Johnson`,size:40}),onClick:()=>{},endContent:(0,T.jsx)(h,{label:`2`})}),(0,T.jsx)(_,{label:`Sam Rivera`,description:`I pushed the latest changes to the repo`,startContent:(0,T.jsx)(m,{name:`Sam Rivera`,size:40}),onClick:()=>{}}),(0,T.jsx)(_,{label:`Jordan Lee`,description:`Can you review the design spec when you get a chance?`,startContent:(0,T.jsx)(m,{name:`Jordan Lee`,size:40}),onClick:()=>{},endContent:(0,T.jsx)(h,{label:`5`})})]})},W={render:()=>(0,T.jsx)(Me,{}),parameters:{docs:{description:{story:`A list with a toggle in the header. The header and list are wrapped so they stack correctly even inside flex parents.`}}}},G={render:()=>(0,T.jsxs)(`div`,{style:{display:`flex`,gap:24,border:`1px dashed #888`,padding:16},children:[(0,T.jsx)(`div`,{style:{flex:1},children:(0,T.jsx)(s,{type:`label`,size:`lg`,children:`Sidebar`})}),(0,T.jsx)(`div`,{style:{flex:2},children:(0,T.jsx)(Me,{})})]}),parameters:{docs:{description:{story:`Demonstrates the list with a header inside a flex parent. The header should appear above the list, not beside it.`}}}},K={render:()=>(0,T.jsx)(Ne,{}),parameters:{docs:{description:{story:"With `animatedLayout` (the handle from `useAnimatedLayout`) and an `itemKey` on each row, an inserted row enters, a removed row collapses in place, a row crossing rows that move the other way rides above them with the surface color behind it, and the rows after a change and the buttons below the list glide to their new places, all on one shared motion, under every pointer."}}}},q=`Notes`,J={render:()=>(0,T.jsx)(Pe,{}),parameters:{docs:{description:{story:"With `animatedLayout`, a row swiped away with a removal action collapses in place, its action showing, while the rows below glide up into its gap on the shared motion. A row moved up across the swipeable rows, with swipe actions (Archive) or without (Notes), rides above the rows it crosses."}}}},Y={render:()=>(0,T.jsx)(C,{initial:[`Inbox`,`Sent`,`Drafts`,`Archive`,`Spam`,`Trash`]}),parameters:{docs:{description:{story:"With `reorderable` (from `createReorderable`), each row with an `itemKey` gets a reorder handle. On a touch screen, hold a handle for a moment, then drag: the row dims in place, a copy follows your finger and a line marks where it will land, and the rows rearrange on release. A mouse drags a handle at once, the same way. Or activate a handle (click it, or press Space or Enter) to turn on reorder mode for its row: each arrow key, or each move in the hint below the handle, moves it a place, and Escape or Done ends the mode."}}}},X={render:()=>(0,T.jsx)(C,{initial:[`Inbox`,`Sent`,`Drafts`,`Archive`],edge:`flush`}),parameters:{docs:{description:{story:'With `edge="flush"` the rows have no side padding, so each reorder handle ends at the row\'s edge, inside the list.'}}}},Z={render:()=>(0,T.jsx)(C,{initial:[`Favorites`,`Inbox`,`Sent`,`All mail`,`Drafts`,`Spam`],pinned:[`Favorites`,`All mail`]}),parameters:{docs:{description:{story:"A row the object’s `isReorderable` rejects has no handle. At an end of the list it also bounds the others (nothing drops above Favorites); in the middle, other rows move past it."}}}},Q={render:()=>(0,T.jsx)(Ie,{}),parameters:{docs:{description:{story:"The object’s `start(key)` turns on reorder mode for a row from your own UI, here a button and the list’s context menu: the focus moves to the row’s handle, and its arrow keys, hint and Done work as they do from the handle."}}}},$={render:()=>(0,T.jsx)(C,{initial:Array.from({length:30},(e,t)=>`Item ${t+1}`)}),parameters:{docs:{description:{story:`Dragging a row near the top or bottom of the screen scrolls the page, faster the further past the edge the row goes.`}}}},E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  render: args => <List {...args}>
      <ListItem label="Notifications" description="Manage your alerts" />
      <ListItem label="Privacy" description="Control your data" />
      <ListItem label="Security" description="Password and 2FA" />
    </List>
}`,...E.parameters?.docs?.source}}},D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
  render: args => <List hasDividers header={<strong>Settings</strong>} {...args}>
      <ListItem label="Notifications" description="Manage your alerts" startContent={<Icon icon={BellIcon} />} />
      <ListItem label="Privacy" description="Control your data" startContent={<Icon icon={ShieldCheckIcon} />} />
      <ListItem label="General" description="App preferences" startContent={<Icon icon={Cog6ToothIcon} />} />
    </List>
}`,...D.parameters?.docs?.source}}},O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
  render: args => <List density="compact" hasDividers {...args}>
      <ListItem label="Notifications" onClick={() => {}} endContent={<Badge label="3" />} />
      <ListItem label="Messages" onClick={() => {}} endContent={<Badge label="12" />} />
      <ListItem label="Settings" onClick={() => {}} />
    </List>
}`,...O.parameters?.docs?.source}}},j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
  render: () => <CompactTouchTargetsDemo />,
  parameters: {
    docs: {
      description: {
        story: "Under a finger each compact row's touch target reaches past its " + 'box where nothing is near, up to 44 px tall. The striped bands ' + "show that reach, read from the rows' own hit layers. They sit " + 'above the first row, below the last one, and halfway across the ' + 'gap between the two lists. Touching rows have no band between ' + 'them. The ' + 'readout names the row a tap fires, or "none".'
      }
    }
  }
}`,...j.parameters?.docs?.source},description:{story:`Each compact row's touch target under a finger, drawn as a striped band
past the row's box. The bands are read from the rows' own hit layers, and
the readout names the row a tap fires, or "none".`,...j.parameters?.docs?.description}}},M.parameters={...M.parameters,docs:{...M.parameters?.docs,source:{originalSource:`{
  render: args => <List density="spacious" {...args}>
      <ListItem label="Getting Started" description="Learn the basics of our platform" />
      <ListItem label="Advanced Topics" description="Deep dive into advanced features" />
      <ListItem label="API Reference" description="Complete API documentation" />
    </List>
}`,...M.parameters?.docs?.source}}},N.parameters={...N.parameters,docs:{...N.parameters?.docs,source:{originalSource:`{
  args: {
    edge: 'flush',
    hasDividers: true
  },
  render: args => <div>
      <Text type="label" size="lg">
        Order items
      </Text>
      <List {...args}>
        <ListItem label="Solstice Mug" description="Ceramic, 12 oz" />
        <ListItem label="Meridian Notebook" description="Dot grid, A5" />
        <ListItem label="Field Pen" description="0.5 mm, black ink" />
      </List>
    </div>,
  parameters: {
    docs: {
      description: {
        story: 'edge="flush" drops the rows\\' side padding, so row text starts on ' + 'the same line as the heading and the ends of the dividers, with no ' + 'container needed. Switch edge to compare.'
      }
    }
  }
}`,...N.parameters?.docs?.source}}},P.parameters={...P.parameters,docs:{...P.parameters?.docs,source:{originalSource:`{
  render: args => <div {...stylex.props(edgeStoryStyles.grid)}>
      {EDGES.map(edge => <Card key={edge} data-edge={edge}>
          <VStack gap={3}>
            <Heading level={3}>{\`edge="\${edge}"\`}</Heading>
            <List {...args} edge={edge} hasDividers>
              <ListItem label="Ada Lovelace" description="Engineer" />
              <ListItem label="Grace Hopper" description="Admiral" />
            </List>
            <List {...args} edge={edge}>
              <ListItem label="Inbox" onClick={() => {}} startContent={<Icon icon={InboxIcon} />} />
              <ListItem label="Sent" isSelected onClick={() => {}} startContent={<Icon icon={PaperAirplaneIcon} />} />
            </List>
          </VStack>
        </Card>)}
    </div>,
  parameters: {
    docs: {
      description: {
        story: "padded keeps text inside each row's padding. flush puts text, " + "dividers, and backgrounds on the heading's line. outset puts text " + "on the heading's line and reaches backgrounds into the card's " + "padding by the rows' own padding. bleed reaches rows to the card's " + "edges, like Table rows, with text on the card's padding line."
      }
    }
  }
}`,...P.parameters?.docs?.source},description:{story:`The four edge treatments inside a Card, for a static list with dividers
and an interactive list with a selected row.`,...P.parameters?.docs?.description}}},F.parameters={...F.parameters,docs:{...F.parameters?.docs,source:{originalSource:`{
  render: args => <List {...args}>
      <ListItem label="Inbox" isSelected onClick={() => {}} startContent={<Icon icon={InboxIcon} />} endContent={<Icon icon={ChevronRightIcon} />} />
      <ListItem label="Sent" onClick={() => {}} startContent={<Icon icon={PaperAirplaneIcon} />} endContent={<Icon icon={ChevronRightIcon} />} />
      <ListItem label="Drafts" onClick={() => {}} startContent={<Icon icon={DocumentIcon} />} endContent={<Icon icon={ChevronRightIcon} />} />
    </List>
}`,...F.parameters?.docs?.source}}},I.parameters={...I.parameters,docs:{...I.parameters?.docs,source:{originalSource:`{
  render: args => <List {...args}>
      <ListItem label="Documentation" href="/docs" />
      <ListItem label="GitHub" href="https://github.com" target="_blank" description="View source code" />
      <ListItem label="Storybook" href="/storybook" description="Component playground" />
    </List>
}`,...I.parameters?.docs?.source}}},L.parameters={...L.parameters,docs:{...L.parameters?.docs,source:{originalSource:`{
  render: () => <EndControlsDemo />,
  parameters: {
    docs: {
      description: {
        story: 'A compact row whose end content is its own control, a switch, ' + 'between two interactive rows (the first one swipeable), under a ' + 'header with its own button ' + 'and above a button 4 px after the list. Under a finger, the ' + 'interactive rows grow ' + 'their touch targets only where nothing is near, never into the ' + "control's row, and a tap on the switch stays the switch's."
      }
    }
  }
}`,...L.parameters?.docs?.source}}},R.parameters={...R.parameters,docs:{...R.parameters?.docs,source:{originalSource:`{
  render: args => <List listStyle="decimal" {...args}>
      <ListItem label="Install the package" description="npm install @astryxdesign/core" />
      <ListItem label="Import components" description="import { List } from '@astryxdesign/core'" />
      <ListItem label="Start building" description="Use components in your app" />
    </List>
}`,...R.parameters?.docs?.source}}},z.parameters={...z.parameters,docs:{...z.parameters?.docs,source:{originalSource:`{
  args: {
    listStyle: 'decimal',
    start: 98
  },
  render: args => <List {...args}>
      <ListItem label={<>Review the migration before applying it to your project.</>} />
      <ListItem label={<>Check that existing behavior stays unchanged.</>} />
      <ListItem label={<>Verify that the complete number stays beside its label.</>} />
    </List>
}`,...z.parameters?.docs?.source}}},B.parameters={...B.parameters,docs:{...B.parameters?.docs,source:{originalSource:`{
  args: {
    listStyle: 'decimal',
    start: 9
  },
  render: args => <List {...args}>
      <ListItem align="first-line" startContent={<Avatar name="Ada Lovelace" size={40} />} label={<>A numbered row with a tall avatar and a wrapped first line.</>} />
      <ListItem align="first-line" startContent={<Avatar name="Grace Hopper" size={40} />} label={<>The number and avatar follow the same first text line.</>} />
    </List>
}`,...B.parameters?.docs?.source}}},V.parameters={...V.parameters,docs:{...V.parameters?.docs,source:{originalSource:`{
  render: args => <List listStyle="disc" {...args}>
      <ListItem label="Accessible by default" />
      <ListItem label="Themeable with StyleX" />
      <ListItem label="Composable and extensible" />
    </List>
}`,...V.parameters?.docs?.source}}},H.parameters={...H.parameters,docs:{...H.parameters?.docs,source:{originalSource:`{
  render: args => <List {...args}>
      <ListItem label="Available" onClick={() => {}} />
      <ListItem label="Unavailable" onClick={() => {}} isDisabled />
      <ListItem label="Also Available" onClick={() => {}} />
    </List>
}`,...H.parameters?.docs?.source}}},U.parameters={...U.parameters,docs:{...U.parameters?.docs,source:{originalSource:`{
  render: args => <List hasDividers {...args}>
      <ListItem label="Alex Johnson" description="Hey, are we still on for lunch tomorrow?" startContent={<Avatar name="Alex Johnson" size={40} />} onClick={() => {}} endContent={<Badge label="2" />} />
      <ListItem label="Sam Rivera" description="I pushed the latest changes to the repo" startContent={<Avatar name="Sam Rivera" size={40} />} onClick={() => {}} />
      <ListItem label="Jordan Lee" description="Can you review the design spec when you get a chance?" startContent={<Avatar name="Jordan Lee" size={40} />} onClick={() => {}} endContent={<Badge label="5" />} />
    </List>
}`,...U.parameters?.docs?.source}}},W.parameters={...W.parameters,docs:{...W.parameters?.docs,source:{originalSource:`{
  render: () => <ToggleHeaderDemo />,
  parameters: {
    docs: {
      description: {
        story: 'A list with a toggle in the header. The header and list are ' + 'wrapped so they stack correctly even inside flex parents.'
      }
    }
  }
}`,...W.parameters?.docs?.source}}},G.parameters={...G.parameters,docs:{...G.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    gap: 24,
    border: '1px dashed #888',
    padding: 16
  }}>
      <div style={{
      flex: 1
    }}>
        <Text type="label" size="lg">
          Sidebar
        </Text>
      </div>
      <div style={{
      flex: 2
    }}>
        <ToggleHeaderDemo />
      </div>
    </div>,
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates the list with a header inside a flex parent. ' + 'The header should appear above the list, not beside it.'
      }
    }
  }
}`,...G.parameters?.docs?.source}}},K.parameters={...K.parameters,docs:{...K.parameters?.docs,source:{originalSource:`{
  render: () => <AnimatedChangesDemo />,
  parameters: {
    docs: {
      description: {
        story: 'With \`animatedLayout\` (the handle from \`useAnimatedLayout\`) and ' + 'an \`itemKey\` on each row, an inserted row enters, a removed row ' + 'collapses in place, a row crossing rows that move the other way ' + 'rides above them with the surface color behind it, and the rows ' + 'after a change and the buttons below the list glide to their new ' + 'places, all on one shared motion, under every pointer.'
      }
    }
  }
}`,...K.parameters?.docs?.source}}},J.parameters={...J.parameters,docs:{...J.parameters?.docs,source:{originalSource:`{
  render: () => <AnimatedChangesSwipeDemo />,
  parameters: {
    docs: {
      description: {
        story: 'With \`animatedLayout\`, a row swiped away with a removal action ' + 'collapses in place, its action showing, while the rows below ' + 'glide up into its gap on the shared motion. A row moved up ' + 'across the swipeable rows, with swipe actions (Archive) or ' + 'without (Notes), rides above the rows it crosses.'
      }
    }
  }
}`,...J.parameters?.docs?.source}}},Y.parameters={...Y.parameters,docs:{...Y.parameters?.docs,source:{originalSource:`{
  render: () => <ReorderDemo initial={['Inbox', 'Sent', 'Drafts', 'Archive', 'Spam', 'Trash']} />,
  parameters: {
    docs: {
      description: {
        story: 'With \`reorderable\` (from \`createReorderable\`), each row with an ' + '\`itemKey\` gets a reorder handle. On a touch screen, hold a handle ' + 'for a moment, then drag: the row dims in place, a copy follows ' + 'your finger and a line marks where it will land, and the rows ' + 'rearrange on release. A mouse drags a handle at once, the same ' + 'way. Or activate a handle (click it, or press Space ' + 'or Enter) to turn on reorder mode for its row: each arrow key, or ' + 'each move in the hint below the handle, moves it a place, and ' + 'Escape or Done ends the mode.'
      }
    }
  }
}`,...Y.parameters?.docs?.source}}},X.parameters={...X.parameters,docs:{...X.parameters?.docs,source:{originalSource:`{
  render: () => <ReorderDemo initial={['Inbox', 'Sent', 'Drafts', 'Archive']} edge="flush" />,
  parameters: {
    docs: {
      description: {
        story: 'With \`edge="flush"\` the rows have no side padding, so each ' + "reorder handle ends at the row's edge, inside the list."
      }
    }
  }
}`,...X.parameters?.docs?.source}}},Z.parameters={...Z.parameters,docs:{...Z.parameters?.docs,source:{originalSource:`{
  render: () => <ReorderDemo initial={['Favorites', 'Inbox', 'Sent', 'All mail', 'Drafts', 'Spam']} pinned={['Favorites', 'All mail']} />,
  parameters: {
    docs: {
      description: {
        story: 'A row the object’s \`isReorderable\` rejects has no handle. At an ' + 'end of the list it also bounds the others (nothing drops above ' + 'Favorites); in the middle, other rows move past it.'
      }
    }
  }
}`,...Z.parameters?.docs?.source}}},Q.parameters={...Q.parameters,docs:{...Q.parameters?.docs,source:{originalSource:`{
  render: () => <ReorderFromYourUIDemo />,
  parameters: {
    docs: {
      description: {
        story: 'The object’s \`start(key)\` turns on reorder mode for a row from ' + 'your own UI, here a button and the list’s context menu: the ' + 'focus moves to the row’s handle, and its arrow keys, hint and ' + 'Done work as they do from the handle.'
      }
    }
  }
}`,...Q.parameters?.docs?.source}}},$.parameters={...$.parameters,docs:{...$.parameters?.docs,source:{originalSource:`{
  render: () => <ReorderDemo initial={Array.from({
    length: 30
  }, (_, index) => \`Item \${index + 1}\`)} />,
  parameters: {
    docs: {
      description: {
        story: 'Dragging a row near the top or bottom of the screen scrolls the ' + 'page, faster the further past the edge the row goes.'
      }
    }
  }
}`,...$.parameters?.docs?.source}}},ze=[`Basic`,`WithDividers`,`Compact`,`CompactTouchTargets`,`Spacious`,`Flush`,`EdgeInCard`,`Interactive`,`Links`,`WithEndControls`,`OrderedList`,`LongNumberMarkers`,`NumberedFirstLine`,`BulletedList`,`DisabledItems`,`WithMedia`,`HeaderWithToggle`,`HeaderInFlexParent`,`AnimatedChanges`,`AnimatedChangesSwipe`,`Reorderable`,`ReorderFlush`,`ReorderWithPinnedRows`,`ReorderFromYourUI`,`ReorderLongList`]})))()}Be();export{K as AnimatedChanges,J as AnimatedChangesSwipe,E as Basic,V as BulletedList,O as Compact,j as CompactTouchTargets,H as DisabledItems,P as EdgeInCard,N as Flush,G as HeaderInFlexParent,W as HeaderWithToggle,F as Interactive,I as Links,z as LongNumberMarkers,B as NumberedFirstLine,R as OrderedList,X as ReorderFlush,Q as ReorderFromYourUI,$ as ReorderLongList,Z as ReorderWithPinnedRows,Y as Reorderable,M as Spacious,D as WithDividers,L as WithEndControls,U as WithMedia,ze as __namedExportsOrder,Le as default};