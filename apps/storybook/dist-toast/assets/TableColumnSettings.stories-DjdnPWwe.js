import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{t}from"./react-DlPsW1c0.js";import{t as n}from"./jsx-runtime-MKhVqBIO.js";import{n as r,t as i}from"./Text-C5BHw0wv.js";import{n as a,t as o}from"./Button-DoGM0DEN.js";import{n as s,t as c}from"./Table-DReqd1jV.js";import{n as l,t as u}from"./MultiSelector-DlFWmlLw.js";import{n as d,t as f}from"./Toolbar-BjzQwWLc.js";import{i as p,n as m,r as h,t as g}from"./useTableSelectionState-CtGJQOHC.js";import{i as _,n as v,r as y,t as b}from"./useTableColumnSettingsState-B2qsaVTH.js";var x,S,C,w,T,E,D,O,k,A,j,M;function N(){return(N=e((()=>{x=t(),s(),y(),b(),h(),g(),l(),a(),d(),r(),S=n(),C=[{id:`1`,name:`Alice`,email:`alice@example.com`,role:`Engineer`,department:`Platform`,status:`Active`},{id:`2`,name:`Bob`,email:`bob@example.com`,role:`Designer`,department:`Product`,status:`Active`},{id:`3`,name:`Charlie`,email:`charlie@example.com`,role:`Manager`,department:`Platform`,status:`Away`},{id:`4`,name:`Diana`,email:`diana@example.com`,role:`Engineer`,department:`Infrastructure`,status:`Active`},{id:`5`,name:`Eve`,email:`eve@example.com`,role:`Admin`,department:`Operations`,status:`Inactive`}],w=[{key:`name`,header:`Name`},{key:`email`,header:`Email`},{key:`role`,header:`Role`},{key:`department`,header:`Department`},{key:`status`,header:`Status`}],T=[{key:`name`,label:`Name`,isAlwaysVisible:!0},{key:`email`,label:`Email`},{key:`role`,label:`Role`},{key:`department`,label:`Department`},{key:`status`,label:`Status`}],E=[`name`,`email`,`role`,`department`,`status`],D={title:`Core/TableColumnSettings`,tags:[`autodocs`]},O={render:()=>{let[e,t]=(0,x.useState)(E),n=v({columns:T,activeColumnKeys:e,onChangeActiveColumnKeys:e=>t([...e])}),r=_(n.columnSettingsConfig),a=T.map(e=>({value:e.key,label:e.label,disabled:e.isAlwaysVisible===!0}));return(0,S.jsxs)(`div`,{style:{maxWidth:700},children:[(0,S.jsx)(f,{label:`Table actions`,startContent:(0,S.jsx)(i,{type:`label`,children:`Users`}),endContent:(0,S.jsx)(u,{label:`Columns`,isLabelHidden:!0,options:a,value:[...n.activeColumnKeys],onChange:n.setActiveColumnKeys})}),(0,S.jsx)(c,{data:C,columns:w,idKey:`id`,plugins:{columnSettings:r}})]})}},k={render:()=>{let[e,t]=(0,x.useState)([`name`,`email`,`role`]),n=v({columns:T,activeColumnKeys:e,onChangeActiveColumnKeys:e=>t([...e])}),r=_(n.columnSettingsConfig),a=T.map(e=>({value:e.key,label:e.label,disabled:e.isAlwaysVisible===!0}));return(0,S.jsxs)(`div`,{style:{maxWidth:700},children:[(0,S.jsx)(i,{type:`supporting`,children:`"Name" is always visible and cannot be unchecked.`}),(0,S.jsx)(f,{label:`Table actions`,startContent:(0,S.jsx)(i,{type:`label`,children:`Users`}),endContent:(0,S.jsx)(u,{label:`Columns`,isLabelHidden:!0,options:a,value:[...n.activeColumnKeys],onChange:n.setActiveColumnKeys})}),(0,S.jsx)(c,{data:C,columns:w,idKey:`id`,plugins:{columnSettings:r}})]})}},A={render:()=>{let e=[`name`,`email`,`role`],[t,n]=(0,x.useState)(e),r=v({columns:T,activeColumnKeys:t,onChangeActiveColumnKeys:e=>n([...e]),defaultColumnKeys:e}),a=_(r.columnSettingsConfig),s=T.map(e=>({value:e.key,label:e.label,disabled:e.isAlwaysVisible===!0}));return(0,S.jsxs)(`div`,{style:{maxWidth:700},children:[(0,S.jsx)(i,{type:`supporting`,children:`Toggle columns, then reset to restore the default set (Name, Email, Role).`}),(0,S.jsx)(f,{label:`Table actions`,startContent:(0,S.jsx)(i,{type:`label`,children:`Users`}),endContent:(0,S.jsxs)(S.Fragment,{children:[(0,S.jsx)(o,{label:`Reset to default`,variant:`secondary`,onClick:r.resetToDefault}),(0,S.jsx)(u,{label:`Columns`,isLabelHidden:!0,options:s,value:[...r.activeColumnKeys],onChange:r.setActiveColumnKeys})]})}),(0,S.jsx)(c,{data:C,columns:w,idKey:`id`,plugins:{columnSettings:a}})]})}},j={render:()=>{let[e,t]=(0,x.useState)(E),[n,r]=(0,x.useState)(new Set),a=v({columns:T,activeColumnKeys:e,onChangeActiveColumnKeys:e=>t([...e])}),o=_(a.columnSettingsConfig),s=T.map(e=>({value:e.key,label:e.label,disabled:e.isAlwaysVisible===!0})),{selectionConfig:l}=m({data:C,idKey:`id`,selectedKeys:n,setSelectedKeys:r}),d=p(l);return(0,S.jsxs)(`div`,{style:{maxWidth:700},children:[(0,S.jsx)(f,{label:`Table actions`,startContent:(0,S.jsxs)(i,{type:`supporting`,children:[n.size,` of `,C.length,` selected`]}),endContent:(0,S.jsx)(u,{label:`Columns`,isLabelHidden:!0,options:s,value:[...a.activeColumnKeys],onChange:a.setActiveColumnKeys})}),(0,S.jsx)(c,{data:C,columns:w,idKey:`id`,plugins:{columnSettings:o,selection:d}})]})}},O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [activeKeys, setActiveKeys] = useState<UserColumnKey[]>(defaultActiveKeys);
    const state = useTableColumnSettingsState<UserColumnKey>({
      columns: columnOptions,
      activeColumnKeys: activeKeys,
      onChangeActiveColumnKeys: (keys: ReadonlyArray<UserColumnKey>) => setActiveKeys([...keys])
    });
    const plugin = useTableColumnSettings<User, UserColumnKey>(state.columnSettingsConfig);
    const selectorOptions = columnOptions.map(c => ({
      value: c.key,
      label: c.label,
      disabled: c.isAlwaysVisible === true
    }));
    return <div style={{
      maxWidth: 700
    }}>
        <Toolbar label="Table actions" startContent={<Text type="label">Users</Text>} endContent={<MultiSelector label="Columns" isLabelHidden options={selectorOptions} value={[...state.activeColumnKeys]} onChange={state.setActiveColumnKeys} />} />
        <Table data={users} columns={allColumns} idKey="id" plugins={{
        columnSettings: plugin
      }} />
      </div>;
  }
}`,...O.parameters?.docs?.source}}},k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [activeKeys, setActiveKeys] = useState<UserColumnKey[]>(['name', 'email', 'role']);
    const state = useTableColumnSettingsState<UserColumnKey>({
      columns: columnOptions,
      activeColumnKeys: activeKeys,
      onChangeActiveColumnKeys: (keys: ReadonlyArray<UserColumnKey>) => setActiveKeys([...keys])
    });
    const plugin = useTableColumnSettings<User, UserColumnKey>(state.columnSettingsConfig);
    const selectorOptions = columnOptions.map(c => ({
      value: c.key,
      label: c.label,
      disabled: c.isAlwaysVisible === true
    }));
    return <div style={{
      maxWidth: 700
    }}>
        <Text type="supporting">
          &quot;Name&quot; is always visible and cannot be unchecked.
        </Text>
        <Toolbar label="Table actions" startContent={<Text type="label">Users</Text>} endContent={<MultiSelector label="Columns" isLabelHidden options={selectorOptions} value={[...state.activeColumnKeys]} onChange={state.setActiveColumnKeys} />} />
        <Table data={users} columns={allColumns} idKey="id" plugins={{
        columnSettings: plugin
      }} />
      </div>;
  }
}`,...k.parameters?.docs?.source}}},A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`{
  render: () => {
    const defaultKeys: UserColumnKey[] = ['name', 'email', 'role'];
    const [activeKeys, setActiveKeys] = useState<UserColumnKey[]>(defaultKeys);
    const state = useTableColumnSettingsState<UserColumnKey>({
      columns: columnOptions,
      activeColumnKeys: activeKeys,
      onChangeActiveColumnKeys: (keys: ReadonlyArray<UserColumnKey>) => setActiveKeys([...keys]),
      defaultColumnKeys: defaultKeys
    });
    const plugin = useTableColumnSettings<User, UserColumnKey>(state.columnSettingsConfig);
    const selectorOptions = columnOptions.map(c => ({
      value: c.key,
      label: c.label,
      disabled: c.isAlwaysVisible === true
    }));
    return <div style={{
      maxWidth: 700
    }}>
        <Text type="supporting">
          Toggle columns, then reset to restore the default set (Name, Email,
          Role).
        </Text>
        <Toolbar label="Table actions" startContent={<Text type="label">Users</Text>} endContent={<>
              <Button label="Reset to default" variant="secondary" onClick={state.resetToDefault} />
              <MultiSelector label="Columns" isLabelHidden options={selectorOptions} value={[...state.activeColumnKeys]} onChange={state.setActiveColumnKeys} />
            </>} />
        <Table data={users} columns={allColumns} idKey="id" plugins={{
        columnSettings: plugin
      }} />
      </div>;
  }
}`,...A.parameters?.docs?.source}}},j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [activeKeys, setActiveKeys] = useState<UserColumnKey[]>(defaultActiveKeys);
    const [selectedKeys, setSelectedKeys] = useState<Set<string>>(new Set());
    const state = useTableColumnSettingsState<UserColumnKey>({
      columns: columnOptions,
      activeColumnKeys: activeKeys,
      onChangeActiveColumnKeys: (keys: ReadonlyArray<UserColumnKey>) => setActiveKeys([...keys])
    });
    const columnPlugin = useTableColumnSettings<User, UserColumnKey>(state.columnSettingsConfig);
    const selectorOptions = columnOptions.map(c => ({
      value: c.key,
      label: c.label,
      disabled: c.isAlwaysVisible === true
    }));
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
      maxWidth: 700
    }}>
        <Toolbar label="Table actions" startContent={<Text type="supporting">
              {selectedKeys.size} of {users.length} selected
            </Text>} endContent={<MultiSelector label="Columns" isLabelHidden options={selectorOptions} value={[...state.activeColumnKeys]} onChange={state.setActiveColumnKeys} />} />
        <Table data={users} columns={allColumns} idKey="id" plugins={{
        columnSettings: columnPlugin,
        selection: selectionPlugin
      }} />
      </div>;
  }
}`,...j.parameters?.docs?.source}}},M=[`BasicColumnToggle`,`DisabledColumns`,`ResetToDefault`,`WithSelection`]})))()}N();export{O as BasicColumnToggle,k as DisabledColumns,A as ResetToDefault,j as WithSelection,M as __namedExportsOrder,D as default};