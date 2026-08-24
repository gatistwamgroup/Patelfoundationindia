import { FiHeart, FiShield, FiUsers, FiArrowDown } from "react-icons/fi";
import Container from "../../common/Container";
import "../../../styles/donate/raksha-bandhan.css";

const RakshaBandhanHeroSection = () => {
  const scrollToForm = () => {
    const el = document.getElementById("rb-donation-form");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className="rb-hero">
      <Container>
        <div className="rb-hero-grid">
          {/* LEFT CONTENT */}
          <div className="rb-hero-content">
            <div className="rb-hero-badge">
              <span className="rb-hero-badge-dot" />
              Raksha Bandhan Special Campaign
            </div>

            <h1 className="rb-hero-title">
              This Raksha Bandhan, become the{" "}
              <span className="rb-text-gradient">Rakhi Bhai/Behen</span> a child
              never had.
            </h1>

            <p className="rb-hero-description">
              Every child deserves someone to protect them. This Raksha Bandhan,
              tie a rakhi of hope by sponsoring a child's education, nutrition,
              and healthcare through Patel Foundation. Your small promise can
              become their lifelong protection.
            </p>

            <div className="rb-hero-actions">
              <button type="button" className="rb-hero-cta" onClick={scrollToForm}>
                Donate for Raksha Bandhan <FiArrowDown />
              </button>
            </div>

            <div className="rb-hero-trust">
              <div className="rb-hero-trust-item">
                <FiHeart /> 500+ Children Supported
              </div>
              <div className="rb-hero-trust-item">
                <FiShield /> 80G Tax Benefit
              </div>
              <div className="rb-hero-trust-item">
                <FiUsers /> 100% Transparent
              </div>
            </div>
          </div>

          {/* RIGHT VISUAL */}
          <div className="rb-hero-visual">
            <div className="rb-hero-visual-card">
              <img
                src="/images/home/donation-cta.webp"
                alt="Raksha Bandhan donation for children - Patel Foundation"
              />
              <div className="rb-hero-visual-badge">
                <div className="rb-hero-visual-badge-icon">
                  <FiHeart />
                </div>
                <div className="rb-hero-visual-badge-text">
                  <strong>Tie a Rakhi of Hope</strong>
                  <span>Protect a child this festive season</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default RakshaBandhanHeroSection;
