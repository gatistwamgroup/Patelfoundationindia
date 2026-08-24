import { FiMail, FiMapPin, FiPhone, FiClock } from "react-icons/fi";
import Container from "../../common/Container";
import "../../../styles/contact/contact-page.css";

const contactCards = [
  {
    id: 1,
    icon: <FiMapPin />,
    label: "Office / Coordination",
    title: "Near Milk Dairy, Kavitha, Borsad, Anand Pincode - 388545",
    description:
      "Connect with community support initiatives focused in India.",
  },
  {
    id: 2,
    icon: <FiMail />,
    label: "Email Address",
    title: "patelfoundation23@gmail.com",
    description:
      "For partnerships, donations, volunteering, and general inquiries.",
  },
  {
    id: 3,
    icon: <FiPhone />,
    label: "Phone / WhatsApp",
    title: "+91 90998 17143",
    description:
      "Available for supporter conversations, collaboration inquiries, and coordination.",
  },
  {
    id: 4,
    icon: <FiClock />,
    label: "Response Time",
    title: "Within 24–48 Hours",
    description:
      "We aim to respond thoughtfully and promptly to every genuine inquiry.",
  },
];

const ContactInfoSection = () => {
  return (
    <section className="contact-info-section">
      <Container>
        <div className="contact-page-header">
          <div className="contact-page-badge">
            <span className="contact-page-badge-dot" />
            Contact Patel Foundation
          </div>

          <h2 className="contact-page-title">
            Let’s connect with purpose,{" "}
            <span className="text-gradient">partnership, and impact.</span>
          </h2>

          <p className="contact-page-description">
            Whether you want to support our mission, volunteer, collaborate, or
            simply learn more about Patel Foundation, we’d love to hear from you.
            Every conversation can be the beginning of meaningful change.
          </p>
        </div>

        <div className="contact-info-grid">
          {contactCards.map((card) => (
            <div key={card.id} className="contact-info-card">
              <div className="contact-info-icon">{card.icon}</div>
              <p className="contact-info-label">{card.label}</p>
              <h3 className="contact-info-title">{card.title}</h3>
              <p className="contact-info-description">{card.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default ContactInfoSection;