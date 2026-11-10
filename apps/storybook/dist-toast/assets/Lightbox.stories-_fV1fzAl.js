import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{t}from"./react-DlPsW1c0.js";import{t as n}from"./jsx-runtime-MKhVqBIO.js";import{n as r,t as i}from"./Lightbox-BopvahEm.js";function a(e){let{media:t,...n}=e,[r,a]=(0,o.useState)(!1),[c,l]=(0,o.useState)(0),u=(0,o.useCallback)((e=0)=>{l(e),a(!0)},[]),d=(0,o.useCallback)(()=>{a(!1)},[]),f=(0,o.useMemo)(()=>({role:`button`,tabIndex:0,"aria-haspopup":`dialog`,onClick:()=>u(),onKeyDown:e=>{(e.key===`Enter`||e.key===` `)&&(e.preventDefault(),u())}}),[u]),p=(0,o.useCallback)(e=>({role:`button`,tabIndex:0,"aria-haspopup":`dialog`,onClick:()=>u(e),onKeyDown:t=>{(t.key===`Enter`||t.key===` `)&&(t.preventDefault(),u(e))}}),[u]);return{open:u,close:d,isOpen:r,index:c,element:(0,o.useMemo)(()=>(0,s.jsx)(i,{isOpen:r,onOpenChange:e=>{e||a(!1)},media:t,index:c,onIndexChange:l,...n}),[r,t,c,n]),triggerProps:f,getTriggerProps:p}}var o,s;function c(){return(c=e((()=>{o=t(),r(),s=n()})))()}var l,u,d,f,p,m,h,g,_,v,y,b,x,S,C,w,T,E,D;function O(){return(O=e((()=>{l=t(),r(),c(),u=n(),d={title:`Core/Lightbox`,component:i,tags:[`autodocs`]},f=`https://picsum.photos/id/10/1200/800`,p=[{src:`https://picsum.photos/id/10/1200/800`,alt:`Forest path`,caption:`A winding path through the forest`},{src:`https://picsum.photos/id/15/1200/800`,alt:`Mountain lake`},{src:`https://picsum.photos/id/20/1200/800`,alt:`Beach sunset`,caption:`Golden hour at the beach`},{src:`https://picsum.photos/id/25/1200/800`,alt:`City skyline`}],m={render:()=>{let[e,t]=(0,l.useState)(!1);return(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(`button`,{onClick:()=>t(!0),children:`Open lightbox`}),(0,u.jsx)(i,{isOpen:e,onOpenChange:t,media:{src:f,alt:`Forest path`,caption:`A winding path through the forest`}})]})}},h={render:()=>{let[e,t]=(0,l.useState)(!1),[n,r]=(0,l.useState)(0);return(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(`div`,{style:{display:`flex`,gap:`8px`},children:p.map((e,n)=>(0,u.jsx)(`img`,{src:e.src,alt:e.alt,style:{width:120,height:80,objectFit:`cover`,cursor:`pointer`,borderRadius:4},onClick:()=>{r(n),t(!0)}},e.src))}),(0,u.jsx)(i,{isOpen:e,onOpenChange:t,media:p,index:n,onIndexChange:r})]})}},g={render:()=>{let[e,t]=(0,l.useState)(!1);return(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(`button`,{onClick:()=>t(!0),children:`Open, confirm to close`}),(0,u.jsx)(i,{isOpen:e,onOpenChange:e=>{(e||window.confirm(`Close the photo?`))&&t(e)},media:{src:f,alt:`Forest path`}})]})}},_={render:()=>{let[e,t]=(0,l.useState)(!1);return(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(`button`,{onClick:()=>t(!0),children:`Open with zoom`}),(0,u.jsx)(i,{isOpen:e,onOpenChange:t,media:{src:f,alt:`Forest path`},hasZoom:!0})]})}},v={render:()=>{let[e,t]=(0,l.useState)(!1);return(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(`button`,{onClick:()=>t(!0),children:`Open zoom with caption`}),(0,u.jsx)(i,{isOpen:e,onOpenChange:t,media:{src:f,alt:`Forest path`,caption:`A winding path through the forest`},hasZoom:!0})]})}},y={render:()=>{let[e,t]=(0,l.useState)(!1),[n,r]=(0,l.useState)(0);return(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(`button`,{onClick:()=>t(!0),children:`Open gallery with zoom`}),(0,u.jsx)(i,{isOpen:e,onOpenChange:t,media:p,index:n,onIndexChange:r,hasZoom:!0})]})}},b={render:()=>{let[e,t]=(0,l.useState)(!1);return(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(`button`,{onClick:()=>t(!0),children:`Open gallery with captions`}),(0,u.jsx)(i,{isOpen:e,onOpenChange:t,media:[{...p[0],caption:`A winding path through the forest, past the old mill and down to the river, where the trail turns back toward the village`},p[1],p[3],{...p[2],caption:`Golden hour`}],hasZoom:!0})]})}},x={render:()=>{let[e,t]=(0,l.useState)(!1);return(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(`button`,{onClick:()=>t(!0),children:`Open gallery that keeps its photo`}),(0,u.jsx)(i,{isOpen:e,onOpenChange:t,media:p,index:0,onIndexChange:()=>{},hasZoom:!0})]})}},S={render:()=>{let[e,t]=(0,l.useState)(!1);return(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(`button`,{onClick:()=>t(!0),children:`Open with caption`}),(0,u.jsx)(i,{isOpen:e,onOpenChange:t,media:{src:f,alt:`Forest path`,caption:`A beautiful forest path winding through tall trees on a misty morning`}})]})}},C={render:()=>{let[e,t]=(0,l.useState)(!1);return(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(`button`,{onClick:()=>t(!0),children:`Open gallery with video`}),(0,u.jsx)(i,{isOpen:e,onOpenChange:t,media:[p[0],{src:`https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm`,alt:`Flower blooming`,type:`video`},p[1]]})]})}},w={render:()=>{let[e,t]=(0,l.useState)(!1);return(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(`button`,{onClick:()=>t(!0),children:`Open video`}),(0,u.jsx)(i,{isOpen:e,onOpenChange:t,media:{src:`https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm`,alt:`Flower blooming`,type:`video`,caption:`A flower blooming in time-lapse`}})]})}},T={render:()=>{let e=a({media:p});return(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(`div`,{style:{display:`flex`,gap:`8px`},children:p.map((t,n)=>(0,u.jsx)(`img`,{src:t.src,alt:t.alt,style:{width:120,height:80,objectFit:`cover`,cursor:`pointer`,borderRadius:4},...e.getTriggerProps(n)},t.src))}),e.element]})}},E={name:`Open Viewer`,tags:[`!autodocs`],render:()=>{let[e,t]=(0,l.useState)(!0),[n,r]=(0,l.useState)(0);return(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(`button`,{onClick:()=>t(!0),children:`Open viewer`}),(0,u.jsx)(i,{isOpen:e,onOpenChange:t,media:p,index:n,onIndexChange:r,hasZoom:!0})]})}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return <>
        <button onClick={() => setIsOpen(true)}>Open lightbox</button>
        <Lightbox isOpen={isOpen} onOpenChange={setIsOpen} media={{
        src: SAMPLE_IMAGE,
        alt: 'Forest path',
        caption: 'A winding path through the forest'
      }} />
      </>;
  }
}`,...m.parameters?.docs?.source}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    const [index, setIndex] = useState(0);
    return <>
        <div style={{
        display: 'flex',
        gap: '8px'
      }}>
          {GALLERY_MEDIA.map((item, i) => <img key={item.src} src={item.src} alt={item.alt} style={{
          width: 120,
          height: 80,
          objectFit: 'cover',
          cursor: 'pointer',
          borderRadius: 4
        }} onClick={() => {
          setIndex(i);
          setIsOpen(true);
        }} />)}
        </div>
        <Lightbox isOpen={isOpen} onOpenChange={setIsOpen} media={GALLERY_MEDIA} index={index} onIndexChange={setIndex} />
      </>;
  }
}`,...h.parameters?.docs?.source}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return <>
        <button onClick={() => setIsOpen(true)}>Open, confirm to close</button>
        <Lightbox isOpen={isOpen} onOpenChange={next => {
        if (next || window.confirm('Close the photo?')) {
          setIsOpen(next);
        }
      }} media={{
        src: SAMPLE_IMAGE,
        alt: 'Forest path'
      }} />
      </>;
  }
}`,...g.parameters?.docs?.source},description:{story:`The parent decides whether the viewer closes: here it asks first. When it
keeps the viewer open, a photo dragged down comes back.`,...g.parameters?.docs?.description}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return <>
        <button onClick={() => setIsOpen(true)}>Open with zoom</button>
        <Lightbox isOpen={isOpen} onOpenChange={setIsOpen} media={{
        src: SAMPLE_IMAGE,
        alt: 'Forest path'
      }} hasZoom />
      </>;
  }
}`,..._.parameters?.docs?.source}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return <>
        <button onClick={() => setIsOpen(true)}>Open zoom with caption</button>
        <Lightbox isOpen={isOpen} onOpenChange={setIsOpen} media={{
        src: SAMPLE_IMAGE,
        alt: 'Forest path',
        caption: 'A winding path through the forest'
      }} hasZoom />
      </>;
  }
}`,...v.parameters?.docs?.source},description:{story:`Zoom on a photo with a caption, which sits under the fitted photo.`,...v.parameters?.docs?.description}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    const [index, setIndex] = useState(0);
    return <>
        <button onClick={() => setIsOpen(true)}>Open gallery with zoom</button>
        <Lightbox isOpen={isOpen} onOpenChange={setIsOpen} media={GALLERY_MEDIA} index={index} onIndexChange={setIndex} hasZoom />
      </>;
  }
}`,...y.parameters?.docs?.source},description:{story:`A gallery a phone can page through. Drag or flick between photos, with
Photos' 40 pt gap. Pinch or double-tap a photo to zoom, and drag a zoomed
photo to its edge before the next drag pages.`,...y.parameters?.docs?.description}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return <>
        <button onClick={() => setIsOpen(true)}>
          Open gallery with captions
        </button>
        <Lightbox isOpen={isOpen} onOpenChange={setIsOpen} media={[{
        ...GALLERY_MEDIA[0],
        caption: 'A winding path through the forest, past the old mill and down to the river, where the trail turns back toward the village'
      }, GALLERY_MEDIA[1], GALLERY_MEDIA[3], {
        ...GALLERY_MEDIA[2],
        caption: 'Golden hour'
      }]} hasZoom />
      </>;
  }
}`,...b.parameters?.docs?.source},description:{story:`A gallery whose captions differ in length: the photo keeps one box
whichever pages, and so whichever captions, are rendered.`,...b.parameters?.docs?.description}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return <>
        <button onClick={() => setIsOpen(true)}>
          Open gallery that keeps its photo
        </button>
        <Lightbox isOpen={isOpen} onOpenChange={setIsOpen} media={GALLERY_MEDIA} index={0} onIndexChange={() => {}} hasZoom />
      </>;
  }
}`,...x.parameters?.docs?.source},description:{story:`A controlled gallery whose parent keeps its index, paging only with its own
buttons, say while a change is confirmed. A swipe returns to the photo the
parent shows.`,...x.parameters?.docs?.description}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return <>
        <button onClick={() => setIsOpen(true)}>Open with caption</button>
        <Lightbox isOpen={isOpen} onOpenChange={setIsOpen} media={{
        src: SAMPLE_IMAGE,
        alt: 'Forest path',
        caption: 'A beautiful forest path winding through tall trees on a misty morning'
      }} />
      </>;
  }
}`,...S.parameters?.docs?.source}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return <>
        <button onClick={() => setIsOpen(true)}>Open gallery with video</button>
        <Lightbox isOpen={isOpen} onOpenChange={setIsOpen} media={[GALLERY_MEDIA[0], {
        src: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm',
        alt: 'Flower blooming',
        type: 'video'
      }, GALLERY_MEDIA[1]]} />
      </>;
  }
}`,...C.parameters?.docs?.source},description:{story:`A gallery with a video between two photos. A drag on the video's frame
pages, and a drag that starts on its controls stays the video's.`,...C.parameters?.docs?.description}}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return <>
        <button onClick={() => setIsOpen(true)}>Open video</button>
        <Lightbox isOpen={isOpen} onOpenChange={setIsOpen} media={{
        src: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm',
        alt: 'Flower blooming',
        type: 'video',
        caption: 'A flower blooming in time-lapse'
      }} />
      </>;
  }
}`,...w.parameters?.docs?.source}}},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  render: () => {
    const lightbox = useLightbox({
      media: GALLERY_MEDIA
    });
    return <>
        <div style={{
        display: 'flex',
        gap: '8px'
      }}>
          {GALLERY_MEDIA.map((item, i) => <img key={item.src} src={item.src} alt={item.alt} style={{
          width: 120,
          height: 80,
          objectFit: 'cover',
          cursor: 'pointer',
          borderRadius: 4
        }} {...lightbox.getTriggerProps(i)} />)}
        </div>
        {lightbox.element}
      </>;
  }
}`,...T.parameters?.docs?.source}}},E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  name: 'Open Viewer',
  // Kept off the docs page because the viewer opens on load.
  tags: ['!autodocs'],
  render: () => {
    const [isOpen, setIsOpen] = useState(true);
    const [index, setIndex] = useState(0);
    return <>
        <button onClick={() => setIsOpen(true)}>Open viewer</button>
        <Lightbox isOpen={isOpen} onOpenChange={setIsOpen} media={GALLERY_MEDIA} index={index} onIndexChange={setIndex} hasZoom />
      </>;
  }
}`,...E.parameters?.docs?.source},description:{story:`The gallery viewer, open when the page loads, so a page-level
accessibility check reaches the open viewer.`,...E.parameters?.docs?.description}}},D=[`Default`,`Gallery`,`ConfirmClose`,`WithZoom`,`ZoomWithCaption`,`GalleryWithZoom`,`GalleryWithCaptions`,`GalleryKeepsIndex`,`WithCaption`,`GalleryWithVideo`,`Video`,`WithHook`,`OpenViewer`]})))()}O();export{g as ConfirmClose,m as Default,h as Gallery,x as GalleryKeepsIndex,b as GalleryWithCaptions,C as GalleryWithVideo,y as GalleryWithZoom,E as OpenViewer,w as Video,S as WithCaption,T as WithHook,_ as WithZoom,v as ZoomWithCaption,D as __namedExportsOrder,d as default};