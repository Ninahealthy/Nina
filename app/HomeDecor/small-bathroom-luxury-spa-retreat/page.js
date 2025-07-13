"use client";
import React, { useState, useEffect } from "react";
import Head from "next/head";
import styles from "./page.module.css";
import Image from "next/image";

const SmallBathroomPost = () => {
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
    "Don't let square footage limit your style. Discover how to create a stunning, functional bathroom that feels twice its size with these expert design tips.";
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
    "mirror-magic",
    "bathroom-design",
  ];
  const featuredImage = "/small-bathroom-hero.jpg";
  const canonicalUrl =
    "https://ninahealthy.com/small-bathroom-luxury-spa-retreat";
  const siteUrl = "https://ninahealthy.com";
  const siteName = "Interior Design & Home Decor by Nina";

  const blogContent = [
    {
      type: "paragraph",
      content:
        "Working with a small bathroom doesn't mean sacrificing style or functionality. In fact, some of the most memorable and luxurious bathroom designs emerge from compact spaces where every inch serves a purpose. Whether you're dealing with a powder room, a studio apartment bathroom, or simply want to maximize your existing space, these carefully curated ideas will help you create a retreat that's both beautiful and brilliantly designed.",
    },
    {
      type: "heading",
      content: "The Art of Illusion: Making Small Spaces Feel Expansive",
    },
    {
      type: "paragraph",
      content:
        "The secret to a successful small bathroom lies in creating the illusion of space while maintaining luxury and comfort. Strategic design choices can transform even the most cramped quarters into an airy, sophisticated sanctuary.",
    },
    {
      type: "subheading",
      content: "Mirror Magic: Reflecting Light and Space",
    },
    {
      type: "paragraph",
      content:
        "Large mirrors are your best friend in a small bathroom. A floor-to-ceiling mirror or an oversized round mirror above the vanity instantly doubles the visual space. Consider mirrors with slim black frames for a modern edge, or ornate vintage frames for classic elegance. The key is choosing mirrors that reflect natural light sources, creating a bright, open feeling that makes the room feel significantly larger.",
    },
    {
      type: "subheading",
      content: "Light Color Palettes: The Foundation of Spaciousness",
    },
    {
      type: "paragraph",
      content:
        "Soft, neutral tones create an immediate sense of openness. Think creamy whites, warm grays, and gentle beiges as your base palette. These colors reflect light beautifully and provide a timeless backdrop for your design elements. Add depth with subtle variations in tone rather than contrasting colors, which can make a space feel choppy and smaller.",
    },
    {
      type: "heading",
      content: "Luxury Textures That Transform",
    },
    {
      type: "paragraph",
      content:
        "Small doesn't mean simple. Incorporating rich textures adds sophistication and visual interest without overwhelming the space.",
    },
    {
      type: "subheading",
      content: "Natural Stone: Bringing the Spa Home",
    },
    {
      type: "paragraph",
      content:
        "Carrara marble, travertine, or honed granite can elevate your small bathroom to hotel-suite status. Use these materials strategically on a feature wall, as a vanity top, or in a shower niche. The natural veining and subtle color variations in stone create movement and depth that makes walls appear to recede.",
    },
    {
      type: "subheading",
      content: "Warm Wood Accents: Adding Organic Warmth",
    },
    {
      type: "paragraph",
      content:
        "Introduce warmth through carefully selected wood elements. A floating vanity in rich walnut, open shelving in honey oak, or a teak shower bench creates a spa-like atmosphere. Wood tones add personality and prevent an all-white bathroom from feeling sterile.",
    },
    {
      type: "heading",
      content: "Smart Storage Solutions That Inspire",
    },
    {
      type: "paragraph",
      content:
        "Effective storage in a small bathroom should be both functional and beautiful. The best solutions serve double duty as decorative elements.",
    },
    {
      type: "subheading",
      content: "Vertical Thinking: Maximizing Wall Space",
    },
    {
      type: "paragraph",
      content:
        "Install floor-to-ceiling cabinets with sleek, handleless fronts to create uninterrupted lines. Use the space above the toilet for attractive floating shelves that display rolled towels, small plants, or decorative objects. Consider recessed shelving in the shower area to keep essentials organized without protruding into the space.",
    },
    {
      type: "list",
      content: [
        "Install tall, narrow cabinets that reach the ceiling for maximum storage impact",
        "Use over-the-toilet shelving units in brass or matte black finishes for cohesion",
        "Add coordinating hooks and towel bars in matching metals throughout the space",
        "Consider a stylish ladder shelf for towels that doubles as decorative art",
      ],
    },
    {
      type: "subheading",
      content: "Multi-Functional Furniture: Beauty Meets Purpose",
    },
    {
      type: "paragraph",
      content:
        "Choose pieces that work harder. An upholstered ottoman with hidden storage provides seating and organization. A vintage ladder can hold towels while adding rustic charm. A narrow console table beneath the window can hold plants and toiletries while creating a styling vignette.",
    },
    {
      type: "heading",
      content: "Statement Pieces That Steal the Show",
    },
    {
      type: "paragraph",
      content:
        "Every small bathroom needs one element that commands attention and establishes the design personality.",
    },
    {
      type: "subheading",
      content: "Bold Wallpaper: Creating Drama",
    },
    {
      type: "paragraph",
      content:
        "Don't shy away from pattern in a small space. A feature wall with bold botanical prints, geometric designs, or subtle metallic accents can create depth and interest. Choose wallpaper with a light background to maintain the sense of space while adding personality.",
    },
    {
      type: "subheading",
      content: "Unique Lighting: Sculptural Beauty",
    },
    {
      type: "paragraph",
      content:
        "Replace builder-grade fixtures with statement pieces. A crystal chandelier in a powder room, sleek wall sconces flanking the mirror, or a pendant light over a freestanding tub creates ambiance and serves as functional art. Choose fixtures with metallic finishes like brushed brass or matte black for contemporary appeal.",
    },
    {
      type: "heading",
      content: "Color Schemes That Captivate",
    },
    {
      type: "paragraph",
      content:
        "The right color palette can make or break a small bathroom design. These combinations have proven particularly effective for creating spaces that feel both intimate and expansive.",
    },
    {
      type: "subheading",
      content: "Monochromatic Elegance",
    },
    {
      type: "paragraph",
      content:
        "Working within a single color family creates sophisticated harmony. Layer different shades of gray, from dove to charcoal, or explore various tones of blue, from powder to navy. This approach creates depth without visual fragmentation.",
    },
    {
      type: "subheading",
      content: "Warm Neutrals with Metallic Accents",
    },
    {
      type: "paragraph",
      content:
        "Combine cream, taupe, and soft brown tones with warm brass or copper accents. This palette feels both modern and timeless, creating a cozy retreat that never goes out of style.",
    },
    {
      type: "heading",
      content: "Small Bathroom Decor That Makes a Big Impact",
    },
    {
      type: "paragraph",
      content:
        "The right accessories can transform a functional space into a designed retreat.",
    },
    {
      type: "subheading",
      content: "Curated Plant Collections",
    },
    {
      type: "paragraph",
      content:
        "Bring life to your bathroom with carefully selected plants. Snake plants thrive in low light, while eucalyptus adds spa-like fragrance. Group plants of varying heights on floating shelves or window sills for a lush, organic feel.",
    },
    {
      type: "subheading",
      content: "Textile Luxury",
    },
    {
      type: "paragraph",
      content:
        "Invest in high-quality textiles that feel indulgent. Turkish cotton towels, a plush bath mat, or a vintage runner can add softness and luxury to hard surfaces. Choose coordinating colors and textures for a cohesive look.",
    },
    {
      type: "heading",
      content: "Practical Tips for Implementation",
    },
    {
      type: "list",
      content: [
        "Start with one focal point - choose the element that will have the biggest impact first, whether it's a statement mirror, beautiful vanity, or stunning light fixture",
        "Maintain clear sight lines by keeping countertops and surfaces as clear as possible, using trays to corral necessities",
        "Layer your lighting with ambient, task, and accent lighting to create depth and functionality throughout the day",
        "Invest in quality pieces that serve both form and function - in small rooms, every detail matters more",
      ],
    },
    {
      type: "heading",
      content: "The Final Touch: Bringing It All Together",
    },
    {
      type: "paragraph",
      content:
        "Creating a beautiful small bathroom is about making intentional choices that serve both form and function. Each element should contribute to the overall sense of luxury and space. Remember that in a small room, every detail matters more, so invest in quality pieces that you'll love for years to come.",
    },
    {
      type: "paragraph",
      content:
        "The most successful small bathrooms feel curated rather than cramped, sophisticated rather than sparse. By focusing on light, texture, smart storage, and carefully chosen statement pieces, you can create a space that rivals any luxury hotel bathroom, regardless of size.",
    },
  ];

  const relatedPosts = [
    {
      title: "Maximizing Storage in Tiny Bathrooms: 15 Clever Solutions",
      description:
        "Transform your small bathroom with these ingenious storage hacks that don't sacrifice style for function.",
      slug: "tiny-bathroom-storage-solutions",
      image: "/bathroom-storage.jpg",
    },
    {
      title: "Spa-Inspired Color Palettes for Small Bathrooms",
      description:
        "Create a calming, luxurious atmosphere with these perfectly curated color schemes that make spaces feel larger.",
      slug: "spa-bathroom-color-palettes",
      image: "/spa-colors.jpg",
    },
    {
      title: "Budget-Friendly Bathroom Makeover Ideas Under $500",
      description:
        "Transform your bathroom without breaking the bank using these designer-approved tricks and DIY solutions.",
      slug: "budget-bathroom-makeover",
      image: "/budget-bathroom.jpg",
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
      case "subheading":
        return (
          <h3 key={index} className={styles.contentSubheading}>
            {section.content}
          </h3>
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
                <div className={styles.authorAvatar} data-fallback="N">
                  <Image
                    src={author.avatar}
                    alt={author.name}
                    className={styles.authorImage}
                    width={100}
                    height={100}
                    loading="lazy"
                  />
                </div>
                <div className={styles.authorDetails}>
                  <div className={styles.authorName} itemProp="name">
                    {author.name}
                  </div>
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
                <span className={styles.readTime}>{readTime}</span>
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
                            width={400}
                            height={250}
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

export default SmallBathroomPost;
