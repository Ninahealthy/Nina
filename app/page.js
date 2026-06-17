import Image from "next/image";
import SectionHeading from "../components/SectionHeading/SectionHeading";
import Card from "../components/Card/Card";
import NewsletterSignup from "../components/NewsletterSignup/NewsletterSignup";
import ScrollReveal, { ScrollRevealItem } from "../components/ScrollReveal/ScrollReveal";
import JsonLd from "../components/JsonLd/JsonLd";
import { ARTICLES } from "@/lib/articles";
import { CARD_IMAGES } from "@/lib/cardImages";
import { HOME_FEATURED } from "@/lib/entryOrder";
import { SITE } from "@/lib/siteConfig";
import { getReadingTime } from "@/lib/readingTime";
import { getTodaysInvitation, getSeasonLabel } from "@/lib/invitations";
import { getSameAsUrls } from "@/lib/socialLinks";
import styles from "./page.module.css";

function getLatestArticles(count = 3) {
  return HOME_FEATURED.slice(0, count).map((slug) => {
    const article = ARTICLES[slug];
    return {
      slug,
      title: article.title,
      excerpt: article.lead,
      image: CARD_IMAGES[slug] || "/images/journal-1.png",
      readingTime: getReadingTime(article.content),
      date: article.date,
      dateISO: article.dateISO,
    };
  });
}

const WEBSITE_JSONLD = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": SITE.entityIds.website,
  name: SITE.name,
  url: SITE.url,
  description: SITE.description,
  publisher: { "@id": SITE.entityIds.organization },
};

const ORGANIZATION_JSONLD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": SITE.entityIds.organization,
  name: SITE.name,
  url: SITE.url,
  logo: `${SITE.url}/icon.svg`,
  sameAs: getSameAsUrls(),
};

/** Person entity for E-E-A-T: establishes the author as a real,
 *  machine-readable identity linked to the organization. */
const PERSON_JSONLD = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": SITE.entityIds.author,
  name: SITE.author.name,
  url: SITE.author.aboutUrl,
  sameAs: getSameAsUrls(),
  worksFor: { "@id": SITE.entityIds.organization },
};

export default function Home() {
  const latestArticles = getLatestArticles(3);
  const todaysInvitation = getTodaysInvitation();
  const seasonLabel = getSeasonLabel();

  return (
    <div className={styles.page}>
      <JsonLd data={WEBSITE_JSONLD} />
      <JsonLd data={ORGANIZATION_JSONLD} />
      <JsonLd data={PERSON_JSONLD} />

      <section className={styles.hero} aria-label="Introduction">
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>The practice of paying attention</h1>
          <p className={styles.heroSubtitle}>
            Written for no audience. Read by those who found it anyway.
          </p>
        </div>
        <div className={styles.heroImageWrapper}>
          <Image
            src="/images/home-hero.png"
            alt="Morning light across a weathered wooden table with an open notebook and cooling tea"
            fill
            sizes="(max-width: 768px) 200px, (max-width: 1024px) 300px, (max-width: 1280px) 360px, 400px"
            priority
            className={styles.heroImage}
          />
        </div>
      </section>

      <ScrollReveal>
        <section className={styles.philosophy} aria-label="Philosophy">
          <div className={styles.philosophyCard}>
            <h2 className={styles.philosophyTitle}>
              What does healthy really mean?
            </h2>
            <p className={styles.philosophyText}>
              For me, it was never the word itself. It was the morning I stopped
              reading about morning routines and just sat with my coffee until it
              went cold. It was the realization that self-care had become another
              item on a list I was already failing. Health, the kind that
              actually holds, lives in the pause before you answer, the walk
              with no destination, the willingness to be unproductive and not
              apologize for it. That is what this journal is about.
            </p>
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal stagger={0.12}>
        <section className={styles.featured} aria-label="Recent writing">
          <ScrollRevealItem>
            <SectionHeading>From the Journal</SectionHeading>
          </ScrollRevealItem>
          <div className={styles.cardGrid}>
            {latestArticles.map((entry) => (
              <ScrollRevealItem key={entry.slug}>
                <Card
                  image={entry.image}
                  title={entry.title}
                  excerpt={entry.excerpt}
                  href={`/journal/${entry.slug}`}
                  readingTime={entry.readingTime}
                  date={entry.date}
                  dateISO={entry.dateISO}
                />
              </ScrollRevealItem>
            ))}
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section className={styles.practiceTeaser} aria-label="Daily invitation">
          <div className={styles.practiceTeaserCard}>
            <p className={styles.practiceLabel}>{seasonLabel}</p>
            <p className={styles.practiceQuote}>{todaysInvitation}</p>
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section className={styles.newsletter} aria-label="Newsletter signup">
          <NewsletterSignup />
        </section>
      </ScrollReveal>
    </div>
  );
}
