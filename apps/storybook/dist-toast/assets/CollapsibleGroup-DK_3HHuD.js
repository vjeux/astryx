import{a as e,n as t}from"./rolldown-runtime-sJBDdmOt.js";import{t as n}from"./react-DlPsW1c0.js";import{n as r,t as i}from"./stylex-BSlGVhGe.js";import{t as a}from"./jsx-runtime-MKhVqBIO.js";import{n as o}from"./mergeProps-DHkqklmt.js";import{i as s,t as c}from"./themeProps-BVy3p_gf.js";import{a as l,i as u,r as d}from"./useCollapsible-B6jpypxb.js";function f(e){return e==null?[]:Array.isArray(e)?e:[e]}function p({type:e=`single`,defaultValue:t,value:n,onChange:i,hasDividers:a=!1,density:c,chevronPosition:l,children:p,ref:_,xstyle:v,className:y,style:b,...x}){let S=n!==void 0,[C,w]=(0,m.useState)(()=>f(t)),T=(0,m.useMemo)(()=>S?f(n):C,[n,C,S]),E=(0,m.useCallback)(e=>T.includes(e),[T]),D=(0,m.useCallback)(t=>{let n;n=e===`single`?T.includes(t)?[]:[t]:T.includes(t)?T.filter(e=>e!==t):[...T,t],S||w(n),i&&i(e===`single`?n[0]??``:n)},[e,T,S,i]),O=(0,m.useMemo)(()=>({isOpen:E,toggle:D}),[E,D]),k=c??(a?`balanced`:null),A=(0,m.useMemo)(()=>({hasDividers:a,density:k,chevronPosition:l??null}),[a,k,l]),j=a?(0,h.jsx)(`div`,{ref:_,...o(s(`collapsible-group`,{density:k??void 0}),r(g.wrapper,v),y,b),...x,children:p}):p;return(0,h.jsx)(d,{value:O,children:(0,h.jsx)(u,{value:A,children:j})})}var m,h,g;function _(){return(_=t((()=>{m=e(n(),1),i(),l(),c(),h=a(),g={wrapper:{k1xSpc:`astryx78zum5`,kXwgrk:`astryxdt5ytf`,$$css:!0}},p.displayName=`CollapsibleGroup`,p.__docgenInfo={description:`Groups collapsible components with coordinated open/close behavior.
Renders no wrapper DOM unless \`hasDividers\` is set.

In "single" mode (default), opening one item closes the others.
In "multiple" mode, items toggle independently.

@compositionHint Wrap Collapsible instances to coordinate their open/close state.
Each Collapsible needs a \`value\` prop to participate. For FAQ-style lists,
use \`hasDividers\` with bare Collapsible children instead of wrapping each
item in Card.

@example
\`\`\`
<CollapsibleGroup type="single" hasDividers defaultValue="faq1">
  <Collapsible trigger="What is Astryx?" value="faq1">
    Astryx is a design system for building internal tools.
  </Collapsible>
  <Collapsible trigger="How do I start?" value="faq2">
    Install the package and import components.
  </Collapsible>
</CollapsibleGroup>
<CollapsibleGroup type="single" defaultValue="faq1">
  <VStack gap={2}>
    <Card>
      <Collapsible trigger="What is Astryx?" value="faq1">
        Astryx is a design system for building internal tools.
      </Collapsible>
    </Card>
    <Card>
      <Collapsible trigger="How do I start?" value="faq2">
        Install the package and import components.
      </Collapsible>
    </Card>
  </VStack>
</CollapsibleGroup>
\`\`\``,methods:[],displayName:`CollapsibleGroup`,props:{ref:{required:!1,tsType:{name:`ReactRef`,raw:`React.Ref<HTMLElement>`,elements:[{name:`HTMLElement`}]},description:``},type:{required:!1,tsType:{name:`union`,raw:`'single' | 'multiple'`,elements:[{name:`literal`,value:`'single'`},{name:`literal`,value:`'multiple'`}]},description:`Whether only one item can be open at a time, or multiple.
@default "single"`,defaultValue:{value:`'single'`,computed:!1}},defaultValue:{required:!1,tsType:{name:`union`,raw:`string | string[]`,elements:[{name:`string`},{name:`Array`,elements:[{name:`string`}],raw:`string[]`}]},description:`Default open item(s) — uncontrolled mode.
Use a string for single mode, string[] for multiple mode.`},value:{required:!1,tsType:{name:`union`,raw:`string | string[]`,elements:[{name:`string`},{name:`Array`,elements:[{name:`string`}],raw:`string[]`}]},description:`Controlled open item(s).
When provided, the group is fully controlled externally.`},onChange:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(value: string | string[]) => void`,signature:{arguments:[{type:{name:`union`,raw:`string | string[]`,elements:[{name:`string`},{name:`Array`,elements:[{name:`string`}],raw:`string[]`}]},name:`value`}],return:{name:`void`}}},description:`Callback when the open item(s) change.`},hasDividers:{required:!1,tsType:{name:`boolean`},description:`Whether to draw hairline dividers between the group's items — the
accordion row chrome. When set, the group renders a wrapper div (it
otherwise renders no DOM) and items get 'balanced' density unless
\`density\` says otherwise. Pair with bare Collapsible children; Card-wrapped
items provide their own separation.
@default false`,defaultValue:{value:`false`,computed:!1}},density:{required:!1,tsType:{name:`union`,raw:`'compact' | 'balanced' | 'spacious'`,elements:[{name:`literal`,value:`'compact'`},{name:`literal`,value:`'balanced'`},{name:`literal`,value:`'spacious'`}]},description:`Row density controlling trigger and content block padding on the group's
items. Defaults to 'balanced' when dividers are shown; otherwise items
keep their default unpadded look.`},chevronPosition:{required:!1,tsType:{name:`union`,raw:`'start' | 'end'`,elements:[{name:`literal`,value:`'start'`},{name:`literal`,value:`'end'`}]},description:`Logical position of the items' disclosure chevrons. Set this on the group
when its direct items should share one position; an individual Collapsible
can still override it.
@default 'end'`},children:{required:!0,tsType:{name:`ReactNode`},description:`Children — any components that support isCollapsible + value.

@compositionHint Wrap Collapsible instances (typically inside Card).
Each Collapsible needs a \`value\` prop to participate in the group.

@example
\`\`\`
<CollapsibleGroup type="single" defaultValue="general">
  <VStack gap={2}>
    <Card>
      <Collapsible trigger="General" value="general">
        <p>General settings content</p>
      </Collapsible>
    </Card>
    <Card>
      <Collapsible trigger="Advanced" value="advanced">
        <p>Advanced settings content</p>
      </Collapsible>
    </Card>
  </VStack>
</CollapsibleGroup>
\`\`\``}},composes:[`Omit`]}})))()}export{_ as n,p as t};