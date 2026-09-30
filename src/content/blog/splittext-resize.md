---
title: 'SplitText, and why your headline breaks on resize'
description: 'autoSplit is the fix for stacked split nodes and wrong line breaks after a font swap.'
pubDate: 2026-02-18
tags: ['gsap', 'motion', 'typography']
reveal: split-lines
---

Every split-text headline has the same two bugs, and both come from treating
the split as a one-time event.

## Bug one: stale measurements

`SplitText` measures the element to work out where the line breaks fall. If the
webfont has not landed yet, it measures the fallback font, caches those
positions, and the animation plays against geometry that no longer exists.

The fix is a refresh once fonts settle:

```js
document.fonts.ready.then(() => ScrollTrigger.refresh());
```

## Bug two: splits that accumulate

Resize the window across a breakpoint and a naive implementation splits the
*already-split* element again. What was one `h1` becomes an `h1` containing
divs containing divs, and the animation slows down a little on every crossing.

`autoSplit: true` reverts the previous split before creating the new one:

```js
SplitText.create(el, {
  type: 'lines',
  mask: 'lines',
  autoSplit: true,
  onSplit: (self) => {
    gsap.from(self.lines, { yPercent: 115, stagger: 0.08 });
  },
});
```

## On masks

`mask: 'lines'` wraps each line in an overflow-hidden parent. It costs a few
extra elements and buys you the ability to overshoot `yPercent` past 100
without text bleeding up over the line above it.

That overshoot is the entire reason the effect reads as motion rather than as
a fade.
