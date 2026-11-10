import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{t}from"./react-DlPsW1c0.js";import{t as n}from"./jsx-runtime-MKhVqBIO.js";import{o as r}from"./InternationalizationContext-C5wQA9mp.js";import{n as i,t as a}from"./useComponentTranslator-Dzvlp8mx.js";import{n as o,t as s}from"./Icon-BmO5FtDV.js";import{n as c,t as l}from"./Table-DReqd1jV.js";import{a as u,i as d,r as f}from"./columnUtils-ClYX9X3Y.js";var p;function m(){return(m=e((()=>{p={"@astryx.tableGroupedRows.collapseGroup":`Collapse group {groupKey}`,"@astryx.tableGroupedRows.expandGroup":`Expand group {groupKey}`}})))()}function h(e){return typeof e==`object`&&!!e&&e[b]===!0}function g(e,t){return new Proxy({[b]:!0,groupKey:e,count:t},x)}function _(e){let t=i(),{data:n,groupBy:r,collapsedGroups:a,onToggleGroup:o,renderGroupHeader:c,getRowKey:l,groupOrder:u}=e,d=(0,v.useMemo)(()=>{if(n.length===0)return[];let e=new Map;for(let t of n){let n=r(t),i=e.get(n);i?i.push(t):e.set(n,[t])}let t=[...e.keys()];if(u&&u.length>0){let n=u.filter(t=>e.has(t)),r=t.filter(e=>!u.includes(e));t=[...n,...r]}let i=[];for(let n of t){let t=e.get(n)??[];i.push(g(n,t.length)),a.has(n)||i.push(...t)}return i},[n,r,a,u]),f=(0,v.useMemo)(()=>{if(l)return null;let e=new Map;for(let t=0;t<d.length;t++)e.set(d[t],t);return e},[d,l]),p=(0,v.useCallback)(e=>h(e)?`__group_${e.groupKey}`:l?l(e):String(f?.get(e)??-1),[l,f]);return{plugin:(0,v.useMemo)(()=>({rowModel:`grouped`,transformBodyCell(e,t,n){return h(n)?{...e,isContentSuppressed:!0}:e},transformBodyRow(e,n){if(!h(n))return e;let r=n,i=a.has(r.groupKey),l=()=>o(r.groupKey),u=c?c(r.groupKey,r.count,i):(0,y.jsxs)(`span`,{className:`astryx2mo6ok astryx1tgivj0`,children:[r.groupKey,` `,(0,y.jsxs)(`span`,{className:`astryx1sodnla astryxv1l7n4`,children:[`(`,r.count,`)`]})]});return{...e,htmlProps:{...e.htmlProps,onClick:l},xstyle:[...e.xstyle,S.headerRow],children:(0,y.jsx)(`td`,{colSpan:999,className:`astryxce4md1 astryx1c1uobl astryx1t818jl`,children:(0,y.jsxs)(`span`,{...{0:{className:`astryx78zum5 astryx6s0dn4 astryxzye2dw astryx1vsv5vr`},1:{className:`astryx78zum5 astryx6s0dn4 astryxzye2dw astryx1vsv5vr astryx1o0tod astryx7wzq59 astryxeq5yr9`}}[!c|0],children:[(0,y.jsx)(`button`,{type:`button`,...{0:{className:`astryx3nfvp2 astryx6s0dn4 astryxl56j7k astryx2lah0s astryx1717udv astryx1ghz6dp astryxjbqb8w astryxc342km astryxng3xce astryx1ypdohk astryx16khyan astryxv9yike astryxy5bzlh`},1:{className:`astryx3nfvp2 astryx6s0dn4 astryxl56j7k astryx2lah0s astryx1717udv astryx1ghz6dp astryxjbqb8w astryxc342km astryxng3xce astryx1ypdohk astryx16khyan astryxv9yike astryxy5bzlh astryx1mzz43t astryx7wzq59 astryx1vjfegm`}}[!!c|0],onClick:e=>{e.stopPropagation(),l()},"aria-label":t(i?`@astryx.tableGroupedRows.expandGroup`:`@astryx.tableGroupedRows.collapseGroup`,{groupKey:r.groupKey}),"aria-expanded":!i,children:(0,y.jsx)(s,{icon:`chevronRight`,size:`sm`,xstyle:[S.chevronIcon,i?S.chevronIconCollapsed:S.chevronIconExpanded]})}),u]})})}}}),[a,o,c,t]),data:d,idKey:p}}var v,y,b,x,S;function C(){return(C=e((()=>{v=t(),o(),a(),m(),y=n(),r(p),b=Symbol(`tableGroupHeader`),x={get(e,t){return t===b||t===`groupKey`||t===`count`||t in e?e[t]:``}},S={headerRow:{kkrTdU:`astryx1ypdohk astryx16khyan`,kfSwDN:`astryx87ps6o`,kWkggS:`astryxwmxj5m`,kt9PQ7:`astryxso031l`,kfdmCh:`astryx1q0q8m5`,kL6WhQ:`astryxw8gpjh`,$$css:!0},chevronIcon:{k1ekBW:`astryx11xpdln`,kIyJzY:`astryxx6bhzk`,$$css:!0},chevronIconCollapsed:{k3aq6I:`astryx7p49u4 astryxaafvuh`,$$css:!0},chevronIconExpanded:{k3aq6I:`astryx1iffjtl astryx1nxqau`,$$css:!0}}})))()}function w(e=[]){let[t,n]=(0,T.useState)(new Set(e));return{collapsedGroups:t,onToggleGroup:(0,T.useCallback)(e=>{n(t=>{let n=new Set(t);return n.has(e)?n.delete(e):n.add(e),n})},[])}}var T,E,D,O,k,A,j,M,N;function P(){return(P=e((()=>{T=t(),c(),C(),f(),E=n(),D=[{id:`1`,name:`Ava Chen`,team:`Design Systems`,role:`Staff Eng`},{id:`2`,name:`Liam Park`,team:`Design Systems`,role:`Engineer`},{id:`3`,name:`Zoe Vega`,team:`Design Systems`,role:`Manager`},{id:`4`,name:`Max Ross`,team:`Infra`,role:`Senior Eng`},{id:`5`,name:`Mia Cole`,team:`Infra`,role:`Engineer`},{id:`6`,name:`Leo Nash`,team:`Growth`,role:`PM`}],O=[{key:`name`,header:`Name`,width:u(2)},{key:`role`,header:`Role`,width:d(140)}],k={title:`Core/TableGroupedRows`,tags:[`autodocs`]},A={render:()=>{let{collapsedGroups:e,onToggleGroup:t}=w(),n=_({data:D,groupBy:e=>e.team,collapsedGroups:e,onToggleGroup:t,getRowKey:e=>e.id});return(0,E.jsx)(l,{data:n.data,columns:O,idKey:n.idKey,hasHover:!0,plugins:{grouped:n.plugin}})}},j={render:()=>{let{collapsedGroups:e,onToggleGroup:t}=w([`Infra`]),n=_({data:D,groupBy:e=>e.team,collapsedGroups:e,onToggleGroup:t,getRowKey:e=>e.id});return(0,E.jsx)(l,{data:n.data,columns:O,idKey:n.idKey,hasHover:!0,plugins:{grouped:n.plugin}})}},M={render:()=>{let{collapsedGroups:e,onToggleGroup:t}=w(),n=_({data:D,groupBy:e=>e.team,collapsedGroups:e,onToggleGroup:t,getRowKey:e=>e.id,groupOrder:[`Growth`,`Infra`],renderGroupHeader:(e,t,n)=>(0,E.jsxs)(`span`,{children:[(0,E.jsx)(`strong`,{children:e}),` — `,t,` `,t===1?`person`:`people`,n?` (hidden)`:``]})});return(0,E.jsx)(l,{data:n.data,columns:O,idKey:n.idKey,hasHover:!0,plugins:{grouped:n.plugin}})}},A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`{
  render: () => {
    const {
      collapsedGroups,
      onToggleGroup
    } = useCollapsed();
    const grouped = useTableGroupedRows<Person>({
      data: people,
      groupBy: p => p.team,
      collapsedGroups,
      onToggleGroup,
      getRowKey: p => p.id
    });
    return <Table data={grouped.data} columns={columns} idKey={grouped.idKey} hasHover plugins={{
      grouped: grouped.plugin
    }} />;
  }
}`,...A.parameters?.docs?.source},description:{story:`Rows are grouped into collapsible sections by \`groupBy\`. Each section gets a
full-width header with a chevron, the group label, and a member count.
Click a header (or its chevron) to collapse/expand that group.`,...A.parameters?.docs?.description}}},j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
  render: () => {
    const {
      collapsedGroups,
      onToggleGroup
    } = useCollapsed(['Infra']);
    const grouped = useTableGroupedRows<Person>({
      data: people,
      groupBy: p => p.team,
      collapsedGroups,
      onToggleGroup,
      getRowKey: p => p.id
    });
    return <Table data={grouped.data} columns={columns} idKey={grouped.idKey} hasHover plugins={{
      grouped: grouped.plugin
    }} />;
  }
}`,...j.parameters?.docs?.source},description:{story:'Groups can start collapsed — pass their keys in the initial `collapsedGroups`\nset. Here "Infra" begins collapsed.',...j.parameters?.docs?.description}}},M.parameters={...M.parameters,docs:{...M.parameters?.docs,source:{originalSource:`{
  render: () => {
    const {
      collapsedGroups,
      onToggleGroup
    } = useCollapsed();
    const grouped = useTableGroupedRows<Person>({
      data: people,
      groupBy: p => p.team,
      collapsedGroups,
      onToggleGroup,
      getRowKey: p => p.id,
      groupOrder: ['Growth', 'Infra'],
      renderGroupHeader: (key, count, collapsed) => <span>
          <strong>{key}</strong> — {count} {count === 1 ? 'person' : 'people'}
          {collapsed ? ' (hidden)' : ''}
        </span>
    });
    return <Table data={grouped.data} columns={columns} idKey={grouped.idKey} hasHover plugins={{
      grouped: grouped.plugin
    }} />;
  }
}`,...M.parameters?.docs?.source},description:{story:"`groupOrder` pins specific groups to the front; `renderGroupHeader`\ncustomizes the header content shown to the right of the chevron.",...M.parameters?.docs?.description}}},N=[`Default`,`InitiallyCollapsed`,`CustomOrderAndHeader`]})))()}P();export{M as CustomOrderAndHeader,A as Default,j as InitiallyCollapsed,N as __namedExportsOrder,k as default};