import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useNavigate } from "react-router-dom";
import Button from "../ui/Button";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import CardAnimal from "./Cardanimal";
import { useQuery } from "@tanstack/react-query";
import { fetchAnimals } from "../reasctquery/api";

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};
const AnimalsSection = () => {
  const navigate = useNavigate();
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const handleAdoptClick = (id) => {
    navigate(`/animals/${id}`);
  };

  const {
    data: animals = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["animals"],
    queryFn: fetchAnimals,
  });

  return (
    <section className="w-full bg-[#041915] relative py-10 px-3 md:px-8 font-Lora overflow-hidden">
      <style>
        {`
        @keyframes shimmer {
          0% {
            background-position: -100% 0;
          }
          100% {
            background-position: 100% 0;
          }
        }
        .shimmer-overlay {
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
          background-size: 200% 100%;
          animation: shimmer 2s infinite;
        }
      `}
      </style>
      {/* Background Overlay */}
      <div className="absolute inset-0 grid place-items-center w-full h-full text-center">
        <img
          src="/assets/image/overlay.png"
          alt=""
          className="w-full h-full object-cover opacity-30"
        />
      </div>

      {/* Section Header - Compact & Balanced */}
      <div
        className="text-center mb-10 md:mb-14 relative z-10 px-2"
        data-aos="fade-down"
      >
        <span className="text-[#D89D55] text-base font-bold uppercase tracking-widest font-heading mb-3 block">
          Meet Our Rescued Souls
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white font-heading leading-tight mb-4 whitespace-nowrap">
          Every Face Has <span className="text-[#BEFD95]">a Story</span>
        </h2>
        <p className="text-[#C7D2C7] text-sm md:text-lg max-w-2xl mx-auto font-SourceSans leading-relaxed opacity-90">
          These beautiful lives are seeking love, care, and a compassionate
          sponsor — like you. Your sponsorship directly funds their healing and
          happiness.
        </p>
      </div>

      {/* View More Button - Desktop Sticky / Mobile Bottom */}
      <div
        onClick={() => navigate("/animals")}
        className="flex md:block justify-center mb-10 md:sticky md:top-24 md:z-30 md:flex md:justify-end"
      >
        <div className="cursor-pointer group bg-[#BEFD95] hover:bg-white text-[#072724] px-8 py-3 rounded-full shadow-2xl font-bold transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-2 border border-white/10">
          <span>View All Animals</span>
          <svg
            className="w-5 h-5 transition-transform group-hover:translate-x-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2.5"
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            />
          </svg>
        </div>
      </div>

      {/* Loader */}
      {isLoading && (
        <div className="text-center text-white z-10 relative mb-10">
          Loading animal stories...
        </div>
      )}

      {/* Error */}
      {isError && (
        <div className="text-center text-red-500 z-10 relative mb-10">
          Failed to load animal stories.
        </div>
      )}

      {/* Uniified Swiper Carousel for All Devices */}
      {!isLoading && !isError && (
        <div className="relative z-10 max-w-7xl mx-auto px-2 overflow-visible">
          <Swiper
            modules={[Autoplay]}
            spaceBetween={15}
            slidesPerView={1}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
            }}
            loop={true}
            grabCursor={true}
            breakpoints={{
              640: {
                slidesPerView: 1,
                spaceBetween: 15,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 30,
              },
            }}
            className="pb-12"
          >
            {animals.map((animal, index) => (
              <SwiperSlide key={animal._id} className="h-full py-4">
                <motion.div
                  custom={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={cardVariants}
                  className="h-full"
                >
                  <CardAnimal
                    animal={animal}
                    onReadMoreClick={handleAdoptClick}
                  />
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
    </section>
  );
};

export default AnimalsSection;
