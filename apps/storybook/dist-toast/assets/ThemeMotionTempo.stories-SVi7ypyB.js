import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{t}from"./react-DlPsW1c0.js";import{t as n}from"./jsx-runtime-MKhVqBIO.js";import{o as r,s as i}from"./useTheme-CUotWZgR.js";import{n as a,t as o}from"./useAnimatedLayout-pgfL2aMP.js";import{n as s,t as c}from"./Collapsible-twVulli-.js";import{n as l,t as u}from"./ScrollableArea-oHV1-XbU.js";import{n as d,t as f}from"./Slider-CV0XyS9F.js";import{n as p,t as m}from"./Switch-C8kZJ1p7.js";import{i as h,n as g,r as _,t as v}from"./SegmentedControlItem-DNDQsMdT.js";import{c as y,o as b}from"./iframe-B7UFaprG.js";function x({label:e}){let t=(0,C.useRef)(null),n=a({containerRef:t});return(0,w.jsxs)(u,{ref:t,height:180,label:e,children:[(0,w.jsxs)(c,{trigger:`Shipping details`,defaultIsOpen:!1,animatedLayout:n,children:[(0,w.jsx)(`p`,{style:{margin:`4px 0`},children:`Ships in 2 business days.`}),(0,w.jsx)(`p`,{style:{margin:`4px 0`},children:`Free returns for 30 days.`})]}),(0,w.jsx)(`p`,{"data-after-collapsible":!0,style:{margin:`8px 0 0`},children:`The content after it glides on the theme's tempo.`})]})}function S({index:e}){let t=E[e],[n,r]=(0,C.useState)(!1),[i,a]=(0,C.useState)(40),[o,s]=(0,C.useState)(`day`);return(0,w.jsxs)(`section`,{"data-tempo":t,style:{margin:`0 0 20px`,maxWidth:420},children:[(0,w.jsx)(`div`,{style:A,children:O[t]}),(0,w.jsx)(b,{theme:D[e],mode:`light`,children:(0,w.jsxs)(`div`,{style:k,children:[(0,w.jsx)(m,{label:`Wi-Fi`,value:n,onChange:r}),(0,w.jsx)(f,{label:`Volume`,value:i,onChange:a}),(0,w.jsxs)(_,{value:o,onChange:s,label:`Range`,children:[(0,w.jsx)(v,{value:`day`,label:`Day`}),(0,w.jsx)(v,{value:`week`,label:`Week`}),(0,w.jsx)(v,{value:`month`,label:`Month`})]}),(0,w.jsx)(x,{label:`Details at tempo ${t}`})]})})]})}var C,w,T,E,D,O,k,A,j,M,N,P;function F(){return(F=e((()=>{C=t(),s(),o(),l(),h(),g(),d(),p(),y(),i(),w=n(),T={title:`Core/Theme motion tempo`,parameters:{layout:`padded`}},E=[.75,1,1.5],D=E.map(e=>r({name:`motion-tempo-${String(e).replace(`.`,`-`)}`,motion:{tempo:e}})),O={.75:`Tempo 0.75, the quickest`,1:`Tempo 1, Astryx's own`,1.5:`Tempo 1.5, the slowest`},k={display:`grid`,gap:16,padding:12,borderRadius:12,border:`1px solid var(--color-border)`,background:`var(--color-background-surface)`,color:`var(--color-text-primary)`,fontFamily:`var(--font-family-body)`,fontSize:14},A={margin:`0 0 6px`,fontSize:12,fontWeight:600,color:`var(--color-text-secondary)`,fontFamily:`var(--font-family-body)`},j={name:`Three tempos`,render:()=>(0,w.jsx)(`div`,{children:E.map((e,t)=>(0,w.jsx)(S,{index:t},e))})},M=r({name:`motion-duration-scale`,motion:{fast:130,medium:310,ratio:.75}}),N={name:`A duration scale nested in a tempo`,render:()=>(0,w.jsxs)(`div`,{style:{maxWidth:420},children:[(0,w.jsxs)(`section`,{"data-row":`plain`,style:{margin:`0 0 20px`},children:[(0,w.jsx)(`div`,{style:A,children:`No theme tempo`}),(0,w.jsx)(`div`,{style:k,children:(0,w.jsx)(x,{label:`Details with no theme tempo`})})]}),(0,w.jsxs)(b,{theme:D[E.indexOf(1.5)],mode:`light`,children:[(0,w.jsxs)(`section`,{"data-row":`outer`,style:{margin:`0 0 20px`},children:[(0,w.jsx)(`div`,{style:A,children:`Tempo 1.5`}),(0,w.jsx)(`div`,{style:k,children:(0,w.jsx)(x,{label:`Details at tempo 1.5`})})]}),(0,w.jsx)(b,{theme:M,mode:`light`,children:(0,w.jsxs)(`section`,{"data-row":`nested`,style:{margin:`0 0 20px`},children:[(0,w.jsx)(`div`,{style:A,children:`A duration scale inside tempo 1.5`}),(0,w.jsx)(`div`,{style:k,children:(0,w.jsx)(x,{label:`Details in a duration scale`})})]})})]})]})},j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
  name: 'Three tempos',
  render: () => <div>
      {TEMPOS.map((tempo, index) => <Row key={tempo} index={index} />)}
    </div>
}`,...j.parameters?.docs?.source},description:{story:`The same controls under three themes that set only \`motion.tempo\`. On a
touch screen, try each row: toggle the switch, drag the slider, slide the
segments and open the details. Every spring and the glide take the tempo
times their own time.`,...j.parameters?.docs?.description}}},N.parameters={...N.parameters,docs:{...N.parameters?.docs,source:{originalSource:`{
  name: 'A duration scale nested in a tempo',
  render: () => <div style={{
    maxWidth: 420
  }}>
      <section data-row="plain" style={{
      margin: '0 0 20px'
    }}>
        <div style={title}>No theme tempo</div>
        <div style={card}>
          <Details label="Details with no theme tempo" />
        </div>
      </section>
      <Theme theme={THEMES[TEMPOS.indexOf(1.5)]} mode="light">
        <section data-row="outer" style={{
        margin: '0 0 20px'
      }}>
          <div style={title}>Tempo 1.5</div>
          <div style={card}>
            <Details label="Details at tempo 1.5" />
          </div>
        </section>
        <Theme theme={durationScaleTheme} mode="light">
          <section data-row="nested" style={{
          margin: '0 0 20px'
        }}>
            <div style={title}>A duration scale inside tempo 1.5</div>
            <div style={card}>
              <Details label="Details in a duration scale" />
            </div>
          </section>
        </Theme>
      </Theme>
    </div>
}`,...N.parameters?.docs?.source},description:{story:`A theme with only a duration scale, nested in a theme at tempo 1.5. Its
glide plays its own scale's \`--duration-medium\`, which the outer tempo
does not reach.`,...N.parameters?.docs?.description}}},P=[`ThreeTempos`,`NestedDurationScale`]})))()}F();export{N as NestedDurationScale,j as ThreeTempos,P as __namedExportsOrder,T as default};