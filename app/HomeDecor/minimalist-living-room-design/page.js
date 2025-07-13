"use client";
import React, { useState, useEffect } from "react";
import Head from "next/head";
import styles from "./page.module.css";
import Image from "next/image";

const BlogPost = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);
  const [particles, setParticles] = useState([]);
  const [openFAQ, setOpenFAQ] = useState(null);

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
    "Minimalist Living Room Design: 12 Essential Elements for Modern Serenity";
  const subtitle =
    "Transform your space into a peaceful sanctuary with these timeless minimalist design principles that prioritize quality over quantity";
  const description =
    "Discover the art of minimalist living room design with expert tips on furniture selection, color schemes, and space optimization. Create a serene, clutter-free environment that embodies modern elegance and functional beauty.";
  const author = {
    name: "Nina",
    bio: "Interior design specialist focusing on minimalist aesthetics and sustainable living spaces",
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
  const category = "Minimalist Design";
  const readTime = "12 minutes";
  const tags = [
    "minimalist-living-room",
    "modern-interior-design",
    "scandinavian-style",
    "clean-living",
    "minimalist-furniture",
    "zen-home-decor",
    "simple-living",
    "contemporary-design",
  ];
  const featuredImage = "/minimalist-living-room-hero.jpg";
  const canonicalUrl = "https://ninahealthy.com/minimalist-living-room-design";
  const siteUrl = "https://ninahealthy.com";
  const siteName = "Interior Design & Home Decor by Nina";

  const tableOfContents = [
    {
      title: "Essential Elements of Minimalist Living Room Design",
      anchor: "#essential-elements",
    },
    { title: "Color Palette for Minimalist Spaces", anchor: "#color-palette" },
    { title: "Furniture Selection Guide", anchor: "#furniture-selection" },
    { title: "Lighting Design Principles", anchor: "#lighting-design" },
    { title: "Storage Solutions That Disappear", anchor: "#storage-solutions" },
    {
      title: "Minimalist vs. Modern: Understanding the Difference",
      anchor: "#comparison",
    },
    { title: "Common Minimalist Design Mistakes", anchor: "#common-mistakes" },
    { title: "Frequently Asked Questions", anchor: "#faq" },
  ];

  const comparisonData = [
    {
      aspect: "Color Scheme",
      minimalist: "Neutral whites, grays, beiges",
      modern: "Bold contrasts, statement colors",
      scandinavian: "White base with natural wood accents",
    },
    {
      aspect: "Furniture Quantity",
      minimalist: "Essential pieces only",
      modern: "Statement furniture with clean lines",
      scandinavian: "Functional, cozy essentials",
    },
    {
      aspect: "Decorative Elements",
      minimalist: "One or two carefully chosen pieces",
      modern: "Geometric patterns, artistic elements",
      scandinavian: "Natural textures, hygge accessories",
    },
    {
      aspect: "Storage Approach",
      minimalist: "Hidden, built-in solutions",
      modern: "Sleek, visible storage as design feature",
      scandinavian: "Natural materials, open shelving",
    },
  ];

  const faqData = [
    {
      question:
        "What is the difference between minimalist and modern living room design?",
      answer:
        "Minimalist design focuses on 'less is more' philosophy with essential furniture and neutral colors, while modern design emphasizes clean lines and may include bold colors and statement pieces. Minimalism prioritizes function and simplicity, whereas modern design celebrates contemporary aesthetics and innovation.",
    },
    {
      question: "How do I start creating a minimalist living room on a budget?",
      answer:
        "Begin by decluttering existing items and keeping only essentials. Focus on one quality piece like a comfortable sofa, then gradually add neutral accessories. Shop secondhand for solid wood furniture, use white paint to refresh walls, and invest in good lighting rather than expensive decorative items.",
    },
    {
      question: "What colors work best in minimalist living room design?",
      answer:
        "Neutral color palettes are fundamental to minimalist design. Whites, soft grays, beiges, and warm off-whites create a serene foundation. Add depth with different textures rather than colors - think linen, wood, and stone in natural tones.",
    },
    {
      question:
        "How do I keep a minimalist living room from looking cold or sterile?",
      answer:
        "Incorporate natural materials like wood and stone, add texture through textiles (linen throws, wool rugs), include one or two plants, and ensure adequate warm lighting. The key is balancing simplicity with warmth through material choices and lighting design.",
    },
    {
      question:
        "What furniture pieces are essential for a minimalist living room?",
      answer:
        "Essential pieces include a quality sofa, coffee table, and adequate storage. Choose multi-functional furniture when possible - ottomans with storage, extendable tables, or built-in shelving. Each piece should serve a purpose and contribute to the overall aesthetic.",
    },
    {
      question: "How do I incorporate storage in a minimalist living room?",
      answer:
        "Focus on hidden storage solutions like built-in cabinets, storage ottomans, and furniture with concealed compartments. Wall-mounted shelves should be minimal and purposeful. The goal is to store items out of sight while maintaining clean lines and open space.",
    },
  ];

  const blogContent = [
    {
      type: "paragraph",
      content:
        "Minimalist living room design represents more than just a decorating style—it's a philosophy that celebrates the beauty of simplicity and intentional living. By embracing the 'less is more' principle, you can create a space that feels both sophisticated and serene, where every element serves a purpose and contributes to an atmosphere of calm elegance.",
    },
    {
      type: "image",
      src: "/minimalist-living-room-serene.jpg",
      alt: "Serene minimalist living room with white walls, natural wood coffee table, and soft gray sofa",
      caption:
        "A perfectly balanced minimalist living room showcasing the beauty of intentional design",
    },
    {
      type: "toc",
      title: "What You'll Learn in This Guide",
      items: tableOfContents,
    },
    {
      type: "heading",
      id: "essential-elements",
      content: "Essential Elements of Minimalist Living Room Design",
    },
    {
      type: "paragraph",
      content:
        "Creating an authentic minimalist living room requires understanding the core principles that define this timeless aesthetic. The foundation lies in thoughtful curation rather than elimination—every item in your space should earn its place through both function and beauty.",
    },
    {
      type: "numbered-list",
      title: "The 12 Fundamental Elements",
      items: [
        "**Quality over quantity furniture selection** - Choose fewer, better pieces that will last decades",
        "**Neutral color foundation** - Build your palette around whites, grays, and natural tones",
        "**Clean lines and geometric shapes** - Opt for furniture with simple, unadorned silhouettes",
        "**Natural materials integration** - Incorporate wood, stone, and linen for warmth and texture",
        "**Abundant natural light** - Maximize windows and use sheer or no window treatments",
        "**Hidden storage solutions** - Keep clutter invisible with built-in and concealed storage",
        "**Negative space utilization** - Allow breathing room between furniture pieces",
        "**Texture layering** - Add visual interest through varied materials rather than patterns",
        "**Minimal decorative accessories** - Choose one or two statement pieces maximum",
        "**Functional lighting design** - Combine ambient, task, and accent lighting thoughtfully",
        "**Single focal point** - Create visual hierarchy with one dominant element",
        "**Seamless flow** - Ensure easy movement and connection between spaces",
      ],
    },
    {
      type: "callout",
      content:
        "Expert Insight: The most successful minimalist living rooms feel effortless yet intentional. Every choice should enhance the sense of calm and spaciousness.",
    },
    {
      type: "image",
      src: "/minimalist-elements-showcase.jpg",
      alt: "Minimalist living room elements including clean-lined sofa, natural wood table, and single statement art piece",
      caption:
        "Essential minimalist elements working together to create visual harmony",
    },
    {
      type: "heading",
      id: "color-palette",
      content: "Color Palette for Minimalist Spaces",
    },
    {
      type: "paragraph",
      content:
        "The minimalist color palette serves as the foundation for creating a sense of tranquility and spaciousness. While white often dominates minimalist design, the most sophisticated spaces layer multiple neutral tones to create depth and visual interest without overwhelming the senses.",
    },
    {
      type: "paragraph",
      content:
        "According to <a href='https://www.pantone.com/color-intelligence/color-of-the-year' target='_blank' rel='noopener noreferrer'>Pantone's Color Intelligence reports</a>, neutral palettes continue to dominate contemporary interior design, with warm whites and soft grays leading the trend toward mindful, calming environments.",
    },
    {
      type: "color-palette",
      title: "Minimalist Color Combinations",
      palettes: [
        {
          name: "Classic Minimal",
          colors: ["#FFFFFF", "#F5F5F5", "#E8E8E8", "#C0C0C0"],
          description:
            "Timeless whites and grays create the ultimate serene foundation",
        },
        {
          name: "Warm Minimal",
          colors: ["#FAF7F2", "#E6D7C3", "#D4C5B0", "#8B7355"],
          description:
            "Creamy whites and beiges add warmth while maintaining simplicity",
        },
        {
          name: "Modern Minimal",
          colors: ["#FEFEFE", "#F0F0F0", "#2C2C2C", "#4A4A4A"],
          description:
            "Clean whites with charcoal accents for contemporary edge",
        },
      ],
    },
    {
      type: "callout",
      content:
        "Color Psychology: Neutral tones reduce visual stimulation and promote relaxation, making them ideal for creating peaceful living environments.",
    },
    {
      type: "image",
      src: "/minimalist-color-palette-room.jpg",
      alt: "Minimalist living room showcasing layered neutral tones from white walls to beige textiles",
      caption: "Layered neutral tones create depth without visual chaos",
    },
    {
      type: "heading",
      id: "furniture-selection",
      content: "Furniture Selection Guide",
    },
    {
      type: "paragraph",
      content:
        "Minimalist furniture selection requires a strategic approach that balances aesthetics with functionality. Each piece should serve multiple purposes while maintaining the clean, uncluttered look that defines minimalist design. Focus on <a href='#internal-link-quality-furniture'>investment pieces</a> that will stand the test of time both in durability and style.",
    },
    {
      type: "furniture-guide",
      title: "Essential Minimalist Furniture Pieces",
      items: [
        {
          piece: "Sofa",
          characteristics:
            "Clean lines, neutral upholstery, quality construction",
          materials: "Linen, cotton, or quality synthetic fabrics",
          sizing: "Proportionate to room size, not oversized",
          tips: "Choose a sofa that can serve as the room's anchor piece",
        },
        {
          piece: "Coffee Table",
          characteristics: "Simple geometric shape, functional surface",
          materials: "Natural wood, glass, or stone",
          sizing: "Lower height, rectangular or round",
          tips: "Consider storage options that remain hidden",
        },
        {
          piece: "Storage",
          characteristics: "Hidden compartments, clean exterior",
          materials: "Wood with smooth finishes, built-in preferred",
          sizing: "Adequate for lifestyle needs without excess",
          tips: "Built-in solutions offer the cleanest look",
        },
        {
          piece: "Lighting",
          characteristics: "Geometric forms, adjustable functionality",
          materials: "Metal, wood, or ceramic in neutral tones",
          sizing: "Proportionate to space and furniture scale",
          tips: "Layer different types for complete illumination",
        },
      ],
    },
    {
      type: "image",
      src: "/minimalist-furniture-selection.jpg",
      alt: "Carefully selected minimalist furniture including linen sofa, wood coffee table, and geometric floor lamp",
      caption:
        "Quality minimalist furniture pieces that balance form and function",
    },
    {
      type: "heading",
      id: "lighting-design",
      content: "Lighting Design Principles",
    },
    {
      type: "paragraph",
      content:
        "Lighting in minimalist spaces serves both functional and aesthetic purposes, creating ambiance while maintaining the clean, uncluttered aesthetic. The key is to layer different types of lighting—ambient, task, and accent—while keeping fixtures simple and purposeful.",
    },
    {
      type: "lighting-layers",
      title: "Three-Layer Lighting Approach",
      layers: [
        {
          type: "Ambient Lighting",
          purpose: "General illumination for the entire space",
          fixtures: "Recessed ceiling lights, pendant lights, or floor lamps",
          placement: "Evenly distributed throughout the room",
          tips: "Use dimmer switches for adjustable mood lighting",
        },
        {
          type: "Task Lighting",
          purpose: "Focused light for specific activities",
          fixtures: "Reading lamps, table lamps, or directed spotlights",
          placement: "Near seating areas and work surfaces",
          tips: "Choose adjustable fixtures for versatility",
        },
        {
          type: "Accent Lighting",
          purpose: "Highlight architectural features or artwork",
          fixtures: "Wall sconces, picture lights, or uplighting",
          placement: "Strategic positioning on focal points",
          tips: "Use sparingly to maintain minimalist aesthetic",
        },
      ],
    },
    {
      type: "callout",
      content:
        "Lighting Tip: Natural light should be maximized during the day, with artificial lighting designed to complement rather than compete with natural illumination.",
    },
    {
      type: "image",
      src: "/minimalist-lighting-layers.jpg",
      alt: "Minimalist living room with layered lighting including recessed ceiling lights, floor lamp, and table lamp",
      caption:
        "Layered lighting creates depth and functionality in minimalist spaces",
    },
    {
      type: "heading",
      id: "storage-solutions",
      content: "Storage Solutions That Disappear",
    },
    {
      type: "paragraph",
      content:
        "The secret to successful minimalist living room design lies in storage solutions that maintain the clean aesthetic while providing ample space for life's necessities. Hidden storage and multi-functional furniture are essential for achieving the uncluttered look that defines minimalism.",
    },
    {
      type: "storage-solutions",
      title: "Invisible Storage Ideas",
      solutions: [
        {
          solution: "Built-in Media Console",
          description: "Custom cabinetry that blends seamlessly with walls",
          benefits: "Hides cables, electronics, and media collections",
          implementation: "Work with carpenter or use modular systems",
        },
        {
          solution: "Ottoman with Storage",
          description: "Dual-purpose seating and hidden storage",
          benefits: "Extra seating and blanket storage",
          implementation: "Choose neutral colors to match decor",
        },
        {
          solution: "Wall-Mounted Shelving",
          description: "Floating shelves with minimal visual impact",
          benefits: "Display without floor space occupation",
          implementation: "Use sparingly and style minimally",
        },
        {
          solution: "Under-Sofa Storage",
          description: "Utilize space beneath furniture",
          benefits: "Hidden storage for seasonal items",
          implementation: "Use low-profile storage boxes",
        },
      ],
    },
    {
      type: "image",
      src: "/minimalist-hidden-storage.jpg",
      alt: "Minimalist living room with built-in storage solutions and hidden compartments",
      caption: "Seamless storage solutions that maintain clean lines",
    },
    {
      type: "heading",
      id: "comparison",
      content: "Minimalist vs. Modern: Understanding the Difference",
    },
    {
      type: "paragraph",
      content:
        "While minimalist and modern design share some similarities, understanding their distinctions helps you create a more authentic and cohesive space. This comparison will help you identify which elements align with your vision for the perfect living room.",
    },
    {
      type: "comparison-table",
      title: "Design Style Comparison",
      data: comparisonData,
    },
    {
      type: "callout",
      content:
        "Style Insight: You can blend elements from different styles, but maintaining consistency in your chosen approach creates the most cohesive and successful design.",
    },
    {
      type: "image",
      src: "/style-comparison-visual.jpg",
      alt: "Side-by-side comparison of minimalist, modern, and Scandinavian living room styles",
      caption:
        "Visual comparison of minimalist, modern, and Scandinavian design approaches",
    },
    {
      type: "heading",
      id: "common-mistakes",
      content: "Common Minimalist Design Mistakes",
    },
    {
      type: "paragraph",
      content:
        "Even well-intentioned minimalist designs can fall short of their potential. Avoiding these common pitfalls will help you create a space that feels intentional and welcoming rather than stark or incomplete.",
    },
    {
      type: "mistake-list",
      title: "Mistakes to Avoid",
      mistakes: [
        {
          mistake: "Confusing empty with minimalist",
          solution: "Include essential furniture and thoughtful accessories",
          impact: "Creates uncomfortable, unusable space",
        },
        {
          mistake: "Ignoring texture and material variety",
          solution: "Layer different textures within neutral palette",
          impact: "Results in flat, sterile appearance",
        },
        {
          mistake: "Inadequate storage planning",
          solution: "Design comprehensive hidden storage systems",
          impact: "Leads to visible clutter and stress",
        },
        {
          mistake: "Poor lighting design",
          solution: "Implement layered lighting with dimmer controls",
          impact: "Creates harsh or inadequate illumination",
        },
        {
          mistake: "Sacrificing comfort for aesthetics",
          solution: "Choose comfortable, well-made furniture",
          impact: "Results in space that's not livable",
        },
      ],
    },
    {
      type: "image",
      src: "/minimalist-mistakes-examples.jpg",
      alt: "Examples of common minimalist design mistakes and their solutions",
      caption:
        "Learning from common mistakes leads to better minimalist design",
    },
    {
      type: "heading",
      id: "inspiration-gallery",
      content: "Minimalist Living Room Inspiration",
    },
    {
      type: "paragraph",
      content:
        "These carefully curated examples demonstrate how minimalist principles can be applied in various settings and styles, from urban apartments to suburban homes. Each space shows how thoughtful design choices create environments that are both beautiful and functional.",
    },
    {
      type: "gallery",
      title: "Inspiring Minimalist Spaces",
      images: [
        {
          src: "/minimalist-apartment-living.jpg",
          alt: "Modern minimalist apartment living room with city views",
          caption: "Urban minimalist living with floor-to-ceiling windows",
        },
        {
          src: "/minimalist-family-room.jpg",
          alt: "Family-friendly minimalist living room with comfortable seating",
          caption:
            "Family-friendly minimalism balances style with functionality",
        },
        {
          src: "/minimalist-small-space.jpg",
          alt: "Small minimalist living room maximizing space efficiency",
          caption: "Small space minimalism maximizes every square foot",
        },
        {
          src: "/minimalist-luxury-living.jpg",
          alt: "Luxury minimalist living room with high-end materials",
          caption:
            "Luxury minimalism showcases quality materials and craftsmanship",
        },
      ],
    },
    {
      type: "internal-links",
      title: "Related Design Guides",
      links: [
        {
          text: "Small Space Design Solutions",
          url: "/small-space-design-solutions",
          description: "Maximize functionality in compact living areas",
        },
        {
          text: "Scandinavian Design Principles",
          url: "/scandinavian-design-principles",
          description: "Embrace hygge and functional beauty",
        },
        {
          text: "Modern Furniture Selection Guide",
          url: "/modern-furniture-selection",
          description: "Choose pieces that define contemporary style",
        },
        {
          text: "Color Psychology in Interior Design",
          url: "/color-psychology-interior-design",
          description: "Understand how colors affect mood and space",
        },
      ],
    },
    {
      type: "heading",
      id: "faq",
      content: "Frequently Asked Questions",
    },
    {
      type: "faq-section",
      faqs: faqData,
    },
    {
      type: "conclusion",
      content:
        "Creating a minimalist living room is about more than just reducing clutter—it's about crafting a space that reflects your values and enhances your daily life. By focusing on quality over quantity, embracing natural materials, and designing for both beauty and function, you can create a living room that serves as a peaceful retreat from the complexities of modern life. Remember, true minimalism isn't about having less for the sake of it, but about having exactly what you need to live well.",
    },
  ];

  const relatedPosts = [
    {
      title: "Scandinavian Living Room Design: Cozy Minimalism Guide",
      description:
        "Discover how to blend minimalist principles with Scandinavian warmth and functionality",
      slug: "scandinavian-living-room-design",
      image: "/scandinavian-living-room.jpg",
    },
    {
      title: "Small Space Living Room Ideas That Maximize Style",
      description:
        "Transform compact living areas with smart design solutions and space-saving strategies",
      slug: "small-space-living-room-ideas",
      image: "/small-space-living-room.jpg",
    },
    {
      title: "Modern Furniture Selection: A Complete Buyer's Guide",
      description:
        "Learn how to choose contemporary furniture that balances style, comfort, and longevity",
      slug: "modern-furniture-selection-guide",
      image: "/modern-furniture-guide.jpg",
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
    about: {
      "@type": "Thing",
      name: "Minimalist Interior Design",
      description:
        "A design philosophy emphasizing simplicity, functionality, and the use of minimal elements to create maximum impact",
    },
    mentions: [
      {
        "@type": "Thing",
        name: "Scandinavian Design",
        description:
          "Nordic design philosophy emphasizing functionality, simplicity, and natural materials",
      },
      {
        "@type": "Thing",
        name: "Modern Interior Design",
        description:
          "Contemporary design approach featuring clean lines, neutral colors, and functional furniture",
      },
    ],
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

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  const renderContent = (section, index) => {
    switch (section.type) {
      // ... (existing cases remain the same)

      case "faq-section":
        return (
          <div key={index} className={styles.faqContainer}>
            {section.faqs.map((faq, faqIndex) => (
              <div key={faqIndex} className={styles.faqItem}>
                <button
                  className={styles.faqQuestion}
                  onClick={() => toggleFAQ(faqIndex)}
                  aria-expanded={openFAQ === faqIndex}
                >
                  <span>{faq.question}</span>
                  <span className={styles.faqToggle}>
                    {openFAQ === faqIndex ? "−" : "+"}
                  </span>
                </button>
                {openFAQ === faqIndex && (
                  <div className={styles.faqAnswer}>
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        );

      case "furniture-guide":
        return (
          <div key={index} className={styles.furnitureGuideContainer}>
            <h3 className={styles.furnitureGuideTitle}>{section.title}</h3>
            <div className={styles.furnitureGrid}>
              {section.items.map((item, itemIndex) => (
                <div key={itemIndex} className={styles.furnitureItem}>
                  <h4 className={styles.furniturePiece}>{item.piece}</h4>
                  <div className={styles.furnitureDetails}>
                    <p>
                      <strong>Characteristics:</strong> {item.characteristics}
                    </p>
                    <p>
                      <strong>Materials:</strong> {item.materials}
                    </p>
                    <p>
                      <strong>Sizing:</strong> {item.sizing}
                    </p>
                    <p className={styles.furnitureTips}>
                      <strong>Tips:</strong> {item.tips}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case "lighting-layers":
        return (
          <div key={index} className={styles.lightingLayersContainer}>
            <h3 className={styles.lightingLayersTitle}>{section.title}</h3>
            <div className={styles.lightingGrid}>
              {section.layers.map((layer, layerIndex) => (
                <div key={layerIndex} className={styles.lightingLayer}>
                  <h4 className={styles.lightingType}>{layer.type}</h4>
                  <div className={styles.lightingDetails}>
                    <p>
                      <strong>Purpose:</strong> {layer.purpose}
                    </p>
                    <p>
                      <strong>Fixtures:</strong> {layer.fixtures}
                    </p>
                    <p>
                      <strong>Placement:</strong> {layer.placement}
                    </p>
                    <p className={styles.lightingTips}>
                      <strong>Tips:</strong> {layer.tips}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case "storage-solutions":
        return (
          <div key={index} className={styles.storageContainer}>
            <h3 className={styles.storageTitle}>{section.title}</h3>
            <div className={styles.storageGrid}>
              {section.solutions.map((solution, solutionIndex) => (
                <div key={solutionIndex} className={styles.storageItem}>
                  <h4 className={styles.storageSolution}>
                    {solution.solution}
                  </h4>
                  <div className={styles.storageDetails}>
                    <p>
                      <strong>Description:</strong> {solution.description}
                    </p>
                    <p>
                      <strong>Benefits:</strong> {solution.benefits}
                    </p>
                    <p className={styles.storageImplementation}>
                      <strong>Implementation:</strong> {solution.implementation}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case "mistake-list":
        return (
          <div key={index} className={styles.mistakeListContainer}>
            <h3 className={styles.mistakeListTitle}>{section.title}</h3>
            <div className={styles.mistakeGrid}>
              {section.mistakes.map((mistake, mistakeIndex) => (
                <div key={mistakeIndex} className={styles.mistakeItem}>
                  <h4 className={styles.mistakeName}>❌ {mistake.mistake}</h4>
                  <div className={styles.mistakeDetails}>
                    <p>
                      <strong>Solution:</strong> {mistake.solution}
                    </p>
                    <p className={styles.mistakeImpact}>
                      <strong>Impact:</strong> {mistake.impact}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case "gallery":
        return (
          <div key={index} className={styles.galleryContainer}>
            <h3 className={styles.galleryTitle}>{section.title}</h3>
            <div className={styles.galleryGrid}>
              {section.images.map((image, imageIndex) => (
                <div key={imageIndex} className={styles.galleryItem}>
                  <Image
                    src={image.src}
                    alt={image.alt}
                    width={600}
                    height={400}
                    className={styles.galleryImage}
                    loading="lazy"
                  />
                  <p className={styles.galleryCaption}>{image.caption}</p>
                </div>
              ))}
            </div>
          </div>
        );

      case "internal-links":
        return (
          <div key={index} className={styles.internalLinksContainer}>
            <h3 className={styles.internalLinksTitle}>{section.title}</h3>
            <div className={styles.internalLinksGrid}>
              {section.links.map((link, linkIndex) => (
                <div key={linkIndex} className={styles.internalLinkItem}>
                  <a href={link.url} className={styles.internalLink}>
                    <h4 className={styles.internalLinkTitle}>{link.text}</h4>
                    <p className={styles.internalLinkDescription}>
                      {link.description}
                    </p>
                  </a>
                </div>
              ))}
            </div>
          </div>
        );

      case "conclusion":
        return (
          <div key={index} className={styles.conclusionContainer}>
            <p className={styles.conclusionText}>{section.content}</p>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={tags.join(", ")} />
        <meta name="author" content={author.name} />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* Open Graph */}
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={featuredImage} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content={siteName} />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={featuredImage} />
        <meta name="twitter:creator" content={author.social.twitter} />

        {/* Article specific */}
        <meta property="article:author" content={author.name} />
        <meta property="article:published_time" content={publishDate} />
        <meta property="article:modified_time" content={modifiedDate} />
        <meta property="article:section" content={category} />
        {tags.map((tag, index) => (
          <meta key={index} property="article:tag" content={tag} />
        ))}

        <link rel="canonical" href={canonicalUrl} />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqStructuredData),
          }}
        />
      </Head>

      <div className={styles.container}>
        {/* Background particles */}
        {isLoaded && (
          <div className={styles.particles}>
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

        {/* Interactive background */}
        <div
          className={styles.interactiveBackground}
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(255, 255, 255, 0.1) 0%, transparent 50%)`,
          }}
        />

        {/* Header */}
        <header className={styles.header}>
          <div className={styles.headerContent}>
            <div className={styles.breadcrumb}>
              <a href="/" className={styles.breadcrumbLink}>
                Home
              </a>
              <span className={styles.breadcrumbSeparator}>›</span>
              <a href="/blog" className={styles.breadcrumbLink}>
                Blog
              </a>
              <span className={styles.breadcrumbSeparator}>›</span>
              <span className={styles.breadcrumbCurrent}>{category}</span>
            </div>

            <h1 className={styles.title}>{title}</h1>
            <p className={styles.subtitle}>{subtitle}</p>

            <div className={styles.meta}>
              <div className={styles.authorInfo}>
                <Image
                  src={author.avatar}
                  alt={author.name}
                  width={48}
                  height={48}
                  className={styles.authorAvatar}
                />
                <div className={styles.authorDetails}>
                  <span className={styles.authorName}>{author.name}</span>
                  <span className={styles.authorBio}>{author.bio}</span>
                </div>
              </div>

              <div className={styles.postMeta}>
                <time dateTime={publishDate} className={styles.publishDate}>
                  {new Date(publishDate).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
                <span className={styles.readTime}>{readTime} read</span>
              </div>
            </div>
          </div>
        </header>

        {/* Featured Image */}
        <div className={styles.featuredImageContainer}>
          <Image
            src={featuredImage}
            alt={title}
            width={1408}
            height={768}
            className={styles.featuredImage}
            priority
          />
        </div>

        {/* Main Content */}
        <main className={styles.main}>
          <article className={styles.article}>
            {blogContent.map((section, index) => renderContent(section, index))}
          </article>
        </main>

        {/* Social Sharing */}
        <div className={styles.socialSharing}>
          <h3 className={styles.socialSharingTitle}>Share this article</h3>
          <div className={styles.socialButtons}>
            <a
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                title
              )}&url=${encodeURIComponent(canonicalUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialButton}
            >
              Share on Twitter
            </a>
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                canonicalUrl
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialButton}
            >
              Share on Facebook
            </a>
            <a
              href={`https://www.pinterest.com/pin/create/button/?url=${encodeURIComponent(
                canonicalUrl
              )}&media=${encodeURIComponent(
                featuredImage
              )}&description=${encodeURIComponent(title)}`}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialButton}
            >
              Pin on Pinterest
            </a>
          </div>
        </div>

        {/* Author Bio */}
        <div className={styles.authorBio}>
          <div className={styles.authorBioContent}>
            <Image
              src={author.avatar}
              alt={author.name}
              width={100}
              height={100}
              className={styles.authorBioAvatar}
            />
            <div className={styles.authorBioText}>
              <h3 className={styles.authorBioName}>{author.name}</h3>
              <p className={styles.authorBioDescription}>{author.bio}</p>
              <div className={styles.authorSocial}>
                {Object.entries(author.social).map(([platform, handle]) => (
                  <a
                    key={platform}
                    href={`https://${
                      platform === "x"
                        ? "x.com"
                        : platform === "snapchat"
                        ? "snapchat.com/add"
                        : `${platform}.com`
                    }/${handle.replace("@", "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.authorSocialLink}
                  >
                    {platform}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Related Posts */}
        <div className={styles.relatedPosts}>
          <h3 className={styles.relatedPostsTitle}>Related Articles</h3>
          <div className={styles.relatedPostsGrid}>
            {relatedPosts.map((post, index) => (
              <div key={index} className={styles.relatedPost}>
                <a href={`/${post.slug}`} className={styles.relatedPostLink}>
                  <Image
                    src={post.image}
                    alt={post.title}
                    width={400}
                    height={250}
                    className={styles.relatedPostImage}
                  />
                  <div className={styles.relatedPostContent}>
                    <h4 className={styles.relatedPostTitle}>{post.title}</h4>
                    <p className={styles.relatedPostDescription}>
                      {post.description}
                    </p>
                  </div>
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Tags */}
        <div className={styles.tags}>
          <h3 className={styles.tagsTitle}>Tags</h3>
          <div className={styles.tagsList}>
            {tags.map((tag, index) => (
              <a key={index} href={`/tags/${tag}`} className={styles.tag}>
                #{tag}
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogPost;
