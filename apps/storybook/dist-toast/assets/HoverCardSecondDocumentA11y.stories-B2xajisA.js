import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{t}from"./react-DlPsW1c0.js";import{t as n}from"./jsx-runtime-MKhVqBIO.js";import{t as r}from"./react-dom-B2lTHb2f.js";import{n as i,t as a}from"./Button-DoGM0DEN.js";import{n as o,t as s}from"./HoverCard-sNYbGCqQ.js";function c(e){for(let t of Array.from(document.styleSheets)){if(t.href!=null&&new URL(t.href).origin!==window.location.origin)continue;let n=e.createElement(`style`);n.textContent=Array.from(t.cssRules,e=>e.cssText).join(`
`),e.head.append(n)}}function l(){return(0,p.jsx)(s,{label:`Profile`,content:(0,p.jsx)(a,{label:`Message`}),delay:0,hideDelay:0,children:(0,p.jsx)(a,{label:`Rowan`})})}function u(){let[e,t]=(0,d.useState)(null),n=window.documentPictureInPicture,r=(0,d.useCallback)(async()=>{if(n==null)return;let e=await n.requestWindow({width:420,height:260});c(e.document),e.addEventListener(`pagehide`,()=>t(null)),t(e.document.body)},[n]);return(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)(a,{label:`Pop out`,isDisabled:n==null,onClick:r}),e!=null&&(0,f.createPortal)((0,p.jsx)(l,{}),e)]})}var d,f,p,m,h,g,_;function v(){return(v=e((()=>{d=t(),f=r(),i(),o(),p=n(),m={title:`a11y/HoverCard in a second document`,tags:[`no-visual`]},h=`<!doctype html><html><head></head><body></body></html>`,g={render:function(){let[e,t]=(0,d.useState)(null),n=(0,d.useCallback)(e=>{let n=e.currentTarget.contentDocument;n!=null&&(c(n),t(n.body))},[]);return(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)(`iframe`,{title:`Second document`,srcDoc:h,onLoad:n,style:{width:420,height:260,border:`1px solid`}}),e!=null&&(0,f.createPortal)((0,p.jsx)(l,{}),e),(0,p.jsx)(u,{})]})}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  render: function SecondDocumentStory() {
    const [body, setBody] = useState<HTMLElement | null>(null);
    const handleLoad = useCallback((event: SyntheticEvent<HTMLIFrameElement>) => {
      const frameDocument = event.currentTarget.contentDocument;
      if (frameDocument != null) {
        adoptPageStyles(frameDocument);
        setBody(frameDocument.body);
      }
    }, []);
    return <>
        <iframe title="Second document" srcDoc={FRAME_DOCUMENT} onLoad={handleLoad} style={{
        width: 420,
        height: 260,
        border: '1px solid'
      }} />
        {body != null && createPortal(<Card />, body)}
        <PictureInPictureCard />
      </>;
  }
}`,...g.parameters?.docs?.source}}},_=[`SecondDocument`]})))()}v();export{g as SecondDocument,_ as __namedExportsOrder,m as default};