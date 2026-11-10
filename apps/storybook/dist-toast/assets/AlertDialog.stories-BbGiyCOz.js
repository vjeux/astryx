import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{t}from"./react-DlPsW1c0.js";import{t as n}from"./jsx-runtime-MKhVqBIO.js";import{n as r,t as i}from"./Button-DoGM0DEN.js";import{n as a,t as o}from"./AlertDialog-CRwwin_Z.js";function s(){let[e,t]=(0,c.useState)(!1),[n,r]=(0,c.useState)(null);return{show:(0,c.useCallback)(e=>{r(e),t(!0)},[]),hide:(0,c.useCallback)(()=>{t(!1)},[]),isOpen:e,element:(0,c.useMemo)(()=>n?(0,l.jsx)(o,{...n,isOpen:e,onOpenChange:e=>{e||t(!1)}}):null,[e,n])}}var c,l;function u(){return(u=e((()=>{c=t(),a(),l=n()})))()}var d,f,p,m,h,g,_,v,y,b,x,S,C;function w(){return(w=e((()=>{d=t(),a(),u(),r(),f=n(),p={title:`Core/AlertDialog`,component:o,tags:[`autodocs`],argTypes:{isOpen:{control:`boolean`},width:{control:`number`},actionVariant:{control:`select`,options:[`destructive`,`primary`,`secondary`,`ghost`]}}},m={render:()=>{let[e,t]=(0,d.useState)(!1);return(0,f.jsxs)(f.Fragment,{children:[(0,f.jsx)(i,{label:`Delete item`,variant:`destructive`,onClick:()=>t(!0)}),(0,f.jsx)(o,{isOpen:e,onOpenChange:t,title:`Delete item?`,description:`This action cannot be undone. The item and all its data will be permanently removed.`,actionLabel:`Delete`,onAction:()=>t(!1)})]})}},h={render:()=>{let[e,t]=(0,d.useState)(!1),[n,r]=(0,d.useState)(!1);return(0,f.jsxs)(f.Fragment,{children:[(0,f.jsx)(i,{label:`Revoke access`,variant:`destructive`,onClick:()=>t(!0)}),(0,f.jsx)(o,{isOpen:e,onOpenChange:t,title:`Revoke access?`,description:`This user will immediately lose access to all shared resources.`,actionLabel:`Revoke`,isActionLoading:n,onAction:async()=>{r(!0),await new Promise(e=>setTimeout(e,2e3)),r(!1),t(!1)}})]})}},g={args:{isOpen:!0,isInline:!0,title:`Delete item?`,description:`This action cannot be undone. The item and all its data will be permanently removed.`,actionLabel:`Delete`,onOpenChange:()=>{},onAction:()=>{}}},_={args:{isOpen:!0,isInline:!0,title:`Permanently delete this workspace?`,description:`Everyone will lose access to its dashboards, saved queries, and sharing links. This cannot be undone.`,cancelLabel:`Keep this workspace`,actionLabel:`Permanently delete workspace`,onOpenChange:()=>{},onAction:()=>{}}},v={args:_.args},y={render:()=>{let e=s();return(0,f.jsxs)(f.Fragment,{children:[(0,f.jsx)(i,{label:`Delete item`,variant:`destructive`,onClick:()=>e.show({title:`Delete item?`,description:`This action cannot be undone.`,actionLabel:`Delete`,onAction:()=>e.hide()})}),e.element]})}},b={render:()=>{let[e,t]=(0,d.useState)(!1);return(0,f.jsxs)(f.Fragment,{children:[(0,f.jsx)(i,{label:`Discard draft`,variant:`secondary`,onClick:()=>t(!0)}),(0,f.jsx)(o,{isOpen:e,onOpenChange:t,title:`Discard this draft?`,description:`Your unsaved edits will be lost.`,cancelLabel:`Keep editing`,actionLabel:`Discard`,onAction:()=>t(!1)})]})}},x={render:()=>{let[e,t]=(0,d.useState)(!1);return(0,f.jsxs)(f.Fragment,{children:[(0,f.jsx)(i,{label:`Delete workspace`,variant:`destructive`,onClick:()=>t(!0)}),(0,f.jsx)(o,{isOpen:e,onOpenChange:t,title:`Delete the entire Marketing Analytics workspace and everything inside it?`,description:`This removes 1,284 documents, 37 dashboards, every saved query, and all sharing links, for all 62 members of the workspace. Exports already scheduled will stop running. Anyone holding a link will get a 404 instead of the content. This cannot be undone, and support cannot restore it for you afterwards.`,actionLabel:`Delete workspace`,onAction:()=>t(!1)})]})}},S={args:{isOpen:!0,isInline:!0,title:`Delete item?`,description:`This action cannot be undone.`,actionLabel:`Delete`,onOpenChange:()=>{},onAction:()=>{}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return <>
        <Button label="Delete item" variant="destructive" onClick={() => setIsOpen(true)} />
        <AlertDialog isOpen={isOpen} onOpenChange={setIsOpen} title="Delete item?" description="This action cannot be undone. The item and all its data will be permanently removed." actionLabel="Delete" onAction={() => setIsOpen(false)} />
      </>;
  }
}`,...m.parameters?.docs?.source},description:{story:`Delete confirmation — the most common alert dialog pattern.`,...m.parameters?.docs?.description}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    return <>
        <Button label="Revoke access" variant="destructive" onClick={() => setIsOpen(true)} />
        <AlertDialog isOpen={isOpen} onOpenChange={setIsOpen} title="Revoke access?" description="This user will immediately lose access to all shared resources." actionLabel="Revoke" isActionLoading={isLoading} onAction={async () => {
        setIsLoading(true);
        await new Promise(r => setTimeout(r, 2000));
        setIsLoading(false);
        setIsOpen(false);
      }} />
      </>;
  }
}`,...h.parameters?.docs?.source},description:{story:`Async action with loading state.`,...h.parameters?.docs?.description}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  args: {
    isOpen: true,
    isInline: true,
    title: 'Delete item?',
    description: 'This action cannot be undone. The item and all its data will be permanently removed.',
    actionLabel: 'Delete',
    onOpenChange: () => {},
    onAction: () => {}
  }
}`,...g.parameters?.docs?.source},description:{story:`Wide reference state. In a wide viewport, Dialog preserves AlertDialog's
preferred 400px surface and AlertDialog renders a horizontal action row.`,...g.parameters?.docs?.description}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  args: {
    isOpen: true,
    isInline: true,
    title: 'Permanently delete this workspace?',
    description: 'Everyone will lose access to its dashboards, saved queries, and sharing links. This cannot be undone.',
    cancelLabel: 'Keep this workspace',
    actionLabel: 'Permanently delete workspace',
    onOpenChange: () => {},
    onAction: () => {}
  }
}`,..._.parameters?.docs?.source},description:{story:`Narrow reference state. Use a <=640px viewport to see Dialog's width clamp
with AlertDialog's destructive-above-Cancel stacked action order.`,..._.parameters?.docs?.description}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  args: NarrowFinePointer.args
}`,...v.parameters?.docs?.source},description:{story:`Mobile reference state. Use a <=640px mobile viewport to verify the same
stacked action order; this story does not emulate pointer or hover capability.`,...v.parameters?.docs?.description}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  render: () => {
    const alert = useImperativeAlertDialog();
    return <>
        <Button label="Delete item" variant="destructive" onClick={() => alert.show({
        title: 'Delete item?',
        description: 'This action cannot be undone.',
        actionLabel: 'Delete',
        onAction: () => alert.hide()
      })} />
        {alert.element}
      </>;
  }
}`,...y.parameters?.docs?.source},description:{story:`Imperative API — no state management needed.`,...y.parameters?.docs?.description}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return <>
        <Button label="Discard draft" variant="secondary" onClick={() => setIsOpen(true)} />
        <AlertDialog isOpen={isOpen} onOpenChange={setIsOpen} title="Discard this draft?" description="Your unsaved edits will be lost." cancelLabel="Keep editing" actionLabel="Discard" onAction={() => setIsOpen(false)} />
      </>;
  }
}`,...b.parameters?.docs?.source},description:{story:'A task-specific cancel label. Override `cancelLabel` when "Cancel" reads as\nambiguous next to the action, for example when both choices are verbs.',...b.parameters?.docs?.description}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return <>
        <Button label="Delete workspace" variant="destructive" onClick={() => setIsOpen(true)} />
        <AlertDialog isOpen={isOpen} onOpenChange={setIsOpen} title="Delete the entire Marketing Analytics workspace and everything inside it?" description="This removes 1,284 documents, 37 dashboards, every saved query, and all sharing links, for all 62 members of the workspace. Exports already scheduled will stop running. Anyone holding a link will get a 404 instead of the content. This cannot be undone, and support cannot restore it for you afterwards." actionLabel="Delete workspace" onAction={() => setIsOpen(false)} />
      </>;
  }
}`,...x.parameters?.docs?.source},description:{story:`Long title and description. The dialog wraps rather than clipping, and the
footer buttons stay on screen; the body scrolls when the viewport is short.`,...x.parameters?.docs?.description}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  args: {
    isOpen: true,
    isInline: true,
    title: 'Delete item?',
    description: 'This action cannot be undone.',
    actionLabel: 'Delete',
    onOpenChange: () => {},
    onAction: () => {}
  }
}`,...S.parameters?.docs?.source},description:{story:'The inline preview path (`isInline`). Renders the content in place without\n`showModal()`, for documentation previews and showcases. It is not a modal:\nit does not trap focus, block the page, or respond to Escape — so it exposes\n`role="group"` rather than `role="alertdialog"`.',...S.parameters?.docs?.description}}},C=[`Delete`,`Async`,`DesktopFinePointer`,`NarrowFinePointer`,`MobileTouch`,`Imperative`,`CustomCancelLabel`,`LongContent`,`Inline`]})))()}w();export{h as Async,b as CustomCancelLabel,m as Delete,g as DesktopFinePointer,y as Imperative,S as Inline,x as LongContent,v as MobileTouch,_ as NarrowFinePointer,C as __namedExportsOrder,p as default};