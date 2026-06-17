import Image from "next/image";
import JsonLd from "@/components/JsonLd/JsonLd";
import Timeline from "@/components/Timeline/Timeline";
import Accordion from "@/components/Accordion/Accordion";
import ScrollReveal from "@/components/ScrollReveal/ScrollReveal";
import SectionHeading from "@/components/SectionHeading/SectionHeading";
import { SITE } from "@/lib/siteConfig";
import { getSameAsUrls, SOCIAL_LINKS } from "@/lib/socialLinks";
import { ARTICLES } from "@/lib/articles";
import { CARD_IMAGES } from "@/lib/cardImages";
import { CARD_EXCERPTS } from "@/lib/cardExcerpts";
import { getReadingTime } from "@/lib/readingTime";
import NewsletterSignup from "@/components/NewsletterSignup/NewsletterSignup";
import Card from "@/components/Card/Card";
import styles from "./page.module.css";

export const metadata = {
  title: "About",
  description:
    "One woman's practice of paying attention, shared slowly. Explore the story, values, and daily practice behind Nina Healthy, a journal of attention and honest reflection.",
  openGraph: {
    title: "About Nina",
    description:
      "One woman's practice of paying attention, shared slowly. Explore the story, values, and daily practice behind Nina Healthy, a journal of attention and honest reflection.",
    url: `${SITE.url}/about`,
    images: [
      {
        url: "/og-default.png",
        width: 1200,
        height: 630,
        alt: "Nina Healthy, a journal of attention and honest reflection",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Nina",
    description:
      "One woman's practice of paying attention, shared slowly. Explore the story, values, and daily practice behind Nina Healthy, a journal of attention and honest reflection.",
    images: ["/og-default.png"],
  },
  alternates: {
    canonical: `${SITE.url}/about`,
  },
};

const PERSON_JSONLD = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": SITE.entityIds.author,
  name: "Nina",
  jobTitle: "Personal Essayist",
  description:
    "Personal essayist exploring mindfulness, somatic awareness, nervous system regulation, and intentional living through honest, reflective writing.",
  url: `${SITE.url}/about`,
  knowsAbout: [
    "Mindfulness meditation",
    "Somatic awareness and interoception",
    "Nervous system regulation",
    "Intentional living and minimalism",
    "Breathwork practices",
    "Grief and emotional processing",
    "Daily ritual design",
    "Body-based stress response",
  ],
  sameAs: getSameAsUrls(),
};

const TIMELINE_ITEMS = [
  {
    year: "Morning",
    title: "Stillness before the day begins",
    description:
      "Ten minutes with no screen, no plan. Just the body waking up, the kettle boiling, the light changing on the wall.",
  },
  {
    year: "Midday",
    title: "Checking in with the body",
    description:
      "A pause between tasks to notice what the shoulders are holding, where the breath has gone shallow, what the stomach is saying.",
  },
  {
    year: "Evening",
    title: "Writing things down",
    description:
      "Not journaling with a prompt or a goal. Just listening to what the day left behind and letting the pen follow.",
  },
  {
    year: "Ongoing",
    title: "Learning to stay",
    description:
      "The practice that holds all the others: staying with discomfort instead of fixing it, staying with joy instead of rushing past it.",
  },
];

const START_HERE_SLUGS = [
  "the-body-you-are-in",
  "the-page-that-listens",
  "anger-as-information",
];

const FAQ_ITEMS = [
  {
    question: "Is this therapy or medical advice?",
    answer:
      "No. Nina Healthy is a personal reflection space. I am not a therapist, doctor, or licensed health professional. Everything I share comes from my own experience and is offered as an invitation, not a prescription. If you are struggling, please reach out to a qualified professional.",
  },
  {
    question: "How often is the journal updated?",
    answer:
      "I publish new reflections as they come, usually one or two pieces per month. Each one takes time to live with before I feel ready to share it. Quality and honesty matter more than frequency.",
  },
  {
    question: "Do you offer one-on-one coaching or sessions?",
    answer:
      "Not at this time. Nina Healthy is a written space for shared reflection. If that changes, I will share updates through the newsletter.",
  },
  {
    question: "What is the newsletter about?",
    answer:
      "A gentle weekly note with reflections on mindful living, simple practices for everyday calm, and thoughts on living with more intention. No spam, no pressure. You can unsubscribe anytime.",
  },
  {
    question: "Can I share your articles?",
    answer:
      "Of course. If something resonates with you, sharing it with someone who might need it is one of the kindest things you can do. I only ask that you link back to the original article.",
  },
];

const FAQ_JSONLD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ_ITEMS.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

export default function AboutPage() {
  return (
    <div className={styles.page}>
      <JsonLd data={PERSON_JSONLD} />
      <JsonLd data={FAQ_JSONLD} />
      <section className={styles.hero} aria-label="About Nina">
        <div className={styles.heroImageWrapper}>
          <Image
            src="/images/about-hero.png"
            alt="Nina, the writer behind Nina Healthy"
            fill
            sizes="(max-width: 768px) 220px, 280px"
            priority
            className={styles.heroImage}
          />
        </div>
        <h1 className={styles.heroTitle}>Hi, I&apos;m Nina</h1>
        <p className={styles.heroSubtitle}>
          I write slowly about attention, the body, and what I am still
          learning. Not advice. Just honest practice.
        </p>
        <div className={styles.socialLinks}>
          {SOCIAL_LINKS.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={styles.socialLink}
              aria-label={link.name}
              {...(link.external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              dangerouslySetInnerHTML={{ __html: link.icon }}
            />
          ))}
        </div>
      </section>

      <ScrollReveal>
        <section className={styles.story} aria-label="My story">
          <h2 className={styles.sectionTitle}>My Story</h2>
          <div className={styles.storyContent}>
            <p>
              There was a morning, a few years ago now, when I sat in my car
              in the parking lot before work and realized I could not name a
              single thing I had done that week that was not for someone
              else&apos;s timeline. My coffee was cold. My hands were
              shaking, not from fear, but from the particular exhaustion of
              a life that looks fine from the outside.
            </p>
            <p>
              I did not quit my job or book a retreat. I did something
              smaller. I sat there for five more minutes. I noticed the rain
              on the windshield. I breathed without checking the time.
            </p>
            <p>
              That was the beginning, though I did not know it yet. Over
              the months that followed, I started paying attention to what
              my body had been trying to tell me. I let mornings be slow. I
              stopped filling silence with noise. I wrote things down, not
              to publish, but to understand.
            </p>
            <p>
              Nina Healthy grew from those notes. It is not a program or a
              prescription. It is what happens when one woman starts
              writing honestly about attention, the nervous system, and
              what it takes to stay present in a life that keeps pulling
              you elsewhere.
            </p>
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section className={styles.timeline} aria-label="Daily practice">
          <SectionHeading subtitle="Not a routine. More like a series of small returns.">
            The Daily Practice
          </SectionHeading>
          <Timeline items={TIMELINE_ITEMS} />
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section className={styles.philosophy} aria-label="Values">
          <h2 className={styles.sectionTitle}>What Healthy Means Here</h2>
          <div className={styles.valuesGrid}>
            <div className={styles.valueCard}>
              <h3 className={styles.valueTitle}>Inner Wellness</h3>
              <p className={styles.valueText}>
                Health starts within. Mental clarity, emotional balance, and a
                calm mind are the foundation everything else rests on.
              </p>
            </div>
            <div className={styles.valueCard}>
              <h3 className={styles.valueTitle}>Intentional Living</h3>
              <p className={styles.valueText}>
                Not doing more, but doing what matters. Making choices that align
                with who you are and who you want to become.
              </p>
            </div>
            <div className={styles.valueCard}>
              <h3 className={styles.valueTitle}>Gentle Practice</h3>
              <p className={styles.valueText}>
                No perfection required. Mindfulness is a practice, not a
                performance. Show up as you are and start from there.
              </p>
            </div>
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section className={styles.startHere} aria-label="Start here">
          <SectionHeading subtitle="New here? These three pieces are a good place to begin.">
            Start Here
          </SectionHeading>
          <div className={styles.startHereGrid}>
            {START_HERE_SLUGS.map((slug) => {
              const article = ARTICLES[slug];
              if (!article) return null;
              return (
                <Card
                  key={slug}
                  image={CARD_IMAGES[slug]}
                  alt={article.title}
                  title={article.title}
                  excerpt={CARD_EXCERPTS[slug]}
                  href={`/journal/${slug}`}
                  readingTime={getReadingTime(article.content)}
                />
              );
            })}
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section className={styles.faqSection} aria-label="Frequently asked questions">
          <SectionHeading subtitle="Things people often wonder about this space.">
            Common Questions
          </SectionHeading>
          <Accordion items={FAQ_ITEMS} showExpandAll />
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section className={styles.newsletter} aria-label="Newsletter signup">
          <NewsletterSignup headingLevel="h2" />
        </section>
      </ScrollReveal>

      <section className={styles.closing} aria-label="Closing note">
        <p className={styles.closingText}>
          If something here reached you at the right moment, I am glad you
          found it. This space is not going anywhere. It will be here
          whenever you need to come back, as quiet and steady as the
          practice it was built from.
        </p>
      </section>
    </div>
  );
}
