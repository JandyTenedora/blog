#!/usr/bin/env node
/**
 * export-tasks.js
 * Parses Obsidian vault daily notes and exports today's study plan
 * and missed (unchecked) tasks from the past 14 days.
 *
 * Usage:
 *   node scripts/export-tasks.js /path/to/obsidian-vault
 *
 * Output:
 *   static/data/tasks.json
 */

const fs = require('fs');
const path = require('path');

const vaultPath = process.argv[2];
if (!vaultPath) {
  console.error('Usage: node scripts/export-tasks.js /path/to/obsidian-vault');
  process.exit(1);
}

const outputPath = path.join(__dirname, '..', 'static', 'data', 'tasks.json');

function dailyNotePath(dateStr) {
  // dateStr: "YYYY-MM-DD"
  const [year, month] = dateStr.split('-');
  return path.join(vaultPath, 'Daily Notes', year, `${year}-${month}`, `${dateStr}.md`);
}

function toISO(d) {
  return d.getFullYear() + '-' +
    String(d.getMonth() + 1).padStart(2, '0') + '-' +
    String(d.getDate()).padStart(2, '0');
}

// Extract display title from a task line
// Task format: - [ ] **[[path|Display]]** (~90 min): description
// or:          - [ ] **Display** (~90 min): description
function parseTaskLine(line) {
  // Extract checked state
  const doneMatch = line.match(/^- \[(x| )\]/);
  if (!doneMatch) return null;
  const done = doneMatch[1] === 'x';

  // Extract title: content between ** markers, stripping wikilinks
  const titleMatch = line.match(/\*\*(.+?)\*\*/);
  if (!titleMatch) return null;
  let title = titleMatch[1];

  // Strip wikilink: [[path|Display]] -> Display, [[path]] -> path (basename)
  title = title.replace(/\[\[([^\]|]+)\|([^\]]+)\]\]/g, '$2');
  title = title.replace(/\[\[([^\]]+)\]\]/g, (_, p) => path.basename(p));

  // Extract duration (~N min)
  const durMatch = line.match(/\(~?\d+\s*min\)/);
  const duration = durMatch ? durMatch[0].replace(/[()]/g, '') : null;

  return { title: title.trim(), done, duration };
}

// Parse a daily note file into structured data
function parseNote(dateStr) {
  const filePath = dailyNotePath(dateStr);
  if (!fs.existsSync(filePath)) return null;

  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');

  let focus = null;
  let sections = [];
  let currentSection = null;
  let inFocusCallout = false;
  let inStudyPlan = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Detect ## Study Plan
    if (/^## Study Plan/.test(line)) {
      inStudyPlan = true;
      continue;
    }

    // Stop at next ## heading (Study Log, Reading Notes, etc.)
    if (inStudyPlan && /^## /.test(line)) {
      inStudyPlan = false;
      inFocusCallout = false;
      continue;
    }

    if (!inStudyPlan) continue;

    // Focus callout
    if (/>\s*\[!tip\]/.test(line)) {
      inFocusCallout = true;
      continue;
    }
    if (inFocusCallout && /^>\s/.test(line)) {
      const text = line.replace(/^>\s*/, '').trim();
      if (text) focus = focus ? focus + ' ' + text : text;
      continue;
    }
    if (inFocusCallout && !/^>/.test(line)) {
      inFocusCallout = false;
    }

    // ### Section heading
    const secMatch = line.match(/^###\s+(.+)/);
    if (secMatch) {
      const secName = secMatch[1].replace(/\s*\(~?\d+\s*min\)/, '').trim();
      // Skip the Notes section (it contains prose, not tasks)
      if (secName.toLowerCase() === 'notes') {
        currentSection = null;
      } else {
        currentSection = { name: secName, tasks: [] };
        sections.push(currentSection);
      }
      continue;
    }

    // Task line
    if (currentSection && /^- \[/.test(line)) {
      const task = parseTaskLine(line);
      if (task) currentSection.tasks.push(task);
    }
  }

  // Remove sections with no tasks
  sections = sections.filter(s => s.tasks.length > 0);

  return { date: dateStr, focus, sections };
}

// Find the most recent daily note up to today
const today = new Date();
today.setHours(0, 0, 0, 0);

let todayNote = null;
for (let i = 0; i <= 7; i++) {
  const d = new Date(today);
  d.setDate(d.getDate() - i);
  const iso = toISO(d);
  const note = parseNote(iso);
  if (note) {
    todayNote = note;
    break;
  }
}

// Collect missed tasks: unchecked tasks from notes before today's note, up to 14 days back
const missedEntries = [];
if (todayNote) {
  const startFrom = new Date(todayNote.date);
  startFrom.setDate(startFrom.getDate() - 1);

  for (let i = 0; i < 14; i++) {
    const d = new Date(startFrom);
    d.setDate(d.getDate() - i);
    const iso = toISO(d);
    const note = parseNote(iso);
    if (!note) continue;

    const missedTasks = [];
    for (const section of note.sections) {
      for (const task of section.tasks) {
        if (!task.done) {
          missedTasks.push({ title: task.title, section: section.name, duration: task.duration });
        }
      }
    }

    if (missedTasks.length > 0) {
      missedEntries.push({ date: iso, tasks: missedTasks });
    }
  }
}

const output = {
  today: todayNote,
  missed: missedEntries,
};

fs.writeFileSync(outputPath, JSON.stringify(output, null, 2));
console.log(`Tasks exported: today=${todayNote ? todayNote.date : 'none'}, missed entries=${missedEntries.length}`);
console.log(`Output: ${outputPath}`);
