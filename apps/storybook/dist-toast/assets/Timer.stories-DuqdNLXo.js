import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{t}from"./react-DlPsW1c0.js";import{t as n}from"./jsx-runtime-MKhVqBIO.js";import{n as r}from"./mergeProps-DHkqklmt.js";import{i,t as a}from"./themeProps-BVy3p_gf.js";import{n as o,t as s}from"./useMergedRefs-D6axeCXB.js";import{n as c,t as l}from"./Text-C5BHw0wv.js";import{n as u,t as d}from"./Stack-C-3OCHCS.js";function f(e){return String(e).padStart(2,`0`)}function p(e){return e===`clock`?`clock`:`elapsed`}function m(e,t){return Math.max(0,e-t)}function h(e,t){let n=Math.floor(e/b);if(t===`clock`){let e=Math.floor(n/S),t=Math.floor(n%S/60),r=n%60;return{dateTime:`PT${n}S`,text:e>0?`${String(e)}:${f(t)}:${f(r)}`:`${String(t)}:${f(r)}`}}if(n<60)return{dateTime:`PT${n}S`,text:`${String(n)}s`};let r=Math.floor(n/60);return r<60?{dateTime:`PT${n}S`,text:`${String(r)}m ${f(n%60)}s`}:{dateTime:`PT${r*60}S`,text:`${String(Math.floor(r/60))}h ${f(r%60)}m`}}function g(e,t,n,r){if(e<t)return Math.min(t-e+b,C);let i=r===`elapsed`&&n>=S*b?x:b;return i-n%i}function _({startTime:e,format:t=`elapsed`,type:n=`supporting`,size:a,color:s=`secondary`,weight:c,ref:u,xstyle:d,className:f,style:_,...b}){let[x]=(0,v.useState)(()=>Date.now()),S=(0,v.useRef)(null),C=o(u,S),w=p(t),T=h(0,w);(0,v.useEffect)(()=>{let t=e!==void 0&&Number.isFinite(e)?e:x,n,r,i,a=()=>{let e=Date.now(),o=m(e,t),s=h(o,w),c=S.current;c!=null&&(s.text!==i&&(c.textContent=s.text,i=s.text),s.dateTime!==r&&(c.dateTime=s.dateTime,r=s.dateTime)),n=setTimeout(a,g(e,t,o,w))};return a(),()=>{n!==void 0&&clearTimeout(n)}},[x,w,e]);let E=r(i(`timer`),{className:f,style:_});return(0,y.jsx)(l,{type:n,size:a,color:s,weight:c,xstyle:d,...E,children:(0,y.jsx)(`time`,{...b,ref:C,dateTime:`PT0S`,className:`astryx1heor9g astryxt0psk2 astryxjb2p0i astryx1qlqyl8 astryx1j61x8r astryxss6m8b astryx1pd3egz astryx15bjb6t`,children:T.text})})}var v,y,b,x,S,C;function w(){return(w=e((()=>{v=t(),s(),c(),a(),y=n(),b=1e3,x=60*b,S=3600,C=2147483647,_.displayName=`Timer`,_.__docgenInfo={description:'Displays a standardized elapsed duration without scheduling React tick renders.\n\nTimer writes changing text and its ISO 8601 duration directly to the owned\n`<time>` node. Use `elapsed` for compact duration text or `clock` for a\nstopwatch-like reading.\n\n@example\n```\n<Timer />\n<Timer format="clock" />\n```',methods:[],displayName:`Timer`,props:{ref:{required:!1,tsType:{name:`ReactRef`,raw:`React.Ref<HTMLTimeElement>`,elements:[{name:`HTMLTimeElement`}]},description:"Ref forwarded to the rendered `<time>` element."},startTime:{required:!1,tsType:{name:`number`},description:`Unix time in milliseconds when the measured operation began. Omit it to
start counting from this Timer's mount.`},format:{required:!1,tsType:{name:`union`,raw:`'elapsed' | 'clock'`,elements:[{name:`literal`,value:`'elapsed'`},{name:`literal`,value:`'clock'`}]},description:`Standard duration representation.
@default 'elapsed'`,defaultValue:{value:`'elapsed'`,computed:!1}},type:{required:!1,tsType:{name:`union`,raw:`BuiltinTextType | (keyof CustomTextTypes & string)`,elements:[{name:`union`,raw:`| 'body'
| 'large'
| 'label'
| 'supporting'
| 'code'
| 'display-1'
| 'display-2'
| 'display-3'
| 'inherit'`,elements:[{name:`literal`,value:`'body'`},{name:`literal`,value:`'large'`},{name:`literal`,value:`'label'`},{name:`literal`,value:`'supporting'`},{name:`literal`,value:`'code'`},{name:`literal`,value:`'display-1'`},{name:`literal`,value:`'display-2'`},{name:`literal`,value:`'display-3'`},{name:`literal`,value:`'inherit'`}]},{name:`unknown`}]},description:`Semantic text type. Matches Timestamp typography behavior.
@default 'supporting'`,defaultValue:{value:`'supporting'`,computed:!1}},size:{required:!1,tsType:{name:`union`,raw:`| '4xs'
| '3xs'
| '2xs'
| 'xsm'
| 'sm'
| 'base'
| 'lg'
| 'xl'
| '2xl'
| '3xl'
| '4xl'`,elements:[{name:`literal`,value:`'4xs'`},{name:`literal`,value:`'3xs'`},{name:`literal`,value:`'2xs'`},{name:`literal`,value:`'xsm'`},{name:`literal`,value:`'sm'`},{name:`literal`,value:`'base'`},{name:`literal`,value:`'lg'`},{name:`literal`,value:`'xl'`},{name:`literal`,value:`'2xl'`},{name:`literal`,value:`'3xl'`},{name:`literal`,value:`'4xl'`}]},description:"Explicit font size override. Overrides the size from `type`."},color:{required:!1,tsType:{name:`TextColorMap`},description:`Text color.
@default 'secondary'`,defaultValue:{value:`'secondary'`,computed:!1}},weight:{required:!1,tsType:{name:`union`,raw:`'normal' | 'medium' | 'semibold' | 'bold'`,elements:[{name:`literal`,value:`'normal'`},{name:`literal`,value:`'medium'`},{name:`literal`,value:`'semibold'`},{name:`literal`,value:`'bold'`}]},description:`Font weight override.`}},composes:[`Omit`]}})))()}function T(){let[e]=(0,O.useState)(()=>Date.now()-3753e3);return(0,k.jsxs)(d,{direction:`vertical`,gap:3,children:[(0,k.jsxs)(d,{direction:`horizontal`,gap:2,vAlign:`center`,children:[(0,k.jsx)(l,{type:`supporting`,color:`secondary`,children:`Elapsed`}),(0,k.jsx)(_,{startTime:e,type:`body`,color:`primary`})]}),(0,k.jsxs)(d,{direction:`horizontal`,gap:2,vAlign:`center`,children:[(0,k.jsx)(l,{type:`supporting`,color:`secondary`,children:`Clock`}),(0,k.jsx)(_,{format:`clock`,startTime:e,type:`body`,color:`primary`})]})]})}function E(){let[e]=(0,O.useState)(()=>Date.now()-65e3);return(0,k.jsx)(_,{startTime:e})}function D(){let[e]=(0,O.useState)(()=>Date.now()-128e3);return(0,k.jsx)(_,{startTime:e,type:`body`,size:`lg`,color:`primary`,weight:`semibold`})}var O,k,A,j,M,N,P,F,I,L,R;function z(){return(z=e((()=>{O=t(),w(),u(),c(),k=n(),{expect:A,waitFor:j}=__STORYBOOK_MODULE_TEST__,M={title:`Core/Timer`,component:_,tags:[`autodocs`],argTypes:{startTime:{control:`number`,description:`Operation start as Unix milliseconds`},format:{control:`select`,options:[`elapsed`,`clock`],description:`Standard elapsed or stopwatch representation`}}},N={play:async({canvasElement:e})=>{let t=e.querySelector(`time`);A(t).not.toBeNull(),await j(()=>{A(t?.textContent).not.toBe(`0s`)},{timeout:2500})}},P={render:()=>(0,k.jsx)(T,{})},F={render:()=>(0,k.jsxs)(l,{type:`body`,color:`primary`,children:[`Processing for `,(0,k.jsx)(_,{type:`inherit`,color:`inherit`})]})},I={render:()=>(0,k.jsx)(E,{})},L={render:()=>(0,k.jsx)(D,{})},N.parameters={...N.parameters,docs:{...N.parameters?.docs,source:{originalSource:`{
  play: async ({
    canvasElement
  }) => {
    // The tick is DOM-owned: the zero-duration first paint must advance on
    // its own, with no interaction and no React render. This play runs in the
    // storybook test runner, so a regression that freezes the display fails
    // in a real browser instead of only in jsdom.
    const timer = canvasElement.querySelector('time');
    expect(timer).not.toBeNull();
    await waitFor(() => {
      expect(timer?.textContent).not.toBe('0s');
    }, {
      timeout: 2500
    });
  }
}`,...N.parameters?.docs?.source}}},P.parameters={...P.parameters,docs:{...P.parameters?.docs,source:{originalSource:`{
  render: () => <FormatsStory />
}`,...P.parameters?.docs?.source}}},F.parameters={...F.parameters,docs:{...F.parameters?.docs,source:{originalSource:`{
  render: () => <Text type="body" color="primary">
      Processing for <Timer type="inherit" color="inherit" />
    </Text>
}`,...F.parameters?.docs?.source}}},I.parameters={...I.parameters,docs:{...I.parameters?.docs,source:{originalSource:`{
  render: () => <EarlierStartStory />
}`,...I.parameters?.docs?.source}}},L.parameters={...L.parameters,docs:{...L.parameters?.docs,source:{originalSource:`{
  render: () => <TypographyStory />
}`,...L.parameters?.docs?.source}}},R=[`Default`,`Formats`,`WaitingMessage`,`EarlierStart`,`Typography`]})))()}z();export{N as Default,I as EarlierStart,P as Formats,L as Typography,F as WaitingMessage,R as __namedExportsOrder,M as default};