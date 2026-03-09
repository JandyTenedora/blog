#!/usr/bin/env node
/**
 * export-graph.js
 * Parses an Obsidian vault and exports its link graph as JSON for D3.js.
 *
 * Usage:
 *   node scripts/export-graph.js /path/to/obsidian-vault
 *
 * Output:
 *   static/data/graph.json
 */

const fs = require('fs');
const path = require('path');

const vaultPath = process.argv[2];
if (!vaultPath) {
  console.error('Usage: node scripts/export-graph.js /path/to/obsidian-vault');
  process.exit(1);
}

const outputPath = path.join(__dirname, '..', 'static', 'data', 'graph.json');

// Walk directory recursively, return all .md file paths
function walkMd(dir) {
  const results = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name.startsWith('.')) continue; // skip .obsidian, .trash, etc.
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...walkMd(full));
    } else if (entry.isFile() && entry.name.endsWith('.md')) {
      results.push(full);
    }
  }
  return results;
}

// Extract note name from a file path (filename without extension)
function noteId(filePath) {
  return path.basename(filePath, '.md');
}

// Extract wikilinks [[target]] or [[target|alias]] or [[target#heading]]
const wikilinkRe = /\[\[([^\]|#]+)(?:[|#][^\]]*)?\]\]/g;
// Extract internal markdown links [text](target.md)
const mdlinkRe = /\[[^\]]*\]\(([^)]+\.md)(?:#[^)]*)?\)/g;

const files = walkMd(vaultPath);
const nodeSet = new Set();
const linkSet = new Set(); // "source|||target" to deduplicate

for (const file of files) {
  const source = noteId(file);
  nodeSet.add(source);

  const content = fs.readFileSync(file, 'utf8');

  // Wikilinks
  for (const match of content.matchAll(wikilinkRe)) {
    const target = match[1].trim();
    if (target && target !== source) {
      nodeSet.add(target);
      const key = [source, target].sort().join('|||');
      linkSet.add(JSON.stringify({ source, target }));
    }
  }

  // Markdown links
  for (const match of content.matchAll(mdlinkRe)) {
    const target = path.basename(match[1], '.md');
    if (target && target !== source) {
      nodeSet.add(target);
      linkSet.add(JSON.stringify({ source, target }));
    }
  }
}

const links = [...linkSet].map(s => JSON.parse(s));

// Compute degree for each node (number of connections)
const degree = {};
for (const node of nodeSet) degree[node] = 0;
for (const { source, target } of links) {
  degree[source] = (degree[source] || 0) + 1;
  degree[target] = (degree[target] || 0) + 1;
}

const nodes = [...nodeSet].map(id => ({ id, degree: degree[id] || 0 }));

const graph = { nodes, links };
fs.writeFileSync(outputPath, JSON.stringify(graph, null, 2));

console.log(`Graph exported: ${nodes.length} nodes, ${links.length} links`);
console.log(`Output: ${outputPath}`);
