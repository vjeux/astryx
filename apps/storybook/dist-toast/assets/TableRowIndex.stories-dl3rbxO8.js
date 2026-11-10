import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{t}from"./react-DlPsW1c0.js";import{t as n}from"./jsx-runtime-MKhVqBIO.js";import{n as r,t as i}from"./Text-C5BHw0wv.js";import{n as a,t as o}from"./useTableSortableState-CUk7B1c_.js";import{n as s,t as c}from"./VStack-SWtDePqc.js";import{N as l,P as u,n as d,t as f}from"./Table-DReqd1jV.js";import{a as p,i as m,r as h}from"./columnUtils-ClYX9X3Y.js";import{n as g,t as _}from"./useTableSortable-DuiSzyVx.js";import{n as v,t as y}from"./useTablePagination-BswUwnZT.js";function b(e,t){let n;return r=>{if(n==null){n=new Map;for(let r=0;r<e.length;r++)n.set(t?t(e[r]):e[r],r)}return n.get(t?t(r):r)}}function x(e={}){let{data:t,getRowKey:n,label:r=`#`,startFrom:i=1}=e,a=(0,S.useMemo)(()=>t==null?null:b(t,n),[t,n]);return(0,S.useMemo)(()=>{let e=new WeakMap,t={key:w,header:r,width:T,align:`end`,resizable:!1,renderCell:t=>{let n=a==null?e.get(t):a(t);return n==null?null:(0,C.jsx)(`span`,{className:`astryx9m5x89 astryx141an7d astryxss6m8b astryxv1l7n4`,children:n+i})}};return u(t,i===1,e=>(0,C.jsx)(`span`,{className:`astryx9m5x89 astryx141an7d astryxss6m8b astryxv1l7n4`,children:e+1})),{rowModel:`flat`,transformBodyCell(t,n,r,i,o,s){return a==null&&n.key===w&&s&&e.set(r,s.logicalIndex),t},transformColumns(e){return[t,...e]}}},[r,i,a])}var S,C,w,T;function E(){return(E=e((()=>{S=t(),l(),C=n(),w=`__rowIndex`,T={type:`pixel`,value:48}})))()}var D,O,k,A,j,M,N,P,F,I,L,R,z;function B(){return(B=e((()=>{D=t(),d(),E(),y(),_(),o(),h(),r(),s(),O=n(),k=[{id:`t1`,title:`Nightfall`,artist:`Ava Chen`,plays:1820},{id:`t2`,title:`Ember`,artist:`Liam Park`,plays:942},{id:`t3`,title:`Tidal`,artist:`Zoe Vega`,plays:3310},{id:`t4`,title:`Cinder`,artist:`Max Ross`,plays:604},{id:`t5`,title:`Halcyon`,artist:`Mia Cole`,plays:2075}],A=[{key:`title`,header:`Title`,width:p(2)},{key:`artist`,header:`Artist`,width:p(2)},{key:`plays`,header:`Plays`,width:m(90),align:`end`,sortable:!0}],j={title:`Core/TableRowIndex`,tags:[`autodocs`]},M={render:()=>{let e=x();return(0,O.jsx)(f,{data:k,columns:A,idKey:`id`,hasHover:!0,plugins:{rowIndex:e}})}},N={render:()=>{let e=x({label:`No.`,startFrom:0});return(0,O.jsx)(f,{data:k,columns:A,idKey:`id`,hasHover:!0,plugins:{rowIndex:e}})}},P={render:()=>{let[e,t]=(0,D.useState)([{sortKey:`plays`,direction:`descending`}]),{sortedData:n,sortConfig:r}=a({data:k,sort:e,onSortChange:t}),i=g(r),o=x(),s=(0,D.useMemo)(()=>({rowIndex:o,sort:i}),[o,i]);return(0,O.jsx)(f,{data:n,columns:A,idKey:`id`,hasHover:!0,plugins:s})}},F=Array.from({length:42},(e,t)=>({id:`c${t+1}`,name:`Contact ${t+1}`,city:[`Lisbon`,`Tokyo`,`Oslo`,`Cairo`][t%4]})),I=[{key:`name`,header:`Name`,width:p(2)},{key:`city`,header:`City`,width:p(1)}],L={render:()=>(0,O.jsxs)(c,{gap:2,children:[(0,O.jsx)(i,{type:`body`,children:`No visible index column, but each row still exposes aria-rowindex, and the table exposes aria-rowcount. Inspect the DOM to verify.`}),(0,O.jsx)(f,{data:F.slice(0,5),columns:I,idKey:`id`,rowCount:F.length})]})},R={render:()=>{let[e,t]=(0,D.useState)(3),n=(e-1)*10,r=F.slice(n,n+10),i=v({page:e,onPageChange:t,totalItems:F.length,pageSize:10}),a=x({data:r,getRowKey:e=>e.id,startFrom:n+1}),o=(0,D.useMemo)(()=>({rowIndex:a,pagination:i}),[a,i]);return(0,O.jsx)(f,{data:r,columns:I,idKey:`id`,hasHover:!0,rowIndexStart:n+1,rowCount:F.length,plugins:o})}},M.parameters={...M.parameters,docs:{...M.parameters?.docs,source:{originalSource:`{
  render: () => {
    const rowIndex = useTableRowIndex<Track>();
    return <Table data={tracks} columns={columns} idKey="id" hasHover plugins={{
      rowIndex
    }} />;
  }
}`,...M.parameters?.docs?.source},description:{story:`A monospaced, right-aligned row-number column is prepended to the table.
Numbering follows the rendered data order and starts at 1 by default.`,...M.parameters?.docs?.description}}},N.parameters={...N.parameters,docs:{...N.parameters?.docs,source:{originalSource:`{
  render: () => {
    const rowIndex = useTableRowIndex<Track>({
      label: 'No.',
      startFrom: 0
    });
    return <Table data={tracks} columns={columns} idKey="id" hasHover plugins={{
      rowIndex
    }} />;
  }
}`,...N.parameters?.docs?.source},description:{story:"Customize the header `label` and the `startFrom` offset (e.g. 0-based).",...N.parameters?.docs?.description}}},P.parameters={...P.parameters,docs:{...P.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [sort, setSort] = useState<TableSortState>([{
      sortKey: 'plays',
      direction: 'descending'
    }]);
    const {
      sortedData,
      sortConfig
    } = useTableSortableState<Track>({
      data: tracks,
      sort,
      onSortChange: setSort
    });
    const sortPlugin = useTableSortable<Track>(sortConfig);
    const rowIndex = useTableRowIndex<Track>();
    const plugins = useMemo(() => ({
      rowIndex,
      sort: sortPlugin
    }), [rowIndex, sortPlugin]);
    return <Table data={sortedData} columns={columns} idKey="id" hasHover plugins={plugins} />;
  }
}`,...P.parameters?.docs?.source},description:{story:`The index reflects the current view: Table gives each row its position, so
numbering renumbers as the sort order changes. Sort by Plays to see rows
renumber 1..n in the new order.`,...P.parameters?.docs?.description}}},L.parameters={...L.parameters,docs:{...L.parameters?.docs,source:{originalSource:`{
  render: () => <VStack gap={2}>
      <Text type="body">
        No visible index column, but each row still exposes aria-rowindex, and
        the table exposes aria-rowcount. Inspect the DOM to verify.
      </Text>
      <Table data={contacts.slice(0, 5)} columns={contactColumns} idKey="id" rowCount={contacts.length} />
    </VStack>
}`,...L.parameters?.docs?.source},description:{story:"The row ordinal is an accessibility concern, not just a visible column. Pass\n`rowCount` (and, for a windowed view, `rowIndexStart`) to emit `aria-rowindex`\non every `<tr>` and `aria-rowcount` on the `<table>`, correct even when no\nvisible `#` column is rendered. Inspect the DOM: rows carry `aria-rowindex`\nwith no index column in sight.",...L.parameters?.docs?.description}}},R.parameters={...R.parameters,docs:{...R.parameters?.docs,source:{originalSource:`{
  render: () => {
    const pageSize = 10;
    const [page, setPage] = useState(3);
    const start = (page - 1) * pageSize;
    const pageData = contacts.slice(start, start + pageSize);
    const pagination = useTablePagination<Contact>({
      page,
      onPageChange: setPage,
      totalItems: contacts.length,
      pageSize
    });
    const rowIndex = useTableRowIndex<Contact>({
      data: pageData,
      getRowKey: item => item.id,
      startFrom: start + 1
    });
    const plugins = useMemo(() => ({
      rowIndex,
      pagination
    }), [rowIndex, pagination]);
    return <Table data={pageData} columns={contactColumns} idKey="id" hasHover rowIndexStart={start + 1} rowCount={contacts.length} plugins={plugins} />;
  }
}`,...R.parameters?.docs?.source},description:{story:"With pagination, `aria-rowindex` must reflect the row's position in the\n**full** dataset, not the current page. Pass `rowIndexStart` as the offset of\nthe first visible row (`(page - 1) * pageSize + 1`) and `rowCount` as the\ntotal. On page 3 below, the first row announces as row 21 of 42. The visible\n`useTableRowIndex` numbering is seeded from the same offset so both agree.",...R.parameters?.docs?.description}}},z=[`Default`,`CustomLabelAndStart`,`RenumbersWithSort`,`AriaRowIndexNoVisibleColumn`,`AriaRowIndexWithPagination`]})))()}B();export{L as AriaRowIndexNoVisibleColumn,R as AriaRowIndexWithPagination,N as CustomLabelAndStart,M as Default,P as RenumbersWithSort,z as __namedExportsOrder,j as default};