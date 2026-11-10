import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{t}from"./jsx-runtime-MKhVqBIO.js";import{n,t as r}from"./Badge-DqOhTiyH.js";var i,a,o,s,c,l,u,d,f,p,m,h;function g(){return(g=e((()=>{n(),i=t(),a={title:`Core/Badge`,component:r,tags:[`autodocs`],argTypes:{variant:{control:`select`,options:[`neutral`,`info`,`success`,`warning`,`error`,`blue`,`cyan`,`green`,`orange`,`pink`,`purple`,`red`,`teal`,`yellow`],description:`Visual style variant`},label:{control:`text`,description:`Badge label text`}}},o={args:{label:`Badge`}},s={render:()=>(0,i.jsxs)(`div`,{style:{display:`flex`,gap:`8px`,alignItems:`center`},children:[(0,i.jsx)(r,{variant:`neutral`,label:`Neutral`}),(0,i.jsx)(r,{variant:`info`,label:`Info`}),(0,i.jsx)(r,{variant:`success`,label:`Success`}),(0,i.jsx)(r,{variant:`warning`,label:`Warning`}),(0,i.jsx)(r,{variant:`error`,label:`Error`})]})},c={render:()=>(0,i.jsxs)(`div`,{style:{display:`flex`,gap:`8px`,alignItems:`center`},children:[(0,i.jsx)(r,{variant:`info`,label:3}),(0,i.jsx)(r,{variant:`error`,label:`99+`}),(0,i.jsx)(r,{variant:`success`,label:12})]})},l={render:()=>(0,i.jsxs)(`div`,{style:{display:`flex`,gap:`8px`,alignItems:`center`},children:[(0,i.jsx)(r,{variant:`success`,label:`Active`}),(0,i.jsx)(r,{variant:`warning`,label:`Pending`}),(0,i.jsx)(r,{variant:`error`,label:`Failed`}),(0,i.jsx)(r,{variant:`neutral`,label:`Draft`})]})},u={render:()=>(0,i.jsxs)(`div`,{style:{display:`flex`,gap:`8px`,flexWrap:`wrap`},children:[(0,i.jsx)(r,{variant:`blue`,label:`Design`}),(0,i.jsx)(r,{variant:`cyan`,label:`DevOps`}),(0,i.jsx)(r,{variant:`green`,label:`Backend`}),(0,i.jsx)(r,{variant:`orange`,label:`Urgent`}),(0,i.jsx)(r,{variant:`pink`,label:`Marketing`}),(0,i.jsx)(r,{variant:`purple`,label:`Engineering`}),(0,i.jsx)(r,{variant:`red`,label:`Critical`}),(0,i.jsx)(r,{variant:`teal`,label:`Research`}),(0,i.jsx)(r,{variant:`yellow`,label:`Review`})]})},d={name:`Long labels in tight space`,render:()=>(0,i.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:20},children:[(0,i.jsxs)(`div`,{children:[(0,i.jsx)(`div`,{style:{font:`600 12px system-ui`,marginBottom:6},children:`In a 100px column`}),(0,i.jsx)(`div`,{style:{width:100,outline:`1px dashed var(--color-border)`,padding:4},children:(0,i.jsx)(r,{variant:`pink`,label:`Awaiting security review`})})]}),(0,i.jsxs)(`div`,{children:[(0,i.jsx)(`div`,{style:{font:`600 12px system-ui`,marginBottom:6},children:`With an icon — the icon holds its place, the label gives way`}),(0,i.jsx)(`div`,{style:{width:140,outline:`1px dashed var(--color-border)`,padding:4},children:(0,i.jsx)(r,{variant:`warning`,icon:(0,i.jsx)(`span`,{"aria-hidden":`true`,children:`⚠`}),label:`Awaiting security review`})})]}),(0,i.jsxs)(`div`,{children:[(0,i.jsx)(`div`,{style:{font:`600 12px system-ui`,marginBottom:6},children:`Room to spare — unchanged`}),(0,i.jsx)(`div`,{style:{width:300,outline:`1px dashed var(--color-border)`,padding:4},children:(0,i.jsx)(r,{variant:`success`,label:`Active`})})]})]}),parameters:{docs:{description:{story:`A badge has a fixed height and never wraps, so a label wider than its container is truncated with an ellipsis rather than escaping the container. A badge that fits is untouched — the clamp only ever changes the case that would otherwise overflow.`}}}},f={display:`flex`,alignItems:`center`,gap:8,width:260,"--text-supporting-size":`2.5rem`},p={display:`flex`,gap:8,"--text-supporting-size":`2.5rem`},m={name:`Larger text`,render:()=>(0,i.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:16},children:[[`default`,`1.25rem`,`2.5rem`].map(e=>{let t={display:`flex`,flexWrap:`wrap`,gap:8,alignItems:`center`,...e==="default"?null:{"--text-supporting-size":e}};return(0,i.jsxs)(`div`,{"data-testid":`badge-row-${e}`,style:t,children:[(0,i.jsx)(r,{variant:`info`,label:3}),(0,i.jsx)(r,{label:`Ready`}),(0,i.jsx)(r,{variant:`success`,label:`Shipped`}),(0,i.jsx)(r,{variant:`warning`,icon:(0,i.jsx)(`span`,{"aria-hidden":`true`,children:`⚠`}),label:`Review`}),(0,i.jsx)(r,{variant:`success`,label:``})]},e)}),(0,i.jsxs)(`div`,{"data-testid":`badge-row-crowded`,style:f,children:[(0,i.jsx)(`span`,{style:{flex:`none`,width:200,overflow:`hidden`,whiteSpace:`nowrap`,textOverflow:`ellipsis`},children:`Messages waiting in the shared inbox`}),(0,i.jsx)(r,{variant:`info`,label:3})]}),(0,i.jsx)(`div`,{"data-testid":`badge-row-narrow`,style:p,children:(0,i.jsx)(`div`,{"data-testid":`narrow-cell`,style:{width:52,outline:`1px dashed var(--color-border)`},children:(0,i.jsx)(r,{variant:`info`,label:3})})})]})},o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Badge'
  }
}`,...o.parameters?.docs?.source}}},s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    gap: '8px',
    alignItems: 'center'
  }}>
      <Badge variant="neutral" label="Neutral" />
      <Badge variant="info" label="Info" />
      <Badge variant="success" label="Success" />
      <Badge variant="warning" label="Warning" />
      <Badge variant="error" label="Error" />
    </div>
}`,...s.parameters?.docs?.source}}},c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    gap: '8px',
    alignItems: 'center'
  }}>
      <Badge variant="info" label={3} />
      <Badge variant="error" label="99+" />
      <Badge variant="success" label={12} />
    </div>
}`,...c.parameters?.docs?.source}}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    gap: '8px',
    alignItems: 'center'
  }}>
      <Badge variant="success" label="Active" />
      <Badge variant="warning" label="Pending" />
      <Badge variant="error" label="Failed" />
      <Badge variant="neutral" label="Draft" />
    </div>
}`,...l.parameters?.docs?.source}}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    gap: '8px',
    flexWrap: 'wrap'
  }}>
      <Badge variant="blue" label="Design" />
      <Badge variant="cyan" label="DevOps" />
      <Badge variant="green" label="Backend" />
      <Badge variant="orange" label="Urgent" />
      <Badge variant="pink" label="Marketing" />
      <Badge variant="purple" label="Engineering" />
      <Badge variant="red" label="Critical" />
      <Badge variant="teal" label="Research" />
      <Badge variant="yellow" label="Review" />
    </div>
}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  name: 'Long labels in tight space',
  render: () => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: 20
  }}>
      <div>
        <div style={{
        font: '600 12px system-ui',
        marginBottom: 6
      }}>
          In a 100px column
        </div>
        <div style={{
        width: 100,
        outline: '1px dashed var(--color-border)',
        padding: 4
      }}>
          <Badge variant="pink" label="Awaiting security review" />
        </div>
      </div>
      <div>
        <div style={{
        font: '600 12px system-ui',
        marginBottom: 6
      }}>
          With an icon — the icon holds its place, the label gives way
        </div>
        <div style={{
        width: 140,
        outline: '1px dashed var(--color-border)',
        padding: 4
      }}>
          <Badge variant="warning" icon={<span aria-hidden="true">⚠</span>} label="Awaiting security review" />
        </div>
      </div>
      <div>
        <div style={{
        font: '600 12px system-ui',
        marginBottom: 6
      }}>
          Room to spare — unchanged
        </div>
        <div style={{
        width: 300,
        outline: '1px dashed var(--color-border)',
        padding: 4
      }}>
          <Badge variant="success" label="Active" />
        </div>
      </div>
    </div>,
  parameters: {
    docs: {
      description: {
        story: 'A badge has a fixed height and never wraps, so a label wider than its container is truncated with an ellipsis rather than escaping the container. A badge that fits is untouched — the clamp only ever changes the case that would otherwise overflow.'
      }
    }
  }
}`,...d.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  name: 'Larger text',
  render: () => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: 16
  }}>
      {['default', '1.25rem', '2.5rem'].map(size => {
      const row: LargerTextRow = {
        display: 'flex',
        flexWrap: 'wrap',
        gap: 8,
        alignItems: 'center',
        ...(size === 'default' ? null : {
          '--text-supporting-size': size
        })
      };
      return <div key={size} data-testid={\`badge-row-\${size}\`} style={row}>
            <Badge variant="info" label={3} />
            <Badge label="Ready" />
            <Badge variant="success" label="Shipped" />
            <Badge variant="warning" icon={<span aria-hidden="true">⚠</span>} label="Review" />
            <Badge variant="success" label="" />
          </div>;
    })}
      <div data-testid="badge-row-crowded" style={CROWDED_ROW}>
        <span style={{
        flex: 'none',
        width: 200,
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis'
      }}>
          Messages waiting in the shared inbox
        </span>
        <Badge variant="info" label={3} />
      </div>
      <div data-testid="badge-row-narrow" style={NARROW_CELLS}>
        <div data-testid="narrow-cell" style={{
        width: 52,
        outline: '1px dashed var(--color-border)'
      }}>
          <Badge variant="info" label={3} />
        </div>
      </div>
    </div>
}`,...m.parameters?.docs?.source}}},h=[`Default`,`Variants`,`Counts`,`StatusLabels`,`NonSemanticColors`,`LongLabels`,`LargerText`]})))()}g();export{c as Counts,o as Default,m as LargerText,d as LongLabels,u as NonSemanticColors,l as StatusLabels,s as Variants,h as __namedExportsOrder,a as default};