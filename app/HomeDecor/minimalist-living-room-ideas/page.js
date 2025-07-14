"use client";
import React, { useState, useEffect } from "react";
import Head from "next/head";
import styles from "./page.module.css";
import Image from "next/image";

const BlogPost = () => {
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);
  const [particles, setParticles] = useState([]);
  const [activeTab, setActiveTab] = useState("scandinavian");

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

  const toggleFaq = (index) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  const title =
    "5 Minimalist Living Room Ideas That Transform Your Space Into A Serene Sanctuary";
  const subtitle =
    "Discover timeless minimalist living room designs that create calm, spacious, and effortlessly elegant spaces";
  const description =
    "Transform your living room with these 5 stunning minimalist design ideas. From Scandinavian simplicity to Japanese zen aesthetics, discover how to create a clutter-free, peaceful sanctuary that maximizes space and style. Complete with furniture recommendations, color palettes, and expert design tips.";
  const author = {
    name: "Nina",
    bio: "Interior design enthusiast specializing in minimalist aesthetics and sustainable living spaces",
    avatar: "/nina.jpg",
    social: {
      twitter: "@Nina__vibes",
      instagram: "@nina____vibes",
      pinterest: "@Nina_Vibes",
      tiktok: "@nina__vibes",
      youtube: "@lnina_vibes",
      snapchat: "@bright-mindset",
      x: "@Nina__vibes",
      facebook: "@lnina.vibes",
    },
  };
  const publishDate = "2025-07-13";
  const modifiedDate = "2025-07-13";
  const category = "Minimalist Interior Design";
  const readTime = "12 minutes";
  const tags = [
    "minimalist-living-room",
    "scandinavian-design",
    "japanese-minimalism",
    "small-space-living",
    "neutral-color-palette",
    "zen-interior-design",
    "decluttering-tips",
    "sustainable-furniture",
    "mindful-living",
    "modern-minimalism",
  ];
  const featuredImage = "/minimalist-living-room-overview.png";
  const canonicalUrl =
    "https://ninahealthy.com/HomeDecor/minimalist-living-room-ideas";
  const siteUrl = "https://ninahealthy.com";
  const siteName = "Interior Design & Home Decor by Nina";

  const minimalistStyles = {
    scandinavian: {
      name: "Scandinavian Minimalism",
      description: "Light woods, cozy textures, and hygge-inspired comfort",
      features: [
        "Light oak furniture",
        "Neutral wool textiles",
        "Natural light emphasis",
        "Functional design",
      ],
      colors: ["#F7F5F3", "#E8E2D5", "#C4A484", "#8B7355"],
    },
    japanese: {
      name: "Japanese Zen",
      description:
        "Wabi-sabi philosophy with natural materials and empty space",
      features: [
        "Low-profile furniture",
        "Natural wood grains",
        "Tatami-inspired elements",
        "Asymmetrical balance",
      ],
      colors: ["#F5F5DC", "#E6E6FA", "#D3D3D3", "#8B4513"],
    },
    contemporary: {
      name: "Contemporary Clean",
      description: "Sleek lines, high-tech materials, and urban sophistication",
      features: [
        "Steel and glass",
        "Monochromatic palette",
        "Geometric forms",
        "Smart home integration",
      ],
      colors: ["#FFFFFF", "#F0F0F0", "#C0C0C0", "#696969"],
    },
  };

  const blogContent = [
    {
      type: "paragraph",
      content:
        "Minimalist living rooms represent the perfect harmony between intentional design and peaceful living. These thoughtfully curated spaces eliminate visual clutter while maximizing both function and beauty. Whether you're drawn to Scandinavian hygge, Japanese wabi-sabi, or contemporary clean lines, minimalist living room design offers a timeless approach to creating your personal sanctuary.",
    },
    {
      type: "image",
      src: "/minimalist-living-room-overview.png",
      alt: "Stunning minimalist living room showcase featuring clean lines, neutral colors, and thoughtful furniture placement",
      caption: "The essence of minimalist living: less stuff, more life",
    },
    {
      type: "heading",
      content: "Why Choose Minimalist Living Room Design?",
    },
    {
      type: "paragraph",
      content:
        "Minimalist living rooms offer profound benefits beyond mere aesthetics. <strong>Minimalist interior design</strong> reduces stress, improves focus, and creates a sense of spaciousness even in smaller homes. Research shows that <strong>clutter-free living spaces</strong> can lower cortisol levels and improve mental clarity. When you embrace <strong>minimalist home decor</strong>, you're not just designing a room—you're crafting a lifestyle that prioritizes quality over quantity.",
    },
    {
      type: "callout",
      content:
        "Pro Design Tip: The key to successful minimalist living room design is the 'one in, one out' rule. For every new item you bring into your space, remove something else.",
    },
    {
      type: "heading",
      content: "1. Scandinavian Minimalist Living Room: Hygge Meets Function",
    },
    {
      type: "paragraph",
      content:
        "The <strong>Scandinavian minimalist living room</strong> combines the Danish concept of hygge with clean, functional design. This approach to <strong>minimalist furniture</strong> emphasizes light woods, cozy textures, and a connection to nature. The beauty of <strong>Scandinavian interior design</strong> lies in its ability to feel both minimal and inviting.",
    },
    {
      type: "image",
      src: "/scandinavian-minimalist-living-room.png",
      alt: "Scandinavian minimalist living room with light wood furniture, white walls, and cozy wool textiles",
      caption: "Scandinavian minimalism: where comfort meets clean design",
    },
    {
      type: "list",
      content: [
        "Choose light oak or birch furniture with clean, simple lines",
        "Layer natural textiles like wool throws and linen cushions",
        "Incorporate one statement piece like a beautiful ceramic vase",
        "Use warm white lighting to create hygge atmosphere",
        "Add a single piece of meaningful artwork or photography",
        "Include living plants for natural air purification",
      ],
    },
    {
      type: "callout",
      content:
        "Scandinavian Secret: The 'lagom' principle means 'just the right amount'—not too little, not too much, but perfectly balanced.",
    },
    {
      type: "heading",
      content: "2. Japanese Minimalist Living Room: Zen and the Art of Space",
    },
    {
      type: "paragraph",
      content:
        "<strong>Japanese minimalism</strong> in living room design draws from centuries of refined aesthetic philosophy. This <strong>zen living room</strong> approach emphasizes negative space, natural materials, and the beauty of imperfection through wabi-sabi principles. <strong>Japanese interior design</strong> creates profound tranquility through intentional emptiness.",
    },
    {
      type: "image",
      src: "/japanese-minimalist-living-room.png",
      alt: "Japanese zen minimalist living room with low furniture, natural wood, and tatami-inspired elements",
      caption:
        "Japanese minimalism: finding beauty in simplicity and imperfection",
    },
    {
      type: "list",
      content: [
        "Select low-profile furniture that maintains visual flow",
        "Use natural wood with visible grain patterns",
        "Create asymmetrical balance with carefully chosen objects",
        "Incorporate natural stone or bamboo elements",
        "Design flexible spaces that can serve multiple functions",
        "Practice 'ma' - the meaningful use of negative space",
      ],
    },
    {
      type: "callout",
      content:
        "Japanese Philosophy: In wabi-sabi, the crack in a beautiful bowl doesn't diminish its beauty—it adds to its story and character.",
    },
    {
      type: "heading",
      content: "3. Contemporary Minimalist Living Room: Urban Sophistication",
    },
    {
      type: "paragraph",
      content:
        "The <strong>contemporary minimalist living room</strong> embraces modern technology and urban aesthetics. This <strong>modern minimalist design</strong> approach focuses on sleek surfaces, geometric forms, and smart home integration. <strong>Contemporary interior design</strong> creates sophisticated spaces that feel both cutting-edge and timeless.",
    },
    {
      type: "image",
      src: "/contemporary-minimalist-living-room.png",
      alt: "Contemporary minimalist living room featuring sleek furniture, monochromatic colors, and geometric design elements",
      caption: "Contemporary minimalism: where technology meets tranquility",
    },
    {
      type: "list",
      content: [
        "Choose furniture with clean geometric lines and high-tech materials",
        "Implement smart home technology for seamless control",
        "Use monochromatic color schemes with strategic accent colors",
        "Incorporate statement lighting as functional art",
        "Select multi-functional furniture for space efficiency",
        "Maintain strict symmetry and architectural precision",
      ],
    },
    {
      type: "heading",
      content: "4. Small Space Minimalist Living Room: Maximizing Every Inch",
    },
    {
      type: "paragraph",
      content:
        "Creating a <strong>small space minimalist living room</strong> requires strategic thinking about every element. <strong>Minimalist small living room</strong> design proves that limitations can inspire creativity. When working with <strong>compact living spaces</strong>, every piece must earn its place through both function and beauty.",
    },
    {
      type: "image",
      src: "/small-minimalist-living-room.png",
      alt: "Small space minimalist living room with multi-functional furniture and clever storage solutions",
      caption:
        "Small space minimalism: proving that less square footage can mean more style",
    },
    {
      type: "list",
      content: [
        "Select furniture that serves multiple purposes",
        "Use wall-mounted elements to free floor space",
        "Choose light colors to visually expand the room",
        "Implement hidden storage solutions",
        "Use mirrors strategically to create depth",
        "Maintain clear pathways for easy movement",
      ],
    },
    {
      type: "callout",
      content:
        "Small Space Strategy: Vertical storage and wall-mounted furniture can increase usable space by up to 40% in compact living rooms.",
    },
    {
      type: "heading",
      content: "5. Neutral Minimalist Living Room: Timeless Elegance",
    },
    {
      type: "paragraph",
      content:
        "The <strong>neutral minimalist living room</strong> represents the pinnacle of timeless design. This <strong>neutral color palette</strong> approach creates spaces that feel both sophisticated and serene. <strong>Minimalist color schemes</strong> using beiges, whites, and soft grays provide the perfect backdrop for mindful living.",
    },
    {
      type: "image",
      src: "/neutral-minimalist-living-room.png",
      alt: "Neutral minimalist living room with beige and white color palette, natural textures, and soft lighting",
      caption:
        "Neutral minimalism: the art of creating impact through restraint",
    },
    {
      type: "list",
      content: [
        "Layer different shades of white and beige for depth",
        "Introduce texture through natural materials",
        "Use warm lighting to prevent sterile feelings",
        "Add one carefully chosen accent color",
        "Include organic shapes to soften geometric lines",
        "Focus on quality materials over quantity of items",
      ],
    },
    {
      type: "heading",
      content: "Essential Minimalist Living Room Furniture Guide",
    },
    {
      type: "paragraph",
      content:
        "Choosing the right <strong>minimalist furniture</strong> is crucial for achieving authentic minimalist design. Each piece should be carefully selected for both form and function. <strong>Sustainable furniture</strong> choices align with minimalist values while supporting environmental responsibility.",
    },
    {
      type: "image",
      src: "/minimalist-furniture-guide.png",
      alt: "Collection of essential minimalist furniture pieces including sofa, coffee table, and storage solutions",
      caption:
        "Essential minimalist furniture: quality pieces that stand the test of time",
    },
    {
      type: "heading",
      content: "Minimalist Living Room Color Palette Mastery",
    },
    {
      type: "paragraph",
      content:
        "Understanding <strong>minimalist color palettes</strong> is essential for creating cohesive, calming spaces. The right colors can make rooms feel larger, more peaceful, and more sophisticated. <strong>Neutral living room colors</strong> provide the foundation for successful minimalist design.",
    },
    {
      type: "image",
      src: "/minimalist-color-palette.png",
      alt: "Minimalist color palette swatches showing various neutral tones and accent colors",
      caption: "Minimalist color mastery: the subtle power of neutral tones",
    },
    {
      type: "heading",
      content: "Decluttering Your Living Room: The Minimalist Way",
    },
    {
      type: "paragraph",
      content:
        "Effective <strong>decluttering tips</strong> form the foundation of any successful minimalist transformation. <strong>Minimalist decluttering</strong> isn't just about removing items—it's about creating space for what truly matters. The process requires both practical strategies and mindful decision-making.",
    },
    {
      type: "image",
      src: "/decluttering-process.png",
      alt: "Before and after decluttering process showing transformation from cluttered to minimalist living room",
      caption: "The decluttering journey: from chaos to calm",
    },
    {
      type: "heading",
      content: "Lighting in Minimalist Living Rooms",
    },
    {
      type: "paragraph",
      content:
        "Proper lighting can make or break a minimalist living room design. <strong>Minimalist lighting</strong> should enhance the space's clean lines while providing both ambient and task lighting. Natural light remains the gold standard, but strategic artificial lighting creates the perfect atmosphere for any time of day.",
    },
    {
      type: "image",
      src: "/minimalist-lighting-design.png",
      alt: "Minimalist living room lighting featuring natural light, pendant lights, and floor lamps",
      caption: "Minimalist lighting: illuminating simplicity",
    },
    {
      type: "heading",
      content: "Sustainable Minimalism: Eco-Friendly Choices",
    },
    {
      type: "paragraph",
      content:
        "Modern minimalism embraces sustainability as a core principle. <strong>Sustainable minimalism</strong> means choosing quality pieces that last, supporting ethical manufacturers, and reducing environmental impact. <strong>Eco-friendly minimalist design</strong> proves that responsible choices can be beautiful choices.",
    },
    {
      type: "image",
      src: "/sustainable-minimalist-furniture.png",
      alt: "Sustainable minimalist furniture made from reclaimed wood and eco-friendly materials",
      caption: "Sustainable minimalism: beautiful choices for a better world",
    },
  ];

  const faqData = [
    {
      question: "What defines a minimalist living room?",
      answer:
        "A minimalist living room is characterized by clean lines, neutral colors, functional furniture, and the strategic use of negative space. It eliminates visual clutter while maintaining comfort and style through carefully chosen, high-quality pieces.",
    },
    {
      question: "How do I start creating a minimalist living room?",
      answer:
        "Begin by decluttering your current space, keeping only items that serve a purpose or bring joy. Choose a neutral color palette, invest in quality furniture with clean lines, and focus on functionality. Remember, minimalism is about intentional choices, not empty rooms.",
    },
    {
      question: "What colors work best in minimalist living rooms?",
      answer:
        "Neutral colors like whites, beiges, soft grays, and natural wood tones form the foundation of minimalist design. You can add depth with different shades of the same color family or introduce one carefully chosen accent color for visual interest.",
    },
    {
      question: "Is minimalist design suitable for families with children?",
      answer:
        "Absolutely! Minimalist design can be family-friendly when you choose durable, easy-to-clean materials and create designated storage for toys and family items. The key is maintaining the aesthetic while accommodating practical family needs.",
    },
    {
      question: "How much does it cost to create a minimalist living room?",
      answer:
        "Minimalist living rooms can be created on any budget. The key is investing in fewer, higher-quality pieces rather than many cheaper items. You can start with paint, decluttering, and rearranging existing furniture before investing in new pieces.",
    },
    {
      question: "What's the difference between minimalist and empty?",
      answer:
        "Minimalist design is intentional and purposeful, featuring carefully chosen items that serve both function and aesthetic appeal. An empty room lacks personality and comfort, while a minimalist room feels calm, purposeful, and inviting.",
    },
    {
      question: "Can I add plants to a minimalist living room?",
      answer:
        "Yes! Plants are excellent additions to minimalist spaces. They add life, color, and natural texture while improving air quality. Choose plants with simple, architectural forms and place them in clean, modern planters.",
    },
    {
      question: "How do I maintain a minimalist living room?",
      answer:
        "Maintain your minimalist living room by following the 'one in, one out' rule, regularly decluttering, and choosing quality over quantity. Establish systems for organization and be mindful of new purchases to prevent accumulation.",
    },
  ];

  const comparisonData = [
    {
      style: "Scandinavian",
      best_for: "Family homes, cold climates",
      key_materials: "Light wood, wool, linen",
      color_palette: "Warm whites, soft grays",
      price_range: "$$",
      maintenance: "Low",
    },
    {
      style: "Japanese",
      best_for: "Meditation spaces, urban apartments",
      key_materials: "Natural wood, bamboo, stone",
      color_palette: "Neutral earth tones",
      price_range: "$$$",
      maintenance: "Medium",
    },
    {
      style: "Contemporary",
      best_for: "Modern homes, tech enthusiasts",
      key_materials: "Steel, glass, concrete",
      color_palette: "Monochromatic",
      price_range: "$$$$",
      maintenance: "High",
    },
  ];

  const relatedPosts = [
    {
      title: "Minimalist Bedroom Design: Creating Your Personal Sanctuary",
      description:
        "Transform your bedroom into a peaceful retreat with these minimalist design principles",
      slug: "minimalist-bedroom-design",
      image: "/minimalist-bedroom.jpg",
    },
    {
      title: "Scandinavian Home Decor: Hygge-Inspired Living",
      description:
        "Discover the secrets of Scandinavian interior design and create cozy, minimalist spaces",
      slug: "scandinavian-home-decor",
      image: "/scandinavian-decor.jpg",
    },
    {
      title: "Decluttering Guide: The Art of Mindful Living",
      description:
        "Learn proven strategies for decluttering your home and maintaining a minimalist lifestyle",
      slug: "decluttering-guide-minimalist",
      image: "/decluttering-guide.jpg",
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
        `https://pinterest.com/${author.social.pinterest.replace("@", "")}`,
        `https://tiktok.com/${author.social.tiktok.replace("@", "")}`,
        `https://youtube.com/${author.social.youtube.replace("@", "")}`,
        `https://snapchat.com/add/${author.social.snapchat.replace("@", "")}`,
        `https://x.com/${author.social.x.replace("@", "")}`,
        `https://facebook.com/${author.social.facebook.replace("@", "")}`,
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

  const faqStructuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqData.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
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
          <p
            key={index}
            className={styles.contentParagraph}
            dangerouslySetInnerHTML={{ __html: section.content }}
          ></p>
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

        {/* FAQ Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqStructuredData),
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

              {/* Comparison Table */}
              <section className={styles.comparisonSection}>
                <h2 className={styles.contentHeading}>
                  Minimalist Style Comparison
                </h2>
                <div className={styles.comparisonTable}>
                  <table className={styles.table}>
                    <thead>
                      <tr>
                        <th>Style</th>
                        <th>Best For</th>
                        <th>Key Materials</th>
                        <th>Color Palette</th>
                        <th>Price Range</th>
                        <th>Maintenance</th>
                      </tr>
                    </thead>
                    <tbody>
                      {comparisonData.map((row, index) => (
                        <tr key={index}>
                          <td className={styles.tableCell}>{row.style}</td>
                          <td className={styles.tableCell}>{row.best_for}</td>
                          <td className={styles.tableCell}>
                            {row.key_materials}
                          </td>
                          <td className={styles.tableCell}>
                            {row.color_palette}
                          </td>
                          <td className={styles.tableCell}>
                            {row.price_range}
                          </td>
                          <td className={styles.tableCell}>
                            {row.maintenance}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>

              {/* FAQ Section */}
              <section className={styles.faqSection}>
                <h2 className={styles.contentHeading}>
                  Frequently Asked Questions About Minimalist Living Rooms
                </h2>
                <div className={styles.faqContainer}>
                  {faqData.map((faq, index) => (
                    <div key={index} className={styles.faqItem}>
                      <button
                        className={`${styles.faqQuestion} ${
                          expandedFaq === index ? styles.faqQuestionActive : ""
                        }`}
                        onClick={() => toggleFaq(index)}
                        aria-expanded={expandedFaq === index}
                      >
                        {faq.question}
                        <span className={styles.faqToggle}>
                          {expandedFaq === index ? "−" : "+"}
                        </span>
                      </button>
                      <div
                        className={`${styles.faqAnswer} ${
                          expandedFaq === index ? styles.faqAnswerOpen : ""
                        }`}
                      >
                        <p>{faq.answer}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </main>

            {/* Author & Meta Info */}
            <div className={styles.metaWrapper}>
              <div
                className={styles.authorInfo}
                itemScope
                itemType="https://schema.org/Person"
              >
                <div className={styles.authorAvatar}>
                  <img
                    src={author.avatar}
                    alt={`${author.name} - Author`}
                    width={80}
                    height={80}
                    className={styles.authorImage}
                    itemProp="image"
                  />
                </div>
                <div className={styles.authorDetails}>
                  <h3 className={styles.authorName} itemProp="name">
                    {author.name}
                  </h3>
                  <p className={styles.authorBio} itemProp="description">
                    {author.bio}
                  </p>
                  <div className={styles.authorSocial}>
                    <a
                      href={`https://twitter.com/${author.social.twitter.replace(
                        "@",
                        ""
                      )}`}
                      className={styles.socialLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Follow on Twitter"
                    >
                      Twitter
                    </a>
                    <a
                      href={`https://instagram.com/${author.social.instagram.replace(
                        "@",
                        ""
                      )}`}
                      className={styles.socialLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Follow on Instagram"
                    >
                      Instagram
                    </a>
                    <a
                      href={`https://pinterest.com/${author.social.pinterest.replace(
                        "@",
                        ""
                      )}`}
                      className={styles.socialLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Follow on Pinterest"
                    >
                      Pinterest
                    </a>
                    <a
                      href={`https://tiktok.com/${author.social.tiktok.replace(
                        "@",
                        ""
                      )}`}
                      className={styles.socialLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Follow on TikTok"
                    >
                      TikTok
                    </a>
                  </div>
                </div>
              </div>

              {/* Article Meta Information */}
              <div className={styles.articleMeta}>
                <div className={styles.metaItem}>
                  <span className={styles.metaLabel}>Published:</span>
                  <time
                    className={styles.metaValue}
                    itemProp="datePublished"
                    dateTime={publishDate}
                  >
                    {new Date(publishDate).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>
                </div>
                <div className={styles.metaItem}>
                  <span className={styles.metaLabel}>Category:</span>
                  <span className={styles.metaValue} itemProp="articleSection">
                    {category}
                  </span>
                </div>
                <div className={styles.metaItem}>
                  <span className={styles.metaLabel}>Reading Time:</span>
                  <span className={styles.metaValue}>{readTime}</span>
                </div>
                <div className={styles.metaItem}>
                  <span className={styles.metaLabel}>Last Updated:</span>
                  <time
                    className={styles.metaValue}
                    itemProp="dateModified"
                    dateTime={modifiedDate}
                  >
                    {new Date(modifiedDate).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>
                </div>
              </div>

              {/* Tags Section */}
              <div className={styles.tagsSection}>
                <h3 className={styles.tagsTitle}>Tags:</h3>
                <div className={styles.tagsList}>
                  {tags.map((tag, index) => (
                    <span
                      key={index}
                      className={styles.tag}
                      itemProp="keywords"
                    >
                      #{tag.replace("-", " ")}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Style Selector Section */}
            <section className={styles.styleSelector}>
              <h2 className={styles.contentHeading}>
                Explore Different Minimalist Styles
              </h2>
              <div className={styles.styleTabs}>
                {Object.entries(minimalistStyles).map(([key, style]) => (
                  <button
                    key={key}
                    className={`${styles.styleTab} ${
                      activeTab === key ? styles.activeTab : ""
                    }`}
                    onClick={() => setActiveTab(key)}
                  >
                    {style.name}
                  </button>
                ))}
              </div>
              <div className={styles.styleContent}>
                <div className={styles.styleInfo}>
                  <h3 className={styles.styleName}>
                    {minimalistStyles[activeTab].name}
                  </h3>
                  <p className={styles.styleDescription}>
                    {minimalistStyles[activeTab].description}
                  </p>
                  <div className={styles.styleFeatures}>
                    <h4 className={styles.featuresTitle}>Key Features:</h4>
                    <ul className={styles.featuresList}>
                      {minimalistStyles[activeTab].features.map(
                        (feature, index) => (
                          <li key={index} className={styles.featureItem}>
                            <span className={styles.featureIcon}>•</span>
                            {feature}
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                </div>
                <div className={styles.colorPalette}>
                  <h4 className={styles.paletteTitle}>Color Palette:</h4>
                  <div className={styles.colorSwatches}>
                    {minimalistStyles[activeTab].colors.map((color, index) => (
                      <div
                        key={index}
                        className={styles.colorSwatch}
                        style={{ backgroundColor: color }}
                        title={color}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Related Posts Section */}
            <section className={styles.relatedPosts}>
              <h2 className={styles.contentHeading}>You Might Also Like</h2>
              <div className={styles.relatedGrid}>
                {relatedPosts.map((post, index) => (
                  <article key={index} className={styles.relatedPost}>
                    <div className={styles.relatedImageContainer}>
                      <img
                        src={post.image}
                        alt={post.title}
                        width={1408}
                        height={768}
                        className={styles.relatedImage}
                        loading="lazy"
                      />
                    </div>
                    <div className={styles.relatedContent}>
                      <h3 className={styles.relatedTitle}>
                        <a
                          href={`/${post.slug}`}
                          className={styles.relatedLink}
                        >
                          {post.title}
                        </a>
                      </h3>
                      <p className={styles.relatedDescription}>
                        {post.description}
                      </p>
                      <a href={`/${post.slug}`} className={styles.readMoreLink}>
                        Read More →
                      </a>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            {/* Share Section */}
            <section className={styles.shareSection}>
              <h3 className={styles.shareTitle}>Share This Article</h3>
              <div className={styles.shareButtons}>
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                    title
                  )}&url=${encodeURIComponent(canonicalUrl)}`}
                  className={styles.shareButton}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Share on Twitter"
                >
                  <span className={styles.shareIcon}>🐦</span>
                  Twitter
                </a>
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                    canonicalUrl
                  )}`}
                  className={styles.shareButton}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Share on Facebook"
                >
                  <span className={styles.shareIcon}>📘</span>
                  Facebook
                </a>
                <a
                  href={`https://www.pinterest.com/pin/create/button/?url=${encodeURIComponent(
                    canonicalUrl
                  )}&media=${encodeURIComponent(
                    featuredImage
                  )}&description=${encodeURIComponent(title)}`}
                  className={styles.shareButton}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Share on Pinterest"
                >
                  <span className={styles.shareIcon}>📌</span>
                  Pinterest
                </a>
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                    canonicalUrl
                  )}`}
                  className={styles.shareButton}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Share on LinkedIn"
                >
                  <span className={styles.shareIcon}>💼</span>
                  LinkedIn
                </a>
              </div>
            </section>
          </div>
        </div>
      </article>
    </>
  );
};

export default BlogPost;
