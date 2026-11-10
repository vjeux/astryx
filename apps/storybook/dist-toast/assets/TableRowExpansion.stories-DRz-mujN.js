import{a as e,n as t}from"./rolldown-runtime-sJBDdmOt.js";import{t as n}from"./react-DlPsW1c0.js";import{n as r,t as i}from"./stylex-BSlGVhGe.js";import{b as a,p as o}from"./tokens.stylex-uC3T-IhP.js";import{t as s}from"./jsx-runtime-MKhVqBIO.js";import{o as c}from"./InternationalizationContext-C5wQA9mp.js";import{n as l,t as u}from"./useComponentTranslator-Dzvlp8mx.js";import{a as d,n as f,o as p,r as m,s as h}from"./useTheme-CUotWZgR.js";import{n as g,t as _}from"./rtlStyles-BwjrfDSU.js";import{c as v,i as ee,p as te,t as y,v as ne}from"./animatedLayout-Bkaa4rq8.js";import{n as b,t as x}from"./LayoutChangeSnapshot-CfAuxnOj.js";import{a as re,i as ie,o as S}from"./useClickableContainer-Ci91y5XB.js";import{n as C,t as w}from"./Text-C5BHw0wv.js";import{a as T,i as E,n as ae,t as oe}from"./Icon-BmO5FtDV.js";import{n as se,t as ce}from"./VisuallyHidden-dGudRqPh.js";import{n as le,t as ue}from"./Heading-YiIeUtHm.js";import{n as de,t as fe}from"./useAnimatedLayout-pgfL2aMP.js";import{n as pe,t as me}from"./Badge-DqOhTiyH.js";import{n as he,t as ge}from"./ComponentIcon-DdcNwyt7.js";import{n as _e,t as ve}from"./HStack-D5idGciI.js";import{n as ye,t as be}from"./VStack-SWtDePqc.js";import{A as xe,C as Se,D as Ce,O as we,S as D,T as Te,g as Ee,h as De,k as Oe,m as O,n as ke,p as Ae,t as k,w as je,x as Me}from"./Table-DReqd1jV.js";import{a as Ne,i as A,r as Pe}from"./columnUtils-ClYX9X3Y.js";import{n as Fe,t as Ie}from"./useTableStickyColumns-CjZLR3jH.js";import{n as Le,t as Re}from"./neutralTheme-BXK-s1F0.js";import{c as ze,o as Be}from"./iframe-B7UFaprG.js";var Ve;function He(){return(He=t((()=>{Ve={"@astryx.tableRowExpansion.collapseRow":`Collapse row`,"@astryx.tableRowExpansion.collapseRowNamed":`Collapse {label}`,"@astryx.tableRowExpansion.columnHeader":`Row expansion`,"@astryx.tableRowExpansion.expandRow":`Expand row`,"@astryx.tableRowExpansion.expandRowNamed":`Expand {label}`}})))()}function Ue({rowLabel:e,isExpanded:t,onToggle:n}){let i=l(),a=e?i(t?`@astryx.tableRowExpansion.collapseRowNamed`:`@astryx.tableRowExpansion.expandRowNamed`,{label:e}):i(t?`@astryx.tableRowExpansion.collapseRow`:`@astryx.tableRowExpansion.expandRow`),o=O();return(0,P.jsx)(`button`,{type:`button`,"data-expansion-toggle":``,...r(L.chevronButton,Ze[o?.density??`balanced`]),onClick:e=>{e.stopPropagation(),n()},"aria-label":a,"aria-expanded":t,children:(0,P.jsx)(`span`,{...r(L.glyphBox,E.xsm,L.chevron,t?L.chevronExpanded:L.chevronCollapsed),children:(0,P.jsx)(`span`,{className:`astryx10l6tqk astryx10a8y8t astryx78zum5 astryx6s0dn4 astryxl56j7k`,children:(0,P.jsx)(ge,{slot:`table-row-expand`,state:{expanded:t},fallback:{icon:`chevronRight`,size:`xsm`}})})})})}function j(e){let t=e.parentElement?.previousElementSibling,n=t==null?null:we(t);if(n==null)return;if(z.map(t=>e.style.getPropertyValue(t)).some(e=>e!==``))for(let t of z)e.style.removeProperty(t);let r=getComputedStyle(e);if(!(n.color!==r.borderBottomColor||n.style!==r.borderBottomStyle||n.width!==`initial`&&n.width!==r.borderBottomWidth))return;let i=[n.width,n.style,n.color];z.forEach((t,n)=>{e.style.setProperty(t,i[n])})}function We({cellsRef:e}){let{mode:t}=m(),n=d(),r=(0,N.useRef)({mode:t,themeName:n});return(0,N.useLayoutEffect)(()=>{let i=r.current;if(i.mode!==t||i.themeName!==n){r.current={mode:t,themeName:n};for(let t of e.current)j(t)}},[t,n,e]),null}function Ge({colSpan:e,cellsRef:t,isMuted:n,children:i}){let a=O(),o=a?.dividers===`rows`||a?.dividers===`grid`,s=(0,N.useRef)(null);return(0,N.useLayoutEffect)(()=>{let e=s.current,t=e?.parentElement?.previousElementSibling;if(e==null||t==null||!o)return;if(!t.hasAttribute(`data-astryx-row-gliding`)){j(e);return}let n=0,r=()=>{t.hasAttribute(`data-astryx-row-gliding`)?n=requestAnimationFrame(r):j(e)};return n=requestAnimationFrame(r),()=>cancelAnimationFrame(n)}),(0,N.useLayoutEffect)(()=>{let e=s.current;if(e==null||!o)return;let n=t.current;return n.add(e),()=>{n.delete(e)}},[t,o]),(0,P.jsx)(`td`,{ref:s,colSpan:e,...r(L.expandedCell,n&&L.mutedPanel,Je[a?.density??`balanced`],o&&R.panelCell,D.cell,o&&D.panelCell),children:i})}function Ke({value:e,onBeforeChange:t,onColumnLines:n}){let r=O(),i=r?.dividers===`grid`||r?.dividers===`columns`;return(0,N.useLayoutEffect)(()=>{i&&n()},[i,n]),i?null:(0,P.jsx)(x,{value:e,onBeforeChange:t})}function M(e){let{expandedKeys:t,onToggle:n,getRowKey:i,renderExpanded:a,getRowLabel:o,getIsItemExpandable:s,hasRowClickExpansion:c,panelVariant:u=`transparent`,animatedLayout:d}=e,f=l(),p=(0,N.useRef)(1),m=(0,N.useRef)(new Set),h=(0,N.useRef)(null),_=(0,N.useRef)(null),v=(0,N.useRef)([]),b=(0,N.useRef)(0),x=(0,N.useRef)(0),S=(0,N.useRef)(null),C=(0,N.useCallback)(e=>h.current?.querySelector(`table`)?.querySelector(`:scope > tbody > tr[data-expansion-key="${CSS.escape(e)}"]`)??null,[]),w=(0,N.useCallback)(e=>{if(d==null)return;let n=[...[...e].filter(e=>!t.has(e)),...[...t].filter(t=>!e.has(t))];for(let e of n){let n=C(e);if(n==null)continue;let r=ne(d,()=>n);r.measureBefore();let i=n.nextElementSibling;if(!t.has(e)&&i?.hasAttribute(`data-expansion-panel`)===!0){b.current+=i.getBoundingClientRect().height;let e=h.current;if(e!=null&&S.current==null){let t=getComputedStyle(e);S.current={padding:parseFloat(t.paddingBlockEnd)||0,margin:parseFloat(t.marginBlockEnd)||0}}}y(d,n.querySelector(`[data-expansion-toggle] > *`)),v.current.push({change:r,key:e,isExpanding:t.has(e)})}},[d,t,C]),T=(0,N.useCallback)(()=>{let e=h.current?.querySelector(`table`);for(let t of e?.querySelectorAll(`[data-expansion-toggle] > *`)??[])t.closest(`table`)===e&&y(null,t)},[]);(0,N.useLayoutEffect)(()=>{d??T()},[d,T]),(0,N.useLayoutEffect)(()=>{let e=v.current;v.current=[];let t=[];for(let n of e){let e=C(n.key);if(e==null){n.change.animate();continue}let r=e.nextElementSibling,i={row:e,panel:n.isExpanding&&r instanceof HTMLElement&&r.hasAttribute(`data-expansion-panel`)?r:null,entrance:null,panelOffset:null,edges:new Map};n.change.animate(t=>{for(let n of t)if(n instanceof HTMLTableRowElement&&n.parentElement===e.parentElement){let e=Te(n);e!=null&&i.edges.set(n,e)}if(i.panel!=null){let e=Te(i.panel);e!=null&&(i.edges.set(i.panel,e),i.panelOffset=Me(i.panel,e)),i.entrance=te(d,i.panel)}})&&t.push(i)}let n=h.current,r=t.length>0?b.current:0;b.current=0,x.current===0&&r<=.5&&(S.current=null),t.length!==0&&queueMicrotask(()=>{let e=Promise.all(t.map(async({row:e,panel:t,entrance:n,panelOffset:r,edges:i})=>je(e,i,t!=null&&n!=null?{row:t,animation:n,offset:r}:null,ee)));if(r<=.5||n==null)return;let i=e=>{let t=S.current??{padding:0,margin:0};n.style.paddingBlockEnd=e>0?`${t.padding+e}px`:``,n.style.marginBlockEnd=e>0?`${t.margin-e}px`:``,e<=0&&(S.current=null)};x.current+=r,i(x.current),e.then(()=>{x.current=Math.max(0,x.current-r),i(x.current)})})},[t,d,C]);let E=(0,N.useMemo)(()=>({key:I,header:(0,P.jsx)(ce,{children:f(`@astryx.tableRowExpansion.columnHeader`)}),width:qe,resizable:!1,renderCell:e=>{if(s&&!s(e))return null;let r=i(e),a=t.has(r);return(0,P.jsx)(Ue,{rowLabel:o?.(e)?.trim()||void 0,isExpanded:a,onToggle:()=>n(r)})}}),[t,n,i,s,o,f]);return(0,N.useMemo)(()=>({rowModel:`detail`,transformTableContext(e){return(0,P.jsxs)(P.Fragment,{children:[e,(0,P.jsx)(We,{cellsRef:m})]})},transformColumns(e){let t=[E,...e];return p.current=t.length,t},transformHeaderCell(e,t){return t.key===I?{...e,xstyle:[...e.xstyle,Ye.cell]}:e},transformBodyCell(e,r,a){if(s&&!s(a))return e;let o=i(a),c=t.has(o);return{...e,xstyle:[...e.xstyle,...r.key===I?[Xe.cell]:[],...c?[R.expandedRowCell]:[]],contextMenuActions:()=>[...Ee(e.contextMenuActions),{id:`row-expansion-toggle`,group:`row-expansion`,label:f(c?`@astryx.tableRowExpansion.collapseRow`:`@astryx.tableRowExpansion.expandRow`),icon:(0,P.jsx)(oe,{icon:c?`chevronDown`:`chevronRight`,size:`xsm`,"aria-hidden":!0,xstyle:!c&&g.mirror}),onSelect:()=>n(o)}]}},transformScrollWrapper(e){let n=e.htmlProps.ref??null,r=_.current,i=r!=null&&r.inner===n?r.merged:e=>{h.current=e,typeof n==`function`?n(e):n!=null&&(n.current=e)};return _.current={inner:n,merged:i},{...e,htmlProps:{...e.htmlProps,ref:i},beforeTable:d==null?e.beforeTable:(0,P.jsxs)(P.Fragment,{children:[e.beforeTable,(0,P.jsx)(Ke,{value:t,onBeforeChange:w,onColumnLines:T})]})}},transformBodyRow(e,o){if(s&&!s(o))return e;let l=i(o),d={"data-expansion-key":l},f={...e,htmlProps:{...e.htmlProps,...d}},h=c?{...f,htmlProps:{...f.htmlProps,onClick:e=>{let t=e.currentTarget,r=e.target;r instanceof Element&&(r!==t&&ie(r,t)||r!==t&&r.closest(`[contenteditable]:not([contenteditable="false"])`)||re(t)||(f.htmlProps.onClick?.(e),n(l)))}},xstyle:[...f.xstyle,L.clickableRow]}:f;if(!t.has(l))return h;let g=(0,P.jsx)(`tr`,{"data-expansion-panel":``,...r(xe,D.row),children:(0,P.jsx)(Ge,{colSpan:p.current,cellsRef:m,isMuted:u===`muted`,children:a(o)})},`${l}-expanded`);return{...h,afterRow:h.afterRow?(0,P.jsxs)(P.Fragment,{children:[h.afterRow,g]}):g}}}),[t,i,a,s,c,u,n,f,E,d,w,T])}var N,P,F,I,qe,L,R,Je,Ye,Xe,Ze,z;function Qe(){return(Qe=t((()=>{N=n(),i(),o(),Oe(),Ce(),f(),ae(),he(),T(),se(),De(),Ae(),_(),S(),b(),v(),Se(),u(),He(),P=s(),c(Ve),F=40,I=`__expansion`,`${a[`--spacing-6`]}`,qe={type:`pixel`,value:F},L={chevronButton:{k1xSpc:`astryx3nfvp2`,kGNEyG:`astryx6s0dn4`,kjj79g:`astryxl56j7k`,kzqmXN:`astryx17cz0of`,kZKoxP:`astryxsbjeu0`,kWkggS:`astryxjbqb8w`,kMzoRj:`astryxc342km`,ksu8eU:`astryxng3xce`,kaIpWk:`astryxx3sua9`,kkrTdU:`astryx1ypdohk astryx16khyan`,kMwMTN:`astryxv9yike`,k1ekBW:`astryxt3l3uh`,kIyJzY:`astryxuedmi6`,kAMwcw:`astryxlr8y92`,kmVPX3:`astryx1717udv`,kKwaWg:`astryxmvprkv`,kTIkBA:`astryxy5bzlh`,$$css:!0},glyphBox:{k1xSpc:`astryx1rg5ohu`,kVAEAm:`astryx1n2onr6`,kmuXW:`astryx2lah0s`,$$css:!0},chevron:{k1ekBW:`astryx11xpdln`,kIyJzY:`astryxuedmi6`,kAMwcw:`astryxlr8y92`,$$css:!0},chevronExpanded:{k3aq6I:`astryx1iffjtl astryx1nxqau`,$$css:!0},chevronCollapsed:{k3aq6I:`astryx7p49u4 astryxaafvuh`,$$css:!0},mutedPanel:{kWkggS:`astryxwmxj5m`,$$css:!0},expandedCell:{k8WAf4:`astryx1na6nto`,kwRFfy:`astryxdbrk9v`,$$css:!0},clickableRow:{kkrTdU:`astryx1ypdohk astryx16khyan`,$$css:!0}},R={expandedRowCell:{"--_table-row-divider-width":`astryxfips5p`,kt9PQ7:`astryx1qhh985`,$$css:!0},panelCell:{"--_table-row-divider-width":`astryx3zcg35 astryx1wgu8l8`,kt9PQ7:`astryxkm11vt astryx1r6c449`,kfdmCh:`astryxytfs1h`,kL6WhQ:`astryx1gu98mf`,$$css:!0}},Je={compact:{kZCmMZ:`astryx8oor0o`,kE3dHu:null,kpe85a:null,$$css:!0},balanced:{kZCmMZ:`astryxir64ve`,kE3dHu:null,kpe85a:null,$$css:!0},spacious:{kZCmMZ:`astryx19picz4`,kE3dHu:null,kpe85a:null,$$css:!0}},Ye={cell:{kZCmMZ:`astryx1c1uobl`,kwRFfy:`astryxyri2b`,kE3dHu:null,kpe85a:null,$$css:!0}},Xe={cell:{kZCmMZ:`astryx1c1uobl`,kE3dHu:null,kpe85a:null,$$css:!0}},Ze={compact:{keTefX:`astryx6n8pbd`,koQZXg:null,km5ZXQ:null,$$css:!0},balanced:{keTefX:`astryxs69w1r`,koQZXg:null,km5ZXQ:null,$$css:!0},spacious:{keTefX:`astryx1idpjx9`,koQZXg:null,km5ZXQ:null,$$css:!0}},z=[`--_table-panel-divider-width`,`--_table-panel-divider-style`,`--_table-panel-divider-color`]})))()}function B({order:e}){return(0,U.jsxs)(be,{gap:2,children:[(0,U.jsx)(ue,{level:4,children:`Line items`}),e.items.map(e=>(0,U.jsxs)(ve,{gap:3,children:[(0,U.jsx)(me,{label:`x${e.qty}`,variant:`info`}),(0,U.jsx)(w,{type:`body`,children:e.name}),(0,U.jsx)(w,{type:`body`,color:`secondary`,children:e.price})]},e.name))]})}function V(e,t){let n=new Set(e);return n.has(t)?n.delete(t):n.add(t),n}function $e(){let[e,t]=(0,H.useState)(()=>new Set),n=M({expandedKeys:e,onToggle:e=>t(t=>V(t,e)),getRowKey:e=>e.id,getRowLabel:e=>e.customer,renderExpanded:e=>(0,U.jsx)(B,{order:e})});return(0,U.jsx)(k,{data:W,columns:G,idKey:`id`,plugins:{expansion:n}})}var H,U,W,G,et,K,q,J,Y,X,Z,Q,tt,$,nt;function rt(){return(rt=t((()=>{H=e(n()),ke(),Qe(),Ie(),Pe(),fe(),ze(),h(),Re(),ye(),_e(),C(),le(),pe(),U=s(),W=[{id:`ord-1001`,customer:`Ada Lovelace`,status:`Shipped`,total:`$248.00`,placed:`2026-06-20`,items:[{name:`Mechanical keyboard`,qty:1,price:`$180.00`},{name:`Wrist rest`,qty:2,price:`$34.00`}]},{id:`ord-1002`,customer:`Alan Turing`,status:`Processing`,total:`$52.00`,placed:`2026-06-21`,items:[{name:`USB-C cable`,qty:4,price:`$13.00`}]},{id:`ord-1003`,customer:`Grace Hopper`,status:`Delivered`,total:`$1,200.00`,placed:`2026-06-18`,items:[{name:`Standing desk`,qty:1,price:`$1,200.00`}]}],G=[{key:`customer`,header:`Customer`,width:Ne(2)},{key:`status`,header:`Status`,width:A(130)},{key:`total`,header:`Total`,width:A(110)},{key:`placed`,header:`Placed`,width:A(120)}],et={title:`Core/TableRowExpansion`,tags:[`autodocs`]},K={render:()=>{let[e,t]=(0,H.useState)(new Set([`ord-1001`])),n=M({expandedKeys:e,onToggle:e=>t(t=>V(t,e)),getRowKey:e=>e.id,getRowLabel:e=>e.customer,renderExpanded:e=>(0,U.jsx)(B,{order:e})});return(0,U.jsx)(k,{data:W,columns:G,idKey:`id`,hasHover:!0,plugins:{expansion:n}})}},q={args:{override:!1},render:({override:e})=>{let[t,n]=(0,H.useState)(()=>new Set([`ord-1001`])),r=M({expandedKeys:t,onToggle:e=>n(t=>V(t,e)),getRowKey:e=>e.id,renderExpanded:e=>(0,U.jsx)(B,{order:e})});return(0,U.jsx)(Be,{theme:Le,mode:`system`,children:(0,U.jsxs)(`div`,{"data-testid":`panel-divider-scheme`,style:{backgroundColor:`var(--color-background-surface)`},children:[e&&(0,U.jsx)(`style`,{children:`[data-testid="panel-divider-scheme"] tbody tr:not([data-expansion-panel]) > td { border-bottom-color: var(--color-text-secondary); border-bottom-style: dashed; }`}),(0,U.jsx)(k,{data:W,columns:G,idKey:`id`,plugins:{expansion:r}})]})})}},J={render:()=>{let[e,t]=(0,H.useState)(new Set),n=M({expandedKeys:e,onToggle:e=>t(t=>V(t,e)),getRowKey:e=>e.id,getIsItemExpandable:e=>e.items.length>1,renderExpanded:e=>(0,U.jsx)(B,{order:e})});return(0,U.jsx)(k,{data:W,columns:G,idKey:`id`,hasHover:!0,plugins:{expansion:n}})}},Y=Array.from({length:2e3},(e,t)=>({...W[t%W.length],id:`ord-${String(t+1).padStart(4,`0`)}`})),X=Y.slice(0,7),Z={args:{themed:!1,rowBorder:!1,wideBorder:!1,edgeBorder:`none`,dividers:`rows`,muted:!1},render:({themed:e,rowBorder:t,wideBorder:n,edgeBorder:r,dividers:i,muted:a})=>{let o=(0,H.useRef)(null),s=de({containerRef:o}),[c,l]=(0,H.useState)(()=>new Set),u=M({expandedKeys:c,onToggle:e=>l(t=>V(t,e)),getRowKey:e=>e.id,renderExpanded:e=>(0,U.jsx)(B,{order:e}),animatedLayout:s,panelVariant:a===!0?`muted`:`transparent`}),d=Fe({startKeys:[`customer`]}),f=(0,H.useMemo)(()=>G.map(e=>({...e,width:A(220)})),[]),p={maxWidth:640,...e===!0?{"--color-border":`rgb(37, 99, 235)`}:{},...n===!0?{"--color-border":`rgb(22, 163, 74)`,"--border-width":`2px`}:{}};return(0,U.jsxs)(`div`,{ref:o,"data-testid":`gliding-rows`,style:p,children:[e&&(0,U.jsx)(`style`,{children:`[data-testid="gliding-rows"] tbody tr:nth-child(3) td { border-bottom-color: rgb(220, 38, 38); }`}),t&&(0,U.jsx)(`style`,{children:`[data-testid="gliding-rows"] tr[data-expansion-key="${X[3].id}"] { border-bottom: 3px solid rgb(22, 163, 74); }`}),r===`tbody`&&(0,U.jsx)(`style`,{children:`[data-testid="gliding-rows"] tbody { border-bottom: 3px solid rgb(22, 163, 74); }`}),r===`top`&&(0,U.jsx)(`style`,{children:`[data-testid="gliding-rows"] tr[data-expansion-key="${X[4].id}"] td { border-top: 3px solid rgb(22, 163, 74); }`}),(0,U.jsx)(k,{data:X,columns:f,dividers:i,idKey:`id`,hasHover:!0,plugins:{expansion:u,sticky:d}}),(0,U.jsx)(`p`,{children:`Content after the table glides too.`})]})}},Q={args:{glide:!0},render:({glide:e})=>{let t=(0,H.useRef)(null),n=de({containerRef:t}),[r,i]=(0,H.useState)(()=>new Set),a=M({expandedKeys:r,onToggle:e=>i(t=>V(t,e)),getRowKey:e=>e.id,renderExpanded:e=>(0,U.jsx)(B,{order:e}),animatedLayout:e===!1?void 0:n});return(0,U.jsx)(`div`,{ref:t,"data-testid":`gliding-rows-long`,style:{maxWidth:720,height:520,overflow:`auto`},children:(0,U.jsx)(k,{data:Y,columns:G,idKey:`id`,plugins:{expansion:a}})})}},tt=[{label:`default`,theme:null},...[`sm`,`md`,`lg`].map(e=>({label:e,theme:p({name:`story-row-expand-${e}`,componentIcons:{"table-row-expand":{size:e}}})})),{label:`hidden`,theme:p({name:`story-row-expand-hidden`,componentIcons:{"table-row-expand":null}})}],$={render:()=>(0,U.jsx)(be,{gap:4,children:tt.map(({label:e,theme:t})=>(0,U.jsx)(`div`,{"data-testid":`row-expand-${e}`,children:t?(0,U.jsx)(Be,{theme:t,children:(0,U.jsx)($e,{})}):(0,U.jsx)($e,{})},e))})},K.parameters={...K.parameters,docs:{...K.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [expandedKeys, setExpandedKeys] = useState<Set<string>>(new Set(['ord-1001']));
    const expansion = useTableRowExpansion<Order>({
      expandedKeys,
      onToggle: key => setExpandedKeys(prev => toggleKey(prev, key)),
      getRowKey: item => item.id,
      getRowLabel: item => item.customer,
      renderExpanded: item => <OrderItems order={item} />
    });
    return <Table data={orders} columns={columns} idKey="id" hasHover plugins={{
      expansion
    }} />;
  }
}`,...K.parameters?.docs?.source},description:{story:'Each row expands a full-width detail panel below it, rendered by\n`renderExpanded(item)`. Click the chevron (or right-click, then\n"Expand/Collapse row") to toggle the panel. `getRowLabel` gives each control\na row-specific accessible name. The consumer owns the `expandedKeys` set.\n\nFor hierarchical data (child rows that reuse the parent columns), use\n`useTableTreeData` + `useTableTreeState` instead.',...K.parameters?.docs?.description}}},q.parameters={...q.parameters,docs:{...q.parameters?.docs,source:{originalSource:`{
  args: {
    override: false
  },
  render: ({
    override
  }) => {
    const [expandedKeys, setExpandedKeys] = useState<Set<string>>(() => new Set(['ord-1001']));
    const expansion = useTableRowExpansion<Order>({
      expandedKeys,
      onToggle: key => setExpandedKeys(prev => toggleKey(prev, key)),
      getRowKey: item => item.id,
      renderExpanded: item => <OrderItems order={item} />
    });
    return <Theme theme={neutralTheme} mode="system">
        <div data-testid="panel-divider-scheme" style={{
        backgroundColor: 'var(--color-background-surface)'
      }}>
          {override && <style>{\`[data-testid="panel-divider-scheme"] tbody tr:not([data-expansion-panel]) > td { border-bottom-color: var(--color-text-secondary); border-bottom-style: dashed; }\`}</style>}
          <Table data={orders} columns={columns} idKey="id" plugins={{
          expansion
        }} />
        </div>
      </Theme>;
  }
}`,...q.parameters?.docs?.source},description:{story:`An open panel's divider is the one its row hands down, in the theme's
colour, and follows a switch between light and dark: the table sits in a
\`system\`-mode Theme, which follows the operating system. With \`override\`,
an app draws the row's cells dashed in a token colour, which the panel
carries and follows across the switch too.`,...q.parameters?.docs?.description}}},J.parameters={...J.parameters,docs:{...J.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [expandedKeys, setExpandedKeys] = useState<Set<string>>(new Set());
    const expansion = useTableRowExpansion<Order>({
      expandedKeys,
      onToggle: key => setExpandedKeys(prev => toggleKey(prev, key)),
      getRowKey: item => item.id,
      getIsItemExpandable: item => item.items.length > 1,
      renderExpanded: item => <OrderItems order={item} />
    });
    return <Table data={orders} columns={columns} idKey="id" hasHover plugins={{
      expansion
    }} />;
  }
}`,...J.parameters?.docs?.source},description:{story:`\`getIsItemExpandable\` restricts which rows can expand. Here only orders with
more than one line item are expandable; the rest show no chevron and no
context-menu action.`,...J.parameters?.docs?.description}}},Z.parameters={...Z.parameters,docs:{...Z.parameters?.docs,source:{originalSource:`{
  args: {
    themed: false,
    rowBorder: false,
    wideBorder: false,
    edgeBorder: 'none',
    dividers: 'rows',
    muted: false
  },
  render: ({
    themed,
    rowBorder,
    wideBorder,
    edgeBorder,
    dividers,
    muted
  }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const animatedLayout = useAnimatedLayout({
      containerRef
    });
    const [expandedKeys, setExpandedKeys] = useState<Set<string>>(() => new Set());
    const expansion = useTableRowExpansion<Order>({
      expandedKeys,
      onToggle: key => setExpandedKeys(prev => toggleKey(prev, key)),
      getRowKey: item => item.id,
      renderExpanded: item => <OrderItems order={item} />,
      animatedLayout,
      panelVariant: muted === true ? 'muted' : 'transparent'
    });
    const sticky = useTableStickyColumns<Order>({
      startKeys: ['customer']
    });
    const wideColumns = useMemo(() => columns.map(column => ({
      ...column,
      width: pixel(220)
    })), []);
    const style: React.CSSProperties & Record<string, string | number> = {
      maxWidth: 640,
      ...(themed === true ? {
        '--color-border': 'rgb(37, 99, 235)'
      } : {}),
      ...(wideBorder === true ? {
        '--color-border': 'rgb(22, 163, 74)',
        '--border-width': '2px'
      } : {})
    };
    return <div ref={containerRef} data-testid="gliding-rows" style={style}>
        {themed && <style>{\`[data-testid="gliding-rows"] tbody tr:nth-child(3) td { border-bottom-color: rgb(220, 38, 38); }\`}</style>}
        {rowBorder && <style>{\`[data-testid="gliding-rows"] tr[data-expansion-key="\${sevenOrders[3].id}"] { border-bottom: 3px solid rgb(22, 163, 74); }\`}</style>}
        {edgeBorder === 'tbody' && <style>{\`[data-testid="gliding-rows"] tbody { border-bottom: 3px solid rgb(22, 163, 74); }\`}</style>}
        {edgeBorder === 'top' && <style>{\`[data-testid="gliding-rows"] tr[data-expansion-key="\${sevenOrders[4].id}"] td { border-top: 3px solid rgb(22, 163, 74); }\`}</style>}
        <Table data={sevenOrders} columns={wideColumns} dividers={dividers} idKey="id" hasHover plugins={{
        expansion,
        sticky
      }} />
        <p>Content after the table glides too.</p>
      </div>;
  }
}`,...Z.parameters?.docs?.source},description:{story:"With an `animatedLayout` handle, opening or closing a row's panel glides the\nrows after it instead of jumping them, the panel plays in on the same\nmotion, and each row's divider moves with its row. The Customer column is\npinned and the table scrolls horizontally, so the pinned cells' own\ndividers move too. Under Reduce Motion, and with column lines (the\n`dividers` control at \"columns\" or \"grid\"), the rows change at once. The\n`themed` control sets a blue theme border and an app's red border on the\ntbody's third row; `rowBorder` sets an app's 3 px green border on the\nfourth order's row itself (`tr`), which glides with the row too; `edgeBorder`\nsets one on the tbody's bottom (`tbody`) or as the top of the fifth order's\ncells (`top`), each of which wins the collapse and glides with its row;\n`wideBorder` sets a theme's 2 px green divider on every row; `muted` sets\n`panelVariant=\"muted\"`, whose wash slides in with the panel's content.",...Z.parameters?.docs?.description}}},Q.parameters={...Q.parameters,docs:{...Q.parameters?.docs,source:{originalSource:`{
  args: {
    glide: true
  },
  render: ({
    glide
  }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const animatedLayout = useAnimatedLayout({
      containerRef
    });
    const [expandedKeys, setExpandedKeys] = useState<Set<string>>(() => new Set());
    const expansion = useTableRowExpansion<Order>({
      expandedKeys,
      onToggle: key => setExpandedKeys(prev => toggleKey(prev, key)),
      getRowKey: item => item.id,
      renderExpanded: item => <OrderItems order={item} />,
      animatedLayout: glide === false ? undefined : animatedLayout
    });
    return <div ref={containerRef} data-testid="gliding-rows-long" style={{
      maxWidth: 720,
      height: 520,
      overflow: 'auto'
    }}>
        <Table data={manyOrders} columns={columns} idKey="id" plugins={{
        expansion
      }} />
      </div>;
  }
}`,...Q.parameters?.docs?.source},description:{story:`A long table (2,000 rows, not virtualized) with an \`animatedLayout\`
handle: a glide moves only the rows near the visible part, so opening a
panel costs the same as in a short table.`,...Q.parameters?.docs?.description}}},$.parameters={...$.parameters,docs:{...$.parameters?.docs,source:{originalSource:`{
  render: () => <VStack gap={4}>
      {rowExpandSlotThemes.map(({
      label,
      theme
    }) => <div key={label} data-testid={\`row-expand-\${label}\`}>
          {theme ? <Theme theme={theme}>
              <SlotTable />
            </Theme> : <SlotTable />}
        </div>)}
    </VStack>
}`,...$.parameters?.docs?.source},description:{story:`The same table with the default expansion glyph, with a theme that asks the
\`table-row-expand\` slot for each glyph size, and with a theme that hides it.
The glyph changes; the rows keep their height.`,...$.parameters?.docs?.description}}},nt=[`DetailPanel`,`PanelDividerFollowsScheme`,`NotAllRowsExpandable`,`GlidingRows`,`GlidingRowsLongTable`,`IconSlotRowHeight`]})))()}rt();export{K as DetailPanel,Z as GlidingRows,Q as GlidingRowsLongTable,$ as IconSlotRowHeight,J as NotAllRowsExpandable,q as PanelDividerFollowsScheme,nt as __namedExportsOrder,et as default};