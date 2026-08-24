import { FiArrowUpRight, FiHeart, FiShield } from "react-icons/fi";
import Container from "../../common/Container";
import PremiumButton from "../../common/PremiumButton";
import "../../../styles/about/about-intro-section.css";

const AboutIntroSection = () => {
  return (
    <section className="about-intro-section">
      <Container>
        <div className="about-intro-grid">
          {/* Left Visual */}
          <div className="about-intro-visual">
            <div className="about-intro-main-image-wrap">
              <img
                src="/images/about/about-intro-main.webp"
                alt="Patel Foundation community support"
                className="about-intro-main-image"
              />

              <div className="about-intro-floating-card">
                <div className="about-intro-floating-icon">
                  <FiHeart />
                </div>
                <div>
                  <p className="about-intro-floating-label">Community First</p>
                  <h4 className="about-intro-floating-title">
                    Compassion with measurable impact
                  </h4>
                </div>
              </div>
            </div>

            <div className="about-intro-side-image-wrap">
              <img
                src="/images/about/about-intro-side.webp"
                alt="Children education support"
                className="about-intro-side-image"
              />
            </div>
          </div>

          {/* Right Content */}
          <div className="about-intro-content">
            <div className="about-intro-badge">
              <span className="about-intro-badge-dot" />
              About Patel Foundation
            </div>

            <h2 className="about-intro-title">
              Building a future through{" "}
              <span className="text-gradient">care, education, and trust.</span>
            </h2>

            <p className="about-intro-description">
              Patel Foundation is dedicated to creating meaningful change through
              compassionate action, child-focused support, and community-driven
              initiatives. We believe every child deserves opportunity, dignity,
              and the support needed to build a brighter future.
            </p>

            <p className="about-intro-description">
              Our work is rooted in service, transparency, and long-term impact —
              helping communities grow stronger through education, wellness, and
              social upliftment programs designed with purpose.
            </p>

            <div className="about-intro-stats">
              <div className="about-intro-stat-card">
                <div className="about-intro-stat-icon primary">
                  <FiHeart />
                </div>
                <div>
                  <h3 className="about-intro-stat-value">500+</h3>
                  <p className="about-intro-stat-label">Lives positively touched</p>
                </div>
              </div>

              <div className="about-intro-stat-card">
                <div className="about-intro-stat-icon gold">
                  <FiShield />
                </div>
                <div>
                  <h3 className="about-intro-stat-value">100%</h3>
                  <p className="about-intro-stat-label">Purpose-driven commitment</p>
                </div>
              </div>
            </div>

            <div className="about-intro-actions">
              <PremiumButton href="/child-education">
                Explore Our Work <FiArrowUpRight />
              </PremiumButton>

              <PremiumButton href="/contact" variant="secondary">
                Contact Us
              </PremiumButton>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default AboutIntroSection;