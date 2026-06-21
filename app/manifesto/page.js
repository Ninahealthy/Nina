import JsonLd from "@/components/JsonLd/JsonLd";
import ScrollReveal from "@/components/ScrollReveal/ScrollReveal";
import NewsletterSignup from "@/components/NewsletterSignup/NewsletterSignup";
import BrandMark from "@/components/BrandMark/BrandMark";
import { SITE } from "@/lib/siteConfig";
import styles from "./page.module.css";

export const metadata = {
  title: "Seven Principles of Somatic Attention",
  description:
    "A manifesto for paying attention with the body. Seven principles on presence, rest, boundaries, and what it means to stay with discomfort instead of fixing it.",
  openGraph: {
    title: "Seven Principles of Somatic Attention | Nina",
    description:
      "A manifesto for paying attention with the body. Seven principles on presence, rest, boundaries, and what it means to stay with discomfort instead of fixing it.",
    url: `${SITE.url}/manifesto`,
    images: [
      {
        url: "/og-default.png",
        width: 1200,
        height: 630,
        alt: "Seven Principles of Somatic Attention, a manifesto by Nina",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Seven Principles of Somatic Attention",
    description:
      "A manifesto for paying attention with the body. Seven principles on presence, rest, boundaries, and staying with discomfort.",
    images: ["/og-default.png"],
  },
  alternates: {
    canonical: `${SITE.url}/manifesto`,
  },
};

const PRINCIPLES = [
  {
    title: "The body is not a vehicle. It is the conversation.",
    body: "You do not have a body. You are a body. Every thought, every decision, every creative act begins in tissue and nerve and breath. Ignoring the body is not discipline; it is dissociation wearing a productive mask.",
  },
  {
    title:
      "Attention is not a resource to be optimized. It is a practice to be honored.",
    body: "The attention economy treats your focus as raw material. Somatic attention treats it as the most intimate thing you own. Where you place your attention is where you place your life.",
  },
  {
    title:
      "Stillness is not the absence of doing. It is the presence of choosing.",
    body: "Stillness is not laziness, not avoidance, not privilege. It is the radical act of refusing to fill every moment with production. The pause between breaths is not wasted time; it is where the body recalibrates.",
  },
  {
    title: "Discomfort is information, not an emergency.",
    body: "The tightness in your chest, the ache in your jaw, the restlessness at 3 a.m. These are not problems to solve. They are the body's honest reporting. Learning to stay with discomfort, without numbing or fixing, is the beginning of self-trust.",
  },
  {
    title: "Healing is not linear and does not require an audience.",
    body: "You do not owe anyone a recovery arc. The body heals in spirals, in setbacks, in seasons. Some of the most important work happens in the weeks when nothing appears to change.",
  },
  {
    title: "Boundaries are not walls. They are architecture.",
    body: "A boundary is not a rejection. It is the structure that makes genuine connection possible. The people who respect your limits are the ones worth keeping close.",
  },
  {
    title: "You do not need to earn rest.",
    body: "Rest is not a reward for productivity. It is a biological requirement that culture has rebranded as laziness. Your nervous system does not negotiate; it simply keeps the score.",
  },
];

const ARTICLE_JSONLD = {
  "@context": "https://schema.org",
  "@type": "Article",
  "@id": `${SITE.url}/manifesto#article`,
  headline: "Seven Principles of Somatic Attention",
  description:
    "A manifesto for paying attention with the body. Seven principles on presence, rest, boundaries, and what it means to stay with discomfort instead of fixing it.",
  url: `${SITE.url}/manifesto`,
  datePublished: "2026-06-18",
  dateModified: "2026-06-18",
  author: {
    "@type": "Person",
    "@id": SITE.entityIds.author,
    name: "Nina",
  },
  publisher: {
    "@type": "Person",
    "@id": SITE.entityIds.author,
    name: "Nina",
  },
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": `${SITE.url}/manifesto`,
  },
};

export default function ManifestoPage() {
  return (
    <div className={styles.page}>
      <JsonLd data={ARTICLE_JSONLD} />

      <section className={styles.hero} aria-label="Manifesto">
        <BrandMark size="xl" className={styles.heroMark} />
        <h1 className={styles.heroTitle}>
          Seven Principles of Somatic Attention
        </h1>
        <p className={styles.heroSubtitle}>
          These are not commandments. They are observations from years of
          learning to listen to the body instead of override it. They are
          the foundation this journal is built on.
        </p>
      </section>

      <section className={styles.principles} aria-label="The seven principles">
        <ol className={styles.principlesList}>
          {PRINCIPLES.map((principle, index) => (
            <ScrollReveal key={index}>
              <li className={styles.principleItem}>
                <div className={styles.principleNumber}>
                  {String(index + 1).padStart(2, "0")}
                </div>
                <div className={styles.principleContent}>
                  <h2 className={styles.principleTitle}>{principle.title}</h2>
                  <p className={styles.principleBody}>{principle.body}</p>
                </div>
              </li>
            </ScrollReveal>
          ))}
        </ol>
      </section>

      <ScrollReveal>
        <section className={styles.closing} aria-label="Closing">
          <div className={styles.closingContent}>
            <BrandMark size="md" className={styles.closingMark} />
            <p className={styles.closingText}>
              These principles are not finished. They change as I change.
              What remains constant is the commitment to paying attention
              with the body, not just the mind, and to writing honestly
              about what that attention reveals.
            </p>
            <p className={styles.closingSignoff}>
              Written in Portland, Oregon.
              <br />
              Updated as the practice deepens.
            </p>
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section className={styles.newsletter} aria-label="Newsletter signup">
          <NewsletterSignup headingLevel="h2" />
        </section>
      </ScrollReveal>
    </div>
  );
}
