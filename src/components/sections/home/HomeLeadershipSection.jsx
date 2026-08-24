import LeadershipPreviewSection from "../about/LeadershipPreviewSection";

const HomeLeadershipSection = () => {
  return (
    <LeadershipPreviewSection
      limit={4}
      badge="Our Leadership"
      title="A dedicated team working with compassion and purpose."
      description="Behind every initiative is a mission-driven team committed to service, community care, and creating meaningful change."
      compact
    />
  );
};

export default HomeLeadershipSection;