/**
 * Reassigns out-of-range article dates to available slots
 * between 2026-03-01 and 2026-06-28.
 */
const fs = require("fs");
const path = require("path");

const DIR = path.join(__dirname, "..", "lib", "articles");
const START = new Date("2026-03-01");
const END = new Date("2026-06-28");

// Build list of all dates in range
function getAllDatesInRange() {
  const dates = [];
  const d = new Date(START);
  while (d <= END) {
    dates.push(d.toISOString().slice(0, 10));
    d.setDate(d.getDate() + 1);
  }
  return dates;
}

// Read all article dates
function getArticleDates() {
  const files = fs.readdirSync(DIR).filter(f => f.endsWith(".js") && f !== "index.js");
  const articles = [];
  for (const f of files) {
    const content = fs.readFileSync(path.join(DIR, f), "utf8");
    const m = content.match(/dateISO:\s*["']([^"']+)["']/);
    if (m) {
      articles.push({ file: f, slug: f.replace(".js", ""), date: m[1] });
    }
  }
  return articles;
}

// Format date as "Month Day, Year"
function formatDate(iso) {
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const [y, m, d] = iso.split("-").map(Number);
  return `${months[m - 1]} ${d}, ${y}`;
}

const allDates = getAllDatesInRange();
const articles = getArticleDates();

// Find taken dates (articles already in range)
const takenDates = new Set(
  articles.filter(a => a.date >= "2026-03-01" && a.date <= "2026-06-28").map(a => a.date)
);

// Find available dates
const availableDates = allDates.filter(d => !takenDates.has(d));

// Find articles that need updating
const outOfRange = articles
  .filter(a => a.date < "2026-03-01" || a.date > "2026-06-28")
  .sort((a, b) => a.date.localeCompare(b.date));

console.log(`Articles to reassign: ${outOfRange.length}`);
console.log(`Available date slots: ${availableDates.length}`);

if (availableDates.length < outOfRange.length) {
  console.error("ERROR: Not enough available dates!");
  process.exit(1);
}

// Assign dates, spreading them evenly
const step = Math.floor(availableDates.length / outOfRange.length);
const assignments = [];

for (let i = 0; i < outOfRange.length; i++) {
  const idx = Math.min(i * step, availableDates.length - 1);
  assignments.push({
    ...outOfRange[i],
    newDate: availableDates[idx],
  });
}

// Sort assignments by new date to verify no collisions
const newDateSet = new Set();
for (const a of assignments) {
  if (newDateSet.has(a.newDate)) {
    console.error(`COLLISION on ${a.newDate}!`);
    process.exit(1);
  }
  newDateSet.add(a.newDate);
}

// Apply changes
for (const a of assignments) {
  const filePath = path.join(DIR, a.file);
  let content = fs.readFileSync(filePath, "utf8");

  const oldFormatted = content.match(/date:\s*["']([^"']+)["']/)?.[1];
  const newFormatted = formatDate(a.newDate);

  // Replace dateISO
  content = content.replace(
    /dateISO:\s*["'][^"']+["']/,
    `dateISO: "${a.newDate}"`
  );

  // Replace date (formatted)
  if (oldFormatted) {
    content = content.replace(
      `date: "${oldFormatted}"`,
      `date: "${newFormatted}"`
    );
  }

  // Replace dateModified to match
  content = content.replace(
    /dateModified:\s*["'][^"']+["']/,
    `dateModified: "${a.newDate}"`
  );

  fs.writeFileSync(filePath, content, "utf8");
  console.log(`${a.slug}: ${a.date} -> ${a.newDate} (${newFormatted})`);
}

console.log(`\nDone. ${assignments.length} articles updated.`);
