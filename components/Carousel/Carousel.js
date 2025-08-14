// components/Carousel.jsx
import React, { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./carousel.module.css";

const Carousel = ({ images = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImageIndex, setModalImageIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  // Auto-advance carousel every 2 seconds
  useEffect(() => {
    setIsLoaded(true);

    if (images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 2000);

    return () => clearInterval(interval);
  }, [images.length]);

  const handleImageClick = (index) => {
    setModalImageIndex(index);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleIndicatorClick = (index) => {
    setCurrentIndex(index);
  };

  // Handle keyboard events for accessibility
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (isModalOpen && event.key === "Escape") {
        handleCloseModal();
      }
    };

    if (isModalOpen) {
      document.addEventListener("keydown", handleKeyPress);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
      document.body.style.overflow = "unset";
    };
  }, [isModalOpen]);

  if (!images || images.length === 0) {
    return (
      <div className={styles.errorMessage}>No images provided for carousel</div>
    );
  }

  return (
    <>
      <div className={`${styles.carousel} ${isLoaded ? styles.loaded : ""}`}>
        <div className={styles.imageContainer}>
          <Image
            src={images[currentIndex].src}
            alt={images[currentIndex].alt}
            width={926}
            height={616}
            className={styles.carouselImage}
            onClick={() => handleImageClick(currentIndex)}
            loading="lazy"
            /* priority={currentIndex === 0}*/
          />
          {images[currentIndex].caption && (
            <div className={styles.imageCaption}>
              {images[currentIndex].caption}
            </div>
          )}
        </div>

        {images.length > 1 && (
          <div className={styles.carouselControls}>
            <div className={styles.indicators}>
              {images.map((_, index) => (
                <button
                  key={index}
                  className={`${styles.indicator} ${
                    index === currentIndex ? styles.indicatorActive : ""
                  }`}
                  onClick={() => handleIndicatorClick(index)}
                  aria-label={`Go to image ${index + 1}`}
                  type="button"
                />
              ))}
            </div>
            <div className={styles.carouselCounter}>
              {currentIndex + 1} / {images.length}
            </div>
          </div>
        )}
      </div>

      {/* Modal for expanded view */}
      {isModalOpen && (
        <div className={styles.modalOverlay} onClick={handleCloseModal}>
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className={styles.closeButton}
              onClick={handleCloseModal}
              aria-label="Close expanded view"
              type="button"
            >
              <span className={styles.closeIcon}>X</span>
            </button>

            <div className={styles.modalImageWrapper}>
              <Image
                src={images[modalImageIndex].src}
                alt={images[modalImageIndex].alt}
                width={1200}
                height={800}
                className={styles.modalImage}
                loading="lazy"
              />
            </div>

            {images[modalImageIndex].caption && (
              <div className={styles.modalCaption}>
                {images[modalImageIndex].caption}
              </div>
            )}

            {/* Navigation arrows in modal */}
            {images.length > 1 && (
              <>
                <button
                  className={`${styles.modalArrow} ${styles.modalArrowPrev}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setModalImageIndex(
                      modalImageIndex === 0
                        ? images.length - 1
                        : modalImageIndex - 1
                    );
                  }}
                  aria-label="Previous image"
                >
                  <
                </button>
                <button
                  className={`${styles.modalArrow} ${styles.modalArrowNext}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setModalImageIndex(
                      modalImageIndex === images.length - 1
                        ? 0
                        : modalImageIndex + 1
                    );
                  }}
                  aria-label="Next image"
                >
                  >
                </button>
                <div className={styles.modalCounter}>
                  {modalImageIndex + 1} / {images.length}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Carousel;
