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
    "Why the body? What happened? What is at stake? The full story behind Nina, from a parking garage in Portland to a practice of somatic attention. Written by a former project manager who stopped performing wellness and started paying attention.",
  openGraph: {
    title: "About Nina",
    description:
      "The full origin story: a parking garage in Portland, a pair of shaking hands, and the practice that grew from learning to listen to the body instead of overriding it.",
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
      "The full origin story: a parking garage in Portland, a pair of shaking hands, and the practice that grew from learning to listen to the body instead of overriding it.",
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
            <h3>The Parking Garage</h3>
            <p>
              In the fall of 2019, I was sitting in a gray Subaru in the
              parking garage on Morrison Street in Portland, Oregon. The
              engine was off. The radio was off. My coffee had gone cold in
              the cupholder sometime in the last hour, and I had not
              noticed. I was staring at the concrete wall in front of me,
              which was the color of old dishwater, and I was trying to
              remember why I had come down here in the first place.
            </p>
            <p>
              I had been working in project management for a tech company
              for six years. Promoted twice in three years. I was good at
              my job in the way that earns raises: I anticipated problems
              before they surfaced, I kept every deadline, I sent follow-up
              emails within the hour. My calendar was a wall of colored
              blocks from seven in the morning until six at night, and I
              wore that density like a merit badge.
            </p>
            <p>
              That morning, sitting in that garage, I realized I could not
              name a single thing I had done that week that was not for
              someone else&apos;s timeline.
            </p>
            <p>
              My hands were shaking. Not dramatically, not the way they
              shake in movies. A fine tremor, the kind you would not see
              unless you were holding a piece of paper. I held up my left
              hand and watched it vibrate against the steering wheel. The
              leather was cold. The air smelled like concrete dust and
              exhaust. Rain was tapping on the windshield, and I could hear
              it more clearly than I had heard anything in months.
            </p>
            <p>
              I did not quit my job that day. I did not book a retreat or
              download a meditation app. I did something so small it barely
              qualifies as a decision. I sat there for five more minutes. I
              watched the rain collect on the glass and run in crooked lines
              toward the wipers. I felt the cold of the steering wheel
              under my palms. I took one breath that went all the way to
              the bottom of my lungs, where it sat for a moment before I
              let it go.
            </p>
            <p>
              It was the first moment in years that belonged entirely to my
              body.
            </p>

            <hr />

            <h3>A Life That Looked Fine</h3>
            <p>
              I want to be honest about what came before that parking
              garage, because it was not a crisis. That is the part that
              makes it difficult to explain. I was not falling apart. I
              was functioning at a level that most people would call
              successful. I had health insurance and a retirement account
              and a partner who loved me and a daughter who was learning
              to swim. From the outside, I was doing well.
            </p>
            <p>
              From the inside, I was a project I was managing.
            </p>
            <p>
              I ate lunch at my desk every day, and I could not tell you
              what I ate. I exercised on a schedule, and I could not tell
              you how my body felt during any of it. I slept six hours a
              night and called it efficient. I had a knot between my
              shoulder blades, right around T4 and T5, that had been there
              for four years. I blamed my desk chair. I bought a better
              desk chair. The knot stayed.
            </p>
            <p>
              That knot was my body filing a complaint I refused to read.
            </p>
            <p>
              The particular cruelty of living this way is that it is
              rewarded. Every promotion confirmed the arrangement: you give
              your hours, your attention, your physical presence to the
              work, and the work gives you a number that goes up. I was
              excellent at ignoring my body&apos;s signals because the world
              I worked in treated that skill as professionalism. Nobody
              gets promoted for saying, &quot;I need to stop and listen to
              what my shoulders are telling me.&quot;
            </p>
            <p>
              The shaking hands in the parking garage were not the
              beginning of something. They were the end of a very long
              sentence my body had been trying to finish.
            </p>

            <hr />

            <h3>The First Language</h3>
            <p>
              If I trace the thread back far enough, it starts in a
              department store fitting room. I was eleven. Fluorescent
              lights overhead, a three-panel mirror, and my mother on the
              other side of the curtain asking if the jeans fit. I remember
              looking at myself from three angles simultaneously and
              understanding, for the first time, that my body was an
              object other people would evaluate.
            </p>
            <p>
              That was the moment the split began: the body I lived inside
              and the body I presented to the world. For the next
              twenty-eight years, I managed the second one. I fed it,
              exercised it, dressed it, and asked very little about what
              it was actually experiencing. I treated it the way I treated
              my projects at work: as a system to be optimized, not a voice
              to be heard.
            </p>
            <p>
              I grew up in a small town near a river. The river was a
              brown, unhurried thing that ran along the edge of town,
              half-hidden by willows and blackberry brambles. I walked
              beside it most afternoons. It never occurred to me that
              the river was doing something I had forgotten how to do:
              moving at its own pace, responding to what was actually
              happening rather than what was scheduled, carrying what it
              carried without apology.
            </p>
            <p>
              Somewhere between that river and the tech company, I lost
              the ability to feel my own weather.
            </p>

            <hr />

            <h3>Why the Body</h3>
            <p>
              After the parking garage, I tried the obvious things. I
              downloaded a meditation app. I lasted nine days. I tried
              journaling with prompts; they felt like performance reviews
              for my inner life. I read books about vulnerability and
              underlined passages and then went back to answering emails
              at eleven at night. None of it touched the thing that was
              actually wrong.
            </p>
            <p>
              What changed was an accident. One Tuesday morning, I woke
              up early and instead of reaching for my phone, I stood by
              the window in the kitchen and drank a glass of water. Room
              temperature, nothing special. But I felt it. I felt the
              water move through my chest and into my stomach, and for a
              moment I was not thinking about the day ahead or the emails
              waiting or the meeting at nine. I was just a body, drinking
              water, standing in gray light.
            </p>
            <p>
              That was the beginning of what I now call somatic attention:
              the practice of starting with what the body is experiencing
              rather than what the mind is narrating.
            </p>
            <p>
              I did not invent this. Researchers like Antonio Damasio at
              the University of Southern California have spent decades
              studying how the body&apos;s signals, what he calls somatic
              markers, shape every decision we make before conscious
              thought arrives. Bessel van der Kolk, the trauma
              psychiatrist, demonstrated that the body encodes experience
              in ways the talking mind cannot access or override. Maurice
              Merleau-Ponty, the philosopher, distinguished between the
              body as lived experience and the body as an object we
              observe from outside.
            </p>
            <p>
              I read all of them. They helped. But the real teacher was
              the water moving through my chest at six in the morning.
            </p>
            <blockquote>
              The mind narrates. The body reports. Somatic attention is
              the practice of reading the report before editing the
              narrative.
            </blockquote>
            <p>
              This is not a philosophy. It is a sequence: feel first,
              think second. When I am afraid, I check the body before I
              check the calendar. When I am exhausted, I ask where the
              exhaustion is sitting, in tissue and bone, before I ask what
              caused it. The body is not always right. But it is always
              first, and it does not revise itself to protect my
              self-image.
            </p>

            <hr />

            <h3>What Changed, and What Did Not</h3>
            <p>
              I want to be careful here, because I am not telling a
              transformation story. I did not wake up one day healed and
              whole and living my best life. What happened was smaller
              and, I think, more honest.
            </p>
            <p>
              Over the months after the parking garage, I started giving
              my mornings back to my body. Ten minutes with no screen,
              no plan. The kettle boiling, the light changing on the wall,
              the particular gray of a Portland winter coming in through
              the window. I started writing things down in a notebook,
              not to publish, not to build an audience, but to understand
              what was happening beneath the surface of being fine.
            </p>
            <p>
              Three weeks after I left the tech company, the knot between
              my shoulder blades dissolved. Four years of blaming my desk
              chair, and the problem was never the chair. It was the
              posture of a person bracing against a life she had not
              chosen so much as optimized her way into.
            </p>
            <p>
              Then I got sick. Genuinely, frighteningly sick, in a way
              that has no name in this essay because naming it would
              reduce it to a diagnosis, and what mattered was not the
              diagnosis but the three months that followed. Two weeks
              of acute illness, then a long spiral that refused to be
              linear: Tuesday I could walk to the store. Wednesday I was
              in bed. Thursday I felt normal. Friday my body punished me
              for cleaning the kitchen. I learned a metallic taste in the
              mouth, a fatigue so heavy I could feel it in my teeth.
            </p>
            <p>
              That illness taught me something the parking garage only
              hinted at: the body does not operate on the mind&apos;s
              schedule. Recovery is not a line. It is a spiral, and the
              spiral has its own intelligence, and the hardest thing I
              have ever done is trust that intelligence when it
              contradicts what I think should be happening.
            </p>
            <p>
              My body is different now than it was in that parking garage.
              My right shoulder makes a dry, fibrous pop that it did not
              make five years ago. My left knee has a specific
              conversation with the third step of my stairs, where the
              tread is slightly higher than the others. I am learning
              that this is not decline. It is translation. The body is
              precise; it is speaking a more detailed language than it
              used to, and I am finally paying attention to the grammar.
            </p>

            <hr />

            <h3>What Is at Stake</h3>
            <p>
              I write about this because I think what happened in that
              parking garage is not unusual. I think millions of people
              are sitting in their own version of a gray Subaru right now,
              with cold coffee and hands that will not stay steady, in a
              life that looks fine from the outside. And I think the cost
              of ignoring the body&apos;s report is not just personal
              discomfort. It is the erosion of the ability to feel
              anything at all.
            </p>
            <p>
              I watch my daughter, who is nine, kneel on the sidewalk to
              look at a beetle the color of an old penny. She has not yet
              learned to split herself into the body that experiences and
              the body that performs. When she is cold, she shivers. When
              she is fascinated, her whole self leans forward. There is
              no gap between the signal and the response.
            </p>
            <p>
              I cannot get that back. I am not trying to. What I am
              trying to do is narrow the gap: the distance between what
              my body knows and what I allow myself to hear. Some days
              the gap is small. Some days it is a canyon.
            </p>
            <p>
              My mother is in declining health now. I drive to her place,
              manage her medications, sit in waiting rooms with magazines
              from last year. Some afternoons I am in her kitchen for the
              third hour, and she tells the same story for the fourth
              time, and I feel a love so fierce and a fatigue so total
              that they become indistinguishable. I am learning what it
              costs to stay present with another body that is changing in
              ways neither of us can control.
            </p>
            <p>
              That is what is at stake. Not wellness, not optimization,
              not a better morning routine. What is at stake is the
              capacity to be in a body, in a life, with the people you
              love, without performing your way through it. What is at
              stake is the difference between a life that looks fine and
              a life that feels true.
            </p>
            <p>
              Nina grew from the notes I wrote in those first months
              after the parking garage. It is not a program. It is not
              advice. It is a practice that began with a glass of water
              and a pair of shaking hands, and it lives here now, in
              essays about attention, the nervous system, and the
              ordinary courage of listening to a body you spent decades
              learning to override.
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
