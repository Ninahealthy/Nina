import Link from "next/link";
import { ARTICLES } from "@/lib/articles";
import JsonLd from "@/components/JsonLd/JsonLd";
import { getReadingTime } from "@/lib/readingTime";
import styles from "./page.module.css";

export function generateStaticParams() {
  return Object.keys(ARTICLES).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const article = ARTICLES[slug];
  if (!article) {
    return { title: "Article Not Found" };
  }
  return {
    title: article.title,
    description:
      article.lead ||
      article.content.find((b) => b.type === "paragraph")?.text.slice(0, 160),
    openGraph: {
      title: article.title,
      description: article.lead,
      url: `https://ninahealthy.com/journal/${slug}`,
      type: "article",
      publishedTime: article.dateISO,
      authors: ["Nina"],
      section: article.category,
      images: [
        {
          url: "/og-default.png",
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
    },
    alternates: {
      canonical: `https://ninahealthy.com/journal/${slug}`,
    },
  };
}

function buildArticleJsonLd(article, slug) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.lead,
    author: {
      "@type": "Person",
      name: "Nina",
      url: "https://ninahealthy.com/about",
    },
    publisher: {
      "@type": "Organization",
      name: "Nina Healthy",
      url: "https://ninahealthy.com",
      logo: {
        "@type": "ImageObject",
        url: "https://ninahealthy.com/icon.svg",
      },
    },
    datePublished: article.dateISO,
    dateModified: article.dateISO,
    mainEntityOfPage: `https://ninahealthy.com/journal/${slug}`,
  };
}

export default async function ArticlePage({ params }) {
  const { slug } = await params;
  const article = ARTICLES[slug];

  if (!article) {
    return (
      <div className={styles.page}>
        <div className={styles.notFound}>
          <h1>Article not found</h1>
          <Link href="/journal">Back to Journal</Link>
        </div>
      </div>
    );
  }

  const readingTime = getReadingTime(article.content);
  const articleJsonLd = buildArticleJsonLd(article, slug);

  return (
    <div className={styles.page}>
      <JsonLd data={articleJsonLd} />
      <article className={styles.article}>
        <header className={styles.articleHeader}>
          <div className={styles.articleMeta}>
            <span className={styles.category}>{article.category}</span>
            <span className={styles.metaSeparator} aria-hidden="true">
              <svg width="4" height="4" viewBox="0 0 4 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="2" cy="2" r="2" fill="currentColor" />
              </svg>
            </span>
            <time className={styles.date} dateTime={article.dateISO}>{article.date}</time>
            <span className={styles.metaSeparator} aria-hidden="true">
              <svg width="4" height="4" viewBox="0 0 4 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="2" cy="2" r="2" fill="currentColor" />
              </svg>
            </span>
            <span className={styles.readingTime}>{readingTime} min read</span>
          </div>
          <h1 className={styles.articleTitle}>{article.title}</h1>
        </header>

        {article.lead && (
          <p className={styles.articleLead}>{article.lead}</p>
        )}

        {article.contentNote && (
          <div className={styles.contentNote} role="note" aria-label="Content note">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path d="M12 22C12 17 7 14 7 9C7 6.23858 9.23858 4 12 4C14.7614 4 17 6.23858 17 9C17 14 12 17 12 22Z" stroke="currentColor" strokeWidth="1.5" />
              <path d="M12 4V2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <p>{article.contentNote}</p>
          </div>
        )}

        <div className={styles.articleBody}>
          {article.content.map((block, i) => {
            if (block.type === "paragraph") {
              return <p key={i}>{block.text}</p>;
            }
            if (block.type === "subheading") {
              return <h2 key={i} className={styles.subheading}>{block.text}</h2>;
            }
            if (block.type === "quote") {
              return (
                <blockquote key={i} className={styles.pullQuote}>
                  <p className={styles.pullQuoteText}>{block.text}</p>
                </blockquote>
              );
            }
            if (block.type === "divider") {
              return (
                <div key={i} className={styles.divider}>
                  <span className={styles.dividerDot} />
                  <span className={styles.dividerDot} />
                  <span className={styles.dividerDot} />
                </div>
              );
            }
            return null;
          })}
        </div>

        <footer className={styles.articleFooter}>
          <Link href="/journal" className={styles.backLink}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Back to Journal
          </Link>
          <span className={styles.authorLine}>Written by Nina</span>
        </footer>
      </article>
    </div>
  );
}
