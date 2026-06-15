/**
 * Lightweight HTTPS client for Pinterest API v5.
 * Uses only Node.js built-in modules; no third-party dependencies.
 *
 * @module api-client
 */
'use strict';

const https = require('node:https');

const API_HOST = 'api.pinterest.com';
const SANDBOX_HOST = 'api-sandbox.pinterest.com';
const API_PREFIX = '/v5';

/** Resolve the correct hostname based on sandbox mode. */
function getHost(useSandbox) {
  return useSandbox ? SANDBOX_HOST : API_HOST;
}

/**
 * Make an authenticated JSON request to the Pinterest API.
 *
 * @param {Object} opts
 * @param {string} opts.method   - HTTP method (GET, POST, PATCH, DELETE)
 * @param {string} opts.path     - API path without the /v5 prefix (e.g. "pins")
 * @param {string} opts.token    - OAuth Bearer token
 * @param {Object} [opts.body]   - Request body; JSON-serialized automatically
 * @param {Object} [opts.headers] - Extra headers to merge
 * @param {boolean} [opts.useSandbox] - Use sandbox API host
 * @returns {Promise<{status: number, data: Object, headers: Object}>}
 */
function request({ method, path: apiPath, token, body, headers: extra, useSandbox }) {
  return new Promise((resolve, reject) => {
    const payload = body ? JSON.stringify(body) : null;

    const options = {
      hostname: getHost(useSandbox),
      port: 443,
      path: `${API_PREFIX}/${apiPath}`,
      method,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        ...(payload ? { 'Content-Length': Buffer.byteLength(payload) } : {}),
        ...extra,
      },
    };

    const req = https.request(options, (res) => {
      const chunks = [];
      res.on('data', (chunk) => chunks.push(chunk));
      res.on('end', () => {
        const raw = Buffer.concat(chunks).toString();
        let data;
        try {
          data = JSON.parse(raw);
        } catch {
          data = { raw };
        }
        resolve({ status: res.statusCode, data, headers: res.headers });
      });
    });

    req.on('error', reject);
    if (payload) req.write(payload);
    req.end();
  });
}

/**
 * Make a request with HTTP Basic Auth (used for OAuth token operations).
 *
 * @param {Object} opts
 * @param {string} opts.method       - HTTP method
 * @param {string} opts.path         - API path without /v5 prefix
 * @param {string} opts.clientId     - Pinterest app ID
 * @param {string} opts.clientSecret - Pinterest app secret
 * @param {string} opts.body         - URL-encoded body string
 * @param {boolean} [opts.useSandbox] - Use sandbox API host
 * @returns {Promise<{status: number, data: Object, headers: Object}>}
 */
function requestBasicAuth({ method, path: apiPath, clientId, clientSecret, body, useSandbox }) {
  return new Promise((resolve, reject) => {
    const credentials = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

    const options = {
      hostname: getHost(useSandbox),
      port: 443,
      path: `${API_PREFIX}/${apiPath}`,
      method,
      headers: {
        'Authorization': `Basic ${credentials}`,
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(body),
      },
    };

    const req = https.request(options, (res) => {
      const chunks = [];
      res.on('data', (chunk) => chunks.push(chunk));
      res.on('end', () => {
        const raw = Buffer.concat(chunks).toString();
        let data;
        try {
          data = JSON.parse(raw);
        } catch {
          data = { raw };
        }
        resolve({ status: res.statusCode, data, headers: res.headers });
      });
    });

    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

/**
 * Extract rate-limit metadata from Pinterest response headers.
 *
 * @param {Object} headers - HTTP response headers
 * @returns {{ limit: number, remaining: number, reset: number }}
 */
function parseRateLimits(headers) {
  return {
    limit: parseInt(headers['x-ratelimit-limit'] || '0', 10),
    remaining: parseInt(headers['x-ratelimit-remaining'] || '999', 10),
    reset: parseInt(headers['x-ratelimit-reset'] || '0', 10),
  };
}

/**
 * Async delay helper.
 * @param {number} ms - Milliseconds to wait
 * @returns {Promise<void>}
 */
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

module.exports = { request, requestBasicAuth, parseRateLimits, sleep, API_HOST, SANDBOX_HOST };
