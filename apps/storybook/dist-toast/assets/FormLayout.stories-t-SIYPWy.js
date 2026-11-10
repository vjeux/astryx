import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{t}from"./react-DlPsW1c0.js";import{t as n}from"./jsx-runtime-MKhVqBIO.js";import{n as r,t as i}from"./Text-C5BHw0wv.js";import{n as a,t as o}from"./Field-CBd_4iOL.js";import{n as s,t as c}from"./Selector-MAEgY-r1.js";import{i as l,n as u,r as d,t as f}from"./CheckboxListItem-DvDdmg8P.js";import{n as p,t as m}from"./CheckboxInput-CnJ0nBRn.js";import{n as h,t as g}from"./Switch-C8kZJ1p7.js";import{n as _,t as v}from"./FormLayout-CAcZ3H26.js";import{n as y,t as b}from"./TextInput-LGxpinPt.js";function x({direction:e}){let[t,n]=(0,S.useState)(``),[r,i]=(0,S.useState)(``),[a,o]=(0,S.useState)(``);return(0,C.jsxs)(v,{direction:e,children:[(0,C.jsx)(b,{label:`Name`,value:t,onChange:n}),(0,C.jsx)(b,{label:`Email`,value:r,onChange:i}),(0,C.jsx)(b,{label:`Bio`,value:a,onChange:o})]})}var S,C,w,T,E,D,O,k,A,j,M,N,P,F,I;function L(){return(L=e((()=>{S=t(),_(),y(),s(),a(),r(),p(),l(),u(),h(),C=n(),{expect:w}=__STORYBOOK_MODULE_TEST__,T={title:`Core/FormLayout`,component:v,tags:[`autodocs`],args:{direction:`vertical`},argTypes:{direction:{control:`select`,options:[`vertical`,`horizontal`,`horizontal-labels`],description:`Direction of field arrangement`},defaultOptionality:{control:`select`,options:[void 0,`optional`,`required`],description:`Form-wide default so only the exception shows an optional/required indicator`}}},E={name:`Vertical (Default)`,render:e=>(0,C.jsx)(x,{direction:e.direction})},D={name:`Horizontal`,args:{direction:`horizontal`},render:e=>{let[t,n]=(0,S.useState)(``),[r,i]=(0,S.useState)(``);return(0,C.jsxs)(v,{direction:e.direction,children:[(0,C.jsx)(b,{label:`First Name`,value:t,onChange:n}),(0,C.jsx)(b,{label:`Last Name`,value:r,onChange:i})]})}},O={name:`Horizontal Labels (Settings)`,args:{direction:`horizontal-labels`},render:e=>{let[t,n]=(0,S.useState)(`Jane Doe`),[r,i]=(0,S.useState)(`jane@example.com`),[a,o]=(0,S.useState)(`America/Los_Angeles`);return(0,C.jsxs)(v,{direction:e.direction,children:[(0,C.jsx)(b,{label:`Display Name`,value:t,onChange:n}),(0,C.jsx)(b,{label:`Email`,value:r,onChange:i}),(0,C.jsx)(c,{label:`Timezone`,value:a,onChange:e=>o(e),options:[{label:`Pacific Time`,value:`America/Los_Angeles`},{label:`Eastern Time`,value:`America/New_York`},{label:`UTC`,value:`UTC`}]})]})},play:async({canvasElement:e})=>{let t=e.querySelector(`[data-direction="horizontal-labels"]`);if(!t)throw Error(`Expected a horizontal-labels FormLayout`);await w(t.children).toHaveLength(3);let n=t.getBoundingClientRect().width,r=window.matchMedia(`(max-width: 480px)`).matches;for(let e of Array.from(t.children)){let t=e.children[0].getBoundingClientRect(),i=e.children[1].children[0].getBoundingClientRect();r?await w(i.width).toBeCloseTo(n,0):await w(t.right).toBeLessThanOrEqual(i.left)}}},k={name:`Mixed Controls`,render:()=>{let[e,t]=(0,S.useState)(``),[n,r]=(0,S.useState)(`viewer`);return(0,C.jsxs)(v,{children:[(0,C.jsx)(b,{label:`Name`,value:e,onChange:t}),(0,C.jsx)(c,{label:`Role`,value:n,onChange:e=>r(e),options:[{label:`Viewer`,value:`viewer`},{label:`Editor`,value:`editor`},{label:`Admin`,value:`admin`}]}),(0,C.jsx)(o,{label:`Notifications`,inputID:`notif-group`,children:(0,C.jsxs)(`div`,{className:`x78zum5 xdt5ytf x1jnr06f`,id:`notif-group`,children:[(0,C.jsxs)(`label`,{className:`x78zum5 x6s0dn4 x167g77z`,children:[(0,C.jsx)(`input`,{type:`checkbox`,defaultChecked:!0}),` Email`]}),(0,C.jsxs)(`label`,{className:`x78zum5 x6s0dn4 x167g77z`,children:[(0,C.jsx)(`input`,{type:`checkbox`}),` SMS`]}),(0,C.jsxs)(`label`,{className:`x78zum5 x6s0dn4 x167g77z`,children:[(0,C.jsx)(`input`,{type:`checkbox`,defaultChecked:!0}),` Push`]})]})})]})}},A={name:`Nested Layouts`,render:()=>{let[e,t]=(0,S.useState)(``),[n,r]=(0,S.useState)(``),[i,a]=(0,S.useState)(``),[o,s]=(0,S.useState)(``),[c,l]=(0,S.useState)(``),[u,d]=(0,S.useState)(``);return(0,C.jsxs)(v,{children:[(0,C.jsxs)(v,{direction:`horizontal`,children:[(0,C.jsx)(b,{label:`First Name`,value:e,onChange:t}),(0,C.jsx)(b,{label:`Last Name`,value:n,onChange:r})]}),(0,C.jsx)(b,{label:`Email`,value:i,onChange:a}),(0,C.jsxs)(v,{direction:`horizontal`,children:[(0,C.jsx)(b,{label:`City`,value:o,onChange:s}),(0,C.jsx)(b,{label:`State`,value:c,onChange:l}),(0,C.jsx)(b,{label:`ZIP`,value:u,onChange:d})]})]})}},j={name:`In a Dialog`,render:()=>{let[e,t]=(0,S.useState)(`Jane Doe`),[n,r]=(0,S.useState)(`jane@example.com`);return(0,C.jsxs)(`div`,{className:`xtfardp xur7f20 x17fpy1y xb3r6kr`,children:[(0,C.jsx)(`div`,{className:`x1tamke2 x915a4u`,children:(0,C.jsx)(i,{type:`label`,children:`Edit Profile`})}),(0,C.jsx)(`div`,{className:`x1tamke2`,children:(0,C.jsx)(`form`,{id:`edit-profile`,onSubmit:t=>{t.preventDefault(),alert(`Saved: ${e}, ${n}`)},children:(0,C.jsxs)(v,{children:[(0,C.jsx)(b,{label:`Name`,value:e,onChange:t}),(0,C.jsx)(b,{label:`Email`,value:n,onChange:r})]})})}),(0,C.jsxs)(`div`,{className:`x78zum5 x13a6bvl x167g77z x1tamke2 xz14g06`,children:[(0,C.jsx)(`button`,{className:`x1ff1495 x1kogg8i x1gs6z28 x1ypdohk xif65rj x1dr8pv1 xka2uk4`,type:`button`,children:`Cancel`}),(0,C.jsx)(`button`,{className:`x1ff1495 x1kogg8i x1gs6z28 x1ypdohk xif65rj xtzjzor xfungia`,type:`submit`,form:`edit-profile`,children:`Save`})]})]})}},M={name:`Default Optionality — Optional`,render:()=>{let[e,t]=(0,S.useState)(``),[n,r]=(0,S.useState)(``),[i,a]=(0,S.useState)(``);return(0,C.jsxs)(v,{defaultOptionality:`optional`,children:[(0,C.jsx)(b,{label:`Bio`,value:e,onChange:t}),(0,C.jsx)(b,{label:`Nickname`,value:n,onChange:r,isOptional:!0}),(0,C.jsx)(b,{label:`Email`,value:i,onChange:a,isRequired:!0})]})}},N={name:`Default Optionality — Required`,render:()=>{let[e,t]=(0,S.useState)(``),[n,r]=(0,S.useState)(``),[i,a]=(0,S.useState)(``);return(0,C.jsxs)(v,{defaultOptionality:`required`,children:[(0,C.jsx)(b,{label:`Name`,value:e,onChange:t}),(0,C.jsx)(b,{label:`Email`,value:n,onChange:r,isRequired:!0}),(0,C.jsx)(b,{label:`Nickname`,value:i,onChange:a,isOptional:!0})]})}},P={name:`Default Optionality — Required, choice controls`,render:()=>{let[e,t]=(0,S.useState)(``),[n,r]=(0,S.useState)(!1),[i,a]=(0,S.useState)(!1),[o,s]=(0,S.useState)([]),[c,l]=(0,S.useState)(!1);return(0,C.jsxs)(v,{defaultOptionality:`required`,children:[(0,C.jsx)(b,{label:`Name`,value:e,onChange:t}),(0,C.jsx)(m,{label:`Subscribe to the newsletter`,value:n,onChange:r}),(0,C.jsx)(g,{label:`Dark mode`,value:i,onChange:a}),(0,C.jsxs)(d,{label:`Topics`,value:o,onChange:s,children:[(0,C.jsx)(f,{label:`Design`,value:`design`}),(0,C.jsx)(f,{label:`Code`,value:`code`})]}),(0,C.jsx)(m,{label:`Accept the terms`,value:c,onChange:l,isRequired:!0})]})}},F={parameters:{layout:`padded`},render:()=>(0,C.jsxs)(`div`,{"data-form-layout-audit":`matrix`,children:[(0,C.jsx)(i,{type:`label`,children:`Vertical`}),(0,C.jsxs)(v,{"data-audit-layout":`vertical`,children:[(0,C.jsx)(b,{label:`Name`,value:`Ada Lovelace`,onChange:()=>{}}),(0,C.jsx)(b,{label:`Email`,value:`ada.lovelace@example.com`,onChange:()=>{}})]}),(0,C.jsx)(i,{type:`label`,children:`Horizontal`}),(0,C.jsxs)(v,{direction:`horizontal`,"data-audit-layout":`horizontal`,children:[(0,C.jsx)(b,{label:`First name`,value:`Ada`,onChange:()=>{}}),(0,C.jsx)(b,{label:`Last name`,value:`Lovelace`,onChange:()=>{}}),(0,C.jsx)(b,{label:`Team`,value:`Analytical Engine`,onChange:()=>{}})]}),(0,C.jsx)(i,{type:`label`,children:`Horizontal labels`}),(0,C.jsxs)(v,{direction:`horizontal-labels`,"data-audit-layout":`horizontal-labels`,children:[(0,C.jsx)(b,{label:`Display name`,value:`Ada Lovelace`,onChange:()=>{}}),(0,C.jsx)(b,{label:`Contact email`,value:`ada.lovelace@example.com`,onChange:()=>{}})]}),(0,C.jsx)(i,{type:`label`,children:`Required by default`}),(0,C.jsxs)(v,{defaultOptionality:`required`,"data-audit-layout":`required-default`,children:[(0,C.jsx)(b,{label:`Account name`,value:`Ada`,onChange:()=>{}}),(0,C.jsx)(b,{label:`Nickname`,value:`Enchantress of Numbers`,onChange:()=>{},isOptional:!0})]})]}),play:async({canvasElement:e})=>{let t=Array.from(e.querySelectorAll(`[data-audit-layout]`));await w(t).toHaveLength(4);for(let e of t){await w(e).toHaveAttribute(`data-direction`),await w(e.className).toContain(`astryx-form-layout`);let t=e.getBoundingClientRect();await w(t.width).toBeGreaterThan(0),await w(t.left).toBeGreaterThanOrEqual(0),await w(t.right).toBeLessThanOrEqual(document.documentElement.clientWidth+1)}let n=e.querySelector(`[data-audit-layout="horizontal"]`);if(!n)throw Error(`Expected the horizontal audit layout`);let[r,i]=Array.from(n.children).map(e=>e.getBoundingClientRect());getComputedStyle(n).direction===`rtl`?await w(r.left).toBeGreaterThan(i.left):await w(r.left).toBeLessThan(i.left);let a=e.querySelector(`[data-audit-layout="horizontal-labels"]`);if(!a)throw Error(`Expected the horizontal-labels audit layout`);let o=window.matchMedia(`(max-width: 480px)`).matches;await w(getComputedStyle(a).display).toBe(o?`flex`:`grid`);let s=e.querySelector(`[data-audit-layout="required-default"]`);if(!s)throw Error(`Expected the required-default audit layout`);await w(s.querySelectorAll(`[aria-required="true"]`)).toHaveLength(1),await w(document.documentElement.scrollWidth).toBeLessThanOrEqual(document.documentElement.clientWidth+1)}},E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  name: 'Vertical (Default)',
  render: args => <FormLayoutDemo direction={args.direction} />
}`,...E.parameters?.docs?.source}}},D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
  name: 'Horizontal',
  args: {
    direction: 'horizontal'
  },
  render: args => {
    const [first, setFirst] = useState('');
    const [last, setLast] = useState('');
    return <FormLayout direction={args.direction}>
        <TextInput label="First Name" value={first} onChange={setFirst} />
        <TextInput label="Last Name" value={last} onChange={setLast} />
      </FormLayout>;
  }
}`,...D.parameters?.docs?.source}}},O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
  name: 'Horizontal Labels (Settings)',
  args: {
    direction: 'horizontal-labels'
  },
  render: args => {
    const [displayName, setDisplayName] = useState('Jane Doe');
    const [email, setEmail] = useState('jane@example.com');
    const [timezone, setTimezone] = useState('America/Los_Angeles');
    return <FormLayout direction={args.direction}>
        <TextInput label="Display Name" value={displayName} onChange={setDisplayName} />
        <TextInput label="Email" value={email} onChange={setEmail} />
        <Selector label="Timezone" value={timezone} onChange={v => setTimezone(v as string)} options={[{
        label: 'Pacific Time',
        value: 'America/Los_Angeles'
      }, {
        label: 'Eastern Time',
        value: 'America/New_York'
      }, {
        label: 'UTC',
        value: 'UTC'
      }]} />
      </FormLayout>;
  },
  // Run by .github/scripts/story-play-guard.js at a phone and a 481px viewport.
  play: async ({
    canvasElement
  }) => {
    const layout = canvasElement.querySelector('[data-direction="horizontal-labels"]');
    if (!layout) {
      throw new Error('Expected a horizontal-labels FormLayout');
    }
    await expect(layout.children).toHaveLength(3);
    const layoutWidth = layout.getBoundingClientRect().width;
    const collapsed = window.matchMedia('(max-width: 480px)').matches;
    // Each Field is display: contents, so its label wrapper and control
    // wrapper are the layout's items.
    for (const field of Array.from(layout.children)) {
      const label = field.children[0].getBoundingClientRect();
      const control = field.children[1].children[0].getBoundingClientRect();
      if (collapsed) {
        // Stacked: every control fills the column, whatever its value's width.
        await expect(control.width).toBeCloseTo(layoutWidth, 0);
      } else {
        // Two columns: the label sits to the left of its control.
        await expect(label.right).toBeLessThanOrEqual(control.left);
      }
    }
  }
}`,...O.parameters?.docs?.source}}},k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
  name: 'Mixed Controls',
  render: () => {
    const [name, setName] = useState('');
    const [role, setRole] = useState('viewer');
    return <FormLayout>
        <TextInput label="Name" value={name} onChange={setName} />
        <Selector label="Role" value={role} onChange={v => setRole(v as string)} options={[{
        label: 'Viewer',
        value: 'viewer'
      }, {
        label: 'Editor',
        value: 'editor'
      }, {
        label: 'Admin',
        value: 'admin'
      }]} />
        <Field label="Notifications" inputID="notif-group">
          <div {...stylex.props(checkboxStyles.group)} id="notif-group">
            <label {...stylex.props(checkboxStyles.label)}>
              <input type="checkbox" defaultChecked /> Email
            </label>
            <label {...stylex.props(checkboxStyles.label)}>
              <input type="checkbox" /> SMS
            </label>
            <label {...stylex.props(checkboxStyles.label)}>
              <input type="checkbox" defaultChecked /> Push
            </label>
          </div>
        </Field>
      </FormLayout>;
  }
}`,...k.parameters?.docs?.source}}},A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`{
  name: 'Nested Layouts',
  render: () => {
    const [first, setFirst] = useState('');
    const [last, setLast] = useState('');
    const [email, setEmail] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zip, setZip] = useState('');
    return <FormLayout>
        <FormLayout direction="horizontal">
          <TextInput label="First Name" value={first} onChange={setFirst} />
          <TextInput label="Last Name" value={last} onChange={setLast} />
        </FormLayout>
        <TextInput label="Email" value={email} onChange={setEmail} />
        <FormLayout direction="horizontal">
          <TextInput label="City" value={city} onChange={setCity} />
          <TextInput label="State" value={state} onChange={setState} />
          <TextInput label="ZIP" value={zip} onChange={setZip} />
        </FormLayout>
      </FormLayout>;
  }
}`,...A.parameters?.docs?.source}}},j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
  name: 'In a Dialog',
  render: () => {
    const [name, setName] = useState('Jane Doe');
    const [email, setEmail] = useState('jane@example.com');
    return <div {...stylex.props(dialogStyles.container)}>
        <div {...stylex.props(dialogStyles.header)}>
          <Text type="label">Edit Profile</Text>
        </div>
        <div {...stylex.props(dialogStyles.body)}>
          <form id="edit-profile" onSubmit={e => {
          e.preventDefault();
          alert(\`Saved: \${name}, \${email}\`);
        }}>
            <FormLayout>
              <TextInput label="Name" value={name} onChange={setName} />
              <TextInput label="Email" value={email} onChange={setEmail} />
            </FormLayout>
          </form>
        </div>
        <div {...stylex.props(dialogStyles.footer)}>
          <button {...stylex.props(dialogStyles.button, dialogStyles.secondary)} type="button">
            Cancel
          </button>
          <button {...stylex.props(dialogStyles.button, dialogStyles.primary)} type="submit" form="edit-profile">
            Save
          </button>
        </div>
      </div>;
  }
}`,...j.parameters?.docs?.source}}},M.parameters={...M.parameters,docs:{...M.parameters?.docs,source:{originalSource:`{
  name: 'Default Optionality — Optional',
  render: () => {
    const [bio, setBio] = useState('');
    const [nickname, setNickname] = useState('');
    const [email, setEmail] = useState('');
    // Everything reads as optional; only the required field is marked.
    return <FormLayout defaultOptionality="optional">
        <TextInput label="Bio" value={bio} onChange={setBio} />
        <TextInput label="Nickname" value={nickname} onChange={setNickname} isOptional />
        <TextInput label="Email" value={email} onChange={setEmail} isRequired />
      </FormLayout>;
  }
}`,...M.parameters?.docs?.source}}},N.parameters={...N.parameters,docs:{...N.parameters?.docs,source:{originalSource:`{
  name: 'Default Optionality — Required',
  render: () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [nickname, setNickname] = useState('');
    // Everything reads as required; only the optional field is marked.
    return <FormLayout defaultOptionality="required">
        <TextInput label="Name" value={name} onChange={setName} />
        <TextInput label="Email" value={email} onChange={setEmail} isRequired />
        <TextInput label="Nickname" value={nickname} onChange={setNickname} isOptional />
      </FormLayout>;
  }
}`,...N.parameters?.docs?.source}}},P.parameters={...P.parameters,docs:{...P.parameters?.docs,source:{originalSource:`{
  name: 'Default Optionality — Required, choice controls',
  render: () => {
    const [name, setName] = useState('');
    const [subscribe, setSubscribe] = useState(false);
    const [darkMode, setDarkMode] = useState(false);
    const [topics, setTopics] = useState<string[]>([]);
    const [terms, setTerms] = useState(false);
    return <FormLayout defaultOptionality="required">
        <TextInput label="Name" value={name} onChange={setName} />
        <CheckboxInput label="Subscribe to the newsletter" value={subscribe} onChange={setSubscribe} />
        <Switch label="Dark mode" value={darkMode} onChange={setDarkMode} />
        <CheckboxList label="Topics" value={topics} onChange={setTopics}>
          <CheckboxListItem label="Design" value="design" />
          <CheckboxListItem label="Code" value="code" />
        </CheckboxList>
        <CheckboxInput label="Accept the terms" value={terms} onChange={setTerms} isRequired />
      </FormLayout>;
  }
}`,...P.parameters?.docs?.source},description:{story:`Choice controls in a form whose fields are required by default. An unchecked
box, an off switch and an empty group are answers, so only a control's own
\`isRequired\` makes it required; the text field still takes the default.`,...P.parameters?.docs?.description}}},F.parameters={...F.parameters,docs:{...F.parameters?.docs,source:{originalSource:`{
  parameters: {
    layout: 'padded'
  },
  render: () => <div data-form-layout-audit="matrix">
      <Text type="label">Vertical</Text>
      <FormLayout data-audit-layout="vertical">
        <TextInput label="Name" value="Ada Lovelace" onChange={() => {}} />
        <TextInput label="Email" value="ada.lovelace@example.com" onChange={() => {}} />
      </FormLayout>

      <Text type="label">Horizontal</Text>
      <FormLayout direction="horizontal" data-audit-layout="horizontal">
        <TextInput label="First name" value="Ada" onChange={() => {}} />
        <TextInput label="Last name" value="Lovelace" onChange={() => {}} />
        <TextInput label="Team" value="Analytical Engine" onChange={() => {}} />
      </FormLayout>

      <Text type="label">Horizontal labels</Text>
      <FormLayout direction="horizontal-labels" data-audit-layout="horizontal-labels">
        <TextInput label="Display name" value="Ada Lovelace" onChange={() => {}} />
        <TextInput label="Contact email" value="ada.lovelace@example.com" onChange={() => {}} />
      </FormLayout>

      <Text type="label">Required by default</Text>
      <FormLayout defaultOptionality="required" data-audit-layout="required-default">
        <TextInput label="Account name" value="Ada" onChange={() => {}} />
        <TextInput label="Nickname" value="Enchantress of Numbers" onChange={() => {}} isOptional />
      </FormLayout>
    </div>,
  play: async ({
    canvasElement
  }) => {
    const layouts = Array.from(canvasElement.querySelectorAll<HTMLElement>('[data-audit-layout]'));
    await expect(layouts).toHaveLength(4);
    for (const layout of layouts) {
      await expect(layout).toHaveAttribute('data-direction');
      await expect(layout.className).toContain('astryx-form-layout');
      const box = layout.getBoundingClientRect();
      await expect(box.width).toBeGreaterThan(0);
      await expect(box.left).toBeGreaterThanOrEqual(0);
      await expect(box.right).toBeLessThanOrEqual(document.documentElement.clientWidth + 1);
    }
    const horizontal = canvasElement.querySelector<HTMLElement>('[data-audit-layout="horizontal"]');
    if (!horizontal) {
      throw new Error('Expected the horizontal audit layout');
    }
    const [first, second] = Array.from(horizontal.children).map(child => child.getBoundingClientRect());
    const isRtl = getComputedStyle(horizontal).direction === 'rtl';
    if (isRtl) {
      await expect(first.left).toBeGreaterThan(second.left);
    } else {
      await expect(first.left).toBeLessThan(second.left);
    }
    const horizontalLabels = canvasElement.querySelector<HTMLElement>('[data-audit-layout="horizontal-labels"]');
    if (!horizontalLabels) {
      throw new Error('Expected the horizontal-labels audit layout');
    }
    const shouldCollapse = window.matchMedia('(max-width: 480px)').matches;
    await expect(getComputedStyle(horizontalLabels).display).toBe(shouldCollapse ? 'flex' : 'grid');
    const requiredDefault = canvasElement.querySelector<HTMLElement>('[data-audit-layout="required-default"]');
    if (!requiredDefault) {
      throw new Error('Expected the required-default audit layout');
    }
    await expect(requiredDefault.querySelectorAll('[aria-required="true"]')).toHaveLength(1);
    await expect(document.documentElement.scrollWidth).toBeLessThanOrEqual(document.documentElement.clientWidth + 1);
  }
}`,...F.parameters?.docs?.source},description:{story:`Stable, always-rendered FormLayout states for exact-head visual, accessibility,
RTL, and responsive verification. One fixture keeps all three arrangements and
both optionality exceptions observable without duplicating one story per prop.`,...F.parameters?.docs?.description}}},I=[`Vertical`,`Horizontal`,`HorizontalLabels`,`MixedControls`,`Nested`,`InDialog`,`DefaultOptionalityOptional`,`DefaultOptionalityRequired`,`DefaultOptionalityRequiredChoices`,`AuditMatrix`]})))()}L();export{F as AuditMatrix,M as DefaultOptionalityOptional,N as DefaultOptionalityRequired,P as DefaultOptionalityRequiredChoices,D as Horizontal,O as HorizontalLabels,j as InDialog,k as MixedControls,A as Nested,E as Vertical,I as __namedExportsOrder,T as default};