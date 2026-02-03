import { useState, useRef } from "react";
import styles from "./ImageGallery.module.css";

const PLACEHOLDER_IMAGES = [
  { id: 1, url: "https://picsum.photos/seed/art1/400/500", title: "Artwork 1" },
  { id: 2, url: "https://picsum.photos/seed/art2/400/500", title: "Artwork 2" },
  { id: 3, url: "https://picsum.photos/seed/art3/400/500", title: "Artwork 3" },
  { id: 4, url: "https://picsum.photos/seed/art4/400/500", title: "Artwork 4" },
  { id: 5, url: "https://picsum.photos/seed/art5/400/500", title: "Artwork 5" },
  { id: 6, url: "https://picsum.photos/seed/art6/400/500", title: "Artwork 6" },
  { id: 7, url: "https://picsum.photos/seed/art7/400/500", title: "Artwork 7" },
  { id: 8, url: "https://picsum.photos/seed/art8/400/500", title: "Artwork 8" },
];

function ImageGallery() {
  const [selectedImage, setSelectedImage] = useState(null);
  const galleryRef = useRef(null);

  const handleWheel = (e) => {
    if (galleryRef.current) {
      e.preventDefault();
      galleryRef.current.scrollLeft += e.deltaY;
    }
  };

  const openModal = (image) => {
    setSelectedImage(image);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return (
    <>
      <div className={styles.gallery} ref={galleryRef} onWheel={handleWheel}>
        {PLACEHOLDER_IMAGES.map((image) => (
          <button
            key={image.id}
            className={styles.imageButton}
            onClick={() => openModal(image)}
          >
            <img
              src={image.url}
              alt={image.title}
              className={styles.thumbnail}
              loading="lazy"
            />
          </button>
        ))}
      </div>

      {selectedImage && (
        <div className={styles.modal} onClick={handleBackdropClick}>
          <div className={styles.modalContent}>
            <button className={styles.closeButton} onClick={closeModal}>
              ✕
            </button>
            <img
              src={selectedImage.url.replace("/400/500", "/800/1000")}
              alt={selectedImage.title}
              className={styles.modalImage}
            />
            <span className={styles.imageTitle}>{selectedImage.title}</span>
          </div>
        </div>
      )}
    </>
  );
}

export default ImageGallery;
