import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{t}from"./react-DlPsW1c0.js";import{t as n}from"./jsx-runtime-MKhVqBIO.js";import{n as r,t as i}from"./Button-DoGM0DEN.js";import{n as a,t as o}from"./Popover-CgJiFJLM.js";import{r as s,t as c}from"./Tooltip-CmQs04jO.js";import{mr as l,ui as u}from"./LexicalOnChangePlugin.prod-DszBgWDv.js";import{n as d,t as f}from"./RichTextEditor-BCAMMOBY.js";function p(){let[e,t]=(0,m.useState)(`rtl`);return(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(i,{label:`Change direction`,onClick:()=>t(`ltr`)}),(0,h.jsx)(f,{label:`Direction editor`,nodes:x,defaultValue:S,dir:e})]})}var m,h,g,_,v,y,b,x,S,C,w,T,E,D,O;function k(){return(k=e((()=>{m=t(),l(),d(),a(),s(),r(),h=n(),{expect:g,userEvent:_,waitFor:v,within:y}=__STORYBOOK_MODULE_TEST__,b=class e extends u{static getType(){return`boundary-controls`}static clone(t){return new e(t.__key)}constructor(e){super(e)}static importJSON(){return new e}isInline(){return!1}createDOM(){let e=document.createElement(`div`);return e.contentEditable=`false`,e}updateDOM(){return!1}decorate(){return(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(o,{label:`Outer`,content:(0,h.jsx)(`span`,{children:(0,h.jsx)(o,{label:`Inner`,content:(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(i,{label:`Inner first`}),(0,h.jsx)(i,{label:`Inner second`})]}),children:(0,h.jsx)(i,{label:`Open inner`})})}),children:(0,h.jsx)(i,{label:`Open outer`})}),(0,h.jsx)(`span`,{children:(0,h.jsx)(c,{content:`Direction hint`,isOpen:!0,children:(0,h.jsx)(i,{label:`Direction trigger`})})})]})}},x=[b],S=JSON.stringify({root:{type:`root`,version:1,direction:null,format:``,indent:0,children:[{type:`boundary-controls`,version:1}]}}),C={title:`Core/Layer`,tags:[`no-visual`]},w={render:()=>(0,h.jsx)(f,{label:`Popup editor`,nodes:x,defaultValue:S})},T={render:()=>(0,h.jsx)(p,{})},E={...w,play:async({canvasElement:e})=>{let t=y(e);await _.click(await t.findByRole(`button`,{name:`Open outer`})),await _.click(await t.findByRole(`button`,{name:`Open inner`})),await v(()=>{let e=t.getByRole(`dialog`,{name:`Outer`}),n=t.getByRole(`dialog`,{name:`Inner`});g(e).toContainElement(n)})}},D={...T,play:async({canvasElement:e})=>{let t=y(e),n=await t.findByRole(`tooltip`,{name:`Direction hint`});await v(()=>g(getComputedStyle(n).direction).toBe(`rtl`)),await _.click(t.getByRole(`button`,{name:`Change direction`})),await v(()=>g(getComputedStyle(n).direction).toBe(`ltr`))}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  render: () => <RichTextEditor label="Popup editor" nodes={nodes} defaultValue={INITIAL_CONTROLS} />
}`,...w.parameters?.docs?.source}}},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  render: () => <DirectionProbe />
}`,...T.parameters?.docs?.source}}},E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  ...BoundaryNestedFocus,
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await userEvent.click(await canvas.findByRole('button', {
      name: 'Open outer'
    }));
    await userEvent.click(await canvas.findByRole('button', {
      name: 'Open inner'
    }));
    await waitFor(() => {
      const outer = canvas.getByRole('dialog', {
        name: 'Outer'
      });
      const inner = canvas.getByRole('dialog', {
        name: 'Inner'
      });
      expect(outer).toContainElement(inner);
    });
  }
}`,...E.parameters?.docs?.source}}},D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
  ...BoundaryLiveDirection,
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    const tooltip = await canvas.findByRole('tooltip', {
      name: 'Direction hint'
    });
    await waitFor(() => expect(getComputedStyle(tooltip).direction).toBe('rtl'));
    await userEvent.click(canvas.getByRole('button', {
      name: 'Change direction'
    }));
    await waitFor(() => expect(getComputedStyle(tooltip).direction).toBe('ltr'));
  }
}`,...D.parameters?.docs?.source}}},O=[`BoundaryNestedFocus`,`BoundaryLiveDirection`,`BoundaryNestedFocusGuard`,`BoundaryLiveDirectionGuard`]})))()}k();export{T as BoundaryLiveDirection,D as BoundaryLiveDirectionGuard,w as BoundaryNestedFocus,E as BoundaryNestedFocusGuard,O as __namedExportsOrder,C as default};