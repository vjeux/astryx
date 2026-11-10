import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{t}from"./jsx-runtime-MKhVqBIO.js";import{n,t as r}from"./useLocale-BdhI3KFf.js";import{a as i,i as a,n as o,o as s,r as c,t as l}from"./ChartAxis-BWrZPxJe.js";import{n as u,t as d}from"./ChartGrid-BGP-W357.js";import{n as f,t as p}from"./bar-BlJJsAlE.js";import{i as m,o as h,r as g,t as _}from"./_data-BZjSE72W.js";var v,y,b,x,S,C,w,T,E;function D(){return(D=e((()=>{a(),f(),u(),o(),s(),g(),r(),v=t(),y={title:`Charts/Bar`,component:c},b=(0,v.jsxs)(v.Fragment,{children:[(0,v.jsx)(l,{position:`bottom`}),(0,v.jsx)(l,{position:`left`})]}),x={render:()=>{let e=n();return(0,v.jsx)(c,{data:m,xKey:`month`,title:`Monthly Revenue`,series:[p(`revenue`,{color:`#3b82f6`})],tooltip:!0,grid:(0,v.jsx)(d,{}),axes:(0,v.jsxs)(v.Fragment,{children:[(0,v.jsx)(l,{position:`bottom`}),(0,v.jsx)(l,{position:`left`,tickFormat:i(`$`,e)})]}),height:300})}},S={render:()=>(0,v.jsx)(c,{data:m,xKey:`month`,title:`Revenue & Costs`,subtitle:`Stacked by category`,series:[p(`revenue`,{color:`#3b82f6`,stack:`totals`,label:`Revenue`}),p(`costs`,{color:`#ef4444`,stack:`totals`,label:`Costs`})],legend:{position:`bottom`,alignment:`center`},grid:(0,v.jsx)(d,{}),axes:b,height:300})},C={render:()=>(0,v.jsx)(c,{data:m,xKey:`month`,title:`Revenue vs Costs`,series:[p(`revenue`,{color:`#3b82f6`,group:`compare`,label:`Revenue`}),p(`costs`,{color:`#ef4444`,group:`compare`,label:`Costs`})],legend:{position:`top`,alignment:`end`},grid:(0,v.jsx)(d,{}),axes:b,height:300})},w={render:()=>(0,v.jsx)(c,{data:_,xKey:`month`,title:`Grouped + stacked`,series:[p(`revenueA`,{color:`#3b82f6`,stack:`a`,group:`cmp`}),p(`costsA`,{color:`#93c5fd`,stack:`a`,group:`cmp`}),p(`revenueB`,{color:`#ef4444`,stack:`b`,group:`cmp`}),p(`costsB`,{color:`#fca5a5`,stack:`b`,group:`cmp`})],grid:(0,v.jsx)(d,{}),axes:b,height:300})},T={render:()=>(0,v.jsx)(c,{data:h,xKey:`month`,title:`Profit / Loss`,series:[p(`profit`,{color:`#3b82f6`})],grid:(0,v.jsx)(d,{}),axes:b,height:300})},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  render: () => {
    const locale = useLocale();
    return <Chart data={monthlyData} xKey="month" title="Monthly Revenue" series={[bar('revenue', {
      color: '#3b82f6'
    })]} tooltip grid={<ChartGrid />} axes={<>
            <ChartAxis position="bottom" />
            <ChartAxis position="left" tickFormat={currency('$', locale)} />
          </>} height={300} />;
  }
}`,...x.parameters?.docs?.source}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  render: () => <Chart data={monthlyData} xKey="month" title="Revenue & Costs" subtitle="Stacked by category" series={[bar('revenue', {
    color: '#3b82f6',
    stack: 'totals',
    label: 'Revenue'
  }), bar('costs', {
    color: '#ef4444',
    stack: 'totals',
    label: 'Costs'
  })]} legend={{
    position: 'bottom',
    alignment: 'center'
  }} grid={<ChartGrid />} axes={axes} height={300} />
}`,...S.parameters?.docs?.source}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  render: () => <Chart data={monthlyData} xKey="month" title="Revenue vs Costs" series={[bar('revenue', {
    color: '#3b82f6',
    group: 'compare',
    label: 'Revenue'
  }), bar('costs', {
    color: '#ef4444',
    group: 'compare',
    label: 'Costs'
  })]} legend={{
    position: 'top',
    alignment: 'end'
  }} grid={<ChartGrid />} axes={axes} height={300} />
}`,...C.parameters?.docs?.source}}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  render: () => <Chart data={groupedStackData} xKey="month" title="Grouped + stacked" series={[bar('revenueA', {
    color: '#3b82f6',
    stack: 'a',
    group: 'cmp'
  }), bar('costsA', {
    color: '#93c5fd',
    stack: 'a',
    group: 'cmp'
  }), bar('revenueB', {
    color: '#ef4444',
    stack: 'b',
    group: 'cmp'
  }), bar('costsB', {
    color: '#fca5a5',
    stack: 'b',
    group: 'cmp'
  })]} grid={<ChartGrid />} axes={axes} height={300} />
}`,...w.parameters?.docs?.source}}},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  render: () => <Chart data={profitLossData} xKey="month" title="Profit / Loss" series={[bar('profit', {
    color: '#3b82f6'
  })]} grid={<ChartGrid />} axes={axes} height={300} />
}`,...T.parameters?.docs?.source}}},E=[`Simple`,`Stacked`,`Grouped`,`GroupedStacked`,`NegativeValues`]})))()}D();export{C as Grouped,w as GroupedStacked,T as NegativeValues,x as Simple,S as Stacked,E as __namedExportsOrder,y as default};