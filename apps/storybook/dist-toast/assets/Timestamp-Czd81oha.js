const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./TimestampHoverCard-Dnz6VjmG.js","./rolldown-runtime-sJBDdmOt.js","./react-DlPsW1c0.js","./stylex-BSlGVhGe.js","./jsx-runtime-MKhVqBIO.js","./themeProps-BVy3p_gf.js","./InternationalizationContext-C5wQA9mp.js","./sharedRealm-DZMM-xS-.js","./sharedContext-BVffqy7N.js","./devWarning-DKHreuqL.js","./useComponentTranslator-Dzvlp8mx.js","./useIsomorphicLayoutEffect-CuJHR9MK.js","./VisuallyHidden-dGudRqPh.js","./IconButton-BONXg2Kw.js","./Button-DoGM0DEN.js","./tokens.stylex-uC3T-IhP.js","./layerScopedContext-CqwdhY_A.js","./mergeProps-DHkqklmt.js","./isRenderable-C2vVZKI4.js","./useMergedRefs-D6axeCXB.js","./mergeRefs-j3zlnF-6.js","./focusOutline.stylex-DWroqGen.js","./pressFeedback-COvqrdWV.js","./roles-AiHs_gi6.js","./inputStream-iJQ1PpJY.js","./themeTiming-CRCbzCs0.js","./tokenReferences-YS3WScKb.js","./coarsePointer-DlqN1CkJ.js","./pressGesture-HATs2aNi.js","./scrollView-CwpQKvpU.js","./touchPresentation-Ckv04u4m.js","./useTheme-CUotWZgR.js","./sharedResizeObserver-Cel0TOAm.js","./useMediaQuery-DGLmR0KF.js","./tokens-BZoFTPxE.js","./usePressFeedback-KAUIHUDJ.js","./useTooltip-Cmp3pcbb.js","./useTouchTrigger-V1mLZEI9.js","./gestures-Bqd4wlWz.js","./interactionModality-BrJTO3Zg.js","./selectionLock-DHirPRkJ.js","./gestureCounter-CMn711T9.js","./useClickableContainer-Ci91y5XB.js","./safeUrl-BlyUdgZD.js","./useLayer-CSf2GluV.js","./keyboardLayoutGuide-D3kWz0-d.js","./layerRoot.stylex-DMX56Faf.js","./sharedMutationObserver-B1G19sqt.js","./carryAnimations-DH4y_uOs.js","./react-dom-B2lTHb2f.js","./useLayerKeyboardClearance-sAOM2lZd.js","./timing-DZcq_K_H.js","./LayerContext-C2HE9eML.js","./useAnnounceRenderedText-D_CF9fL0.js","./useIsHydrating-BD37vgNd.js","./useLayerDismissal-wDZ9GP1_.js","./ime-B3gC5008.js","./Spinner-D_2CFi41.js","./Text-C5BHw0wv.js","./composeEventHandlers-CceNiKXL.js","./TruncationTooltip-DZHS6tMX.js","./preload-helper-2GovK0wV.js","./spinnerRotor-C0GES0bL.js","./Icon-BmO5FtDV.js","./iframe-B7UFaprG.js","./chunk-RDNWKK3U-D20INKjV.js","./chunk-7PIQR4A3-DUuI6D6u.js","./chunk-IMSF75WX-CjLAjAi6.js","./useCalendarSystem-Cje3qcBK.js","./characters-Ddschmph.js","./reducedMotion.stylex-C1EtRMcb.js","./defaultIcons-HZ-_fAMT.js","./toastHost-VmUz3fog.js","./defineSyntaxTheme-BQS7lO1m.js","./neutralTheme-BXK-s1F0.js","./iframe-Dt2n4Z-L.css","./edgeCompensation.stylex-Cak90gjc.js","./SizeContext-CD5NK1Xe.js","./InputGroupContext-R49CP0vB.js","./touchHitArea.stylex-BEr3D7is.js","./useLinkComponent-DVILVvhE.js","./press.stylex-BffiAd23.js","./useHoverCard-CRINreBn.js","./useClipboard-ByHw8FQO.js","./ComponentIcon-DdcNwyt7.js","./useIcon-C4R3CUqb.js"])))=>i.map(i=>d[i]);
import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{n as t,t as n}from"./preload-helper-2GovK0wV.js";import{t as r}from"./react-DlPsW1c0.js";import{t as i}from"./jsx-runtime-MKhVqBIO.js";import{n as a}from"./mergeProps-DHkqklmt.js";import{i as o,t as s}from"./themeProps-BVy3p_gf.js";import{n as c,t as l}from"./useMergedRefs-D6axeCXB.js";import{o as u}from"./InternationalizationContext-C5wQA9mp.js";import{i as ee}from"./devWarning-DKHreuqL.js";import{n as te,t as ne}from"./useComponentTranslator-Dzvlp8mx.js";import{c as d,d as f,f as p,i as re,ot as m,t as h,tt as g}from"./useCalendarSystem-Cje3qcBK.js";import{n as ie,t as ae}from"./Text-C5BHw0wv.js";import{n as oe,t as _}from"./useDevWarning-BysULVtL.js";import{i as se,r as v,t as ce}from"./popupTrigger-BY83XI94.js";import{n as le,t as y}from"./useLocale-BdhI3KFf.js";function b(e){return String(e).padStart(2,`0`)}function x(e,t,n){return new Intl.DateTimeFormat(t,{timeZoneName:`long`,...n===void 0?{}:{timeZone:n}}).formatToParts(e).find(e=>e.type===`timeZoneName`)?.value??``}function S(e,t,n,{timeZone:r,isTimezoneShown:i=!1,timeZoneNameStyle:a=`short`,calendar:o=`gregory`}={}){let s=r===void 0?{}:{timeZone:r},c=i?{timeZoneName:`short`}:{};switch(t){case`full`:return g(o,e,{...C,timeZoneName:a},n,r);case`date`:return g(o,e,d.date,n,r);case`date_long`:return g(o,e,d.date_long,n,r);case`date_weekday`:return g(o,e,d.date_weekday,n,r);case`date_time`:return g(o,e,{...T,...c},n,r);case`time`:return new Intl.DateTimeFormat(n,{...w,...c,...s}).format(e);case`system_date`:{let t=f(e,r);return`${t.year}-${b(t.month)}-${b(t.day)}`}case`system_date_time`:{let t=f(e,r);return`${t.year}-${b(t.month)}-${b(t.day)} ${b(t.hour)}:${b(t.minute)}:${b(t.second)}`}case`system_time`:{let t=f(e,r);return`${b(t.hour)}:${b(t.minute)}:${b(t.second)}`}case`unix_seconds`:return String(Math.floor(e.getTime()/1e3))}}var C,w,T;function E(){return(E=e((()=>{p(),m(),C={year:`numeric`,month:`long`,day:`numeric`,hour:`numeric`,minute:`2-digit`,second:`2-digit`,timeZoneName:`short`},w={hour:`numeric`,minute:`2-digit`},T={year:`numeric`,month:`short`,day:`numeric`,...w}})))()}function D(e,t,n){let r=JSON.stringify([e,t,n]),i=F.get(r);return i??(i=new Intl.RelativeTimeFormat(e,{numeric:n,style:t}),F.set(r,i)),i}function O(e,t,n,r){let i=Math.round((t.getTime()-e.getTime())/1e3),a=Math.abs(i);if(a<10||i<0&&a<=P)return D(n,r,`auto`).format(0,`second`);let o,s;a<k?(o=a,s=`second`):a<A?(o=Math.floor(a/k),s=`minute`):a<j?(o=Math.floor(a/A),s=`hour`):a<M?(o=Math.floor(a/j),s=`day`):a<N?(o=Math.floor(a/M),s=`month`):(o=Math.floor(a/N),s=`year`);let c=i<0?o:-o;return D(n,r,r===`long`&&s===`day`&&c===-1?`auto`:`always`).format(c,s)}var k,A,j,M,N,P,F;function I(){return(I=e((()=>{k=60,A=3600,j=86400,M=30*j,N=365*j,P=30,F=new Map})))()}function L(e,t=`tooltipEntries`){if(e!==void 0&&e.toLowerCase()!==B){try{new Intl.DateTimeFormat(`en-US`,{timeZone:e})}catch{let n=`${t}: ${e}`;V.has(n)||(V.add(n),`${JSON.stringify(e)}${t}`);return}return e}}function R(e){return e===void 0?B:e.toLowerCase()}function z(e,t,n){return e===`full`?!0:e===`date_time`||e===`time`?t||n:!1}function ue(e,t,n,r=`gregory`,i){let a=t.map(e=>e.timezoneID===void 0?i:L(e.timezoneID)),o=new Set(a.map(R));i!==void 0&&o.add(R(i));let s=o.size>1;return t.map((t,i)=>{let o=t.format??`full`,c=a[i];return{...t.label===void 0?{}:{label:t.label},isCopyable:t.isCopyable??!1,zoneName:x(e,n,c),value:S(e,o,n,{timeZone:c,calendar:r,isTimezoneShown:z(o,s,c!==void 0)})}})}var B,V;function H(){return(H=e((()=>{ee(),E(),B=`local`,V=new Set})))()}var U;function W(){return(W=e((()=>{U={"@astryx.timestamp.detailsLabel":`Timestamp details`}})))()}function de(e){return typeof e==`number`?new Date(e<0xe8d4a51000?e*1e3:e):new Date(e)}function fe(e){let t=Math.abs(e);return t<Z?1e3:t<Q?3e4:t<$?6e4:3e5}function G(e){return e!==`relative`&&e!==`relative_short`&&e!==`auto`}function K(e){return e===`relative`||e===`relative_short`}function q({value:e,format:t=`auto`,timezoneID:n,autoThreshold:r=pe,hasTooltip:i=!0,tooltipEntries:s,isTimezoneShown:l=!1,isLive:u=!1,type:ee=`supporting`,size:ne,color:d=`secondary`,weight:f,xstyle:p,className:m,style:h,ref:g,"data-testid":ie,..._}){let v=te(),y=le(),b=re(void 0,`Timestamp`),C=(0,J.useRef)(null),w=c(g,C),T=!G(t),E=(0,J.useSyncExternalStore)(me,he,ge),[D,k]=(0,J.useState)(null),[A,j]=(0,J.useState)(()=>T&&E?new Date:null);T&&E&&A===null&&j(new Date);let M=de(e),N=!Number.isNaN(M.getTime()),P=N?M.toISOString():``,F=T&&A===null,I=A===null?0:Math.round((A.getTime()-M.getTime())/1e3),R=F?`date_time`:t===`auto`?Math.abs(I)<=r?`relative`:`date_time`:t,z=L(n,`timezoneID`),B=N?R===`relative`?O(M,A??M,y,`long`):R===`relative_short`?O(M,A??M,y,`narrow`):G(R)?S(M,R,y,F?{timeZone:`UTC`,isTimezoneShown:!0}:{timeZone:z,isTimezoneShown:l,calendar:b}):``:``,V=N?S(M,`full`,y,{timeZone:void 0,calendar:b}):``,H=N?S(M,`full`,y,{timeZone:void 0,timeZoneNameStyle:`long`,calendar:b}):``;(0,J.useEffect)(()=>{if(!u||!N||!K(R))return;let e=fe(I),t=setInterval(()=>{j(new Date)},e);return()=>clearInterval(t)},[u,N,R,I]),oe(`Timestamp`,`could not parse value ${JSON.stringify(e)} as a date. Rendering nothing.`,!N);let U=s!==void 0&&s.length>0?s:void 0,W=N&&i&&(K(R)||U!==void 0);if(!W&&D!==null&&k(null),!N)return null;let q=U===void 0?[{value:V,zoneName:N?x(M,y):``,isCopyable:!0}]:ue(M,U,y,b,z),Z=a(o(`timestamp`,{format:R}),{className:m,style:h}),Q=(0,Y.jsx)(`time`,{ref:w,dateTime:P,"data-testid":ie,className:`astryxt0psk2 astryxjb2p0i astryx1j61x8r astryx1qlqyl8 astryx15bjb6t astryx1heor9g astryx1pd3egz`,..._,...K(R)&&H!==``&&_[`aria-label`]==null?{"aria-label":H}:{},...W&&_.tabIndex==null?{tabIndex:0}:{},...W?se(ce,{controls:_[`aria-controls`]},{id:D,isOpen:D!=null}):null,children:B});return(0,Y.jsxs)(Y.Fragment,{children:[(0,Y.jsx)(ae,{type:ee,size:ne,color:d,weight:f,xstyle:p,...Z,children:Q}),W&&(0,Y.jsx)(J.Suspense,{fallback:null,children:(0,Y.jsx)(X,{lines:q,label:v(`@astryx.timestamp.detailsLabel`),triggerRef:C,onCardOpenChange:k})})]})}var J,Y,X,Z,Q,$,pe,me,he,ge;function _e(){return(_e=e((()=>{J=r(),ie(),_(),y(),h(),s(),v(),E(),I(),H(),l(),ne(),W(),Y=i(),t(),u(U),X=(0,J.lazy)(async()=>n(()=>import(`./TimestampHoverCard-Dnz6VjmG.js`),__vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85]),import.meta.url)),Z=60,Q=3600,$=86400,pe=7*$,me=()=>()=>{},he=()=>!0,ge=()=>!1,q.displayName=`Timestamp`,q.__docgenInfo={description:`Displays a formatted timestamp as human-readable text.

Renders a semantic \`<time>\` element with an ISO 8601 \`datetime\` attribute,
styled via Text. Supports relative ("2 hours ago"), multiple absolute
formats, and auto formatting. Optionally shows a hover card with the full
absolute time (copyable) and can update live.

@example
\`\`\`
<Timestamp value="2026-02-19T17:00:00Z" />
<Timestamp value={1740000000} format="date" />
<Timestamp value={date} format="auto" isLive />
<Timestamp value={event.timestamp} format="system_date_time" />
\`\`\``,methods:[],displayName:`Timestamp`,props:{xstyle:{required:!1,tsType:{name:`StyleXStyles`},description:"StyleX styles created via `stylex.create()`. Merged with the component's\nbase styles inside a single `stylex.props()` call for optimal deduplication.\n\n@example\n```\nconst overrides = stylex.create({ root: { marginBottom: 8 } });\n<Component xstyle={overrides.root} />\n```"},ref:{required:!1,tsType:{name:`ReactRef`,raw:`React.Ref<HTMLTimeElement>`,elements:[{name:`HTMLTimeElement`}]},description:"Ref forwarded to the root `<time>` element."},value:{required:!0,tsType:{name:`union`,raw:`string | number`,elements:[{name:`string`},{name:`number`}]},description:`The date/time to display. Accepts Unix timestamps (seconds) or ISO 8601 strings.`},format:{required:!1,tsType:{name:`union`,raw:`| 'relative'
| 'relative_short'
| 'auto'
| 'date'
| 'date_long'
| 'date_weekday'
| 'date_time'
| 'time'
| 'system_date'
| 'system_date_time'
| 'system_time'
| 'unix_seconds'`,elements:[{name:`literal`,value:`'relative'`},{name:`literal`,value:`'relative_short'`},{name:`literal`,value:`'auto'`},{name:`literal`,value:`'date'`},{name:`literal`,value:`'date_long'`},{name:`literal`,value:`'date_weekday'`},{name:`literal`,value:`'date_time'`},{name:`literal`,value:`'time'`},{name:`literal`,value:`'system_date'`},{name:`literal`,value:`'system_date_time'`},{name:`literal`,value:`'system_time'`},{name:`literal`,value:`'unix_seconds'`}]},description:`Display format.
- \`'relative'\`: "2 hours ago", "yesterday", "now"
- \`'relative_short'\`: "2h ago", "1d ago", "now" in English — the
  locale's native narrow relative-time pattern, for compact,
  space-constrained surfaces
- \`'auto'\`: Relative for recent times, \`date_time\` for older
- \`'date'\`: "Mar 21, 2025"
- \`'date_long'\`: "March 21, 2025"
- \`'date_weekday'\`: "Wed, Mar 21, 2025"
- \`'date_time'\`: "Mar 21, 2025, 2:51 PM"
- \`'time'\`: "2:51 PM"
- \`'system_date'\`: "2025-03-21"
- \`'system_date_time'\`: "2025-03-21 14:51:53"
- \`'system_time'\`: "14:51:53"
- \`'unix_seconds'\`: "1742565113" — Unix time in whole seconds since the
  epoch. Absolute (zone-independent), so it ignores any tooltip time zone.
@default 'auto'`,defaultValue:{value:`'auto'`,computed:!1}},timezoneID:{required:!1,tsType:{name:`string`},description:"IANA time zone the absolute formats render in, such as `'UTC'` or\n`'America/Los_Angeles'`. Omit (or pass `'local'`) for the viewer's own\nzone. An explicit zone renders identically on the server and the client,\nso it is the way to show an absolute time without a hydration mismatch;\nwithout it the server markup depends on the server's zone. Relative\nformats name no instant, so their visible text ignores it. Configured\n`tooltipEntries` rows still follow it. An unknown identifier warns once\nin development and falls back to the viewer's zone."},autoThreshold:{required:!1,tsType:{name:`number`},description:`Threshold in seconds for 'auto' format to switch from relative to date_time.
@default 604800 (7 days)`,defaultValue:{value:`7 * DAY`,computed:!1}},hasTooltip:{required:!1,tsType:{name:`boolean`},description:`Whether to show a card with the full date/time on hover or keyboard focus. The card
is copyable — its default single row carries the full absolute time — and
\`tooltipEntries\` customizes its rows.
@default true`,defaultValue:{value:`true`,computed:!1}},tooltipEntries:{required:!1,tsType:{name:`ReadonlyArray`,elements:[{name:`TimestampTooltipEntry`}],raw:`ReadonlyArray<TimestampTooltipEntry>`},description:`Lines to show on hover, so one instant can be read — and optionally
copied — in several time zones and/or formats at once. Each entry is one
line, rendered in the order given, with an optional label.

Rows are read-only unless they set \`isCopyable\` (default \`false\`). A
copyable row shows a copy button in a dedicated trailing action column so
the buttons align across rows; that column is only present when some row
is copyable. With no entries the card shows a single default row with the
full absolute time in the viewer's own zone, which is copyable.

An entry without its own \`timezoneID\` follows the Timestamp's
\`timezoneID\` when set, else the viewer's zone; \`'local'\` always means
the viewer's zone.

Configuring entries also attaches the surface to absolute formats, which
otherwise have no hover card at all. \`hasTooltip={false}\` still suppresses
it, and an empty array is treated as no configuration.

@default undefined — a single default row with the full absolute time in
  the viewer's own time zone
@example
\`\`\`
<Timestamp
  value={savedAt}
  tooltipEntries={[
    {label: 'Your time'},
    {timezoneID: 'UTC', label: 'UTC'},
    {timezoneID: 'UTC', format: 'system_date_time', label: 'ISO', isCopyable: true},
  ]}
/>
\`\`\``},isTimezoneShown:{required:!1,tsType:{name:`boolean`},description:`Whether to append the timezone abbreviation after the timestamp text.
Applies to the date_time and time formats. The system_* formats stay
machine-readable and never carry a timezone abbreviation.

Affects the visible text only — use \`tooltipEntries\` to control the
tooltip's time zones.
@default false`,defaultValue:{value:`false`,computed:!1}},isLive:{required:!1,tsType:{name:`boolean`},description:`Whether the relative time should update live.
@default false`,defaultValue:{value:`false`,computed:!1}},type:{required:!1,tsType:{name:`union`,raw:`BuiltinTextType | (keyof CustomTextTypes & string)`,elements:[{name:`union`,raw:`| 'body'
| 'large'
| 'label'
| 'supporting'
| 'code'
| 'display-1'
| 'display-2'
| 'display-3'
| 'inherit'`,elements:[{name:`literal`,value:`'body'`},{name:`literal`,value:`'large'`},{name:`literal`,value:`'label'`},{name:`literal`,value:`'supporting'`},{name:`literal`,value:`'code'`},{name:`literal`,value:`'display-1'`},{name:`literal`,value:`'display-2'`},{name:`literal`,value:`'display-3'`},{name:`literal`,value:`'inherit'`}]},{name:`unknown`}]},description:`Semantic text type. Determines size, weight, and line-height from theme.
@default 'supporting'`,defaultValue:{value:`'supporting'`,computed:!1}},size:{required:!1,tsType:{name:`union`,raw:`| '4xs'
| '3xs'
| '2xs'
| 'xsm'
| 'sm'
| 'base'
| 'lg'
| 'xl'
| '2xl'
| '3xl'
| '4xl'`,elements:[{name:`literal`,value:`'4xs'`},{name:`literal`,value:`'3xs'`},{name:`literal`,value:`'2xs'`},{name:`literal`,value:`'xsm'`},{name:`literal`,value:`'sm'`},{name:`literal`,value:`'base'`},{name:`literal`,value:`'lg'`},{name:`literal`,value:`'xl'`},{name:`literal`,value:`'2xl'`},{name:`literal`,value:`'3xl'`},{name:`literal`,value:`'4xl'`}]},description:"Explicit font size override. Overrides the size from `type`."},color:{required:!1,tsType:{name:`TextColorMap`},description:`Text color.
@default 'secondary'`,defaultValue:{value:`'secondary'`,computed:!1}},weight:{required:!1,tsType:{name:`union`,raw:`'normal' | 'medium' | 'semibold' | 'bold'`,elements:[{name:`literal`,value:`'normal'`},{name:`literal`,value:`'medium'`},{name:`literal`,value:`'semibold'`},{name:`literal`,value:`'bold'`}]},description:`Font weight override.`},"data-testid":{required:!1,tsType:{name:`string`},description:`Test ID for testing frameworks.`}},composes:[`Omit`]}})))()}export{_e as n,q as t};