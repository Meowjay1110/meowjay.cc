---
name: new-post
description: Scaffold a new draft blog post with correct frontmatter in src/contents/posts/
---

Create a new Markdown blog post draft for this Astro blog.

Ask the user for:
1. Post title (Chinese or English)
2. Tags (comma-separated; look at existing posts in `src/contents/posts/` for tag conventions)
3. Brief description (one sentence for the `description` field)

Then:
- Generate a slug from the title using lowercase English words (kebab-case). If the title is Chinese, ask the user for a short English slug.
- Create the file at `src/contents/posts/<slug>.md`

Use this exact frontmatter template:

```yaml
---
title: "<title>"
pubDatetime: <current datetime in ISO 8601 UTC, e.g. 2026-05-10T12:00:00Z>
description: "<one-sentence description>"
tags:
  - <tag>
draft: true
---
```

Leave the body empty after the frontmatter (just a blank line).

Report the file path created and remind the user that `draft: true` means it won't appear in production until changed to `false`.
