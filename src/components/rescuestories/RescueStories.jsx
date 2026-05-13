import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, A11y, Autoplay } from "swiper/modules";
import { Link } from "react-router-dom";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import RescueStoryCard from "./Rescuestorycard";
import { fetchRescuestories } from "../reasctquery/api";
import { useQuery } from "@tanstack/react-query";

const RescueStoriesCarousel = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["data"],
    queryFn: fetchRescuestories,
  });
  const stories = data?.stories || [];

  // If loading or error, you can show a loader or error message
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Failed to load stories.</div>;

  return (
    <section
      className="relative w-full bg-[#FDF8F3] py-16 font-Lora overflow-hidden"
      style={{
        backgroundImage: "url('/assets/image/99.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="w-full">
        <h2 className="text-4xl md:text-5xl font-extrabold text-[#072724] mb-10 text-center px-6 md:px-20">
          Rescue Stories: Healing, Hope &amp; Second Chances
        </h2>

        {/* Full-Width Relative Wrapper for Screen-Edge Buttons */}
        <div className="relative group/swiper w-full">
          <Swiper
            modules={[Navigation, A11y, Autoplay]}
            navigation={{
              nextEl: "#stories-next",
              prevEl: "#stories-prev",
            }}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            loop={stories.length > 1}
            spaceBetween={20}
            slidesPerView={1}
            breakpoints={{
              768: { slidesPerView: 1 },
              1024: { slidesPerView: 1 },
            }}
            className="mb-10 px-0 relative z-10"
            a11y={{
              prevSlideMessage: "Previous story",
              nextSlideMessage: "Next story",
            }}
          >
            {stories.map((story) => (
              <SwiperSlide key={story._id}>
                <RescueStoryCard story={story} />
              </SwiperSlide>
            ))}

            {/* Navigation Buttons: Positioned at Screen Edges - Inside Swiper for stability */}
            <div className={`absolute inset-0 pointer-events-none z-50 flex items-center justify-between px-2 md:px-6 lg:px-10 ${stories.length <= 1 ? 'hidden' : ''}`}>
              <button
                id="stories-prev"
                className="pointer-events-auto bg-white/95 hover:bg-[#BEFD95] text-[#54b36b] rounded-full w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 shadow-xl transition-all duration-300 border-2 border-[#BEFD95] focus:outline-none flex items-center justify-center hover:scale-110 active:scale-95 cursor-pointer"
                aria-label="Previous"
                type="button"
              >
                <svg
                  className="w-4 h-4 md:w-5 lg:w-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  viewBox="0 0 24 24"
                >
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>
              <button
                id="stories-next"
                className="pointer-events-auto bg-white/95 hover:bg-[#BEFD95] text-[#54b36b] rounded-full w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 shadow-xl transition-all duration-300 border-2 border-[#BEFD95] focus:outline-none flex items-center justify-center hover:scale-110 active:scale-95 cursor-pointer"
                aria-label="Next"
                type="button"
              >
                <svg
                  className="w-4 h-4 md:w-5 lg:w-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  viewBox="0 0 24 24"
                >
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            </div>
          </Swiper>
        </div>

        {/* View More Button - Premium CTA */}
        <div className="flex justify-center mt-12 mb-6">
          <Link
            to="/rescue-story"
            className="group inline-flex items-center gap-3 bg-[#072724] text-[#BEFD95] hover:bg-[#BEFD95] hover:text-[#072724] font-black px-12 py-5 rounded-full shadow-2xl transition-all duration-500 text-lg md:text-xl uppercase tracking-widest border-2 border-[#072724]"
          >
            <span>Explore All Stories</span>
            <svg
              className="w-6 h-6 transition-transform duration-500 group-hover:translate-x-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.5"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default RescueStoriesCarousel;
