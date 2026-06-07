import Link from "next/link";
import { ARTICLES } from "@/lib/articles";
import JsonLd from "@/components/JsonLd/JsonLd";
import RelatedArticles from "@/components/RelatedArticles/RelatedArticles";
import ShareBar from "@/components/ShareBar/ShareBar";
import ReadingProgress from "@/components/ReadingProgress/ReadingProgress";
import AuthorBio from "@/components/AuthorBio/AuthorBio";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import { getReadingTime } from "@/lib/readingTime";
import { SITE } from "@/lib/siteConfig";
import { CARD_IMAGES } from "@/lib/cardImages";
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
      url: `${SITE.url}/journal/${slug}`,
      type: "article",
      publishedTime: article.dateISO,
      modifiedTime: article.dateModified || article.dateISO,
      authors: [SITE.author.name],
      section: article.category,
      tags: article.tags || [article.category],
      images: [
        {
          url: SITE.ogImage.url,
          width: SITE.ogImage.width,
          height: SITE.ogImage.height,
          alt: article.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.lead,
      images: [SITE.ogImage.url],
    },
    alternates: {
      canonical: `${SITE.url}/journal/${slug}`,
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
      name: SITE.author.name,
      url: SITE.author.aboutUrl,
    },
    publisher: {
      "@type": "Organization",
      name: SITE.name,
      url: SITE.url,
      logo: {
        "@type": "ImageObject",
        url: `${SITE.url}/icon.svg`,
      },
    },
    datePublished: article.dateISO,
    dateModified: article.dateModified || article.dateISO,
    mainEntityOfPage: `${SITE.url}/journal/${slug}`,
    image: CARD_IMAGES[slug]
      ? `${SITE.url}${CARD_IMAGES[slug]}`
      : `${SITE.url}/og-default.png`,
  };
}

function buildBreadcrumbJsonLd(article, slug) {
  return {
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
        name: "Journal",
        item: `${SITE.url}/journal`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: article.title,
        item: `${SITE.url}/journal/${slug}`,
      },
    ],
  };
}

/**
 * Find related articles: prioritize curated relatedSlugs, then category match, then any.
 */
function getRelatedArticles(currentSlug, currentArticle, count = 3) {
  const related = [];
  const seen = new Set([currentSlug]);

  const push = (slug) => {
    if (seen.has(slug) || !ARTICLES[slug]) return;
    seen.add(slug);
    related.push({
      slug,
      title: ARTICLES[slug].title,
      category: ARTICLES[slug].category,
      image: CARD_IMAGES[slug] || "/images/journal-1.png",
    });
  };

  /* 1. Editorially curated relatedSlugs */
  if (Array.isArray(currentArticle.relatedSlugs)) {
    for (const s of currentArticle.relatedSlugs) {
      if (related.length >= count) break;
      push(s);
    }
  }

  /* 2. Same category */
  if (related.length < count) {
    for (const [slug, article] of Object.entries(ARTICLES)) {
      if (related.length >= count) break;
      if (article.category === currentArticle.category) push(slug);
    }
  }

  /* 3. Any remaining */
  if (related.length < count) {
    for (const slug of Object.keys(ARTICLES)) {
      if (related.length >= count) break;
      push(slug);
    }
  }

  return related;
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
  const breadcrumbJsonLd = buildBreadcrumbJsonLd(article, slug);
  const relatedArticles = getRelatedArticles(slug, article);
  const articleUrl = `${SITE.url}/journal/${slug}`;

  return (
    <div className={styles.page}>
      <ReadingProgress />
      <JsonLd data={articleJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />
      <article className={styles.article}>
        <Breadcrumb articleTitle={article.title} />
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
            if (block.type === "list") {
              return (
                <ul key={i} className={styles.contentList}>
                  {block.items.map((item, j) => (
                    <li key={j}>{item}</li>
                  ))}
                </ul>
              );
            }
            if (process.env.NODE_ENV === "development") {
              console.warn(`Unknown content block type: "${block.type}" in article "${slug}"`);
            }
            return null;
          })}
        </div>

        <div className={styles.shareSection}>
          <ShareBar title={article.title} url={articleUrl} />
        </div>

        <footer className={styles.articleFooter}>
          <Link href="/journal" className={styles.backLink}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Back to Journal
          </Link>
        </footer>

        <AuthorBio />

        <RelatedArticles articles={relatedArticles} />
      </article>
    </div>
  );
}
