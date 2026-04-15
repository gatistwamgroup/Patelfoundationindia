import { FiArrowUpRight, FiGlobe, FiHeart, FiMapPin } from "react-icons/fi";
import Container from "../../common/Container";
import PremiumButton from "../../common/PremiumButton";
import "../../../styles/about/founder-story-section.css";

const FounderStorySection = () => {
  return (
    <section className="founder-story-section">
      <Container>
        <div className="founder-story-shell">
          {/* Left Content */}
          <div className="founder-story-content">
            <div className="founder-story-badge">
              <span className="founder-story-badge-dot" />
              Founder Story
            </div>

            <h2 className="founder-story-title">
              A mission led by{" "}
              <span className="text-gradient">Monika Patel</span>, connecting
              generosity in the USA with meaningful impact in India.
            </h2>

            <p className="founder-story-description">
              Based in <strong>New Jersey, USA</strong>, Monika Patel envisioned
              Patel Foundation as more than an organization — she envisioned it
              as a bridge of compassion. With a deep sense of responsibility
              toward community upliftment, she began building support through
              trusted relationships, heartfelt fundraising efforts, and a clear
              purpose rooted in service.
            </p>

            <p className="founder-story-description">
              Her mission is simple yet powerful: to mobilize kindness and
              resources from supporters in the United States and channel that
              support toward children, families, and communities in India who
              need it most. Every contribution is driven by care, dignity, and a
              commitment to creating real, lasting value.
            </p>

            <p className="founder-story-description">
              Through Patel Foundation, Monika continues to lead with
              compassion, transparency, and long-term vision — ensuring that
              every effort is not only meaningful today, but also helps shape a
              stronger tomorrow.
            </p>

            <div className="founder-story-points">
              <div className="founder-story-point">
                <span className="founder-story-point-icon">
                  <FiMapPin />
                </span>
                <span>New Jersey, USA based founder with a global service mindset</span>
              </div>

              <div className="founder-story-point">
                <span className="founder-story-point-icon">
                  <FiGlobe />
                </span>
                <span>Builds support internationally and directs impact toward India</span>
              </div>

              <div className="founder-story-point">
                <span className="founder-story-point-icon">
                  <FiHeart />
                </span>
                <span>Driven by compassion, trust, and long-term community upliftment</span>
              </div>
            </div>

            <div className="founder-story-actions">
              <PremiumButton href="/contact">
                Connect With Our Team <FiArrowUpRight />
              </PremiumButton>

              <PremiumButton href="/donate" variant="secondary">
                Support the Mission
              </PremiumButton>
            </div>
          </div>

          {/* Right Visual */}
          <div className="founder-story-visual">
            <div className="founder-photo-card">
              <img
                src="/images/about/founder-monika-patel.jpg"
                alt="Monika Patel - Founder of Patel Foundation"
                className="founder-photo-image"
              />

              <div className="founder-photo-overlay-card">
                <p className="founder-photo-role">Founder</p>
                <h3 className="founder-photo-name">Monika Patel</h3>
                <p className="founder-photo-location">New Jersey, USA</p>
              </div>
            </div>

            <div className="founder-story-quote-card">
              <p className="founder-story-quote">
                “True impact begins when compassion crosses borders and reaches
                those who need it most.”
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default FounderStorySection;