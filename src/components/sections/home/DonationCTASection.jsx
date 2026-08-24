import Container from "../../common/Container";
import PremiumButton from "../../common/PremiumButton";
import { donationCTAData } from "../../../data/homePageData";

const DonationCTASection = () => {
  return (
    <section className="section" id="donate">
      <Container>
        <div className="donation-cta-wrap">
          {/* Background Image */}
          <div
            className="donation-cta-bg"
            style={{
              backgroundImage: `
                linear-gradient(
                  90deg,
                  rgba(10, 16, 28, 0.88) 0%,
                  rgba(10, 16, 28, 0.78) 45%,
                  rgba(10, 16, 28, 0.38) 100%
                ),
                url(${donationCTAData.image})
              `,
            }}
          />

          {/* Decorative Glow */}
          <div className="donation-glow donation-glow-1" />
          <div className="donation-glow donation-glow-2" />

          <div className="donation-cta-content">
            <div className="donation-cta-left">
              <div className="donation-badge">
                <span className="donation-badge-dot" />
                {donationCTAData.badge}
              </div>

              <h2 className="donation-title">
                {donationCTAData.title.split("change a life")[0]}
                <span className="donation-highlight">change a life</span>.
              </h2>

              <p className="donation-description">{donationCTAData.description}</p>

              <div className="donation-buttons">
                <PremiumButton href={donationCTAData.primaryBtn.href}>
                  {donationCTAData.primaryBtn.text}
                </PremiumButton>

                <PremiumButton href={donationCTAData.secondaryBtn.href} variant="secondary">
                  {donationCTAData.secondaryBtn.text}
                </PremiumButton>
              </div>
            </div>

            <div className="donation-cta-right">
              <div className="donation-impact-card">
                <div className="donation-impact-badge">Impact Promise</div>

                <div className="donation-impact-list">
                  <div className="donation-impact-item donation-impact-primary">
                    <h3>Education First</h3>
                    <p>Support school kits, learning essentials, and child-focused growth.</p>
                  </div>

                  <div className="donation-impact-item donation-impact-gold">
                    <h3>Community Support</h3>
                    <p>Strengthen local outreach, family care, and volunteer-led action.</p>
                  </div>

                  <div className="donation-impact-item donation-impact-teal">
                    <h3>Trusted Giving</h3>
                    <p>Designed to inspire donor confidence with purpose and measurable value.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>

      <style>{`
        .donation-cta-wrap {
          position: relative;
          border-radius: var(--radius-xl);
          overflow: hidden;
          min-height: 680px;
          box-shadow: var(--shadow-premium);
          border: 1px solid rgba(17,24,39,0.08);
        }

        .donation-cta-bg {
          position: absolute;
          inset: 0;
          background-size: cover;
          background-position: center;
        }

        .donation-glow {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          pointer-events: none;
          z-index: 1;
        }

        .donation-glow-1 {
          width: 260px;
          height: 260px;
          background: rgba(215, 38, 56, 0.18);
          top: 8%;
          left: 6%;
        }

        .donation-glow-2 {
          width: 220px;
          height: 220px;
          background: rgba(200, 169, 107, 0.16);
          bottom: 10%;
          right: 10%;
        }

        .donation-cta-content {
          position: relative;
          z-index: 2;
          min-height: 680px;
          display: grid;
          grid-template-columns: 1.05fr 0.95fr;
          gap: clamp(1.5rem, 4vw, 4rem);
          align-items: center;
          padding: clamp(1.5rem, 4vw, 3rem);
        }

        .donation-badge {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 0.7rem 1rem;
          border-radius: 999px;
          background: rgba(255,255,255,0.12);
          border: 1px solid rgba(255,255,255,0.14);
          color: #fff;
          font-size: 0.82rem;
          font-weight: 700;
          margin-bottom: 1.2rem;
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
        }

        .donation-badge-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--color-primary);
        }

        .donation-title {
          font-size: clamp(2.4rem, 5vw, 5.5rem);
          color: #fff;
          line-height: 1.05;
          margin-bottom: 1rem;
          max-width: 820px;
        }

        .donation-highlight {
          background: linear-gradient(135deg, #ffffff 0%, var(--color-gold) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .donation-description {
          font-size: clamp(1rem, 2vw, 1.15rem);
          line-height: 1.9;
          color: rgba(255,255,255,0.8);
          max-width: 650px;
          margin-bottom: 1.8rem;
        }

        .donation-buttons {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .donation-buttons a:nth-child(2) {
          background: rgba(255,255,255,0.08) !important;
          border: 1px solid rgba(255,255,255,0.16) !important;
          color: #fff !important;
        }

        .donation-cta-right {
          display: flex;
          justify-content: flex-end;
        }

        .donation-impact-card {
          width: min(100%, 460px);
          padding: clamp(1.2rem, 3vw, 1.8rem);
          border-radius: 28px;
          background: rgba(255,255,255,0.1);
          border: 1px solid rgba(255,255,255,0.14);
          box-shadow: 0 30px 80px rgba(0,0,0,0.18);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
        }

        .donation-impact-badge {
          display: inline-block;
          padding: 0.55rem 0.9rem;
          border-radius: 999px;
          background: rgba(255,255,255,0.1);
          color: #fff;
          font-size: 0.8rem;
          font-weight: 700;
          margin-bottom: 1rem;
          border: 1px solid rgba(255,255,255,0.12);
        }

        .donation-impact-list {
          display: grid;
          gap: 0.9rem;
        }

        .donation-impact-item {
          border-radius: 22px;
          padding: 1rem;
          border: 1px solid rgba(255,255,255,0.08);
        }

        .donation-impact-item h3 {
          font-size: 1.5rem;
          color: #fff;
          margin-bottom: 0.35rem;
        }

        .donation-impact-item p {
          color: rgba(255,255,255,0.72);
          line-height: 1.7;
        }

        .donation-impact-primary {
          background: rgba(215, 38, 56, 0.12);
        }

        .donation-impact-gold {
          background: rgba(200, 169, 107, 0.12);
        }

        .donation-impact-teal {
          background: rgba(15, 118, 110, 0.12);
        }

        @media (max-width: 1100px) {
          .donation-cta-content {
            grid-template-columns: 1fr;
            padding-top: 2rem;
            padding-bottom: 2rem;
          }

          .donation-cta-right {
            justify-content: flex-start;
          }
        }

        @media (max-width: 768px) {
          .donation-cta-wrap,
          .donation-cta-content {
            min-height: auto;
          }

          .donation-buttons {
            flex-direction: column;
          }

          .donation-buttons a {
            width: 100%;
            justify-content: center;
          }

          .donation-impact-card {
            width: 100%;
          }
        }
      `}</style>
    </section>
  );
};

export default DonationCTASection;