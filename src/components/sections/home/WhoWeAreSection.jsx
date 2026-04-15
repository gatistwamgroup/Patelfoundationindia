import { FiCheckCircle } from "react-icons/fi";
import Container from "../../common/Container";
import PremiumButton from "../../common/PremiumButton";
import { whoWeAreData } from "../../../data/homePageData";

const WhoWeAreSection = () => {
  return (
    <section className="section" id="about">
      <Container>
        <div className="who-grid">
          {/* Image */}
          <div className="who-image-wrap">
            <div className="who-image-card">
              <img src={whoWeAreData.image} alt="Who We Are" className="who-main-image" />
              <div className="who-floating-badge">
                <span className="who-badge-dot" />
                Compassion • Trust • Impact
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="who-content">
            <div className="section-badge">{whoWeAreData.badge}</div>

            <h2 className="who-title">
              A compassionate foundation dedicated to{" "}
              <span className="text-gradient">lasting community change.</span>
            </h2>

            <p className="who-description">{whoWeAreData.description}</p>

            <div className="who-points">
              {whoWeAreData.points.map((point, index) => (
                <div key={index} className="who-point">
                  <span className="who-point-icon">
                    <FiCheckCircle />
                  </span>
                  <span>{point}</span>
                </div>
              ))}
            </div>

            <div className="who-buttons">
              <PremiumButton href={whoWeAreData.primaryBtn.href}>
                {whoWeAreData.primaryBtn.text}
              </PremiumButton>
              <PremiumButton href={whoWeAreData.secondaryBtn.href} variant="secondary">
                {whoWeAreData.secondaryBtn.text}
              </PremiumButton>
            </div>
          </div>
        </div>
      </Container>

      <style>{`
        .who-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(1.5rem, 4vw, 4rem);
          align-items: center;
        }

        .who-image-wrap {
          position: relative;
        }

        .who-image-card {
          position: relative;
          border-radius: var(--radius-xl);
          overflow: hidden;
          box-shadow: var(--shadow-premium);
          border: 1px solid var(--color-border);
        }

        .who-main-image {
          width: 100%;
          height: 640px;
          object-fit: cover;
        }

        .who-floating-badge {
          position: absolute;
          left: 20px;
          bottom: 20px;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 0.8rem 1rem;
          border-radius: 999px;
          background: rgba(255,255,255,0.85);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(255,255,255,0.4);
          font-size: 0.9rem;
          font-weight: 700;
          color: var(--color-dark);
        }

        .who-badge-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--color-primary);
        }

        .who-title {
          font-size: clamp(2.2rem, 5vw, 3rem);
          margin-bottom: 1rem;
        }

        .who-description {
          font-size: clamp(1rem, 2vw, 1.1rem);
          line-height: 1.9;
          margin-bottom: 1.5rem;
        }

        .who-points {
          display: grid;
          gap: 0.9rem;
          margin-bottom: 1.8rem;
        }

        .who-point {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
          color: var(--color-text);
          font-weight: 500;
        }

        .who-point-icon {
          width: 28px;
          height: 28px;
          min-width: 28px;
          border-radius: 50%;
          background: rgba(215, 38, 56, 0.08);
          color: var(--color-primary);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-top: 2px;
        }

        .who-buttons {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
        }

        @media (max-width: 992px) {
          .who-grid {
            grid-template-columns: 1fr;
          }

          .who-main-image {
            height: 500px;
          }
        }

        @media (max-width: 768px) {
          .who-main-image {
            height: 380px;
          }

          .who-buttons {
            flex-direction: column;
          }

          .who-buttons a {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>
    </section>
  );
};

export default WhoWeAreSection;