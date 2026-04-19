---
name: Sitemap contains valid URLs
description: Ensure generated sitemap files do not contain placeholder or `undefined` URLs.
---

# Sitemap contains valid URLs

## Context

There is a `public/static/sitemap.xml` in the repo. I observed an entry containing the literal string `undefined`. Broken sitemap entries harm SEO and waste crawler budget.

## What to Check

### 1. Undefined or placeholder URLs (ERROR)
- For changed sitemap files in the PR, scan `<loc>` entries for literal `undefined`, `null`, or other obvious placeholders.
- If found, report ERROR with the exact `<loc>` value and file path.

### 2. Domain mismatch (WARNING)
- If sitemap entries use a domain that doesn't match the site's canonical domain, warn and recommend verifying sitemap generation.

## Key Files

- public/static/sitemap.xml
- Any build scripts that generate sitemaps

## Exclusions

- Temporary or test sitemap outputs under test/ or tmp/ directories.

## Examples

Bad:

```xml
<loc>https://www.gokulmenon.com/posts/undefined</loc>
```

Good:

```xml
<loc>https://www.gokulmenon.com/posts/hello-world</loc>
```
