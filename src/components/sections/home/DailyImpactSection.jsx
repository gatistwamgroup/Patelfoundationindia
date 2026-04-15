import Container from "../../common/Container";
import PremiumButton from "../../common/PremiumButton";
import { dailyImpactData } from "../../../data/homePageData";

const DailyImpactSection = () => {
  return (
    <section className="section">
      <Container>
        <div className="impact-wrapper">
          <div className="impact-left">
            <div className="section-badge">Daily Impact</div>

            <h2 className="impact-title">
              Every day, your support helps create <span className="text-gradient">visible change.</span>
            </h2>

            <p className="impact-description">
              Our work is measured in real outcomes — children supported, school resources delivered, volunteers engaged, and communities strengthened through meaningful action.
            </p>

            <div className="impact-buttons">
              <PremiumButton href="#donate">Donate Today</PremiumButton>
              <PremiumButton href="#projects" variant="secondary">
                Explore Our Work
              </PremiumButton>
            </div>
          </div>

          <div className="impact-right">
            <div className="impact-grid">
              {dailyImpactData.map((item, index) => (
                <div key={index} className={`impact-card impact-${item.color}`}>
                  <h3>{item.value}</h3>
                  <p>{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>

      <style>{`
        .impact-wrapper {
          display: grid;
          grid-template-columns: 0.95fr 1.05fr;
          gap: clamp(1.5rem, 4vw, 4rem);
          align-items: center;
          background: linear-gradient(135deg, #ffffff 0%, #f9fafb 100%);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-xl);
          padding: clamp(1.5rem, 4vw, 3rem);
          box-shadow: var(--shadow-card);
        }

        .impact-title {
          font-size: clamp(2.2rem, 5vw, 3rem);
          margin-bottom: 1rem;
        }

        .impact-description {
          font-size: clamp(1rem, 2vw, 1.1rem);
          line-height: 1.9;
          margin-bottom: 1.6rem;
        }

        .impact-buttons {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .impact-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }

        .impact-card {
          border-radius: 24px;
          padding: 1.4rem;
          min-height: 180px;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          border: 1px solid var(--color-border);
        }

        .impact-card h3 {
          font-size: clamp(2rem, 4vw, 3rem);
          margin-bottom: 0.4rem;
        }

        .impact-card p {
          font-weight: 600;
          color: var(--color-text);
        }

        .impact-primary {
          background: var(--color-primary-light);
        }

        .impact-gold {
          background: var(--color-gold-soft);
        }

        .impact-teal {
          background: var(--color-teal-soft);
        }

        .impact-dark {
          background: #E5E7EB;
        }

        @media (max-width: 992px) {
          .impact-wrapper {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 768px) {
          .impact-grid {
            grid-template-columns: 1fr;
          }

          .impact-buttons {
            flex-direction: column;
          }

          .impact-buttons a {
            width: 100%;
            justify-content: center;
          }

          .impact-card {
            min-height: 150px;
          }
        }
      `}</style>
    </section>
  );
};

export default DailyImpactSection;