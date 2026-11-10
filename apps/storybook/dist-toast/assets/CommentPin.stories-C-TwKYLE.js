import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{t}from"./react-DlPsW1c0.js";import{t as n}from"./jsx-runtime-MKhVqBIO.js";import{n as r}from"./mergeProps-DHkqklmt.js";import{i,t as a}from"./themeProps-BVy3p_gf.js";import{n as ee,t as o}from"./useMergedRefs-D6axeCXB.js";import{a as s,r as te}from"./focusOutline.stylex-DWroqGen.js";import{i as c,n as l,r as u,t as d}from"./usePressFeedback-KAUIHUDJ.js";import{n as f,t as p}from"./useTooltip-Cmp3pcbb.js";import{n as m,t as h}from"./Text-C5BHw0wv.js";import{n as g,t as ne}from"./Icon-BmO5FtDV.js";import{n as _,t as v}from"./Avatar-C6K3OBt3.js";import{n as y,t as b}from"./useDevWarning-BysULVtL.js";import{i as x,n as S,r as re,t as C}from"./AvatarGroupOverflow-CEwdVyEV.js";import{n as w,t as T}from"./HStack-D5idGciI.js";import{n as E,t as D}from"./VStack-SWtDePqc.js";import{n as O,t as k}from"./StatusDot-n1bFEYfk.js";function ie(e,t){let n=[],r=new Set;for(let i of e)if(!r.has(i.id)&&(r.add(i.id),n.push(i),n.length===t))break;return n}function ae(e){return Number.isFinite(e)&&Number.isInteger(e)&&e>=1}function oe(e){return Number.isFinite(e)&&Number.isInteger(e)&&e>=0}function A({label:e,participants:t,size:n=`sm`,threadCount:a=1,unreadCount:o=0,isSelected:s=!1,isDimmed:u=!1,isResolved:d=!1,isDisabled:p=!1,ref:m,xstyle:h,className:g,style:_,...b}){let x=n===`md`||n===`lg`?n:`sm`,S=P[x],w=ae(a),T=w?a:1,E=T>1,D=oe(o),O=(D?Math.min(o,T):0)>0,A=ie(t,E?1/0:1),L=E&&A.length>I?A.slice(0,2):A,R=A.length-L.length;y(`CommentPin`,"`participants` should contain at least one participant. Pass the lead participant for a single thread or every distinct participant for a group.",t.length===0),y(`CommentPin`,"`threadCount` must be a finite positive integer. Invalid values fall back to 1.",!w),y(`CommentPin`,"`unreadCount` must be a finite non-negative integer no greater than `threadCount`. Invalid values are ignored and larger values are capped.",!D||o>T),y(`CommentPin`,"`label` must be a non-empty accessible action name.",e.trim()===``);let z=l(),B=!p&&e.trim()!==``,V=f({placement:`above`,isEnabled:B}),H=ee(m,B?V.ref:void 0);if(d&&!s)return null;let U=L.length>0?L:[{id:`__anonymous__`,name:``,avatarSrc:void 0}],W=(0,j.jsxs)(`button`,{...b,...z,ref:H,type:`button`,"aria-label":e,"aria-pressed":s,"aria-disabled":p?`true`:void 0,onClick:e=>{p?(e.preventDefault(),e.stopPropagation()):b.onClick?.(e)},onKeyDown:e=>{p&&(e.key===`Enter`||e.key===` `)?(e.preventDefault(),e.stopPropagation()):b.onKeyDown?.(e)},...r(i(`comment-pin`,{size:x,grouped:E?`grouped`:null,unread:O?`unread`:null,selected:s?`selected`:null,dimmed:u?`dimmed`:null,resolved:d?`resolved`:null,disabled:p?`disabled`:null}),te.focusVisible(M.root,N[x],c.backgroundImage,(E||O)&&M.withCount,u&&!s&&M.dimmed,s&&M.selected,p&&M.disabled,p&&!s&&M.disabledUnselected,h),g,_),children:[(0,j.jsx)(`span`,{"aria-hidden":`true`,...{0:{className:`astryx3nfvp2 astryx6s0dn4 astryx2lah0s`},1:{className:`astryx3nfvp2 astryx6s0dn4 astryx2lah0s astryxe9ewy2`}}[!!E|0],children:E?(0,j.jsxs)(re,{size:S,children:[U.map(e=>(0,j.jsx)(v,{name:e.name,src:e.avatarSrc,tooltip:!1},e.id)),R>0?(0,j.jsx)(C,{count:R,xstyle:M.overflowCircle,children:(0,j.jsx)(ne,{icon:`moreHorizontal`,size:F[x]})}):null]}):U.map(e=>(0,j.jsx)(v,{name:e.name,src:e.avatarSrc,size:S,tooltip:!1},e.id))}),O||E?(0,j.jsxs)(`span`,{"aria-hidden":`true`,className:`astryx3nfvp2 astryx6s0dn4 astryxzye2dw astryx1nryj5t`,children:[E?(0,j.jsx)(`span`,{className:`astryx1heor9g astryxss6m8b`,children:T}):null,O?(0,j.jsx)(k,{variant:`accent`,label:``,xstyle:M.unreadDot}):null]}):null]});return(0,j.jsxs)(j.Fragment,{children:[W,B?V.renderTooltip(e):null]})}var j,M,N,P,F,I;function L(){return(L=e((()=>{_(),x(),S(),b(),o(),d(),g(),O(),p(),s(),u(),a(),j=n(),M={root:{kysU6D:`astryxjyslct`,kB7OPa:`astryx9f619`,kVAEAm:`astryx1n2onr6`,k1xSpc:`astryx3nfvp2`,kGNEyG:`astryx6s0dn4`,kjj79g:`astryxl56j7k`,kmuXW:`astryx2lah0s`,kXLuUW:`astryxxymvpz`,k3nNDw:`astryx1bd091l astryx173emx3`,kogj98:`astryx1ghz6dp`,kUOVxO:null,keTefX:null,koQZXg:null,k71WvV:null,km5ZXQ:null,kqGvvJ:null,keoZOQ:null,k1K539:null,kMzoRj:`astryx1litavf`,kjGldf:null,k2ei4v:null,kZ1KPB:null,ke9TFa:null,kWqL5O:null,kLoX6v:null,kEafiO:null,kt9PQ7:null,ksu8eU:`astryx1y0btm7`,kJRH4f:null,kVhnKS:null,k4WBpm:null,k8ry5P:null,kSWEuD:null,kDUl1X:null,kPef9Z:null,kfdmCh:null,kVAM5u:`astryx9r1u3d`,kzOINU:null,kGJrpR:null,kaZRDh:null,kBCPoo:null,k26BEO:null,k5QoK5:null,kLZC3w:null,kL6WhQ:null,kVL7Gh:`astryx6en5u8`,kqGeR4:null,kYm2EN:null,kWkggS:`astryx1prclbq`,kKwaWg:`astryx18o3ruo`,kGVxlE:`astryx14hfi27`,kMwMTN:`astryxv1l7n4`,kkrTdU:`astryx1ypdohk astryx16khyan`,kMv6JI:`astryx9ynric`,kGuDYH:`astryx141an7d`,k63SB2:`astryx2mo6ok`,kLWn49:`astryx1ltkj2j`,khDVqt:`astryxuxw1ft`,kfSwDN:`astryx87ps6o`,$$css:!0},withCount:{kjj79g:`astryx1nhvcw1`,kOIVth:`astryxzye2dw`,khm7nJ:null,k1C7PZ:null,$$css:!0},selected:{kAXs8y:`astryx1kzknox`,kSiTet:`astryx1hc1fzr`,kVAM5u:`astryx9r1u3d astryx1n2ykn`,kzOINU:null,kGJrpR:null,kaZRDh:null,kBCPoo:null,k26BEO:null,k5QoK5:null,kLZC3w:null,kL6WhQ:null,kWkggS:`astryx1prclbq astryx1jzqe4`,kGVxlE:`astryxcydmya astryxwaqzdf`,kMwMTN:`astryxv1l7n4 astryx1k5gbb1`,$$css:!0},dimmed:{kSiTet:`astryxti2d7y astryx1tbh5bv`,$$css:!0},disabled:{kkrTdU:`astryxt0e3qv`,kSiTet:`astryxyd83as astryx1tbh5bv`,$$css:!0},disabledUnselected:{kVAM5u:`astryx9r1u3d astryxmnqt3w`,kzOINU:null,kGJrpR:null,kaZRDh:null,kBCPoo:null,k26BEO:null,k5QoK5:null,kLZC3w:null,kL6WhQ:null,kMwMTN:`astryxv1l7n4 astryx1bhcspo`,$$css:!0},overflowCircle:{kg3NbH:`astryxnjsko4`,kuDDbn:null,kE3dHu:null,kP0aTx:null,kpe85a:null,$$css:!0},unreadDot:{kAXs8y:`astryx1kzknox`,kMwMTN:`astryx17wrial astryx1q73b31`,kWkggS:`astryx1ewilqj astryx438xzl`,$$css:!0}},N={sm:{k7Eaqz:`astryx1nkkqge`,kZKoxP:`astryx6k0iem`,kmVPX3:`astryx5pt662`,kg3NbH:null,kuDDbn:null,kE3dHu:null,kP0aTx:null,kpe85a:null,k8WAf4:null,kLKAdn:null,kGO01o:null,krdFHd:`astryx404ayl`,kfmiAY:`astryx1096wwc`,kIxVMA:null,ksF3WI:null,kT0f0o:`astryxjc3rfe`,kqGeR4:null,kYm2EN:null,$$css:!0},md:{k7Eaqz:`astryx17ydmr0`,kZKoxP:`astryx1ueg155`,kmVPX3:`astryxnvfkzk`,kg3NbH:null,kuDDbn:null,kE3dHu:null,kP0aTx:null,kpe85a:null,k8WAf4:null,kLKAdn:null,kGO01o:null,krdFHd:`astryx17mafka`,kfmiAY:`astryx1fefpn5`,kIxVMA:null,ksF3WI:null,kT0f0o:`astryx11o29ay`,kqGeR4:null,kYm2EN:null,$$css:!0},lg:{k7Eaqz:`astryx1je4dsv`,kZKoxP:`astryxssyfek`,kmVPX3:`astryx1fx55se`,kg3NbH:null,kuDDbn:null,kE3dHu:null,kP0aTx:null,kpe85a:null,k8WAf4:null,kLKAdn:null,kGO01o:null,krdFHd:`astryxgwm7ou`,kfmiAY:`astryx7b04l7`,kIxVMA:null,ksF3WI:null,kT0f0o:`astryx9hxrvx`,kqGeR4:null,kYm2EN:null,$$css:!0}},P={sm:22,md:24,lg:28},F={sm:`xsm`,md:`xsm`,lg:`sm`},I=3,A.displayName=`CommentPin`,A.__docgenInfo={description:`Avatar-first annotation anchor for one thread or a caller-defined group.

The caller owns grouping, representative selection, coordinates, collision
handling, and the content opened by activation. Absolute placement maps the
host anchor to the pin's logical bottom-start corner. The pin only owns its
compact button surface and controlled visual states. \`size\` sets its height
on the element-size scale.

@example
\`\`\`
<CommentPin
  label="Open annotation from Ada"
  participants={[{id: 'ada', name: 'Ada Lovelace'}]}
  onClick={() => openThread('thread-1')}
/>
\`\`\`

@example
\`\`\`
<CommentPin
  label="Open 6 grouped annotations from Ada, Lin, and 3 others, 2 unread"
  participants={[ada, lin, mira, noah, sam]}
  threadCount={6}
  unreadCount={2}
  isSelected
  onClick={() => openCluster('cluster-1')}
/>
\`\`\``,methods:[],displayName:`CommentPin`,props:{ref:{required:!1,tsType:{name:`ReactRef`,raw:`React.Ref<HTMLButtonElement>`,elements:[{name:`HTMLButtonElement`}]},description:`Ref forwarded to the marker button.`},label:{required:!0,tsType:{name:`string`},description:`Accessible action name and visual hover/focus tooltip.
Include grouped, unread, or resolved context when it changes the action's
meaning.`},participants:{required:!0,tsType:{name:`unknown`},description:`Ordered participants, lead first. A single marker shows the first. A
grouped marker shows distinct IDs as an AvatarGroup of at most three
circles: every participant when three or fewer are distinct, otherwise the
first two plus an ellipsis overflow circle. Pass every distinct
participant so the overflow appears only when more than three people
participate.`},size:{required:!1,tsType:{name:`union`,raw:`'sm' | 'md' | 'lg'`,elements:[{name:`literal`,value:`'sm'`},{name:`literal`,value:`'md'`},{name:`literal`,value:`'lg'`}]},description:"Pin height on the element-size scale: `sm` 28px, `md` 32px, `lg` 36px,\nwith 22px, 24px, and 28px participant circles.\n@default 'sm'",defaultValue:{value:`'sm'`,computed:!1}},threadCount:{required:!1,tsType:{name:`number`},description:`Total number of threads represented by this marker. Values above one use
the grouped presentation and show the exact total.
@default 1`,defaultValue:{value:`1`,computed:!1}},unreadCount:{required:!1,tsType:{name:`number`},description:`Number of represented threads with unread activity. When above zero, an
accent status dot appears at the end of the pin: after the thread total,
or after the participant on a single pin. Values above \`threadCount\` are
capped.
@default 0`,defaultValue:{value:`0`,computed:!1}},isSelected:{required:!1,tsType:{name:`boolean`},description:`Whether this pin is the currently selected annotation target.`,defaultValue:{value:`false`,computed:!1}},isDimmed:{required:!1,tsType:{name:`boolean`},description:`Whether another pin is selected in the host. Dims this pin without
disabling it, so it remains available to switch selection.`,defaultValue:{value:`false`,computed:!1}},isResolved:{required:!1,tsType:{name:`boolean`},description:`Whether every thread represented by this pin is resolved. A resolved pin
renders nothing unless it is selected, so resolved discussion leaves the
content while a thread the reader opened keeps its anchor.`,defaultValue:{value:`false`,computed:!1}},isDisabled:{required:!1,tsType:{name:`boolean`},description:`Whether activation is unavailable.`,defaultValue:{value:`false`,computed:!1}}},composes:[`Omit`]}})))()}function R(){let e=(0,z.useRef)(null);return(0,z.useEffect)(()=>{e.current?.focus()},[]),(0,B.jsx)(A,{ref:e,label:`Focused current annotation from Ada`,participants:[V.ada],isSelected:!0})}var z,B,V,H,U,W,G,K,q,J,Y,X,Z,Q;function $(){return($=e((()=>{z=t(),L(),m(),w(),E(),B=n(),V={ada:{id:`ada`,name:`Ada Lovelace`,avatarSrc:`https://i.pravatar.cc/80?img=47`},lin:{id:`lin`,name:`Lin Chen`,avatarSrc:`https://i.pravatar.cc/80?img=32`},mira:{id:`mira`,name:`Mira Patel`,avatarSrc:`https://i.pravatar.cc/80?img=5`},noah:{id:`noah`,name:`Noah Williams`,avatarSrc:`https://i.pravatar.cc/80?img=12`},sam:{id:`sam`,name:`Sam Rivera`,avatarSrc:`https://i.pravatar.cc/80?img=15`}},H={story:{kmVPX3:`x1bav0fz`,kg3NbH:null,kuDDbn:null,kE3dHu:null,kP0aTx:null,kpe85a:null,k8WAf4:null,kLKAdn:null,kGO01o:null,$$css:!0},row:{kGNEyG:`x6s0dn4`,kAzted:`x1gg8mnh`,$$css:!0},stateLabel:{k7Eaqz:`x1d77m7x`,$$css:!0},sizeColumn:{k7Eaqz:`x1i9suas`,$$css:!0},overMarker:{kVAEAm:`x10l6tqk`,kLqNvP:`x81iihk`,kbCHJM:null,kCIrl2:null,k87sOh:`x1moq7zp`,k3aq6I:`x105ttfm`,$$css:!0},marginMarker:{kVAEAm:`x10l6tqk`,kLqNvP:`xbudbmw`,kbCHJM:null,kCIrl2:null,k87sOh:`x25l6ei`,k3aq6I:`x105ttfm`,$$css:!0}},U=[`sm`,`md`,`lg`],W=[V.ada,V.lin,V.mira,V.noah,V.sam],G=[{name:`Single`,props:{label:`Open annotation from Ada`,participants:[V.ada]}},{name:`Grouped`,props:{label:`Open 4 grouped annotations from Ada and Lin`,participants:[V.ada,V.lin],threadCount:4}},{name:`Group overflow`,props:{label:`Open 8 grouped annotations from Ada, Lin, and 3 others`,participants:W,threadCount:8}},{name:`Unread single`,props:{label:`Open unread annotation from Mira`,participants:[V.mira],unreadCount:1}},{name:`Unread group`,props:{label:`Open 8 grouped annotations from Ada, Lin, and 3 others, 3 unread`,participants:W,threadCount:8,unreadCount:3}},{name:`Selected group`,props:{label:`Current group of 12 annotations from Ada, Lin, and 3 others`,participants:W,threadCount:12,isSelected:!0}}],K={title:`Lab/CommentPin`,component:A,tags:[`autodocs`],parameters:{layout:`centered`},args:{label:`Open annotation from Ada`,participants:[V.ada],onClick:()=>{}}},q={},J={args:{label:`Open 4 grouped annotations from Ada and Lin`,participants:[V.ada,V.lin],threadCount:4}},Y={render:()=>(0,B.jsxs)(D,{gap:3,xstyle:H.story,children:[(0,B.jsxs)(T,{gap:4,xstyle:H.row,children:[(0,B.jsx)(h,{type:`supporting`,xstyle:H.stateLabel,children:`Size`}),U.map(e=>(0,B.jsx)(h,{type:`supporting`,xstyle:H.sizeColumn,children:e},e))]}),G.map(e=>(0,B.jsxs)(T,{gap:4,xstyle:H.row,children:[(0,B.jsx)(h,{type:`supporting`,xstyle:H.stateLabel,children:e.name}),U.map(t=>(0,B.jsx)(T,{xstyle:H.sizeColumn,children:(0,B.jsx)(A,{...e.props,size:t,onClick:()=>{}})},t))]},e.name))]})},X={render:()=>(0,B.jsxs)(D,{gap:3,xstyle:H.story,children:[(0,B.jsxs)(T,{gap:4,xstyle:H.row,children:[(0,B.jsx)(h,{type:`supporting`,xstyle:H.stateLabel,children:`Single`}),(0,B.jsx)(A,{label:`Open annotation from Ada`,participants:[V.ada]})]}),(0,B.jsxs)(T,{gap:4,xstyle:H.row,children:[(0,B.jsx)(h,{type:`supporting`,xstyle:H.stateLabel,children:`Selected`}),(0,B.jsx)(A,{label:`Current annotation from Ada`,participants:[V.ada],isSelected:!0})]}),(0,B.jsxs)(T,{gap:4,xstyle:H.row,children:[(0,B.jsx)(h,{type:`supporting`,xstyle:H.stateLabel,children:`Selected + focus`}),(0,B.jsx)(R,{})]}),(0,B.jsxs)(T,{gap:4,xstyle:H.row,children:[(0,B.jsx)(h,{type:`supporting`,xstyle:H.stateLabel,children:`Other pin dimmed`}),(0,B.jsx)(A,{label:`Open another annotation from Mira`,participants:[V.mira],isDimmed:!0})]}),(0,B.jsxs)(T,{gap:4,xstyle:H.row,children:[(0,B.jsx)(h,{type:`supporting`,xstyle:H.stateLabel,children:`Grouped`}),(0,B.jsx)(A,{label:`Open 4 grouped annotations from Ada and Lin`,participants:[V.ada,V.lin],threadCount:4})]}),(0,B.jsxs)(T,{gap:4,xstyle:H.row,children:[(0,B.jsx)(h,{type:`supporting`,xstyle:H.stateLabel,children:`Selected group`}),(0,B.jsx)(A,{label:`Current group of 12 annotations from Ada, Lin, and Mira`,participants:[V.ada,V.lin,V.mira],threadCount:12,isSelected:!0})]}),(0,B.jsxs)(T,{gap:4,xstyle:H.row,children:[(0,B.jsx)(h,{type:`supporting`,xstyle:H.stateLabel,children:`Group overflow`}),(0,B.jsx)(A,{label:`Open 8 grouped annotations from Ada, Lin, and 3 others`,participants:[V.ada,V.lin,V.mira,V.noah,V.sam],threadCount:8})]}),(0,B.jsxs)(T,{gap:4,xstyle:H.row,children:[(0,B.jsx)(h,{type:`supporting`,xstyle:H.stateLabel,children:`Unread single`}),(0,B.jsx)(A,{label:`Open unread annotation from Mira`,participants:[V.mira],unreadCount:1})]}),(0,B.jsxs)(T,{gap:4,xstyle:H.row,children:[(0,B.jsx)(h,{type:`supporting`,xstyle:H.stateLabel,children:`Unread group`}),(0,B.jsx)(A,{label:`Open 8 grouped annotations from Ada, Lin, and 3 others, 3 unread`,participants:[V.ada,V.lin,V.mira,V.noah,V.sam],threadCount:8,unreadCount:3})]}),(0,B.jsxs)(T,{gap:4,xstyle:H.row,children:[(0,B.jsx)(h,{type:`supporting`,xstyle:H.stateLabel,children:`Resolved, selected`}),(0,B.jsx)(A,{label:`Current resolved annotation from Mira`,participants:[V.mira],isResolved:!0,isSelected:!0})]}),(0,B.jsxs)(T,{gap:4,xstyle:H.row,children:[(0,B.jsx)(h,{type:`supporting`,xstyle:H.stateLabel,children:`Disabled / pending`}),(0,B.jsx)(A,{label:`Pending annotation from Ada`,participants:[V.ada],isSelected:!0,isDisabled:!0})]})]})},Z={render:function(){let[e,t]=(0,z.useState)(`content`),n=e=>t(t=>t===e?null:e);return(0,B.jsxs)(`div`,{className:`x1n2onr6 xr6pica x1vd4hg5 xb3r6kr x1hviunn x10xzikg x14hfi27`,children:[(0,B.jsx)(`img`,{src:`https://images.unsplash.com/photo-1558655146-d09347e92766?w=1040&h=600&fit=crop&auto=format`,alt:`Design materials arranged on a desk`,className:`x1lliihq xh8yej3 x5yr21d xl1xv1r`}),(0,B.jsx)(A,{label:`Open 4 grouped annotations over the image`,participants:[V.ada,V.lin],threadCount:4,isSelected:e===`content`,isDimmed:e!=null&&e!==`content`,onClick:()=>n(`content`),xstyle:H.overMarker}),(0,B.jsx)(`div`,{className:`x10l6tqk x10no89f xtijo5x xni59qk xwmxj5m xpilrb4 x1t7ytsu x1j92z86`,children:(0,B.jsx)(A,{label:`Open margin annotation from Mira`,participants:[V.mira],isSelected:e===`margin`,isDimmed:e!=null&&e!==`margin`,onClick:()=>n(`margin`),xstyle:H.marginMarker})})]})}},q.parameters={...q.parameters,docs:{...q.parameters?.docs,source:{originalSource:`{}`,...q.parameters?.docs?.source}}},J.parameters={...J.parameters,docs:{...J.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Open 4 grouped annotations from Ada and Lin',
    participants: [PEOPLE.ada, PEOPLE.lin],
    threadCount: 4
  }
}`,...J.parameters?.docs?.source}}},Y.parameters={...Y.parameters,docs:{...Y.parameters?.docs,source:{originalSource:`{
  render: () => <VStack gap={3} xstyle={styles.story}>
      <HStack gap={4} xstyle={styles.row}>
        <Text type="supporting" xstyle={styles.stateLabel}>
          Size
        </Text>
        {SIZES.map(size => <Text key={size} type="supporting" xstyle={styles.sizeColumn}>
            {size}
          </Text>)}
      </HStack>
      {SIZE_ROWS.map(row => <HStack key={row.name} gap={4} xstyle={styles.row}>
          <Text type="supporting" xstyle={styles.stateLabel}>
            {row.name}
          </Text>
          {SIZES.map(size => <HStack key={size} xstyle={styles.sizeColumn}>
              <CommentPin {...row.props} size={size} onClick={() => {}} />
            </HStack>)}
        </HStack>)}
    </VStack>
}`,...Y.parameters?.docs?.source}}},X.parameters={...X.parameters,docs:{...X.parameters?.docs,source:{originalSource:`{
  render: () => <VStack gap={3} xstyle={styles.story}>
      <HStack gap={4} xstyle={styles.row}>
        <Text type="supporting" xstyle={styles.stateLabel}>
          Single
        </Text>
        <CommentPin label="Open annotation from Ada" participants={[PEOPLE.ada]} />
      </HStack>
      <HStack gap={4} xstyle={styles.row}>
        <Text type="supporting" xstyle={styles.stateLabel}>
          Selected
        </Text>
        <CommentPin label="Current annotation from Ada" participants={[PEOPLE.ada]} isSelected />
      </HStack>
      <HStack gap={4} xstyle={styles.row}>
        <Text type="supporting" xstyle={styles.stateLabel}>
          Selected + focus
        </Text>
        <FocusedSelectedPin />
      </HStack>
      <HStack gap={4} xstyle={styles.row}>
        <Text type="supporting" xstyle={styles.stateLabel}>
          Other pin dimmed
        </Text>
        <CommentPin label="Open another annotation from Mira" participants={[PEOPLE.mira]} isDimmed />
      </HStack>
      <HStack gap={4} xstyle={styles.row}>
        <Text type="supporting" xstyle={styles.stateLabel}>
          Grouped
        </Text>
        <CommentPin label="Open 4 grouped annotations from Ada and Lin" participants={[PEOPLE.ada, PEOPLE.lin]} threadCount={4} />
      </HStack>
      <HStack gap={4} xstyle={styles.row}>
        <Text type="supporting" xstyle={styles.stateLabel}>
          Selected group
        </Text>
        <CommentPin label="Current group of 12 annotations from Ada, Lin, and Mira" participants={[PEOPLE.ada, PEOPLE.lin, PEOPLE.mira]} threadCount={12} isSelected />
      </HStack>
      <HStack gap={4} xstyle={styles.row}>
        <Text type="supporting" xstyle={styles.stateLabel}>
          Group overflow
        </Text>
        <CommentPin label="Open 8 grouped annotations from Ada, Lin, and 3 others" participants={[PEOPLE.ada, PEOPLE.lin, PEOPLE.mira, PEOPLE.noah, PEOPLE.sam]} threadCount={8} />
      </HStack>
      <HStack gap={4} xstyle={styles.row}>
        <Text type="supporting" xstyle={styles.stateLabel}>
          Unread single
        </Text>
        <CommentPin label="Open unread annotation from Mira" participants={[PEOPLE.mira]} unreadCount={1} />
      </HStack>
      <HStack gap={4} xstyle={styles.row}>
        <Text type="supporting" xstyle={styles.stateLabel}>
          Unread group
        </Text>
        <CommentPin label="Open 8 grouped annotations from Ada, Lin, and 3 others, 3 unread" participants={[PEOPLE.ada, PEOPLE.lin, PEOPLE.mira, PEOPLE.noah, PEOPLE.sam]} threadCount={8} unreadCount={3} />
      </HStack>
      <HStack gap={4} xstyle={styles.row}>
        <Text type="supporting" xstyle={styles.stateLabel}>
          Resolved, selected
        </Text>
        {/* An unselected resolved pin renders nothing. */}
        <CommentPin label="Current resolved annotation from Mira" participants={[PEOPLE.mira]} isResolved isSelected />
      </HStack>
      <HStack gap={4} xstyle={styles.row}>
        <Text type="supporting" xstyle={styles.stateLabel}>
          Disabled / pending
        </Text>
        <CommentPin label="Pending annotation from Ada" participants={[PEOPLE.ada]} isSelected isDisabled />
      </HStack>
    </VStack>
}`,...X.parameters?.docs?.source}}},Z.parameters={...Z.parameters,docs:{...Z.parameters?.docs,source:{originalSource:`{
  render: function PlacementStory() {
    const [selected, setSelected] = useState<'content' | 'margin' | null>('content');
    // aria-pressed toggle semantics: activating the selected pin clears it.
    const toggle = (id: 'content' | 'margin') => setSelected(current => current === id ? null : id);
    return <div {...stylex.props(styles.canvas)}>
        <img src="https://images.unsplash.com/photo-1558655146-d09347e92766?w=1040&h=600&fit=crop&auto=format" alt="Design materials arranged on a desk" {...stylex.props(styles.photo)} />
        <CommentPin label="Open 4 grouped annotations over the image" participants={[PEOPLE.ada, PEOPLE.lin]} threadCount={4} isSelected={selected === 'content'} isDimmed={selected != null && selected !== 'content'} onClick={() => toggle('content')} xstyle={styles.overMarker} />
        <div {...stylex.props(styles.margin)}>
          <CommentPin label="Open margin annotation from Mira" participants={[PEOPLE.mira]} isSelected={selected === 'margin'} isDimmed={selected != null && selected !== 'margin'} onClick={() => toggle('margin')} xstyle={styles.marginMarker} />
        </div>
      </div>;
  }
}`,...Z.parameters?.docs?.source}}},Q=[`Default`,`Grouped`,`Sizes`,`StateMatrix`,`OverContentAndInMargin`]})))()}$();export{q as Default,J as Grouped,Z as OverContentAndInMargin,Y as Sizes,X as StateMatrix,Q as __namedExportsOrder,K as default};