"use client";
import React, { useState, useEffect } from "react";
import Head from "next/head";
import styles from "./page.module.css";

const Disclaimer = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    setIsLoaded(true);

    // Generate particles on client side only
    const generatedParticles = [...Array(12)].map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      animationDelay: Math.random() * 2,
      animationDuration: 2 + Math.random() * 2,
    }));
    setParticles(generatedParticles);

    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const disclaimerSections = [
    {
      title: "Affiliate Disclosure",
      icon: "🤝",
      content:
        "NinaHealthy.com participates in various affiliate marketing programs. This means we may earn commissions (at no additional cost to you) if you purchase products or services through links on our website. These partnerships help fund our operations but do not influence our editorial content, reviews, or recommendations. We prioritize transparency and only promote products we believe in.",
    },
    {
      title: "Content Generation & AI Disclosure",
      icon: "🤖",
      content:
        "Portions of our content are created or enhanced using artificial intelligence (AI) tools. All AI-generated material is rigorously reviewed, edited, and validated by our human editorial team to ensure accuracy and relevance to maintain high editorial standards.",
    },
    {
      title: "Intellectual Property & Trademarks",
      icon: "⚖️",
      content:
        "All trademarks, logos, service marks, and company names mentioned on NinaHealthy.com are the property of their respective owners. Use of these names does not imply endorsement, sponsorship, or affiliation unless explicitly stated. All references to third-party brands, products, or services are for identification purposes only.",
    },
    {
      title: "General Information Disclaimer",
      icon: "ℹ️",
      content:
        "The content on NinaHealthy.com is for informational purposes only and is not a substitute for professional medical, nutritional, or financial advice. Always consult qualified experts before making health-related decisions. While we strive for accuracy, we make no guarantees regarding the completeness, reliability, or timeliness of the information provided.",
    },
  ];

  const contentTypes = [
    "Text, graphics, images, and data",
    "AI-assisted or human-created articles",
    "User-generated comments or reviews",
  ];

  const externalLinkWarnings = [
    "Control the content, privacy policies, or practices of these sites",
    "Guarantee the accuracy, legality, or ethics of external content",
    "Assume responsibility for damages caused by visiting linked sites",
  ];

  const liabilityItems = [
    "Errors, omissions, or inaccuracies in content",
    "Damages (direct, indirect, or consequential) arising from website use",
    "Actions taken based on information provided on this site",
  ];

  return (
    <>
      <Head>
        <title>
          Important Disclaimer | NinaHealthy.com - Legal Information
        </title>
        <meta
          name="description"
          content="Important legal disclaimer for NinaHealthy.com including affiliate disclosure, AI content policy, intellectual property rights, and liability limitations."
        />
        <meta
          name="keywords"
          content="disclaimer, legal notice, affiliate disclosure, AI content, intellectual property, liability"
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://ninahealthy.com/disclaimer" />
      </Head>

      <div className={styles.container}>
        {/* Animated Background Elements */}
        <div className={styles.backgroundWrapper}>
          <div
            className={styles.backgroundBlob1}
            style={{
              left: `${mousePosition.x * 0.1}%`,
              top: `${mousePosition.y * 0.1}%`,
              transform: "translate(-50%, -50%)",
            }}
          />
          <div
            className={styles.backgroundBlob2}
            style={{
              right: `${mousePosition.x * 0.05}%`,
              bottom: `${mousePosition.y * 0.05}%`,
              transform: "translate(50%, 50%)",
            }}
          />
          <div className={styles.backgroundFloater1} />
          <div className={styles.backgroundFloater2} />
        </div>

        {/* Floating Particles */}
        {particles.length > 0 && (
          <div className={styles.particlesWrapper}>
            {particles.map((particle) => (
              <div
                key={particle.id}
                className={styles.particle}
                style={{
                  left: `${particle.left}%`,
                  top: `${particle.top}%`,
                  animationDelay: `${particle.animationDelay}s`,
                  animationDuration: `${particle.animationDuration}s`,
                }}
              />
            ))}
          </div>
        )}

        {/* Hero Section */}
        <section className={styles.heroSection}>
          <div
            className={`${styles.heroContent} ${isLoaded ? styles.loaded : ""}`}
          >
            <h1 className={styles.mainTitle}>
              <span className={styles.titleGradient}>Important Disclaimer</span>
            </h1>
            <p className={styles.heroSubtitle}>
              Legal information and important disclosures for NinaHealthy.com
            </p>
          </div>
        </section>

        {/* Main Content */}
        <main className={styles.contentSection}>
          <div className={styles.contentContainer}>
            {/* Main Disclaimer Sections */}
            <section className={styles.disclaimerSection}>
              <div className={styles.disclaimerGrid}>
                {disclaimerSections.map((section, index) => (
                  <div key={index} className={styles.disclaimerCard}>
                    <div className={styles.disclaimerIcon}>{section.icon}</div>
                    <h2 className={styles.disclaimerTitle}>{section.title}</h2>
                    <p className={styles.disclaimerContent}>
                      {section.content}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* Content Types Section */}
            <section className={styles.infoSection}>
              <div className={styles.infoCard}>
                <h2 className={styles.sectionTitle}>Content Types Covered</h2>
                <div className={styles.listWrapper}>
                  {contentTypes.map((type, index) => (
                    <div key={index} className={styles.listItem}>
                      <span className={styles.listIcon}>📝</span>
                      <span className={styles.listText}>{type}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* External Links Section */}
            <section className={styles.warningSection}>
              <div className={styles.warningCard}>
                <div className={styles.warningHeader}>
                  <span className={styles.warningIcon}>🔗</span>
                  <h2 className={styles.sectionTitle}>
                    External Links & Third-Party Sites
                  </h2>
                </div>
                <p className={styles.warningIntro}>
                  Our website contains links to external sites for your
                  convenience. We do not:
                </p>
                <div className={styles.warningList}>
                  {externalLinkWarnings.map((warning, index) => (
                    <div key={index} className={styles.warningItem}>
                      <span className={styles.warningBullet}>⚠️</span>
                      <span className={styles.warningText}>{warning}</span>
                    </div>
                  ))}
                </div>
                <div className={styles.cautionBox}>
                  <p className={styles.cautionText}>
                    <strong>Proceed with caution:</strong> Links may become
                    outdated or redirect to "bad" content before we can remove
                    them. Always review the Privacy Policy and Terms of Service
                    of any third-party site before sharing personal data or
                    engaging in transactions.
                  </p>
                </div>
              </div>
            </section>

            {/* Liability Section */}
            <section className={styles.liabilitySection}>
              <div className={styles.liabilityCard}>
                <h2 className={styles.sectionTitle}>Limitation of Liability</h2>
                <p className={styles.liabilityIntro}>
                  NinaHealthy.com and its contributors are not liable for:
                </p>
                <div className={styles.liabilityList}>
                  {liabilityItems.map((item, index) => (
                    <div key={index} className={styles.liabilityItem}>
                      <span className={styles.liabilityIcon}>🚫</span>
                      <span className={styles.liabilityText}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Updates Section */}
            <section className={styles.updatesSection}>
              <div className={styles.updatesCard}>
                <h2 className={styles.sectionTitle}>Updates & Amendments</h2>
                <p className={styles.updatesText}>
                  This disclaimer may be revised without prior notice. Continued
                  use of NinaHealthy.com constitutes acceptance of changes. For
                  questions or concerns, please contact us.
                </p>
                <div className={styles.lastUpdated}>
                  <span className={styles.updateIcon}>📅</span>
                  <strong>Last Updated: July 08, 2025</strong>
                </div>
              </div>
            </section>

            {/* Legal Note */}
            <section className={styles.legalNote}>
              <div className={styles.legalCard}>
                <div className={styles.legalHeader}>
                  <span className={styles.legalIcon}>⚖️</span>
                  <h2 className={styles.legalTitle}>Legal Note</h2>
                </div>
                <p className={styles.legalText}>
                  This disclaimer is not legal advice. Consult a legal
                  professional to ensure compliance with FTC regulations, GDPR,
                  and other applicable laws.
                </p>
              </div>
            </section>
          </div>
        </main>
      </div>
    </>
  );
};

export default Disclaimer;
