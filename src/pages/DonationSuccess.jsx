import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FiCheckCircle,
  FiArrowRight,
  FiHeart,
  FiHome,
  FiMail,
  FiClock,
  FiAlertCircle,
} from "react-icons/fi";
import SEO from "../components/common/SEO";
import Container from "../components/common/Container";
import "../styles/donation-status-page.css";

const DonationSuccessPage = () => {
  const [searchParams] = useSearchParams();
  const [paymentState, setPaymentState] = useState("processing"); 
  // processing | success | pending | error

  useEffect(() => {
    const token = searchParams.get("token"); // PayPal Order ID
    const donationRef = searchParams.get("donation_ref");

    if (!token) {
      setPaymentState("error");
      return;
    }

    const capturePayment = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/paypal/capture-order`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            orderID: token,
          }),
        });

        const result = await response.json();

        if (result.status === "COMPLETED") {
          setPaymentState("success");
        } else {
          console.error("Capture Error:", result);
          setPaymentState("pending");
        }
      } catch (error) {
        console.error("Capture request failed:", error);
        setPaymentState("error");
      }
    };

    capturePayment();
  }, [searchParams]);

  const getBadgeText = () => {
    if (paymentState === "processing") return "Processing Donation";
    if (paymentState === "success") return "Donation Successful";
    if (paymentState === "pending") return "Verification Pending";
    return "Verification Error";
  };

  const getTitle = () => {
    if (paymentState === "processing") {
      return (
        <>
          Processing your <span className="text-gradient">donation...</span>
        </>
      );
    }

    if (paymentState === "success") {
      return (
        <>
          Thank you for your <span className="text-gradient">generosity.</span>
        </>
      );
    }

    if (paymentState === "pending") {
      return (
        <>
          Donation received, <span className="text-gradient">verification pending.</span>
        </>
      );
    }

    return (
      <>
        We’re verifying your <span className="text-gradient">donation.</span>
      </>
    );
  };

  const getDescription = () => {
    if (paymentState === "processing") {
      return "Please wait while we securely verify and complete your PayPal donation.";
    }

    if (paymentState === "success") {
      return "Your donation has been completed successfully and marked as Paid. Your support helps us continue providing education, care, and meaningful community impact for children and families in need.";
    }

    if (paymentState === "pending") {
      return "Your payment was approved, but final confirmation is still pending. Our system or PayPal webhook will update your donation status shortly.";
    }

    return "We could not verify your donation immediately. If your payment was completed, our system may still update the status automatically shortly.";
  };

  const getIcon = () => {
    if (paymentState === "processing") return <FiClock />;
    if (paymentState === "success") return <FiCheckCircle />;
    if (paymentState === "pending") return <FiClock />;
    return <FiAlertCircle />;
  };

  const getIconClass = () => {
    if (paymentState === "success") return "donation-status-icon success-icon";
    if (paymentState === "processing") return "donation-status-icon";
    if (paymentState === "pending") return "donation-status-icon";
    return "donation-status-icon";
  };

  const getBadgeClass = () => {
    if (paymentState === "success") return "donation-status-badge success-badge";
    return "donation-status-badge";
  };

  return (
    <>
      <SEO
        title="Donation Status | Patel Foundation"
        description="Thank you for your generous donation to Patel Foundation. Your support helps us continue creating meaningful impact."
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
              <div className={getIconClass()}>
                {getIcon()}
              </div>

              {/* Badge */}
              <div className={getBadgeClass()}>
                {getBadgeText()}
              </div>

              {/* Heading */}
              <h1 className="donation-status-title">
                {getTitle()}
              </h1>

              {/* Description */}
              <p className="donation-status-description">
                {getDescription()}
              </p>

              {/* Impact Highlights */}
              <div className="donation-status-highlights">
                <div className="status-highlight-card">
                  <span className="status-highlight-icon">
                    <FiHeart />
                  </span>
                  <div>
                    <h3>Real Impact</h3>
                    <p>Your gift supports meaningful programs with purpose.</p>
                  </div>
                </div>

                <div className="status-highlight-card">
                  <span className="status-highlight-icon">
                    <FiMail />
                  </span>
                  <div>
                    <h3>Confirmation</h3>
                    <p>
                      {paymentState === "success"
                        ? "Your donation is completed and may be followed by an email confirmation."
                        : "Your donation status may update shortly, and you may receive an email confirmation."}
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
                  Contact Us <FiArrowRight />
                </Link>
              </div>

              {/* Bottom Note */}
              <div className="donation-status-note">
                {paymentState === "success"
                  ? "Every contribution creates hope, dignity, and opportunity."
                  : "If payment was completed, your dashboard status may update automatically shortly."}
              </div>
            </motion.div>
          </div>
        </Container>
      </section>
    </>
  );
};

export default DonationSuccessPage;