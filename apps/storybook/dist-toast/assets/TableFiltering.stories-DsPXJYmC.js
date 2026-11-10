import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{t}from"./react-DlPsW1c0.js";import{n,t as r}from"./stylex-BSlGVhGe.js";import{n as i,t as a}from"./sharedContext-BVffqy7N.js";import{t as o}from"./jsx-runtime-MKhVqBIO.js";import{o as s}from"./InternationalizationContext-C5wQA9mp.js";import{n as c,t as l}from"./useComponentTranslator-Dzvlp8mx.js";import{n as u,t as d}from"./Icon-BmO5FtDV.js";import{n as f,t as p}from"./Button-DoGM0DEN.js";import{n as m,t as ee}from"./Popover-CgJiFJLM.js";import{n as h,t as te}from"./useLocale-BdhI3KFf.js";import{n as g,t as ne}from"./useTableSortableState-CUk7B1c_.js";import{n as re,t as _}from"./Selector-MAEgY-r1.js";import{n as ie,t as v}from"./Table-DReqd1jV.js";import{a as ae,r as oe}from"./columnUtils-ClYX9X3Y.js";import{n as se,t as ce}from"./EmptyState-BMlM13-L.js";import{n as le,t as ue}from"./DateInput-CHI86NkI.js";import{n as de,t as fe}from"./MultiSelector-DlFWmlLw.js";import{n as pe,t as me}from"./TextInput-LGxpinPt.js";import{n as he,t as ge}from"./TimeInput-ghxif3Hl.js";import{a as _e,i as ve,n as ye,r as be,t as y}from"./NumberInput-CXlV3t9e.js";import{i as b,n as x,r as xe,t as Se}from"./useTableSelectionState-CtGJQOHC.js";import{n as S,t as Ce}from"./useTableSortable-DuiSzyVx.js";import{n as C,t as we}from"./useTableColumnResize-BiImaama.js";import{n as Te,t as Ee}from"./Tokenizer-D_tqRcHk.js";import{n as w,t as De}from"./usePowerSearchConfig-Crt-DTyQ.js";var Oe;function ke(){return(ke=e((()=>{Oe={"@astryx.table.filter.allPlaceholder":`All`,"@astryx.table.filter.apply":`Apply`,"@astryx.table.filter.reset":`Reset`,"@astryx.tableFiltering.filterByColumn":`Filter {header}`}})))()}function Ae(e,t){return t?e.operators.find(e=>e.key===t):e.defaultOperator?e.operators.find(t=>t.key===e.defaultOperator):e.operators[0]}function je(e,t){let n=typeof e==`string`?e:e.field,r=typeof e==`string`?void 0:e.operator,i=t.fields.find(e=>e.key===n);if(!i)return;let a=Ae(i,r);if(a)return a.value}function T(e,t,n){let r=[];for(let i of t){if(!i.filter)continue;let t=e[i.key];if(t==null)continue;let a=typeof i.filter==`string`?i.filter:i.filter.field,o=typeof i.filter==`string`?void 0:i.filter.operator,s=n.fields.find(e=>e.key===a);if(!s)continue;let c=Ae(s,o);if(!c)continue;let l=Me(t,c.value);l&&r.push({field:a,operator:c.key,value:l})}return r}function Me(e,t){switch(t.type){case`string`:return typeof e==`string`?{type:`string`,value:e}:void 0;case`integer`:return typeof e==`number`?{type:`integer`,value:e}:void 0;case`float`:return typeof e==`number`?{type:`float`,value:e}:void 0;case`enum`:return typeof e==`string`?{type:`enum`,value:e}:void 0;case`enum_list`:return Array.isArray(e)?{type:`enum_list`,value:e}:void 0;case`date_absolute`:return typeof e==`string`?{type:`date_absolute`,unixSeconds:Math.floor(new Date(e).getTime()/1e3)}:void 0;case`time`:return typeof e==`string`?{type:`time`,value:e}:void 0;case`string_list`:return Array.isArray(e)?{type:`string_list`,value:e}:void 0;case`entity_list`:return Array.isArray(e)?{type:`entity_list`,value:e.map(e=>({id:e,label:e}))}:void 0;case`nested`:case`empty`:case`date_relative`:case`date_range`:case`custom`:return}}function E(){let e=(0,O.use)(A);if(!e)throw Error(`useFilterStore must be used within a Table with filtering`);return e}function Ne({columnKey:e,header:t,size:n,hasClear:r}){let i=c(),a=E(),o=a.getConfig().filters[e],s=typeof o==`string`?o:``;return(0,k.jsx)(me,{label:i(`@astryx.tableFiltering.filterByColumn`,{header:t}),isLabelHidden:!0,value:s,onChange:t=>{a.getConfig().onFilterChange(e,t===``?null:t)},placeholder:i(`@astryx.tableFiltering.filterByColumn`,{header:t}),size:n,hasClear:r})}function Pe({value:e,min:t,max:n,hasClear:r,onChange:i}){let a=h(),o=(0,O.useRef)(e),s=(0,O.useCallback)(e=>{o.current=e,i(e)},[i]),c=(0,O.useCallback)(()=>{o.current=e},[e]),l=(0,O.useCallback)(r=>{let o=ve(r.currentTarget.value,{min:t,max:n,locale:a});o!==null&&o!==e&&i(o)},[a,n,t,i,e]),u=(0,O.useCallback)(s=>{_e(s.value,{min:t,max:n,locale:a,hasClear:r}).type===`revert`&&e!==o.current&&i(o.current)},[r,a,n,t,i,e]);return{handleBlur:(0,O.useCallback)(e=>{u(e.currentTarget)},[u]),handleChange:s,handleFocus:c,handleInput:l,handleKeyDown:(0,O.useCallback)(e=>{e.key===`Enter`&&u(e.currentTarget)},[u])}}function Fe({columnKey:e,header:t,operatorValue:n,size:r,hasClear:i}){let a=c(),o=E(),s=o.getConfig().filters[e],l=typeof s==`number`?s:null,u=n.type===`integer`?1:null,d=(0,O.useCallback)(t=>{o.getConfig().onFilterChange(e,t)},[o,e]),f=Pe({value:l,min:n.minValue,max:n.maxValue,hasClear:!!i,onChange:d});return i?(0,k.jsx)(y,{label:a(`@astryx.tableFiltering.filterByColumn`,{header:t}),isLabelHidden:!0,value:l,onChange:f.handleChange,onFocus:f.handleFocus,onInput:f.handleInput,onBlur:f.handleBlur,onKeyDown:f.handleKeyDown,placeholder:a(`@astryx.tableFiltering.filterByColumn`,{header:t}),min:n.minValue??null,max:n.maxValue??null,step:u,size:r,hasClear:!0}):(0,k.jsx)(y,{label:a(`@astryx.tableFiltering.filterByColumn`,{header:t}),isLabelHidden:!0,value:l,onChange:f.handleChange,onFocus:f.handleFocus,onInput:f.handleInput,onBlur:f.handleBlur,onKeyDown:f.handleKeyDown,placeholder:a(`@astryx.tableFiltering.filterByColumn`,{header:t}),min:n.minValue??null,max:n.maxValue??null,step:u,size:r})}function Ie({columnKey:e,header:t,operatorValue:n,size:r,hasClear:i}){let a=c(),o=E(),s=o.getConfig().filters[e],l=typeof s==`string`?s:``,u=n.values.map(e=>({value:e.value,label:e.label})),d=(0,O.useCallback)(t=>{o.getConfig().onFilterChange(e,t===``||t==null?null:t)},[o,e]);return i?(0,k.jsx)(_,{label:a(`@astryx.tableFiltering.filterByColumn`,{header:t}),isLabelHidden:!0,options:u,value:l||null,onChange:d,placeholder:a(`@astryx.table.filter.allPlaceholder`),size:r,hasClear:!0}):(0,k.jsx)(_,{label:a(`@astryx.tableFiltering.filterByColumn`,{header:t}),isLabelHidden:!0,options:u,value:l,onChange:d,placeholder:a(`@astryx.table.filter.allPlaceholder`),size:r})}function Le({columnKey:e,header:t,operatorValue:n,size:r,hasClear:i}){let a=c(),o=E(),s=o.getConfig().filters[e],l=Array.isArray(s)?s:[],u=n.values.map(e=>({value:e.value,label:e.label}));return(0,k.jsx)(fe,{label:a(`@astryx.tableFiltering.filterByColumn`,{header:t}),isLabelHidden:!0,options:u,value:l,onChange:t=>{o.getConfig().onFilterChange(e,t.length===0?null:t)},placeholder:a(`@astryx.table.filter.allPlaceholder`),size:r,hasSelectAll:!0,hasSearch:!1,hasClear:i})}function Re({columnKey:e,header:t,size:n,hasClear:r}){let i=c(),a=E(),o=a.getConfig().filters[e];return(0,k.jsx)(ue,{label:i(`@astryx.tableFiltering.filterByColumn`,{header:t}),isLabelHidden:!0,value:o??void 0,onChange:t=>{a.getConfig().onFilterChange(e,t??null)},size:n,hasClear:r})}function ze({columnKey:e,header:t,size:n,hasClear:r}){let i=c(),a=E(),o=a.getConfig().filters[e];return(0,k.jsx)(ge,{label:i(`@astryx.tableFiltering.filterByColumn`,{header:t}),isLabelHidden:!0,value:o??void 0,onChange:t=>{a.getConfig().onFilterChange(e,t??null)},size:n,hasClear:r})}function Be({columnKey:e,header:t,operatorValue:n,size:r,hasClear:i}){let a=c(),o=E(),s=o.getConfig().filters[e]??[],l=(0,O.useMemo)(()=>({search:async e=>e.trim()?[{id:e.trim(),label:e.trim()}]:[],bootstrap:()=>[]}),[]),u=n.searchSource??l;return(0,k.jsx)(Ee,{label:a(`@astryx.tableFiltering.filterByColumn`,{header:t}),isLabelHidden:!0,searchSource:u,value:s.map(e=>({id:e,label:e})),onChange:t=>{let n=t.map(e=>e.id);o.getConfig().onFilterChange(e,n.length>0?n:null)},size:r,hasClear:i,presentation:`popover`})}function Ve({columnKey:e,header:t,operatorValue:n,size:r,hasClear:i}){switch(n.type){case`string`:return(0,k.jsx)(Ne,{columnKey:e,header:t,size:r,hasClear:i});case`integer`:case`float`:return(0,k.jsx)(Fe,{columnKey:e,header:t,operatorValue:n,size:r,hasClear:i});case`enum`:return(0,k.jsx)(Ie,{columnKey:e,header:t,operatorValue:n,size:r,hasClear:i});case`enum_list`:return(0,k.jsx)(Le,{columnKey:e,header:t,operatorValue:n,size:r,hasClear:i});case`date_absolute`:return(0,k.jsx)(Re,{columnKey:e,header:t,size:r,hasClear:i});case`time`:return(0,k.jsx)(ze,{columnKey:e,header:t,size:r,hasClear:i});case`string_list`:case`entity_list`:return(0,k.jsx)(Be,{columnKey:e,header:t,operatorValue:n,size:r,hasClear:i});case`nested`:case`empty`:case`date_relative`:case`date_range`:case`custom`:return null}}function He({columnKey:e,header:t,operatorValue:n}){let r=c(),i=E(),a=i.getConfig().filters[e],o=a!=null,[s,l]=(0,O.useState)(!1),[u,f]=(0,O.useState)(null),m=(0,O.useCallback)(e=>{e&&f(a??null),l(e)},[a]),h=(0,O.useCallback)(()=>{i.getConfig().onFilterChange(e,u),l(!1)},[i,e,u]),te=(0,O.useCallback)(()=>{i.getConfig().onFilterChange(e,null),l(!1)},[i,e]),g=(0,O.useMemo)(()=>({getConfig(){return{...i.getConfig(),filters:{...i.getConfig().filters,[e]:u??void 0},onFilterChange:(e,t)=>{f(t)}}}}),[i,e,u,f]);return(0,k.jsx)(ee,{isOpen:s,onOpenChange:m,label:r(`@astryx.tableFiltering.filterByColumn`,{header:t}),placement:`below`,alignment:`start`,content:(0,k.jsx)(A,{value:g,children:(0,k.jsxs)(`div`,{className:`astryxafpxmx`,children:[(0,k.jsx)(Ve,{columnKey:e,header:t,operatorValue:n,size:`md`}),(0,k.jsxs)(`div`,{className:`astryx78zum5 astryx1txdalj astryxtbrsbv`,children:[(0,k.jsx)(p,{label:r(`@astryx.table.filter.reset`),variant:`ghost`,size:`sm`,onClick:te}),(0,k.jsx)(`div`,{className:`astryx98rzlu`}),(0,k.jsx)(p,{label:r(`@astryx.table.filter.apply`),variant:`primary`,size:`sm`,onClick:h})]})]})}),children:(0,k.jsx)(`button`,{type:`button`,"aria-label":r(`@astryx.tableFiltering.filterByColumn`,{header:t}),"aria-haspopup":`dialog`,...{0:{className:`astryxjbqb8w astryxc342km astryxng3xce astryx1ypdohk astryx16khyan astryx3nfvp2 astryx6s0dn4 astryxl56j7k astryx1717udv astryxh6dtrn astryx2lah0s astryx1xrq5m astryx17aqpur astryx3onkmb astryxof6bs astryx25t5g8`},1:{className:`astryxjbqb8w astryxc342km astryxng3xce astryx1ypdohk astryx16khyan astryx3nfvp2 astryx6s0dn4 astryxl56j7k astryx1717udv astryxh6dtrn astryx2lah0s astryx1xrq5m astryx17aqpur astryx1hc1fzr`}}[!!o|0],children:(0,k.jsx)(d,{icon:`funnel`,size:`xsm`,color:o?`accent`:`secondary`})})})}function Ue(e){return typeof e.header==`string`?e.header:e.key}function We({columnKey:e,header:t,operatorValue:n}){return(0,k.jsx)(`div`,{className:`astryx78zum5 astryx6s0dn4 astryx2lah0s`,children:(0,k.jsx)(He,{columnKey:e,header:t,operatorValue:n})})}function Ge({columnKey:e,header:t,operatorValue:r}){let i=(0,O.use)(j)===`inline-compact`?M.placeholderCompact:M.placeholder;return(0,k.jsx)(`div`,{className:`astryx78zum5 astryxdt5ytf astryxzye2dw astryxcsaf9d astryxeuugli`,children:r==null?(0,k.jsx)(`div`,{"aria-hidden":`true`,...n(i)}):(0,k.jsx)(Ve,{columnKey:e,header:t,operatorValue:r,size:`sm`,hasClear:!0})})}function D(e){let t=(0,O.useRef)(e);t.current=e;let n=(0,O.useRef)(null);n.current??={getConfig(){return t.current}};let r=n.current,i=e.variant??`popover`;return(0,O.useMemo)(()=>({transformColumns:i===`inline`||i===`inline-compact`?e=>e.map(e=>e.filter!=null&&e.width==null?{...e,width:ae(1)}:e):void 0,transformTableContext(e){return(0,k.jsx)(A,{value:r,children:(0,k.jsx)(j,{value:i,children:e})})},transformHeaderCell(e,t){let n=t.filter,a=Ue(t),o=n?je(n,r.getConfig().searchConfig):void 0;return i===`popover`?o?{...e,after:(0,k.jsxs)(k.Fragment,{children:[e.after,(0,k.jsx)(We,{columnKey:t.key,header:a,operatorValue:o})]})}:e:{...e,below:(0,k.jsxs)(k.Fragment,{children:[e.below,(0,k.jsx)(Ge,{columnKey:t.key,header:a,operatorValue:o})]})}}}),[r,i])}var O,k,A,j,M;function N(){return(N=e((()=>{O=t(),r(),u(),f(),m(),pe(),ye(),be(),le(),he(),re(),de(),Te(),oe(),te(),l(),ke(),i(),k=o(),s(Oe),A=a(`FilterStoreContext`,1,null),A.displayName=`FilterStoreContext`,j=a(`FilterVariantContext`,1,`popover`),j.displayName=`FilterVariantContext`,M={placeholder:{kZKoxP:`astryx10w6t97`,$$css:!0},placeholderCompact:{kZKoxP:`astryx1fgtraw`,$$css:!0}}})))()}function P(e){let[t,n]=(0,F.useState)(e??{});return{filters:t,onFilterChange:(0,F.useCallback)((e,t)=>{n(n=>{if(t==null){let{[e]:t,...r}=n;return r}return{...n,[e]:t}})},[]),clearAll:(0,F.useCallback)(()=>{n({})},[])}}var F;function I(){return(I=e((()=>{F=t()})))()}var L,R,z,B,V,H,U,W,G,K,q,J,Y,X,Z,Q,Ke;function $(){return($=e((()=>{L=t(),ie(),N(),I(),xe(),Se(),Ce(),ne(),we(),De(),se(),R=o(),z=[{name:`Alice`,email:`alice@example.com`,role:`Engineer`,department:[`Platform`],level:5},{name:`Bob`,email:`bob@example.com`,role:`Designer`,department:[`Product`],level:4},{name:`Charlie`,email:`charlie@example.com`,role:`Manager`,department:[`Platform`],level:6},{name:`Diana`,email:`diana@example.com`,role:`Engineer`,department:[`Infrastructure`],level:5},{name:`Eve`,email:`eve@example.com`,role:`Admin`,department:[`Operations`],level:3}],B=[{key:`name`,type:`string`,label:`Name`},{key:`email`,type:`string`,label:`Email`},{key:`role`,type:`enum`,label:`Role`,enumValues:[{value:`Engineer`,label:`Engineer`},{value:`Designer`,label:`Designer`},{value:`Manager`,label:`Manager`},{value:`Admin`,label:`Admin`}]},{key:`department`,type:`enum_list`,label:`Department`,enumValues:[{value:`Platform`,label:`Platform`},{value:`Product`,label:`Product`},{value:`Infrastructure`,label:`Infrastructure`},{value:`Operations`,label:`Operations`}]},{key:`level`,type:`number`,label:`Level`}],V={title:`Core/TableFiltering`,tags:[`autodocs`]},H={render:()=>{let{config:e,applyFilters:t}=w(B),{filters:n,onFilterChange:r}=P(),i=[{key:`name`,header:`Name`,filter:`name`},{key:`email`,header:`Email`,filter:`email`},{key:`role`,header:`Role`},{key:`department`,header:`Department`}],a=D({filters:n,onFilterChange:r,searchConfig:e}),o=t(T(n,i,e),z);return(0,R.jsxs)(`div`,{style:{maxWidth:800},children:[(0,R.jsxs)(`p`,{style:{marginBottom:8,fontSize:14,color:`var(--color-text-secondary)`},children:[`Showing `,o.length,`/`,z.length,` rows.`]}),(0,R.jsx)(v,{data:o,columns:i,idKey:`name`,plugins:{filter:a}})]})}},U={render:()=>{let{config:e,applyFilters:t}=w(B),{filters:n,onFilterChange:r}=P(),i=[{key:`name`,header:`Name`},{key:`role`,header:`Role`,filter:`role`},{key:`department`,header:`Department`},{key:`level`,header:`Level`}],a=D({filters:n,onFilterChange:r,searchConfig:e}),o=t(T(n,i,e),z);return(0,R.jsxs)(`div`,{style:{maxWidth:800},children:[(0,R.jsxs)(`p`,{style:{marginBottom:8,fontSize:14,color:`var(--color-text-secondary)`},children:[`Enum → selector. Showing `,o.length,`/`,z.length,` rows.`]}),(0,R.jsx)(v,{data:o,columns:i,idKey:`name`,plugins:{filter:a}})]})}},W={render:()=>{let{config:e,applyFilters:t}=w(B),{filters:n,onFilterChange:r}=P(),i=[{key:`name`,header:`Name`},{key:`role`,header:`Role`},{key:`department`,header:`Department`,filter:`department`},{key:`level`,header:`Level`}],a=D({filters:n,onFilterChange:r,searchConfig:e}),o=t(T(n,i,e),z);return(0,R.jsxs)(`div`,{style:{maxWidth:800},children:[(0,R.jsxs)(`p`,{style:{marginBottom:8,fontSize:14,color:`var(--color-text-secondary)`},children:[`Enum list → multi-selector. Showing `,o.length,`/`,z.length,` `,`rows.`]}),(0,R.jsx)(v,{data:o,columns:i,idKey:`name`,plugins:{filter:a}})]})}},G={render:()=>{let{config:e,applyFilters:t}=w(B),{filters:n,onFilterChange:r}=P(),i=[{key:`name`,header:`Name`},{key:`role`,header:`Role`},{key:`level`,header:`Level`,filter:`level`},{key:`department`,header:`Department`}],a=D({filters:n,onFilterChange:r,searchConfig:e}),o=t(T(n,i,e),z);return(0,R.jsxs)(`div`,{style:{maxWidth:800},children:[(0,R.jsxs)(`p`,{style:{marginBottom:8,fontSize:14,color:`var(--color-text-secondary)`},children:[`Number field → numeric input. Showing `,o.length,`/`,z.length,` `,`rows.`]}),(0,R.jsx)(v,{data:o,columns:i,idKey:`name`,plugins:{filter:a}})]})}},K={render:()=>{let{config:e,applyFilters:t}=w(B),{filters:n,onFilterChange:r}=P(),i=[{key:`name`,header:`Name`,filter:`name`},{key:`role`,header:`Role`,filter:`role`},{key:`level`,header:`Level`,filter:`level`},{key:`department`,header:`Department`}],a=D({filters:n,onFilterChange:r,variant:`inline`,searchConfig:e}),o=t(T(n,i,e),z);return(0,R.jsxs)(`div`,{style:{maxWidth:800},children:[(0,R.jsxs)(`p`,{style:{marginBottom:8,fontSize:14,color:`var(--color-text-secondary)`},children:[`Inline variant. Showing `,o.length,`/`,z.length,` rows.`]}),(0,R.jsx)(v,{data:o,columns:i,idKey:`name`,plugins:{filter:a}})]})}},q={render:()=>{let{config:e,applyFilters:t}=w(B),{filters:n,onFilterChange:r}=P(),[i,a]=(0,L.useState)(new Set),o=[{key:`name`,header:`Name`,filter:`name`},{key:`role`,header:`Role`,filter:`role`},{key:`department`,header:`Department`,filter:`department`},{key:`level`,header:`Level`}],s=D({filters:n,onFilterChange:r,searchConfig:e}),c=t(T(n,o,e),z),{selectionConfig:l}=x({data:c,idKey:`name`,selectedKeys:i,setSelectedKeys:a}),u=b(l);return(0,R.jsxs)(`div`,{style:{maxWidth:800},children:[(0,R.jsxs)(`p`,{style:{marginBottom:8,fontSize:14,color:`var(--color-text-secondary)`},children:[`Filtering + Selection. Selected: `,i.size,` | Showing`,` `,c.length,`/`,z.length,` rows.`]}),(0,R.jsx)(v,{data:c,columns:o,idKey:`name`,plugins:{selection:u,filter:s}})]})}},J={render:()=>{let{config:e,applyFilters:t}=w(B),{filters:n,onFilterChange:r}=P(),{sortedData:i,sort:a,sortConfig:o,applySort:s}=g({data:z}),c=[{key:`name`,header:`Name`,sortable:!0,filter:`name`},{key:`role`,header:`Role`,sortable:!0,filter:`role`},{key:`level`,header:`Level`,sortable:!0,filter:`level`},{key:`department`,header:`Department`}],l=D({filters:n,onFilterChange:r,searchConfig:e}),u=S(o),d=s(t(T(n,c,e),z));return(0,R.jsxs)(`div`,{style:{maxWidth:800},children:[(0,R.jsxs)(`p`,{style:{marginBottom:8,fontSize:14,color:`var(--color-text-secondary)`},children:[`Filtering + Sorting. Showing `,d.length,`/`,z.length,` rows.`]}),(0,R.jsx)(v,{data:d,columns:c,idKey:`name`,plugins:{sort:u,filter:l}})]})}},Y={render:()=>{let{config:e,applyFilters:t}=w(B),{filters:n,onFilterChange:r}=P(),[i,a]=(0,L.useState)({}),o=[{key:`name`,header:`Name`,filter:`name`},{key:`role`,header:`Role`,filter:`role`},{key:`level`,header:`Level`,filter:`level`},{key:`department`,header:`Department`}],s=D({filters:n,onFilterChange:r,variant:`inline`,searchConfig:e}),c=C({columnWidths:i,onColumnResizeEnd:e=>a(t=>({...t,...e})),columns:o}),l=t(T(n,o,e),z);return(0,R.jsxs)(`div`,{style:{maxWidth:800},children:[(0,R.jsxs)(`p`,{style:{marginBottom:8,fontSize:14,color:`var(--color-text-secondary)`},children:[`Inline filtering + Resize. Showing `,l.length,`/`,z.length,` `,`rows.`]}),(0,R.jsx)(v,{data:l,columns:o,idKey:`name`,plugins:{filter:s,resize:c}})]})}},X={render:()=>{let{config:e,applyFilters:t}=w(B),{filters:n,onFilterChange:r}=P(),{sortConfig:i,applySort:a}=g({data:z}),[o,s]=(0,L.useState)({}),[c,l]=(0,L.useState)(new Set),u=[{key:`name`,header:`Name`,sortable:!0,filter:`name`},{key:`role`,header:`Role`,sortable:!0,filter:`role`},{key:`level`,header:`Level`,sortable:!0,filter:`level`},{key:`department`,header:`Department`,sortable:!0}],d=D({filters:n,onFilterChange:r,searchConfig:e}),f=S(i),p=C({columnWidths:o,onColumnResizeEnd:e=>s(t=>({...t,...e})),columns:u}),m=a(t(T(n,u,e),z)),{selectionConfig:ee}=x({data:m,idKey:`name`,selectedKeys:c,setSelectedKeys:l}),h=b(ee);return(0,R.jsxs)(`div`,{style:{maxWidth:900},children:[(0,R.jsxs)(`p`,{style:{marginBottom:8,fontSize:14,color:`var(--color-text-secondary)`},children:[`All plugins. Selected: `,c.size,` | Showing `,m.length,`/`,z.length,` rows.`]}),(0,R.jsx)(v,{data:m,columns:u,idKey:`name`,plugins:{selection:h,sort:f,filter:d,resize:p}})]})}},Z={render:()=>{let{config:e,applyFilters:t}=w(B),{filters:n,onFilterChange:r}=P(),i=[{key:`name`,header:`Name`,filter:`name`},{key:`role`,header:`Role`,filter:`role`},{key:`level`,header:`Level`,filter:`level`},{key:`department`,header:`Department`}],a=D({filters:n,onFilterChange:r,variant:`inline`,searchConfig:e}),o=t(T(n,i,e),z);return(0,R.jsxs)(`div`,{style:{maxWidth:800},children:[(0,R.jsxs)(`p`,{style:{marginBottom:8,fontSize:14,color:`var(--color-text-secondary)`},children:[`Inline variant with clear buttons. Type to filter, then click ✕ to clear. Showing `,o.length,`/`,z.length,` rows.`]}),(0,R.jsx)(v,{data:o,columns:i,idKey:`name`,plugins:{filter:a}})]})}},Q={render:()=>{let{config:e,applyFilters:t}=w(B),{filters:n,onFilterChange:r}=P(),i=[{key:`name`,header:`Name`,filter:`name`},{key:`role`,header:`Role`,filter:`role`},{key:`level`,header:`Level`,filter:`level`},{key:`department`,header:`Department`}],a=D({filters:n,onFilterChange:r,variant:`inline`,searchConfig:e}),o=t(T(n,i,e),z);return(0,R.jsxs)(`div`,{style:{maxWidth:800},children:[(0,R.jsx)(`p`,{style:{marginBottom:8,fontSize:14,color:`var(--color-text-secondary)`},children:`Try filtering to get zero results; empty state appears.`}),(0,R.jsx)(v,{data:o,columns:i,idKey:`name`,plugins:{filter:a},emptyState:(0,R.jsx)(ce,{title:`No results`,description:`Try adjusting your filters to find what you're looking for.`,isCompact:!0})})]})}},H.parameters={...H.parameters,docs:{...H.parameters?.docs,source:{originalSource:`{
  render: () => {
    const {
      config,
      applyFilters
    } = usePowerSearchConfig(fieldDefs);
    const {
      filters,
      onFilterChange
    } = useTableFilterState();
    const columns: TableColumn<Employee>[] = [{
      key: 'name',
      header: 'Name',
      filter: 'name'
    }, {
      key: 'email',
      header: 'Email',
      filter: 'email'
    }, {
      key: 'role',
      header: 'Role'
    }, {
      key: 'department',
      header: 'Department'
    }];
    const filterPlugin = useTableFiltering<Employee>({
      filters,
      onFilterChange,
      searchConfig: config
    });
    const data = applyFilters(toSearchFilters(filters, columns, config) as PowerSearchFilter[], employees);
    return <div style={{
      maxWidth: 800
    }}>
        <p style={{
        marginBottom: 8,
        fontSize: 14,
        color: 'var(--color-text-secondary)'
      }}>
          Showing {data.length}/{employees.length} rows.
        </p>
        <Table data={data} columns={columns} idKey="name" plugins={{
        filter: filterPlugin
      }} />
      </div>;
  }
}`,...H.parameters?.docs?.source}}},U.parameters={...U.parameters,docs:{...U.parameters?.docs,source:{originalSource:`{
  render: () => {
    const {
      config,
      applyFilters
    } = usePowerSearchConfig(fieldDefs);
    const {
      filters,
      onFilterChange
    } = useTableFilterState();
    const columns: TableColumn<Employee>[] = [{
      key: 'name',
      header: 'Name'
    }, {
      key: 'role',
      header: 'Role',
      filter: 'role'
    }, {
      key: 'department',
      header: 'Department'
    }, {
      key: 'level',
      header: 'Level'
    }];
    const filterPlugin = useTableFiltering<Employee>({
      filters,
      onFilterChange,
      searchConfig: config
    });
    const data = applyFilters(toSearchFilters(filters, columns, config) as PowerSearchFilter[], employees);
    return <div style={{
      maxWidth: 800
    }}>
        <p style={{
        marginBottom: 8,
        fontSize: 14,
        color: 'var(--color-text-secondary)'
      }}>
          Enum → selector. Showing {data.length}/{employees.length} rows.
        </p>
        <Table data={data} columns={columns} idKey="name" plugins={{
        filter: filterPlugin
      }} />
      </div>;
  }
}`,...U.parameters?.docs?.source}}},W.parameters={...W.parameters,docs:{...W.parameters?.docs,source:{originalSource:`{
  render: () => {
    const {
      config,
      applyFilters
    } = usePowerSearchConfig(fieldDefs);
    const {
      filters,
      onFilterChange
    } = useTableFilterState();
    const columns: TableColumn<Employee>[] = [{
      key: 'name',
      header: 'Name'
    }, {
      key: 'role',
      header: 'Role'
    }, {
      key: 'department',
      header: 'Department',
      filter: 'department'
    }, {
      key: 'level',
      header: 'Level'
    }];
    const filterPlugin = useTableFiltering<Employee>({
      filters,
      onFilterChange,
      searchConfig: config
    });
    const data = applyFilters(toSearchFilters(filters, columns, config) as PowerSearchFilter[], employees);
    return <div style={{
      maxWidth: 800
    }}>
        <p style={{
        marginBottom: 8,
        fontSize: 14,
        color: 'var(--color-text-secondary)'
      }}>
          Enum list → multi-selector. Showing {data.length}/{employees.length}{' '}
          rows.
        </p>
        <Table data={data} columns={columns} idKey="name" plugins={{
        filter: filterPlugin
      }} />
      </div>;
  }
}`,...W.parameters?.docs?.source}}},G.parameters={...G.parameters,docs:{...G.parameters?.docs,source:{originalSource:`{
  render: () => {
    const {
      config,
      applyFilters
    } = usePowerSearchConfig(fieldDefs);
    const {
      filters,
      onFilterChange
    } = useTableFilterState();
    const columns: TableColumn<Employee>[] = [{
      key: 'name',
      header: 'Name'
    }, {
      key: 'role',
      header: 'Role'
    }, {
      key: 'level',
      header: 'Level',
      filter: 'level'
    }, {
      key: 'department',
      header: 'Department'
    }];
    const filterPlugin = useTableFiltering<Employee>({
      filters,
      onFilterChange,
      searchConfig: config
    });
    const data = applyFilters(toSearchFilters(filters, columns, config) as PowerSearchFilter[], employees);
    return <div style={{
      maxWidth: 800
    }}>
        <p style={{
        marginBottom: 8,
        fontSize: 14,
        color: 'var(--color-text-secondary)'
      }}>
          Number field → numeric input. Showing {data.length}/{employees.length}{' '}
          rows.
        </p>
        <Table data={data} columns={columns} idKey="name" plugins={{
        filter: filterPlugin
      }} />
      </div>;
  }
}`,...G.parameters?.docs?.source}}},K.parameters={...K.parameters,docs:{...K.parameters?.docs,source:{originalSource:`{
  render: () => {
    const {
      config,
      applyFilters
    } = usePowerSearchConfig(fieldDefs);
    const {
      filters,
      onFilterChange
    } = useTableFilterState();
    const columns: TableColumn<Employee>[] = [{
      key: 'name',
      header: 'Name',
      filter: 'name'
    }, {
      key: 'role',
      header: 'Role',
      filter: 'role'
    }, {
      key: 'level',
      header: 'Level',
      filter: 'level'
    }, {
      key: 'department',
      header: 'Department'
    }];
    const filterPlugin = useTableFiltering<Employee>({
      filters,
      onFilterChange,
      variant: 'inline',
      searchConfig: config
    });
    const data = applyFilters(toSearchFilters(filters, columns, config) as PowerSearchFilter[], employees);
    return <div style={{
      maxWidth: 800
    }}>
        <p style={{
        marginBottom: 8,
        fontSize: 14,
        color: 'var(--color-text-secondary)'
      }}>
          Inline variant. Showing {data.length}/{employees.length} rows.
        </p>
        <Table data={data} columns={columns} idKey="name" plugins={{
        filter: filterPlugin
      }} />
      </div>;
  }
}`,...K.parameters?.docs?.source}}},q.parameters={...q.parameters,docs:{...q.parameters?.docs,source:{originalSource:`{
  render: () => {
    const {
      config,
      applyFilters
    } = usePowerSearchConfig(fieldDefs);
    const {
      filters,
      onFilterChange
    } = useTableFilterState();
    const [selectedKeys, setSelectedKeys] = useState(new Set<string>());
    const columns: TableColumn<Employee>[] = [{
      key: 'name',
      header: 'Name',
      filter: 'name'
    }, {
      key: 'role',
      header: 'Role',
      filter: 'role'
    }, {
      key: 'department',
      header: 'Department',
      filter: 'department'
    }, {
      key: 'level',
      header: 'Level'
    }];
    const filterPlugin = useTableFiltering<Employee>({
      filters,
      onFilterChange,
      searchConfig: config
    });
    const data = applyFilters(toSearchFilters(filters, columns, config) as PowerSearchFilter[], employees);
    const {
      selectionConfig
    } = useTableSelectionState({
      data,
      idKey: 'name',
      selectedKeys,
      setSelectedKeys
    });
    const selectionPlugin = useTableSelection<Employee>(selectionConfig);
    return <div style={{
      maxWidth: 800
    }}>
        <p style={{
        marginBottom: 8,
        fontSize: 14,
        color: 'var(--color-text-secondary)'
      }}>
          Filtering + Selection. Selected: {selectedKeys.size} | Showing{' '}
          {data.length}/{employees.length} rows.
        </p>
        <Table data={data} columns={columns} idKey="name" plugins={{
        selection: selectionPlugin,
        filter: filterPlugin
      }} />
      </div>;
  }
}`,...q.parameters?.docs?.source}}},J.parameters={...J.parameters,docs:{...J.parameters?.docs,source:{originalSource:`{
  render: () => {
    const {
      config,
      applyFilters
    } = usePowerSearchConfig(fieldDefs);
    const {
      filters,
      onFilterChange
    } = useTableFilterState();
    const {
      sortedData: _unused,
      sort: _sort,
      sortConfig,
      applySort
    } = useTableSortableState<Employee>({
      data: employees
    });
    const columns: TableColumn<Employee>[] = [{
      key: 'name',
      header: 'Name',
      sortable: true,
      filter: 'name'
    }, {
      key: 'role',
      header: 'Role',
      sortable: true,
      filter: 'role'
    }, {
      key: 'level',
      header: 'Level',
      sortable: true,
      filter: 'level'
    }, {
      key: 'department',
      header: 'Department'
    }];
    const filterPlugin = useTableFiltering<Employee>({
      filters,
      onFilterChange,
      searchConfig: config
    });
    const sortPlugin = useTableSortable<Employee>(sortConfig);
    const filtered = applyFilters(toSearchFilters(filters, columns, config) as PowerSearchFilter[], employees);
    const data = applySort(filtered);
    return <div style={{
      maxWidth: 800
    }}>
        <p style={{
        marginBottom: 8,
        fontSize: 14,
        color: 'var(--color-text-secondary)'
      }}>
          Filtering + Sorting. Showing {data.length}/{employees.length} rows.
        </p>
        <Table data={data} columns={columns} idKey="name" plugins={{
        sort: sortPlugin,
        filter: filterPlugin
      }} />
      </div>;
  }
}`,...J.parameters?.docs?.source}}},Y.parameters={...Y.parameters,docs:{...Y.parameters?.docs,source:{originalSource:`{
  render: () => {
    const {
      config,
      applyFilters
    } = usePowerSearchConfig(fieldDefs);
    const {
      filters,
      onFilterChange
    } = useTableFilterState();
    const [columnWidths, setColumnWidths] = useState<Record<string, number>>({});
    const columns: TableColumn<Employee>[] = [{
      key: 'name',
      header: 'Name',
      filter: 'name'
    }, {
      key: 'role',
      header: 'Role',
      filter: 'role'
    }, {
      key: 'level',
      header: 'Level',
      filter: 'level'
    }, {
      key: 'department',
      header: 'Department'
    }];
    const filterPlugin = useTableFiltering<Employee>({
      filters,
      onFilterChange,
      variant: 'inline',
      searchConfig: config
    });
    const resizePlugin = useTableColumnResize<Employee>({
      columnWidths,
      onColumnResizeEnd: updates => setColumnWidths(prev => ({
        ...prev,
        ...updates
      })),
      columns: columns as TableColumn<Record<string, unknown>>[]
    });
    const data = applyFilters(toSearchFilters(filters, columns, config) as PowerSearchFilter[], employees);
    return <div style={{
      maxWidth: 800
    }}>
        <p style={{
        marginBottom: 8,
        fontSize: 14,
        color: 'var(--color-text-secondary)'
      }}>
          Inline filtering + Resize. Showing {data.length}/{employees.length}{' '}
          rows.
        </p>
        <Table data={data} columns={columns} idKey="name" plugins={{
        filter: filterPlugin,
        resize: resizePlugin
      }} />
      </div>;
  }
}`,...Y.parameters?.docs?.source}}},X.parameters={...X.parameters,docs:{...X.parameters?.docs,source:{originalSource:`{
  render: () => {
    const {
      config,
      applyFilters
    } = usePowerSearchConfig(fieldDefs);
    const {
      filters,
      onFilterChange
    } = useTableFilterState();
    const {
      sortConfig,
      applySort
    } = useTableSortableState<Employee>({
      data: employees
    });
    const [columnWidths, setColumnWidths] = useState<Record<string, number>>({});
    const [selectedKeys, setSelectedKeys] = useState(new Set<string>());
    const columns: TableColumn<Employee>[] = [{
      key: 'name',
      header: 'Name',
      sortable: true,
      filter: 'name'
    }, {
      key: 'role',
      header: 'Role',
      sortable: true,
      filter: 'role'
    }, {
      key: 'level',
      header: 'Level',
      sortable: true,
      filter: 'level'
    }, {
      key: 'department',
      header: 'Department',
      sortable: true
    }];
    const filterPlugin = useTableFiltering<Employee>({
      filters,
      onFilterChange,
      searchConfig: config
    });
    const sortPlugin = useTableSortable<Employee>(sortConfig);
    const resizePlugin = useTableColumnResize<Employee>({
      columnWidths,
      onColumnResizeEnd: updates => setColumnWidths(prev => ({
        ...prev,
        ...updates
      })),
      columns: columns as TableColumn<Record<string, unknown>>[]
    });
    const filtered = applyFilters(toSearchFilters(filters, columns, config) as PowerSearchFilter[], employees);
    const data = applySort(filtered);
    const {
      selectionConfig
    } = useTableSelectionState({
      data,
      idKey: 'name',
      selectedKeys,
      setSelectedKeys
    });
    const selectionPlugin = useTableSelection<Employee>(selectionConfig);
    return <div style={{
      maxWidth: 900
    }}>
        <p style={{
        marginBottom: 8,
        fontSize: 14,
        color: 'var(--color-text-secondary)'
      }}>
          All plugins. Selected: {selectedKeys.size} | Showing {data.length}/
          {employees.length} rows.
        </p>
        <Table data={data} columns={columns} idKey="name" plugins={{
        selection: selectionPlugin,
        sort: sortPlugin,
        filter: filterPlugin,
        resize: resizePlugin
      }} />
      </div>;
  }
}`,...X.parameters?.docs?.source}}},Z.parameters={...Z.parameters,docs:{...Z.parameters?.docs,source:{originalSource:`{
  render: () => {
    const {
      config,
      applyFilters
    } = usePowerSearchConfig(fieldDefs);
    const {
      filters,
      onFilterChange
    } = useTableFilterState();
    const columns: TableColumn<Employee>[] = [{
      key: 'name',
      header: 'Name',
      filter: 'name'
    }, {
      key: 'role',
      header: 'Role',
      filter: 'role'
    }, {
      key: 'level',
      header: 'Level',
      filter: 'level'
    }, {
      key: 'department',
      header: 'Department'
    }];
    const filterPlugin = useTableFiltering<Employee>({
      filters,
      onFilterChange,
      variant: 'inline',
      searchConfig: config
    });
    const data = applyFilters(toSearchFilters(filters, columns, config) as PowerSearchFilter[], employees);
    return <div style={{
      maxWidth: 800
    }}>
        <p style={{
        marginBottom: 8,
        fontSize: 14,
        color: 'var(--color-text-secondary)'
      }}>
          Inline variant with clear buttons. Type to filter, then click ✕ to
          clear. Showing {data.length}/{employees.length} rows.
        </p>
        <Table data={data} columns={columns} idKey="name" plugins={{
        filter: filterPlugin
      }} />
      </div>;
  }
}`,...Z.parameters?.docs?.source}}},Q.parameters={...Q.parameters,docs:{...Q.parameters?.docs,source:{originalSource:`{
  render: () => {
    const {
      config,
      applyFilters
    } = usePowerSearchConfig(fieldDefs);
    const {
      filters,
      onFilterChange
    } = useTableFilterState();
    const columns: TableColumn<Employee>[] = [{
      key: 'name',
      header: 'Name',
      filter: 'name'
    }, {
      key: 'role',
      header: 'Role',
      filter: 'role'
    }, {
      key: 'level',
      header: 'Level',
      filter: 'level'
    }, {
      key: 'department',
      header: 'Department'
    }];
    const filterPlugin = useTableFiltering<Employee>({
      filters,
      onFilterChange,
      variant: 'inline',
      searchConfig: config
    });
    const data = applyFilters(toSearchFilters(filters, columns, config) as PowerSearchFilter[], employees);
    return <div style={{
      maxWidth: 800
    }}>
        <p style={{
        marginBottom: 8,
        fontSize: 14,
        color: 'var(--color-text-secondary)'
      }}>
          Try filtering to get zero results; empty state appears.
        </p>
        <Table data={data} columns={columns} idKey="name" plugins={{
        filter: filterPlugin
      }} emptyState={<EmptyStateComponent title="No results" description="Try adjusting your filters to find what you're looking for." isCompact />} />
      </div>;
  }
}`,...Q.parameters?.docs?.source}}},Ke=[`TextFilter`,`SelectorFilter`,`MultiSelectorFilter`,`NumberFilter`,`InlineVariant`,`WithSelection`,`WithSorting`,`WithResize`,`WithAllPlugins`,`InlineWithClear`,`EmptyState`]})))()}$();export{Q as EmptyState,K as InlineVariant,Z as InlineWithClear,W as MultiSelectorFilter,G as NumberFilter,U as SelectorFilter,H as TextFilter,X as WithAllPlugins,Y as WithResize,q as WithSelection,J as WithSorting,Ke as __namedExportsOrder,V as default};