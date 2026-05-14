import PageHero from "../components/common/PageHero";
import SEO from "../components/common/SEO";
import SocialIntroSection from "../components/sections/services/SocialIntroSection";
// import SocialImpactSection from "../components/sections/services/SocialImpactSection";
import SocialGallerySection from "../components/sections/services/SocialGallerySection";
import SocialDonationCTASection from "../components/sections/services/SocialDonationCTASection";



const SocialActivityPage = () => {
  return (
    <>
      <SEO
        title="Social Activities & Community Welfare | Patel Foundation"
        description="Discover Patel Foundation’s social welfare and community activities designed to uplift lives, spread awareness, support families, and create meaningful impact in society."
        keywords="social activity NGO, community welfare NGO, social work foundation, NGO events, charity activities"
        url="https://mypatelfoundation.in/social-activity"
        image="https://mypatelfoundation.in/og-image.webp"
      />
      <PageHero
        badge="Social Activity"
        title="Community-centered initiatives that bring care, dignity, and practical support."
        highlight="care, dignity, and practical support"
        description="Patel Foundation extends its mission through social initiatives such as eye camps, health awareness, community outreach, and essential support activities that respond to real needs."
        primaryBtnText="Support Social Work"
        primaryBtnHref="/donate"
        secondaryBtnText="Contact Us"
        secondaryBtnHref="/contact"
        image="/images/social/social-hero.webp"
      />

      <SocialIntroSection />
      {/* <SocialImpactSection /> */}
      <SocialGallerySection />
      <SocialDonationCTASection />
    </>
  );
};

export default SocialActivityPage;