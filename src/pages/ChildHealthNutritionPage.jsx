import PageHero from "../components/common/PageHero";
import SEO from "../components/common/SEO";
import HealthIntroSection from "../components/sections/services/HealthIntroSection";
import HealthImpactSection from "../components/sections/services/HealthImpactSection";
import HealthGallerySection from "../components/sections/services/HealthGallerySection";
import HealthDonationCTASection from "../components/sections/services/HealthDonationCTASection";



const ChildHealthNutritionPage = () => {
  return (
    <>
      <SEO
        title="Child Health & Nutrition Programs | Patel Foundation"
        description="Explore Patel Foundation’s child health and nutrition initiatives focused on providing essential care, nourishment, wellness support, and a healthier future for children in need."
        keywords="child health NGO, child nutrition NGO, health support for children, nutrition charity, child welfare programs"
        url="https://mypatelfoundation.in/child-health-nutrition"
        image="https://mypatelfoundation.in/og-image.webp"
      />
      <PageHero
        badge="Child Health & Nutrition"
        title="Supporting children through nutrition, care, and everyday well-being."
        highlight="nutrition, care, and everyday well-being"
        description="Patel Foundation supports children through daily breakfast assistance during evening tuition classes and a weekly dinner initiative that promotes health, dignity, and community care."
        primaryBtnText="Support Nutrition"
        primaryBtnHref="/donate"
        secondaryBtnText="Contact Us"
        secondaryBtnHref="/contact"
        image="/images/health/health-hero.webp"
      />

      <HealthIntroSection />
      <HealthImpactSection />
      <HealthGallerySection />
      <HealthDonationCTASection />
    </>
  );
};

export default ChildHealthNutritionPage;