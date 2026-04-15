import PageHero from "../components/common/PageHero";
import SEO from "../components/common/SEO";
import LegalDocumentsSection from "../components/sections/legal/LegalDocumentsSection";



const LegalDocumentsPage = () => {
  return (
    <>
      <SEO
      title="Legal Documents | Transparency & Trust | Patel Foundation"
      description="View Patel Foundation’s legal documents, registrations, and compliance records that reflect our commitment to transparency, trust, accountability, and ethical social service."
      keywords="Patel Foundation legal documents, NGO registration, trust documents, charity compliance, NGO transparency"
      url="https://mypatelfoundation.in/legal-documents"
      image="https://mypatelfoundation.in/og-image.jpg"
    />
      <PageHero
        badge="Legal Documents"
        title="Official records that reflect our commitment to trust and transparency."
        highlight="trust and transparency"
        description="Patel Foundation values accountability and credibility. Our legal and compliance documents are presented to help supporters, partners, and communities engage with confidence."
        primaryBtnText="View Documents"
        primaryBtnHref="#legal-documents"
        secondaryBtnText="Contact Us"
        secondaryBtnHref="/contact"
        image="/images/legal/legal-hero.jpg"
      />

      <div id="legal-documents">
        <LegalDocumentsSection />
      </div>
    </>
  );
};

export default LegalDocumentsPage;