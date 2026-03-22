---
title: "01 — Building a learning OS with Obsidian and Claude Code"
date: 2026-03-07
weight: 1
draft: false
tags: ["meta", "obsidian", "claude-code", "learning", "data-engineering"]
description: "How I built a structured learning system to upskill to senior data engineer level, and why I'm writing about it publicly."
showToc: true
aliases: ["/posts/building-my-learning-os/"]
---

## Why

My full motivations are the same ones behind this blog, [read about them here](/about/). This is the system I built to organise those goals into something visual and intuitive, and to finally make proper use of an Obsidian feature I had never before managed to fully optimise for.

## The learning OS

The core is an Obsidian vault running as a personal knowledge OS. Everything flows through it:

- **Daily notes** with a study plan generated each morning and a log written at the end of the day
- **Habit tracker** watching three streaks: German, Data Engineering, Training
- **A 6-month roadmap** in a single file, the one source of truth for what I'm working on and what's next
- **Reading notes** for the first-principles books I'm working through (CS:APP, Kurose, SICP)

The daily workflow is mostly automated through Claude Code slash commands:

- `/dailystudy`: reads the roadmap, checks recent notes, generates today's study plan, appends it to the daily note
- `/dailylog`: writes a structured log of what actually got done
- `/readingnotes`: generates companion notes for chapters I've read, formatted and linked back into the vault

The vault lives in a git repo. CLAUDE.md at the root tells Claude Code how the vault is structured, what not to touch, and how to behave. It's the equivalent of a CONTRIBUTING.md for an AI collaborator operating inside personal notes.

## The roadmap

The plan has two tracks running in parallel.

**Track 1: closing gaps.** Fifteen specific areas to work through: OS-level process and thread models, HTTP internals, Go fluency, Kubernetes operational model, I/O tracing, distinguishing DDoS from retry storms. Each has a named resource and a deadline.

**Track 2: deep-systems.** Seven projects, building progressively more complex infrastructure from scratch. Each one is implemented twice: first a Java prototype to learn the concepts, then a Go production version to build fluency in the language.

1. HTTP/1.1 server from raw TCP
2. Relational database (B-tree storage, WAL, SQL parser)
3. Message queue
4. Connection pooler (PgBouncer-like)
5. Workflow orchestration engine (Airflow-like)
6. Distributed message broker (Kafka-like)
7. Wide-column store (Cassandra-like)

Each project has milestones and a required reading list drawn from the first-principles books: CS:APP, Kurose, SICP, Effective Java. The idea is to force theory and practice to happen together.

OSS contributions to Airflow and Dagster unlock after P5, once I can read the scheduler code as recognition rather than learning. German continues throughout at A1/A2 level, four to five hours a week.

## The stack

The technical stack is deliberately minimal:

- **Obsidian**: the vault, graph view, plugins (obsidian-tracker for habit streaks, kanban for sprint boards)
- **Claude Code**: running locally, scoped to the vault directory, the automation layer for all the skills
- **neovim + tmux**: writing environment
- **This blog**: Hugo + PaperMod, deployed to GitHub Pages via Actions

The blog is intentionally outside the vault. The vault is private working memory. The blog is the public output.

## The vault graph

Every note in the vault is a node. Every wikilink between notes is an edge. The graph below is a live export of that structure, 429 nodes, 766 connections. Red nodes are the most-linked. Drag to reposition, scroll to zoom, hover to identify.

{{< graph-mini >}}

## What's next

CS:APP chapters 1–3 and 8, Effective Java chapters 4–5. P1 (the HTTP server) starts this week in Java, then crosses over to Go at the halfway point. That'll be the first proper build post.
