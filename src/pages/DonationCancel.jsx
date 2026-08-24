import { Link, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FiXCircle,
  FiArrowRight,
  FiRefreshCcw,
  FiHome,
  FiMail,
} from "react-icons/fi";
import SEO from "../components/common/SEO";
import Container from "../components/common/Container";
import "../styles/donation-status-page.css";

const DonationCancelPage = () => {
  const [searchParams] = useSearchParams();
  const donationRef = searchParams.get("donation_ref");

  return (
    <>
      <SEO
        title="Donation Cancelled | Patel Foundation"
        description="Your donation process was cancelled. You can return anytime to continue supporting Patel Foundation."
      />

      <section className="donation-status-page donation-cancel-page">
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
              <div className="donation-status-icon cancel-icon">
                <FiXCircle />
              </div>

              {/* Badge */}
              <div className="donation-status-badge cancel-badge">
                Donation Cancelled
              </div>

              {/* Heading */}
              <h1 className="donation-status-title">
                Your donation was <span className="text-gradient">not completed.</span>
              </h1>

              {/* Description */}
              <p className="donation-status-description">
                It looks like the PayPal donation process was cancelled before
                completion. No amount has been marked as paid. You can return
                anytime and continue supporting our mission when you’re ready.
              </p>

              {/* Optional Donation Ref */}
              {donationRef && (
                <div
                  style={{
                    marginTop: "14px",
                    marginBottom: "10px",
                    fontSize: "14px",
                    fontWeight: 600,
                    color: "#64748b",
                  }}
                >
                  Reference: <span style={{ color: "#1d4ed8" }}>{donationRef}</span>
                </div>
              )}

              {/* Info Highlights */}
              <div className="donation-status-highlights">
                <div className="status-highlight-card">
                  <span className="status-highlight-icon">
                    <FiRefreshCcw />
                  </span>
                  <div>
                    <h3>Try Again Anytime</h3>
                    <p>You can return to the donation page and try again in seconds.</p>
                  </div>
                </div>

                <div className="status-highlight-card">
                  <span className="status-highlight-icon">
                    <FiMail />
                  </span>
                  <div>
                    <h3>Need Help?</h3>
                    <p>If you faced any issue during checkout, our team can assist you.</p>
                  </div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="donation-status-actions">
                <Link to="/donate" className="status-primary-btn">
                  Try Donation Again <FiArrowRight />
                </Link>

                <Link to="/" className="status-secondary-btn">
                  Back to Home <FiHome />
                </Link>
              </div>

              {/* Bottom Note */}
              <div className="donation-status-note">
                Your support matters, and we’re always here whenever you’re ready.
              </div>
            </motion.div>
          </div>
        </Container>
      </section>
    </>
  );
};

export default DonationCancelPage;