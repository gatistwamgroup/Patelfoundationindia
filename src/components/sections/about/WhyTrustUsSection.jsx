import {
  FiArrowUpRight,
  FiShield,
  FiHeart,
  FiEye,
  FiUsers,
  FiCheckCircle,
} from "react-icons/fi";
import Container from "../../common/Container";
import PremiumButton from "../../common/PremiumButton";
import "../../../styles/about/why-trust-us-section.css";

const trustValues = [
  {
    id: 1,
    icon: <FiShield />,
    title: "Transparency & Integrity",
    description:
      "Every contribution is treated with responsibility, clarity, and a strong commitment to ethical service.",
    tone: "primary",
  },
  {
    id: 2,
    icon: <FiHeart />,
    title: "Compassion in Action",
    description:
      "Our work is rooted in empathy — transforming support into meaningful, human-centered impact where it matters most.",
    tone: "gold",
  },
  {
    id: 3,
    icon: <FiEye />,
    title: "Purposeful Accountability",
    description:
      "We focus on thoughtful initiatives designed to create measurable value and long-term positive outcomes for communities.",
    tone: "teal",
  },
  {
    id: 4,
    icon: <FiUsers />,
    title: "Community-Centered Approach",
    description:
      "We believe lasting change happens when support is aligned with real needs, dignity, and local upliftment.",
    tone: "dark",
  },
];

const WhyTrustUsSection = () => {
  return (
    <section className="why-trust-section">
      <Container>
        {/* Top Header */}
        <div className="why-trust-top">
          <div className="why-trust-content">
            <div className="why-trust-badge">
              <span className="why-trust-badge-dot" />
              Why Trust Us
            </div>

            <h2 className="why-trust-title">
              Built on values that inspire{" "}
              <span className="text-gradient">confidence, compassion, and credibility.</span>
            </h2>

            <p className="why-trust-description">
              Patel Foundation is guided by a clear sense of purpose and a strong
              responsibility toward every supporter, every initiative, and every
              life we aim to uplift. Our core values shape how we serve, how we
              build trust, and how we create meaningful impact with integrity.
            </p>
          </div>

          <div className="why-trust-highlight-card">
            <div className="why-trust-highlight-label">Trust Snapshot</div>

            <div className="why-trust-highlight-value">100%</div>

            <p className="why-trust-highlight-text">
              Mission-driven commitment rooted in service, accountability, and
              long-term community upliftment.
            </p>
          </div>
        </div>

        {/* Value Cards */}
        <div className="why-trust-grid">
          {trustValues.map((item) => (
            <div key={item.id} className={`why-trust-card ${item.tone}`}>
              <div className={`why-trust-icon ${item.tone}`}>{item.icon}</div>

              <h3 className="why-trust-card-title">{item.title}</h3>

              <p className="why-trust-card-description">{item.description}</p>
            </div>
          ))}
        </div>

        {/* Assurance Strip */}
        <div className="why-trust-assurance">
          <div className="why-trust-assurance-left">
            <div className="why-trust-assurance-icon">
              <FiCheckCircle />
            </div>

            <div>
              <h3 className="why-trust-assurance-title">
                A foundation committed to trust, dignity, and meaningful impact.
              </h3>

              <p className="why-trust-assurance-text">
                We believe real change is built through compassion, thoughtful
                action, and the confidence that every effort is guided by purpose.
              </p>
            </div>
          </div>

          <div className="why-trust-actions">
            <PremiumButton href="/donate">
              Support Our Mission <FiArrowUpRight />
            </PremiumButton>

            <PremiumButton href="/contact" variant="secondary">
              Contact Us
            </PremiumButton>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default WhyTrustUsSection;