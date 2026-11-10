import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{t}from"./jsx-runtime-MKhVqBIO.js";import{i as n,n as r,r as i,t as a}from"./ChartAxis-BWrZPxJe.js";import{n as o,t as s}from"./ChartGrid-BGP-W357.js";import{n as c,t as l}from"./bar-BlJJsAlE.js";import{n as u,t as d}from"./line-CYVOawK-.js";import{n as f,t as p}from"./referenceLine-D8YblTtD.js";import{a as m,r as h,s as g}from"./_data-BZjSE72W.js";var _,v,y,b,x,S,C;function w(){return(w=e((()=>{n(),c(),d(),p(),o(),r(),h(),_=t(),v={title:`Charts/Reference Line`,component:i},y=(0,_.jsxs)(_.Fragment,{children:[(0,_.jsx)(a,{position:`bottom`}),(0,_.jsx)(a,{position:`left`})]}),b={render:()=>(0,_.jsx)(i,{data:g,xKey:`month`,title:`Sales vs target`,series:[l(`sales`,{color:`#3b82f6`}),f({y:50,label:`Target`,color:`#ef4444`})],grid:(0,_.jsx)(s,{}),axes:y,height:300})},x={render:()=>(0,_.jsx)(i,{data:g,xKey:`month`,title:`Acceptable range`,series:[l(`sales`,{color:`#3b82f6`}),f({y:40,y2:60,label:`Acceptable`,color:`#22c55e`,bandOpacity:.12})],grid:(0,_.jsx)(s,{}),axes:y,height:300})},S={render:()=>(0,_.jsx)(i,{data:m,xKey:`x`,title:`Event marker`,series:[u(`mean`,{color:`#3b82f6`}),f({x:10,label:`Launch`,color:`#6b1efd`})],grid:(0,_.jsx)(s,{}),axes:y,height:300})},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  render: () => <Chart data={salesData} xKey="month" title="Sales vs target" series={[bar('sales', {
    color: '#3b82f6'
  }), referenceLine({
    y: 50,
    label: 'Target',
    color: '#ef4444'
  })]} grid={<ChartGrid />} axes={axes} height={300} />
}`,...b.parameters?.docs?.source},description:{story:`A single horizontal reference line at a fixed y value.`,...b.parameters?.docs?.description}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  render: () => <Chart data={salesData} xKey="month" title="Acceptable range" series={[bar('sales', {
    color: '#3b82f6'
  }), referenceLine({
    y: 40,
    y2: 60,
    label: 'Acceptable',
    color: '#22c55e',
    bandOpacity: 0.12
  })]} grid={<ChartGrid />} axes={axes} height={300} />
}`,...x.parameters?.docs?.source},description:{story:`A shaded band between two y values (y + y2).`,...x.parameters?.docs?.description}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  render: () => <Chart data={predictionData} xKey="x" title="Event marker" series={[line('mean', {
    color: '#3b82f6'
  }), referenceLine({
    x: 10,
    label: 'Launch',
    color: '#6b1efd'
  })]} grid={<ChartGrid />} axes={axes} height={300} />
}`,...S.parameters?.docs?.source},description:{story:`A vertical reference line at a fixed x value (linear x scale only).`,...S.parameters?.docs?.description}}},C=[`Horizontal`,`Band`,`Vertical`]})))()}w();export{x as Band,b as Horizontal,S as Vertical,C as __namedExportsOrder,v as default};