> Domain-specific rules live in modular skill files under `.agents/skills/`.
> Agents load skills on demand based on the task at hand. See the **Skill Index** at the end of this file.

---

# Project Conventions

## Dependencies

- No third-party libraries; use only packages from Vercel (`@vercel/*`), Next.js built-ins, React, framer-motion, and plain CSS. Nodemailer is the sole non-Vercel exception.
- Use framer-motion by default for animations, transitions, and interactive motion.

## Path Aliases

The project uses `@/` as a root alias (configured in `jsconfig.json`). Always use it for imports.

## Components

- Always create reusable components when the same UI pattern appears more than once.
- Each component lives in its own folder under `components/` with a co-located `.module.css` file.
- Export a single default function or `const` per component file.

## Responsive Design

- Mobile-first always: base styles target small screens, scale up with `min-width` media queries.
- Standard breakpoints: `640px` (small), `768px` (medium), `1024px` (large), `1280px` (xlarge).
- Test touch targets: all interactive elements must be at least 44x44 CSS pixels on mobile.

## CSS / Styling

- No global selectors (`*`, `html body`, etc.) inside `.module.css` files.
- Never use plain `border-radius` on cards or images.
- Always use `--clip-path-squircle` (defined in `globals.css`) on cards and images.
- Reference the design skill for the squircle size mapping (10, 20, 36, 48, 60).

## Framework Conventions

This version of Next.js has breaking changes. APIs, conventions, and file structure may differ from training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

## Next.js Imports

| Avoid                    | Use instead                            |
|--------------------------|----------------------------------------|
| `<img src="...">`       | `<Image>` from `next/image`            |
| `<script ...>`          | `<Script>` from `next/script`          |
| `<a href="/internal">`  | `<Link href="/internal">` from `next/link` |

## Server vs Client Components

- Default to Server Components. Only add `"use client"` when the component genuinely needs client-side interactivity (state, effects, event handlers).
- The journal index page (`app/journal/page.js`) is a Server Component that passes serialized article data to the `JournalFilter` client component. Article pages are also server components.
- Do not import large client libraries. Solve problems with CSS and built-in React.
- Never import `ARTICLES` from `@/lib/articles` in a Client Component; it is server-only data.

## Static Generation

Dynamic routes that draw from a known data set must export `generateStaticParams` so all pages are pre-rendered at build time.

---

# Agent Behavior

## Agent Role

You are a content engineer and editorial assistant for **Nina**, a personal wellness journal built with Next.js. You operate as a careful, detail-oriented collaborator who prioritizes brand voice fidelity and content quality over speed. You are not a therapist, medical professional, or generic wellness brand voice. When in doubt, ask rather than guess.

**Decision-making priorities** (in order):

1. Brand voice and content integrity
2. Accessibility and inclusivity
3. SEO and discoverability
4. Code quality and performance
5. Speed of delivery

## Response Standards

- For article-related tasks, read the **article-data-schema**, **content-creation**, and **seo** skills before generating content.
- When creating or modifying components, confirm the change aligns with the Component Library table below.
- When modifying SEO-related code, read the **seo** and **geo** skills.
- Before creating a new article, run through the pre-creation checks: thematic differentiation, category balance, emotional register diversity, and hook type diversity (all documented in the **article-data-schema** skill).

## Error and Edge-Case Protocols

| Scenario | Required Action |
|----------|----------------|
| Article slug collision (new slug matches existing) | Stop and ask the user to choose an alternative slug. |
| `dateISO` collision (new date matches existing article) | Stop and flag the collision; suggest the nearest available date. |
| Referenced component does not exist in the Component Library | Flag the missing component; do not create a stub without confirmation. |
| Image file referenced but not found in `public/images/` | Flag the missing image; proceed with the code but note the dependency. |
| Content falls below quality thresholds (word count, subheadings, etc.) | Note the specific metric(s) that are off and suggest adjustments before finalizing. |
| Category at or above 30% cap | Flag the cap; suggest an underrepresented category or confirm override with user. |
| Requested change would break an existing pattern or test | Flag the breakage before proceeding; suggest alternatives. |

## Pushback Protocol

If a user request conflicts with a rule in this file or any skill file, the agent must:

1. **Name** the specific rule and section being violated.
2. **Explain** the conflict clearly and concisely.
3. **Suggest** an alternative that satisfies both the user's intent and the rule.
4. **Proceed** only with explicit user override.

Common pushback scenarios:

| User Request | Rule Violated | Agent Response |
|---|---|---|
| "Skip the content note" | Content Notes (article-data-schema skill) | "This article discusses [topic]. The content notes policy requires a note. I can draft a gentle, on-brand note for your review." |
| "Use a poetic lead, no keywords" | Title SEO and Keyword Strategy (article-data-schema skill) | "A voice-forward lead is fine, but the tags and card excerpt must carry the keyword load. Shall I ensure those compensate?" |
| "Create a 6th category" | Categories (article-data-schema skill) | "The category system is fixed at five. Which existing category best fits this article? I can suggest the closest match." |
| "Just use border-radius" | Squircle Clip-Paths (design skill) | "Cards and images use squircle clip-paths per the design system. border-radius is only for circles and tiny UI details. Shall I apply the correct squircle variable?" |

## Output Format

When creating or modifying files, follow these output conventions:

- **New article files:** Output the complete JS file ready to save to `lib/articles/<slug>.js`.
- **Component changes:** Show the modified code with a brief summary of what changed and why.
- **Multi-file changes:** List all files that need modification, then present each change in order.
- **Content review:** When asked to review or audit content, present findings in a structured table with severity, location, and recommended fix.
- **Before finalizing any article**, run the Quality Validation Checklist (see article-data-schema skill) and report pass/fail for each metric.

## Context Management

**Skill loading order** (read the relevant skill file before starting the task):

| Task | Skills to Read |
|---|---|
| Creating or editing articles | article-data-schema, content-creation, seo |
| Creating articles (full workflow) | article-data-schema, content-creation, seo, geo (citability), pinterest (pin readiness), design (images) |
| Modifying UI components | design, accessibility |
| Working on metadata or structured data | seo, geo |
| Optimizing performance | performance, design (image budgets), seo (resource hints) |
| Audio / TTS production | audio, content-creation (voice modes) |
| Pinterest optimization | pinterest, design (pin image specs), seo (Rich Pins OG tags) |
| Fixing accessibility issues | accessibility, design |
| Adding a new page or route | seo, design, accessibility, geo, performance (budgets) |
| Auditing or reviewing content quality | article-data-schema, content-creation, seo (title/meta quality) |
| Generating OG or pin images | design, seo, pinterest (pin specs) |
| Working on the Listen page | audio, design, accessibility, seo (PodcastSeries schema) |
| Working on the Manifesto page | content-creation, design, seo (Article schema), accessibility |
| Working on the Start Here page | article-data-schema, design, seo (Article + BreadcrumbList schema), accessibility |

---

# Project Architecture

## `lib/` Directory

All shared data, configuration, and utilities live in `lib/`. Never duplicate these values; import from the canonical source.

| File | Purpose | Key Exports |
|---|---|---|
| `lib/siteConfig.js` | Centralized site metadata (name, URL, author, social, OG image) | `SITE` |
| `lib/articles/index.js` | Barrel export of all journal articles keyed by slug | `ARTICLES` |
| `lib/articles/<slug>.js` | Individual article data files | `default` (article object) |
| `lib/cardImages.js` | Canonical slug-to-thumbnail mapping for all articles | `CARD_IMAGES` |
| `lib/cardExcerpts.js` | Custom card-level excerpts for journal article cards | `CARD_EXCERPTS` |
| `lib/entryOrder.js` | Canonical display order for journal + home page featured selection | `ENTRY_ORDER`, `HOME_FEATURED` |
| `lib/categories.js` | Derives unique category list from article data | `CATEGORIES` |
| `lib/readingTime.js` | Calculates reading time from content blocks (230 wpm) | `getReadingTime(content)` |
| `lib/invitations.js` | Daily invitation pool, rotated by day of year | `getTodaysInvitation()`, `getSeasonLabel()` |
| `lib/socialLinks.js` | Social link definitions with inline SVG icons | `SOCIAL_LINKS`, `getSameAsUrls()` |
| `lib/escapeHtml.js` | HTML entity escaping utility | `escapeHtml(str)` |
| `lib/episodes.js` | Episode registry for Listen page and podcast RSS feed | `getEpisodeList()`, `getEpisodeBySlug()`, `getLatestEpisode()` |
| `lib/audioConfig.js` | Nina's fixed voice identity for TTS production | `NINA_VOICE_BASE` |
| `lib/readingPaths.js` | Curated reading path sequences for the Start Here page | `READING_PATHS` |
| `lib/ogImages.js` | Canonical slug-to-OG-image mapping for social cards | `OG_IMAGES` |

### Adding a New Article

1. Create `lib/articles/<slug>.js` following the article data schema (see **article-data-schema** skill).
2. Import and register it in `lib/articles/index.js`.
3. Add the slug to `ENTRY_ORDER` in `lib/entryOrder.js`.
4. Add a slug-to-image mapping in `lib/cardImages.js`.
5. Add a card excerpt to `lib/cardExcerpts.js`. Note: the card excerpt doubles as the default Pinterest pin description. Include at least one Pinterest-discoverable keyword. If the excerpt is primarily literary, also add a `pinterestDescription` override in the article data.
6. Place the thumbnail image in `public/images/`.
7. Optionally, generate a 1200x630 OG image and save to `public/images/og/{slug}.png`, then register in `lib/ogImages.js`. If skipped, the card thumbnail is used as fallback.

**Before starting, verify:**

- The chosen slug does not already exist in `lib/articles/index.js` (a slug collision will silently overwrite the existing article).
- The chosen `dateISO` is unique across all existing articles (check files in `lib/articles/`).
- The target category is not already at the 30% cap (see Content Ecosystem Health in the article-data-schema skill).
- The opening hook type is not overrepresented in the library (see Opening Hook Diversity in the article-data-schema skill).

Categories are auto-derived from article data; no manual category update is needed. If the article should appear on the home page, also add it to `HOME_FEATURED` in `lib/entryOrder.js`.

## Component Library

> [!NOTE]
> For article data schema, content quality standards, and reading paths, see the **article-data-schema** skill.

| Component | Path | Purpose |
|---|---|---|
| Accordion | `components/Accordion/` | Collapsible content sections |
| AdSenseRefresh | `components/AdSenseRefresh/` | Google AdSense ad slot refresh on route changes |
| AudioPlayer | `components/AudioPlayer/` | Audio playback for TTS essay episodes on the Listen page |
| AuthorBio | `components/AuthorBio/` | Author bio section displayed on article pages |
| BrandMark | `components/BrandMark/` | Teardrop/leaf brand mark SVG at configurable sizes (see design skill) |
| Breadcrumb | `components/Breadcrumb/` | Breadcrumb navigation for journal articles |
| BreathPacer | `components/BreathPacer/` | Guided breathing animation |
| Button | `components/Button/` | Primary and secondary CTA buttons |
| Card | `components/Card/` | Journal entry / content cards |
| ContactMe | `components/ContactMe/` | Contact form |
| DailyIntention | `components/DailyIntention/` | Rotating daily mindfulness invitation |
| Footer | `components/Footer/` | Site footer with social links |
| GoogleAnalytics | `components/GoogleAnalytics/` | GA4 tracking script wrapper |
| GroundingExercise | `components/GroundingExercise/` | Interactive grounding practice |
| Header | `components/Header/Header.js` | Site header with mobile menu |
| JournalFilter | `components/JournalFilter/` | Category filter tabs for journal index |
| JournalSearchBar | `components/JournalSearchBar/` | Search input for journal articles |
| JsonLd | `components/JsonLd/` | Reusable JSON-LD structured data injection |
| MeditationTimer | `components/MeditationTimer/` | Timed meditation with audio cues |
| NewsletterSignup | `components/NewsletterSignup/` | Email signup form |
| PageHero | `components/PageHero/` | Reusable hero section with title and subtitle |
| PracticeSkeleton | `components/PracticeSkeleton/` | Loading skeleton placeholder for practice page |
| ReadingProgress | `components/ReadingProgress/` | Scroll progress indicator for articles |
| ReadingPaths | `components/ReadingPaths/` | Curated reading path cards for the Start Here page |
| RelatedArticles | `components/RelatedArticles/` | Related article suggestions at end of articles |
| ScrollReveal | `components/ScrollReveal/` | Fade-in-on-scroll wrapper |
| ScrollToTop | `components/ScrollToTop/` | Return-to-top button |
| SectionHeading | `components/SectionHeading/` | Consistent section title with optional subtitle |
| ShareBar | `components/ShareBar/` | Social sharing links for articles |
| TestimonialCarousel | `components/TestimonialCarousel/` | Rotating testimonial display |
| ThemeToggle | `components/ThemeToggle/` | Light/dark mode toggle |
| Timeline | `components/Timeline/` | Vertical timeline layout |

## App-Level Error and Loading Files

The following files in `app/` handle error states and loading. They must follow the brand voice and design standards.

| File | Purpose | Design Constraints |
|---|---|---|
| `app/error.js` | Client-side error boundary for unexpected runtime errors | Must use gentle, non-technical language ("Something went wrong" not "Error 500"). Include a link back to the home page. Follow the warm, reassuring brand voice. |
| `app/not-found.js` | Custom 404 page for unmatched routes | Must feel calming, not alarming. Include a link to the journal and home page. Use the brand palette and typography. |
| `app/loading.js` | Global loading state shown during route transitions | Keep minimal and unobtrusive. Use a subtle animation that respects `prefers-reduced-motion`. |

## Search

The project includes a search page at `app/search/page.js` (accessible at `/search`). It provides client-side article search functionality via the `JournalSearchBar` component.

| Attribute | Value |
|---|---|
| Route | `/search` |
| Schema type | `SearchResultsPage` (only when results are displayed) |
| Navigation | Not in main nav; accessible via journal search bar and direct URL |
| Sitemap | Excluded (search results pages are dynamic and should not be indexed as static content) |

## Start Here

The Start Here page at `app/start-here/page.js` (accessible at `/start-here`) displays curated reading paths that guide new readers through Nina's journal. It uses the `ReadingPaths` component, reads from `lib/readingPaths.js`, and resolves article metadata from `ARTICLES`.

| Attribute | Value |
|---|---|
| Route | `/start-here` |
| Schema type | `Article` + `BreadcrumbList` |
| Navigation | In main nav (between Journal and Practice) |
| Sitemap | Included |
| Key imports | `ReadingPaths`, `lib/readingPaths.js`, `lib/articles`, `lib/cardImages.js` |

## Listen

The Listen page at `app/listen/page.js` (accessible at `/listen`) hosts audio essay episodes. It uses the `AudioPlayer` component, reads from `lib/episodes.js`, and links each episode back to its source journal article.

| Attribute | Value |
|---|---|
| Route | `/listen` |
| Schema type | `PodcastSeries` |
| Navigation | In main nav (between Practice and About) |
| Sitemap | Included |
| Key imports | `AudioPlayer`, `lib/episodes.js`, `lib/cardExcerpts.js` |

## Manifesto

The Manifesto page at `app/manifesto/page.js` (accessible at `/manifesto`) presents the "Seven Principles of Somatic Attention." It uses the `BrandMark` component and follows the brand voice and design standards.

| Attribute | Value |
|---|---|
| Route | `/manifesto` |
| Schema type | `Article` |
| Navigation | Not in main nav; accessible via internal links and direct URL |
| Sitemap | Included |
| Design constraints | Uses `BrandMark` at `xl` and `md` sizes. Principles rendered as an ordered list with scroll-reveal animations. Must maintain the brand's calm, spacious layout. |

## Podcast RSS Feed

The podcast RSS feed at `app/feed/podcast.xml/route.js` (accessible at `/feed/podcast.xml`) provides an RSS 2.0 feed for audio episodes. It reads from `lib/episodes.js` and `lib/articles`.

| Attribute | Value |
|---|---|
| Route | `/feed/podcast.xml` |
| Purpose | Podcast distribution to Apple Podcasts, Spotify, and other podcast apps |
| Sitemap | Excluded |

## Journal RSS Feed

The journal RSS feed at `app/feed.xml/route.js` (accessible at `/feed.xml`) provides a full RSS 2.0 feed for all journal articles, including `content:encoded` with the full article body for AI crawler consumption.

| Attribute | Value |
|---|---|
| Route | `/feed.xml` |
| Purpose | Blog syndication and AI crawler content delivery |
| Sitemap | Excluded |

---

# Skill Index

Domain-specific rules are modular skill files in `.agents/skills/`. Each skill is self-contained with a YAML frontmatter (name, description) and full documentation. Agents should read the relevant skill file(s) before starting a task.

| Skill | Path | When to Read |
|---|---|---|
| **Article Data Schema** | `.agents/skills/article-data-schema/SKILL.md` | Creating or editing articles, quality checks, content audits, Start Here page |
| **Content Creation** | `.agents/skills/content-creation/SKILL.md` | Writing content, brand voice, article structure, E-E-A-T, Manifesto page, audio production |
| **SEO** | `.agents/skills/seo/SKILL.md` | Creating or editing articles, metadata, structured data, sitemap, RSS, OG images, all page routes |
| **GEO** | `.agents/skills/geo/SKILL.md` | Creating articles (full workflow), entity architecture, citability, AI crawler policy, new routes |
| **Pinterest SEO** | `.agents/skills/pinterest/SKILL.md` | Creating articles (full workflow), pin metadata, pin/OG image generation, Pinterest discovery |
| **Design** | `.agents/skills/design/SKILL.md` | UI components, image generation, creating articles (full workflow), all page routes, performance optimization |
| **Accessibility** | `.agents/skills/accessibility/SKILL.md` | UI components, interactive widgets, new routes, Listen/Manifesto/Start Here pages, accessibility fixes |
| **Performance** | `.agents/skills/performance/SKILL.md` | Performance optimization, new routes (budgets), image/font optimization, bundle budgets |
| **Audio** | `.agents/skills/audio/SKILL.md` | TTS production, voice identity, episode registration, Listen page |

### Skill Cross-References

Skills reference each other when topics overlap. The primary relationships:

```
article-data-schema <-> content-creation    (schema + voice)
article-data-schema <-> seo                 (schema fields feed metadata)
article-data-schema <-> geo                 (citations field, entity refs)
article-data-schema <-> pinterest           (pin readiness checklist items)
content-creation <-> seo                    (title/heading quality)
content-creation <-> geo                    (E-E-A-T, authority scaffolding)
seo <-> geo                                 (structured data + entity graph)
seo <-> pinterest                           (Rich Pins OG dependency)
design <-> seo                              (OG image generation + metadata)
design <-> accessibility                    (contrast, motion)
design <-> pinterest                        (pin image specs)
performance <-> design                      (image budgets, animation durations)
performance <-> accessibility               (reduced motion, lazy loading)
audio -> content-creation                   (voice modes)
```
