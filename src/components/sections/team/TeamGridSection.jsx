import { useEffect, useState } from "react";
import {
  FiArrowUpRight,
  FiUsers,
  FiHeart,
  FiX,
  FiMapPin,
} from "react-icons/fi";
import Container from "../../common/Container";
import PremiumButton from "../../common/PremiumButton";
import { teamMembers } from "../../../data/teamData";
import "../../../styles/team/team-grid-section.css";

const TeamGridSection = () => {
  const [selectedMember, setSelectedMember] = useState(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setSelectedMember(null);
      }
    };

    if (selectedMember) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedMember]);

  const openProfile = (member) => {
    setSelectedMember(member);
  };

  const closeProfile = () => {
    setSelectedMember(null);
  };

  return (
    <section className="team-grid-section">
      <Container>
        {/* Header */}
        <div className="team-grid-header">
          <div className="team-grid-badge">
            <span className="team-grid-badge-dot" />
            Meet Our Team
          </div>

          <h2 className="team-grid-title">
            The people behind our{" "}
            <span className="text-gradient">mission, care, and community impact.</span>
          </h2>

          <p className="team-grid-description">
            Patel Foundation is guided by a team that believes in compassion,
            accountability, and purposeful service. Together, we work to build
            meaningful support systems for children, families, and communities
            through trusted action and long-term commitment.
          </p>
        </div>

        {/* Grid */}
        <div className="team-grid-cards">
          {teamMembers.map((member, index) => (
            <article
              key={member.id}
              className={`team-member-card ${
                member.featured && index === 0 ? "team-member-card-featured" : ""
              }`}
              onClick={() => openProfile(member)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  openProfile(member);
                }
              }}
            >
              <div className="team-member-image-wrap">
                <img
                  src={member.image}
                  alt={member.name}
                  className="team-member-image"
                />

                <div className="team-member-role-chip">{member.role}</div>
              </div>

              <div className="team-member-content">
                <h3 className="team-member-name">{member.name}</h3>

                <p className="team-member-bio">{member.shortBio}</p>

                <button
                  className="team-member-link"
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    openProfile(member);
                  }}
                >
                  View Profile <FiArrowUpRight />
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* Bottom Info Strip */}
        <div className="team-grid-bottom">
          <div className="team-grid-note">
            <span className="team-grid-note-icon">
              <FiUsers />
            </span>
            <p>
              Our leadership and support team work together to ensure every
              initiative is guided by trust, compassion, and meaningful intent.
            </p>
          </div>

          <div className="team-grid-actions">
            <PremiumButton href="/contact">
              Connect With Our Team <FiArrowUpRight />
            </PremiumButton>

            <PremiumButton href="/volunteer" variant="secondary">
              Join as Volunteer
            </PremiumButton>
          </div>
        </div>

        {/* Founder Highlight Strip */}
        <div className="team-founder-highlight">
          <div className="team-founder-highlight-icon">
            <FiHeart />
          </div>

          <div className="team-founder-highlight-content">
            <p className="team-founder-highlight-label">Leadership Note</p>
            <h3 className="team-founder-highlight-title">
              Founder Monika Patel leads with a global vision from New Jersey, USA.
            </h3>
            <p className="team-founder-highlight-text">
              Her leadership helps connect support raised through trusted
              relationships in the United States with meaningful initiatives that
              uplift communities in India.
            </p>
          </div>
        </div>

        {/* Profile Modal */}
        {selectedMember && (
          <div className="team-profile-backdrop" onClick={closeProfile}>
            <div
              className="team-profile-modal"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="team-profile-close"
                type="button"
                onClick={closeProfile}
                aria-label="Close profile modal"
              >
                <FiX />
              </button>

              <div className="team-profile-grid">
                {/* Left */}
                <div className="team-profile-visual">
                  <div className="team-profile-image-wrap">
                    <img
                      src={selectedMember.image}
                      alt={selectedMember.name}
                      className="team-profile-image"
                    />

                    <div className="team-profile-role-chip">
                      {selectedMember.role}
                    </div>
                  </div>
                </div>

                {/* Right */}
                <div className="team-profile-content">
                  <div className="team-profile-badge">
                    <span className="team-profile-badge-dot" />
                    Team Profile
                  </div>

                  <h3 className="team-profile-name">{selectedMember.name}</h3>

                  <div className="team-profile-meta">
                    <div className="team-profile-meta-item">
                      <span className="team-profile-meta-icon">
                        <FiMapPin />
                      </span>
                      <span>{selectedMember.location}</span>
                    </div>
                  </div>

                  <p className="team-profile-short">{selectedMember.shortBio}</p>

                  <p className="team-profile-full">{selectedMember.fullBio}</p>

                  <div className="team-profile-actions">
                    <PremiumButton href="/contact">
                      Contact Us <FiArrowUpRight />
                    </PremiumButton>

                    <PremiumButton href="/volunteer" variant="secondary">
                      Join the Mission
                    </PremiumButton>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </Container>
    </section>
  );
};

export default TeamGridSection;