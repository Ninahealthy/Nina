"use client";
import { useActionState } from "react";
import Form from "next/form";
import { sendEmail } from "@/app/actions/Contact";
import styles from "./Contact.module.css";

export default function ContactPage() {
  const [state, action, pending] = useActionState(sendEmail, {
    message: "",
    success: false,
    errors: {},
  });

  return (
    <div className={styles.contact}>
      <div className={styles.container}>
        <h1 className={styles.title}>Contact Me</h1>

        {state.message && (
          <div
            className={`${styles.alert} ${
              state.success ? styles.success : styles.error
            }`}
          >
            {state.message}
          </div>
        )}

        <Form action={action}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Name</label>
            <input
              name="name"
              className={styles.input}
              required
              disabled={pending || state.success}
            />
            {state.errors?.name && (
              <span className={styles.errorText}>{state.errors.name}</span>
            )}
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Email</label>
            <input
              name="email"
              type="email"
              className={styles.input}
              required
              disabled={pending || state.success}
            />
            {state.errors?.email && (
              <span className={styles.errorText}>{state.errors.email}</span>
            )}
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Message</label>
            <textarea
              name="message"
              rows="4"
              className={`${styles.input} ${styles.textarea}`}
              required
              disabled={pending || state.success}
            />
            {state.errors?.message && (
              <span className={styles.errorText}>{state.errors.message}</span>
            )}
          </div>

          <button
            type="submit"
            className={`${styles.button} ${
              pending ? styles.buttonPending : ""
            }`}
            disabled={pending || state.success}
          >
            {pending ? (
              <span className={styles.buttonContent}>
                <span className={styles.spinner} />
                Sending...
              </span>
            ) : state.success ? (
              "Message Sent!"
            ) : (
              "Send Message"
            )}
          </button>
        </Form>
      </div>{" "}
    </div>
  );
}
