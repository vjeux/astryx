import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{t}from"./react-DlPsW1c0.js";import{n,t as r}from"./stylex-BSlGVhGe.js";import{b as i,p as a}from"./tokens.stylex-uC3T-IhP.js";import{n as o,t as s}from"./sharedContext-BVffqy7N.js";import{t as c}from"./jsx-runtime-MKhVqBIO.js";import{n as l}from"./mergeRefs-j3zlnF-6.js";import{o as u}from"./InternationalizationContext-C5wQA9mp.js";import{n as d,t as f}from"./useComponentTranslator-Dzvlp8mx.js";import{a as p,r as m}from"./focusOutline.stylex-DWroqGen.js";import{n as ee,t as h}from"./useIsomorphicLayoutEffect-CuJHR9MK.js";import{a as g,i as _,o as v}from"./useClickableContainer-Ci91y5XB.js";import{n as y,t as b}from"./Icon-BmO5FtDV.js";import{n as te,t as x}from"./useTableSortableState-CUk7B1c_.js";import{F as S,I as C,i as w,n as T,r as E,t as D}from"./Table-DReqd1jV.js";import{a as O,i as ne,r as re}from"./columnUtils-ClYX9X3Y.js";import{i as ie,n as ae,r as oe,t as se}from"./useTableSelectionState-CtGJQOHC.js";import{n as ce,t as le}from"./useTableSortable-DuiSzyVx.js";var ue;function k(){return(k=e((()=>{ue={"@astryx.tableTree.collapseAllRows":`Collapse all rows`,"@astryx.tableTree.collapseRow":`Collapse row`,"@astryx.tableTree.collapseRowNamed":`Collapse {label}`,"@astryx.tableTree.expandAllRows":`Expand all rows`,"@astryx.tableTree.expandRow":`Expand row`,"@astryx.tableTree.expandRowNamed":`Expand {label}`}})))()}function de(e){let t=new Set;return{subscribe(e){return t.add(e),()=>t.delete(e)},notify(){for(let e of t)e()},getConfig(){return e.current}}}function fe(e,t){let n=e.getRowMeta(t);if(!n)return-1;let r=n.level*16+P[e.indent??`md`]*4+(n.hasChildren?2:0)+ +!!n.isExpanded;return e.getRowLabel?`${r}\u0000${e.getRowLabel(t)?.trim()??``}`:r}function pe(e,t){let n=(0,j.useCallback)(()=>fe(e.getConfig(),t),[e,t]);return(0,j.useSyncExternalStore)(e.subscribe,n,n)}function me(e,t){t?e.setAttribute(`aria-level`,String(t.level+1)):e.removeAttribute(`aria-level`)}function he({isExpanded:e,onToggle:t,rowLabel:n}){let r=d(),i=(0,j.use)(S)?.density===`compact`,a=n?.trim(),o=a?r(e?`@astryx.tableTree.collapseRowNamed`:`@astryx.tableTree.expandRowNamed`,{label:a}):r(e?`@astryx.tableTree.collapseRow`:`@astryx.tableTree.expandRow`);return(0,M.jsx)(`button`,{type:`button`,...m.focusVisible(L.expanderButton,i&&L.expanderFocusInset),onClick:e=>{e.stopPropagation(),t()},"aria-label":o,"aria-expanded":e,children:(0,M.jsx)(b,{icon:`chevronRight`,size:`xsm`,xstyle:[L.chevronIcon,e?L.chevronIconExpanded:L.chevronIconCollapsed]})})}function ge({isAllExpanded:e,onExpandAll:t,onCollapseAll:n}){let r=d(),i=(0,j.use)(S)?.density===`compact`,a=e===!0;return(0,M.jsx)(`button`,{type:`button`,...m.focusVisible(L.expanderButton,i&&L.expanderFocusInset),onClick:e=>{e.stopPropagation(),a?n():t()},"aria-label":r(a?`@astryx.tableTree.collapseAllRows`:`@astryx.tableTree.expandAllRows`),"aria-expanded":a,children:(0,M.jsx)(b,{icon:`chevronRight`,size:`xsm`,xstyle:[L.chevronIcon,a?L.chevronIconExpanded:L.chevronIconCollapsed]})})}function _e({item:e,children:t}){let n=(0,j.use)(N);return n?(0,M.jsx)(ve,{store:n,item:e,children:t}):(0,M.jsx)(M.Fragment,{children:t})}function ve({store:e,item:t,children:r}){pe(e,t);let i=e.getConfig(),a=i.getRowMeta(t);if(!a)return(0,M.jsx)(M.Fragment,{children:r});let o=F[i.indent??`md`],s=`calc(${a.level} * ${o})`;return(0,M.jsxs)(`div`,{...n(L.cell,a.level>0&&L.indent(s)),children:[a.hasChildren?(0,M.jsx)(he,{isExpanded:a.isExpanded,onToggle:()=>e.getConfig().onToggleItem(t),rowLabel:i.getRowLabel?.(t)}):(0,M.jsx)(`span`,{className:`astryx1rg5ohu astryxvy4d1p astryxxk0z11 astryx2lah0s`}),r]})}function A(e){let t=(0,j.useRef)(e);t.current=e;let n=(0,j.useRef)(null);n.current??=de(t);let r=n.current;(0,j.useEffect)(()=>{r.notify()});let i=(0,j.useRef)(null),a=(0,j.useRef)(void 0),o=(0,j.useMemo)(()=>{let e=(e,t,n)=>{let r=i.current;if(!r||r.treeKey!==t||r.wrapped!==n)return null;let a=r.input;if(a!==e){if(a.length!==e.length)return null;for(let t=0;t<a.length;t++)if(a[t]!==e[t])return null}return r.output};return{rowModel:`tree`,transformTableContext(e){return(0,M.jsx)(N,{value:r,children:e})},transformColumns(t){let{hasExpandableRows:n,treeColumnKey:o}=r.getConfig(),s=o!=null&&t.some(e=>e.key===o)?o:t.find(e=>!e.key.startsWith(`__`))?.key??t[0]?.key;a.current=s;let c=n,l=e(t,s,c);if(l)return l;let u=c?t.map(e=>{if(e.key!==s)return e;let t=e.renderCell;return{...e,renderCell:n=>(0,M.jsx)(_e,{item:n,children:t?t(n):String(n[e.key]??``)})}}):t;return i.current={input:t,treeKey:s,wrapped:c,output:u},u},transformHeaderCell(e,t){let{hasExpandableRows:n,hasExpandAllControl:i,isAllExpanded:o,onExpandAll:s,onCollapseAll:c}=r.getConfig();return!i||!n||t.key!==a.current||o===void 0||!s||!c?e:{...e,content:(0,M.jsxs)(`span`,{className:`astryx3nfvp2 astryx6s0dn4 astryxzye2dw astryxeuugli`,children:[(0,M.jsx)(ge,{isAllExpanded:o,onExpandAll:s,onCollapseAll:c}),e.content]})}},transformBodyRow(e,t){let n=e=>{if(!e)return;let n=()=>{let n=r.getConfig();me(e,n.hasExpandableRows?n.getRowMeta(t):void 0)};n();let i=r.subscribe(n);return()=>{i()}},i={...e,ref:e.ref?l(e.ref,n):n},a=r.getConfig();return a.hasRowClickExpansion===!0&&a.hasExpandableRows&&a.getRowMeta(t)?.hasChildren===!0?{...i,htmlProps:{...i.htmlProps,onClick:e=>{let n=e.currentTarget,r=e.target;r instanceof Element&&(r!==n&&_(r,n)||r!==n&&r.closest(`[contenteditable]:not([contenteditable="false"])`)||g(n)||a.onToggleItem(t))}},xstyle:[...i.xstyle,L.clickableRow]}:i}}},[r]);return w(o)}var j,M,N,P,F,I,L;function ye(){return(ye=e((()=>{j=t(),r(),a(),p(),y(),v(),f(),k(),o(),M=c(),C(),E(),u(ue),N=s(`TreeStoreContext`,1,null),N.displayName=`TreeStoreContext`,P={sm:0,md:1,lg:2},F={sm:i[`--spacing-3`],md:i[`--spacing-4`],lg:i[`--spacing-6`]},I={kE3dHu:``,kpe85a:``,$$css:!0},L={cell:{k1xSpc:`astryx78zum5`,kGNEyG:`astryx6s0dn4`,kOIVth:`astryxzye2dw`,$$css:!0},indent:e=>[I,{kZCmMZ:e==null?e:`astryxnvo3vl`,$$css:!0},{"--x-paddingInlineStart":(e=>typeof e==`number`?e+`px`:e??void 0)(e)}],expanderFocusInset:{kInvED:`astryx1nw7mhf`,$$css:!0},expanderButton:{k1xSpc:`astryx3nfvp2`,kGNEyG:`astryx6s0dn4`,kjj79g:`astryxl56j7k`,kzqmXN:`astryxvy4d1p`,kZKoxP:`astryxxk0z11`,kWkggS:`astryxjbqb8w`,kMzoRj:`astryxc342km`,kjGldf:null,k2ei4v:null,kZ1KPB:null,ke9TFa:null,kWqL5O:null,kLoX6v:null,kEafiO:null,kt9PQ7:null,ksu8eU:`astryxng3xce`,kJRH4f:null,kVhnKS:null,k4WBpm:null,k8ry5P:null,kSWEuD:null,kDUl1X:null,kPef9Z:null,kfdmCh:null,kaIpWk:`astryxx3sua9`,krdFHd:null,kfmiAY:null,kVL7Gh:null,kT0f0o:null,kIxVMA:null,ksF3WI:null,kqGeR4:null,kYm2EN:null,kkrTdU:`astryx1ypdohk astryx16khyan`,kMwMTN:`astryxv9yike`,k1ekBW:`astryx1gbuem2`,kIyJzY:`astryxx6bhzk`,kmVPX3:`astryx1717udv`,kg3NbH:null,kuDDbn:null,kE3dHu:null,kP0aTx:null,kpe85a:null,k8WAf4:null,kLKAdn:null,kGO01o:null,kmuXW:`astryx2lah0s`,kKwaWg:`astryxmvprkv`,kTIkBA:`astryxy5bzlh`,$$css:!0},chevronIcon:{k1ekBW:`astryx11xpdln`,kIyJzY:`astryxx6bhzk`,$$css:!0},chevronIconCollapsed:{k3aq6I:`astryx7p49u4 astryxaafvuh`,$$css:!0},chevronIconExpanded:{k3aq6I:`astryx1iffjtl astryx1nxqau`,$$css:!0},clickableRow:{kkrTdU:`astryx1ypdohk astryx16khyan`,$$css:!0}}})))()}function R(e){let{data:t,idKey:n,childrenKey:r=`children`,defaultExpandedIds:i,expandedIds:a,onExpandedIdsChange:o,isItemExpandable:s,sortSiblings:c,indent:l,treeColumnKey:u}=e,d=(0,z.useCallback)(e=>String(typeof n==`function`?n(e):e[n]),[n]),f=(0,z.useCallback)(e=>{let t=e[r];return Array.isArray(t)?t:[]},[r]),p=(0,z.useCallback)(e=>s?s(e):f(e).length>0,[s,f]),[m,h]=(0,z.useState)(()=>new Set(i)),g=a!==void 0,_=g?a:m,v=(0,z.useRef)(_),y=(0,z.useRef)(o);ee(()=>{v.current=_,y.current=o});let b=(0,z.useCallback)(e=>{v.current=e,g||h(e),y.current?.(e)},[g]),{visibleData:te,metaMap:x}=(0,z.useMemo)(()=>{let e=[],n=new Map,r=new Set,i=(t,a)=>{let o=c?c([...t]):t;for(let t of o){let o=d(t);if(r.has(o))continue;let s=p(t),c=s&&_.has(o);e.push(t),n.set(o,{id:o,level:a,hasChildren:s,isExpanded:c}),c&&(r.add(o),i(f(t),a+1),r.delete(o))}};return i(t,0),{visibleData:e,metaMap:n}},[t,_,d,f,p,c]),S=(0,z.useMemo)(()=>{let e=[],n=new Set,r=t=>{for(let i of t){let t=d(i);n.has(t)||(p(i)&&e.push(t),n.add(t),r(f(i)),n.delete(t))}};return r(t),e},[t,d,f,p]),C=S.length>0,w=(0,z.useMemo)(()=>{if(!C)return!1;let e=S.filter(e=>_.has(e)).length;return e===0?!1:e===S.length||`indeterminate`},[C,S,_]),T=(0,z.useCallback)(e=>{let t=d(e),n=new Set(v.current);n.has(t)?n.delete(t):n.add(t),b(n)},[d,b]),E=(0,z.useCallback)(()=>{b(new Set(S))},[b,S]),D=(0,z.useCallback)(()=>{b(new Set)},[b]),O=(0,z.useCallback)(e=>x.get(d(e)),[x,d]);return{visibleData:te,treeConfig:(0,z.useMemo)(()=>({getRowMeta:O,onToggleItem:T,hasExpandableRows:C,isAllExpanded:w,onExpandAll:E,onCollapseAll:D,indent:l,treeColumnKey:u}),[O,T,C,w,E,D,l,u]),expandedIds:_,isAllExpanded:w,expandAll:E,collapseAll:D}}var z;function be(){return(be=e((()=>{z=t(),h()})))()}function xe({indent:e}){let{visibleData:t,treeConfig:n}=R({data:H,idKey:`id`,indent:e,defaultExpandedIds:[`eng`,`eng-platform`,`eng-platform-core`]}),r=A(n);return(0,V.jsxs)(`div`,{children:[(0,V.jsxs)(`p`,{style:{marginBlockEnd:8,fontWeight:600},children:[`indent="`,e,`"`]}),(0,V.jsx)(D,{data:t,columns:U,idKey:`id`,plugins:{tree:r}})]})}var B,V,H,U,Se,Ce,W,G,K,q,J,Y,X,Z,Q,$,we;function Te(){return(Te=e((()=>{B=t(),T(),ye(),be(),oe(),se(),le(),x(),re(),V=c(),H=[{id:`eng`,name:`Engineering`,title:`VP Engineering`,team:`Engineering`,headcount:48,children:[{id:`eng-platform`,name:`Platform`,title:`Director`,team:`Engineering`,headcount:22,children:[{id:`eng-platform-core`,name:`Core Services`,title:`Manager`,team:`Platform`,headcount:12,children:[{id:`eng-platform-core-api`,name:`API Gateway`,title:`Tech Lead`,team:`Core Services`,headcount:5},{id:`eng-platform-core-data`,name:`Data Pipeline`,title:`Tech Lead`,team:`Core Services`,headcount:7}]},{id:`eng-platform-infra`,name:`Infrastructure`,title:`Manager`,team:`Platform`,headcount:10}]},{id:`eng-product`,name:`Product Engineering`,title:`Director`,team:`Engineering`,headcount:26,children:[{id:`eng-product-web`,name:`Web`,title:`Manager`,team:`Product Engineering`,headcount:14},{id:`eng-product-mobile`,name:`Mobile`,title:`Manager`,team:`Product Engineering`,headcount:12}]}]},{id:`design`,name:`Design`,title:`VP Design`,team:`Design`,headcount:11,children:[{id:`design-systems`,name:`Design Systems`,title:`Manager`,team:`Design`,headcount:4},{id:`design-research`,name:`Research`,title:`Manager`,team:`Design`,headcount:7}]},{id:`ops`,name:`Operations`,title:`VP Operations`,team:`Operations`,headcount:6}],U=[{key:`name`,header:`Group`,width:O(2)},{key:`title`,header:`Lead`,width:O(1)},{key:`team`,header:`Parent team`,width:O(1)},{key:`headcount`,header:`Headcount`,width:ne(110),align:`end`}],Se=U.map(e=>e.key===`name`||e.key===`headcount`?{...e,sortable:!0,sortKey:e.key}:e),Ce={title:`Core/TableTree`,tags:[`autodocs`]},W={render:()=>{let{visibleData:e,treeConfig:t}=R({data:H,idKey:`id`,defaultExpandedIds:[`eng`]}),n=A({...t,getRowLabel:e=>e.name});return(0,V.jsx)(D,{data:e,columns:U,idKey:`id`,hasHover:!0,plugins:{tree:n}})}},G={render:()=>{let{visibleData:e,treeConfig:t}=R({data:H,idKey:`id`,defaultExpandedIds:[`eng`]}),n=A({...t,hasExpandAllControl:!0});return(0,V.jsx)(D,{data:e,columns:U,idKey:`id`,density:`compact`,plugins:{tree:n}})}},K={render:()=>{let{visibleData:e,treeConfig:t,expandAll:n,collapseAll:r}=R({data:H,idKey:`id`,defaultExpandedIds:[`eng`,`eng-platform`,`eng-platform-core`]}),i=A(t);return(0,V.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:12},children:[(0,V.jsxs)(`div`,{style:{display:`flex`,gap:8},children:[(0,V.jsx)(`button`,{type:`button`,onClick:n,children:`Expand all`}),(0,V.jsx)(`button`,{type:`button`,onClick:r,children:`Collapse all`})]}),(0,V.jsx)(D,{data:e,columns:U,idKey:`id`,hasHover:!0,plugins:{tree:i}})]})}},q={render:()=>{let{visibleData:e,treeConfig:t}=R({data:H,idKey:`id`,defaultExpandedIds:[`eng`]}),n=A({...t,hasExpandAllControl:!0});return(0,V.jsx)(D,{data:e,columns:U,idKey:`id`,hasHover:!0,plugins:{tree:n}})}},J={render:()=>{let{visibleData:e,treeConfig:t}=R({data:H,idKey:`id`,defaultExpandedIds:[`eng`]}),n=A({...t,hasRowClickExpansion:!0});return(0,V.jsx)(D,{data:e,columns:U,idKey:`id`,hasHover:!0,plugins:{tree:n}})}},Y={render:()=>(0,V.jsx)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:32},children:[`sm`,`md`,`lg`].map(e=>(0,V.jsx)(xe,{indent:e},e))})},X={render:()=>{let[e,t]=(0,B.useState)(()=>new Set([`design-systems`])),{visibleData:n,treeConfig:r}=R({data:H,idKey:`id`,defaultExpandedIds:[`eng`,`design`]}),{selectionConfig:i}=ae({data:n,idKey:`id`,selectedKeys:e,setSelectedKeys:t}),a=A(r),o=ie(i);return(0,V.jsx)(D,{data:n,columns:U,idKey:`id`,hasHover:!0,plugins:{tree:a,selection:o}})}},Z={render:()=>{let{sortConfig:e,applySort:t}=te({data:H,defaultSort:[{sortKey:`headcount`,direction:`descending`}]}),{visibleData:n,treeConfig:r}=R({data:H,idKey:`id`,defaultExpandedIds:[`eng`,`eng-platform`],sortSiblings:t}),i=A(r),a=ce(e);return(0,V.jsx)(D,{data:n,columns:Se,idKey:`id`,hasHover:!0,plugins:{sort:a,tree:i}})}},Q={render:()=>{let[e,t]=(0,B.useState)([{id:`remote`,name:`Remote team`,title:`Director`,team:`—`,headcount:9}]),[n,r]=(0,B.useState)(()=>new Set),{visibleData:i,treeConfig:a}=R({data:e,idKey:`id`,isItemExpandable:e=>e.id===`remote`,onExpandedIdsChange:n=>{n.has(`remote`)&&!e[0].children&&(r(new Set([`remote`])),window.setTimeout(()=>{t([{...e[0],children:[{id:`remote-emea`,name:`EMEA`,title:`Manager`,team:`Remote team`,headcount:5},{id:`remote-apac`,name:`APAC`,title:`Manager`,team:`Remote team`,headcount:4}]}]),r(new Set)},600))}}),o=A(a);return(0,V.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:8},children:[(0,V.jsx)(D,{data:i,columns:U,idKey:`id`,hasHover:!0,plugins:{tree:o}}),n.size>0&&(0,V.jsx)(`p`,{children:`Loading children…`})]})}},$={render:()=>{let{visibleData:e,treeConfig:t}=R({data:[{id:`a`,name:`Engineering`,title:`VP Engineering`,team:`—`,headcount:48},{id:`b`,name:`Design`,title:`VP Design`,team:`—`,headcount:11},{id:`c`,name:`Operations`,title:`VP Operations`,team:`—`,headcount:6}],idKey:`id`}),n=A(t);return(0,V.jsx)(D,{data:e,columns:U,idKey:`id`,hasHover:!0,plugins:{tree:n}})}},W.parameters={...W.parameters,docs:{...W.parameters?.docs,source:{originalSource:`{
  render: () => {
    const {
      visibleData,
      treeConfig
    } = useTableTreeState<OrgRow>({
      data: orgChart,
      idKey: 'id',
      defaultExpandedIds: ['eng']
    });
    const tree = useTableTreeData({
      ...treeConfig,
      getRowLabel: item => item.name
    });
    return <Table data={visibleData} columns={columns} idKey="id" hasHover plugins={{
      tree
    }} />;
  }
}`,...W.parameters?.docs?.source},description:{story:"Hierarchical records rendered as a table. `useTableTreeState` flattens the\nnested data into the visible rows and owns the expanded set;\n`useTableTreeData` draws the indent + expander in the first column.\n`getRowLabel` gives each expander a row-specific accessible name.\n\nCollapsed branches are unmounted, not hidden — the `<tbody>` holds exactly\nthe visible rows.",...W.parameters?.docs?.description}}},G.parameters={...G.parameters,docs:{...G.parameters?.docs,source:{originalSource:`{
  render: () => {
    const {
      visibleData,
      treeConfig
    } = useTableTreeState<OrgRow>({
      data: orgChart,
      idKey: 'id',
      defaultExpandedIds: ['eng']
    });
    const tree = useTableTreeData({
      ...treeConfig,
      hasExpandAllControl: true
    });
    return <Table data={visibleData} columns={columns} idKey="id" density="compact" plugins={{
      tree
    }} />;
  }
}`,...G.parameters?.docs?.source},description:{story:`The tree at \`density="compact"\`, whose rows are shorter than the toggle's
ring would be outside it; the toggles' keyboard ring sits inside them.`,...G.parameters?.docs?.description}}},K.parameters={...K.parameters,docs:{...K.parameters?.docs,source:{originalSource:`{
  render: () => {
    const {
      visibleData,
      treeConfig,
      expandAll,
      collapseAll
    } = useTableTreeState<OrgRow>({
      data: orgChart,
      idKey: 'id',
      defaultExpandedIds: ['eng', 'eng-platform', 'eng-platform-core']
    });
    const tree = useTableTreeData(treeConfig);
    return <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 12
    }}>
        <div style={{
        display: 'flex',
        gap: 8
      }}>
          <button type="button" onClick={expandAll}>
            Expand all
          </button>
          <button type="button" onClick={collapseAll}>
            Collapse all
          </button>
        </div>
        <Table data={visibleData} columns={columns} idKey="id" hasHover plugins={{
        tree
      }} />
      </div>;
  }
}`,...K.parameters?.docs?.source},description:{story:"`expandAll` / `collapseAll` from the state hook, driving a deep hierarchy.\nIndentation is `calc(level * token)` — there is no depth cap.",...K.parameters?.docs?.description}}},q.parameters={...q.parameters,docs:{...q.parameters?.docs,source:{originalSource:`{
  render: () => {
    const {
      visibleData,
      treeConfig
    } = useTableTreeState<OrgRow>({
      data: orgChart,
      idKey: 'id',
      defaultExpandedIds: ['eng']
    });
    const tree = useTableTreeData({
      ...treeConfig,
      hasExpandAllControl: true
    });
    return <Table data={visibleData} columns={columns} idKey="id" hasHover plugins={{
      tree
    }} />;
  }
}`,...q.parameters?.docs?.source},description:{story:"`hasExpandAllControl` renders a built-in expand-all/collapse-all toggle in\nthe tree column header, wired to the state hook. No external buttons needed:\nthe toggle reads the aggregate `isAllExpanded` state (down chevron only when\nevery expandable row is expanded) and calls `expandAll`/`collapseAll`.",...q.parameters?.docs?.description}}},J.parameters={...J.parameters,docs:{...J.parameters?.docs,source:{originalSource:`{
  render: () => {
    const {
      visibleData,
      treeConfig
    } = useTableTreeState<OrgRow>({
      data: orgChart,
      idKey: 'id',
      defaultExpandedIds: ['eng']
    });
    const tree = useTableTreeData({
      ...treeConfig,
      hasRowClickExpansion: true
    });
    return <Table data={visibleData} columns={columns} idKey="id" hasHover plugins={{
      tree
    }} />;
  }
}`,...J.parameters?.docs?.source},description:{story:`\`hasRowClickExpansion\` lets a click anywhere on an expandable row toggle it,
in addition to the chevron. Leaf rows stay inert, and the chevron still works
on its own (it stops propagation, so a chevron click never double-toggles).`,...J.parameters?.docs?.description}}},Y.parameters={...Y.parameters,docs:{...Y.parameters?.docs,source:{originalSource:`{
  render: () => {
    const indents = ['sm', 'md', 'lg'] as const;
    return <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 32
    }}>
        {indents.map(indent => <IndentExample key={indent} indent={indent} />)}
      </div>;
  }
}`,...Y.parameters?.docs?.source},description:{story:"The `indent` token controls the step per level: `sm` (spacing-3), `md`\n(spacing-4, the default), and `lg` (spacing-6).",...Y.parameters?.docs?.description}}},X.parameters={...X.parameters,docs:{...X.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [selectedKeys, setSelectedKeys] = useState<Set<string>>(() => new Set(['design-systems']));
    const {
      visibleData,
      treeConfig
    } = useTableTreeState<OrgRow>({
      data: orgChart,
      idKey: 'id',
      defaultExpandedIds: ['eng', 'design']
    });
    const {
      selectionConfig
    } = useTableSelectionState<OrgRow>({
      data: visibleData,
      idKey: 'id',
      selectedKeys,
      setSelectedKeys
    });
    const tree = useTableTreeData(treeConfig);
    const selection = useTableSelection(selectionConfig);
    return <Table data={visibleData} columns={columns} idKey="id" hasHover plugins={{
      tree,
      selection
    }} />;
  }
}`,...X.parameters?.docs?.source},description:{story:"Composed with selection. The canonical plugin order puts `tree` before\n`selection`, so the checkbox column lands to the left of the indented\ntree column, and selection operates on the visible (flattened) rows.",...X.parameters?.docs?.description}}},Z.parameters={...Z.parameters,docs:{...Z.parameters?.docs,source:{originalSource:`{
  render: () => {
    const {
      sortConfig,
      applySort
    } = useTableSortableState<OrgRow>({
      data: orgChart,
      defaultSort: [{
        sortKey: 'headcount',
        direction: 'descending'
      }]
    });
    const {
      visibleData,
      treeConfig
    } = useTableTreeState<OrgRow>({
      data: orgChart,
      idKey: 'id',
      defaultExpandedIds: ['eng', 'eng-platform'],
      sortSiblings: applySort
    });
    const tree = useTableTreeData(treeConfig);
    // T can't be inferred from the sort config (it only carries the sort key).
    const sort = useTableSortable<OrgRow>(sortConfig);
    return <Table data={visibleData} columns={sortableColumns} idKey="id" hasHover plugins={{
      sort,
      tree
    }} />;
  }
}`,...Z.parameters?.docs?.source},description:{story:"Composed with sorting. `applySort` is passed as `sortSiblings`, so each\nsibling group sorts independently — children always stay directly under\ntheir parent and levels never interleave. Sort by Group or Headcount.",...Z.parameters?.docs?.description}}},Q.parameters={...Q.parameters,docs:{...Q.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [data, setData] = useState<OrgRow[]>([{
      id: 'remote',
      name: 'Remote team',
      title: 'Director',
      team: '—',
      headcount: 9
    }]);
    const [loadingIds, setLoadingIds] = useState<Set<string>>(() => new Set());
    const {
      visibleData,
      treeConfig
    } = useTableTreeState<OrgRow>({
      data,
      idKey: 'id',
      // Expandable before children exist.
      isItemExpandable: item => item.id === 'remote',
      onExpandedIdsChange: ids => {
        if (!ids.has('remote') || data[0].children) {
          return;
        }
        setLoadingIds(new Set(['remote']));
        window.setTimeout(() => {
          setData([{
            ...data[0],
            children: [{
              id: 'remote-emea',
              name: 'EMEA',
              title: 'Manager',
              team: 'Remote team',
              headcount: 5
            }, {
              id: 'remote-apac',
              name: 'APAC',
              title: 'Manager',
              team: 'Remote team',
              headcount: 4
            }]
          }]);
          setLoadingIds(new Set());
        }, 600);
      }
    });
    const tree = useTableTreeData(treeConfig);
    return <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 8
    }}>
        <Table data={visibleData} columns={columns} idKey="id" hasHover plugins={{
        tree
      }} />
        {loadingIds.size > 0 && <p>Loading children…</p>}
      </div>;
  }
}`,...Q.parameters?.docs?.source},description:{story:"Lazy loading. `isItemExpandable` shows an expander before the children\nexist; `onExpandedIdsChange` triggers the fetch, and the rows appear when\nthe data arrives.",...Q.parameters?.docs?.description}}},$.parameters={...$.parameters,docs:{...$.parameters?.docs,source:{originalSource:`{
  render: () => {
    const flat: OrgRow[] = [{
      id: 'a',
      name: 'Engineering',
      title: 'VP Engineering',
      team: '—',
      headcount: 48
    }, {
      id: 'b',
      name: 'Design',
      title: 'VP Design',
      team: '—',
      headcount: 11
    }, {
      id: 'c',
      name: 'Operations',
      title: 'VP Operations',
      team: '—',
      headcount: 6
    }];
    const {
      visibleData,
      treeConfig
    } = useTableTreeState<OrgRow>({
      data: flat,
      idKey: 'id'
    });
    const tree = useTableTreeData(treeConfig);
    return <Table data={visibleData} columns={columns} idKey="id" hasHover plugins={{
      tree
    }} />;
  }
}`,...$.parameters?.docs?.source},description:{story:`Migration case: the same plugin on flat data (no \`children\` anywhere) is a
no-op — no expanders, no indent spacers, no tree ARIA. Adopting the plugin
before the data becomes hierarchical changes nothing.`,...$.parameters?.docs?.description}}},we=[`Default`,`CompactDensity`,`ExpandAndCollapseAll`,`HeaderExpandAllControl`,`RowClickExpansion`,`IndentSizes`,`WithSelection`,`WithSiblingSorting`,`LazyLoadedChildren`,`FlatDataIsANoOp`]})))()}Te();export{G as CompactDensity,W as Default,K as ExpandAndCollapseAll,$ as FlatDataIsANoOp,q as HeaderExpandAllControl,Y as IndentSizes,Q as LazyLoadedChildren,J as RowClickExpansion,X as WithSelection,Z as WithSiblingSorting,we as __namedExportsOrder,Ce as default};