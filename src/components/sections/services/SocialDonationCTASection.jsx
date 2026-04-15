import { FiArrowUpRight, FiHeart, FiUsers } from "react-icons/fi";
import Container from "../../common/Container";
import PremiumButton from "../../common/PremiumButton";
import "../../../styles/services/health-page.css";

const SocialDonationCTASection = () => {
  return (
    <section className="health-donation-section">
      <Container>
        <div className="health-donation-shell">
          <div className="health-donation-content">
            <div className="health-section-badge">
              <span className="health-section-badge-dot" />
              Support Social Activities
            </div>

            <h2 className="health-section-title">
              Help us create stronger{" "}
              <span className="text-gradient">communities with care & connection.</span>
            </h2>

            <p className="health-section-description">
              Your contribution helps us organize meaningful social activities,
              community gatherings, and support initiatives that bring people
              together with dignity, compassion, and hope.
            </p>

            <div className="health-actions">
              <PremiumButton href="/donate">
                Donate for Social Impact <FiArrowUpRight />
              </PremiumButton>

              <PremiumButton href="/contact" variant="secondary">
                Partner With Us
              </PremiumButton>
            </div>
          </div>

          <div className="health-donation-side">
            <div className="health-side-card">
              <div className="health-side-icon primary">
                <FiUsers />
              </div>
              <div>
                <p className="health-side-label">Community Engagement</p>
                <h3 className="health-side-title">
                  Social events that build connection and belonging
                </h3>
              </div>
            </div>

            <div className="health-side-card">
              <div className="health-side-icon gold">
                <FiHeart />
              </div>
              <div>
                <p className="health-side-label">Support Initiatives</p>
                <h3 className="health-side-title">
                  Activities that inspire care, inclusion, and shared joy
                </h3>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default SocialDonationCTASection;