// NOT FOR LANDING: evidence only. The first load of ToastViewport in a worker
// takes 3 s, as a cold transform does on a busy machine. A test can also ask
// for one slow load.
const flags = globalThis as unknown as {
  toastViewportLoads?: number;
  isNextViewportLoadSlow?: boolean;
};
flags.toastViewportLoads = (flags.toastViewportLoads ?? 0) + 1;
if (flags.toastViewportLoads === 1 || flags.isNextViewportLoadSlow === true) {
  flags.isNextViewportLoadSlow = false;
  await new Promise(resolve => setTimeout(resolve, 3000));
}

export {};
