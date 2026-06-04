import Image from "next/image";
import SectionHeading from "../components/SectionHeading/SectionHeading";
import Card from "../components/Card/Card";
import Button from "../components/Button/Button";
import NewsletterSignup from "../components/NewsletterSignup/NewsletterSignup";
import JsonLd from "../components/JsonLd/JsonLd";
import styles from "./page.module.css";

const WEBSITE_JSONLD = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Nina Healthy",
  url: "https://ninahealthy.com",
  description:
    "Finding peace in the everyday. A personal journey through mindfulness, intentional living, and inner wellness.",
  publisher: {
    "@type": "Organization",
    name: "Nina Healthy",
    url: "https://ninahealthy.com",
    logo: {
      "@type": "ImageObject",
      url: "https://ninahealthy.com/icon.svg",
    },
  },
};

const ORGANIZATION_JSONLD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Nina Healthy",
  url: "https://ninahealthy.com",
  logo: "https://ninahealthy.com/icon.svg",
};

export default function Home() {
  return (
    <div className={styles.page}>
      <JsonLd data={WEBSITE_JSONLD} />
      <JsonLd data={ORGANIZATION_JSONLD} />
      <section className={styles.hero} aria-label="Introduction">
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>Finding peace in the everyday</h1>
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
            sizes="(max-width: 768px) 200px, (max-width: 1024px) 300px, 360px"
            priority
            className={styles.heroImage}
          />
        </div>
      </section>

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

      <section className={styles.featured} aria-label="Featured journal entries">
        <SectionHeading subtitle="Reflections on mindful living, one thought at a time.">
          From the Journal
        </SectionHeading>
        <div className={styles.cardGrid}>
          <Card
            image="/images/journal-1.png"
            title="The Art of Doing Nothing"
            excerpt="Why rest is not laziness, and how learning to be still changed the way I move through my days."
            href="/journal/the-art-of-doing-nothing"
          />
          <Card
            image="/images/journal-2.png"
            title="Morning Rituals That Anchor Me"
            excerpt="A simple sequence of small acts that turns the first hour of the day into something sacred."
            href="/journal/morning-rituals-that-anchor-me"
          />
          <Card
            image="/images/journal-3.png"
            title="Letting Go of Perfect"
            excerpt="Perfectionism kept me busy but never at peace. Here is what happened when I stopped chasing it."
            href="/journal/letting-go-of-perfect"
          />
        </div>
      </section>

      <section className={styles.practiceTeaser} aria-label="Daily invitation">
        <div className={styles.practiceTeaserCard}>
          <p className={styles.practiceLabel}>Today's invitation</p>
          <p className={styles.practiceQuote}>
            Take three slow breaths before your next task.
            Let each exhale carry something you no longer need.
          </p>
          <Button href="/practice" variant="secondary">
            Explore practices
          </Button>
        </div>
      </section>

      <section className={styles.newsletter} aria-label="Newsletter signup">
        <NewsletterSignup />
      </section>
    </div>
  );
}
