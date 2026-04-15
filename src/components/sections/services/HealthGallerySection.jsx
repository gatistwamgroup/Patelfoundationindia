import { useEffect, useState } from "react";
import { FiArrowUpRight, FiX } from "react-icons/fi";
import Container from "../../common/Container";
import { healthGalleryImages } from "../../../data/healthGalleryData";
import "../../../styles/services/health-page.css";

const HealthGallerySection = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setSelectedImage(null);
    };

    if (selectedImage) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedImage]);

  return (
    <section className="health-gallery-section">
      <Container>
        <div className="health-section-header">
          <div className="health-section-badge">
            <span className="health-section-badge-dot" />
            Health Gallery
          </div>

          <h2 className="health-section-title">
            Moments of care, nourishment, and{" "}
            <span className="text-gradient">community support.</span>
          </h2>
        </div>

        <div className="health-gallery-grid">
          {healthGalleryImages.map((image) => (
            <button
              key={image.id}
              className="health-gallery-card"
              onClick={() => setSelectedImage(image)}
              type="button"
            >
              <img src={image.src} alt={image.title} className="health-gallery-image" />
              <div className="health-gallery-overlay">
                <div className="health-gallery-overlay-content">
                  <span>View Image</span>
                  <FiArrowUpRight />
                </div>
              </div>
            </button>
          ))}
        </div>

        {selectedImage && (
          <div className="health-lightbox-backdrop" onClick={() => setSelectedImage(null)}>
            <div className="health-lightbox-modal" onClick={(e) => e.stopPropagation()}>
              <button
                className="health-lightbox-close"
                onClick={() => setSelectedImage(null)}
                type="button"
              >
                <FiX />
              </button>
              <img
                src={selectedImage.src}
                alt={selectedImage.title}
                className="health-lightbox-image"
              />
              <div className="health-lightbox-caption">{selectedImage.title}</div>
            </div>
          </div>
        )}
      </Container>
    </section>
  );
};

export default HealthGallerySection;