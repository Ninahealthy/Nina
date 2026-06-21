import PageHero from "@/components/PageHero/PageHero";
import { SITE } from "@/lib/siteConfig";
import styles from "@/app/styles/LegalPage.module.css";

export const metadata = {
  title: "Terms of Use",
  description:
    "Terms of use for Nina. Guidelines for using this mindfulness and wellness website.",
  openGraph: {
    title: "Terms of Use",
    description:
      "Terms of use for Nina. Guidelines for using this mindfulness and wellness website.",
    url: `${SITE.url}/terms`,
    images: [
      {
        url: "/og-default.png",
        width: 1200,
        height: 630,
        alt: "Nina terms of use",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "Terms of Use",
    description:
      "Terms of use for Nina. Guidelines for using this mindfulness and wellness website.",
  },
  alternates: {
    canonical: `${SITE.url}/terms`,
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function TermsPage() {
  return (
    <div className={styles.page}>
      <PageHero
        title="Terms of Use"
        subtitle="A few simple guidelines for this space."
      />

      <section className={styles.content} aria-label="Terms of use details">
        <div className={styles.body}>
          <p className={styles.lastUpdated}>Last updated: June 2026</p>

          <h2 className={styles.sectionTitle}>Welcome</h2>
          <p>
            By using this website, you agree to these simple terms. Nina
            Healthy is a personal space for sharing reflections on mindfulness
            and intentional living. It is offered in good faith, and I ask that
            you engage with it in the same spirit.
          </p>

          <h2 className={styles.sectionTitle}>Not Professional Advice</h2>
          <p>
            The content on this site reflects personal experiences and
            observations. It is not medical advice, therapy, or a substitute
            for professional mental health support. If you are experiencing a
            mental health crisis, please contact a qualified healthcare
            provider or your local emergency services.
          </p>

          <h2 className={styles.sectionTitle}>Content Ownership</h2>
          <p>
            All written content, images, and design elements on this site are
            the property of Nina. You are welcome to share excerpts
            with proper attribution, but please do not reproduce full articles
            or claim them as your own work.
          </p>

          <h2 className={styles.sectionTitle}>Respectful Use</h2>
          <p>
            When using the contact form or engaging with this space, I ask for
            respectful communication. This is a place built on gentleness, and
            I trust that you will treat it and its community with care.
          </p>

          <h2 className={styles.sectionTitle}>External Links</h2>
          <p>
            This site may contain links to external websites. I am not
            responsible for the content or privacy practices of those sites.
            Please review their own terms when visiting.
          </p>

          <h2 className={styles.sectionTitle}>Changes to These Terms</h2>
          <p>
            These terms may be updated from time to time. Any changes will be
            reflected on this page with an updated date. Continued use of the
            site after changes constitutes acceptance of the new terms.
          </p>

          <h2 className={styles.sectionTitle}>Contact</h2>
          <p>
            If you have questions about these terms, please reach out through
            the contact page. I am happy to clarify anything.
          </p>
        </div>
      </section>
    </div>
  );
}
