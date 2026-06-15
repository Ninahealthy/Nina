/**
 * Pinterest OAuth 2.0 token management.
 *
 * Handles the "continuous refresh token" flow introduced in late 2025.
 * Access tokens expire after ~30 days; refresh tokens are single-use
 * and rotate on every refresh call.
 *
 * @module auth
 */
'use strict';

const fs = require('node:fs');
const path = require('node:path');
const { request, requestBasicAuth } = require('./api-client');

const ENV_PATH = path.resolve(__dirname, '..', '..', '.env.local');

/**
 * Parse Pinterest credentials from .env.local.
 * Throws with a clear message if the file or required keys are missing.
 *
 * @returns {{ appId: string, appSecret: string, accessToken: string, refreshToken: string }}
 */
function readCredentials() {
  if (!fs.existsSync(ENV_PATH)) {
    throw new Error(
      `.env.local not found at ${ENV_PATH}\n` +
      'Create it with PINTEREST_APP_ID, PINTEREST_APP_SECRET, ' +
      'PINTEREST_ACCESS_TOKEN, and PINTEREST_REFRESH_TOKEN.\n' +
      'See scripts/pinterest/README.md for the full setup guide.'
    );
  }

  const content = fs.readFileSync(ENV_PATH, 'utf-8');
  const vars = {};

  for (const line of content.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eq = trimmed.indexOf('=');
    if (eq === -1) continue;
    vars[trimmed.slice(0, eq).trim()] = trimmed.slice(eq + 1).trim();
  }

  const appId = vars.PINTEREST_APP_ID;
  const appSecret = vars.PINTEREST_APP_SECRET;
  const accessToken = vars.PINTEREST_ACCESS_TOKEN;
  const refreshToken = vars.PINTEREST_REFRESH_TOKEN;

  if (!appId || !appSecret) {
    throw new Error(
      'Missing PINTEREST_APP_ID or PINTEREST_APP_SECRET in .env.local'
    );
  }
  if (!accessToken || !refreshToken) {
    throw new Error(
      'Missing PINTEREST_ACCESS_TOKEN or PINTEREST_REFRESH_TOKEN in .env.local.\n' +
      'Complete the initial OAuth consent flow first. See README.md.'
    );
  }

  return { appId, appSecret, accessToken, refreshToken };
}

/**
 * Persist updated tokens back to .env.local without touching other vars.
 *
 * @param {string} newAccessToken
 * @param {string} newRefreshToken
 */
function writeTokens(newAccessToken, newRefreshToken) {
  let content = fs.readFileSync(ENV_PATH, 'utf-8');

  content = content.replace(
    /^PINTEREST_ACCESS_TOKEN=.*$/m,
    `PINTEREST_ACCESS_TOKEN=${newAccessToken}`
  );
  content = content.replace(
    /^PINTEREST_REFRESH_TOKEN=.*$/m,
    `PINTEREST_REFRESH_TOKEN=${newRefreshToken}`
  );

  fs.writeFileSync(ENV_PATH, content, 'utf-8');
}

/**
 * Quick health-check: hit GET /v5/user_account to see if the token works.
 *
 * @param {string} token
 * @returns {Promise<boolean>}
 */
async function testToken(token) {
  try {
    const res = await request({ method: 'GET', path: 'user_account', token });
    return res.status === 200;
  } catch {
    return false;
  }
}

/**
 * Exchange the current refresh token for a new access + refresh token pair.
 * Writes both to .env.local immediately.
 *
 * @returns {Promise<string>} The new access token
 */
async function refreshAccessToken() {
  const { appId, appSecret, refreshToken } = readCredentials();

  console.log('  Refreshing Pinterest access token...');

  const res = await requestBasicAuth({
    method: 'POST',
    path: 'oauth/token',
    clientId: appId,
    clientSecret: appSecret,
    body: `grant_type=refresh_token&refresh_token=${encodeURIComponent(refreshToken)}`,
  });

  if (res.status !== 200) {
    throw new Error(
      `Token refresh failed (HTTP ${res.status}): ${JSON.stringify(res.data)}\n` +
      'The refresh token may have expired. Re-run the OAuth consent flow.\n' +
      'See scripts/pinterest/README.md, section "Initial OAuth Setup".'
    );
  }

  const newAccess = res.data.access_token;
  // Pinterest rotates refresh tokens; always store the latest one
  const newRefresh = res.data.refresh_token || refreshToken;

  writeTokens(newAccess, newRefresh);
  console.log('  Token refreshed and saved to .env.local');

  return newAccess;
}

/**
 * Return a valid access token, refreshing transparently if the current one
 * has expired.
 *
 * @returns {Promise<string>}
 */
async function getValidToken() {
  const { accessToken } = readCredentials();

  if (await testToken(accessToken)) {
    return accessToken;
  }

  console.log('  Current token is expired or invalid.');
  return refreshAccessToken();
}

module.exports = { getValidToken, readCredentials, testToken };
