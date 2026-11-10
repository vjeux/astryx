import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{t}from"./jsx-runtime-MKhVqBIO.js";import{n,t as r}from"./Stack-C-3OCHCS.js";function i({ref:e,justify:t,align:n,hAlign:i,vAlign:o,...s}){return(0,a.jsx)(r,{...s,direction:`horizontal`,hAlign:i??t,vAlign:o??n,ref:e})}var a;function o(){return(o=e((()=>{n(),a=t(),i.displayName=`HStack`,i.__docgenInfo={description:`Horizontal stack component that arranges items along the inline axis:
left to right in LTR, right to left in RTL.
Convenience wrapper around \`Stack\` with \`direction="horizontal"\`.

@example
\`\`\`
<HStack gap={2}>
  <Item />
  <Item />
</HStack>
\`\`\``,methods:[],displayName:`HStack`,props:{ref:{required:!1,tsType:{name:`ReactRef`,raw:`React.Ref<HTMLElement>`,elements:[{name:`HTMLElement`}]},description:`Ref forwarded to the root element`},hAlign:{required:!1,tsType:{name:`unknown`},description:"Horizontal alignment of items (main-axis for horizontal stack).\n- `start`: Align to start (left in LTR)\n- `center`: Center items\n- `end`: Align to end (right in LTR)\n- `between`: Space between items\n- `around`: Space around items\n- `evenly`: Even space distribution"},vAlign:{required:!1,tsType:{name:`unknown`},description:`Vertical alignment of items (cross-axis for horizontal stack).
@default 'stretch'`},justify:{required:!1,tsType:{name:`unknown`},description:"Main-axis alignment alias. Maps to `hAlign` on HStack.\nMirrors CSS `justify-content` / Tailwind `justify-*`."},align:{required:!1,tsType:{name:`unknown`},description:"Cross-axis alignment alias. Maps to `vAlign` on HStack.\nMirrors CSS `align-items` / Tailwind `items-*`."}},composes:[`Omit`]}})))()}export{o as n,i as t};