import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{t}from"./react-DlPsW1c0.js";import{n,t as r}from"./stylex-BSlGVhGe.js";import{t as i}from"./jsx-runtime-MKhVqBIO.js";import{n as a}from"./mergeProps-DHkqklmt.js";import{n as o}from"./isRenderable-C2vVZKI4.js";import{i as s,t as c}from"./themeProps-BVy3p_gf.js";function l({title:e,children:t,xstyle:r,className:i,style:c,ref:l,"aria-labelledby":f,...p}){let m=(0,u.useId)(),h=o(e);return(0,d.jsxs)(`div`,{...p,ref:l,role:`group`,"aria-labelledby":h?m:f,...a(n(r),i,c),children:[h&&(0,d.jsx)(`div`,{id:m,...a(s(`dropdown-menu-section-heading`),{className:`astryxu0wf1k astryxf314gf astryx9ynric astryx141an7d astryx1ltkj2j astryxv1l7n4 astryx87ps6o`}),children:e}),t]})}var u,d;function f(){return(f=e((()=>{u=t(),r(),c(),d=i(),l.displayName=`DropdownMenuGroup`,l.__docgenInfo={description:`A titled group of menu rows.

Renders \`role="group"\` named by its heading. The heading is not a
\`menuitem\`, so arrow-key navigation and typeahead skip it. Keep heading
content non-interactive; place controls in DropdownMenu's \`header\` or
\`footer\`. The compound peer of
\`{type: 'section', title, items}\` in the \`items\` data API. Host attributes
(\`id\`, \`data-*\`, \`aria-*\`) and DOM handlers reach the group element; its
role, and its name while it has a title, stay component-owned.

@example
\`\`\`
<DropdownMenu button={{ label: 'Actions' }}>
  <DropdownMenuGroup title="Version history">
    <DropdownMenuItem label="Restore" onClick={handleRestore} />
    <DropdownMenuItem label="Compare" onClick={handleCompare} />
  </DropdownMenuGroup>
  <DropdownMenuDivider />
  <DropdownMenuItem label="Delete" variant="destructive" onClick={handleDelete} />
</DropdownMenu>
\`\`\``,methods:[],displayName:`DropdownMenuGroup`,props:{title:{required:!1,tsType:{name:`ReactNode`},description:"Heading shown above the group's rows and used as the group's accessible\nname (`aria-labelledby`). Omit it for an unnamed group. Keep this content\nnon-interactive; controls belong in DropdownMenu's `header` or `footer`."},children:{required:!1,tsType:{name:`ReactNode`},description:`The rows of the group: menu items, selectable items, sub-menus.`},ref:{required:!1,tsType:{name:`ReactRef`,raw:`React.Ref<HTMLDivElement>`,elements:[{name:`HTMLDivElement`}]},description:'Ref forwarded to the `role="group"` element.'}},composes:[`Omit`]}})))()}export{f as n,l as t};