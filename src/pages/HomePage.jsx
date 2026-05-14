import HeroSection from "../components/sections/home/HeroSection";
import SEO from "../components/common/SEO";
import WhoWeAreSection from "../components/sections/home/WhoWeAreSection";
import WhatWeDoSection from "../components/sections/home/WhatWeDoSection";
import DailyImpactSection from "../components/sections/home/DailyImpactSection";
import MissionVisionSection from "../components/sections/home/MissionVisionSection";
import TrustSection from "../components/sections/home/TrustSection";
import GalleryTeaserSection from "../components/sections/home/GalleryTeaserSection";
import HomeLeadershipSection from "../components/sections/home/HomeLeadershipSection";
import DonationCTASection from "../components/sections/home/DonationCTASection";




const HomePage = () => {
  return (
    <>
      <SEO
        title="Patel Foundation | Empowering Children Through Education, Health & Care"
        description="Patel Foundation is dedicated to supporting underprivileged children through education, health, nutrition, and social welfare initiatives. Join us to create a better future."
        keywords="Patel Foundation, NGO for children, child education NGO, child health NGO, child nutrition NGO, donate NGO, volunteer NGO, charity foundation India"
        url="https://mypatelfoundation.in/"
        image="https://mypatelfoundation.in/og-image.webp"
      />
      <HeroSection />
      <WhoWeAreSection />
      <WhatWeDoSection />
      <DailyImpactSection />
      <MissionVisionSection />
      <TrustSection />
      <GalleryTeaserSection />
      <DonationCTASection />
      <HomeLeadershipSection />
      
     </>
  );
};

export default HomePage;