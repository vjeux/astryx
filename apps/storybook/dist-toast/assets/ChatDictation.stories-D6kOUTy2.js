import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{t}from"./react-DlPsW1c0.js";import{n,t as r}from"./stylex-BSlGVhGe.js";import{i,p as a}from"./tokens.stylex-uC3T-IhP.js";import{t as o}from"./jsx-runtime-MKhVqBIO.js";import{n as s}from"./mergeProps-DHkqklmt.js";import{i as c,t as l}from"./themeProps-BVy3p_gf.js";import{o as u}from"./InternationalizationContext-C5wQA9mp.js";import{n as d,t as f}from"./useComponentTranslator-Dzvlp8mx.js";import{n as ee,t as p}from"./useIsomorphicLayoutEffect-CuJHR9MK.js";import{n as m,t as h}from"./Icon-BmO5FtDV.js";import{n as g,t as _}from"./Button-DoGM0DEN.js";import{n as v,t as y}from"./useLocale-BdhI3KFf.js";import{r as b,t as x}from"./ChatComposerInput-DRwLQp9C.js";import{n as S,t as C}from"./ChatComposer-Ble73cNu.js";var w;function T(){return(T=e((()=>{w={"@astryx.chat.speechRecognition.noSpeechDetected":`No speech was detected.`}})))()}function E(){return typeof window>`u`?null:window.SpeechRecognition??window.webkitSpeechRecognition??null}async function D(e){try{let t=await navigator.mediaDevices.getUserMedia({audio:!0}),n=e(),r=n.createMediaStreamSource(t),i=n.createAnalyser();i.fftSize=256,i.smoothingTimeConstant=.5,r.connect(i);let a=new Uint8Array(i.frequencyBinCount),o=new Float32Array(i.frequencyBinCount),s=0;function c(){i.getByteFrequencyData(a),s++;for(let e=0;e<a.length;e++){let t=a[e]/255;t>o[e]&&(o[e]=t)}}function l(e){let t=a[e]/255;return s<60?0:Math.max(0,t-o[e]*1.1)}return{calibrate:c,getVolume:()=>{i.getByteFrequencyData(a),s<60&&c();let e=0;for(let t=0;t<a.length;t++)e+=l(t);return e/a.length},getBands:e=>{i.getByteFrequencyData(a),s<60&&c();let t=[],n=[3,6,11,18,a.length],r=e<=n.length?n.slice(0,e):n,o=1;for(let e=0;e<r.length;e++){let n=r[e],i=0;for(let e=o;e<n;e++)i+=l(e);t.push(i/(n-o)),o=n}return t},getRawBands:e=>{i.getByteFrequencyData(a);let t=[],n=[3,6,11,18,a.length],r=e<=n.length?n.slice(0,e):n,o=1;for(let e=0;e<r.length;e++){let n=r[e],i=0;for(let e=o;e<n;e++)i+=a[e]/255;t.push(i/(n-o)),o=n}return t},cleanup:()=>{r.disconnect();for(let e of t.getTracks())e.stop()}}}catch{return null}}function O(){return A&&A.state!==`closed`||(A=new AudioContext),A.state===`suspended`&&A.resume(),A}function te(e={}){let t=d(),n=v(),{lang:r,continuous:i=!0,interimResults:a=!0,onTranscript:o,onResult:s,onError:c,onStart:l,onEnd:u,audioContext:f,transformTranscript:p}=e,m=(0,k.useCallback)(()=>f??O(),[f]),h=(0,k.useMemo)(()=>E()!=null,[]),[g,_]=(0,k.useState)(!1),[y,b]=(0,k.useState)(!1),[x,S]=(0,k.useState)(0),[C,w]=(0,k.useState)([0,0,0,0,0]),[T,te]=(0,k.useState)([0,0,0,0,0]),[A,j]=(0,k.useState)(``),M=(0,k.useRef)(null),ne=(0,k.useRef)(m),N=(0,k.useRef)(null),P=(0,k.useRef)(0),F=(0,k.useRef)({onTranscript:o,onResult:s,onError:c,onStart:l,onEnd:u,transformTranscript:p});ee(()=>{ne.current=m,F.current={onTranscript:o,onResult:s,onError:c,onStart:l,onEnd:u,transformTranscript:p}}),(0,k.useEffect)(()=>()=>{M.current?.abort(),M.current=null,N.current?.cleanup(),N.current=null,cancelAnimationFrame(P.current)},[]);let I=(0,k.useCallback)(()=>{let e=()=>{let t=N.current;t&&(S(t.getVolume()),w(t.getBands(5)),te(t.getRawBands(5))),P.current=requestAnimationFrame(e)};P.current=requestAnimationFrame(e)},[]),L=(0,k.useCallback)(()=>{cancelAnimationFrame(P.current),S(0),w([0,0,0,0,0]),te([0,0,0,0,0]),N.current?.cleanup(),N.current=null},[]),R=(0,k.useCallback)(()=>{let e=E();if(!e)return;M.current?.abort();let o=new e;o.lang=r??n,o.continuous=i,o.interimResults=a,o.onstart=()=>{_(!0),F.current.onStart?.(),D(ne.current).then(e=>{e&&(N.current=e,I())})},o.onend=()=>{_(!1),b(!1),j(``),L(),F.current.onEnd?.()},o.onspeechstart=()=>{b(!0)},o.onspeechend=()=>{b(!1)},o.onresult=e=>{let t=``;for(let n=e.resultIndex;n<e.results.length;n++){let r=e.results[n],i=r[0].transcript;F.current.transformTranscript&&(i=F.current.transformTranscript(i)),r.isFinal?(F.current.onResult?.(i),F.current.onTranscript?.(i,!0),j(``)):t+=i}t&&(j(t),F.current.onTranscript?.(t,!1))},o.onerror=e=>{F.current.onError?.({error:e.error,message:e.message})},o.onnomatch=()=>{F.current.onError?.({error:`no-speech`,message:t(`@astryx.chat.speechRecognition.noSpeechDetected`)})},M.current=o,o.start()},[r,n,i,a,I,L,t]),z=(0,k.useCallback)(()=>{M.current?.stop()},[]);return{isSupported:h,isListening:g,isSpeaking:y,volume:x,bands:C,rawBands:T,interimTranscript:A,start:R,stop:z,abort:(0,k.useCallback)(()=>{M.current?.abort(),L()},[L]),toggle:(0,k.useCallback)(()=>{g?z():R()},[g,R,z])}}var k,A;function j(){return(j=e((()=>{k=t(),y(),p(),f(),T(),u(w),A=null})))()}async function M(e){try{let t=await navigator.mediaDevices.getUserMedia({audio:!0}),n=e(),r=n.createMediaStreamSource(t),i=n.createAnalyser();i.fftSize=256,i.smoothingTimeConstant=.5,r.connect(i);let a=new Uint8Array(i.frequencyBinCount),o=new Float32Array(i.frequencyBinCount),s=0;function c(){i.getByteFrequencyData(a),s++;for(let e=0;e<a.length;e++){let t=a[e]/255;t>o[e]&&(o[e]=t)}}function l(e){let t=a[e]/255;return s<60?0:Math.max(0,t-o[e]*1.1)}return{calibrate:c,getVolume:()=>{i.getByteFrequencyData(a),s<60&&c();let e=0;for(let t=0;t<a.length;t++)e+=l(t);return e/a.length},getBands:e=>{i.getByteFrequencyData(a),s<60&&c();let t=[],n=[3,6,11,18,a.length],r=e<=n.length?n.slice(0,e):n,o=1;for(let e=0;e<r.length;e++){let n=r[e],i=0;for(let e=o;e<n;e++)i+=l(e);t.push(i/(n-o)),o=n}return t},getRawBands:e=>{i.getByteFrequencyData(a);let t=[],n=[3,6,11,18,a.length],r=e<=n.length?n.slice(0,e):n,o=1;for(let e=0;e<r.length;e++){let n=r[e],i=0;for(let e=o;e<n;e++)i+=a[e]/255;t.push(i/(n-o)),o=n}return t},cleanup:()=>{r.disconnect();for(let e of t.getTracks())e.stop()}}}catch{return null}}function ne(){return R&&R.state!==`closed`||(R=new AudioContext),R.state===`suspended`&&R.resume(),R}function N(e,t,n,r=.25){try{let i=n(),a=i.currentTime,o=e<200?.18:.06,s=i.createOscillator(),c=i.createGain();s.type=`sine`,s.frequency.setValueAtTime(e*1.3,a+t),s.frequency.exponentialRampToValueAtTime(e,a+t+.01),s.frequency.exponentialRampToValueAtTime(e*.93,a+t+o),c.gain.setValueAtTime(.001,a),c.gain.setValueAtTime(r,a+t),c.gain.exponentialRampToValueAtTime(r*.2,a+t+o*.12),c.gain.exponentialRampToValueAtTime(.001,a+t+o),s.connect(c),c.connect(i.destination),s.start(a+t),s.stop(a+t+o)}catch{}}function P(e){z||(N(392,0,e),N(523,.07,e))}function F(e){z||(N(523,0,e),N(392,.07,e))}function I(e={}){let{lang:t,continuous:n,interimResults:r,transformTranscript:i,onTranscript:a,onResult:o,onError:s,onStart:c,onEnd:l,hasSounds:u=!1,audioContext:d,inputRef:f}=e,p=(0,L.useCallback)(()=>d??ne(),[d]),[m,h]=(0,L.useState)(0),[g,_]=(0,L.useState)([0,0,0,0,0]),[v,y]=(0,L.useState)([0,0,0,0,0]),b=(0,L.useRef)([]),x=(0,L.useRef)(p),S=(0,L.useRef)(null),C=(0,L.useRef)(0),w=(0,L.useRef)(null),T=(0,L.useRef)({onTranscriptProp:a,onResultProp:o,onStartProp:c,onEndProp:l});ee(()=>{x.current=p,T.current={onTranscriptProp:a,onResultProp:o,onStartProp:c,onEndProp:l}});let E=(0,L.useCallback)(()=>{let e=()=>{let t=S.current;if(t){let e=t.getVolume();h(e);let n=b.current;n.push(e),n.length>30&&n.shift(),_(t.getBands(5)),y(t.getRawBands(5))}C.current=requestAnimationFrame(e)};C.current=requestAnimationFrame(e)},[]),D=(0,L.useCallback)(()=>{cancelAnimationFrame(C.current),h(0),_([0,0,0,0,0]),y([0,0,0,0,0]),b.current=[],S.current?.cleanup(),S.current=null},[]),O=(0,L.useCallback)(()=>{let e=document.activeElement;return e?.getAttribute(`contenteditable`)===`true`?e:document.querySelector(`.astryx-chat-composer-input [contenteditable="true"], [role="textbox"][contenteditable="true"]`)},[]),k=(0,L.useCallback)(()=>{let e=O();if(!e)return;let t=document.createElement(`span`);t.setAttribute(`data-astryx-dictation-interim`,``),t.contentEditable=`false`,t.style.color=`var(--color-text-disabled, #999)`,t.style.fontStyle=`italic`,t.style.opacity=`0.7`,t.style.pointerEvents=`none`,e.appendChild(t),w.current=t,e.dispatchEvent(new Event(`input`,{bubbles:!0}))},[O]),A=(0,L.useCallback)(()=>{let e=w.current;if(e?.isConnected)try{e.remove()}catch{}w.current=null},[]),j=(0,L.useCallback)(e=>{let t=e;i&&(t=i(t));let n=b.current;return(n.length>0?n.reduce((e,t)=>e+t,0)/n.length:0)>=.15&&n.length>=10&&(t=t.toUpperCase()),t},[i]);(0,L.useEffect)(()=>()=>{S.current?.cleanup(),S.current=null,cancelAnimationFrame(C.current)},[]);let N=te({lang:t,continuous:n,interimResults:r,transformTranscript:j,onTranscript:(e,t)=>{if(f){if(t){A();let t=f.current;t&&(t.focus(),t.insertText(e+` `)),T.current.onResultProp?.(e),k()}else{let t=w.current;t?t.textContent=e:(k(),w.current&&(w.current.textContent=e))}}T.current.onTranscriptProp?.(e,t)},onResult:f?void 0:o,onError:s,onStart:()=>{u&&P(x.current),M(x.current).then(e=>{e&&(S.current=e,E())}),f&&k(),T.current.onStartProp?.()},onEnd:()=>{if(D(),u&&F(x.current),f){A();let e=O();e&&e.dispatchEvent(new Event(`input`,{bubbles:!0}))}T.current.onEndProp?.()}}),I=N.abort,R=(0,L.useCallback)(()=>{I(),D()},[I,D]);return{isSupported:N.isSupported,isListening:N.isListening,isSpeaking:N.isSpeaking,interimTranscript:N.interimTranscript,volume:m,bands:g,rawBands:v,start:N.start,stop:N.stop,abort:R,toggle:N.toggle}}var L,R,z;function re(){return(re=e((()=>{L=t(),j(),p(),R=null,z=typeof navigator<`u`&&/iPad|iPhone|iPod/.test(navigator.userAgent)})))()}var ie;function ae(){return(ae=e((()=>{ie={"@astryx.chatDictationButton.startDictation":`Start dictation`,"@astryx.chatDictationButton.stopDictation":`Stop dictation`}})))()}function B({ref:e,dictation:t,size:r=`md`,isHiddenWhenUnsupported:a=!0,label:o,xstyle:l,className:u,style:f,...ee}){let p=d();if(a&&!t.isSupported)return null;let{isListening:m,bands:g,volume:v}=t,y=o??p(m?`@astryx.chatDictationButton.stopDictation`:`@astryx.chatDictationButton.startDictation`),b=g.map(e=>Math.min((e/.2)**.5,1)),x=v>=.2,S=Math.min((v-.2)/.1,1)*100,C=x?`color-mix(in srgb, ${i[`--color-accent`]}, ${i[`--color-error`]} ${S}%)`:i[`--color-accent`],{barWidth:w,barGap:T,barMaxHeight:E}=le[r];return(0,V.jsxs)(`span`,{ref:e,...s(c(`chat-dictation-button`),n(oe.wrapper,l),u,f),...ee,children:[m&&(0,V.jsx)(`span`,{"aria-hidden":!0,...s({className:`astryx10l6tqk astryx78zum5 astryx6s0dn4 astryxl56j7k astryx47corl astryx1vjfegm`},{style:{gap:T,height:E}}),children:b.slice(0,se).map((e,t)=>{let n=ce+e*.92;return(0,V.jsx)(`span`,{...s({className:`astryxjspbzw astryx1g0ag68 astryx18dpk69 astryx11bq7d0 astryx12w9bfk astryx9lcvmn`},{style:{width:w,height:`100%`,backgroundColor:C,transform:`scaleY(${n})`}})},t)})}),(0,V.jsx)(_,{label:y,"aria-label":y,variant:`ghost`,size:r,icon:m?void 0:(0,V.jsx)(h,{icon:`microphone`,size:r}),isIconOnly:!0,isDisabled:!t.isSupported,onClick:t.toggle})]})}var V,oe,se,ce,le;function ue(){return(ue=e((()=>{t(),r(),a(),g(),m(),l(),f(),ae(),V=o(),u(ie),oe={wrapper:{kVAEAm:`astryx1n2onr6`,k1xSpc:`astryx3nfvp2`,kGNEyG:`astryx6s0dn4`,kjj79g:`astryxl56j7k`,$$css:!0}},se=5,ce=.08,le={sm:{barWidth:2,barGap:1.5,barMaxHeight:14},md:{barWidth:2.5,barGap:2,barMaxHeight:18}},B.displayName=`ChatDictationButton`,B.__docgenInfo={description:`Microphone button for voice input in a chat composer.
Requires the return value of useChatDictation.

@example
\`\`\`
<ChatDictationButton dictation={dictation} />
\`\`\``,methods:[],displayName:`ChatDictationButton`,props:{xstyle:{required:!1,tsType:{name:`StyleXStyles`},description:"StyleX styles created via `stylex.create()`. Merged with the component's\nbase styles inside a single `stylex.props()` call for optimal deduplication.\n\n@example\n```\nconst overrides = stylex.create({ root: { marginBottom: 8 } });\n<Component xstyle={overrides.root} />\n```"},ref:{required:!1,tsType:{name:`ReactRef`,raw:`React.Ref<HTMLSpanElement>`,elements:[{name:`HTMLSpanElement`}]},description:``},dictation:{required:!0,tsType:{name:`UseSpeechRecognitionReturn`},description:`The return value from useChatDictation or useSpeechRecognition.`},size:{required:!1,tsType:{name:`union`,raw:`'sm' | 'md'`,elements:[{name:`literal`,value:`'sm'`},{name:`literal`,value:`'md'`}]},description:`Button size. @default "md"`,defaultValue:{value:`'md'`,computed:!1}},isHiddenWhenUnsupported:{required:!1,tsType:{name:`boolean`},description:`Hide the button when SpeechRecognition is unsupported. When false, the unsupported button remains visible but disabled. @default true`,defaultValue:{value:`true`,computed:!1}},label:{required:!1,tsType:{name:`string`},description:`Accessible label override.`}},composes:[`Omit`]}})))()}var de,H,U,W,fe,pe,me,he,G,K,q,J,Y,X,Z,Q,$,ge;function _e(){return(_e=e((()=>{ue(),S(),re(),b(),de=t(),H=o(),U={volume:0,rawBands:[0,0,0,0,0],bands:[0,0,0,0,0],isSupported:!0,isListening:!1,isSpeaking:!1,interimTranscript:``,start:()=>{},stop:()=>{},abort:()=>{},toggle:()=>{}},W={volume:.05,rawBands:[.08,.06,.04,.02,.01],bands:[.08,.06,.04,.02,.01],isSupported:!0,isListening:!0,isSpeaking:!1,interimTranscript:``,start:()=>{},stop:()=>{},abort:()=>{},toggle:()=>{}},fe={volume:.12,rawBands:[.15,.12,.08,.05,.02],bands:[.15,.12,.08,.05,.02],isSupported:!0,isListening:!0,isSpeaking:!0,interimTranscript:`hello world`,start:()=>{},stop:()=>{},abort:()=>{},toggle:()=>{}},pe={...fe,volume:.3,bands:[.2,.2,.2,.2,.2]},me={volume:0,rawBands:[0,0,0,0,0],bands:[0,0,0,0,0],isSupported:!1,isListening:!1,isSpeaking:!1,interimTranscript:``,start:()=>{},stop:()=>{},abort:()=>{},toggle:()=>{}},he={title:`Core/ChatDictationButton`,component:B,tags:[`autodocs`],parameters:{layout:`centered`},decorators:[e=>(0,H.jsx)(`div`,{style:{width:600,padding:40},children:(0,H.jsx)(e,{})})]},G={render:()=>(0,H.jsx)(B,{dictation:U})},K={render:()=>(0,H.jsx)(B,{dictation:W})},q={render:()=>(0,H.jsx)(B,{dictation:fe})},J={tags:[`visual-baseline`],render:()=>(0,H.jsx)(B,{dictation:pe})},Y={render:()=>(0,H.jsxs)(`div`,{children:[(0,H.jsx)(`p`,{style:{marginBottom:8},children:`Button is hidden when unsupported (nothing below):`}),(0,H.jsx)(B,{dictation:me})]})},X={tags:[`visual-baseline`],render:()=>(0,H.jsx)(B,{dictation:me,isHiddenWhenUnsupported:!1})},Z={render:()=>(0,H.jsx)(C,{onSubmit:e=>console.log(`Submit:`,e),sendActions:(0,H.jsx)(B,{dictation:U})})},Q={render:()=>(0,H.jsx)(C,{onSubmit:e=>console.log(`Submit:`,e),sendButton:(0,H.jsx)(B,{dictation:W})})},$={render:()=>{let e=(0,de.useRef)(null),t=I({inputRef:e,hasSounds:!0,onResult:e=>{console.log(`Final:`,e)}});return(0,H.jsxs)(`div`,{children:[(0,H.jsx)(C,{onSubmit:e=>{console.log(`Submit:`,e)},input:(0,H.jsx)(x,{handleRef:e}),sendActions:(0,H.jsx)(B,{dictation:t})}),t.isListening&&(0,H.jsxs)(`div`,{style:{marginTop:8,display:`flex`,alignItems:`center`,gap:8},children:[(0,H.jsx)(`span`,{style:{fontSize:12,opacity:.5},children:`Volume:`}),(0,H.jsx)(`div`,{style:{width:120,height:8,backgroundColor:`#eee`,borderRadius:4,overflow:`hidden`},children:(0,H.jsx)(`div`,{style:{height:`100%`,backgroundColor:t.volume>.3?`#ef4444`:`#22c55e`,borderRadius:4,transition:`width 0.08s ease-out`,width:`${Math.min(t.volume*100*2,100)}%`}})}),(0,H.jsx)(`span`,{style:{fontSize:12,fontFamily:`monospace`,opacity:.5},children:t.volume.toFixed(2)})]}),t.isListening&&(0,H.jsxs)(`div`,{style:{marginTop:12},children:[(0,H.jsx)(`div`,{style:{fontSize:12,fontWeight:600,marginBottom:4},children:`Band Debug (raw vs calibrated)`}),(0,H.jsx)(`div`,{style:{display:`flex`,gap:8,fontFamily:`monospace`,fontSize:11},children:[`170-340`,`340-860`,`860-1.7k`,`1.7-3k`,`3k+`].map((e,n)=>{let r=t.rawBands[n]??0,i=t.bands[n]??0;return(0,H.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,alignItems:`center`,gap:2,flex:1},children:[(0,H.jsxs)(`div`,{style:{display:`flex`,gap:2,alignItems:`flex-end`,height:40},children:[(0,H.jsx)(`div`,{style:{width:8,backgroundColor:`rgba(200,200,200,0.5)`,height:Math.min(r*40*5,40),borderRadius:2}}),(0,H.jsx)(`div`,{style:{width:8,backgroundColor:`#3b82f6`,height:Math.min(i*40*5,40),borderRadius:2}})]}),(0,H.jsx)(`span`,{style:{opacity:.5,fontSize:9},children:e}),(0,H.jsxs)(`span`,{style:{opacity:.4},children:[`r:`,r.toFixed(3)]}),(0,H.jsxs)(`span`,{style:{color:`#3b82f6`},children:[`c:`,i.toFixed(3)]})]},e)})}),(0,H.jsx)(`div`,{style:{fontSize:10,opacity:.4,marginTop:4},children:`Gray = raw mic, Blue = after noise floor`})]}),!t.isSupported&&(0,H.jsx)(`p`,{style:{marginTop:8,color:`red`},children:`SpeechRecognition is not supported in this browser.`})]})}},G.parameters={...G.parameters,docs:{...G.parameters?.docs,source:{originalSource:`{
  render: () => <ChatDictationButton dictation={idleDictation} />
}`,...G.parameters?.docs?.source},description:{story:`Idle state — microphone icon, ready to start dictation`,...G.parameters?.docs?.description}}},K.parameters={...K.parameters,docs:{...K.parameters?.docs,source:{originalSource:`{
  render: () => <ChatDictationButton dictation={listeningDictation} />
}`,...K.parameters?.docs?.source},description:{story:`Listening state — volume-reactive equalizer bars`,...K.parameters?.docs?.description}}},q.parameters={...q.parameters,docs:{...q.parameters?.docs,source:{originalSource:`{
  render: () => <ChatDictationButton dictation={speakingDictation} />
}`,...q.parameters?.docs?.source},description:{story:`Speaking state — stronger equalizer bars`,...q.parameters?.docs?.description}}},J.parameters={...J.parameters,docs:{...J.parameters?.docs,source:{originalSource:`{
  tags: ['visual-baseline'],
  render: () => <ChatDictationButton dictation={clippingDictation} />
}`,...J.parameters?.docs?.source},description:{story:`Clipping state — bars blend from accent toward the theme's error color`,...J.parameters?.docs?.description}}},Y.parameters={...Y.parameters,docs:{...Y.parameters?.docs,source:{originalSource:`{
  render: () => <div>
      <p style={{
      marginBottom: 8
    }}>
        Button is hidden when unsupported (nothing below):
      </p>
      <ChatDictationButton dictation={unsupportedDictation} />
    </div>
}`,...Y.parameters?.docs?.source},description:{story:`Unsupported browser — button hidden by default`,...Y.parameters?.docs?.description}}},X.parameters={...X.parameters,docs:{...X.parameters?.docs,source:{originalSource:`{
  tags: ['visual-baseline'],
  render: () => <ChatDictationButton dictation={unsupportedDictation} isHiddenWhenUnsupported={false} />
}`,...X.parameters?.docs?.source},description:{story:`Unsupported browser — button visible but disabled when explicitly retained`,...X.parameters?.docs?.description}}},Z.parameters={...Z.parameters,docs:{...Z.parameters?.docs,source:{originalSource:`{
  render: () => <ChatComposer onSubmit={value => console.log('Submit:', value)} sendActions={<ChatDictationButton dictation={idleDictation} />} />
}`,...Z.parameters?.docs?.source},description:{story:`Dictation button in sendActions slot of ChatComposer`,...Z.parameters?.docs?.description}}},Q.parameters={...Q.parameters,docs:{...Q.parameters?.docs,source:{originalSource:`{
  render: () => <ChatComposer onSubmit={value => console.log('Submit:', value)} sendButton={<ChatDictationButton dictation={listeningDictation} />} />
}`,...Q.parameters?.docs?.source},description:{story:`Dictation button replacing the send button`,...Q.parameters?.docs?.description}}},$.parameters={...$.parameters,docs:{...$.parameters?.docs,source:{originalSource:`{
  render: () => {
    const inputRef = useRef<ChatComposerInputHandle>(null);
    const dictation = useChatDictation({
      inputRef,
      hasSounds: true,
      onResult: text => {
        console.log('Final:', text);
      }
    });
    return <div>
        <ChatComposer onSubmit={v => {
        console.log('Submit:', v);
      }} input={<ChatComposerInput handleRef={inputRef} />} sendActions={<ChatDictationButton dictation={dictation} />} />
        {dictation.isListening && <div style={{
        marginTop: 8,
        display: 'flex',
        alignItems: 'center',
        gap: 8
      }}>
            <span style={{
          fontSize: 12,
          opacity: 0.5
        }}>Volume:</span>
            <div style={{
          width: 120,
          height: 8,
          backgroundColor: '#eee',
          borderRadius: 4,
          overflow: 'hidden'
        }}>
              <div style={{
            height: '100%',
            backgroundColor: dictation.volume > 0.3 ? '#ef4444' : '#22c55e',
            borderRadius: 4,
            transition: 'width 0.08s ease-out',
            width: \`\${Math.min(dictation.volume * 100 * 2, 100)}%\`
          }} />
            </div>
            <span style={{
          fontSize: 12,
          fontFamily: 'monospace',
          opacity: 0.5
        }}>
              {dictation.volume.toFixed(2)}
            </span>
          </div>}

        {dictation.isListening && <div style={{
        marginTop: 12
      }}>
            <div style={{
          fontSize: 12,
          fontWeight: 600,
          marginBottom: 4
        }}>
              Band Debug (raw vs calibrated)
            </div>
            <div style={{
          display: 'flex',
          gap: 8,
          fontFamily: 'monospace',
          fontSize: 11
        }}>
              {['170-340', '340-860', '860-1.7k', '1.7-3k', '3k+'].map((label, i) => {
            const raw = dictation.rawBands[i] ?? 0;
            const clean = dictation.bands[i] ?? 0;
            const barH = 40;
            return <div key={label} style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 2,
              flex: 1
            }}>
                      <div style={{
                display: 'flex',
                gap: 2,
                alignItems: 'flex-end',
                height: barH
              }}>
                        <div style={{
                  width: 8,
                  backgroundColor: 'rgba(200,200,200,0.5)',
                  height: Math.min(raw * barH * 5, barH),
                  borderRadius: 2
                }} />
                        <div style={{
                  width: 8,
                  backgroundColor: '#3b82f6',
                  height: Math.min(clean * barH * 5, barH),
                  borderRadius: 2
                }} />
                      </div>
                      <span style={{
                opacity: 0.5,
                fontSize: 9
              }}>{label}</span>
                      <span style={{
                opacity: 0.4
              }}>r:{raw.toFixed(3)}</span>
                      <span style={{
                color: '#3b82f6'
              }}>
                        c:{clean.toFixed(3)}
                      </span>
                    </div>;
          })}
            </div>
            <div style={{
          fontSize: 10,
          opacity: 0.4,
          marginTop: 4
        }}>
              Gray = raw mic, Blue = after noise floor
            </div>
          </div>}

        {!dictation.isSupported && <p style={{
        marginTop: 8,
        color: 'red'
      }}>
            SpeechRecognition is not supported in this browser.
          </p>}
      </div>;
  }
}`,...$.parameters?.docs?.source},description:{story:`Interactive demo with real SpeechRecognition.

Note: SpeechRecognition may not work in Storybook's iframe.
For full testing, open this story in a standalone browser tab.`,...$.parameters?.docs?.description}}},ge=[`Idle`,`Listening`,`Speaking`,`Clipping`,`Unsupported`,`UnsupportedVisible`,`InSendActions`,`AsSendButton`,`Interactive`]})))()}_e();export{Q as AsSendButton,J as Clipping,G as Idle,Z as InSendActions,$ as Interactive,K as Listening,q as Speaking,Y as Unsupported,X as UnsupportedVisible,ge as __namedExportsOrder,he as default};