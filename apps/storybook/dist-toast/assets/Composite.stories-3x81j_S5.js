import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{t}from"./jsx-runtime-MKhVqBIO.js";import{i as n,n as r,r as i,t as a}from"./ChartAxis-BWrZPxJe.js";import{n as o,t as s}from"./ChartGrid-BGP-W357.js";import{n as c,t as l}from"./bar-BlJJsAlE.js";import{n as u,t as d}from"./line-CYVOawK-.js";import{n as f,t as p}from"./band-D2JjtQ5S.js";import{n as m,t as h}from"./errorBar-B9vtdBKX.js";import{n as g,t as _}from"./referenceLine-D8YblTtD.js";import{i as v,r as y,s as b}from"./_data-BZjSE72W.js";var x,S,C,w,T,E;function D(){return(D=e((()=>{n(),c(),d(),f(),m(),_(),o(),r(),y(),x=t(),S={title:`Charts/Composite`,component:i},C=(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)(a,{position:`bottom`}),(0,x.jsx)(a,{position:`left`})]}),w={render:()=>(0,x.jsx)(i,{data:v,xKey:`month`,title:`Revenue vs trend`,subtitle:`Bars with a trendline overlay`,series:[l(`revenue`,{color:`#3b82f6`,label:`Revenue`}),u(`trend`,{color:`#f59e0b`,label:`Trend`})],tooltip:!0,legend:!0,grid:(0,x.jsx)(s,{}),axes:C,height:320})},T={render:()=>{let e=b.map((e,t,n)=>{let r=n.slice(0,t+1).reduce((e,t)=>e+t.sales,0)/(t+1);return{...e,runAvg:Math.round(r*10)/10,upper:Math.round((r+8)*10)/10,lower:Math.round((r-8)*10)/10}});return(0,x.jsx)(i,{data:e,xKey:`month`,title:`Kitchen sink`,series:[g({y:40,y2:60,color:`#22c55e`,bandOpacity:.08}),g({y:50,label:`Target`,color:`#ef4444`}),p({upper:`upper`,lower:`lower`,color:`#f59e0b`,opacity:.15}),l(`sales`,{color:`#3b82f6`,label:`Sales`}),h({high:`errorHigh`,low:`errorLow`,color:`#1e3a5f`}),u(`runAvg`,{color:`#f59e0b`,strokeWidth:2,label:`Run avg`})],grid:(0,x.jsx)(s,{}),axes:C,height:400})}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  render: () => <Chart data={monthlyData} xKey="month" title="Revenue vs trend" subtitle="Bars with a trendline overlay" series={[bar('revenue', {
    color: '#3b82f6',
    label: 'Revenue'
  }), line('trend', {
    color: '#f59e0b',
    label: 'Trend'
  })]} tooltip legend grid={<ChartGrid />} axes={axes} height={320} />
}`,...w.parameters?.docs?.source},description:{story:`Bars + a trendline overlay sharing one scale.`,...w.parameters?.docs?.description}}},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  render: () => {
    const data = salesData.map((d, i, arr) => {
      const avg = arr.slice(0, i + 1).reduce((s, v) => s + v.sales, 0) / (i + 1);
      return {
        ...d,
        runAvg: Math.round(avg * 10) / 10,
        upper: Math.round((avg + 8) * 10) / 10,
        lower: Math.round((avg - 8) * 10) / 10
      };
    });
    return <Chart data={data} xKey="month" title="Kitchen sink" series={[referenceLine({
      y: 40,
      y2: 60,
      color: '#22c55e',
      bandOpacity: 0.08
    }), referenceLine({
      y: 50,
      label: 'Target',
      color: '#ef4444'
    }), band({
      upper: 'upper',
      lower: 'lower',
      color: '#f59e0b',
      opacity: 0.15
    }), bar('sales', {
      color: '#3b82f6',
      label: 'Sales'
    }), errorBar({
      high: 'errorHigh',
      low: 'errorLow',
      color: '#1e3a5f'
    }), line('runAvg', {
      color: '#f59e0b',
      strokeWidth: 2,
      label: 'Run avg'
    })]} grid={<ChartGrid />} axes={axes} height={400} />;
  }
}`,...T.parameters?.docs?.source},description:{story:`Many marks at once: reference band + line, confidence band, bars, error bars, line.`,...T.parameters?.docs?.description}}},E=[`MixedMarks`,`KitchenSink`]})))()}D();export{T as KitchenSink,w as MixedMarks,E as __namedExportsOrder,S as default};