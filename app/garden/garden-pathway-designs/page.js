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
  const [activeTab, setActiveTab] = useState("cottage");
  const [selectedMaterial, setSelectedMaterial] = useState("natural-stone");

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
    "7 Stunning Garden Pathway Designs That Transform Your Outdoor Space";
  const subtitle =
    "Create enchanting walkways with these inspiring garden path ideas, from rustic stepping stones to elegant brick patterns";
  const description =
    "Discover 7 breathtaking garden pathway designs that combine functionality with beauty. Explore materials, patterns, lighting ideas, and expert landscaping tips to create the perfect garden walkway. From cottage garden paths to modern paver designs, find inspiration for every style and budget.";
  const author = {
    name: "Nina",
    bio: "Landscape design enthusiast and sustainable gardening advocate specializing in outdoor living spaces",
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
  const publishDate = "2025-08-09";
  const modifiedDate = "2025-08-09";
  const category = "Garden Design & Landscaping";
  const readTime = "22 minutes";
  const tags = [
    "garden-pathway-designs",
    "garden-path-ideas",
    "walkway-landscaping",
    "stepping-stone-paths",
    "brick-garden-paths",
    "gravel-pathways",
    "garden-walkway-materials",
    "pathway-lighting-ideas",
    "curved-garden-paths",
    "garden-path-patterns",
    "diy-garden-paths",
    "stone-pathway-designs",
    "garden-path-edging",
    "backyard-walkways",
    "garden-path-landscaping",
  ];
  const featuredImage = "/garden-pathway-hero.png";
  const canonicalUrl = "https://ninahealthy.com/garden/garden-pathway-designs";
  const siteUrl = "https://ninahealthy.com";
  const siteName = "Garden Design & Outdoor Living by Nina";

  const pathwayStyles = {
    cottage: {
      name: "Cottage Garden Pathways",
      description:
        "Romantic, whimsical paths with overflowing borders and natural charm",
      features: [
        "Irregular flagstone patterns",
        "Creeping thyme and moss joints",
        "Lavender and rose borders",
        "Weathered brick accents",
      ],
      materials: ["Natural Stone", "Reclaimed Brick", "Gravel", "Wood Chips"],
      colors: ["#8B7355", "#A0826D", "#CDB79E", "#DEB887"],
    },
    modern: {
      name: "Modern Minimalist Pathways",
      description:
        "Clean lines and geometric patterns for contemporary gardens",
      features: [
        "Large format pavers",
        "LED strip lighting",
        "Ornamental grass borders",
        "Concrete and steel elements",
      ],
      materials: [
        "Concrete Pavers",
        "Porcelain Tiles",
        "Decomposed Granite",
        "Steel Edging",
      ],
      colors: ["#696969", "#808080", "#A9A9A9", "#D3D3D3"],
    },
    japanese: {
      name: "Japanese Zen Garden Paths",
      description: "Contemplative walkways that encourage mindful movement",
      features: [
        "Stepping stone placement",
        "Raked gravel patterns",
        "Bamboo borders",
        "Water feature integration",
      ],
      materials: ["River Rocks", "Granite Steps", "Pea Gravel", "Bamboo"],
      colors: ["#555555", "#8B8682", "#CDC9C9", "#F5F5DC"],
    },
    mediterranean: {
      name: "Mediterranean Style Pathways",
      description: "Sun-drenched paths with terracotta and aromatic herbs",
      features: [
        "Terracotta tile patterns",
        "Drought-tolerant plantings",
        "Decorative pebble mosaics",
        "Citrus tree borders",
      ],
      materials: ["Terracotta", "Limestone", "Pebble Mosaic", "Crushed Shell"],
      colors: ["#CD853F", "#DEB887", "#F4A460", "#FFDEAD"],
    },
  };

  const pathwayMaterials = {
    "natural-stone": {
      name: "Natural Stone",
      costPerSqFt: "$15-30",
      durability: "50+ years",
      maintenance: "Low",
      bestFor: "All climates, high-traffic areas",
      pros: ["Extremely durable", "Natural beauty", "Increases property value"],
      cons: ["Higher initial cost", "Professional installation recommended"],
    },
    "brick-pavers": {
      name: "Brick Pavers",
      costPerSqFt: "$10-20",
      durability: "25-30 years",
      maintenance: "Medium",
      bestFor: "Traditional gardens, moderate climates",
      pros: ["Classic appearance", "Good drainage", "Repairable"],
      cons: ["Can shift over time", "Moss growth in shade"],
    },
    gravel: {
      name: "Gravel",
      costPerSqFt: "$3-5",
      durability: "5-10 years",
      maintenance: "High",
      bestFor: "Informal gardens, good drainage areas",
      pros: ["Budget-friendly", "Easy DIY", "Excellent drainage"],
      cons: ["Requires regular topping", "Can scatter", "Difficult with snow"],
    },
    "concrete-pavers": {
      name: "Concrete Pavers",
      costPerSqFt: "$8-15",
      durability: "20-30 years",
      maintenance: "Low",
      bestFor: "Modern designs, all climates",
      pros: ["Versatile designs", "Consistent sizing", "Color options"],
      cons: ["Can fade over time", "May crack in freeze-thaw"],
    },
  };

  const blogContent = [
    {
      type: "paragraph",
      content:
        "Transform your outdoor space into a magical journey with <strong>garden pathway designs</strong> that blend artistry and functionality. Whether you're creating <strong>garden walkways</strong> through flower beds or designing <strong>backyard pathways</strong> to connect living spaces, the right <strong>garden path ideas</strong> can elevate your entire landscape. According to the <a href='https://www.asla.org' target='_blank' rel='noopener'>American Society of Landscape Architects</a>, well-designed <strong>walkway landscaping</strong> can increase property value by up to 20% while creating inviting outdoor experiences.",
    },
    {
      type: "image",
      src: "/garden-pathway-hero.png",
      alt: "Stunning garden pathway with natural stone steps surrounded by flowering perennials and ornamental grasses",
      caption:
        "A well-designed garden path creates both journey and destination",
    },
    {
      type: "heading",
      content: "Why Garden Pathway Design Matters: Beyond Simple Navigation",
    },
    {
      type: "paragraph",
      content:
        "Professional <strong>landscape pathway design</strong> serves multiple purposes beyond mere foot traffic management. Research from the <a href='https://www.rhs.org.uk' target='_blank' rel='noopener'>Royal Horticultural Society</a> shows that thoughtfully designed <strong>garden path patterns</strong> can reduce lawn maintenance by 40%, improve drainage, and create distinct garden rooms. <strong>Curved garden paths</strong> naturally slow movement, encouraging visitors to appreciate plantings, while <strong>straight pathways</strong> provide efficient routes and formal structure. The psychology of <strong>pathway landscaping ideas</strong> influences how we experience outdoor spaces.",
    },
    {
      type: "callout",
      content:
        "Design Principle: The ideal garden path width is 4-5 feet for main walkways and 2-3 feet for secondary paths, allowing comfortable passage while maintaining intimate garden scale.",
    },
    {
      type: "heading",
      content: "1. Natural Stone Garden Pathways: Timeless Elegance",
    },
    {
      type: "paragraph",
      content:
        "Among all <strong>stone pathway designs</strong>, natural stone offers unmatched durability and character. <strong>Flagstone garden paths</strong> create organic patterns that complement any landscape style, while <strong>bluestone walkways</strong> provide consistent color and texture. Popular <strong>natural stone path materials</strong> include limestone, sandstone, slate, and granite. Each stone type offers unique characteristics for <strong>garden stepping stone ideas</strong> and continuous pathways.",
    },
    {
      type: "image",
      src: "/natural-stone-pathway.png",
      alt: "Irregular flagstone pathway with moss-filled joints winding through a cottage garden",
      caption:
        "Natural stone pathways age beautifully, developing patina over time",
    },
    {
      type: "list",
      content: [
        "Choose locally sourced stone for cost-effectiveness and regional authenticity",
        "Install proper base materials: 4-6 inches of compacted gravel beneath stone",
        "Consider permeable joints with decomposed granite or polymeric sand",
        "Use larger stones for main paths, smaller pieces for accent areas",
        "Incorporate stone steps for elevation changes exceeding 2 inches",
        "Edge with steel or aluminum for clean lines and stability",
        "Plan for 1-2% slope for proper drainage away from structures",
        "Seal porous stones annually in freeze-thaw climates",
      ],
    },
    {
      type: "heading",
      content: "2. Brick Garden Pathways: Classic Patterns and Possibilities",
    },
    {
      type: "paragraph",
      content:
        "<strong>Brick pathway patterns</strong> offer endless design possibilities, from traditional herringbone to contemporary stack bond. <strong>Brick garden paths</strong> complement both formal and cottage garden styles, with <strong>reclaimed brick pathways</strong> adding instant character. The versatility of <strong>brick paver designs</strong> allows for intricate patterns and borders that enhance garden architecture. Modern <strong>permeable brick pavers</strong> address drainage concerns while maintaining classic aesthetics.",
    },
    {
      type: "image",
      src: "/brick-pathway-patterns.png",
      alt: "Herringbone brick pathway with moss accents leading through an English garden",
      caption: "Brick patterns add rhythm and movement to garden walkways",
    },
    {
      type: "list",
      content: [
        "Running bond: Simple, efficient pattern using 50% offset rows",
        "Herringbone: Classic 45° or 90° angles for visual interest",
        "Basketweave: Alternating pairs create textured checkerboard effect",
        "Circular patterns: Radiating designs for patios and focal points",
        "Mixed materials: Combine brick with stone or concrete accents",
        "Color variations: Blend multiple brick tones for depth",
        "Border treatments: Use soldier course or sailor course edges",
        "Mortar vs. sand joints: Choose based on climate and flexibility needs",
      ],
    },
    {
      type: "heading",
      content: "3. Gravel Garden Paths: Affordable Beauty and Drainage",
    },
    {
      type: "paragraph",
      content:
        "<strong>Gravel pathway ideas</strong> provide budget-friendly solutions with excellent drainage properties. <strong>Decomposed granite paths</strong> offer stability similar to concrete when properly compacted, while <strong>pea gravel walkways</strong> create satisfying crunching sounds that alert homeowners to visitors. Modern <strong>gravel garden designs</strong> incorporate stabilization grids and precise edging for professional results. <strong>Crushed stone pathways</strong> complement xeriscape and drought-tolerant gardens perfectly.",
    },
    {
      type: "image",
      src: "/gravel-pathway-garden.png",
      alt: "Curved gravel pathway with steel edging through a Mediterranean-style garden",
      caption: "Gravel paths offer flexibility in shape and excellent drainage",
    },
    {
      type: "numbered-list",
      content: [
        "Excavate pathway area to 4-6 inches depth",
        "Install landscape fabric to prevent weed growth",
        "Add and compact base layer of larger crushed stone (3 inches)",
        "Install metal or wood edging to contain gravel",
        "Spread decorative gravel layer (2-3 inches deep)",
        "Compact with plate compactor or hand tamper",
        "Top-dress annually to maintain appearance",
        "Consider stabilization products for high-traffic areas",
      ],
    },
    {
      type: "heading",
      content: "4. Stepping Stone Pathways: Artistic Journey Markers",
    },
    {
      type: "paragraph",
      content:
        "<strong>Stepping stone path designs</strong> create rhythmic movement through gardens while preserving lawn or groundcover between stones. <strong>DIY stepping stones</strong> offer creative opportunities with concrete molds, mosaic designs, or embedded objects. Professional <strong>Japanese stepping stone placement</strong> follows specific principles for natural flow. <strong>Garden stepping stone spacing</strong> typically measures 24 inches on center for comfortable adult stride.",
    },
    {
      type: "image",
      src: "/stepping-stone-pathway.png",
      alt: "Circular stepping stones through ornamental grass garden with subtle lighting",
      caption:
        "Stepping stones create a journey of discovery through the garden",
    },
    {
      type: "heading",
      content: "5. Concrete and Paver Pathways: Modern Versatility",
    },
    {
      type: "paragraph",
      content:
        "Contemporary <strong>concrete pathway designs</strong> go far beyond basic sidewalks, with stamped, stained, and exposed aggregate finishes. <strong>Paver walkway patterns</strong> using interlocking concrete units offer durability with design flexibility. <strong>Permeable paver systems</strong> address stormwater management while maintaining aesthetic appeal. Modern <strong>large format pavers</strong> create minimalist pathways perfect for contemporary landscapes. According to the <a href='https://www.icpi.org' target='_blank' rel='noopener'>Interlocking Concrete Pavement Institute</a>, properly installed paver pathways can last 30+ years with minimal maintenance.",
    },
    {
      type: "image",
      src: "/modern-concrete-pathway.png",
      alt: "Large format concrete pavers with grass joints in modern garden design",
      caption:
        "Modern concrete pavers offer clean lines and minimal maintenance",
    },
    {
      type: "heading",
      content: "6. Wood and Mulch Pathways: Natural Forest Feel",
    },
    {
      type: "paragraph",
      content:
        "<strong>Wood chip pathways</strong> create soft, natural walking surfaces perfect for woodland gardens and play areas. <strong>Bark mulch paths</strong> offer similar benefits with better longevity, while <strong>boardwalk garden paths</strong> elevate walkways above wet areas. <strong>Railroad tie steps</strong> and paths provide rustic charm, though modern alternatives using composite materials offer better environmental profiles. <strong>Wood pathway designs</strong> require regular maintenance but provide unmatched natural warmth.",
    },
    {
      type: "image",
      src: "/wood-mulch-pathway.png",
      alt: "Curved wood chip pathway through shade garden with fern borders",
      caption: "Organic pathways blend seamlessly with natural landscapes",
    },
    {
      type: "list",
      content: [
        "Use hardwood mulch for longer lifespan (3-4 years vs 1-2 for softwood)",
        "Install barrier edges to prevent mulch migration",
        "Maintain 3-4 inch depth for weed suppression",
        "Consider rubber mulch for playground paths (safety and longevity)",
        "Add fresh layer annually to maintain appearance",
        "Use cedar or redwood for naturally rot-resistant wood elements",
        "Install drainage beneath wood structures in wet climates",
        "Apply wood preservative annually to exposed timber",
      ],
    },
    {
      type: "heading",
      content: "7. Mixed Material Pathways: Creative Combinations",
    },
    {
      type: "paragraph",
      content:
        "Innovative <strong>mixed material garden paths</strong> combine different textures and colors for unique designs. Popular combinations include <strong>stone and gravel pathways</strong>, <strong>brick and concrete patterns</strong>, and <strong>wood and stone walkways</strong>. These <strong>combination pathway designs</strong> allow for cost management while maximizing visual impact. Creative <strong>mosaic garden paths</strong> incorporate broken tiles, glass, or pebbles for artistic expression.",
    },
    {
      type: "image",
      src: "/mixed-material-pathway.png",
      alt: "Garden path combining natural stone with decorative pebble mosaic inserts",
      caption: "Mixed materials add visual interest and reduce monotony",
    },
    {
      type: "heading",
      content: "8. Garden Path Lighting: Safety Meets Ambiance",
    },
    {
      type: "paragraph",
      content:
        "Strategic <strong>pathway lighting ideas</strong> extend garden enjoyment into evening hours while ensuring safe navigation. <strong>Solar path lights</strong> offer eco-friendly illumination without wiring, while <strong>LED pathway lighting</strong> provides energy-efficient brightness. Professional <strong>landscape lighting design</strong> layers different light types: path lights for walkways, uplights for features, and accent lights for atmosphere. Smart <strong>garden path illumination</strong> systems allow remote control and scheduling.",
    },
    {
      type: "image",
      src: "/pathway-lighting-night.png",
      alt: "Garden pathway illuminated with warm LED lights creating magical evening atmosphere",
      caption:
        "Proper lighting transforms pathways into nighttime destinations",
    },
    {
      type: "numbered-list",
      content: [
        "Space path lights 8-10 feet apart for adequate coverage",
        "Choose warm color temperatures (2700-3000K) for inviting ambiance",
        "Install lights 12-18 inches from path edge for optimal illumination",
        "Use shielded fixtures to prevent glare and light pollution",
        "Consider motion sensors for energy efficiency and security",
        "Incorporate step lights for elevation changes",
        "Add moonlighting from trees for natural shadow patterns",
        "Install transformer with timer for automated operation",
      ],
    },
    {
      type: "heading",
      content: "9. Curved vs. Straight Pathways: Design Psychology",
    },
    {
      type: "paragraph",
      content:
        "The choice between <strong>curved garden paths</strong> and <strong>straight walkway designs</strong> profoundly impacts garden experience. <strong>Meandering pathways</strong> create mystery and discovery, perfect for informal gardens and larger properties. <strong>Straight garden paths</strong> provide formal structure and efficient navigation, ideal for vegetable gardens and contemporary designs. <strong>Serpentine walkways</strong> can make small gardens appear larger by obscuring sight lines. Design research shows curved paths reduce walking speed by 30%, encouraging garden appreciation.",
    },
    {
      type: "image",
      src: "/curved-vs-straight-paths.png",
      alt: "Split image showing curved informal path versus straight formal pathway",
      caption:
        "Path geometry influences movement patterns and garden perception",
    },
    {
      type: "heading",
      content: "10. Garden Path Edging: Defining Beautiful Boundaries",
    },
    {
      type: "paragraph",
      content:
        "Professional <strong>pathway edging ideas</strong> provide crucial structure while preventing material migration. <strong>Metal garden edging</strong> offers clean, modern lines with minimal visibility, while <strong>stone border designs</strong> add decorative weight. <strong>Brick pathway edges</strong> complement traditional gardens, and <strong>plastic edging systems</strong> provide budget-friendly solutions. Proper <strong>garden path borders</strong> extend pathway lifespan and reduce maintenance significantly.",
    },
    {
      type: "image",
      src: "/pathway-edging-options.png",
      alt: "Various pathway edging materials including steel, stone, and brick borders",
      caption:
        "Quality edging prevents material spread and defines clean lines",
    },
    {
      type: "list",
      content: [
        "Steel edging: 1/8-inch thickness minimum for stability",
        "Aluminum edging: Lightweight, won't rust, easy curves",
        "Composite bender board: Flexible for curves, eco-friendly",
        "Natural stone borders: Use pieces 6+ inches deep for stability",
        "Cobblestone edges: Classic appearance, excellent longevity",
        "Living edges: Low hedges or ornamental grasses as soft borders",
        "Concrete curbing: Permanent solution for high-traffic areas",
        "Recycled rubber edging: Flexible, safe for play areas",
      ],
    },
    {
      type: "heading",
      content: "11. Planting Along Garden Pathways: Living Borders",
    },
    {
      type: "paragraph",
      content:
        "Strategic <strong>pathway border plants</strong> soften hard edges while guiding movement through gardens. <strong>Groundcover for pathways</strong> like creeping thyme and chamomile release fragrance when brushed. <strong>Perennial path borders</strong> provide seasonal interest with minimal maintenance, while <strong>aromatic pathway plants</strong> engage multiple senses. Professional <strong>pathway planting designs</strong> consider height, spread, and maintenance requirements for long-term success.",
    },
    {
      type: "image",
      src: "/pathway-border-plants.png",
      alt: "Lush pathway borders with lavender, catmint, and ornamental grasses",
      caption: "Living borders create soft edges and seasonal interest",
    },
    {
      type: "heading",
      content: "12. DIY Garden Path Installation: Step-by-Step Success",
    },
    {
      type: "paragraph",
      content:
        "Creating <strong>DIY garden pathways</strong> offers significant cost savings while providing customization opportunities. Basic <strong>pathway installation techniques</strong> remain consistent across materials: proper excavation, base preparation, and surface installation. <strong>Garden path construction</strong> typically requires basic tools and weekend time investment. Professional-quality <strong>DIY walkway projects</strong> focus on preparation and patience rather than specialized skills.",
    },
    {
      type: "image",
      src: "/diy-pathway-installation.png",
      alt: "Step-by-step DIY pathway installation showing base preparation and paver placement",
      caption: "Proper base preparation ensures long-lasting DIY pathways",
    },
    {
      type: "numbered-list",
      content: [
        "Mark pathway layout with spray paint or garden hose",
        "Excavate to appropriate depth (varies by material)",
        "Install landscape fabric for weed prevention",
        "Add and compact base material in 2-inch lifts",
        "Check for proper slope (1-2% away from structures)",
        "Install edging before surface material",
        "Place surface material according to pattern",
        "Compact and level final surface",
        "Add joint material (sand, gravel, or groundcover)",
        "Seal if appropriate for chosen material",
      ],
    },
    {
      type: "heading",
      content: "13. Accessible Garden Pathways: Universal Design",
    },
    {
      type: "paragraph",
      content:
        "Creating <strong>accessible garden paths</strong> ensures everyone can enjoy outdoor spaces. <strong>ADA-compliant pathways</strong> require 36-inch minimum width, firm surfaces, and gentle slopes (maximum 5% grade). <strong>Wheelchair-friendly gardens</strong> benefit from smooth transitions and rest areas every 200 feet. <strong>Universal design pathways</strong> incorporate contrasting colors for visual impairment and non-slip surfaces for safety. The <a href='https://www.access-board.gov' target='_blank' rel='noopener'>U.S. Access Board</a> provides comprehensive guidelines for outdoor accessibility.",
    },
    {
      type: "image",
      src: "/accessible-garden-pathway.png",
      alt: "Wide, smooth pathway with gentle slopes suitable for wheelchair access",
      caption: "Accessible design ensures gardens welcome all visitors",
    },
    {
      type: "heading",
      content: "14. Seasonal Pathway Maintenance: Year-Round Beauty",
    },
    {
      type: "paragraph",
      content:
        "Proper <strong>garden path maintenance</strong> preserves beauty and functionality throughout seasons. Spring <strong>pathway cleaning</strong> removes winter debris and addresses frost damage. Summer maintenance focuses on <strong>weed control in pathways</strong> and edge trimming. Fall preparation includes <strong>leaf removal from paths</strong> and joint material replenishment. Winter <strong>pathway snow removal</strong> requires appropriate techniques to prevent surface damage.",
    },
    {
      type: "image",
      src: "/seasonal-pathway-maintenance.png",
      alt: "Garden pathway maintenance showing power washing and joint sand replacement",
      caption: "Regular maintenance extends pathway lifespan significantly",
    },
    {
      type: "heading",
      content: "15. Eco-Friendly Pathway Solutions: Sustainable Choices",
    },
    {
      type: "paragraph",
      content:
        "Sustainable <strong>eco-friendly garden paths</strong> minimize environmental impact while maximizing beauty. <strong>Permeable pathway materials</strong> reduce stormwater runoff and recharge groundwater. <strong>Recycled material pathways</strong> using reclaimed brick, crushed concrete, or rubber mulch divert waste from landfills. <strong>Native stone pathways</strong> reduce transportation emissions while supporting local economies. <strong>Rain garden pathways</strong> integrate water management with circulation design.",
    },
    {
      type: "image",
      src: "/eco-friendly-pathway.png",
      alt: "Permeable pathway with native plants filtering stormwater runoff",
      caption: "Sustainable pathways contribute to environmental health",
    },
  ];

  const comparisonData = [
    {
      material: "Natural Stone",
      initial_cost: "$$$",
      lifespan: "50+ years",
      maintenance: "Low",
      diy_friendly: "Moderate",
      best_climate: "All climates",
      style_match: "Traditional, Natural",
      drainage: "Good with gaps",
      property_value: "High increase",
    },
    {
      material: "Brick Pavers",
      initial_cost: "$$",
      lifespan: "25-30 years",
      maintenance: "Medium",
      diy_friendly: "Yes",
      best_climate: "Moderate",
      style_match: "Traditional, Cottage",
      drainage: "Good",
      property_value: "Moderate increase",
    },
    {
      material: "Concrete Pavers",
      initial_cost: "$$",
      lifespan: "20-30 years",
      maintenance: "Low",
      diy_friendly: "Yes",
      best_climate: "All climates",
      style_match: "Modern, Contemporary",
      drainage: "Variable",
      property_value: "Moderate increase",
    },
    {
      material: "Gravel/DG",
      initial_cost: "$",
      lifespan: "5-10 years",
      maintenance: "High",
      diy_friendly: "Very",
      best_climate: "Dry climates",
      style_match: "Informal, Natural",
      drainage: "Excellent",
      property_value: "Low increase",
    },
    {
      material: "Wood/Mulch",
      initial_cost: "$",
      lifespan: "2-5 years",
      maintenance: "High",
      diy_friendly: "Very",
      best_climate: "Moderate",
      style_match: "Natural, Woodland",
      drainage: "Good",
      property_value: "Low increase",
    },
    {
      material: "Poured Concrete",
      initial_cost: "$$",
      lifespan: "30+ years",
      maintenance: "Low",
      diy_friendly: "No",
      best_climate: "Warm climates",
      style_match: "Modern, Minimal",
      drainage: "Poor",
      property_value: "Moderate increase",
    },
  ];

  const faqData = [
    {
      question: "What is the best material for garden pathways?",
      answer:
        "The best material depends on your climate, budget, and garden style. Natural stone offers unmatched durability and beauty but costs more. Gravel provides excellent drainage at low cost but requires regular maintenance. Brick and concrete pavers balance cost, durability, and DIY-friendliness. Consider local climate, intended use, and maintenance commitment when choosing materials.",
    },
    {
      question: "How wide should a garden pathway be?",
      answer:
        "Main garden pathways should be 4-5 feet wide to allow two people to walk comfortably side-by-side or accommodate wheelbarrows. Secondary paths can be 2-3 feet wide for single-file walking. Service paths to utilities need 3 feet minimum. For wheelchair accessibility, maintain 36 inches minimum width with 60-inch passing spaces every 200 feet.",
    },
    {
      question: "How much does it cost to install a garden pathway?",
      answer:
        "DIY garden pathways cost $3-10 per square foot for materials, while professional installation ranges from $10-30 per square foot. Gravel paths are most affordable ($3-5/sq ft), while natural stone is most expensive ($15-30/sq ft). A typical 100-square-foot pathway costs $300-3,000 depending on materials and installation method.",
    },
    {
      question: "What is the best base for a garden path?",
      answer:
        "The ideal base consists of 4-6 inches of compacted crushed stone or road base, topped with 1-2 inches of sand or stone dust for leveling. This provides stability, drainage, and prevents settling. In clay soils, increase base depth to 6-8 inches. Always compact in 2-inch lifts for maximum stability.",
    },
    {
      question: "How do I prevent weeds in my garden pathway?",
      answer:
        "Prevent pathway weeds through multiple strategies: install quality landscape fabric beneath paths, maintain proper joint material depth, use polymeric sand for paver joints, apply pre-emergent herbicides in spring, and perform regular maintenance. For eco-friendly control, use boiling water or vinegar solutions for spot treatment.",
    },
    {
      question: "Can I install a garden pathway over grass?",
      answer:
        "While possible for temporary paths, removing grass ensures longevity. Grass decomposes creating voids that cause settling and unevenness. For permanent pathways, remove sod, excavate to proper depth, and install appropriate base materials. For stepping stones in lawn, cut sod around each stone and set slightly below grass height.",
    },
    {
      question: "What's the best pathway for slopes?",
      answer:
        "For slopes up to 5%, use textured materials like rough stone or stamped concrete for traction. Slopes 5-8% require steps or terraced landings every 30 feet. Beyond 8%, install proper steps with 6-7 inch risers and 11+ inch treads. Always direct water away from pathways using swales or French drains.",
    },
    {
      question: "How do I light a garden pathway?",
      answer:
        "Install low-voltage LED path lights every 8-10 feet, positioned 12-18 inches from path edges. Use 2700-3000K color temperature for warm ambiance. Solar lights work for low-traffic areas but may not provide consistent illumination. Include step lights for elevation changes and consider motion sensors for energy efficiency.",
    },
    {
      question: "What plants grow well between stepping stones?",
      answer:
        "Choose low-growing, foot-traffic tolerant plants: creeping thyme, chamomile, Corsican mint, baby tears, Irish moss, and sedum varieties. These plants withstand occasional stepping, release pleasant fragrances, and require minimal maintenance. In shade, try ajuga or sweet woodruff. Ensure gaps are 2-4 inches wide for successful establishment.",
    },
    {
      question: "How often should I seal my pathway?",
      answer:
        "Natural stone and concrete benefit from sealing every 2-3 years in moderate climates, annually in freeze-thaw regions. Brick may need sealing every 3-5 years to prevent efflorescence. Sealers protect against stains, enhance color, and reduce weather damage. Choose breathable sealers for natural stone to prevent moisture trapping.",
    },
    {
      question: "Can I build a pathway in winter?",
      answer:
        "Pathway installation is best during dry weather above 40°F. Frozen ground prevents proper excavation and compaction. Mortar and concrete won't cure properly below 40°F. Polymeric sand requires dry conditions and temperatures above 32°F for 48 hours. Plan installations for spring through fall for best results.",
    },
    {
      question: "How do I create curves in my garden path?",
      answer:
        "Design curves using a garden hose or rope to visualize flow. Maintain consistent width throughout curves. For materials like brick or pavers, use smaller pieces on inside curves to maintain pattern. Metal or plastic edging bends easily for smooth curves. Avoid sharp turns; use minimum 3-foot radius for comfortable walking.",
    },
    {
      question: "What's the difference between permeable and standard pavers?",
      answer:
        "Permeable pavers feature wider joints (3/8-1/2 inch) filled with aggregate that allows water infiltration, reducing runoff by up to 100%. Standard pavers have tight joints with sand, directing water to surface drainage. Permeable systems cost 10-20% more but may qualify for stormwater management credits and prevent flooding.",
    },
    {
      question: "How do I repair a sinking pathway?",
      answer:
        "Remove affected section and check for underlying issues (poor drainage, inadequate base, root intrusion). Excavate and rebuild base properly with compacted gravel. Reset surface materials ensuring proper slope. For isolated low spots, lifting and adding base material may suffice. Address drainage problems to prevent recurrence.",
    },
    {
      question: "Should pathways slope away from the house?",
      answer:
        "Yes, maintain 1-2% slope (1/8 to 1/4 inch per foot) away from structures to prevent water damage. This gentle slope is barely noticeable but effectively manages runoff. In flat areas, create subtle crowning with center slightly higher than edges. Always direct water toward appropriate drainage areas or rain gardens.",
    },
  ];

  const maintenanceSchedule = [
    {
      season: "Spring",
      tasks: [
        "Inspect for winter damage and frost heaving",
        "Power wash stone and brick surfaces",
        "Replenish joint sand or gravel",
        "Apply pre-emergent weed control",
        "Edge along borders and trim overhanging plants",
        "Check and repair pathway lighting",
      ],
    },
    {
      season: "Summer",
      tasks: [
        "Weekly weeding of joints and edges",
        "Monitor for ant colonies in sand joints",
        "Trim pathway border plants",
        "Top-dress gravel or mulch paths",
        "Water new plantings along paths",
        "Adjust sprinklers to avoid pathway oversaturation",
      ],
    },
    {
      season: "Fall",
      tasks: [
        "Remove fallen leaves promptly",
        "Final weeding before winter",
        "Apply polymeric sand to paver joints",
        "Seal natural stone and concrete if needed",
        "Plant spring bulbs along pathway edges",
        "Winterize irrigation systems near paths",
      ],
    },
    {
      season: "Winter",
      tasks: [
        "Use calcium chloride instead of rock salt for ice",
        "Remove snow promptly to prevent ice formation",
        "Avoid metal shovels on stone and brick",
        "Check for drainage issues during thaws",
        "Plan next year's pathway improvements",
        "Order materials for spring projects",
      ],
    },
  ];

  const pathwayPatterns = [
    {
      pattern: "Running Bond",
      difficulty: "Easy",
      materials: "Brick, Pavers",
      description: "Offset rows create strong, simple pattern",
      best_for: "Long, straight pathways",
    },
    {
      pattern: "Herringbone",
      difficulty: "Moderate",
      materials: "Brick, Pavers",
      description: "Zigzag pattern at 45° or 90° angles",
      best_for: "High-traffic areas, driveways",
    },
    {
      pattern: "Basketweave",
      difficulty: "Easy",
      materials: "Brick, Square pavers",
      description: "Alternating pairs create woven appearance",
      best_for: "Patios, courtyards",
    },
    {
      pattern: "Random/Crazy",
      difficulty: "Moderate",
      materials: "Flagstone, Irregular stone",
      description: "Natural, organic layout with fitted pieces",
      best_for: "Informal gardens, natural landscapes",
    },
    {
      pattern: "Circle/Fan",
      difficulty: "Difficult",
      materials: "Brick, Pavers, Stone",
      description: "Radiating pattern from central point",
      best_for: "Focal points, pathway intersections",
    },
    {
      pattern: "Stack Bond",
      difficulty: "Easy",
      materials: "Square pavers, Cut stone",
      description: "Grid pattern with aligned joints",
      best_for: "Modern, minimalist designs",
    },
  ];

  const relatedPosts = [
    {
      title: "Small Garden Design Ideas That Maximize Every Inch",
      description:
        "Transform tiny outdoor spaces into stunning gardens with clever design strategies and space-saving techniques",
      slug: "small-garden-design-ideas",
      image: "/small-garden-design.png",
    },
    {
      title: "Garden Lighting Design: Illuminate Your Outdoor Paradise",
      description:
        "Create magical evening gardens with professional lighting techniques and energy-efficient solutions",
      slug: "garden-lighting-design-guide",
      image: "/garden-lighting.png",
    },
    {
      title: "Front Yard Landscaping Ideas That Boost Curb Appeal",
      description:
        "Enhance your home's first impression with stunning front yard designs and maintenance tips",
      slug: "front-yard-landscaping-ideas",
      image: "/front-yard-landscaping.png",
    },
    {
      title: "Japanese Garden Design: Creating Zen Outdoor Spaces",
      description:
        "Master the art of Japanese garden design with authentic elements and mindful principles",
      slug: "japanese-garden-design-guide",
      image: "/japanese-garden.png",
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

  const howToStructuredData = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to Install a Garden Pathway",
    description: "Step-by-step guide to installing a DIY garden pathway",
    image: featuredImage,
    totalTime: "PT48H",
    estimatedCost: {
      "@type": "MonetaryAmount",
      currency: "USD",
      value: "500-2000",
    },
    supply: [
      "Pathway material (stone, brick, pavers, or gravel)",
      "Base material (crushed stone)",
      "Sand or stone dust",
      "Landscape fabric",
      "Edging material",
    ],
    tool: [
      "Shovel",
      "Level",
      "Plate compactor or hand tamper",
      "Rubber mallet",
      "String line",
      "Wheelbarrow",
    ],
    step: [
      {
        "@type": "HowToStep",
        text: "Mark pathway layout with spray paint or garden hose",
      },
      {
        "@type": "HowToStep",
        text: "Excavate to appropriate depth (varies by material)",
      },
      {
        "@type": "HowToStep",
        text: "Install landscape fabric for weed prevention",
      },
      {
        "@type": "HowToStep",
        text: "Add and compact base material in 2-inch lifts",
      },
      {
        "@type": "HowToStep",
        text: "Install edging before surface material",
      },
      {
        "@type": "HowToStep",
        text: "Place surface material according to pattern",
      },
      {
        "@type": "HowToStep",
        text: "Add joint material and final compaction",
      },
    ],
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
      case "numbered-list":
        return (
          <ol key={index} className={styles.numberedList}>
            {section.content.map((item, itemIndex) => (
              <li key={itemIndex} className={styles.numberedListItem}>
                {item}
              </li>
            ))}
          </ol>
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
        <meta name="theme-color" content="#4A7C59" />
        <meta name="msapplication-TileColor" content="#4A7C59" />

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

        {/* How-To Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(howToStructuredData),
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

              {/* Material Comparison Section */}
              <section className={styles.comparisonSection}>
                <h2 className={styles.contentHeading}>
                  Garden Pathway Materials Comparison Guide
                </h2>
                <div className={styles.comparisonTable}>
                  <table className={styles.table}>
                    <thead>
                      <tr>
                        <th>Material</th>
                        <th>Initial Cost</th>
                        <th>Lifespan</th>
                        <th>Maintenance</th>
                        <th>DIY Friendly</th>
                        <th>Best Climate</th>
                        <th>Style Match</th>
                        <th>Drainage</th>
                        <th>Property Value</th>
                      </tr>
                    </thead>
                    <tbody>
                      {comparisonData.map((row, index) => (
                        <tr key={index}>
                          <td className={styles.tableCell}>{row.material}</td>
                          <td className={styles.tableCell}>
                            {row.initial_cost}
                          </td>
                          <td className={styles.tableCell}>{row.lifespan}</td>
                          <td className={styles.tableCell}>
                            {row.maintenance}
                          </td>
                          <td className={styles.tableCell}>
                            {row.diy_friendly}
                          </td>
                          <td className={styles.tableCell}>
                            {row.best_climate}
                          </td>
                          <td className={styles.tableCell}>
                            {row.style_match}
                          </td>
                          <td className={styles.tableCell}>{row.drainage}</td>
                          <td className={styles.tableCell}>
                            {row.property_value}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>

              {/* Pathway Pattern Guide */}
              <section className={styles.patternSection}>
                <h2 className={styles.contentHeading}>
                  Popular Garden Pathway Patterns and Designs
                </h2>
                <div className={styles.patternGrid}>
                  {pathwayPatterns.map((pattern, index) => (
                    <div key={index} className={styles.patternCard}>
                      <h3 className={styles.patternName}>{pattern.pattern}</h3>
                      <div className={styles.patternDetails}>
                        <span className={styles.patternDifficulty}>
                          Difficulty: {pattern.difficulty}
                        </span>
                        <span className={styles.patternMaterials}>
                          Materials: {pattern.materials}
                        </span>
                      </div>
                      <p className={styles.patternDescription}>
                        {pattern.description}
                      </p>
                      <p className={styles.patternBestFor}>
                        <strong>Best for:</strong> {pattern.best_for}
                      </p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Material Selector Interactive Section */}
              <section className={styles.materialSelector}>
                <h2 className={styles.contentHeading}>
                  Explore Pathway Materials in Detail
                </h2>
                <div className={styles.materialTabs}>
                  {Object.entries(pathwayMaterials).map(([key, material]) => (
                    <button
                      key={key}
                      className={`${styles.materialTab} ${
                        selectedMaterial === key ? styles.activeTab : ""
                      }`}
                      onClick={() => setSelectedMaterial(key)}
                    >
                      {material.name}
                    </button>
                  ))}
                </div>
                <div className={styles.materialContent}>
                  <div className={styles.materialInfo}>
                    <h3 className={styles.materialName}>
                      {pathwayMaterials[selectedMaterial].name}
                    </h3>
                    <div className={styles.materialSpecs}>
                      <div className={styles.specItem}>
                        <span className={styles.specLabel}>
                          Cost per Sq Ft:
                        </span>
                        <span className={styles.specValue}>
                          {pathwayMaterials[selectedMaterial].costPerSqFt}
                        </span>
                      </div>
                      <div className={styles.specItem}>
                        <span className={styles.specLabel}>Durability:</span>
                        <span className={styles.specValue}>
                          {pathwayMaterials[selectedMaterial].durability}
                        </span>
                      </div>
                      <div className={styles.specItem}>
                        <span className={styles.specLabel}>Maintenance:</span>
                        <span className={styles.specValue}>
                          {pathwayMaterials[selectedMaterial].maintenance}
                        </span>
                      </div>
                    </div>
                    <p className={styles.materialBestFor}>
                      <strong>Best For:</strong>{" "}
                      {pathwayMaterials[selectedMaterial].bestFor}
                    </p>
                    <div className={styles.prosConsGrid}>
                      <div className={styles.prosList}>
                        <h4 className={styles.prosTitle}>Pros:</h4>
                        <ul>
                          {pathwayMaterials[selectedMaterial].pros.map(
                            (pro, index) => (
                              <li key={index} className={styles.prosItem}>
                                <span className={styles.prosIcon}>✓</span> {pro}
                              </li>
                            )
                          )}
                        </ul>
                      </div>
                      <div className={styles.consList}>
                        <h4 className={styles.consTitle}>Cons:</h4>
                        <ul>
                          {pathwayMaterials[selectedMaterial].cons.map(
                            (con, index) => (
                              <li key={index} className={styles.consItem}>
                                <span className={styles.consIcon}>×</span> {con}
                              </li>
                            )
                          )}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Style Selector Section */}
              <section className={styles.styleSelector}>
                <h2 className={styles.contentHeading}>
                  Garden Pathway Styles for Every Home
                </h2>
                <div className={styles.styleTabs}>
                  {Object.entries(pathwayStyles).map(([key, style]) => (
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
                      {pathwayStyles[activeTab].name}
                    </h3>
                    <p className={styles.styleDescription}>
                      {pathwayStyles[activeTab].description}
                    </p>
                    <div className={styles.styleFeatures}>
                      <h4 className={styles.featuresTitle}>Key Features:</h4>
                      <ul className={styles.featuresList}>
                        {pathwayStyles[activeTab].features.map(
                          (feature, index) => (
                            <li key={index} className={styles.featureItem}>
                              <span className={styles.featureIcon}>•</span>
                              {feature}
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                    <div className={styles.styleMaterials}>
                      <h4 className={styles.materialsTitle}>
                        Recommended Materials:
                      </h4>
                      <div className={styles.materialChips}>
                        {pathwayStyles[activeTab].materials.map(
                          (material, index) => (
                            <span key={index} className={styles.materialChip}>
                              {material}
                            </span>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                  <div className={styles.colorPalette}>
                    <h4 className={styles.paletteTitle}>Color Palette:</h4>
                    <div className={styles.colorSwatches}>
                      {pathwayStyles[activeTab].colors.map((color, index) => (
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

              {/* Seasonal Maintenance Schedule */}
              <section className={styles.maintenanceSection}>
                <h2 className={styles.contentHeading}>
                  Seasonal Garden Pathway Maintenance Schedule
                </h2>
                <div className={styles.maintenanceGrid}>
                  {maintenanceSchedule.map((season, index) => (
                    <div key={index} className={styles.seasonCard}>
                      <h3 className={styles.seasonTitle}>{season.season}</h3>
                      <ul className={styles.taskList}>
                        {season.tasks.map((task, taskIndex) => (
                          <li key={taskIndex} className={styles.taskItem}>
                            <span className={styles.taskIcon}>→</span>
                            {task}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </section>

              {/* FAQ Section */}
              <section className={styles.faqSection}>
                <h2 className={styles.contentHeading}>
                  Frequently Asked Questions About Garden Pathways
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

              {/* Internal Linking Section */}
              <section className={styles.internalLinksSection}>
                <h2 className={styles.contentHeading}>
                  Complete Your Garden Design Journey
                </h2>
                <p className={styles.contentParagraph}>
                  Garden pathways are just one element of comprehensive
                  landscape design. Explore our related guides to create
                  cohesive outdoor spaces. From{" "}
                  <a
                    href="/small-garden-design-ideas"
                    className={styles.internalLink}
                  >
                    small garden design ideas
                  </a>{" "}
                  that maximize limited space to{" "}
                  <a
                    href="/garden-lighting-design-guide"
                    className={styles.internalLink}
                  >
                    garden lighting design
                  </a>{" "}
                  that extends enjoyment into evening hours, we provide
                  comprehensive guidance. Consider{" "}
                  <a
                    href="/front-yard-landscaping-ideas"
                    className={styles.internalLink}
                  >
                    front yard landscaping
                  </a>{" "}
                  to enhance curb appeal or explore{" "}
                  <a
                    href="/japanese-garden-design-guide"
                    className={styles.internalLink}
                  >
                    Japanese garden design
                  </a>{" "}
                  for zen-inspired tranquility. Each element works together to
                  create your perfect outdoor sanctuary.
                </p>
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
                      #{tag.replace(/-/g, " ")}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Related Posts Section */}
            <section className={styles.relatedPosts}>
              <h2 className={styles.contentHeading}>
                Explore More Garden Design Ideas
              </h2>
              <div className={styles.relatedGrid}>
                {relatedPosts.map((post, index) => (
                  <article key={index} className={styles.relatedPost}>
                    <div className={styles.relatedImageContainer}>
                      <img
                        src={post.image}
                        alt={post.title}
                        width={400}
                        height={250}
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
