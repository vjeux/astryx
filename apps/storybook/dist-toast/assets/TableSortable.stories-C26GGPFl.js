import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{t}from"./react-DlPsW1c0.js";import{t as n}from"./jsx-runtime-MKhVqBIO.js";import{o as r,s as i}from"./useTheme-CUotWZgR.js";import{i as a,n as o,r as s,t as c}from"./useTableSortableState-CUk7B1c_.js";import{n as l,t as u}from"./Table-DReqd1jV.js";import{i as d,n as f,r as p,t as m}from"./useTableSelectionState-CtGJQOHC.js";import{n as h,t as g}from"./useTableSortable-DuiSzyVx.js";import{c as _,o as v}from"./iframe-B7UFaprG.js";var y,b,x,S,C,w,T,E,D,O,k,A,j,M,N;function P(){return(P=e((()=>{y=t(),l(),g(),c(),p(),m(),s(),i(),_(),b=n(),x=[{id:`1`,name:`Alice`,email:`alice@example.com`,role:`Engineer`,age:32,isLocked:!1},{id:`2`,name:`Bob`,email:`bob@example.com`,role:`Designer`,age:28,isLocked:!1},{id:`3`,name:`Charlie`,email:`charlie@example.com`,role:`Manager`,age:45,isLocked:!1},{id:`4`,name:`Diana`,email:`diana@example.com`,role:`Engineer`,age:37,isLocked:!0},{id:`5`,name:`Eve`,email:`eve@example.com`,role:`Admin`,age:29,isLocked:!1}],S=[{key:`name`,header:`Name`,sortable:!0},{key:`email`,header:`Email`,sortable:!0},{key:`role`,header:`Role`,sortable:!0},{key:`age`,header:`Age`,sortable:!0}],C={title:`Core/TableSortable`,tags:[`autodocs`]},w={render:()=>{let{sortedData:e,sort:t,sortConfig:n}=o({data:x,defaultSort:[{sortKey:`name`,direction:`ascending`}]}),r=h(n);return(0,b.jsxs)(`div`,{style:{maxWidth:700},children:[(0,b.jsxs)(`p`,{style:{marginBottom:8,fontSize:14,color:`var(--color-text-secondary)`},children:[`Click a column header to sort. Current:`,` `,t.length>0?`${t[0].sortKey} ${t[0].direction}`:`none`]}),(0,b.jsx)(u,{data:e,columns:S,idKey:`id`,plugins:{sortable:r}})]})}},T={render:()=>{let{sortedData:e,sort:t,sortConfig:n}=o({data:x,defaultSort:[{sortKey:`role`,direction:`ascending`}],isMultiSortEnabled:!0}),r=h(n);return(0,b.jsxs)(`div`,{style:{maxWidth:700},children:[(0,b.jsxs)(`p`,{style:{marginBottom:8,fontSize:14,color:`var(--color-text-secondary)`},children:[`Shift+click column headers to add secondary sorts. Active sorts:`,` `,t.map(e=>`${e.sortKey} (${e.direction})`).join(`, `)||`none`]}),(0,b.jsx)(u,{data:e,columns:S,idKey:`id`,plugins:{sortable:r}})]})}},E={render:()=>{let e=a(),t=[{key:`name`,header:`Name`,sortable:!0},{key:`email`,header:`Email`,sortable:{sortKey:`emailSort`}},{key:`role`,header:`Role`,sortable:!0},{key:`age`,header:`Age`,sortable:{sortKey:`yearsOld`}}],{sortedData:n,sort:r,sortConfig:i}=o({data:x,defaultSort:[{sortKey:`yearsOld`,direction:`ascending`}],comparators:{yearsOld:(e,t)=>e.age-t.age,emailSort:(t,n)=>e.compare(t.email,n.email)}}),s=h(i);return(0,b.jsxs)(`div`,{style:{maxWidth:700},children:[(0,b.jsxs)(`p`,{style:{marginBottom:8,fontSize:14,color:`var(--color-text-secondary)`},children:[`Age column uses sortKey "yearsOld", Email uses "emailSort". Current:`,` `,r.length>0?`${r[0].sortKey} ${r[0].direction}`:`none`]}),(0,b.jsx)(u,{data:n,columns:t,idKey:`id`,plugins:{sortable:s}})]})}},D={render:()=>{let{sortedData:e,sort:t,sortConfig:n}=o({data:x,allowUnsortedState:!0}),r=h(n);return(0,b.jsxs)(`div`,{style:{maxWidth:700},children:[(0,b.jsxs)(`p`,{style:{marginBottom:8,fontSize:14,color:`var(--color-text-secondary)`},children:[`Cycles: ascending → descending → unsorted. Current:`,` `,t.length>0?`${t[0].sortKey} ${t[0].direction}`:`unsorted`]}),(0,b.jsx)(u,{data:e,columns:S,idKey:`id`,plugins:{sortable:r}})]})}},O={render:()=>{let[e,t]=(0,y.useState)(new Set),{sortedData:n,sort:r,sortConfig:i}=o({data:x,defaultSort:[{sortKey:`name`,direction:`ascending`}]}),a=h(i),{selectionConfig:s}=f({data:n,idKey:`id`,selectedKeys:e,setSelectedKeys:t}),c=d(s);return(0,b.jsxs)(`div`,{style:{maxWidth:700},children:[(0,b.jsxs)(`p`,{style:{marginBottom:8,fontSize:14,color:`var(--color-text-secondary)`},children:[`Sorting + Selection composed together. Selected: `,e.size,` `,`of `,x.length,`. Sort:`,` `,r.length>0?`${r[0].sortKey} ${r[0].direction}`:`none`]}),(0,b.jsx)(u,{data:n,columns:S,idKey:`id`,plugins:{sortable:a,selection:c}})]})}},k={render:()=>{let[e,t]=(0,y.useState)([{sortKey:`age`,direction:`descending`}]),{sortedData:n,sortConfig:r}=o({data:x,sort:e,onSortChange:t}),i=h(r);return(0,b.jsxs)(`div`,{style:{maxWidth:700},children:[(0,b.jsxs)(`p`,{style:{marginBottom:8,fontSize:14,color:`var(--color-text-secondary)`},children:[`Controlled mode — external state. Current:`,` `,e.length>0?`${e[0].sortKey} ${e[0].direction}`:`none`]}),(0,b.jsxs)(`div`,{style:{display:`flex`,gap:8,marginBottom:8},children:[(0,b.jsx)(`button`,{onClick:()=>t([{sortKey:`name`,direction:`ascending`}]),children:`Sort by Name ↑`}),(0,b.jsx)(`button`,{onClick:()=>t([{sortKey:`age`,direction:`descending`}]),children:`Sort by Age ↓`}),(0,b.jsx)(`button`,{onClick:()=>t([]),children:`Clear Sort`})]}),(0,b.jsx)(u,{data:n,columns:S,idKey:`id`,plugins:{sortable:i}})]})}},A=r({name:`story-large-sort-indicator`,componentIcons:{"table-sort-indicator":{size:`lg`}}}),j=r({name:`story-hidden-sort-indicator`,componentIcons:{"table-sort-indicator":null}}),M={render:()=>{let e=h({sort:[{sortKey:`name`,direction:`ascending`}],onSortChange:()=>{}});return(0,b.jsxs)(`div`,{style:{display:`grid`,gap:24},children:[(0,b.jsx)(`div`,{"data-testid":`default-indicator`,children:(0,b.jsx)(u,{data:x,columns:S,plugins:{sort:e}})}),(0,b.jsx)(v,{theme:A,children:(0,b.jsx)(`div`,{"data-testid":`large-indicator`,children:(0,b.jsx)(u,{data:x,columns:S,plugins:{sort:e}})})}),(0,b.jsx)(v,{theme:j,children:(0,b.jsx)(`div`,{"data-testid":`hidden-indicator`,children:(0,b.jsx)(u,{data:x,columns:S,plugins:{sort:e}})})})]})}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  render: () => {
    const {
      sortedData,
      sort,
      sortConfig
    } = useTableSortableState<Employee>({
      data: employees,
      defaultSort: [{
        sortKey: 'name',
        direction: 'ascending'
      }]
    });
    const sortablePlugin = useTableSortable<Employee>(sortConfig);
    return <div style={{
      maxWidth: 700
    }}>
        <p style={{
        marginBottom: 8,
        fontSize: 14,
        color: 'var(--color-text-secondary)'
      }}>
          Click a column header to sort. Current:{' '}
          {sort.length > 0 ? \`\${sort[0].sortKey} \${sort[0].direction}\` : 'none'}
        </p>
        <Table data={sortedData} columns={columns} idKey="id" plugins={{
        sortable: sortablePlugin
      }} />
      </div>;
  }
}`,...w.parameters?.docs?.source}}},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  render: () => {
    const {
      sortedData,
      sort,
      sortConfig
    } = useTableSortableState<Employee>({
      data: employees,
      defaultSort: [{
        sortKey: 'role',
        direction: 'ascending'
      }],
      isMultiSortEnabled: true
    });
    const sortablePlugin = useTableSortable<Employee>(sortConfig);
    return <div style={{
      maxWidth: 700
    }}>
        <p style={{
        marginBottom: 8,
        fontSize: 14,
        color: 'var(--color-text-secondary)'
      }}>
          Shift+click column headers to add secondary sorts. Active sorts:{' '}
          {sort.map(s => \`\${s.sortKey} (\${s.direction})\`).join(', ') || 'none'}
        </p>
        <Table data={sortedData} columns={columns} idKey="id" plugins={{
        sortable: sortablePlugin
      }} />
      </div>;
  }
}`,...T.parameters?.docs?.source}}},E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  render: () => {
    const collator = useCollator();
    const customColumns: TableColumn<Employee>[] = [{
      key: 'name',
      header: 'Name',
      sortable: true
    }, {
      key: 'email',
      header: 'Email',
      sortable: {
        sortKey: 'emailSort'
      }
    }, {
      key: 'role',
      header: 'Role',
      sortable: true
    }, {
      key: 'age',
      header: 'Age',
      sortable: {
        sortKey: 'yearsOld'
      }
    }];
    const {
      sortedData,
      sort,
      sortConfig
    } = useTableSortableState<Employee>({
      data: employees,
      defaultSort: [{
        sortKey: 'yearsOld',
        direction: 'ascending'
      }],
      comparators: {
        yearsOld: (a, b) => a.age - b.age,
        emailSort: (a, b) => collator.compare(a.email, b.email)
      }
    });
    const sortablePlugin = useTableSortable<Employee>(sortConfig);
    return <div style={{
      maxWidth: 700
    }}>
        <p style={{
        marginBottom: 8,
        fontSize: 14,
        color: 'var(--color-text-secondary)'
      }}>
          Age column uses sortKey &quot;yearsOld&quot;, Email uses
          &quot;emailSort&quot;. Current:{' '}
          {sort.length > 0 ? \`\${sort[0].sortKey} \${sort[0].direction}\` : 'none'}
        </p>
        <Table data={sortedData} columns={customColumns} idKey="id" plugins={{
        sortable: sortablePlugin
      }} />
      </div>;
  }
}`,...E.parameters?.docs?.source}}},D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
  render: () => {
    const {
      sortedData,
      sort,
      sortConfig
    } = useTableSortableState<Employee>({
      data: employees,
      allowUnsortedState: true
    });
    const sortablePlugin = useTableSortable<Employee>(sortConfig);
    return <div style={{
      maxWidth: 700
    }}>
        <p style={{
        marginBottom: 8,
        fontSize: 14,
        color: 'var(--color-text-secondary)'
      }}>
          Cycles: ascending → descending → unsorted. Current:{' '}
          {sort.length > 0 ? \`\${sort[0].sortKey} \${sort[0].direction}\` : 'unsorted'}
        </p>
        <Table data={sortedData} columns={columns} idKey="id" plugins={{
        sortable: sortablePlugin
      }} />
      </div>;
  }
}`,...D.parameters?.docs?.source}}},O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [selectedKeys, setSelectedKeys] = useState<Set<string>>(new Set());
    const {
      sortedData,
      sort,
      sortConfig
    } = useTableSortableState<Employee>({
      data: employees,
      defaultSort: [{
        sortKey: 'name',
        direction: 'ascending'
      }]
    });
    const sortablePlugin = useTableSortable<Employee>(sortConfig);
    const {
      selectionConfig
    } = useTableSelectionState<Employee>({
      data: sortedData,
      idKey: 'id',
      selectedKeys,
      setSelectedKeys
    });
    const selectionPlugin = useTableSelection<Employee>(selectionConfig);
    return <div style={{
      maxWidth: 700
    }}>
        <p style={{
        marginBottom: 8,
        fontSize: 14,
        color: 'var(--color-text-secondary)'
      }}>
          Sorting + Selection composed together. Selected: {selectedKeys.size}{' '}
          of {employees.length}. Sort:{' '}
          {sort.length > 0 ? \`\${sort[0].sortKey} \${sort[0].direction}\` : 'none'}
        </p>
        <Table data={sortedData} columns={columns} idKey="id" plugins={{
        sortable: sortablePlugin,
        selection: selectionPlugin
      }} />
      </div>;
  }
}`,...O.parameters?.docs?.source}}},k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [sort, setSort] = useState<TableSortState>([{
      sortKey: 'age',
      direction: 'descending'
    }]);
    const {
      sortedData,
      sortConfig
    } = useTableSortableState<Employee>({
      data: employees,
      sort,
      onSortChange: setSort
    });
    const sortablePlugin = useTableSortable<Employee>(sortConfig);
    return <div style={{
      maxWidth: 700
    }}>
        <p style={{
        marginBottom: 8,
        fontSize: 14,
        color: 'var(--color-text-secondary)'
      }}>
          Controlled mode — external state. Current:{' '}
          {sort.length > 0 ? \`\${sort[0].sortKey} \${sort[0].direction}\` : 'none'}
        </p>
        <div style={{
        display: 'flex',
        gap: 8,
        marginBottom: 8
      }}>
          <button onClick={() => setSort([{
          sortKey: 'name',
          direction: 'ascending'
        }])}>
            Sort by Name ↑
          </button>
          <button onClick={() => setSort([{
          sortKey: 'age',
          direction: 'descending'
        }])}>
            Sort by Age ↓
          </button>
          <button onClick={() => setSort([])}>Clear Sort</button>
        </div>
        <Table data={sortedData} columns={columns} idKey="id" plugins={{
        sortable: sortablePlugin
      }} />
      </div>;
  }
}`,...k.parameters?.docs?.source}}},M.parameters={...M.parameters,docs:{...M.parameters?.docs,source:{originalSource:`{
  render: () => {
    const sort: TableSortState = [{
      sortKey: 'name',
      direction: 'ascending'
    }];
    const sortPlugin = useTableSortable<Employee>({
      sort,
      onSortChange: () => {}
    });
    return <div style={{
      display: 'grid',
      gap: 24
    }}>
        <div data-testid="default-indicator">
          <Table data={employees} columns={columns} plugins={{
          sort: sortPlugin
        }} />
        </div>
        <Theme theme={largeIndicatorTheme}>
          <div data-testid="large-indicator">
            <Table data={employees} columns={columns} plugins={{
            sort: sortPlugin
          }} />
          </div>
        </Theme>
        <Theme theme={hiddenIndicatorTheme}>
          <div data-testid="hidden-indicator">
            <Table data={employees} columns={columns} plugins={{
            sort: sortPlugin
          }} />
          </div>
        </Theme>
      </div>;
  }
}`,...M.parameters?.docs?.source},description:{story:`The same sorted table with the default indicator, with a theme that asks
the \`table-sort-indicator\` slot for a large glyph, and with a theme that
hides it. The large glyph grows while the Sort control and the header row
keep their height; the hidden glyph leaves no gap beside the label.`,...M.parameters?.docs?.description}}},N=[`SingleSort`,`MultiSort`,`CustomSortKey`,`AllowUnsortedState`,`WithSelection`,`Controlled`,`IndicatorSlotSize`]})))()}P();export{D as AllowUnsortedState,k as Controlled,E as CustomSortKey,M as IndicatorSlotSize,T as MultiSort,w as SingleSort,O as WithSelection,N as __namedExportsOrder,C as default};