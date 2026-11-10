import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{t}from"./react-DlPsW1c0.js";import{t as ee}from"./jsx-runtime-MKhVqBIO.js";import{o as n,s as r}from"./useTheme-CUotWZgR.js";import{n as te,t as i}from"./Icon-BmO5FtDV.js";import{n as a,t as o}from"./Button-DoGM0DEN.js";import{n as s,t as c}from"./Badge-DqOhTiyH.js";import{n as l,t as u}from"./TreeList-D6hq6CTm.js";import{n as ne,t as d}from"./VStack-SWtDePqc.js";import{c as f,o as p}from"./iframe-B7UFaprG.js";import{n as m,t as h}from"./ChevronRightIcon-BklTrRu0.js";import{n as g,t as _}from"./Cog6ToothIcon-CMrx7Bfx.js";import{n as v,t as y}from"./DocumentIcon-DhksX2wy.js";import{n as b,t as x}from"./FolderIcon-ClNF1B0d.js";function S(){let[e,t]=(0,C.useState)(!0);return(0,C.useEffect)(()=>{let e=e=>{e.key===`[`&&t(e=>!e)};return document.addEventListener(`keydown`,e),()=>document.removeEventListener(`keydown`,e)},[]),(0,w.jsxs)(d,{gap:2,children:[(0,w.jsx)(u,{"aria-label":`Files`,items:[{id:`readme`,label:`README.md`},{id:`src`,label:`src`,isExpanded:e,children:[{id:`index`,label:`index.ts`}]}]}),(0,w.jsx)(o,{label:`Elsewhere`,variant:`secondary`})]})}var C,w,T,E,D,O,k,A,j,M,N,P,F,I,L,R,z,B,V,H,U,W,G,K,q,J,Y,X,Z,Q;function $(){return($=e((()=>{C=t(),a(),ne(),l(),te(),s(),f(),r(),b(),v(),g(),m(),w=ee(),T=()=>{},E={title:`Core/TreeList`,component:u,tags:[`autodocs`],argTypes:{density:{control:`select`,options:[`compact`,`balanced`,`spacious`],description:`Spacing density for tree list items`},variant:{control:`select`,options:[`lineGuides`,`noGuides`],description:`Hierarchy guide-line treatment`}}},D=[{id:`src`,label:`src`,isExpanded:!0,children:[{id:`components`,label:`components`,children:[{id:`button`,label:`Button.tsx`,onClick:T},{id:`card`,label:`Card.tsx`,onClick:T},{id:`list`,label:`List.tsx`,onClick:T}]},{id:`app`,label:`App.tsx`,onClick:T},{id:`index`,label:`index.tsx`,onClick:T}]},{id:`public`,label:`public`,children:[{id:`favicon`,label:`favicon.ico`,onClick:T},{id:`index-html`,label:`index.html`,onClick:T}]},{id:`pkg`,label:`package.json`,onClick:T},{id:`readme`,label:`README.md`,onClick:T}],O={args:{items:D}},k={render:()=>(0,w.jsxs)(d,{gap:4,children:[(0,w.jsx)(u,{items:D}),(0,w.jsx)(o,{label:`Open folder`,onClick:()=>{}})]}),parameters:{docs:{description:{story:`Content after the tree takes its new place by layout when a folder expands or collapses; under a finger only the tree's own rows animate.`}}}},A={args:{items:[{id:`src`,label:`src`,isExpanded:!0,children:[{id:`components`,label:`components`,isExpanded:!0,children:[{id:`button`,label:`Button.tsx`,onClick:T},{id:`card`,label:`Card.tsx`,onClick:T},{id:`list`,label:`List.tsx`,onClick:T}]},{id:`app`,label:`App.tsx`,onClick:T},{id:`index`,label:`index.tsx`,onClick:T}]},{id:`public`,label:`public`,isExpanded:!0,children:[{id:`favicon`,label:`favicon.ico`,onClick:T},{id:`index-html`,label:`index.html`,onClick:T}]},{id:`pkg`,label:`package.json`,onClick:T},{id:`readme`,label:`README.md`,onClick:T}]}},j={args:{items:[{id:`src`,label:`src`,isExpanded:!0,startContent:(0,w.jsx)(i,{icon:x}),children:[{id:`app`,label:`App.tsx`,onClick:T,startContent:(0,w.jsx)(i,{icon:y})},{id:`index`,label:`index.tsx`,onClick:T,startContent:(0,w.jsx)(i,{icon:y})}]},{id:`pkg`,label:`package.json`,onClick:T,startContent:(0,w.jsx)(i,{icon:y})}]}},M={args:{items:D,header:(0,w.jsx)(`strong`,{children:`Project Files`})}},N={args:{items:[{id:`src`,label:`src`,isExpanded:!0,children:[{id:`components`,label:`components`,isExpanded:!0,children:[{id:`button`,label:`Button.tsx`,onClick:T},{id:`card`,label:`Card.tsx`,onClick:T},{id:`list`,label:`List.tsx`,onClick:T}]},{id:`app`,label:`App.tsx`,onClick:T},{id:`index`,label:`index.tsx`,onClick:T}]},{id:`public`,label:`public`,children:[{id:`favicon`,label:`favicon.ico`,onClick:T},{id:`index-html`,label:`index.html`,onClick:T}]},{id:`pkg`,label:`package.json`,onClick:T},{id:`readme`,label:`README.md`,onClick:T}],density:`compact`}},P={args:{items:D,density:`spacious`}},F={args:{items:[{id:`src`,label:`src`,isExpanded:!0,children:[{id:`components`,label:`components`,isExpanded:!0,children:[{id:`button`,label:`Button.tsx`,onClick:T},{id:`card`,label:`Card.tsx`,onClick:T},{id:`list`,label:`List.tsx`,onClick:T}]},{id:`app`,label:`App.tsx`,onClick:T},{id:`index`,label:`index.tsx`,onClick:T}]},{id:`public`,label:`public`,children:[{id:`favicon`,label:`favicon.ico`,onClick:T},{id:`index-html`,label:`index.html`,onClick:T}]},{id:`pkg`,label:`package.json`,onClick:T},{id:`readme`,label:`README.md`,onClick:T}]}},I={args:{items:[{id:`settings`,label:`Settings`,isExpanded:!0,startContent:(0,w.jsx)(i,{icon:_}),onClick:()=>alert(`Settings`),children:[{id:`general`,label:`General`,onClick:()=>alert(`General settings`)},{id:`advanced`,label:`Advanced`,onClick:()=>alert(`Advanced settings`)}]},{id:`docs`,label:`Documentation`,href:`#`,endContent:(0,w.jsx)(i,{icon:h})}]}},L={args:{items:[{id:`inbox`,label:`Inbox`,isExpanded:!0,endContent:(0,w.jsx)(c,{label:`3`}),children:[{id:`unread`,label:`Unread`,onClick:T,endContent:(0,w.jsx)(c,{label:`3`})},{id:`starred`,label:`Starred`,onClick:T}]},{id:`sent`,label:`Sent`,onClick:T},{id:`drafts`,label:`Drafts`,onClick:T,endContent:(0,w.jsx)(c,{label:`1`})}]}},R={args:{items:[{id:`active`,label:`Active Section`,isExpanded:!0,children:[{id:`item1`,label:`Available Item`,onClick:T},{id:`item2`,label:`Disabled Item`,onClick:T,isDisabled:!0}]},{id:`disabled-parent`,label:`Disabled Parent`,onClick:T,isDisabled:!0}]}},z={args:{items:[{id:`nav`,label:`Navigation`,isExpanded:!0,children:[{id:`home`,label:`Home`,onClick:T},{id:`about`,label:`About`,onClick:T,isSelected:!0},{id:`contact`,label:`Contact`,onClick:T}]}]}},B=n({name:`tree-list-chevron-demo`,components:{"tree-list-chevron":{base:{color:`var(--color-accent)`},"state:expanded":{color:`var(--color-success)`}}}}),V=n({name:`tree-list-item-label-demo`,components:{"tree-list-item-label":{selected:{fontWeight:`var(--font-weight-bold)`,color:`var(--color-accent)`}}}}),H={render:()=>(0,w.jsx)(p,{theme:B,mode:`light`,children:(0,w.jsx)(u,{items:[{id:`root`,label:`Expanded branch (accent → success)`,isExpanded:!0,children:[{id:`leaf-1`,label:`Leaf 1`,onClick:T},{id:`nested`,label:`Collapsed branch (accent)`,children:[{id:`leaf-2`,label:`Leaf 2`,onClick:T}]}]}]})})},U={render:()=>(0,w.jsx)(p,{theme:V,mode:`light`,children:(0,w.jsx)(u,{items:[{id:`nav`,label:`Navigation`,isExpanded:!0,children:[{id:`home`,label:`Home`,onClick:T},{id:`about`,label:`About (selected — bold accent label)`,onClick:T,isSelected:!0},{id:`contact`,label:`Contact`,onClick:T}]}]})})},W=[{id:`root`,label:`Project`,isExpanded:!0,children:[{id:`src`,label:`src`,isExpanded:!0,children:[{id:`app`,label:`App.tsx`},{id:`index`,label:`index.tsx`}]},{id:`pkg`,label:`package.json`}]}],G=n({name:`tree-list-guide-hidden-demo`,components:{"tree-list-guide":{base:{display:`none`}}}}),K={render:()=>(0,w.jsx)(p,{theme:G,mode:`light`,children:(0,w.jsx)(u,{items:W})})},q=n({name:`tree-list-guide-demo`,components:{"tree-list-guide":{base:{backgroundColor:`var(--color-accent)`}}}}),J={render:()=>(0,w.jsx)(p,{theme:q,mode:`light`,children:(0,w.jsx)(u,{items:W})})},Y={render:()=>(0,w.jsxs)(`div`,{style:{display:`flex`,gap:48,alignItems:`flex-start`},children:[(0,w.jsxs)(`div`,{children:[(0,w.jsx)(`div`,{style:{marginBottom:8,fontWeight:600},children:`lineGuides (default)`}),(0,w.jsx)(u,{items:W,variant:`lineGuides`})]}),(0,w.jsxs)(`div`,{children:[(0,w.jsx)(`div`,{style:{marginBottom:8,fontWeight:600},children:`noGuides`}),(0,w.jsx)(u,{items:W,variant:`noGuides`})]})]})},X={args:{items:W,variant:`noGuides`}},Z={name:`Collapse Focus`,render:()=>(0,w.jsx)(S,{})},O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
  args: {
    items: fileTreeItems
  }
}`,...O.parameters?.docs?.source}}},k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
  render: () => <VStack gap={4}>
      <TreeList items={fileTreeItems} />
      <Button label="Open folder" onClick={() => {}} />
    </VStack>,
  parameters: {
    docs: {
      description: {
        story: 'Content after the tree takes its new place by layout when a ' + "folder expands or collapses; under a finger only the tree's own " + 'rows animate.'
      }
    }
  }
}`,...k.parameters?.docs?.source}}},A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`{
  args: {
    items: [{
      id: 'src',
      label: 'src',
      isExpanded: true,
      children: [{
        id: 'components',
        label: 'components',
        isExpanded: true,
        children: [{
          id: 'button',
          label: 'Button.tsx',
          onClick: noop
        }, {
          id: 'card',
          label: 'Card.tsx',
          onClick: noop
        }, {
          id: 'list',
          label: 'List.tsx',
          onClick: noop
        }]
      }, {
        id: 'app',
        label: 'App.tsx',
        onClick: noop
      }, {
        id: 'index',
        label: 'index.tsx',
        onClick: noop
      }]
    }, {
      id: 'public',
      label: 'public',
      isExpanded: true,
      children: [{
        id: 'favicon',
        label: 'favicon.ico',
        onClick: noop
      }, {
        id: 'index-html',
        label: 'index.html',
        onClick: noop
      }]
    }, {
      id: 'pkg',
      label: 'package.json',
      onClick: noop
    }, {
      id: 'readme',
      label: 'README.md',
      onClick: noop
    }]
  }
}`,...A.parameters?.docs?.source}}},j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
  args: {
    items: [{
      id: 'src',
      label: 'src',
      isExpanded: true,
      startContent: <Icon icon={FolderIcon} />,
      children: [{
        id: 'app',
        label: 'App.tsx',
        onClick: noop,
        startContent: <Icon icon={DocumentIcon} />
      }, {
        id: 'index',
        label: 'index.tsx',
        onClick: noop,
        startContent: <Icon icon={DocumentIcon} />
      }]
    }, {
      id: 'pkg',
      label: 'package.json',
      onClick: noop,
      startContent: <Icon icon={DocumentIcon} />
    }]
  }
}`,...j.parameters?.docs?.source}}},M.parameters={...M.parameters,docs:{...M.parameters?.docs,source:{originalSource:`{
  args: {
    items: fileTreeItems,
    header: <strong>Project Files</strong>
  }
}`,...M.parameters?.docs?.source}}},N.parameters={...N.parameters,docs:{...N.parameters?.docs,source:{originalSource:`{
  args: {
    items: [{
      id: 'src',
      label: 'src',
      isExpanded: true,
      children: [{
        id: 'components',
        label: 'components',
        isExpanded: true,
        children: [{
          id: 'button',
          label: 'Button.tsx',
          onClick: noop
        }, {
          id: 'card',
          label: 'Card.tsx',
          onClick: noop
        }, {
          id: 'list',
          label: 'List.tsx',
          onClick: noop
        }]
      }, {
        id: 'app',
        label: 'App.tsx',
        onClick: noop
      }, {
        id: 'index',
        label: 'index.tsx',
        onClick: noop
      }]
    }, {
      id: 'public',
      label: 'public',
      children: [{
        id: 'favicon',
        label: 'favicon.ico',
        onClick: noop
      }, {
        id: 'index-html',
        label: 'index.html',
        onClick: noop
      }]
    }, {
      id: 'pkg',
      label: 'package.json',
      onClick: noop
    }, {
      id: 'readme',
      label: 'README.md',
      onClick: noop
    }],
    density: 'compact'
  }
}`,...N.parameters?.docs?.source}}},P.parameters={...P.parameters,docs:{...P.parameters?.docs,source:{originalSource:`{
  args: {
    items: fileTreeItems,
    density: 'spacious'
  }
}`,...P.parameters?.docs?.source}}},F.parameters={...F.parameters,docs:{...F.parameters?.docs,source:{originalSource:`{
  args: {
    items: [{
      id: 'src',
      label: 'src',
      isExpanded: true,
      children: [{
        id: 'components',
        label: 'components',
        isExpanded: true,
        children: [{
          id: 'button',
          label: 'Button.tsx',
          onClick: noop
        }, {
          id: 'card',
          label: 'Card.tsx',
          onClick: noop
        }, {
          id: 'list',
          label: 'List.tsx',
          onClick: noop
        }]
      }, {
        id: 'app',
        label: 'App.tsx',
        onClick: noop
      }, {
        id: 'index',
        label: 'index.tsx',
        onClick: noop
      }]
    }, {
      id: 'public',
      label: 'public',
      children: [{
        id: 'favicon',
        label: 'favicon.ico',
        onClick: noop
      }, {
        id: 'index-html',
        label: 'index.html',
        onClick: noop
      }]
    }, {
      id: 'pkg',
      label: 'package.json',
      onClick: noop
    }, {
      id: 'readme',
      label: 'README.md',
      onClick: noop
    }]
  }
}`,...F.parameters?.docs?.source}}},I.parameters={...I.parameters,docs:{...I.parameters?.docs,source:{originalSource:`{
  args: {
    items: [{
      id: 'settings',
      label: 'Settings',
      isExpanded: true,
      startContent: <Icon icon={Cog6ToothIcon} />,
      onClick: () => alert('Settings'),
      children: [{
        id: 'general',
        label: 'General',
        onClick: () => alert('General settings')
      }, {
        id: 'advanced',
        label: 'Advanced',
        onClick: () => alert('Advanced settings')
      }]
    }, {
      id: 'docs',
      label: 'Documentation',
      href: '#',
      endContent: <Icon icon={ChevronRightIcon} />
    }]
  }
}`,...I.parameters?.docs?.source}}},L.parameters={...L.parameters,docs:{...L.parameters?.docs,source:{originalSource:`{
  args: {
    items: [{
      id: 'inbox',
      label: 'Inbox',
      isExpanded: true,
      endContent: <Badge label="3" />,
      children: [{
        id: 'unread',
        label: 'Unread',
        onClick: noop,
        endContent: <Badge label="3" />
      }, {
        id: 'starred',
        label: 'Starred',
        onClick: noop
      }]
    }, {
      id: 'sent',
      label: 'Sent',
      onClick: noop
    }, {
      id: 'drafts',
      label: 'Drafts',
      onClick: noop,
      endContent: <Badge label="1" />
    }]
  }
}`,...L.parameters?.docs?.source}}},R.parameters={...R.parameters,docs:{...R.parameters?.docs,source:{originalSource:`{
  args: {
    items: [{
      id: 'active',
      label: 'Active Section',
      isExpanded: true,
      children: [{
        id: 'item1',
        label: 'Available Item',
        onClick: noop
      }, {
        id: 'item2',
        label: 'Disabled Item',
        onClick: noop,
        isDisabled: true
      }]
    }, {
      id: 'disabled-parent',
      label: 'Disabled Parent',
      onClick: noop,
      isDisabled: true
    }]
  }
}`,...R.parameters?.docs?.source}}},z.parameters={...z.parameters,docs:{...z.parameters?.docs,source:{originalSource:`{
  args: {
    items: [{
      id: 'nav',
      label: 'Navigation',
      isExpanded: true,
      children: [{
        id: 'home',
        label: 'Home',
        onClick: noop
      }, {
        id: 'about',
        label: 'About',
        onClick: noop,
        isSelected: true
      }, {
        id: 'contact',
        label: 'Contact',
        onClick: noop
      }]
    }]
  }
}`,...z.parameters?.docs?.source}}},H.parameters={...H.parameters,docs:{...H.parameters?.docs,source:{originalSource:`{
  render: () => <Theme theme={chevronTheme} mode="light">
      <TreeList items={[{
      id: 'root',
      label: 'Expanded branch (accent → success)',
      isExpanded: true,
      children: [{
        id: 'leaf-1',
        label: 'Leaf 1',
        onClick: noop
      }, {
        id: 'nested',
        label: 'Collapsed branch (accent)',
        children: [{
          id: 'leaf-2',
          label: 'Leaf 2',
          onClick: noop
        }]
      }]
    }]} />
    </Theme>
}`,...H.parameters?.docs?.source}}},U.parameters={...U.parameters,docs:{...U.parameters?.docs,source:{originalSource:`{
  render: () => <Theme theme={labelTheme} mode="light">
      <TreeList items={[{
      id: 'nav',
      label: 'Navigation',
      isExpanded: true,
      children: [{
        id: 'home',
        label: 'Home',
        onClick: noop
      }, {
        id: 'about',
        label: 'About (selected — bold accent label)',
        onClick: noop,
        isSelected: true
      }, {
        id: 'contact',
        label: 'Contact',
        onClick: noop
      }]
    }]} />
    </Theme>
}`,...U.parameters?.docs?.source}}},K.parameters={...K.parameters,docs:{...K.parameters?.docs,source:{originalSource:`{
  render: () => <Theme theme={hiddenGuidesTheme} mode="light">
      <TreeList items={guideItems} />
    </Theme>
}`,...K.parameters?.docs?.source}}},J.parameters={...J.parameters,docs:{...J.parameters?.docs,source:{originalSource:`{
  render: () => <Theme theme={guideTheme} mode="light">
      <TreeList items={guideItems} />
    </Theme>
}`,...J.parameters?.docs?.source}}},Y.parameters={...Y.parameters,docs:{...Y.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    gap: 48,
    alignItems: 'flex-start'
  }}>
      <div>
        <div style={{
        marginBottom: 8,
        fontWeight: 600
      }}>
          lineGuides (default)
        </div>
        <TreeList items={guideItems} variant="lineGuides" />
      </div>
      <div>
        <div style={{
        marginBottom: 8,
        fontWeight: 600
      }}>noGuides</div>
        <TreeList items={guideItems} variant="noGuides" />
      </div>
    </div>
}`,...Y.parameters?.docs?.source},description:{story:"The `variant` prop selects the base guide-line look, orthogonal to `density`\n(which owns spacing). `lineGuides` (default) draws the connector lines;\n`noGuides` hides them while keeping the indentation intact, so nesting is\nconveyed by indent alone. The guides remain themeable via the\n`astryx-tree-list-guide` target regardless of variant.",...Y.parameters?.docs?.description}}},X.parameters={...X.parameters,docs:{...X.parameters?.docs,source:{originalSource:`{
  args: {
    items: guideItems,
    variant: 'noGuides'
  }
}`,...X.parameters?.docs?.source}}},Z.parameters={...Z.parameters,docs:{...Z.parameters?.docs,source:{originalSource:`{
  name: 'Collapse Focus',
  render: () => <CollapseFocusDemo />
}`,...Z.parameters?.docs?.source}}},Q=[`Basic`,`WithContentBelow`,`FullyExpanded`,`WithIcons`,`WithHeader`,`Compact`,`Spacious`,`TopAligned`,`Interactive`,`WithEndContent`,`DisabledItems`,`SelectedItems`,`ThemedChevron`,`ThemedItemLabel`,`HiddenGuides`,`ThemedGuides`,`Variants`,`NoGuides`,`CollapseFocus`]})))()}$();export{O as Basic,Z as CollapseFocus,N as Compact,R as DisabledItems,A as FullyExpanded,K as HiddenGuides,I as Interactive,X as NoGuides,z as SelectedItems,P as Spacious,H as ThemedChevron,J as ThemedGuides,U as ThemedItemLabel,F as TopAligned,Y as Variants,k as WithContentBelow,L as WithEndContent,M as WithHeader,j as WithIcons,Q as __namedExportsOrder,E as default};