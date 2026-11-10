import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{t}from"./react-DlPsW1c0.js";import{i as n,n as r,r as i,t as a}from"./LayoutContent-BEmJ3Yl2.js";import{t as o}from"./jsx-runtime-MKhVqBIO.js";import{n as s,t as c}from"./LayoutHeader-ewlJxePS.js";import{n as l,t as u}from"./Text-C5BHw0wv.js";import{n as d,t as f}from"./Icon-BmO5FtDV.js";import{n as p,t as m}from"./VisuallyHidden-dGudRqPh.js";import{n as h,t as g}from"./Button-DoGM0DEN.js";import{n as _,t as v}from"./Heading-YiIeUtHm.js";import{n as y,t as b}from"./useTranslator-DQK9PTld.js";import{n as x,t as ee}from"./MediaTheme-DJJQA35u.js";import{n as S,r as te}from"./DialogContext-Ds2kp7np.js";import{n as C,t as w}from"./Dialog-ohVvtWtq.js";import{n as T,t as E}from"./HStack-D5idGciI.js";import{n as D,t as O}from"./LayoutFooter-aEVnoSty.js";function ne(e,t,n){let r=(0,A.useRef)(null),i=(0,A.useCallback)(i=>{if(i==null)return;let a=null,o=[],s=()=>{for(let[e,t]of o)a?.getAttribute(e)===t&&a.removeAttribute(e);o=[]},c=()=>{let n=i.querySelector(N)??i.firstElementChild;if(n===a)return!1;if(s(),a=n,n!=null){let r=(e,t)=>{n.hasAttribute(e)||(n.setAttribute(e,t),o.push([e,t]))};e!=null&&r(`id`,e),t&&(r(`tabindex`,`-1`),r(`data-autofocus`,`dialog-title`))}return!0};c(),r.current=c;let l=new MutationObserver(()=>{c()&&n?.()});return l.observe(i,{childList:!0,subtree:!0}),()=>{l.disconnect(),r.current=null,s(),a=null}},[e,t,n]);return(0,A.useLayoutEffect)(()=>{r.current?.()&&n?.()}),i}function k({title:e,media:t,mediaMode:n,isTitleHidden:r=!1,startContent:i,maxLines:a,onOpenChange:o,hasDivider:s,xstyle:l,className:u,style:d,ref:p,...h}){let _=y(),b=te(),x=b?.isInline===!1&&!r,S=b?.titleId,C=ne(S,x,b?.syncDefaultName),w=o!=null&&(0,j.jsx)(g,{variant:`ghost`,label:_(`@astryx.dialog.close`),tooltip:_(`@astryx.dialog.close`),icon:(0,j.jsx)(f,{icon:`close`,color:`inherit`}),onClick:()=>{o(!1)},isIconOnly:!0,xstyle:M.closeButton}),T=(0,j.jsxs)(`div`,{className:`astryx78zum5 astryx6s0dn4 astryxjcht0a astryx1s1qpeq`,children:[i!=null&&(0,j.jsx)(`div`,{className:`astryx78zum5 astryx6s0dn4 astryx2lah0s`,children:i}),typeof e==`string`?(0,j.jsx)(v,{id:S,tabIndex:x?-1:void 0,"data-autofocus":x?`dialog-title`:void 0,level:2,maxLines:a,xstyle:M.titleHeading,children:e}):(0,j.jsx)(`div`,{ref:C,className:`astryxeuugli`,children:e})]});return(0,j.jsxs)(c,{ref:p,hasDivider:s,xstyle:l,className:u,style:d,...h,children:[(0,j.jsxs)(`div`,{className:`astryx1n2onr6 astryx78zum5 astryx6s0dn4 astryxl56j7k astryxojxgvx astryx1fcf3bl astryx1sa9bsh`,children:[t,w&&(0,j.jsx)(ee,{mode:n??`off`,children:w})]}),r?(0,j.jsx)(m,{as:`div`,children:T}):T]})}var A,j,M,N;function P(){return(P=e((()=>{A=t(),s(),h(),d(),_(),x(),p(),S(),b(),j=o(),M={closeButton:{kVAEAm:`astryx10l6tqk`,k87sOh:`astryxctzyg`,kt4wiu:`astryx72tfeb`,kbCHJM:null,kCIrl2:null,kY2c9j:`astryx1vjfegm`,$$css:!0},titleHeading:{k7Eaqz:`astryxeuugli`,kI3sdo:`astryx1a2a7pz`,kjBf7l:null,kInvED:null,k3XXqK:null,kMeerF:null,$$css:!0}},N=`h1, h2, h3, h4, h5, h6, [role="heading"]`,k.displayName=`DialogHeroHeader`,k.__docgenInfo={description:`Hero-style header designed specifically for Dialog — the high-emphasis
sibling of DialogHeader.

Renders a full-bleed media slot above the title for dialogs that open onto
a featured, marketing, or onboarding moment. The close button overlays the
media's top-trailing corner; set \`mediaMode\` so it composes MediaTheme and
stays legible over dark or light media. The title names the parent Dialog
via aria-labelledby. The visible title supplies the default initial focus
target after the modal opens; hidden titles and inline previews skip it.

Uses LayoutHeader internally, so it drops into Layout's \`header\` slot the
same way DialogHeader does.

@example
\`\`\`
<Dialog isOpen={isOpen} onOpenChange={open => setIsOpen(open)}>
  <Layout
    header={
      <DialogHeroHeader
        title="Welcome aboard"
        media={<img src={hero} alt="" width="100%" />}
        mediaMode="dark"
        onOpenChange={open => setIsOpen(open)}
      />
    }
    content={<LayoutContent>Content</LayoutContent>}
    footer={<LayoutFooter hasDivider>Actions</LayoutFooter>}
  />
</Dialog>
\`\`\``,methods:[],displayName:`DialogHeroHeader`,props:{xstyle:{required:!1,tsType:{name:`StyleXStyles`},description:"StyleX styles created via `stylex.create()`. Merged with the component's\nbase styles inside a single `stylex.props()` call for optimal deduplication.\n\n@example\n```\nconst overrides = stylex.create({ root: { marginBottom: 8 } });\n<Component xstyle={overrides.root} />\n```"},ref:{required:!1,tsType:{name:`ReactRef`,raw:`React.Ref<HTMLDivElement>`,elements:[{name:`HTMLDivElement`}]},description:`Ref forwarded to the root element`},title:{required:!0,tsType:{name:`union`,raw:`string | ReactElement`,elements:[{name:`string`},{name:`ReactElement`}]},description:`The title of the dialog. A string is wrapped in a level 2 Heading
(matching DialogHeader); pass a pre-styled Heading element to customize
the heading treatment. Provides the accessible label for the parent
Dialog via aria-labelledby (unless the Dialog receives an explicit
aria-label/aria-labelledby). The visible title is the default initial
focus target after the modal opens; an explicit descendant request wins.
A custom heading receives the label and focus on its own element; if it
sets its own \`id\`, name the Dialog with \`aria-labelledby\` instead.`},media:{required:!0,tsType:{name:`ReactNode`},description:`The full-bleed visual rendered above the title (image, illustration, or
icon). Stretches to the dialog's padded edges; the close button overlays
its top-trailing corner. Size the media itself (e.g. width 100%) to fill
the slot.`},mediaMode:{required:!1,tsType:{name:`union`,raw:`'light' | 'dark'`,elements:[{name:`literal`,value:`'light'`},{name:`literal`,value:`'dark'`}]},description:`Luminance of the media surface. Composes MediaTheme under the hood so
content overlaid on the media (the close button) picks up contrast-safe
inverted tokens: 'dark' media gets light overlay content, 'light' media
gets dark overlay content. Omit to keep the ambient theme tokens.`},isTitleHidden:{required:!1,tsType:{name:`boolean`},description:`Visually hides the title row while keeping it available to screen
readers, so the dialog stays named by the title.
@default false`,defaultValue:{value:`false`,computed:!1}},startContent:{required:!1,tsType:{name:`ReactNode`},description:`Content placed before the title (e.g. an icon), inline with the heading.`},maxLines:{required:!1,tsType:{name:`number`},description:"Max lines before the title truncates with an ellipsis. Only applies when\n`title` is a string (auto-wrapped in a Heading)."},onOpenChange:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(isOpen: boolean) => unknown`,signature:{arguments:[{type:{name:`boolean`},name:`isOpen`}],return:{name:`unknown`}}},description:`Callback fired when the dialog visibility changes.
Called with \`false\` when the close button is clicked.
If not provided, no close button will be rendered.`},hasDivider:{required:!1,tsType:{name:`boolean`},description:"Adds a themed border at the bottom edge.\nDefaults to the parent Layout's `defaultHasDividers` context value."}},composes:[`Omit`]}})))()}function re(){let e=(0,ie.useId)();return(0,F.jsx)(w,{isOpen:!0,isInline:!0,onOpenChange:()=>{},children:(0,F.jsx)(i,{header:(0,F.jsx)(k,{title:`Make room for your next idea`,media:(0,F.jsxs)(`svg`,{viewBox:`0 0 480 180`,width:`100%`,height:`180`,preserveAspectRatio:`xMidYMid slice`,"aria-hidden":`true`,className:`astryx1lliihq`,children:[(0,F.jsx)(`defs`,{children:(0,F.jsxs)(`linearGradient`,{id:e,x1:`0`,y1:`0`,x2:`1`,y2:`1`,children:[(0,F.jsx)(`stop`,{offset:`0%`,stopColor:`#1c2340`}),(0,F.jsx)(`stop`,{offset:`100%`,stopColor:`#3b2d5e`})]})}),(0,F.jsx)(`rect`,{width:`480`,height:`180`,fill:`url(#${e})`}),(0,F.jsx)(`circle`,{cx:`390`,cy:`40`,r:`70`,fill:`#8ba7ff`,opacity:`0.35`}),(0,F.jsx)(`circle`,{cx:`70`,cy:`170`,r:`90`,fill:`#8ba7ff`,opacity:`0.25`}),(0,F.jsx)(`circle`,{cx:`240`,cy:`90`,r:`42`,fill:`#8ba7ff`,opacity:`0.55`})]}),mediaMode:`dark`,onOpenChange:()=>{}}),content:(0,F.jsx)(a,{children:(0,F.jsx)(u,{type:`body`,children:`Bring your notes, projects, and collaborators together in one workspace. You can make it your own as you go.`})}),footer:(0,F.jsx)(O,{children:(0,F.jsx)(g,{label:`Get started`,variant:`primary`})})})})}var ie,F;function I(){return(I=e((()=>{ie=t(),P(),h(),C(),n(),r(),D(),l(),F=o(),re.__docgenInfo={description:``,methods:[],displayName:`DialogHeroHeaderShowcase`}})))()}function L({mode:e=`dark`}){let t=(0,z.useId)(),[n,r,i]=e===`dark`?[`#1c2340`,`#3b2d5e`,`#8ba7ff`]:[`#e8ecfb`,`#f6e9f2`,`#5b74d6`];return(0,B.jsxs)(`svg`,{viewBox:`0 0 400 160`,width:`100%`,height:`160`,preserveAspectRatio:`xMidYMid slice`,"aria-hidden":`true`,className:`x1lliihq`,children:[(0,B.jsx)(`defs`,{children:(0,B.jsxs)(`linearGradient`,{id:t,x1:`0`,y1:`0`,x2:`1`,y2:`1`,children:[(0,B.jsx)(`stop`,{offset:`0%`,stopColor:n}),(0,B.jsx)(`stop`,{offset:`100%`,stopColor:r})]})}),(0,B.jsx)(`rect`,{width:`400`,height:`160`,fill:`url(#${t})`}),(0,B.jsx)(`circle`,{cx:`330`,cy:`40`,r:`52`,fill:i,opacity:`0.35`}),(0,B.jsx)(`circle`,{cx:`70`,cy:`140`,r:`70`,fill:i,opacity:`0.25`}),(0,B.jsx)(`circle`,{cx:`200`,cy:`80`,r:`34`,fill:i,opacity:`0.55`})]})}function ae(e){if(e!=null)return{"--astryx-dialog-padding":`${e}px`}}function R(e,t,n){if(Math.abs(t-n)>.5)throw Error(`${e}: expected ${n.toFixed(2)}px, received ${t.toFixed(2)}px`)}async function oe(e,t){let n=performance.now()+5e3;for(;!e();){if(performance.now()>n)throw Error(`timed out waiting until ${t}`);await new Promise(e=>requestAnimationFrame(()=>e()))}}function se(e){if(e==null)return`null`;let t=e.id===``?``:`#${e.id}`;return`<${e.tagName.toLowerCase()}${t}>`}var z,B,V,H,U,W,G,K,q,J,Y,X,Z,Q,$,ce;function le(){return(le=e((()=>{z=t(),P(),C(),n(),r(),D(),T(),h(),_(),d(),l(),I(),B=o(),V={title:`Lab/DialogHeroHeader`,component:k,tags:[`autodocs`]},H={render:()=>(0,B.jsx)(re,{})},U={render:()=>(0,B.jsx)(w,{isOpen:!0,isInline:!0,onOpenChange:()=>{},children:(0,B.jsx)(i,{header:(0,B.jsx)(k,{title:`Welcome aboard`,media:(0,B.jsx)(L,{mode:`dark`}),mediaMode:`dark`,onOpenChange:()=>{}}),content:(0,B.jsx)(a,{children:(0,B.jsx)(u,{type:`body`,children:`Set up your workspace in three quick steps. You can change any of this later in Settings.`})}),footer:(0,B.jsx)(O,{children:(0,B.jsxs)(E,{gap:2,hAlign:`end`,children:[(0,B.jsx)(g,{label:`Skip`,variant:`secondary`}),(0,B.jsx)(g,{label:`Get started`,variant:`primary`})]})})})})},W={render:()=>(0,B.jsx)(w,{isOpen:!0,isInline:!0,onOpenChange:()=>{},children:(0,B.jsx)(i,{header:(0,B.jsx)(k,{title:`New in this release`,media:(0,B.jsx)(L,{mode:`light`}),mediaMode:`light`,onOpenChange:()=>{}}),content:(0,B.jsx)(a,{children:(0,B.jsx)(u,{type:`body`,children:`Charts now support streaming data, and the command palette learned fuzzy matching.`})})})})},G={render:()=>(0,B.jsx)(w,{isOpen:!0,isInline:!0,onOpenChange:()=>{},children:(0,B.jsx)(i,{header:(0,B.jsx)(k,{title:`A launch announcement with a title long enough to need truncation in a narrow dialog`,media:(0,B.jsx)(L,{mode:`dark`}),mediaMode:`dark`,startContent:(0,B.jsx)(f,{icon:`info`,size:`sm`}),maxLines:1,onOpenChange:()=>{}}),content:(0,B.jsx)(a,{children:(0,B.jsx)(u,{type:`body`,children:`The full title stays available to screen readers and in the truncation tooltip.`})})})})},K={render:()=>(0,B.jsxs)(E,{gap:4,wrap:`wrap`,children:[(0,B.jsx)(w,{isOpen:!0,isInline:!0,onOpenChange:()=>{},width:320,children:(0,B.jsx)(i,{header:(0,B.jsx)(k,{title:`Spring theme refresh`,media:(0,B.jsx)(L,{mode:`light`}),mediaMode:`light`,isTitleHidden:!0,onOpenChange:()=>{}}),content:(0,B.jsx)(a,{children:(0,B.jsx)(u,{type:`body`,children:`The media speaks for itself; the hidden title still names the dialog.`})})})}),(0,B.jsx)(w,{isOpen:!0,isInline:!0,onOpenChange:()=>{},width:320,children:(0,B.jsx)(i,{header:(0,B.jsx)(k,{title:(0,B.jsx)(v,{level:2,type:`display-3`,children:`Big moment`}),media:(0,B.jsx)(L,{mode:`dark`}),mediaMode:`dark`,onOpenChange:()=>{}}),content:(0,B.jsx)(a,{children:(0,B.jsx)(u,{type:`body`,children:`A caller-provided Heading element renders as-is for custom treatments.`})})})})]})},q={render:function(){let[e,t]=(0,z.useState)(!1);return(0,B.jsxs)(B.Fragment,{children:[(0,B.jsx)(g,{label:`Open hero dialog`,variant:`secondary`,onClick:()=>t(!0)}),(0,B.jsx)(w,{isOpen:e,onOpenChange:t,children:(0,B.jsx)(i,{header:(0,B.jsx)(k,{title:`Welcome aboard`,media:(0,B.jsx)(L,{mode:`dark`}),mediaMode:`dark`,onOpenChange:t}),content:(0,B.jsx)(a,{children:(0,B.jsx)(u,{type:`body`,children:`Set up your workspace in three quick steps.`})}),footer:(0,B.jsx)(O,{children:(0,B.jsx)(E,{gap:2,hAlign:`end`,children:(0,B.jsx)(g,{label:`Get started`,variant:`primary`,onClick:()=>t(!1)})})})})})]})}},J={render:()=>(0,B.jsx)(w,{isOpen:!0,isInline:!0,onOpenChange:()=>{},children:(0,B.jsx)(i,{defaultHasDividers:!0,header:(0,B.jsx)(k,{title:`A new view of your workspace`,media:(0,B.jsx)(L,{})}),content:(0,B.jsx)(a,{children:(0,B.jsx)(u,{type:`body`,children:`Close controls are supplied only when needed.`})})})})},Y={render:()=>(0,B.jsx)(`div`,{dir:`rtl`,children:(0,B.jsx)(w,{isOpen:!0,isInline:!0,onOpenChange:()=>{},padding:8,children:(0,B.jsx)(i,{header:(0,B.jsx)(k,{title:`مرحبًا بك`,media:(0,B.jsx)(L,{mode:`light`}),mediaMode:`light`,startContent:(0,B.jsx)(f,{icon:`info`,size:`sm`}),onOpenChange:()=>{}}),content:(0,B.jsx)(a,{children:(0,B.jsx)(u,{type:`body`,children:`جهّز مساحة عملك في ثلاث خطوات بسيطة.`})})})})})},X=[{id:`theme-default`,dir:`ltr`},{id:`padding-0`,dir:`ltr`,padding:0},{id:`padding-2`,dir:`ltr`,padding:2},{id:`padding-8`,dir:`ltr`,padding:8},{id:`theme-override`,dir:`ltr`,themePadding:20},{id:`rtl-padding-8`,dir:`rtl`,padding:8},{id:`rtl-theme-override`,dir:`rtl`,themePadding:20}],Z={render:()=>(0,B.jsx)(`div`,{style:{display:`flex`,flexWrap:`wrap`,gap:24},children:X.map(({id:e,dir:t,padding:n,themePadding:r})=>(0,B.jsx)(`div`,{dir:t,"data-media-bleed-fixture":e,style:ae(r),children:(0,B.jsx)(w,{isOpen:!0,isInline:!0,onOpenChange:()=>{},padding:n,width:320,"data-media-bleed-surface":``,children:(0,B.jsx)(i,{header:(0,B.jsx)(k,{title:e,media:(0,B.jsx)(L,{mode:`dark`}),mediaMode:`dark`,onOpenChange:()=>{}}),content:(0,B.jsx)(a,{children:(0,B.jsx)(u,{type:`body`,children:`Media bleed fixture`})})})})},e))}),play:async({canvasElement:e})=>{await document.fonts.ready,await new Promise(e=>requestAnimationFrame(()=>requestAnimationFrame(()=>e())));let t=new Map;for(let{id:n,dir:r,themePadding:i}of X){let a=e.querySelector(`[data-media-bleed-fixture="${n}"]`),o=a?.querySelector(`[data-media-bleed-surface]`),s=a?.querySelector(`svg`)?.parentElement,c=s?.parentElement,l=a?.querySelector(`h2`);if(!o||!s||!c||!l)throw Error(`${n}: media bleed fixture did not render`);let u=o.getBoundingClientRect(),d=e=>r===`rtl`?u.right-e:e-u.left,f=e=>r===`rtl`?e-u.left:u.right-e,p=e=>r===`rtl`?e.right:e.left,m=e=>r===`rtl`?e.left:e.right,h=s.getBoundingClientRect(),g=c.getBoundingClientRect(),_=l.getBoundingClientRect(),v=getComputedStyle(c),y=d(p(g))+Number.parseFloat(v.paddingInlineStart),b=f(m(g))+Number.parseFloat(v.paddingInlineEnd),x=g.top-u.top+Number.parseFloat(v.paddingBlockStart);if(R(`${n} media inline-start`,d(p(h)),0),R(`${n} media inline-end`,f(m(h)),0),R(`${n} media block-start`,h.top-u.top,0),R(`${n} title inline-start`,d(p(_)),y),n!==`padding-0`&&(y<=0||b<=0||x<=0))throw Error(`${n}: expected nonzero header padding to cancel, received ${y}/${b}/${x}px`);i!=null&&R(`${n} theme inset`,y,i),t.set(n,y)}let n=t.get(`padding-0`)??NaN,r=t.get(`padding-2`)??NaN,i=t.get(`padding-8`)??NaN;if(R(`padding-0 inset`,n,0),!(r>n&&i>r))throw Error(`padding steps did not order the insets: 0=${n}, 2=${r}, 8=${i}`);R(`rtl padding-8 mirrors ltr`,t.get(`rtl-padding-8`)??NaN,i)}},Q=3,$={tags:[`!autodocs`],render:function(){let[e,t]=(0,z.useState)(0);return(0,z.useEffect)(()=>{if(e>=Q)return;let n=setTimeout(()=>t(e=>e+1),50);return()=>clearTimeout(n)},[e]),(0,B.jsx)(w,{isOpen:!0,onOpenChange:()=>{},children:(0,B.jsx)(i,{header:(0,B.jsx)(k,{title:(0,B.jsx)(v,{level:1,type:`display-3`,children:`Big moment`}),media:(0,B.jsx)(L,{mode:`dark`}),mediaMode:`dark`,onOpenChange:()=>{}}),content:(0,B.jsx)(a,{children:(0,B.jsx)(u,{type:`body`,children:(0,B.jsxs)(`span`,{"data-rerender-count":e,children:[`Re-renders after opening: `,e]})})})})})},play:async({canvasElement:e})=>{let t=e.ownerDocument;await oe(()=>t.querySelector(`[data-rerender-count="${Q}"]`)!=null,`the header re-rendered ${Q} times after opening`),await new Promise(e=>requestAnimationFrame(()=>requestAnimationFrame(()=>e())));let n=t.querySelector(`dialog[open] h1`);if(n==null)throw Error(`the open modal did not render the custom h1 heading`);if(t.activeElement!==n)throw Error(`focus left the custom heading after a re-render: ${se(t.activeElement)}`);let r=n.closest(`dialog`);if(n.id===``||r?.getAttribute(`aria-labelledby`)!==n.id)throw Error(`the custom heading no longer names the dialog: heading id "${n.id}", aria-labelledby "${r?.getAttribute(`aria-labelledby`)}"`)}},H.parameters={...H.parameters,docs:{...H.parameters?.docs,source:{originalSource:`{
  render: () => <DialogHeroHeaderShowcase />
}`,...H.parameters?.docs?.source},description:{story:`The same block is discoverable through the Lab integration and canary docsite.`,...H.parameters?.docs?.description}}},U.parameters={...U.parameters,docs:{...U.parameters?.docs,source:{originalSource:`{
  render: () => <Dialog isOpen isInline onOpenChange={() => {}}>
      <Layout header={<DialogHeroHeader title="Welcome aboard" media={<HeroMedia mode="dark" />} mediaMode="dark" onOpenChange={() => {}} />} content={<LayoutContent>
            <Text type="body">
              Set up your workspace in three quick steps. You can change any of
              this later in Settings.
            </Text>
          </LayoutContent>} footer={<LayoutFooter>
            <HStack gap={2} hAlign="end">
              <Button label="Skip" variant="secondary" />
              <Button label="Get started" variant="primary" />
            </HStack>
          </LayoutFooter>} />
    </Dialog>
}`,...U.parameters?.docs?.source},description:{story:`The hero header drops into Layout's header slot exactly like DialogHeader.
The media bleeds to the dialog's edges; the close button overlays its
top-trailing corner. \`mediaMode="dark"\` composes MediaTheme so the close
button stays legible over the dark artwork.`,...U.parameters?.docs?.description}}},W.parameters={...W.parameters,docs:{...W.parameters?.docs,source:{originalSource:`{
  render: () => <Dialog isOpen isInline onOpenChange={() => {}}>
      <Layout header={<DialogHeroHeader title="New in this release" media={<HeroMedia mode="light" />} mediaMode="light" onOpenChange={() => {}} />} content={<LayoutContent>
            <Text type="body">
              Charts now support streaming data, and the command palette learned
              fuzzy matching.
            </Text>
          </LayoutContent>} />
    </Dialog>
}`,...W.parameters?.docs?.source},description:{story:'Light media inverts the overlay treatment: `mediaMode="light"` gives the\nclose button dark, contrast-safe tokens.',...W.parameters?.docs?.description}}},G.parameters={...G.parameters,docs:{...G.parameters?.docs,source:{originalSource:`{
  render: () => <Dialog isOpen isInline onOpenChange={() => {}}>
      <Layout header={<DialogHeroHeader title="A launch announcement with a title long enough to need truncation in a narrow dialog" media={<HeroMedia mode="dark" />} mediaMode="dark" startContent={<Icon icon="info" size="sm" />} maxLines={1} onOpenChange={() => {}} />} content={<LayoutContent>
            <Text type="body">
              The full title stays available to screen readers and in the
              truncation tooltip.
            </Text>
          </LayoutContent>} />
    </Dialog>
}`,...G.parameters?.docs?.source},description:{story:"`startContent` renders inline before the title; `maxLines` truncates long\nauto-wrapped titles with an ellipsis.",...G.parameters?.docs?.description}}},K.parameters={...K.parameters,docs:{...K.parameters?.docs,source:{originalSource:`{
  render: () => <HStack gap={4} wrap="wrap">
      <Dialog isOpen isInline onOpenChange={() => {}} width={320}>
        <Layout header={<DialogHeroHeader title="Spring theme refresh" media={<HeroMedia mode="light" />} mediaMode="light" isTitleHidden onOpenChange={() => {}} />} content={<LayoutContent>
              <Text type="body">
                The media speaks for itself; the hidden title still names the
                dialog.
              </Text>
            </LayoutContent>} />
      </Dialog>
      <Dialog isOpen isInline onOpenChange={() => {}} width={320}>
        <Layout header={<DialogHeroHeader title={<Heading level={2} type="display-3">
                  Big moment
                </Heading>} media={<HeroMedia mode="dark" />} mediaMode="dark" onOpenChange={() => {}} />} content={<LayoutContent>
              <Text type="body">
                A caller-provided Heading element renders as-is for custom
                treatments.
              </Text>
            </LayoutContent>} />
      </Dialog>
    </HStack>
}`,...K.parameters?.docs?.source},description:{story:`When the artwork carries the message, hide the title row visually with
\`isTitleHidden\`. The title still names the dialog for screen readers.
Passing a Heading element instead of a string customizes the treatment.`,...K.parameters?.docs?.description}}},q.parameters={...q.parameters,docs:{...q.parameters?.docs,source:{originalSource:`{
  render: function ModalExample() {
    const [isOpen, setIsOpen] = useState(false);
    return <>
        <Button label="Open hero dialog" variant="secondary" onClick={() => setIsOpen(true)} />
        <Dialog isOpen={isOpen} onOpenChange={setIsOpen}>
          <Layout header={<DialogHeroHeader title="Welcome aboard" media={<HeroMedia mode="dark" />} mediaMode="dark" onOpenChange={setIsOpen} />} content={<LayoutContent>
                <Text type="body">
                  Set up your workspace in three quick steps.
                </Text>
              </LayoutContent>} footer={<LayoutFooter>
                <HStack gap={2} hAlign="end">
                  <Button label="Get started" variant="primary" onClick={() => setIsOpen(false)} />
                </HStack>
              </LayoutFooter>} />
        </Dialog>
      </>;
  }
}`,...q.parameters?.docs?.source},description:{story:`Full modal behavior: the title receives focus on open and names the dialog
via aria-labelledby; Escape and the overlaid close button both close.`,...q.parameters?.docs?.description}}},J.parameters={...J.parameters,docs:{...J.parameters?.docs,source:{originalSource:`{
  render: () => <Dialog isOpen isInline onOpenChange={() => {}}>
      <Layout defaultHasDividers header={<DialogHeroHeader title="A new view of your workspace" media={<HeroMedia />} />} content={<LayoutContent>
            <Text type="body">
              Close controls are supplied only when needed.
            </Text>
          </LayoutContent>} />
    </Dialog>
}`,...J.parameters?.docs?.source},description:{story:`Optional close controls and divider follow the surrounding Layout.`,...J.parameters?.docs?.description}}},Y.parameters={...Y.parameters,docs:{...Y.parameters?.docs,source:{originalSource:`{
  render: () => <div dir="rtl">
      <Dialog isOpen isInline onOpenChange={() => {}} padding={8}>
        <Layout header={<DialogHeroHeader title="مرحبًا بك" media={<HeroMedia mode="light" />} mediaMode="light" startContent={<Icon icon="info" size="sm" />} onOpenChange={() => {}} />} content={<LayoutContent>
              <Text type="body">جهّز مساحة عملك في ثلاث خطوات بسيطة.</Text>
            </LayoutContent>} />
      </Dialog>
    </div>
}`,...Y.parameters?.docs?.source},description:{story:`Logical positioning keeps the overlay on the trailing edge in RTL.`,...Y.parameters?.docs?.description}}},Z.parameters={...Z.parameters,docs:{...Z.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    flexWrap: 'wrap',
    gap: 24
  }}>
      {MEDIA_BLEED_FIXTURES.map(({
      id,
      dir,
      padding,
      themePadding
    }) => <div key={id} dir={dir} data-media-bleed-fixture={id} style={themePaddingStyle(themePadding)}>
          <Dialog isOpen isInline onOpenChange={() => {}} padding={padding} width={320} data-media-bleed-surface="">
            <Layout header={<DialogHeroHeader title={id} media={<HeroMedia mode="dark" />} mediaMode="dark" onOpenChange={() => {}} />} content={<LayoutContent>
                  <Text type="body">Media bleed fixture</Text>
                </LayoutContent>} />
          </Dialog>
        </div>)}
    </div>,
  play: async ({
    canvasElement
  }) => {
    await document.fonts.ready;
    await new Promise<void>(resolve => requestAnimationFrame(() => requestAnimationFrame(() => resolve())));
    const insets = new Map<string, number>();
    for (const {
      id,
      dir,
      themePadding
    } of MEDIA_BLEED_FIXTURES) {
      const fixture = canvasElement.querySelector<HTMLElement>(\`[data-media-bleed-fixture="\${id}"]\`);
      const surface = fixture?.querySelector<HTMLElement>('[data-media-bleed-surface]');
      const mediaArea = fixture?.querySelector('svg')?.parentElement;
      const headerBox = mediaArea?.parentElement;
      const title = fixture?.querySelector<HTMLElement>('h2');
      if (!surface || !mediaArea || !headerBox || !title) {
        throw new Error(\`\${id}: media bleed fixture did not render\`);
      }
      const surfaceRect = surface.getBoundingClientRect();
      const fromStart = (x: number) => dir === 'rtl' ? surfaceRect.right - x : x - surfaceRect.left;
      const fromEnd = (x: number) => dir === 'rtl' ? x - surfaceRect.left : surfaceRect.right - x;
      const startEdge = (rect: DOMRect) => dir === 'rtl' ? rect.right : rect.left;
      const endEdge = (rect: DOMRect) => dir === 'rtl' ? rect.left : rect.right;
      const mediaRect = mediaArea.getBoundingClientRect();
      const headerRect = headerBox.getBoundingClientRect();
      const titleRect = title.getBoundingClientRect();
      const headerStyle = getComputedStyle(headerBox);
      const inset = fromStart(startEdge(headerRect)) + Number.parseFloat(headerStyle.paddingInlineStart);
      const endInset = fromEnd(endEdge(headerRect)) + Number.parseFloat(headerStyle.paddingInlineEnd);
      const blockInset = headerRect.top - surfaceRect.top + Number.parseFloat(headerStyle.paddingBlockStart);

      // The media cancels exactly the padding around it on its three edges.
      assertBleedGeometry(\`\${id} media inline-start\`, fromStart(startEdge(mediaRect)), 0);
      assertBleedGeometry(\`\${id} media inline-end\`, fromEnd(endEdge(mediaRect)), 0);
      assertBleedGeometry(\`\${id} media block-start\`, mediaRect.top - surfaceRect.top, 0);
      // ...while the title keeps that padding, so the fixture is not vacuous.
      assertBleedGeometry(\`\${id} title inline-start\`, fromStart(startEdge(titleRect)), inset);
      if (id !== 'padding-0' && (inset <= 0 || endInset <= 0 || blockInset <= 0)) {
        throw new Error(\`\${id}: expected nonzero header padding to cancel, received \${inset}/\${endInset}/\${blockInset}px\`);
      }
      if (themePadding != null) {
        assertBleedGeometry(\`\${id} theme inset\`, inset, themePadding);
      }
      insets.set(id, inset);
    }

    // Padding steps must actually move the inset the media cancels.
    const zero = insets.get('padding-0') ?? Number.NaN;
    const small = insets.get('padding-2') ?? Number.NaN;
    const large = insets.get('padding-8') ?? Number.NaN;
    assertBleedGeometry('padding-0 inset', zero, 0);
    if (!(small > zero && large > small)) {
      throw new Error(\`padding steps did not order the insets: 0=\${zero}, 2=\${small}, 8=\${large}\`);
    }
    assertBleedGeometry('rtl padding-8 mirrors ltr', insets.get('rtl-padding-8') ?? Number.NaN, large);
  }
}`,...Z.parameters?.docs?.source},description:{story:`Browser geometry guard for the media's edge compensation, run in CI by
\`.github/scripts/story-play-guard.js\`. In every fixture the media area must
reach the dialog surface's inline-start, inline-end, and block-start edges
while the title stays inset by the header padding the media cancels. Edges
are measured logically, so the RTL fixtures prove the same contract with
inline-start on the right. Expected insets are read back from the rendered
DOM; only the theme override's declared value is restated.`,...Z.parameters?.docs?.description}}},$.parameters={...$.parameters,docs:{...$.parameters?.docs,source:{originalSource:`{
  tags: ['!autodocs'],
  render: function CustomHeadingFocusAfterRerenderExample() {
    const [renderCount, setRenderCount] = useState(0);
    useEffect(() => {
      if (renderCount >= CUSTOM_HEADING_RERENDERS) {
        return;
      }
      const timer = setTimeout(() => setRenderCount(count => count + 1), 50);
      return () => clearTimeout(timer);
    }, [renderCount]);
    return <Dialog isOpen onOpenChange={() => {}}>
        <Layout header={<DialogHeroHeader title={<Heading level={1} type="display-3">
                  Big moment
                </Heading>} media={<HeroMedia mode="dark" />} mediaMode="dark" onOpenChange={() => {}} />} content={<LayoutContent>
              <Text type="body">
                <span data-rerender-count={renderCount}>
                  Re-renders after opening: {renderCount}
                </span>
              </Text>
            </LayoutContent>} />
      </Dialog>;
  },
  play: async ({
    canvasElement
  }) => {
    const doc = canvasElement.ownerDocument;
    await waitForCondition(() => doc.querySelector(\`[data-rerender-count="\${CUSTOM_HEADING_RERENDERS}"]\`) != null, \`the header re-rendered \${CUSTOM_HEADING_RERENDERS} times after opening\`);
    await new Promise<void>(resolve => requestAnimationFrame(() => requestAnimationFrame(() => resolve())));
    const heading = doc.querySelector<HTMLElement>('dialog[open] h1');
    if (heading == null) {
      throw new Error('the open modal did not render the custom h1 heading');
    }
    if (doc.activeElement !== heading) {
      throw new Error(\`focus left the custom heading after a re-render: \${describeElement(doc.activeElement)}\`);
    }
    const dialog = heading.closest('dialog');
    if (heading.id === '' || dialog?.getAttribute('aria-labelledby') !== heading.id) {
      throw new Error(\`the custom heading no longer names the dialog: heading id "\${heading.id}", aria-labelledby "\${dialog?.getAttribute('aria-labelledby')}"\`);
    }
  }
}`,...$.parameters?.docs?.source},description:{story:`Regression fixture for a caller-provided heading in an open modal. The
story re-renders the header after the modal opens, and every render passes
a new \`title\` element. Focus must stay on the heading: Chromium blurs a
focused element whose tabindex is removed, so a handshake that removes and
adds its attributes on each render moves focus to the page body. The
heading must also keep naming the dialog. Kept off the docs page because
the modal opens on load.`,...$.parameters?.docs?.description}}},ce=[`Showcase`,`Basic`,`LightMedia`,`StartContentAndTruncation`,`HiddenTitleAndCustomHeading`,`Modal`,`WithoutCloseButton`,`RightToLeft`,`MediaBleedGeometry`,`CustomHeadingFocusAfterRerender`]})))()}le();export{U as Basic,$ as CustomHeadingFocusAfterRerender,K as HiddenTitleAndCustomHeading,W as LightMedia,Z as MediaBleedGeometry,q as Modal,Y as RightToLeft,H as Showcase,G as StartContentAndTruncation,J as WithoutCloseButton,ce as __namedExportsOrder,V as default};