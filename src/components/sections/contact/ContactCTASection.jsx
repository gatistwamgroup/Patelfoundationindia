import { FiArrowUpRight, FiHeart, FiUsers } from "react-icons/fi";
import Container from "../../common/Container";
import PremiumButton from "../../common/PremiumButton";
import "../../../styles/contact/contact-page.css";

const ContactCTASection = () => {
  return (
    <section className="contact-cta-section">
      <Container>
        <div className="contact-cta-shell">
          <div className="contact-cta-content">
            <div className="contact-page-badge">
              <span className="contact-page-badge-dot" />
              Join the Mission
            </div>

            <h2 className="contact-page-title">
              Every connection can become a step toward{" "}
              <span className="text-gradient">meaningful change.</span>
            </h2>

            <p className="contact-page-description">
              Whether you want to donate, volunteer, collaborate, or simply
              start a conversation, Patel Foundation welcomes your support and
              your heart for service.
            </p>

            <div className="contact-cta-actions">
              <PremiumButton href="/donate">
                Support Our Mission <FiArrowUpRight />
              </PremiumButton>

              <PremiumButton href="/volunteer" variant="secondary">
                Become a Volunteer
              </PremiumButton>
            </div>
          </div>

          <div className="contact-cta-side">
            <div className="contact-cta-card">
              <div className="contact-cta-icon primary">
                <FiHeart />
              </div>
              <div>
                <p className="contact-cta-label">Partnerships</p>
                <h3 className="contact-cta-card-title">
                  Collaborate to create larger community impact
                </h3>
              </div>
            </div>

            <div className="contact-cta-card">
              <div className="contact-cta-icon gold">
                <FiUsers />
              </div>
              <div>
                <p className="contact-cta-label">Volunteer Support</p>
                <h3 className="contact-cta-card-title">
                  Join hands and become part of something meaningful
                </h3>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default ContactCTASection;