import { FiArrowUpRight, FiHeart, FiCoffee } from "react-icons/fi";
import Container from "../../common/Container";
import PremiumButton from "../../common/PremiumButton";
import "../../../styles/services/health-page.css";

const HealthDonationCTASection = () => {
  return (
    <section className="health-donation-section">
      <Container>
        <div className="health-donation-shell">
          <div className="health-donation-content">
            <div className="health-section-badge">
              <span className="health-section-badge-dot" />
              Support Health & Nutrition
            </div>

            <h2 className="health-section-title">
              Help us provide consistent{" "}
              <span className="text-gradient">care, meals, and support.</span>
            </h2>

            <p className="health-section-description">
              Your contribution helps us continue daily breakfast support,
              weekly community dinners, and meaningful health-focused care for
              children who deserve nourishment and dignity.
            </p>

            <div className="health-actions">
              <PremiumButton href="/donate">
                Donate for Nutrition <FiArrowUpRight />
              </PremiumButton>

              <PremiumButton href="/contact" variant="secondary">
                Partner With Us
              </PremiumButton>
            </div>
          </div>

          <div className="health-donation-side">
            <div className="health-side-card">
              <div className="health-side-icon primary">
                <FiCoffee />
              </div>
              <div>
                <p className="health-side-label">Daily Support</p>
                <h3 className="health-side-title">Breakfast for tuition children</h3>
              </div>
            </div>

            <div className="health-side-card">
              <div className="health-side-icon gold">
                <FiHeart />
              </div>
              <div>
                <p className="health-side-label">Weekly Care</p>
                <h3 className="health-side-title">Special dinner that brings nourishment and dignity</h3>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default HealthDonationCTASection;