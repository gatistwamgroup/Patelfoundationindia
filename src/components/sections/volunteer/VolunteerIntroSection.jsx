import { FiHeart, FiUsers, FiGlobe } from "react-icons/fi";
import Container from "../../common/Container";
import "../../../styles/volunteer/volunteer-intro-section.css";

const points = [
  {
    id: 1,
    icon: <FiHeart />,
    title: "Serve with Heart",
    description:
      "Support meaningful causes that create positive change for children, families, and communities.",
  },
  {
    id: 2,
    icon: <FiUsers />,
    title: "Be Part of Something Bigger",
    description:
      "Join a caring network of people committed to compassion, dignity, and community upliftment.",
  },
  {
    id: 3,
    icon: <FiGlobe />,
    title: "Create Global Impact",
    description:
      "Be part of a mission that connects generosity, service, and purpose across borders.",
  },
];

const VolunteerIntroSection = () => {
  return (
    <section className="volunteer-intro-section">
      <Container>
        <div className="volunteer-intro-header">
          <div className="volunteer-intro-badge">
            <span className="volunteer-intro-badge-dot" />
            Become a Volunteer
          </div>

          <h2 className="volunteer-intro-title">
            Your time, compassion, and support can help{" "}
            <span className="text-gradient">change lives.</span>
          </h2>

          <p className="volunteer-intro-description">
            Patel Foundation welcomes volunteers who want to contribute with
            purpose. Whether you help through time, ideas, outreach, or
            community participation, your involvement can help create meaningful
            and lasting impact.
          </p>
        </div>

        <div className="volunteer-intro-grid">
          {points.map((item) => (
            <div key={item.id} className="volunteer-intro-card">
              <div className="volunteer-intro-icon">{item.icon}</div>
              <h3 className="volunteer-intro-card-title">{item.title}</h3>
              <p className="volunteer-intro-card-description">{item.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default VolunteerIntroSection;