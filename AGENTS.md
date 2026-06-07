
<!-- ================================================================
     AGENTS.md -- Nina Healthy Project Rules
     Read by: Claude Code, Gemini, Codex, and all other AI agents
     Single source of truth for all project-specific rules.
     ✦ Precedence: This file overrides GEMINI.md (global defaults).
     ================================================================ -->

---

# Shared Rules

## Environment

- Never run `npm run dev`, `npm run build`, `npm run start`
- Never open a browser preview
- When DevTools output is needed, stop and ask the user to provide it

## Code Style

- No emoji in UI or content -- use modern inline SVG only
- No em dashes ( -- ) in any generated text or content; use commas, semicolons, colons, or shorter sentences instead
- No third-party libraries -- use only official Vercel packages, official Next.js built-ins, React, and plain CSS. ( an exception has been made for nodemailer)
- ✦ **Code comments:** Comment non-obvious decisions and "why" explanations. Add brief JSDoc-style comments on exported functions and components. Do not add trivial comments that restate the code. Use `// TODO:` for incomplete work and `// HACK:` for intentional workarounds.

## Path Aliases

The project uses `@/` as a root alias (configured in `jsconfig.json`). Always use it for imports:

```js
// Correct
import { ARTICLES } from "@/lib/articles";
import { SITE } from "@/lib/siteConfig";
import Card from "@/components/Card/Card";

// Incorrect -- do not use relative paths from pages
import { ARTICLES } from "../../../lib/articles";
```

> **Note:** Some older files (`app/page.js`, `app/layout.js`) still use relative imports (`../components/...`). New code must always use `@/`. Do not refactor the existing relative imports unless explicitly asked.

## Components

- Always create reusable components when the same UI pattern appears more than once
- Each component lives in its own folder under `components/` with a co-located `.module.css` file
- Export a single default function or `const` per component file

## Responsive Design

- Mobile-first always: base styles target small screens, scale up with `min-width` media queries
- Standard breakpoints: `640px` (small), `768px` (medium), `1024px` (large), `1280px` (xlarge)
- Test touch targets: all interactive elements must be at least 44x44 CSS pixels on mobile

## CSS / Styling

- No global selectors (`*`, `html body`, etc.) inside `.module.css` files
- Never use plain `border-radius` on cards or images
- Always use `--clip-path-squircle` (defined in `globals.css`) on cards and images
- Reference the Squircle Clip-Paths section below for the size mapping (10, 20, 36, 48, 60)

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

Dynamic routes that draw from a known data set must export `generateStaticParams` so all pages are pre-rendered at build time:

```js
export function generateStaticParams() {
  return Object.keys(ARTICLES).map((slug) => ({ slug }));
}
```

---

# ✦ Agent Behavior

<!-- ✦ NEW SECTION: Defines how the agent should reason, respond, and handle errors
     in the context of this project. Complements the global defaults in GEMINI.md. -->

## ✦ Response Standards

- For article-related tasks, always reference the Content Quality Standards section before generating content.
- When creating or modifying components, confirm the change aligns with the Component Library table before proceeding.
- When modifying SEO-related code, cross-reference the Metadata Architecture and Structured Data sections.

## ✦ Reasoning and Planning


- Before creating a new article, run through the pre-creation checks: thematic differentiation, category balance, emotional register diversity, and hook type diversity.

## ✦ Confirmation Gates

<!-- High-stakes operations require explicit user confirmation before execution. -->


## ✦ Error and Edge-Case Protocols

| Scenario | Required Action |
|----------|----------------|
| Article slug collision (new slug matches existing) | Stop and ask the user to choose an alternative slug. |
| `dateISO` collision (new date matches existing article) | Stop and flag the collision; suggest the nearest available date. |
| Referenced component does not exist in the Component Library | Flag the missing component; do not create a stub without confirmation. |
| Image file referenced but not found in `public/images/` | Flag the missing image; proceed with the code but note the dependency. |
| Ambiguous instruction (could be interpreted multiple ways) | Ask for clarification; present the interpretations you see. |
| Conflicting rules within this file | Follow the more specific rule; flag the conflict for the user to resolve. |
| Content falls below quality thresholds (word count, subheadings, etc.) | Note the specific metric(s) that are off and suggest adjustments before finalizing. |
| Category at or above 30% cap | Flag the cap; suggest an underrepresented category or confirm override with user. |

## ✦ Context Management

<!-- This file is approximately 55KB. Agents with limited context windows should
     prioritize sections based on the current task. -->

**Priority reading order** (if context is constrained):

1. **Shared Rules** -- environment, code style, component and CSS rules (always read)
2. **Agent Behavior** (this section) -- how to reason, confirm, and handle errors (always read)
3. **Content Quality Standards** (within Project Architecture) -- read when creating or editing articles
4. **Design Standards** -- read when creating or modifying UI components
5. **SEO Standards** -- read when working on metadata, structured data, or page-level changes
6. **Accessibility Standards** -- always reference when touching interactive components or forms
7. **Performance Guidelines** -- read when optimizing images, fonts, or Core Web Vitals

**Session continuity:**

- Each conversation is ephemeral. Do not assume prior context from previous sessions.
- When resuming work on a multi-step task, re-read the relevant section of this file before proceeding.
- If the user references a previous conversation, ask for the specific details rather than guessing.

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

### Adding a New Article

1. Create `lib/articles/<slug>.js` following the article data schema (see below).
2. Import and register it in `lib/articles/index.js`.
3. Add the slug to `ENTRY_ORDER` in `lib/entryOrder.js`.
4. Add a slug-to-image mapping in `lib/cardImages.js`.
5. Add a card excerpt to `lib/cardExcerpts.js`.
6. Place the thumbnail image in `public/images/`.

<!-- ✦ Validation steps added to catch common edge cases before starting. -->

**✦ Before starting, verify:**

- The chosen slug does not already exist in `lib/articles/index.js` (a slug collision will silently overwrite the existing article).
- The chosen `dateISO` is unique across all existing articles (check files in `lib/articles/`).
- The target category is not already at the 30% cap (see Content Ecosystem Health below).
- The opening hook type is not overrepresented in the library (see Opening Hook Diversity below).

Categories are auto-derived from article data; no manual category update is needed. If the article should appear on the home page, also add it to `HOME_FEATURED` in `lib/entryOrder.js`.

### Article Data Schema

Every article file must export a default object with these fields:

```js
const article = {
  title: "The Kindness of Routine",           // string, the article headline
  date: "May 6, 2026",                        // string, human-readable display date (full date: Month Day, Year)
  dateISO: "2026-05-06",                       // string, ISO 8601 for structured data (MUST be unique per article)
  dateModified: "2026-05-06",                  // string, ISO 8601, updated when article content changes
  category: "Rituals",                         // string, one of: Mindfulness, Intentional Living, Reflections, Rituals, Somatic Awareness
  lead: "Routine is not the enemy of freedom. It is the quiet structure that makes freedom possible.",
                                                // string, 1-2 sentences; doubles as meta description (150-160 chars ideal)
  contentNote: null,                           // string|null, trauma-informed content warning
  tags: ["routine", "morning practice", "daily rhythm"],
                                                // string[], 2-5 topic-specific tags for semantic SEO (never generic)
  relatedSlugs: ["morning-rituals-that-anchor-me", "the-quiet-power-of-a-slow-morning"],
                                                // string[], optional; 2-3 curated slugs for the RelatedArticles component
  content: [
    { type: "paragraph", text: "..." },        // body paragraph
    { type: "subheading", text: "..." },       // h2 section break
    { type: "quote", text: "..." },            // pull quote / blockquote
    { type: "list", items: ["...", "..."] },   // bulleted list (optional)
    { type: "divider" },                       // decorative dots before closing section
  ],
};

export default article;
```

#### Content block rules

- Every article must have at least one `subheading`, one `quote`, and one `divider`.
- The `divider` always appears before the final closing invitation paragraph(s).
- `contentNote` is required (set to `null` if not applicable) for pieces discussing anxiety, overwhelm, grief, burnout, perfectionism, depression, or emotional distress.

#### Content Quality Standards

These standards ensure a consistent quality baseline across the library. Every new article and every revised article must meet them.

##### Date Uniqueness

- Every article must have a **unique `dateISO`** value. No two articles may share the same ISO date.
- The `date` display field must use the full format: `"Month Day, Year"` (e.g., `"May 6, 2026"`), not month-year shorthand.
- When adding a new article, verify the chosen date does not collide with any existing article.
- `dateModified` must be present and set to `dateISO` on initial creation, then updated whenever content changes.

##### Lead / Meta Description

- The `lead` field doubles as the article's meta description. It must be **150-160 characters** to maximize SERP click-through.
- It must answer "why should I read this?" with a benefit or provocative question, not just describe the topic.
- It must end with a period.

##### Tags

- Every article must include a `tags` array of 2-5 topic-specific keywords.
- Tags must be unique to the article's subject matter; never use generic site-level tags like `"mindfulness"` or `"intentional living"` unless the article is directly about that concept.
- Tags are used for OpenGraph metadata and internal semantic grouping.

##### Depth and Structure

- Every article must have a minimum of **3 subheadings** to ensure adequate depth and scannability.
- Every article should target **700-1000 words** of body content (excluding metadata). Shorter articles risk reading as blog advice rather than essay-grade reflection.
- At least one section should include a named concept, researcher, cultural reference, or specific anecdote that grounds the piece in irreplaceable personal experience.
- Use the `list` content block type when describing sequences, steps, or enumerated practices rather than embedding them in paragraph prose.

##### Categories

Allowed categories (exactly five):

| Category | Focus |
|---|---|
| Mindfulness | Present-moment awareness, attention, stillness, meditation |
| Intentional Living | Boundaries, choices, digital habits, sleep, productivity with purpose |
| Reflections | Personal essays, identity, grief, meaning-making, vulnerability |
| Rituals | Morning routines, seasonal practices, cooking, breathwork, daily rhythms |
| Somatic Awareness | Body-mind connection, physical sensation, embodied practice, nervous system |

##### Content Notes

Articles must include a `contentNote` (not `null`) when the content discusses any of the following:

- Anxiety, panic, or overwhelm
- Grief, loss, or mourning (named or unnamed)
- Burnout or emotional exhaustion
- Depression or persistent low mood
- Perfectionism as a fear/shame response
- Body awareness that may be activating for trauma survivors
- Disordered eating or emotional hunger
- Insomnia or sleep distress

The note should be 1-2 sentences, written in the brand voice (gentle, non-clinical), and include an exit ramp such as "Read at your own pace" or "Take breaks as needed."

##### Thematic Differentiation

Before creating a new article, review existing articles in the same category for thematic overlap. If a similar topic already exists:

- The new article must clearly differentiate itself in the `title`, `lead`, and opening paragraphs.
- Consider whether the existing article should be revised and deepened instead of creating a new one.
- Use `relatedSlugs` (if available) or the `RelatedArticles` component to explicitly cross-link similar articles so search engines understand they serve different intents.

##### Title SEO and Keyword Strategy

- Titles should be literary and on-brand, but the `lead` field must carry discoverable search keywords that the title omits.
- If the title is poetic (e.g., "The Long Exhale"), the lead must include the functional keyword (e.g., "breathing technique", "nervous system").
- Avoid titles that have zero search-discoverable keywords unless the lead compensates fully.
- The `cardExcerpts.js` entry can also carry keyword-rich language to bridge the gap between poetic titles and search intent.

##### Content Depth Baseline (Tier 1 Standard)

All articles must meet this quality baseline. Articles that fall below it should be revised before new articles are created.

| Metric | Minimum |
|---|---|
| Word count (body text) | 700 words |
| Subheadings | 3 |
| Named research, concept, or cultural reference | 1 |
| Personal anecdote with specific detail | 1 |
| Closing invitation (after divider) | 1, with opt-out language |

Signs that an article is below baseline:

- Only 2 subheadings (indicates insufficient depth)
- No named researchers, traditions, or specific anecdotes (reads as generic advice)
- Under 500 words of body content (reads as a blog post, not an essay)
- Closing paragraph that commands rather than invites

##### Related Articles Curation

- Every article should include a `relatedSlugs` array of 2-3 editorially curated article slugs.
- The `getRelatedArticles` function in `app/journal/[slug]/page.js` prioritizes these curated slugs, then falls back to category matching.
- When choosing related slugs, prefer articles that complement (different angle on adjacent topic) over articles that duplicate (same angle on same topic).
- Cross-category pairings are encouraged when thematically natural (e.g., a "Rituals" article about breathwork paired with a "Somatic Awareness" article about body sensation).

##### Technical Consistency

- **Line endings:** All article files must use LF (`\n`) line endings, not CRLF. Configure `.gitattributes` to enforce this.
- **Reading time:** The `readingTime.js` utility counts text from paragraph, quote, subheading, and list blocks at 230 wpm. When adding new block types, ensure they are included in the word count.
  <!-- ✦ Rationale: 230 wpm is the average silent reading speed for non-fiction English
       prose (Brysbaert, 2019). This produces reading time estimates that match user
       expectations better than the commonly used but inflated 200 wpm or 250 wpm figures. -->
- **No Unicode special characters:** Do not use em dashes (`\u2014`), en dashes (`\u2013`), or other typographic Unicode in article text. Use standard ASCII punctuation (commas, semicolons, colons).
  <!-- ✦ Rationale: Unicode typographic characters cause inconsistent rendering across
       email clients, RSS readers, and some CMS exports. ASCII punctuation is universally
       safe and avoids encoding issues in downstream consumers of the RSS feed. -->

##### Opening Hook Diversity

The library must maintain diversity in opening rhetorical strategies. No more than 40% of articles should share the same hook pattern. When creating a new article, check the existing library and choose a hook type that is underrepresented.

Approved hook types (aim for a balanced mix across the library):

| Hook Type | Description | Example |
|---|---|---|
| Confession | First-person admission of past behavior or belief | "I used to treat sleep like a project." |
| Scene | A concrete moment with setting, time, and sensory detail | "It was eleven at night, and I was standing in front of the open refrigerator." |
| Paradox | Naming a contradiction the reader already feels but has not articulated | "There are two kinds of walking." |
| Question | A genuine question that reframes something the reader takes for granted | "What if sleep is the one thing that cannot be optimized?" |
| Observation | A third-person notice about the world that implicates the reader | "We live in artificial constancy." |

Do not default to the confession pattern. If the library already has many "I used to..." openings, choose a scene, paradox, question, or observation instead.

##### Sensory Grounding

Every article must contain at least three instances of named physical sensation (temperature, texture, weight, sound, smell, taste, or specific visual detail). Sensory language must be specific and irreplaceable, not generic.

| Weak (generic) | Strong (specific) |
|---|---|
| "a warm drink" | "a cup of chamomile, still too hot to hold" |
| "outside sounds" | "the sound of rain tapping on a single-pane window" |
| "a comfortable space" | "the weight of the blanket when I first sit up" |
| "I felt calm" | "something in my chest loosened that I did not know was tight" |

Sensory detail is what distinguishes essay-grade writing from advice-grade writing. Articles that rely primarily on conceptual language without physical grounding should be revised before new articles are created.

##### Emotional Range

The library must represent a full spectrum of human emotional experience. Track the dominant emotional register of each article and maintain diversity across the collection.

Required representation targets (across the full library):

| Register | Target |
|---|---|
| Acceptance / peace | Maximum 50% (to avoid a false-arrival tone) |
| Active difficulty (unresolved) | At least 15% |
| Joy, humor, or lightness | At least 10% |
| Curiosity and wonder | At least 10% |
| Grief, sorrow, or loss | At least 5% |

When an article reaches a resolution, include at least one sentence acknowledging that the resolution is not permanent (e.g., "This is not a place I have arrived. It is a direction I keep choosing."). Avoid the implication that the struggle is fully behind the author.

Do not let the library become uniformly solemn. Include moments of genuine humor, wry self-awareness, or playful observation. The absence of lightness makes the brand voice feel performatively serious.

##### Pacing and Rhythm

Articles must vary their paragraph length deliberately. A uniform wall of medium-length paragraphs creates monotone pacing.

Rules:

- Every article must contain at least one paragraph of 25 words or fewer, used for rhetorical emphasis (e.g., "But that is not what gentleness is. Not the kind I mean.").
- No more than 3 consecutive paragraphs should be in the same length range (short / medium / long).
- When an article describes a sequence, practice, or set of options, use the `list` content block instead of embedding items in paragraph prose.
- After a dense, long section, follow with a shorter paragraph or a pull quote to create visual and cognitive breathing room.
- For articles over 800 words, consider using two pull quotes instead of one. Place the second near the closing section for rhythm.

##### Authority Scaffolding

Every article must include at least one of the following authority anchors:

1. A **named researcher or author**, with their field identified (e.g., "Lisa Feldman Barrett, a neuroscientist who has studied this extensively")
2. A **named cultural tradition or practice**, with its lineage acknowledged (e.g., "pranayama, from the Vedic tradition")
3. A **named scientific concept** with a plain-language explanation (e.g., "interoception, the ability to sense internal body states")

Quality rules:

- When referencing a specific study finding (a percentage, a measurable outcome, a named effect), name the researchers or institution. Vague references like "studies show" or "research suggests" should be reserved only for well-established, consensus-level findings that do not depend on a single study.
- When a quote is widely misattributed, note the uncertainty ("often attributed to...") rather than stating it as fact.
- When the author lacks evidence for a personal claim, name the gap honestly. But also check whether supporting evidence exists; many experiential claims have published literature that strengthens the article without overstating certainty.
- Never fabricate a citation, invent a researcher, or attribute a finding to a field that has not produced it. If no credible source exists, rely on personal experience framed as such.

##### Closing Invitation Quality

The closing invitation (the paragraph(s) after the divider) must meet all of these criteria:

1. **Specific**: Name a concrete action the reader can take ("try placing your feet flat on the floor and taking one full breath"), not a vague one ("be more mindful today").
2. **Brief**: The closing should be no more than 3-4 sentences. Simplicity is the goal; do not re-argue the article's thesis in the closing.
3. **Conditional**: Use opt-in framing: "if you are willing", "if it feels right", "when you are ready". Never use bare imperatives ("Look at your calendar", "Take five minutes to clean your workspace") without conditional language.
4. **Low-barrier**: The suggested action should require no equipment, no cost, and less than 5 minutes. It should be doable right now, wherever the reader is.
5. **Exit ramp**: End with permission to not do it: "If it does not help, let it go." or "That is enough for today." The reader must never feel commanded.

Articles whose closing invitations read as commands (bare imperatives without opt-out language) must be revised.

##### Thematic Cluster Management

When three or more articles cover overlapping territory, they form a thematic cluster. Clusters are valuable (depth signals authority), but they require active management to avoid content cannibalization.

Rules:

- When creating a new article, scan the existing library for thematic overlap. If a similar topic already exists, the new article must clearly differentiate itself in the title, lead, and opening paragraphs.
- Consider whether deepening and revising an existing article is more valuable than creating a new one on a similar topic.
- Articles within a cluster must use `relatedSlugs` to cross-link each other, so search engines understand they serve different intents.
- Each article in a cluster must target a distinct search intent. For example, in a "morning/routine" cluster: one article covers the emotional case for routine, another covers a specific ritual sequence, a third covers the science of morning cortisol. They share a theme but not an angle.

Current clusters to monitor:

| Cluster | Articles | Differentiation Status |
|---|---|---|
| Morning / routine | `morning-rituals-that-anchor-me`, `the-quiet-power-of-a-slow-morning`, `the-kindness-of-routine` | Needs sharper differentiation in leads and openings |
| Breathing / nervous system | `breathing-through-the-overwhelm`, `the-long-exhale`, `the-body-keeps-a-quiet-score` | Well-differentiated |
| Boundaries / availability | `the-gentle-discipline-of-saying-no`, `the-weight-of-being-available`, `digital-minimalism-in-a-loud-world` | Moderate overlap; each should target a different angle |
| Nature as metaphor | `water-as-teacher`, `what-the-garden-teaches`, `seasonal-living-as-practice` | Well-differentiated by subject matter |
| Body / embodiment | `the-body-keeps-a-quiet-score`, `the-body-you-are-in`, `living-alongside-pain` | Well-differentiated (sensation vs. image vs. chronic pain) |
| Emotional processing | `anger-as-information`, `the-permission-to-weep`, `tending-the-inner-weather` | Well-differentiated (anger vs. tears vs. general weather) |
| Rest / recovery | `the-art-of-doing-nothing`, `sleep-as-surrender`, `rest-is-not-recovery` | Well-differentiated (stillness vs. sleep vs. active recovery) |

##### Content Ecosystem Health

The article library must be managed as a balanced ecosystem, not an unplanned collection.

**Category balance:**

- No single category should exceed 30% of the total library.
- No category should fall below 10% of the total library.
- When a category is underrepresented, prioritize new articles for that category before creating additional articles in dominant categories.

**Content gap planning:**

- Maintain awareness of topic gaps that align with the brand and have search potential.
- Prioritize gap-filling over cluster-deepening when the library already has 3 or more articles in a single thematic cluster.
- Before creating a new article, verify: (a) the topic is not already covered, (b) the target category is not already over-represented, (c) the emotional register is not already dominant in the library.

**Current category distribution (as of June 2026, 40 articles):**

<!-- ✦ STALE DATA WARNING: This snapshot reflects the library as of June 2026.
     Before using these numbers for category-balance decisions, verify the actual
     article count by checking lib/articles/index.js against the current codebase. -->

| Category | Count | % | Status |
|---|---|---|---|
| Mindfulness | 8 | 20% | Healthy |
| Intentional Living | 10 | 25% | Healthy; near cap |
| Reflections | 10 | 25% | Healthy; near cap |
| Rituals | 7 | 17.5% | Healthy |
| Somatic Awareness | 5 | 12.5% | Improved; above minimum |

## Component Library

| Component | Path | Purpose |
|---|---|---|
| Accordion | `components/Accordion/` | Collapsible content sections |
| BreathPacer | `components/BreathPacer/` | Guided breathing animation |
| Button | `components/Button/` | Primary and secondary CTA buttons |
| Card | `components/Card/` | Journal entry / content cards |
| ContactMe | `components/ContactMe/` | Contact form |
| DailyIntention | `components/DailyIntention/` | Rotating daily mindfulness invitation |
| Footer | `components/Footer/` | Site footer with social links |
| GroundingExercise | `components/GroundingExercise/` | Interactive grounding practice |
| Header | `components/Header/Header.js` | Site header with mobile menu |
| JournalFilter | `components/JournalFilter/` | Category filter tabs for journal index |
| JsonLd | `components/JsonLd/` | Reusable JSON-LD structured data injection |
| MeditationTimer | `components/MeditationTimer/` | Timed meditation with audio cues |
| NewsletterSignup | `components/NewsletterSignup/` | Email signup form |
| PageHero | `components/PageHero/` | Reusable hero section with title and subtitle |
| ReadingProgress | `components/ReadingProgress/` | Scroll progress indicator for articles |
| RelatedArticles | `components/RelatedArticles/` | Related article suggestions at end of articles |
| ScrollReveal | `components/ScrollReveal/` | Fade-in-on-scroll wrapper |
| ScrollToTop | `components/ScrollToTop/` | Return-to-top button |
| SectionHeading | `components/SectionHeading/` | Consistent section title with optional subtitle |
| ShareBar | `components/ShareBar/` | Social sharing links for articles |
| TestimonialCarousel | `components/TestimonialCarousel/` | Rotating testimonial display |
| ThemeToggle | `components/ThemeToggle/` | Light/dark mode toggle |
| Timeline | `components/Timeline/` | Vertical timeline layout |

---

# SEO Standards

These rules apply to every page and component that affects search visibility.

## Metadata Architecture

### Root Layout (`app/layout.js`)

The root layout must export a `metadata` object with at minimum:

```js
import { SITE } from "@/lib/siteConfig";

export const metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: SITE.name,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  openGraph: {
    title: SITE.name,
    description: SITE.description,
    url: SITE.url,
    siteName: SITE.name,
    locale: 'en_US',
    type: 'website',
    images: [SITE.ogImage],
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE.name,
    description: SITE.description,
    images: [SITE.ogImage.url],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: SITE.url,
  },
};
```

### Per-Page Metadata

Every route segment (`page.js`) must export its own `metadata` (or `generateMetadata` for dynamic routes) that includes:

| Field | Requirement |
|---|---|
| `title` | Unique, descriptive, 50-60 characters. Uses the `template` from layout. |
| `description` | Unique, compelling, 150-160 characters. Summarize user benefit, not just topic. |
| `openGraph.title` | Match or expand on `title`. |
| `openGraph.description` | Match or expand on `description`. |
| `openGraph.url` | The canonical URL for this specific page. |
| `openGraph.images` | At least one 1200x630 image with descriptive `alt` text. |
| `alternates.canonical` | The canonical URL. Required for every page. |

### Dynamic Routes (Journal Articles)

For `app/journal/[slug]/page.js` use `generateMetadata`:

```js
import { ARTICLES } from "@/lib/articles";
import { SITE } from "@/lib/siteConfig";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const article = ARTICLES[slug];
  if (!article) return { title: "Article Not Found" };
  return {
    title: article.title,
    description: article.lead || article.content.find((b) => b.type === "paragraph")?.text.slice(0, 160),
    openGraph: {
      title: article.title,
      description: article.lead,
      url: `${SITE.url}/journal/${slug}`,
      type: 'article',
      publishedTime: article.dateISO,
      authors: [SITE.author.name],
      section: article.category,
    },
    alternates: {
      canonical: `${SITE.url}/journal/${slug}`,
    },
  };
}
```

## Structured Data (JSON-LD)

Embed JSON-LD structured data in every page that qualifies. Use the reusable `JsonLd` component at `components/JsonLd/JsonLd.js`:

```jsx
import JsonLd from "@/components/JsonLd/JsonLd";

// Usage in any page component:
<JsonLd data={structuredDataObject} />
```

### Required Schemas

| Page | Schema Type | Key Properties |
|---|---|---|
| Home `/` | `WebSite` + `Organization` | `name`, `url`, `logo`, `sameAs` (from `getSameAsUrls()`), `potentialAction` (SearchAction if search exists) |
| Journal index `/journal` | `CollectionPage` + `ItemList` | `itemListElement` with each article as a `ListItem` |
| Journal article `/journal/[slug]` | `Article` or `BlogPosting` | `headline`, `author`, `datePublished`, `dateModified`, `description`, `image`, `publisher`, `mainEntityOfPage` |
| About `/about` | `Person` + `FAQPage` | `name`, `description`, `url`, `sameAs`; FAQ items as `Question`/`Answer` pairs |
| Practice `/practice` | `WebPage` with `specialty` | `name`, `description`, `specialty: "Mindfulness"` |
| Connect `/connect` | `ContactPage` | `name`, `url` |

### Article Schema Example

```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "The Kindness of Routine",
  "description": "Routine is not the enemy of freedom. It is the quiet structure that makes freedom possible.",
  "author": {
    "@type": "Person",
    "name": "Nina",
    "url": "https://ninahealthy.com/about"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Nina Healthy",
    "url": "https://ninahealthy.com",
    "logo": {
      "@type": "ImageObject",
      "url": "https://ninahealthy.com/icon.svg"
    }
  },
  "datePublished": "2026-05-06",
  "dateModified": "2026-05-06",
  "mainEntityOfPage": "https://ninahealthy.com/journal/the-kindness-of-routine",
  "image": "https://ninahealthy.com/images/journal-21.png"
}
```

## Heading Hierarchy

- **One `<h1>` per page.** No exceptions.
- Headings must follow a strict descending order: `h1` then `h2` then `h3`. Never skip levels (e.g., `h1` to `h3`).
- The `<h1>` must contain the page's primary keyword or topic naturally.
- Subheadings (`h2`, `h3`) should be descriptive and scannable; they act as an outline.

## Semantic HTML

| Purpose | Element |
|---|---|
| Page regions | `<header>`, `<main>`, `<footer>`, `<nav>`, `<aside>` |
| Content sections | `<section>` with `aria-label` or `aria-labelledby` |
| Blog posts / entries | `<article>` |
| Time-sensitive content | `<time datetime="YYYY-MM-DD">` |
| Quotes | `<blockquote>` with optional `<cite>` |
| Lists of links or items | `<ul>` / `<ol>` with `<li>` |
| Figures with captions | `<figure>` + `<figcaption>` |
| Abbreviations | `<abbr title="...">` |

Never use `<div>` or `<span>` when a semantic element exists for the purpose.

## URL Structure

- All URLs must be lowercase, hyphenated, and human-readable
- No trailing slashes (Next.js default)
- Journal slugs should mirror the article title: `/journal/the-art-of-doing-nothing`
- Keep URLs under 75 characters where possible
- No unnecessary nesting -- keep it flat as `/journal/article`

## Internal Linking

- Every journal article should link to at least one other related article (use `RelatedArticles` component)
- The home page should surface the latest or most relevant journal entries
- Use descriptive anchor text; never use "click here" or "read more" without surrounding context (screen readers read links out of context)
- Navigation must include all primary routes: Home, Journal, Practice, About, Connect

## Image SEO

- Every `<Image>` must have a descriptive `alt` attribute that conveys the image's content and function
- Decorative images should use `alt=""` and `aria-hidden="true"`
- Use the `priority` prop on above-the-fold hero images (LCP candidates)
- Specify `sizes` for responsive images to prevent unnecessary downloads
- Use descriptive filenames: `morning-ritual-tea-cup.png` not `IMG_4382.png`
- Always provide `width` and `height` (or use `fill` with a sized container) to prevent CLS

## Sitemap and Robots

- `app/sitemap.js` generates the sitemap listing all static routes and journal slugs
- `app/robots.js` allows all crawlers and links to the sitemap
- Both files already exist; update them when adding new static routes

### Sitemap Pattern

```js
import { ARTICLES } from "@/lib/articles";
import { SITE } from "@/lib/siteConfig";

export default function sitemap() {
  const staticRoutes = ['', '/journal', '/practice', '/about', '/connect', '/privacy', '/terms'];
  const journalSlugs = Object.keys(ARTICLES);

  return [
    ...staticRoutes.map((route) => ({
      url: `${SITE.url}${route}`,
      lastModified: new Date(),
      changeFrequency: route === '' ? 'weekly' : 'monthly',
      priority: route === '' ? 1.0 : 0.8,
    })),
    ...journalSlugs.map((slug) => ({
      url: `${SITE.url}/journal/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    })),
  ];
}
```

## RSS Feed

The project has a full RSS 2.0 feed at `app/feed.xml/route.js` (accessible at `/feed.xml`). The root layout advertises it via `alternates.types["application/rss+xml"]`. When adding new articles, no manual feed update is needed; it reads from `ARTICLES` automatically.

---

# Design Standards

These rules define the visual language of Nina Healthy across all pages and components.

## Design Philosophy

Nina Healthy's design must communicate: calm, warmth, intentionality, and spaciousness. Every visual decision should ask: "Does this reduce cognitive noise or add to it?"

### Core Principles

1. **Breathing room over density.** Generous whitespace is a feature, not wasted space. Prioritize high-density whitespace to lower cognitive friction. The UI must structurally induce calm through uncrowded layout hierarchies.
2. **Warmth over neutrality.** The palette is earthy and organic. Avoid sterile, corporate, or high-contrast aesthetics. Use biologically soothing, low-saturation, nature-mimicking color palettes.
3. **Subtlety over spectacle.** Animations and transitions should feel like a gentle exhale, not a firework. If a user notices the animation more than the content, it is too much.
4. **Consistency over novelty.** Reuse the established palette, spacing, and type scale. Do not introduce one-off colors, fonts, or patterns.
5. **Agency over coercion.** The user maintains total control over their sensory experience. Never include autoplay audio, un-skippable animations, or intrusive modal pop-ups. Design clear "exit" or "pause" mechanics within experiential flows (e.g., breath sessions, meditation timers).

### Cognitive Load Management

- Present data and user pathways linearly. Prevent choice paralysis by enforcing progressive disclosure for complex content.
- Avoid gamification tactics that leverage anxiety, FOMO, or artificial urgency (e.g., breaking "streaks" aggressively). Reward consistency through reflective metrics and soft milestones.
- Design interfaces that feel private and safe. Keep personal data minimized on visible surfaces.

## Color System

All colors are defined as CSS custom properties in `globals.css`. Always reference the variable, never hardcode hex values.

| Variable | Light Mode | Dark Mode | Usage |
|---|---|---|---|
| `--color-cream` | `#FAF7F2` | `#1A1714` | Page background |
| `--color-linen` | `#F3EDE4` | `#2A2520` | Card / section backgrounds |
| `--color-warmwhite` | `#FEFCF8` | `#221E1A` | Subtle background variant |
| `--color-charcoal` | `#3D3832` | `#E8E0D6` | Primary text |
| `--color-stone` | `#6B6560` | `#B0A89E` | Secondary text |
| `--color-pebble` | `#9A9490` | `#8A837D` | Tertiary / caption text |
| `--color-terracotta` | `#C07A56` | `#D4926B` | Primary accent, CTAs |
| `--color-sage` | `#8FA98B` | `#A3BDA0` | Secondary accent |
| `--color-olive` | `#6B7D5E` | `#8A9E7D` | Hover states |
| `--color-clay` | `#C4A882` | `#B09974` | Borders, subtle UI |
| `--color-sand` | `#E8DFD0` | `#3D3530` | Light accent backgrounds |

### Color Usage Rules

- **Text contrast:** Primary text (`--color-charcoal` on `--color-cream`) must meet WCAG 2.2 AA minimum (4.5:1 for body text, 3:1 for large text). Verify contrast ratios when combining any foreground/background pair.
- **Accent restraint:** Terracotta is reserved for CTAs, active states, and key highlights. Do not use it for decorative backgrounds or large surfaces.
- **Dark mode parity:** Every component must render correctly in both light and dark modes. The dark palette in `globals.css` handles this via `prefers-color-scheme: dark`. Do not create separate dark-mode stylesheets.
- **Error states:** Avoid harsh warning reds. Use soft, grounding earth tones or informative ambers for validation feedback that does not trigger anxiety.

## Typography

| Role | Font | Variable | Fallback Stack |
|---|---|---|---|
| Headings | Playfair Display | `var(--font-heading)` | Georgia, "Times New Roman", serif |
| Body | Lora | `var(--font-body)` | Georgia, "Times New Roman", serif |

Both fonts are loaded via `next/font/google` with `display: 'swap'` in `app/layout.js`.

### Type Scale (Mobile-First)

| Element | Mobile | Desktop (min-width: 768px) | Weight |
|---|---|---|---|
| `h1` | `2rem` | `2.75rem` - `3.5rem` | 700 |
| `h2` | `1.5rem` | `2rem` - `2.25rem` | 600-700 |
| `h3` | `1.25rem` | `1.5rem` | 600 |
| Body text | `1rem` | `1.05rem` - `1.125rem` | 400 |
| Captions / meta | `0.85rem` | `0.9rem` | 400 |
| Buttons | `0.95rem` | `1rem` | 600 |

### Typography Rules

- **Line height:** Body text should use `1.7` - `1.8` for comfortable reading. Headings use `1.2` - `1.3`.
- **Measure (line length):** Body text should never exceed `65ch` (`max-width: 65ch`). This is critical for readability and neurodivergent-friendly design.
  <!-- ✦ Rationale: 65ch (approximately 45-75 characters per line) is the typographic
       standard for comfortable reading (Bringhurst, Elements of Typographic Style).
       Lines beyond this range increase saccade distance and reduce comprehension,
       disproportionately affecting readers with ADHD or visual processing differences. -->
- **Letter spacing:** Headings may use slight negative tracking (`-0.01em` to `-0.02em`). Body text stays at default. Generous character spacing accommodates cognitively fatigued users.
- **Font smoothing:** Already enabled globally via `-webkit-font-smoothing: antialiased` and `-moz-osx-font-smoothing: grayscale`.

## Spacing System

Use a consistent spacing scale based on `rem` units:

| Token | Value | Usage |
|---|---|---|
| `0.25rem` | 4px | Micro gaps (icon padding) |
| `0.5rem` | 8px | Tight spacing (inline elements) |
| `1rem` | 16px | Standard element spacing |
| `1.5rem` | 24px | Section padding (mobile) |
| `2rem` | 32px | Between content blocks |
| `3rem` | 48px | Section gaps |
| `4rem` | 64px | Major section separation |
| `6rem` - `8rem` | 96-128px | Hero / page-level vertical padding |

## Animation and Motion

### Guiding Principle

Motion should feel like breathing: slow, smooth, and natural. Design transitions to mimic natural physiological rhythms. It reinforces the brand's sense of calm.

### Transition Defaults

```css
/* Standard transition for interactive elements */
transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

/* Subtle hover lift for cards */
transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1),
            box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1);

/* Fade-in for content entering view */
transition: opacity 0.6s ease, transform 0.6s ease;
```

### Motion Rules

- **Reduced motion:** Always wrap animations in a `prefers-reduced-motion` check. The global stylesheet already includes a blanket override; respect it in component-level animations too.
- **Duration range:** Keep transitions between `0.2s` (micro-interactions like button hover) and `0.8s` (page-level reveals). Nothing should exceed `1s`.
- **Easing:** Use `cubic-bezier(0.4, 0, 0.2, 1)` (ease-out variant) for most UI transitions. Avoid linear easing.
- **No bounce or overshoot:** The brand is calm and grounded. No spring physics or elastic easings.
- **Hover effects:** Cards may lift slightly (`translateY(-4px)`) and gain a subtle shadow. Links gain color change. Buttons shift background. Keep it minimal.
- **Scroll animations:** If used, they must be CSS-only (e.g., `@keyframes` triggered by scroll-driven animation or intersection observer). Keep them understated: a gentle fade + slight upward translate (`translateY(16px)` to `translateY(0)`).
- **Experiential flows:** Breath pacer, meditation timer, and grounding exercise animations must include visible pause/stop controls and respect user agency at all times.

## Squircle Clip-Paths

Cards and images use `clip-path` instead of `border-radius`. The squircle variables are defined in `globals.css`.

<!-- ✦ Rationale: Squircles (superellipse curves) produce corners with continuous
     curvature, unlike CSS border-radius which creates abrupt circular arcs. Apple's
     iOS uses the same geometry for app icons. The result is a softer, more organic
     appearance that aligns with the brand's warmth-over-sterility design principle. -->

| Variable | Radius Equivalent | Use Case |
|---|---|---|
| `--clip-path-squircle-10` | ~10px | Small elements, badges, tags |
| `--clip-path-squircle-20` | ~20px | Buttons, inputs, small interactive elements |
| `--clip-path-squircle-36` | ~36px | Images |
| `--clip-path-squircle-48` | ~48px | Cards |
| `--clip-path-squircle-60` | ~60px | Large sections, hero images |

### Squircle Rules

- Never use `border-radius` on cards or images. Always use the clip-path variable.
- `border-radius` is permitted only for perfectly circular elements (e.g., avatar circles) or tiny UI details (e.g., 2px rounding on a focus ring).
- When applying a squircle, the element must have explicit dimensions or a sized container to ensure the polygon renders correctly.

## Layout Patterns

### Page Structure

Every page follows this vertical rhythm:

```
<div className={styles.page}>
  <section className={styles.hero}>     <!-- h1 + lead text + optional CTA -->
  <section>                              <!-- Main content sections -->
  <section>                              <!-- Secondary content -->
  <section>                              <!-- Newsletter or closing CTA -->
</div>
```

### Grid System

- Card grids: Use CSS Grid with `repeat(auto-fill, minmax(300px, 1fr))` or explicit columns
- Mobile: single column, full width
- Tablet (768px+): 2 columns
- Desktop (1024px+): 3 columns
- Max content width: `1200px`, centered with `margin: 0 auto`

### Section Padding

- Mobile: `padding: 3rem 1.25rem`
- Tablet: `padding: 4rem 2rem`
- Desktop: `padding: 5rem 2rem` (content constrained by max-width, not padding)

---

# Content Creation Standards

These rules govern all written content: page copy, journal articles, meta descriptions, alt text, button labels, and microcopy. They are grounded in evidence-based behavioral science and trauma-informed practice.

## Brand Voice

Nina Healthy speaks in first person. The voice is:

| Trait | Means | Does Not Mean |
|---|---|---|
| **Warm** | Conversational, intimate, like a letter to a friend | Saccharine, performative, or artificially cheerful |
| **Reflective** | Thoughtful, introspective, drawing from lived experience | Academic, preachy, or instructional |
| **Gentle** | Patient, kind, non-judgmental, offering invitations not commands | Passive, vague, or avoidant |
| **Honest** | Vulnerable, direct, naming hard things plainly | Blunt, oversharing, or self-deprecating for effect |
| **Grounded** | Practical, embodied, connected to the physical world | Abstract, airy, or disconnected from reality |

### Voice Checklist

Before publishing any content, verify:

- [ ] Is this written as Nina speaking, not a generic wellness brand?
- [ ] Does it invite rather than instruct? ("Try this" not "You must")
- [ ] Does it acknowledge difficulty rather than promising easy fixes?
- [ ] Is the language concrete and sensory, not abstract?
- [ ] Would someone feel calmer after reading this, not more pressured?

## Content Boundaries

Nina is **not** a medical professional. All content must respect this:

- Never use clinical or diagnostic language ("treatment", "therapy", "cure", "heal")
- Never promise health outcomes ("this will reduce your anxiety")
- Never imply, suggest, or state that content is a medical, clinical, or psychiatric cure
- Use framing like "what I have found", "what works for me", "you might try"
- Include `contentNote` in article data for pieces that discuss anxiety, overwhelm, grief, or emotional distress

## Scientific and Cultural Integrity

- Where practices have roots in specific traditions (e.g., Vedic, Buddhist, Indigenous), acknowledge the lineage with respect. Avoid over-secularized dilution or cultural appropriation.
- Mechanistic claims (e.g., references to the nervous system, cortisol, breathing physiology) should be grounded in established neurobiology. Use hedged language: "research suggests", "some evidence points to". Never use or validate pseudoscientific jargon.
- Actively eliminate toxic positivity and spiritual bypassing. Validate real human struggle, discomfort, and systemic realities rather than manufacturing forced optimism or toxic resilience.

## Trauma-Informed Language

Every guided experiential prompt, breathwork instruction, or meditation cue must:

- Prioritize optionality and agency (e.g., "if comfortable, close your eyes, or simply soften your gaze")
- Offer exit ramps (e.g., "if this feels intense, feel free to return to your natural rhythm")
- Use body-neutral, socioeconomically accessible, and neurodivergent-inclusive language
- Not assume specific physical abilities, baseline financial status, or neurotypical cognitive processing

## Writing Style

### Sentence Structure

- Prefer short to medium sentences (12-20 words average)
- Vary rhythm: follow a longer sentence with a short, punchy one
- Use sentence fragments deliberately and sparingly for emphasis
- Avoid compound sentences with three or more clauses

### Paragraph Structure

- Keep paragraphs to 2-4 sentences
- Each paragraph should carry one idea
- Use whitespace generously; dense walls of text contradict the brand

### Word Choice

- Prefer the simpler word: "start" over "commence", "use" over "utilize"
- Use sensory language: textures, sounds, temperatures, physical sensations
- Avoid jargon, buzzwords, and wellness cliches ("self-care journey", "live your best life", "manifest your dreams")
- No em dashes. Use commas, semicolons, colons, or break into two sentences.
- Build credibility with grounded, precise vocabulary; ban empty marketing hyperbole

### Formatting in Articles

| Block Type | HTML Element | Style Notes |
|---|---|---|
| Paragraph | `<p>` | Standard body text |
| Subheading | `<h2>` | Breaks the article into scannable sections |
| Pull quote | `<blockquote>` | Italicized, centered, with vertical accent line |
| Divider | `<hr>` | Visual separator before the closing section |
| Closing invitation | Final `<p>` | Ends with a gentle, actionable invitation to the reader |

### Article Structure Pattern

Every journal article should follow this arc:

1. **Opening hook** (1-2 paragraphs): A personal observation or admission that draws the reader in. Vulnerable but not dramatic.
2. **Exploration** (2-3 sections with subheadings): Deeper reflection, personal stories, observations. Each section should stand alone as a scannable unit.
3. **Pull quote**: A single distilled thought that captures the essence. This is the sentence someone would highlight or share.
4. **Practical dimension** (1 section): How this shows up in daily life. Concrete, sensory, actionable.
5. **Closing invitation** (after a divider): A gentle, specific invitation for the reader to try something. Not a command. An offer. Always framed as optional.

## E-E-A-T Content Strategy

Every piece of content must demonstrate Experience, Expertise, Authoritativeness, and Trustworthiness:

### Experience (the "first E")
- All articles are written from Nina's lived experience. Never write in a detached, third-person editorial voice.
- Include specific, personal details: the weight of a tea cup, the sound of a morning kitchen, the feeling of feet on a cold floor. Specificity builds trust.
- Name the difficulty before offering the insight. Show the struggle, not just the resolution.

### Expertise
- Draw on established behavioral science where relevant (decision fatigue, parasympathetic activation, circadian rhythms) but express it in plain, accessible language.
- Never cite studies you cannot verify. Use "research suggests" or "psychologists have observed" when referencing well-established principles.

### Authoritativeness
- The About page clearly states who Nina is and is not (not a therapist, not a doctor). This transparency builds authority through honesty.
- Internal linking between articles builds topical depth. Each article should reference at least one related piece.
- The FAQ section on the About page addresses common concerns directly.

### Trustworthiness
- No dark patterns. No manipulative urgency. No countdown timers on newsletter signups.
- Content notes before emotionally heavy articles.
- Clear contact information. Visible privacy policy and terms.
- No affiliate links or paid recommendations disguised as personal endorsements.

## SEO Content Guidelines

### Title Tags

- Include the primary keyword naturally in the first 40 characters
- Format for articles: `{Article Title} | Nina Healthy`
- Format for pages: `{Page Purpose} | Nina Healthy`
- Keep total length between 50-60 characters
- Make every title unique across the site

### Meta Descriptions

- Write as a compelling one-sentence summary that answers "why should I read this?"
- Include the primary keyword naturally
- 150-160 characters
- End with a period
- Do not duplicate the title tag content
- Use active voice

### Heading Content

- `h1`: The page's single primary topic or article title
- `h2`: Major section breaks; should be meaningful standalone (imagine someone scanning only headings)
- `h3`: Subsections within an `h2` block
- Include relevant keywords naturally; never keyword-stuff

### Alt Text

| Image Type | Alt Text Pattern | Example |
|---|---|---|
| Hero / editorial | Describe the scene, mood, and key elements | "Serene meadow with soft morning light filtering through wildflowers" |
| Journal thumbnail | Describe what the image depicts | "Woman sitting quietly with tea by a rain-streaked window" |
| Decorative | Empty alt, aria-hidden | `alt="" aria-hidden="true"` |
| Functional (icons) | Describe the action | "Search", "Close menu", "Open navigation" |

### Internal Content Links

- Link to related articles within journal content using descriptive text
- Example: "I wrote about this in [The Art of Doing Nothing](/journal/the-art-of-doing-nothing)"
- Aim for 2-3 internal links per article
- Link anchor text should describe the destination, not "click here"

---

# Accessibility Standards

Accessibility is not optional. Every component must meet WCAG 2.2 Level AA.

## Keyboard Navigation

- All interactive elements must be reachable and operable via keyboard
- Focus indicators must be visible and high-contrast (do not remove default outlines without providing a custom focus style)
- Modals and menus must trap focus and restore it on close (see `components/Header/Header.js` for the reference pattern)
- `Escape` key must close any overlay, modal, or expanded menu

## ARIA Patterns

| Pattern | Implementation |
|---|---|
| Navigation landmarks | `<nav aria-label="Main navigation">`, `<nav aria-label="Mobile navigation">` |
| Content sections | `<section aria-label="...">` or `aria-labelledby` referencing a heading |
| Toggle buttons | `aria-expanded`, `aria-pressed` |
| Modals | `role="dialog"`, `aria-modal="true"` |
| Skip link | `<a href="#main-content" className="skipLink">Skip to content</a>` (already in layout) |
| Visually hidden text | Use the `.visuallyHidden` class from `globals.css` |

## Form Accessibility

The project includes forms in `ContactMe` and `NewsletterSignup`. All forms must:

- Associate every input with a visible `<label>` via `htmlFor` / `id` pairing
- Use `aria-describedby` to link inputs to their validation messages or helper text
- Mark required fields with both the `required` attribute and a visible indicator
- Provide clear, specific error messages (e.g., "Please enter a valid email address" not "Invalid input")
- Use `aria-invalid="true"` on fields that fail validation
- Ensure error messages use `role="alert"` or `aria-live="polite"` so screen readers announce them
- Never rely on color alone to indicate an error state; pair with text and/or icons
- Use `type="email"` for email fields, `type="tel"` for phone, etc. for mobile keyboard optimization

## Color Contrast

- Body text on backgrounds: minimum 4.5:1 ratio
- Large text (18px+ bold or 24px+): minimum 3:1 ratio
- Interactive element borders and focus indicators: minimum 3:1 against adjacent colors
- Do not rely on color alone to convey meaning; pair with text, icons, or patterns

## Reduced Motion

The global stylesheet already includes:

```css
@media (prefers-reduced-motion: reduce) {
  a, button, div, section, article {
    transition: none !important;
    animation: none !important;
  }
}
```

Any component-level animation must also respect this media query. This is especially critical for `BreathPacer`, `MeditationTimer`, `GroundingExercise`, and `ScrollReveal`.

---

# Performance Guidelines

## Core Web Vitals Targets

| Metric | Target | Primary Lever |
|---|---|---|
| LCP (Largest Contentful Paint) |  ≤ 2.5s | `priority` on hero images, font `display: swap` |
| INP (Interaction to Next Paint) |  ≤ 200ms | Minimal JS, no heavy event handlers |
| CLS (Cumulative Layout Shift) | ≤ 0.1 | Explicit image dimensions, font fallback matching |

## Image Optimization

- Always use `next/image` for automatic format negotiation (WebP/AVIF), resizing, and lazy loading
- Set `priority` only on the single largest above-the-fold image per page (hero image)
- Provide `sizes` prop that matches your responsive layout breakpoints
- Use `fill` layout when the image should match its container, and set `sizes` accordingly
- Keep original source images high-resolution; Next.js handles downscaling

## Font Loading

- Fonts are loaded via `next/font/google` with `display: 'swap'`
- The `variable` option is used so fonts are applied via CSS custom properties
- This prevents FOIT (Flash of Invisible Text) and minimizes CLS
