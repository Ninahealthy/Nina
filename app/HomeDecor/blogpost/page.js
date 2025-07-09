"use client";
import React, { useState, useEffect } from "react";
import Head from "next/head";
import styles from "./page.module.css";
import Image from "next/image";

const BlogPost = ({
  title = "Transform Your Space with Modern Interior Design",
  description = "Discover the perfect balance of style, comfort, and functionality in your home with these expert design principles and inspiration.",
  content,
  author = {
    name: "Nina",
    bio: "Interior Design Expert with 15+ years of experience in modern home transformations",
    avatar: "/nina.jpg",
    social: {
      twitter: "@ninadesigns",
      instagram: "@nina_interior_design",
      linkedin: "nina-rodriguez-interior-design",
    },
  },
  publishDate = "2025-07-07",
  modifiedDate = "2025-07-07",
  category = "Home Decor",
  readTime = "5 min read",
  tags = ["modern", "cozy", "inspiration", "interior-design", "home-decor"],
  featuredImage = "/images/modern-interior-design-hero.jpg",
  canonicalUrl = "https://yoursite.com/transform-your-space-with-modern-interior-design",
  siteUrl = "https://yoursite.com",
  siteName = "Interior Design Pro",
  relatedPosts = [
    {
      title: "Modern Farmhouse Kitchen Ideas",
      description:
        "Rustic charm meets contemporary functionality in this stunning kitchen design",
      slug: "modern-farmhouse-kitchen-ideas",
      image: "/images/modern-farmhouse-kitchen.jpg",
    },
    {
      title: "Bohemian Bedroom Retreat",
      description:
        "Warm earth tones and layered textiles for a cozy, eclectic bedroom vibe",
      slug: "bohemian-bedroom-retreat",
      image: "/images/bohemian-bedroom.jpg",
    },
    {
      title: "Spa-Inspired Bathroom Design",
      description:
        "Transform your bathroom into a luxurious spa retreat with these calming elements",
      slug: "spa-inspired-bathroom-design",
      image: "/images/spa-bathroom.jpg",
    },
  ],
}) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    setIsLoaded(true);

    // Generate particles on client side only
    const generatedParticles = [...Array(20)].map((_, i) => ({
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

  const sampleContent = [
    {
      type: "paragraph",
      content:
        "Transform your living space into a sanctuary of style and comfort with these carefully curated design ideas. Whether you're looking to refresh a single room or redesign your entire home, these inspiring concepts will help you create the perfect atmosphere for modern living.",
    },
    {
      type: "heading",
      content: "Key Design Principles",
    },
    {
      type: "paragraph",
      content:
        "The foundation of great interior design lies in understanding the balance between functionality and aesthetics. Every piece should serve a purpose while contributing to the overall visual harmony of your space.",
    },
    {
      type: "heading",
      content: "Color Palette & Textures",
    },
    {
      type: "paragraph",
      content:
        "Neutral tones create a calming foundation, while carefully chosen accent colors add personality and warmth. Layer different textures through fabrics, natural materials, and decorative elements to create visual interest and tactile appeal.",
    },
    {
      type: "list",
      content: [
        "Choose a cohesive color scheme with 2-3 main colors",
        "Mix textures like wool, linen, and natural wood",
        "Add metallic accents for sophistication",
        "Include plants for natural color and life",
      ],
    },
    {
      type: "paragraph",
      content:
        "Remember that great design is about creating a space that reflects your personality while serving your daily needs. Don't be afraid to experiment with different combinations until you find what feels right for your home.",
    },
  ];

  const contentToRender = content || sampleContent;

  // Generate structured data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description: description,
    image: [featuredImage],
    author: {
      "@type": "Person",
      name: author.name,
      description: author.bio,
      image: author.avatar,
      sameAs: [
        `https://twitter.com/${author.social.twitter.replace("@", "")}`,
        `https://instagram.com/${author.social.instagram.replace("@", "")}`,
        `https://linkedin.com/in/${author.social.linkedin}`,
      ],
    },
    publisher: {
      "@type": "Organization",
      name: siteName,
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/images/logo.png`,
      },
    },
    datePublished: publishDate,
    dateModified: modifiedDate,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": canonicalUrl,
    },
    articleSection: category,
    keywords: tags.join(", "),
    wordCount: contentToRender.reduce((count, section) => {
      if (section.type === "paragraph") {
        return count + section.content.split(" ").length;
      }
      return count;
    }, 0),
    timeRequired: readTime,
    inLanguage: "en-US",
    isAccessibleForFree: true,
  };

  const renderContent = (section, index) => {
    switch (section.type) {
      case "heading":
        return (
          <h2 key={index} className={styles.contentHeading}>
            {section.content}
          </h2>
        );
      case "paragraph":
        return (
          <p key={index} className={styles.contentParagraph}>
            {section.content}
          </p>
        );
      case "list":
        return (
          <ul key={index} className={styles.contentList}>
            {section.content.map((item, itemIndex) => (
              <li key={itemIndex} className={styles.contentListItem}>
                <span className={styles.contentListIcon}>✓</span>
                {item}
              </li>
            ))}
          </ul>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <Head>
        {/* Basic Meta Tags */}
        <title>
          {title} | {siteName}
        </title>
        <meta name="description" content={description} />
        <meta name="keywords" content={tags.join(", ")} />
        <meta name="author" content={author.name} />
        <meta
          name="robots"
          content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"
        />
        <meta
          name="googlebot"
          content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"
        />

        {/* Canonical URL */}
        <link rel="canonical" href={canonicalUrl} />

        {/* Open Graph Tags */}
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={featuredImage} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content={siteName} />
        <meta property="article:author" content={author.name} />
        <meta property="article:published_time" content={publishDate} />
        <meta property="article:modified_time" content={modifiedDate} />
        <meta property="article:section" content={category} />
        <meta property="article:tag" content={tags.join(", ")} />

        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={featuredImage} />
        <meta name="twitter:creator" content={author.social.twitter} />
        <meta name="twitter:site" content={author.social.twitter} />

        {/* Additional SEO Tags */}
        <meta name="format-detection" content="telephone=no" />
        <meta name="theme-color" content="#8b5cf6" />
        <meta name="msapplication-TileColor" content="#8b5cf6" />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />

        {/* Preload Critical Resources */}
        <link rel="preload" href={author.avatar} as="image" />
        <link rel="preload" href={featuredImage} as="image" />

        {/* DNS Prefetch for External Resources */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
      </Head>

      <article
        className={styles.container}
        itemScope
        itemType="https://schema.org/BlogPosting"
      >
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
        {/*<div className={styles.particlesWrapper}>
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className={styles.particle}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
              }}
            />
          ))}
        </div>*/}

        {/* Hero Section */}
        <header className={styles.heroSection}>
          <div
            className={`${styles.heroContent} ${isLoaded ? styles.loaded : ""}`}
          >
            {/* Main Title */}
            <h1 className={styles.mainTitle} itemProp="headline">
              <span className={styles.titleGradient}>{title}</span>
            </h1>
          </div>
        </header>

        {/* Content Section */}
        <div id="content" className={styles.contentSection}>
          <div className={styles.contentContainer}>
            <main className={styles.article} itemProp="articleBody">
              {contentToRender.map((section, index) =>
                renderContent(section, index)
              )}
            </main>
            {/* Author & Meta Info */}
            <div className={styles.metaWrapper}>
              <div
                className={styles.authorInfo}
                itemScope
                itemType="https://schema.org/Person"
              >
                {/*<div className={styles.authorAvatar}>
                  <Image
                    src={author.avatar}
                    alt={`${author.name} - Interior Design Expert`}
                    className={styles.authorImage}
                    itemProp="image"
                    loading="eager"
                    width="1080"
                    height="1080"
                  />
                </div>*/}
                <div className={styles.authorDetails}>
                  {/*<div className={styles.authorName} itemProp="name">
                    {author.name}
                  </div>*/}
                  <time
                    className={styles.publishDate}
                    dateTime={publishDate}
                    itemProp="datePublished"
                  >
                    {new Date(publishDate).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>
                </div>
              </div>
              <div className={styles.metaInfo}>
                {/*<div className={styles.readTime} itemProp="timeRequired">
                  {readTime}
                </div>*/}
                <div className={styles.tagsWrapper}>
                  {tags.map((tag, index) => (
                    <span
                      key={index}
                      className={styles.tag}
                      itemProp="keywords"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Related Posts */}
            {relatedPosts.length > 0 && (
              <section
                className={styles.relatedSection}
                aria-labelledby="related-posts-heading"
              >
                <h3 id="related-posts-heading" className={styles.relatedTitle}>
                  You Might Also Like
                </h3>
                <div className={styles.relatedGrid}>
                  {relatedPosts.map((post, index) => (
                    <article key={index} className={styles.relatedCard}>
                      <div className={styles.relatedCardContent}>
                        <div
                          className={`${styles.relatedCardImage} ${
                            styles[`relatedCardImage${index + 1}`]
                          }`}
                          role="img"
                          aria-label={`Featured image for ${post.title}`}
                        />
                        <h4 className={styles.relatedCardTitle}>
                          {post.title}
                        </h4>
                        <p className={styles.relatedCardDescription}>
                          {post.description}
                        </p>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            )}

            {/* Navigation */}
            <nav className={styles.navigation} aria-label="Post navigation">
              <button
                className={styles.navButton}
                aria-label="Go back to all posts"
              >
                ← Back to All Posts
              </button>
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className={styles.navButton}
                aria-label="Scroll to top of page"
              >
                Back to Top ↑
              </button>
            </nav>
          </div>
        </div>

        {/* Hidden metadata for SEO */}
        <meta itemProp="dateModified" content={modifiedDate} />
        <meta itemProp="author" content={author.name} />
        <meta itemProp="publisher" content={siteName} />
        <meta itemProp="mainEntityOfPage" content={canonicalUrl} />
      </article>
    </>
  );
};

export default BlogPost;
