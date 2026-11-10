import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{n as t,t as n}from"./stylex-BSlGVhGe.js";import{t as r}from"./jsx-runtime-MKhVqBIO.js";import{o as i,s as a}from"./useTheme-CUotWZgR.js";import{n as o,t as s}from"./Spinner-D_2CFi41.js";import{n as c,t as l}from"./Text-C5BHw0wv.js";import{n as u,t as d}from"./HStack-D5idGciI.js";import{n as f,t as p}from"./VStack-SWtDePqc.js";import{c as m,o as h}from"./iframe-B7UFaprG.js";function g({size:e=`medium`,label:n=`Loading`}){return(0,_.jsx)(`span`,{role:`img`,"aria-label":n,...t(M.indicator,M[e]),children:Array.from({length:8},(n,r)=>(0,_.jsx)(`span`,{...t(M.spoke,e===`large`?M.spokeLarge:M.spokeMedium,M.spokeAt(r))},r))})}var _,v,y,b,x,S,C,w,T,E,D,O,k,A,j,M,N,P;function F(){return(F=e((()=>{n(),o(),c(),u(),f(),m(),a(),_=r(),v={title:`Core/Spinner`,component:s,tags:[`autodocs`],argTypes:{size:{control:`select`,options:[`sm`,`md`,`lg`,`xl`],description:`Spinner size`},shade:{control:`select`,options:[`default`,`onMedia`,`subtle`,`inherit`],description:`Color shade`}}},y=e=>({display:`flex`,alignItems:`center`,gap:8,width:e,border:`1px dashed #b0b0b0`,padding:4}),b={args:{size:`md`,shade:`default`}},x={render:()=>(0,_.jsxs)(d,{gap:4,vAlign:`center`,children:[(0,_.jsx)(s,{size:`sm`}),(0,_.jsx)(s,{size:`md`}),(0,_.jsx)(s,{size:`lg`}),(0,_.jsx)(s,{size:`xl`})]})},S={render:()=>(0,_.jsxs)(d,{gap:4,vAlign:`center`,children:[(0,_.jsx)(s,{shade:`default`}),(0,_.jsx)(`div`,{style:{backgroundColor:`#1a1a2e`,padding:16,borderRadius:8},children:(0,_.jsx)(s,{shade:`onMedia`})})]})},C={render:()=>(0,_.jsxs)(d,{gap:8,vAlign:`start`,children:[(0,_.jsx)(s,{size:`lg`,label:`Loading...`}),(0,_.jsx)(s,{size:`lg`,label:(0,_.jsxs)(p,{gap:0,hAlign:`center`,children:[(0,_.jsx)(l,{type:`body`,weight:`bold`,children:`Fetching data`}),(0,_.jsx)(l,{type:`supporting`,color:`secondary`,children:`This may take a moment`})]}),"aria-label":`Fetching data`})]})},w=i({name:`spinner-themed-geometry`,components:{spinner:{"size:sm":{"--spinner-diameter":`1rem`,"--spinner-stroke-width":`0.125rem`},"size:md":{"--spinner-diameter":`1.5rem`,"--spinner-stroke-width":`0.25rem`},"size:lg":{"--spinner-diameter":`2rem`,"--spinner-stroke-width":`0.3125rem`},"size:xl":{"--spinner-diameter":`calc(2rem + 8px)`,"--spinner-stroke-width":`0.375rem`}}}}),T={name:`Themed Geometry (per size)`,render:()=>(0,_.jsxs)(p,{gap:2,children:[(0,_.jsx)(l,{type:`supporting`,color:`secondary`,children:`Themed — rem and calc() diameters; the box tracks the ring`}),(0,_.jsx)(h,{theme:w,mode:`light`,children:(0,_.jsxs)(d,{gap:4,vAlign:`center`,children:[(0,_.jsx)(s,{size:`sm`}),(0,_.jsx)(s,{size:`md`}),(0,_.jsx)(s,{size:`lg`}),(0,_.jsx)(s,{size:`xl`})]})})]})},E=i({name:`spinner-themed-hairline`,components:{spinner:{"size:xl":{"--spinner-stroke-width":`1px`},base:{"--spinner-track-color":`transparent`}}}}),D=i({name:`spinner-themed-color`,components:{spinner:{base:{"--spinner-color":`var(--color-text-blue)`,"--spinner-track-color":`var(--color-background-blue)`},"shade:subtle":{"--spinner-track-color":`transparent`}}}}),O={name:`Themed Color (per shade)`,render:()=>(0,_.jsxs)(p,{gap:2,children:[(0,_.jsx)(l,{type:`supporting`,color:`secondary`,children:"Themed — blue arc and wash; the subtle shade drops its track (the `Shades` story above is the untinted reference — see the note on `ThemedGeometry` for why it cannot sit in this story)"}),(0,_.jsx)(h,{theme:D,mode:`light`,children:(0,_.jsxs)(d,{gap:4,vAlign:`center`,children:[(0,_.jsx)(s,{size:`xl`}),(0,_.jsx)(s,{size:`xl`,shade:`subtle`})]})})]})},k={name:`Themed Hairline Stroke`,render:()=>(0,_.jsxs)(p,{gap:2,children:[(0,_.jsx)(l,{type:`supporting`,color:`secondary`,children:`Themed — a 1px hairline stroke over a transparent track`}),(0,_.jsx)(h,{theme:E,mode:`light`,children:(0,_.jsx)(s,{size:`xl`})})]})},A={render:()=>(0,_.jsxs)(p,{gap:4,hAlign:`start`,children:[(0,_.jsxs)(p,{gap:1,hAlign:`start`,children:[(0,_.jsx)(l,{type:`supporting`,color:`secondary`,children:`Label beside it, in a 140px row`}),(0,_.jsxs)(`div`,{style:y(140),children:[(0,_.jsx)(s,{size:`md`}),(0,_.jsx)(l,{type:`body`,children:`Uploading attachments…`})]})]}),(0,_.jsxs)(p,{gap:1,hAlign:`start`,children:[(0,_.jsx)(l,{type:`supporting`,color:`secondary`,children:`Beside a sibling that keeps its width (flex: 1 0 100px)`}),(0,_.jsxs)(`div`,{style:y(120),children:[(0,_.jsx)(s,{size:`lg`}),(0,_.jsx)(`div`,{style:{flex:`1 0 100px`,height:8,background:`#e0e0e0`}})]})]}),(0,_.jsxs)(p,{gap:1,hAlign:`start`,children:[(0,_.jsx)(l,{type:`supporting`,color:`secondary`,children:`Host narrower than the spinner outright (16px)`}),(0,_.jsx)(`div`,{style:y(16),children:(0,_.jsx)(s,{size:`xl`})})]})]})},j={k3aq6I:`xsqj5wx`,kKxzle:`xvo38ju`,$$css:!0},M={indicator:{kVAEAm:`x1n2onr6`,k1xSpc:`x1rg5ohu`,kmuXW:`x2lah0s`,$$css:!0},medium:{kzqmXN:`xw4jnvo`,kZKoxP:`x1qx5ct2`,$$css:!0},large:{kzqmXN:`x1sw5npo`,kZKoxP:`xrtz9ly`,$$css:!0},spoke:{kVAEAm:`x10l6tqk`,k87sOh:`x13vifvy`,kaIpWk:`x10hpsqq`,krdFHd:null,kfmiAY:null,kVL7Gh:null,kT0f0o:null,kIxVMA:null,ksF3WI:null,kqGeR4:null,kYm2EN:null,kWkggS:`x1ukqqeq xwvh9j7`,kAXs8y:`x1g12otp`,kKVMdj:`x10dwuc`,k44tkh:`xemfg65`,kyAemX:`x1esw782`,ko0y90:`xa4qsjk`,$$css:!0},spokeMedium:{kbCHJM:`xcet709`,kLqNvP:null,kt4wiu:null,kzqmXN:`xlotzeb`,kZKoxP:`xd98ca3`,k3nNDw:`xs3p67m`,$$css:!0},spokeLarge:{kbCHJM:`xc1hvs2`,kLqNvP:null,kt4wiu:null,kzqmXN:`x1ftt334`,kZKoxP:`x1kpxq89`,k3nNDw:`xhu4v58`,$$css:!0},spokeAt:e=>[j,{"--x-transform":`rotate(${e*45}deg)`==null?void 0:`rotate(${e*45}deg)`,"--x-animationDelay":(e=>typeof e==`number`?e+`ms`:e??void 0)(`${((e-6)%8+8)%8*100-800}ms`)}]},N={name:`iOS-style activity indicator (composed)`,render:()=>(0,_.jsxs)(d,{gap:6,vAlign:`center`,children:[(0,_.jsx)(g,{}),(0,_.jsx)(g,{size:`large`})]})},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  args: {
    size: 'md',
    shade: 'default'
  }
}`,...b.parameters?.docs?.source}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  render: () => <HStack gap={4} vAlign="center">
      <Spinner size="sm" />
      <Spinner size="md" />
      <Spinner size="lg" />
      <Spinner size="xl" />
    </HStack>
}`,...x.parameters?.docs?.source}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  render: () => <HStack gap={4} vAlign="center">
      <Spinner shade="default" />
      <div style={{
      backgroundColor: '#1a1a2e',
      padding: 16,
      borderRadius: 8
    }}>
        <Spinner shade="onMedia" />
      </div>
    </HStack>
}`,...S.parameters?.docs?.source}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  render: () => <HStack gap={8} vAlign="start">
      <Spinner size="lg" label="Loading..." />
      <Spinner size="lg" label={<VStack gap={0} hAlign="center">
            <Text type="body" weight="bold">
              Fetching data
            </Text>
            <Text type="supporting" color="secondary">
              This may take a moment
            </Text>
          </VStack>} aria-label="Fetching data" />
    </HStack>
}`,...C.parameters?.docs?.source}}},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  name: 'Themed Geometry (per size)',
  render: () => <VStack gap={2}>
      <Text type="supporting" color="secondary">
        Themed — rem and calc() diameters; the box tracks the ring
      </Text>
      <Theme theme={themedGeometry} mode="light">
        <HStack gap={4} vAlign="center">
          <Spinner size="sm" />
          <Spinner size="md" />
          <Spinner size="lg" />
          <Spinner size="xl" />
        </HStack>
      </Theme>
    </VStack>
}`,...T.parameters?.docs?.source}}},O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
  name: 'Themed Color (per shade)',
  render: () => <VStack gap={2}>
      <Text type="supporting" color="secondary">
        Themed — blue arc and wash; the subtle shade drops its track (the
        \`Shades\` story above is the untinted reference — see the note on
        \`ThemedGeometry\` for why it cannot sit in this story)
      </Text>
      <Theme theme={themedColor} mode="light">
        <HStack gap={4} vAlign="center">
          <Spinner size="xl" />
          <Spinner size="xl" shade="subtle" />
        </HStack>
      </Theme>
    </VStack>
}`,...O.parameters?.docs?.source}}},k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
  name: 'Themed Hairline Stroke',
  render: () => <VStack gap={2}>
      <Text type="supporting" color="secondary">
        Themed — a 1px hairline stroke over a transparent track
      </Text>
      <Theme theme={themedHairline} mode="light">
        <Spinner size="xl" />
      </Theme>
    </VStack>
}`,...k.parameters?.docs?.source}}},A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`{
  render: () => <VStack gap={4} hAlign="start">
      <VStack gap={1} hAlign="start">
        <Text type="supporting" color="secondary">
          Label beside it, in a 140px row
        </Text>
        <div style={narrowHost(140)}>
          <Spinner size="md" />
          <Text type="body">Uploading attachments…</Text>
        </div>
      </VStack>

      <VStack gap={1} hAlign="start">
        <Text type="supporting" color="secondary">
          Beside a sibling that keeps its width (flex: 1 0 100px)
        </Text>
        <div style={narrowHost(120)}>
          <Spinner size="lg" />
          <div style={{
          flex: '1 0 100px',
          height: 8,
          background: '#e0e0e0'
        }} />
        </div>
      </VStack>

      <VStack gap={1} hAlign="start">
        <Text type="supporting" color="secondary">
          Host narrower than the spinner outright (16px)
        </Text>
        <div style={narrowHost(16)}>
          <Spinner size="xl" />
        </div>
      </VStack>
    </VStack>
}`,...A.parameters?.docs?.source},description:{story:`A flex host narrower than the spinner in it. The box keeps the ring's size
and overflows the host visibly; before the fix the host compressed the box
and the ring was cut off at its edge, silently — a sliced ring still spins,
so nothing reported a problem. The dashed rule is the host, drawn so the
overflow is legible.

All three are ordinary layouts rather than contrived ones: a label beside a
spinner in a narrow row, a spinner next to a sibling that will not give up
its width, and a host smaller than the spinner outright.`,...A.parameters?.docs?.description}}},N.parameters={...N.parameters,docs:{...N.parameters?.docs,source:{originalSource:`{
  name: 'iOS-style activity indicator (composed)',
  render: () => <HStack gap={6} vAlign="center">
      <ActivityIndicator />
      <ActivityIndicator size="large" />
    </HStack>
}`,...N.parameters?.docs?.source},description:{story:"The iOS look, composed from existing APIs: copy `ActivityIndicator` from\n`apps/storybook/stories/Spinner.stories.tsx` into an app that wants it (the\ncode panel shows only this story's render).",...N.parameters?.docs?.description}}},P=[`Default`,`Sizes`,`Shades`,`WithLabel`,`ThemedGeometry`,`ThemedColor`,`ThemedHairlineStroke`,`NarrowFlexHost`,`IOSStyleActivityIndicator`]})))()}F();export{b as Default,N as IOSStyleActivityIndicator,A as NarrowFlexHost,S as Shades,x as Sizes,O as ThemedColor,T as ThemedGeometry,k as ThemedHairlineStroke,C as WithLabel,P as __namedExportsOrder,v as default};