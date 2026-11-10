import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{t}from"./react-DlPsW1c0.js";import{t as n}from"./jsx-runtime-MKhVqBIO.js";import{i as r,r as i}from"./useLinkComponent-DVILVvhE.js";function a({component:e,children:t}){let n=(0,o.useMemo)(()=>({component:e}),[e]);return(0,s.jsx)(i,{value:n,children:t})}var o,s;function c(){return(c=e((()=>{o=t(),r(),s=n(),a.displayName=`LinkProvider`,a.__docgenInfo={description:`Provides a custom link component to all Astryx components in the subtree.

Wrap your app (or a section of it) in LinkProvider to replace
native \`<a>\` elements with your framework's link component
(e.g., Next.js Link, React Router Link).`,methods:[],displayName:`LinkProvider`,props:{component:{required:!0,tsType:{name:`ElementType`},description:`The component to use for all link elements in the subtree.
Must accept href, className, style, and children props.

@example
\`\`\`
import Link from 'next/link';
<LinkProvider component={Link}>
\`\`\``},children:{required:!0,tsType:{name:`ReactNode`},description:``}}}})))()}export{c as n,a as t};