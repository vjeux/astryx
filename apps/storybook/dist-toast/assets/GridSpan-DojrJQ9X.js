import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{n as t,t as n}from"./stylex-BSlGVhGe.js";import{t as r}from"./jsx-runtime-MKhVqBIO.js";import{n as i}from"./mergeProps-DHkqklmt.js";import{i as a,t as o}from"./themeProps-BVy3p_gf.js";function s({columns:e,rows:n,xstyle:r,className:o,style:s,children:u,ref:d,...f}){let p={...e!=null&&{gridColumn:e===`full`?`1 / -1`:`span ${e}`},...n!=null&&{gridRow:`span ${n}`}};return(0,c.jsx)(`div`,{ref:d,...i(a(`grid-span`),t(l.span,r),o,{...s,...p}),...f,children:u})}var c,l;function u(){return(u=e((()=>{n(),o(),c=r(),l={span:{k7Eaqz:`astryxeuugli`,k1xSpc:`astryxrvj5dj`,kumcoG:`astryx1mkdm3x`,kZKoxP:`astryx5yr21d`,$$css:!0}},s.displayName=`GridSpan`,s.__docgenInfo={description:`Grid span component for controlling how many columns/rows a grid item spans.

Use as a direct child of Grid to make an item span multiple columns
or rows.

@example
\`\`\`
<Grid columns={3} gap={4}>
  <GridSpan columns={2}>Wide item</GridSpan>
  <div>Normal</div>
</Grid>
\`\`\``,methods:[],displayName:`GridSpan`,props:{xstyle:{required:!1,tsType:{name:`StyleXStyles`},description:"StyleX styles created via `stylex.create()`. Merged with the component's\nbase styles inside a single `stylex.props()` call for optimal deduplication.\n\n@example\n```\nconst overrides = stylex.create({ root: { marginBottom: 8 } });\n<Component xstyle={overrides.root} />\n```"},ref:{required:!1,tsType:{name:`ReactRef`,raw:`React.Ref<HTMLDivElement>`,elements:[{name:`HTMLDivElement`}]},description:`Ref forwarded to the root element`},columns:{required:!1,tsType:{name:`union`,raw:`number | 'full'`,elements:[{name:`number`},{name:`literal`,value:`'full'`}]},description:"Number of columns to span, or 'full' to span all columns.\n- Number: `grid-column: span N`\n- 'full': `grid-column: 1 / -1` (spans all explicit columns)"},rows:{required:!1,tsType:{name:`number`},description:"Number of rows to span.\nSets `grid-row: span N`."},children:{required:!1,tsType:{name:`ReactNode`},description:`Content to render inside the grid span.`}},composes:[`Omit`]}})))()}export{u as n,s as t};