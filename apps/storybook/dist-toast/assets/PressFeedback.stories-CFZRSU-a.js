import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{t}from"./react-DlPsW1c0.js";import{t as n}from"./jsx-runtime-MKhVqBIO.js";import{n as r,t as i}from"./Text-C5BHw0wv.js";import{n as a,t as o}from"./Button-DoGM0DEN.js";import{n as s,t as c}from"./Item-1P46XrPN.js";import{d as l,f as u}from"./renderDropdownItems-hNxj8lO0.js";import{n as d,t as f}from"./ClickableCard-QlBYDZzY.js";import{n as p,t as m}from"./VStack-SWtDePqc.js";import{n as h,t as g}from"./CheckboxInput-CnJ0nBRn.js";import{n as _,t as v}from"./Collapsible-twVulli-.js";import{i as y,n as b,r as x,t as S}from"./RadioListItem-Bxow0I7z.js";import{n as C,t as w}from"./Link-D69iJxMA.js";import{n as T,t as E}from"./Switch-C8kZJ1p7.js";import{i as D,n as O,r as k,t as A}from"./SegmentedControlItem-DNDQsMdT.js";import{a as j,n as M,o as N,t as P}from"./Tab-DWNlq4bK.js";import{n as F,t as I}from"./DropdownMenu-M0We7Ho-.js";var L,R,z,B,V,H,U,W,G;function K(){return(K=e((()=>{L=t(),a(),h(),d(),_(),F(),u(),s(),C(),y(),b(),D(),O(),T(),M(),N(),r(),p(),R=n(),z={title:`Core/Press feedback (touch)`,parameters:{layout:`padded`,docs:{description:{component:'The touch press model on every pressable surface. View with a coarse pointer (DevTools device toolbar, or a phone). Under a finger the bare `:active` arm is dropped and one document-level controller writes `data-astryx-press="on"` while a press is held and `data-astryx-press="fading"` for the release. A surface highlights in the frame the finger lands (150 ms later inside a scroller) and fades at the lift; 10 px of travel or a scroll claiming the touch cancels it with no fade. A mouse keeps `:active` on a desktop. Scroll the list stories with a finger: nothing paints while the list moves.'}}}},B=e=>`${e} Touch: paints in the frame the finger lands. Lift: fades out. A scroll that takes the touch: the paint goes at once, with no fade and no click.`,V={parameters:{docs:{description:{story:B(`Buttons under a finger.`)}}},render:()=>(0,R.jsxs)(m,{gap:3,children:[(0,R.jsx)(o,{label:`Primary`,variant:`primary`}),(0,R.jsx)(o,{label:`Secondary`,variant:`secondary`}),(0,R.jsx)(o,{label:`Ghost`,variant:`ghost`}),(0,R.jsx)(o,{label:`Destructive`,variant:`destructive`}),(0,R.jsx)(o,{label:`Disabled — never presses`,isDisabled:!0})]})},H={parameters:{docs:{description:{story:`Item rows, a menu, and a clickable card. The rows sit in a scroller, so a held row paints after 150 ms, a tap paints at the lift, and a drag or scroll never paints; the card, outside it, paints in the frame the finger lands. Flick the list and no row paints.`}}},render:()=>(0,R.jsxs)(m,{gap:4,children:[(0,R.jsx)(`div`,{style:{height:220,overflowY:`auto`,border:`1px solid transparent`},children:Array.from({length:24},(e,t)=>(0,R.jsx)(c,{label:`Conversation ${t+1}`,description:`Press and hold, or scroll past`,onClick:()=>{}},t))}),(0,R.jsxs)(I,{button:{label:`Menu`},children:[(0,R.jsx)(l,{label:`Rename`,onClick:()=>{}}),(0,R.jsx)(l,{label:`Duplicate`,onClick:()=>{}}),(0,R.jsx)(l,{label:`Delete`,variant:`destructive`,onClick:()=>{}})]}),(0,R.jsx)(f,{label:`A clickable card`,onClick:()=>{},children:(0,R.jsx)(i,{children:`A clickable card: press and hold`})})]})},U={parameters:{docs:{description:{story:B(`The eight components that gained a pressed state, under a finger.`)}}},render:()=>{let[e,t]=(0,L.useState)(!1),[n,r]=(0,L.useState)(!1),[a,o]=(0,L.useState)(`email`),[s,c]=(0,L.useState)(`grid`),[l,u]=(0,L.useState)(`home`);return(0,R.jsxs)(m,{gap:4,children:[(0,R.jsx)(E,{label:`Notifications`,value:e,onChange:t}),(0,R.jsx)(g,{label:`Accept terms`,value:n,onChange:r}),(0,R.jsxs)(x,{label:`Channel`,value:a,onChange:o,children:[(0,R.jsx)(S,{label:`Email`,value:`email`}),(0,R.jsx)(S,{label:`SMS`,value:`sms`})]}),(0,R.jsxs)(k,{value:s,onChange:c,label:`View`,children:[(0,R.jsx)(A,{value:`grid`,label:`Grid`}),(0,R.jsx)(A,{value:`list`,label:`List`})]}),(0,R.jsxs)(j,{value:l,onChange:u,children:[(0,R.jsx)(P,{value:`home`,label:`Home`}),(0,R.jsx)(P,{value:`settings`,label:`Settings`})]}),(0,R.jsxs)(i,{children:[`Read the`,` `,(0,R.jsx)(w,{href:`#docs`,onClick:e=>e.preventDefault(),children:`documentation`}),`.`]}),(0,R.jsx)(v,{trigger:`Details`,children:(0,R.jsx)(i,{children:`The trigger row presses.`})})]})}},W={parameters:{docs:{description:{story:`Buttons in a scrolling list, under a finger: a held button paints 150 ms after the finger lands (UIScrollView.delaysContentTouches); a flick scrolls the list and paints nothing; a scroll that starts after the button painted takes the touch, and the paint goes at once with no fade and no click.`}}},render:()=>(0,R.jsx)(`div`,{"data-testid":`button-scroller`,style:{height:240,overflowY:`auto`,border:`1px solid transparent`},children:(0,R.jsx)(m,{gap:3,children:Array.from({length:16},(e,t)=>(0,R.jsx)(o,{label:`Action ${t+1}`,variant:`secondary`,onClick:()=>{}},t))})})},V.parameters={...V.parameters,docs:{...V.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: controlNote('Buttons under a finger.')
      }
    }
  },
  render: () => <VStack gap={3}>
      <Button label="Primary" variant="primary" />
      <Button label="Secondary" variant="secondary" />
      <Button label="Ghost" variant="ghost" />
      <Button label="Destructive" variant="destructive" />
      <Button label="Disabled — never presses" isDisabled />
    </VStack>
}`,...V.parameters?.docs?.source}}},H.parameters={...H.parameters,docs:{...H.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: 'Item rows, a menu, and a clickable card. The rows sit in a scroller, so a held row paints after 150 ms, a tap paints at the lift, and a drag or scroll never paints; the card, outside it, paints in the frame the finger lands. Flick the list and no row paints.'
      }
    }
  },
  render: () => <VStack gap={4}>
      <div style={{
      height: 220,
      overflowY: 'auto',
      border: '1px solid transparent'
    }}>
        {Array.from({
        length: 24
      }, (_, index) => <Item key={index} label={\`Conversation \${index + 1}\`} description="Press and hold, or scroll past" onClick={() => {}} />)}
      </div>
      <DropdownMenu button={{
      label: 'Menu'
    }}>
        <DropdownMenuItem label="Rename" onClick={() => {}} />
        <DropdownMenuItem label="Duplicate" onClick={() => {}} />
        <DropdownMenuItem label="Delete" variant="destructive" onClick={() => {}} />
      </DropdownMenu>
      <ClickableCard label="A clickable card" onClick={() => {}}>
        <Text>A clickable card: press and hold</Text>
      </ClickableCard>
    </VStack>
}`,...H.parameters?.docs?.source}}},U.parameters={...U.parameters,docs:{...U.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: controlNote('The eight components that gained a pressed state, under a finger.')
      }
    }
  },
  render: () => {
    const [on, setOn] = useState(false);
    const [checked, setChecked] = useState<boolean | 'indeterminate'>(false);
    const [radio, setRadio] = useState('email');
    const [segment, setSegment] = useState('grid');
    const [tab, setTab] = useState('home');
    return <VStack gap={4}>
        <Switch label="Notifications" value={on} onChange={setOn} />
        <CheckboxInput label="Accept terms" value={checked} onChange={setChecked} />
        <RadioList label="Channel" value={radio} onChange={setRadio}>
          <RadioListItem label="Email" value="email" />
          <RadioListItem label="SMS" value="sms" />
        </RadioList>
        <SegmentedControl value={segment} onChange={setSegment} label="View">
          <SegmentedControlItem value="grid" label="Grid" />
          <SegmentedControlItem value="list" label="List" />
        </SegmentedControl>
        <TabList value={tab} onChange={setTab}>
          <Tab value="home" label="Home" />
          <Tab value="settings" label="Settings" />
        </TabList>
        <Text>
          Read the{' '}
          <Link href="#docs" onClick={e => e.preventDefault()}>
            documentation
          </Link>
          .
        </Text>
        <Collapsible trigger="Details">
          <Text>The trigger row presses.</Text>
        </Collapsible>
      </VStack>;
  }
}`,...U.parameters?.docs?.source}}},W.parameters={...W.parameters,docs:{...W.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: 'Buttons in a scrolling list, under a finger: a held button paints 150 ms after the finger lands (UIScrollView.delaysContentTouches); a flick scrolls the list and paints nothing; a scroll that starts after the button painted takes the touch, and the paint goes at once with no fade and no click.'
      }
    }
  },
  render: () => <div data-testid="button-scroller" style={{
    height: 240,
    overflowY: 'auto',
    border: '1px solid transparent'
  }}>
      <VStack gap={3}>
        {Array.from({
        length: 16
      }, (_, index) => <Button key={index} label={\`Action \${index + 1}\`} variant="secondary" onClick={() => {}} />)}
      </VStack>
    </div>
}`,...W.parameters?.docs?.source}}},G=[`Buttons`,`Rows`,`Controls`,`ButtonsInScroller`]})))()}K();export{V as Buttons,W as ButtonsInScroller,U as Controls,H as Rows,G as __namedExportsOrder,z as default};