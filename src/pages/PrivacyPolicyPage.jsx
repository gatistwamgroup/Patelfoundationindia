import React from "react";
import PageHero from "../components/common/PageHero";
import SEO from "../components/common/SEO";
import Container from "../components/common/Container";
import "../styles/legal-pages.css";

const PrivacyPolicyPage = () => {
  const lastUpdated = "May 14, 2024";

  return (
    <>
      <SEO
        title="Privacy Policy | Patel Foundation India"
        description="Learn how Patel Foundation India collects, uses, and protects your information. Our commitment to your privacy and data security."
        url="https://mypatelfoundation.in/privacy-policy"
      />
      
      <PageHero
        badge="Legal"
        title="Our Commitment to Your Privacy"
        highlight="Privacy"
        description="At Patel Foundation, we value the trust you place in us. This policy explains how we collect and protect your information."
        image="/images/legal/legal-hero.webp"
      />

      <section className="legal-content-section py-20">
        <Container>
          <div className="legal-document-shell max-w-4xl mx-auto">
            <div className="legal-update-info mb-10 text-gray-500">
              Last Updated: {lastUpdated}
            </div>

            <div className="legal-text-block">
              <h3>1. Introduction</h3>
              <p>
                Patel Foundation India ("we," "us," or "our") is committed to protecting the privacy of our donors, volunteers, and supporters. This Privacy Policy outlines our practices regarding the collection, use, and disclosure of information when you use our website or interact with our services.
              </p>

              <h3>2. Information We Collect</h3>
              <p>We may collect personal information that you voluntarily provide to us, including but not limited to:</p>
              <ul>
                <li><strong>Donor Information:</strong> Name, email address, phone number, mailing address, and payment details (processed securely via PayPal or bank transfer records).</li>
                <li><strong>Volunteer Information:</strong> Name, contact details, and any background information provided for volunteer applications.</li>
                <li><strong>Technical Information:</strong> IP address, browser type, and usage data collected through cookies and analytics tools (e.g., Google Analytics).</li>
              </ul>

              <h3>3. How We Use Your Information</h3>
              <p>We use the collected information for the following purposes:</p>
              <ul>
                <li>To process and acknowledge donations.</li>
                <li>To send tax receipts and impact reports.</li>
                <li>To coordinate volunteer activities and community programs.</li>
                <li>To improve our website functionality and user experience.</li>
                <li>To comply with legal and regulatory requirements in India and internationally.</li>
              </ul>

              <h3>4. Data Security</h3>
              <p>
                We implement robust security measures to protect your personal data. Payment information is handled through secure, industry-standard gateways (PayPal). We do not store full credit card details on our servers. Bank transfer details for India-based donations are handled with strict confidentiality.
              </p>

              <h3>5. Information Sharing</h3>
              <p>
                We do not sell, rent, or trade your personal information to third parties. We may share information with trusted service providers (such as payment processors) solely for the purpose of carrying out our operations.
              </p>

              <h3>6. Your Rights</h3>
              <p>
                You have the right to access, correct, or request the deletion of your personal information. If you wish to opt-out of future communications or have questions about your data, please contact us at <strong>patelfoundation23@gmail.com</strong>.
              </p>

              <h3>7. Cookies</h3>
              <p>
                Our website uses cookies to enhance your browsing experience. You can choose to disable cookies through your browser settings, though this may affect some website features.
              </p>

              <h3>8. Changes to This Policy</h3>
              <p>
                We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated "Last Updated" date.
              </p>

              <h3>9. Contact Us</h3>
              <p>
                If you have any questions about this Privacy Policy, please contact us at:
                <br /><br />
                <strong>Patel Foundation</strong><br />
                Near Milk Dairy, Kavitha, Borsad,<br />
                Anand, Gujarat - 388545<br />
                Email: patelfoundation23@gmail.com<br />
                Phone: +91 90998 17143
              </p>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
};

export default PrivacyPolicyPage;
