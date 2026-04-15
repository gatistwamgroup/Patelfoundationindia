import Container from "./Container";
import PremiumButton from "./PremiumButton";
import "../../styles/layout/hero_inner.css";
import { FiArrowUpRight, FiHeart, FiShield, FiUsers } from "react-icons/fi";

const PageHero = ({
  badge = "Patel Foundation",
  title = "Page Title",
  highlight = "",
  description = "",
  primaryBtnText = "Support Our Mission",
  primaryBtnHref = "/donate",
  secondaryBtnText = "Contact Us",
  secondaryBtnHref = "/contact",
  image = "/images/home/donation-cta.jpg",
  stats = [
    { value: "500+", label: "Children Supported", type: "primary" },
    { value: "120+", label: "Education Kits", type: "gold" },
    { value: "35+", label: "Community Drives", type: "teal" },
  ],
}) => {
  const renderTitle = () => {
    if (!highlight || !title.includes(highlight)) return title;

    const parts = title.split(highlight);

    return (
      <>
        {parts[0]}
        <span className="page-hero-highlight">{highlight}</span>
        {parts[1]}
      </>
    );
  };

  return (
    <section className="inner-page-hero">
      <Container>
        <div className="inner-page-hero-wrap">
          {/* LEFT CONTENT */}
          <div className="inner-page-hero-content">
            <div className="inner-page-badge">
              <span className="inner-page-badge-dot" />
              {badge}
            </div>

            <h1 className="inner-page-title">{renderTitle()}</h1>

            <p className="inner-page-description">{description}</p>

            <div className="inner-page-actions">
              <PremiumButton href={primaryBtnHref}>
                {primaryBtnText} <FiArrowUpRight />
              </PremiumButton>

              <PremiumButton href={secondaryBtnHref} variant="secondary">
                {secondaryBtnText}
              </PremiumButton>
            </div>

            <div className="inner-page-trust">
              <div className="inner-page-trust-item">
                <span className="trust-mini-icon"><FiHeart /></span>
                <span>Compassion Driven</span>
              </div>

              <div className="inner-page-trust-item">
                <span className="trust-mini-icon"><FiShield /></span>
                <span>Trusted Foundation</span>
              </div>

              <div className="inner-page-trust-item">
                <span className="trust-mini-icon"><FiUsers /></span>
                <span>Community Focused</span>
              </div>
            </div>
          </div>

          {/* RIGHT VISUAL */}
          <div className="inner-page-hero-visual">
            <div className="hero-visual-card">
              <img src={image} alt={title} className="hero-visual-image" />

              <div className="hero-visual-overlay-card">
                <div className="hero-visual-mini-badge">Impact Snapshot</div>

                <div className="hero-visual-stats">
                  {stats.map((item, index) => (
                    <div key={index} className={`hero-visual-stat hero-stat-${item.type}`}>
                      <h3>{item.value}</h3>
                      <p>{item.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>

    
    </section>
  );
};

export default PageHero;