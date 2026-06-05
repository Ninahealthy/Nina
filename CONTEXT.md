# CONTEXT.md

> Single source of truth for project facts: stack, architecture, data shapes, and integrations.
> For rules and standards (design, content, SEO, accessibility), see `AGENTS.md`.

---

## 1. Project Identity

| Field | Value |
|---|---|
| Name | Nina Healthy |
| URL | `https://ninahealthy.com` |
| Purpose | Personal mindfulness and intentional-living journal |
| Author | Nina (`hello@ninahealthy.com`) |
| Repo | `Ninahealthy/Nina` |

---

## 2. Technology Stack

| Layer | Technology | Version |
|---|---|---|
| Framework | Next.js (App Router) | 16.2.6 |
| Language | JavaScript (no TypeScript) | ES2022+ |
| UI Library | React | 19.2.4 |
| Styling | CSS Modules + `globals.css` | Vanilla CSS only |
| Email | Nodemailer (server actions) | 8.x |
| Compiler | React Compiler (`babel-plugin-react-compiler`) | 1.0.0 |
| Linting | ESLint 9 + `eslint-config-next` | 16.2.6 |
| Package Manager | npm | lockfile v3 |

### What is NOT used

- No TypeScript
- No Tailwind CSS
- No third-party UI libraries (no Chakra, MUI, Radix, etc.)
- No CMS or database; all content is static JS objects
- No client-side routing library; Next.js App Router handles everything

### Build Configuration

| File | Key Setting |
|---|---|
| `next.config.mjs` | `reactCompiler: true` |
| `jsconfig.json` | Path alias `@/*` maps to project root (`"./*"`) |
| `eslint.config.mjs` | `eslint-config-next/core-web-vitals` with default ignores |

---

## 3. Directory Structure

```
Nina/
  app/                        # Next.js App Router (pages, layouts, routes)
    globals.css               # Design tokens, squircle clip-paths, global resets
    layout.js                 # Root layout (fonts, metadata, Header/Footer shell)
    page.js                   # Home page (/)
    page.module.css
    icon.svg                  # Favicon (SVG)
    manifest.js               # Web App Manifest generator
    sitemap.js                # Dynamic sitemap generator
    robots.js                 # Robots.txt generator
    loading.js                # Global loading skeleton (breathing circle animation)
    loading.module.css
    error.js                  # Global error boundary (client component with reset)
    error.module.css
    not-found.js              # 404 page (server component)
    not-found.module.css
    about/page.js             # /about
    connect/page.js           # /connect
    practice/page.js          # /practice
    journal/
      page.js                 # /journal (server component, passes data to JournalFilter)
      loading.js              # Journal-specific loading state
      [slug]/
        page.js               # /journal/:slug (article renderer)
        opengraph-image.js    # Dynamic OG image generation per article
    privacy/page.js           # /privacy
    terms/page.js             # /terms
    feed.xml/route.js         # RSS 2.0 feed (Route Handler)
    styles/
      LegalPage.module.css    # Shared CSS for privacy + terms pages
  components/                 # Reusable UI components (each in own folder)
  lib/                        # Data layer and utilities
    articles/                 # Article content files (one per article)
      index.js                # Central ARTICLES registry (barrel export)
    siteConfig.js             # SITE object (name, url, author, social, ogImage)
    categories.js             # CATEGORIES derived from articles
    socialLinks.js            # SOCIAL_LINKS array + getSameAsUrls()
    invitations.js            # Daily invitation pool + season labels
    readingTime.js            # Reading time calculator (230 wpm)
    escapeHtml.js             # XSS-safe HTML escaping
  public/
    images/                   # All static images (hero, journal thumbnails)
    og-default.png            # Default Open Graph image (1200x630)
    ads.txt                   # Google AdSense verification
```

---

## 4. Routing Map

| Route | File | Type | Description |
|---|---|---|---|
| `/` | `app/page.js` | Static | Home: hero, philosophy, latest articles, daily invitation, testimonials, newsletter |
| `/journal` | `app/journal/page.js` | Static | Journal index (server component passes serialized data to JournalFilter client component) |
| `/journal/:slug` | `app/journal/[slug]/page.js` | Dynamic (SSG) | Individual article renderer with `generateStaticParams` |
| `/practice` | `app/practice/page.js` | Static | Interactive mindfulness tools |
| `/about` | `app/about/page.js` | Static | Bio, timeline, values, FAQ |
| `/connect` | `app/connect/page.js` | Static | Contact form, newsletter, social links |
| `/privacy` | `app/privacy/page.js` | Static | Privacy policy |
| `/terms` | `app/terms/page.js` | Static | Terms of use |
| `/feed.xml` | `app/feed.xml/route.js` | Route Handler | RSS 2.0 feed (cached 1 hour) |
| `/sitemap.xml` | `app/sitemap.js` | Generated | XML sitemap |
| `/robots.txt` | `app/robots.js` | Generated | Robots directives |
| `/manifest.webmanifest` | `app/manifest.js` | Generated | PWA manifest |

---

## 5. Data Layer

### 5.1 Site Configuration (`lib/siteConfig.js`)

```js
export const SITE = {
  name: "Nina Healthy",
  url: "https://ninahealthy.com",
  description: "...",
  author: { name: "Nina", email: "hello@ninahealthy.com", aboutUrl: "..." },
  social: { instagram: "...", pinterest: "..." },
  ogImage: { url: "/og-default.png", width: 1200, height: 630, alt: "..." },
};
```

Use `SITE` everywhere instead of hardcoding URLs or strings.

### 5.2 Article Data Model (`lib/articles/`)

Each article is a JS module exporting a default object. See `AGENTS.md` for the full schema and content block rules.

Currently **30 articles** registered in `lib/articles/index.js`.

#### Article Registry (`lib/articles/index.js`)

All articles are imported and exported as a single `ARTICLES` object keyed by slug:

```js
export const ARTICLES = {
  "the-art-of-doing-nothing": theArtOfDoingNothing,
  "morning-rituals-that-anchor-me": morningRitualsThatAnchorMe,
  // ... 28 more
};
```

**Rule:** Never import `ARTICLES` from a Client Component. It is meant for Server Components and server-side logic only.

#### Adding a New Article

1. Create `lib/articles/your-slug.js` following the schema in `AGENTS.md`
2. Import it in `lib/articles/index.js` and add to `ARTICLES`
3. Add slug to the `ENTRY_ORDER` array in `app/journal/page.js`
4. Add a slug-to-image mapping in `CARD_IMAGES` in `app/journal/page.js` and `app/journal/[slug]/page.js`
5. Add a card excerpt to `CARD_EXCERPTS` in `app/journal/page.js`
6. Add a slug-to-image mapping in `CARD_IMAGES` in `app/page.js` if it should appear on the home page
7. Place the thumbnail image in `public/images/`

### 5.3 Categories (`lib/categories.js`)

Derived automatically from all articles at import time. Always starts with `"All"`, followed by unique sorted categories.

```js
export const CATEGORIES = deriveCategories(); // e.g. ["All", "Boundaries", "Mindfulness", "Rest", ...]
```

### 5.4 Social Links (`lib/socialLinks.js`)

Centralized social definitions used by Footer, Connect page, and JSON-LD:

```js
export const SOCIAL_LINKS = [
  { name: "Instagram", href: "...", icon: `<svg ...>`, external: true },
  { name: "Pinterest", href: "...", icon: `<svg ...>`, external: true },
  { name: "Email", href: "mailto:...", icon: `<svg ...>`, external: false },
];

export function getSameAsUrls() { /* returns external hrefs for JSON-LD */ }
```

### 5.5 Invitations (`lib/invitations.js`)

A pool of 30 daily mindfulness invitations. Selection is deterministic based on day-of-year.

```js
export function getTodaysInvitation() { /* returns string */ }
export function getSeasonLabel()      { /* returns "A spring/summer/autumn/winter invitation" */ }
```

### 5.6 Utilities

| File | Export | Purpose |
|---|---|---|
| `lib/readingTime.js` | `getReadingTime(content)` | Estimates reading time from content blocks (230 wpm, min 1 min) |
| `lib/escapeHtml.js` | `escapeHtml(str)` | Escapes `&`, `<`, `>`, `"`, `'` for XSS prevention in email templates |

---

## 6. Component Library

All 23 components follow the same convention:
- Live in `components/ComponentName/ComponentName.js`
- Co-located CSS Module: `ComponentName.module.css`
- Export a single `default` function or `const`

### 6.1 Server Components (no `"use client"`)

| Component | Props | Used By |
|---|---|---|
| `JsonLd` | `{ data }` | Every page (structured data injection) |
| `SectionHeading` | `{ children, subtitle }` | Home, Journal, Practice, About |
| `PageHero` | `{ title, subtitle }` | Journal, Practice, Connect |
| `Button` | `{ children, href, onClick, variant, disabled }` | Home, Practice, articles |
| `Card` | `{ image, alt, title, excerpt, href, readingTime, date }` | Home, Journal |
| `RelatedArticles` | `{ articles }` | Article pages |
| `Timeline` | `{ items }` | About |
| `Footer` | none | Root layout |

### 6.2 Client Components (`"use client"`)

| Component | Purpose | Key Behavior |
|---|---|---|
| `Header` | Site navigation | Scroll-aware shrink, mobile slide-out menu, focus trap, route-aware active state |
| `ThemeToggle` | Light/dark mode switcher | Sets `data-theme` on `<html>`, persists to localStorage |
| `ScrollToTop` | Floating scroll-to-top button | Appears after scrolling down |
| `ScrollReveal` | Intersection Observer wrapper | Fade+translate children on scroll entry |
| `ReadingProgress` | Reading progress bar | Fixed top bar showing scroll percentage |
| `JournalFilter` | Category filter + search | Filters article cards by category with animated transitions |
| `ShareBar` | Social share buttons | Copy link, Twitter/X, Facebook sharing |
| `TestimonialCarousel` | Auto-rotating testimonials | Timed carousel with pause-on-hover |
| `NewsletterSignup` | Email subscription form | Calls `NewsletterAction` server action |
| `ContactMe` (ContactForm) | Contact form | Calls `ContactAction` server action |
| `BreathPacer` | Animated breathing circle | 4-7-8 breathing pattern with visual guide |
| `MeditationTimer` | Countdown timer | Selectable durations, start/pause/reset |
| `DailyIntention` | Intention setter | Text input that saves to localStorage |
| `GroundingExercise` | 5-4-3-2-1 grounding | Step-by-step sensory awareness prompts |
| `Accordion` | Expandable FAQ items | Animated open/close with ARIA support |

### 6.3 Server Actions

| File | Export | Trigger |
|---|---|---|
| `components/NewsletterSignup/NewsletterAction.js` | `subscribeToNewsletter(email)` | Newsletter form submit |
| `components/ContactMe/ContactAction.js` | `sendContactMessage(formData)` | Contact form submit |

Both use Nodemailer to send emails via SMTP. Both send a confirmation to the user and a notification to admin.

---

## 7. Theme System

Dark mode is handled through three layers:

1. **System preference:** `@media (prefers-color-scheme: dark)` on `:root:not([data-theme="light"])`
2. **Manual dark:** `:root[data-theme="dark"]` overrides all variables
3. **Manual light:** `data-theme="light"` prevents system dark mode from applying

The `ThemeToggle` component sets `data-theme` on `<html>` and persists the choice in `localStorage`.

---

## 8. Global Utilities (CSS)

| Class | Purpose |
|---|---|
| `.skipLink` | Skip-to-content link (hidden until focused) |
| `.visuallyHidden` | Accessible screen-reader-only content |

| Behavior | Implementation |
|---|---|
| Focus styles | `outline: 2px solid var(--color-terracotta)` on interactive elements via `:focus-visible` |
| Reduced motion | Blanket `transition: none !important; animation: none !important` via `@media (prefers-reduced-motion: reduce)` |
| Smooth scroll | `scroll-behavior: smooth` on `html` |
| No horizontal overflow | `max-width: 100vw; overflow-x: hidden` on `html, body` |
| Flex column layout | `body` is `display: flex; flex-direction: column; min-height: 100%`; `main` is `flex: 1` |

---

## 9. SEO Infrastructure

### 9.1 Metadata

- **Root layout** exports a full `metadata` object with title template (`%s | Nina Healthy`), Open Graph, Twitter cards, robots directives, canonical URL, and RSS feed link.
- **Every page** exports its own `metadata` or `generateMetadata` (for dynamic routes).
- **RSS feed** is linked via `alternates.types["application/rss+xml"]`.

### 9.2 Structured Data (JSON-LD)

Every page embeds structured data via the `JsonLd` component:

| Page | Schema Types |
|---|---|
| Home (`/`) | `WebSite` + `Organization` |
| Journal index (`/journal`) | `CollectionPage` + `ItemList` |
| Article (`/journal/:slug`) | `Article` (with author, publisher, dates) |
| About (`/about`) | `Person` + `FAQPage` |
| Practice (`/practice`) | `WebPage` with `specialty: "Mindfulness"` |
| Connect (`/connect`) | `ContactPage` |

### 9.3 Dynamic OG Images

`app/journal/[slug]/opengraph-image.js` generates per-article Open Graph images (1200x630) using `next/og` `ImageResponse`. Includes:
- Decorative top gradient accent (terracotta to sage)
- Category badge
- Article title (truncated lead at 120 chars)
- Nina Healthy branding footer

### 9.4 RSS Feed

`app/feed.xml/route.js` generates a full RSS 2.0 feed with all articles sorted by date (newest first). Cached for 1 hour via `Cache-Control`.

### 9.5 Sitemap

`app/sitemap.js` generates entries for:
- 7 static routes (home, journal, practice, about, connect, privacy, terms)
- All journal article slugs

### 9.6 Robots

`app/robots.js` allows all crawlers (`*`) with a link to the sitemap.

---

## 10. Integrations

### 10.1 Google AdSense

- Script loaded in root layout via `next/script` with `strategy="afterInteractive"`
- Publisher ID: `ca-pub-2087636695455778`
- Verification file: `public/ads.txt`

### 10.2 Email (Nodemailer)

Both server actions use the same SMTP transport configuration:

```js
nodemailer.createTransport({
  host: process.env.SMTP,
  port: 587,
  secure: false,
  auth: { user: process.env.MAIL, pass: process.env.MAILP },
});
```

---

## 11. Environment Variables

| Variable | Purpose | Used By |
|---|---|---|
| `SMTP` | SMTP server hostname | `NewsletterAction`, `ContactAction` |
| `MAIL` | SMTP auth username (sender email) | `NewsletterAction`, `ContactAction` |
| `MAILP` | SMTP auth password | `NewsletterAction`, `ContactAction` |
| `MAILR` | Admin notification recipient email | `NewsletterAction`, `ContactAction` |

All are server-only (no `NEXT_PUBLIC_` prefix). Required for contact form and newsletter functionality.

---

## 12. Root Layout Shell

`app/layout.js` defines the persistent page shell:

```
<html lang="en" class="--font-heading --font-body">
  <body>
    <Script src="AdSense" strategy="afterInteractive" />
    <a href="#main-content" class="skipLink">Skip to content</a>
    <Header />
    <main id="main-content">{children}</main>
    <Footer />
    <ScrollToTop />
  </body>
</html>
```

The `Header` and `Footer` are rendered on every page. The `ScrollToTop` button is a floating client component.

---

## 13. Page-Level Patterns

### Home Page (`/`)

Sections in order:
1. **Hero** with image, h1, subtitle, CTA button to `/practice`
2. **Philosophy** card ("What does healthy really mean?")
3. **Latest from the Journal** (3 most recent articles as Cards)
4. **Daily Invitation** (season-aware label + rotating invitation text)
5. **Words from Readers** (TestimonialCarousel)
6. **Newsletter Signup**

All sections (except hero) wrapped in `ScrollReveal`.

### Journal Index (`/journal`)

Server Component that builds entry data from `ARTICLES` and passes it to `JournalFilter` (client component). Data includes:
- `ENTRY_ORDER`: Array of slugs defining display order (newest first)
- `CARD_IMAGES`: Slug-to-image-path mapping
- `CARD_EXCERPTS`: Slug-to-custom-excerpt mapping (falls back to `article.lead`)

### Journal Article (`/journal/:slug`)

Features in order:
1. `ReadingProgress` bar (fixed top)
2. Article header: category badge, date, reading time, h1
3. Optional `contentNote` (sensitivity warning)
4. Article body: renders content blocks by type
5. `ShareBar` (copy link, Twitter, Facebook)
6. Footer: back link + "Written by Nina"
7. `RelatedArticles` (3 articles from same category, with fallback)

### Practice Page (`/practice`)

Interactive tools in order:
1. `DailyIntention` (set and save intention)
2. `GroundingExercise` (5-4-3-2-1 sensory exercise)
3. `BreathPacer` (animated breathing guide)
4. `MeditationTimer` (configurable countdown)
5. Practice guide cards (Morning, Breathing, Evening, Seasonal)
6. CTA to Journal

---

## 14. Image Conventions

### File Naming

| Image | File | Location |
|---|---|---|
| Home hero | `home-hero.png` | `public/images/` |
| About hero | `about-hero.png` | `public/images/` |
| Journal thumbnails | `journal-1.png` through `journal-30.png` | `public/images/` |
| Default OG | `og-default.png` | `public/` |
| Favicon | `icon.svg` | `app/` |

### Image-to-Article Mapping

Article slugs map to thumbnail images via `CARD_IMAGES` objects defined in:
- `app/page.js` (home page, subset of 6)
- `app/journal/page.js` (journal index, all 30)
- `app/journal/[slug]/page.js` (article pages, all 30)

When adding new articles, all three locations must be updated.

---

## 15. Error Handling

| Scenario | Handler | Type |
|---|---|---|
| Runtime error | `app/error.js` | Client Component with `reset()` retry |
| 404 | `app/not-found.js` | Server Component with links to Home and Journal |
| Loading | `app/loading.js` | Breathing circle animation |
| Journal loading | `app/journal/loading.js` | Journal-specific loading state |
| Article not found | Inline fallback in `app/journal/[slug]/page.js` | "Article not found" with back link |

---

## 16. PWA Manifest

`app/manifest.js` generates a web app manifest for "Add to Home Screen" support:

```js
{
  name: SITE.name,
  short_name: "Nina",
  display: "standalone",
  background_color: "#FAF7F2",
  theme_color: "#C07A56",
  icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }],
}
```
