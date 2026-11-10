import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{t}from"./jsx-runtime-MKhVqBIO.js";import{n,t as r}from"./Selector-MAEgY-r1.js";var i,a,o,s,c;function l(){return(l=e((()=>{n(),i=t(),a=[{value:`apple`,label:`Apple`},{value:`banana`,label:`Banana`}],o={title:`a11y/Selector empty state`,tags:[`no-visual`]},s={name:`element emptySearchText`,render:()=>(0,i.jsx)(`div`,{"data-empty-scenario":`element`,children:(0,i.jsx)(r,{label:`Fruit`,options:a,value:`apple`,onChange:()=>{},hasSearch:!0,emptySearchText:(0,i.jsxs)(`span`,{children:[`Nothing like that here. `,(0,i.jsx)(`a`,{href:`#new`,children:`Add a fruit`}),(0,i.jsx)(`span`,{"aria-hidden":`true`,children:` →`})]})})})},s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  name: 'element emptySearchText',
  render: () => <div data-empty-scenario="element">
      <Selector label="Fruit" options={OPTIONS} value="apple" onChange={() => {}} hasSearch emptySearchText={<span>
            Nothing like that here. <a href="#new">Add a fruit</a>
            <span aria-hidden="true"> →</span>
          </span>} />
    </div>
}`,...s.parameters?.docs?.source},description:{story:`An element in the dead end: the region must speak its text, not a default.`,...s.parameters?.docs?.description}}},c=[`ElementEmptySearchText`]})))()}l();export{s as ElementEmptySearchText,c as __namedExportsOrder,o as default};