"use client";
import { useState, useCallback } from "react";
import styles from "./Accordion.module.css";

/**
 * Accessible accordion component with expand/collapse all toggle.
 *
 * @param {Object[]} items - Array of { question, answer }
 * @param {boolean} [showExpandAll=false] - Whether to show the Expand All control
 */
const Accordion = ({ items, showExpandAll = false }) => {
  const [openIndices, setOpenIndices] = useState(new Set());

  const toggle = useCallback((index) => {
    setOpenIndices((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  }, []);

  const allExpanded = openIndices.size === items.length;

  const toggleAll = useCallback(() => {
    if (allExpanded) {
      setOpenIndices(new Set());
    } else {
      setOpenIndices(new Set(items.map((_, i) => i)));
    }
  }, [allExpanded, items]);

  return (
    <div className={styles.accordion}>
      {showExpandAll && items.length > 1 && (
        <div className={styles.expandAllWrapper}>
          <button
            type="button"
            className={styles.expandAllButton}
            onClick={toggleAll}
            aria-label={allExpanded ? "Collapse all items" : "Expand all items"}
          >
            {allExpanded ? "Collapse all" : "Expand all"}
          </button>
        </div>
      )}
      {items.map((item, i) => {
        const isOpen = openIndices.has(i);
        const panelId = `accordion-panel-${i}`;
        const triggerId = `accordion-trigger-${i}`;

        return (
          <div key={i} className={styles.item}>
            <h3 className={styles.heading}>
              <button
                id={triggerId}
                className={`${styles.trigger} ${isOpen ? styles.triggerOpen : ""}`}
                onClick={() => toggle(i)}
                aria-expanded={isOpen}
                aria-controls={panelId}
              >
                <span className={styles.triggerText}>{item.question}</span>
                <span className={styles.icon} aria-hidden="true">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6 9L12 15L18 9"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={triggerId}
              className={`${styles.panel} ${isOpen ? styles.panelOpen : ""}`}
              hidden={!isOpen}
            >
              <p className={styles.answer}>{item.answer}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Accordion;
