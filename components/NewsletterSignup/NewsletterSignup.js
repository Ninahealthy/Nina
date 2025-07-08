"use client";
import React, { useState } from "react";
import { subscribeToNewsletter } from "./Newsletter"; // Adjust path as needed
import styles from "./NewsletterSignup.module.css";

const NewsletterSignup = () => {
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
        <h4 className={styles.newsletterTitle}>
          <span className={styles.titleGradient}>Stay Inspired</span>
        </h4>
        <p className={styles.newsletterDescription}>
          Get design tips, inspiration, and exclusive updates delivered to your
          inbox.
        </p>
        <form onSubmit={handleSubmit} className={styles.newsletterForm}>
          <input
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.newsletterInput}
            required
            disabled={isSubmitting}
          />
          <button
            type="submit"
            className={styles.newsletterButton}
            disabled={isSubmitting || !email}
          >
            {isSubmitting ? "Subscribing..." : "Subscribe"}
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
