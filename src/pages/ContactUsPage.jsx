import PageHero from "../components/common/PageHero";
import SEO from "../components/common/SEO";
import ContactInfoSection from "../components/sections/contact/ContactInfoSection";
import ContactFormSection from "../components/sections/contact/ContactFormSection";
import ContactMapSection from "../components/sections/contact/ContactMapSection";
import ContactCTASection from "../components/sections/contact/ContactCTASection";



const ContactUsPage = () => {
  return (
    <>
      <SEO
        title="Contact Patel Foundation | Get Involved, Volunteer or Donate"
        description="Contact Patel Foundation to volunteer, donate, collaborate, or learn more about our mission to support children and communities through impactful social initiatives."
        keywords="contact Patel Foundation, NGO contact, donate NGO, volunteer NGO, charity contact India"
        url="https://mypatelfoundation.in/contact"
        image="https://mypatelfoundation.in/og-image.webp"
      />
      <PageHero
        badge="Contact Us"
        title="Connect with Patel Foundation and be part of meaningful impact."
        highlight="meaningful impact"
        description="Whether you’d like to donate, volunteer, collaborate, or simply learn more, we welcome your message and your support."
        primaryBtnText="Send a Message"
        primaryBtnHref="#contact-form"
        secondaryBtnText="Support Our Mission"
        secondaryBtnHref="/donate"
        image="/images/contact/contact-hero.webp"
      />

      <ContactInfoSection />

      <div id="contact-form">
        <ContactFormSection />
      </div>

      <ContactMapSection />
      <ContactCTASection />
    </>
  );
};

export default ContactUsPage;