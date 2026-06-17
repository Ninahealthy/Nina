"use client";
import { useRef, useEffect, useState, createContext, useContext } from "react";

/** Context to pass parent visibility + stagger timing to children */
const RevealContext = createContext({ isVisible: false, stagger: 0 });

/**
 * Reveals children with a fade-up animation when they scroll into view.
 * Uses native IntersectionObserver + inline styles for reliability.
 *
 * @param {React.ReactNode} children - Content to reveal
 * @param {number} [delay=0] - Extra delay in milliseconds
 * @param {number} [stagger=0] - Stagger delay between children (seconds).
 *   When > 0, wrap each child in ScrollRevealItem for sequential animation.
 */
const ScrollReveal = ({ children, delay = 0, stagger = 0 }) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(element);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const hasStagger = stagger > 0;

  /* Non-stagger: the wrapper itself animates */
  const wrapperStyle = hasStagger
    ? { width: "100%" }
    : {
        width: "100%",
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(32px)",
        transition: `opacity 0.9s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform 0.9s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
      };

  return (
    <RevealContext.Provider value={{ isVisible, stagger }}>
      <div ref={ref} style={wrapperStyle}>
        {children}
      </div>
    </RevealContext.Provider>
  );
};

/** Internal counter to assign sequential indices to stagger items */
let itemCounter = 0;

/**
 * Child wrapper for staggered reveal. Each item animates individually
 * with an incrementing delay based on the parent's stagger timing.
 * Must be used inside a ScrollReveal with stagger > 0.
 */
export const ScrollRevealItem = ({ children, className = "" }) => {
  const { isVisible, stagger } = useContext(RevealContext);
  const [index, setIndex] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    /* Determine this item's position among siblings for stagger delay */
    const el = ref.current;
    if (!el || !el.parentElement) return;
    const siblings = el.parentElement.querySelectorAll("[data-reveal-item]");
    const idx = Array.from(siblings).indexOf(el);
    setIndex(idx >= 0 ? idx : 0);
  }, []);

  const delayMs = index * stagger * 1000;

  const style = {
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? "translateY(0)" : "translateY(32px)",
    transition: `opacity 0.75s cubic-bezier(0.16, 1, 0.3, 1) ${delayMs}ms, transform 0.75s cubic-bezier(0.16, 1, 0.3, 1) ${delayMs}ms`,
  };

  return (
    <div ref={ref} data-reveal-item="" className={className || undefined} style={style}>
      {children}
    </div>
  );
};

export default ScrollReveal;
