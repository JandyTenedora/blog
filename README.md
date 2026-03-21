# jandytenedora.github.io

Personal blog built with Hugo (PaperMod theme), deployed to GitHub Pages. Push to `main` → live within ~60 seconds.

---

## The files you'll actually edit

### Writing a new post

```bash
hugo new content/posts/your-post-name.md
```

This creates `content/posts/your-post-name.md` with the default front matter. Open that file and write.

**Front matter fields:**

```yaml
---
title: "Your title here"
date: 2026-03-09
draft: true          # change to false when ready to publish
tags: ["tag1", "tag2"]
description: "One sentence shown in post listings."
showToc: true        # set to false if no headings
---

Your content here...
```

> While `draft: true`, the post won't appear on the live site. Change to `draft: false` to publish.

**Tags used so far:** `meta`, `obsidian`, `claude-code`, `learning`, `data-engineering`

---

### The About page

`content/about.md` — edit this to update your bio and what-I-write-about sections.

---

### Site-wide settings

`hugo.toml` — controls the site title, subtitle, nav links, and social links (GitHub, LinkedIn). Edit here if you want to change the header, navigation, or any global metadata.

---

## Previewing locally

```bash
hugo server -D
```

Open [http://localhost:1313](http://localhost:1313). The `-D` flag includes draft posts. Hot-reloads on save.

---

## Publishing

Just push to `main`:

```bash
git add content/posts/your-post-name.md
git commit -m "publish: your post title"
git push
```

GitHub Actions builds and deploys automatically. No manual deploy step.

---

## What not to touch

| Path | Why |
|---|---|
| `public/` | Build output — regenerated on every deploy |
| `themes/PaperMod/` | Upstream git submodule — changes will be overwritten |
| `.github/workflows/hugo.yml` | CI/CD pipeline — leave as-is |

To customise the theme's appearance without touching the submodule, add files to `assets/` (CSS/JS) or `layouts/` (HTML templates) at the repo root. Hugo merges these with the theme.
