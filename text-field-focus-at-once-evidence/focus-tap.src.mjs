// Run: PORT=<port> IDB_UDID=<udid> BUILD=<dir> STORY=<id> LABEL=<l> TAKE=<n> node focus-tap.mjs
// Taps a text field on the iOS 26.2 sim and records, per frame, the field's
// focus look (the fading element's box-shadow and border colour) and the
// visual viewport while the keyboard rises; plus a 60 fps screen recording.
import fs from 'node:fs';
import {idb, readLog, waitFor, evaluate, sleep, toScreen, startRecording, ORIGIN, HERE} from './rig.mjs';

const BUILD = process.env.BUILD;
const STORY = process.env.STORY;
const OUT = `${HERE}/out/focus`;
const name = `focus-${process.env.LABEL ?? 'x'}-${process.env.TAKE ?? 'x'}`;
fs.mkdirSync(OUT, {recursive: true});

__HELPERS__

async function open(tag) {
  const run = `ft-${tag}-${Date.now().toString(36)}`;
  const url = `${ORIGIN}/${BUILD}/iframe.html?id=${STORY}&viewMode=story&run=${run}`;
  for (let attempt = 1; attempt <= 4; attempt += 1) {
    try { idb(['terminate', 'com.apple.mobilesafari']); } catch {}
    idb(['open', url]);
    try {
      await waitFor(() => readLog(run).find(r => r.kind === 'ready'), {timeout: 20_000});
      await sleep(4000);
      await waitFor(() => readLog(run).filter(r => r.kind === 'ready').at(-1), {timeout: 15_000});
      return run;
    } catch (error) {
      console.error(`open attempt ${attempt} failed: ${error.message}`);
    }
  }
  throw new Error(`could not open ${url}`);
}

const ENTRY = ':is(input:not([type="hidden"]), textarea, [contenteditable="true"])';

const SETUP = `(() => {
  const entry = document.querySelector('#storybook-root ' + ${JSON.stringify(ENTRY)});
  if (entry == null) return null;
  let wrapper = entry;
  while (wrapper && !/box-shadow|border-color/.test(getComputedStyle(wrapper).transitionProperty)) wrapper = wrapper.parentElement;
  if (wrapper == null) return {error: 'no wrapper'};
  const vv = visualViewport;
  const e = entry.getBoundingClientRect(), w = wrapper.getBoundingClientRect();
  const look = () => { const s = getComputedStyle(wrapper); return s.boxShadow + ' | ' + s.borderColor; };
  const rec = window.__ft = {samples: [], focusAt: null, rest: look()};
  const t0 = performance.now();
  const tick = () => {
    const t = performance.now();
    rec.samples.push({t: Math.round((t - t0) * 10) / 10, look: look(), vvH: Math.round(vv.height * 10) / 10, vvTop: Math.round(vv.offsetTop * 10) / 10, sy: scrollY, focused: document.activeElement === entry, wTop: Math.round(wrapper.getBoundingClientRect().top * 10) / 10});
    if (t - t0 < 4000) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
  document.addEventListener('focusin', ev => { if (ev.target === entry && rec.focusAt == null) rec.focusAt = Math.round((performance.now() - t0) * 10) / 10; }, true);
  return {
    tap: {x: (e.left + Math.min(e.width / 2, 120) - vv.offsetLeft) * vv.scale, y: (e.top + e.height / 2 - vv.offsetTop) * vv.scale},
    wrapper: [w.left, w.top, w.right, w.bottom], rest: rec.rest, tag: entry.tagName,
  };
})()`;

const run = await open(name);
console.log(name, 'prep', JSON.stringify(await evaluate(run, PREP(false, false))));
await sleep(800);
const file = `${OUT}/${name}.mp4`;
const stop = startRecording(file, {fps: 60});
let setup;
try {
  await sleep(600);
  setup = await evaluate(run, SETUP);
  if (setup == null || setup.error) throw new Error(`setup: ${JSON.stringify(setup)}`);
  await sleep(300);
  const [sx, sy] = toScreen(setup.tap.x, setup.tap.y);
  idb(['ui', 'tap', String(sx), String(sy)]);
  await sleep(3200);
} finally {
  await stop();
}
const ft = await evaluate(run, 'window.__ft', {timeout: 30_000});
fs.writeFileSync(`${OUT}/${name}.json`, JSON.stringify({build: BUILD, story: STORY, setup, ft}, null, 1));
const after = ft.samples.filter(s => ft.focusAt != null && s.t >= ft.focusAt);
const looks = after.map(s => s.look);
const last = looks.at(-1);
console.log(name, JSON.stringify({focusAt: ft.focusAt, samples: ft.samples.length, framesNotFinal: looks.filter(l => l !== last).length, distinct: new Set(looks).size, restIsFinal: ft.rest === last, vvH: [ft.samples[0]?.vvH, ft.samples.at(-1)?.vvH], wTop: [ft.samples[0]?.wTop, ft.samples.at(-1)?.wTop]}));
