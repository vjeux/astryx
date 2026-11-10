import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{n as t,t as n}from"./stylex-BSlGVhGe.js";import{t as r}from"./jsx-runtime-MKhVqBIO.js";import{n as i,t as a}from"./rtlStyles-BwjrfDSU.js";import{n as o,t as s}from"./Icon-BmO5FtDV.js";import{i as c,n as l,r as u,t as d}from"./BreadcrumbItem-DVw8X0_V.js";import{d as f,f as p}from"./renderDropdownItems-hNxj8lO0.js";import{n as m,t as h}from"./VStack-SWtDePqc.js";import{n as g,t as _}from"./Cog6ToothIcon-CMrx7Bfx.js";import{n as v,t as y}from"./FolderIcon-ClNF1B0d.js";import{n as b,t as x}from"./HomeIcon-BT8asZXE.js";var S,C,w,T,E,D,O,k,A,j,M,N,P,F,I,L,R,z,B,V,H;function U(){return(U=e((()=>{n(),c(),l(),p(),o(),m(),a(),b(),g(),v(),S=r(),C={title:`Core/Breadcrumbs`,component:u,tags:[`autodocs`],argTypes:{separator:{control:`text`,description:`Separator between items`},label:{control:`text`,description:`Accessible label for the nav landmark`},variant:{control:`select`,options:[`default`,`supporting`],description:`Visual variant controlling text size and color`}}},w={render:()=>(0,S.jsxs)(u,{children:[(0,S.jsx)(d,{href:`/`,children:`Home`}),(0,S.jsx)(d,{href:`/projects`,children:`Projects`}),(0,S.jsx)(d,{isCurrent:!0,children:`My Project`})]})},T={render:()=>(0,S.jsxs)(u,{children:[(0,S.jsx)(d,{href:`/`,children:`Home`}),(0,S.jsx)(d,{isCurrent:!0,children:`Settings`})]})},E={name:`Auto-detect Current`,render:()=>(0,S.jsxs)(u,{children:[(0,S.jsx)(d,{href:`/`,children:`Home`}),(0,S.jsx)(d,{href:`/projects`,children:`Projects`}),(0,S.jsx)(d,{children:`Auto Current`})]})},D={tags:[`visual-baseline`],render:()=>(0,S.jsxs)(h,{gap:3,children:[(0,S.jsxs)(u,{label:`Automatic bidi separator`,separator:`›`,children:[(0,S.jsx)(d,{href:`/`,children:`Home`}),(0,S.jsx)(d,{href:`/docs`,children:`Docs`}),(0,S.jsx)(d,{isCurrent:!0,children:`API Reference`})]}),(0,S.jsxs)(u,{label:`Explicitly mirrored separator`,separator:(0,S.jsx)(`span`,{...t(i.mirror),children:`→`}),children:[(0,S.jsx)(d,{href:`/`,children:`Home`}),(0,S.jsx)(d,{href:`/docs`,children:`Docs`}),(0,S.jsx)(d,{isCurrent:!0,children:`API Reference`})]})]})},O={render:()=>(0,S.jsxs)(u,{children:[(0,S.jsx)(d,{href:`/`,startIcon:(0,S.jsx)(s,{icon:x,size:`sm`}),children:`Home`}),(0,S.jsx)(d,{href:`/settings`,startIcon:(0,S.jsx)(s,{icon:_,size:`sm`}),children:`Settings`}),(0,S.jsx)(d,{isCurrent:!0,children:`Profile`})]})},k={render:()=>(0,S.jsxs)(u,{children:[(0,S.jsx)(d,{href:`/`,onClick:e=>{e.preventDefault(),console.log(`Navigate to Home`)},children:`Home`}),(0,S.jsx)(d,{href:`/projects`,onClick:e=>{e.preventDefault(),console.log(`Navigate to Projects`)},children:`Projects`}),(0,S.jsx)(d,{isCurrent:!0,children:`Detail`})]})},A={render:()=>(0,S.jsxs)(u,{children:[(0,S.jsx)(d,{href:`/`,children:`Home`}),(0,S.jsx)(d,{href:`/products`,children:`Products`}),(0,S.jsx)(d,{href:`/products/electronics`,children:`Electronics`}),(0,S.jsx)(d,{href:`/products/electronics/phones`,children:`Phones`}),(0,S.jsx)(d,{isCurrent:!0,children:`iPhone 15 Pro`})]})},j={name:`Supporting Variant`,render:()=>(0,S.jsxs)(u,{variant:`supporting`,children:[(0,S.jsx)(d,{href:`/`,children:`Home`}),(0,S.jsx)(d,{href:`/projects`,children:`Projects`}),(0,S.jsx)(d,{isCurrent:!0,children:`My Project`})]})},M={name:`Supporting Variant with Icons`,render:()=>(0,S.jsxs)(u,{variant:`supporting`,children:[(0,S.jsx)(d,{href:`/`,startIcon:(0,S.jsx)(s,{icon:x,size:`xsm`}),children:`Home`}),(0,S.jsx)(d,{href:`/projects`,startIcon:(0,S.jsx)(s,{icon:y,size:`xsm`}),children:`Projects`}),(0,S.jsx)(d,{isCurrent:!0,children:`My Project`})]})},N={name:`Current on Middle Item`,render:()=>(0,S.jsxs)(u,{children:[(0,S.jsx)(d,{href:`/`,children:`Home`}),(0,S.jsx)(d,{isCurrent:!0,children:`Projects`}),(0,S.jsx)(d,{href:`/projects/my-project/settings`,children:`Settings`})]})},P=[{label:`Design`,onClick:()=>console.log(`go /team/design`)},{label:`Engineering`,onClick:()=>console.log(`go /team/eng`)},{type:`divider`},{label:`Data`,icon:`chart`,onClick:()=>console.log(`go /team/data`)}],F={name:`Menu Crumb (data array)`,render:()=>(0,S.jsxs)(u,{children:[(0,S.jsx)(d,{href:`/`,children:`Home`}),(0,S.jsx)(d,{menu:P,children:`Teams`}),(0,S.jsx)(d,{isCurrent:!0,children:`Overview`})]})},I={name:`Menu Crumb (composed children)`,render:()=>(0,S.jsxs)(u,{children:[(0,S.jsx)(d,{href:`/`,children:`Home`}),(0,S.jsx)(d,{menu:(0,S.jsxs)(S.Fragment,{children:[(0,S.jsx)(f,{label:`Overview`,onClick:()=>console.log(`overview`)}),(0,S.jsx)(f,{label:`Settings`,icon:`gear`,onClick:()=>console.log(`settings`)})]}),children:`Project`}),(0,S.jsx)(d,{isCurrent:!0,children:`Details`})]})},L={name:`Mirrored Icon Separator`,render:()=>(0,S.jsxs)(u,{separator:(0,S.jsx)(s,{icon:`chevronRight`,size:`xsm`,color:`secondary`,xstyle:i.mirror}),children:[(0,S.jsx)(d,{href:`/`,children:`Home`}),(0,S.jsx)(d,{href:`/docs`,children:`Docs`}),(0,S.jsx)(d,{isCurrent:!0,children:`API Reference`})]})},R={name:`Long Labels in a Narrow Container`,render:()=>(0,S.jsx)(`div`,{style:{width:320,outline:`1px dashed #ccc`},children:(0,S.jsxs)(u,{children:[(0,S.jsx)(d,{href:`/`,children:`Home`}),(0,S.jsx)(d,{href:`/reports`,children:`Quarterly Financial Reconciliation`}),(0,S.jsx)(d,{isCurrent:!0,children:`Consolidated Statement of Operations 2026 Q3`})]})})},z={render:()=>(0,S.jsx)(u,{children:(0,S.jsx)(d,{isCurrent:!0,children:`Only Page`})})},B=[{label:`Design`,onClick:()=>console.log(`go /team/design`)},{label:`Engineering`,isDisabled:!0},{type:`divider`},{label:`Data`,icon:`chart`,onClick:()=>console.log(`go /team/data`)}],V={name:`Menu Crumb (disabled item)`,render:()=>(0,S.jsxs)(u,{children:[(0,S.jsx)(d,{href:`/`,children:`Home`}),(0,S.jsx)(d,{menu:B,children:`Teams`}),(0,S.jsx)(d,{isCurrent:!0,children:`Overview`})]}),play:async({canvasElement:e})=>{let t=e.querySelector(`nav button`);t instanceof HTMLElement&&t.click()}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  render: () => <Breadcrumbs>
      <BreadcrumbItem href="/">Home</BreadcrumbItem>
      <BreadcrumbItem href="/projects">Projects</BreadcrumbItem>
      <BreadcrumbItem isCurrent>My Project</BreadcrumbItem>
    </Breadcrumbs>
}`,...w.parameters?.docs?.source}}},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  render: () => <Breadcrumbs>
      <BreadcrumbItem href="/">Home</BreadcrumbItem>
      <BreadcrumbItem isCurrent>Settings</BreadcrumbItem>
    </Breadcrumbs>
}`,...T.parameters?.docs?.source}}},E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  name: 'Auto-detect Current',
  render: () => <Breadcrumbs>
      <BreadcrumbItem href="/">Home</BreadcrumbItem>
      <BreadcrumbItem href="/projects">Projects</BreadcrumbItem>
      <BreadcrumbItem>Auto Current</BreadcrumbItem>
    </Breadcrumbs>
}`,...E.parameters?.docs?.source}}},D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
  tags: ['visual-baseline'],
  render: () => <VStack gap={3}>
      <Breadcrumbs label="Automatic bidi separator" separator={'›'}>
        <BreadcrumbItem href="/">Home</BreadcrumbItem>
        <BreadcrumbItem href="/docs">Docs</BreadcrumbItem>
        <BreadcrumbItem isCurrent>API Reference</BreadcrumbItem>
      </Breadcrumbs>
      <Breadcrumbs label="Explicitly mirrored separator" separator={<span {...stylex.props(rtlStyles.mirror)}>→</span>}>
        <BreadcrumbItem href="/">Home</BreadcrumbItem>
        <BreadcrumbItem href="/docs">Docs</BreadcrumbItem>
        <BreadcrumbItem isCurrent>API Reference</BreadcrumbItem>
      </Breadcrumbs>
    </VStack>
}`,...D.parameters?.docs?.source},description:{story:`Covers both separator strategies D6 distinguishes: automatic Unicode bidi
mirroring and one explicit mirror for a directional glyph.`,...D.parameters?.docs?.description}}},O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
  render: () => <Breadcrumbs>
      <BreadcrumbItem href="/" startIcon={<Icon icon={HomeIcon} size="sm" />}>
        Home
      </BreadcrumbItem>
      <BreadcrumbItem href="/settings" startIcon={<Icon icon={Cog6ToothIcon} size="sm" />}>
        Settings
      </BreadcrumbItem>
      <BreadcrumbItem isCurrent>Profile</BreadcrumbItem>
    </Breadcrumbs>
}`,...O.parameters?.docs?.source}}},k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
  render: () => <Breadcrumbs>
      <BreadcrumbItem href="/" onClick={e => {
      e.preventDefault();
      console.log('Navigate to Home');
    }}>
        Home
      </BreadcrumbItem>
      <BreadcrumbItem href="/projects" onClick={e => {
      e.preventDefault();
      console.log('Navigate to Projects');
    }}>
        Projects
      </BreadcrumbItem>
      <BreadcrumbItem isCurrent>Detail</BreadcrumbItem>
    </Breadcrumbs>
}`,...k.parameters?.docs?.source}}},A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`{
  render: () => <Breadcrumbs>
      <BreadcrumbItem href="/">Home</BreadcrumbItem>
      <BreadcrumbItem href="/products">Products</BreadcrumbItem>
      <BreadcrumbItem href="/products/electronics">Electronics</BreadcrumbItem>
      <BreadcrumbItem href="/products/electronics/phones">
        Phones
      </BreadcrumbItem>
      <BreadcrumbItem isCurrent>iPhone 15 Pro</BreadcrumbItem>
    </Breadcrumbs>
}`,...A.parameters?.docs?.source}}},j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
  name: 'Supporting Variant',
  render: () => <Breadcrumbs variant="supporting">
      <BreadcrumbItem href="/">Home</BreadcrumbItem>
      <BreadcrumbItem href="/projects">Projects</BreadcrumbItem>
      <BreadcrumbItem isCurrent>My Project</BreadcrumbItem>
    </Breadcrumbs>
}`,...j.parameters?.docs?.source}}},M.parameters={...M.parameters,docs:{...M.parameters?.docs,source:{originalSource:`{
  name: 'Supporting Variant with Icons',
  render: () => <Breadcrumbs variant="supporting">
      <BreadcrumbItem href="/" startIcon={<Icon icon={HomeIcon} size="xsm" />}>
        Home
      </BreadcrumbItem>
      <BreadcrumbItem href="/projects" startIcon={<Icon icon={FolderIcon} size="xsm" />}>
        Projects
      </BreadcrumbItem>
      <BreadcrumbItem isCurrent>My Project</BreadcrumbItem>
    </Breadcrumbs>
}`,...M.parameters?.docs?.source}}},N.parameters={...N.parameters,docs:{...N.parameters?.docs,source:{originalSource:`{
  name: 'Current on Middle Item',
  render: () => <Breadcrumbs>
      <BreadcrumbItem href="/">Home</BreadcrumbItem>
      <BreadcrumbItem isCurrent>Projects</BreadcrumbItem>
      <BreadcrumbItem href="/projects/my-project/settings">
        Settings
      </BreadcrumbItem>
    </Breadcrumbs>
}`,...N.parameters?.docs?.source},description:{story:`Shows \`isCurrent\` on a middle breadcrumb item rather than the last one.
This is useful when navigating to a child page that isn't represented
in the breadcrumb trail — the parent is still the "current" page in
the hierarchy.`,...N.parameters?.docs?.description}}},F.parameters={...F.parameters,docs:{...F.parameters?.docs,source:{originalSource:`{
  name: 'Menu Crumb (data array)',
  render: () => <Breadcrumbs>
      <BreadcrumbItem href="/">Home</BreadcrumbItem>
      <BreadcrumbItem menu={teamMenu}>Teams</BreadcrumbItem>
      <BreadcrumbItem isCurrent>Overview</BreadcrumbItem>
    </Breadcrumbs>
}`,...F.parameters?.docs?.source},description:{story:"A mid-trail crumb can open a menu of sibling destinations. The `menu` prop\naccepts the SAME item API as `DropdownMenu` / `MoreMenu` / `ContextMenu`, so\nan existing `DropdownMenuOption[]` drops in verbatim. The crumb renders a\nlink-styled trigger with a trailing chevron; separators before and after are\nunaffected.",...F.parameters?.docs?.description}}},I.parameters={...I.parameters,docs:{...I.parameters?.docs,source:{originalSource:`{
  name: 'Menu Crumb (composed children)',
  render: () => <Breadcrumbs>
      <BreadcrumbItem href="/">Home</BreadcrumbItem>
      <BreadcrumbItem menu={<>
            <BreadcrumbMenuItem label="Overview" onClick={() => console.log('overview')} />
            <BreadcrumbMenuItem label="Settings" icon="gear" onClick={() => console.log('settings')} />
          </>}>
        Project
      </BreadcrumbItem>
      <BreadcrumbItem isCurrent>Details</BreadcrumbItem>
    </Breadcrumbs>
}`,...I.parameters?.docs?.source},description:{story:"The `menu` prop also accepts composed `BreadcrumbMenuItem` children (an alias\nof `DropdownMenuItem`), for dynamic or stateful menus.",...I.parameters?.docs?.description}}},L.parameters={...L.parameters,docs:{...L.parameters?.docs,source:{originalSource:`{
  name: 'Mirrored Icon Separator',
  render: () => <Breadcrumbs separator={<Icon icon="chevronRight" size="xsm" color="secondary" xstyle={rtlStyles.mirror} />}>
      <BreadcrumbItem href="/">Home</BreadcrumbItem>
      <BreadcrumbItem href="/docs">Docs</BreadcrumbItem>
      <BreadcrumbItem isCurrent>API Reference</BreadcrumbItem>
    </Breadcrumbs>
}`,...L.parameters?.docs?.source},description:{story:"An icon separator is an SVG, so the bidi algorithm never mirrors it the way it\nmirrors an angle-quote glyph such as `›`. A directional icon therefore needs\n`rtlStyles.mirror` through `xstyle`, or it points against the reading\ndirection in an RTL locale.",...L.parameters?.docs?.description}}},R.parameters={...R.parameters,docs:{...R.parameters?.docs,source:{originalSource:`{
  name: 'Long Labels in a Narrow Container',
  render: () => <div style={{
    width: 320,
    outline: '1px dashed #ccc'
  }}>
      <Breadcrumbs>
        <BreadcrumbItem href="/">Home</BreadcrumbItem>
        <BreadcrumbItem href="/reports">
          Quarterly Financial Reconciliation
        </BreadcrumbItem>
        <BreadcrumbItem isCurrent>
          Consolidated Statement of Operations 2026 Q3
        </BreadcrumbItem>
      </Breadcrumbs>
    </div>
}`,...R.parameters?.docs?.source},description:{story:`The trail wraps rather than collapsing behind an overflow control, so a long
label and a narrow container both reflow instead of clipping. Rendered in a
320px box, the narrowest width the responsive bar covers.`,...R.parameters?.docs?.description}}},z.parameters={...z.parameters,docs:{...z.parameters?.docs,source:{originalSource:`{
  render: () => <Breadcrumbs>
      <BreadcrumbItem isCurrent>Only Page</BreadcrumbItem>
    </Breadcrumbs>
}`,...z.parameters?.docs?.source},description:{story:`A single crumb renders no separator, and an empty trail collapses to nothing
rather than leaving a blank row.`,...z.parameters?.docs?.description}}},V.parameters={...V.parameters,docs:{...V.parameters?.docs,source:{originalSource:`{
  name: 'Menu Crumb (disabled item)',
  render: () => <Breadcrumbs>
      <BreadcrumbItem href="/">Home</BreadcrumbItem>
      <BreadcrumbItem menu={teamMenuWithDisabled}>Teams</BreadcrumbItem>
      <BreadcrumbItem isCurrent>Overview</BreadcrumbItem>
    </Breadcrumbs>,
  play: async ({
    canvasElement
  }) => {
    const trigger = canvasElement.querySelector('nav button');
    if (trigger instanceof HTMLElement) {
      trigger.click();
    }
  }
}`,...V.parameters?.docs?.source},description:{story:`A menu item can be disabled. The disabled row is what the A20 hover sweep and
the A21 cursor sweep measure on this component; without a story rendering one
neither has anything to check here.`,...V.parameters?.docs?.description}}},H=[`Default`,`TwoLevels`,`AutoDetectCurrent`,`CustomSeparator`,`WithIcons`,`WithOnClick`,`DeepHierarchy`,`SupportingVariant`,`SupportingWithIcons`,`CurrentOnMiddleItem`,`MenuCrumb`,`MenuCrumbComposed`,`MirroredIconSeparator`,`LongLabelsNarrow`,`SingleItem`,`MenuCrumbDisabledItem`]})))()}U();export{E as AutoDetectCurrent,N as CurrentOnMiddleItem,D as CustomSeparator,A as DeepHierarchy,w as Default,R as LongLabelsNarrow,F as MenuCrumb,I as MenuCrumbComposed,V as MenuCrumbDisabledItem,L as MirroredIconSeparator,z as SingleItem,j as SupportingVariant,M as SupportingWithIcons,T as TwoLevels,O as WithIcons,k as WithOnClick,H as __namedExportsOrder,C as default};