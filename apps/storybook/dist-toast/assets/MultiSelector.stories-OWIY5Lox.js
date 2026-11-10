import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{t}from"./react-DlPsW1c0.js";import{t as n}from"./jsx-runtime-MKhVqBIO.js";import{o as r,s as i}from"./useTheme-CUotWZgR.js";import{n as a,t as o}from"./Button-DoGM0DEN.js";import{n as s,t as c}from"./IconButton-BONXg2Kw.js";import{n as l,t as u}from"./InputGroup-BWTkP6pA.js";import{n as d,t as f}from"./InputGroupText-Dko_Ilc1.js";import{n as p,t as m}from"./MultiSelector-DlFWmlLw.js";import{c as h,o as g}from"./iframe-B7UFaprG.js";var _,v,y,b,x,S,C,w,T,E,D,O,k,A,j,M,N,P,F,I,L,R,z,B,V,H,U,W,G,K,q,J,Y,X,Z;function Q(){return(Q=e((()=>{_=t(),a(),s(),l(),d(),p(),h(),i(),v=n(),{expect:y,userEvent:b,waitFor:x,within:S}=__STORYBOOK_MODULE_TEST__,C={title:`Core/MultiSelector`,component:m,tags:[`autodocs`],parameters:{layout:`centered`},decorators:[e=>(0,v.jsx)(`div`,{style:{width:300},children:(0,v.jsx)(e,{})})],argTypes:{label:{control:`text`},isLabelHidden:{control:`boolean`},description:{control:`text`},placeholder:{control:`text`},size:{control:`radio`,options:[`sm`,`md`,`lg`]},variant:{control:`radio`,options:[`input`,`secondary`,`ghost`]},presentation:{control:`radio`,options:[`popover`,`bottom-sheet`,`adaptive`]},triggerDisplay:{control:`radio`,options:[`count`,`labels`,`badges`]},isDisabled:{control:`boolean`},isReadOnly:{control:`boolean`},disabledMessage:{control:`text`},isOptional:{control:`boolean`},isRequired:{control:`boolean`},hasSelectAll:{control:`boolean`},hasSearch:{control:`boolean`}}},w={render:e=>{let[t,n]=(0,_.useState)([`Role`,`Created`]);return(0,v.jsx)(m,{...e,label:e.label??`Columns`,options:e.options??[`Name`,`Email`,`Role`,`Status`,`Created`],value:t,onChange:n})},args:{placeholder:`Select columns...`}},T={args:{label:`Assigned teams`,options:[`Design`,`Engineering`,`Marketing`],value:[`Design`,`Engineering`],onChange:()=>{},hasClear:!0,hasSearch:!0,htmlName:`teams`,triggerDisplay:`labels`,isReadOnly:!0}},E={render:()=>{let[e,t]=(0,_.useState)([]);return(0,v.jsx)(m,{label:`Teams`,options:[`Design`,`Engineering`,`Marketing`,`Operations`],value:e,onChange:t,hasSelectAll:!0,presentation:`bottom-sheet`})}},D={render:()=>{let[e,t]=(0,_.useState)([]);return(0,v.jsx)(m,{label:`Permissions`,options:[{type:`section`,title:`Read`,options:[{value:`read_posts`,label:`Read posts`},{value:`read_comments`,label:`Read comments`},{value:`read_users`,label:`Read users`}]},{type:`section`,title:`Write`,options:[{value:`write_posts`,label:`Write posts`},{value:`write_comments`,label:`Write comments`}]}],value:e,onChange:t,placeholder:`Select permissions...`})},decorators:[e=>(0,v.jsx)(e,{})]},O={render:()=>{let[e,t]=(0,_.useState)([]);return(0,v.jsx)(m,{label:`Permissions`,hasSearch:!0,options:[{type:`section`,title:`Read`,options:[{value:`read_posts`,label:`Read posts`},{value:`read_comments`,label:`Read comments`},{value:`read_users`,label:`Read users`}]},{type:`section`,title:`Write`,options:[{value:`write_posts`,label:`Write posts`},{value:`write_comments`,label:`Write comments`}]}],value:e,onChange:t,placeholder:`Select permissions...`})},decorators:[e=>(0,v.jsx)(e,{})]},k={render:()=>{let[e,t]=(0,_.useState)([]);return(0,v.jsx)(m,{label:`Columns`,options:[`Name`,`Email`,`Role`,`Status`,`Created`,`Updated`],value:e,onChange:t,hasSelectAll:!0,placeholder:`Select columns...`})},decorators:[e=>(0,v.jsx)(e,{})]},A={render:()=>{let[e,t]=(0,_.useState)([]);return(0,v.jsx)(m,{label:`Countries`,options:[`United States`,`United Kingdom`,`Canada`,`Australia`,`Germany`,`France`,`Japan`,`Brazil`,`India`,`Mexico`],value:e,onChange:t,hasSearch:!0,hasSelectAll:!0,placeholder:`Select countries...`})},decorators:[e=>(0,v.jsx)(e,{})]},j={render:()=>{let[e,t]=(0,_.useState)([]),[n,r]=(0,_.useState)([]),[i,a]=(0,_.useState)([]),[o,s]=(0,_.useState)([]);return(0,v.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:16,width:300},children:[(0,v.jsx)(m,{label:`No options (default)`,options:[],value:e,onChange:t}),(0,v.jsx)(m,{label:`No options (custom)`,options:[],value:n,onChange:r,emptyText:`No countries loaded yet`}),(0,v.jsx)(m,{label:`Search for xyz (custom)`,options:[`Canada`,`France`,`Japan`],value:i,onChange:a,hasSearch:!0,emptySearchText:`Nothing matches that country`}),(0,v.jsx)(m,{label:`Loading (no message)`,options:[],value:o,onChange:s,isLoading:!0})]})},decorators:[e=>(0,v.jsx)(e,{})]},M={render:()=>{let[e,t]=(0,_.useState)([`Name`,`Email`]),[n,r]=(0,_.useState)([`Name`,`Email`,`Role`]),[i,a]=(0,_.useState)([`Name`,`Email`,`Role`,`Status`,`Created`]);return(0,v.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:16,width:300},children:[(0,v.jsx)(m,{label:`Count (default)`,options:[`Name`,`Email`,`Role`,`Status`,`Created`],value:e,onChange:t,triggerDisplay:`count`}),(0,v.jsx)(m,{label:`Labels`,options:[`Name`,`Email`,`Role`,`Status`,`Created`],value:n,onChange:r,triggerDisplay:`labels`}),(0,v.jsx)(m,{label:`Badges`,options:[`Name`,`Email`,`Role`,`Status`,`Created`],value:i,onChange:a,triggerDisplay:`badges`,maxBadges:3})]})},decorators:[e=>(0,v.jsx)(e,{})]},N={render:()=>{let[e,t]=(0,_.useState)([`admin`]);return(0,v.jsx)(m,{label:`Roles`,options:[{value:`admin`,label:`Admin`,disabled:!0},{value:`editor`,label:`Editor`},{value:`viewer`,label:`Viewer`},{value:`guest`,label:`Guest`}],value:e,onChange:t,hasSelectAll:!0,placeholder:`Select roles...`})},decorators:[e=>(0,v.jsx)(e,{})]},P={render:()=>{let[e,t]=(0,_.useState)([]);return(0,v.jsx)(m,{label:`Columns`,options:[`Name`,`Email`,`Role`,`Status`,`Created`],value:e,onChange:t,isDisabled:!0,disabledMessage:`Select a table before choosing columns`,placeholder:`Select columns...`})},decorators:[e=>(0,v.jsx)(e,{})]},F={render:()=>{let[e,t]=(0,_.useState)([`Name`,`Email`]),[n,r]=(0,_.useState)([`Active`]);return(0,v.jsxs)(`div`,{style:{display:`flex`,alignItems:`center`,gap:8,width:`max-content`},children:[(0,v.jsx)(o,{label:`Refresh`,variant:`ghost`}),(0,v.jsx)(m,{label:`Columns`,isLabelHidden:!0,variant:`ghost`,size:`md`,options:[`Name`,`Email`,`Role`,`Status`,`Created`],value:e,onChange:t,triggerDisplay:`labels`,placeholder:`Columns`}),(0,v.jsx)(m,{label:`Status`,isLabelHidden:!0,variant:`ghost`,size:`md`,options:[`Active`,`Inactive`,`Pending`,`Archived`],value:n,onChange:r,triggerDisplay:`labels`,placeholder:`Status`,status:{type:`warning`,message:`Some filters hide archived rows`},statusVariant:`tooltip`}),(0,v.jsx)(o,{label:`Export`,variant:`ghost`})]})},decorators:[e=>(0,v.jsx)(e,{})]},I={render:()=>{let[e,t]=(0,_.useState)([`Name`,`Email`]);return(0,v.jsxs)(`div`,{style:{display:`flex`,alignItems:`center`,gap:8,width:`max-content`},children:[(0,v.jsx)(o,{label:`Refresh`,variant:`secondary`}),(0,v.jsx)(m,{label:`Columns`,isLabelHidden:!0,variant:`secondary`,size:`md`,width:180,options:[`Name`,`Email`,`Role`,`Status`,`Created`],value:e,onChange:t,triggerDisplay:`labels`,placeholder:`Columns`}),(0,v.jsx)(o,{label:`Export`,variant:`secondary`})]})},decorators:[e=>(0,v.jsx)(e,{})],play:async({canvasElement:e})=>{await document.fonts.ready;let t=S(e).getByRole(`combobox`,{name:`Columns`}),n=e.querySelector(`.astryx-multi-selector[data-variant="secondary"]`);if(n==null)throw Error(`Secondary MultiSelector root not found`);let r=n.getBoundingClientRect().width;y(r).toBeCloseTo(180,0),await b.click(t);let i=S(document.body).getByRole(`listbox`);await b.click(S(i).getByRole(`option`,{name:/Role/})),await x(()=>y(n.getBoundingClientRect().width).toBeCloseTo(r,0)),await b.keyboard(`{Escape}`),t.blur()}},L={render:()=>{let e=e=>(0,v.jsx)(m,{label:e,isLabelHidden:!0,variant:`secondary`,options:[`Name`,`Email`,`Role`],value:[`Name`],onChange:()=>{}});return(0,v.jsxs)(`div`,{"data-secondary-input-group-matrix":!0,style:{display:`grid`,gap:16,width:320},children:[(0,v.jsxs)(u,{label:`Secondary first`,isLabelHidden:!0,children:[e(`Columns first`),(0,v.jsx)(f,{children:`cols`})]}),(0,v.jsxs)(u,{label:`Secondary middle`,isLabelHidden:!0,children:[(0,v.jsx)(f,{children:`#`}),e(`Columns middle`),(0,v.jsx)(f,{children:`cols`})]}),(0,v.jsxs)(u,{label:`Secondary last`,isLabelHidden:!0,children:[(0,v.jsx)(f,{children:`#`}),e(`Columns last`)]})]})},decorators:[e=>(0,v.jsx)(e,{})]},R={render:()=>{let[e,t]=(0,_.useState)([]),[n,r]=(0,_.useState)([`Email`]),[i,a]=(0,_.useState)([`Name`,`Email`]);return(0,v.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:16,width:300},children:[(0,v.jsx)(m,{label:`Error`,options:[`Name`,`Email`,`Role`],value:e,onChange:t,status:{type:`error`,message:`Please select at least one column`},placeholder:`Select...`}),(0,v.jsx)(m,{label:`Warning`,options:[`Name`,`Email`,`Role`],value:n,onChange:r,status:{type:`warning`,message:`Email column has issues`}}),(0,v.jsx)(m,{label:`Success`,options:[`Name`,`Email`,`Role`],value:i,onChange:a,status:{type:`success`}})]})},decorators:[e=>(0,v.jsx)(e,{})]},z=r({name:`multi-selector-compact-sizing`,tokens:{"--spacing-5":`10px`,"--size-element-sm":`24px`,"--size-element-md":`28px`,"--size-element-lg":`32px`}}),B={render:()=>{let[e,t]=(0,_.useState)([]),[n,r]=(0,_.useState)([]),[i,a]=(0,_.useState)([]);return(0,v.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:16,width:300},children:[(0,v.jsx)(m,{label:`Small`,size:`sm`,options:[`Name`,`Email`,`Role`],value:e,onChange:t,placeholder:`Small (28px)`}),(0,v.jsx)(m,{label:`Medium`,size:`md`,options:[`Name`,`Email`,`Role`],value:n,onChange:r,placeholder:`Medium (32px)`}),(0,v.jsx)(m,{label:`Large`,size:`lg`,options:[`Name`,`Email`,`Role`],value:i,onChange:a,placeholder:`Large (36px)`}),(0,v.jsx)(g,{theme:z,children:[`sm`,`md`,`lg`].map(e=>(0,v.jsx)(`div`,{style:{display:`grid`,gap:8},children:[`plain`,`start`,`option`,`status`,`tooltip`,`clear`,`loading`,`readonly`].map(t=>(0,v.jsx)(m,{label:`Compact ${e} ${t}`,size:e,options:[{value:`name`,label:`Name`,icon:t===`option`?`search`:void 0}],value:[`name`],onChange:()=>{},startIcon:t===`start`?`search`:void 0,status:t===`status`||t===`tooltip`?{type:`warning`,message:`Check selection`}:void 0,statusVariant:t===`tooltip`?`tooltip`:`attached`,hasClear:t===`clear`,isLoading:t===`loading`,isReadOnly:t===`readonly`},t))},e))})]})},decorators:[e=>(0,v.jsx)(e,{})],play:async({canvasElement:e})=>{await document.fonts.ready;let t=e.querySelectorAll(`.astryx-multi-selector`);y(t).toHaveLength(27);for(let e of t){let t=Number.parseFloat(getComputedStyle(e).getPropertyValue(`--size-element-${e.dataset.size}`));y(e.getBoundingClientRect().height,e.textContent??``).toBeCloseTo(t,1)}}},V={render:()=>{let[e,t]=(0,_.useState)([`name`,`email`]),[n,r]=(0,_.useState)([]);return(0,v.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:16,width:300},children:[(0,v.jsx)(m,{label:`Visible columns`,description:`Choose which columns to display in the table`,options:[{value:`name`,label:`Name`},{value:`email`,label:`Email`},{value:`role`,label:`Role`},{value:`status`,label:`Status`},{value:`created`,label:`Created at`}],value:e,onChange:t,hasSelectAll:!0,isRequired:!0,triggerDisplay:`labels`}),(0,v.jsx)(m,{label:`Status filter`,description:`Filter by status`,options:[`Active`,`Inactive`,`Pending`,`Archived`],value:n,onChange:r,isOptional:!0,triggerDisplay:`badges`,placeholder:`All statuses`})]})},decorators:[e=>(0,v.jsx)(e,{})]},H={render:()=>{let e=[{value:`name`,label:`Name`},{value:`email`,label:`Email`},{value:`role`,label:`Role`},{value:`status`,label:`Status`},{value:`created`,label:`Created`},{value:`updated`,label:`Updated`},{value:`actions`,label:`Actions`}],[t,n]=(0,_.useState)([`name`,`email`,`role`,`status`]);return(0,v.jsx)(m,{label:`Columns`,isLabelHidden:!0,options:e,value:t,onChange:n,hasSelectAll:!0,hasSearch:!0,triggerDisplay:`count`,placeholder:`Columns`})},decorators:[e=>(0,v.jsx)(e,{})]},U={render:e=>{let[t,n]=(0,_.useState)([`react`,`typescript`]);return(0,v.jsx)(m,{...e,options:[{value:`react`,label:`React`},{value:`typescript`,label:`TypeScript`},{value:`stylex`,label:`StyleX`},{value:`vitest`,label:`Vitest`}],value:t,onChange:n,hasClear:!0})},args:{label:`Technologies`,placeholder:`Select technologies...`}},W={render:()=>{let[e,t]=(0,_.useState)([]),[n,r]=(0,_.useState)([]);return(0,v.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:24,width:300},children:[(0,v.jsx)(m,{label:`Attached (default)`,options:[`Name`,`Email`,`Role`],value:e,onChange:t,status:{type:`error`,message:`Select at least one column`},placeholder:`Select...`}),(0,v.jsx)(m,{label:`Detached`,options:[`Name`,`Email`,`Role`],value:n,onChange:r,status:{type:`error`,message:`Select at least one column`},statusVariant:`detached`,placeholder:`Select...`})]})},decorators:[e=>(0,v.jsx)(e,{})]},G=r({name:`multi-selector-icon-demo`,components:{"input-clear-icon":{base:{width:`12px`,height:`12px`,fontSize:`12px`,color:`var(--color-icon-secondary)`,":hover":{color:`var(--color-accent)`}}},"multi-selector-indicator-icon":{base:{width:`14px`,height:`14px`,fontSize:`14px`,color:`var(--color-icon-secondary)`},"state:expanded":{color:`var(--color-accent)`}}}}),K={render:()=>{let[e,t]=(0,_.useState)([`Apple`,`Banana`]);return(0,v.jsx)(g,{theme:G,mode:`light`,children:(0,v.jsx)(m,{label:`Icons themed (accent on hover/open)`,options:[`Apple`,`Banana`,`Orange`],value:e,onChange:t,hasClear:!0})})}},q={render:()=>{let[e,t]=(0,_.useState)([`Name`,`Email`]);return(0,v.jsx)(m,{label:`Columns`,options:[`Name`,`Email`,`Role`,`Status`],value:e,onChange:t,indicatorPosition:`end`,isDefaultOpen:!0})}},J={render:()=>{let[e,t]=(0,_.useState)([{value:`bug`,label:`Bug`},{value:`feature`,label:`Feature`},{value:`docs`,label:`Docs`}]),[n,r]=(0,_.useState)([`bug`]);return(0,v.jsx)(m,{label:`Labels`,options:e,value:n,onChange:(e,n)=>{n?.type===`create`&&t(e=>[...e,{value:n.query,label:n.query}]),r(e)},hasSearch:!0,hasCreate:!0,triggerDisplay:`badges`,isDefaultOpen:!0})}},Y={render:()=>{let[e,t]=(0,_.useState)([`feature`]),[n,r]=(0,_.useState)(null),i=e=>(0,v.jsx)(c,{label:`Edit ${e}`,icon:`moreHorizontal`,variant:`ghost`,size:`sm`,tooltip:`Edit ${e}`,onClick:()=>r(e)});return(0,v.jsxs)(v.Fragment,{children:[(0,v.jsx)(m,{label:`Labels`,options:[{type:`section`,title:`Type`,options:[{value:`feature`,label:`Feature`},{value:`bug`,label:`Bug`,action:i(`Bug`)},{value:`docs`,label:`Docs`},{value:`review`,label:`Design review`,action:i(`Design review`)}]},{type:`section`,title:`Priority`,options:[{value:`p0`,label:`P0`,action:i(`P0`)},{value:`p1`,label:`P1`,action:i(`P1`)}]}],value:e,onChange:t,hasSearch:!0,hasSelectAll:!0,hasClear:!0,triggerDisplay:`badges`,isDefaultOpen:!0}),(0,v.jsx)(`output`,{"data-testid":`last-edited`,children:n??``})]})}},X={render:()=>{let[e,t]=(0,_.useState)([]);return(0,v.jsx)(`div`,{dir:`rtl`,children:(0,v.jsx)(m,{label:`Labels`,options:[{value:`bug`,label:`Bug`,action:(0,v.jsx)(c,{label:`Edit Bug`,icon:`moreHorizontal`,variant:`ghost`,size:`sm`})},{value:`feature`,label:`Feature`}],value:e,onChange:t,isDefaultOpen:!0})})}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  render: args => {
    const [value, setValue] = useState<string[]>(['Role', 'Created']);
    return <MultiSelector {...args} label={args.label ?? 'Columns'} options={args.options ?? ['Name', 'Email', 'Role', 'Status', 'Created']} value={value} onChange={setValue} />;
  },
  args: {
    placeholder: 'Select columns...'
  }
}`,...w.parameters?.docs?.source}}},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Assigned teams',
    options: ['Design', 'Engineering', 'Marketing'],
    value: ['Design', 'Engineering'],
    onChange: () => {},
    hasClear: true,
    hasSearch: true,
    htmlName: 'teams',
    triggerDisplay: 'labels',
    isReadOnly: true
  }
}`,...T.parameters?.docs?.source}}},E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [value, setValue] = useState<string[]>([]);
    return <MultiSelector label="Teams" options={['Design', 'Engineering', 'Marketing', 'Operations']} value={value} onChange={setValue} hasSelectAll presentation="bottom-sheet" />;
  }
}`,...E.parameters?.docs?.source}}},D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [value, setValue] = useState<string[]>([]);
    return <MultiSelector label="Permissions" options={[{
      type: 'section',
      title: 'Read',
      options: [{
        value: 'read_posts',
        label: 'Read posts'
      }, {
        value: 'read_comments',
        label: 'Read comments'
      }, {
        value: 'read_users',
        label: 'Read users'
      }]
    }, {
      type: 'section',
      title: 'Write',
      options: [{
        value: 'write_posts',
        label: 'Write posts'
      }, {
        value: 'write_comments',
        label: 'Write comments'
      }]
    }]} value={value} onChange={setValue} placeholder="Select permissions..." />;
  },
  decorators: [Story => <Story />]
}`,...D.parameters?.docs?.source}}},O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [value, setValue] = useState<string[]>([]);
    return <MultiSelector label="Permissions" hasSearch options={[{
      type: 'section',
      title: 'Read',
      options: [{
        value: 'read_posts',
        label: 'Read posts'
      }, {
        value: 'read_comments',
        label: 'Read comments'
      }, {
        value: 'read_users',
        label: 'Read users'
      }]
    }, {
      type: 'section',
      title: 'Write',
      options: [{
        value: 'write_posts',
        label: 'Write posts'
      }, {
        value: 'write_comments',
        label: 'Write comments'
      }]
    }]} value={value} onChange={setValue} placeholder="Select permissions..." />;
  },
  decorators: [Story => <Story />]
}`,...O.parameters?.docs?.source}}},k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [value, setValue] = useState<string[]>([]);
    return <MultiSelector label="Columns" options={['Name', 'Email', 'Role', 'Status', 'Created', 'Updated']} value={value} onChange={setValue} hasSelectAll placeholder="Select columns..." />;
  },
  decorators: [Story => <Story />]
}`,...k.parameters?.docs?.source}}},A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [value, setValue] = useState<string[]>([]);
    return <MultiSelector label="Countries" options={['United States', 'United Kingdom', 'Canada', 'Australia', 'Germany', 'France', 'Japan', 'Brazil', 'India', 'Mexico']} value={value} onChange={setValue} hasSearch hasSelectAll placeholder="Select countries..." />;
  },
  decorators: [Story => <Story />]
}`,...A.parameters?.docs?.source}}},j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [a, setA] = useState<string[]>([]);
    const [b, setB] = useState<string[]>([]);
    const [c, setC] = useState<string[]>([]);
    const [d, setD] = useState<string[]>([]);
    return <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 16,
      width: 300
    }}>
        <MultiSelector label="No options (default)" options={[]} value={a} onChange={setA} />
        <MultiSelector label="No options (custom)" options={[]} value={b} onChange={setB} emptyText="No countries loaded yet" />
        <MultiSelector label="Search for xyz (custom)" options={['Canada', 'France', 'Japan']} value={c} onChange={setC} hasSearch emptySearchText="Nothing matches that country" />
        <MultiSelector label="Loading (no message)" options={[]} value={d} onChange={setD} isLoading />
      </div>;
  },
  decorators: [Story => <Story />]
}`,...j.parameters?.docs?.source}}},M.parameters={...M.parameters,docs:{...M.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [value1, setValue1] = useState<string[]>(['Name', 'Email']);
    const [value2, setValue2] = useState<string[]>(['Name', 'Email', 'Role']);
    const [value3, setValue3] = useState<string[]>(['Name', 'Email', 'Role', 'Status', 'Created']);
    return <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 16,
      width: 300
    }}>
        <MultiSelector label="Count (default)" options={['Name', 'Email', 'Role', 'Status', 'Created']} value={value1} onChange={setValue1} triggerDisplay="count" />
        <MultiSelector label="Labels" options={['Name', 'Email', 'Role', 'Status', 'Created']} value={value2} onChange={setValue2} triggerDisplay="labels" />
        <MultiSelector label="Badges" options={['Name', 'Email', 'Role', 'Status', 'Created']} value={value3} onChange={setValue3} triggerDisplay="badges" maxBadges={3} />
      </div>;
  },
  decorators: [Story => <Story />]
}`,...M.parameters?.docs?.source}}},N.parameters={...N.parameters,docs:{...N.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [value, setValue] = useState<string[]>(['admin']);
    return <MultiSelector label="Roles" options={[{
      value: 'admin',
      label: 'Admin',
      disabled: true
    }, {
      value: 'editor',
      label: 'Editor'
    }, {
      value: 'viewer',
      label: 'Viewer'
    }, {
      value: 'guest',
      label: 'Guest'
    }]} value={value} onChange={setValue} hasSelectAll placeholder="Select roles..." />;
  },
  decorators: [Story => <Story />]
}`,...N.parameters?.docs?.source}}},P.parameters={...P.parameters,docs:{...P.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [value, setValue] = useState<string[]>([]);
    return <MultiSelector label="Columns" options={['Name', 'Email', 'Role', 'Status', 'Created']} value={value} onChange={setValue} isDisabled disabledMessage="Select a table before choosing columns" placeholder="Select columns..." />;
  },
  decorators: [Story => <Story />]
}`,...P.parameters?.docs?.source}}},F.parameters={...F.parameters,docs:{...F.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [columns, setColumns] = useState<string[]>(['Name', 'Email']);
    const [filters, setFilters] = useState<string[]>(['Active']);
    return <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      width: 'max-content'
    }}>
        <Button label="Refresh" variant="ghost" />
        <MultiSelector label="Columns" isLabelHidden variant="ghost" size="md" options={['Name', 'Email', 'Role', 'Status', 'Created']} value={columns} onChange={setColumns} triggerDisplay="labels" placeholder="Columns" />
        <MultiSelector label="Status" isLabelHidden variant="ghost" size="md" options={['Active', 'Inactive', 'Pending', 'Archived']} value={filters} onChange={setFilters} triggerDisplay="labels" placeholder="Status" status={{
        type: 'warning',
        message: 'Some filters hide archived rows'
      }} statusVariant="tooltip" />
        <Button label="Export" variant="ghost" />
      </div>;
  },
  decorators: [Story => <Story />]
}`,...F.parameters?.docs?.source}}},I.parameters={...I.parameters,docs:{...I.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [columns, setColumns] = useState<string[]>(['Name', 'Email']);
    return <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      width: 'max-content'
    }}>
        <Button label="Refresh" variant="secondary" />
        <MultiSelector label="Columns" isLabelHidden variant="secondary" size="md" width={180} options={['Name', 'Email', 'Role', 'Status', 'Created']} value={columns} onChange={setColumns} triggerDisplay="labels" placeholder="Columns" />
        <Button label="Export" variant="secondary" />
      </div>;
  },
  decorators: [Story => <Story />],
  play: async ({
    canvasElement
  }) => {
    await document.fonts.ready;
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole('combobox', {
      name: 'Columns'
    });
    const root = canvasElement.querySelector<HTMLElement>('.astryx-multi-selector[data-variant="secondary"]');
    if (root == null) {
      throw new Error('Secondary MultiSelector root not found');
    }
    const widthBefore = root.getBoundingClientRect().width;
    expect(widthBefore).toBeCloseTo(180, 0);
    await userEvent.click(trigger);
    const listbox = within(document.body).getByRole('listbox');
    await userEvent.click(within(listbox).getByRole('option', {
      name: /Role/
    }));
    await waitFor(() => expect(root.getBoundingClientRect().width).toBeCloseTo(widthBefore, 0));
    await userEvent.keyboard('{Escape}');
    trigger.blur();
  }
}`,...I.parameters?.docs?.source}}},L.parameters={...L.parameters,docs:{...L.parameters?.docs,source:{originalSource:`{
  render: () => {
    const selector = (label: string) => <MultiSelector label={label} isLabelHidden variant="secondary" options={['Name', 'Email', 'Role']} value={['Name']} onChange={() => {}} />;
    return <div data-secondary-input-group-matrix style={{
      display: 'grid',
      gap: 16,
      width: 320
    }}>
        <InputGroup label="Secondary first" isLabelHidden>
          {selector('Columns first')}
          <InputGroupText>cols</InputGroupText>
        </InputGroup>
        <InputGroup label="Secondary middle" isLabelHidden>
          <InputGroupText>#</InputGroupText>
          {selector('Columns middle')}
          <InputGroupText>cols</InputGroupText>
        </InputGroup>
        <InputGroup label="Secondary last" isLabelHidden>
          <InputGroupText>#</InputGroupText>
          {selector('Columns last')}
        </InputGroup>
      </div>;
  },
  decorators: [Story => <Story />]
}`,...L.parameters?.docs?.source}}},R.parameters={...R.parameters,docs:{...R.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [value1, setValue1] = useState<string[]>([]);
    const [value2, setValue2] = useState<string[]>(['Email']);
    const [value3, setValue3] = useState<string[]>(['Name', 'Email']);
    return <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 16,
      width: 300
    }}>
        <MultiSelector label="Error" options={['Name', 'Email', 'Role']} value={value1} onChange={setValue1} status={{
        type: 'error',
        message: 'Please select at least one column'
      }} placeholder="Select..." />
        <MultiSelector label="Warning" options={['Name', 'Email', 'Role']} value={value2} onChange={setValue2} status={{
        type: 'warning',
        message: 'Email column has issues'
      }} />
        <MultiSelector label="Success" options={['Name', 'Email', 'Role']} value={value3} onChange={setValue3} status={{
        type: 'success'
      }} />
      </div>;
  },
  decorators: [Story => <Story />]
}`,...R.parameters?.docs?.source}}},B.parameters={...B.parameters,docs:{...B.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [value1, setValue1] = useState<string[]>([]);
    const [value2, setValue2] = useState<string[]>([]);
    const [value3, setValue3] = useState<string[]>([]);
    return <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 16,
      width: 300
    }}>
        <MultiSelector label="Small" size="sm" options={['Name', 'Email', 'Role']} value={value1} onChange={setValue1} placeholder="Small (28px)" />
        <MultiSelector label="Medium" size="md" options={['Name', 'Email', 'Role']} value={value2} onChange={setValue2} placeholder="Medium (32px)" />
        <MultiSelector label="Large" size="lg" options={['Name', 'Email', 'Role']} value={value3} onChange={setValue3} placeholder="Large (36px)" />
        <Theme theme={compactSizingTheme}>
          {(['sm', 'md', 'lg'] as const).map(size => <div key={size} style={{
          display: 'grid',
          gap: 8
        }}>
              {(['plain', 'start', 'option', 'status', 'tooltip', 'clear', 'loading', 'readonly'] as const).map(state => <MultiSelector key={state} label={\`Compact \${size} \${state}\`} size={size} options={[{
            value: 'name',
            label: 'Name',
            icon: state === 'option' ? 'search' : undefined
          }]} value={['name']} onChange={() => {}} startIcon={state === 'start' ? 'search' : undefined} status={state === 'status' || state === 'tooltip' ? {
            type: 'warning',
            message: 'Check selection'
          } : undefined} statusVariant={state === 'tooltip' ? 'tooltip' : 'attached'} hasClear={state === 'clear'} isLoading={state === 'loading'} isReadOnly={state === 'readonly'} />)}
            </div>)}
        </Theme>
      </div>;
  },
  decorators: [Story => <Story />],
  play: async ({
    canvasElement
  }) => {
    await document.fonts.ready;
    const triggers = canvasElement.querySelectorAll<HTMLElement>('.astryx-multi-selector');
    expect(triggers).toHaveLength(27);
    for (const trigger of triggers) {
      const size = Number.parseFloat(getComputedStyle(trigger).getPropertyValue(\`--size-element-\${trigger.dataset.size}\`));
      expect(trigger.getBoundingClientRect().height, trigger.textContent ?? '').toBeCloseTo(size, 1);
    }
  }
}`,...B.parameters?.docs?.source}}},V.parameters={...V.parameters,docs:{...V.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [columns, setColumns] = useState<string[]>(['name', 'email']);
    const [filters, setFilters] = useState<string[]>([]);
    return <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 16,
      width: 300
    }}>
        <MultiSelector label="Visible columns" description="Choose which columns to display in the table" options={[{
        value: 'name',
        label: 'Name'
      }, {
        value: 'email',
        label: 'Email'
      }, {
        value: 'role',
        label: 'Role'
      }, {
        value: 'status',
        label: 'Status'
      }, {
        value: 'created',
        label: 'Created at'
      }]} value={columns} onChange={setColumns} hasSelectAll isRequired triggerDisplay="labels" />
        <MultiSelector label="Status filter" description="Filter by status" options={['Active', 'Inactive', 'Pending', 'Archived']} value={filters} onChange={setFilters} isOptional triggerDisplay="badges" placeholder="All statuses" />
      </div>;
  },
  decorators: [Story => <Story />]
}`,...V.parameters?.docs?.source}}},H.parameters={...H.parameters,docs:{...H.parameters?.docs,source:{originalSource:`{
  render: () => {
    const allColumns = [{
      value: 'name',
      label: 'Name'
    }, {
      value: 'email',
      label: 'Email'
    }, {
      value: 'role',
      label: 'Role'
    }, {
      value: 'status',
      label: 'Status'
    }, {
      value: 'created',
      label: 'Created'
    }, {
      value: 'updated',
      label: 'Updated'
    }, {
      value: 'actions',
      label: 'Actions'
    }];
    const [visible, setVisible] = useState<string[]>(['name', 'email', 'role', 'status']);
    return <MultiSelector label="Columns" isLabelHidden options={allColumns} value={visible} onChange={setVisible} hasSelectAll hasSearch triggerDisplay="count" placeholder="Columns" />;
  },
  decorators: [Story => <Story />]
}`,...H.parameters?.docs?.source}}},U.parameters={...U.parameters,docs:{...U.parameters?.docs,source:{originalSource:`{
  render: args => {
    const [value, setValue] = useState<string[]>(['react', 'typescript']);
    return <MultiSelector {...args} options={[{
      value: 'react',
      label: 'React'
    }, {
      value: 'typescript',
      label: 'TypeScript'
    }, {
      value: 'stylex',
      label: 'StyleX'
    }, {
      value: 'vitest',
      label: 'Vitest'
    }]} value={value} onChange={setValue} hasClear />;
  },
  args: {
    label: 'Technologies',
    placeholder: 'Select technologies...'
  }
}`,...U.parameters?.docs?.source}}},W.parameters={...W.parameters,docs:{...W.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [a, setA] = useState<string[]>([]);
    const [b, setB] = useState<string[]>([]);
    return <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 24,
      width: 300
    }}>
        <MultiSelector label="Attached (default)" options={['Name', 'Email', 'Role']} value={a} onChange={setA} status={{
        type: 'error',
        message: 'Select at least one column'
      }} placeholder="Select..." />
        <MultiSelector label="Detached" options={['Name', 'Email', 'Role']} value={b} onChange={setB} status={{
        type: 'error',
        message: 'Select at least one column'
      }} statusVariant="detached" placeholder="Select..." />
      </div>;
  },
  decorators: [Story => <Story />]
}`,...W.parameters?.docs?.source}}},K.parameters={...K.parameters,docs:{...K.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [value, setValue] = useState<string[]>(['Apple', 'Banana']);
    return <Theme theme={iconTheme} mode="light">
        <MultiSelector label="Icons themed (accent on hover/open)" options={['Apple', 'Banana', 'Orange']} value={value} onChange={setValue} hasClear />
      </Theme>;
  }
}`,...K.parameters?.docs?.source}}},q.parameters={...q.parameters,docs:{...q.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [value, setValue] = useState<string[]>(['Name', 'Email']);
    return (
      // No hasSelectAll: its divider is an unallowed listbox child and fails
      // the a11y audit as soon as a story opens the popup (#4994).
      <MultiSelector label="Columns" options={['Name', 'Email', 'Role', 'Status']} value={value} onChange={setValue} indicatorPosition="end" isDefaultOpen />
    );
  }
}`,...q.parameters?.docs?.source},description:{story:'`indicatorPosition="end"` moves the checkbox to the trailing edge of each\nrow. The default is `start`, where the checkbox leads the label as it does in\nCheckboxList.',...q.parameters?.docs?.description}}},J.parameters={...J.parameters,docs:{...J.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [options, setOptions] = useState([{
      value: 'bug',
      label: 'Bug'
    }, {
      value: 'feature',
      label: 'Feature'
    }, {
      value: 'docs',
      label: 'Docs'
    }]);
    const [value, setValue] = useState<string[]>(['bug']);
    return <MultiSelector label="Labels" options={options} value={value} onChange={(next, change) => {
      if (change?.type === 'create') {
        setOptions(current => [...current, {
          value: change.query,
          label: change.query
        }]);
      }
      setValue(next);
    }} hasSearch hasCreate triggerDisplay="badges" isDefaultOpen />;
  }
}`,...J.parameters?.docs?.source}}},Y.parameters={...Y.parameters,docs:{...Y.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [value, setValue] = useState<string[]>(['feature']);
    const [lastEdited, setLastEdited] = useState<string | null>(null);
    const action = (label: string) => <IconButton label={\`Edit \${label}\`} icon="moreHorizontal" variant="ghost" size="sm" tooltip={\`Edit \${label}\`} onClick={() => setLastEdited(label)} />;
    return <>
        <MultiSelector label="Labels" options={[{
        type: 'section',
        title: 'Type',
        options: [{
          value: 'feature',
          label: 'Feature'
        }, {
          value: 'bug',
          label: 'Bug',
          action: action('Bug')
        }, {
          value: 'docs',
          label: 'Docs'
        }, {
          value: 'review',
          label: 'Design review',
          action: action('Design review')
        }]
      }, {
        type: 'section',
        title: 'Priority',
        options: [{
          value: 'p0',
          label: 'P0',
          action: action('P0')
        }, {
          value: 'p1',
          label: 'P1',
          action: action('P1')
        }]
      }]} value={value} onChange={setValue} hasSearch hasSelectAll hasClear triggerDisplay="badges" isDefaultOpen />
        <output data-testid="last-edited">{lastEdited ?? ''}</output>
      </>;
  }
}`,...Y.parameters?.docs?.source}}},X.parameters={...X.parameters,docs:{...X.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [value, setValue] = useState<string[]>([]);
    return <div dir="rtl">
        <MultiSelector label="Labels" options={[{
        value: 'bug',
        label: 'Bug',
        action: <IconButton label="Edit Bug" icon="moreHorizontal" variant="ghost" size="sm" />
      }, {
        value: 'feature',
        label: 'Feature'
      }]} value={value} onChange={setValue} isDefaultOpen />
      </div>;
  }
}`,...X.parameters?.docs?.source}}},Z=[`Default`,`ReadOnly`,`BottomSheetPresentation`,`Sections`,`SearchableSections`,`SelectAll`,`Searchable`,`EmptyStates`,`TriggerModes`,`DisabledItems`,`DisabledWithMessage`,`GhostVariant`,`SecondaryVariant`,`SecondaryInInputGroup`,`Status`,`Sizes`,`FormComposition`,`ColumnVisibility`,`Clearable`,`StatusVariantComparison`,`ThemedIcons`,`EndIndicatorPosition`,`CreateFromQuery`,`RowActions`,`RowActionsRtl`]})))()}Q();export{E as BottomSheetPresentation,U as Clearable,H as ColumnVisibility,J as CreateFromQuery,w as Default,N as DisabledItems,P as DisabledWithMessage,j as EmptyStates,q as EndIndicatorPosition,V as FormComposition,F as GhostVariant,T as ReadOnly,Y as RowActions,X as RowActionsRtl,A as Searchable,O as SearchableSections,L as SecondaryInInputGroup,I as SecondaryVariant,D as Sections,k as SelectAll,B as Sizes,R as Status,W as StatusVariantComparison,K as ThemedIcons,M as TriggerModes,Z as __namedExportsOrder,C as default};