import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{t}from"./react-DlPsW1c0.js";import{n,t as r}from"./stylex-BSlGVhGe.js";import{a as i,n as a,o,t as s}from"./useScrollRegionProps-DNvDy4pz.js";import{n as c}from"./mergeProps-DHkqklmt.js";import{i as l,t as u}from"./themeProps-BVy3p_gf.js";import{n as d,t as f}from"./useMergedRefs-D6axeCXB.js";function p({as:e,ref:t,elementProps:n,children:r}){let i=a({isScrollable:!0,role:n.role,label:n[`aria-label`]}),o=d(t,i.ref);return(0,m.createElement)(e,{...n,ref:o,role:i.role,"aria-label":i[`aria-label`]},r)}var m;function h(){return(h=e((()=>{m=t(),f(),s(),p.__docgenInfo={description:``,methods:[],displayName:`StackItemScrollRegion`,props:{as:{required:!0,tsType:{name:`union`,raw:`'div' | 'span'`,elements:[{name:`literal`,value:`'div'`},{name:`literal`,value:`'span'`}]},description:``},ref:{required:!1,tsType:{name:`Ref`,elements:[{name:`HTMLElement`}],raw:`Ref<HTMLElement>`},description:``},elementProps:{required:!0,tsType:{name:`signature`,type:`object`,raw:`{
  role?: AriaRole;
  'aria-label'?: string;
  [prop: string]: unknown;
}`,signature:{properties:[{key:`role`,value:{name:`AriaRole`,required:!1}},{key:`aria-label`,value:{name:`string`,required:!1}},{key:{name:`string`},value:{name:`unknown`,required:!0}}]}},description:``},children:{required:!1,tsType:{name:`ReactNode`},description:``}}}})))()}function g({crossAlignSelf:e,size:t,isScrollable:r,as:i=`div`,xstyle:a,className:s,style:u,children:d,ref:f,...m}){let h=n(...o({crossAlignSelf:e,size:t}),r&&v.scrollable,a),g={...c(l(`stack-item`,{size:t}),h,s,u),...m};return r&&(i===`div`||i===`span`)?(0,_.createElement)(p,{as:i,ref:f,elementProps:g},d):(0,_.createElement)(i,{ref:f,...g},d)}var _,v;function y(){return(y=e((()=>{_=t(),r(),i(),u(),h(),v={scrollable:{kVQacm:`astryxysyzu8`,kXHlph:null,kORKVm:null,$$css:!0}},g.displayName=`StackItem`,g.__docgenInfo={description:`Stack item component for controlling individual item behavior within a stack.

Supports polymorphic rendering via the \`as\` prop.

@example
\`\`\`
<HStack gap={2}>
  <StackItem size="static">Logo</StackItem>
  <StackItem size="fill">Content</StackItem>
  <StackItem size="static">Actions</StackItem>
</HStack>
\`\`\``,methods:[],displayName:`StackItem`,props:{xstyle:{required:!1,tsType:{name:`StyleXStyles`},description:"StyleX styles created via `stylex.create()`. Merged with the component's\nbase styles inside a single `stylex.props()` call for optimal deduplication.\n\n@example\n```\nconst overrides = stylex.create({ root: { marginBottom: 8 } });\n<Component xstyle={overrides.root} />\n```"},ref:{required:!1,tsType:{name:`ReactRef`,raw:`React.Ref<HTMLElement>`,elements:[{name:`HTMLElement`}]},description:`Ref forwarded to the root element`},crossAlignSelf:{required:!1,tsType:{name:`unknown`},description:`Overrides the default cross-alignment for this item.
(hAlign for VStack, vAlign for HStack)`},size:{required:!1,tsType:{name:`unknown`},description:`Size behavior of the item within the stack.
- \`static\`: Uses intrinsic size, won't grow or shrink (default)
- \`fill\`: Grows to fill remaining space

@default "static"`},isScrollable:{required:!1,tsType:{name:`boolean`},description:'Enables scrollable overflow (`overflow: auto`) for the item.\n\nStackItem already applies the flex `min-height: 0` / `min-width: 0`\nreset, so `<StackItem size="fill" isScrollable>` is a complete scroll\nregion — it grows to fill the stack and scrolls its own overflow with\nno extra style plumbing. Matches `isScrollable` on `LayoutContent`\nand `LayoutPanel`. While its content overflows, a `div` or `span` item\nis a group named by the caller\'s `aria-label`, or by a translated\n"Content". Another element keeps its own role.\n@default false'},as:{required:!1,tsType:{name:`ElementType`},description:`The element type to render.
@default 'div'`,defaultValue:{value:`'div'`,computed:!1}},children:{required:!1,tsType:{name:`ReactNode`},description:`Content to render inside the stack item.`}},composes:[`Omit`]}})))()}export{y as n,g as t};