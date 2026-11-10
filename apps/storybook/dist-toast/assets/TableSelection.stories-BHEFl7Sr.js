import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{t}from"./react-DlPsW1c0.js";import{t as n}from"./jsx-runtime-MKhVqBIO.js";import{o as r}from"./InternationalizationContext-C5wQA9mp.js";import{n as i,t as a}from"./useComponentTranslator-Dzvlp8mx.js";import{n as o,t as s}from"./Button-DoGM0DEN.js";import{n as c,t as l}from"./Table-DReqd1jV.js";import{n as u,t as d}from"./ScrollableArea-oHV1-XbU.js";import{n as f,t as p}from"./Toolbar-BjzQwWLc.js";import{i as m,n as h,r as g,t as ee}from"./useTableSelectionState-CtGJQOHC.js";import{n as te,t as _}from"./Pagination-C1lKQ3lX.js";var v;function y(){return(y=e((()=>{v={"@astryx.table.selection.bulkActionsLabel":`Bulk actions`,"@astryx.table.selection.clearAll":`Unselect All`,"@astryx.table.selection.selectedCount":`{count, number} selected`}})))()}function b({selection:e,label:t,renderSelectionLabel:n,clearLabel:r,size:a=`sm`,variant:o=`muted`,...c}){let l=i(),u=t??l(`@astryx.table.selection.bulkActionsLabel`),d=r??l(`@astryx.table.selection.clearAll`);if(!e.hasSelection)return null;let f=n==null?l(`@astryx.table.selection.selectedCount`,{count:e.selectedCount}):n(e.selectedCount);return(0,x.jsx)(p,{...c,label:u,size:a,variant:o,endContent:(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)(`span`,{children:f}),(0,x.jsx)(s,{label:d,variant:`ghost`,onClick:e.clearSelection})]})})}var x;function S(){return(S=e((()=>{o(),f(),a(),y(),x=n(),r(v),b.displayName=`TableSelectionToolbar`,b.__docgenInfo={description:`Selection-aware action surface that remains outside the Table plugin.

The caller owns action content and placement. This component owns only the
shared Toolbar presentation, selected count, and complete clear command.`,methods:[],displayName:`TableSelectionToolbar`,props:{selection:{required:!0,tsType:{name:`TableSelectionState`},description:`Shared state returned by useTableSelectionState.`},label:{required:!1,tsType:{name:`string`},description:`Accessible name for the toolbar. @default 'Bulk actions'`},renderSelectionLabel:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(selectedCount: number) => ReactNode`,signature:{arguments:[{type:{name:`number`},name:`selectedCount`}],return:{name:`ReactNode`}}},description:`Override the visible selected-count content.`},clearLabel:{required:!1,tsType:{name:`string`},description:`Visible label for the command that clears the complete selection. @default 'Unselect All'`},size:{defaultValue:{value:`'sm'`,computed:!1},required:!1},variant:{defaultValue:{value:`'muted'`,computed:!1},required:!1}},composes:[`Omit`]}})))()}function C({layout:e,selection:t}){return(0,O.jsx)(b,{selection:t,"data-layout":e,xstyle:e===`floating`?W.floatingToolbar:void 0,startContent:e===`floating`?(0,O.jsx)(s,{label:`Approve`,variant:`ghost`,onClick:()=>{}}):(0,O.jsxs)(O.Fragment,{children:[(0,O.jsx)(s,{label:`Export`,variant:`ghost`,onClick:()=>{}}),(0,O.jsx)(s,{label:`Delete`,variant:`ghost`,onClick:t.clearSelection})]})})}function w({layout:e}){let t=e===`floating`?U:N,[n,r]=(0,D.useState)(new Set),{selectionConfig:i,selectionState:a}=h({data:t,idKey:`id`,selectedKeys:n,setSelectedKeys:r}),o=m(i),s=(0,O.jsxs)(O.Fragment,{children:[e===`floating`?(0,O.jsx)(`div`,{className:`xrvj5dj x185a7wo xjcht0a x4d5cxa`,children:[[`Active users`,`12,840`],[`Selection rate`,`18.4%`],[`Pending reviews`,`247`]].map(([e,t])=>(0,O.jsxs)(`div`,{className:`x1shk3sm x1hviunn xwmxj5m`,children:[(0,O.jsx)(`span`,{className:`x1lliihq xv1l7n4`,children:e}),(0,O.jsx)(`strong`,{className:`x1lliihq xcsaf9d x1tgivj0`,children:t})]},e))}):null,(0,O.jsxs)(`div`,{"data-table-region":e,...{0:{className:`x1n2onr6`},1:{className:`x1n2onr6 x1hpo1yp xzdgnf2`}}[e===`floating`|0],children:[(0,O.jsx)(C,{layout:e,selection:a}),(0,O.jsx)(l,{data:t,columns:P,idKey:`id`,hasHover:!0,plugins:{selection:o}})]})]});return e===`floating`?(0,O.jsx)(`div`,{className:`xrlsmeg xvueqy4`,children:(0,O.jsx)(d,{axis:`block`,label:`Bulk actions example`,overscroll:`contain`,xstyle:W.scrollContainer,children:s})}):(0,O.jsx)(`div`,{className:`xrlsmeg xvueqy4`,children:s})}function T(e){let t=(e-1)*J,n=Math.min(J,q-t);return Array.from({length:n},(e,n)=>{let r=t+n+1;return{id:`record-${r}`,name:`Record ${r}`,email:`record${r}@example.com`,role:Y[r%Y.length],isLocked:!1}})}function E(){let[e,t]=(0,D.useState)(1),[n,r]=(0,D.useState)(X),i=T(e),a=e=>n.isAllMatching?!n.excluded.has(e.id):n.picked.has(e.id),o=i.every(a),c=n.isAllMatching?q-n.excluded.size:n.picked.size,u=(e,t)=>{r(n=>{let r=e.map(e=>e.id);if(n.isAllMatching){let e=new Set(n.excluded);for(let n of r)t?e.delete(n):e.add(n);return{...n,excluded:e}}let i=new Set(n.picked);for(let e of r)t?i.add(e):i.delete(e);return{...n,picked:i}})},d=m({getIsItemSelected:a,onSelectItem:({item:e,isSelected:t})=>u([e],t),onSelectAll:({isAllSelected:e})=>u(i,e),getIsAllSelected:()=>o,getIsIndeterminate:()=>!o&&i.some(a),getRowLabel:e=>e.name}),f={selectedKeys:new Set(i.filter(a).map(e=>e.id)),selectedCount:c,hasSelection:c>0,clearSelection:()=>r(X)};return(0,O.jsxs)(`div`,{className:`xrlsmeg xvueqy4`,children:[(0,O.jsx)(b,{selection:f,renderSelectionLabel:e=>n.isAllMatching?n.excluded.size===0?`All ${q} matching selected`:`${e} of ${q} matching selected`:`${e} selected`,startContent:(0,O.jsxs)(O.Fragment,{children:[(0,O.jsx)(s,{label:`Archive`,variant:`ghost`,onClick:()=>{}}),n.isAllMatching||o?(0,O.jsx)(s,{label:n.isAllMatching?`Select only this page`:`Select all ${q} matching`,variant:`ghost`,onClick:()=>r(n.isAllMatching?{isAllMatching:!1,picked:new Set(i.map(e=>e.id)),excluded:new Set}:{isAllMatching:!0,picked:new Set,excluded:new Set})}):null]})}),(0,O.jsx)(l,{data:i,columns:P,idKey:`id`,hasHover:!0,plugins:{selection:d}}),(0,O.jsx)(_,{page:e,onChange:t,totalItems:q,pageSize:J})]})}var D,O,k,A,j,M,N,P,F,I,L,R,z,B,V,H,U,W,G,K,q,J,Y,X,Z,Q;function $(){return($=e((()=>{D=t(),o(),te(),u(),c(),S(),g(),ee(),O=n(),{expect:k,userEvent:A,waitFor:j,within:M}=__STORYBOOK_MODULE_TEST__,N=[{id:`1`,name:`Alice`,email:`alice@example.com`,role:`Engineer`,isLocked:!1},{id:`2`,name:`Bob`,email:`bob@example.com`,role:`Designer`,isLocked:!1},{id:`3`,name:`Charlie`,email:`charlie@example.com`,role:`Manager`,isLocked:!1},{id:`4`,name:`Diana`,email:`diana@example.com`,role:`Engineer`,isLocked:!0},{id:`5`,name:`Eve`,email:`eve@example.com`,role:`Admin`,isLocked:!1}],P=[{key:`name`,header:`Name`},{key:`email`,header:`Email`},{key:`role`,header:`Role`}],F={title:`Core/TableSelection`,tags:[`autodocs`]},I={render:()=>{let[e,t]=(0,D.useState)(new Set),{selectionConfig:n}=h({data:N,idKey:`id`,selectedKeys:e,setSelectedKeys:t}),r=m(n);return(0,O.jsxs)(`div`,{style:{maxWidth:600},children:[(0,O.jsxs)(`p`,{style:{marginBottom:8,fontSize:14,color:`var(--color-text-secondary)`},children:[`Selected: `,e.size,` of `,N.length]}),(0,O.jsx)(l,{data:N,columns:P,idKey:`id`,plugins:{selection:r}})]})}},L={render:()=>{let[e,t]=(0,D.useState)(new Set([`1`,`3`])),{selectionConfig:n}=h({data:N,idKey:`id`,selectedKeys:e,setSelectedKeys:t}),r=m(n);return(0,O.jsxs)(`div`,{style:{maxWidth:600},children:[(0,O.jsxs)(`p`,{style:{marginBottom:8,fontSize:14,color:`var(--color-text-secondary)`},children:[`Selected: `,[...e].join(`, `)||`none`]}),(0,O.jsx)(l,{data:N,columns:P,idKey:`id`,plugins:{selection:r}})]})}},R={render:()=>{let[e,t]=(0,D.useState)(new Set),{selectionConfig:n}=h({data:N,idKey:`id`,selectedKeys:e,setSelectedKeys:t,getIsItemSelectable:e=>e.role!==`Admin`}),r=m(n);return(0,O.jsxs)(`div`,{style:{maxWidth:600},children:[(0,O.jsxs)(`p`,{style:{marginBottom:8,fontSize:14,color:`var(--color-text-secondary)`},children:[`Admin rows have no checkbox. Selected: `,e.size]}),(0,O.jsx)(l,{data:N,columns:P,idKey:`id`,plugins:{selection:r}})]})}},z={render:()=>{let[e,t]=(0,D.useState)(new Set),{selectionConfig:n}=h({data:N,idKey:`id`,selectedKeys:e,setSelectedKeys:t,getIsItemEnabled:e=>!e.isLocked}),r=m(n);return(0,O.jsxs)(`div`,{style:{maxWidth:600},children:[(0,O.jsxs)(`p`,{style:{marginBottom:8,fontSize:14,color:`var(--color-text-secondary)`},children:[`Locked rows (Diana) have a disabled checkbox. Select-all skips them. Selected: `,e.size]}),(0,O.jsx)(l,{data:N,columns:P,idKey:`id`,plugins:{selection:r}})]})}},B={render:()=>{let[e,t]=(0,D.useState)(new Set),{selectionConfig:n}=h({data:N,idKey:`id`,selectedKeys:e,setSelectedKeys:t}),r=m(n);return(0,O.jsx)(`div`,{style:{maxWidth:600},children:(0,O.jsx)(l,{data:N,columns:P,idKey:`id`,density:`compact`,plugins:{selection:r}})})}},V={render:()=>{let[e,t]=(0,D.useState)(new Set),{selectionConfig:n}=h({data:N,idKey:`id`,selectedKeys:e,setSelectedKeys:t}),r=m(n);return(0,O.jsx)(`div`,{style:{maxWidth:600},children:(0,O.jsx)(l,{data:N,columns:P,idKey:`id`,density:`spacious`,hasHover:!0,plugins:{selection:r}})})}},H={render:()=>{let[e,t]=(0,D.useState)(new Set),{selectionConfig:n}=h({data:N,idKey:`id`,selectedKeys:e,setSelectedKeys:t}),r=m(n);return(0,O.jsx)(`div`,{style:{maxWidth:600},children:(0,O.jsx)(l,{data:N,columns:P,idKey:`id`,isStriped:!0,plugins:{selection:r}})})}},U=Array.from({length:40},(e,t)=>{let n=N[t%N.length];return{...n,id:`long-${t+1}`,name:`${n.name} ${t+1}`}}),W={scrollContainer:{kskxy:`x159tps6`,kHBbk8:`xc8icb0`,kZ7BSC:`x185mbhu`,$$css:!0},floatingToolbar:{kVAEAm:`x7wzq59`,k87sOh:`x15ppc0s`,k3aq6I:`x1s0uh9m`,k1K539:`x1vv6yx0`,kY2c9j:`x1vjfegm`,kaIpWk:`xh6dtrn`,krdFHd:null,kfmiAY:null,kVL7Gh:null,kT0f0o:null,kIxVMA:null,ksF3WI:null,kqGeR4:null,kYm2EN:null,kGVxlE:`x14hfi27`,$$css:!0}},G={render:()=>(0,O.jsx)(w,{layout:`fixed`}),play:async({canvasElement:e})=>{let t=M(e);await A.click(t.getAllByLabelText(`Select row`)[0]);let n=t.getByRole(`toolbar`,{name:`Bulk actions`}),r=n.closest(`.astryx-section`);await k(n).toHaveAttribute(`data-layout`,`fixed`),await k(n).toHaveAttribute(`data-size`,`sm`),await k(r).toHaveAttribute(`data-variant`,`muted`),await k(n.closest(`[role="group"]`)).toBeNull(),await k(t.getByText(`1 selected`)).toBeInTheDocument(),await A.click(t.getByRole(`button`,{name:`Unselect All`})),await k(t.queryByRole(`toolbar`,{name:`Bulk actions`})).not.toBeInTheDocument(),await A.click(t.getAllByLabelText(`Select row`)[0])}},K={render:()=>(0,O.jsx)(w,{layout:`floating`}),play:async({canvasElement:e})=>{let t=M(e),n=await t.findByRole(`group`,{name:`Bulk actions example`}),r=t.getByRole(`table`),i=r.getBoundingClientRect().top;await k(n.scrollHeight).toBeGreaterThan(n.clientHeight),await k(n).toHaveAttribute(`tabindex`,`0`),await k(t.queryByRole(`region`,{name:`Metrics`})).toBeNull();let a=getComputedStyle(n);await k(a.overscrollBehaviorY).toBe(`contain`),await k(a.overscrollBehaviorX).toBe(`auto`),await k(a.isolation).toBe(`isolate`),await A.click(t.getAllByLabelText(`Select row`)[0]);let o=t.getByRole(`toolbar`,{name:`Bulk actions`}),s=o.closest(`.astryx-section`);if(s==null)throw Error(`Expected the Toolbar surface`);await k(o).toHaveAttribute(`data-layout`,`floating`),await k(o).toHaveAttribute(`data-size`,`sm`),await k(s).toHaveAttribute(`data-variant`,`muted`),await k(o.closest(`[role="group"]`)).toBe(n),await k(Math.abs(r.getBoundingClientRect().top-i)).toBeLessThanOrEqual(1),n.scrollTop=300,n.dispatchEvent(new Event(`scroll`)),await j(()=>{k(Math.round(s.getBoundingClientRect().top-n.getBoundingClientRect().top)).toBe(16)}),n.scrollTop=0}},q=248,J=5,Y=[`Engineer`,`Designer`,`Manager`,`Admin`],X={isAllMatching:!1,picked:new Set,excluded:new Set},Z={render:()=>(0,O.jsx)(E,{}),play:async({canvasElement:e})=>{let t=M(e);await A.click(t.getByLabelText(`Select all rows`)),await k(t.getByText(`5 selected`)).toBeInTheDocument(),await A.click(t.getByRole(`button`,{name:`Select all 248 matching`})),await k(t.getByText(`All 248 matching selected`)).toBeInTheDocument();let n=t.getByRole(`button`,{name:`Select only this page`});await k(n).toHaveFocus(),await A.keyboard(`{Enter}`),await k(t.getByText(`5 selected`)).toBeInTheDocument(),await k(t.getByRole(`button`,{name:`Select all 248 matching`})).toHaveFocus(),await A.keyboard(`{Enter}`),await k(t.getByText(`All 248 matching selected`)).toBeInTheDocument(),await A.click(t.getByLabelText(`Select Record 2`)),await k(t.getByText(`247 of 248 matching selected`)).toBeInTheDocument(),await A.click(t.getByRole(`button`,{name:`Select only this page`})),await k(t.getByText(`5 selected`)).toBeInTheDocument(),await k(t.getByRole(`button`,{name:`Select all 248 matching`})).toHaveFocus(),await A.keyboard(`{Enter}`),await A.click(t.getByLabelText(`Select Record 2`)),await k(t.getByText(`247 of 248 matching selected`)).toBeInTheDocument(),await A.click(t.getByRole(`button`,{name:`Go to next page`})),await j(()=>k(t.getByLabelText(`Select Record 6`)).toBeChecked()),await A.click(t.getByRole(`button`,{name:`Unselect All`})),await k(t.queryByRole(`toolbar`,{name:`Bulk actions`})).not.toBeInTheDocument()}},I.parameters={...I.parameters,docs:{...I.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [selectedKeys, setSelectedKeys] = useState<Set<string>>(new Set());
    const {
      selectionConfig
    } = useTableSelectionState<User>({
      data: users,
      idKey: 'id',
      selectedKeys,
      setSelectedKeys
    });
    const selectionPlugin = useTableSelection<User>(selectionConfig);
    return <div style={{
      maxWidth: 600
    }}>
        <p style={{
        marginBottom: 8,
        fontSize: 14,
        color: 'var(--color-text-secondary)'
      }}>
          Selected: {selectedKeys.size} of {users.length}
        </p>
        <Table data={users} columns={columns} idKey="id" plugins={{
        selection: selectionPlugin
      }} />
      </div>;
  }
}`,...I.parameters?.docs?.source}}},L.parameters={...L.parameters,docs:{...L.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [selectedKeys, setSelectedKeys] = useState<Set<string>>(new Set(['1', '3']));
    const {
      selectionConfig
    } = useTableSelectionState<User>({
      data: users,
      idKey: 'id',
      selectedKeys,
      setSelectedKeys
    });
    const selectionPlugin = useTableSelection<User>(selectionConfig);
    return <div style={{
      maxWidth: 600
    }}>
        <p style={{
        marginBottom: 8,
        fontSize: 14,
        color: 'var(--color-text-secondary)'
      }}>
          Selected: {[...selectedKeys].join(', ') || 'none'}
        </p>
        <Table data={users} columns={columns} idKey="id" plugins={{
        selection: selectionPlugin
      }} />
      </div>;
  }
}`,...L.parameters?.docs?.source}}},R.parameters={...R.parameters,docs:{...R.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [selectedKeys, setSelectedKeys] = useState<Set<string>>(new Set());
    const {
      selectionConfig
    } = useTableSelectionState<User>({
      data: users,
      idKey: 'id',
      selectedKeys,
      setSelectedKeys,
      getIsItemSelectable: item => item.role !== 'Admin'
    });
    const selectionPlugin = useTableSelection<User>(selectionConfig);
    return <div style={{
      maxWidth: 600
    }}>
        <p style={{
        marginBottom: 8,
        fontSize: 14,
        color: 'var(--color-text-secondary)'
      }}>
          Admin rows have no checkbox. Selected: {selectedKeys.size}
        </p>
        <Table data={users} columns={columns} idKey="id" plugins={{
        selection: selectionPlugin
      }} />
      </div>;
  }
}`,...R.parameters?.docs?.source}}},z.parameters={...z.parameters,docs:{...z.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [selectedKeys, setSelectedKeys] = useState<Set<string>>(new Set());
    const {
      selectionConfig
    } = useTableSelectionState<User>({
      data: users,
      idKey: 'id',
      selectedKeys,
      setSelectedKeys,
      getIsItemEnabled: item => !item.isLocked
    });
    const selectionPlugin = useTableSelection<User>(selectionConfig);
    return <div style={{
      maxWidth: 600
    }}>
        <p style={{
        marginBottom: 8,
        fontSize: 14,
        color: 'var(--color-text-secondary)'
      }}>
          Locked rows (Diana) have a disabled checkbox. Select-all skips them.
          Selected: {selectedKeys.size}
        </p>
        <Table data={users} columns={columns} idKey="id" plugins={{
        selection: selectionPlugin
      }} />
      </div>;
  }
}`,...z.parameters?.docs?.source}}},B.parameters={...B.parameters,docs:{...B.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [selectedKeys, setSelectedKeys] = useState<Set<string>>(new Set());
    const {
      selectionConfig
    } = useTableSelectionState<User>({
      data: users,
      idKey: 'id',
      selectedKeys,
      setSelectedKeys
    });
    const selectionPlugin = useTableSelection<User>(selectionConfig);
    return <div style={{
      maxWidth: 600
    }}>
        <Table data={users} columns={columns} idKey="id" density="compact" plugins={{
        selection: selectionPlugin
      }} />
      </div>;
  }
}`,...B.parameters?.docs?.source}}},V.parameters={...V.parameters,docs:{...V.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [selectedKeys, setSelectedKeys] = useState<Set<string>>(new Set());
    const {
      selectionConfig
    } = useTableSelectionState<User>({
      data: users,
      idKey: 'id',
      selectedKeys,
      setSelectedKeys
    });
    const selectionPlugin = useTableSelection<User>(selectionConfig);
    return <div style={{
      maxWidth: 600
    }}>
        <Table data={users} columns={columns} idKey="id" density="spacious" hasHover plugins={{
        selection: selectionPlugin
      }} />
      </div>;
  }
}`,...V.parameters?.docs?.source}}},H.parameters={...H.parameters,docs:{...H.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [selectedKeys, setSelectedKeys] = useState<Set<string>>(new Set());
    const {
      selectionConfig
    } = useTableSelectionState<User>({
      data: users,
      idKey: 'id',
      selectedKeys,
      setSelectedKeys
    });
    const selectionPlugin = useTableSelection<User>(selectionConfig);
    return <div style={{
      maxWidth: 600
    }}>
        <Table data={users} columns={columns} idKey="id" isStriped plugins={{
        selection: selectionPlugin
      }} />
      </div>;
  }
}`,...H.parameters?.docs?.source}}},G.parameters={...G.parameters,docs:{...G.parameters?.docs,source:{originalSource:`{
  render: () => <BulkActionsExample layout="fixed" />,
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getAllByLabelText('Select row')[0]);
    const toolbar = canvas.getByRole('toolbar', {
      name: 'Bulk actions'
    });
    const toolbarSurface = toolbar.closest('.astryx-section');
    await expect(toolbar).toHaveAttribute('data-layout', 'fixed');
    await expect(toolbar).toHaveAttribute('data-size', 'sm');
    await expect(toolbarSurface).toHaveAttribute('data-variant', 'muted');
    await expect(toolbar.closest('[role="group"]')).toBeNull();
    await expect(canvas.getByText('1 selected')).toBeInTheDocument();
    await userEvent.click(canvas.getByRole('button', {
      name: 'Unselect All'
    }));
    await expect(canvas.queryByRole('toolbar', {
      name: 'Bulk actions'
    })).not.toBeInTheDocument();

    // Leave the story ready for manual review.
    await userEvent.click(canvas.getAllByLabelText('Select row')[0]);
  }
}`,...G.parameters?.docs?.source},description:{story:`Product-composed in-flow bar. Actions lead; selection status and clear trail.`,...G.parameters?.docs?.description}}},K.parameters={...K.parameters,docs:{...K.parameters?.docs,source:{originalSource:`{
  render: () => <BulkActionsExample layout="floating" />,
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    const scrollRegion = await canvas.findByRole('group', {
      name: 'Bulk actions example'
    });
    const table = canvas.getByRole('table');
    const tableTopBeforeSelection = table.getBoundingClientRect().top;
    await expect(scrollRegion.scrollHeight).toBeGreaterThan(scrollRegion.clientHeight);
    await expect(scrollRegion).toHaveAttribute('tabindex', '0');
    await expect(canvas.queryByRole('region', {
      name: 'Metrics'
    })).toBeNull();
    const scrollStyles = getComputedStyle(scrollRegion);
    await expect(scrollStyles.overscrollBehaviorY).toBe('contain');
    await expect(scrollStyles.overscrollBehaviorX).toBe('auto');
    await expect(scrollStyles.isolation).toBe('isolate');
    await userEvent.click(canvas.getAllByLabelText('Select row')[0]);
    const toolbar = canvas.getByRole('toolbar', {
      name: 'Bulk actions'
    });
    const toolbarSurface = toolbar.closest<HTMLElement>('.astryx-section');
    if (toolbarSurface == null) {
      throw new Error('Expected the Toolbar surface');
    }
    await expect(toolbar).toHaveAttribute('data-layout', 'floating');
    await expect(toolbar).toHaveAttribute('data-size', 'sm');
    await expect(toolbarSurface).toHaveAttribute('data-variant', 'muted');
    await expect(toolbar.closest('[role="group"]')).toBe(scrollRegion);
    await expect(Math.abs(table.getBoundingClientRect().top - tableTopBeforeSelection)).toBeLessThanOrEqual(1);
    scrollRegion.scrollTop = 300;
    scrollRegion.dispatchEvent(new Event('scroll'));
    await waitFor(() => {
      expect(Math.round(toolbarSurface.getBoundingClientRect().top - scrollRegion.getBoundingClientRect().top)).toBe(16);
    });
    scrollRegion.scrollTop = 0;
  }
}`,...K.parameters?.docs?.source},description:{story:`Product-composed floating bar for a long, non-sticky table below metrics.
The example owns a capped scrollport; the toolbar stays 16px from that
scrollport and releases at the table region's block-end boundary.`,...K.parameters?.docs?.description}}},Z.parameters={...Z.parameters,docs:{...Z.parameters?.docs,source:{originalSource:`{
  render: () => <SelectAllMatchingExample />,
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByLabelText('Select all rows'));
    await expect(canvas.getByText('5 selected')).toBeInTheDocument();
    await userEvent.click(canvas.getByRole('button', {
      name: 'Select all 248 matching'
    }));
    await expect(canvas.getByText('All 248 matching selected')).toBeInTheDocument();
    // The used offer stays as the command that undoes it and keeps focus,
    // so a second Enter returns to this page and never reaches Archive.
    const undo = canvas.getByRole('button', {
      name: 'Select only this page'
    });
    await expect(undo).toHaveFocus();
    await userEvent.keyboard('{Enter}');
    await expect(canvas.getByText('5 selected')).toBeInTheDocument();
    await expect(canvas.getByRole('button', {
      name: 'Select all 248 matching'
    })).toHaveFocus();
    await userEvent.keyboard('{Enter}');
    await expect(canvas.getByText('All 248 matching selected')).toBeInTheDocument();

    // With a row unticked, "Select only this page" selects the whole page
    // and keeps focus on the button.
    await userEvent.click(canvas.getByLabelText('Select Record 2'));
    await expect(canvas.getByText('247 of 248 matching selected')).toBeInTheDocument();
    await userEvent.click(canvas.getByRole('button', {
      name: 'Select only this page'
    }));
    await expect(canvas.getByText('5 selected')).toBeInTheDocument();
    await expect(canvas.getByRole('button', {
      name: 'Select all 248 matching'
    })).toHaveFocus();
    await userEvent.keyboard('{Enter}');
    await userEvent.click(canvas.getByLabelText('Select Record 2'));
    await expect(canvas.getByText('247 of 248 matching selected')).toBeInTheDocument();

    // Rows on a page never loaded before are already selected.
    await userEvent.click(canvas.getByRole('button', {
      name: 'Go to next page'
    }));
    await waitFor(() => expect(canvas.getByLabelText('Select Record 6')).toBeChecked());
    await userEvent.click(canvas.getByRole('button', {
      name: 'Unselect All'
    }));
    await expect(canvas.queryByRole('toolbar', {
      name: 'Bulk actions'
    })).not.toBeInTheDocument();
  }
}`,...Z.parameters?.docs?.source},description:{story:`Recipe: select every row that matches a query across server pages, then
untick a few, with today's API. The app keeps "all matching minus
exclusions" and passes its own count and label to the toolbar. In this mode
the toolbar's \`selectedKeys\` holds only the loaded rows.`,...Z.parameters?.docs?.description}}},Q=[`Default`,`WithPreselection`,`NonSelectableRows`,`DisabledRows`,`Compact`,`Spacious`,`WithStripedRows`,`BulkActions`,`BulkActionsFloating`,`SelectAllMatching`]})))()}$();export{G as BulkActions,K as BulkActionsFloating,B as Compact,I as Default,z as DisabledRows,R as NonSelectableRows,Z as SelectAllMatching,V as Spacious,L as WithPreselection,H as WithStripedRows,Q as __namedExportsOrder,F as default};