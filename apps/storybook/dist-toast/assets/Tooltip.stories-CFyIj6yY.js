import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{t}from"./react-DlPsW1c0.js";import{t as n}from"./jsx-runtime-MKhVqBIO.js";import{n as r,t as i}from"./useTooltip-Cmp3pcbb.js";import{n as a,t as o}from"./Button-DoGM0DEN.js";import{r as s,t as c}from"./Tooltip-CmQs04jO.js";import{n as l,t as u}from"./HStack-D5idGciI.js";var d,f,p,m,h,g,_,v,y,b,x,S,C,w,T,E,D,O,k,A,j,M,N;function P(){return(P=e((()=>{d=t(),s(),i(),a(),l(),f=n(),p={title:`Core/Tooltip`,component:c,tags:[`autodocs`],argTypes:{placement:{control:`select`,options:[`above`,`below`,`start`,`end`],description:`Position relative to trigger`},alignment:{control:`select`,options:[`start`,`center`,`end`],description:`Alignment on placement axis`},delay:{control:`number`,description:`Show delay in ms`},hideDelay:{control:`number`,description:`Hide delay in ms`},isEnabled:{control:`boolean`,description:`Enable/disable the tooltip`},touchTrigger:{control:`select`,options:[`auto`,`tap`,`none`],description:`What a tap does where there is no hover: auto (tap unless the trigger acts), tap, or none`}}},m={args:{placement:`above`,content:`This is a helpful tooltip`,children:(0,f.jsx)(o,{label:`Hover me`,children:`Hover me`})}},h={args:{placement:`below`,content:`Tooltip appears below`,children:(0,f.jsx)(o,{label:`Hover me`,children:`Hover me`})}},g={args:{placement:`start`,content:`Tooltip on start`,children:(0,f.jsx)(o,{label:`Hover me`,children:`Hover me`})}},_={args:{placement:`start`,content:`Tooltip on logical start`,children:(0,f.jsx)(o,{label:`RTL placement target`,children:`RTL placement target`}),isDefaultOpen:!0}},v={args:{placement:`end`,content:`Tooltip on end`,children:(0,f.jsx)(o,{label:`Hover me`,children:`Hover me`})}},y={args:{placement:`above`,delay:500,content:`Slower tooltip (500ms delay)`,children:(0,f.jsx)(o,{label:`Slow tooltip`,children:`Slow tooltip`})}},b={name:`Disabled Tooltip`,args:{placement:`above`,isEnabled:!1,content:`You should not see this`,children:(0,f.jsx)(o,{label:`Hover me`,children:`Hover me`})},parameters:{docs:{description:{story:"Demonstrates disabling the tooltip via the `isEnabled` prop. When `isEnabled` is `false`, the tooltip will not appear on hover or focus, even though the trigger element remains fully interactive. This is useful for conditionally showing tooltips based on application state."}}}},x={render:()=>(0,f.jsxs)(`div`,{style:{padding:100,display:`flex`,gap:24,flexWrap:`wrap`},children:[(0,f.jsx)(c,{content:`Above`,placement:`above`,children:(0,f.jsx)(o,{label:`Above`,children:`Above`})}),(0,f.jsx)(c,{content:`Below`,placement:`below`,children:(0,f.jsx)(o,{label:`Below`,children:`Below`})}),(0,f.jsx)(c,{content:`Start`,placement:`start`,children:(0,f.jsx)(o,{label:`Start`,children:`Start`})}),(0,f.jsx)(c,{content:`End`,placement:`end`,children:(0,f.jsx)(o,{label:`End`,children:`End`})})]})},S={render:function(){let e=r({placement:`above`,delay:100});return(0,f.jsxs)(`div`,{style:{padding:100},children:[(0,f.jsx)(o,{label:`Using hook directly`,ref:e.ref,"aria-describedby":e.describedBy,children:`Using hook directly`}),e.renderTooltip(`Tooltip via hook`)]})}},C={render:function(){let[e,t]=(0,d.useState)(!1),n=r({onHide:()=>t(!1)});return(0,f.jsxs)(`div`,{style:{padding:100},children:[(0,f.jsx)(o,{label:`About billing`,variant:`secondary`,ref:n.ref,"aria-describedby":n.describedBy,"aria-expanded":e,"aria-controls":n.describedBy,onClick:()=>{e?n.hide():n.show(),t(!e)},children:`?`}),n.renderTooltip(`Billed monthly, on the first day`)]})}},w={args:{placement:`above`,content:`This is a longer tooltip that contains more detailed information about the element.`,children:(0,f.jsx)(o,{label:`Hover for more info`,children:`Hover for more info`})}},T=Array.from({length:60},(e,t)=>`Line ${t+1} of a tooltip taller than the space around it`),E={parameters:{layout:`fullscreen`},args:{placement:`above`,content:(0,f.jsx)(`div`,{children:T.map(e=>(0,f.jsx)(`div`,{children:e},e))}),children:(0,f.jsx)(o,{label:`Hover for details`,children:`Hover for details`})},render:e=>(0,f.jsx)(`div`,{style:{minHeight:`250vh`,display:`grid`,placeItems:`center`},children:(0,f.jsx)(c,{...e})})},D={parameters:{layout:`fullscreen`},render:function(){let[e,t]=(0,d.useState)(!1),n=r({placement:`above`,isOpen:!0}),i=n.renderTooltip((0,f.jsx)(`div`,{children:T.map(e=>(0,f.jsx)(`div`,{children:e},e))}));return(0,f.jsxs)(`div`,{style:{minHeight:`100vh`,display:`grid`,placeItems:`center`},children:[(0,f.jsx)(`div`,{style:{position:`fixed`,insetBlockStart:16,insetInlineStart:16},children:(0,f.jsx)(o,{label:`Move the tooltip's host`,onClick:()=>t(e=>!e),children:`Move the tooltip's host`})}),(0,f.jsx)(o,{label:`Tall tooltip trigger`,ref:n.ref,"aria-describedby":n.describedBy,children:`Tall tooltip trigger`}),e?(0,f.jsx)(`p`,{children:i}):(0,f.jsx)(`div`,{children:i})]})}},O={parameters:{layout:`fullscreen`},render:function(){let[e,t]=(0,d.useState)(0),n=r({placement:`above`,isOpen:!0});return(0,f.jsxs)(`div`,{style:{minHeight:`100vh`},children:[(0,f.jsx)(`div`,{style:{position:`fixed`,insetBlockStart:16,insetInlineStart:16},children:(0,f.jsx)(o,{label:`Replace the trigger`,onClick:()=>t(e=>e+1),children:`Replace the trigger`})}),(0,f.jsx)(`div`,{style:{blockSize:682,display:`flex`,justifyContent:`center`,alignItems:`flex-end`},children:(0,f.jsx)(o,{label:`Trigger ${e+1}`,ref:n.ref,"aria-describedby":n.describedBy,children:`Trigger ${e+1}`},e)}),n.renderTooltip((0,f.jsxs)(`div`,{children:[(0,f.jsx)(`div`,{children:`A tooltip that stays open`}),Array.from({length:17},(e,t)=>(0,f.jsx)(`div`,{children:`Line ${t+1}`},t))]}))]})}},k={render:()=>(0,f.jsx)(`div`,{style:{padding:100},children:(0,f.jsxs)(u,{gap:4,children:[(0,f.jsx)(c,{content:`Save your changes`,placement:`above`,children:(0,f.jsx)(o,{label:`Save`,children:`Save`})}),(0,f.jsx)(c,{content:`Discard changes`,placement:`above`,children:(0,f.jsx)(o,{label:`Cancel`,children:`Cancel`})}),(0,f.jsx)(c,{content:`Delete permanently`,placement:`above`,children:(0,f.jsx)(o,{label:`Delete`,variant:`destructive`,children:`Delete`})})]})})},A={render:()=>(0,f.jsx)(`div`,{style:{padding:100},children:(0,f.jsxs)(`p`,{children:[`This paragraph contains a`,` `,(0,f.jsx)(c,{content:`Tooltip on inline text!`,placement:`above`,children:`hover-able term`}),` `,`that explains what something means.`]})})},j={render:()=>(0,f.jsx)(`div`,{style:{padding:100},children:(0,f.jsxs)(`p`,{children:[`Learn more about our`,` `,(0,f.jsx)(c,{content:`Your data is encrypted and never shared`,placement:`above`,children:`privacy policy`}),` `,`and`,` `,(0,f.jsx)(c,{content:`Standard 30-day agreement`,placement:`above`,children:`terms of service`}),`.`]})})},M={render:()=>(0,f.jsx)(`div`,{style:{padding:100},children:(0,f.jsxs)(u,{gap:4,children:[(0,f.jsx)(c,{content:`Saves your changes`,placement:`above`,children:(0,f.jsx)(o,{label:`Save`,children:`Save`})}),(0,f.jsx)(c,{content:`Tooltip on inline text!`,placement:`above`,children:`hover-able term`}),(0,f.jsx)(c,{content:`Rows are ranked by how many places import the icon`,placement:`above`,touchTrigger:`tap`,children:(0,f.jsx)(o,{label:`What is this?`,variant:`secondary`,children:`?`})})]})})},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    placement: 'above',
    content: 'This is a helpful tooltip',
    children: <Button label="Hover me">Hover me</Button>
  }
}`,...m.parameters?.docs?.source}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  args: {
    placement: 'below',
    content: 'Tooltip appears below',
    children: <Button label="Hover me">Hover me</Button>
  }
}`,...h.parameters?.docs?.source}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  args: {
    placement: 'start',
    content: 'Tooltip on start',
    children: <Button label="Hover me">Hover me</Button>
  }
}`,...g.parameters?.docs?.source}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  args: {
    placement: 'start',
    content: 'Tooltip on logical start',
    children: <Button label="RTL placement target">RTL placement target</Button>,
    isDefaultOpen: true
  }
}`,..._.parameters?.docs?.source}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  args: {
    placement: 'end',
    content: 'Tooltip on end',
    children: <Button label="Hover me">Hover me</Button>
  }
}`,...v.parameters?.docs?.source}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  args: {
    placement: 'above',
    delay: 500,
    content: 'Slower tooltip (500ms delay)',
    children: <Button label="Slow tooltip">Slow tooltip</Button>
  }
}`,...y.parameters?.docs?.source}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  name: 'Disabled Tooltip',
  args: {
    placement: 'above',
    isEnabled: false,
    content: 'You should not see this',
    children: <Button label="Hover me">Hover me</Button>
  },
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates disabling the tooltip via the \`isEnabled\` prop. When \`isEnabled\` is \`false\`, the tooltip will not appear on hover or focus, even though the trigger element remains fully interactive. This is useful for conditionally showing tooltips based on application state.'
      }
    }
  }
}`,...b.parameters?.docs?.source}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    padding: 100,
    display: 'flex',
    gap: 24,
    flexWrap: 'wrap'
  }}>
      <Tooltip content="Above" placement="above">
        <Button label="Above">Above</Button>
      </Tooltip>
      <Tooltip content="Below" placement="below">
        <Button label="Below">Below</Button>
      </Tooltip>
      <Tooltip content="Start" placement="start">
        <Button label="Start">Start</Button>
      </Tooltip>
      <Tooltip content="End" placement="end">
        <Button label="End">End</Button>
      </Tooltip>
    </div>
}`,...x.parameters?.docs?.source}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  render: function HookExample() {
    const tooltip = useTooltip({
      placement: 'above',
      delay: 100
    });
    return <div style={{
      padding: 100
    }}>
        <Button label="Using hook directly" ref={tooltip.ref} aria-describedby={tooltip.describedBy}>
          Using hook directly
        </Button>
        {tooltip.renderTooltip('Tooltip via hook')}
      </div>;
  }
}`,...S.parameters?.docs?.source}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  render: function CustomToggleTriggerExample() {
    const [isPinned, setIsPinned] = useState(false);
    const tooltip = useTooltip({
      onHide: () => setIsPinned(false)
    });
    return <div style={{
      padding: 100
    }}>
        <Button label="About billing" variant="secondary" ref={tooltip.ref} aria-describedby={tooltip.describedBy} aria-expanded={isPinned} aria-controls={tooltip.describedBy} onClick={() => {
        if (isPinned) {
          tooltip.hide();
        } else {
          tooltip.show();
        }
        setIsPinned(!isPinned);
      }}>
          ?
        </Button>
        {tooltip.renderTooltip('Billed monthly, on the first day')}
      </div>;
  }
}`,...C.parameters?.docs?.source},description:{story:"A toggle-style trigger built on `useTooltip`'s `show()` and `hide()`: the\napp's own button pins the tooltip on a press and closes it on the next one.\nEscape, a press outside, or focus leaving also close it. The button carries\n`aria-expanded` while the press holds it and `aria-controls` naming the\ntooltip. Hover and keyboard focus still preview it.",...C.parameters?.docs?.description}}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  args: {
    placement: 'above',
    content: 'This is a longer tooltip that contains more detailed information about the element.',
    children: <Button label="Hover for more info">Hover for more info</Button>
  }
}`,...w.parameters?.docs?.source}}},E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  parameters: {
    layout: 'fullscreen'
  },
  args: {
    placement: 'above',
    content: <div>
        {TALL_LINES.map(line => <div key={line}>{line}</div>)}
      </div>,
    children: <Button label="Hover for details">Hover for details</Button>
  },
  render: args => <div style={{
    minHeight: '250vh',
    display: 'grid',
    placeItems: 'center'
  }}>
      <Tooltip {...args} />
    </div>
}`,...E.parameters?.docs?.source},description:{story:`Content taller than the room above and below its trigger. The page is two
and a half viewports tall so the trigger can be scrolled to any height.`,...E.parameters?.docs?.description}}},D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
  parameters: {
    layout: 'fullscreen'
  },
  render: function TallContentMovingHostExample() {
    const [inParagraph, setInParagraph] = useState(false);
    const tooltip = useTooltip({
      placement: 'above',
      isOpen: true
    });
    const rendered = tooltip.renderTooltip(<div>
        {TALL_LINES.map(line => <div key={line}>{line}</div>)}
      </div>);
    return <div style={{
      minHeight: '100vh',
      display: 'grid',
      placeItems: 'center'
    }}>
        <div style={{
        position: 'fixed',
        insetBlockStart: 16,
        insetInlineStart: 16
      }}>
          <Button label="Move the tooltip's host" onClick={() => setInParagraph(value => !value)}>
            Move the tooltip&apos;s host
          </Button>
        </div>
        <Button label="Tall tooltip trigger" ref={tooltip.ref} aria-describedby={tooltip.describedBy}>
          Tall tooltip trigger
        </Button>
        {inParagraph ? <p>{rendered}</p> : <div>{rendered}</div>}
      </div>;
  }
}`,...D.parameters?.docs?.source},description:{story:`A tall tooltip held open while its render call moves from a plain container
into a paragraph, which hosts the layer elsewhere and remounts it. The
replacement must keep its trigger clear exactly as the first one did.`,...D.parameters?.docs?.description}}},O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
  parameters: {
    layout: 'fullscreen'
  },
  render: function TallContentReplacedTriggerExample() {
    const [generation, setGeneration] = useState(0);
    const tooltip = useTooltip({
      placement: 'above',
      isOpen: true
    });
    return <div style={{
      minHeight: '100vh'
    }}>
        <div style={{
        position: 'fixed',
        insetBlockStart: 16,
        insetInlineStart: 16
      }}>
          <Button label="Replace the trigger" onClick={() => setGeneration(value => value + 1)}>
            Replace the trigger
          </Button>
        </div>
        {/* The trigger's bottom edge sits 682px down, so it grows upward. */}
        <div style={{
        blockSize: 682,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-end'
      }}>
          <Button key={generation} label={\`Trigger \${generation + 1}\`} ref={tooltip.ref} aria-describedby={tooltip.describedBy}>
            {\`Trigger \${generation + 1}\`}
          </Button>
        </div>
        {tooltip.renderTooltip(<div>
            <div>A tooltip that stays open</div>
            {Array.from({
          length: 17
        }, (_, i) => <div key={i}>{\`Line \${i + 1}\`}</div>)}
          </div>)}
      </div>;
  }
}`,...O.parameters?.docs?.source},description:{story:`A tooltip held open while its caller replaces the trigger element with
another one in the same place. The replacement is the anchor from then on,
and the tooltip must keep it clear as it moves or resizes.`,...O.parameters?.docs?.description}}},k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    padding: 100
  }}>
      <HStack gap={4}>
        <Tooltip content="Save your changes" placement="above">
          <Button label="Save">Save</Button>
        </Tooltip>
        <Tooltip content="Discard changes" placement="above">
          <Button label="Cancel">Cancel</Button>
        </Tooltip>
        <Tooltip content="Delete permanently" placement="above">
          <Button label="Delete" variant="destructive">
            Delete
          </Button>
        </Tooltip>
      </HStack>
    </div>
}`,...k.parameters?.docs?.source}}},A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    padding: 100
  }}>
      <p>
        This paragraph contains a{' '}
        <Tooltip content="Tooltip on inline text!" placement="above">
          hover-able term
        </Tooltip>{' '}
        that explains what something means.
      </p>
    </div>
}`,...A.parameters?.docs?.source}}},j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    padding: 100
  }}>
      <p>
        Learn more about our{' '}
        <Tooltip content="Your data is encrypted and never shared" placement="above">
          privacy policy
        </Tooltip>{' '}
        and{' '}
        <Tooltip content="Standard 30-day agreement" placement="above">
          terms of service
        </Tooltip>
        .
      </p>
    </div>
}`,...j.parameters?.docs?.source}}},M.parameters={...M.parameters,docs:{...M.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    padding: 100
  }}>
      <HStack gap={4}>
        {/* Acts on tap: the tap belongs to the button, so no tooltip. */}
        <Tooltip content="Saves your changes" placement="above">
          <Button label="Save">Save</Button>
        </Tooltip>
        {/* Does nothing on tap: the tap opens the tooltip. */}
        <Tooltip content="Tooltip on inline text!" placement="above">
          hover-able term
        </Tooltip>
        {/* A button whose only job is the tooltip — say so with \`tap\`. */}
        <Tooltip content="Rows are ranked by how many places import the icon" placement="above" touchTrigger="tap">
          <Button label="What is this?" variant="secondary">
            ?
          </Button>
        </Tooltip>
      </HStack>
    </div>
}`,...M.parameters?.docs?.source},description:{story:`Touch has no hover, so a tap decides instead — and what the trigger does
decides for it. Try these on a phone, or in a device emulator with touch
emulation on.`,...M.parameters?.docs?.description}}},N=[`Default`,`Below`,`Start`,`RTLLogicalPlacement`,`End`,`CustomDelay`,`Disabled`,`AllPlacements`,`WithHook`,`CustomToggleTrigger`,`LongContent`,`TallContent`,`TallContentMovingHost`,`TallContentReplacedTrigger`,`MultipleTooltips`,`TextNode`,`TextNodeInline`,`TouchTriggers`]})))()}P();export{x as AllPlacements,h as Below,y as CustomDelay,C as CustomToggleTrigger,m as Default,b as Disabled,v as End,w as LongContent,k as MultipleTooltips,_ as RTLLogicalPlacement,g as Start,E as TallContent,D as TallContentMovingHost,O as TallContentReplacedTrigger,A as TextNode,j as TextNodeInline,M as TouchTriggers,S as WithHook,N as __namedExportsOrder,p as default};