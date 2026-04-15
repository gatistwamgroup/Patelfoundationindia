import Container from "../../common/Container";
import PremiumButton from "../../common/PremiumButton";
import { missionVisionData } from "../../../data/homePageData";

const MissionVisionSection = () => {
  return (
    <section className="mission-section">
      <Container>
        <div style={{ textAlign: "center", marginBottom: "clamp(2rem, 4vw, 4rem)" }}>
          <div className="section-badge" style={{ marginInline: "auto" }}>
            Mission & Vision
          </div>

          <h2
            style={{
              fontSize: "clamp(2.2rem, 5vw, 3rem)",
              marginBottom: "1rem",
              maxWidth: "860px",
              marginInline: "auto",
            }}
          >
            Purpose-led values guiding every step of our <span className="text-gradient">journey.</span>
          </h2>

          <p
            style={{
              maxWidth: "760px",
              margin: "0 auto",
              fontSize: "clamp(1rem, 2vw, 1.1rem)",
            }}
          >
            Our mission and vision shape the way we serve communities, support children, and build long-term impact with compassion and trust.
          </p>
        </div>

        <div className="mv-grid">
          {/* Mission */}
          <div className="mv-card">
            <div className="mv-image-wrap">
              <img
                src={missionVisionData.mission.image}
                alt={missionVisionData.mission.title}
                className="mv-image"
              />
            </div>

            <div className="mv-content">
              <div className="mv-label">Our Mission</div>
              <h3 className="mv-title">{missionVisionData.mission.title}</h3>
              <p className="mv-description">{missionVisionData.mission.description}</p>

              <PremiumButton href="#donate">Support Our Mission</PremiumButton>
            </div>
          </div>

          {/* Vision */}
          <div className="mv-card">
            <div className="mv-image-wrap">
              <img
                src={missionVisionData.vision.image}
                alt={missionVisionData.vision.title}
                className="mv-image"
              />
            </div>

            <div className="mv-content">
              <div className="mv-label mv-label-alt">Our Vision</div>
              <h3 className="mv-title">{missionVisionData.vision.title}</h3>
              <p className="mv-description">{missionVisionData.vision.description}</p>

              <PremiumButton href="#contact" variant="secondary">
                Join Our Vision
              </PremiumButton>
            </div>
          </div>
        </div>
      </Container>

      <style>{`
        .mission-section {
        padding-top:0px;
        padding-bottom:80px;
        }
        .mv-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
        }

        .mv-card {
          background: var(--color-surface);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-xl);
          overflow: hidden;
          box-shadow: var(--shadow-card);
          transition: var(--transition-base);
        }

        .mv-card:hover {
          transform: translateY(-8px);
          box-shadow: var(--shadow-premium);
        }

        .mv-image-wrap {
          overflow: hidden;
        }

        .mv-image {
          width: 100%;
          height: 320px;
          object-fit: cover;
          transition: var(--transition-slow);
        }

        .mv-card:hover .mv-image {
          transform: scale(1.04);
        }

        .mv-content {
          padding: 1.5rem;
        }

        .mv-label {
          display: inline-block;
          padding: 0.55rem 0.9rem;
          border-radius: 999px;
          background: rgba(215, 38, 56, 0.08);
          color: var(--color-primary);
          font-size: 0.8rem;
          font-weight: 700;
          margin-bottom: 1rem;
        }

        .mv-label-alt {
          background: rgba(15, 118, 110, 0.08);
          color: var(--color-teal);
        }

        .mv-title {
          font-size: clamp(1.8rem, 3vw, 2.5rem);
          margin-bottom: 0.8rem;
        }

        .mv-description {
          line-height: 1.9;
          margin-bottom: 1.4rem;
        }

        @media (max-width: 992px) {
          .mv-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 768px) {
          .mv-image {
            height: 250px;
          }
        }
      `}</style>
    </section>
  );
};

export default MissionVisionSection;