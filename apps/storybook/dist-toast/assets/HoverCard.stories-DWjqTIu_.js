import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{t}from"./jsx-runtime-MKhVqBIO.js";import{n,t as r}from"./Text-C5BHw0wv.js";import{n as i,t as a}from"./Button-DoGM0DEN.js";import{n as o,t as s}from"./useHoverCard-CRINreBn.js";import{n as c,t as l}from"./HoverCard-sNYbGCqQ.js";import{n as u,t as d}from"./HStack-D5idGciI.js";import{n as f,t as p}from"./VStack-SWtDePqc.js";function m(){return(0,g.jsx)(`div`,{style:{width:200},children:(0,g.jsxs)(p,{gap:2,children:[(0,g.jsx)(`div`,{style:{fontWeight:600},children:`Jane Doe`}),(0,g.jsx)(`div`,{style:{fontSize:14,opacity:.7},children:`Software Engineer`}),(0,g.jsx)(`div`,{style:{fontSize:13},children:`Building great products with great people.`})]})})}function h({name:e,role:t}){return(0,g.jsxs)(p,{gap:1,children:[(0,g.jsx)(r,{type:`label`,children:e}),(0,g.jsx)(r,{type:`supporting`,children:t})]})}var g,_,v,y,b,x,S,C,w,T,E,D,O,k,A,j,M;function N(){return(N=e((()=>{c(),s(),i(),f(),u(),n(),g=t(),_={title:`Core/HoverCard`,component:l,tags:[`autodocs`],argTypes:{placement:{control:`select`,options:[`above`,`below`,`start`,`end`],description:`Position relative to trigger`},alignment:{control:`select`,options:[`start`,`center`,`end`],description:`Alignment on placement axis`},delay:{control:`number`,description:`Show delay in ms`},hideDelay:{control:`number`,description:`Hide delay in ms`},isEnabled:{control:`boolean`,description:`Enable/disable the hover card`},touchTrigger:{control:`select`,options:[`auto`,`tap`,`none`],description:`What a tap does where there is no hover: auto (tap unless the trigger acts), tap, or none`}}},v={args:{placement:`above`,content:(0,g.jsx)(m,{}),children:(0,g.jsx)(a,{label:`Hover me`,children:`Hover me`})}},y={args:{placement:`below`,content:(0,g.jsx)(m,{}),children:(0,g.jsx)(a,{label:`Hover me`,children:`Hover me`})}},b={args:{placement:`start`,content:(0,g.jsx)(m,{}),children:(0,g.jsx)(a,{label:`Hover me`,children:`Hover me`})}},x={args:{placement:`end`,content:(0,g.jsx)(m,{}),children:(0,g.jsx)(a,{label:`Hover me`,children:`Hover me`})}},S={args:{placement:`above`,delay:500,hideDelay:300,content:(0,g.jsx)(m,{}),children:(0,g.jsx)(a,{label:`Slow hover (500ms)`,children:`Slow hover (500ms)`})}},C={args:{placement:`above`,isEnabled:!1,content:(0,g.jsx)(m,{}),children:(0,g.jsx)(a,{label:`Hover disabled`,children:`Hover disabled`})}},w={render:()=>(0,g.jsxs)(`div`,{style:{padding:100,display:`flex`,gap:24,flexWrap:`wrap`},children:[(0,g.jsx)(l,{content:(0,g.jsx)(m,{}),placement:`above`,children:(0,g.jsx)(a,{label:`Above`,children:`Above`})}),(0,g.jsx)(l,{content:(0,g.jsx)(m,{}),placement:`below`,children:(0,g.jsx)(a,{label:`Below`,children:`Below`})}),(0,g.jsx)(l,{content:(0,g.jsx)(m,{}),placement:`start`,children:(0,g.jsx)(a,{label:`Start`,children:`Start`})}),(0,g.jsx)(l,{content:(0,g.jsx)(m,{}),placement:`end`,children:(0,g.jsx)(a,{label:`End`,children:`End`})})]})},T={render:function(){let e=o({placement:`above`,delay:200});return(0,g.jsxs)(`div`,{style:{padding:100},children:[(0,g.jsx)(a,{label:`Using hook directly`,ref:e.ref,"aria-describedby":e.describedBy,children:`Using hook directly`}),e.renderHoverCard((0,g.jsx)(m,{}))]})}},E={render:()=>(0,g.jsx)(`div`,{style:{padding:100},children:(0,g.jsx)(l,{placement:`below`,content:(0,g.jsxs)(p,{gap:2,children:[(0,g.jsx)(`div`,{children:`Interactive hover card content`}),(0,g.jsxs)(d,{gap:2,children:[(0,g.jsx)(a,{label:`Follow`,variant:`primary`,children:`Follow`}),(0,g.jsx)(a,{label:`Message`,children:`Message`})]})]}),children:(0,g.jsx)(a,{label:`Hover for interactive content`,children:`Hover for interactive content`})})})},D={render:()=>(0,g.jsx)(`div`,{style:{padding:100},children:(0,g.jsxs)(`p`,{children:[`This feature was created by`,` `,(0,g.jsx)(l,{content:(0,g.jsx)(m,{}),placement:`above`,children:`Jane Doe`}),` `,`and shipped last week.`]})})},O={render:()=>(0,g.jsx)(`div`,{style:{padding:100},children:(0,g.jsxs)(`p`,{children:[`The project is maintained by`,` `,(0,g.jsx)(l,{content:(0,g.jsx)(m,{}),placement:`above`,children:`Jane Doe`}),`,`,` `,(0,g.jsx)(l,{content:(0,g.jsx)(`div`,{style:{width:200},children:(0,g.jsxs)(p,{gap:2,children:[(0,g.jsx)(`div`,{style:{fontWeight:600},children:`John Smith`}),(0,g.jsx)(`div`,{style:{fontSize:14,opacity:.7},children:`Product Manager`})]})}),placement:`above`,children:`John Smith`}),`, and others.`]})})},k={render:()=>(0,g.jsx)(`div`,{style:{padding:100},children:(0,g.jsxs)(`p`,{children:[`This feature was created by`,` `,(0,g.jsx)(l,{content:(0,g.jsx)(m,{}),label:`Jane Doe profile`,placement:`below`,isOpen:!0,children:`Jane Doe`}),` `,`and shipped last week.`]})})},A={render:()=>(0,g.jsx)(`div`,{style:{padding:100},children:(0,g.jsxs)(d,{gap:4,children:[(0,g.jsx)(l,{content:(0,g.jsx)(m,{}),placement:`above`,children:(0,g.jsx)(a,{label:`Open profile`,children:`Open profile`})}),(0,g.jsx)(l,{content:(0,g.jsx)(m,{}),placement:`above`,children:`Jane Doe`})]})})},j={render:()=>(0,g.jsxs)(p,{gap:0,children:[(0,g.jsx)(`div`,{style:{paddingBlock:`24px 152px`,paddingInline:16},children:(0,g.jsxs)(r,{as:`p`,children:[`Maintained by`,` `,(0,g.jsx)(l,{isOpen:!0,placement:`below`,alignment:`start`,content:(0,g.jsx)(h,{name:`Jane Doe`,role:`Software engineer`}),children:`Jane Doe`}),`.`]})}),(0,g.jsx)(`div`,{style:{paddingBlock:`0 200px`,paddingInline:16},children:(0,g.jsx)(l,{isOpen:!0,label:`Jane Doe profile`,placement:`below`,alignment:`start`,content:(0,g.jsxs)(p,{gap:3,children:[(0,g.jsx)(h,{name:`Jane Doe`,role:`Software engineer`}),(0,g.jsxs)(d,{gap:2,children:[(0,g.jsx)(a,{label:`Follow`,variant:`primary`,children:`Follow`}),(0,g.jsx)(a,{label:`Message`,children:`Message`})]})]}),children:(0,g.jsx)(a,{label:`Jane Doe`,children:`Jane Doe`})})})]})},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  args: {
    placement: 'above',
    content: <ProfileCard />,
    children: <Button label="Hover me">Hover me</Button>
  }
}`,...v.parameters?.docs?.source}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  args: {
    placement: 'below',
    content: <ProfileCard />,
    children: <Button label="Hover me">Hover me</Button>
  }
}`,...y.parameters?.docs?.source}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  args: {
    placement: 'start',
    content: <ProfileCard />,
    children: <Button label="Hover me">Hover me</Button>
  }
}`,...b.parameters?.docs?.source}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  args: {
    placement: 'end',
    content: <ProfileCard />,
    children: <Button label="Hover me">Hover me</Button>
  }
}`,...x.parameters?.docs?.source}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  args: {
    placement: 'above',
    delay: 500,
    hideDelay: 300,
    content: <ProfileCard />,
    children: <Button label="Slow hover (500ms)">Slow hover (500ms)</Button>
  }
}`,...S.parameters?.docs?.source}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  args: {
    placement: 'above',
    isEnabled: false,
    content: <ProfileCard />,
    children: <Button label="Hover disabled">Hover disabled</Button>
  }
}`,...C.parameters?.docs?.source}}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    padding: 100,
    display: 'flex',
    gap: 24,
    flexWrap: 'wrap'
  }}>
      <HoverCard content={<ProfileCard />} placement="above">
        <Button label="Above">Above</Button>
      </HoverCard>
      <HoverCard content={<ProfileCard />} placement="below">
        <Button label="Below">Below</Button>
      </HoverCard>
      <HoverCard content={<ProfileCard />} placement="start">
        <Button label="Start">Start</Button>
      </HoverCard>
      <HoverCard content={<ProfileCard />} placement="end">
        <Button label="End">End</Button>
      </HoverCard>
    </div>
}`,...w.parameters?.docs?.source}}},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  render: function HookExample() {
    const hoverCard = useHoverCard({
      placement: 'above',
      delay: 200
    });
    return <div style={{
      padding: 100
    }}>
        <Button label="Using hook directly" ref={hoverCard.ref} aria-describedby={hoverCard.describedBy}>
          Using hook directly
        </Button>
        {hoverCard.renderHoverCard(<ProfileCard />)}
      </div>;
  }
}`,...T.parameters?.docs?.source}}},E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    padding: 100
  }}>
      <HoverCard placement="below" content={<VStack gap={2}>
            <div>Interactive hover card content</div>
            <HStack gap={2}>
              <Button label="Follow" variant="primary">
                Follow
              </Button>
              <Button label="Message">Message</Button>
            </HStack>
          </VStack>}>
        <Button label="Hover for interactive content">
          Hover for interactive content
        </Button>
      </HoverCard>
    </div>
}`,...E.parameters?.docs?.source}}},D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    padding: 100
  }}>
      <p>
        This feature was created by{' '}
        <HoverCard content={<ProfileCard />} placement="above">
          Jane Doe
        </HoverCard>{' '}
        and shipped last week.
      </p>
    </div>
}`,...D.parameters?.docs?.source}}},O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    padding: 100
  }}>
      <p>
        The project is maintained by{' '}
        <HoverCard content={<ProfileCard />} placement="above">
          Jane Doe
        </HoverCard>
        ,{' '}
        <HoverCard content={<div style={{
        width: 200
      }}>
              <VStack gap={2}>
                <div style={{
            fontWeight: 600
          }}>John Smith</div>
                <div style={{
            fontSize: 14,
            opacity: 0.7
          }}>Product Manager</div>
              </VStack>
            </div>} placement="above">
          John Smith
        </HoverCard>
        , and others.
      </p>
    </div>
}`,...O.parameters?.docs?.source}}},k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    padding: 100
  }}>
      <p>
        This feature was created by{' '}
        <HoverCard content={<ProfileCard />} label="Jane Doe profile" placement="below" isOpen>
          Jane Doe
        </HoverCard>{' '}
        and shipped last week.
      </p>
    </div>
}`,...k.parameters?.docs?.source},description:{story:`A labelled card on a text trigger. The trigger is a role-less span, so it
names the open card through aria-controls and carries no aria-haspopup.`,...k.parameters?.docs?.description}}},A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    padding: 100
  }}>
      <HStack gap={4}>
        {/* Acts on tap: the tap belongs to the button, so no card. */}
        <HoverCard content={<ProfileCard />} placement="above">
          <Button label="Open profile">Open profile</Button>
        </HoverCard>
        {/* Does nothing on tap: the tap opens the card. */}
        <HoverCard content={<ProfileCard />} placement="above">
          Jane Doe
        </HoverCard>
      </HStack>
    </div>
}`,...A.parameters?.docs?.source},description:{story:`Touch has no hover, so a tap decides instead. A tap-opened card is dismissed
by a tap outside it, and a tap on the card's own content leaves it open.`,...A.parameters?.docs?.description}}},j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
  render: () => <VStack gap={0}>
      <div style={{
      paddingBlock: '24px 152px',
      paddingInline: 16
    }}>
        <Text as="p">
          Maintained by{' '}
          <HoverCard isOpen placement="below" alignment="start" content={<AuditProfile name="Jane Doe" role="Software engineer" />}>
            Jane Doe
          </HoverCard>
          .
        </Text>
      </div>
      <div style={{
      paddingBlock: '0 200px',
      paddingInline: 16
    }}>
        <HoverCard isOpen label="Jane Doe profile" placement="below" alignment="start" content={<VStack gap={3}>
              <AuditProfile name="Jane Doe" role="Software engineer" />
              <HStack gap={2}>
                <Button label="Follow" variant="primary">
                  Follow
                </Button>
                <Button label="Message">Message</Button>
              </HStack>
            </VStack>}>
          <Button label="Jane Doe">Jane Doe</Button>
        </HoverCard>
      </div>
    </VStack>
}`,...j.parameters?.docs?.source},description:{story:`Both popup roles, shown open. An unlabelled card on a text trigger is a
group that describes its trigger. A labelled card with actions is a named
dialog that its button advertises.`,...j.parameters?.docs?.description}}},M=[`Default`,`Below`,`Start`,`End`,`CustomDelay`,`Disabled`,`AllPlacements`,`WithHook`,`InteractiveContent`,`TextNode`,`TextNodeMultiple`,`LabelledTextTrigger`,`TouchTriggers`,`OpenStates`]})))()}N();export{w as AllPlacements,y as Below,S as CustomDelay,v as Default,C as Disabled,x as End,E as InteractiveContent,k as LabelledTextTrigger,j as OpenStates,b as Start,D as TextNode,O as TextNodeMultiple,A as TouchTriggers,T as WithHook,M as __namedExportsOrder,_ as default};