# jandytenedora.github.io

Personal blog. Data engineering, systems from scratch, first-principles reading, German.
Live at **https://jandytenedora.github.io/**

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

- Hugo extended + PaperMod theme (git submodule)
- GitHub Pages via GitHub Actions
- Private Obsidian vault as the working knowledge base (not in this repo)
