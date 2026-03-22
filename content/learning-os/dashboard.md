---
title: "04 — Dashboard"
date: 2026-03-21
weight: 4
draft: false
tags: ["meta", "obsidian", "learning"]
description: "Habit streak calendar for German, Data Engineering, and Training."
showToc: false
---

Each row is one of the three tracked habits. Each square is one day. A coloured square means the habit was logged as done in the vault's daily note for that day. Grey means it wasn't. The calendar runs from the first logged entry to today.

Habits are tracked in the vault with a callout block at the top of every daily note:

```
> [!habits]+ Habits
> - [x] German
> - [ ] Data Engineering
> - [ ] Training
```

Checking a box registers the session. The `obsidian-tracker` plugin reads those checkboxes to compute streaks and completion rates. This calendar is a static export of that data, updated whenever the vault submodule is pushed.

{{< habit-calendar >}}
