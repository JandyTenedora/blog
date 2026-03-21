---
title: "03 — Claude Code skills in the vault"
date: 2026-03-21
weight: 3
draft: false
tags: ["meta", "obsidian", "claude-code", "learning"]
description: "The four Claude Code slash commands that automate the daily workflow — study planning, logging, book intake, and German diary writing."
showToc: true
---

## What a skill is

A Claude Code skill is a markdown file in `~/.claude/commands/`. When you run `/skillname` in a Claude Code session, it loads that file as a prompt and executes it with full context of the current directory and conversation.

The vault has four: `/dailystudy`, `/dailylog`, `/addbook`, and `/tagebuch`. Each one does a specific job and writes its output directly into the vault. The vault's `CLAUDE.md` tells Claude Code how the vault is structured so the skills have the context they need to write to the right places.

---

## `/dailystudy` — morning study plan

Reads the active roadmap in `Learning/Learning Goals.md`, checks the last 3–5 daily notes to understand what was recently completed, and generates a prioritised study plan for the day. Writes it into today's daily note under `## Study Plan`.

The plan is scoped and timed — each task references a specific milestone, chapter, or practice block. The skill cross-references what's overdue and what's next in the project sequence rather than generating arbitrary tasks.

Run it first thing. It creates the daily note if it doesn't exist yet.

---

## `/dailylog` — end-of-session log

Writes a structured log of what was actually done in a study session. Appends under `## Study Log` in today's daily note, checks off completed plan tasks, and creates linked notes for anything worth capturing.

The log has three sections:

- **Notes Touched** — wikilinks to any notes created or edited, with a one-line description
- **Questions & Answers** — things looked up or worked through, in callout format
- **What I Learned Today** — bullet-point takeaways

If a study plan task wasn't completed, it stays unchecked. The log records reality, not intent.

---

## `/addbook` — library intake

Adds a book to the library. Given a title, author, and optionally a PDF path, it:

1. Creates a subfolder in `Library/<domain>/<Book Title>/`
2. Creates a companion note `<Book Title> - Notes.md` with a standard template (overview, key concepts, chapters, reading log)
3. Adds a row to `Library/Library Hub.md`

The companion note is where reading notes accumulate over time — not a summary written after finishing, but a running record written chapter by chapter as part of the reading workflow.

> **On sourcing O'Reilly books:** A significant portion of the library came from [Humble Bundle](https://www.humblebundle.com/). They regularly bundle O'Reilly titles — often 15–20 books for £15–25. Worth checking before buying individually.

---

## `/tagebuch` — German diary entry

Creates a scaffold for a German diary entry in `German/Tagebuch/YYYY-MM/YYYY-MM-DD.md`. The scaffold includes the standard frontmatter (`tags: [german, tagebuch]`, date) and a heading. The actual writing is done manually — the skill handles the file creation and placement so the entry lands in the right folder without thinking about the path.

Tagebuch entries are written in German at A1/A2 level. The goal is production practice — constructing sentences under mild difficulty rather than passive consumption. Running `/dailylog` after a German session often surfaces corrections and vocab gaps from the entry.

---

## Satellite vaults

The main vault has a concept of satellite vaults — purpose-focused Obsidian vaults for a single domain (a language sprint, a work project, a trip) that feed progress back to the main vault. Each satellite gets an adapted `/dailylog` skill scoped to its path and goals, plus a `Progress Report` callout block in each daily note.

The main vault's (not yet implemented) `/syncvault` skill will read those blocks and reconcile activity against the goals in `Learning/Learning Goals.md`. The sync contract is strict — the callout format must match exactly for the parser to work.
