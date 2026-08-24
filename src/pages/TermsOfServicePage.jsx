import React from "react";
import PageHero from "../components/common/PageHero";
import SEO from "../components/common/SEO";
import Container from "../components/common/Container";
import "../styles/legal-pages.css";

const TermsOfServicePage = () => {
  const lastUpdated = "May 14, 2024";

  return (
    <>
      <SEO
        title="Terms of Service | Patel Foundation India"
        description="Read the terms and conditions for using the Patel Foundation India website and our donation services."
        url="https://mypatelfoundation.in/terms-of-service"
      />
      
      <PageHero
        badge="Legal"
        title="Terms and Conditions"
        highlight="Terms"
        description="By using our website, you agree to comply with the following terms and conditions of use."
        image="/images/legal/legal-hero.webp"
      />

      <section className="legal-content-section py-20">
        <Container>
          <div className="legal-document-shell max-w-4xl mx-auto">
            <div className="legal-update-info mb-10 text-gray-500">
              Last Updated: {lastUpdated}
            </div>

            <div className="legal-text-block">
              <h3>1. Acceptance of Terms</h3>
              <p>
                By accessing and using the Patel Foundation website (https://mypatelfoundation.in/), you accept and agree to be bound by the terms and provision of this agreement.
              </p>

              <h3>2. Use of Website</h3>
              <p>
                The content of this website is for your general information and use only. It is subject to change without notice. Unauthorized use of this website may give rise to a claim for damages and/or be a criminal offense.
              </p>

              <h3>3. Donation Policy</h3>
              <ul>
                <li><strong>Voluntary Contributions:</strong> All donations made to Patel Foundation are voluntary.</li>
                <li><strong>Accuracy of Information:</strong> Donors are responsible for providing accurate personal and payment information.</li>
                <li><strong>Refunds:</strong> Donations are generally non-refundable. However, if a donation was made in error, please contact us within 7 days for review.</li>
                <li><strong>International Donations:</strong> International donors are responsible for complying with their local tax laws regarding charitable contributions.</li>
              </ul>

              <h3>4. Intellectual Property</h3>
              <p>
                This website contains material which is owned by or licensed to us. This material includes, but is not limited to, the design, layout, look, appearance, graphics, and images. Reproduction is prohibited other than in accordance with the copyright notice.
              </p>

              <h3>5. User Conduct</h3>
              <p>
                You agree not to use the website for any purpose that is unlawful or prohibited by these Terms. You may not use the website in any manner that could damage, disable, overburden, or impair any Patel Foundation server or the networks connected to any Patel Foundation server.
              </p>

              <h3>6. Limitation of Liability</h3>
              <p>
                Patel Foundation shall not be liable for any direct, indirect, incidental, special, or consequential damages resulting from the use or inability to use the website or for the cost of procurement of substitute goods and services.
              </p>

              <h3>7. Links to Third-Party Sites</h3>
              <p>
                Our website may contain links to other websites (such as PayPal). These links are provided for your convenience to provide further information. They do not signify that we endorse the website(s). We have no responsibility for the content of the linked website(s).
              </p>

              <h3>8. Governing Law</h3>
              <p>
                Your use of this website and any dispute arising out of such use of the website is subject to the laws of India and the jurisdiction of the courts in Anand/Gujarat.
              </p>

              <h3>9. Modification of Terms</h3>
              <p>
                Patel Foundation reserves the right to change these terms at any time by posting changes online. Your continued use of this site after changes are posted constitutes your acceptance of this agreement as modified.
              </p>

              <h3>10. Contact Information</h3>
              <p>
                If you have any questions regarding these Terms of Service, please contact us at <strong>patelfoundation23@gmail.com</strong>.
              </p>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
};

export default TermsOfServicePage;
