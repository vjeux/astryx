import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{t}from"./react-DlPsW1c0.js";import{t as n}from"./jsx-runtime-MKhVqBIO.js";import{o as r,s as i}from"./useTheme-CUotWZgR.js";import{n as a,t as o}from"./Icon-BmO5FtDV.js";import{n as s,t as c}from"./Button-DoGM0DEN.js";import{a as l,i as u,n as d,o as f,r as p,t as m}from"./CommandPalette-Cj0mdyQF.js";import{n as h,t as g}from"./CommandPaletteGroup-DGkBka49.js";import{t as _}from"./createStaticSource-DpdQO4C4.js";import{c as v,o as y}from"./iframe-B7UFaprG.js";var b,x,S,C,w,T,E,D,O,k,A,j,M,N,P,F;function I(){return(I=e((()=>{b=t(),d(),f(),u(),h(),s(),a(),v(),i(),x=n(),S={title:`Core/CommandPalette`,component:m,tags:[`autodocs`]},C={render:function(){let[e,t]=(0,b.useState)(!1),n=(0,b.useMemo)(()=>_([{id:`home`,label:`Home`},{id:`settings`,label:`Settings`},{id:`profile`,label:`Profile`},{id:`dashboard`,label:`Dashboard`},{id:`help`,label:`Help`}]),[]);return(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)(c,{label:`Open Command Palette`,onClick:()=>t(!0)}),(0,x.jsx)(m,{isOpen:e,onOpenChange:t,searchSource:n})]})}},w={render:function(){let[e,t]=(0,b.useState)(!1),n=(0,b.useMemo)(()=>_([{id:`home`,label:`Home`,auxiliaryData:{group:`Navigation`}},{id:`settings`,label:`Settings`,auxiliaryData:{group:`Navigation`}},{id:`profile`,label:`Profile`,auxiliaryData:{group:`Navigation`}},{id:`new-file`,label:`New File`,auxiliaryData:{group:`Actions`}},{id:`save`,label:`Save`,auxiliaryData:{group:`Actions`}},{id:`export`,label:`Export`,auxiliaryData:{group:`Actions`}}]),[]);return(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)(c,{label:`Open Grouped`,onClick:()=>t(!0)}),(0,x.jsx)(m,{isOpen:e,onOpenChange:t,searchSource:n})]})}},T={render:function(){let[e,t]=(0,b.useState)(!1),n=[{id:`dashboard`,label:`Go to Dashboard`,auxiliaryData:{icon:`menu`,group:`Navigation`}},{id:`settings`,label:`Open Settings`,auxiliaryData:{icon:`wrench`,group:`Navigation`,shortcut:`⌘,`}},{id:`profile`,label:`View Profile`,auxiliaryData:{icon:`info`,group:`Navigation`}},{id:`dark-mode`,label:`Toggle Dark Mode`,auxiliaryData:{group:`Actions`,keywords:[`theme`,`appearance`]}},{id:`new-file`,label:`Create New File`,auxiliaryData:{group:`Actions`,shortcut:`⌘N`}},{id:`search`,label:`Search Files`,auxiliaryData:{icon:`search`,group:`Actions`,shortcut:`⌘P`}}],r=(0,b.useMemo)(()=>_(n,{keywords:e=>e.auxiliaryData?.keywords??[]}),[]);return(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)(c,{label:`Open Rich Palette`,onClick:()=>t(!0)}),(0,x.jsx)(m,{isOpen:e,onOpenChange:t,searchSource:r,renderItem:e=>(0,x.jsxs)(`span`,{style:{display:`flex`,alignItems:`center`,gap:8,flex:1},children:[e.auxiliaryData?.icon&&(0,x.jsx)(o,{icon:e.auxiliaryData.icon,size:`sm`}),(0,x.jsx)(`span`,{style:{flex:1},children:e.label}),e.auxiliaryData?.shortcut&&(0,x.jsx)(`span`,{style:{fontSize:12,opacity:.5},children:e.auxiliaryData.shortcut})]})})]})}},E={render:function(){let[e,t]=(0,b.useState)(!1),[n,r]=(0,b.useState)(`light`),i=(0,b.useMemo)(()=>_([{id:`light`,label:`Light`},{id:`dark`,label:`Dark`},{id:`system`,label:`System`}]),[]);return(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)(c,{label:`Theme: ${n}`,onClick:()=>t(!0)}),(0,x.jsx)(m,{isOpen:e,onOpenChange:t,searchSource:i,value:n,onValueChange:e=>{r(e),t(!1)},renderItem:(e,t)=>(0,x.jsxs)(`span`,{style:{display:`flex`,alignItems:`center`,gap:8,flex:1},children:[(0,x.jsx)(`span`,{style:{flex:1},children:e.label}),t&&(0,x.jsx)(o,{icon:`check`,size:`sm`})]})})]})}},D={render:function(){let[e,t]=(0,b.useState)(!1),n=(0,b.useMemo)(()=>{let e=null;return{cancel(){e?.abort()},async search(t){return e?.abort(),e=new AbortController,await new Promise(e=>setTimeout(e,400)),[{id:`readme`,label:`README.md`},{id:`package`,label:`package.json`},{id:`tsconfig`,label:`tsconfig.json`},{id:`index`,label:`src/index.ts`},{id:`app`,label:`src/App.tsx`}].filter(e=>e.label.toLowerCase().includes(t.toLowerCase()))},bootstrap(){return[]}}},[]);return(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)(c,{label:`Open File Search`,onClick:()=>t(!0)}),(0,x.jsx)(m,{isOpen:e,onOpenChange:t,searchSource:n,input:(0,x.jsx)(l,{label:`Search files`,placeholder:`Search files...`}),emptyBootstrapText:`Type a filename to search`,emptySearchText:`No files found`})]})}},O={render:function(){let[e,t]=(0,b.useState)(!1),n=(0,b.useMemo)(()=>{let e=null;return{cancel(){e?.abort()},async search(t){return e?.abort(),e=new AbortController,await new Promise(e=>setTimeout(e,600)),[{id:`home`,label:`Home`},{id:`settings`,label:`Settings`},{id:`profile`,label:`Profile`}].filter(e=>e.label.toLowerCase().includes(t.toLowerCase()))},bootstrap(){return[]}}},[]);return(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)(c,{label:`Open`,onClick:()=>t(!0)}),(0,x.jsx)(m,{isOpen:e,onOpenChange:t,searchSource:n})]})}},k={render:function(){let[e,t]=(0,b.useState)(!1),n=[{id:`home`,label:`Home`},{id:`dark-mode`,label:`Toggle Dark Mode`,auxiliaryData:{aliases:[`theme`,`appearance`]}},{id:`font-size`,label:`Change Font Size`,auxiliaryData:{aliases:[`text`,`zoom`]}}],r=(0,b.useMemo)(()=>_(n,{keywords:e=>e.auxiliaryData?.aliases??[]}),[]);return(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)(c,{label:`Open (try 'theme')`,onClick:()=>t(!0)}),(0,x.jsx)(m,{isOpen:e,onOpenChange:t,searchSource:r})]})}},A={render:function(){let[e,t]=(0,b.useState)(!1),n=[`Files`,`Actions`,`Navigation`,`Settings`,`Recent`],r=Array.from({length:50},(e,t)=>({id:`item-${t}`,label:`Item ${t+1}`,auxiliaryData:{group:n[t%n.length]}})),i=(0,b.useMemo)(()=>_(r),[]);return(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)(c,{label:`Open (50 items)`,onClick:()=>t(!0)}),(0,x.jsx)(m,{isOpen:e,onOpenChange:t,searchSource:i})]})}},j={render:function(){let[e,t]=(0,b.useState)(!1),n=(0,b.useMemo)(()=>_([{id:`home`,label:`Home`},{id:`settings`,label:`Settings`}]),[]);return(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)(c,{label:`Open`,onClick:()=>t(!0)}),(0,x.jsx)(m,{isOpen:e,onOpenChange:t,searchSource:n,footer:(0,x.jsx)(p,{children:(0,x.jsx)(`span`,{children:`Pro tip: use ⌘K to open anywhere`})})})]})}},M=r({name:`command-palette-group-heading-demo`,components:{"command-palette-group-heading":{base:{fontWeight:`var(--font-weight-bold)`,color:`var(--color-accent)`,textTransform:`uppercase`}}}}),N={render:()=>(0,x.jsx)(y,{theme:M,mode:`light`,children:(0,x.jsxs)(g,{heading:`Suggestions`,children:[(0,x.jsx)(`div`,{children:`Home`}),(0,x.jsx)(`div`,{children:`Settings`}),(0,x.jsx)(`div`,{children:`Profile`})]})})},P={tags:[`visual-theme-matrix`],render:function(){let e=(0,b.useRef)(null),[t,n]=(0,b.useState)(!1);(0,b.useEffect)(()=>{let t=e.current;if(t==null)return;let r=()=>t.querySelector(`[role="option"]`)!=null&&t.querySelector(`.astryx-spinner`)==null;if(r()){n(!0);return}let i=new MutationObserver(()=>{r()&&(i.disconnect(),n(!0))});return i.observe(t,{childList:!0,subtree:!0}),()=>i.disconnect()},[]);let r=(0,b.useMemo)(()=>_([{id:`home`,label:`Home`,auxiliaryData:{group:`Navigation`}},{id:`settings`,label:`Settings`,auxiliaryData:{group:`Navigation`}},{id:`save`,label:`Save`,auxiliaryData:{group:`Actions`}},{id:`export`,label:`Export`,auxiliaryData:{group:`Actions`}}]),[]),i=(0,b.useMemo)(()=>_([]),[]),a=(0,b.useMemo)(()=>({bootstrap:()=>new Promise(()=>{}),search:()=>new Promise(()=>{})}),[]),o={flex:`1 1 280px`,minWidth:0},s={marginBlock:`0 8px`,font:`inherit`,fontWeight:600};return(0,x.jsxs)(`div`,{ref:e,"data-command-palette-audit-matrix":!0,style:{display:`flex`,flexWrap:`wrap`,alignItems:`flex-start`,gap:16,width:`100%`,padding:16,boxSizing:`border-box`},children:[(0,x.jsxs)(`section`,{style:o,children:[(0,x.jsx)(`h2`,{style:s,children:`Grouped results`}),(0,x.jsx)(m,{isOpen:!0,isInline:!0,role:`region`,label:`Grouped command palette`,onOpenChange:()=>{},searchSource:r,value:`settings`,width:`100%`,maxHeight:420})]}),(0,x.jsxs)(`section`,{style:o,children:[(0,x.jsx)(`h2`,{style:s,children:`Empty bootstrap`}),(0,x.jsx)(m,{isOpen:!0,isInline:!0,role:`region`,label:`Empty command palette`,onOpenChange:()=>{},searchSource:i,emptyBootstrapText:(0,x.jsxs)(`span`,{children:[`No commands yet. `,(0,x.jsx)(`a`,{href:`#new-command`,children:`Create a command`})]}),emptySearchText:(0,x.jsxs)(`span`,{children:[`No matching commands.`,` `,(0,x.jsx)(`a`,{href:`#new-command`,children:`Create a command`})]}),width:`100%`,maxHeight:420})]}),(0,x.jsxs)(`section`,{style:o,children:[(0,x.jsx)(`h2`,{style:s,children:`Pending bootstrap`}),t&&(0,x.jsx)(m,{isOpen:!0,isInline:!0,role:`region`,label:`Pending command palette`,onOpenChange:()=>{},searchSource:a,width:`100%`,maxHeight:420})]})]})}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  render: function Render() {
    const [isOpen, setIsOpen] = useState(false);
    const source = useMemo(() => createStaticSource([{
      id: 'home',
      label: 'Home'
    }, {
      id: 'settings',
      label: 'Settings'
    }, {
      id: 'profile',
      label: 'Profile'
    }, {
      id: 'dashboard',
      label: 'Dashboard'
    }, {
      id: 'help',
      label: 'Help'
    }]), []);
    return <>
        <Button label="Open Command Palette" onClick={() => setIsOpen(true)} />
        <CommandPalette isOpen={isOpen} onOpenChange={setIsOpen} searchSource={source} />
      </>;
  }
}`,...C.parameters?.docs?.source},description:{story:`Simplest case — no input/footer/renderItem needed.`,...C.parameters?.docs?.description}}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  render: function Render() {
    const [isOpen, setIsOpen] = useState(false);
    const source = useMemo(() => createStaticSource([{
      id: 'home',
      label: 'Home',
      auxiliaryData: {
        group: 'Navigation'
      }
    }, {
      id: 'settings',
      label: 'Settings',
      auxiliaryData: {
        group: 'Navigation'
      }
    }, {
      id: 'profile',
      label: 'Profile',
      auxiliaryData: {
        group: 'Navigation'
      }
    }, {
      id: 'new-file',
      label: 'New File',
      auxiliaryData: {
        group: 'Actions'
      }
    }, {
      id: 'save',
      label: 'Save',
      auxiliaryData: {
        group: 'Actions'
      }
    }, {
      id: 'export',
      label: 'Export',
      auxiliaryData: {
        group: 'Actions'
      }
    }]), []);
    return <>
        <Button label="Open Grouped" onClick={() => setIsOpen(true)} />
        <CommandPalette isOpen={isOpen} onOpenChange={setIsOpen} searchSource={source} />
      </>;
  }
}`,...w.parameters?.docs?.source},description:{story:`Groups detected automatically from auxiliaryData.group. No custom rendering needed.`,...w.parameters?.docs?.description}}},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  render: function Render() {
    const [isOpen, setIsOpen] = useState(false);
    const commands: RichCommand[] = [{
      id: 'dashboard',
      label: 'Go to Dashboard',
      auxiliaryData: {
        icon: 'menu',
        group: 'Navigation'
      }
    }, {
      id: 'settings',
      label: 'Open Settings',
      auxiliaryData: {
        icon: 'wrench',
        group: 'Navigation',
        shortcut: '⌘,'
      }
    }, {
      id: 'profile',
      label: 'View Profile',
      auxiliaryData: {
        icon: 'info',
        group: 'Navigation'
      }
    }, {
      id: 'dark-mode',
      label: 'Toggle Dark Mode',
      auxiliaryData: {
        group: 'Actions',
        keywords: ['theme', 'appearance']
      }
    }, {
      id: 'new-file',
      label: 'Create New File',
      auxiliaryData: {
        group: 'Actions',
        shortcut: '⌘N'
      }
    }, {
      id: 'search',
      label: 'Search Files',
      auxiliaryData: {
        icon: 'search',
        group: 'Actions',
        shortcut: '⌘P'
      }
    }];
    const source = useMemo(() => createStaticSource(commands, {
      keywords: item => item.auxiliaryData?.keywords ?? []
    }), []);
    return <>
        <Button label="Open Rich Palette" onClick={() => setIsOpen(true)} />
        <CommandPalette isOpen={isOpen} onOpenChange={setIsOpen} searchSource={source} renderItem={(item: RichCommand) => <span style={{
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        flex: 1
      }}>
              {item.auxiliaryData?.icon && <Icon icon={item.auxiliaryData.icon} size="sm" />}
              <span style={{
          flex: 1
        }}>{item.label}</span>
              {item.auxiliaryData?.shortcut && <span style={{
          fontSize: 12,
          opacity: 0.5
        }}>
                  {item.auxiliaryData.shortcut}
                </span>}
            </span>} />
      </>;
  }
}`,...T.parameters?.docs?.source},description:{story:`Custom item content via renderItem — icons and shortcuts.
Grouping remains automatic via auxiliaryData.group.`,...T.parameters?.docs?.description}}},E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  render: function Render() {
    const [isOpen, setIsOpen] = useState(false);
    const [theme, setTheme] = useState('light');
    const source = useMemo(() => createStaticSource([{
      id: 'light',
      label: 'Light'
    }, {
      id: 'dark',
      label: 'Dark'
    }, {
      id: 'system',
      label: 'System'
    }]), []);
    return <>
        <Button label={\`Theme: \${theme}\`} onClick={() => setIsOpen(true)} />
        <CommandPalette isOpen={isOpen} onOpenChange={setIsOpen} searchSource={source} value={theme} onValueChange={v => {
        setTheme(v);
        setIsOpen(false);
      }} renderItem={(item, isSelected) => <span style={{
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        flex: 1
      }}>
              <span style={{
          flex: 1
        }}>{item.label}</span>
              {isSelected && <Icon icon="check" size="sm" />}
            </span>} />
      </>;
  }
}`,...E.parameters?.docs?.source},description:{story:`Selection persists across opens. isSelected passed to renderItem.`,...E.parameters?.docs?.description}}},D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
  render: function Render() {
    const [isOpen, setIsOpen] = useState(false);
    const source = useMemo<SearchSource>(() => {
      let controller: AbortController | null = null;
      return {
        cancel() {
          controller?.abort();
        },
        async search(query: string) {
          controller?.abort();
          controller = new AbortController();
          await new Promise(r => setTimeout(r, 400));
          const all = [{
            id: 'readme',
            label: 'README.md'
          }, {
            id: 'package',
            label: 'package.json'
          }, {
            id: 'tsconfig',
            label: 'tsconfig.json'
          }, {
            id: 'index',
            label: 'src/index.ts'
          }, {
            id: 'app',
            label: 'src/App.tsx'
          }];
          return all.filter(f => f.label.toLowerCase().includes(query.toLowerCase()));
        },
        bootstrap() {
          return [];
        }
      };
    }, []);
    return <>
        <Button label="Open File Search" onClick={() => setIsOpen(true)} />
        <CommandPalette isOpen={isOpen} onOpenChange={setIsOpen} searchSource={source} input={<CommandPaletteInput label="Search files" placeholder="Search files..." />} emptyBootstrapText="Type a filename to search" emptySearchText="No files found" />
      </>;
  }
}`,...D.parameters?.docs?.source},description:{story:`Server-side search. Spinner shown while pending. Empty state on no results.`,...D.parameters?.docs?.description}}},O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
  render: function Render() {
    const [isOpen, setIsOpen] = useState(false);
    const source = useMemo<SearchSource>(() => {
      let controller: AbortController | null = null;
      return {
        cancel() {
          controller?.abort();
        },
        async search(query: string) {
          controller?.abort();
          controller = new AbortController();
          await new Promise(r => setTimeout(r, 600));
          const all = [{
            id: 'home',
            label: 'Home'
          }, {
            id: 'settings',
            label: 'Settings'
          }, {
            id: 'profile',
            label: 'Profile'
          }];
          return all.filter(c => c.label.toLowerCase().includes(query.toLowerCase()));
        },
        bootstrap() {
          return [];
        }
      };
    }, []);
    return <>
        <Button label="Open" onClick={() => setIsOpen(true)} />
        <CommandPalette isOpen={isOpen} onOpenChange={setIsOpen} searchSource={source} />
      </>;
  }
}`,...O.parameters?.docs?.source},description:{story:"Nothing overridden, so every built-in string renders. `bootstrap()` returns\nnothing so first open shows the bootstrap empty state, and the async\n`search()` keeps the pending state observable.",...O.parameters?.docs?.description}}},k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
  render: function Render() {
    const [isOpen, setIsOpen] = useState(false);
    const commands: SearchableItem<{
      aliases?: string[];
    }>[] = [{
      id: 'home',
      label: 'Home'
    }, {
      id: 'dark-mode',
      label: 'Toggle Dark Mode',
      auxiliaryData: {
        aliases: ['theme', 'appearance']
      }
    }, {
      id: 'font-size',
      label: 'Change Font Size',
      auxiliaryData: {
        aliases: ['text', 'zoom']
      }
    }];
    const source = useMemo(() => createStaticSource(commands, {
      keywords: item => item.auxiliaryData?.aliases ?? []
    }), []);
    return <>
        <Button label="Open (try 'theme')" onClick={() => setIsOpen(true)} />
        <CommandPalette isOpen={isOpen} onOpenChange={setIsOpen} searchSource={source} />
      </>;
  }
}`,...k.parameters?.docs?.source},description:{story:`Type "theme" or "appearance" to find "Toggle Dark Mode".`,...k.parameters?.docs?.description}}},A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`{
  render: function Render() {
    const [isOpen, setIsOpen] = useState(false);
    const groups = ['Files', 'Actions', 'Navigation', 'Settings', 'Recent'];
    const items = Array.from({
      length: 50
    }, (_, i) => ({
      id: \`item-\${i}\`,
      label: \`Item \${i + 1}\`,
      auxiliaryData: {
        group: groups[i % groups.length]
      }
    }));
    const source = useMemo(() => createStaticSource(items), []);
    return <>
        <Button label="Open (50 items)" onClick={() => setIsOpen(true)} />
        <CommandPalette isOpen={isOpen} onOpenChange={setIsOpen} searchSource={source} />
      </>;
  }
}`,...A.parameters?.docs?.source},description:{story:`50 items across 5 groups. Verifies the list scrolls within the dialog
rather than expanding it past maxHeight.`,...A.parameters?.docs?.description}}},j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
  render: function Render() {
    const [isOpen, setIsOpen] = useState(false);
    const source = useMemo(() => createStaticSource([{
      id: 'home',
      label: 'Home'
    }, {
      id: 'settings',
      label: 'Settings'
    }]), []);
    return <>
        <Button label="Open" onClick={() => setIsOpen(true)} />
        <CommandPalette isOpen={isOpen} onOpenChange={setIsOpen} searchSource={source} footer={<CommandPaletteFooter>
              <span>Pro tip: use ⌘K to open anywhere</span>
            </CommandPaletteFooter>} />
      </>;
  }
}`,...j.parameters?.docs?.source},description:{story:`Replacing the footer with custom content.`,...j.parameters?.docs?.description}}},N.parameters={...N.parameters,docs:{...N.parameters?.docs,source:{originalSource:`{
  render: () => <Theme theme={groupHeadingTheme} mode="light">
      <CommandPaletteGroup heading="Suggestions">
        <div>Home</div>
        <div>Settings</div>
        <div>Profile</div>
      </CommandPaletteGroup>
    </Theme>
}`,...N.parameters?.docs?.source}}},P.parameters={...P.parameters,docs:{...P.parameters?.docs,source:{originalSource:`{
  tags: ['visual-theme-matrix'],
  render: function Render() {
    // React entangles async transitions that are in flight together, so a
    // never-settling bootstrap started beside the other palettes' would keep
    // them busy too. Mount the pending palette only after the grouped and
    // empty results have rendered without a spinner, so only it is busy.
    const matrixRef = useRef<HTMLDivElement>(null);
    const [isPendingMountable, setIsPendingMountable] = useState(false);
    useEffect(() => {
      const matrix = matrixRef.current;
      if (matrix == null) {
        return;
      }
      const hasSettled = () => matrix.querySelector('[role="option"]') != null && matrix.querySelector('.astryx-spinner') == null;
      if (hasSettled()) {
        setIsPendingMountable(true);
        return;
      }
      const observer = new MutationObserver(() => {
        if (hasSettled()) {
          observer.disconnect();
          setIsPendingMountable(true);
        }
      });
      observer.observe(matrix, {
        childList: true,
        subtree: true
      });
      return () => observer.disconnect();
    }, []);
    const groupedSource = useMemo(() => createStaticSource([{
      id: 'home',
      label: 'Home',
      auxiliaryData: {
        group: 'Navigation'
      }
    }, {
      id: 'settings',
      label: 'Settings',
      auxiliaryData: {
        group: 'Navigation'
      }
    }, {
      id: 'save',
      label: 'Save',
      auxiliaryData: {
        group: 'Actions'
      }
    }, {
      id: 'export',
      label: 'Export',
      auxiliaryData: {
        group: 'Actions'
      }
    }]), []);
    const emptySource = useMemo(() => createStaticSource([]), []);
    const pendingSource = useMemo<SearchSource>(() => ({
      bootstrap: () => new Promise<SearchableItem[]>(() => {}),
      search: () => new Promise<SearchableItem[]>(() => {})
    }), []);
    const panelStyle = {
      flex: '1 1 280px',
      minWidth: 0
    } as const;
    const headingStyle = {
      marginBlock: '0 8px',
      font: 'inherit',
      fontWeight: 600
    } as const;
    return <div ref={matrixRef} data-command-palette-audit-matrix style={{
      display: 'flex',
      flexWrap: 'wrap',
      alignItems: 'flex-start',
      gap: 16,
      width: '100%',
      padding: 16,
      boxSizing: 'border-box'
    }}>
        <section style={panelStyle}>
          <h2 style={headingStyle}>Grouped results</h2>
          <CommandPalette isOpen isInline role="region" label="Grouped command palette" onOpenChange={() => {}} searchSource={groupedSource} value="settings" width="100%" maxHeight={420} />
        </section>
        <section style={panelStyle}>
          <h2 style={headingStyle}>Empty bootstrap</h2>
          <CommandPalette isOpen isInline role="region" label="Empty command palette" onOpenChange={() => {}} searchSource={emptySource} emptyBootstrapText={<span>
                No commands yet. <a href="#new-command">Create a command</a>
              </span>} emptySearchText={<span>
                No matching commands.{' '}
                <a href="#new-command">Create a command</a>
              </span>} width="100%" maxHeight={420} />
        </section>
        <section style={panelStyle}>
          <h2 style={headingStyle}>Pending bootstrap</h2>
          {isPendingMountable && <CommandPalette isOpen isInline role="region" label="Pending command palette" onOpenChange={() => {}} searchSource={pendingSource} width="100%" maxHeight={420} />}
        </section>
      </div>;
  }
}`,...P.parameters?.docs?.source},description:{story:`Stable, always-rendered states for visual, accessibility, RTL, and responsive
verification. Inline mode keeps each palette in normal document flow while
preserving the same owned input, result, empty, pending, and footer anatomy.`,...P.parameters?.docs?.description}}},F=[`Default`,`AutoGrouped`,`WithRenderItem`,`Picker`,`AsyncSearch`,`BuiltInStrings`,`WithKeywords`,`ManyItems`,`CustomFooter`,`ThemedGroupHeading`,`AuditMatrix`]})))()}I();export{D as AsyncSearch,P as AuditMatrix,w as AutoGrouped,O as BuiltInStrings,j as CustomFooter,C as Default,A as ManyItems,E as Picker,N as ThemedGroupHeading,k as WithKeywords,T as WithRenderItem,F as __namedExportsOrder,S as default};