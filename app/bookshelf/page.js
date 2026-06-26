import JsonLd from "@/components/JsonLd/JsonLd";
import ScrollReveal from "@/components/ScrollReveal/ScrollReveal";
import BrandMark from "@/components/BrandMark/BrandMark";
import Link from "next/link";
import { SITE } from "@/lib/siteConfig";
import { ARTICLES } from "@/lib/articles";
import { getBookshelf } from "@/lib/bookshelf";
import styles from "./page.module.css";

export const metadata = {
  title: "Bookshelf",
  description:
    "The books, research, and traditions that shape Nina's thinking on somatic attention, the nervous system, and what it means to stay present. Organized by how I engage with each work.",
  openGraph: {
    title: "Nina's Bookshelf | Nina",
    description:
      "The books and research that shape Nina's thinking on somatic attention, the nervous system, and staying present.",
    url: `${SITE.url}/bookshelf`,
    images: [
      {
        url: "/og-default.png",
        width: 1200,
        height: 630,
        alt: "Nina's Bookshelf: books on somatic attention and presence",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nina's Bookshelf",
    description:
      "The books and research that shape Nina's thinking on somatic attention, the nervous system, and staying present.",
    images: ["/og-default.png"],
  },
  alternates: {
    canonical: `${SITE.url}/bookshelf`,
  },
};

const BREADCRUMB_JSONLD = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: SITE.url,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Bookshelf",
      item: `${SITE.url}/bookshelf`,
    },
  ],
};

const COLLECTION_JSONLD = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Nina's Bookshelf",
  description: metadata.description,
  url: `${SITE.url}/bookshelf`,
  author: { "@id": `${SITE.url}/#author` },
  isPartOf: { "@id": `${SITE.url}/#website` },
};

/**
 * Formats a slug into a readable article title, falling back to the
 * slug itself if the article is not found.
 */
function getArticleTitle(slug) {
  const article = ARTICLES[slug];
  return article ? article.title : slug;
}

export default function BookshelfPage() {
  const shelves = getBookshelf();

  return (
    <div className={styles.page}>
      <JsonLd data={BREADCRUMB_JSONLD} />
      <JsonLd data={COLLECTION_JSONLD} />

      <section className={styles.hero} aria-label="Bookshelf introduction">
        <BrandMark size="md" className={styles.heroMark} />
        <h1 className={styles.heroTitle}>Bookshelf</h1>
        <p className={styles.heroSubtitle}>
          These are the books, papers, and traditions I cite across the journal.
          I have organized them not by subject but by how I engage with each
          work, because the relationship matters more than the category. Some of
          these books changed my thinking. Some I am still arguing with. A few I
          respectfully disagree with. All of them left a mark.
        </p>
      </section>

      {shelves.map((shelf) => {
        if (shelf.books.length === 0) return null;
        return (
          <ScrollReveal key={shelf.id}>
            <section
              className={styles.shelf}
              aria-label={shelf.title}
              id={shelf.id}
            >
              <h2 className={styles.shelfTitle}>{shelf.title}</h2>
              <p className={styles.shelfDescription}>{shelf.description}</p>
              <ul className={styles.bookList}>
                {shelf.books.map((book) => (
                  <li key={`${book.name}-${book.work}`} className={styles.bookItem}>
                    <div className={styles.bookMeta}>
                      <span className={styles.bookAuthor}>{book.name}</span>
                      <span className={styles.bookType}>{book.type}</span>
                    </div>
                    <h3 className={styles.bookTitle}>{book.work}</h3>
                    <div className={styles.bookLinks}>
                      <span className={styles.bookLinksLabel}>Discussed in:</span>
                      {book.slugs.map((slug, i) => (
                        <span key={slug}>
                          <Link
                            href={`/journal/${slug}`}
                            className={styles.bookLink}
                          >
                            {getArticleTitle(slug)}
                          </Link>
                          {i < book.slugs.length - 1 && (
                            <span className={styles.bookLinkSep}>,</span>
                          )}
                        </span>
                      ))}
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          </ScrollReveal>
        );
      })}

      <ScrollReveal>
        <section className={styles.closing} aria-label="Closing note">
          <p className={styles.closingText}>
            This is not a recommendation list. It is a record of the
            conversations that have shaped this practice, including the ones I
            have not resolved. If a book appears here, it means it changed
            something in how I think, even when I disagree with its conclusions.
            That kind of change is worth documenting.
          </p>
        </section>
      </ScrollReveal>
    </div>
  );
}
