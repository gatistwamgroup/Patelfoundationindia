import { Link } from "react-router-dom";
import { FiArrowRight, FiHome, FiMail } from "react-icons/fi";
import SEO from "../components/common/SEO";
import Container from "../components/common/Container";
import "../styles/not-found-page.css";



const NotFoundPage = () => {
  return (
    <>
    <SEO
  title="Page Not Found | Patel Foundation"
  description="The page you are looking for could not be found. Explore Patel Foundation’s initiatives, volunteer opportunities, and donation programs."
  keywords="404 page, page not found, Patel Foundation"
  url="https://mypatelfoundation.in/404"
  image="https://mypatelfoundation.in/og-image.webp"
/>
    <main className="notfound-page">
      <section className="notfound-hero">
        <Container>
          <div className="notfound-shell">
            {/* Left Content */}
            <div className="notfound-content">
              <div className="notfound-badge">
                <span className="notfound-badge-dot"></span>
                Page Not Found
              </div>

              <p className="notfound-code">404</p>

              <h1 className="notfound-title">
                Oops! This page seems to be
                <span> missing from our mission.</span>
              </h1>

              <p className="notfound-description">
                The page you’re looking for may have been moved, renamed, or no
                longer exists. But our mission to support children, families,
                and communities continues.
              </p>

              <div className="notfound-actions">
                <Link to="/" className="notfound-btn notfound-btn-primary">
                  <FiHome />
                  <span>Back to Home</span>
                  <FiArrowRight />
                </Link>

                <Link to="/contact" className="notfound-btn notfound-btn-secondary">
                  <FiMail />
                  <span>Contact Us</span>
                </Link>
              </div>

              <div className="notfound-points">
                <div className="notfound-point-card">
                  <span className="notfound-point-icon">❤</span>
                  <p>Compassion Driven</p>
                </div>

                <div className="notfound-point-card">
                  <span className="notfound-point-icon">🛡</span>
                  <p>Trusted Foundation</p>
                </div>

                <div className="notfound-point-card">
                  <span className="notfound-point-icon">👥</span>
                  <p>Community Focused</p>
                </div>
              </div>
            </div>

            {/* Right Visual */}
            <div className="notfound-visual">
              <div className="notfound-card">
                <div className="notfound-card-top">
                  <span className="notfound-mini-badge">Help Center</span>
                  <h3>Let’s guide you back</h3>
                  <p>
                    Explore the right path and continue supporting meaningful
                    impact through Patel Foundation.
                  </p>
                </div>

                <div className="notfound-illustration">
                  <div className="notfound-circle notfound-circle-1"></div>
                  <div className="notfound-circle notfound-circle-2"></div>
                  <div className="notfound-circle notfound-circle-3"></div>

                  <div className="notfound-number-wrap">
                    <span className="notfound-number">4</span>
                    <span className="notfound-number zero">0</span>
                    <span className="notfound-number">4</span>
                  </div>
                </div>

                <div className="notfound-links-box">
                  <Link to="/" className="notfound-quick-link">
                    Home
                  </Link>
                  <Link to="/about" className="notfound-quick-link">
                    About Us
                  </Link>
                  <Link to="/volunteer" className="notfound-quick-link">
                    Get Involved
                  </Link>
                  <Link to="/donate" className="notfound-quick-link">
                    Donate Now
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </main>
    </>
  );
};

export default NotFoundPage;