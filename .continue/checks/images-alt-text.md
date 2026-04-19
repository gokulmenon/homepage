---
name: Images must have meaningful alt text
description: Ensure non-decorative images include non-empty, descriptive alt text for accessibility and SEO.
---

# Images must have meaningful alt text

## Context

This project renders many images using plain `<img>` tags and a few image components. I found examples where `alt` is empty or generic (for example in `components/Intro.js` and `components/Podcasts.js`). Meaningful alt text improves accessibility and search visibility.

## What to Check

### 1. Missing or empty `alt` (ERROR)
- For every added or modified file in the PR, look for `<img` tags and JSX image usages.
- If an image has no `alt` attribute, report an ERROR with file path and line.

### 2. Generic `alt` (WARNING)
- If `alt` is present but is empty ("") or a generic value such as "image", "photo", or "gallery item", report a WARNING and suggest a more descriptive alt.

### 3. Decorative images (OK)
- Allow `alt=""` only when the image is explicitly decorative (e.g., has `role="presentation"`, `aria-hidden="true"`, or appears purely as a visual flourish). In those cases include a short comment or justification in the PR.

## Key Files

- components/Intro.js
- components/Podcasts.js
- components/Photos.js
- components/blog/cover-image.js
- components/blog/avatar.js

## Exclusions

- Background images in CSS (not `<img>` elements).
- SVG icons where accessibility is already handled (e.g., `aria-hidden` set).

## Examples

Bad:

```jsx
<img src="/static/images/gokul_menon_intro_photo.jpg" alt="" />
```

Good:

```jsx
<img src="/static/images/gokul_menon_intro_photo.jpg" alt="Gokul Menon portrait" />
```
