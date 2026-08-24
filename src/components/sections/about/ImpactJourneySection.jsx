import {
  FiArrowUpRight,
  FiMapPin,
  FiHeart,
  FiLayers,
  FiSend,
  FiSmile,
} from "react-icons/fi";
import Container from "../../common/Container";
import PremiumButton from "../../common/PremiumButton";
import "../../../styles/about/impact-journey-section.css";

const journeySteps = [
  {
    id: "01",
    icon: <FiMapPin />,
    title: "New Jersey, USA",
    description:
      "Founder Monika Patel leads the vision from New Jersey with a strong commitment to global compassion and responsible service.",
    tone: "primary",
  },
  {
    id: "02",
    icon: <FiHeart />,
    title: "Support & Fundraising",
    description:
      "Meaningful support is built through trusted relationships, donor engagement, and purpose-driven fundraising efforts.",
    tone: "gold",
  },
  {
    id: "03",
    icon: <FiLayers />,
    title: "Mission Alignment",
    description:
      "Every contribution is thoughtfully aligned with real community needs and guided by values of trust, dignity, and impact.",
    tone: "teal",
  },
  {
    id: "04",
    icon: <FiSend />,
    title: "India Outreach",
    description:
      "Resources are directed toward education, care, and social support initiatives that create tangible and human-centered value.",
    tone: "dark",
  },
  {
    id: "05",
    icon: <FiSmile />,
    title: "Lives Uplifted",
    description:
      "Children, families, and communities benefit from compassionate action designed to create stronger futures and lasting hope.",
    tone: "primary",
  },
];

const ImpactJourneySection = () => {
  return (
    <section className="impact-journey-section">
      <Container>
        {/* Header */}
        <div className="impact-journey-header">
          <div className="impact-journey-badge">
            <span className="impact-journey-badge-dot" />
            Journey of Impact
          </div>

          <h2 className="impact-journey-title">
            From <span className="text-gradient">New Jersey to India</span> —
            transforming generosity into meaningful change.
          </h2>

          <p className="impact-journey-subtitle">
            Patel Foundation bridges compassion across borders by turning support
            raised in the United States into purposeful action that uplifts
            children, families, and communities in India.
          </p>
        </div>

        {/* Journey Flow */}
        <div className="impact-journey-flow-wrap">
          <div className="impact-journey-line" />

          <div className="impact-journey-grid">
            {journeySteps.map((step, index) => (
              <div key={step.id} className={`impact-journey-card ${step.tone}`}>
                <div className="impact-journey-step">{step.id}</div>

                <div className={`impact-journey-icon ${step.tone}`}>
                  {step.icon}
                </div>

                <h3 className="impact-journey-card-title">{step.title}</h3>

                <p className="impact-journey-card-description">
                  {step.description}
                </p>

                {index < journeySteps.length - 1 && (
                  <div className="impact-journey-mobile-connector" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Highlight Strip */}
        <div className="impact-journey-highlight">
          <div className="impact-journey-highlight-left">
            <div className="impact-journey-highlight-mini">
              International Impact Model
            </div>

            <h3 className="impact-journey-highlight-title">
              A clear, compassionate pathway from donor trust to community upliftment.
            </h3>

            <p className="impact-journey-highlight-text">
              This journey reflects how Patel Foundation transforms intention
              into impact — building confidence for supporters and creating
              meaningful value for the communities we serve.
            </p>
          </div>

          <div className="impact-journey-highlight-right">
            <div className="impact-journey-metric-card">
              <span className="impact-journey-metric-label">Global Mission</span>
              <h4 className="impact-journey-metric-value">USA → India</h4>
            </div>

            <div className="impact-journey-metric-card">
              <span className="impact-journey-metric-label">Purpose</span>
              <h4 className="impact-journey-metric-value">Care + Education</h4>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="impact-journey-actions">
          <PremiumButton href="/donate">
            Support This Journey <FiArrowUpRight />
          </PremiumButton>

          <PremiumButton href="/contact" variant="secondary">
            Connect With Us
          </PremiumButton>
        </div>
      </Container>
    </section>
  );
};

export default ImpactJourneySection;