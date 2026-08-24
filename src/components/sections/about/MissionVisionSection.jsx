import {
  FiArrowUpRight,
  FiCompass,
  FiTarget,
  FiHeart,
  FiShield,
  FiUsers,
} from "react-icons/fi";
import Container from "../../common/Container";
import PremiumButton from "../../common/PremiumButton";
import "../../../styles/about/mission-vision-section.css";

const pillars = [
  {
    id: 1,
    icon: <FiHeart />,
    title: "Compassion First",
    description:
      "Every initiative begins with empathy, dignity, and a genuine commitment to helping communities thrive.",
  },
  {
    id: 2,
    icon: <FiShield />,
    title: "Trust & Transparency",
    description:
      "We believe meaningful impact is built on accountability, openness, and responsible stewardship of every contribution.",
  },
  {
    id: 3,
    icon: <FiUsers />,
    title: "Community Upliftment",
    description:
      "Our efforts are designed to strengthen families, empower children, and create long-term positive social change.",
  },
];

const MissionVisionSection = () => {
  return (
    <section className="about-mission-vision-section">
      <Container>
        {/* Header */}
        <div className="about-mission-vision-header">
          <div className="about-mission-vision-badge">
            <span className="about-mission-vision-badge-dot" />
            Mission & Vision
          </div>

          <h2 className="about-mission-vision-title">
            Guided by purpose, shaped by{" "}
            <span className="text-gradient">compassion, trust, and impact.</span>
          </h2>

          <p className="about-mission-vision-subtitle">
            Our mission and vision define how Patel Foundation serves with heart,
            builds with responsibility, and works toward a stronger future for
            children, families, and communities.
          </p>
        </div>

        {/* Main Cards */}
        <div className="about-mission-vision-grid">
          {/* Mission Card */}
          <div className="about-mv-card about-mv-card-mission">
            <div className="about-mv-top">
              <div className="about-mv-icon-wrap mission">
                <FiTarget />
              </div>

              <div className="about-mv-chip mission-chip">Our Mission</div>
            </div>

            <h3 className="about-mv-heading">
              To create meaningful, measurable support through community-driven
              service and child-focused initiatives.
            </h3>

            <p className="about-mv-description">
              Patel Foundation is committed to supporting children and families
              through education, wellness, and compassionate outreach. Our
              mission is to transform generosity into real action — delivering
              care, opportunity, and hope where it is needed most.
            </p>

            <ul className="about-mv-list">
              <li>Empower children through access to learning and opportunity</li>
              <li>Support families through care-focused and social initiatives</li>
              <li>Build impact with responsibility, trust, and long-term intent</li>
            </ul>
          </div>

          {/* Vision Card */}
          <div className="about-mv-card about-mv-card-vision">
            <div className="about-mv-top">
              <div className="about-mv-icon-wrap vision">
                <FiCompass />
              </div>

              <div className="about-mv-chip vision-chip">Our Vision</div>
            </div>

            <h3 className="about-mv-heading">
              To inspire a future where compassion creates opportunity and every
              community can grow with dignity.
            </h3>

            <p className="about-mv-description">
              We envision a world where kindness crosses borders, support reaches
              the right hands, and communities become stronger through shared
              responsibility. Our vision is rooted in sustainable impact, human
              dignity, and a better tomorrow for the next generation.
            </p>

            <ul className="about-mv-list">
              <li>Build stronger bridges between donors and real community needs</li>
              <li>Create long-term positive social and educational impact</li>
              <li>Lead with compassion, transparency, and purposeful growth</li>
            </ul>
          </div>
        </div>

        {/* Pillars */}
        <div className="about-mv-pillars-grid">
          {pillars.map((pillar) => (
            <div key={pillar.id} className="about-mv-pillar-card">
              <div className="about-mv-pillar-icon">{pillar.icon}</div>
              <h4 className="about-mv-pillar-title">{pillar.title}</h4>
              <p className="about-mv-pillar-description">{pillar.description}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="about-mv-actions">
          <PremiumButton href="/donate">
            Support Our Mission <FiArrowUpRight />
          </PremiumButton>

          <PremiumButton href="/contact" variant="secondary">
            Contact Us
          </PremiumButton>
        </div>
      </Container>
    </section>
  );
};

export default MissionVisionSection;