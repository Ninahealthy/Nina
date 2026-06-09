"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import styles from "./DailyIntention.module.css";

const DailyIntention = () => {
  const [intention, setIntention] = useState("");
  const [previousIntention, setPreviousIntention] = useState("");
  const [saved, setSaved] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const stored = localStorage.getItem("nina-intention");
    const storedDate = localStorage.getItem("nina-intention-date");
    const today = new Date().toDateString();

    if (stored && storedDate === today) {
      setIntention(stored);
      setSaved(true);
    } else if (stored) {
      setPreviousIntention(stored);
    }
  }, []);

  const handleSave = () => {
    if (!intention.trim()) return;
    localStorage.setItem("nina-intention", intention);
    localStorage.setItem("nina-intention-date", new Date().toDateString());
    setSaved(true);
  };

  const handleEdit = () => {
    setSaved(false);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <h3 className={styles.title}>Your Intention for Today</h3>
        <AnimatePresence mode="wait">
          {saved ? (
            <motion.div
              key="saved"
              className={styles.savedState}
              initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
            >
              <p className={styles.savedIntention}>{intention}</p>
              <button className={styles.editButton} onClick={handleEdit}>
                Change intention
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="input"
              className={styles.inputState}
              initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
            >
              {previousIntention && (
                <p className={styles.previousLabel}>
                  Yesterday: <span className={styles.previousText}>{previousIntention}</span>
                </p>
              )}
              <label htmlFor="daily-intention" className="visuallyHidden">
                Set your intention for today
              </label>
              <textarea
                id="daily-intention"
                className={styles.input}
                placeholder="What do you want to carry with you today?"
                value={intention}
                onChange={(e) => setIntention(e.target.value)}
                rows="2"
                maxLength={200}
              />
              <button
                className={styles.saveButton}
                onClick={handleSave}
                disabled={!intention.trim()}
              >
                Set Intention
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default DailyIntention;
