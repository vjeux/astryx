import{a as e,n as t}from"./rolldown-runtime-sJBDdmOt.js";import{t as n}from"./react-DlPsW1c0.js";import{n as r,t as i}from"./stylex-BSlGVhGe.js";import{t as a}from"./jsx-runtime-MKhVqBIO.js";import{n as o,r as s}from"./layerScopedContext-CqwdhY_A.js";import{n as c}from"./mergeProps-DHkqklmt.js";import{n as l}from"./isRenderable-C2vVZKI4.js";import{i as u,t as d}from"./themeProps-BVy3p_gf.js";import{o as f}from"./InternationalizationContext-C5wQA9mp.js";import{n as p,t as m}from"./useComponentTranslator-Dzvlp8mx.js";import{n as h,t as g}from"./Icon-BmO5FtDV.js";import{n as _,t as v}from"./Token-DiYqRCxg.js";import{n as y,t as b}from"./InformationCircleIcon-BRrNYjOn.js";var x;function S(){return(S=t((()=>{s(),x=o(`MetadataListContext`,1,null),x.displayName=`MetadataListContext`})))()}var C;function w(){return(w=t((()=>{C={"@astryx.metadataList.showLess":`Show less`,"@astryx.metadataList.showMore":`Show more`}})))()}function T({children:e,columns:t=`single`,label:n,maxNumOfItems:i,orientation:a=`vertical`,title:o,xstyle:s,className:d,style:f,"data-testid":m,ref:h,...g}){let _=t===`multi`||typeof t==`number`&&t>1?k:te,v=(0,E.useMemo)(()=>({...n,position:n?.position??_.position}),[n,_]),[y,b]=(0,E.useState)(!1),S=(0,E.useId)(),C=p(),w=(0,E.useMemo)(()=>({labelConfig:a===`horizontal`?k:v,orientation:a}),[v,a]),T=E.Children.toArray(e),A=a===`horizontal`,j=A?void 0:i,M=j!=null&&T.length>j,N=M&&!y?T.slice(0,j):T,P=l(o)?(0,D.jsx)(`div`,{className:`astryxep27e5`,children:o}):null,F=()=>A?O.horizontal:v.position===`top`?t===`single`||t===1?O.gridStackedSingle:O.gridStackedMulti:t===`single`||t===1?O.gridSingle:O.gridMulti,I=(()=>{if(A)return null;let e=v.position===`top`;return typeof t==`number`&&t>1?e?`repeat(${t}, 1fr)`:`repeat(${t}, auto minmax(0, 1fr))`:!e&&v.width!=null?`${typeof v.width==`number`?`${v.width}px`:v.width} minmax(0, 1fr)`:null})();return(0,D.jsx)(x,{value:w,children:(0,D.jsxs)(`div`,{...g,ref:h,"data-testid":m,...c(u(`metadata-list`,{columns:String(t),orientation:a}),r(O.root,s),d,f),children:[P,(0,D.jsx)(`dl`,{id:S,...r(O.dl,F(),I!=null&&ee.gridTemplate(I)),children:N}),M&&(0,D.jsx)(`button`,{type:`button`,"aria-controls":S,"aria-expanded":y,onClick:()=>b(e=>!e),className:`astryxjyslct astryxjbqb8w astryxc342km astryxng3xce astryx15nmkw0 astryx1ypdohk astryx16khyan astryxjse4m1 astryxjm74w1 astryxw6l6zx astryx1e4wzip astryxjb2p0i astryx1yc453h astryxqcrz7y`,children:C(y?`@astryx.metadataList.showLess`:`@astryx.metadataList.showMore`)})]})})}var E,D,O,ee,te,k;function A(){return(A=t((()=>{E=n(),i(),S(),d(),m(),w(),D=a(),f(C),O={root:{k1xSpc:`astryx78zum5`,kXwgrk:`astryxdt5ytf`,$$css:!0},dl:{kogj98:`astryx1ghz6dp`,kmVPX3:`astryx1717udv`,$$css:!0},gridSingle:{k1xSpc:`astryxrvj5dj`,kumcoG:`astryx1rkzygb`,kOIVth:`astryxpec5dj`,khm7nJ:null,k1C7PZ:null,kGNEyG:`astryx1pha0wt`,$$css:!0},gridMulti:{k1xSpc:`astryxrvj5dj`,kumcoG:`astryx189bvgu`,kOIVth:`astryx18g69wz`,khm7nJ:null,k1C7PZ:null,$$css:!0},gridStackedSingle:{k1xSpc:`astryxrvj5dj`,kumcoG:`astryx1y6fwsi`,kOIVth:`astryxjcht0a`,khm7nJ:null,k1C7PZ:null,$$css:!0},gridStackedMulti:{k1xSpc:`astryxrvj5dj`,kumcoG:`astryx189bvgu`,kOIVth:`astryx18g69wz`,khm7nJ:null,k1C7PZ:null,$$css:!0},horizontal:{k1xSpc:`astryx78zum5`,kXwgrk:`astryx1q0g3np`,kwnvtZ:`astryx1a02dak`,kOIVth:`astryx18g69wz`,khm7nJ:null,k1C7PZ:null,$$css:!0}},ee={gridTemplate:e=>[{kumcoG:e==null?e:`astryxqketvx`,$$css:!0},{"--x-gridTemplateColumns":e??void 0}]},te={position:`start`},k={position:`top`},T.displayName=`MetadataList`,T.__docgenInfo={description:``,methods:[],displayName:`MetadataList`,props:{ref:{required:!1,tsType:{name:`ReactRef`,raw:`React.Ref<HTMLDivElement>`,elements:[{name:`HTMLDivElement`}]},description:`Ref forwarded to the root element`},children:{required:!0,tsType:{name:`ReactNode`},description:`Metadata list items. Should be MetadataListItem components.`},columns:{required:!1,tsType:{name:`union`,raw:`'multi' | 'single' | number`,elements:[{name:`literal`,value:`'multi'`},{name:`literal`,value:`'single'`},{name:`number`}]},description:`Column layout mode.
- 'single': Items in a single column
- 'multi': Auto-fill columns based on available width
- number: Fixed number of columns
@default 'single'`,defaultValue:{value:`'single'`,computed:!1}},label:{required:!1,tsType:{name:`MetadataListLabelConfig`},description:`Label display configuration.
- position: 'start' places labels to the left, 'top' stacks labels above content
- width: Custom label width (number in px or CSS string)

Defaults to \`{ position: 'top' }\` for multi-column layouts and
\`{ position: 'start' }\` for single-column layouts.`},maxNumOfItems:{required:!1,tsType:{name:`number`},description:`Maximum number of items to show before collapsing.
When set and items exceed this count, a "Show more" / "Show less"
toggle appears.`},orientation:{required:!1,tsType:{name:`union`,raw:`'vertical' | 'horizontal'`,elements:[{name:`literal`,value:`'vertical'`},{name:`literal`,value:`'horizontal'`}]},description:`Layout orientation for metadata items.
- 'vertical': Items stack vertically (default)
- 'horizontal': Items flow horizontally with flex-wrap

In horizontal mode, items display with labels stacked above content
and wrap to new lines as needed. The following props are ignored:
\`columns\`, \`label\`, \`maxNumOfItems\`.
@default 'vertical'`,defaultValue:{value:`'vertical'`,computed:!1}},title:{required:!1,tsType:{name:`ReactNode`},description:`Optional title or heading rendered above the list.`},"data-testid":{required:!1,tsType:{name:`string`},description:`Test ID for testing frameworks.`}},composes:[`Omit`]}})))()}function j({children:e,icon:t,label:n,xstyle:i,className:a,style:o,"data-testid":s,ref:d,...f}){let p=(0,M.use)(x),m=(p?.labelConfig.position??`start`)===`top`||p?.orientation===`horizontal`,h=(0,N.jsxs)(N.Fragment,{children:[l(t)&&(0,N.jsx)(`span`,{className:`astryx3nfvp2 astryx6s0dn4 astryx2lah0s astryxv1l7n4`,children:t}),n]});return m?(0,N.jsxs)(`div`,{ref:d,"data-testid":s,...c(u(`metadata-list-item`),r(P.stackedWrapper,i),a,o),...f,children:[(0,N.jsx)(`dt`,{className:`astryxv1l7n4 astryxjm74w1 astryxw6l6zx astryx1e4wzip astryx78zum5 astryx6s0dn4 astryx1txdalj astryx1ghz6dp astryx1717udv`,children:h}),(0,N.jsx)(`dd`,{className:`astryx1tgivj0 astryxjm74w1 astryxw6l6zx astryx1ghz6dp astryx1717udv astryx13faqbe`,children:e})]}):(0,N.jsxs)(N.Fragment,{children:[(0,N.jsx)(`dt`,{ref:d,"data-testid":s?`${s}-label`:void 0,...c(u(`metadata-list-item`),r(P.label,i),a,o),...f,children:h}),(0,N.jsx)(`dd`,{"data-testid":s?`${s}-value`:void 0,className:`astryx1tgivj0 astryxjm74w1 astryxw6l6zx astryx1ghz6dp astryx1717udv astryxjwf9q1 astryx13faqbe`,children:e})]})}var M,N,P;function F(){return(F=t((()=>{M=n(),i(),S(),d(),N=a(),P={label:{kMwMTN:`astryxv1l7n4`,kGuDYH:`astryxjm74w1`,kLWn49:`astryxw6l6zx`,k63SB2:`astryx1e4wzip`,k1xSpc:`astryx78zum5`,kGNEyG:`astryx6s0dn4`,kOIVth:`astryx1txdalj`,kogj98:`astryx1ghz6dp`,kmVPX3:`astryx1717udv`,kAzted:`astryxjwf9q1`,kTgw9:`astryx13faqbe`,$$css:!0},stackedWrapper:{k1xSpc:`astryx78zum5`,kXwgrk:`astryxdt5ytf`,kOIVth:`astryx1lsbc85`,$$css:!0}},j.displayName=`MetadataListItem`,j.__docgenInfo={description:`A single labeled metadata value within an MetadataList.

Renders a \`<dt>\` / \`<dd>\` pair. Layout (side-by-side or stacked) is
determined by the parent MetadataList's label configuration.

@example
\`\`\`
<MetadataListItem label="Status">Active</MetadataListItem>
<MetadataListItem label="Created" icon={<CalendarIcon />}>
  January 1, 2023
</MetadataListItem>
\`\`\``,methods:[],displayName:`MetadataListItem`,props:{xstyle:{required:!1,tsType:{name:`StyleXStyles`},description:"StyleX styles created via `stylex.create()`. Merged with the component's\nbase styles inside a single `stylex.props()` call for optimal deduplication.\n\n@example\n```\nconst overrides = stylex.create({ root: { marginBottom: 8 } });\n<Component xstyle={overrides.root} />\n```"},ref:{required:!1,tsType:{name:`ReactRef`,raw:`React.Ref<HTMLDivElement>`,elements:[{name:`HTMLDivElement`}]},description:`Ref forwarded to the root element`},children:{required:!0,tsType:{name:`ReactNode`},description:`Content value for this metadata item.`},icon:{required:!1,tsType:{name:`ReactNode`},description:`Icon rendered before the label text.`},label:{required:!0,tsType:{name:`string`},description:`Label text for this metadata item.`},"data-testid":{required:!1,tsType:{name:`string`},description:`Test ID for testing frameworks.`}},composes:[`Omit`]}})))()}function I({title:e,titleId:t,...n},r){return L.createElement(`svg`,Object.assign({xmlns:`http://www.w3.org/2000/svg`,fill:`none`,viewBox:`0 0 24 24`,strokeWidth:1.5,stroke:`currentColor`,"aria-hidden":`true`,"data-slot":`icon`,ref:r,"aria-labelledby":t},n),e?L.createElement(`title`,{id:t},e):null,L.createElement(`path`,{strokeLinecap:`round`,strokeLinejoin:`round`,d:`M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5`}))}var L,R;function z(){return(z=t((()=>{L=e(n()),R=L.forwardRef(I)})))()}function ne({title:e,titleId:t,...n},r){return B.createElement(`svg`,Object.assign({xmlns:`http://www.w3.org/2000/svg`,fill:`none`,viewBox:`0 0 24 24`,strokeWidth:1.5,stroke:`currentColor`,"aria-hidden":`true`,"data-slot":`icon`,ref:r,"aria-labelledby":t},n),e?B.createElement(`title`,{id:t},e):null,B.createElement(`path`,{strokeLinecap:`round`,strokeLinejoin:`round`,d:`M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z`}),B.createElement(`path`,{strokeLinecap:`round`,strokeLinejoin:`round`,d:`M6 6h.008v.008H6V6Z`}))}var B,V;function H(){return(H=t((()=>{B=e(n()),V=B.forwardRef(ne)})))()}var U,re,W,G,K,q,J,Y,X,Z,Q,$,ie;function ae(){return(ae=t((()=>{A(),F(),h(),_(),y(),z(),H(),U=a(),re={title:`Core/MetadataList`,component:T,tags:[`autodocs`],argTypes:{columns:{control:`select`,options:[`single`,`multi`,2,3],description:`Column layout mode`},orientation:{control:`select`,options:[`vertical`,`horizontal`],description:`Layout orientation`}}},W={render:e=>(0,U.jsxs)(T,{...e,children:[(0,U.jsx)(j,{label:`Name`,children:`MetadataList`}),(0,U.jsx)(j,{label:`Status`,children:`Active`}),(0,U.jsx)(j,{label:`Owner`,children:`Joey`})]})},G={render:e=>(0,U.jsxs)(T,{columns:`multi`,...e,children:[(0,U.jsx)(j,{label:`Name`,children:`MetadataList`}),(0,U.jsx)(j,{label:`Status`,children:`Active`}),(0,U.jsx)(j,{label:`Owner`,children:`Joey`}),(0,U.jsx)(j,{label:`Created`,children:`Jan 15, 2026`}),(0,U.jsx)(j,{label:`Tags`,children:(0,U.jsxs)(`span`,{style:{display:`flex`,gap:4},children:[(0,U.jsx)(v,{label:`component`}),(0,U.jsx)(v,{label:`astryx`})]})}),(0,U.jsx)(j,{label:`Priority`,children:`Tier 1`})]})},K={render:e=>(0,U.jsxs)(T,{title:(0,U.jsx)(`strong`,{children:`Component Details`}),columns:`multi`,...e,children:[(0,U.jsx)(j,{label:`Name`,children:`MetadataList`}),(0,U.jsx)(j,{label:`Status`,children:`Active`}),(0,U.jsx)(j,{label:`Owner`,children:`Joey`}),(0,U.jsx)(j,{label:`Created`,children:`Jan 15, 2026`})]})},q={render:e=>(0,U.jsxs)(T,{orientation:`horizontal`,...e,children:[(0,U.jsx)(j,{label:`Status`,children:`Active`}),(0,U.jsx)(j,{label:`Type`,children:`Premium`}),(0,U.jsx)(j,{label:`Owner`,children:`Joey`}),(0,U.jsx)(j,{label:`Created`,children:`Jan 15, 2026`})]})},J={render:e=>(0,U.jsxs)(T,{label:{position:`top`},...e,children:[(0,U.jsx)(j,{label:`Name`,children:`MetadataList`}),(0,U.jsx)(j,{label:`Status`,children:`Active`}),(0,U.jsx)(j,{label:`Owner`,children:`Joey`}),(0,U.jsx)(j,{label:`Tags`,children:(0,U.jsxs)(`span`,{style:{display:`flex`,gap:4},children:[(0,U.jsx)(v,{label:`component`}),(0,U.jsx)(v,{label:`astryx`})]})})]})},Y={render:e=>(0,U.jsxs)(T,{maxNumOfItems:3,...e,children:[(0,U.jsx)(j,{label:`Name`,children:`MetadataList`}),(0,U.jsx)(j,{label:`Status`,children:`Active`}),(0,U.jsx)(j,{label:`Owner`,children:`Joey`}),(0,U.jsx)(j,{label:`Created`,children:`Jan 15, 2026`}),(0,U.jsx)(j,{label:`Updated`,children:`Mar 26, 2026`}),(0,U.jsx)(j,{label:`Priority`,children:`Tier 1`})]})},X={render:e=>(0,U.jsxs)(T,{columns:2,...e,children:[(0,U.jsx)(j,{label:`Name`,children:`MetadataList`}),(0,U.jsx)(j,{label:`Status`,children:`Active`}),(0,U.jsx)(j,{label:`Owner`,children:`Joey`}),(0,U.jsx)(j,{label:`Priority`,children:`Tier 1`})]})},Z={render:e=>(0,U.jsxs)(T,{label:{width:200},...e,children:[(0,U.jsx)(j,{label:`Full Name`,children:`MetadataList Component`}),(0,U.jsx)(j,{label:`Current Status`,children:`Active`}),(0,U.jsx)(j,{label:`Primary Owner`,children:`Joey`})]})},Q={render:e=>(0,U.jsxs)(T,{columns:`multi`,label:{position:`start`},...e,children:[(0,U.jsx)(j,{label:`Name`,children:`MetadataList`}),(0,U.jsx)(j,{label:`Status`,children:`Active`}),(0,U.jsx)(j,{label:`Owner`,children:`Joey`}),(0,U.jsx)(j,{label:`Created`,children:`Jan 15, 2026`})]})},$={render:e=>(0,U.jsxs)(T,{columns:`multi`,...e,children:[(0,U.jsx)(j,{label:`Information`,icon:(0,U.jsx)(g,{icon:b,size:`sm`}),children:`Important details about this component`}),(0,U.jsx)(j,{label:`Created`,icon:(0,U.jsx)(g,{icon:R,size:`sm`}),children:`January 1, 2023`}),(0,U.jsx)(j,{label:`Tags`,icon:(0,U.jsx)(g,{icon:V,size:`sm`}),children:(0,U.jsxs)(`span`,{style:{display:`flex`,gap:4},children:[(0,U.jsx)(v,{label:`component`}),(0,U.jsx)(v,{label:`astryx`})]})})]})},W.parameters={...W.parameters,docs:{...W.parameters?.docs,source:{originalSource:`{
  render: args => <MetadataList {...args}>
      <MetadataListItem label="Name">MetadataList</MetadataListItem>
      <MetadataListItem label="Status">Active</MetadataListItem>
      <MetadataListItem label="Owner">Joey</MetadataListItem>
    </MetadataList>
}`,...W.parameters?.docs?.source}}},G.parameters={...G.parameters,docs:{...G.parameters?.docs,source:{originalSource:`{
  render: args => <MetadataList columns="multi" {...args}>
      <MetadataListItem label="Name">MetadataList</MetadataListItem>
      <MetadataListItem label="Status">Active</MetadataListItem>
      <MetadataListItem label="Owner">Joey</MetadataListItem>
      <MetadataListItem label="Created">Jan 15, 2026</MetadataListItem>
      <MetadataListItem label="Tags">
        <span style={{
        display: 'flex',
        gap: 4
      }}>
          <Token label="component" />
          <Token label="astryx" />
        </span>
      </MetadataListItem>
      <MetadataListItem label="Priority">Tier 1</MetadataListItem>
    </MetadataList>
}`,...G.parameters?.docs?.source}}},K.parameters={...K.parameters,docs:{...K.parameters?.docs,source:{originalSource:`{
  render: args => <MetadataList title={<strong>Component Details</strong>} columns="multi" {...args}>
      <MetadataListItem label="Name">MetadataList</MetadataListItem>
      <MetadataListItem label="Status">Active</MetadataListItem>
      <MetadataListItem label="Owner">Joey</MetadataListItem>
      <MetadataListItem label="Created">Jan 15, 2026</MetadataListItem>
    </MetadataList>
}`,...K.parameters?.docs?.source}}},q.parameters={...q.parameters,docs:{...q.parameters?.docs,source:{originalSource:`{
  render: args => <MetadataList orientation="horizontal" {...args}>
      <MetadataListItem label="Status">Active</MetadataListItem>
      <MetadataListItem label="Type">Premium</MetadataListItem>
      <MetadataListItem label="Owner">Joey</MetadataListItem>
      <MetadataListItem label="Created">Jan 15, 2026</MetadataListItem>
    </MetadataList>
}`,...q.parameters?.docs?.source}}},J.parameters={...J.parameters,docs:{...J.parameters?.docs,source:{originalSource:`{
  render: args => <MetadataList label={{
    position: 'top'
  }} {...args}>
      <MetadataListItem label="Name">MetadataList</MetadataListItem>
      <MetadataListItem label="Status">Active</MetadataListItem>
      <MetadataListItem label="Owner">Joey</MetadataListItem>
      <MetadataListItem label="Tags">
        <span style={{
        display: 'flex',
        gap: 4
      }}>
          <Token label="component" />
          <Token label="astryx" />
        </span>
      </MetadataListItem>
    </MetadataList>
}`,...J.parameters?.docs?.source}}},Y.parameters={...Y.parameters,docs:{...Y.parameters?.docs,source:{originalSource:`{
  render: args => <MetadataList maxNumOfItems={3} {...args}>
      <MetadataListItem label="Name">MetadataList</MetadataListItem>
      <MetadataListItem label="Status">Active</MetadataListItem>
      <MetadataListItem label="Owner">Joey</MetadataListItem>
      <MetadataListItem label="Created">Jan 15, 2026</MetadataListItem>
      <MetadataListItem label="Updated">Mar 26, 2026</MetadataListItem>
      <MetadataListItem label="Priority">Tier 1</MetadataListItem>
    </MetadataList>
}`,...Y.parameters?.docs?.source}}},X.parameters={...X.parameters,docs:{...X.parameters?.docs,source:{originalSource:`{
  render: args => <MetadataList columns={2} {...args}>
      <MetadataListItem label="Name">MetadataList</MetadataListItem>
      <MetadataListItem label="Status">Active</MetadataListItem>
      <MetadataListItem label="Owner">Joey</MetadataListItem>
      <MetadataListItem label="Priority">Tier 1</MetadataListItem>
    </MetadataList>
}`,...X.parameters?.docs?.source}}},Z.parameters={...Z.parameters,docs:{...Z.parameters?.docs,source:{originalSource:`{
  render: args => <MetadataList label={{
    width: 200
  }} {...args}>
      <MetadataListItem label="Full Name">
        MetadataList Component
      </MetadataListItem>
      <MetadataListItem label="Current Status">Active</MetadataListItem>
      <MetadataListItem label="Primary Owner">Joey</MetadataListItem>
    </MetadataList>
}`,...Z.parameters?.docs?.source}}},Q.parameters={...Q.parameters,docs:{...Q.parameters?.docs,source:{originalSource:`{
  render: args => <MetadataList columns="multi" label={{
    position: 'start'
  }} {...args}>
      <MetadataListItem label="Name">MetadataList</MetadataListItem>
      <MetadataListItem label="Status">Active</MetadataListItem>
      <MetadataListItem label="Owner">Joey</MetadataListItem>
      <MetadataListItem label="Created">Jan 15, 2026</MetadataListItem>
    </MetadataList>
}`,...Q.parameters?.docs?.source}}},$.parameters={...$.parameters,docs:{...$.parameters?.docs,source:{originalSource:`{
  render: args => <MetadataList columns="multi" {...args}>
      <MetadataListItem label="Information" icon={<Icon icon={InformationCircleIcon} size="sm" />}>
        Important details about this component
      </MetadataListItem>
      <MetadataListItem label="Created" icon={<Icon icon={CalendarIcon} size="sm" />}>
        January 1, 2023
      </MetadataListItem>
      <MetadataListItem label="Tags" icon={<Icon icon={TagIcon} size="sm" />}>
        <span style={{
        display: 'flex',
        gap: 4
      }}>
          <Token label="component" />
          <Token label="astryx" />
        </span>
      </MetadataListItem>
    </MetadataList>
}`,...$.parameters?.docs?.source}}},ie=[`Basic`,`MultiColumn`,`WithTitle`,`Horizontal`,`StackedLabelsSingleColumn`,`ShowMore`,`TwoColumns`,`CustomLabelWidth`,`MultiColumnSideLabels`,`WithIcons`]})))()}ae();export{W as Basic,Z as CustomLabelWidth,q as Horizontal,G as MultiColumn,Q as MultiColumnSideLabels,Y as ShowMore,J as StackedLabelsSingleColumn,X as TwoColumns,$ as WithIcons,K as WithTitle,ie as __namedExportsOrder,re as default};