import { FiBookOpen, FiArrowUpRight, FiCheckCircle } from "react-icons/fi";
import Container from "../../common/Container";
import PremiumButton from "../../common/PremiumButton";
import "../../../styles/services/education-intro-section.css";

const EducationIntroSection = () => {
  return (
    <section className="education-intro-section">
      <Container>
        <div className="education-intro-grid">
           {/* Right */}
          <div className="education-intro-visual">
            <div className="education-intro-image-shell">
              <img
                src="/images/education/education-intro.webp"
                alt="Child Education Support"
                className="education-intro-image"
              />

              <div className="education-intro-floating-card">
                <div className="education-intro-floating-icon">
                  <FiBookOpen />
                </div>
                <div>
                  <p className="education-intro-floating-label">Focused Initiative</p>
                  <h3 className="education-intro-floating-title">Education First</h3>
                </div>
              </div>
            </div>
          </div>
          {/* Left */}
          <div className="education-intro-content">
            <div className="education-intro-badge">
              <span className="education-intro-badge-dot" />
              Child Education
            </div>

            <h2 className="education-intro-title">
              Empowering children through{" "}
              <span className="text-gradient">education, opportunity, and hope.</span>
            </h2>

            <p className="education-intro-description">
              At Patel Foundation, education is at the heart of long-term
              transformation. We believe every child deserves access to learning,
              encouragement, and the tools needed to build a stronger future.
            </p>

            <p className="education-intro-description">
              Through school support, educational resources, and community-led
              initiatives, we help create opportunities that inspire confidence,
              growth, and brighter possibilities for children and families.
            </p>

            <div className="education-intro-points">
              <div className="education-intro-point">
                <FiCheckCircle />
                <span>School support and educational access</span>
              </div>
              <div className="education-intro-point">
                <FiCheckCircle />
                <span>Books, supplies, and learning essentials</span>
              </div>
              <div className="education-intro-point">
                <FiCheckCircle />
                <span>Confidence-building through meaningful support</span>
              </div>
            </div>

            <div className="education-intro-actions">
              <PremiumButton href="/donate">
                Support Child Education <FiArrowUpRight />
              </PremiumButton>

              <PremiumButton href="/contact" variant="secondary">
                Learn More
              </PremiumButton>
            </div>
          </div>

         
        </div>
      </Container>
    </section>
  );
};

export default EducationIntroSection;