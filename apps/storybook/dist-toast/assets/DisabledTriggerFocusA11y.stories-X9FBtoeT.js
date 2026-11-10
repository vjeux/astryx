import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{t}from"./react-DlPsW1c0.js";import{t as n}from"./jsx-runtime-MKhVqBIO.js";import{n as r,t as i}from"./Selector-MAEgY-r1.js";import{n as a,t as o}from"./ComplexSelector-Bt9gOBuj.js";var s,c,l,u,d,f;function p(){return(p=e((()=>{s=t(),a(),r(),c=n(),l={title:`a11y/Disabled trigger focus`,tags:[`no-visual`],args:{isDisabled:!1}},u={name:`Selector trigger`,render:({isDisabled:e})=>{let[t,n]=(0,s.useState)(`Apple`);return(0,c.jsx)(i,{label:`Fruit`,options:[`Apple`,`Banana`],value:t,onChange:n,isDisabled:e})}},d={name:`ComplexSelector trigger`,render:({isDisabled:e})=>(0,c.jsx)(o,{label:`View options`,value:`Comfortable`,onChange:()=>{},isDisabled:e,children:()=>(0,c.jsx)(`button`,{type:`button`,children:`Apply`})})},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  name: 'Selector trigger',
  render: ({
    isDisabled
  }) => {
    const [value, setValue] = useState('Apple');
    return <Selector label="Fruit" options={['Apple', 'Banana']} value={value} onChange={setValue} isDisabled={isDisabled} />;
  }
}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  name: 'ComplexSelector trigger',
  render: ({
    isDisabled
  }) => <ComplexSelector<string> label="View options" value="Comfortable" onChange={() => {}} isDisabled={isDisabled}>
      {() => <button type="button">Apply</button>}
    </ComplexSelector>
}`,...d.parameters?.docs?.source}}},f=[`SelectorTrigger`,`ComplexSelectorTrigger`]})))()}p();export{d as ComplexSelectorTrigger,u as SelectorTrigger,f as __namedExportsOrder,l as default};