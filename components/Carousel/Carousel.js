"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import styles from "./carousel.module.css";

const Carousel = ({ images = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImageIndex, setModalImageIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [dragOffset, setDragOffset] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showModalControls, setShowModalControls] = useState(true);

  const [slideDirection, setSlideDirection] = useState("");
  const [modalSlideDirection, setModalSlideDirection] = useState("");

  const carouselRef = useRef(null);
  const modalRef = useRef(null);
  const intervalRef = useRef(null);
  const dragThreshold = 50;
  const modalDragThreshold = 80;

  // Replace the problematic useEffect with these two separate ones:

  // 1. Handle initial loading (runs once)
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // 2. Handle auto-advance separately with better control
  useEffect(() => {
    // Don't auto-advance if there's only one image or less
    if (images.length <= 1 || isDragging || isModalOpen) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      return;
    }

    // Clear any existing interval first
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    // Start new interval
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = prevIndex === images.length - 1 ? 0 : prevIndex + 1;
        return nextIndex;
      });
    }, 4000);

    // Cleanup
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [images.length, isDragging, isModalOpen]); // Keep dependencies but simplified logic

  // 3. Handle transitions separately (optional - you can remove the transition animations for now)
  useEffect(() => {
    if (slideDirection) {
      setIsTransitioning(true);
      const timer = setTimeout(() => {
        setIsTransitioning(false);
        setSlideDirection("");
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [slideDirection]);

  // 4. Also update your nextImage and prevImage functions to be simpler:
  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  // Auto-advance carousel
  /* useEffect(() => {
    setIsLoaded(true);

    if (images.length <= 1) return;

    const startInterval = () => {
      intervalRef.current = setInterval(() => {
        setIsTransitioning(true);
        setSlideDirection("next");
        setCurrentIndex((prevIndex) => {
          const nextIndex = prevIndex === images.length - 1 ? 0 : prevIndex + 1;
          setTimeout(() => {
            setIsTransitioning(false);
            setSlideDirection("");
          }, 500);
          return nextIndex;
        });
      }, 4000);
    };

    if (!isDragging && !isModalOpen) {
      startInterval();
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [images.length, isDragging, isModalOpen]);

  const nextImage = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setSlideDirection("next");
    setCurrentIndex((prev) => {
      const next = (prev + 1) % images.length;
      setTimeout(() => {
        setIsTransitioning(false);
        setSlideDirection("");
      }, 500);
      return next;
    });
  };

  const prevImage = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setSlideDirection("prev");
    setCurrentIndex((prev) => {
      const next = (prev - 1 + images.length) % images.length;
      setTimeout(() => {
        setIsTransitioning(false);
        setSlideDirection("");
      }, 500);
      return next;
    });
  };*/

  const nextModalImage = () => {
    setModalSlideDirection("next");
    setModalImageIndex((prev) => {
      const next = (prev + 1) % images.length;
      setTimeout(() => setModalSlideDirection(""), 500);
      return next;
    });
  };

  const prevModalImage = () => {
    setModalSlideDirection("prev");
    setModalImageIndex((prev) => {
      const next = (prev - 1 + images.length) % images.length;
      setTimeout(() => setModalSlideDirection(""), 500);
      return next;
    });
  };

  // Carousel touch/mouse handlers
  const handleCarouselStart = (clientX, clientY) => {
    if (isTransitioning) return;
    setIsDragging(true);
    setDragStart({ x: clientX, y: clientY });
    setDragOffset(0);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  const handleCarouselMove = (clientX) => {
    if (!isDragging || isTransitioning) return;
    const deltaX = clientX - dragStart.x;
    setDragOffset(deltaX);
  };

  const handleCarouselEnd = () => {
    if (!isDragging) return;

    if (Math.abs(dragOffset) > dragThreshold) {
      if (dragOffset > 0) {
        prevImage();
      } else {
        nextImage();
      }
    }

    setIsDragging(false);
    setDragOffset(0);
  };

  // Modal touch/mouse handlers
  const handleModalStart = (clientX, clientY) => {
    setIsDragging(true);
    setDragStart({ x: clientX, y: clientY });
    setDragOffset(0);
  };

  const handleModalMove = (clientX) => {
    if (!isDragging) return;
    const deltaX = clientX - dragStart.x;
    setDragOffset(deltaX);
  };

  const handleModalEnd = () => {
    if (!isDragging) return;

    if (Math.abs(dragOffset) > modalDragThreshold) {
      if (dragOffset > 0) {
        prevModalImage();
      } else {
        nextModalImage();
      }
    }

    setIsDragging(false);
    setDragOffset(0);
  };

  // Handle image click for toggling modal controls
  const handleModalImageClick = () => {
    if (!isDragging && Math.abs(dragOffset) < 10) {
      setShowModalControls((prev) => !prev);
    }
  };

  const handleImageClick = (index) => {
    if (!isDragging && Math.abs(dragOffset) < 10) {
      setModalImageIndex(index);
      setIsModalOpen(true);
      setShowModalControls(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setDragOffset(0);
    setIsDragging(false);
    setModalSlideDirection("");
    setShowModalControls(true);
  };

  const handleIndicatorClick = (index) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    const direction = index > currentIndex ? "next" : "prev";
    setSlideDirection(direction);
    setCurrentIndex(index);
    setTimeout(() => {
      setIsTransitioning(false);
      setSlideDirection("");
    }, 500);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (isModalOpen) {
        if (event.key === "Escape") {
          handleCloseModal();
        } else if (event.key === "ArrowLeft") {
          prevModalImage();
        } else if (event.key === "ArrowRight") {
          nextModalImage();
        }
      } else {
        if (event.key === "ArrowLeft") {
          prevImage();
        } else if (event.key === "ArrowRight") {
          nextImage();
        }
      }
    };

    document.addEventListener("keydown", handleKeyPress);

    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
      document.body.style.overflow = "unset";
    };
  }, [isModalOpen, images.length]);

  // Prevent context menu on long press
  useEffect(() => {
    const preventContextMenu = (e) => {
      if (isDragging) {
        e.preventDefault();
      }
    };

    document.addEventListener("contextmenu", preventContextMenu);
    return () =>
      document.removeEventListener("contextmenu", preventContextMenu);
  }, [isDragging]);

  if (!images || images.length === 0) {
    return (
      <div className={styles.errorMessage}>No images provided for carousel</div>
    );
  }

  return (
    <>
      {/* Main Carousel */}
      <div className={`${styles.carousel} ${isLoaded ? styles.loaded : ""}`}>
        <div
          ref={carouselRef}
          className={`${styles.imageContainer} ${
            isDragging ? styles.dragging : ""
          } ${
            slideDirection
              ? styles[
                  `sliding${
                    slideDirection.charAt(0).toUpperCase() +
                    slideDirection.slice(1)
                  }`
                ]
              : ""
          }`}
          onMouseDown={(e) => {
            e.preventDefault();
            handleCarouselStart(e.clientX, e.clientY);
          }}
          onMouseMove={(e) => handleCarouselMove(e.clientX)}
          onMouseUp={handleCarouselEnd}
          onMouseLeave={handleCarouselEnd}
          onTouchStart={(e) => {
            handleCarouselStart(e.touches[0].clientX, e.touches[0].clientY);
          }}
          onTouchMove={(e) => {
            if (isDragging) {
              e.preventDefault();
            }
            handleCarouselMove(e.touches[0].clientX);
          }}
          onTouchEnd={handleCarouselEnd}
        >
          <div className={styles.imageWrapper}>
            <Image
              src={images[currentIndex].src}
              alt={images[currentIndex].alt}
              width={400}
              height={600}
              className={`${styles.carouselImage} ${
                slideDirection
                  ? styles[
                      `imageSlide${
                        slideDirection.charAt(0).toUpperCase() +
                        slideDirection.slice(1)
                      }`
                    ]
                  : ""
              }`}
              onClick={() => handleImageClick(currentIndex)}
              priority={currentIndex === 0}
              draggable={false}
            />
          </div>

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
                  disabled={isTransitioning}
                />
              ))}
            </div>
            <div className={styles.carouselCounter}>
              {currentIndex + 1} of {images.length}
            </div>
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className={styles.modalOverlay} onClick={handleCloseModal}>
          <div
            ref={modalRef}
            className={`${styles.modalContent} ${
              isDragging ? styles.modalDragging : ""
            } ${
              modalSlideDirection
                ? styles[
                    `modalSliding${
                      modalSlideDirection.charAt(0).toUpperCase() +
                      modalSlideDirection.slice(1)
                    }`
                  ]
                : ""
            }`}
            onClick={(e) => e.stopPropagation()}
            onMouseDown={(e) => {
              e.preventDefault();
              handleModalStart(e.clientX, e.clientY);
            }}
            onMouseMove={(e) => handleModalMove(e.clientX)}
            onMouseUp={handleModalEnd}
            onMouseLeave={handleModalEnd}
            onTouchStart={(e) => {
              handleModalStart(e.touches[0].clientX, e.touches[0].clientY);
            }}
            onTouchMove={(e) => {
              if (isDragging) {
                e.preventDefault();
              }
              handleModalMove(e.touches[0].clientX);
            }}
            onTouchEnd={handleModalEnd}
          >
            <button
              className={`${styles.closeButton} ${
                showModalControls ? styles.show : styles.hide
              }`}
              onClick={handleCloseModal}
              aria-label="Close expanded view"
              type="button"
            >
              <span className={styles.closeIcon}>×</span>
            </button>

            <div className={styles.modalImageWrapper}>
              <Image
                src={images[modalImageIndex].src}
                alt={images[modalImageIndex].alt}
                width={928}
                height={1664}
                className={`${styles.modalImage} ${
                  modalSlideDirection
                    ? styles[
                        `modalImageSlide${
                          modalSlideDirection.charAt(0).toUpperCase() +
                          modalSlideDirection.slice(1)
                        }`
                      ]
                    : ""
                }`}
                onClick={handleModalImageClick}
                priority
                draggable={false}
              />
            </div>

            {images[modalImageIndex].caption && (
              <div
                className={`${styles.modalCaption} ${
                  showModalControls ? styles.show : styles.hide
                }`}
              >
                {images[modalImageIndex].caption}
              </div>
            )}

            {images.length > 1 && (
              <>
                <button
                  className={`${styles.modalArrow} ${styles.modalArrowPrev} ${
                    showModalControls ? styles.show : styles.hide
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    prevModalImage();
                  }}
                  aria-label="Previous image"
                  type="button"
                >
                  <span className={styles.arrowIcon}>‹</span>
                </button>
                <button
                  className={`${styles.modalArrow} ${styles.modalArrowNext} ${
                    showModalControls ? styles.show : styles.hide
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    nextModalImage();
                  }}
                  aria-label="Next image"
                  type="button"
                >
                  <span className={styles.arrowIcon}>›</span>
                </button>
                <div
                  className={`${styles.modalCounter} ${
                    showModalControls ? styles.show : styles.hide
                  }`}
                >
                  {modalImageIndex + 1} of {images.length}
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
