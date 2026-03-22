---
title: "04 — Dashboard"
date: 2026-03-21
weight: 4
draft: false
tags: ["meta", "obsidian", "learning"]
description: "Live view of the vault: today's study plan, missed tasks, and habit streaks."
showToc: false
---

# Dashboard

The learning OS described in [the first post]({{< ref "/learning-os/building-my-learning-os" >}}) runs inside a private Obsidian vault. The vault handles everything: daily study plans, habit tracking, reading notes, a 6-month roadmap. This page is its public window.

When I built the learning OS I wanted some accountability surface: somewhere the work would be visible, not just tracked privately. The dashboard is that. It pulls from the vault's daily notes, so what you see here reflects what I actually planned and did, not a curated summary written after the fact.

Three things are shown: today's study plan, any tasks that were skipped in the past two weeks, and a full habit streak calendar going back to when tracking started. All of it is exported from the vault automatically and nothing is written by hand.

## Study plan

Today's scheduled tasks and any unchecked tasks from the past two weeks. Missed tasks are not automatically rescheduled: they surface here so they can be picked up deliberately or dropped.

{{< dashboard-panels >}}

## Habit streaks

Three habits are tracked in every daily note using a callout block:

```
> [!habits]+ Habits
> - [x] German
> - [ ] Data Engineering
> - [ ] Training
```

Checking a box registers the session for that day. The calendar below is built from that data: each row is one habit, each square is one day. Coloured means done, grey means not.

{{< habit-calendar >}}
