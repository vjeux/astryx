import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{t}from"./jsx-runtime-MKhVqBIO.js";import{i as n,n as r,r as i,t as a}from"./ChartAxis-BWrZPxJe.js";import{n as o,t as s}from"./ChartGrid-BGP-W357.js";import{n as c,t as l}from"./bar-BlJJsAlE.js";import{n as u,t as d}from"./errorBar-B9vtdBKX.js";import{r as f,s as p}from"./_data-BZjSE72W.js";var m,h,g,_;function v(){return(v=e((()=>{n(),c(),u(),o(),r(),f(),m=t(),h={title:`Charts/Error Bar`,component:i},g={render:()=>(0,m.jsx)(i,{data:p,xKey:`month`,title:`Sales with error bars`,series:[l(`sales`,{color:`#3b82f6`}),d({high:`errorHigh`,low:`errorLow`,color:`#1e3a5f`})],grid:(0,m.jsx)(s,{}),axes:(0,m.jsxs)(m.Fragment,{children:[(0,m.jsx)(a,{position:`bottom`}),(0,m.jsx)(a,{position:`left`})]}),height:320})},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  render: () => <Chart data={salesData} xKey="month" title="Sales with error bars" series={[bar('sales', {
    color: '#3b82f6'
  }), errorBar({
    high: 'errorHigh',
    low: 'errorLow',
    color: '#1e3a5f'
  })]} grid={<ChartGrid />} axes={<>
          <ChartAxis position="bottom" />
          <ChartAxis position="left" />
        </>} height={320} />
}`,...g.parameters?.docs?.source},description:{story:`Error bars pair with a value mark (here, bars) to show a high/low range.`,...g.parameters?.docs?.description}}},_=[`OnBars`]})))()}v();export{g as OnBars,_ as __namedExportsOrder,h as default};