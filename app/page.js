import Image from "next/image";
import SectionHeading from "../components/SectionHeading/SectionHeading";
import Card from "../components/Card/Card";
import Button from "../components/Button/Button";
import NewsletterSignup from "../components/NewsletterSignup/NewsletterSignup";
import TestimonialCarousel from "../components/TestimonialCarousel/TestimonialCarousel";
import ScrollReveal from "../components/ScrollReveal/ScrollReveal";
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
  name: SITE.name,
  url: SITE.url,
  description: SITE.description,
  publisher: {
    "@type": "Organization",
    name: SITE.name,
    url: SITE.url,
    logo: {
      "@type": "ImageObject",
      url: `${SITE.url}/icon.svg`,
    },
  },
};

const ORGANIZATION_JSONLD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE.name,
  url: SITE.url,
  logo: `${SITE.url}/icon.svg`,
  sameAs: getSameAsUrls(),
};

export default function Home() {
  const latestArticles = getLatestArticles(3);
  const todaysInvitation = getTodaysInvitation();
  const seasonLabel = getSeasonLabel();

  return (
    <div className={styles.page}>
      <JsonLd data={WEBSITE_JSONLD} />
      <JsonLd data={ORGANIZATION_JSONLD} />

      <section className={styles.hero} aria-label="Introduction">
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>Finding peace in the everyday: mindfulness and intentional living</h1>
          <p className={styles.heroSubtitle}>
            A personal space for slowing down, breathing deeper,
            and living with more intention. Welcome to Nina Healthy.
          </p>
          <Button href="/practice">Begin the journey</Button>
        </div>
        <div className={styles.heroImageWrapper}>
          <Image
            src="/images/home-hero.png"
            alt="Serene meadow with soft morning light filtering through wildflowers"
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
              For me, healthy has never been about diets or routines. It is about
              the quiet moments between the noise. The deep breath before you
              respond. The choice to be present instead of productive. Nina
              Healthy is a space where inner wellness comes first, where mental
              clarity, calm, and intentional living are the foundation of a
              good life.
            </p>
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section className={styles.featured} aria-label="Latest journal entries">
          <SectionHeading subtitle="The newest reflections on mindful living.">
            Latest from the Journal
          </SectionHeading>
          <div className={styles.cardGrid}>
            {latestArticles.map((entry) => (
              <Card
                key={entry.slug}
                image={entry.image}
                title={entry.title}
                excerpt={entry.excerpt}
                href={`/journal/${entry.slug}`}
                readingTime={entry.readingTime}
                date={entry.date}
                dateISO={entry.dateISO}
              />
            ))}
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section className={styles.practiceTeaser} aria-label="Daily invitation">
          <div className={styles.practiceTeaserCard}>
            <p className={styles.practiceLabel}>{seasonLabel}</p>
            <p className={styles.practiceQuote}>{todaysInvitation}</p>
            <Button href="/practice" variant="secondary">
              Explore practices
            </Button>
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section className={styles.testimonials} aria-label="Reader voices">
          <SectionHeading subtitle="Gentle words from those who have visited this space.">
            Words from Readers
          </SectionHeading>
          <TestimonialCarousel />
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
