import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{t}from"./jsx-runtime-MKhVqBIO.js";import{n,t as r}from"./Button-DoGM0DEN.js";import{n as i,t as a}from"./ButtonGroup-HzazL4TJ.js";import{r as o,t as s}from"./Tooltip-CmQs04jO.js";import{n as c,t as l}from"./InputGroup-BWTkP6pA.js";import{n as u,t as d}from"./TextInput-LGxpinPt.js";import{n as f,t as p}from"./DropdownMenu-M0We7Ho-.js";function m(e,t){return Array.from({length:t},(t,n)=>{let r=`${e}-${n}`;return e===`template`?(0,g.jsx)(`template`,{},r):e===`dialog`?(0,g.jsx)(`dialog`,{},r):(0,g.jsx)(`div`,{popover:`manual`},r)})}function h({name:e,orientation:t=`horizontal`,children:n}){return(0,g.jsx)(`div`,{"data-corner-shape":e,style:{padding:8},children:(0,g.jsx)(a,{label:e,orientation:t,children:n})})}var g,_,v,y,b;function x(){return(x=e((()=>{n(),i(),f(),c(),u(),o(),g=t(),_={title:`A11y/ButtonGroup corners`,tags:[`no-visual`]},v=(e,t,n)=>(0,g.jsx)(r,{label:n,"data-corner-case":e,"data-trailing":t}),y={render:()=>(0,g.jsxs)(`div`,{children:[(0,g.jsxs)(h,{name:`two`,children:[v(`two`,`square`,`One`),v(`two`,`round`,`Two`)]}),(0,g.jsxs)(h,{name:`two-vertical`,orientation:`vertical`,children:[v(`two-vertical`,`square`,`One`),v(`two-vertical`,`round`,`Two`)]}),(0,g.jsxs)(h,{name:`popover-and-template-after`,children:[v(`popover-and-template-after`,`square`,`One`),v(`popover-and-template-after`,`round`,`Two`),m(`popover`,1),m(`template`,1)]}),(0,g.jsxs)(h,{name:`dialog-then-raw-child`,children:[v(`dialog-then-raw-child`,`square`,`One`),m(`dialog`,1),(0,g.jsx)(`button`,{type:`button`,children:`Raw`})]}),(0,g.jsxs)(h,{name:`contents-wrapper-follows`,children:[v(`contents-wrapper-follows`,`square`,`One`),(0,g.jsx)(`div`,{style:{display:`contents`},children:(0,g.jsx)(r,{label:`Wrapped`})})]}),(0,g.jsxs)(h,{name:`between-popovers`,children:[m(`popover`,1),v(`between-popovers`,`round`,`Only`),m(`popover`,1)]}),(0,g.jsxs)(h,{name:`four-pieces-each`,children:[v(`four-pieces-each`,`square`,`One`),m(`popover`,2),m(`template`,2),v(`four-pieces-each`,`round`,`Two`),m(`popover`,2),m(`template`,2)]}),[5,6,7].map(e=>(0,g.jsxs)(h,{name:`${e}-pieces-after`,children:[v(`${e}-pieces-after`,`square`,`One`),v(`${e}-pieces-after`,`round`,`Two`),m(`popover`,e)]},e)),(0,g.jsxs)(h,{name:`tooltip-trailing`,children:[v(`tooltip-trailing`,`square`,`Save`),(0,g.jsx)(r,{label:`More`,tooltip:`More options`,"data-corner-case":`tooltip-trailing`,"data-trailing":`round`})]}),(0,g.jsxs)(h,{name:`dropdown-trailing`,children:[v(`dropdown-trailing`,`square`,`Allow once`),(0,g.jsx)(p,{button:{label:`Allow options`,"data-corner-case":`dropdown-trailing`,"data-trailing":`round`},items:[{label:`Always allow`}]})]}),(0,g.jsxs)(h,{name:`tooltip-wrapper-follows`,children:[v(`tooltip-wrapper-follows`,`square`,`Save`),(0,g.jsx)(s,{content:`Rich tip`,children:(0,g.jsx)(r,{label:`More`})})]}),(0,g.jsx)(`div`,{"data-corner-shape":`input-group-addon`,style:{padding:8},children:(0,g.jsxs)(l,{label:`Visibility`,children:[(0,g.jsx)(d,{label:`Audience`,isLabelHidden:!0,value:`Members`,onChange:()=>{}}),(0,g.jsx)(r,{label:`Save`,"data-corner-case":`input-group-addon`,"data-trailing":`round`})]})}),(0,g.jsx)(`div`,{"data-corner-shape":`input-group-addon-then-member`,style:{padding:8},children:(0,g.jsxs)(l,{label:`Visibility`,children:[(0,g.jsx)(r,{label:`Pick`,"data-corner-case":`input-group-addon-then-member`,"data-trailing":`square`}),(0,g.jsx)(d,{label:`Audience`,isLabelHidden:!0,value:`Members`,onChange:()=>{}})]})})]})},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  render: () => <div>
      <Shape name="two">
        {member('two', 'square', 'One')}
        {member('two', 'round', 'Two')}
      </Shape>
      <Shape name="two-vertical" orientation="vertical">
        {member('two-vertical', 'square', 'One')}
        {member('two-vertical', 'round', 'Two')}
      </Shape>
      <Shape name="popover-and-template-after">
        {member('popover-and-template-after', 'square', 'One')}
        {member('popover-and-template-after', 'round', 'Two')}
        {pieces('popover', 1)}
        {pieces('template', 1)}
      </Shape>
      <Shape name="dialog-then-raw-child">
        {member('dialog-then-raw-child', 'square', 'One')}
        {pieces('dialog', 1)}
        <button type="button">Raw</button>
      </Shape>
      <Shape name="contents-wrapper-follows">
        {member('contents-wrapper-follows', 'square', 'One')}
        <div style={{
        display: 'contents'
      }}>
          <Button label="Wrapped" />
        </div>
      </Shape>
      <Shape name="between-popovers">
        {pieces('popover', 1)}
        {member('between-popovers', 'round', 'Only')}
        {pieces('popover', 1)}
      </Shape>
      <Shape name="four-pieces-each">
        {member('four-pieces-each', 'square', 'One')}
        {pieces('popover', 2)}
        {pieces('template', 2)}
        {member('four-pieces-each', 'round', 'Two')}
        {pieces('popover', 2)}
        {pieces('template', 2)}
      </Shape>
      {[5, 6, 7].map(count => <Shape key={count} name={\`\${count}-pieces-after\`}>
          {member(\`\${count}-pieces-after\`, 'square', 'One')}
          {member(\`\${count}-pieces-after\`, 'round', 'Two')}
          {pieces('popover', count)}
        </Shape>)}
      <Shape name="tooltip-trailing">
        {member('tooltip-trailing', 'square', 'Save')}
        <Button label="More" tooltip="More options" data-corner-case="tooltip-trailing" data-trailing="round" />
      </Shape>
      <Shape name="dropdown-trailing">
        {member('dropdown-trailing', 'square', 'Allow once')}
        <DropdownMenu button={{
        label: 'Allow options',
        'data-corner-case': 'dropdown-trailing',
        'data-trailing': 'round'
      }} items={[{
        label: 'Always allow'
      }]} />
      </Shape>
      <Shape name="tooltip-wrapper-follows">
        {member('tooltip-wrapper-follows', 'square', 'Save')}
        <Tooltip content="Rich tip">
          <Button label="More" />
        </Tooltip>
      </Shape>
      <div data-corner-shape="input-group-addon" style={{
      padding: 8
    }}>
        <InputGroup label="Visibility">
          <TextInput label="Audience" isLabelHidden value="Members" onChange={() => {}} />
          <Button label="Save" data-corner-case="input-group-addon" data-trailing="round" />
        </InputGroup>
      </div>
      <div data-corner-shape="input-group-addon-then-member" style={{
      padding: 8
    }}>
        <InputGroup label="Visibility">
          <Button label="Pick" data-corner-case="input-group-addon-then-member" data-trailing="square" />
          <TextInput label="Audience" isLabelHidden value="Members" onChange={() => {}} />
        </InputGroup>
      </div>
    </div>
}`,...y.parameters?.docs?.source}}},b=[`Shapes`]})))()}x();export{y as Shapes,b as __namedExportsOrder,_ as default};