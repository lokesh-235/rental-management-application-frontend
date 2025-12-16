import { useState } from "react";
import styles from "./property-card.module.css";

export default function ImageSlider({ images = [], title }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const imageUrls = images.length
    ? images.map((img) => `${import.meta.env.VITE_API_URL}/${img.imageUrl}`)
    : ["property.jpg"];

  const nextImage = () => setCurrentIndex((prev) => (prev + 1) % imageUrls.length);
  const prevImage = () =>
    setCurrentIndex((prev) => (prev === 0 ? imageUrls.length - 1 : prev - 1));

  return (
    <div className={styles.imageSlider}>
      <img
        src={imageUrls[currentIndex]}
        alt={`${title} ${currentIndex + 1}`}
        className={styles.image}
      />
      {imageUrls.length > 1 && (
        <>
          <button className={`${styles.sliderBtn} ${styles.left}`} onClick={prevImage}>‹</button>
          <button className={`${styles.sliderBtn} ${styles.right}`} onClick={nextImage}>›</button>
        </>
      )}
    </div>
  );
}
