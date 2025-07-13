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

  const title =
    "7 Luxury Small Bathroom Decor Ideas That Will Transform Your Space";
  const description =
    "Discover stunning small bathroom decor ideas that maximize space while creating a luxurious spa-like retreat. From marble accents to clever storage solutions, transform your compact bathroom into a Pinterest-worthy sanctuary.";
  const author = {
    name: "Nina",
    bio: "Interior design enthusiast specializing in small space transformations and luxury home decor",
    avatar: "/nina.jpg",
    social: {
      twitter: "@Nina__vibes",
      instagram: "@nina____vibes",
    },
  };
  const publishDate = "2025-07-11";
  const modifiedDate = "2025-07-11";
  const category = "Bathroom Decor";
  const readTime = "8 min read";
  const tags = [
    "small-bathroom",
    "luxury-decor",
    "space-saving",
    "bathroom-design",
    "home-decor",
  ];
  const featuredImage = "/nina.jpg";
  const canonicalUrl =
    "https://ninahealthy.com/luxury-small-bathroom-decor-ideas";
  const siteUrl = "https://ninahealthy.com";
  const siteName = "Interior Design & Home Decor by Nina";

  const blogContent = [
    {
      type: "paragraph",
      content:
        "Small bathrooms don't have to feel cramped or compromise on style. With the right design choices, your compact bathroom can become a luxurious retreat that rivals any spa. Whether you're working with a powder room or a full bath with limited square footage, these seven transformative ideas will help you maximize every inch while creating a space that feels both spacious and indulgent.",
      imagePrompt:
        "A stunning small luxury bathroom with marble countertops, gold fixtures, and elegant lighting, photographed from a wide angle showing clever use of space, soft natural lighting, Pinterest-style photography, high-end interior design",
    },
    {
      type: "heading",
      content: "1. Embrace the Power of Marble and Natural Stone",
    },
    {
      type: "paragraph",
      content:
        "Nothing says luxury quite like the timeless elegance of marble. In small bathrooms, marble can actually make the space feel larger through its reflective properties and continuous veining patterns. Consider a marble vanity top paired with a matching backsplash, or go bold with a marble accent wall behind your toilet. Carrara marble offers classic white and gray veining, while Calacatta marble provides more dramatic, statement-making patterns perfect for Pinterest-worthy shots.",
      imagePrompt:
        "Close-up of luxurious Carrara marble bathroom vanity with gold hardware, featuring beautiful natural veining, soft ambient lighting, and elegant toiletries arranged aesthetically, high-end photography style",
    },
    {
      type: "heading",
      content: "2. Install Floating Vanities for Visual Space",
    },
    {
      type: "paragraph",
      content:
        "Floating vanities are a game-changer for small bathrooms. By lifting the vanity off the floor, you create the illusion of more space while maintaining storage functionality. Choose a vanity with clean lines in warm wood tones like walnut or white oak, or opt for a sleek lacquered finish in navy or charcoal for a more contemporary look. The exposed floor space underneath makes the room feel more open and airy.",
      imagePrompt:
        "Modern floating bathroom vanity in warm walnut wood with undermount sink, wall-mounted faucet, and stylish pendant lighting, showing the open floor space underneath, minimalist design, professional interior photography",
    },
    {
      type: "heading",
      content: "3. Create Drama with Statement Lighting",
    },
    {
      type: "paragraph",
      content:
        "Lighting can make or break a small bathroom's ambiance. Replace standard vanity lighting with statement pieces that serve as both functional illumination and artistic focal points. Consider a pair of brass sconces with sculptural designs, or install a small chandelier for unexpected glamour. Pendant lights on either side of the mirror create a hotel-like luxury feel while freeing up wall space that traditional sconces would occupy.",
      imagePrompt:
        "Elegant brass pendant lights flanking a bathroom mirror, casting warm light on marble surfaces, creating dramatic shadows and highlighting luxury fixtures, moody lighting photography, high-end bathroom design",
    },
    {
      type: "heading",
      content: "4. Maximize Storage with Built-In Niches",
    },
    {
      type: "paragraph",
      content:
        "Built-in storage niches are both practical and beautiful, eliminating the need for bulky storage furniture. Install recessed shelves in your shower area lined with the same tile as your walls for a seamless look. Create a medicine cabinet that's flush with the wall, or add floating shelves in unused corners. These built-ins keep essentials organized while maintaining clean lines that make the space feel uncluttered and sophisticated.",
      imagePrompt:
        "Luxurious shower with built-in marble niches displaying high-end bath products, seamless tile work, and elegant storage solutions, spa-like atmosphere, clean architectural lines, professional bathroom photography",
    },
    {
      type: "heading",
      content: "5. Add Warmth with Textured Elements",
    },
    {
      type: "paragraph",
      content:
        "Introduce visual interest and warmth through carefully selected textures. A jute or bamboo bath mat brings natural elements into the space, while a vintage-inspired Persian runner adds color and pattern. Consider textured wallpaper on an accent wall, or install wood-look tile for warmth without the maintenance concerns of real wood. These elements prevent the space from feeling sterile while adding layers of visual interest.",
      imagePrompt:
        "Small bathroom featuring textured elements: woven jute bath mat, vintage-style runner, wood-look tile flooring, and natural fiber window treatment, warm and inviting atmosphere, cozy luxury design, Pinterest-worthy styling",
    },
    {
      type: "heading",
      content: "6. Incorporate Greenery for Life and Color",
    },
    {
      type: "paragraph",
      content:
        "Plants breathe life into small bathrooms and improve air quality naturally. Choose humidity-loving plants like pothos, snake plants, or small ferns that thrive in bathroom conditions. Display them in stylish planters that complement your decor – think ceramic vessels in coordinating colors or hanging macramé planters for vertical interest. Even a single statement plant can transform the entire feel of your bathroom.",
      imagePrompt:
        "Lush bathroom plants in elegant ceramic planters, featuring snake plants and pothos thriving in bathroom humidity, natural light streaming through frosted window, organic and spa-like atmosphere, Instagram-worthy plant styling",
    },
    {
      type: "heading",
      content: "7. Choose a Cohesive Color Palette",
    },
    {
      type: "paragraph",
      content:
        "A well-planned color palette can make your small bathroom feel both cohesive and spacious. Stick to three main colors maximum – consider classic combinations like white, gray, and brass for timeless elegance, or navy, white, and natural wood for a more contemporary feel. Use the 60-30-10 rule: 60% neutral base, 30% secondary color, and 10% accent color through accessories and artwork.",
      imagePrompt:
        "Cohesive small bathroom color palette featuring soft white walls, gray marble accents, and brass fixtures, with coordinated towels and accessories, sophisticated and harmonious design, luxury interior photography",
    },
    {
      type: "heading",
      content: "Pro Tips for Small Bathroom Success",
    },
    {
      type: "list",
      content: [
        "Use large-format tiles to minimize grout lines and create a more seamless look",
        "Install a large mirror to reflect light and visually double the space",
        "Choose one standout feature (like a statement vanity or bold wallpaper) and keep other elements simple",
        "Consider a corner sink to maximize floor space in powder rooms",
        "Use vertical space with tall, narrow storage solutions",
        "Keep countertops clutter-free with hidden storage and matching containers",
      ],
    },
    {
      type: "paragraph",
      content:
        "Remember, luxury in small bathrooms isn't about having more space – it's about making thoughtful choices that maximize both function and beauty. By incorporating these seven ideas, you'll create a bathroom that feels like a high-end spa retreat, regardless of its size. The key is to focus on quality over quantity, choosing fewer, better pieces that serve multiple purposes and contribute to an overall sense of calm and sophistication.",
      imagePrompt:
        "Before and after transformation of a small bathroom showing the dramatic impact of luxury design choices, split-screen composition, professional renovation photography, inspiring transformation results",
    },
  ];

  const relatedPosts = [
    {
      title: "Small Bathroom Storage Solutions That Actually Work",
      description:
        "Clever storage ideas that maximize every inch of your compact bathroom while maintaining style",
      slug: "small-bathroom-storage-solutions",
      image: "/nina.jpg",
    },
    {
      title: "Luxury Bathroom Lighting Ideas on Any Budget",
      description:
        "Create spa-like ambiance with these stunning lighting solutions for every price point",
      slug: "luxury-bathroom-lighting-ideas",
      image: "/nina.jpg",
    },
    {
      title: "The Complete Guide to Bathroom Color Schemes",
      description:
        "Discover timeless and trendy color combinations that make bathrooms feel larger and more luxurious",
      slug: "bathroom-color-schemes-guide",
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
          <div key={index}>
            <p className={styles.contentParagraph}>{section.content}</p>
            {section.imagePrompt && (
              <div className={styles.imagePromptBox}>
                <h4 className={styles.imagePromptTitle}>
                  📸 AI Image Prompt for Pinterest:
                </h4>
                <p className={styles.imagePromptText}>{section.imagePrompt}</p>
              </div>
            )}
          </div>
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
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={featuredImage} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content={siteName} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={featuredImage} />
        <meta name="twitter:creator" content={author.social.twitter} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </Head>

      <article
        className={styles.container}
        itemScope
        itemType="https://schema.org/BlogPosting"
      >
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

        <header className={styles.heroSection}>
          <div
            className={`${styles.heroContent} ${isLoaded ? styles.loaded : ""}`}
          >
            <h1 className={styles.mainTitle} itemProp="headline">
              <span className={styles.titleGradient}>{title}</span>
            </h1>
          </div>
        </header>

        <div id="content" className={styles.contentSection}>
          <div className={styles.contentContainer}>
            <main className={styles.article} itemProp="articleBody">
              {blogContent.map((section, index) =>
                renderContent(section, index)
              )}
            </main>

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

            {relatedPosts.length > 0 && (
              <section
                className={styles.relatedSection}
                aria-labelledby="related-posts-heading"
              >
                <h3 id="related-posts-heading" className={styles.relatedTitle}>
                  You Might Also Love
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
