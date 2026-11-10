import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{t}from"./react-DlPsW1c0.js";import{t as n}from"./jsx-runtime-MKhVqBIO.js";import{n as r,t as i}from"./Text-C5BHw0wv.js";import{n as a,t as o}from"./Heading-YiIeUtHm.js";import{n as s,t as c}from"./Stack-C-3OCHCS.js";import{i as l,n as u,r as d,t as f}from"./ChartAxis-mF7iE-u6.js";import{n as p,t as m}from"./ChartGrid-ClN8QD9n.js";import{n as h,t as g}from"./ChartStreamGL-J7pyEhiV.js";import{n as _,t as v}from"./useChartColors-BIiho9_u.js";function y({xWindow:e,yDomain:t,yPadding:n=.1,yCenter:r=!1}){let[i,a]=(0,b.useState)([0,0]),[o,s]=(0,b.useState)(t??[0,1]),c=(0,b.useRef)({yMin:t?t[0]:1/0,yMax:t?t[1]:-1/0}),l=(0,b.useCallback)((i,o,l)=>{l?.current?.push(i,o);let u=i>=e?i-e:0;if(a([u,i>=e?i:Math.max(i,1)]),!t){let e=c.current,t=!1;if(o<e.yMin&&(e.yMin=o,t=!0),o>e.yMax&&(e.yMax=o,t=!0),t){let t=(e.yMax-e.yMin||1)*n,i=e.yMin-t,a=e.yMax+t;if(r){let e=Math.max(Math.abs(i),Math.abs(a));i=-e,a=e}s([i,a])}}},[e,t,n,r]),u=(0,b.useCallback)(()=>{c.current={yMin:t?t[0]:1/0,yMax:t?t[1]:-1/0},a([0,0]),s(t??[0,1])},[t]);return{xDomain:i,yDomain:t??o,push:l,reset:u}}var b;function x(){return(x=e((()=>{b=t()})))()}function S(e){let t=e>>>0;return()=>{t=t+1831565813>>>0;let e=t;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}}function C({streamRef:e,push:t,reset:n,createSamples:r,captureSampleCount:i,redrawKey:a,useAnimationFrame:o=!1}){(0,w.useEffect)(()=>{n(),e.current?.clear();let a=r(),s=()=>{let n=a();return t(n[0],n[1],e),n};if(window.matchMedia(`(prefers-reduced-motion: reduce)`).matches){let t=[0,0];for(let e=0;e<i;e+=1)t=s();let n=window.setTimeout(()=>{e.current?.push(t[0],t[1])},0);return()=>window.clearTimeout(n)}if(o){let e,t=()=>{s(),e=window.requestAnimationFrame(t)};return e=window.requestAnimationFrame(t),()=>window.cancelAnimationFrame(e)}let c=window.setInterval(s,D);return()=>window.clearInterval(c)},[i,r,t,a,n,e,o])}var w,T,E,D,O,k,A,j,M,N,P,F;function I(){return(I=e((()=>{w=t(),l(),u(),p(),h(),v(),x(),s(),r(),a(),T=n(),E={title:`Lab/Hooks/useChartRange`},D=33,O=[0,100],k=()=>{let e=S(19229),t=0;return()=>(t+=1,[t,Math.sin(t*.04)*30+50+(e()-.5)*10])},A=()=>{let e=0;return()=>{e+=1;let t=10+e*.05;return[e,Math.sin(e*.03)*t+50]}},j=()=>{let e=S(32272),t=0,n=0;return()=>{t+=1,e()<.003&&(n=30+e()*50),n*=.97;let r=(e()-.5)*2,i=n>.5?Math.sin(t*.5)*n*(.5+e()*.5):0;return[t,r+i]}},M={render:()=>{let e=_().categorical(1)[0],t=(0,w.useRef)(null),{xDomain:n,yDomain:r,push:a,reset:s}=y({xWindow:300,yDomain:O});return C({streamRef:t,push:a,reset:s,createSamples:k,captureSampleCount:360,redrawKey:e}),(0,T.jsxs)(c,{direction:`vertical`,gap:4,children:[(0,T.jsx)(o,{level:3,children:`Known Range (0-100%)`}),(0,T.jsx)(i,{type:`supporting`,color:`secondary`,children:`yDomain fixed at [0, 100]. useChartRange manages xDomain sliding window.`}),(0,T.jsxs)(d,{data:[],xKey:`t`,yKeys:[],xDomain:n,yDomain:r,height:200,children:[(0,T.jsx)(m,{horizontal:!0}),(0,T.jsx)(f,{position:`bottom`}),(0,T.jsx)(f,{position:`left`}),(0,T.jsx)(g,{handleRef:t,color:e,bufferSize:300,lineWidth:1.5})]})]})}},N={render:()=>{let e=_().categorical(2)[1],t=(0,w.useRef)(null),{xDomain:n,yDomain:r,push:a,reset:s}=y({xWindow:300,yPadding:.1});return C({streamRef:t,push:a,reset:s,createSamples:A,captureSampleCount:360,redrawKey:e}),(0,T.jsxs)(c,{direction:`vertical`,gap:4,children:[(0,T.jsx)(o,{level:3,children:`Unknown Range (auto-tracks)`}),(0,T.jsxs)(i,{type:`supporting`,color:`secondary`,children:[`No fixed yDomain. Range auto-expands as data reveals amplitude. Currently: [`,r[0].toFixed(1),`, `,r[1].toFixed(1),`]`]}),(0,T.jsxs)(d,{data:[],xKey:`t`,yKeys:[],xDomain:n,yDomain:r,height:200,children:[(0,T.jsx)(m,{horizontal:!0}),(0,T.jsx)(f,{position:`bottom`}),(0,T.jsx)(f,{position:`left`}),(0,T.jsx)(g,{handleRef:t,color:e,bufferSize:300,lineWidth:1.5})]})]})}},P={render:()=>{let e=_().categorical(5)[3],t=(0,w.useRef)(null),{xDomain:n,yDomain:r,push:a,reset:s}=y({xWindow:600,yCenter:!0,yPadding:.05});return C({streamRef:t,push:a,reset:s,createSamples:j,captureSampleCount:660,redrawKey:e,useAnimationFrame:!0}),(0,T.jsxs)(c,{direction:`vertical`,gap:4,children:[(0,T.jsx)(o,{level:3,children:`Zero-Centered (seismograph)`}),(0,T.jsxs)(i,{type:`supporting`,color:`secondary`,children:[`yCenter=true keeps 0 at center. Range auto-expands on quake bursts. Currently: [`,r[0].toFixed(1),`, `,r[1].toFixed(1),`]`]}),(0,T.jsxs)(d,{data:[],xKey:`t`,yKeys:[],xDomain:n,yDomain:r,yBaseline:`zero`,height:220,children:[(0,T.jsx)(m,{horizontal:!0}),(0,T.jsx)(f,{position:`bottom`}),(0,T.jsx)(f,{position:`left`}),(0,T.jsx)(g,{handleRef:t,color:e,bufferSize:600,lineWidth:1,opacity:.9})]})]})}},M.parameters={...M.parameters,docs:{...M.parameters?.docs,source:{originalSource:`{
  render: () => {
    const colors = useChartColors();
    const color = colors.categorical(1)[0];
    const streamRef = useRef<ChartStreamGLHandle>(null);
    const {
      xDomain,
      yDomain,
      push,
      reset
    } = useChartRange({
      xWindow: 300,
      yDomain: KNOWN_Y_DOMAIN
    });
    useStoryStream({
      streamRef,
      push,
      reset,
      createSamples: createKnownRangeSamples,
      captureSampleCount: 300 + CAPTURE_OVERRUN,
      redrawKey: color
    });
    return <Stack direction="vertical" gap={4}>
        <Heading level={3}>Known Range (0-100%)</Heading>
        <Text type="supporting" color="secondary">
          yDomain fixed at [0, 100]. useChartRange manages xDomain sliding
          window.
        </Text>
        <Chart data={[]} xKey="t" yKeys={[]} xDomain={xDomain} yDomain={yDomain} height={200}>
          <ChartGrid horizontal />
          <ChartAxis position="bottom" />
          <ChartAxis position="left" />
          <ChartStreamGL handleRef={streamRef} color={color} bufferSize={300} lineWidth={1.5} />
        </Chart>
      </Stack>;
  }
}`,...M.parameters?.docs?.source},description:{story:`Known y-range — useChartRange just manages the sliding x window`,...M.parameters?.docs?.description}}},N.parameters={...N.parameters,docs:{...N.parameters?.docs,source:{originalSource:`{
  render: () => {
    const colors = useChartColors();
    const color = colors.categorical(2)[1];
    const streamRef = useRef<ChartStreamGLHandle>(null);
    const {
      xDomain,
      yDomain,
      push,
      reset
    } = useChartRange({
      xWindow: 300,
      yPadding: 0.1
    });
    useStoryStream({
      streamRef,
      push,
      reset,
      createSamples: createUnknownRangeSamples,
      captureSampleCount: 300 + CAPTURE_OVERRUN,
      redrawKey: color
    });
    return <Stack direction="vertical" gap={4}>
        <Heading level={3}>Unknown Range (auto-tracks)</Heading>
        <Text type="supporting" color="secondary">
          No fixed yDomain. Range auto-expands as data reveals amplitude.
          Currently: [{yDomain[0].toFixed(1)}, {yDomain[1].toFixed(1)}]
        </Text>
        <Chart data={[]} xKey="t" yKeys={[]} xDomain={xDomain} yDomain={yDomain} height={200}>
          <ChartGrid horizontal />
          <ChartAxis position="bottom" />
          <ChartAxis position="left" />
          <ChartStreamGL handleRef={streamRef} color={color} bufferSize={300} lineWidth={1.5} />
        </Chart>
      </Stack>;
  }
}`,...N.parameters?.docs?.source},description:{story:`Unknown y-range — auto-tracks from data with 10% padding`,...N.parameters?.docs?.description}}},P.parameters={...P.parameters,docs:{...P.parameters?.docs,source:{originalSource:`{
  render: () => {
    const colors = useChartColors();
    const color = colors.categorical(5)[3];
    const streamRef = useRef<ChartStreamGLHandle>(null);
    const {
      xDomain,
      yDomain,
      push,
      reset
    } = useChartRange({
      xWindow: 600,
      yCenter: true,
      yPadding: 0.05
    });
    useStoryStream({
      streamRef,
      push,
      reset,
      createSamples: createZeroCenteredSamples,
      captureSampleCount: 600 + CAPTURE_OVERRUN,
      redrawKey: color,
      useAnimationFrame: true
    });
    return <Stack direction="vertical" gap={4}>
        <Heading level={3}>Zero-Centered (seismograph)</Heading>
        <Text type="supporting" color="secondary">
          yCenter=true keeps 0 at center. Range auto-expands on quake bursts.
          Currently: [{yDomain[0].toFixed(1)}, {yDomain[1].toFixed(1)}]
        </Text>
        <Chart data={[]} xKey="t" yKeys={[]} xDomain={xDomain} yDomain={yDomain} yBaseline="zero" height={220}>
          <ChartGrid horizontal />
          <ChartAxis position="bottom" />
          <ChartAxis position="left" />
          <ChartStreamGL handleRef={streamRef} color={color} bufferSize={600} lineWidth={1} opacity={0.9} />
        </Chart>
      </Stack>;
  }
}`,...P.parameters?.docs?.source},description:{story:`Zero-centered — seismograph pattern with yCenter`,...P.parameters?.docs?.description}}},F=[`KnownRange`,`UnknownRange`,`ZeroCentered`]})))()}I();export{M as KnownRange,N as UnknownRange,P as ZeroCentered,F as __namedExportsOrder,E as default};