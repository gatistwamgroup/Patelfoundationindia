import { FiShield, FiHeart, FiArrowUpRight } from "react-icons/fi";
import Container from "../../common/Container";
import PremiumButton from "../../common/PremiumButton";
import "../../../styles/donate/donation-page.css";

const DonationTrustSection = () => {
  return (
    <section className="donation-trust-section">
      <Container>
        <div className="donation-trust-shell">
          <div className="donation-trust-content">
            <div className="donation-page-badge">
              <span className="donation-page-badge-dot" />
              Give with Confidence
            </div>

            <h2 className="donation-section-title">
              Rooted in compassion, guided by{" "}
              <span className="text-gradient">trust and transparency.</span>
            </h2>

            <p className="donation-page-description">
              Patel Foundation believes generosity deserves honesty, care, and
              accountability. We are committed to serving with integrity and
              ensuring every supporter feels connected to a meaningful mission.
            </p>

            <div className="donation-trust-actions">
              <PremiumButton href="/legal-documents">
                View Legal Documents <FiArrowUpRight />
              </PremiumButton>

              <PremiumButton href="/contact" variant="secondary">
                Ask a Question
              </PremiumButton>
            </div>
          </div>

          <div className="donation-trust-side">
            <div className="donation-trust-card">
              <div className="donation-trust-icon primary">
                <FiShield />
              </div>
              <div>
                <p className="donation-trust-label">Transparency</p>
                <h3 className="donation-trust-card-title">
                  Built on credibility, clarity, and responsible service
                </h3>
              </div>
            </div>

            <div className="donation-trust-card">
              <div className="donation-trust-icon gold">
                <FiHeart />
              </div>
              <div>
                <p className="donation-trust-label">Purpose</p>
                <h3 className="donation-trust-card-title">
                  Every gift helps strengthen education, care, and community support
                </h3>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default DonationTrustSection;