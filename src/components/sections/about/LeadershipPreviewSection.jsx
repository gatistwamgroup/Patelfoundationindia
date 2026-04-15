import { FiArrowUpRight, FiUsers } from "react-icons/fi";
import Container from "../../common/Container";
import PremiumButton from "../../common/PremiumButton";
import { teamMembers } from "../../../data/teamData";
import "../../../styles/about/leadership-preview-section.css";

const LeadershipPreviewSection = ({
  limit = 4,
  badge = "Meet Our Leadership",
  title = "The people guiding our mission with heart, trust, and purpose.",
  description = "Our leadership team is united by compassion, accountability, and a shared commitment to building meaningful impact through thoughtful service.",
  compact = false,
}) => {
  const visibleMembers = teamMembers.slice(0, limit);

  return (
    <section className={`leadership-preview-section ${compact ? "compact" : ""}`}>
      <Container>
        {/* Header */}
        <div className="leadership-preview-header">
          <div className="leadership-preview-badge">
            <span className="leadership-preview-badge-dot" />
            {badge}
          </div>

          <h2 className="leadership-preview-title">{title}</h2>

          <p className="leadership-preview-description">{description}</p>
        </div>

        {/* Cards */}
        <div className="leadership-preview-grid">
          {visibleMembers.map((member, index) => (
            <div
              key={member.id}
              className={`leadership-card ${
                member.featured && index === 0 ? "leadership-card-featured" : ""
              }`}
            >
              <div className="leadership-card-image-wrap">
                <img
                  src={member.image}
                  alt={member.name}
                  className="leadership-card-image"
                />

                <div className="leadership-card-role-chip">{member.role}</div>
              </div>

              <div className="leadership-card-content">
                <h3 className="leadership-card-name">{member.name}</h3>
                <p className="leadership-card-bio">{member.shortBio}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="leadership-preview-bottom">
          <div className="leadership-preview-note">
            <span className="leadership-preview-note-icon">
              <FiUsers />
            </span>
            <p>
              Meet the broader team behind Patel Foundation’s mission, community
              efforts, and day-to-day impact.
            </p>
          </div>

          <div className="leadership-preview-actions">
            <PremiumButton href="/team">
              View Full Team <FiArrowUpRight />
            </PremiumButton>

            <PremiumButton href="/contact" variant="secondary">
              Connect With Us
            </PremiumButton>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default LeadershipPreviewSection;