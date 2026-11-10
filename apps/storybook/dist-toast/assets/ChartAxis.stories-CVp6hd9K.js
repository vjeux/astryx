import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{t}from"./jsx-runtime-MKhVqBIO.js";import{i as n,n as r,r as i,t as a}from"./ChartAxis-BWrZPxJe.js";import{n as o,t as s}from"./bar-BlJJsAlE.js";var c,l,u,d,f,p,m,h;function g(){return(g=e((()=>{n(),r(),o(),c=t(),l=[{month:`January`,value:18},{month:`February`,value:31},{month:`March`,value:24},{month:`April`,value:42}],u=[{month:`👨‍👩‍👧‍👦 Family`,value:18},{month:`👩🏽‍🚀 Space`,value:31},{month:`🇯🇵 Japan`,value:24},{month:`éclair`,value:42}],d={title:`Charts/Chrome/ChartAxis`,component:a,tags:[`autodocs`],args:{position:`bottom`},argTypes:{tickFormat:{control:!1}},render:e=>(0,c.jsx)(i,{data:l,xKey:`month`,series:[s(`value`)],axes:(0,c.jsx)(a,{...e}),height:300})},f={},p={render:()=>(0,c.jsx)(i,{data:l,xKey:`month`,series:[s(`value`)],axes:(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(a,{position:`top`,showAxisLine:!0,showTicks:!0}),(0,c.jsx)(a,{position:`right`,showAxisLine:!0,showTicks:!0}),(0,c.jsx)(a,{position:`bottom`,showAxisLine:!0,showTicks:!0}),(0,c.jsx)(a,{position:`left`,showAxisLine:!0,showTicks:!0})]}),height:300})},m={args:{position:`bottom`,truncate:1,animated:!1},render:e=>(0,c.jsx)(i,{data:u,xKey:`month`,series:[s(`value`)],axes:(0,c.jsx)(a,{...e}),height:300})},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{}`,...f.parameters?.docs?.source},description:{story:`Drive every ChartAxis prop against one stable categorical/linear chart.`,...f.parameters?.docs?.description}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  render: () => <Chart data={DATA} xKey="month" series={[bar('value')]} axes={<>
          <ChartAxis position="top" showAxisLine showTicks />
          <ChartAxis position="right" showAxisLine showTicks />
          <ChartAxis position="bottom" showAxisLine showTicks />
          <ChartAxis position="left" showAxisLine showTicks />
        </>} height={300} />
}`,...p.parameters?.docs?.source},description:{story:`Compare all four physical plot-edge placements in one chart.`,...p.parameters?.docs?.description}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    position: 'bottom',
    truncate: 1,
    animated: false
  },
  render: args => <Chart data={GRAPHEME_DATA} xKey="month" series={[bar('value')]} axes={<ChartAxis {...args} />} height={300} />
}`,...m.parameters?.docs?.source},description:{story:`Truncation keeps each user-perceived character intact before the ellipsis.`,...m.parameters?.docs?.description}}},h=[`Playground`,`AllPositions`,`GraphemeTruncation`]})))()}g();export{p as AllPositions,m as GraphemeTruncation,f as Playground,h as __namedExportsOrder,d as default};