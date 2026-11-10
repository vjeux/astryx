import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{t}from"./react-DlPsW1c0.js";import{t as n}from"./jsx-runtime-MKhVqBIO.js";import{n as r,t as i}from"./Text-C5BHw0wv.js";import{n as a,t as o}from"./defaultIcons-HZ-_fAMT.js";import{n as s,t as c}from"./Stack-C-3OCHCS.js";import{n as l,t as u}from"./SVGIcon-CgS3ih5P.js";import{n as d}from"./story-parameters-8XuNpfxK.js";function f(e,t){if(t===`circle`){let t=Number(e.cx||0),n=Number(e.cy||0),r=Number(e.r||0);return{x:t-r,y:n-r,width:r*2,height:r*2}}if(t===`rect`)return{x:Number(e.x||0),y:Number(e.y||0),width:Number(e.width||0),height:Number(e.height||0)};let n=(e.d||`${e.x1||0} ${e.y1||0} ${e.x2||0} ${e.y2||0}`).match(/-?[\d.]+/g)?.map(Number)||[];if(n.length<2)return{x:0,y:0,width:24,height:24};let r=1/0,i=1/0,a=-1/0,o=-1/0;for(let e=0;e<n.length-1;e+=2){let t=n[e],s=n[e+1];t<100&&s<100&&(r=Math.min(r,t),a=Math.max(a,t),i=Math.min(i,s),o=Math.max(o,s))}return isFinite(r)?{x:r,y:i,width:a-r,height:o-i}:{x:0,y:0,width:24,height:24}}function p(e,t){return e.x<=t.x&&e.y<=t.y&&e.x+e.width>=t.x+t.width&&e.y+e.height>=t.y+t.height}function m(e){return e.width*e.height}function h(e,t){if(!t?.props)return null;let n=t.props,r=g.Children.toArray(n.children).filter(g.isValidElement),i=n.fill===`currentColor`&&!n.stroke,a=[];for(let e of r){if(!(0,g.isValidElement)(e))continue;let t=e.type;if(![`path`,`circle`,`rect`,`line`,`polyline`,`polygon`].includes(t))continue;let{key:n,children:r,...o}=e.props,s={},c=[`d`,`cx`,`cy`,`r`,`x`,`y`,`width`,`height`,`rx`,`ry`,`x1`,`y1`,`x2`,`y2`,`points`,`fillRule`,`clipRule`];for(let[e,t]of Object.entries(o))if(c.includes(e)&&t!=null){let n=e===`fillRule`?`fill-rule`:e===`clipRule`?`clip-rule`:e;s[n]=String(t)}let l=`stroke`;if(i)l=`fill`;else if(t===`circle`&&o.fill===`currentColor`)l=`fill`;else if(t===`rect`&&Number(s.width||0)>6)l=`fill`;else if(t===`path`){let e=s.d||``;/[Zz]\s*$/.test(e)&&e.length>30&&(l=`fill`)}let u=f(s,t);a.push({type:t,attrs:s,role:l,bbox:u})}if(a.length===0)return null;let o=[],s=[];if(a.length===1)o.push(a[0]);else{let e=0,t=0;a.forEach((n,r)=>{let i=m(n.bbox);i>t&&(t=i,e=r)});let n=a[e].bbox;a.forEach((r,i)=>{i===e?o.push({type:r.type,attrs:r.attrs,role:r.role}):p(n,r.bbox)&&m(r.bbox)<t*.5?s.push({type:r.type,attrs:r.attrs,role:r.role}):o.push({type:r.type,attrs:r.attrs,role:r.role})})}return{name:e,primary:o,secondary:s.length>0?s:void 0}}var g,_,v,y,b,x;function S(){return(S=e((()=>{g=t(),l(),s(),r(),a(),_=n(),v={title:`Lab/SVGIcon`,component:u},y=[`linear`,`bold`,`twotone`,`bulk`,`broken`],b={parameters:d({D1:{applicable:!1,reason:`This reference fixture preserves caller-supplied left and right glyph geometry; the samples are data, not directional controls.`}}),render:()=>{let e=[];for(let[t,n]of Object.entries(o)){let r=h(t,n);r&&e.push({name:t,def:r})}return(0,_.jsxs)(c,{direction:`vertical`,gap:3,children:[(0,_.jsx)(i,{type:`large`,children:`Default Registry Icons \\u2192 SVGIcon System`}),(0,_.jsxs)(i,{type:`supporting`,children:[e.length,` icons auto-converted. Heuristic: containment-based layer classification (only elements fully contained within a larger shape become secondary). Peer elements (same size, not contained) stay primary.`]}),(0,_.jsxs)(`div`,{style:{display:`grid`,gridTemplateColumns:`130px repeat(${y.length}, 1fr)`,gap:`8px 4px`,alignItems:`center`},children:[(0,_.jsx)(`div`,{}),y.map(e=>(0,_.jsx)(i,{type:`label`,style:{textAlign:`center`,fontSize:10},children:e},e)),e.map(({name:e,def:t})=>(0,_.jsxs)(g.Fragment,{children:[(0,_.jsx)(i,{type:`label`,style:{fontSize:11},children:e}),y.map(n=>(0,_.jsx)(`div`,{style:{display:`flex`,justifyContent:`center`},children:(0,_.jsx)(u,{icon:t,variation:n,size:`lg`})},`${e}-${n}`))]},e))]})]})}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  parameters: rtlAuditParameters({
    D1: {
      applicable: false,
      reason: 'This reference fixture preserves caller-supplied left and right glyph geometry; the samples are data, not directional controls.'
    }
  }),
  render: () => {
    const converted: Array<{
      name: string;
      def: SVGIconDef;
    }> = [];
    for (const [name, jsx] of Object.entries(defaultIcons)) {
      const def = jsxSvgToIconDef(name, jsx as ReactElement);
      if (def) {
        converted.push({
          name,
          def
        });
      }
    }
    return <Stack direction="vertical" gap={3}>
        <Text type="large">Default Registry Icons \\u2192 SVGIcon System</Text>
        <Text type="supporting">
          {converted.length} icons auto-converted. Heuristic: containment-based
          layer classification (only elements fully contained within a larger
          shape become secondary). Peer elements (same size, not contained) stay
          primary.
        </Text>

        <div style={{
        display: 'grid',
        gridTemplateColumns: \`130px repeat(\${VARIATIONS.length}, 1fr)\`,
        gap: '8px 4px',
        alignItems: 'center'
      }}>
          <div />
          {VARIATIONS.map(v => <Text key={v} type="label" style={{
          textAlign: 'center',
          fontSize: 10
        }}>
              {v}
            </Text>)}

          {converted.map(({
          name,
          def
        }) => <Fragment key={name}>
              <Text type="label" style={{
            fontSize: 11
          }}>
                {name}
              </Text>
              {VARIATIONS.map(v => <div key={\`\${name}-\${v}\`} style={{
            display: 'flex',
            justifyContent: 'center'
          }}>
                  <SVGIcon icon={def} variation={v} size="lg" />
                </div>)}
            </Fragment>)}
        </div>
      </Stack>;
  }
}`,...b.parameters?.docs?.source}}},x=[`DefaultRegistryIcons`]})))()}S();export{b as DefaultRegistryIcons,x as __namedExportsOrder,v as default};