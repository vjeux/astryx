---
'@astryxdesign/lab': patch
---

[breaking] TransferList and TransferListSelector reorder through core's `createReorderable`. They take `reorderable`, the object it makes. The `isReorderable` prop and each option's `isReorderDisabled` are gone, so a TransferList without `reorderable` no longer reorders, with a mouse too. To migrate, pass the object, and keep the options that stay put out of its `isReorderable(value)`:

```tsx
// Before
<TransferList isReorderable options={options} value={value} onChange={setValue} />

// After
const reorderable = useMemo(
  () =>
    createReorderable({
      isReorderable: value => !pinned.has(value),
      onReorder: ({key, to}) =>
        setValue(current => {
          const next = current.filter(item => item !== key);
          next.splice(to, 0, key);
          return next;
        }),
    }),
  [pinned],
);
<TransferList reorderable={reorderable} options={options} value={value} onChange={setValue} />
```

@vjeux
