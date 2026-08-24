import { FiArrowUpRight, FiHeart, FiGlobe, FiShield } from "react-icons/fi";
import Container from "../../common/Container";
import PremiumButton from "../../common/PremiumButton";
import "../../../styles/about/about-final-cta-section.css";

const AboutFinalCTASection = () => {
  return (
    <section className="about-final-cta-section">
      <Container>
        <div className="about-final-cta-shell">
          {/* Left Content */}
          <div className="about-final-cta-content">
            <div className="about-final-cta-badge">
              <span className="about-final-cta-badge-dot" />
              Join the Journey
            </div>

            <h2 className="about-final-cta-title">
              Help us turn <span className="text-gradient">compassion into impact</span>
              {" "}— from the USA to communities in India.
            </h2>

            <p className="about-final-cta-description">
              Patel Foundation exists to connect generosity with meaningful action.
              With support led through trusted fundraising efforts in the United
              States and impact-focused initiatives in India, every contribution
              becomes part of a larger story of care, dignity, and hope.
            </p>

            <p className="about-final-cta-description">
              Whether you choose to donate, volunteer, or simply connect with our
              mission, your support helps strengthen lives and create a more
              compassionate future.
            </p>
          </div>

          {/* Right Cards */}
          <div className="about-final-cta-side">
            <div className="about-final-cta-info-card primary">
              <div className="about-final-cta-info-icon primary">
                <FiGlobe />
              </div>
              <div>
                <p className="about-final-cta-info-label">Global Mission</p>
                <h3 className="about-final-cta-info-title">USA Support → India Impact</h3>
              </div>
            </div>

            <div className="about-final-cta-info-card gold">
              <div className="about-final-cta-info-icon gold">
                <FiHeart />
              </div>
              <div>
                <p className="about-final-cta-info-label">Purpose-Driven</p>
                <h3 className="about-final-cta-info-title">Compassion, care, and community upliftment</h3>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="about-final-cta-bottom">
            <div className="about-final-cta-actions">
              <PremiumButton href="/donate">
                Support Our Mission <FiArrowUpRight />
              </PremiumButton>

              <PremiumButton href="/volunteer" variant="secondary">
                Become a Volunteer
              </PremiumButton>
            </div>

            <div className="about-final-cta-trust">
              <span className="about-final-cta-trust-icon">
                <FiShield />
              </span>
              <p>
                Built on trust, guided by compassion, and committed to meaningful
                long-term impact.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default AboutFinalCTASection;