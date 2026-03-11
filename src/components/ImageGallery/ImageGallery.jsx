import { useState, useRef, useEffect, useCallback } from "react";
import { createPortal, flushSync } from "react-dom";
import styles from "./ImageGallery.module.css";
import { useIsMobile } from "../../hooks/useIsMobile";

const PLACEHOLDER_IMAGES = [
  { id: 1, url: "https://picsum.photos/seed/art1/400/500", title: "Artwork 1", description: "Digital illustration exploring color and form", size: "tall" },
  { id: 2, url: "https://picsum.photos/seed/art2/500/300", title: "Artwork 2", description: "Abstract composition with geometric shapes", size: "wide" },
  { id: 3, url: "https://picsum.photos/seed/art3/400/400", title: "Artwork 3", description: "Character design concept", size: "square" },
  { id: 4, url: "https://picsum.photos/seed/art4/400/600", title: "Artwork 4", description: "Environment study with moody lighting", size: "tall" },
  { id: 5, url: "https://picsum.photos/seed/art5/500/350", title: "Artwork 5", description: "Experimental texture work", size: "wide" },
  { id: 6, url: "https://picsum.photos/seed/art6/400/400", title: "Artwork 6", description: "Portrait study in minimalist style", size: "square" },
  { id: 7, url: "https://picsum.photos/seed/art7/400/550", title: "Artwork 7", description: "Surreal landscape composition", size: "tall" },
  { id: 8, url: "https://picsum.photos/seed/art8/500/300", title: "Artwork 8", description: "Motion and flow exploration", size: "wide" },
  { id: 9, url: "https://picsum.photos/seed/art9/400/400", title: "Artwork 9", description: "Color palette experiment", size: "square" },
  { id: 10, url: "https://picsum.photos/seed/art10/400/500", title: "Artwork 10", description: "Personal project illustration", size: "tall" },
];

// Create duplicated images for infinite scroll effect (mobile only)
const createInfiniteImages = () => {
  const repetitions = 5;
  const images = [];
  for (let i = 0; i < repetitions; i++) {
    PLACEHOLDER_IMAGES.forEach((img) => {
      images.push({
        ...img,
        uniqueId: `${img.id}-${i}`,
      });
    });
  }
  return images;
};

const INFINITE_IMAGES = createInfiniteImages();

function ImageGallery() {
  const isMobile = useIsMobile();
  const [selectedImage, setSelectedImage] = useState(null);
  const [closingImage, setClosingImage] = useState(null);
  const [galleryHeight, setGalleryHeight] = useState(0);
  const [activeUniqueId, setActiveUniqueId] = useState(null);
  const galleryRef = useRef(null);
  const containerRef = useRef(null);
  const desktopGalleryRef = useRef(null);
  const isResettingScroll = useRef(false);

  useEffect(() => {
    if (!isMobile) return;

    const calculateHeight = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const bottomMargin = 32;
        const maxHeight = 400;
        const availableHeight = window.innerHeight - rect.top - bottomMargin;
        setGalleryHeight(Math.min(maxHeight, Math.max(availableHeight, 200)));
      }
    };

    calculateHeight();
    window.addEventListener("resize", calculateHeight);
    return () => window.removeEventListener("resize", calculateHeight);
  }, [isMobile]);

  const handleInfiniteScroll = useCallback(() => {
    const gallery = galleryRef.current;
    if (!gallery || isResettingScroll.current) return;

    const scrollWidth = gallery.scrollWidth;
    const scrollLeft = gallery.scrollLeft;
    const sectionWidth = scrollWidth / 5;

    if (scrollLeft > sectionWidth * 3) {
      isResettingScroll.current = true;
      gallery.scrollLeft = sectionWidth;
      requestAnimationFrame(() => {
        isResettingScroll.current = false;
      });
    } else if (scrollLeft < sectionWidth * 0.5) {
      isResettingScroll.current = true;
      gallery.scrollLeft = sectionWidth * 2.5;
      requestAnimationFrame(() => {
        isResettingScroll.current = false;
      });
    }
  }, []);

  const handleWheel = (e) => {
    if (galleryRef.current) {
      e.preventDefault();
      galleryRef.current.scrollLeft += e.deltaY;
      handleInfiniteScroll();
    }
  };

  useEffect(() => {
    if (!isMobile) return;

    const gallery = galleryRef.current;
    if (!gallery) return;

    const sectionWidth = gallery.scrollWidth / 5;
    gallery.scrollLeft = sectionWidth * 2;

    gallery.addEventListener("scroll", handleInfiniteScroll, { passive: true });
    return () => gallery.removeEventListener("scroll", handleInfiniteScroll);
  }, [isMobile, handleInfiniteScroll, galleryHeight]);

  // Close expanded image when leaving Art section or hovering a Code project
  useEffect(() => {
    const handleClose = () => {
      if (selectedImage) closeModal();
    };
    window.addEventListener("leave-art-section", handleClose);
    window.addEventListener("code-project-hover", handleClose);
    return () => {
      window.removeEventListener("leave-art-section", handleClose);
      window.removeEventListener("code-project-hover", handleClose);
    };
  }); // runs every render to capture latest selectedImage/closeModal

  const openModal = (image) => {
    if (document.startViewTransition) {
      flushSync(() => {
        setActiveUniqueId(image.uniqueId || image.id);
      });
      document.startViewTransition(() => {
        flushSync(() => {
          setSelectedImage(image);
        });
      });
    } else {
      setActiveUniqueId(image.uniqueId || image.id);
      setSelectedImage(image);
    }
  };

  const closeModal = () => {
    if (!isMobile && selectedImage) {
      const img = selectedImage;
      if (document.startViewTransition) {
        setClosingImage(img);
        const transition = document.startViewTransition(() => {
          flushSync(() => {
            setSelectedImage(null);
            setActiveUniqueId(img.uniqueId || img.id);
          });
        });
        transition.finished.then(() => {
          setActiveUniqueId(null);
          setClosingImage(null);
        });
      } else {
        setClosingImage(img);
        setSelectedImage(null);
        setActiveUniqueId(null);
      }
      return;
    }
    if (document.startViewTransition) {
      const transition = document.startViewTransition(() => {
        flushSync(() => {
          setSelectedImage(null);
        });
      });
      transition.finished.then(() => {
        setActiveUniqueId(null);
      });
    } else {
      setSelectedImage(null);
      setActiveUniqueId(null);
    }
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  // Desktop: close left panel image when clicking outside the gallery
  useEffect(() => {
    if (isMobile || !selectedImage) return;

    const handleClickOutside = (e) => {
      if (desktopGalleryRef.current?.contains(e.target)) return;
      // Don't double-fire if clicking the close button or the overlay itself
      if (leftPanel?.contains(e.target)) return;
      closeModal();
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isMobile, selectedImage]); // eslint-disable-line react-hooks/exhaustive-deps

  const renderModal = () =>
    selectedImage && (
      <div className={styles.modal} onClick={handleBackdropClick}>
        <div className={styles.modalContent}>
          <button className={styles.closeButton} onClick={closeModal}>
            ✕
          </button>
          <img
            src={selectedImage.url.replace(/\/\d+\/\d+$/, "/800/1000")}
            alt={selectedImage.title}
            className={styles.modalImage}
            style={{ viewTransitionName: "gallery-image" }}
          />
          <div className={styles.imageInfo}>
            <h3 className={styles.imageTitle}>{selectedImage.title}</h3>
            {selectedImage.description && (
              <p className={styles.imageDescription}>{selectedImage.description}</p>
            )}
          </div>
        </div>
      </div>
    );

  const leftPanel = document.getElementById("leftPanel");

  const renderLeftPanelImage = () => {
    const image = selectedImage || closingImage;
    if (!image || !leftPanel) return null;
    const isClosing = !selectedImage && closingImage;
    return createPortal(
      <div
        className={`${styles.leftPanelOverlay} ${isClosing ? styles.leftPanelClosing : ""}`}
        data-video-overlay
        onAnimationEnd={() => { if (isClosing) setClosingImage(null); }}
      >
        {!isClosing && <button className={styles.leftPanelClose} onClick={closeModal}>✕</button>}
        <img
          src={image.url.replace(/\/\d+\/\d+$/, "/800/1000")}
          alt={image.title}
          className={styles.leftPanelImage}
          style={!isClosing ? { viewTransitionName: "gallery-image" } : undefined}
        />
      </div>,
      leftPanel
    );
  };

  // Desktop: vertical masonry grid — click shows image in left panel
  if (!isMobile) {
    return (
      <>
        <div className={styles.galleryContainer} ref={desktopGalleryRef}>
          <div className={styles.masonryGrid}>
            {PLACEHOLDER_IMAGES.map((image) => (
              <button
                key={image.id}
                className={`${styles.masonryItem} ${selectedImage?.id === image.id ? styles.masonryItemActive : ""}`}
                onClick={() => selectedImage?.id === image.id ? closeModal() : openModal(image)}
              >
                <img
                  src={image.url}
                  alt={image.title}
                  className={styles.thumbnail}
                  loading="lazy"
                  style={
                    activeUniqueId === image.id && !selectedImage
                      ? { viewTransitionName: "gallery-image" }
                      : undefined
                  }
                />
              </button>
            ))}
          </div>
        </div>
        {renderLeftPanelImage()}
      </>
    );
  }

  // Mobile: horizontal infinite scroll
  return (
    <>
      <div className={styles.galleryContainer} ref={containerRef}>
        <div
          className={styles.gallery}
          ref={galleryRef}
          onWheel={handleWheel}
          style={{ height: galleryHeight > 0 ? `${galleryHeight}px` : undefined }}
        >
          {INFINITE_IMAGES.map((image) => (
            <button
              key={image.uniqueId}
              className={`${styles.imageButton} ${styles[image.size]}`}
              onClick={() => openModal(image)}
            >
              <img
                src={image.url}
                alt={image.title}
                className={styles.thumbnail}
                loading="lazy"
                style={
                  activeUniqueId === image.uniqueId && !selectedImage
                    ? { viewTransitionName: "gallery-image" }
                    : undefined
                }
              />
            </button>
          ))}
        </div>
      </div>
      {renderModal()}
    </>
  );
}

export default ImageGallery;
