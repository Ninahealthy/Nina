#!/usr/bin/env node
/**
 * Pinterest Pin Publisher for Nina
 *
 * Reads article data from lib/, constructs keyword-optimized pin payloads,
 * and publishes them to category-mapped Pinterest boards via API v5.
 * Tracks all published pins in pin-log.json to prevent duplicates.
 *
 * Usage:
 *   node scripts/pinterest/publish.js --dry-run --all
 *   node scripts/pinterest/publish.js --slug the-kindness-of-routine
 *   node scripts/pinterest/publish.js --all --batch 10
 *
 * Run with --help for the full option list.
 *
 * @module publish
 */
'use strict';

const fs = require('node:fs');
const path = require('node:path');
const { loadAllData } = require('./data-loader');
const { getValidToken } = require('./auth');
const { getOrCreateBoards, getBoardIdForCategory } = require('./boards');
const { request, parseRateLimits, sleep } = require('./api-client');

const LOG_PATH = path.join(__dirname, 'pin-log.json');
const DEFAULT_BATCH = 15;
const DEFAULT_DELAY = 2000;

// ---------------------------------------------------------------------------
// Pin Log
// ---------------------------------------------------------------------------

/** Read (or initialize) the tracking log. */
function readLog() {
  if (!fs.existsSync(LOG_PATH)) {
    const empty = { boards: {}, pins: {} };
    fs.writeFileSync(LOG_PATH, JSON.stringify(empty, null, 2), 'utf-8');
    return empty;
  }
  return JSON.parse(fs.readFileSync(LOG_PATH, 'utf-8'));
}

/** Persist the tracking log to disk. */
function writeLog(log) {
  fs.writeFileSync(LOG_PATH, JSON.stringify(log, null, 2), 'utf-8');
}

// ---------------------------------------------------------------------------
// Pin Payload Construction
// ---------------------------------------------------------------------------

/**
 * Assemble a Pinterest description from article data.
 *
 * Structure:
 *   [card excerpt or lead]
 *   [tags as keyword phrases, pipe-separated]
 *   Read more at ninahealthy.com
 *
 * Capped at 500 characters (Pinterest limit).
 *
 * @param {Object} article
 * @returns {string}
 */
function buildDescription(article) {
  const parts = [];

  // Lead with the card excerpt (punchier than the lead field)
  if (article.cardExcerpt) {
    parts.push(article.cardExcerpt);
  } else if (article.lead) {
    parts.push(article.lead);
  }

  // Tags as a lightweight keyword line
  if (article.tags && article.tags.length > 0) {
    parts.push(article.tags.slice(0, 4).join(' | '));
  }

  parts.push('Read more at ninahealthy.com');

  const full = parts.join('\n\n');
  if (full.length > 500) return full.slice(0, 497) + '...';
  return full;
}

/**
 * Build the pin title. Pinterest caps this at 100 characters.
 * Appends the brand name when space allows.
 *
 * @param {string} title - Article title
 * @returns {string}
 */
function buildTitle(title) {
  const branded = `${title} | Nina`;
  return branded.length <= 100 ? branded : title.slice(0, 100);
}

/**
 * Construct the complete Pinterest API payload for one pin.
 *
 * @param {Object} article - Enriched article object (includes slug, cardImage)
 * @param {string} boardId - Destination board ID
 * @param {string} siteUrl - e.g. "https://ninahealthy.com"
 * @returns {Object} Body for POST /v5/pins
 */
function buildPayload(article, boardId, siteUrl) {
  if (!article.cardImage) {
    throw new Error(`No card image for slug "${article.slug}"`);
  }

  return {
    board_id: boardId,
    title: buildTitle(article.title),
    description: buildDescription(article),
    link: `${siteUrl}/journal/${article.slug}`,
    media_source: {
      source_type: 'image_url',
      url: `${siteUrl}${article.cardImage}`,
    },
  };
}

// ---------------------------------------------------------------------------
// CLI
// ---------------------------------------------------------------------------

function parseArgs() {
  const args = process.argv.slice(2);
  const opts = {
    dryRun: false,
    sandbox: false,
    slug: null,
    all: false,
    force: false,
    batch: DEFAULT_BATCH,
    delay: DEFAULT_DELAY,
    help: false,
  };

  for (let i = 0; i < args.length; i++) {
    switch (args[i]) {
      case '--dry-run':
        opts.dryRun = true;
        break;
      case '--sandbox':
        opts.sandbox = true;
        break;
      case '--slug':
        opts.slug = args[++i];
        break;
      case '--all':
        opts.all = true;
        break;
      case '--force':
        opts.force = true;
        break;
      case '--batch':
        opts.batch = parseInt(args[++i], 10) || DEFAULT_BATCH;
        break;
      case '--delay':
        opts.delay = parseInt(args[++i], 10) || DEFAULT_DELAY;
        break;
      case '--help':
      case '-h':
        opts.help = true;
        break;
      default:
        console.error(`Unknown option: ${args[i]}`);
        process.exit(1);
    }
  }

  return opts;
}

function printHelp() {
  console.log(`
Pinterest Pin Publisher for Nina
========================================

Usage:
  node scripts/pinterest/publish.js [options]

Options:
  --dry-run          Preview pin payloads without posting to Pinterest
  --sandbox          Use sandbox API (required for Trial access apps)
  --slug <slug>      Publish a single article by its URL slug
  --all              Publish all articles not yet in pin-log.json
  --force            Re-publish articles that are already logged
  --batch <n>        Max pins per run (default: ${DEFAULT_BATCH})
  --delay <ms>       Delay between API calls in ms (default: ${DEFAULT_DELAY})
  -h, --help         Show this help message

Examples:
  node scripts/pinterest/publish.js --sandbox --slug the-kindness-of-routine
  node scripts/pinterest/publish.js --dry-run --all
  node scripts/pinterest/publish.js --all --batch 10 --delay 3000
  node scripts/pinterest/publish.js --slug sleep-as-surrender --force
`);
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  const opts = parseArgs();

  if (opts.help) {
    printHelp();
    return;
  }

  if (!opts.slug && !opts.all) {
    console.error('Error: provide --slug <slug> or --all');
    console.error('Run with --help for usage information.');
    process.exit(1);
  }

  console.log('\n=== Pinterest Pin Publisher ===\n');
  if (opts.sandbox) console.log('  [SANDBOX MODE] Using api-sandbox.pinterest.com\n');

  // ---- 1. Load data -------------------------------------------------------
  console.log('1. Loading article data...');
  const { articles, site, slugs } = loadAllData();
  const total = Object.keys(articles).length;
  console.log(`   ${total} articles loaded from lib/\n`);

  // ---- 2. Determine targets ------------------------------------------------
  const log = readLog();
  let targets;

  if (opts.slug) {
    if (!articles[opts.slug]) {
      console.error(`Error: slug "${opts.slug}" not found.`);
      console.error(`Available: ${slugs.join(', ')}`);
      process.exit(1);
    }
    if (log.pins[opts.slug] && !opts.force) {
      console.log(
        `"${opts.slug}" was already published on ${log.pins[opts.slug].published_at}.`
      );
      console.log('Use --force to re-publish.');
      return;
    }
    targets = [opts.slug];
  } else {
    targets = slugs.filter((s) => {
      if (!articles[s]) return false;
      if (opts.force) return true;
      return !log.pins[s];
    });
  }

  if (targets.length === 0) {
    console.log('Nothing to publish. All articles are already pinned.');
    console.log('Use --force to re-publish.\n');
    return;
  }

  // Respect batch limit
  const batch = targets.slice(0, opts.batch);
  const remaining = targets.length - batch.length;

  console.log(
    `2. ${batch.length} pin(s) to publish` +
    (remaining > 0 ? ` (${remaining} deferred to next run)` : '') +
    (opts.dryRun ? ' [DRY RUN]' : '') +
    '\n'
  );

  // ---- 3. Authenticate ----------------------------------------------------
  let token;
  if (opts.dryRun) {
    token = 'dry-run-token';
    console.log('3. [DRY RUN] Skipping authentication\n');
  } else {
    console.log('3. Authenticating with Pinterest...');
    token = await getValidToken();
    console.log('   Authenticated.\n');
  }

  // ---- 4. Boards -----------------------------------------------------------
  console.log('4. Checking boards...');
  let boardMap;

  // Reuse cached board IDs only when all five are real (not dry-run placeholders)
  const cachedCategories = Object.keys(log.boards || {});
  const allReal = cachedCategories.length === 5 &&
    Object.values(log.boards).every((id) => /^\d+$/.test(id));

  if (allReal && !opts.dryRun) {
    boardMap = log.boards;
    console.log('   Using cached board IDs from pin-log.json\n');
  } else {
    boardMap = await getOrCreateBoards(token, opts.dryRun);
    log.boards = boardMap;
    writeLog(log);
    console.log('');
  }

  // ---- 5. Publish ----------------------------------------------------------
  console.log('5. Publishing pins...\n');
  let okCount = 0;
  let failCount = 0;

  for (let i = 0; i < batch.length; i++) {
    const slug = batch[i];
    const article = articles[slug];
    const progress = `[${i + 1}/${batch.length}]`;

    try {
      const boardId = getBoardIdForCategory(article.category, boardMap);
      const payload = buildPayload(article, boardId, site.url);

      // -- Dry run: just print --
      if (opts.dryRun) {
        console.log(`   ${progress} ${slug}`);
        console.log(`     Title:       ${payload.title}`);
        console.log(`     Board:       ${article.category}`);
        console.log(`     Link:        ${payload.link}`);
        console.log(`     Image:       ${payload.media_source.url}`);
        console.log(`     Description: ${payload.description.slice(0, 90)}...`);
        console.log('');
        okCount++;
        continue;
      }

      // -- Live publish --
      const res = await request({
        method: 'POST',
        path: 'pins',
        token,
        body: payload,
        useSandbox: opts.sandbox,
      });

      if (res.status === 201) {
        log.pins[slug] = {
          pin_id: res.data.id,
          board: article.category,
          published_at: new Date().toISOString(),
          link: payload.link,
        };
        writeLog(log);
        okCount++;
        console.log(`   ${progress} Published: ${slug} (pin ${res.data.id})`);
      } else if (res.status === 429) {
        // Rate-limited: wait and retry once
        const limits = parseRateLimits(res.headers);
        const waitSec = Math.max(limits.reset - Math.floor(Date.now() / 1000), 5);
        console.warn(`   ${progress} Rate-limited. Waiting ${waitSec}s...`);
        await sleep(waitSec * 1000);

        const retry = await request({
          method: 'POST',
          path: 'pins',
          token,
          body: payload,
          useSandbox: opts.sandbox,
        });

        if (retry.status === 201) {
          log.pins[slug] = {
            pin_id: retry.data.id,
            board: article.category,
            published_at: new Date().toISOString(),
            link: payload.link,
          };
          writeLog(log);
          okCount++;
          console.log(`   ${progress} Published (retry): ${slug} (pin ${retry.data.id})`);
        } else {
          failCount++;
          console.error(`   ${progress} Failed after retry: ${slug} (HTTP ${retry.status})`);
          console.error(`     ${JSON.stringify(retry.data)}`);
        }
      } else {
        failCount++;
        console.error(`   ${progress} Failed: ${slug} (HTTP ${res.status})`);
        console.error(`     ${JSON.stringify(res.data)}`);
      }

      // Courtesy delay; accelerate cooldown when rate limit is low
      const limits = parseRateLimits(res.headers);
      if (limits.remaining > 0 && limits.remaining < 5) {
        const cooldown = Math.max(limits.reset - Math.floor(Date.now() / 1000), 5);
        console.log(`   Rate limit low (${limits.remaining} left). Cooling down ${cooldown}s...`);
        await sleep(cooldown * 1000);
      } else {
        await sleep(opts.delay);
      }
    } catch (err) {
      failCount++;
      console.error(`   ${progress} Error on ${slug}: ${err.message}`);
    }
  }

  // ---- 6. Summary ----------------------------------------------------------
  console.log('\n=== Summary ===');
  console.log(`  Published:  ${okCount}`);
  console.log(`  Failed:     ${failCount}`);
  if (remaining > 0) {
    console.log(`  Remaining:  ${remaining} (run again for the next batch)`);
  }
  console.log('');
}

main().catch((err) => {
  console.error('\nFatal error:', err.message);
  process.exit(1);
});
