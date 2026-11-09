# Popover touch growth: first frames, evidence

Evidence for the pull request "fix(Popover): the touch growth shows its content from its first frame".

## Method

- Chromium from Playwright 1.61.1, on the interaction config's phone profile (402×714 at 3×, touch). The story is `core-popover--default`, from a local Storybook build of each commit.
- A tap opens the popover. In the second case a tap outside lands while it grows.
- The trace categories are `cc`, `benchmark`, `viz` and `disabled-by-default-devtools.timeline.frame`. Chromium records a `PipelineReporter` event for each frame it presents. Frames are kept when their state is presented and deduplicated by `frame_sequence`. A frame counts when `has_missing_content` is true and it is among the first five presented frames. The pull request's proof uses the same reader (`presentedFrames`).
- The arms run one browser at a time, interleaved round by round, on one host. The host's 1-minute load average is logged before each run.

## Main against the change

Main is `259190bc5b`. The change is this pull request's code. The table counts openings that present a frame with missing content among their first five.

| Case | Main | Change |
| --- | --- | --- |
| A tap opens the popover | 40 of 40 (67 frames) | 0 of 40 |
| A tap outside while it grows | 40 of 40 (78 frames) | 0 of 40 |

40 interleaved rounds; the host load ran from 19.5 to 143.5, with a mean of 57.1. The opacity animation's first keyframe is 0 on main and 0.001 with the change.

The proof "the growth shows its content from its first frames" runs both cases. It fails on main in 20 of 20 runs (10 repeats of each case) and passes with the change in 20 of 20.

## Under heavy load

The proof and its browsers run on 4 CPUs, beside 4 busy loops on the same CPUs, with 2 workers. More busy loops on other CPUs raise the host's load average. The arms are interleaved, 20 rounds of both cases.

| Arm | The proof, both cases |
| --- | --- |
| Main | fails in 32 of 40 runs |
| Change | passes in 40 of 40 runs |

The host load was 50 or more before every run: from 51.1 to 112.7, with a mean of 73.3. An earlier pass of the same profile, at a host load of 13 to 65, gave the same result: main failed in 38 of 40 runs, and the change passed in 40 of 40.

## The floor's value

Each value was injected in the page: every opacity keyframe below it is raised to it. 40 interleaved rounds per value; the host load ran from 14 to 110.

| Floor | A tap opens the popover | A tap outside while it grows |
| --- | --- | --- |
| none (main) | 39 of 40 (63 frames) | 40 of 40 (82 frames) |
| 0.01 | 0 of 40 | 0 of 40 |
| 0.004 | 0 of 40 | 0 of 40 |
| 0.001 | 0 of 40 | 0 of 40 |

Chromium skips only a layer at exactly 0. 0.001 is the smallest value tried. It is 0.255 of one step of an 8-bit channel, so no pixel changes.

## Other entrances

- **Popover's Reduce Motion cross-fade:** 0 of 20 openings with missing content, on main and with the floor. Its proof and unit test pass unchanged.
- **Popover's pointer entrance**, a CSS animation on the surface: 0 of 20 on main.
- **22 other entrances in core that fade in from opacity 0** were measured with the same reader, 40 rounds each, with and without the floor: every `layerAnimations` user, Dialog, the backdrops and scrims, Toast, Switch, SegmentedControl, List's insert, and Popover's Reduce Motion cross-fade. None presented missing content, so only the growth needs the floor.

## WebKit

WebKit from Playwright 1.61.1 ran in its official container, which composites with software GL. In 12 interleaved openings per arm, the first visible frame showed the content in 12 of 12, before and after the change. The median time to the first visible frame was 99 ms on main and 98.5 ms with the change.

## Reproduce

The floor injection, run before navigation:

```ts
await page.addInitScript((floor: number) => {
  const animate = Element.prototype.animate;
  Element.prototype.animate = function (keyframes, options) {
    const frames = Array.isArray(keyframes)
      ? keyframes.map(frame =>
          frame != null && 'opacity' in frame && Number(frame.opacity) < floor
            ? {...frame, opacity: floor}
            : frame,
        )
      : keyframes;
    return animate.call(this, frames, options);
  };
}, 0.001);
```

The count is `presentedFrames` from `PopoverTouchMotion.interaction.browser.spec.ts`, over the first five frames after the tap.
