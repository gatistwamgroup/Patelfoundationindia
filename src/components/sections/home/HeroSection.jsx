import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

import { motion } from "framer-motion";
import PremiumButton from "../../common/PremiumButton";
import {
  FiArrowRight,
  FiHeart,
  FiShield,
  FiUsers,
} from "react-icons/fi";

// Only images slider data
const heroImages = [
  "/images/hero/hero-1.jpg",
  "/images/hero/hero-2.jpg",
  "/images/hero/hero-3.jpg",
];

const HeroSection = () => {
  return (
    <section className="hero-section" id="hero">
      <div className="hero-bg-blur hero-bg-blur-1" />
      <div className="hero-bg-blur hero-bg-blur-2" />

      <div className="hero-content-wrap">
        {/* LEFT STATIC CONTENT */}
        <div className="hero-content-left">
          <motion.div
            className="hero-badge"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="hero-badge-dot" />
            Empowering Communities
          </motion.div>

          <motion.h1
            className="hero-title"
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.1 }}
          >
            Together We Create <span className="hero-highlight">Lasting Change</span>
          </motion.h1>

          <motion.p
            className="hero-description"
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.18 }}
          >
            Support education, healthcare, and sustainable livelihood initiatives
            that transform lives with transparency and compassion.
          </motion.p>

          <motion.div
            className="hero-buttons"
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.26 }}
          >
            <PremiumButton href="/donate">
              Donate Now <FiArrowRight />
            </PremiumButton>

            <PremiumButton href="/impact" variant="secondary">
              Our Impact
            </PremiumButton>
          </motion.div>

          <motion.div
            className="hero-trust-strip"
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.34 }}
          >
            <div className="hero-trust-item">
              <span className="hero-trust-icon">
                <FiHeart />
              </span>
              <span>Compassion Driven</span>
            </div>

            <div className="hero-trust-item">
              <span className="hero-trust-icon">
                <FiShield />
              </span>
              <span>Transparent Impact</span>
            </div>

            <div className="hero-trust-item">
              <span className="hero-trust-icon">
                <FiUsers />
              </span>
              <span>Community Focused</span>
            </div>
          </motion.div>
        </div>

        {/* RIGHT ONLY IMAGE SLIDER */}
        <div className="hero-content-right">
          <motion.div
            className="hero-image-slider-wrap"
            initial={{ opacity: 0, x: 28 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.18 }}
          >
            <Swiper
              modules={[Autoplay, Pagination]}
              slidesPerView={1}
              loop={true}
              speed={900}
              autoplay={{
                delay: 3200,
                disableOnInteraction: false,
              }}
              pagination={{
                clickable: true,
              }}
              className="hero-image-swiper"
            >
              {heroImages.map((image, index) => (
                <SwiperSlide key={index}>
                  <div className="hero-image-frame">
                    <img
                      src={image}
                      alt={`NGO Impact ${index + 1}`}
                      className="hero-main-image"
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </motion.div>
        </div>
      </div>

      <style>{`
        .hero-section {
          position: relative;
          width: 100%;
          min-height: 100vh;
          display: flex;
          align-items: center;
          background: linear-gradient(135deg, #07111f 0%, #09162a 45%, #06101d 100%);
          overflow: hidden;
        }

        .hero-bg-blur {
          position: absolute;
          border-radius: 50%;
          filter: blur(90px);
          pointer-events: none;
          z-index: 1;
        }

        .hero-bg-blur-1 {
          width: 320px;
          height: 320px;
          background: rgba(215, 38, 56, 0.12);
          top: 12%;
          left: 4%;
        }

        .hero-bg-blur-2 {
          width: 260px;
          height: 260px;
          background: rgba(200, 169, 107, 0.10);
          bottom: 10%;
          right: 8%;
        }

        .hero-content-wrap {
          position: relative;
          z-index: 2;
          width: 100%;
          max-width: var(--container-width, 1320px);
          margin: 0 auto;
          padding: clamp(7rem, 9vw, 8.5rem) clamp(1rem, 3vw, 2rem) clamp(3rem, 5vw, 4rem);
          display: grid;
          grid-template-columns: minmax(0, 1.05fr) minmax(0, 0.95fr);
          gap: clamp(2rem, 4vw, 4rem);
          align-items: center;
        }

        .hero-content-left,
        .hero-content-right {
          min-width: 0;
        }

        .hero-content-left {
          max-width: 680px;
        }

        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 0.75rem 1rem;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.12);
          color: #fff;
          font-size: 0.82rem;
          font-weight: 700;
          margin-bottom: 1.2rem;
          backdrop-filter: blur(10px);
        }

        .hero-badge-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--color-primary, #d72638);
          box-shadow: 0 0 0 6px rgba(215, 38, 56, 0.14);
        }

        .hero-title {
          font-size: clamp(2.3rem, 5vw, 4.7rem);
          line-height: 1.08;
          color: #fff;
          font-weight: 800;
          margin: 0 0 1rem;
          letter-spacing: -0.02em;
        }

        .hero-highlight {
          background: linear-gradient(135deg, #ffffff 0%, var(--color-gold, #c8a96b) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .hero-description {
          font-size: clamp(1rem, 1.5vw, 1.15rem);
          line-height: 1.8;
          color: rgba(255,255,255,0.82);
          margin: 0 0 1.8rem;
          max-width: 620px;
        }

        .hero-buttons {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
          margin-bottom: 2rem;
        }

        .hero-buttons a:nth-child(2) {
          background: rgba(255,255,255,0.08) !important;
          border: 1px solid rgba(255,255,255,0.16) !important;
          color: #fff !important;
        }

        .hero-trust-strip {
          display: flex;
          flex-wrap: wrap;
          gap: 0.85rem;
        }

        .hero-trust-item {
          display: inline-flex;
          align-items: center;
          gap: 0.65rem;
          padding: 0.8rem 1rem;
          border-radius: 999px;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.10);
          color: rgba(255,255,255,0.92);
          font-size: 0.9rem;
          font-weight: 600;
          backdrop-filter: blur(12px);
          min-height: 52px;
        }

        .hero-trust-icon {
          width: 32px;
          height: 32px;
          min-width: 32px;
          border-radius: 50%;
          background: rgba(255,255,255,0.08);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--color-gold, #c8a96b);
        }

        .hero-content-right {
          display: flex;
          justify-content: center;
        }

        .hero-image-slider-wrap {
          width: 100%;
          max-width: 580px;
        }

        .hero-image-swiper {
          width: 100%;
          padding-bottom: 2.3rem;
        }

        .hero-image-frame {
          width: 100%;
          border-radius: 30px;
          overflow: hidden;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.08);
          box-shadow: 0 25px 70px rgba(0,0,0,0.22);
          padding: 0.45rem;
          backdrop-filter: blur(8px);
        }

        .hero-main-image {
          width: 100%;
          height: clamp(380px, 42vw, 680px);
          display: block;
          border-radius: 24px;
          object-fit: cover;
          object-position: center;
          background: rgba(255,255,255,0.02);
        }

        .hero-image-swiper .swiper-pagination {
          bottom: 0 !important;
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 8px;
        }

        .hero-image-swiper .swiper-pagination-bullet {
          width: 10px;
          height: 10px;
          background: rgba(255,255,255,0.35);
          opacity: 1;
        }

        .hero-image-swiper .swiper-pagination-bullet-active {
          width: 28px;
          border-radius: 999px;
          background: linear-gradient(90deg, var(--color-primary, #d72638) 0%, var(--color-gold, #c8a96b) 100%);
        }

        /* TABLET */
        @media (max-width: 1199px) {
          .hero-section {
            min-height: auto;
          }

          .hero-content-wrap {
            grid-template-columns: 1fr;
            gap: 2rem;
            padding-top: 7rem;
          }

          .hero-content-left {
            max-width: 100%;
          }

          .hero-content-right {
            justify-content: flex-start;
          }

          .hero-image-slider-wrap {
            max-width: 100%;
          }

          .hero-main-image {
            height: clamp(320px, 58vw, 540px);
          }
        }

        /* MOBILE */
        @media (max-width: 767px) {
          .hero-content-left {
            order: 2;
          }
          .hero-content-wrap {
            padding: 6rem 1rem 3.5rem;
            gap: 1.6rem;
          }

          .hero-title {
            font-size: clamp(1.9rem, 8vw, 3rem);
            line-height: 1.12;
          }

          .hero-description {
            font-size: 0.96rem;
            line-height: 1.7;
            margin-bottom: 1.35rem;
          }

          .hero-buttons {
            flex-direction: column;
            align-items: stretch;
            margin-bottom: 1.4rem;
          }

          .hero-buttons a {
            width: 100%;
            justify-content: center;
          }

          .hero-trust-strip {
            display: grid;
            grid-template-columns: 1fr;
            gap: 0.7rem;
          }

          .hero-trust-item {
            width: 100%;
          }

          .hero-image-frame {
            padding: 0.35rem;
            border-radius: 22px;
          }

          .hero-main-image {
            height: auto;
            max-height: 360px;
            min-height: 240px;
            border-radius: 18px;
            object-fit: contain;
          }
        }

        /* SMALL MOBILE */
        @media (max-width: 480px) {
          .hero-badge {
            font-size: 0.74rem;
            padding: 0.65rem 0.9rem;
          }

          .hero-title {
            font-size: clamp(1.7rem, 8vw, 2.35rem);
          }

          .hero-description {
            font-size: 0.92rem;
          }

          .hero-trust-item {
            font-size: 0.84rem;
            padding: 0.72rem 0.9rem;
          }

          .hero-main-image {
            max-height: 300px;
            min-height: 220px;
          }
        }
      `}</style>
    </section>
  );
};

export default HeroSection;