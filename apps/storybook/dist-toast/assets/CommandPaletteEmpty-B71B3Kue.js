import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{t}from"./react-DlPsW1c0.js";import{n,t as r}from"./stylex-BSlGVhGe.js";import{t as i}from"./jsx-runtime-MKhVqBIO.js";import{n as a}from"./mergeProps-DHkqklmt.js";import{i as o,t as s}from"./themeProps-BVy3p_gf.js";function c({ref:e,children:t,xstyle:r,className:i,style:s,...c}){return(0,l.jsx)(`div`,{ref:e,...a(o(`command-palette-empty`),n(u.empty,r),i,s),...c,children:t})}var l,u;function d(){return(d=e((()=>{t(),r(),s(),l=i(),u={empty:{k1xSpc:`astryx78zum5`,kGNEyG:`astryx6s0dn4`,kjj79g:`astryxl56j7k`,k8WAf4:`astryxmfvnks`,kg3NbH:`astryx1pzlopt`,kMv6JI:`astryx9ynric`,kGuDYH:`astryx141an7d`,kLWn49:`astryx1ltkj2j`,kMwMTN:`astryxv1l7n4`,k9WMMc:`astryx2b8uid`,kHjlTd:`astryxj0a0fe`,"--_astryx-text-overflow-wrap":`astryx5ujdhh`,$$css:!0}},c.displayName=`CommandPaletteEmpty`,c.__docgenInfo={description:`Empty state for the command palette list area.

Rendered automatically by CommandPalette in two situations:
- \`emptyBootstrapText\`: no search term and bootstrap() returns nothing
- \`emptySearchText\`: a search query returned no results

Can also be composed as a standalone empty result surface. Render actionable
empty content outside listbox and option semantics.

@example
\`\`\`
<CommandPalette
  emptyBootstrapText="Start typing to search"
  emptySearchText="No results found"
  searchSource={source}
/>
\`\`\``,methods:[],displayName:`CommandPaletteEmpty`,props:{xstyle:{required:!1,tsType:{name:`StyleXStyles`},description:"StyleX styles created via `stylex.create()`. Merged with the component's\nbase styles inside a single `stylex.props()` call for optimal deduplication.\n\n@example\n```\nconst overrides = stylex.create({ root: { marginBottom: 8 } });\n<Component xstyle={overrides.root} />\n```"},ref:{required:!1,tsType:{name:`ReactRef`,raw:`React.Ref<HTMLDivElement>`,elements:[{name:`HTMLDivElement`}]},description:``},children:{required:!0,tsType:{name:`ReactNode`},description:`The message or content to display.`}},composes:[`Omit`]}})))()}export{d as n,c as t};