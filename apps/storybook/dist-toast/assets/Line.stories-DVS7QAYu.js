import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{t}from"./jsx-runtime-MKhVqBIO.js";import{i as n,n as r,r as i,t as a}from"./ChartAxis-BWrZPxJe.js";import{n as o,t as s}from"./ChartGrid-BGP-W357.js";import{n as c,t as l}from"./line-CYVOawK-.js";import{i as u,r as d}from"./_data-BZjSE72W.js";var f,p,m,h,g,_,v,y;function b(){return(b=e((()=>{n(),l(),o(),r(),d(),f=t(),p={title:`Charts/Line`,component:i},m=(0,f.jsxs)(f.Fragment,{children:[(0,f.jsx)(a,{position:`bottom`}),(0,f.jsx)(a,{position:`left`})]}),h={render:()=>(0,f.jsx)(i,{data:u,xKey:`month`,title:`Trend`,series:[c(`trend`,{color:`#3b82f6`})],tooltip:!0,grid:(0,f.jsx)(s,{}),axes:m,height:300})},g={render:()=>(0,f.jsx)(i,{data:u,xKey:`month`,series:[c(`trend`,{color:`#3b82f6`,dots:!0,strokeWidth:2})],grid:(0,f.jsx)(s,{}),axes:m,height:300})},_={render:()=>(0,f.jsx)(i,{data:u,xKey:`month`,series:[c(`revenue`,{color:`#3b82f6`,label:`Revenue`}),c(`costs`,{color:`#ef4444`,label:`Costs`}),c(`trend`,{color:`#f59e0b`,label:`Trend`})],legend:!0,grid:(0,f.jsx)(s,{}),axes:m,height:300})},v={render:()=>(0,f.jsx)(i,{data:u,xKey:`month`,subtitle:`linear vs monotone vs step`,series:[c(`revenue`,{color:`#3b82f6`,curve:`linear`,label:`linear`}),c(`costs`,{color:`#22c55e`,curve:`monotone`,label:`monotone`}),c(`trend`,{color:`#f59e0b`,curve:`step`,label:`step`})],legend:!0,grid:(0,f.jsx)(s,{}),axes:m,height:300})},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  render: () => <Chart data={monthlyData} xKey="month" title="Trend" series={[line('trend', {
    color: '#3b82f6'
  })]} tooltip grid={<ChartGrid />} axes={axes} height={300} />
}`,...h.parameters?.docs?.source}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  render: () => <Chart data={monthlyData} xKey="month" series={[line('trend', {
    color: '#3b82f6',
    dots: true,
    strokeWidth: 2
  })]} grid={<ChartGrid />} axes={axes} height={300} />
}`,...g.parameters?.docs?.source}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  render: () => <Chart data={monthlyData} xKey="month" series={[line('revenue', {
    color: '#3b82f6',
    label: 'Revenue'
  }), line('costs', {
    color: '#ef4444',
    label: 'Costs'
  }), line('trend', {
    color: '#f59e0b',
    label: 'Trend'
  })]} legend grid={<ChartGrid />} axes={axes} height={300} />
}`,..._.parameters?.docs?.source}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  render: () => <Chart data={monthlyData} xKey="month" subtitle="linear vs monotone vs step" series={[line('revenue', {
    color: '#3b82f6',
    curve: 'linear',
    label: 'linear'
  }), line('costs', {
    color: '#22c55e',
    curve: 'monotone',
    label: 'monotone'
  }), line('trend', {
    color: '#f59e0b',
    curve: 'step',
    label: 'step'
  })]} legend grid={<ChartGrid />} axes={axes} height={300} />
}`,...v.parameters?.docs?.source}}},y=[`Simple`,`WithDots`,`MultiSeries`,`Curves`]})))()}b();export{v as Curves,_ as MultiSeries,h as Simple,g as WithDots,y as __namedExportsOrder,p as default};