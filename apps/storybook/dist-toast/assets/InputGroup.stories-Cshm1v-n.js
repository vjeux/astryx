import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{t}from"./react-DlPsW1c0.js";import{t as n}from"./jsx-runtime-MKhVqBIO.js";import{n as r,t as i}from"./Icon-BmO5FtDV.js";import{n as a,t as o}from"./Button-DoGM0DEN.js";import{n as s,t as c}from"./Selector-MAEgY-r1.js";import{n as l,t as u}from"./InputGroup-BWTkP6pA.js";import{n as d,t as f}from"./InputGroupText-Dko_Ilc1.js";import{n as p,t as m}from"./DateInput-CHI86NkI.js";import{n as h,t as g}from"./MultiSelector-DlFWmlLw.js";import{n as _,t as v}from"./TextInput-LGxpinPt.js";import{n as y,t as b}from"./TimeInput-ghxif3Hl.js";import{n as x,t as S}from"./NumberInput-CXlV3t9e.js";import{n as ee,t as C}from"./Typeahead-BOmIKfL8.js";var w,T,E,D,O,k,A,j,M,N,P,F,I,L,R,z,B,V,H,U,W,G,K,q,J,Y,X,Z,Q;function $(){return($=e((()=>{w=t(),a(),l(),d(),_(),x(),y(),p(),ee(),s(),h(),r(),T=n(),E=[{id:`1`,label:`Apple`},{id:`2`,label:`Banana`},{id:`3`,label:`Cherry`},{id:`4`,label:`Date`},{id:`5`,label:`Elderberry`},{id:`6`,label:`Fig`},{id:`7`,label:`Grape`}],D={search:e=>E.filter(t=>t.label.toLowerCase().includes(e.toLowerCase())),bootstrap:()=>E.slice(0,5)},O={title:`Core/InputGroup`,component:u,tags:[`autodocs`],argTypes:{label:{control:`text`,description:`Label text (required)`},isLabelHidden:{control:`boolean`,description:`Visually hide the label`},description:{control:`text`,description:`Description text`},isDisabled:{control:`boolean`,description:`Disable the group`},size:{control:`radio`,options:[`sm`,`md`,`lg`],description:`Input size`}}},k=[`Design Systems`,`Infrastructure`,`Product`],A=[`Only me`,`Members`,`Anyone`],j=[`+1`,`+44`,`+81`],M={render:e=>{let[t,n]=(0,w.useState)(``);return(0,T.jsxs)(u,{...e,children:[(0,T.jsx)(f,{children:`$`}),(0,T.jsx)(v,{label:`Amount`,isLabelHidden:!0,value:t,onChange:n,placeholder:`0.00`})]})},args:{label:`Price`}},N={render:e=>{let[t,n]=(0,w.useState)(``);return(0,T.jsxs)(u,{...e,children:[(0,T.jsx)(v,{label:`Weight`,isLabelHidden:!0,value:t,onChange:n,placeholder:`0`}),(0,T.jsx)(f,{children:`kg`})]})},args:{label:`Weight`}},P={render:e=>{let[t,n]=(0,w.useState)(``);return(0,T.jsxs)(u,{...e,children:[(0,T.jsx)(f,{children:`https://`}),(0,T.jsx)(v,{label:`URL`,isLabelHidden:!0,value:t,onChange:n,placeholder:`example`}),(0,T.jsx)(f,{children:`.com`})]})},args:{label:`Website`}},F={render:e=>{let[t,n]=(0,w.useState)(``);return(0,T.jsxs)(u,{...e,children:[(0,T.jsx)(f,{children:(0,T.jsx)(i,{icon:`search`,size:`sm`,color:`secondary`})}),(0,T.jsx)(v,{label:`Search`,isLabelHidden:!0,value:t,onChange:n,placeholder:`Search...`})]})},args:{label:`Search`,isLabelHidden:!0}},I={render:e=>{let[t,n]=(0,w.useState)(null);return(0,T.jsxs)(u,{...e,children:[(0,T.jsx)(f,{children:`Fruit`}),(0,T.jsx)(C,{label:`Selection`,isLabelHidden:!0,searchSource:D,value:t,onChange:n,placeholder:`Search fruits...`,hasEntriesOnFocus:!0})]})},args:{label:`Favorite fruit`,description:`Select one fruit from the list`}},L={render:e=>{let[t,n]=(0,w.useState)(void 0);return(0,T.jsxs)(u,{...e,children:[(0,T.jsx)(f,{children:`$`}),(0,T.jsx)(S,{label:`Amount`,isLabelHidden:!0,value:t,onChange:n,placeholder:`0.00`})]})},args:{label:`Budget`}},R={render:e=>{let[t,n]=(0,w.useState)(`09:00`);return(0,T.jsxs)(u,{...e,children:[(0,T.jsx)(f,{children:`Starts`}),(0,T.jsx)(b,{label:`Start time`,isLabelHidden:!0,value:t,onChange:n,hourFormat:`24h`,placeholder:`09:00`})]})},args:{label:`Schedule`,description:`Use local time`}},z={render:e=>{let[t,n]=(0,w.useState)(void 0);return(0,T.jsxs)(u,{...e,children:[(0,T.jsx)(f,{children:`Due`}),(0,T.jsx)(m,{label:`Date`,isLabelHidden:!0,value:t,onChange:n,placeholder:`Select date`})]})},args:{label:`Deadline`,description:`Pick the due date`}},B={render:e=>{let[t,n]=(0,w.useState)(void 0);return(0,T.jsxs)(u,{...e,children:[(0,T.jsx)(f,{children:`Team`}),(0,T.jsx)(c,{label:`Owner`,isLabelHidden:!0,options:k,value:t,onChange:n,placeholder:`Choose owner`})]})},args:{label:`Default owner`}},V={render:e=>{let[t,n]=(0,w.useState)(`Members`);return(0,T.jsxs)(u,{...e,children:[(0,T.jsx)(c,{label:`Audience`,isLabelHidden:!0,options:A,value:t,onChange:n}),(0,T.jsx)(o,{label:`Save`})]})},args:{label:`Visibility`}},H={render:()=>{let[e,t]=(0,w.useState)(``),[n,r]=(0,w.useState)(``),[i,a]=(0,w.useState)(`Members`);return(0,T.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:16,maxWidth:520},children:[(0,T.jsxs)(u,{label:`Prefix action`,size:`sm`,children:[(0,T.jsx)(o,{label:`Paste`}),(0,T.jsx)(v,{label:`Code`,isLabelHidden:!0,value:e,onChange:t,placeholder:`Enter code`})]}),(0,T.jsxs)(u,{label:`Text action`,size:`md`,children:[(0,T.jsx)(v,{label:`Query`,isLabelHidden:!0,value:n,onChange:r,placeholder:`Search`}),(0,T.jsx)(o,{label:`Search`,variant:`primary`})]}),(0,T.jsxs)(u,{label:`Selector action`,size:`lg`,children:[(0,T.jsx)(c,{label:`Audience`,isLabelHidden:!0,options:A,value:i,onChange:a}),(0,T.jsx)(o,{label:`Save`,tooltip:`Save visibility`})]})]})}},U={render:e=>{let[t,n]=(0,w.useState)(`example`);return(0,T.jsxs)(u,{...e,children:[(0,T.jsx)(v,{label:`URL`,value:t,onChange:n,htmlName:`website`,disabledMessage:`Website editing is unavailable`}),(0,T.jsx)(o,{label:`Clear`,onClick:()=>n(``)})]})},args:{label:`Website`,description:`The input and action inherit the group disabled state.`,isDisabled:!0}},W={render:e=>{let[t,n]=(0,w.useState)([]);return(0,T.jsxs)(u,{...e,children:[(0,T.jsx)(f,{children:`Teams`}),(0,T.jsx)(g,{label:`Owners`,isLabelHidden:!0,options:k,value:t,onChange:n,placeholder:`Choose owners`})]})},args:{label:`Default owners`,description:`Select one or more teams`}},G={render:e=>{let[t,n]=(0,w.useState)(``);return(0,T.jsxs)(u,{...e,children:[(0,T.jsx)(f,{children:`@`}),(0,T.jsx)(v,{label:`Username`,isLabelHidden:!0,value:t,onChange:n,placeholder:`username`})]})},args:{label:`Username`,description:`Your public display name`}},K={render:e=>{let[t,n]=(0,w.useState)(``);return(0,T.jsxs)(u,{...e,children:[(0,T.jsx)(f,{children:`$`}),(0,T.jsx)(v,{label:`Amount`,isLabelHidden:!0,value:t,onChange:n,placeholder:`0.00`})]})},args:{label:`Price`,status:{type:`error`,message:`Price is required`}}},q={render:e=>{let[t,n]=(0,w.useState)(``);return(0,T.jsxs)(u,{...e,children:[(0,T.jsx)(f,{children:`$`}),(0,T.jsx)(v,{label:`Amount`,isLabelHidden:!0,value:t,onChange:n,placeholder:`0.00`})]})},args:{label:`Price`,size:`sm`}},J={render:e=>{let[t,n]=(0,w.useState)(``);return(0,T.jsx)(`div`,{style:{maxWidth:500},children:(0,T.jsxs)(u,{...e,children:[(0,T.jsx)(f,{children:`https://`}),(0,T.jsx)(v,{label:`URL`,isLabelHidden:!0,value:t,onChange:n,placeholder:`example.com`})]})})},args:{label:`Website URL`}},Y={render:e=>{let[t,n]=(0,w.useState)(``),[r,i]=(0,w.useState)(``);return(0,T.jsxs)(u,{...e,children:[(0,T.jsx)(v,{label:`Address`,isLabelHidden:!0,value:t,onChange:n,placeholder:`Address`}),(0,T.jsx)(f,{children:`@`}),(0,T.jsx)(v,{label:`Domain`,isLabelHidden:!0,value:r,onChange:i,placeholder:`Domain`})]})},args:{label:`Email`}},X={render:()=>{let[e,t]=(0,w.useState)(``),[n,r]=(0,w.useState)(``),[i,a]=(0,w.useState)(``),[o,s]=(0,w.useState)(``),[l,d]=(0,w.useState)(null),[p,m]=(0,w.useState)(void 0);return(0,T.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:`16px`,maxWidth:`400px`},children:[(0,T.jsxs)(u,{label:`Price`,children:[(0,T.jsx)(f,{children:`$`}),(0,T.jsx)(v,{label:`Amount`,isLabelHidden:!0,value:e,onChange:t,placeholder:`0.00`})]}),(0,T.jsxs)(u,{label:`Website`,children:[(0,T.jsx)(f,{children:`https://`}),(0,T.jsx)(v,{label:`URL`,isLabelHidden:!0,value:n,onChange:r,placeholder:`example`}),(0,T.jsx)(f,{children:`.com`})]}),(0,T.jsxs)(u,{label:`Favorite fruit`,children:[(0,T.jsx)(f,{children:`Fruit`}),(0,T.jsx)(C,{label:`Selection`,isLabelHidden:!0,searchSource:D,value:l,onChange:d,placeholder:`Search fruits...`,hasEntriesOnFocus:!0})]}),(0,T.jsxs)(u,{label:`Weight`,children:[(0,T.jsx)(v,{label:`Weight`,isLabelHidden:!0,value:i,onChange:a,placeholder:`0`}),(0,T.jsx)(f,{children:`kg`})]}),(0,T.jsxs)(u,{label:`Price`,status:{type:`error`,message:`Price is required`},children:[(0,T.jsx)(f,{children:`$`}),(0,T.jsx)(v,{label:`Amount`,isLabelHidden:!0,value:o,onChange:s,placeholder:`0.00`})]}),(0,T.jsxs)(u,{label:`Default owner`,children:[(0,T.jsx)(f,{children:`Team`}),(0,T.jsx)(c,{label:`Owner`,isLabelHidden:!0,options:k,value:p,onChange:m,placeholder:`Choose owner`})]})]})}},Z={render:e=>{let[t,n]=(0,w.useState)(`+1`),[r,i]=(0,w.useState)(``);return(0,T.jsxs)(u,{...e,children:[(0,T.jsx)(c,{label:`Country code`,isLabelHidden:!0,options:j,value:t,onChange:n}),(0,T.jsx)(v,{label:`Number`,isLabelHidden:!0,value:r,onChange:i,placeholder:`555 0100`})]})},args:{label:`Phone`}},M.parameters={...M.parameters,docs:{...M.parameters?.docs,source:{originalSource:`{
  render: args => {
    const [value, setValue] = useState('');
    return <InputGroup {...args}>
        <InputGroupText>$</InputGroupText>
        <TextInput label="Amount" isLabelHidden value={value} onChange={setValue} placeholder="0.00" />
      </InputGroup>;
  },
  args: {
    label: 'Price'
  }
}`,...M.parameters?.docs?.source}}},N.parameters={...N.parameters,docs:{...N.parameters?.docs,source:{originalSource:`{
  render: args => {
    const [value, setValue] = useState('');
    return <InputGroup {...args}>
        <TextInput label="Weight" isLabelHidden value={value} onChange={setValue} placeholder="0" />
        <InputGroupText>kg</InputGroupText>
      </InputGroup>;
  },
  args: {
    label: 'Weight'
  }
}`,...N.parameters?.docs?.source}}},P.parameters={...P.parameters,docs:{...P.parameters?.docs,source:{originalSource:`{
  render: args => {
    const [value, setValue] = useState('');
    return <InputGroup {...args}>
        <InputGroupText>https://</InputGroupText>
        <TextInput label="URL" isLabelHidden value={value} onChange={setValue} placeholder="example" />
        <InputGroupText>.com</InputGroupText>
      </InputGroup>;
  },
  args: {
    label: 'Website'
  }
}`,...P.parameters?.docs?.source}}},F.parameters={...F.parameters,docs:{...F.parameters?.docs,source:{originalSource:`{
  render: args => {
    const [value, setValue] = useState('');
    return <InputGroup {...args}>
        <InputGroupText>
          <Icon icon="search" size="sm" color="secondary" />
        </InputGroupText>
        <TextInput label="Search" isLabelHidden value={value} onChange={setValue} placeholder="Search..." />
      </InputGroup>;
  },
  args: {
    label: 'Search',
    isLabelHidden: true
  }
}`,...F.parameters?.docs?.source}}},I.parameters={...I.parameters,docs:{...I.parameters?.docs,source:{originalSource:`{
  render: args => {
    const [value, setValue] = useState<SearchableItem | null>(null);
    return <InputGroup {...args}>
        <InputGroupText>Fruit</InputGroupText>
        <Typeahead label="Selection" isLabelHidden searchSource={fruitSource} value={value} onChange={setValue} placeholder="Search fruits..." hasEntriesOnFocus />
      </InputGroup>;
  },
  args: {
    label: 'Favorite fruit',
    description: 'Select one fruit from the list'
  }
}`,...I.parameters?.docs?.source}}},L.parameters={...L.parameters,docs:{...L.parameters?.docs,source:{originalSource:`{
  render: args => {
    const [value, setValue] = useState<number | undefined>(undefined);
    return <InputGroup {...args}>
        <InputGroupText>$</InputGroupText>
        <NumberInput label="Amount" isLabelHidden value={value} onChange={setValue} placeholder="0.00" />
      </InputGroup>;
  },
  args: {
    label: 'Budget'
  }
}`,...L.parameters?.docs?.source}}},R.parameters={...R.parameters,docs:{...R.parameters?.docs,source:{originalSource:`{
  render: args => {
    const [value, setValue] = useState<ISOTimeString | undefined>('09:00' as ISOTimeString);
    return <InputGroup {...args}>
        <InputGroupText>Starts</InputGroupText>
        <TimeInput label="Start time" isLabelHidden value={value} onChange={setValue} hourFormat="24h" placeholder="09:00" />
      </InputGroup>;
  },
  args: {
    label: 'Schedule',
    description: 'Use local time'
  }
}`,...R.parameters?.docs?.source}}},z.parameters={...z.parameters,docs:{...z.parameters?.docs,source:{originalSource:`{
  render: args => {
    const [value, setValue] = useState<ISODateString | undefined>(undefined);
    return <InputGroup {...args}>
        <InputGroupText>Due</InputGroupText>
        <DateInput label="Date" isLabelHidden value={value} onChange={setValue} placeholder="Select date" />
      </InputGroup>;
  },
  args: {
    label: 'Deadline',
    description: 'Pick the due date'
  }
}`,...z.parameters?.docs?.source}}},B.parameters={...B.parameters,docs:{...B.parameters?.docs,source:{originalSource:`{
  render: args => {
    const [value, setValue] = useState<string | undefined>(undefined);
    return <InputGroup {...args}>
        <InputGroupText>Team</InputGroupText>
        <Selector label="Owner" isLabelHidden options={TEAM_OPTIONS} value={value} onChange={setValue} placeholder="Choose owner" />
      </InputGroup>;
  },
  args: {
    label: 'Default owner'
  }
}`,...B.parameters?.docs?.source}}},V.parameters={...V.parameters,docs:{...V.parameters?.docs,source:{originalSource:`{
  render: args => {
    const [value, setValue] = useState<string | undefined>('Members');
    return <InputGroup {...args}>
        <Selector label="Audience" isLabelHidden options={VISIBILITY_OPTIONS} value={value} onChange={setValue} />
        <Button label="Save" />
      </InputGroup>;
  },
  args: {
    label: 'Visibility'
  }
}`,...V.parameters?.docs?.source}}},H.parameters={...H.parameters,docs:{...H.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [prefixValue, setPrefixValue] = useState('');
    const [suffixValue, setSuffixValue] = useState('');
    const [visibility, setVisibility] = useState<string | undefined>('Members');
    return <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 16,
      maxWidth: 520
    }}>
        <InputGroup label="Prefix action" size="sm">
          <Button label="Paste" />
          <TextInput label="Code" isLabelHidden value={prefixValue} onChange={setPrefixValue} placeholder="Enter code" />
        </InputGroup>
        <InputGroup label="Text action" size="md">
          <TextInput label="Query" isLabelHidden value={suffixValue} onChange={setSuffixValue} placeholder="Search" />
          <Button label="Search" variant="primary" />
        </InputGroup>
        <InputGroup label="Selector action" size="lg">
          <Selector label="Audience" isLabelHidden options={VISIBILITY_OPTIONS} value={visibility} onChange={setVisibility} />
          <Button label="Save" tooltip="Save visibility" />
        </InputGroup>
      </div>;
  }
}`,...H.parameters?.docs?.source}}},U.parameters={...U.parameters,docs:{...U.parameters?.docs,source:{originalSource:`{
  render: args => {
    const [value, setValue] = useState('example');
    return <InputGroup {...args}>
        <TextInput label="URL" value={value} onChange={setValue} htmlName="website" disabledMessage="Website editing is unavailable" />
        <Button label="Clear" onClick={() => setValue('')} />
      </InputGroup>;
  },
  args: {
    label: 'Website',
    description: 'The input and action inherit the group disabled state.',
    isDisabled: true
  }
}`,...U.parameters?.docs?.source}}},W.parameters={...W.parameters,docs:{...W.parameters?.docs,source:{originalSource:`{
  render: args => {
    const [value, setValue] = useState<string[]>([]);
    return <InputGroup {...args}>
        <InputGroupText>Teams</InputGroupText>
        <MultiSelector label="Owners" isLabelHidden options={TEAM_OPTIONS} value={value} onChange={setValue} placeholder="Choose owners" />
      </InputGroup>;
  },
  args: {
    label: 'Default owners',
    description: 'Select one or more teams'
  }
}`,...W.parameters?.docs?.source}}},G.parameters={...G.parameters,docs:{...G.parameters?.docs,source:{originalSource:`{
  render: args => {
    const [value, setValue] = useState('');
    return <InputGroup {...args}>
        <InputGroupText>@</InputGroupText>
        <TextInput label="Username" isLabelHidden value={value} onChange={setValue} placeholder="username" />
      </InputGroup>;
  },
  args: {
    label: 'Username',
    description: 'Your public display name'
  }
}`,...G.parameters?.docs?.source}}},K.parameters={...K.parameters,docs:{...K.parameters?.docs,source:{originalSource:`{
  render: args => {
    const [value, setValue] = useState('');
    return <InputGroup {...args}>
        <InputGroupText>$</InputGroupText>
        <TextInput label="Amount" isLabelHidden value={value} onChange={setValue} placeholder="0.00" />
      </InputGroup>;
  },
  args: {
    label: 'Price',
    status: {
      type: 'error',
      message: 'Price is required'
    }
  }
}`,...K.parameters?.docs?.source}}},q.parameters={...q.parameters,docs:{...q.parameters?.docs,source:{originalSource:`{
  render: args => {
    const [value, setValue] = useState('');
    return <InputGroup {...args}>
        <InputGroupText>$</InputGroupText>
        <TextInput label="Amount" isLabelHidden value={value} onChange={setValue} placeholder="0.00" />
      </InputGroup>;
  },
  args: {
    label: 'Price',
    size: 'sm'
  }
}`,...q.parameters?.docs?.source}}},J.parameters={...J.parameters,docs:{...J.parameters?.docs,source:{originalSource:`{
  render: args => {
    const [value, setValue] = useState('');
    return <div style={{
      maxWidth: 500
    }}>
        <InputGroup {...args}>
          <InputGroupText>https://</InputGroupText>
          <TextInput label="URL" isLabelHidden value={value} onChange={setValue} placeholder="example.com" />
        </InputGroup>
      </div>;
  },
  args: {
    label: 'Website URL'
  }
}`,...J.parameters?.docs?.source}}},Y.parameters={...Y.parameters,docs:{...Y.parameters?.docs,source:{originalSource:`{
  render: args => {
    const [left, setLeft] = useState('');
    const [right, setRight] = useState('');
    return <InputGroup {...args}>
        <TextInput label="Address" isLabelHidden value={left} onChange={setLeft} placeholder="Address" />
        <InputGroupText>@</InputGroupText>
        <TextInput label="Domain" isLabelHidden value={right} onChange={setRight} placeholder="Domain" />
      </InputGroup>;
  },
  args: {
    label: 'Email'
  }
}`,...Y.parameters?.docs?.source}}},X.parameters={...X.parameters,docs:{...X.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [v1, setV1] = useState('');
    const [v2, setV2] = useState('');
    const [v3, setV3] = useState('');
    const [v4, setV4] = useState('');
    const [v5, setV5] = useState<SearchableItem | null>(null);
    const [v6, setV6] = useState<string | undefined>(undefined);
    return <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
      maxWidth: '400px'
    }}>
        <InputGroup label="Price">
          <InputGroupText>$</InputGroupText>
          <TextInput label="Amount" isLabelHidden value={v1} onChange={setV1} placeholder="0.00" />
        </InputGroup>
        <InputGroup label="Website">
          <InputGroupText>https://</InputGroupText>
          <TextInput label="URL" isLabelHidden value={v2} onChange={setV2} placeholder="example" />
          <InputGroupText>.com</InputGroupText>
        </InputGroup>
        <InputGroup label="Favorite fruit">
          <InputGroupText>Fruit</InputGroupText>
          <Typeahead label="Selection" isLabelHidden searchSource={fruitSource} value={v5} onChange={setV5} placeholder="Search fruits..." hasEntriesOnFocus />
        </InputGroup>
        <InputGroup label="Weight">
          <TextInput label="Weight" isLabelHidden value={v3} onChange={setV3} placeholder="0" />
          <InputGroupText>kg</InputGroupText>
        </InputGroup>
        <InputGroup label="Price" status={{
        type: 'error',
        message: 'Price is required'
      }}>
          <InputGroupText>$</InputGroupText>
          <TextInput label="Amount" isLabelHidden value={v4} onChange={setV4} placeholder="0.00" />
        </InputGroup>
        <InputGroup label="Default owner">
          <InputGroupText>Team</InputGroupText>
          <Selector label="Owner" isLabelHidden options={TEAM_OPTIONS} value={v6} onChange={setV6} placeholder="Choose owner" />
        </InputGroup>
      </div>;
  }
}`,...X.parameters?.docs?.source}}},Z.parameters={...Z.parameters,docs:{...Z.parameters?.docs,source:{originalSource:`{
  render: args => {
    const [code, setCode] = useState<string | undefined>('+1');
    const [number, setNumber] = useState('');
    return <InputGroup {...args}>
        <Selector label="Country code" isLabelHidden options={COUNTRY_CODE_OPTIONS} value={code} onChange={setCode} />
        <TextInput label="Number" isLabelHidden value={number} onChange={setNumber} placeholder="555 0100" />
      </InputGroup>;
  },
  args: {
    label: 'Phone'
  }
}`,...Z.parameters?.docs?.source},description:{story:`Two inputs side by side, with no addon between them. Focus either one: its
whole focus ring shows, because a focused member stays above its
neighbour.`,...Z.parameters?.docs?.description}}},Q=[`WithPrefix`,`WithSuffix`,`WithPrefixAndSuffix`,`WithIconPrefix`,`WithTypeahead`,`WithNumberInput`,`WithTimeInput`,`WithDateInput`,`WithSelector`,`WithActionButton`,`ActionButtonCombinations`,`Disabled`,`WithMultiSelector`,`WithDescription`,`WithErrorStatus`,`SmallSize`,`FullWidth`,`TwoInputs`,`AllVariations`,`AdjacentInputs`]})))()}$();export{H as ActionButtonCombinations,Z as AdjacentInputs,X as AllVariations,U as Disabled,J as FullWidth,q as SmallSize,Y as TwoInputs,V as WithActionButton,z as WithDateInput,G as WithDescription,K as WithErrorStatus,F as WithIconPrefix,W as WithMultiSelector,L as WithNumberInput,M as WithPrefix,P as WithPrefixAndSuffix,B as WithSelector,N as WithSuffix,R as WithTimeInput,I as WithTypeahead,Q as __namedExportsOrder,O as default};