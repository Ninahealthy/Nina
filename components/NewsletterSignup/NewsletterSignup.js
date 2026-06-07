"use client";
import React, { useState } from "react";
import { subscribeToNewsletter } from "./NewsletterAction";
import styles from "./NewsletterSignup.module.css";

/**
 * Newsletter signup with persistent floating labels.
 * Labels float above inputs on focus or when the field has content,
 * ensuring users always know which field they are filling (WCAG 1.3.1).
 */
const NewsletterSignup = ({ headingLevel: HeadingTag = "h2" }) => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // 'success' or 'error'

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    setMessage("");
    setMessageType("");

    try {
      const result = await subscribeToNewsletter(email);

      if (result.success) {
        setMessage(result.message);
        setMessageType("success");
        setEmail("");
      } else {
        setMessage(result.error);
        setMessageType("error");
      }
    } catch (error) {
      setMessage("An unexpected error occurred. Please try again.");
      setMessageType("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.newsletterSection}>
      <div className={styles.newsletterContent}>
        <HeadingTag className={styles.newsletterTitle}>
          Stay Grounded
        </HeadingTag>
        <p className={styles.newsletterDescription}>
          Gentle reflections on mindful living, delivered to your inbox.
          No noise, no rush; just a quiet moment of intention each week.
        </p>
        <form onSubmit={handleSubmit} className={styles.newsletterForm}>
          <div className={styles.floatingField}>
            <input
              id="newsletter-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles.newsletterInput}
              required
              disabled={isSubmitting}
              autoComplete="email"
              placeholder=" "
            />
            <label htmlFor="newsletter-email" className={styles.floatingLabel}>
              Email address
            </label>
          </div>
          <button
            type="submit"
            className={styles.newsletterButton}
            disabled={isSubmitting || !email}
          >
            {isSubmitting ? "Joining..." : "Join the Journey"}
          </button>
        </form>

        {message && (
          <div className={`${styles.message} ${styles[messageType]}`}>
            {message}
          </div>
        )}
      </div>
    </div>
  );
};

export default NewsletterSignup;
