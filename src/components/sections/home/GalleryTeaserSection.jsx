import Container from "../../common/Container";
import PremiumButton from "../../common/PremiumButton";
import GalleryGrid from "../../common/GalleryGrid";
import { galleryImages } from "../../../data/homePageData";

const GalleryTeaserSection = () => {
  return (
    <section className="section" id="gallery">
      <Container>
        <div style={{ textAlign: "center", marginBottom: "clamp(2rem, 4vw, 4rem)" }}>
          <div className="section-badge" style={{ marginInline: "auto" }}>
            Gallery Highlights
          </div>

          <h2
            style={{
              fontSize: "clamp(2.2rem, 5vw, 3rem)",
              marginBottom: "1rem",
              maxWidth: "860px",
              marginInline: "auto",
            }}
          >
            Moments of compassion, service, and{" "}
            <span className="text-gradient">community impact.</span>
          </h2>

          <p
            style={{
              maxWidth: "760px",
              margin: "0 auto 1.4rem",
              fontSize: "clamp(1rem, 2vw, 1.1rem)",
            }}
          >
            Explore a glimpse of the meaningful work, smiles, and shared purpose
            that define Patel Foundation’s journey.
          </p>

          <PremiumButton href="/gallery" variant="secondary">
            View Full Gallery
          </PremiumButton>
        </div>

        <GalleryGrid images={galleryImages} limit={6} columns={3} />
      </Container>
    </section>
  );
};

export default GalleryTeaserSection;