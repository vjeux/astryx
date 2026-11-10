import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{t}from"./react-DlPsW1c0.js";import{t as n}from"./jsx-runtime-MKhVqBIO.js";import{n as r,t as i}from"./Text-C5BHw0wv.js";import{r as a,t as o}from"./BottomSheet-C2AuUW1O.js";import{n as s,t as c}from"./Card-DA0ZfoAz.js";import{n as l,t as u}from"./Dialog-ohVvtWtq.js";import{n as d,t as f}from"./Section-g5hpGOnN.js";import{n as p,t as m}from"./ListItem-C2dBt6xL.js";import{n as h,t as g}from"./List-Bq_ZN_6g.js";import{n as _,t as v}from"./Table-DReqd1jV.js";function y(){return(0,S.jsx)(v,{data:w,columns:T,idKey:`id`,dividers:`rows`,density:`compact`,textOverflow:`truncate`,"aria-label":`Orders`})}function b(){return(0,S.jsx)(g,{edge:`bleed`,hasDividers:!0,children:E.map(e=>(0,S.jsx)(m,{label:e,onClick:()=>{}},e))})}var x,S,C,w,T,E,D,O,k,A,j,M,N,P,F;function I(){return(I=e((()=>{x=t(),a(),s(),l(),h(),p(),d(),_(),r(),S=n(),C={title:`Core/ContainerCorners`,parameters:{layout:`padded`}},w=[{id:`1`,customer:`Alice Johnson`,item:`Standing desk`,quantity:`1`,warehouse:`Oakland`,carrier:`Ground`,status:`Shipped`,email:`alice.johnson@example.com`,tracking:`1Z999AA10123456784`},{id:`2`,customer:`Bob Martinez`,item:`Monitor arm`,quantity:`2`,warehouse:`Reno`,carrier:`Express`,status:`Packing`,email:`bob.martinez@example.com`,tracking:`1Z999AA10123456785`},{id:`3`,customer:`Chen Wei`,item:`Desk lamp`,quantity:`4`,warehouse:`Oakland`,carrier:`Ground`,status:`Delivered`,email:`chen.wei@example.com`,tracking:`1Z999AA10123456786`}],T=[{key:`customer`,header:`Customer`},{key:`item`,header:`Item`},{key:`quantity`,header:`Quantity`},{key:`warehouse`,header:`Warehouse`},{key:`carrier`,header:`Carrier`},{key:`status`,header:`Status`},{key:`email`,header:`Email`},{key:`tracking`,header:`Tracking number`}],E=[`Inbox`,`Drafts`,`Sent`,`Archive`],D={render:()=>(0,S.jsx)(`div`,{style:{width:360},children:(0,S.jsx)(c,{children:(0,S.jsx)(y,{})})})},O={render:()=>(0,S.jsx)(`div`,{style:{width:360},children:(0,S.jsxs)(c,{children:[(0,S.jsx)(i,{children:`Open orders`}),(0,S.jsx)(y,{})]})})},k={render:()=>(0,S.jsx)(`div`,{style:{width:360},children:(0,S.jsx)(c,{children:(0,S.jsx)(f,{children:(0,S.jsx)(y,{})})})})},A={render:()=>(0,S.jsx)(u,{isOpen:!0,isInline:!0,onOpenChange:()=>{},width:360,padding:0,children:(0,S.jsx)(b,{})})},j={render:()=>(0,S.jsxs)(u,{isOpen:!0,isInline:!0,onOpenChange:()=>{},width:360,padding:0,children:[(0,S.jsx)(i,{children:`Open orders`}),(0,S.jsx)(y,{}),(0,S.jsx)(i,{children:`Three open orders.`})]})},M={render:()=>(0,S.jsxs)(u,{isOpen:!0,isInline:!0,onOpenChange:()=>{},width:360,padding:0,children:[(0,S.jsx)(i,{children:`Folders`}),(0,S.jsx)(`div`,{children:(0,S.jsx)(b,{})})]})},N={render:()=>(0,S.jsx)(`div`,{style:{width:360},children:(0,S.jsx)(c,{children:(0,S.jsx)(b,{})})})},P={render:()=>{let[e,t]=(0,x.useState)(!0);return(0,S.jsxs)(o,{isOpen:e,onOpenChange:t,label:`Orders`,height:`hug`,children:[(0,S.jsx)(y,{}),(0,S.jsx)(i,{children:`Three open orders.`})]})}},D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    width: 360
  }}>
      <Card>
        <OrdersTable />
      </Card>
    </div>
}`,...D.parameters?.docs?.source},description:{story:`A table fills a Card and reaches all four of its corners.`,...D.parameters?.docs?.description}}},O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    width: 360
  }}>
      <Card>
        <Text>Open orders</Text>
        <OrdersTable />
      </Card>
    </div>
}`,...O.parameters?.docs?.source},description:{story:`Text sits above the table, so the card's top padding stays between the
table and the top corners: only the bottom corners are reached.`,...O.parameters?.docs?.description}}},k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    width: 360
  }}>
      <Card>
        <Section>
          <OrdersTable />
        </Section>
      </Card>
    </div>
}`,...k.parameters?.docs?.source},description:{story:`A Section is a square container: a table inside it reaches no corner.`,...k.parameters?.docs?.description}}},A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`{
  render: () => <Dialog isOpen isInline onOpenChange={() => {}} width={360} padding={0}>
      <BleedList />
    </Dialog>
}`,...A.parameters?.docs?.source},description:{story:`A Dialog with no padding: the bleeding list's first and last rows touch
the dialog's corners.`,...A.parameters?.docs?.description}}},j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
  render: () => <Dialog isOpen isInline onOpenChange={() => {}} width={360} padding={0}>
      <Text>Open orders</Text>
      <OrdersTable />
      <Text>Three open orders.</Text>
    </Dialog>
}`,...j.parameters?.docs?.source},description:{story:`A Dialog with no padding, with the table between two lines of text: the
table reaches no corner, so it stays square.`,...j.parameters?.docs?.description}}},M.parameters={...M.parameters,docs:{...M.parameters?.docs,source:{originalSource:`{
  render: () => <Dialog isOpen isInline onOpenChange={() => {}} width={360} padding={0}>
      <Text>Folders</Text>
      <div>
        <BleedList />
      </div>
    </Dialog>
}`,...M.parameters?.docs?.source},description:{story:`A Dialog with no padding, with the bleeding list inside a wrapper element
below a heading: the list is not the dialog's own child, so its rows stay
square.`,...M.parameters?.docs?.description}}},N.parameters={...N.parameters,docs:{...N.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    width: 360
  }}>
      <Card>
        <BleedList />
      </Card>
    </div>
}`,...N.parameters?.docs?.source},description:{story:`The card's block padding is larger than its corner radius, so the
bleeding list's rows stay square.`,...N.parameters?.docs?.description}}},P.parameters={...P.parameters,docs:{...P.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [isOpen, setIsOpen] = useState(true);
    return <BottomSheet isOpen={isOpen} onOpenChange={setIsOpen} label="Orders" height="hug">
        <OrdersTable />
        <Text>Three open orders.</Text>
      </BottomSheet>;
  }
}`,...P.parameters?.docs?.source},description:{story:`A table at the top of a bottom sheet starts below the grab bar's band, so it
reaches no corner and stays square.`,...P.parameters?.docs?.description}}},F=[`TableInCard`,`TableAfterTextInCard`,`TableInSectionInCard`,`BleedListInDialog`,`TableBetweenTextInDialog`,`WrappedBleedListInDialog`,`BleedListInCard`,`TableInBottomSheet`]})))()}I();export{N as BleedListInCard,A as BleedListInDialog,O as TableAfterTextInCard,j as TableBetweenTextInDialog,P as TableInBottomSheet,D as TableInCard,k as TableInSectionInCard,M as WrappedBleedListInDialog,F as __namedExportsOrder,C as default};