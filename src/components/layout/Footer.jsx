import {
  FiMapPin,
  FiMail,
  FiPhone,
  FiInstagram,
  FiFacebook,
  FiLinkedin,
  FiArrowUpRight,
  FiYoutube,
} from "react-icons/fi";
import { Link } from "react-router-dom";
import Container from "../common/Container";
import PremiumButton from "../common/PremiumButton";
import "../../styles/layout/footer.css";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <Container>
        {/* Top CTA Strip */}
        <div className="footer-top-cta">
          <div className="footer-top-cta-content">
            <p className="footer-top-cta-label">Support Patel Foundation</p>
            <h2 className="footer-top-cta-title">
              Together, we can create brighter futures through education, care,
              and compassion.
            </h2>
          </div>

          <div className="footer-top-cta-actions">
            <PremiumButton href="/donate">
              Donate Now <FiArrowUpRight />
            </PremiumButton>
            <PremiumButton href="/contact" variant="secondary">
              Contact Us
            </PremiumButton>
          </div>
        </div>

        {/* Main Footer Grid */}
        <div className="footer-main-grid">
          {/* Brand Column */}
          <div className="footer-brand-col">
            <Link to="/" className="footer-logo-link" aria-label="Patel Foundation Home">
              <img
                src="/logo-light.webp"
                alt="Patel Foundation"
                className="footer-logo"
              />
            </Link>

            <p className="footer-brand-text">
              Patel Foundation is committed to creating meaningful impact through
              child education, nutrition support, and community-focused social
              initiatives rooted in compassion and service.
            </p>

            <div className="footer-socials">
              <a href="https://www.instagram.com/patelfoundation_borsad/" aria-label="Instagram" className="footer-social-link" target="_blank" rel="noopener noreferrer">
                <FiInstagram />
              </a>
              <a href="https://www.facebook.com/profile.php?id=61574684506372" aria-label="Facebook" className="footer-social-link" target="_blank" rel="noopener noreferrer">
                <FiFacebook />
              </a>
              <a href="https://www.youtube.com/@PatelFoundationBorsad" aria-label="YouTube" className="footer-social-link" target="_blank" rel="noopener noreferrer">
                <FiYoutube />
              </a>
              <a href="https://www.linkedin.com/in/patel-foundation-ind-8836473aa/" aria-label="LinkedIn" className="footer-social-link" target="_blank" rel="noopener noreferrer">
                <FiLinkedin />
              </a>
            </div>
          </div>

          {/* Who We Are */}
          <div className="footer-links-col">
            <h3 className="footer-col-title">Who We Are</h3>
            <ul className="footer-links-list">
              <li>
                <Link to="/about">About Us</Link>
              </li>
              <li>
                <Link to="/team">Meet Our Team</Link>
              </li>
              <li>
                <Link to="/legal-documents">Legal Documents</Link>
              </li>
              <li>
                <Link to="/gallery">Gallery</Link>
              </li>
            </ul>
          </div>

          {/* What We Do */}
          <div className="footer-links-col">
            <h3 className="footer-col-title">What We Do</h3>
            <ul className="footer-links-list">
              <li>
                <Link to="/child-education">Child Education</Link>
              </li>
              <li>
                <Link to="/child-health-nutrition">Child Health & Nutrition</Link>
              </li>
              <li>
                <Link to="/social-activity">Social Activity</Link>
              </li>
              <li>
                <Link to="/donate">Support Our Mission</Link>
              </li>
            </ul>
          </div>

          {/* Get Involved */}
          <div className="footer-links-col">
            <h3 className="footer-col-title">Get Involved</h3>
            <ul className="footer-links-list">
              <li>
                <Link to="/contact">Contact Us</Link>
              </li>
              <li>
                <Link to="/volunteer">Volunteer</Link>
              </li>
              <li>
                <Link to="/donate">Donate</Link>
              </li>
              <li>
                <Link to="/contact">Partnership Inquiry</Link>
              </li>
            </ul>
          </div>

          {/* Contact Column */}
          <div className="footer-contact-col">
            <h3 className="footer-col-title">Contact Info</h3>

            <div className="footer-contact-list">
              <div className="footer-contact-item">
                <div className="footer-contact-icon">
                  <FiMapPin />
                </div>
                 <div>
                  <p className="footer-contact-label">Location</p>
                  <a 
                    href="https://maps.google.com/?q=Kavitha,Borsad,Anand,Gujarat,388545" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="footer-contact-link"
                  >
                    Near Milk Dairy, Kavitha, Borsad, Anand Pincode - 388545.
                  </a>
                </div>

              </div>

              <div className="footer-contact-item">
                <div className="footer-contact-icon">
                  <FiMail />
                </div>
                <div>
                  <p className="footer-contact-label">Email</p>
                  <a href="mailto:patelfoundation23@gmail.com" className="footer-contact-link">
                    patelfoundation23@gmail.com
                  </a>
                </div>
              </div>

              <div className="footer-contact-item">
                <div className="footer-contact-icon">
                  <FiPhone />
                </div>
                <div>
                  <p className="footer-contact-label">Phone</p>
                  <a href="tel:+919099817143" className="footer-contact-link">
                    +91 90998 17143
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="footer-bottom-strip">
          <p className="footer-bottom-copy">
            Designed by <a href="https://gatistwamgroup.com/" className="Gatistwam" target="_blank" rel="noopener noreferrer">
                    Gatistwam
                  </a>
          </p>
          <p className="footer-bottom-copy">
            © {currentYear} Patel Foundation. All rights reserved.
          </p>

          <div className="footer-bottom-links">
            <Link to="/privacy-policy">Privacy Policy</Link>
            <span className="footer-divider" />
            <Link to="/terms-of-service">Terms of Service</Link>
            <span className="footer-divider" />
            <Link to="/legal-documents">Legal Documents</Link>
            <span className="footer-divider" />
            <Link to="/contact">Contact</Link>
          </div>

        </div>
      </Container>
    </footer>
  );
};

export default Footer;