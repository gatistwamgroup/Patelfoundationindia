import { FiBookOpen, FiCoffee, FiHeart } from "react-icons/fi";
import Container from "../../common/Container";
import "../../../styles/donate/donation-page.css";

const impactItems = [
  {
    id: 1,
    icon: <FiBookOpen />,
    title: "Support Child Education",
    description:
      "Help provide educational access, learning essentials, and encouragement that can shape brighter futures for children.",
  },
  {
    id: 2,
    icon: <FiCoffee />,
    title: "Support Health & Nutrition",
    description:
      "Your donation can help us continue daily breakfast support and weekly meal initiatives connected with child well-being.",
  },
  {
    id: 3,
    icon: <FiHeart />,
    title: "Support Social Initiatives",
    description:
      "Contribute toward eye camps, outreach programs, and practical community support that brings dignity and care.",
  },
];

const DonationImpactSection = () => {
  return (
    <section className="donation-impact-section">
      <Container>
        <div className="donation-section-header">
          <div className="donation-page-badge">
            <span className="donation-page-badge-dot" />
            Where Your Donation Helps
          </div>

          <h2 className="donation-section-title">
            Every contribution supports{" "}
            <span className="text-gradient">purposeful community impact.</span>
          </h2>

          <p className="donation-page-description center">
            Patel Foundation channels support into meaningful initiatives that
            uplift children and communities through consistent, compassionate action.
          </p>
        </div>

        <div className="donation-impact-grid">
          {impactItems.map((item) => (
            <div key={item.id} className="donation-impact-card">
              <div className="donation-impact-icon">{item.icon}</div>
              <h3 className="donation-impact-title">{item.title}</h3>
              <p className="donation-impact-description">{item.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default DonationImpactSection;