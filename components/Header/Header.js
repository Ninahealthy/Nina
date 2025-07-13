// components/Header/Header.js
"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearch } from "../../contexts/SearchContext";
import styles from "./Header.module.css";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const { searchQuery, handleSearch } = useSearch();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Show header when at top of page
      if (currentScrollY < 10) {
        setIsVisible(true);
      }
      // Hide header when scrolling down, show when scrolling up
      else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY) {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Cleanup
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    handleSearch(value);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleNavClick = () => {
    closeMenu();
  };

  return (
    <header
      className={`${styles.header} ${
        isVisible ? styles.visible : styles.hidden
      }`}
    >
      <div className={styles.headerContent}>
        <Link href="/" className={styles.logoContainer}>
          <div className={styles.logoAvatar}>
            <Image
              src="/nina.jpg"
              alt="Nina - Interior Design Expert"
              className={styles.logoImage}
              width="1080"
              height="1080"
              priority
            />
          </div>
          <span className={styles.logo}>Nina</span>
        </Link>

        {/* Search Bar 
        <div className={styles.searchBar}>
          <input
            type="text"
            placeholder="Search inspiration..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <div className={styles.searchIcon}>🔍</div>
        </div>*/}

        {/* Desktop Navigation */}
        <nav className={styles.nav}>
          <Link href="/" onClick={handleNavClick}>
            Home
          </Link>
          <Link href="/HomeDecor" onClick={handleNavClick}>
            Home Decor
          </Link>
          <Link href="/Lifestyle" onClick={handleNavClick}>
            Lifestyle
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className={styles.menuToggle}
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <div
            className={`${styles.hamburger} ${
              isMenuOpen ? styles.hamburgerOpen : ""
            }`}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className={styles.mobileMenuOverlay} onClick={closeMenu}>
          <nav
            className={styles.mobileMenu}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.mobileMenuHeader}>
              <Link
                href="/"
                className={styles.mobileMenuLogoContainer}
                onClick={handleNavClick}
              >
                <div className={styles.mobileMenuLogoAvatar}>
                  <Image
                    src="/nina.jpg"
                    alt="Nina - Interior Design Expert"
                    className={styles.mobileMenuLogoImage}
                    width="1080"
                    height="1080"
                  />
                </div>
                <span className={styles.mobileMenuLogo}>Nina</span>
              </Link>
            </div>
            <div className={styles.mobileMenuItems}>
              <Link href="/" onClick={handleNavClick}>
                <span className={styles.menuIcon}>🏠</span>
                Home
              </Link>
              <Link href="/HomeDecor" onClick={handleNavClick}>
                <span className={styles.menuIcon}>🎨</span>
                Home Decor
              </Link>
              <Link href="/Lifestyle" onClick={handleNavClick}>
                <span className={styles.menuIcon}>✨</span>
                Lifestyle
              </Link>
            </div>
            <div className={styles.mobileSearchBar}>
              {/* <input
                type="text"
                placeholder="Search inspiration..."
                value={searchQuery}
                onChange={handleSearchChange}
              />*/}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
