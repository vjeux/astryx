import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{t}from"./react-DlPsW1c0.js";import{t as n}from"./jsx-runtime-MKhVqBIO.js";import{n as r,t as i}from"./Text-C5BHw0wv.js";import{n as a,t as o}from"./Stack-C-3OCHCS.js";import{i as s,n as c,r as l,t as u}from"./ChartAxis-mF7iE-u6.js";import{n as d,t as f}from"./ChartGrid-ClN8QD9n.js";import{n as p,t as m}from"./ChartBar-CefLAYNe.js";import{n as h,t as g}from"./ChartLine-C_QV7Zzw.js";import{n as _,t as v}from"./ChartArea-COzRjTbV.js";import{n as y,t as b}from"./ChartDot-C6zjGJ5n.js";import{n as x,t as S}from"./ChartDotGL-BLwF2zNY.js";import{n as C,t as w}from"./ChartHeatmapGL-Bzt1rqp9.js";import{n as T,t as E}from"./ChartTooltip-D_Rnbc5l.js";import{n as D,t as O}from"./ChartLegend-Bl4wpX1K.js";import{n as k,t as A}from"./useChartColors-BIiho9_u.js";import{n as j,t as M}from"./useDataset-OwVw8CiI.js";var N,P,F,I,L,R,z,B,V,H;function U(){return(U=e((()=>{N=t(),s(),c(),d(),p(),h(),y(),_(),T(),D(),x(),C(),A(),a(),r(),M(),P=n(),F={title:`Lab/Chart`,component:l,tags:[`autodocs`],parameters:{docs:{description:{component:`\`Chart\` — composable chart system built on d3. All marks share a single
coordinate space via React context.

Datasets from [vega-datasets](https://github.com/vega/vega-datasets) (CDN).`}}}},I={render:()=>{let e=k(),[t,n]=j(`barley.json`),r=(0,N.useMemo)(()=>{if(!t.length)return[];let e=new Map;for(let n of t){let t=e.get(n.variety)??{sum:0,count:0};t.sum+=n.yield,t.count+=1,e.set(n.variety,t)}return[...e.entries()].map(([e,{sum:t,count:n}])=>({variety:e,avgYield:Math.round(t/n*10)/10})).sort((e,t)=>t.avgYield-e.avgYield).slice(0,10)},[t]);return n?(0,P.jsx)(i,{type:`supporting`,children:`Loading…`}):(0,P.jsxs)(l,{data:r,xKey:`variety`,yKeys:[`avgYield`],height:300,children:[(0,P.jsx)(f,{horizontal:!0}),(0,P.jsx)(u,{position:`bottom`}),(0,P.jsx)(u,{position:`left`}),(0,P.jsx)(m,{dataKey:`avgYield`,color:e.categorical(1)[0]}),(0,P.jsx)(E,{})]})}},L={render:()=>{let e=k(),[t,n]=j(`stocks.csv`),r=(0,N.useMemo)(()=>{if(!t.length)return[];let e=t.filter(e=>e.symbol===`AAPL`||e.symbol===`GOOG`),n=new Map;for(let t of e){let e=n.get(t.date)??{date:t.date};e[t.symbol]=t.price,n.set(t.date,e)}return[...n.values()].filter(e=>e.AAPL!=null&&e.GOOG!=null).slice(-12)},[t]);if(n)return(0,P.jsx)(i,{type:`supporting`,children:`Loading…`});let a=e.categorical(2);return(0,P.jsxs)(l,{data:r,xKey:`date`,yKeys:[`AAPL`,`GOOG`],yBaseline:`data`,height:300,children:[(0,P.jsx)(f,{horizontal:!0}),(0,P.jsx)(u,{position:`bottom`}),(0,P.jsx)(u,{position:`left`}),(0,P.jsx)(g,{dataKey:`AAPL`,color:a[0],dots:!0}),(0,P.jsx)(g,{dataKey:`GOOG`,color:a[1],dots:!0}),(0,P.jsx)(O,{items:[{label:`AAPL`,color:a[0]},{label:`GOOG`,color:a[1]}]}),(0,P.jsx)(E,{})]})}},R={render:()=>{let e=k(),[t,n]=j(`cars.json`),r=(0,N.useMemo)(()=>t.filter(e=>e.Horsepower!=null&&e.Miles_per_Gallon!=null).map(e=>({hp:e.Horsepower,mpg:e.Miles_per_Gallon})),[t]);return n?(0,P.jsx)(i,{type:`supporting`,children:`Loading…`}):(0,P.jsxs)(l,{data:r,xKey:`hp`,yKeys:[`mpg`],yBaseline:`data`,height:350,children:[(0,P.jsx)(f,{horizontal:!0,vertical:!0}),(0,P.jsx)(u,{position:`bottom`}),(0,P.jsx)(u,{position:`left`}),(0,P.jsx)(b,{dataKey:`mpg`,color:e.categorical(1)[0],radius:3}),(0,P.jsx)(E,{crosshair:`xy`})]})}},z={render:()=>{let e=k(),[t,n]=j(`flights-10k.json`),r=(0,N.useMemo)(()=>t.filter(e=>e.delay!=null&&e.distance!=null).map(e=>({distance:e.distance,delay:e.delay})),[t]);return n?(0,P.jsx)(i,{type:`supporting`,children:`Loading 10k flights…`}):(0,P.jsxs)(o,{direction:`vertical`,gap:2,children:[(0,P.jsxs)(i,{type:`supporting`,color:`secondary`,children:[r.length.toLocaleString(),` flights`]}),(0,P.jsxs)(l,{data:r,xKey:`distance`,yKeys:[`delay`],yBaseline:`zero`,height:400,children:[(0,P.jsx)(f,{horizontal:!0}),(0,P.jsx)(u,{position:`bottom`}),(0,P.jsx)(u,{position:`left`}),(0,P.jsx)(S,{dataKey:`delay`,color:e.categorical(1)[0],size:3,opacity:.3})]})]})}},B={render:()=>{let e=k(),[t,n]=j(`seattle-weather.csv`),r=(0,N.useMemo)(()=>{if(!t.length)return[];let e=new Map;for(let n of t){let t=String(n.date).slice(0,7),r=e.get(t)??{maxSum:0,minSum:0,count:0};r.maxSum+=n.temp_max,r.minSum+=n.temp_min,r.count+=1,e.set(t,r)}return[...e.entries()].map(([e,{maxSum:t,minSum:n,count:r}])=>({month:e,avgMax:Math.round(t/r*10)/10,avgMin:Math.round(n/r*10)/10,avgMid:Math.round((t+n)/(r*2)*10)/10})).sort((e,t)=>e.month.localeCompare(t.month)).slice(-24)},[t]);return n?(0,P.jsx)(i,{type:`supporting`,children:`Loading…`}):(0,P.jsxs)(l,{data:r,xKey:`month`,yKeys:[`avgMax`,`avgMin`],yBaseline:`data`,height:300,children:[(0,P.jsx)(f,{horizontal:!0}),(0,P.jsx)(u,{position:`bottom`}),(0,P.jsx)(u,{position:`left`}),(0,P.jsx)(v,{yUpper:`avgMax`,yLower:`avgMin`,color:e.categorical(1)[0],opacity:.15}),(0,P.jsx)(g,{dataKey:`avgMid`,color:e.categorical(1)[0],dots:!0}),(0,P.jsx)(E,{})]})}},V={render:()=>{let e=k(),[t,n]=j(`gapminder.json`),r=(0,N.useMemo)(()=>{if(!t.length)return[];let e=[`United States`,`China`,`India`,`Brazil`,`Japan`,`Germany`,`Nigeria`,`Russia`];return t.filter(t=>e.includes(t.country)&&t.year>=1960&&t.year%10==0).map(e=>({country:e.country,year:String(e.year),lifeExp:Math.round(e.life_expect)}))},[t]);return n?(0,P.jsx)(i,{type:`supporting`,children:`Loading…`}):(0,P.jsxs)(l,{data:r,xKey:`year`,yKeys:[`lifeExp`],height:300,children:[(0,P.jsx)(u,{position:`bottom`}),(0,P.jsx)(w,{xKey:`year`,yKey:`country`,valueKey:`lifeExp`,colorRange:e.sequential.blue(5)}),(0,P.jsx)(O,{gradient:e.sequential.blue(5),domain:[30,85],label:`Life Expectancy`})]})}},I.parameters={...I.parameters,docs:{...I.parameters?.docs,source:{originalSource:`{
  render: () => {
    const colors = useChartColors();
    const [raw, loading] = useDataset<Barley>('barley.json');
    const data = useMemo(() => {
      if (!raw.length) {
        return [];
      }
      const byVariety = new Map<string, {
        sum: number;
        count: number;
      }>();
      for (const d of raw) {
        const e = byVariety.get(d.variety) ?? {
          sum: 0,
          count: 0
        };
        e.sum += d.yield;
        e.count += 1;
        byVariety.set(d.variety, e);
      }
      return [...byVariety.entries()].map(([variety, {
        sum,
        count
      }]) => ({
        variety,
        avgYield: Math.round(sum / count * 10) / 10
      })).sort((a, b) => b.avgYield - a.avgYield).slice(0, 10);
    }, [raw]);
    if (loading) {
      return <Text type="supporting">Loading…</Text>;
    }
    return <Chart data={data} xKey="variety" yKeys={['avgYield']} height={300}>
        <ChartGrid horizontal />
        <ChartAxis position="bottom" />
        <ChartAxis position="left" />
        <ChartBar dataKey="avgYield" color={colors.categorical(1)[0]} />
        <ChartTooltip />
      </Chart>;
  }
}`,...I.parameters?.docs?.source},description:{story:`Iowa barley yields — average by variety (barley.json)`,...I.parameters?.docs?.description}}},L.parameters={...L.parameters,docs:{...L.parameters?.docs,source:{originalSource:`{
  render: () => {
    const colors = useChartColors();
    const [raw, loading] = useDataset<Stock>('stocks.csv');
    const data = useMemo(() => {
      if (!raw.length) {
        return [];
      }
      const filtered = raw.filter(d => d.symbol === 'AAPL' || d.symbol === 'GOOG');
      const byDate = new Map<string, Record<string, unknown>>();
      for (const d of filtered) {
        const e = byDate.get(d.date) ?? {
          date: d.date
        };
        e[d.symbol] = d.price;
        byDate.set(d.date, e);
      }
      return [...byDate.values()].filter(d => d.AAPL != null && d.GOOG != null).slice(-12);
    }, [raw]);
    if (loading) {
      return <Text type="supporting">Loading…</Text>;
    }
    const c = colors.categorical(2);
    return <Chart data={data} xKey="date" yKeys={['AAPL', 'GOOG']} yBaseline="data" height={300}>
        <ChartGrid horizontal />
        <ChartAxis position="bottom" />
        <ChartAxis position="left" />
        <ChartLine dataKey="AAPL" color={c[0]} dots />
        <ChartLine dataKey="GOOG" color={c[1]} dots />
        <ChartLegend items={[{
        label: 'AAPL',
        color: c[0]
      }, {
        label: 'GOOG',
        color: c[1]
      }]} />
        <ChartTooltip />
      </Chart>;
  }
}`,...L.parameters?.docs?.source},description:{story:`AAPL vs GOOG monthly prices (stocks.csv)`,...L.parameters?.docs?.description}}},R.parameters={...R.parameters,docs:{...R.parameters?.docs,source:{originalSource:`{
  render: () => {
    const colors = useChartColors();
    const [raw, loading] = useDataset<Car>('cars.json');
    const data = useMemo(() => {
      return raw.filter(d => d.Horsepower != null && d.Miles_per_Gallon != null).map(d => ({
        hp: d.Horsepower,
        mpg: d.Miles_per_Gallon
      }));
    }, [raw]);
    if (loading) {
      return <Text type="supporting">Loading…</Text>;
    }
    return <Chart data={data} xKey="hp" yKeys={['mpg']} yBaseline="data" height={350}>
        <ChartGrid horizontal vertical />
        <ChartAxis position="bottom" />
        <ChartAxis position="left" />
        <ChartDot dataKey="mpg" color={colors.categorical(1)[0]} radius={3} />
        <ChartTooltip crosshair="xy" />
      </Chart>;
  }
}`,...R.parameters?.docs?.source},description:{story:`Horsepower vs MPG — 406 cars (cars.json)`,...R.parameters?.docs?.description}}},z.parameters={...z.parameters,docs:{...z.parameters?.docs,source:{originalSource:`{
  render: () => {
    const colors = useChartColors();
    const [raw, loading] = useDataset<Flight>('flights-10k.json');
    const data = useMemo(() => {
      return raw.filter(d => d.delay != null && d.distance != null).map(d => ({
        distance: d.distance,
        delay: d.delay
      }));
    }, [raw]);
    if (loading) {
      return <Text type="supporting">Loading 10k flights…</Text>;
    }
    return <Stack direction="vertical" gap={2}>
        <Text type="supporting" color="secondary">
          {data.length.toLocaleString()} flights
        </Text>
        <Chart data={data} xKey="distance" yKeys={['delay']} yBaseline="zero" height={400}>
          <ChartGrid horizontal />
          <ChartAxis position="bottom" />
          <ChartAxis position="left" />
          <ChartDotGL dataKey="delay" color={colors.categorical(1)[0]} size={3} opacity={0.3} />
        </Chart>
      </Stack>;
  }
}`,...z.parameters?.docs?.source},description:{story:`Flight delay vs distance — 10k points via WebGL (flights-10k.json)`,...z.parameters?.docs?.description}}},B.parameters={...B.parameters,docs:{...B.parameters?.docs,source:{originalSource:`{
  render: () => {
    const colors = useChartColors();
    const [raw, loading] = useDataset<Weather>('seattle-weather.csv');
    const data = useMemo(() => {
      if (!raw.length) {
        return [];
      }
      const byMonth = new Map<string, {
        maxSum: number;
        minSum: number;
        count: number;
      }>();
      for (const d of raw) {
        const month = String(d.date).slice(0, 7);
        const e = byMonth.get(month) ?? {
          maxSum: 0,
          minSum: 0,
          count: 0
        };
        e.maxSum += d.temp_max;
        e.minSum += d.temp_min;
        e.count += 1;
        byMonth.set(month, e);
      }
      return [...byMonth.entries()].map(([month, {
        maxSum,
        minSum,
        count
      }]) => ({
        month,
        avgMax: Math.round(maxSum / count * 10) / 10,
        avgMin: Math.round(minSum / count * 10) / 10,
        avgMid: Math.round((maxSum + minSum) / (count * 2) * 10) / 10
      })).sort((a, b) => a.month.localeCompare(b.month)).slice(-24);
    }, [raw]);
    if (loading) {
      return <Text type="supporting">Loading…</Text>;
    }
    return <Chart data={data} xKey="month" yKeys={['avgMax', 'avgMin']} yBaseline="data" height={300}>
        <ChartGrid horizontal />
        <ChartAxis position="bottom" />
        <ChartAxis position="left" />
        <ChartArea yUpper="avgMax" yLower="avgMin" color={colors.categorical(1)[0]} opacity={0.15} />
        <ChartLine dataKey="avgMid" color={colors.categorical(1)[0]} dots />
        <ChartTooltip />
      </Chart>;
  }
}`,...B.parameters?.docs?.source},description:{story:`Seattle temperature range — monthly avg min/max band (seattle-weather.csv)`,...B.parameters?.docs?.description}}},V.parameters={...V.parameters,docs:{...V.parameters?.docs,source:{originalSource:`{
  render: () => {
    const colors = useChartColors();
    const [raw, loading] = useDataset<Gapminder>('gapminder.json');
    const data = useMemo(() => {
      if (!raw.length) {
        return [];
      }
      const countries = ['United States', 'China', 'India', 'Brazil', 'Japan', 'Germany', 'Nigeria', 'Russia'];
      return raw.filter(d => countries.includes(d.country) && d.year >= 1960 && d.year % 10 === 0).map(d => ({
        country: d.country,
        year: String(d.year),
        lifeExp: Math.round(d.life_expect)
      }));
    }, [raw]);
    if (loading) {
      return <Text type="supporting">Loading…</Text>;
    }
    return <Chart data={data} xKey="year" yKeys={['lifeExp']} height={300}>
        <ChartAxis position="bottom" />
        <ChartHeatmapGL xKey="year" yKey="country" valueKey="lifeExp" colorRange={colors.sequential.blue(5)} />
        <ChartLegend gradient={colors.sequential.blue(5)} domain={[30, 85]} label="Life Expectancy" />
      </Chart>;
  }
}`,...V.parameters?.docs?.source},description:{story:`Life expectancy by country × decade (gapminder.json)`,...V.parameters?.docs?.description}}},H=[`BarChart`,`LineChart`,`ScatterPlot`,`WebGLScatter`,`ConfidenceBand`,`Heatmap`]})))()}U();export{I as BarChart,B as ConfidenceBand,V as Heatmap,L as LineChart,R as ScatterPlot,z as WebGLScatter,H as __namedExportsOrder,F as default};