/**
 * Fix future-dated articles by reassigning them to available past dates.
 * Run once: node scripts/fix-future-dates.js
 */

const fs = require("fs");
const path = require("path");

const articlesDir = path.join(__dirname, "..", "lib", "articles");
const TODAY = "2026-06-28";

// Collect all existing dateISO values
const files = fs.readdirSync(articlesDir).filter(f => f.endsWith(".js") && f !== "index.js");
const takenDates = new Set();
const futureArticles = [];

for (const file of files) {
  const content = fs.readFileSync(path.join(articlesDir, file), "utf8");
  const m = content.match(/dateISO:\s*"([^"]+)"/);
  if (!m) continue;
  const iso = m[1];
  if (iso > TODAY) {
    futureArticles.push({ file, iso });
  } else {
    takenDates.add(iso);
  }
}

// Sort future articles by their current date (preserve relative order)
futureArticles.sort((a, b) => a.iso.localeCompare(b.iso));

console.log(`Found ${futureArticles.length} future-dated articles.`);
console.log(`Found ${takenDates.size} valid past dates already taken.\n`);

// Generate available past dates (walk backwards from TODAY)
function addDays(dateStr, days) {
  const d = new Date(dateStr + "T12:00:00Z");
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().split("T")[0];
}

const availableDates = [];
let candidate = TODAY;
// Walk back up to 365 days to find enough slots
for (let i = 1; i <= 365 && availableDates.length < futureArticles.length; i++) {
  candidate = addDays(TODAY, -i);
  if (!takenDates.has(candidate)) {
    availableDates.push(candidate);
  }
}

// Reverse so earliest available date is first (preserves relative order)
availableDates.reverse();

// Take only as many as we need
const assignedDates = availableDates.slice(availableDates.length - futureArticles.length);

if (assignedDates.length < futureArticles.length) {
  console.error("ERROR: Not enough available past dates!");
  process.exit(1);
}

// Format display date: "Month Day, Year"
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

function formatDisplayDate(iso) {
  const [y, m, d] = iso.split("-");
  return `${MONTHS[parseInt(m, 10) - 1]} ${parseInt(d, 10)}, ${y}`;
}

// Format old display date from old ISO (to find and replace)
function getOldDisplayDate(filePath) {
  const content = fs.readFileSync(filePath, "utf8");
  const m = content.match(/date:\s*"([^"]+)"/);
  return m ? m[1] : null;
}

// Apply fixes
console.log("Reassigning dates:\n");
console.log("Article".padEnd(55) + "Old Date".padEnd(14) + "New Date".padEnd(14) + "Display Date");
console.log("-".repeat(100));

for (let i = 0; i < futureArticles.length; i++) {
  const { file, iso: oldISO } = futureArticles[i];
  const newISO = assignedDates[i];
  const newDisplay = formatDisplayDate(newISO);
  const filePath = path.join(articlesDir, file);

  let content = fs.readFileSync(filePath, "utf8");

  // Get the old display date from file
  const oldDisplay = getOldDisplayDate(filePath);

  // Replace dateISO
  content = content.replace(
    new RegExp(`dateISO:\\s*"${oldISO.replace(/[-]/g, "\\-")}"`),
    `dateISO: "${newISO}"`
  );

  // Replace dateModified if it matches the old ISO
  content = content.replace(
    new RegExp(`dateModified:\\s*"${oldISO.replace(/[-]/g, "\\-")}"`),
    `dateModified: "${newISO}"`
  );

  // Replace display date
  if (oldDisplay) {
    content = content.replace(
      new RegExp(`date:\\s*"${oldDisplay.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}"`),
      `date: "${newDisplay}"`
    );
  }

  fs.writeFileSync(filePath, content, "utf8");

  const slug = file.replace(".js", "");
  console.log(slug.padEnd(55) + oldISO.padEnd(14) + newISO.padEnd(14) + newDisplay);
}

console.log(`\nDone. Fixed ${futureArticles.length} articles.`);
