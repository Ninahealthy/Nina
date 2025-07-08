"use client";
import React, { useEffect, useState } from "react";
import styles from "./Privacy.module.css";

const PrivacyPolicy = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    setIsLoaded(true);

    // Generate particles only on the client side
    const particleData = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      animationDelay: Math.random() * 3,
      animationDuration: 3 + Math.random() * 2,
    }));

    setParticles(particleData);
  }, []);

  return (
    <div className={styles.container}>
      {/* Background Elements */}
      <div className={styles.backgroundWrapper}>
        <div className={styles.backgroundBlob1}></div>
        <div className={styles.backgroundBlob2}></div>
        <div className={styles.backgroundFloater1}></div>
        <div className={styles.backgroundFloater2}></div>
      </div>

      {/* Particles - Only render when client-side data is available */}
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

      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div
          className={`${styles.heroContent} ${isLoaded ? styles.loaded : ""}`}
        >
          <h1 className={styles.mainTitle}>
            <span className={styles.titleGradient}>Privacy Policy</span>
          </h1>
          <p className={styles.heroSubtitle}>
            Your privacy is important to us. This policy explains how we
            collect, use, and protect your personal information.
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className={styles.contentSection}>
        <div className={styles.contentContainer}>
          <div className={styles.lastUpdated}>
            <p>Last updated: July 8, 2025</p>
          </div>

          <div className={styles.policyContent}>
            <div className={styles.policySection}>
              <h2 className={styles.sectionTitle}>Information We Collect</h2>
              <div className={styles.sectionContent}>
                <div className={styles.subsection}>
                  <h3>Personal Information</h3>
                  <p>
                    When you use our services, we may collect the following
                    personal information:
                  </p>
                  <ul>
                    <li>
                      Name and contact information (email address, phone number)
                    </li>
                    <li>Health and wellness goals and preferences</li>
                    <li>Dietary restrictions and allergies</li>
                    <li>Physical activity data and fitness metrics</li>
                    <li>Payment information for premium services</li>
                  </ul>
                </div>

                <div className={styles.subsection}>
                  <h3>Usage Data</h3>
                  <p>
                    We automatically collect information about how you use our
                    platform:
                  </p>
                  <ul>
                    <li>
                      Device information (IP address, browser type, operating
                      system)
                    </li>
                    <li>Usage patterns and interaction data</li>
                    <li>Cookies and similar tracking technologies</li>
                    <li>Log files and analytics data</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className={styles.policySection}>
              <h2 className={styles.sectionTitle}>
                How We Use Your Information
              </h2>
              <div className={styles.sectionContent}>
                <div className={styles.purposeGrid}>
                  <div className={styles.purposeCard}>
                    <div className={styles.purposeIcon}>🎯</div>
                    <h3>Personalization</h3>
                    <p>
                      To provide customized health and wellness recommendations
                      tailored to your goals and preferences.
                    </p>
                  </div>
                  <div className={styles.purposeCard}>
                    <div className={styles.purposeIcon}>📊</div>
                    <h3>Analytics</h3>
                    <p>
                      To analyze usage patterns and improve our platform's
                      functionality and user experience.
                    </p>
                  </div>
                  <div className={styles.purposeCard}>
                    <div className={styles.purposeIcon}>📧</div>
                    <h3>Communication</h3>
                    <p>
                      To send you important updates, health tips, and respond to
                      your inquiries and support requests.
                    </p>
                  </div>
                  <div className={styles.purposeCard}>
                    <div className={styles.purposeIcon}>🔒</div>
                    <h3>Security</h3>
                    <p>
                      To protect against fraud, unauthorized access, and ensure
                      the security of our platform.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.policySection}>
              <h2 className={styles.sectionTitle}>
                Data Sharing and Disclosure
              </h2>
              <div className={styles.sectionContent}>
                <div className={styles.sharingInfo}>
                  <h3>We do not sell your personal information</h3>
                  <p>
                    Your health data is sensitive, and we are committed to
                    protecting it. We may share your information only in the
                    following circumstances:
                  </p>

                  <div className={styles.sharingList}>
                    <div className={styles.sharingItem}>
                      <h4>Service Providers</h4>
                      <p>
                        With trusted third-party services that help us operate
                        our platform, such as cloud hosting, payment processing,
                        and analytics services.
                      </p>
                    </div>
                    <div className={styles.sharingItem}>
                      <h4>Legal Requirements</h4>
                      <p>
                        When required by law, regulation, or legal process, or
                        to protect the rights, property, or safety of our users.
                      </p>
                    </div>
                    <div className={styles.sharingItem}>
                      <h4>Business Transfers</h4>
                      <p>
                        In the event of a merger, acquisition, or sale of
                        assets, your information may be transferred as part of
                        the transaction.
                      </p>
                    </div>
                    <div className={styles.sharingItem}>
                      <h4>With Your Consent</h4>
                      <p>
                        When you explicitly consent to sharing your information
                        for specific purposes, such as connecting with
                        healthcare providers.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.policySection}>
              <h2 className={styles.sectionTitle}>Data Security</h2>
              <div className={styles.sectionContent}>
                <div className={styles.securityGrid}>
                  <div className={styles.securityCard}>
                    <div className={styles.securityIcon}>🔐</div>
                    <h3>Encryption</h3>
                    <p>
                      All data is encrypted in transit and at rest using
                      industry-standard encryption protocols.
                    </p>
                  </div>
                  <div className={styles.securityCard}>
                    <div className={styles.securityIcon}>🛡️</div>
                    <h3>Access Controls</h3>
                    <p>
                      Strict access controls ensure only authorized personnel
                      can access your data when necessary.
                    </p>
                  </div>
                  <div className={styles.securityCard}>
                    <div className={styles.securityIcon}>🔍</div>
                    <h3>Regular Audits</h3>
                    <p>
                      We conduct regular security audits and assessments to
                      identify and address potential vulnerabilities.
                    </p>
                  </div>
                  <div className={styles.securityCard}>
                    <div className={styles.securityIcon}>⚡</div>
                    <h3>Incident Response</h3>
                    <p>
                      We have robust incident response procedures to quickly
                      address any security breaches.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.policySection}>
              <h2 className={styles.sectionTitle}>Your Rights and Choices</h2>
              <div className={styles.sectionContent}>
                <div className={styles.rightsGrid}>
                  <div className={styles.rightCard}>
                    <h3>Access Your Data</h3>
                    <p>
                      Request a copy of the personal information we have about
                      you.
                    </p>
                  </div>
                  <div className={styles.rightCard}>
                    <h3>Update Information</h3>
                    <p>
                      Correct or update your personal information at any time.
                    </p>
                  </div>
                  <div className={styles.rightCard}>
                    <h3>Delete Your Data</h3>
                    <p>
                      Request deletion of your personal information, subject to
                      legal requirements.
                    </p>
                  </div>
                  <div className={styles.rightCard}>
                    <h3>Data Portability</h3>
                    <p>
                      Request your data in a structured, machine-readable
                      format.
                    </p>
                  </div>
                  <div className={styles.rightCard}>
                    <h3>Opt-Out</h3>
                    <p>
                      Unsubscribe from marketing communications at any time.
                    </p>
                  </div>
                  <div className={styles.rightCard}>
                    <h3>Restrict Processing</h3>
                    <p>
                      Request that we limit how we use your personal
                      information.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.policySection}>
              <h2 className={styles.sectionTitle}>Cookies and Tracking</h2>
              <div className={styles.sectionContent}>
                <div className={styles.cookieInfo}>
                  <p>
                    We use cookies and similar technologies to enhance your
                    experience on our platform. These include:
                  </p>

                  <div className={styles.cookieTypes}>
                    <div className={styles.cookieType}>
                      <h4>Essential Cookies</h4>
                      <p>
                        Necessary for the platform to function properly and
                        provide basic features.
                      </p>
                    </div>
                    <div className={styles.cookieType}>
                      <h4>Performance Cookies</h4>
                      <p>
                        Help us analyze how our platform is used and improve its
                        performance.
                      </p>
                    </div>
                    <div className={styles.cookieType}>
                      <h4>Functional Cookies</h4>
                      <p>
                        Remember your preferences and settings to personalize
                        your experience.
                      </p>
                    </div>
                    <div className={styles.cookieType}>
                      <h4>Marketing Cookies</h4>
                      <p>
                        Used to deliver relevant advertisements and track
                        campaign effectiveness.
                      </p>
                    </div>
                  </div>

                  <p>
                    You can manage your cookie preferences through your browser
                    settings or our cookie preference center.
                  </p>
                </div>
              </div>
            </div>

            <div className={styles.policySection}>
              <h2 className={styles.sectionTitle}>Children's Privacy</h2>
              <div className={styles.sectionContent}>
                <div className={styles.childrenPrivacy}>
                  <p>
                    Our platform is not intended for children under 13 years of
                    age. We do not knowingly collect personal information from
                    children under 13. If you are a parent or guardian and
                    believe we have collected information from your child,
                    please contact us immediately.
                  </p>
                  <p>
                    For users between 13 and 18 years old, we require parental
                    consent before collecting any personal information.
                  </p>
                </div>
              </div>
            </div>

            <div className={styles.policySection}>
              <h2 className={styles.sectionTitle}>
                International Data Transfers
              </h2>
              <div className={styles.sectionContent}>
                <div className={styles.transferInfo}>
                  <p>
                    Your information may be transferred to and processed in
                    countries other than your own. We ensure appropriate
                    safeguards are in place to protect your data, including:
                  </p>
                  <ul>
                    <li>Adequacy decisions by relevant authorities</li>
                    <li>Standard contractual clauses</li>
                    <li>Binding corporate rules</li>
                    <li>Certification schemes</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className={styles.policySection}>
              <h2 className={styles.sectionTitle}>Data Retention</h2>
              <div className={styles.sectionContent}>
                <div className={styles.retentionInfo}>
                  <p>
                    We retain your personal information only as long as
                    necessary to provide our services and comply with legal
                    obligations. Retention periods vary based on the type of
                    information:
                  </p>
                  <ul>
                    <li>
                      Account information: Until account deletion or 3 years of
                      inactivity
                    </li>
                    <li>
                      Health data: As long as your account is active or as
                      required by law
                    </li>
                    <li>
                      Payment information: As required by financial regulations
                    </li>
                    <li>
                      Usage data: Typically 2-3 years for analytics purposes
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className={styles.policySection}>
              <h2 className={styles.sectionTitle}>Changes to This Policy</h2>
              <div className={styles.sectionContent}>
                <div className={styles.changesInfo}>
                  <p>
                    We may update this privacy policy from time to time to
                    reflect changes in our practices or legal requirements. We
                    will notify you of any material changes by:
                  </p>
                  <ul>
                    <li>
                      Sending an email notification to your registered email
                      address
                    </li>
                    <li>Posting a notice on our platform</li>
                    <li>
                      Updating the "Last updated" date at the top of this policy
                    </li>
                  </ul>
                  <p>
                    Your continued use of our platform after any changes
                    indicates your acceptance of the updated policy.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Section */}
          <div className={styles.contactSection}>
            <div className={styles.contactCard}>
              <h2 className={styles.contactTitle}>
                Questions About Your Privacy?
              </h2>
              <p className={styles.contactDescription}>
                If you have any questions about this privacy policy or how we
                handle your personal information, please don't hesitate to reach
                out to us.
              </p>
              <div className={styles.contactInfo}>
                <div className={styles.contactItem}>
                  <strong>Email:</strong> privacy@ninahealthy.com
                </div>

                <div className={styles.contactItem}>
                  <strong>Response Time:</strong> We aim to respond to all
                  privacy inquiries within 30 days.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
