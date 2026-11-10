import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{t}from"./react-DlPsW1c0.js";import{t as n}from"./jsx-runtime-MKhVqBIO.js";import{n as r,t as i}from"./useMediaQuery-DGLmR0KF.js";import{n as a,t as o}from"./Text-C5BHw0wv.js";import{n as s,t as c}from"./Icon-BmO5FtDV.js";import{n as l,t as u}from"./Button-DoGM0DEN.js";import{n as d,t as f}from"./MobileNav-DumroDf0.js";import{n as p,t as m}from"./NavIcon-Cx3trlkR.js";import{n as h,t as g}from"./TextInput-LGxpinPt.js";import{i as _,n as v,r as y,t as b}from"./SideNavItem-BqWR4_4N.js";import{n as x,t as S}from"./SideNavHeading-BNwDXnqk.js";import{n as C,t as w}from"./SideNavSection-DT8QWaem.js";import{n as T,t as E}from"./ChartBarIcon-C-9cNjBA.js";import{n as D,t as O}from"./Cog6ToothIcon-CMrx7Bfx.js";import{n as k,t as A}from"./CubeIcon-BM24LJ8s.js";import{n as j,t as M}from"./FolderIcon-ClNF1B0d.js";import{n as N,t as P}from"./HomeIcon-BT8asZXE.js";import{i as F,n as I,r as L,t as R}from"./FolderIcon-CmteCGcT.js";import{n as z,t as B}from"./HomeIcon-BdF9cjry.js";var V,H,U,W,G,K,q,J,Y,X,Z;function Q(){return(Q=e((()=>{V=t(),d(),_(),x(),v(),C(),l(),a(),h(),s(),p(),i(),N(),j(),D(),T(),F(),k(),z(),I(),H=n(),U={title:`Core/MobileNav`,component:f,tags:[`autodocs`],parameters:{layout:`centered`}},W={render:()=>{let[e,t]=(0,V.useState)(!1);return(0,H.jsxs)(H.Fragment,{children:[(0,H.jsx)(u,{label:`Open Navigation`,icon:(0,H.jsx)(c,{icon:`menu`,color:`inherit`}),variant:`ghost`,onClick:()=>t(!0),isIconOnly:!0}),(0,H.jsxs)(f,{isOpen:e,onOpenChange:e=>t(e),header:`Navigation`,children:[(0,H.jsxs)(w,{title:`Main`,children:[(0,H.jsx)(b,{label:`Dashboard`,icon:P,selectedIcon:B,isSelected:!0,href:`/dashboard`}),(0,H.jsx)(b,{label:`Projects`,icon:M,selectedIcon:R,href:`/projects`}),(0,H.jsx)(b,{label:`Analytics`,icon:E,href:`/analytics`})]}),(0,H.jsxs)(w,{title:`Settings`,children:[(0,H.jsx)(b,{label:`General`,icon:O,href:`/settings`}),(0,H.jsx)(b,{label:`Team`,icon:L,href:`/team`})]})]})]})}},G={name:`With SideNav Children`,render:()=>{let[e,t]=(0,V.useState)(!1);return(0,H.jsxs)(H.Fragment,{children:[(0,H.jsx)(u,{label:`Open Drawer`,onClick:()=>t(!0)}),(0,H.jsx)(f,{isOpen:e,onOpenChange:e=>t(e),header:`My App`,children:(0,H.jsxs)(H.Fragment,{children:[(0,H.jsxs)(w,{title:`Main`,children:[(0,H.jsx)(b,{label:`Dashboard`,icon:P,selectedIcon:B,isSelected:!0,href:`/dashboard`}),(0,H.jsx)(b,{label:`Projects`,icon:M,selectedIcon:R,href:`/projects`}),(0,H.jsx)(b,{label:`Analytics`,icon:E,href:`/analytics`})]}),(0,H.jsx)(w,{title:`Settings`,children:(0,H.jsx)(b,{label:`General`,icon:O,href:`/settings`})})]})})]})}},K={name:`Responsive Pattern`,render:()=>{let e=r(`(max-width: 768px)`),[t,n]=(0,V.useState)(!1),i=(0,H.jsxs)(H.Fragment,{children:[(0,H.jsxs)(w,{title:`Main`,children:[(0,H.jsx)(b,{label:`Dashboard`,icon:P,selectedIcon:B,isSelected:!0,href:`/`}),(0,H.jsx)(b,{label:`Projects`,icon:M,selectedIcon:R,href:`/projects`}),(0,H.jsx)(b,{label:`Analytics`,icon:E,href:`/analytics`})]}),(0,H.jsxs)(w,{title:`Settings`,children:[(0,H.jsx)(b,{label:`General`,icon:O,href:`/settings`}),(0,H.jsx)(b,{label:`Team`,icon:L,href:`/team`})]})]});return e?(0,H.jsxs)(H.Fragment,{children:[(0,H.jsx)(u,{label:`Menu`,icon:(0,H.jsx)(c,{icon:`menu`,color:`inherit`}),variant:`ghost`,onClick:()=>n(!0),isIconOnly:!0}),(0,H.jsx)(f,{isOpen:t,onOpenChange:e=>n(e),header:`My App`,children:i})]}):(0,H.jsx)(`div`,{style:{width:280,height:600,border:`1px solid #e5e7eb`},children:(0,H.jsx)(y,{header:(0,H.jsx)(S,{icon:(0,H.jsx)(m,{icon:(0,H.jsx)(A,{style:{width:16,height:16}})}),heading:`My App`,headingHref:`/`}),children:i})})}},q={name:`End Side`,render:()=>{let[e,t]=(0,V.useState)(!1);return(0,H.jsxs)(H.Fragment,{children:[(0,H.jsx)(u,{label:`Open from Right`,onClick:()=>t(!0)}),(0,H.jsx)(f,{isOpen:e,onOpenChange:e=>t(e),header:`Settings`,side:`end`,children:(0,H.jsxs)(w,{title:`Settings`,children:[(0,H.jsx)(b,{label:`General`,icon:O,href:`/settings`}),(0,H.jsx)(b,{label:`Team`,icon:L,href:`/team`})]})})]})}},J={name:`Custom Width`,render:()=>{let[e,t]=(0,V.useState)(!1);return(0,H.jsxs)(H.Fragment,{children:[(0,H.jsx)(u,{label:`Open Wide Drawer`,onClick:()=>t(!0)}),(0,H.jsx)(f,{isOpen:e,onOpenChange:e=>t(e),header:`Wide Navigation`,width:360,children:(0,H.jsxs)(w,{title:`Main`,children:[(0,H.jsx)(b,{label:`Dashboard`,icon:P,selectedIcon:B,isSelected:!0,href:`/dashboard`}),(0,H.jsx)(b,{label:`Projects`,icon:M,href:`/projects`})]})})]})}},Y={name:`Without Title`,render:()=>{let[e,t]=(0,V.useState)(!1);return(0,H.jsxs)(H.Fragment,{children:[(0,H.jsx)(u,{label:`Open Navigation`,icon:(0,H.jsx)(c,{icon:`menu`,color:`inherit`}),variant:`ghost`,onClick:()=>t(!0),isIconOnly:!0}),(0,H.jsx)(f,{isOpen:e,onOpenChange:e=>t(e),children:(0,H.jsxs)(w,{title:`Main`,children:[(0,H.jsx)(b,{label:`Dashboard`,icon:P,isSelected:!0,href:`/dashboard`}),(0,H.jsx)(b,{label:`Projects`,icon:M,href:`/projects`})]})})]})}},X={name:`Tall Header`,render:()=>{let[e,t]=(0,V.useState)(!1),[n,r]=(0,V.useState)(``);return(0,H.jsxs)(H.Fragment,{children:[(0,H.jsx)(u,{label:`Open Navigation`,icon:(0,H.jsx)(c,{icon:`menu`,color:`inherit`}),variant:`ghost`,onClick:()=>t(!0),isIconOnly:!0}),(0,H.jsx)(f,{isOpen:e,onOpenChange:e=>t(e),label:`Workspace navigation`,header:(0,H.jsxs)(`div`,{children:[(0,H.jsx)(o,{weight:`bold`,children:`Workspace`}),(0,H.jsx)(g,{label:`Search`,isLabelHidden:!0,value:n,onChange:r})]}),children:(0,H.jsxs)(w,{title:`Main`,children:[(0,H.jsx)(b,{label:`Dashboard`,icon:P,isSelected:!0,href:`/dashboard`}),(0,H.jsx)(b,{label:`Projects`,icon:M,href:`/projects`})]})})]})}},W.parameters={...W.parameters,docs:{...W.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return <>
        <Button label="Open Navigation" icon={<Icon icon="menu" color="inherit" />} variant="ghost" onClick={() => setIsOpen(true)} isIconOnly />
        <MobileNav isOpen={isOpen} onOpenChange={open => setIsOpen(open)} header="Navigation">
          <SideNavSection title="Main">
            <SideNavItem label="Dashboard" icon={HomeIcon} selectedIcon={HomeIconSolid} isSelected href="/dashboard" />
            <SideNavItem label="Projects" icon={FolderIcon} selectedIcon={FolderIconSolid} href="/projects" />
            <SideNavItem label="Analytics" icon={ChartBarIcon} href="/analytics" />
          </SideNavSection>
          <SideNavSection title="Settings">
            <SideNavItem label="General" icon={Cog6ToothIcon} href="/settings" />
            <SideNavItem label="Team" icon={UserGroupIcon} href="/team" />
          </SideNavSection>
        </MobileNav>
      </>;
  }
}`,...W.parameters?.docs?.source}}},G.parameters={...G.parameters,docs:{...G.parameters?.docs,source:{originalSource:`{
  name: 'With SideNav Children',
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    const navSections = <>
        <SideNavSection title="Main">
          <SideNavItem label="Dashboard" icon={HomeIcon} selectedIcon={HomeIconSolid} isSelected href="/dashboard" />
          <SideNavItem label="Projects" icon={FolderIcon} selectedIcon={FolderIconSolid} href="/projects" />
          <SideNavItem label="Analytics" icon={ChartBarIcon} href="/analytics" />
        </SideNavSection>
        <SideNavSection title="Settings">
          <SideNavItem label="General" icon={Cog6ToothIcon} href="/settings" />
        </SideNavSection>
      </>;
    return <>
        <Button label="Open Drawer" onClick={() => setIsOpen(true)} />
        <MobileNav isOpen={isOpen} onOpenChange={open => setIsOpen(open)} header="My App">
          {navSections}
        </MobileNav>
      </>;
  }
}`,...G.parameters?.docs?.source}}},K.parameters={...K.parameters,docs:{...K.parameters?.docs,source:{originalSource:`{
  name: 'Responsive Pattern',
  render: () => {
    const isMobile = useMediaQuery('(max-width: 768px)');
    const [drawerOpen, setDrawerOpen] = useState(false);
    const navSections = <>
        <SideNavSection title="Main">
          <SideNavItem label="Dashboard" icon={HomeIcon} selectedIcon={HomeIconSolid} isSelected href="/" />
          <SideNavItem label="Projects" icon={FolderIcon} selectedIcon={FolderIconSolid} href="/projects" />
          <SideNavItem label="Analytics" icon={ChartBarIcon} href="/analytics" />
        </SideNavSection>
        <SideNavSection title="Settings">
          <SideNavItem label="General" icon={Cog6ToothIcon} href="/settings" />
          <SideNavItem label="Team" icon={UserGroupIcon} href="/team" />
        </SideNavSection>
      </>;
    if (isMobile) {
      return <>
          <Button label="Menu" icon={<Icon icon="menu" color="inherit" />} variant="ghost" onClick={() => setDrawerOpen(true)} isIconOnly />
          <MobileNav isOpen={drawerOpen} onOpenChange={open => setDrawerOpen(open)} header="My App">
            {navSections}
          </MobileNav>
        </>;
    }
    return <div style={{
      width: 280,
      height: 600,
      border: '1px solid #e5e7eb'
    }}>
        <SideNav header={<SideNavHeading icon={<NavIcon icon={<CubeIcon style={{
        width: 16,
        height: 16
      }} />} />} heading="My App" headingHref="/" />}>
          {navSections}
        </SideNav>
      </div>;
  }
}`,...K.parameters?.docs?.source}}},q.parameters={...q.parameters,docs:{...q.parameters?.docs,source:{originalSource:`{
  name: 'End Side',
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return <>
        <Button label="Open from Right" onClick={() => setIsOpen(true)} />
        <MobileNav isOpen={isOpen} onOpenChange={open => setIsOpen(open)} header="Settings" side="end">
          <SideNavSection title="Settings">
            <SideNavItem label="General" icon={Cog6ToothIcon} href="/settings" />
            <SideNavItem label="Team" icon={UserGroupIcon} href="/team" />
          </SideNavSection>
        </MobileNav>
      </>;
  }
}`,...q.parameters?.docs?.source}}},J.parameters={...J.parameters,docs:{...J.parameters?.docs,source:{originalSource:`{
  name: 'Custom Width',
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return <>
        <Button label="Open Wide Drawer" onClick={() => setIsOpen(true)} />
        <MobileNav isOpen={isOpen} onOpenChange={open => setIsOpen(open)} header="Wide Navigation" width={360}>
          <SideNavSection title="Main">
            <SideNavItem label="Dashboard" icon={HomeIcon} selectedIcon={HomeIconSolid} isSelected href="/dashboard" />
            <SideNavItem label="Projects" icon={FolderIcon} href="/projects" />
          </SideNavSection>
        </MobileNav>
      </>;
  }
}`,...J.parameters?.docs?.source}}},Y.parameters={...Y.parameters,docs:{...Y.parameters?.docs,source:{originalSource:`{
  name: 'Without Title',
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return <>
        <Button label="Open Navigation" icon={<Icon icon="menu" color="inherit" />} variant="ghost" onClick={() => setIsOpen(true)} isIconOnly />
        <MobileNav isOpen={isOpen} onOpenChange={open => setIsOpen(open)}>
          <SideNavSection title="Main">
            <SideNavItem label="Dashboard" icon={HomeIcon} isSelected href="/dashboard" />
            <SideNavItem label="Projects" icon={FolderIcon} href="/projects" />
          </SideNavSection>
        </MobileNav>
      </>;
  }
}`,...Y.parameters?.docs?.source}}},X.parameters={...X.parameters,docs:{...X.parameters?.docs,source:{originalSource:`{
  name: 'Tall Header',
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState('');
    return <>
        <Button label="Open Navigation" icon={<Icon icon="menu" color="inherit" />} variant="ghost" onClick={() => setIsOpen(true)} isIconOnly />
        <MobileNav isOpen={isOpen} onOpenChange={open => setIsOpen(open)} label="Workspace navigation" header={<div>
              <Text weight="bold">Workspace</Text>
              <TextInput label="Search" isLabelHidden value={query} onChange={setQuery} />
            </div>}>
          <SideNavSection title="Main">
            <SideNavItem label="Dashboard" icon={HomeIcon} isSelected href="/dashboard" />
            <SideNavItem label="Projects" icon={FolderIcon} href="/projects" />
          </SideNavSection>
        </MobileNav>
      </>;
  }
}`,...X.parameters?.docs?.source},description:{story:`Header content taller than one bar: a workspace name with a search field
under it. The header row grows to fit it, above the first item.`,...X.parameters?.docs?.description}}},Z=[`Default`,`WithSideNavChildren`,`ResponsivePattern`,`EndSide`,`CustomWidth`,`WithoutTitle`,`TallHeader`]})))()}Q();export{J as CustomWidth,W as Default,q as EndSide,K as ResponsivePattern,X as TallHeader,G as WithSideNavChildren,Y as WithoutTitle,Z as __namedExportsOrder,U as default};