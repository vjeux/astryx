import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{t}from"./react-DlPsW1c0.js";import{t as n}from"./jsx-runtime-MKhVqBIO.js";import{n as r,o as i,r as a,s as o}from"./useTheme-CUotWZgR.js";import{n as s,t as c}from"./Text-C5BHw0wv.js";import{n as l,t as u}from"./Button-DoGM0DEN.js";import{n as d,t as f}from"./Heading-YiIeUtHm.js";import{n as p,t as m}from"./Card-DA0ZfoAz.js";import{n as h,t as g}from"./Stack-C-3OCHCS.js";import{c as _,o as v}from"./iframe-B7UFaprG.js";import{n as y,t as b}from"./chartThemingUtils-BODy-z9f.js";function x(){let e=(0,w.useRef)(null),t=(0,w.useRef)(A++),n=(0,w.useRef)(0),{token:r}=a(),i=r(`--color-data-categorical-blue`),o=r(`--font-family-body`),s=r(`--text-supporting-size`),l=y(r(`--radius-element`));return(0,w.useEffect)(()=>{let t=e.current,a=t?.getContext(`2d`);t&&a&&(a.clearRect(0,0,t.width,t.height),a.fillStyle=i,a.beginPath(),a.roundRect(64,64,96,112,[l,l,0,0]),a.roundRect(240,24,96,152,[l,l,0,0]),a.fill(),a.fillStyle=r(`--color-text-secondary`),a.font=`${s} ${o}`,a.fillText(`Q1`,96,204),a.fillText(`Q2`,272,204),n.current+=1,t.dataset.drawCount=String(n.current))},[i,o,s,l,r]),(0,T.jsxs)(T.Fragment,{children:[(0,T.jsx)(`canvas`,{className:`x1lliihq xt7dq6l x193iq5w xht4xr3`,"aria-label":`Q1 is 112 units. Q2 is 152 units.`,"data-color":i,"data-font-family":o,"data-instance":t.current,"data-radius":l,height:240,ref:e,role:`img`,width:480}),(0,T.jsx)(c,{children:`Q1: 112 units · Q2: 152 units`})]})}function S(){let[e,t]=(0,w.useState)(`light`);return(0,T.jsx)(v,{theme:k,mode:e,children:(0,T.jsx)(m,{children:(0,T.jsxs)(g,{direction:`vertical`,gap:4,children:[(0,T.jsxs)(g,{direction:`vertical`,gap:1,children:[(0,T.jsx)(f,{level:3,children:`Quarterly comparison`}),(0,T.jsx)(c,{type:`supporting`,color:`secondary`,children:`Canvas uses a concrete color and redraws without replacing its drawing surface.`})]}),(0,T.jsx)(u,{label:`Switch to ${e===`light`?`dark`:`light`} mode`,onClick:()=>t(e=>e===`light`?`dark`:`light`)}),(0,T.jsx)(x,{})]})})})}function C(e){let t=e.getContext(`2d`);if(!t)throw Error(`Canvas 2D context is unavailable.`);return Array.from(t.getImageData(80,80,1,1).data)}var w,T,E,D,O,k,A,j,M;function N(){return(N=e((()=>{w=t(),l(),p(),h(),s(),_(),o(),r(),d(),b(),T=n(),{expect:E,waitFor:D}=__STORYBOOK_MODULE_TEST__,O={title:`Lab/ChartTheming/Canvas`,parameters:{docs:{description:{component:"Guide evidence for Canvas: `useTheme().token()` provides concrete theme values, and the same canvas redraws when mode changes."}}}},k=i({name:`chart-theming-canvas`,tokens:{"--color-data-categorical-blue":[`#005A4E`,`#72E1C1`]}}),A=1,j={render:()=>(0,T.jsx)(S,{}),play:async({canvasElement:e})=>{let t=e.querySelector(`canvas`);if(E(t).not.toBeNull(),!t)return;let n=t.dataset.instance;E(e).toHaveTextContent(`Q1: 112 units · Q2: 152 units`);let r=0;await D(()=>{E(t.dataset.color).toBe(`#005A4E`),E(t.dataset.fontFamily).not.toBe(``),E(Number(t.dataset.radius)).toBeGreaterThan(5),r=Number(t.dataset.drawCount),E(r).toBeGreaterThan(0),E(C(t)).toEqual([0,90,78,255])});let i=e.querySelector(`button`);E(i).toHaveTextContent(`Switch to dark mode`),i?.click(),await D(()=>{E(e.querySelector(`canvas`)).toBe(t),E(t.dataset.instance).toBe(n),E(t.dataset.color).toBe(`#72E1C1`),E(Number(t.dataset.drawCount)).toBeGreaterThan(r),E(C(t)).toEqual([114,225,193,255])})}},j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
  render: () => <RuntimeCanvasThemeSwitch />,
  play: async ({
    canvasElement
  }) => {
    const canvas = canvasElement.querySelector('canvas');
    expect(canvas).not.toBeNull();
    if (!canvas) {
      return;
    }
    const instance = canvas.dataset.instance;
    expect(canvasElement).toHaveTextContent('Q1: 112 units · Q2: 152 units');
    let initialDrawCount = 0;
    await waitFor(() => {
      expect(canvas.dataset.color).toBe('#005A4E');
      expect(canvas.dataset.fontFamily).not.toBe('');
      expect(Number(canvas.dataset.radius)).toBeGreaterThan(5);
      initialDrawCount = Number(canvas.dataset.drawCount);
      expect(initialDrawCount).toBeGreaterThan(0);
      expect(sampledBarPixel(canvas)).toEqual([0, 90, 78, 255]);
    });
    const button = canvasElement.querySelector('button');
    expect(button).toHaveTextContent('Switch to dark mode');
    button?.click();
    await waitFor(() => {
      expect(canvasElement.querySelector('canvas')).toBe(canvas);
      expect(canvas.dataset.instance).toBe(instance);
      expect(canvas.dataset.color).toBe('#72E1C1');
      expect(Number(canvas.dataset.drawCount)).toBeGreaterThan(initialDrawCount);
      expect(sampledBarPixel(canvas)).toEqual([114, 225, 193, 255]);
    });
  }
}`,...j.parameters?.docs?.source}}},M=[`RuntimeThemeSwitch`]})))()}N();export{j as RuntimeThemeSwitch,M as __namedExportsOrder,O as default};