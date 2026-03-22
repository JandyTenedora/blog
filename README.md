# blog

Personal blog. Data engineering, systems from scratch, first-principles reading, German.
Live at **https://jandytenedora.github.io/blog/**

---

## Current status

**Phase:** Deep-systems projects + SQL cram
**Active project:** HTTP/1.1 server in Python
**Reading:** CS:APP, Kurose

### Posts

| Date | Title |
|------|-------|
| 2026-03-07 | [Building a learning OS with Obsidian and Claude Code](https://jandytenedora.github.io/posts/building-my-learning-os/) |

---

## Running locally

```bash
hugo server -D        # includes drafts, hot-reloads at localhost:1313
```

## Publishing

```bash
# New post
hugo new content/posts/your-post-name.md

# Publish
git add content/posts/your-post-name.md
git commit -m "publish: post title"
git push              # GitHub Actions deploys automatically
```

Set `draft: false` in front matter before pushing.

---

## Stack

- Hugo extended + hugo-book theme (git submodule)
- GitHub Pages via GitHub Actions (repo name `blog` → served at `/blog/` subpath)
- Private Obsidian vault as the working knowledge base (not in this repo)

---

## Gotchas

### Subpath deployment
The repo is named `blog`, so GitHub Pages serves the site at `https://jandytenedora.github.io/blog/`, not at the root. This means every internal asset path must be subpath-aware:

- **Shortcodes/layouts**: use `{{ .Site.BaseURL }}css/foo.css` — never `/css/foo.css`
- **Markdown links**: use `{{< ref "/path/to/page" >}}` — never `[text](/path/to/page)`
- **Menu items**: use `pageRef = "/about"` — never `url = "/about/"` (raw `url` bypasses Hugo's base URL processing)
- **Never hardcode `/blog/`** — this breaks on a custom domain

### CI: `actions/configure-pages` returns HTTP
`steps.pages.outputs.base_url` returns `http://` not `https://`. Browsers block mixed content, so any asset URL built from it will silently fail on the HTTPS-served page. The deploy build step forces HTTPS via bash substitution:
```bash
BASE_URL="${{ steps.pages.outputs.base_url }}"
hugo --minify --baseURL "${BASE_URL/#http:/https:}/"
```

### CI: htmltest uses a flat localhost build
`htmltest` validates internal links against disk paths — it doesn't know about the `/blog/` prefix. A separate first build with `--baseURL "http://localhost/"` is used for htmltest. The subpath simulation check (`--baseURL "http://localhost/blog/"`) runs after.

### Hugo minifier drops attribute quotes
`hugo --minify` outputs `href=/path` instead of `href="/path"`. Any grep or regex checking HTML attributes must use optional quotes: `(href|src)="?(/...)` not `(href|src)="(/...)"`.

