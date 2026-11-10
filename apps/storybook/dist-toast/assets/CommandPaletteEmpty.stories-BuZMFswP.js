import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{t}from"./react-DlPsW1c0.js";import{t as n}from"./jsx-runtime-MKhVqBIO.js";import{n as r,t as i}from"./CommandPalette-Cj0mdyQF.js";import{n as a,t as o}from"./CommandPaletteEmpty-B71B3Kue.js";import{n as s,t as c}from"./Link-D69iJxMA.js";import{t as l}from"./createStaticSource-DpdQO4C4.js";import{l as u,u as d}from"./iframe-B7UFaprG.js";var f,p,m,h,g,_,v;function y(){return(y=e((()=>{f=t(),r(),a(),s(),d(),p=n(),m={title:`Core/CommandPaletteEmpty`,component:o,tags:[`autodocs`]},h={flex:`1 1 280px`,minWidth:0},g={marginBlock:`0 8px`,font:`inherit`,fontWeight:600},_={render:function(){let e=(0,f.useMemo)(()=>l([]),[]);return(0,p.jsxs)(`div`,{style:{display:`flex`,flexWrap:`wrap`,alignItems:`flex-start`,gap:16,width:`100%`,padding:16,boxSizing:`border-box`},children:[(0,p.jsxs)(`section`,{style:h,children:[(0,p.jsx)(`h2`,{style:g,children:`Translated built-in text`}),(0,p.jsx)(u,{locale:`fr`,overrides:{fr:{"@astryx.commandPalette.emptyBootstrap":`Commencez à saisir pour rechercher parmi les commandes disponibles`,"@astryx.commandPalette.emptySearch":`Aucune commande ne correspond à votre recherche`}},children:(0,p.jsx)(i,{isOpen:!0,isInline:!0,role:`region`,label:`Translated empty command palette`,onOpenChange:()=>{},searchSource:e,width:`100%`,maxHeight:320})})]}),(0,p.jsxs)(`section`,{style:h,children:[(0,p.jsx)(`h2`,{style:g,children:`Long unbroken text`}),(0,p.jsx)(i,{isOpen:!0,isInline:!0,role:`region`,label:`Long empty command palette`,onOpenChange:()=>{},searchSource:e,emptyBootstrapText:`No files in /workspace/design-system/packages/core/src/CommandPalette/__fixtures__/empty-results/`,emptySearchText:`No files match /workspace/design-system/packages/core/src/CommandPalette/__fixtures__/empty-results/`,width:`100%`,maxHeight:320})]}),(0,p.jsxs)(`section`,{style:h,children:[(0,p.jsx)(`h2`,{style:g,children:`Standalone rich content`}),(0,p.jsx)(o,{children:(0,p.jsxs)(`span`,{children:[`No saved searches yet.`,` `,(0,p.jsx)(c,{href:`#create-saved-search`,children:`Create a saved search`})]})})]})]})}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  render: function Render() {
    const emptySource = useMemo(() => createStaticSource([]), []);
    return <div style={{
      display: 'flex',
      flexWrap: 'wrap',
      alignItems: 'flex-start',
      gap: 16,
      width: '100%',
      padding: 16,
      boxSizing: 'border-box'
    }}>
        <section style={panelStyle}>
          <h2 style={headingStyle}>Translated built-in text</h2>
          <InternationalizationProvider locale="fr" overrides={{
          fr: {
            '@astryx.commandPalette.emptyBootstrap': 'Commencez à saisir pour rechercher parmi les commandes disponibles',
            '@astryx.commandPalette.emptySearch': 'Aucune commande ne correspond à votre recherche'
          }
        }}>
            <CommandPalette isOpen isInline role="region" label="Translated empty command palette" onOpenChange={() => {}} searchSource={emptySource} width="100%" maxHeight={320} />
          </InternationalizationProvider>
        </section>
        <section style={panelStyle}>
          <h2 style={headingStyle}>Long unbroken text</h2>
          <CommandPalette isOpen isInline role="region" label="Long empty command palette" onOpenChange={() => {}} searchSource={emptySource} emptyBootstrapText="No files in /workspace/design-system/packages/core/src/CommandPalette/__fixtures__/empty-results/" emptySearchText="No files match /workspace/design-system/packages/core/src/CommandPalette/__fixtures__/empty-results/" width="100%" maxHeight={320} />
        </section>
        <section style={panelStyle}>
          <h2 style={headingStyle}>Standalone rich content</h2>
          <CommandPaletteEmpty>
            <span>
              No saved searches yet.{' '}
              <Link href="#create-saved-search">Create a saved search</Link>
            </span>
          </CommandPaletteEmpty>
        </section>
      </div>;
  }
}`,..._.parameters?.docs?.source},description:{story:`Empty content the built-in branch must hold without breaking layout: catalog
text expanded by translation, a long unbroken path echoed into the message,
and the standalone composition with caller-provided rich content.`,..._.parameters?.docs?.description}}},v=[`ContentMatrix`]})))()}y();export{_ as ContentMatrix,v as __namedExportsOrder,m as default};