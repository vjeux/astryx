import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{t}from"./react-DlPsW1c0.js";import{t as n}from"./jsx-runtime-MKhVqBIO.js";import{n as r,t as i}from"./Text-C5BHw0wv.js";import{n as a,t as o}from"./Button-DoGM0DEN.js";import{n as s,t as c}from"./useStreamingText-B4PcFJxP.js";import{n as l,t as u}from"./VStack-SWtDePqc.js";function d({text:e,speed:t,chunkSize:n,chunkIntervalMs:r}){let[a,c]=(0,f.useState)(``),[l,d]=(0,f.useState)(!1),m=(0,f.useRef)(0),h=(0,f.useRef)(null),g=s(a,l,{speed:t}),_=(0,f.useCallback)(()=>{h.current&&clearInterval(h.current),m.current=0,c(``),d(!0),h.current=setInterval(()=>{m.current=Math.min(m.current+n,e.length),c(e.slice(0,m.current)),m.current>=e.length&&(h.current&&clearInterval(h.current),h.current=null,setTimeout(()=>d(!1),200))},r)},[e,n,r]);return(0,f.useEffect)(()=>()=>{h.current&&clearInterval(h.current)},[]),(0,p.jsxs)(u,{gap:4,children:[(0,p.jsxs)(`div`,{style:{display:`flex`,gap:8,alignItems:`center`},children:[(0,p.jsx)(o,{label:l?`Streaming...`:`Start`,onClick:_,variant:l?`secondary`:`primary`,isDisabled:l}),(0,p.jsxs)(i,{type:`supporting`,children:[`speed: `,t,` · chunk: `,n,` chars every `,r,`ms`]})]}),(0,p.jsx)(`div`,{style:{padding:16,borderRadius:8,background:`var(--color-background-muted)`,minHeight:80,whiteSpace:`pre-wrap`,fontFamily:`var(--font-family-body)`},children:(0,p.jsx)(i,{type:`body`,children:g||`\xA0`})}),(0,p.jsxs)(i,{type:`supporting`,children:[g.length,` / `,a.length,` chars displayed`,l?` · streaming`:a.length>0?` · done`:``]})]})}var f,p,m,h,g,_,v,y,b,x;function S(){return(S=e((()=>{f=t(),c(),r(),a(),l(),p=n(),m=`Here is how you fetch a user in TypeScript:

const response = await fetch("/api/users/" + id);
const user = await response.json();

Key points:
- Always check response.ok before parsing
- Use AbortController for cancellation
- Consider a useUser hook for React apps

This approach gives you type-safe API calls with proper error handling.`,h={title:`Core/Hooks/useStreamingText`,component:d,tags:[`autodocs`],argTypes:{speed:{control:`select`,options:[`natural`,`fast`,`instant`]},chunkSize:{control:{type:`range`,min:1,max:100,step:1}},chunkIntervalMs:{control:{type:`range`,min:10,max:500,step:10}},text:{control:`text`}}},g={args:{text:m,speed:`natural`,chunkSize:20,chunkIntervalMs:50}},_={args:{text:m,speed:`fast`,chunkSize:20,chunkIntervalMs:50}},v={args:{text:m,speed:`instant`,chunkSize:20,chunkIntervalMs:50}},y={name:`Bursty chunks (large backlog)`,args:{text:m,speed:`natural`,chunkSize:80,chunkIntervalMs:200}},b={name:`Slow trickle`,args:{text:m,speed:`natural`,chunkSize:1,chunkIntervalMs:100}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  args: {
    text: SAMPLE_TEXT,
    speed: 'natural',
    chunkSize: 20,
    chunkIntervalMs: 50
  }
}`,...g.parameters?.docs?.source}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  args: {
    text: SAMPLE_TEXT,
    speed: 'fast',
    chunkSize: 20,
    chunkIntervalMs: 50
  }
}`,..._.parameters?.docs?.source}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  args: {
    text: SAMPLE_TEXT,
    speed: 'instant',
    chunkSize: 20,
    chunkIntervalMs: 50
  }
}`,...v.parameters?.docs?.source}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  name: 'Bursty chunks (large backlog)',
  args: {
    text: SAMPLE_TEXT,
    speed: 'natural',
    chunkSize: 80,
    chunkIntervalMs: 200
  }
}`,...y.parameters?.docs?.source}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  name: 'Slow trickle',
  args: {
    text: SAMPLE_TEXT,
    speed: 'natural',
    chunkSize: 1,
    chunkIntervalMs: 100
  }
}`,...b.parameters?.docs?.source}}},x=[`Natural`,`Fast`,`Instant`,`BurstyChunks`,`SlowTrickle`]})))()}S();export{y as BurstyChunks,_ as Fast,v as Instant,g as Natural,b as SlowTrickle,x as __namedExportsOrder,h as default};