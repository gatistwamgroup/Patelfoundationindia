import { FiBookOpen, FiHeart, FiSun } from "react-icons/fi";
import Container from "../../common/Container";

const RakshaBandhanStorySection = () => {
  const cards = [
    {
      icon: <FiBookOpen />,
      title: "Protect Their Education",
      description:
        "Your contribution helps provide school kits, books, and tuition support so a child's education never stops.",
    },
    {
      icon: <FiHeart />,
      title: "Protect Their Health",
      description:
        "Support nutrition and healthcare drives that keep underprivileged children healthy, strong, and cared for.",
    },
    {
      icon: <FiSun />,
      title: "Protect Their Future",
      description:
        "Every rakhi donation goes toward giving a child a safer, brighter, and more hopeful tomorrow.",
    },
  ];

  return (
    <section className="rb-story">
      <Container>
        <div className="rb-story-header">
          <h2 className="rb-story-title">
            A Rakhi is a Promise of Protection — This Year, Extend It to a Child
          </h2>
          <p className="rb-story-description">
            Raksha Bandhan celebrates the bond of care and protection. Patel
            Foundation invites you to extend that same promise to underprivileged
            children across India through your donation this festive season.
          </p>
        </div>

        <div className="rb-story-grid">
          {cards.map((card, index) => (
            <div className="rb-story-card" key={index}>
              <div className="rb-story-icon">{card.icon}</div>
              <h3>{card.title}</h3>
              <p>{card.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default RakshaBandhanStorySection;
