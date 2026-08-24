import { FiHeart, FiArrowUpRight } from "react-icons/fi";
import Container from "../../common/Container";
import PremiumButton from "../../common/PremiumButton";
import "../../../styles/donate/donation-page.css";

const DonationIntroSection = () => {
  return (
    <section className="donation-intro-section">
      <Container>
        <div className="donation-intro-shell">
          <div className="donation-intro-content">
            <div className="donation-page-badge">
              <span className="donation-page-badge-dot" />
              Support Patel Foundation
            </div>

            <h1 className="donation-page-main-title">
              Your generosity can create{" "}
              <span className="text-gradient">real and lasting impact.</span>
            </h1>

            <p className="donation-page-description">
              Every contribution helps Patel Foundation support children and
              communities through education, nutrition, and meaningful social
              initiatives. Your support is more than a donation — it’s a step
              toward dignity, opportunity, and hope.
            </p>

            <div className="donation-intro-actions">
              <PremiumButton href="#donation-form">
                Donate Now <FiArrowUpRight />
              </PremiumButton>

              <PremiumButton href="/contact" variant="secondary">
                Contact Us
              </PremiumButton>
            </div>
          </div>

          <div className="donation-intro-side">
            <div className="donation-highlight-card">
              <div className="donation-highlight-icon">
                <FiHeart />
              </div>
              <div>
                <p className="donation-highlight-label">Mission Focus</p>
                <h3 className="donation-highlight-title">
                  Education, Nutrition & Community Care
                </h3>
              </div>
            </div>

            <div className="donation-stat-grid">
              <div className="donation-stat-card">
                <h3>100%</h3>
                <p>Heart-led commitment toward meaningful support</p>
              </div>

              <div className="donation-stat-card">
                <h3>Trust</h3>
                <p>Driven by transparency, compassion, and service</p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default DonationIntroSection;