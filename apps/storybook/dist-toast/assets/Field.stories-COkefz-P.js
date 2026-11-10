import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{t}from"./react-DlPsW1c0.js";import{t as n}from"./jsx-runtime-MKhVqBIO.js";import{n as r,t as i}from"./Icon-BmO5FtDV.js";import{n as a,t as o}from"./HStack-D5idGciI.js";import{n as s,t as c}from"./StackItem-BBK-dp_K.js";import{n as l,t as u}from"./Field-CBd_4iOL.js";import{n as d,t as f}from"./Selector-MAEgY-r1.js";import{n as p,t as m}from"./FormLayout-CAcZ3H26.js";import{n as h,t as g}from"./TextInput-LGxpinPt.js";import{n as _,t as v}from"./EnvelopeIcon-Co-cTi_D.js";function y({wrap:e=`wrap`}){let[t,n]=(0,b.useState)(``),[r,a]=(0,b.useState)(`Awaiting fulfillment`),[s,l]=(0,b.useState)(`All regions`),[u,d]=(0,b.useState)(`Newest first`);return(0,x.jsxs)(o,{gap:2,wrap:e,vAlign:`center`,children:[(0,x.jsx)(c,{size:`fill`,children:(0,x.jsx)(g,{label:`Search orders`,isLabelHidden:!0,placeholder:`Search by order or customer`,startIcon:(0,x.jsx)(i,{icon:`search`}),value:t,onChange:n})}),(0,x.jsx)(f,{label:`Status`,isLabelHidden:!0,options:[`All statuses`,`Awaiting fulfillment`,`Shipped`,`Delivered`,`Returned`],value:r,onChange:a}),(0,x.jsx)(f,{label:`Region`,isLabelHidden:!0,options:[`All regions`,`North America`,`Europe`,`Asia Pacific`],value:s,onChange:l}),(0,x.jsx)(f,{label:`Sort`,isLabelHidden:!0,options:[`Newest first`,`Oldest first`,`Highest total`],value:u,onChange:d})]})}var b,x,S,C,w,T,E,D,O,k,A,j,M,N,P,F,I;function L(){return(L=e((()=>{b=t(),l(),p(),h(),a(),r(),d(),s(),_(),x=n(),S=({id:e,describedBy:t,placeholder:n,value:r,onChange:i})=>(0,x.jsx)(`input`,{id:e,"aria-describedby":t,placeholder:n,value:r,onChange:e=>i(e.target.value),className:`xh8yej3 x9f619 x9ynric xif65rj xce4md1 xrrkdod xmkeg23 x1y0btm7 x14i3s5s xh6dtrn x10xzikg x1tgivj0 x1a2a7pz xnw553j`}),C={title:`Core/Field`,component:u,tags:[`autodocs`],argTypes:{label:{control:`text`},isLabelHidden:{control:`boolean`},description:{control:`text`},isOptional:{control:`boolean`},isRequired:{control:`boolean`},labelTooltip:{control:`text`}}},w={args:{label:`Email`},render:e=>{let[t,n]=(0,b.useState)(``);return(0,x.jsx)(u,{...e,inputID:`email-input`,children:(0,x.jsx)(S,{id:`email-input`,placeholder:`you@example.com`,value:t,onChange:n})})}},T={args:{label:`Email`,description:`We'll never share your email.`},render:e=>{let[t,n]=(0,b.useState)(``);return(0,x.jsx)(u,{...e,inputID:`email-desc-input`,descriptionID:`email-desc`,children:(0,x.jsx)(S,{id:`email-desc-input`,describedBy:`email-desc`,placeholder:`you@example.com`,value:t,onChange:n})})}},E={args:{label:`Search`,isLabelHidden:!0},render:e=>{let[t,n]=(0,b.useState)(``);return(0,x.jsx)(u,{...e,inputID:`search-input`,children:(0,x.jsx)(S,{id:`search-input`,placeholder:`Search...`,value:t,onChange:n})})}},D={args:{label:`Nickname`,isOptional:!0},render:e=>{let[t,n]=(0,b.useState)(``);return(0,x.jsx)(u,{...e,inputID:`nickname-input`,children:(0,x.jsx)(S,{id:`nickname-input`,placeholder:`Enter your nickname`,value:t,onChange:n})})}},O={args:{label:`Username`,isRequired:!0},render:e=>{let[t,n]=(0,b.useState)(``);return(0,x.jsx)(u,{...e,inputID:`username-input`,children:(0,x.jsx)(S,{id:`username-input`,placeholder:`Enter your username`,value:t,onChange:n})})}},k={args:{label:`API Key`,labelTooltip:`Your unique API key. Keep this secret!`},render:e=>{let[t,n]=(0,b.useState)(``);return(0,x.jsx)(u,{...e,inputID:`api-key-input`,children:(0,x.jsx)(S,{id:`api-key-input`,placeholder:`sk-...`,value:t,onChange:n})})}},A={args:{label:`Email`,labelIcon:v},render:e=>{let[t,n]=(0,b.useState)(``);return(0,x.jsx)(u,{...e,inputID:`email-icon-input`,children:(0,x.jsx)(S,{id:`email-icon-input`,placeholder:`you@example.com`,value:t,onChange:n})})}},j={render:()=>{let[e,t]=(0,b.useState)({a:``,b:``,c:``,d:``,e:``}),n=e=>n=>t(t=>({...t,[e]:n}));return(0,x.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:24,maxWidth:320},children:[(0,x.jsx)(u,{label:`Default`,inputID:`v-a`,children:(0,x.jsx)(S,{id:`v-a`,value:e.a,onChange:n(`a`)})}),(0,x.jsx)(u,{label:`With description`,description:`Some helpful info`,inputID:`v-b`,descriptionID:`v-b-desc`,children:(0,x.jsx)(S,{id:`v-b`,describedBy:`v-b-desc`,value:e.b,onChange:n(`b`)})}),(0,x.jsx)(u,{label:`Optional`,isOptional:!0,inputID:`v-c`,children:(0,x.jsx)(S,{id:`v-c`,value:e.c,onChange:n(`c`)})}),(0,x.jsx)(u,{label:`Required`,isRequired:!0,inputID:`v-d`,children:(0,x.jsx)(S,{id:`v-d`,value:e.d,onChange:n(`d`)})}),(0,x.jsx)(u,{label:`With tooltip`,labelTooltip:`Extra info here`,inputID:`v-e`,children:(0,x.jsx)(S,{id:`v-e`,value:e.e,onChange:n(`e`)})})]})}},M={render:()=>{let[e,t]=(0,b.useState)({native:`custom-value`,error:`bad-email`,warning:`admin`,success:`valid-user`}),n=e=>n=>t(t=>({...t,[e]:n}));return(0,x.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:24,maxWidth:400},children:[(0,x.jsx)(u,{label:`Native input`,inputID:`native-status-input`,status:{type:`warning`,message:`The attached status stays behind this custom control`,messageID:`native-status-message`},children:(0,x.jsx)(S,{id:`native-status-input`,describedBy:`native-status-message`,value:e.native,onChange:n(`native`)})}),(0,x.jsx)(g,{label:`Email`,description:`Enter your work email`,value:e.error,onChange:n(`error`),status:{type:`error`,message:`Please enter a valid email address`}}),(0,x.jsx)(g,{label:`Username`,description:`Choose a unique username`,value:e.warning,onChange:n(`warning`),status:{type:`warning`,message:`This username is reserved for administrators`}}),(0,x.jsx)(g,{label:`API Key`,description:`Paste your API key`,value:e.success,onChange:n(`success`),status:{type:`success`,message:`API key is valid and active`}})]})}},N={fontSize:12,color:`var(--color-text-secondary)`,marginBottom:8},P={render:()=>{let[e,t]=(0,b.useState)(``);return(0,x.jsx)(`div`,{style:{maxWidth:560},children:(0,x.jsxs)(m,{direction:`horizontal-labels`,children:[(0,x.jsx)(u,{label:`Workspace name`,inputID:`audit-workspace`,description:`Used in navigation and invitations.`,descriptionID:`audit-workspace-help`,status:{type:`warning`,message:`Choose a name before continuing.`,messageID:`audit-workspace-status`},statusVariant:`detached`,children:(0,x.jsx)(S,{id:`audit-workspace`,describedBy:`audit-workspace-help audit-workspace-status`,placeholder:`Design systems`,value:e,onChange:t})}),(0,x.jsx)(u,{label:`Visibility`,inputID:`audit-visibility`,labelID:`audit-visibility-label`,isGroupLabel:!0,children:(0,x.jsxs)(`div`,{id:`audit-visibility`,role:`radiogroup`,"aria-labelledby":`audit-visibility-label`,children:[(0,x.jsxs)(`label`,{children:[(0,x.jsx)(`input`,{type:`radio`,name:`audit-visibility`,defaultChecked:!0}),`Private`]}),` `,(0,x.jsxs)(`label`,{children:[(0,x.jsx)(`input`,{type:`radio`,name:`audit-visibility`}),` Public`]})]})})]})})}},F={render:()=>(0,x.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:24},children:[[390,768].map(e=>(0,x.jsxs)(`div`,{style:{width:e,outline:`1px dashed #ccc`},children:[(0,x.jsxs)(`p`,{style:N,children:[e,`px, wrap`]}),(0,x.jsx)(y,{})]},e)),(0,x.jsxs)(`div`,{children:[(0,x.jsx)(`p`,{style:N,children:`Full width, wrap`}),(0,x.jsx)(y,{})]}),(0,x.jsxs)(`div`,{style:{width:390,outline:`1px dashed #ccc`},children:[(0,x.jsx)(`p`,{style:N,children:`390px, no wrap: fields shrink inside the row`}),(0,x.jsx)(y,{wrap:`nowrap`})]})]})},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Email'
  },
  render: args => {
    const [value, setValue] = useState('');
    return <Field {...args} inputID="email-input">
        <NativeInput id="email-input" placeholder="you@example.com" value={value} onChange={setValue} />
      </Field>;
  }
}`,...w.parameters?.docs?.source}}},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Email',
    description: "We'll never share your email."
  },
  render: args => {
    const [value, setValue] = useState('');
    return <Field {...args} inputID="email-desc-input" descriptionID="email-desc">
        <NativeInput id="email-desc-input" describedBy="email-desc" placeholder="you@example.com" value={value} onChange={setValue} />
      </Field>;
  }
}`,...T.parameters?.docs?.source}}},E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Search',
    isLabelHidden: true
  },
  render: args => {
    const [value, setValue] = useState('');
    return <Field {...args} inputID="search-input">
        <NativeInput id="search-input" placeholder="Search..." value={value} onChange={setValue} />
      </Field>;
  }
}`,...E.parameters?.docs?.source}}},D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Nickname',
    isOptional: true
  },
  render: args => {
    const [value, setValue] = useState('');
    return <Field {...args} inputID="nickname-input">
        <NativeInput id="nickname-input" placeholder="Enter your nickname" value={value} onChange={setValue} />
      </Field>;
  }
}`,...D.parameters?.docs?.source}}},O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Username',
    isRequired: true
  },
  render: args => {
    const [value, setValue] = useState('');
    return <Field {...args} inputID="username-input">
        <NativeInput id="username-input" placeholder="Enter your username" value={value} onChange={setValue} />
      </Field>;
  }
}`,...O.parameters?.docs?.source}}},k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'API Key',
    labelTooltip: 'Your unique API key. Keep this secret!'
  },
  render: args => {
    const [value, setValue] = useState('');
    return <Field {...args} inputID="api-key-input">
        <NativeInput id="api-key-input" placeholder="sk-..." value={value} onChange={setValue} />
      </Field>;
  }
}`,...k.parameters?.docs?.source}}},A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Email',
    labelIcon: EnvelopeIcon
  },
  render: args => {
    const [value, setValue] = useState('');
    return <Field {...args} inputID="email-icon-input">
        <NativeInput id="email-icon-input" placeholder="you@example.com" value={value} onChange={setValue} />
      </Field>;
  }
}`,...A.parameters?.docs?.source}}},j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [vals, setVals] = useState({
      a: '',
      b: '',
      c: '',
      d: '',
      e: ''
    });
    const set = (k: keyof typeof vals) => (v: string) => setVals(prev => ({
      ...prev,
      [k]: v
    }));
    return <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 24,
      maxWidth: 320
    }}>
        <Field label="Default" inputID="v-a">
          <NativeInput id="v-a" value={vals.a} onChange={set('a')} />
        </Field>
        <Field label="With description" description="Some helpful info" inputID="v-b" descriptionID="v-b-desc">
          <NativeInput id="v-b" describedBy="v-b-desc" value={vals.b} onChange={set('b')} />
        </Field>
        <Field label="Optional" isOptional inputID="v-c">
          <NativeInput id="v-c" value={vals.c} onChange={set('c')} />
        </Field>
        <Field label="Required" isRequired inputID="v-d">
          <NativeInput id="v-d" value={vals.d} onChange={set('d')} />
        </Field>
        <Field label="With tooltip" labelTooltip="Extra info here" inputID="v-e">
          <NativeInput id="v-e" value={vals.e} onChange={set('e')} />
        </Field>
      </div>;
  }
}`,...j.parameters?.docs?.source}}},M.parameters={...M.parameters,docs:{...M.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [vals, setVals] = useState({
      native: 'custom-value',
      error: 'bad-email',
      warning: 'admin',
      success: 'valid-user'
    });
    const set = (k: keyof typeof vals) => (v: string) => setVals(prev => ({
      ...prev,
      [k]: v
    }));
    return <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 24,
      maxWidth: 400
    }}>
        <Field label="Native input" inputID="native-status-input" status={{
        type: 'warning',
        message: 'The attached status stays behind this custom control',
        messageID: 'native-status-message'
      }}>
          <NativeInput id="native-status-input" describedBy="native-status-message" value={vals.native} onChange={set('native')} />
        </Field>
        <TextInput label="Email" description="Enter your work email" value={vals.error} onChange={set('error')} status={{
        type: 'error',
        message: 'Please enter a valid email address'
      }} />
        <TextInput label="Username" description="Choose a unique username" value={vals.warning} onChange={set('warning')} status={{
        type: 'warning',
        message: 'This username is reserved for administrators'
      }} />
        <TextInput label="API Key" description="Paste your API key" value={vals.success} onChange={set('success')} status={{
        type: 'success',
        message: 'API key is valid and active'
      }} />
      </div>;
  }
}`,...M.parameters?.docs?.source}}},P.parameters={...P.parameters,docs:{...P.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [value, setValue] = useState('');
    return <div style={{
      maxWidth: 560
    }}>
        <FormLayout direction="horizontal-labels">
          <Field label="Workspace name" inputID="audit-workspace" description="Used in navigation and invitations." descriptionID="audit-workspace-help" status={{
          type: 'warning',
          message: 'Choose a name before continuing.',
          messageID: 'audit-workspace-status'
        }} statusVariant="detached">
            <NativeInput id="audit-workspace" describedBy="audit-workspace-help audit-workspace-status" placeholder="Design systems" value={value} onChange={setValue} />
          </Field>
          <Field label="Visibility" inputID="audit-visibility" labelID="audit-visibility-label" isGroupLabel>
            <div id="audit-visibility" role="radiogroup" aria-labelledby="audit-visibility-label">
              <label>
                <input type="radio" name="audit-visibility" defaultChecked />
                Private
              </label>{' '}
              <label>
                <input type="radio" name="audit-visibility" /> Public
              </label>
            </div>
          </Field>
        </FormLayout>
      </div>;
  }
}`,...P.parameters?.docs?.source},description:{story:`Comparison fixture for Field-owned structural states: horizontal labels,
a detached status with explicit description/status wiring, and a group label.`,...P.parameters?.docs?.description}}},F.parameters={...F.parameters,docs:{...F.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: 24
  }}>
      {[390, 768].map(width => <div key={width} style={{
      width,
      outline: '1px dashed #ccc'
    }}>
          <p style={frameCaption}>{width}px, wrap</p>
          <OrdersFilterBar />
        </div>)}
      <div>
        <p style={frameCaption}>Full width, wrap</p>
        <OrdersFilterBar />
      </div>
      <div style={{
      width: 390,
      outline: '1px dashed #ccc'
    }}>
        <p style={frameCaption}>390px, no wrap: fields shrink inside the row</p>
        <OrdersFilterBar wrap="nowrap" />
      </div>
    </div>
}`,...F.parameters?.docs?.source},description:{story:`The Field.doc.mjs "Filter bar" example (a search TextInput and three
Selectors) in a 390px phone frame, a 768px tablet frame, and at full width.
The last frame is the same bar without \`wrap\` at 390px: its fields now
shrink inside the frame instead of pushing past it, which is why filter bars
should wrap on phones.`,...F.parameters?.docs?.description}}},I=[`Default`,`WithDescription`,`WithHiddenLabel`,`OptionalField`,`RequiredField`,`WithTooltip`,`WithLabelIcon`,`AllVariations`,`StatusVariants`,`StructuralStates`,`FilterBar`]})))()}L();export{j as AllVariations,w as Default,F as FilterBar,D as OptionalField,O as RequiredField,M as StatusVariants,P as StructuralStates,T as WithDescription,E as WithHiddenLabel,A as WithLabelIcon,k as WithTooltip,I as __namedExportsOrder,C as default};