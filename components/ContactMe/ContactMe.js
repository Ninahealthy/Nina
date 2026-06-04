"use client";
import React, { useState } from "react";
import { sendContactMessage } from "./ContactAction";
import styles from "./ContactMe.module.css";

const ContactForm = ({ headingLevel: HeadingTag = "h2" }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // 'success' or 'error'

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    setMessage("");
    setMessageType("");

    try {
      const result = await sendContactMessage(formData);

      if (result.success) {
        setMessage(result.message);
        setMessageType("success");
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
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
    <div className={styles.contactSection}>
      <div className={styles.contactContent}>
        <HeadingTag className={styles.contactTitle}>
          Get In Touch
        </HeadingTag>
        <p className={styles.contactDescription}>
          Have a question or want to share something? I would love to hear from
          you. Send me a message and I will get back to you soon.
        </p>

        <form onSubmit={handleSubmit} className={styles.contactForm}>
          <div className={styles.formRow}>
            <div>
              <label htmlFor="contact-name" className="visuallyHidden">
                Your name
              </label>
              <input
                id="contact-name"
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                className={styles.contactInput}
                required
                disabled={isSubmitting}
                autoComplete="name"
              />
            </div>
            <div>
              <label htmlFor="contact-email" className="visuallyHidden">
                Your email
              </label>
              <input
                id="contact-email"
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                className={styles.contactInput}
                required
                disabled={isSubmitting}
                autoComplete="email"
              />
            </div>
          </div>

          <label htmlFor="contact-subject" className="visuallyHidden">
            Subject (optional)
          </label>
          <input
            id="contact-subject"
            type="text"
            name="subject"
            placeholder="Subject (Optional)"
            value={formData.subject}
            onChange={handleChange}
            className={styles.contactInput}
            disabled={isSubmitting}
          />

          <label htmlFor="contact-message" className="visuallyHidden">
            Your message
          </label>
          <textarea
            id="contact-message"
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            className={styles.contactTextarea}
            rows="5"
            required
            disabled={isSubmitting}
          />

          <button
            type="submit"
            className={styles.contactButton}
            disabled={
              isSubmitting ||
              !formData.name ||
              !formData.email ||
              !formData.message
            }
          >
            {isSubmitting ? "Sending..." : "Send Message"}
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

export default ContactForm;
