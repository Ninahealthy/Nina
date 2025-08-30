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
          <div className={styles.verifiedBadge}>
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              className={styles.verifiedIcon}
            >
              <path
                d="M22.25 12c0-1.43-.88-2.67-2.19-3.34.46-1.39.2-2.9-.81-3.91s-2.52-1.27-3.91-.81c-.66-1.31-1.91-2.19-3.34-2.19s-2.67.88-3.33 2.19c-1.4-.46-2.91-.2-3.92.81s-1.26 2.52-.8 3.91c-1.31.67-2.2 1.91-2.2 3.34s.89 2.67 2.2 3.34c-.46 1.39-.21 2.9.8 3.91s2.52 1.26 3.91.81c.67 1.31 1.91 2.19 3.34 2.19s2.68-.88 3.34-2.19c1.39.45 2.9.2 3.91-.81s1.27-2.52.81-3.91c1.31-.67 2.19-1.91 2.19-3.34zm-11.71 4.2L6.8 12.46l1.41-1.42 2.26 2.26 4.8-5.23 1.47 1.36-6.2 6.77z"
                fill="#1DA1F2"
              />
            </svg>
          </div>
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
          <Link href="/garden" onClick={handleNavClick}>
            Garden
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
                <div className={styles.mobileVerifiedBadge}>
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    className={styles.mobileVerifiedIcon}
                  >
                    <path
                      d="M22.25 12c0-1.43-.88-2.67-2.19-3.34.46-1.39.2-2.9-.81-3.91s-2.52-1.27-3.91-.81c-.66-1.31-1.91-2.19-3.34-2.19s-2.67.88-3.33 2.19c-1.4-.46-2.91-.2-3.92.81s-1.26 2.52-.8 3.91c-1.31.67-2.2 1.91-2.2 3.34s.89 2.67 2.2 3.34c-.46 1.39-.21 2.9.8 3.91s2.52 1.26 3.91.81c.67 1.31 1.91 2.19 3.34 2.19s2.68-.88 3.34-2.19c1.39.45 2.9.2 3.91-.81s1.27-2.52.81-3.91c1.31-.67 2.19-1.91 2.19-3.34zm-11.71 4.2L6.8 12.46l1.41-1.42 2.26 2.26 4.8-5.23 1.47 1.36-6.2 6.77z"
                      fill="#1DA1F2"
                    />
                  </svg>
                </div>
              </Link>
            </div>
            <div className={styles.mobileMenuItems}>
              <Link href="/garden" onClick={handleNavClick}>
                <span className={styles.menuIcon}>🌿</span>
                Garden
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
