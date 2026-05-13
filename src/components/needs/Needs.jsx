import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import NeedCard from "./Needscard";
import { useQuery } from "@tanstack/react-query";
import { fecthNeeds } from "../reasctquery/api";

const Needs = () => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["needs"],
    queryFn: fecthNeeds,
  });

  const needs = data?.allneeds || [];

  return (
    <section
      className="relative w-full bg-[#FDF8F3] py-10 px-4 md:px-20 font-Lora"
      style={{
        backgroundImage: "url('/assets/image/100.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-10 text-center tracking-tight">
        Current Needs
      </h2>

      <div className="relative w-full px-2 sm:px-6">
        {/* Navigation Buttons: Anchored at absolute screen ends to prevent overlap */}
        {needs.length > 1 && (
          <>
            <button
              ref={prevRef}
              className="absolute left-0 lg:left-2 top-1/2 -translate-y-1/2 bg-white/95 hover:bg-[#BEFD95] text-[#072724] rounded-full w-10 h-10 md:w-12 md:h-12 shadow-2xl transition-all duration-300 border-2 border-[#BEFD95] flex items-center justify-center z-50 hover:scale-110 active:scale-95 cursor-pointer"
              aria-label="Previous Need"
            >
              <svg
                className="w-5 h-5 md:w-6"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.5}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            <button
              ref={nextRef}
              className="absolute right-0 lg:right-2 top-1/2 -translate-y-1/2 bg-white/95 hover:bg-[#BEFD95] text-[#072724] rounded-full w-10 h-10 md:w-12 md:h-12 shadow-2xl transition-all duration-300 border-2 border-[#BEFD95] flex items-center justify-center z-50 hover:scale-110 active:scale-95 cursor-pointer"
              aria-label="Next Need"
            >
              <svg
                className="w-5 h-5 md:w-6"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.5}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </>
        )}

        {/* Content Container - Cinematic Expansion */}
        <div className="max-w-[1600px] mx-auto">
          <Swiper
            key={needs.length}
            modules={[Navigation, A11y]}
            onBeforeInit={(swiper) => {
              swiper.params.navigation.prevEl = prevRef.current;
              swiper.params.navigation.nextEl = nextRef.current;
            }}
            onSwiper={(swiper) => {
              // Force re-binding to ensure buttons work after initial render
              setTimeout(() => {
                swiper.params.navigation.prevEl = prevRef.current;
                swiper.params.navigation.nextEl = nextRef.current;
                swiper.navigation.destroy();
                swiper.navigation.init();
                swiper.navigation.update();
              });
            }}
            navigation={{
              prevEl: prevRef.current,
              nextEl: nextRef.current,
            }}
            observer={true}
            observeParents={true}
            loop={needs.length > 1}
            spaceBetween={30}
            slidesPerView={1}
            breakpoints={{
              768: { slidesPerView: 2 },
              1280: { slidesPerView: 3 },
            }}
            className="mb-10 !pb-4 h-full"
          >
            {needs.map((need) => (
              <SwiperSlide key={need._id} className="!h-auto">
                <div className="flex justify-center h-full items-stretch pb-1">
                  <NeedCard
                    need={need}
                    className="h-full transition-transform duration-300 hover:scale-[1.02]"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default Needs;
