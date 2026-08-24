import { FiHeart, FiSmile, FiUsers } from "react-icons/fi";
import Container from "../../common/Container";
import "../../../styles/services/health-page.css";

const items = [
  {
    id: 1,
    icon: <FiHeart />,
    title: "Daily Nourishment",
    description:
      "Regular nutrition support helps children feel cared for, energized, and ready to focus during learning sessions.",
  },
  {
    id: 2,
    icon: <FiSmile />,
    title: "Health & Confidence",
    description:
      "A healthy meal can bring comfort, dignity, and confidence — especially when it becomes a consistent part of support.",
  },
  {
    id: 3,
    icon: <FiUsers />,
    title: "Community Care",
    description:
      "Weekly shared meals help create a stronger sense of belonging, care, and connection within the community.",
  },
];

const HealthImpactSection = () => {
  return (
    <section className="health-impact-section">
      <Container>
        <div className="health-section-header">
          <div className="health-section-badge">
            <span className="health-section-badge-dot" />
            Health Impact
          </div>

          <h2 className="health-section-title">
            Why nutrition support creates{" "}
            <span className="text-gradient">meaningful everyday impact.</span>
          </h2>

          <p className="health-section-description center">
            Small, consistent acts of care can strengthen health, improve
            learning readiness, and uplift children in powerful ways.
          </p>
        </div>

        <div className="health-card-grid">
          {items.map((item) => (
            <div key={item.id} className="health-card">
              <div className="health-card-icon">{item.icon}</div>
              <h3 className="health-card-title">{item.title}</h3>
              <p className="health-card-description">{item.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default HealthImpactSection;