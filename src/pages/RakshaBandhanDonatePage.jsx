import RakshaBandhanHeroSection from "../components/sections/donate/RakshaBandhanHeroSection";
import RakshaBandhanStorySection from "../components/sections/donate/RakshaBandhanStorySection";
import RakshaBandhanFormSection from "../components/sections/donate/RakshaBandhanFormSection";
import DonationTrustSection from "../components/sections/donate/DonationTrustSection";
import SEO from "../components/common/SEO";
import "../styles/donate/donation-page.css";
import "../styles/donate/raksha-bandhan.css";

const RakshaBandhanDonatePage = () => {
  return (
    <div className="rb-page">
      <SEO
        title="Raksha Bandhan Donation | Protect a Child's Future - Patel Foundation"
        description="This Raksha Bandhan, tie a rakhi of hope. Donate to Patel Foundation and help protect a child's education, health, and future. Scan & pay via UPI or bank transfer."
        keywords="raksha bandhan donation, rakhi donation NGO, donate for children India, patel foundation raksha bandhan, protect a child donation"
        url="https://mypatelfoundation.in/raksha-bandhan-donate"
        image="https://mypatelfoundation.in/og-image.webp"
      />

      <RakshaBandhanHeroSection />
      <RakshaBandhanStorySection />
      <RakshaBandhanFormSection />
      <DonationTrustSection />
    </div>
  );
};

export default RakshaBandhanDonatePage;
