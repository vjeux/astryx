import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{t}from"./jsx-runtime-MKhVqBIO.js";import{i as n,n as r,r as i,t as a}from"./ChartAxis-BWrZPxJe.js";import{n as o,t as s}from"./ChartGrid-BGP-W357.js";import{n as c,t as l}from"./bar-BlJJsAlE.js";import{n as u,t as d}from"./line-CYVOawK-.js";var f,p,m,h,g,_;function v(){return(v=e((()=>{n(),r(),o(),c(),d(),f=t(),p=[{month:`Jan`,revenue:42,trend:38},{month:`Feb`,revenue:58,trend:46},{month:`Mar`,revenue:51,trend:49},{month:`Apr`,revenue:74,trend:61},{month:`May`,revenue:68,trend:65},{month:`Jun`,revenue:86,trend:72}],m=Array.from({length:51},(e,t)=>({month:`Period ${t+1}`,revenue:40+t%8*6,trend:42+t*.75})),h={title:`Charts/Chart`,tags:[`autodocs`],argTypes:{dataState:{control:`inline-radio`,options:[`default`,`empty`,`large`]},titleState:{control:`inline-radio`,options:[`default`,`none`,`long`]},legendPosition:{control:`inline-radio`,options:[`off`,`top`,`bottom`,`start`,`end`]},hasTooltip:{control:`boolean`},height:{control:{type:`range`,min:160,max:480,step:20}}},args:{dataState:`default`,titleState:`default`,legendPosition:`bottom`,hasTooltip:!0,height:300}},g={render:({dataState:e,titleState:t,legendPosition:n,hasTooltip:r,height:o})=>{let c=e===`empty`?[]:e===`large`?m:p,d=t===`none`?void 0:t===`long`?`Monthly revenue across every regional sales program and reporting period`:`Monthly revenue`,h=t===`long`?`A deliberately expanded description that verifies the chart heading wraps without hiding the plot or creating horizontal scrolling.`:void 0;return(0,f.jsx)(i,{data:c,xKey:`month`,series:[l(`revenue`,{group:`comparison`,label:`Revenue`}),u(`trend`,{label:`Trend`})],title:d,subtitle:h,legend:n!==`off`&&{position:n},tooltip:r,grid:(0,f.jsx)(s,{horizontal:!0}),axes:(0,f.jsxs)(f.Fragment,{children:[(0,f.jsx)(a,{position:`bottom`}),(0,f.jsx)(a,{position:`left`})]}),height:o})}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  render: ({
    dataState,
    titleState,
    legendPosition,
    hasTooltip,
    height
  }) => {
    const data = dataState === 'empty' ? [] : dataState === 'large' ? largeData : monthlyData;
    const title = titleState === 'none' ? undefined : titleState === 'long' ? 'Monthly revenue across every regional sales program and reporting period' : 'Monthly revenue';
    const subtitle = titleState === 'long' ? 'A deliberately expanded description that verifies the chart heading wraps without hiding the plot or creating horizontal scrolling.' : undefined;
    return <Chart data={data} xKey="month" series={[bar('revenue', {
      group: 'comparison',
      label: 'Revenue'
    }), line('trend', {
      label: 'Trend'
    })]} title={title} subtitle={subtitle} legend={legendPosition === 'off' ? false : {
      position: legendPosition
    }} tooltip={hasTooltip} grid={<ChartGrid horizontal />} axes={<>
            <ChartAxis position="bottom" />
            <ChartAxis position="left" />
          </>} height={height} />;
  }
}`,...g.parameters?.docs?.source},description:{story:`Reusable Chart-root fixture for normal, empty, large-data, long-text,
legend-position, tooltip, and height evidence.`,...g.parameters?.docs?.description}}},_=[`Playground`]})))()}v();export{g as Playground,_ as __namedExportsOrder,h as default};