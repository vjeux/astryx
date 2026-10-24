Evidence for "fix(core): a card's press overlay paints a finger's press".

iOS simulator (iPhone 17 Pro, Mobile Safari 26.2), the ClickableCard "With On Click" story from a Storybook build, a real touch held for 4 s on the card. Each capture is cropped to the card, taken about 1.8 s into the hold:
- ios-clickablecard-held-base.png: before the fix. The press controller writes data-astryx-press="on", but the card's overlay paints nothing.
- ios-clickablecard-held-fixed.png: after the fix. The overlay paints the pressed token; it clears 200 ms after the lift.
Text selection is turned off on the story root so iOS's long-press selection stays out of the frame.
