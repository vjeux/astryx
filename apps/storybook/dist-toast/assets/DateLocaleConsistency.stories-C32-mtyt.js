import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{t}from"./react-DlPsW1c0.js";import{t as n}from"./jsx-runtime-MKhVqBIO.js";import{n as r,t as i}from"./Text-C5BHw0wv.js";import{n as a,t as o}from"./Heading-YiIeUtHm.js";import{n as s,t as c}from"./Calendar-Bi5XoPBL.js";import{n as l,t as u}from"./DateInput-CHI86NkI.js";import{n as d,t as f}from"./Timestamp-Czd81oha.js";import{l as p,u as m}from"./iframe-B7UFaprG.js";function h({locale:e}){let[t,n]=(0,g.useState)(y);return(0,_.jsx)(p,{locale:e,children:(0,_.jsxs)(`section`,{"aria-label":`${e} date examples`,className:`x78zum5 xdt5ytf x18g69wz xeuugli`,children:[(0,_.jsx)(o,{level:2,children:e}),(0,_.jsx)(u,{label:`Selected date`,value:t,onChange:n,format:`date_long`,nativePicker:`never`}),(0,_.jsxs)(i,{children:[`Timestamp:`,` `,(0,_.jsx)(f,{value:`2026-08-22T12:00:00Z`,format:`date_long`})]}),(0,_.jsx)(c,{mode:`single`,value:t??null,onChange:n,focusDate:`2026-08-01`})]})})}var g,_,v,y,b,x;function S(){return(S=e((()=>{g=t(),s(),l(),m(),a(),r(),d(),_=n(),v={title:`Core/Internationalization/Date consistency`,parameters:{layout:`padded`}},y=`2026-08-22`,b={render:()=>(0,_.jsxs)(`div`,{className:`xrvj5dj xnby9oq x4t41sb`,children:[(0,_.jsx)(h,{locale:`fr-FR`}),(0,_.jsx)(h,{locale:`th-TH`})]}),parameters:{docs:{description:{story:`Calendar, DateInput, and Timestamp all follow the provider locale while preserving Gregorian year 2026. Thai must not render Buddhist year 2569.`}}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  render: () => <div {...stylex.props(styles.comparison)}>
      <LocaleDateExamples locale="fr-FR" />
      <LocaleDateExamples locale="th-TH" />
    </div>,
  parameters: {
    docs: {
      description: {
        story: 'Calendar, DateInput, and Timestamp all follow the provider locale while preserving Gregorian year 2026. Thai must not render Buddhist year 2569.'
      }
    }
  }
}`,...b.parameters?.docs?.source}}},x=[`FrenchAndThaiGregorian`]})))()}S();export{b as FrenchAndThaiGregorian,x as __namedExportsOrder,v as default};