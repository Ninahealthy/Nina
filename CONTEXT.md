# Nina Healthy - Project Context

## Brand

Nina Healthy is a personal mindfulness and lifestyle brand. "Healthy" means inner wellness, mental clarity, calm, and intentional living. Nina is not a medical professional. She shares her journey to peace through mindful practices.

## Site Structure

| Route | Page | Purpose |
|---|---|---|
| `/` | Home | Brand introduction, featured journal, practice teaser, newsletter |
| `/journal` | Journal | Blog index with category filters |
| `/journal/[slug]` | Article | Individual journal entries |
| `/practice` | Practice | Mindfulness exercises and rituals |
| `/about` | About | Nina's story and philosophy |
| `/connect` | Connect | Contact form, newsletter signup, social links |

## Color Palette (CSS Variables in globals.css)

| Variable | Value | Use |
|---|---|---|
| `--color-cream` | `#FAF7F2` | Page background |
| `--color-linen` | `#F3EDE4` | Card/section backgrounds |
| `--color-warmwhite` | `#FEFCF8` | Subtle background variant |
| `--color-charcoal` | `#3D3832` | Primary text |
| `--color-stone` | `#6B6560` | Secondary text |
| `--color-pebble` | `#9A9490` | Tertiary/caption text |
| `--color-terracotta` | `#C07A56` | Primary accent, CTAs |
| `--color-sage` | `#8FA98B` | Secondary accent |
| `--color-olive` | `#6B7D5E` | Hover states |
| `--color-clay` | `#C4A882` | Borders, subtle UI |
| `--color-sand` | `#E8DFD0` | Light accent backgrounds |

## Typography

- **Headings:** Playfair Display (`var(--font-heading)`)
- **Body:** Lora (`var(--font-body)`)
- Both loaded via `next/font/google` in `app/layout.js`

## Component Library

| Component | Path | Props |
|---|---|---|
| Header | `components/Header/Header.js` | none |
| Footer | `components/Footer/Footer.js` | none |
| NewsletterSignup | `components/NewsletterSignup/NewsletterSignup.js` | none |
| ContactForm | `components/ContactMe/ContactMe.js` | none |
| SectionHeading | `components/SectionHeading/SectionHeading.js` | `children`, `subtitle` |
| Card | `components/Card/Card.js` | `image`, `title`, `excerpt`, `href` |
| Button | `components/Button/Button.js` | `children`, `href`, `onClick`, `variant`, `disabled` |

## Squircle Clip-Paths

Cards and images must use `clip-path: var(--clip-path-squircle-*)` instead of `border-radius`. Available sizes: 10, 20, 36, 48, 60 (defined in globals.css).

| Size | Use |
|---|---|
| 10 | Small elements, badges |
| 20 | Buttons, inputs |
| 36 | Images |
| 48 | Cards |
| 60 | Large sections, hero images |
