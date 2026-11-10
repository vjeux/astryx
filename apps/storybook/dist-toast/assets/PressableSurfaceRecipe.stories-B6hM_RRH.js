import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{t}from"./react-DlPsW1c0.js";import{n,t as r}from"./stylex-BSlGVhGe.js";import{t as i}from"./jsx-runtime-MKhVqBIO.js";import{a,i as o}from"./focusOutline.stylex-DWroqGen.js";import{i as s,n as c,r as l,t as u}from"./usePressFeedback-KAUIHUDJ.js";import{l as d,o as f}from"./useClickableContainer-Ci91y5XB.js";import{n as p,t as m}from"./Text-C5BHw0wv.js";import{n as h,t as g}from"./VisuallyHidden-dGudRqPh.js";import{n as _,t as v}from"./VStack-SWtDePqc.js";function y({label:e,href:t,onPress:r,children:i}){let a=(0,b.useRef)(null),l=(0,b.useRef)(null),u=c(),{onClick:f,onMouseUp:p,onPointerDown:m}=d({containerRef:a,interactiveRef:l,href:t,onClick:r});return(0,x.jsxs)(`div`,{ref:a,...u,onClick:f,onMouseUp:p,onPointerDown:m,...n(C.surface,s.backgroundColor,o.focusWithin),children:[(0,x.jsx)(g,{children:t==null?(0,x.jsx)(`button`,{ref:e=>{l.current=e},type:`button`,onClick:r,children:e}):(0,x.jsx)(`a`,{ref:e=>{l.current=e},href:t,children:e})}),i]})}var b,x,S,C,w,T,E;function D(){return(D=e((()=>{b=t(),r(),f(),u(),a(),l(),h(),p(),_(),x=i(),S={title:`Core/Hooks/useClickableContainer`,parameters:{layout:`padded`,docs:{description:{component:"A pressable surface without Card chrome: `useClickableContainer` for the press rules, `usePressFeedback` with `interactionOverlayStyles.backgroundColor` for the hover tint and touch press, a visually hidden `<button>` (or `<a>` for a destination) as the named control, and `focusOutlineStyles.focusWithin` for the shared focus ring, the one ClickableCard draws. Use it when a surface owns its own box; use ClickableCard when the surface is a card."}}}},C={surface:{k1xSpc:`x1lliihq`,kkrTdU:`x1ypdohk`,kaIpWk:`xh6dtrn`,kGJrpR:`x14ydlgx`,kVhnKS:`x1t7ytsu`,k2ei4v:`xgbv0en`,k8WAf4:`xce4md1`,kg3NbH:`xrrkdod`,$$css:!0}},w={name:`Pressable surface without Card chrome`,render:function(){let[e,t]=(0,b.useState)(0);return(0,x.jsxs)(v,{gap:3,children:[(0,x.jsx)(y,{label:`Jump to the quoted message`,onPress:()=>t(e=>e+1),children:(0,x.jsxs)(v,{gap:1,children:[(0,x.jsx)(m,{type:`supporting`,color:`secondary`,children:`Replying to Alex`}),(0,x.jsxs)(m,{type:`body`,children:[`Can we move the review to Thursday? The`,` `,(0,x.jsx)(`a`,{href:`#agenda`,children:`agenda`}),` is in the doc.`]})]})}),(0,x.jsx)(m,{type:`supporting`,color:`secondary`,children:e===0?`Not jumped yet`:`Jumped ${e}×`})]})}},T={name:`Pressable surface without Card chrome (link)`,render:()=>(0,x.jsx)(y,{label:`Open the quoted message`,href:`#message-42`,children:(0,x.jsxs)(v,{gap:1,children:[(0,x.jsx)(m,{type:`supporting`,color:`secondary`,children:`Replying to Alex`}),(0,x.jsx)(m,{type:`body`,children:`Can we move the review to Thursday?`})]})})},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  name: 'Pressable surface without Card chrome',
  render: function PressableSurfaceStory() {
    const [jumps, setJumps] = useState(0);
    return <VStack gap={3}>
        <PressableQuote label="Jump to the quoted message" onPress={() => setJumps(count => count + 1)}>
          <VStack gap={1}>
            <Text type="supporting" color="secondary">
              Replying to Alex
            </Text>
            <Text type="body">
              Can we move the review to Thursday? The{' '}
              <a href="#agenda">agenda</a> is in the doc.
            </Text>
          </VStack>
        </PressableQuote>
        <Text type="supporting" color="secondary">
          {jumps === 0 ? 'Not jumped yet' : \`Jumped \${jumps}×\`}
        </Text>
      </VStack>;
  }
}`,...w.parameters?.docs?.source}}},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  name: 'Pressable surface without Card chrome (link)',
  render: () => <PressableQuote label="Open the quoted message" href="#message-42">
      <VStack gap={1}>
        <Text type="supporting" color="secondary">
          Replying to Alex
        </Text>
        <Text type="body">Can we move the review to Thursday?</Text>
      </VStack>
    </PressableQuote>
}`,...T.parameters?.docs?.source}}},E=[`PressableSurface`,`PressableSurfaceLink`]})))()}D();export{w as PressableSurface,T as PressableSurfaceLink,E as __namedExportsOrder,S as default};