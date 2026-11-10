import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{t}from"./react-DlPsW1c0.js";import{n,t as r}from"./stylex-BSlGVhGe.js";import{t as i}from"./jsx-runtime-MKhVqBIO.js";import{n as a}from"./mergeProps-DHkqklmt.js";import{i as o,t as s}from"./themeProps-BVy3p_gf.js";import{n as c,t as l}from"./Badge-DqOhTiyH.js";function u(e){return`render`in e&&typeof e.render==`function`}function d(e){return e.replace(/[.*+?^${}()|[\]\\]/g,`\\$&`)}function f({ref:e,children:t,tokens:r,xstyle:i,className:s,style:c,...l}){if(!t||!r||r.length===0)return(0,m.jsx)(`span`,{ref:e,...a(o(`chat-tokenized-text`),n(h.root,i),s,c),...l,children:t??``});let u=p(t,r);return(0,m.jsx)(`span`,{ref:e,...a(o(`chat-tokenized-text`),n(h.root,i),s,c),...l,children:u})}function p(e,t){let n=t.filter(e=>e.value.length>0);if(n.length===0)return[e];let r=n.map(e=>d(e.value)).join(`|`),i=RegExp(`(${r})`,`g`),a=new Map;for(let e of n)a.set(e.value,e);let o=[],s=0,c;for(;(c=i.exec(e))!==null;){c.index>s&&o.push(e.slice(s,c.index));let t=c[0],n=a.get(t);n&&o.push((0,m.jsx)(`span`,{className:`astryx3nfvp2 astryx6s0dn4 astryxg2ss61 astryx16dsc37`,children:u(n)?n.render():(0,m.jsx)(l,{label:n.label,variant:n.variant,icon:n.icon})},`${t}-${c.index}`)),s=c.index+t.length}return s<e.length&&o.push(e.slice(s)),o}var m,h;function g(){return(g=e((()=>{t(),r(),c(),s(),m=i(),h={root:{k1xSpc:`astryxt0psk2`,$$css:!0}},f.displayName=`ChatTokenizedText`,f.__docgenInfo={description:`Renders text with token values replaced by inline token content.

Accepts the same \`ChatComposerToken\` type used by input triggers,
so you can share a single token definition between input and display.`,methods:[],displayName:`ChatTokenizedText`,props:{xstyle:{required:!1,tsType:{name:`StyleXStyles`},description:"StyleX styles created via `stylex.create()`. Merged with the component's\nbase styles inside a single `stylex.props()` call for optimal deduplication.\n\n@example\n```\nconst overrides = stylex.create({ root: { marginBottom: 8 } });\n<Component xstyle={overrides.root} />\n```"},ref:{required:!1,tsType:{name:`ReactRef`,raw:`React.Ref<HTMLSpanElement>`,elements:[{name:`HTMLSpanElement`}]},description:``},children:{required:!0,tsType:{name:`string`},description:`The message text containing serialized token values`},tokens:{required:!1,tsType:{name:`Array`,elements:[{name:`union`,raw:`ChatComposerTokenBadge | ChatComposerTokenCustom`,elements:[{name:`intersection`,raw:`{
  /** Serialized value \\u2014 what this token becomes in the onSubmit string */
  value: string;
} & Omit<BadgeProps, 'ref' | 'xstyle' | 'className' | 'style'>`,elements:[{name:`signature`,type:`object`,raw:`{
  /** Serialized value \\u2014 what this token becomes in the onSubmit string */
  value: string;
}`,signature:{properties:[{key:`value`,value:{name:`string`,required:!0},description:`Serialized value \\u2014 what this token becomes in the onSubmit string`}]}},{name:`Omit`,elements:[{name:`BadgeProps`},{name:`union`,raw:`'ref' | 'xstyle' | 'className' | 'style'`,elements:[{name:`literal`,value:`'ref'`},{name:`literal`,value:`'xstyle'`},{name:`literal`,value:`'className'`},{name:`literal`,value:`'style'`}]}],raw:`Omit<BadgeProps, 'ref' | 'xstyle' | 'className' | 'style'>`}]},{name:`signature`,type:`object`,raw:`{
  /** Serialized value \\u2014 what this token becomes in the onSubmit string */
  value: string;
  /** Full control over the token\\u2019s rendered content */
  render: () => ReactNode;
}`,signature:{properties:[{key:`value`,value:{name:`string`,required:!0},description:`Serialized value \\u2014 what this token becomes in the onSubmit string`},{key:`render`,value:{name:`signature`,type:`function`,raw:`() => ReactNode`,signature:{arguments:[],return:{name:`ReactNode`}},required:!0},description:`Full control over the token\\u2019s rendered content`}]}}]}],raw:`ChatComposerToken[]`},description:`Token definitions — same type returned by trigger onSelect.
Each non-empty token \`value\` is matched literally against the text and
replaced with its Badge or custom representation. Empty values are ignored.

@example
\`\`\`
const mentionTokens = contacts.map(c => ({
  value: \`@\${c.id}\`,
  label: \`@\${c.label}\`,
  variant: 'blue' as const,
}));
<ChatTokenizedText tokens={mentionTokens}>
  {message.text}
</ChatTokenizedText>
\`\`\``}},composes:[`Omit`]}})))()}export{g as n,f as t};