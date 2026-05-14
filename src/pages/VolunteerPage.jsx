import PageHero from "../components/common/PageHero";
import SEO from "../components/common/SEO";
import VolunteerIntroSection from "../components/sections/volunteer/VolunteerIntroSection";
import JoinMissionSection from "../components/sections/team/JoinMissionSection";



const VolunteerPage = () => {
  return (
    <>
      <SEO
        title="Volunteer With Patel Foundation | Be the Change"
        description="Join Patel Foundation as a volunteer and become part of meaningful social change through education, health, nutrition, and community service initiatives."
        keywords="volunteer NGO, volunteer with Patel Foundation, NGO volunteer India, social work volunteer, charity volunteer"
        url="https://mypatelfoundation.in/volunteer"
        image="https://mypatelfoundation.in/og-image.webp"
      />
      <PageHero
        badge="Become a Volunteer"
        title="Join our mission and help create meaningful impact through service."
        highlight="meaningful impact through service"
        description="Patel Foundation welcomes compassionate individuals who want to volunteer, support, and be part of a mission dedicated to uplifting children, families, and communities."
        primaryBtnText="Apply to Volunteer"
        primaryBtnHref="/volunteer"
        secondaryBtnText="Contact Us"
        secondaryBtnHref="/contact"
        image="/images/volunteer/volunteer-hero.webp"
      />

      <VolunteerIntroSection />

      <JoinMissionSection
        badge="Volunteer With Us"
        title="Become part of a compassionate mission built on service and community upliftment."
        description="Whether you want to volunteer regularly, support events, contribute ideas, or offer your time in meaningful ways, we would love to hear from you."
        submitLabel="Apply as Volunteer"
      />
    </>
  );
};

export default VolunteerPage;