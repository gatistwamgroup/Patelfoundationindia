import { useEffect, useState } from "react";
import { FiArrowUpRight, FiX, FiImage } from "react-icons/fi";
import Container from "../../common/Container";
import { galleryImages } from "../../../data/homePageData";
import "../../../styles/gallery/gallery-page-section.css";

const GalleryPageSection = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setSelectedImage(null);
      }
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

  const openImage = (image) => {
    setSelectedImage(image);
  };

  const closeImage = () => {
    setSelectedImage(null);
  };

  return (
    <section className="gallery-page-section">
      <Container>
        {/* Header */}
        <div className="gallery-page-header">
          <div className="gallery-page-badge">
            <span className="gallery-page-badge-dot" />
            Our Gallery
          </div>

          <h2 className="gallery-page-title">
            Moments of compassion, service, and{" "}
            <span className="text-gradient">community impact.</span>
          </h2>

          <p className="gallery-page-description">
            Explore meaningful moments that reflect the heart of Patel
            Foundation — from community outreach and support initiatives to
            smiles, hope, and shared purpose.
          </p>
        </div>

        {/* Stats Strip */}
        <div className="gallery-page-top-strip">
          <div className="gallery-page-top-strip-icon">
            <FiImage />
          </div>

          <div className="gallery-page-top-strip-content">
            <p className="gallery-page-top-strip-label">Visual Highlights</p>
            <h3 className="gallery-page-top-strip-title">
              A closer look at our journey of service, compassion, and impact.
            </h3>
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="gallery-page-grid">
          {galleryImages.map((image) => (
            <button
              key={image.id}
              className="gallery-page-card"
              onClick={() => openImage(image)}
              aria-label={`Open ${image.title}`}
              type="button"
            >
              <img
                src={image.src}
                alt={image.title}
                className="gallery-page-image"
              />

              <div className="gallery-page-overlay">
                <div className="gallery-page-overlay-content">
                  <span>View Image</span>
                  <FiArrowUpRight />
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Lightbox */}
        {selectedImage && (
          <div className="gallery-page-lightbox-backdrop" onClick={closeImage}>
            <div
              className="gallery-page-lightbox-modal"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="gallery-page-lightbox-close"
                onClick={closeImage}
                aria-label="Close lightbox"
                type="button"
              >
                <FiX />
              </button>

              <img
                src={selectedImage.src}
                alt={selectedImage.title}
                className="gallery-page-lightbox-image"
              />

              <div className="gallery-page-lightbox-caption">
                {selectedImage.title}
              </div>
            </div>
          </div>
        )}
      </Container>
    </section>
  );
};

export default GalleryPageSection;