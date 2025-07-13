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

  const title = "Maximizing Storage in Tiny Bathrooms: 15 Clever Solutions";
  const subtitle =
    "Transform your small bathroom with these ingenious storage hacks that don't sacrifice style for function";
  const description =
    "Discover 15 brilliant small bathroom storage solutions that maximize every square inch while creating a Pinterest-worthy space. From floating vanities to hidden hampers, these clever ideas will transform your tiny bathroom into an organized sanctuary.";
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
  const category = "Bathroom Storage";
  const readTime = "8 min read";
  const tags = [
    "small-bathroom",
    "storage-solutions",
    "bathroom-organization",
    "space-saving",
    "interior-design",
  ];
  const featuredImage = "/Luxurious-small-bathroom.jpg";
  const canonicalUrl =
    "https://ninahealthy.com/small-bathroom-storage-solutions";
  const siteUrl = "https://ninahealthy.com";
  const siteName = "Interior Design & Home Decor by Nina";

  const blogContent = [
    {
      type: "paragraph",
      content:
        "Small bathrooms don't have to mean sacrificing storage or style. With the right approach, your compact space can become a perfectly organized sanctuary that rivals any luxury spa. These 15 clever solutions will help you maximize every square inch while creating a bathroom that's both functional and Instagram-worthy.",
    },
    {
      type: "image",
      src: "/Luxurious-small-bathroom.png",
      alt: "A stunning before-and-after transformation of a tiny bathroom showcasing clever storage solutions",
      caption: "Transform your small bathroom with clever storage solutions",
    },
    {
      type: "heading",
      content: "1. Floating Vanity Magic",
    },
    {
      type: "paragraph",
      content:
        "Transform your floor space by installing a sleek floating vanity. Choose rich walnut wood or crisp white lacquer for a modern touch that makes your bathroom feel twice as large. The open space underneath creates an airy feel while providing hidden storage opportunities.",
    },
    {
      type: "callout",
      content:
        "Pro Tip: Add LED strip lighting underneath for a luxury hotel ambiance.",
    },
    {
      type: "image",
      src: "/floating-vanity-walnut.png",
      alt: "Elegant floating vanity in warm wood tones with soft under-lighting",
      caption:
        "Floating vanity with LED strip lighting creates luxury hotel vibes",
    },
    {
      type: "heading",
      content: "2. Vertical Cabinet Towers",
    },
    {
      type: "paragraph",
      content:
        "Think upward with floor-to-ceiling slim cabinets that fit perfectly in tight corners. Opt for fluted wood panels or cane webbing fronts in sage green or warm terracotta to add texture and visual interest.",
    },
    {
      type: "callout",
      content:
        "Style Note: These vertical towers can hold everything from towels to cleaning supplies while acting as stunning design elements.",
    },
    {
      type: "image",
      src: "/vertical-cabinet-fluted.png",
      alt: "Tall, narrow cabinet with fluted wood finish next to a modern toilet",
      caption: "Vertical storage towers maximize height in small spaces",
    },
    {
      type: "heading",
      content: "3. Over-Toilet Storage Reimagined",
    },
    {
      type: "paragraph",
      content:
        "Ditch the basic over-toilet cabinet for a custom-built shelving system. Create a spa-like display with natural wood shelves, brass brackets, and carefully curated storage baskets in woven rattan or soft linen.",
    },
    {
      type: "callout",
      content:
        "Design Detail: Mix open shelving with closed storage for a balanced, uncluttered look that feels intentional.",
    },
    {
      type: "image",
      src: "/over-toilet-shelving-brass.png",
      alt: "Sophisticated over-toilet shelving with brass accents and woven baskets",
      caption:
        "Elevated over-toilet storage with brass brackets and natural textures",
    },
    {
      type: "heading",
      content: "4. Mirror Cabinet Masterpiece",
    },
    {
      type: "paragraph",
      content:
        "Replace your standard mirror with a large medicine cabinet featuring mirrored doors. Choose models with LED lighting and multiple compartments to maximize storage while maintaining the illusion of space.",
    },
    {
      type: "callout",
      content:
        "Luxury Touch: Opt for mirrors with subtle bronze or black frames for added sophistication.",
    },
    {
      type: "image",
      src: "/mirror-cabinet-led.png",
      alt: "Large mirrored medicine cabinet with integrated LED lighting",
      caption: "LED-lit mirror cabinets combine storage with perfect lighting",
    },
    {
      type: "heading",
      content: "5. Niche Perfection",
    },
    {
      type: "paragraph",
      content:
        "Create built-in shower niches with beautiful tile work. Use contrasting materials like marble hexagons against subway tile, or rich forest green ceramics for a bold statement that's both functional and artistic.",
    },
    {
      type: "callout",
      content:
        "Pinterest Favorite: Brass or matte black fixtures against colorful tile create stunning visual contrast.",
    },
    {
      type: "image",
      src: "/shower-niche-marble-hex.png",
      alt: "Elegant shower niche with contrasting tile work and brass fixtures",
      caption: "Contrasting tile work makes shower niches a design feature",
    },
    {
      type: "heading",
      content: "6. Pedestal Sink Skirt Solutions",
    },
    {
      type: "paragraph",
      content:
        "Transform a pedestal sink with a tailored fabric skirt in rich velvet or crisp linen. This classic solution hides storage bins while adding softness and color to your space.",
    },
    {
      type: "callout",
      content:
        "Color Inspiration: Deep jewel tones like emerald or sapphire blue create a luxurious feel.",
    },
    {
      type: "image",
      src: "/pedestal-sink-blue-velvet.png",
      alt: "Pedestal sink with elegant fabric skirt in rich blue velvet",
      caption: "Fabric skirts add luxury and hidden storage to pedestal sinks",
    },
    {
      type: "heading",
      content: "7. Ladder Shelf Elegance",
    },
    {
      type: "paragraph",
      content:
        "Lean a wooden ladder shelf against the wall for instant storage with bohemian flair. Choose teak or oak with live edges for an organic feel that works beautifully with plants and woven textures.",
    },
    {
      type: "callout",
      content:
        "Styling Secret: Drape fluffy towels and add small potted plants for that spa-like atmosphere.",
    },
    {
      type: "image",
      src: "/ladder-shelf-teak-plants.png",
      alt: "Rustic wooden ladder shelf with folded towels and trailing plants",
      caption: "Ladder shelves bring natural textures and vertical storage",
    },
    {
      type: "heading",
      content: "8. Towel Bar Innovation",
    },
    {
      type: "paragraph",
      content:
        "Install multiple towel bars at different heights to create a sculptural wall element. Choose matte black or warm brass finishes that complement your fixture palette.",
    },
    {
      type: "callout",
      content:
        "Space-Saving Tip: Use every towel bar for different purposes - one for towels, another for robes, and a third for washcloths.",
    },
    {
      type: "image",
      src: "/multiple-towel-bars-brass.png",
      alt: "Multiple towel bars arranged artistically on a wall with luxurious towels",
      caption: "Multiple towel bars create sculptural storage solutions",
    },
    {
      type: "heading",
      content: "9. Ceiling-Mounted Storage",
    },
    {
      type: "paragraph",
      content:
        "Utilize ceiling space with hanging baskets or a ceiling-mounted drying rack. Choose materials like natural jute or powder-coated steel in soft pastels for a modern farmhouse feel.",
    },
    {
      type: "callout",
      content:
        "Design Impact: This unexpected storage solution draws the eye upward, making ceilings appear higher.",
    },
    {
      type: "image",
      src: "/ceiling-baskets-jute.png",
      alt: "Ceiling-mounted basket storage with rope details and soft lighting",
      caption: "Ceiling storage draws the eye up and maximizes vertical space",
    },
    {
      type: "heading",
      content: "10. Magnetic Strip Magic",
    },
    {
      type: "paragraph",
      content:
        "Install hidden magnetic strips inside cabinet doors for small metal items like tweezers, scissors, and nail clippers. This invisible storage solution keeps tiny essentials organized and accessible.",
    },
    {
      type: "callout",
      content:
        "Organization Hack: Use small magnetic containers for bobby pins and hair ties.",
    },
    {
      type: "image",
      src: "/magnetic-strip-cabinet.png",
      alt: "Inside of cabinet door showing magnetic strips with organized small items",
      caption: "Hidden magnetic strips keep small items perfectly organized",
    },
    {
      type: "heading",
      content: "11. Toe-Kick Drawer Transformation",
    },
    {
      type: "paragraph",
      content:
        "Convert the toe-kick space under your vanity into a pull-out drawer for flat items like bath mats, cleaning cloths, or backup toiletries. This hidden storage is pure genius for maximizing every inch.",
    },
    {
      type: "callout",
      content:
        "Professional Touch: Choose soft-close drawer slides for a luxury feel.",
    },
    {
      type: "image",
      src: "/toe-kick-drawer-pullout.png",
      alt: "Toe-kick drawer pulled out showing organized flat items",
      caption: "Toe-kick drawers utilize every inch of available space",
    },

    {
      type: "heading",
      content: "13. Shower Caddy Elegance",
    },
    {
      type: "paragraph",
      content:
        "Upgrade basic shower storage with a sleek, adjustable caddy in brushed gold or matte black. Choose models with multiple tiers and hooks for maximum organization without drilling holes.",
    },
    {
      type: "callout",
      content:
        "Style Upgrade: Coordinate with your other bathroom fixtures for a cohesive look.",
    },
    {
      type: "image",
      src: "/shower-caddy-gold.png",
      alt: "Elegant shower caddy with multiple tiers in brushed gold finish",
      caption: "Elevated shower caddies match your bathroom's luxury aesthetic",
    },
    {
      type: "heading",
      content: "14. Rolling Cart Versatility",
    },
    {
      type: "paragraph",
      content:
        "Add a slim rolling cart that can move between your vanity and storage closet. Choose powder-coated steel in soft colors like sage or blush, or go bold with deep navy for a modern edge.",
    },
    {
      type: "callout",
      content:
        "Functional Beauty: Use the top tier for daily essentials and lower levels for backup supplies.",
    },
    {
      type: "image",
      src: "/rolling-cart-sage.png",
      alt: "Stylish rolling cart with multiple levels in soft sage green",
      caption:
        "Rolling carts provide flexible storage that moves with your needs",
    },
    {
      type: "heading",
      content: "15. Hidden Hamper Solutions",
    },
    {
      type: "paragraph",
      content:
        "Integrate a pull-out hamper into your vanity design or use a stylish woven basket with a lid. Choose materials like water hyacinth or bamboo that complement your bathroom's natural elements.",
    },
    {
      type: "callout",
      content:
        "Seamless Integration: Built-in hampers maintain clean lines while hiding laundry.",
    },
    {
      type: "image",
      src: "/built-in-hamper-bamboo.png",
      alt: "Built-in pull-out hamper with woven basket liner",
      caption: "Built-in hampers keep laundry hidden while maintaining style",
    },
    {
      type: "heading",
      content: "Your Small Bathroom, Transformed",
    },
    {
      type: "paragraph",
      content:
        "The key to maximizing storage in tiny bathrooms lies in thinking creatively about every surface and space. By combining these clever solutions with thoughtful design choices, you can create a bathroom that feels spacious, organized, and utterly luxurious.",
    },
    {
      type: "paragraph",
      content:
        "Remember, the best storage solutions are the ones that blend seamlessly with your design aesthetic. Choose materials, colors, and textures that speak to your personal style while serving multiple functions.",
    },
    {
      type: "paragraph",
      content:
        "Ready to transform your space? Start with one or two solutions that resonate with your style, then gradually build your perfect storage system. Your tiny bathroom is about to become your favorite room in the house.",
    },
  ];

  const relatedPosts = [
    {
      title: "Small Bathroom Storage Hacks That Actually Work",
      description:
        "Clever solutions for maximizing storage in the tiniest bathrooms without sacrificing style",
      slug: "small-bathroom-storage-hacks",
      image: "/bathroom-storage-hacks.jpg",
    },
    {
      title: "Spa-Inspired Color Palettes for Any Bathroom",
      description:
        "Create a calming, luxurious atmosphere with these perfectly curated color schemes",
      slug: "spa-inspired-bathroom-colors",
      image: "/spa-bathroom-colors.jpg",
    },
    {
      title: "Budget-Friendly Bathroom Upgrades Under $100",
      description:
        "Transform your bathroom without breaking the bank using these designer-approved tricks",
      slug: "budget-bathroom-upgrades",
      image: "/budget-bathroom-upgrades.jpg",
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
      case "callout":
        return (
          <div key={index} className={styles.calloutBox}>
            <span className={styles.calloutIcon}>💡</span>
            <p className={styles.calloutText}>{section.content}</p>
          </div>
        );
      case "image":
        return (
          <div key={index} className={styles.imageContainer}>
            <Image
              src={section.src}
              alt={section.alt}
              width={1408}
              height={768}
              className={styles.contentImage}
              loading="lazy"
            />
            {section.caption && (
              <p className={styles.imageCaption}>{section.caption}</p>
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
            {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
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
                  <h3 className={styles.authorName} itemProp="name">
                    {author.name}
                  </h3>
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
                            height={300}
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

            {/* Call to Action */}
            <div className={styles.ctaSection}>
              <h3 className={styles.ctaTitle}>
                Ready to Transform Your Space?
              </h3>
              <p className={styles.ctaText}>
                What's your favorite small bathroom storage hack? Share your
                transformation photos and tag us to inspire other small-space
                enthusiasts!
              </p>
              <p className={styles.ctaSubtext}>
                Save this post for your next bathroom refresh and follow for
                more space-maximizing inspiration!
              </p>
            </div>

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
