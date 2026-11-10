import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{n as t,t as n}from"./stylex-BSlGVhGe.js";import{t as r}from"./jsx-runtime-MKhVqBIO.js";import{n as i}from"./mergeProps-DHkqklmt.js";import{i as a,t as o}from"./themeProps-BVy3p_gf.js";function s({heading:e,children:n,ref:r,xstyle:o,className:s,style:u,...d}){return(0,c.jsxs)(`div`,{ref:r,role:`group`,"aria-label":e,...i(a(`command-palette-group`),t(l.group,o),s,u),...d,children:[(0,c.jsx)(`div`,{"aria-hidden":`true`,...i(a(`command-palette-group-heading`),{className:`astryxrrkdod astryxu0wf1k astryx9ynric astryx141an7d astryx1ltkj2j astryxv1l7n4 astryx87ps6o`}),children:e}),n]})}var c,l;function u(){return(u=e((()=>{n(),o(),c=r(),l={group:{k1xSpc:`astryx78zum5`,kXwgrk:`astryxdt5ytf`,kOIVth:`astryx1lsbc85`,k8WAf4:`astryxu0wf1k`,$$css:!0}},s.displayName=`CommandPaletteGroup`,s.__docgenInfo={description:`Visual grouping for command palette items with a heading label.

Heading style matches DropdownMenu section headings:
supporting-size (12px), secondary color, no uppercase/letterSpacing.

@compositionHint Place inside CommandPaletteList.
  Contains CommandPaletteItem children.

@example
\`\`\`
<CommandPaletteGroup heading="Navigation">
  <CommandPaletteItem value="home" onSelect={goHome}>
    Home
  </CommandPaletteItem>
</CommandPaletteGroup>
\`\`\``,methods:[],displayName:`CommandPaletteGroup`,props:{xstyle:{required:!1,tsType:{name:`StyleXStyles`},description:"StyleX styles created via `stylex.create()`. Merged with the component's\nbase styles inside a single `stylex.props()` call for optimal deduplication.\n\n@example\n```\nconst overrides = stylex.create({ root: { marginBottom: 8 } });\n<Component xstyle={overrides.root} />\n```"},ref:{required:!1,tsType:{name:`ReactRef`,raw:`React.Ref<HTMLDivElement>`,elements:[{name:`HTMLDivElement`}]},description:`Ref forwarded to the root element.`},heading:{required:!0,tsType:{name:`string`},description:`Group heading text.`},children:{required:!0,tsType:{name:`ReactNode`},description:`Items within this group.`}},composes:[`Omit`]}})))()}export{u as n,s as t};