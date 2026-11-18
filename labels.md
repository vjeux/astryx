# TextInput #12546 at 2a42b5cee1 vs main c3b7f32fb6

Typed values and placeholders. Storybook production builds of:
- head 2a42b5cee1dba93509c15a007fc92c558c5084ae
- main c3b7f32fb6c939c0752896b6713366a67764a53f (its merge-base with main)

Chromium 149.0.7827.55 (Playwright 1.61.1, new headless), light, neutral
theme, full page: desktop 1280x800 at 2x, phone 390x844 at 3x with touch.
Root text at the default and at 200%
(document.documentElement.style.fontSize = '200%').

Cases:
- textinput-default-placeholder: Core/TextInput "Default" with the
  placeholder "Placeholder gjpqy" (Storybook args), nothing typed.
- textinput-default-typed: the same field after typing
  "Typography gjpqy" with the keyboard, then blurring it, so it is at
  rest.
- textinput-size-variants-typed: Core/TextInput "Size Variants" at 200%,
  with "Typography gjpqy" typed into Small, Medium and Large, then blurred.

Each still is taken 1 s after the last input. Measures are CSS px:
- field: the bordered field box. inner: the height inside its borders.
- line: the input's line height. input: the input box's height.
- out: how far the input box reaches past the inner box, top/bottom.
- glyph: the ink height of the shown text, from canvas metrics with the
  input's own font.
- ink in / on / past: rows with ink in the text's columns, inside the
  borders, on the border rows, and past them (up to 16 px or the next
  label or field).
- clipped: the input's scrollHeight is over its clientHeight, or an
  ancestor clips it.

| Still | Field | Shows | field | inner | line | input | out | glyph | ink in | on | past | clipped |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| textinput-default-placeholder--desktop-1280--root-default--main.png | Name | placeholder | 32 | 30 | 20 | 20 | 0/0 | 14 | 13.5 | 0 | 0 | false |
| textinput-default-placeholder--desktop-1280--root-200--main.png | Name | placeholder | 32 | 30 | 40 | 40 | 5/5 | 27 | 26.5 | 0 | 0 | false |
| textinput-default-placeholder--mobile-390--root-default--main.png | Name | placeholder | 32 | 30 | 24 | 24 | 0/0 | 16 | 15 | 0 | 0 | false |
| textinput-default-placeholder--mobile-390--root-200--main.png | Name | placeholder | 32 | 30 | 48 | 48 | 9/9 | 31 | 27.33 | 1 | 1.67 | false |
| textinput-default-typed--desktop-1280--root-default--main.png | Name | value | 32 | 30 | 20 | 20 | 0/0 | 14 | 13.5 | 0 | 0 | false |
| textinput-default-typed--desktop-1280--root-200--main.png | Name | value | 32 | 30 | 40 | 40 | 5/5 | 27 | 26.5 | 0 | 0 | false |
| textinput-default-typed--mobile-390--root-default--main.png | Name | value | 32 | 30 | 24 | 24 | 0/0 | 16 | 15 | 0 | 0 | false |
| textinput-default-typed--mobile-390--root-200--main.png | Name | value | 32 | 30 | 48 | 48 | 9/9 | 31 | 27.33 | 1 | 1.67 | false |
| textinput-size-variants-typed--desktop-1280--root-200--main.png | Small (28px) | value | 28 | 26 | 40 | 40 | 7/7 | 27 | 24.5 | 1 | 1 | false |
| textinput-size-variants-typed--desktop-1280--root-200--main.png | Medium (32px) | value | 32 | 30 | 40 | 40 | 5/5 | 27 | 26.5 | 0 | 0 | false |
| textinput-size-variants-typed--desktop-1280--root-200--main.png | Large (36px) | value | 36 | 34 | 40 | 40 | 3/3 | 27 | 26.5 | 0 | 0 | false |
| textinput-size-variants-typed--mobile-390--root-200--main.png | Small (28px) | value | 28 | 26 | 48 | 48 | 11/11 | 31 | 25.33 | 1 | 3.67 | false |
| textinput-size-variants-typed--mobile-390--root-200--main.png | Medium (32px) | value | 32 | 30 | 48 | 48 | 9/9 | 31 | 27.33 | 1 | 1.67 | false |
| textinput-size-variants-typed--mobile-390--root-200--main.png | Large (36px) | value | 36 | 34 | 48 | 48 | 7/7 | 31 | 29.33 | 0.67 | 0 | false |
| textinput-default-placeholder--desktop-1280--root-default--head.png | Name | placeholder | 32 | 30 | 20 | 20 | 0/0 | 14 | 13.5 | 0 | 0 | false |
| textinput-default-placeholder--desktop-1280--root-200--head.png | Name | placeholder | 42 | 40 | 40 | 40 | 0/0 | 27 | 26.5 | 0 | 0 | false |
| textinput-default-placeholder--mobile-390--root-default--head.png | Name | placeholder | 32 | 30 | 24 | 24 | 0/0 | 16 | 15 | 0 | 0 | false |
| textinput-default-placeholder--mobile-390--root-200--head.png | Name | placeholder | 50 | 48 | 48 | 48 | 0/0 | 31 | 30 | 0 | 0 | false |
| textinput-default-typed--desktop-1280--root-default--head.png | Name | value | 32 | 30 | 20 | 20 | 0/0 | 14 | 13.5 | 0 | 0 | false |
| textinput-default-typed--desktop-1280--root-200--head.png | Name | value | 42 | 40 | 40 | 40 | 0/0 | 27 | 26.5 | 0 | 0 | false |
| textinput-default-typed--mobile-390--root-default--head.png | Name | value | 32 | 30 | 24 | 24 | 0/0 | 16 | 15 | 0 | 0 | false |
| textinput-default-typed--mobile-390--root-200--head.png | Name | value | 50 | 48 | 48 | 48 | 0/0 | 31 | 30 | 0 | 0 | false |
| textinput-size-variants-typed--desktop-1280--root-200--head.png | Small (28px) | value | 42 | 40 | 40 | 40 | 0/0 | 27 | 26.5 | 0 | 0 | false |
| textinput-size-variants-typed--desktop-1280--root-200--head.png | Medium (32px) | value | 42 | 40 | 40 | 40 | 0/0 | 27 | 26.5 | 0 | 0 | false |
| textinput-size-variants-typed--desktop-1280--root-200--head.png | Large (36px) | value | 42 | 40 | 40 | 40 | 0/0 | 27 | 26.5 | 0 | 0 | false |
| textinput-size-variants-typed--mobile-390--root-200--head.png | Small (28px) | value | 50 | 48 | 48 | 48 | 0/0 | 31 | 30 | 0 | 0 | false |
| textinput-size-variants-typed--mobile-390--root-200--head.png | Medium (32px) | value | 50 | 48 | 48 | 48 | 0/0 | 31 | 30 | 0 | 0 | false |
| textinput-size-variants-typed--mobile-390--root-200--head.png | Large (36px) | value | 50 | 48 | 48 | 48 | 0/0 | 31 | 30 | 0 | 0 | false |

Byte-identical main and head pairs share a blob in this commit.
