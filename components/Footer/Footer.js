"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import styles from "./Footer.module.css";

const Footer = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    // Generate particles on client side only
    const generatedParticles = [...Array(8)].map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      animationDelay: Math.random() * 3,
      animationDuration: 3 + Math.random() * 2,
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

  const quickLinks = [
    { name: "About", href: "/About" },
    /* { name: "Services", href: "/services" },
    { name: "Portfolio", href: "/portfolio" },
    { name: "Blog", href: "/blog" },*/
  ];

  const legalLinks = [
    { name: "Contact", href: "/Contact" },
    { name: "Important Disclaimer", href: "/Important-disclaimer" },
    { name: "Privacy Policy", href: "/Privacy-policy" },
  ];

  const socialLinks = [
    {
      name: "Instagram",
      href: "https://www.instagram.com/nina____vibes/",
      icon: "📷",
    },
    {
      name: "Pinterest",
      href: "https://www.pinterest.com/Nina_Vibes/",
      icon: "📌",
    },
  ];

  return (
    <footer className={styles.footer}>
      {/* Animated Background Elements */}
      <div className={styles.backgroundWrapper}>
        <div
          className={styles.backgroundBlob1}
          style={{
            left: `${20 + mousePosition.x * 0.05}%`,
            top: `${10 + mousePosition.y * 0.03}%`,
          }}
        />
        <div
          className={styles.backgroundBlob2}
          style={{
            right: `${15 + mousePosition.x * 0.03}%`,
            bottom: `${20 + mousePosition.y * 0.05}%`,
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

      <div className={styles.footerContent}>
        <div className={styles.footerContainer}>
          {/* Main Footer Content */}
          <div className={styles.footerGrid}>
            {/* Brand Section */}
            <div className={styles.brandSection}>
              <h3 className={styles.brandTitle}>
                <span className={styles.brandGradient}>Nina</span>
              </h3>
              <p className={styles.brandDescription}>
                Creating beautiful, functional spaces that reflect your
                personality and enhance your lifestyle. Transform your home into
                a sanctuary of comfort and style.
              </p>
              <div className={styles.socialLinks}>
                {socialLinks.map((social, index) => (
                  <Link
                    key={index}
                    href={social.href}
                    className={styles.socialLink}
                    aria-label={social.name}
                  >
                    <span className={styles.socialIcon}>{social.icon}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className={styles.linksSection}>
              <h4 className={styles.sectionTitle}>Quick Links</h4>
              <ul className={styles.linksList}>
                {quickLinks.map((link, index) => (
                  <li key={index} className={styles.linkItem}>
                    <Link href={link.href} className={styles.footerLink}>
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal Links */}
            <div className={styles.linksSection}>
              <h4 className={styles.sectionTitle}>Legal & Contact</h4>
              <ul className={styles.linksList}>
                {legalLinks.map((link, index) => (
                  <li key={index} className={styles.linkItem}>
                    <Link href={link.href} className={styles.footerLink}>
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div className={styles.contactSection}>
              <h4 className={styles.sectionTitle}>Get In Touch</h4>
              <div className={styles.contactInfo}>
                <div className={styles.contactItem}>
                  <span className={styles.contactIcon}>📧</span>
                  <span className={styles.contactText}>
                    hello@ninahealthy.com
                  </span>
                </div>
                {/*<div className={styles.contactItem}>
                  <span className={styles.contactIcon}>📞</span>
                  <span className={styles.contactText}>(555) 123-4567</span>
                </div>*/}
                <div className={styles.contactItem}>
                  <span className={styles.contactIcon}>📍</span>
                  <span className={styles.contactText}>New York, NY</span>
                </div>
              </div>
            </div>
          </div>

          {/* Newsletter Signup */}
          <div className={styles.newsletterSection}>
            <div className={styles.newsletterContent}>
              <h4 className={styles.newsletterTitle}>
                <span className={styles.titleGradient}>Stay Inspired</span>
              </h4>
              <p className={styles.newsletterDescription}>
                Get design tips, inspiration, and exclusive updates delivered to
                your inbox.
              </p>
              <div className={styles.newsletterForm}>
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className={styles.newsletterInput}
                />
                <button className={styles.newsletterButton}>Subscribe</button>
              </div>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className={styles.footerBottom}>
            <div className={styles.footerBottomContent}>
              <p className={styles.copyright}>
                © {new Date().getFullYear()} Nina Home Decor and Interior
                Design. All rights reserved.
              </p>
              <div className={styles.footerBottomLinks}>
                <Link
                  href="/Important-disclaimer"
                  className={styles.footerBottomLink}
                >
                  Important Disclaimer
                </Link>
                <Link
                  href="/Privacy-policy"
                  className={styles.footerBottomLink}
                >
                  Privacy Policy
                </Link>
                {/*<Link href="/cookies" className={styles.footerBottomLink}>
                  Cookie Policy
                </Link>*/}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
