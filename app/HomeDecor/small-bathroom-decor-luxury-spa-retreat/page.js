"use client";
import React, { useState, useEffect } from "react";
import Head from "next/head";
import styles from "./page.module.css";
import Image from "next/image";

const BlogPost = () => {
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

  const title = "Transform Your Tiny Bathroom Into a Luxurious Spa Retreat";
  const description =
    "Discover stunning small bathroom decor ideas that maximize space while creating a luxurious, Pinterest-worthy sanctuary. From clever storage solutions to spa-inspired color palettes.";
  const author = {
    name: "Nina",
    bio: "Interior design enthusiast specializing in small space transformations and luxury bathroom design",
    avatar: "/nina.jpg",
    social: {
      twitter: "@Nina__vibes",
      instagram: "@nina____vibes",
    },
  };
  const publishDate = "2025-07-11";
  const modifiedDate = "2025-07-11";
  const category = "Bathroom Decor";
  const readTime = "7 min read";
  const tags = [
    "small-bathroom",
    "luxury-decor",
    "spa-inspired",
    "storage-solutions",
    "pinterest-worthy",
  ];
  const featuredImage = "/nina.jpg";
  const canonicalUrl =
    "https://ninahealthy.com/small-bathroom-decor-luxury-spa-retreat";
  const siteUrl = "https://ninahealthy.com";
  const siteName = "Interior Design & Home Decor by Nina";

  const blogContent = [
    {
      type: "paragraph",
      content:
        "Small bathrooms don't have to feel cramped or uninspiring. With the right design strategies, your compact space can become a luxurious retreat that rivals any high-end spa. Whether you're working with a powder room or a full bathroom, these Pinterest-worthy ideas will help you create a stunning sanctuary that maximizes every square inch.",
    },
    {
      type: "heading",
      content: "The Power of Light Colors & Reflective Surfaces",
    },
    {
      type: "paragraph",
      content:
        "Light, airy color palettes are your secret weapon for making small bathrooms feel expansive. Think soft whites, warm creams, and gentle sage greens that reflect natural light and create an illusion of space. Pair these with glossy subway tiles or marble-look porcelain for surfaces that bounce light around the room beautifully.",
    },
    {
      type: "paragraph",
      content:
        "Strategic mirror placement can double your visual space instantly. Consider a large frameless mirror above the vanity, or create drama with a collection of vintage-inspired mirrors in varying sizes. Mirrored medicine cabinets serve dual purposes – storage and reflection – making them perfect for tiny spaces.",
    },
    {
      type: "heading",
      content: "Vertical Storage Solutions That Wow",
    },
    {
      type: "paragraph",
      content:
        "When floor space is limited, think vertically. Floating shelves in rich walnut or sleek white lacquer create storage without overwhelming the space. Style them with rolled towels in spa-worthy colors, small plants like pothos or snake plants, and beautiful apothecary jars filled with bath salts.",
    },
    {
      type: "list",
      content: [
        "Install a tall, narrow cabinet that reaches the ceiling for maximum storage",
        "Use over-the-toilet shelving units in brass or matte black finishes",
        "Add hooks and towel bars in coordinating metals for a cohesive look",
        "Consider a ladder shelf for a trendy, space-saving solution",
      ],
    },
    {
      type: "heading",
      content: "Luxury Textures on a Budget",
    },
    {
      type: "paragraph",
      content:
        "Transform your small bathroom into a luxury retreat with carefully chosen textures. A plush bath mat in soft gray or cream immediately elevates the space. Layer in waffle-weave towels, a bamboo shower caddy, and perhaps a small wooden stool for both function and warmth.",
    },
    {
      type: "paragraph",
      content:
        "Don't overlook the power of textured wallpaper or wall treatments. Grasscloth wallpaper, shiplap accents, or even peel-and-stick tiles can add incredible visual interest without major renovation costs. These elements create the sophisticated backdrop that makes your bathroom feel intentionally designed.",
    },
    {
      type: "heading",
      content: "Statement Pieces That Steal the Show",
    },
    {
      type: "paragraph",
      content:
        "Every Pinterest-worthy bathroom needs a focal point. In small spaces, this might be a stunning pendant light above the vanity, a vintage-inspired faucet in brushed gold, or a beautiful vessel sink that doubles as art. Choose one statement piece and let it shine – this prevents the space from feeling cluttered while adding serious style points.",
    },
    {
      type: "paragraph",
      content:
        "Consider unexpected elements like a small chandelier, a bold wallpaper accent wall, or even a piece of framed artwork. These personal touches transform a utilitarian space into something truly special that reflects your unique style.",
    },
    {
      type: "heading",
      content: "The Magic of Greenery",
    },
    {
      type: "paragraph",
      content:
        "Plants breathe life into small bathrooms and improve air quality naturally. Choose humidity-loving varieties like Boston ferns, ZZ plants, or eucalyptus. A small fiddle leaf fig in a beautiful ceramic planter can serve as living art, while trailing plants like pothos create beautiful cascading effects from high shelves.",
    },
    {
      type: "paragraph",
      content:
        "If natural light is limited, consider high-quality artificial plants that look incredibly realistic. The key is choosing plants that complement your color scheme and add that fresh, spa-like feeling that makes your bathroom feel like a retreat.",
    },
    {
      type: "heading",
      content: "Final Touches That Make All the Difference",
    },
    {
      type: "paragraph",
      content:
        "The details matter in small spaces. Upgrade your hardware to coordinating finishes – whether that's warm brass, matte black, or polished chrome. Add a small tray with beautiful hand soap and lotion bottles. Include a candle or reed diffuser for a spa-like scent that welcomes you every time you enter.",
    },
    {
      type: "paragraph",
      content:
        "Remember, creating a luxurious small bathroom is about thoughtful curation rather than filling every inch. Choose quality over quantity, maintain clean lines, and let each element serve both form and function. With these strategies, your small bathroom will become a stunning sanctuary that you'll love showing off on Pinterest.",
    },
  ];

  const relatedPosts = [
    {
      title: "Small Bathroom Storage Hacks That Actually Work",
      description:
        "Clever solutions for maximizing storage in the tiniest bathrooms without sacrificing style",
      slug: "small-bathroom-storage-hacks",
      image: "/nina.jpg",
    },
    {
      title: "Spa-Inspired Color Palettes for Any Bathroom",
      description:
        "Create a calming, luxurious atmosphere with these perfectly curated color schemes",
      slug: "spa-inspired-bathroom-colors",
      image: "/nina.jpg",
    },
    {
      title: "Budget-Friendly Bathroom Upgrades Under $100",
      description:
        "Transform your bathroom without breaking the bank using these designer-approved tricks",
      slug: "budget-bathroom-upgrades",
      image: "/nina.jpg",
    },
  ];

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
      ],
    },
    publisher: {
      "@type": "Organization",
      name: siteName,
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/nina.jpg`,
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
    wordCount: blogContent.reduce((count, section) => {
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

        {/* Pinterest-specific meta tags */}
        <meta name="pinterest-rich-pin" content="true" />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={featuredImage} />
        <meta property="og:url" content={canonicalUrl} />
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
              {blogContent.map((section, index) =>
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
                <div className={styles.authorDetails}>
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
                        <div className={styles.relatedCardImageWrapper}>
                          <Image
                            src={post.image}
                            alt={post.title}
                            className={styles.relatedCardImage}
                            width={1080}
                            height={1080}
                            loading="lazy"
                          />
                        </div>
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
