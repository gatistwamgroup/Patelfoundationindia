import { FiEye, FiArrowUpRight, FiCheckCircle } from "react-icons/fi";
import Container from "../../common/Container";
import PremiumButton from "../../common/PremiumButton";
import "../../../styles/services/social-page.css";

const SocialIntroSection = () => {
  return (
    <section className="social-intro-section">
      <Container>
        <div className="social-intro-grid">
          <div className="social-intro-content">
            <div className="social-section-badge">
              <span className="social-section-badge-dot" />
              Social Activity
            </div>

            <h2 className="social-section-title">
              Community-focused initiatives that create{" "}
              <span className="text-gradient">care, awareness, and support.</span>
            </h2>

            <p className="social-section-description">
              Patel Foundation extends its mission beyond education and nutrition
              through social activities that directly support communities with
              care, dignity, and practical help.
            </p>

            <p className="social-section-description">
              Our social initiatives include eye camps, health checkup support,
              community awareness efforts, and essential supplies distribution —
              each designed to respond to real needs with compassion and
              meaningful service.
            </p>

            <div className="social-points">
              <div className="social-point">
                <FiCheckCircle />
                <span>Eye camp and vision support initiatives</span>
              </div>
              <div className="social-point">
                <FiCheckCircle />
                <span>Community health and awareness programs</span>
              </div>
              <div className="social-point">
                <FiCheckCircle />
                <span>Essential support and outreach for families in need</span>
              </div>
            </div>

            <div className="social-actions">
              <PremiumButton href="/donate">
                Support Social Initiatives <FiArrowUpRight />
              </PremiumButton>

              <PremiumButton href="/contact" variant="secondary">
                Learn More
              </PremiumButton>
            </div>
          </div>

          <div className="social-intro-visual">
            <div className="social-image-shell">
              <img
                src="/images/social/social-intro.jpg"
                alt="Social Activity Support"
                className="social-main-image"
              />

              <div className="social-floating-card">
                <div className="social-floating-icon">
                  <FiEye />
                </div>
                <div>
                  <p className="social-floating-label">Community Outreach</p>
                  <h3 className="social-floating-title">Eye Camp & Care</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default SocialIntroSection;