import { FiShield, FiUsers, FiHeart } from "react-icons/fi";
import Container from "../../common/Container";
import PremiumButton from "../../common/PremiumButton";
import { trustData } from "../../../data/homePageData";

const icons = [<FiShield />, <FiUsers />, <FiHeart />];

const TrustSection = () => {
  return (
    <section
      className="section"
      style={{
        background: "linear-gradient(180deg, #111827 0%, #0B1220 100%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "-120px",
          left: "-120px",
          width: "280px",
          height: "280px",
          borderRadius: "50%",
          background: "rgba(215, 38, 56, 0.14)",
          filter: "blur(80px)",
          pointerEvents: "none",
        }}
      />

      <Container>
        <div style={{ textAlign: "center", marginBottom: "clamp(2rem, 4vw, 4rem)" }}>
          <div
            className="section-badge"
            style={{
              marginInline: "auto",
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.12)",
              color: "#fff",
            }}
          >
            Why Trust Us
          </div>

          <h2
            style={{
              fontSize: "clamp(2.2rem, 5vw, 3rem)",
              color: "#fff",
              marginBottom: "1rem",
              maxWidth: "860px",
              marginInline: "auto",
            }}
          >
            Built on transparency, compassion, and <span className="text-gradient">real impact.</span>
          </h2>

          <p
            style={{
              maxWidth: "760px",
              margin: "0 auto",
              fontSize: "clamp(1rem, 2vw, 1.1rem)",
              color: "rgba(255,255,255,0.72)",
            }}
          >
            We believe trust is earned through meaningful action, measurable outcomes, and a community-first approach that puts people at the center of every initiative.
          </p>
        </div>

        <div className="trust-grid">
          {trustData.map((item, index) => (
            <div key={item.id} className="trust-card">
              <div className="trust-icon">{icons[index]}</div>
              <h3 className="trust-title">{item.title}</h3>
              <p className="trust-description">{item.description}</p>
              <PremiumButton href="/donate" variant="secondary">
                Support This Impact
              </PremiumButton>
            </div>
          ))}
        </div>
      </Container>

      <style>{`
        .trust-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
        }

        .trust-card {
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: var(--radius-xl);
          padding: 1.5rem;
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          box-shadow: 0 20px 60px rgba(0,0,0,0.18);
          transition: var(--transition-base);
        }

        .trust-card:hover {
          transform: translateY(-8px);
          background: rgba(255,255,255,0.08);
        }

        .trust-icon {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: rgba(215, 38, 56, 0.12);
          color: var(--color-primary);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          margin-bottom: 1rem;
        }

        .trust-title {
          color: #fff;
          font-size: 1.8rem;
          margin-bottom: 0.7rem;
        }

        .trust-description {
          color: rgba(255,255,255,0.72);
          line-height: 1.9;
          margin-bottom: 1.2rem;
        }

        .trust-card a {
          background: rgba(255,255,255,0.08) !important;
          border: 1px solid rgba(255,255,255,0.14) !important;
          color: #fff !important;
        }

        @media (max-width: 1100px) {
          .trust-grid {
            grid-template-columns: 1fr 1fr;
          }
        }

        @media (max-width: 768px) {
          .trust-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
};

export default TrustSection;