"use client";
import React from "react";
import Link from "next/link";
import styles from "./Footer.module.css";
import Image from "next/image";

const Footer = () => {
  const quickLinks = [{ name: "About", href: "/About" }];

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
    {
      name: "TikTok",
      href: "https://www.tiktok.com/@nina_vibes",
      icon: "🎵",
    },
    {
      name: "YouTube",
      href: "https://www.youtube.com/@nina_vibes",
      icon: "📺",
    },
    {
      name: "Snapchat",
      href: "https://www.snapchat.com/add/nina_vibes",
      icon: "👻",
    },
    {
      name: "X",
      href: "https://www.x.com/nina_vibes",
      icon: "✖️",
    },
  ];

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.footerContainer}>
          {/* Main Footer Content */}
          <div className={styles.footerGrid}>
            {/* Brand Section */}
            <div className={styles.brandSection}>
              <div className={styles.brandHeader}>
                <div className={styles.authorAvatar}>
                  <Image
                    src="/nina.jpg"
                    alt="Nina"
                    width="1080"
                    height="1080"
                    className={styles.authorImage}
                    onError={(e) => {
                      e.target.style.display = "none";
                      e.target.nextSibling.style.display = "flex";
                    }}
                  />
                  <div className={styles.authorInitial}>N</div>
                </div>
                <h3 className={styles.brandTitle}>
                  <span className={styles.brandGradient}>Nina</span>
                </h3>
              </div>
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
