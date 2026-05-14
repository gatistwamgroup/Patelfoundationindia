import Container from "./Container";
import PremiumButton from "./PremiumButton";

const ContentSection = ({
  badge = "Section",
  title = "Section Title",
  highlight = "",
  description = "",
  image = "/images/home/who-we-are.webp",
  reverse = false,
  primaryBtnText = "Learn More",
  primaryBtnHref = "/contact",
  secondaryBtnText = "Support Our Mission",
  secondaryBtnHref = "/donate",
}) => {
  const renderTitle = () => {
    if (!highlight || !title.includes(highlight)) return title;

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
    <section className="section">
      <Container>
        <div
          className="content-section-grid"
          style={{
            gridTemplateColumns: "1fr 1fr",
          }}
        >
          <div style={{ order: reverse ? 2 : 1 }}>
            <div className="section-badge">{badge}</div>

            <h2
              style={{
                fontSize: "clamp(2rem, 5vw, 4rem)",
                marginBottom: "1rem",
              }}
            >
              {renderTitle()}
            </h2>

            <p
              style={{
                lineHeight: 1.9,
                marginBottom: "1.5rem",
                fontSize: "clamp(1rem, 2vw, 1.08rem)",
              }}
            >
              {description}
            </p>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
              <PremiumButton href={primaryBtnHref}>{primaryBtnText}</PremiumButton>
              <PremiumButton href={secondaryBtnHref} variant="secondary">
                {secondaryBtnText}
              </PremiumButton>
            </div>
          </div>

          <div style={{ order: reverse ? 1 : 2 }}>
            <div
              style={{
                borderRadius: "28px",
                overflow: "hidden",
                boxShadow: "var(--shadow-premium)",
              }}
            >
              <img
                src={image}
                alt={title}
                style={{
                  width: "100%",
                  height: "100%",
                  minHeight: "420px",
                  objectFit: "cover",
                  display: "block",
                }}
              />
            </div>
          </div>
        </div>
      </Container>

      <style>{`
        .content-section-grid {
          display: grid;
          gap: clamp(1.5rem, 4vw, 4rem);
          align-items: center;
        }

        @media (max-width: 992px) {
          .content-section-grid {
            grid-template-columns: 1fr !important;
          }

          .content-section-grid > div {
            order: unset !important;
          }
        }

        @media (max-width: 768px) {
          .content-section-grid img {
            min-height: 280px !important;
          }
        }
      `}</style>
    </section>
  );
};

export default ContentSection;