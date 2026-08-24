import { useState } from "react";
import { FiX, FiArrowUpRight } from "react-icons/fi";

const GalleryGrid = ({ images = [], limit = null, columns = 3 }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  const displayImages = limit ? images.slice(0, limit) : images;

  return (
    <>
      <div
        className="gallery-grid"
        style={{
          gridTemplateColumns:
            columns === 4
              ? "repeat(4, 1fr)"
              : columns === 2
              ? "repeat(2, 1fr)"
              : "repeat(3, 1fr)",
        }}
      >
        {displayImages.map((image) => (
          <button
            key={image.id}
            className="gallery-card"
            onClick={() => setSelectedImage(image)}
            aria-label={`Open ${image.title}`}
          >
            <img src={image.src} alt={image.title} className="gallery-image" />

            <div className="gallery-overlay">
              <div className="gallery-overlay-icon">
                <FiArrowUpRight />
              </div>
            </div>
          </button>
        ))}
      </div>

      {selectedImage && (
        <div className="lightbox-backdrop" onClick={() => setSelectedImage(null)}>
          <div className="lightbox-modal" onClick={(e) => e.stopPropagation()}>
            <button
              className="lightbox-close"
              onClick={() => setSelectedImage(null)}
              aria-label="Close lightbox"
            >
              <FiX />
            </button>

            <img
              src={selectedImage.src}
              alt={selectedImage.title}
              className="lightbox-image"
            />

            <div className="lightbox-caption">{selectedImage.title}</div>
          </div>
        </div>
      )}

      <style>{`
        .gallery-grid {
          display: grid;
          gap: 1rem;
        }

        .gallery-card {
          position: relative;
          border: none;
          padding: 0;
          overflow: hidden;
          border-radius: 24px;
          cursor: pointer;
          box-shadow: var(--shadow-card);
          min-height: 280px;
          background: transparent;
        }

        .gallery-image {
          width: 100%;
          height: 100%;
          min-height: 280px;
          object-fit: cover;
          display: block;
          transition: var(--transition-slow);
        }

        .gallery-card:hover .gallery-image {
          transform: scale(1.06);
        }

        .gallery-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            180deg,
            rgba(17,24,39,0.04) 0%,
            rgba(17,24,39,0.38) 100%
          );
          display: flex;
          align-items: flex-end;
          justify-content: flex-end;
          padding: 1rem;
          opacity: 0;
          transition: var(--transition-base);
        }

        .gallery-card:hover .gallery-overlay {
          opacity: 1;
        }

        .gallery-overlay-icon {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: rgba(255,255,255,0.16);
          border: 1px solid rgba(255,255,255,0.2);
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.1rem;
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          transform: translateY(8px);
          transition: var(--transition-base);
        }

        .gallery-card:hover .gallery-overlay-icon {
          transform: translateY(0);
        }

        .lightbox-backdrop {
          position: fixed;
          inset: 0;
          z-index: 1500;
          background: rgba(17,24,39,0.82);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          display: grid;
          place-items: center;
          padding: 1rem;
        }

        .lightbox-modal {
          position: relative;
          width: min(100%, 980px);
          background: #fff;
          border-radius: 28px;
          overflow: hidden;
          box-shadow: 0 30px 80px rgba(0,0,0,0.28);
        }

        .lightbox-close {
          position: absolute;
          top: 14px;
          right: 14px;
          width: 44px;
          height: 44px;
          border-radius: 50%;
          border: 1px solid rgba(17,24,39,0.08);
          background: rgba(255,255,255,0.9);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2;
        }

        .lightbox-image {
          width: 100%;
          max-height: 80vh;
          object-fit: cover;
          display: block;
        }

        .lightbox-caption {
          padding: 1rem 1.2rem;
          font-weight: 700;
          color: var(--color-dark);
        }

        @media (max-width: 1200px) {
          .gallery-grid {
            grid-template-columns: repeat(3, 1fr) !important;
          }
        }

        @media (max-width: 992px) {
          .gallery-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }

        @media (max-width: 768px) {
          .gallery-grid {
            grid-template-columns: 1fr !important;
          }

          .gallery-card,
          .gallery-image {
            min-height: 240px;
          }

          .gallery-overlay {
            opacity: 1;
            background: linear-gradient(
              180deg,
              rgba(17,24,39,0.02) 0%,
              rgba(17,24,39,0.18) 100%
            );
          }

          .gallery-overlay-icon {
            width: 42px;
            height: 42px;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  );
};

export default GalleryGrid;