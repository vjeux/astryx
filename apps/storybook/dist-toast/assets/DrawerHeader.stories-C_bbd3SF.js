import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{t}from"./react-DlPsW1c0.js";import{i as n,n as r,r as i,t as a}from"./LayoutContent-BEmJ3Yl2.js";import{t as o}from"./jsx-runtime-MKhVqBIO.js";import{n as s,t as c}from"./Text-C5BHw0wv.js";import{n as l,t as u}from"./Drawer-BXTsMjyA.js";import{n as d,t as f}from"./DrawerHeader-BO-XjUWO.js";var p,m,h,g,_,v;function y(){return(y=e((()=>{p=t(),l(),d(),n(),r(),s(),m=o(),h={title:`Core/DrawerHeader`,component:f,tags:[`autodocs`],parameters:{docs:{disable:!0}}},g={args:{title:`Deployment health for web-prod-04`,subtitle:`us-east-1, deployed 12 minutes ago`,startContent:0,endContent:0,hasDivider:!0},render:e=>{let[t,n]=(0,p.useState)(!0);return(0,m.jsx)(u,{isOpen:t,onOpenChange:n,label:`Deployment details`,children:(0,m.jsx)(i,{header:(0,m.jsx)(f,{...e,onOpenChange:n}),content:(0,m.jsx)(a,{children:(0,m.jsx)(c,{type:`body`,children:`All six instances are passing readiness checks.`})})})})}},_={args:{title:`Deployment health for web-prod-04`,subtitle:`us-east-1, deployed 12 minutes ago`,startContent:0,endContent:0,hasDivider:!0},render:e=>{let[t,n]=(0,p.useState)(!0);return(0,m.jsx)(u,{isOpen:t,onOpenChange:n,label:`Deployment details`,children:(0,m.jsx)(i,{header:(0,m.jsx)(f,{...e}),content:(0,m.jsx)(a,{children:(0,m.jsx)(c,{type:`body`,children:`All six instances are passing readiness checks.`})})})})}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  args: {
    title: 'Deployment health for web-prod-04',
    subtitle: 'us-east-1, deployed 12 minutes ago',
    startContent: 0,
    endContent: 0,
    hasDivider: true
  },
  render: args => {
    const [isOpen, setIsOpen] = useState(true);
    return <Drawer isOpen={isOpen} onOpenChange={setIsOpen} label="Deployment details">
        <Layout header={<DrawerHeader {...args} onOpenChange={setIsOpen} />} content={<LayoutContent>
              <Text type="body">
                All six instances are passing readiness checks.
              </Text>
            </LayoutContent>} />
      </Drawer>;
  }
}`,...g.parameters?.docs?.source}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  args: {
    title: 'Deployment health for web-prod-04',
    subtitle: 'us-east-1, deployed 12 minutes ago',
    startContent: 0,
    endContent: 0,
    hasDivider: true
  },
  render: args => {
    const [isOpen, setIsOpen] = useState(true);
    return <Drawer isOpen={isOpen} onOpenChange={setIsOpen} label="Deployment details">
        <Layout header={<DrawerHeader {...args} />} content={<LayoutContent>
              <Text type="body">
                All six instances are passing readiness checks.
              </Text>
            </LayoutContent>} />
      </Drawer>;
  }
}`,..._.parameters?.docs?.source}}},v=[`Audit`,`AuditWithoutClose`]})))()}y();export{g as Audit,_ as AuditWithoutClose,v as __namedExportsOrder,h as default};