import PageHero from "../components/common/PageHero";
import SEO from "../components/common/SEO";
import EducationIntroSection from "../components/sections/services/EducationIntroSection";
import EducationImpactSection from "../components/sections/services/EducationImpactSection";
import EducationGallerySection from "../components/sections/services/EducationGallerySection";
import EducationDonationCTASection from "../components/sections/services/EducationDonationCTASection";



const ChildEducationPage = () => {
  return (
    <>
      <SEO
      title="Child Education Support | Building Brighter Futures | Patel Foundation"
      description="Patel Foundation supports underprivileged children through quality education initiatives, school support, learning resources, and opportunities that build brighter futures."
      keywords="child education NGO, child education support, NGO for children education, sponsor education, education charity India"
      url="https://mypatelfoundation.in/child-education"
      image="https://mypatelfoundation.in/og-image.webp"
    />
      <PageHero
        badge="Child Education"
        title="Creating brighter futures through education, encouragement, and opportunity."
        highlight="education, encouragement, and opportunity"
        description="Patel Foundation supports children through educational access, learning resources, and community-led initiatives that inspire confidence and long-term growth."
        primaryBtnText="Support Education"
        primaryBtnHref="/donate"
        secondaryBtnText="Contact Us"
        secondaryBtnHref="/contact"
        image="/images/education/education-hero.webp"
      />

      <EducationIntroSection />
      <EducationImpactSection />
      <EducationGallerySection />
      <EducationDonationCTASection />
    </>
  );
};

export default ChildEducationPage;