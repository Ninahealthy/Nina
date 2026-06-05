# CONTEXT.md

> Single source of truth for project architecture, conventions, and data shapes.
> Read this before making any changes.

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
    loading.js                # Global loading skeleton
    error.js                  # Global error boundary (client component)
    not-found.js              # 404 page
    about/page.js             # /about
    connect/page.js           # /connect
    practice/page.js          # /practice
    journal/
      page.js                 # /journal (index with filter)
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
      index.js                # Central ARTICLES registry
    siteConfig.js             # SITE object (name, url, author, social, ogImage)
    categories.js             # CATEGORIES derived from articles
    socialLinks.js            # SOCIAL_LINKS array + getSameAsUrls()
    invitations.js            # Daily invitation pool + season labels
    readingTime.js            # Reading time calculator
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
| `/journal` | `app/journal/page.js` | Static | Journal index with category filter |
| `/journal/:slug` | `app/journal/[slug]/page.js` | Dynamic (SSG) | Individual article renderer |
| `/practice` | `app/practice/page.js` | Static | Interactive mindfulness tools |
| `/about` | `app/about/page.js` | Static | Bio, timeline, values, FAQ |
| `/connect` | `app/connect/page.js` | Static | Contact form, newsletter, social links |
| `/privacy` | `app/privacy/page.js` | Static | Privacy policy |
| `/terms` | `app/terms/page.js` | Static | Terms of use |
| `/feed.xml` | `app/feed.xml/route.js` | Route Handler | RSS 2.0 feed |
| `/sitemap.xml` | `app/sitemap.js` | Generated | XML sitemap |
| `/robots.txt` | `app/robots.js` | Generated | Robots directives |
| `/manifest.webmanifest` | `app/manifest.js` | Generated | PWA manifest |

### Static Params

`app/journal/[slug]/page.js` exports `generateStaticParams()` to pre-render all article slugs at build time.

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

Each article is a JS module exporting a default object:

```js
const article = {
  title: "The Art of Doing Nothing",      // string, the article headline
  date: "May 2026",                        // human-readable date
  dateISO: "2026-05-01",                   // ISO 8601 for structured data
  category: "Mindfulness",                 // one of the derived categories
  lead: "On the radical act...",           // meta description / excerpt
  contentNote: null,                       // optional sensitivity note (string or null)
  content: [                               // ordered array of content blocks
    { type: "paragraph", text: "..." },
    { type: "subheading", text: "..." },
    { type: "quote", text: "..." },
    { type: "divider" },
    { type: "list", items: ["...", "..."] },
  ],
};
```

#### Content Block Types

| Type | Properties | Rendered As |
|---|---|---|
| `paragraph` | `text` | `<p>` |
| `subheading` | `text` | `<h2>` |
| `quote` | `text` | `<blockquote>` (pull quote) |
| `divider` | none | Three decorative dots |
| `list` | `items` (string array) | `<ul>` with `<li>` items |

#### Article Registry (`lib/articles/index.js`)

All 20 articles are imported and exported as a single `ARTICLES` object keyed by slug:

```js
export const ARTICLES = {
  "the-art-of-doing-nothing": theArtOfDoingNothing,
  "morning-rituals-that-anchor-me": morningRitualsThatAnchorMe,
  // ... 18 more
};
```

**Rule:** Never import `ARTICLES` from a Client Component. It is meant for Server Components and server-side logic only.

#### Adding a New Article

1. Create `lib/articles/your-slug.js` following the data model above
2. Import it in `lib/articles/index.js` and add to `ARTICLES`
3. Add slug to the `ENTRY_ORDER` arrays in `app/page.js` (home) and `app/journal/page.js` (journal index)
4. Add a slug-to-image mapping in `CARD_IMAGES` in both pages and in `app/journal/[slug]/page.js`
5. Add a card excerpt to `CARD_EXCERPTS` in `app/journal/page.js`
6. Place the thumbnail image in `public/images/`

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

## 7. Design Tokens

### 7.1 Color Palette

All colors are CSS custom properties in `globals.css` with automatic dark mode.

| Variable | Light | Dark | Usage |
|---|---|---|---|
| `--color-cream` | `#FAF7F2` | `#1A1714` | Page background |
| `--color-linen` | `#F3EDE4` | `#2A2520` | Card/section backgrounds |
| `--color-warmwhite` | `#FEFCF8` | `#221E1A` | Subtle background variant |
| `--color-charcoal` | `#3D3832` | `#E8E0D6` | Primary text |
| `--color-stone` | `#6B6560` | `#B0A89E` | Secondary text |
| `--color-pebble` | `#9A9490` | `#8A837D` | Tertiary/caption text |
| `--color-terracotta` | `#C07A56` | `#D4926B` | Primary accent, CTAs |
| `--color-sage` | `#8FA98B` | `#A3BDA0` | Secondary accent |
| `--color-olive` | `#6B7D5E` | `#8A9E7D` | Hover states |
| `--color-clay` | `#C4A882` | `#B09974` | Borders, subtle UI |
| `--color-sand` | `#E8DFD0` | `#3D3530` | Light accent backgrounds |

### 7.2 Theme System

Dark mode is handled through three layers:

1. **System preference:** `@media (prefers-color-scheme: dark)` on `:root:not([data-theme="light"])`
2. **Manual dark:** `:root[data-theme="dark"]` overrides all variables
3. **Manual light:** `data-theme="light"` prevents system dark mode from applying

The `ThemeToggle` component sets `data-theme` on `<html>` and persists the choice in `localStorage`.

### 7.3 Squircle Clip-Paths

Never use `border-radius` on cards or images. Use these clip-path variables instead:

| Variable | Radius Equivalent | Use Case |
|---|---|---|
| `--clip-path-squircle-10` | ~10px | Badges, tags, small elements |
| `--clip-path-squircle-20` | ~20px | Buttons, inputs |
| `--clip-path-squircle-36` | ~36px | Images |
| `--clip-path-squircle-48` | ~48px | Cards |
| `--clip-path-squircle-60` | ~60px | Hero images, large sections |

### 7.4 Typography

| Role | Font | CSS Variable | Fallback |
|---|---|---|---|
| Headings | Playfair Display | `var(--font-heading)` | Georgia, "Times New Roman", serif |
| Body | Lora | `var(--font-body)` | Georgia, "Times New Roman", serif |

Loaded via `next/font/google` with `display: "swap"` in `app/layout.js`.

### 7.5 Global Utilities

| Class | Purpose |
|---|---|
| `.skipLink` | Skip-to-content link (hidden until focused) |
| `.visuallyHidden` | Accessible screen-reader-only content |

### 7.6 Global Behaviors

| Feature | Implementation |
|---|---|
| Focus styles | `outline: 2px solid var(--color-terracotta)` on `a`, `button`, `input`, `textarea`, `select` via `:focus-visible` |
| Reduced motion | Blanket `transition: none !important; animation: none !important` on interactive elements via `@media (prefers-reduced-motion: reduce)` |
| Smooth scroll | `scroll-behavior: smooth` on `html` |
| No horizontal overflow | `max-width: 100vw; overflow-x: hidden` on `html, body` |
| Flex column layout | `body` is `display: flex; flex-direction: column; min-height: 100%`; `main` is `flex: 1` |

---

## 8. SEO Infrastructure

### 8.1 Metadata

- **Root layout** exports a full `metadata` object with title template (`%s | Nina Healthy`), Open Graph, Twitter cards, robots directives, and canonical URL.
- **Every page** exports its own `metadata` or `generateMetadata` (for dynamic routes).
- **RSS feed** is linked via `alternates.types["application/rss+xml"]`.

### 8.2 Structured Data (JSON-LD)

Every page embeds structured data via the `JsonLd` component:

| Page | Schema Types |
|---|---|
| Home (`/`) | `WebSite` + `Organization` |
| Journal index (`/journal`) | `CollectionPage` + `ItemList` |
| Article (`/journal/:slug`) | `Article` (with author, publisher, dates) |
| About (`/about`) | `Person` + `FAQPage` |
| Practice (`/practice`) | `WebPage` with `specialty: "Mindfulness"` |
| Connect (`/connect`) | `ContactPage` |

### 8.3 Dynamic OG Images

`app/journal/[slug]/opengraph-image.js` generates per-article Open Graph images using `next/og` `ImageResponse`. Includes:
- Decorative top gradient accent (terracotta to sage)
- Category badge
- Article title
- Truncated lead text
- Nina Healthy branding

### 8.4 RSS Feed

`app/feed.xml/route.js` generates a full RSS 2.0 feed with all articles sorted by date (newest first). Cached for 1 hour.

### 8.5 Sitemap

`app/sitemap.js` generates entries for:
- 7 static routes (home, journal, practice, about, connect, privacy, terms)
- All journal article slugs

### 8.6 Robots

`app/robots.js` allows all crawlers (`*`) with a link to the sitemap.

---

## 9. Integrations

### 9.1 Google AdSense

- Script loaded in root layout via `next/script` with `strategy="afterInteractive"`
- Publisher ID: `ca-pub-2087636695455778`
- Verification file: `public/ads.txt`

### 9.2 Email (Nodemailer)

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

## 10. Environment Variables

| Variable | Purpose | Used By |
|---|---|---|
| `SMTP` | SMTP server hostname | `NewsletterAction`, `ContactAction` |
| `MAIL` | SMTP auth username (sender email) | `NewsletterAction`, `ContactAction` |
| `MAILP` | SMTP auth password | `NewsletterAction`, `ContactAction` |
| `MAILR` | Admin notification recipient email | `NewsletterAction`, `ContactAction` |

All are server-only (no `NEXT_PUBLIC_` prefix). Required for contact form and newsletter functionality.

---

## 11. Root Layout Shell

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

## 12. Page-Level Patterns

### Home Page (`/`)

Sections in order:
1. **Hero** with image, h1, subtitle, CTA button to `/practice`
2. **Philosophy** card ("What does healthy really mean?")
3. **Latest from the Journal** (3 most recent articles as Cards)
4. **Daily Invitation** (season-aware label + rotating invitation text)
5. **Words from Readers** (TestimonialCarousel)
6. **Newsletter Signup**

All sections (except hero) wrapped in `ScrollReveal`.

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

## 13. Image Conventions

### File Naming

| Image | File | Location |
|---|---|---|
| Home hero | `home-hero.png` | `public/images/` |
| About hero | `about-hero.png` | `public/images/` |
| Journal thumbnails | `journal-1.png` through `journal-20.png` | `public/images/` |
| Default OG | `og-default.png` | `public/` |
| Favicon | `icon.svg` | `app/` |

### Image-to-Article Mapping

Article slugs map to thumbnail images via `CARD_IMAGES` objects defined in:
- `app/page.js` (home page, subset)
- `app/journal/page.js` (journal index, all 20)
- `app/journal/[slug]/page.js` (article pages, all 20)

When adding new articles, all three locations must be updated.

---

## 14. Accessibility Checklist

These are already implemented. Maintain them:

- [x] Skip-to-content link (`<a href="#main-content">`)
- [x] Semantic landmarks (`<header>`, `<main>`, `<footer>`, `<nav>`, `<section>`, `<article>`)
- [x] `aria-label` on all `<section>` and `<nav>` elements
- [x] `aria-expanded` and `aria-modal` on mobile menu
- [x] Focus trap in mobile menu (Tab/Shift+Tab cycling, Escape to close)
- [x] `role="dialog"` and `aria-modal` on mobile nav overlay
- [x] Body scroll lock when mobile menu is open
- [x] `<time datetime="...">` for all dates
- [x] Descriptive `alt` text on all images
- [x] `aria-hidden="true"` on decorative SVGs
- [x] `:focus-visible` outline on all interactive elements
- [x] `prefers-reduced-motion` respected globally
- [x] `.visuallyHidden` class available for screen-reader-only text
- [x] Minimum 44x44px touch targets on interactive elements

---

## 15. File Conventions

| Convention | Rule |
|---|---|
| Components | One folder per component under `components/`, named in PascalCase |
| CSS Modules | Co-located `ComponentName.module.css` per component |
| No global selectors in modules | Never use `*`, `html`, or `body` selectors in `.module.css` files |
| Squircles over border-radius | Use `clip-path: var(--clip-path-squircle-*)` for cards and images |
| `next/image` only | Never use `<img>` tags |
| `next/link` only | Never use `<a>` for internal navigation |
| `next/script` only | Never use `<script>` tags directly (except JSON-LD) |
| SVG icons | Inline SVGs only; no icon libraries, no emoji |
| No em dashes | Use commas, semicolons, colons, or shorter sentences instead |
| Mobile-first CSS | Base styles for small screens; scale up with `min-width` queries |
| Breakpoints | `640px` (sm), `768px` (md), `1024px` (lg), `1280px` (xl) |
| Path alias | `@/` maps to project root |
| Server-only data | `ARTICLES` must never be imported in Client Components |

---

## 16. Error Handling

| Scenario | Handler | Type |
|---|---|---|
| Runtime error | `app/error.js` | Client Component with `reset()` retry |
| 404 | `app/not-found.js` | Server Component with links to Home and Journal |
| Loading | `app/loading.js` | Global loading skeleton |
| Journal loading | `app/journal/loading.js` | Journal-specific loading state |
| Article not found | Inline fallback in `app/journal/[slug]/page.js` | "Article not found" with back link |

---

## 17. Content Rules (Quick Reference)

- Nina speaks in first person
- Invite, do not instruct ("Try this" not "You must")
- No clinical language ("treatment", "therapy", "cure")
- No wellness cliches ("self-care journey", "live your best life")
- Acknowledge difficulty honestly
- Short paragraphs (2-4 sentences), varied rhythm
- Sensory, concrete language
- 2-3 internal links per article
- Descriptive anchor text (never "click here")
