"use client";
import { useRef } from "react";
import styles from "./TestimonialCarousel.module.css";

const TESTIMONIALS = [
  {
    quote:
      "Reading Nina's journal feels like a deep breath I did not know I was holding. Every piece reminds me to slow down.",
    author: "A reader from Portland",
  },
  {
    quote:
      "I started doing the morning rituals from this site three months ago. My mornings are calmer, and that calm follows me into the day.",
    author: "A newsletter subscriber",
  },
  {
    quote:
      "This is the only website that does not make me feel like I need to be more. It lets me be where I am.",
    author: "A returning visitor",
  },
  {
    quote:
      "The breathing exercises changed how I handle stress at work. Simple, but profoundly effective.",
    author: "A grateful reader",
  },
  {
    quote:
      "I keep coming back to 'The Art of Doing Nothing.' It gave me permission to rest without guilt.",
    author: "A journal reader",
  },
];

const TestimonialCarousel = () => {
  const scrollRef = useRef(null);

  return (
    <div className={styles.wrapper}>
      <div className={styles.scrollContainer} ref={scrollRef}>
        {TESTIMONIALS.map((item, i) => (
          <blockquote key={i} className={styles.card}>
            <svg
              className={styles.quoteIcon}
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M3 21C3 21 4 17 4 14C4 11 2 10 2 7C2 4 4 2 7 2C10 2 12 4 12 7C12 13 7 17 3 21Z"
                fill="currentColor"
                opacity="0.15"
              />
              <path
                d="M14 21C14 21 15 17 15 14C15 11 13 10 13 7C13 4 15 2 18 2C21 2 23 4 23 7C23 13 18 17 14 21Z"
                fill="currentColor"
                opacity="0.15"
              />
            </svg>
            <p className={styles.quote}>{item.quote}</p>
            <cite className={styles.author}>{item.author}</cite>
          </blockquote>
        ))}
      </div>
    </div>
  );
};

export default TestimonialCarousel;
