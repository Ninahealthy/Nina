import PageHero from "@/components/PageHero/PageHero";
import { SITE } from "@/lib/siteConfig";
import styles from "@/app/styles/LegalPage.module.css";

export const metadata = {
  title: "Privacy Policy",
  description:
    "How Nina Healthy handles your personal information. Our privacy practices for newsletter subscribers and contact form submissions.",
  openGraph: {
    title: "Privacy Policy",
    description:
      "How Nina Healthy handles your personal information. Our privacy practices for newsletter subscribers and contact form submissions.",
    url: `${SITE.url}/privacy`,
    images: [
      {
        url: "/og-default.png",
        width: 1200,
        height: 630,
        alt: "Nina Healthy privacy policy",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "Privacy Policy",
    description:
      "How Nina Healthy handles your personal information. Our privacy practices for newsletter subscribers and contact form submissions.",
  },
  alternates: {
    canonical: `${SITE.url}/privacy`,
  },
};

export default function PrivacyPage() {
  return (
    <div className={styles.page}>
      <PageHero
        title="Privacy Policy"
        subtitle="Your trust matters. Here is how I handle your information."
      />

      <section className={styles.content} aria-label="Privacy policy details">
        <div className={styles.body}>
          <p className={styles.lastUpdated}>Last updated: June 2026</p>

          <h2 className={styles.sectionTitle}>What I Collect</h2>
          <p>
            This site collects only what you choose to share. When you use the
            contact form, I receive your name, email address, and message. When
            you subscribe to the newsletter, I receive your email address. No
            data is collected automatically beyond what is standard for web
            hosting (such as server logs). Additionally, this site displays
            advertisements through Google AdSense, which may collect certain
            information as described in the Cookies and Third Parties sections
            below.
          </p>

          <h2 className={styles.sectionTitle}>How I Use It</h2>
          <p>
            Your email address is used solely to send you the newsletter you
            signed up for, or to respond to messages you send through the
            contact form. I do not sell, share, or trade your information with
            anyone. I do not use tracking pixels, analytics tools, or
            advertising networks on this site.
          </p>

          <h2 className={styles.sectionTitle}>Email Communications</h2>
          <p>
            If you subscribe to the newsletter, you will receive periodic
            reflections on mindful living. Every email includes the ability to
            unsubscribe. If you wish to be removed from the list at any time,
            simply reply to any email and ask, or use the unsubscribe option
            provided.
          </p>

          <h2 className={styles.sectionTitle}>Cookies</h2>
          <p>
            This site uses essential cookies for the basic functioning of the
            website, such as remembering your theme preference. Additionally,
            Google AdSense, which serves advertisements on this site, may use
            cookies and similar technologies to display personalized ads based
            on your browsing history. You can manage your ad personalization
            preferences through your Google account settings or by visiting
            the Google Ads Settings page.
          </p>

          <h2 className={styles.sectionTitle}>Third Parties</h2>
          <p>
            This site is hosted on standard web infrastructure. Email
            delivery is handled through a secure SMTP provider. Google
            AdSense is used to display advertisements, and Google may collect
            and use data according to its own privacy policy. No third-party
            analytics or social media trackers are used on this site. You can
            learn more about how Google uses information by visiting
            Google&#39;s Privacy and Terms page.
          </p>

          <h2 className={styles.sectionTitle}>Your Rights</h2>
          <p>
            You have the right to ask what data I hold about you, to request
            its deletion, or to unsubscribe from communications at any time.
            To make any such request, please use the contact form or email
            hello@ninahealthy.com.
          </p>

          <h2 className={styles.sectionTitle}>Questions</h2>
          <p>
            If you have any questions about this privacy policy or how your
            information is handled, please reach out through the contact page.
            I will respond as soon as I can.
          </p>
        </div>
      </section>
    </div>
  );
}
