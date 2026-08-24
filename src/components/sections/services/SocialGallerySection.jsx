import { useEffect, useState } from "react";
import { FiArrowUpRight, FiX } from "react-icons/fi";
import Container from "../../common/Container";
import { socialGalleryImages } from "../../../data/socialGalleryData";
import "../../../styles/services/social-page.css";

const SocialGallerySection = () => {
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
    <section className="social-gallery-section">
      <Container>
        <div className="social-section-header">
          <div className="social-section-badge">
            <span className="social-section-badge-dot" />
            Social Gallery
          </div>

          <h2 className="social-section-title">
            Real moments from our{" "}
            <span className="text-gradient">social outreach initiatives.</span>
          </h2>
        </div>

        <div className="social-gallery-grid">
          {socialGalleryImages.map((image) => (
            <button
              key={image.id}
              className="social-gallery-card"
              onClick={() => setSelectedImage(image)}
              type="button"
            >
              <img src={image.src} alt={image.title} className="social-gallery-image" />
              <div className="social-gallery-overlay">
                <div className="social-gallery-overlay-content">
                  <span>View Image</span>
                  <FiArrowUpRight />
                </div>
              </div>
            </button>
          ))}
        </div>

        {selectedImage && (
          <div className="social-lightbox-backdrop" onClick={() => setSelectedImage(null)}>
            <div className="social-lightbox-modal" onClick={(e) => e.stopPropagation()}>
              <button
                className="social-lightbox-close"
                onClick={() => setSelectedImage(null)}
                type="button"
              >
                <FiX />
              </button>
              <img
                src={selectedImage.src}
                alt={selectedImage.title}
                className="social-lightbox-image"
              />
              
            </div>
          </div>
        )}
      </Container>
    </section>
  );
};

export default SocialGallerySection;