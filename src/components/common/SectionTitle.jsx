import Container from "./Container";

const SectionTitle = ({
  badge,
  title,
  highlight,
  description,
  center = false,
  narrow = true,
}) => {
  const renderTitle = () => {
    if (!highlight) return title;

    const parts = title.split(highlight);

    return (
      <>
        {parts[0]}
        <span className="text-gradient">{highlight}</span>
        {parts[1]}
      </>
    );
  };

  return (
    <Container narrow={narrow}>
      <div
        style={{
          textAlign: center ? "center" : "left",
          maxWidth: center ? "850px" : "780px",
          margin: center ? "0 auto" : "0",
          marginBottom: "clamp(2rem, 4vw, 4rem)",
        }}
      >
        {badge && <div className="section-badge">{badge}</div>}

        <h2
          style={{
            fontSize: "clamp(2.2rem, 5vw, 4.5rem)",
            marginBottom: "1rem",
          }}
        >
          {renderTitle()}
        </h2>

        {description && (
          <p
            style={{
              fontSize: "clamp(1rem, 2vw, 1.2rem)",
              lineHeight: 1.9,
              maxWidth: center ? "720px" : "680px",
              margin: center ? "0 auto" : "0",
            }}
          >
            {description}
          </p>
        )}
      </div>
    </Container>
  );
};

export default SectionTitle;