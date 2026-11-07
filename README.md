# Dynamic Type in Safari on iPhone, at bff64fcac9

Safari on the iPhone 17 Pro simulator, iOS 26.2, with the Storybook built at bff64fcac94fd11365bb91e445fad8f104e144f6. Each size was set in the system text size and Safari relaunched; sizes are the computed font sizes in px. Images are cropped to the page content.

| Size | Neutral body | Neutral supporting | Butter body | Butter supporting | Y2K body | Y2K supporting |
| --- | --- | --- | --- | --- | --- | --- |
| xs | 13.18 px | 12.92 px | 13.18 px | 12 px | 13.18 px | 11.08 px |
| l (default) | 16 px | 14 px | 16 px | 13 px | 16 px | 12 px |
| ax3 | 37.65 px | 35.54 px | 37.65 px | 33 px | 37.65 px | 30.46 px |
| ax5 | 49.88 px | 47.38 px | 49.88 px | 44 px | 49.88 px | 40.62 px |

Neutral: the Core/Themes/Dynamic Type story. Y2K: its Fixed Supporting Size story. Butter: Core/Text All Types under the Butter toolbar theme.

At l the Dynamic Type story's page adopts no text-size scale stylesheet. The same build in desktop Chromium shows body 14 px and supporting 12 px in neutral and Butter, so the larger l sizes on the phone come from each theme's touch type, not from the reader's text size.

Live change (ios-dt-live.gif): the story open at l (body 16px); Settings, Larger Text, slider to xxxl; back in Safari the same page shows body 21.6464px with the same load time (18:06:31), and it loaded once.
