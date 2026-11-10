import{a as e,n as t}from"./rolldown-runtime-sJBDdmOt.js";import{t as n}from"./react-DlPsW1c0.js";import{t as r}from"./jsx-runtime-MKhVqBIO.js";import{n as i,o as a,r as o,s}from"./useTheme-CUotWZgR.js";import{n as c,t as l}from"./Button-DoGM0DEN.js";import{n as u,t as d}from"./Heading-YiIeUtHm.js";import{n as f,t as p}from"./Badge-DqOhTiyH.js";import{n as m,t as h}from"./Card-DA0ZfoAz.js";import{n as g,t as _}from"./Stack-C-3OCHCS.js";import{n as v,t as y}from"./ListItem-C2dBt6xL.js";import{n as b,t as x}from"./List-Bq_ZN_6g.js";import{n as S,t as C}from"./neutralTheme-BXK-s1F0.js";import{c as w,o as T}from"./iframe-B7UFaprG.js";function E({data:e,width:t=400,height:n=200}){let{token:r}=o(),i=Math.max(...e.map(e=>e.value)),a=(t-60)/e.length-8,s=n-40;return(0,A.jsxs)(`svg`,{width:t,height:n,role:`img`,"aria-label":`Bar chart`,children:[[.25,.5,.75,1].map(e=>{let n=s-s*e+20;return(0,A.jsxs)(`g`,{children:[(0,A.jsx)(`line`,{x1:50,y1:n,x2:t-10,y2:n,stroke:r(`--color-border`),strokeDasharray:`4 4`}),(0,A.jsx)(`text`,{x:45,y:n+4,textAnchor:`end`,fontSize:10,fill:r(`--color-text-secondary`),children:Math.round(i*e)})]},e)}),e.map((e,t)=>{let o=e.value/i*s,c=55+t*(a+8),l=s-o+20;return(0,A.jsxs)(`g`,{children:[(0,A.jsx)(`rect`,{x:c,y:l,width:a,height:o,rx:3,fill:r(`--color-accent`)}),(0,A.jsx)(`text`,{x:c+a/2,y:n-5,textAnchor:`middle`,fontSize:11,fill:r(`--color-text-secondary`),children:e.label})]},e.label)})]})}function D({data:e,width:t=480,height:n=220}){let{token:r}=o(),i=[r(`--color-accent`),r(`--color-success`),r(`--color-warning`)],a=[`Revenue`,`Users`,`Sessions`],s=Math.max(...e.flatMap(e=>e.series)),c=(t-80)/e.length,l=(c-16)/3,u=n-50;return(0,A.jsxs)(`div`,{children:[(0,A.jsxs)(`svg`,{width:t,height:n,role:`img`,"aria-label":`Grouped bar chart`,children:[[.25,.5,.75,1].map(e=>{let n=u-u*e+20;return(0,A.jsx)(`line`,{x1:55,y1:n,x2:t-10,y2:n,stroke:r(`--color-border`),strokeDasharray:`4 4`},e)}),e.map((e,t)=>{let a=60+t*c;return(0,A.jsxs)(`g`,{children:[e.series.map((e,t)=>{let n=e/s*u,r=a+t*(l+2),o=u-n+20;return(0,A.jsx)(`rect`,{x:r,y:o,width:l,height:n,rx:2,fill:i[t],opacity:.85},t)}),(0,A.jsx)(`text`,{x:a+(c-16)/2,y:n-26,textAnchor:`middle`,fontSize:11,fill:r(`--color-text-secondary`),children:e.label})]},e.label)})]}),(0,A.jsx)(`div`,{style:{display:`flex`,gap:16,paddingLeft:55},children:a.map((e,t)=>(0,A.jsxs)(`div`,{style:{display:`flex`,alignItems:`center`,gap:6},children:[(0,A.jsx)(`div`,{style:{width:10,height:10,borderRadius:2,backgroundColor:i[t],opacity:.85}}),(0,A.jsx)(`span`,{style:{fontSize:11,color:r(`--color-text-secondary`)},children:e})]},e))})]})}function O(){let{token:e,mode:t,name:n}=o();return(0,A.jsx)(h,{children:(0,A.jsxs)(_,{direction:`vertical`,gap:2,children:[(0,A.jsxs)(_,{direction:`horizontal`,gap:2,vAlign:`center`,children:[(0,A.jsx)(d,{level:4,children:`Token Inspector`}),(0,A.jsx)(p,{label:n}),(0,A.jsx)(p,{variant:t===`dark`?`neutral`:`info`,label:t})]}),(0,A.jsx)(`div`,{style:{display:`grid`,gridTemplateColumns:`1fr auto`,gap:`4px 16px`,fontFamily:`monospace`,fontSize:12},children:[`--color-accent`,`--color-success`,`--color-warning`,`--color-error`,`--color-text-primary`,`--color-text-secondary`,`--color-background-surface`,`--color-border`,`--spacing-4`,`--radius-element`].map(t=>(0,A.jsxs)(k.Fragment,{children:[(0,A.jsx)(`span`,{style:{color:e(`--color-text-secondary`)},children:t}),(0,A.jsxs)(`span`,{style:{display:`flex`,alignItems:`center`,gap:6},children:[t.startsWith(`--color-`)&&(0,A.jsx)(`span`,{style:{display:`inline-block`,width:14,height:14,borderRadius:3,backgroundColor:e(t),border:`1px solid ${e(`--color-border-emphasized`)}`}}),(0,A.jsx)(`code`,{children:e(t)})]})]},t))})]})})}var k,A,j,M,N,P,F,I,L,R,z,B,V,H,U;function W(){return(W=t((()=>{k=e(n()),w(),s(),i(),m(),g(),u(),f(),c(),b(),v(),C(),A=r(),j=[{label:`Mon`,value:42},{label:`Tue`,value:78},{label:`Wed`,value:56},{label:`Thu`,value:91},{label:`Fri`,value:64},{label:`Sat`,value:35},{label:`Sun`,value:48}],M=[{label:`Q1`,series:[120,90,70]},{label:`Q2`,series:[140,110,85]},{label:`Q3`,series:[100,130,95]},{label:`Q4`,series:[160,105,120]}],N=a({name:`ocean`,tokens:{"--color-accent":[`#0077B6`,`#48CAE4`],"--color-success":[`#2D6A4F`,`#52B788`],"--color-warning":[`#E76F51`,`#F4A261`],"--color-background-surface":[`#F0F8FF`,`#0A1628`],"--color-text-primary":[`#023E8A`,`#CAF0F8`],"--color-text-secondary":[`#4A7FB5`,`#89C2D9`],"--color-border":[`#ADE8F433`,`#02394A66`]},typography:{scale:{base:14,ratio:1.2}}}),P={title:`Core/Themes/Theme`,parameters:{docs:{description:{component:"`Theme` applies a theme to its children via CSS custom properties and provides programmatic token access through `useTheme()`.\n\n`useTheme()` returns resolved token values for the current color mode, designed for non-CSS consumers like data visualization libraries, canvas rendering, and SVG charts that need concrete values (hex colors, px values) rather than CSS custom property references.\n\n**No double render.** Values are available on first paint; no `getComputedStyle` or `useEffect` needed."}}}},F={render:()=>(0,A.jsx)(T,{theme:S,mode:`light`,children:(0,A.jsxs)(_,{direction:`vertical`,gap:4,children:[(0,A.jsx)(d,{level:3,children:`Weekly Activity`}),(0,A.jsx)(h,{children:(0,A.jsx)(E,{data:j})})]})})},I={render:()=>(0,A.jsx)(T,{theme:S,mode:`dark`,children:(0,A.jsxs)(_,{direction:`vertical`,gap:4,children:[(0,A.jsx)(d,{level:3,children:`Weekly Activity`}),(0,A.jsx)(h,{children:(0,A.jsx)(E,{data:j})})]})})},L={render:()=>(0,A.jsx)(T,{theme:S,mode:`light`,children:(0,A.jsxs)(_,{direction:`vertical`,gap:4,children:[(0,A.jsx)(d,{level:3,children:`Quarterly Metrics`}),(0,A.jsx)(h,{children:(0,A.jsx)(D,{data:M})})]})})},R={render:()=>(0,A.jsxs)(`div`,{style:{display:`grid`,gridTemplateColumns:`1fr 1fr`,gap:16},children:[(0,A.jsx)(T,{theme:S,mode:`light`,children:(0,A.jsxs)(_,{direction:`vertical`,gap:2,children:[(0,A.jsx)(d,{level:4,children:`Default Theme`}),(0,A.jsx)(h,{children:(0,A.jsx)(D,{data:M,width:360})})]})}),(0,A.jsx)(T,{theme:N,mode:`light`,children:(0,A.jsxs)(_,{direction:`vertical`,gap:2,children:[(0,A.jsx)(d,{level:4,children:`Ocean Theme`}),(0,A.jsx)(h,{children:(0,A.jsx)(D,{data:M,width:360})})]})})]})},z={name:`Token Inspector`,render:()=>(0,A.jsxs)(`div`,{style:{display:`grid`,gridTemplateColumns:`1fr 1fr`,gap:16},children:[(0,A.jsx)(T,{theme:S,mode:`light`,children:(0,A.jsx)(O,{})}),(0,A.jsx)(T,{theme:N,mode:`dark`,children:(0,A.jsx)(O,{})})]})},B=a({name:`themed-press`,components:{button:{base:{":active":{backgroundColor:`#7c3aed`,color:`#ffffff`}}},item:{base:{":active":{backgroundColor:`#ede9fe`}}}}}),V=Array.from({length:30},(e,t)=>`Row ${t+1}`),H={name:`Themed press`,render:()=>(0,A.jsx)(T,{theme:B,mode:`light`,children:(0,A.jsxs)(_,{direction:`vertical`,gap:3,children:[(0,A.jsx)(l,{label:`Themed button`,variant:`secondary`,onClick:()=>{}}),(0,A.jsx)(`div`,{style:{height:320,overflowY:`auto`},children:(0,A.jsx)(x,{"aria-label":`Themed rows`,children:V.map(e=>(0,A.jsx)(y,{label:e,onClick:()=>{}},e))})})]})})},F.parameters={...F.parameters,docs:{...F.parameters?.docs,source:{originalSource:`{
  render: () => <Theme theme={neutralTheme} mode="light">
      <Stack direction="vertical" gap={4}>
        <Heading level={3}>Weekly Activity</Heading>
        <Card>
          <ThemeAwareBarChart data={CHART_DATA} />
        </Card>
      </Stack>
    </Theme>
}`,...F.parameters?.docs?.source},description:{story:"A simple bar chart using `useTheme` to read token values.\nThe chart colors, text, and grid lines all come from the theme.",...F.parameters?.docs?.description}}},I.parameters={...I.parameters,docs:{...I.parameters?.docs,source:{originalSource:`{
  render: () => <Theme theme={neutralTheme} mode="dark">
      <Stack direction="vertical" gap={4}>
        <Heading level={3}>Weekly Activity</Heading>
        <Card>
          <ThemeAwareBarChart data={CHART_DATA} />
        </Card>
      </Stack>
    </Theme>
}`,...I.parameters?.docs?.source},description:{story:`The same chart in dark mode \\u2014 token values automatically resolve
to their dark variants.`,...I.parameters?.docs?.description}}},L.parameters={...L.parameters,docs:{...L.parameters?.docs,source:{originalSource:`{
  render: () => <Theme theme={neutralTheme} mode="light">
      <Stack direction="vertical" gap={4}>
        <Heading level={3}>Quarterly Metrics</Heading>
        <Card>
          <ThemeAwareGroupedChart data={MULTI_SERIES} />
        </Card>
      </Stack>
    </Theme>
}`,...L.parameters?.docs?.source},description:{story:`A grouped bar chart using multiple color tokens (accent, success, warning)
to differentiate data series.`,...L.parameters?.docs?.description}}},R.parameters={...R.parameters,docs:{...R.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 16
  }}>
      <Theme theme={neutralTheme} mode="light">
        <Stack direction="vertical" gap={2}>
          <Heading level={4}>Default Theme</Heading>
          <Card>
            <ThemeAwareGroupedChart data={MULTI_SERIES} width={360} />
          </Card>
        </Stack>
      </Theme>
      <Theme theme={oceanTheme} mode="light">
        <Stack direction="vertical" gap={2}>
          <Heading level={4}>Ocean Theme</Heading>
          <Card>
            <ThemeAwareGroupedChart data={MULTI_SERIES} width={360} />
          </Card>
        </Stack>
      </Theme>
    </div>
}`,...R.parameters?.docs?.source},description:{story:`Side-by-side comparison: same chart rendered with two different themes.
The ocean theme overrides accent, success, and warning colors.`,...R.parameters?.docs?.description}}},z.parameters={...z.parameters,docs:{...z.parameters?.docs,source:{originalSource:`{
  name: 'Token Inspector',
  render: () => <div style={{
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 16
  }}>
      <Theme theme={neutralTheme} mode="light">
        <TokenInspector />
      </Theme>
      <Theme theme={oceanTheme} mode="dark">
        <TokenInspector />
      </Theme>
    </div>
}`,...z.parameters?.docs?.source},description:{story:`Shows the raw resolved token values for both themes side by side.
Useful for debugging and understanding what values your charts receive.`,...z.parameters?.docs?.description}}},H.parameters={...H.parameters,docs:{...H.parameters?.docs,source:{originalSource:`{
  name: 'Themed press',
  render: () => <Theme theme={pressTheme} mode="light">
      <Stack direction="vertical" gap={3}>
        <Button label="Themed button" variant="secondary" onClick={() => {}} />
        <div style={{
        height: 320,
        overflowY: 'auto'
      }}>
          <List aria-label="Themed rows">
            {PRESS_ROWS.map(row => <ListItem key={row} label={row} onClick={() => {}} />)}
          </List>
        </div>
      </Stack>
    </Theme>
}`,...H.parameters?.docs?.source},description:{story:"A theme that overrides `:active` on Button and on list rows. With a mouse\nthe theme's press paints on `:active`. Under a finger it follows the touch\npress model: it paints once the press is believed, never on the touch\nitself or through a scroll.",...H.parameters?.docs?.description}}},U=[`BarChart`,`BarChartDark`,`GroupedChart`,`ThemeComparison`,`TokenInspectorStory`,`ThemedPress`]})))()}W();export{F as BarChart,I as BarChartDark,L as GroupedChart,R as ThemeComparison,H as ThemedPress,z as TokenInspectorStory,U as __namedExportsOrder,P as default};