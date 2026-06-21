/**
 * Pinterest board management.
 *
 * Maps Nina's five editorial categories to Pinterest boards
 * with keyword-optimized titles and descriptions for discoverability.
 *
 * @module boards
 */
'use strict';

const { request, sleep } = require('./api-client');

/**
 * Board definitions keyed by editorial category.
 * Titles carry searchable keywords that the poetic category names omit.
 * Descriptions are written for the Pinterest search crawler.
 */
const BOARD_CONFIGS = {
  'Still Point': {
    name: 'Still Point: Presence and Attention',
    description:
      'Mindfulness practices, present-moment awareness, attention training, ' +
      'and the art of slowing down. Essays on noticing, stillness, and quiet ' +
      'focus from Nina.',
  },
  'The Body Knows': {
    name: 'The Body Knows: Embodied Living',
    description:
      'Body awareness, nervous system health, embodied living, breathwork ' +
      'practice, and what your body is trying to tell you. Somatic practices ' +
      'for everyday life from Nina.',
  },
  'Quiet Architecture': {
    name: 'Quiet Architecture: Routines and Rituals',
    description:
      'Morning routines, daily rituals, seasonal living, kitchen rituals, ' +
      'evening routines, and the small structures that hold a life together. ' +
      'From Nina.',
  },
  'Inner Weather': {
    name: 'Inner Weather: The Emotional Life',
    description:
      'Emotional wellness, processing grief, understanding anger, sitting ' +
      'with discomfort, and navigating the inner emotional landscape with ' +
      'honesty and gentleness. From Nina.',
  },
  'Chosen Life': {
    name: 'Chosen Life: Boundaries and Decisions',
    description:
      'Setting boundaries, intentional living, saying no, digital minimalism, ' +
      'and the conscious design of how you spend your time, energy, and ' +
      'attention. From Nina.',
  },
};

/**
 * Fetch every board owned by the authenticated Pinterest account.
 * Handles pagination automatically.
 *
 * @param {string} token - Valid access token
 * @returns {Promise<Object[]>} All board objects
 */
async function listBoards(token) {
  const boards = [];
  let bookmark = null;

  do {
    const qs = bookmark ? `?bookmark=${encodeURIComponent(bookmark)}` : '';
    const res = await request({
      method: 'GET',
      path: `boards${qs}`,
      token,
    });

    if (res.status !== 200) {
      throw new Error(
        `Failed to list boards (HTTP ${res.status}): ${JSON.stringify(res.data)}`
      );
    }

    if (res.data.items) boards.push(...res.data.items);
    bookmark = res.data.bookmark || null;
  } while (bookmark);

  return boards;
}

/**
 * Create a single public board.
 *
 * @param {string} token
 * @param {string} name
 * @param {string} description
 * @returns {Promise<Object>} The created board object (includes .id)
 */
async function createBoard(token, name, description) {
  const res = await request({
    method: 'POST',
    path: 'boards',
    token,
    body: { name, description, privacy: 'PUBLIC' },
  });

  if (res.status !== 201) {
    throw new Error(
      `Failed to create board "${name}" (HTTP ${res.status}): ` +
      JSON.stringify(res.data)
    );
  }

  return res.data;
}

/**
 * Ensure all five category boards exist on the Pinterest account.
 * Creates any that are missing. Returns a lookup map.
 *
 * @param {string}  token
 * @param {boolean} [dryRun=false] - If true, log actions without calling the API
 * @returns {Promise<Record<string, string>>} Map of category name to board_id
 */
async function getOrCreateBoards(token, dryRun = false) {
  const existing = dryRun ? [] : await listBoards(token);
  const map = {};

  for (const [category, config] of Object.entries(BOARD_CONFIGS)) {
    const match = existing.find(
      (b) => b.name.toLowerCase() === config.name.toLowerCase()
    );

    if (match) {
      map[category] = match.id;
      console.log(`  Board exists: "${config.name}" (${match.id})`);
    } else if (dryRun) {
      map[category] = `dry-run-${category.toLowerCase().replace(/\s+/g, '-')}`;
      console.log(`  [DRY RUN] Would create board: "${config.name}"`);
    } else {
      const board = await createBoard(token, config.name, config.description);
      map[category] = board.id;
      console.log(`  Created board: "${config.name}" (${board.id})`);
      // Small delay between board creation calls
      await sleep(500);
    }
  }

  return map;
}

/**
 * Look up the board ID for a given article category.
 *
 * @param {string} category - One of the five editorial category names
 * @param {Record<string, string>} boardMap - Category-to-board-ID map
 * @returns {string} board_id
 */
function getBoardIdForCategory(category, boardMap) {
  const id = boardMap[category];
  if (!id) {
    throw new Error(
      `No board mapped for category "${category}". ` +
      `Known categories: ${Object.keys(boardMap).join(', ')}`
    );
  }
  return id;
}

module.exports = { BOARD_CONFIGS, getOrCreateBoards, getBoardIdForCategory, listBoards };
