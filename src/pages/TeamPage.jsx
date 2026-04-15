import PageHero from "../components/common/PageHero";
import SEO from "../components/common/SEO";
import TeamGridSection from "../components/sections/team/TeamGridSection";
import JoinMissionSection from "../components/sections/team/JoinMissionSection";





const TeamPage = () => {
  return (
    <>
      <SEO
        title="Our Team | Dedicated Changemakers at Patel Foundation"
        description="Meet the passionate team behind Patel Foundation who work tirelessly to create positive social impact through child welfare, education, health, and community support programs."
        keywords="Patel Foundation team, NGO team, social workers, child welfare team, charity organization team"
        url="https://mypatelfoundation.in/team"
        image="https://mypatelfoundation.in/og-image.jpg"
      />
      <PageHero
        badge="Meet Our Team"
        title="The people leading our mission with compassion, trust, and purpose."
        highlight="compassion, trust, and purpose"
        description="Patel Foundation is powered by a dedicated team committed to service, accountability, and meaningful community impact across every initiative."
        primaryBtnText="Connect With Us"
        primaryBtnHref="/contact"
        secondaryBtnText="Support Our Mission"
        secondaryBtnHref="/donate"
        image="/images/team/team-hero.jpg"
      />

      <TeamGridSection />

      <JoinMissionSection
        badge="Join Our Mission"
        title="Volunteer, advise, or support the mission behind meaningful community impact."
        description="We welcome compassionate individuals, advisors, and supporters who want to contribute time, ideas, or meaningful support toward initiatives that uplift children, families, and communities."
        submitLabel="Send Your Interest"
      />
    </>
  );
};

export default TeamPage;