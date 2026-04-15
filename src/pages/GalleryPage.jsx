import PageHero from "../components/common/PageHero";
import SEO from "../components/common/SEO";
import GalleryPageSection from "../components/sections/gallery/GalleryPageSection";



const GalleryPage = () => {
  return (
    <>
      <SEO
        title="Gallery | Moments of Impact | Patel Foundation"
        description="Explore the Patel Foundation gallery and witness inspiring moments of hope, education, care, social activities, and community impact through our initiatives and events."
        keywords="Patel Foundation gallery, NGO gallery, charity event photos, social impact images, NGO activities gallery"
        url="https://mypatelfoundation.in/gallery"
        image="https://mypatelfoundation.in/og-image.jpg"
      />
      <PageHero
        badge="Our Gallery"
        title="A visual journey of compassion, service, and community impact."
        highlight="compassion, service, and community impact"
        description="Explore meaningful moments that reflect Patel Foundation’s mission in action — through outreach, support initiatives, and the lives touched along the way."
        primaryBtnText="Explore Gallery"
        primaryBtnHref="#gallery-content"
        secondaryBtnText="Support Our Mission"
        secondaryBtnHref="/donate"
        image="/images/gallery/gallery-hero.jpg"
      />

      <div id="gallery-content">
        <GalleryPageSection />
      </div>
    </>
  );
};

export default GalleryPage;