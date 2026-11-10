import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{t}from"./react-DlPsW1c0.js";import{t as n}from"./jsx-runtime-MKhVqBIO.js";import{t as r}from"./react-dom-B2lTHb2f.js";import{n as i,t as a}from"./Text-C5BHw0wv.js";import{n as o,t as s}from"./Heading-YiIeUtHm.js";import{n as c,t as l}from"./IconButton-BONXg2Kw.js";import{n as u,t as d}from"./Stack-C-3OCHCS.js";import{a as f,c as p,i as m,l as h,n as g,o as _,r as v,t as y}from"./ChartAxis-mF7iE-u6.js";import{n as b,t as x}from"./ChartGrid-ClN8QD9n.js";import{n as S,t as C}from"./ChartBar-CefLAYNe.js";import{n as w,t as T}from"./ChartLine-C_QV7Zzw.js";import{n as E,t as D}from"./ChartDot-C6zjGJ5n.js";import{n as ee,t as te}from"./ChartTooltip-D_Rnbc5l.js";import{n as O,t as ne}from"./useChartColors-BIiho9_u.js";import{i as re,n as ie,r as k,t as A}from"./ChartReferenceLine-BrlrN9zC.js";import{n as j,t as ae}from"./useDataset-OwVw8CiI.js";function oe(){return(0,F.jsx)(`svg`,{width:16,height:16,viewBox:`0 0 16 16`,fill:`none`,stroke:`currentColor`,strokeWidth:1.5,strokeLinecap:`round`,children:(0,F.jsx)(`path`,{d:`M8 3v10M3 8h10`})})}function se(){return(0,F.jsx)(`svg`,{width:16,height:16,viewBox:`0 0 16 16`,fill:`none`,stroke:`currentColor`,strokeWidth:1.5,strokeLinecap:`round`,children:(0,F.jsx)(`path`,{d:`M3 8h10`})})}function ce(){return(0,F.jsx)(`svg`,{width:16,height:16,viewBox:`0 0 16 16`,fill:`none`,stroke:`currentColor`,strokeWidth:1.5,strokeLinecap:`round`,strokeLinejoin:`round`,children:(0,F.jsx)(`path`,{d:`M2 8a6 6 0 1 1 1.5 4M2 12V8h4`})})}function M({onXDomainChange:e,onYDomainChange:t,zoomSpeed:n=.1,xOnly:r=!1,yOnly:i=!1,toolbar:a=`top-right`}){let{width:o,height:s,xScale:c,yScale:u,svgRef:d}=_(),[f]=(0,N.useState)(()=>({x:p(c)?null:c.domain(),y:u.domain()})),m=(0,N.useRef)(null),h=(0,N.useRef)(new Map),g=(0,N.useRef)(null),v=(0,N.useCallback)(()=>p(c)?[0,0]:c.domain(),[c]),y=(0,N.useCallback)((e,t,n)=>{let[r,i]=e,a=i-r,o=(n-r)/a,s=a*t;return[n-s*o,n+s*(1-o)]},[]),b=(0,N.useCallback)((n,a,o)=>{if(!i&&!p(c)){let t=c,[r,i]=t.domain(),o=a==null?(r+i)/2:t.invert(a);e?.(y([r,i],n,o))}if(!r){let[e,r]=u.domain(),i=o==null?(e+r)/2:u.invert(o);t?.(y([e,r],n,i))}},[c,u,e,t,r,i,y]),x=(0,N.useCallback)(a=>{if(a.deltaY===0)return;a.preventDefault();let o=a.currentTarget,s=o.ownerSVGElement;if(!s)return;let l=s.createSVGPoint();l.x=a.clientX,l.y=a.clientY;let d=l.matrixTransform(o.getScreenCTM()?.inverse()),f=1+Math.sign(a.deltaY)*Math.min(Math.abs(a.deltaY),50)/50*n;if(!i&&!p(c)){let t=c,[n,r]=t.domain(),i=t.invert(d.x);e?.(y([n,r],f,i))}if(!r){let[e,n]=u.domain(),r=u.invert(d.y);t?.(y([e,n],f,r))}},[n,c,u,e,t,r,i,y]),S=(0,N.useCallback)(e=>(e.addEventListener(`wheel`,x,{passive:!1}),()=>e.removeEventListener(`wheel`,x)),[x]),C=(0,N.useCallback)(e=>{if(e.target.setPointerCapture(e.pointerId),e.preventDefault(),h.current.set(e.pointerId,{x:e.clientX,y:e.clientY}),h.current.size===2){let e=[...h.current.values()],t=Math.hypot(e[1].x-e[0].x,e[1].y-e[0].y);g.current={dist:t,xDomain:v(),yDomain:u.domain()},m.current=null}else h.current.size===1&&(m.current={startX:e.clientX,startY:e.clientY,xDomain:v(),yDomain:u.domain()})},[v,u]),w=(0,N.useCallback)(n=>{if(h.current.set(n.pointerId,{x:n.clientX,y:n.clientY}),h.current.size===2&&g.current){let n=[...h.current.values()],a=Math.hypot(n[1].x-n[0].x,n[1].y-n[0].y),o=g.current.dist/a;if(!i&&!p(c)){let[t,n]=g.current.xDomain,r=(t+n)/2,i=(n-t)/2*o;e?.([r-i,r+i])}if(!r){let[e,n]=g.current.yDomain,r=(e+n)/2,i=(n-e)/2*o;t?.([r-i,r+i])}}else if(m.current){let a=n.clientX-m.current.startX,l=n.clientY-m.current.startY;if(!i&&!p(c)){let[t,n]=m.current.xDomain,r=-(a/o)*(n-t);e?.([t+r,n+r])}if(!r){let[e,n]=m.current.yDomain,r=l/s*(n-e);t?.([e+r,n+r])}}},[c,o,s,e,t,r,i]),T=(0,N.useCallback)(e=>{h.current.delete(e.pointerId),h.current.size<2&&(g.current=null),h.current.size===0&&(m.current=null)},[]),E=(0,N.useCallback)(()=>{f.x&&e?.(f.x),t?.(f.y)},[f,e,t]),D=d.current?.parentElement;return(0,F.jsxs)(F.Fragment,{children:[(0,F.jsx)(`g`,{children:(0,F.jsx)(`rect`,{ref:S,x:0,y:0,width:o,height:s,fill:`transparent`,style:{cursor:`grab`,touchAction:`none`,userSelect:`none`},onPointerDown:C,onPointerMove:w,onPointerUp:T,onPointerCancel:T})}),a&&D&&(0,P.createPortal)((0,F.jsxs)(`div`,{style:(e=>{let t={position:`absolute`,display:`flex`,flexDirection:`column`,gap:4,zIndex:1};switch(e){case`top-right`:return{...t,top:8,right:8};case`top-left`:return{...t,top:8,left:8};case`bottom-right`:return{...t,bottom:8,right:8};case`bottom-left`:return{...t,bottom:8,left:8}}})(a),children:[(0,F.jsx)(l,{label:`Zoom in`,icon:(0,F.jsx)(oe,{}),variant:`ghost`,size:`sm`,onClick:()=>b(1/(1+n))}),(0,F.jsx)(l,{label:`Zoom out`,icon:(0,F.jsx)(se,{}),variant:`ghost`,size:`sm`,onClick:()=>b(1+n)}),(0,F.jsx)(l,{label:`Reset zoom`,icon:(0,F.jsx)(ce,{}),variant:`ghost`,size:`sm`,onClick:E})]}),D)]})}var N,P,F;function I(){return(I=e((()=>{N=t(),P=r(),c(),f(),F=n(),M.__docgenInfo={description:``,methods:[],displayName:`ChartZoom`,props:{onXDomainChange:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(domain: [number, number]) => void`,signature:{arguments:[{type:{name:`tuple`,raw:`[number, number]`,elements:[{name:`number`},{name:`number`}]},name:`domain`}],return:{name:`void`}}},description:``},onYDomainChange:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(domain: [number, number]) => void`,signature:{arguments:[{type:{name:`tuple`,raw:`[number, number]`,elements:[{name:`number`},{name:`number`}]},name:`domain`}],return:{name:`void`}}},description:``},zoomSpeed:{required:!1,tsType:{name:`number`},description:`Zoom speed factor per scroll tick. Higher = faster zoom.
@default 0.1`,defaultValue:{value:`0.1`,computed:!1}},xOnly:{required:!1,tsType:{name:`boolean`},description:`Only zoom/pan the x-axis`,defaultValue:{value:`false`,computed:!1}},yOnly:{required:!1,tsType:{name:`boolean`},description:`Only zoom/pan the y-axis`,defaultValue:{value:`false`,computed:!1}},toolbar:{required:!1,tsType:{name:`union`,raw:`false | ZoomToolbarPosition`,elements:[{name:`literal`,value:`false`},{name:`union`,raw:`'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'`,elements:[{name:`literal`,value:`'top-right'`},{name:`literal`,value:`'top-left'`},{name:`literal`,value:`'bottom-right'`},{name:`literal`,value:`'bottom-left'`}]}]},description:`Show the zoom/pan toolbar.
Pass \`false\` to hide, or a position string to show at that corner.
@default 'top-right'`,defaultValue:{value:`'top-right'`,computed:!1}}}}})))()}function L({onSelect:e,onSelectionChange:t,selected:n=[],color:r=`var(--color-accent)`,radius:i=6}){let{width:a,height:o,data:s,xKey:c,xScale:l,yScale:u}=_(),d=(0,R.useCallback)(r=>{let i=r.currentTarget.ownerSVGElement;if(!i)return;let a=i.createSVGPoint();a.x=r.clientX,a.y=r.clientY;let o=a.matrixTransform(r.currentTarget.getScreenCTM()?.inverse()),d=0,f=1/0;s.forEach((e,t)=>{let n=h(e,c,l),r=Object.keys(e).filter(t=>t!==c&&typeof e[t]==`number`),i=r.length>0?u(e[r[0]]):0,a=Math.hypot(n-o.x,i-o.y);a<f&&(f=a,d=t)}),f>30||(e?.(s[d],d),t&&(r.shiftKey||r.metaKey?t(n.includes(d)?n.filter(e=>e!==d):[...n,d]):t([d])))},[s,c,l,u,n,e,t]);return(0,z.jsxs)(`g`,{children:[(0,z.jsx)(`rect`,{x:0,y:0,width:a,height:o,fill:`transparent`,style:{cursor:`pointer`},onPointerUp:d}),n.map(e=>{if(e<0||e>=s.length)return null;let t=s[e],n=h(t,c,l),a=Object.keys(t).find(e=>e!==c&&typeof t[e]==`number`),o=a?u(t[a]):0;return(0,z.jsx)(`circle`,{cx:n,cy:o,r:i,fill:`none`,stroke:r,strokeWidth:2,pointerEvents:`none`},e)})]})}var R,z;function B(){return(B=e((()=>{R=t(),f(),z=n(),L.__docgenInfo={description:``,methods:[],displayName:`ChartSelect`,props:{onSelect:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(datum: Record<string, unknown>, index: number) => void`,signature:{arguments:[{type:{name:`Record`,elements:[{name:`string`},{name:`unknown`}],raw:`Record<string, unknown>`},name:`datum`},{type:{name:`number`},name:`index`}],return:{name:`void`}}},description:``},onSelectionChange:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(indices: number[]) => void`,signature:{arguments:[{type:{name:`Array`,elements:[{name:`number`}],raw:`number[]`},name:`indices`}],return:{name:`void`}}},description:``},selected:{required:!1,tsType:{name:`Array`,elements:[{name:`number`}],raw:`number[]`},description:``,defaultValue:{value:`[]`,computed:!1}},color:{required:!1,tsType:{name:`string`},description:``,defaultValue:{value:`'var(--color-accent)'`,computed:!1}},radius:{required:!1,tsType:{name:`number`},description:``,defaultValue:{value:`6`,computed:!1}}}}})))()}var V,H,U,W,G,K,q,J,Y,X,Z,Q;function $(){return($=e((()=>{V=t(),m(),g(),b(),w(),E(),S(),re(),ee(),I(),B(),ie(),ne(),u(),i(),o(),ae(),H=n(),U={title:`Lab/Chart Interactions`,tags:[`autodocs`]},W=[{month:`Jan`,revenue:4200,expenses:2800},{month:`Feb`,revenue:3800,expenses:2600},{month:`Mar`,revenue:5100,expenses:3200},{month:`Apr`,revenue:4600,expenses:2900},{month:`May`,revenue:5400,expenses:3100},{month:`Jun`,revenue:6200,expenses:3400},{month:`Jul`,revenue:5800,expenses:3300},{month:`Aug`,revenue:5500,expenses:3e3},{month:`Sep`,revenue:4900,expenses:2700},{month:`Oct`,revenue:5200,expenses:3100},{month:`Nov`,revenue:5700,expenses:3200},{month:`Dec`,revenue:6800,expenses:3600}],G={render:()=>{let e=O(),[t,n]=(0,V.useState)(null);return(0,H.jsxs)(d,{direction:`vertical`,gap:4,children:[(0,H.jsx)(s,{level:3,children:`1D Brush — Bar Chart`}),(0,H.jsxs)(a,{type:`supporting`,color:`secondary`,children:[`Drag to select a range. `,t??`Click to clear.`]}),(0,H.jsxs)(v,{data:W,xKey:`month`,yKeys:[`revenue`],height:300,children:[(0,H.jsx)(x,{horizontal:!0}),(0,H.jsx)(y,{position:`bottom`}),(0,H.jsx)(y,{position:`left`}),(0,H.jsx)(C,{dataKey:`revenue`,color:e.categorical(1)[0]}),(0,H.jsx)(k,{onBrush:(e,t)=>n(`${t.length} months selected`),onClear:()=>n(null)})]})]})}},K={render:()=>{let e=O(),[t,n]=(0,V.useState)(null);return(0,H.jsxs)(d,{direction:`vertical`,gap:4,children:[(0,H.jsx)(s,{level:3,children:`1D Brush — Line Chart`}),(0,H.jsxs)(a,{type:`supporting`,color:`secondary`,children:[`Drag to select a range. `,t??`Click to clear.`]}),(0,H.jsxs)(v,{data:W,xKey:`month`,yKeys:[`revenue`,`expenses`],height:300,children:[(0,H.jsx)(x,{horizontal:!0}),(0,H.jsx)(y,{position:`bottom`}),(0,H.jsx)(y,{position:`left`}),(0,H.jsx)(T,{dataKey:`revenue`,color:e.categorical(2)[0],dots:!0}),(0,H.jsx)(T,{dataKey:`expenses`,color:e.categorical(2)[1],dots:!0}),(0,H.jsx)(k,{onBrush:(e,t)=>n(`${t.length} months selected`),onClear:()=>n(null)})]})]})}},q={render:()=>{let e=O(),[t]=j(`cars.json`),[n,r]=(0,V.useState)(null),i=(0,V.useMemo)(()=>t.filter(e=>e.Horsepower!=null&&e.Miles_per_Gallon!=null).map(e=>({hp:e.Horsepower,mpg:e.Miles_per_Gallon})),[t]);return i.length?(0,H.jsxs)(d,{direction:`vertical`,gap:4,children:[(0,H.jsx)(s,{level:3,children:`2D Brush — Scatter Plot`}),(0,H.jsxs)(a,{type:`supporting`,color:`secondary`,children:[`Drag a rectangle to select.`,` `,n==null?`Click to clear.`:`${n} points selected.`]}),(0,H.jsxs)(v,{data:i,xKey:`hp`,yKeys:[`mpg`],yBaseline:`data`,height:350,children:[(0,H.jsx)(x,{horizontal:!0,vertical:!0}),(0,H.jsx)(y,{position:`bottom`}),(0,H.jsx)(y,{position:`left`}),(0,H.jsx)(D,{dataKey:`mpg`,color:e.categorical(1)[0],radius:3}),(0,H.jsx)(k,{mode:`xy`,onBrush:(e,t)=>r(t.length),onClear:()=>r(null)})]})]}):(0,H.jsx)(a,{type:`supporting`,children:`Loading…`})}},J={render:()=>{let e=O(),[t]=j(`cars.json`),n=(0,V.useMemo)(()=>t.filter(e=>e.Horsepower!=null&&e.Miles_per_Gallon!=null).map(e=>({hp:e.Horsepower,mpg:e.Miles_per_Gallon})),[t]);return n.length?(0,H.jsxs)(d,{direction:`vertical`,gap:4,children:[(0,H.jsx)(s,{level:3,children:`Crosshair`}),(0,H.jsxs)(v,{data:n,xKey:`hp`,yKeys:[`mpg`],yBaseline:`data`,height:350,children:[(0,H.jsx)(x,{horizontal:!0,vertical:!0}),(0,H.jsx)(y,{position:`bottom`}),(0,H.jsx)(y,{position:`left`}),(0,H.jsx)(D,{dataKey:`mpg`,color:e.categorical(1)[0],radius:3}),(0,H.jsx)(te,{crosshair:`xy`,crosshairLabels:!0,xFormat:e=>`${Math.round(Number(e))} hp`,yFormat:e=>`${Math.round(e)} mpg`})]})]}):(0,H.jsx)(a,{type:`supporting`,children:`Loading…`})}},Y={render:()=>{let e=O(),[t]=j(`cars.json`),n=(0,V.useMemo)(()=>t.filter(e=>e.Horsepower!=null&&e.Miles_per_Gallon!=null).map(e=>({hp:e.Horsepower,mpg:e.Miles_per_Gallon})),[t]),[r,i]=(0,V.useState)([40,230]),[o,c]=(0,V.useState)([8,47]);return n.length?(0,H.jsxs)(d,{direction:`vertical`,gap:4,children:[(0,H.jsx)(s,{level:3,children:`Zoom & Pan`}),(0,H.jsxs)(a,{type:`supporting`,color:`secondary`,children:[`Scroll to zoom, drag to pan. x: [`,Math.round(r[0]),`,`,` `,Math.round(r[1]),`]`]}),(0,H.jsxs)(v,{data:n,xKey:`hp`,yKeys:[`mpg`],xDomain:r,yDomain:o,height:350,children:[(0,H.jsx)(x,{horizontal:!0,vertical:!0}),(0,H.jsx)(y,{position:`bottom`}),(0,H.jsx)(y,{position:`left`}),(0,H.jsx)(D,{dataKey:`mpg`,color:e.categorical(1)[0],radius:3}),(0,H.jsx)(M,{onXDomainChange:i,onYDomainChange:c})]})]}):(0,H.jsx)(a,{type:`supporting`,children:`Loading…`})}},X={render:()=>{let e=O(),[t]=j(`cars.json`),n=(0,V.useMemo)(()=>t.filter(e=>e.Horsepower!=null&&e.Miles_per_Gallon!=null).map(e=>({hp:e.Horsepower,mpg:e.Miles_per_Gallon})),[t]),[r,i]=(0,V.useState)([]);return n.length?(0,H.jsxs)(d,{direction:`vertical`,gap:4,children:[(0,H.jsx)(s,{level:3,children:`Click to Select`}),(0,H.jsxs)(a,{type:`supporting`,color:`secondary`,children:[`Click a point. Shift-click for multi. `,r.length,` selected.`]}),(0,H.jsxs)(v,{data:n,xKey:`hp`,yKeys:[`mpg`],yBaseline:`data`,height:350,children:[(0,H.jsx)(x,{horizontal:!0,vertical:!0}),(0,H.jsx)(y,{position:`bottom`}),(0,H.jsx)(y,{position:`left`}),(0,H.jsx)(D,{dataKey:`mpg`,color:e.categorical(1)[0],radius:3}),(0,H.jsx)(L,{selected:r,onSelectionChange:i})]})]}):(0,H.jsx)(a,{type:`supporting`,children:`Loading…`})}},Z={render:()=>{let e=O();return(0,H.jsxs)(d,{direction:`vertical`,gap:4,children:[(0,H.jsx)(s,{level:3,children:`Reference Lines`}),(0,H.jsxs)(v,{data:W,xKey:`month`,yKeys:[`revenue`],height:300,children:[(0,H.jsx)(x,{horizontal:!0}),(0,H.jsx)(y,{position:`bottom`}),(0,H.jsx)(y,{position:`left`}),(0,H.jsx)(C,{dataKey:`revenue`,color:e.categorical(1)[0]}),(0,H.jsx)(A,{y:5e3,label:`Target`,color:e.semantic.positive}),(0,H.jsx)(A,{y:4700,label:`Average`,color:e.semantic.neutral})]})]})}},G.parameters={...G.parameters,docs:{...G.parameters?.docs,source:{originalSource:`{
  render: () => {
    const colors = useChartColors();
    const [selected, setSelected] = useState<string | null>(null);
    return <Stack direction="vertical" gap={4}>
        <Heading level={3}>1D Brush — Bar Chart</Heading>
        <Text type="supporting" color="secondary">
          Drag to select a range. {selected ?? 'Click to clear.'}
        </Text>
        <Chart data={monthlyData} xKey="month" yKeys={['revenue']} height={300}>
          <ChartGrid horizontal />
          <ChartAxis position="bottom" />
          <ChartAxis position="left" />
          <ChartBar dataKey="revenue" color={colors.categorical(1)[0]} />
          <ChartBrush onBrush={(_, sel) => setSelected(\`\${sel.length} months selected\`)} onClear={() => setSelected(null)} />
        </Chart>
      </Stack>;
  }
}`,...G.parameters?.docs?.source},description:{story:`1D brush on a bar chart — select a range of months`,...G.parameters?.docs?.description}}},K.parameters={...K.parameters,docs:{...K.parameters?.docs,source:{originalSource:`{
  render: () => {
    const colors = useChartColors();
    const [selected, setSelected] = useState<string | null>(null);
    return <Stack direction="vertical" gap={4}>
        <Heading level={3}>1D Brush — Line Chart</Heading>
        <Text type="supporting" color="secondary">
          Drag to select a range. {selected ?? 'Click to clear.'}
        </Text>
        <Chart data={monthlyData} xKey="month" yKeys={['revenue', 'expenses']} height={300}>
          <ChartGrid horizontal />
          <ChartAxis position="bottom" />
          <ChartAxis position="left" />
          <ChartLine dataKey="revenue" color={colors.categorical(2)[0]} dots />
          <ChartLine dataKey="expenses" color={colors.categorical(2)[1]} dots />
          <ChartBrush onBrush={(_, sel) => setSelected(\`\${sel.length} months selected\`)} onClear={() => setSelected(null)} />
        </Chart>
      </Stack>;
  }
}`,...K.parameters?.docs?.source},description:{story:`1D brush on a line chart — select a time range`,...K.parameters?.docs?.description}}},q.parameters={...q.parameters,docs:{...q.parameters?.docs,source:{originalSource:`{
  render: () => {
    const colors = useChartColors();
    const [raw] = useDataset<Car>('cars.json');
    const [count, setCount] = useState<number | null>(null);
    const data = useMemo(() => raw.filter(d => d.Horsepower != null && d.Miles_per_Gallon != null).map(d => ({
      hp: d.Horsepower,
      mpg: d.Miles_per_Gallon
    })), [raw]);
    if (!data.length) {
      return <Text type="supporting">Loading…</Text>;
    }
    return <Stack direction="vertical" gap={4}>
        <Heading level={3}>2D Brush — Scatter Plot</Heading>
        <Text type="supporting" color="secondary">
          Drag a rectangle to select.{' '}
          {count != null ? \`\${count} points selected.\` : 'Click to clear.'}
        </Text>
        <Chart data={data} xKey="hp" yKeys={['mpg']} yBaseline="data" height={350}>
          <ChartGrid horizontal vertical />
          <ChartAxis position="bottom" />
          <ChartAxis position="left" />
          <ChartDot dataKey="mpg" color={colors.categorical(1)[0]} radius={3} />
          <ChartBrush mode="xy" onBrush={(_, sel) => setCount(sel.length)} onClear={() => setCount(null)} />
        </Chart>
      </Stack>;
  }
}`,...q.parameters?.docs?.source},description:{story:`2D rectangular brush on a scatter plot`,...q.parameters?.docs?.description}}},J.parameters={...J.parameters,docs:{...J.parameters?.docs,source:{originalSource:`{
  render: () => {
    const colors = useChartColors();
    const [raw] = useDataset<Car>('cars.json');
    const data = useMemo(() => raw.filter(d => d.Horsepower != null && d.Miles_per_Gallon != null).map(d => ({
      hp: d.Horsepower,
      mpg: d.Miles_per_Gallon
    })), [raw]);
    if (!data.length) {
      return <Text type="supporting">Loading…</Text>;
    }
    return <Stack direction="vertical" gap={4}>
        <Heading level={3}>Crosshair</Heading>
        <Chart data={data} xKey="hp" yKeys={['mpg']} yBaseline="data" height={350}>
          <ChartGrid horizontal vertical />
          <ChartAxis position="bottom" />
          <ChartAxis position="left" />
          <ChartDot dataKey="mpg" color={colors.categorical(1)[0]} radius={3} />
          <ChartTooltip crosshair="xy" crosshairLabels xFormat={v => \`\${Math.round(Number(v))} hp\`} yFormat={v => \`\${Math.round(v)} mpg\`} />
        </Chart>
      </Stack>;
  }
}`,...J.parameters?.docs?.source},description:{story:`Crosshair with value readouts`,...J.parameters?.docs?.description}}},Y.parameters={...Y.parameters,docs:{...Y.parameters?.docs,source:{originalSource:`{
  render: () => {
    const colors = useChartColors();
    const [raw] = useDataset<Car>('cars.json');
    const data = useMemo(() => raw.filter(d => d.Horsepower != null && d.Miles_per_Gallon != null).map(d => ({
      hp: d.Horsepower,
      mpg: d.Miles_per_Gallon
    })), [raw]);
    const [xDomain, setXDomain] = useState<[number, number]>([40, 230]);
    const [yDomain, setYDomain] = useState<[number, number]>([8, 47]);
    if (!data.length) {
      return <Text type="supporting">Loading…</Text>;
    }
    return <Stack direction="vertical" gap={4}>
        <Heading level={3}>Zoom & Pan</Heading>
        <Text type="supporting" color="secondary">
          Scroll to zoom, drag to pan. x: [{Math.round(xDomain[0])},{' '}
          {Math.round(xDomain[1])}]
        </Text>
        <Chart data={data} xKey="hp" yKeys={['mpg']} xDomain={xDomain} yDomain={yDomain} height={350}>
          <ChartGrid horizontal vertical />
          <ChartAxis position="bottom" />
          <ChartAxis position="left" />
          <ChartDot dataKey="mpg" color={colors.categorical(1)[0]} radius={3} />
          <ChartZoom onXDomainChange={setXDomain} onYDomainChange={setYDomain} />
        </Chart>
      </Stack>;
  }
}`,...Y.parameters?.docs?.source},description:{story:`Scroll to zoom, drag to pan`,...Y.parameters?.docs?.description}}},X.parameters={...X.parameters,docs:{...X.parameters?.docs,source:{originalSource:`{
  render: () => {
    const colors = useChartColors();
    const [raw] = useDataset<Car>('cars.json');
    const data = useMemo(() => raw.filter(d => d.Horsepower != null && d.Miles_per_Gallon != null).map(d => ({
      hp: d.Horsepower,
      mpg: d.Miles_per_Gallon
    })), [raw]);
    const [selected, setSelected] = useState<number[]>([]);
    if (!data.length) {
      return <Text type="supporting">Loading…</Text>;
    }
    return <Stack direction="vertical" gap={4}>
        <Heading level={3}>Click to Select</Heading>
        <Text type="supporting" color="secondary">
          Click a point. Shift-click for multi. {selected.length} selected.
        </Text>
        <Chart data={data} xKey="hp" yKeys={['mpg']} yBaseline="data" height={350}>
          <ChartGrid horizontal vertical />
          <ChartAxis position="bottom" />
          <ChartAxis position="left" />
          <ChartDot dataKey="mpg" color={colors.categorical(1)[0]} radius={3} />
          <ChartSelect selected={selected} onSelectionChange={setSelected} />
        </Chart>
      </Stack>;
  }
}`,...X.parameters?.docs?.source},description:{story:`Click to select points`,...X.parameters?.docs?.description}}},Z.parameters={...Z.parameters,docs:{...Z.parameters?.docs,source:{originalSource:`{
  render: () => {
    const colors = useChartColors();
    return <Stack direction="vertical" gap={4}>
        <Heading level={3}>Reference Lines</Heading>
        <Chart data={monthlyData} xKey="month" yKeys={['revenue']} height={300}>
          <ChartGrid horizontal />
          <ChartAxis position="bottom" />
          <ChartAxis position="left" />
          <ChartBar dataKey="revenue" color={colors.categorical(1)[0]} />
          <ChartReferenceLine y={5000} label="Target" color={colors.semantic.positive} />
          <ChartReferenceLine y={4700} label="Average" color={colors.semantic.neutral} />
        </Chart>
      </Stack>;
  }
}`,...Z.parameters?.docs?.source},description:{story:`Reference lines for target and average`,...Z.parameters?.docs?.description}}},Q=[`BrushBars`,`BrushLine`,`Brush2D`,`Crosshair`,`ZoomPan`,`ClickSelect`,`ReferenceLines`]})))()}$();export{q as Brush2D,G as BrushBars,K as BrushLine,X as ClickSelect,J as Crosshair,Z as ReferenceLines,Y as ZoomPan,Q as __namedExportsOrder,U as default};