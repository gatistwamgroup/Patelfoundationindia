import { useEffect, useState } from "react";
import { FiArrowUpRight, FiShield, FiX } from "react-icons/fi";
import Container from "../../common/Container";
import { legalDocuments } from "../../../data/legalDocumentsData";
import "../../../styles/legal/legal-documents-section.css";

const LegalDocumentsSection = () => {
  const [selectedDoc, setSelectedDoc] = useState(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setSelectedDoc(null);
      }
    };

    if (selectedDoc) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedDoc]);

  const openDocument = (doc) => {
    setSelectedDoc(doc);
  };

  const closeDocument = () => {
    setSelectedDoc(null);
  };

  return (
    <section className="legal-documents-section">
      <Container>
        {/* Header */}
        <div className="legal-documents-header">
          <div className="legal-documents-badge">
            <span className="legal-documents-badge-dot" />
            Legal Documents
          </div>

          <h2 className="legal-documents-title">
            Transparency, trust, and{" "}
            <span className="text-gradient">documented credibility.</span>
          </h2>

          <p className="legal-documents-description">
            Patel Foundation believes trust should be visible. These official
            legal and compliance documents reflect our commitment to integrity,
            accountability, and responsible community service.
          </p>
        </div>

        {/* Grid */}
        <div className="legal-documents-grid">
          {legalDocuments.map((doc) => (
            <article
              key={doc.id}
              className="legal-document-card"
              onClick={() => openDocument(doc)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  openDocument(doc);
                }
              }}
            >
              <div className="legal-document-preview-wrap">
                <img
                  src={doc.image}
                  alt={doc.title}
                  className="legal-document-preview"
                />

                <div className="legal-document-overlay">
                  <div className="legal-document-overlay-content">
                    <span>View Document</span>
                    <FiArrowUpRight />
                  </div>
                </div>
              </div>

              <div className="legal-document-content">
                <span className="legal-document-type">{doc.type}</span>
                <h3 className="legal-document-title">{doc.title}</h3>
              </div>
            </article>
          ))}
        </div>

        {/* Trust Strip */}
        <div className="legal-documents-trust-strip">
          <div className="legal-documents-trust-icon">
            <FiShield />
          </div>

          <div className="legal-documents-trust-content">
            <p className="legal-documents-trust-label">Trust & Transparency</p>
            <h3 className="legal-documents-trust-title">
              Our legal records are presented to strengthen confidence and reflect responsible operations.
            </h3>
          </div>
        </div>

        {/* Lightbox Modal */}
        {selectedDoc && (
          <div className="legal-lightbox-backdrop" onClick={closeDocument}>
            <div
              className="legal-lightbox-modal"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="legal-lightbox-close"
                type="button"
                onClick={closeDocument}
                aria-label="Close document preview"
              >
                <FiX />
              </button>

              <div className="legal-lightbox-header">
                <div>
                  <p className="legal-lightbox-type">{selectedDoc.type}</p>
                  <h3 className="legal-lightbox-title">{selectedDoc.title}</h3>
                </div>
              </div>

              <div className="legal-lightbox-body">
                <img
                  src={selectedDoc.image}
                  alt={selectedDoc.title}
                  className="legal-lightbox-image"
                />
              </div>
            </div>
          </div>
        )}
      </Container>
    </section>
  );
};

export default LegalDocumentsSection;