import DonationAmountSection from "../components/sections/donate/DonationAmountSection";
import DonationFormSection from "../components/sections/donate/DonationFormSection";
import DonationTrustSection from "../components/sections/donate/DonationTrustSection";
import SEO from "../components/common/SEO";

const DonationPage = () => {
  return (
    <>
    <SEO
        title="Donate to Patel Foundation | Support a Child, Change a Life"
        description="Support Patel Foundation by donating to help children receive education, nutrition, healthcare, and opportunities for a brighter future. Every contribution creates real impact."
        keywords="donate NGO, donate to Patel Foundation, child sponsorship, support children charity, NGO donation India"
        url="https://mypatelfoundation.in/donate"
        image="https://mypatelfoundation.in/og-image.jpg"
      />
      <DonationFormSection />
      {/* <DonationIntroSection /> */}
    
       <DonationAmountSection />
    
      <DonationTrustSection /> 
    </>
  );
};

export default DonationPage;