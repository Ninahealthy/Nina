/**
 * Content Health Report
 *
 * Generates a structured editorial health analysis of Nina's article library.
 * Run quarterly (or after any batch of new articles) to surface imbalances
 * in category distribution, voice mode, structure type, emotional register,
 * hook type, word count, and citation coverage.
 *
 * Usage: node scripts/content-health-report.js
 * Output: Markdown report printed to stdout.
 *
 * @module content-health-report
 */

const fs = require("fs");
const path = require("path");

const articlesDir = path.join(__dirname, "..", "lib", "articles");

// --- Parse all articles ---

const files = fs
  .readdirSync(articlesDir)
  .filter((f) => f.endsWith(".js") && f !== "index.js")
  .sort();

const articles = [];

for (const file of files) {
  const filePath = path.join(articlesDir, file);
  const content = fs.readFileSync(filePath, "utf8");
  const slug = file.replace(".js", "");

  // Extract metadata fields via regex (avoids require/import issues)
  const get = (field) => {
    const m = content.match(new RegExp(`${field}:\\s*"([^"]+)"`));
    return m ? m[1] : null;
  };

  const getArray = (field) => {
    const m = content.match(new RegExp(`${field}:\\s*\\[([^\\]]+)\\]`));
    if (!m) return [];
    return m[1].match(/"([^"]+)"/g)?.map((s) => s.replace(/"/g, "")) || [];
  };

  // Rough word count from content blocks
  const textMatches = content.match(/text:\s*"([^"]+)"/g) || [];
  const wordCount = textMatches
    .map((t) => t.replace(/^text:\s*"/, "").replace(/"$/, ""))
    .join(" ")
    .split(/\s+/).length;

  const citationCount = (content.match(/citationMode:/g) || []).length;

  articles.push({
    slug,
    title: get("title"),
    category: get("category"),
    hookType: get("hookType"),
    emotionalRegister: get("emotionalRegister"),
    voiceMode: get("voiceMode"),
    structureType: get("structureType"),
    dateISO: get("dateISO"),
    contentNote: content.includes("contentNote: null") ? null : "present",
    wordCount,
    citationCount,
    tags: getArray("tags"),
  });
}

// --- Distribution helpers ---

function distribution(arr, field) {
  const counts = {};
  for (const item of arr) {
    const val = item[field] || "unknown";
    counts[val] = (counts[val] || 0) + 1;
  }
  return Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .map(([key, count]) => ({
      key,
      count,
      pct: ((count / arr.length) * 100).toFixed(1),
    }));
}

function formatDist(dist, targets = {}) {
  let out = "| Value | Count | % | Target | Status |\n|---|---|---|---|---|\n";
  for (const { key, count, pct } of dist) {
    const target = targets[key];
    let status = "";
    if (target) {
      const [lo, hi] = target;
      const p = parseFloat(pct);
      if (p < lo) status = "BELOW";
      else if (p > hi) status = "ABOVE";
      else status = "OK";
    }
    out += `| ${key} | ${count} | ${pct}% | ${target ? `${target[0]}-${target[1]}%` : "-"} | ${status} |\n`;
  }
  return out;
}

// --- Generate report ---

const now = new Date().toISOString().split("T")[0];
const total = articles.length;

// Category distribution (cap: 30%)
const catDist = distribution(articles, "category");
const catTargets = {};
for (const { key } of catDist) catTargets[key] = [0, 30];

// Voice mode targets from schema
const voiceTargets = {
  reflective: [25, 35],
  searching: [25, 35],
  fierce: [10, 20],
  raw: [5, 15],
  playful: [10, 20],
};

// Structure type targets
const structTargets = {
  "classic-arc": [0, 40],
};

// Emotional register (no formal targets, just show distribution)
const emotDist = distribution(articles, "emotionalRegister");

// Hook type diversity
const hookDist = distribution(articles, "hookType");

// Word count analysis
const wordCounts = articles.map((a) => a.wordCount).sort((a, b) => a - b);
const avgWords = Math.round(
  wordCounts.reduce((s, w) => s + w, 0) / wordCounts.length
);
const medianWords = wordCounts[Math.floor(wordCounts.length / 2)];
const shortArticles = articles.filter((a) => a.wordCount < 1000);
const longArticles = articles.filter((a) => a.wordCount > 2000);

// Citation coverage
const noCitations = articles.filter((a) => a.citationCount === 0);
const singleCitation = articles.filter((a) => a.citationCount === 1);
const multiCitation = articles.filter((a) => a.citationCount >= 2);

// Content note coverage
const withNotes = articles.filter((a) => a.contentNote !== null);

// Age analysis
const recentArticles = articles.filter(
  (a) => a.dateISO && a.dateISO >= "2026-06-01"
);
const legacyArticles = articles.filter(
  (a) => a.dateISO && a.dateISO < "2026-06-01"
);

// --- Output ---

let report = `# Content Health Report

**Generated:** ${now}
**Total articles:** ${total}
**Recent (June 2026+):** ${recentArticles.length}
**Legacy (pre-June 2026):** ${legacyArticles.length}

---

## Category Distribution

> Cap: no single category should exceed 30%.

${formatDist(catDist, catTargets)}

---

## Voice Mode Distribution

${formatDist(distribution(articles, "voiceMode"), voiceTargets)}

---

## Structure Type Distribution

${formatDist(distribution(articles, "structureType"), structTargets)}

---

## Emotional Register Distribution

${formatDist(emotDist)}

---

## Hook Type Distribution

${formatDist(hookDist)}

---

## Word Count

| Metric | Value |
|---|---|
| Average | ${avgWords} words |
| Median | ${medianWords} words |
| Shortest | ${wordCounts[0]} words |
| Longest | ${wordCounts[wordCounts.length - 1]} words |
| Below 1,000 words | ${shortArticles.length} articles |
| Above 2,000 words | ${longArticles.length} articles |

`;

if (shortArticles.length > 0) {
  report += `### Articles below 1,000 words\n\n`;
  for (const a of shortArticles.sort((x, y) => x.wordCount - y.wordCount)) {
    report += `- **${a.title}** (${a.slug}): ${a.wordCount} words\n`;
  }
  report += "\n";
}

report += `---

## Citation Coverage

| Metric | Count |
|---|---|
| No citations | ${noCitations.length} |
| Single citation | ${singleCitation.length} |
| 2+ citations | ${multiCitation.length} |
| Content notes present | ${withNotes.length} of ${total} |

`;

if (noCitations.length > 0) {
  report += `### Articles with no citations\n\n`;
  for (const a of noCitations) {
    report += `- ${a.title} (${a.slug})\n`;
  }
  report += "\n";
}

report += `---

## Flags

`;

// Flag any issues
const flags = [];

for (const { key, pct } of distribution(articles, "category")) {
  if (parseFloat(pct) > 30) {
    flags.push(`Category "${key}" is at ${pct}% (above 30% cap)`);
  }
}

const playful = distribution(articles, "voiceMode").find(
  (d) => d.key === "playful"
);
if (playful && parseFloat(playful.pct) < 10) {
  flags.push(
    `Voice mode "playful" is at ${playful.pct}% (below 10% minimum target)`
  );
}

const classicArc = distribution(articles, "structureType").find(
  (d) => d.key === "classic-arc"
);
if (classicArc && parseFloat(classicArc.pct) > 40) {
  flags.push(
    `Structure type "classic-arc" is at ${classicArc.pct}% (above 40% cap)`
  );
}

if (shortArticles.length > 0) {
  flags.push(
    `${shortArticles.length} articles are below 1,000 words (potential quality floor issue)`
  );
}

if (flags.length === 0) {
  report += "No flags. All metrics within healthy ranges.\n";
} else {
  for (const flag of flags) {
    report += `- ${flag}\n`;
  }
}

report += `\n---\n\n*Run this report quarterly or after publishing 5+ new articles.*\n`;

console.log(report);
