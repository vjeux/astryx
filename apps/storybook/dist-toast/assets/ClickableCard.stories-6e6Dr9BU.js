import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{t}from"./jsx-runtime-MKhVqBIO.js";import{n,t as r}from"./Text-C5BHw0wv.js";import{n as i,t as a}from"./Button-DoGM0DEN.js";import{n as o,t as s}from"./ClickableCard-QlBYDZzY.js";import{n as c,t as l}from"./HStack-D5idGciI.js";import{n as u,t as d}from"./VStack-SWtDePqc.js";var f,p,m,h,g,_,v,y;function b(){return(b=e((()=>{o(),n(),i(),u(),c(),f=t(),p={title:`Core/ClickableCard`,component:s,tags:[`autodocs`],argTypes:{variant:{control:`select`,options:[`default`,`transparent`,`muted`,`blue`,`cyan`,`gray`,`green`,`orange`,`pink`,`purple`,`red`,`teal`,`yellow`]},elevation:{control:`inline-radio`,options:[`none`,`low`,`med`,`high`]}},parameters:{docs:{description:{component:"An interactive card for navigation or action targets. Nested interactive elements (buttons, links) work independently; clicking them does NOT trigger the card's onClick or navigation. Uses `useClickableContainer` internally."}}}},m={name:`Navigation (href)`,render:()=>(0,f.jsx)(s,{label:`Settings`,href:`/settings`,width:300,children:(0,f.jsxs)(d,{gap:1,children:[(0,f.jsx)(r,{type:`body`,weight:`bold`,children:`Settings`}),(0,f.jsx)(r,{type:`supporting`,color:`secondary`,children:`Manage your preferences`})]})}),parameters:{docs:{description:{story:"Card with `href`: clicking navigates. Ctrl/Cmd+click opens new tab. Middle-click opens new tab."}}}},h={name:`Action (onClick)`,render:()=>(0,f.jsx)(s,{label:`Open modal`,onClick:()=>alert(`Card clicked!`),width:300,children:(0,f.jsxs)(d,{gap:1,children:[(0,f.jsx)(r,{type:`body`,weight:`bold`,children:`Click me`}),(0,f.jsx)(r,{type:`supporting`,color:`secondary`,children:`Opens a modal`})]})}),parameters:{docs:{description:{story:"Card with `onClick`: fires the handler when the card surface is clicked."}}}},g={name:`Nested Interactive Elements`,render:()=>(0,f.jsx)(s,{label:`Product card`,href:`/product/123`,width:300,children:(0,f.jsxs)(d,{gap:2,children:[(0,f.jsx)(r,{type:`body`,weight:`bold`,children:`Product Name`}),(0,f.jsx)(r,{type:`supporting`,color:`secondary`,children:`$29.99`}),(0,f.jsx)(a,{label:`Add to cart`,onClick:()=>alert(`Added to cart! (card did NOT navigate)`),variant:`primary`})]})}),parameters:{docs:{description:{story:'The key feature: nested buttons/links work independently. Clicking "Add to cart" fires its own handler without triggering card navigation. This is handled by `useClickableContainer` which checks `hasInteractiveAncestor` on each click.'}}}},_={render:()=>(0,f.jsx)(s,{label:`Disabled card`,href:`/settings`,target:`_blank`,isDisabled:!0,width:300,children:(0,f.jsxs)(d,{gap:1,children:[(0,f.jsx)(r,{type:`body`,weight:`bold`,children:`Disabled`}),(0,f.jsx)(r,{type:`supporting`,color:`secondary`,children:`This card cannot be clicked`})]})}),parameters:{docs:{description:{story:"`isDisabled` suppresses click and hover, removes any live link destination, sets `aria-disabled`, and keeps the card in the tab order so it is announced as disabled."}}}},v={name:`Color Variants`,render:()=>(0,f.jsx)(l,{gap:3,wrap:`wrap`,children:[`default`,`muted`,`transparent`,`blue`,`cyan`,`gray`,`green`,`orange`,`pink`,`purple`,`red`,`teal`,`yellow`].map(e=>(0,f.jsx)(s,{label:e,onClick:()=>alert(e),variant:e,width:140,children:(0,f.jsx)(r,{type:`body`,weight:`bold`,children:e})},e))}),parameters:{docs:{description:{story:`All color variants: same palette as Card. Color cards have transparent borders.`}}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  name: 'Navigation (href)',
  render: () => <ClickableCard label="Settings" href="/settings" width={300}>
      <VStack gap={1}>
        <Text type="body" weight="bold">
          Settings
        </Text>
        <Text type="supporting" color="secondary">
          Manage your preferences
        </Text>
      </VStack>
    </ClickableCard>,
  parameters: {
    docs: {
      description: {
        story: 'Card with \`href\`: clicking navigates. Ctrl/Cmd+click opens new tab. Middle-click opens new tab.'
      }
    }
  }
}`,...m.parameters?.docs?.source}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  name: 'Action (onClick)',
  render: () => <ClickableCard label="Open modal" onClick={() => alert('Card clicked!')} width={300}>
      <VStack gap={1}>
        <Text type="body" weight="bold">
          Click me
        </Text>
        <Text type="supporting" color="secondary">
          Opens a modal
        </Text>
      </VStack>
    </ClickableCard>,
  parameters: {
    docs: {
      description: {
        story: 'Card with \`onClick\`: fires the handler when the card surface is clicked.'
      }
    }
  }
}`,...h.parameters?.docs?.source}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  name: 'Nested Interactive Elements',
  render: () => <ClickableCard label="Product card" href="/product/123" width={300}>
      <VStack gap={2}>
        <Text type="body" weight="bold">
          Product Name
        </Text>
        <Text type="supporting" color="secondary">
          $29.99
        </Text>
        <Button label="Add to cart" onClick={() => alert('Added to cart! (card did NOT navigate)')} variant="primary" />
      </VStack>
    </ClickableCard>,
  parameters: {
    docs: {
      description: {
        story: 'The key feature: nested buttons/links work independently. ' + 'Clicking "Add to cart" fires its own handler without triggering card navigation. ' + 'This is handled by \`useClickableContainer\` which checks \`hasInteractiveAncestor\` on each click.'
      }
    }
  }
}`,...g.parameters?.docs?.source}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  render: () => <ClickableCard label="Disabled card" href="/settings" target="_blank" isDisabled width={300}>
      <VStack gap={1}>
        <Text type="body" weight="bold">
          Disabled
        </Text>
        <Text type="supporting" color="secondary">
          This card cannot be clicked
        </Text>
      </VStack>
    </ClickableCard>,
  parameters: {
    docs: {
      description: {
        story: '\`isDisabled\` suppresses click and hover, removes any live link destination, sets \`aria-disabled\`, and keeps the card in the tab order so it is announced as disabled.'
      }
    }
  }
}`,..._.parameters?.docs?.source}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  name: 'Color Variants',
  render: () => {
    const variants = ['default', 'muted', 'transparent', 'blue', 'cyan', 'gray', 'green', 'orange', 'pink', 'purple', 'red', 'teal', 'yellow'] as const;
    return <HStack gap={3} wrap="wrap">
        {variants.map(v => <ClickableCard key={v} label={v} onClick={() => alert(v)} variant={v} width={140}>
            <Text type="body" weight="bold">
              {v}
            </Text>
          </ClickableCard>)}
      </HStack>;
  },
  parameters: {
    docs: {
      description: {
        story: 'All color variants: same palette as Card. Color cards have transparent borders.'
      }
    }
  }
}`,...v.parameters?.docs?.source}}},y=[`Navigation`,`WithOnClick`,`NestedButton`,`Disabled`,`ColorVariants`]})))()}b();export{v as ColorVariants,_ as Disabled,m as Navigation,g as NestedButton,h as WithOnClick,y as __namedExportsOrder,p as default};