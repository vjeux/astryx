import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{t}from"./jsx-runtime-MKhVqBIO.js";import{i as n,n as r,r as i,t as a}from"./ChartAxis-BWrZPxJe.js";import{n as o,t as s}from"./ChartGrid-BGP-W357.js";import{n as c,t as l}from"./line-CYVOawK-.js";import{n as u,t as d}from"./band-D2JjtQ5S.js";import{a as f,r as p}from"./_data-BZjSE72W.js";var m,h,g,_;function v(){return(v=e((()=>{n(),u(),l(),o(),r(),p(),m=t(),h={title:`Charts/Band`,component:i},g={render:()=>(0,m.jsx)(i,{data:f,xKey:`x`,title:`Forecast with confidence bands`,series:[d({upper:`upper95`,lower:`lower95`,color:`#3b82f6`,opacity:.12}),d({upper:`upper80`,lower:`lower80`,color:`#3b82f6`,opacity:.22}),c(`mean`,{color:`#3b82f6`,strokeWidth:2})],grid:(0,m.jsx)(s,{}),axes:(0,m.jsxs)(m.Fragment,{children:[(0,m.jsx)(a,{position:`bottom`}),(0,m.jsx)(a,{position:`left`})]}),height:320})},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  render: () => <Chart data={predictionData} xKey="x" title="Forecast with confidence bands" series={[band({
    upper: 'upper95',
    lower: 'lower95',
    color: '#3b82f6',
    opacity: 0.12
  }), band({
    upper: 'upper80',
    lower: 'lower80',
    color: '#3b82f6',
    opacity: 0.22
  }), line('mean', {
    color: '#3b82f6',
    strokeWidth: 2
  })]} grid={<ChartGrid />} axes={<>
          <ChartAxis position="bottom" />
          <ChartAxis position="left" />
        </>} height={320} />
}`,...g.parameters?.docs?.source},description:{story:`Confidence bands (80% + 95%) around a forecast line.`,...g.parameters?.docs?.description}}},_=[`ConfidenceBands`]})))()}v();export{g as ConfidenceBands,_ as __namedExportsOrder,h as default};