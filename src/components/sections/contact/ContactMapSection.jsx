import { FiMapPin, FiGlobe, FiHeart } from "react-icons/fi";
import Container from "../../common/Container";
import "../../../styles/contact/contact-page.css";

const ContactMapSection = () => {
  return (
    <section className="contact-map-section">
      <Container>
        <div className="contact-map-shell">
          {/* Left - Map Placeholder / Embed Ready */}
          <div className="contact-map-card">

            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14750.616379370353!2d72.8817991!3d22.442041549999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395fad33f5b08e95%3A0xd01283e49afbabb0!2sKavitha%2C%20Gujarat%20388545!5e0!3m2!1sen!2sin!4v1774005837476!5m2!1sen!2sin"
              width="100%"
              height="767px"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="contact-map-iframe"
              title="Patel Foundation Location"
            />
           
          </div>

          {/* Right */}
          <div className="contact-location-content">
            <div className="contact-page-badge">
              <span className="contact-page-badge-dot" />
              Global Connection, Local Impact
            </div>

            <h2 className="contact-page-title">
              Guided from the U.S., creating impact{" "}
              <span className="text-gradient">where it matters most.</span>
            </h2>

            <p className="contact-page-description">
              Patel Foundation’s coordination and donor engagement is managed
              from New Jersey, USA, while our support initiatives are focused on
              helping communities in India through education, nutrition, and
              social outreach.
            </p>

            <div className="contact-location-points">
              <div className="contact-location-point">
                <div className="contact-location-icon">
                  <FiGlobe />
                </div>
                <div>
                  <p className="contact-location-label">Cross-Border Impact</p>
                  <h3 className="contact-location-title">
                    Global support with community-focused execution
                  </h3>
                </div>
              </div>

              <div className="contact-location-point">
                <div className="contact-location-icon">
                  <FiHeart />
                </div>
                <div>
                  <p className="contact-location-label">Mission Driven</p>
                  <h3 className="contact-location-title">
                    Compassion-led initiatives rooted in service
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default ContactMapSection;