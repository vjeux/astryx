import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{m as t,p as n,r,x as i,y as a}from"./tokens.stylex-uC3T-IhP.js";import{i as ee,n as te,r as ne,t as re}from"./LayoutContent-BEmJ3Yl2.js";import{t as ie}from"./jsx-runtime-MKhVqBIO.js";import{n as ae,t as oe}from"./LayoutHeader-ewlJxePS.js";import{n as se,t as o}from"./Text-C5BHw0wv.js";import{n as ce,t as s}from"./Button-DoGM0DEN.js";import{n as le,t as c}from"./Heading-YiIeUtHm.js";import{n as ue,t as l}from"./Card-DA0ZfoAz.js";import{n as de,t as fe}from"./HStack-D5idGciI.js";import{n as pe,t as u}from"./VStack-SWtDePqc.js";import{n as me,t as he}from"./Section-g5hpGOnN.js";import{n as ge,t as _e}from"./LayoutFooter-aEVnoSty.js";import{_ as d,a as ve,c as ye,d as f,f as be,l as p,n as xe,o as Se,s as Ce,t as m,u as we,v as Te}from"./Table-DReqd1jV.js";import{a as h,i as g,r as Ee}from"./columnUtils-ClYX9X3Y.js";var _,v,y,b,x,S,C,w,T,E,D,O,k,A,j,M,N,P,F,I,L,R,z,B,V,H,U,W,G,K,De,Oe,q,J,Y,X,Z,Q,$,ke;function Ae(){return(Ae=e((()=>{xe(),Te(),be(),we(),ye(),Se(),Ee(),ue(),me(),ee(),ae(),te(),ge(),pe(),de(),le(),se(),ce(),n(),_=ie(),{expect:v,waitFor:y}=__STORYBOOK_MODULE_TEST__,b=[{id:`1`,name:`Alice Johnson`,email:`alice@example.com`,role:`Engineer`,age:30},{id:`2`,name:`Bob Smith`,email:`bob@example.com`,role:`Designer`,age:25},{id:`3`,name:`Charlie Brown`,email:`charlie@example.com`,role:`PM`,age:35},{id:`4`,name:`Diana Prince`,email:`diana@example.com`,role:`Engineer`,age:28},{id:`5`,name:`Eve Davis`,email:`eve@example.com`,role:`Designer`,age:32}],x=[{key:`name`,header:`Name`,width:h(1)},{key:`email`,header:`Email`,width:h(2)},{key:`role`,header:`Role`,width:h(1)},{key:`age`,header:`Age`,width:g(80)}],S={title:`Core/Table`,component:m,tags:[`autodocs`],argTypes:{density:{control:`select`,options:[`compact`,`balanced`,`spacious`],description:`Row density controlling padding and font size`},dividers:{control:`select`,options:[`rows`,`columns`,`grid`,`none`],description:`Divider style between cells`},isStriped:{control:`boolean`,description:`Alternate row background color`},hasHover:{control:`boolean`,description:`Highlight rows on hover`},verticalAlign:{control:`select`,options:[`middle`,`top`,`bottom`],description:`Vertical alignment for body row cells`}}},C={args:{data:b,columns:x,idKey:`id`}},w={args:{data:b,columns:x,idKey:`id`,density:`compact`}},T={args:{data:b,columns:x,idKey:`id`,density:`spacious`}},E={args:{data:b,columns:x,idKey:`id`,isStriped:!0,hasHover:!0}},D={args:{data:b,columns:x,idKey:`id`,dividers:`grid`}},O={args:{data:b,columns:x,idKey:`id`,dividers:`columns`}},k={args:{data:b,columns:x,idKey:`id`,dividers:`none`}},A={render:()=>(0,_.jsx)(m,{data:[{name:`Alice`,role:`Engineer`,status:`Active`},{name:`Bob`,role:`Designer`,status:`Away`}],hasHover:!0})},j={render:()=>{let e=[{key:`name`,header:`Name`},{key:`email`,header:`Email`,width:h(2),renderCell:e=>(0,_.jsx)(`a`,{href:`mailto:${e.email}`,style:{color:`inherit`},children:e.email})},{key:`role`,header:`Role`,renderCell:e=>(0,_.jsx)(`span`,{style:{padding:`${a[`--spacing-0-5`]} ${a[`--spacing-2`]}`,borderRadius:t[`--radius-inner`],fontSize:i[`--font-size-xs`],backgroundColor:e.role===`Engineer`?r[`--color-background-blue`]:r[`--color-background-purple`],color:e.role===`Engineer`?r[`--color-text-blue`]:r[`--color-text-purple`]},children:e.role})},{key:`age`,header:`Age`,width:g(80)}];return(0,_.jsx)(m,{data:b,columns:e,idKey:`id`,hasHover:!0})}},M={render:()=>(0,_.jsxs)(m,{density:`balanced`,dividers:`rows`,isStriped:!0,hasHover:!0,children:[(0,_.jsx)(Ce,{children:(0,_.jsxs)(d,{children:[(0,_.jsx)(p,{children:`Name`}),(0,_.jsx)(p,{children:`Email`}),(0,_.jsx)(p,{children:`Role`})]})}),(0,_.jsxs)(ve,{children:[(0,_.jsxs)(d,{children:[(0,_.jsx)(f,{children:`Alice`}),(0,_.jsx)(f,{children:`alice@example.com`}),(0,_.jsx)(f,{children:`Engineer`})]}),(0,_.jsxs)(d,{children:[(0,_.jsx)(f,{children:`Bob`}),(0,_.jsx)(f,{children:`bob@example.com`}),(0,_.jsx)(f,{children:`Designer`})]}),(0,_.jsxs)(d,{children:[(0,_.jsx)(f,{children:`Charlie`}),(0,_.jsx)(f,{children:`charlie@example.com`}),(0,_.jsx)(f,{children:`PM`})]}),(0,_.jsxs)(d,{children:[(0,_.jsx)(f,{children:`Diana`}),(0,_.jsx)(f,{children:`diana@example.com`}),(0,_.jsx)(f,{children:`Engineer`})]})]})]})},N={render:()=>(0,_.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:`32px`},children:[(0,_.jsxs)(`div`,{children:[(0,_.jsx)(`p`,{style:{margin:`0 0 8px`,fontWeight:600},children:`Compact`}),(0,_.jsx)(m,{data:b.slice(0,3),columns:x,idKey:`id`,density:`compact`})]}),(0,_.jsxs)(`div`,{children:[(0,_.jsx)(`p`,{style:{margin:`0 0 8px`,fontWeight:600},children:`Balanced (default)`}),(0,_.jsx)(m,{data:b.slice(0,3),columns:x,idKey:`id`,density:`balanced`})]}),(0,_.jsxs)(`div`,{children:[(0,_.jsx)(`p`,{style:{margin:`0 0 8px`,fontWeight:600},children:`Spacious`}),(0,_.jsx)(m,{data:b.slice(0,3),columns:x,idKey:`id`,density:`spacious`})]})]})},P={args:{data:b,columns:x,idKey:`id`,density:`compact`,dividers:`grid`,isStriped:!0,hasHover:!0}},F=[{scenario:`Long unbroken string`,content:`a_very_long_string_like_this_that_overflows_the_column_without_any_spaces_or_hyphens`},{scenario:`Normal prose`,content:`This is a longer sentence that might wrap or truncate depending on the textOverflow setting of the table.`},{scenario:`Short text`,content:`Fits fine.`}],I={render:()=>{let e=[{key:`scenario`,header:`Scenario`,width:g(160)},{key:`content`,header:`Content`,width:h(1)}];return(0,_.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:`32px`,width:`480px`},children:[(0,_.jsxs)(`div`,{children:[(0,_.jsx)(`h4`,{style:{margin:`0 0 8px`},children:`Wrap (default)`}),(0,_.jsx)(m,{data:F,columns:e,dividers:`grid`,density:`balanced`})]}),(0,_.jsxs)(`div`,{children:[(0,_.jsx)(`h4`,{style:{margin:`0 0 8px`},children:`Truncate (with tooltip on hover)`}),(0,_.jsx)(m,{data:F,columns:e,dividers:`grid`,density:`balanced`,textOverflow:`truncate`})]})]})}},L=[{key:`name`,header:`Name`,width:h(1)},{key:`role`,header:`Role`,width:h(1)},{key:`email`,header:`Email`,width:h(2)}],R={decorators:[e=>(0,_.jsx)(`div`,{className:`x1eiddq6 x1gt495`,children:(0,_.jsx)(e,{})})],render:()=>(0,_.jsxs)(`div`,{className:`x78zum5 x1qh66ti x1a02dak x7a106z`,children:[(0,_.jsxs)(`div`,{children:[(0,_.jsx)(`h4`,{className:`xrcdmg7 x9ynric xif65rj xv1l7n4`,children:`Table in Card (auto bleed)`}),(0,_.jsx)(l,{width:480,children:(0,_.jsx)(m,{data:b.slice(0,4),columns:L})})]}),(0,_.jsxs)(`div`,{children:[(0,_.jsxs)(`h4`,{className:`xrcdmg7 x9ynric xif65rj xv1l7n4`,children:[`Before: Card padding=`,0,` (old pattern)`]}),(0,_.jsx)(l,{width:480,padding:0,children:(0,_.jsx)(m,{data:b.slice(0,4),columns:L})})]})]})},z={decorators:[e=>(0,_.jsx)(`div`,{className:`x1eiddq6 x1gt495`,children:(0,_.jsx)(e,{})})],render:()=>(0,_.jsx)(l,{width:520,children:(0,_.jsxs)(u,{gap:3,children:[(0,_.jsx)(c,{level:3,children:`Team Members`}),(0,_.jsx)(m,{data:b.slice(0,4),columns:L,hasHover:!0})]})})},B={decorators:[e=>(0,_.jsx)(`div`,{className:`x1eiddq6 x1gt495`,children:(0,_.jsx)(e,{})})],render:()=>(0,_.jsx)(l,{width:560,children:(0,_.jsx)(ne,{header:(0,_.jsx)(oe,{hasDivider:!0,children:(0,_.jsx)(c,{level:3,children:`User Directory`})}),content:(0,_.jsx)(re,{children:(0,_.jsx)(m,{data:b,columns:L,hasHover:!0,isStriped:!0})}),footer:(0,_.jsx)(_e,{hasDivider:!0,children:(0,_.jsxs)(fe,{gap:2,hAlign:`end`,children:[(0,_.jsx)(s,{label:`Export`,variant:`secondary`,children:`Export`}),(0,_.jsx)(s,{label:`Add User`,variant:`primary`,children:`Add User`})]})})})})},V={decorators:[e=>(0,_.jsx)(`div`,{className:`x1eiddq6 x1gt495`,children:(0,_.jsx)(e,{})})],render:()=>(0,_.jsxs)(l,{width:520,children:[(0,_.jsxs)(u,{gap:3,children:[(0,_.jsx)(c,{level:3,children:`Dashboard`}),(0,_.jsx)(`p`,{className:`x9ynric xv1l7n4 xif65rj x1ghz6dp`,children:`The table below is in a wash section for visual separation.`})]}),(0,_.jsx)(he,{variant:`muted`,children:(0,_.jsx)(m,{data:b.slice(0,3),columns:L,density:`compact`})})]})},H={decorators:[e=>(0,_.jsx)(`div`,{className:`x1eiddq6 x1gt495`,children:(0,_.jsx)(e,{})})],render:()=>(0,_.jsx)(`div`,{className:`x78zum5 x1qh66ti x1a02dak x7a106z`,children:[`compact`,`balanced`,`spacious`].map(e=>(0,_.jsxs)(`div`,{children:[(0,_.jsx)(`h4`,{className:`xrcdmg7 x9ynric xif65rj xv1l7n4`,children:e}),(0,_.jsx)(l,{width:400,children:(0,_.jsxs)(u,{gap:2,children:[(0,_.jsx)(c,{level:4,children:`Team`}),(0,_.jsx)(m,{data:b.slice(0,3),columns:L,density:e})]})})]},e))})},U={decorators:[e=>(0,_.jsx)(`div`,{className:`x1eiddq6 x1gt495`,children:(0,_.jsx)(e,{})})],render:()=>(0,_.jsxs)(`div`,{className:`x78zum5 x1qh66ti x1a02dak x7a106z`,children:[(0,_.jsxs)(`div`,{children:[(0,_.jsx)(`h4`,{className:`xrcdmg7 x9ynric xif65rj xv1l7n4`,children:`Standalone (no container)`}),(0,_.jsx)(`div`,{style:{width:400},children:(0,_.jsx)(m,{data:b.slice(0,3),columns:L})})]}),(0,_.jsxs)(`div`,{children:[(0,_.jsx)(`h4`,{className:`xrcdmg7 x9ynric xif65rj xv1l7n4`,children:`Inside Card`}),(0,_.jsx)(l,{width:400,children:(0,_.jsx)(m,{data:b.slice(0,3),columns:L})})]})]})},W=[{id:`1`,description:`Cloud hosting (monthly)`,category:`Infrastructure`,quantity:1,amount:`$2,400.00`},{id:`2`,description:`Design software licenses`,category:`Tools`,quantity:12,amount:`$1,188.00`},{id:`3`,description:`Team offsite catering`,category:`Events`,quantity:45,amount:`$3,150.00`},{id:`4`,description:`Ergonomic keyboards`,category:`Hardware`,quantity:8,amount:`$1,592.00`},{id:`5`,description:`Annual conference tickets`,category:`Travel`,quantity:3,amount:`$4,500.00`}],G=[{key:`description`,header:`Description`,width:h(2)},{key:`category`,header:`Category`},{key:`quantity`,header:`Qty`,align:`center`,width:g(80)},{key:`amount`,header:`Amount`,align:`end`,width:g(120)}],K={render:()=>(0,_.jsx)(m,{data:W,columns:G,idKey:`id`,hasHover:!0,dividers:`rows`})},De=[{id:`1`,name:`Alice Johnson`,bio:`Full-stack engineer with 8 years of experience. Specializes in distributed systems and performance optimization. Previously at Stripe and Google.`,role:`Staff Engineer`},{id:`2`,name:`Bob Smith`,bio:`Product designer focused on design systems and accessibility.`,role:`Senior Designer`},{id:`3`,name:`Charlie Brown`,bio:`Engineering manager leading the platform team. Passionate about developer experience, tooling, and building inclusive teams that ship with confidence.`,role:`EM`}],Oe=[{key:`name`,header:`Name`,width:g(140)},{key:`bio`,header:`Bio`,width:h(3),renderCell:e=>(0,_.jsx)(`span`,{style:{whiteSpace:`normal`,overflow:`visible`,display:`block`},children:e.bio})},{key:`role`,header:`Role`,align:`end`,width:g(140)}],q={render:()=>(0,_.jsx)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:`32px`},children:[`middle`,`top`,`bottom`].map(e=>(0,_.jsxs)(`div`,{children:[(0,_.jsxs)(`p`,{style:{margin:`0 0 8px`,fontWeight:600},children:[`verticalAlign="`,e,`"`]}),(0,_.jsx)(m,{data:De,columns:Oe,idKey:`id`,verticalAlign:e,dividers:`rows`})]},e))})},J=[{id:`1`,name:`Alice Johnson`,department:`Engineering`,title:`Senior Software Engineer`,location:`San Francisco`,email:`alice.johnson@example.com`,status:`Active`},{id:`2`,name:`Bob Martinez`,department:`Product Design`,title:`Lead Product Designer`,location:`New York`,email:`bob.martinez@example.com`,status:`Active`},{id:`3`,name:`Carol Williams`,department:`Data Science`,title:`Staff Data Scientist`,location:`Seattle`,email:`carol.williams@example.com`,status:`On Leave`}],Y=[{key:`name`,header:`Name`},{key:`department`,header:`Department`},{key:`title`,header:`Title`},{key:`location`,header:`Location`},{key:`email`,header:`Email`},{key:`status`,header:`Status`}],X={render:()=>(0,_.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:`32px`},children:[(0,_.jsxs)(`div`,{children:[(0,_.jsx)(`p`,{style:{margin:`0 0 8px`,fontWeight:600},children:`320px container — 6 columns, horizontal scroll`}),(0,_.jsx)(`div`,{style:{width:`320px`,border:`1px dashed #ccc`,borderRadius:`8px`},children:(0,_.jsx)(m,{data:J,columns:Y,idKey:`id`,dividers:`rows`,density:`compact`,textOverflow:`truncate`})})]}),(0,_.jsxs)(`div`,{children:[(0,_.jsx)(`p`,{style:{margin:`0 0 8px`,fontWeight:600},children:`480px container — same table, no unnecessary scroll`}),(0,_.jsx)(`div`,{style:{width:`480px`,border:`1px dashed #ccc`,borderRadius:`8px`},children:(0,_.jsx)(m,{data:J,columns:Y,idKey:`id`,dividers:`rows`,density:`compact`,textOverflow:`truncate`})})]}),(0,_.jsxs)(`div`,{children:[(0,_.jsx)(`p`,{style:{margin:`0 0 8px`,fontWeight:600},children:`Full width — no scroll needed`}),(0,_.jsx)(m,{data:J,columns:Y,idKey:`id`,dividers:`rows`,density:`compact`,textOverflow:`truncate`})]})]}),play:async({canvasElement:e})=>{await document.fonts.ready,await new Promise(e=>requestAnimationFrame(()=>requestAnimationFrame(()=>e())));let t=e.querySelectorAll(`.astryx-table-scroll-wrapper`);v(t).toHaveLength(3);let[n,r,i]=Array.from(t);await y(()=>{v(n).toHaveAttribute(`data-scrollable-inline`,`true`)}),v(n.scrollWidth).toBeGreaterThan(n.clientWidth),v(n.querySelector(`table`)?.style.minWidth).toBe(`360px`);for(let e of n.querySelectorAll(`th`))v(e.getBoundingClientRect().width).toBeGreaterThanOrEqual(59);for(let e of[r,i])await y(()=>{v(e).not.toHaveAttribute(`data-scrollable-inline`)}),v(e.scrollWidth).toBeLessThanOrEqual(e.clientWidth+1)}},Z={render:()=>(0,_.jsx)(`div`,{style:{width:`360px`,border:`1px dashed #ccc`,borderRadius:`8px`},children:(0,_.jsx)(l,{children:(0,_.jsx)(m,{data:J,columns:Y,idKey:`id`,dividers:`rows`,density:`compact`,textOverflow:`truncate`})})})},Q=[{name:`label`,type:`string`,description:`The visible text label for the button.`},{name:`variant`,type:`'primary' | 'secondary' | 'ghost' | 'danger'`,description:`Visual style variant. Primary for main actions, secondary for supporting actions, ghost for minimal emphasis, danger for destructive operations.`},{name:`size`,type:`'sm' | 'md' | 'lg'`,description:`Controls button height, padding, and font size.`},{name:`isDisabled`,type:`boolean`,description:`Disables the button, preventing interactions and applying disabled styling.`},{name:`onClick`,type:`(event: MouseEvent) => void`,description:`Callback fired when the button is clicked.`},{name:`startIcon`,type:`ReactNode`,description:`Icon rendered before the label text.`}],$={render:()=>{let e=[{key:`name`,header:`Prop`,width:g(140),renderCell:e=>(0,_.jsx)(o,{type:`code`,weight:`bold`,children:e.name})},{key:`type`,header:`Type`,width:g(240),renderCell:e=>(0,_.jsx)(o,{type:`code`,color:`secondary`,children:e.type})},{key:`description`,header:`Description`}];return(0,_.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:`32px`},children:[(0,_.jsxs)(`div`,{children:[(0,_.jsx)(`p`,{style:{margin:`0 0 8px`,fontWeight:600},children:`360px — docsite props table on mobile`}),(0,_.jsx)(`div`,{style:{width:`360px`,border:`1px dashed #ccc`,borderRadius:`8px`},children:(0,_.jsx)(m,{data:Q,columns:e,density:`spacious`,dividers:`rows`})})]}),(0,_.jsxs)(`div`,{children:[(0,_.jsx)(`p`,{style:{margin:`0 0 8px`,fontWeight:600},children:`Full width — normal desktop experience`}),(0,_.jsx)(m,{data:Q,columns:e,density:`spacious`,dividers:`rows`})]})]})}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  args: {
    data: users,
    columns,
    idKey: 'id'
  }
}`,...C.parameters?.docs?.source}}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  args: {
    data: users,
    columns,
    idKey: 'id',
    density: 'compact'
  }
}`,...w.parameters?.docs?.source}}},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  args: {
    data: users,
    columns,
    idKey: 'id',
    density: 'spacious'
  }
}`,...T.parameters?.docs?.source}}},E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  args: {
    data: users,
    columns,
    idKey: 'id',
    isStriped: true,
    hasHover: true
  }
}`,...E.parameters?.docs?.source}}},D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
  args: {
    data: users,
    columns,
    idKey: 'id',
    dividers: 'grid'
  }
}`,...D.parameters?.docs?.source}}},O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
  args: {
    data: users,
    columns,
    idKey: 'id',
    dividers: 'columns'
  }
}`,...O.parameters?.docs?.source}}},k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
  args: {
    data: users,
    columns,
    idKey: 'id',
    dividers: 'none'
  }
}`,...k.parameters?.docs?.source}}},A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`{
  render: () => <Table data={[{
    name: 'Alice',
    role: 'Engineer',
    status: 'Active'
  }, {
    name: 'Bob',
    role: 'Designer',
    status: 'Away'
  }]} hasHover />
}`,...A.parameters?.docs?.source}}},j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
  render: () => {
    const cols: TableColumn<User>[] = [{
      key: 'name',
      header: 'Name'
    }, {
      key: 'email',
      header: 'Email',
      width: proportional(2),
      renderCell: item => <a href={\`mailto:\${item.email}\`} style={{
        color: 'inherit'
      }}>
            {item.email}
          </a>
    }, {
      key: 'role',
      header: 'Role',
      renderCell: item => <span style={{
        padding: \`\${spacingDefaults['--spacing-0-5']} \${spacingDefaults['--spacing-2']}\`,
        borderRadius: radiusDefaults['--radius-inner'],
        fontSize: textSizeDefaults['--font-size-xs'],
        backgroundColor: item.role === 'Engineer' ? colorDefaults['--color-background-blue'] : colorDefaults['--color-background-purple'],
        color: item.role === 'Engineer' ? colorDefaults['--color-text-blue'] : colorDefaults['--color-text-purple']
      }}>
            {item.role}
          </span>
    }, {
      key: 'age',
      header: 'Age',
      width: pixel(80)
    }];
    return <Table data={users} columns={cols} idKey="id" hasHover />;
  }
}`,...j.parameters?.docs?.source}}},M.parameters={...M.parameters,docs:{...M.parameters?.docs,source:{originalSource:`{
  render: () => <Table density="balanced" dividers="rows" isStriped hasHover>
      <TableHeader>
        <TableRow>
          <TableHeaderCell>Name</TableHeaderCell>
          <TableHeaderCell>Email</TableHeaderCell>
          <TableHeaderCell>Role</TableHeaderCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>Alice</TableCell>
          <TableCell>alice@example.com</TableCell>
          <TableCell>Engineer</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Bob</TableCell>
          <TableCell>bob@example.com</TableCell>
          <TableCell>Designer</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Charlie</TableCell>
          <TableCell>charlie@example.com</TableCell>
          <TableCell>PM</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Diana</TableCell>
          <TableCell>diana@example.com</TableCell>
          <TableCell>Engineer</TableCell>
        </TableRow>
      </TableBody>
    </Table>
}`,...M.parameters?.docs?.source}}},N.parameters={...N.parameters,docs:{...N.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: '32px'
  }}>
      <div>
        <p style={{
        margin: '0 0 8px',
        fontWeight: 600
      }}>Compact</p>
        <Table data={users.slice(0, 3)} columns={columns} idKey="id" density="compact" />
      </div>
      <div>
        <p style={{
        margin: '0 0 8px',
        fontWeight: 600
      }}>Balanced (default)</p>
        <Table data={users.slice(0, 3)} columns={columns} idKey="id" density="balanced" />
      </div>
      <div>
        <p style={{
        margin: '0 0 8px',
        fontWeight: 600
      }}>Spacious</p>
        <Table data={users.slice(0, 3)} columns={columns} idKey="id" density="spacious" />
      </div>
    </div>
}`,...N.parameters?.docs?.source}}},P.parameters={...P.parameters,docs:{...P.parameters?.docs,source:{originalSource:`{
  args: {
    data: users,
    columns,
    idKey: 'id',
    density: 'compact',
    dividers: 'grid',
    isStriped: true,
    hasHover: true
  }
}`,...P.parameters?.docs?.source}}},I.parameters={...I.parameters,docs:{...I.parameters?.docs,source:{originalSource:`{
  render: () => {
    const cols: TableColumn<OverflowRow>[] = [{
      key: 'scenario',
      header: 'Scenario',
      width: pixel(160)
    }, {
      key: 'content',
      header: 'Content',
      width: proportional(1)
    }];
    return <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '32px',
      width: '480px'
    }}>
        <div>
          <h4 style={{
          margin: '0 0 8px'
        }}>Wrap (default)</h4>
          <Table data={overflowData} columns={cols} dividers="grid" density="balanced" />
        </div>
        <div>
          <h4 style={{
          margin: '0 0 8px'
        }}>Truncate (with tooltip on hover)</h4>
          <Table data={overflowData} columns={cols} dividers="grid" density="balanced" textOverflow="truncate" />
        </div>
      </div>;
  }
}`,...I.parameters?.docs?.source},description:{story:`Text wraps by default — rows grow taller and no content is hidden.
Set \`textOverflow="truncate"\` for dense data tables where fixed row
height matters. In truncate mode, default-rendered cells show a
tooltip on hover when text is actually overflowing.`,...I.parameters?.docs?.description}}},R.parameters={...R.parameters,docs:{...R.parameters?.docs,source:{originalSource:`{
  decorators: [Story => <div {...stylex.props(containerStoryStyles.pageWrapper)}>
        <Story />
      </div>],
  render: () => <div {...stylex.props(containerStoryStyles.storyWrapper)}>
      <div>
        <h4 {...stylex.props(containerStoryStyles.heading)}>
          Table in Card (auto bleed)
        </h4>
        <Card width={480}>
          <Table data={users.slice(0, 4)} columns={simpleColumns} />
        </Card>
      </div>
      <div>
        <h4 {...stylex.props(containerStoryStyles.heading)}>
          Before: Card padding={0} (old pattern)
        </h4>
        <Card width={480} padding={0}>
          <Table data={users.slice(0, 4)} columns={simpleColumns} />
        </Card>
      </div>
    </div>
}`,...R.parameters?.docs?.source},description:{story:`Table inside a Card automatically bleeds to the card edges.
The first column's start padding and last column's end padding
align with the card's content padding, so text lines up with
other content in the card.`,...R.parameters?.docs?.description}}},z.parameters={...z.parameters,docs:{...z.parameters?.docs,source:{originalSource:`{
  decorators: [Story => <div {...stylex.props(containerStoryStyles.pageWrapper)}>
        <Story />
      </div>],
  render: () => <Card width={520}>
      <VStack gap={3}>
        <Heading level={3}>Team Members</Heading>
        <Table data={users.slice(0, 4)} columns={simpleColumns} hasHover />
      </VStack>
    </Card>
}`,...z.parameters?.docs?.source},description:{story:`Card with a heading above the table. The table bleeds edge-to-edge
while the heading respects the card's content padding — text in the
first column aligns with the heading.`,...z.parameters?.docs?.description}}},B.parameters={...B.parameters,docs:{...B.parameters?.docs,source:{originalSource:`{
  decorators: [Story => <div {...stylex.props(containerStoryStyles.pageWrapper)}>
        <Story />
      </div>],
  render: () => <Card width={560}>
      <Layout header={<LayoutHeader hasDivider>
            <Heading level={3}>User Directory</Heading>
          </LayoutHeader>} content={<LayoutContent>
            <Table data={users} columns={simpleColumns} hasHover isStriped />
          </LayoutContent>} footer={<LayoutFooter hasDivider>
            <HStack gap={2} hAlign="end">
              <Button label="Export" variant="secondary">
                Export
              </Button>
              <Button label="Add User" variant="primary">
                Add User
              </Button>
            </HStack>
          </LayoutFooter>} />
    </Card>
}`,...B.parameters?.docs?.source},description:{story:`Table inside a Card with Layout — header, content with table, footer.
The table bleeds within the layout content area while header/footer
retain their own padding.`,...B.parameters?.docs?.description}}},V.parameters={...V.parameters,docs:{...V.parameters?.docs,source:{originalSource:`{
  decorators: [Story => <div {...stylex.props(containerStoryStyles.pageWrapper)}>
        <Story />
      </div>],
  render: () => <Card width={520}>
      <VStack gap={3}>
        <Heading level={3}>Dashboard</Heading>
        <p {...stylex.props(containerStoryStyles.text)}>
          The table below is in a wash section for visual separation.
        </p>
      </VStack>
      <Section variant="muted">
        <Table data={users.slice(0, 3)} columns={simpleColumns} density="compact" />
      </Section>
    </Card>
}`,...V.parameters?.docs?.source},description:{story:`Table inside a Section with wash background. The section escapes
the card padding, and the table bleeds within the section.`,...V.parameters?.docs?.description}}},H.parameters={...H.parameters,docs:{...H.parameters?.docs,source:{originalSource:`{
  decorators: [Story => <div {...stylex.props(containerStoryStyles.pageWrapper)}>
        <Story />
      </div>],
  render: () => <div {...stylex.props(containerStoryStyles.storyWrapper)}>
      {(['compact', 'balanced', 'spacious'] as const).map(density => <div key={density}>
          <h4 {...stylex.props(containerStoryStyles.heading)}>{density}</h4>
          <Card width={400}>
            <VStack gap={2}>
              <Heading level={4}>Team</Heading>
              <Table data={users.slice(0, 3)} columns={simpleColumns} density={density} />
            </VStack>
          </Card>
        </div>)}
    </div>
}`,...H.parameters?.docs?.source},description:{story:`Compares all three density levels inside cards to show how
the edge padding adapts — it always matches the container padding,
with a minimum of 8px even for compact tables.`,...H.parameters?.docs?.description}}},U.parameters={...U.parameters,docs:{...U.parameters?.docs,source:{originalSource:`{
  decorators: [Story => <div {...stylex.props(containerStoryStyles.pageWrapper)}>
        <Story />
      </div>],
  render: () => <div {...stylex.props(containerStoryStyles.storyWrapper)}>
      <div>
        <h4 {...stylex.props(containerStoryStyles.heading)}>
          Standalone (no container)
        </h4>
        <div style={{
        width: 400
      }}>
          <Table data={users.slice(0, 3)} columns={simpleColumns} />
        </div>
      </div>
      <div>
        <h4 {...stylex.props(containerStoryStyles.heading)}>Inside Card</h4>
        <Card width={400}>
          <Table data={users.slice(0, 3)} columns={simpleColumns} />
        </Card>
      </div>
    </div>
}`,...U.parameters?.docs?.source},description:{story:`Standalone table (no container) — behaves normally with
density-based cell padding. No bleed, no edge compensation.`,...U.parameters?.docs?.description}}},K.parameters={...K.parameters,docs:{...K.parameters?.docs,source:{originalSource:`{
  render: () => <Table data={transactions} columns={alignedColumns} idKey="id" hasHover dividers="rows" />
}`,...K.parameters?.docs?.source},description:{story:"Per-column horizontal alignment via the `align` prop.\n\n- `'start'` (default) — left in LTR, right in RTL\n- `'center'` — centered text\n- `'end'` — right in LTR, left in RTL\n\nAlignment applies to both the header `<th>` and body `<td>` cells.\nNumeric columns typically use `align: 'end'`, while status or icon\ncolumns work well with `align: 'center'`.",...K.parameters?.docs?.description}}},q.parameters={...q.parameters,docs:{...q.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: '32px'
  }}>
      {(['middle', 'top', 'bottom'] as const).map(vAlign => <div key={vAlign}>
          <p style={{
        margin: '0 0 8px',
        fontWeight: 600
      }}>
            verticalAlign=&quot;{vAlign}&quot;
          </p>
          <Table data={teamMembers} columns={verticalAlignColumns} idKey="id" verticalAlign={vAlign} dividers="rows" />
        </div>)}
    </div>
}`,...q.parameters?.docs?.source},description:{story:`Compares all three \`verticalAlign\` options side by side.

- \`'middle'\` (default) — vertically centers cell content
- \`'top'\` — aligns to the top, useful for multi-line cells
- \`'bottom'\` — aligns to the bottom

Uses a multi-line "Bio" column with wrapping text to make
the vertical alignment difference visible.`,...q.parameters?.docs?.description}}},X.parameters={...X.parameters,docs:{...X.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: '32px'
  }}>
      <div>
        <p style={{
        margin: '0 0 8px',
        fontWeight: 600
      }}>
          320px container — 6 columns, horizontal scroll
        </p>
        <div style={{
        width: '320px',
        border: '1px dashed #ccc',
        borderRadius: '8px'
      }}>
          <Table data={mobileData} columns={mobileColumns} idKey="id" dividers="rows" density="compact" textOverflow="truncate" />
        </div>
      </div>
      <div>
        <p style={{
        margin: '0 0 8px',
        fontWeight: 600
      }}>
          480px container — same table, no unnecessary scroll
        </p>
        <div style={{
        width: '480px',
        border: '1px dashed #ccc',
        borderRadius: '8px'
      }}>
          <Table data={mobileData} columns={mobileColumns} idKey="id" dividers="rows" density="compact" textOverflow="truncate" />
        </div>
      </div>
      <div>
        <p style={{
        margin: '0 0 8px',
        fontWeight: 600
      }}>
          Full width — no scroll needed
        </p>
        <Table data={mobileData} columns={mobileColumns} idKey="id" dividers="rows" density="compact" textOverflow="truncate" />
      </div>
    </div>,
  play: async ({
    canvasElement
  }) => {
    await document.fonts.ready;
    await new Promise<void>(resolve => requestAnimationFrame(() => requestAnimationFrame(() => resolve())));
    const wrappers = canvasElement.querySelectorAll<HTMLElement>('.astryx-table-scroll-wrapper');
    expect(wrappers).toHaveLength(3);
    const [narrow, medium, wide] = Array.from(wrappers);
    await waitFor(() => {
      expect(narrow).toHaveAttribute('data-scrollable-inline', 'true');
    });
    expect(narrow.scrollWidth).toBeGreaterThan(narrow.clientWidth);
    expect(narrow.querySelector('table')?.style.minWidth).toBe('360px');
    for (const header of narrow.querySelectorAll('th')) {
      expect(header.getBoundingClientRect().width).toBeGreaterThanOrEqual(59);
    }
    for (const fitting of [medium, wide]) {
      await waitFor(() => {
        expect(fitting).not.toHaveAttribute('data-scrollable-inline');
      });
      expect(fitting.scrollWidth).toBeLessThanOrEqual(fitting.clientWidth + 1);
    }
  }
}`,...X.parameters?.docs?.source},description:{story:`Demonstrates table behavior in narrow containers (mobile viewports).

With many columns, the table's minimum width (driven by per-column
minimums) exceeds the container width. Instead of squishing columns
to illegible widths, the table scrolls horizontally.

Each column without an explicit \`width\` keeps an equal flexible share and a
compact 60px readability floor. Six columns therefore require at least 360px:
the 320px container scrolls, while the 480px container fits without needless
overflow.`,...X.parameters?.docs?.description}}},Z.parameters={...Z.parameters,docs:{...Z.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    width: '360px',
    border: '1px dashed #ccc',
    borderRadius: '8px'
  }}>
      <Card>
        <Table data={mobileData} columns={mobileColumns} idKey="id" dividers="rows" density="compact" textOverflow="truncate" />
      </Card>
    </div>
}`,...Z.parameters?.docs?.source},description:{story:`Shows horizontal scroll behavior when a table with many columns
is placed inside a Card in a narrow container, verifying that
container bleed and scroll compose correctly.`,...Z.parameters?.docs?.description}}},$.parameters={...$.parameters,docs:{...$.parameters?.docs,source:{originalSource:`{
  render: () => {
    const cols: TableColumn<PropEntry>[] = [{
      key: 'name',
      header: 'Prop',
      width: pixel(140),
      renderCell: (item: PropEntry) => <Text type="code" weight="bold">
            {item.name}
          </Text>
    }, {
      key: 'type',
      header: 'Type',
      width: pixel(240),
      renderCell: (item: PropEntry) => <Text type="code" color="secondary">
            {item.type}
          </Text>
    }, {
      key: 'description',
      header: 'Description'
    }];
    return <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '32px'
    }}>
        <div>
          <p style={{
          margin: '0 0 8px',
          fontWeight: 600
        }}>
            360px — docsite props table on mobile
          </p>
          <div style={{
          width: '360px',
          border: '1px dashed #ccc',
          borderRadius: '8px'
        }}>
            <Table data={propData} columns={cols} density="spacious" dividers="rows" />
          </div>
        </div>
        <div>
          <p style={{
          margin: '0 0 8px',
          fontWeight: 600
        }}>
            Full width — normal desktop experience
          </p>
          <Table data={propData} columns={cols} density="spacious" dividers="rows" />
        </div>
      </div>;
  }
}`,...$.parameters?.docs?.source},description:{story:`Mirrors the docsite props-table pattern: two fixed pixel columns
(Prop name + Type) and a flexible Description column.

On mobile (320px), the fixed columns consume most of the space,
leaving description unreadable. With horizontal scroll, all three
columns maintain usable widths.`,...$.parameters?.docs?.description}}},ke=[`Default`,`Compact`,`Spacious`,`StripedWithHover`,`GridDividers`,`ColumnDividers`,`NoDividers`,`AutoColumns`,`CustomCellRenderer`,`ChildrenMode`,`AllDensities`,`KitchenSink`,`OverflowBehavior`,`InCard`,`InCardWithHeading`,`InCardWithLayout`,`InCardWithSection`,`InCardDensities`,`StandaloneVsContainer`,`ColumnAlignment`,`VerticalAlignment`,`ResponsiveScroll`,`ResponsiveScrollInCard`,`PropsTablePattern`]})))()}Ae();export{N as AllDensities,A as AutoColumns,M as ChildrenMode,K as ColumnAlignment,O as ColumnDividers,w as Compact,j as CustomCellRenderer,C as Default,D as GridDividers,R as InCard,H as InCardDensities,z as InCardWithHeading,B as InCardWithLayout,V as InCardWithSection,P as KitchenSink,k as NoDividers,I as OverflowBehavior,$ as PropsTablePattern,X as ResponsiveScroll,Z as ResponsiveScrollInCard,T as Spacious,U as StandaloneVsContainer,E as StripedWithHover,q as VerticalAlignment,ke as __namedExportsOrder,S as default};