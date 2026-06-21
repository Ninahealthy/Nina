/**
 * Article data loader for the Pinterest publisher.
 *
 * Reads article data, card images, card excerpts, and site config
 * from the Nina lib/ directory using the Node.js vm module.
 *
 * Why vm? The lib/ files use ESM `export` syntax, which Next.js handles
 * at build time. But the root package.json has no "type": "module", so
 * Node.js treats .js files as CommonJS and rejects the export keywords.
 * The vm module evaluates the raw source in a sandbox, bypassing the
 * module system entirely.
 *
 * @module data-loader
 */
'use strict';

const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const PROJECT_ROOT = path.resolve(__dirname, '..', '..');

/**
 * Read a JS source file, strip ESM syntax, and evaluate the result
 * of a closing expression in a sandbox.
 *
 * @param {string} filePath    - Absolute path to the .js file
 * @param {string} returnExpr  - JS expression appended after the source;
 *                                its value is returned
 * @returns {*} Result of evaluating returnExpr in the source context
 */
function evalFile(filePath, returnExpr) {
  let code = fs.readFileSync(filePath, 'utf-8');

  // Strip import statements (none expected today, but future-proofing)
  code = code.replace(/^import\s+.*?;\s*$/gm, '');

  // Strip export keywords while preserving variable declarations
  //   "export default article;"  ->  ""
  //   "export const FOO = ..."   ->  "const FOO = ..."
  code = code.replace(/export\s+default\s+\w+;?\s*$/m, '');
  code = code.replace(/export\s+/g, '');

  return vm.runInNewContext(`${code}\n${returnExpr};`, Object.create(null));
}

/**
 * Load all data the publisher needs: articles, card images,
 * card excerpts, entry order, and site config.
 *
 * @returns {{
 *   articles: Record<string, Object>,
 *   site: Object,
 *   slugs: string[]
 * }}
 */
function loadAllData() {
  const cardImages = evalFile(
    path.join(PROJECT_ROOT, 'lib', 'cardImages.js'),
    'CARD_IMAGES'
  );

  const cardExcerpts = evalFile(
    path.join(PROJECT_ROOT, 'lib', 'cardExcerpts.js'),
    'CARD_EXCERPTS'
  );

  const site = evalFile(
    path.join(PROJECT_ROOT, 'lib', 'siteConfig.js'),
    'SITE'
  );

  const entryData = evalFile(
    path.join(PROJECT_ROOT, 'lib', 'entryOrder.js'),
    '({ ENTRY_ORDER, HOME_FEATURED })'
  );
  const slugs = entryData.ENTRY_ORDER;

  // Load individual article files
  const articlesDir = path.join(PROJECT_ROOT, 'lib', 'articles');
  const articles = {};

  for (const slug of slugs) {
    const filePath = path.join(articlesDir, `${slug}.js`);
    if (!fs.existsSync(filePath)) {
      console.warn(`  Warning: no article file for slug "${slug}", skipping`);
      continue;
    }

    const article = evalFile(filePath, 'article');
    articles[slug] = {
      ...article,
      slug,
      cardImage: cardImages[slug] || null,
      cardExcerpt: cardExcerpts[slug] || null,
    };
  }

  return { articles, site, slugs };
}

module.exports = { loadAllData, evalFile };
