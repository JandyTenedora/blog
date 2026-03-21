---
title: "00 — Dashboard"
date: 2026-03-21
weight: 0
draft: false
tags: ["meta", "obsidian", "learning"]
description: "A static render of the Obsidian vault homepage — habit streaks, missed tasks, and the deep-systems project roadmap."
showToc: false
---

A static snapshot of the Obsidian vault canvas. The canvas has five zones: today's tasks, missed tasks from the last two weeks, three habit calendars, and the full learning roadmap. Reproduced here as of 2026-03-21.

<style>
.db-canvas { font-family: et-book, Palatino, "Palatino Linotype", Georgia, serif; margin: 1.5rem 0; }
.db-row { display: grid; gap: 1rem; margin-bottom: 1rem; }
.db-row--top { grid-template-columns: 3fr 2fr; }
.db-row--habits { grid-template-columns: 1fr 1fr 1fr; }
.db-panel {
  border: 1px solid #e0e0d8;
  background: #fffff8;
  padding: 1rem 1.2rem;
  border-radius: 2px;
}
.db-panel h3 {
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: #888;
  margin: 0 0 0.8rem 0;
  font-weight: normal;
  border-bottom: 1px solid #e0e0d8;
  padding-bottom: 0.4rem;
}
.db-task {
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  font-size: 0.85rem;
  line-height: 1.5;
  margin-bottom: 0.35rem;
  color: #333;
}
.db-task input[type=checkbox] { margin-top: 0.25rem; flex-shrink: 0; accent-color: #a00000; }
.db-task.done { color: #aaa; text-decoration: line-through; }
.db-missed-day { margin-bottom: 0.8rem; }
.db-missed-day h4 { font-size: 0.78rem; color: #a00000; margin: 0 0 0.3rem 0; text-transform: uppercase; letter-spacing: 0.06em; font-weight: normal; }
.db-empty { font-size: 0.82rem; color: #aaa; font-style: italic; }

/* habit calendar */
.habit-label { font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.08em; color: #888; margin-bottom: 0.5rem; }
.habit-grid { display: grid; grid-template-columns: repeat(10, 1fr); gap: 3px; margin-bottom: 0.6rem; }
.habit-week { display: grid; grid-template-rows: repeat(7, 1fr); gap: 3px; }
.habit-cell {
  width: 100%;
  aspect-ratio: 1;
  border-radius: 50%;
  border: 1px solid #e0e0d8;
  background: #f5f5f0;
}
.habit-cell.done-german { background: #c49a9c; border-color: #c49a9c; }
.habit-cell.done-eng    { background: #7aa3c4; border-color: #7aa3c4; }
.habit-cell.done-train  { background: #c4bd7a; border-color: #c4bd7a; }
.habit-cell.future      { background: transparent; border-color: #e8e8e0; opacity: 0.4; }
.habit-stats { font-size: 0.78rem; color: #666; margin-top: 0.2rem; }

/* project tracker */
.db-projects { border: 1px solid #e0e0d8; background: #fffff8; padding: 1rem 1.2rem; margin-bottom: 1rem; border-radius: 2px; }
.db-projects h3 { font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.08em; color: #888; margin: 0 0 1rem 0; font-weight: normal; border-bottom: 1px solid #e0e0d8; padding-bottom: 0.4rem; }
.project-row { display: grid; grid-template-columns: 90px 1fr 60px; align-items: center; gap: 0.8rem; margin-bottom: 0.6rem; font-size: 0.82rem; }
.project-row .p-label { color: #111; font-weight: bold; }
.project-row .p-desc  { color: #555; }
.project-row .p-status { font-size: 0.75rem; text-align: right; }
.progress-bar { height: 6px; background: #e8e8e0; border-radius: 3px; overflow: hidden; margin-top: 3px; }
.progress-fill { height: 100%; background: #a00000; border-radius: 3px; }
.p-active  { color: #a00000; }
.p-pending { color: #aaa; }

/* gap checklist */
.db-gaps { border: 1px solid #e0e0d8; background: #fffff8; padding: 1rem 1.2rem; border-radius: 2px; }
.db-gaps h3 { font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.08em; color: #888; margin: 0 0 0.8rem 0; font-weight: normal; border-bottom: 1px solid #e0e0d8; padding-bottom: 0.4rem; }
.gap-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 0.3rem 1.5rem; }
.gap-item { display: flex; align-items: baseline; gap: 0.4rem; font-size: 0.82rem; color: #333; }
.gap-item.done { color: #aaa; text-decoration: line-through; }
.gap-item input[type=checkbox] { accent-color: #a00000; flex-shrink: 0; }

@media (max-width: 640px) {
  .db-row--top, .db-row--habits { grid-template-columns: 1fr; }
  .gap-grid { grid-template-columns: 1fr; }
  .project-row { grid-template-columns: 70px 1fr; }
  .project-row .p-status { display: none; }
}
</style>

<div class="db-canvas">

  <div class="db-row db-row--top">

    <div class="db-panel">
      <h3>Today — 2026-03-21</h3>
      <div class="db-task done">
        <input type="checkbox" checked disabled>
        <span>CS:APP Ch 1 — A Tour of Computer Systems ✓</span>
      </div>
      <div class="db-task">
        <input type="checkbox" disabled>
        <span>CS:APP Ch 2 — Data representation, types, two's complement</span>
      </div>
      <div class="db-task">
        <input type="checkbox" disabled>
        <span>German — Tagebuch entry (dative constructions, 5–7 sentences)</span>
      </div>
      <div class="db-task">
        <input type="checkbox" disabled>
        <span>Effective Java Ch 4 — Interfaces and composition</span>
      </div>
    </div>

    <div class="db-panel">
      <h3>Missed — last 14 days</h3>
      <div class="db-missed-day">
        <h4>Thu Mar 19</h4>
        <div class="db-task"><input type="checkbox" disabled><span>CS:APP Ch 2</span></div>
        <div class="db-task"><input type="checkbox" disabled><span>P1 M1 — Echo TCP server</span></div>
      </div>
      <div class="db-missed-day">
        <h4>Fri Mar 20</h4>
        <div class="db-task"><input type="checkbox" disabled><span>German — Tagebuch</span></div>
        <div class="db-task"><input type="checkbox" disabled><span>CS:APP Ch 3</span></div>
      </div>
    </div>

  </div>

  <div class="db-row db-row--habits">

    <div class="db-panel">
      <h3>German</h3>
      <div class="habit-grid">
        <div class="habit-week"><div class="habit-cell"></div><div class="habit-cell"></div><div class="habit-cell"></div><div class="habit-cell"></div><div class="habit-cell"></div><div class="habit-cell"></div><div class="habit-cell"></div></div>
        <div class="habit-week"><div class="habit-cell"></div><div class="habit-cell"></div><div class="habit-cell"></div><div class="habit-cell"></div><div class="habit-cell"></div><div class="habit-cell"></div><div class="habit-cell"></div></div>
        <div class="habit-week"><div class="habit-cell"></div><div class="habit-cell"></div><div class="habit-cell"></div><div class="habit-cell"></div><div class="habit-cell"></div><div class="habit-cell"></div><div class="habit-cell"></div></div>
        <div class="habit-week"><div class="habit-cell"></div><div class="habit-cell"></div><div class="habit-cell"></div><div class="habit-cell"></div><div class="habit-cell"></div><div class="habit-cell"></div><div class="habit-cell"></div></div>
        <div class="habit-week"><div class="habit-cell"></div><div class="habit-cell"></div><div class="habit-cell"></div><div class="habit-cell"></div><div class="habit-cell"></div><div class="habit-cell"></div><div class="habit-cell"></div></div>
        <div class="habit-week"><div class="habit-cell"></div><div class="habit-cell"></div><div class="habit-cell"></div><div class="habit-cell"></div><div class="habit-cell"></div><div class="habit-cell"></div><div class="habit-cell"></div></div>
        <div class="habit-week"><div class="habit-cell"></div><div class="habit-cell"></div><div class="habit-cell"></div><div class="habit-cell"></div><div class="habit-cell"></div><div class="habit-cell"></div><div class="habit-cell"></div></div>
        <div class="habit-week"><div class="habit-cell"></div><div class="habit-cell"></div><div class="habit-cell"></div><div class="habit-cell"></div><div class="habit-cell"></div><div class="habit-cell"></div><div class="habit-cell"></div></div>
        <div class="habit-week"><div class="habit-cell"></div><div class="habit-cell"></div><div class="habit-cell"></div><div class="habit-cell"></div><div class="habit-cell"></div><div class="habit-cell"></div><div class="habit-cell"></div></div>
        <div class="habit-week"><div class="habit-cell future"></div><div class="habit-cell future"></div><div class="habit-cell future"></div><div class="habit-cell future"></div><div class="habit-cell future"></div><div class="habit-cell future"></div><div class="habit-cell future"></div></div>
      </div>
      <div class="habit-stats">Each circle = one day (Mon–Sun). Filled = habit done.</div>
    </div>

    <div class="db-panel">
      <h3>Data Engineering</h3>
      <div class="habit-grid">
        <div class="habit-week"><div class="habit-cell"></div><div class="habit-cell"></div><div class="habit-cell"></div><div class="habit-cell"></div><div class="habit-cell"></div><div class="habit-cell"></div><div class="habit-cell"></div></div>
        <div class="habit-week"><div class="habit-cell"></div><div class="habit-cell"></div><div class="habit-cell"></div><div class="habit-cell"></div><div class="habit-cell"></div><div class="habit-cell"></div><div class="habit-cell"></div></div>
        <div class="habit-week"><div class="habit-cell"></div><div class="habit-cell"></div><div class="habit-cell"></div><div class="habit-cell"></div><div class="habit-cell"></div><div class="habit-cell"></div><div class="habit-cell"></div></div>
        <div class="habit-week"><div class="habit-cell"></div><div class="habit-cell"></div><div class="habit-cell"></div><div class="habit-cell"></div><div class="habit-cell"></div><div class="habit-cell"></div><div class="habit-cell"></div></div>
        <div class="habit-week"><div class="habit-cell"></div><div class="habit-cell"></div><div class="habit-cell"></div><div class="habit-cell"></div><div class="habit-cell"></div><div class="habit-cell"></div><div class="habit-cell"></div></div>
        <div class="habit-week"><div class="habit-cell"></div><div class="habit-cell"></div><div class="habit-cell"></div><div class="habit-cell"></div><div class="habit-cell"></div><div class="habit-cell"></div><div class="habit-cell"></div></div>
        <div class="habit-week"><div class="habit-cell"></div><div class="habit-cell"></div><div class="habit-cell"></div><div class="habit-cell"></div><div class="habit-cell"></div><div class="habit-cell"></div><div class="habit-cell"></div></div>
        <div class="habit-week"><div class="habit-cell"></div><div class="habit-cell"></div><div class="habit-cell"></div><div class="habit-cell"></div><div class="habit-cell"></div><div class="habit-cell"></div><div class="habit-cell"></div></div>
        <div class="habit-week"><div class="habit-cell"></div><div class="habit-cell"></div><div class="habit-cell"></div><div class="habit-cell"></div><div class="habit-cell"></div><div class="habit-cell"></div><div class="habit-cell"></div></div>
        <div class="habit-week"><div class="habit-cell future"></div><div class="habit-cell future"></div><div class="habit-cell future"></div><div class="habit-cell future"></div><div class="habit-cell future"></div><div class="habit-cell future"></div><div class="habit-cell future"></div></div>
      </div>
      <div class="habit-stats">10 weeks shown. Filled = habit done.</div>
    </div>

    <div class="db-panel">
      <h3>Training</h3>
      <div class="habit-grid">
        <div class="habit-week"><div class="habit-cell"></div><div class="habit-cell"></div><div class="habit-cell"></div><div class="habit-cell"></div><div class="habit-cell"></div><div class="habit-cell"></div><div class="habit-cell"></div></div>
        <div class="habit-week"><div class="habit-cell"></div><div class="habit-cell"></div><div class="habit-cell"></div><div class="habit-cell"></div><div class="habit-cell"></div><div class="habit-cell"></div><div class="habit-cell"></div></div>
        <div class="habit-week"><div class="habit-cell"></div><div class="habit-cell"></div><div class="habit-cell"></div><div class="habit-cell"></div><div class="habit-cell"></div><div class="habit-cell"></div><div class="habit-cell"></div></div>
        <div class="habit-week"><div class="habit-cell"></div><div class="habit-cell"></div><div class="habit-cell"></div><div class="habit-cell"></div><div class="habit-cell"></div><div class="habit-cell"></div><div class="habit-cell"></div></div>
        <div class="habit-week"><div class="habit-cell"></div><div class="habit-cell"></div><div class="habit-cell"></div><div class="habit-cell"></div><div class="habit-cell"></div><div class="habit-cell"></div><div class="habit-cell"></div></div>
        <div class="habit-week"><div class="habit-cell"></div><div class="habit-cell"></div><div class="habit-cell"></div><div class="habit-cell"></div><div class="habit-cell"></div><div class="habit-cell"></div><div class="habit-cell"></div></div>
        <div class="habit-week"><div class="habit-cell"></div><div class="habit-cell"></div><div class="habit-cell"></div><div class="habit-cell"></div><div class="habit-cell"></div><div class="habit-cell"></div><div class="habit-cell"></div></div>
        <div class="habit-week"><div class="habit-cell"></div><div class="habit-cell"></div><div class="habit-cell"></div><div class="habit-cell"></div><div class="habit-cell"></div><div class="habit-cell"></div><div class="habit-cell"></div></div>
        <div class="habit-week"><div class="habit-cell"></div><div class="habit-cell"></div><div class="habit-cell"></div><div class="habit-cell"></div><div class="habit-cell"></div><div class="habit-cell"></div><div class="habit-cell"></div></div>
        <div class="habit-week"><div class="habit-cell future"></div><div class="habit-cell future"></div><div class="habit-cell future"></div><div class="habit-cell future"></div><div class="habit-cell future"></div><div class="habit-cell future"></div><div class="habit-cell future"></div></div>
      </div>
      <div class="habit-stats">10 weeks shown. Filled = habit done.</div>
    </div>

  </div>

  <div class="db-projects">
    <h3>deep-systems — Project Map</h3>
    <div class="project-row">
      <span class="p-label">P1</span>
      <div>
        <div class="p-desc">HTTP server from raw TCP — Java M1–7 → Go M8–12</div>
        <div class="progress-bar"><div class="progress-fill" style="width:0%"></div></div>
      </div>
      <span class="p-status p-active">Active · 0/12</span>
    </div>
    <div class="project-row">
      <span class="p-label">P2</span>
      <div>
        <div class="p-desc">Relational database — B-tree, WAL, SQL parser, MVCC</div>
        <div class="progress-bar"><div class="progress-fill" style="width:0%"></div></div>
      </div>
      <span class="p-status p-pending">0/15</span>
    </div>
    <div class="project-row">
      <span class="p-label">P3</span>
      <div>
        <div class="p-desc">Message queue — ACKs, DLQ, pub/sub, task queue</div>
        <div class="progress-bar"><div class="progress-fill" style="width:0%"></div></div>
      </div>
      <span class="p-status p-pending">0/12</span>
    </div>
    <div class="project-row">
      <span class="p-label">P4</span>
      <div>
        <div class="p-desc">Connection pooler (PgBouncer-like) — session + transaction pooling</div>
        <div class="progress-bar"><div class="progress-fill" style="width:0%"></div></div>
      </div>
      <span class="p-status p-pending">0/10</span>
    </div>
    <div class="project-row">
      <span class="p-label">P5</span>
      <div>
        <div class="p-desc">Workflow orchestrator (Airflow-like) — DAG, scheduler, retry → OSS unlocked</div>
        <div class="progress-bar"><div class="progress-fill" style="width:0%"></div></div>
      </div>
      <span class="p-status p-pending">0/12</span>
    </div>
    <div class="project-row">
      <span class="p-label">P6</span>
      <div>
        <div class="p-desc">Distributed broker (Kafka-like) — partitions, replication, leader election</div>
        <div class="progress-bar"><div class="progress-fill" style="width:0%"></div></div>
      </div>
      <span class="p-status p-pending">0/14</span>
    </div>
    <div class="project-row">
      <span class="p-label">P7</span>
      <div>
        <div class="p-desc">Wide-column store (Cassandra-like) — LSM tree, consistent hashing, gossip</div>
        <div class="progress-bar"><div class="progress-fill" style="width:0%"></div></div>
      </div>
      <span class="p-status p-pending">0/17</span>
    </div>
  </div>

  <div class="db-gaps">
    <h3>Gap closure checklist — 1 / 24</h3>
    <div class="gap-grid">
      <div class="gap-item done"><input type="checkbox" checked disabled><span>CS:APP Ch 1</span></div>
      <div class="gap-item"><input type="checkbox" disabled><span>CS:APP Ch 2 — data representation</span></div>
      <div class="gap-item"><input type="checkbox" disabled><span>CS:APP Ch 3 — machine code, the stack</span></div>
      <div class="gap-item"><input type="checkbox" disabled><span>CS:APP Ch 8 — processes, ECF</span></div>
      <div class="gap-item"><input type="checkbox" disabled><span>CS:APP Ch 11 — sockets, network programming</span></div>
      <div class="gap-item"><input type="checkbox" disabled><span>CS:APP Ch 12 — threads, concurrency</span></div>
      <div class="gap-item"><input type="checkbox" disabled><span>Effective Java Ch 4 — interfaces, composition</span></div>
      <div class="gap-item"><input type="checkbox" disabled><span>Effective Java Ch 5 — generics</span></div>
      <div class="gap-item"><input type="checkbox" disabled><span>Effective Java Ch 7 — lambdas, streams</span></div>
      <div class="gap-item"><input type="checkbox" disabled><span>Effective Java Ch 11 — concurrency</span></div>
      <div class="gap-item"><input type="checkbox" disabled><span>Kurose Ch 1–2 — HTTP, application layer</span></div>
      <div class="gap-item"><input type="checkbox" disabled><span>Kurose Ch 8 — DDoS, network security</span></div>
      <div class="gap-item"><input type="checkbox" disabled><span>Kubernetes in Action Ch 1–10</span></div>
      <div class="gap-item"><input type="checkbox" disabled><span>Systems Performance Ch 1–3, 9 — USE method, I/O</span></div>
      <div class="gap-item"><input type="checkbox" disabled><span>Unix sysadmin — firewall + nginx chapters</span></div>
      <div class="gap-item"><input type="checkbox" disabled><span>SRE book Ch 21–22 — overload, retry patterns</span></div>
      <div class="gap-item"><input type="checkbox" disabled><span>P1 complete — HTTP built from scratch</span></div>
      <div class="gap-item"><input type="checkbox" disabled><span>Can write Java naturally</span></div>
      <div class="gap-item"><input type="checkbox" disabled><span>Can explain: process vs thread vs goroutine</span></div>
      <div class="gap-item"><input type="checkbox" disabled><span>Can explain: HTTP request/response lifecycle</span></div>
      <div class="gap-item"><input type="checkbox" disabled><span>Can explain: DDoS vs retry storm</span></div>
      <div class="gap-item"><input type="checkbox" disabled><span>Can explain: static vs dynamic typing</span></div>
      <div class="gap-item"><input type="checkbox" disabled><span>Can explain: USE method + iostat columns</span></div>
      <div class="gap-item"><input type="checkbox" disabled><span>Can configure: nginx as reverse proxy + iptables</span></div>
    </div>
  </div>

</div>
