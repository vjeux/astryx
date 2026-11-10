import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{t}from"./react-DlPsW1c0.js";import{t as n}from"./jsx-runtime-MKhVqBIO.js";import{o as r,s as i}from"./useTheme-CUotWZgR.js";import{n as a,t as o}from"./useLocale-BdhI3KFf.js";import{n as s,t as c}from"./MediaTheme-DJJQA35u.js";import{c as l,o as u}from"./iframe-B7UFaprG.js";import{a as d,i as f,n as p,o as m,r as h,t as g}from"./ChartAxis-BWrZPxJe.js";import{n as _,t as v}from"./ChartGrid-BGP-W357.js";import{n as y,t as b}from"./bar-BlJJsAlE.js";import{n as x,t as S}from"./line-CYVOawK-.js";import{i as C,r as w}from"./_data-BZjSE72W.js";function T({showLineDots:e=!1}){let t=a();return(0,O.jsx)(h,{data:C,xKey:`month`,series:[b(`revenue`,{color:`#3b82f6`,label:`Revenue`,stack:`x`}),b(`costs`,{color:`#ef4444`,label:`Costs`,stack:`x`}),x(`trend`,{color:`#f59e0b`,label:`Trend`,dots:e})],tooltip:!0,grid:(0,O.jsx)(v,{}),axes:(0,O.jsxs)(O.Fragment,{children:[(0,O.jsx)(g,{position:`bottom`}),(0,O.jsx)(g,{position:`left`,tickFormat:d(`$`,t)})]}),height:320})}function E(){let e=(0,D.useRef)(null);return(0,D.useEffect)(()=>{let t=e.current;return t&&!t.open&&t.showModal(),()=>{t?.open&&t.close()}},[]),(0,O.jsx)(u,{theme:j,mode:`light`,children:(0,O.jsx)(c,{mode:`dark`,children:(0,O.jsx)(`dialog`,{ref:e,"aria-label":`Chart tooltip layering test`,className:`x1iut0ri xw7nakj x1shk3sm xmkeg23 x1y0btm7 x14i3s5s x1hviunn x10xzikg`,children:(0,O.jsx)(T,{showLineDots:!0})})})})}var D,O,k,A,j,M,N,P,F;function I(){return(I=e((()=>{D=t(),f(),y(),S(),_(),p(),m(),i(),s(),l(),o(),w(),O=n(),{expect:k,waitFor:A}=__STORYBOOK_MODULE_TEST__,j=r({name:`chart-tooltip-modal-test`,tokens:{"--color-accent":`#7c3aed`}}),M={title:`Charts/Chrome/Tooltip`,component:h},N={render:()=>(0,O.jsx)(T,{})},P={render:()=>(0,O.jsx)(E,{}),play:async({canvasElement:e})=>{let t=e.querySelector(`dialog`);await A(()=>k(t?.matches(`:modal`)).toBe(!0));let n=()=>e.querySelector(`svg rect[fill="transparent"]`),r=()=>document.querySelector(`[role="tooltip"]`);await A(()=>{k(n()).not.toBeNull(),k(r()).not.toBeNull()});let i=n(),a=r();if(!i||!a)throw Error(`Chart event surface or tooltip did not render`);let o=a.parentElement;if(!o)throw Error(`Chart tooltip Layer host did not render`);let s=[],c=e=>{s.push(e.newState)};o.addEventListener(`beforetoggle`,c),await A(()=>{k(i.getBoundingClientRect().width).toBeGreaterThan(0),k(e.querySelectorAll(`svg g[clip-path] circle`).length).toBeGreaterThanOrEqual(2)});let l=e.querySelectorAll(`svg g[clip-path] circle`),u=i.getBoundingClientRect(),d=e=>{let t=e.getBoundingClientRect();i.dispatchEvent(new PointerEvent(`pointermove`,{bubbles:!0,clientX:t.left+t.width/2,clientY:u.top+u.height/2,pointerType:`mouse`}))};d(l[0]),await A(()=>{k(a.textContent).toContain(`Jan`),k(o.matches(`:popover-open`)).toBe(!0)}),k(s).toEqual([`open`]),d(l[1]),await A(()=>{k(a.textContent).toContain(`Feb`),k(o.matches(`:popover-open`)).toBe(!0)}),await new Promise(e=>requestAnimationFrame(()=>e())),k(s).toEqual([`open`]),k(t?.matches(`:modal`)).toBe(!0),k(o.closest(`[data-astryx-theme="chart-tooltip-modal-test"]`)).not.toBeNull(),k(o.closest(`[data-astryx-media="dark"]`)).not.toBeNull(),k(getComputedStyle(o).zIndex).toBe(`auto`);let f=o.getBoundingClientRect();k(f.width).toBeGreaterThan(0),k(f.height).toBeGreaterThan(0),o.removeEventListener(`beforetoggle`,c)}},N.parameters={...N.parameters,docs:{...N.parameters?.docs,source:{originalSource:`{
  render: () => <TooltipChart />
}`,...N.parameters?.docs?.source},description:{story:`Hover the chart: a grouped tooltip shows every series value at that x, with a
 column highlight for bars and hover dots on lines.`,...N.parameters?.docs?.description}}},P.parameters={...P.parameters,docs:{...P.parameters?.docs,source:{originalSource:`{
  render: () => <ModalLayeringFixture />,
  play: async ({
    canvasElement
  }) => {
    const dialog = canvasElement.querySelector('dialog');
    await waitFor(() => expect(dialog?.matches(':modal')).toBe(true));
    const getEventSurface = () => canvasElement.querySelector<SVGRectElement>('svg rect[fill="transparent"]');
    const getTooltip = () => document.querySelector<HTMLElement>('[role="tooltip"]');
    await waitFor(() => {
      expect(getEventSurface()).not.toBeNull();
      expect(getTooltip()).not.toBeNull();
    });
    const eventSurface = getEventSurface();
    const tooltip = getTooltip();
    if (!eventSurface || !tooltip) {
      throw new Error('Chart event surface or tooltip did not render');
    }
    const layer = tooltip.parentElement;
    if (!layer) {
      throw new Error('Chart tooltip Layer host did not render');
    }
    const toggleStates: string[] = [];
    const recordToggle = (event: Event) => {
      toggleStates.push((event as ToggleEvent).newState);
    };
    layer.addEventListener('beforetoggle', recordToggle);
    await waitFor(() => {
      expect(eventSurface.getBoundingClientRect().width).toBeGreaterThan(0);
      expect(canvasElement.querySelectorAll<SVGCircleElement>('svg g[clip-path] circle').length).toBeGreaterThanOrEqual(2);
    });
    const points = canvasElement.querySelectorAll<SVGCircleElement>('svg g[clip-path] circle');
    const eventRect = eventSurface.getBoundingClientRect();
    const moveTo = (point: SVGCircleElement) => {
      const pointRect = point.getBoundingClientRect();
      eventSurface.dispatchEvent(new PointerEvent('pointermove', {
        bubbles: true,
        clientX: pointRect.left + pointRect.width / 2,
        clientY: eventRect.top + eventRect.height / 2,
        pointerType: 'mouse'
      }));
    };
    moveTo(points[0]);
    await waitFor(() => {
      expect(tooltip.textContent).toContain('Jan');
      expect(layer.matches(':popover-open')).toBe(true);
    });
    expect(toggleStates).toEqual(['open']);
    moveTo(points[1]);
    await waitFor(() => {
      expect(tooltip.textContent).toContain('Feb');
      expect(layer.matches(':popover-open')).toBe(true);
    });
    await new Promise<void>(resolve => requestAnimationFrame(() => resolve()));
    expect(toggleStates).toEqual(['open']);
    expect(dialog?.matches(':modal')).toBe(true);
    expect(layer.closest('[data-astryx-theme="chart-tooltip-modal-test"]')).not.toBeNull();
    expect(layer.closest('[data-astryx-media="dark"]')).not.toBeNull();
    expect(getComputedStyle(layer).zIndex).toBe('auto');
    const layerRect = layer.getBoundingClientRect();
    expect(layerRect.width).toBeGreaterThan(0);
    expect(layerRect.height).toBeGreaterThan(0);
    layer.removeEventListener('beforetoggle', recordToggle);
  }
}`,...P.parameters?.docs?.source},description:{story:`Keeps the chart inside nested Theme/MediaTheme scopes and a native modal,
then opens its tooltip after the modal. The play assertions prove the host
stays in those scopes, remains continuously open across content-bearing
points, and becomes a later browser top-layer entry rather than a high-z-index
portal hidden behind the dialog.`,...P.parameters?.docs?.description}}},F=[`Default`,`ModalLayering`]})))()}I();export{N as Default,P as ModalLayering,F as __namedExportsOrder,M as default};