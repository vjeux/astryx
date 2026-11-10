import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{t}from"./react-DlPsW1c0.js";import{t as n}from"./jsx-runtime-MKhVqBIO.js";import{n as r,t as i}from"./Badge-DqOhTiyH.js";import{n as a,t as o}from"./Card-DA0ZfoAz.js";import{n as s,t as c}from"./ClickableCard-QlBYDZzY.js";import{n as l,t as u}from"./List-Bq_ZN_6g.js";import{i as d,n as f,r as p,t as m}from"./CheckboxListItem-DvDdmg8P.js";import{n as h,t as g}from"./CheckboxInput-CnJ0nBRn.js";import{n as _,t as v}from"./Link-D69iJxMA.js";function y(){let[e,t]=(0,b.useState)([`transactions`]),n=C.every(t=>e.includes(t)),r=e.length===0;return(0,x.jsxs)(p,{label:`Include in export`,hasDividers:!0,children:[(0,x.jsx)(m,{label:`Select all`,isChecked:n?!0:!r&&`indeterminate`,onCheck:e=>{t(e?[...C]:[])}}),S.map(n=>(0,x.jsx)(m,{label:n.label,isChecked:e.includes(n.id),onCheck:e=>{t(t=>e?[...t,n.id]:t.filter(e=>e!==n.id))}},n.id))]})}var b,x,S,C;function w(){return(w=e((()=>{b=t(),d(),f(),x=n(),S=[{id:`transactions`,label:`Transaction history`},{id:`statements`,label:`Account statements`},{id:`tax`,label:`Tax documents`},{id:`invoices`,label:`Invoices`}],C=S.map(e=>e.id),y.__docgenInfo={description:``,methods:[],displayName:`CheckboxListSelectAllPattern`}})))()}var T,E,D,O,k,A,j,M,N,P,F,I,L,R,z,B,V,H,U,W,G,K,q,J,Y,X,Z,Q;function $(){return($=e((()=>{T=t(),d(),f(),h(),l(),r(),a(),s(),_(),w(),E=n(),D={title:`Core/CheckboxList`,component:p,tags:[`autodocs`],argTypes:{label:{control:`text`,description:`Label text (required)`},isLabelHidden:{control:`boolean`,description:`Visually hide the label (still accessible to screen readers)`},description:{control:`text`,description:`Description text displayed below the label`},density:{control:`select`,options:[`compact`,`balanced`,`spacious`],description:`Spacing density for list items`},hasDividers:{control:`boolean`,description:`Whether to show dividers between items`},isDisabled:{control:`boolean`,description:`Whether all checkbox items are disabled`},disabledMessage:{control:`text`,description:`Explains why the group is disabled (whole-group state, not per item). With isDisabled, shows a tooltip on hover/keyboard focus and keeps the checkboxes focusable via aria-disabled (toggling stays blocked). Use this instead of wrapping a disabled CheckboxList in Tooltip.`}}},O={render:e=>{let[t,n]=(0,T.useState)(e.value??[]),{value:r,onChange:i,...a}=e;return(0,E.jsxs)(p,{...a,value:t,onChange:n,children:[(0,E.jsx)(m,{label:`Email`,value:`email`}),(0,E.jsx)(m,{label:`SMS`,value:`sms`}),(0,E.jsx)(m,{label:`Push notification`,value:`push`})]})},args:{label:`Notification preferences`}},k={render:e=>{let[t,n]=(0,T.useState)(e.value??[]),{value:r,onChange:i,...a}=e;return(0,E.jsxs)(p,{...a,value:t,onChange:n,children:[(0,E.jsx)(m,{label:`Email`,value:`email`,description:`Receive notifications via email`}),(0,E.jsx)(m,{label:`SMS`,value:`sms`,description:`Standard messaging rates apply`}),(0,E.jsx)(m,{label:`Push notification`,value:`push`,description:`Instant alerts on your device`})]})},args:{label:`Notification preferences`,description:`Choose how you would like to be notified`,hasDividers:!0}},A={render:e=>{let[t,n]=(0,T.useState)(e.value??[`analytics`]),{value:r,onChange:i,...a}=e;return(0,E.jsxs)(p,{...a,value:t,onChange:n,children:[(0,E.jsx)(m,{label:(0,E.jsxs)(E.Fragment,{children:[`Analytics `,(0,E.jsx)(v,{href:`#analytics-details`,children:`details`})]}),value:`analytics`,description:(0,E.jsxs)(E.Fragment,{children:[`Usage data only. `,(0,E.jsx)(v,{href:`#privacy`,children:`Read the policy`})]}),endContent:(0,E.jsx)(`span`,{"data-testid":`checkbox-end-content`,children:`$0/mo`})}),(0,E.jsx)(m,{label:`Personalization`,value:`personalization`,description:(0,E.jsxs)(E.Fragment,{children:[`Tailors what you see. `,(0,E.jsx)(v,{href:`#privacy`,children:`Learn more`})]})})]})},args:{label:`Data sharing`,description:`Labels and descriptions can carry links and other rich content without toggling the item.`}},j={render:e=>{let t=[{id:`react`,label:`React`},{id:`vue`,label:`Vue`},{id:`angular`,label:`Angular`},{id:`svelte`,label:`Svelte`}],[n,r]=(0,T.useState)([`react`]),{value:i,onChange:a,...o}=e;return(0,E.jsx)(p,{...o,value:n,onChange:r,children:t.map(e=>(0,E.jsx)(m,{label:e.label,value:e.id},e.id))})},args:{label:`Frameworks`}},M={render:()=>{let[e,t]=(0,T.useState)(!1),[n,r]=(0,T.useState)(!0),[i,a]=(0,T.useState)(!1);return(0,E.jsxs)(u,{children:[(0,E.jsx)(m,{label:`Accept terms and conditions`,isChecked:e,onCheck:t}),(0,E.jsx)(m,{label:`Subscribe to newsletter`,description:`Weekly updates about new features`,isChecked:n,onCheck:r}),(0,E.jsx)(m,{label:`Receive marketing emails`,isChecked:i,onCheck:a})]})}},N={render:()=>(0,E.jsxs)(u,{children:[(0,E.jsx)(m,{label:`Completed task`,isChecked:!0}),(0,E.jsx)(m,{label:`Pending task`,isChecked:!1}),(0,E.jsx)(m,{label:`In progress`,isChecked:`indeterminate`})]})},P={name:`Checkbox in a row's content`,render:()=>{let[e,t]=(0,T.useState)([]),[n,r]=(0,T.useState)(!1);return(0,E.jsxs)(p,{label:`Notifications`,value:e,onChange:t,children:[(0,E.jsx)(m,{label:`Email`,value:`email`,endContent:(0,E.jsx)(g,{label:`Daily digest`,value:n,onChange:r})}),(0,E.jsx)(m,{label:`SMS`,value:`sms`})]})}},F={name:`Checkbox list in a row's content`,render:()=>{let[e,t]=(0,T.useState)([]),[n,r]=(0,T.useState)([]);return(0,E.jsxs)(p,{label:`Notifications`,value:e,onChange:t,children:[(0,E.jsx)(m,{label:`Email`,value:`email`,endContent:(0,E.jsxs)(p,{label:`Email channels`,value:n,onChange:r,children:[(0,E.jsx)(m,{label:`Work`,value:`work`}),(0,E.jsx)(m,{label:`Personal`,value:`personal`})]})}),(0,E.jsx)(m,{label:`SMS`,value:`sms`})]})}},I={render:()=>{let e=[`email`,`sms`,`push`],[t,n]=(0,T.useState)([`email`]),r=e.every(e=>t.includes(e)),i=t.length===0,a=r?!0:!i&&`indeterminate`;return(0,E.jsxs)(p,{label:`Notifications`,hasDividers:!0,children:[(0,E.jsx)(m,{label:`Select all`,isChecked:a,onCheck:t=>{n(t?[...e]:[])}}),e.map(e=>(0,E.jsx)(m,{label:e.charAt(0).toUpperCase()+e.slice(1),isChecked:t.includes(e),onCheck:t=>{n(n=>t?[...n,e]:n.filter(t=>t!==e))}},e))]})}},L={render:()=>(0,E.jsx)(y,{})},R={render:e=>{let[t,n]=(0,T.useState)([`email`]),{value:r,onChange:i,...a}=e;return(0,E.jsxs)(p,{...a,value:t,onChange:n,children:[(0,E.jsx)(m,{label:`Email`,value:`email`}),(0,E.jsx)(m,{label:`SMS`,value:`sms`}),(0,E.jsx)(m,{label:`Push notification`,value:`push`})]})},args:{label:`Notification preferences`,isDisabled:!0}},z={render:()=>{let[e,t]=(0,T.useState)([`email`]);return(0,E.jsxs)(p,{label:`Notification preferences`,value:e,onChange:t,children:[(0,E.jsx)(m,{label:`Email`,value:`email`}),(0,E.jsx)(m,{label:`SMS`,value:`sms`,isLoading:!0}),(0,E.jsx)(m,{label:`Push notification`,value:`push`})]})}},B={render:()=>{let[e,t]=(0,T.useState)([`email`]);return(0,E.jsxs)(p,{label:`Notification preferences`,description:`Toggle an option — it spins while saving`,value:e,changeAction:e=>new Promise(n=>{setTimeout(()=>{t(e),n()},1500)}),hasDividers:!0,children:[(0,E.jsx)(m,{label:`Email`,value:`email`}),(0,E.jsx)(m,{label:`SMS`,value:`sms`}),(0,E.jsx)(m,{label:`Push notification`,value:`push`})]})}},V={render:e=>{let[t,n]=(0,T.useState)([]),{value:r,onChange:i,...a}=e;return(0,E.jsxs)(p,{...a,value:t,onChange:n,children:[(0,E.jsx)(m,{label:`Email`,value:`email`}),(0,E.jsx)(m,{label:`SMS`,value:`sms`,isDisabled:!0}),(0,E.jsx)(m,{label:`Push notification`,value:`push`})]})},args:{label:`Notification preferences`}},H={render:e=>{let[t,n]=(0,T.useState)([]),{value:r,onChange:i,...a}=e;return(0,E.jsxs)(p,{...a,value:t,onChange:n,children:[(0,E.jsx)(m,{label:`Email`,value:`email`}),(0,E.jsx)(m,{label:`SMS`,value:`sms`}),(0,E.jsx)(m,{label:`Push notification`,value:`push`})]})},args:{label:`Notification preferences`,description:`Leave all unchecked to receive no notifications.`,isOptional:!0}},U={render:e=>{let[t,n]=(0,T.useState)([]),[r,i]=(0,T.useState)(!1),{value:a,onChange:o,...s}=e;return(0,E.jsxs)(`form`,{onSubmit:e=>{e.preventDefault(),i(!0)},children:[(0,E.jsxs)(p,{...s,value:t,onChange:n,children:[(0,E.jsx)(m,{label:`Design`,value:`design`}),(0,E.jsx)(m,{label:`Engineering`,value:`eng`}),(0,E.jsx)(m,{label:`Research`,value:`research`})]}),(0,E.jsx)(`button`,{type:`submit`,children:`Submit`}),r?(0,E.jsx)(`p`,{children:`Submitted`}):null]})},args:{label:`Topics`,description:`Choose at least one.`,isRequired:!0}},W={render:e=>{let[t,n]=(0,T.useState)([]),{value:r,onChange:i,...a}=e;return(0,E.jsxs)(p,{...a,value:t,onChange:n,children:[(0,E.jsx)(m,{label:`Email`,value:`email`}),(0,E.jsx)(m,{label:`SMS`,value:`sms`}),(0,E.jsx)(m,{label:`Push notification`,value:`push`})]})},args:{label:`Notification preferences`,status:{type:`error`,message:`Please select at least one notification method`}}},G={render:e=>{let[t,n]=(0,T.useState)([`free`]),{value:r,onChange:a,...o}=e;return(0,E.jsxs)(p,{...o,value:t,onChange:n,children:[(0,E.jsx)(m,{label:`Free tier`,value:`free`,description:`Basic features included`,endContent:(0,E.jsx)(i,{variant:`success`,label:`$0/mo`})}),(0,E.jsx)(m,{label:`Pro tier`,value:`pro`,description:`Advanced features`,endContent:(0,E.jsx)(i,{variant:`info`,label:`$9/mo`})}),(0,E.jsx)(m,{label:`Enterprise`,value:`enterprise`,description:`Custom solutions`,endContent:(0,E.jsx)(i,{variant:`purple`,label:`Custom`})})]})},args:{label:`Add-on packages`,hasDividers:!0}},K={render:()=>{let[e,t]=(0,T.useState)([]),[n,r]=(0,T.useState)([`email`]),[i,a]=(0,T.useState)(!1),[o,s]=(0,T.useState)(!0);return(0,E.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:`24px`,maxWidth:`400px`},children:[(0,E.jsxs)(p,{label:`Unselected`,value:e,onChange:t,children:[(0,E.jsx)(m,{label:`Option A`,value:`a`}),(0,E.jsx)(m,{label:`Option B`,value:`b`})]}),(0,E.jsxs)(p,{label:`Pre-selected`,value:n,onChange:r,children:[(0,E.jsx)(m,{label:`Email`,value:`email`}),(0,E.jsx)(m,{label:`SMS`,value:`sms`})]}),(0,E.jsxs)(p,{label:`Disabled group`,value:[`a`],onChange:()=>{},isDisabled:!0,children:[(0,E.jsx)(m,{label:`Option A`,value:`a`}),(0,E.jsx)(m,{label:`Option B`,value:`b`})]}),(0,E.jsxs)(p,{label:`With descriptions`,value:e,onChange:t,hasDividers:!0,children:[(0,E.jsx)(m,{label:`Email`,value:`email`,description:`Delivered to your inbox`}),(0,E.jsx)(m,{label:`SMS`,value:`sms`,description:`Standard rates apply`})]}),(0,E.jsxs)(p,{label:`With error`,value:[],onChange:()=>{},status:{type:`error`,message:`Please select at least one option`},children:[(0,E.jsx)(m,{label:`Option A`,value:`a`}),(0,E.jsx)(m,{label:`Option B`,value:`b`})]}),(0,E.jsxs)(`div`,{children:[(0,E.jsx)(`h4`,{style:{margin:`0 0 8px`},children:`Standalone mode`}),(0,E.jsxs)(u,{children:[(0,E.jsx)(m,{label:`Accept terms`,isChecked:i,onCheck:a}),(0,E.jsx)(m,{label:`Subscribe`,isChecked:o,onCheck:s})]})]})]})}},q={render(){let[e,t]=(0,T.useState)([`email`]);return(0,E.jsx)(`div`,{style:{maxWidth:400},children:(0,E.jsx)(o,{children:(0,E.jsxs)(p,{label:`Notifications`,description:`Choose how to be notified`,value:e,onChange:t,children:[(0,E.jsx)(m,{value:`email`,label:`Email`,description:`Weekly digest`}),(0,E.jsx)(m,{value:`push`,label:`Push notifications`}),(0,E.jsx)(m,{value:`sms`,label:`SMS`,isDisabled:!0})]})})})}},J={render(){let[e,t]=(0,T.useState)([`admin`]);return(0,E.jsx)(`div`,{style:{maxWidth:400},children:(0,E.jsx)(o,{children:(0,E.jsxs)(p,{label:`Assign Roles`,value:e,onChange:t,hasDividers:!0,children:[(0,E.jsx)(m,{value:`admin`,label:`Admin`}),(0,E.jsx)(m,{value:`editor`,label:`Editor`}),(0,E.jsx)(m,{value:`viewer`,label:`Viewer`}),(0,E.jsx)(m,{value:`guest`,label:`Guest`})]})})})}},Y={name:`Inside a clickable card`,render(){let[e,t]=(0,T.useState)([`email`]);return(0,E.jsx)(`div`,{style:{maxWidth:400},children:(0,E.jsx)(c,{label:`Notification settings`,onClick:()=>{},children:(0,E.jsxs)(p,{label:`Notifications`,value:e,onChange:t,children:[(0,E.jsx)(m,{value:`email`,label:`Email`}),(0,E.jsx)(m,{value:`sms`,label:`SMS`})]})})})}},X={render:e=>{let[t,n]=(0,T.useState)([`comments`]),{value:r,onChange:i,...a}=e;return(0,E.jsxs)(p,{...a,value:t,onChange:n,children:[(0,E.jsx)(m,{label:`Comments, mentions, and replies across every shared workspace`,value:`comments`,description:`Delivered to the primary address listed in your account settings`}),(0,E.jsx)(m,{label:(0,E.jsx)(`span`,{children:`Security alerts for new sign-ins on phones, tablets, and desktops`}),value:`security`,description:(0,E.jsx)(`span`,{children:`Includes a weekly summary of every device that accessed your account`})}),(0,E.jsx)(m,{label:`SMS`,value:`sms`})]})},args:{label:`Notification channels for workspace activity and account security`,description:`Choose every channel that should receive these notifications. You can change this at any time.`,width:280,hasDividers:!0}},Z={render:e=>{let[t,n]=(0,T.useState)([`email`]),{value:r,onChange:i,...a}=e;return(0,E.jsxs)(p,{...a,value:t,onChange:n,children:[(0,E.jsx)(m,{label:`Email`,value:`email`}),(0,E.jsx)(m,{label:`SMS`,value:`sms`}),(0,E.jsx)(m,{label:`Push notification`,value:`push`})]})},args:{label:`Notification preferences`,isDisabled:!0,disabledMessage:`Notifications are managed by your administrator`}},O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
  render: args => {
    const [value, setValue] = useState<string[]>(args.value ?? []);
    const {
      value: _value,
      onChange: _onChange,
      ...restArgs
    } = args;
    return <CheckboxList {...restArgs} value={value} onChange={setValue}>
        <CheckboxListItem label="Email" value="email" />
        <CheckboxListItem label="SMS" value="sms" />
        <CheckboxListItem label="Push notification" value="push" />
      </CheckboxList>;
  },
  args: {
    label: 'Notification preferences'
  }
}`,...O.parameters?.docs?.source}}},k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
  render: args => {
    const [value, setValue] = useState<string[]>(args.value ?? []);
    const {
      value: _value,
      onChange: _onChange,
      ...restArgs
    } = args;
    return <CheckboxList {...restArgs} value={value} onChange={setValue}>
        <CheckboxListItem label="Email" value="email" description="Receive notifications via email" />
        <CheckboxListItem label="SMS" value="sms" description="Standard messaging rates apply" />
        <CheckboxListItem label="Push notification" value="push" description="Instant alerts on your device" />
      </CheckboxList>;
  },
  args: {
    label: 'Notification preferences',
    description: 'Choose how you would like to be notified',
    hasDividers: true
  }
}`,...k.parameters?.docs?.source}}},A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`{
  render: args => {
    const [value, setValue] = useState<string[]>(args.value ?? ['analytics']);
    const {
      value: _value,
      onChange: _onChange,
      ...restArgs
    } = args;
    return <CheckboxList {...restArgs} value={value} onChange={setValue}>
        <CheckboxListItem label={<>
              Analytics <Link href="#analytics-details">details</Link>
            </>} value="analytics" description={<>
              Usage data only. <Link href="#privacy">Read the policy</Link>
            </>} endContent={<span data-testid="checkbox-end-content">$0/mo</span>} />
        <CheckboxListItem label="Personalization" value="personalization" description={<>
              Tailors what you see. <Link href="#privacy">Learn more</Link>
            </>} />
      </CheckboxList>;
  },
  args: {
    label: 'Data sharing',
    description: 'Labels and descriptions can carry links and other rich content without toggling the item.'
  }
}`,...A.parameters?.docs?.source}}},j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
  render: args => {
    const items = [{
      id: 'react',
      label: 'React'
    }, {
      id: 'vue',
      label: 'Vue'
    }, {
      id: 'angular',
      label: 'Angular'
    }, {
      id: 'svelte',
      label: 'Svelte'
    }];
    const [value, setValue] = useState<string[]>(['react']);
    const {
      value: _value,
      onChange: _onChange,
      ...restArgs
    } = args;
    return <CheckboxList {...restArgs} value={value} onChange={setValue}>
        {items.map(item => <CheckboxListItem key={item.id} label={item.label} value={item.id} />)}
      </CheckboxList>;
  },
  args: {
    label: 'Frameworks'
  }
}`,...j.parameters?.docs?.source}}},M.parameters={...M.parameters,docs:{...M.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [accepted, setAccepted] = useState(false);
    const [subscribed, setSubscribed] = useState(true);
    const [marketing, setMarketing] = useState(false);
    return <List>
        <CheckboxListItem label="Accept terms and conditions" isChecked={accepted} onCheck={setAccepted} />
        <CheckboxListItem label="Subscribe to newsletter" description="Weekly updates about new features" isChecked={subscribed} onCheck={setSubscribed} />
        <CheckboxListItem label="Receive marketing emails" isChecked={marketing} onCheck={setMarketing} />
      </List>;
  }
}`,...M.parameters?.docs?.source}}},N.parameters={...N.parameters,docs:{...N.parameters?.docs,source:{originalSource:`{
  render: () => <List>
      <CheckboxListItem label="Completed task" isChecked={true} />
      <CheckboxListItem label="Pending task" isChecked={false} />
      <CheckboxListItem label="In progress" isChecked="indeterminate" />
    </List>
}`,...N.parameters?.docs?.source}}},P.parameters={...P.parameters,docs:{...P.parameters?.docs,source:{originalSource:`{
  name: "Checkbox in a row's content",
  render: () => {
    const [value, setValue] = useState<string[]>([]);
    const [digest, setDigest] = useState(false);
    return <CheckboxList label="Notifications" value={value} onChange={setValue}>
        <CheckboxListItem label="Email" value="email" endContent={<CheckboxInput label="Daily digest" value={digest} onChange={setDigest} />} />
        <CheckboxListItem label="SMS" value="sms" />
      </CheckboxList>;
  }
}`,...P.parameters?.docs?.source},description:{story:`A checkbox placed in a row's content is its own control. Under a finger it
paints its own press, and the row it sits in does not.`,...P.parameters?.docs?.description}}},F.parameters={...F.parameters,docs:{...F.parameters?.docs,source:{originalSource:`{
  name: "Checkbox list in a row's content",
  render: () => {
    const [value, setValue] = useState<string[]>([]);
    const [channels, setChannels] = useState<string[]>([]);
    return <CheckboxList label="Notifications" value={value} onChange={setValue}>
        <CheckboxListItem label="Email" value="email" endContent={<CheckboxList label="Email channels" value={channels} onChange={setChannels}>
              <CheckboxListItem label="Work" value="work" />
              <CheckboxListItem label="Personal" value="personal" />
            </CheckboxList>} />
        <CheckboxListItem label="SMS" value="sms" />
      </CheckboxList>;
  }
}`,...F.parameters?.docs?.source}}},I.parameters={...I.parameters,docs:{...I.parameters?.docs,source:{originalSource:`{
  render: () => {
    const allItems = ['email', 'sms', 'push'];
    const [selected, setSelected] = useState<string[]>(['email']);
    const allChecked = allItems.every(item => selected.includes(item));
    const noneChecked = selected.length === 0;
    const selectAllState = allChecked ? true : noneChecked ? false : 'indeterminate' as const;
    const handleSelectAll = (checked: boolean) => {
      if (checked) {
        setSelected([...allItems]);
      } else {
        setSelected([]);
      }
    };
    return <CheckboxList label="Notifications" hasDividers>
        <CheckboxListItem label="Select all" isChecked={selectAllState} onCheck={handleSelectAll} />
        {allItems.map(item => <CheckboxListItem key={item} label={item.charAt(0).toUpperCase() + item.slice(1)} isChecked={selected.includes(item)} onCheck={checked => {
        setSelected(prev => checked ? [...prev, item] : prev.filter(v => v !== item));
      }} />)}
      </CheckboxList>;
  }
}`,...I.parameters?.docs?.source}}},L.parameters={...L.parameters,docs:{...L.parameters?.docs,source:{originalSource:`{
  render: () => <CheckboxListSelectAllPattern />
}`,...L.parameters?.docs?.source},description:{story:`The select-all block exactly as the CLI ships it, so browser and axe audits
cover the copied template rather than a look-alike.`,...L.parameters?.docs?.description}}},R.parameters={...R.parameters,docs:{...R.parameters?.docs,source:{originalSource:`{
  render: args => {
    const [value, setValue] = useState<string[]>(['email']);
    const {
      value: _value,
      onChange: _onChange,
      ...restArgs
    } = args;
    return <CheckboxList {...restArgs} value={value} onChange={setValue}>
        <CheckboxListItem label="Email" value="email" />
        <CheckboxListItem label="SMS" value="sms" />
        <CheckboxListItem label="Push notification" value="push" />
      </CheckboxList>;
  },
  args: {
    label: 'Notification preferences',
    isDisabled: true
  }
}`,...R.parameters?.docs?.source}}},z.parameters={...z.parameters,docs:{...z.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [value, setValue] = useState<string[]>(['email']);
    return <CheckboxList label="Notification preferences" value={value} onChange={setValue}>
        <CheckboxListItem label="Email" value="email" />
        <CheckboxListItem label="SMS" value="sms" isLoading />
        <CheckboxListItem label="Push notification" value="push" />
      </CheckboxList>;
  }
}`,...z.parameters?.docs?.source}}},B.parameters={...B.parameters,docs:{...B.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [value, setValue] = useState<string[]>(['email']);
    // Simulates persisting the new selection to a server. While the promise
    // is pending, the toggled item shows a spinner inside its checkbox and
    // blocks re-toggling; the other items stay interactive.
    const persist = (next: string[]) => new Promise<void>(resolve => {
      setTimeout(() => {
        setValue(next);
        resolve();
      }, 1500);
    });
    return <CheckboxList label="Notification preferences" description="Toggle an option — it spins while saving" value={value} changeAction={persist} hasDividers>
        <CheckboxListItem label="Email" value="email" />
        <CheckboxListItem label="SMS" value="sms" />
        <CheckboxListItem label="Push notification" value="push" />
      </CheckboxList>;
  }
}`,...B.parameters?.docs?.source}}},V.parameters={...V.parameters,docs:{...V.parameters?.docs,source:{originalSource:`{
  render: args => {
    const [value, setValue] = useState<string[]>([]);
    const {
      value: _value,
      onChange: _onChange,
      ...restArgs
    } = args;
    return <CheckboxList {...restArgs} value={value} onChange={setValue}>
        <CheckboxListItem label="Email" value="email" />
        <CheckboxListItem label="SMS" value="sms" isDisabled />
        <CheckboxListItem label="Push notification" value="push" />
      </CheckboxList>;
  },
  args: {
    label: 'Notification preferences'
  }
}`,...V.parameters?.docs?.source}}},H.parameters={...H.parameters,docs:{...H.parameters?.docs,source:{originalSource:`{
  render: args => {
    const [value, setValue] = useState<string[]>([]);
    const {
      value: _value,
      onChange: _onChange,
      ...restArgs
    } = args;
    return <CheckboxList {...restArgs} value={value} onChange={setValue}>
        <CheckboxListItem label="Email" value="email" />
        <CheckboxListItem label="SMS" value="sms" />
        <CheckboxListItem label="Push notification" value="push" />
      </CheckboxList>;
  },
  args: {
    label: 'Notification preferences',
    description: 'Leave all unchecked to receive no notifications.',
    isOptional: true
  }
}`,...H.parameters?.docs?.source}}},U.parameters={...U.parameters,docs:{...U.parameters?.docs,source:{originalSource:`{
  render: args => {
    const [value, setValue] = useState<string[]>([]);
    const [submitted, setSubmitted] = useState(false);
    const {
      value: _value,
      onChange: _onChange,
      ...restArgs
    } = args;
    return <form onSubmit={event => {
      event.preventDefault();
      setSubmitted(true);
    }}>
        <CheckboxList {...restArgs} value={value} onChange={setValue}>
          <CheckboxListItem label="Design" value="design" />
          <CheckboxListItem label="Engineering" value="eng" />
          <CheckboxListItem label="Research" value="research" />
        </CheckboxList>
        <button type="submit">Submit</button>
        {submitted ? <p>Submitted</p> : null}
      </form>;
  },
  args: {
    label: 'Topics',
    description: 'Choose at least one.',
    isRequired: true
  }
}`,...U.parameters?.docs?.source}}},W.parameters={...W.parameters,docs:{...W.parameters?.docs,source:{originalSource:`{
  render: args => {
    const [value, setValue] = useState<string[]>([]);
    const {
      value: _value,
      onChange: _onChange,
      ...restArgs
    } = args;
    return <CheckboxList {...restArgs} value={value} onChange={setValue}>
        <CheckboxListItem label="Email" value="email" />
        <CheckboxListItem label="SMS" value="sms" />
        <CheckboxListItem label="Push notification" value="push" />
      </CheckboxList>;
  },
  args: {
    label: 'Notification preferences',
    status: {
      type: 'error',
      message: 'Please select at least one notification method'
    }
  }
}`,...W.parameters?.docs?.source}}},G.parameters={...G.parameters,docs:{...G.parameters?.docs,source:{originalSource:`{
  render: args => {
    const [value, setValue] = useState<string[]>(['free']);
    const {
      value: _value,
      onChange: _onChange,
      ...restArgs
    } = args;
    return <CheckboxList {...restArgs} value={value} onChange={setValue}>
        <CheckboxListItem label="Free tier" value="free" description="Basic features included" endContent={<Badge variant="success" label="$0/mo" />} />
        <CheckboxListItem label="Pro tier" value="pro" description="Advanced features" endContent={<Badge variant="info" label="$9/mo" />} />
        <CheckboxListItem label="Enterprise" value="enterprise" description="Custom solutions" endContent={<Badge variant="purple" label="Custom" />} />
      </CheckboxList>;
  },
  args: {
    label: 'Add-on packages',
    hasDividers: true
  }
}`,...G.parameters?.docs?.source}}},K.parameters={...K.parameters,docs:{...K.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [value1, setValue1] = useState<string[]>([]);
    const [value2, setValue2] = useState<string[]>(['email']);
    const [standalone1, setStandalone1] = useState(false);
    const [standalone2, setStandalone2] = useState(true);
    return <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '24px',
      maxWidth: '400px'
    }}>
        <CheckboxList label="Unselected" value={value1} onChange={setValue1}>
          <CheckboxListItem label="Option A" value="a" />
          <CheckboxListItem label="Option B" value="b" />
        </CheckboxList>
        <CheckboxList label="Pre-selected" value={value2} onChange={setValue2}>
          <CheckboxListItem label="Email" value="email" />
          <CheckboxListItem label="SMS" value="sms" />
        </CheckboxList>
        <CheckboxList label="Disabled group" value={['a']} onChange={() => {}} isDisabled>
          <CheckboxListItem label="Option A" value="a" />
          <CheckboxListItem label="Option B" value="b" />
        </CheckboxList>
        <CheckboxList label="With descriptions" value={value1} onChange={setValue1} hasDividers>
          <CheckboxListItem label="Email" value="email" description="Delivered to your inbox" />
          <CheckboxListItem label="SMS" value="sms" description="Standard rates apply" />
        </CheckboxList>
        <CheckboxList label="With error" value={[]} onChange={() => {}} status={{
        type: 'error',
        message: 'Please select at least one option'
      }}>
          <CheckboxListItem label="Option A" value="a" />
          <CheckboxListItem label="Option B" value="b" />
        </CheckboxList>
        <div>
          <h4 style={{
          margin: '0 0 8px'
        }}>Standalone mode</h4>
          <List>
            <CheckboxListItem label="Accept terms" isChecked={standalone1} onCheck={setStandalone1} />
            <CheckboxListItem label="Subscribe" isChecked={standalone2} onCheck={setStandalone2} />
          </List>
        </div>
      </div>;
  }
}`,...K.parameters?.docs?.source}}},q.parameters={...q.parameters,docs:{...q.parameters?.docs,source:{originalSource:`{
  render() {
    const [selected, setSelected] = useState<string[]>(['email']);
    return <div style={{
      maxWidth: 400
    }}>
        <Card>
          <CheckboxList label="Notifications" description="Choose how to be notified" value={selected} onChange={setSelected}>
            <CheckboxListItem value="email" label="Email" description="Weekly digest" />
            <CheckboxListItem value="push" label="Push notifications" />
            <CheckboxListItem value="sms" label="SMS" isDisabled />
          </CheckboxList>
        </Card>
      </div>;
  }
}`,...q.parameters?.docs?.source}}},J.parameters={...J.parameters,docs:{...J.parameters?.docs,source:{originalSource:`{
  render() {
    const [selected, setSelected] = useState<string[]>(['admin']);
    return <div style={{
      maxWidth: 400
    }}>
        <Card>
          <CheckboxList label="Assign Roles" value={selected} onChange={setSelected} hasDividers>
            <CheckboxListItem value="admin" label="Admin" />
            <CheckboxListItem value="editor" label="Editor" />
            <CheckboxListItem value="viewer" label="Viewer" />
            <CheckboxListItem value="guest" label="Guest" />
          </CheckboxList>
        </Card>
      </div>;
  }
}`,...J.parameters?.docs?.source}}},Y.parameters={...Y.parameters,docs:{...Y.parameters?.docs,source:{originalSource:`{
  name: 'Inside a clickable card',
  render() {
    const [selected, setSelected] = useState<string[]>(['email']);
    return <div style={{
      maxWidth: 400
    }}>
        <ClickableCard label="Notification settings" onClick={() => {}}>
          <CheckboxList label="Notifications" value={selected} onChange={setSelected}>
            <CheckboxListItem value="email" label="Email" />
            <CheckboxListItem value="sms" label="SMS" />
          </CheckboxList>
        </ClickableCard>
      </div>;
  }
}`,...Y.parameters?.docs?.source}}},X.parameters={...X.parameters,docs:{...X.parameters?.docs,source:{originalSource:`{
  render: args => {
    const [value, setValue] = useState<string[]>(['comments']);
    const {
      value: _value,
      onChange: _onChange,
      ...restArgs
    } = args;
    return <CheckboxList {...restArgs} value={value} onChange={setValue}>
        <CheckboxListItem label="Comments, mentions, and replies across every shared workspace" value="comments" description="Delivered to the primary address listed in your account settings" />
        <CheckboxListItem label={<span>
              Security alerts for new sign-ins on phones, tablets, and desktops
            </span>} value="security" description={<span>
              Includes a weekly summary of every device that accessed your
              account
            </span>} />
        <CheckboxListItem label="SMS" value="sms" />
      </CheckboxList>;
  },
  args: {
    label: 'Notification channels for workspace activity and account security',
    description: 'Choose every channel that should receive these notifications. You can change this at any time.',
    width: 280,
    hasDividers: true
  }
}`,...X.parameters?.docs?.source}}},Z.parameters={...Z.parameters,docs:{...Z.parameters?.docs,source:{originalSource:`{
  render: args => {
    const [value, setValue] = useState<string[]>(['email']);
    const {
      value: _value,
      onChange: _onChange,
      ...restArgs
    } = args;
    return <CheckboxList {...restArgs} value={value} onChange={setValue}>
        <CheckboxListItem label="Email" value="email" />
        <CheckboxListItem label="SMS" value="sms" />
        <CheckboxListItem label="Push notification" value="push" />
      </CheckboxList>;
  },
  args: {
    label: 'Notification preferences',
    isDisabled: true,
    disabledMessage: 'Notifications are managed by your administrator'
  }
}`,...Z.parameters?.docs?.source}}},Q=[`Default`,`WithDescriptions`,`RichDescriptions`,`DynamicItems`,`StandaloneMode`,`ReadOnly`,`CheckboxInRowContent`,`CheckboxListInRowContent`,`SelectAllWithIndeterminate`,`SelectAllPatternBlock`,`Disabled`,`Loading`,`ChangeAction`,`DisabledItem`,`Optional`,`Required`,`WithErrorStatus`,`WithEndContent`,`AllVariations`,`InsideCard`,`InsideCardWithDividers`,`InsideClickableCard`,`LongContent`,`DisabledWithMessage`]})))()}$();export{K as AllVariations,B as ChangeAction,P as CheckboxInRowContent,F as CheckboxListInRowContent,O as Default,R as Disabled,V as DisabledItem,Z as DisabledWithMessage,j as DynamicItems,q as InsideCard,J as InsideCardWithDividers,Y as InsideClickableCard,z as Loading,X as LongContent,H as Optional,N as ReadOnly,U as Required,A as RichDescriptions,L as SelectAllPatternBlock,I as SelectAllWithIndeterminate,M as StandaloneMode,k as WithDescriptions,G as WithEndContent,W as WithErrorStatus,Q as __namedExportsOrder,D as default};