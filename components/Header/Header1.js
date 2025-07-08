// components/Header/Header.js
"use client";
import { useState } from "react";
import Link from "next/link";
import { useSearch } from "../../contexts/SearchContext";
import styles from "./Header.module.css";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { searchQuery, handleSearch } = useSearch();

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
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <Link href="/" className={styles.logo}>
          Nina
        </Link>

        {/* Search Bar */}
        <div className={styles.searchBar}>
          <input
            type="text"
            placeholder="Search inspiration..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <div className={styles.searchIcon}>🔍</div>
        </div>

        {/* Desktop Navigation */}
        <nav className={styles.nav}>
          <Link href="/" onClick={handleNavClick}>
            Home
          </Link>
          <Link href="/HomeDecor" onClick={handleNavClick}>
            Decor
          </Link>
          <Link href="/lifestyle" onClick={handleNavClick}>
            Lifestyle
          </Link>
          <Link href="/diy" onClick={handleNavClick}>
            DIY
          </Link>
          <Link href="/about" onClick={handleNavClick}>
            About
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className={styles.menuToggle}
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span
            className={`${styles.hamburger} ${
              isMenuOpen ? styles.hamburgerOpen : ""
            }`}
          >
            <span></span>
            <span></span>
            <span></span>
          </span>
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
                className={styles.mobileMenuLogo}
                onClick={handleNavClick}
              >
                Nina
              </Link>
              <button
                className={styles.closeButton}
                onClick={closeMenu}
                aria-label="Close menu"
              >
                ✕
              </button>
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
              <Link href="/lifestyle" onClick={handleNavClick}>
                <span className={styles.menuIcon}>✨</span>
                Lifestyle
              </Link>
              <Link href="/diy" onClick={handleNavClick}>
                <span className={styles.menuIcon}>🔨</span>
                DIY
              </Link>
              <Link href="/about" onClick={handleNavClick}>
                <span className={styles.menuIcon}>💫</span>
                About
              </Link>
            </div>
            <div className={styles.mobileSearchBar}>
              <input
                type="text"
                placeholder="Search inspiration..."
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
