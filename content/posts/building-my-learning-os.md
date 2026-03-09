---
title: "Building a learning OS with Obsidian and Claude Code"
date: 2026-03-07
draft: false
tags: ["meta", "obsidian", "claude-code", "learning", "data-engineering"]
description: "How I built a structured learning system to upskill to senior data engineer level — and why I'm writing about it publicly."
showToc: true
---

## Why

It's easy, as a working engineer, to spend years operating at the level of abstraction the job demands — and only that level. Frameworks, managed services, APIs. Things that work without requiring you to know why they work.

Jandy wanted to go back. Not to fill gaps, but to rediscover the kind of engagement with computing that used to excite him most — the academic days of grappling with things from first principles, building understanding from the ground up. The nostalgia for that mode of thinking turned into a structured project. This post is about how he organised it.

## The learning OS

The core is an Obsidian vault running as a personal knowledge OS. Everything flows through it:

- **Daily notes** with a study plan generated each morning and a log written at the end of the day
- **Habit tracker** watching three streaks: German, Data Engineering, Training
- **A 6-month roadmap** in a single file — the one source of truth for what he's working on and what's next
- **Reading notes** for the first-principles books he's working through (CS:APP, Kurose, SICP)

The daily workflow is mostly automated through Claude Code slash commands:

- `/dailystudy` — reads the roadmap, checks recent notes, generates today's study plan, appends it to the daily note
- `/dailylog` — writes a structured log of what actually got done
- `/readingnotes` — generates companion notes for chapters he's read, formatted and linked back into the vault

The vault lives in a git repo. CLAUDE.md at the root tells Claude Code how the vault is structured, what not to touch, and how to behave. It's the equivalent of a CONTRIBUTING.md for an AI collaborator operating inside personal notes.

## The roadmap

The plan has two phases.

**Phase A: SQL cram.** Ten specific challenge categories, tracked in a table with checkboxes.

**Phase B: deep-systems.** Seven projects building progressively more complex infrastructure from scratch:

1. HTTP/1.1 server in Python
2. Redis clone
3. Shell in Go
4. SQLite clone
5. DNS resolver
6. BitTorrent client
7. Wide-column store

Each project has milestones and a required reading list from the first-principles books. The idea is to force the theory and practice to happen together rather than letting one drift ahead of the other.

Alongside this: OSS contributions to Airflow and Dagster, German language study at A2 level, and GCP certification.

## The stack

The technical stack is deliberately minimal:

- **Obsidian** — the vault, graph view, plugins (obsidian-tracker for habit streaks, kanban for sprint boards)
- **Claude Code** — running locally, scoped to the vault directory, the automation layer for all the skills
- **neovim + tmux** — writing environment
- **This blog** — Hugo + PaperMod, deployed to GitHub Pages via Actions

The blog is intentionally outside the vault. The vault is private working memory. The blog is the public output.

## What's next

<!-- TODO: Update with current project -->
