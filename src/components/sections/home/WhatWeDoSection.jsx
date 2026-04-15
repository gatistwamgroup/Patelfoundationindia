import Container from "../../common/Container";
import PremiumButton from "../../common/PremiumButton";
import { whatWeDoData } from "../../../data/homePageData";

const WhatWeDoSection = () => {
  return (
    <section className="section" id="projects" style={{ background: "var(--color-surface-soft)" }}>
      <Container>
        <div style={{ marginBottom: "clamp(2rem, 4vw, 4rem)", textAlign: "center" }}>
          <div className="section-badge" style={{ marginInline: "auto" }}>What We Do</div>
          <h2
            style={{
              fontSize: "clamp(2.2rem, 5vw, 3rem)",
              marginBottom: "1rem",
              maxWidth: "850px",
              marginInline: "auto",
            }}
          >
            Purpose-driven programs designed for <span className="text-gradient">real community impact.</span>
          </h2>
          <p
            style={{
              maxWidth: "760px",
              margin: "0 auto",
              fontSize: "clamp(1rem, 2vw, 1.1rem)",
            }}
          >
            From education and outreach to volunteer-led support, every initiative is built to create measurable change with compassion and dignity.
          </p>
        </div>

        <div className="services-grid">
          {whatWeDoData.map((item) => (
            <div key={item.id} className="service-card">
              <div className="service-image-wrap">
                <img src={item.image} alt={item.title} className="service-image" />
              </div>

              <div className="service-content">
                <h3 className="service-title">{item.title}</h3>
                <p className="service-description">{item.description}</p>

                <PremiumButton href={item.href} variant="secondary">
                  {item.cta}
                </PremiumButton>
              </div>
            </div>
          ))}
        </div>
      </Container>

      <style>{`
        .services-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
        }

        .service-card {
          background: var(--color-surface);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-xl);
          overflow: hidden;
          box-shadow: var(--shadow-card);
          transition: var(--transition-base);
        }

        .service-card:hover {
          transform: translateY(-8px);
          box-shadow: var(--shadow-premium);
        }

        .service-image-wrap {
          overflow: hidden;
        }

        .service-image {
          width: 100%;
          height: 280px;
          object-fit: cover;
          transition: var(--transition-slow);
        }

        .service-card:hover .service-image {
          transform: scale(1.05);
        }

        .service-content {
          padding: 1.4rem;
        }

        .service-title {
          font-size: 1.8rem;
          margin-bottom: 0.7rem;
        }

        .service-description {
          margin-bottom: 1.2rem;
          line-height: 1.8;
        }

        @media (max-width: 1100px) {
          .services-grid {
            grid-template-columns: 1fr 1fr;
          }
        }

        @media (max-width: 768px) {
          .services-grid {
            grid-template-columns: 1fr;
          }

          .service-image {
            height: 240px;
          }
        }
      `}</style>
    </section>
  );
};

export default WhatWeDoSection;