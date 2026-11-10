import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{t}from"./jsx-runtime-MKhVqBIO.js";import{n,t as r}from"./Icon-BmO5FtDV.js";import{i,n as a,r as o,t as s}from"./BreadcrumbItem-DVw8X0_V.js";import{d as c,f as l}from"./renderDropdownItems-hNxj8lO0.js";import{n as u,t as d}from"./VStack-SWtDePqc.js";var f,p,m,h;function g(){return(g=e((()=>{a(),l(),i(),n(),u(),f=t(),p={title:`Core/BreadcrumbItem`,component:s,tags:[`autodocs`],parameters:{controls:{disable:!0}}},m={name:`Public States`,render:()=>(0,f.jsxs)(d,{gap:4,children:[(0,f.jsxs)(o,{label:`Link, action, and current breadcrumb items`,children:[(0,f.jsx)(s,{href:`/calendar`,startIcon:(0,f.jsx)(r,{icon:`calendar`,size:`sm`}),children:`Calendar`}),(0,f.jsx)(s,{onClick:()=>{},children:`Refresh`}),(0,f.jsx)(s,{isCurrent:!0,children:`Overview`})]}),(0,f.jsxs)(o,{label:`Current breadcrumb item with a menu`,children:[(0,f.jsx)(s,{href:`/`,children:`Home`}),(0,f.jsx)(s,{isCurrent:!0,menu:(0,f.jsxs)(f.Fragment,{children:[(0,f.jsx)(c,{label:`Design`}),(0,f.jsx)(c,{label:`Engineering`})]}),children:(0,f.jsx)(`span`,{children:`Teams`})})]})]}),play:async({canvasElement:e})=>{let t=e.querySelector(`.astryx-breadcrumb-item-menu-trigger`);t instanceof HTMLButtonElement&&t.getAttribute(`aria-expanded`)===`false`&&t.click()}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  name: 'Public States',
  render: () => <VStack gap={4}>
      <Breadcrumbs label="Link, action, and current breadcrumb items">
        <BreadcrumbItem href="/calendar" startIcon={<Icon icon="calendar" size="sm" />}>
          Calendar
        </BreadcrumbItem>
        <BreadcrumbItem onClick={() => {}}>Refresh</BreadcrumbItem>
        <BreadcrumbItem isCurrent>Overview</BreadcrumbItem>
      </Breadcrumbs>
      <Breadcrumbs label="Current breadcrumb item with a menu">
        <BreadcrumbItem href="/">Home</BreadcrumbItem>
        <BreadcrumbItem isCurrent menu={<>
              <BreadcrumbMenuItem label="Design" />
              <BreadcrumbMenuItem label="Engineering" />
            </>}>
          <span>Teams</span>
        </BreadcrumbItem>
      </Breadcrumbs>
    </VStack>,
  play: async ({
    canvasElement
  }) => {
    const trigger = canvasElement.querySelector('.astryx-breadcrumb-item-menu-trigger');
    if (trigger instanceof HTMLButtonElement && trigger.getAttribute('aria-expanded') === 'false') {
      trigger.click();
    }
  }
}`,...m.parameters?.docs?.source},description:{story:`Keeps the public rendering branches on one reusable fixture: navigation link,
action button, explicit current item, icon content, and a current menu trigger.
The menu opens so component-scoped accessibility and RTL audits can reach its
popup semantics without creating a story per audit row.`,...m.parameters?.docs?.description}}},h=[`PublicStates`]})))()}g();export{m as PublicStates,h as __namedExportsOrder,p as default};