import { FiCoffee, FiArrowUpRight, FiCheckCircle } from "react-icons/fi";
import Container from "../../common/Container";
import PremiumButton from "../../common/PremiumButton";
import "../../../styles/services/health-page.css";

const HealthIntroSection = () => {
  return (
    <section className="health-intro-section">
      <Container>
        <div className="health-intro-grid">
          <div className="health-intro-visual">
            <div className="health-image-shell">
              <img
                src="/images/health/health-intro.webp"
                alt="Child Health and Nutrition Support"
                className="health-main-image"
              />

              <div className="health-floating-card">
                <div className="health-floating-icon">
                  <FiCoffee />
                </div>
                <div>
                  <p className="health-floating-label">Daily Care</p>
                  <h3 className="health-floating-title">Nutrition + Learning</h3>
                </div>
              </div>
            </div>
          </div>
          <div className="health-intro-content">
            <div className="health-section-badge">
              <span className="health-section-badge-dot" />
              Child Health & Nutrition
            </div>

            <h2 className="health-section-title">
              Supporting children through{" "}
              <span className="text-gradient">nutrition, care, and daily consistency.</span>
            </h2>

            <p className="health-section-description">
              Patel Foundation believes that healthy children learn better,
              grow stronger, and feel more confident. Our child health and
              nutrition efforts are designed to support children through
              meaningful care connected with everyday learning.
            </p>

            <p className="health-section-description">
              As part of our regular support, children attending evening tuition
              classes receive breakfast support daily, and once every week, we
              provide a special dinner to encourage nourishment, dignity, and a
              stronger sense of community.
            </p>

            <div className="health-points">
              <div className="health-point">
                <FiCheckCircle />
                <span>Daily breakfast support for children in tuition classes</span>
              </div>
              <div className="health-point">
                <FiCheckCircle />
                <span>Weekly dinner support to promote nutrition and care</span>
              </div>
              <div className="health-point">
                <FiCheckCircle />
                <span>Health-focused support linked with learning and well-being</span>
              </div>
            </div>

            <div className="health-actions">
              <PremiumButton href="/donate">
                Support Nutrition <FiArrowUpRight />
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

export default HealthIntroSection;