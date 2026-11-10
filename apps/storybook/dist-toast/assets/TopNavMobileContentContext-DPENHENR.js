import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{t}from"./react-DlPsW1c0.js";import{n,t as r}from"./sharedContext-BVffqy7N.js";import{t as i}from"./jsx-runtime-MKhVqBIO.js";import{o as a}from"./InternationalizationContext-C5wQA9mp.js";import{n as o,t as s}from"./useComponentTranslator-Dzvlp8mx.js";import{t as c}from"./composeEventHandlers-CceNiKXL.js";import{n as l,t as u}from"./Icon-BmO5FtDV.js";import{n as d,t as f}from"./Button-DoGM0DEN.js";import{n as p,r as m}from"./AppShellMobileContext-dMpi6jK0.js";var h;function g(){return(g=e((()=>{h={"@astryx.mobileNav.toggle.open":`Open navigation`}})))()}function _({ref:e,children:t,label:n,"data-testid":r,xstyle:i,className:a,style:s,onClick:l,...d}){let p=o(),h=n??p(`@astryx.mobileNav.toggle.open`),{isMobile:g,isMobileNavEnabled:_,isMobileNavOpen:y,mobileNavId:b,toggleMobileNav:x}=m();return!g||!_?null:(0,v.jsx)(f,{...d,ref:e,variant:`ghost`,label:h,icon:t??(0,v.jsx)(u,{icon:`menu`,color:`inherit`}),onClick:c(x,l),"aria-expanded":y,"aria-controls":b||void 0,"data-testid":r??`mobile-nav-toggle`,xstyle:i,className:a,style:s,isIconOnly:!0})}var v;function y(){return(y=e((()=>{t(),d(),l(),p(),s(),g(),v=i(),a(h),_.displayName=`MobileNavToggle`,_.__docgenInfo={description:`Mobile nav toggle button. Reads from AppShell context to open/close
the mobile navigation drawer.

Renders nothing when above the mobile breakpoint — safe to include
unconditionally in your layout.

@example
\`\`\`
<div className="my-toolbar">
  <MobileNavToggle />
  <h1>Page Title</h1>
</div>
<MobileNavToggle label="Menu">
  <MyCustomMenuIcon />
</MobileNavToggle>
\`\`\``,methods:[],displayName:`MobileNavToggle`,props:{ref:{required:!1,tsType:{name:`ReactRef`,raw:`React.Ref<HTMLButtonElement>`,elements:[{name:`HTMLButtonElement`}]},description:``},children:{required:!1,tsType:{name:`ReactNode`},description:`Custom content to render instead of the default hamburger icon.`},label:{required:!1,tsType:{name:`string`},description:`Accessible label for the toggle button.
@default 'Open navigation'`},"data-testid":{required:!1,tsType:{name:`string`},description:`Test ID for the button element.`}},composes:[`Omit`]}})))()}function b(){return(0,x.use)(S)}var x,S;function C(){return(C=e((()=>{x=t(),n(),S=r(`TopNavMobileContentContext`,1,null),S.displayName=`TopNavMobileContentContext`})))()}export{y as a,_ as i,C as n,b as r,S as t};