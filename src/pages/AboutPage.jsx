import PageHero from "../components/common/PageHero";
import SEO from "../components/common/SEO";
import AboutIntroSection from "../components/sections/about/AboutIntroSection";
import FounderStorySection from "../components/sections/about/FounderStorySection";
import MissionVisionSection from "../components/sections/about/MissionVisionSection";
import WhyTrustUsSection from "../components/sections/about/WhyTrustUsSection";
import ImpactJourneySection from "../components/sections/about/ImpactJourneySection";
import LeadershipPreviewSection from "../components/sections/about/LeadershipPreviewSection";
import AboutFinalCTASection from "../components/sections/about/AboutFinalCTASection";



const AboutPage = () => {
  return (
    <>
      <SEO
      title="About Patel Foundation | Our Mission, Vision & Social Impact"
      description="Learn about Patel Foundation’s mission, vision, values, and the work we do to support children and communities through education, healthcare, nutrition, and social welfare initiatives."
      keywords="About Patel Foundation, NGO mission, NGO vision, child welfare foundation, social impact NGO, charity organization India"
      url="https://mypatelfoundation.in/about"
      image="https://mypatelfoundation.in/og-image.webp"
      />
      <PageHero
        badge="Who We Are"
        title="About Patel Foundation - built on compassion, trust, and community impact."
        highlight="community impact"
        description="Patel Foundation is committed to uplifting lives through education, care, and meaningful social initiatives that empower children and families for a stronger future."
        primaryBtnText="Support Our Mission"
        primaryBtnHref="/donate"
        secondaryBtnText="Meet Our Team"
        secondaryBtnHref="/team"
        image="/images/about/about-hero.webp"
      />

      <AboutIntroSection />
      <FounderStorySection />
      <MissionVisionSection />
      <WhyTrustUsSection />
      <ImpactJourneySection />
      <LeadershipPreviewSection limit={4} />
      <AboutFinalCTASection />
    </>
  );
};

export default AboutPage;