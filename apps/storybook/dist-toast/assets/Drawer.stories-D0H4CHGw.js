import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{t}from"./react-DlPsW1c0.js";import{i as n,n as r,r as i,t as a}from"./LayoutContent-BEmJ3Yl2.js";import{t as o}from"./jsx-runtime-MKhVqBIO.js";import{o as s,s as c}from"./useTheme-CUotWZgR.js";import{n as l,t as u}from"./Text-C5BHw0wv.js";import{n as d,t as f}from"./Button-DoGM0DEN.js";import{n as p,t as m}from"./Heading-YiIeUtHm.js";import{n as ee,t as h}from"./Divider-DkevuVb8.js";import{n as g,t as _}from"./HStack-D5idGciI.js";import{n as v,t as y}from"./VStack-SWtDePqc.js";import{n as b,t as x}from"./Section-g5hpGOnN.js";import{n as te,t as ne}from"./LayoutFooter-aEVnoSty.js";import{n as S,t as C}from"./CheckboxInput-CnJ0nBRn.js";import{n as w,t as T}from"./Drawer-BXTsMjyA.js";import{n as E,t as D}from"./DrawerHeader-BO-XjUWO.js";import{c as O,o as k}from"./iframe-B7UFaprG.js";function A(e){return{name:`Self-applied RTL ${e} audit`,parameters:{docs:{disable:!0}},render:()=>{let[t,n]=(0,j.useState)(!1);return(0,M.jsxs)(M.Fragment,{children:[(0,M.jsx)(f,{label:`Open self-directed RTL ${e} drawer`,onClick:()=>n(!0)}),(0,M.jsx)(T,{isOpen:t,onOpenChange:n,label:`Deployment details`,side:e,dir:`rtl`,children:(0,M.jsx)(i,{header:(0,M.jsx)(D,{title:`Deployment details`,onOpenChange:n}),content:(0,M.jsx)(a,{children:(0,M.jsx)(u,{type:`body`,children:`The Drawer root owns this RTL region.`})})})})]})}}}var j,M,N,P,F,I,L,R,z,B,V,H,U,W,G,K,q,J,Y,X,Z,Q;function $(){return($=e((()=>{j=t(),w(),E(),d(),S(),ee(),p(),n(),r(),te(),b(),v(),g(),l(),O(),c(),M=o(),N={title:`Core/Drawer`,component:T,tags:[`autodocs`],parameters:{layout:`centered`,docs:{description:{component:`A side panel that **floats above** page content — it overlays the
layout instead of reflowing it, which is what separates a drawer
from a docked panel.

- Anchors to the **inline start or end** edge only (left/right in
  LTR); block-axis sheets are \`BottomSheet\`.
- Works on **desktop and touch**: \`width\` is the desktop budget
  budget, and below 640px the panel preserves a 56px reveal
  without exceeding that budget (the experimental
  \`experimental={{isFullWidthOnMobile: true}}\` makes it edge to edge).
- **Scrim optional**: modal with a scrim by default, or
  \`hasScrim={false}\` for a non-modal overlay that leaves the page
  behind interactive.
- **Square corners** (0px radius) — the panel is flush with three
  viewport edges.`}}},decorators:[e=>(0,M.jsx)(`div`,{style:{width:`min(560px, 100vw - 64px)`,minHeight:360,padding:32},children:(0,M.jsx)(e,{})})]},P=[`us-east-1`,`eu-west-1`,`ap-south-1`],F={render:()=>{let[e,t]=(0,j.useState)(!1);return(0,M.jsxs)(M.Fragment,{children:[(0,M.jsx)(f,{label:`Open inspector`,onClick:()=>t(!0)}),(0,M.jsx)(T,{isOpen:e,onOpenChange:t,label:`Deployment details`,width:400,children:(0,M.jsx)(i,{header:(0,M.jsx)(D,{title:`web-prod-04`,subtitle:`us-east-1, deployed 12 min ago`,onOpenChange:t,hasDivider:!0}),content:(0,M.jsx)(a,{children:(0,M.jsxs)(y,{gap:4,children:[(0,M.jsxs)(y,{gap:2,children:[(0,M.jsx)(u,{type:`label`,children:`Status`}),(0,M.jsx)(u,{type:`body`,children:`Healthy - all 6 instances passing readiness checks.`})]}),(0,M.jsxs)(y,{gap:2,children:[(0,M.jsx)(u,{type:`label`,children:`Build`}),(0,M.jsx)(u,{type:`body`,children:`#4821 - main @ 03536f1`})]})]})})})})]})}},I={render:()=>{let[e,t]=(0,j.useState)(!1);return(0,M.jsxs)(M.Fragment,{children:[(0,M.jsx)(f,{label:`Open drawer`,onClick:()=>t(!0)}),(0,M.jsx)(T,{isOpen:e,onOpenChange:t,label:`Details`,hasScrim:!1,width:360,children:(0,M.jsx)(x,{padding:4,children:(0,M.jsxs)(y,{gap:4,children:[(0,M.jsxs)(y,{gap:1,children:[(0,M.jsx)(m,{level:3,children:`Details`}),(0,M.jsx)(u,{type:`supporting`,color:`secondary`,children:`The page behind stays interactive.`})]}),(0,M.jsx)(f,{label:`Close inspector`,variant:`secondary`,onClick:()=>t(!1)})]})})})]})}},L={render:()=>{let[e,t]=(0,j.useState)(!1),[n,r]=(0,j.useState)(!1);return(0,M.jsxs)(M.Fragment,{children:[(0,M.jsx)(f,{label:`Open order`,onClick:()=>t(!0)}),(0,M.jsx)(T,{isOpen:e,onOpenChange:t,label:`Order details`,hasScrim:!1,children:(0,M.jsx)(x,{padding:4,children:(0,M.jsxs)(y,{gap:4,children:[(0,M.jsx)(m,{level:3,children:`Order #4821`}),(0,M.jsx)(u,{type:`body`,children:`Three line items, ready to ship.`}),(0,M.jsx)(f,{label:`Open line item`,"data-autofocus":!0,onClick:()=>r(!0)})]})})}),(0,M.jsx)(T,{isOpen:n,onOpenChange:r,label:`Line item details`,hasScrim:!1,width:320,children:(0,M.jsx)(x,{padding:4,children:(0,M.jsxs)(y,{gap:4,children:[(0,M.jsx)(m,{level:3,children:`Compute instance`}),(0,M.jsx)(u,{type:`body`,children:`Quantity 6 · us-east-1`}),(0,M.jsx)(f,{label:`Close line item`,variant:`secondary`,"data-autofocus":!0,onClick:()=>r(!1)})]})})})]})}},R={render:()=>{let[e,t]=(0,j.useState)(null);return(0,M.jsxs)(M.Fragment,{children:[(0,M.jsxs)(_,{gap:2,children:[(0,M.jsx)(f,{label:`Open from start`,onClick:()=>t(`start`)}),(0,M.jsx)(f,{label:`Open from end`,onClick:()=>t(`end`)})]}),(0,M.jsx)(T,{isOpen:e!=null,onOpenChange:e=>!e&&t(null),label:`Filters (${e??`end`})`,side:e??`end`,children:(0,M.jsx)(x,{padding:4,children:(0,M.jsxs)(y,{gap:4,children:[(0,M.jsx)(m,{level:3,children:`Filter by region`}),(0,M.jsxs)(u,{type:`supporting`,color:`secondary`,children:[`Sliding in from the `,e,` edge.`]})]})})})]})}},z=A(`start`),B=A(`end`),V={name:`Nested LTR override audit`,parameters:{docs:{disable:!0}},render:()=>{let[e,t]=(0,j.useState)(!1);return(0,M.jsxs)(M.Fragment,{children:[(0,M.jsx)(f,{label:`Open nested LTR drawer`,onClick:()=>t(!0)}),(0,M.jsx)(T,{isOpen:e,onOpenChange:t,label:`Deployment details`,side:`end`,dir:`ltr`,children:(0,M.jsx)(i,{header:(0,M.jsx)(D,{title:`Deployment details`,onOpenChange:t}),content:(0,M.jsx)(a,{children:(0,M.jsx)(u,{type:`body`,children:`This local LTR region overrides the ambient RTL page.`})})})})]})}},H={render:()=>{let[e,t]=(0,j.useState)(null);return(0,M.jsxs)(M.Fragment,{children:[(0,M.jsxs)(_,{gap:2,children:[(0,M.jsx)(f,{label:`320px`,onClick:()=>t(320)}),(0,M.jsx)(f,{label:`480px`,onClick:()=>t(480)}),(0,M.jsx)(f,{label:`50%`,onClick:()=>t(`50%`)})]}),(0,M.jsx)(T,{isOpen:e!=null,onOpenChange:e=>!e&&t(null),label:`Details`,width:e??400,children:(0,M.jsx)(x,{padding:4,children:(0,M.jsxs)(y,{gap:4,children:[(0,M.jsx)(m,{level:3,children:`web-prod-04`}),(0,M.jsxs)(u,{type:`body`,children:[`Desktop width budget: `,String(e)]})]})})})]})}},U={render:()=>{let[e,t]=(0,j.useState)(!1),[n,r]=(0,j.useState)(!1),[i,a]=(0,j.useState)(P.slice(0,1)),o=(0,M.jsx)(x,{padding:4,children:(0,M.jsxs)(y,{gap:4,children:[(0,M.jsxs)(y,{gap:1,children:[(0,M.jsx)(m,{level:3,children:`Filter by region`}),(0,M.jsxs)(u,{type:`supporting`,color:`secondary`,children:[`Showing hosts in `,i.length,` of `,P.length,` regions`]})]}),(0,M.jsx)(y,{gap:2,children:P.map(e=>(0,M.jsx)(C,{label:e,value:i.includes(e),onChange:t=>a(n=>t?[...n,e]:n.filter(t=>t!==e))},e))}),(0,M.jsx)(f,{label:`Apply filters`,onClick:()=>{t(!1),r(!1)},"data-autofocus":!0})]})});return(0,M.jsxs)(M.Fragment,{children:[(0,M.jsxs)(_,{gap:2,children:[(0,M.jsx)(f,{label:`56px reveal on mobile`,onClick:()=>r(!0)}),(0,M.jsx)(f,{label:`Full width on mobile`,variant:`secondary`,onClick:()=>t(!0)})]}),(0,M.jsx)(T,{isOpen:n,onOpenChange:r,label:`Region filters`,children:o}),(0,M.jsx)(T,{isOpen:e,onOpenChange:t,label:`Region filters (full width)`,experimental:{isFullWidthOnMobile:!0},children:o})]})}},W={render:()=>{let[e,t]=(0,j.useState)(!1);return(0,M.jsxs)(M.Fragment,{children:[(0,M.jsxs)(y,{gap:3,children:[(0,M.jsx)(f,{label:e?`Close drawer`:`Open drawer`,onClick:()=>t(e=>!e)}),(0,M.jsx)(m,{level:3,children:`Deployment log`}),[`The page keeps its full width while the drawer is open.`,`No column reflows, no content jumps, nothing is pushed aside.`,`The drawer is painted on top and the layout underneath is`,`untouched — which is exactly what a docked panel would not do.`].map(e=>(0,M.jsx)(u,{type:`body`,children:e},e))]}),(0,M.jsx)(T,{isOpen:e,onOpenChange:t,label:`Deployment details`,hasScrim:!1,children:(0,M.jsx)(x,{padding:4,children:(0,M.jsxs)(y,{gap:4,children:[(0,M.jsx)(m,{level:3,children:`web-prod-04`}),(0,M.jsx)(u,{type:`supporting`,color:`secondary`,children:`Floating above the page, not docked beside it.`})]})})})]})}},G={render:()=>{let[e,t]=(0,j.useState)(!1),[n,r]=(0,j.useState)(!1);return(0,M.jsxs)(M.Fragment,{children:[(0,M.jsxs)(y,{gap:3,children:[(0,M.jsxs)(_,{gap:2,children:[(0,M.jsx)(f,{label:`With scrim`,onClick:()=>t(!0)}),(0,M.jsx)(f,{label:`Without scrim`,variant:`secondary`,onClick:()=>r(!0)})]}),(0,M.jsx)(u,{type:`supporting`,color:`secondary`,children:`These buttons stay clickable while the scrim-less drawer is open.`})]}),(0,M.jsx)(T,{isOpen:e,onOpenChange:t,label:`Modal details`,children:(0,M.jsx)(x,{padding:4,children:(0,M.jsxs)(y,{gap:4,children:[(0,M.jsx)(m,{level:3,children:`Modal`}),(0,M.jsx)(u,{type:`body`,children:`Scrim dims the page, focus is trapped, Escape or a scrim click closes.`})]})})}),(0,M.jsx)(T,{isOpen:n,onOpenChange:r,label:`Non-modal details`,hasScrim:!1,children:(0,M.jsx)(i,{header:(0,M.jsx)(D,{title:`Non-modal`,onOpenChange:r}),content:(0,M.jsx)(a,{children:(0,M.jsx)(u,{type:`body`,children:`No scrim, no focus trap. The page behind keeps working while this stays open.`})})})})]})}},K={render:()=>{let[e,t]=(0,j.useState)(!1);return(0,M.jsxs)(M.Fragment,{children:[(0,M.jsx)(f,{label:`Edit row`,onClick:()=>t(!0)}),e?(0,M.jsx)(T,{isOpen:!0,onOpenChange:t,label:`Edit row`,hasScrim:!1,children:(0,M.jsx)(x,{padding:4,children:(0,M.jsxs)(y,{gap:3,children:[(0,M.jsx)(u,{type:`body`,children:`This drawer renders only while open. Save removes it.`}),(0,M.jsx)(f,{label:`Save`,onClick:()=>t(!1)})]})})}):null]})}},q={render:()=>{let[e,t]=(0,j.useState)(null),n=()=>t(null);return(0,M.jsxs)(M.Fragment,{children:[(0,M.jsxs)(_,{gap:2,children:[(0,M.jsx)(f,{label:`info`,onClick:()=>t(`info`)}),(0,M.jsx)(f,{label:`form`,onClick:()=>t(`form`)}),(0,M.jsx)(f,{label:`required`,onClick:()=>t(`required`)})]}),(0,M.jsx)(T,{isOpen:e!=null,onOpenChange:e=>!e&&n(),label:`Purpose: ${e??`info`}`,purpose:e??`info`,children:e===`required`?(0,M.jsx)(i,{header:(0,M.jsx)(D,{title:`Accept the terms`}),content:(0,M.jsx)(a,{children:(0,M.jsxs)(y,{gap:4,children:[(0,M.jsx)(u,{type:`body`,children:`Escape and the scrim do nothing. Only this button closes the drawer.`}),(0,M.jsx)(f,{label:`Accept`,"data-autofocus":!0,onClick:n})]})})}):(0,M.jsx)(i,{header:(0,M.jsx)(D,{title:e===`form`?`Edit details`:`Details`,onOpenChange:e=>!e&&n()}),content:(0,M.jsx)(a,{children:(0,M.jsx)(u,{type:`body`,children:e===`form`?`Escape or the close button closes; a scrim click does not.`:`Escape, a scrim click, or the close button closes.`})})})})]})}},J={render:()=>{let[e,t]=(0,j.useState)(!1);return(0,M.jsxs)(M.Fragment,{children:[(0,M.jsx)(f,{label:`Open with Layout`,onClick:()=>t(!0)}),(0,M.jsx)(T,{isOpen:e,onOpenChange:t,label:`Deployment details`,width:400,children:(0,M.jsx)(i,{header:(0,M.jsx)(D,{title:`web-prod-04`,subtitle:`us-east-1, deployed 12 min ago`,onOpenChange:t,hasDivider:!0}),content:(0,M.jsx)(a,{children:(0,M.jsx)(y,{gap:4,children:P.map(e=>(0,M.jsxs)(y,{gap:2,children:[(0,M.jsx)(u,{type:`label`,children:e}),(0,M.jsx)(u,{type:`body`,children:`Healthy - all instances passing readiness checks.`})]},e))})}),footer:(0,M.jsx)(ne,{hasDivider:!0,children:(0,M.jsxs)(_,{gap:2,hAlign:`end`,children:[(0,M.jsx)(f,{label:`Cancel`,variant:`secondary`,onClick:()=>t(!1)}),(0,M.jsx)(f,{label:`Redeploy`,variant:`primary`,onClick:()=>t(!1)})]})})})})]})}},Y={render:()=>{let[e,t]=(0,j.useState)(!1);return(0,M.jsxs)(M.Fragment,{children:[(0,M.jsx)(f,{label:`Open padded drawer`,onClick:()=>t(!0)}),(0,M.jsx)(T,{isOpen:e,onOpenChange:t,label:`Run summary`,width:400,padding:6,children:(0,M.jsxs)(y,{gap:4,children:[(0,M.jsx)(m,{level:2,children:`Run summary`}),(0,M.jsx)(u,{type:`body`,children:`Plain children sit inside the drawer's own padding - no Section wrapper needed.`}),(0,M.jsx)(h,{isFullBleed:!0}),(0,M.jsx)(u,{type:`body`,children:`The divider above opts into bleed (isFullBleed): it compensates against the published inset and reaches both panel edges.`}),(0,M.jsx)(f,{label:`Close`,onClick:()=>t(!1)})]})})]})}},X=s({name:`drawer-padding-demo`,components:{drawer:{base:{padding:`24px`}}}}),Z={render:()=>{let[e,t]=(0,j.useState)(!1);return(0,M.jsxs)(k,{theme:X,children:[(0,M.jsx)(f,{label:`Open themed drawer`,onClick:()=>t(!0)}),(0,M.jsx)(T,{isOpen:e,onOpenChange:t,label:`Run summary`,width:400,children:(0,M.jsxs)(y,{gap:4,children:[(0,M.jsx)(m,{level:2,children:`Run summary`}),(0,M.jsx)(u,{type:`body`,children:`The theme sets drawer padding to 24px; this text is inset by it.`}),(0,M.jsx)(f,{label:`Close`,onClick:()=>t(!1)})]})})]})}},F.parameters={...F.parameters,docs:{...F.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return <>
        <Button label="Open inspector" onClick={() => setIsOpen(true)} />
        <Drawer isOpen={isOpen} onOpenChange={setIsOpen} label="Deployment details" width={400}>
          <Layout header={<DrawerHeader title="web-prod-04" subtitle="us-east-1, deployed 12 min ago" onOpenChange={setIsOpen} hasDivider />} content={<LayoutContent>
                <VStack gap={4}>
                  <VStack gap={2}>
                    <Text type="label">Status</Text>
                    <Text type="body">
                      Healthy - all 6 instances passing readiness checks.
                    </Text>
                  </VStack>
                  <VStack gap={2}>
                    <Text type="label">Build</Text>
                    <Text type="body">#4821 - main @ 03536f1</Text>
                  </VStack>
                </VStack>
              </LayoutContent>} />
        </Drawer>
      </>;
  }
}`,...F.parameters?.docs?.source}}},I.parameters={...I.parameters,docs:{...I.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return <>
        <Button label="Open drawer" onClick={() => setIsOpen(true)} />
        <Drawer isOpen={isOpen} onOpenChange={setIsOpen} label="Details" hasScrim={false} width={360}>
          <Section padding={4}>
            <VStack gap={4}>
              <VStack gap={1}>
                <Heading level={3}>Details</Heading>
                <Text type="supporting" color="secondary">
                  The page behind stays interactive.
                </Text>
              </VStack>
              <Button label="Close inspector" variant="secondary" onClick={() => setIsOpen(false)} />
            </VStack>
          </Section>
        </Drawer>
      </>;
  }
}`,...I.parameters?.docs?.source},description:{story:"Non-modal inspector: no scrim, no focus trap, and the page behind stays\ninteractive. In a real master-detail flow, derive the open state from the\nselection (`isOpen={selected != null}`) and clear it in `onOpenChange`.",...I.parameters?.docs?.description}}},L.parameters={...L.parameters,docs:{...L.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [orderOpen, setOrderOpen] = useState(false);
    const [lineItemOpen, setLineItemOpen] = useState(false);
    return <>
        <Button label="Open order" onClick={() => setOrderOpen(true)} />
        <Drawer isOpen={orderOpen} onOpenChange={setOrderOpen} label="Order details" hasScrim={false}>
          <Section padding={4}>
            <VStack gap={4}>
              <Heading level={3}>Order #4821</Heading>
              <Text type="body">Three line items, ready to ship.</Text>
              <Button label="Open line item" data-autofocus onClick={() => setLineItemOpen(true)} />
            </VStack>
          </Section>
        </Drawer>
        <Drawer isOpen={lineItemOpen} onOpenChange={setLineItemOpen} label="Line item details" hasScrim={false} width={320}>
          <Section padding={4}>
            <VStack gap={4}>
              <Heading level={3}>Compute instance</Heading>
              <Text type="body">Quantity 6 · us-east-1</Text>
              <Button label="Close line item" variant="secondary" data-autofocus onClick={() => setLineItemOpen(false)} />
            </VStack>
          </Section>
        </Drawer>
      </>;
  }
}`,...L.parameters?.docs?.source},description:{story:`Sibling drawers share one top-layer stack. A closing inner drawer continues
to own Escape until its slide-out finishes, then the outer drawer becomes
the topmost dismissible surface.`,...L.parameters?.docs?.description}}},R.parameters={...R.parameters,docs:{...R.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [side, setSide] = useState<'start' | 'end' | null>(null);
    return <>
        <HStack gap={2}>
          <Button label="Open from start" onClick={() => setSide('start')} />
          <Button label="Open from end" onClick={() => setSide('end')} />
        </HStack>
        <Drawer isOpen={side != null} onOpenChange={isOpen => !isOpen && setSide(null)} label={\`Filters (\${side ?? 'end'})\`} side={side ?? 'end'}>
          <Section padding={4}>
            <VStack gap={4}>
              <Heading level={3}>Filter by region</Heading>
              <Text type="supporting" color="secondary">
                Sliding in from the {side} edge.
              </Text>
            </VStack>
          </Section>
        </Drawer>
      </>;
  }
}`,...R.parameters?.docs?.source},description:{story:'Both edges. `side="start"` is left in LTR (and right in RTL) — use it for\nnavigation-adjacent content; `end` is the inspector convention.',...R.parameters?.docs?.description}}},z.parameters={...z.parameters,docs:{...z.parameters?.docs,source:{originalSource:`selfDirectedRtlStory('start')`,...z.parameters?.docs?.source}}},B.parameters={...B.parameters,docs:{...B.parameters?.docs,source:{originalSource:`selfDirectedRtlStory('end')`,...B.parameters?.docs?.source}}},V.parameters={...V.parameters,docs:{...V.parameters?.docs,source:{originalSource:`{
  name: 'Nested LTR override audit',
  parameters: {
    docs: {
      disable: true
    }
  },
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return <>
        <Button label="Open nested LTR drawer" onClick={() => setIsOpen(true)} />
        <Drawer isOpen={isOpen} onOpenChange={setIsOpen} label="Deployment details" side="end" dir="ltr">
          <Layout header={<DrawerHeader title="Deployment details" onOpenChange={setIsOpen} />} content={<LayoutContent>
                <Text type="body">
                  This local LTR region overrides the ambient RTL page.
                </Text>
              </LayoutContent>} />
        </Drawer>
      </>;
  }
}`,...V.parameters?.docs?.source}}},H.parameters={...H.parameters,docs:{...H.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [width, setWidth] = useState<number | string | null>(null);
    return <>
        <HStack gap={2}>
          <Button label="320px" onClick={() => setWidth(320)} />
          <Button label="480px" onClick={() => setWidth(480)} />
          <Button label="50%" onClick={() => setWidth('50%')} />
        </HStack>
        <Drawer isOpen={width != null} onOpenChange={isOpen => !isOpen && setWidth(null)} label="Details" width={width ?? 400}>
          <Section padding={4}>
            <VStack gap={4}>
              <Heading level={3}>web-prod-04</Heading>
              <Text type="body">Desktop width budget: {String(width)}</Text>
            </VStack>
          </Section>
        </Drawer>
      </>;
  }
}`,...H.parameters?.docs?.source},description:{story:`\`width\` is the desktop budget: a number of pixels or any CSS length.
Narrow the browser below 640px: each width remains an upper bound while
the drawer preserves a 56px reveal of the page behind.`,...H.parameters?.docs?.description}}},U.parameters={...U.parameters,docs:{...U.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [openFull, setOpenFull] = useState(false);
    const [openPartial, setOpenPartial] = useState(false);
    const [selected, setSelected] = useState<string[]>(REGIONS.slice(0, 1));
    const filters = <Section padding={4}>
        <VStack gap={4}>
          <VStack gap={1}>
            <Heading level={3}>Filter by region</Heading>
            <Text type="supporting" color="secondary">
              Showing hosts in {selected.length} of {REGIONS.length} regions
            </Text>
          </VStack>
          <VStack gap={2}>
            {REGIONS.map(region => <CheckboxInput key={region} label={region} value={selected.includes(region)} onChange={checked => setSelected(current => checked ? [...current, region] : current.filter(r => r !== region))} />)}
          </VStack>
          <Button label="Apply filters" onClick={() => {
          setOpenFull(false);
          setOpenPartial(false);
        }} data-autofocus />
        </VStack>
      </Section>;
    return <>
        <HStack gap={2}>
          <Button label="56px reveal on mobile" onClick={() => setOpenPartial(true)} />
          <Button label="Full width on mobile" variant="secondary" onClick={() => setOpenFull(true)} />
        </HStack>
        <Drawer isOpen={openPartial} onOpenChange={setOpenPartial} label="Region filters">
          {filters}
        </Drawer>
        <Drawer isOpen={openFull} onOpenChange={setOpenFull} label="Region filters (full width)" experimental={{
        isFullWidthOnMobile: true
      }}>
          {filters}
        </Drawer>
      </>;
  }
}`,...U.parameters?.docs?.source},description:{story:`On touch viewports (below 640px) the drawer preserves a 56px reveal of the
page behind without exceeding its width budget; the experimental
\`experimental={{isFullWidthOnMobile: true}}\` makes it edge to edge. Resize the preview below 640px to compare.`,...U.parameters?.docs?.description}}},W.parameters={...W.parameters,docs:{...W.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return <>
        <VStack gap={3}>
          <Button label={isOpen ? 'Close drawer' : 'Open drawer'} onClick={() => setIsOpen(open => !open)} />
          <Heading level={3}>Deployment log</Heading>
          {['The page keeps its full width while the drawer is open.', 'No column reflows, no content jumps, nothing is pushed aside.', 'The drawer is painted on top and the layout underneath is', 'untouched — which is exactly what a docked panel would not do.'].map(line => <Text key={line} type="body">
              {line}
            </Text>)}
        </VStack>
        <Drawer isOpen={isOpen} onOpenChange={setIsOpen} label="Deployment details" hasScrim={false}>
          <Section padding={4}>
            <VStack gap={4}>
              <Heading level={3}>web-prod-04</Heading>
              <Text type="supporting" color="secondary">
                Floating above the page, not docked beside it.
              </Text>
            </VStack>
          </Section>
        </Drawer>
      </>;
  }
}`,...W.parameters?.docs?.source},description:{story:`A drawer floats above the page: the content underneath keeps its layout
and never reflows to make room, which is the difference between a drawer
and a docked panel. Compare the text column with the drawer open and
closed — nothing behind it moves.`,...W.parameters?.docs?.description}}},G.parameters={...G.parameters,docs:{...G.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [openWith, setOpenWith] = useState(false);
    const [openWithout, setOpenWithout] = useState(false);
    return <>
        <VStack gap={3}>
          <HStack gap={2}>
            <Button label="With scrim" onClick={() => setOpenWith(true)} />
            <Button label="Without scrim" variant="secondary" onClick={() => setOpenWithout(true)} />
          </HStack>
          <Text type="supporting" color="secondary">
            These buttons stay clickable while the scrim-less drawer is open.
          </Text>
        </VStack>
        <Drawer isOpen={openWith} onOpenChange={setOpenWith} label="Modal details">
          <Section padding={4}>
            <VStack gap={4}>
              <Heading level={3}>Modal</Heading>
              <Text type="body">
                Scrim dims the page, focus is trapped, Escape or a scrim click
                closes.
              </Text>
            </VStack>
          </Section>
        </Drawer>
        <Drawer isOpen={openWithout} onOpenChange={setOpenWithout} label="Non-modal details" hasScrim={false}>
          {/* No scrim to click, so the header's close button is the visible exit. */}
          <Layout header={<DrawerHeader title="Non-modal" onOpenChange={setOpenWithout} />} content={<LayoutContent>
                <Text type="body">
                  No scrim, no focus trap. The page behind keeps working while
                  this stays open.
                </Text>
              </LayoutContent>} />
        </Drawer>
      </>;
  }
}`,...G.parameters?.docs?.source},description:{story:`With a scrim (default) the drawer is modal: the page behind dims, focus is
trapped, and clicking the scrim closes it. Without one it is a plain
overlay — no dimming, no focus trap, and the page behind stays clickable,
which is what master-detail flows want.`,...G.parameters?.docs?.description}}},K.parameters={...K.parameters,docs:{...K.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [isEditing, setIsEditing] = useState(false);
    return <>
        <Button label="Edit row" onClick={() => setIsEditing(true)} />
        {isEditing ? <Drawer isOpen onOpenChange={setIsEditing} label="Edit row" hasScrim={false}>
            <Section padding={4}>
              <VStack gap={3}>
                <Text type="body">
                  This drawer renders only while open. Save removes it.
                </Text>
                <Button label="Save" onClick={() => setIsEditing(false)} />
              </VStack>
            </Section>
          </Drawer> : null}
      </>;
  }
}`,...K.parameters?.docs?.source},description:{story:`A drawer rendered only while open: Save removes it without a close. Focus
goes back to the button that opened it, as a close returns it.`,...K.parameters?.docs?.description}}},q.parameters={...q.parameters,docs:{...q.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [purpose, setPurpose] = useState<'info' | 'form' | 'required' | null>(null);
    const close = () => setPurpose(null);
    return <>
        <HStack gap={2}>
          <Button label="info" onClick={() => setPurpose('info')} />
          <Button label="form" onClick={() => setPurpose('form')} />
          <Button label="required" onClick={() => setPurpose('required')} />
        </HStack>
        <Drawer isOpen={purpose != null} onOpenChange={isOpen => !isOpen && close()} label={\`Purpose: \${purpose ?? 'info'}\`} purpose={purpose ?? 'info'}>
          {purpose === 'required' ? <Layout header={<DrawerHeader title="Accept the terms" />} content={<LayoutContent>
                  <VStack gap={4}>
                    <Text type="body">
                      Escape and the scrim do nothing. Only this button closes
                      the drawer.
                    </Text>
                    <Button label="Accept" data-autofocus onClick={close} />
                  </VStack>
                </LayoutContent>} /> : <Layout header={<DrawerHeader title={purpose === 'form' ? 'Edit details' : 'Details'} onOpenChange={isOpen => !isOpen && close()} />} content={<LayoutContent>
                  <Text type="body">
                    {purpose === 'form' ? 'Escape or the close button closes; a scrim click does not.' : 'Escape, a scrim click, or the close button closes.'}
                  </Text>
                </LayoutContent>} />}
        </Drawer>
      </>;
  }
}`,...q.parameters?.docs?.source},description:{story:"`purpose` matches Dialog. `info` (default) closes on Escape and a scrim\nclick; `form` ignores the scrim click so a stray click cannot discard input;\n`required` ignores both and is exposed as an `alertdialog`, so its content\nowns the way out. Drawer has no close button of its own: `DrawerHeader`\nrenders one when given `onOpenChange`.",...q.parameters?.docs?.description}}},J.parameters={...J.parameters,docs:{...J.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return <>
        <Button label="Open with Layout" onClick={() => setIsOpen(true)} />
        <Drawer isOpen={isOpen} onOpenChange={setIsOpen} label="Deployment details" width={400}>
          <Layout header={<DrawerHeader title="web-prod-04" subtitle="us-east-1, deployed 12 min ago" onOpenChange={setIsOpen} hasDivider />} content={<LayoutContent>
                <VStack gap={4}>
                  {REGIONS.map(region => <VStack gap={2} key={region}>
                      <Text type="label">{region}</Text>
                      <Text type="body">
                        Healthy - all instances passing readiness checks.
                      </Text>
                    </VStack>)}
                </VStack>
              </LayoutContent>} footer={<LayoutFooter hasDivider>
                <HStack gap={2} hAlign="end">
                  <Button label="Cancel" variant="secondary" onClick={() => setIsOpen(false)} />
                  <Button label="Redeploy" variant="primary" onClick={() => setIsOpen(false)} />
                </HStack>
              </LayoutFooter>} />
        </Drawer>
      </>;
  }
}`,...J.parameters?.docs?.source},description:{story:`A Layout as the drawer's child, exactly as inside a Dialog: the Layout
escapes the content area's container padding and redistributes it to its
regions, so the DrawerHeader slot, the scrolling LayoutContent, and the
pinned LayoutFooter share one content line and full-bleed dividers.`,...J.parameters?.docs?.description}}},Y.parameters={...Y.parameters,docs:{...Y.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return <>
        <Button label="Open padded drawer" onClick={() => setIsOpen(true)} />
        <Drawer isOpen={isOpen} onOpenChange={setIsOpen} label="Run summary" width={400} padding={6}>
          <VStack gap={4}>
            <Heading level={2}>Run summary</Heading>
            <Text type="body">
              Plain children sit inside the drawer&apos;s own padding - no
              Section wrapper needed.
            </Text>
            <Divider isFullBleed />
            <Text type="body">
              The divider above opts into bleed (isFullBleed): it compensates
              against the published inset and reaches both panel edges.
            </Text>
            <Button label="Close" onClick={() => setIsOpen(false)} />
          </VStack>
        </Drawer>
      </>;
  }
}`,...Y.parameters?.docs?.source},description:{story:"The `padding` prop insets plain content on the spacing scale, like Dialog.\nWithout it the inset is `--spacing-4` (16px); this story sets 6 (24px), and\n`padding={0}` gives a full-bleed content area. The inset is published as\ncontainer geometry: the Divider is a bleed child and stretches edge to edge\nthrough it, and a Section child would escape it the same way.",...Y.parameters?.docs?.description}}},Z.parameters={...Z.parameters,docs:{...Z.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return <Theme theme={paddedDrawerTheme}>
        <Button label="Open themed drawer" onClick={() => setIsOpen(true)} />
        <Drawer isOpen={isOpen} onOpenChange={setIsOpen} label="Run summary" width={400}>
          <VStack gap={4}>
            <Heading level={2}>Run summary</Heading>
            <Text type="body">
              The theme sets drawer padding to 24px; this text is inset by it.
            </Text>
            <Button label="Close" onClick={() => setIsOpen(false)} />
          </VStack>
        </Drawer>
      </Theme>;
  }
}`,...Z.parameters?.docs?.source},description:{story:"A theme's `padding` on `drawer` reaches the content area through the\n`--astryx-drawer-padding` container tokens (the drawer itself gets no\npadding prop here). A lone Section child would escape the themed inset and\napply its own padding, exactly as it would inside a Dialog.",...Z.parameters?.docs?.description}}},Q=[`Showcase`,`RowInspector`,`StackedDrawers`,`Sides`,`SelfDirectedRtlStart`,`SelfDirectedRtlEnd`,`NestedLtrOverride`,`Widths`,`MobileWidth`,`FloatsOverContent`,`Scrim`,`UnmountWhileOpen`,`Purpose`,`LayoutComposition`,`ContainerPadding`,`ThemedPadding`]})))()}$();export{Y as ContainerPadding,W as FloatsOverContent,J as LayoutComposition,U as MobileWidth,V as NestedLtrOverride,q as Purpose,I as RowInspector,G as Scrim,B as SelfDirectedRtlEnd,z as SelfDirectedRtlStart,F as Showcase,R as Sides,L as StackedDrawers,Z as ThemedPadding,K as UnmountWhileOpen,H as Widths,Q as __namedExportsOrder,N as default};