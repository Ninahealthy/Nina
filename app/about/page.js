import Link from "next/link";
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
    "The story behind Nina: a journal born in a Portland parking garage in 2019, when one project manager stopped performing wellness and started paying attention. Read about the practice, the principles, and what this space is for.",
  openGraph: {
    title: "About Nina",
    description:
      "The story behind Nina: a journal born in a Portland parking garage in 2019, when one project manager stopped performing wellness and started paying attention.",
    url: `${SITE.url}/about`,
    images: [
      {
        url: "/og-default.png",
        width: 1200,
        height: 630,
        alt: "Nina, a journal of attention and honest reflection",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Nina",
    description:
      "The story behind Nina: a journal born in a Portland parking garage in 2019, when one project manager stopped performing wellness and started paying attention.",
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
      "No. Nina is a personal reflection space. I am not a therapist, doctor, or licensed health professional. Everything I share comes from my own experience and is offered as an invitation, not a prescription. If you are struggling, please reach out to a qualified professional.",
  },
  {
    question: "How often is the journal updated?",
    answer:
      "I publish new reflections as they come, usually one or two pieces per month. Each one takes time to live with before I feel ready to share it. Quality and honesty matter more than frequency.",
  },
  {
    question: "Do you offer one-on-one coaching or sessions?",
    answer:
      "Not at this time. Nina is a written space for shared reflection. If that changes, I will share updates through the newsletter.",
  },
  {
    question: "What is the newsletter about?",
    answer:
      "Letters on attention and honest reflection. They follow no schedule. Each one is written slowly, sent only when there is something real to share. No spam, no pressure. You can unsubscribe anytime.",
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
            alt="Nina, the writer behind Nina"
            fill
            sizes="(max-width: 768px) 220px, 280px"
            priority
            className={styles.heroImage}
          />
        </div>
        <h1 className={styles.heroTitle}>Hi, I&apos;m Nina</h1>
        <p className={styles.heroSubtitle}>
          I write about attention, the nervous system, and what it takes to stay
          present in a life that keeps pulling you elsewhere. Based in Portland,
          Oregon.
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
              In the fall of 2019, I was sitting in a gray Subaru in the
              parking garage on Morrison Street in Portland, Oregon. I had
              been working in project management for a tech company for six
              years. I had been promoted twice in three years and could not
              remember the last time I had eaten lunch without a screen in
              front of me.
            </p>
            <p>
              That particular morning, I realized I could not name a single
              thing I had done that week that was not for someone else&apos;s
              timeline. My coffee was cold. My hands were shaking, not from
              fear, but from the particular exhaustion of a life that looks
              fine from the outside. I had not taken a full breath in what
              felt like months.
            </p>
            <p>
              I did not quit my job or book a retreat. I did something
              smaller. I sat there for five more minutes. I noticed the rain
              on the windshield. I breathed without checking the time. It
              was the first moment in years that belonged entirely to my
              body.
            </p>
            <p>
              Over the months that followed, I started paying attention to
              what my nervous system had been trying to tell me. I let
              mornings be slow. I stopped filling silence with noise. I
              wrote things down, not to publish, but to understand what was
              happening beneath the performance of being fine.
            </p>
            <p>
              Nina grew from those notes. It is not a program or a
              prescription. It is a practice that began in a parking garage
              and now lives here, in essays about attention, the body, and
              what it actually costs to stay present.
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
          <h2 className={styles.sectionTitle}>What This Space Is For</h2>
          <div className={styles.valuesGrid}>
            <div className={styles.valueCard}>
              <h3 className={styles.valueTitle}>The Quiet Kind</h3>
              <p className={styles.valueText}>
                I stopped calling it wellness the day I realized the word had
                become a product. What I mean is something simpler: the quiet
                inside a day that is not performing for anyone.
              </p>
            </div>
            <div className={styles.valueCard}>
              <h3 className={styles.valueTitle}>On Purpose, Not Optimized</h3>
              <p className={styles.valueText}>
                There is a difference between choosing what matters and
                optimizing your life into a spreadsheet. I am interested in the
                first one. The second one already has enough advocates.
              </p>
            </div>
            <div className={styles.valueCard}>
              <h3 className={styles.valueTitle}>Showing Up Badly</h3>
              <p className={styles.valueText}>
                The best meditation I ever had was the one where I could not
                stop thinking about laundry. Practice does not mean getting it
                right. It means coming back after getting it wrong.
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
        <section className={styles.exploreFurther} aria-label="Explore further">
          <SectionHeading subtitle="More ways to engage with this practice.">
            Explore Further
          </SectionHeading>
          <div className={styles.exploreLinks}>
            <Link href="/bookshelf" className={styles.exploreCard}>
              <h3 className={styles.exploreCardTitle}>Bookshelf</h3>
              <p className={styles.exploreCardText}>
                The books, research, and traditions that shaped how I think,
                organized by how I engage with each work.
              </p>
            </Link>
            <Link href="/manifesto" className={styles.exploreCard}>
              <h3 className={styles.exploreCardTitle}>Manifesto</h3>
              <p className={styles.exploreCardText}>
                Seven principles of somatic attention. The beliefs that hold
                this practice together.
              </p>
            </Link>
          </div>
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
