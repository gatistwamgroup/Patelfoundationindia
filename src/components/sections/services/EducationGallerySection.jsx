import { useEffect, useState } from "react";
import { FiArrowUpRight, FiX } from "react-icons/fi";
import Container from "../../common/Container";
import { educationGalleryImages } from "../../../data/educationGalleryData";
import "../../../styles/services/education-gallery-section.css";

const EducationGallerySection = () => {
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
    <section className="education-gallery-section">
      <Container>
        <div className="education-gallery-header">
          <div className="education-gallery-badge">
            <span className="education-gallery-badge-dot" />
            Education Gallery
          </div>

          <h2 className="education-gallery-title">
            Moments that reflect our{" "}
            <span className="text-gradient">education mission in action.</span>
          </h2>

          <p className="education-gallery-description">
            A glimpse into the learning support, outreach efforts, and meaningful
            moments that help shape brighter futures.
          </p>
        </div>

        <div className="education-gallery-grid">
          {educationGalleryImages.map((image) => (
            <button
              key={image.id}
              className="education-gallery-card"
              onClick={() => setSelectedImage(image)}
              aria-label="Open gallery image"
              type="button"
            >
              <img
                src={image.src}
                alt="Education Gallery"
                className="education-gallery-image"
              />

              <div className="education-gallery-overlay">
                <div className="education-gallery-overlay-content">
                  <span>View Image</span>
                  <FiArrowUpRight />
                </div>
              </div>
            </button>
          ))}
        </div>

        {selectedImage && (
          <div
            className="education-gallery-lightbox-backdrop"
            onClick={() => setSelectedImage(null)}
          >
            <div
              className="education-gallery-lightbox-modal"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="education-gallery-lightbox-close"
                onClick={() => setSelectedImage(null)}
                aria-label="Close lightbox"
                type="button"
              >
                <FiX />
              </button>

              <img
                src={selectedImage.src}
                alt="Education Gallery"
                className="education-gallery-lightbox-image"
              />
            </div>
          </div>
        )}
      </Container>
    </section>
  );
};

export default EducationGallerySection;