import { FiArrowUpRight, FiHeart, FiBookOpen } from "react-icons/fi";
import Container from "../../common/Container";
import PremiumButton from "../../common/PremiumButton";
import "../../../styles/services/education-donation-cta-section.css";

const EducationDonationCTASection = () => {
  return (
    <section className="education-donation-cta-section">
      <Container>
        <div className="education-donation-cta-shell">
          <div className="education-donation-cta-content">
            <div className="education-donation-cta-badge">
              <span className="education-donation-cta-badge-dot" />
              Support Child Education
            </div>

            <h2 className="education-donation-cta-title">
              Help us create brighter futures through{" "}
              <span className="text-gradient">education and opportunity.</span>
            </h2>

            <p className="education-donation-cta-description">
              Every contribution helps provide educational support, learning
              resources, and meaningful opportunities for children who deserve a
              stronger path forward.
            </p>

            <div className="education-donation-cta-actions">
              <PremiumButton href="/donate">
                Donate for Education <FiArrowUpRight />
              </PremiumButton>

              <PremiumButton href="/contact" variant="secondary">
                Partner With Us
              </PremiumButton>
            </div>
          </div>

          <div className="education-donation-cta-side">
            <div className="education-donation-cta-card">
              <div className="education-donation-cta-icon primary">
                <FiBookOpen />
              </div>
              <div>
                <p className="education-donation-cta-label">Education Focus</p>
                <h3 className="education-donation-cta-card-title">
                  Learning support that empowers long-term change
                </h3>
              </div>
            </div>

            <div className="education-donation-cta-card">
              <div className="education-donation-cta-icon gold">
                <FiHeart />
              </div>
              <div>
                <p className="education-donation-cta-label">Your Support Matters</p>
                <h3 className="education-donation-cta-card-title">
                  Small acts of generosity can shape a child’s future
                </h3>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default EducationDonationCTASection;