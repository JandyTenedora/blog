---
title: "Building a learning OS with Obsidian and Claude Code"
date: 2026-03-07
draft: false
tags: ["meta", "obsidian", "claude-code", "learning", "data-engineering"]
description: "How I built a structured learning system to upskill to senior data engineer level — and why I'm writing about it publicly."
showToc: true
---

## Why I'm doing this

I'm a data engineer and I decided to get serious about the gaps in my knowledge. Not surface-level "watch some videos and update the CV" serious. Actually serious: build the things, read the source material, understand the internals.

That kind of commitment needs structure, or it dissolves into context-switching and half-finished tutorials. So I built a system. This post is about that system — what it is, how it works, and what I'm planning to build with it.

## The learning OS

The core is an Obsidian vault running as a personal knowledge OS. Everything flows through it:

- **Daily notes** with a study plan generated each morning and a log written at the end of the day
- **Habit tracker** watching three streaks: German, Data Engineering, Training
- **A 6-month roadmap** in a single file — the one source of truth for what I'm working on and what's next
- **Reading notes** for the first-principles books I'm working through (CS:APP, Kurose, SICP)

The daily workflow is mostly automated through Claude Code slash commands:

- `/dailystudy` — reads the roadmap, checks recent notes, generates today's study plan, appends it to the daily note
- `/dailylog` — writes a structured log of what actually got done
- `/readingnotes` — generates companion notes for chapters I've read, formatted and linked back into the vault

The vault lives in a git repo. CLAUDE.md at the root tells Claude Code how the vault is structured, what not to touch, and how to behave. It's the equivalent of a CONTRIBUTING.md for an AI collaborator operating inside your personal notes.

## The roadmap

The plan has two phases.

**Phase A: SQL cram.** There's an interview coming up, so SQL fundamentals get priority first. Ten specific challenge categories, tracked in a table with checkboxes.

**Phase B: deep-systems.** Seven projects building progressively more complex infrastructure from scratch:

1. HTTP/1.1 server in Python
2. Redis clone
3. Shell in Go
4. SQLite clone
5. DNS resolver
6. BitTorrent client
7. Wide-column store

Each project has milestones and a required reading list from the first-principles books. You don't start a milestone until you've read the relevant chapters. The idea is to force the theory and practice to happen together rather than letting one drift ahead of the other.

Alongside this: OSS contributions to Airflow and Dagster (unlocked after P5), German language study at A2 level, and GCP certification eventually.

## The stack

The technical stack is deliberately minimal:

- **Obsidian** — the vault, graph view, plugins (obsidian-tracker for habit streaks, kanban for sprint boards)
- **Claude Code** — running locally, scoped to the vault directory, the automation layer for all the skills
- **neovim + tmux** — writing environment
- **This blog** — Hugo + PaperMod, deployed to GitHub Pages via Actions

The blog is intentionally outside the vault. The vault is private working memory. The blog is the public output — polished enough to be worth reading, but not overthought.

## What's next

Currently: P1. Building an HTTP/1.1 server in Python while working through Kurose's *Computer Networking: A Top-Down Approach* Chapter 2. The goal is to understand what actually happens between a browser and a server, not just "it sends HTTP requests". Build the thing. Read the book. Write the notes. Post here.

If you're doing something similar — structured self-directed upskilling, learning in public, or just trying to build better CS foundations as a working engineer — I'd like to hear about it.
