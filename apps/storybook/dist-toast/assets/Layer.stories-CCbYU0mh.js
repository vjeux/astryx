import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{t}from"./react-DlPsW1c0.js";import{n,t as r}from"./stylex-BSlGVhGe.js";import{t as i}from"./jsx-runtime-MKhVqBIO.js";import{f as a,r as o,t as s}from"./useLayer-CSf2GluV.js";import{n as c,t as l}from"./Text-C5BHw0wv.js";import{n as u,t as d}from"./Button-DoGM0DEN.js";import{n as f,t as ee}from"./DropdownMenu-M0We7Ho-.js";import{m as te,p as ne}from"./iframe-B7UFaprG.js";function re(){let e=o({mode:`context`,lightDismiss:!0});return(0,x.jsxs)(`div`,{className:`x78zum5 xl56j7k x6s0dn4 xz65tgg`,children:[(0,x.jsx)(d,{ref:e.ref,label:`Show layer`,onClick:()=>e.isOpen?e.hide():e.show()}),e.render((0,x.jsx)(`div`,{className:`x10xzikg xur7f20 x1tamke2 x16ome7r xbr2vle`,children:(0,x.jsx)(l,{type:`body`,children:`This layer is anchored to the button using CSS Anchor Positioning.`})}),{placement:`below`,alignment:`center`})]})}function ie(){let[e,t]=(0,b.useState)(`end`),n=o({mode:`context`,lightDismiss:!0}),r=o({mode:`context`,lightDismiss:!0});return(0,x.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:16},children:[(0,x.jsx)(`div`,{style:{display:`flex`,gap:8},children:[`above`,`below`,`start`,`end`].map(n=>(0,x.jsx)(d,{label:n,variant:e===n?`primary`:`secondary`,onClick:()=>t(n)},n))}),(0,x.jsxs)(`div`,{className:`x78zum5 xl56j7k x6s0dn4 xz65tgg`,style:{gap:120},children:[(0,x.jsxs)(`div`,{children:[(0,x.jsx)(d,{ref:n.ref,label:`offset: 0`,onClick:()=>n.isOpen?n.hide():n.show()}),n.render((0,x.jsx)(`div`,{className:`x10xzikg xur7f20 x1tamke2 x16ome7r xbr2vle`,children:(0,x.jsx)(l,{type:`body`,children:`Flush against the anchor`})}),{placement:e,alignment:`center`})]}),(0,x.jsxs)(`div`,{children:[(0,x.jsx)(d,{ref:r.ref,label:`offset: 12`,onClick:()=>r.isOpen?r.hide():r.show()}),r.render((0,x.jsx)(`div`,{className:`x10xzikg xur7f20 x1tamke2 x16ome7r xbr2vle`,children:(0,x.jsx)(l,{type:`body`,children:`12px of clearance, on either side`})}),{placement:e,alignment:`center`,offset:12})]})]})]})}function ae(){let[e,t]=(0,b.useState)(`above`),n=o({mode:`context`,lightDismiss:!0});return(0,x.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:16,alignItems:`center`},children:[(0,x.jsx)(`div`,{style:{display:`flex`,gap:8},children:[`above`,`below`,`start`,`end`].map(n=>(0,x.jsx)(d,{label:n,variant:e===n?`primary`:`secondary`,onClick:()=>t(n)},n))}),(0,x.jsxs)(`div`,{className:`x78zum5 xl56j7k x6s0dn4 xz65tgg`,children:[(0,x.jsx)(d,{ref:n.ref,label:`Trigger`,onClick:()=>n.isOpen?n.hide():n.show()}),n.render((0,x.jsx)(`div`,{className:`x10xzikg xur7f20 x1tamke2 x16ome7r xbr2vle`,children:(0,x.jsxs)(l,{type:`body`,children:[`Placement: `,e]})}),{placement:e,alignment:`center`})]})]})}function oe(){let[e,t]=(0,b.useState)({x:0,y:0}),n=o({mode:`fixed`,lightDismiss:!0});return(0,x.jsxs)(`div`,{style:{position:`relative`,minHeight:300,border:`1px dashed var(--color-border-default)`,borderRadius:8,cursor:`crosshair`},onClick:e=>{let r=e.currentTarget.getBoundingClientRect();t({x:e.clientX-r.left+r.left,y:e.clientY-r.top+r.top}),n.show()},children:[(0,x.jsx)(l,{type:`supporting`,style:{padding:16},children:`Click anywhere in this area to show a fixed-position layer`}),n.render((0,x.jsx)(`div`,{className:`x10xzikg xur7f20 x1tamke2 x16ome7r xbr2vle`,children:(0,x.jsxs)(l,{type:`body`,children:[`Fixed at (`,Math.round(e.x),`, `,Math.round(e.y),`)`]})}),{x:e.x,y:e.y})]})}function se(){return(0,x.jsx)(ne,{toast:{position:`topEnd`,maxVisible:3},children:(0,x.jsx)(`div`,{style:{padding:16},children:(0,x.jsx)(l,{type:`body`,children:`LayerProvider wraps your app to configure layer systems (toast positioning, max visible toasts). It is optional; hooks fall back to defaults when no provider exists.`})})})}function ce(){let e=document.activeElement;if(!e||e===document.body)return`nothing`;let t=e.textContent?.trim().slice(0,20),n=e.tagName.toLowerCase();return t?`${n} "${t}"`:n}function le(){let e=o({mode:`context`,lightDismiss:!0,lazyMount:!0}),t=(0,b.useRef)(null),n=(0,b.useRef)(null),[r,i]=(0,b.useState)(null),[a,s]=(0,b.useState)([]),c=(r,a=!0)=>{let o=Math.round(t.current?.scrollTop??0);requestAnimationFrame(()=>{let c=Math.round(t.current?.scrollTop??0),l=a?o===c?`scrollTop ${c} (no jump)`:`scrollTop ${o} → ${c}`:`scrollTop ${c}`,u=document.getElementById(e.id);i(u?{parentTag:u.parentElement?.tagName.toLowerCase()??`—`,insideParagraph:n.current?.contains(u)??!1,fontSize:window.getComputedStyle(u).fontSize}:null),s(e=>[`${r} — focus: ${ce()} — ${l}`,...e].slice(0,6))})};return(0,x.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:12,maxWidth:520},children:[(0,x.jsx)(d,{label:`Before the article`}),(0,x.jsxs)(`div`,{ref:t,onScroll:()=>c(`scrolled`,!1),onFocusCapture:()=>c(`focus moved`),style:{height:200,overflow:`auto`,padding:16,border:`1px solid var(--color-border-default)`,borderRadius:8},children:[(0,x.jsx)(`p`,{style:{fontSize:13,textAlign:`center`},children:D}),(0,x.jsx)(`p`,{style:{fontSize:13,textAlign:`center`},children:D}),(0,x.jsx)(`p`,{style:{fontSize:13,textAlign:`center`},children:D}),(0,x.jsxs)(`p`,{ref:n,style:{fontSize:13,textAlign:`center`},children:[`Reviewed by`,` `,(0,x.jsx)(`button`,{ref:e.ref,type:`button`,onClick:()=>{e.isOpen?e.hide():e.show(),c(`toggled the card`)},style:{font:`inherit`,color:`var(--color-content-link)`,background:`none`,border:`none`,padding:0,cursor:`pointer`,textDecoration:`underline`},children:`Jane Doe`}),` `,`earlier today, from inside a 13px centered paragraph.`,e.render((0,x.jsxs)(`div`,{className:`x10xzikg xur7f20 x1tamke2 x16ome7r xbr2vle`,style:{width:240},children:[(0,x.jsx)(l,{type:`body`,children:`Jane Doe`}),(0,x.jsxs)(`div`,{style:{display:`flex`,gap:8,marginTop:8},children:[(0,x.jsx)(d,{label:`Follow`,variant:`primary`}),(0,x.jsx)(d,{label:`Message`})]})]}),{placement:`below`,alignment:`start`,offset:8,role:`dialog`,"aria-label":`Jane Doe`})]}),(0,x.jsx)(`p`,{style:{fontSize:13,textAlign:`center`},children:D}),(0,x.jsx)(`p`,{style:{fontSize:13,textAlign:`center`},children:D}),(0,x.jsx)(`p`,{style:{fontSize:13,textAlign:`center`},children:D})]}),(0,x.jsx)(d,{label:`After the article`}),(0,x.jsx)(l,{type:`supporting`,children:`Tab in from the button above: the browser scrolls the trigger into view. Open the card, then Tab from the trigger into it and out the far side. Every move is logged with the container's scroll offset before and after the browser's scroll-into-view.`}),(0,x.jsxs)(`dl`,{style:{display:`grid`,gridTemplateColumns:`max-content max-content`,gap:`2px 12px`,fontSize:13,margin:0},children:[(0,x.jsx)(`dt`,{children:`Layer's parent`}),(0,x.jsx)(`dd`,{style:{margin:0},children:(0,x.jsx)(`code`,{children:r?.parentTag??`not rendered yet`})}),(0,x.jsx)(`dt`,{children:`Inside the paragraph`}),(0,x.jsx)(`dd`,{style:{margin:0},children:(0,x.jsx)(`code`,{children:r?String(r.insideParagraph):`—`})}),(0,x.jsx)(`dt`,{children:`Card font size`}),(0,x.jsx)(`dd`,{style:{margin:0},children:(0,x.jsx)(`code`,{children:r?.fontSize??`—`})})]}),(0,x.jsx)(`ol`,{style:{fontSize:13,lineHeight:1.6,paddingInlineStart:20},children:a.map((e,t)=>(0,x.jsx)(`li`,{children:e},`${e}-${t}`))})]})}function p({at:e,placement:t=`below`,alignment:r=`start`,width:i,children:a,caption:s,canvasXstyle:c,extra:l,isOpenInitially:u=!1}){let f=o({mode:`context`,lightDismiss:!0}),ee=(0,b.useRef)(!1);return(0,b.useLayoutEffect)(()=>{u&&!ee.current&&(ee.current=!0,f.show())},[u,f]),(0,x.jsxs)(`div`,{...n(j.canvas,c),"data-testid":`canvas`,children:[(0,x.jsx)(`p`,{className:`x10l6tqk xomnu4r xzwoauc x4d2062 x4z9k3i x1evy7pa xv1l7n4 x1ghz6dp`,children:s}),(0,x.jsx)(`div`,{style:{position:`absolute`,...e},children:(0,x.jsx)(d,{ref:f.ref,label:`Open`,size:`sm`,"data-testid":`trigger`,onClick:()=>f.isOpen?f.hide():f.show()})}),f.render((0,x.jsx)(`div`,{className:`x9f619 x10xzikg xxunppi xur7f20 xc7ga6q xif65rj x37zpob x1h9zykg x1awea2j xysyzu8`,children:a}),{placement:t,alignment:r,offset:4,xstyle:i==null?null:j.explicitWidth(i)}),l]})}function m(e){let t=e.querySelector(`[data-testid="trigger"]`),n=document.querySelector(`[popover]:popover-open[id]`);if(!t||!n)throw Error(`No open layer`);return{trigger:t.getBoundingClientRect(),layer:n.getBoundingClientRect(),vw:window.innerWidth,vh:window.innerHeight}}function ue(e,t){return Math.abs(e.left-t.left)<=A&&Math.abs(e.top-t.top)<=A&&Math.abs(e.width-t.width)<=A&&Math.abs(e.height-t.height)<=A}function de(e){let t=a(e);for(let e of document.querySelectorAll(`[popover]:popover-open[id]`))if(t.includes(e.style.getPropertyValue(`position-anchor`)))return e;return null}async function fe(e){await Ee(),de(e)??g(`the layer did not open by the end of the click's task`)}async function h(e){let t=e.querySelector(`[data-testid="trigger"]`);if(!t)throw Error(`No trigger`);t.click(),await fe(t);let n=m(e);await M();let r=m(e);return pe(n,r,`after opening`),r}function pe(e,t,n){ue(e.layer,t.layer)||g(`Paint-then-shift ${n}: first frame ${N(e.layer)}, settled ${N(t.layer)}`)}function me(){let e=document.querySelector(`[popover]:popover-open[id]`);if(!e)return`no open layer`;let t=getComputedStyle(e),n=e=>t.getPropertyValue(e).trim();return[`position-area=${n(`position-area`)}`,`fallbacks=${n(`position-try-fallbacks`)}`,`justify-self=${n(`justify-self`)} align-self=${n(`align-self`)}`,`inset t/r/b/l=${n(`top`)}/${n(`right`)}/${n(`bottom`)}/${n(`left`)}`,`margin t/r/b/l=${n(`margin-top`)}/${n(`margin-right`)}/${n(`margin-bottom`)}/${n(`margin-left`)}`,`max w/h=${n(`max-width`)}/${n(`max-height`)}`,`inline style=${e.getAttribute(`style`)??``}`].join(`
  `)}function g(e){throw Error(`${e}\n  ${me()}`)}function _(e,t,n=k){let{layer:r,vw:i,vh:a}=e;(r.left<n-A||r.right>i-n+A||r.top<n-A||r.bottom>a-n+A)&&g(`${t}: layer ${N(r)} leaves the ${n}px gutter in a ${i}×${a} viewport`)}function v(e,t,n){let r=Math.min(t,De(e));if(Math.abs(e.layer.width-r)>A)throw Error(`${n}: asked ${t}px, cap ${De(e)}px, rendered ${Math.round(e.layer.width)}px`)}function he(e,t){e.layer.bottom>e.trigger.top+A&&g(`${t}: expected the layer above its trigger (trigger top ${Math.round(e.trigger.top)}), layer ${N(e.layer)}`)}function ge({initialInset:e,isOpenInitially:t}){let[r,i]=(0,b.useState)(e);return(0,x.jsx)(ne,{inset:{blockEnd:r},children:(0,x.jsx)(p,{at:{bottom:270,left:40},isOpenInitially:t,caption:`FR6, FR8 — The app floats a ${r}px bar over the bottom edge and declares it once: <LayerProvider inset={{blockEnd: ${r}}}>. The layer's bottom gutter becomes ${r+16}px, so a layer that would end under the bar flips above its trigger instead. (Storybook already mounts the root provider, so this one is nested and narrows the inset for the layers in this story; an app declares it on its root provider and its toasts rise too.) Change the inset while the layer is open: the layer and the bar move in the same frame.`,extra:(0,x.jsxs)(x.Fragment,{children:[(0,x.jsxs)(`div`,{...n(j.bottomBar,j.barHeight(r)),children:[`persistent bar — `,r,`px, outside layout flow`]}),(0,x.jsxs)(`div`,{className:`xixxii4 xfr5jun x11dcrhx x78zum5 x167g77z x1vjfegm`,children:[(0,x.jsx)(d,{label:`Bar 80`,size:`sm`,variant:`secondary`,"data-testid":`inset-80`,onClick:()=>i(80)}),(0,x.jsx)(d,{label:`Bar 160`,size:`sm`,variant:`secondary`,"data-testid":`inset-160`,onClick:()=>i(160)})]})]}),children:(0,x.jsx)(`div`,{style:{blockSize:90},children:`90px of rows`})})})}function y(e,t,n){e.layer.bottom>e.vh-t-k+A&&g(`${n}: layer ends at ${e.layer.bottom}px (trigger ${N(e.trigger)}), under the ${t}px bar (viewport ${e.vh}px)`)}function _e(){let e=(0,b.useRef)(null),[t,r]=(0,b.useState)(!1),[i,a]=(0,b.useState)(0);return(0,b.useLayoutEffect)(()=>{let t=e.current;t&&a(t.getBoundingClientRect().height)},[t]),(0,x.jsx)(ne,{inset:{blockEnd:i},children:(0,x.jsx)(p,{at:{bottom:270,left:40},caption:`FR6, FR8 — The bar's height is measured by the app (${i}px) and declared on LayerProvider. The runtime measures nothing: it renders at whatever the provider declares, in the same frame the declaration changes.`,extra:(0,x.jsxs)(x.Fragment,{children:[(0,x.jsxs)(`div`,{ref:e,...n(j.bottomBar,j.barHeight(t?160:80)),children:[`measured bar — `,i,`px`]}),(0,x.jsx)(`div`,{className:`xixxii4 xfr5jun x11dcrhx x78zum5 x167g77z x1vjfegm`,children:(0,x.jsx)(d,{label:t?`Shrink bar`:`Grow bar`,size:`sm`,variant:`secondary`,"data-testid":`toggle-bar`,onClick:()=>r(e=>!e)})})]}),children:(0,x.jsx)(`div`,{style:{blockSize:90},children:`90px of rows`})})})}function ve(){let e=o({mode:`context`,lightDismiss:!0});return(0,x.jsxs)(`div`,{className:`x1n2onr6 x9f619 xh8yej3 x1ov3xa9 x7giv3`,"data-testid":`canvas`,children:[(0,x.jsx)(`p`,{className:`x10l6tqk xomnu4r xzwoauc x4d2062 x4z9k3i x1evy7pa xv1l7n4 x1ghz6dp`,children:`FR6, FR8 — The trigger sits inside a paragraph, which cannot contain the layer, so the layer portals out of it. The declared 160px inset still reaches it: the value travels by context and is written on the layer itself, not inherited from the provider's subtree.`}),(0,x.jsxs)(`p`,{style:{position:`absolute`,bottom:270,left:40,margin:0},children:[(0,x.jsx)(d,{ref:e.ref,label:`Open`,size:`sm`,"data-testid":`trigger`,onClick:()=>e.isOpen?e.hide():e.show()}),e.render((0,x.jsx)(`div`,{className:`x9f619 x10xzikg xxunppi xur7f20 xc7ga6q xif65rj x37zpob x1h9zykg x1awea2j xysyzu8`,children:(0,x.jsx)(`div`,{style:{blockSize:90},children:`90px of rows`})}),{placement:`below`,alignment:`start`,offset:4})]}),(0,x.jsx)(`div`,{...n(j.bottomBar,j.barHeight(160)),children:`persistent bar — 160px`})]})}function ye(e,t){let n=e.getBoundingClientRect(),r=t.getBoundingClientRect(),i=window.innerWidth,a=window.innerHeight,o=r.bottom<=n.top+1?`above`:r.top>=n.bottom-1?`below`:r.right<=n.left+1?`start`:r.left>=n.right-1?`end`:`overlapping`,s=o===`above`||o===`below`?Math.abs(r.left-n.left)<=1?`start`:Math.abs(r.right-n.right)<=1?`end`:Math.abs(r.left+r.width/2-(n.left+n.width/2))<=1?`center`:`slid`:Math.abs(r.top-n.top)<=1?`start`:Math.abs(r.bottom-n.bottom)<=1?`end`:Math.abs(r.top+r.height/2-(n.top+n.height/2))<=1?`center`:`slid`,c=r.left>=15&&r.right<=i-k+1&&r.top>=15&&r.bottom<=a-k+1;return{box:`layer ${Math.round(r.width)}×${Math.round(r.height)} at ${Math.round(r.left)},${Math.round(r.top)} · viewport ${i}×${a} · cap ${i-32}`,within:c?`inside the 16px gutters`:`OUTSIDE the gutters: left ${Math.round(r.left)} right ${Math.round(i-r.right)} top ${Math.round(r.top)} bottom ${Math.round(a-r.bottom)}`,resolved:`resolved ${o} / ${s} · anchor ${Math.round(n.left)},${Math.round(n.top)}`}}function be(){let[e,t]=(0,b.useState)({x:160,y:200}),[n,r]=(0,b.useState)(240),[i,a]=(0,b.useState)(`below`),[s,c]=(0,b.useState)(`start`),[l,u]=(0,b.useState)(null),d=o({mode:`context`,lightDismiss:!1}),f=(0,b.useRef)(null),ee=(0,b.useRef)(null),te=(0,b.useRef)(null),ne=(0,b.useRef)(!1);return(0,b.useLayoutEffect)(()=>{ne.current||(ne.current=!0,d.show())},[d]),(0,b.useLayoutEffect)(()=>{let e=f.current,t=ee.current??document.querySelector(`[popover]:popover-open[id]`);if(e&&t){ee.current=t;let n=ye(e,t);u(e=>e&&e.box===n.box&&e.within===n.within&&e.resolved===n.resolved?e:n)}}),(0,x.jsxs)(`div`,{className:`xixxii4 x10a8y8t x7giv3 x5ve5x3`,children:[(0,x.jsxs)(`div`,{className:`xixxii4 xfr5jun xrotz4w x11dcrhx x78zum5 x1a02dak x17d4w8g x6s0dn4 xfifm61 x37zpob xe8ttls xur7f20 x10xzikg x1i5ehqx x1vjfegm`,children:[(0,x.jsxs)(`label`,{children:[`width`,` `,(0,x.jsx)(`input`,{type:`range`,min:80,max:1400,step:10,value:n,onChange:e=>r(Number(e.target.value))}),` `,n,`px`]}),(0,x.jsx)(`select`,{className:`xfifm61 xfawy5m`,value:i,"aria-label":`placement`,onChange:e=>a(e.target.value),children:[`above`,`below`,`start`,`end`].map(e=>(0,x.jsxs)(`option`,{value:e,children:[`placement: `,e]},e))}),(0,x.jsx)(`select`,{className:`xfifm61 xfawy5m`,value:s,"aria-label":`alignment`,onChange:e=>c(e.target.value),children:[`start`,`center`,`end`].map(e=>(0,x.jsxs)(`option`,{value:e,children:[`alignment: `,e]},e))}),(0,x.jsx)(`span`,{children:`Drag the trigger anywhere; the layer stays open.`})]}),(0,x.jsx)(`button`,{type:`button`,ref:e=>{f.current=e,d.ref(e)},className:`x10l6tqk x5ve5x3 x87ps6o x1jm3nie`,style:{left:e.x,top:e.y},onPointerDown:t=>{te.current={dx:t.clientX-e.x,dy:t.clientY-e.y},t.currentTarget.setPointerCapture(t.pointerId)},onPointerMove:e=>{let n=te.current;n&&t({x:e.clientX-n.dx,y:e.clientY-n.dy})},onPointerUp:()=>{te.current=null},onPointerCancel:()=>{te.current=null},children:`drag me`}),d.render((0,x.jsx)(`div`,{className:`x9f619 x10xzikg xxunppi xur7f20 xc7ga6q xif65rj x37zpob x1h9zykg x1awea2j xysyzu8`,children:(0,x.jsxs)(`div`,{style:{blockSize:120},children:[i,`/`,s,`, `,n,`px`]})}),{placement:i,alignment:s,offset:4,xstyle:j.explicitWidth(n)}),(0,x.jsx)(`div`,{className:`xixxii4 xqo3gd xrotz4w x11dcrhx x1n2ylgu x1j6dyjg x1evy7pa xe8ttls xur7f20 x10xzikg x1i5ehqx x126k92a x1vjfegm`,children:l?`${l.box}\n${l.resolved}\n${l.within}`:`…`})]})}function xe(){let e=o({mode:`context`,lightDismiss:!0}),t=o({mode:`context`}),n=o({mode:`context`,lightDismiss:!0}),r=(0,b.useRef)(null);return(0,x.jsxs)(`div`,{className:`x78zum5 xl56j7k x6s0dn4 xz65tgg`,children:[(0,x.jsx)(d,{ref:n=>{e.ref(n),t.ref(n)},label:`Show layer`,onFocus:t.show,onBlur:t.hide,onClick:()=>e.isOpen?e.hide():e.show()}),e.render((0,x.jsxs)(`div`,{className:`x10xzikg xur7f20 x1tamke2 x16ome7r xbr2vle`,children:[(0,x.jsx)(l,{type:`body`,children:`A light-dismissible layer.`}),(0,x.jsx)(d,{label:`Inside`,onClick:e.hide})]}),{placement:`below`,alignment:`center`}),t.render((0,x.jsx)(`div`,{className:`x10xzikg xur7f20 x1tamke2 x16ome7r xbr2vle`,role:`tooltip`,children:(0,x.jsx)(l,{type:`body`,children:`Shown while the trigger has focus.`})}),{placement:`above`,alignment:`center`}),(0,x.jsx)(d,{ref:n.ref,label:`Show the other layer`,onClick:()=>{n.show(),r.current?.focus()}}),n.render((0,x.jsxs)(`div`,{className:`x10xzikg xur7f20 x1tamke2 x16ome7r xbr2vle`,children:[(0,x.jsx)(l,{type:`body`,children:`The other layer.`}),(0,x.jsx)(d,{ref:r,label:`Inside the other`})]}),{placement:`below`,alignment:`center`})]})}function Se(){let e=o({mode:`context`,lightDismiss:!0}),[t,n]=(0,b.useState)(!1);return(0,x.jsxs)(`div`,{className:`x78zum5 x1665zp3 x6s0dn4 xz65tgg x4l9tsp`,children:[(0,x.jsx)(`div`,{ref:e.ref,"data-testid":`layer-zone`,onContextMenu:t=>{t.preventDefault(),e.show()},className:`x78zum5 x6s0dn4 xl56j7k x1oysuqx xjp8j0k x9tssas xur7f20`,children:(0,x.jsx)(l,{type:`body`,children:`Right-click for a layer`})}),e.render((0,x.jsx)(`div`,{className:`x10xzikg xur7f20 x1tamke2 x16ome7r xbr2vle`,"data-testid":`layer`,children:(0,x.jsx)(l,{type:`body`,children:`Opened by a right click.`})}),{placement:`below`,alignment:`center`}),(0,x.jsx)(`div`,{"data-testid":`menu-zone`,onContextMenu:e=>{e.preventDefault(),n(!0)},className:`x78zum5 x6s0dn4 xl56j7k x1oysuqx xjp8j0k x9tssas xur7f20`,children:(0,x.jsx)(l,{type:`body`,children:`Right-click for the menu`})}),(0,x.jsx)(ee,{button:{label:`Actions`},isMenuOpen:t,onOpenChange:n,items:[{label:`Rename`},{label:`Duplicate`}]})]})}var b,x,Ce,S,C,w,T,E,D,O,k,A,we,j,Te,Ee,M,De,N,P,F,I,L,R,z,B,V,H,Oe,U,W,G,K,q,J,Y,X,Z,Q,ke,Ae,$,je;function Me(){return(Me=e((()=>{b=t(),r(),s(),te(),u(),f(),c(),x=i(),Ce={title:`Core/Layer`,tags:[`autodocs`],parameters:{docs:{description:{component:`Layer is the core positioning hook for overlay content using CSS Anchor Positioning and the Popover API. Used as the foundation for Popover, HoverCard, and Tooltip.`}}}},S={render:()=>(0,x.jsx)(re,{})},C={render:()=>(0,x.jsx)(ie,{})},w={render:()=>(0,x.jsx)(ae,{})},T={render:()=>(0,x.jsx)(oe,{})},E={render:()=>(0,x.jsx)(se,{})},D=`Sequential focus follows DOM order, so where a layer is hosted decides what the browser does when focus moves into it. This paragraph is filler, so the container has something to scroll.`,O={render:()=>(0,x.jsx)(le,{}),parameters:{docs:{description:{story:`A closed context layer leaves only an inert marker at its JSX position. When opened from this unsafe paragraph, the final layer is lazily portaled to the nearest ancestor that can contain it; a layer at a safe position would stay inline. The readout shows where the layer landed and what typography it inherits; the log shows what the browser scrolls as focus moves into and out of it.`}}}},k=16,A=1.5,we={kZKoxP:`xyq6l7l`,$$css:!0},j={canvas:{kVAEAm:`x1n2onr6`,kB7OPa:`x9f619`,kzqmXN:`xh8yej3`,kAzted:`x1ov3xa9`,kVQacm:`x7giv3`,$$css:!0},wideCanvas:{kzqmXN:`x1icw1vr`,kAzted:`x1ov3xa9`,kVAEAm:`x1n2onr6`,$$css:!0},explicitWidth:e=>[{kzqmXN:e==null?e:`x5lhr3w`,$$css:!0},{"--x-width":(e=>typeof e==`number`?e+`px`:e??void 0)(e)}],bottomBar:{kVAEAm:`xixxii4`,krVfgx:`x1ey2m1c`,kLqNvP:`x1o0tod`,kt4wiu:`xtijo5x`,kWkggS:`x19qv1nm`,kMwMTN:`x16ybk3n`,k1xSpc:`x78zum5`,kGNEyG:`x6s0dn4`,kjj79g:`xl56j7k`,kGuDYH:`x4z9k3i`,$$css:!0},barHeight:e=>[we,{"--x-blockSize":(e=>typeof e==`number`?e+`px`:e??void 0)(e)}]},Te=()=>new Promise(e=>requestAnimationFrame(()=>e(null))),Ee=()=>new Promise(e=>queueMicrotask(()=>e(null))),M=async()=>{await Te(),await Te()},De=e=>e.vw-32,N=e=>`${Math.round(e.left)}..${Math.round(e.right)} × ${Math.round(e.top)}..${Math.round(e.bottom)} (${Math.round(e.width)}w)`,P={layout:`fullscreen`,docs:{story:{inline:!1,height:`600px`}}},F={name:`Viewport inset: content-sized, fits beside the trigger`,parameters:P,render:()=>(0,x.jsx)(p,{at:{top:120,left:40},caption:`FR2, FR4 — A content-sized layer with room beside its trigger sizes to its content and stays start-aligned to the trigger. Nothing caps it to the span; nothing moves it.`,children:(0,x.jsx)(`span`,{className:`xuxw1ft`,children:`Four short rows`})}),play:async({canvasElement:e})=>{let t=await h(e);if(Math.abs(t.layer.left-t.trigger.left)>A)throw Error(`Expected the layer to stay start-aligned to the trigger (${t.trigger.left}), got ${t.layer.left}`);if(t.layer.width<120)throw Error(`Layer shrank to ${t.layer.width}px`);_(t,`fits beside`)}},I={name:`Viewport inset: content-sized, does not fit beside the trigger`,parameters:P,render:()=>(0,x.jsx)(p,{at:{top:120,right:60},caption:`FR2, FR4 — The trigger sits 60px from the inline-end edge and the layer's content cannot wrap. Where the content fits the viewport (desktop), the layer keeps its size and flips to end alignment instead of being squeezed into the room beside the trigger. Where it does not fit the viewport at all (a phone), the layer is capped to the viewport minus its gutters and the content scrolls inside it.`,children:(0,x.jsx)(`span`,{className:`xuxw1ft`,children:`Unbreakable-label-that-cannot-wrap-to-fit-beside-the-trigger`})}),play:async({canvasElement:e})=>{let t=await h(e),n=De(t);if(t.layer.width<Math.min(300,n)-A)throw Error(`Layer was squeezed to ${t.layer.width}px`);if(t.layer.width>n+A)throw Error(`Layer ${t.layer.width}px exceeds the cap ${n}px`);if(t.layer.width<n-A&&Math.abs(t.layer.right-t.trigger.right)>A)throw Error(`Expected a flip to end alignment (right ${t.trigger.right}), got right ${t.layer.right}`);_(t,`does not fit beside`)}},L={name:`Viewport inset: explicit size near an edge (352px)`,parameters:P,render:()=>(0,x.jsx)(p,{at:{top:120,left:45},alignment:`end`,width:352,caption:`FR2 — An end-aligned layer given width 352 on a trigger 45px from the inline-start edge. The room beside the trigger is 45px plus the trigger; the layer renders at 352px anyway, flipped to start alignment, never shrunk to 274px.`,children:`A 352px panel`}),play:async({canvasElement:e})=>{let t=await h(e);v(t,352,`explicit size`),_(t,`explicit size`)}},R={name:`Viewport inset: trigger near an edge flips`,parameters:P,render:()=>(0,x.jsx)(p,{at:{top:120,right:80},width:320,caption:`FR4 — A start-aligned 320px layer on a trigger 80px from the inline-end edge flips to end alignment: its inline-end edge meets the trigger's, and it keeps the 16px gutter from the viewport edge.`,children:`Flipped to the other side`}),play:async({canvasElement:e})=>{let t=await h(e);if(v(t,320,`flip`),t.trigger.right-k>=320&&Math.abs(t.layer.right-t.trigger.right)>A)throw Error(`Expected the flipped layer's end edge at ${t.trigger.right}, got ${t.layer.right}`);_(t,`flip`)}},z={name:`Viewport inset: neither side fits`,parameters:P,render:()=>(0,x.jsx)(p,{at:{top:120,left:`calc(50% - 20px)`},width:1e3,caption:`FR2, FR4 — A 1000px layer on a centred trigger fits on neither side of it. Where 1000px fits the viewport, it keeps its size and slides along the inline axis the least distance that brings it inside the gutters. Where it does not, it is capped to the viewport minus the gutters.`,children:`Too wide for either side; slid into view`}),play:async({canvasElement:e})=>{let t=await h(e);v(t,1e3,`neither side fits`),_(t,`neither side fits`)}},B={name:`Viewport inset: trigger near the bottom flips above`,parameters:P,render:()=>(0,x.jsx)(p,{at:{bottom:60,left:40},width:240,caption:`FR4 — A 240px layer placed below a trigger 60px from the bottom edge has no room below and flips above. The block axis follows the same rule as the inline axis.`,children:(0,x.jsx)(`div`,{style:{blockSize:90},children:`90px of rows`})}),play:async({canvasElement:e})=>{let t=await h(e);he(t,`near the bottom`),_(t,`near the bottom`)}},V={name:`Viewport inset: wide layer, trigger near the bottom`,parameters:P,render:()=>(0,x.jsx)(p,{at:{bottom:60,left:40},width:690,caption:`FR2, FR4 — A 690px layer placed below a trigger 60px from the bottom edge. On a phone the width is capped to the viewport and fits beside the trigger on neither side; the layer still flips above, because the slide option spans the whole inline axis and leaves the block axis free to choose the side with room.`,children:(0,x.jsx)(`div`,{style:{blockSize:90},children:`90px of rows`})}),play:async({canvasElement:e})=>{let t=await h(e);v(t,690,`wide near the bottom`),he(t,`wide near the bottom`),_(t,`wide near the bottom`)}},H={name:`Viewport inset: taller than the viewport`,parameters:P,render:()=>(0,x.jsx)(p,{at:{top:120,left:40},caption:`FR3 — Content 2000px tall. The layer box is capped to the viewport minus both block gutters; the surface inside scrolls.`,children:(0,x.jsx)(`div`,{className:`xr42rsf x1oysuqx x1bc1iaf`,children:`2000px of rows`})}),play:async({canvasElement:e})=>{let t=await h(e);t.layer.height>t.vh-32+A&&g(`Layer block size ${t.layer.height}px exceeds the viewport minus gutters (${t.vh-32}px)`),(t.layer.top<-1.5||t.layer.bottom>t.vh+A)&&g(`Layer ${N(t.layer)} leaves the viewport`),(t.layer.left<14.5||t.layer.right>t.vw-k+A)&&g(`Layer ${N(t.layer)} leaves the inline gutter`)}},Oe=async e=>{window.scrollTo(e,0),await M(),await new Promise(e=>setTimeout(e,600)),await M()},U={name:`Viewport inset: anchor leaves the viewport`,parameters:P,render:()=>(0,x.jsx)(p,{at:{top:120,left:200},width:320,canvasXstyle:j.wideCanvas,caption:`FR5 — Scroll the page sideways until the trigger leaves the viewport. The open layer goes with it and keeps its 320px: it does not slide toward the edge and pin itself into the strip that is left. Scroll back and it is where it was.`,children:`Holds position and size`}),play:async({canvasElement:e})=>{let t=await h(e);await Oe(t.trigger.right+400);let n=m(e);if(n.trigger.right>0)throw Error(`Fixture: trigger still in view at ${n.trigger.left}..${n.trigger.right}`);if(Math.abs(n.layer.width-t.layer.width)>A)throw Error(`Layer changed size with its anchor off-screen: ${t.layer.width} → ${n.layer.width}`);if(n.layer.left>=0)throw Error(`Layer slid toward the viewport edge (left ${n.layer.left}) while its anchor is at ${n.trigger.left}`);await Oe(0);let r=m(e);Math.abs(r.layer.width-t.layer.width)>A&&g(`Layer changed size after its anchor returned: ${t.layer.width} → ${r.layer.width}`),t.layer.left>=t.trigger.left-A&&(_(r,`after the anchor returned`),Math.abs(r.layer.left-t.layer.left)>A&&g(`Layer did not return with its anchor: ${t.layer.left} → ${r.layer.left}`))}},W={name:`Viewport inset: anchor already off-screen when the layer opens`,parameters:P,render:()=>(0,x.jsx)(p,{at:{top:120,left:200},width:320,canvasXstyle:j.wideCanvas,caption:`FR5, FR8 — The page is scrolled so the trigger is off-screen before the layer opens. The first painted frame already holds beside the anchor; it does not open pinned to the viewport edge and then move.`,children:`Opened with its anchor out of view`}),play:async({canvasElement:e})=>{let t=e.querySelector(`[data-testid="trigger"]`);if(!t)throw Error(`No trigger`);if(await Oe(t.getBoundingClientRect().right+400),t.getBoundingClientRect().right>0)throw Error(`Fixture: trigger still in view`);let n=await h(e);if(n.layer.left>=0)throw Error(`First frame pinned the layer to the viewport (left ${n.layer.left}) while its anchor is at ${n.trigger.left}`);await Oe(0)}},G={name:`Viewport inset: app-declared inset (floating bar)`,parameters:P,render:()=>(0,x.jsx)(ge,{initialInset:160}),play:async({canvasElement:e})=>{let t=await h(e);if(y(t,160,`declared 160px`),t.layer.bottom>t.trigger.top)throw Error(`Expected the layer to flip above the trigger`)}},K={name:`Viewport inset: inset changes while the layer is open`,parameters:P,render:()=>(0,x.jsx)(ge,{initialInset:80}),play:async({canvasElement:e})=>{let t=await h(e);if(t.layer.top<t.trigger.bottom)throw Error(`Fixture: expected the layer below its trigger at 80px`);e.querySelector(`[data-testid="inset-160"]`)?.click(),await Ee();let n=m(e);y(n,160,`first frame after the inset changed`),await M(),pe(n,m(e),`after the inset changed`)}},q={name:`Viewport inset: layer opens in the frame the inset arrives`,parameters:P,render:()=>(0,x.jsx)(ge,{initialInset:160,isOpenInitially:!0}),play:async({canvasElement:e})=>{let t=m(e);y(t,160,`first frame`),await M(),pe(t,m(e),`after mounting open`)}},J={name:`Viewport inset: inset measured by the app`,parameters:P,render:()=>(0,x.jsx)(_e,{}),play:async({canvasElement:e})=>{y(await h(e),80,`measured 80px`),e.querySelector(`[data-testid="toggle-bar"]`)?.click(),await Ee();let t=m(e);y(t,160,`first frame after the bar grew`),await M(),pe(t,m(e),`after the bar grew`)}},Y={name:`Viewport inset: layer portaled out of its JSX position`,parameters:P,render:()=>(0,x.jsx)(ne,{inset:{blockEnd:160},children:(0,x.jsx)(ve,{})}),play:async({canvasElement:e})=>{let t=await h(e);if(document.querySelector(`[popover]:popover-open[id]`)?.closest(`p`))throw Error(`Fixture: the layer did not portal out of the paragraph`);y(t,160,`portaled layer`)}},X={name:`Viewport inset: the gutter`,parameters:P,render:()=>(0,x.jsx)(p,{at:{top:120,right:0},caption:`FR1 — The trigger is flush with the inline-end edge. The layer's content can wrap, so it fits beside the trigger by wrapping, and its inline-end edge stops 16px short of the viewport. (The device safe-area term of the gutter cannot be shown here: Chromium emulation does not populate env(safe-area-inset-*).)`,children:(0,x.jsx)(`span`,{children:`Prose that wraps keeps the gutter rather than flipping or sliding, so a layer never touches the viewport edge.`})}),play:async({canvasElement:e})=>{let t=await h(e);if(t.layer.right>t.vw-k+A)throw Error(`Layer end edge ${t.layer.right} is inside the ${k}px gutter (viewport ${t.vw})`)}},Z={name:`Viewport inset: side placement with a width`,parameters:P,render:()=>(0,x.jsx)(p,{at:{top:200,right:24},placement:`end`,width:320,caption:`FR2, FR4 — A 320px layer placed to the inline END of a trigger 24px from that edge. The room on that side is 24px, so the layer flips to the trigger's other side rather than shrinking. A slide cannot rescue a side placement: the alignment axis is the block axis, so sliding along it moves the layer up or down and does nothing for an inline overflow.`,children:`Placed to the side`}),play:async({canvasElement:e})=>{let t=await h(e);v(t,320,`side placement with a width`),_(t,`side placement with a width`)}},Q={name:`Viewport inset: side placement, neither side fits`,parameters:P,render:()=>(0,x.jsx)(p,{at:{top:200,left:`calc(50% - 20px)`},placement:`start`,width:900,caption:`FR2 — A 900px layer placed to the inline start of a centred trigger. Neither side of the trigger has 900px, and on a phone the viewport itself does not, so the cap is what keeps it on screen: flipping cannot help when both sides are too small, and a block-axis slide cannot change an inline overflow.`,children:`Too wide for either side of the trigger`}),play:async({canvasElement:e})=>{let t=await h(e);v(t,900,`side placement, neither side fits`),_(t,`side placement, neither side fits`)}},ke={name:`Viewport inset: playground (drag the trigger)`,parameters:{...P,docs:{...P.docs,description:{story:`An exploration instrument, not a claim: drag the trigger to any edge or corner, on a phone or with a mouse, while the layer stays open; change width (past the viewport), placement, and alignment; read the resolved geometry. The pinned stories above are the evidence for each rule — this is how to find the configuration nobody pinned.`}}},render:()=>(0,x.jsx)(be,{})},Ae={render:()=>(0,x.jsx)(xe,{})},$={render:()=>(0,x.jsx)(Se,{})},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  render: () => <ContextModeDemo />
}`,...S.parameters?.docs?.source}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  render: () => <OffsetDemo />
}`,...C.parameters?.docs?.source}}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  render: () => <PlacementDemo />
}`,...w.parameters?.docs?.source}}},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  render: () => <FixedModeDemo />
}`,...T.parameters?.docs?.source}}},E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  render: () => <LayerProviderDemo />
}`,...E.parameters?.docs?.source}}},O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
  render: () => <InlineHostingDemo />,
  parameters: {
    docs: {
      description: {
        story: 'A closed context layer leaves only an inert marker at its JSX position. When opened from this unsafe paragraph, the final layer is lazily portaled to the nearest ancestor that can contain it; a layer at a safe position would stay inline. The readout shows where the layer landed and what typography it inherits; the log shows what the browser scrolls as focus moves into and out of it.'
      }
    }
  }
}`,...O.parameters?.docs?.source}}},F.parameters={...F.parameters,docs:{...F.parameters?.docs,source:{originalSource:`{
  name: 'Viewport inset: content-sized, fits beside the trigger',
  parameters: viewportParameters,
  render: () => <ViewportLayer at={{
    top: 120,
    left: 40
  }} caption="FR2, FR4 — A content-sized layer with room beside its trigger sizes to its content and stays start-aligned to the trigger. Nothing caps it to the span; nothing moves it.">
      <span {...stylex.props(viewportStyles.nowrap)}>Four short rows</span>
    </ViewportLayer>,
  play: async ({
    canvasElement
  }) => {
    const r = await open(canvasElement);
    if (Math.abs(r.layer.left - r.trigger.left) > TOLERANCE) {
      throw new Error(\`Expected the layer to stay start-aligned to the trigger (\${r.trigger.left}), got \${r.layer.left}\`);
    }
    if (r.layer.width < 120) {
      throw new Error(\`Layer shrank to \${r.layer.width}px\`);
    }
    assertOnScreen(r, 'fits beside');
  }
}`,...F.parameters?.docs?.source}}},I.parameters={...I.parameters,docs:{...I.parameters?.docs,source:{originalSource:`{
  name: 'Viewport inset: content-sized, does not fit beside the trigger',
  parameters: viewportParameters,
  render: () => <ViewportLayer at={{
    top: 120,
    right: 60
  }} caption="FR2, FR4 — The trigger sits 60px from the inline-end edge and the layer's content cannot wrap. Where the content fits the viewport (desktop), the layer keeps its size and flips to end alignment instead of being squeezed into the room beside the trigger. Where it does not fit the viewport at all (a phone), the layer is capped to the viewport minus its gutters and the content scrolls inside it.">
      <span {...stylex.props(viewportStyles.nowrap)}>
        Unbreakable-label-that-cannot-wrap-to-fit-beside-the-trigger
      </span>
    </ViewportLayer>,
  play: async ({
    canvasElement
  }) => {
    const r = await open(canvasElement);
    const cap = inlineCap(r);
    if (r.layer.width < Math.min(300, cap) - TOLERANCE) {
      throw new Error(\`Layer was squeezed to \${r.layer.width}px\`);
    }
    if (r.layer.width > cap + TOLERANCE) {
      throw new Error(\`Layer \${r.layer.width}px exceeds the cap \${cap}px\`);
    }
    if (r.layer.width < cap - TOLERANCE && Math.abs(r.layer.right - r.trigger.right) > TOLERANCE) {
      throw new Error(\`Expected a flip to end alignment (right \${r.trigger.right}), got right \${r.layer.right}\`);
    }
    assertOnScreen(r, 'does not fit beside');
  }
}`,...I.parameters?.docs?.source}}},L.parameters={...L.parameters,docs:{...L.parameters?.docs,source:{originalSource:`{
  name: 'Viewport inset: explicit size near an edge (352px)',
  parameters: viewportParameters,
  render: () => <ViewportLayer at={{
    top: 120,
    left: 45
  }} alignment="end" width={352} caption="FR2 — An end-aligned layer given width 352 on a trigger 45px from the inline-start edge. The room beside the trigger is 45px plus the trigger; the layer renders at 352px anyway, flipped to start alignment, never shrunk to 274px.">
      A 352px panel
    </ViewportLayer>,
  play: async ({
    canvasElement
  }) => {
    const r = await open(canvasElement);
    assertWidth(r, 352, 'explicit size');
    assertOnScreen(r, 'explicit size');
  }
}`,...L.parameters?.docs?.source}}},R.parameters={...R.parameters,docs:{...R.parameters?.docs,source:{originalSource:`{
  name: 'Viewport inset: trigger near an edge flips',
  parameters: viewportParameters,
  render: () => <ViewportLayer at={{
    top: 120,
    right: 80
  }} width={320} caption="FR4 — A start-aligned 320px layer on a trigger 80px from the inline-end edge flips to end alignment: its inline-end edge meets the trigger's, and it keeps the 16px gutter from the viewport edge.">
      Flipped to the other side
    </ViewportLayer>,
  play: async ({
    canvasElement
  }) => {
    const r = await open(canvasElement);
    assertWidth(r, 320, 'flip');
    // A flip is the answer where the end side has room for 320px (desktop);
    // on a phone neither side does and the layer slides instead (FR4).
    const roomOnEndSide = r.trigger.right - GUTTER;
    if (roomOnEndSide >= 320 && Math.abs(r.layer.right - r.trigger.right) > TOLERANCE) {
      throw new Error(\`Expected the flipped layer's end edge at \${r.trigger.right}, got \${r.layer.right}\`);
    }
    assertOnScreen(r, 'flip');
  }
}`,...R.parameters?.docs?.source}}},z.parameters={...z.parameters,docs:{...z.parameters?.docs,source:{originalSource:`{
  name: 'Viewport inset: neither side fits',
  parameters: viewportParameters,
  render: () => <ViewportLayer at={{
    top: 120,
    left: 'calc(50% - 20px)'
  }} width={1000} caption="FR2, FR4 — A 1000px layer on a centred trigger fits on neither side of it. Where 1000px fits the viewport, it keeps its size and slides along the inline axis the least distance that brings it inside the gutters. Where it does not, it is capped to the viewport minus the gutters.">
      Too wide for either side; slid into view
    </ViewportLayer>,
  play: async ({
    canvasElement
  }) => {
    const r = await open(canvasElement);
    assertWidth(r, 1000, 'neither side fits');
    assertOnScreen(r, 'neither side fits');
  }
}`,...z.parameters?.docs?.source}}},B.parameters={...B.parameters,docs:{...B.parameters?.docs,source:{originalSource:`{
  name: 'Viewport inset: trigger near the bottom flips above',
  parameters: viewportParameters,
  render: () => <ViewportLayer at={{
    bottom: 60,
    left: 40
  }} width={240} caption="FR4 — A 240px layer placed below a trigger 60px from the bottom edge has no room below and flips above. The block axis follows the same rule as the inline axis.">
      <div style={{
      blockSize: 90
    }}>90px of rows</div>
    </ViewportLayer>,
  play: async ({
    canvasElement
  }) => {
    const r = await open(canvasElement);
    assertAbove(r, 'near the bottom');
    assertOnScreen(r, 'near the bottom');
  }
}`,...B.parameters?.docs?.source}}},V.parameters={...V.parameters,docs:{...V.parameters?.docs,source:{originalSource:`{
  name: 'Viewport inset: wide layer, trigger near the bottom',
  parameters: viewportParameters,
  render: () => <ViewportLayer at={{
    bottom: 60,
    left: 40
  }} width={690} caption="FR2, FR4 — A 690px layer placed below a trigger 60px from the bottom edge. On a phone the width is capped to the viewport and fits beside the trigger on neither side; the layer still flips above, because the slide option spans the whole inline axis and leaves the block axis free to choose the side with room.">
      <div style={{
      blockSize: 90
    }}>90px of rows</div>
    </ViewportLayer>,
  play: async ({
    canvasElement
  }) => {
    const r = await open(canvasElement);
    assertWidth(r, 690, 'wide near the bottom');
    assertAbove(r, 'wide near the bottom');
    assertOnScreen(r, 'wide near the bottom');
  }
}`,...V.parameters?.docs?.source}}},H.parameters={...H.parameters,docs:{...H.parameters?.docs,source:{originalSource:`{
  name: 'Viewport inset: taller than the viewport',
  parameters: viewportParameters,
  render: () => <ViewportLayer at={{
    top: 120,
    left: 40
  }} caption="FR3 — Content 2000px tall. The layer box is capped to the viewport minus both block gutters; the surface inside scrolls.">
      <div {...stylex.props(viewportStyles.tall)}>2000px of rows</div>
    </ViewportLayer>,
  play: async ({
    canvasElement
  }) => {
    const r = await open(canvasElement);
    if (r.layer.height > r.vh - 2 * GUTTER + TOLERANCE) {
      fail(\`Layer block size \${r.layer.height}px exceeds the viewport minus gutters (\${r.vh - 2 * GUTTER}px)\`);
    }
    // Taller than either side can hold: capped and shifted into the viewport,
    // keeping its anchor clearance rather than the gutter on the edge it
    // meets (FR4). Inside the viewport on the block axis; gutters inline.
    if (r.layer.top < -TOLERANCE || r.layer.bottom > r.vh + TOLERANCE) {
      fail(\`Layer \${fmt(r.layer)} leaves the viewport\`);
    }
    if (r.layer.left < GUTTER - TOLERANCE || r.layer.right > r.vw - GUTTER + TOLERANCE) {
      fail(\`Layer \${fmt(r.layer)} leaves the inline gutter\`);
    }
  }
}`,...H.parameters?.docs?.source}}},U.parameters={...U.parameters,docs:{...U.parameters?.docs,source:{originalSource:`{
  name: 'Viewport inset: anchor leaves the viewport',
  parameters: viewportParameters,
  render: () => <ViewportLayer at={{
    top: 120,
    left: 200
  }} width={320} canvasXstyle={viewportStyles.wideCanvas} caption="FR5 — Scroll the page sideways until the trigger leaves the viewport. The open layer goes with it and keeps its 320px: it does not slide toward the edge and pin itself into the strip that is left. Scroll back and it is where it was.">
      Holds position and size
    </ViewportLayer>,
  play: async ({
    canvasElement
  }) => {
    const before = await open(canvasElement);
    await scrollAndSettle(before.trigger.right + 400);
    const away = rects(canvasElement);
    if (away.trigger.right > 0) {
      throw new Error(\`Fixture: trigger still in view at \${away.trigger.left}..\${away.trigger.right}\`);
    }
    if (Math.abs(away.layer.width - before.layer.width) > TOLERANCE) {
      throw new Error(\`Layer changed size with its anchor off-screen: \${before.layer.width} → \${away.layer.width}\`);
    }
    if (away.layer.left >= 0) {
      throw new Error(\`Layer slid toward the viewport edge (left \${away.layer.left}) while its anchor is at \${away.trigger.left}\`);
    }
    await scrollAndSettle(0);
    const back = rects(canvasElement);
    if (Math.abs(back.layer.width - before.layer.width) > TOLERANCE) {
      fail(\`Layer changed size after its anchor returned: \${before.layer.width} → \${back.layer.width}\`);
    }
    // Where the layer fit beside its trigger it comes back to the same
    // place. A layer that had to slide (a phone) is a recorded verification
    // gap (spec:AST-059 VG1): Chromium does not re-run the slide when the pin
    // is withdrawn, so the layer can return start-aligned to its anchor and
    // off-screen until its next layout. Asserted here only where it fit.
    const fitBeside = before.layer.left >= before.trigger.left - TOLERANCE;
    if (fitBeside) {
      assertOnScreen(back, 'after the anchor returned');
      if (Math.abs(back.layer.left - before.layer.left) > TOLERANCE) {
        fail(\`Layer did not return with its anchor: \${before.layer.left} → \${back.layer.left}\`);
      }
    }
  }
}`,...U.parameters?.docs?.source}}},W.parameters={...W.parameters,docs:{...W.parameters?.docs,source:{originalSource:`{
  name: 'Viewport inset: anchor already off-screen when the layer opens',
  parameters: viewportParameters,
  render: () => <ViewportLayer at={{
    top: 120,
    left: 200
  }} width={320} canvasXstyle={viewportStyles.wideCanvas} caption="FR5, FR8 — The page is scrolled so the trigger is off-screen before the layer opens. The first painted frame already holds beside the anchor; it does not open pinned to the viewport edge and then move.">
      Opened with its anchor out of view
    </ViewportLayer>,
  play: async ({
    canvasElement
  }) => {
    const trigger = canvasElement.querySelector<HTMLElement>('[data-testid="trigger"]');
    if (!trigger) {
      throw new Error('No trigger');
    }
    await scrollAndSettle(trigger.getBoundingClientRect().right + 400);
    if (trigger.getBoundingClientRect().right > 0) {
      throw new Error('Fixture: trigger still in view');
    }
    const r = await open(canvasElement);
    if (r.layer.left >= 0) {
      throw new Error(\`First frame pinned the layer to the viewport (left \${r.layer.left}) while its anchor is at \${r.trigger.left}\`);
    }
    await scrollAndSettle(0);
  }
}`,...W.parameters?.docs?.source}}},G.parameters={...G.parameters,docs:{...G.parameters?.docs,source:{originalSource:`{
  name: 'Viewport inset: app-declared inset (floating bar)',
  parameters: viewportParameters,
  render: () => <AppInsetDemo initialInset={160} />,
  play: async ({
    canvasElement
  }) => {
    const r = await open(canvasElement);
    assertAboveBar(r, 160, 'declared 160px');
    if (r.layer.bottom > r.trigger.top) {
      throw new Error('Expected the layer to flip above the trigger');
    }
  }
}`,...G.parameters?.docs?.source}}},K.parameters={...K.parameters,docs:{...K.parameters?.docs,source:{originalSource:`{
  name: 'Viewport inset: inset changes while the layer is open',
  parameters: viewportParameters,
  render: () => <AppInsetDemo initialInset={80} />,
  play: async ({
    canvasElement
  }) => {
    const at80 = await open(canvasElement);
    // With an 80px bar the 90px layer fits below its trigger.
    if (at80.layer.top < at80.trigger.bottom) {
      throw new Error('Fixture: expected the layer below its trigger at 80px');
    }
    canvasElement.querySelector<HTMLElement>('[data-testid="inset-160"]')?.click();
    await committed();
    const first = rects(canvasElement);
    assertAboveBar(first, 160, 'first frame after the inset changed');
    await settle();
    assertNoShift(first, rects(canvasElement), 'after the inset changed');
  }
}`,...K.parameters?.docs?.source}}},q.parameters={...q.parameters,docs:{...q.parameters?.docs,source:{originalSource:`{
  name: 'Viewport inset: layer opens in the frame the inset arrives',
  parameters: viewportParameters,
  render: () => <AppInsetDemo initialInset={160} isOpenInitially />,
  play: async ({
    canvasElement
  }) => {
    // The provider mounts with its inset and the layer opens in the same
    // commit; the first frame is already above the bar.
    const first = rects(canvasElement);
    assertAboveBar(first, 160, 'first frame');
    await settle();
    assertNoShift(first, rects(canvasElement), 'after mounting open');
  }
}`,...q.parameters?.docs?.source}}},J.parameters={...J.parameters,docs:{...J.parameters?.docs,source:{originalSource:`{
  name: 'Viewport inset: inset measured by the app',
  parameters: viewportParameters,
  render: () => <MeasuredBarDemo />,
  play: async ({
    canvasElement
  }) => {
    const r = await open(canvasElement);
    assertAboveBar(r, 80, 'measured 80px');
    canvasElement.querySelector<HTMLElement>('[data-testid="toggle-bar"]')?.click();
    await committed();
    // The app's layout effect re-measured and re-declared before this paint.
    const first = rects(canvasElement);
    assertAboveBar(first, 160, 'first frame after the bar grew');
    await settle();
    assertNoShift(first, rects(canvasElement), 'after the bar grew');
  }
}`,...J.parameters?.docs?.source}}},Y.parameters={...Y.parameters,docs:{...Y.parameters?.docs,source:{originalSource:`{
  name: 'Viewport inset: layer portaled out of its JSX position',
  parameters: viewportParameters,
  render: () => <LayerProvider inset={{
    blockEnd: 160
  }}>
      <PortaledLayerDemo />
    </LayerProvider>,
  play: async ({
    canvasElement
  }) => {
    const r = await open(canvasElement);
    const layer = document.querySelector<HTMLElement>('[popover]:popover-open[id]');
    if (layer?.closest('p')) {
      throw new Error('Fixture: the layer did not portal out of the paragraph');
    }
    assertAboveBar(r, 160, 'portaled layer');
  }
}`,...Y.parameters?.docs?.source}}},X.parameters={...X.parameters,docs:{...X.parameters?.docs,source:{originalSource:`{
  name: 'Viewport inset: the gutter',
  parameters: viewportParameters,
  render: () => <ViewportLayer at={{
    top: 120,
    right: 0
  }} caption="FR1 — The trigger is flush with the inline-end edge. The layer's content can wrap, so it fits beside the trigger by wrapping, and its inline-end edge stops 16px short of the viewport. (The device safe-area term of the gutter cannot be shown here: Chromium emulation does not populate env(safe-area-inset-*).)">
      <span>
        Prose that wraps keeps the gutter rather than flipping or sliding, so a
        layer never touches the viewport edge.
      </span>
    </ViewportLayer>,
  play: async ({
    canvasElement
  }) => {
    const r = await open(canvasElement);
    if (r.layer.right > r.vw - GUTTER + TOLERANCE) {
      throw new Error(\`Layer end edge \${r.layer.right} is inside the \${GUTTER}px gutter (viewport \${r.vw})\`);
    }
  }
}`,...X.parameters?.docs?.source}}},Z.parameters={...Z.parameters,docs:{...Z.parameters?.docs,source:{originalSource:`{
  name: 'Viewport inset: side placement with a width',
  parameters: viewportParameters,
  render: () => <ViewportLayer at={{
    top: 200,
    right: 24
  }} placement="end" width={320} caption="FR2, FR4 — A 320px layer placed to the inline END of a trigger 24px from that edge. The room on that side is 24px, so the layer flips to the trigger's other side rather than shrinking. A slide cannot rescue a side placement: the alignment axis is the block axis, so sliding along it moves the layer up or down and does nothing for an inline overflow.">
      Placed to the side
    </ViewportLayer>,
  play: async ({
    canvasElement
  }) => {
    const r = await open(canvasElement);
    assertWidth(r, 320, 'side placement with a width');
    assertOnScreen(r, 'side placement with a width');
  }
}`,...Z.parameters?.docs?.source}}},Q.parameters={...Q.parameters,docs:{...Q.parameters?.docs,source:{originalSource:`{
  name: 'Viewport inset: side placement, neither side fits',
  parameters: viewportParameters,
  render: () => <ViewportLayer at={{
    top: 200,
    left: 'calc(50% - 20px)'
  }} placement="start" width={900} caption="FR2 — A 900px layer placed to the inline start of a centred trigger. Neither side of the trigger has 900px, and on a phone the viewport itself does not, so the cap is what keeps it on screen: flipping cannot help when both sides are too small, and a block-axis slide cannot change an inline overflow.">
      Too wide for either side of the trigger
    </ViewportLayer>,
  play: async ({
    canvasElement
  }) => {
    const r = await open(canvasElement);
    assertWidth(r, 900, 'side placement, neither side fits');
    assertOnScreen(r, 'side placement, neither side fits');
  }
}`,...Q.parameters?.docs?.source}}},ke.parameters={...ke.parameters,docs:{...ke.parameters?.docs,source:{originalSource:`{
  name: 'Viewport inset: playground (drag the trigger)',
  parameters: {
    ...viewportParameters,
    docs: {
      ...viewportParameters.docs,
      description: {
        story: 'An exploration instrument, not a claim: drag the trigger to any edge or corner, on a phone or with a mouse, while the layer stays open; change width (past the viewport), placement, and alignment; read the resolved geometry. The pinned stories above are the evidence for each rule — this is how to find the configuration nobody pinned.'
      }
    }
  },
  render: () => <PlaygroundDemo />
}`,...ke.parameters?.docs?.source}}},Ae.parameters={...Ae.parameters,docs:{...Ae.parameters?.docs,source:{originalSource:`{
  render: () => <BrowserHideWakesAFocusLayerDemo />
}`,...Ae.parameters?.docs?.source}}},$.parameters={...$.parameters,docs:{...$.parameters?.docs,source:{originalSource:`{
  render: () => <ContextMenuPressOpensALayerDemo />
}`,...$.parameters?.docs?.source}}},je=`ContextMode.Offset.Placements.FixedMode.Provider.InlineTriggerHosting.ContentFitsBesideTrigger.ContentDoesNotFitBesideTrigger.ExplicitSizeNearEdge.TriggerNearEdgeFlips.NeitherSideFits.TriggerNearTheBottomFlips.WideLayerNearTheBottomFlips.TallerThanTheViewport.AnchorLeavesTheViewport.AnchorAlreadyOffScreen.AppDeclaredInset.InsetChangesWhileOpen.LayerOpensAsInsetArrives.MeasuredInset.PortaledOutsideTheProviderSubtree.GutterAtTheEdge.SidePlacementWithAWidth.SidePlacementNeitherSideFits.Playground.BrowserHideWakesAFocusLayer.ContextMenuPressOpensALayer`.split(`.`)})))()}Me();export{W as AnchorAlreadyOffScreen,U as AnchorLeavesTheViewport,G as AppDeclaredInset,Ae as BrowserHideWakesAFocusLayer,I as ContentDoesNotFitBesideTrigger,F as ContentFitsBesideTrigger,$ as ContextMenuPressOpensALayer,S as ContextMode,L as ExplicitSizeNearEdge,T as FixedMode,X as GutterAtTheEdge,O as InlineTriggerHosting,K as InsetChangesWhileOpen,q as LayerOpensAsInsetArrives,J as MeasuredInset,z as NeitherSideFits,C as Offset,w as Placements,ke as Playground,Y as PortaledOutsideTheProviderSubtree,E as Provider,Q as SidePlacementNeitherSideFits,Z as SidePlacementWithAWidth,H as TallerThanTheViewport,R as TriggerNearEdgeFlips,B as TriggerNearTheBottomFlips,V as WideLayerNearTheBottomFlips,je as __namedExportsOrder,Ce as default};