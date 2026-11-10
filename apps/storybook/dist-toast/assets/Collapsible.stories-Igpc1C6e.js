import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{t}from"./react-DlPsW1c0.js";import{t as n}from"./jsx-runtime-MKhVqBIO.js";import{n as r,t as i}from"./Button-DoGM0DEN.js";import{n as a,t as o}from"./Card-DA0ZfoAz.js";import{n as s,t as c}from"./VStack-SWtDePqc.js";import{n as l,t as u}from"./Collapsible-twVulli-.js";import{n as d,t as f}from"./CollapsibleGroup-DK_3HHuD.js";function p(){let[e,t]=(0,m.useState)(!0);return(0,m.useEffect)(()=>{let e=e=>{e.key===`[`&&t(e=>!e)};return document.addEventListener(`keydown`,e),()=>document.removeEventListener(`keydown`,e)},[]),(0,h.jsxs)(c,{gap:2,children:[(0,h.jsx)(u,{trigger:`Details`,isOpen:e,onOpenChange:t,children:(0,h.jsx)(i,{label:`Inside`,variant:`secondary`})}),(0,h.jsx)(i,{label:`Elsewhere`,variant:`secondary`})]})}var m,h,g,_,v,y,b,x,S,C,w,T,E,D,O,k,A;function j(){return(j=e((()=>{m=t(),l(),d(),r(),a(),s(),h=n(),g={dividedContainer:{ks0D6T:`x17fpy1y`,$$css:!0}},_={title:`Core/Collapsible`,component:f,tags:[`autodocs`],argTypes:{hasDividers:{control:`boolean`,description:`Draw hairline dividers between the group's items`},density:{control:`select`,options:[`compact`,`balanced`,`spacious`],description:`Row density for trigger and content padding`}},decorators:[e=>(0,h.jsx)(`div`,{className:`x1eiddq6 x1gt495`,children:(0,h.jsx)(e,{})})]},v={name:`Single Mode — Leading Chevron`,render:()=>(0,h.jsx)(f,{type:`single`,defaultValue:`general`,chevronPosition:`start`,children:(0,h.jsxs)(c,{gap:2,children:[(0,h.jsx)(o,{children:(0,h.jsx)(u,{trigger:`General Settings`,value:`general`,children:(0,h.jsx)(`p`,{className:`x9ynric x1tgivj0 x1ghz6dp`,children:`Configure your general preferences including language, timezone, and display options.`})})}),(0,h.jsx)(o,{children:(0,h.jsx)(u,{trigger:`Privacy Settings`,value:`privacy`,children:(0,h.jsx)(`p`,{className:`x9ynric x1tgivj0 x1ghz6dp`,children:`Manage who can see your profile, activity, and personal information.`})})}),(0,h.jsx)(o,{children:(0,h.jsx)(u,{trigger:`Notification Settings`,value:`notifications`,children:(0,h.jsx)(`p`,{className:`x9ynric x1tgivj0 x1ghz6dp`,children:`Choose which notifications you receive and how they are delivered.`})})})]})})},y={name:`Multiple Mode`,render:()=>(0,h.jsx)(f,{type:`multiple`,defaultValue:[`faq1`,`faq3`],children:(0,h.jsxs)(c,{gap:2,children:[(0,h.jsx)(o,{children:(0,h.jsx)(u,{trigger:`What is Astryx?`,value:`faq1`,children:(0,h.jsx)(`p`,{className:`x9ynric x1tgivj0 x1ghz6dp`,children:`Astryx is a design system for building internal tools and products.`})})}),(0,h.jsx)(o,{children:(0,h.jsx)(u,{trigger:`How do I install it?`,value:`faq2`,children:(0,h.jsxs)(`p`,{className:`x9ynric x1tgivj0 x1ghz6dp`,children:[`Run `,(0,h.jsx)(`code`,{children:`npm install @astryxdesign/core`}),` to get started.`]})})}),(0,h.jsx)(o,{children:(0,h.jsx)(u,{trigger:`Is it open source?`,value:`faq3`,children:(0,h.jsx)(`p`,{className:`x9ynric x1tgivj0 x1ghz6dp`,children:`Yes! Astryx is open source and available on GitHub.`})})})]})})},b={name:`Controlled`,render:function(){let[e,t]=(0,m.useState)(`section1`);return(0,h.jsxs)(`div`,{children:[(0,h.jsxs)(`p`,{className:`xv1l7n4 xif65rj x9ynric x1ghz6dp`,children:[`Currently open: `,(0,h.jsx)(`strong`,{children:String(e)||`(none)`})]}),(0,h.jsx)(f,{type:`single`,value:e,onChange:t,children:(0,h.jsxs)(c,{gap:2,children:[(0,h.jsx)(o,{children:(0,h.jsx)(u,{trigger:`Section 1`,value:`section1`,children:(0,h.jsx)(`p`,{className:`x9ynric x1tgivj0 x1ghz6dp`,children:`Content for section 1.`})})}),(0,h.jsx)(o,{children:(0,h.jsx)(u,{trigger:`Section 2`,value:`section2`,children:(0,h.jsx)(`p`,{className:`x9ynric x1tgivj0 x1ghz6dp`,children:`Content for section 2.`})})}),(0,h.jsx)(o,{children:(0,h.jsx)(u,{trigger:`Section 3`,value:`section3`,children:(0,h.jsx)(`p`,{className:`x9ynric x1tgivj0 x1ghz6dp`,children:`Content for section 3.`})})})]})})]})}},x={name:`Standalone Collapsible`,render:()=>(0,h.jsxs)(c,{gap:2,children:[(0,h.jsx)(o,{children:(0,h.jsx)(u,{trigger:`Starts open (default)`,children:(0,h.jsx)(`p`,{className:`x9ynric x1tgivj0 x1ghz6dp`,children:`This collapsible manages its own state. Click the trigger to toggle.`})})}),(0,h.jsx)(o,{children:(0,h.jsx)(u,{trigger:`Starts collapsed`,defaultIsOpen:!1,children:(0,h.jsx)(`p`,{className:`x9ynric x1tgivj0 x1ghz6dp`,children:`This collapsible starts collapsed. Click to reveal.`})})})]})},S={name:`Disabled item`,render:()=>(0,h.jsxs)(c,{gap:2,children:[(0,h.jsx)(o,{children:(0,h.jsx)(u,{trigger:`Enabled — click to toggle`,children:(0,h.jsx)(`p`,{className:`x9ynric x1tgivj0 x1ghz6dp`,children:`This section can be toggled.`})})}),(0,h.jsx)(o,{children:(0,h.jsx)(u,{trigger:`Disabled — can't be toggled`,isDisabled:!0,children:(0,h.jsx)(`p`,{className:`x9ynric x1tgivj0 x1ghz6dp`,children:`The trigger is non-interactive and dimmed.`})})}),(0,h.jsx)(o,{children:(0,h.jsx)(u,{trigger:`Disabled but open`,isDisabled:!0,defaultIsOpen:!0,children:(0,h.jsx)(`p`,{className:`x9ynric x1tgivj0 x1ghz6dp`,children:`Disabling doesn't collapse an already-open item; the content stays visible.`})})})]})},C={name:`Without Card (standalone)`,render:()=>(0,h.jsxs)(c,{gap:2,children:[(0,h.jsx)(u,{trigger:`Show more details`,children:(0,h.jsx)(`p`,{className:`x9ynric x1tgivj0 x1ghz6dp`,children:`Collapsible works anywhere; it doesn't require a card wrapper.`})}),(0,h.jsx)(u,{trigger:`Another section`,defaultIsOpen:!1,children:(0,h.jsx)(`p`,{className:`x9ynric x1tgivj0 x1ghz6dp`,children:`This section starts collapsed.`})})]})},w={name:`Dividers`,args:{type:`single`,hasDividers:!0,defaultValue:`q1`},render:e=>(0,h.jsx)(`div`,{className:`x17fpy1y`,children:(0,h.jsxs)(f,{...e,children:[(0,h.jsx)(u,{trigger:`How do I reset my password?`,value:`q1`,children:(0,h.jsx)(`p`,{className:`x9ynric x1tgivj0 x1ghz6dp`,children:`Go to Settings → Security → Change Password. You'll receive a confirmation email.`})}),(0,h.jsx)(u,{trigger:`Can I change my username?`,value:`q2`,children:(0,h.jsx)(`p`,{className:`x9ynric x1tgivj0 x1ghz6dp`,children:`Usernames can be changed once every 30 days from your profile settings.`})}),(0,h.jsx)(u,{trigger:`How do I delete my account?`,value:`q3`,children:(0,h.jsx)(`p`,{className:`x9ynric x1tgivj0 x1ghz6dp`,children:`Account deletion is permanent. Your data will be removed within 30 days.`})})]})})},T={name:`Dividers — Multiple`,args:{type:`multiple`,hasDividers:!0,defaultValue:[`a`]},render:e=>(0,h.jsx)(`div`,{className:`x17fpy1y`,children:(0,h.jsxs)(f,{...e,children:[(0,h.jsx)(u,{trigger:`Deployment Details`,value:`a`,children:(0,h.jsx)(`p`,{className:`x9ynric x1tgivj0 x1ghz6dp`,children:`Deployed 2 hours ago from the main branch.`})}),(0,h.jsx)(u,{trigger:`Environment Variables`,value:`b`,children:(0,h.jsx)(`p`,{className:`x9ynric x1tgivj0 x1ghz6dp`,children:`12 variables configured for this environment.`})}),(0,h.jsx)(u,{trigger:`Build Logs`,value:`c`,children:(0,h.jsx)(`p`,{className:`x9ynric x1tgivj0 x1ghz6dp`,children:`Build completed in 43 seconds.`})})]})})},E={name:`Dividers — Density`,render:()=>(0,h.jsx)(c,{gap:6,xstyle:g.dividedContainer,children:[`compact`,`balanced`,`spacious`].map(e=>(0,h.jsxs)(f,{type:`multiple`,hasDividers:!0,density:e,defaultValue:[`one`],children:[(0,h.jsx)(u,{trigger:`First section (${e})`,value:`one`,children:(0,h.jsx)(`p`,{className:`x9ynric x1tgivj0 x1ghz6dp`,children:`Row padding scales with density.`})}),(0,h.jsx)(u,{trigger:`Second section`,value:`two`,children:(0,h.jsx)(`p`,{className:`x9ynric x1tgivj0 x1ghz6dp`,children:`Collapsed by default.`})})]},e))})},D={name:`FAQ Page`,render:()=>(0,h.jsx)(f,{type:`single`,children:(0,h.jsxs)(c,{gap:2,children:[(0,h.jsx)(o,{children:(0,h.jsx)(u,{trigger:`How do I reset my password?`,value:`q1`,children:(0,h.jsx)(`p`,{className:`x9ynric x1tgivj0 x1ghz6dp`,children:`Go to Settings → Security → Change Password. You'll receive a confirmation email.`})})}),(0,h.jsx)(o,{children:(0,h.jsx)(u,{trigger:`Can I change my username?`,value:`q2`,children:(0,h.jsx)(`p`,{className:`x9ynric x1tgivj0 x1ghz6dp`,children:`Usernames can be changed once every 30 days from your profile settings.`})})}),(0,h.jsx)(o,{children:(0,h.jsx)(u,{trigger:`How do I delete my account?`,value:`q3`,children:(0,h.jsx)(`p`,{className:`x9ynric x1tgivj0 x1ghz6dp`,children:`Account deletion is permanent. Go to Settings → Account → Delete Account. Your data will be removed within 30 days.`})})}),(0,h.jsx)(o,{children:(0,h.jsx)(u,{trigger:`What payment methods are accepted?`,value:`q4`,children:(0,h.jsx)(`p`,{className:`x9ynric x1tgivj0 x1ghz6dp`,children:`We accept Visa, Mastercard, American Express, and PayPal.`})})})]})})},O={name:`Pressed state`,parameters:{docs:{description:{story:"Press and hold the enabled trigger to paint the system's `--color-overlay-pressed` layer across its row. The disabled trigger remains visually unchanged and cannot expand or collapse."}}},render:()=>(0,h.jsxs)(c,{gap:2,children:[(0,h.jsx)(o,{children:(0,h.jsx)(u,{trigger:`Details — press and hold`,children:(0,h.jsx)(`p`,{className:`x9ynric x1tgivj0 x1ghz6dp`,children:`The pressed overlay covers the trigger row.`})})}),(0,h.jsx)(o,{children:(0,h.jsx)(u,{trigger:`Unavailable — no pressed state`,isDisabled:!0,children:(0,h.jsx)(`p`,{className:`x9ynric x1tgivj0 x1ghz6dp`,children:`Never opens.`})})})]})},k={name:`Close Focus`,render:()=>(0,h.jsx)(p,{})},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  name: 'Single Mode — Leading Chevron',
  render: () => <CollapsibleGroup type="single" defaultValue="general" chevronPosition="start">
      <VStack gap={2}>
        <Card>
          <Collapsible trigger="General Settings" value="general">
            <p {...stylex.props(styles.text)}>
              Configure your general preferences including language, timezone,
              and display options.
            </p>
          </Collapsible>
        </Card>
        <Card>
          <Collapsible trigger="Privacy Settings" value="privacy">
            <p {...stylex.props(styles.text)}>
              Manage who can see your profile, activity, and personal
              information.
            </p>
          </Collapsible>
        </Card>
        <Card>
          <Collapsible trigger="Notification Settings" value="notifications">
            <p {...stylex.props(styles.text)}>
              Choose which notifications you receive and how they are delivered.
            </p>
          </Collapsible>
        </Card>
      </VStack>
    </CollapsibleGroup>
}`,...v.parameters?.docs?.source}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  name: 'Multiple Mode',
  render: () => <CollapsibleGroup type="multiple" defaultValue={['faq1', 'faq3']}>
      <VStack gap={2}>
        <Card>
          <Collapsible trigger="What is Astryx?" value="faq1">
            <p {...stylex.props(styles.text)}>
              Astryx is a design system for building internal tools and
              products.
            </p>
          </Collapsible>
        </Card>
        <Card>
          <Collapsible trigger="How do I install it?" value="faq2">
            <p {...stylex.props(styles.text)}>
              Run <code>npm install @astryxdesign/core</code> to get started.
            </p>
          </Collapsible>
        </Card>
        <Card>
          <Collapsible trigger="Is it open source?" value="faq3">
            <p {...stylex.props(styles.text)}>
              Yes! Astryx is open source and available on GitHub.
            </p>
          </Collapsible>
        </Card>
      </VStack>
    </CollapsibleGroup>
}`,...y.parameters?.docs?.source}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  name: 'Controlled',
  render: function ControlledStory() {
    const [open, setOpen] = useState<string | string[]>('section1');
    return <div>
        <p {...stylex.props(styles.textSecondary)}>
          Currently open: <strong>{String(open) || '(none)'}</strong>
        </p>
        <CollapsibleGroup type="single" value={open} onChange={setOpen}>
          <VStack gap={2}>
            <Card>
              <Collapsible trigger="Section 1" value="section1">
                <p {...stylex.props(styles.text)}>Content for section 1.</p>
              </Collapsible>
            </Card>
            <Card>
              <Collapsible trigger="Section 2" value="section2">
                <p {...stylex.props(styles.text)}>Content for section 2.</p>
              </Collapsible>
            </Card>
            <Card>
              <Collapsible trigger="Section 3" value="section3">
                <p {...stylex.props(styles.text)}>Content for section 3.</p>
              </Collapsible>
            </Card>
          </VStack>
        </CollapsibleGroup>
      </div>;
  }
}`,...b.parameters?.docs?.source}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  name: 'Standalone Collapsible',
  render: () => <VStack gap={2}>
      <Card>
        <Collapsible trigger="Starts open (default)">
          <p {...stylex.props(styles.text)}>
            This collapsible manages its own state. Click the trigger to toggle.
          </p>
        </Collapsible>
      </Card>
      <Card>
        <Collapsible trigger="Starts collapsed" defaultIsOpen={false}>
          <p {...stylex.props(styles.text)}>
            This collapsible starts collapsed. Click to reveal.
          </p>
        </Collapsible>
      </Card>
    </VStack>
}`,...x.parameters?.docs?.source}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  name: 'Disabled item',
  render: () => <VStack gap={2}>
      <Card>
        <Collapsible trigger="Enabled — click to toggle">
          <p {...stylex.props(styles.text)}>This section can be toggled.</p>
        </Collapsible>
      </Card>
      <Card>
        <Collapsible trigger="Disabled — can't be toggled" isDisabled>
          <p {...stylex.props(styles.text)}>
            The trigger is non-interactive and dimmed.
          </p>
        </Collapsible>
      </Card>
      <Card>
        <Collapsible trigger="Disabled but open" isDisabled defaultIsOpen>
          <p {...stylex.props(styles.text)}>
            Disabling doesn't collapse an already-open item; the content stays
            visible.
          </p>
        </Collapsible>
      </Card>
    </VStack>
}`,...S.parameters?.docs?.source}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  name: 'Without Card (standalone)',
  render: () => <VStack gap={2}>
      <Collapsible trigger="Show more details">
        <p {...stylex.props(styles.text)}>
          Collapsible works anywhere; it doesn't require a card wrapper.
        </p>
      </Collapsible>
      <Collapsible trigger="Another section" defaultIsOpen={false}>
        <p {...stylex.props(styles.text)}>This section starts collapsed.</p>
      </Collapsible>
    </VStack>
}`,...C.parameters?.docs?.source}}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  name: 'Dividers',
  args: {
    type: 'single',
    hasDividers: true,
    defaultValue: 'q1'
  },
  render: args => <div {...stylex.props(styles.dividedContainer)}>
      <CollapsibleGroup {...args}>
        <Collapsible trigger="How do I reset my password?" value="q1">
          <p {...stylex.props(styles.text)}>
            Go to Settings → Security → Change Password. You'll receive a
            confirmation email.
          </p>
        </Collapsible>
        <Collapsible trigger="Can I change my username?" value="q2">
          <p {...stylex.props(styles.text)}>
            Usernames can be changed once every 30 days from your profile
            settings.
          </p>
        </Collapsible>
        <Collapsible trigger="How do I delete my account?" value="q3">
          <p {...stylex.props(styles.text)}>
            Account deletion is permanent. Your data will be removed within 30
            days.
          </p>
        </Collapsible>
      </CollapsibleGroup>
    </div>
}`,...w.parameters?.docs?.source}}},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  name: 'Dividers — Multiple',
  args: {
    type: 'multiple',
    hasDividers: true,
    defaultValue: ['a']
  },
  render: args => <div {...stylex.props(styles.dividedContainer)}>
      <CollapsibleGroup {...args}>
        <Collapsible trigger="Deployment Details" value="a">
          <p {...stylex.props(styles.text)}>
            Deployed 2 hours ago from the main branch.
          </p>
        </Collapsible>
        <Collapsible trigger="Environment Variables" value="b">
          <p {...stylex.props(styles.text)}>
            12 variables configured for this environment.
          </p>
        </Collapsible>
        <Collapsible trigger="Build Logs" value="c">
          <p {...stylex.props(styles.text)}>Build completed in 43 seconds.</p>
        </Collapsible>
      </CollapsibleGroup>
    </div>
}`,...T.parameters?.docs?.source}}},E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  name: 'Dividers — Density',
  render: () => <VStack gap={6} xstyle={styles.dividedContainer}>
      {(['compact', 'balanced', 'spacious'] as const).map(density => <CollapsibleGroup key={density} type="multiple" hasDividers density={density} defaultValue={['one']}>
          <Collapsible trigger={\`First section (\${density})\`} value="one">
            <p {...stylex.props(styles.text)}>
              Row padding scales with density.
            </p>
          </Collapsible>
          <Collapsible trigger="Second section" value="two">
            <p {...stylex.props(styles.text)}>Collapsed by default.</p>
          </Collapsible>
        </CollapsibleGroup>)}
    </VStack>
}`,...E.parameters?.docs?.source}}},D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
  name: 'FAQ Page',
  render: () => <CollapsibleGroup type="single">
      <VStack gap={2}>
        <Card>
          <Collapsible trigger="How do I reset my password?" value="q1">
            <p {...stylex.props(styles.text)}>
              Go to Settings → Security → Change Password. You'll receive a
              confirmation email.
            </p>
          </Collapsible>
        </Card>
        <Card>
          <Collapsible trigger="Can I change my username?" value="q2">
            <p {...stylex.props(styles.text)}>
              Usernames can be changed once every 30 days from your profile
              settings.
            </p>
          </Collapsible>
        </Card>
        <Card>
          <Collapsible trigger="How do I delete my account?" value="q3">
            <p {...stylex.props(styles.text)}>
              Account deletion is permanent. Go to Settings → Account → Delete
              Account. Your data will be removed within 30 days.
            </p>
          </Collapsible>
        </Card>
        <Card>
          <Collapsible trigger="What payment methods are accepted?" value="q4">
            <p {...stylex.props(styles.text)}>
              We accept Visa, Mastercard, American Express, and PayPal.
            </p>
          </Collapsible>
        </Card>
      </VStack>
    </CollapsibleGroup>
}`,...D.parameters?.docs?.source}}},O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
  name: 'Pressed state',
  parameters: {
    docs: {
      description: {
        story: "Press and hold the enabled trigger to paint the system's \`--color-overlay-pressed\` layer across its row. The disabled trigger remains visually unchanged and cannot expand or collapse."
      }
    }
  },
  render: () => <VStack gap={2}>
      <Card>
        <Collapsible trigger="Details — press and hold">
          <p {...stylex.props(styles.text)}>
            The pressed overlay covers the trigger row.
          </p>
        </Collapsible>
      </Card>
      <Card>
        <Collapsible trigger="Unavailable — no pressed state" isDisabled>
          <p {...stylex.props(styles.text)}>Never opens.</p>
        </Collapsible>
      </Card>
    </VStack>
}`,...O.parameters?.docs?.source}}},k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
  name: 'Close Focus',
  render: () => <CloseFocusDemo />
}`,...k.parameters?.docs?.source}}},A=[`SingleMode`,`MultipleMode`,`Controlled`,`StandaloneCollapsible`,`Disabled`,`WithoutCard`,`Dividers`,`DividersMultiple`,`DividersDensity`,`FAQ`,`PressedState`,`CloseFocus`]})))()}j();export{k as CloseFocus,b as Controlled,S as Disabled,w as Dividers,E as DividersDensity,T as DividersMultiple,D as FAQ,y as MultipleMode,O as PressedState,v as SingleMode,x as StandaloneCollapsible,C as WithoutCard,A as __namedExportsOrder,_ as default};