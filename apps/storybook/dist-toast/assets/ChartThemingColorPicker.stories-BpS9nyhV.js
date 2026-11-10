import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{t}from"./react-DlPsW1c0.js";import{n,t as r}from"./stylex-BSlGVhGe.js";import{i,p as a}from"./tokens.stylex-uC3T-IhP.js";import{t as o}from"./jsx-runtime-MKhVqBIO.js";import{n as s,o as c,r as l,s as u}from"./useTheme-CUotWZgR.js";import{n as d,t as f}from"./Text-C5BHw0wv.js";import{n as p,t as m}from"./Button-DoGM0DEN.js";import{n as h,t as g}from"./Heading-YiIeUtHm.js";import{n as _,t as v}from"./Card-DA0ZfoAz.js";import{n as y,t as b}from"./Stack-C-3OCHCS.js";import{c as x,o as S}from"./iframe-B7UFaprG.js";import{n as C,t as w}from"./dataTokens.stylex-Daq6jXb2.js";function T(e){return/^#[0-9A-F]{6}$/i.test(e)?e.toUpperCase():void 0}function E({mode:e,onModeChange:t}){let{token:r}=l(),[i,a]=(0,O.useState)(),[o,s]=(0,O.useState)(`#336699`),c=i?.kind===`custom`?i.color:r(i?.token??V),u=i?.kind===`custom`?i.color:w[i?.token??V],d=i?.kind??`automatic`,p=()=>{let e=T(o);e&&a({kind:`custom`,color:e})};return(0,k.jsx)(v,{children:(0,k.jsxs)(b,{direction:`vertical`,gap:4,children:[(0,k.jsxs)(b,{direction:`vertical`,gap:1,children:[(0,k.jsx)(g,{level:3,children:`Series color`}),(0,k.jsx)(f,{type:`supporting`,color:`secondary`,children:`Theme choices follow the current mode. Exact custom colors stay fixed.`})]}),(0,k.jsxs)(`div`,{className:`xpqajaz xwmxj5m x1hviunn x78zum5 x18g69wz x1isuwpm x1gt495`,children:[(0,k.jsx)(`div`,{...n(R.bar(u,112)),"data-chart-color-preview":!0}),(0,k.jsx)(`div`,{...n(R.bar(w[`--color-data-categorical-orange`],164))})]}),(0,k.jsxs)(`div`,{className:`x6s0dn4 x78zum5 x1a02dak x1txdalj`,"aria-label":`Theme color choices`,role:`group`,children:[(0,k.jsx)(m,{"aria-pressed":i===void 0,label:`Automatic`,onClick:()=>a(void 0),variant:i===void 0?`primary`:`secondary`}),B.map(e=>{let t=i?.kind===`theme`&&i.token===e.id;return(0,k.jsxs)(`div`,{className:`x6s0dn4 x78zum5 xdt5ytf xzye2dw`,children:[(0,k.jsx)(`button`,{...n(R.swatch(w[e.id],t)),"aria-label":`${e.label} chart color`,"aria-pressed":t,"data-color-token":e.id,onClick:()=>a({kind:`theme`,token:e.id}),type:`button`}),(0,k.jsx)(f,{type:`supporting`,children:e.label})]},e.id)})]}),(0,k.jsxs)(`div`,{className:`x6s0dn4 x78zum5 x1a02dak x1txdalj`,children:[(0,k.jsx)(`input`,{className:`xc9qbxq x14i3s5s xh6dtrn x1y0btm7 xmkeg23 x1useyqa x1i3ajwb`,"aria-label":`Exact custom color`,onChange:e=>s(e.currentTarget.value),type:`color`,value:o}),(0,k.jsx)(m,{label:`Apply custom color`,onClick:p}),(0,k.jsx)(m,{label:`Reset`,onClick:()=>a(void 0),variant:`secondary`}),(0,k.jsx)(m,{label:`Switch to ${e===`light`?`dark`:`light`} mode`,onClick:t,variant:`secondary`})]}),(0,k.jsx)(f,{children:(0,k.jsxs)(`span`,{"data-choice-state":d,"data-preview-color":c,children:[d===`automatic`?`Automatic`:d===`theme`?`Theme color`:`Custom color`,`: `,c]})})]})})}function D(){let[e,t]=(0,O.useState)(`light`);return(0,k.jsx)(S,{theme:z,mode:e,children:(0,k.jsx)(E,{mode:e,onModeChange:()=>t(e=>e===`light`?`dark`:`light`)})})}var O,k,A,j,M,N,P,F,I,L,R,z,B,V,H,U;function W(){return(W=e((()=>{O=t(),r(),p(),_(),y(),d(),x(),u(),s(),C(),a(),h(),k=o(),{expect:A,fireEvent:j,userEvent:M,waitFor:N,within:P}=__STORYBOOK_MODULE_TEST__,F={title:`Lab/ChartTheming/ColorPicker`,parameters:{docs:{description:{component:`Product-owned chart color workflow using existing Astryx theme APIs: Automatic, curated theme choices, an exact custom color, and Reset.`}}}},I={kaIpWk:`xvenn6m`,krdFHd:``,kfmiAY:``,kVL7Gh:``,kT0f0o:``,kIxVMA:``,ksF3WI:``,kqGeR4:``,kYm2EN:``,kzqmXN:`xni59qk`,$$css:!0},L={kzOINU:``,kGJrpR:``,kaZRDh:``,kBCPoo:``,k26BEO:``,k5QoK5:``,kLZC3w:``,kL6WhQ:``,kaIpWk:`xjspbzw`,krdFHd:``,kfmiAY:``,kVL7Gh:``,kT0f0o:``,kIxVMA:``,ksF3WI:``,kqGeR4:``,kYm2EN:``,ksu8eU:`x1y0btm7`,kJRH4f:``,kVhnKS:``,k4WBpm:``,k8ry5P:``,kSWEuD:``,kDUl1X:``,kPef9Z:``,kfdmCh:``,kMzoRj:`x1mw0n95`,kjGldf:``,k2ei4v:``,kZ1KPB:``,ke9TFa:``,kWqL5O:``,kLoX6v:``,kEafiO:``,kt9PQ7:``,kZKoxP:`xc9qbxq`,kkrTdU:`x1ypdohk`,kzqmXN:`x14qfxbe`,$$css:!0},R={bar:(e,t)=>[I,{kWkggS:e==null?e:`xl8spv7`,kZKoxP:t==null?t:`x16ye13r`,$$css:!0},{"--x-backgroundColor":e??void 0,"--x-height":(e=>typeof e==`number`?e+`px`:e??void 0)(t)}],swatch:(e,t)=>[L,{kWkggS:e==null?e:`xl8spv7`,kVAM5u:(t?i[`--color-border-emphasized`]:i[`--color-border`])==null?t?i[`--color-border-emphasized`]:i[`--color-border`]:`x6w5c0t`,$$css:!0},{"--x-backgroundColor":e??void 0,"--x-borderColor":(t?i[`--color-border-emphasized`]:i[`--color-border`])==null?void 0:t?i[`--color-border-emphasized`]:i[`--color-border`],"--x-borderWidth":(e=>typeof e==`number`?e+`px`:e??void 0)(t?3:1)}]},z=c({name:`chart-color-picker`,tokens:{"--color-data-categorical-blue":[`#005A4E`,`#72E1C1`],"--color-data-categorical-orange":[`#7A2E00`,`#FFB280`],"--color-data-categorical-purple":[`#5A21A8`,`#C6A7FF`]}}),B=[{id:`--color-data-categorical-blue`,label:`Blue`},{id:`--color-data-categorical-orange`,label:`Orange`},{id:`--color-data-categorical-purple`,label:`Purple`}],V=B[0].id,H={render:()=>(0,k.jsx)(D,{}),play:async({canvasElement:e})=>{let t=P(e),n=()=>e.querySelector(`[data-choice-state]`),r=()=>e.querySelector(`[data-chart-color-preview]`),i=e=>{let t=r();A(t).not.toBeNull(),t&&A(getComputedStyle(t).backgroundColor).toBe(e)};A(n()).toHaveAttribute(`data-choice-state`,`automatic`),A(n()).toHaveAttribute(`data-preview-color`,`#005A4E`),i(`rgb(0, 90, 78)`),A(t.getByRole(`button`,{name:`Automatic`})).toHaveAttribute(`aria-pressed`,`true`);let a=t.getByRole(`button`,{name:`Purple chart color`});await M.click(a),A(a).toHaveAttribute(`aria-pressed`,`true`),A(n()).toHaveAttribute(`data-choice-state`,`theme`),A(n()).toHaveAttribute(`data-preview-color`,`#5A21A8`),i(`rgb(90, 33, 168)`),await M.click(t.getByRole(`button`,{name:`Switch to dark mode`})),await N(()=>{A(n()).toHaveAttribute(`data-preview-color`,`#C6A7FF`),i(`rgb(198, 167, 255)`)}),j.change(t.getByLabelText(`Exact custom color`),{target:{value:`#33aaff`}}),await M.click(t.getByRole(`button`,{name:`Apply custom color`})),A(n()).toHaveAttribute(`data-choice-state`,`custom`),A(n()).toHaveAttribute(`data-preview-color`,`#33AAFF`),i(`rgb(51, 170, 255)`),await M.click(t.getByRole(`button`,{name:`Switch to light mode`})),await N(()=>A(n()).toHaveAttribute(`data-preview-color`,`#33AAFF`)),await M.click(t.getByRole(`button`,{name:`Reset`})),A(n()).toHaveAttribute(`data-choice-state`,`automatic`),A(n()).toHaveAttribute(`data-preview-color`,`#005A4E`),i(`rgb(0, 90, 78)`),A(t.getByRole(`button`,{name:`Automatic`})).toHaveAttribute(`aria-pressed`,`true`)}},H.parameters={...H.parameters,docs:{...H.parameters?.docs,source:{originalSource:`{
  render: () => <ColorPickerExample />,
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    const state = () => canvasElement.querySelector<HTMLElement>('[data-choice-state]');
    const previewBar = () => canvasElement.querySelector<HTMLElement>('[data-chart-color-preview]');
    const expectPreviewBarColor = (color: string) => {
      const bar = previewBar();
      expect(bar).not.toBeNull();
      if (!bar) {
        return;
      }
      expect(getComputedStyle(bar).backgroundColor).toBe(color);
    };
    expect(state()).toHaveAttribute('data-choice-state', 'automatic');
    expect(state()).toHaveAttribute('data-preview-color', '#005A4E');
    expectPreviewBarColor('rgb(0, 90, 78)');
    expect(canvas.getByRole('button', {
      name: 'Automatic'
    })).toHaveAttribute('aria-pressed', 'true');
    const purple = canvas.getByRole('button', {
      name: 'Purple chart color'
    });
    await userEvent.click(purple);
    expect(purple).toHaveAttribute('aria-pressed', 'true');
    expect(state()).toHaveAttribute('data-choice-state', 'theme');
    expect(state()).toHaveAttribute('data-preview-color', '#5A21A8');
    expectPreviewBarColor('rgb(90, 33, 168)');
    await userEvent.click(canvas.getByRole('button', {
      name: 'Switch to dark mode'
    }));
    await waitFor(() => {
      expect(state()).toHaveAttribute('data-preview-color', '#C6A7FF');
      expectPreviewBarColor('rgb(198, 167, 255)');
    });
    fireEvent.change(canvas.getByLabelText('Exact custom color'), {
      target: {
        value: '#33aaff'
      }
    });
    await userEvent.click(canvas.getByRole('button', {
      name: 'Apply custom color'
    }));
    expect(state()).toHaveAttribute('data-choice-state', 'custom');
    expect(state()).toHaveAttribute('data-preview-color', '#33AAFF');
    expectPreviewBarColor('rgb(51, 170, 255)');
    await userEvent.click(canvas.getByRole('button', {
      name: 'Switch to light mode'
    }));
    await waitFor(() => expect(state()).toHaveAttribute('data-preview-color', '#33AAFF'));
    await userEvent.click(canvas.getByRole('button', {
      name: 'Reset'
    }));
    expect(state()).toHaveAttribute('data-choice-state', 'automatic');
    expect(state()).toHaveAttribute('data-preview-color', '#005A4E');
    expectPreviewBarColor('rgb(0, 90, 78)');
    expect(canvas.getByRole('button', {
      name: 'Automatic'
    })).toHaveAttribute('aria-pressed', 'true');
  }
}`,...H.parameters?.docs?.source}}},U=[`EndUserChoices`]})))()}W();export{H as EndUserChoices,U as __namedExportsOrder,F as default};