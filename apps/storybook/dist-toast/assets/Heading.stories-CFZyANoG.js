import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{t}from"./jsx-runtime-MKhVqBIO.js";import{n,t as r}from"./Text-C5BHw0wv.js";import{n as i,t as a}from"./Heading-YiIeUtHm.js";var o,s,c,l,u,d,f,p,m,h,g,_,v,y,b,x,S,C,w,T;function E(){return(E=e((()=>{i(),n(),o=t(),s={title:`Core/Heading`,component:a,tags:[`autodocs`],argTypes:{level:{control:`select`,options:[1,2,3,4,5,6],description:`Visual heading level (1-6)`},color:{control:`select`,options:[`primary`,`secondary`,`disabled`,`placeholder`,`accent`,`inherit`],description:`Text color`},display:{control:`select`,options:[`inline`,`block`],description:`Display mode`},maxLines:{control:`number`,description:`Maximum lines before truncation (0 = no truncation)`},textWrap:{control:`select`,options:[`wrap`,`nowrap`,`balance`,`pretty`],description:`Text wrapping behavior`},wordBreak:{control:`select`,options:[`break-word`,`break-all`],description:`Word break behavior`},hasStrikethrough:{control:`boolean`,description:`Apply strikethrough decoration`},hasCapsize:{control:`boolean`,description:`Enable optical alignment (text-box-trim)`},accessibilityLevel:{control:`select`,options:[1,2,3,4,5,6],description:`Semantic level for accessibility (aria-level)`}}},c={args:{level:1,children:`Heading Level 1 (24px)`}},l={args:{level:2,children:`Heading Level 2 (20px)`}},u={args:{level:3,children:`Heading Level 3 (17px)`}},d={args:{level:4,children:`Heading Level 4 (14px — base)`}},f={args:{level:5,children:`Heading Level 5 (12px)`}},p={args:{level:6,children:`Heading Level 6 (10px)`}},m={render:()=>(0,o.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:`16px`},children:[(0,o.jsx)(r,{type:`supporting`,display:`block`,children:`Type scale: base=14px, ratio=1.2, h4 anchored to base. Sizes are computed from the geometric progression: size = base × ratio^step`}),(0,o.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:`8px`,marginTop:`8px`},children:[(0,o.jsx)(a,{level:1,children:`Heading 1 — 24px`}),(0,o.jsx)(a,{level:2,children:`Heading 2 — 20px`}),(0,o.jsx)(a,{level:3,children:`Heading 3 — 17px`}),(0,o.jsx)(a,{level:4,children:`Heading 4 — 14px (base)`}),(0,o.jsx)(a,{level:5,children:`Heading 5 — 12px`}),(0,o.jsx)(a,{level:6,children:`Heading 6 — 10px`})]})]})},h={render:()=>(0,o.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:`12px`},children:[(0,o.jsx)(a,{level:2,color:`primary`,children:`Primary heading (default)`}),(0,o.jsx)(a,{level:2,color:`secondary`,children:`Secondary heading`}),(0,o.jsx)(a,{level:2,color:`disabled`,children:`Disabled heading`}),(0,o.jsx)(a,{level:2,color:`placeholder`,children:`Placeholder heading`}),(0,o.jsx)(a,{level:2,color:`accent`,children:`Active heading (accent)`}),(0,o.jsx)(`div`,{style:{color:`purple`},children:(0,o.jsx)(a,{level:2,color:`inherit`,children:`Inherit heading (from parent)`})})]})},g={render:()=>(0,o.jsxs)(`div`,{children:[(0,o.jsxs)(`div`,{style:{marginBottom:`16px`},children:[(0,o.jsxs)(a,{level:3,display:`inline`,children:[`Inline H3`,` `]}),(0,o.jsxs)(a,{level:3,display:`inline`,children:[`flows together`,` `]}),(0,o.jsx)(a,{level:3,display:`inline`,children:`on the same line`})]}),(0,o.jsxs)(`div`,{children:[(0,o.jsx)(a,{level:3,display:`block`,children:`Block H3 (default)`}),(0,o.jsx)(a,{level:3,display:`block`,children:`Each heading on its own line`})]})]})},_={render:()=>(0,o.jsx)(`div`,{style:{width:`300px`,border:`1px solid #ccc`,padding:`12px`},children:(0,o.jsx)(a,{level:2,maxLines:1,children:`Very Long Heading That Will Be Truncated To One Line With Ellipsis`})})},v={render:()=>(0,o.jsx)(`div`,{style:{width:`300px`,border:`1px solid #ccc`,padding:`12px`},children:(0,o.jsx)(a,{level:2,maxLines:2,children:`Very Long Heading That Will Be Truncated To Two Lines To Keep Card Layout Compact`})})},y={render:()=>(0,o.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:`16px`},children:[(0,o.jsxs)(`div`,{children:[(0,o.jsx)(r,{type:`supporting`,display:`block`,children:`Normal heading: visual and semantic levels match`}),(0,o.jsx)(a,{level:2,children:`Section Title (h2, aria-level=2)`})]}),(0,o.jsxs)(`div`,{style:{marginTop:`16px`},children:[(0,o.jsx)(r,{type:`supporting`,display:`block`,children:`Sidebar heading: visual h2 but semantic h3 (doesn't affect main outline)`}),(0,o.jsx)(a,{level:2,accessibilityLevel:3,children:`Sidebar Section (looks like h2, aria-level=3)`})]})]})},b={args:{level:2,hasStrikethrough:!0,children:`Deprecated Section`}},x={render:()=>(0,o.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:`16px`},children:[(0,o.jsxs)(`div`,{children:[(0,o.jsx)(r,{type:`label`,display:`block`,children:`Without capsize (red border shows extra space):`}),(0,o.jsx)(`div`,{style:{border:`1px solid red`,display:`inline-block`},children:(0,o.jsx)(a,{level:1,children:`Regular Heading`})})]}),(0,o.jsxs)(`div`,{children:[(0,o.jsx)(r,{type:`label`,display:`block`,children:`With capsize (optically aligned):`}),(0,o.jsx)(`div`,{style:{border:`1px solid red`,display:`inline-block`},children:(0,o.jsx)(a,{level:1,hasCapsize:!0,children:`Capsize Heading`})})]})]})},S={render:()=>(0,o.jsxs)(`div`,{style:{maxWidth:`800px`},children:[(0,o.jsx)(a,{level:1,children:`Dashboard Overview`}),(0,o.jsx)(r,{type:`supporting`,display:`block`,children:`Last updated 5 minutes ago`}),(0,o.jsxs)(`div`,{style:{marginTop:`32px`},children:[(0,o.jsx)(a,{level:2,children:`Recent Activity`}),(0,o.jsx)(r,{type:`body`,display:`block`,children:`Here's what's been happening in your workspace.`})]}),(0,o.jsxs)(`div`,{style:{marginTop:`24px`},children:[(0,o.jsx)(a,{level:3,children:`Today`}),(0,o.jsxs)(r,{type:`body`,display:`block`,children:[`• Project Alpha updated`,(0,o.jsx)(`br`,{}),`• 3 new comments`,(0,o.jsx)(`br`,{}),`• Task completed`]})]})]})},C={render:()=>(0,o.jsx)(`div`,{style:{display:`grid`,gridTemplateColumns:`repeat(auto-fill, minmax(250px, 1fr))`,gap:`16px`,maxWidth:`800px`},children:[1,2,3].map(e=>(0,o.jsxs)(`div`,{style:{padding:`16px`,borderRadius:`8px`,border:`1px solid #e0e0e0`,boxShadow:`0 2px 4px rgba(0,0,0,0.1)`},children:[(0,o.jsxs)(a,{level:3,maxLines:1,children:[e===1&&`Very Long Card Title That Gets Truncated`,e===2&&`Another Card`,e===3&&`Third Card With An Even Longer Title That Will Be Truncated`]}),(0,o.jsx)(r,{type:`body`,maxLines:2,display:`block`,children:`This is a card description that might be quite long and needs to be truncated after two lines to keep the card compact and uniform.`}),(0,o.jsxs)(r,{type:`supporting`,display:`block`,children:[`Updated `,e,` hour`,e>1?`s`:``,` ago`]})]},e))})},w={parameters:{layout:`padded`},render:()=>(0,o.jsxs)(`div`,{className:`x78zum5 xdt5ytf x18g69wz x9f619 xh8yej3 xxc7z9f xeuugli`,children:[(0,o.jsx)(a,{"data-audit-case":`level-2`,level:2,children:`Level two section`}),(0,o.jsx)(a,{"data-audit-case":`outline-equal`,level:3,accessibilityLevel:3,children:`Matching outline level`}),(0,o.jsx)(a,{"data-audit-case":`outline-override`,level:2,accessibilityLevel:4,children:`Drawn as two, outlined as four`}),(0,o.jsx)(a,{"data-audit-case":`display-1`,level:2,type:`display-1`,children:`Display one`}),(0,o.jsx)(a,{"data-audit-case":`display-2`,level:2,type:`display-2`,children:`Display two`}),(0,o.jsx)(a,{"data-audit-case":`display-3`,level:2,type:`display-3`,children:`Display three`}),(0,o.jsx)(a,{"data-audit-case":`display-weight`,level:2,type:`display-2`,weight:`bold`,children:`Display two, bold`}),(0,o.jsx)(a,{"data-audit-case":`secondary`,level:3,color:`secondary`,children:`Secondary heading`}),(0,o.jsx)(a,{"data-audit-case":`justify-center`,level:4,justify:`center`,children:`Centered heading`}),(0,o.jsx)(a,{"data-audit-case":`justify-end`,level:4,justify:`end`,children:`End-aligned heading`}),(0,o.jsx)(a,{"data-audit-case":`truncate-1`,level:3,maxLines:1,children:`A single-line heading that is far too long for this column`}),(0,o.jsx)(a,{"data-audit-case":`truncate-2`,level:3,maxLines:2,hasTruncateTooltip:`below`,children:`A two-line heading that keeps going well past its second line so the clamp has something to cut`}),(0,o.jsx)(a,{"data-audit-case":`long-token`,level:3,children:`Report_2026_quarterly_revenue_by_region_and_product_line_final`})]})},c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    level: 1,
    children: 'Heading Level 1 (24px)'
  }
}`,...c.parameters?.docs?.source}}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    level: 2,
    children: 'Heading Level 2 (20px)'
  }
}`,...l.parameters?.docs?.source}}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    level: 3,
    children: 'Heading Level 3 (17px)'
  }
}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    level: 4,
    children: 'Heading Level 4 (14px — base)'
  }
}`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  args: {
    level: 5,
    children: 'Heading Level 5 (12px)'
  }
}`,...f.parameters?.docs?.source}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    level: 6,
    children: 'Heading Level 6 (10px)'
  }
}`,...p.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  }}>
      <Text type="supporting" display="block">
        Type scale: base=14px, ratio=1.2, h4 anchored to base. Sizes are
        computed from the geometric progression: size = base × ratio^step
      </Text>
      <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
      marginTop: '8px'
    }}>
        <Heading level={1}>Heading 1 — 24px</Heading>
        <Heading level={2}>Heading 2 — 20px</Heading>
        <Heading level={3}>Heading 3 — 17px</Heading>
        <Heading level={4}>Heading 4 — 14px (base)</Heading>
        <Heading level={5}>Heading 5 — 12px</Heading>
        <Heading level={6}>Heading 6 — 10px</Heading>
      </div>
    </div>
}`,...m.parameters?.docs?.source}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  }}>
      <Heading level={2} color="primary">
        Primary heading (default)
      </Heading>
      <Heading level={2} color="secondary">
        Secondary heading
      </Heading>
      <Heading level={2} color="disabled">
        Disabled heading
      </Heading>
      <Heading level={2} color="placeholder">
        Placeholder heading
      </Heading>
      <Heading level={2} color="accent">
        Active heading (accent)
      </Heading>
      <div style={{
      color: 'purple'
    }}>
        <Heading level={2} color="inherit">
          Inherit heading (from parent)
        </Heading>
      </div>
    </div>
}`,...h.parameters?.docs?.source}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  render: () => <div>
      <div style={{
      marginBottom: '16px'
    }}>
        <Heading level={3} display="inline">
          Inline H3{' '}
        </Heading>
        <Heading level={3} display="inline">
          flows together{' '}
        </Heading>
        <Heading level={3} display="inline">
          on the same line
        </Heading>
      </div>
      <div>
        <Heading level={3} display="block">
          Block H3 (default)
        </Heading>
        <Heading level={3} display="block">
          Each heading on its own line
        </Heading>
      </div>
    </div>
}`,...g.parameters?.docs?.source}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    width: '300px',
    border: '1px solid #ccc',
    padding: '12px'
  }}>
      <Heading level={2} maxLines={1}>
        Very Long Heading That Will Be Truncated To One Line With Ellipsis
      </Heading>
    </div>
}`,..._.parameters?.docs?.source}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    width: '300px',
    border: '1px solid #ccc',
    padding: '12px'
  }}>
      <Heading level={2} maxLines={2}>
        Very Long Heading That Will Be Truncated To Two Lines To Keep Card
        Layout Compact
      </Heading>
    </div>
}`,...v.parameters?.docs?.source}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  }}>
      <div>
        <Text type="supporting" display="block">
          Normal heading: visual and semantic levels match
        </Text>
        <Heading level={2}>Section Title (h2, aria-level=2)</Heading>
      </div>
      <div style={{
      marginTop: '16px'
    }}>
        <Text type="supporting" display="block">
          Sidebar heading: visual h2 but semantic h3 (doesn't affect main
          outline)
        </Text>
        <Heading level={2} accessibilityLevel={3}>
          Sidebar Section (looks like h2, aria-level=3)
        </Heading>
      </div>
    </div>
}`,...y.parameters?.docs?.source}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  args: {
    level: 2,
    hasStrikethrough: true,
    children: 'Deprecated Section'
  }
}`,...b.parameters?.docs?.source}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  }}>
      <div>
        <Text type="label" display="block">
          Without capsize (red border shows extra space):
        </Text>
        <div style={{
        border: '1px solid red',
        display: 'inline-block'
      }}>
          <Heading level={1}>Regular Heading</Heading>
        </div>
      </div>
      <div>
        <Text type="label" display="block">
          With capsize (optically aligned):
        </Text>
        <div style={{
        border: '1px solid red',
        display: 'inline-block'
      }}>
          <Heading level={1} hasCapsize>
            Capsize Heading
          </Heading>
        </div>
      </div>
    </div>
}`,...x.parameters?.docs?.source}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    maxWidth: '800px'
  }}>
      <Heading level={1}>Dashboard Overview</Heading>
      <Text type="supporting" display="block">
        Last updated 5 minutes ago
      </Text>

      <div style={{
      marginTop: '32px'
    }}>
        <Heading level={2}>Recent Activity</Heading>
        <Text type="body" display="block">
          Here's what's been happening in your workspace.
        </Text>
      </div>

      <div style={{
      marginTop: '24px'
    }}>
        <Heading level={3}>Today</Heading>
        <Text type="body" display="block">
          • Project Alpha updated
          <br />
          • 3 new comments
          <br />• Task completed
        </Text>
      </div>
    </div>
}`,...S.parameters?.docs?.source}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    gap: '16px',
    maxWidth: '800px'
  }}>
      {[1, 2, 3].map(i => <div key={i} style={{
      padding: '16px',
      borderRadius: '8px',
      border: '1px solid #e0e0e0',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
          <Heading level={3} maxLines={1}>
            {i === 1 && 'Very Long Card Title That Gets Truncated'}
            {i === 2 && 'Another Card'}
            {i === 3 && 'Third Card With An Even Longer Title That Will Be Truncated'}
          </Heading>
          <Text type="body" maxLines={2} display="block">
            This is a card description that might be quite long and needs to be
            truncated after two lines to keep the card compact and uniform.
          </Text>
          <Text type="supporting" display="block">
            Updated {i} hour{i > 1 ? 's' : ''} ago
          </Text>
        </div>)}
    </div>
}`,...C.parameters?.docs?.source}}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  parameters: {
    layout: 'padded'
  },
  render: () => <div {...stylex.props(auditStyles.column)}>
      <Heading data-audit-case="level-2" level={2}>
        Level two section
      </Heading>
      <Heading data-audit-case="outline-equal" level={3} accessibilityLevel={3}>
        Matching outline level
      </Heading>
      <Heading data-audit-case="outline-override" level={2} accessibilityLevel={4}>
        Drawn as two, outlined as four
      </Heading>
      <Heading data-audit-case="display-1" level={2} type="display-1">
        Display one
      </Heading>
      <Heading data-audit-case="display-2" level={2} type="display-2">
        Display two
      </Heading>
      <Heading data-audit-case="display-3" level={2} type="display-3">
        Display three
      </Heading>
      <Heading data-audit-case="display-weight" level={2} type="display-2" weight="bold">
        Display two, bold
      </Heading>
      <Heading data-audit-case="secondary" level={3} color="secondary">
        Secondary heading
      </Heading>
      <Heading data-audit-case="justify-center" level={4} justify="center">
        Centered heading
      </Heading>
      <Heading data-audit-case="justify-end" level={4} justify="end">
        End-aligned heading
      </Heading>
      <Heading data-audit-case="truncate-1" level={3} maxLines={1}>
        A single-line heading that is far too long for this column
      </Heading>
      <Heading data-audit-case="truncate-2" level={3} maxLines={2} hasTruncateTooltip="below">
        A two-line heading that keeps going well past its second line so the
        clamp has something to cut
      </Heading>
      <Heading data-audit-case="long-token" level={3}>
        Report_2026_quarterly_revenue_by_region_and_product_line_final
      </Heading>
    </div>
}`,...w.parameters?.docs?.source},description:{story:`Bounded browser fixture for the Heading contract: outline levels, display
types and weight, color, logical alignment, both truncation modes, and a
long unbroken token, in one 360px column.`,...w.parameters?.docs?.description}}},T=[`Level1`,`Level2`,`Level3`,`Level4`,`Level5`,`Level6`,`AllLevels`,`ColorVariants`,`DisplayModes`,`SingleLineTruncation`,`MultiLineTruncation`,`AccessibilityLevel`,`Strikethrough`,`Capsize`,`PageLayout`,`CardGrid`,`AuditMatrix`]})))()}E();export{y as AccessibilityLevel,m as AllLevels,w as AuditMatrix,x as Capsize,C as CardGrid,h as ColorVariants,g as DisplayModes,c as Level1,l as Level2,u as Level3,d as Level4,f as Level5,p as Level6,v as MultiLineTruncation,S as PageLayout,_ as SingleLineTruncation,b as Strikethrough,T as __namedExportsOrder,s as default};