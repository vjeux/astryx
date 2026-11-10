import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{t}from"./react-DlPsW1c0.js";import{t as n}from"./jsx-runtime-MKhVqBIO.js";import{n as r,o as i,r as a,s as o}from"./useTheme-CUotWZgR.js";import{n as s,t as c}from"./Text-C5BHw0wv.js";import{n as l,t as u}from"./Button-DoGM0DEN.js";import{n as d,t as f}from"./Heading-YiIeUtHm.js";import{n as p,t as m}from"./Card-DA0ZfoAz.js";import{n as h,t as g}from"./Stack-C-3OCHCS.js";import{c as _,o as v}from"./iframe-B7UFaprG.js";import{i as y,t as b}from"./src-VpK2b54D.js";import{n as x,t as S}from"./chartThemingUtils-BODy-z9f.js";function C(){let{token:e}=a();return(0,E.useMemo)(()=>({background:e(`--color-background-card`),axis:{domainColor:e(`--color-border-emphasized`),gridColor:e(`--color-border`),labelColor:e(`--color-text-secondary`),labelFont:e(`--font-family-body`),titleColor:e(`--color-text-primary`),titleFont:e(`--font-family-heading`)},legend:{labelColor:e(`--color-text-secondary`),labelFont:e(`--font-family-body`),titleColor:e(`--color-text-primary`),titleFont:e(`--font-family-heading`)},range:{category:[e(`--color-data-categorical-blue`),e(`--color-data-categorical-orange`),e(`--color-data-categorical-purple`),e(`--color-data-categorical-green`)]},title:{color:e(`--color-text-primary`),font:e(`--font-family-heading`)},view:{stroke:null}}),[e])}function w(){let{token:e}=a(),[t,n]=(0,E.useState)(0),r=(0,E.useRef)(null),i=x(e(`--radius-element`)),o=e(`--color-data-categorical-blue`),s=C(),l=JSON.stringify(s),u=(0,E.useMemo)(()=>({$schema:`https://vega.github.io/schema/vega-lite/v6.json`,data:{name:`table`},description:`Quarterly revenue and costs: Q1 128 and 82, Q2 156 and 94, Q3 143 and 101, Q4 184 and 112.`,title:`Quarterly performance`,mark:{type:`bar`,cornerRadiusTopLeft:i,cornerRadiusTopRight:i},encoding:{x:{axis:{title:`Quarter`},field:`quarter`,type:`ordinal`},y:{axis:{title:`Value`},field:`value`,type:`quantitative`},color:{field:`series`,legend:{title:`Series`},type:`nominal`},tooltip:[{field:`quarter`,type:`ordinal`},{field:`series`,type:`nominal`},{field:`value`,type:`quantitative`}]}}),[i]);return(0,D.jsxs)(g,{direction:`vertical`,gap:3,children:[(0,D.jsx)(`div`,{className:`x1hviunn xb3r6kr`,"data-category-color":o,"data-config":l,"data-radius":i,"data-view-generation":t,children:(0,D.jsx)(y,{compileOptions:{config:s},data:{table:P},onReady:e=>{r.current!==e&&(r.current=e,n(e=>e+1))},spec:u,viewOptions:{renderer:`canvas`}})}),(0,D.jsxs)(c,{type:`supporting`,color:`secondary`,children:[`View generation: `,t,`. Changing concrete config rebuilds the Vega View, so products must restore any zoom, hover, or signal state they own.`]})]})}function T(){let[e,t]=(0,E.useState)(`light`);return(0,D.jsx)(v,{theme:N,mode:e,children:(0,D.jsx)(m,{children:(0,D.jsxs)(g,{direction:`vertical`,gap:4,children:[(0,D.jsxs)(g,{direction:`vertical`,gap:1,children:[(0,D.jsx)(f,{level:3,children:`Quarterly revenue`}),(0,D.jsx)(c,{type:`supporting`,color:`secondary`,children:`Vega receives concrete, serializable colors and theme typography.`})]}),(0,D.jsx)(u,{label:`Switch to ${e===`light`?`dark`:`light`} mode`,onClick:()=>t(e=>e===`light`?`dark`:`light`)}),(0,D.jsx)(w,{})]})})})}var E,D,O,k,A,j,M,N,P,F,I;function L(){return(L=e((()=>{E=t(),l(),p(),h(),s(),_(),o(),r(),b(),d(),S(),D=n(),{expect:O,userEvent:k,waitFor:A,within:j}=__STORYBOOK_MODULE_TEST__,M={title:`Lab/ChartTheming/Vega`,component:y,parameters:{docs:{description:{component:`Guide evidence for configuration-driven rendering with the existing Astryx Vega package. Theme values are concrete and JSON-safe; changing compile configuration rebuilds the current Vega View and can reset renderer-owned state.`}}}},N=i({name:`chart-theming-vega`,tokens:{"--color-data-categorical-blue":[`#005A4E`,`#72E1C1`],"--color-data-categorical-orange":[`#7A2E00`,`#FFB280`]}}),P=[{quarter:`Q1`,series:`Revenue`,value:128},{quarter:`Q1`,series:`Costs`,value:82},{quarter:`Q2`,series:`Revenue`,value:156},{quarter:`Q2`,series:`Costs`,value:94},{quarter:`Q3`,series:`Revenue`,value:143},{quarter:`Q3`,series:`Costs`,value:101},{quarter:`Q4`,series:`Revenue`,value:184},{quarter:`Q4`,series:`Costs`,value:112}],F={render:()=>(0,D.jsx)(T,{}),play:async({canvasElement:e})=>{let t=e.querySelector(`[data-view-generation]`);if(O(t).not.toBeNull(),!t)return;let n=()=>JSON.parse(t.dataset.config??`{}`);await A(()=>{O(Number(t.dataset.viewGeneration)).toBeGreaterThan(0),O(t.dataset.categoryColor).toBe(`#005A4E`),O(Number(t.dataset.radius)).toBeGreaterThan(5),O(t.dataset.config).not.toContain(`var(`);let e=n();O(e.axis?.domainColor).toBeTruthy(),O(e.axis?.gridColor).toBeTruthy(),O(e.axis?.titleFont).toBeTruthy(),O(e.range?.category?.slice(0,2)).toEqual([`#005A4E`,`#7A2E00`]),O(t.querySelector(`canvas`)).not.toBeNull()});let r=Number(t.dataset.viewGeneration),i=t.querySelector(`canvas`),a=j(e).getByRole(`button`,{name:`Switch to dark mode`});await k.click(a),await A(()=>{O(t.dataset.categoryColor).toBe(`#72E1C1`),O(n().range?.category?.slice(0,2)).toEqual([`#72E1C1`,`#FFB280`]),O(Number(t.dataset.viewGeneration)).toBeGreaterThan(r),O(t.querySelector(`canvas`)).not.toBe(i)})}},F.parameters={...F.parameters,docs:{...F.parameters?.docs,source:{originalSource:`{
  render: () => <RuntimeVegaThemeSwitch />,
  play: async ({
    canvasElement
  }) => {
    const wrapper = canvasElement.querySelector<HTMLElement>('[data-view-generation]');
    expect(wrapper).not.toBeNull();
    if (!wrapper) {
      return;
    }
    const readConfig = () => JSON.parse(wrapper.dataset.config ?? '{}') as Config & {
      axis?: {
        domainColor?: string;
        gridColor?: string;
        titleFont?: string;
      };
      range?: {
        category?: string[];
      };
    };
    await waitFor(() => {
      expect(Number(wrapper.dataset.viewGeneration)).toBeGreaterThan(0);
      expect(wrapper.dataset.categoryColor).toBe('#005A4E');
      expect(Number(wrapper.dataset.radius)).toBeGreaterThan(5);
      expect(wrapper.dataset.config).not.toContain('var(');
      const config = readConfig();
      expect(config.axis?.domainColor).toBeTruthy();
      expect(config.axis?.gridColor).toBeTruthy();
      expect(config.axis?.titleFont).toBeTruthy();
      expect(config.range?.category?.slice(0, 2)).toEqual(['#005A4E', '#7A2E00']);
      expect(wrapper.querySelector('canvas')).not.toBeNull();
    });
    const firstGeneration = Number(wrapper.dataset.viewGeneration);
    const firstCanvas = wrapper.querySelector('canvas');
    const modeButton = within(canvasElement).getByRole('button', {
      name: 'Switch to dark mode'
    });
    await userEvent.click(modeButton);
    await waitFor(() => {
      expect(wrapper.dataset.categoryColor).toBe('#72E1C1');
      expect(readConfig().range?.category?.slice(0, 2)).toEqual(['#72E1C1', '#FFB280']);
      expect(Number(wrapper.dataset.viewGeneration)).toBeGreaterThan(firstGeneration);
      expect(wrapper.querySelector('canvas')).not.toBe(firstCanvas);
    });
  }
}`,...F.parameters?.docs?.source}}},I=[`SerializedCanvasConfig`]})))()}L();export{F as SerializedCanvasConfig,I as __namedExportsOrder,M as default};