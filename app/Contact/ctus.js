"use client";
// pages/contact.js
import { useState } from "react";
import styles from "@/styles/Contact.module.css";

export default function Contact() {
  // state variables for the form inputs
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  // state variable for the form submission status
  const [status, setStatus] = useState("");

  // handle form submit event
  const handleSubmit = async (e) => {
    e.preventDefault();
    // send a POST request to the API route
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, subject, message }),
    });
    // get the response data
    const data = await res.json();
    // set the status based on the response
    if (data.success) {
      setStatus("Your message has been sent successfully!");
      // reset the form inputs
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
    } else {
      setStatus("Something went wrong. Please try again.");
    }
  };

  return (
    <div className={styles.container}>
      <h1>Contact Us</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.inputGroup}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="subject">Subject</label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            name="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          ></textarea>
        </div>
        <button type="submit" className={styles.submitButton}>
          Send
        </button>
      </form>
      <p className={styles.status}>{status}</p>
    </div>
  );
}
