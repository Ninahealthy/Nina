"use client";
import Link from "next/link";
import Image from "next/image";
import styles from "./HomeDecor.module.css";
import { useState, useEffect } from "react";
import { useSearch } from "../../contexts/SearchContext";

const PinterestBoard = () => {
  const { searchQuery } = useSearch();
  const [filteredPins, setFilteredPins] = useState([]);

  useEffect(() => {
    const pins = [
      {
        id: 1,
        title: "Maximizing Storage in Tiny Bathrooms: 15 Clever Solutions",
        description:
          "Transform your small bathroom with these ingenious storage hacks that don't sacrifice style for function",
        imageClass: styles.livingRoom,
        featuredImage: "/large-round-miror.png", // Add featured image path
        badge: "TRENDING",
        slug: "/small-bathroom-storage-solutions",
      },
      /*{
        id: 2,
        title: "Modern Farmhouse Kitchen Ideas",
        description:
          "Rustic charm meets contemporary functionality in this stunning kitchen design",
        imageClass: styles.kitchen,
        featuredImage: "/images/modern-farmhouse-kitchen.jpg",
        badge: null,
        slug: "modern-farmhouse-kitchen-ideas",
      },
      {
        id: 3,
        title: "Bohemian Bedroom Retreat",
        description:
          "Warm earth tones and layered textiles for a cozy, eclectic bedroom vibe",
        imageClass: styles.bedroom,
        featuredImage: "/images/bohemian-bedroom.jpg",
        badge: null,
        slug: "bohemian-bedroom-retreat",
      },
      {
        id: 4,
        title: "Spa-Inspired Bathroom Design",
        description:
          "Transform your bathroom into a luxurious spa retreat with these calming elements",
        imageClass: styles.bathroom,
        featuredImage: "/images/spa-bathroom-design.jpg",
        badge: "HOT",
        slug: "spa-inspired-bathroom-design",
      },
      {
        id: 5,
        title: "Elegant Dining Room Makeover",
        description:
          "Create memorable dining experiences with sophisticated decor and ambient lighting",
        imageClass: styles.dining,
        featuredImage: "/images/elegant-dining-room.jpg",
        badge: null,
        slug: "elegant-dining-room-makeover",
      },
      {
        id: 6,
        title: "Home Office Organization Ideas",
        description:
          "Boost productivity with these stylish and functional workspace solutions",
        imageClass: styles.office,
        featuredImage: "/images/home-office-organization.jpg",
        badge: null,
        slug: "home-office-organization-ideas",
      },
      {
        id: 7,
        title: "Cozy Outdoor Living Space",
        description:
          "Extend your home's comfort outdoors with these patio and garden decor ideas",
        imageClass: styles.outdoor,
        featuredImage: "/images/cozy-outdoor-living.jpg",
        badge: "NEW",
        slug: "cozy-outdoor-living-space",
      },
      {
        id: 8,
        title: "Gallery Wall Inspiration",
        description:
          "Curate the perfect art collection to showcase your personal style",
        imageClass: styles.decor,
        featuredImage: "/images/gallery-wall-inspiration.jpg",
        badge: null,
        slug: "gallery-wall-inspiration",
      },
      {
        id: 9,
        title: "Statement Lighting Ideas",
        description:
          "Illuminate your space with these eye-catching pendant lights and chandeliers",
        imageClass: styles.lighting,
        featuredImage: "/images/statement-lighting.jpg",
        badge: null,
        slug: "statement-lighting-ideas",
      },
      {
        id: 10,
        title: "Creative Storage Solutions",
        description:
          "Maximize space while maintaining style with these clever organization hacks",
        imageClass: styles.storage,
        featuredImage: "/images/creative-storage-solutions.jpg",
        badge: null,
        slug: "creative-storage-solutions",
      },
      {
        id: 11,
        title: "Indoor Plant Paradise",
        description:
          "Bring nature indoors with these gorgeous houseplant arrangements",
        imageClass: styles.plants,
        featuredImage: "/images/indoor-plant-paradise.jpg",
        badge: "VIRAL",
        slug: "indoor-plant-paradise",
      },
      {
        id: 12,
        title: "Textile Layering Techniques",
        description:
          "Master the art of mixing patterns, textures, and colors for cozy interiors",
        imageClass: styles.textiles,
        featuredImage: "/images/textile-layering.jpg",
        badge: null,
        slug: "textile-layering-techniques",
      },*/
    ];

    if (searchQuery === "") {
      setFilteredPins(pins);
    } else {
      const filtered = pins.filter((pin) => {
        const query = searchQuery.toLowerCase();
        return (
          pin.title.toLowerCase().includes(query) ||
          pin.description.toLowerCase().includes(query)
        );
      });
      setFilteredPins(filtered);
    }
  }, [searchQuery]);

  return (
    <div className={styles.pinterestContainer}>
      <div className={styles.boardHeader}>
        <h1 className={styles.boardTitle}>✨ Cozy Modern Living</h1>
        <p className={styles.boardDescription}>
          Discover beautiful home decor ideas that blend comfort with
          contemporary style. From minimalist living rooms to cozy bedrooms,
          find inspiration for every space in your home.
        </p>
        <div className={styles.boardStats}>
          <div className={styles.stat}>
            <span className={styles.statNumber}>2.3M</span>
            <span className={styles.statLabel}>followers</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statNumber}>847</span>
            <span className={styles.statLabel}>pins</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statNumber}>156K</span>
            <span className={styles.statLabel}>saves</span>
          </div>
        </div>
      </div>

      {searchQuery && (
        <div className={styles.searchResults}>
          <p>
            Showing {filteredPins.length} results for "{searchQuery}"
          </p>
        </div>
      )}

      <div className={styles.pinsGrid}>
        {filteredPins.map((pin) => (
          <div key={pin.id} className={styles.pin}>
            <Link href={`/HomeDecor/${pin.slug}`} className={styles.pinLink}>
              <div className={`${styles.pinImage} ${pin.imageClass}`}>
                {pin.featuredImage && (
                  <Image
                    src={pin.featuredImage}
                    alt={pin.title}
                    fill
                    className={styles.featuredImage}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority={pin.id <= 3} // Prioritize loading for first 3 images
                  />
                )}
                {pin.badge && (
                  <div className={styles.trendingBadge}>{pin.badge}</div>
                )}
                <div className={styles.pinOverlay}>Read Full Article</div>
              </div>
            </Link>
            <div className={styles.pinContent}>
              <h3 className={styles.pinTitle}>{pin.title}</h3>
              <p className={styles.pinDescription}>{pin.description}</p>
              <Link
                href={`/HomeDecor/${pin.slug}`}
                className={styles.takeALookButton}
              >
                Take a Look
              </Link>
            </div>
          </div>
        ))}
      </div>

      {searchQuery && filteredPins.length === 0 && (
        <div className={styles.noResults}>
          <p>No results found for "{searchQuery}". Try different keywords!</p>
        </div>
      )}
    </div>
  );
};

export default PinterestBoard;
