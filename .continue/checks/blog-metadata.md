---
name: Blog posts include required metadata
description: Ensure every blog post has `author`, `publishedAt`, and `mainImage` so the blog layout renders correctly.
---

# Blog posts include required metadata

## Context

The blog pages and components in this repo expect posts to include `author`, `publishedAt`, and `mainImage` (see `studio/schemas/post.js`). Missing fields lead to rendering errors or incomplete post pages.

## What to Check

### 1. Missing metadata (ERROR)
- For new or modified posts (Sanity documents or markdown files), verify presence of:
  - `author` (reference to an existing author document)
  - `publishedAt` (datetime)
  - `mainImage` (image)
- If any are missing, report ERROR and show how to add them.

### 2. Invalid author reference (ERROR)
- If `author` references a non-existent author id, report ERROR and suggest linking to an existing author.

## Key Files

- pages/posts/[slug].js
- components/blog/post-header.js
- studio/schemas/post.js

## Exclusions

- Draft posts explicitly marked as drafts (include `preview` or `draft: true` in PR description).

## Examples

Bad (missing author):

```yaml
title: "My Post"
publishedAt: 2024-01-01T00:00:00Z
# missing author
```

Good:

```yaml
title: "My Post"
publishedAt: 2024-01-01T00:00:00Z
author: authorId123
mainImage: /static/images/cover.jpg
```
