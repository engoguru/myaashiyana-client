import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, A11y, Autoplay } from "swiper/modules";
import { Link } from "react-router-dom";
import { HandHeart, Heart } from "lucide-react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";

import namanBanner from "/assets/image/decorated/namanBanner.webp";
import headlineImg from "/assets/image/decorated/headlineImg.png";

// Background Banner Images
import bannerImg1 from "/assets/image/banner/bannerImg1.png";
import bannerImg2 from "/assets/image/banner/bannerImg2.png";
import bannerImg3 from "/assets/image/banner/bannerImg3.png";
import bannerImg4 from "/assets/image/banner/bannerImg4.png";

// Mobile Banner Images — unused, mobile uses static rescue.jpg

const fadeTransitionStyle = `
  /* 🔹 THE MASK: Tighter center zone to accommodate shorter path */
  .text-fade-swiper {
    -webkit-mask-image: linear-gradient(
      to bottom,
      transparent 0%,
      black 35%, 
      black 65%,
      transparent 100%
    );
    mask-image: linear-gradient(
      to bottom,
      transparent 0%,
      black 35%,
      black 65%,
      transparent 100%
    );
  }

  /* 🔹 TEXT MOTION (Reduced Path) */
  .text-fade-swiper .swiper-slide {
    /* Keep slow movement (2.8s) but shorter distance (45px) */
    transition: opacity 1s cubic-bezier(0.4, 0, 0.2, 1), transform 2.8s cubic-bezier(0.22, 1, 0.36, 1);
    opacity: 0;
    transform: translateY(45px); /* Reduced from 100px */
    will-change: transform, opacity;
  }

  .text-fade-swiper .swiper-slide-active {
    opacity: 1;
    transform: translateY(0);
    transition-delay: 0.4s;
  }

  .text-fade-swiper .swiper-slide-prev {
    /* Reduced exit path distance */
    opacity: 0;
    transform: translateY(-45px); /* Reduced from -100px */
    transition: opacity 0.5s ease-in, transform 2.8s cubic-bezier(0.22, 1, 0.36, 1);
    transition-delay: 0s;
  }

  /* 🔹 BACKGROUND ZOOM */
  .hero-bg-swiper .swiper-slide {
    transition: opacity 2s ease-in-out;
    overflow: hidden;
  }
  .hero-bg-swiper .swiper-slide img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transform: scale(1.05); 
    will-change: transform;
  }
  .hero-bg-swiper .swiper-slide-active img {
    animation: heroZoomIn 8000ms linear forwards;
  }
  @keyframes heroZoomIn {
    from { transform: scale(1.05); }
    to { transform: scale(1.25); }
  }
`;

const slides = [
  {
    image: bannerImg1,
    subheadline: "Every Soul Deserves a Second Chance",
    description:
      "Behind every rescued animal is a story of pain, survival, and hope. Your love can help them heal, feel safe, and belong again.",
  },
  {
    image: bannerImg2,
    subheadline: "Feed, Heal, Love",
    description:
      "A simple act of giving can change a life forever. Help us provide food, care, and compassion to those who need it most.",
  },
  {
    image: bannerImg3,
    subheadline: "Be Their Hero",
    description:
      "Join our family of virtual guardians and bring warmth and safety to abandoned animals. Your support writes their happy ending.",
  },
  {
    image: bannerImg4,
    subheadline: "Healing Begins With You",
    description:
      "Injured and helpless, many animals suffer in silence. With your support, we can provide urgent medical care, comfort, and a second chance at life.",
  },
];

const Hero = () => {
  return (
    <section className="relative w-full h-auto md:h-screen font-Lora overflow-x-hidden bg-black">
      <style>{fadeTransitionStyle}</style>
      {/* Background Slider — desktop only */}
      <div className="absolute inset-0 w-full h-full z-0 hidden md:block">
        <Swiper
          modules={[Pagination, A11y, Autoplay]}
          loop
          autoplay={{ delay: 6000, disableOnInteraction: false }}
          speed={2500}
          slidesPerView={1}
          allowTouchMove={false}
          className="h-full hero-bg-swiper"
        >
          {slides.map((slide, idx) => (
            <SwiperSlide key={idx}>
              <div className="relative w-full h-full">
                <img
                  src={slide.image}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Mobile static background — single blurred image */}
      <div className="absolute inset-0 w-full h-full z-0 block md:hidden overflow-hidden">
        <img
          src="/assets/image/rescue.jpg"
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: "blur(8px)", transform: "scale(1.05)" }}
        />
      </div>

      {/* Overlay Frame — desktop only */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-[1] hidden md:block">
        <img src={namanBanner} alt="" className="w-full h-full object-cover" />
      </div>

      {/* Cinematic Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/30 to-transparent z-[2]" />

      {/* ===================== MOBILE LAYOUT ===================== */}
      {/* Flex column — tightly stacked, no vh gaps */}
      <div className="flex md:hidden flex-col justify-center px-10 pt-20 pb-10 gap-4 relative z-30 min-h-[600px]">
        {/* Headline Image */}
        <img
          src={headlineImg}
          alt="Hero Headline"
          className="w-full max-w-[420px] h-auto pb-7 object-contain"
        />

        {/* Text — static first slide on mobile */}
        <div>
          <h2 className="text-white font-extrabold text-2xl mb-2 leading-tight drop-shadow-lg">
            {slides[0].subheadline}
          </h2>
          <p className="text-[#fffaf0] font-SourceSans text-base max-w-xs drop-shadow">
            {slides[0].description}
          </p>
        </div>

        {/* Donate Button */}
        <div className="mt-2">
          <Link
            to="/donate"
            className="inline-flex items-center gap-2 bg-[#BEFD95] text-gray-800 font-bold px-4 py-6 rounded-full shadow-lg"
          >
            <HandHeart className="w-5 h-5" />
            <span>Donate & Make a Difference</span>
            <Heart className="w-5 h-5" />
          </Link>
        </div>
      </div>

      {/* ===================== DESKTOP LAYOUT ===================== */}
      {/* 🔹 TEXT SLIDER */}
      <div
        className="absolute z-30 overflow-x-hidden pointer-events-none hidden md:block"
        style={{ top: "32vh", bottom: "22vh", left: 0, right: 0 }}
      >
        <Swiper
          modules={[Pagination, A11y, Autoplay]}
          pagination={{ clickable: true, el: ".custom-swiper-pagination" }}
          direction="vertical"
          loop
          autoplay={{ delay: 6000, disableOnInteraction: false }}
          speed={2200}
          allowTouchMove={false}
          className="h-full text-fade-swiper"
        >
          {slides.map((slide, idx) => (
            <SwiperSlide key={idx}>
              <div className="flex flex-col justify-center h-full px-20 max-w-4xl">
                <h2 className="text-white font-extrabold text-5xl lg:text-6xl mb-4 leading-tight drop-shadow-lg">
                  {slide.subheadline}
                </h2>
                <p className="text-[#fffaf0] font-SourceSans text-2xl lg:text-3xl max-w-3xl drop-shadow">
                  {slide.description}
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Pagination — desktop only */}
      <div className="custom-swiper-pagination absolute bottom-10 left-1/2 -translate-x-1/2 z-50 hidden md:flex gap-2" />

      {/* Headline Image — desktop only */}
      <div className="absolute z-40 hidden md:block" style={{ top: "20vh", left: 0, right: 0 }}>
        <div className="px-20 max-w-4xl">
          <img
            src={headlineImg}
            alt="Hero Headline"
            className="w-full max-w-[600px] h-auto object-contain"
          />
        </div>
      </div>

      {/* Donate Button — desktop only */}
      <div className="absolute z-40 hidden md:block" style={{ bottom: "12vh", left: 0, right: 0 }}>
        <div className="px-20 max-w-4xl">
          <Link
            to="/donate"
            className="inline-flex items-center gap-2 bg-[#BEFD95] text-gray-800 font-bold px-4 py-5 rounded-full shadow-lg hover:scale-105 transition-all"
          >
            <HandHeart className="w-5 h-5" />
            <span>Donate & Make a Difference</span>
            <Heart className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;