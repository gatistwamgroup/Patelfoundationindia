import { motion } from "framer-motion";
import { FiCheckCircle, FiArrowRight, FiHeart, FiHome, FiMail, FiClock } from "react-icons/fi";
import { Link } from "react-router-dom";
import SEO from "../components/common/SEO";
import Container from "../components/common/Container";
import "../styles/donation-status-page.css";

const IndiaDonationSuccess = () => {
  return (
    <>
      <SEO
        title="Donation Submitted | Patel Foundation"
        description="Thank you for submitting your donation details. We are currently verifying your contribution."
      />

      <section className="donation-status-page donation-success-page">
        <div className="status-bg-orb status-orb-1" />
        <div className="status-bg-orb status-orb-2" />

        <Container>
          <div className="donation-status-wrap">
            <motion.div
              className="donation-status-card"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55 }}
            >
              {/* Top Icon */}
              <div className="donation-status-icon success-icon">
                <FiCheckCircle />
              </div>

              {/* Badge */}
              <div className="donation-status-badge success-badge">
                Submission Received
              </div>

              {/* Heading */}
              <h1 className="donation-status-title">
                Thank you for your <span className="text-gradient">contribution!</span>
              </h1>

              {/* Description */}
              <p className="donation-status-description">
                Your donation details have been successfully submitted for verification. Since bank transfers require manual review, our team will verify the transaction ID and update our records shortly.
              </p>

              {/* Impact Highlights */}
              <div className="donation-status-highlights">
                <div className="status-highlight-card">
                  <span className="status-highlight-icon">
                    <FiHeart />
                  </span>
                  <div>
                    <h3>Next Steps</h3>
                    <p>Our team will cross-verify the transaction with our bank statements.</p>
                  </div>
                </div>

                <div className="status-highlight-card">
                  <span className="status-highlight-icon">
                    <FiMail />
                  </span>
                  <div>
                    <h3>Confirmation</h3>
                    <p>
                      You may receive a confirmation email once the verification is complete.
                    </p>
                  </div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="donation-status-actions">
                <Link to="/" className="status-primary-btn">
                  Back to Home <FiHome />
                </Link>

                <Link to="/contact" className="status-secondary-btn">
                  Contact Support <FiArrowRight />
                </Link>
              </div>

              {/* Bottom Note */}
              <div className="donation-status-note">
                Your generosity provides education and hope to children in need.
              </div>
            </motion.div>
          </div>
        </Container>
      </section>
    </>
  );
};

export default IndiaDonationSuccess;
