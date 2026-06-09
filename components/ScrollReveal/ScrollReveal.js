"use client";
import { motion, useReducedMotion } from "framer-motion";
import styles from "./ScrollReveal.module.css";

/**
 * Wrapper component that reveals children with a gentle fade-up animation
 * when they scroll into the viewport. Uses framer-motion's whileInView.
 *
 * @param {React.ReactNode} children - Content to reveal
 * @param {number} [delay=0] - Delay in milliseconds before animation starts
 * @param {number} [stagger=0] - Stagger delay between children (seconds). When set, wraps children in a motion container with staggerChildren orchestration.
 */
const ScrollReveal = ({ children, delay = 0, stagger = 0 }) => {
  const shouldReduceMotion = useReducedMotion();

  /* When reduced motion is preferred, render a plain wrapper with no animation */
  if (shouldReduceMotion) {
    return <div className={styles.wrapper}>{children}</div>;
  }

  const containerVariants = stagger
    ? {
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { staggerChildren: stagger },
        },
      }
    : undefined;

  return (
    <motion.div
      className={styles.wrapper}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "0px 0px -40px 0px" }}
      variants={
        containerVariants || {
          hidden: { opacity: 0, y: 20 },
          visible: {
            opacity: 1,
            y: 0,
            transition: {
              duration: 0.6,
              ease: [0.4, 0, 0.2, 1],
              delay: delay / 1000,
            },
          },
        }
      }
    >
      {children}
    </motion.div>
  );
};

/**
 * Child wrapper for staggered reveal. Use inside a ScrollReveal with stagger > 0.
 * Each ScrollRevealItem animates individually according to the parent's stagger timing.
 */
export const ScrollRevealItem = ({ children, className = "" }) => {
  return (
    <motion.div
      className={className || undefined}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.5,
            ease: [0.4, 0, 0.2, 1],
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
};

export default ScrollReveal;
