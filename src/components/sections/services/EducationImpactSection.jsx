import { FiBook, FiAward, FiUsers } from "react-icons/fi";
import Container from "../../common/Container";
import "../../../styles/services/education-impact-section.css";

const impactItems = [
  {
    id: 1,
    icon: <FiBook />,
    title: "Learning Access",
    description:
      "Helping children access school resources, educational materials, and opportunities that support consistent learning.",
  },
  {
    id: 2,
    icon: <FiAward />,
    title: "Confidence & Growth",
    description:
      "Encouraging self-belief and academic motivation through care, encouragement, and meaningful educational support.",
  },
  {
    id: 3,
    icon: <FiUsers />,
    title: "Community Upliftment",
    description:
      "Education creates ripple effects — strengthening families, empowering communities, and inspiring brighter futures.",
  },
];

const EducationImpactSection = () => {
  return (
    <section className="education-impact-section">
      <Container>
        <div className="education-impact-header">
          <div className="education-impact-badge">
            <span className="education-impact-badge-dot" />
            Education Impact
          </div>

          <h2 className="education-impact-title">
            Why child education creates{" "}
            <span className="text-gradient">lasting change.</span>
          </h2>

          <p className="education-impact-description">
            Every step toward education opens doors to confidence, opportunity,
            and long-term community transformation.
          </p>
        </div>

        <div className="education-impact-grid">
          {impactItems.map((item) => (
            <div key={item.id} className="education-impact-card">
              <div className="education-impact-icon">{item.icon}</div>
              <h3 className="education-impact-card-title">{item.title}</h3>
              <p className="education-impact-card-description">{item.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default EducationImpactSection;