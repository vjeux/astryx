import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{t}from"./react-DlPsW1c0.js";import{t as n}from"./jsx-runtime-MKhVqBIO.js";import{c as r,i,l as a,n as o,r as s,t as c}from"./ChartAxis-BWrZPxJe.js";import{n as l,t as u}from"./ChartGrid-BGP-W357.js";import{n as d,t as f}from"./line-CYVOawK-.js";import{l as p,r as m}from"./_data-BZjSE72W.js";function h(e,t){let n=e[t];return typeof n==`number`&&Number.isFinite(n)?n:NaN}function g(e,t){let{xScale:n,width:i}=t;if(r(n))return n.bandwidth();let a=e.map(e=>e.px).filter(e=>Number.isFinite(e)).sort((e,t)=>e-t),o=1/0;for(let e=1;e<a.length;e++){let t=a[e]-a[e-1];t>0&&t<o&&(o=t)}return Number.isFinite(o)?o:Math.min(i,40)}function _(e){let t=e.upColor??`var(--color-success)`,n=e.downColor??`var(--color-error)`;return{type:`candlestick`,key:`ohlc-${e.close}`,dataKeys:[e.open,e.high,e.low,e.close],layout:{},resolve(t){let{data:n,xKey:r,xScale:i,yScale:o}=t,s=[];for(let t=0;t<n.length;t++){let c=n[t],l=h(c,e.close);s.push({px:a(c,r,i),py:o(l),py0:o(0),dataIndex:t})}return s},render(r,i){let{data:a,yScale:o}=i,s=Math.max(1,g(r,i)*.6);return(0,v.jsx)(`g`,{children:r.map(r=>{let i=a[r.dataIndex],c=h(i,e.open),l=h(i,e.close),u=h(i,e.high),d=h(i,e.low);if(!Number.isFinite(r.px)||!Number.isFinite(c)||!Number.isFinite(l)||!Number.isFinite(u)||!Number.isFinite(d))return null;let f=l>=c?t:n,p=o(Math.max(c,l)),m=Math.max(1,Math.abs(o(c)-o(l)));return(0,v.jsxs)(`g`,{children:[(0,v.jsx)(`line`,{x1:r.px,x2:r.px,y1:o(u),y2:o(d),stroke:f,strokeWidth:1}),(0,v.jsx)(`rect`,{x:r.px-s/2,y:p,width:s,height:m,fill:f})]},r.dataIndex)})})}}}var v;function y(){return(y=e((()=>{v=n()})))()}var b,x,S,C,w,T,E;function D(){return(D=e((()=>{b=t(),i(),y(),f(),l(),o(),m(),x=n(),S={title:`Charts/Candlestick`,component:s},C=(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)(c,{position:`bottom`}),(0,x.jsx)(c,{position:`left`})]}),w={render:()=>(0,x.jsx)(s,{data:p,xKey:`day`,title:`Price (OHLC)`,series:[_({open:`open`,high:`high`,low:`low`,close:`close`})],grid:(0,x.jsx)(u,{}),axes:C,height:360})},T={render:()=>{let e=(0,b.useMemo)(()=>{let e=0;return p.map((t,n)=>{e+=t.close;let r=n>=4?(e-p.slice(0,n-4).reduce((e,t)=>e+t.close,0))/5:void 0;return{...t,ma5:r==null?void 0:Math.round(r*10)/10}})},[]);return(0,x.jsx)(s,{data:e,xKey:`day`,title:`Price + 5-day MA`,series:[_({open:`open`,high:`high`,low:`low`,close:`close`}),d(`ma5`,{color:`#f59e0b`,strokeWidth:1.5})],grid:(0,x.jsx)(u,{}),axes:C,height:360})}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  render: () => <Chart data={stockData} xKey="day" title="Price (OHLC)" series={[candlestick({
    open: 'open',
    high: 'high',
    low: 'low',
    close: 'close'
  })]} grid={<ChartGrid />} axes={axes} height={360} />
}`,...w.parameters?.docs?.source},description:{story:`OHLC candlesticks. Up/down default to the theme's success/error colors.`,...w.parameters?.docs?.description}}},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  render: () => {
    const data = useMemo(() => {
      let sum = 0;
      return stockData.map((d, i) => {
        sum += d.close;
        const ma = i >= 4 ? (sum - stockData.slice(0, i - 4).reduce((s, v) => s + v.close, 0)) / 5 : undefined;
        return {
          ...d,
          ma5: ma == null ? undefined : Math.round(ma * 10) / 10
        };
      });
    }, []);
    return <Chart data={data} xKey="day" title="Price + 5-day MA" series={[candlestick({
      open: 'open',
      high: 'high',
      low: 'low',
      close: 'close'
    }), line('ma5', {
      color: '#f59e0b',
      strokeWidth: 1.5
    })]} grid={<ChartGrid />} axes={axes} height={360} />;
  }
}`,...T.parameters?.docs?.source},description:{story:`Candlesticks + a moving-average line overlay on the shared price scale.`,...T.parameters?.docs?.description}}},E=[`Basic`,`WithMovingAverage`]})))()}D();export{w as Basic,T as WithMovingAverage,E as __namedExportsOrder,S as default};