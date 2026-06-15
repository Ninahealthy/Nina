# Pinterest Pin Publisher for Nina Healthy

Standalone CLI tool that reads your article library and publishes keyword-optimized pins to Pinterest via API v5. Each pin links back to `ninahealthy.com/journal/<slug>`, making Pinterest a continuous source of organic traffic.

The script lives entirely in `scripts/pinterest/` and is **not** part of the Next.js build or deployment. It uses only Node.js built-in modules (no npm dependencies).

---

## Prerequisites

- Node.js 18 or later
- A [Pinterest Business account](https://business.pinterest.com/)
- A registered app on [developers.pinterest.com](https://developers.pinterest.com/)

---

## Initial Setup (One-Time)

### 1. Create a Pinterest Developer App

1. Go to [developers.pinterest.com/apps](https://developers.pinterest.com/apps/)
2. Click **Create app**
3. Fill in:
   - **App name:** Nina Healthy Publisher
   - **Description:** Publishes journal article pins for ninahealthy.com
   - **Website URL:** https://ninahealthy.com
4. Note your **App ID** and **App Secret**

### 2. Generate OAuth Tokens

Pinterest requires an OAuth 2.0 consent flow done once in the browser to get your initial tokens.

1. Open this URL in your browser (replace `YOUR_APP_ID`):

   ```
   https://www.pinterest.com/oauth/?client_id=YOUR_APP_ID&redirect_uri=https://localhost/&response_type=code&scope=boards:read,boards:write,pins:read,pins:write&state=nina
   ```

2. Authorize the app. You will be redirected to a URL like:

   ```
   https://localhost/?code=AUTHORIZATION_CODE&state=nina
   ```

3. Copy the `AUTHORIZATION_CODE` from the URL.

4. Exchange it for tokens. Run this in your terminal (replace the placeholders):

   ```bash
   curl -X POST https://api.pinterest.com/v5/oauth/token \
     -H "Authorization: Basic $(echo -n 'YOUR_APP_ID:YOUR_APP_SECRET' | base64)" \
     -H "Content-Type: application/x-www-form-urlencoded" \
     -d "grant_type=authorization_code&code=AUTHORIZATION_CODE&redirect_uri=https://localhost/"
   ```

   On Windows PowerShell:

   ```powershell
   $auth = [Convert]::ToBase64String([Text.Encoding]::ASCII.GetBytes("YOUR_APP_ID:YOUR_APP_SECRET"))
   Invoke-RestMethod -Uri "https://api.pinterest.com/v5/oauth/token" `
     -Method POST `
     -Headers @{ Authorization = "Basic $auth"; "Content-Type" = "application/x-www-form-urlencoded" } `
     -Body "grant_type=authorization_code&code=AUTHORIZATION_CODE&redirect_uri=https://localhost/"
   ```

5. The response contains `access_token` and `refresh_token`. Save them.

### 3. Configure .env.local

Add these lines to your project's `.env.local` file (create it if it does not exist):

```env
# Pinterest API v5
PINTEREST_APP_ID=your_app_id_here
PINTEREST_APP_SECRET=your_app_secret_here
PINTEREST_ACCESS_TOKEN=your_access_token_here
PINTEREST_REFRESH_TOKEN=your_refresh_token_here
```

The script automatically refreshes expired tokens and writes new values back to this file.

---

## Usage

All commands are run from the project root.

### Dry Run (Preview Without Posting)

```bash
node scripts/pinterest/publish.js --dry-run --all
```

This loads all 53 articles, constructs pin payloads, and prints them to the console without making any API calls. Use this to verify everything looks correct before going live.

### Publish a Single Article

```bash
node scripts/pinterest/publish.js --slug the-kindness-of-routine
```

### Publish All Unpublished Articles

```bash
node scripts/pinterest/publish.js --all
```

By default, this publishes up to 15 pins per run (the `--batch` default). Run again to publish the next batch.

### Publish in Batches (Recommended for Initial Rollout)

Pinterest flags bulk posting as spam. Stagger your initial 53-article library over several days:

```bash
# Day 1: first 10
node scripts/pinterest/publish.js --all --batch 10

# Day 2: next 10
node scripts/pinterest/publish.js --all --batch 10

# Continue until all articles are published
```

### Re-publish an Article

```bash
node scripts/pinterest/publish.js --slug the-kindness-of-routine --force
```

### Full Options

| Option         | Default | Description                                  |
|----------------|---------|----------------------------------------------|
| `--dry-run`    | off     | Preview without calling the Pinterest API     |
| `--slug <s>`   | none    | Publish one article by URL slug               |
| `--all`        | off     | Publish all unpublished articles              |
| `--force`      | off     | Re-publish articles already in pin-log.json   |
| `--batch <n>`  | 15      | Max pins per run                              |
| `--delay <ms>` | 2000    | Milliseconds between API calls                |
| `-h, --help`   | off     | Show help                                     |

---

## How It Works

### Data Flow

```
lib/articles/*.js          Article title, lead, tags, category
lib/cardImages.js          Slug to thumbnail URL mapping
lib/cardExcerpts.js        Slug to card excerpt mapping
lib/siteConfig.js          Site URL (https://ninahealthy.com)
        |
        v
  [data-loader.js]         Loads all data via Node.js vm module
        |
        v
  [publish.js]             Builds pin payloads, manages CLI
        |
        v
  [boards.js]              Ensures 5 category boards exist
  [auth.js]                Validates/refreshes OAuth token
  [api-client.js]          HTTPS requests to Pinterest API v5
        |
        v
  Pinterest API            POST /v5/pins with destination link
        |
        v
  [pin-log.json]           Records pin IDs, timestamps, links
```

### Pin Structure

Each pin contains:
- **Title:** Article title + " | Nina Healthy" (max 100 chars)
- **Description:** Card excerpt + tag keywords + "Read more at ninahealthy.com" (max 500 chars)
- **Destination Link:** `https://ninahealthy.com/journal/<slug>` (this is the traffic driver)
- **Image:** The article's card thumbnail from `/images/journal-XX.png`
- **Board:** One of 5 category-mapped boards

### Board Mapping

| Category           | Pinterest Board Name                          |
|--------------------|-----------------------------------------------|
| Still Point        | Still Point: Presence and Attention           |
| The Body Knows     | The Body Knows: Embodied Living               |
| Quiet Architecture | Quiet Architecture: Routines and Rituals      |
| Inner Weather      | Inner Weather: The Emotional Life             |
| Chosen Life        | Chosen Life: Boundaries and Decisions         |

### Rate Limiting

The script:
- Waits 2 seconds between each pin creation (configurable with `--delay`)
- Reads `x-ratelimit-remaining` headers from every response
- Auto-pauses when remaining calls drop below 5
- Retries once with backoff on HTTP 429 responses

---

## Tracking

Published pins are tracked in `scripts/pinterest/pin-log.json`:

```json
{
  "boards": {
    "Still Point": "board_id_abc",
    "The Body Knows": "board_id_def"
  },
  "pins": {
    "the-kindness-of-routine": {
      "pin_id": "pin_123456",
      "board": "Quiet Architecture",
      "published_at": "2026-06-15T10:00:00.000Z",
      "link": "https://ninahealthy.com/journal/the-kindness-of-routine"
    }
  }
}
```

This file is gitignored (it contains account-specific IDs). The `--force` flag bypasses the duplicate check.

---

## Rich Pins

Your site already outputs Open Graph meta tags on every article page. To activate Rich Pins:

1. Go to [Pinterest Rich Pin Validator](https://developers.pinterest.com/tools/url-debugger/)
2. Enter any article URL, e.g. `https://ninahealthy.com/journal/the-kindness-of-routine`
3. Click **Validate**

This is a one-time step. Once validated, all pins linking to your domain will automatically display Rich Pin formatting (article title, description, and author pulled from your OG tags).

---

## Applying for Standard Access

Trial access lets you test the integration, but pins are not publicly visible. To go live:

1. Go to your app settings at [developers.pinterest.com/apps](https://developers.pinterest.com/apps/)
2. Click **Request Standard Access**
3. Record a short screen recording (30-60 seconds) showing:
   - Your app authenticating with Pinterest
   - A pin being created (use the `--slug` command)
   - The pin appearing on your board
4. Upload the video and submit
5. Approval typically takes 3-5 business days

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| `Token refresh failed` | Re-run the OAuth consent flow (step 2 above) |
| `No card image for slug` | Add the slug to `lib/cardImages.js` |
| `No board mapped for category` | Check the article's `category` matches one of the five allowed values |
| `HTTP 403` | Your app may lack the required scopes; re-authorize with all four scopes |
| `HTTP 429` | Rate-limited; the script handles this automatically, but increase `--delay` if persistent |
| Pins not visible to public | You are on Trial access; apply for Standard access |
