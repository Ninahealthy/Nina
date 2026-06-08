import Image from "next/image";
import JsonLd from "@/components/JsonLd/JsonLd";
import Timeline from "@/components/Timeline/Timeline";
import Accordion from "@/components/Accordion/Accordion";
import ScrollReveal from "@/components/ScrollReveal/ScrollReveal";
import SectionHeading from "@/components/SectionHeading/SectionHeading";
import { SITE } from "@/lib/siteConfig";
import { getSameAsUrls } from "@/lib/socialLinks";
import styles from "./page.module.css";

export const metadata = {
  title: "About",
  description:
    "Meet Nina and learn about her journey to mindfulness and intentional living.",
  openGraph: {
    title: "About Nina",
    description:
      "Meet Nina and learn about her journey to mindfulness and intentional living.",
    url: `${SITE.url}/about`,
    images: [
      {
        url: "/og-default.png",
        width: 1200,
        height: 630,
        alt: "About Nina, a mindfulness and intentional living guide",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Nina",
    description:
      "Meet Nina and learn about her journey to mindfulness and intentional living.",
    images: ["/og-default.png"],
  },
  alternates: {
    canonical: `${SITE.url}/about`,
  },
};

const PERSON_JSONLD = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Nina",
  jobTitle: "Wellness Writer",
  description:
    "A seeker of stillness in a world that never stops moving. Sharing reflections on mindfulness and intentional living.",
  url: `${SITE.url}/about`,
  knowsAbout: [
    "Mindfulness",
    "Intentional living",
    "Inner wellness",
    "Breathing exercises",
    "Meditation",
    "Somatic awareness",
  ],
  sameAs: getSameAsUrls(),
};

const TIMELINE_ITEMS = [
  {
    year: "The Before",
    title: "Living on autopilot",
    description:
      "Years of chasing productivity, filling every gap with doing. Always moving, rarely feeling present.",
  },
  {
    year: "The Shift",
    title: "Choosing to slow down",
    description:
      "Not a dramatic moment but a series of small decisions. Paying attention to my breath. Letting mornings be slow. Stopping the habit of filling silence with noise.",
  },
  {
    year: "The Practice",
    title: "Building daily rituals",
    description:
      "Morning stillness became non-negotiable. Walking without a podcast. Drinking tea with both hands. Each ritual a small act of returning to myself.",
  },
  {
    year: "The Sharing",
    title: "Nina Healthy begins",
    description:
      "What started as private journaling became a desire to offer this space to others. Not as advice, but as companionship. A place to land when the world feels too fast.",
  },
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
            alt="Nina, a wellness guide with a warm and peaceful expression"
            fill
            sizes="(max-width: 768px) 180px, 220px"
            priority
            className={styles.heroImage}
          />
        </div>
        <h1 className={styles.heroTitle}>Hi, I&apos;m Nina</h1>
        <p className={styles.heroSubtitle}>
          A seeker of stillness in a world that never stops moving.
        </p>
      </section>

      <ScrollReveal>
        <section className={styles.story} aria-label="My story">
          <h2 className={styles.sectionTitle}>My Story</h2>
          <div className={styles.storyContent}>
            <p>
              For years, I chased the version of life everyone told me was right.
              Busy schedules, constant productivity, never enough time. I was
              always moving, always doing, but rarely feeling present.
            </p>
            <p>
              The shift came quietly. Not through a dramatic moment, but through
              small, repeated choices to slow down. I started paying attention to
              my breath. I let mornings be slow. I stopped filling silence with
              noise.
            </p>
            <p>
              Nina Healthy grew from those small choices. It is not a program or
              a prescription. It is an open invitation to explore what peace looks
              like in your own life. I share what I have learned, what I am still
              learning, and what helps me stay grounded when the world feels
              heavy.
            </p>
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section className={styles.timeline} aria-label="My journey">
          <SectionHeading subtitle="The path was never straight, but it was always mine.">
            The Journey
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
        <section className={styles.faqSection} aria-label="Frequently asked questions">
          <SectionHeading subtitle="Things people often wonder about this space.">
            Common Questions
          </SectionHeading>
          <Accordion items={FAQ_ITEMS} showExpandAll />
        </section>
      </ScrollReveal>

      <section className={styles.closing} aria-label="Closing note">
        <p className={styles.closingText}>
          I am not a doctor, a therapist, or a guru. I am someone who found
          peace through small, daily acts of attention and I believe you can
          too. Thank you for being here.
        </p>
      </section>
    </div>
  );
}
