import PageHero from "@/components/PageHero/PageHero";
import { SITE } from "@/lib/siteConfig";
import styles from "@/app/styles/LegalPage.module.css";

export const metadata = {
  title: "Privacy Policy",
  description:
    "How Nina handles your personal information. Our privacy practices for newsletter subscribers and contact form submissions.",
  openGraph: {
    title: "Privacy Policy",
    description:
      "How Nina handles your personal information. Our privacy practices for newsletter subscribers and contact form submissions.",
    url: `${SITE.url}/privacy`,
    images: [
      {
        url: "/og-default.png",
        width: 1200,
        height: 630,
        alt: "Nina privacy policy",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "Privacy Policy",
    description:
      "How Nina handles your personal information. Our privacy practices for newsletter subscribers and contact form submissions.",
  },
  alternates: {
    canonical: `${SITE.url}/privacy`,
  },
  robots: {
    index: false,
    follow: true,
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
            additional personal data is collected directly by me beyond what is
            standard for web hosting (such as server logs). Additionally, this
            site uses third-party services described below that may collect
            certain information automatically.
          </p>

          <h2 className={styles.sectionTitle}>How I Use It</h2>
          <p>
            Your email address is used solely to send you the newsletter you
            signed up for, or to respond to messages you send through the
            contact form. I do not sell, share, or trade your personal
            information with anyone.
          </p>

          <h2 className={styles.sectionTitle}>Analytics and Performance</h2>
          <p>
            This site uses Google Analytics 4 to understand how visitors
            interact with the content, such as which pages are visited and how
            long readers spend on each article. It also uses Vercel Analytics
            and Vercel Speed Insights to monitor site performance and loading
            times. These services may collect anonymized usage data, including
            your IP address, browser type, and pages visited. This information
            helps me understand what resonates with readers and ensure the site
            loads quickly.
          </p>

          <h2 className={styles.sectionTitle}>Advertising</h2>
          <p>
            This site displays advertisements through Google AdSense. Google
            may use cookies and similar technologies to display ads based on
            your browsing history and interests. You can manage your ad
            personalization preferences through your Google account settings
            or by visiting the Google Ads Settings page. You can also opt out
            of personalized advertising by visiting aboutads.info.
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
            This site uses cookies for several purposes: essential cookies for
            basic site functionality (such as remembering your theme
            preference), analytics cookies used by Google Analytics to
            understand visitor behavior, and advertising cookies used by Google
            AdSense to serve relevant advertisements. You can manage or disable
            cookies through your browser settings, though this may affect your
            experience on the site.
          </p>

          <h2 className={styles.sectionTitle}>Third Parties</h2>
          <p>
            This site is hosted on Vercel. Email delivery is handled through
            a secure SMTP provider. The following third-party services are
            used on this site: Google Analytics 4 (visitor analytics), Vercel
            Analytics and Speed Insights (performance monitoring), and Google
            AdSense (advertising). Each of these services has its own privacy
            policy governing how they collect and use data. No additional
            third-party social media trackers are used. You can learn more
            about how Google uses information by visiting Google&#39;s Privacy
            and Terms page.
          </p>

          <h2 className={styles.sectionTitle}>Your Rights</h2>
          <p>
            You have the right to ask what data I hold about you, to request
            its deletion, or to unsubscribe from communications at any time.
            To make any such request, please use the contact form or email
            nina@ninahealthy.com.
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
